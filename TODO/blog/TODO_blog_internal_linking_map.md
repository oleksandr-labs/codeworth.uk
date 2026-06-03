# 🔗 Internal Linking Map — Blog SEO

> Повна карта внутрішніх посилань: Blog → Services, Blog → Blog, Blog → Tools/Resources.
> Мета: передача link equity до конверсійних сторінок + підсилення кластерів.

---

## Принципи внутрішнього лінкування для CodeNest

### Пріоритети передачі link equity
1. **Blog → Service pages** — конверсія (найвищий пріоритет)
2. **Blog → Pillar posts** — укріплення кластеру
3. **Blog → Portfolio cases** — соціальний доказ
4. **Blog → Marketplace / Niche pages** — продаж
5. **Blog → Tools / Glossary** — engagement + дорінкінг

### Правила
- Кожен пост: мінімум **2 internal links** до service/pillar pages
- Кожен пост: мінімум **3 internal links** до інших blog posts (same cluster)
- Anchor text = target keyword (не "click here", не "read more")
- Pillar page → всі cluster posts обов'язково
- Не більше **8 total internal links** на пост (не dilute equity)

---

## Blog → Service Pages (обов'язкова карта)

### Яка стаття → яка сторінка послуги

| Blog Category | Blog Post (приклад) | Links to Service | Anchor Text |
|---------------|---------------------|-----------------|-------------|
| Web Development | website-cost-uk-2026 | /services/website-development | "web development services UK" |
| Web Development | headless-cms-explained | /services/website-development | "custom website development" |
| Web Development | nextjs-vs-wordpress | /services/website-development | "Next.js development for businesses" |
| SEO | seo-guide-small-business | /services/seo-promotion | "SEO services for UK businesses" |
| SEO | google-business-profile-guide | /services/seo-promotion | "local SEO optimisation" |
| SEO | technical-seo-checklist | /services/seo-promotion | "technical SEO audit" |
| AI posts | ai-for-business-10-uses | /services/artificial-intelligence | "AI development services UK" |
| ML posts | ml-churn-prediction-guide | /services/machine-learning | "machine learning solutions UK" |
| E-commerce | launch-online-store-uk | /services/ecommerce | "e-commerce development UK" |
| E-commerce | shopify-vs-custom | /services/ecommerce | "custom online store UK" |
| Marketing | google-ads-small-business | /services/ads | "Google Ads management UK" |
| Marketing | smm-small-business | /services/smm | "social media marketing services" |
| Marketing | email-marketing-uk | /services/email-marketing | "email marketing UK" |
| Design | landing-page-design | /services/ui-ux-design | "UI/UX design services" |
| Design | ui-ux-trends-2026 | /services/ui-ux-design | "professional web design UK" |
| Niches | restaurant-website-guide | /niches/restaurant | "restaurant website solution" |
| Niches | beauty-salon-website | /niches/beauty | "beauty salon website" |
| Niches | medical-clinic-website | /niches/medical | "medical clinic website UK" |
| Niches | law-firm-website | /niches/law | "law firm website UK" |
| All niches | All niche posts | /marketplace | "ready-made niche solutions" |
| Business | freelancer-vs-agency | /about | "our web studio team" |
| Business | website-cost-uk | /pricing | "web development pricing" |
| Security | gdpr-compliance-uk | /services/support | "website maintenance & security" |
| Cases | All case posts | /portfolio/[slug] | "[project name] case study" |

---

## Blog → Marketplace (conversion cross-links)

| Blog Post | Links to Marketplace | Context |
|-----------|---------------------|---------|
| website-cost-uk-2026 | /marketplace | "Or browse ready solutions from £499" |
| custom-vs-template | /marketplace | "See ready templates starting from £499" |
| restaurant-website-guide | /marketplace + /niches/restaurant | "View our restaurant solution" |
| All niche posts | /niches/[slug] | "See a live demo of our [niche] solution" |
| AI/ML posts | /extras/ai-[feature] | "Explore our AI features catalogue" |

---

## Blog → Blog (кластерні посилання)

### Cluster A — Web Development
```
pillar: web-development-for-business-uk
  ↔ website-cost-uk-2026 (A1)
  ↔ custom-website-vs-template (A2)
  ↔ website-development-timeline-uk (A3)
  ↔ headless-cms-explained (A5)
  ↔ nextjs-vs-wordpress (A6)
  ↔ pwa-for-small-business (A7)
  ↔ web-development-process-guide (A8)
  ↔ best-hosting-uk-websites (A9)
  ↔ typescript-vs-javascript-2026 (A10)

Додаткові cross-cluster:
  website-cost-uk → freelancer-vs-agency (business cluster)
  headless-cms → rendering-strategies-explained (same dev)
  nextjs-vs-wordpress → technical-seo-checklist (seo impact)
```

### Cluster B — SEO
```
pillar: seo-strategy-uk-ukraine-2026
  ↔ local-seo-uk-businesses (B1)
  ↔ google-business-profile-guide (B2)
  ↔ technical-seo-checklist-2026 (B3)
  ↔ core-web-vitals-guide (B4)
  ↔ schema-org-markup-guide (B5)
  ↔ keyword-research-free-guide (B6)
  ↔ eeat-seo-guide-2026 (B8)
  ↔ google-search-console-guide (B9)
  ↔ topical-authority-seo-guide (B14)

Додаткові cross-cluster:
  core-web-vitals → pagespeed-optimisation (performance)
  schema-markup → faq-schema-rich-results (rich snippets)
  local-seo → google-business-profile → location pages /location/[city]
```

