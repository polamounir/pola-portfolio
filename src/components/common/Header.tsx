import React from "react";
import { Link } from "react-router-dom";
import {
  Terminal,
  Cpu,
  Folder,
  GitBranch,
  Mail,
  Github,
  Linkedin,
  FileText,
} from "lucide-react";
import type { HeaderProps } from "../../utils/types";
import NavItem from "./NavItem";

const Header: React.FC<HeaderProps> = ({
  currentSection,
  setCurrentSection,
  setCurrentProject,
  PERSONAL_INFO,
  navLinks,
}) => {
  const defaultNavItems = [
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

  const navItems =
    navLinks && navLinks.length > 0
      ? navLinks.map((n) => ({
          section: n.section,
          label: n.label,
          icon: n.icon || <Terminal className="w-4 h-4" />,
        }))
      : defaultNavItems;

  return (
    <>
      {/* Desktop Header */}
      <header className="relative py-5 z-10 border-b border-green-400/30 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            {PERSONAL_INFO.avatarUrl ? (
              <img
                src={PERSONAL_INFO.avatarUrl}
                alt={PERSONAL_INFO.name}
                width={40}
                height={40}
                className="w-10 h-10 rounded-lg object-cover border border-green-400/50 shadow-md shadow-green-400/20"
              />
            ) : (
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-cyan-400 rounded-lg flex items-center justify-center">
                <Terminal className="w-6 h-6 text-gray-900" />
              </div>
            )}

            <div>
              <div className="text-green-400 text-lg font-bold">dev@pola</div>
              <div className="text-xs text-gray-400">~/system/online</div>
            </div>
          </Link>

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
            {PERSONAL_INFO.resumeUrl && (
              <a
                href={PERSONAL_INFO.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="View Resume / CV"
                aria-label="View Resume / CV"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-green-500/15 text-green-400 border border-green-400/40 hover:bg-green-500/25 hover:border-green-400 transition-all shadow-[0_0_10px_rgba(34,197,94,0.2)]"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume</span>
              </a>
            )}
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="text-gray-400 hover:text-green-400 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
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
