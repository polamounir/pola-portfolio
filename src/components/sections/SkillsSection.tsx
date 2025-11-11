import React from "react";
import { motion, type Transition } from "framer-motion";
import {
  Cpu,
  Code,
  Zap,
  Terminal,
  Folder,
  ChevronRight,
} from "lucide-react";
import type { SkillsSectionProps } from "../../utils/types";

const pageTransition:Transition = { type: "spring", stiffness: 300, damping: 30 };
const listVariants = {
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
  hidden: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
};
const listItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const SkillsSection: React.FC<SkillsSectionProps> = ({
  skills,
  PROJECT_DATA,
}) => {
  const skillCategories = ["Frontend", "Backend/DB", "Soft Skills"];
  const certs = [
    { name: "React.JS internship", year: "2023" },
    { name: "Backend using Node.JS", year: "2024" },
    { name: "Frontend using React.JS", year: "2024" },
  ];
  const tools = [
    "VS Code",
    "Git",
    "Postman",
    "Figma",
    "Docker",
    "Terminal",
    "Jira",
    "Slack",
  ];
  const stats = [
    { label: "Years Exp", value: "1+", icon: <Code className="w-6 h-6" /> },
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
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-green-400 mb-8 flex items-center gap-3">
        <Cpu className="w-8 h-8" />
        Technical Skills
        <span className="text-sm text-gray-500 font-normal ml-auto">
          {skills.length} skills highlighted
        </span>
      </h2>

      {skillCategories.map(
        (category) =>
          skills.filter((skill) => skill.category.trim() === category.trim())
            .length > 0 && (
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
                  .filter((skill) => skill.category.trim() === category.trim())
                  .map((skill, idx) => (
                    <motion.div
                      key={idx}
                      variants={listItemVariants}
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
                        <motion.div
                          className="bg-gradient-to-r from-green-500 to-cyan-500 h-full rounded-full transition-all duration-1000 shadow-lg shadow-green-400/50 relative"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1.5, delay: idx * 0.1 }}
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
            {certs.map((cert, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-gray-800 rounded border border-green-400/20 hover:border-green-400/40 transition-colors"
              >
                <span className="text-gray-300">{cert.name}</span>
                <span className="text-green-400 text-sm">{cert.year}</span>
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
            {tools.map((tool, idx) => (
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

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ...pageTransition, delay: 0.6 }}
        className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg border border-green-400/30 p-8"
      >
        <div className="grid md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
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
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SkillsSection;
