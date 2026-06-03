 ML для логістики та supply chain (ML for Logistics & Supply Chain)

**URL:** `/en/ml/logistics` | `/uk/ml/logistics`
**H1 EN:** "Machine Learning for Logistics & Supply Chain Optimization"
**H1 UK:** "ML для логістики та оптимізації ланцюга поставок"
**Статус:** ✅ Реалізовано (сторінка + дані)
**Пріоритет:** 🟡 4

---

> ⚠️ **Незакреслені пункти ([ ]) — Phase 2/3:** OG-зображення потребують дизайнера/скрипту; layout-файли та relatedNichePage — Phase 3 (перелінковка між секціями).


## Ключові слова

**EN:** "machine learning logistics UK", "supply chain optimization ML", "route optimization AI", "demand forecasting supply chain", "ML inventory management"
**UK:** "машинне навчання логістика", "ML оптимізація маршрутів", "supply chain ML Україна"

---

## Data Problem

1. Маршрути плануємо вручну → водії їздять неоптимально → паливо + час
2. Замовляємо запаси "на відчуття" → заморожені гроші на складі або дефіцит
3. Дефіцит виявляємо коли клієнт вже скаржиться → fill rate падає

---

## ML Рішення для Logistics

- **Demand & Inventory ML** — прогноз попиту по SKU × точка, dynamic safety stock, auto-reorder
- **Route Optimization ML** — VRP (Vehicle Routing Problem) через OR-Tools: мінімум пробігу, часових вікон
- **Supply Chain Risk ML** — скоринг надійності постачальників, прогноз затримок
- **Last-Mile Analytics** — ML-прогноз часу доставки, оптимізація кур'єрських зон
- **Warehouse Slotting ML** — оптимальне розміщення товарів за частотою пікінгу
- **Carbon Footprint ML** — ML-оцінка CO₂ по маршрутах (UK ESG звітність)

---

## Case Studies

- **SupplyIQ** (portfolio/ml-supply-chain-fmcg ✅)
  - FMCG-дистриб'ютор, 1 200 SKU, 87 точок, Харків
  - Fill Rate +6.2 пп → 97.4%, залишки −28%, logistics cost −19%, ROI за 4 місяці
  - Стек: XGBoost, OR-Tools, Airflow, FastAPI

---

## Які дані потрібні

| ML-задача | Мінімум | Ідеально |
|-----------|---------|---------|
| Demand Forecast | 12 міс продажів по SKU | 2+ роки + промо |
| Route Optimization | Адреси доставок + флот | + historical traffic |
| Inventory ML | Поточні залишки + lead times | + supplier history |

---

## Tech Stack

- Оптимізація: Google OR-Tools, PuLP (linear programming)
- Моделі: XGBoost, Prophet, ARIMA
- Pipeline: Apache Airflow, dbt
- Geo: Google Maps API, OSRM (open routing)
- ERP Integration: SAP, 1С, Odoo, NetSuite
- Карти: Mapbox, Google Maps Platform

---

## Пакети

| Пакет | EN | UK | Що входить |
|-------|----|----|-----------|
| Demand ML | from £5,000 | від 200 000 ₴ | Demand forecast + auto-reorder alerts |
| Route ML | from £6,000 | від 240 000 ₴ | VRP optimizer + карта маршрутів |
| Supply Chain Suite | from £16,000 | від 640 000 ₴ | Demand + Route + Risk + MLOps |

---

## FAQ

1. Скільки адрес/маршрутів може обробляти VRP-оптимізатор?
2. Чи інтегрується з нашим TMS/ERP?
3. Як ML враховує сезонність та промо-акції?
4. Що таке ESG-звітність і чи потрібна вона українському бізнесу?
5. Як часто перераховуються маршрути — раз на день чи в реальному часі?

---

## Cross-links

- → `/services/machine-learning`
- → `/ml/retail` — "ML для попиту та ритейлу"
- → `/portfolio/demand-forecast-retail`
- → `/ai/ecommerce` — "AI для доставки та e-commerce"
- → `/blog/ml-supply-chain-optimization`

---

## SEO

```tsx
title: "Machine Learning for Logistics | Supply Chain Optimization, Route ML — CodeNest"
description: "ML logistics solutions: supply chain optimization, route planning VRP, demand forecasting. Fill rate +6%, costs −19%. From £5,000. UK & Ukraine."
```

## Blog
- [x] ~~`ml-supply-chain-optimization`~~ — ✅ Реалізовано
- [x] ~~`vrp-route-optimization-ortools`~~ — ✅ Реалізовано (blog.ts, 2026-05-02)

## TODO розробка
- [x] ~~`src/data/mlNiches/logistics.ts`~~ — ✅ Реалізовано (mlNiches.ts)
- [x] ~~`src/app/[lang]/ml/logistics/page.tsx`~~ — ✅ Реалізовано
- [x] ~~Додати `ml-supply-chain-optimizer` (SupplyIQ) до `portfolio.ts`~~ — ✅ Реалізовано (slug: `ml-supply-chain-fmcg`)
- [ ] OG image: `/og/ml/logistics.png`
