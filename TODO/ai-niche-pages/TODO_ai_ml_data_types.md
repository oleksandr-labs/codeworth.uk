 AI / ML Нішеві сторінки — TypeScript типи

**Призначення:** Визначення TypeScript-інтерфейсів для даних AI та ML нішевих сторінок.
**Файли де реалізовувати:**
- `src/lib/data/aiNiches.ts` — дані для 10 AI нішевих сторінок
- `src/lib/data/mlNiches.ts` — дані для 10 ML нішевих сторінок
- `src/lib/types/niches.ts` — спільні TypeScript інтерфейси

---

> ⚠️ **Незакреслені пункти ([ ]) — Phase 2/3:** OG-зображення потребують дизайнера/скрипту; layout-файли та relatedNichePage — Phase 3 (перелінковка між секціями).


## Базовий інтерфейс (спільний для AI та ML)

```ts
// src/lib/types/niches.ts

export interface NicheKeyword {
  primary: string           // основний keyword для H1/title
  secondary: string[]       // LSI keywords
  localEn?: string[]        // "AI for healthcare London", "AI clinic Manchester"
  localUk?: string[]        // "ШІ для медицини Київ", "AI клініка Харків"
}

export interface NicheCase {
  slug: string              // portfolio case slug (з portfolio.ts)
  name: string              // назва продукту (MedAssist, InvoiceAI...)
  metric: string            // ключова метрика: "Search time −87%"
  blogSlug?: string         // slug blog-посту (з blog.ts)
}

export interface NicheFAQ {
  question: string          // EN питання
  questionUk: string        // UK питання
  answer: string            // EN відповідь (40–80 слів для Featured Snippets)
  answerUk: string          // UK відповідь
}

export interface NichePackage {
  name: string              // "Starter" | "Professional" | "Enterprise"
  priceGBP: number          // EN ціна в £
  priceUAH: number          // UK ціна в ₴
  deliveryWeeks: number
  includes: string[]        // 4–6 пунктів що входить
}

export interface BaseNicheData {
  // Ідентифікація
  slug: string              // "healthcare" | "ecommerce" | ...
  industry: string          // "Healthcare" | "E-commerce" | ... (для фільтрів)

  // Локалізований контент
  h1En: string
  h1Uk: string
  subtitleEn: string
  subtitleUk: string
  descriptionEn: string     // 150–200 слів, для meta description (перші 160 символів)
  descriptionUk: string

  // Ціноутворення
  priceFromGBP: number      // from £X,XXX
  priceFromUAH: number      // від XXX 000 ₴

  // SEO
  metaTitleEn: string       // до 60 символів
  metaTitleUk: string
  metaDescriptionEn: string // до 160 символів, містить keyword + метрику
  metaDescriptionUk: string
  keywordsEn: NicheKeyword
  keywordsUk: NicheKeyword

  // Контент сторінки
  packages: NichePackage[]  // 3 пакети: Starter / Professional / Enterprise
  cases: NicheCase[]        // 2–3 кейси з portfolio.ts
  faq: NicheFAQ[]           // 5–7 питань (FAQPage Schema.org)

  // Внутрішні посилання
  relatedServiceSlug: string        // "artificial-intelligence" | "machine-learning"
  relatedNichePageEn: string        // "/en/ai/healthcare"
  relatedNichePageUk: string        // "/uk/ai/healthcare"
  crossLinkMLNiche?: string         // "/ml/healthcare" (cross-link до ML-версії)
  crossLinkAINiche?: string         // "/ai/healthcare" (cross-link до AI-версії, для ML сторінок)

  // Schema.org
  schemaServiceType: string         // "AI Software Development" | "Machine Learning"
  schemaPriceGBP: string            // "3500" (рядок для Schema.org)
}
```

---

## AI-специфічний інтерфейс

