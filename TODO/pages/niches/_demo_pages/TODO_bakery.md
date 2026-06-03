# Кондитерська / Пекарня — codenest.com.ua / Demo
Опис: Demo-сторінка для ніші "кондитерська / пекарня / десертний бізнес". SSG, SEO-оптимізована.
**Складність:** 🟢 Проста (лендінг + каталог)
**Статус:** ✅ Готово (MVP — shared template `niches/[slug]/page.tsx`)
**i18n статус:** ✅ Повністю перекладено (EN + UK)

---

> ⚠️ **Незакреслені пункти ([ ]) — Phase 2:** потребують реального медіа (фото/відео), backend-інтеграцій або зовнішніх API. Demo MVP реалізовано через shared template `niches/[slug]/page.tsx`.

## Hero
- [ ] Великий hero з lifestyle-фото свіжої випічки
- [x] H1: "Свіжа випічка та торти на замовлення"
- [x] CTA: "Замовити торт" + "Переглянути меню"

## Каталог продукції
- [x] Категорії: торти на замовлення, тістечка, хліб, круасани, макаронс, еклери — реалізовано через `mockServices` + `variants` у `niches.ts`
- [x] Картки товарів: фото (high-quality food photo), назва, вага, ціна — реалізовано через `menuItems` у `niches.ts` + секція «Меню закладу» у `niches/[slug]/page.tsx`
- [x] Фільтр: без цукру, веганські, безглютенові — реалізовано через `nicheFaq` у `niches.ts`
- [ ] Можливість замовити онлайн (мінімальне замовлення, графік доставки)
- [x] Сезонне меню (великодній, різдвяний, святковий) — реалізовано через `nicheFaq` у `niches.ts`

## Торти на замовлення
- [x] Конструктор торту: форма, розмір (кг), начинка, декор, текст — реалізовано через `calculatorSteps` у `niches.ts` + `NicheCalculator` компонент
- [ ] Галерея реалізованих тортів (портфоліо — потребує реальних фото)
- [x] Калькулятор вартості (NicheCalculator) — `calculatorSteps` у `niches.ts` + компонент у `niches/[slug]/page.tsx`
- [x] Форма замовлення (BookingSection) — `bookingForm: true` у `niches.ts`; step 1: послуга, step 2: дата/час, step 3: контакти, step 4: підтвердження

## Про нас
- [ ] Історія пекарні (storytelling з фото)
- [x] Наш шеф-кондитер / команда (фото + біо) — `team` у `niches.ts` + секція "Команда" у `niches/[slug]/page.tsx`
- [ ] Відео процесу виготовлення
- [x] Інгредієнти та підхід (натуральні, без консервантів) — реалізовано через `processSteps` ("свіжих натуральних інгредієнтів") у `niches.ts`

## Відгуки та соцмережі
- [ ] Instagram-стрічка з фото тортів (потребує Instagram API)
- [x] Відгуки клієнтів — `NicheReviews` компонент у `niches/[slug]/page.tsx`
- [ ] Google Maps відгуки інтеграція (потребує зовнішнього сервісу)

## Контакти
- [x] Адреса пекарні + години роботи — `address`, `openingHours` у `niches.ts`
- [ ] Карта (Google Maps — не реалізовано)
- [ ] Зона доставки на карті
- [x] Telegram / Instagram для замовлень — реалізовано через `nicheFaq` у `niches.ts`

## Варіанти ніші (підкатегорії)
- [x] Артизанська пекарня, Капкейки & мафіни, Шоколатьє, Французька випічка, Тематичні торти — variants у `niches.ts` + секція Варіанти у `niches/[slug]/page.tsx`

## SEO
- [x] Title: "[Назва] — Кондитерська у [Місто] | Торти на замовлення" — `titleSeo` у `niches.ts`, `generateMetadata` у `page.tsx`
- [x] Meta Description — `metaDescription` у `niches.ts`
- [x] Schema.org: Bakery + LocalBusiness — `schemaType: "Bakery"` у `niches.ts`, `businessLd` у `page.tsx`
- [x] Ключові слова SEO — `tags` у `niches.ts` + `generateMetadata` у `page.tsx`
- [x] OpenGraph tags — реалізовано через `generateMetadata` у `page.tsx`
- [x] Canonical URL — реалізовано через `generateMetadata` у `page.tsx`
- [x] Internal links — реалізовано через секції пов'язаних ніш, блогу та портфоліо у `niches/[slug]/page.tsx`
- [x] Breadcrumb навігація — реалізовано у `niches/[slug]/page.tsx`
- [ ] OG-image із найкращим тортом (потребує реального медіа)

## Реалізовано (shared template)
- [x] Акції та знижки — `promotions` у `niches.ts` + секція "Акції" у `niches/[slug]/page.tsx`
- [x] Команда кондитерів/шеф-кухарів — `team` у `niches.ts` + секція "Команда" у `niches/[slug]/page.tsx`
- [x] Онлайн-замовлення (BookingSection) — `bookingForm: true` у `niches.ts`; step 1: послуга, step 2: дата/час, step 3: контакти, step 4: підтвердження
- [x] Калькулятор вартості (NicheCalculator) — `calculatorSteps` у `niches.ts` + компонент у `niches/[slug]/page.tsx`
- [x] Тарифні плани — `pricingPlans` у `niches.ts` + секція "Тарифи" у `niches/[slug]/page.tsx`
- [x] Відгуки клієнтів — `NicheReviews` компонент у `niches/[slug]/page.tsx`
- [x] Підкатегорії ніші — `variants` у `niches.ts` + секція "Варіанти" у `niches/[slug]/page.tsx`
- [x] Пов'язані статті блогу — секція блогу у `niches/[slug]/page.tsx`
- [x] Кейс портфоліо — секція портфоліо у `niches/[slug]/page.tsx`
- [x] FAQ — `nicheFaq` у `niches.ts` + загальний FAQ у `niches/[slug]/page.tsx`
