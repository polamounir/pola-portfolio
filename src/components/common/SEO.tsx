import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
}

const ROUTE_META: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Pola Mounir | React Frontend Developer",
    description:
      "Pola Mounir is a React Frontend Developer based in Giza, Egypt, crafting fast, accessible, and responsive web applications with React.js, TypeScript, and Tailwind CSS.",
  },
  "/about": {
    title: "About Pola Mounir | React Frontend Developer",
    description:
      "Learn more about Pola Mounir, a React Frontend Developer in Giza, Egypt. View technical skills, architecture principles, and development background.",
  },
  "/projects": {
    title: "Featured Projects | Pola Mounir — React Frontend Developer",
    description:
      "Explore web applications and frontend projects built by Pola Mounir, including e-commerce platforms, tracking tools, and healthcare prediction systems.",
  },
  "/contact": {
    title: "Contact Pola Mounir | React Frontend Developer",
    description:
      "Get in touch with Pola Mounir for frontend engineering, contract opportunities, or collaboration in React, TypeScript, and modern web technologies.",
  },
};

export const SEO: React.FC<SEOProps> = ({ title, description, canonical }) => {
  const location = useLocation();
  const cleanPath = location.pathname.replace(/\/index\.html$/, "") || "/";

  // Delegate /about and project detail pages to their own dedicated page helmets
  if (cleanPath === "/about" || (cleanPath.startsWith("/projects/") && cleanPath !== "/projects")) {
    return null;
  }

  const currentMeta = ROUTE_META[cleanPath] || ROUTE_META["/"];

  const resolvedTitle = title || currentMeta.title;
  const resolvedDesc = description || currentMeta.description;
  const resolvedCanonical =
    canonical ||
    (cleanPath === "/"
      ? "https://pola-mounir.vercel.app/"
      : `https://pola-mounir.vercel.app${cleanPath}`);

  return (
    <Helmet>
      <title>{resolvedTitle}</title>
      <meta name="description" content={resolvedDesc} />
      <link rel="canonical" href={resolvedCanonical} />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={resolvedDesc} />
      <meta property="og:url" content={resolvedCanonical} />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDesc} />
    </Helmet>
  );
};

export default SEO;
