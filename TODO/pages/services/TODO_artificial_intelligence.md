 Штучний інтелект для бізнесу (Artificial Intelligence)
Опис: Сторінка послуги AI для бізнесу — GPT-боти з RAG, комп'ютерний зір, NLP, AI-персоналізація, GenAI-контент.
**URL:** `/services/artificial-intelligence`
**Попередній URL:** `/services/ai-ml` → 301 redirect → `/services/artificial-intelligence`
**Пріоритет:** Дуже високий — найзростаючий сегмент ринку
**Статус:** ✅ Розширено та покращено (2026-05-01)
**i18n статус:** ✅ Повністю перекладено (EN + UK) — /services/[slug]

---

> ⚠️ **Незакреслені пункти ([ ]) — Phase 2:** потребують реального контенту (кейси, відгуки, медіа) або підключення зовнішніх сервісів. Технічна реалізація сторінки завершена.


## Hero-секція
- ✅ H1: "Штучний інтелект для бізнесу"
- ✅ Підзаголовок: RAG, CV, NLP — AI без галюцинацій
- ✅ CTA: "Отримати пропозицію" + "Дивитися портфоліо"
- [ ] Анімована ілюстрація (нейромережа, потоки даних)

## Функції / Послуги
- ✅ GPT-бот з базою знань (RAG) — `service.features`
- ✅ Комп'ютерний зір (CV) — `service.features`
- ✅ NLP та аналіз тексту — `service.features`
- ✅ AI-персоналізація — `service.features`
- ✅ Генерація контенту (GenAI) — `service.features`
- ✅ Голосовий AI та розпізнавання мови — `service.features`

## Що входить
- ✅ Аналіз бізнес-задачі та вибір AI-підходу — `service.includes`
- ✅ Розробка RAG-пайплайну або CV-рішення — `service.includes`
- ✅ API-інтеграція у сайт, CRM або Telegram — `service.includes`
- ✅ Vector DB (Qdrant / Pinecone) — `service.includes`
- ✅ Тестування якості та точності моделі — `service.includes`
- ✅ Деплой на хмарну інфраструктуру — `service.includes`
- ✅ Документація та навчання команди — `service.includes`

## Пакети
- ✅ AI Assistant (від 15 000 грн) — GPT-бот для сайту або Telegram
- ✅ RAG Solution (від 40 000 грн) — AI навчений на контенті — `highlight: true`
- ✅ Computer Vision (від 50 000 грн) — CV-система для виробництва/медицини

## Кейси застосування (useCases)
- ✅ Підтримка клієнтів — RAG чат-бот 24/7
- ✅ E-commerce — AI-генерація описів, персоналізація
- ✅ Медицина — CV-аналіз знімків
- ✅ Виробництво — комп'ютерний зір для контролю якості
- ✅ HR та рекрутинг — AI-скринінг резюме
- ✅ Контент та маркетинг — AI-копірайтинг

## Портфоліо кейси

### ✅ Реалізовано (є в portfolio.ts)
- ✅ portfolio/ai-chatbot-saas — AI підтримка 24/7 (SaaS), −68% навантаження на підтримку
- ✅ portfolio/cv-quality-control — CV для контролю якості виробництва, −96% дефектів
- ✅ portfolio/nlp-review-monitor — NLP аналіз відгуків у реальному часі, 94% точність
- ✅ portfolio/ai-doc-analyzer (DocSense) — AI аналіз юридичних документів, 2 год → 18 хв
- ✅ portfolio/ai-resume-screener (TalentScan) — AI HR-скринінг резюме, 8 хв → 45 сек, точність 89%
- ✅ portfolio/ai-image-search (VisualFind) — AI visual search для fashion e-commerce, конверсія +89%

### ✅ Нові кейси — реалізовано (2026-05-02)

