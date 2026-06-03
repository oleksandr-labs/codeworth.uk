# AI/ML Портфоліо — Стратегія та Roadmap

**Статус:** ✅ Реалізовано — 2026-05-02: всі 7 кейсів є в portfolio.ts (ai-rag-healthcare-system, ai-invoice-automation, ai-content-studio, ai-voice-hotel-assistant, ai-edtech-adaptive-lms, ai-bilingual-rag-chatbot, ai-property-platform). Pending: додати поля relatedNichePage/industry до portfolio.ts записів
**Мета:** Покрити всі 10 AI-ніш кейсами з реальними метриками

---

## Поточний стан портфоліо (є в portfolio.ts)

| Кейс slug | Назва | Ніша | Статус |
|-----------|-------|------|--------|
| `ai-chatbot-saas` | SupportAI | Загальний AI | ✅ |
| `cv-quality-control` | QualityEye | Manufacturing | ✅ |
| `nlp-review-monitor` | BrandPulse | Marketing / E-com | ✅ |
| `ai-doc-analyzer` | DocSense | Legal | ✅ |
| `ai-resume-screener` | TalentScan | HR | ✅ |
| `ai-image-search` | VisualFind | E-commerce | ✅ |
| `fraud-detection-fintech` | FraudShield | FinTech | ✅ |
| `demand-forecast-retail` | DemandCast | Manufacturing / Retail | ✅ |
| `reco-engine-ecom` | RecoEngine | E-commerce | ✅ |
| `ml-churn-predictor` | ChurnShield | SaaS / General ML | ✅ |

## Нові кейси для додавання (з TODO_artificial_intelligence.md)

> **Примітка:** Аудит 2026-05-02 показав що більшість цих кейсів **вже є в portfolio.ts** але з іншими slug'ами.
> Потрібно оновити `relatedNichePage` і `industry` в існуючих записах, а не додавати нові.

| Плановий slug | Фактичний slug в portfolio.ts | Назва | Ніша | Blog | Статус |
|---------------|-------------------------------|-------|------|------|--------|
| `ai-medical-rag` | `ai-rag-healthcare-system` | MedAssist | Healthcare | `ai-rag-healthcare-gdpr` ✅ | ✅ Є в portfolio (різний slug) |
| `ai-invoice-processor` | `ai-invoice-automation` | InvoiceAI | FinTech | `ai-invoice-processing-automation` ✅ | ✅ Є в portfolio (різний slug) |
| `ai-content-studio` | `ai-content-studio` | ContentForge | Marketing | `ai-content-generation-agency` ✅ | ✅ Є в portfolio |
| `ai-voice-assistant` | `ai-voice-hotel-assistant` | VoiceIQ | Hospitality | `ai-voice-assistant-hospitality` ✅ | ✅ Є в portfolio (різний slug) |
| `ai-edtech-tutor` | `ai-edtech-adaptive-lms` | LearnAI | Education | `ai-edtech-personalized-learning` ✅ | ✅ Є в portfolio (різний slug) |
| `ai-bilingual-chatbot` | `ai-bilingual-rag-chatbot` | DualBot | General / IT | `ai-bilingual-chatbot-dual-market` | ✅ Є в portfolio (різний slug) |

## Нові кейси потрібні (під нішеві сторінки без покриття)

| Кейс slug | Назва | Ніша | Статус |
|-----------|-------|------|--------|
| `ai-property-platform` | EstateIQ | Real Estate | ✅ Реалізовано (2026-05-02) — AI chatbot + AVM + descriptions |

---

## Структура кожного portfolio кейсу

```ts
// portfolio.ts
{
  slug: "ai-medical-rag",
  title: "MedAssist — AI Clinical Knowledge Assistant",
  client: "Private multi-specialty clinic, 12 doctors, Kyiv",
  category: "AI / ML",
  niche: "Healthcare",
  year: 2026,
  complexity: "complex",
  highlight: true,
  tags: ["RAG", "GPT-4o", "Qdrant", "FHIR", "GDPR", "Clinical NLP"],
  stack: ["Python", "GPT-4o", "LangChain", "Qdrant", "FastAPI", "FHIR R4"],
  color: "from-teal-700 to-cyan-900",
  emoji: "🏥",
  // SEO
  metaTitle: "Medical AI RAG System — MedAssist Case Study | CodeNest",
  metaDescription: "How we built a GDPR-compliant clinical AI assistant. Search time −87%, prescribing errors −23%.",
  // Results
  results: [
    { metric: "Search time", before: "12 min", after: "90 sec", improvement: "−87%" },
    { metric: "Doctor satisfaction", value: "9.2/10" },
    { metric: "Prescribing errors", improvement: "−23%" },
  ],
  // Content
  challenge: "...",
  solution: "...",
  // Links
  relatedService: "artificial-intelligence",
  relatedNichePage: "/ai/healthcare",
  blogPost: "ai-rag-healthcare-gdpr",
}
```

