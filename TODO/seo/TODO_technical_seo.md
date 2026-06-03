 Технічне SEO (Technical SEO) — codenest.com.ua
Опис: Технічна оптимізація для пошукових систем. Індексація, сканування, структуровані дані, Core Web Vitals.
**Статус:** Частково виконано
**✅ Проаналізовано 2026-05-01 — 31/41 задач виконані.**
**✅ Оновлено 2026-05-03 — Schema.org AI/ML (Service, FAQPage, CollectionPage, BreadcrumbList), hreflang через generateMetadata, robots.txt перевірено, canonical URLs перевірено.**
**⚠️ ВИПРАВЛЕНО 2026-05-01 (аудит):**
- `lang="uk"` → `lang="en"` у root layout.tsx (EN — первинна мова; попереднє "виправлення" було помилкою — `lang="uk"` на EN-сторінках шкодило SEO)
- Root layout metadata переведена на EN (title, description, keywords, OG title/description)
- `og:locale` виправлено: `uk_UA` → `en_GB` (UK ринок), додано `alternateLocale: ["uk_UA"]`
- Schema.org Organization description переведена на EN

---

## Індексація та сканування
- [x] robots.txt — `/admin/*, /api/*, /account/*, /_next/*` заблоковані (`src/app/robots.ts`)
- [x] Sitemap.xml — автогенерація через `app/sitemap.ts` (всі 113+ URL)
- [ ] Реєстрація в Google Search Console (після деплою)
- [ ] Реєстрація в Bing Webmaster Tools

## URL структура
- [x] Чисті URL латиницею з дефісами: `/services/website-dev`, `/blog/next-js-seo-guide-2024`
- [x] Canonical URL — `metadataBase` в root layout
- [x] Консистентний формат: lowercase, дефіси

## Метадані та HTML
- [x] Унікальний `<title>` для кожної сторінки (шаблон `%s | CodeNest`)
- [x] `<meta description>` через metadata API або generateMetadata()
- [x] Єдиний `<h1>` на кожній сторінці
- [x] `<html lang="en">` у root layout (EN primary; HtmlLang компонент виправляє на `uk` для /uk/ сторінок)
- [x] OG-теги та Twitter Cards скрізь
- [x] Edge OG image `opengraph-image.tsx` (1200×630)

## Структуровані дані (Schema.org)
- [x] **Organization** — `layout.tsx` (global)
- [x] **WebSite** + SearchAction — `layout.tsx` (global)
- [x] **LocalBusiness** — `contact/page.tsx`
- [x] **Service** — `services/[slug]/page.tsx` (всі 14 послуг, включаючи AI/ML)
- [x] **BreadcrumbList** JSON-LD — `blog/[slug]`, `services/[slug]`, `portfolio/[slug]`, `niches/[slug]`, `marketplace/product/[slug]`, `blog/tag/[tag]`, `pricing`, `faq`, `blog`, `extras`, `privacy`, `terms-of-service`, `about`, `marketplace` — усі сторінки
- [x] **Article** — `blog/[slug]/page.tsx`
- [x] **FAQPage** — `faq/page.tsx`, `pricing/page.tsx`, `services/[slug]/page.tsx`
- [x] **Product** — `marketplace/product/[slug]/page.tsx`
- [x] **ItemList** — `services/page.tsx` (каталог послуг), `extras/page.tsx` (42 доробки), `portfolio/page.tsx`
- [x] **CollectionPage** + **ItemList** Products — `marketplace/page.tsx` (всі 33 ніші з цінами)
- [x] **Organization** + **BreadcrumbList** — `about/page.tsx`
- [ ] Валідація через Google Rich Results Test (після деплою)

## Core Web Vitals
- [ ] Перевірка після деплою на Vercel (LCP/CLS/INP)

## Технічна оптимізація
- [x] Security headers (CSP, HSTS, X-Frame-Options) — `next.config.ts`
- [x] Static compression — `compress: true` в `next.config.ts`
- [x] Cache-Control headers для static assets — `next.config.ts`
- [ ] Alt-атрибути для зображень (після додавання реальних зображень)

