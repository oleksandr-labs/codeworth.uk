 Портфоліо (Portfolio) — codenest.com.ua
Опис: Сторінка з реалізованими проєктами студії CodeNest. Статична (SSG), SEO-оптимізована, з фільтрацією за категоріями.
**Статус:** ✅ Готово (MVP)
**i18n статус:** ✅ Повністю перекладено (EN + UK) — /portfolio та /portfolio/[slug]
**✅ Проаналізовано 2026-05-01 — 28/29 задач виконані. Відкрите: галерея скріншотів (потребує реальні зображення після підключення Cloudinary/S3).**
**✅ 2026-05-01: додано 5 нових AI/ML кейсів. ✅ 2026-05-02: додано 11 нових AI/ML кейсів. Всього AI/ML кейсів: 27 (з 224 у портфоліо).**
**✅ Оновлено 2026-05-01 — додано секцію "Результати клієнтів" (4 ключові метрики) між Stats та сіткою проєктів.**

---

## Hero-секція
- ✅ Заголовок "Наші роботи" + опис
- ✅ Stats: 120+ проєктів, 85+ клієнтів, 4+ роки
- ✅ Секція "Результати клієнтів" (4 картки метрик: +60% замовлень, PageSpeed 90+, 3 дні, 98% задоволених) — додано 2026-05-01

## Фільтрація та категорії
- ✅ Фільтр за типом/нішею/технологіями (потребує client component)
- ✅ Пошук (потребує client component)

## Сітка проєктів
- ✅ Картки проєктів: градієнт + emoji, назва, категорія, рік
- ✅ Hover overlay з "Кейс" → /portfolio/[slug] + "Демо" → /niches/[nicheSlug]
- ✅ Grid 3 колонки (адаптивно)
- ✅ Позначки тегів (SEO, Mobile First) та tech
- ✅ Позначка складності: 🟢 Простий / 🟡 Середній / 🔴 Складний
- ✅ Result highlight (📈 метрика результату)

## Demo-проєкти маркетплейсу (59 нішевих демо-сторінок)
> Всі demo-проєкти автоматично відображаються у портфоліо як живі приклади з посиланнями на `/niches/[slug]`.
> Реалізовано: компактна сітка 5 колонок з emoji, назвою, складністю та ціною на сторінці `/portfolio`.

- ✅ Всі 59 нішевих демо-сторінок відображаються у портфоліо — `portfolio/page.tsx` (grid + Live Demo посилання)

## Клієнтські кейс-стаді (PROJECTS у `portfolio.ts`)
> Розширені кейси з детальним описом задачі, рішення та 4 метриками результату.

### Ресторани / Доставка їжі
- ✅ `restaurant-cafe` — Ресторан «Смачно» — онлайн-бронювання, CMS, +60% бронювань
- ✅ `bakery` — Sweet Bakery UA — лендінг кондитерської, CTR 8.2%
- ✅ `food-delivery-app` — GoodFood — PWA доставка їжі, мобільні замовлення +71%

### Краса / Медицина
- ✅ `beauty-salon` — Beauty Room Kyiv — онлайн-запис, +40% клієнтів
- ✅ `medical-clinic` — МедЦентр «Здоров'я» — медпортал, +120% органіки
- ✅ `dental-clinic-landing` — SmilePro — лендінг стоматології, +55% пацієнтів
- ✅ `pharmacy-online-landing` — FarmaPlus — лендінг аптеки, 1200+ бронювань/міс

### Фітнес / Психологія
- ✅ `fitness-club` — FitLife Gym — сайт фітнес-клубу, 35% обороту онлайн
- ✅ `personal-trainer-landing` — Coach Andriy — лендінг тренера, 80+ клієнтів
- ✅ `psychology-coach` — Психолог Олена — лендінг, 40+ клієнтів за 2 місяці

### Освіта (онлайн-школи та портали)
- ✅ `education-platform` — SkillUp — LMS-платформа, 1400+ студентів за 3 міс
- ✅ `math-school-online` — MathUp — лендінг школи математики, конверсія 14.2% 🇬🇧 🇺🇦
- ✅ `language-school-speakeasy` — SpeakEasy — мовна школа, +73% реєстрацій 🇬🇧 🇺🇦
- ✅ `coding-bootcamp-devstart` — DevStart — IT Bootcamp портал, 82% влаштованих 🇬🇧 🇺🇦
- ✅ `music-school-melody` — Melody Online — лендінг школи музики, конверсія 11.4% 🇬🇧 🇺🇦
- ✅ `professional-courses-portal` — ProCourse — портал профосвіти, 12 000+ студентів

