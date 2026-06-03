 Machine Learning для бізнесу
Опис: Сторінка послуги ML — кастомні моделі, предиктивна аналітика, fraud detection, MLOps.
**URL:** `/services/machine-learning`
**Пріоритет:** Дуже високий — B2B та корпоративний сегмент
**Статус:** ✅ Розширено та покращено (2026-05-01)
**i18n статус:** ✅ Повністю перекладено (EN + UK) — /services/[slug]

---

> ⚠️ **Незакреслені пункти ([ ]) — Phase 2:** потребують реального контенту (кейси, відгуки, медіа) або підключення зовнішніх сервісів. Технічна реалізація сторінки завершена.


## Hero-секція
- ✅ H1: "Machine Learning для бізнесу"
- ✅ Підзаголовок: кастомні моделі, предиктивна аналітика, MLOps
- ✅ CTA: "Отримати пропозицію" + "Дивитися портфоліо"
- [ ] Анімована ілюстрація (графіки точності, data pipeline)

## Функції / Послуги
- ✅ Предиктивна аналітика — `service.features`
- ✅ Fraud Detection та скоринг — `service.features`
- ✅ Рекомендаційні системи — `service.features`
- ✅ Прогнозування попиту — `service.features`
- ✅ MLOps та деплой моделей — `service.features`
- ✅ Transfer Learning та Fine-tuning — `service.features`

## Що входить
- ✅ Аудит даних та оцінка якості датасету — `service.includes`
- ✅ Feature engineering та підготовка даних — `service.includes`
- ✅ Навчання та валідація ML-моделі — `service.includes`
- ✅ API-інтеграція (REST / gRPC) — `service.includes`
- ✅ A/B тестування моделі vs базової — `service.includes`
- ✅ Деплой на хмарну інфраструктуру — `service.includes`
- ✅ MLOps: моніторинг та автоматичне перенавчання — `service.includes`

## Пакети
- ✅ ML Starter (від 30 000 грн) — аналіз даних + перша модель
- ✅ ML Production (від 60 000 грн) — кастомна модель + деплой — `highlight: true`
- ✅ ML Platform (за узгодженням) — платформа + MLOps + перенавчання

## Кейси застосування (useCases)
- ✅ Фінанси та банкінг — fraud detection, скоринг
- ✅ E-commerce та ритейл — рекомендації, dynamic pricing
- ✅ Логістика — прогноз попиту, оптимізація маршрутів
- ✅ SaaS та продукти — churn prediction, LTV-оцінка
- ✅ Виробництво — predictive maintenance, контроль якості
- ✅ Медицина — класифікація діагнозів, drug discovery

## Портфоліо кейси

### ✅ Реалізовано (є в portfolio.ts)
- ✅ portfolio/ml-churn-predictor (RetainIQ) — ML прогнозування відтоку клієнтів, −31% churn
- ✅ portfolio/fraud-detection-fintech (FraudShield) — fraud detection для фінтех, −97% fraud loss
- ✅ portfolio/demand-forecast-retail (StockSense) — demand forecasting для ритейлу, −34% залишки
- ✅ portfolio/reco-engine-ecom (PersonaCart) — recommendation engine для e-commerce, +176% CTR
- ✅ portfolio/ai-predictive-maintenance (MachineGuard) — LSTM predictive maintenance, −73% простоїв
- ✅ portfolio/ml-customer-segmentation (SegmentIQ) — RFM + K-Means + CLV, email-виторг +94%
- ✅ portfolio/ml-credit-scoring (CreditIQ) — LightGBM credit scoring, NPL −34%, авто-схвалення 71%
- ✅ portfolio/ml-insurance-document-ocr (DocAI Insurance) — LayoutLM OCR, ручна обробка −82%
- ✅ portfolio/ml-energy-forecasting (EnergyIQ) — XGBoost + Prophet, рахунки −23%

### ✅ Нові кейси — реалізовано (2026-05-02)

