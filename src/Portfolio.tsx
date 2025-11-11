// Portfolio.tsx

import React, { useState, useEffect, Suspense } from "react";
import { AnimatePresence, motion, type Transition } from "framer-motion";
import { Code, Cpu, Database } from "lucide-react";

// --- LAZY LOADING IMPORTS (MAX SEO/PERFORMANCE) ---
// Note: We use React.lazy for the large content sections
const ProjectDetail = React.lazy(
  () => import("./components/modals/ProjectDetail")
);
const Header = React.lazy(() => import("./components/common/Header"));
const HomeSection = React.lazy(
  () => import("./components/sections/HomeSection")
);
const SkillsSection = React.lazy(
  () => import("./components/sections/SkillsSection")
);
const ProjectsSection = React.lazy(
  () => import("./components/sections/ProjectsSection")
);
const ExperienceSection = React.lazy(
  () => import("./components/sections/ExperienceSection")
);
const ContactSection = React.lazy(
  () => import("./components/sections/ContactSection")
);

import type {
  PersonalInfo,
  Project,
  Skill,
  ExperienceItem,
  FormData,
} from "./utils/types";

// --- Framer Motion Variants for Page Transitions ---
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

const PERSONAL_INFO: PersonalInfo = {
  name: "Pola Mounir",
  role: "React Frontend Developer",
  location: "Cairo, Egypt",
  email: "polamounir103@gmail.com",
  github: "LINK_TO_POLA_GITHUB",
  linkedin: "LINK_TO_POLA_LINKEDIN",
};

const ABOUT_ME_SUMMARY: string =
  "Frontend Developer with experience in building responsive and user-friendly web applications using React.js and modern web technologies. Skilled in creating efficient and maintainable code with a focus on performance and accessibility.";

const SKILL_DATA: Skill[] = [
  {
    name: "HTML5",
    level: 95,
    icon: <Code className="w-4 h-4" />,
    category: "Frontend",
  },
  {
    name: "CSS3",
    level: 90,
    icon: <Code className="w-4 h-4" />,
    category: "Frontend",
  },
  {
    name: "Tailwind CSS",
    level: 90,
    icon: <Code className="w-4 h-4" />,
    category: "Frontend",
  },
  {
    name: "JavaScript",
    level: 95,
    icon: <Code className="w-4 h-4" />,
    category: "Frontend",
  },
  {
    name: "TypeScript",
    level: 85,
    icon: <Code className="w-4 h-4" />,
    category: "Frontend",
  },
  {
    name: "React.js",
    level: 95,
    icon: <Cpu className="w-4 h-4" />,
    category: "Frontend",
  },
  {
    name: "Redux Toolkit",
    level: 85,
    icon: <Cpu className="w-4 h-4" />,
    category: "Frontend",
  },
  {
    name: "Node.js",
    level: 75,
    icon: <Database className="w-4 h-4" />,
    category: "Backend/DB",
  },
  {
    name: "Express.js",
    level: 75,
    icon: <Database className="w-4 h-4" />,
    category: "Backend/DB",
  },
  {
    name: "MongoDB",
    level: 70,
    icon: <Database className="w-4 h-4" />,
    category: "Backend/DB",
  },
  {
    name: "Bootstrap",
    level: 80,
    icon: <Code className="w-4 h-4" />,
    category: "Frontend",
  },
];

const PROJECT_DATA: Project[] = [
  {
    id: 1,
    title: "Electroo E-commerce",
    description:
      "A full-featured e-commerce platform for electronic products with user authentication, product catalog, shopping cart, and checkout functionality.",
    tech: [
      "React.js",
      "JavaScript",
      "Tailwind CSS",
      "Redux Toolkit",
      "Axios",
      "React Query",
      "Charts.js",
    ],
    github: "#",
    live: "Live Demo →",
    lines: "15,000+",
    image: "🛒",
    status: "Production",
    imgSrc: "https://picsum.photos/seed/ecommerce/600/400",
  },
  {
    id: 2,
    title: "Medical Prediction System",
    description:
      "A healthcare application for predicting medical conditions using machine learning algorithms.",
    tech: ["React.js", "JavaScript", "Tailwind CSS", "AI Integration"],
    github: "#",
    live: "Live Demo →",
    lines: "8,000+",
    image: "🧠",
    status: "Beta",
    imgSrc: "https://dummyimage.com/600x400/0f0/000&text=Medical+System",
  },
  {
    id: 3,
    title: "SEF Gold",
    description:
      "A dynamic course platform with exam systems, CV builders, and user role-based dashboards, improving user engagement and accessibility.",
    tech: ["React.js", "JavaScript", "Bootstrap", "Redux Toolkit"],
    github: "#",
    live: "Live Demo →",
    lines: "12,000+",
    image: "🎓",
    status: "Production",
    imgSrc: "https://picsum.photos/seed/courses/600/400",
  },
  {
    id: 4,
    title: "Weather Application",
    description:
      "Real-time weather forecast application with location-based weather data and interactive maps.",
    tech: [
      "React.js",
      "JavaScript",
      "Tailwind CSS",
      "Weather API",
      "Geolocation",
    ],
    github: "#",
    live: "Live Demo →",
    lines: "5,000+",
    image: "🌦️",
    status: "Production",
    imgSrc: "https://picsum.photos/seed/weather/600/400",
  },
];

