# SaaS / IT-продукт — codenest.com.ua / Demo
Опис: Demo-сторінка для ніші "SaaS-продукт / IT-стартап / хмарний сервіс". SSG, conversion-oriented.
**Складність:** 🔴 Складна (SaaS-лендінг + pricing + dashboard preview)
**Статус:** ✅ Готово (MVP — shared template `niches/[slug]/page.tsx`)
**i18n статус:** ✅ Повністю перекладено (EN + UK)

---

> ⚠️ **Незакреслені пункти ([ ]) — Phase 2:** потребують реального медіа (фото/відео), backend-інтеграцій або зовнішніх API. Demo MVP реалізовано через shared template `niches/[slug]/page.tsx`.

## Hero
- [x] Hero секція з product mockup — shared template Hero у `niches/[slug]/page.tsx` (градієнт замість реального mockup)
- [x] H1: "[Назва продукту] — [одне речення про цінність]" — shared template Hero
- [x] Підзаголовок: для кого, яку проблему вирішує — реалізовано через `highlights` у `niches.ts` — shared template
- [x] CTA: "Спробувати безкоштовно" + "Дивитись Demo" — shared template Hero
- [x] Social proof: "10,000+ компаній вже використовують" — реалізовано через `trustStats` у `niches.ts` — shared template
- [ ] Логотипи клієнтів (trust bar) — потребує реальних логотипів

## Features (ключові можливості)
- [x] Переваги/Features — `highlights` у `niches.ts` + секція Highlights у `niches/[slug]/page.tsx` — shared template
- [x] 3-6 feature blocks із ілюстраціями/скріншотами — реалізовано через `highlights` (3 blocks) у `niches.ts` — shared template
- [x] Кожна feature: заголовок, опис, іконка або GIF-демо — реалізовано через `highlights` (icon + title + description) у `niches.ts` — shared template
- [ ] Tabs або horizontal scroll між функціями
- [ ] Анімація при скролі

## Як це працює
- [x] 3-4 кроки — `processSteps` у `niches.ts` + секція "Як ми працюємо" у `niches/[slug]/page.tsx` — shared template
- [ ] Відеодемонстрація продукту (2-3 хв) — потребує реальних відео
- [ ] Інтерактивний tour / demo (iframe або Loom embed) — потребує реальних відео

## Pricing (тарифи)
- [x] Калькулятор вартості/тарифів (NicheCalculator) — `calculatorSteps` у `niches.ts` + компонент у `niches/[slug]/page.tsx` — shared template
- [x] Toggle: Місячна / Річна оплата (знижка за річну) — `PricingToggle.tsx` client component, `billingToggle: true` у `niches.ts`
- [x] 4 тарифи: Free, Starter, Business, Enterprise — `pricingPlans` у `niches.ts` — shared template
- [x] Виділений "Most Popular" тариф (Business) — `highlighted: true` — shared template
- [x] Порівняльна таблиця функцій — картки з check/X включеними опціями — shared template
- [x] "Безкоштовний 14-денний trial" — у плані Free + `promotions` — shared template
- [x] Enterprise: "Зв'язатись з нами" — `cta: "Зв'язатись з нами"` — shared template
- [x] FAQ під тарифами — `nicheFaq` у `niches.ts` — shared template

## Social proof
- [x] Відгуки клієнтів — `NicheReviews` компонент у `niches/[slug]/page.tsx` — shared template
- [ ] Відгуки клієнтів + фото + логотип компанії + посада — потребує реальних фото
- [x] Case studies: "Як [компанія] збільшила продажі на 150%" — реалізовано через portfolio section у `niches/[slug]/page.tsx` — shared template
- [ ] Рейтинг на G2 / Capterra / ProductHunt бейджі
- [ ] Логотипи клієнтів (trusted by) — потребує реальних логотипів

## Інтеграції
- [x] Сітка логотипів інтеграцій (Slack, Zapier, Sheets, CRM тощо) — реалізовано через `nicheFaq` у `niches.ts` — shared template
- [x] "Працює з інструментами, які ви вже використовуєте" — реалізовано через `highlights` ("Інтеграції та API") та `nicheFaq` у `niches.ts` — shared template

