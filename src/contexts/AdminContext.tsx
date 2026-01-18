import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from "react";
import * as adminApi from "@/libs/adminApi";
import { Profile, Education, Skill, Project, Experience, SocialLink, ContactMessage, ContactMessageRequest } from "@/types";

interface AdminContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  profile: Profile | null;
  education: Education[];
  skills: Skill[];
  projects: Project[];
  experiences: Experience[];
  socialLinks: SocialLink[];
  messages: ContactMessage[];
  refreshData: () => Promise<void>;

  // CRUD
  addProfile: (profile: Profile) => Promise<void>;
  updateProfile: (profile: Profile) => Promise<void>;
  deleteProfile: () => Promise<void>;

  addEducation: (edu: Education) => Promise<void>;
  updateEducation: (edu: Education) => Promise<void>;
  deleteEducation: (eduId: string) => Promise<void>;

  addExperience: (exp: Experience) => Promise<void>;
  updateExperience: (exp: Experience) => Promise<void>;
  deleteExperience: (expId: string) => Promise<void>;

  addProject: (proj: Project) => Promise<void>;
  updateProject: (proj: Project) => Promise<void>;
  deleteProject: (projId: string) => Promise<void>;

  addSkill: (skill: Skill) => Promise<void>;
  updateSkill: (skill: Skill) => Promise<void>;
  deleteSkill: (skillId: string) => Promise<void>;

  addSocialLink: (link: SocialLink) => Promise<void>;
  updateSocialLink: (link: SocialLink) => Promise<void>;
  deleteSocialLink: (linkPlatform: string) => Promise<void>;

  sendMessage: (msg: ContactMessageRequest) => Promise<void>;
  deleteMessage: (msgId: string) => Promise<void>;
  markMessageAsRead: (msgId: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [education, setEducation] = useState<Education[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  // ---------------- LOGIN ----------------
  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const { token, user } = await adminApi.login(username, password);
      if (user.role !== "ADMIN") return false;

      localStorage.setItem("auth_token", token);
      localStorage.setItem("auth_user", JSON.stringify(user));

      await refreshData();
      setIsAuthenticated(true);
      return true;
    } catch (err) {
      console.error("Login failed:", err);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    setIsAuthenticated(false);

    setProfile(null);
    setEducation([]);
    setSkills([]);
    setProjects([]);
    setExperiences([]);
    setSocialLinks([]);
    setMessages([]);
  };

  // ---------------- REFRESH DATA ----------------
  const refreshData = async () => {
    const token = localStorage.getItem("auth_token");
    if (!token) return;

    try {
      const [p, ed, sk, pr, ex, sl, msg] = await Promise.all([
        adminApi.getProfile(),
        adminApi.getEducations(),
        adminApi.getSkills(),
        adminApi.getProjects(),
        adminApi.getExperiences(),
        adminApi.getSocialLinks(),
        adminApi.getMessages(),
      ]);

      setProfile(p);
      setEducation(ed);
      setSkills(sk);
      setProjects(pr);
      setExperiences(ex);
      setSocialLinks(sl);
      setMessages(msg);
    } catch (err) {
      console.error("Failed to refresh admin data", err);
      logout();
    }
  };

  // ---------------- AUTO LOGIN ----------------
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const userStr = localStorage.getItem("auth_user");
    if (!token || !userStr) return;

    const user = JSON.parse(userStr);
    if (user.role === "ADMIN") {
      setIsAuthenticated(true);
      refreshData();
    }
  }, []);

  // ---------------- PROFILE CRUD ----------------
  const addProfile = async (profile: Profile) => {
    const created = await adminApi.createProfile(profile);
    setProfile(created);
  };

  const updateProfile = async (profile: Profile) => {
    if (!profile.id) throw new Error("Profile must have an ID to update");
    const updated = await adminApi.updateProfile(profile);
    setProfile(updated);
  };

  const deleteProfile = async () => {
    if (!profile?.id) throw new Error("No profile to delete");
    await adminApi.deleteProfile(profile.id);
    setProfile(null);
  }

  // ---------------- EDUCATION CRUD ----------------
  const addEducation = async (edu: Education) => {
    const created = await adminApi.createEducation(edu);
    setEducation((prev) => [...prev, created]);
  };

  const updateEducation = async (edu: Education) => {
    if (!edu.id) throw new Error("Education must have an ID to update");
    const updated = await adminApi.updateEducation(edu.id, edu);
    setEducation((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
  };

  const deleteEducation = async (eduId: string) => {
    await adminApi.deleteEducation(eduId);
    setEducation((prev) => prev.filter((e) => e.id !== eduId));
  };

  // ---------------- EXPERIENCE CRUD ----------------
  const addExperience = async (exp: Experience) => {
    const created = await adminApi.createExperience(exp);
    setExperiences((prev) => [...prev, created]);
  };

  const updateExperience = async (exp: Experience) => {
    if (!exp.id) throw new Error("Experience must have an ID to update");
    const updated = await adminApi.updateExperience(exp.id, exp);
    setExperiences((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
  };

  const deleteExperience = async (expId: string) => {
    await adminApi.deleteExperience(expId);
    setExperiences((prev) => prev.filter((e) => e.id !== expId));
  };

  // ---------------- PROJECT CRUD ----------------
  const addProject = async (proj: Project) => {
    const created = await adminApi.createProject(proj);
    setProjects((prev) => [...prev, created]);
  };

  const updateProject = async (proj: Project) => {
    if (!proj.id) throw new Error("Project must have an ID to update");
    const updated = await adminApi.updateProject(proj.id, proj);
    setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const deleteProject = async (projId: string) => {
    await adminApi.deleteProject(projId);
    setProjects((prev) => prev.filter((p) => p.id !== projId));
  };

  // ---------------- SKILL CRUD ----------------
  const addSkill = async (skill: Skill) => {
    const created = await adminApi.createSkill(skill);
    setSkills((prev) => [...prev, created]);
  };

  const updateSkill = async (skill: Skill) => {
    if (!skill.id) throw new Error("Skill must have an ID to update");
    const updated = await adminApi.updateSkill(skill.id, skill);
    setSkills((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
  };

  const deleteSkill = async (skillId: string) => {
    await adminApi.deleteSkill(skillId);
    setSkills((prev) => prev.filter((s) => s.id !== skillId));
  };

  // ---------------- SOCIAL LINK CRUD ----------------
  const addSocialLink = async (link: SocialLink) => {
    const created = await adminApi.createSocialLink(link);
    setSocialLinks((prev) => [...prev, created]);
  };

  const updateSocialLink = async (link: SocialLink) => {
    const updated = await adminApi.updateSocialLink(link.platform, link);
    setSocialLinks((prev) =>
      prev.map((s) => (s.platform === updated.platform ? updated : s))
    );
  };

  const deleteSocialLink = async (linkPlatform: string) => {
    await adminApi.deleteSocialLink(linkPlatform);
    setSocialLinks((prev) => prev.filter((s) => s.platform !== linkPlatform));
  };

  // ---------------- CONTACT MESSAGE ----------------
  const sendMessage = async (msg: ContactMessageRequest) => {
    await adminApi.sendContactMessage(msg);
  }

  const deleteMessage = async (msgId: string) => {
    await adminApi.deleteMessage(msgId);
    setMessages((prev) => prev.filter((m) => m.id !== msgId));
  };

  const markMessageAsRead = (msgId: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === msgId ? { ...m, read: true } : m))
    );
  };

  const contextValue = useMemo(
    () => ({
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
      refreshData,
      addProfile,
      updateProfile,
      deleteProfile,
      addEducation,
      updateEducation,
      deleteEducation,
      addExperience,
      updateExperience,
      deleteExperience,
      addProject,
      updateProject,
      deleteProject,
      addSkill,
      updateSkill,
      deleteSkill,
      addSocialLink,
      updateSocialLink,
      deleteSocialLink,
      sendMessage,
      deleteMessage,
      markMessageAsRead,
    }),
    [
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
      refreshData,
      addProfile,
      updateProfile,
      deleteProfile,
      addEducation,
      updateEducation,
      deleteEducation,
      addExperience,
      updateExperience,
      deleteExperience,
      addProject,
      updateProject,
      deleteProject,
      addSkill,
      updateSkill,
      deleteSkill,
      addSocialLink,
      updateSocialLink,
      deleteSocialLink,
      sendMessage,
      deleteMessage,
      markMessageAsRead,
    ]
  );

  return (
    <AdminContext.Provider
      value={contextValue}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin must be used within an AdminProvider");
  return context;
};
