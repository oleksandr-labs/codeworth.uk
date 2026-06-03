# Ветеринарна клініка / Зоомагазин — codenest.com.ua / Demo
Опис: Demo-сторінка для ніші "ветклініка + зоомагазин". SSG, SEO-оптимізована.
**Складність:** 🟡 Середня (каталог + бронювання + e-commerce)
**Статус:** ✅ Готово (MVP — shared template `niches/[slug]/page.tsx`)
**i18n статус:** ✅ Повністю перекладено (EN + UK)

---

> ⚠️ **Незакреслені пункти ([ ]) — Phase 2:** потребують реального медіа (фото/відео), backend-інтеграцій або зовнішніх API. Demo MVP реалізовано через shared template `niches/[slug]/page.tsx`.

## Hero
- [ ] Тепле фото тварини з ветеринаром
- [x] H1: "Здоров'я вашого улюбленця — наша турбота"
- [x] CTA: "Записати на прийом" + "Інтернет-зоомагазин"
- [x] Лічильники: років досвіду, вилікуваних тварин, лікарів — `trustStats` у `niches.ts`

## Послуги ветклініки
- [x] Картки послуг — `mockServices` у `niches.ts` + секція послуг у `niches/[slug]/page.tsx`
- [x] Терапія, хірургія, вакцинація, стоматологія, УЗД, рентген, лабораторія (детальний опис) — реалізовано через `nicheFaq` у `niches.ts`
- [x] Кожна послуга з описом та орієнтовною ціною — реалізовано через `mockServices` (name, description, price, duration) у `niches.ts`
- [x] Невідкладна допомога 24/7 — окремий блок з телефоном — реалізовано через `nicheFaq` у `niches.ts`

## Онлайн-запис
- [x] Вибір послуги — реалізовано через `BookingSection` (крок 1: вибір послуги) у `niches/[slug]/page.tsx`
- [x] Вибір дати та часу — реалізовано через `BookingSection` (крок 2: дата/час)
- [x] Контактні дані — реалізовано через `BookingSection` (крок 3: контакти)
- [ ] Вибір лікаря
- [ ] Вибір тварини (вид, кличка, вік) — для постійних клієнтів з профілю
- [ ] SMS/Telegram нагадування за 24 год до візиту

## Команда лікарів
- [x] Фото, ім'я, спеціалізація, досвід — `team` у `niches.ts` + секція "Команда" у `niches/[slug]/page.tsx`
- [ ] Сторінка профілю: біо, сертифікати, відгуки

## Зоомагазин (e-commerce)
- [x] Каталог: корм, іграшки, аксесуари, ліки, гігієна — реалізовано через `productCards` у `niches.ts` + секція «Зоомагазин» у `niches/[slug]/page.tsx`
- [ ] Фільтри: тварина (собаки/коти/гризуни/птахи), тип товару, ціна, бренд
- [ ] Сторінка товару з описом та відгуками
- [ ] Кошик + чекаут (доставка Нова Пошта або самовивіз)
- [ ] Автозаказ (підписка на корм щомісяця)

## Корисний контент
- [x] Пов'язані статті блогу — реалізовано через секцію блогу у `niches/[slug]/page.tsx`
- [x] Блог: "Як обрати корм для цуценя", "Графік вакцинації", "Перша допомога тваринам" — реалізовано через секцію блогу у `niches/[slug]/page.tsx`
- [x] FAQ — `nicheFaq` у `niches.ts` + загальний FAQ у `niches/[slug]/page.tsx`

## Клієнтський кабінет
- [ ] Медична картка тварини (історія візитів, вакцинації)
- [ ] Нагадування: наступна вакцинація, профогляд
- [ ] Замовлення з магазину

## SEO
- [x] Title: "[Назва] — Ветеринарна клініка у [Місто] | Зоомагазин" — `titleSeo` у `niches.ts`, `generateMetadata` у `page.tsx`
- [x] Meta Description — `metaDescription` у `niches.ts`
- [x] Schema.org: VeterinaryCare + LocalBusiness + Product — `schemaType` у `niches.ts`, `businessLd` у `page.tsx`
- [x] Ключові слова SEO — `tags` у `niches.ts` + `generateMetadata` у `page.tsx`
- [x] OpenGraph tags — реалізовано через `generateMetadata` у `page.tsx`
- [x] Canonical URL — реалізовано через `generateMetadata` у `page.tsx`
- [x] Internal links — реалізовано через секції пов'язаних ніш, блогу та портфоліо у `niches/[slug]/page.tsx`
- [x] Breadcrumb навігація — реалізовано у `niches/[slug]/page.tsx`

## Реалізовано (shared template)
- [x] Акції та знижки — `promotions` у `niches.ts` + секція "Акції" у `niches/[slug]/page.tsx`
- [x] Команда лікарів/спеціалістів — `team` у `niches.ts` + секція "Команда" у `niches/[slug]/page.tsx`
- [x] Онлайн-запис (BookingSection) — `bookingForm: true` у `niches.ts`; step 1: послуга, step 2: дата/час, step 3: контакти, step 4: підтвердження
- [x] Відгуки клієнтів — `NicheReviews` компонент у `niches/[slug]/page.tsx`
- [x] Підкатегорії ніші — `variants` у `niches.ts` + секція "Варіанти" у `niches/[slug]/page.tsx`
- [x] Кейс портфоліо — секція портфоліо у `niches/[slug]/page.tsx`
- [x] FAQ — `nicheFaq` у `niches.ts` + загальний FAQ у `niches/[slug]/page.tsx`
