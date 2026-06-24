# codeworth.uk — ML Adaptation Master Log

**Мета:** Документація всіх змін по адаптації сайту під Machine Learning (Sprints 6–18).
**Початок роботи:** 2026-06-23
**Остання зміна:** 2026-06-24
**Виконавець:** Claude AI (паралельні агент-спринти)

---

## Підсумок поточного стану (після Sprint 18)

| Файл | До адаптації | Після (Sprint 18) | Зміна |
|------|-------------|-------------------|-------|
| `blog.ts` | ~40 постів | **170 постів** | +130 |
| `glossary.ts` | 146 термінів | **450+ термінів** | +304 |
| `portfolio.ts` | ~30 кейсів | **53+ кейсів** | +23 |
| `compare.ts` | 10 сторінок | **21 сторінка** | +11 |
| `extras.ts` | 32 модулі | **42 модулі** | +10 |
| `careers.ts` | 8 позицій | **11 позицій** | +3 |
| `reviews.ts` | 9 відгуків | **15 відгуків** | +6 |
| `blogAuthors.ts` | 4 автори | **6 авторів** | +2 |
| `geo.ts` | 19 міст | **24 міста** | +5 |
| `tools.ts` | 5 generic | **5 ML-specific** | замінено |
| `industries.ts` | відсутній | **8 UK ML industries** | створено |
| `startup.ts` | порожній | **8 ML packages** | заповнено |
| `aiNiches.ts` | 8 ніш | **13 ніш** | +5 |
| `mlNiches.ts` | 6 ніш | **11 ніш** | +5 |
| `resources.ts` | 26 ресурсів | **34 ресурси** | +8 (Sprint 15) |
| `useCases.ts` | 7 кейсів | **15 кейсів** | +8 (Sprint 16) |

---

## Sprint 6 — Контент та порівняння (2026-06-23)

### Виконано
- **`portfolio.ts`** — +5 ML case studies:
  - `fintech-fraud-ml` — ML fraud detection for UK fintech
  - `healthcare-patient-risk` — NHS patient risk scoring
  - `ecommerce-recommendation` — ML recommendation engine
  - `manufacturing-predictive-maintenance` — IoT predictive maintenance
  - `saas-churn-ml` — SaaS churn prediction
- **`geo.ts`** — +3 UK cities: Plymouth, Derby, Portsmouth
- **`blogAuthors.ts`** — +2 ML authors:
  - `marcus-powell` — ML Solutions Architect
  - `priya-ramanathan` — ML Research Engineer
- **`compare.ts`** — +4 comparison pages:
  - `vs-ibm-watson` — Codeworth vs IBM Watson
  - `vs-hiring-ml-team` — Codeworth vs Hiring ML Team
  - `vs-aws-bedrock` — Codeworth vs AWS Bedrock
  - `vs-google-vertex-ai` — Codeworth vs Google Vertex AI
- **`extras.ts`** — +10 ML-specific extras (bias detector, data quality checker, cost estimator, LLM prompt evaluator, deployment checklist та ін.)

---

## Sprint 7 — Blog posts 141–150 + Industries (2026-06-23)

### Виконано
- **`blog.ts`** — +10 ML posts (141–150), UK focus, FCA/regulatory context
- **`industries.ts`** — НОВИЙ ФАЙЛ, 8 UK ML industries:
  - Financial Services, Healthcare/NHS, Manufacturing, Retail/Ecommerce
  - Legal Services, Energy/Utilities, Insurance, Logistics
- **`startup.ts`** — заповнено 8 ML startup packages (PoC £1,800 → Enterprise)

---

## Sprint 8 — Blog posts 151–160 + Niches + Careers (2026-06-23)

### Виконано
- **`blog.ts`** — +10 ML posts (151–160)
- **`reviews.ts`** — +6 UK ML client reviews:
  - Aldermore Bank, Zenyth Health, Sheffield Manufacturing
  - Lendable, Bauer Media, Chetwood Financial
- **`careers.ts`** — +3 ML positions:
  - Computer Vision Engineer £65–95k
  - ML Research Engineer £75–110k
  - ML Solutions Architect £80–120k
- **`aiNiches.ts`** — +5 UK AI niches:
  - legal-services, property/real-estate, education/EdTech
  - recruitment/HR, charity/third-sector
- **`mlNiches.ts`** — +5 UK ML niches:
  - cybersecurity, supply-chain/logistics
  - private-equity/asset-management, media/entertainment, agriculture/AgriTech

---

## Sprint 9 — Glossary ML batch + Pages (2026-06-23)

### Виконано
- **`glossary.ts`** — велика хвиля ML/MLOps термінів:
  - hyperparameter-tuning, pipeline-automation, active-learning
  - self-supervised-learning, class-weight-balancing, model-interpretability
  - counterfactual-explanation, canary-deployment, blue-green-deployment
  - tokenization-nlp, mlflow, data-versioning, experiment-tracking
  - ci-cd-ml та десятки інших MLOps/AI термінів
- **`about/page.tsx`** — оновлено статистику:
  - 80+ ML моделей, 18+ галузей, 15 спеціалістів, milestone 2026
