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

export const DEFAULT_PROJECT_DATA: Project[] = [
  {
    id: 0,
    title: "Fast-Box",
    description: "Fastest and reliable courier service",
    tech: ["React.js", "React Router", "JavaScript", "Tailwind CSS"],
    github: "https://github.com/polamounir/Fast-box",
    live: "https://fast-box-shipment.vercel.app/",
    lines: "1,000+",
    image: "🚚",
    status: "Active Dev",
    imgSrc: project1,
  },
  {
    id: 1,
    title: "Electroo E-commerce",
    description:
      "A full-featured e-commerce platform for electronic products with user authentication, product catalog, shopping cart, and checkout functionality.",
    tech: [
      "React.js",
      "JavaScript",
      "Tailwind CSS",
      "Redux Toolkit",
      "Axios",
      "React Query",
      "Charts.js",
    ],
    github: "https://github.com/polamounir/electroo",
    live: "https://electroo.vercel.app/",
    lines: "15,000+",
    image: "🛒",
    status: "Production",
    imgSrc: project2,
  },
  {
    id: 2,
    title: "Medical Prediction System",
    description:
      "A healthcare application for predicting medical conditions using machine learning algorithms.",
    tech: ["React.js", "JavaScript", "Tailwind CSS", "AI Integration"],
    github: "https://github.com/polamounir/medical-predictions",
    live: "https://medical-prediction.vercel.app/",
    lines: "8,000+",
    image: "🧠",
    status: "Beta",
    imgSrc: project3,
  },
  {
    id: 3,
    title: "SEF Gold",
    description:
      "A dynamic course platform with exam systems, CV builders, and user role-based dashboards, improving user engagement and accessibility.",
    tech: ["React.js", "JavaScript", "Bootstrap", "Redux Toolkit"],
    github: "https://github.com/polamounir/SEF",
    live: "https://sef-gold.vercel.app/",
    lines: "12,000+",
    image: "🎓",
    status: "Production",
    imgSrc: project4,
  },
  {
    id: 4,
    title: "Weather Application",
    description:
      "Real-time weather forecast application with location-based weather data and interactive maps.",
    tech: [
      "React.js",
      "JavaScript",
      "Tailwind CSS",
      "Weather API",
      "Geolocation",
    ],
    github: "https://github.com/polamounir/Weather-app",
    live: "https://weather-app-eight-kappa-91.vercel.app/",
    lines: "5,000+",
    image: "🌦️",
    status: "Production",
    imgSrc: project5,
  },
];

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
