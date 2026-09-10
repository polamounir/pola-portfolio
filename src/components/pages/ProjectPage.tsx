import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Cpu, Code, Github, ExternalLink, ArrowLeft } from "lucide-react";
import type { Project, PersonalInfo } from "../../types";

interface ProjectPageProps {
  projects: Project[];
  personalInfo: PersonalInfo;
}

const ProjectPage: React.FC<ProjectPageProps> = ({ projects, personalInfo }) => {
  const { slug } = useParams<{ slug: string }>();

  const project = projects.find(
    (p) =>
      p.slug === slug ||
      p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") === slug
  );

  // Emit data-prerender-ready signal when project data is loaded and rendered
  useEffect(() => {
    if (project) {
      document.body.setAttribute("data-prerender-ready", "true");
    }
  }, [project]);

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center">
        <h1 className="text-3xl font-bold text-red-400 mb-4">Project Not Found</h1>
        <p className="text-gray-400 mb-8">
          The requested project "{slug}" could not be located in the portfolio catalog.
        </p>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/20 text-green-400 border border-green-400/40 hover:bg-green-500/30 transition-all font-mono"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Featured Projects
        </Link>
      </div>
    );
  }

  const canonicalUrl = `https://pola-mounir.vercel.app/projects/${project.slug}`;
  const metaDescription = `${project.title}: ${project.description.slice(0, 140)}`;

  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: canonicalUrl,
    creator: {
      "@type": "Person",
      name: personalInfo.name || "Pola Mounir",
      url: "https://pola-mounir.vercel.app/",
    },
    programmingLanguage: project.tech,
    ...(project.datePublished && { datePublished: project.datePublished }),
    ...(project.dateModified && { dateModified: project.dateModified }),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://pola-mounir.vercel.app/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: "https://pola-mounir.vercel.app/projects",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <article className="max-w-5xl mx-auto space-y-8 font-mono">
      <Helmet>
        <title>{`${project.title} | Pola Mounir — React Frontend Developer`}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={`${project.title} | Pola Mounir`} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">
          {JSON.stringify(creativeWorkSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-gray-400">
        <Link to="/" className="hover:text-green-400 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link to="/projects" className="hover:text-green-400 transition-colors">
          Projects
        </Link>
        <span>/</span>
        <span className="text-green-400 font-bold">{project.title}</span>
      </nav>

      {/* Header with Title and Status */}
      <header className="border-b border-green-400/30 pb-6">
        <div className="flex flex-wrap justify-between items-start gap-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold text-green-400 flex items-center gap-3">
              <span className="text-4xl">{project.image}</span> {project.title}
            </h1>
            <div className="flex items-center gap-3 mt-3">
              <span
                className={`text-xs px-2.5 py-1 rounded font-bold uppercase tracking-wider ${
                  project.status === "Production"
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : project.status === "Beta"
                    ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                    : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                }`}
              >
                Status: {project.status}
              </span>
              <span className="text-xs text-gray-400">
                Created by {personalInfo.name || "Pola Mounir"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/20 text-green-400 border border-green-400/50 hover:bg-green-500/30 transition-all font-semibold shadow-lg shadow-green-400/10 text-sm"
              >
                <ExternalLink className="w-4 h-4" /> Live Demo
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-gray-300 border border-gray-700 hover:text-green-400 hover:border-green-400/50 transition-all text-sm"
              >
                <Github className="w-4 h-4" /> GitHub
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Project Screenshot */}
      {project.imgSrc && (
        <div className="relative w-full h-64 md:h-[420px] rounded-xl overflow-hidden border border-green-400/40 shadow-2xl shadow-green-400/10">
          <img
            src={project.imgSrc}
            alt={`Screenshot of ${project.title} application built with ${project.tech.join(", ")} by Pola Mounir`}
            width={1200}
            height={630}
            decoding="async"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent"></div>
        </div>
      )}

      {/* Explicit, Citable Factual Identity Statement */}
      <section className="bg-gray-900/70 border border-green-400/30 rounded-xl p-6 md:p-8 space-y-4">
        <h2 className="text-xl font-bold text-green-400">Overview & Architecture</h2>
        <p className="text-base md:text-lg text-gray-300 leading-relaxed">
          Pola Mounir built <strong>{project.title}</strong> using{" "}
          <strong>{project.tech.join(", ")}</strong>. {project.fullDescription || project.description}
        </p>
      </section>

      {/* Tech Stack and System Metrics */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-900/60 border border-cyan-400/30 rounded-xl p-6 space-y-4 shadow-inner">
          <h2 className="text-lg font-bold text-cyan-400 flex items-center gap-2">
            <Cpu className="w-5 h-5" /> Architecture Specifications
          </h2>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <span className="text-gray-400">Primary Framework:</span>{" "}
              <span className="text-green-400 font-semibold">React.js</span>
            </li>
            <li>
              <span className="text-gray-400">Component Architecture:</span>{" "}
              <span className="text-green-400 font-semibold">Modular & Reusable</span>
            </li>
            <li>
              <span className="text-gray-400">Approximate Scale:</span>{" "}
              <span className="text-green-400 font-semibold">{project.lines} lines of code</span>
            </li>
            <li>
              <span className="text-gray-400">Responsive UI:</span>{" "}
              <span className="text-green-400 font-semibold">Mobile-First Tailwind CSS</span>
            </li>
          </ul>
        </div>

        <div className="bg-gray-900/60 border border-green-400/30 rounded-xl p-6 space-y-4 shadow-inner">
          <h2 className="text-lg font-bold text-green-400 flex items-center gap-2">
            <Code className="w-5 h-5" /> Technologies Used
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-md text-xs font-semibold bg-gray-800 text-green-400 border border-green-400/30"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Back Link */}
      <div className="pt-6 border-t border-gray-800 flex justify-between items-center">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-green-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Projects
        </Link>
        <Link
          to="/contact"
          className="text-sm text-green-400 hover:underline"
        >
          Have questions about this project? Get in touch &rarr;
        </Link>
      </div>
    </article>
  );
};

export default ProjectPage;
