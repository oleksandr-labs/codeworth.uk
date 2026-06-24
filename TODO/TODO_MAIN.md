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
- [ ] [Emoji → SVG](design/emoji_to_svg/TODO_emoji_to_svg.md) — замінити emoji на SVG icons де можливо
- [ ] [Mobile First](design/TODO_responsive.md) — перевірити нові service pages на мобільному

---

## Tech

### Критичні технічні задачі
- [ ] **Sitemap bug fix** — `/sitemap/page.tsx` рядки 237-276: NICHES_DATA + nichesByCategory ще посилаються на видалені imports → компайл-помилка
- [ ] **Test files** — оновити test mock data (HomeHero.test.tsx та інші з web dev slug'ами)
- [ ] `src/components/tools/WebsiteCostCalculator.tsx` — ще має web dev контент (низький пріоритет)

### Стандартні tech задачі
- [ ] [Сервер та хостинг](tech/TODO_server.md) — atlas 88.198.199.50, nginx, SSL
- [ ] [Продуктивність](tech/TODO_optimization.md) — bundle analyzer, ANALYZE=true
- [ ] [Безпека](tech/TODO_security.md) — перевірити CSP headers
- [ ] [Тестування](tech/TODO_testing.md) — оновити тести після ML-реброндингу

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
