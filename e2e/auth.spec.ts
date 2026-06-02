import { test, expect } from "@playwright/test";

test.describe("Аутентифікація", () => {
  test("успішний вхід з демо-кредентіалами", async ({ page }) => {
    await page.goto("/marketplace/login");
    await page.getByLabel(/email/i).fill("demo@codeworth.uk");
    await page.getByLabel(/пароль/i).fill("demo123");
    await page.getByRole("button", { name: /увійти|вхід/i }).click();
    await page.waitForURL(/account/, { timeout: 5000 });
    await expect(page).toHaveURL(/marketplace\/account/);
  });

  test("показує помилку при неправильних даних", async ({ page }) => {
    await page.goto("/marketplace/login");
    await page.getByLabel(/email/i).fill("wrong@example.com");
    await page.getByLabel(/пароль/i).fill("wrongpassword");
    await page.getByRole("button", { name: /увійти|вхід/i }).click();
    await expect(page.getByRole("alert")).toBeVisible({ timeout: 3000 });
  });

  test("вихід з кабінету повертає на сторінку логіну", async ({ page }) => {
    // Log in first
    await page.goto("/marketplace/login");
    await page.getByLabel(/email/i).fill("demo@codeworth.uk");
    await page.getByLabel(/пароль/i).fill("demo123");
    await page.getByRole("button", { name: /увійти|вхід/i }).click();
    await page.waitForURL(/account/, { timeout: 5000 });

    // Log out
    await page.getByRole("button", { name: /вийти/i }).click();
    await page.waitForURL(/login/, { timeout: 3000 });
    await expect(page).toHaveURL(/login/);
  });
});
