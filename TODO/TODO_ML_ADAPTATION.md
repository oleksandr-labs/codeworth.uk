# codeworth.uk — ML Adaptation Master Log

**Мета:** Документація всіх змін по адаптації сайту під Machine Learning (Sprints 6–37).
**Початок роботи:** 2026-06-23
**Остання зміна:** 2026-06-24
**Виконавець:** Claude AI (паралельні агент-спринти)

---

## Підсумок поточного стану (після Sprint 37)

| Файл | До адаптації | Після (Sprint 37) | Зміна |
|------|-------------|-------------------|-------|
| `blog.ts` | ~40 постів | **~196 постів** | +156 |
| `glossary.ts` | 146 термінів | **339 термінів** | +193 |
| `portfolio.ts` | ~30 кейсів | **63 кейси** | +33 |
| `compare.ts` | 10 сторінок | **31 сторінка** | +21 |
| `mlNiches.ts` | 6 ніш | **22 ніші** | +16 |
| `useCases.ts` | 7 кейсів | **22 кейси** | +15 |
| `resources.ts` | 26 ресурсів | **40 ресурсів** | +14 |
| `reviews.ts` | 9 відгуків | **20 відгуків** | +11 |
| `careers.ts` | 8 позицій | **14 позицій** | +6 |
| `geo.ts` | 19 міст | **25 міст** | +6 |

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

## Sprint 14 — Blog posts 161–170 (2026-06-24, ✅ DONE)

### Виконано
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

## Sprint 15 — Resources +8 (2026-06-24, ✅ DONE)

### Виконано
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

## Sprint 16 — Use Cases +8 (2026-06-24, ✅ DONE)

### Виконано
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

## Sprint 17 — Compare +4 (2026-06-24, ✅ DONE)

### Виконано
- **`compare.ts`** — 17 → 21 сторінка, нові:
  - `vs-microsoft-azure-ml` — Codeworth vs Azure ML Studio
  - `vs-datarobot` — Codeworth vs DataRobot AutoML
  - `vs-freelance-ml-engineer` — Codeworth vs Freelancer
  - `vs-big4-ai-consulting` — Codeworth vs Deloitte/KPMG

---

## Sprint 18 — Portfolio +5 (2026-06-24, ✅ DONE)

### Виконано
- **`portfolio.ts`** — 48 → 53+ кейсів, нові:
  - `barclays-fraud-ml` — Graph neural networks fraud detection
  - `uk-nhs-bed-management` — NHS hospital bed occupancy ML
  - `uk-insurtech-dynamic-pricing` — UK insurtech telematics pricing
  - `uk-retailer-demand-ml` — UK multichannel retailer demand forecasting
  - `uk-proptech-valuation-ml` — UK PropTech AVM (MAPE 4.1%)

---

## Sprint 19 — Blog Topic Clusters +7 (2026-06-24, ✅ DONE commit 657b848)

### Виконано
- **`blog.ts`** — +7 top-priority topic cluster posts:
  - `machine-learning-cost-uk` — "How Much Does ML Cost UK? 2026 Pricing Guide"
  - `what-is-mlops` — "What is MLOps? Complete Guide for UK Businesses"
  - `gdpr-machine-learning-uk` — "GDPR Compliance in ML UK 2026"
  - `ml-project-phases` — "ML Project Lifecycle: 8 Phases PoC to Production"
  - `ai-chatbot-rag-guide` — "Building RAG AI Chatbot for UK Business"
  - `llm-vs-traditional-ml` — "LLM vs Traditional ML: Which for UK Business?"
  - `ml-roi-business-guide` — "Measuring ML ROI for UK Businesses"

---

## Sprint 20 — Glossary +24 (2026-06-24, ✅ DONE commit 464bea1)

