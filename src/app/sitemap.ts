import type { MetadataRoute } from "next";
import { SERVICES_DATA } from "@/lib/data/services";
import { BLOG_POSTS } from "@/lib/data/blog";
import { PROJECTS } from "@/lib/data/portfolio";
import { NICHES_DATA } from "@/lib/data/niches";
import { GEO_CITIES } from "@/lib/data/geo";
import { COMPARE_DATA } from "@/lib/data/compare";
import { GLOSSARY_TERMS } from "@/lib/data/glossary";
import { RESOURCES } from "@/lib/data/resources";
import { JOBS } from "@/lib/data/careers";
import { AI_NICHES } from "@/lib/data/aiNiches";
import { ML_NICHES } from "@/lib/data/mlNiches";
import { USE_CASES } from "@/lib/data/useCases";
import { STARTUP_SOLUTIONS } from "@/lib/data/startup";
import { BLOG_AUTHORS } from "@/lib/data/blogAuthors";
import { BLOG_CATEGORIES } from "@/lib/data/blog";
import { locales, HREFLANG_CODES } from "@/i18n";

function getAllBlogTags(): string[] {
  return [...new Set(BLOG_POSTS.flatMap((p) => p.tags))];
}

const BASE_URL = "https://codeworth.uk";

type SitemapEntry = MetadataRoute.Sitemap[number];