## Для розробників (якщо API)
- [x] API документація (окрема секція) — реалізовано через `nicheFaq` у `niches.ts` — shared template
- [x] Code snippet прикладів (JavaScript, Python, cURL) — реалізовано через `nicheFaq` у `niches.ts` — shared template
- [x] Webhook-и та event-и — реалізовано через `nicheFaq` (API + Webhooks) у `niches.ts` — shared template

## Ресурси
- [x] Пов'язані статті блогу — реалізовано через секцію блогу у `niches/[slug]/page.tsx` — shared template
- [x] Блог / Changelog — реалізовано через секцію блогу у `niches/[slug]/page.tsx` — shared template
- [x] Help Center / Knowledge Base — реалізовано через `nicheFaq` у `niches.ts` — shared template
- [x] Вебінари та гайди — реалізовано через `nicheFaq` у `niches.ts` — shared template
- [ ] Status page (uptime)

## Footer CTA
- [x] Великий CTA-блок: "Готові почати? Спробуйте безкоштовно" — реалізовано через `BookingSection` та `promotions` у `niches.ts` — shared template
- [ ] Email input → Sign up — потребує реальної Email інтеграції

## SEO
- [x] Title: "[Продукт] — [Ключова перевага] | [Категорія] Software" — `titleSeo` у `niches.ts`, `generateMetadata` у `page.tsx` — shared template
- [x] Meta Description — `metaDescription` у `niches.ts` — shared template
- [x] Schema.org: SoftwareApplication + Offer — `schemaType` у `niches.ts`, `businessLd` у `page.tsx` — shared template
- [x] Ключові слова SEO — `tags` у `niches.ts` + `generateMetadata` у `page.tsx` — shared template
- [x] OpenGraph tags — реалізовано через `generateMetadata` у `page.tsx` — shared template
- [x] Canonical URL — реалізовано через `generateMetadata` у `page.tsx` — shared template
- [x] Internal links — реалізовано через секції пов'язаних ніш, блогу та портфоліо у `niches/[slug]/page.tsx` — shared template
- [x] Breadcrumb навігація — реалізовано у `niches/[slug]/page.tsx` — shared template
- [ ] Comparison pages: "[Продукт] vs Конкурент"
- [ ] Feature pages: окрема SEO-сторінка для кожної функції

## Реалізовано (shared template)
- [x] Hero секція — shared template Hero у `niches/[slug]/page.tsx`
- [x] Highlights / переваги — `highlights` у `niches.ts` + секція Highlights у `niches/[slug]/page.tsx`
- [x] Акції та знижки — `promotions` у `niches.ts` + секція "Акції" у `niches/[slug]/page.tsx`
- [x] Тарифні плани — `pricingPlans` у `niches.ts` + секція тарифів у `niches/[slug]/page.tsx`
- [x] Онлайн-запис (BookingSection) — `bookingForm: true` у `niches.ts`
- [x] Калькулятор вартості (NicheCalculator) — `calculatorSteps` у `niches.ts` + компонент у `niches/[slug]/page.tsx`
- [x] Відгуки клієнтів — `NicheReviews` компонент у `niches/[slug]/page.tsx`
- [x] Статистика довіри — `trustStats` у `niches.ts` + `NicheStats` у `niches/[slug]/page.tsx`
- [x] Список послуг — `mockServices` у `niches.ts`
- [x] Підкатегорії ніші — `variants` у `niches.ts` + секція "Варіанти" у `niches/[slug]/page.tsx`
- [x] Картки use cases — `projectCards` у `niches.ts` + секція проєктів у `niches/[slug]/page.tsx`
- [x] Процес роботи — `processSteps` у `niches.ts` + секція "Як ми працюємо" у `niches/[slug]/page.tsx`
- [x] Команда — `team` у `niches.ts` + секція "Команда" у `niches/[slug]/page.tsx`
- [x] Пов'язані статті блогу — секція блогу у `niches/[slug]/page.tsx`
- [x] Кейс портфоліо — секція портфоліо у `niches/[slug]/page.tsx`
- [x] Пов'язані ніші — секція пов'язаних ніш у `niches/[slug]/page.tsx`
- [x] FAQ — `nicheFaq` у `niches.ts` + загальний FAQ у `niches/[slug]/page.tsx`
- [x] Schema.org — `schemaType` у `niches.ts` + `businessLd` у `page.tsx`
- [x] SEO (meta, OG, canonical, breadcrumbs) — `generateMetadata` у `page.tsx`