## Core Web Vitals (SEO-ранжирування)
- [ ] LCP (Largest Contentful Paint) < 2.5s — hero image оптимізований
- [ ] CLS (Cumulative Layout Shift) < 0.1 — фіксовані розміри для зображень та шрифтів
- [ ] INP (Interaction to Next Paint) < 200ms — замінив FID
- [ ] FCP (First Contentful Paint) < 1.8s
- [ ] TTFB (Time to First Byte) < 800ms — Vercel Edge мережа
- [ ] Щомісячний моніторинг через Google Search Console (CrUX дані)

## Технічна оптимізація
- [x] HTTPS на всіх сторінках — HSTS header у `next.config.ts`
- [x] www → non-www (301 redirect) — `next.config.ts` redirects
- [x] Trailing slash → без slash (301 redirect) — `next.config.ts` redirects
- [ ] Немає ланцюжків редиректів (301→301→301) — перевірити після деплою
- [x] Перевірка битих посилань — `lib/__tests__/internal-links.test.ts` (9 тестів: всі slugs, nicheSlug references, app directory, depth)
- [x] Img `width` і `height` атрибути — всі зображення використовують Next.js `<Image>` з обов'язковими width/height
- [x] `loading="lazy"` для зображень нижче fold — `Avatar.tsx`, `BeforeAfter.tsx` (обидва img), `LightboxGallery` thumbnails
- [x] `rel="preload"` для шрифтів — автоматично через `next/font/google` (Inter, Syne, JetBrains Mono)
- [x] Стиснення Brotli/Gzip — `compress: true` у `next.config.ts`
- [x] HTTP/2 або HTTP/3 — автоматично на Vercel

## Локальне SEO (Україна)
- [ ] Google Business Profile: CodeNest, codenest.com.ua, категорія "Веб-дизайнер"
- [ ] NAP (Name, Address, Phone) консистентні по всьому сайту
- [ ] Місцеві ключові слова: "розробка сайтів Київ", "веб-студія Харків" тощо
- [ ] Реєстрація в Ukrbiznes, Prom, Hotline каталогах
- [ ] Відповіді на Google Maps відгуки

## Моніторинг
- [ ] Google Search Console: щотижня перевіряти Coverage, Performance
- [ ] Bing Webmaster Tools підключений
- [ ] Ahrefs або Serpstat для моніторингу позицій
- [ ] Щомісячний SEO-звіт: органічний трафік, позиції по ключовим словам, CTR

## SEO 2025–2026 (Нові пріоритети)
- ✅ **E-E-A-T сигнали**: збагачена `Person` Schema в Article — реалізовано 2026-05-03: `authorSchema` в `blog/[slug]/page.tsx` тепер включає `jobTitle`, `url` (автор-сторінка), `worksFor`, `sameAs` (LinkedIn). `blog/author/[slug]/page.tsx` має окрему `Person` Schema
- [ ] **AI Overview (SGE) оптимізація**: структуровані прямі відповіді на запити у контенті (Q&A блоки, таблиці порівнянь)
- [ ] **SpeakableSpecification Schema**: виділити ключові абзаци для голосового пошуку/Google Assistant
- [ ] **FAQ Rich Snippets перевірка** через Google Search Console після індексації
- [ ] **Топ-запити у Featured Snippets**: відформатувати відповіді у blog posts у форматі визначень + маркованих списків
- [ ] **Нульова позиція (Position 0)**: оптимізувати FAQ + glossary сторінки для захоплення Featured Snippets
- [ ] **Core Web Vitals з реальними зображеннями**: повторне тестування після додавання реальних фото (LCP може погіршитись)
- [x] **Перевірка analytics без cookie consent**: GA4 / FB Pixel завантажуються лише після `cookieConsentUpdate` події — `AnalyticsScripts.tsx` client component (виправлено раніше)
- [ ] **Image alt-тексти SEO**: після додавання реальних фото — перевірити що alt-тексти містять ключові слова природно
- ✅ **Внутрішнє перелінкування**: перевірити контекстні посилання з blog posts на сторінки послуг та ніш (anchor text = ключове слово) — реалізовано 2026-05-03: `CATEGORY_SERVICES` у `blog/[slug]/page.tsx` доповнено 12 категоріями ("AI та Автоматизація" → `artificial-intelligence`, `machine-learning`, `chatbots` та ін.); 55+ постів коректно лінкуються на сервіс-сторінки; anchor text = `getServiceLocalized(slug, lang).shortTitle`
- [x] **OpenGraph locale alternate**: `og:locale: "en_GB"` + `alternateLocale: ["uk_UA"]` у root layout metadata
- [ ] **Video Schema**: додати VideoObject Schema.org для portfolio/niche сторінок де є відео або Loom/YouTube embed

