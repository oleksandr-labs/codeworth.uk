# Нові Портфоліо-Проєкти — План додавання

**Статус:** ✅ 15/15 (оригінал) + 23 ML case studies (Sprints 6/11/18) = 53+ всього
**Пріоритет:** 🟡 Середній
**Файл:** `src/lib/data/portfolio.ts`
**Поточна кількість:** 53+ UK ML case studies (оновлено 2026-06-24)

### ML Case Studies додані в Sprints 6/11/18

| Slug | Клієнт/Сектор | Статус |
|------|--------------|--------|
| `fintech-fraud-ml` | UK fintech fraud detection (GNN + XGBoost) | ✅ Sprint 6 |
| `healthcare-patient-risk` | NHS patient risk scoring | ✅ Sprint 6 |
| `ecommerce-recommendation` | ML recommendation engine | ✅ Sprint 6 |
| `manufacturing-predictive-maintenance` | IoT predictive maintenance | ✅ Sprint 6 |
| `saas-churn-ml` | SaaS churn prediction | ✅ Sprint 6 |
| `aviva-claims-ml` | Aviva-style insurance claims ML | ✅ Sprint 11 |
| `rolls-royce-engine-ml` | Rolls-Royce turbine CV monitoring | ✅ Sprint 11 |
| `octopus-energy-demand-ml` | Octopus Energy demand forecasting | ✅ Sprint 11 |
| `nationwide-mortgage-nlp` | Nationwide NLP mortgage processing | ✅ Sprint 11 |
| `nhs-sepsis-early-warning` | NHS Sepsis early warning ML | ✅ Sprint 11 |
| `barclays-fraud-ml` | Barclays-style fraud (graph neural networks) | 🔄 Sprint 18 |
| `uk-nhs-bed-management` | NHS hospital bed occupancy ML | 🔄 Sprint 18 |
| `uk-insurtech-dynamic-pricing` | UK insurtech telematics pricing | 🔄 Sprint 18 |
| `uk-retailer-demand-ml` | UK multichannel retailer demand forecasting | 🔄 Sprint 18 |
| `uk-proptech-valuation-ml` | UK PropTech AVM (MAPE 4.1%) | 🔄 Sprint 18 |

---

## Огляд

Нові проєкти закривають прогалини в нішах:
- FinTech / Digital Banking — відсутня
- Car Wash / Автомийка — відсутня
- Subscription Box E-commerce — відсутня
- Coworking Space — відсутня
- B2B SaaS (окремий від IT/SaaS) — мало
- AI/ML (ще 2 нові кейси) — є 4, додати ще 2

---

## 🔲 Нові проєкти для реалізації

### FinTech / Digital Banking

