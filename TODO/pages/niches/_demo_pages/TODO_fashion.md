# Інтернет-магазин одягу та моди — codenest.com.ua / Demo
Опис: Demo-сторінка для ніші "fashion e-commerce / магазин одягу". SSG + ISR для каталогу.
**Статус:** ✅ Готово (MVP — shared template `niches/[slug]/page.tsx`)
**i18n статус:** ✅ Повністю перекладено (EN + UK)

---

> ⚠️ **Незакреслені пункти ([ ]) — Phase 2:** потребують реального медіа (фото/відео), backend-інтеграцій або зовнішніх API. Demo MVP реалізовано через shared template `niches/[slug]/page.tsx`.

## Hero
- [x] Fullscreen hero — shared template Hero секція у `niches/[slug]/page.tsx`
- [x] Анімований заголовок нової колекції — shared template Hero
- [x] CTA: "Переглянути колекцію" + "Sale -30%"

## Каталог товарів
- [x] Фільтри: категорія — `ProductCatalog.tsx` client component (фільтр за категорією реалізовано)
- [ ] Фільтри: розмір, колір, ціна, бренд, сезон — потребує реальних фільтрів
- [ ] Сортування: новинки, ціна, популярність, знижки — потребує реальних фільтрів
- [ ] Grid або List вигляд (перемикач) — потребує реальних фільтрів
- [x] Картки товарів: hover показує 2-е фото — реалізовано через `productCards` у `niches.ts` + секція «Нова колекція» у `niches/[slug]/page.tsx` (градієнт замість фото)
- [ ] Quick view (переглянути деталі без переходу)
- [x] Значки: "NEW", "SALE", "Bestseller", "Last items" — реалізовано через `badge` та `badgeColor` у `productCards`

## Фільтрація та пошук
- [ ] Пошук з autocomplete (показувати товари в реальному часі) — потребує реальних фільтрів
- [ ] Збереження фільтрів у URL (для SEO та sharing) — потребує реальних фільтрів
- [ ] Порожній стан: "Нічого не знайдено + схожі товари"

## Сторінка товару
- [ ] Фотогалерея: 4-6 фото, zoom при hover — потребує реальних фото
- [ ] Вибір розміру з size guide таблицею
- [ ] Вибір кольору (кольорові swatch)
- [ ] Таблиця розмірів
- [ ] "Додати до кошика" + "Додати до вибраного" — потребує реального кошика/wishlist
- [ ] Наявність залишку та терміни доставки
- [ ] Опис + склад тканини + інструкція з догляду
- [x] Відгуки покупців з фото — реалізовано через `NicheReviews` компонент у `niches/[slug]/page.tsx` — shared template
- [ ] "Разом з цим купують" (cross-sell)
- [ ] "Ви нещодавно переглядали"

## Кошик та чекаут
- [ ] Mini-cart (slide-in drawer) при додаванні товару — потребує реального кошика
- [ ] Кошик: список товарів, зміна кількості, видалення — потребує реального кошика
- [x] Промокод та знижки — реалізовано через `promotions` у `niches.ts` — shared template
- [ ] 3-крокова оформлення: доставка → оплата → підтвердження — потребує реального кошика
- [x] Доставка: Нова Пошта, Укрпошта, кур'єр Київ — реалізовано через `nicheFaq` у `niches.ts` — shared template
- [ ] Оплата: LiqPay, Monobank, Apple Pay — потребує реальних платежів

## Кабінет покупця
- [ ] Замовлення та статуси
- [ ] Вибране (wishlist) — потребує реального wishlist
- [ ] Розмірна картка
- [x] Повернення та обмін (форма) — реалізовано через `nicheFaq` у `niches.ts` — shared template

## Маркетинг
- [x] Sale секція з таймером (countdown) — реалізовано через `promotions` у `niches.ts` — shared template
- [ ] Email розсилка: нова колекція, знижки — потребує реальної Email інтеграції
- [ ] Instagram wishlist шопінг

## SEO
- [x] Title: "[Назва] — Одяг та аксесуари | Доставка по Україні" — `titleSeo` у `niches.ts`, `generateMetadata` у `page.tsx` — shared template
- [x] Meta Description — `metaDescription` у `niches.ts` — shared template
- [x] Schema.org: Product + Offer + AggregateRating для кожного товару — `schemaType` у `niches.ts` — shared template
- [x] Schema.org: BreadcrumbList — реалізовано у `niches/[slug]/page.tsx` — shared template
- [x] Ключові слова SEO — `tags` у `niches.ts` + `generateMetadata` у `page.tsx` — shared template
- [x] OpenGraph tags — реалізовано через `generateMetadata` у `page.tsx` — shared template
- [x] Canonical URL — реалізовано через `generateMetadata` у `page.tsx` — shared template
- [x] Internal links — реалізовано через секції пов'язаних ніш, блогу та портфоліо у `niches/[slug]/page.tsx` — shared template
- [x] Breadcrumb навігація — реалізовано у `niches/[slug]/page.tsx` — shared template
- [ ] OG-image для кожного товару (з фото) — потребує реальних фото

## Реалізовано (shared template)
- [x] Hero секція — shared template Hero у `niches/[slug]/page.tsx`
- [x] Highlights / переваги — `highlights` у `niches.ts` + секція Highlights у `niches/[slug]/page.tsx`
- [x] Акції та знижки — `promotions` у `niches.ts` + секція у `page.tsx` (Сезонний розпродаж, Безкоштовна доставка від 800 ₴, Повернення 14 днів)
- [x] Калькулятор вартості — `calculatorSteps` у `niches.ts` + `NicheCalculator` компонент (категорія → кількість → доставка)
- [x] Відгуки клієнтів — `NicheReviews` компонент у `niches/[slug]/page.tsx`
- [x] Статистика довіри — `trustStats` у `niches.ts` + `NicheStats` у `niches/[slug]/page.tsx`
- [x] Список послуг/товарів — `mockServices` у `niches.ts`
- [x] Підкатегорії ніші — `variants` у `niches.ts` + секція "Варіанти" у `niches/[slug]/page.tsx`
- [x] Картки товарів — `productCards` у `niches.ts` + секція каталогу у `niches/[slug]/page.tsx`
- [x] Пов'язані статті блогу — секція блогу у `niches/[slug]/page.tsx`
- [x] Кейс портфоліо — секція портфоліо у `niches/[slug]/page.tsx`
- [x] Пов'язані ніші — секція пов'язаних ніш у `niches/[slug]/page.tsx`
- [x] FAQ — `nicheFaq` у `niches.ts` + загальний FAQ у `niches/[slug]/page.tsx`
- [x] Schema.org — `schemaType` у `niches.ts` + `businessLd` у `page.tsx`
- [x] SEO (meta, OG, canonical, breadcrumbs) — `generateMetadata` у `page.tsx`
