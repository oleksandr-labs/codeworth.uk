# Огляд послуг (Services Overview) — codenest.com.ua
Опис: Головна сторінка розділу "Послуги". Статична (SSG), SEO-оптимізована, веде до окремих сторінок кожної послуги.
**Статус:** ✅ Готово (MVP)
**i18n статус:** ✅ Повністю перекладено (EN + UK)
**✅ Проаналізовано 2026-05-01 — всі 24/24 задачі виконані.**
**✅ Оновлено 2026-05-01 — FAQ-секція + FAQPage schema + виправлено локалізацію ItemList schema.**

---

## Hero-секція
- [x] Заголовок + підзаголовок + CTA "Обговорити проєкт"

## Сітка послуг (14 карток)
- [x] Картки послуг з іконками, описами та посиланнями — `services/page.tsx`
- [x] Hover-анімація карток
- [x] Посилання на окрему сторінку кожної послуги

## Чому обирають CodeNest
- [x] Лічильники: проєктів, клієнтів, років, ніш

## Процес роботи
- [x] 5-крокова схема — `PROCESS_STEPS` у `services/page.tsx`

## Відгуки клієнтів
- [x] TestimonialsSection вбудована у сторінку

## CTA-блок
- [x] CTASection в кінці сторінки

## Окремі сторінки послуг (/services/[slug])
- [x] Features (6 карток переваг) — `service.features`
- [x] What's included (чек-лист) — `service.includes`
- [x] Packages (3 тарифи з highlight) — `service.packages`
- [x] Use Cases (6 нішевих прикладів) — `service.useCases` + секція «Приклади по нішах»
- [x] Process Steps (4 кроки) — `service.processSteps` + секція «Як це працює»
- [x] Case Studies (3 кейси з метриками) — `service.caseStudies` + секція «Реальні кейси клієнтів»
- [x] FAQ (5-7 питань) — `service.faq` + Schema.org FAQPage
- [x] Related blog posts (3 статті) — маппінг по категоріях
- [x] Related niches (3 ніші) — маппінг по ключових словах
- [x] Other services (chips з іконками)
- [x] Schema.org Service + BreadcrumbList + FAQPage

## FAQ-секція (додано 2026-05-01)
- ✅ FAQ секція з 5 питаннями про послуги (EN + UK) перед TestimonialsSection
- ✅ Schema.org FAQPage JSON-LD → rich snippets у Google

## SEO
- [x] Title: "Послуги веб-розробки та digital-маркетингу | CodeNest"
- [x] Meta Description
- ✅ Schema.org: ItemList із посиланнями на всі послуги (локалізовано EN/UK, виправлено URL)
- ✅ Schema.org: FAQPage для блоку частих питань
- [x] Internal links до всіх підсторінок послуг