```ts
// src/lib/types/niches.ts

export interface AITechnology {
  name: string              // "RAG", "GPT-4o", "LangChain"
  description: string       // коротко що воно робить (1 речення)
}

export interface AINicheData extends BaseNicheData {
  // AI-специфічно
  technologies: AITechnology[]       // стек (RAG, GPT-4o, Qdrant тощо)
  implementationWeeks: [number, number]  // [min, max] тижнів впровадження
  integrations: string[]             // ["Xero", "Slack", "CRM"] — що інтегрується

  // Для overview /ai сторінки
  iconEmoji: string                  // "🏥" | "🛒" | ...
  cardTagline: string                // "Clinical RAG + GDPR" (1 рядок на картці overview)
  cardMetricEn: string               // "Search time −87%" (highlight метрика на картці)
}
```

---

## ML-специфічний інтерфейс

```ts
// src/lib/types/niches.ts

export interface DataRequirement {
  dataType: string          // "Transaction history"
  minVolume: string         // "50,000+ records"
  format: string            // "CSV, PostgreSQL, API"
  purpose: string           // "Train fraud detection model"
}

export interface ROIMetric {
  metricName: string        // "Fraud loss reduction"
  value: string             // "−£240K/year"
  timeframe: string         // "12 months"
  source: string            // "FraudShield case (2025)"
}

export interface MLNicheData extends BaseNicheData {
  // ML-специфічно
  algorithms: string[]              // ["XGBoost", "LSTM", "Isolation Forest"]
  minDatasetSize: string            // "50,000 records" | "12 months of data"
  dataRequirements: DataRequirement[]  // таблиця вимог до даних
  roiMetrics: ROIMetric[]           // ROI-метрики для кейсів
  roiTimeframe: string              // "ROI в 4–6 місяців" (загальне)
  xaiRequired: boolean              // чи потрібна XAI/explainability (banking, healthcare = true)
  regulatoryContext?: string        // "FCA Model Risk SS1/23", "NICE Guidelines", "GDPR Art.22"
  mlopsRequired: boolean            // чи включає MLOps (моніторинг, перенавчання)

  // Для overview /ml сторінки
  iconEmoji: string
  cardTagline: string
  cardMetricEn: string
  audienceType: "SMB" | "Mid-Market" | "Enterprise"
}
```

---

## Дані — приклад реалізації

