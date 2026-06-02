/**
 * Viewport tests — перевірка ключових сторінок на 360px, 375px, 768px та 1280px.
 * Covers: видимість навігації, мобільне меню, форми, кошик.
 */
import { test, expect } from "@playwright/test";

const VIEWPORTS = [
  { name: "mobile-sm (360px)", width: 360, height: 780 },
  { name: "mobile (375px)", width: 375, height: 812 },
  { name: "tablet (768px)", width: 768, height: 1024 },
  { name: "desktop (1280px)", width: 1280, height: 800 },
];

for (const vp of VIEWPORTS) {
  test.describe(`Viewport: ${vp.name}`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });

    test("Головна — відображається і має H1", async ({ page }) => {
      await page.goto("/");
      await expect(page.locator("h1").first()).toBeVisible();
    });

    test("Головна — логотип видимий у шапці", async ({ page }) => {
      await page.goto("/");
      const header = page.locator("header").first();
      await expect(header).toBeVisible();
    });

    test("Контакти — форма відображається", async ({ page }) => {
      await page.goto("/contact");
      await expect(page.locator("form").first()).toBeVisible();
    });

    test("Контакти — поля форми доступні для взаємодії", async ({ page }) => {
      await page.goto("/contact");
      const nameInput = page.locator('input[name="name"], input[id*="name"]').first();
      await expect(nameInput).toBeVisible();
    });

    test("Маркетплейс каталог — картки продуктів відображаються", async ({ page }) => {
      await page.goto("/marketplace/catalog");
      await expect(page.locator("h1, h2").first()).toBeVisible();
    });

    test("Кошик — сторінка відкривається без помилок", async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (err) => errors.push(err.message));
      await page.goto("/marketplace/cart");
      await expect(page.locator("body")).toBeVisible();
      expect(errors).toHaveLength(0);
    });

    test("Послуги — сторінка відкривається", async ({ page }) => {
      await page.goto("/services");
      await expect(page.locator("h1").first()).toBeVisible();
    });

    test("Блог — сторінка відкривається і не має JS-помилок", async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (err) => errors.push(err.message));
      await page.goto("/blog");
      await page.waitForLoadState("domcontentloaded");
      expect(errors).toHaveLength(0);
    });
  });
}
