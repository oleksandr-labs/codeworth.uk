import { rateLimit, getClientIp } from "../rateLimit";

describe("rateLimit", () => {
  const ip = "192.168.1.100";
  const windowMs = 1000; // 1 second window for fast tests

  beforeEach(() => {
    // Use unique IPs per test to avoid cross-test interference
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("allows first request", () => {
    const id = `${ip}-allow-first-${Date.now()}`;
    const result = rateLimit(id, { limit: 3, windowMs });
    expect(result.success).toBe(true);
    expect(result.remaining).toBe(2);
  });

  it("allows requests up to the limit", () => {
    const id = `${ip}-up-to-limit-${Date.now()}`;
    const opts = { limit: 3, windowMs };
    rateLimit(id, opts);
    rateLimit(id, opts);
    const third = rateLimit(id, opts);
    expect(third.success).toBe(true);
    expect(third.remaining).toBe(0);
  });

  it("blocks requests over the limit", () => {
    const id = `${ip}-over-limit-${Date.now()}`;
    const opts = { limit: 2, windowMs };
    rateLimit(id, opts);
    rateLimit(id, opts);
    const blocked = rateLimit(id, opts);
    expect(blocked.success).toBe(false);
    expect(blocked.remaining).toBe(0);
  });

  it("returns resetAt in the future", () => {
    const id = `${ip}-reset-at-${Date.now()}`;
    const opts = { limit: 5, windowMs };
    const result = rateLimit(id, opts);
    expect(result.resetAt).toBeGreaterThan(Date.now());
  });

  it("resets count after window expires", () => {
    const id = `${ip}-reset-window-${Date.now()}`;
    const opts = { limit: 1, windowMs };
    rateLimit(id, opts); // use up the limit
    const blocked = rateLimit(id, opts);
    expect(blocked.success).toBe(false);

    // Advance time past the window
    jest.advanceTimersByTime(windowMs + 1);

    const allowed = rateLimit(id, opts);
    expect(allowed.success).toBe(true);
  });

  it("different IPs have separate limits", () => {
    const opts = { limit: 1, windowMs };
    const id1 = `ip1-separate-${Date.now()}`;
    const id2 = `ip2-separate-${Date.now()}`;
    rateLimit(id1, opts); // exhaust ip1
    const blocked = rateLimit(id1, opts);
    const allowed = rateLimit(id2, opts);
    expect(blocked.success).toBe(false);
    expect(allowed.success).toBe(true);
  });
});

function makeReq(headers: Record<string, string> = {}): Request {
  return { headers: { get: (k: string) => headers[k] ?? null } } as unknown as Request;
}

describe("getClientIp", () => {
  it("returns x-forwarded-for first IP", () => {
    const req = makeReq({ "x-forwarded-for": "1.2.3.4, 5.6.7.8" });
    expect(getClientIp(req)).toBe("1.2.3.4");
  });

  it("falls back to x-real-ip", () => {
    const req = makeReq({ "x-real-ip": "9.8.7.6" });
    expect(getClientIp(req)).toBe("9.8.7.6");
  });

  it("returns unknown when no IP header present", () => {
    const req = makeReq();
    expect(getClientIp(req)).toBe("unknown");
  });

  it("trims whitespace from forwarded IP", () => {
    const req = makeReq({ "x-forwarded-for": "  10.0.0.1  , 10.0.0.2" });
    expect(getClientIp(req)).toBe("10.0.0.1");
  });
});
