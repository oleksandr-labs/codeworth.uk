# Нішева сторінка: Кав'ярня / Бар / Вінотека / Паб
Опис: Демо-сайт для кав'ярні, кофейні, бару, пабу або вінотеки з меню, атмосферою та івентами.
**URL:** `/marketplace/demo/coffee-bar`
**Ніша:** Кав'ярні, кофейні, бари, паби, вінотеки, чайні, коктейль-бари
**Статус:** ✅ Готово (MVP — shared template `niches/[slug]/page.tsx`)
**i18n статус:** ✅ Повністю перекладено (EN + UK)

---

> ⚠️ **Незакреслені пункти ([ ]) — Phase 2:** потребують реального медіа (фото/відео), backend-інтеграцій або зовнішніх API. Demo MVP реалізовано через shared template `niches/[slug]/page.tsx`.

## Обов'язкові елементи

### Hero-секція
- [ ] Атмосферне фото закладу або напою
- [x] Назва + слоган (в дусі місця)
- [x] CTA: "Переглянути меню" + "Забронювати місце"

### Меню
- [x] Список позицій меню — `mockServices` у `niches.ts` + секція послуг у `niches/[slug]/page.tsx`
- [x] Категорії: кава, чай, напої, снеки, десерти / пиво, коктейлі, вино, закуски (повний e-commerce каталог) — категорії реалізовано через `productCards`
- [x] Кожна позиція: фото, назва, опис, ціна — реалізовано через `menuItems` у `niches.ts` + секція «Меню закладу» у `niches/[slug]/page.tsx`
- [x] Сезонне / спеціальне меню — реалізовано через `promotions` + `highlights` ("Меню напоїв та їжі: Сезонне меню") у `niches.ts`
- [x] Фільтр: безалкогольне, веганське, безглютенове — `MenuFilter.tsx` client component (категорія + diet tag фільтр)

### Атмосфера / Про заклад
- [x] Розповідь про концепцію закладу (2-3 параграфи) — реалізовано через `highlights` + `description` у `niches.ts`
- [ ] Галерея інтер'єру та деталей
- [ ] Відео-тур по закладу (опціонально)
- [x] Наша команда (бариста / bartender) — `team` у `niches.ts` + секція "Команда" у `niches/[slug]/page.tsx`

### Бронювання / Резервація
- [x] Вибір послуги/формату — реалізовано через shared компоненти у `niches/[slug]/page.tsx`
- [x] Форма: дата, час, ім'я, телефон — реалізовано через shared компоненти у `niches/[slug]/page.tsx`
- [x] Кількість гостей — реалізовано через `BookingSection` (крок послуги та нотатки) у `niches/[slug]/page.tsx`
- [ ] Онлайн або через Telegram-бот
- [ ] Підтвердження бронювання

### Івенти та заходи
- [x] Календар подій (джаз-вечір, дегустація вина, кіно-вечори) — реалізовано через `scheduleItems`
- [x] Опис кожного заходу + ціна вхідного (якщо є) — реалізовано через `scheduleItems`
- [x] Корпоративи та приватні заходи (форма запиту) — реалізовано через `BookingSection` у `niches/[slug]/page.tsx`

### Лояльність та Програма
- [x] Картка постійного клієнта (кожна 6-а кава безкоштовно) — реалізовано через `pricingPlans` ("Абонемент") та `promotions` у `niches.ts`
- [ ] QR-карта або додаток (опціонально)

### Takeaway / Доставка
- [ ] Онлайн-замовлення з собою (click & collect)
- [x] Продаж кав'яних зернень на вагу (для кав'ярень) — реалізовано через `nicheFaq` у `niches.ts`

### Відгуки
- [x] Відгуки клієнтів — `NicheReviews` компонент у `niches/[slug]/page.tsx`
- [ ] Google Maps або власні відгуки (Google інтеграція — не реалізовано)
- [ ] Instagram Stories/Reels вбудовані

### Контакти
- [x] Адреса + телефон — реалізовано через `address`, `phone` у `niches.ts`
- [x] Години роботи (вкажи заздалегідь happy hours) — реалізовано через `openingHours` у `niches.ts`
- [ ] Карта (Google Maps — не реалізовано)
- [ ] Телефон, Instagram, TikTok

---

## Варіанти ніші (підкатегорії)
- [x] **Спеціалізована кав'ярня** — specialty coffee, pour-over, latte art — `variants` у `niches.ts`
- [x] **Вінотека** — підбірки вин, дегустаційні сети, сомельє — `variants` у `niches.ts`
- [x] **Коктейль-бар** — авторські коктейлі, барні квести — `variants` у `niches.ts`
- [x] **Паб / Крафтове пиво** — craft beer, live music вечори — `variants` у `niches.ts`
- [x] **Чайна / Tea House** — азійська чайна церемонія, матча атмосфера — `variants` у `niches.ts`

---

## SEO
- [x] Title: "Кав'ярня [Назва] — меню, атмосфера, бронювання" — `titleSeo` у `niches.ts`, `generateMetadata` у `page.tsx`
- [x] Meta Description — `metaDescription` у `niches.ts`
- [x] Schema.org: FoodEstablishment / BarOrPub — `schemaType` у `niches.ts`, `businessLd` у `page.tsx`
- [x] Ключові слова SEO — `tags` у `niches.ts` + `generateMetadata` у `page.tsx`
- [x] OpenGraph tags — реалізовано через `generateMetadata` у `page.tsx`
- [x] Canonical URL — реалізовано через `generateMetadata` у `page.tsx`
- [x] Internal links — реалізовано через секції пов'язаних ніш, блогу та портфоліо у `niches/[slug]/page.tsx`
- [x] Breadcrumb навігація — реалізовано у `niches/[slug]/page.tsx`

## Реалізовано (shared template)
- [x] Акції та знижки — `promotions` у `niches.ts` + секція "Акції" у `niches/[slug]/page.tsx`
- [x] Команда (бариста/bartender) — `team` у `niches.ts` + секція "Команда" у `niches/[slug]/page.tsx`
- [x] Онлайн-бронювання (BookingSection) — `bookingForm: true` у `niches.ts`; step 1: послуга, step 2: дата/час, step 3: контакти, step 4: підтвердження
