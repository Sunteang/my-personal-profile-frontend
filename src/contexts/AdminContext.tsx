/**
 * Admin Context
 * Manages admin authentication state and portfolio data (UI-only, localStorage-based)
 */

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Types for portfolio data
export interface Profile {
  fullName: string;
  title: string;
  introduction: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  objectives: string;
  interests: string[];
  hobbies: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
  achievements: string[];
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  category: "technical" | "soft";
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  type: "fulltime" | "parttime" | "internship" | "volunteer";
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  read: boolean;
}

interface AdminContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  profile: Profile;
  education: Education[];
  skills: Skill[];
  projects: Project[];
  experiences: Experience[];
  socialLinks: SocialLink[];
  messages: ContactMessage[];
  updateProfile: (profile: Profile) => void;
  addEducation: (education: Education) => void;
  updateEducation: (id: string, education: Education) => void;
  deleteEducation: (id: string) => void;
  addSkill: (skill: Skill) => void;
  updateSkill: (id: string, skill: Skill) => void;
  deleteSkill: (id: string) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, project: Project) => void;
  deleteProject: (id: string) => void;
  addExperience: (experience: Experience) => void;
  updateExperience: (id: string, experience: Experience) => void;
  deleteExperience: (id: string) => void;
  addSocialLink: (link: SocialLink) => void;
  updateSocialLink: (id: string, link: SocialLink) => void;
  deleteSocialLink: (id: string) => void;
  markMessageAsRead: (id: string) => void;
  deleteMessage: (id: string) => void;
}

// Default data
const defaultProfile: Profile = {
  fullName: "Alex Johnson",
  title: "Full Stack Developer",
  introduction: "Passionate about creating beautiful, functional web experiences that make a difference.",
  email: "alex.johnson@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  bio: "I'm a Computer Science student with a passion for web development and creating user-friendly applications.",
  objectives: "Seeking opportunities to apply my skills in a dynamic environment while continuing to grow as a developer.",
  interests: ["Web Development", "UI/UX Design", "Open Source", "Machine Learning"],
  hobbies: ["Photography", "Hiking", "Reading", "Gaming"],
};

const defaultEducation: Education[] = [
  {
    id: "1",
    institution: "Stanford University",
    degree: "Bachelor of Science",
    field: "Computer Science",
    startYear: "2021",
    endYear: "2025",
    achievements: ["Dean's List 2022-2023", "GPA: 3.8/4.0"],
  },
];

const defaultSkills: Skill[] = [
  { id: "1", name: "React", level: 90, category: "technical" },
  { id: "2", name: "TypeScript", level: 85, category: "technical" },
  { id: "3", name: "Node.js", level: 80, category: "technical" },
  { id: "4", name: "Problem Solving", level: 95, category: "soft" },
  { id: "5", name: "Communication", level: 90, category: "soft" },
];

const defaultProjects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with payment integration.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true,
  },
  {
    id: "2",
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates.",
    technologies: ["React", "Firebase", "Tailwind CSS"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true,
  },
];

const defaultExperiences: Experience[] = [
  {
    id: "1",
    title: "Software Engineering Intern",
    company: "Tech Startup Inc.",
    type: "internship",
    startDate: "2023-06",
    endDate: "2023-08",
    current: false,
    description: "Developed features for the main product using React and Node.js.",
    achievements: ["Improved app performance by 25%", "Led a team of 3 interns"],
  },
];

