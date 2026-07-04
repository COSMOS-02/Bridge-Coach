import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSessionUser } from "@/lib/server-auth";

export async function GET() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("bridge-coach-session")?.value;
  const user = await getSessionUser(sessionId);
  return NextResponse.json({ ok: true, user });
}