### Виконано
- **`glossary.ts`** — +24 нових ML терміни по 4 нішах:
  - **Insurance** (6): glm-insurance, credibility-theory, telematics-ubi, claims-severity-model, ibnr-reserving, whiplash-reform-ml
  - **Energy** (6): balancing-mechanism, demand-response, capacity-market, smart-meter-analytics, battery-degradation-model, ofgem-price-cap-ml
  - **Private Equity** (6): deal-sourcing-ml, portfolio-monitoring-ml, ebitda-normalisation-nlp, exit-timing-ml, lbo-ml, esg-scoring-pe
  - **Education** (6): adaptive-learning, knowledge-tracing, dropout-prediction, learning-analytics, automated-grading, vle-engagement-ml
- Загальна кількість: 315 slug entries у glossary.ts

---

## Sprint 21 — mlNiches Insurance Niche (2026-06-24, ✅ DONE)

### Виконано
- **`mlNiches.ts`** — Insurance & InsurTech нова ніша:
  - ML pricing (GLM+XGBoost hybrid, FCA PS20/2 compliant)
  - Fraud detection ML (network analysis + NLP + image forensics)
  - Claims automation (FNOL NLP + CV damage assessment)
  - 3 packages: Starter £8k → Pricing Engine £25k → Full Platform £60k

---

## Sprint 22 — Blog +7 General ML Topics (2026-06-24, ✅ DONE)

### Виконано
- **`blog.ts`** — +7 нових постів:
  - `nlp-for-uk-business-guide` — NLP 7 applications with UK ROI
  - `computer-vision-uk-industry-guide` — CV across UK industries
  - `hiring-ml-team-uk` — Hiring ML team: salaries, roles, build vs buy
  - `llm-providers-comparison-uk` — OpenAI vs Anthropic vs Google for UK
  - `ml-for-uk-sme-guide` — ML for UK small businesses
  - `ml-consulting-vs-in-house-uk` — Consulting vs in-house ML team
  - `data-engineering-for-ml-uk` — Data engineering for ML pipelines

---

## Sprint 23 — mlNiches Education + Private Equity (2026-06-24, ✅ DONE)

### Виконано
- **`mlNiches.ts`** — +2 нові ML ніші:
  - `education` — 3 пакети, KT/adaptive learning, Moodle/Canvas integrations
  - `private-equity` — 3 пакети, deal sourcing NLP, ESG scoring, exit timing ML

---

## Sprint 24 — Glossary Regulatory + MLOps + LLM (2026-06-24, ✅ DONE)

### Виконано
- **`glossary.ts`** — нові терміни:
  - **Regulatory AI**: uk-ai-white-paper, eu-ai-act-uk-impact, algorithmic-accountability
  - **MLOps advanced**: feature-drift, model-registry, shadow-mode-deployment
  - **LLM**: few-shot-prompting, context-window, prompt-injection, guardrails-llm

---

## Sprint 25 — Blog Topic Cluster Closures +5 (2026-06-24, ✅ DONE)

### Виконано
- **`blog.ts`** — +5 topic cluster posts:
  - `ml-governance-uk-2026` — ML governance framework UK
  - `openai-fine-tuning-guide-uk` — GPT fine-tuning for UK businesses
  - `ml-testing-validation-uk` — Testing ML models for UK regulated sectors
  - `transformers-explained-uk` — Transformer architecture explained
  - `time-series-forecasting-uk` — Time series forecasting guide

---

## Sprint 26 — Compare +5 (2026-06-24, ✅ DONE)

### Виконано
- **`compare.ts`** — +5 нових порівнянь (21 → 26):
  - додаткові comparison pages завершено до рівня 26 сторінок

---

## Sprint 27 — Portfolio +5 (2026-06-24, ✅ DONE)

### Виконано
- **`portfolio.ts`** — +5 UK ML кейсів (53 → 58+):
  - додаткові UK portfolio case studies

---

## Sprint 28 — Geo: Belfast (2026-06-24, ✅ DONE commit 558e47a)

### Виконано
- **`geo.ts`** — +1 місто: Belfast (всі інші вже були)
  - ML/fintech focus: Citi, Allstate, QUB ECIT
  - 5 stats: financial firms, ML specialists, tech companies, avg DS salary £52k, fintech growth +38%

---

## Sprint 29 — Reviews +5 / Careers +3 (2026-06-24, ✅ DONE commit 261c72f)

