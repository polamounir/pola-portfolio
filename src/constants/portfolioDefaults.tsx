import { Code, Cpu, Database } from "lucide-react";
import project1 from "../assets/projects/p11.png";
import project2 from "../assets/projects/p21.png";
import project3 from "../assets/projects/p31.png";
import project4 from "../assets/projects/p41.png";
import project5 from "../assets/projects/p51.png";
import type { PersonalInfo, Project, Skill, ExperienceItem } from "../types";

export const DEFAULT_PERSONAL_INFO: PersonalInfo = {
  name: "Pola Mounir",
  role: "React Frontend Developer",
  location: "Giza, Egypt",
  email: "polamounir103@gmail.com",
  github: "https://github.com/polamounir",
  linkedin: "https://www.linkedin.com/in/pola-mounir-samir/",
  resumeUrl: "/Pola_Mounir_Resume.pdf",
};

export const DEFAULT_ABOUT_ME_SUMMARY =
  "Frontend Developer with experience in building responsive and user-friendly web applications using React.js and modern web technologies. Skilled in creating efficient and maintainable code with a focus on performance and accessibility.";

export const DEFAULT_SKILL_DATA: Skill[] = [
  {
    name: "HTML5",
    level: 95,
    icon: <Code className="w-4 h-4" />,
    category: "Frontend",
  },
  {
    name: "CSS3",
    level: 90,
    icon: <Code className="w-4 h-4" />,
    category: "Frontend",
  },
  {
    name: "Tailwind CSS",
    level: 90,
    icon: <Code className="w-4 h-4" />,
    category: "Frontend",
  },
  {
    name: "JavaScript",
    level: 95,
    icon: <Code className="w-4 h-4" />,
    category: "Frontend",
  },
  {
    name: "TypeScript",
    level: 85,
    icon: <Code className="w-4 h-4" />,
    category: "Frontend",
  },
  {
    name: "React.js",
    level: 95,
    icon: <Cpu className="w-4 h-4" />,
    category: "Frontend",
  },
  {
    name: "Redux Toolkit",
    level: 85,
    icon: <Cpu className="w-4 h-4" />,
    category: "Frontend",
  },
  {
    name: "Node.js",
    level: 75,
    icon: <Database className="w-4 h-4" />,
    category: "Backend/DB",
  },
  {
    name: "Express.js",
    level: 75,
    icon: <Database className="w-4 h-4" />,
    category: "Backend/DB",
  },
  {
    name: "MongoDB",
    level: 70,
    icon: <Database className="w-4 h-4" />,
    category: "Backend/DB",
  },
  {
    name: "Bootstrap",
    level: 80,
    icon: <Code className="w-4 h-4" />,
    category: "Frontend",
  },
];

import rawProjects from "../data/projects.json";

const PROJECT_IMAGES: Record<string, string> = {
  p11: project1,
  p21: project2,
  p31: project3,
  p41: project4,
  p51: project5,
};

export const DEFAULT_PROJECT_DATA: Project[] = rawProjects.map((p) => ({
  id: p.id,
  slug: p.slug,
  title: p.title,
  description: p.description,
  tech: p.tech,
  github: p.github,
  live: p.live,
  lines: p.lines,
  image: p.image,
  status: p.status as "Production" | "Beta" | "Active Dev",
  imgSrc: PROJECT_IMAGES[p.imgKey] || project1,
  datePublished: p.datePublished,
  dateModified: p.dateModified,
}));

export const PROJECTS = DEFAULT_PROJECT_DATA;

export const DEFAULT_EXPERIENCE_DATA: ExperienceItem[] = [
  {
    role: "Frontend Developer",
    company: "Freelance",
    period: "2023 - Present",
    achievements: [
      "Developed responsive web applications using React.js, TypeScript, and modern frontend technologies.",
      "Implemented user interfaces following design specifications and best practices.",
      "Created reusable components and maintained clean, efficient code.",
    ],
  },
];
