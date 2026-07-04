import { NextResponse } from "next/server";
import { createUser, createSession } from "@/lib/server-auth";
import { cookies } from "next/headers";
import { checkRateLimit, cleanupRateLimit } from "@/lib/rate-limit";
import { getClientIp, normalizeEmail, validatePassword } from "@/lib/security";

export async function POST(request: Request) {
  cleanupRateLimit();
  const ip = getClientIp(request);
  if (!checkRateLimit(`register:${ip}`, 5, 60 * 60 * 1000)) {
    return NextResponse.json({ ok: false, error: "Too many registration attempts. Please try again later." }, { status: 429 });
  }

  const body = await request.json().catch(() => ({}));
  const normalized = {
    ...body,
    email: normalizeEmail(body.email),
  };
  const passwordCheck = validatePassword(normalized.password);
  if (!passwordCheck.ok) {
    return NextResponse.json({ ok: false, error: passwordCheck.error }, { status: 400 });
  }
  const result = await createUser(normalized);
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
