# Івент-агентство / Весільний організатор — codenest.com.ua / Demo
Опис: Demo-сторінка для ніші "організація подій / весілля / корпоративи". SSG, SSO-оптимізована.
**Складність:** 🟡 Середня (портфоліо + бронювання + калькулятор)
**Статус:** ✅ Готово (MVP — shared template `niches/[slug]/page.tsx`)
**i18n статус:** ✅ Повністю перекладено (EN + UK)

---

> ⚠️ **Незакреслені пункти ([ ]) — Phase 2:** потребують реального медіа (фото/відео), backend-інтеграцій або зовнішніх API. Demo MVP реалізовано через shared template `niches/[slug]/page.tsx`.

## Hero
- [x] Відео-бекграунд / hero — shared template Hero секція у `niches/[slug]/page.tsx` (градієнт замість реального відео)
- [x] H1: "Створюємо незабутні події" — shared template Hero
- [x] CTA: "Обговорити подію" + "Переглянути портфоліо" — shared template Hero
- [x] Лічильник: організовано подій, задоволених клієнтів — `trustStats` у `niches.ts` — shared template

## Типи подій
- [x] Список послуг за типами подій — `mockServices` у `niches.ts` + секція послуг у `niches/[slug]/page.tsx` — shared template
- [x] Весілля (від класики до bohо) — реалізовано через `mockServices` у `niches.ts` — shared template
- [x] Корпоративні заходи — реалізовано через `mockServices` у `niches.ts` — shared template
- [x] День народження та ювілеї — реалізовано через `mockServices` у `niches.ts` — shared template
- [x] Конференції та семінари — реалізовано через `mockServices` у `niches.ts` — shared template
- [x] Фестивалі та концерти — реалізовано через `variants` у `niches.ts` — shared template
- [x] Дитячі свята — реалізовано через `mockServices` у `niches.ts` — shared template
- [ ] Кожен тип → окрема сторінка з прикладами

## Портфоліо заходів
- [x] Кейс портфоліо — реалізовано через секцію портфоліо у `niches/[slug]/page.tsx` — shared template
- [x] Картки реалізованих подій — реалізовано через `projectCards` у `niches.ts` + секція проєктів у `niches/[slug]/page.tsx` — shared template
- [ ] Великі красиві фото + відео-звіти — потребує реальних фото/відео
- [ ] Фільтр за типом події — потребує реальних фільтрів
- [ ] Кожна подія: опис, кількість гостей, локація, фото/відео — потребує реальних фото/відео
- [x] Відгук клієнта під кожним заходом — реалізовано через `NicheReviews` компонент у `niches/[slug]/page.tsx` — shared template

## Послуги
- [x] Організація "під ключ" — реалізовано через `mockServices` ("Весілля під ключ") + `variants` у `niches.ts` — shared template
- [x] Декор та флористика — реалізовано через `mockServices` у `niches.ts` — shared template
- [x] Ведучий / DJ / артисти — реалізовано через `mockServices` у `niches.ts` — shared template
- [x] Кейтеринг (організація харчування) — реалізовано через `mockServices` у `niches.ts` — shared template
- [ ] Фото та відеозйомка (партнерство)
- [x] Прокат обладнання (звук, світло, меблі) — реалізовано через `mockServices` у `niches.ts` — shared template
- [x] Координація заходу (day-of coordinator) — реалізовано через `mockServices` у `niches.ts` — shared template

## Калькулятор бюджету
- [x] Тип події — реалізовано через `calculatorSteps` у `niches.ts` + `NicheCalculator` у `niches/[slug]/page.tsx` — shared template
- [x] Кількість гостей — реалізовано через `calculatorSteps` у `niches.ts` — shared template
- [x] Рівень / параметри події — реалізовано через `calculatorSteps` у `niches.ts` — shared template
- [x] Результат: орієнтовний бюджет — реалізовано через `NicheCalculator` у `niches/[slug]/page.tsx` — shared template
- [ ] Локація (indoor / outdoor / ресторан)
- [ ] Послуги: декор, музика, фото, кейтеринг (вкл/викл) — розширена конфігурація