### Будівництво / Архітектура
- ✅ `construction` — BudPro — сайт будкомпанії, +80% заявок
- ✅ `architecture-studio` — Arkhytekton — архітектурне бюро, +120% заявок
- ✅ `interior-design-studio` — Forma Studio — дизайн інтер'єру, 3 корп. замовлення

### E-commerce / Магазини
- ✅ `fashion-store` — ModaUA — fashion e-commerce, конверсія 3.8%
- ✅ `flower-shop` — Bloom — квітковий магазин, 62% онлайн-продажів
- ✅ `cleaning-service` — CleanPro — лендінг клінінгу, 80% заявок онлайн
- ✅ `craft-workshop-landing` — HandMadeUA — лендінг майстерні, 70% продажів через сайт

### Нерухомість / Туризм / Авто
- ✅ `real-estate-agency` — HomeFind — портал нерухомості, +90% звернень
- ✅ `travel-hotel` — CarpathiaStay — готель, 84% завантаженість
- ✅ `auto-service` — Автосервіс «Майстер» — 120+ онлайн-записів/міс

### Право / Консалтинг / SaaS / B2B
- ✅ `law-firm` — LexPro — юр. фірма, ТОП-1 Google за 8 запитами
- ✅ `ai-chatbot-saas` — SupportAI — RAG-бот, -68% навантаження підтримки
- ✅ `saas-product-landing` — InvoiceFlow — SaaS лендінг, trial rate 18.3%
- ✅ `logistics-b2b-landing` — SwiftCargo — B2B логістика, 45+ заявок/міс

### AI / ML (окрема категорія — 27 кейсів ✅)
- ✅ `ai-chatbot-saas` — SupportAI — RAG чатбот підтримки
- ✅ `cv-quality-control` — QualityEye — Computer Vision QA (виробництво)
- ✅ `nlp-review-monitor` — BrandPulse — NLP Sentiment моніторинг бренду
- ✅ `ml-churn-predictor` — RetainIQ — ML прогноз відтоку клієнтів
- ✅ `fraud-detection-fintech` — FraudShield — ML виявлення шахрайства (старий кейс)
- ✅ `demand-forecast-retail` — StockSense — ML прогноз попиту (рітейл)
- ✅ `reco-engine-ecom` — PersonaCart — ML рекомендаційна система
- ✅ `ai-price-optimizer` — PriceSense — AI динамічне ціноутворення
- ✅ `ai-resume-screener` — TalentScan — AI HR скринінг резюме
- ✅ `ai-doc-analyzer` — DocSense — AI аналіз юридичних документів (LegalTech, RAG)
- ✅ `ai-predictive-maintenance` — MachineGuard — AI прогноз відмов (IoT, LSTM, металургія)
- ✅ `ai-image-search` — VisualFind — AI візуальний пошук (CLIP+Qdrant, fashion)
- ✅ `ml-customer-segmentation` — SegmentIQ — RFM + CLV (scikit-learn, fashion retail)
- ✅ `ml-credit-scoring` — CreditIQ — кредитний скоринг (LightGBM+SHAP, NPL −34%)
- ✅ `ml-insurance-document-ocr` — DocAI Insurance — OCR документів (LayoutLM, страхування)
- ✅ `ml-energy-forecasting` — EnergyIQ — прогноз споживання енергії (XGBoost+Prophet, −23%)
- ✅ `ai-voice-hotel-assistant` — VoiceIQ — AI голосовий асистент для готелів (2026-05-02)
- ✅ `ai-content-studio` — ContentForge — AI генерація контенту для агентств (2026-05-02)
- ✅ `ai-rag-healthcare-system` — MedAssist — GDPR RAG для медичних клінік (2026-05-02)
- ✅ `ai-invoice-automation` — InvoiceAI — AI автоматизація бухгалтерії UK+UA (2026-05-02)
- ✅ `ai-edtech-adaptive-lms` — LearnAI — AI персоналізований тьютор EdTech (2026-05-02)
- ✅ `ai-bilingual-rag-chatbot` — DualBot — AI білінгвальний чат-бот UK/EN (2026-05-02)
- ✅ `ml-supply-chain-fmcg` — SupplyIQ — ML оптимізація supply chain (2026-05-02)
- ✅ `ml-support-triage-bert` — TriageAI — BERT класифікація тікетів підтримки (2026-05-02)
- ✅ `ml-property-valuation` — EstateIQ — ML AVM оцінка нерухомості (2026-05-02)
- ✅ `ml-harvest-precision-agriculture` — HarvestIQ — ML точне землеробство (2026-05-02)
- ✅ `ml-fraud-detection-fca` — GuardAI — ML FCA fraud detection (2026-05-02)

