import type { ReactElement } from "react";
import type { LucideIcon } from "lucide-react";

// --- Global Data Structures ---

export interface PersonalInfo {
  name: string;
  role: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
  lines: string;
  image: string;
  status: "Production" | "Beta" | "Active Dev";
  imgSrc: string;
  fullDescription?: string;
}

export interface Skill {
  name: string;
  level: number;
  icon: ReactElement<LucideIcon>;
  category: "Frontend" | "Backend/DB" | "Soft Skills";
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  achievements: string[];
}

export interface FormData {
  name: string;
  email: string;
  message: string;
}

// --- Component Props Interfaces ---

export interface NavItemProps {
  section: string;
  label: string;
  icon: ReactElement<LucideIcon>;
  currentSection: string;
  setCurrentSection: React.Dispatch<React.SetStateAction<string>>;
  setCurrentProject: React.Dispatch<React.SetStateAction<Project | null>>;
}

export interface HeaderProps {
  currentSection: string;
  setCurrentSection: React.Dispatch<React.SetStateAction<string>>;
  setCurrentProject: React.Dispatch<React.SetStateAction<Project | null>>;
  PERSONAL_INFO: PersonalInfo;
}

export interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
}

export interface HomeSectionProps {
  terminalText: string;
  fullText: string;
  PERSONAL_INFO: PersonalInfo;
  ABOUT_ME_SUMMARY: string;
  PROJECT_DATA: Project[];
}

export interface SkillsSectionProps {
  skills: Skill[];
  PROJECT_DATA: Project[];
}

export interface ProjectsSectionProps {
  projects: Project[];
  setCurrentProject: React.Dispatch<React.SetStateAction<Project | null>>;
  PERSONAL_INFO: PersonalInfo;
}

export interface ExperienceSectionProps {
  experience: ExperienceItem[];
}

export interface ContactSectionProps {
  PERSONAL_INFO: PersonalInfo;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  submissionStatus: "success" | "error" | null;
}
