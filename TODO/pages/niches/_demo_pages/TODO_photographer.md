# Фотограф / Відеограф — codenest.com.ua / Demo
Опис: Demo-сторінка для ніші "фотограф / відеограф / креативна студія". SSG, візуально-орієнтована.
**Складність:** 🟢 Проста (портфоліо + бронювання)
**Статус:** ✅ Готово (MVP — shared template `niches/[slug]/page.tsx`)
**i18n статус:** ✅ Повністю перекладено (EN + UK)

---

> ⚠️ **Незакреслені пункти ([ ]) — Phase 2:** потребують реального медіа (фото/відео), backend-інтеграцій або зовнішніх API. Demo MVP реалізовано через shared template `niches/[slug]/page.tsx`.

## Hero
- [x] Fullscreen hero — shared template Hero секція у `niches/[slug]/page.tsx` (градієнт замість реального фото/відео)
- [x] Мінімалістичний дизайн — фото говорить само за себе — shared template Hero
- [x] Ім'я / Студія + спеціалізація — реалізовано через `highlights` у `niches.ts` — shared template
- [x] CTA: "Переглянути портфоліо" + "Забронювати дату" — shared template Hero

## Портфоліо (ключовий розділ)
- [x] Кейс портфоліо — реалізовано через секцію портфоліо у `niches/[slug]/page.tsx` — shared template
- [x] Картки фотосесій — реалізовано через `projectCards` у `niches.ts` + секція проєктів у `niches/[slug]/page.tsx` — shared template
- [ ] Masonry-сітка фото (Pinterest-style) — потребує реальних фото
- [ ] Фільтр за категоріями: весілля, портрет, комерційна, подій, природа, product — потребує реальних фільтрів
- [ ] Lightbox для повного перегляду — потребує реальних фото
- [ ] Lazy loading із blur placeholder — потребує реальних фото
- [ ] Відео-портфоліо: showreel (Vimeo / YouTube embed) — потребує реальних відео

## Послуги
- [x] Список послуг — `mockServices` у `niches.ts` + секція послуг у `niches/[slug]/page.tsx` — shared template
- [x] Весільна фотозйомка (від X грн) — реалізовано через `mockServices` у `niches.ts` — shared template
- [x] Портретна / Сімейна — реалізовано через `mockServices` у `niches.ts` — shared template
- [x] Комерційна / Product фотозйомка — реалізовано через `mockServices` у `niches.ts` — shared template
- [x] Зйомка заходів (корпоративи, конференції) — реалізовано через `mockServices` у `niches.ts` — shared template
- [x] Відеозйомка + монтаж — реалізовано через `mockServices` у `niches.ts` — shared template
- [x] Аеро фото/відео (дрон) — реалізовано через `mockServices` у `niches.ts` — shared template
- [x] Кожна послуга з прикладами робіт та ціною — реалізовано через `mockServices` (name, price, duration) у `niches.ts` — shared template

## Бронювання
- [x] Вибір послуги — реалізовано через `BookingSection` у `niches/[slug]/page.tsx` — shared template
- [x] Дата та час — реалізовано через `BookingSection` у `niches/[slug]/page.tsx` — shared template
- [ ] Календар зайнятості (Google Calendar інтеграція) — потребує реальної інтеграції
- [x] Побажання (стиль, локація, кількість людей) — реалізовано через `BookingSection` у `niches/[slug]/page.tsx` — shared template
- [ ] Автоматичне підтвердження + agreement підпис — потребує реальної Email інтеграції

## Про мене / студію
- [x] Фото автора, біографія, підхід до роботи — `team` у `niches.ts` + секція "Команда" у `niches/[slug]/page.tsx` — shared template
- [x] Обладнання: камери, об'єктиви (для SEO) — реалізовано через `team` у `niches.ts` — shared template
- [x] Публікації та нагороди — реалізовано через `variants` у `niches.ts` — shared template
- [ ] Колаборації з брендами

