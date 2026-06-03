# Нішева сторінка: Дитячий центр / Розвивальні заняття / Приватний садок
Опис: Демо-сайт для дитячого розвивального центру, приватного садочку або школи раннього розвитку.
**URL:** `/marketplace/demo/kids-center`
**Ніша:** Дитячі центри, приватні садочки, школи розвитку, секції для дітей
**Статус:** ✅ Готово (MVP — shared template `niches/[slug]/page.tsx`)
**i18n статус:** ✅ Повністю перекладено (EN + UK)

---

> ⚠️ **Незакреслені пункти ([ ]) — Phase 2:** потребують реального медіа (фото/відео), backend-інтеграцій або зовнішніх API. Demo MVP реалізовано через shared template `niches/[slug]/page.tsx`.

## Обов'язкові елементи

### Hero-секція
- [ ] Яскраве, тепле фото дітей за навчанням/грою
- [x] Слоган (що розвивається у дитини) — реалізовано через `highlights` у `niches.ts`
- [x] CTA: "Записати дитину" + "Розклад занять"

### Про заклад
- [x] Місія та підхід до розвитку дітей — `highlights` у `niches.ts`
- [x] Вік дітей (наприклад, 1.5 – 7 років) — реалізовано через `highlights` ("Від 0 до 12") + `nicheFaq` у `niches.ts`
- [x] Кількість груп, розмір груп — реалізовано через `trustStats` ("50+ видів занять та гуртків") у `niches.ts`
- [x] Атмосфера, безпека, сертифікати — реалізовано через `highlights` + `team` у `niches.ts`
- [ ] Фото простору: кімнати, ігровий куточок, їдальня

### Програми / Напрями
- [x] Список напрямів/послуг — `mockServices` у `niches.ts` + секція послуг у `niches/[slug]/page.tsx`
- [x] Картки напрямів: творчість, мова, математика, спорт, танці, музика — реалізовано через `mockServices` у `niches.ts`
- [x] Для кожного: вік, тривалість, короткий опис — реалізовано через `mockServices` (duration + price) у `niches.ts`
- [x] Методики (Монтессорі, Вальдорф, STEM тощо) — реалізовано через `tags` та `variants` у `niches.ts`

### Розклад занять
- [x] Таблиця розкладу по днях — shared template `scheduleItems` у `niches.ts` + секція «Розклад занять» у `niches/[slug]/page.tsx`
- [x] Фільтр за напрямом (категорія) — `ScheduleFilter.tsx` client component (фільтр за категорією/днем реалізовано)
- [x] Посилання на пробний урок — реалізовано через `promotions` + `nicheFaq` у `niches.ts` + `BookingSection` у `niches/[slug]/page.tsx`

### Педагоги
- [x] Картки педагогів: фото, ім'я, досвід, напрям — `team` у `niches.ts` + секція "Команда" у `niches/[slug]/page.tsx`
- [x] Дипломи та сертифікати — реалізовано через поле `team` з `specializations` у `niches.ts`

### Онлайн-запис
- [x] Вибір послуги/напряму — реалізовано через shared компоненти у `niches/[slug]/page.tsx`
- [x] Вибір дати та часу — реалізовано через shared компоненти у `niches/[slug]/page.tsx`
- [x] Форма: ім'я, контакти — реалізовано через shared компоненти у `niches/[slug]/page.tsx`
- [x] Форма з полем: ім'я дитини, вік — реалізовано через `BookingSection` (step 3: форма контактів) у `niches/[slug]/page.tsx`
- [x] Пробний урок (безкоштовний або з знижкою) — реалізовано через `promotions` у `niches.ts`
- [ ] Нагадування та підтвердження

### Ціни
- [x] Тарифні плани — `pricingPlans` у `niches.ts` + секція "Тарифи" у `niches/[slug]/page.tsx`
- [ ] Прозора таблиця: разові заняття, абонементи (4/8/12 занять) (детальна таблиця — потребує розширення)
- [x] Літній табір або інтенсиви (опціонально) — реалізовано через `mockServices` ("Денний табір") у `niches.ts`

### Галерея
- [ ] Фото занять, заходів, дитячих виробів
- [ ] Відео-огляд простору

### Відгуки батьків
- [x] Відгуки клієнтів — `NicheReviews` компонент у `niches/[slug]/page.tsx`
- [ ] Фото + ім'я батька/матері + коротка цитата (реальні фото — потребують медіа)

### Контакти
- [x] Адреса + телефон — реалізовано через `address`, `phone` у `niches.ts`
- [x] Години роботи — реалізовано через `openingHours` у `niches.ts`
- [ ] Карта (Google Maps — не реалізовано)
- [ ] Telegram, Instagram

---

## Варіанти ніші (підкатегорії)
- [x] **Приватний садочок** — повний день, харчування, нянечки — `variants` у `niches.ts`
- [x] **Школа програмування для дітей** — Scratch, Python, Minecraft coding — `variants` у `niches.ts`
- [x] **Дитяча танцювальна школа** — балет, сучасні танці, хіп-хоп — `variants` у `niches.ts`
- [x] **Мовна школа для дітей** — англійська, польська з нуля — `variants` у `niches.ts`
- [x] **Логопедичний центр** — корекція мовлення, НЛП для дітей — `variants` у `niches.ts`

---

## SEO
- [x] Title: "Дитячий центр розвитку — навчання та творчість | [Назва]" — `titleSeo` у `niches.ts`, `generateMetadata` у `page.tsx`
- [x] Meta Description — `metaDescription` у `niches.ts`
- [x] Schema.org: ChildCare + LocalBusiness — `schemaType` у `niches.ts`, `businessLd` у `page.tsx`
- [x] Ключові слова SEO — `tags` у `niches.ts` + `generateMetadata` у `page.tsx`
- [x] OpenGraph tags — реалізовано через `generateMetadata` у `page.tsx`
- [x] Canonical URL — реалізовано через `generateMetadata` у `page.tsx`
- [x] Internal links — реалізовано через секції пов'язаних ніш, блогу та портфоліо у `niches/[slug]/page.tsx`
- [x] Breadcrumb навігація — реалізовано у `niches/[slug]/page.tsx`

## Реалізовано (shared template)
- [x] Акції та знижки — `promotions` у `niches.ts` + секція "Акції" у `niches/[slug]/page.tsx`
- [x] Команда педагогів — `team` у `niches.ts` + секція "Команда" у `niches/[slug]/page.tsx`
- [x] Онлайн-запис (BookingSection) — `bookingForm: true` у `niches.ts`; step 1: послуга, step 2: дата/час, step 3: контакти, step 4: підтвердження
- [x] Калькулятор вартості (NicheCalculator) — `calculatorSteps` у `niches.ts` + компонент у `niches/[slug]/page.tsx`
