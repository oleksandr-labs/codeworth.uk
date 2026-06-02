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
          "/marketplace/",
          "/marketplace/catalog",
          "/niches/",
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
          "/marketplace/cart/",
          "/marketplace/checkout/",
          "/marketplace/login/",
          "/marketplace/account/",
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
    sitemap: "https://codeworth.uk/sitemap.xml",
    host: "https://codeworth.uk",
  };
}
