import type { ReactElement, Dispatch, SetStateAction, MouseEvent } from "react";
import type { LucideIcon } from "lucide-react";

// --- Domain Models ---

export interface PersonalInfo {
  name: string;
  role: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  avatarUrl?: string;
  resumeUrl?: string;
}

export interface Project {
  id: number | string;
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
  category: "Frontend" | "Backend/DB" | "Soft Skills" | string;
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

export interface NavItemData {
  section: string;
  label: string;
  icon?: ReactElement<LucideIcon>;
}

export interface NavItemProps {
  section: string;
  label: string;
  icon: ReactElement<LucideIcon>;
  currentSection: string;
  setCurrentSection: Dispatch<SetStateAction<string>>;
  setCurrentProject: Dispatch<SetStateAction<Project | null>>;
}

export interface HeaderProps {
  currentSection: string;
  setCurrentSection: Dispatch<SetStateAction<string>>;
  setCurrentProject: Dispatch<SetStateAction<Project | null>>;
  PERSONAL_INFO: PersonalInfo;
  navLinks?: NavItemData[];
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
  setCurrentProject: Dispatch<SetStateAction<Project | null>>;
  PERSONAL_INFO: PersonalInfo;
}

export interface ExperienceSectionProps {
  experience: ExperienceItem[];
  PERSONAL_INFO?: PersonalInfo;
}

export interface ContactSectionProps {
  PERSONAL_INFO: PersonalInfo;
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
  handleSubmit: (e: MouseEvent<HTMLButtonElement>) => void;
  submissionStatus: "success" | "error" | null;
}
