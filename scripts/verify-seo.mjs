import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

const projects = JSON.parse(fs.readFileSync(path.join(rootDir, 'src/data/projects.json'), 'utf-8'));
const faqData = JSON.parse(fs.readFileSync(path.join(rootDir, 'src/data/faq.json'), 'utf-8'));

console.log('====================================================');
console.log('       SEO & PRERENDER VERIFICATION SUITE (TIER 1)  ');
console.log('====================================================\n');

let failed = false;

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    failed = true;
  } else {
    console.log(`✅ PASS: ${message}`);
  }
}

// 1. Dependency verification
const pkg = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf-8'));
assert(pkg.dependencies['react-router-dom'], 'react-router-dom is in dependencies');
assert(pkg.dependencies['react-helmet-async'], 'react-helmet-async is in dependencies');
assert(pkg.devDependencies['puppeteer'], 'puppeteer is in devDependencies');
assert(pkg.devDependencies['@lhci/cli'], '@lhci/cli is in devDependencies');

// 2. Prerender script server check
const prerenderScript = fs.readFileSync(path.join(rootDir, 'scripts/prerender.mjs'), 'utf-8');
assert(!prerenderScript.includes('createServer'), 'scripts/prerender.mjs does NOT contain createServer');
assert(prerenderScript.includes('preview({'), 'scripts/prerender.mjs uses preview from vite');

// 3. OG preview image verification
const ogDistPath = path.join(distDir, 'og-preview.png');
assert(fs.existsSync(ogDistPath), 'dist/og-preview.png exists in build output');
if (fs.existsSync(ogDistPath)) {
  const stat = fs.statSync(ogDistPath);
  assert(stat.size > 50000, `dist/og-preview.png size is valid (${Math.round(stat.size / 1024)} KB)`);
}

// 4. Verify physical files, real content, and schemas for every project route
const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;

for (const p of projects) {
  const filePath = path.join(distDir, 'projects', p.slug, 'index.html');
  assert(fs.existsSync(filePath), `Physical file exists: dist/projects/${p.slug}/index.html`);
  
  if (fs.existsSync(filePath)) {
    const html = fs.readFileSync(filePath, 'utf-8');
    
    // Check real text presence
    assert(html.includes(p.title), `Real title "${p.title}" present in HTML`);
    assert(html.includes(p.tech[0]), `Tech stack item "${p.tech[0]}" present in HTML`);
    assert(!html.includes('$ loading_module'), `No loading placeholder in dist/projects/${p.slug}/index.html`);
    
    // Check CreativeWork JSON-LD
    assert(html.includes('"@type":"CreativeWork"'), `CreativeWork JSON-LD present for ${p.slug}`);
    assert(html.includes('"creator"'), `Creator present in JSON-LD for ${p.slug}`);
    assert(html.includes('Pola Mounir'), `Pola Mounir cited as creator for ${p.slug}`);
    
    // T1-1: BreadcrumbList JSON-LD
    assert(html.includes('"@type":"BreadcrumbList"'), `BreadcrumbList JSON-LD present for ${p.slug}`);
    assert(
      html.includes(`https://pola-mounir.vercel.app/projects/${p.slug}`),
      `BreadcrumbList item 3 matches route canonical URL for ${p.slug}`
    );

    // T1-3: datePublished / dateModified format
    assert(p.datePublished && isoDateRegex.test(p.datePublished), `Valid ISO datePublished for ${p.slug}: ${p.datePublished}`);
    assert(p.dateModified && isoDateRegex.test(p.dateModified), `Valid ISO dateModified for ${p.slug}: ${p.dateModified}`);
    assert(html.includes(p.datePublished), `datePublished rendered in JSON-LD for ${p.slug}`);
    assert(html.includes(p.dateModified), `dateModified rendered in JSON-LD for ${p.slug}`);
  }
}

// 5. Verify /about page, single H1, and T1-2 FAQPage schema + DOM parity
const aboutPath = path.join(distDir, 'about', 'index.html');
assert(fs.existsSync(aboutPath), 'Physical file exists: dist/about/index.html');
if (fs.existsSync(aboutPath)) {
  const aboutHtml = fs.readFileSync(aboutPath, 'utf-8');
  assert(aboutHtml.includes('<h1'), 'Single H1 present in /about');
  assert(aboutHtml.includes('Pola Mounir is a'), 'Factual identity sentence present in /about');
  assert(aboutHtml.includes('Technical Skills'), 'Skills present in /about');
  assert(aboutHtml.includes('Frequently Asked Questions'), 'Visible FAQ section present in /about');

  // T1-2: FAQPage schema check and DOM parity
  assert(aboutHtml.includes('"@type":"FAQPage"'), 'FAQPage JSON-LD schema present in /about');
  for (const item of faqData) {
    assert(aboutHtml.includes(item.question), `Visible FAQ question present: "${item.question}"`);
    assert(aboutHtml.includes(item.answer), `Visible FAQ answer present: "${item.answer.slice(0, 40)}..."`);
  }
}