```ts
// src/lib/data/aiNiches.ts

import type { AINicheData } from "@/lib/types/niches"

export const AI_NICHES: AINicheData[] = [
  {
    slug: "healthcare",
    industry: "Healthcare",
    h1En: "AI Solutions for Healthcare & Private Clinics",
    h1Uk: "Штучний інтелект для медицини та приватних клінік",
    subtitleEn: "GDPR-compliant RAG systems, clinical chatbots, and document AI for UK and Ukrainian clinics",
    subtitleUk: "RAG-системи, клінічні чат-боти та AI-обробка документів для медичних закладів",
    descriptionEn: "We build GDPR-compliant AI systems for private clinics...",
    descriptionUk: "Ми розробляємо AI-системи для медичних закладів...",
    priceFromGBP: 3500,
    priceFromUAH: 140000,
    metaTitleEn: "AI for Healthcare UK | GDPR-Compliant Clinical AI | CodeNest",
    metaTitleUk: "ШІ для медицини | GDPR AI для клінік | CodeNest",
    metaDescriptionEn: "Build GDPR-compliant AI for your clinic. RAG systems, chatbots, document automation. From £3,500. Search time −87% for MedAssist case.",
    metaDescriptionUk: "AI для клінік з дотриманням GDPR. RAG-системи, чат-боти, обробка документів. Від 140 000 ₴. Зменшення часу пошуку на 87%.",
    keywordsEn: {
      primary: "AI for healthcare UK",
      secondary: ["GDPR compliant AI healthcare", "clinical chatbot UK", "RAG system for clinics"],
      localEn: ["AI healthcare London", "medical AI Manchester", "clinical AI Birmingham"],
    },
    keywordsUk: {
      primary: "ШІ для медицини Україна",
      secondary: ["AI для клінік", "медичний чат-бот", "GDPR AI для лікарень"],
      localUk: ["AI медицина Київ", "ШІ клініка Харків", "медичний AI Львів"],
    },
    packages: [
      {
        name: "Starter",
        priceGBP: 3500,
        priceUAH: 140000,
        deliveryWeeks: 3,
        includes: [
          "RAG chatbot trained on clinic documents",
          "Up to 500 document pages indexed",
          "GDPR-compliant data handling",
          "Integration with website",
          "3 months support",
        ],
      },
      // Professional, Enterprise...
    ],
    cases: [
      { slug: "ai-medical-rag", name: "MedAssist", metric: "Search time −87%", blogSlug: "ai-rag-healthcare-gdpr" },
    ],
    faq: [
      {
        question: "Is AI in healthcare GDPR-compliant?",
        questionUk: "Чи відповідає AI для медицини вимогам GDPR?",
        answer: "Yes. We build all healthcare AI systems with GDPR Article 9 compliance for special category data. Data is processed within the EU/UK, models run on-premise or in private cloud, no patient data is sent to OpenAI servers.",
        answerUk: "Так. Усі медичні AI-системи ми розробляємо з урахуванням GDPR, стаття 9 (спеціальні категорії даних). Дані обробляються в межах ЄС/UK, моделі працюють on-premise або в приватній хмарі.",
      },
      // 4–6 more FAQs...
    ],
    relatedServiceSlug: "artificial-intelligence",
    relatedNichePageEn: "/en/ai/healthcare",
    relatedNichePageUk: "/uk/ai/healthcare",
    crossLinkMLNiche: "/ml/healthcare",
    schemaServiceType: "AI Software Development",
    schemaPriceGBP: "3500",
    technologies: [
      { name: "RAG", description: "Retrieval-Augmented Generation — answers from your own documents" },
      { name: "GPT-4o", description: "OpenAI's most capable model for clinical text understanding" },
      { name: "Qdrant", description: "Vector database for fast semantic search" },
      { name: "FHIR R4", description: "Healthcare data interoperability standard" },
    ],
    implementationWeeks: [3, 8],
    integrations: ["Electronic Health Records (EHR)", "Practice Management Systems", "FHIR R4 APIs"],
    iconEmoji: "🏥",
    cardTagline: "GDPR RAG + Clinical NLP",
    cardMetricEn: "Search time −87%",
  },
  // 9 more niches...
]
```

```ts
// src/lib/data/mlNiches.ts

import type { MLNicheData } from "@/lib/types/niches"

export const ML_NICHES: MLNicheData[] = [
  {
    slug: "banking",
    industry: "Banking & FinTech",
    h1En: "Machine Learning for Banking & Financial Services",
    h1Uk: "Машинне навчання для банків та фінансових послуг",
    // ...
    priceFromGBP: 8000,
    priceFromUAH: 320000,
    algorithms: ["Isolation Forest", "LSTM Autoencoder", "XGBoost", "SHAP"],
    minDatasetSize: "50,000 transactions",
    dataRequirements: [
      {
        dataType: "Transaction history",
        minVolume: "50,000+ records",
        format: "CSV, PostgreSQL, API",
        purpose: "Train fraud detection model",
      },
      {
        dataType: "Customer demographics",
        minVolume: "5,000+ customers",
        format: "CRM export",
        purpose: "Credit scoring features",
      },
    ],
    roiMetrics: [
      { metricName: "Fraud loss reduction", value: "−£240K/year", timeframe: "12 months", source: "FraudShield (2025)" },
      { metricName: "False positives", value: "4.2% → 0.8%", timeframe: "3 months", source: "FraudShield (2025)" },
    ],
    roiTimeframe: "ROI в 4–6 місяців",
    xaiRequired: true,
    regulatoryContext: "FCA Model Risk SS1/23, GDPR Art.22 (automated decisions)",
    mlopsRequired: true,
    audienceType: "Enterprise",
    // ...
  },
  // 9 more ML niches...
]
```

---

## Допоміжні утиліти