#### `ml-supply-chain-optimizer` — SupplyIQ
- **Статус:** ✅ Реалізовано — додано до `portfolio.ts` (slug: `ml-supply-chain-fmcg`)
- **Highlight:** false
- **EN назва:** SupplyIQ — ML Supply Chain Optimization
- **Blog:** `ml-supply-chain-optimization` — "ML-Driven Supply Chain: How We Cut Logistics Costs by 19%"
- **Розширення:** Multi-warehouse optimization, supplier risk scoring, carbon footprint tracking (UK ESG)
- **Назва:** SupplyIQ — ML Supply Chain Optimization
- **Клієнт:** FMCG-дистриб'ютор (1 200 SKU, 87 торгових точок), Харків
- **Категорія:** AI / ML
- **Ніша:** Логістика
- **Рік:** 2026
- **Складність:** complex
- **Теги:** ML, Supply Chain, XGBoost, OR-Tools, Demand Forecast, EOQ, Route Optimization, Airflow
- **Стек:** Python, XGBoost, Google OR-Tools, Apache Airflow, FastAPI, PostgreSQL, Next.js, Redis
- **Колір:** `from-indigo-700 to-blue-900`
- **Emoji:** 🚚
- **Опис:** ML-платформа оптимізації ланцюга поставок: XGBoost-модель прогнозує попит по SKU × точка на 14/30 днів вперед, модуль розрахунку оптимального замовлення (EOQ + dynamic safety stock), OR-Tools для маршрутизації доставки (VRP), автоматичний alert при ризику дефіциту або надлишку. Pipeline оркеструється через Airflow — щоденний перерахунок.
- **Результат:** Fill Rate (рівень сервісу) +6.2 пп → 97.4%. Складські залишки −28%. Logistics cost −19%. ROI: 4 місяці.
- **Деталі кейсу:**
  - Challenge: Дистриб'ютор замовляв "на відчуття" — менеджери керувалися минулорічними даними та інтуїцією. Fill Rate 91.2% (галузевий мінімум 97%). Склад перевантажений низькооборотними SKU, але ходові товари регулярно закінчувались.
  - Solution: XGBoost demand model: фічі — сезонність, свята, промо-акції, ціна, залишки, тренд продажів за 52 тижні. EOQ-калькулятор з dynamic safety stock (CV попиту × lead time). OR-Tools VRP для 12 вантажівок — щоденна маршрутизація. Airflow DAG: 03:00 → дані → прогноз → замовлення → маршрути → push до ERP.
  - Results: Fill Rate 91.2% → 97.4% (+6.2 пп), залишки −28%, logistics cost −19%, ROI за 4 місяці

---

