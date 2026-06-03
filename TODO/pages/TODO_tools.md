# Сторінка "Tools" — Безкоштовні Онлайн-Інструменти

**URL:** `/tools` + `/tools/[slug]`
**Пріоритет:** 🟡 Середній — lead magnet + SEO topical authority + backlinks
**Статус:** ✅ Завершено 2026-05-02 (session 32) — `src/app/[lang]/tools/[slug]/page.tsx` + **10/10 клієнтських компонентів реалізовано**: MetaTagGenerator, UtmBuilder, KeywordDensityChecker, ColorContrastChecker, RobotsTxtGenerator, WebsiteCostCalculator (4 кроки), SchemaGenerator (6 типів), SeoChecklist (30 пунктів), MobileReadinessChecker (22 пункти), **PageSpeedAudit** (Core Web Vitals via `/api/speed-test` → Google PSI, score ring, LCP/CLS/FCP/TTFB, opportunities) (`src/components/tools/`) — SSG, EN+UK, всі 10 інструментів активні
**i18n:** EN + UK

---

## Концепція

Безкоштовні мікро-інструменти, що:
1. Приваблюють organic трафік за інструментальними запитами
2. Демонструють технічну компетентність
3. Збирають email / leads через "отримати результат на пошту"
4. Отримують природні backlinks

Приклади успішних: Moz Free Tools, Ahrefs Free Tools, Hubspot Website Grader.

---

## Інструменти для реалізації (10 позицій)

### 🚀 Швидкодія та Технічне SEO

#### `tool-pagespeed-checker` — PageSpeed Аналізатор
- **Slug:** `pagespeed-checker`
- **Заголовок:** Перевірте швидкість свого сайту безкоштовно
- **Як працює:** Форма з URL → `fetch` до Google PageSpeed Insights API (безкоштовний) → відображення LCP/FID/CLS/Score
- **CTA:** "Отримати повний аудит сайту"
- **Складність реалізації:** Проста (публічний API)
- **SEO-запити:** "перевірити швидкість сайту", "pagespeed checker", "core web vitals перевірка"

#### `tool-seo-checker` — Базовий SEO Чекер
- **Slug:** `seo-checker`
- **Заголовок:** Перевірте SEO вашої сторінки
- **Як працює:** Форма URL → власний парсер (fetch → parse HTML) → перевірка:
  - title (довжина, наявність)
  - meta description (довжина)
  - h1 (кількість)
  - alt texts (зображення без alt)
  - canonical URL
  - robots meta
- **CTA:** "Замовити повний SEO-аудит"
- **SEO-запити:** "seo аудит сайту безкоштовно", "перевірити seo сторінки"

#### `tool-meta-generator` — Генератор Meta-тегів
- **Slug:** `meta-generator`
- **Заголовок:** Згенеруйте ідеальні SEO meta-теги
- **Як працює:** Форма (назва сторінки + ключові слова + тип + URL) → генерує:
  - `<title>` (≤60 символів, з попередженням)
  - `<meta description>` (≤160 символів)
  - Open Graph теги
  - Twitter Card
- **Output:** Копіювання одним кліком, готовий HTML
- **SEO-запити:** "генератор meta тегів", "meta description generator"

---

### 🎨 Дизайн та Колір

#### `tool-color-palette` — Генератор Палітри Кольорів
- **Slug:** `color-palette`
- **Заголовок:** Згенеруйте кольорову палітру для вашого бренду
- **Як працює:**
  - Input: основний колір (color picker або HEX)
  - Генерує: основний + 4 відтінки + нейтральні + акцент (алгоритм HSL)
  - Також: перевірка контрастності WCAG AA/AAA
  - Export: CSS variables, Tailwind config, PNG
- **SEO-запити:** "генератор кольорів для сайту", "кольорова палітра бренду"

#### `tool-contrast-checker` — Перевірка Контрастності
- **Slug:** `contrast-checker`
- **Заголовок:** Перевірте контрастність кольорів для доступності
- **Як працює:** 2 color picker → розрахунок WCAG ratio → AA/AAA pass/fail
- **SEO-запити:** "contrast ratio checker", "перевірка доступності кольорів"

---

### 💰 Бізнес-Калькулятори

#### `tool-website-cost-calculator` — Калькулятор Вартості Сайту
- **Slug:** `website-cost-calculator`
- **Заголовок:** Скільки коштує розробка сайту? Розрахуйте за 2 хвилини
- **Як працює:** Покроковий вибір (тип → функції → ніша → термін) → розрахунок діапазону вартості
- **Кроки:**
  1. Тип сайту (лендінг / корпоративний / e-commerce / портал)
  2. Функції (онлайн-запис / кошик / CRM / блог / мультимова)
  3. Складність дизайну (шаблон / кастомний / преміум)
  4. Терміни (2 тиж / 1 міс / 2 міс)
