# Автосервіс та автосалон — codenest.com.ua / Demo
Опис: Demo-сторінка для ніші "автосервіс / автосалон". SSG, SEO-оптимізована.
**Статус:** ✅ Готово (MVP — shared template `niches/[slug]/page.tsx`)
**i18n статус:** ✅ Повністю перекладено (EN + UK)

---

> ⚠️ **Незакреслені пункти ([ ]) — Phase 2:** потребують реального медіа (фото/відео), backend-інтеграцій або зовнішніх API. Demo MVP реалізовано через shared template `niches/[slug]/page.tsx`.

## Hero
- [x] H1: "Ваш автомобіль у надійних руках"
- [ ] Фонове відео або якісне фото автосервісу
- [x] CTA: "Записатися на СТО" + "Дзвонити"
- [x] Лічильники: років роботи, обслужених авто, майстрів — `trustStats` у `niches.ts`

## Послуги СТО
- [x] Сітка карток послуг: ТО, ремонт двигуна, ходова, кузовні роботи, шиномонтаж — `mockServices` у `niches.ts`
- [x] Кожна послуга з приблизною ціною та часом виконання — `mockServices` у `niches.ts`
- [x] "Що входить у ТО" — реалізовано через `nicheFaq` у `niches.ts`

## Онлайн запис на СТО
- [x] Вибір послуги — step 1 у `BookingSection` компоненті
- [x] Вибір дати та часу (календар) — step 2, демо-календар у `BookingSection`
- [x] Марка та модель авто — реалізовано через поле нотаток у step 3 (`BookingSection`) у `niches/[slug]/page.tsx`
- [x] Контактні дані — step 3 у `BookingSection`
- [ ] Підтвердження через SMS або Telegram — потребує backend/Telegram API

## Запчастини та каталог
- [ ] Каталог запчастин з пошуком за маркою/моделлю
- [ ] Фільтри: тип деталі, виробник, ціна
- [ ] Можливість замовити з доставкою або самовивозом

## Автосалон (якщо є продаж авто)
- [x] Каталог авто: нові та б/у — реалізовано через `carCards` у `niches.ts` + секція «Каталог автомобілів» у `niches/[slug]/page.tsx`
- [ ] Фільтри: марка, рік, ціна, пробіг, тип кузова
- [x] Сторінка авто: фотогалерея, характеристики, ціна, кредит/лізинг — реалізовано через `engine`, `fuelType`, `mileage`, `bodyType`, `tags` у `carCards`
- [x] Форма тест-драйву — реалізовано через `BookingSection` у `niches/[slug]/page.tsx`

## Клієнтам
- [x] Калькулятор вартості ремонту (вибір робіт → орієнтовна ціна) — `calculatorSteps` у `niches.ts` + `NicheCalculator` компонент
- [x] Акції та promotions — `promotions` у `niches.ts` + секція у `page.tsx`
- [x] Відгуки клієнтів — `NicheReviews` компонент у `niches/[slug]/page.tsx`
- [ ] Відгуки клієнтів (Google Maps інтеграція) — потребує зовнішнього сервісу
- [ ] Можливість залишити відгук

## Компанія
- [ ] Фото цеху та обладнання
- [x] Команда майстрів: ім'я, спеціалізація, сертифікати — `team` у `niches.ts` + секція у `page.tsx`
- [x] Сертифікати та ліцензії — реалізовано через `nicheFaq` у `niches.ts`
- [ ] Відео про роботу СТО

## Варіанти ніші (підкатегорії)
- [x] **Автомийка / Детейлінг** — онлайн-бронювання мийки, програми чистки, абонементи — `niches.ts` variants + Варіанти секція у `niches/[slug]/page.tsx`
- [x] **Шиномонтаж** — сезонне збереження шин, запис онлайн, сертифікати дисків — variants у `niches.ts`
- [x] **Автопрокат / Оренда авто** — каталог авто, ціни на добу, онлайн-бронювання, документи — variants
- [x] **Автоелектрика / Чіп-тюнінг** — спеціалізований СТО з акцентом на електроніку — variants
- [x] **Автошкола** — розклад курсів, онлайн-реєстрація, ціни категорій (A, B, C), інструктори — variants

---

## SEO
- [x] Title: "[Назва] — Автосервіс у [Місто] | Запис онлайн" — `titleSeo` у `niches.ts`, `generateMetadata` у `page.tsx`
- [x] Meta Description — `metaDescription` у `niches.ts`
- [x] Schema.org: AutoRepair + LocalBusiness — `schemaType: "AutoRepair"` у `niches.ts`, `businessLd` у `page.tsx`
- [x] Ключові слова SEO — `tags` у `niches.ts` + `generateMetadata` у `page.tsx`
- [x] OpenGraph tags — реалізовано через `generateMetadata` у `page.tsx`
- [x] Canonical URL — реалізовано через `generateMetadata` у `page.tsx`
- [x] Internal links — реалізовано через секції пов'язаних ніш, блогу та портфоліо у `niches/[slug]/page.tsx`
- [x] Breadcrumb навігація — реалізовано у `niches/[slug]/page.tsx`
- [ ] LocalBusiness з геолокацією (Google Maps — не реалізовано)

## Реалізовано (shared template)
- [x] Пов'язані статті блогу — секція блогу у `niches/[slug]/page.tsx`
