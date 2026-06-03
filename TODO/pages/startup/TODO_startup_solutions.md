 Startup Solutions — Готові Посадкові Сторінки для Стартапів

**Концепція:** Окрема категорія рішень для стартапів — швидкий запуск, тестування гіпотез, MVP лендінги. Відрізняється від нішевих demo-сторінок: тут не "ресторан" чи "салон краси", а **тип продукту/бізнес-моделі** стартапу.

**URL:** `/startup` — listing page зі всіма стартап-рішеннями
**URL окремих:** `/startup/[slug]` — demo + опис + замовлення

**Статус:** ✅ Фаза 2 завершена — 15 рішень + сторінки + sitemap (10 нових без demo preview)

---

> ⚠️ **Незакреслені пункти ([ ]) — Phase 3:** нові типи стартап-рішень (17 видів) додаються до каталогу поступово. Потребують нових demo-сторінок та компонентів.


## Чому стартапи — окрема категорія?

| Нішеві рішення (`/niches`) | Стартап рішення (`/startup`) |
|---|---|
| "Ресторан", "Салон краси" | "SaaS MVP", "Marketplace", "D2C бренд" |
| Локальний бізнес | Масштабований продукт |
| Контент-сайт + бронювання | Лендінг для інвесторів / перших користувачів |
| Клієнт знає що хоче | Стартап тестує гіпотезу |
| £499-£1,999 | £299-£999 (швидко і дешево) |
| Довга розробка | 3-7 днів MVP |

---

## Список стартап-рішень (30 типів)

### SaaS / Продуктові стартапи
- [x] `saas-waitlist` — Waitlist лендінг ("Будь першим") — email capture + countdown + social proof ✅
- [x] `saas-mvp` — MVP SaaS лендінг — features, pricing, demo CTA, trial signup ✅
- [x] `saas-b2b` — B2B SaaS для бізнесу — enterprise features, case studies, demo booking ✅
- [ ] `saas-productivity` — Productivity tool — before/after, integrations, free trial
- [ ] `saas-analytics` — Analytics/Dashboard tool — візуалізації, метрики, ROI calculator
- [x] `ai-tool-landing` — AI-powered tool — demo GIF/video, use cases, early access ✅

### Marketplace / Platform стартапи
- [x] `marketplace-two-sided` — Two-sided marketplace — для покупців і продавців окремо ✅
- [ ] `freelance-platform` — Платформа для фрілансерів — portfolio, bidding, escrow
- [ ] `rental-platform` — Платформа оренди (речі, авто, нерухомість) — search, calendar
- [ ] `booking-platform` — Booking platform — доступність, відгуки, payment

### E-commerce / D2C стартапи
- [x] `dtc-brand` — Direct-to-Consumer бренд — hero product, story, subscription ✅
- [ ] `subscription-box` — Subscription box — що всередині, відгуки, cancel anytime
- [ ] `dropshipping-store` — Dropshipping MVP — один товар або нова категорія
- [x] `crowdfunding-landing` — Crowdfunding лендінг — backers, progress bar, rewards ✅

### Mobile App стартапи
- [x] `mobile-app-landing` — Mobile app лендінг — screenshots, download badges, features ✅
- [ ] `game-landing` — Mobile game лендінг — gameplay, ratings, app store
- [ ] `health-app` — Health/Wellness app — tracking, progress, сertifications

### Community / Content стартапи
- [x] `newsletter-landing` — Newsletter/Media — past issues preview, subscriber count, benefits ✅
- [x] `community-platform` — Paid community — who's inside, testimonials, membership levels ✅
- [x] `course-creator` → `edtech-course` — EdTech Course лендінг — автор, програма, відгуки, enroll ✅
- [ ] `podcast-landing` — Podcast лендінг — episodes, guests, subscribe buttons

### Fintech / Crypto стартапи
- [x] `fintech-app` — Fintech app — security, features, регуляторні badges ✅
- [ ] `crypto-project` — Web3/Crypto project — whitepaper teaser, tokenomics, roadmap
- [ ] `neobank-landing` — Neobank / challenger bank — features vs traditional, signup