#### `fintech-neobank` — DigitalFirst Bank
- **Назва:** DigitalFirst Bank — Цифровий Банк
- **Клієнт:** Необанк / FinTech-стартап, Київ
- **Категорія:** Портал
- **Ніша:** FinTech
- **Рік:** 2025
- **Складність:** complex
- **Теги:** FinTech, Onboarding, Card customization, Calculator, PWA
- **Стек:** Next.js, TypeScript, Tailwind CSS v4, Stripe
- **Колір:** `from-blue-900 to-indigo-950`
- **Emoji:** 💳
- **Опис:** Лендінг цифрового банку: онлайн-відкриття рахунку (3 кроки), кастомізація картки (колір + ім'я), калькулятор кешбеку та відсотків, тарифи, FAQ.
- **Результат:** Онлайн-заявок на відкриття рахунку +340% vs попередній лендінг. Онбординг — з 15 хв до 4 хв.
- **Деталі кейсу:**
  - Challenge: Необанк-стартап мав технічний MVP, але лендінг без конверсії — потенційні клієнти не розуміли переваги та не довіряли відкривати рахунок онлайн
  - Solution: Конверсійний лендінг з 3-кроковим онбордингом (особисті дані → фото документа → вибір тарифу), анімована кастомізація картки в реальному часі, калькулятор кешбеку, секція Security Trust, FAQ зі справжніми запереченнями
  - Results: +340% заявок, онбординг скорочено з 15 до 4 хв, trust score +28 пунктів (NPS опитування)

---

#### `fintech-credit-broker` — CreditPath
- **Назва:** CreditPath — Кредитний Брокер
- **Клієнт:** Фінансовий брокер (споживчі кредити / авто), Харків
- **Категорія:** Лендінг
- **Ніша:** FinTech
- **Рік:** 2025
- **Складність:** medium
- **Теги:** FinTech, Кредитний калькулятор, Підбір банку, Форма заявки
- **Стек:** Next.js, TypeScript, Tailwind CSS v4
- **Колір:** `from-green-700 to-emerald-900`
- **Emoji:** 💰
- **Опис:** Лендінг кредитного брокера: калькулятор кредиту (сума × строк × ставка), порівняння пропозицій 7 банків, форма заявки з миттєвим pre-approval.
- **Результат:** Заявок на кредит +210%. Конверсія калькулятора → форма заявки: 38%.
- **Деталі кейсу:**
  - Challenge: Клієнти брокера не розуміли умов і переходили напряму в банк
  - Solution: Інтерактивний калькулятор + порівняльна таблиця банків + форма pre-approval (без довідок)
  - Results: Заявок +210%, CTR з калькулятора 38%, bounce rate −42%

---

### Car Wash / Автомийка

#### `carwash-premium` — SparkWash
- **Назва:** SparkWash — Преміум Автомийка
- **Клієнт:** Мережа автомоєк (5 точок), Дніпро
- **Категорія:** Корпоративний сайт
- **Ніша:** Авто
- **Рік:** 2025
- **Складність:** medium
- **Теги:** Online Booking, Loyalty Program, Car Wash, Subscription
- **Стек:** Next.js, TypeScript, Tailwind CSS v4
- **Колір:** `from-sky-600 to-blue-800`
- **Emoji:** 🚗
- **Опис:** Сайт мережі автомийок: онлайн-запис по локаціях з вибором часового слота, пакети миття, абонемент «Чистий місяць», програма лояльності з балами.
- **Результат:** Онлайн-бронювань 67% від усіх записів. Абонементів продано +180%.
- **Деталі кейсу:**
  - Challenge: 5 мийок приймали записи лише по телефону. Адміністратори витрачали 40% часу на обробку дзвінків. Переповнення в годину пік, простій в низький сезон
  - Solution: Сайт з геолокацією найближчої мийки, онлайн-запис (локація → пакет → дата/час), абонемент 4/8/unlimited, програма лояльності (накопичення балів за кожне відвідування), push-нагадування
  - Results: 67% бронювань онлайн, абонементи +180%, рівномірний розподіл навантаження по часу

---

### Subscription Box

#### `subscription-box-monthly` — BoxClub
- **Назва:** BoxClub — Місячні Коробки з Сюрпризами
- **Клієнт:** Subscription box e-commerce (краса/лайфстайл), Київ
- **Категорія:** E-commerce
- **Ніша:** Fashion
- **Рік:** 2025
- **Складність:** complex
- **Теги:** Subscription, Box customization, Quiz, Gifting, Stripe
- **Стек:** Next.js, TypeScript, Tailwind CSS v4, Stripe Subscriptions
- **Колір:** `from-fuchsia-600 to-rose-700`
- **Emoji:** 📦
- **Опис:** Subscription box e-commerce: квіз для підбору коробки (5 питань → персональна рекомендація), 4 тематичні коробки, вибір частоти (місяць/квартал), gifting flow, Stripe Subscriptions.
- **Результат:** LTV клієнта +4.2× vs разова покупка. Quiz completion 74% → конверсія 61%.
- **Деталі кейсу:**
  - Challenge: Клієнти не розуміли, яка коробка їм підходить. Повернення 18% через невідповідність очікуванням
  - Solution: 5-кроковий квіз підбору (стиль / бюджет / уподобання) → персональна рекомендація + preview вмісту. Gifting flow: відправити як подарунок з листівкою. Stripe recurring billing
  - Results: Повернення −73% (18%→5%), LTV ×4.2, gifting — 31% замовлень

---

### Coworking Space

#### `coworking-urban` — UrbanDesk
- **Назва:** UrbanDesk — Коворкінг у центрі міста
- **Клієнт:** Мережа коворкінгів (3 локації), Київ
- **Категорія:** Корпоративний сайт
- **Ніша:** IT / SaaS
- **Рік:** 2025
- **Складність:** medium
- **Теги:** Coworking, Booking, Virtual tour, Membership, B2B
- **Стек:** Next.js, TypeScript, Tailwind CSS v4, Google Calendar API
- **Колір:** `from-amber-600 to-orange-700`
- **Emoji:** 🏢
- **Опис:** Сайт мережі коворкінгів: бронювання столу/переговорки по локаціях, membership-тарифи (Day/Month/Team), 360° virtual tour, B2B-пропозиція для команд.
- **Результат:** Щоденних бронювань онлайн +290%. B2B корпоративних клієнтів +7 за 2 місяці.
- **Деталі кейсу:**
  - Challenge: Клієнти бронювали місця через Instagram або телефон, адміністратори витрачали 3 год/день на підтвердження. Корпоративні клієнти не знали про B2B-пакети
  - Solution: Онлайн-бронювання (локація → тип місця → дата/час → оплата), Google Calendar синхронізація, 360° virtual tour через iframe, B2B landing зі спеціальними умовами, membership dashboard
  - Results: 290% online bookings, 7 нових B2B-клієнтів, адмін-час −80%

---

### AI / ML — Нові кейси (✅ всі реалізовано 2026-05-01)

#### `ai-price-optimizer` — PriceSense ✅
- **Назва:** PriceSense — AI Dynamic Pricing
- **Клієнт:** E-commerce (електроніка, 50K+ SKU), Київ
- **Категорія:** AI / ML
- **Ніша:** IT / SaaS
- **Рік:** 2025
- **Складність:** complex
- **Теги:** ML, Dynamic Pricing, XGBoost, LightGBM, Price Optimization
- **Стек:** Python, LightGBM, FastAPI, PostgreSQL, React, MLflow
- **Колір:** `from-emerald-700 to-teal-900`
- **Emoji:** 📊
- **Опис:** ML-система динамічного ціноутворення для e-commerce: модель прогнозує оптимальну ціну на основі попиту, конкурентів, сезонності та залишків. Автоматичне оновлення цін раз на годину.
- **Результат:** Маржинальність +18%. Revenue +$67K/місяць при тому ж трафіку.
- **Деталі кейсу:**
  - Challenge: E-commerce з 50K SKU встановлював ціни вручну — аналітик переглядав конкурентів раз на тиждень. Товари на складі підешевшувалися із затримкою, а ходові товари продавалися нижче ринку
  - Solution: LightGBM-модель з 30+ фічами: ціна конкурентів (парсер), залишки, тренд продажів, сезонність, категорія. MLflow для версіонування. FastAPI endpoint оновлює ціни щогодини. React-дашборд: графіки ринкової позиції, profit margin by category, alert при аномаліях
  - Results: Маржинальність +18%, revenue +$67K/міс, час роботи аналітика по цінах −85%

---

#### `ai-resume-screener` — TalentScan ✅
- **Назва:** TalentScan — AI HR Screening
- **Клієнт:** Рекрутингове агентство (100+ вакансій/міс)
- **Категорія:** AI / ML
- **Ніша:** IT / SaaS
- **Рік:** 2025
- **Складність:** complex
- **Теги:** ML, NLP, HR Tech, Resume Screening, spaCy, GPT
- **Стек:** Python, spaCy, OpenAI GPT-4o, FastAPI, PostgreSQL, Next.js
- **Колір:** `from-violet-700 to-purple-900`
- **Emoji:** 📄
- **Опис:** AI HR-платформа: автоматичний скринінг резюме (NLP + GPT-4o), ранжування кандидатів за відповідністю вакансії, виявлення "red flags", dashboard рекрутера з поясненнями.
- **Результат:** Час скринінгу 1 кандидата: з 8 хв до 45 сек. Точність попереднього відбору 89%.
- **Деталі кейсу:**
  - Challenge: Агентство отримувало 300–500 резюме на популярну вакансію. HR-команда витрачала 3–5 днів лише на першичний скринінг, пропускаючи кращих кандидатів від навантаження
  - Solution: NLP-пайплайн: spaCy для парсингу резюме (досвід/навички/освіта), GPT-4o для semantic matching з описом вакансії, scoring 0–100, виявлення red flags (часта зміна роботи, прогалини). Рекрутер бачить: топ-10 кандидатів + пояснення + confidence score
  - Results: Скринінг 1 кандидата: 8 хв → 45 сек (−90%), точність відбору 89% (vs 72% ручний), найнятих кандидатів +23%

---

---

### AI / ML — Нові кейси 2026-05-01 (додаткові)

#### `ai-doc-analyzer` — DocSense ✅
- **Назва:** DocSense — AI Document Intelligence
- **Клієнт:** Юридична фірма (корпоративне право), 200+ договорів/міс, Київ
- **Категорія:** AI / ML
- **Ніша:** Право
- **Рік:** 2025
- **Складність:** complex
- **Стек:** Python, GPT-4o, LangChain, FastAPI, PostgreSQL, Next.js, Redis
- **Колір:** `from-slate-600 to-gray-800`
- **Emoji:** ⚖️
- **Результат:** Час аналізу договору: з 2 год до 18 хв. Пропущених ризикових клаузул -94%.

#### `ai-predictive-maintenance` — MachineGuard ✅
- **Назва:** MachineGuard — AI Predictive Maintenance
- **Клієнт:** Металургійний завод (14 виробничих ліній), Запоріжжя
- **Категорія:** AI / ML
- **Ніша:** IT / SaaS
- **Рік:** 2025
- **Складність:** complex
- **Стек:** Python, PyTorch, LSTM, TimescaleDB, FastAPI, MQTT, React, Docker
- **Колір:** `from-orange-700 to-red-800`
- **Emoji:** ⚙️
- **Результат:** Незаплановані простої -73%. Витрати на ремонт -38%. ROI за 5 місяців.

#### `ai-image-search` — VisualFind ✅
- **Назва:** VisualFind — AI Visual Search Engine
- **Клієнт:** Fashion e-commerce (40K+ SKU), 180K MAU, Київ
- **Категорія:** AI / ML
- **Ніша:** Fashion
- **Рік:** 2025
- **Складність:** complex
- **Стек:** Python, OpenAI CLIP, Qdrant, FastAPI, PostgreSQL, Next.js, Redis
- **Колір:** `from-pink-600 to-rose-800`
- **Emoji:** 🔍
- **Результат:** Конверсія з пошуку +89%. Показник «не знайдено» -71%. Середній чек +27%.

---

## Пріоритети реалізації

| Проєкт | Пріоритет | Причина |
|---|---|---|
| `fintech-neobank` | ✅ Готово | FinTech ніша |
| `carwash-premium` | ✅ Готово | Booking flow |
| `subscription-box-monthly` | ✅ Готово | Stripe Subscriptions + quiz |
| `ai-price-optimizer` | ✅ Готово | AI/ML портфоліо |
| `coworking-urban` | ✅ Готово | B2B кут |
| `ai-resume-screener` | ✅ Готово | HR Tech AI |
| `fintech-credit-broker` | ✅ Готово | Доповнює FinTech вертикаль |
| `ai-doc-analyzer` | ✅ Готово | LegalTech AI + LangChain/RAG |
| `ai-predictive-maintenance` | ✅ Готово | Industrial IoT + LSTM |
| `ai-image-search` | ✅ Готово | Visual AI + Vector Search |

---

## Після додавання — оновити

- ✅ `src/lib/data/portfolio.ts` — додано 4 проєкти (carwash-premium, subscription-box-monthly, fintech-neobank, coworking-urban)
- ✅ Demo-компоненти: SparkWashDemo, BoxClubDemo, DigitalFirstBankDemo, UrbanDeskDemo — створено 2026-05-01
- ✅ `src/app/[lang]/portfolio/[slug]/demo/page.tsx` — зареєстровано всі 4 нових демо
- ✅ `TODO/TODO_MAIN.md` — оновлено
- ✅ `src/lib/data/portfolio.ts` — додано 5 AI/ML кейсів (ai-price-optimizer, ai-resume-screener, ai-doc-analyzer, ai-predictive-maintenance, ai-image-search) 2026-05-01
- [ ] `src/lib/data/niches.ts` — додати FinTech як окрему нішу — ⚠️ Phase 3 (існує AI-нішева сторінка /ai/fintech та /ml/banking; нішева demo-сторінка /niches/fintech — за потреби)
- ✅ Demo-компоненти для 5 AI кейсів — `2026-06-03`:
  - **TalentScanDemo** (`ai-resume-screener`): 3-панельний ATS — job spec + AI-ranked candidates (score 0-100, matched skills, red flags) + detail drawer (match breakdown bars, AI verdict). Shortlist/Reject actions.
  - **PriceSenseDemo** (`ai-price-optimizer`): таблиця 8 SKU з Current/CompAvg/AIRec/Margin/Apply, Apply All button, revenue before/after chart, product detail panel з extra revenue calc.
  - **DocSenseDemo** (`ai-doc-analyzer`): 2-панельна (document reader з highlight + analysis panel): risk score donut, 6 clause cards (RAG), detail: finding + recommendation + "Mark Resolved".
  - **MachineGuardDemo** (`ai-predictive-maintenance`): темна тема, grid 6 машин з health bars + vibr/temp, live metrics (useEffect tick), vibration timeline chart, alert feed, Create Work Order action.
  - **VisualFindDemo** (`ai-image-search`): sample image picker → 1.1s search animation → 6-card grid з similarity badge, wishlist ♥, Add to Bag. Empty state: how it works + stack.
  - Всі 5 зареєстровані в `demo/page.tsx` + `DEDICATED_DEMOS` в `portfolio/[slug]/page.tsx`
- ✅ `src/lib/data/portfolio.ts` — додано 4 нових ML кейси (2026-05-01):
  - `ml-customer-segmentation` — SegmentIQ (RFM + K-Means + CLV, fashion retail)
  - `ml-credit-scoring` — CreditIQ (LightGBM + SHAP, FinTech lending)
  - `ml-insurance-document-ocr` — DocAI Insurance (LayoutLM + Tesseract OCR, insurance)
  - `ml-energy-forecasting` — EnergyIQ (XGBoost + Prophet, smart building)

---

### AI / ML — Нові кейси 2026-05-01 (4 додаткових ML)

#### `ml-customer-segmentation` — SegmentIQ ✅
- **Назва:** SegmentIQ — ML Customer Segmentation & CLV
- **Клієнт:** Fashion-ритейл (мультибренд), 220 000+ клієнтів, Київ
- **Стек:** Python, scikit-learn, LightGBM, SHAP, FastAPI, PostgreSQL, Next.js
- **Колір:** `from-amber-600 to-orange-700` **Emoji:** 👥
- **Результат:** Email-виторг +94% при −38% відправлених листів. CLV точність 84%.

#### `ml-credit-scoring` — CreditIQ ✅
- **Назва:** CreditIQ — ML Credit Scoring Engine
- **Клієнт:** Онлайн-кредитор, 8 000+ заявок/міс, Харків
- **Стек:** Python, LightGBM, SHAP, FastAPI, PostgreSQL, Redis, Next.js
- **Колір:** `from-green-700 to-emerald-800` **Emoji:** 🏦
- **Результат:** NPL −34%. Автоматичне схвалення 71%. Час рішення: 15 хв → 45 сек.

#### `ml-insurance-document-ocr` — DocAI Insurance ✅
- **Назва:** DocAI Insurance — ML Document Processing
- **Клієнт:** Страхова компанія (топ-20 України), 40 000+ документів/міс
- **Стек:** Python, LayoutLM, Tesseract, Transformers, FastAPI, PostgreSQL, Next.js
- **Колір:** `from-slate-700 to-blue-900` **Emoji:** 📋
- **Результат:** Ручна обробка −82%. Час справи: 4.5 год → 28 хв. Помилки −91%.

#### `ml-energy-forecasting` — EnergyIQ ✅
- **Назва:** EnergyIQ — ML Energy Consumption Forecasting
- **Клієнт:** Мережа бізнес-центрів (12 об'єктів), 850 000 м², Київ
- **Стек:** Python, XGBoost, Prophet, FastAPI, InfluxDB, Grafana, MQTT, Next.js
- **Колір:** `from-yellow-600 to-lime-700` **Emoji:** ⚡
- **Результат:** Рахунки за електроенергію −23%. Пікове навантаження −18%. ROI: 7 місяців.
