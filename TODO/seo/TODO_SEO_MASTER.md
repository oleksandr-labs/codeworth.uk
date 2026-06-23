# SEO Master Blueprint — Codeworth ML/AI Consultancy

**Ціль:** Максимальна SEO-видимість у Google UK для ML/AI B2B запитів.
**Ринок:** Великобританія (EN, первинний), Україна (UK, вторинний).
**Статус:** 🔲 В роботі
**Оновлено:** 2026-06-23

---

## 📐 Архітектура сторінок (Tier-модель)

```
Tier 1 — Money Pages (комерційний intent, найвища пріоритетність)
├── /services/machine-learning        ← "machine learning company UK"
├── /services/artificial-intelligence ← "AI development company UK"
├── /services/nlp                     ← "NLP development UK" [❌ НЕ ІСНУЄ]
├── /services/computer-vision         ← "computer vision development UK" [❌ НЕ ІСНУЄ]
├── /services/mlops                   ← "MLOps services UK" [❌ НЕ ІСНУЄ]
├── /services/llm-rag                 ← "LLM RAG chatbot UK" [❌ НЕ ІСНУЄ]
├── /services/predictive-analytics    ← "predictive analytics UK" [❌ НЕ ІСНУЄ]
├── /pricing                          ← "ML development cost UK"
└── /contact                          ← "ML consultancy quote UK"

Tier 2 — Topic Cluster Hubs (навігаційний + комерційний)
├── /ml                               ← "machine learning for business UK"
├── /ai                               ← "AI for business UK"
├── /use-cases                        ← "ML use cases business"
├── /compare                          ← "ML agency vs in-house"
├── /extras                           ← "ready-made AI solutions UK"
└── /portfolio                        ← "ML case studies UK"

Tier 3 — Niche Landing Pages (long-tail, галузеві)
├── /ml/banking                       ← "ML fraud detection UK"
├── /ml/retail                        ← "ML demand forecasting UK"
├── /ml/healthcare                    ← "ML healthcare analytics UK"
├── /ml/logistics                     ← "ML supply chain UK"
├── /ml/saas                          ← "ML churn prediction SaaS UK"
├── /ml/agritech                      ← "ML agritech UK" (low competition!)
├── /ai/fintech                       ← "AI fintech company UK"
├── /ai/ecommerce                     ← "AI ecommerce personalisation UK"
├── /ai/healthcare                    ← "AI clinical NLP UK"
├── /ai/marketing                     ← "AI marketing automation UK"
└── /ai/hr                            ← "AI recruitment screening UK"

Tier 4 — Blog / Informational (inbound + E-E-A-T)
└── /blog/[slug]                      ← "how ML fraud detection works", тощо
```

---

## 🎯 Ключові слова по сторінках (EN, UK-ринок)

### Tier 1 — Money Pages

| Сторінка | Primary KW | Secondary KW | Monthly Vol (est.) |
|---|---|---|---|
| `/services/machine-learning` | machine learning company UK | custom ML model development | 500–1K |
| `/services/artificial-intelligence` | AI development company UK | artificial intelligence consultancy UK | 1K–5K |
| `/services/nlp` | NLP development services UK | natural language processing company UK | 200–500 |
| `/services/computer-vision` | computer vision development UK | CV ML company UK | 200–500 |
| `/services/mlops` | MLOps services UK | ML model deployment UK | 100–300 |
| `/services/llm-rag` | LLM development UK / RAG chatbot development | GPT integration services UK | 300–1K |
| `/services/predictive-analytics` | predictive analytics company UK | business intelligence ML UK | 500–1K |
| `/pricing` | ML development cost UK | how much machine learning costs UK | 300–500 |
| `/contact` | ML consultancy UK | hire ML engineers UK | — |

### Tier 2 — Hubs

| Сторінка | Primary KW | Intent |
|---|---|---|
| `/ml` | machine learning for business UK | Інформаційний → Комерційний |
| `/ai` | AI for business UK | Інформаційний → Комерційний |
| `/use-cases` | machine learning use cases | Інформаційний |
| `/compare` | ML outsourcing vs in-house | Комерційний (BOFU) |
| `/portfolio` | ML case studies UK | Комерційний (BOFU) |

### Tier 3 — Niche Pages (найвища цінність для SEO)

