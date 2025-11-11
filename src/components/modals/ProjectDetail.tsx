import React from "react";
import { motion, type Transition } from "framer-motion";
import { Cpu, Code, Github, ExternalLink, Zap } from "lucide-react";
import type { ProjectDetailProps } from "../../utils/types";

const pageTransition: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onClose }) => (
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

      {project.imgSrc && (
        <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden border border-green-400/50 shadow-xl shadow-green-400/20 mt-6">
          <img
            src={project.imgSrc}
            alt={`Screenshot of the ${
              project.title
            } project, built using ${project.tech.join(", ")}.`}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
          <span className="absolute bottom-4 left-4 text-green-400 text-lg font-bold">
            Live Preview
          </span>
        </div>
      )}

      <p className="text-lg text-gray-300 leading-relaxed border-l-4 border-cyan-400 pl-4">
        {project.fullDescription || project.description}
      </p>

      <div className="grid md:grid-cols-2 gap-8">
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

export default ProjectDetail;
