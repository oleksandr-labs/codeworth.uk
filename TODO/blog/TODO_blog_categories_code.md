# 📂 Blog Categories Expansion — Code Plan

> План розширення `BLOG_CATEGORIES` у `src/lib/data/blog.ts`
> **✅ 2026-05-02 (фаза 1): "AI та Автоматизація" додано. 21 AI/ML пост перекатегоризовано. Тести ✅**
> **✅ 2026-05-02 (фаза 2): BLOG_CATEGORIES → типізовані об'єкти BlogCategory (id/label.en/label.uk/icon/color/isNew). BlogContent.tsx та blog/page.tsx оновлено. Тести 44/44 ✅**
> **✅ 2026-05-02 (фаза 3): +5 нових категорій (performance, local-seo, mobile, email, social). +22 пости перерозподілено. +6 нових EN-постів для слабких категорій. 23 категорії, 128 постів загалом.**
> **✅ 2026-05-02 (фаза 4): Category SSG-сторінки /blog/category/[id] (22 сторінки). Sitemap +44 entries. Сортування (Newest/Oldest) у BlogContent. "New"/"Updated" badges на картках. Breadcrumb на blog/page.tsx. +4 нові EN-пости (Email, CRO, Security, Legal). Загалом 132 пости.**

---

## ✅ Поточні категорії у `BLOG_CATEGORIES` (РЕАЛІЗОВАНО 2026-05-02)

> **23 категорії** (включно з `all`). Тип `BlogCategory[]` з полями `id`, `label.en`, `label.uk`, `description`, `icon`, `color`, `isNew`.

| id | EN label | UK label | Posts | isNew |
|---|---|---|---|---|
| all | All Articles | Всі | — | — |
| seo | SEO & Promotion | SEO та просування | 8 | — |
| development | Web Development | Веб-розробка | 12 | — |
| ai | AI & Automation | AI та Автоматизація | 21 | ✅ |
| design | Design & UX | Дизайн і UX | 9 | — |
| ecommerce | E-commerce | E-commerce | 7 | — |
| cases | Client Cases | Кейси клієнтів | 20 | — |
| niches | Niche Solutions | Маркетплейс і нішеві рішення | 6 | — |
| analytics | Analytics & Data | Аналітика та дані | 3 | — |
| automation | Automation | Автоматизація | 3 | — |
| cro | Conversion (CRO) | Конверсія (CRO) | 2 | — |
| content-marketing | Content Marketing | Контент-маркетинг | 3 | — |
| tools | Tools & Technologies | Інструменти та технології | 2 | — |
| hosting | Hosting & Infrastructure | Хостинг та інфраструктура | 3 | — |
| marketing | Marketing & Ads | Маркетинг | 3 | — |
| business | Business & Growth | Бізнес та зростання | 4 | — |
| security | Security | Безпека | 2 | — |
| legal | Legal & GDPR | Право та GDPR | 2 | — |
| performance | Speed & Performance | Продуктивність | 5 | ✅ |
| local-seo | Local SEO | Локальний SEO | 5 | ✅ |
| mobile | Mobile & PWA | Мобільний веб та PWA | 3 | ✅ |
| email | Email Marketing | Email-маркетинг | 2 | ✅ |
| social | Social Media | Соціальні мережі | 2 | ✅ |

---

## ✅ Нові категорії — РЕАЛІЗОВАНО (23 загалом)

