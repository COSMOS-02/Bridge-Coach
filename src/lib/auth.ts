import type { CountryCode, Currency, UserLifeStage, UserProfile } from "./types";

export const SESSION_KEY = "bridge-coach-session";
export const USERS_KEY = "bridge-coach-users";
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

type StoredUser = UserProfile & { password: string };

function readUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as StoredUser[]) : [];
  } catch {
    return [];
  }
}

function writeUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getSessionUser(): UserProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as UserProfile) : null;
  } catch {
    return null;
  }
}

export function setSessionUser(user: UserProfile | null) {
  if (user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
}

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
  lifeStage: UserLifeStage;
  country: CountryCode;
};

export function registerUser(input: RegisterInput): { ok: true; user: UserProfile } | { ok: false; error: string } {
  const email = input.email.trim().toLowerCase();
  const name = input.name.trim();

  if (!name || name.length < 2) {
    return { ok: false, error: "Please enter your full name." };
  }
  if (!email.includes("@")) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  if (input.password.length < 6) {
    return { ok: false, error: "Password must be at least 6 characters." };
  }

  const users = readUsers();
  if (users.some((u) => u.email === email)) {
    return { ok: false, error: "An account with this email already exists. Try logging in." };
  }

  const user: StoredUser = {
    id: crypto.randomUUID(),
    name,
    email,
    password: input.password,
    lifeStage: input.lifeStage,
    country: input.country,
    currency: countryToCurrency(input.country),
    createdAt: new Date().toISOString(),
  };

  writeUsers([...users, user]);
  const { password: _, ...profile } = user;
  setSessionUser(profile);
  return { ok: true, user: profile };
}

export function loginUser(
  email: string,
  password: string,
): { ok: true; user: UserProfile } | { ok: false; error: string } {
  const normalized = email.trim().toLowerCase();
  const users = readUsers();
  const match = users.find((u) => u.email === normalized && u.password === password);

  if (!match) {
    return { ok: false, error: "Invalid email or password." };
  }

  const { password: _, ...profile } = match;
  setSessionUser(profile);
  return { ok: true, user: profile };
}

export function logoutUser() {
  setSessionUser(null);
}

export function updateUserProfile(
  updates: Partial<Pick<UserProfile, "lifeStage" | "country" | "currency">>,
): UserProfile | null {
  const current = getSessionUser();
  if (!current) return null;

  const users = readUsers();
  const index = users.findIndex((u) => u.id === current.id);
  if (index === -1) return null;

  const nextCountry = updates.country ?? current.country;
  const next: StoredUser = {
    ...users[index],
    ...updates,
    country: nextCountry,
    currency: updates.currency ?? countryToCurrency(nextCountry),
  };

  users[index] = next;
  writeUsers(users);
  const { password: _, ...profile } = next;
  setSessionUser(profile);
  return profile;
}