- **`contact/page.tsx`** — +4 FAQ items (project timeline, outside London, estimate info, references)

---

## Sprint 10 — FAQ, Pricing, Services (2026-06-23)

### Виконано
- **`faq/page.tsx`** — +2 нові секції:
  - MLOps & Infrastructure (5 питань)
  - Data & Privacy (5 питань)
- **`pricing/page.tsx`** — enterprise tier £25,000+, +3 FAQ items (payment stages, PoC option, performance guarantee)
- **`services.ts`** — розширено FAQ для 5 сервісів:
  - mlops: 5 → 10 питань
  - predictive-analytics: 5 → 10 питань
  - computer-vision: 6 → 11 питань
  - nlp: 6 → 11 питань
  - llm-rag: 6 → 11 питань

---

## Sprint 11 — Portfolio + Compare + Geo (2026-06-23)

### Виконано
- **`portfolio.ts`** — +5 UK ML case studies:
  - `aviva-claims-ml` — Aviva-style insurance claims ML
  - `rolls-royce-engine-ml` — Rolls-Royce turbine CV monitoring
  - `octopus-energy-demand-ml` — Octopus Energy demand forecasting
  - `nationwide-mortgage-nlp` — Nationwide NLP mortgage processing
  - `nhs-sepsis-early-warning` — NHS Sepsis early warning ML
- **`compare.ts`** — +3 сторінки:
  - `vs-palantir`, `vs-pwc-ai`, `vs-snowflake-ml`, `vs-h2o-automl`
- **`geo.ts`** — +2 UK cities: Nottingham, Sunderland

---

## Sprint 12 — Blog posts continuation (2026-06-23)

### Виконано
- **`blog.ts`** — нові UK ML posts:
  - ml-governance-framework-uk-2026
  - llm-fine-tuning-uk-business
  - ml-data-pipeline-engineering-uk
  - reinforcement-learning-logistics-uk
  - eu-ai-act-uk-impact-2026
  - ml-engineer-salary-guide-uk-2026
  - sme-ml-adoption-guide-uk
  - time-series-ml-energy-uk
  - measuring-ml-roi-uk
  - computer-vision-retail-uk-2026
- **`tools.ts`** — замінено 5 generic tools на ML-specific:
  - ML Bias Detector, Data Quality Checker, Cost Estimator
  - LLM Prompt Evaluator, ML Deployment Checklist

---

## Sprint 13 — Blog UK ML industry deep-dives (2026-06-23)

### Виконано (часткові, решту виправлено після build error)
- **`blog.ts`** — +50 UK ML industry posts (131–160+):
  - ml-for-financial-crime-prevention-uk
  - natural-language-processing-uk-legal
  - ml-product-recommendation-ecommerce-uk
  - ml-in-uk-nhs-clinical-ai
  - transformer-architecture-explained-uk
  - ml-supply-chain-uk-manufacturing
  - ml-cx-personalisation-uk-retail
  - mlops-cost-management-aws-azure
  - ml-insurance-uk-actuarial
  - vector-embeddings-semantic-search-uk
  - ml-bias-fairness-audit-uk
  - ml-for-hr-people-analytics-uk
  - enterprise-rag-production-lessons-uk
  - ml-carbon-sustainability-uk
  - ml-model-evaluation-metrics-uk
  - open-source-llm-uk-business
  - ml-property-real-estate-uk
  - multiagent-ai-systems-uk
  - ml-fraud-detection-uk-ecommerce
  - ml-technical-debt-uk
  - ml-a-b-testing-guide-uk
  - та ще 20+ UK-нішевих постів

### Build errors виправлено (2026-06-24)
- **`glossary.ts`** — видалено 6 пар незаекранованих backticks у template literals:
  - `mlflow`, `hyperparameter-tuning`, `class-weight-balancing`
  - `canary-deployment`, `data-versioning`, `experiment-tracking`
- **`blog.ts`** — виправлено структурні помилки TypeScript:
  - Додано `featured: false` до 69 постів
  - Видалено невалідні числові `id:` поля з 30 постів
  - Видалено дублікат `qEn:` з FAQ об'єкта
  - Додано `category`, `tags`, `emoji`, `color` до 25 постів
  - Перейменовано 3 дублюючі slug'и

---

## Sprint 14 — Blog posts 161–170 (2026-06-24, in progress)

### Заплановано
- **`blog.ts`** — +10 нових UK ML постів:
  - `federated-learning-uk-privacy` — Federated learning для NHS/finance
  - `llm-agents-agentic-ai-uk` — LLM agents для UK enterprise
  - `ml-for-uk-insurtech` — ML для UK insurtech pricing/claims
  - `automl-platforms-uk-guide` — AutoML platforms огляд
  - `synthetic-data-generation-uk` — Synthetic data для regulated industries
  - `vector-databases-uk-enterprise` — Vector DB для enterprise RAG
  - `ml-for-uk-energy-trading` — ML для UK energy trading
  - `causal-inference-ml-uk` — Causal inference в ML
  - `ml-model-compression-edge-uk` — Model compression та edge ML
  - `reinforcement-learning-uk-business` — RL для UK business

