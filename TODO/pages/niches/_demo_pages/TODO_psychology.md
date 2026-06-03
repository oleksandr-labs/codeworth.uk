# Нішева сторінка: Психолог / Коуч / Терапевт
Опис: Демо-сайт для психолога, коуча, психотерапевта або консультанта особистого розвитку.
**URL:** `/marketplace/demo/psychology`
**Ніша:** Психологи, коучі, психотерапевти, тренери особистісного зростання
**Статус:** ✅ Готово (MVP — shared template `niches/[slug]/page.tsx`)
**i18n статус:** ✅ Повністю перекладено (EN + UK)

---

> ⚠️ **Незакреслені пункти ([ ]) — Phase 2:** потребують реального медіа (фото/відео), backend-інтеграцій або зовнішніх API. Demo MVP реалізовано через shared template `niches/[slug]/page.tsx`.

## Обов'язкові елементи

### Hero-секція
- [ ] Тепле фото спеціаліста в офісі або на природі
- [x] Слоган (підтресне, людяне формулювання) — реалізовано через `highlights` у `niches.ts`
- [x] CTA: "Записатися на консультацію" + "Дізнатися більше"

### Про спеціаліста
- [x] Фото + ім'я + посада — `team` у `niches.ts` + секція "Команда" у `niches/[slug]/page.tsx`
- [x] Освіта, сертифікати, методи роботи — реалізовано через `nicheFaq` у `niches.ts`
- [x] Стаж та кількість клієнтів — реалізовано через `trustStats` у `niches.ts`
- [x] Особиста місія / філософія — `highlights` у `niches.ts`
- [ ] Відеовізитка (опціонально)

