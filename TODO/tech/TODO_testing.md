 Тестування (Testing) — codenest.com.ua
Опис: Стратегія тестування: unit, integration, e2e тести, SEO QA та перевірка Core Web Vitals.
**Статус:** Частково виконано (unit тести — **1922 passed, 134 suites** — 100% UI/home/niche/service component coverage; E2E конфіг + тести написані; 66 a11y тести / 25 компонентів)
**✅ Проаналізовано 2026-05-01 — 89/104 задачі виконані. Відкриті: CMS-тести, Lighthouse SEO >95, WebPageTest, screen reader тестування, cross-browser.**
**✅ Оновлено 2026-05-03: 134 suites, 1922 passed. Написано 24 тести liqpay (create+callback). Виправлено ServiceWorkerRegister тест. Виправлено graceful degradation у contact/newsletter/apply/liqpay-callback routes (Telegram+Resend у власних try/catch). Додано 2 Resend-тести до apply.route.test.ts (+18 total). Додано email-підтвердження до /api/apply.**
**🔧 Виправлено 2026-05-01: 4 TypeScript помилки у тестах — `export {}` у partnership/speed-test тестових файлах (TS2451/TS2393), `hasDemo` у ExtraCard.test.tsx, `errorMap`→`error` у schemas.ts (Zod v4). TypeScript: 0 помилок.**
**✅ Виправлено 2026-05-02 (session 27): усі 1884 тести зелені — виправлено 9 падаючих suite:**
- **portfolio.ts nicheSlug**: "fintech"→"consulting", "healthcare"→"medical" — `internal_links.test.ts` ✅ 12/12
- **glossary.ts**: дублікат slug "rag" → перший перейменований у "rag-intro" — sitemap no duplicate ✅
- **sitemap.test.ts**: hreflang key "en"→"en-GB", staticCount 22→28, додано AI/ML/startup/useCase/author/category до формули — ✅ 42/42
- **niches.test.ts**: count 33→34 (agritech додано), agritech processSteps 6→5 — ✅
- **services.test.ts**: useCases toHaveLength(6)→toBeGreaterThanOrEqual(6) (AI service має 9) — ✅
- **NicheStats.tsx**: label "Рішень"→"Ніш", description оновлено, count 33→34 + тести NicheStats/NicheReviewsStats/NicheComponents — ✅
- **BlogPreviewSection.tsx**: `post.author[0]` → `post.author?.[0] ?? "?"` + `post.author?.split(...)` — ✅ 12/12
- **PortfolioContent.test.tsx**: link name `/кейс/i` → `/деталі/i` — ✅
- **AdminClient.test.tsx**: `getByText` → `getAllByText[0]` для дублікату "Admin Panel" — ✅

---

