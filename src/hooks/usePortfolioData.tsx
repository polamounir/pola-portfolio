import { useState, useEffect, useCallback, startTransition } from "react";
import {
  Code,
  Cpu,
  Database,
  Layout,
  Terminal,
  Folder,
  GitBranch,
  Mail,
  Lightbulb,
} from "lucide-react";
import {
  DEFAULT_PERSONAL_INFO,
  DEFAULT_ABOUT_ME_SUMMARY,
  DEFAULT_PROJECT_DATA,
  DEFAULT_SKILL_DATA,
  DEFAULT_EXPERIENCE_DATA,
} from "../constants";
import { portfolioApi, type BackendAlert, type BackendTheme } from "../services/api";
import type {
  PersonalInfo,
  Project,
  Skill,
  ExperienceItem,
  FormData,
  NavItemData,
} from "../types";

export interface UsePortfolioDataReturn {
  personalInfo: PersonalInfo;
  aboutMe: string;
  projects: Project[];
  skills: Skill[];
  experience: ExperienceItem[];
  navigationLinks: NavItemData[];
  alertConfig: BackendAlert | null;
  themeConfig: BackendTheme | null;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  submissionStatus: "success" | "error" | null;
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  isLoading: boolean;
}

const DEFAULT_NAV_LINKS: NavItemData[] = [
  { section: "home", label: "home", icon: <Terminal className="w-4 h-4" /> },
  { section: "about", label: "about", icon: <Cpu className="w-4 h-4" /> },
  { section: "projects", label: "projects", icon: <Folder className="w-4 h-4" /> },
  { section: "contact", label: "contact", icon: <Mail className="w-4 h-4" /> },
];

const getSkillIcon = (name: string, category: string) => {
  const n = (name || "").toLowerCase();
  const c = (category || "").toLowerCase();
  if (
    c.includes("backend") ||
    c.includes("db") ||
    n.includes("sql") ||
    n.includes("mongo") ||
    n.includes("node") ||
    n.includes("express")
  ) {
    return <Database className="w-4 h-4" />;
  }
  if (
    n.includes("react") ||
    n.includes("cpu") ||
    n.includes("redux") ||
    n.includes("typescript")
  ) {
    return <Cpu className="w-4 h-4" />;
  }
  if (
    n.includes("css") ||
    n.includes("tailwind") ||
    n.includes("bootstrap") ||
    n.includes("html") ||
    n.includes("design") ||
    n.includes("ui")
  ) {
    return <Layout className="w-4 h-4" />;
  }
  return <Code className="w-4 h-4" />;
};

const getNavIcon = (name: string) => {
  const n = (name || "").toLowerCase();
  if (n.includes("home")) return <Terminal className="w-4 h-4" />;
  if (n.includes("skill")) return <Cpu className="w-4 h-4" />;
  if (n.includes("project")) return <Folder className="w-4 h-4" />;
  if (n.includes("exp")) return <GitBranch className="w-4 h-4" />;
  if (n.includes("contact") || n.includes("mail")) return <Mail className="w-4 h-4" />;
  return <Lightbulb className="w-4 h-4" />;
};

// Module-level cache to prevent duplicate fetches (React StrictMode double-mount)
let _cachedData: {
  timestamp: number;
  data: Awaited<ReturnType<typeof _fetchAll>> | null;
} = { timestamp: 0, data: null };

const CACHE_TTL = 5000; // 5 seconds

async function _fetchAll(signal?: AbortSignal) {
  return Promise.all([
    portfolioApi.getProfile(signal),
    portfolioApi.getProjects(signal),
    portfolioApi.getSkills(signal),
    portfolioApi.getExperiences(signal),
    portfolioApi.getNavigationLinks(signal),
    portfolioApi.getAlert(signal),
    portfolioApi.getTheme(signal),
  ]);
}

