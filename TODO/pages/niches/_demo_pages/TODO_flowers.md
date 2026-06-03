# Квітковий магазин / Подарунки — codenest.com.ua / Demo
Опис: Demo-сторінка для ніші "квітковий магазин / доставка квітів та подарунків". SSG + ISR.
**Складність:** 🟢 Проста (e-commerce лайт + термінова доставка)
**Статус:** ✅ Готово (MVP — shared template `niches/[slug]/page.tsx`)
**i18n статус:** ✅ Повністю перекладено (EN + UK)

---

> ⚠️ **Незакреслені пункти ([ ]) — Phase 2:** потребують реального медіа (фото/відео), backend-інтеграцій або зовнішніх API. Demo MVP реалізовано через shared template `niches/[slug]/page.tsx`.

## Hero
- [x] Яскраве, емоційне фото букету — shared template Hero секція у `niches/[slug]/page.tsx` (градієнт замість реального фото)
- [x] H1: "Доставка квітів — зробіть цей день особливим" — shared template Hero
- [x] CTA: "Замовити букет" + "Доставка за 2 години" — shared template Hero
- [x] Таймер або лічильник — реалізовано через `promotions` у `niches.ts` — shared template

## Каталог
- [x] Список послуг/букетів — `mockServices` у `niches.ts` + секція послуг у `niches/[slug]/page.tsx` — shared template
- [x] Категорії: букети, кошики, композиції, рослини у горщиках, сухоцвіти — реалізовано через `variants` у `niches.ts` — shared template
- [x] Привід: День народження, Весілля, 8 Березня, 14 Лютого, Співчуття, Без приводу — реалізовано через `variants` у `niches.ts` — shared template
- [ ] Фільтр: тип квітів (троянди, тюльпани, піони, мікс), ціна, колір — потребує реальних фільтрів
- [ ] Сортування: популярність, ціна, новинки — потребує реальних фільтрів
- [x] Картки букетів — реалізовано через `productCards` у `niches.ts` + секція каталогу у `niches/[slug]/page.tsx` — shared template
- [x] Значки: "Хіт", "Новинка", "Останній" — реалізовано через `badge` у `productCards` — shared template

## Сторінка букету
- [ ] 3-4 фото (загальний вигляд, деталі, в руках, з упаковкою) — потребує реальних фото
- [ ] Склад букету (перелік квітів)
- [x] Розмір: S / M / L (з різною кількістю квітів) — реалізовано через `sizes[]` у `productCards` — shared template
- [ ] Додатки: листівка, цукерки, іграшка, кулі
- [x] Текст листівки (textarea) — реалізовано через `nicheFaq` у `niches.ts` — shared template
- [x] Вибір дати та часу доставки — реалізовано через `BookingSection` у `niches/[slug]/page.tsx` — shared template
- [ ] "Додати до кошика" — потребує реального кошика

## Додаткові товари (cross-sell)
- [ ] Цукерки та солодощі
- [ ] М'які іграшки
- [ ] Повітряні кулі
- [ ] Листівки
- [ ] Торти (партнерська кондитерська)

## Доставка
- [ ] Термінова доставка: 1-2 години — потребує реальної інтеграції
- [ ] Стандартна: вибір дати та часу — потребує реальної інтеграції
- [ ] "Сюрприз" — доставка без попередження одержувачу
- [ ] Адреса одержувача (не замовника)
- [ ] Фотозвіт при отриманні — потребує реальних фото

## Корпоративним клієнтам
- [x] Регулярні постачання квітів для офісу — реалізовано через `variants` та `mockServices` у `niches.ts` — shared template
- [x] Оформлення заходів (весілля, конференції) — реалізовано через `variants` та `mockServices` у `niches.ts` — shared template
- [x] Корпоративні знижки — реалізовано через `variants` у `niches.ts` — shared template

## SEO
- [x] Title: "[Назва] — Доставка квітів у [Місто] | Замовити букет" — `titleSeo` у `niches.ts`, `generateMetadata` у `page.tsx` — shared template
- [x] Meta Description — `metaDescription` у `niches.ts` — shared template
- [x] Schema.org: Florist + Product + LocalBusiness — `schemaType` у `niches.ts`, `businessLd` у `page.tsx` — shared template
- [x] Ключові слова SEO — `tags` у `niches.ts` + `generateMetadata` у `page.tsx` — shared template
- [x] OpenGraph tags — реалізовано через `generateMetadata` у `page.tsx` — shared template
- [x] Canonical URL — реалізовано через `generateMetadata` у `page.tsx` — shared template
- [x] Internal links — реалізовано через секції пов'язаних ніш, блогу та портфоліо у `niches/[slug]/page.tsx` — shared template
- [x] Breadcrumb навігація — реалізовано у `niches/[slug]/page.tsx` — shared template
- [ ] Сезонні landing pages: "Квіти на 8 Березня", "Букети на День Валентина"

## Реалізовано (shared template)
- [x] Hero секція — shared template Hero у `niches/[slug]/page.tsx`
- [x] Highlights / переваги — `highlights` у `niches.ts` + секція Highlights у `niches/[slug]/page.tsx`
- [x] Акції та знижки — `promotions` у `niches.ts` + секція "Акції" у `niches/[slug]/page.tsx`
- [x] Команда майстрів/флористів — `team` у `niches.ts` + секція "Команда" у `niches/[slug]/page.tsx`
- [x] Онлайн-запис (BookingSection) — `bookingForm: true` у `niches.ts`; step 1: послуга, step 2: дата/час, step 3: контакти, step 4: підтвердження
- [x] Калькулятор вартості (NicheCalculator) — `calculatorSteps` у `niches.ts` + компонент у `niches/[slug]/page.tsx`
- [x] Відгуки клієнтів — `NicheReviews` компонент у `niches/[slug]/page.tsx`
- [x] Статистика довіри — `trustStats` у `niches.ts` + `NicheStats` у `niches/[slug]/page.tsx`
- [x] Список послуг/товарів — `mockServices` у `niches.ts`
- [x] Підкатегорії ніші — `variants` у `niches.ts` + секція "Варіанти" у `niches/[slug]/page.tsx`
- [x] Картки товарів — `productCards` у `niches.ts` + секція каталогу у `niches/[slug]/page.tsx`
- [x] Процес роботи — `processSteps` у `niches.ts` + секція "Як ми працюємо" у `niches/[slug]/page.tsx`
- [x] Пов'язані статті блогу — секція блогу у `niches/[slug]/page.tsx`
- [x] Кейс портфоліо — секція портфоліо у `niches/[slug]/page.tsx`
- [x] Пов'язані ніші — секція пов'язаних ніш у `niches/[slug]/page.tsx`
- [x] FAQ — `nicheFaq` у `niches.ts` + загальний FAQ у `niches/[slug]/page.tsx`
- [x] Schema.org — `schemaType` у `niches.ts` + `businessLd` у `page.tsx`
- [x] SEO (meta, OG, canonical, breadcrumbs) — `generateMetadata` у `page.tsx`