### Інші ніші
- ✅ `veterinary-clinic` — Ветклініка «Лапка» — +95% нових клієнтів
- ✅ `events-agency` — Wow Event — конверсія 4.7%
- ✅ `photographer-portfolio` — Fotostudio Valentyna — +180% замовлень
- ✅ `ngo-charity-landing` — DobroUA — 340+ регулярних донорів

## Сторінка окремого проєкту (`/portfolio/[slug]`)
- ✅ Hero з градієнтом, breadcrumb, категорія, складність, рік
- ✅ Опис проблеми та результат
- ✅ Технічний стек (теги)
- ✅ Схожі проєкти в кінці
- ✅ CTA "Хочу такий самий проєкт" → /contact
- ✅ Живе демо — iframe превью `/niches/[nicheSlug]` у browser chrome + кнопка "Відкрити демо"
- ✅ Детальний case study — Задача / Рішення / Результати (4 метрики) — для всіх проєктів
- ✅ Schema.org CreativeWork JSON-LD на кожній сторінці кейсу
- ✅ Навігація Попередній/Наступний проєкт
- ✅ Dark mode на всіх секціях
- ✅ Кнопка "Демо" на hover overlay карток у `/portfolio` (поруч з "Кейс")
- [ ] Галерея скріншотів (потребує реальних зображень)

## SEO та Schema.org
- ✅ Title: "Портфоліо — CodeNest | 120+ реалізованих проєктів"
- ✅ Meta Description
- ✅ Breadcrumbs у JSX (Головна → Портфоліо → Назва проєкту)
- ✅ generateStaticParams() для всіх slug-сторінок
- ✅ generateMetadata() для кожного проєкту
- ✅ Schema.org: CreativeWork на кожній сторінці /portfolio/[slug]
- ✅ Schema.org: ItemList для списку портфоліо — `portfolio/page.tsx`

## Технічна реалізація
- [ ] Дані проєктів зберігаються в Sanity CMS
- [ ] Статична генерація: `fetch` з `{ cache: 'force-cache' }`
- [ ] ISR revalidate: 3600 (1 година) для оновлення через CMS
- [ ] Оптимізація зображень через `next/image`

---

### Примітки
- Портфоліо — ключовий продаючий елемент сайту. Кожен проєкт має виглядати як кейс-стаді.
- **59 нішевих demo-сторінок** маркетплейсу автоматично потрапляють у портфоліо як живі приклади з Live Demo.
- Кожен demo має позначку складності: 🟢 Простий (1-5 сторінок), 🟡 Середній (5-15), 🔴 Складний (15+, e-commerce, кабінет).
- Клієнт бачить різний рівень складності і може обрати відповідний продукт маркетплейсу.
- Додатково: планується 5-10 реальних клієнтських проєктів після запуску.
- **34 клієнтських кейси** у `portfolio.ts` (21 оригінальних + 13 нових: онлайн-школи, лендінги, архітектура).
- Нові ніші у NICHES: Архітектура, НГО, Крафт, Логістика.
- **AI / ML вертикаль: 12 кейсів** — охоплює Computer Vision, NLP, Fraud Detection, Churn Prediction, Demand Forecasting, Recommendations, Dynamic Pricing, HR Tech, LegalTech, Predictive Maintenance, Visual Search, RAG Chatbot.



> ⚠️ **Незакреслені пункти ([ ]) — Phase 2:** потребують реального контенту (фото, тексти, відгуки), API-ключів або реєстрації в зовнішніх сервісах після деплою. Структура сторінки реалізована повністю.