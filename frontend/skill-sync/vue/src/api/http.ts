// src/api/http.ts
const API_BASE = 'http://localhost:3000'; // your Nest backend

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed with status ${res.status}`);
  }

  return res.json();
}

type Skill = {
  id: number;
  name: string;
  category?: string;
};

type LearningCard = {
  id: number;
  title: string;
  summary: string;
  level?: string;
};

export const api = {
  getSkills: () => request<Skill[]>('/skills'),
  getLearningCards: () => request<LearningCard[]>('/learning-cards'),
};