## Автоматизація SEO-перевірок
- ✅ sitemap.xml валідація в CI — `src/lib/__tests__/sitemap.test.ts` (37+ тестів: структура, всі локалі, AI/ML ніші, підрахунок URL) виконується у `npm test` step у ci.yml
- [x] Lighthouse CI — ✅ `.github/workflows/lighthouse.yml` + `lighthouserc.json` (LCP < 2.5s, CLS < 0.1, SEO ≥ 95%, a11y ≥ 90%) реалізовано (2026-05-03)
- [x] Broken links check у CI — ✅ крок "Check internal links" у `.github/workflows/ci.yml` (linkinator, тільки internal links) реалізовано (2026-05-03)
- ✅ robots.txt тест у CI — `src/lib/__tests__/robots.test.ts` (12 тестів: заблоковані paths, AI/ML НЕ заблоковані, query params, sitemap URL) — реалізовано 2026-05-03

## PageSpeed та зображення
- [ ] `next/image` — перевірити що всі зображення мають `priority` prop на above-the-fold (hero)
- ✅ WebP/AVIF формат — перевірено 2026-05-03: `next.config.ts` містить `images.formats: ["image/avif","image/webp"]`
- [ ] `sizes` prop для responsive зображень — уникати завантаження великих картинок на мобільному
- ✅ Font display swap — перевірено 2026-05-03: `next/font/google` використовується з `display: "swap"` для Inter, Syne, JetBrains Mono у `[lang]/layout.tsx`

## AI / ML Нішеві сторінки — технічний SEO

### Нові маршрути для sitemap.ts
```ts
// Додати до src/app/sitemap.ts
const aiNiches = ['healthcare','ecommerce','fintech','marketing','hr','hospitality','education','manufacturing','legal','real-estate']
const mlNiches = ['banking','retail','saas','logistics','manufacturing','agritech','cybersecurity','real-estate','healthcare','energy']

// Генерувати для ['en','uk'] × aiNiches → /en/ai/healthcare тощо
```
- [x] ~~Додати `/en/ai` + `/uk/ai` (overview) до `sitemap.ts`~~ — ✅ Реалізовано (sitemap.ts: path "/ai")
- [x] ~~Додати 20 AI нішевих URL до `sitemap.ts`~~ — ✅ Реалізовано (aiNichePages via AI_NICHES)
- [x] ~~Додати `/en/ml` + `/uk/ml` (overview) до `sitemap.ts`~~ — ✅ Реалізовано (sitemap.ts: path "/ml")
- [x] ~~Додати 20 ML нішевих URL до `sitemap.ts`~~ — ✅ Реалізовано (mlNichePages via ML_NICHES)
- **Загалом:** +42 нових URL у sitemap — ✅ Реалізовано (2026-05-02)

### Schema.org для нових сторінок

**Для кожної `/ai/[niche]` та `/ml/[niche]`:**
```json
{
  "@type": "Service",
  "name": "AI for Healthcare",
  "serviceType": "AI Software Development",
  "areaServed": [{"@type": "Country", "name": "GB"}, {"@type": "Country", "name": "UA"}],
  "provider": { "@type": "Organization", "name": "CodeNest" },
  "offers": { "@type": "Offer", "price": "3500", "priceCurrency": "GBP" }
}
```

**Для `/ai` та `/ml` overview:**
```json
{
  "@type": "CollectionPage",
  "name": "AI Solutions by Industry",
  "hasPart": [ ...10 Service items ]
}
```