const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    role: "Frontend Developer",
    company: "Freelance",
    period: "2023 - Present",
    achievements: [
      "Developed responsive web applications using React.js, TypeScript, and modern frontend technologies.",
      "Implemented user interfaces following design specifications and best practices.",
      "Created reusable components and maintained clean, efficient code.",
    ],
  },
];

const Portfolio: React.FC = () => {
  const [terminalText, setTerminalText] = useState<string>("");
  const [currentSection, setCurrentSection] = useState<string>("home");
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [submissionStatus, setSubmissionStatus] = useState<
    "success" | "error" | null
  >(null);

  const fullText = "Hello";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setTerminalText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 150);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmissionStatus("success");
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" });
      setSubmissionStatus(null);
    }, 3000);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-950 text-gray-100 font-mono relative overflow-hidden">
        {/* Animated Background Grid */}
        <div className="fixed inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(34, 197, 94, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 197, 94, 0.3) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
              animation: "grid-move 20s linear infinite",
            }}
          ></div>
        </div>

        {/* Cursor Glow Effect */}
        <div
          className="fixed w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none transition-all duration-300"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        ></div>

        {/* Header Component (Lazy Loaded) */}
        <Suspense fallback={null}>
          <Header
            currentSection={currentSection}
            setCurrentSection={setCurrentSection}
            setCurrentProject={setCurrentProject}
            PERSONAL_INFO={PERSONAL_INFO}
          />
        </Suspense>

        {/* Main Content with Framer Motion Page Transition */}
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
              {/* USE REACT.SUSPENSE HERE FOR CODE SPLITTING */}
              <Suspense
                fallback={
                  <div className="text-center min-h-[85dvh] py-20 text-green-400/50 flex justify-center items-center">
                    Loading Section...
                  </div>
                }
              >
                {/* Conditional Section Rendering */}
                {currentSection === "home" && (
                  <HomeSection
                    terminalText={terminalText}
                    fullText={fullText}
                    PERSONAL_INFO={PERSONAL_INFO}
                    ABOUT_ME_SUMMARY={ABOUT_ME_SUMMARY}
                    PROJECT_DATA={PROJECT_DATA}
                  />
                )}

                {currentSection === "skills" && (
                  <SkillsSection
                    skills={SKILL_DATA}
                    PROJECT_DATA={PROJECT_DATA}
                  />
                )}

                {currentSection === "projects" && (
                  <ProjectsSection
                    projects={PROJECT_DATA}
                    setCurrentProject={setCurrentProject}
                    PERSONAL_INFO={PERSONAL_INFO}
                  />
                )}

                {currentSection === "experience" && (
                  <ExperienceSection experience={EXPERIENCE_DATA} />
                )}

                {currentSection === "contact" && (
                  <ContactSection
                    PERSONAL_INFO={PERSONAL_INFO}
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

        {/* Project Detail Modal/Page (Lazy Loaded) */}
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

        {/* Footer (Static, no lazy load needed) */}
        <footer className="relative z-10 border-t border-green-400/30 bg-gray-900/50 backdrop-blur-sm mt-20">
          <div className="max-w-7xl mx-auto px-6 py-8 text-center text-gray-500 text-sm">
            <div className="mb-2">
              © 2025 {PERSONAL_INFO.name}. Built with React & Tailwind CSS
            </div>
          </div>
        </footer>

        <style>{`
          @keyframes grid-move {
            0% { transform: translateY(0); }
            100% { transform: translateY(50px); }
          }
        `}</style>
      </div>
    </>
  );
};

export default Portfolio;
