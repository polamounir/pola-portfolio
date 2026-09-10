import React, { useEffect } from "react";
import { Link } from "react-router-dom";
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

const ProjectsSection: React.FC<ProjectsSectionProps & { isStandalonePage?: boolean }> = ({
  projects,
  setCurrentProject: _setCurrentProject,
  PERSONAL_INFO,
  isStandalonePage = true,
}) => {
  // Emit ready signal for data-dependent prerendering
  useEffect(() => {
    if (projects && projects.length > 0) {
      document.body.setAttribute("data-prerender-ready", "true");
    }
  }, [projects]);

  return (
    <div className="space-y-8 font-mono">
      <header className="flex flex-wrap justify-between items-center gap-4 mb-8">
        {isStandalonePage ? (
          <h1 className="text-3xl md:text-4xl font-bold text-green-400 flex items-center gap-3">
            <Folder className="w-8 h-8" />
            Featured Projects & Applications
          </h1>
        ) : (
          <h2 className="text-3xl font-bold text-green-400 flex items-center gap-3">
            <Folder className="w-8 h-8" />
            Featured Projects
          </h2>
        )}
        <span className="text-sm text-gray-400 font-normal px-3 py-1 rounded bg-gray-900 border border-green-400/20">
          {projects.length} total projects
        </span>
      </header>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={listVariants}
        className="grid md:grid-cols-2 gap-6"
      >
        {projects.map((project) => (
          <motion.div
            key={project.id}
            variants={tileVariants}
            className="bg-gray-900 rounded-lg border border-green-400/20 p-6 transition-all group text-left w-full hover:border-green-400/50 flex flex-col justify-between shadow-lg shadow-green-400/5"
            whileHover={{
              scale: 1.02,
              boxShadow: "0 0 20px rgba(34, 197, 94, 0.4)",
              borderColor: "rgba(34, 197, 94, 0.8)",
            }}
            transition={{ duration: 0.15 }}
          >
            <div>
              {project.imgSrc && (
                <Link
                  to={`/projects/${project.slug}`}
                  className="block w-full h-44 rounded-md overflow-hidden mb-4 border border-green-400/30 group-hover:border-green-400/60 transition-colors shadow-lg shadow-green-400/10"
                >
                  <img
                    src={project.imgSrc}
                    alt={`Screenshot of ${project.title} project built using ${project.tech.join(", ")} by Pola Mounir`}
                    width={600}
                    height={350}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>
              )}

              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div>
                    <h2 className="text-xl font-bold text-green-400 group-hover:text-cyan-400 transition-colors">
                      <Link to={`/projects/${project.slug}`}>
                        {project.title}
                      </Link>
                    </h2>
                    <span
                      className={`text-xs px-2 py-0.5 rounded font-bold uppercase tracking-wider mt-1 inline-block ${
                        project.status === "Production"
                          ? "bg-green-500/20 text-green-400 border border-green-500/30"
                          : project.status === "Beta"
                          ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                          : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} source code on GitHub`}
                      className="text-gray-400 hover:text-green-400 transition-colors p-2 hover:bg-green-500/10 rounded border border-transparent hover:border-green-400/30"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View live demo of ${project.title}`}
                      className="text-gray-400 hover:text-green-400 transition-colors p-2 hover:bg-green-500/10 rounded border border-transparent hover:border-green-400/30"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>

              <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-green-500/10 text-green-400 text-xs rounded border border-green-400/30 font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-gray-800/80 mt-2">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-green-400" />
                <span>{project.lines} lines of code</span>
              </div>
              <Link
                to={`/projects/${project.slug}`}
                className="text-green-400 hover:text-cyan-400 font-semibold transition-colors flex items-center gap-1"
              >
                View Project Details &rarr;
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...pageTransition, delay: 0.4 }}
        className="bg-gray-900 rounded-lg border border-green-400/30 p-8 text-center shadow-xl shadow-green-400/5"
      >
        <h2 className="text-xl font-bold text-green-400 mb-2">Looking for More Code Examples?</h2>
        <p className="text-gray-400 mb-6 max-w-xl mx-auto text-sm">
          Explore Pola Mounir's complete GitHub profile to review open-source repositories, architectural patterns, and frontend experiments.
        </p>
        <a
          href={PERSONAL_INFO.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-green-500/20 text-green-400 rounded-lg border border-green-400/50 hover:bg-green-500/30 transition-all font-semibold text-sm"
        >
          <Github className="w-5 h-5" />
          Visit GitHub Profile
        </a>
      </motion.div>
    </div>
  );
};

export default ProjectsSection;
