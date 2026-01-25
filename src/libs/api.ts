import {
    ApiResponse,
    LoginResponse,
    Profile,
    Education,
    Skill,
    Experience,
    Project,
    Certification,
    SocialLink,
    ContactMessageRequest,
    ContactMessage,
} from "@/types";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Helper to handle fetch responses and throw errors for non-2xx codes
 */
async function handleResponse<T>(res: Response): Promise<T> {
    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`API Error ${res.status}: ${errorText || res.statusText}`);
    }
    return res.json();
}


/* =========================
   AUTH
========================= */

export async function login(
  username: string,
  password: string
): Promise<LoginResponse> {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const json: ApiResponse<LoginResponse> = await handleResponse(res);
  return json.data;
}


/* =========================
   PROFILE
========================= */
export async function fetchProfile(): Promise<Profile | null> {
    const res = await fetch(`${BASE_URL}/profiles`);
    const json: ApiResponse<Profile[]> = await handleResponse(res);
    
    // Returns the first profile from the array, or null if empty
    return json.data && json.data.length > 0 ? json.data[0] : null;
}

/* =========================
   EDUCATION
========================= */
export async function fetchEducations(): Promise<Education[]> {
    const res = await fetch(`${BASE_URL}/educations`);
    const json: ApiResponse<Education[]> = await handleResponse(res);
    return json.data || [];
}

/* =========================
   SKILLS
========================= */
export async function fetchSkills(): Promise<Skill[]> {
    const res = await fetch(`${BASE_URL}/skills`);
    const json: ApiResponse<Skill[]> = await handleResponse(res);
    return json.data || [];
}

/* =========================
   PROJECTS
========================= */
export async function fetchProjects(): Promise<Project[]> {
    const res = await fetch(`${BASE_URL}/projects`);
    const json: ApiResponse<Project[]> = await handleResponse(res);
    return json.data || [];
}

export async function fetchProjectById(id: number): Promise<Project | null> {
    const res = await fetch(`${BASE_URL}/projects/${id}`);
    const json: ApiResponse<Project | Project[]> = await handleResponse(res);
    
    // Some APIs return a single object for "by ID", others return an array with one item.
    // This handles both cases:
    if (Array.isArray(json.data)) {
        return json.data.length > 0 ? json.data[0] : null;
    }
    return json.data;
}

/* =========================
   EXPERIENCE
========================= */
export async function fetchExperiences(): Promise<Experience[]> {
    const res = await fetch(`${BASE_URL}/experiences`);
    const json: ApiResponse<Experience[]> = await handleResponse(res);
    return json.data || [];
}

/* =========================
   CERTIFICATIONS
========================= */
export async function fetchCertifications(): Promise<Certification[]> {
    const res = await fetch(`${BASE_URL}/certifications`);
    const json: ApiResponse<Certification[]> = await handleResponse(res);
    return json.data || [];
}

/* =========================
   SOCIAL LINKS
========================= */
export async function fetchSocialLinks(): Promise<SocialLink[]> {
    const res = await fetch(`${BASE_URL}/social-links`);
    const json: ApiResponse<SocialLink[]> = await handleResponse(res);
    return json.data || [];
}

/* =========================
   CONTACT MESSAGE
========================= */
export async function fetchContacts(): Promise<ContactMessage[]> {
    const res = await fetch(`${BASE_URL}/contact`);
    const json: ApiResponse<ContactMessage[]> = await handleResponse(res);
    return json.data || [];
}

/* =========================
   CONTACT
========================= */
export async function sendContactMessage(
    payload: ContactMessageRequest
): Promise<void> {
    const res = await fetch(`${BASE_URL}/contact/send`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    await handleResponse(res);
}

/* =========================
   AUTHENTICATED FETCH
========================= */

/**
 * Wrapper for fetch that includes auth token in headers
 */
export function authFetch(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem("auth_token");

  return fetch(url, {
    ...options,
    headers: {
      ...(options.headers),
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}
