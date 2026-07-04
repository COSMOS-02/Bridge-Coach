import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyUser, createSession } from "@/lib/server-auth";
import { checkRateLimit, cleanupRateLimit } from "@/lib/rate-limit";
import { getClientIp, normalizeEmail } from "@/lib/security";

export async function POST(request: Request) {
  cleanupRateLimit();
  const ip = getClientIp(request);
  if (!checkRateLimit(`login:${ip}`, 10, 60 * 60 * 1000)) {
    return NextResponse.json({ ok: false, error: "Too many login attempts. Please try again later." }, { status: 429 });
  }

  const body = await request.json().catch(() => ({}));
  const result = await verifyUser(normalizeEmail(body.email), body.password);
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 401 });
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
