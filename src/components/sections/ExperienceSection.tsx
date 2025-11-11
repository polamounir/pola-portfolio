import React from "react";
import { motion } from "framer-motion";
import { GitBranch, ChevronRight, Linkedin } from "lucide-react";
import type { ExperienceSectionProps } from "../../utils/types";

const pageTransition = { type: "spring", stiffness: 300, damping: 30 };
const listVariants = {
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
  hidden: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
};
const listItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experience,
}) => (
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
          variants={listItemVariants}
          className="bg-gray-900 rounded-lg border border-green-400/20 p-6 hover:border-green-400/50 transition-all"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-green-400">{job.role}</h3>
              <div className="text-gray-400 mt-1">{job.company}</div>
            </div>
            <div className="text-sm text-gray-500 bg-gray-800 px-3 py-1 rounded">
              {job.period}
            </div>
          </div>

          <ul className="space-y-2">
            {job.achievements.map((achievement, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-300">
                <ChevronRight className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </motion.div>

    {experience.length === 1 && (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ...pageTransition, delay: 0.3 }}
        className="bg-gray-900 rounded-lg border border-cyan-400/30 p-6 text-center mt-8"
      >
        <p className="text-gray-400">Looking for more detailed experience?</p>
        <a
          href="#"
          className="inline-flex items-center gap-2 px-4 py-2 mt-4 bg-cyan-500/20 text-cyan-400 rounded-lg border border-cyan-400/50 hover:bg-cyan-500/30 transition-all font-semibold"
        >
          <Linkedin className="w-5 h-5" />
          View LinkedIn Profile
        </a>
      </motion.div>
    )}
  </div>
);

export default ExperienceSection;
