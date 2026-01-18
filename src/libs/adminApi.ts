import {
  ApiResponse,
  Profile,
  Skill,
  Project,
  Education,
  Experience,
  SocialLink,
  ContactMessage,
  ContactMessageRequest,
} from "@/types";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

// Generic response handler
async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API Error ${res.status}: ${text || res.statusText}`);
  }
  return res.json();
}

// Get JWT from localStorage
function authHeaders() {
  const token = localStorage.getItem("auth_token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export interface LoginResponse {
  token: string;
  user: {
    username: string;
    role: string;
    email: string;
  };
}

export async function login(username: string, password: string): Promise<LoginResponse> {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    throw new Error("Invalid credentials");
  }

  const json: ApiResponse<LoginResponse> = await res.json();
  return json.data;
}

/* ================= PROFILE ================= */
export async function getProfile(): Promise<Profile | null> {
  const res = await fetch(`${BASE_URL}/profiles`, { headers: authHeaders() });
  const json: ApiResponse<Profile[]> = await handleResponse(res);
  return json.data?.[0] ?? null;
}

export async function createProfile(profile: Profile): Promise<Profile> {
  const res = await fetch(`${BASE_URL}/profiles/create`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(profile),
  });
  const json: ApiResponse<Profile> = await handleResponse(res);
  return json.data;
}

export async function updateProfile(profile: Profile): Promise<Profile> {
  const res = await fetch(`${BASE_URL}/profiles/update/${profile.id}`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(profile),
  });
  const json: ApiResponse<Profile> = await handleResponse(res);
  return json.data;
}

export async function deleteProfile(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/profiles/delete/${id}`, {
    method: "POST",
    headers: authHeaders(),
  });
  await handleResponse(res);
}

/* ================= SKILLS ================= */
export async function getSkills(): Promise<Skill[]> {
  const res = await fetch(`${BASE_URL}/skills`, { headers: authHeaders() });
  const json: ApiResponse<Skill[]> = await handleResponse(res);
  return json.data ?? [];
}

export async function createSkill(skill: Skill): Promise<Skill> {
  const res = await fetch(`${BASE_URL}/skills/create`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(skill),
  });
  const json: ApiResponse<Skill> = await handleResponse(res);
  return json.data;
}

export async function updateSkill(id: string | number, skill: Skill): Promise<Skill> {
  const res = await fetch(`${BASE_URL}/skills/update/${id}`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(skill),
  });
  const json: ApiResponse<Skill> = await handleResponse(res);
  return json.data;
}

export async function deleteSkill(id: string | number): Promise<void> {
  const res = await fetch(`${BASE_URL}/skills/delete/${id}`, {
    method: "POST",
    headers: authHeaders(),
  });
  await handleResponse(res);
}

/* ================= EDUCATION ================= */
export async function getEducations(): Promise<Education[]> {
  const res = await fetch(`${BASE_URL}/educations`, { headers: authHeaders() });
  const json: ApiResponse<Education[]> = await handleResponse(res);
  return json.data ?? [];
}

export async function createEducation(edu: Education): Promise<Education> {
  const res = await fetch(`${BASE_URL}/educations/create`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(edu),
  });
  const json: ApiResponse<Education> = await handleResponse(res);
  return json.data;
}

export async function updateEducation(id: string | number, edu: Education): Promise<Education> {
  const res = await fetch(`${BASE_URL}/educations/update/${id}`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(edu),
  });
  const json: ApiResponse<Education> = await handleResponse(res);
  return json.data;
}

export async function deleteEducation(id: string | number): Promise<void> {
  const res = await fetch(`${BASE_URL}/educations/delete/${id}`, {
    method: "POST",
    headers: authHeaders(),
  });
  await handleResponse(res);
}

/* ================= PROJECTS ================= */
export async function getProjects(): Promise<Project[]> {
  const res = await fetch(`${BASE_URL}/projects`, { headers: authHeaders() });
  const json: ApiResponse<Project[]> = await handleResponse(res);
  return json.data ?? [];
}

export async function createProject(project: Project): Promise<Project> {
  const res = await fetch(`${BASE_URL}/projects/create`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(project),
  });
  const json: ApiResponse<Project> = await handleResponse(res);
  return json.data;
}

export async function updateProject(id: string | number, project: Project): Promise<Project> {
  const res = await fetch(`${BASE_URL}/projects/update/${id}`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(project),
  });
  const json: ApiResponse<Project> = await handleResponse(res);
  return json.data;
}

export async function deleteProject(id: string | number): Promise<void> {
  const res = await fetch(`${BASE_URL}/projects/delete/${id}`, {
    method: "POST",
    headers: authHeaders(),
  });
  await handleResponse(res);
}

/* ================= EXPERIENCE ================= */
export async function getExperiences(): Promise<Experience[]> {
  const res = await fetch(`${BASE_URL}/experiences`, { headers: authHeaders() });
  const json: ApiResponse<Experience[]> = await handleResponse(res);
  return json.data ?? [];
}

export async function createExperience(exp: Experience): Promise<Experience> {
  const res = await fetch(`${BASE_URL}/experiences/create`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(exp),
  });
  const json: ApiResponse<Experience> = await handleResponse(res);
  return json.data;
}

export async function updateExperience(id: string | number, exp: Experience): Promise<Experience> {
  const res = await fetch(`${BASE_URL}/experiences/update/${id}`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(exp),
  });
  const json: ApiResponse<Experience> = await handleResponse(res);
  return json.data;
}

export async function deleteExperience(id: string | number): Promise<void> {
  const res = await fetch(`${BASE_URL}/experiences/delete/${id}`, {
    method: "POST",
    headers: authHeaders(),
  });
  await handleResponse(res);
}

/* ================= SOCIAL LINKS ================= */
export async function getSocialLinks(): Promise<SocialLink[]> {
  const res = await fetch(`${BASE_URL}/social-links`, { headers: authHeaders() });
  const json: ApiResponse<SocialLink[]> = await handleResponse(res);
  return json.data ?? [];
}

export async function createSocialLink(link: SocialLink): Promise<SocialLink> {
  const res = await fetch(`${BASE_URL}/social-links/create`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(link),
  });
  const json: ApiResponse<SocialLink> = await handleResponse(res);
  return json.data;
}

export async function updateSocialLink(platform: string, link: SocialLink): Promise<SocialLink> {
  const res = await fetch(`${BASE_URL}/social-links/update/${platform}`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(link),
  });
  const json: ApiResponse<SocialLink> = await handleResponse(res);
  return json.data;
}

export async function deleteSocialLink(platform: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/social-links/delete/${platform}`, {
    method: "POST",
    headers: authHeaders(),
  });
  await handleResponse(res);
}

/* ================= CONTACT MESSAGES ================= */
export async function sendContactMessage(
  payload: ContactMessageRequest
): Promise<void> {
  const res = await fetch(`${BASE_URL}/contact/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  await handleResponse(res);
}

export async function getMessages(): Promise<ContactMessage[]> {
  const res = await fetch(`${BASE_URL}/contact`, { headers: authHeaders() });
  const json: ApiResponse<ContactMessage[]> = await handleResponse(res);
  return json.data ?? [];
}

export async function deleteMessage(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/contact/delete/${id}`, {
    method: "POST",
    headers: authHeaders(),
  });
  await handleResponse(res);
}
