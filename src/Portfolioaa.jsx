import React, { useState, useEffect } from "react";
import {
  Terminal,
  Code,
  Folder,
  GitBranch,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  ChevronRight,
  Cpu,
  Database,
  Cloud,
  Zap,
  CheckCircle, // Added for success message
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- Framer Motion Variants for Page Transitions ---
const pageVariants = {
  initial: { opacity: 0, y: 10, filter: "blur(5px)" },
  in: { opacity: 1, y: 0, filter: "blur(0px)" },
  out: { opacity: 0, y: -10, filter: "blur(5px)" },
};

// Smoother, spring-like transition for a modern feel
const pageTransition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

// Variant for staggering list items (e.g., in Experience section)
const listVariants = {
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
  hidden: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

// Variant for individual list items
const listItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Variant for Card/Tile elements
const tileVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

// --- Project Detail Component (Adjusted for better fit) ---
const ProjectDetail = ({ project, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    className="fixed max-h-dvh inset-0 z-50 p-4 md:p-8 bg-gray-950/10 backdrop-blur-lg"
  >
    <motion.div
      initial={{ scale: 0.9, y: 50 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.9, y: -50 }}
      transition={pageTransition}
      className="max-w-7xl max-h-[90dvh] overflow-auto mx-auto space-y-8 bg-gray-900 p-6 md:p-10 rounded-xl border border-green-400/50 shadow-2xl shadow-green-400/20"
    >
      <div className="flex justify-between items-start border-b border-green-400/30 pb-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-green-400 flex items-center gap-3">
            <span className="text-4xl">{project.image}</span> {project.title}
          </h2>
          {/* NOTE: Status logic kept generic as actual project status was not provided */}
          <span
            className={`text-sm px-2 py-1 rounded mt-2 inline-block ${
              project.status === "Production"
                ? "bg-green-500/20 text-green-400"
                : project.status === "Beta"
                ? "bg-yellow-500/20 text-yellow-400"
                : "bg-blue-500/20 text-blue-400"
            }`}
          >
            Status: {project.status}
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-red-400 p-3 border border-red-400/30 rounded-full transition-colors hover:bg-red-500/10 flex-shrink-0"
        >
          <Zap className="w-6 h-6" />
        </button>
      </div>

      {/* Project Image in Detail View */}
      {project.imgSrc && (
        <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden border border-green-400/50 shadow-xl shadow-green-400/20 mt-6">
          <img
            src={project.imgSrc}
            alt={`Screenshot of ${project.title}`}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
          <span className="absolute bottom-4 left-4 text-green-400 text-lg font-bold">
            Live Preview
          </span>
        </div>
      )}

      {/* Using the actual project description */}
      <p className="text-lg text-gray-300 leading-relaxed border-l-4 border-cyan-400 pl-4">
        {project.fullDescription || project.description}
      </p>

      {/* --- Detailed Content Section --- */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Key Metrics - Keeping original structure, but with real main tech */}
        <div className="bg-gray-800 rounded-lg border border-cyan-400/30 p-6 space-y-3 shadow-inner shadow-cyan-400/10">
          <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
            <Cpu className="w-5 h-5" /> System Metrics
          </h3>
          <p className="text-gray-400">
            Primary Frontend:
            <span className="text-green-400 font-bold"> React.js</span>
          </p>
          <p className="text-gray-400">
            Primary Language:
            <span className="text-green-400 font-bold">
              {" "}
              {project.tech[0] || "N/A"}
            </span>
          </p>
          <p className="text-gray-400">
            Architecture:
            <span className="text-green-400 font-bold"> Component-Based</span>
          </p>
        </div>

        {/* Technologies */}
        <div className="bg-gray-800 rounded-lg border border-green-400/30 p-6 shadow-inner shadow-green-400/10">
          <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
            <Code className="w-5 h-5" /> Core Technology Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-green-500/10 text-green-400 text-sm rounded-full border border-green-400/30 hover:bg-green-500/20 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* --- Action Buttons --- */}
      <div className="flex flex-col md:flex-row gap-4 pt-6 justify-center">
        <a
          href={project.github || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 text-green-400 rounded-lg border border-green-400/50 hover:bg-green-700/30 transition-all font-semibold"
        >
          <Github className="w-5 h-5" /> View Code Repository
        </a>
        <a
          href={project.live || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-gray-900 rounded-lg font-bold hover:bg-green-400 transition-all shadow-lg shadow-green-400/30"
        >
          <ExternalLink className="w-5 h-5" /> See Live Demo
        </a>
      </div>
    </motion.div>
  </motion.div>
);

const Portfolio = () => {
  const [terminalText, setTerminalText] = useState("");
  const [currentSection, setCurrentSection] = useState("home");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [currentProject, setCurrentProject] = useState(null); // <<< NEW STATE for Project Detail
  // --- NEW STATE for Submission Status ---
  const [submissionStatus, setSubmissionStatus] = useState(null); // 'success', 'error', or null
  // ---------------------------------------
  const fullText = "Hello";

  // --- EXTRACTED DATA CONSTANTS ---
  const PERSONAL_INFO = {
    name: "Pola Mounir",
    role: "React Frontend Developer",
    location: "Cairo, Egypt",
    email: "polamounir103@gmail.com",
    github: "LINK_TO_POLA_GITHUB", // Placeholder
    linkedin: "LINK_TO_POLA_LINKEDIN", // Placeholder
  };

  const ABOUT_ME_SUMMARY =
    "Frontend Developer with experience in building responsive and user-friendly web applications using React.js and modern web technologies. Skilled in creating efficient and maintainable code with a focus on performance and accessibility.";

  // Mapping extracted skills to the component's structure
  const SKILL_DATA = [
    // Development Tools & Technologies
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

  // Projects data mapping (using placeholder values for lines/image/status)
  const PROJECT_DATA = [
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
      github: "#", // Placeholder
      live: "Live Demo →", // Placeholder
      lines: "15,000+", // Placeholder
      image: "🛒",
      status: "Production", // Placeholder
      imgSrc: "https://picsum.photos/seed/ecommerce/600/400", // Random image
    },
    {
      id: 2,
      title: "Medical Prediction System",
      description:
        "A healthcare application for predicting medical conditions using machine learning algorithms.",
      tech: ["React.js", "JavaScript", "Tailwind CSS", "AI Integration"],
      github: "#", // Placeholder
      live: "Live Demo →", // Placeholder
      lines: "8,000+", // Placeholder
      image: "🧠",
      status: "Beta", // Placeholder
      imgSrc: "https://dummyimage.com/600x400/0f0/000&text=Medical+System", // Dummy image
    },
    {
      id: 3,
      title: "SEF Gold",
      description:
        "A dynamic course platform with exam systems, CV builders, and user role-based dashboards, improving user engagement and accessibility.",
      tech: ["React.js", "JavaScript", "Bootstrap", "Redux Toolkit"],
      github: "#", // Placeholder
      live: "Live Demo →", // Placeholder
      lines: "12,000+", // Placeholder
      image: "🎓",
      status: "Production", // Placeholder
      imgSrc: "https://picsum.photos/seed/courses/600/400", // Random image
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
      github: "#", // Placeholder
      live: "Live Demo →", // Placeholder
      lines: "5,000+", // Placeholder
      image: "🌦️",
      status: "Production", // Placeholder
      imgSrc: "https://picsum.photos/seed/weather/600/400", // Random image
    },
  ];

  // Experience data
  const EXPERIENCE_DATA = [
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

  // --- EFFECTS AND HANDLERS (Same as original) ---
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
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Simulate API call success/failure without using alert()
    setSubmissionStatus("success");
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" });
      setSubmissionStatus(null);
    }, 3000);
    // If you needed a failure state: setSubmissionStatus('error');
  };

  // The 'skills' array is now based on SKILL_DATA
  const skills = SKILL_DATA;
  const projects = PROJECT_DATA;
  const experience = EXPERIENCE_DATA;
  // --------------------------------------------------

  const NavItem = ({ section, label, icon }) => (
    <motion.button
      whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(34, 197, 94, 0.4)" }}
      whileTap={{ scale: 0.95 }}
      onClick={() => {
        setCurrentSection(section);
        setCurrentProject(null);
      }} // Clear project view on navigation
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-sm transition-all duration-300 ${
        currentSection === section
          ? "bg-green-500/20 text-green-400 border border-green-400/50 shadow-lg shadow-green-400/20"
          : "text-gray-400 hover:text-green-400 hover:bg-green-500/10"
      }`}
    >
      {icon} <span>{label}</span>
      {currentSection === section && (
        <ChevronRight className="w-4 h-4 animate-pulse" />
      )}
    </motion.button>
  );

  return (
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
        className="fixed w-96 h-96 bg-green-500/10 rounded-full blur-3xl pointer-events-none transition-all duration-300"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      ></div>
      {/* Header (Updated Links) */}
      <header className="relative z-10 border-b border-green-400/30 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-cyan-400 rounded-lg flex items-center justify-center">
              <Terminal className="w-6 h-6 text-gray-900" />
            </div>

            <div>
              <div className="text-green-400 text-lg font-bold">dev@pola</div>

              <div className="text-xs text-gray-500">~/system/online</div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-3">
            <NavItem
              section="home"
              label="home"
              icon={<Terminal className="w-4 h-4" />}
            />

            <NavItem
              section="skills"
              label="skills"
              icon={<Cpu className="w-4 h-4" />}
            />

            <NavItem
              section="projects"
              label="projects"
              icon={<Folder className="w-4 h-4" />}
            />

            <NavItem
              section="experience"
              label="experience"
              icon={<GitBranch className="w-4 h-4" />}
            />

            <NavItem
              section="contact"
              label="contact"
              icon={<Mail className="w-4 h-4" />}
            />
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-green-400 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-green-400 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </header>
      {/* Mobile Navigation (Unchanged) */}
      <div className="md:hidden sticky top-0 z-10 bg-gray-900/95 backdrop-blur-sm border-b border-green-400/30 px-4 py-3">
        <div className="flex gap-2 overflow-x-auto pb-2">
          <NavItem
            section="home"
            label="home"
            icon={<Terminal className="w-4 h-4" />}
          />

          <NavItem
            section="skills"
            label="skills"
            icon={<Cpu className="w-4 h-4" />}
          />

          <NavItem
            section="projects"
            label="projects"
            icon={<Folder className="w-4 h-4" />}
          />

          <NavItem
            section="experience"
            label="experience"
            icon={<GitBranch className="w-4 h-4" />}
          />

          <NavItem
            section="contact"
            label="contact"
            icon={<Mail className="w-4 h-4" />}
          />
        </div>
      </div>
      {/* Main Content with Framer Motion Page Transition */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            {/* Home Section (Updated Info) */}
            {currentSection === "home" && (
              <div className="space-y-12">
                {/* Terminal Header */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...pageTransition, delay: 0.1 }}
                  className="bg-gray-900 rounded-lg border border-green-400/30 shadow-2xl shadow-green-400/10 overflow-hidden"
                >
                  <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 border-b border-green-400/30">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>

                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>

                    <div className="w-3 h-3 rounded-full bg-green-500"></div>

                    <span className="ml-4 text-xs text-gray-500">bash</span>
                  </div>

                  <div className="p-8 space-y-4">
                    <div className="text-green-400">
                      <span className="animate-pulse">▋</span>
                      guest@portfolio:~$ {terminalText}
                    </div>

                    {terminalText === fullText && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="space-y-2 text-gray-300"
                      >
                        {/* Added Motion */}
                        <div className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
                          {PERSONAL_INFO.name}
                        </div>

                        <div className="text-lg text-gray-400">
                          {PERSONAL_INFO.role}
                        </div>

                        <div className="text-gray-500 pt-4">
                          // Building responsive and user-friendly web
                          applications
                        </div>

                        <div className="text-gray-500">
                          // 1+ years of experience | 4+ projects deployed
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
                {/* Stats Grid with Motion Hover (Updated Values) */}

                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={listVariants}
                  className="grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                  {[
                    { label: "Years Exp", value: "1+", color: "green" },
                    { label: "Projects", value: "4+", color: "cyan" },
                    { label: "Code Lines", value: "40K+", color: "purple" }, // Rough estimate based on project count
                    { label: "Location", value: "Cairo, EGY", color: "blue" },
                  ].map((stat, idx) => (
                    <motion.div
                      key={idx}
                      variants={listItemVariants} // Apply item variant
                      className="bg-gray-900 rounded-lg border border-green-400/20 p-6 transition-all cursor-pointer"
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 0 20px rgba(34, 197, 94, 0.4)",
                        borderColor: "rgba(34, 197, 94, 0.8)",
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="text-3xl font-bold text-green-400 mb-1">
                        {stat.value}
                      </div>

                      <div className="text-sm text-gray-500">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>
                {/* Quick About (Updated with extracted summary) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ ...pageTransition, delay: 0.4 }}
                  className="bg-gray-900 rounded-lg border border-green-400/30 p-8"
                >
                  <h2 className="text-2xl font-bold text-green-400 mb-4 flex items-center gap-2">
                    <Code className="w-6 h-6" />$ cat about.txt
                  </h2>

                  <p className="text-gray-300 leading-relaxed">
                    {ABOUT_ME_SUMMARY}
                  </p>
                </motion.div>
              </div>
            )}
            {/* Skills Section (Updated with extracted skills and animations) */}
            {currentSection === "skills" && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-green-400 mb-8 flex items-center gap-3">
                  <Cpu className="w-8 h-8" />
                  Technical Skills
                  <span className="text-sm text-gray-500 font-normal ml-auto">
                    {skills.length} skills highlighted
                  </span>
                </h2>
                {/* Skills by Category */}
                {["Frontend", "Backend/DB", "Soft Skills"].map(
                  (category) =>
                    skills.filter(
                      (skill) => skill.category.trim() === category.trim()
                    ).length > 0 && (
                      <div key={category} className="space-y-4">
                        <motion.h3
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-xl font-bold text-cyan-400 flex items-center gap-2"
                        >
                          <ChevronRight className="w-5 h-5" />
                          {category}
                        </motion.h3>

                        <motion.div
                          initial="hidden"
                          animate="visible"
                          variants={listVariants}
                          className="grid md:grid-cols-2 gap-4"
                        >
                          {skills
                            .filter(
                              (skill) =>
                                skill.category.trim() === category.trim()
                            )
                            .map((skill, idx) => (
                              <motion.div
                                key={idx}
                                variants={listItemVariants} // Apply stagger to skill item
                                className="bg-gray-900 rounded-lg border border-green-400/20 p-6 hover:border-green-400/50 transition-all group"
                              >
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center gap-3">
                                    <div className="text-green-400 group-hover:text-cyan-400 transition-colors">
                                      {skill.icon}
                                    </div>

                                    <span className="text-gray-100 font-semibold">
                                      {skill.name}
                                    </span>
                                  </div>

                                  <span className="text-green-400 font-bold text-lg">
                                    {skill.level}%
                                  </span>
                                </div>

                                <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                                  <motion.div // <<< Motion for skills bar
                                    className="bg-gradient-to-r from-green-500 to-cyan-500 h-full rounded-full transition-all duration-1000 shadow-lg shadow-green-400/50 relative"
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${skill.level}%` }}
                                    transition={{
                                      duration: 1.5,
                                      delay: idx * 0.1,
                                    }}
                                    viewport={{ once: true, amount: 0.8 }}
                                  >
                                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                                  </motion.div>
                                </div>
                              </motion.div>
                            ))}
                        </motion.div>
                      </div>
                    )
                )}
                {/* Certifications & Tools (Unchanged - using placeholder data) */}

                <div className="grid md:grid-cols-2 gap-6 mt-12">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...pageTransition, delay: 0.4 }}
                    className="bg-gray-900 rounded-lg border border-green-400/30 p-6"
                  >
                    <h3 className="text-green-400 font-bold mb-4 text-lg flex items-center gap-2">
                      <Zap className="w-5 h-5" />
                      Certifications
                    </h3>

                    <div className="space-y-3">
                      {[
                        { name: "React.JS internship", year: "2023" },
                        { name: "Backend using Node.JS", year: "2024" },
                        { name: "Frontend using React.JS", year: "2024" },
                      ].map((cert, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 bg-gray-800 rounded border border-green-400/20 hover:border-green-400/40 transition-colors"
                        >
                          <span className="text-gray-300">{cert.name}</span>

                          <span className="text-green-400 text-sm">
                            {cert.year}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...pageTransition, delay: 0.5 }}
                    className="bg-gray-900 rounded-lg border border-green-400/30 p-6"
                  >
                    <h3 className="text-green-400 font-bold mb-4 text-lg flex items-center gap-2">
                      <Code className="w-5 h-5" />
                      Daily Tools
                    </h3>

                    <div className="grid grid-cols-2 gap-3">
                      {[
                        "VS Code",
                        "Git",
                        "Postman",
                        "Figma",
                        "Docker",
                        "Terminal",
                        "Jira",
                        "Slack",
                      ].map((tool, idx) => (
                        <motion.div
                          key={idx}
                          whileHover={{
                            scale: 1.05,
                            backgroundColor: "rgba(34, 197, 94, 0.1)",
                          }}
                          whileTap={{ scale: 0.95 }}
                          className="p-3 bg-gray-800 rounded border border-green-400/20 hover:border-green-400/40 transition-colors text-center text-gray-300 hover:text-green-400"
                        >
                          {tool}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
                {/* Experience Summary (Updated Values) */}

                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ ...pageTransition, delay: 0.6 }}
                  className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg border border-green-400/30 p-8"
                >
                  <div className="grid md:grid-cols-4 gap-6">
                    {[
                      {
                        label: "Years Exp",
                        value: "1+",
                        icon: <Code className="w-6 h-6" />,
                      },
                      {
                        label: "Technologies",
                        value: "10+",
                        icon: <Terminal className="w-6 h-6" />,
                      },
                      {
                        label: "Core Stacks",
                        value: "React, Node",
                        icon: <Cpu className="w-6 h-6" />,
                      },
                      {
                        label: "Projects Built",
                        value: `${PROJECT_DATA.length}+`,
                        icon: <Folder className="w-6 h-6" />,
                      },
                    ].map((stat, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ y: -5, opacity: 0.8 }}
                        transition={{ type: "spring", stiffness: 500 }}
                        className="text-center"
                      >
                        <div className="text-green-400 flex justify-center mb-2">
                          {stat.icon}
                        </div>

                        <div className="text-3xl font-bold text-white mb-1">
                          {stat.value}
                        </div>

                        <div className="text-gray-500 text-sm">
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            )}
            {/* Projects Section (Updated with animations) */}
            {currentSection === "projects" && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-green-400 mb-8 flex items-center gap-3">
                  <Folder className="w-8 h-8" />
                  Featured Projects
                  <span className="text-sm text-gray-500 font-normal ml-auto">
                    {projects.length} total
                  </span>
                </h2>

                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={listVariants}
                  className="grid md:grid-cols-2 gap-6"
                >
                  {projects.map((project) => (
                    <motion.button
                      key={project.id}
                      variants={tileVariants} // Apply tile animation
                      onClick={() => setCurrentProject(project)}
                      className="bg-gray-900 rounded-lg border border-green-400/20 p-6 transition-all group text-left w-full hover:border-green-400/50"
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 0 20px rgba(34, 197, 94, 0.4)",
                        borderColor: "rgba(34, 197, 94, 0.8)",
                      }}
                      transition={{ duration: 0.15 }}
                    >
                      {/* Project Image in Card */}
                      {project.imgSrc && (
                        <div className="w-full h-40 rounded-md overflow-hidden mb-4 border border-green-400/30 group-hover:border-green-400/60 transition-colors shadow-lg shadow-green-400/10">
                          <img
                            src={project.imgSrc}
                            alt={`Screenshot of ${project.title}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}

                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          {/* <div className="text-4xl">{project.image}</div> Removed large emoji for image preview */}
                          <div>
                            <h3 className="text-xl font-bold text-green-400 group-hover:text-cyan-400 transition-colors">
                              {project.title}
                            </h3>
                            <span
                              className={`text-xs px-2 py-1 rounded ${
                                project.status === "Production"
                                  ? "bg-green-500/20 text-green-400"
                                  : project.status === "Beta"
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : "bg-blue-500/20 text-blue-400"
                              }`}
                            >
                              {project.status}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <a
                            href={project.github}
                            onClick={(e) => e.stopPropagation()}
                            className="text-gray-400 hover:text-green-400 transition-colors p-2 hover:bg-green-500/10 rounded"
                          >
                            <Github className="w-5 h-5" />
                          </a>
                          <a
                            href={project.live}
                            onClick={(e) => e.stopPropagation()}
                            className="text-gray-400 hover:text-green-400 transition-colors p-2 hover:bg-green-500/10 rounded"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        </div>
                      </div>

                      <p className="text-gray-400 mb-4 leading-relaxed">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-green-500/10 text-green-400 text-xs rounded border border-green-400/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-800">
                        <div className="flex items-center gap-2">
                          <Code className="w-4 h-4" />
                          <span>{project.lines} lines (est)</span>
                        </div>
                        <div className="text-green-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          View Details →
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...pageTransition, delay: 0.4 }}
                  className="bg-gray-900 rounded-lg border border-green-400/30 p-6 text-center"
                >
                  <p className="text-gray-400 mb-4">
                    Want to see more projects?
                  </p>

                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-green-500/20 text-green-400 rounded-lg border border-green-400/50 hover:bg-green-500/30 transition-all font-semibold"
                  >
                    <Github className="w-5 h-5" />
                    View GitHub Profile
                  </a>
                </motion.div>
              </div>
            )}
            {/* Experience Section (Updated with animations) */}
            {currentSection === "experience" && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-green-400 mb-8 flex items-center gap-3">
                  <GitBranch className="w-8 h-8" />
                  Work History
                </h2>

                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={listVariants}
                  className="space-y-6"
                >
                  {experience.map((job, idx) => (
                    <motion.div
                      key={idx}
                      variants={listItemVariants} // Apply item variant
                      className="bg-gray-900 rounded-lg border border-green-400/20 p-6 hover:border-green-400/50 transition-all"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-green-400">
                            {job.role}
                          </h3>

                          <div className="text-gray-400 mt-1">
                            {job.company}
                          </div>
                        </div>

                        <div className="text-sm text-gray-500 bg-gray-800 px-3 py-1 rounded">
                          {job.period}
                        </div>
                      </div>

                      <ul className="space-y-2">
                        {job.achievements.map((achievement, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-gray-300"
                          >
                            <ChevronRight className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />

                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </motion.div>
                {/* Add a call to action if no other jobs are listed */}
                {experience.length === 1 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ ...pageTransition, delay: 0.3 }}
                    className="bg-gray-900 rounded-lg border border-cyan-400/30 p-6 text-center mt-8"
                  >
                    <p className="text-gray-400">
                      Looking for more detailed experience?
                    </p>
                    <a
                      href="#" // Link to download CV or LinkedIn
                      className="inline-flex items-center gap-2 px-4 py-2 mt-4 bg-cyan-500/20 text-cyan-400 rounded-lg border border-cyan-400/50 hover:bg-cyan-500/30 transition-all font-semibold"
                    >
                      <Linkedin className="w-5 h-5" />
                      View LinkedIn Profile
                    </a>
                  </motion.div>
                )}
              </div>
            )}
            {/* Contact Section (Updated with extracted contact info and animations) */}
            {currentSection === "contact" && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-green-400 mb-8 flex items-center gap-3">
                  <Mail className="w-8 h-8" />
                  Get In Touch
                </h2>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ ...pageTransition, delay: 0.1 }}
                      className="bg-gray-900 rounded-lg border border-green-400/30 p-8"
                    >
                      <h3 className="text-xl font-bold text-green-400 mb-4">
                        $ contact --info
                      </h3>

                      <div className="space-y-4">
                        <div>
                          <div className="text-gray-500 text-sm mb-1">
                            Email:
                          </div>

                          <a
                            href={`mailto:${PERSONAL_INFO.email}`}
                            className="text-green-400 hover:underline"
                          >
                            {PERSONAL_INFO.email}
                          </a>
                        </div>

                        <div>
                          <div className="text-gray-500 text-sm mb-1">
                            Location:
                          </div>

                          <div className="text-gray-300">
                            {PERSONAL_INFO.location}
                          </div>
                        </div>

                        <div>
                          <div className="text-gray-500 text-sm mb-1">
                            Status:
                          </div>

                          <div className="flex items-center gap-2">
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 1, repeat: Infinity }}
                              className="w-2 h-2 bg-green-400 rounded-full"
                            ></motion.div>

                            <span className="text-green-400">
                              Available for opportunities
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial="hidden"
                      animate="visible"
                      variants={listVariants}
                      className="flex gap-4"
                    >
                      <motion.a
                        variants={listItemVariants}
                        href={PERSONAL_INFO.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-gray-900 border border-green-400/30 rounded-lg p-4 hover:border-green-400/50 transition-all text-center hover:shadow-lg hover:shadow-green-400/20"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github className="w-6 h-6 mx-auto mb-2 text-green-400" />

                        <div className="text-sm text-gray-400">GitHub</div>
                      </motion.a>

                      <motion.a
                        variants={listItemVariants}
                        href={PERSONAL_INFO.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-gray-900 border border-green-400/30 rounded-lg p-4 hover:border-green-400/50 transition-all text-center hover:shadow-lg hover:shadow-green-400/20"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Linkedin className="w-6 h-6 mx-auto mb-2 text-green-400" />

                        <div className="text-sm text-gray-400">LinkedIn</div>
                      </motion.a>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ ...pageTransition, delay: 0.2 }}
                    className="bg-gray-900 rounded-lg border border-green-400/30 p-8"
                  >
                    <h3 className="text-xl font-bold text-green-400 mb-6">
                      Send Message
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label className="text-gray-400 text-sm mb-2 block">
                          Name
                        </label>

                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="w-full bg-gray-800 border border-green-400/30 rounded px-4 py-2 text-gray-100 focus:outline-none focus:border-green-400 transition-colors"
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <label className="text-gray-400 text-sm mb-2 block">
                          Email
                        </label>

                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full bg-gray-800 border border-green-400/30 rounded px-4 py-2 text-gray-100 focus:outline-none focus:border-green-400 transition-colors"
                          placeholder="john@example.com"
                        />
                      </div>

                      <div>
                        <label className="text-gray-400 text-sm mb-2 block">
                          Message
                        </label>

                        <textarea
                          rows={4}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              message: e.target.value,
                            })
                          }
                          className="w-full bg-gray-800 border border-green-400/30 rounded px-4 py-2 text-gray-100 focus:outline-none focus:border-green-400 transition-colors resize-none"
                          placeholder="Your message..."
                        ></textarea>
                      </div>

                      <motion.button
                        onClick={handleSubmit}
                        whileHover={{
                          scale: 1.01,
                          boxShadow: "0 0 15px rgba(34, 197, 94, 0.5)",
                        }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-green-500 hover:bg-green-600 text-gray-900 font-bold py-3 rounded transition-colors shadow-lg shadow-green-400/30 hover:shadow-green-400/50"
                      >
                        Send Message →
                      </motion.button>

                      {/* Submission Status Message */}
                      <AnimatePresence>
                        {submissionStatus === "success" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center gap-2 p-3 bg-green-500/10 text-green-400 rounded-lg border border-green-400/50"
                          >
                            <CheckCircle className="w-5 h-5" />
                            <span className="text-sm">
                              Message Transmitted. Thank you!
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
      {/* Project Detail Modal/Page */}
      <AnimatePresence>
        {currentProject && (
          <ProjectDetail
            project={currentProject}
            onClose={() => setCurrentProject(null)}
          />
        )}
      </AnimatePresence>
      {/* Footer (Unchanged) */}
      <footer className="relative z-10 border-t border-green-400/30 bg-gray-900/50 backdrop-blur-sm mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-gray-500 text-sm">
          <div className="mb-2">
            © 2025 {PERSONAL_INFO.name}. Built with React & Tailwind CSS
          </div>

          {/* <div className="flex items-center justify-center gap-2">
			  <Zap className="w-4 h-4 text-green-400" />
			  <span>Deployed on Vercel | Lighthouse Score: 98</span>
			</div> */}
        </div>
      </footer>

      <style>{`
        @keyframes grid-move {
          0% { transform: translateY(0); }
          100% { transform: translateY(50px); }
        }
      `}</style>
    </div>
  );
};

export default Portfolio;