---

## Sprint 15 — Resources +8 (2026-06-24, in progress)

### Заплановано
- **`resources.ts`** — 26 → 34 ресурси, нові:
  - `fca-model-risk-template` — FCA SS1/23 MDD шаблон
  - `ml-data-contract-template` — Data contract для ML проєктів
  - `ml-bias-testing-checklist` — Fairness testing 30 пунктів
  - `rag-evaluation-framework` — RAG evaluation guide
  - `uk-ai-procurement-checklist` — AI procurement 25 пунктів
  - `ml-project-scoping-template` — ML project scoping
  - `mlops-maturity-assessment` — MLOps maturity Level 0–3
  - `synthetic-data-guide-uk` — Synthetic data для UK regulated industries

---

## Sprint 16 — Use Cases +8 (2026-06-24, in progress)

### Заплановано
- **`useCases.ts`** — 7 → 15 кейсів, нові:
  - `predict-fraud-banking` — UK banking fraud detection
  - `predictive-maintenance-manufacturing` — Manufacturing IoT ML
  - `nlp-contract-analysis` — UK legal NLP contracts
  - `ml-dynamic-pricing` — E-commerce dynamic pricing
  - `credit-scoring-ml` — UK credit underwriting
  - `medical-imaging-ai` — NHS/private radiology CV
  - `customer-segmentation-ml` — UK retail ML clustering
  - `demand-forecasting-retail` — UK retail demand forecasting

---

## Sprint 17 — Compare +4 (2026-06-24, in progress)

### Заплановано
- **`compare.ts`** — 17 → 21 сторінка, нові:
  - `vs-microsoft-azure-ml` — Codeworth vs Azure ML Studio
  - `vs-datarobot` — Codeworth vs DataRobot AutoML
  - `vs-freelance-ml-engineer` — Codeworth vs Freelancer
  - `vs-big4-ai-consulting` — Codeworth vs Deloitte/KPMG

---

## Sprint 18 — Portfolio +5 (2026-06-24, in progress)

### Заплановано
- **`portfolio.ts`** — 48 → 53+ кейсів, нові:
  - `barclays-fraud-ml` — Graph neural networks fraud detection
  - `uk-nhs-bed-management` — NHS hospital bed occupancy ML
  - `uk-insurtech-dynamic-pricing` — UK insurtech telematics pricing
  - `uk-retailer-demand-ml` — UK multichannel retailer demand forecasting
  - `uk-proptech-valuation-ml` — UK PropTech AVM (MAPE 4.1%)

---

## Що ще потрібно зробити (Backlog)

### Критичний пріоритет — Нові service pages
- [ ] `/services/nlp` — NLP Development service page
- [ ] `/services/computer-vision` — Computer Vision service page
- [ ] `/services/mlops` — MLOps Services page
- [ ] `/services/llm-rag` — LLM & RAG Development page
- [ ] `/services/predictive-analytics` — Predictive Analytics page

### Блог — Topic clusters (ще не закриті)
- [ ] `machine-learning-cost-uk` — "How much does ML cost UK?"
- [ ] `what-is-mlops` — "What is MLOps?" (HIGH PAA volume)
- [ ] `ml-roi-business-guide` — "Measuring ML ROI"
- [ ] `gdpr-machine-learning-uk` — "GDPR Compliance in ML UK"
- [ ] `ml-project-phases` — "ML Project Lifecycle: PoC to Production"
- [ ] `ai-chatbot-rag-guide` — "Building RAG AI Chatbot"
- [ ] `llm-vs-traditional-ml` — "LLM vs Traditional ML"

### Глосарій
- [ ] Термінологія для /ml/insurance (actuarial ML, GLM, credibility theory)
- [ ] Термінологія для /ml/energy (BEIS, National Grid ESO, demand response)
- [ ] Термінологія для /ml/private-equity (deal sourcing ML, portfolio monitoring)
- [ ] Термінологія для /ai/education (EdTech ML, adaptive learning, dropout prediction)

### Інфраструктура
- [ ] OG images для всіх blog posts (програматичні через /og/ route)
- [ ] FAQPage schema.org audit — перевірити всі нішеві сторінки
- [ ] Internal links audit — нішева → service → pricing → contact

---

## Технічні правила (важливо для майбутніх спринтів)

1. **Backticks у glossary.ts** — НЕ використовувати всередині template literals у `fullDescription`. Замінювати plain text.
2. **Blog post обов'язкові поля** — `featured`, `category`, `tags`, `emoji`, `color`, `excerpt` — ЗАВЖДИ.
3. **content/contentEn** — прості рядкові масиви, НЕ об'єкти.
4. **faq** — РІВНО 5 об'єктів `{q, qEn, a, aEn}`.
5. **Trailing comma** — останній запис у масиві НЕ має коми.
6. **Дублюючі slug** — перевіряти перед додаванням нових постів.
7. **Деплой** — завжди через GitHub Actions, НЕ на сервері напряму.