| Сторінка | Primary KW | Конкуренція |
|---|---|---|
| `/ml/banking` | fraud detection machine learning UK | Висока |
| `/ml/retail` | ML demand forecasting retail UK | Середня |
| `/ml/healthcare` | ML healthcare analytics UK | Середня |
| `/ml/logistics` | ML supply chain optimization UK | Середня |
| `/ml/saas` | ML churn prediction SaaS UK | Низька |
| `/ml/agritech` | machine learning agriculture UK | ⭐ Дуже низька |
| `/ai/fintech` | AI fintech company UK | Висока |
| `/ai/ecommerce` | AI ecommerce personalisation UK | Середня |
| `/ai/healthcare` | AI clinical NLP UK | Середня |

---

## 📝 Вимоги до контенту (кожна сторінка)

### Мінімальні вимоги для ранжування

| Тип сторінки | Мін. слів | H2/H3 | FAQ | Schema |
|---|---|---|---|---|
| Tier 1 Service | 1500 | 6–8 | 5–7 | `Service` + `FAQPage` |
| Tier 2 Hub | 1200 | 5–6 | 4–5 | `Service` + `FAQPage` |
| Tier 3 Niche | 1000 | 4–5 | 4–5 | `Service` + `FAQPage` |
| Blog Post | 1500+ | 5–7 | 3 | `BlogPosting` + `HowTo`/`FAQPage` |
| Portfolio Case | 800 | 4–5 | 0 | `Article` + `VideoObject`? |
| Pricing | 600 | 3–4 | 5 | `Service` + `Offer` + `FAQPage` |

### On-Page SEO чеклист (кожна сторінка)
- [ ] Primary keyword у H1 (перші 3 слова)
- [ ] Primary keyword у `<title>` (перші 50 символів)
- [ ] Primary keyword у перших 100 словах body
- [ ] Meta description 150–160 символів + CTA ("Get a free quote", "Book ML consultation")
- [ ] Keyword density: primary 0.5–1.5%, secondary ≤ 0.5%
- [ ] LSI ключові слова природно по тексту (2–3 на 500 слів)
- [ ] Мінімум 2–3 internal links із анкорами до нижчих Tier-сторінок
- [ ] Мінімум 1 outbound link на авторитетний ресурс (gov.uk, IEEE, arxiv)
- [ ] Зображення: alt text із keyword, WebP формат, <100KB
- [ ] FAQ блок наприкінці кожної сторінки (≥5 питань)
- [ ] Schema markup валідний (Google Rich Results Test)
- [ ] CTA у hero + середина сторінки + кінець

---

## 🔍 Відсутні сторінки (найвищий SEO-пріоритет)

### ❌ Критично відсутні (Tier 1 service pages)

#### 1. `/services/nlp` — NLP & Text Processing
- **Primary:** `NLP development services UK`
- **Secondary:** `natural language processing company UK`, `text classification service UK`
- **PAA:** "What is NLP in machine learning?", "How much does NLP development cost UK?"
- **Use cases:** sentiment analysis, ticket classification, document extraction, RAG
- **Пов'язані:** `/ai/healthcare`, `/ml/banking`, blog NLP posts
- **Статус:** ❌ Сторінка не існує → TODO в `pages/services/TODO_nlp.md`

#### 2. `/services/computer-vision` — Computer Vision
- **Primary:** `computer vision development UK`
- **Secondary:** `CV object detection UK`, `image recognition AI company UK`
- **PAA:** "What is computer vision used for?", "How much does CV system cost?"
- **Use cases:** QC inspection, OCR, visual search, medical imaging
- **Пов'язані:** `/ml/healthcare`, `/ai/ecommerce`, portfolio CV projects
- **Статус:** ❌ Сторінка не існує → TODO в `pages/services/TODO_computer_vision.md`

#### 3. `/services/mlops` — MLOps & ML Deployment
- **Primary:** `MLOps services UK`
- **Secondary:** `ML model deployment UK`, `ML pipeline automation UK`
- **PAA:** "What is MLOps?", "Do I need MLOps for my ML model?"
- **Use cases:** model monitoring, drift detection, CI/CD for ML, retraining pipelines
- **Пов'язані:** `/pricing` (MLOps retainer), `/services/machine-learning`
- **Статус:** ❌ Сторінка не існує → TODO в `pages/services/TODO_mlops_service.md`

#### 4. `/services/llm-rag` — LLM & RAG Development
- **Primary:** `LLM development company UK`, `RAG chatbot development UK`
- **Secondary:** `GPT integration services UK`, `custom AI chatbot UK`
- **PAA:** "What is RAG in AI?", "How to build a custom chatbot UK?"
- **Use cases:** customer support bot, document Q&A, internal knowledge base
- **Пов'язані:** `/extras` (AI modules), `/ai/ecommerce`, `/ai/hr`
- **Статус:** ❌ Сторінка не існує → TODO в `pages/services/TODO_llm_rag.md`