export const usePortfolioData = (): UsePortfolioDataReturn => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(DEFAULT_PERSONAL_INFO);
  const [aboutMe, setAboutMe] = useState<string>(DEFAULT_ABOUT_ME_SUMMARY);
  const [projects, setProjects] = useState<Project[]>(DEFAULT_PROJECT_DATA);
  const [skills, setSkills] = useState<Skill[]>(DEFAULT_SKILL_DATA);
  const [experience, setExperience] = useState<ExperienceItem[]>(DEFAULT_EXPERIENCE_DATA);
  const [navigationLinks, setNavigationLinks] = useState<NavItemData[]>(DEFAULT_NAV_LINKS);
  const [alertConfig, setAlertConfig] = useState<BackendAlert | null>(null);
  const [themeConfig, setThemeConfig] = useState<BackendTheme | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [submissionStatus, setSubmissionStatus] = useState<
    "success" | "error" | null
  >(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const loadData = async () => {
      try {
        let results: Awaited<ReturnType<typeof _fetchAll>>;

        // Return cached data if recent (prevents StrictMode double-fetch)
        if (_cachedData.data && Date.now() - _cachedData.timestamp < CACHE_TTL) {
          results = _cachedData.data;
        } else {
          results = await _fetchAll(controller.signal);
          _cachedData = { timestamp: Date.now(), data: results };
        }

        const [profileRes, projectsRes, skillsRes, expRes, navRes, alertRes, themeRes] = results;

        if (!isMounted) return;

        startTransition(() => {
          // Set theme settings
          if (themeRes) {
            setThemeConfig(themeRes);
          }

          // Set alert settings
          if (alertRes) {
            setAlertConfig(alertRes);
          }

          // 1. Profile sync
          if (profileRes) {
            setPersonalInfo((prev) => {
              let normalizedResumeUrl = profileRes.resumeUrl || prev.resumeUrl;
              if (normalizedResumeUrl && normalizedResumeUrl.includes("localhost:5000")) {
                normalizedResumeUrl = normalizedResumeUrl.replace("http://localhost:5000", "https://pola-portfolio-server.vercel.app");
              }
              return {
                ...prev,
                name: profileRes.name || prev.name,
                role: profileRes.title || prev.role,
                location: profileRes.contact?.location || prev.location,
                email: profileRes.contact?.email || prev.email,
                github: profileRes.socialLinks?.github || prev.github,
                linkedin: profileRes.socialLinks?.linkedin || prev.linkedin,
                avatarUrl: profileRes.avatarUrl || prev.avatarUrl,
                resumeUrl: normalizedResumeUrl || prev.resumeUrl || "/Pola_Mounir_Resume.pdf",
              };
            });
            if (profileRes.detailedBio) {
              setAboutMe(profileRes.detailedBio);
            } else if (profileRes.shortBio) {
              setAboutMe(profileRes.shortBio);
            } else if (profileRes.bio) {
              setAboutMe(profileRes.bio);
            }
          }

          // 2. Projects sync with Cloudinary images & normalized links
          if (projectsRes && projectsRes.length > 0) {
            const mappedProjects: Project[] = projectsRes.map((bp, idx) => {
              let githubLink = "";
              let liveLink = "";

              if (bp.links) {
                if (Array.isArray(bp.links)) {
                  const ghItem = bp.links.find(
                    (l) =>
                      l.label?.toLowerCase() === "github" ||
                      l.type === "github" ||
                      l.url?.includes("github")
                  );
                  githubLink = ghItem?.url || "";

                  const liveItem = bp.links.find(
                    (l) =>
                      l.label?.toLowerCase() === "live" ||
                      l.label?.toLowerCase() === "demo" ||
                      l.type === "live" ||
                      (l.url && !l.url.includes("github"))
                  );
                  liveLink = liveItem?.url || "";
                } else if (typeof bp.links === "object") {
                  const linksObj = bp.links as Record<string, string | undefined>;
                  githubLink = linksObj.github || "";
                  liveLink = linksObj.liveDemo || linksObj.live || "";
                }
              }

              const thumb = bp.images?.thumbnail || bp.thumbnailUrl || (DEFAULT_PROJECT_DATA[idx]?.imgSrc || "");

              const projectSlug =
                (bp as { slug?: string }).slug ||
                DEFAULT_PROJECT_DATA[idx]?.slug ||
                bp.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

              const defaultProj =
                DEFAULT_PROJECT_DATA.find((dp) => dp.slug === projectSlug) ||
                DEFAULT_PROJECT_DATA[idx];

              return {
                id: bp._id || idx,
                slug: projectSlug,
                title: bp.title,
                description: bp.description,
                tech: bp.technologies || [],
                github: githubLink,
                live: liveLink,
                lines: bp.lines || bp.metrics?.linesOfCode || "1,000+",
                image: bp.iconEmoji || bp.image || "💻",
                status: (bp.status as "Production" | "Beta" | "Active Dev") || "Production",
                imgSrc: thumb,
                fullDescription: bp.description,
                datePublished: (bp as any).datePublished || defaultProj?.datePublished,
                dateModified: (bp as any).dateModified || defaultProj?.dateModified,
              };
            });
            setProjects(mappedProjects);
          }

          // 3. Skills sync
          if (skillsRes && skillsRes.length > 0) {
            const mappedSkills: Skill[] = skillsRes.map((bs) => ({
              name: bs.name,
              level: bs.level,
              icon: getSkillIcon(bs.name, bs.category || "Frontend"),
              category: bs.category || "Frontend",
            }));
            setSkills(mappedSkills);
          }

          // 4. Experiences sync
          if (expRes && expRes.length > 0) {
            const mappedExp: ExperienceItem[] = expRes.map((be) => {
              const start = be.startDate
                ? new Date(be.startDate).getFullYear().toString()
                : "2023";
              const end = be.current
                ? "Present"
                : be.endDate
                ? new Date(be.endDate).getFullYear().toString()
                : "Present";

              const achievements = be.description
                ? be.description
                    .split("\n")
                    .map((s) => s.trim().replace(/^[•\-\*]\s*/, ""))
                    .filter(Boolean)
                : [];

              return {
                role: be.title,
                company: be.organization || be.company || "Independent",
                period: `${start} - ${end}`,
                achievements,
              };
            });
            setExperience(mappedExp);
          }

          // 5. Navigation links sync
          if (navRes && navRes.length > 0) {
            const seen = new Set<string>();
            const mappedNav: NavItemData[] = [];
            for (const n of navRes) {
              const rawPath = (n.path || "").replace(/^#/, "").trim().toLowerCase();
              let section = rawPath || n.name.toLowerCase();
              let label = n.name.toLowerCase();
              if (section === "skills" || section === "experience" || section === "about") {
                section = "about";
                label = "about";
              }
              if (!seen.has(section)) {
                seen.add(section);
                mappedNav.push({
                  section,
                  label,
                  icon: section === "about" ? <Cpu className="w-4 h-4" /> : getNavIcon(n.name),
                });
              }
            }
            setNavigationLinks(mappedNav);
          }
        });
      } catch (err) {
        console.warn("Error fetching portfolio live data, using fallbacks:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const handleSubmit = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
      e.preventDefault();
      if (!formData.name || !formData.email || !formData.message) return;

      setSubmissionStatus(null);
      const res = await portfolioApi.sendMessage(formData);

      if (res.success) {
        setSubmissionStatus("success");
        setTimeout(() => {
          setFormData({ name: "", email: "", message: "" });
          setSubmissionStatus(null);
        }, 3000);
      } else {
        setSubmissionStatus("error");
        setTimeout(() => {
          setSubmissionStatus(null);
        }, 3000);
      }
    },
    [formData]
  );

  return {
    personalInfo,
    aboutMe,
    projects,
    skills,
    experience,
    navigationLinks,
    alertConfig,
    themeConfig,
    formData,
    setFormData,
    submissionStatus,
    handleSubmit,
    isLoading,
  };
};