## Клієнтський кабінет
- [ ] Приватна галерея для клієнтів (захищений паролем)
- [ ] Вибір фото для ретуші (кнопки лайк/дизлайк)
- [ ] Завантаження фіналів у повній якості

## Блог
- [x] Пов'язані статті блогу — реалізовано через секцію блогу у `niches/[slug]/page.tsx` — shared template
- [x] Статті: "Як підготуватися до фотосесії", "Топ-5 локацій для весільного фото" — реалізовано через секцію блогу у `niches/[slug]/page.tsx` — shared template
- [x] SEO-контент для залучення клієнтів — реалізовано через секцію блогу у `niches/[slug]/page.tsx` — shared template

## SEO
- [x] Title: "[Ім'я] — Фотограф у [Місто] | Весільна, портретна фотозйомка" — `titleSeo` у `niches.ts`, `generateMetadata` у `page.tsx` — shared template
- [x] Meta Description — `metaDescription` у `niches.ts` — shared template
- [x] Schema.org: Photographer + ImageGallery — `schemaType` у `niches.ts`, `businessLd` у `page.tsx` — shared template
- [x] Ключові слова SEO — `tags` у `niches.ts` + `generateMetadata` у `page.tsx` — shared template
- [x] OpenGraph tags — реалізовано через `generateMetadata` у `page.tsx` — shared template
- [x] Canonical URL — реалізовано через `generateMetadata` у `page.tsx` — shared template
- [x] Internal links — реалізовано через секції пов'язаних ніш, блогу та портфоліо у `niches/[slug]/page.tsx` — shared template
- [x] Breadcrumb навігація — реалізовано у `niches/[slug]/page.tsx` — shared template
- [ ] Image ALT tags з ключовими словами — потребує реальних фото
- [ ] OG-image: найкраща робота — потребує реальних фото

## Реалізовано (shared template)
- [x] Hero секція — shared template Hero у `niches/[slug]/page.tsx`
- [x] Highlights / переваги — `highlights` у `niches.ts` + секція Highlights у `niches/[slug]/page.tsx`
- [x] Акції та знижки — `promotions` у `niches.ts` + секція "Акції" у `niches/[slug]/page.tsx`
- [x] Команда фотографів/спеціалістів — `team` у `niches.ts` + секція "Команда" у `niches/[slug]/page.tsx`
- [x] Онлайн-запис (BookingSection) — `bookingForm: true` у `niches.ts`; step 1: послуга, step 2: дата/час, step 3: контакти, step 4: підтвердження
- [x] Калькулятор вартості (NicheCalculator) — `calculatorSteps` у `niches.ts` + компонент у `niches/[slug]/page.tsx`
- [x] Відгуки клієнтів — `NicheReviews` компонент у `niches/[slug]/page.tsx`
- [x] Статистика довіри — `trustStats` у `niches.ts` + `NicheStats` у `niches/[slug]/page.tsx`
- [x] Список послуг — `mockServices` у `niches.ts`
- [x] Підкатегорії ніші — `variants` у `niches.ts` + секція "Варіанти" у `niches/[slug]/page.tsx`
- [x] Картки фотосесій — `projectCards` у `niches.ts` + секція проєктів у `niches/[slug]/page.tsx`
- [x] Процес роботи — `processSteps` у `niches.ts` + секція "Як ми працюємо" у `niches/[slug]/page.tsx`
- [x] Пов'язані статті блогу — секція блогу у `niches/[slug]/page.tsx`
- [x] Кейс портфоліо — секція портфоліо у `niches/[slug]/page.tsx`
- [x] Пов'язані ніші — секція пов'язаних ніш у `niches/[slug]/page.tsx`
- [x] FAQ — `nicheFaq` у `niches.ts` + загальний FAQ у `niches/[slug]/page.tsx`
- [x] Schema.org — `schemaType` у `niches.ts` + `businessLd` у `page.tsx`
- [x] SEO (meta, OG, canonical, breadcrumbs) — `generateMetadata` у `page.tsx`
