 AI/ML Нішеві сторінки — Нові терміни глосарію

**Призначення:** Розширення `/glossary` новими термінами що підтримують SEO AI/ML нішевих сторінок.
**Поточний стан глосарію:** 146 термінів, 7 категорій (оновлено 2026-05-02)
**Статус:** ✅ Дві хвилі додавання завершено. Залишились Logistics/Healthcare/SaaS специфічні терміни.
**Файл даних:** `src/lib/data/glossary.ts`

---

> ⚠️ **Незакреслені пункти ([ ]) — Phase 2/3:** OG-зображення потребують дизайнера/скрипту; layout-файли та relatedNichePage — Phase 3 (перелінковка між секціями).


## Нові терміни — Категорія "AI / Machine Learning" (нова або розширена)

### Базові AI/ML терміни (загальні)

| Термін | EN slug | UK slug | Пов'язана нішева сторінка | Статус |
|--------|---------|---------|--------------------------|--------|
| RAG (Retrieval-Augmented Generation) | `rag` | `rag` | /ai/healthcare, /ai/legal, /ai/hospitality | ✅ В glossary.ts |
| LLM (Large Language Model) | `llm` | `llm` | /services/artificial-intelligence | ✅ В glossary.ts |
| Prompt Engineering | `prompt-engineering` | `prompt-engineering` | /services/artificial-intelligence | ✅ В glossary.ts |
| Fine-tuning | `fine-tuning` | `fine-tuning` | /services/machine-learning | ✅ В glossary.ts |
| Hallucination (AI) | `ai-hallucination` | `ai-hallucination` | /ai/healthcare, /ai/legal | ✅ В glossary.ts |
| Embeddings | `embeddings` | `embeddings` | /services/artificial-intelligence | ✅ В glossary.ts |
| Vector Database | `vector-database` | `vector-database` | /services/artificial-intelligence | ✅ В glossary.ts |
| Transformer | `transformer-model` | `transformer-model` | /services/artificial-intelligence | ✅ В glossary.ts |
| Generative AI | `generative-ai` | `generative-ai` | /ai/marketing | ✅ В glossary.ts |
| XAI / Explainable AI | `explainable-ai` | `explainable-ai` | /ml/banking, /ml/healthcare | ✅ В glossary.ts |
| SHAP (SHapley Additive exPlanations) | `shap` | `shap` | /ml/banking, /ml/real-estate | ✅ В glossary.ts |
| Model Drift | `model-drift` | `model-drift` | /services/machine-learning | ✅ В glossary.ts |
| MLOps | `mlops` | `mlops` | /services/machine-learning | ✅ В glossary.ts |

---

### Терміни для /ai/healthcare та /ml/healthcare

| Термін | Визначення (коротко) | Статус |
|--------|---------------------|--------|
| FHIR R4 | Fast Healthcare Interoperability Resources — стандарт обміну медичними даними | ✅ В glossary.ts |
| HL7 | Health Level 7 — протокол інтеграції медичних систем | ✅ В glossary.ts (slug: hl7) |
| Clinical NLP | NLP адаптований для медичної термінології | ✅ В glossary.ts (slug: clinical-nlp) |
| SNOMED CT | Медична онтологія для стандартизації діагнозів | ✅ В glossary.ts (slug: snomed-ct) |
| Patient Risk Scoring | ML-модель що присвоює пацієнту ризик ускладнень | ✅ В glossary.ts (slug: patient-risk-scoring) |
| Readmission Risk | Ймовірність повторної госпіталізації протягом 30 днів | ✅ В glossary.ts (slug: readmission-risk) |

---

### Терміни для /ml/banking та /ai/fintech

| Термін | Визначення (коротко) | Статус |
|--------|---------------------|--------|
| AML (Anti-Money Laundering) | Заходи проти відмивання грошей — включно з ML-моніторингом | ✅ В glossary.ts |
| FCA (Financial Conduct Authority) | Регулятор фінансових ринків Великобританії | ✅ В glossary.ts (slug: fca-compliance) |
| Making Tax Digital | UK урядова програма цифровізації податкової звітності | ✅ В glossary.ts (slug: mtd) |
| Credit Scoring | Числова оцінка кредитоспроможності позичальника | ✅ В glossary.ts |
| Open Banking | AISP/PISP, PSD2, thin-file scoring | ✅ В glossary.ts (slug: open-banking) |
| Alternative Data | Нетрадиційні дані для кредитного скорингу (поведінка, транзакції, геолокація) | ✅ В glossary.ts |
| CLIP (Visual Search) | OpenAI CLIP, 512-dim embeddings, Qdrant ANN | ✅ В glossary.ts |
| Isolation Forest | ML-алгоритм для виявлення аномалій без навчання на помічених даних | ✅ В glossary.ts (slug: isolation-forest) |
| LSTM Autoencoder | Архітектура нейромережі для виявлення аномалій у послідовностях | ✅ В glossary.ts (slug: lstm) |
| False Positive Rate | Відсоток помилкових спрацювань системи (напр. блокування справжніх клієнтів) | ✅ В glossary.ts (slug: false-positive-rate) |

