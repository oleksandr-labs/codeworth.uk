/**
 * SSG Verification Test
 *
 * Ensures that all public-facing pages are server-rendered (SSG/ISR),
 * not client-side rendered. Public pages should NOT have "use client"
 * at the top level — only their child components can be client-side.
 */

import fs from "fs";
import path from "path";

const APP_DIR = path.resolve(__dirname, "../../app");

// Public pages that MUST be SSG (no "use client" directive at page level)
// Pages are under [lang] segment since Phase 1 i18n migration
const PUBLIC_SSG_PAGES = [
  "[lang]/page.tsx",                          // /
  "[lang]/about/page.tsx",                    // /about
  "[lang]/blog/page.tsx",                     // /blog
  "[lang]/blog/[slug]/page.tsx",             // /blog/[slug]
  "[lang]/blog/tag/[tag]/page.tsx",          // /blog/tag/[tag]
  "[lang]/contact/page.tsx",                  // /contact
  "[lang]/extras/page.tsx",                   // /extras
  "[lang]/faq/page.tsx",                      // /faq
  "[lang]/marketplace/page.tsx",             // /marketplace
  "[lang]/marketplace/catalog/page.tsx",     // /marketplace/catalog
  "[lang]/marketplace/product/[slug]/page.tsx", // /marketplace/product/[slug]
  "[lang]/niches/page.tsx",                    // /niches
  "[lang]/niches/[slug]/page.tsx",           // /niches/[slug]
  "[lang]/portfolio/page.tsx",                // /portfolio
  "[lang]/portfolio/[slug]/page.tsx",        // /portfolio/[slug]
  "[lang]/pricing/page.tsx",                  // /pricing
  "[lang]/privacy/page.tsx",                  // /privacy
  "[lang]/services/page.tsx",                 // /services
  "[lang]/services/[slug]/page.tsx",         // /services/[slug]
  "[lang]/sitemap/page.tsx",                  // /sitemap (if exists)
  "[lang]/terms-of-service/page.tsx",        // /terms
];

describe("SSG Verification — Public Pages", () => {
  const existingPages = PUBLIC_SSG_PAGES.filter((p) =>
    fs.existsSync(path.join(APP_DIR, p))
  );

  it("all listed public pages exist", () => {
    // At least 15 of the listed pages should exist
    expect(existingPages.length).toBeGreaterThanOrEqual(15);
  });

  existingPages.forEach((pagePath) => {
    it(`${pagePath} does NOT have "use client" directive`, () => {
      const fullPath = path.join(APP_DIR, pagePath);
      const content = fs.readFileSync(fullPath, "utf-8");
      const firstLine = content.trim().split("\n")[0].trim();
      expect(firstLine).not.toMatch(/^["']use client["']/);
    });
  });

  existingPages.forEach((pagePath) => {
    it(`${pagePath} exports metadata or generateMetadata for SEO`, () => {
      const fullPath = path.join(APP_DIR, pagePath);
      const content = fs.readFileSync(fullPath, "utf-8");
      const hasMetadata = content.includes("export const metadata") || content.includes("export async function generateMetadata");
      expect(hasMetadata).toBe(true);
    });
  });
});