const defaultSocialLinks: SocialLink[] = [
  { id: "1", platform: "GitHub", url: "https://github.com", icon: "github" },
  { id: "2", platform: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
  { id: "3", platform: "Twitter", url: "https://twitter.com", icon: "twitter" },
];

const defaultMessages: ContactMessage[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    message: "Hi Alex, I saw your portfolio and I'm impressed! Would you be interested in a freelance project?",
    date: "2024-01-10",
    read: false,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@company.com",
    message: "We have an opening for a junior developer position. Your skills match what we're looking for!",
    date: "2024-01-08",
    read: true,
  },
];

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Simple password for demo (in production, use proper authentication)
const ADMIN_PASSWORD = "admin123";

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [education, setEducation] = useState<Education[]>(defaultEducation);
  const [skills, setSkills] = useState<Skill[]>(defaultSkills);
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [experiences, setExperiences] = useState<Experience[]>(defaultExperiences);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(defaultSocialLinks);
  const [messages, setMessages] = useState<ContactMessage[]>(defaultMessages);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem("admin_authenticated");
    if (savedAuth === "true") setIsAuthenticated(true);

    const savedProfile = localStorage.getItem("portfolio_profile");
    if (savedProfile) setProfile(JSON.parse(savedProfile));

    const savedEducation = localStorage.getItem("portfolio_education");
    if (savedEducation) setEducation(JSON.parse(savedEducation));

    const savedSkills = localStorage.getItem("portfolio_skills");
    if (savedSkills) setSkills(JSON.parse(savedSkills));

    const savedProjects = localStorage.getItem("portfolio_projects");
    if (savedProjects) setProjects(JSON.parse(savedProjects));

    const savedExperiences = localStorage.getItem("portfolio_experiences");
    if (savedExperiences) setExperiences(JSON.parse(savedExperiences));

    const savedSocialLinks = localStorage.getItem("portfolio_socialLinks");
    if (savedSocialLinks) setSocialLinks(JSON.parse(savedSocialLinks));

    const savedMessages = localStorage.getItem("portfolio_messages");
    if (savedMessages) setMessages(JSON.parse(savedMessages));
  }, []);

  // Save to localStorage helpers
  const saveToStorage = (key: string, data: unknown) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem("admin_authenticated", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("admin_authenticated");
  };

  const updateProfile = (newProfile: Profile) => {
    setProfile(newProfile);
    saveToStorage("portfolio_profile", newProfile);
  };

  const addEducation = (edu: Education) => {
    const updated = [...education, edu];
    setEducation(updated);
    saveToStorage("portfolio_education", updated);
  };

  const updateEducation = (id: string, edu: Education) => {
    const updated = education.map((e) => (e.id === id ? edu : e));
    setEducation(updated);
    saveToStorage("portfolio_education", updated);
  };

  const deleteEducation = (id: string) => {
    const updated = education.filter((e) => e.id !== id);
    setEducation(updated);
    saveToStorage("portfolio_education", updated);
  };

  const addSkill = (skill: Skill) => {
    const updated = [...skills, skill];
    setSkills(updated);
    saveToStorage("portfolio_skills", updated);
  };

  const updateSkill = (id: string, skill: Skill) => {
    const updated = skills.map((s) => (s.id === id ? skill : s));
    setSkills(updated);
    saveToStorage("portfolio_skills", updated);
  };

  const deleteSkill = (id: string) => {
    const updated = skills.filter((s) => s.id !== id);
    setSkills(updated);
    saveToStorage("portfolio_skills", updated);
  };

  const addProject = (project: Project) => {
    const updated = [...projects, project];
    setProjects(updated);
    saveToStorage("portfolio_projects", updated);
  };

  const updateProject = (id: string, project: Project) => {
    const updated = projects.map((p) => (p.id === id ? project : p));
    setProjects(updated);
    saveToStorage("portfolio_projects", updated);
  };

  const deleteProject = (id: string) => {
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    saveToStorage("portfolio_projects", updated);
  };

  const addExperience = (exp: Experience) => {
    const updated = [...experiences, exp];
    setExperiences(updated);
    saveToStorage("portfolio_experiences", updated);
  };

  const updateExperience = (id: string, exp: Experience) => {
    const updated = experiences.map((e) => (e.id === id ? exp : e));
    setExperiences(updated);
    saveToStorage("portfolio_experiences", updated);
  };

  const deleteExperience = (id: string) => {
    const updated = experiences.filter((e) => e.id !== id);
    setExperiences(updated);
    saveToStorage("portfolio_experiences", updated);
  };

  const addSocialLink = (link: SocialLink) => {
    const updated = [...socialLinks, link];
    setSocialLinks(updated);
    saveToStorage("portfolio_socialLinks", updated);
  };

  const updateSocialLink = (id: string, link: SocialLink) => {
    const updated = socialLinks.map((l) => (l.id === id ? link : l));
    setSocialLinks(updated);
    saveToStorage("portfolio_socialLinks", updated);
  };

  const deleteSocialLink = (id: string) => {
    const updated = socialLinks.filter((l) => l.id !== id);
    setSocialLinks(updated);
    saveToStorage("portfolio_socialLinks", updated);
  };

  const markMessageAsRead = (id: string) => {
    const updated = messages.map((m) => (m.id === id ? { ...m, read: true } : m));
    setMessages(updated);
    saveToStorage("portfolio_messages", updated);
  };

  const deleteMessage = (id: string) => {
    const updated = messages.filter((m) => m.id !== id);
    setMessages(updated);
    saveToStorage("portfolio_messages", updated);
  };

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        profile,
        education,
        skills,
        projects,
        experiences,
        socialLinks,
        messages,
        updateProfile,
        addEducation,
        updateEducation,
        deleteEducation,
        addSkill,
        updateSkill,
        deleteSkill,
        addProject,
        updateProject,
        deleteProject,
        addExperience,
        updateExperience,
        deleteExperience,
        addSocialLink,
        updateSocialLink,
        deleteSocialLink,
        markMessageAsRead,
        deleteMessage,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};