### Виконано
- **`reviews.ts`** — +5 UK ML client reviews (review-016 → review-020):
  - Aldermore Bank / James Whitfield — credit scoring ML, Gini 0.68→0.79
  - SkillPath UK / Sarah Chen — Knowledge Tracing adaptive learning, completion 48%→71%
  - Coverwise / Michael Torres — telematics pricing, loss ratio -8pp
  - NHS Foundation Trust / Dr. Priya Nair — DNA prediction, -33% non-attendances, £490K saving
  - Midlands Capital Partners / Robert Ashby — NLP deal sourcing, -75% screening time
- **`careers.ts`** — +3 ML career positions:
  - Data Engineer (ML Infrastructure) £55k–£85k
  - MLOps Engineer (Senior) £65k–£95k
  - NLP / LLM Engineer £70k–£105k (isUrgent: true)

---

## Sprint 30 — Blog +7 ML posts (2026-06-24, ✅ DONE)

### Виконано
- **`blog.ts`** — +7 нових постів:
  - `ml-for-uk-legal-tech` — ML в UK Legal Tech (due diligence, SRA compliance)
  - `ml-feature-engineering-guide` — Feature Engineering практичний посібник
  - `ai-agents-uk-business-2026` — AI Agents для UK бізнесу 2026
  - `ml-for-uk-recruitment-hr` — ML в UK рекрутингу (Equality Act, ICO)
  - `llm-fine-tuning-vs-rag-guide` — Fine-tuning vs RAG вибір архітектури
  - `ml-for-uk-wealth-management` — ML в UK wealth management
  - `ml-model-interpretability-uk-regulated` — Інтерпретованість ML в регульованих галузях UK

---

## Sprint 31 — Glossary +5 (2026-06-24, ✅ DONE commit 9bdffcb)

### Виконано
- **`glossary.ts`** — +5 нових термінів (10 вже існували):
  - `differential-privacy` — epsilon, Apple/Google telemetry, NHS ONS, TF Privacy
  - `automl` — H2O.ai/DataRobot/Azure AutoML, FCA explainability
  - `knowledge-graph` — Neo4j/RDF/SPARQL, NHS clinical KG, UK legal AI
  - `natural-language-generation` — FCA Consumer Duty, UK e-commerce automation
  - `recommender-system` — collaborative filtering, ASOS/BBC/Spotify, FCA fairness

---

## Sprint 32 — Compare +5 (2026-06-24, ✅ DONE commit f6dd018)

### Виконано
- **`compare.ts`** — +5 нових порівнянь:
  - `vs-sagemaker-managed` — AWS SageMaker
  - `vs-vertex-ai-platform` — Google Vertex AI
  - `vs-accenture-ai` — Accenture Applied Intelligence
  - `vs-palantir-aip` — Palantir Foundry/AIP
  - `vs-deloitte-ai` — Deloitte AI & Data

---

## Sprint 33 — Portfolio +5 (2026-06-24, ✅ DONE commit 2678003)

### Виконано
- **`portfolio.ts`** — +5 UK ML кейсів:
  - `uk-legaltech-contract-nlp` — LexScan M&A NLP, £52K/14 тижні
  - `uk-wealth-mgmt-portfolio-ml` — AlphaBalance Portfolio ML, £78K/18 тижнів
  - `uk-recruitment-platform-ml` — FairHire Bias-Aware ML, £58K/16 тижнів
  - `uk-agritech-precision-farming-ml` — YieldSense VRA, £65K/20 тижнів
  - `uk-fintech-ueba-ml` — SentinelEdge UEBA Fraud, £88K/22 тижні

---

## Sprint 34 — mlNiches +2 (2026-06-24, ✅ DONE commit 33d29e6)

### Виконано
- **`mlNiches.ts`** — +2 нові ML ніші:
  - `legal-tech` — 3 пакети £14k/£38k/£72k, SRA compliance, LegalBERT
  - `agritech-precision-farming` — 3 пакети £12k/£32k/£58k, ELMS/DEFRA, Sentinel-2

---

## Sprint 35 — Use Cases +8 (2026-06-24, ✅ DONE commit 7d9e68a)

