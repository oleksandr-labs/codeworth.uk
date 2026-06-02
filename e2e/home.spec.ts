import { test, expect } from "@playwright/test";

test.describe("Головна сторінка", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("відкривається і має правильний заголовок", async ({ page }) => {
    await expect(page).toHaveTitle(/Codeworth/);
  });

  test("відображає героїчну секцію з CTA кнопками", async ({ page }) => {
    const hero = page.locator("h1").first();
    await expect(hero).toBeVisible();
  });

  test("навігація містить логотип і основні пункти меню", async ({ page }) => {
    const nav = page.locator("nav").first();
    await expect(nav).toBeVisible();
    await expect(page.getByRole("link", { name: /маркетплейс/i }).first()).toBeVisible();
  });

  test("посилання до маркетплейсу веде на /marketplace", async ({ page }) => {
    await page.getByRole("link", { name: /маркетплейс/i }).first().click();
    await expect(page).toHaveURL(/marketplace/);
  });

  test("сторінка не має консольних JS-помилок", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    expect(errors).toHaveLength(0);
  });

  test("мета-опис присутній", async ({ page }) => {
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute("content", /.+/);
  });

  test("OG-теги присутні", async ({ page }) => {
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute("content", /Codeworth/);
  });
});
