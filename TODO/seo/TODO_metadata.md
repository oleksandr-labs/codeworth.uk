# Метадані (Metadata)
Опис: Оптимізація тегів title, description та структурованих даних для всіх сторінок.
**Статус:** Виконано
**✅ Проаналізовано 2026-05-01 — 19/21 задач виконані. Знайдено 2 відкриті пункти (нижче).**

---

## Title та Description
- [x] Унікальні Title та Description для головної сторінки (`layout.tsx`)
- [x] Title та Description для кожної сторінки послуг (через `export const metadata` в кожному page.tsx)
- [x] Title та Description для About, Portfolio, Pricing, FAQ, Contact, Niches
- [x] Динамічна генерація мета-тегів для блогу та ніш через `generateMetadata()`
- [x] Шаблон `title.template: "%s | CodeNest"` в root layout

## Open Graph (OG)
- [x] OG-теги для головної сторінки (og:title, og:description, og:image)
- [x] OG-теги для всіх сторінок через `metadata.openGraph`
- [x] Edge runtime OG image (`src/app/opengraph-image.tsx`) — 1200×630, indigo gradient
- [x] Twitter Card `summary_large_image` в root layout та окремих сторінках
- [ ] Перевірити OG через Facebook Sharing Debugger (після деплою)

## Schema.org (Structured Data)
- [x] Organization + WebSite (sitelinks searchbox) — `layout.tsx`
- [x] BreadcrumbList — `Breadcrumb` компонент (`src/components/ui/Breadcrumb.tsx`)
- [x] Product — сторінки маркетплейсу `/marketplace/product/[slug]`
- [x] FAQ — секції на сторінках послуг
- [x] LocalBusiness — `contact/page.tsx` (адреса, телефон, email, години роботи, методи оплати)
- [x] Article — `blog/[slug]/page.tsx` (headline, author, publisher, datePublished, keywords)
- [x] CreativeWork — `portfolio/[slug]/page.tsx` для кейсів портфоліо
- [x] ItemList — `services/page.tsx` (всі послуги), `extras/page.tsx` (42 доробки), `portfolio/page.tsx`
- [ ] Review/Rating — після накопичення реальних відгуків
- [x] Замінити placeholder телефон `+38-000-000-00-00` в Organization Schema — **виконано 2026-05-01**: contactPoint видалено, замінено на `email: "hello@codenest.com.ua"`

## Технічні мета-теги
- [x] H1 — один на кожній сторінці
- [x] `metadataBase: new URL("https://codenest.com.ua")` — canonical база
- [x] `robots: { index: true, follow: true }` на всіх публічних сторінках
- [x] viewport meta (автоматично Next.js App Router)

## Нові пункти (виявлено при аналізі 2026-05-01)
- [x] Замінити placeholder телефон — **виконано 2026-05-01**: contactPoint видалено з Organization Schema, `email: "hello@codenest.com.ua"` замість нього
- [x] `og:locale` для EN/UK — **виконано**: `locale: "en_GB"` + `alternateLocale: ["uk_UA"]` у root layout metadata
- [ ] Перевірити Google Rich Results Test після деплою (Article, FAQPage, Product, JobPosting, BreadcrumbList, AggregateRating)
- [x] `<html lang>` SSR — **виконано**: `lang={lang}` у `[lang]/layout.tsx` — EN-сторінки отримують `lang="en"`, UK-сторінки `lang="uk"` на рівні SSR

## Додаткові Schema.org типи (для майбутнього)
- [ ] **HowTo** Schema — для blog posts зі покроковими інструкціями (додати коли з'являться step-by-step пости)
- [ ] **SoftwareApplication** Schema — для SaaS продуктів у маркетплейсі (Phase 2 — після додавання реальних SaaS продуктів)
- [ ] **VideoObject** Schema — для сторінок портфоліо / ніш де є відео або YouTube embed (Phase 2 — після додавання відео)
- ✅ **Person** Schema — для авторів блогу — перевірено 2026-05-03: `blog/author/[slug]/page.tsx` генерує `Person` Schema; `blog/[slug]/page.tsx` Article schema збагачена (`jobTitle`, `url`, `worksFor`, `sameAs`)
- [ ] **Event** Schema — якщо плануються вебінари або онлайн-заходи
- [ ] **AggregateRating** Schema — після накопичення реальних відгуків (мін. 5 рецензій)
- [ ] **Speakable** Schema — виділити ключові абзаци для голосового пошуку

## Перевірки після деплою (чеклист)
- [ ] Google Rich Results Test — Article, FAQPage, Product, BreadcrumbList, LocalBusiness
- [ ] Facebook Sharing Debugger — OG теги для головної та ключових сторінок
- [ ] Twitter Card Validator — перевірити `summary_large_image` вигляд
- [ ] LinkedIn Post Inspector — перевірити OG для B2B аудиторії
- [ ] Schema Markup Validator (schema.org/validator) — перевірити всі JSON-LD блоки

---

### Примітки
- Кожен title має містити ключове слово ближче до початку та бути унікальним.
- OG-зображення: 1200x630 px, в форматі WebP.
- Перевіряти Schema.org через Google Rich Results Test після запуску.
