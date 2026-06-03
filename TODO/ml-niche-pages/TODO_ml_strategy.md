 ML Нішеві посадкові сторінки — Стратегія

**Концепція:** ML-сторінки = окремий keyword cluster від AI. Тут не чат-боти — тут кастомні моделі, предиктивна аналітика, оптимізація. Аудиторія: CTO, Head of Data, аналітики, CFO.

**Статус:** ✅ Реалізовано — 10 ML нішевих сторінок + хаб `/ml` побудовані відповідно до цієї стратегії
**Пріоритет:** Дуже високий — ML = вищий чек, довші контракти, B2B/Enterprise

---

> ⚠️ **Незакреслені пункти ([ ]) — Phase 2/3:** OG-зображення потребують дизайнера/скрипту; layout-файли та relatedNichePage — Phase 3 (перелінковка між секціями).


## Різниця AI vs ML ніші (важливо для SEO)

| AI нішеві сторінки (`/ai/[niche]`) | ML нішеві сторінки (`/ml/[niche]`) |
|-------------------------------------|--------------------------------------|
| GPT-боти, RAG, NLP, Computer Vision | Кастомні моделі, прогнозна аналітика |
| Швидко: 2–6 тижнів | Довго: 4–16 тижнів |
| SMB + Enterprise | Enterprise + B2B |
| "AI чат-бот для X" | "machine learning для X" |
| Продукт-орієнтовано | Дата-орієнтовано |
| від £1,500 | від £5,000 |

---

## Архітектура URL

```
/en/ml/saas              — ML для SaaS: churn, LTV, usage analytics
/en/ml/retail            — ML для ритейлу: demand forecast, dynamic pricing
/en/ml/logistics         — ML для логістики: supply chain, маршрутизація
/en/ml/banking           — ML для банків: credit scoring, fraud, AML
/en/ml/manufacturing     — ML для виробництва: predictive maintenance
/en/ml/agritech          — ML для агросектору: врожайність, NDVI (УНІКАЛЬНО!)
/en/ml/cybersecurity     — ML для кібербезпеки: anomaly detection
/en/ml/energy            — ML для енергетики: прогноз споживання
/en/ml/healthcare        — ML для медицини: класифікація, ризик-скоринг
/en/ml/real-estate       — ML для нерухомості: AVM, оцінка вартості
```

Відповідні UK-дзеркала: `/uk/ml/[niche]`

---

## SEO-логіка

ML-сторінки цілять у технічніші ключі:
- `"machine learning for [industry]"` / `"ML model for [niche]"`
- `"predictive analytics [industry] UK"` / `"ML [niche] development"`
- `"[industry] data science services"` / `"custom ML model [niche]"`
- Long-tail: `"how machine learning helps [niche] reduce costs"`, `"churn prediction model SaaS"`

---

## Структура кожної ML нішевої сторінки

```
Hero             — H1 з ML-ключем, проблема ніші з цифрами, CTA
DataProblem      — "У вас є дані — але чи ви ними користуєтесь?" (3 болі)
MLSolutions      — конкретні ML-завдання для ніші (4–6 рішень)
HowItWorks       — коротко: дані → Feature Eng → Модель → API → ROI
CaseStudy        — 1–2 кейси з портфоліо (метрики обов'язкові)
TechStack        — стек, релевантний для ніші
ROICalculator    — "Скільки заощадить ML для вашого бізнесу?" (інтерактивно)
Packages         — 3 пакети з цінами
Faq              — 5–7 питань: дані, строки, результат, GDPR
CrossLinks       — AI нішева сторінка + ML service + portfolio
CTA              — форма або Telegram
```

---

## Schema.org

- `Service` з `serviceType: "Machine Learning Development"`, `areaServed`
- `FAQPage`
- `BreadcrumbList`: Home → ML Solutions → [Niche]
- `Dataset` або `SoftwareApplication` для ML-моделей у marketplace
- `QuantitativeValue` для метрик результатів у кейсах

---

## Внутрішня перелінковка

```
/services/machine-learning  →  всі /ml/[niche]  (секція "ML для вашої індустрії")
/services/artificial-intelligence → перехресне посилання де AI + ML разом
/portfolio/[ml-cases]       →  відповідна нішева ML-сторінка
/ai/[niche]                 →  /ml/[niche]  (CTA "Потрібна глибша ML-модель?")
/blog/[ml-posts]            →  відповідна ML-нішева сторінка
/niches/[niche]             →  /ml/[niche]  (CTA "ML для вашого бізнесу")
```

