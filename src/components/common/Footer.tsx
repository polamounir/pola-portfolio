import React from "react";

interface FooterProps {
  name: string;
}

export const Footer: React.FC<FooterProps> = ({ name }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-green-400/30 bg-gray-900/50 backdrop-blur-sm mt-20">
      <div className="max-w-7xl mx-auto px-6 py-8 text-center text-gray-400 text-sm">
        <div className="mb-2">
          © {currentYear} {name}. Built with React & Tailwind CSS
        </div>
      </div>
    </footer>
  );
};
