import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectImagesDir = path.resolve(__dirname, '../src/assets/projects');

async function optimizeImages() {
  const files = fs.readdirSync(projectImagesDir);
  console.log('Optimizing project screenshots with sharp...');

  for (const file of files) {
    if (file.endsWith('.png')) {
      const inputPath = path.join(projectImagesDir, file);
      const outputWebp = path.join(projectImagesDir, file.replace(/\.png$/, '.webp'));
      const origSize = fs.statSync(inputPath).size;

      await sharp(inputPath)
        .resize({ width: 1400, withoutEnlargement: true })
        .webp({ quality: 82, effort: 5 })
        .toFile(outputWebp);

      const webpSize = fs.statSync(outputWebp).size;
      const reduction = Math.round((1 - webpSize / origSize) * 100);
      console.log(`✓ ${file} (${Math.round(origSize / 1024)} kB) -> ${path.basename(outputWebp)} (${Math.round(webpSize / 1024)} kB) [${reduction}% smaller]`);
    }
  }
}

optimizeImages().catch((err) => {
  console.error('Error optimizing images:', err);
  process.exit(1);
});
