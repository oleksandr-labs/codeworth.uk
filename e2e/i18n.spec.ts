/**
 * i18n E2E тести — перевірка що UK та EN версії сторінок рендеряться коректно.
 * Covers: locale redirect, lang-prefixed URLs, локалізований контент, hreflang, мовний перемикач.
 */
import { test, expect } from "@playwright/test";

// Key pages tested in both locales
const PAGES = [
  { path: "", label: "Головна" },
  { path: "/about", label: "Про нас" },
  { path: "/blog", label: "Блог" },
  { path: "/services", label: "Послуги" },
  { path: "/pricing", label: "Ціни" },
  { path: "/contact", label: "Контакти" },
  { path: "/extras", label: "Доробки" },
  { path: "/niches", label: "Ніші" },
];

test.describe("i18n — locale redirect", () => {
  test("/ redirects to /en/ or /uk/ (not bare /)", async ({ page }) => {
    await page.goto("/");
    await page.waitForURL(/\/(en|uk)(\/|$)/);
    expect(page.url()).toMatch(/\/(en|uk)(\/|$)/);
  });

  test("/about redirects to /en/about or /uk/about", async ({ page }) => {
    await page.goto("/about");
    await page.waitForURL(/\/(en|uk)\/about/);
    expect(page.url()).toMatch(/\/(en|uk)\/about/);
  });
});

test.describe("i18n — EN locale", () => {
  for (const { path, label } of PAGES) {
    test(`EN: ${label} (/en${path}) відкривається і має H1`, async ({ page }) => {
      await page.goto(`/en${path}`);
      await expect(page.locator("h1").first()).toBeVisible();
    });

    test(`EN: ${label} — html[lang] дорівнює "en"`, async ({ page }) => {
      await page.goto(`/en${path}`);
      const lang = await page.locator("html").getAttribute("lang");
      expect(lang).toBe("en");
    });
  }

  test("EN: title сторінки не містить лише кирилицю", async ({ page }) => {
    await page.goto("/en");
    const title = await page.title();
    // EN title should contain latin characters
    expect(title).toMatch(/[a-zA-Z]/);
  });

  test("EN: /en/blog — кнопка 'Read more' або аналог присутня", async ({ page }) => {
    await page.goto("/en/blog");
    await expect(page.locator("h1").first()).toBeVisible();
    // Blog should have article links
    const links = page.locator('a[href*="/en/blog/"]');
    await expect(links.first()).toBeVisible();
  });
});

test.describe("i18n — UK locale", () => {
  for (const { path, label } of PAGES) {
    test(`UK: ${label} (/uk${path}) відкривається і має H1`, async ({ page }) => {
      await page.goto(`/uk${path}`);
      await expect(page.locator("h1").first()).toBeVisible();
    });

    test(`UK: ${label} — html[lang] дорівнює "uk"`, async ({ page }) => {
      await page.goto(`/uk${path}`);
      const lang = await page.locator("html").getAttribute("lang");
      expect(lang).toBe("uk");
    });
  }

  test("UK: title головної містить українські символи", async ({ page }) => {
    await page.goto("/uk");
    const title = await page.title();
    expect(title).toMatch(/[а-яА-ЯіІїЇєЄ]/);
  });
});

test.describe("i18n — hreflang метадані", () => {
  const HREFLANG_PAGES = ["/en", "/uk", "/en/about", "/uk/about", "/en/blog", "/uk/blog"];

  for (const path of HREFLANG_PAGES) {
    test(`${path} — має hreflang alternate для обох мов`, async ({ page }) => {
      await page.goto(path);
      const hreflangEn = page.locator('link[rel="alternate"][hreflang="en"]');
      const hreflangUk = page.locator('link[rel="alternate"][hreflang="uk"]');
      await expect(hreflangEn).toHaveAttribute("href", /.+/);
      await expect(hreflangUk).toHaveAttribute("href", /.+/);
    });
  }
});

test.describe("i18n — динамічні сторінки", () => {
  test("EN: blog post відкривається", async ({ page }) => {
    await page.goto("/en/blog/next-js-seo-guide-2024");
    await expect(page.locator("h1").first()).toBeVisible();
    const lang = await page.locator("html").getAttribute("lang");
    expect(lang).toBe("en");
  });

  test("UK: blog post відкривається", async ({ page }) => {
    await page.goto("/uk/blog/next-js-seo-guide-2024");
    await expect(page.locator("h1").first()).toBeVisible();
    const lang = await page.locator("html").getAttribute("lang");
    expect(lang).toBe("uk");
  });

  test("EN: service page відкривається", async ({ page }) => {
    await page.goto("/en/services/website-development");
    await expect(page.locator("h1").first()).toBeVisible();
  });

  test("UK: service page відкривається", async ({ page }) => {
    await page.goto("/uk/services/website-development");
    await expect(page.locator("h1").first()).toBeVisible();
  });

  test("EN: niche page відкривається", async ({ page }) => {
    await page.goto("/en/niches/restaurant");
    await expect(page.locator("h1").first()).toBeVisible();
  });

  test("UK: niche page відкривається", async ({ page }) => {
    await page.goto("/uk/niches/restaurant");
    await expect(page.locator("h1").first()).toBeVisible();
  });

  test("EN: marketplace product відкривається", async ({ page }) => {
    await page.goto("/en/marketplace/product/restaurant");
    await expect(page.locator("h1").first()).toBeVisible();
  });

  test("UK: marketplace product відкривається", async ({ page }) => {
    await page.goto("/uk/marketplace/product/restaurant");
    await expect(page.locator("h1").first()).toBeVisible();
  });

  test("EN: portfolio case відкривається", async ({ page }) => {
    await page.goto("/en/portfolio/devstart-edtech-platform");
    await expect(page.locator("h1").first()).toBeVisible();
  });

  test("UK: portfolio case відкривається", async ({ page }) => {
    await page.goto("/uk/portfolio/devstart-edtech-platform");
    await expect(page.locator("h1").first()).toBeVisible();
  });
});

test.describe("i18n — OG метадані по локалях", () => {
  test("EN: og:title присутній на /en", async ({ page }) => {
    await page.goto("/en");
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute("content", /.+/);
  });

  test("UK: og:title присутній на /uk", async ({ page }) => {
    await page.goto("/uk");
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute("content", /.+/);
  });

  test("EN: og:url містить /en/ префікс", async ({ page }) => {
    await page.goto("/en");
    const ogUrl = page.locator('meta[property="og:url"]');
    await expect(ogUrl).toHaveAttribute("content", /\/en/);
  });

  test("UK: og:url містить /uk/ префікс", async ({ page }) => {
    await page.goto("/uk");
    const ogUrl = page.locator('meta[property="og:url"]');
    await expect(ogUrl).toHaveAttribute("content", /\/uk/);
  });
});
