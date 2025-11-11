import React from "react";
import {
  Terminal,
  Cpu,
  Folder,
  GitBranch,
  Mail,
  Github,
  Linkedin,
} from "lucide-react";
import type { HeaderProps } from "../../utils/types";
import NavItem from "./NavItem";

const Header: React.FC<HeaderProps> = ({
  currentSection,
  setCurrentSection,
  setCurrentProject,
  PERSONAL_INFO,
}) => {
  const navItems = [
    { section: "home", label: "home", icon: <Terminal className="w-4 h-4" /> },
    { section: "skills", label: "skills", icon: <Cpu className="w-4 h-4" /> },
    {
      section: "projects",
      label: "projects",
      icon: <Folder className="w-4 h-4" />,
    },
    {
      section: "experience",
      label: "experience",
      icon: <GitBranch className="w-4 h-4" />,
    },
    {
      section: "contact",
      label: "contact",
      icon: <Mail className="w-4 h-4" />,
    },
  ];

  return (
    <>
      {/* Desktop Header */}
      <header className="relative py-5 z-10 border-b border-green-400/30 bg-gray-900/50 backdrop-blur-sm">
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
            {navItems.map((item) => (
              <NavItem
                key={item.section}
                {...item}
                currentSection={currentSection}
                setCurrentSection={setCurrentSection}
                setCurrentProject={setCurrentProject}
              />
            ))}
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

      {/* Mobile Navigation */}
      <div className="md:hidden sticky top-0 z-10 bg-gray-900/95 backdrop-blur-sm border-b border-green-400/30 px-4 py-3">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {navItems.map((item) => (
            <NavItem
              key={item.section}
              {...item}
              currentSection={currentSection}
              setCurrentSection={setCurrentSection}
              setCurrentProject={setCurrentProject}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Header;
