 Продуктивність та оптимізація (Optimization)
Опис: Технічна продуктивність, швидкість завантаження та покращення Core Web Vitals для **codenest.com.ua**.
**Статус:** Частково виконано
**✅ Проаналізовано 2026-05-01 — 41/56 задач виконані.**

---

> ⚠️ **Незакреслені пункти ([ ]) — Phase 2/3:** потребують реального серверного оточення (Vercel, БД, API-ключі, домен). Реалізуються після деплою та на етапі запуску проєкту.


## Стратегія статичної генерації (SSG-First)
- ✅ Налаштувати Next.js 14+ App Router з SSG як стратегією за замовчуванням
- ✅ Визначити `generateStaticParams()` для всіх динамічних маршрутів (блог, послуги, ніші)
- ✅ Налаштувати ISR (Incremental Static Regeneration) для блогу (revalidate: 300с) та маркетплейсу (revalidate: 600с)
- ✅ Виключити CSR лише для авторизованих сторінок (кабінет, чекаут) — `AccountClient`, `CartClient`, `CheckoutForm`, `AdminClient`, `LoginForm` — CSR; всі публічні сторінки SSG
- ✅ ~~`output: 'export'`~~ — не потрібно, проєкт використовує API routes та ISR що потребують серверного рендерингу
- ✅ Перевірити що жодна публічна SEO-сторінка не рендериться через CSR — всі public routes в `src/app/` є Server Components з SSG/ISR
- ✅ Додати `sitemap.ts` та `robots.ts` як статичні файли у Next.js App Router
- [ ] Тестування часу холодного старту для всіх статичних маршрутів

---

## Зображення
- ✅ Конвертування всіх зображень у WebP/AVIF (з fallback на JPG/PNG)
- ✅ Адаптивні зображення (srcset, sizes)
- ✅ Ледаче завантаження зображень (lazy loading, loading="lazy") — Avatar.tsx + BeforeAfter.tsx (обидва зображення) + LightboxGallery thumbnails
- ✅ Blur placeholder / LQIP — `shimmer(w, h)` та `solidBlur(color)` у `src/lib/utils.ts`; застосовано до обох `<Image>` у `CatalogClient.tsx` (`placeholder="blur" blurDataURL={solidBlur()}`)
- ✅ Оптимізація зображень — `next/image` автоматично оптимізує; реальних фото поки немає (gradient placeholders)
- ✅ Next.js Image component — використовується `next/image` з обов'язковими width/height

## CSS та JS
- ✅ Мініфікація CSS та JavaScript
- ✅ Code splitting (розбиття на чанки)
- ✅ Tree shaking — автоматично через Next.js webpack production build
- ✅ Стиснення Gzip/Brotli на сервері
- ✅ Critical CSS — Next.js автоматично інлайнить критичні стилі при SSG/SSR
- ✅ Вилучення невикористаного CSS — Tailwind CSS v4 автоматично tree-shakes невикористані класи

## Шрифти
- ✅ WOFF2 формат — `next/font/google` автоматично завантажує WOFF2
- ✅ font-display: swap для швидкого рендерингу
- ✅ Preconnect/Preload для Google Fonts — `<link rel="preconnect" href="https://fonts.googleapis.com" />` + `fonts.gstatic.com` у `layout.tsx`; next/font автоматично self-hosts шрифти; видалено некоректний `rel="preload"` для домену (не файлу); додано `preconnect` для Vercel Analytics + `dns-prefetch` для Facebook/GA
- ✅ Self-hosting шрифтів (менше залежності від зовнішніх CDN) — `next/font` автоматично self-hosts шрифти при білді
- ✅ Variable fonts — Inter та JetBrains Mono є variable fonts через `next/font`

## Кешування
- ✅ Browser caching (Cache-Control headers)
- ✅ Service Worker для офлайн-доступу (PWA) — `public/sw.js` (cache-first static, network-first API), реєстрація через `ServiceWorkerRegister.tsx` у `layout.tsx`
- ✅ Кешування статичних ресурсів (1 рік) — `Cache-Control: public, max-age=31536000, immutable` для `/_next/static/*` у `next.config.ts`
- [ ] CDN кешування (Cloudflare, AWS CloudFront)
- ✅ Stale-While-Revalidate — реалізовано через ISR (revalidate) та Cache-Control headers у `next.config.ts`

## Core Web Vitals
- [ ] LCP (Largest Contentful Paint) < 2.5s
- [ ] INP (Interaction to Next Paint) < 200ms — **замінив FID у Core Web Vitals з березня 2024**
- [ ] CLS (Cumulative Layout Shift) < 0.1
- [ ] FCP (First Contentful Paint) < 1.8s
- [ ] TTFB (Time to First Byte) < 800ms
- [ ] Тестування через PageSpeed Insights
- [ ] Тестування через Lighthouse (Chrome DevTools)
- [ ] Регулярний моніторинг через Vercel Analytics або аналог

## JavaScript оптимізація
- ✅ Відкладене завантаження JS (defer, async) — Next.js автоматично додає `defer` до всіх script chunks; `strategy="afterInteractive"` для GA/FB Pixel
- ✅ Dynamic imports для важких компонентів (below-fold sections у `app/page.tsx`)
- ✅ Видалення framer-motion (~100kb) — замінено на pure CSS `@keyframes page-enter` у `globals.css`; `PageTransition.tsx` тепер без зовнішніх залежностей (2026-05-03)
- ✅ Видалення console.log з production — `next.config.ts` (`compiler.removeConsole`, зберігає error/warn)
- ✅ Оптимізація React-рендерингу (useMemo, useCallback) — `CatalogClient.tsx`, `PortfolioContent.tsx`, `Lightbox.tsx`

## Сервер та мережа
- ✅ HTTP/2 або HTTP/3
- ✅ Усі публічні сторінки — SSG (статична генерація при білді)
- ✅ ISR для блогу та маркетплейсу (фонове оновлення без перебудови)
- [ ] Edge Functions (Vercel Edge) для геолокації та A/B тестів
- [ ] Connection pooling для БД (Prisma + PgBouncer або Supabase)
- ✅ Prefetch посилань — Next.js `<Link>` автоматично prefetch при viewport entry (static) та hover (dynamic)

## Моніторинг продуктивності
- [ ] Real User Monitoring (RUM) через Vercel, Sentry
- ✅ Synthetic monitoring (Lighthouse CI) — `.lighthouserc.json` + `.github/workflows/lighthouse.yml` (аудит 4 ключових сторінок на PR, бюджет: LCP ≤ 2.5s, CLS ≤ 0.1, SEO ≥ 90%)
- ✅ Встановити бюджет продуктивності (performance budget) — `.lighthouserc.json` assertions
- ✅ Додати performance metrics до CI/CD — GitHub Actions Lighthouse workflow

## Специфічні покращення
- ✅ Prefetch критичних ресурсів — Next.js `<Link>` prefetches static routes on viewport entry; dynamic routes on hover
- ✅ Preload шрифтів та Hero-зображень — `next/font` auto-preloads fonts; `<link rel="preconnect">` у `layout.tsx`
- ✅ Resource hints (dns-prefetch, preconnect)
- ✅ Сторонні скрипти — тільки GA4, FB Pixel, Google Ads Tag (всі через `strategy="afterInteractive"` з env-guard)

---

### Примітки
- Швидкість є критичним фактором для SEO та користувацького досвіду, особливо для мобільних пристроїв.
- Мета: >90 балів у Google PageSpeed Insights (Mobile & Desktop).
- Тестувати на реальних пристроях і повільних з'єднаннях (3G).
