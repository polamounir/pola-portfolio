import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Home, FolderGit2, Mail, AlertTriangle } from "lucide-react";

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto py-24 text-center space-y-8 font-mono">
      <Helmet>
        <title>Page Not Found | Pola Mounir</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 mb-2">
        <AlertTriangle className="w-10 h-10" />
      </div>

      <div className="space-y-3">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-100 tracking-tight">
          404 — Page Not Found
        </h1>
        <p className="text-gray-400 text-lg max-w-md mx-auto">
          The requested path does not exist or has been moved. Explore the verified pages below:
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-green-500/20 text-green-400 border border-green-400/40 hover:bg-green-500/30 transition-all text-sm font-semibold"
        >
          <Home className="w-4 h-4" /> Return to Home
        </Link>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-800 text-gray-200 border border-gray-700 hover:border-green-400/50 hover:text-green-400 transition-all text-sm font-semibold"
        >
          <FolderGit2 className="w-4 h-4" /> View Projects
        </Link>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-800 text-gray-200 border border-gray-700 hover:border-green-400/50 hover:text-green-400 transition-all text-sm font-semibold"
        >
          <Mail className="w-4 h-4" /> Contact
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
