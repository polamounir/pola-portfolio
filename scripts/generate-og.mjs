import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputPath = path.resolve(__dirname, '../public/og-preview.png');

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

const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700;800&family=Inter:wght@400;600;700&display=swap');
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      width: 1200px;
      height: 630px;
      background: #030712;
      color: #f3f4f6;
      font-family: 'JetBrains Mono', monospace;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 60px 80px;
      position: relative;
      overflow: hidden;
    }
    
    .grid-bg {
      position: absolute;
      inset: 0;
      background-image: 
        linear-gradient(to right, rgba(34, 197, 94, 0.08) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(34, 197, 94, 0.08) 1px, transparent 1px);
      background-size: 40px 40px;
      z-index: 0;
    }
    
    .glow-1 {
      position: absolute;
      top: -80px;
      right: -80px;
      width: 500px;
      height: 500px;
      background: radial-gradient(circle, rgba(34, 197, 94, 0.16) 0%, transparent 70%);
      border-radius: 50%;
      z-index: 0;
    }
    
    .glow-2 {
      position: absolute;
      bottom: -100px;
      left: 100px;
      width: 450px;
      height: 450px;
      background: radial-gradient(circle, rgba(6, 182, 212, 0.14) 0%, transparent 70%);
      border-radius: 50%;
      z-index: 0;
    }
    
    .content {
      position: relative;
      z-index: 10;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
    }
    
    .header {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    
    .terminal-dots {
      display: flex;
      gap: 8px;
    }
    
    .dot {
      width: 14px;
      height: 14px;
      border-radius: 50%;
    }
    
    .dot-red { background: #ef4444; }
    .dot-yellow { background: #eab308; }
    .dot-green { background: #22c55e; }
    
    .terminal-title {
      font-size: 16px;
      color: #9ca3af;
      margin-left: 12px;
    }
    
    .hero {
      margin-top: 15px;
    }
    
    .prompt {
      color: #22c55e;
      font-size: 24px;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .title {
      font-size: 64px;
      font-weight: 800;
      letter-spacing: -0.02em;
      background: linear-gradient(135deg, #22c55e 0%, #06b6d4 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 12px;
    }
    
    .role {
      font-size: 32px;
      font-weight: 700;
      color: #e5e7eb;
      margin-bottom: 20px;
    }
    
    .bio {
      font-family: 'Inter', sans-serif;
      font-size: 21px;
      color: #9ca3af;
      line-height: 1.5;
      max-width: 880px;
    }
    
    .footer {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      border-top: 1px solid rgba(34, 197, 94, 0.25);
      padding-top: 24px;
    }
    
    .tags {
      display: flex;
      gap: 12px;
    }
    
    .tag {
      font-size: 15px;
      font-weight: 600;
      color: #22c55e;
      background: rgba(34, 197, 94, 0.1);
      border: 1px solid rgba(34, 197, 94, 0.35);
      padding: 6px 14px;
      border-radius: 6px;
    }
    
    .location {
      font-size: 16px;
      color: #9ca3af;
    }
  </style>
</head>
<body>
  <div class="grid-bg"></div>
  <div class="glow-1"></div>
  <div class="glow-2"></div>
  
  <div class="content">
    <div class="header">
      <div class="terminal-dots">
        <div class="dot dot-red"></div>
        <div class="dot dot-yellow"></div>
        <div class="dot dot-green"></div>
      </div>
      <div class="terminal-title">bash — pola-mounir.vercel.app</div>
    </div>
    
    <div class="hero">
      <div class="prompt">
        <span>guest@portfolio:~$</span>
        <span style="color: #f3f4f6;">whoami</span>
      </div>
      <div class="title">Pola Mounir</div>
      <div class="role">React Frontend Developer</div>
      <div class="bio">
        Specializing in responsive, high-performance web applications with React.js, TypeScript, and modern component architecture.
      </div>
    </div>
    
    <div class="footer">
      <div class="tags">
        <div class="tag">React.js</div>
        <div class="tag">TypeScript</div>
        <div class="tag">Tailwind CSS</div>
        <div class="tag">Redux Toolkit</div>
      </div>
      <div class="location">
        📍 Giza, Egypt · github.com/polamounir
      </div>
    </div>
  </div>
</body>
</html>
`;

async function generateOgImage() {
  console.log('Generating branded 1200x630 OG image...');
  const executablePath = getExecutablePath();
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
  
  await page.screenshot({ path: outputPath, type: 'png' });
  await browser.close();
  console.log(`✓ OG preview image successfully saved to ${outputPath}`);
}

generateOgImage().catch((err) => {
  console.error('Failed to generate OG preview image:', err);
  process.exit(1);
});