---

### Терміни для /ml/retail та /ml/logistics

| Термін | Визначення (коротко) | Статус |
|--------|---------------------|--------|
| Demand Forecasting | ML-прогнозування майбутнього попиту на товари чи послуги | ✅ В glossary.ts |
| Dynamic Pricing | Автоматична зміна ціни залежно від попиту, конкурентів, часу | ✅ В glossary.ts |
| EOQ (Economic Order Quantity) | Оптимальний обсяг замовлення для мінімізації витрат зберігання | ✅ В glossary.ts (slug: eoq) |
| Safety Stock | Буферний запас для захисту від непередбачуваного попиту | ✅ В glossary.ts (slug: safety-stock) |
| Fill Rate | Відсоток замовлень виконаних повністю з наявного запасу | ✅ В glossary.ts (slug: fill-rate) |
| VRP (Vehicle Routing Problem) | Задача оптимізації маршрутів для парку транспортних засобів | ✅ В glossary.ts |
| OR-Tools | Бібліотека Google для вирішення задач оптимізації (VRP, планування) | ✅ В glossary.ts (в описі VRP) |
| MAPE (Mean Absolute Percentage Error) | Середня відсоткова похибка прогнозу | ✅ В glossary.ts |

---

### Терміни для /ml/saas

| Термін | Визначення (коротко) | Статус |
|--------|---------------------|--------|
| Churn Prediction | ML-модель що прогнозує відтік клієнтів до його настання | ✅ В glossary.ts |
| Customer Health Score | Агрегована оцінка стану клієнта (логіни, використання, підтримка) | ✅ В glossary.ts (slug: customer-health-score) |
| LTV (Lifetime Value) | Загальний дохід від клієнта за весь час взаємодії | ✅ В glossary.ts |
| MRR (Monthly Recurring Revenue) | Щомісячний регулярний дохід SaaS-компанії | ✅ В glossary.ts |
| Cohort Analysis | Аналіз поведінки групи клієнтів набраних в один час | ✅ В glossary.ts |
| UEBA | User and Entity Behavior Analytics — ML-аналіз поведінки для кібербезпеки | ✅ В glossary.ts |

---

### Терміни для /ml/agritech

| Термін | Визначення (коротко) | Статус |
|--------|---------------------|--------|
| NDVI (Normalized Difference Vegetation Index) | Індекс стану рослинності з супутникових знімків | ✅ В glossary.ts |
| Sentinel-2 | Супутник ESA що знімає поверхню Землі з роздільністю 10м кожні 5 днів | ✅ В glossary.ts |
| Precision Agriculture | Точне землеробство: диференційований підхід до кожної зони поля | ✅ В glossary.ts |
| Variable Rate Application | Диференційоване внесення добрив/пестицидів на основі ML-карти | ✅ В glossary.ts (slug: variable-rate-application) |
| Carbon Credits | Одиниці торгівлі вуглецевими викидами (UK ETS, ELMS scheme) | ✅ В glossary.ts |
| ELMS (Environmental Land Management) | Британська держпрограма субсидування екологічного землеробства | ✅ В glossary.ts (slug: elm-scheme) |

---

### Терміни для /ml/real-estate

| Термін | Визначення (коротко) | Статус |
|--------|---------------------|--------|
| AVM (Automated Valuation Model) | ML-модель автоматичної оцінки вартості нерухомості | ✅ В glossary.ts |
| MAPE (Mean Absolute Percentage Error) | Середня відсоткова похибка прогнозу (нижче = точніше) | ✅ В glossary.ts |
| GIS (Geographic Information System) | Геоінформаційна система — для просторового аналізу | ✅ В glossary.ts |
| PostGIS | Розширення PostgreSQL для геопросторових даних | ✅ В glossary.ts (в fullDescription GIS) |
| Comparable Sales (Comps) | Продажі аналогічної нерухомості для порівняльної оцінки | ✅ В glossary.ts (slug: comparable-sales) |
| Rental Yield | Відношення орендного доходу до вартості нерухомості | ✅ В glossary.ts (slug: rental-yield) |

---

### Терміни для /ml/manufacturing та /ai/manufacturing

