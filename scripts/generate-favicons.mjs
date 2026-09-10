import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');

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

const getSvg = (size) => `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" rx="${size * 0.22}" fill="#030712"/>
  <rect x="${size * 0.04}" y="${size * 0.04}" width="${size * 0.92}" height="${size * 0.92}" rx="${size * 0.18}" stroke="#22c55e" stroke-width="${size * 0.05}" stroke-opacity="0.6"/>
  <path d="M${size * 0.28} ${size * 0.35}L${size * 0.44} ${size * 0.5}L${size * 0.28} ${size * 0.65}" stroke="#22c55e" stroke-width="${size * 0.08}" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M${size * 0.52} ${size * 0.65}H${size * 0.72}" stroke="#38bdf8" stroke-width="${size * 0.08}" stroke-linecap="round"/>
</svg>
`;

async function generate() {
  console.log('Generating branded favicon suite...');
  
  // Write standard favicon SVG
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), getSvg(64));

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: getExecutablePath(),
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const sizes = [
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'favicon-192x192.png', size: 192 },
    { name: 'favicon-512x512.png', size: 512 },
  ];

  for (const { name, size } of sizes) {
    const page = await browser.newPage();
    await page.setViewport({ width: size, height: size, deviceScaleFactor: 1 });
    const svgDataUri = `data:image/svg+xml;utf8,${encodeURIComponent(getSvg(size))}`;
    await page.setContent(`<!DOCTYPE html><html><body style="margin:0;padding:0;background:transparent;"><img src="${svgDataUri}" width="${size}" height="${size}" style="display:block;" /></body></html>`);
    const outPath = path.join(publicDir, name);
    await page.screenshot({ path: outPath, omitBackground: true });
    await page.close();
    console.log(`✓ Created ${name} (${size}x${size})`);
  }

  // Duplicate 32x32 as favicon.ico for legacy browsers
  fs.copyFileSync(path.join(publicDir, 'favicon-32x32.png'), path.join(publicDir, 'favicon.ico'));
  console.log('✓ Created favicon.ico');

  await browser.close();
  console.log('Favicon generation complete.');
}

generate().catch((err) => {
  console.error('Failed to generate favicons:', err);
  process.exit(1);
});
