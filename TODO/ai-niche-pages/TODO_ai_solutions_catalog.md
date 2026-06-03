 AI Готові рішення — Каталог продуктів

**Концепція:** Packaged AI-продукти які можна продавати як "готове рішення" — швидше впровадження, нижчий поріг входу для клієнта, вища маржа через reuse.

**URL:** `/en/ai-solutions` або як extras у маркетплейсі `/marketplace/product/ai-*`
**Статус:** ✅ Реалізовано — 29/29 AI extras у каталозі. Повний каталог реалізовано (2026-05-02)

---

> ⚠️ **Незакреслені пункти ([ ]) — Phase 2/3:** OG-зображення потребують дизайнера/скрипту; layout-файли та relatedNichePage — Phase 3 (перелінковка між секціями).


## Типи AI-рішень

### Категорія A: Standalone AI Products (продаються як повноцінні продукти)

#### 1. RAG Knowledge Bot
- **Назва:** SmartBot — Knowledge Base AI Assistant
- **URL:** `/marketplace/product/smartbot-rag`
- **Ціна EN:** from £1,200 | UK: від 48 000 ₴
- **Що робить:** Завантажуєш документи → бот відповідає питаннями з вашої бази знань
- **Ідеально для:** Клієнтська підтримка, HR FAQ, медична документація, юридичні консультації
- **Технологія:** LangChain + Qdrant + GPT-4o / Claude
- **Час впровадження:** 2–3 тижні
- **Extras варіант:** `smartbot-rag` в `extras.ts`

#### 2. AI Invoice Processor
- **Назва:** InvoiceAI — Document Automation
- **URL:** `/marketplace/product/invoice-ai`
- **Ціна EN:** from £800 setup + £200/mo | UK: від 32 000 ₴ + 8 000/міс
- **Що робить:** Drag-and-drop рахунки → автоматичний парсинг → sync до Xero/QBO/1С
- **Ідеально для:** Бухгалтери, CFO SMB, аутсорсинг-бухгалтерія
- **Технологія:** GPT-4o Vision + FastAPI + Xero API
- **Extras варіант:** `ai-invoice-processor` в `extras.ts`

#### 3. AI Content Studio
- **Назва:** ContentForge — AI Content Engine
- **URL:** `/marketplace/product/content-forge`
- **Ціна EN:** from £500/mo | UK: від 20 000 ₴/міс
- **Що робить:** Brand Voice profile → bulk generation → editorial queue → CMS publish
- **Ідеально для:** Маркетингові агентства, e-commerce, медіа
- **Технологія:** GPT-4o + LangChain + BullMQ + CMS API

#### 4. AI Quiz & Assessment Generator
- **Назва:** QuizAI — Auto Assessment Builder
- **URL:** `/marketplace/product/quiz-ai`
- **Ціна EN:** from £600 | UK: від 24 000 ₴
- **Що робить:** Завантажуєш матеріал → AI генерує тести, флеш-картки, вправи
- **Ідеально для:** EdTech платформи, корпоративне навчання, школи
- **Extras варіант:** `ai-quiz-generator` в `extras.ts`

#### 5. AI Property Description Generator
- **Назва:** PropWrite — AI Real Estate Copywriter
- **URL:** `/marketplace/product/prop-write`
- **Ціна EN:** from £300 | UK: від 12 000 ₴
- **Що робить:** Введи параметри об'єкта → AI пише привабливий опис EN/UK
- **Ідеально для:** Агентства нерухомості, забудовники, Airbnb-хости
- **Extras варіант:** `ai-property-description` в `extras.ts`

#### 6. AI Bilingual Chatbot UK/EN
- **Назва:** DualBot — Bilingual AI Support
- **URL:** `/marketplace/product/dual-bot`
- **Ціна EN:** from £1,500 | UK: від 60 000 ₴
- **Що робить:** Один RAG-бот що відповідає EN або UK залежно від мови запиту
- **Ідеально для:** Компанії що працюють на UK + UA ринках (діаспора)
- **Extras варіант:** `ai-bilingual-chatbot` в `extras.ts`

---

### Категорія B: AI Add-ons до існуючих сайтів (extras)

> **Примітка:** Більшість AI extras вже реалізовані у `TODO/extras/ai/TODO_extras_ai.md` (28 позицій, категорія `"ai"` у `extras.ts`). Таблиця нижче відображає актуальний статус.
> Повний каталог: [TODO_extras_ai.md](../extras/ai/TODO_extras_ai.md)

