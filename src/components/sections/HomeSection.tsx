import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, type Transition } from "framer-motion";
import { Code, ArrowRight, FileText } from "lucide-react";
import type { HomeSectionProps } from "../../utils/types";

const pageTransition: Transition = { type: "spring", stiffness: 300, damping: 30 };
const listVariants = {
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
  hidden: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
};
const listItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const HomeSection: React.FC<HomeSectionProps> = ({
  terminalText,
  fullText: _fullText,
  PERSONAL_INFO,
  ABOUT_ME_SUMMARY,
  PROJECT_DATA,
}) => {
  // Emit ready signal for data-dependent prerendering
  useEffect(() => {
    if (PROJECT_DATA && PROJECT_DATA.length > 0) {
      document.body.setAttribute("data-prerender-ready", "true");
    }
  }, [PROJECT_DATA]);

  const stats = [
    { label: "Years Exp", value: "1+", color: "green" },
    { label: "Projects", value: `${PROJECT_DATA.length}+`, color: "cyan" },
    { label: "Code Lines", value: "40K+", color: "purple" },
    { label: "Location", value: "Giza, EGY", color: "blue" },
  ];

  return (
    <div className="space-y-12 font-mono">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...pageTransition, delay: 0.1 }}
        className="bg-gray-900 rounded-lg border border-green-400/30 shadow-2xl shadow-green-400/10 overflow-hidden"
        style={{ minHeight: "220px" }}
      >
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 border-b border-green-400/30">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="ml-4 text-xs text-gray-400">bash — personal entity terminal</span>
        </div>

        <div className="p-8 space-y-4">
          <div className="text-green-400">
            <span className="animate-pulse">▋</span>
            guest@portfolio:~$ {terminalText || "Hello"}
          </div>

          <div className="space-y-3 text-gray-300">
            <h1 className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400 tracking-tight flex flex-wrap items-baseline gap-2">
              <span>{PERSONAL_INFO.name} — {PERSONAL_INFO.role}</span>
            </h1>
            <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-3xl">
              <strong>Pola Mounir</strong> is a <strong>React Frontend Developer</strong> based in{" "}
              <strong>Giza, Egypt</strong>, specializing in responsive web applications, component-driven
              architecture, and high-performance user interfaces using <strong>React.js</strong>,{" "}
              <strong>TypeScript</strong>, and <strong>Tailwind CSS</strong>.
            </p>
            <div className="text-gray-400 text-sm pt-2">
              // 1+ years of frontend experience | {PROJECT_DATA.length}+ production & active projects
            </div>
            <div className="pt-4 flex flex-wrap gap-3 sm:gap-4">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-green-500/20 text-green-400 border border-green-400/50 hover:bg-green-500/30 transition-all font-semibold text-sm shadow-md shadow-green-400/10"
              >
                Explore Projects <ArrowRight className="w-4 h-4" />
              </Link>
              {PERSONAL_INFO.resumeUrl && (
                <a
                  href={PERSONAL_INFO.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-green-500/15 text-green-400 border border-green-400/40 hover:bg-green-500/25 hover:border-green-400 transition-all font-semibold text-sm shadow-md shadow-green-400/10"
                >
                  <FileText className="w-4 h-4" />
                  Download CV
                </a>
              )}
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gray-800 text-gray-300 border border-gray-700 hover:text-green-400 hover:border-green-400/50 transition-all text-sm"
              >
                Read Background & Skills
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gray-800 text-gray-300 border border-gray-700 hover:text-green-400 hover:border-green-400/50 transition-all text-sm"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={listVariants}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            variants={listItemVariants}
            className="bg-gray-900 rounded-lg border border-green-400/20 p-6 transition-all"
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
            <div className="text-sm text-gray-400">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ...pageTransition, delay: 0.4 }}
        className="bg-gray-900 rounded-lg border border-green-400/30 p-8 shadow-xl shadow-green-400/5"
        style={{ minHeight: "120px" }}
      >
        <h2 className="text-2xl font-bold text-green-400 mb-4 flex items-center gap-2">
          <Code className="w-6 h-6" />$ cat about.txt
        </h2>
        <p className="text-gray-300 leading-relaxed">{ABOUT_ME_SUMMARY}</p>
      </motion.div>
    </div>
  );
};

export default HomeSection;
