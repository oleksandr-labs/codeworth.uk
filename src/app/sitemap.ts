import type { MetadataRoute } from "next";
import { SERVICES_DATA } from "@/lib/data/services";
import { BLOG_POSTS } from "@/lib/data/blog";
import { PROJECTS } from "@/lib/data/portfolio";
import { GEO_CITIES } from "@/lib/data/geo";
import { COMPARE_DATA } from "@/lib/data/compare";
import { GLOSSARY_TERMS } from "@/lib/data/glossary";
import { RESOURCES } from "@/lib/data/resources";
import { JOBS } from "@/lib/data/careers";
import { AI_NICHES } from "@/lib/data/aiNiches";
import { ML_NICHES } from "@/lib/data/mlNiches";
import { USE_CASES } from "@/lib/data/useCases";
import { STARTUP_SOLUTIONS } from "@/lib/data/startup";
import { TOOLS } from "@/lib/data/tools";
import { BLOG_AUTHORS } from "@/lib/data/blogAuthors";
import { BLOG_CATEGORIES } from "@/lib/data/blog";
import { locales, HREFLANG_CODES } from "@/i18n";

function getAllBlogTags(): string[] {
  return [...new Set(BLOG_POSTS.flatMap((p) => p.tags))];
}

const BASE_URL = "https://codeworth.uk";

type SitemapEntry = MetadataRoute.Sitemap[number];

function forLocale(
  locale: (typeof locales)[number],
  path: string,
  opts: Omit<SitemapEntry, "url" | "alternates">
): SitemapEntry {
  return {
    url: `${BASE_URL}/${locale}${path}`,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [HREFLANG_CODES[l], `${BASE_URL}/${l}${path}`])
      ),
    },
    ...opts,
  };
}

// Split the sitemap by locale (one file per language) so each generated
// file stays well under browsers'/crawlers' comfortable size — a single
// combined file with all locales exceeded 4,200 URLs / 1.6MB, which made
// Chrome silently fall back to rendering it as unstyled raw text instead
// of the usual XML tree view.
export async function generateSitemaps() {
  return locales.map((_, id) => ({ id }));
}

