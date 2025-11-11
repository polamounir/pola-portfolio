import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, type LucideIcon } from "lucide-react";
import type { NavItemProps } from "../../utils/types";

const NavItem: React.FC<NavItemProps> = ({
  section,
  label,
  icon,
  currentSection,
  setCurrentSection,
  setCurrentProject,
}) => (
  <motion.a
    href={`#${section}`}
    whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(34, 197, 94, 0.4)" }}
    whileTap={{ scale: 0.95 }}
    onClick={(e) => {
    
      e.preventDefault();
      setCurrentSection(section);
      setCurrentProject(null);
    }}
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
  </motion.a>
);

export default NavItem;
