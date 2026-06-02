import { NextRequest, NextResponse } from "next/server";
import { rateLimit, getClientIp } from "@/lib/rateLimit";
import { LoginSchema } from "@/lib/schemas";

export const runtime = "nodejs";

// 5 login attempts per 15 minutes per IP
const RATE_LIMIT = { limit: 5, windowMs: 15 * 60 * 1000 };

// Per-email account lockout: 5 failed attempts → lock for 15 minutes
const LOCKOUT_LIMIT = 5;
const LOCKOUT_MS = 15 * 60 * 1000;

interface LockoutRecord {
  count: number;
  lockedUntil: number | null;
}

const emailFailures = new Map<string, LockoutRecord>();

function checkEmailLockout(email: string): { locked: boolean; retryAfter?: number } {
  const rec = emailFailures.get(email);
  if (!rec) return { locked: false };
  if (rec.lockedUntil && Date.now() < rec.lockedUntil) {
    return { locked: true, retryAfter: Math.ceil((rec.lockedUntil - Date.now()) / 1000) };
  }
  return { locked: false };
}

function recordFailure(email: string): void {
  const rec = emailFailures.get(email) ?? { count: 0, lockedUntil: null };
  rec.count += 1;
  rec.lockedUntil = rec.count >= LOCKOUT_LIMIT ? Date.now() + LOCKOUT_MS : null;
  emailFailures.set(email, rec);
}

function clearFailures(email: string): void {
  emailFailures.delete(email);
}

// Security logger — writes to console.warn (picked up by Vercel/server logs)
// Replace with Sentry/external logger when monitoring is configured
function secLog(event: string, ip: string, details?: Record<string, string | number>) {
  const ts = new Date().toISOString();
  console.warn(`[SECURITY] ${ts} | ${event} | ip=${ip}`, details ?? "");
}

export async function POST(request: NextRequest) {
  // Rate limiting
  const ip = getClientIp(request);
  const rl = rateLimit(ip, RATE_LIMIT);
  if (!rl.success) {
    secLog("RATE_LIMIT_LOGIN", ip, { retryAfterSec: Math.ceil((rl.resetAt - Date.now()) / 1000) });
    return NextResponse.json(
      { error: "Забагато спроб входу. Спробуйте через кілька хвилин." },
      {
        status: 429,
        headers: { "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)) },
      }
    );
  }

  try {
    const body = await request.json();

    // Validate with Zod
    const parsed = LoginSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0];
      return NextResponse.json(
        { error: firstError?.message ?? "Некоректні дані" },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;

    // Per-email account lockout check
    const lockout = checkEmailLockout(email);
    if (lockout.locked) {
      secLog("ACCOUNT_LOCKOUT", ip, { email: email.split("@")[1] ?? "?", retryAfterSec: lockout.retryAfter ?? 900 });
      return NextResponse.json(
        { error: "Обліковий запис тимчасово заблоковано через підозрілу активність. Спробуйте пізніше." },
        {
          status: 429,
          headers: { "Retry-After": String(lockout.retryAfter ?? 900) },
        }
      );
    }

    // Demo credentials (MVP — replace with real DB + bcrypt when auth is fully implemented)
    const DEMO_USERS = [
      {
        email: process.env.DEMO_USER_EMAIL ?? "demo@codeworth.uk",
        password: process.env.DEMO_USER_PASSWORD ?? "demo123",
        id: "u_demo",
        firstName: "Демо",
        lastName: "Користувач",
        role: "user" as const,
      },
      {
        email: process.env.ADMIN_EMAIL ?? "admin@codeworth.uk",
        password: process.env.ADMIN_PASSWORD ?? "admin123",
        id: "u_admin",
        firstName: "Адмін",
        lastName: "Codeworth",
        role: "admin" as const,
      },
    ];

    const match = DEMO_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (!match) {
      recordFailure(email);
      const rec = emailFailures.get(email);
      secLog("LOGIN_FAILED", ip, {
        domain: email.split("@")[1] ?? "?",
        failCount: rec?.count ?? 1,
      });
      return NextResponse.json(
        { error: "Невірний email або пароль" },
        { status: 401 }
      );
    }

    clearFailures(email);
    const { password: _pw, ...user } = match;

    return NextResponse.json({ user }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Щось пішло не так. Спробуйте ще раз." },
      { status: 500 }
    );
  }
}
