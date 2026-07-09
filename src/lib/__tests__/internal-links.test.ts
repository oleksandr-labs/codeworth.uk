/**
 * Internal Links Integrity Test
 *
 * Verifies that all internal hrefs referenced in data files
 * correspond to real pages in the app directory.
 */

import { SERVICES_DATA } from "../data/services";
import { BLOG_POSTS } from "../data/blog";
import { PROJECTS } from "../data/portfolio";
import { AI_NICHES } from "../data/aiNiches";
import { ML_NICHES } from "../data/mlNiches";
import fs from "fs";
import path from "path";

// All valid static routes (from src/app/*/page.tsx)
const VALID_STATIC_ROUTES = [
  "/",
  "/about",
  "/ai",
  "/ml",
  "/blog",
  "/contact",
  "/extras",
  "/faq",
  "/offline",
  "/portfolio",
  "/pricing",
  "/privacy",
  "/services",
  "/sitemap",
  "/startup",
  "/style-guide",
  "/terms-of-service",
  "/tools",
  "/use-cases",
];

// Dynamic route patterns
const VALID_DYNAMIC_PATTERNS = [
  /^\/services\/[a-z0-9-]+$/,
  /^\/blog\/[a-z0-9-]+$/,
  /^\/blog\/tag\/[a-z0-9-]+$/,
  /^\/blog\/author\/[a-z0-9-]+$/,
  /^\/blog\/category\/[a-z0-9-]+$/,
  /^\/portfolio\/[a-z0-9-]+$/,
  /^\/ai\/[a-z0-9-]+$/,
  /^\/ml\/[a-z0-9-]+$/,
  /^\/startup\/[a-z0-9-]+$/,
  /^\/use-cases\/[a-z0-9-]+$/,
  /^\/location\/[a-z0-9-]+$/,
  /^\/compare\/[a-z0-9-]+$/,
  /^\/glossary\/[a-z0-9-]+$/,
];

function isValidRoute(href: string): boolean {
  if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("#")) {
    return true;
  }
  if (VALID_STATIC_ROUTES.includes(href)) return true;
  return VALID_DYNAMIC_PATTERNS.some((pattern) => pattern.test(href));
}

describe("Internal Links Integrity", () => {
  it("all service slugs produce valid routes", () => {
    SERVICES_DATA.forEach((s) => {
      expect(isValidRoute(`/services/${s.slug}`)).toBe(true);
    });
  });

  it("all blog post slugs produce valid routes", () => {
    BLOG_POSTS.forEach((p) => {
      expect(isValidRoute(`/blog/${p.slug}`)).toBe(true);
    });
  });

  it("all portfolio slugs produce valid routes", () => {
    PROJECTS.forEach((p) => {
      expect(isValidRoute(`/portfolio/${p.slug}`)).toBe(true);
    });
  });

  it("all service pages physically exist in app directory", () => {
    const appDir = path.resolve(__dirname, "../../app");
    SERVICES_DATA.forEach(() => {
      // Dynamic route — check that [slug] page.tsx exists (under [lang] segment)
      const dynamicPage = path.join(appDir, "[lang]", "services", "[slug]", "page.tsx");
      expect(fs.existsSync(dynamicPage)).toBe(true);
    });
  });

  it("all blog pages physically exist in app directory", () => {
    const appDir = path.resolve(__dirname, "../../app");
    const dynamicPage = path.join(appDir, "[lang]", "blog", "[slug]", "page.tsx");
    expect(fs.existsSync(dynamicPage)).toBe(true);
  });

  it("all AI niche slugs produce valid routes", () => {
    AI_NICHES.forEach((n) => {
      expect(isValidRoute(`/ai/${n.slug}`)).toBe(true);
    });
  });

  it("all ML niche slugs produce valid routes", () => {
    ML_NICHES.forEach((n) => {
      expect(isValidRoute(`/ml/${n.slug}`)).toBe(true);
    });
  });

  it("AI/ML niche pages physically exist in app directory", () => {
    const appDir = path.resolve(__dirname, "../../app");
    expect(fs.existsSync(path.join(appDir, "[lang]", "ai", "[niche]", "page.tsx"))).toBe(true);
    expect(fs.existsSync(path.join(appDir, "[lang]", "ml", "[niche]", "page.tsx"))).toBe(true);
  });

  it("homepage ServicesSection only links to real service slugs", () => {
    // Regression test: ServicesSection.tsx previously hardcoded 8 service tiles with
    // 4 slugs (ml-models, fraud-detection, ai-chatbots, ai-consulting) that never
    // existed in SERVICES_DATA, producing 404s from the homepage. This test fails
    // if any hardcoded /services/:slug href drifts from the real service list again.
    const source = fs.readFileSync(
      path.resolve(__dirname, "../../components/home/ServicesSection.tsx"),
      "utf-8"
    );
    const hrefMatches = [...source.matchAll(/\/services\/([a-z0-9-]+)/g)].map((m) => m[1]);
    const validSlugs = new Set(SERVICES_DATA.map((s) => s.slug));
    hrefMatches.forEach((slug) => {
      expect(validSlugs.has(slug)).toBe(true);
    });
  });

  it("max depth from homepage is 3 clicks for all content", () => {
    // Depth 1: /, /services, /blog, /portfolio, /ai, /ml (from header)
    // Depth 2: /services/[slug], /blog/[slug], /portfolio/[slug], /ai/[niche], /ml/[niche]
    // Depth 3: /blog/tag/[tag], /blog/author/[slug], /blog/category/[cat]
    const depth2Routes = ["/ai/healthcare", "/ml/banking"];
    const depth3Routes = ["/blog/tag/seo", "/blog/author/olena-marchenko"];
    depth2Routes.forEach((route) => {
      expect(route.split("/").filter(Boolean).length).toBeLessThanOrEqual(2);
    });
    depth3Routes.forEach((route) => {
      expect(route.split("/").filter(Boolean).length).toBeLessThanOrEqual(3);
    });
  });
});