function forAllLocales(
  path: string,
  opts: Omit<SitemapEntry, "url" | "alternates">
): SitemapEntry[] {
  return locales.map((locale) => ({
    url: `${BASE_URL}/${locale}${path}`,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [HREFLANG_CODES[l], `${BASE_URL}/${l}${path}`])
      ),
    },
    ...opts,
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPaths = [
    { path: "/", freq: "weekly" as const, pri: 1.0 },
    { path: "/about", freq: "monthly" as const, pri: 0.8 },
    { path: "/services", freq: "monthly" as const, pri: 0.9 },
    { path: "/ai", freq: "weekly" as const, pri: 0.9 },
    { path: "/ai-solutions", freq: "weekly" as const, pri: 0.85 },
    { path: "/ml", freq: "weekly" as const, pri: 0.9 },
    { path: "/use-cases", freq: "monthly" as const, pri: 0.8 },
    { path: "/extras", freq: "weekly" as const, pri: 0.9 },
    { path: "/marketplace", freq: "weekly" as const, pri: 0.9 },
    { path: "/niches", freq: "weekly" as const, pri: 0.8 },
    { path: "/portfolio", freq: "weekly" as const, pri: 0.8 },
    { path: "/pricing", freq: "monthly" as const, pri: 0.8 },
    { path: "/blog", freq: "daily" as const, pri: 0.8 },
    { path: "/contact", freq: "monthly" as const, pri: 0.7 },
    { path: "/faq", freq: "monthly" as const, pri: 0.6 },
    { path: "/privacy", freq: "yearly" as const, pri: 0.3 },
    { path: "/terms-of-service", freq: "yearly" as const, pri: 0.3 },
    { path: "/sitemap", freq: "monthly" as const, pri: 0.4 },
    { path: "/marketplace/catalog", freq: "weekly" as const, pri: 0.9 },
    { path: "/location", freq: "monthly" as const, pri: 0.8 },
    { path: "/compare", freq: "monthly" as const, pri: 0.8 },
    { path: "/glossary", freq: "weekly" as const, pri: 0.8 },
    { path: "/reviews", freq: "monthly" as const, pri: 0.8 },
    { path: "/resources", freq: "weekly" as const, pri: 0.8 },
    { path: "/careers", freq: "weekly" as const, pri: 0.7 },
    { path: "/partners", freq: "monthly" as const, pri: 0.7 },
    { path: "/tools", freq: "monthly" as const, pri: 0.8 },
    { path: "/startup", freq: "weekly" as const, pri: 0.8 },
    { path: "/showcase", freq: "monthly" as const, pri: 0.6 },
  ];

  const staticPages = staticPaths.flatMap(({ path, freq, pri }) =>
    forAllLocales(path, { lastModified: now, changeFrequency: freq, priority: pri })
  );

  const servicePages = SERVICES_DATA.flatMap((s) =>
    forAllLocales(`/services/${s.slug}`, { lastModified: now, changeFrequency: "monthly", priority: 0.8 })
  );

  const blogPages = BLOG_POSTS.flatMap((p) =>
    forAllLocales(`/blog/${p.slug}`, { lastModified: new Date(p.date), changeFrequency: "monthly", priority: 0.7 })
  );

  const blogTagPages = getAllBlogTags().flatMap((tag) =>
    forAllLocales(`/blog/tag/${encodeURIComponent(tag)}`, { lastModified: now, changeFrequency: "weekly", priority: 0.5 })
  );

  const portfolioPages = PROJECTS.flatMap((p) =>
    forAllLocales(`/portfolio/${p.slug}`, { lastModified: now, changeFrequency: "monthly", priority: 0.6 })
  );

  const nichePages = NICHES_DATA.flatMap((n) =>
    forAllLocales(`/niches/${n.slug}`, { lastModified: now, changeFrequency: "monthly", priority: 0.7 })
  );

  const marketplaceProductPages = NICHES_DATA.flatMap((n) =>
    forAllLocales(`/marketplace/product/${n.slug}`, { lastModified: now, changeFrequency: "monthly", priority: 0.8 })
  );

  const geoPages = GEO_CITIES.flatMap((c) =>
    forAllLocales(`/location/${c.slug}`, { lastModified: now, changeFrequency: "monthly", priority: 0.8 })
  );

  const comparePages = COMPARE_DATA.flatMap((c) =>
    forAllLocales(`/compare/${c.slug}`, { lastModified: now, changeFrequency: "monthly", priority: 0.8 })
  );

  const glossaryTermPages = GLOSSARY_TERMS.flatMap((t) =>
    forAllLocales(`/glossary/${t.slug}`, { lastModified: now, changeFrequency: "monthly", priority: 0.7 })
  );

  const resourcePages = RESOURCES.flatMap((r) =>
    forAllLocales(`/resources/${r.slug}`, { lastModified: now, changeFrequency: "monthly", priority: 0.7 })
  );

  const careerPages = JOBS.flatMap((j) =>
    forAllLocales(`/careers/${j.slug}`, { lastModified: new Date(j.datePosted), changeFrequency: "weekly", priority: 0.6 })
  );

  const aiNichePages = AI_NICHES.flatMap((n) =>
    forAllLocales(`/ai/${n.slug}`, { lastModified: now, changeFrequency: "monthly", priority: 0.8 })
  );

  const mlNichePages = ML_NICHES.flatMap((n) =>
    forAllLocales(`/ml/${n.slug}`, { lastModified: now, changeFrequency: "monthly", priority: 0.8 })
  );

  const startupPages = STARTUP_SOLUTIONS.flatMap((s) =>
    forAllLocales(`/startup/${s.slug}`, { lastModified: now, changeFrequency: "monthly", priority: 0.7 })
  );

  const useCasePages = USE_CASES.flatMap((uc) =>
    forAllLocales(`/use-cases/${uc.slug}`, { lastModified: now, changeFrequency: "monthly", priority: 0.7 })
  );

  const blogAuthorPages = BLOG_AUTHORS.flatMap((a) =>
    forAllLocales(`/blog/author/${a.slug}`, { lastModified: now, changeFrequency: "monthly", priority: 0.6 })
  );

  const blogCategoryPages = BLOG_CATEGORIES.filter((c) => c.id !== "all").flatMap((c) =>
    forAllLocales(`/blog/category/${c.id}`, { lastModified: now, changeFrequency: "weekly", priority: 0.8 })
  );

  return [
    ...staticPages,
    ...servicePages,
    ...blogPages,
    ...blogTagPages,
    ...portfolioPages,
    ...nichePages,
    ...marketplaceProductPages,
    ...geoPages,
    ...comparePages,
    ...glossaryTermPages,
    ...resourcePages,
    ...careerPages,
    ...aiNichePages,
    ...mlNichePages,
    ...startupPages,
    ...useCasePages,
    ...blogAuthorPages,
    ...blogCategoryPages,
  ];
}