## SEO по кожному кейсу

- `metaTitle`: унікальний, містить ключ + назву кейсу
- `metaDescription`: метрики + що зробили
- Schema.org `CreativeWork` + `quantitativeValue` для результатів
- Canonical: `/portfolio/[slug]`
- OG image: специфічна для кейсу або загальна `/og/portfolio/[slug].png`
- `relatedNichePage` → внутрішній link на нішеву AI-сторінку

## Перелінковка портфоліо ↔ нішеві сторінки

```
/portfolio/ai-medical-rag         ←→  /ai/healthcare
/portfolio/ai-invoice-processor   ←→  /ai/fintech
/portfolio/ai-content-studio      ←→  /ai/marketing
/portfolio/ai-voice-assistant     ←→  /ai/hospitality
/portfolio/ai-edtech-tutor        ←→  /ai/education
/portfolio/cv-quality-control     ←→  /ai/manufacturing
/portfolio/ai-doc-analyzer        ←→  /ai/legal
/portfolio/ai-resume-screener     ←→  /ai/hr
/portfolio/ai-image-search        ←→  /ai/ecommerce
/portfolio/ai-property-platform   ←→  /ai/real-estate
```

## Суміжний план: репозиціонування портфоліо

> **Cross-reference:** [TODO_repositioning_portfolio_products.md](../TODO_repositioning_portfolio_products.md) описує глобальне репозиціонування портфоліо як "готові продукти з ціною".
> Поля `priceFrom`, `deliveryDays`, `packageIncludes`, `marketplaceSlug` з того файлу **та**
> поля `industry`, `relatedAINichePage`, `relatedMLNichePage` з цього файлу — **усі йдуть в одну зміну типу `PortfolioCase`**.
> Координувати разом щоб уникнути дублювання PR.

## TODO — оновити існуючі кейси в portfolio.ts

- [x] Додати поле `relatedAINichePage` до кейсів — ✅ додано до: `ai-rag-healthcare-system` (/ai/healthcare), `ai-invoice-automation` (/ai/fintech), `ai-resume-screener` (/ai/hr), `ai-image-search` (/ai/ecommerce)
- [x] Додати поле `industry` до AI/ML кейсів — ✅ 10 кейсів оновлено (2026-05-03)
- [x] Додати поле `relatedMLNichePage` де є cross-link — ✅ додано до healthcare, fraud-detection кейсів
- [x] Додати `relatedAINichePage` до решти — ✅ додано до: `ai-content-studio` (/ai/marketing), `ai-voice-hotel-assistant` (/ai/hospitality), `ai-edtech-adaptive-lms` (/ai/education), `ai-doc-analyzer` (/ai/legal); `ai-bilingual-rag-chatbot` лишається без нішевої сторінки (generic SaaS)
- [x] ~~`ai-property-platform`~~ — ✅ Реалізовано (2026-05-02): EstateIQ, PropTech, /ai/real-estate

## TODO — Blog posts для нових кейсів

- [x] ~~`ai-rag-healthcare-gdpr`~~ — ✅ Реалізовано (blog.ts)
- [x] ~~`ai-invoice-processing-automation`~~ — ✅ Реалізовано (blog.ts)
- [x] ~~`ai-content-generation-agency`~~ — ✅ Реалізовано (blog.ts)
- [x] ~~`ai-voice-assistant-hospitality`~~ — ✅ Реалізовано (blog.ts)
- [x] ~~`ai-edtech-personalized-learning`~~ — ✅ Реалізовано (blog.ts)
- [x] ~~`ai-bilingual-chatbot-dual-market`~~ — ✅ Реалізовано (blog.ts)

## Фільтрація портфоліо по нішах

На `/portfolio` додати фільтр "Industry":
- Healthcare | FinTech | E-commerce | Marketing | HR | Hospitality | Education | Manufacturing | Legal | Real Estate

```tsx
// portfolioFilters.ts
export const industryFilters = [
  { label: "Healthcare", value: "healthcare" },
  { label: "FinTech", value: "fintech" },
  // ...
]
```

- [x] Додати поля `industry?`, `relatedAINichePage?`, `relatedMLNichePage?` до типу `Project` в `portfolio.ts` — ✅ зроблено (2026-05-03)
- [x] Додати фільтр по industry на `/portfolio` сторінці — ✅ реалізовано (2026-05-04): `PROJECT_INDUSTRIES` + violet-кольорові кнопки фільтрації у `PortfolioContent.tsx`
- [x] Оновити ключові AI/ML кейси з полем `industry` — ✅ 10 кейсів (пріоритет: AI/ML кейси)