#### `ml-nlp-support-triage` — TriageAI
- **Статус:** ✅ Реалізовано — додано до `portfolio.ts` (slug: `ml-support-triage-bert`)
- **Highlight:** false
- **EN назва:** TriageAI — ML Support Ticket Triage & Routing
- **Blog:** `ml-nlp-support-automation` — "How Fine-Tuned BERT Reduced Support Response Time by 81%"
- **Розширення:** Sentiment detection, churn risk flag при тікеті, Freshdesk / HubSpot інтеграція
- **Назва:** TriageAI — ML Support Ticket Triage & Routing
- **Клієнт:** B2B SaaS-компанія (CRM-платформа, 1 400+ клієнтів), 2 800+ тікетів/міс, Київ
- **Категорія:** AI / ML
- **Ніша:** IT / SaaS
- **Рік:** 2026
- **Складність:** complex
- **Теги:** NLP, BERT, Text Classification, Zendesk API, Support Automation, Multi-label, Routing
- **Стек:** Python, BERT (fine-tuned), scikit-learn, FastAPI, PostgreSQL, Redis, Zendesk API, Next.js
- **Колір:** `from-rose-700 to-pink-900`
- **Emoji:** 🎯
- **Опис:** NLP-система автоматичної класифікації та маршрутизації тікетів підтримки: BERT fine-tuned на 18 000+ тікетів визначає категорію (bug / feature request / billing / onboarding / 12 класів), пріоритет (urgent / high / normal / low) та routing до потрібного фахівця. Інтеграція з Zendesk через API — тікет класифікується і призначається за 3 сек від отримання. Дашборд: trend аналіз, bottleneck по агентах, SLA tracking.
- **Результат:** Середній час першої відповіді: 4.2 год → 47 хв (−81%). Правильний routing з першого разу: 91% (vs 64% ручний). Навантаження на L2/L3 −34%.
- **Деталі кейсу:**
  - Challenge: Support-команда витрачала 40% часу на ручне сортування тікетів. Неправильне призначення → 3–4 transfer між агентами → час вирішення 2–3 дні. SLA порушувались у 23% тікетів.
  - Solution: BERT fine-tuning на корпоративному датасеті (18K тікетів, 3 роки). Multi-label класифікація: категорія + пріоритет + team. Confidence threshold: якщо < 0.75 — "requires human triage" flag. Zendesk webhook: новий тікет → classify → assign → notify agent. Active learning: агент позначає помилку → тікет йде в training queue → щотижневий re-train.
  - Results: Перша відповідь −81% (4.2 год → 47 хв), routing accuracy 64% → 91%, SLA violations −23% → 4%, L2/L3 навантаження −34%

---

#### `ml-property-valuation` — EstateIQ
- **Статус:** ✅ Реалізовано — додано до `portfolio.ts` (slug: `ml-property-valuation`)
- **Highlight:** ✨ true — PropTech = топ-інвестиційний сектор UK
- **EN назва:** EstateIQ — ML Automated Property Valuation
- **Blog:** `ml-property-valuation-avm` — "Building an Automated Valuation Model (AVM) with ML and GIS"
- **Розширення:** Rental yield prediction, investment ROI calculator, flood/subsidence risk ML scoring
- **Назва:** EstateIQ — ML Automated Property Valuation
- **Клієнт:** Агентство нерухомості (1 200+ оголошень/міс, 14 агентів), Лондон + Київ
- **Категорія:** AI / ML
- **Ніша:** Нерухомість
- **Рік:** 2026
- **Складність:** complex
- **Теги:** ML, AVM, XGBoost, Property Valuation, PropTech, GIS, Rightmove API, Geospatial
- **Стек:** Python, XGBoost, LightGBM, GeoPandas, FastAPI, PostgreSQL, PostGIS, Next.js, Mapbox
- **Колір:** `from-amber-600 to-orange-800`
- **Emoji:** 🏠
- **Ринки:** 🇬🇧 UK (PropTech — топ-інвест. сектор, Rightmove/Zoopla екосистема) + 🇺🇦 UA (DOM.RIA/OLX ринок, забудовники)
- **Опис:** ML-модель автоматичної оцінки вартості нерухомості (AVM — Automated Valuation Model): XGBoost навчений на 340K+ угодах, враховує локацію (GIS: відстань до метро, школи, парку, шуму), площу, поверх, стан, рік будівництва, сезонність ринку. Агент вводить параметри → отримує ціновий діапазон + SHAP пояснення чому. Карта: heatmap цін по районах. Автоматична переоцінка портфеля раз на тиждень.
- **Результат:** Точність оцінки: MAPE 4.2% (vs 12–18% ручна). Час оцінки об'єкта: 2 дні → 8 сек. Агент проводить на 38% більше угод.
- **Деталі кейсу:**
  - Challenge: Агенти витрачали 2 дні на оцінку нового об'єкта — порівнювали вручну, дзвонили колегам. Власники нерухомості оскаржували ціни без пояснень. Портфель 1 200 оголошень потребував постійного перегляду цін.
  - Solution: XGBoost AVM: 47 фіч включно з GIS-даними (Mapbox Isochrone API для часу до центру). SHAP feature importance → агент бачить: "Ціна нижча на 8% через шосе поруч, але вища на 11% через школу у 400м". PostGIS для геопросторових запитів. UK: інтеграція з Rightmove/Zoopla через API для актуальних comp'ів. UA: парсинг DOM.RIA для локального ринку.
  - Results: MAPE 4.2% (−3× точніше), оцінка 2 дні → 8 сек, угод у агента +38%, оскаржень ціни −76%

