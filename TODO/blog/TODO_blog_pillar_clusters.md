# 🏛 Pillar + Cluster Content Architecture — CodeNest Blog

> Детальна архітектура Hub & Spoke для топікал авторитету.
> Кожен кластер = окрема "topic silo" з pillar page + cluster posts.

---

## Що таке Pillar + Cluster для CodeNest

```
PILLAR PAGE (широка тема, 3,000-5,000 слів)
  ├── Cluster Post 1 (підтема, 1,500-2,500 слів) → link back
  ├── Cluster Post 2 (підтема) → link back
  ├── Cluster Post 3 (підтема) → link back
  ├── ...
  └── Service Page (conversion target) ← всі cluster posts
```

**Мета:** Google розуміє, що CodeNest — авторитетний ресурс по темі. Ранжує весь кластер вище.

---

## CLUSTER A — Web Development for Business UK

### Pillar Page
- **Slug:** `web-development-for-business-uk-2026`
- **EN Title:** "Web Development for UK Businesses: Complete 2026 Guide"
- **EN Keyword:** "web development for business UK" (3,600/mo, KD: 58)
- **UK Keyword:** "веб-розробка для бізнесу Україна" (2,400/mo, KD: 45)
- **Word count target:** 4,500
- **Schema:** Article + HowTo + FAQPage
- **Service page:** /services/website-development
- **Status:** [ ] Потрібно написати

### Cluster Posts (10)
| # | EN Title | Slug | Keyword EN | KD | Volume | Status |
|---|---------|------|-----------|----|----|---------|
| A1 | How Much Does a Website Cost in the UK? | `website-cost-uk-2026` | website cost UK 2026 | 42 | 4,400 | [ ] |
| A2 | Custom Website vs Template: 5-Year ROI Comparison | `custom-website-vs-template` | custom website vs template | 35 | 2,900 | [ ] |
| A3 | How Long to Build a Website? Real Timeline | `website-development-timeline-uk` | how long to build a website | 38 | 2,100 | [ ] |
| A4 | What is Next.js? Why UK Businesses Choose It | `what-is-nextjs-for-business` | what is Next.js | 32 | 5,400 | ✅ |
| A5 | What is a Headless CMS? | `headless-cms-explained` | headless CMS explained | 30 | 4,400 | ✅ |
| A6 | Next.js vs WordPress: Speed & SEO Compared | `nextjs-vs-wordpress` | Next.js vs WordPress | 38 | 3,200 | ✅ |
| A7 | What is PWA for Small Business? | `pwa-for-small-business` | PWA for small business | 30 | 2,900 | ✅ |
| A8 | Web Development Process: Step-by-Step Guide | `web-development-process-guide` | web development process | 35 | 2,200 | [ ] |
| A9 | Best Hosting for UK Websites: Vercel, Netlify, SiteGround | `best-hosting-uk-websites-2026` | best hosting UK websites | 40 | 3,600 | [ ] |
| A10 | TypeScript vs JavaScript: Which to Choose in 2026? | `typescript-vs-javascript-2026` | TypeScript vs JavaScript | 35 | 3,200 | ✅ |

### Linking Rules для Cluster A
- Кожен post → link to pillar (anchor = "web development for UK businesses")
- Кожен post → link to /services/website-development
- Post A1 (cost) → link to /marketplace (ready solutions)
- Post A6 (Next.js vs WP) → link to /extras (доробки)
- Pillar → all cluster posts (in "related articles" section)

---

## CLUSTER B — SEO for UK & Ukraine

### Pillar Page
- **Slug:** `seo-strategy-uk-ukraine-2026`
- **EN Title:** "SEO Strategy for UK Businesses: Complete 2026 Guide"
- **EN Keyword:** "SEO strategy UK businesses 2026" (2,900/mo, KD: 55)
- **UK Keyword:** "SEO стратегія для бізнесу Україна 2026" (1,800/mo, KD: 42)
- **Word count target:** 5,000
- **Schema:** Article + HowTo + FAQPage
- **Service page:** /services/seo-promotion
- **Status:** [ ] Потрібно написати

