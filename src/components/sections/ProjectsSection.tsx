import React from "react";
import { motion, type Transition } from "framer-motion";
import { Folder, Code, Github, ExternalLink } from "lucide-react";
import type { ProjectsSectionProps } from "../../utils/types";

const pageTransition: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};
const listVariants = {
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
  hidden: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
};
const tileVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  setCurrentProject,
  PERSONAL_INFO,
}) => (
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
          variants={tileVariants}
          onClick={() => setCurrentProject(project)}
          className="bg-gray-900 rounded-lg border border-green-400/20 p-6 transition-all group text-left w-full hover:border-green-400/50"
          whileHover={{
            scale: 1.02,
            boxShadow: "0 0 20px rgba(34, 197, 94, 0.4)",
            borderColor: "rgba(34, 197, 94, 0.8)",
          }}
          transition={{ duration: 0.15 }}
        >
          {project.imgSrc && (
            <div className="w-full h-40 rounded-md overflow-hidden mb-4 border border-green-400/30 group-hover:border-green-400/60 transition-colors shadow-lg shadow-green-400/10">
              <img
                src={project.imgSrc}
                alt={`Screenshot of the ${
                  project.title
                } project, built using ${project.tech.join(", ")}.`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}

          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
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
      <p className="text-gray-400 mb-4">Want to see more projects?</p>
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
);

export default ProjectsSection;
