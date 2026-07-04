import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSessionUser, saveAssessmentResult } from "@/lib/server-auth";

export async function GET() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("bridge-coach-session")?.value;
  const currentUser = await getSessionUser(sessionId);
  if (!currentUser) {
    return NextResponse.json({ ok: true, result: null });
  }

  const result = await saveAssessmentResult(currentUser.id, null);
  return NextResponse.json({ ok: true, result });
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("bridge-coach-session")?.value;
  const currentUser = await getSessionUser(sessionId);
  if (!currentUser) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const result = await saveAssessmentResult(currentUser.id, body);
  return NextResponse.json({ ok: true, result });
}
