import React, { Suspense } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion, type Transition } from "framer-motion";
import { Header, Footer, SEO } from "./components/common";
import { BackgroundGrid, CursorGlow, SuspenseLoader } from "./components/ui";
import { MaintenanceBanner } from "./components/popups";
import { useTypewriter, usePortfolioData } from "./hooks";

// --- Core Landing Module (Eagerly Loaded for Instant Initial Paint) ---
import HomeSection from "./components/sections/HomeSection";

// --- Route-Driven Feature Modules (Lazy Loaded on Navigation) ---
const LazyProjectsSection = React.lazy(() => import("./components/sections/ProjectsSection"));
const LazyContactSection = React.lazy(() => import("./components/sections/ContactSection"));
const LazyAboutPage = React.lazy(() => import("./components/pages/AboutPage"));
const LazyProjectPage = React.lazy(() => import("./components/pages/ProjectPage"));
const LazyNotFoundPage = React.lazy(() => import("./components/pages/NotFoundPage"));

export interface AppRouteComponents {
  HomeSection?: React.ComponentType<any>;
  ProjectsSection?: React.ComponentType<any>;
  ContactSection?: React.ComponentType<any>;
  AboutPage?: React.ComponentType<any>;
  ProjectPage?: React.ComponentType<any>;
  NotFoundPage?: React.ComponentType<any>;
}

export interface AppProps {
  components?: AppRouteComponents;
}


// Framer Motion Page Transition Variants (Lightweight, hardware-accelerated transforms)
const pageVariants = {
  initial: { opacity: 0, y: 8 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -8 },
};

const pageTransition: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

