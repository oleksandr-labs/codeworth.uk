# ML Портфоліо — Стратегія та Roadmap

**Статус:** ✅ Реалізовано — 2026-05-02: всі 5 кейсів є в portfolio.ts (ml-fraud-detection-fca, ml-supply-chain-fmcg, ml-property-valuation, ml-harvest-precision-agriculture, ml-support-triage-bert). Pending: `ml-patient-risk-scoring` (Healthcare) + поля relatedMLNichePage/industry
**Мета:** Кожна з 10 ML-нішевих сторінок покрита щонайменше 1 кейсом з реальними метриками

---

## Поточний стан ML-портфоліо (є в portfolio.ts)

| Slug | Назва | Ніша | ML-нішева сторінка |
|------|-------|------|--------------------|
| `ml-churn-predictor` | RetainIQ | SaaS | /ml/saas |
| `fraud-detection-fintech` | FraudShield | Banking | /ml/banking |
| `demand-forecast-retail` | StockSense | Retail | /ml/retail |
| `reco-engine-ecom` | PersonaCart | Retail/E-com | /ml/retail |
| `ai-predictive-maintenance` | MachineGuard | Manufacturing | /ml/manufacturing |
| `ml-customer-segmentation` | SegmentIQ | Retail | /ml/retail |
| `ml-credit-scoring` | CreditIQ | Banking | /ml/banking |
| `ml-insurance-document-ocr` | DocAI Insurance | Banking/Insurance | /ml/banking |
| `ml-energy-forecasting` | EnergyIQ | Energy | /ml/energy |

---

## Нові ML-кейси для додавання (з TODO_machine_learning.md)

> **Аудит 2026-05-02:** Більшість кейсів вже є в portfolio.ts але з іншими slug'ами.
> Потрібно додати поля `relatedMLNichePage` і `industry` до існуючих записів.

| Плановий slug | Фактичний slug в portfolio.ts | Назва | Ніша | Blog | Статус |
|---------------|-------------------------------|-------|------|------|--------|
| `ml-anomaly-detection` | `ml-fraud-detection-fca` | GuardAI | Banking + Cybersecurity | `ml-fraud-anomaly-detection-fca` ✅ | ✅ Є в portfolio (різний slug) |
| `ml-supply-chain-optimizer` | `ml-supply-chain-fmcg` | SupplyIQ | Logistics | `ml-supply-chain-optimization` ✅ | ✅ Є в portfolio (різний slug) |
| `ml-property-valuation` | `ml-property-valuation` | EstateIQ | Real Estate | `ml-property-valuation-avm` ✅ | ✅ Є в portfolio |
| `ml-crop-yield` | `ml-harvest-precision-agriculture` | HarvestIQ | AgriTech | `ml-precision-agriculture-ndvi` ✅ | ✅ Є в portfolio (різний slug) |
| `ml-nlp-support-triage` | `ml-support-triage-bert` | TriageAI | SaaS | `ml-nlp-support-automation` ✅ | ✅ Є в portfolio (різний slug) |

---

## Нові ML-кейси потрібні (ніші без ML-покриття)

| Slug (пропозиція) | Назва | Ніша | Статус |
|-------------------|-------|------|--------|
| `ml-patient-risk-scoring` | ClinicalIQ | Healthcare | ✅ Реалізовано (2026-05-02) |

---

## Карта покриття після виконання

| ML-нішева сторінка | Кейси (existing) | Кейси (planned) |
|--------------------|-----------------|-----------------|
| /ml/banking | fraud-detection, ml-credit-scoring | ml-anomaly-detection |
| /ml/retail | demand-forecast, reco-engine, ml-customer-segmentation | — |
| /ml/saas | ml-churn-predictor | ml-nlp-support-triage |
| /ml/logistics | ml-supply-chain-fmcg ✅ | — |
| /ml/manufacturing | ai-predictive-maintenance | — |
| /ml/agritech | — | ml-crop-yield |
| /ml/cybersecurity | — | ml-anomaly-detection |
| /ml/real-estate | — | ml-property-valuation |
| /ml/healthcare | — | ml-patient-risk-scoring (новий) |
| /ml/energy | ml-energy-forecasting | — |

---

## Спільні кейси між AI та ML нішами

