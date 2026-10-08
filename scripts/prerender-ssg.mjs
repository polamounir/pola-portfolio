import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const distDir = path.join(rootDir, 'dist');
const templatePath = path.join(distDir, 'index.html');
const serverEntryPath = path.join(distDir, 'server', 'entry-server.js');

const projectsJsonPath = path.join(rootDir, 'src', 'data', 'projects.json');
const PROJECTS = JSON.parse(fs.readFileSync(projectsJsonPath, 'utf-8'));

const STATIC_ROUTES = ['/', '/about', '/projects', '/contact', '/404'];
const PROJECT_ROUTES = PROJECTS.map((p) => `/projects/${p.slug}`);
const ALL_ROUTES = [...STATIC_ROUTES, ...PROJECT_ROUTES];

async function runSSG() {
  console.log('⚡ Starting high-speed Native React SSG Pre-rendering...');
  const startTime = Date.now();

  if (!fs.existsSync(templatePath)) {
    throw new Error(`dist/index.html not found. Run client build first.`);
  }
  if (!fs.existsSync(serverEntryPath)) {
    throw new Error(`dist/server/entry-server.js not found. Run SSR build first.`);
  }

  const template = fs.readFileSync(templatePath, 'utf-8');
  const { render } = await import(`file://${serverEntryPath.replace(/\\/g, '/')}`);

  let prerenderCount = 0;

  for (const route of ALL_ROUTES) {
    const { html: rendered } = render(route);

    // In React 19, head tags (title, meta, link, script) are hoisted before the root container
    const rootDivIndex = rendered.indexOf('<div class="min-h-screen');
    let headTags = '';
    let bodyHtml = rendered;

    if (rootDivIndex !== -1) {
      headTags = rendered.slice(0, rootDivIndex).trim();
      bodyHtml = rendered.slice(rootDivIndex).trim();
    }

    let finalHtml = template;

    // 1. Extract and replace <title>
    const titleMatch = headTags.match(/<title[^>]*>([^<]+)<\/title>/i);
    if (titleMatch) {
      finalHtml = finalHtml.replace(/<title[^>]*>([^<]+)<\/title>/i, titleMatch[0]);
    }

    // 2. Extract and replace meta description
    const descMatch = headTags.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*\/?>/i);
    if (descMatch) {
      finalHtml = finalHtml.replace(/<meta[^>]*name=["']description["'][^>]*content=["'][^"']*["'][^>]*\/?>/i, descMatch[0]);
    }

    // 2b. Extract and replace robots meta tag if specified (e.g., 404 noindex)
    const robotsMatch = headTags.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']*)["'][^>]*\/?>/i);
    if (robotsMatch) {
      finalHtml = finalHtml.replace(/<meta[^>]*name=["']robots["'][^>]*content=["'][^"']*["'][^>]*\/?>/i, robotsMatch[0]);
    }

    // 3. Extract and replace og:title, og:description, og:url
    const ogTitleMatch = headTags.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*)["'][^>]*\/?>/i);
    if (ogTitleMatch) {
      finalHtml = finalHtml.replace(/<meta[^>]*property=["']og:title["'][^>]*content=["'][^"']*["'][^>]*\/?>/i, ogTitleMatch[0]);
    }

    const ogDescMatch = headTags.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']*)["'][^>]*\/?>/i);
    if (ogDescMatch) {
      finalHtml = finalHtml.replace(/<meta[^>]*property=["']og:description["'][^>]*content=["'][^"']*["'][^>]*\/?>/i, ogDescMatch[0]);
    }

    const ogUrlMatch = headTags.match(/<meta[^>]*property=["']og:url["'][^>]*content=["']([^"']*)["'][^>]*\/?>/i);
    if (ogUrlMatch) {
      finalHtml = finalHtml.replace(/<meta[^>]*property=["']og:url["'][^>]*content=["'][^"']*["'][^>]*\/?>/i, ogUrlMatch[0]);
    }

    // 4. Extract and inject exactly one canonical link
    // Remove any pre-existing canonical link tags to guarantee zero duplicate/conflicting canonical URLs
    finalHtml = finalHtml.replace(/<link[^>]*rel=["']canonical["'][^>]*\/?>/gi, '');

    const canonicalMatch = headTags.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["'][^>]*\/?>/i);
    if (canonicalMatch) {
      let canonicalTag = canonicalMatch[0];
      // Attach data-rh="true" so client react-helmet-async claims and reconciles this tag without creating duplicates
      if (!canonicalTag.includes('data-rh="true"')) {
        canonicalTag = canonicalTag.replace('<link', '<link data-rh="true"');
      }
      finalHtml = finalHtml.replace('</head>', `    ${canonicalTag}\n  </head>`);
    }

    // 5. Extract JSON-LD scripts if any
    const jsonLdMatches = headTags.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi);
    if (jsonLdMatches) {
      const jsonLdBlock = jsonLdMatches.join('\n');
      finalHtml = finalHtml.replace('</head>', `  ${jsonLdBlock}\n</head>`);
    }

    // 6. Inject pre-rendered body into #root
    finalHtml = finalHtml.replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`);

    // 7. Write pre-rendered files to disk
    if (route === '/') {
      const outFile = path.join(distDir, 'index.html');
      fs.writeFileSync(outFile, finalHtml, 'utf-8');
      prerenderCount++;
      console.log(`✓ SSG Prerendered ${route} -> ${path.relative(rootDir, outFile)} (${Math.round(finalHtml.length / 1024)} kB)`);
    } else if (route === '/404') {
      const outFile = path.join(distDir, '404.html');
      fs.writeFileSync(outFile, finalHtml, 'utf-8');
      prerenderCount++;
      console.log(`✓ SSG Prerendered ${route} -> ${path.relative(rootDir, outFile)} (${Math.round(finalHtml.length / 1024)} kB)`);
    } else {
      const cleanRoute = route.replace(/^\//, '');
      const routeDir = path.join(distDir, cleanRoute);
      fs.mkdirSync(routeDir, { recursive: true });
      const dirIndexFile = path.join(routeDir, 'index.html');
      fs.writeFileSync(dirIndexFile, finalHtml, 'utf-8');

      // Also generate clean route file (e.g. dist/contact.html) for hosting platforms with cleanUrls
      const flatHtmlFile = path.join(distDir, `${cleanRoute}.html`);
      fs.mkdirSync(path.dirname(flatHtmlFile), { recursive: true });
      fs.writeFileSync(flatHtmlFile, finalHtml, 'utf-8');

      prerenderCount++;
      console.log(`✓ SSG Prerendered ${route} -> ${path.relative(rootDir, dirIndexFile)} (${Math.round(finalHtml.length / 1024)} kB)`);
    }
  }

  // Clean up server build directory
  const serverDir = path.join(distDir, 'server');
  if (fs.existsSync(serverDir)) {
    fs.rmSync(serverDir, { recursive: true, force: true });
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`🎉 SSG pre-rendering completed: ${prerenderCount} routes generated in ${elapsed}s!`);
}

runSSG().catch((err) => {
  console.error('SSG build failed:', err);
  process.exit(1);
});