| slug в extras.ts | Назва | EN ціна | UK ціна | Статус |
|-----------------|-------|---------|---------|--------|
| `ai-chatbot-rag` | RAG Knowledge Bot | £225 | 9 000 ₴ | ✅ Реалізовано |
| `ai-smart-search` | Semantic AI Search | £175 | 7 000 ₴ | ✅ Реалізовано (slug: `ai-smart-search`, не `ai-search-semantic`) |
| `ai-image-search` | AI Visual Search | £225 | 9 000 ₴ | ✅ Реалізовано (slug: `ai-image-search`, не `ai-visual-search`) |
| `ai-invoice-processor` | AI Invoice Processor | £200 | 8 000 ₴ | ✅ Реалізовано |
| `ai-quiz-generator` | AI Quiz Generator | £90 | 3 500 ₴ | ✅ Реалізовано |
| `ai-bilingual-chatbot` | Bilingual AI Bot (EN/UK) | £300 | 12 000 ₴ | ✅ Реалізовано |
| `ai-property-description` | AI Property Descriptions | £75 | 3 000 ₴ | ✅ Реалізовано |
| `ai-review-sentiment` | AI Review Sentiment Monitor | £90 | 3 500 ₴ | ✅ Реалізовано (slug: `ai-review-sentiment`, не `ai-review-monitor`) |
| `ai-copywriter` | AI Content Generator (Landing) | £125 | 5 000 ₴ | ✅ Реалізовано (broader: landing page copy) |
| `ai-chatbot-basic` | Basic AI Chatbot (scripted) | £350 | 14 000 ₴ | 🔲 Планується — genuinely new (non-RAG, rule-based + GPT fallback) |

---

### Категорія C: ML-моделі як сервіс (ML-as-a-Service)

Продаються як підписка (recurring revenue):

| Продукт | Що робить | EN | UK | Підписка |
|---------|-----------|----|----|---------|
| ChurnPredictor API | Прогноз відтоку клієнтів | £300/mo | 12 000 ₴/міс | ✅ |
| FraudShield API | Real-time fraud detection | £500/mo | 20 000 ₴/міс | ✅ |
| DemandForecast API | Прогноз попиту | £400/mo | 16 000 ₴/міс | ✅ |
| SentimentAPI | Аналіз відгуків | £200/mo | 8 000 ₴/міс | ✅ |

---

## Де розміщувати рішення

1. **Marketplace** (`/marketplace`) — готові продукти, купуєш одразу
2. **Extras** (`/extras`) — AI add-ons до існуючих сайтів
3. **Нішеві сторінки** (`/ai/[niche]`) — контекстно до ніші
4. **Services** (`/services/artificial-intelligence`, `/services/machine-learning`) — посилання на готові рішення

## Внутрішня перелінковка рішень

```
/extras → filter: "AI" → AI add-ons
/marketplace/product/smartbot-rag → пов'язана нішева /ai/healthcare, /ai/legal
/ai/[niche] → "Ready-made solutions for [niche]" → marketplace products
/services/artificial-intelligence → "Ready to launch faster?" → marketplace CTA
```

## TODO розробка

### extras.ts
- [x] ~~Додати категорію "AI" до фільтрів extras~~ — ✅ Реалізовано 2026-05-01 (28 позицій)
- [x] ~~Додати `ai-chatbot-basic`~~ — ✅ Реалізовано (2026-05-02): rule-based + GPT fallback, £14,000/14,000₴, категорія "ai"
- [x] Перевірити що slugs у Category A (smartbot-rag, invoice-ai тощо) — ✅ всі AI extras (30 шт.) є в `extras.ts` з category `"ai"`; нова сторінка `/ai-solutions` рендерить весь каталог

### marketplace
- [ ] ⚠️ Phase 2: Окремі marketplace pages для SmartBot, InvoiceAI, ContentForge — наразі продукти доступні через `/extras/[id]` + новий каталог `/ai-solutions`
- [x] Schema.org `SoftwareApplication` для кожного продукту — ✅ реалізовано (2026-05-04): `ItemList` з вкладеним `SoftwareApplication` для всіх 30 AI-продуктів у `/ai-solutions/page.tsx`

### /ai-solutions overview page
- [x] `src/app/[lang]/ai-solutions/page.tsx` — "AI Solutions Catalog" — ✅ реалізовано (2026-05-04): hero + popular section + grid всіх 30 AI-продуктів + breadcrumb schema + posilannja з `/ai` hub
- [x] Додано до sitemap.ts (`/ai-solutions`, priority 0.85, weekly) — ✅ (2026-05-04)

### ML-as-a-Service
- [x] Окрема секція "ML APIs" на `/services/machine-learning` — ✅ реалізовано (2026-05-04): inline-секція з 6 ML APIs (ChurnPredictor, FraudShield, DemandForecast, PropertyValuation, AnomalyDetect, MaintenanceAI) з прямою перелінковкою на відповідні ML niche pages
- [ ] ⚠️ Phase 2: Сторінки для ChurnPredictor, FraudShield, DemandForecast як marketplace products — потребують створення нових extras з категорією "ml" та окремих product pages
