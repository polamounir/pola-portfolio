import puppeteer from 'puppeteer';
import { preview } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getExecutablePath() {
  const candidates = [
    process.env.PUPPETEER_EXECUTABLE_PATH,
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  ];
  for (const c of candidates) {
    if (c && fs.existsSync(c)) return c;
  }
  return undefined;
}

// Single source of truth for projects
const projectsJsonPath = path.resolve(__dirname, '../src/data/projects.json');
const PROJECTS = JSON.parse(fs.readFileSync(projectsJsonPath, 'utf-8'));

const STATIC_ROUTES = ['/', '/about', '/projects', '/contact', '/404'];
const PROJECT_ROUTES = PROJECTS.map((p) => `/projects/${p.slug}`);
const ALL_ROUTES = [...STATIC_ROUTES, ...PROJECT_ROUTES];

// Routes that fetch/depend on async data and must wait for the ready signal.
// Static routes with no fetch skip the signal wait and rely on networkidle0 only.
const DATA_DEPENDENT_ROUTES = new Set(['/', '/projects', ...PROJECT_ROUTES]);

const READY_SELECTOR_TIMEOUT_MS = 10000;

async function prerender() {
  console.log(`Starting prerender build against production dist/...`);
  // Serves the REAL dist/ build — using preview exclusively
  const server = await preview({ preview: { port: 4173 } });
  const baseUrl = `http://localhost:4173`;

  let browser;
  try {
    const executablePath = getExecutablePath();
    browser = await puppeteer.launch({
      executablePath,
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
    });
  } catch (err) {
    console.warn(`Prerender notice: Puppeteer could not launch in this environment (${err.message}).`);
    await server.close();
    if (process.env.CI || process.env.VERCEL) {
      console.log('Skipping Puppeteer prerender in CI environment. Static build and public assets remain intact.');
      return;
    }
    throw err;
  }

  for (const route of ALL_ROUTES) {
    const page = await browser.newPage();
    await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle0', timeout: 15000 }).catch(async (e) => {
      // Fallback navigation if networkidle0 times out on third-party fonts
      console.warn(`networkidle0 wait warning on ${route} (${e.message}), continuing to ready signal check...`);
    });

    if (DATA_DEPENDENT_ROUTES.has(route)) {
      try {
        await page.waitForSelector('body[data-prerender-ready="true"]', {
          timeout: READY_SELECTOR_TIMEOUT_MS,
        });
      } catch (err) {
        await browser.close();
        await server.close();
        throw new Error(
          `Prerender failed for ${route}: ready signal never appeared within ${READY_SELECTOR_TIMEOUT_MS}ms. ` +
          `This route would have shipped incomplete/loading HTML — build aborted intentionally.`
        );
      }
    }

    // Deduplicate head tags: retain only the active title and canonical link
    await page.evaluate(() => {
      const titles = document.querySelectorAll('head > title');
      if (titles.length > 1) {
        // Helmet inserts the page-specific title first; remove trailing static template titles
        for (let i = 1; i < titles.length; i++) {
          titles[i].remove();
        }
      }
      const canonicals = document.querySelectorAll('head > link[rel="canonical"]');
      if (canonicals.length > 1) {
        for (let i = 0; i < canonicals.length - 1; i++) {
          canonicals[i].remove();
        }
      }
    });

    const html = await page.content();
    let outFile;
    if (route === '/') {
      outFile = path.join('dist', 'index.html');
    } else if (route === '/404') {
      outFile = path.join('dist', '404.html');
    } else {
      const outDir = path.join('dist', route);
      fs.mkdirSync(outDir, { recursive: true });
      outFile = path.join(outDir, 'index.html');
    }
    fs.writeFileSync(outFile, html);

    await page.close();
    console.log(`✓ Prerendered ${route} -> ${outFile}`);
  }

  await browser.close();
  await server.close();

  // Drift check: fail loudly if prerendered project count doesn't match the
  // actual project data source, instead of relying on a hand-maintained list.
  const prerenderedProjectDirs = fs
    .readdirSync(path.join('dist', 'projects'), { withFileTypes: true })
    .filter((d) => d.isDirectory());

  if (prerenderedProjectDirs.length !== PROJECTS.length) {
    throw new Error(
      `Prerendered project count (${prerenderedProjectDirs.length}) does not match ` +
      `project data source count (${PROJECTS.length}). A project was added/removed ` +
      `without updating the prerender routes — build aborted.`
    );
  }

  console.log(`✓ Drift check passed: ${prerenderedProjectDirs.length} prerendered project routes match ${PROJECTS.length} source projects.`);
}

prerender().catch((err) => {
  console.error(err);
  process.exit(1);
});
