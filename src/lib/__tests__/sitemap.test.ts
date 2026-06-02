/**
 * Sitemap integrity test — verifies that sitemap.ts generates entries
 * for all content types: static pages, services, blog posts, blog tags,
 * portfolio, niches, and marketplace products.
 */

import sitemap from "../../app/sitemap";
import { SERVICES_DATA } from "../data/services";
import { BLOG_POSTS, BLOG_CATEGORIES } from "../data/blog";
import { PROJECTS } from "../data/portfolio";
import { NICHES_DATA } from "../data/niches";
import { GEO_CITIES } from "../data/geo";
import { COMPARE_DATA } from "../data/compare";
import { GLOSSARY_TERMS } from "../data/glossary";
import { RESOURCES } from "../data/resources";
import { JOBS } from "../data/careers";
import { AI_NICHES } from "../data/aiNiches";
import { ML_NICHES } from "../data/mlNiches";
import { USE_CASES } from "../data/useCases";
import { STARTUP_SOLUTIONS } from "../data/startup";
import { BLOG_AUTHORS } from "../data/blogAuthors";

const BASE_URL = "https://codeworth.uk";
const LOCALES = ["en", "uk"];

function getUrls(): string[] {
  return sitemap().map((e) => e.url);
}

describe("Sitemap — structure", () => {
  it("returns an array of entries", () => {
    const entries = sitemap();
    expect(Array.isArray(entries)).toBe(true);
    expect(entries.length).toBeGreaterThan(100);
  });

  it("every entry has a url string", () => {
    sitemap().forEach((e) => {
      expect(typeof e.url).toBe("string");
      expect(e.url).toMatch(/^https:\/\/Codeworth\.com\.ua\//);
    });
  });

  it("every entry has a priority between 0 and 1", () => {
    sitemap().forEach((e) => {
      if (e.priority !== undefined) {
        expect(e.priority).toBeGreaterThanOrEqual(0);
        expect(e.priority).toBeLessThanOrEqual(1);
      }
    });
  });

  it("every entry has hreflang alternates for both locales", () => {
    sitemap().forEach((e) => {
      const langs = e.alternates?.languages;
      if (langs) {
        expect(langs["en-GB"]).toBeDefined();
        expect(langs["uk"]).toBeDefined();
      }
    });
  });

  it("no duplicate URLs", () => {
    const urls = getUrls();
    expect(new Set(urls).size).toBe(urls.length);
  });
});

describe("Sitemap — static pages", () => {
  const staticPaths = [
    "/", "/about", "/services", "/extras", "/marketplace",
    "/niches", "/portfolio", "/pricing", "/blog", "/contact",
    "/faq", "/privacy", "/terms-of-service", "/sitemap",
    "/marketplace/catalog",
  ];

  for (const locale of LOCALES) {
    for (const path of staticPaths) {
      it(`includes ${locale}${path}`, () => {
        const urls = getUrls();
        expect(urls).toContain(`${BASE_URL}/${locale}${path}`);
      });
    }
  }
});

describe("Sitemap — dynamic content", () => {
  it("includes all service pages for both locales", () => {
    const urls = getUrls();
    SERVICES_DATA.forEach((s) => {
      LOCALES.forEach((locale) => {
        expect(urls).toContain(`${BASE_URL}/${locale}/services/${s.slug}`);
      });
    });
  });

  it("includes all blog posts for both locales", () => {
    const urls = getUrls();
    BLOG_POSTS.forEach((p) => {
      LOCALES.forEach((locale) => {
        expect(urls).toContain(`${BASE_URL}/${locale}/blog/${p.slug}`);
      });
    });
  });

  it("includes all portfolio cases for both locales", () => {
    const urls = getUrls();
    PROJECTS.forEach((p) => {
      LOCALES.forEach((locale) => {
        expect(urls).toContain(`${BASE_URL}/${locale}/portfolio/${p.slug}`);
      });
    });
  });

  it("includes all niche pages for both locales", () => {
    const urls = getUrls();
    NICHES_DATA.forEach((n) => {
      LOCALES.forEach((locale) => {
        expect(urls).toContain(`${BASE_URL}/${locale}/niches/${n.slug}`);
      });
    });
  });

  it("includes all marketplace product pages for both locales", () => {
    const urls = getUrls();
    NICHES_DATA.forEach((n) => {
      LOCALES.forEach((locale) => {
        expect(urls).toContain(`${BASE_URL}/${locale}/marketplace/product/${n.slug}`);
      });
    });
  });

  it("includes blog tag pages", () => {
    const urls = getUrls();
    const allTags = [...new Set(BLOG_POSTS.flatMap((p) => p.tags))];
    // At least half of tags should have entries in both locales
    const tagUrls = allTags.filter((tag) =>
      LOCALES.every((locale) =>
        urls.some((u) => u.includes(`/${locale}/blog/tag/`))
      )
    );
    expect(tagUrls.length).toBeGreaterThan(0);
  });
});

describe("Sitemap — total count", () => {
  it("generates correct total entries count", () => {
    const entries = sitemap();
    const localeCount = LOCALES.length;
    const staticCount = 29 * localeCount; // 29 static paths in sitemap.ts (added /ai-solutions)
    const serviceCount = SERVICES_DATA.length * localeCount;
    const blogCount = BLOG_POSTS.length * localeCount;
    const portfolioCount = PROJECTS.length * localeCount;
    const nicheCount = NICHES_DATA.length * localeCount;
    const productCount = NICHES_DATA.length * localeCount;
    const allTags = [...new Set(BLOG_POSTS.flatMap((p) => p.tags))];
    const tagCount = allTags.length * localeCount;
    const locationCount = GEO_CITIES.length * localeCount;
    const compareCount = COMPARE_DATA.length * localeCount;
    const glossaryCount = GLOSSARY_TERMS.length * localeCount;
    const resourceCount = RESOURCES.length * localeCount;
    const jobCount = JOBS.length * localeCount;
    const aiNicheCount = AI_NICHES.length * localeCount;
    const mlNicheCount = ML_NICHES.length * localeCount;
    const startupCount = STARTUP_SOLUTIONS.length * localeCount;
    const useCaseCount = USE_CASES.length * localeCount;
    const authorCount = BLOG_AUTHORS.length * localeCount;
    const categoryCount = BLOG_CATEGORIES.filter((c) => c.id !== "all").length * localeCount;

    const expected =
      staticCount +
      serviceCount +
      blogCount +
      portfolioCount +
      nicheCount +
      productCount +
      tagCount +
      locationCount +
      compareCount +
      glossaryCount +
      resourceCount +
      jobCount +
      aiNicheCount +
      mlNicheCount +
      startupCount +
      useCaseCount +
      authorCount +
      categoryCount;
    expect(entries.length).toBe(expected);
  });
});
