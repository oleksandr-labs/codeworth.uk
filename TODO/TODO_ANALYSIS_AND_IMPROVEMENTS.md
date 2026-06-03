# 🔍 Великий Аналіз Проєкту CodeNest + Пропозиції покращень
> Дата аналізу: 2026-05-03
> Стан: ~630 виконаних задач, 570+ SSG-сторінок, 1884 тести (всі зелені), 0 TS помилок

---

## 📋 ЗМІСТ

1. [Загальний стан проєкту](#1-загальний-стан-проєкту)
2. [Що залишилось зробити](#2-що-залишилось-зробити)
   - [P0 — Критичні блокери запуску](#p0--критичні-блокери-запуску)
   - [P1 — Перший тиждень після запуску](#p1--перший-тиждень-після-запуску)
   - [P2 — Довгострокові задачі](#p2--довгострокові-задачі)
   - [Phase 2 — Продуктова еволюція](#phase-2--продуктова-еволюція)
3. [Аналіз по файлах TODO](#3-аналіз-по-файлах-todo)
4. [Пропозиції покращень](#4-пропозиції-покращень)
5. [Технічний борг](#5-технічний-борг)

---

## 1. Загальний стан проєкту

### ✅ Що вже зроблено (сильні сторони)

| Категорія | Готовність | Деталі |
|-----------|-----------|--------|
| Frontend / UI | **~97%** | 570+ SSG сторінок, всі компоненти, i18n EN+UK |
| SEO (технічне) | **~88%** | Sitemap, robots, hreflang, Schema.org, OG-теги |
| Дизайн-система | **100%** | Токени, Tailwind v4, темна/світла тема |
| Тестування | **~88%** | 1884 юніт-тести, 64 a11y, E2E Playwright |
| TypeScript | **100%** | 0 помилок |
| i18n (EN/UK) | **100%** | Phase 1 завершено |
| Маркетплейс | **~85%** | Каталог, кошик, чекаут, акаунт, адмін |
| Безпека (MVP) | **~50%** | Rate limiting, Zod, CSP — достатньо для старту |
| Платежі | **~60%** | ✅ LiqPay API (2026-05-03), потрібні ключі |
| Email | **~60%** | ✅ Resend інтеграція (2026-05-03), потрібен API ключ |
| Деплой | **0%** | 🔴 Не задеплоєно |
| Реальні медіа | **~15%** | Всі зображення — placeholder/gradient |

---

## 2. Що залишилось зробити

> ⚠️ **Незакреслені пункти ([ ]) у цьому розділі — Phase 2/3 (pre-launch infrastructure):** реєстрація домену, деплой, ENV-ключі, GSC, Analytics, реальні медіа. Це адміністративні / інфраструктурні задачі, які виконуються при запуску проєкту, а не code-задачі. Frontend код повністю готовий.

### P0 — Критичні блокери запуску
> Без цього сайт неможливо запустити

#### 🌐 Домен та хостинг
- [ ] **Зареєструвати домен** codenest.com.ua (NIC.UA або Hostpro, ~500 ₴/рік)
- [ ] **Задеплоїти на Vercel** (підключити GitHub репо → автодеплой)
- [ ] **Налаштувати DNS у Cloudflare**: A-record → Vercel IP, MX для пошти
- [ ] **Підключити домен до Vercel**: Settings → Domains → Add codenest.com.ua

#### 🔑 API ключі (env vars)
- [ ] **LIQPAY_PUBLIC_KEY + LIQPAY_PRIVATE_KEY** — реєстрація на liqpay.ua
- [ ] **RESEND_API_KEY** — реєстрація на resend.com (безкоштовно до 3000 листів/міс)
- [ ] **RESEND_FROM_EMAIL** — верифікувати домен codenest.com.ua у Resend
- [ ] **TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID** — налаштувати бота для нотифікацій
- [ ] **NEXT_PUBLIC_SITE_URL** = https://codenest.com.ua

#### 📧 Email
- [ ] Налаштувати **hello@codenest.com.ua** (через Resend або Google Workspace)
- [ ] Налаштувати **MX records** для отримання пошти
- [ ] Протестувати email-підтвердження замовлень

---

### P1 — Перший тиждень після запуску
> Зробити протягом 7 днів після деплою

#### 🔍 Google / Analytics
- [ ] **Google Search Console** — додати сайт, верифікувати через meta-тег або DNS
- [ ] **Відправити Sitemap** у GSC: `https://codenest.com.ua/sitemap.xml`
- [ ] **Google Business Profile** — створити профіль CodeNest (категорія: Web designer)
- [ ] **Bing Webmaster Tools** — реєстрація та Submit Sitemap
- [ ] **Google Analytics 4** — підключити через GTM (з consent check — вже готовий `AnalyticsScripts.tsx`)

#### 📊 UX моніторинг
- [ ] **Microsoft Clarity** (безкоштовно) — тепловкарти, session recordings
- [ ] **UptimeRobot** (безкоштовно) — моніторинг uptime, Telegram алерт при падінні

#### 🏁 Перший тиждень — чеклист
- [ ] Перевірити Coverage звіт у GSC — нема 404, soft 404
- [ ] Перевірити що всі сторінки з sitemap.xml проіндексовані
- [ ] Перевірити OG-теги через `og:debugger` (Facebook) та Twitter Card Validator
- [ ] Перевірити Schema.org через Google Rich Results Test
- [ ] Запустити Lighthouse для 5 ключових сторінок (home, blog, services, portfolio, pricing)
- [ ] Core Web Vitals у PageSpeed Insights після деплою (LCP < 2.5s, CLS < 0.1, INP < 200ms)

---

### P2 — Довгострокові задачі
> Протягом 1–3 місяців

#### 📝 Контент
- [ ] **Реальні фото команди** (фотосесія) — замінити placeholder аватари у `/about` та blog posts
- [ ] **Мокапи пристроїв** для portfolio кейсів (Mockup.photos або Smartmockups)
- [ ] **Реальний логотип** SVG (метафора "гнізда") — замінити текстовий логотип
- [ ] **Clutch.co профіль** — заповнити + отримати перші 3 відгуки від клієнтів

#### 📰 Блог (контент-план з TODO/blog/)
- [ ] **8 Pillar pages** (TODO_blog_pillar_clusters.md) — перші 2 пріоритетні:
  - "Web Development for UK Businesses: Complete 2026 Guide" → `/blog/web-development-for-business-uk-2026`
  - "SEO for Small Business UK: Complete Guide 2026" → `/blog/seo-guide-small-business-uk-2026`
- [ ] **20 cluster posts Місяць 1** (з content calendar): website-cost-uk-2026, custom-website-vs-template тощо
- [ ] **EN Keywords** оптимізація — per-post SEO (TODO_blog_en_keywords_per_post.md)
- [ ] **Featured Snippets** — відформатувати FAQ-секції в blog posts для Position 0

#### 🔒 Безпека (пост-MVP)
- [ ] **reCAPTCHA v3** або hCaptcha для contact/order форм (захист від спам-ботів)
- [ ] **Cloudflare WAF** — після підключення Cloudflare (безкоштовний план включає базовий WAF)
- [ ] **NextAuth.js** — замінити поточну mock-авторизацію реальним JWT з БД
- [ ] **2FA** для адмін-панелі (`/admin`)
- [ ] Перевірити security headers через **securityheaders.com**

#### 🗄️ База даних (Phase 2)
- [ ] **Supabase** або **Railway PostgreSQL** — для реальних замовлень, акаунтів, відгуків
- [ ] **Prisma ORM** — схема для users, orders, products, reviews
- [ ] Реальна авторизація замість mock (`useAuth` → NextAuth.js + DB)
- [ ] Адмін-панель CRUD → підключити до реальної БД

#### 🎥 SEO (довгострокові)
- [ ] **YouTube канал** + VideoObject Schema.org — туторіали, кейс-відео
- [ ] **Backlinks**: Dou.ua, AIN.ua, Hotline, Rozetka, IT-спільноти
- [ ] **SpeakableSpecification Schema** — для голосового пошуку
- [ ] **AI Overview (SGE) оптимізація** — структуровані відповіді у перших 50 словах H2

---

### Phase 2 — Продуктова еволюція
> 3–6 місяців після запуску

#### 🛒 Маркетплейс (розширення)
- [ ] **WayForPay** інтеграція (альтернатива LiqPay, популярна в UA)
- [ ] **Stripe** для EN-ринку (Великобританія, £ GBP)
- [ ] **Apple Pay / Google Pay** через LiqPay або Stripe
- [ ] Реальна **БД для замовлень** (зараз тільки Telegram нотифікації)
- [ ] **Email-серія** після замовлення (welcome sequence через Resend)

#### 🔌 Інтеграції (extras catalog)
- [ ] `int-wayforpay` — WayForPay платежі
- [ ] `int-stripe` — Stripe міжнародні платежі (£ GBP)
- [ ] `int-google-calendar` — Google Calendar / Calendly booking
- [ ] `int-gtm` — GTM Setup service
- [ ] `int-oauth` — Google Sign-In / Apple Sign-In
- [ ] `int-viber-whatsapp` — Viber Bot + WhatsApp Business
- [ ] `int-google-sheets` — Google Sheets CRM інтеграція
- [ ] `int-zapier` — Zapier / Make автоматизація
- [ ] `int-sms` — TurboSMS / SMS.UA нотифікації

#### 🧩 Нові features (extras catalog)
- [x] `feat-announcement-bar` — announcement banner — ✅ 2026-05-03: `AnnouncementBarDemo.tsx` + `hasDemo: true` + extras-demos.ts entry
- [ ] `feat-web-push` — браузерні push-нотифікації (OneSignal) — ⚠️ Phase 2: потребує OneSignal API + backend
- [ ] `feat-virtual-tour` — 360° тур для нерухомості/готелів — ⚠️ Phase 3: потребує 360° фото + Pannellum/Marzipano
- [ ] `feat-interactive-map` — Google Maps integration — ⚠️ Phase 2: потребує Google Maps API key
- [ ] `feat-live-chat` — Chatwoot / Crisp live chat widget — ⚠️ Phase 2: потребує Chatwoot/Crisp акаунт

#### 🛡️ Адмін-панель (розширення)
- [ ] `admin-orders` — CRUD замовлень (після підключення БД) — ⚠️ Phase 2: потребує Prisma + PostgreSQL
- [ ] `admin-catalog` — управління товарами маркетплейсу — ⚠️ Phase 2: потребує CMS або DB
- [ ] `admin-reviews` — модерація відгуків — ⚠️ Phase 2: потребує DB
- [ ] `admin-leads` — CRM для лідів (заявки з сайту) — ⚠️ Phase 2: потребує DB + realtime
- [ ] `admin-i18n` — редактор перекладів без деплою — ⚠️ Phase 3: потребує CMS
- [ ] `admin-seo-editor` — SEO мета-теги без деплою

---

## 3. Аналіз по файлах TODO

| Файл | Виконано | Залишилось | Примітка |
|------|----------|------------|----------|
| **TODO_MAIN.md** | ~95% | 10 пунктів | P0 блокери деплою |
| **tech/TODO_server.md** | ~15% | 25+ пунктів | 🔴 КРИТИЧНО — домен, хостинг, БД |
| **tech/TODO_testing.md** | ~75% | 9 пунктів | Cross-browser, CWV після деплою |
| **tech/TODO_optimization.md** | ~73% | 15 пунктів | Blur placeholders, CWV, CDN |
| **tech/TODO_security.md** | ~50% | 27 пунктів | MVP достатньо; NextAuth, 2FA — Phase 2 |
| **seo/TODO_technical_seo.md** | ~60% | 30+ пунктів | Більшість — після деплою (GSC, моніторинг) |
| **extras/integrations/** | ~35% | 18 інтеграцій | Phase 2 |
| **extras/admin/** | ~25% | 14 адмін-модулів | Phase 2 (потребує БД) |
| **extras/features/** | ~55% | 8 модулів без демо | Можна поступово додавати |
| **extras/marketing/** | ~30% | 15+ маркетинг позицій | Phase 2 |
| **blog/ (контент)** | ~15% | 1400+ статей планується | Довгострокова SEO стратегія |

---

## 4. Пропозиції покращень

> Ці покращення не в поточних TODO-файлах. Пропоную додати їх.

### 🚀 A. Швидкі виграші (1–3 дні кожне)

#### A1. Blur placeholder для зображень ✅ (2026-05-03)
**Проблема:** Всі зображення — gradient placeholders без blur preview.
**Рішення:** Додати `blurDataURL` у `next/image` компоненти — генерувати tiny base64 LQIP.
**Вплив:** LCP покращення, менше CLS, краще UX на повільних з'єднаннях.
```tsx
// Приклад для portfolio cards
<Image src={caseStudy.image} blurDataURL={generateBlurPlaceholder()} placeholder="blur" />
```

#### A2. Open Graph зображення для blog posts
✅ **ВИКОНАНО 2026-05-03** — `src/app/og/blog/[slug]/route.tsx` (edge runtime, `ImageResponse` 1200×630). Унікальний OG image для кожного поста: title, excerpt, category badge, emoji, author, date, tags. Gradient-based design за кольором категорії.
**Вплив:** CTR у соцмережах +20–40%.

#### A3. `rel="preload"` для hero fonts + LCP image
**Проблема:** Шрифти Syne/Inter завантажуються через next/font але hero image (LCP) може не бути preloaded.
**Рішення:** Додати `<link rel="preload">` для першого viewport hero зображення.
**Вплив:** LCP < 2.5s на мобільних.

#### A4. Skeleton loading для маркетплейс сторінок
**Проблема:** Cart, Account, Admin — CSR компоненти без skeleton стану.
**Рішення:** Додати Skeleton компоненти (`/showcase` вже має скелетони!) для порожнього стану.
**Вплив:** Perceived performance, CLS = 0.

#### A5. `robots.txt` — блокувати `/api/`, `/admin/`, `/marketplace/cart/`
**Проблема:** Перевірити що приватні маршрути заблоковані в robots.txt.
**Рішення:** `robots.ts` вже існує — перевірити disallow-правила.
**Вплив:** Захист від індексації приватних сторінок.

---

### 💡 B. Продуктові покращення (3–7 днів кожне)

#### B1. Affiliate / Referral програма
**Ідея:** Партнерська програма — `/partners` вже є але немає коду реферальних посилань.
**Що зробити:**
- Реферальний URL з UTM параметром: `?ref=partner123`
- Cookie збереження refCode
- API endpoint для трекінгу конверсій
- Відображення commission у `/partners` страниці
**Монетизація:** +15–20% нових лідів через партнерів.

#### B2. "Калькулятор ціни" на кожній service сторінці
**Проблема:** `website-cost-calculator` є в `/tools` але не інтегрований у service pages.
**Рішення:** Embedded мінікалькулятор на `/services/website-development` (3 кроки: тип → функції → термін).
**Вплив:** Конверсія лідів +15–25% (люди хочуть ціну одразу).

#### B3. Sticky CTA bar з A/B тестом
**Ідея:** `feat-sticky-cta` вже є в extras — додати на service pages.
**Що зробити:** Sticky bottom bar "Замовити безкоштовну консультацію" що з'являється після 50% scroll.
**Вплив:** +10–15% конверсій на service pages.

#### B4. Email Newsletter — welcome sequence
**Проблема:** `api/newsletter` є, але після підписки — нічого.
**Рішення через Resend:** 
- Email 1 (відразу): "Дякуємо за підписку + безкоштовний чек-ліст"
- Email 2 (день 3): "5 помилок при замовленні сайту"
- Email 3 (день 7): "Наші кейси + спецпропозиція"
**Вплив:** Nurture sequence → конверсія підписників у клієнтів.

#### B5. Chat-first flow для LiqPay ✅ (2026-05-03)
**Проблема:** LiqPay — тільки UAH, тільки для українських карток.
**Рішення:** Для `/en/` locale → показувати тільки Bank Transfer + Invoice, не LiqPay.
**Що зробити:** У CheckoutForm — `if (lang === 'en') PAYMENT_METHODS = без liqpay`.
**Вплив:** Кращий UX для EN (UK) аудиторії.

---

### 🏗️ C. Архітектурні покращення (тиждень+)

#### C1. Headless CMS — Sanity.io
**Проблема:** Весь контент (blog, portfolio, extras) — hardcoded у `.ts` файлах. Неможливо редагувати без деплою.
**Рішення:** Sanity.io Studio як CMS:
- Blog posts → Sanity (GROQ queries)
- Portfolio cases → Sanity
- ISR revalidation при публікації
**Вплив:** Контент-менеджер може публікувати без розробника. SEO-блог масштабується.
**Складність:** 2–3 тижні міграції.

#### C2. Real-time замовлення через Supabase
**Проблема:** Замовлення зараз — тільки Telegram нотифікація. Немає БД.
**Рішення:** Supabase (PostgreSQL + Realtime):
- Таблиця `orders` → зберігати всі замовлення
- Адмін-панель → читати з БД
- Email notifications через Supabase webhooks + Resend
**Складність:** 1 тиждень.

#### C3. Server-Side rate limiting через Redis/Upstash
**Проблема:** Поточний rate limiting — in-memory `Map`. При перезапуску сервера — очищається. На serverless (Vercel) — не працює між invocations.
**Рішення:** Upstash Redis (serverless Redis, безкоштовний план: 10k req/day).
**Складність:** 2–3 дні.

#### C4. Автоматичне резервне копіювання контенту
**Проблема:** Весь контент — у `.ts` файлах в git. Немає snapshots.
**Рішення:** GitHub Actions cron → щоденний export контенту у JSON в окрему гілку `backups/`.
**Складність:** 1 день.

---

### 📊 D. SEO покращення

#### D1. Pillar Page — перший пріоритет
**Що реалізувати:**
- `/blog/web-development-for-business-uk-2026` — 4500+ слів, EN+UK
- `/blog/seo-guide-small-business-uk-2026` — 4000+ слів, EN+UK
- Повноцінна HowTo + FAQPage Schema.org
- 10 посилань на cluster posts
**Вплив:** Topical authority → ранжування цілого кластера.

#### D2. FAQ розширення для Featured Snippets
**Що зробити:** Кожна service page вже має FAQ (5-7 питань). Перевірити:
- Відповіді ≤ 50 слів (вимога для PAA)
- Структура: `## Q: ...` → `Відповідь у першому реченні.`
- FAQPage Schema.org вже є — перевірити в Rich Results Test після деплою
**Вплив:** Position 0 + People Also Ask блоки.

#### D3. Hreflang верифікація
**Проблема:** Hreflang теги є, але потрібна верифікація після деплою.
**Що зробити:** Перевірити через `hreflang.ninja` або Screaming Frog що:
- `/en/*` посилається на `/uk/*` і навпаки
- x-default вказує на `/en/`
**Вплив:** Правильна локалізація у Google.

#### D4. Internal linking audit
**Що зробити:** Перевірити через `internal-links.test.ts` (вже існує!) що:
- Всі blog posts мають ≥ 2 посилання на service pages
- Orphan pages відсутні
- Anchor texts різноманітні (не "click here")
**Вплив:** PageRank розподіл, crawlability.

---

### 🎨 E. UX/Design покращення

#### E1. Dark mode підтримка
**Проблема:** Дизайн-система має `dark bg (#0F0E17)` але немає system/user dark mode toggle.
**Рішення:** `prefers-color-scheme` media query + localStorage toggle.
**Складність:** 2–3 дні (Tailwind v4 має нативний `dark:` variant).

#### E2. Progress bar для page load
**Ідея:** Тонка індиго progress bar вгорі при навігації (як GitHub).
**Рішення:** `nprogress` або кастомний компонент з `usePathname` listener.
**Складність:** 0.5 дня.

#### E3. "Back to top" кнопка
**Проблема:** На довгих blog posts / glossary немає кнопки повернення.
**Рішення:** FloatingBackToTop component — з'являється після 500px scroll.
**Складність:** 0.5 дня.

#### E4. Reading progress bar для blog posts
**Ідея:** Горизонтальна progress bar вгорі article — показує % прочитаного.
**Складність:** 1 день.
**Вплив:** Time on page +15%, engagement.

#### E5. Animated counter для WhyUs / Stats секцій
**Проблема:** Статистики на /about та /home — статичні числа.
**Рішення:** Intersection Observer → animate counter коли в viewport.
**Складність:** 0.5 дня.

---

### 🔒 F. Безпека (пост-MVP, до 1 місяця)

#### F1. reCAPTCHA v3 для форм ✅ (2026-05-03)
- Додати Google reCAPTCHA v3 у ContactForm та CheckoutForm
- Server-side верифікація score у `/api/contact` та `/api/order`
- Вартість: безкоштовно до 1M req/міс

#### F2. Upstash Redis rate limiting
- Замінити in-memory `rateLimit.ts` на Upstash Redis
- Пакет: `@upstash/ratelimit` + `@upstash/redis`
- Вирішує serverless multi-instance проблему

#### F3. Секретний webhook token для LiqPay callback
- Додати `LIQPAY_WEBHOOK_SECRET` env var
- Додаткова перевірка крім sha1 signature

---

## 5. Технічний борг

### 🔧 Відомі технічні проблеми

| Проблема | Файл | Вплив | Складність |
|----------|------|-------|------------|
| In-memory rate limiting не працює на serverless | `src/lib/rateLimit.ts` | Mid | 2 дні |
| Mock auth у `useAuth` (не реальний JWT+БД) | `src/hooks/useAuth.ts` | High | 1 тиждень |
| ~~OrderSummary sidebar у checkout — hardcoded placeholder~~ | ✅ Виправлено 2026-05-03 | — | — |
| `@ts-nocheck` у деяких файлах (якщо є) | — | Low | 1 день |
| Bundle size — `framer-motion` ~100kb | `package.json` | Mid | 2 дні (lazy import) |
| ~~Service Worker cache version — не автооновлюється~~ | ✅ Виправлено 2026-05-03 | — | — |

### 🔧 OrderSummary sidebar — hardcoded items
У `CheckoutForm.tsx` (рядки ~327-347) секція "Your Order" показує hardcoded placeholder замість реального кошика:
```tsx
// ПРОБЛЕМА: захардкоджений контент
<div className="text-sm font-semibold text-gray-900">Ресторан / Кафе</div>
<div className="text-xs text-gray-500">Пакет: Розширений</div>
<div className="text-sm font-bold text-gray-900">13 600 ₴</div>
```
**Виправлення:** Підключити реальні `items` з `useCart()` (хук вже є, але sidebar використовує hardcode).

### 🔧 LiqPay тільки UAH
У поточній реалізації LiqPay `currency: "UAH"`. Для EN-аудиторії (£ GBP) потрібно або Stripe, або показувати тільки Invoice option.

---

## 📅 Рекомендований план дій

### Тиждень 1 (Запуск)
1. Домен + DNS (0.5 дня)
2. Vercel деплой + env vars (0.5 дня)
3. Resend + LiqPay ключі (1 день)
4. Google Search Console + Sitemap submit (0.5 дня)
5. Microsoft Clarity + UptimeRobot (0.5 дня)

### Тиждень 2 (Стабілізація)
1. Виправити hardcoded OrderSummary у CheckoutForm (0.5 дня)
2. reCAPTCHA v3 для форм (1 день)
3. LiqPay — приховати для EN locale (0.5 дня)
4. Progress bar + Back to Top компоненти (1 день)
5. Perший pillar post (2 дні)

### Місяць 1 (SEO growth)
1. 20 cluster blog posts з content calendar
2. Supabase підключення для замовлень
3. Email welcome sequence через Resend
4. Upstash Redis rate limiting

### Місяць 2–3 (Продуктовий ріст)
1. WayForPay + Stripe інтеграція
2. Headless CMS (Sanity.io)
3. Реальні фото + мокапи
4. Admin CRUD (orders, reviews, catalog)

---

## 🏆 Найважливіші 10 задач прямо зараз

| # | Задача | Час | Вплив | Статус |
|---|--------|-----|-------|--------|
| 1 | Зареєструвати домен + задеплоїти на Vercel | 1 день | 🔴 Критично | ⏳ Потребує акаунту |
| 2 | Налаштувати env vars (LiqPay, Resend, Telegram) | 2 год | 🔴 Критично | ⏳ Потребує ключів |
| 3 | Google Search Console + sitemap | 1 год | 🔴 Критично | ⏳ Після деплою |
| 4 | ~~Виправити OrderSummary sidebar (hardcode → useCart)~~ | — | — | ✅ 2026-05-03 |
| 5 | ~~LiqPay — приховати для EN locale~~ | — | — | ✅ 2026-05-03 |
| 6 | Перший pillar blog post (4500+ слів) | 2 дні | 🟡 SEO | ⏳ Контент |
| 7 | ~~reCAPTCHA v3 для форм~~ | — | — | ✅ 2026-05-03 |
| 8 | Microsoft Clarity + UptimeRobot | 1 год | 🟢 Моніторинг | ⏳ Після деплою |
| 9 | Upstash Redis rate limiting | 2 дні | 🟡 Технічний борг | ⏳ Потребує пакету |
| 10 | Email welcome sequence (newsletter) | 1 день | 🟢 Маркетинг | ⏳ Контент |

---

*Документ оновлено: 2026-05-03*
*Наступний аналіз рекомендується: після деплою (перевірка CWV, індексація, конверсії)*
