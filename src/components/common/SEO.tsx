import { useEffect } from "react";

interface SEOProps {
  currentSection: string;
  name: string;
}

const SECTION_TITLES: Record<string, string> = {
  home: "Pola Mounir | React Frontend Developer - Web Portfolio",
  skills: "Technical Skills | Pola Mounir - React & Frontend",
  projects: "Featured Projects & Apps | Pola Mounir",
  experience: "Experience & Timeline | Pola Mounir",
  contact: "Contact & Inquiries | Pola Mounir",
};

export const SEO: React.FC<SEOProps> = ({ currentSection }) => {
  useEffect(() => {
    const title =
      SECTION_TITLES[currentSection] ||
      "Pola Mounir | React Frontend Developer - Web Portfolio";
    document.title = title;
  }, [currentSection]);

  return null;
};
