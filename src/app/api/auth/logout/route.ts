import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { removeSession } from "@/lib/server-auth";

export async function POST() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("bridge-coach-session")?.value;
  await removeSession(sessionId);
  cookieStore.delete("bridge-coach-session");
  return NextResponse.json({ ok: true });
}
