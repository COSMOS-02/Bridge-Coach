import crypto from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { sql } from "@vercel/postgres";
import type { AssessmentResult, CountryCode, Currency, UserProfile } from "./types";
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

function isDatabaseConfigured() {
  return Boolean(process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING);
}

async function ensureDatabaseSchema(): Promise<boolean> {
  if (!isDatabaseConfigured()) return false;

  try {
    await sql`CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      life_stage TEXT NOT NULL,
      country TEXT NOT NULL,
      currency TEXT NOT NULL,
      created_at TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      password_salt TEXT NOT NULL,
      password_version INTEGER NOT NULL DEFAULT 1
    );`;

    await sql`CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      expires_at TEXT NOT NULL
    );`;

    await sql`CREATE TABLE IF NOT EXISTS assessments (
      user_id TEXT PRIMARY KEY,
      result JSONB NOT NULL,
      updated_at TEXT NOT NULL
    );`;

    return true;
  } catch {
    return false;
  }
}

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

function mapDbUser(row: Record<string, unknown>): StoredUser {
  return {
    id: String(row.id),
    name: String(row.name),
    email: String(row.email),
    lifeStage: String(row.life_stage) as UserProfile["lifeStage"],
    country: String(row.country) as UserProfile["country"],
    currency: String(row.currency) as UserProfile["currency"],
    createdAt: String(row.created_at),
    passwordHash: String(row.password_hash),
    passwordSalt: String(row.password_salt),
    passwordVersion: Number(row.password_version),
  };
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

  const databaseReady = await ensureDatabaseSchema();
  if (databaseReady) {
    try {
      const existing = await sql`SELECT id FROM users WHERE email = ${email}`;
      if (existing.rows.length > 0) {
        return { ok: false, error: "An account with this email already exists. Try logging in." };
      }

      const salt = createSalt();
      const passwordHash = hashPassword(input.password, salt);
      const userId = crypto.randomUUID();
      await sql`
        INSERT INTO users (id, name, email, life_stage, country, currency, created_at, password_hash, password_salt, password_version)
        VALUES (${userId}, ${name}, ${email}, ${input.lifeStage}, ${input.country}, ${countryToCurrency(input.country)}, ${new Date().toISOString()}, ${passwordHash}, ${salt}, 1)
      `;
      return {
        ok: true,
        user: {
          id: userId,
          name,
          email,
          lifeStage: input.lifeStage,
          country: input.country,
          currency: countryToCurrency(input.country),
          createdAt: new Date().toISOString(),
        },
      };
    } catch {
      // Fall back to the local file store if the database write fails.
    }
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
  const databaseReady = await ensureDatabaseSchema();
  if (databaseReady) {
    try {
      const result = await sql`SELECT * FROM users WHERE email = ${normalized}`;
      const match = result.rows[0];
      if (!match) {
        return { ok: false, error: "Invalid email or password." };
      }
      const stored = mapDbUser(match as Record<string, unknown>);
      const expectedHash = hashPassword(password, stored.passwordSalt);
      if (expectedHash !== stored.passwordHash) {
        return { ok: false, error: "Invalid email or password." };
      }
      return { ok: true, user: toPublicUser(stored) };
    } catch {
      // Fall back to file-based verification if needed.
    }
  }

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
  const databaseReady = await ensureDatabaseSchema();
  if (databaseReady) {
    try {
      const sessionId = crypto.randomUUID();
      const expiresAt = new Date(Date.now() + SESSION_TTL_MS).toISOString();
      await sql`INSERT INTO sessions (id, user_id, expires_at) VALUES (${sessionId}, ${userId}, ${expiresAt})`;
      return sessionId;
    } catch {
      // Fall back to the local file store if needed.
    }
  }

  const store = await readStore();
  const sessionId = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS).toISOString();
  store.sessions.push({ id: sessionId, userId, expiresAt });
  await writeStore(store);
  return sessionId;
}

export async function getSessionUser(sessionId: string | undefined): Promise<UserProfile | null> {
  if (!sessionId) return null;
  const databaseReady = await ensureDatabaseSchema();
  if (databaseReady) {
    try {
      const sessionResult = await sql`SELECT * FROM sessions WHERE id = ${sessionId}`;
      const session = sessionResult.rows[0] as { id: string; user_id: string; expires_at: string } | undefined;
      if (!session) return null;
      if (new Date(session.expires_at).getTime() <= Date.now()) {
        await sql`DELETE FROM sessions WHERE id = ${sessionId}`;
        return null;
      }
      const userResult = await sql`SELECT * FROM users WHERE id = ${session.user_id}`;
      const user = userResult.rows[0];
      return user ? toPublicUser(mapDbUser(user as Record<string, unknown>)) : null;
    } catch {
      // Fall back to file-based lookup if needed.
    }
  }

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
  const databaseReady = await ensureDatabaseSchema();
  if (databaseReady) {
    try {
      await sql`DELETE FROM sessions WHERE id = ${sessionId}`;
      return;
    } catch {
      // Fall back to file store.
    }
  }

  const store = await readStore();
  store.sessions = store.sessions.filter((entry) => entry.id !== sessionId);
  await writeStore(store);
}

export async function updateStoredUserProfile(
  userId: string,
  updates: Partial<Pick<UserProfile, "lifeStage" | "country" | "currency">>,
): Promise<UserProfile | null> {
  const databaseReady = await ensureDatabaseSchema();
  if (databaseReady) {
    try {
      const currentUser = await sql`SELECT * FROM users WHERE id = ${userId}`;
      const existing = currentUser.rows[0];
      if (!existing) return null;

      const nextCountry = updates.country ?? String(existing.country);
      const nextCurrency = updates.currency ?? countryToCurrency(nextCountry as CountryCode);
      const nextLifeStage = updates.lifeStage ?? String(existing.life_stage);

      await sql`
        UPDATE users
        SET life_stage = ${nextLifeStage}, country = ${nextCountry}, currency = ${nextCurrency}
        WHERE id = ${userId}
      `;

      return {
        id: String(existing.id),
        name: String(existing.name),
        email: String(existing.email),
        lifeStage: nextLifeStage as UserProfile["lifeStage"],
        country: nextCountry as UserProfile["country"],
        currency: nextCurrency as UserProfile["currency"],
        createdAt: String(existing.created_at),
      };
    } catch {
      // Fall back to file-based update if needed.
    }
  }

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
  const databaseReady = await ensureDatabaseSchema();
  if (databaseReady) {
    try {
      if (!result) {
        const existing = await sql`SELECT result FROM assessments WHERE user_id = ${userId}`;
        const value = existing.rows[0]?.result;
        return value ? (value as AssessmentResult) : null;
      }

      await sql`
        INSERT INTO assessments (user_id, result, updated_at)
        VALUES (${userId}, ${JSON.stringify(result)}, ${new Date().toISOString()})
        ON CONFLICT (user_id) DO UPDATE SET result = EXCLUDED.result, updated_at = EXCLUDED.updated_at
      `;
      return result;
    } catch {
      // Fall back to file-based persistence if needed.
    }
  }

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
