/**
 * Integration tests for /api/auth/login route.
 * Covers: valid credentials, auth logic, rate limiting, error handling.
 * Zod schema validation is separately covered in lib/__tests__/schemas.test.ts.
 * @jest-environment node
 */

import { NextRequest } from "next/server";

const mockRateLimit = jest.fn((_ip: string, _opts?: unknown) => ({
  success: true,
  remaining: 4,
  resetAt: Date.now() + 60000,
}));

jest.mock("@/lib/rateLimit", () => ({
  rateLimit: (ip: string, opts: unknown) => mockRateLimit(ip, opts),
  getClientIp: () => "127.0.0.1",
}));

function makeRequest(body: unknown) {
  return new NextRequest("http://localhost/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  jest.clearAllMocks();
  mockRateLimit.mockReturnValue({ success: true, remaining: 4, resetAt: Date.now() + 60000 });
});

describe("POST /api/auth/login", () => {
  it("returns 200 and user data for valid demo credentials", async () => {
    const { POST } = await import("../route");
    const res = await POST(makeRequest({ email: "demo@codeworth.uk", password: "demo123" }));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.user).toBeDefined();
    expect(data.user.email).toBe("demo@codeworth.uk");
    expect(data.user.role).toBe("user");
  });

  it("returns user object without password field", async () => {
    const { POST } = await import("../route");
    const res = await POST(makeRequest({ email: "demo@codeworth.uk", password: "demo123" }));
    const data = await res.json();
    expect(data.user.password).toBeUndefined();
  });

  it("returns 200 and admin data for admin credentials", async () => {
    const { POST } = await import("../route");
    const res = await POST(makeRequest({ email: "admin@codeworth.uk", password: "admin123" }));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.user.role).toBe("admin");
    expect(data.user.firstName).toBe("Адмін");
  });

  it("returns 401 for wrong password", async () => {
    const { POST } = await import("../route");
    const res = await POST(makeRequest({ email: "demo@codeworth.uk", password: "wrongpass" }));
    expect(res.status).toBe(401);
    const data = await res.json();
    expect(data.error).toMatch(/невірний/i);
  });

  it("returns 401 for unknown email", async () => {
    const { POST } = await import("../route");
    const res = await POST(makeRequest({ email: "unknown@example.com", password: "demo123" }));
    expect(res.status).toBe(401);
  });

  it("normalizes email to lowercase before matching", async () => {
    const { POST } = await import("../route");
    const res = await POST(makeRequest({ email: "DEMO@codeworth.uk", password: "demo123" }));
    expect(res.status).toBe(200);
  });

  it("returns 429 when rate limit is exceeded", async () => {
    mockRateLimit.mockReturnValue({ success: false, remaining: 0, resetAt: Date.now() + 60000 });
    const { POST } = await import("../route");
    const res = await POST(makeRequest({ email: "demo@codeworth.uk", password: "demo123" }));
    expect(res.status).toBe(429);
  });

  it("returns Retry-After header when rate limited", async () => {
    mockRateLimit.mockReturnValue({ success: false, remaining: 0, resetAt: Date.now() + 30000 });
    const { POST } = await import("../route");
    const res = await POST(makeRequest({ email: "demo@codeworth.uk", password: "demo123" }));
    expect(res.headers.get("Retry-After")).toBeTruthy();
  });

  it("returns 500 on invalid JSON body", async () => {
    const req = new NextRequest("http://localhost/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "bad json",
    });
    const { POST } = await import("../route");
    const res = await POST(req);
    expect(res.status).toBe(500);
  });

  it("locks out account after 5 failed attempts for same email", async () => {
    const { POST } = await import("../route");
    const LOCKOUT_EMAIL = "lockout-unique-test@example.com";

    // Accumulate 5 failed attempts for this email
    for (let i = 0; i < 5; i++) {
      const req = new NextRequest("http://localhost/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email: LOCKOUT_EMAIL, password: "wrongpass" }),
        headers: { "Content-Type": "application/json" },
      });
      await POST(req);
    }

    // 6th attempt should be rejected due to lockout
    const req = new NextRequest("http://localhost/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email: LOCKOUT_EMAIL, password: "wrongpass" }),
      headers: { "Content-Type": "application/json" },
    });
    const res = await POST(req);
    expect(res.status).toBe(429);
    const data = await res.json();
    expect(data.error).toMatch(/заблоковано/i);
  });

  it("lockout returns Retry-After header", async () => {
    const { POST } = await import("../route");
    const LOCKOUT_EMAIL = "lockout-retry-test@example.com";

    for (let i = 0; i < 5; i++) {
      const req = new NextRequest("http://localhost/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email: LOCKOUT_EMAIL, password: "wrongpass" }),
        headers: { "Content-Type": "application/json" },
      });
      await POST(req);
    }

    const req = new NextRequest("http://localhost/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email: LOCKOUT_EMAIL, password: "wrongpass" }),
      headers: { "Content-Type": "application/json" },
    });
    const res = await POST(req);
    expect(res.status).toBe(429);
    expect(res.headers.get("Retry-After")).toBeTruthy();
  });

  it("clears lockout after successful login", async () => {
    const { POST } = await import("../route");
    // Accumulate 3 failed attempts then succeed — failure count should reset
    for (let i = 0; i < 3; i++) {
      const req = new NextRequest("http://localhost/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email: "demo@codeworth.uk", password: "wrong" }),
        headers: { "Content-Type": "application/json" },
      });
      await POST(req);
    }
    // Successful login clears failures
    const goodReq = new NextRequest("http://localhost/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email: "demo@codeworth.uk", password: "demo123" }),
      headers: { "Content-Type": "application/json" },
    });
    const res = await POST(goodReq);
    expect(res.status).toBe(200);
  });
});
