# Логістика / Перевезення / Транспорт — codenest.com.ua / Demo
Опис: Demo-сторінка для ніші "транспортна компанія / логістика / переїзди". SSG, SEO-оптимізована.
**Складність:** 🟡 Середня (калькулятор + трекінг + CRM)
**Статус:** ✅ Готово (MVP — shared template `niches/[slug]/page.tsx`)
**i18n статус:** ✅ Повністю перекладено (EN + UK)

---

> ⚠️ **Незакреслені пункти ([ ]) — Phase 2:** потребують реального медіа (фото/відео), backend-інтеграцій або зовнішніх API. Demo MVP реалізовано через shared template `niches/[slug]/page.tsx`.

## Hero
- [ ] Фото вантажного автомобіля або складу
- [x] H1: "Надійні перевезення по Україні — від 1 кг до 20 тонн"
- [x] Швидкий калькулятор: звідки → куди → вага → ціна — реалізовано через calculatorSteps в niches.ts + компонент NicheCalculator
- [x] CTA: "Розрахувати доставку" + "Замовити перевезення"

## Послуги
- [x] Список послуг — `mockServices` у `niches.ts` + секція послуг у `niches/[slug]/page.tsx`
- [x] Вантажні перевезення по місту — реалізовано через `mockServices` ("Доставка по місту") у `niches.ts`
- [x] Міжміські перевезення — реалізовано через `mockServices` ("Міжміська доставка") у `niches.ts`
- [x] Міжнародні перевезення (Європа) — реалізовано через `nicheFaq` + `variants` ("Митна логістика") у `niches.ts`
- [x] Квартирні та офісні переїзди — реалізовано через `variants` ("Переїзди / Муверінг") у `niches.ts`
- [x] Складська логістика (зберігання + фулфілмент) — реалізовано через `mockServices` ("Фулфілмент для e-commerce") у `niches.ts`
- [x] Доставка для інтернет-магазинів (last mile) — реалізовано через `mockServices` ("Фулфілмент для e-commerce") у `niches.ts`
- [x] Спецтранспорт: рефрижератор, негабарит, небезпечні вантажі — реалізовано через `variants` ("Рефрижераторна логістика") та `nicheFaq` у `niches.ts`

## Калькулятор вартості
- [x] Тип перевезення (місто / міжміські / міжнародні) — реалізовано через calculatorSteps в niches.ts + компонент NicheCalculator
- [x] Маршрут: місто відправлення → місто доставки — реалізовано через calculatorSteps в niches.ts + компонент NicheCalculator
- [x] Тип вантажу та вага/об'єм — реалізовано через calculatorSteps в niches.ts + компонент NicheCalculator
- [x] Додатково: пакування, страхування, вантажники — реалізовано через `nicheFaq` у `niches.ts`
- [x] Результат: орієнтовна вартість + термін доставки — реалізовано через `NicheCalculator` у `niches/[slug]/page.tsx`

## Відстеження (трекінг)
- [ ] Введи номер замовлення → статус у реальному часі
- [ ] Карта маршруту (Google Maps або Leaflet)
- [ ] SMS / Telegram сповіщення при зміні статусу

## Автопарк
- [ ] Галерея транспорту: фото, вантажопідйомність, об'єм кузова
- [ ] Типи: мікроавтобус, фургон, вантажівка, фура, рефрижератор

## Для бізнесу (B2B)
- [x] Корпоративні тарифи (знижки за об'єм) — реалізовано через `promotions` ("Договірний клієнт −10%") та `nicheFaq` у `niches.ts`
- [ ] API-інтеграція для інтернет-магазинів (потребує реальної backend інтеграції)
- [x] Особистий менеджер — реалізовано через `team` + `processSteps` та `nicheFaq` у `niches.ts`
- [x] Щомісячна звітність — реалізовано через `nicheFaq` у `niches.ts`

## Довіра
- [x] Відгуки клієнтів — `NicheReviews` компонент у `niches/[slug]/page.tsx`
- [x] Довірчі статистики — `trustStats` у `niches.ts`
- [x] Страхування вантажів (100% вартості) — реалізовано через `nicheFaq` у `niches.ts`
- [x] Ліцензії та дозволи — реалізовано через `nicheFaq` у `niches.ts`
- [ ] Партнери: великі компанії (потребують реальних логотипів/медіа)

## SEO
- [x] Title: "[Назва] — Вантажні перевезення по Україні | Логістика" — `titleSeo` у `niches.ts`, `generateMetadata` у `page.tsx`
- [x] Meta Description — `metaDescription` у `niches.ts`
- [x] Schema.org: MovingCompany або LocalBusiness — `schemaType` у `niches.ts`, `businessLd` у `page.tsx`
- [x] Ключові слова SEO — `tags` у `niches.ts` + `generateMetadata` у `page.tsx`
- [x] OpenGraph tags — реалізовано через `generateMetadata` у `page.tsx`
- [x] Canonical URL — реалізовано через `generateMetadata` у `page.tsx`
- [x] Internal links — реалізовано через секції пов'язаних ніш, блогу та портфоліо у `niches/[slug]/page.tsx`
- [x] Breadcrumb навігація — реалізовано у `niches/[slug]/page.tsx`

## Реалізовано (shared template)
- [x] Пов'язані статті блогу — секція блогу у `niches/[slug]/page.tsx`
