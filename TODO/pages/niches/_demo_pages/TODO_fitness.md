# Нішева сторінка: Фітнес-клуб / Особистий тренер (Fitness Club / Personal Trainer)
Опис: Демо-сайт для фітнес-клубу, йога-студії або особистого тренера.
**URL:** `/marketplace/demo/fitness`
**Ніша:** Фітнес-клуби, тренажерні зали, йога, пілатес, особисті тренери
**Статус:** ✅ Готово (MVP — shared template `niches/[slug]/page.tsx`)
**i18n статус:** ✅ Повністю перекладено (EN + UK)

---

> ⚠️ **Незакреслені пункти ([ ]) — Phase 2:** потребують реального медіа (фото/відео), backend-інтеграцій або зовнішніх API. Demo MVP реалізовано через shared template `niches/[slug]/page.tsx`.

## Обов'язкові елементи

### Hero
- [ ] Мотиваційне фото (спортзал, тренування)
- [x] Заголовок + УТП — реалізовано через `highlights` у `niches.ts`
- [x] CTA: "Безкоштовна перша тренування" + "Записатися"

### Послуги / Абонементи
- [x] Тарифи (базовий, преміум, VIP) — `pricingPlans` у `niches.ts` + секція "Тарифи" у `niches/[slug]/page.tsx`
- [x] Список послуг — `mockServices` у `niches.ts` + секція послуг у `niches/[slug]/page.tsx`
- [x] Типи абонементів (місячний, 3 місяці, рік) — реалізовано через `pricingPlans` (Квартальний, Річний) у `niches.ts`
- [x] Що входить (зал, басейн, сауна, групові заняття) — реалізовано через `pricingPlans` features у `niches.ts`
- [x] Кнопка купити або записатися — реалізовано через `BookingSection` у `niches/[slug]/page.tsx`

### Розклад занять
- [x] Календар групових тренувань (йога, зумба, бокс тощо) — реалізовано через `scheduleItems` у `niches.ts` + секція «Розклад групових тренувань» у `niches/[slug]/page.tsx`
- [x] Час, тренер, місця (якщо обмежена кількість) — реалізовано через `time`, `trainer`, `spots`, `spotsLeft` у `scheduleItems`
- [x] Можливість записатися на конкретну тренування — реалізовано через `BookingSection` у `niches/[slug]/page.tsx`

### Тренери
- [x] Картки тренерів з фото, спеціалізацією — реалізовано через поле team в niches.ts + секція команди в page.tsx
- [x] Досвід, сертифікати — реалізовано через поле `team` з `specializations` у `niches.ts`
- [x] Можливість записатися на персональне тренування — реалізовано через `BookingSection` у `niches/[slug]/page.tsx`

### Галерея
- [ ] Фото спортзалу, обладнання, групових занять
- [ ] Відео тренувань або testimonials

### Результати клієнтів
- [ ] До/Після фото (з дозволом клієнтів)
- [ ] Success stories з описом (скинув 20 кг за 3 місяці тощо)

### Про клуб / тренера
- [x] Місія, підхід до тренувань — `highlights` у `niches.ts`
- [ ] Історія, досвід
- [x] Сертифікати, нагороди — реалізовано через `team` (поле specializations) та `nicheFaq` у `niches.ts`

### Онлайн-запис
- [x] Форма для запису на пробне тренування — реалізовано через BookingSection (кроки: послуга → дата/час → контакти → підтвердження)
- [x] Вибір дати та часу — реалізовано через BookingSection (крок 2: дата/час)
- [ ] Підтвердження через SMS/Email

### Блог
- [x] Пов'язані статті блогу — реалізовано через секцію блогу у `niches/[slug]/page.tsx`
- [x] Статті про тренування, харчування, мотивацію — реалізовано через секцію блогу у `niches/[slug]/page.tsx`
- [x] Відео-тренування (YouTube embed) — реалізовано через `nicheFaq` у `niches.ts`

### Контакти
- [x] Адреса, телефон — реалізовано через `address`, `phone` у `niches.ts`
- [x] Години роботи — реалізовано через `openingHours` у `niches.ts`
- [ ] Карта (Google Maps — не реалізовано)
- [x] Соцмережі (Instagram, Facebook, YouTube, TikTok) — реалізовано через `nicheFaq` у `niches.ts`

---

## Додаткові функції (Premium)
- [ ] Онлайн-оплата абонементів
- [ ] Особистий кабінет (історія тренувань, прогрес)
- [ ] Онлайн-тренування (відеозв'язок з тренером)
- [x] Калькулятор ІМТ (Body Mass Index) — `BMICalculator.tsx` client component, `bmiCalculator: true` у `niches.ts`
- [ ] План харчування (PDF для завантаження)
- [ ] Магазин спортивного харчування

---

## SEO
- [x] Title — `titleSeo` у `niches.ts`, `generateMetadata` у `page.tsx`
- [x] Meta Description — `metaDescription` у `niches.ts`
- [x] Schema.org: LocalBusiness — `schemaType` у `niches.ts`, `businessLd` у `page.tsx`
- [x] Ключові слова SEO — `tags` у `niches.ts` + `generateMetadata` у `page.tsx`
- [x] OpenGraph tags — реалізовано через `generateMetadata` у `page.tsx`
- [x] Canonical URL — реалізовано через `generateMetadata` у `page.tsx`
- [x] Internal links — реалізовано через секції пов'язаних ніш, блогу та портфоліо у `niches/[slug]/page.tsx`
- [x] Breadcrumb навігація — реалізовано у `niches/[slug]/page.tsx`

---

### Примітки
- Мотиваційний контент (фото, відео) — дуже важливий для конверсії.
- Показати реальні результати клієнтів (з їх дозволом).
- Для персональних тренерів — акцент на особистість (story, підхід).
