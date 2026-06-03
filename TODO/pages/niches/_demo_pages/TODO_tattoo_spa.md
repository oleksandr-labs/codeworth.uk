# Нішева сторінка: SPA-центр / Тату-студія / Нігтьовий сервіс
Опис: Демо-сайт для SPA-центру, студії татуювання, студії манікюру/педикюру або косметологічного кабінету.
**URL:** `/marketplace/demo/tattoo-spa`
**Ніша:** SPA-центри, тату-студії, манікюрні студії, косметологія, масажні кабінети
**Статус:** ✅ Готово (MVP — shared template `niches/[slug]/page.tsx`)
**i18n статус:** ✅ Повністю перекладено (EN + UK)

---

> ⚠️ **Незакреслені пункти ([ ]) — Phase 2:** потребують реального медіа (фото/відео), backend-інтеграцій або зовнішніх API. Demo MVP реалізовано через shared template `niches/[slug]/page.tsx`.

## Обов'язкові елементи

### Hero-секція
- [ ] Естетичне фото (тату-робота / манікюр / spa-зона)
- [x] Назва + слоган закладу
- [x] CTA: "Записатися" + "Переглянути роботи"

### Послуги
- [x] Список послуг з описом і цінами — `mockServices` у `niches.ts` + секція послуг у `niches/[slug]/page.tsx`
- [x] Тривалість кожної послуги — реалізовано через `mockServices` (поле duration) у `niches.ts`
- [x] Картки послуг/продуктів (тату, SPA-процедури, манікюр) — shared template `productCards` у `niches.ts` + секція у `niches/[slug]/page.tsx`
- [ ] Фото до/після або готових робіт

### Портфоліо / Галерея робіт
- [x] Кейс портфоліо — реалізовано через секцію портфоліо у `niches/[slug]/page.tsx`
- [ ] Фільтр за стилем або послугою
- [ ] Фото або короткі відео (Reels-стиль)
- [ ] Instagram-інтеграція або власна галерея

### Майстри / Спеціалісти
- [x] Картки: фото, ім'я, спеціалізація, досвід — `team` у `niches.ts` + секція "Команда" у `niches/[slug]/page.tsx`
- [ ] Персональний instagram-профіль майстра (посилання)
- [ ] Онлайн-запис до конкретного майстра

### Онлайн-запис
- [x] Вибір послуги — реалізовано через shared компоненти у `niches/[slug]/page.tsx`
- [x] Дата та час — реалізовано через shared компоненти у `niches/[slug]/page.tsx`
- [x] Форма: Ім'я, Телефон — реалізовано через shared компоненти у `niches/[slug]/page.tsx`
- [ ] Вибір майстра (або "будь-хто вільний")
- [ ] Коментар (для тату — ескіз або ідея)
- [ ] Підтвердження через SMS/Telegram

### Ціни
- [x] Тарифні плани — `pricingPlans` у `niches.ts` + секція "Тарифи" у `niches/[slug]/page.tsx`
- [x] "Від ... грн" або фіксована ціна (детальний прайс-лист) — реалізовано через `pricingPlans` + `mockServices` у `niches.ts`
- [x] Примітка про індивідуальний кошторис для складних проєктів (тату) — реалізовано через `nicheFaq` у `niches.ts`

### Відгуки
- [x] Відгуки клієнтів — `NicheReviews` компонент у `niches/[slug]/page.tsx`
- [ ] Google або власні відгуки, бажано з фото результату (зовнішній виджет — не реалізовано)
- [x] Рейтинг майстра / закладу — реалізовано через `NicheReviews` + `trustStats` у `niches.ts` + `niches/[slug]/page.tsx`

### Акції та програма лояльності
- [x] Акції та знижки — `promotions` у `niches.ts` + секція "Акції" у `niches/[slug]/page.tsx`
- [x] Флешдей (тату за фіксованою ціною) — реалізовано через `promotions` у `niches.ts`
- [x] Реферальна програма (приведи друга) — реалізовано через `promotions` та `nicheFaq` у `niches.ts`

### Контакти
- [x] Адреса + телефон — реалізовано через `address`, `phone` у `niches.ts`
- [x] Години роботи — `openingHours` у `niches.ts`
- [ ] Карта (Google Maps — не реалізовано)
- [ ] Instagram / TikTok (обов'язково для цієї ніші)
- [ ] Telegram / Viber для швидкого запису

---

## Варіанти ніші (підкатегорії)
- [x] **SPA-центр** — масаж, обгортання, флоат-камера, турецька баня — `variants` у `niches.ts`
- [x] **Тату-студія** — реалізм, мінімалізм, акварель, пірсинг — `variants` у `niches.ts`
- [x] **Студія манікюру/педикюру** — гелевий, апаратний, нарощування — `variants` у `niches.ts`
- [x] **Косметологічний кабінет** — чищення шкіри, мезотерапія, ботокс — `variants` у `niches.ts`
- [x] **Студія депіляції / шугарингу** — ціни за зону, абонементи — `variants` у `niches.ts`

---

## SEO
- [x] Title: "SPA та тату-студія [Назва] — запис онлайн" — `titleSeo` у `niches.ts`, `generateMetadata` у `page.tsx`
- [x] Meta Description — `metaDescription` у `niches.ts`
- [x] Schema.org: HealthAndBeautyBusiness + LocalBusiness — `schemaType` у `niches.ts`, `businessLd` у `page.tsx`
- [x] Ключові слова SEO — `tags` у `niches.ts` + `generateMetadata` у `page.tsx`
- [x] OpenGraph tags — реалізовано через `generateMetadata` у `page.tsx`
- [x] Canonical URL — реалізовано через `generateMetadata` у `page.tsx`
- [x] Internal links — реалізовано через секції пов'язаних ніш, блогу та портфоліо у `niches/[slug]/page.tsx`
- [x] Breadcrumb навігація — реалізовано у `niches/[slug]/page.tsx`

## Реалізовано (shared template)
- [x] Акції та знижки — `promotions` у `niches.ts` + секція "Акції" у `niches/[slug]/page.tsx`
- [x] Команда майстрів/спеціалістів — `team` у `niches.ts` + секція "Команда" у `niches/[slug]/page.tsx`
- [x] Онлайн-запис (BookingSection) — `bookingForm: true` у `niches.ts`; step 1: послуга, step 2: дата/час, step 3: контакти, step 4: підтвердження
