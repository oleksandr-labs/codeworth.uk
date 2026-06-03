 AI/ML Нішеві посадкові сторінки — Стратегія

**Концепція:** Замість однієї загальної AI-сторінки — окремі SEO-посадкові під кожну індустрію.
Модель: "ми вже робили AI для X — ось кейс, ось рішення, ось ціна".

**Статус:** ✅ Реалізовано — 10 AI нішевих сторінок + хаб `/ai` побудовані відповідно до цієї стратегії
**Пріоритет:** Дуже високий — AI/ML = найвища маржа та найвищий попит

---

> ⚠️ **Незакреслені пункти ([ ]) — Phase 2/3:** OG-зображення потребують дизайнера/скрипту; layout-файли та relatedNichePage — Phase 3 (перелінковка між секціями).


## Архітектура URL

```
/en/ai/healthcare          — AI для медицини
/en/ai/fintech             — AI для фінансів
/en/ai/ecommerce           — AI для e-commerce
/en/ai/legal               — AI для юриспруденції
/en/ai/hr                  — AI для HR
/en/ai/manufacturing       — AI для виробництва
/en/ai/real-estate         — AI для нерухомості
/en/ai/education           — AI для освіти
/en/ai/hospitality         — AI для готельного бізнесу
/en/ai/marketing           — AI для маркетингу
```

Відповідні UK-дзеркала: `/uk/ai/[niche]`

## SEO-логіка

Кожна сторінка цілиться у кластер ключів:
- `"AI for [industry]"` / `"machine learning for [industry]"`
- `"[industry] AI solution Ukraine/UK"` / `"AI чат-бот для [ніші]"`
- Long-tail: `"як AI допомагає [ніша] зменшити витрати"`

## Структура кожної нішевої сторінки

```
Hero           — H1 з ключем, проблема ніші, CTA
Problem        — топ-3 болі клієнта в цій ніші
Solution       — які AI-рішення вирішують ці болі
CaseStudy      — 1–2 кейси з портфоліо (реальні метрики)
TechStack      — стек, релевантний для ніші
Packages       — 3 пакети з цінами
Faq            — 5–7 питань специфічних для ніші
CrossLinks     — посилання на AI/ML service + spoріднені ніші
CTA            — форма або Telegram
```

## Schema.org

- `Service` з `areaServed` та `serviceType` для ніші
- `FAQPage`
- `BreadcrumbList`: Home → AI Solutions → [Niche]
- `CaseStudy` через `CreativeWork` (з реальними метриками)

## Внутрішня перелінковка

```
/services/artificial-intelligence  →  всі /ai/[niche]  (секція "Рішення для вашої ніші")
/services/machine-learning         →  /ai/fintech, /ai/manufacturing, /ai/ecommerce
/portfolio/[ai-cases]              →  відповідна нішева сторінка
/blog/[ai-posts]                   →  відповідна нішева сторінка
/niches/[niche]                    →  /ai/[niche]  (CTA "AI для вашої ніші")
```

## Пріоритет розробки

> Кейси та blog posts позначені фактичними slug'ами з portfolio.ts та blog.ts (аудит 2026-05-02).

| Сторінка          | Пріоритет | Кейс у портфоліо (фактичний slug) | Blog post              |
|-------------------|-----------|------------------------------------|------------------------|
| ai/healthcare     | 🔴 1      | `ai-rag-healthcare-system` ✅      | `ai-rag-healthcare-gdpr` ✅ |
| ai/ecommerce      | 🔴 2      | `ai-image-search` ✅               | `ai-visual-search-ecommerce` ✅ |
| ai/fintech        | 🔴 3      | `ai-invoice-automation` ✅         | `ai-invoice-processing-automation` ✅ |
| ai/marketing      | 🟡 4      | `ai-content-studio` ✅             | `ai-content-generation-agency` ✅ |
| ai/hr             | 🟡 5      | `ai-resume-screener` ✅            | `ai-resume-screening-guide` ✅ |
| ai/hospitality    | 🟡 6      | `ai-voice-hotel-assistant` ✅      | `ai-voice-assistant-hospitality` ✅ |
| ai/education      | 🟢 7      | `ai-edtech-adaptive-lms` ✅        | `ai-edtech-personalized-learning` ✅ |
| ai/manufacturing  | 🟢 8      | `cv-quality-control` ✅            | `ai-quality-control-manufacturing` ✅ |
| ai/legal          | 🟢 9      | `ai-doc-analyzer` ✅               | `ai-contract-review-legal` ✅ |
| ai/real-estate    | 🟢 10     | `ai-property-platform` 🔲 новий   | `ai-property-description-generator` ✅ |

## Файли для розробки

- [x] ~~`src/app/[lang]/ai/layout.tsx`~~ — ✅ Реалізовано
- [x] ~~`src/app/[lang]/ai/page.tsx`~~ — ✅ Реалізовано: /ai overview hub
- [x] ~~`src/app/[lang]/ai/[niche]/page.tsx`~~ — ✅ Реалізовано: 10 нішевих сторінок
- [x] ~~`src/lib/data/aiNiches.ts`~~ — ✅ Реалізовано: aiNiches.ts з 10 нішами
- [x] ~~`src/lib/types/niches.ts`~~ — ✅ Реалізовано: AINicheData, MLNicheData типи
- [x] ~~Редиректи в `next.config.ts`~~ — ✅ Є redirect `/services/ai-ml` → `/services/artificial-intelligence`

## Посилання на окремі TODO

- [Healthcare AI](TODO_ai_healthcare.md)
- [E-commerce AI](TODO_ai_ecommerce.md)
- [FinTech AI](TODO_ai_fintech.md)
- [Marketing AI](TODO_ai_marketing.md)
- [HR AI](TODO_ai_hr.md)
- [Hospitality AI](TODO_ai_hospitality.md)
- [Education AI](TODO_ai_education.md)
- [Manufacturing AI](TODO_ai_manufacturing.md)
- [Legal AI](TODO_ai_legal.md)
- [Real Estate AI](TODO_ai_realestate.md)
- [Портфоліо стратегія](../portfolio/TODO_ai_portfolio_strategy.md)
- [AI продукти / рішення](../solutions/TODO_ai_solutions_catalog.md)
