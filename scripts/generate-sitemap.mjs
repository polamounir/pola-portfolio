import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const projects = JSON.parse(fs.readFileSync(path.join(rootDir, 'src/data/projects.json'), 'utf-8'));

// Static routes with actual content update dates
const staticRoutes = [
  { url: '/', lastmod: '2026-09-10', changefreq: 'weekly', priority: '1.0' },
  { url: '/about', lastmod: '2026-09-10', changefreq: 'monthly', priority: '0.9' },
  { url: '/projects', lastmod: '2026-09-10', changefreq: 'weekly', priority: '0.9' },
  { url: '/contact', lastmod: '2026-09-10', changefreq: 'monthly', priority: '0.7' },
];

const projectRoutes = projects.map((p) => ({
  url: `/projects/${p.slug}`,
  lastmod: p.dateModified || '2026-09-10',
  changefreq: 'monthly',
  priority: '0.8',
}));

const allUrls = [
  staticRoutes[0],
  staticRoutes[1],
  staticRoutes[2],
  ...projectRoutes,
  staticRoutes[3],
];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (u) => `  <url>
    <loc>https://pola-mounir.vercel.app${u.url}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(rootDir, 'public/sitemap.xml'), sitemapXml);
if (fs.existsSync(path.join(rootDir, 'dist'))) {
  fs.writeFileSync(path.join(rootDir, 'dist/sitemap.xml'), sitemapXml);
}
console.log(`✓ Generated sitemap.xml with real lastmod for ${allUrls.length} routes from projects.json`);
