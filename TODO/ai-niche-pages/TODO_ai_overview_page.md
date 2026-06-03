 AI Solutions — Overview Page

**URL:** `/en/ai` | `/uk/ai`
**H1 EN:** "AI Solutions for Every Industry"
**H1 UK:** "AI-рішення для кожної галузі"
**Статус:** ✅ Реалізовано
**Пріоритет:** 🔴 Критичний — хаб для всіх 10 нішевих AI-сторінок, link equity розподіл

---

> ⚠️ **Незакреслені пункти ([ ]) — Phase 2/3:** OG-зображення потребують дизайнера/скрипту; layout-файли та relatedNichePage — Phase 3 (перелінковка між секціями).


## Призначення

Сторінка `/en/ai` — це "AI Hub": вона збирає весь link equity від `/services/artificial-intelligence` та розподіляє на 10 нішевих посадкових. Без неї нішеві сторінки є "orphan pages" — Google не розуміє їх контекст у структурі сайту.

---

## Структура сторінки

### Hero
- **H1:** "AI Solutions for Every Industry"
- **Subhead:** From healthcare to e-commerce — AI that solves real business problems with measurable ROI.
- **CTA:** "Explore AI for Your Industry" (скролл вниз) + "Talk to AI Expert"
- **Stats strip:** 15+ AI projects delivered | 10 industries | from £1,200

### Industry Grid (10 карток)
Кожна картка: іконка + назва ніші + ключова метрика + посилання

| Ніша | Метрика | URL |
|------|---------|-----|
| Healthcare | Search time −87% | /ai/healthcare |
| E-commerce | Conversion +89% | /ai/ecommerce |
| FinTech | Processing 8min→25sec | /ai/fintech |
| Marketing | Content time −85% | /ai/marketing |
| HR | Screening 8min→45sec | /ai/hr |
| Hospitality | Desk load −47% | /ai/hospitality |
| Education | Completion 34%→71% | /ai/education |
| Manufacturing | Defects −96% | /ai/manufacturing |
| Legal | Analysis 2h→18min | /ai/legal |
| Real Estate | Valuation 2d→8sec | /ai/real-estate |

### How AI Helps Business (3 колонки)
1. **Automate** — repetitive tasks, document processing, customer support
2. **Predict** — customer behavior, demand, quality issues
3. **Personalize** — content, recommendations, communication

### Featured Case Studies (3 кейси з метриками)
- MedAssist — Healthcare | −87% search time
- VisualFind — E-commerce | +89% conversion
- FraudShield — FinTech | −89% fraud loss

### CTA блок
- "Not sure which AI solution fits your business?"
- Форма: industry dropdown + brief description → "Get a Free AI Audit"

---

## SEO технічне

```tsx
// metadata
title: "AI Solutions for Business | AI by Industry — CodeNest"
description: "Custom AI solutions for healthcare, e-commerce, fintech, legal, HR and more. Chatbots, RAG, computer vision, NLP. From £1,200. UK & Ukraine."

// Schema.org
CollectionPage: {
  name: "AI Solutions by Industry",
  description: "...",
  hasPart: [10 Service items — по одному на кожну нішу]
}
BreadcrumbList: Home → AI Solutions
```

### hreflang
```html
<link rel="alternate" hreflang="en" href="https://codenest.com.ua/en/ai" />
<link rel="alternate" hreflang="uk" href="https://codenest.com.ua/uk/ai" />
```

---

## Перелінковка

- `/services/artificial-intelligence` → "AI for your industry" → `/ai` (overview) → кожна ніша
- Footer: додати секцію "AI Solutions" → `/ai` + топ-5 ніш
- Header mega-menu: "AI Solutions" розділ з посиланням на `/ai`

---

## UK версія (₴)

- Такий самий контент, ціни в ₴
- Stats strip: від 48 000 ₴, 10 галузей, 15+ проєктів
- Industry grid — ті самі метрики
- Форма: "Отримайте безкоштовний AI-аудит"

---

## TODO розробка

- [x] ~~`src/data/aiOverview.ts`~~ — ✅ Дані в `src/lib/data/aiNiches.ts` (AI_NICHES array)
- [x] ~~`src/app/[lang]/ai/page.tsx`~~ — ✅ Реалізовано (SSG)
- [ ] ⚠️ Не потрібно: кожна `/ai/*` сторінка вже містить власні Header/Footer + повну metadata. Окремий layout додав би дублювання. Залишаємо як no-op (Phase 3 якщо знадобиться shared sub-navigation)
- [x] ~~Додати до `src/app/sitemap.ts`~~ — ✅ `/en/ai` + `/uk/ai` реалізовано
- [x] Додати до header mega-menu: секція "AI Solutions" — ✅ є в Header.tsx (lp("/ai"))
- [x] Додати до footer: колонка "AI Solutions" з 10 нішами — ✅ є в Footer.tsx
- [ ] OG image: `/og/ai/index.png` (1200×630, 10 іконок галузей) — потрібен дизайнер/скрипт
- [x] Hreflang: en↔uk alternate links — ✅ buildAlternates(lang, "/ai") у page.tsx
- [x] Internal link: `/services/artificial-intelligence` → `/ai` CTA блок — ✅ секція "AI/ML niche hub cross-link" у services/[slug]/page.tsx