```ts
// src/lib/utils/niches.ts

export function getAINicheBySlug(slug: string): AINicheData | undefined {
  return AI_NICHES.find(n => n.slug === slug)
}

export function getMLNicheBySlug(slug: string): MLNicheData | undefined {
  return ML_NICHES.find(n => n.slug === slug)
}

// Конвертація ціни: для EN повертає £, для UK повертає ₴
export function formatNichePrice(niche: BaseNicheData, lang: "en" | "uk"): string {
  if (lang === "en") {
    return `from £${niche.priceFromGBP.toLocaleString()}`
  }
  return `від ${niche.priceFromUAH.toLocaleString()} ₴`
}

// Генерація hreflang альтернативних URL
export function getNicheHreflang(type: "ai" | "ml", slug: string) {
  return {
    en: `https://codenest.com.ua/en/${type}/${slug}`,
    uk: `https://codenest.com.ua/uk/${type}/${slug}`,
    xDefault: `https://codenest.com.ua/en/${type}/${slug}`,
  }
}
```

---

## Файлова структура (реалізація)

```
src/lib/
  types/
    niches.ts              ← інтерфейси (BaseNicheData, AINicheData, MLNicheData)
  data/
    aiNiches.ts            ← AI_NICHES: AINicheData[] (10 ніш)
    mlNiches.ts            ← ML_NICHES: MLNicheData[] (10 ніш)
  utils/
    niches.ts              ← getAINicheBySlug, formatNichePrice, getNicheHreflang

src/app/[lang]/
  ai/
    page.tsx               ← /en/ai та /uk/ai — overview hub (CollectionPage Schema)
    [niche]/
      page.tsx             ← /en/ai/[niche] — uses getAINicheBySlug(params.niche)
  ml/
    page.tsx               ← /en/ml та /uk/ml — overview hub (CollectionPage Schema)
    [niche]/
      page.tsx             ← /en/ml/[niche] — uses getMLNicheBySlug(params.niche)
```

---

## TODO реалізація

- [x] ~~Створити `src/lib/types/niches.ts`~~ — ✅ Реалізовано (інтерфейси BaseNicheData, AINicheData, MLNicheData)
- [x] ~~Створити `src/lib/data/aiNiches.ts`~~ — ✅ Реалізовано (10 AI ніш)
- [x] ~~Створити `src/lib/data/mlNiches.ts`~~ — ✅ Реалізовано (10 ML ніш)
- [x] ~~Створити `src/lib/utils/niches.ts`~~ — ✅ Реалізовано як `src/lib/nicheUtils.ts` (всі 4 функції)
- [x] ~~Реалізувати `src/app/[lang]/ai/page.tsx`~~ — ✅ Реалізовано
- [x] ~~Реалізувати `src/app/[lang]/ai/[niche]/page.tsx`~~ — ✅ Реалізовано
- [x] ~~Реалізувати `src/app/[lang]/ml/page.tsx`~~ — ✅ Реалізовано
- [x] ~~Реалізувати `src/app/[lang]/ml/[niche]/page.tsx`~~ — ✅ Реалізовано
- [x] generateStaticParams() — ✅ є в `ai/[niche]/page.tsx` і `ml/[niche]/page.tsx`
- [x] generateMetadata() — ✅ є у всіх 4 сторінках
- [x] ~~Оновити `src/app/sitemap.ts`~~ — ✅ Реалізовано (+42 URL: 2 overviews + 20 AI + 20 ML)
- [x] `npx tsc --noEmit` — ✅ 0 TypeScript errors (перевірено 2026-05-03)
- [x] Додати нові маршрути до `internal-links.test.ts` — ✅ /ai/[niche] і /ml/[niche] вже в тестах

---

## Примітки

- `BaseNicheData` не є `abstract` — TypeScript не підтримує abstract у runtime. Використовуй union type або discriminated union якщо потрібно розрізняти AI/ML на рівні типів: `type NicheData = AINicheData | MLNicheData`
- Перевір що `formatNichePrice` використовує `Math.ceil(uah / 40 / 5) * 5` конвертацію при генерації даних (або зберігай обидва значення окремо — рекомендований підхід)
- `xaiRequired: true` → на сторінці рендери секцію "Explainability & Compliance" (важливо для banking, healthcare)
- `mlopsRequired: true` → на сторінці рендери секцію "MLOps: Monitoring & Retraining"
