/**
 * Integration tests for /api/contact route.
 * Covers: rate limiting, honeypot, Telegram integration, error handling.
 * Zod schema validation is separately covered in lib/__tests__/schemas.test.ts.
 * @jest-environment node
 */

import { NextRequest } from "next/server";

// Mutable mock for rateLimit so we can simulate 429 per-test
const mockRateLimit = jest.fn((_ip: string, _opts?: unknown) => ({
  success: true,
  remaining: 4,
  resetAt: Date.now() + 60000,
}));

jest.mock("@/lib/rateLimit", () => ({
  rateLimit: (ip: string, opts: unknown) => mockRateLimit(ip, opts),
  getClientIp: () => "127.0.0.1",
}));

global.fetch = jest.fn().mockResolvedValue({ ok: true });

function makeRequest(body: unknown) {
  return new NextRequest("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": "127.0.0.1" },
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  jest.clearAllMocks();
  mockRateLimit.mockReturnValue({ success: true, remaining: 4, resetAt: Date.now() + 60000 });
});

describe("POST /api/contact", () => {
  const VALID_BODY = { name: "Олег", contact: "oleg@example.com", message: "Тест" };

  it("returns 200 for valid data", async () => {
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
    const data = await res.json();
    expect(data.error).toMatch(/забагато спроб/i);
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

  it("includes name and message in Telegram notification", async () => {
    process.env.TELEGRAM_BOT_TOKEN = "tok";
    process.env.TELEGRAM_CHAT_ID = "42";
    const { POST } = await import("../route");
    await POST(makeRequest({ name: "Тарас", contact: "taras@ua.com", message: "Привіт!" }));
    const body = JSON.parse((global.fetch as jest.Mock).mock.calls[0][1].body);
    expect(body.text).toContain("Тарас");
    expect(body.text).toContain("Привіт!");
    delete process.env.TELEGRAM_BOT_TOKEN;
    delete process.env.TELEGRAM_CHAT_ID;
  });

  it("returns 500 on invalid JSON body", async () => {
    const req = new NextRequest("http://localhost/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "not valid json{{",
    });
    const { POST } = await import("../route");
    const res = await POST(req);
    expect(res.status).toBe(500);
  });

  it("returns 200 with optional fields (service, budget)", async () => {
    const { POST } = await import("../route");
    const res = await POST(makeRequest({ name: "Олег", contact: "oleg@example.com", service: "SEO", budget: "10 000 ₴" }));
    expect(res.status).toBe(200);
  });
});
