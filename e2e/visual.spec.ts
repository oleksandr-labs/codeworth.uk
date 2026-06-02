/**
 * Visual regression тести — скріншоти ключових сторінок.
 * Перший запуск: npx playwright test visual --update-snapshots (створює baseline)
 * Наступні запуски: автоматично порівнюють зі збереженими скріншотами.
 * Локально: npx playwright test e2e/visual.spec.ts
 */
import { test, expect } from "@playwright/test";

// Дочекатися завантаження мережі та анімацій
async function waitForReady(page: import("@playwright/test").Page) {
  await page.waitForLoadState("networkidle");
  // Пауза щоб CSS-анімації завершились
  await page.waitForTimeout(300);
}

test.describe("Visual Regression", () => {
  test("головна сторінка — hero секція", async ({ page }) => {
    await page.goto("/");
    await waitForReady(page);
    // Знімаємо лише верхню частину (hero), щоб уникнути динамічного контенту внизу
    await expect(page).toHaveScreenshot("home-hero.png", {
      clip: { x: 0, y: 0, width: 1280, height: 700 },
      maxDiffPixelRatio: 0.02,
    });
  });

  test("сторінка послуг — hero", async ({ page }) => {
    await page.goto("/services");
    await waitForReady(page);
    await expect(page).toHaveScreenshot("services-hero.png", {
      clip: { x: 0, y: 0, width: 1280, height: 600 },
      maxDiffPixelRatio: 0.02,
    });
  });

  test("маркетплейс каталог — сітка карток", async ({ page }) => {
    await page.goto("/marketplace/catalog");
    await waitForReady(page);
    await expect(page).toHaveScreenshot("marketplace-catalog.png", {
      clip: { x: 0, y: 0, width: 1280, height: 800 },
      maxDiffPixelRatio: 0.02,
    });
  });

  test("сторінка цін — тарифні плани", async ({ page }) => {
    await page.goto("/pricing");
    await waitForReady(page);
    await expect(page).toHaveScreenshot("pricing.png", {
      clip: { x: 0, y: 0, width: 1280, height: 800 },
      maxDiffPixelRatio: 0.02,
    });
  });

  test("блог — список постів", async ({ page }) => {
    await page.goto("/blog");
    await waitForReady(page);
    await expect(page).toHaveScreenshot("blog-list.png", {
      clip: { x: 0, y: 0, width: 1280, height: 800 },
      maxDiffPixelRatio: 0.02,
    });
  });

  test("портфоліо — сітка проєктів", async ({ page }) => {
    await page.goto("/portfolio");
    await waitForReady(page);
    await expect(page).toHaveScreenshot("portfolio-grid.png", {
      clip: { x: 0, y: 0, width: 1280, height: 800 },
      maxDiffPixelRatio: 0.02,
    });
  });

  test("мобільна: головна — hero (375px)", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    await waitForReady(page);
    await expect(page).toHaveScreenshot("home-mobile-hero.png", {
      clip: { x: 0, y: 0, width: 375, height: 812 },
      maxDiffPixelRatio: 0.02,
    });
  });

  test("мобільна: маркетплейс каталог (375px)", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/marketplace/catalog");
    await waitForReady(page);
    await expect(page).toHaveScreenshot("marketplace-mobile.png", {
      clip: { x: 0, y: 0, width: 375, height: 812 },
      maxDiffPixelRatio: 0.02,
    });
  });
});
