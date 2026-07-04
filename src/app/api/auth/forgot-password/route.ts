import { NextResponse } from "next/server";
import { isEmailLike } from "@/lib/email";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!isEmailLike(email)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
  }

  return NextResponse.json({ ok: true, message: "If an account exists, password reset instructions have been sent." });
}