### Cluster Posts (14)
| # | EN Title | Slug | Keyword EN | KD | Volume | Status |
|---|---------|------|-----------|----|----|---------|
| B1 | Local SEO for UK Businesses | `local-seo-uk-businesses-2026` | local SEO UK | 48 | 1,800 | [ ] |
| B2 | Google Business Profile Complete Guide | `google-business-profile-guide` | Google Business Profile | 40 | 4,400 | ✅ |
| B3 | Technical SEO Checklist 2026 | `technical-seo-checklist-2026` | technical SEO checklist | 45 | 2,400 | ✅ |
| B4 | Core Web Vitals: Complete Guide | `core-web-vitals-guide` | core web vitals guide | 35 | 8,100 | ✅ |
| B5 | Schema.org Markup Guide | `schema-org-markup-complete-guide` | schema markup guide | 36 | 2,900 | [ ] |
| B6 | Keyword Research Free Guide | `keyword-research-free-guide` | keyword research free | 45 | 6,600 | [ ] |
| B7 | Link Building White-Hat 2026 | `link-building-whithat-2026` | link building 2026 | 55 | 2,200 | [ ] |
| B8 | E-E-A-T in SEO: 2026 Guide | `eeat-seo-guide-2026` | E-E-A-T SEO | 38 | 3,600 | [ ] |
| B9 | Google Search Console Beginner Guide | `google-search-console-guide` | Google Search Console guide | 32 | 5,400 | [ ] |
| B10 | Featured Snippets: How to Get Position 0 | `featured-snippets-guide-position-zero` | featured snippets guide | 42 | 2,100 | [ ] |
| B11 | On-Page SEO Checklist 2026 | `on-page-seo-checklist` | on-page SEO checklist | 42 | 3,200 | [ ] |
| B12 | SEO for E-commerce: Product & Category Pages | `seo-ecommerce-product-pages` | ecommerce SEO guide | 50 | 2,900 | [ ] |
| B13 | SEO vs Google Ads: Which to Choose? | `seo-vs-google-ads-comparison` | SEO vs Google Ads | 40 | 3,600 | [ ] |
| B14 | Topical Authority: Dominate Your Niche in Google | `topical-authority-seo-guide` | topical authority SEO | 40 | 1,600 | [ ] |

---

## CLUSTER C — AI & Machine Learning for Business