```typescript
// TARGET — src/lib/data/blog.ts (14 категорій + 'all')
export const BLOG_CATEGORIES: BlogCategory[] = [
  { id: 'all', label: { en: 'All Articles', uk: 'Всі статті' } },

  // === EXISTING (updated labels) ===
  {
    id: 'seo',
    label: { en: 'SEO & Promotion', uk: 'SEO та просування' },
    description: {
      en: 'Search engine optimisation, local SEO, Google Business Profile',
      uk: 'Пошукова оптимізація, локальне SEO, Google Business Profile',
    },
    icon: '🔍',
    color: 'blue',
  },
  {
    id: 'development',
    label: { en: 'Web Development', uk: 'Веб-розробка' },
    description: {
      en: 'Next.js, React, TypeScript, headless CMS, hosting',
      uk: 'Next.js, React, TypeScript, headless CMS, хостинг',
    },
    icon: '🌐',
    color: 'indigo',
  },
  {
    id: 'design',
    label: { en: 'Design & UX', uk: 'Дизайн і UX' },
    description: {
      en: 'UI/UX design, landing pages, typography, accessibility',
      uk: 'UI/UX дизайн, лендінги, типографіка, доступність',
    },
    icon: '🎨',
    color: 'purple',
  },
  {
    id: 'ecommerce',
    label: { en: 'E-commerce', uk: 'E-commerce' },
    description: {
      en: 'Online stores, Shopify, product pages, payment gateways',
      uk: 'Інтернет-магазини, Shopify, сторінки товарів, платіжні шлюзи',
    },
    icon: '🛒',
    color: 'green',
  },
  {
    id: 'cases',
    label: { en: 'Client Cases', uk: 'Кейси клієнтів' },
    description: {
      en: 'Real results, before & after, ROI from web projects',
      uk: 'Реальні результати, до та після, ROI з веб-проєктів',
    },
    icon: '🔄',
    color: 'teal',
  },
  {
    id: 'niches',
    label: { en: 'Niche Website Guides', uk: 'Нішеві рішення' },
    description: {
      en: 'Websites for restaurants, clinics, salons, law firms, real estate',
      uk: 'Сайти для ресторанів, клінік, салонів, юристів, нерухомості',
    },
    icon: '🏗',
    color: 'orange',
  },

  // === NEW CATEGORIES (8) ===
  {
    id: 'ai',
    label: { en: 'AI & Automation', uk: 'AI та Автоматизація' },
    description: {
      en: 'Artificial intelligence, machine learning, chatbots, automation for business',
      uk: 'Штучний інтелект, машинне навчання, чат-боти, автоматизація для бізнесу',
    },
    icon: '🤖',
    color: 'violet',
    isNew: true,
  },
  {
    id: 'marketing',
    label: { en: 'Marketing & Ads', uk: 'Маркетинг та Реклама' },
    description: {
      en: 'Digital marketing, Google Ads, social media, email marketing, funnels',
      uk: 'Цифровий маркетинг, Google Ads, соцмережі, email-маркетинг, воронки',
    },
    icon: '📣',
    color: 'red',
    isNew: true,
  },
  {
    id: 'business',
    label: { en: 'Business & Strategy', uk: 'Бізнес та Стратегія' },
    description: {
      en: 'For business owners: costs, choosing agency, contracts, ROI',
      uk: 'Для власників бізнесу: витрати, вибір виконавця, договори, ROI',
    },
    icon: '🤝',
    color: 'amber',
    isNew: true,
  },
  {
    id: 'security',
    label: { en: 'Security & GDPR', uk: 'Безпека та GDPR' },
    description: {
      en: 'Website security, GDPR compliance, SSL, data protection',
      uk: 'Безпека сайту, GDPR, SSL, захист даних',
    },
    icon: '🔐',
    color: 'gray',
    isNew: true,
  },
  {
    id: 'performance',
    label: { en: 'Speed & Performance', uk: 'Продуктивність' },
    description: {
      en: 'Core Web Vitals, PageSpeed, image optimisation, CDN, caching',
      uk: 'Core Web Vitals, PageSpeed, оптимізація зображень, CDN, кешування',
    },
    icon: '⚡',
    color: 'yellow',
    isNew: true,
  },
  {
    id: 'tools',
    label: { en: 'Tools & Resources', uk: 'Інструменти' },
    description: {
      en: 'Dev tools, SEO tools, marketing platforms, productivity',
      uk: 'Інструменти розробки, SEO-інструменти, маркетингові платформи',
    },
    icon: '🛠',
    color: 'slate',
    isNew: true,
  },
  {
    id: 'local-seo',
    label: { en: 'Local SEO', uk: 'Локальний SEO' },
    description: {
      en: 'Google Maps, local citations, city-specific SEO, regional marketing',
      uk: 'Google Maps, локальні цитування, SEO по містах, регіональний маркетинг',
    },
    icon: '🗺',
    color: 'emerald',
    isNew: true,
  },
  {
    id: 'legal',
    label: { en: 'Legal & Compliance', uk: 'Право та Договори' },
    description: {
      en: 'Digital contracts, copyright, GDPR, terms of service for web projects',
      uk: 'Цифрові договори, авторські права, GDPR, умови використання для сайтів',
    },
    icon: '⚖️',
    color: 'neutral',
    isNew: true,
  },
]
```