---

#### `ml-crop-yield` — HarvestIQ
- **Статус:** ✅ Реалізовано — додано до `portfolio.ts` (slug: `ml-harvest-precision-agriculture`)
- **Highlight:** ✨ true — AgriTech = унікальний кейс, немає у веб-студій-конкурентів
- **EN назва:** HarvestIQ — ML Precision Agriculture & Crop Intelligence
- **Blog:** `ml-precision-agriculture-ndvi` — "Precision Agriculture with ML: NDVI, LSTM, and Drone Analysis"
- **Розширення:** Weather API integration, crop rotation recommender, market price forecasting, carbon credits calculator (UK ELMS scheme)
- **Назва:** HarvestIQ — ML Precision Agriculture & Crop Intelligence
- **Клієнт:** Агрохолдинг (28 000 га, зернові + соняшник), Полтавська обл. + UK expansion
- **Категорія:** AI / ML
- **Ніша:** Агро / Логістика
- **Рік:** 2026
- **Складність:** complex
- **Теги:** ML, Computer Vision, NDVI, Drone Analysis, Crop Yield, XGBoost, LSTM, Precision Farming, Satellite
- **Стек:** Python, XGBoost, LSTM, OpenCV, Sentinel-2 API, FastAPI, TimescaleDB, Next.js, Mapbox
- **Колір:** `from-lime-600 to-green-800`
- **Emoji:** 🌾
- **Ринки:** 🇬🇧 UK (держпрограми субсидування precision farming, AHDB) + 🇺🇦 UA (найбільший агросектор Європи, агрохолдинги)
- **Опис:** ML-платформа для точного землеробства: LSTM-модель прогнозує врожайність по полях на 6 тижнів вперед (дані: NDVI зі супутника Sentinel-2, погода, тип ґрунту, аналіз попередніх сезонів). Computer Vision аналізує дрон-знімки: детекція хвороб культур, оцінка густоти посівів, зони стресу. Агроном отримує actionable рекомендації: де обприскувати, де досіяти, коли збирати.
- **Результат:** Точність прогнозу врожайності: ±6.3% (vs ±22% традиційна). Витрати на добрива −19%. Збитки від хвороб культур −31% завдяки ранній детекції.
- **Деталі кейсу:**
  - Challenge: Агрохолдинг планував збір урожаю "на погоду та досвід" — похибка ±22% призводила до нестачі техніки або простою. Хвороби культур виявляли візуально — до моменту видимості вже 20–30% поля уражено.
  - Solution: Sentinel-2 супутникові знімки (10м роздільність, кожні 5 днів) → NDVI + EVI індекси → LSTM time-series модель по кожному полю. Дрон-аналіз раз на 2 тижні: YOLOv8 для класифікації хвороб (навчений на 12K агро-зображень). TimescaleDB для time-series. Mapbox: карта полів з кольоровою шкалою ризиків. Push-алерт агроному при аномалії на полі.
  - Results: Прогноз врожайності ±6.3% (−3.5×), добрива −19%, збитки від хвороб −31%, планування техніки −2 дні

---