---

## Пріоритет розробки

> Фактичні slug'и з portfolio.ts та blog.ts (аудит 2026-05-02).

| Сторінка            | Пріоритет | Кейс у портфоліо (фактичний slug) | Blog post                       |
|---------------------|-----------|------------------------------------|---------------------------------|
| ml/banking          | 🔴 1      | `ml-fraud-detection-fca` ✅ + `ml-credit-scoring` ✅ | `ml-fraud-anomaly-detection-fca` ✅ |
| ml/retail           | 🔴 2      | `demand-forecast-retail` ✅ | `ml-demand-forecasting-retail` ✅ |
| ml/saas             | 🔴 3      | `ml-churn-predictor` ✅ | `ml-churn-prediction-guide` ✅  |
| ml/logistics        | 🟡 4      | `ml-supply-chain-fmcg` ✅ | `ml-supply-chain-optimization` ✅ |
| ml/manufacturing    | 🟡 5      | `ai-predictive-maintenance` ✅    | `mlops-production-guide` ✅     |
| ml/agritech         | 🟡 6      | `ml-harvest-precision-agriculture` ✅ | `ml-precision-agriculture-ndvi` ✅ |
| ml/cybersecurity    | 🟢 7      | `ml-fraud-detection-fca` ✅ (cross-link) | `ml-fraud-anomaly-detection-fca` ✅ |
| ml/real-estate      | 🟢 8      | `ml-property-valuation` ✅        | `ml-property-valuation-avm` ✅  |
| ml/healthcare       | 🟢 9      | `ml-patient-risk-scoring` ✅ (2026-05-02) | `ml-patient-risk-scoring` ✅ |
| ml/energy           | 🟢 10     | `ml-energy-forecasting` ✅        | `ml-energy-forecasting-guide` ✅ |

---

## Що відрізняє ML-сторінки від AI-сторінок

На кожній ML-сторінці обов'язково:
1. **"Які дані потрібні"** секція — клієнт боїться "у мене немає даних"
2. **ROI-калькулятор або ROI-секція** — ML коштує дорожче, треба обґрунтувати
3. **"Як виглядає процес"** — дата-аудит → пайплайн → валідація → деплой → MLOps
4. **XAI / Explainability** — "чому модель так вирішила" (GDPR + FCA вимога)
5. **Мінімальні вимоги до датасету** — "мінімум 1 000 записів для класифікації"

---

## Файли для розробки

- [ ] ⚠️ Не потрібно: кожна `/ml/*` сторінка вже містить власні Header/Footer + повну metadata. Окремий layout додав би дублювання. Залишаємо як no-op (Phase 3 якщо знадобиться shared sub-navigation)
- [x] ~~`src/app/[lang]/ml/page.tsx`~~ — ✅ Реалізовано (overview з CollectionPage schema, generateMetadata)
- [x] ~~`src/app/[lang]/ml/[niche]/page.tsx`~~ — ✅ Реалізовано (generateStaticParams, generateMetadata, full page)
- [x] ~~`src/lib/data/mlNiches.ts`~~ — ✅ Реалізовано (10 ML ніш)
- [x] ~~`src/lib/types/niches.ts`~~ — ✅ Реалізовано (MLNicheData з dataRequirements, roiMetrics, minDatasetSize)
- [x] ~~Редиректи в `next.config.ts`~~ — ✅ Сервіси вже є окремими: `artificial-intelligence` + `machine-learning`

---

## Посилання на окремі TODO

- [Banking & FinTech ML](TODO_ml_banking.md)
- [Retail ML](TODO_ml_retail.md)
- [SaaS ML](TODO_ml_saas.md)
- [Logistics ML](TODO_ml_logistics.md)
- [Manufacturing ML](TODO_ml_manufacturing.md)
- [AgriTech ML](TODO_ml_agritech.md)
- [Cybersecurity ML](TODO_ml_cybersecurity.md)
- [Real Estate ML](TODO_ml_realestate.md)
- [Healthcare ML](TODO_ml_healthcare.md)
- [Energy ML](TODO_ml_energy.md)
- [ML Портфоліо стратегія](TODO_ml_portfolio_strategy.md)