#### `ai-voice-assistant` — VoiceIQ
- **Статус:** ✅ Реалізовано — додано до `portfolio.ts` (slug: `ai-voice-hotel-assistant`)
- **Highlight:** ✨ true — унікальний кейс, голосовий AI для гостинності
- **EN назва:** VoiceIQ — AI Voice Assistant for Hospitality
- **Blog:** `ai-voice-assistant-hospitality` — "How We Built a Multilingual Voice AI for Hotels"
- **Розширення:** ресторанне замовлення, конференц-зали, 4+ мови, WhatsApp інтеграція
- **Назва:** VoiceIQ — AI Голосовий Асистент для Готелю
- **Клієнт:** Мережа бутік-готелів (4 об'єкти, 380 номерів), Одеса
- **Категорія:** AI / ML
- **Ніша:** IT / SaaS (Hospitality)
- **Рік:** 2026
- **Складність:** complex
- **Теги:** Voice AI, Whisper, GPT-4o, WebSocket, NLU, Multilingual, Hospitality
- **Стек:** Python, OpenAI Whisper, GPT-4o, FastAPI, WebSocket, Redis, Next.js, MQTT
- **Колір:** `from-cyan-700 to-blue-900`
- **Emoji:** 🎙️
- **Опис:** Голосовий AI-асистент для готелю: гості через планшет у номері або QR-кнопку говорять запити природньою мовою (UK/EN/RU) — замовлення room service, виклик прибиральниці, запит розкладу, бронювання СПА. Whisper для розпізнавання, GPT-4o для intent detection та відповіді, MQTT для виконання дій у PMS-системі готелю.
- **Результат:** Навантаження на рецепцію −47%. NPS гостей +31 пунктів. Room service через голос: 73% всіх замовлень.
- **Деталі кейсу:**
  - Challenge: 4 готелі отримували 600+ дзвінків на добу на рецепцію — більшість типові запити (room service, трансфер, прибирання). Іноземні гості мали труднощі через мовний бар'єр.
  - Solution: Tablet-пристрій у кожному номері з wake word "Hey Hotel". Whisper транскрибує запит (3 мови), GPT-4o визначає intent + параметри (страва, час, послуга), FastAPI виконує дію через PMS API. Fallback: "Підключаю оператора" при низькій впевненості. Дашборд: топ запитів, пікові години, мовна статистика.
  - Results: Навантаження на рецепцію −47%, NPS +31 пунктів, room service через голос 73%, час виконання замовлення −38%

---

#### `ai-content-studio` — ContentForge
- **Статус:** ✅ Реалізовано — додано до `portfolio.ts` (slug: `ai-content-studio`)
- **Highlight:** false
- **EN назва:** ContentForge — AI Content Generation Studio
- **Blog:** `ai-content-generation-agency` — "How AI Cut Our Content Production Time by 85%"
- **Розширення:** White-label SaaS для продажу агентствам, соцмедіа auto-scheduler, brand safety scoring
- **Назва:** ContentForge — AI Content Generation Studio
- **Клієнт:** Digital-агентство (50+ клієнтів, SMM + SEO), Київ
- **Категорія:** AI / ML
- **Ніша:** IT / SaaS (MarTech)
- **Рік:** 2026
- **Складність:** complex
- **Теги:** GenAI, GPT-4o, LangChain, Content Pipeline, BrandVoice, Bulk Generation, Editorial
- **Стек:** Python, OpenAI GPT-4o, LangChain, FastAPI, PostgreSQL, Redis, BullMQ, Next.js
- **Колір:** `from-violet-700 to-fuchsia-900`
- **Emoji:** ✍️
- **Опис:** Внутрішня AI-платформа агентства для масштабованої генерації контенту: brand voice profiles для кожного клієнта, bulk-генерація SEO-статей / соцмедіа-постів / email-кампаній, автоматизований editorial pipeline (генерація → AI self-review → human approval → публікація). Scheduled queue через BullMQ, CMS-інтеграція (WordPress, Ghost, Webflow).
- **Результат:** Час написання статті: 4 год → 35 хв. Контент-план виконується на 100% (vs 67% раніше). Штат авторів скорочено на 40% при ×2.5 обсягу контенту.
- **Деталі кейсу:**
  - Challenge: Агентство не встигало виконувати контент-плани для 50+ клієнтів. Автори писали однотипно, без урахування tone of voice бренду. Тривале onboarding нових клієнтів (3 тижні до першої публікації).
  - Solution: Brand Voice Profiler — AI аналізує 20–50 існуючих матеріалів клієнта → генерує профіль (тон, словниковий запас, структура, заборонені слова). Bulk generator: задаєш тематики → система генерує N статей з унікальним кутом + internal links + meta. Editorial queue: редактор бачить AI-чернетку + AI self-critique → схвалює або править → auto-publish в CMS.
  - Results: Час написання 4 год → 35 хв (−85%), виконання контент-плану 67% → 100%, штат авторів −40% при ×2.5 обсягу

---

#### `ai-medical-rag` — MedAssist
- **Статус:** ✅ Реалізовано — додано до `portfolio.ts` (slug: `ai-rag-healthcare-system`)
- **Highlight:** ✨ true — медицина + GDPR + self-hosted = рідкісна комбінація
- **EN назва:** MedAssist — AI Clinical Knowledge Assistant
- **Blog:** `ai-rag-healthcare-gdpr` — "Building a GDPR-Compliant RAG System for a Private Clinic"
- **Розширення:** NHS-адаптація (UK SNOMED CT), AI-скринінг симптомів для пацієнтів, drug interaction checker
- **Назва:** MedAssist — AI Clinical Knowledge Assistant
- **Клієнт:** Приватна багатопрофільна клініка (12 лікарів, 400+ пацієнтів/день), Київ
- **Категорія:** AI / ML
- **Ніша:** Медицина
- **Рік:** 2026
- **Складність:** complex
- **Теги:** RAG, GPT-4o, Qdrant, FHIR, GDPR, Clinical NLP, Medical AI, LangChain
- **Стек:** Python, GPT-4o, LangChain, Qdrant (self-hosted), FastAPI, PostgreSQL, Next.js, FHIR R4
- **Колір:** `from-teal-700 to-cyan-900`
- **Emoji:** 🏥
- **Опис:** RAG-система на медичній документації клініки: AI-асистент для лікарів відповідає на клінічні запити (протоколи лікування, дозування, взаємодія препаратів, анамнез конкретного пацієнта), спираючись виключно на верифіковані джерела — протоколи МОЗ, наукові статті (PubMed), внутрішня документація. Всі дані зберігаються на серверах клініки (GDPR + Закон про персональні дані), Qdrant self-hosted.
- **Результат:** Час пошуку клінічної інформації: 12 хв → 90 сек (−87%). Задоволеність лікарів 9.2/10. Помилки у призначеннях −23%.
- **Деталі кейсу:**
  - Challenge: Лікарі витрачали 10–15 хв на пошук актуальних протоколів і перевірку взаємодії препаратів. Частина користувалась застарілими документами. Контекст пацієнта (алергії, хронічні хвороби) треба було шукати в різних системах.
  - Solution: Knowledge base: 1 200+ протоколів МОЗ + 8 000 PubMed-статей + 3 роки анамнезів (анонімізовано). LangChain RAG пайплайн із source citation — відповідь завжди містить посилання на джерело та рік. Інтеграція з FHIR R4 — запит "пацієнт Іваненко, поточні препарати" тягне актуальні дані з MIS. Qdrant self-hosted на сервері клініки — жодних даних у хмарі.
  - Results: Пошук інформації −87% часу, задоволеність 9.2/10, помилки в призначеннях −23%, onboarding нового лікаря −2 тижні

---

#### `ai-invoice-processor` — InvoiceAI
- **Статус:** ✅ Реалізовано — додано до `portfolio.ts` (slug: `ai-invoice-automation`)
- **Highlight:** ✨ true — масовий ринок: всі SMB в UK і UA
- **EN назва:** InvoiceAI — AI Accounting Automation
- **Blog:** `ai-invoice-processing-automation` — "How AI Cut Invoice Processing Time by 95% for 180 SMBs"
- **Розширення:** Bank reconciliation AI, expense policy checker, multi-currency, VAT reclaim assistant
- **Назва:** InvoiceAI — AI Accounting Automation
- **Клієнт:** Бухгалтерська аутсорсингова фірма (180+ клієнтів-SMB), Лондон / Київ
- **Категорія:** AI / ML
- **Ніша:** FinTech / Accounting
- **Рік:** 2026
- **Складність:** complex
- **Теги:** OCR, GPT-4o Vision, Invoice Processing, Xero API, Making Tax Digital, Accounting Automation
- **Стек:** Python, GPT-4o Vision, FastAPI, PostgreSQL, Next.js, Xero API, QuickBooks API, Redis
- **Колір:** `from-green-700 to-emerald-900`
- **Emoji:** 🧾
- **Ринки:** 🇬🇧 UK (Making Tax Digital compliance) + 🇺🇦 UA (заміна ручної обробки 1С/M.E.Doc)
- **Опис:** AI-платформа для автоматизації бухгалтерії: GPT-4o Vision витягує дані з рахунків-фактур, накладних, актів (PDF, фото, скан) — постачальник, сума, дата, ПДВ, категорія витрат. Автоматична категоризація за правилами клієнта. Sync до Xero / QuickBooks (UK) або 1С-сумісний CSV (UA). Дашборд: статус обробки, аномалії, витрати за категоріями.
- **Результат:** Час обробки 1 документа: 8 хв → 25 сек (−95%). Помилки ручного введення −99%. Бухгалтер обслуговує ×3.2 більше клієнтів.
- **Деталі кейсу:**
  - Challenge: Аутсорсинг-бухгалтерія обробляла 4 000+ документів/міс вручну. Помилки введення → штрафи клієнтів від HMRC (UK) / ДПС (UA). Сезонні піки (VAT quarter) — наймали тимчасових співробітників.
  - Solution: Drag-and-drop portal: клієнт завантажує документи → GPT-4o Vision парсить структуровані поля → confidence score для кожного поля → якщо < 0.90 — "needs review" queue для бухгалтера. Правила категоризації по клієнту (раз налаштовані). UK: Xero API push + MTD VAT submission. UA: 1С-сумісний XML-експорт.
  - Results: Обробка 8 хв → 25 сек (−95%), помилки −99%, capacity ×3.2, сезонні найми скасовано

---

#### `ai-edtech-tutor` — LearnAI
- **Статус:** ✅ Реалізовано — додано до `portfolio.ts` (slug: `ai-edtech-adaptive-lms`)
- **Highlight:** false
- **EN назва:** LearnAI — AI Personalized Tutoring Platform
- **Blog:** `ai-edtech-personalized-learning` — "AI Tutoring: How One Language School Doubled Completion Rates"
- **Розширення:** Parent dashboard, certificate generation, B2B корпоративне навчання, CEFR mapping UK
- **Назва:** LearnAI — AI Personalized Tutoring Platform
- **Клієнт:** Онлайн-школа вивчення англійської (2 400 активних студентів), Київ → UK expansion
- **Категорія:** AI / ML
- **Ніша:** Освіта
- **Рік:** 2026
- **Складність:** complex
- **Теги:** EdTech, GPT-4o, Adaptive Learning, NLP, Speech Assessment, Personalization, Gamification
- **Стек:** Python, OpenAI GPT-4o, Whisper, FastAPI, PostgreSQL, Redis, Next.js, WebRTC
- **Колір:** `from-sky-600 to-indigo-800`
- **Emoji:** 🎓
- **Ринки:** 🇬🇧 UK (репетиторство £6B ринок, EdTech hub) + 🇺🇦 UA (вивчення англійської, онлайн-освіта)
- **Опис:** AI-тьютор що адаптується до рівня кожного студента: GPT-4o проводить розмовні практики, виправляє граматику з поясненнями, генерує персоналізовані вправи на слабкі місця. Whisper оцінює вимову (phoneme-level feedback). Гейміфікація: XP, streaks, league table. Вчитель бачить дашборд прогресу всіх студентів.
- **Результат:** Completion rate курсу: 34% → 71%. Оцінка рівня CEFR за 8 тижнів vs 14 тижнів стандартна програма. NPS студентів: 74.
- **Деталі кейсу:**
  - Challenge: Школа мала 2 400 студентів і 18 вчителів — неможливо давати персональний feedback кожному. Стандартна програма не адаптувалася до рівня: сильні нудьгували, слабкі відставали. Completion rate 34%.
  - Solution: Diagnostic test при реєстрації → CEFR рівень → персоналізований learning path. Щоденна 15-хвилинна AI-розмова: GPT-4o як співрозмовник із заданою темою + soft correction ("Краще сказати…"). Whisper аналізує запис → phoneme score + топ-3 звуки для покращення. Слабкі місця → автогенерація вправ на них наступного дня.
  - Results: Completion 34% → 71%, темп вивчення ×1.75, вчитель замість 30 → 96 студентів, NPS 74

---

#### `ai-bilingual-chatbot` — DualBot
- **Статус:** ✅ Реалізовано — додано до `portfolio.ts` (slug: `ai-bilingual-rag-chatbot`)
- **Highlight:** ✨ true — унікальна диференціація CodeNest на UK + UA ринках
- **EN назва:** DualBot — AI Bilingual Chatbot UK/EN
- **Blog:** `ai-bilingual-chatbot-dual-market` — "One Bot, Two Markets: Building a UK/UA Bilingual RAG Chatbot"
- **Розширення:** WhatsApp (UK), Viber (UA), 3+ мов (PL, DE для діаспори), Live handoff API
- **Назва:** DualBot — AI Білінгвальний Чат-бот UK/EN
- **Клієнт:** Мережа сервісних центрів (побутова техніка, 8 локацій), Лондон + Київ
- **Категорія:** AI / ML
- **Ніша:** IT / SaaS
- **Рік:** 2026
- **Складність:** medium
- **Теги:** RAG, GPT-4o, Bilingual, UK/EN, LangChain, Dual Market, Diaspora, Customer Support
- **Стек:** Python, GPT-4o, LangChain, Qdrant, FastAPI, Next.js, Telegram Bot API
- **Колір:** `from-blue-700 to-indigo-900`
- **Emoji:** 🌐
- **Ринки:** 🇬🇧 UK + 🇺🇦 UA — один бот, два ринки, дві мови
- **Опис:** RAG-чат-бот що автоматично відповідає мовою запиту — UK або EN. Одна база знань (прайси, гарантія, FAQ, графік роботи) → бот відповідає будь-якою мовою. Лондонські та київські клієнти бачать відповідну локалізацію (ціни £/₴, контакти, локації). Fallback на живого оператора в робочий час.
- **Результат:** Обробка запитів без оператора: 61% (EN) та 58% (UA). Час першої відповіді: миттєво vs 4 год раніше. Підтримка 24/7 в обох ринках без додаткового штату.
- **Деталі кейсу:**
  - Challenge: Компанія відкрила локації в Лондоні (для діаспори) та Києві. Дві окремі команди підтримки — дублювання витрат. Клієнти в Лондоні писали EN, в Києві — UA, але іноді навпаки (діаспора).
  - Solution: Language detection → відповідна локаль (мова + ціна + контакт). LangChain RAG на спільній базі знань з UK/EN версіями відповідей. Один Qdrant індекс з metadata locale. Telegram + Web widget. Escalation: "Підключаю оператора" / "Connecting you to an agent" залежно від мови.
  - Results: 61%/58% автономних відповідей, витрати на підтримку −44%, час відповіді 4 год → миттєво, NPS +27

## Покращення (TODO)
- ✅ **Секція "Технологічний стек"** — OpenAI / Claude / LangChain / Qdrant / FastAPI / Python / Docker — `service.techStack` + rendered у `services/[slug]/page.tsx`
- ✅ **Live Demo** — `AiCopywriterDemo` вбудовано через `demoComponent: "ai-copywriter"` у `services/[slug]/page.tsx`
- ✅ **Порівняльна таблиця** — розширено до 4 підходів: Prompt Engineering / RAG / Fine-tuning / Computer Vision (2026-05-01)
- ✅ **Cross-link до Machine Learning** — блок "Потрібна кастомна ML-модель?" — `service.crossLink` + rendered у page.tsx
- ✅ **FAQ: GDPR/приватність** — "Де зберігаються дані клієнтів?" — `service.faq`
- ✅ **FAQ розширено до 8 питань** — додано: строки впровадження, CRM-інтеграція (2026-05-01)
- ✅ **Оновити blog relatedPosts** — додано тег "Artificial Intelligence" до 3 постів + `ai-computer-vision-business` (2026-05-01)
- ✅ **`longDescription` з метриками** — −68% навантаження підтримки, −96% дефектів, ×12 контент (2026-05-01)
- ✅ **Features з реальними кейсами** — SupportAI, QualityEye, BrandPulse, DocSense у кожній фічі (2026-05-01)
- ✅ **Tech stack розширено до 13** — +Pinecone, YOLOv8, OpenCV, Whisper, HuggingFace (2026-05-01)
- ✅ **Before/After секція додана** — 5 метрик: підтримка, аналіз документів, дефекти CV, відгуки NLP, GenAI-контент (2026-05-01)
- ✅ **Packages — конкретні feature-списки** — деталі по документах, аналітиці, підтримці (2026-05-01)
- ✅ **Case studies — реальні кейси** — SupportAI (−68%), QualityEye (−96%), DocSense (18 хв) (2026-05-01)
- ✅ **Повний EN переклад** — features, includes, packages, faq, processSteps, caseStudies, useCases, comparisonTable, beforeAfter (2026-05-01)
- ✅ **page.tsx: generic beforeAfter заголовок** — "до і після впровадження" замість хардкоду "ML" (2026-05-01)
- ✅ **FAQ розширено до 13 питань** — +GDPR/self-hosted, +RAG vs GPT, +білінгвальний бот UK/UA, +MTD Making Tax Digital (2026-05-02)
- ✅ **Нові portfolio кейси** — VoiceIQ, ContentForge, MedAssist, InvoiceAI, LearnAI, DualBot — додано до `portfolio.ts` (2026-05-02)
- ✅ **Blog posts написано** — ai-rag-healthcare-gdpr, ai-edtech-personalized-learning, ai-voice-assistant-hospitality, ai-content-generation-agency (2026-05-02)
- ✅ **Нові glossary терміни** — RAG, MTD, FHIR R4 — додано до `glossary.ts` (2026-05-02)
- ✅ **OG image** — dynamic route `/og/services/[slug]/route.tsx` — brain icon, violet gradient, chips (2026-05-02)
- ✅ **Нові нішеві демо** — EdTech (адаптивний тест), Hospitality (voice assistant UI) — `AiEdtechDemo.tsx` + `AiHospitalityDemo.tsx`, вбудовано в `page.tsx` (2026-05-02)
- ✅ **FAQ: Порівняння AI vs ML** — додано до `faq` + EN переклад (2026-05-02)
- ✅ **Нові portfolio кейси** — VoiceIQ, ContentForge, MedAssist, InvoiceAI, LearnAI, DualBot — додано до `portfolio.ts` (2026-05-02)
- ✅ **Blog posts для нових вертикалей** — ai-voice-assistant-hospitality, ai-content-generation-agency, ai-rag-healthcare-gdpr, ai-edtech-personalized-learning, ai-bilingual-chatbot-dual-market — написано (2026-05-02)
- ✅ **useCases розширити** — додано: FinTech/Accounting, Освіта (EdTech), Готельний бізнес (Hospitality) — UA + EN (2026-05-02)
- ✅ **Нові extras у каталозі** — ai-invoice-processor, ai-quiz-generator, ai-bilingual-chatbot, ai-property-description — реалізовано в `extras.ts` + `extras-en.ts` (2026-05-02)
- ✅ **Нові glossary терміни** — RAG, MTD, FHIR R4 — вже були в `glossary.ts` (2026-05-02)

## Технологічний стек
- ✅ Python: FastAPI, LangChain, LlamaIndex
- ✅ Моделі: OpenAI GPT-4o, Claude 3.5 Sonnet, Gemini, LLaMA 3
- ✅ Vector DB: Pinecone, Weaviate, Qdrant
- ✅ Computer Vision: YOLO, OpenCV, Roboflow
- ✅ Деплой: Docker, Kubernetes, AWS / GCP / self-hosted

## SEO
- ✅ Title: "Штучний інтелект для бізнесу | AI-розробка Україна — CodeNest"
- ✅ keyword: "штучний інтелект для бізнесу Україна"
- ✅ metaDescription: від 15 000 грн
- ✅ Schema.org: Service + FAQPage + BreadcrumbList
- ✅ Перевірити relatedPosts по новому slug — перевірено, фільтр працює коректно (2026-05-01)

---

### Примітки
- Стара URL `/services/ai-ml` → 301 redirect → `/services/artificial-intelligence` (в `next.config.ts`)
- Глосарій: LLM, Generative AI, RAG, Prompt Engineering → `relatedService: "artificial-intelligence"` ✅
- Футер: "Штучний інтелект (AI)" → `/services/artificial-intelligence` ✅
- Акцент: RAG = відповіді без галюцинацій, тільки з вашої бази знань — головна диференціація
