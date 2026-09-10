import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import type { NavItemProps } from "../../utils/types";

const sectionToRoute: Record<string, string> = {
  home: "/",
  about: "/about",
  projects: "/projects",
  contact: "/contact",
};

const NavItem: React.FC<NavItemProps> = ({
  section,
  label,
  icon,
  setCurrentSection,
  setCurrentProject,
}) => {
  const location = useLocation();
  const targetPath = sectionToRoute[section] || `/${section}`;
  
  const isActive =
    (section === "home" && location.pathname === "/") ||
    (section === "about" && location.pathname === "/about") ||
    (section === "projects" && (location.pathname === "/projects" || location.pathname.startsWith("/projects/"))) ||
    (section === "contact" && location.pathname === "/contact") ||
    location.pathname === targetPath;

  return (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(34, 197, 94, 0.4)" }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        to={targetPath}
        aria-current={isActive ? "page" : undefined}
        onClick={() => {
          if (setCurrentSection) setCurrentSection(section);
          if (setCurrentProject) setCurrentProject(null);
        }}
        className={`flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg font-mono text-xs sm:text-sm whitespace-nowrap transition-all duration-300 ${
          isActive
            ? "bg-green-500/20 text-green-400 border border-green-400/50 shadow-lg shadow-green-400/20"
            : "text-gray-400 hover:text-green-400 hover:bg-green-500/10"
        }`}
      >
        {icon} <span>{label}</span>
        {isActive && <ChevronRight className="w-4 h-4 animate-pulse hidden sm:inline-block" />}
      </Link>
    </motion.div>
  );
};

export default NavItem;
