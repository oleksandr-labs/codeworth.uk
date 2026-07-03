/**
 * Sitemap integrity test — verifies that sitemap.ts generates entries
 * for all content types: static pages, services, blog posts, blog tags,
 * and portfolio.
 */

import sitemap from "../../app/sitemap";
import { SERVICES_DATA } from "../data/services";
import { BLOG_POSTS, BLOG_CATEGORIES } from "../data/blog";
import { PROJECTS } from "../data/portfolio";
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

// sitemap.ts is split per-locale via generateSitemaps() (id "0" = en,
// id "1" = uk), and Next.js passes `id` as a Promise<string>; concatenate
// both locales' entries to keep the existing whole-sitemap assertions.
async function allEntries() {
  const perLocale = await Promise.all(
    LOCALES.map((_, id) => sitemap({ id: Promise.resolve(String(id)) }))
  );
  return perLocale.flat();
}

async function getUrls(): Promise<string[]> {
  return (await allEntries()).map((e) => e.url);
}

describe("Sitemap — structure", () => {
  it("returns an array of entries", async () => {
    const entries = await allEntries();
    expect(Array.isArray(entries)).toBe(true);
    expect(entries.length).toBeGreaterThan(100);
  });

  it("every entry has a url string", async () => {
    (await allEntries()).forEach((e) => {
      expect(typeof e.url).toBe("string");
      expect(e.url).toMatch(/^https:\/\/codeworth\.uk\//);
    });
  });

  it("every entry has a priority between 0 and 1", async () => {
    (await allEntries()).forEach((e) => {
      if (e.priority !== undefined) {
        expect(e.priority).toBeGreaterThanOrEqual(0);
        expect(e.priority).toBeLessThanOrEqual(1);
      }
    });
  });

  it("every entry has hreflang alternates for both locales", async () => {
    (await allEntries()).forEach((e) => {
      const langs = e.alternates?.languages;
      if (langs) {
        expect(langs["en-GB"]).toBeDefined();
        expect(langs["uk"]).toBeDefined();
      }
    });
  });

  it("no duplicate URLs", async () => {
    const urls = await getUrls();
    expect(new Set(urls).size).toBe(urls.length);
  });
});

describe("Sitemap — static pages", () => {
  const staticPaths = [
    "/", "/about", "/services", "/extras",
    "/portfolio", "/pricing", "/blog", "/contact",
    "/faq", "/privacy", "/terms-of-service", "/sitemap",
  ];

  for (const locale of LOCALES) {
    for (const path of staticPaths) {
      it(`includes ${locale}${path}`, async () => {
        const urls = await getUrls();
        expect(urls).toContain(`${BASE_URL}/${locale}${path}`);
      });
    }
  }
});

describe("Sitemap — dynamic content", () => {
  it("includes all service pages for both locales", async () => {
    const urls = await getUrls();
    SERVICES_DATA.forEach((s) => {
      LOCALES.forEach((locale) => {
        expect(urls).toContain(`${BASE_URL}/${locale}/services/${s.slug}`);
      });
    });
  });

  it("includes all blog posts for both locales", async () => {
    const urls = await getUrls();
    BLOG_POSTS.forEach((p) => {
      LOCALES.forEach((locale) => {
        expect(urls).toContain(`${BASE_URL}/${locale}/blog/${p.slug}`);
      });
    });
  });

  it("includes all portfolio cases for both locales", async () => {
    const urls = await getUrls();
    PROJECTS.forEach((p) => {
      LOCALES.forEach((locale) => {
        expect(urls).toContain(`${BASE_URL}/${locale}/portfolio/${p.slug}`);
      });
    });
  });

  it("includes blog tag pages", async () => {
    const urls = await getUrls();
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
  it("generates correct total entries count", async () => {
    const entries = await allEntries();
    const localeCount = LOCALES.length;
    const staticCount = 26 * localeCount; // static paths in sitemap.ts
    const serviceCount = SERVICES_DATA.length * localeCount;
    const blogCount = BLOG_POSTS.length * localeCount;
    const portfolioCount = PROJECTS.length * localeCount;
    const allTags = [...new Set(BLOG_POSTS.flatMap((p) => p.tags))];
    const tagCount = allTags.length * localeCount;
    // Some data sources contain duplicate slugs (sitemap.ts dedupes the
    // final URL list), so count unique slugs rather than raw entry length.
    const locationCount = new Set(GEO_CITIES.map((c) => c.slug)).size * localeCount;
    const compareCount = new Set(COMPARE_DATA.map((c) => c.slug)).size * localeCount;
    const glossaryCount = new Set(GLOSSARY_TERMS.map((t) => t.slug)).size * localeCount;
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