export default async function sitemap({ id }: { id: Promise<string> }): Promise<MetadataRoute.Sitemap> {
  const locale = locales[Number(await id)];
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
    { path: "/portfolio", freq: "weekly" as const, pri: 0.8 },
    { path: "/pricing", freq: "monthly" as const, pri: 0.8 },
    { path: "/blog", freq: "daily" as const, pri: 0.8 },
    { path: "/contact", freq: "monthly" as const, pri: 0.7 },
    { path: "/faq", freq: "monthly" as const, pri: 0.6 },
    { path: "/privacy", freq: "yearly" as const, pri: 0.3 },
    { path: "/terms-of-service", freq: "yearly" as const, pri: 0.3 },
    { path: "/sitemap", freq: "monthly" as const, pri: 0.4 },
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

  const staticPages = staticPaths.map(({ path, freq, pri }) =>
    forLocale(locale, path, { lastModified: now, changeFrequency: freq, priority: pri })
  );

  // Flagship services (own dedicated /ai and /ml niche-hub trees at priority 0.9) get a
  // slightly higher weight than the other 5 services that share their content depth.
  const FLAGSHIP_SERVICE_SLUGS = new Set(["artificial-intelligence", "machine-learning"]);
  const servicePages = SERVICES_DATA.map((s) =>
    forLocale(locale, `/services/${s.slug}`, {
      lastModified: now,
      changeFrequency: "monthly",
      priority: FLAGSHIP_SERVICE_SLUGS.has(s.slug) ? 0.9 : 0.8,
    })
  );

  const blogPages = BLOG_POSTS.map((p) =>
    forLocale(locale, `/blog/${p.slug}`, { lastModified: new Date(p.date), changeFrequency: "monthly", priority: 0.7 })
  );

  const blogTagPages = getAllBlogTags().map((tag) =>
    forLocale(locale, `/blog/tag/${encodeURIComponent(tag)}`, { lastModified: now, changeFrequency: "weekly", priority: 0.5 })
  );

  const portfolioPages = PROJECTS.map((p) =>
    forLocale(locale, `/portfolio/${p.slug}`, { lastModified: now, changeFrequency: "monthly", priority: 0.6 })
  );

  const geoPages = GEO_CITIES.map((c) =>
    forLocale(locale, `/location/${c.slug}`, { lastModified: now, changeFrequency: "monthly", priority: 0.8 })
  );

  const comparePages = COMPARE_DATA.map((c) =>
    forLocale(locale, `/compare/${c.slug}`, { lastModified: now, changeFrequency: "monthly", priority: 0.8 })
  );

  const glossaryTermPages = GLOSSARY_TERMS.map((t) =>
    forLocale(locale, `/glossary/${t.slug}`, { lastModified: now, changeFrequency: "monthly", priority: 0.7 })
  );

  const resourcePages = RESOURCES.map((r) =>
    forLocale(locale, `/resources/${r.slug}`, { lastModified: now, changeFrequency: "monthly", priority: 0.7 })
  );

  const careerPages = JOBS.map((j) =>
    forLocale(locale, `/careers/${j.slug}`, { lastModified: new Date(j.datePosted), changeFrequency: "weekly", priority: 0.6 })
  );

  const aiNichePages = AI_NICHES.map((n) =>
    forLocale(locale, `/ai/${n.slug}`, { lastModified: now, changeFrequency: "monthly", priority: 0.8 })
  );

  const mlNichePages = ML_NICHES.map((n) =>
    forLocale(locale, `/ml/${n.slug}`, { lastModified: now, changeFrequency: "monthly", priority: 0.8 })
  );

  const startupPages = STARTUP_SOLUTIONS.map((s) =>
    forLocale(locale, `/startup/${s.slug}`, { lastModified: now, changeFrequency: "monthly", priority: 0.7 })
  );

  const useCasePages = USE_CASES.map((uc) =>
    forLocale(locale, `/use-cases/${uc.slug}`, { lastModified: now, changeFrequency: "monthly", priority: 0.7 })
  );

  // Only tools with a built page (`isBuilt: true`) actually render at
  // /tools/[slug] — see generateStaticParams() in that route, which filters
  // on the same flag. Unbuilt "Coming Soon" entries would 404.
  const toolPages = TOOLS.filter((t) => t.isBuilt).map((t) =>
    forLocale(locale, `/tools/${t.slug}`, { lastModified: now, changeFrequency: "monthly", priority: 0.7 })
  );

  const blogAuthorPages = BLOG_AUTHORS.map((a) =>
    forLocale(locale, `/blog/author/${a.slug}`, { lastModified: now, changeFrequency: "monthly", priority: 0.6 })
  );

  const blogCategoryPages = BLOG_CATEGORIES.filter((c) => c.id !== "all").map((c) =>
    forLocale(locale, `/blog/category/${c.id}`, { lastModified: now, changeFrequency: "weekly", priority: 0.8 })
  );

  const allPages = [
    ...staticPages,
    ...servicePages,
    ...blogPages,
    ...blogTagPages,
    ...portfolioPages,
    ...geoPages,
    ...comparePages,
    ...glossaryTermPages,
    ...resourcePages,
    ...careerPages,
    ...aiNichePages,
    ...mlNichePages,
    ...startupPages,
    ...useCasePages,
    ...toolPages,
    ...blogAuthorPages,
    ...blogCategoryPages,
  ];

  // Some data sources (e.g. geo/compare/glossary) contain duplicate slugs,
  // which would otherwise emit the same URL twice — dedupe defensively.
  const seen = new Set<string>();
  return allPages.filter((entry) => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });
}
