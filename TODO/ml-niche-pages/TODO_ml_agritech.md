 ML для агросектору (ML for Agriculture & AgriTech)

**URL:** `/en/ml/agritech` | `/uk/ml/agritech`
**H1 EN:** "Machine Learning for Agriculture & Precision Farming"
**H1 UK:** "ML для агробізнесу та точного землеробства"
**Статус:** ✅ Реалізовано (сторінка + дані)
**Пріоритет:** 🟡 6 — УНІКАЛЬНА НІША: жодна веб-студія-конкурент не має ML-кейсу в агро

---

> ⚠️ **Незакреслені пункти ([ ]) — Phase 2/3:** OG-зображення потребують дизайнера/скрипту; layout-файли та relatedNichePage — Phase 3 (перелінковка між секціями).


## Чому AgriTech ML = диференціація

- Україна = топ-5 аграрних країн світу → magnitude ринку
- UK AHDB (Agriculture and Horticulture Development Board) + DEFRA держпрограми субсидування precision farming
- Carbon credits (UK ETS, ELMS scheme) → нові монетизаційні можливості для клієнтів
- Жоден конкурент (web-студія) не має подібного кейсу → CodeNest виділяється

---

## Ключові слова

**EN (UK):** "precision agriculture ML UK", "crop yield prediction machine learning", "NDVI analysis AI", "AgriTech software development UK", "farm ML analytics", "carbon credits precision farming"
**UK:** "ML для сільського господарства", "прогноз врожайності ML", "точне землеробство штучний інтелект", "AgriTech Україна"

---

## Data Problem

1. Прогноз врожайності "на погоду та досвід" = похибка ±22% → не встигаємо з технікою
2. Хвороби культур виявляємо візуально — вже 20–30% поля уражено → збитки
3. Добрива вносимо рівномірно по всьому полю → перевитрата та шкода для ґрунту

---

## ML Рішення для AgriTech

- **Crop Yield Prediction ML** — LSTM на NDVI (супутник Sentinel-2) + погода + тип ґрунту
- **Disease Detection CV** — Computer Vision (YOLOv8) аналізує дрон-знімки: ранні ознаки хвороб
- **Variable Rate Application ML** — ML-карти диференційованого внесення добрив/пестицидів
- **Irrigation Optimization ML** — прогноз потреби у зрошенні за погодою та вологістю ґрунту
- **Market Price Forecasting** — ML-прогноз цін на зерно → оптимальний час продажу
- **Carbon Credit Calculator** — ML-оцінка секвестрації CO₂ для UK ETS / ELMS схем

---

## Case Studies

- **HarvestIQ** (portfolio/ml-crop-yield — планується)
  - Агрохолдинг, 28 000 га, Полтавська обл.
  - Точність прогнозу ±6.3% (vs ±22%), добрива −19%, збитки від хвороб −31%
  - Стек: LSTM, XGBoost, OpenCV, Sentinel-2 API, TimescaleDB, Mapbox

---

## Які дані потрібні

| ML-задача | Мінімум | Ідеально |
|-----------|---------|---------|
| Yield Prediction | 3+ сезони по полях | 5+ сезонів + агрохімія |
| Disease Detection | 2K дрон-знімків з розміткою | 10K+ по різних культурах |
| Market Forecast | 3 роки цінових даних | 10 років + кореляти |

---

## Tech Stack

- Супутники: Sentinel-2 API (ESA), Google Earth Engine
- Drone CV: YOLOv8, OpenCV, Roboflow для розмітки
- Time-Series: LSTM, Prophet, XGBoost
- GIS: GeoPandas, PostGIS, Mapbox GL
- Weather: Open-Meteo API, ERA5 (ECMWF)
- TimescaleDB для IoT/sensor time-series

---

## Пакети

| Пакет | EN | UK | Що входить |
|-------|----|----|-----------|
| Yield ML | from £6,000 | від 240 000 ₴ | LSTM + Sentinel-2 + дашборд по полях |
| Precision Farming | from £12,000 | від 480 000 ₴ | Yield + Disease CV + Variable Rate Maps |
| AgriTech Platform | from £22,000 | від 880 000 ₴ | Всі 6 модулів + Carbon Credits + MLOps |

---

## FAQ

1. Чи потрібен власний дрон або достатньо супутникових даних?
2. Які культури підтримує модель (зернові, соняшник, ріпак)?
3. Як ML враховує різні типи ґрунтів в межах одного поля?
4. Що таке UK ELMS scheme і як ML допомагає отримати субсидію?
5. Яка роздільна здатність супутникових знімків Sentinel-2?
6. Чи можна інтегрувати з агрономічним програмним забезпеченням (Trimble, John Deere Operations Center)?

---

## Cross-links

- → `/services/machine-learning`
- → `/ai/manufacturing` — "Computer Vision для контролю якості"
- → `/ml/logistics` — "ML для логістики збору та доставки"
- → `/ml/energy` — "ML для оптимізації споживання агро-підприємств"
- → `/blog/ml-precision-agriculture-ndvi`

---

## SEO

```tsx
title: "Machine Learning for Agriculture | Crop Yield ML, Precision Farming — CodeNest"
description: "AgriTech ML solutions: crop yield prediction ±6.3%, disease detection CV, variable rate application. UK ELMS compliance. From £6,000. UK & Ukraine."
```

## Blog
- ✅ `ml-precision-agriculture-ndvi` — додано до `blog.ts` (2026-05-02)
- [x] ~~`agritech-carbon-credits-ml`~~ — ✅ Реалізовано (blog.ts, 2026-05-02)
- [x] ~~`sentinel-2-crop-analysis`~~ — ✅ Реалізовано (blog.ts, 2026-05-02)

## TODO розробка
- [x] ~~`src/data/mlNiches/agritech.ts`~~ — ✅ Реалізовано (mlNiches.ts)
- [x] ~~`src/app/[lang]/ml/agritech/page.tsx`~~ — ✅ Реалізовано
- ✅ Додано `ml-harvest-precision-agriculture` (HarvestIQ) до `portfolio.ts` (2026-05-02)
- ✅ Нова нішева сторінка `/niches/agritech` реалізована в `niches.ts` (2026-05-02)
- [ ] OG image: `/og/ml/agritech.png` (поле + data overlay)
