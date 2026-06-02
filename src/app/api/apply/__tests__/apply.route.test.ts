/**
 * Integration tests for /api/apply route.
 * Covers: valid submission, rate limiting, honeypot, Zod validation,
 * Telegram integration, bad JSON, optional fields.
 * @jest-environment node
 */

import { NextRequest } from "next/server";

const mockRateLimit = jest.fn((_ip: string, _opts?: unknown) => ({
  success: true,
  remaining: 3,
  resetAt: Date.now() + 1800000,
}));

jest.mock("@/lib/rateLimit", () => ({
  rateLimit: (ip: string, opts: unknown) => mockRateLimit(ip, opts),
  getClientIp: () => "127.0.0.1",
}));

global.fetch = jest.fn().mockResolvedValue({ ok: true });

const VALID_BODY = {
  name: "Олена Петрова",
  email: "olena@example.com",
  position: "Frontend Developer",
  coverLetter: "Я маю 3 роки досвіду з React та Next.js і хочу приєднатися до вашої команди.",
};

function makeRequest(body: unknown) {
  return new NextRequest("http://localhost/api/apply", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": "127.0.0.1" },
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  jest.clearAllMocks();
  jest.resetModules();
  mockRateLimit.mockReturnValue({ success: true, remaining: 3, resetAt: Date.now() + 1800000 });
});

describe("POST /api/apply", () => {
  it("returns 200 for valid data without portfolioUrl", async () => {
    const { POST } = await import("../route");
    const res = await POST(makeRequest(VALID_BODY));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
  });

  it("returns 200 when portfolioUrl is provided", async () => {
    const { POST } = await import("../route");
    const res = await POST(makeRequest({ ...VALID_BODY, portfolioUrl: "https://github.com/olena" }));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
  });

  it("returns 200 when portfolioUrl is empty string (optional field)", async () => {
    const { POST } = await import("../route");
    const res = await POST(makeRequest({ ...VALID_BODY, portfolioUrl: "" }));
    expect(res.status).toBe(200);
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

  it("returns 200 silently for honeypot (website field filled)", async () => {
    const { POST } = await import("../route");
    const res = await POST(makeRequest({ ...VALID_BODY, website: "spam.bot" }));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
  });

  it("returns 400 for invalid JSON", async () => {
    const { POST } = await import("../route");
    const req = new NextRequest("http://localhost/api/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "not{{valid}}json",
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toMatch(/json/i);
  });

  it("returns 400 when name is missing", async () => {
    const { POST } = await import("../route");
    const { name: _, ...noName } = VALID_BODY;
    const res = await POST(makeRequest(noName));
    expect(res.status).toBe(400);
  });

  it("returns 400 when name is too short", async () => {
    const { POST } = await import("../route");
    const res = await POST(makeRequest({ ...VALID_BODY, name: "А" }));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toMatch(/ім'я/i);
  });

  it("returns 400 for invalid email", async () => {
    const { POST } = await import("../route");
    const res = await POST(makeRequest({ ...VALID_BODY, email: "not-an-email" }));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toMatch(/email/i);
  });

  it("returns 400 when coverLetter is too short", async () => {
    const { POST } = await import("../route");
    const res = await POST(makeRequest({ ...VALID_BODY, coverLetter: "Занадто коротко" }));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toMatch(/символ/i);
  });

  it("returns 400 for invalid portfolioUrl format", async () => {
    const { POST } = await import("../route");
    const res = await POST(makeRequest({ ...VALID_BODY, portfolioUrl: "not-a-url" }));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toMatch(/посилання/i);
  });

  it("does not call fetch when Telegram and Resend env vars are not set", async () => {
    delete process.env.TELEGRAM_BOT_TOKEN;
    delete process.env.TELEGRAM_CHAT_ID;
    delete process.env.RESEND_API_KEY;
    const { POST } = await import("../route");
    await POST(makeRequest(VALID_BODY));
    expect(global.fetch).not.toHaveBeenCalled();
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

  it("includes applicant name and position in Telegram message", async () => {
    process.env.TELEGRAM_BOT_TOKEN = "tok";
    process.env.TELEGRAM_CHAT_ID = "99";
    const { POST } = await import("../route");
    await POST(makeRequest({ ...VALID_BODY, name: "Андрій Шевченко", position: "UI/UX Designer" }));
    const callBody = JSON.parse((global.fetch as jest.Mock).mock.calls[0][1].body);
    expect(callBody.text).toContain("Андрій Шевченко");
    expect(callBody.text).toContain("UI/UX Designer");
    delete process.env.TELEGRAM_BOT_TOKEN;
    delete process.env.TELEGRAM_CHAT_ID;
  });

  it("includes portfolioUrl in Telegram message when provided", async () => {
    process.env.TELEGRAM_BOT_TOKEN = "tok";
    process.env.TELEGRAM_CHAT_ID = "99";
    const { POST } = await import("../route");
    const portfolioUrl = "https://github.com/andrii";
    await POST(makeRequest({ ...VALID_BODY, portfolioUrl }));
    const callBody = JSON.parse((global.fetch as jest.Mock).mock.calls[0][1].body);
    expect(callBody.text).toContain(portfolioUrl);
    delete process.env.TELEGRAM_BOT_TOKEN;
    delete process.env.TELEGRAM_CHAT_ID;
  });

  it("sends Resend confirmation email to applicant when RESEND_API_KEY is set", async () => {
    process.env.RESEND_API_KEY = "re_test_key";
    const { POST } = await import("../route");
    await POST(makeRequest(VALID_BODY));
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.resend.com/emails",
      expect.objectContaining({ method: "POST" })
    );
    const resendCall = (global.fetch as jest.Mock).mock.calls.find(([url]: [string]) =>
      String(url).includes("resend.com")
    );
    const body = JSON.parse(resendCall[1].body);
    expect(body.to).toContain(VALID_BODY.email);
    expect(body.subject).toContain(VALID_BODY.position);
    delete process.env.RESEND_API_KEY;
  });

  it("does not send Resend email without RESEND_API_KEY", async () => {
    delete process.env.RESEND_API_KEY;
    const { POST } = await import("../route");
    await POST(makeRequest(VALID_BODY));
    const resendCalls = (global.fetch as jest.Mock).mock.calls.filter(([url]: [string]) =>
      String(url).includes("resend.com")
    );
    expect(resendCalls).toHaveLength(0);
  });
});