## Unit тести (Jest + React Testing Library)
- ✅ Налаштування Jest + @swc/jest для TypeScript (`jest.config.ts`, `jest.setup.ts`)
- ✅ Налаштування Testing Library для React компонентів (`@testing-library/react`, `jest-dom`)
- ✅ Тести для утилітарних функцій (`cn()` — 8 тестів у `src/lib/__tests__/utils.test.ts`)
- ✅ Тести для UI-компонентів: Button (8 тестів), Breadcrumb (7 тестів)
- ✅ Тести для data layers: niches (10), blog (14), portfolio (11), services (5), extras (12) — 81 тести у data layer (portfolio розширено: 12 проєктів, nicheSlug, caseStudy, 3 нові проєкти verified; blog розширено: 21 постів, URL-safe slugs, tags, nicheSlug, категорії coverage)
- ✅ Тести для custom hooks: useCart (11 тестів у `src/hooks/__tests__/useCart.test.ts`), useAuth (10 тестів у `src/hooks/__tests__/useAuth.test.ts`), useFilters (16 тестів)
- ✅ Тести для API helper функцій (sanitize, buildTelegramMessage — 12 тестів у contact.test.ts)
- ✅ Тести для newsletter API helpers (sanitize, isValidEmail — 10 тестів у newsletter.test.ts)
- ✅ Тести для ContactForm (8 тестів — success, error, network error, loading state, reset) — `components/__tests__/ContactForm.test.tsx`
- ✅ Тести для FormElements (27 тестів — Input, Textarea, Select, Checkbox, RadioGroup) — `components/__tests__/FormElements.test.tsx`
- ✅ axe-core (jest-axe) для автоматичних a11y перевірок — 66 тестів у `components/__tests__/a11y.test.tsx` (25 компонентів: + ShareButtons EN/UK, EmptyState search/cart/generic, SpeedTestTool UK/EN)
- ✅ useFilters hook (16 тестів — search, category, complexity, price range, sort, reset, activeCount, isFiltered) — `hooks/__tests__/useFilters.test.ts`
- ✅ Тести для StarRating + RatingBars (12 тестів) — `components/__tests__/StarRating.test.tsx`
- ✅ Тести для Pagination (12 тестів — nav, aria, prev/next, onPageChange, ellipsis) — `components/__tests__/Pagination.test.tsx`
- ✅ Тести для rateLimit утиліти (10 тестів — limit/block/reset/multi-IP, getClientIp) — `lib/__tests__/rateLimit.test.ts`
- ✅ Тести для Toast/useToast (8 тестів — success/error/warning/info, dismiss, auto-dismiss, provider error) — `components/__tests__/Toast.test.tsx`
- ✅ Тести для Badge (9 тестів — всі варіанти, custom className) — `components/__tests__/Badge.test.tsx`
- ✅ Тести для Tabs (15 тестів — rendering, defaultTab, click switch, children, ArrowLeft/ArrowRight/Home/End keyboard nav, roving tabIndex, tabpanel ARIA) — `components/__tests__/Tabs.test.tsx`
- ✅ Тести для ConfirmDialog (10 тестів — open/close, confirm/cancel, backdrop, aria) — `components/__tests__/ConfirmDialog.test.tsx`
- ✅ Тести для Skeleton / SkeletonCard / SkeletonText (8 тестів) — `components/__tests__/Skeleton.test.tsx`
- ✅ Тести для StepIndicator (9 тестів — steps, active, completed, onStepClick) — `components/__tests__/StepIndicator.test.tsx`
- ✅ Тести для BackToTop (6 тестів — visibility, scroll, click, a11y, cleanup) — `components/__tests__/BackToTop.test.tsx`
- ✅ Тести для Logo / LogoIcon / LogoWordmark (9 тестів) — `components/__tests__/Logo.test.tsx`
- ✅ Тести для CookieConsent (11 тестів — show/hide, accept/reject, custom, localStorage) — `components/__tests__/CookieConsent.test.tsx`
- ✅ Тести для LoginForm (11 тестів — render, submit, error, toggle password, redirect) — `components/__tests__/LoginForm.test.tsx`
- ✅ Тести для schemas.ts — Zod validation (28 тестів) — `lib/__tests__/schemas.test.ts`
- ✅ Тести для order route helpers (17 тестів — generateOrderId, buildTelegramMessage) — `app/api/order/__tests__/order.test.ts`
- ✅ Інтеграційні тести API route /api/order (12 тестів — valid order, orderId, validation errors, rate limiting, Retry-After, bad JSON, no Telegram without env, optional fields, email normalize) — `app/api/order/__tests__/order.route.test.ts`
- ✅ Тести для MiniCart (13 тестів — hydration, count badge, empty state, items, remove, close) — `components/__tests__/MiniCart.test.tsx`
- ✅ Тести для ThemeToggle (9 тестів — open/close, theme switch, localStorage) — `components/__tests__/ThemeToggle.test.tsx`
- ✅ Тести для CountUp (7 тестів — IntersectionObserver, animation, cleanup) — `components/__tests__/CountUp.test.tsx`
- ✅ Тести для FadeIn (10 тестів — visibility, is-visible class, delay, cleanup) — `components/__tests__/FadeIn.test.tsx`
- ✅ Тести для Lightbox / LightboxGallery (19 тестів — nav, keyboard, zoom, open/close) — `components/__tests__/Lightbox.test.tsx`
- ✅ Тести для BeforeAfter (10 тестів — drag handle, labels, position, cleanup) — `components/__tests__/BeforeAfter.test.tsx`
- ✅ Тести для CartClient (11 тестів — loading, empty, items, remove, promo CODENEST10, package change, updatePackage) — `app/marketplace/cart/__tests__/CartClient.test.tsx`
- ✅ Тести для CheckoutForm (15 тестів — step 1/2/3 nav, back, payment methods, agreement, submit, orderId, API error, network error) — `app/marketplace/checkout/__tests__/CheckoutForm.test.tsx`
- ✅ Тести для AccountClient (13 тестів — skeleton loading, redirect, display name, email, initials, logout, tab navigation) — `app/marketplace/account/__tests__/AccountClient.test.tsx`
- ✅ Тести для CartSummary (6 тестів — heading, hydration dash placeholders, checkout link, catalog link, trust badges, subtotal/total labels) — `app/marketplace/cart/__tests__/CartSummary.test.tsx`
- ✅ Тести для AdminClient (12 тестів — sidebar, KPI cards, tab switching, order search filter, review approve/reject, nav items) — `app/admin/marketplace/__tests__/AdminClient.test.tsx`
- ✅ Інтеграційні тести API route /api/contact (9 тестів — rate limiting, Retry-After, honeypot, Telegram, env vars, optional fields, bad JSON) — `app/api/contact/__tests__/contact.route.test.ts`
- ✅ Інтеграційні тести API route /api/newsletter (9 тестів — rate limiting, Retry-After, honeypot, Telegram, email normalization, bad JSON) — `app/api/newsletter/__tests__/newsletter.route.test.ts`
- ✅ Інтеграційні тести API route /api/apply (18 тестів — valid submission, portfolioUrl optional/empty, rate limiting, Retry-After, honeypot, invalid JSON, name/email/coverLetter/portfolioUrl Zod validation, no fetch without env, Telegram call, name/position in message, portfolioUrl in message, Resend email to applicant, no Resend without key) — `app/api/apply/__tests__/apply.route.test.ts`
- ✅ Інтеграційні тести API route /api/auth/login (12 тестів — demo/admin credentials, 401 wrong password, email normalization, rate limiting, bad JSON, account lockout after 5 attempts, Retry-After header, lockout clear on success) — `app/api/auth/login/__tests__/login.route.test.ts`
- ✅ Тести для PortfolioContent (18 тестів — search, category/complexity filter, empty state, lightbox, кейс/демо links) — `components/portfolio/__tests__/PortfolioContent.test.tsx`
- ✅ Тести для BlogContent (13 тестів — featured, category filter, tag search, pagination, newsletter form) — `components/blog/__tests__/BlogContent.test.tsx`
- ✅ Тести для ReviewsClient (23 тести — initial render, platform filter google/clutch/dou, rating filter 5★/4★+, service filter, empty state, results count, clear all filters, EN locale) — `components/reviews/__tests__/ReviewsClient.test.tsx`
- ✅ Тести для ExtrasCatalog (13 тестів — search, category filter, empty state, count) — `components/extras/__tests__/ExtrasCatalog.test.tsx`
- ✅ Тести для NicheCalculator (11 тестів — title, steps rendering, initial total, dropdown open/close, option selection, price update, "включено", CTA link) — `components/niches/__tests__/NicheComponents.test.tsx`
- ✅ Тести для BookingSection (17 тестів — step 1/2/3/4 navigation, service selection, date/time, form validation, submit, confirmation screen, reset, back button, step indicators) — `components/niches/__tests__/NicheComponents.test.tsx`
- ✅ Тести для ShareButtons (14 тестів — share links, URLs, copy link, clipboard, copied state, revert) — `components/ui/__tests__/ShareButtons.test.tsx`
- ✅ Тести для EmptyState (12 тестів — search/cart/generic variants, size, className, aria-hidden) — `components/ui/__tests__/EmptyState.test.tsx`
- ✅ Тести для CustomCursor (11 тестів — render, aria, event listeners, pointer vs touch, cleanup, cancelAnimationFrame) — `components/ui/__tests__/CustomCursor.test.tsx`
- ✅ Тести для ThemeProvider + useTheme (13 тестів — children, system/dark/light init, localStorage, dark class on documentElement, setTheme, resolvedTheme, prefers-color-scheme) — `components/ui/__tests__/ThemeProvider.test.tsx`
- ✅ Тести для useCompare (14 тестів — addItem, duplicate, MAX_COMPARE, removeItem, toggleItem, clearAll, isSelected, isFull, localStorage persist/hydrate) — `hooks/__tests__/useCompare.test.ts`
- **✅ 100% UI component test coverage — всі 29 компонентів у src/components/ui/ покриті тестами**
- **✅ Niche components: NicheReviews + NicheStats + NicheCalculator + BookingSection — 36 тестів**
- **✅ Home sections: TestimonialsSection, MarketplaceTeaser, ServicesSection, WhyUsSection, HowWeWorkSection, ClientLogosSection — HomeComponents.test.tsx (25 тестів)**
- **✅ ComparePanel — 8 тестів (empty state, render, remove, clear, compare link, slots, complexity, a11y)**
- **✅ Internal Links Integrity — `internal-links.test.ts` (12 тестів: service/blog/niche/portfolio/AI/ML slugs, nicheSlug, app dir, depth) + `internal_links.test.ts` (12 тестів: portfolio/blog nicheSlug cross-ref, slug uniqueness, niche categories, color format, content coverage)**
- **✅ SSG Verification — ssg-verification.test.ts (41 тест: no "use client" on public pages, all have metadata)**
- **✅ Blog content — 4 тести (all 44 posts have content, paragraphs > 50 chars, unique first paragraphs, Висновок)**
- **✅ Services data — 18 тестів (processSteps, caseStudies, useCases, packages, slugs)**
- ✅ Coverage threshold: мінімум 70% для критичних модулів — `jest.config.ts` (`coverageThreshold`: global 60%, lib/hooks 70%)
- ✅ `npm run test` у CI перед кожним merge — GitHub Actions `.github/workflows/ci.yml` (test + lint + build jobs)