| Термін | Визначення (коротко) | Статус |
|--------|---------------------|--------|
| Predictive Maintenance | ML-прогноз поломок обладнання до їх виникнення | ✅ В glossary.ts |
| OEE (Overall Equipment Effectiveness) | Ефективність обладнання: доступність × продуктивність × якість | ✅ В glossary.ts |
| Time Series | Послідовність даних з рівними часовими інтервалами (IoT, фінанси) | ✅ В glossary.ts |
| TimescaleDB | PostgreSQL-розширення для ефективного зберігання time-series даних | ✅ В glossary.ts |
| Edge Computing | Обчислення безпосередньо на пристрої (камера, датчик) без хмари | ✅ В glossary.ts |
| SCADA | Supervisory Control and Data Acquisition — промислові системи управління | ✅ В glossary.ts (slug: scada) |

---

### Терміни для /ml/cybersecurity

| Термін | Визначення (коротко) | Статус |
|--------|---------------------|--------|
| Anomaly Detection | ML-виявлення відхилень від нормальної поведінки системи | ✅ В glossary.ts |
| Behavioral Biometrics | Унікальні характеристики поведінки користувача (клавіатура, мишка, свайпи) | ✅ В glossary.ts (slug: behavioral-biometrics) |
| SIEM | Security Information and Event Management — централізована система безпеки | ✅ В glossary.ts |
| Geo-Jump | Аномалія: вхід з різних географічних точок за короткий час | ✅ В glossary.ts (slug: geo-jump) |
| Account Takeover (ATO) | Несанкціоноване захоплення облікового запису | ✅ В glossary.ts (slug: account-takeover) |

---

## Нові терміни — Категорія "Healthcare AI"

Додати нову підкатегорію або окрему категорію в глосарії:
- FHIR R4 ✅, HL7 ✅, SNOMED CT ✅, Clinical NLP ✅, RAG (Medical) ✅, Patient Risk Score ✅

---

## Нові терміни — Категорія "FinTech & Banking"

- AML ✅, FCA ✅, Making Tax Digital ✅, Credit Scoring ✅, Alternative Data ✅, SHAP ✅, False Positive Rate ✅

---

## Оновлення файлу glossary.ts

```ts
// Новий термін — приклад структури
{
  slug: "rag",
  term: "RAG (Retrieval-Augmented Generation)",
  termUk: "RAG (пошук з доповненням генерації)",
  category: "ai-ml",
  definition: "An AI architecture that grounds LLM responses in a specific knowledge base, eliminating hallucinations by retrieving relevant documents before generating an answer.",
  definitionUk: "Архітектура AI що прив'язує відповіді LLM до конкретної бази знань — усуває галюцинації, отримуючи релевантні документи перед генерацією відповіді.",
  relatedService: "artificial-intelligence",
  relatedNichePage: "/ai/healthcare",  // нове поле
  tags: ["AI", "LLM", "NLP", "RAG"],
}
```

---

## TODO

- ✅ Хвиля 1 (2026-05-02): shap, sentinel-2, precision-agriculture, elm-scheme, gis, mape, predictive-maintenance, oee, timescaledb, anomaly-detection, siem, open-banking, aml, clip, alternative-data
- ✅ Хвиля 2 (2026-05-02): embeddings, vector-database, fine-tuning, ai-hallucination, explainable-ai, model-drift, transformer-model, demand-forecasting, time-series, ueba, ltv, isolation-forest
- ✅ Розширено існуючу категорію `"ai"` (замість нової `"ai-ml"`)
- ✅ Хвиля 3 (2026-05-02): dynamic-pricing, mrr, vrp, cohort-analysis, edge-computing, carbon-credits
- ✅ Хвиля 4 (2026-05-02): hl7, clinical-nlp, snomed-ct, patient-risk-scoring, readmission-risk, false-positive-rate, eoq, safety-stock, fill-rate, or-tools, customer-health-score, behavioral-biometrics, geo-jump, account-takeover, scada, comparable-sales, rental-yield, variable-rate-application
- [x] Додати поле `relatedNichePage` до типу `GlossaryTerm` для перелінковки на нішеві сторінки — ✅ реалізовано (2026-05-04): додано optional поле `relatedNichePage?: string` в `glossary.ts`
- [x] Додати нові терміни до sitemap — ✅ автоматично генеруються з glossary.ts через `app/sitemap.ts`
- [x] Перевірити internal-links.test.ts після додавання нових термінів — ✅ tsc 0 errors, тести проходять
- [x] Кожна нішева сторінка `/ai/[niche]` і `/ml/[niche]` → блок "Glossary" з 3–5 ключовими термінами — ✅ реалізовано (2026-05-04): `getGlossaryTermsForNichePage()` в `nicheUtils.ts`; блок "Key terminology" в `ai/[niche]/page.tsx` та `ml/[niche]/page.tsx`; 56 термінів отримали `relatedNichePage` (healthcare/banking/agritech/manufacturing/cybersecurity/saas/retail/logistics/energy/real-estate)
