/**
 * API forms (contact/apply/newsletter/partnership) return server-generated
 * strings (Zod validation messages, rate-limit/generic errors) that were
 * historically Ukrainian-only and overrode the client's own English
 * fallback text on `/en/*` pages. This maps the known message set so
 * routes can localize their JSON responses based on a `lang` field sent
 * by the client.
 */

export type ApiLang = "uk" | "en";

export function getRequestLang(body: unknown): ApiLang {
  if (body && typeof body === "object" && "lang" in body) {
    const l = (body as Record<string, unknown>).lang;
    if (l === "en") return "en";
  }
  return "uk";
}

const UK_TO_EN: Record<string, string> = {
  // Rate limit / generic
  "Забагато спроб. Спробуйте через кілька хвилин.": "Too many attempts. Please try again in a few minutes.",
  "Забагато спроб. Спробуйте пізніше.": "Too many attempts. Please try again later.",
  "Перевірка безпеки не пройдена. Спробуйте ще раз.": "Security check failed. Please try again.",
  "Некоректні дані": "Invalid data",
  "Невалідний JSON": "Invalid JSON",
  "Щось пішло не так. Спробуйте ще раз або напишіть нам у Telegram.":
    "Something went wrong. Please try again or message us on Telegram.",
  "Щось пішло не так. Спробуйте ще раз.": "Something went wrong. Please try again.",
  // Zod field messages (Contact / Apply / Partnership / Newsletter / Order / Login schemas)
  "Ім'я має містити мінімум 2 символи": "Name must be at least 2 characters",
  "Ім'я занадто довге": "Name is too long",
  "Вкажіть email або телефон": "Please provide an email or phone number",
  "Контакт занадто довгий": "Contact is too long",
  "Введіть коректний email": "Please enter a valid email",
  "Email занадто довгий": "Email is too long",
  "Вкажіть ім'я": "Please enter your first name",
  "Вкажіть прізвище": "Please enter your last name",
  "Введіть коректний телефон": "Please enter a valid phone number",
  "Додайте хоча б один товар": "Please add at least one item",
  "Пароль має містити мінімум 6 символів": "Password must be at least 6 characters",
  "Вкажіть бажану позицію": "Please enter the desired position",
  "Введіть коректне посилання": "Please enter a valid URL",
  "Розкажіть про себе (мінімум 20 символів)": "Tell us about yourself (minimum 20 characters)",
  "Cover letter занадто довгий": "Cover letter is too long",
  "Оберіть тип партнерства": "Please select a partnership type",
  // Success messages
  "Заявку отримано. Зв'яжемося протягом 2 годин!": "Request received. We'll be in touch within 2 hours!",
  "Дякуємо! Ви підписалися на розсилку Codeworth.": "Thanks! You're subscribed to the Codeworth newsletter.",
};

/** Translates a known server-generated message when lang is "en"; unknown strings pass through unchanged. */
export function localizeApiMessage(message: string, lang: ApiLang): string {
  if (lang !== "en") return message;
  return UK_TO_EN[message] ?? message;
}