### Pillar Page
- **Slug:** `ai-for-business-guide-2026`
- **EN Title:** "AI for Business: Complete 2026 Guide for UK & Ukrainian Companies"
- **EN Keyword:** "AI for business UK 2026" (1,200/mo, KD: 35)
- **UK Keyword:** "AI для бізнесу Україна 2026" (900/mo, KD: 28)
- **Word count target:** 5,500
- **Schema:** Article + FAQPage
- **Service pages:** /services/artificial-intelligence + /services/machine-learning
- **Niche pages:** /en/ai/* + /en/ml/*
- **Status:** [ ] Потрібно написати (mega pillar)

### Cluster Posts (18)
| # | EN Title | Slug | Keyword EN | Status |
|---|---------|------|-----------|---------|
| C1 | What is RAG? Build an AI Bot from Your Business Data | `rag-guide-for-business` | what is RAG AI | [ ] |
| C2 | ChatGPT for Small Business | `chatgpt-for-small-business` | ChatGPT for small business | ✅ |
| C3 | AI Invoice Processing | `ai-invoice-processing-automation` | AI invoice processing | ✅ |
| C4 | Computer Vision in Business | `ai-computer-vision-business` | computer vision business | ✅ |
| C5 | ML Churn Prediction Guide | `ml-churn-prediction-guide` | ML churn prediction | ✅ |
| C6 | MLOps Production Guide | `mlops-production-guide` | MLOps production | ✅ |
| C7 | Fraud Detection with ML | `ml-fraud-anomaly-detection-fca` | fraud detection ML | ✅ |
| C8 | AI for HR Recruitment | `ai-hr-recruitment-automation` | AI for HR | [ ] |
| C9 | AI Chatbot for Website | `ai-chatbot-website-guide` | AI chatbot website | [ ] |
| C10 | Prompt Engineering Guide | `prompt-engineering-guide-2026` | prompt engineering | [ ] |
| C11 | LLM Comparison: GPT-4o vs Claude vs Gemini | `llm-comparison-2026` | GPT Claude Gemini comparison | [ ] |
| C12 | AI Content for Blogs (No Penalties) | `ai-content-blog-google-safe` | AI content blog safe | [ ] |
| C13 | AI Property Valuation (AVM) | `ml-property-valuation-avm` | ML property valuation | ✅ |
| C14 | AI for EdTech: Personalised Learning | `ai-edtech-personalized-learning` | AI EdTech | ✅ |
| C15 | Voice AI for Hospitality | `ai-voice-assistant-hospitality` | voice AI hotel | ✅ |
| C16 | Bilingual RAG Chatbot UK/UA | `ai-bilingual-chatbot-dual-market` | bilingual chatbot | ✅ |
| C17 | GDPR-Compliant AI for Healthcare | `ai-rag-healthcare-gdpr` | GDPR AI healthcare | ✅ |
| C18 | Supply Chain Optimisation with ML | `ml-supply-chain-optimization` | supply chain ML | ✅ |

### Sub-cluster: AI по нішах (посилається на /en/ai/* сторінки)
- AI для медицини → /en/ai/healthcare
- AI для e-commerce → /en/ai/ecommerce
- AI для FinTech → /en/ai/fintech
- AI для маркетингу → /en/ai/marketing
- AI для HR → /en/ai/hr

---

## CLUSTER D — E-commerce & Online Stores

### Pillar Page
- **Slug:** `launch-online-store-uk-2026`
- **EN Title:** "How to Launch an Online Store in the UK: Complete 2026 Guide"
- **EN Keyword:** "launch online store UK 2026" (2,100/mo, KD: 50)
- **Status:** [ ] Потрібно написати

### Cluster Posts (10)
| # | EN Title | Slug | Status |
|---|---------|------|---------|
| D1 | Shopify vs Custom E-commerce UK | `shopify-vs-custom-ecommerce-uk` | [ ] |
| D2 | WooCommerce vs Shopify vs Next.js | `woocommerce-shopify-nextjs-comparison` | [ ] |
| D3 | Product Page Optimisation Guide | `product-page-optimisation-guide` | [ ] |
| D4 | Cart Abandonment: Recovery Strategies | `cart-abandonment-recovery-guide` | [ ] |
| D5 | Payment Gateways UK: Stripe, PayPal, Klarna | `payment-gateways-uk-guide` | [ ] |
| D6 | E-commerce SEO: Products & Categories | `seo-ecommerce-product-pages` | [ ] |
| D7 | Mobile Commerce (mCommerce) 2026 | `mobile-commerce-guide-2026` | [ ] |
| D8 | E-commerce Photography Guide | `ecommerce-product-photography` | [ ] |
| D9 | B2B Portal: Wholesale Online Orders | `b2b-portal-wholesale-guide` | [ ] |
| D10 | E-commerce Analytics: GA4 for Online Stores | `ecommerce-analytics-ga4-guide` | [ ] |

---

## CLUSTER E — Digital Marketing UK

### Pillar Page
- **Slug:** `digital-marketing-small-business-uk-2026`
- **EN Title:** "Digital Marketing for Small Business UK: Strategy 2026"
- **EN Keyword:** "digital marketing for small business UK" (5,400/mo, KD: 61) — **найбільший volume**
- **Status:** [ ] Потрібно написати

### Cluster Posts (12)
| # | EN Title | Slug | Status |
|---|---------|------|---------|
| E1 | Google Ads Small Business UK | `google-ads-small-business` | ✅ |
| E2 | Facebook Ads UK Guide 2026 | `facebook-ads-uk-businesses-2026` | [ ] |
| E3 | Email Marketing Platforms UK | `email-marketing-platforms-uk-2026` | [ ] |
| E4 | SMM for Small Business | `smm-small-business-guide` | [ ] |
| E5 | Content Marketing Strategy 12 Months | `content-marketing-strategy-12-month` | [ ] |
| E6 | Sales Funnel Online Guide | `sales-funnel-online-guide` | [ ] |
| E7 | Telegram Marketing for Business | `telegram-marketing-business-guide` | [ ] |
| E8 | Influencer Marketing UK | `influencer-marketing-uk-guide` | [ ] |
| E9 | Lead Magnets: 20 Ideas for Any Niche | `email-list-building-lead-magnets` | [ ] |
| E10 | Marketing ROI: How to Track and Compare Channels | `marketing-roi-tracking-guide` | [ ] |
| E11 | Retargeting: How to Bring Back Lost Visitors | `retargeting-guide-bring-back-visitors` | [ ] |
| E12 | Zero-Budget Marketing: Methods That Actually Work | `zero-budget-marketing-guide` | ✅ |

---

## CLUSTER F — Niche Website Guides

### Pillar Pages (по одній на групу ніш)

#### F-HEALTH — Health & Beauty Pillar
- **Slug:** `health-beauty-website-guide-uk`
- **EN Title:** "Health & Beauty Business Website UK: Complete Guide"
- **Cluster:** beauty salon, medical clinic, dentist, fitness, psychology, SPA

#### F-HOSPITALITY — Food & Hospitality Pillar
- **Slug:** `restaurant-hospitality-website-guide-uk`
- **EN Title:** "Restaurant & Hospitality Website UK: Complete Guide 2026"
- **Cluster:** restaurant, food delivery, bakery, coffee shop, hotel, catering

#### F-LEGAL-FINANCE — Legal & Finance Pillar
- **Slug:** `legal-financial-services-website-uk`
- **EN Title:** "Law Firm & Financial Services Website UK: Trust, SEO & Leads"
- **Cluster:** law firm, notary, accountant, financial advisor

#### F-EDUCATION — Education & Training Pillar
- **Slug:** `education-training-website-uk-2026`
- **EN Title:** "Education & Training Website UK: LMS, Scheduling, Bookings"
- **Cluster:** online school, language school, kids center, tutoring

#### F-REALESTATE — Real Estate Pillar
- **Slug:** `real-estate-website-uk-guide`
- **EN Title:** "Real Estate Website UK: Filters, Virtual Tours & Lead Gen"
- **Cluster:** estate agency, new builds, rental, commercial

### Cluster Posts для F (20 total)
| # | EN Title | Slug | Status |
|---|---------|------|---------|
| F1 | Restaurant Website 2026 | `restaurant-website-guide-2026` | [ ] |
| F2 | Beauty Salon Website Guide | `beauty-salon-website-guide` | [ ] |
| F3 | Medical Clinic Website UK | `medical-clinic-website-uk-guide` | [ ] |
| F4 | Law Firm Website UK | `law-firm-website-uk` | [ ] |
| F5 | Real Estate Website UK | `real-estate-website-uk-guide` | [ ] |
| F6 | Fitness Studio Website | `fitness-studio-website-guide` | [ ] |
| F7 | Education Website & LMS | `education-website-lms-vs-custom` | [ ] |
| F8 | Construction Company Website | `construction-company-website-guide` | [ ] |
| F9 | Dental Clinic Website UK | `dental-clinic-website-seo-uk` | [ ] |
| F10 | Online Bookings for Restaurants | `online-booking-restaurants-guide` | [ ] |
| F11 | Veterinary Clinic Website | `veterinary-clinic-website-guide` | [ ] |
| F12 | Kids Centre Website | `kids-centre-website-guide` | [ ] |
| F13 | Photography Portfolio Website | `photographer-portfolio-website` | [ ] |
| F14 | Events Agency Website | `events-agency-website-guide` | [ ] |
| F15 | Travel Agency Website 2026 | `travel-agency-website-guide-2026` | [ ] |
| F16 | IT Company Website Guide | `it-company-website-guide-uk` | [ ] |
| F17 | Startup Website Evolution | `startup-website-landing-to-product` | [ ] |
| F18 | Non-Profit Website UK | `non-profit-website-donations-uk` | [ ] |
| F19 | Coworking Website Booking | `coworking-website-booking-guide` | [ ] |
| F20 | Car Dealer Website UK | `car-dealer-website-filters-test-drive` | [ ] |

---

## CLUSTER G — Design & UX

### Pillar Page
- **Slug:** `ui-ux-design-business-websites-2026`
- **EN Title:** "UI/UX Design for Business Websites: Complete 2026 Guide"
- **EN Keyword:** "UI UX design guide 2026" (880/mo)
- **Status:** [ ] Потрібно написати

### Cluster Posts (8)
| # | EN Title | Status |
|---|---------|---------|
| G1 | Landing Page Design: 15 Conversion Elements | [ ] |
| G2 | Typography for Web: Brand Font Guide | [ ] |
| G3 | Mobile-First Design UK | [ ] |
| G4 | Web Accessibility (WCAG 2.2) | [ ] |
| G5 | Colour Psychology in Web Design | [ ] |
| G6 | E-commerce UX: Product Page Design | [ ] |
| G7 | Design Systems: From Figma to Code | [ ] |
| G8 | UI/UX Design Trends 2026 | [ ] |

---

## CLUSTER H — Security & Performance

### Pillar Page
- **Slug:** `website-security-performance-guide-2026`
- **EN Title:** "Website Security & Performance: Complete Guide for UK Businesses"
- **Status:** [ ] Потрібно написати

### Cluster Posts (8)
| # | EN Title | Status |
|---|---------|---------|
| H1 | GDPR Compliance UK Websites 2026 | [ ] |
| H2 | Website Security Essentials | [ ] |
| H3 | SSL Certificate: Why HTTPS Matters | [ ] |
| H4 | Cookie Consent UK Legal Guide | [ ] |
| H5 | PageSpeed Optimisation: Score 95+ | [ ] |
| H6 | Image Optimisation: WebP & AVIF | [ ] |
| H7 | CDN Guide: Faster Website Globally | [ ] |
| H8 | Core Web Vitals: LCP CLS INP Action Plan | [ ] |

---

## Загальний прогрес по кластерах

| Cluster | Pillar | Posts Total | Done | Remaining |
|---------|--------|------------|------|-----------|
| A — Web Dev | [ ] | 10 | 5 | 6 |
| B — SEO | [ ] | 14 | 4 | 11 |
| C — AI/ML | [ ] | 18 | 12 | 7 |
| D — E-commerce | [ ] | 10 | 0 | 11 |
| E — Marketing | [ ] | 12 | 2 | 11 |
| F — Niches | [ ] | 20 | 0 | 25 |
| G — Design | [ ] | 8 | 0 | 9 |
| H — Security | [ ] | 8 | 0 | 9 |
| **TOTAL** | **0/8** | **100** | **23** | **89** |

---

## Правила внутрішніх посилань між кластерами

### Cross-cluster посилання (дозволено)
- Cluster C (AI) → Cluster B (SEO) — "AI for SEO" articles
- Cluster D (E-commerce) → Cluster C (AI) — "AI for online store"
- Cluster F (Niches) → всі інші кластери — "Website for [niche] needs SEO because..."
- Cluster A (Web Dev) → Cluster H (Security) — "After building, secure your site"

### Правило: max 5 cross-cluster посилань на пост
### Правило: мінімум 2 within-cluster посилання на пост
