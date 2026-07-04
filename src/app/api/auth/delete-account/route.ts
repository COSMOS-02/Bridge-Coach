import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { sql } from "@vercel/postgres";
import { promises as fs } from "fs";
import path from "path";
import { getSessionUser, removeSession } from "@/lib/server-auth";

const DATA_DIR = path.join(process.cwd(), "data");
const AUTH_STORE_PATH = path.join(DATA_DIR, "auth-store.json");

export async function POST() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("bridge-coach-session")?.value;
  const currentUser = await getSessionUser(sessionId);
  if (!currentUser) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    if (process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING) {
      await sql`DELETE FROM sessions WHERE user_id = ${currentUser.id}`;
      await sql`DELETE FROM assessments WHERE user_id = ${currentUser.id}`;
      await sql`DELETE FROM users WHERE id = ${currentUser.id}`;
    } else {
      const raw = await fs.readFile(AUTH_STORE_PATH, "utf8").catch(() => "{\"users\":[],\"sessions\":[],\"assessments\":[]}");
      const parsed = JSON.parse(raw);
      parsed.users = parsed.users.filter((user: { id: string }) => user.id !== currentUser.id);
      parsed.sessions = parsed.sessions.filter((session: { userId: string }) => session.userId !== currentUser.id);
      parsed.assessments = parsed.assessments.filter((entry: { userId: string }) => entry.userId !== currentUser.id);
      await fs.mkdir(DATA_DIR, { recursive: true });
      await fs.writeFile(AUTH_STORE_PATH, JSON.stringify(parsed, null, 2));
    }
  } catch {
    return NextResponse.json({ ok: false, error: "Unable to delete account right now." }, { status: 500 });
  }

  await removeSession(sessionId);
  return NextResponse.json({ ok: true });
}
