import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSessionUser, updateStoredUserProfile } from "@/lib/server-auth";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("bridge-coach-session")?.value;
  const current = await getSessionUser(sessionId);
  if (!current) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const updated = await updateStoredUserProfile(current.id, body);
  if (!updated) {
    return NextResponse.json({ ok: false, error: "Unable to update profile" }, { status: 400 });
  }

  return NextResponse.json({ ok: true, user: updated });
}
