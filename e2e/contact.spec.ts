import { test, expect } from "@playwright/test";

test.describe("Контактна форма", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact");
  });

  test("сторінка контактів відкривається", async ({ page }) => {
    await expect(page).toHaveTitle(/контакт|Codeworth/i);
  });

  test("форма має поля ім'я, email, повідомлення", async ({ page }) => {
    await expect(page.getByLabel(/ім.я/i).first()).toBeVisible();
    await expect(page.getByLabel(/email/i).first()).toBeVisible();
    await expect(page.getByLabel(/повідомлення/i).first()).toBeVisible();
  });

  test("кнопка відправки присутня", async ({ page }) => {
    await expect(page.getByRole("button", { name: /надіслати|відправити/i })).toBeVisible();
  });

  test("показує помилку валідації при відправці порожньої форми", async ({ page }) => {
    await page.getByRole("button", { name: /надіслати|відправити/i }).click();
    // HTML5 validation prevents submission with empty required fields
    const nameInput = page.getByLabel(/ім.я/i).first();
    await expect(nameInput).toBeFocused();
  });
});
