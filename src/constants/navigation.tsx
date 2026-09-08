import { Terminal, Cpu, Folder, GitBranch, Mail } from "lucide-react";

export const NAV_ITEMS = [
  { section: "home", label: "home", icon: <Terminal className="w-4 h-4" /> },
  { section: "skills", label: "skills", icon: <Cpu className="w-4 h-4" /> },
  { section: "projects", label: "projects", icon: <Folder className="w-4 h-4" /> },
  { section: "experience", label: "experience", icon: <GitBranch className="w-4 h-4" /> },
  { section: "contact", label: "contact", icon: <Mail className="w-4 h-4" /> },
];
