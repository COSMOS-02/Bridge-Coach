import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyUser, createSession } from "@/lib/server-auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const result = await verifyUser(body.email, body.password);
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
