 Аналітика та відстеження (Analytics & Tracking)
Опис: Налаштування аналітики, конверсійного відстеження та SEO-моніторингу для EN та UK ринків.
**Статус:** Частково виконано

---

> ⚠️ **Незакреслені пункти ([ ]) — Phase 2:** потребують реального трафіку, акаунтів у SEO-інструментах або реєстрації в зовнішніх сервісах. Технічний SEO (sitemap, hreflang, schema) вже реалізовано у коді.


## Google Analytics 4 (GA4)
- [ ] Підключити GA4 Measurement ID до проекту
- [x] Перевірити що events надходять лише після cookie consent — ✅ `AnalyticsScripts.tsx` реалізовано: `cookieConsentUpdate` event + `consent.analytics` gate (2026-05-04 verified)
- [ ] Налаштувати GA4 Data Stream для codenest.com.ua
- [ ] Підключити GA4 до Google Search Console (GSC ↔ GA4 linkage)
- [ ] Налаштувати Enhanced Measurement: scroll, outbound clicks, file downloads, video engagement
- ✅ Перевірити що `page_view` трекається коректно для SPA-навігації — реалізовано 2026-05-03: `RouteTracker` клієнт-компонент (`usePathname` + `useEffect`) fires `gtag('event','page_view',{page_path,page_location})` при кожній зміні route. Додано до `[lang]/layout.tsx`

## Конверсійні події (GA4 Custom Events)
- [x] Утиліта `src/lib/analytics.ts` створена 2026-05-02 — типізовані функції для всіх подій, безпечна перевірка `window.gtag`
- [x] `lead_form_submit` — підключено в `ContactForm.tsx` (спрацьовує після успішного POST /api/contact)
- [x] `language_switch` — підключено в `Header.tsx` (desktop + mobile + mobile menu switcher)
- ✅ `marketplace_purchase` — підключено до checkout flow — реалізовано 2026-05-03: `CheckoutForm.tsx` викликає `analytics.marketplacePurchase` після успішного `/api/order` (перед `clearCart()`)
- ✅ `marketplace_view_item` — підключено до сторінки продукту — реалізовано 2026-05-03: `AddToCartSection.tsx` викликає `analytics.marketplaceViewItem(niche.slug)` в `useEffect` при монтуванні
- [x] `cta_click` — функція в analytics.ts, підключити до ключових CTA кнопок
- [x] `blog_read_complete` — функція в analytics.ts, підключити scroll listener на blog/[slug]
- [x] `portfolio_view` — функція в analytics.ts, підключити до portfolio/[slug]
- [x] `pricing_view` — функція в analytics.ts, підключити до pricing/page
- ✅ `contact_click` — клік на email та телефон підключено в `Footer.tsx` через `analytics.ctaClick()` (2026-05-02)
- ✅ Підключити `analytics.pricingView()` у `pricing/page.tsx` — `PageAnalytics` компонент (2026-05-02)
- ✅ Підключити `analytics.portfolioView(slug)` у `portfolio/[slug]/page.tsx` — `PageAnalytics` компонент (2026-05-02)
- ✅ Підключити `analytics.blogReadComplete(slug)` — scroll listener (90%) у blog/[slug] — реалізовано 2026-05-03: `ReadingProgress` оновлено з `slug` prop + `fired` ref, event тригериться при progress ≥ 90%
- ✅ Підключити `analytics.ctaClick()` до головних Hero CTA кнопок — `HeroSection.tsx` (consultation + portfolio, 2026-05-02). Також виправлено `Button.tsx`: передає `onClick` у Link-варіант.

## Google Search Console (GSC)
- [ ] Зареєструвати codenest.com.ua через DNS або HTML verification
- [ ] Подати XML Sitemap (`/sitemap.xml`)
- [ ] Налаштувати International Targeting (EN-GB + UK)
- [ ] Щотижня моніторити: Coverage, Performance, Core Web Vitals
- [ ] Налаштувати email-сповіщення про критичні помилки
- [ ] Перевірити hreflang помилки у звіті "International Targeting"

## Google Tag Manager (GTM) — опційно
- [ ] Вирішити: GTM або пряма інтеграція подій у коді
- [ ] Якщо GTM: налаштувати контейнер, triggers для всіх конверсій
- [ ] GTM Preview Mode — перевірити всі triggers перед публікацією

## Bing Webmaster Tools
- [ ] Зареєструвати сайт
- [ ] Подати sitemap
- [ ] Перевірити Bing URL Inspection Tool для ключових сторінок

## Мета / Facebook Pixel
- [ ] Facebook Pixel для ретаргетингу (якщо планується Facebook Ads)
- [ ] Standard Events: PageView, Lead, Purchase (маркетплейс)
- [ ] Custom Conversions: форма контакту, замовлення послуги
- [x] Завантажується лише після cookie consent — ✅ реалізовано в `AnalyticsScripts.tsx` (для FB Pixel + Google Ads також)

## Hotjar / Microsoft Clarity (UX аналітика)
- [ ] Підключити Microsoft Clarity (безкоштовно) — heatmaps + session recordings
- [ ] Аналізувати поведінку на ключових сторінках: головна, pricing, contact
- [ ] Визначити де користувачі залишають сторінку (exit rate)
- [ ] Тестувати форми: де втрачаємо ліди

## SEO Rank Tracking
- [ ] Налаштувати відстеження позицій у Ahrefs або Serpstat
- [ ] Список ключових слів для відстеження (EN: 20-30 запитів, UK: 20-30 запитів)
- [ ] Налаштувати weekly email-звіт про зміну позицій
- [ ] Конкурентний моніторинг: 3-5 конкурентів для порівняння

## Щомісячний SEO-звіт
- [ ] Шаблон звіту: органічний трафік (GA4), позиції (GSC/Ahrefs), CTR, Core Web Vitals
- [ ] KPIs: нові органічні сесії, leads з органіки, конверсія органіки, DR динаміка
- [ ] Порівняння MoM та YoY
- [ ] Звіт окремо для EN та UK трафіку (GA4 segments або GSC filter by country)

## Cookie Consent та GDPR
- [x] Analytics завантажуються лише після `cookieConsentUpdate` події (вже реалізовано)
- [ ] Перевірити Cookie Policy сторінку — всі треккери перераховані
- [ ] Privacy Policy містить згадку про GA4, Facebook Pixel, Hotjar
- [ ] GDPR compliance для UK ринку (UK GDPR після Brexit — аналогічний EU GDPR)

---

### Примітки
- GA4 обов'язковий. Universal Analytics (UA) більше не підтримується.
- Cookie consent ВАЖЛИВИЙ для UK ринку (UK GDPR / ICO вимоги).
- GSC + GA4 = базовий мінімум. Без них неможливо оцінити ефективність SEO.
- Переглядати дані щотижня, звіт — щомісяця.
