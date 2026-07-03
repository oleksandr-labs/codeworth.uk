import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/en/",
          "/uk/",
          "/services/",
          "/blog/",
          "/portfolio/",
          "/about",
          "/pricing",
          "/contact",
          "/faq",
          "/glossary/",
          "/reviews",
          "/resources/",
          "/tools/",
          "/use-cases/",
          "/location/",
          "/compare/",
          "/careers/",
          "/partners",
          "/showcase",
          "/ai/",
          "/ml/",
        ],
        disallow: [
          // Auth & private user pages
          "/admin/",
          "/dashboard/",
          // API routes — never index
          "/api/",
          // Next.js internals
          "/_next/",
          // Crawl budget — prevent indexing query param variants
          "/*?sort=",
          "/*?filter=",
          "/*?page=",
          "/*?category=",
          "/*?tag=",
          "/*?q=",
          "/*?search=",
        ],
      },
      // Block AI training crawlers
      { userAgent: "GPTBot", disallow: ["/"] },
      { userAgent: "Google-Extended", disallow: ["/"] },
      { userAgent: "anthropic-ai", disallow: ["/"] },
      { userAgent: "ClaudeBot", disallow: ["/"] },
    ],
    // sitemap.ts is split per-locale via generateSitemaps() (→ /sitemap/0.xml,
    // /sitemap/1.xml); Next.js does not auto-generate a /sitemap.xml index for
    // that case, so list each locale file directly.
    sitemap: ["https://codeworth.uk/sitemap/0.xml", "https://codeworth.uk/sitemap/1.xml"],
    host: "https://codeworth.uk",
  };
}
