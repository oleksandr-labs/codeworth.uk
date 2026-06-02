/**
 * Integration tests for /api/partnership route.
 * Covers: rate limiting, honeypot, Zod validation, Telegram integration, error handling.
 * @jest-environment node
 */

const mockRateLimit = jest.fn((_ip: string, _opts?: unknown) => ({
  success: true,
  remaining: 2,
  resetAt: Date.now() + 3600000,
}));

jest.mock("@/lib/rateLimit", () => ({
  rateLimit: (ip: string, opts: unknown) => mockRateLimit(ip, opts),
  getClientIp: () => "127.0.0.1",
}));

global.fetch = jest.fn().mockResolvedValue({ ok: true });

const VALID_BODY = {
  name: "Олена Коваль",
  email: "olena@agency.com.ua",
  type: "referral",
  description: "Маємо аудиторію 500+ підприємців, хочемо рекомендувати Codeworth.",
};

function makeRequest(body: unknown) {
  return new Request("http://localhost/api/partnership", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": "127.0.0.1" },
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  jest.clearAllMocks();
  jest.resetModules();
  mockRateLimit.mockReturnValue({ success: true, remaining: 2, resetAt: Date.now() + 3600000 });
  (global.fetch as jest.Mock).mockResolvedValue({ ok: true });
  delete process.env.TELEGRAM_BOT_TOKEN;
  delete process.env.TELEGRAM_CHAT_ID;
});

describe("POST /api/partnership", () => {
  it("returns 200 with { success: true } for valid data", async () => {
    const { POST } = await import("../route");
    const res = await POST(makeRequest(VALID_BODY));
    expect(res.status).toBe(200);
    const data = await res.json() as Record<string, unknown>;
    expect(data.success).toBe(true);
  });

  it("returns 429 when rate limit is exceeded", async () => {
    mockRateLimit.mockReturnValue({ success: false, remaining: 0, resetAt: Date.now() + 3600000 });
    const { POST } = await import("../route");
    const res = await POST(makeRequest(VALID_BODY));
    expect(res.status).toBe(429);
    const data = await res.json() as { error: string };
    expect(data.error).toMatch(/забагато спроб/i);
  });

  it("returns Retry-After header when rate limited", async () => {
    mockRateLimit.mockReturnValue({ success: false, remaining: 0, resetAt: Date.now() + 3600000 });
    const { POST } = await import("../route");
    const res = await POST(makeRequest(VALID_BODY));
    expect(res.headers.get("Retry-After")).toBeTruthy();
  });

  it("returns 200 for honeypot (field filled) — fake success", async () => {
    const { POST } = await import("../route");
    const res = await POST(makeRequest({ ...VALID_BODY, honeypot: "spam" }));
    expect(res.status).toBe(200);
    const data = await res.json() as { success: boolean };
    expect(data.success).toBe(true);
  });

  it("returns 400 for invalid JSON body", async () => {
    const { POST } = await import("../route");
    const req = new Request("http://localhost/api/partnership", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": "127.0.0.1" },
      body: "{{not json",
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("returns 422 when name is missing", async () => {
    const { POST } = await import("../route");
    const { name: _, ...noName } = VALID_BODY;
    const res = await POST(makeRequest(noName));
    expect(res.status).toBe(422);
  });

  it("returns 422 when email is invalid", async () => {
    const { POST } = await import("../route");
    const res = await POST(makeRequest({ ...VALID_BODY, email: "not-an-email" }));
    expect(res.status).toBe(422);
  });

  it("returns 422 when type is not one of referral/agency/tech", async () => {
    const { POST } = await import("../route");
    const res = await POST(makeRequest({ ...VALID_BODY, type: "unknown" }));
    expect(res.status).toBe(422);
    const data = await res.json() as { error: string };
    expect(data.error).toBeTruthy();
  });

  it("returns 422 when description is too short (< 20 chars)", async () => {
    const { POST } = await import("../route");
    const res = await POST(makeRequest({ ...VALID_BODY, description: "Коротко" }));
    expect(res.status).toBe(422);
  });

  it("does not call Telegram when env vars are not set", async () => {
    const { POST } = await import("../route");
    await POST(makeRequest(VALID_BODY));
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("calls Telegram when both env vars are set", async () => {
    process.env.TELEGRAM_BOT_TOKEN = "test-token";
    process.env.TELEGRAM_CHAT_ID = "99999";
    const { POST } = await import("../route");
    await POST(makeRequest(VALID_BODY));
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("api.telegram.org"),
      expect.objectContaining({ method: "POST" })
    );
  });

  it("Telegram message includes name, email and partnership type label", async () => {
    process.env.TELEGRAM_BOT_TOKEN = "tok";
    process.env.TELEGRAM_CHAT_ID = "42";
    const { POST } = await import("../route");
    await POST(makeRequest({ ...VALID_BODY, type: "agency" }));
    const body = JSON.parse((global.fetch as jest.Mock).mock.calls[0][1].body as string) as {
      text: string;
    };
    expect(body.text).toContain("Олена Коваль");
    expect(body.text).toContain("olena@agency.com.ua");
    expect(body.text).toContain("Агентське партнерство");
  });

  it("includes audience in Telegram message when provided", async () => {
    process.env.TELEGRAM_BOT_TOKEN = "tok";
    process.env.TELEGRAM_CHAT_ID = "42";
    const { POST } = await import("../route");
    await POST(makeRequest({ ...VALID_BODY, audience: "600 підписників LinkedIn" }));
    const body = JSON.parse((global.fetch as jest.Mock).mock.calls[0][1].body as string) as {
      text: string;
    };
    expect(body.text).toContain("600 підписників LinkedIn");
  });

  it("succeeds without optional audience field", async () => {
    const { POST } = await import("../route");
    const res = await POST(makeRequest({ ...VALID_BODY }));
    expect(res.status).toBe(200);
  });

  it("accepts tech type and uses correct Telegram label", async () => {
    process.env.TELEGRAM_BOT_TOKEN = "tok";
    process.env.TELEGRAM_CHAT_ID = "42";
    const { POST } = await import("../route");
    await POST(makeRequest({ ...VALID_BODY, type: "tech" }));
    const body = JSON.parse((global.fetch as jest.Mock).mock.calls[0][1].body as string) as {
      text: string;
    };
    expect(body.text).toContain("Технологічне партнерство");
  });

  it("does not throw when Telegram fetch fails — returns 200 anyway", async () => {
    process.env.TELEGRAM_BOT_TOKEN = "tok";
    process.env.TELEGRAM_CHAT_ID = "42";
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));
    const { POST } = await import("../route");
    const res = await POST(makeRequest(VALID_BODY));
    expect(res.status).toBe(200);
  });
});

export {};
