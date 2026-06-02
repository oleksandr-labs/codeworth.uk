/**
 * Simple in-memory rate limiter for Next.js API routes (Node.js runtime).
 * Works per IP address. Resets after the configured window.
 *
 * Note: This is a single-instance rate limiter. In a multi-instance deployment
 * (multiple serverless functions), use Redis/Upstash for cross-instance limits.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

// Cleanup entries older than 10 minutes to avoid memory leaks
const CLEANUP_INTERVAL = 10 * 60 * 1000;
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;
  for (const [key, entry] of store.entries()) {
    if (entry.resetAt < now) store.delete(key);
  }
}

export interface RateLimitOptions {
  /** Max requests allowed in the window */
  limit: number;
  /** Window duration in milliseconds */
  windowMs: number;
}

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: number;
}

/**
 * Check if a given identifier (IP) has exceeded the rate limit.
 * Returns { success: true } if allowed, { success: false } if blocked.
 */
export function rateLimit(
  identifier: string,
  options: RateLimitOptions
): RateLimitResult {
  cleanup();

  const now = Date.now();
  const key = identifier;
  const existing = store.get(key);

  if (!existing || existing.resetAt < now) {
    // Start new window
    const entry: RateLimitEntry = {
      count: 1,
      resetAt: now + options.windowMs,
    };
    store.set(key, entry);
    return { success: true, remaining: options.limit - 1, resetAt: entry.resetAt };
  }

  existing.count++;
  store.set(key, existing);

  if (existing.count > options.limit) {
    return { success: false, remaining: 0, resetAt: existing.resetAt };
  }

  return {
    success: true,
    remaining: options.limit - existing.count,
    resetAt: existing.resetAt,
  };
}

/**
 * Get client IP from NextRequest headers.
 * Tries x-forwarded-for (Vercel/CDN), then x-real-ip, then falls back to "unknown".
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "unknown";
}