#### `ml-anomaly-detection` — GuardAI
- **Статус:** ✅ Реалізовано — додано до `portfolio.ts` (slug: `ml-fraud-detection-fca`)
- **Highlight:** ✨ true — FCA compliance = унікальний selling point для UK ринку
- **EN назва:** GuardAI — ML Behavioral Anomaly Detection
- **Blog:** `ml-fraud-anomaly-detection-fca` — "GDPR-Compliant Fraud Detection: Isolation Forest + LSTM Autoencoder"
- **Розширення:** Account takeover detection, money laundering pattern ML, ICO/FCA audit trail dashboard
- **Назва:** GuardAI — ML Behavioral Anomaly Detection
- **Клієнт:** FinTech SaaS (платіжна платформа, 85K active users), Лондон
- **Категорія:** AI / ML
- **Ніша:** FinTech / Cybersecurity
- **Рік:** 2026
- **Складність:** complex
- **Теги:** ML, Anomaly Detection, Isolation Forest, LSTM Autoencoder, Fraud, Cybersecurity, GDPR, Real-time
- **Стек:** Python, Isolation Forest, LSTM Autoencoder, Kafka, Redis, FastAPI, PostgreSQL, Next.js, Grafana
- **Колір:** `from-red-700 to-rose-900`
- **Emoji:** 🛡️
- **Ринки:** 🇬🇧 UK (GDPR + FCA compliance, fintech hub Лондона) + 🇺🇦 UA (кіберзагрози, фінтех-зростання)
- **Опис:** ML-система виявлення поведінкових аномалій у реальному часі: Isolation Forest для статичних патернів (незвичайні суми, нові пристрої, geo-jump) + LSTM Autoencoder для послідовностей дій (поведінкова біометрія). Kafka stream processing — рішення за 180 мс. Три рівні ризику: allow / challenge (2FA push) / block + freeze. GDPR-compliant: пояснення рішення через SHAP, право на апеляцію через dashboard.
- **Результат:** False positive rate: 0.8% (vs 4.2% rule-based). Fraud loss −89%. FCA audit пройдено з першого разу. Час реакції на інцидент: 6 год → 180 мс.
- **Деталі кейсу:**
  - Challenge: Платформа використовувала rule-based fraud detection (100+ ручних правил). False positives 4.2% — блокували справжніх клієнтів. Нові схеми fraud обходили правила протягом 3–5 днів до виявлення. FCA вимагав explainability рішень.
  - Solution: Двошарова архітектура: Isolation Forest на feature vector кожної транзакції (48 фіч: geo, device, amount, velocity, time pattern). LSTM Autoencoder на послідовності 30 останніх подій — reconstruction error = anomaly score. Kafka: транзакція → score → рішення за 180 мс. SHAP: "Заблоковано через: новий пристрій (41%) + geo-jump Київ→Лондон (35%) + сума 5× середньої (24%)". Appeals dashboard: клієнт пояснює → ML переглядає.
  - Results: False positives −81% (4.2% → 0.8%), fraud loss −89%, FCA compliance ✅, реакція 6 год → 180 мс

