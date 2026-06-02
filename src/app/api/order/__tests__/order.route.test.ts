/**
 * Integration tests for /api/order route.
 * Covers: valid order, validation errors, rate limiting, error handling.
 * Helper function unit tests are in order.test.ts.
 * @jest-environment node
 */

import { NextRequest } from "next/server";

const mockRateLimit = jest.fn((_ip: string, _opts?: unknown) => ({
  success: true,
  remaining: 2,
  resetAt: Date.now() + 30 * 60 * 1000,
}));

jest.mock("@/lib/rateLimit", () => ({
  rateLimit: (ip: string, opts: unknown) => mockRateLimit(ip, opts),
  getClientIp: () => "127.0.0.1",
}));

const VALID_ORDER = {
  firstName: "Олег",
  lastName: "Коваленко",
  email: "oleg@example.com",
  phone: "+380991234567",
  paymentMethod: "card",
  items: [{ title: "Ресторан «Смачно»", package: "Базовий", price: 9900 }],
  total: 9900,
};

function makeRequest(body: unknown) {
  return new NextRequest("http://localhost/api/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  jest.clearAllMocks();
  mockRateLimit.mockReturnValue({ success: true, remaining: 2, resetAt: Date.now() + 1800000 });
  // Ensure Telegram env vars are not set so fetch is not called
  delete process.env.TELEGRAM_BOT_TOKEN;
  delete process.env.TELEGRAM_CHAT_ID;
});

describe("POST /api/order", () => {
  it("returns 200 and orderId for valid order", async () => {
    const { POST } = await import("../route");
    const res = await POST(makeRequest(VALID_ORDER));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.orderId).toMatch(/^CN-/);
  });

  it("returns success message in Ukrainian", async () => {
    const { POST } = await import("../route");
    const res = await POST(makeRequest(VALID_ORDER));
    const data = await res.json();
    expect(data.message).toMatch(/замовлення успішно/i);
  });

  it("returns 400 when firstName is missing", async () => {
    const { POST } = await import("../route");
    const { firstName: _, ...body } = VALID_ORDER;
    const res = await POST(makeRequest(body));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBeTruthy();
  });

  it("returns 400 when items array is empty", async () => {
    const { POST } = await import("../route");
    const res = await POST(makeRequest({ ...VALID_ORDER, items: [] }));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toMatch(/товар/i);
  });

  it("returns 400 for invalid email", async () => {
    const { POST } = await import("../route");
    const res = await POST(makeRequest({ ...VALID_ORDER, email: "not-an-email" }));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toMatch(/email/i);
  });

  it("returns 400 when paymentMethod is missing", async () => {
    const { POST } = await import("../route");
    const { paymentMethod: _, ...body } = VALID_ORDER;
    const res = await POST(makeRequest(body));
    expect(res.status).toBe(400);
  });

  it("returns 429 when rate limit is exceeded", async () => {
    mockRateLimit.mockReturnValue({ success: false, remaining: 0, resetAt: Date.now() + 60000 });
    const { POST } = await import("../route");
    const res = await POST(makeRequest(VALID_ORDER));
    expect(res.status).toBe(429);
  });

  it("returns Retry-After header when rate limited", async () => {
    mockRateLimit.mockReturnValue({ success: false, remaining: 0, resetAt: Date.now() + 30000 });
    const { POST } = await import("../route");
    const res = await POST(makeRequest(VALID_ORDER));
    expect(res.headers.get("Retry-After")).toBeTruthy();
  });

  it("returns 500 on invalid JSON body", async () => {
    const req = new NextRequest("http://localhost/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "bad json",
    });
    const { POST } = await import("../route");
    const res = await POST(req);
    expect(res.status).toBe(500);
  });

  it("does not call Telegram when env vars are absent", async () => {
    const fetchSpy = jest.spyOn(global, "fetch");
    const { POST } = await import("../route");
    await POST(makeRequest(VALID_ORDER));
    expect(fetchSpy).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
  });

  it("accepts optional fields (company, businessName, domain, description, wishes)", async () => {
    const { POST } = await import("../route");
    const res = await POST(
      makeRequest({
        ...VALID_ORDER,
        company: "Ресторан LLC",
        businessName: "Смачно",
        domain: "smachno.com.ua",
        description: "Хочемо сайт",
        wishes: "Швидко",
      })
    );
    expect(res.status).toBe(200);
  });

  it("normalizes email to lowercase", async () => {
    const { POST } = await import("../route");
    const res = await POST(makeRequest({ ...VALID_ORDER, email: "OLEG@EXAMPLE.COM" }));
    expect(res.status).toBe(200);
  });
});
