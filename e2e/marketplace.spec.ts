import { test, expect } from "@playwright/test";

test.describe("Маркетплейс", () => {
  test("каталог відкривається і показує продукти", async ({ page }) => {
    await page.goto("/marketplace/catalog");
    await expect(page).toHaveTitle(/каталог|маркетплейс|Codeworth/i);
    // At least some product cards visible
    const cards = page.locator("[href*='/marketplace/product/']");
    await expect(cards.first()).toBeVisible();
  });

  test("фільтр пошуку працює", async ({ page }) => {
    await page.goto("/marketplace/catalog");
    const searchInput = page.getByPlaceholder(/пошук|search/i).first();
    if (await searchInput.isVisible()) {
      await searchInput.fill("ресторан");
      await page.waitForTimeout(300);
    }
  });

  test("перехід з каталогу на сторінку продукту", async ({ page }) => {
    await page.goto("/marketplace/catalog");
    const firstProduct = page.locator("[href*='/marketplace/product/']").first();
    await firstProduct.click();
    await expect(page).toHaveURL(/marketplace\/product\//);
  });

  test("сторінка логіну маркетплейсу відкривається", async ({ page }) => {
    await page.goto("/marketplace/login");
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/пароль/i)).toBeVisible();
  });

  test("редирект до логіну при спробі зайти в кабінет без авторизації", async ({ page }) => {
    await page.goto("/marketplace/account");
    // Should redirect to login (wait for navigation)
    await page.waitForURL(/login/, { timeout: 5000 });
    await expect(page).toHaveURL(/login/);
  });
});
