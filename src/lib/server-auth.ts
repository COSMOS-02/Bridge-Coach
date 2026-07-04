import crypto from "crypto";
import { promises as fs } from "fs";
import path from "path";
import type { AssessmentResult, CountryCode, Currency, UserLifeStage, UserProfile } from "./types";
import type { RegisterInput } from "./auth";

type StoredUser = UserProfile & {
  passwordHash: string;
  passwordSalt: string;
  passwordVersion: number;
};

type SessionRecord = {
  id: string;
  userId: string;
  expiresAt: string;
};

type StoredAssessment = {
  userId: string;
  result: AssessmentResult;
  updatedAt: string;
};

type AuthStore = {
  users: StoredUser[];
  sessions: SessionRecord[];
  assessments: StoredAssessment[];
};

const DATA_DIR = path.join(process.cwd(), "data");
const AUTH_STORE_PATH = path.join(DATA_DIR, "auth-store.json");
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30;

async function ensureStoreFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(AUTH_STORE_PATH);
  } catch {
    const initialStore: AuthStore = { users: [], sessions: [], assessments: [] };
    await fs.writeFile(AUTH_STORE_PATH, JSON.stringify(initialStore, null, 2));
  }
}

async function readStore(): Promise<AuthStore> {
  await ensureStoreFile();
  const raw = await fs.readFile(AUTH_STORE_PATH, "utf8");
  return JSON.parse(raw) as AuthStore;
}

async function writeStore(store: AuthStore) {
  await ensureStoreFile();
  const tempPath = `${AUTH_STORE_PATH}.tmp`;
  await fs.writeFile(tempPath, JSON.stringify(store, null, 2));
  await fs.rename(tempPath, AUTH_STORE_PATH);
}

function toPublicUser(user: StoredUser): UserProfile {
  const { passwordHash, passwordSalt, passwordVersion, ...profile } = user;
  return profile;
}

function hashPassword(password: string, salt: string) {
  return crypto.pbkdf2Sync(password, salt, 120000, 32, "sha256").toString("hex");
}

function createSalt() {
  return crypto.randomBytes(16).toString("hex");
}

export async function createUser(input: RegisterInput): Promise<{ ok: true; user: UserProfile } | { ok: false; error: string }> {
  const name = input.name.trim();
  const email = input.email.trim().toLowerCase();
  if (!name || name.length < 2) {
    return { ok: false, error: "Please enter your full name." };
  }
  if (!email.includes("@")) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  if (input.password.length < 6) {
    return { ok: false, error: "Password must be at least 6 characters." };
  }

  const store = await readStore();
  if (store.users.some((u) => u.email === email)) {
    return { ok: false, error: "An account with this email already exists. Try logging in." };
  }

  const salt = createSalt();
  const passwordHash = hashPassword(input.password, salt);
  const user: StoredUser = {
    id: crypto.randomUUID(),
    name,
    email,
    lifeStage: input.lifeStage,
    country: input.country,
    currency: countryToCurrency(input.country),
    createdAt: new Date().toISOString(),
    passwordHash,
    passwordSalt: salt,
    passwordVersion: 1,
  };

  store.users.push(user);
  await writeStore(store);
  return { ok: true, user: toPublicUser(user) };
}

export async function verifyUser(email: string, password: string): Promise<{ ok: true; user: UserProfile } | { ok: false; error: string }> {
  const normalized = email.trim().toLowerCase();
  const store = await readStore();
  const match = store.users.find((u) => u.email === normalized);
  if (!match) {
    return { ok: false, error: "Invalid email or password." };
  }

  const expectedHash = hashPassword(password, match.passwordSalt);
  if (expectedHash !== match.passwordHash) {
    return { ok: false, error: "Invalid email or password." };
  }

  return { ok: true, user: toPublicUser(match) };
}

export async function createSession(userId: string): Promise<string> {
  const store = await readStore();
  const sessionId = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS).toISOString();
  store.sessions.push({ id: sessionId, userId, expiresAt });
  await writeStore(store);
  return sessionId;
}

export async function getSessionUser(sessionId: string | undefined): Promise<UserProfile | null> {
  if (!sessionId) return null;
  const store = await readStore();
  const session = store.sessions.find((entry) => entry.id === sessionId);
  if (!session) return null;
  if (new Date(session.expiresAt).getTime() <= Date.now()) {
    store.sessions = store.sessions.filter((entry) => entry.id !== sessionId);
    await writeStore(store);
    return null;
  }
  const user = store.users.find((entry) => entry.id === session.userId);
  return user ? toPublicUser(user) : null;
}

export async function removeSession(sessionId: string | undefined) {
  if (!sessionId) return;
  const store = await readStore();
  store.sessions = store.sessions.filter((entry) => entry.id !== sessionId);
  await writeStore(store);
}

export async function updateStoredUserProfile(
  userId: string,
  updates: Partial<Pick<UserProfile, "lifeStage" | "country" | "currency">>,
): Promise<UserProfile | null> {
  const store = await readStore();
  const index = store.users.findIndex((user) => user.id === userId);
  if (index === -1) return null;
  const nextCountry = updates.country ?? store.users[index].country;
  const nextUser: StoredUser = {
    ...store.users[index],
    ...updates,
    country: nextCountry,
    currency: updates.currency ?? countryToCurrency(nextCountry),
  };
  store.users[index] = nextUser;
  await writeStore(store);
  return toPublicUser(nextUser);
}

export async function saveAssessmentResult(userId: string, result: AssessmentResult | null): Promise<AssessmentResult | null> {
  const store = await readStore();
  if (!result) {
    const existing = store.assessments.find((entry) => entry.userId === userId);
    return existing?.result ?? null;
  }

  const nextAssessment: StoredAssessment = {
    userId,
    result,
    updatedAt: new Date().toISOString(),
  };

  store.assessments = store.assessments.filter((entry) => entry.userId !== userId);
  store.assessments.push(nextAssessment);
  await writeStore(store);
  return result;
}

function countryToCurrency(country: CountryCode): Currency {
  if (country === "IN") return "INR";
  if (country === "GB") return "GBP";
  if (country === "CA") return "CAD";
  if (country === "AU") return "AUD";
  if (country === "SG") return "SGD";
  if (country === "AE") return "AED";
  if (country === "DE" || country === "FR" || country === "NL" || country === "SE") return "EUR";
  if (country === "NZ") return "AUD";
  if (country === "ZA") return "USD";
  return "USD";
}
