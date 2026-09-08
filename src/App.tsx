import React, { useState, Suspense } from "react";
import { AnimatePresence, motion, type Transition } from "framer-motion";
import { Header, Footer, SEO } from "./components/common";
import { BackgroundGrid, CursorGlow } from "./components/ui";
import { MaintenanceBanner } from "./components/popups";
import { useTypewriter, usePortfolioData } from "./hooks";
import type { Project } from "./types";

// --- Lazy-Loaded Feature Modules (SEO & Bundle Optimization) ---
const ProjectDetail = React.lazy(() => import("./components/modals/ProjectDetail"));
const HomeSection = React.lazy(() => import("./components/sections/HomeSection"));
const SkillsSection = React.lazy(() => import("./components/sections/SkillsSection"));
const ProjectsSection = React.lazy(() => import("./components/sections/ProjectsSection"));
const ExperienceSection = React.lazy(() => import("./components/sections/ExperienceSection"));
const ContactSection = React.lazy(() => import("./components/sections/ContactSection"));

// Framer Motion Page Transition Variants
const pageVariants = {
  initial: { opacity: 0, y: 10, filter: "blur(5px)" },
  in: { opacity: 1, y: 0, filter: "blur(0px)" },
  out: { opacity: 0, y: -10, filter: "blur(5px)" },
};

const pageTransition: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<string>("home");
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

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
      // Skip injection for the default font — it's already preloaded in index.html
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

  return (
    <div
      className="min-h-screen bg-gray-950 text-gray-100 font-mono relative overflow-hidden"
      style={{
        fontFamily: "var(--app-font, inherit)",
      }}
    >
      {/* Dynamic SEO Title & Meta Management */}
      <SEO currentSection={currentSection} name={personalInfo.name} />

      {/* Background Matrix Grid */}
      <BackgroundGrid />

      {/* Interactive Cursor Glow */}
      <CursorGlow />

      {/* Header Navigation */}
      <Suspense fallback={null}>
        <Header
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
          setCurrentProject={setCurrentProject}
          PERSONAL_INFO={personalInfo}
          navLinks={navigationLinks}
        />
      </Suspense>

      {/* Main Content Transition Container */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 min-h-[75dvh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <Suspense
              fallback={
                <div className="text-center min-h-[85dvh] py-20 text-green-400/50 flex justify-center items-center font-mono">
                  $ loading_module --section {currentSection}...
                </div>
              }
            >
              {currentSection === "home" && (
                <HomeSection
                  terminalText={terminalText}
                  fullText="Hello"
                  PERSONAL_INFO={personalInfo}
                  ABOUT_ME_SUMMARY={aboutMe}
                  PROJECT_DATA={projects}
                />
              )}

              {currentSection === "skills" && (
                <SkillsSection
                  skills={skills}
                  PROJECT_DATA={projects}
                />
              )}

              {currentSection === "projects" && (
                <ProjectsSection
                  projects={projects}
                  setCurrentProject={setCurrentProject}
                  PERSONAL_INFO={personalInfo}
                />
              )}

              {currentSection === "experience" && (
                <ExperienceSection
                  experience={experience}
                  PERSONAL_INFO={personalInfo}
                />
              )}

              {currentSection === "contact" && (
                <ContactSection
                  PERSONAL_INFO={personalInfo}
                  formData={formData}
                  setFormData={setFormData}
                  handleSubmit={handleSubmit}
                  submissionStatus={submissionStatus}
                />
              )}
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {currentProject && (
          <Suspense fallback={null}>
            <ProjectDetail
              project={currentProject}
              onClose={() => setCurrentProject(null)}
            />
          </Suspense>
        )}
      </AnimatePresence>

      {/* Clean Shared Footer */}
      <Footer name={personalInfo.name} />

      {/* Modular System Popup Notice */}
      <MaintenanceBanner alertConfig={alertConfig} />
    </div>
  );
};

export default App;
