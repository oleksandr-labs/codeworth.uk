/**
 * Tests for /api/alert/critical route.
 * Covers: no-op when env vars missing, Telegram fetch, invalid body.
 * @jest-environment node
 */

import { NextRequest } from "next/server";

const originalEnv = process.env;

function makeRequest(body: unknown) {
  return new NextRequest("http://localhost/api/alert/critical", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  jest.resetModules();
  process.env = { ...originalEnv };
  global.fetch = jest.fn();
});

afterEach(() => {
  process.env = originalEnv;
});

describe("POST /api/alert/critical", () => {
  it("returns ok:false with reason 'not_configured' when env vars missing", async () => {
    delete process.env.TELEGRAM_BOT_TOKEN;
    delete process.env.TELEGRAM_CHAT_ID;

    const { POST } = await import("../route");
    const res = await POST(makeRequest({ message: "test error" }));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.ok).toBe(false);
    expect(json.reason).toBe("not_configured");
    expect(fetch).not.toHaveBeenCalled();
  });

  it("calls Telegram API when env vars are configured", async () => {
    process.env.TELEGRAM_BOT_TOKEN = "test-token";
    process.env.TELEGRAM_CHAT_ID = "12345";

    (global.fetch as jest.Mock).mockResolvedValue({
      json: async () => ({ ok: true }),
    });

    const { POST } = await import("../route");
    const res = await POST(makeRequest({ message: "critical failure", digest: "abc123", url: "https://codeworth.uk" }));
    const json = await res.json();

    expect(json.ok).toBe(true);
    expect(fetch).toHaveBeenCalledTimes(1);

    const fetchCall = (fetch as jest.Mock).mock.calls[0];
    expect(fetchCall[0]).toContain("test-token");
    expect(fetchCall[0]).toContain("sendMessage");

    const fetchBody = JSON.parse(fetchCall[1].body);
    expect(fetchBody.chat_id).toBe("12345");
    expect(fetchBody.text).toContain("критична помилка");
    expect(fetchBody.text).toContain("abc123");
    expect(fetchBody.text).toContain("critical failure");
  });

  it("returns ok:false when Telegram API fails", async () => {
    process.env.TELEGRAM_BOT_TOKEN = "test-token";
    process.env.TELEGRAM_CHAT_ID = "12345";

    (global.fetch as jest.Mock).mockResolvedValue({
      json: async () => ({ ok: false }),
    });

    const { POST } = await import("../route");
    const res = await POST(makeRequest({ message: "error" }));
    const json = await res.json();

    expect(json.ok).toBe(false);
  });

  it("handles missing optional fields gracefully", async () => {
    process.env.TELEGRAM_BOT_TOKEN = "test-token";
    process.env.TELEGRAM_CHAT_ID = "12345";

    (global.fetch as jest.Mock).mockResolvedValue({
      json: async () => ({ ok: true }),
    });

    const { POST } = await import("../route");
    const res = await POST(makeRequest({}));
    const json = await res.json();

    expect(json.ok).toBe(true);
  });

  it("returns 400 for invalid JSON body", async () => {
    process.env.TELEGRAM_BOT_TOKEN = "test-token";
    process.env.TELEGRAM_CHAT_ID = "12345";

    const { POST } = await import("../route");
    const req = new NextRequest("http://localhost/api/alert/critical", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "not-json{{{",
    });
    const res = await POST(req);

    expect(res.status).toBe(400);
  });
});
