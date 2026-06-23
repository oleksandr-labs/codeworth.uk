# TODO: /services/mlops — MLOps & Model Deployment

**Статус:** ❌ СТОРІНКА НЕ ІСНУЄ (створити!)
**Пріоритет:** 🔴 Критичний (Tier 1 money page)
**Primary KW:** `MLOps services UK`
**Secondary KW:** `ML model deployment UK`, `ML pipeline automation UK`, `model monitoring service UK`
**Цільова довжина:** 1500–2000 слів
**Schema:** `Service` + `FAQPage` + `BreadcrumbList`

---

## Чому ця сторінка потрібна
- MLOps — топ-50 fastest-growing B2B SaaS keywords (2024)
- "MLOps services" — конкуренція відносно низька для UK geo
- Прив'язка до £800/mo MLOps Retainer (найвищий LTV продукт)

---

## Структура сторінки

### 1. Hero Section
- H1: `MLOps Services UK — From Prototype to Production`
- Підзаголовок: "Most ML models never reach production. We bridge the gap — building automated pipelines, monitoring systems, and retraining schedules that keep your models accurate over time."
- CTA: "Start MLOps Consultation" → /contact
- Badges: "Model Monitoring", "CI/CD for ML", "Drift Detection", "Auto-Retraining"

### 2. What We Do
- **ML Pipeline Automation** — end-to-end orchestration (Prefect, Airflow, ZenML)
- **Model Serving** — FastAPI endpoints, BentoML, Seldon, Triton Inference Server
- **Model Monitoring** — data drift detection, concept drift alerts, performance dashboards
- **Auto-Retraining Pipelines** — triggered retraining on drift or schedule
- **A/B Testing for Models** — shadow deployment, champion-challenger testing
- **MLflow / W&B Integration** — experiment tracking, model registry, versioning

### 3. Why MLOps Matters (SEO-friendly section)
Stats to include:
- "87% of ML projects never reach production" (Gartner)
- "Models degrade 10–15% accuracy over 6 months without monitoring" (industry avg)
- "Average cost of a model failure in production: £50K–£500K"

### 4. MLOps Retainer Package
- £800/mo / ₴32,000/mo
- Includes: monthly model audit, drift alerts, 4h SLA, retraining on demand
- Link to /pricing

### 5. Tech Stack
- Orchestration: Prefect, Apache Airflow, ZenML
- Serving: BentoML, FastAPI, Seldon Core
- Monitoring: Evidently AI, Grafana, Prometheus
- Tracking: MLflow, Weights & Biases
- CI/CD: GitHub Actions + Docker + Kubernetes

### 6. FAQ — 7 питань
1. "What is MLOps and why does my business need it?"
2. "How is MLOps different from DevOps?"
3. "How do I know if my ML model needs retraining?"
4. "What is model drift and how do you detect it?"
5. "How much do MLOps services cost in the UK?"
6. "Can you set up MLOps for an existing ML model?"
7. "What MLOps tools do you use?"

---

## SEO Чеклист
- [ ] Primary KW у H1
- [ ] Meta description: "MLOps services UK — model monitoring, CI/CD pipelines, drift detection. From £800/mo retainer. Get a free consultation."
- [ ] `Service` schema з `offers` (MLOps Retainer offer)
- [ ] `FAQPage` schema
- [ ] Internal links: → /services/machine-learning, → /pricing (MLOps retainer row), → /blog/what-is-mlops (коли з'явиться), → /contact
- [ ] Outbound: MLflow docs або Evidently AI (авторитет)
- [ ] hreflang: en + uk

---

## UK-версія
- H1: `MLOps-сервіси для ML-команд та бізнесу`
- URL: `/uk/services/mlops`
- Фокус: виробничий деплой ML, автоматичне перетренування, SLA-моніторинг

---

## Зв'язані файли
- `src/lib/data/services.ts` — додати `mlops` slug (вже є нішевий mlops у нікеях — НЕ плутати!)
- `src/components/pricing/PriceCalculator.tsx` — вже є MLOps як feature add-on
- `src/app/og/services/[slug]/route.tsx` — вже є `mlops` config (перевірити!)
