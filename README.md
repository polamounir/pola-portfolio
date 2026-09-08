<div align="center">

# Pola Mounir — Modern React Frontend Developer Portfolio

An interactive, high-performance, terminal-inspired personal developer portfolio built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS**, and **Framer Motion**.

[![Lighthouse Score](https://img.shields.io/badge/Lighthouse-99%2F100-brightgreen.svg?style=flat-square&logo=lighthouse)](https://pola-mounir.vercel.app/)
[![React Version](https://img.shields.io/badge/React-19.0.0-61DAFB.svg?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-3178C6.svg?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-06B6D4.svg?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-7.1.12-646CFF.svg?style=flat-square&logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

[**Live Demo**](https://pola-mounir.vercel.app/) • [**GitHub Profile**](https://github.com/polamounir) • [**LinkedIn**](https://www.linkedin.com/in/pola-mounir-samir/)

</div>

---

## Key Features

- **Blazing-Fast Performance (0.6s FCP / 0.9s LCP)**: Non-render-blocking font preloading, inline critical CSS, and concurrent `startTransition` React state updates.
- **Cyber-Terminal Theme**: Glassmorphism UI, interactive shell typing simulation, animated terminal windows, and customized developer statistics.
- **100% WCAG AA Accessibility**: Fully tested color contrast ratios, screen-reader accessible controls (`aria-label`), keyboard navigation, and semantic HTML5 landmarks.
- **Responsive Layout**: Flawlessly optimized across Mobile, Tablet, and Desktop displays.
- **AI Agent & Crawler Friendly**: Structured JSON-LD Knowledge Graph, `sitemap.xml`, `robots.txt`, and [`llms.txt`](https://llmstxt.org/) integration.
- **Enterprise Security Headers**: Pre-configured `Content-Security-Policy`, `HSTS`, `X-Frame-Options`, and `COOP` headers via `vercel.json`.

---

## Technology Stack

| Category | Technology |
|---|---|
| **Core Framework** | React 19, TypeScript 5 |
| **Build Tool & Server** | Vite 7 |
| **Styling & CSS** | Tailwind CSS v3, Vanilla CSS Design System |
| **Animations & FX** | Framer Motion |
| **Icons & UI Components** | Lucide React |
| **Deployment & Host** | Vercel Serverless Platform |

---

## Lighthouse Benchmark Results

| Metric | Score | Value | Status |
|---|---|---|---|
| **First Contentful Paint (FCP)** | **99 / 100** | **0.6 s** | Excellent |
| **Largest Contentful Paint (LCP)** | **96 / 100** | **0.9 s** | Excellent |
| **Speed Index** | **99 / 100** | **0.8 s** | Excellent |
| **Total Blocking Time (TBT)** | **100 / 100** | **0 ms** | Perfect |
| **Cumulative Layout Shift (CLS)** | **100 / 100** | **0.006** | Perfect |
| **Search Engine Optimization (SEO)** | **100 / 100** | **100%** | Perfect |

---

## Project Structure

```text
pola-portfolio/
├── public/
│   ├── llms.txt             # AI agent navigation & crawler documentation
│   ├── robots.txt           # Search engine crawling rules
│   └── sitemap.xml          # XML Sitemap index
├── src/
│   ├── components/
│   │   ├── common/          # Header, Footer, NavItem
│   │   ├── modals/          # ProjectDetail modal
│   │   ├── popups/          # StatusToast notification
│   │   ├── sections/        # Home, Skills, Projects, Experience, Contact
│   │   └── ui/              # BackgroundGrid & background UI elements
│   ├── hooks/
│   │   └── usePortfolioData.tsx # Data fetching, cache & state hydration hook
│   ├── services/
│   │   └── api.ts           # Portfolio REST API service layer
│   ├── constants/           # Fallback data & initial constants
│   ├── types/               # TypeScript interfaces & type definitions
│   ├── App.tsx              # Main Application Root
│   ├── main.tsx             # React entry point
│   └── index.css            # Global styles & Tailwind directives
├── index.html               # Main HTML entry with inline critical CSS & font preloads
├── vercel.json              # Production security header directives
├── vite.config.ts           # Vite build configuration
└── package.json             # Dependencies & scripts
```

---

## Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm or yarn

### Installation & Local Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/polamounir/pola-portfolio.git
   cd pola-portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` or `http://localhost:3001` in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview the production build**:
   ```bash
   npm run preview
   ```
   Open `http://localhost:4173` to test the built output locally.

---

## Contact & Links

- **Developer**: Pola Mounir
- **Email**: [polamounir103@gmail.com](mailto:polamounir103@gmail.com)
- **LinkedIn**: [linkedin.com/in/pola-mounir-samir](https://www.linkedin.com/in/pola-mounir-samir/)
- **GitHub**: [github.com/polamounir](https://github.com/polamounir)

---

## License

This project is open-source and available under the [MIT License](LICENSE).
