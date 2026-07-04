import { NextResponse } from "next/server";
import { createUser, createSession } from "@/lib/server-auth";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const result = await createUser(body);
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  }

  const sessionId = await createSession(result.user.id);
  const cookieStore = await cookies();
  cookieStore.set("bridge-coach-session", sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return NextResponse.json({ ok: true, user: result.user });
}
