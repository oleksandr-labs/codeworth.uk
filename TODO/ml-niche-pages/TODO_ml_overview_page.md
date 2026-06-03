 ML Solutions — Overview Page

**URL:** `/en/ml` | `/uk/ml`
**H1 EN:** "Machine Learning Solutions by Industry"
**H1 UK:** "ML-рішення для бізнесу по галузях"
**Статус:** ✅ Реалізовано
**Пріоритет:** 🔴 Критичний — хаб для 10 ML нішевих сторінок

---

> ⚠️ **Незакреслені пункти ([ ]) — Phase 2/3:** OG-зображення потребують дизайнера/скрипту; layout-файли та relatedNichePage — Phase 3 (перелінковка між секціями).


## Призначення

`/en/ml` — ML Hub. Збирає link equity від `/services/machine-learning` і розподіляє на 10 нішевих сторінок. Без неї нішеві ML-сторінки — orphan pages.

**Різниця від `/ai`:** ML Hub позиціонується на ROI-мову: "Your data is already there. ML makes it work."

---

## Структура сторінки

### Hero
- **H1:** "Machine Learning Solutions by Industry"
- **Subhead:** Custom ML models that turn your existing data into measurable ROI — from fraud prevention to crop yield prediction.
- **CTA:** "Explore ML for Your Industry" + "Get a Free Data Audit"
- **Stats strip:** 20+ ML models deployed | 10 industries | avg ROI in 4 months

### "Your Data Is Already There" блок
Коротка секція що знімає головний страх клієнта:
> Most businesses already have the data ML needs. The question isn't whether you have enough data — it's whether you're using it.

### Industry Grid (10 карток)

| Ніша | ML-задача | Ключова метрика | URL |
|------|----------|-----------------|-----|
| Banking & FinTech | Fraud detection | False positives −81% | /ml/banking |
| Retail & E-commerce | Demand forecasting | Accuracy 94.7% | /ml/retail |
| SaaS | Churn prediction | Churn −31% | /ml/saas |
| Logistics | Supply chain ML | Fill rate +6.2 pp | /ml/logistics |
| Manufacturing | Predictive maintenance | Downtime −73% | /ml/manufacturing |
| AgriTech | Crop yield ML | Forecast ±6.3% | /ml/agritech |
| Cybersecurity | Anomaly detection | Response 6h→180ms | /ml/cybersecurity |
| Real Estate | AVM valuation | MAPE 4.2% | /ml/real-estate |
| Healthcare | Patient risk scoring | — | /ml/healthcare |
| Energy | Consumption forecast | Bills −23% | /ml/energy |

### ML Process (4 кроки)
1. **Data Audit** — перевіряємо ваші дані (якість, обсяг, доступність)
2. **Model Development** — навчаємо та валідуємо ML-модель
3. **Integration & Deploy** — API, MLOps, автоматизація
4. **Monitor & Retrain** — drift detection, регулярне перенавчання

### ROI Calculator блок (або секція з ROI-метриками)
"What ROI can you expect from ML?"
- Fraud Detection: збережено до $2.1M за 6 міс (FraudShield)
- Demand Forecasting: знижено залишки на 31%, дефіцит −47%
- Churn Prediction: збережено $340K MRR/рік (RetainIQ)

### "AI vs ML — What's the Difference?" (коротко)
- AI = ready-made intelligence (chatbots, RAG, computer vision)
- ML = custom models trained on YOUR data
- → "Looking for AI chatbots? [View AI Solutions →](/ai)"

### Featured Cases (3 кейси)
- FraudShield — Banking | False positives −81%
- StockSense — Retail | Залишки −31%, дефіцит −47%
- MachineGuard — Manufacturing | Простої −73%

---

## SEO технічне

```tsx
title: "Machine Learning Solutions | ML by Industry — CodeNest"
description: "Custom ML models for banking, retail, SaaS, logistics, manufacturing and more. Fraud detection, demand forecasting, churn prediction. From £4,000. UK & Ukraine."

// Schema.org
CollectionPage: {
  name: "Machine Learning Solutions by Industry",
  hasPart: [10 Service items]
}
BreadcrumbList: Home → ML Solutions
```

### hreflang
```html
<link rel="alternate" hreflang="en" href="https://codenest.com.ua/en/ml" />
<link rel="alternate" hreflang="uk" href="https://codenest.com.ua/uk/ml" />
```

---

## UK версія (₴)

- Stats: від 160 000 ₴, 10 галузей, ROI за 4 місяці
- Industry grid — ті самі метрики, ціни в ₴
- "Отримайте безкоштовний аудит даних"

---

## Перелінковка

- `/services/machine-learning` → "ML for your industry" → `/ml` (overview)
- `/ai` overview → "Need a custom ML model?" → `/ml` (cross-link внизу)
- Footer: секція "ML Solutions" → `/ml` + топ-5 ніш
- Header mega-menu: "ML Solutions" окремий розділ

---

## TODO розробка

- [x] `src/data/mlOverview.ts` — ✅ дані в `src/lib/data/mlNiches.ts` (ML_NICHES array)
- [x] `src/app/[lang]/ml/page.tsx` — ✅ реалізовано (SSG, generateMetadata, buildAlternates)
- [ ] ⚠️ Не потрібно: кожна `/ml/*` сторінка вже містить власні Header/Footer + повну metadata. Окремий layout додав би дублювання. Залишаємо як no-op (Phase 3 якщо знадобиться shared sub-navigation)
- [x] Додати до `src/app/sitemap.ts` — ✅ `/en/ml` + `/uk/ml` + всі 10 ніш
- [x] Додати до header mega-menu: секція "ML Solutions" — ✅ є в Header.tsx
- [x] Додати до footer: колонка "ML Solutions" — ✅ є в Footer.tsx
- [ ] OG image: `/og/ml/index.png` — потрібен дизайнер/скрипт
- [x] Hreflang alternate links — ✅ buildAlternates(lang, "/ml") у page.tsx
- [x] Cross-link: `/ai` ↔ `/ml` взаємні посилання — ✅ додано секцію "Cross-link to ML" в ai/page.tsx і "Cross-link to AI" в ml/page.tsx
- [x] Internal link: `/services/machine-learning` → `/ml` CTA блок — ✅ є в services/[slug]/page.tsx
