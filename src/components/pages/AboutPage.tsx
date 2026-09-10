import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { HelpCircle } from "lucide-react";
import type { PersonalInfo, Skill, ExperienceItem, Project } from "../../types";
import { SkillsSection, ExperienceSection } from "../sections";
import faqData from "../../data/faq.json";

interface AboutPageProps {
  personalInfo: PersonalInfo;
  aboutMe: string;
  skills: Skill[];
  experience: ExperienceItem[];
  projects: Project[];
}

const AboutPage: React.FC<AboutPageProps> = ({
  personalInfo,
  skills,
  experience,
  projects,
}) => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const elem = document.querySelector(location.hash);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.hash]);

  const canonicalUrl = "https://pola-mounir.vercel.app/about";
  const metaDescription =
    "Pola Mounir is a React Frontend Developer based in Giza, Egypt, specializing in responsive web applications, component architecture, and modern web technologies.";

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <article className="space-y-12 font-mono">
      <Helmet>
        <title>About Pola Mounir | React Frontend Developer</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content="About Pola Mounir | React Frontend Developer" />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      {/* Hero / Identity Section with Single H1 */}
      <section className="bg-gray-900/80 border border-green-400/40 rounded-xl p-8 md:p-12 space-y-6 shadow-xl shadow-green-400/10">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-green-400">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-ping"></span>
          <span>Verified Professional Identity</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold text-green-400">
          About Pola Mounir
        </h1>

        <div className="space-y-4 text-base md:text-lg text-gray-300 leading-relaxed border-l-4 border-green-400/60 pl-4 md:pl-6">
          <p>
            <strong>Pola Mounir</strong> is a <strong>React Frontend Developer</strong> based in{" "}
            <strong>Giza, Egypt</strong>. He specializes in designing and implementing high-performance,
            responsive web applications utilizing <strong>React.js</strong>, <strong>TypeScript</strong>,{" "}
            <strong>JavaScript</strong>, and <strong>Tailwind CSS</strong>.
          </p>
          <p>
            With a strong focus on modular component design, state management with Redux Toolkit, and accessible
            user interfaces, Pola crafts maintainable software tailored for real-world production environments.
          </p>
          <p>
            Explore his work across multiple live projects, including e-commerce platforms, shipment tracking
            dashboards, medical prediction applications, and educational platforms.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 pt-4">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-green-500/20 text-green-400 border border-green-400/50 hover:bg-green-500/30 transition-all font-semibold shadow-lg shadow-green-400/10 text-sm"
          >
            View Featured Projects &rarr;
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-800 text-gray-300 border border-gray-700 hover:text-green-400 hover:border-green-400/50 transition-all text-sm"
          >
            Get in Touch
          </Link>
        </div>
      </section>

      {/* Skills Section Component */}
      <section id="skills">
        <SkillsSection skills={skills} PROJECT_DATA={projects} />
      </section>

      {/* Experience Section Component */}
      <section id="experience">
        <ExperienceSection experience={experience} PERSONAL_INFO={personalInfo} />
      </section>

      {/* FAQ Section Component (Single-source DOM + JSON-LD) */}
      <section className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold text-green-400 flex items-center gap-3">
          <HelpCircle className="w-7 h-7" /> Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqData.map((item, idx) => (
            <div
              key={idx}
              className="bg-gray-900/80 border border-green-400/20 rounded-xl p-6 space-y-2 hover:border-green-400/40 transition-colors"
            >
              <h3 className="text-lg font-bold text-green-400">{item.question}</h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
};

export default AboutPage;