## Партнери та локації
- [x] Рекомендовані майданчики (ресторани, замки, сади) — реалізовано через `variants` та `processSteps` у `niches.ts` — shared template
- [x] Партнерські постачальники: фотографи, кондитери, артисти — реалізовано через `variants` та `processSteps` у `niches.ts` — shared template
- [ ] Інтерактивна карта локацій — потребує Google Maps

## Процес роботи
- [x] Покроковий процес роботи — реалізовано через `processSteps` у `niches.ts` + секція "Як ми працюємо" у `niches/[slug]/page.tsx` — shared template
- [x] 1. Консультація та брифінг — реалізовано через `processSteps` у `niches.ts` — shared template
- [x] 2. Концепт та мудборд — реалізовано через `processSteps` у `niches.ts` — shared template
- [x] 3. Підбір підрядників та логістика — реалізовано через `processSteps` у `niches.ts` — shared template
- [x] 4. Реалізація та координація — реалізовано через `processSteps` у `niches.ts` — shared template
- [x] 5. Фото/відеозвіт — реалізовано через `processSteps` у `niches.ts` — shared template

## SEO
- [x] Title: "[Назва] — Організація подій у [Місто] | Весільний організатор" — `titleSeo` у `niches.ts`, `generateMetadata` у `page.tsx` — shared template
- [x] Meta Description — `metaDescription` у `niches.ts` — shared template
- [x] Schema.org: EventPlanning + Event — `schemaType` у `niches.ts`, `businessLd` у `page.tsx` — shared template
- [x] Ключові слова SEO — `tags` у `niches.ts` + `generateMetadata` у `page.tsx` — shared template
- [x] OpenGraph tags — реалізовано через `generateMetadata` у `page.tsx` — shared template
- [x] Canonical URL — реалізовано через `generateMetadata` у `page.tsx` — shared template
- [x] Internal links — реалізовано через секції пов'язаних ніш, блогу та портфоліо у `niches/[slug]/page.tsx` — shared template
- [x] Breadcrumb навігація — реалізовано у `niches/[slug]/page.tsx` — shared template
- [ ] Сезонні landing: "Корпоратив на Новий Рік", "Весілля влітку 2026"

## Реалізовано (shared template)
- [x] Hero секція — shared template Hero у `niches/[slug]/page.tsx`
- [x] Highlights / переваги — `highlights` у `niches.ts` + секція Highlights у `niches/[slug]/page.tsx`
- [x] Акції та знижки — `promotions` у `niches.ts` + секція "Акції" у `niches/[slug]/page.tsx`
- [x] Команда організаторів/фахівців — `team` у `niches.ts` + секція "Команда" у `niches/[slug]/page.tsx`
- [x] Онлайн-запис (BookingSection) — `bookingForm: true` у `niches.ts`; step 1: послуга, step 2: дата/час, step 3: контакти, step 4: підтвердження
- [x] Калькулятор вартості (NicheCalculator) — `calculatorSteps` у `niches.ts` + компонент у `niches/[slug]/page.tsx`
- [x] Відгуки клієнтів — `NicheReviews` компонент у `niches/[slug]/page.tsx`
- [x] Статистика довіри — `trustStats` у `niches.ts` + `NicheStats` у `niches/[slug]/page.tsx`
- [x] Список послуг — `mockServices` у `niches.ts`
- [x] Підкатегорії ніші — `variants` у `niches.ts` + секція "Варіанти" у `niches/[slug]/page.tsx`
- [x] Картки реалізованих подій — `projectCards` у `niches.ts` + секція проєктів у `niches/[slug]/page.tsx`
- [x] Процес роботи — `processSteps` у `niches.ts` + секція "Як ми працюємо" у `niches/[slug]/page.tsx`
- [x] Пов'язані статті блогу — секція блогу у `niches/[slug]/page.tsx`
- [x] Кейс портфоліо — секція портфоліо у `niches/[slug]/page.tsx`
- [x] Пов'язані ніші — секція пов'язаних ніш у `niches/[slug]/page.tsx`
- [x] FAQ — `nicheFaq` у `niches.ts` + загальний FAQ у `niches/[slug]/page.tsx`
- [x] Schema.org — `schemaType` у `niches.ts` + `businessLd` у `page.tsx`
- [x] SEO (meta, OG, canonical, breadcrumbs) — `generateMetadata` у `page.tsx`