#### 5. `/services/predictive-analytics` — Predictive Analytics
- **Primary:** `predictive analytics company UK`
- **Secondary:** `business forecasting ML UK`, `data analytics ML service`
- **PAA:** "What is predictive analytics?", "Predictive analytics vs business intelligence?"
- **Use cases:** demand forecasting, churn prediction, revenue forecasting, risk scoring
- **Пов'язані:** `/ml/retail`, `/ml/banking`, `/ml/saas`
- **Статус:** ❌ Сторінка не існує → TODO в `pages/services/TODO_predictive_analytics.md`

---

## 📚 Topic Clusters — Контент-план (Блог)

### Cluster 1: Machine Learning for Business
**Pillar:** `/services/machine-learning`

| Slug | H1 | Primary KW | Тип |
|---|---|---|---|
| `machine-learning-cost-uk` | How Much Does Machine Learning Cost in the UK? | machine learning cost UK | Інформаційний |
| `ml-roi-business-guide` | Measuring ML ROI: A Business Guide | ML ROI business | Інформаційний |
| `ml-vs-ai-difference` | Machine Learning vs AI: What's the Difference? | ML vs AI | Інформаційний |
| `when-to-use-machine-learning` | When Does Your Business Actually Need ML? | when to use machine learning | Інформаційний |
| `ml-data-requirements` | How Much Data Do You Need for ML? | ML data requirements | Інформаційний |
| `ml-project-phases` | ML Project Lifecycle: From PoC to Production | ML project phases | Інформаційний |
| `gdpr-machine-learning-uk` | GDPR Compliance in ML: UK Business Guide | GDPR machine learning UK | Інформаційний |
| `on-premise-vs-cloud-ml` | On-Premise vs Cloud ML Deployment: 2026 Guide | on-premise ML deployment | Інформаційний |

### Cluster 2: AI for Business
**Pillar:** `/services/artificial-intelligence`

| Slug | H1 | Primary KW | Тип |
|---|---|---|---|
| `ai-chatbot-rag-guide` | Building an AI Chatbot with RAG: Complete Guide | AI chatbot RAG development | How-To |
| `llm-vs-traditional-ml` | LLM vs Traditional ML: When to Use Each | LLM vs ML | Інформаційний |
| `ai-implementation-guide-uk` | How to Implement AI in Your UK Business | AI implementation guide UK | How-To |
| `ai-cost-uk-2026` | AI Development Costs UK 2026: Complete Breakdown | AI development cost UK | Інформаційний |
| `ai-for-sme-uk` | AI for Small Business UK: Practical Guide | AI small business UK | Інформаційний |

### Cluster 3: MLOps
**Pillar:** `/services/mlops`

| Slug | H1 | Primary KW | Тип |
|---|---|---|---|
| `what-is-mlops` | What is MLOps? A Business Guide | what is MLOps | Інформаційний |
| `mlops-tools-comparison` | MLflow vs Kubeflow vs SageMaker: MLOps Tools 2026 | MLOps tools comparison | Інформаційний |
| `model-drift-detection` | How to Detect and Fix ML Model Drift | model drift detection | How-To |
| `ml-model-monitoring` | ML Model Monitoring: Why It Matters in Production | ML monitoring production | Інформаційний |

### Cluster 4: Industry-Specific (найвища SEO-цінність)

| Slug | H1 | Primary KW |
|---|---|---|
| `ml-fraud-detection-explained` | How ML Fraud Detection Works: A Non-Technical Guide | how ML fraud detection works |
| `nlp-customer-service-guide` | NLP for Customer Service: 2026 Complete Guide | NLP customer service UK |
| `computer-vision-manufacturing-guide` | Computer Vision in Manufacturing: UK Guide | CV manufacturing quality control UK |
| `predictive-maintenance-ml` | Predictive Maintenance with ML: ROI & Implementation | predictive maintenance ML UK |
| `ml-healthcare-uk-guide` | Machine Learning in Healthcare UK: Opportunities & Compliance | ML healthcare UK |
| `churn-prediction-saas` | ML Churn Prediction for SaaS: Build vs Buy | churn prediction SaaS ML |
| `demand-forecasting-retail-uk` | ML Demand Forecasting for UK Retailers: Complete Guide | demand forecasting ML retail UK |

---

## 🏗️ Schema Markup — Стратегія

### Обов'язкові Schema по типу сторінки