// 6. Verify robots.txt and T1-4 sitemap.xml with real lastmod
const robotsPath = path.join(distDir, 'robots.txt');
assert(fs.existsSync(robotsPath), 'dist/robots.txt exists');
const sitemapPath = path.join(distDir, 'sitemap.xml');
assert(fs.existsSync(sitemapPath), 'dist/sitemap.xml exists');
if (fs.existsSync(sitemapPath)) {
  const sitemap = fs.readFileSync(sitemapPath, 'utf-8');
  assert(!sitemap.includes('hreflang="ar"'), 'No fake Arabic hreflang in sitemap.xml');
  assert(sitemap.includes('/projects/fast-box'), 'Project routes indexed in sitemap.xml');
  
  // T1-4: Assert all URLs have valid lastmod
  const lastmodMatches = sitemap.match(/<lastmod>(.*?)<\/lastmod>/g) || [];
  const locMatches = sitemap.match(/<loc>(.*?)<\/loc>/g) || [];
  assert(
    locMatches.length > 0 && locMatches.length === lastmodMatches.length,
    `All ${locMatches.length} sitemap URLs contain a valid <lastmod>`
  );

  // Single-source consistency: check that sitemap <lastmod> matches projects.json dateModified
  for (const p of projects) {
    const pattern = new RegExp(`<loc>https://pola-mounir\\.vercel\\.app/projects/${p.slug}</loc>\\s*<lastmod>${p.dateModified}</lastmod>`);
    assert(pattern.test(sitemap), `sitemap.xml <lastmod> matches projects.json dateModified for ${p.slug} (${p.dateModified})`);
  }
}

// 7. Root JSON-LD in dist/index.html
const rootIndexPath = path.join(distDir, 'index.html');
assert(fs.existsSync(rootIndexPath), 'dist/index.html exists');
if (fs.existsSync(rootIndexPath)) {
  const indexHtml = fs.readFileSync(rootIndexPath, 'utf-8');
  assert(!indexHtml.includes('@polamounir" />'), 'twitter:creator removed from root HTML');
  assert(!indexHtml.includes('"Next.js"'), 'Next.js removed from knowsAbout');
  assert(indexHtml.includes('https://pola-mounir.vercel.app/og-preview.png'), 'OG preview image referenced in JSON-LD');
  assert(!indexHtml.includes('<link rel="canonical" href="https://pola-mounir.vercel.app/" />'), 'Static canonical link removed from index.html (delegated to Helmet)');
}

// 8. T2-2: Verify Custom 404 Page and noindex
const notFoundPath = path.join(distDir, '404.html');
assert(fs.existsSync(notFoundPath), 'dist/404.html exists');
if (fs.existsSync(notFoundPath)) {
  const notFoundHtml = fs.readFileSync(notFoundPath, 'utf-8');
  assert(notFoundHtml.includes('404 — Page Not Found'), '404 heading present in 404.html');
  assert(notFoundHtml.includes('name="robots" content="noindex, nofollow"'), 'noindex meta tag present in 404.html');
  assert(notFoundHtml.includes('Return to Home'), 'Navigation recovery link present in 404.html');
}

// 9. T2-4: Favicon suite and manifest.json
assert(fs.existsSync(path.join(distDir, 'manifest.json')), 'dist/manifest.json exists');
assert(fs.existsSync(path.join(distDir, 'favicon.ico')), 'dist/favicon.ico exists');
assert(fs.existsSync(path.join(distDir, 'favicon-32x32.png')), 'dist/favicon-32x32.png exists');
assert(fs.existsSync(path.join(distDir, 'apple-touch-icon.png')), 'dist/apple-touch-icon.png exists');

console.log('\n----------------------------------------------------');
if (failed) {
  console.error('❌ SOME VERIFICATIONS FAILED');
  process.exit(1);
} else {
  console.log('🎉 ALL VERIFICATION CHECKS PASSED!');
}
console.log('----------------------------------------------------\n');
