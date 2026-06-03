# Меблі / Інтер'єр — codenest.com.ua / Demo
Опис: Demo-сторінка для ніші "магазин меблів / інтер'єрний шоурум". SSG + ISR.
**Складність:** 🟡 Середня (каталог + конфігуратор + AR preview)
**Статус:** ✅ Готово (MVP — shared template `niches/[slug]/page.tsx`)
**i18n статус:** ✅ Повністю перекладено (EN + UK)

---

> ⚠️ **Незакреслені пункти ([ ]) — Phase 2:** потребують реального медіа (фото/відео), backend-інтеграцій або зовнішніх API. Demo MVP реалізовано через shared template `niches/[slug]/page.tsx`.

## Hero
- [x] Атмосферне фото інтер'єру — shared template Hero секція у `niches/[slug]/page.tsx` (градієнт замість реального фото)
- [x] H1: "Меблі для вашого дому — стиль, якість, комфорт" — shared template Hero
- [x] CTA: "Каталог" + "Безкоштовна консультація дизайнера" — shared template Hero
- [ ] Банер нової колекції або акції — потребує реальних фото

## Каталог
- [x] Список послуг/товарів — `mockServices` у `niches.ts` + секція послуг у `niches/[slug]/page.tsx` — shared template
- [x] Категорії: вітальня, спальня, кухня, офіс, дитяча, ванна, сад — реалізовано через `variants` + `mockServices` у `niches.ts` — shared template
- [ ] Фільтри: стиль (модерн/класика/лофт/скандинавський), матеріал, ціна, колір — потребує реальних фільтрів
- [x] Картки: фото в інтер'єрі, назва, ціна, матеріал, розміри — реалізовано через `productCards` у `niches.ts` + секція «Каталог меблів» у `niches/[slug]/page.tsx` — shared template
- [ ] Quick view при hover
- [x] Значки: "Новинка", "Акція", "Хіт продажу", "Під замовлення" — реалізовано через `badge` у `productCards` — shared template

## Сторінка товару
- [ ] Галерея: фото в інтер'єрі + на білому фоні + деталі — потребує реальних фото
- [ ] 3D модель або 360° фото (опційно) — потребує реальних фото/відео
- [ ] Вибір кольору оббивки / матеріалу (swatch)
- [ ] Розміри (ДхШхВ) та вага
- [ ] Склад / матеріали / виробник
- [x] Термін виготовлення (якщо під замовлення) — реалізовано через `nicheFaq` у `niches.ts` — shared template
- [ ] Доставка та збірка (ціна та умови)
- [ ] "Разом з цим" — меблі в тому ж стилі (комплекти)
- [x] Відгуки + фото від покупців з тегом "Фото в інтер'єрі" — реалізовано через `NicheReviews` компонент у `niches/[slug]/page.tsx` — shared template

## Конфігуратор кімнати
- [ ] Drag & Drop меблі на план кімнати (2D)
- [ ] Вибір розмірів кімнати
- [ ] Попередній перегляд комбінації меблів
- [ ] "Замовити цю комбінацію" — кошик з усіма предметами — потребує реального кошика

## Консультація дизайнера
- [x] Форма консультації — `BookingSection` у `niches/[slug]/page.tsx` — shared template
- [ ] Форма: завантажити фото кімнати + побажання — потребує реального завантаження файлів
- [ ] Безкоштовна відеоконсультація — потребує реальної відеоінтеграції
- [x] Портфоліо реалізованих інтер'єрів — секція портфоліо у `niches/[slug]/page.tsx` — shared template

## Доставка та послуги
- [x] Доставка: по місту, по Україні, самовивіз зі шоуруму — реалізовано через `nicheFaq` у `niches.ts` — shared template
- [x] Збірка меблів (включена або за доплату) — реалізовано через `nicheFaq` у `niches.ts` — shared template
- [x] Повернення протягом 14 днів — реалізовано через `nicheFaq` у `niches.ts` — shared template

## Шоурум
- [x] Адреса шоурумів + телефон — реалізовано через `address`, `phone` у `niches.ts` — shared template
- [x] Години роботи — реалізовано через `openingHours` у `niches.ts` — shared template
- [ ] Фото шоуруму — потребує реальних фото
- [ ] Віртуальний тур по шоуруму (360° панорама) — потребує реальних фото/відео
- [x] Запис на відвідування — `BookingSection` у `niches/[slug]/page.tsx` — shared template

## SEO
- [x] Title: "[Назва] — Меблі для дому | Інтернет-магазин меблів" — `titleSeo` у `niches.ts`, `generateMetadata` у `page.tsx` — shared template
- [x] Meta Description — `metaDescription` у `niches.ts` — shared template
- [x] Schema.org: Product + Offer, FurnitureStore — `schemaType` у `niches.ts`, `businessLd` у `page.tsx` — shared template
- [x] Ключові слова SEO — `tags` у `niches.ts` + `generateMetadata` у `page.tsx` — shared template
- [x] OpenGraph tags — реалізовано через `generateMetadata` у `page.tsx` — shared template
- [x] Canonical URL — реалізовано через `generateMetadata` у `page.tsx` — shared template
- [x] Internal links — реалізовано через секції пов'язаних ніш, блогу та портфоліо у `niches/[slug]/page.tsx` — shared template
- [x] Breadcrumb навігація — реалізовано у `niches/[slug]/page.tsx` — shared template

## Реалізовано (shared template)
- [x] Hero секція — shared template Hero у `niches/[slug]/page.tsx`
- [x] Highlights / переваги — `highlights` у `niches.ts` + секція Highlights у `niches/[slug]/page.tsx`
- [x] Акції та знижки — `promotions` у `niches.ts` + секція "Акції" у `niches/[slug]/page.tsx`
- [x] Команда майстрів/фахівців — `team` у `niches.ts` + секція "Команда" у `niches/[slug]/page.tsx`
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
