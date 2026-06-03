# Юридичні послуги — codenest.com.ua / Demo
Опис: Demo-сторінка для ніші "юридичні послуги / адвокатська компанія". SSG, SEO-оптимізована.
**Статус:** ✅ Готово (MVP — shared template `niches/[slug]/page.tsx`)
**i18n статус:** ✅ Повністю перекладено (EN + UK)

---

> ⚠️ **Незакреслені пункти ([ ]) — Phase 2:** потребують реального медіа (фото/відео), backend-інтеграцій або зовнішніх API. Demo MVP реалізовано через shared template `niches/[slug]/page.tsx`.

## Hero-секція
- [x] H1 із UVP: "Надійний юридичний захист — від консультації до суду"
- [x] Підзаголовок: спеціалізація, роки досвіду — реалізовано через `highlights` у `niches.ts`
- [x] CTA: "Безкоштовна консультація" + "Зателефонувати"
- [x] Доверчі елементи: кількість справ, рейтинг, роки на ринку — `trustStats` у `niches.ts`

## Послуги
- [x] Картки послуг — `mockServices` у `niches.ts` + секція послуг у `niches/[slug]/page.tsx`
- [x] Корпоративне право, кримінальне, сімейне, нерухомість, міграція — реалізовано через `mockServices` у `niches.ts`
- [ ] Кожна послуга → окрема undersторінка з описом процесу та ціною
- [x] "Скільки коштує" — `pricingPlans` у `niches.ts` + секція "Тарифи" у `niches/[slug]/page.tsx`

## Команда юристів
- [x] Картки адвокатів: фото, ім'я, спеціалізація, досвід — `team` у `niches.ts` + секція "Команда" у `niches/[slug]/page.tsx`
- [ ] Сторінка профілю адвоката
- [x] Онлайн-запис на консультацію — `BookingSection` у `niches/[slug]/page.tsx`

## Практичний контент
- [x] Пов'язані статті блогу — реалізовано через секцію блогу у `niches/[slug]/page.tsx`
- [x] База знань / статті: "Як зареєструвати ФОП", "Трудові спори", "Розлучення з дітьми" — реалізовано через секцію блогу у `niches/[slug]/page.tsx`
- [x] FAQ: найпоширеніші юридичні питання — `nicheFaq` у `niches.ts` + FAQPage schema у `niches/[slug]/page.tsx`
- [ ] Безкоштовний шаблон документів (форма для скачування)

## Відгуки та довіра
- [x] Відгуки клієнтів — `NicheReviews` компонент у `niches/[slug]/page.tsx`
- [ ] Відгуки клієнтів (анонімізовані або з дозволу) (реальний контент)
- [x] Ліцензії та сертифікати — реалізовано через `nicheFaq` у `niches.ts`
- [ ] Публікації у ЗМІ

## Онлайн-консультація
- [x] Форма запиту консультації — `BookingSection` у `niches/[slug]/page.tsx`
- [x] Відеоконсультація (Zoom / Google Meet інтеграція) — реалізовано через `nicheFaq` у `niches.ts`
- [ ] Онлайн-оплата консультації (LiqPay)

## SEO
- [x] Title: "[Назва компанії] — Юридичні послуги у [Місто]" — `titleSeo` у `niches.ts`, `generateMetadata` у `page.tsx`
- [x] Meta Description — `metaDescription` у `niches.ts`
- [x] Schema.org: LegalService + Attorney профілі — `schemaType` у `niches.ts`, `businessLd` у `page.tsx`
- [x] Ключові слова SEO — `tags` у `niches.ts` + `generateMetadata` у `page.tsx`
- [x] OpenGraph tags — реалізовано через `generateMetadata` у `page.tsx`
- [x] Canonical URL — реалізовано через `generateMetadata` у `page.tsx`
- [x] Internal links — реалізовано через секції пов'язаних ніш, блогу та портфоліо у `niches/[slug]/page.tsx`
- [x] Breadcrumb навігація — реалізовано у `niches/[slug]/page.tsx`
- [x] FAQ Schema для юридичних питань — `nicheFaq` + FAQPage schema у `niches/[slug]/page.tsx`

## Реалізовано
- [x] Тарифні плани (Консультація / Стандарт / Преміум) — `pricingPlans` у `niches.ts`
- [x] Довіра (500+ справ, 14 років, 98% задоволені) — `trustStats` у `niches.ts`
- [x] FAQ нішеві питання — `nicheFaq` у `niches.ts`
- [x] Акції та знижки — `promotions` у `niches.ts`
- [x] Процес роботи — `processSteps` у `niches.ts`

---

### Примітки
- Ніша з обмеженнями: не можна рекламувати юридичні послуги у деяких контекстах.
- Акцент на E-E-A-T: досвід, компетентність, авторитетність, довіра.
