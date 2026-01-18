export interface ApiResponse<T> {
    message: string;
    code: number;
    data: T;
}

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  role: "ADMIN" | "USER";
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}

export interface Profile {
    id: number;
    fullName: string;
    title: string;
    shortIntro: string;
    biography: string;
    careerObjective: string;
    profileImageUrl: string;
    email: string;
    phone: string;
    location: string;
}

export interface Education {
    id: string;
    institutionName: string;
    degree: string;
    fieldOfStudy: string;
    startYear: string;
    endYear: string;
    description: string;
}

export interface Skill {
    id: string;
    name: string;
    category: "TECHNICAL" | "SOFT" | "FRAMEWORK";
    level: number; // 0 - 100
}

export interface Experience {
    id: string;
    role: string;
    company: string;
    startDate: string;
    endDate: string;
    type: "INTERNSHIP" | "JOB" | "VOLUNTEER";
    description: string;
}

export interface Certification {
    id: string;
    name: string;
    issuer: string;
    year: string;
    credentialUrl: string;
}

export interface SocialLink {
    id: string;
    platform: string; // LinkedIn, GitHub, Facebook
    url: string;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    githubUrl?: string | null;
    demoUrl?: string | null;
    technologies: string[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  read?: boolean;
}

export interface ContactMessageRequest {
  name: string;
  email: string;
  message: string;
}
