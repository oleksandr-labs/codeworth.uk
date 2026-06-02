/**
 * Robots.txt integrity test — verifies that the robots() function blocks
 * the correct private paths and does NOT block public SEO-critical pages.
 */

import robots from "../../app/robots";

type RobotsSingleRule = {
  userAgent?: string | string[];
  allow?: string | string[];
  disallow?: string | string[];
  crawlDelay?: number;
};

function getFirstRule(): RobotsSingleRule {
  const result = robots();
  const rules = result.rules;
  if (Array.isArray(rules)) return rules[0] as RobotsSingleRule;
  return rules as RobotsSingleRule;
}

function getDisallow(): string[] {
  const rule = getFirstRule();
  const d = rule.disallow;
  if (!d) return [];
  return Array.isArray(d) ? d : [d];
}

describe("robots.txt — blocked paths", () => {
  it("blocks /admin/", () => {
    expect(getDisallow()).toContain("/admin/");
  });

  it("blocks /api/", () => {
    expect(getDisallow()).toContain("/api/");
  });

  it("blocks /marketplace/account/", () => {
    expect(getDisallow()).toContain("/marketplace/account/");
  });

  it("blocks /_next/", () => {
    expect(getDisallow()).toContain("/_next/");
  });

  it("blocks query param patterns for crawl budget", () => {
    const d = getDisallow();
    expect(d.some((r) => r.includes("?sort="))).toBe(true);
    expect(d.some((r) => r.includes("?filter="))).toBe(true);
    expect(d.some((r) => r.includes("?page="))).toBe(true);
    expect(d.some((r) => r.includes("?category="))).toBe(true);
    expect(d.some((r) => r.includes("?tag="))).toBe(true);
  });
});

describe("robots.txt — public SEO pages NOT blocked", () => {
  it("does not block /ai/ niche pages", () => {
    const d = getDisallow();
    expect(d.every((r) => !r.startsWith("/ai"))).toBe(true);
  });

  it("does not block /ml/ niche pages", () => {
    const d = getDisallow();
    expect(d.every((r) => !r.startsWith("/ml"))).toBe(true);
  });

  it("does not block /services/", () => {
    const d = getDisallow();
    expect(d.every((r) => !r.startsWith("/services"))).toBe(true);
  });

  it("does not block /blog/", () => {
    const d = getDisallow();
    expect(d.every((r) => !r.startsWith("/blog"))).toBe(true);
  });

  it("does not block /marketplace/ product pages", () => {
    const d = getDisallow();
    expect(d.every((r) => !r.startsWith("/marketplace/product"))).toBe(true);
  });
});

describe("robots.txt — metadata", () => {
  it("has correct sitemap URL", () => {
    const result = robots();
    expect(result.sitemap).toBe("https://codeworth.uk/sitemap.xml");
  });

  it("has correct host", () => {
    const result = robots();
    expect(result.host).toBe("https://codeworth.uk");
  });
});