| Сторінка | Schema Types |
|---|---|
| Головна | `ProfessionalService` + `FAQPage` + `BreadcrumbList` |
| Service pages | `Service` + `FAQPage` + `BreadcrumbList` |
| ML/AI niche pages | `Service` + `FAQPage` + `BreadcrumbList` |
| Blog posts | `BlogPosting` + `FAQPage` або `HowTo` |
| Portfolio case study | `Article` (type: CaseStudy) |
| Pricing | `Offer` + `FAQPage` |
| Contact | `ContactPage` |
| About | `AboutPage` + `Organization` |
| Careers | `JobPosting` (кожна вакансія) |
| FAQ | `FAQPage` (10 питань) |

### Перевірка Schema
- [ ] Щомісячно: Google Rich Results Test на всіх Tier 1–2 сторінках
- [ ] Schema Validator (schema.org/validator) перед кожним деплоєм
- [ ] GSC → Enhancements → перевіряти помилки `FAQPage`, `JobPosting`

---

## 🔗 Internal Linking Strategy

### Правило воронки: Інформаційний → Комерційний
```
Blog Post → Niche Page → Service Page → Pricing → Contact
/blog/ml-fraud-detection-explained → /ml/banking → /services/machine-learning → /pricing → /contact
```

### Обов'язкові internal links на кожній сторінці