Деякі кейси можна перелінкувати на обидва розділи:

| Кейс | AI-сторінка | ML-сторінка |
|------|-------------|-------------|
| FraudShield | /ai/fintech | /ml/banking |
| MedAssist | /ai/healthcare | /ml/healthcare |
| EstateIQ (ML AVM) | /ai/real-estate | /ml/real-estate |
| QualityEye (CV) | /ai/manufacturing | /ml/manufacturing |
| TalentScan (Resume AI) | /ai/hr | /ml/saas (scoring) |

---

## Суміжний план: репозиціонування портфоліо

> **Cross-reference:** [TODO_repositioning_portfolio_products.md](../TODO_repositioning_portfolio_products.md) описує глобальне репозиціонування портфоліо як "готові продукти з ціною".
> Поля `priceFrom`, `deliveryDays`, `packageIncludes`, `marketplaceSlug` з того файлу **та**
> поля `industry`, `relatedMLNichePage`, `dataRequirements`, `roiTimeframe` з цього файлу — **усі йдуть в одну зміну типу `PortfolioCase`**.
> Координувати разом щоб уникнути дублювання PR.

## Технічні зміни в portfolio.ts

Додати нові поля до типу `PortfolioCase`:

```ts
interface PortfolioCase {
  // існуючі поля...
  industry?: string          // "banking" | "retail" | "saas" | "logistics" | ...
  relatedAINichePage?: string  // "/ai/healthcare"
  relatedMLNichePage?: string  // "/ml/healthcare"
  dataRequirements?: string   // "12 months of transactions"
  roiTimeframe?: string      // "ROI in 4 months"
}
```

- [x] Оновити тип `PortfolioCase` в `portfolio.ts` — ✅ додано `industry?`, `relatedAINichePage?`, `relatedMLNichePage?`
- [x] Додати поле `industry` до ключових AI/ML кейсів — ✅ 10 кейсів оновлено (2026-05-03)
- [x] Додати фільтр по industry на `/portfolio` — ✅ реалізовано (2026-05-04): `PortfolioContent.tsx`
- [x] Рендерити `relatedMLNichePage` як CTA на сторінці кейсу — ✅ вже реалізовано в `portfolio/[slug]/page.tsx` (lines 692-703)

---

## Blog posts для ML-кейсів

- [x] ~~`ml-fraud-anomaly-detection-fca`~~ — ✅ Реалізовано (blog.ts)
- [x] ~~`ml-supply-chain-optimization`~~ — ✅ Реалізовано (blog.ts)
- [x] ~~`ml-property-valuation-avm`~~ — ✅ Реалізовано (blog.ts)
- [x] ~~`ml-precision-agriculture-ndvi`~~ — ✅ Реалізовано (blog.ts)
- [x] ~~`ml-nlp-support-automation`~~ — ✅ Реалізовано (blog.ts, slug: `ml-nlp-support-automation`)
- [x] ~~`ml-patient-risk-scoring`~~ — ✅ Реалізовано (blog.ts, 2026-05-02)

---

## TODO пріоритетний список

- [x] ~~Додати кейси GuardAI, EstateIQ, HarvestIQ, TriageAI до portfolio.ts~~ — ✅ Є але з іншими slug'ами (`ml-fraud-detection-fca`, `ml-property-valuation`, `ml-harvest-precision-agriculture`, `ml-support-triage-bert`)
- [x] ~~Додати `ml-supply-chain-optimizer`~~ — ✅ Є в portfolio.ts як `ml-supply-chain-fmcg`
- [x] ~~Створити новий кейс `ml-patient-risk-scoring` (Healthcare ML)~~ — ✅ Реалізовано (2026-05-02)
- [x] Додати поля `industry` + `relatedMLNichePage` до існуючих portfolio.ts записів — ✅ додано до всіх ключових AI/ML кейсів (2026-05-03)
- [x] Фільтр по industry на `/portfolio` сторінці — ✅ реалізовано (2026-05-04)
- [x] Cross-links з кейсів на ML-нішеві сторінки — ✅ реалізовано (2026-05-03): sidebar на /portfolio/[slug] показує `relatedAINichePage` та `relatedMLNichePage` як CTA-посилання (фіолетовий/синій блок з BrainCircuit іконкою)