## Покращення (TODO)
- ✅ **Секція "Технологічний стек"** — розширено до 13: +LightGBM, Prophet, Kafka, Redis, SHAP (2026-05-01)
- ✅ **Before/After секція** — розширено з 4 до 6 рядків: +dynamic pricing (+18% маржі), +predictive maintenance (−73% простоїв) (2026-05-01)
- ✅ **Cross-link до Artificial Intelligence** — блок "Шукаєте GPT-бота або NLP?" — `service.crossLink`
- ✅ **FAQ: GDPR/приватність даних** — "Де обробляються дані для навчання моделі?" — `service.faq`
- ✅ **FAQ розширено до 8 питань** — +строки, +XAI/SHAP (explainable AI), +"що якщо не дасть результату" (2026-05-01)
- ✅ **Нові blog-пости** — `ml-churn-prediction-guide` + `mlops-production-guide` (2026-05-01)
- ✅ **Більше portfolio кейсів** — fraud-detection-fintech, demand-forecast-retail, reco-engine-ecom (2026-05-01)
- ✅ **`longDescription` з конкретними цифрами** — −97% fraud, −31% churn, −34% залишки, +176% CTR, +18% маржа (2026-05-01)
- ✅ **Features з реальними кейсами** — RetainIQ, FraudShield, PersonaCart, StockSense, PriceSense (2026-05-01)
- ✅ **Packages — детальні feature-списки** — latency, інструменти, quarterly review, feature store (2026-05-01)
- ✅ **Case studies — реальні кейси** — FraudShield (−97%), RetainIQ (−31%), StockSense (−34%) (2026-05-01)
- ✅ **useCases оновлено з метриками** — конкретні результати в кожній ніші (2026-05-01)
- ✅ **Повний EN переклад** — features, includes, packages, faq, processSteps, caseStudies, useCases, beforeAfter (2026-05-01)
- ✅ **Нові portfolio кейси** — SupplyIQ, TriageAI, EstateIQ, HarvestIQ, GuardAI — додано до `portfolio.ts` (2026-05-02)
- ✅ **Blog posts написано** — ml-supply-chain-optimization, ml-nlp-support-automation, ml-property-valuation-avm, ml-precision-agriculture-ndvi, ml-fraud-anomaly-detection-fca (2026-05-02)
- ✅ **Нові glossary терміни** — AVM, NDVI, FCA Compliance, LSTM — додано до `glossary.ts` (2026-05-02)
- ✅ **FAQ: UK FCA compliance** — "Чи відповідають ваші ML-рішення вимогам FCA (UK)?" — додано (2026-05-02)
- ✅ **FAQ розширено до 10 питань** — +FCA compliance, +supply chain, +BERT support automation (2026-05-02)
- ✅ **"Чи вистачить у вас даних?" міні-калькулятор** — `DatasetCalculator.tsx`, вбудовано в `page.tsx` для slug=machine-learning (2026-05-02)
- ✅ **Діаграма MLOps pipeline** — `MLOpsPipelineDiagram.tsx`, інтерактивна, 6 етапів з кліком, вбудовано в `page.tsx` (2026-05-02)
- ✅ **OG image** — dynamic route `/og/services/[slug]/route.tsx` — chart icon, blue gradient, chips (2026-05-02)
- ✅ **FAQ: ML vs правила (rule-based)** — додано до `faq` + EN переклад (2026-05-02)
- ✅ **useCases розширити** — додано: Нерухомість (PropTech), Сільське господарство (AgriTech), Кібербезпека — UA + EN (2026-05-02)
- ✅ **Стек розширити** — додано: OR-Tools, GeoPandas, PostGIS, TimescaleDB, Sentinel-2 API (2026-05-02)
- ✅ **Нова нішева сторінка** — `/niches/agritech` — AgriTech як окрема вертикаль — реалізовано в `niches.ts` (2026-05-02)

## Технологічний стек
- ✅ Python: scikit-learn, XGBoost, LightGBM, CatBoost
- ✅ Deep Learning: PyTorch, TensorFlow, Keras
- ✅ MLOps: MLflow, Airflow, DVC, Evidently
- ✅ Інфраструктура: Docker, Kubernetes, AWS SageMaker / GCP Vertex AI
- ✅ Feature Store: Feast, Tecton
- ✅ Fine-tuning на власних даних клієнта

## SEO
- ✅ Title: "Machine Learning для бізнесу | ML-розробка Україна — CodeNest"
- ✅ keyword: "machine learning для бізнесу Україна"
- ✅ metaDescription: від 30 000 грн
- ✅ Schema.org: Service + FAQPage + BreadcrumbList
- ✅ Додати blog-пости з тегом "machine-learning" для relatedPosts — виконано (2026-05-01)

---

### Примітки
- Аудиторія: CTO, Head of Data, аналітики — технічніша мова ніж на AI-сторінці
- Акцент: ROI у цифрах — "fraud detection зменшує збитки на X%", "churn prediction рятує Y клієнтів/міс"
- ML-сторінка = більш B2B та enterprise фокус, AI-сторінка = ширший SMB фокус
- Порівняно з AI: довший час розробки (4–12 тижнів), вищий поріг входу ($750), більший потенційний ROI