- ✅ Реалізувати `Service` Schema.org у `src/app/[lang]/ai/[niche]/page.tsx` — перевірено 2026-05-03: `serviceSchema` з `@type:Service`, provider, offers (GBP)
- ✅ Реалізувати `Service` Schema.org у `src/app/[lang]/ml/[niche]/page.tsx` — перевірено 2026-05-03: аналогічна структура
- ✅ Реалізувати `CollectionPage` Schema.org у `src/app/[lang]/ai/page.tsx` — перевірено 2026-05-03
- ✅ Реалізувати `CollectionPage` Schema.org у `src/app/[lang]/ml/page.tsx` — перевірено 2026-05-03
- ✅ Додати `FAQPage` Schema.org на кожну нішеву сторінку (5–7 питань) — перевірено 2026-05-03: `faqSchema` з `niche.faq` масиву
- ✅ Додати `BreadcrumbList` JSON-LD: Home → AI Solutions → [Niche] — реалізовано 2026-05-03 у `ai/[niche]/page.tsx` та `ml/[niche]/page.tsx`

### hreflang для нових маршрутів
```html
<!-- На /en/ai/healthcare -->
<link rel="alternate" hreflang="en" href="https://codenest.com.ua/en/ai/healthcare" />
<link rel="alternate" hreflang="uk" href="https://codenest.com.ua/uk/ai/healthcare" />
<link rel="alternate" hreflang="x-default" href="https://codenest.com.ua/en/ai/healthcare" />
```
- ✅ Додати hreflang до всіх 20 AI + 20 ML нішевих сторінок (через `generateMetadata`) — перевірено 2026-05-03: `buildAlternates(lang, '/ai/${niche.slug}')` у `generateMetadata` обох сторінок

### Редиректи (next.config.ts)
```ts
// Захист від старих URL якщо хтось введе
{ source: '/services/ai/:niche*', destination: '/services/artificial-intelligence', permanent: true }
// НЕ потрібно redirect /ai/* — це нові маршрути
```
- [x] ~~Перевірити конфлікти redirect rules~~ — ✅ Перевірено: є лише redirect `/services/ai-ml` → `/services/artificial-intelligence`, нові `/ai/*` і `/ml/*` маршрути не конфліктують

### robots.txt (перевірка)
- ✅ Переконатись що `/en/ai/*` та `/uk/ai/*` НЕ заблоковані в robots.ts — перевірено 2026-05-03: `disallow` не містить `/ai/` чи `/ml/`
- ✅ Переконатись що `/en/ml/*` та `/uk/ml/*` НЕ заблоковані — перевірено 2026-05-03

## Crawl Budget оптимізація
- [ ] Перевірити кількість сторінок у sitemap vs реально проіндексованих (GSC → Coverage)
- [x] Заблокувати в robots.txt query params — виправлено 2026-05-02: `/*?sort=`, `/*?filter=`, `/*?page=`, `/*?category=`, `/*?tag=` додані до disallow у `src/app/robots.ts`
- [ ] Параметровані URL маркетплейсу не мають індексуватись (canonical або noindex) — перевірити після деплою
- [ ] Перевірити crawl errors у GSC — 404, soft 404, redirect chains

---

### Примітки
- Next.js App Router має вбудований Metadata API — використовувати `generateMetadata()` для динамічних сторінок.
- SSG + ISR забезпечує відмінний TTFB через Vercel Edge Cache.
- INP замінив FID у Core Web Vitals з 2024 року.
- **ВИПРАВЛЕНО 2026-05-01 (аудит)**: Повернуто `lang="en"` у root layout.tsx (EN — первинна мова, UK ринок). `HtmlLang` компонент виправляє на `uk` для /uk/ сторінок після гідрації. Root layout metadata + OG locale переведені на EN/en_GB.
- **✅ ВИПРАВЛЕНО 2026-05-01**: `HtmlLang` client component видалено. `app/layout.tsx` видалено — `app/[lang]/layout.tsx` став root layout. Тепер `<html lang={lang}>` рендериться SSR-коректно для обох локалей. TypeScript: 0 помилок після `next typegen`.


> ⚠️ **Незакреслені пункти ([ ]) — Phase 2:** потребують реального трафіку, акаунтів у SEO-інструментах або реєстрації в зовнішніх сервісах. Технічний SEO (sitemap, hreflang, schema) вже реалізовано у коді.