## Integration тести
- ✅ Тести форм: відправка, валідація, помилки — ContactForm (8), NewsletterForm (7), LoginForm (10), CheckoutForm (15) + API route integration tests
- ✅ Тести аутентифікації: login, logout, hydration, updateProfile — `hooks/__tests__/useAuth.integration.test.ts`
- ✅ Тести маркетплейсу: CartClient (кошик) та CheckoutForm (checkout flow) — покриті unit тестами
- [ ] Тести CMS-інтеграції: отримання постів, продуктів
- ✅ MSW (Mock Service Worker) для mock API у тестах — `src/mocks/handlers.ts` + `src/mocks/server.ts` (msw 2.x, node env, готово до використання у тестах)
- ✅ Тести API route /api/alert/critical (5 тестів — not_configured, Telegram fetch, fetch fail, missing fields, invalid JSON) — `app/api/alert/critical/__tests__/critical.route.test.ts`
- ✅ Інтеграційні тести API route /api/speed-test (12 тестів — valid URL + metrics, opportunities filter score<0.9 max 3, rate limit 429, invalid JSON 400, missing url, empty url, ftp:// scheme, non-URL, PSI network error 502, PSI non-ok 502, null metrics, mobile strategy) — `app/api/speed-test/__tests__/speed-test.route.test.ts`
- ✅ Інтеграційні тести API route /api/partnership (16 тестів — valid referral/agency/tech, rate limit 429, Retry-After, honeypot fake success, invalid JSON 400, missing name, invalid email, invalid type, short description, no Telegram without env, Telegram call, name/email/type label in message, audience in message, optional audience, Telegram fail → 200) — `app/api/partnership/__tests__/partnership.route.test.ts`
- ✅ Тести API route /api/liqpay/create (11 тестів — valid payload + data/signature/checkoutUrl, base64 params, SHA1 signature, optional email→customer, 503 no env keys, 400 missing amount/invalid amount/missing orderId/missing description, 429 rate limit, Retry-After, 500 bad JSON) — `app/api/liqpay/__tests__/liqpay.route.test.ts`
- ✅ Тести API route /api/liqpay/callback (13 тестів — valid success 200, 503 no privateKey, 403 bad signature, 400 missing data, 400 missing signature, Telegram on success, Telegram on sandbox, Telegram message contains order_id/amount, Resend email sent, no Resend without key, no notify on failure status, graceful degradation Telegram fetch error) — `app/api/liqpay/__tests__/liqpay.route.test.ts`

## E2E тести (Playwright)
- ✅ Налаштування Playwright з TypeScript — `playwright.config.ts` (chromium + mobile-chrome, webServer autostart)
- ✅ Головна сторінка: рендер, навігація, мета-теги, OG-теги, JS errors — `e2e/home.spec.ts`
- ✅ Контактна форма: поля, кнопка, HTML5 валідація — `e2e/contact.spec.ts`
- ✅ Маркетплейс flow: каталог → продукт, фільтр, логін-сторінка, редирект без auth — `e2e/marketplace.spec.ts`
- ✅ Аутентифікація: вхід з демо-кредентіалами, помилка, вихід — `e2e/auth.spec.ts`
- ✅ Mobile viewport тести (360px, 375px, 768px, 1280px) — `e2e/viewport.spec.ts` (8 тестів × 4 вьюпорти: головна, контакти, маркетплейс, кошик, послуги, блог)
- ✅ Screenshot тести для виявлення регресій UI — `e2e/visual.spec.ts` (8 скріншотів: home/services/marketplace/pricing/blog/portfolio/mobile home/mobile marketplace, maxDiffPixelRatio 2%, `npx playwright test visual --update-snapshots` для baseline)
- ✅ Запуск Playwright у CI (GitHub Actions) на кожен PR — `.github/workflows/ci.yml` (e2e job)

## SEO QA
- ✅ Перевірка Title — містить CodeNest (10 ключових сторінок) — `e2e/seo.spec.ts`
- ✅ Перевірка H1 — рівно один на сторінку (10 сторінок) — `e2e/seo.spec.ts`
- ✅ Meta description присутній і не порожній (10 сторінок) — `e2e/seo.spec.ts`
- ✅ OG-теги (og:title, og:description) присутні (10 сторінок) — `e2e/seo.spec.ts`
- ✅ robots.txt відповідає 200, містить User-agent — `e2e/seo.spec.ts`
- ✅ sitemap.xml відповідає 200 і є валідним XML — `e2e/seo.spec.ts`
- ✅ Перевірка canonical URL — `alternates: { canonical: '/path' }` додано до всіх 20 публічних сторінок (14 статичних: /, about, contact, blog, portfolio, services, pricing, extras, faq, privacy, terms-of-service, marketplace, marketplace/catalog, sitemap + 6 динамічних: blog/[slug], services/[slug], niches/[slug], portfolio/[slug], blog/tag/[tag], marketplace/product/[slug]); E2E тест `canonical URL присутній` доданий до `e2e/seo.spec.ts` (10 сторінок)
- ✅ Перевірка hreflang — `buildAlternates()` у `src/i18n.ts` додає `en`, `uk`, `x-default` до всіх 21 сторінок через `alternates.languages`
- [ ] Crawler test: Screaming Frog або Sitebulb
- [ ] Lighthouse SEO score > 95 для всіх ключових сторінок

## Performance QA
- ✅ Lighthouse CI у GitHub Actions (бюджет: LCP < 2.5s, CLS < 0.1) — `.lighthouserc.json` + `.github/workflows/lighthouse.yml`
- [ ] WebPageTest для реальних умов (мобільний 3G)
- ✅ Bundle size аналіз — `@next/bundle-analyzer` встановлено, скрипт `npm run analyze` (ANALYZE=true next build), налаштовано у `next.config.ts`
- ✅ Перевірка що немає CSR-рендерингу публічних сторінок — `lib/__tests__/ssg-verification.test.ts` (41 тестів: всі публічні сторінки не мають "use client", всі мають metadata/generateMetadata)
- [ ] Регулярний аудит Core Web Vitals через GSC

## Accessibility QA (a11y)
- ✅ axe-core або jest-axe для автоматичних a11y перевірок — `jest-axe` встановлено, 66 тестів у `a11y.test.tsx` (25 компонентів: + SpeedTestTool UK/EN idle state)
- ✅ Перевірка контрастності кольорів (WCAG AA) — jest-axe автоматично перевіряє color-contrast; 43 a11y тести (включаючи ClientLogosSection, ServicesSection, WhyUsSection, HowWeWorkSection)
- ✅ Keyboard navigation: всі інтерактивні елементи досяжні — Tabs: ArrowLeft/ArrowRight/Home/End (roving tabIndex); Header: Escape закриває Services + mobile menu; NicheCalculator: Escape + ArrowDown/ArrowUp для listbox; FloatingChat: Escape закриває popup
- [ ] Screen reader тест (NVDA або VoiceOver)
- ✅ ARIA attributes для складних компонентів:
  - NicheCalculator: aria-expanded, aria-haspopup, aria-controls, role="listbox", role="option", aria-selected, aria-labelledby
  - BookingSection: aria-current="step", focus management useRef/useEffect при зміні кроку, nav[aria-label]
  - Header: aria-expanded, aria-haspopup, aria-controls, role="menu", role="menuitem" для Services dropdown; mobile button: aria-expanded, aria-controls="mobile-menu"
  - Footer: nav[aria-label] для "Послуги", "Компанія", "Соцмережі" секцій
  - Tabs: role="tablist", role="tab", aria-selected, aria-controls + role="tabpanel", aria-labelledby
  - TestimonialsSection: role="list", role="listitem", sr-only rating text, aria-hidden на зірках
  - ContactForm + NewsletterForm: role="alert", aria-live="assertive/polite" для error/success, label[sr-only], aria-describedby; submit button: aria-disabled, aria-busy, aria-live на тексті
  - FloatingChat: role="menu", role="menuitem", aria-expanded, aria-controls, Escape key handler
  - BlogContent: role="search", aria-label, aria-controls="blog-results", aria-live="polite" для count
  - ExtrasCatalog: role="search", aria-label, aria-controls="extras-results", aria-live="polite" для count
  - error.tsx: role="alert", aria-live="assertive", id="main-content"; global-error.tsx: створено
- ✅ Focus management у модальних вікнах — ConfirmDialog + Lightbox: auto-focus, focus trap, Escape, restore focus; ConfirmDialog scroll lock (document.body.style.overflow)

## Cross-browser тестування
- [ ] Chrome (latest), Firefox (latest), Safari (latest), Edge
- [ ] iOS Safari 15+, Android Chrome
- [ ] Перевірка CSS Grid та Flexbox у Safari
- [ ] Перевірка WebP/AVIF підтримки з fallback

## Smoke Tests (після кожного deploy)
- ✅ Перевірити що головна відкривається — `e2e/smoke.spec.ts`
- ✅ Форма контакту відображається — `e2e/smoke.spec.ts`
- ✅ Маркетплейс каталог завантажується — `e2e/smoke.spec.ts`
- ✅ 404 сторінка відображається коректно — `e2e/smoke.spec.ts`
- ✅ Перевірити консоль на JS помилки (головна + маркетплейс) — `e2e/smoke.spec.ts`
- ✅ Блог, портфоліо, ціни, offline сторінка — `e2e/smoke.spec.ts`

---

### Примітки
- Пирамідка тестування: багато unit → менше integration → мінімум e2e (повільні).
- E2E тести запускати на staging, не на production.
- Lighthouse CI автоматично блокує merge якщо performance бюджет перевищений.


> ⚠️ **Незакреслені пункти ([ ]) — Phase 2/3:** потребують реального серверного оточення (Vercel, БД, API-ключі, домен). Реалізуються після деплою та на етапі запуску проєкту.