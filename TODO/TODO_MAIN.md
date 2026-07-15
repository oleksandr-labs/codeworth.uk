# Проєкт: codeworth.uk — ML/AI Consultancy

## Зміст
[Про проєкт](#про-проєкт) · [SEO Архітектура](#seo-архітектура-головний-пріоритет) · [Відсутні сторінки](#відсутні-сторінки-критичний-пріоритет) · [Послуги](#сторінки-послуг-services) · [Нішеві сторінки](#нішеві-сторінки-aiml) · [Блог](#блог-topic-clusters) · [Дизайн](#дизайн) · [Tech](#tech)

---

## Про проєкт

**Сайт:** codeworth.uk
**Бренд:** Codeworth — ML/AI consultancy for UK & EU business
**Ціль:** SEO-перша платформа для B2B-ліддженерації ML/AI-проєктів у UK-ринку.
**Аудиторія:** Технічні директори та Product Manager'и UK/EU компаній з бюджетом від £1,800 на ML.
**Монетизація:** ML-проєкти (PoC £1,800 → Production £4,500 → Enterprise), MLOps Retainer £800/mo.
**Технічний стек:** Next.js 16.2, TypeScript, Tailwind v4, Static Export (`output: standalone`), GitHub Actions CI/CD → Hetzner atlas (88.198.199.50).
**Деплой:** `main` гілка → GitHub Actions → rsync до `/var/www/codeworth.uk/` → nginx + SSL.
**Дата:** 2026-06-24 (оновлено після Sprints 6–18)
**ML Adaptation Log:** [TODO_ML_ADAPTATION.md](TODO_ML_ADAPTATION.md) — повний журнал змін

> **⚠️ Аудит реального масштабу (2026-07-10):** цей документ і `seo/TODO_SEO_MASTER.md` роками відставали від коду — багато пунктів, позначених `[ ]`/"ще не написано", **вже реалізовано**. Фактична інвентаризація `src/lib/data/`: **248 blog постів** (`blog.ts`), **25 міст** (`geo.ts` → `/location/[city]`), **59 compare-сторінок** (`compare.ts`), **94 use-case/resource сторінки** (`useCases.ts`+`resources.ts`, 49+94), **449 глосарій-термінів** (`glossary.ts`), **94 портфоліо-кейси**, **10 інтерактивних tools**, **8 startup MVP-шаблонів**, **20 ML-ніш** (`mlNiches.ts`) + **15 AI-ніш** (`aiNiches.ts`), **7 service pages**. Це на порядок більше, ніж описано нижче в розділах "Нішеві сторінки"/"Блог" — ті розділи лишені для історичного контексту keyword-стратегії, не як актуальний backlog. Новий backlog контенту — розділ [Нові SEO-сторінки (Sprint 19+)](#нові-seo-сторінки-контенту-sprint-19).

> **✅ Sprint 69 завершив увесь backlog обсягу (2026-07-10), нове стратегічне резюме (2026-07-12, цифри перевірені `grep`-підрахунком по коду в 3-му проході аудиту — див. `TODO_ROADMAP.md` для методики):** контент-обсяг тепер перевищує типовий сайт такого розміру (**286 blog / 449 унікальних glossary термінів (463 записи, 14 дублікатів) / 71 унікальна compare-сторінка (74 записи, 3 дублікати) / 101 portfolio / 44 унікальних міста (45 записів, 1 дублікат) / 26 ML-ніш / 18 AI-ніш**). Подальше механічне нарощування обсягу має спадну віддачу. Повний **[roadmap Sprint 70+ → TODO_ROADMAP.md](TODO_ROADMAP.md)** з фазами: Phase 1 (аналітика/безпека форм не live, fake-review E-E-A-T ризик, відомі дефекти даних), Phase 2 (нова `/security` сторінка, аудит якості контенту на масштабі, чистка застарілих TODO), Phase 3 (продовження обсягу — лише якщо аудит покаже headroom). Нові файли: [seo/TODO_trust_authenticity.md](seo/TODO_trust_authenticity.md), [tech/TODO_data_integrity.md](tech/TODO_data_integrity.md), [pages/TODO_security_compliance.md](pages/TODO_security_compliance.md), [seo/TODO_content_quality_audit.md](seo/TODO_content_quality_audit.md).

### Ключові вимоги
- **SEO-first** — кожна сторінка оптимізована під конкретний ML/AI keyword cluster
- **Двомовний контент** — EN (GBP £, первинна), UK (UAH ₴, вторинна); `defaultLocale = 'en'`
- **Static Generation (SSG)** — всі публічні сторінки статичні для Core Web Vitals
- **Schema.org** — `Service`, `FAQPage`, `BreadcrumbList`, `Organization` на кожній відповідній сторінці
- **E-E-A-T** — конкретні ML-метрики (F1-score, precision, ROI), авторські профілі

---

## SEO Архітектура (головний пріоритет)

> **Основний документ:** [seo/TODO_SEO_MASTER.md](seo/TODO_SEO_MASTER.md) — повний blueprint.

### Tier-модель сторінок

| Tier | Сторінки | Статус |
|---|---|---|
| **Tier 1** — Money Pages | /services/machine-learning, /services/artificial-intelligence, /services/nlp, /services/computer-vision, /services/mlops, /services/llm-rag, /services/predictive-analytics, /pricing, /contact | ML/AI ✅, решта ❌ НЕ ІСНУЮТЬ |
| **Tier 2** — Topic Hubs | /ml, /ai, /use-cases, /compare, /extras, /portfolio | ✅ Всі існують |
| **Tier 3** — Niche Pages | /ml/banking, /ml/retail, /ml/healthcare, /ai/fintech, /ai/ecommerce, і ще 6+ | ✅ Більшість існують |
| **Tier 4** — Blog | /blog/[slug] | ✅ Частково, потрібен контент-спринт |

### SEO-файли

- ✅ [SEO Master Blueprint](seo/TODO_SEO_MASTER.md) — головний SEO-документ (Tier-модель, keywords, schema, E-E-A-T, KPIs)
- ✅ [ML Keywords by Industry](seo/TODO_ml_keywords.md) — детальні ML KW по 10 галузях
- [ ] [Content SEO](seo/TODO_content_seo.md) — потребує оновлення (видалити web dev pillar pages)
- [ ] [Keywords Main](seo/TODO_keywords.md) — потребує оновлення (видалити web design UK / ecommerce)
- [ ] [Technical SEO](seo/TODO_technical_seo.md) — перевірити актуальність для Next.js 16

---

## Відсутні сторінки (критичний пріоритет)

> Це найвищий SEO-пріоритет. Без цих сторінок сайт не ранжується за ключовими Tier 1 запитами.

### ❌ Tier 1 Service Pages (НЕ ІСНУЮТЬ — створити першими!)

| Сторінка | URL | Primary KW | Файл TODO |
|---|---|---|---|
| NLP Development | `/services/nlp` | NLP development services UK | [TODO_nlp.md](pages/services/TODO_nlp.md) |
| Computer Vision | `/services/computer-vision` | computer vision development UK | [TODO_computer_vision.md](pages/services/TODO_computer_vision.md) |
| MLOps Services | `/services/mlops` | MLOps services UK | [TODO_mlops_service.md](pages/services/TODO_mlops_service.md) |
| LLM & RAG Dev | `/services/llm-rag` | LLM development company UK | [TODO_llm_rag.md](pages/services/TODO_llm_rag.md) |
| Predictive Analytics | `/services/predictive-analytics` | predictive analytics company UK | [TODO_predictive_analytics.md](pages/services/TODO_predictive_analytics.md) |

#### Що потрібно для кожної нової service page:
1. `src/lib/data/services.ts` — додати slug та дані
2. `src/app/[lang]/services/[slug]/page.tsx` — підхопить автоматично (перевірити!)
3. `src/app/og/services/[slug]/route.tsx` — додати OG config
4. Footer `SERVICES_EN/UK` — додати посилання
5. Header menu — додати до Services dropdown (якщо є)
6. Sitemap — перевірити auto-include

### ❌ Відсутні Blog Topic Cluster posts (Tier 4, SEO-цінність)
Детальний план: [seo/TODO_SEO_MASTER.md → Topic Clusters](seo/TODO_SEO_MASTER.md)

Найвищий пріоритет (по конкуренції та об'єму):
- [ ] `/blog/machine-learning-cost-uk` — "how much does ML cost UK"
- [ ] `/blog/what-is-mlops` — "what is MLOps" (high PAA volume)
- [ ] `/blog/ml-fraud-detection-explained` — "how ML fraud detection works"
- [ ] `/blog/demand-forecasting-retail-uk` — "ML demand forecasting retail UK"
- [ ] `/blog/ai-chatbot-rag-guide` — "RAG chatbot development UK"

---

## Сторінки послуг (Services)

### ✅ Існуючі ML/AI service pages
- ✅ [Machine Learning](pages/services/TODO_machine_learning.md) — `/services/machine-learning` | "machine learning company UK"
- ✅ [Artificial Intelligence](pages/services/TODO_artificial_intelligence.md) — `/services/artificial-intelligence` | "AI development company UK"

### ❌ Нові service pages (створити!)
- ❌ [NLP Development](pages/services/TODO_nlp.md) — `/services/nlp` | ПРІОРИТЕТ 1
- ❌ [Computer Vision](pages/services/TODO_computer_vision.md) — `/services/computer-vision` | ПРІОРИТЕТ 2
- ❌ [MLOps Services](pages/services/TODO_mlops_service.md) — `/services/mlops` | ПРІОРИТЕТ 3
- ❌ [LLM & RAG Development](pages/services/TODO_llm_rag.md) — `/services/llm-rag` | ПРІОРИТЕТ 4
- ❌ [Predictive Analytics](pages/services/TODO_predictive_analytics.md) — `/services/predictive-analytics` | ПРІОРИТЕТ 5

### Сторінки загального рівня
- ✅ `/services` — огляд всіх послуг (перевірити що нові сторінки тут є)
- ✅ `/pricing` — тарифи (PoC £1,800 / Production £4,500 / Enterprise / MLOps £800/mo)
- ✅ `/compare` — Codeworth vs in-house vs AutoML
- ✅ `/extras` — ready-made AI modules
- ✅ `/use-cases` — specific ML/AI application scenarios

---

## Нішеві сторінки (AI/ML)

### AI Нішеві сторінки (`/ai/[niche]`)
- ✅ [AI Overview Page `/ai`](ai-niche-pages/TODO_ai_overview_page.md) — хаб
- ✅ [AI для FinTech](ai-niche-pages/TODO_ai_fintech.md) — /ai/fintech
- ✅ [AI для e-commerce](ai-niche-pages/TODO_ai_ecommerce.md) — /ai/ecommerce
- ✅ [AI для медицини](ai-niche-pages/TODO_ai_healthcare.md) — /ai/healthcare
- ✅ [AI для маркетингу](ai-niche-pages/TODO_ai_marketing.md) — /ai/marketing
- ✅ [AI для HR](ai-niche-pages/TODO_ai_hr.md) — /ai/hr
- ✅ [AI для освіти](ai-niche-pages/TODO_ai_education.md) — /ai/education
- ✅ [AI для виробництва](ai-niche-pages/TODO_ai_manufacturing.md) — /ai/manufacturing
- ✅ [AI для юристів](ai-niche-pages/TODO_ai_legal.md) — /ai/legal
- ✅ [AI для готелів](ai-niche-pages/TODO_ai_hospitality.md) — /ai/hospitality

### ML Нішеві сторінки (`/ml/[niche]`)
- ✅ [ML Overview Page `/ml`](ml-niche-pages/TODO_ml_overview_page.md) — хаб
- ✅ [ML Banking](ml-niche-pages/TODO_ml_banking.md) — /ml/banking | "ML fraud detection UK"
- ✅ [ML Retail](ml-niche-pages/TODO_ml_retail.md) — /ml/retail | "ML demand forecasting UK"
- ✅ [ML Healthcare](ml-niche-pages/TODO_ml_healthcare.md) — /ml/healthcare
- ✅ [ML Logistics](ml-niche-pages/TODO_ml_logistics.md) — /ml/logistics
- ✅ [ML SaaS](ml-niche-pages/TODO_ml_saas.md) — /ml/saas | "churn prediction SaaS UK"
- ✅ [ML AgriTech](ml-niche-pages/TODO_ml_agritech.md) — /ml/agritech | ⭐ низька конкуренція!
- ✅ [ML Cybersecurity](ml-niche-pages/TODO_ml_cybersecurity.md) — /ml/cybersecurity
- ✅ [ML Manufacturing](ml-niche-pages/TODO_ml_manufacturing.md) — /ml/manufacturing
- ✅ [ML Real Estate](ml-niche-pages/TODO_ml_realestate.md) — /ml/real-estate
- ✅ [ML Energy](ml-niche-pages/TODO_ml_energy.md) — /ml/energy

### SEO аудит нішевих сторінок
- [ ] Перевірити кожну нішеву сторінку: чи є FAQ блок (≥5 питань)?
- [ ] Перевірити `FAQPage` Schema.org на кожній нішевій сторінці
- [ ] Перевірити internal links: нішева → service → pricing → contact

---

## Блог (Topic Clusters)

> Контент-стратегія: [seo/TODO_SEO_MASTER.md → Topic Clusters](seo/TODO_SEO_MASTER.md)

> **⚡ Sprint 6–18 (2026-06-23/24):** Додано 130+ ML blog posts. Повний список: [TODO_ai_ml_blog_posts.md](ai-niche-pages/TODO_ai_ml_blog_posts.md)

### Cluster 1: Machine Learning for Business
- [ ] `machine-learning-cost-uk` — "How Much Does Machine Learning Cost UK?" ← ще не написано!
- [ ] `ml-roi-business-guide` — "Measuring ML ROI: A Business Guide"
- ✅ `measuring-ml-roi-uk` — ROI measurement framework (додано Sprint 12)
- [ ] `gdpr-machine-learning-uk` — "GDPR Compliance in ML: UK Guide"
- [ ] `ml-project-phases` — "ML Project Lifecycle: From PoC to Production"
- ✅ `ml-governance-framework-uk-2026` — FCA SS1/23, AI Safety Institute (Sprint 13)
- ✅ `ml-success-factors-uk-2026` — 10 Critical Success Factors (Sprint 13)
- ✅ `responsible-ai-uk-2026` — Fairness, Transparency, Oversight (Sprint 13)
- ✅ `eu-ai-act-uk-impact-2026` — EU AI Act post-Brexit (Sprint 12)

### Cluster 2: AI for Business
- [ ] `ai-chatbot-rag-guide` — "Building AI Chatbot with RAG: Complete Guide" ← пріоритет
- [ ] `ai-implementation-guide-uk` — "How to Implement AI in Your UK Business"
- [ ] `llm-vs-traditional-ml` — "LLM vs Traditional ML: When to Use Each"
- ✅ `llm-fine-tuning-uk-business` — LLM Fine-Tuning vs RAG (Sprint 12)
- ✅ `open-source-llm-uk-business` — Open-Source LLMs (Sprint 13)
- ✅ `enterprise-rag-production-lessons-uk` — RAG production lessons (Sprint 13)
- 🔄 `llm-agents-agentic-ai-uk` — LLM Agents (Sprint 14, in progress)

### Cluster 3: MLOps
- [ ] `what-is-mlops` — "What is MLOps? A Business Guide" (HIGH PAA) ← ще не написано!
- ✅ `mlops-production-guide` — MLOps in Production (original post)
- ✅ `mlflow-production-guide-uk` — MLflow for UK Production (Sprint 13)
- ✅ `mlops-cost-management-aws-azure` — MLOps cost optimisation (Sprint 13)
- ✅ `ml-model-drift-detection-uk` — Drift Detection (Sprint 13)
- ✅ `ml-infrastructure-cost-optimisation-uk` — Infrastructure costs (Sprint 13)

### Cluster 4: UK Industry ML (Sprint 6–14)
> 60+ UK-нішевих постів. Повний список: [TODO_ai_ml_blog_posts.md](ai-niche-pages/TODO_ai_ml_blog_posts.md#sprint-6–18--uk-ml-industry-posts-2026-0623/24)

### Cluster 4: Industry (найвища SEO-цінність — ПОЧИНАТИ ЗВІДСИ)
- [ ] `ml-fraud-detection-explained` — "How ML Fraud Detection Works"
- [ ] `demand-forecasting-retail-uk` — "ML Demand Forecasting for UK Retailers"
- [ ] `churn-prediction-saas` — "ML Churn Prediction for SaaS: Build vs Buy"
- [ ] `nlp-customer-service-guide` — "NLP for Customer Service: 2026 Guide"
- [ ] `computer-vision-manufacturing-guide` — "CV in Manufacturing: UK Guide"

---

## Основні сторінки (перевірити після ML-реброндингу)

| Сторінка | Статус | Потребує |
|---|---|---|
| `/` Головна | ✅ ML | Перевірити hero KW + FAQ schema |
| `/about` | ✅ ML | Перевірити E-E-A-T (team credentials) |
| `/portfolio` | ✅ ML | ✅ ML metrics, 4 phases |
| `/pricing` | ✅ ML | Перевірити `Offer` schema |
| `/faq` | ✅ ML | Перевірити FAQPage schema (10 питань) |
| `/contact` | ✅ ML | Перевірити LocalBusiness schema |
| `/careers` | ✅ | Перевірити JobPosting schema + ML job titles |
| `/reviews` | ✅ ML | Перевірити AggregateRating schema |
| `/sitemap` | ⚠️ | Баг: NICHES_DATA reference потребує фіксу |

---

## Дизайн

### SEO-пов'язаний дизайн (пріоритет)
- [ ] [OG зображення](design/TODO_graphics.md) — кожна Tier 1 service page потребує унікального OG (1200×630)
  - Пріоритет: /services/nlp, /services/computer-vision, /services/mlops, /services/llm-rag
- [ ] [Core Web Vitals оптимізація](design/TODO_responsive.md) — перевірити LCP, CLS, INP
  - Найбільший ризик: hero зображення на головній → WebP + preload
- [ ] Схема даних для trust signals — відгуки на homepage із Schema (AggregateRating)
- [ ] E-E-A-T: авторські профілі для blog posts (фото + посада + LinkedIn)

### UI / Design System
- [ ] [UI-компоненти](design/TODO_ui.md) — перевірити що немає "web studio" залишків
- [ ] [Стилі](design/TODO_styles.md) — Tailwind v4 (bg-linear-to-*, не bg-gradient-to-*)
- ✅ [Emoji → SVG](design/TODO_emoji_to_svg.md) — Фаза 2 фактично завершена: `EmojiIcon.tsx` існує і використовується у 36 файлах (портфоліо, ніші, послуги, extras, blog); файл `niches.ts`/marketplace-сторінка з Фази 4 більше не існують (видалені разом з legacy e-commerce) — сам TODO-документ застарів, оновити його статуси (2026-07-09)
- [ ] [Mobile First](design/TODO_responsive.md) — перевірити нові service pages на мобільному

---

## Tech

### Критичні технічні задачі
- ✅ **Sitemap bug fix** (2026-07-09) — перевірено: `/[lang]/sitemap/page.tsx` вже чистий, жодних посилань на видалені `NICHES_DATA`/`nichesByCategory`; `tsc --noEmit` 0 помилок. Пункт застарів, реальної проблеми не було
- ✅ **Test files** (2026-07-09) — усі 20 застарілих тестових файлів (94 тести) оновлено під поточний ML/AI-брендинг; 972/972 тестів проходять у 87 suites. По дорозі виправлено 2 реальні дрібні багі в даних: 12 постів блогу мали биту `color: "emerald"` замість градієнта, портфоліо-ніші мали "Всi" з латинською `i` замість кириличної `і`
- ✅ `src/components/tools/WebsiteCostCalculator.tsx` (2026-07-09) — перевірено: файл вже видалений, жодних orphan-імпортів не знайдено

### Стандартні tech задачі
- [ ] [Сервер та хостинг](tech/TODO_server.md) — atlas 88.198.199.50, nginx, SSL
- ✅ [Продуктивність](tech/TODO_optimization.md) (перевірено 2026-07-09) — 41/56 вже виконано; залишок потребує live-трафіку/платних сервісів (Core Web Vitals real-user monitoring, CDN, Edge Functions, Sentry RUM) — не механічна правка коду
- ✅ [Безпека](tech/TODO_security.md) (перевірено 2026-07-09) — CSP/HSTS/X-Frame-Options/Permissions-Policy вже повністю налаштовані в `next.config.ts`; залишок (NextAuth, 2FA, Cloudflare WAF, Sentry) — Phase 2/3, потребує інфраструктурних рішень і платних сервісів
- ✅ npm audit (2026-07-09) — 7 вразливостей (3 high) → 2 moderate; `next` 16.2.0→16.2.10 (патч), транзитивний `ws` виправлено через `npm audit fix`
- ✅ **ESLint gate був червоний в CI** (2026-07-09) — `npm run lint` падав з 73 помилками (без `continue-on-error` у `ci.yml`, тобто будь-який PR блокувався); виправлено все, `eslint .` тепер exit 0 (61 warning лишились, не блокують). Реальні знахідки серед помилок: `Math.random()` у JSX-рендері `GenericDemo.tsx` (номер заявки в Telegram-демо змінювався на кожен ре-рендер — виправлено генерацією в onClick + state), мутація змінної під час `.map()` в рендері `RetailCoreDemo.tsx` (замінено на precomputed масив), 2 компоненти створювались всередині рендеру в `BeforeAfterDemo`. Решта — unescaped JSX-лапки (~45) та обґрунтовані `eslint-disable` для навмисних патернів (global-error.tsx `<a>` замість `<Link>`, ThemeProvider localStorage-read-on-mount). Деталі — [tech/TODO_testing.md](tech/TODO_testing.md#eslint)
- ✅ [Тестування](tech/TODO_testing.md) (оновлено 2026-07-09) — 972/972 тестів (87 suites) зелені після ML-ребрендингу; було 94 биті тести у 20 файлах
- ✅ [CRM Lead Integration](tech/TODO_integrations.md#crm-та-lead-management) (2026-07-07) — contact/apply форми шлють ліди у внутрішню CRM (`CRM_INGEST_URL`/`CRM_INGEST_TOKEN`), деталі схеми/API в `dashboard/TODO_CRM.md`
- ✅ Trust/SEO аудит (2026-07-07) — прибрано адресу Кyiv з Organization JSON-LD та укр. Privacy Policy (невідповідність UK-позиціонуванню), биті `logo.svg/png` посилання, битий `/services/seo` лінк, залишки "web studio" в compare/resources/glossary
- ✅ Довидалено legacy web-studio код, пропущений в Sprint 2026-07-02 (див. [TODO_REMOVE_LEGACY_ECOMMERCE.md](TODO_REMOVE_LEGACY_ECOMMERCE.md)) — сирітський `/dashboard` (customizer/subscription), `useAuth`/`useCart`/`useCompare`, e2e-тести на видалені `/marketplace`+`/auth` роути
- ✅ Manifest/іконки (2026-07-07) — `public/manifest.json` мав биті `/icons/icon-*.png` (старий marketplace-брендинг) і не був тим самим файлом, що генерував `src/app/manifest.ts` (мертвий, видалено); згенеровано реальні `icon-192.png`/`icon-512.png`
- ✅ FAQ-акордеон стандартизовано (2026-07-07) — спільний `FAQSection`/`NicheFAQ` на 7 сторінках (3 питання, перше розгорнуте, решта за "показати ще"), раніше лише на головній
- ✅ Другий раунд правок (2026-07-07/08) — dark-mode аудит (426 фіксів), pricing +2 пакети, інтерактивна contact-форма, критичний баг фільтрації блогу (категорії ніколи не збігались), portfolio-сайдбар, MarketplaceTeaser→IndustriesTeaser, довидалення 12 orphaned компонентів, legal-сторінки (Privacy/Terms — застарілі маркетплейс/LiqPay/Ukrainian-law залишки), нормалізований показ категорії блогу у 5 місцях, ~10 неправдивих тверджень про Codeworth у глосарії (Vercel/LiqPay/design system/Figma). Деталі й повний список комітів — [TODO_ML_ADAPTATION.md → Sprint 67](TODO_ML_ADAPTATION.md)
- ⚠️ **Аналітика/безпека не live** (2026-07-08) — GA4/FB Pixel/Google Ads/reCAPTCHA/Telegram/Resend код готовий, але секрети відсутні в GH — див. [tech/TODO_integrations.md](tech/TODO_integrations.md)

### GitHub Actions CI/CD
- Деплой: push to `main` → build → rsync → atlas
- Перевіряти: tsc 0 errors перед кожним пушем
- Локальний `npm run build` може падати на OG fonts/feed (network sandbox) — ОК в CI

---

## i18n (EN + UK)

- EN = primary (`/services/nlp`, без `/en/` prefix)
- UK = secondary (`/uk/services/nlp`)
- `buildAlternates(lang, path)` — використовується на всіх сторінках
- `lp(path)` = `/${lang}${path}` — хелпер
- Валюта: EN → £ GBP, UK → ₴ UAH
- hreflang: `en-gb` → EN URL, `uk` → UK URL

---

## Пріоритети (Roadmap)

### 🔴 P0 — ЗРОБИТИ ЗАРАЗ (блокує SEO)
1. [ ] Фікс sitemap bug (NICHES_DATA reference компайл-помилка)
2. [ ] Створити `/services/nlp` (найвищий money-page пріоритет)
3. [ ] Створити `/services/computer-vision`
4. [ ] Створити `/services/mlops`
5. [ ] Створити `/services/llm-rag`

### 🟡 P1 — Наступний спринт
6. [ ] Створити `/services/predictive-analytics`
7. [ ] Перший blog post: "What is MLOps?" (high PAA)
8. [ ] Blog post: "How Much Does ML Cost UK?"
9. [ ] OG зображення для нових service pages
10. [ ] Аудит FAQ blocks на всіх Tier 1-2 сторінках

### 🟢 P2 — Довгострокові SEO
11. [ ] Clutch/G2 профіль (backlinks + E-E-A-T)
12. [ ] Перший guest post TowardsDataScience
13. [ ] Blog Cluster 4: Industry posts (highest ROI)
14. [ ] GitHub open-source ML utils (authority signal)

---

## Нові SEO-сторінки контенту (Sprint 19+)

> **✅ ЗАВЕРШЕНО (Sprint 69, 2026-07-10)** — увесь backlog розділів A–H нижче реалізовано паралельними фоновими агентами: 7 нових ніш, 38 blog-постів, 19 міст, 14 глосарій-термінів, 15 compare-сторінок, 7 portfolio-кейсів, 4 use-cases, 8 tools (3 з реальною інтерактивною логікою), 4 startup-шаблони, 5 resources, 5 careers-позицій. Повний наратив, точні числа до/після і 4 виявлені-але-не-виправлені дефекти (дублікат `nottingham` у geo.ts, 3 дублікати slug у compare.ts, куций Footer.tsx-список ніш, 5 tools без реальної логіки) — [TODO_ML_ADAPTATION.md → Sprint 69](../TODO_ML_ADAPTATION.md#sprint-69--масштабний-контент-спринт-7-нових-ніш--90-нових-сторінок-2026-07-10). Списки нижче лишені як історичний план (checkbox'и не проставлялись по одному пункту — дивись Sprint 69 запис на точну відповідність).
>
> Мета вихідного планування: сайт вже дуже насичений (248 blog / 25 міст / 59 compare / 94 use-case+resource / 449 глосарій), тож нові сторінки мали закривати конкретні прогалини, а не дублювати наявне. Перевірено проти реальних slug'ів у `src/lib/data/*.ts` (2026-07-10) — нижче тільки те, чого справді не було на момент планування.

### A. Нові нішеві landing pages (є блог-контент, немає `/ml/[niche]` або `/ai/[niche]` сторінки)
- [ ] `/ml/telecoms` — "ML for UK Telecoms" (churn prediction, network anomaly detection); блог-опора вже є: `ml-for-uk-telecoms`, `ml-telecoms-churn-network-uk`
- [ ] `/ml/government-public-sector` — "ML for UK Government & Public Sector"; блог-опора: `ml-for-uk-government-public-sector`
- [ ] `/ai/government` — "AI for UK Public Sector" (citizen-service chatbots, document automation, G-Cloud procurement) — жодного блог-посту немає, писати з нуля
- [ ] `/ai/media-entertainment` — "AI for UK Media & Broadcasting" (content moderation, recommendation, dubbing/localisation); блог-опора частково: `ml-for-uk-media-audience`, `ml-for-uk-media-broadcasting`, `ml-for-uk-media-publishing`
- [ ] `/ml/automotive` — "ML for UK Automotive & Fleet" (predictive maintenance, EV route optimisation, connected-car telematics) — нова вертикаль, жодного контенту
- [ ] `/ml/pharma-life-sciences` — "ML for UK Pharma & Life Sciences" (clinical trial optimisation, drug discovery ML) — нова вертикаль, відрізняти від NHS/healthcare (R&D, не clinical care)
- [ ] `/ai/automotive` — "AI for UK Automotive Retail" (dealership CV, virtual sales assistant)

### B. Нові інтерактивні tools (найменша категорія — лише 10 існує, найбільший SEO-потенціал за unique-tool рефералами)
- [ ] Fraud Detection Savings Calculator (банкінг, "how much can ML fraud detection save my bank")
- [ ] Churn Prediction ROI Calculator (SaaS)
- [ ] Predictive Maintenance Downtime Savings Calculator (manufacturing/automotive)
- [ ] AI Chatbot vs Human Support Cost Calculator
- [ ] RAG vs Fine-Tuning Decision Tool (інтерактивний квіз)
- [ ] LLM Token Cost Comparator (OpenAI/Anthropic/Google API pricing)
- [ ] EU/UK AI Act Risk Classification Tool (high/limited/minimal risk quiz) — висока PR/link-цінність, регуляторний topic 2026
- [ ] Carbon/ESG ML Impact Calculator

### C. Нові startup MVP-шаблони (8 існує)
- [ ] InsurTech ML MVP
- [ ] AgriTech ML MVP
- [ ] PropTech ML MVP
- [ ] RegTech/Compliance ML MVP

### D. Нові міста (25 вже є в `geo.ts`: London/Manchester/Birmingham/Edinburgh/Bristol/Leeds/Glasgow/Cardiff/Cambridge/Oxford/Sheffield/Newcastle/Nottingham/Liverpool/Brighton/Southampton/Leicester/Coventry/Reading/Plymouth/Derby/Portsmouth/Sunderland/Belfast)
- [ ] Aberdeen — "ML consultant Aberdeen" (energy/oil&gas data angle, синергія з `/ml/energy`)
- [ ] Dundee — "AI company Dundee" (гейм-дев/тех кластер міста)
- [ ] York
- [ ] Milton Keynes — тех-хаб Thames Valley, синергія з `/ml/logistics` (Amazon/logistics hub)
- [ ] Norwich
- [ ] Swansea
- [ ] Bath
- [ ] Exeter

### E. Наступний блог-спринт (Sprint 15–18) — нові slug'и, перевірено на відсутність дублів у `blog.ts`
> Продовжує Sprint 14 (federated-learning-uk-privacy, llm-agents-agentic-ai-uk, ml-for-uk-insurtech, automl-platforms-uk-guide, synthetic-data-generation-uk, vector-databases-uk-enterprise, ml-for-uk-energy-trading, causal-inference-ml-uk, ml-model-compression-edge-uk, reinforcement-learning-uk-business — перевірити фактичний статус, TODO_ai_ml_blog_posts.md позначає їх "🔄 в процесі" з 2026-06-24, могли вже бути дописані)

- [ ] `small-language-models-uk-edge-2026` — "Small Language Models vs LLMs: UK Edge Deployment Guide"
- [ ] `multimodal-rag-uk-enterprise` — "Multimodal RAG for UK Enterprise: Text, Image, Table Retrieval"
- [ ] `ai-agent-evaluation-benchmarks-uk` — "How to Evaluate AI Agents Before Production: UK Guide"
- [ ] `digital-twins-ml-manufacturing-uk` — "Digital Twins with ML: UK Manufacturing Guide"
- [ ] `zero-shot-few-shot-learning-business-uk` — "Zero-Shot and Few-Shot Learning for Business: When It Works"
- [ ] `ai-cost-governance-uk-2026` — "AI Cost Governance: Controlling LLM Spend at Scale"
- [ ] `data-mesh-for-ml-teams-uk` — "Data Mesh for ML Teams: UK Enterprise Guide"
- [ ] `uk-ai-act-risk-classification-guide` — "UK/EU AI Act Risk Classification: A Practical Guide" (відрізнити від наявного `eu-ai-act-uk-impact-2026`)
- [ ] `ai-public-sector-procurement-g-cloud-uk` — "AI Procurement via G-Cloud: A Guide for UK Public Sector"
- [ ] `ai-agents-customer-service-uk-2026` — "AI Agents in Customer Service: 2026 UK Playbook"
- [ ] `knowledge-graph-rag-hybrid-uk` — "Knowledge Graph + RAG Hybrid Retrieval: UK Enterprise Guide"
- [ ] `ml-for-uk-automotive-fleet` — опора для нової ніші `/ml/automotive`
- [ ] `ml-for-uk-pharma-clinical-trials` — опора для нової ніші `/ml/pharma-life-sciences`
- [ ] `ai-content-moderation-uk-media` — опора для `/ai/media-entertainment`
- [ ] `ai-dubbing-localisation-media-uk` — опора для `/ai/media-entertainment`
- [ ] `llm-observability-production-uk` — "LLM Observability in Production: UK Guide" (не плутати з глосарій-терміном `llm-observability-vocabulary`)
- [ ] `ai-voice-agents-uk-business-2026` — "Voice AI Agents for UK Business: 2026 Guide"
- [ ] `ml-for-uk-water-utilities` — нова галузева вертикаль (leak detection, demand forecasting)
- [ ] `computer-vision-checkout-free-retail-uk` — "Checkout-Free Retail with Computer Vision: UK Guide"
- [ ] `ai-for-uk-professional-services-guide` — консалтинг/бухгалтерія/юр.фірми
- [ ] `ml-model-risk-management-uk-banking` — SR 11-7 style model risk management (відрізнити від наявного `ml-bias-detection-uk-financial-services`)
- [ ] `causal-ai-marketing-attribution-uk` — causal inference для маркетинг-атрибуції
- [ ] `ai-agent-security-guardrails-uk` — "Securing AI Agents: Guardrails and Prompt-Injection Defence"

**Перед написанням кожного:** перевірити `grep -o "slug: ['\"][a-z0-9-]*['\"]" src/lib/data/blog.ts` на дублікати — після Sprint 14 могли з'явитись схожі теми.

### F. Round 2 (2026-07-10, продовження) — глосарій, use-cases, resources
> Перевірено проти `glossary.ts` (435 термінів), `useCases.ts` (49), `resources.ts` (94) — нижче тільки відсутнє.

**Нові глосарій-терміни** (2026 trending, відсутні в `glossary.ts`):
- [ ] `small-language-models` — SLM vs LLM, on-device/edge inference
- [ ] `world-models` — world models в AI-плануванні (за мотивами Sora/Genie-класу систем)
- [ ] `reasoning-models` — test-time compute / chain-of-thought reasoning models (o-series/R1-клас)
- [ ] `test-time-compute` — окремий термін від reasoning-models, фокус на inference-scaling
- [ ] `mixture-of-experts` (MoE-архітектура для LLM, не плутати з наявним `mixture-of-experts-vocabulary` — той з іншого проєкту/namespace, перевірити колізію slug'ів)
- [ ] `model-context-protocol` (MCP) — як AI-агенти підключаються до інструментів/даних
- [ ] `ai-red-teaming` — тестування LLM на джейлбрейки перед продакшеном
- [ ] `sovereign-ai` — data residency / on-prem LLM для регульованих UK-галузей (банкінг, NHS)
- [ ] `token-economy-llm` — вартість inference по токенах, порівняння провайдерів

**Нові use-cases** (49 наявних — додати під нові вертикалі з розділу A):
- [ ] `fleet-predictive-maintenance-automotive` — опора для `/ml/automotive`
- [ ] `clinical-trial-patient-matching-ml` — опора для `/ml/pharma-life-sciences`
- [ ] `government-citizen-service-chatbot` — опора для `/ai/government`
- [ ] `content-moderation-media-platform` — опора для `/ai/media-entertainment`
- [ ] `water-leak-detection-ml` — опора для `ml-for-uk-water-utilities`

**Нові resources** (94 наявних, переважно UK-інституційні гайди — додати свіжі 2026 джерела):
- [ ] `uk-ai-act-risk-classification-checklist` — практичний checklist-ресурс (companion до blog `uk-ai-act-risk-classification-guide`)
- [ ] `g-cloud-14-ai-procurement-guide` — G-Cloud 14 (Crown Commercial Service) для AI-закупівель у публічному секторі
- [ ] `slm-vs-llm-cost-comparison-2026` — companion-ресурс до tool "LLM Token Cost Comparator"

**Перед написанням:** `grep -o "slug: ['\"][a-z0-9-]*['\"]" src/lib/data/glossary.ts` (і відповідно `useCases.ts`/`resources.ts`) на дублікати.

### G. Round 3 (2026-07-10, продовження) — compare, portfolio, careers, ще міста, ще блог
> Перевірено проти `compare.ts` (59 "vs-*"), `portfolio.ts` (94), `careers.ts` (20), `geo.ts` (25+8 з розділу D) — нижче тільки відсутнє.

**Нові compare-сторінки** (59 наявних покривають Big4/hyperscalers/AutoML — бракує UK-specific AI-бутиків і кількох платформ):
- [ ] `vs-faculty-ai` — Faculty (UK AI consultancy, урядові контракти) — прямий UK-конкурент, найвища релевантність
- [ ] `vs-peak-ai` — Peak AI (Manchester, "Decision Intelligence" платформа)
- [ ] `vs-contino-ai` — Contino (UK cloud/AI консалтинг)
- [ ] `vs-kpmg-ai` — KPMG AI Consulting
- [ ] `vs-ey-ai` — EY.ai
- [ ] `vs-capgemini-ai` — Capgemini Invent AI
- [ ] `vs-ibm-watsonx` — IBM watsonx.ai platform
- [ ] `vs-cohere-enterprise` — Cohere API (enterprise LLM)
- [ ] `vs-nvidia-ai-enterprise` — NVIDIA AI Enterprise stack
- [ ] `vs-tcs-infosys-ai-offshore` — офшорні гіганти (TCS/Infosys/Wipro) — "чому не офшор"

**Нові portfolio case studies** (94 наявних, жодного під нові вертикалі з розділу A):
- [ ] `automotive-fleet-predictive-maintenance` — опора для `/ml/automotive`
- [ ] `pharma-clinical-trial-matching-ml` — опора для `/ml/pharma-life-sciences`
- [ ] `gov-citizen-service-chatbot-rag` — опора для `/ai/government`
- [ ] `media-content-moderation-ai` — опора для `/ai/media-entertainment`
- [ ] `telecoms-churn-network-anomaly-ml` — опора для `/ml/telecoms`
- [ ] `water-utility-leak-detection-ml` — опора для нової галузевої вертикалі
- [ ] `professional-services-ai-automation` — опора для `ai-for-uk-professional-services-guide`

**Нові careers ролі** (20 наявних, переважно engineering — бракує ролей non-eng і delivery):
- [ ] `ai-ethics-governance-lead` — AI Ethics & Governance Lead (E-E-A-T сигнал + EU/UK AI Act релевантність)
- [ ] `applied-scientist` — Applied Scientist (research-to-production, відрізняється від ml-research-engineer)
- [ ] `ml-platform-engineer` — ML Platform Engineer (internal tooling, відрізняється від mlops-engineer)
- [ ] `prompt-engineer-llm` — Prompt/LLM Engineer
- [ ] `client-delivery-lead-ml` — Client Delivery Lead (non-tech, B2B trust сигнал)

**Ще нові міста** (з розділу D вже заплановано 8: Aberdeen/Dundee/York/Milton Keynes/Norwich/Swansea/Bath/Exeter — додатково):
- [ ] Luton
- [ ] Slough — Thames Valley тех-кластер (синергія з `/services/llm-rag` — багато tech HQ)
- [ ] Warwick — синергія з `/ml/manufacturing` (Warwick Manufacturing Group / автопром West Midlands)
- [ ] Guildford — тех-кластер Surrey (гейм-дев/software)
- [ ] Bradford / Hull — Yorkshire secondary hubs (низька конкуренція за "ML consultant")

**Ще нові blog-slug'и** (Round 3, продовжує Sprint 15–18 з розділу E — перевірено на дублі проти 248 наявних):
- [ ] `ai-consultancy-vs-boutique-uk` — "AI Boutique vs Big4 vs Faculty/Peak: How to Choose (UK 2026)" — опора для `vs-faculty-ai`/`vs-peak-ai`
- [ ] `ml-for-uk-water-utilities-ofwat` — деталізація Ofwat-регулювання (доповнює `ml-for-uk-water-utilities`)
- [ ] `ai-ethics-board-uk-setup-guide` — "Setting Up an AI Ethics Board: UK Business Guide"
- [ ] `applied-ai-scientist-vs-ml-engineer-uk` — роз'яснювальний пост про ролі (підтримка careers-сторінок)
- [ ] `nvidia-ai-enterprise-uk-cost-guide` — вартість NVIDIA AI Enterprise для UK підприємств
- [ ] `cohere-vs-openai-vs-anthropic-enterprise-uk` — порівняння enterprise LLM API для UK бізнесу
- [ ] `ai-for-uk-warehousing-3pl` — 3PL/warehouse automation (відрізнити від наявного `ml-for-uk-logistics-last-mile`)
- [ ] `ml-for-uk-motor-insurance-telematics` — telematics-based motor insurance (вужче за наявний `ml-for-uk-insurance-underwriting`)
- [ ] `ai-agent-orchestration-frameworks-uk` — LangGraph/CrewAI/AutoGen порівняння для UK enterprise
- [ ] `offshore-vs-uk-ml-outsourcing-cost` — опора для `vs-tcs-infosys-ai-offshore`

**Перед написанням кожного:** звірити slug проти `compare.ts`/`portfolio.ts`/`careers.ts`/`blog.ts`/`geo.ts` — паралельні спринти могли вже додати схоже.

### H. Round 4 (2026-07-10, продовження) — глосарій хвиля 2, compare хвиля 2, use-cases/resources/tools, останні міста
> Перевірено: `glossary.ts` (435, включно з `chain-of-thought`/`guardrails-llm` — вже є), `compare.ts` (59 + 10 з Round 3), `geo.ts` (25 наявних + 13 заплановано в розділах D/G — нижче фінальна хвиля).

**Нові глосарій-терміни (хвиля 2)** — перевірено, відсутні в `glossary.ts`:
- [ ] `test-time-compute` — inference-time scaling (окремо від `reasoning-models` з Round 2 — саме механізм, а не клас моделей)
- [ ] `shadow-ai` — неавторизоване використання AI співробітниками (governance-ризик, високий бізнес-інтерес)
- [ ] `llmops` — LLMOps як дисципліна (відрізняється від наявного MLOps-кластера термінів)
- [ ] `ai-trism` — AI Trust, Risk & Security Management (Gartner-термін, добре для enterprise-аудиторії)
- [ ] `context-caching-llm` — prompt/context caching для зниження вартості LLM API
- [ ] `guardrails-as-code` — окремо від наявного `guardrails-llm` — фокус на CI/CD-інтеграції guardrails

**Нові compare-сторінки (хвиля 2)** — enterprise AI-платформи, відсутні в `compare.ts`:
- [ ] `vs-glean-enterprise-search` — Glean (enterprise AI search/knowledge)
- [ ] `vs-writer-enterprise-ai` — Writer (enterprise generative AI platform)
- [ ] `vs-moveworks-ai` — Moveworks (AI agent для IT/HR support)
- [ ] `vs-uipath-ai-automation` — UiPath (RPA+AI automation) — релевантно для `/ai/hr`, `/ai/legal`
- [ ] `vs-workday-ai` — Workday AI (HR/people analytics вбудований AI) — релевантно для `/ai/hr`

**Нові use-cases** (49 наявних):
- [ ] `shadow-ai-governance-audit` — опора для глосарій-терміну `shadow-ai`
- [ ] `llm-context-caching-cost-reduction` — опора для `context-caching-llm`
- [ ] `ai-agent-orchestration-multi-tool` — опора для blog `ai-agent-orchestration-frameworks-uk`
- [ ] `telecoms-network-anomaly-detection` — опора для `/ml/telecoms`

**Нові resources**:
- [ ] `ai-trism-framework-uk-checklist` — companion до глосарій-терміну `ai-trism`
- [ ] `shadow-ai-policy-template-uk` — готовий policy-темплейт для клієнтів (сильний lead-magnet)

**Фінальна хвиля міст** (25 наявних + 13 заплановано в D/G = 38 — додатково remaining secondary UK hubs):
- [ ] Wolverhampton
- [ ] Stoke-on-Trent
- [ ] Middlesbrough
- [ ] Swindon
- [ ] Bournemouth
- [ ] Colchester

**Ще blog-slug'и** (Round 4, доповнює хвилі E/G):
- [ ] `shadow-ai-governance-uk-guide` — "Shadow AI: The Governance Risk No One's Tracking (UK Guide)"
- [ ] `llmops-vs-mlops-uk-guide` — "LLMOps vs MLOps: What UK Enterprises Need to Know"
- [ ] `ai-trism-framework-uk-2026` — "AI TRiSM: Trust, Risk and Security Management for UK Enterprise"
- [ ] `enterprise-ai-search-glean-uk-guide` — опора для `vs-glean-enterprise-search`
- [ ] `rpa-vs-ai-agents-uk-automation` — UiPath/RPA vs AI-agent автоматизація, опора для `vs-uipath-ai-automation`

**Перед написанням кожного:** звірити проти `glossary.ts`/`compare.ts`/`useCases.ts`/`resources.ts`/`geo.ts`/`blog.ts` — це вже 4-й раунд, ризик колізій зростає.

---

## Roadmap Sprint 70+ (2026-07-12)

> Розділи A–H вище (Sprint 19+) повністю реалізовані в Sprint 69. **Не додавати новий контент за цим самим патерном без прочитання [TODO_ROADMAP.md](TODO_ROADMAP.md) першою.** Стратегічний фокус змістився з обсягу на якість/довіру/технічний борг:

- 🔴 Phase 1 — аналітика/безпека форм ([tech/TODO_integrations.md](tech/TODO_integrations.md)), fake-review E-E-A-T ризик ([seo/TODO_trust_authenticity.md](seo/TODO_trust_authenticity.md)), відомі дефекти даних ([tech/TODO_data_integrity.md](tech/TODO_data_integrity.md))
- 🟡 Phase 2 — нова `/security` сторінка ([pages/TODO_security_compliance.md](pages/TODO_security_compliance.md)), аудит якості контенту на масштабі ([seo/TODO_content_quality_audit.md](seo/TODO_content_quality_audit.md))
- 🟢 Phase 3 — продовження обсягу, лише за результатами Phase 2 аудиту

Повний опис фаз, обґрунтування і залежності — [TODO_ROADMAP.md](TODO_ROADMAP.md).