- **Output:** Діапазон ціни (мін–макс) + деталізація по статтях
- **CTA:** "Отримати точну пропозицію"
- **SEO-запити:** "скільки коштує сайт 2026", "вартість розробки сайту калькулятор"

#### `tool-roi-calculator` — Калькулятор ROI Сайту
- **Slug:** `roi-calculator`
- **Заголовок:** Розрахуйте окупність інвестицій у сайт
- **Як працює:**
  - Поточний стан: трафік / конверсія / середній чек / кількість клієнтів
  - Очікувані зміни: % росту трафіку / конверсії
  - Output: місяці окупності, додатковий дохід за 12 міс
- **CTA:** "Обговорити проєкт"
- **SEO-запити:** "ROI сайту калькулятор", "окупність розробки сайту"

---

### ✍️ Контент та Тексти

#### `tool-readability-checker` — Перевірка Читабельності
- **Slug:** `readability-checker`
- **Заголовок:** Перевірте читабельність ваших текстів
- **Як працює:** Textarea → аналіз:
  - Flesch Reading Ease (адаптований для UK)
  - Середня довжина речення
  - Відсоток складних слів
  - Кількість слів / символів / параграфів
  - Рекомендації: "Речення задовгі", "Використовуйте більше активного стану"
- **SEO-запити:** "перевірити читабельність тексту", "readability checker"

#### `tool-word-counter` — Лічильник Слів і Символів
- **Slug:** `word-counter`
- **Заголовок:** Підрахуйте слова, символи та час читання
- **Як працює:** Textarea (realtime) → слова / символи / символи без пробілів / речення / абзаци / час читання (200 сл/хв)
- **SEO-запити:** "лічильник слів онлайн", "word counter"

---

### 🔒 Безпека

#### `tool-password-generator` — Генератор Паролів
- **Slug:** `password-generator`
- **Заголовок:** Згенеруйте надійний пароль
- **Як працює:** Налаштування (довжина / великі / малі / цифри / спецсимволи) → генерація + індикатор надійності + копіювання
- **SEO-запити:** "генератор паролів онлайн", "strong password generator"

---

## Технічна реалізація

### Структура файлів
```
src/lib/data/tools.ts                  — метадані 10 інструментів
src/app/[lang]/tools/
  page.tsx                              — хаб-сторінка зі списком інструментів
  [slug]/page.tsx                       — окремий інструмент (React client component)
src/components/tools/
  PageSpeedChecker.tsx
  SeoChecker.tsx
  MetaGenerator.tsx
  ColorPalette.tsx
  ContrastChecker.tsx
  WebsiteCostCalculator.tsx
  RoiCalculator.tsx
  ReadabilityChecker.tsx
  WordCounter.tsx
  PasswordGenerator.tsx
```

### Схема об'єкта (tools.ts)
```ts
interface Tool {
  slug: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  category: "seo" | "design" | "calculator" | "content" | "security";
  emoji: string;
  isNew: boolean;
  isPopular: boolean;
  complexity: "simple" | "medium"; // для оцінки часу реалізації
}
```

### SEO на хабі `/tools`
- Title: "Безкоштовні онлайн-інструменти для сайту | CodeNest"
- H1: "Безкоштовні інструменти для розробників та власників бізнесу"
- Schema.org: ItemList + WebApplication для кожного інструменту

### SEO на кожному `/tools/[slug]`
- Title: "[Назва інструменту] — безкоштовно онлайн | CodeNest"
- Schema.org: WebApplication (applicationCategory: "Utilities")
- Canonical: `/tools/[slug]`

---

## Пріоритети реалізації

| Інструмент | Пріоритет | Час розробки |
|---|---|---|
| `website-cost-calculator` | 🔴 Критичний | 3 дні |
| `pagespeed-checker` | 🔴 Критичний | 1 день |
| `meta-generator` | 🟡 Середній | 1 день |
| `word-counter` | 🟡 Середній | 0.5 дня |
| `color-palette` | 🟡 Середній | 2 дні |
| `seo-checker` | 🟡 Середній | 2 дні (потрібен proxy/server) |
| `contrast-checker` | 🟢 Низький | 0.5 дня |
| `roi-calculator` | 🟢 Низький | 1 день |
| `readability-checker` | 🟢 Низький | 1 день |
| `password-generator` | 🟢 Низький | 0.5 дня |

**Всього:** ~12 днів розробки
**Мінімальний запуск (P0):** website-cost-calculator + pagespeed-checker + meta-generator = 5 днів

---

## Маркетинг та Поширення

- Кожен інструмент шерити в LinkedIn / Twitter як standalone tool
- Email lead: "Отримати повний звіт на пошту" → email capture
- Backlinks: Dev.to, DOU.ua, соц. мережі → природній link building
- Потенціал: Google Featured Snippets для запитів типу "как проверить скорость сайта"
