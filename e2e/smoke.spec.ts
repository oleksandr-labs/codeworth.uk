/**
 * Smoke тести — базова перевірка після кожного деплою.
 * Covers: головна, форма контактів, маркетплейс, 404 сторінка, відсутність JS-помилок.
 */
import { test, expect } from "@playwright/test";

test.describe("Smoke Tests", () => {
  test("головна сторінка відкривається без помилок", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveTitle(/Codeworth/);
    expect(errors).toHaveLength(0);
  });

  test("сторінка контактів і форма завантажуються", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.locator("form").first()).toBeVisible();
    await expect(page.getByRole("button", { name: /надіслати|відправити/i })).toBeVisible();
  });

  test("маркетплейс каталог завантажується", async ({ page }) => {
    await page.goto("/marketplace/catalog");
    await expect(page.locator("h1").first()).toBeVisible();
    // Жодних JS-помилок
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    await page.waitForLoadState("domcontentloaded");
    expect(errors).toHaveLength(0);
  });

  test("404 сторінка відображається для неіснуючого шляху", async ({ page }) => {
    const response = await page.goto("/this-page-does-not-exist-12345");
    expect(response?.status()).toBe(404);
    // Сторінка має якийсь контент (не порожня)
    const bodyText = await page.locator("body").innerText();
    expect(bodyText.length).toBeGreaterThan(10);
  });

  test("сторінка послуг відкривається", async ({ page }) => {
    await page.goto("/services");
    await expect(page.locator("h1").first()).toBeVisible();
  });

  test("блог відкривається і показує пости", async ({ page }) => {
    await page.goto("/blog");
    await expect(page.locator("h1").first()).toBeVisible();
    // Має бути хоч одна посилання на пост
    const postLinks = page.locator('a[href*="/blog/"]');
    await expect(postLinks.first()).toBeVisible();
  });

  test("портфоліо відкривається", async ({ page }) => {
    await page.goto("/portfolio");
    await expect(page.locator("h1").first()).toBeVisible();
  });

  test("сторінка цін відкривається", async ({ page }) => {
    await page.goto("/pricing");
    await expect(page.locator("h1").first()).toBeVisible();
  });

  test("offline-сторінка відкривається", async ({ page }) => {
    await page.goto("/offline");
    await expect(page.locator("body")).toBeVisible();
  });
});