### B2B / Tools стартапи
- [x] `b2b-tool-launch` — B2B Tool Launch — integrations, security, team pricing, pilot ✅
- [x] `agency-portfolio` — Agency & Freelancer Portfolio — кейси, послуги, inquiry form ✅
- [ ] `api-product` — API / Developer tool — documentation preview, pricing tiers, SDK
- [ ] `chrome-extension` — Browser extension — how it works, reviews, install CTA
- [ ] `no-code-tool` — No-code tool лендінг — use cases, templates gallery, pricing
- [ ] `hr-tool` — HR/Recruiting tool — ATS features, integration logos, demo

### Impact / Social стартапи
- [x] `impact-ngo` → `social-enterprise` — Impact & NGO Landing — mission, donation form, volunteering ✅
- [ ] `climate-startup` — Climate/Green startup — carbon offset, certifications, B Corp

---

## Структура кожного стартап-рішення

### Дані (аналог niches data)
```ts
interface StartupSolution {
  slug: string
  title: string                    // "SaaS Waitlist Landing"
  category: StartupCategory        // "saas" | "marketplace" | "dtc" | ...
  tagline: string                  // "Зберіть 1000 email до запуску"
  description: string              
  targetAudience: string           // "Стартапери, які готуються до launch"
  hypothesis: string               // Яку гіпотезу допомагає протестувати
  deliveryDays: number             // 3-7
  priceFrom: number                // 299
  tags: string[]
  features: string[]               // Що включено в рішення
  conversionGoal: string           // "Email signup" | "Demo booking" | "App download"
  metrics: string[]                // На які метрики орієнтуватись
  sections: string[]               // Які секції включає лендінг
}
```

### Сторінки для кожного рішення

**`/startup/[slug]`** — повна demo + опис:
1. Hero: назва, tagline, "Жива демо" CTA + "Замовити за 3 дні"
2. "Для кого це": persona опис
3. "Яку гіпотезу тестуєш": конкретно що перевіряє цей лендінг
4. Live preview: iframe демо-лендінгу
5. Що включено: список секцій і features
6. Метрики успіху: conversion rate, bounce rate норма
7. Пакети: Basic (лендінг) / Standard (+ A/B тест) / Premium (+ analytics dashboard)
8. CTA: "Замовити за £299" + "Переглянути демо"

---

## Listing Page `/startup`

### Hero секція
- Заголовок: "Launch Your Startup in 3 Days"
- Підзаголовок: "Ready-made landing pages to test your idea, attract investors, and get your first users"
- Статистика: 30+ templates, від £299, запуск за 3-7 днів

### Фільтрація
- За категорією: SaaS / Marketplace / D2C / Mobile App / Community / Fintech / B2B
- За метою: Email capture / Demo booking / App download / Investment / Sales
- За бюджетом: до £499 / £499-£999 / £999+

### Картки рішень
```
┌─────────────────────────┐
│  🚀 SaaS Waitlist       │
│  Категорія: SaaS        │
│  Ціль: Email capture    │
│  від £299 · 3 дні       │
│  [Live Demo] [Замовити] │
└─────────────────────────┘
```

---

## Унікальні секції для стартап-рішень

### "Hypothesis Testing Guide"
На кожній сторінці рішення — блок:
- **Яку гіпотезу тестує цей лендінг**
- **Ключова метрика успіху** (conversion rate > X%)
- **Як виміряти** (GA4 events, Hotjar, email signups)
- **Коли вважати гіпотезу підтвердженою**

### "Growth Toolkit" (для Premium пакету)
- A/B тест setup (Vercel Edge Flags)
- Google Analytics 4 events конфігурація
- Hotjar heatmap setup
- Zapier/Make інтеграція для автоматичних email

### "Investor-Ready Mode"
Для деяких рішень (SaaS MVP, Fintech) — додатковий блок для залучення інвестицій:
- Traction metrics placeholder
- Team section
- Problem/Solution/Market Size (TAM/SAM/SOM)
- Roadmap

---

## Зв'язок з іншими секціями сайту

- **Marketplace** → стартап-рішення також продаються в marketplace, категорія "Startup"
- **Portfolio** → додати категорію "Startup Launches" в фільтр — показувати кейси стартапів
- **Blog** → серія статей "How to validate your startup idea with a landing page" (SEO)
- **Services** → "Startup Development" як окремий сервіс в Services dropdown
- **Niches** → посилання "Looking for niche-specific solution?" → /niches

