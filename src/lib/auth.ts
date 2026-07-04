import type { CountryCode, Currency, UserLifeStage, UserProfile } from "./types";
import { normalizeEmail, validatePassword } from "./security";

export const STORAGE_KEY = "bridge-coach-assessment-result";

export const LIFE_STAGES: {
  value: UserLifeStage;
  label: string;
  description: string;
}[] = [
  {
    value: "school-kid",
    label: "School kid",
    description: "Class 8–10 — exploring streams and early direction",
  },
  {
    value: "class-12",
    label: "Class 12",
    description: "Board exams + choosing degree or career next step",
  },
  {
    value: "college",
    label: "College student",
    description: "Degree in progress — internships, placements, specialisation",
  },
  {
    value: "dropout",
    label: "Dropout / gap year",
    description: "Paused formal education — rebuilding path with skills",
  },
  {
    value: "job-seeker",
    label: "Job seeker",
    description: "Actively looking for first or next role",
  },
  {
    value: "interview-prep",
    label: "Interview preparation",
    description: "Focused on cracking upcoming interviews",
  },
  {
    value: "employed",
    label: "Employed",
    description: "Working now — growth, switch, or higher earning goals",
  },
];

export const COUNTRIES: {
  value: CountryCode;
  label: string;
  currency: Currency;
  flag: string;
}[] = [
  { value: "IN", label: "India", currency: "INR", flag: "🇮🇳" },
  { value: "US", label: "United States", currency: "USD", flag: "🇺🇸" },
  { value: "GB", label: "United Kingdom", currency: "GBP", flag: "🇬🇧" },
  { value: "CA", label: "Canada", currency: "CAD", flag: "🇨🇦" },
  { value: "AU", label: "Australia", currency: "AUD", flag: "🇦🇺" },
  { value: "SG", label: "Singapore", currency: "SGD", flag: "🇸🇬" },
  { value: "AE", label: "United Arab Emirates", currency: "AED", flag: "🇦🇪" },
  { value: "DE", label: "Germany", currency: "EUR", flag: "🇩🇪" },
  { value: "FR", label: "France", currency: "EUR", flag: "🇫🇷" },
  { value: "NL", label: "Netherlands", currency: "EUR", flag: "🇳🇱" },
  { value: "SE", label: "Sweden", currency: "EUR", flag: "🇸🇪" },
  { value: "NZ", label: "New Zealand", currency: "AUD", flag: "🇳🇿" },
  { value: "ZA", label: "South Africa", currency: "USD", flag: "🇿🇦" },
  { value: "OTHER", label: "Other country", currency: "USD", flag: "🌍" },
];

export function countryToCurrency(country: CountryCode): Currency {
  const match = COUNTRIES.find((c) => c.value === country);
  return match?.currency ?? "USD";
}

export function lifeStageLabel(stage: UserLifeStage): string {
  return LIFE_STAGES.find((s) => s.value === stage)?.label ?? stage;
}

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
  lifeStage: UserLifeStage;
  country: CountryCode;
};

type AuthResponse = { ok: true; user: UserProfile } | { ok: false; error: string };

type MeResponse = { ok: true; user: UserProfile | null } | { ok: false; error: string };

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    ...init,
  });
  const data = (await response.json().catch(() => ({}))) as T & { error?: string };
  if (!response.ok) {
    throw new Error((data as { error?: string }).error ?? "Request failed");
  }
  return data;
}

export async function getSessionUser(): Promise<UserProfile | null> {
  try {
    const response = await requestJson<MeResponse>("/api/auth/me", { method: "GET" });
    return response.ok ? response.user : null;
  } catch {
    return null;
  }
}

export async function registerUser(input: RegisterInput): Promise<AuthResponse> {
  const email = normalizeEmail(input.email);
  const name = input.name.trim();

  if (!name || name.length < 2) {
    return { ok: false, error: "Please enter your full name." };
  }
  if (!email.includes("@")) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  const passwordCheck = validatePassword(input.password);
  if (!passwordCheck.ok) {
    return { ok: false, error: passwordCheck.error ?? "Password is invalid." };
  }

  try {
    return await requestJson<AuthResponse>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(input),
    });
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Registration failed." };
  }
}

export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  try {
    return await requestJson<AuthResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Login failed." };
  }
}

export async function logoutUser(): Promise<void> {
  try {
    await requestJson<{ ok: true }>("/api/auth/logout", { method: "POST" });
  } catch {
    // Ignore logout errors and clear client state.
  }
}

export async function updateUserProfile(
  updates: Partial<Pick<UserProfile, "lifeStage" | "country" | "currency">>,
): Promise<UserProfile | null> {
  try {
    const response = await requestJson<AuthResponse>("/api/auth/update-profile", {
      method: "POST",
      body: JSON.stringify(updates),
    });
    return response.ok ? response.user : null;
  } catch {
    return null;
  }
}
