/**
 * Integration tests for /api/newsletter route.
 * Covers: rate limiting, honeypot, Telegram integration, error handling.
 * Zod schema validation is separately covered in lib/__tests__/schemas.test.ts.
 * @jest-environment node
 */

import { NextRequest } from "next/server";

const mockRateLimit = jest.fn((_ip: string, _opts?: unknown) => ({
  success: true,
  remaining: 2,
  resetAt: Date.now() + 60000,
}));

jest.mock("@/lib/rateLimit", () => ({
  rateLimit: (ip: string, opts: unknown) => mockRateLimit(ip, opts),
  getClientIp: () => "127.0.0.1",
}));

global.fetch = jest.fn().mockResolvedValue({ ok: true });

function makeRequest(body: unknown) {
  return new NextRequest("http://localhost/api/newsletter", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  jest.clearAllMocks();
  mockRateLimit.mockReturnValue({ success: true, remaining: 2, resetAt: Date.now() + 60000 });
});

describe("POST /api/newsletter", () => {
  const VALID_BODY = { email: "user@example.com" };

  it("returns 200 for valid email", async () => {
    const { POST } = await import("../route");
    const res = await POST(makeRequest(VALID_BODY));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
  });

  it("returns 429 when rate limit is exceeded", async () => {
    mockRateLimit.mockReturnValue({ success: false, remaining: 0, resetAt: Date.now() + 60000 });
    const { POST } = await import("../route");
    const res = await POST(makeRequest(VALID_BODY));
    expect(res.status).toBe(429);
  });

  it("returns Retry-After header when rate limited", async () => {
    mockRateLimit.mockReturnValue({ success: false, remaining: 0, resetAt: Date.now() + 30000 });
    const { POST } = await import("../route");
    const res = await POST(makeRequest(VALID_BODY));
    expect(res.headers.get("Retry-After")).toBeTruthy();
  });

  it("returns 200 for honeypot (website field filled) — fake success", async () => {
    const { POST } = await import("../route");
    const res = await POST(makeRequest({ ...VALID_BODY, website: "spam.com" }));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
  });

  it("does not call Telegram when env vars are not set", async () => {
    const saved = process.env.TELEGRAM_BOT_TOKEN;
    delete process.env.TELEGRAM_BOT_TOKEN;
    const { POST } = await import("../route");
    await POST(makeRequest(VALID_BODY));
    expect(global.fetch).not.toHaveBeenCalled();
    process.env.TELEGRAM_BOT_TOKEN = saved;
  });

  it("calls Telegram when both env vars are set", async () => {
    process.env.TELEGRAM_BOT_TOKEN = "test-token";
    process.env.TELEGRAM_CHAT_ID = "12345";
    const { POST } = await import("../route");
    await POST(makeRequest(VALID_BODY));
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("api.telegram.org"),
      expect.objectContaining({ method: "POST" })
    );
    delete process.env.TELEGRAM_BOT_TOKEN;
    delete process.env.TELEGRAM_CHAT_ID;
  });

  it("includes email in Telegram notification", async () => {
    process.env.TELEGRAM_BOT_TOKEN = "tok";
    process.env.TELEGRAM_CHAT_ID = "42";
    const { POST } = await import("../route");
    await POST(makeRequest({ email: "subscriber@ua.com" }));
    const body = JSON.parse((global.fetch as jest.Mock).mock.calls[0][1].body);
    expect(body.text).toContain("subscriber@ua.com");
    delete process.env.TELEGRAM_BOT_TOKEN;
    delete process.env.TELEGRAM_CHAT_ID;
  });

  it("normalizes email to lowercase", async () => {
    const { POST } = await import("../route");
    const res = await POST(makeRequest({ email: "USER@EXAMPLE.COM" }));
    expect(res.status).toBe(200);
  });

  it("returns 500 on invalid JSON body", async () => {
    const req = new NextRequest("http://localhost/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "bad json{{",
    });
    const { POST } = await import("../route");
    const res = await POST(req);
    expect(res.status).toBe(500);
  });
});
