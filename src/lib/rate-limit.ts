const buckets = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const existing = buckets.get(key);

  if (existing && existing.resetAt > now) {
    if (existing.count >= limit) {
      return false;
    }

    existing.count += 1;
    return true;
  }

  buckets.set(key, { count: 1, resetAt: now + windowMs });
  return true;
}

export function cleanupRateLimit() {
  const now = Date.now();
  for (const [key, value] of buckets.entries()) {
    if (value.resetAt <= now) {
      buckets.delete(key);
    }
  }
}
