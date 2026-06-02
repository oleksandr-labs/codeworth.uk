/**
 * Integration tests for /api/liqpay/create and /api/liqpay/callback routes.
 * Covers: valid requests, Zod validation, rate limiting, signature verification,
 * Telegram notifications, Resend email, env var guards.
 * @jest-environment node
 */

import { NextRequest } from "next/server";
import crypto from "crypto";

// ─── Shared rate-limit mock (create route only) ──────────────────────────────

const mockRateLimit = jest.fn((_ip: string, _opts: unknown) => ({
  success: true,
  remaining: 4,
  resetAt: Date.now() + 10 * 60 * 1000,
}));

jest.mock("@/lib/rateLimit", () => ({
  rateLimit: (ip: string, opts: unknown) => mockRateLimit(ip, opts),
  getClientIp: () => "127.0.0.1",
}));

// ─── Helpers ─────────────────────────────────────────────────────────────────

const PRIVATE_KEY = "test_private_key";
const PUBLIC_KEY = "test_public_key";

function liqpaySign(privateKey: string, data: string): string {
  return crypto
    .createHash("sha1")
    .update(privateKey + data + privateKey)
    .digest("base64");
}

function makeCreateRequest(body: unknown) {
  return new NextRequest("http://localhost/api/liqpay/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

function makeCallbackRequest(params: Record<string, string>) {
  const formData = new FormData();
  Object.entries(params).forEach(([k, v]) => formData.append(k, v));
  return new NextRequest("http://localhost/api/liqpay/callback", {
    method: "POST",
    body: formData,
  });
}

function makeCallbackPayload(
  payload: Record<string, string>,
  privateKey = PRIVATE_KEY
): { data: string; signature: string } {
  const data = Buffer.from(JSON.stringify(payload)).toString("base64");
  const signature = liqpaySign(privateKey, data);
  return { data, signature };
}

// ─── /api/liqpay/create ──────────────────────────────────────────────────────

describe("POST /api/liqpay/create", () => {
  const VALID_BODY = {
    amount: 9900,
    orderId: "CN-20260503-ABCD",
    description: "Сайт для ресторану — Базовий пакет",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockRateLimit.mockReturnValue({ success: true, remaining: 4, resetAt: Date.now() + 600000 });
    process.env.LIQPAY_PUBLIC_KEY = PUBLIC_KEY;
    process.env.LIQPAY_PRIVATE_KEY = PRIVATE_KEY;
  });

  afterEach(() => {
    delete process.env.LIQPAY_PUBLIC_KEY;
    delete process.env.LIQPAY_PRIVATE_KEY;
  });

  it("returns 200 with data, signature, checkoutUrl for valid payload", async () => {
    const { POST } = await import("../create/route");
    const res = await POST(makeCreateRequest(VALID_BODY));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(typeof json.data).toBe("string");
    expect(typeof json.signature).toBe("string");
    expect(json.checkoutUrl).toBe("https://www.liqpay.ua/api/3/checkout");
  });

  it("data is valid base64-encoded JSON with correct params", async () => {
    const { POST } = await import("../create/route");
    const res = await POST(makeCreateRequest(VALID_BODY));
    const { data } = await res.json();
    const decoded = JSON.parse(Buffer.from(data, "base64").toString("utf-8"));
    expect(decoded.public_key).toBe(PUBLIC_KEY);
    expect(decoded.action).toBe("pay");
    expect(decoded.amount).toBe("9900");
    expect(decoded.currency).toBe("UAH");
    expect(decoded.order_id).toBe(VALID_BODY.orderId);
  });

  it("signature matches SHA1(private+data+private)", async () => {
    const { POST } = await import("../create/route");
    const res = await POST(makeCreateRequest(VALID_BODY));
    const { data, signature } = await res.json();
    expect(signature).toBe(liqpaySign(PRIVATE_KEY, data));
  });

  it("accepts optional email and includes as customer", async () => {
    const { POST } = await import("../create/route");
    const res = await POST(makeCreateRequest({ ...VALID_BODY, email: "client@example.com" }));
    expect(res.status).toBe(200);
    const { data } = await res.json();
    const decoded = JSON.parse(Buffer.from(data, "base64").toString("utf-8"));
    expect(decoded.customer).toBe("client@example.com");
  });

  it("returns 503 when LIQPAY keys are not configured", async () => {
    delete process.env.LIQPAY_PUBLIC_KEY;
    delete process.env.LIQPAY_PRIVATE_KEY;
    const { POST } = await import("../create/route");
    const res = await POST(makeCreateRequest(VALID_BODY));
    expect(res.status).toBe(503);
    const json = await res.json();
    expect(json.error).toBeTruthy();
  });

  it("returns 400 when amount is missing", async () => {
    const { POST } = await import("../create/route");
    const { amount: _, ...body } = VALID_BODY;
    const res = await POST(makeCreateRequest(body));
    expect(res.status).toBe(400);
  });

  it("returns 400 when amount is not positive", async () => {
    const { POST } = await import("../create/route");
    const res = await POST(makeCreateRequest({ ...VALID_BODY, amount: -100 }));
    expect(res.status).toBe(400);
  });

  it("returns 400 when orderId is missing", async () => {
    const { POST } = await import("../create/route");
    const { orderId: _, ...body } = VALID_BODY;
    const res = await POST(makeCreateRequest(body));
    expect(res.status).toBe(400);
  });

  it("returns 400 when description is missing", async () => {
    const { POST } = await import("../create/route");
    const { description: _, ...body } = VALID_BODY;
    const res = await POST(makeCreateRequest(body));
    expect(res.status).toBe(400);
  });

  it("returns 429 when rate limit exceeded", async () => {
    mockRateLimit.mockReturnValue({ success: false, remaining: 0, resetAt: Date.now() + 60000 });
    const { POST } = await import("../create/route");
    const res = await POST(makeCreateRequest(VALID_BODY));
    expect(res.status).toBe(429);
  });

  it("returns Retry-After header when rate limited", async () => {
    mockRateLimit.mockReturnValue({ success: false, remaining: 0, resetAt: Date.now() + 30000 });
    const { POST } = await import("../create/route");
    const res = await POST(makeCreateRequest(VALID_BODY));
    expect(res.headers.get("Retry-After")).toBeTruthy();
  });

  it("returns 500 on invalid JSON body", async () => {
    const req = new NextRequest("http://localhost/api/liqpay/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "not json{{",
    });
    const { POST } = await import("../create/route");
    const res = await POST(req);
    expect(res.status).toBe(500);
  });
});

// ─── /api/liqpay/callback ────────────────────────────────────────────────────

describe("POST /api/liqpay/callback", () => {
  const SUCCESS_PAYLOAD = {
    order_id: "CN-20260503-ABCD",
    status: "success",
    amount: "9900",
    currency: "UAH",
    sender_email: "client@example.com",
    sender_phone: "+380991234567",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.LIQPAY_PRIVATE_KEY = PRIVATE_KEY;
    delete process.env.TELEGRAM_BOT_TOKEN;
    delete process.env.TELEGRAM_CHAT_ID;
    delete process.env.RESEND_API_KEY;
    global.fetch = jest.fn().mockResolvedValue({ ok: true });
  });

  afterEach(() => {
    delete process.env.LIQPAY_PRIVATE_KEY;
  });

  it("returns 200 {ok: true} for valid success payload", async () => {
    const { POST } = await import("../callback/route");
    const { data, signature } = makeCallbackPayload(SUCCESS_PAYLOAD);
    const res = await POST(makeCallbackRequest({ data, signature }));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.ok).toBe(true);
  });

  it("returns 503 when LIQPAY_PRIVATE_KEY is not configured", async () => {
    delete process.env.LIQPAY_PRIVATE_KEY;
    const { POST } = await import("../callback/route");
    const { data, signature } = makeCallbackPayload(SUCCESS_PAYLOAD);
    const res = await POST(makeCallbackRequest({ data, signature }));
    expect(res.status).toBe(503);
  });

  it("returns 403 for invalid signature", async () => {
    const { POST } = await import("../callback/route");
    const { data } = makeCallbackPayload(SUCCESS_PAYLOAD);
    const res = await POST(makeCallbackRequest({ data, signature: "bad_signature" }));
    expect(res.status).toBe(403);
  });

  it("returns 400 when data is missing from formData", async () => {
    const { POST } = await import("../callback/route");
    const { signature } = makeCallbackPayload(SUCCESS_PAYLOAD);
    const res = await POST(makeCallbackRequest({ signature }));
    expect(res.status).toBe(400);
  });

  it("returns 400 when signature is missing from formData", async () => {
    const { POST } = await import("../callback/route");
    const { data } = makeCallbackPayload(SUCCESS_PAYLOAD);
    const res = await POST(makeCallbackRequest({ data }));
    expect(res.status).toBe(400);
  });

  it("sends Telegram notification on success when env vars set", async () => {
    process.env.TELEGRAM_BOT_TOKEN = "test-token";
    process.env.TELEGRAM_CHAT_ID = "12345";
    const { POST } = await import("../callback/route");
    const { data, signature } = makeCallbackPayload(SUCCESS_PAYLOAD);
    await POST(makeCallbackRequest({ data, signature }));
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("api.telegram.org"),
      expect.objectContaining({ method: "POST" })
    );
  });

  it("sends Telegram notification for sandbox status", async () => {
    process.env.TELEGRAM_BOT_TOKEN = "test-token";
    process.env.TELEGRAM_CHAT_ID = "12345";
    const { POST } = await import("../callback/route");
    const sandboxPayload = { ...SUCCESS_PAYLOAD, status: "sandbox" };
    const { data, signature } = makeCallbackPayload(sandboxPayload);
    await POST(makeCallbackRequest({ data, signature }));
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("api.telegram.org"),
      expect.any(Object)
    );
  });

  it("Telegram message includes order_id and amount", async () => {
    process.env.TELEGRAM_BOT_TOKEN = "tok";
    process.env.TELEGRAM_CHAT_ID = "42";
    const { POST } = await import("../callback/route");
    const { data, signature } = makeCallbackPayload(SUCCESS_PAYLOAD);
    await POST(makeCallbackRequest({ data, signature }));
    const body = JSON.parse((global.fetch as jest.Mock).mock.calls[0][1].body as string);
    expect(body.text).toContain("CN-20260503-ABCD");
    expect(body.text).toContain("9900");
  });

  it("sends Resend email when RESEND_API_KEY and sender_email present", async () => {
    process.env.RESEND_API_KEY = "re_test_key";
    const { POST } = await import("../callback/route");
    const { data, signature } = makeCallbackPayload(SUCCESS_PAYLOAD);
    await POST(makeCallbackRequest({ data, signature }));
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.resend.com/emails",
      expect.objectContaining({ method: "POST" })
    );
  });

  it("does not send Resend email without RESEND_API_KEY", async () => {
    const { POST } = await import("../callback/route");
    const { data, signature } = makeCallbackPayload(SUCCESS_PAYLOAD);
    await POST(makeCallbackRequest({ data, signature }));
    const resendCalls = (global.fetch as jest.Mock).mock.calls.filter(([url]) =>
      String(url).includes("resend.com")
    );
    expect(resendCalls).toHaveLength(0);
  });

  it("does not notify when status is not success/sandbox", async () => {
    process.env.TELEGRAM_BOT_TOKEN = "tok";
    process.env.TELEGRAM_CHAT_ID = "42";
    process.env.RESEND_API_KEY = "re_test_key";
    const { POST } = await import("../callback/route");
    const failedPayload = { ...SUCCESS_PAYLOAD, status: "failure" };
    const { data, signature } = makeCallbackPayload(failedPayload);
    const res = await POST(makeCallbackRequest({ data, signature }));
    expect(res.status).toBe(200);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("returns 200 even when Telegram fetch fails (graceful degradation)", async () => {
    process.env.TELEGRAM_BOT_TOKEN = "tok";
    process.env.TELEGRAM_CHAT_ID = "42";
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));
    const { POST } = await import("../callback/route");
    const { data, signature } = makeCallbackPayload(SUCCESS_PAYLOAD);
    const res = await POST(makeCallbackRequest({ data, signature }));
    expect(res.status).toBe(200);
  });
});