### Послуги / Формати роботи
- [x] Список послуг/форматів — `mockServices` у `niches.ts` + секція послуг у `niches/[slug]/page.tsx`
- [x] Індивідуальна терапія (очно / онлайн) — реалізовано через `mockServices` у `niches.ts`
- [x] Парна / сімейна терапія — реалізовано через `mockServices` у `niches.ts`
- [x] Групові сесії / вебінари — реалізовано через `mockServices` ("Групова терапія") у `niches.ts`
- [x] Коучинг (кар'єрний, особистісний, executive) — реалізовано через `mockServices` + `variants` у `niches.ts`
- [x] Тривалість та вартість кожного формату — реалізовано через `mockServices` (duration + price) + `pricingPlans` у `niches.ts`

### Онлайн-запис
- [x] Вибір формату / послуги — реалізовано через shared компоненти у `niches/[slug]/page.tsx`
- [x] Вибір дати та часу — реалізовано через shared компоненти у `niches/[slug]/page.tsx`
- [x] Форма: Ім'я, Телефон/Email — реалізовано через shared компоненти у `niches/[slug]/page.tsx`
- [ ] Автоматичне підтвердження та нагадування
- [ ] Google Calendar або Calendly інтеграція

### Напрями роботи (теги-блок)
- [x] Напрями роботи — реалізовано через `highlights` або `mockServices` у `niches.ts`
- [x] Тривога та стрес — реалізовано через `tags` та `mockServices` у `niches.ts`
- [x] Депресія — реалізовано через `tags` та `mockServices` у `niches.ts`
- [x] Стосунки та сім'я — реалізовано через `mockServices` ("Парна / сімейна терапія") + `variants` у `niches.ts`
- [x] Самооцінка та впевненість — реалізовано через `tags` та `highlights` у `niches.ts`
- [x] Кризові стани — реалізовано через `mockServices` та `nicheFaq` у `niches.ts`
- [x] Профорієнтація та кар'єра — реалізовано через `variants` ("Коуч / Бізнес-коуч") у `niches.ts`
- [x] Травма та ПТСР — реалізовано через `tags` та `mockServices` у `niches.ts`

### Відгуки клієнтів
- [x] Відгуки клієнтів — `NicheReviews` компонент у `niches/[slug]/page.tsx`
- [ ] Анонімні або з ім'ям (за дозволом) (реальний контент)
- [ ] Коротка цитата + результат роботи (реальний контент)

### Програми терапії (courseCards)
- [x] Картки терапевтичних програм/курсів — shared template `courseCards` у `niches.ts` + секція у `niches/[slug]/page.tsx`

### FAQ
- [x] FAQ секція — `nicheFaq` у `niches.ts` + загальний FAQ у `niches/[slug]/page.tsx`
- [x] "Перша консультація безкоштовна?" — реалізовано через `nicheFaq` у `niches.ts`
- [x] "Як проходить онлайн-сесія?" — реалізовано через `nicheFaq` у `niches.ts`
- [x] "Чи є конфіденційність?" — реалізовано через `nicheFaq` у `niches.ts`
- [x] "Як часто потрібно зустрічатися?" — реалізовано через `nicheFaq` у `niches.ts`

### Блог / Матеріали
- [x] Пов'язані статті блогу — реалізовано через секцію блогу у `niches/[slug]/page.tsx`
- [x] Корисні статті про психічне здоров'я — реалізовано через секцію блогу у `niches/[slug]/page.tsx`
- [ ] Безкоштовні медитації або вправи (PDF — потребує зовнішнього сховища)
- [ ] Посилання на YouTube-канал або подкаст

### Контакти
- [x] Адреса кабінету + телефон — реалізовано через `address`, `phone` у `niches.ts`
- [x] Години роботи — `openingHours` у `niches.ts`
- [ ] Telegram / WhatsApp (пряме звернення)
- [ ] Email
- [ ] Карта (Google Maps — не реалізовано)

---

## Варіанти ніші (підкатегорії)
- [x] **Лайф-коуч** — фокус на цілях, продуктивності, балансі — `variants` у `niches.ts`
- [x] **Бізнес-коуч / Executive Coaching** — для підприємців і топ-менеджерів — `variants` у `niches.ts`
- [x] **Сімейний психолог** — пари, батьки та діти — `variants` у `niches.ts`
- [x] **Дитячий психолог** — робота з дітьми та підлітками — `variants` у `niches.ts`
- [x] **Нутриціолог / Психолог тіла** — харчова поведінка, стосунки з тілом — `variants` у `niches.ts`

---

## SEO
- [x] Title: "Психолог онлайн — консультації | [Ім'я спеціаліста]" — `titleSeo` у `niches.ts`, `generateMetadata` у `page.tsx`
- [x] Meta Description — `metaDescription` у `niches.ts`
- [x] Schema.org: Person + LocalBusiness — `schemaType` у `niches.ts`, `businessLd` у `page.tsx`
- [x] Ключові слова SEO — `tags` у `niches.ts` + `generateMetadata` у `page.tsx`
- [x] FAQ Schema — `nicheFaq` + FAQPage schema у `niches/[slug]/page.tsx`
- [x] OpenGraph tags — реалізовано через `generateMetadata` у `page.tsx`
- [x] Canonical URL — реалізовано через `generateMetadata` у `page.tsx`
- [x] Internal links — реалізовано через секції пов'язаних ніш, блогу та портфоліо у `niches/[slug]/page.tsx`
- [x] Breadcrumb навігація — реалізовано у `niches/[slug]/page.tsx`

## Реалізовано (shared template)
- [x] Акції та знижки — `promotions` у `niches.ts` + секція "Акції" у `niches/[slug]/page.tsx`
- [x] Команда спеціалістів — `team` у `niches.ts` + секція "Команда" у `niches/[slug]/page.tsx`
- [x] Онлайн-запис (BookingSection) — `bookingForm: true` у `niches.ts`; step 1: послуга, step 2: дата/час, step 3: контакти, step 4: підтвердження
- [x] Калькулятор вартості (NicheCalculator) — `calculatorSteps` у `niches.ts` + компонент у `niches/[slug]/page.tsx`