| З сторінки | Посилається на | Анкор |
|---|---|---|
| Blog posts | Service page (відповідна) | "custom ML [service] UK" |
| Blog posts | Portfolio case (relevant) | "see case study" |
| Niche pages (/ml/*, /ai/*) | Parent service page | "Machine Learning services" |
| Niche pages | Pricing | "see ML pricing" |
| Portfolio cases | Relevant service page | "similar ML project" |
| Extras (/extras) | Services page | "custom ML solution" |
| About | Services | "our ML services" |

### Сторінки без достатніх internal links (TODO)
- [ ] `/compare/*` — додати посилання на pricing + contact
- [ ] `/extras` — кожна категорія → відповідна service page
- [ ] Всі blog posts → перевірити CTA-links до service pages
- [ ] `/portfolio/[slug]` → "similar service" link до відповідного `/services/*`

---

## ⚡ Technical SEO Checklist

### Core Web Vitals (перевіряти щомісяця)
- [ ] LCP < 2.5s на мобільному (Google PageSpeed)
- [ ] FID < 100ms / INP < 200ms
- [ ] CLS < 0.1
- [ ] TTFB < 800ms (Hetzner + nginx + Next.js standalone)
- [ ] Загальний вага сторінки < 1MB (без зображень)

### Crawlability & Indexing
- [ ] `robots.txt` — перевірити що блокується: `/api/`, `/admin/`, `/marketplace/`, `/startup/`, `/niches/`
- [ ] `sitemap.xml` — генерується динамічно, перевіряти раз на місяць в GSC
- [ ] 404 перевірка: старі URL нікуди не ведуть крім тих що мають 301-redirect
- [ ] Redirects: всі 301 повертають правильні URL (перевірити через curl)
- [ ] Дублікати: перевіряти `/en/` prefix vs `/` (canonical)

### Canonical & hreflang
- [ ] Кожна EN-сторінка: `canonical` = `https://codeworth.uk/[path]` (без /en/)
- [ ] Кожна UK-сторінка: `canonical` = `https://codeworth.uk/uk/[path]`
- [ ] `x-default` → EN URL (`codeworth.uk/[path]`)
- [ ] hreflang: `en-gb` → EN, `uk` → UK (у `buildAlternates()`)
- [ ] Перевіряти hreflang через Google Search Console Coverage

### Image SEO
- [ ] Всі зображення: WebP формат, max 150KB
- [ ] Alt text = описовий, містить keyword (не "image1.webp")
- [ ] Lazy loading на non-hero зображеннях
- [ ] OG зображення: 1200×630px для всіх Tier 1–2 сторінок

### Page Speed оптимізація
- [ ] Google Fonts — використовувати `next/font` (вже є в базі?)
- [ ] Шрифти — preload `font-display: swap`
- [ ] Стрілити JavaScript бандли: перевіряти bundle analyzer (ANALYZE=true)
- [ ] ISR / Static generation для всіх сторінок (no SSR де непотрібно)
- [ ] nginx gzip/br на Hetzner атлас

---

## 📊 E-E-A-T Сигнали (Experience, Expertise, Authoritativeness, Trust)

### Expertise (Компетентність)
- [ ] Авторські профілі для кожного автора блогу (фото, посада, LinkedIn, GitHub)
- [ ] "About Author" блок у кожній статті блогу зі Schema `Person`
- [ ] Технічний стек — Схема `SoftwareApplication` або деталі в сервіс-сторінках
- [ ] Конкретні метрики у кейсах (F1-score, precision, recall, ROI, часові рамки)
- [ ] Публікація на arXiv / Towards Data Science / Medium Engineering (backlinks)

### Authoritativeness (Авторитетність)
- [ ] Згадки у галузевих виданнях (ML/AI blogs, FinTech media UK)
- [ ] Guest posts на авторитетних ML-блогах (TowardsDataScience, HuggingFace Blog)
- [ ] Участь у UK ML-конференціях (сторінка "Speaking / Events")
- [ ] Клієнтські відгуки з ім'ям, компанією, посадою (не анонімні)
- [ ] Clutch/G2 профіль з верифікованими відгуками
- [ ] GitHub репозиторії з open-source ML утилітами

### Trust (Довіра)
- [ ] HTTPS + HSTS (✅ вже є)
- [ ] Privacy Policy оновлена для ML/AI обробки даних (GDPR AI Act)
- [ ] Чіткі SLA та гарантії якості на Pricing сторінці
- [ ] Вказані умови NDA / IP ownership у ToS
- [ ] Контакт: реальна email + компанія зареєстрована (UK Ltd або UA)
- [ ] Schema `Organization` з `contactPoint`, `address`, `sameAs` (LinkedIn, GitHub)

---

## 🌐 Off-Page SEO (Link Building для ML компанії)

### Найцінніші джерела backlinks

| Тип | Приклад | Цільові сторінки |
|---|---|---|
| Guest Post (ML blogs) | Towards Data Science, Weights & Biases | /services/machine-learning, blog |
| Industry Directories | Clutch.co, GoodFirms, TopDevelopers | Головна |
| GitHub (open-source) | ML utils repo → star → backlinks | /services/mlops |
| PR / Media | TechCrunch UK, FinTech Futures (case studies) | /portfolio/* |
| Stack Overflow / Reddit | Відповіді + профіль → credibility | — |
| UK Business Directories | Companies House, UK Trade & Investment | Головна |
| Podcast / Webinar | ML podcasts UK → згадка або guest | Головна |

### Стратегія Guest Posts
- [ ] Список 20 ML/AI блогів що приймають гост-пости (EN)
- [ ] Написати 2 гост-пости на місяць (TowardsDataScience пріоритет)
- [ ] Теми: реальні кейси з числами (Editor-friendly)
- [ ] CTA в bio: "Codeworth — ML consultancy for UK businesses"

---

## 📅 SEO-пріоритети (Roadmap)

### Тиждень 1–2: Відсутні сторінки (критично)
- [ ] Створити `/services/nlp` (NLP service page)
- [ ] Створити `/services/computer-vision`
- [ ] Створити `/services/mlops`
- [ ] Створити `/services/llm-rag`
- [ ] Створити `/services/predictive-analytics`
- [ ] Додати ці сторінки до sitemap + footer SERVICES список

### Тиждень 3–4: On-Page SEO аудит
- [ ] Пройтись по всіх Tier 1 сторінках — перевірити H1/meta/schema
- [ ] Додати FAQ блок там де відсутній (≥5 питань)
- [ ] Перевірити internal links: blog → service, portfolio → service
- [ ] Перевірити alt тексти зображень

### Місяць 2: Контент-спринт
- [ ] 4 blog posts із Cluster 1 (ML for Business)
- [ ] 2 blog posts із Cluster 4 (Industry-Specific) — highest SEO value
- [ ] Розширити `/ml/banking` та `/ai/fintech` до 1200+ слів

### Місяць 3+: Link Building
- [ ] Clutch/G2 профіль + 3 верифіковані відгуки
- [ ] Перший guest post (TowardsDataScience)
- [ ] GitHub open-source ML utils (будь-який корисний скрипт)

---

## 📈 KPI (відстежувати через GSC + GA4)

| KPI | Ціль (6 місяців) | Інструмент |
|---|---|---|
| Organic clicks/mo | 500+ | Google Search Console |
| Impressions/mo | 10,000+ | GSC |
| Average position (Tier 1 KW) | Top 20 | GSC |
| Blog pages indexed | 30+ | GSC Coverage |
| Core Web Vitals (LCP) | < 2.5s | PageSpeed Insights |
| Domain Authority | 20+ | Ahrefs/Moz |
| Inbound backlinks | 30+ | Ahrefs |
| Leads через contact (organic) | 3+/mo | GA4 Goals |