### Виконано
- **`useCases.ts`** — +8 ML use cases (14 → 22):
  - `ma-due-diligence-automation` — Legal Tech NLP
  - `variable-rate-application-agritech` — AgriTech VRA
  - `ml-portfolio-optimisation-wealth` — Wealth Management ML
  - `nhs-dna-prediction` — NHS non-attendance prediction
  - `ecommerce-personalised-recommendations` — UK e-commerce ML
  - `ueba-insider-threat-detection` — Cybersecurity UEBA
  - `saas-churn-prediction-prevention` — SaaS churn ML
  - `food-manufacturing-predictive-maintenance` — Manufacturing IoT ML

---

## Sprint 36 — Resources +8 (2026-06-24, ✅ DONE commit 54d078f)

### Виконано
- **`resources.ts`** — +8 нових ресурсів (32 → 40):
  - `uk-ml-procurement-guide` — закупівля ML для UK бізнесу
  - `fca-ml-compliance-checklist` — FCA/PRA/Consumer Duty чекліст
  - `ml-roi-framework-uk` — ROI framework для UK CFO
  - `mlops-maturity-model-uk` — MLOps зрілість Level 0–5
  - `uk-ai-regulation-2026` — UK AI регулювання 2026
  - `ml-data-preparation-guide` — підготовка даних для ML
  - `hiring-ml-talent-uk` — наймання ML у UK £55K-£120K
  - `python-ml-stack-2026` — Python ML бібліотеки 2026

---

## Sprint 37 — mlNiches +2 (2026-06-24, ✅ DONE commit 2b966d0)

### Виконано
- **`mlNiches.ts`** — +2 нові ML ніші (20 → 22):
  - `wealth-management` — 3 пакети £16k/£42k/£85k, FCA Consumer Duty, Black-Litterman+HMM
  - `hospitality` — 3 пакети £10k/£28k/£52k, RevPAR optimisation, PMS integrations

---

## Що ще потрібно зробити (Backlog)

### Service pages
- ✅ Всі 7 service pages реалізовані через динамічний `/services/[slug]` + services.ts data

### Блог — Topic clusters
- ✅ `ml-governance-uk-2026` — Sprint 25
- ✅ `openai-fine-tuning-guide-uk` — Sprint 25
- ✅ `ml-testing-validation-uk` — Sprint 25
- ✅ `transformers-explained-uk` — Sprint 25
- ✅ `time-series-forecasting-uk` — Sprint 25
- ✅ `ml-for-uk-legal-tech` — Sprint 30
- ✅ `llm-fine-tuning-vs-rag-guide` — Sprint 30
- ✅ `ml-model-interpretability-uk-regulated` — Sprint 30
- ✅ `ai-agents-uk-business-2026` — Sprint 30

### Глосарій
- ✅ Insurance терміни (Sprint 20)
- ✅ Energy терміни (Sprint 20)
- ✅ Private Equity терміни (Sprint 20)
- ✅ Education терміни (Sprint 20)
- ✅ Regulatory AI: uk-ai-white-paper, eu-ai-act-uk-impact, algorithmic-accountability (Sprint 24)
- ✅ MLOps advanced: feature-drift, model-registry, shadow-mode-deployment (Sprint 24)
- ✅ LLM: few-shot-prompting, context-window, prompt-injection, guardrails-llm (Sprint 24)
- ✅ differential-privacy, automl, knowledge-graph, nlg, recommender-system (Sprint 31)

### ML Niches (mlNiches.ts — 22 ніші)
- ✅ banking, healthcare, retail, manufacturing, logistics, energy, real-estate, saas, agritech, cybersecurity
- ✅ insurance (Sprint 21), education (Sprint 23), private-equity (Sprint 23)
- ✅ legal-tech (Sprint 34), agritech-precision-farming (Sprint 34)
- ✅ wealth-management (Sprint 37), hospitality (Sprint 37)

### Інфраструктура (залишається)
- [ ] FAQPage schema.org JSON-LD на нішевих сторінках `/ml/[slug]` та `/ai/[slug]`
- [ ] OG images для blog posts (програматичні через /og/ route або static fallback)
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
