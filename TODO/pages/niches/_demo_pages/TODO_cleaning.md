# Клінінг та домашні послуги — codenest.com.ua / Demo
Опис: Demo-сторінка для ніші "клінінг-сервіс / домашні послуги". SSG, SEO-оптимізована.
**Складність:** 🟢 Проста (лендінг + калькулятор + форма)
**Статус:** ✅ Готово (MVP — shared template `niches/[slug]/page.tsx`)
**i18n статус:** ✅ Повністю перекладено (EN + UK)

---

> ⚠️ **Незакреслені пункти ([ ]) — Phase 2:** потребують реального медіа (фото/відео), backend-інтеграцій або зовнішніх API. Demo MVP реалізовано через shared template `niches/[slug]/page.tsx`.

## Hero
- [ ] Чисте, світле фото інтер'єру "до і після"
- [x] H1: "Професійне прибирання — час для важливого"
- [x] CTA: "Розрахувати вартість" + "Замовити прибирання"
- [x] Лічильники: об'єктів прибрано, клієнтів, років — `trustStats` у `niches.ts` (CountUp, 4 метрики, підключено до shared template)

## Послуги
- [x] Список послуг — `mockServices` у `niches.ts` + секція послуг у `niches/[slug]/page.tsx`
- [x] Генеральне прибирання квартир/будинків — реалізовано через `mockServices` ("Генеральне прибирання") та `pricingPlans` у `niches.ts`
- [x] Регулярне прибирання (1-2 рази на тиждень) — реалізовано через `pricingPlans` ("Підписка") та `promotions` ("Регулярний пакет −20%") у `niches.ts`
- [x] Прибирання після ремонту — реалізовано через `mockServices` та `pricingPlans` ("Після ремонту") у `niches.ts`
- [x] Хімчистка м'яких меблів та килимів — реалізовано через `mockServices` + `calculatorSteps` ("Хімчистка дивану") у `niches.ts`
- [x] Миття вікон та фасадів — реалізовано через `mockServices` ("Миття вікон") та `calculatorSteps` у `niches.ts`
- [x] Офісний клінінг — реалізовано через `mockServices` ("Прибирання офісу") та `variants` у `niches.ts`
- [x] Прибирання комерційних приміщень — реалізовано через `variants` ("Клінінг офісів та бізнесу") у `niches.ts`
- [x] Дезінфекція приміщень — реалізовано через `mockServices` та `variants` у `niches.ts`

## Калькулятор вартості
- [x] Тип послуги — реалізовано через `calculatorSteps` у `niches.ts` + `NicheCalculator` компонент
- [x] Площа приміщення / параметри — реалізовано через `calculatorSteps` у `niches.ts`
- [x] Додаткові опції: миття вікон, балкон, холодильник, духовка — реалізовано через `calculatorSteps` (крок "Додаткові опції") у `niches.ts`
- [x] CTA: "Замовити за цією ціною"

## Довіра
- [x] "До та після" — Before/After галерея із slider — `BeforeAfter.tsx` компонент готовий (drag handle, clipPath)
- [x] Відгуки клієнтів — `NicheReviews` компонент у `niches/[slug]/page.tsx`
- [ ] Відгуки клієнтів (Google Maps) — потребує зовнішнього сервісу
- [x] Гарантія якості — реалізовано через `nicheFaq` у `niches.ts`
- [x] Екологічні засоби (маркетинг) — реалізовано через `nicheFaq` + `variants` ("Екологічне прибирання") у `niches.ts`
- [x] Страхування відповідальності — реалізовано через `nicheFaq` у `niches.ts`

## Процес замовлення
- [x] 1. Обирай послугу та площу — реалізовано через `processSteps` у `niches.ts` + секція "Як ми працюємо" у `niches/[slug]/page.tsx`
- [x] 2. Обирай дату та час — реалізовано через `processSteps` у `niches.ts`
- [x] 3. Підтвердження — реалізовано через `processSteps` у `niches.ts`
- [x] 4. Команда приїжджає вчасно — реалізовано через `processSteps` у `niches.ts`

## Бізнес-модель
- [x] Разове замовлення — реалізовано через `pricingPlans` у `niches.ts`
- [x] Підписка: знижка за регулярність (щотижня, двічі на місяць) — реалізовано через `pricingPlans` у `niches.ts`
- [x] Промокоди для нових клієнтів — реалізовано через `promotions` у `niches.ts`

## SEO
- [x] Title: "[Назва] — Прибирання квартир у [Місто] | Клінінг-сервіс" — `titleSeo` у `niches.ts`, `generateMetadata` у `page.tsx`
- [x] Meta Description — `metaDescription` у `niches.ts`
- [x] Schema.org: HomeAndConstructionBusiness + Service — `Product` JSON-LD у `niches/[slug]/page.tsx`
- [x] Ключові слова SEO — `tags` у `niches.ts` + `generateMetadata` у `page.tsx`
- [x] OpenGraph tags — реалізовано через `generateMetadata` у `page.tsx`
- [x] Canonical URL — реалізовано через `generateMetadata` у `page.tsx`
- [x] Internal links — реалізовано через секції пов'язаних ніш, блогу та портфоліо у `niches/[slug]/page.tsx`
- [x] Breadcrumb навігація — реалізовано у `niches/[slug]/page.tsx`