---

## ✅ Маппінг постів — ВИКОНАНО

### Фаза 1: AI категорія (2026-05-02)
21 постів → **AI та Автоматизація** (з "Аналітика та дані" та "Веб-розробка")

### Фаза 2: Нові категорії (2026-05-02)

| Slug | Звідки | Куди | ✅ |
|------|--------|------|----|
| core-web-vitals-2024 | SEO та просування | **Продуктивність** | ✅ |
| web-performance-core-web-vitals-2025 | Веб-розробка | **Продуктивність** | ✅ |
| nextjs-performance-optimization-core-web-vitals | Веб-розробка | **Продуктивність** | ✅ |
| core-web-vitals-guide | SEO та просування | **Продуктивність** | ✅ |
| slow-website-15-reasons | Веб-розробка | **Продуктивність** | ✅ |
| local-seo-ukraine-business | SEO та просування | **Локальний SEO** | ✅ |
| local-seo-google-business-profile-2025 | SEO та просування | **Локальний SEO** | ✅ |
| google-business-profile-guide | SEO та просування | **Локальний SEO** | ✅ |
| pharmacy-website-seo-local | SEO та просування | **Локальний SEO** | ✅ |
| coffee-bar-local-seo-loyalty | SEO та просування | **Локальний SEO** | ✅ |
| pwa-vs-native-app-ukraine | Веб-розробка | **Мобільний веб та PWA** | ✅ |
| pwa-vs-native-app-business-2025 | Веб-розробка | **Мобільний веб та PWA** | ✅ |
| pwa-for-small-business | Веб-розробка | **Мобільний веб та PWA** | ✅ |
| email-marketing-ecommerce-strategy-2025 | E-commerce | **Email-маркетинг** | ✅ |
| email-marketing-automation-ecommerce | Маркетинг | **Email-маркетинг** | ✅ |
| instagram-marketing-local-business-guide | Маркетинг | **Соціальні мережі** | ✅ |
| digital-marketing-zero-budget | Маркетплейс і нішеві рішення | **Маркетинг** | ✅ |
| google-ads-small-business | SEO та просування | **Маркетинг** | ✅ |
| google-analytics-4-setup-ecommerce-2025 | E-commerce | **Аналітика та дані** | ✅ |
| google-search-console-for-business-owners | Інструменти та технології | **Аналітика та дані** | ✅ |
| ecommerce-conversion-rate-optimization | E-commerce | **Конверсія (CRO)** | ✅ |
| b2b-website-lead-generation-ukraine-2025 | Дизайн і UX | **Бізнес та зростання** | ✅ |

### Нові пости (2026-05-02)

| Slug | Категорія |
|------|-----------|
| domain-ssl-hosting-business-guide | Хостинг та інфраструктура |
| vps-vs-shared-vs-cloud-hosting | Хостинг та інфраструктура |
| how-to-write-seo-blog-posts | Контент-маркетинг |
| content-strategy-service-business | Контент-маркетинг |
| linkedin-marketing-b2b-services | Соціальні мережі |
| n8n-automation-workflows-guide | Автоматизація |

---

## Завдання по коду