---

## SEO стратегія

**Ключові запити:**
- "startup landing page template"
- "mvp landing page"
- "waitlist landing page"
- "SaaS landing page"
- "лендінг для стартапу"
- "посадкова сторінка MVP"

**Структура URL:** `/startup/saas-waitlist`, `/startup/marketplace-two-sided`

**Schema.org:** Product + Offer на кожній сторінці

---

## Пріоритети розробки

### Фаза 1 — Listing + 5 пілотних рішень (MVP) ✅ DONE
- [x] `/startup` listing page з Hero + категоріями + 5 карток
- [x] Дані для 5 рішень (`startup.ts`) + типи + helper functions
- [x] `/startup/[slug]` — detail page: hypothesis, sections, packages, demo preview, Schema.org Offer
- [x] 5 demo preview компонентів:
  1. `saas-waitlist` — SaasWaitlistPreview.tsx ✅
  2. `saas-mvp` — SaasMvpPreview.tsx ✅
  3. `mobile-app-landing` — MobileAppPreview.tsx ✅
  4. `dtc-brand` — DtcBrandPreview.tsx ✅
  5. `newsletter-landing` — NewsletterPreview.tsx ✅

### Фаза 2 — Розширення до 15 рішень ✅ DONE (2026-05-02)
- [x] +10 нових рішень у `startup.ts`: saas-b2b, marketplace-two-sided, crowdfunding-landing, ai-tool-landing, fintech-app, edtech-course, agency-portfolio, community-platform, impact-ngo, b2b-tool-launch ✅
- [x] sitemap.ts оновлено — `blogAuthorPages` + всі 15 startup сторінок у sitemap ✅
- [x] Demo preview компоненти для 10 нових рішень — ✅ реалізовано (2026-05-03): SaasB2bPreview, MarketplaceTwoSidedPreview, CrowdfundingPreview, AiToolPreview, FintechAppPreview, EdtechCoursePreview, AgencyPortfolioPreview, CommunityPlatformPreview, ImpactNgoPreview, B2bToolLaunchPreview — зареєстровано в DEMO_COMPONENTS
- [x] Секція "Hypothesis Testing Guide" на кожній сторінці — ✅ вже реалізовано: amber-блок "Яку гіпотезу тестує цей лендінг" + "Ключова метрика успіху" у `startup/[slug]/page.tsx`
- [ ] Інтеграція з Visual Customizer — ⚠️ Phase 3

### Фаза 3 — Повний каталог + Growth Toolkit
- [ ] Всі 30 рішень
- [ ] A/B тест setup в Premium пакеті
- [ ] Investor-Ready Mode для SaaS/Fintech
- [ ] Blog серія статей

---

## Приклади demo-лендінгів (детальні)

### 1. `saas-waitlist` — Waitlist Landing
**Секції:**
- Hero: велика назва продукту + "Coming Soon" + email signup форма
- Social proof: "2,847 people already waiting"
- Features: 3 ключові переваги з іконками
- "How it works": 3 кроки
- Countdown timer до launch
- Referral: "Запроси друга → піднімись у черзі"
- Footer: соцмережі + unsubscribe

**Conversion goal:** Email signup > 15%
**Delivery:** 3 дні
**Ціна:** від £299

### 2. `mobile-app-landing` — App Landing
**Секції:**
- Hero: phone mockup + назва + App Store/Google Play badges
- Features: 6 фіч з phone screenshot кожна
- How it works: 3 кроки з animated arrows
- Social proof: ratings, reviews, downloads count
- Screenshots gallery (swiper)
- Download CTA (sticky on mobile)
- Press coverage: логотипи медіа

**Conversion goal:** App download CTR > 25%
**Delivery:** 5 днів
**Ціна:** від £499

### 3. `dtc-brand` — D2C Brand Landing
**Секції:**
- Hero: hero product photo + compelling tagline + Buy Now
- Product story: founder's story
- The product: ingredients/materials, benefits, differentiators
- Social proof: UGC photos, reviews
- How to use: 3-4 кроки
- Subscription offer: "Save 15% with monthly subscription"
- FAQ
- Final CTA

**Conversion goal:** Add to cart > 5%, Purchase > 2%
**Delivery:** 5 днів
**Ціна:** від £599
