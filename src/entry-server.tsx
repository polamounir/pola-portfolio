import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";

import HomeSection from "./components/sections/HomeSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import ContactSection from "./components/sections/ContactSection";
import AboutPage from "./components/pages/AboutPage";
import ProjectPage from "./components/pages/ProjectPage";
import NotFoundPage from "./components/pages/NotFoundPage";

export interface RenderResult {
  html: string;
}

export function render(url: string): RenderResult {
  const helmetContext = {};

  const html = renderToString(
    <StrictMode>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <App
            components={{
              HomeSection,
              ProjectsSection,
              ContactSection,
              AboutPage,
              ProjectPage,
              NotFoundPage,
            }}
          />
        </StaticRouter>
      </HelmetProvider>
    </StrictMode>
  );

  return { html };
}
