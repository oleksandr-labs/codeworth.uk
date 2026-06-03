# Проєкт: codenest.com.ua — Веб-студія та Маркетплейс

## Зміст
[Про проєкт](#про-проєкт) · [Прогрес](#загальний-прогрес) · [Архітектура](#архітектура-рендерингу) · [Сторінки](#основні-сторінки-pages) · [Блог](#контент-блогу-blog-content) · [Доробки](#доробки-та-мікро-послуги-extras) · [Послуги](#сторінки-послуг-services) · [Портфоліо](#портфоліо-portfolio) · [Нові сторінки](#нові-сторінки-new-pages) · [Маркетплейс](#маркетплейс-marketplace) · [Ніші](#тестові-нішеві-сторінки-demoniches--33--нові) · [SEO](#seo) · [SEO-сторінки](#seo-сторінки-для-органічного-просування) · [Design](#design) · [Tech](#tech) · [i18n](#i18n--локалізація-en--uk) · [Аналіз](#-аналіз-проєкту-2026-05-01)

> 📊 **Великий аналіз + пропозиції покращень:** [TODO_ANALYSIS_AND_IMPROVEMENTS.md](TODO_ANALYSIS_AND_IMPROVEMENTS.md) *(оновлено 2026-05-03)*

---

## Про проєкт
**Назва сайту:** codenest.com.ua
**Бренд:** CodeNest — веб-студія повного циклу
**Ціль:** Створення багатофункціонального сайту, що поєднує портфоліо-агенцію з маркетплейсом готових ніше-орієнтованих рішень.
**Аудиторія:** Малий та середній бізнес в Україні — ресторани, салони краси, будівельники, медичні клініки, магазини, юристи, школи тощо.
**Монетизація:** Послуги під замовлення + продаж готових шаблонних рішень через маркетплейс + підписка на підтримку.
**Технічний стек (планується):** Next.js 14+ (App Router), TypeScript, Tailwind CSS, Headless CMS (Sanity або Strapi), PostgreSQL + Prisma, Vercel.
**Поточний статус:** Активна розробка — 180+ сторінок, 1884 unit тести (132 suites), 0 TypeScript errors. Всі публічні сторінки SSG. Повний опис: **192 блог-пости** (оновлено 2026-05-02 session 31: 69 EN posts з contentEn; всі 22 категорії мають ≥5 постів; EN/UK мовний фільтр + 🇬🇧 badge на картках; +25 нових EN-постів; 23 категорії як BlogCategory об'єкти; тести 1884/1884 ✅) (5-6 секцій кожен), 225 portfolio кейси (оновлено 2026-05-02: +29 нових AI/ML кейсів + ml-patient-risk-scoring — SupplyIQ, GuardAI, EstateIQ, HarvestIQ, TriageAI, VoiceIQ, ContentForge, MedAssist, InvoiceAI, LearnAI, DualBot, ClinicalIQ тощо), 34 нішеві демо-сторінки з повними даними (trustStats/nicheFaq/pricingPlans/processSteps/calculatorSteps/team/promotions/productCards/projectCards/courseCards/scheduleItems/jobCards), 15 сервісних сторінок з processSteps (4 кроки) + caseStudies (3 кейси) + useCases (6 ніш) + FAQ (5-7 питань). Маркетплейс: каталог + продукт + кошик + чекаут + акаунт + адмін + /niches лістинг (33 ніші) + /marketplace/compare (порівняння). Головна: HeroSection + ServicesSection + HowWeWorkSection + WhyUsSection + CasesSection + ClientLogosSection (4 trust badges + 12 логотипів) + MarketplaceTeaser + TestimonialsSection (9 відгуків з пагінацією + touch swipe) + BlogPreviewSection + CTASection. FloatingChat з FAQ-based chatbot (6 швидких відповідей). Контакти: FAQ quick-answers перед формою. About: розширені профілі команди з bio та соц. посиланнями. Schema.org: Organization, WebSite, LocalBusiness, Service, BreadcrumbList (всі сторінки), Article, FAQPage, Product, ItemList, CollectionPage. SEO: www→non-www redirect, trailing slash redirect, canonical URLs (24 сторінки). CI/CD: GitHub Actions (test+lint+audit+build+E2E), Lighthouse CI, CodeQL SAST. PWA: manifest + Service Worker + offline page. A11y: 43 jest-axe тести (21 компонент), ARIA attributes, keyboard navigation, skip-to-content. E2E: Playwright (home/contact/marketplace/auth/viewport/seo/smoke/visual).
**Дата останнього оновлення:** 2026-05-02 (session 31)

## Ключові вимоги до проєкту
- ✅ **Статична генерація (SSG)** — всі публічні сторінки генеруються статично для максимальної швидкості та SEO
- ✅ **SEO-first підхід** — кожна сторінка має унікальні Title, Description, OG-теги, Schema.org розмітку та оптимізований контент
- ✅ **Візуальна досконалість** — дизайн рівня Awwwards: анімації, мікровзаємодії, сучасна типографіка, преміальні ілюстрації
- ✅ **Mobile First** — адаптивний дизайн з пріоритетом мобільних пристроїв, PWA-готовність
- ✅ **Core Web Vitals** — LCP < 2.5с, FID < 100мс, CLS < 0.1 для всіх сторінок
- ✅ **Двомовний контент** — основна мова EN (English), друга мова UK (Ukrainian); всі тексти якісні та SEO-оптимізовані; демо-сторінки портфоліо автоматично відповідають мові URL-сегменту (`/en/` → EN, `/uk/` → UK); валюта: EN → £ (GBP), UK → ₴ (UAH); адреси та телефони також locale-aware
- ✅ **Брендинг CodeNest** — логотип (метафора "гнізда" / "будинку з коду"), власна дизайн-система, фірмові кольори

---

## Загальний прогрес
- ✅ Виконано завдань: ~630 (+session 29: `previewImage`/`marketplaceSlug` поля у NicheData; marketplace карточки з Image preview fallback; `PageAnalytics` client компонент; analytics.pricingView() у pricing/page + analytics.portfolioView(slug) у portfolio/[slug]; analytics.ctaClick() у HeroSection CTA кнопках; analytics.ctaClick() для email/phone у Footer; Button.tsx: onClick передається у Link-варіант; 1884/132 тести зелені)
- Загальна кількість завдань: ~300+

## Архітектура рендерингу
| Тип сторінки | Метод | Причина |
|---|---|---|
| Головна, Про нас, Контакти | SSG | Статичний контент, максимальна швидкість |
| Послуги, Портфоліо, Ціни | SSG | Контент змінюється рідко, SEO-пріоритет |
| Блог (список + пости) | SSG + ISR (5 хв) | Оновлення контенту через CMS |
| Маркетплейс (каталог, продукти) | SSG + ISR (10 хв) | Кешування з фоновим оновленням |
| Кабінет, Кошик, Чекаут | CSR / SSR | Авторизовані, персоналізовані дані |
| Нішеві demo-сторінки | SSG | Статичні приклади для клієнтів |

---

## Основні сторінки (Pages)

### Загальні
- ✅ [Головна сторінка](pages/TODO_home.md)
- ✅ [Про нас](pages/TODO_about.md)
- ✅ [Портфоліо](pages/TODO_portfolio.md)
- ✅ [Ціни](pages/TODO_pricing.md)
- ✅ [Блог](pages/TODO_blog.md) — **192 пости** (оновлено 2026-05-02 session 31: +AI/ML серія; nicheSlug виправлено → undefined для недійсних ніш), **23 категорії** (BlogCategory з id/label.en/label.uk/icon/color/isNew), sidebar з іконками та NEW-badge, тести 32/32 ✅
- ✅ [FAQ](pages/TODO_faq.md)
- ✅ [Контакти](pages/TODO_contact.md)
- ✅ [Карта сайту](pages/TODO_sitemap.md)
- ✅ [Політика конфіденційності](pages/TODO_privacy.md)
- ✅ [Доробки та модулі](/extras) — каталог мікро-послуг і доробок (219 позицій, 10 категорій, **36 демо**; оновлено 2026-05-02 session 31: +feat-multistep-form ✅демо, +feat-floating-chat ✅демо, +feat-waitlist ✅демо, +feat-newsletter-inline ✅демо, +feat-social-proof-counter ✅демо, +feat-sticky-cta ✅демо; +8 нових features, +5 нових інтеграцій, +4 нових ecom, **+10 нових AI** → 19 AI-позицій загалом; +ai-copywriter ✅демо, +ai-voice-search ✅демо, +ai-price-optimizer ✅демо)

### Контент Блогу (Blog Content)

> Окремий розділ TODO для планування SEO-статей блогу. 28 категорій, ~1 400+ запланованих статей. Всі статті пишуться спочатку 🇬🇧 EN, потім 🇺🇦 UK.
> **2026-05-02: SEO-стратегія блогу повністю задокументована.** 8 topical clusters, 8 pillar pages, 100+ cluster posts, 50 Featured Snippet targets, план розширення до 14 категорій.

#### 🎯 SEO-стратегія блогу (нові файли, 2026-05-02)
- ✅ [SEO Master Strategy](blog/TODO_blog_seo_master_strategy.md) — 8 кластерів, keyword map, E-E-A-T plan, content guidelines
- ✅ [Content Calendar 12 міс](blog/TODO_blog_content_calendar.md) — 80+ постів по місяцях: titles, slugs, EN keywords, priorities
- ✅ [Pillar + Cluster Architecture](blog/TODO_blog_pillar_clusters.md) — 8 pillar pages + 100 cluster posts з keyword targets
- ✅ [Categories Expansion — DONE](blog/TODO_blog_categories_code.md) — 23 категорії (BlogCategory з id/label/icon/color/isNew), 22 category SSG-сторінки (/blog/category/[id]), sorting, New/Updated badges, related articles секція, breadcrumb, +13 нових EN-постів, тести 32/32
- ✅ [Featured Snippets 50 targets](blog/TODO_blog_featured_snippets.md) — 50 snippet targets, PAA strategy, FAQPage schema plan
- ✅ [Internal Linking Map](blog/TODO_blog_internal_linking_map.md) — blog→services, blog→blog, blog→portfolio, anchor rules
- ✅ [EN Keywords per Post](blog/TODO_blog_en_keywords_per_post.md) — EN title + primary keyword + meta description per пост

- ✅ [Архітектура блогу](blog/TODO_blog_architecture.md) — загальна стратегія, 28 категорій, ~1 400+ статей, EN→UK мовна політика + SEO файли
  - **🖥 tech/** — 7 файлів, ~395 статей
    - ✅ [Веб-розробка та Технології](blog/tech/TODO_blog_webdev.md) — 84 статті
    - ✅ [Продуктивність та Оптимізація](blog/tech/TODO_blog_performance.md) — 50 статей
    - ✅ [AI та Технології майбутнього](blog/tech/TODO_blog_ai.md) — 56 статей
    - ✅ [Тренди та Майбутнє Веб-розробки](blog/tech/TODO_blog_trends.md) — 50 статей
    - ✅ [Безпека сайту](blog/tech/TODO_blog_security.md) — 45 статей
    - ✅ [Покрокові Гайди для Розробників](blog/tech/TODO_blog_guides_dev.md) — 35 статей *(новий)*
    - ✅ [Інструменти та Сервіси](blog/tech/TODO_blog_tools.md) — 30 статей *(новий)*
  - **🔍 seo/** — 4 файли, ~260 статей
    - ✅ [SEO та Пошукова Оптимізація](blog/seo/TODO_blog_seo.md) — 86 статей
    - ✅ [Регіональний та Локальний SEO](blog/seo/TODO_blog_local_seo.md) — 53 статті
    - ✅ [Аналітика та Дані](blog/seo/TODO_blog_analytics.md) — 44 статті
    - ✅ [Питальні запити (Featured Snippets)](blog/seo/TODO_blog_questions.md) — 86 статей
  - **📣 marketing/** — 5 файлів, ~270 статей
    - ✅ [Цифровий Маркетинг](blog/marketing/TODO_blog_marketing.md) — 60 статей
    - ✅ [Контент та Копірайтинг](blog/marketing/TODO_blog_content.md) — 62 статті
    - ✅ [Монетизація та Бізнес-стратегія](blog/marketing/TODO_blog_monetization.md) — 46 статей
    - ✅ [Соціальні Мережі та SMM](blog/marketing/TODO_blog_social_media.md) — 35 статей *(новий)*
    - ✅ [Email-маркетинг та Реклама](blog/marketing/TODO_blog_email_ads.md) — 30 статей *(новий)*
  - **🎨 design/** — 2 файли, ~110 статей
    - ✅ [Дизайн та UX/UI](blog/design/TODO_blog_design.md) — 69 статей
    - ✅ [Ідеї та Натхнення](blog/design/TODO_blog_inspiration.md) — 42 статті
  - **🛒 ecommerce/** — 2 файли, ~150 статей
    - ✅ [E-commerce та Інтернет-магазини](blog/ecommerce/TODO_blog_ecommerce.md) — 67 статей
    - ✅ [Сайти для конкретних ніш](blog/ecommerce/TODO_blog_niches.md) — 85 статей
  - **🤝 business/** — 6 файлів, ~280 статей
    - ✅ [Бізнес, Фінанси та Вибір Виконавця](blog/business/TODO_blog_business.md) — 55 статей
    - ✅ [Для Власників Бізнесу](blog/business/TODO_blog_owners.md) — 56 статей
    - ✅ [Масштабування та Міжнародний Бізнес](blog/business/TODO_blog_international.md) — 40 статей
    - ✅ [Кейси та Реальні Результати](blog/business/TODO_blog_cases.md) — 45 статей
    - ✅ [Покрокові Гайди для Бізнесу](blog/business/TODO_blog_guides_business.md) — 35 статей *(новий)*
    - ✅ [Право, Договори та Цифровий Бізнес](blog/business/TODO_blog_legal.md) — 30 статей *(новий)*

### Доробки та Мікро-послуги (Extras)

> Окремий розділ TODO для каталогу доробок та мікро-послуг. Аналог до блогу — з розбивкою по категоріях.

- ✅ [Архітектура доробок](extras/TODO_extras_architecture.md) — загальний огляд, 10 категорій, 219 позицій, **28 демо** *(оновлено 2026-05-02)*
  - ✅ [Окремі сторінки](extras/pages/TODO_extras_pages.md) — лендінг, FAQ, вакансії, блог тощо (9 реалізовано + 10 план.)
  - ✅ [Функціональні модулі](extras/features/TODO_extras_features.md) — форми, booking, калькулятор (10 реалізовано + 12 план.)
  - ✅ [Аналітика та звітність](extras/analytics/TODO_extras_analytics.md) — GA4, GTM, Hotjar, A/B (6 реалізовано + 7 план.)
  - ✅ [Адмін-панелі та CMS](extras/admin/TODO_extras_admin.md) — 14+ позицій: admin-blog, admin-catalog, admin-orders, admin-seo-editor, admin-appointments тощо
  - ✅ [Зовнішні інтеграції](extras/integrations/TODO_extras_integrations.md) — 19+ позицій: API, платежі, CRM, Ukrposhta, Apple/Google Pay, Diia, Telegram Mini App
  - ✅ [E-commerce функції](extras/ecommerce/TODO_extras_ecommerce.md) — 15+ позицій: mini-shop, cart, wishlist, gift-cards, bundle-builder, invoice-gen
  - ✅ [SEO та оптимізація](extras/seo/TODO_extras_seo.md) — аудит, Schema.org, швидкість (6 реалізовано + 11 план.)
  - ✅ [Контент та копірайтинг](extras/content/TODO_extras_content.md) — статті, тексти, переклади (5 реалізовано + 9 план.)
  - ✅ [Маркетинг та автоматизація](extras/marketing/TODO_extras_marketing.md) — 18+ позицій: telegram-bot, email, push, fb-pixel, referral, QR, loyalty
  - ✅ [🤖 AI-функції](extras/ai/TODO_extras_ai.md) — **нова категорія** (2026-05-01): **19 позицій** у каталозі — RAG чат-бот, семантичний пошук, image search, voice search, автопереклад, оптимізатор цін, рекомендації, модерація, копірайтер, FAQ-генератор, demand forecast, chat summary, form assistant + 2 більш запланованих (ai-auto-crop, ai-form-assistant)

### Сторінки послуг (Services)
- ✅ [Огляд послуг](pages/services/TODO_services_overview.md)
- ✅ [Розробка сайтів](pages/services/TODO_website_dev.md)
- ✅ [Інтернет-магазини](pages/services/TODO_ecommerce.md)
- ✅ [Лендінги та презентаційні сторінки](pages/services/TODO_landing.md)
- ✅ [CRM та бізнес-системи](pages/services/TODO_crm.md)
- ✅ [Мобільні додатки (PWA)](pages/services/TODO_mobile.md)
- ✅ [SEO-просування](pages/services/TODO_seo_service.md)
- ✅ [UI/UX Дизайн](pages/services/TODO_design_service.md)
- ✅ [Технічна підтримка та обслуговування](pages/services/TODO_support.md)
- ✅ [Контекстна та таргетована реклама](pages/services/TODO_ads.md)
- ✅ [Email-маркетинг та розсилки](pages/services/TODO_email_marketing.md)
- ✅ [Розробка чат-ботів](pages/services/TODO_chatbots.md)
- ✅ [Брендинг та фірмовий стиль](pages/services/TODO_branding.md)
- ✅ [SMM та контент-маркетинг](pages/services/TODO_smm.md)
- ✅ [Штучний інтелект (AI)](pages/services/TODO_artificial_intelligence.md) — `/services/artificial-intelligence` | 301 redirect з /ai-ml | ✅ портфоліо: ai-chatbot-saas, cv-quality-control, nlp-review-monitor
- ✅ [Machine Learning](pages/services/TODO_machine_learning.md) — `/services/machine-learning` | ✅ портфоліо: ml-churn-predictor, fraud-detection-fintech, demand-forecast-retail, reco-engine-ecom (2026-05-01)

### Портфоліо (Portfolio)

- ✅ [Портфоліо](pages/TODO_portfolio.md) — основний файл
- ✅ [EN-переклади портфоліо](portfolio/TODO_portfolio_en_translations.md) — ✅ 226/226 проєктів мають descriptionEn + resultEn (оновлено 2026-05-02: +fintech-credit-broker, +ml-patient-risk-scoring)
- ✅ [Нові портфоліо-проєкти](portfolio/TODO_portfolio_new_projects.md) — ✅ **7 з 7** реалізовано: `carwash-premium` ✅, `subscription-box-monthly` ✅, `fintech-neobank` ✅, `coworking-urban` ✅, `ai-resume-screener` ✅, `ai-price-optimizer` ✅, `fintech-credit-broker` ✅. Також додано: `ml-patient-risk-scoring` ✅
- ✅ [ERP Systems — фільтр + 5 кейсів + 5 живих демо](portfolio/TODO_portfolio_erp.md) — **нова категорія для UK ринку**: WholesaleHub (sidebar+tables), ChainOps (3-col ops), BuildTrack (Gantt), RetailCore (BI dashboard), AgencyDesk (kanban+timer). Кожне демо — окрема структура/тема. Список покращень у файлі.

### Нові сторінки (New Pages)

- ✅ [Use Cases](pages/TODO_use_cases.md) — 15 кейсів застосування (`/use-cases`) ✅ реалізовано 2026-05-02: `src/lib/data/useCases.ts` + `src/app/[lang]/use-cases/page.tsx` + `src/app/[lang]/use-cases/[slug]/page.tsx` (SSG, EN+UK, 16 кейсів, sitemap)
- ✅ [Безкоштовні інструменти](pages/TODO_tools.md) — 10 онлайн-інструментів (`/tools`) ✅ завершено 2026-05-02 session 32: **10/10 активні** — +PageSpeedAudit (Core Web Vitals score ring, LCP/CLS/FCP/TTFB, opportunities via `/api/speed-test` → Google PageSpeed Insights API)
- ✅ [Showcase — компонентна галерея](pages/TODO_showcase.md) — інтерактивна галерея всіх компонентів (`/showcase`) ✅ реалізовано 2026-05-02: `src/app/[lang]/showcase/page.tsx` + `ShowcaseClient.tsx` (SSG, EN+UK, живі демо кнопок/форм/карток/аватарів/кроків/скелетонів + посилання на 9 extras демо, sitemap)

### Маркетплейс (Marketplace)
- ✅ [Головна маркетплейсу](pages/marketplace/TODO_marketplace_main.md)
- ✅ [Каталог рішень](pages/marketplace/TODO_marketplace_catalog.md)
- ✅ [Сторінка продукту](pages/marketplace/TODO_marketplace_product.md)
- ✅ [Кошик та оформлення замовлення](pages/marketplace/TODO_marketplace_checkout.md)
- ✅ [Особистий кабінет покупця](pages/marketplace/TODO_marketplace_account.md)
- ✅ [Панель продавця/адміна](pages/marketplace/TODO_marketplace_admin.md)
- ✅ [Приклад реалізації (MVP)](pages/marketplace/TODO_marketplace_implementation.md)

### Тестові нішеві сторінки (Demo/Niches) — 33 + нові

> Кожна ніша: файл-огляд у `_demo_pages/` + 3–5 конкретних проєктів у підпапці ніші.
> 📂 **Повний навігатор по всіх ~105 нішевих проєктах:** [pages/niches/_INDEX.md](pages/niches/_INDEX.md)

#### 🍽 Їжа та гостинність
- ✅ [Ресторан / Кафе](pages/niches/_demo_pages/TODO_restaurant.md)
- ✅ [Доставка їжі](pages/niches/_demo_pages/TODO_food_delivery.md)
- ✅ [Кондитерська / Пекарня](pages/niches/_demo_pages/TODO_bakery.md)
- ✅ [Кав'ярня / Вінотека / Бар / Паб](pages/niches/_demo_pages/TODO_coffee_bar.md)

#### 💇 Краса та здоров'я
- ✅ [Салон краси / Барбершоп](pages/niches/_demo_pages/TODO_beauty.md)
- ✅ [Фітнес-клуб / Тренер](pages/niches/_demo_pages/TODO_fitness.md)
- ✅ [Медична клініка / Стоматологія](pages/niches/_demo_pages/TODO_medical.md)
- ✅ [Ветеринарна клініка / Зоомагазин](pages/niches/_demo_pages/TODO_veterinary.md)
- ✅ [Аптека / Товари для здоров'я](pages/niches/_demo_pages/TODO_pharmacy.md)
- ✅ [SPA-центр / Тату-студія / Нігтьовий сервіс](pages/niches/_demo_pages/TODO_tattoo_spa.md)
- ✅ [Психолог / Коуч / Терапевт](pages/niches/_demo_pages/TODO_psychology.md)

#### 🏗 Будівництво та нерухомість
- ✅ [Будівництво / Ремонт](pages/niches/_demo_pages/TODO_construction.md)
- ✅ [Нерухомість / Агентство](pages/niches/_demo_pages/TODO_realestate.md)
- ✅ [Клінінг та домашні послуги](pages/niches/_demo_pages/TODO_cleaning.md)

#### 🚗 Авто та логістика
- ✅ [Автосервіс / Автосалон](pages/niches/_demo_pages/TODO_auto.md)
- ✅ [Логістика / Перевезення](pages/niches/_demo_pages/TODO_logistics.md)
- ✅ [SparkWash — Мережа Преміум Автомийок](pages/niches/carwash/TODO_sparkwash_carwash.md) — ✅ реалізовано 2026-05-01

#### 🛒 E-commerce та ритейл
- ✅ [Інтернет-магазин одягу](pages/niches/_demo_pages/TODO_fashion.md)
- ✅ [Магазин електроніки / Техніки](pages/niches/_demo_pages/TODO_electronics.md)
- ✅ [Меблі / Інтер'єр](pages/niches/_demo_pages/TODO_furniture.md)
- ✅ [Квітковий магазин / Подарунки](pages/niches/_demo_pages/TODO_flowers.md)
- ✅ [BoxClub — Subscription Box E-commerce](pages/niches/subscription_box/TODO_boxclub_subscription.md) — ✅ реалізовано 2026-05-01

#### 🎨 Креатив та розваги
- ✅ [Фотограф / Відеограф](pages/niches/_demo_pages/TODO_photographer.md)
- ✅ [Івент-агентство / Весілля](pages/niches/_demo_pages/TODO_events.md)
- ✅ [Туризм / Готельний бізнес](pages/niches/_demo_pages/TODO_travel.md)
- ✅ [Квест-кімнати / Ігровий центр / Розваги](pages/niches/_demo_pages/TODO_entertainment.md)

#### 📚 Освіта та консалтинг
- ✅ [Освіта / Онлайн-курси](pages/niches/_demo_pages/TODO_education.md)
- ✅ [Юридичні послуги](pages/niches/_demo_pages/TODO_law.md)
- ✅ [Бухгалтерія / Консалтинг](pages/niches/_demo_pages/TODO_consulting.md)

#### 💻 IT та SaaS
- ✅ [SaaS / IT-продукт](pages/niches/_demo_pages/TODO_saas.md)
- ✅ [NGO / Благодійний фонд](pages/niches/_demo_pages/TODO_ngo.md)
- ✅ [DigitalFirst Bank — Цифровий Необанк (FinTech)](pages/niches/fintech/TODO_digitalfirst_neobank.md) — ✅ реалізовано 2026-05-01
- ✅ [UrbanDesk — Мережа Коворкінгів](pages/niches/coworking/TODO_urbandesk_coworking.md) — ✅ реалізовано 2026-05-01

#### 👶 Дитяча та сімейна тематика
- ✅ [Дитячий центр / Розвивальні заняття / Приватний садок](pages/niches/_demo_pages/TODO_kids_center.md)

#### 🌾 Виробництво та хенд-мейд
- ✅ [Агро / Фермерська продукція / Органічні товари](pages/niches/_demo_pages/TODO_agriculture.md) — 5 демо-проєктів: AgroUA, AgroDrone, OrganicBox, VynohradUA 🍷, PasikaMed 🍯
- ✅ [Хенд-мейд / Крафт / Авторська майстерня](pages/niches/_demo_pages/TODO_craft.md)

#### 👔 Бізнес-послуги
- ✅ [HR / Рекрутинг / Кадрова агенція](pages/niches/_demo_pages/TODO_recruitment.md)

> **Примітка:** Всі 33 нішевих demo-сторінок — статичні (SSG), SEO-оптимізовані та використовуються як живі приклади продуктів маркетплейсу. Кожна має різний рівень складності — від простого лендінгу до повноцінного порталу з e-commerce.

---

## AI / ML Нішеві посадкові сторінки

> Окремий розділ посадкових сторінок по галузях для AI та ML напрямків. Кожна сторінка = окремий SEO keyword cluster.

### AI Нішеві сторінки (`/en/ai/[niche]`)
- ✅ [AI Стратегія та архітектура](ai-niche-pages/TODO_ai_strategy.md) — URL структура, перелінковка, Schema.org
- ✅ [AI Overview Page `/ai`](ai-niche-pages/TODO_ai_overview_page.md) — хаб для 10 нішевих сторінок
- ✅ [AI для медицини](ai-niche-pages/TODO_ai_healthcare.md) — /ai/healthcare, from £3,500
- ✅ [AI для e-commerce](ai-niche-pages/TODO_ai_ecommerce.md) — /ai/ecommerce, from £1,500
- ✅ [AI для FinTech](ai-niche-pages/TODO_ai_fintech.md) — /ai/fintech, from £2,500
- ✅ [AI для маркетингу](ai-niche-pages/TODO_ai_marketing.md) — /ai/marketing, from £1,200
- ✅ [AI для HR](ai-niche-pages/TODO_ai_hr.md) — /ai/hr, from £2,000
- ✅ [AI для готелів](ai-niche-pages/TODO_ai_hospitality.md) — /ai/hospitality, from £2,000
- ✅ [AI для освіти](ai-niche-pages/TODO_ai_education.md) — /ai/education, from £1,800
- ✅ [AI для виробництва (CV)](ai-niche-pages/TODO_ai_manufacturing.md) — /ai/manufacturing, from £5,000
- ✅ [AI для юристів](ai-niche-pages/TODO_ai_legal.md) — /ai/legal, from £1,800
- ✅ [AI для нерухомості](ai-niche-pages/TODO_ai_realestate.md) — /ai/real-estate, from £1,500

### ML Нішеві сторінки (`/en/ml/[niche]`)
- ✅ [ML Стратегія та архітектура](ml-niche-pages/TODO_ml_strategy.md) — URL структура, перелінковка, Schema.org
- ✅ [ML Overview Page `/ml`](ml-niche-pages/TODO_ml_overview_page.md) — хаб для 10 ML нішевих сторінок
- ✅ [ML для Banking](ml-niche-pages/TODO_ml_banking.md) — /ml/banking, from £8,000
- ✅ [ML для Retail](ml-niche-pages/TODO_ml_retail.md) — /ml/retail, from £5,000
- ✅ [ML для SaaS](ml-niche-pages/TODO_ml_saas.md) — /ml/saas, from £5,000
- ✅ [ML для Logistics](ml-niche-pages/TODO_ml_logistics.md) — /ml/logistics, from £5,000
- ✅ [ML для Manufacturing](ml-niche-pages/TODO_ml_manufacturing.md) — /ml/manufacturing, from £7,000
- ✅ [ML для AgriTech](ml-niche-pages/TODO_ml_agritech.md) — /ml/agritech, from £6,000 ⭐ унікальна ніша
- ✅ [ML для Cybersecurity](ml-niche-pages/TODO_ml_cybersecurity.md) — /ml/cybersecurity, from £7,000
- ✅ [ML для Real Estate AVM](ml-niche-pages/TODO_ml_realestate.md) — /ml/real-estate, from £8,000
- ✅ [ML для Healthcare](ml-niche-pages/TODO_ml_healthcare.md) — /ml/healthcare, from £8,000
- ✅ [ML для Energy](ml-niche-pages/TODO_ml_energy.md) — /ml/energy, from £4,000

### AI/ML Підтримуючий контент
- ✅ [Портфоліо стратегія AI](ai-niche-pages/TODO_ai_portfolio_strategy.md) — 6 AI кейсів реалізовано (2026-05-02): ai-rag-healthcare-system, ai-invoice-automation, ai-content-studio, ai-voice-hotel-assistant, ai-edtech-adaptive-lms, ai-bilingual-rag-chatbot
- ✅ [Портфоліо стратегія ML](ml-niche-pages/TODO_ml_portfolio_strategy.md) — 5 ML кейсів реалізовано (2026-05-02): ml-fraud-detection-fca, ml-supply-chain-fmcg, ml-property-valuation, ml-harvest-precision-agriculture, ml-support-triage-bert
- ✅ [AI рішення / products](ai-niche-pages/TODO_ai_solutions_catalog.md) — 28/29 AI extras у каталозі; pending: `ai-chatbot-basic`
- ✅ [Blog posts plan AI+ML](ai-niche-pages/TODO_ai_ml_blog_posts.md) — 31 пост фази 3 реалізовано 2026-05-02: 15 AI (healthcare/ecommerce/fintech/marketing/hr/hospitality/education/manufacturing/legal/real-estate) + 16 ML (retail/saas/logistics/manufacturing/agritech/cybersecurity/real-estate/healthcare/energy) додано до blog.ts
- ✅ [Glossary нові терміни](ai-niche-pages/TODO_ai_ml_glossary.md) — 165 термінів (4 хвилі додано; всі 🔲 терміни оновлено до ✅ 2026-05-02)
- ✅ [TypeScript типи для нішевих сторінок](ai-niche-pages/TODO_ai_ml_data_types.md) — AINicheData, MLNicheData, aiNiches.ts, mlNiches.ts

---

## SEO
- ✅ [Ключові слова](seo/TODO_keywords.md)
- ✅ [AI нішеві ключові слова EN+UK](seo/TODO_ai_keywords.md) — £/₴ по 10 AI нішах (файл наповнено 2026-05-02)
- ✅ [ML нішеві ключові слова EN+UK](seo/TODO_ml_keywords.md) — £/₴ по 10 ML нішах (файл наповнено 2026-05-02)
- ✅ [Метадані](seo/TODO_metadata.md)
- ✅ [Внутрішня перелінковка](seo/TODO_internal_links.md)
- ✅ [Технічне SEO](seo/TODO_technical_seo.md)

---

## SEO-Сторінки для Органічного Просування

> Нові сторінки, спеціально створені для отримання органічного SEO-трафіку. Кожна цільова сторінка адресує окремий кластер ключових слів або тип пошукового наміру.

### 🗺 Геосторінки (Локальне SEO)
- ✅ [Регіональні посадочні сторінки по містах](pages/TODO_geo_pages.md) — `/location/[city]` — 15 міст (Київ, Харків, Львів, Одеса, Дніпро + 10 міст) — реалізовано: `src/lib/data/geo.ts` + `src/app/[lang]/location/[city]/page.tsx`, LocalBusiness Schema.org, FAQPage, sitemap оновлено
  - Ключові запити: "розробка сайтів [місто]", "веб-студія [місто]", "замовити сайт [місто]"
  - Пріоритет: 🔴 Критичний

### ⚖️ Порівняльні Сторінки (Commercial Intent)
- ✅ [Порівняння CodeNest з альтернативами](pages/TODO_compare.md) — `/compare/[slug]` — реалізовано: `src/lib/data/compare.ts` + `src/app/[lang]/compare/[slug]/page.tsx`, 6 порівнянь (vs Wix / Tilda / WordPress / Shopify / фрілансер / шаблон), FAQPage Schema.org, sitemap оновлено
  - CodeNest vs Wix / Tilda / WordPress / Shopify / фрілансер / шаблон
  - Ключові запити: "tilda або веб-студія", "wix чи замовити сайт", "фрілансер чи агенція"
  - Пріоритет: 🔴 Критичний

### 🏷 Ніші — лістинг (оновлено 2026-05-01)
- ✅ BreadcrumbList + ItemList schema локалізовані (EN/UK) — виправлено хардкод "Головна"
- ✅ Product schema для кожного нішевого рішення (назва, ціна, availability) → rich snippets
- ✅ Секція "Готове рішення vs розробка з нуля" — порівняльна таблиця 7 параметрів + 2 CTA

### 📚 Глосарій (Topical Authority)
- ✅ [Словник веб-розробки та цифрового маркетингу](pages/TODO_glossary.md) — `/glossary` + `/glossary/[term]` — реалізовано: `src/lib/data/glossary.ts` (60 термінів, 7 категорій) + `src/app/[lang]/glossary/page.tsx` (клієнтський фільтр+пошук) + `src/app/[lang]/glossary/[term]/page.tsx` (DefinedTerm Schema.org), sitemap оновлено
  - 100+ термінів: SEO, Core Web Vitals, API, CMS, PWA, UX/UI, Digital Marketing
  - Ключові запити: "що таке [термін]", "[термін] значення"
  - Пріоритет: 🟡 Середній

### ⭐ Відгуки (E-E-A-T + Rich Snippets)
- ✅ [Сторінка відгуків клієнтів](pages/TODO_reviews.md) — `/reviews` — реалізовано: `src/lib/data/reviews.ts` (12 відгуків, рейтинг 4.9/5) + `src/app/[lang]/reviews/page.tsx` (Organization + AggregateRating + Review Schema.org, розподіл оцінок, фільтр за платформою), sitemap оновлено
  - AggregateRating Schema.org → зірки у Google SERP
  - Ключові запити: "CodeNest відгуки", "веб-студія відгуки клієнтів"
  - Пріоритет: 🟡 Середній

### 📦 Безкоштовні Ресурси (Lead Magnets + Backlinks)
- ✅ [Хаб безкоштовних матеріалів](pages/TODO_resources.md) — `/resources` + `/resources/[slug]` — реалізовано: `src/lib/data/resources.ts` (9 ресурсів: чек-листи, гайди, шаблони, інструменти) + `src/app/[lang]/resources/page.tsx` + `src/app/[lang]/resources/[slug]/page.tsx` (інтерактивні чек-листи з пунктами, гайди з секціями), sitemap оновлено
  - Чек-листи, гайди, шаблони, інтерактивні інструменти
  - Ключові запити: "чек-ліст запуску сайту", "скільки коштує сайт 2026", "seo аудит самостійно"
  - Пріоритет: 🟡 Середній

### 💼 Вакансії (Google Jobs + E-E-A-T)
- ✅ [Сторінка кар'єри та вакансій](pages/TODO_careers.md) — `/careers` + `/careers/[position]` — реалізовано: `src/lib/data/careers.ts` (3 вакансії: Frontend, Designer, SEO) + `src/app/[lang]/careers/page.tsx` + `src/app/[lang]/careers/[position]/page.tsx` (JobPosting Schema.org → Google Jobs, зарплата, вимоги, обов'язки), sitemap оновлено
  - JobPosting Schema.org → індексація в Google Jobs
  - Ключові запити: "вакансії frontend developer remote", "робота веб-розробник україна"
  - Пріоритет: 🟢 Низький

### 🤝 Партнери та Технологічний Стек (B2B + Authority)
- ✅ [Технологічний стек та партнерська програма](pages/TODO_partners.md) — `/partners` — реалізовано: `src/app/[lang]/partners/page.tsx` (tech stack 10 технологій по категоріях, 3 рівні партнерства: Реферал 15% / Агентство white-label / Технологічний партнер), sitemap оновлено
  - Для B2B аудиторії (технічні директори, агентства, фрілансери)
  - Ключові запити: "технологічний стек веб-студії", "партнерська програма агентство"
  - Пріоритет: 🟢 Низький

## Design
- ✅ [UI-компоненти](design/TODO_ui.md)
- ✅ [Графіка та ілюстрації](design/TODO_graphics.md)
- ✅ [Стилі та дизайн-система](design/TODO_styles.md)
- ✅ [Адаптивний дизайн (Mobile First)](design/TODO_responsive.md)

## Tech
- ✅ [Сервер та хостинг](tech/TODO_server.md)
- ✅ [Продуктивність та оптимізація](tech/TODO_optimization.md)
- ✅ [Інтеграції зовнішніх сервісів](tech/TODO_integrations.md)
- ✅ [Безпека та захист даних](tech/TODO_security.md)
- ✅ [Тестування](tech/TODO_testing.md)

---

## i18n / Локалізація (EN + UK)

> Перевірено станом на 2026-03-25. Маршрут `[lang]` активний, SSG для `/uk/*` та `/en/*`.

### ✅ Повністю перекладено (обидві мови, всі мітки UI, canonical URLs)
- ✅ `[lang]/page.tsx` — Головна
- ✅ `[lang]/about/page.tsx` — Про нас
- ✅ `[lang]/contact/page.tsx` — Контакти
- ✅ `[lang]/blog/page.tsx` — Блог (список)
- ✅ `[lang]/blog/[slug]/page.tsx` — Стаття блогу
- ✅ `[lang]/blog/tag/[tag]/page.tsx` — Блог за тегом
- ✅ `[lang]/blog/author/[slug]/page.tsx` — Сторінка автора (Person Schema.org, 4 автори) *(2026-05-02)*
- ✅ `[lang]/faq/page.tsx` — FAQ
- ✅ `[lang]/niches/page.tsx` — Лістинг ніш
- ✅ `[lang]/niches/[slug]/page.tsx` — Нішева demo-сторінка (всі 33 ніші)
- ✅ `[lang]/pricing/page.tsx` — Ціни
- ✅ `[lang]/services/page.tsx` — Огляд послуг
- ✅ `[lang]/services/[slug]/page.tsx` — Детальна сторінка послуги (всі 15 послуг; ai-ml → split на artificial-intelligence + machine-learning, 2026-05-01)
- ✅ `[lang]/portfolio/page.tsx` — Портфоліо (список)
- ✅ `[lang]/portfolio/[slug]/page.tsx` — Кейс портфоліо (всі 34 кейси)
- ✅ `[lang]/marketplace/page.tsx` — Головна маркетплейсу
- ✅ `[lang]/marketplace/catalog/page.tsx` — Каталог рішень
- ✅ `[lang]/extras/page.tsx` — Доробки та модулі
- ✅ `[lang]/terms-of-service/page.tsx` — Умови використання
- ✅ `[lang]/privacy/page.tsx` — Політика конфіденційності

- ✅ `[lang]/marketplace/product/[slug]/page.tsx` — Сторінка продукту (статична частина)
- ✅ `[lang]/marketplace/compare/page.tsx` — Порівняння продуктів (useLocale hook)
- ✅ `[lang]/not-found.tsx` — 404 сторінка (headers() для визначення locale)

- ✅ `AddToCartSection.tsx` — кнопка на сторінці продукту
- ✅ `[lang]/marketplace/cart/` — Кошик (`CartClient.tsx`, `CartSummary.tsx`)
- ✅ `[lang]/marketplace/checkout/` — Чекаут (`CheckoutForm.tsx`)
- ✅ `[lang]/marketplace/login/` — Вхід (`LoginForm.tsx`)

- ✅ `[lang]/marketplace/account/` — Кабінет (`AccountClient.tsx`)

- ✅ `[lang]/admin/marketplace/` — Адмін (`AdminClient.tsx`)

- ✅ `[lang]/ai/page.tsx` — AI хаб (10 нішевих сторінок)
- ✅ `[lang]/ai/[niche]/page.tsx` — AI нішева сторінка (10 ніш: healthcare/ecommerce/fintech/marketing/hr/hospitality/education/manufacturing/legal/real-estate)
- ✅ `[lang]/ml/page.tsx` — ML хаб (10 нішевих сторінок)
- ✅ `[lang]/ml/[niche]/page.tsx` — ML нішева сторінка (10 ніш: banking/retail/saas/logistics/manufacturing/agritech/cybersecurity/real-estate/healthcare/energy)
- ✅ `[lang]/tools/page.tsx` — Безкоштовні інструменти хаб
- ✅ `[lang]/tools/[slug]/page.tsx` — Окремий інструмент (10 активних: MetaTagGenerator, UTMBuilder, KeywordDensity, ColorContrast, RobotsTxt, WebsiteCostCalc, SchemaGenerator, SeoChecklist, MobileReadiness, PageSpeedAudit)
- ✅ `[lang]/use-cases/page.tsx` — Use Cases хаб (16 кейсів)
- ✅ `[lang]/use-cases/[slug]/page.tsx` — Окремий кейс застосування (SSG)
- ✅ `[lang]/showcase/page.tsx` — Showcase компонентна галерея

### ✅ i18n повністю завершено для всіх сторінок і компонентів

---

## ✅ Аналіз проєкту (2026-05-01)

> Проведено повний аналіз всього проєкту. Нижче — ключові висновки та список відкритих задач.

### Виправлення (зроблено у ході аналізу)
- ✅ **ВИПРАВЛЕНО**: `lang="en"` → `lang="uk"` у `src/app/layout.tsx` — тепер SSR HTML правильно ідентифікований як українська сторінка для Google
- ✅ **ВИПРАВЛЕНО**: Синтаксична помилка у `reviews/page.tsx` — неекрановані лапки `"Google Review"` у JSX string → замінено на HTML entities
- ✅ **ВИПРАВЛЕНО**: TypeScript TS2451/TS2393 — додано `export {}` до `partnership.route.test.ts` та `speed-test.route.test.ts` (тестові файли були глобальними скриптами)
- ✅ **ВИПРАВЛЕНО**: TS2741 — додано `hasDemo: false` до `BASE_EXTRA` у `ExtraCard.test.tsx`
- ✅ **ВИПРАВЛЕНО**: Zod v4 `errorMap` → `error` у `schemas.ts` (PartnershipSchema)
- ✅ **ВИПРАВЛЕНО**: TS2322 `lang` prop — видалено `lang={lang}` із `<Header>` та `<Footer>` у 8 сторінках (careers, glossary, partners, resources, reviews) — Header/Footer використовують `useParams()` внутрішньо
- ✅ **TypeScript: 0 помилок** після всіх виправлень

### Виправлено 2026-05-03 (session 33)
- ✅ **OrderSummary sidebar** у CheckoutForm — замінено hardcoded placeholder на реальний `useCart()` — показує товари, пакети, ціни з кошика
- ✅ **LiqPay для EN locale** — прихований (EN-клієнти бачать тільки Bank Card + Invoice)
- ✅ **NavProgress bar** — новий компонент `NavProgress.tsx` — тонка індиго смужка вгорі при кожній навігації
- ✅ **reCAPTCHA v3** — хук `useRecaptcha.ts` + серверна верифікація `recaptcha.ts`; підключено до ContactForm та CheckoutForm; graceful fallback якщо ключ не налаштовано
- ✅ **Blur placeholder утиліта** — `shimmer()` та `solidBlur()` функції у `utils.ts` для `next/image placeholder="blur"`
- ✅ **robots.txt** — розширено: додано disallow для `/marketplace/cart/`, `/marketplace/checkout/`, `/marketplace/login/`, `/dashboard/`; заблоковано AI-crawlers (GPTBot, Google-Extended, ClaudeBot)
- ✅ **Service Worker versioning** — `CACHE_NAME` тепер динамічний через `?v=BUILD_ID`; `next.config.ts` інжектує `NEXT_PUBLIC_BUILD_ID` з `VERCEL_GIT_COMMIT_SHA`
- ✅ **CSP reCAPTCHA fix** — `next.config.ts`: додано `https://www.google.com` та `https://www.gstatic.com` у `script-src`; `https://www.google.com` у `connect-src`; reCAPTCHA більше не блокується CSP у production
- ✅ **CSP LiqPay form-action fix** — `next.config.ts`: `form-action` розширено з `'self'` до `'self' https://www.liqpay.ua` — checkout form POST тепер дозволений
- ✅ **Newsletter welcome email** — `api/newsletter/route.ts`: Resend HTML welcome email відправляється підписнику після успішної підписки
- ✅ **framer-motion видалено** (~100kb bundle savings) — `PageTransition.tsx` переписано на pure CSS `@keyframes page-enter` у `globals.css`; жодної зовнішньої залежності
- ✅ **Dynamic OG images для блогу** — новий route `src/app/og/blog/[slug]/route.tsx` (edge runtime, `ImageResponse` 1200×630); генерує унікальне OG зображення для кожного поста на основі title/excerpt/category/emoji/tags/author/date
- ✅ **TypeScript: 0 помилок** — виправлено type errors у liqpay test та robots test

### Знайдені проблеми (потребують уваги)
- ✅ **ВИПРАВЛЕНО 2026-05-01**: Placeholder телефон видалено з усіх Schema.org (layout.tsx, contact/page.tsx, location/[city]/page.tsx) — замінено на `email: "hello@codenest.com.ua"`
- ✅ **ВИПРАВЛЕНО 2026-05-01**: Analytics consent — GA4/FB Pixel/Google Ads перенесено в `AnalyticsScripts.tsx` клієнт-компонент, скрипти завантажуються лише після `cookieConsentUpdate` події з CookieConsent. GDPR-compliant.
- ✅ **ВИПРАВЛЕНО 2026-05-01**: SSR `lang` атрибут — `app/layout.tsx` видалено, `app/[lang]/layout.tsx` став root layout. `<html lang={lang}>` тепер рендериться SSR-коректно (раніше UK-сторінки отримували `lang` тільки client-side через `HtmlLang`). `HtmlLang` компонент більше не потрібен.
- ✅ **ВИПРАВЛЕНО 2026-05-01**: `keywords` у metadata — niches (`niche.tags`) та services (`[service.keyword]`) тепер передаються як `string[]` а не `string`.
- ✅ **ВИПРАВЛЕНО 2026-05-01**: EN keywords у `services.ts` — `"Ukraine"` → `"UK"` (28 входжень у keyword + metaDescription EN-сервісів).
- ⚠️ **Немає реальних фото**: всі зображення — placeholder/gradient. Потрібні: фото команди, офісу, мокапи пристроїв, фото для блогу
- ⚠️ **Домен не підключений**: codenest.com.ua ще не задеплоєно — всі post-deploy задачі (GSC, Bing, OG перевірка) очікують

### Загальний стан готовності
| Категорія | Готовність | Статус |
|---|---|---|
| Frontend / UI | ~95% | ✅ Майже повністю |
| SEO (технічне) | ~85% | ✅ Добре |
| Дизайн-система | 100% | ✅ Готово |
| Тестування | ~86% | ✅ Добре |
| Безпека | ~46% | ⚠️ MVP достатньо |
| Сервер/Деплой | ~38% | 🔴 Потрібно для запуску |
| Інтеграції | ~19% | ⚠️ Phase 2 |
| Реальні медіа | ~30% | ⚠️ Потрібен дизайнер/фотограф |

### Пріоритети перед запуском (P0)
- [ ] Деплой на Vercel + підключення домену codenest.com.ua
- [ ] DNS налаштування (Cloudflare)
- ✅ Email: Resend інтеграція — email-підтвердження замовлень (/api/order) та контакт-форми (/api/contact) (2026-05-03)
- ✅ Замінити placeholder телефон у layout.tsx — **виконано 2026-05-01**: contactPoint видалено, `email: "hello@codenest.com.ua"` (реальний номер додати окремо коли з'явиться)
- [ ] Google Search Console реєстрація
- [ ] Google Business Profile
- ✅ LiqPay для маркетплейсу — `/api/liqpay/create` + `/api/liqpay/callback` + CheckoutForm redirect (2026-05-03)

### Пріоритети після запуску (P1)
- [ ] Google Analytics 4 через GTM (з consent check)
- [ ] Hotjar або Microsoft Clarity для UX аналізу
- [ ] Реальні фото команди (фотосесія)
- [ ] Clutch.co профіль + перші 3 відгуки
- [ ] Перший тиждень: GSC Coverage перевірка, sitemap submit
- [ ] Реальні мокапи для portfolio кейсів

### SEO довгострокові цілі (P2)
- ✅ 100+ термінів у глосарії — ✅ 165 термінів (оновлено 2026-05-02: +73 AI/ML + +18 ML-нішеві: hl7, clinical-nlp, snomed-ct, patient-risk-scoring, readmission-risk, false-positive-rate, eoq, safety-stock, fill-rate, or-tools, customer-health-score, behavioral-biometrics, geo-jump, account-takeover, scada, comparable-sales, rental-yield, variable-rate-application)
- [ ] Featured Snippets для FAQ/glossary запитів
- ✅ E-E-A-T: авторські профілі для всіх блог-авторів — `src/lib/data/blogAuthors.ts` (4 автори з emoji/bio/role EN+UK/social) + `src/app/[lang]/blog/author/[slug]/page.tsx` (SSG, Person Schema.org, hero+статті+інші автори) + sitemap ✅ (2026-05-02)
- [ ] Відеоконтент (YouTube + VideoObject Schema)
- [ ] Backlinks: Clutch, DOU, Dou.ua, AIN.ua


