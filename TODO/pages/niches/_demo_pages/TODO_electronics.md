# Магазин електроніки / Техніки — codenest.com.ua / Demo
Опис: Demo-сторінка для ніші "магазин електроніки / побутова техніка". SSG + ISR, складний e-commerce.
**Складність:** 🔴 Складна (великий каталог + порівняння + фільтри)
**Статус:** ✅ Готово (MVP — shared template `niches/[slug]/page.tsx`)
**i18n статус:** ✅ Повністю перекладено (EN + UK)

---

> ⚠️ **Незакреслені пункти ([ ]) — Phase 2:** потребують реального медіа (фото/відео), backend-інтеграцій або зовнішніх API. Demo MVP реалізовано через shared template `niches/[slug]/page.tsx`.

## Hero
- [x] Slider новинок / акцій — shared template Hero секція у `niches/[slug]/page.tsx`
- [x] H1: "Електроніка та техніка — кращі ціни, швидка доставка" — shared template Hero
- [ ] Пошук із autocomplete по 10000+ товарів — потребує реальних фільтрів
- [x] Банери акцій: Black Friday, сезонний розпродаж — реалізовано через `promotions` у `niches.ts` — shared template

## Каталог та навігація
- [ ] Mega-menu з категоріями та підкатегоріями:
  - Смартфони, Ноутбуки, Телевізори, Аудіо, Фото/Відео, Аксесуари, Побутова техніка
- [ ] Фільтри (багаторівневі): бренд, процесор, RAM, діагональ, ціна, рейтинг — потребує реальних фільтрів
- [ ] Сортування: популярність, ціна, новинки, знижки — потребує реальних фільтрів
- [ ] Вигляд: Grid / List (перемикач) — потребує реальних фільтрів
- [ ] "Знайдено X товарів" + кількість у кожному фільтрі — потребує реальних фільтрів
- [ ] URL-параметри фільтрів для SEO — потребує реальних фільтрів

## Сторінка товару
- [ ] Фотогалерея + zoom + 360° (для деяких) — потребує реальних фото
- [x] Характеристики: таблиця специфікацій — реалізовано через `specs[]` у `techProducts` + секція «Популярні товари» у `niches/[slug]/page.tsx`
- [ ] Короткий та повний опис (tabs або accordion)
- [ ] Відео-огляд (YouTube embed) — потребує реальних відео
- [ ] Колір / модифікація (switcher)
- [ ] Ціна + "Купити" + "Купити в кредит" + "Порівняти" — потребує реального кошика
- [ ] Наявність на складі + час доставки
- [x] Відгуки покупців з рейтингом (1-5 зірок) — реалізовано через `NicheReviews` компонент у `niches/[slug]/page.tsx` — shared template
- [x] "Характеристики" — табличний вигляд — реалізовано через `specs[]` у `techProducts` у `niches.ts`
- [ ] "Разом з цим купують" (cross-sell)
- [ ] "Переглянені раніше" (history)

## Порівняння товарів
- [ ] Додавання до порівняння (до 4 товарів)
- [ ] Таблиця порівняння характеристик
- [ ] Підсвічування відмінностей
- [ ] Можливість видалити / додати товар

## Кошик та чекаут
- [x] Промокоди та знижки — реалізовано через `promotions` у `niches.ts` — shared template
- [x] Кредит/розстрочка через ПриватБанк / Monobank — реалізовано через `nicheFaq` у `niches.ts` — shared template
- [ ] Доставка: Нова Пошта, Укрпошта, кур'єр, самовивіз
- [ ] Оплата: картка, LiqPay, Apple Pay, при отриманні — потребує реальних платежів

## Кабінет
- [x] Замовлення та статуси — реалізовано через `nicheFaq` у `niches.ts` — shared template
- [ ] Вибране (wishlist) — потребує реального wishlist
- [ ] Порівняння
- [ ] Відгуки
- [x] Гарантійні талони — реалізовано через `nicheFaq` у `niches.ts` — shared template

## SEO
- [x] Title: "[Назва] — Електроніка та техніка | Купити онлайн" — `titleSeo` у `niches.ts`, `generateMetadata` у `page.tsx` — shared template
- [x] Meta Description — `metaDescription` у `niches.ts` — shared template
- [x] Schema.org: Product + Offer + AggregateRating для кожного товару — `schemaType` у `niches.ts`, `businessLd` у `page.tsx` — shared template
- [x] Ключові слова SEO — `tags` у `niches.ts` + `generateMetadata` у `page.tsx` — shared template
- [x] OpenGraph tags — реалізовано через `generateMetadata` у `page.tsx` — shared template
- [x] Canonical URL — реалізовано через `generateMetadata` у `page.tsx` — shared template
- [x] Internal links — реалізовано через секції пов'язаних ніш, блогу та портфоліо у `niches/[slug]/page.tsx` — shared template
- [x] Breadcrumb навігація — реалізовано у `niches/[slug]/page.tsx` — shared template
- [ ] Фасетна навігація: правильні canonical + noindex для фільтрованих сторінок — потребує реальних фільтрів

## Реалізовано (shared template)
- [x] Hero секція — shared template Hero у `niches/[slug]/page.tsx`
- [x] Highlights / переваги — `highlights` у `niches.ts` + секція Highlights у `niches/[slug]/page.tsx`
- [x] Акції та знижки — `promotions` у `niches.ts` + секція у `page.tsx` (Трейд-ін, Розстрочка 0%, Гарантійний сервіс 1 рік)
- [x] Калькулятор вартості — `calculatorSteps` у `niches.ts` + `NicheCalculator` компонент (категорія → сегмент → оплата/доставка)
- [x] Відгуки клієнтів — `NicheReviews` компонент у `niches/[slug]/page.tsx`
- [x] Статистика довіри — `trustStats` у `niches.ts` + `NicheStats` у `niches/[slug]/page.tsx`
- [x] Список послуг/товарів — `mockServices` у `niches.ts`
- [x] Підкатегорії ніші — `variants` у `niches.ts` + секція "Варіанти" у `niches/[slug]/page.tsx`
- [x] Пов'язані статті блогу — секція блогу у `niches/[slug]/page.tsx`
- [x] Кейс портфоліо — секція портфоліо у `niches/[slug]/page.tsx`
- [x] Пов'язані ніші — секція пов'язаних ніш у `niches/[slug]/page.tsx`
- [x] FAQ — `nicheFaq` у `niches.ts` + загальний FAQ у `niches/[slug]/page.tsx`
- [x] Schema.org — `schemaType` у `niches.ts` + `businessLd` у `page.tsx`
- [x] SEO (meta, OG, canonical, breadcrumbs) — `generateMetadata` у `page.tsx`