### 1. Оновити `src/lib/data/blog.ts`
- [x] Додати нові категорії до `BLOG_CATEGORIES` — ✅ 23 категорії (об'єкти BlogCategory)
- [x] Перерозподілити пости по нових категоріях — ✅ 22 пости переміщено точніше
- [x] Додати поле `seoKeyword` до структури `BlogPost` — ✅ інтерфейс оновлено
- [x] Додати поле `cluster` (A/B/C/D/E/F/G/H) до структури — ✅ інтерфейс оновлено
- [x] Додати поле `updatedDate`, `wordCount` до структури — ✅ інтерфейс оновлено
- [ ] Заповнити поля `cluster` та `seoKeyword` для існуючих постів — ⚠️ Phase 2: потребує ручного data-entry для 130+ постів

### 2. Оновити `src/app/[lang]/blog/page.tsx`
- [x] Оновити відображення категорій в hero-секції — ✅ BLOG_CATEGORIES замість хардкодованих масивів
- [x] Додати badge "NEW" для нових категорій (isNew: true) — ✅ реалізовано в BlogContent.tsx
- [x] Sidebar categories з іконками та кількістю постів — ✅ реалізовано
- [x] Фільтр по категорії (23 + all) — ✅ реалізовано в BlogContent.tsx
- [ ] Додати групування по кластерах (опціонально) — ⚠️ Phase 3: опціональна UI-фіча, потребує заповнення cluster-полів
- [x] Фільтр "EN Only" / "UK Only" — ✅ реалізовано (session 30): Globe toggle All/EN/UK + 🇬🇧 badge на картках + lang chip у активних фільтрах
- [x] Сортування: Newest / Most Popular / Recommended — ✅ частково: Newest/Oldest реалізовано; Most Popular потребує аналітики (Phase 2)

### 3. Category SSG-сторінки
- [x] Додати category-сторінки `/blog/category/[category]` — ✅ `src/app/[lang]/blog/category/[category]/page.tsx` створено
- [x] `generateStaticParams` — ✅ 22 category ids
- [x] CollectionPage + BreadcrumbList JSON-LD схеми — ✅
- [x] Category sidebar з post counts та active highlight — ✅
- [x] Посилання на category page з blog post (badge + breadcrumb) — ✅

### 4. Оновити sitemap
- [x] Нові category-сторінки `/en/blog/category/performance` тощо — ✅
- [x] Пріоритет category-сторінок: 0.8 — ✅

### 5. Оновити тести
- [x] `blog.test.ts` — тести для нових категорій — ✅ 44/44 passing
- [x] `BlogContent.test.tsx` — оновлено mock для BlogCategory об'єктів — ✅
- [x] Перевірити що всі пости мають валідну category — ✅ тест passes

---

## Нові типи для `BlogPost`

```typescript
// src/lib/data/blog.ts — розширений тип
export interface BlogPost {
  slug: string
  title: { en: string; uk: string }
  description: { en: string; uk: string }
  date: string
  updatedDate?: string          // NEW: для "last updated" badge
  category: BlogCategoryId      // розширено до 14 категорій
  tags: string[]
  content: { en: string[]; uk: string[] }
  author?: string               // NEW: для E-E-A-T
  readingTime?: number          // NEW: хвилини читання (auto-calculated)
  cluster?: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H'  // NEW: pillar cluster
  pillarSlug?: string           // NEW: посилання на pillar post
  seoKeyword?: { en: string; uk: string }  // NEW: primary keyword per post
  featured?: boolean            // NEW: для "Featured Post" на головній блогу
  wordCount?: number            // NEW: для фільтрації за глибиною
}
```

---

## Blog List Page — нові фічі

### Фільтрація (розширена)
- [x] Фільтр по категорії (23 + all) — ✅ sidebar з усіма категоріями
- [x] Фільтр по тегу — ✅ sidebar tags
- [x] Фільтр "EN Only" / "UK Only" — ✅ реалізовано (session 30)
- [x] Сортування: Newest / Oldest — ✅ dropdown реалізовано в BlogContent

### Відображення
- [x] Категорія-badge на кожній картці поста — ✅ реалізовано
- [x] Reading time badge ("X min read") — ✅ реалізовано (readTime поле)
- [x] "NEW" badge для нових категорій (isNew: true) — ✅ реалізовано в sidebar
- [x] Sidebar categories з іконками та кількістю постів — ✅ реалізовано
- [x] "New" badge для постів < 60 днів — ✅ зелений badge overlay на cover
- [x] "Updated" badge для оновлених постів < 60 днів (updatedDate) — ✅ синій badge overlay
- [ ] Pillar posts — виділити більшим дизайном (featured card) — ⚠️ Phase 3: опціональна UI-фіча

### Навігація
- [x] Breadcrumb: Home → Blog — ✅ видимий breadcrumb на blog/page.tsx
- [x] Category-сторінки `/blog/category/[category]` (SSG) — ✅ 22 сторінки
- [x] "Related articles" в кінці кожного поста (same category) — ✅ full-width 3-card section під статтею
