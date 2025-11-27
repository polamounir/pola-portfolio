import React from "react";
import { motion, type Transition } from "framer-motion";
import { Code } from "lucide-react";
import type { HomeSectionProps } from "../../utils/types";

const pageTransition:Transition = { type: "spring", stiffness: 300, damping: 30 };
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
  fullText,
  PERSONAL_INFO,
  ABOUT_ME_SUMMARY,
  PROJECT_DATA,
}) => {
  const stats = [
    { label: "Years Exp", value: "1+", color: "green" },
    { label: "Projects", value: "4+", color: "cyan" },
    { label: "Code Lines", value: "40K+", color: "purple" },
    { label: "Location", value: "Giza, EGY", color: "blue" },
  ];

  return (
    <div className="space-y-12">
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
              <div className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
                {PERSONAL_INFO.name}
              </div>
              <div className="text-lg text-gray-400">{PERSONAL_INFO.role}</div>
              <div className="text-gray-500 pt-4">
                // Building responsive and user-friendly web applications
              </div>
              <div className="text-gray-500">
                // 1+ years of experience | {PROJECT_DATA.length}+ projects
                deployed
              </div>
            </motion.div>
          )}
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

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ...pageTransition, delay: 0.4 }}
        className="bg-gray-900 rounded-lg border border-green-400/30 p-8"
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
