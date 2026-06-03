# Нішева сторінка: Квест-кімнати / Ігровий центр / Розваги
Опис: Демо-сайт для квест-кімнат, ігрового розважального центру або ескейп-румів.
**URL:** `/marketplace/demo/entertainment`
**Ніша:** Квест-кімнати, ескейп-руми, ігрові центри, батутний парк, боулінг, більярд
**Статус:** ✅ Готово (MVP — shared template `niches/[slug]/page.tsx`)
**i18n статус:** ✅ Повністю перекладено (EN + UK)

---

> ⚠️ **Незакреслені пункти ([ ]) — Phase 2:** потребують реального медіа (фото/відео), backend-інтеграцій або зовнішніх API. Demo MVP реалізовано через shared template `niches/[slug]/page.tsx`.

## Обов'язкові елементи

### Hero-секція
- [ ] Яскрава обкладинка (таємниця, пригоди, команда)
- [x] Слоган + кількість квестів та гравців — `trustStats` у `niches.ts`
- [x] CTA: "Забронювати квест" + "Каталог квестів"
- [x] Лічильник: зіграно ігор, щасливих команд — `trustStats` у `niches.ts`

### Каталог квестів / Атракцій
- [x] Список послуг/квестів — `mockServices` у `niches.ts` + секція послуг у `niches/[slug]/page.tsx`
- [x] Картки кімнат: назва, жанр, складність, вік, к-сть гравців — shared template `productCards` у `niches.ts` + секція у `niches/[slug]/page.tsx`
- [x] Фільтр: жанр (категорія) — `ProductCatalog.tsx` client component (фільтр за категорією реалізовано)
- [ ] Детальна сторінка кожного квесту: опис, фото, відео-тизер, правила, ціна

### Онлайн-бронювання
- [x] Вибір квесту/послуги — реалізовано через shared компоненти у `niches/[slug]/page.tsx`
- [x] Вибір дати та часу — реалізовано через shared компоненти у `niches/[slug]/page.tsx`
- [x] Форма контактів — реалізовано через shared компоненти у `niches/[slug]/page.tsx`
- [x] Кількість гравців — реалізовано через `mockServices` (кількість у назві) + `nicheFaq` у `niches.ts`
- [x] Промокод / знижка — реалізовано через `promotions` у `niches.ts`
- [ ] Онлайн-оплата або оплата на місці
- [ ] Автоматичне підтвердження + нагадування за 1 год

### Ціни та акції
- [x] Акції та знижки — `promotions` у `niches.ts` + секція "Акції" у `niches/[slug]/page.tsx`
- [x] Калькулятор вартості (NicheCalculator) — `calculatorSteps` у `niches.ts` + компонент у `niches/[slug]/page.tsx`
- [x] Тарифні плани — `pricingPlans` у `niches.ts` + секція "Тарифи" у `niches/[slug]/page.tsx`
- [x] Прозорий прайс (погодинно або за гру) — реалізовано через `pricingPlans` у `niches.ts`
- [x] Знижки: в будні, іменинникам, груповим (6+) — реалізовано через `promotions` у `niches.ts`
- [x] Сертифікати — подарунковий сертифікат (сума або конкретний квест) — реалізовано через `pricingPlans` (Сертифікат переможця) у `niches.ts`

### Корпоративи та дні народження
- [x] Пакет "Корпоратив" — кілька кімнат + зона відпочинку — реалізовано через `mockServices` ("Корпоративний квест") у `niches.ts`
- [x] Пакет "День народження" — декор + торт + квест — реалізовано через `mockServices` ("День народження в квесті") + `nicheFaq` у `niches.ts`
- [x] Форма індивідуального запиту — реалізовано через `BookingSection` у `niches/[slug]/page.tsx`

### Галерея / Фото команд
- [ ] Фото переможців після гри
- [ ] Відео-тизери квестів

### Відгуки
- [x] Відгуки клієнтів — `NicheReviews` компонент у `niches/[slug]/page.tsx`
- [ ] Google Reviews / власні відгуки з фото команди (зовнішній виджет — не реалізовано)
- [ ] Рейтинг кожної кімнати

### FAQ
- [x] FAQ секція — `nicheFaq` у `niches.ts` + загальний FAQ у `niches/[slug]/page.tsx`
- [x] "З якого віку можна?" — реалізовано через `nicheFaq` у `niches.ts`
- [x] "Що взяти із собою?" — реалізовано через `nicheFaq` у `niches.ts`
- [x] "Якщо не вийшли — є підказки?" — реалізовано через `nicheFaq` у `niches.ts`
- [x] "Скільки людей максимум?" — реалізовано через `nicheFaq` у `niches.ts`

### Контакти та адреса
- [x] Адреса + телефон — реалізовано через `address`, `phone` у `niches.ts`
- [x] Години роботи — реалізовано через `openingHours` у `niches.ts`
- [ ] Карта (Google Maps — не реалізовано)
- [x] Паркування та як добратись — реалізовано через `nicheFaq` у `niches.ts`

---

## Варіанти ніші (підкатегорії)
- [x] **Батутний парк** — ціни за час, секції для різного віку, дні народження — `variants` у `niches.ts`
- [x] **VR-арена** — шоля VR-гри, мультиплеєр, прокат шоломів — `variants` у `niches.ts`
- [x] **Більярд / Боулінг клуб** — погодинна оренда, ліга, корпоративи — `variants` у `niches.ts`
- [x] **Аніматорська агентство** — виступи на днях народженнях, масані персонажів — `variants` у `niches.ts`
- [x] **Картинг** — траси, результати, корпоративні заїзди — `variants` у `niches.ts`

---

## SEO
- [x] Title: "Квест-кімнати [Місто] — бронювання онлайн | [Назва]" — `titleSeo` у `niches.ts`, `generateMetadata` у `page.tsx`
- [x] Meta Description — `metaDescription` у `niches.ts`
- [x] Schema.org: EntertainmentBusiness + Event — `schemaType` у `niches.ts`, `businessLd` у `page.tsx`
- [x] Ключові слова SEO — `tags` у `niches.ts` + `generateMetadata` у `page.tsx`
- [x] OpenGraph tags — реалізовано через `generateMetadata` у `page.tsx`
- [x] Canonical URL — реалізовано через `generateMetadata` у `page.tsx`
- [x] Internal links — реалізовано через секції пов'язаних ніш, блогу та портфоліо у `niches/[slug]/page.tsx`
- [x] Breadcrumb навігація — реалізовано у `niches/[slug]/page.tsx`

## Реалізовано (shared template)
- [x] Акції та знижки — `promotions` у `niches.ts` + секція "Акції" у `niches/[slug]/page.tsx`
- [x] Онлайн-бронювання (BookingSection) — `bookingForm: true` у `niches.ts`; step 1: послуга, step 2: дата/час, step 3: контакти, step 4: підтвердження
- [x] Калькулятор вартості (NicheCalculator) — `calculatorSteps` у `niches.ts` + компонент у `niches/[slug]/page.tsx`
