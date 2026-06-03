# Туризм та готельний бізнес — codenest.com.ua / Demo
Опис: Demo-сторінка для ніші "готель / туристичне агентство". SSG, SEO-оптимізована.
**Статус:** ✅ Готово (MVP — shared template `niches/[slug]/page.tsx`)
**i18n статус:** ✅ Повністю перекладено (EN + UK)

---

> ⚠️ **Незакреслені пункти ([ ]) — Phase 2:** потребують реального медіа (фото/відео), backend-інтеграцій або зовнішніх API. Demo MVP реалізовано через shared template `niches/[slug]/page.tsx`.

## Hero
- [x] Повноекранне hero — shared template Hero секція у `niches/[slug]/page.tsx` (градієнт замість реального фото/відео)
- [x] Заголовок + підзаголовок (приклад: "Ваш ідеальний відпочинок починається тут") — реалізовано через `highlights` у `niches.ts` — shared template
- [ ] Форма швидкого пошуку: дата заїзду, виїзду, кількість гостей — потребує реальних фільтрів
- [x] CTA: "Перевірити наявність" — shared template Hero

## Номери / Тури

### Для готелю:
- [x] Список номерів/послуг — `mockServices` у `niches.ts` + секція послуг у `niches/[slug]/page.tsx` — shared template
- [x] Каталог номерів: фото, тип, місткість, ціна/ніч, включені послуги — реалізовано через `roomCards` у `niches.ts` + секція «Номери та ціни» у `niches/[slug]/page.tsx` — shared template
- [x] Детальна картка номеру: фотогалерея, опис, аменіті, ціни — реалізовано через `amenities[]`, `area`, `type` у `roomCards` — shared template
- [x] Онлайн-бронювання: календар, тип оплати — `BookingSection` у `niches/[slug]/page.tsx` — shared template
- [x] Пакети: "Романтичний уїкенд", "Бізнес тариф", "Сім'я" — `pricingPlans` у `niches.ts` — shared template

### Для турагентства:
- [x] Список турів — `mockServices` у `niches.ts` — shared template
- [ ] Каталог турів: фото, локація, тривалість, ціна, рейтинг — потребує реальних фото
- [ ] Фільтри: країна, тривалість, дата, ціна, тип відпочинку — потребує реальних фільтрів
- [x] Гарячі тури (тур з датою та знижкою) — `promotions` у `niches.ts` — shared template
- [ ] Сторінка туру: програма, включено, виключено, відгуки

## Система бронювання
- [x] Вибір номеру / туру — реалізовано через `BookingSection` у `niches/[slug]/page.tsx` — shared template
- [x] Вибір дат та кількості гостей — реалізовано через `BookingSection` у `niches/[slug]/page.tsx` — shared template
- [ ] Онлайн-оплата (Stripe / LiqPay / Monobank) — потребує реальних платежів
- [ ] Email-підтвердження та iCal запрошення — потребує реальної Email інтеграції
- [x] Скасування та повернення (умови) — реалізовано через `nicheFaq` у `niches.ts` — shared template

## Готель / Агентство
- [x] Про нас: опис, переваги — `highlights` у `niches.ts` — shared template
- [ ] Галерея: номери, ресторан, басейн, SPA — потребує реальних фото
- [x] Послуги: список — `mockServices` у `niches.ts` — shared template
- [x] Розташування — `address` у `niches.ts` — shared template
- [ ] Google Maps — потребує Google Maps інтеграції
- [x] Відгуки — `NicheReviews` компонент у `niches/[slug]/page.tsx` — shared template
- [ ] Відгуки: TripAdvisor / Google виджет (зовнішній виджет — не реалізовано)

## Блог та контент
- [x] Пов'язані статті блогу — реалізовано через секцію блогу у `niches/[slug]/page.tsx` — shared template
- [x] Статті: "Топ-10 місць для відпочинку", "Що взяти у подорож" — реалізовано через секцію блогу у `niches/[slug]/page.tsx` — shared template
- [x] Путівники по локаціях — реалізовано через секцію блогу у `niches/[slug]/page.tsx` — shared template

## SEO
- [x] Title: "[Назва готелю] — Бронювання у [Місто/Локація]" — `titleSeo` у `niches.ts`, `generateMetadata` у `page.tsx` — shared template
- [x] Meta Description — `metaDescription` у `niches.ts` — shared template
- [x] Schema.org: Hotel або TouristAttraction, LodgingBusiness — `schemaType` у `niches.ts`, `businessLd` у `page.tsx` — shared template
- [x] Schema.org: Offer для кожного тарифу — `pricingPlans` у `niches.ts` — shared template
- [x] Ключові слова SEO — `tags` у `niches.ts` + `generateMetadata` у `page.tsx` — shared template
- [x] OpenGraph tags — реалізовано через `generateMetadata` у `page.tsx` — shared template
- [x] Canonical URL — реалізовано через `generateMetadata` у `page.tsx` — shared template
- [x] Internal links — реалізовано через секції пов'язаних ніш, блогу та портфоліо у `niches/[slug]/page.tsx` — shared template
- [x] Breadcrumb навігація — реалізовано у `niches/[slug]/page.tsx` — shared template
- [ ] OG-image з найкращим фото номеру/локації — потребує реальних фото

## Реалізовано (shared template)
- [x] Hero секція — shared template Hero у `niches/[slug]/page.tsx`
- [x] Highlights / переваги — `highlights` у `niches.ts` + секція Highlights у `niches/[slug]/page.tsx`
- [x] Акції та знижки — `promotions` у `niches.ts` + секція "Акції" у `niches/[slug]/page.tsx`
- [x] Тарифні плани — `pricingPlans` у `niches.ts` + секція тарифів у `niches/[slug]/page.tsx`
- [x] Онлайн-запис/бронювання (BookingSection) — `bookingForm: true` у `niches.ts`; step 1: послуга, step 2: дата/час, step 3: контакти, step 4: підтвердження
- [x] Калькулятор вартості (NicheCalculator) — `calculatorSteps` у `niches.ts` + компонент у `niches/[slug]/page.tsx`
- [x] Відгуки клієнтів — `NicheReviews` компонент у `niches/[slug]/page.tsx`
- [x] Статистика довіри — `trustStats` у `niches.ts` + `NicheStats` у `niches/[slug]/page.tsx`
- [x] Список послуг — `mockServices` у `niches.ts`
- [x] Підкатегорії ніші — `variants` у `niches.ts` + секція "Варіанти" у `niches/[slug]/page.tsx`
- [x] Процес роботи — `processSteps` у `niches.ts` + секція "Як ми працюємо" у `niches/[slug]/page.tsx`
- [x] Пов'язані статті блогу — секція блогу у `niches/[slug]/page.tsx`
- [x] Кейс портфоліо — секція портфоліо у `niches/[slug]/page.tsx`
- [x] Пов'язані ніші — секція пов'язаних ніш у `niches/[slug]/page.tsx`
- [x] FAQ — `nicheFaq` у `niches.ts` + загальний FAQ у `niches/[slug]/page.tsx`
- [x] Schema.org — `schemaType` у `niches.ts` + `businessLd` у `page.tsx`
- [x] SEO (meta, OG, canonical, breadcrumbs) — `generateMetadata` у `page.tsx`
