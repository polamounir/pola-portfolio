// src/services/api.ts

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

export interface BackendProfile {
  name?: string;
  title?: string;
  bio?: string;
  shortBio?: string;
  detailedBio?: string;
  avatarUrl?: string;
  resumeUrl?: string;
  contact?: {
    email?: string;
    location?: string;
    phone?: string;
  };
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    other?: string;
  };
}

export interface BackendProject {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  links?:
    | {
        liveDemo?: string;
        github?: string;
        live?: string;
      }
    | Array<{ label?: string; url?: string; type?: string }>;
  images?: { thumbnail?: string; gallery?: string[] };
  thumbnailUrl?: string;
  status?: "Production" | "Beta" | "Active Dev" | string;
  metrics?: { linesOfCode?: string };
  iconEmoji?: string;
  lines?: string;
  image?: string;
  order?: number;
}

export interface BackendSkill {
  _id: string;
  name: string;
  level: number;
  category: "Frontend" | "Backend/DB" | "Soft Skills" | string;
  icon?: string;
  order?: number;
}

export interface BackendExperience {
  _id: string;
  title: string;
  organization?: string;
  company?: string;
  type?: string;
  startDate?: string;
  endDate?: string;
  current?: boolean;
  description?: string;
  order?: number;
}

export interface BackendNavLink {
  _id: string;
  name: string;
  path: string;
  icon?: string;
  order?: number;
}

export interface BackendAlert {
  _id?: string;
  isActive: boolean;
  message: string;
  badgeText?: string;
  subtext?: string;
  footerText?: string;
  icon?: string;
  position?: "bottom-center" | "top-center" | "bottom-right" | "top-right" | string;
  showCloseButton?: boolean;
  primaryColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  titleColor?: string;
  textColor?: string;
  badgeBgColor?: string;
  badgeTextColor?: string;
  glowColor?: string;
  fontFamily?: string;
  titleFontSize?: string;
  bodyFontSize?: string;
  pulseGlow?: boolean;
  backdropBlur?: boolean;
}

export interface BackendTheme {
  _id?: string;
  presetName?: string;
  primaryColor?: string;
  primaryDarkColor?: string;
  secondaryColor?: string;
  secondaryDarkColor?: string;
  backgroundColor?: string;
  cardBackgroundColor?: string;
  cardSubColor?: string;
  glowColor?: string;
  fontFamily?: string;
  fontType?: string;
}

// Shared fetch helper with AbortSignal support
async function apiFetch<T>(url: string, signal?: AbortSignal): Promise<T | null> {
  try {
    const res = await fetch(url, { signal });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || null;
  } catch (err: unknown) {
    if (err instanceof DOMException && err.name === 'AbortError') return null;
    console.warn(`Portfolio API - fetch ${url} fallback:`, err);
    return null;
  }
}

export const portfolioApi = {
  getTheme: (signal?: AbortSignal) => apiFetch<BackendTheme>(`${API_BASE}/theme`, signal),
  getAlert: (signal?: AbortSignal) => apiFetch<BackendAlert>(`${API_BASE}/alert`, signal),
  getProfile: (signal?: AbortSignal) => apiFetch<BackendProfile>(`${API_BASE}/profile`, signal),
  getProjects: (signal?: AbortSignal) => apiFetch<BackendProject[]>(`${API_BASE}/projects`, signal),
  getSkills: (signal?: AbortSignal) => apiFetch<BackendSkill[]>(`${API_BASE}/skills`, signal),
  getExperiences: (signal?: AbortSignal) => apiFetch<BackendExperience[]>(`${API_BASE}/experiences`, signal),
  getNavigationLinks: (signal?: AbortSignal) => apiFetch<BackendNavLink[]>(`${API_BASE}/navigation-links`, signal),

  async sendMessage(data: { name: string; email: string; message: string }): Promise<{ success: boolean; message?: string }> {
    try {
      const res = await fetch(`${API_BASE}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          subject: `Portfolio Contact from ${data.name}`,
          content: data.message,
        }),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return { success: true };
    } catch (err) {
      console.error("Portfolio API - Error sending message:", err);
      return { success: false, message: "Failed to transmit message" };
    }
  },
};