### Cluster C — AI/ML
```
pillar: ai-for-business-guide-2026
  ↔ rag-guide-for-business (C1)
  ↔ chatgpt-for-small-business (C2)
  ↔ prompt-engineering-guide (C10)
  ↔ llm-comparison-2026 (C11)
  ↔ ai-chatbot-website-guide (C9)
  ↔ ml-churn-prediction-guide (C5)
  ↔ mlops-production-guide (C6)
  ↔ ml-fraud-anomaly-detection (C7)

AI → ML cross-links (важливо для /en/ai + /en/ml):
  ai-for-business → ml-churn → /en/ml/saas
  ai-rag-healthcare → /en/ai/healthcare
  ml-property-valuation → /en/ml/real-estate
  ai-bilingual-chatbot → /en/ai/hospitality
```

### Cluster F — Niches (важливі перехресні посилання)
```
restaurant-website-guide → seo-for-restaurant (SEO cluster)
restaurant-website-guide → online-booking-guide (same niche)
beauty-salon-website → smm-small-business (marketing)
medical-clinic-website → gdpr-compliance-uk (security)
law-firm-website → digital-contracts-guide (legal)
real-estate-website → ml-property-valuation-avm (AI/ML)
```

---

## Blog → Portfolio (соціальний доказ)

| Blog Topic | Portfolio Case | Link context |
|-----------|---------------|-------------|
| restaurant-website-guide | /portfolio/[restaurant-case] | "See how we built [X] restaurant site" |
| beauty-salon-website | /portfolio/[beauty-case] | "Real example: [Salon name]" |
| ai-for-business | /portfolio/ai-chatbot-saas | "Case study: AI chatbot for SaaS" |
| ml-churn-prediction | /portfolio/ml-churn-predictor | "Read the full case study" |
| ecommerce posts | /portfolio/[ecom-case] | "We increased conversions by 34%" |
| technical-seo | /portfolio/[seo-case] | "Result: +280% organic traffic in 6 months" |

---

## Blog → Tools & Resources (engagement + dwell time)

| Blog Post Type | Links to Tools/Resources |
|---------------|--------------------------|
| SEO articles | /tools (SEO checker, meta analyzer) |
| Performance articles | /tools (PageSpeed checker) |
| Business articles | /resources (website cost calculator) |
| Any guide | /resources (relevant checklist) |
| Technical articles | /glossary/[term] (on first mention) |

---

## Blog → Glossary (перша згадка терміну)

### Автоматичне правило: перша згадка терміну в тексті → посилання на /glossary/[term]

| Термін | URL |
|--------|-----|
| Core Web Vitals | /glossary/core-web-vitals |
| SSG / SSR / ISR | /glossary/static-site-generation |
| CDN | /glossary/cdn |
| PWA | /glossary/pwa |
| CMS | /glossary/cms |
| Headless CMS | /glossary/headless-cms |
| API | /glossary/api |
| SEO | /glossary/seo |
| CTA | /glossary/cta |
| LCP | /glossary/largest-contentful-paint |
| RAG | /glossary/rag |
| LLM | /glossary/llm |

---

## Anchor Text Strategy

### НЕ використовувати (generic)
- ❌ "click here"
- ❌ "read more"
- ❌ "this article"
- ❌ "here"

### ВИКОРИСТОВУВАТИ (keyword-rich)
- ✅ Exact match: "web development for small business UK"
- ✅ Partial match: "development costs in the UK"
- ✅ Brand: "CodeNest web development services"
- ✅ Descriptive: "our full guide to SEO in 2026"
- ✅ Natural: "as we covered in our Next.js guide"

### Розподіл anchor types (для одного поста)
- 40% partial match
- 30% exact match
- 20% branded/descriptive
- 10% natural/contextual

---

## Технічна реалізація

### Компонент `InternalLink`
```tsx
// src/components/blog/InternalLink.tsx
// Обгортка для internal links з UTM tracking
// Автоматично додає rel="noopener" для зовнішніх
// Відстежує clicks через GA4 event

interface InternalLinkProps {
  href: string
  children: React.ReactNode
  type: 'service' | 'blog' | 'portfolio' | 'tool' | 'glossary'
}
```

### Автоматична вставка посилань
- [ ] При збереженні нового поста: автоматично пропонувати схожі пости (same cluster) — ⚠️ Phase 3: потребує CMS/admin panel
- [ ] Перевірка на orphan pages (пости без вхідних посилань) — ⚠️ Phase 3: потребує admin panel або CI скрипт
- [ ] Report: пости з < 2 incoming links → потрібно додати посилання — ⚠️ Phase 3: автоматичний звіт

### Моніторинг
- [ ] Щомісяця: Screaming Frog crawl → перевірка link equity flow — ⚠️ Phase 2: після деплою, зовнішній інструмент
- [ ] GSC: перевірити Coverage → Discovered но not indexed (може бути missing links) — ⚠️ Phase 2: після деплою в GSC
- [ ] Ahrefs: Internal pages report → Top linked pages vs conversion rate — ⚠️ Phase 2: після деплою + Ahrefs підписка