const App: React.FC<AppProps> = ({ components }) => {
  const Home = components?.HomeSection || HomeSection;
  const Projects = components?.ProjectsSection || LazyProjectsSection;
  const Contact = components?.ContactSection || LazyContactSection;
  const About = components?.AboutPage || LazyAboutPage;
  const ProjectDetail = components?.ProjectPage || LazyProjectPage;
  const NotFound = components?.NotFoundPage || LazyNotFoundPage;

  const location = useLocation();
  const isFirstMountRef = React.useRef(true);

  // 2-second App Opening Intro Loader
  const isServer = typeof window === "undefined";
  const [showAppLoader, setShowAppLoader] = React.useState(!isServer);

  React.useEffect(() => {
    isFirstMountRef.current = false;
    const timer = setTimeout(() => {
      setShowAppLoader(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Custom interaction hooks
  const terminalText = useTypewriter("Hello", 150);

  // Centralized live data & contact submission hook
  const {
    personalInfo,
    aboutMe,
    projects,
    skills,
    experience,
    navigationLinks,
    alertConfig,
    themeConfig,
    faqs,
    certifications,
    dailyTools,
    formData,
    setFormData,
    submissionStatus,
    handleSubmit,
  } = usePortfolioData();

  // Dynamically apply custom theme colors and typography
  React.useEffect(() => {
    if (!themeConfig) return;

    const root = document.documentElement;
    if (themeConfig.primaryColor) {
      root.style.setProperty("--app-primary", themeConfig.primaryColor);
    }
    if (themeConfig.primaryDarkColor) {
      root.style.setProperty("--app-primary-dark", themeConfig.primaryDarkColor);
    }
    if (themeConfig.secondaryColor) {
      root.style.setProperty("--app-secondary", themeConfig.secondaryColor);
    }
    if (themeConfig.secondaryDarkColor) {
      root.style.setProperty("--app-secondary-dark", themeConfig.secondaryDarkColor);
    }
    if (themeConfig.backgroundColor) {
      root.style.setProperty("--app-bg", themeConfig.backgroundColor);
    }
    if (themeConfig.cardBackgroundColor) {
      root.style.setProperty("--app-card-bg", themeConfig.cardBackgroundColor);
    }
    if (themeConfig.cardSubColor) {
      root.style.setProperty("--app-card-sub", themeConfig.cardSubColor);
    }
    if (themeConfig.glowColor) {
      root.style.setProperty("--app-glow", themeConfig.glowColor);
    }
    if (themeConfig.fontFamily) {
      root.style.setProperty("--app-font", themeConfig.fontFamily);

      const rawFontName = themeConfig.fontFamily.split(",")[0].replace(/['"]/g, "").trim();
      if (rawFontName === "JetBrains Mono") return;

      const FONT_URLS: Record<string, string> = {
        "Fira Code": "https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&display=swap",
        "Inter": "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
        "Space Grotesk": "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap",
        "Poppins": "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
        "Outfit": "https://fonts.googleapis.com/css2?family=Outfit:wght@300..900&display=swap",
        "Playfair Display": "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap",
      };

      if (FONT_URLS[rawFontName]) {
        const fontId = `google-font-${rawFontName.toLowerCase().replace(/\s+/g, "-")}`;
        if (!document.getElementById(fontId)) {
          const link = document.createElement("link");
          link.id = fontId;
          link.rel = "stylesheet";
          link.href = FONT_URLS[rawFontName];
          document.head.appendChild(link);
        }
      }
    }
  }, [themeConfig]);

  // Derive current section for legacy navigation sync
  const currentSection =
    location.pathname === "/"
      ? "home"
      : location.pathname === "/about"
      ? "skills"
      : location.pathname.startsWith("/projects")
      ? "projects"
      : location.pathname === "/contact"
      ? "contact"
      : "home";

  return (
    <div
      className="min-h-screen bg-gray-950 text-gray-100 font-mono relative overflow-hidden"
      style={{
        fontFamily: "var(--app-font, inherit)",
      }}
    >
      {/* Background Matrix Grid */}
      <BackgroundGrid />

      {/* Interactive Cursor Glow */}
      <CursorGlow />

      {/* Accessibility: Skip to Main Content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-green-500 focus:text-black focus:font-bold focus:rounded-md focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Header Navigation */}
      <Header
        currentSection={currentSection}
        setCurrentSection={() => {}}
        setCurrentProject={() => {}}
        PERSONAL_INFO={personalInfo}
        navLinks={navigationLinks}
      />

      {/* Main Content Transition Container */}
      <main id="main-content" className="relative z-10 max-w-7xl mx-auto px-6 py-12 min-h-[75dvh]">
        <Suspense fallback={null}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Routes location={location}>
                <Route
                  path="/"
                  element={
                    <>
                      <SEO />
                      <Home
                        terminalText={terminalText}
                        fullText="Hello"
                        PERSONAL_INFO={personalInfo}
                        ABOUT_ME_SUMMARY={aboutMe}
                        PROJECT_DATA={projects}
                      />
                    </>
                  }
                />
                <Route
                  path="/about"
                  element={
                    <About
                      personalInfo={personalInfo}
                      aboutMe={aboutMe}
                      skills={skills}
                      experience={experience}
                      projects={projects}
                      faqs={faqs}
                      certifications={certifications}
                      tools={dailyTools}
                    />
                  }
                />
                <Route
                  path="/projects"
                  element={
                    <>
                      <SEO />
                      <Projects
                        projects={projects}
                        setCurrentProject={() => {}}
                        PERSONAL_INFO={personalInfo}
                        isStandalonePage={true}
                      />
                    </>
                  }
                />
                <Route
                  path="/projects/:slug"
                  element={
                    <ProjectDetail
                      projects={projects}
                      personalInfo={personalInfo}
                    />
                  }
                />
                <Route
                  path="/contact"
                  element={
                    <>
                      <SEO />
                      <Contact
                        PERSONAL_INFO={personalInfo}
                        formData={formData}
                        setFormData={setFormData}
                        handleSubmit={handleSubmit}
                        submissionStatus={submissionStatus}
                      />
                    </>
                  }
                />
                <Route path="/skills" element={<Navigate to="/about" replace />} />
                <Route path="/experience" element={<Navigate to="/about" replace />} />
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </Suspense>
      </main>

      {/* Clean Shared Footer */}
      <Footer name={personalInfo.name} />

      {/* Modular System Popup Notice */}
      <MaintenanceBanner alertConfig={alertConfig} />

      {/* 2-second App Opening Intro Loader Overlay */}
      <AnimatePresence>
        {showAppLoader && (
          <motion.div
            key="app-intro-overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950 pointer-events-auto"
          >
            <SuspenseLoader message="starting system..." />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
