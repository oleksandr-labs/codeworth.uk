/**
 * SEO QA тести — автоматична перевірка SEO-вимог на ключових сторінках.
 * Covers: title, один H1, meta description, canonical URL, OG-теги (title/description/image),
 * twitter:card, robots.txt, sitemap.xml, manifest.json, динамічні сторінки.
 */
import { test, expect } from "@playwright/test";

const KEY_PAGES = [
  { path: "/", label: "Головна" },
  { path: "/about", label: "Про нас" },
  { path: "/services", label: "Послуги" },
  { path: "/portfolio", label: "Портфоліо" },
  { path: "/pricing", label: "Ціни" },
  { path: "/blog", label: "Блог" },
  { path: "/contact", label: "Контакти" },
  { path: "/faq", label: "FAQ" },
  { path: "/marketplace/catalog", label: "Маркетплейс каталог" },
  { path: "/marketplace", label: "Маркетплейс" },
  { path: "/extras", label: "Доробки" },
  { path: "/niches", label: "Ніші" },
  { path: "/privacy", label: "Конфіденційність" },
  { path: "/terms-of-service", label: "Угода" },
  { path: "/sitemap", label: "Карта сайту" },
];

const DYNAMIC_PAGES = [
  { path: "/blog/next-js-seo-guide-2024", label: "Blog post" },
  { path: "/services/website-development", label: "Service page" },
  { path: "/niches/restaurant", label: "Niche page" },
  { path: "/marketplace/product/restaurant", label: "Marketplace product" },
  { path: "/portfolio/devstart-edtech-platform", label: "Portfolio case" },
];

test.describe("SEO QA — технічні файли", () => {
  test("robots.txt відповідає 200 і містить User-agent", async ({ request }) => {
    const response = await request.get("/robots.txt");
    expect(response.status()).toBe(200);
    const text = await response.text();
    expect(text).toMatch(/User-agent/i);
  });

  test("sitemap.xml відповідає 200 і є валідним XML", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);
    const text = await response.text();
    expect(text).toContain("<urlset");
    expect(text).toContain("codeworth.uk");
  });

  test("sitemap.xml містить ключові URL", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    const text = await response.text();
    expect(text).toContain("/en/");
    expect(text).toContain("/uk/");
  });

  test("manifest.json відповідає 200", async ({ request }) => {
    const response = await request.get("/manifest.json");
    expect(response.status()).toBe(200);
    const json = await response.json();
    expect(json.name).toContain("Codeworth");
  });

  test("manifest.json має icons та start_url", async ({ request }) => {
    const response = await request.get("/manifest.json");
    const json = await response.json();
    expect(json.icons).toBeDefined();
    expect(Array.isArray(json.icons)).toBe(true);
    expect(json.start_url).toBeDefined();
  });
});

for (const { path, label } of KEY_PAGES) {
  test.describe(`SEO QA — ${label} (${path})`, () => {
    test(`title містить 'Codeworth'`, async ({ page }) => {
      await page.goto(path);
      await expect(page).toHaveTitle(/Codeworth/i);
    });

    test(`рівно один H1 на сторінці`, async ({ page }) => {
      await page.goto(path);
      const h1Count = await page.locator("h1").count();
      expect(h1Count).toBe(1);
    });

    test(`meta description присутній і не порожній`, async ({ page }) => {
      await page.goto(path);
      const metaDesc = page.locator('meta[name="description"]');
      await expect(metaDesc).toHaveAttribute("content", /.{20,}/);
    });

    test(`og:title присутній`, async ({ page }) => {
      await page.goto(path);
      const ogTitle = page.locator('meta[property="og:title"]');
      await expect(ogTitle).toHaveAttribute("content", /.+/);
    });

    test(`og:description присутній`, async ({ page }) => {
      await page.goto(path);
      const ogDesc = page.locator('meta[property="og:description"]');
      await expect(ogDesc).toHaveAttribute("content", /.+/);
    });

    test(`og:image присутній`, async ({ page }) => {
      await page.goto(path);
      const ogImage = page.locator('meta[property="og:image"]');
      await expect(ogImage).toHaveAttribute("content", /.+/);
    });

    test(`twitter:card присутній`, async ({ page }) => {
      await page.goto(path);
      const twitterCard = page.locator('meta[name="twitter:card"]');
      await expect(twitterCard).toHaveAttribute("content", /summary/);
    });

    test(`canonical URL присутній`, async ({ page }) => {
      await page.goto(path);
      const canonical = page.locator('link[rel="canonical"]');
      await expect(canonical).toHaveAttribute("href", /.+/);
    });
  });
}

test.describe("SEO QA — динамічні сторінки", () => {
  for (const { path, label } of DYNAMIC_PAGES) {
    test(`${label}: title та og:title присутні`, async ({ page }) => {
      await page.goto(path);
      await expect(page).toHaveTitle(/Codeworth/i);
      const ogTitle = page.locator('meta[property="og:title"]');
      await expect(ogTitle).toHaveAttribute("content", /.+/);
    });

    test(`${label}: один H1`, async ({ page }) => {
      await page.goto(path);
      const h1Count = await page.locator("h1").count();
      expect(h1Count).toBe(1);
    });

    test(`${label}: og:image присутній`, async ({ page }) => {
      await page.goto(path);
      const ogImage = page.locator('meta[property="og:image"]');
      await expect(ogImage).toHaveAttribute("content", /.+/);
    });

    test(`${label}: twitter:card присутній`, async ({ page }) => {
      await page.goto(path);
      const twitterCard = page.locator('meta[name="twitter:card"]');
      await expect(twitterCard).toHaveAttribute("content", /summary/);
    });

    test(`${label}: canonical URL присутній`, async ({ page }) => {
      await page.goto(path);
      const canonical = page.locator('link[rel="canonical"]');
      await expect(canonical).toHaveAttribute("href", /.+/);
    });
  }
});

test.describe("SEO QA — Schema.org JSON-LD", () => {
  test("головна сторінка має Organization або WebSite schema", async ({ page }) => {
    await page.goto("/");
    const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
    const hasOrg = schemas.some((s) => s.includes("Organization") || s.includes("WebSite"));
    expect(hasOrg).toBe(true);
  });

  test("blog post має Article schema", async ({ page }) => {
    await page.goto("/blog/next-js-seo-guide-2024");
    const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
    const hasArticle = schemas.some((s) => s.includes("Article"));
    expect(hasArticle).toBe(true);
  });

  test("blog listing має CollectionPage або ItemList schema", async ({ page }) => {
    await page.goto("/blog");
    const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
    const hasCollection = schemas.some((s) => s.includes("CollectionPage") || s.includes("ItemList"));
    expect(hasCollection).toBe(true);
  });

  test("FAQ сторінка має FAQPage schema", async ({ page }) => {
    await page.goto("/faq");
    const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
    const hasFAQ = schemas.some((s) => s.includes("FAQPage"));
    expect(hasFAQ).toBe(true);
  });

  test("усі BreadcrumbList schema мають позиції", async ({ page }) => {
    await page.goto("/blog/next-js-seo-guide-2024");
    const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
    const breadcrumb = schemas.find((s) => s.includes("BreadcrumbList"));
    expect(breadcrumb).toBeDefined();
    expect(breadcrumb).toContain("itemListElement");
  });
});
