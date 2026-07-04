export function validatePassword(password: string): { ok: boolean; error?: string } {
  if (password.length < 8) {
    return { ok: false, error: "Password must be at least 8 characters." };
  }
  if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
    return { ok: false, error: "Password should include uppercase and lowercase letters." };
  }
  if (!/[0-9]/.test(password)) {
    return { ok: false, error: "Password should include at least one number." };
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    return { ok: false, error: "Password should include at least one special character." };
  }
  return { ok: true };
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}
