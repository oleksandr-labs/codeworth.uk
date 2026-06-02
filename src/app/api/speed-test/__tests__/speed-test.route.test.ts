/**
 * Integration tests for /api/speed-test route.
 * Covers: rate limiting, URL validation, PSI API proxying, error handling.
 * @jest-environment node
 */

const mockRateLimit = jest.fn((_ip: string, _opts?: unknown) => ({
  success: true,
  remaining: 4,
  resetAt: Date.now() + 900000,
}));

jest.mock("@/lib/rateLimit", () => ({
  rateLimit: (ip: string, opts: unknown) => mockRateLimit(ip, opts),
  getClientIp: () => "127.0.0.1",
}));

const PSI_RESPONSE = {
  lighthouseResult: {
    categories: { performance: { score: 0.87 } },
    audits: {
      "largest-contentful-paint": { displayValue: "2.1 s" },
      "cumulative-layout-shift": { displayValue: "0.05" },
      "first-contentful-paint": { displayValue: "1.4 s" },
      "server-response-time": { displayValue: "280 ms" },
      "render-blocking-resources": {
        title: "Eliminate render-blocking resources",
        description: "Resources are blocking the first paint.",
        details: { type: "opportunity" },
        score: 0.4,
      },
      "unused-css-rules": {
        title: "Remove unused CSS",
        description: "Remove dead rules from stylesheets.",
        details: { type: "opportunity" },
        score: 0.7,
      },
      "uses-optimized-images": {
        title: "Efficiently encode images",
        description: "Optimized images load faster.",
        details: { type: "opportunity" },
        score: 0.85,
      },
    },
  },
};

global.fetch = jest.fn().mockResolvedValue({
  ok: true,
  json: async () => PSI_RESPONSE,
});

function makeRequest(body: unknown) {
  return new Request("http://localhost/api/speed-test", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": "127.0.0.1" },
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  jest.clearAllMocks();
  jest.resetModules();
  mockRateLimit.mockReturnValue({ success: true, remaining: 4, resetAt: Date.now() + 900000 });
  (global.fetch as jest.Mock).mockResolvedValue({ ok: true, json: async () => PSI_RESPONSE });
});

describe("POST /api/speed-test", () => {
  it("returns 200 with score and metrics for a valid URL", async () => {
    const { POST } = await import("../route");
    const res = await POST(makeRequest({ url: "https://codeworth.uk" }));
    expect(res.status).toBe(200);
    const data = await res.json() as Record<string, unknown>;
    expect(data.score).toBe(87);
    expect(data.lcp).toBe("2.1 s");
    expect(data.cls).toBe("0.05");
    expect(data.fcp).toBe("1.4 s");
    expect(data.ttfb).toBe("280 ms");
  });

  it("returns opportunities filtered to score < 0.9 and max 3", async () => {
    const { POST } = await import("../route");
    const res = await POST(makeRequest({ url: "https://codeworth.uk" }));
    const data = await res.json() as { opportunities: unknown[] };
    expect(Array.isArray(data.opportunities)).toBe(true);
    expect(data.opportunities.length).toBeLessThanOrEqual(3);
    // All three audits have score < 0.9
    expect(data.opportunities.length).toBe(3);
  });

  it("returns 429 when rate limit is exceeded", async () => {
    mockRateLimit.mockReturnValue({ success: false, remaining: 0, resetAt: Date.now() + 900000 });
    const { POST } = await import("../route");
    const res = await POST(makeRequest({ url: "https://example.com" }));
    expect(res.status).toBe(429);
    const data = await res.json() as { error: string };
    expect(data.error).toBeTruthy();
  });

  it("returns 400 for invalid JSON body", async () => {
    const { POST } = await import("../route");
    const req = new Request("http://localhost/api/speed-test", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": "127.0.0.1" },
      body: "not json!!!",
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("returns 400 when url field is missing", async () => {
    const { POST } = await import("../route");
    const res = await POST(makeRequest({ website: "https://example.com" }));
    expect(res.status).toBe(400);
    const data = await res.json() as { error: string };
    expect(data.error).toMatch(/url/i);
  });

  it("returns 400 when url is empty string", async () => {
    const { POST } = await import("../route");
    const res = await POST(makeRequest({ url: "" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 for invalid protocol (ftp://)", async () => {
    const { POST } = await import("../route");
    const res = await POST(makeRequest({ url: "ftp://example.com" }));
    expect(res.status).toBe(400);
    const data = await res.json() as { error: string };
    expect(data.error).toMatch(/Invalid URL/i);
  });

  it("returns 400 for a non-URL string", async () => {
    const { POST } = await import("../route");
    const res = await POST(makeRequest({ url: "not-a-url" }));
    expect(res.status).toBe(400);
  });

  it("returns 502 when PSI fetch throws a network error", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));
    const { POST } = await import("../route");
    const res = await POST(makeRequest({ url: "https://example.com" }));
    expect(res.status).toBe(502);
    const data = await res.json() as { error: string };
    expect(data.error).toMatch(/PageSpeed/i);
  });

  it("returns 502 when PSI API responds with non-ok status", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: { message: "Request rate exceeded" } }),
    });
    const { POST } = await import("../route");
    const res = await POST(makeRequest({ url: "https://example.com" }));
    expect(res.status).toBe(502);
  });

  it("handles null metric values gracefully", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        lighthouseResult: {
          categories: { performance: { score: 0.5 } },
          audits: {},
        },
      }),
    });
    const { POST } = await import("../route");
    const res = await POST(makeRequest({ url: "https://example.com" }));
    expect(res.status).toBe(200);
    const data = await res.json() as Record<string, unknown>;
    expect(data.score).toBe(50);
    expect(data.lcp).toBeNull();
    expect(data.cls).toBeNull();
    expect(data.opportunities).toEqual([]);
  });

  it("calls the PSI API with mobile strategy and performance category", async () => {
    const { POST } = await import("../route");
    await POST(makeRequest({ url: "https://codeworth.uk" }));
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("strategy=mobile"),
      expect.objectContaining({ cache: "no-store" })
    );
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("category=performance"),
      expect.anything()
    );
  });
});

export {};
