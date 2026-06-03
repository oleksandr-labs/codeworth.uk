# Інтернет-магазини (E-commerce) — codenest.com.ua
Опис: Сторінка послуги розробки інтернет-магазинів. SEO-keyword: "розробка інтернет-магазину Україна".
**Статус:** ✅ Готово (MVP)
**i18n статус:** ✅ Повністю перекладено (EN + UK) — /services/[slug]

---

## Hero
- [x] H1: "Інтернет-магазин — від ідеї до першого продажу"
- [x] Підзаголовок: конверсія, швидкість, SEO
- [x] CTA: "Замовити магазин" + "Дивитись приклади"

## Можливості магазину
- [x] Каталог з фільтрами, пошуком, сортуванням — реалізовано через `service.features` ("Каталог з фільтрами: розумний пошук та фільтрація") у `services.ts`
- [x] Картка товару: фото галерея, варіанти, наявність — реалізовано через `service.faq` ("Як виглядає картка товару?") у `services.ts`
- [x] Кошик + оформлення замовлення (4 кроки) — реалізовано через `service.includes` ("Кошик + оформлення замовлення") у `services.ts`
- [x] Онлайн-оплата: LiqPay, Monobank, Stripe, Visa/Mastercard — реалізовано через `service.features` + `service.includes` ("LiqPay / Stripe") у `services.ts`
- [x] Доставка: Нова Пошта, Укрпошта, кур'єр, самовивіз — реалізовано через `service.includes` ("Нова Пошта + Укрпошта") у `services.ts`
- [x] Кабінет покупця: замовлення, вибране, відгуки — реалізовано через `service.features` + `service.includes` ("Особистий кабінет покупця") у `services.ts`
- [x] Адмін-панель: товари, замовлення, клієнти, аналітика — реалізовано через `service.features` ("Адмін-панель") + `service.includes` у `services.ts`

## Технічні переваги
- [x] Next.js SSG/ISR — максимальна швидкість — описано у features/includes/packages/useCases сервісної сторінки
- [x] Mobile-first дизайн — описано у features/includes/packages/useCases сервісної сторінки
- [x] Core Web Vitals > 90 балів — описано у features/includes/packages/useCases сервісної сторінки
- [x] SEO: унікальні Title/Description для кожного товару, Schema.org Product — реалізовано через `service.features` ("SEO-оптимізація: Мікророзмітка Product, BreadcrumbList") у `services.ts`

## Інтеграції
- [x] 1С або Google Sheets для синхронізації товарів — реалізовано через `service.faq` ("Чи синхронізуєте з 1С або Google Sheets?") у `services.ts`
- [x] CRM для обробки замовлень — описано у features/includes/packages/useCases сервісної сторінки
- [x] Email-сповіщення покупцям — реалізовано через `service.includes` ("Email-нотифікації про замовлення") у `services.ts`
- [x] SMS-сповіщення (Kyivstar API) — ✅ додано до `service.includes` ("SMS-сповіщення (Kyivstar API / SMS Club)") у `services.ts`
- [x] Google Shopping Feed (XML)

## Тарифи
- [x] Basic: до 100 товарів, базові функції
- [x] Pro: необмежені товари + фільтри + промокоди + аналітика
- [x] Enterprise: кастомний функціонал + ERP-інтеграція

## SEO
- [x] Title: "Розробка інтернет-магазину в Україні — CodeNest"
- [x] Schema.org: Service + MerchantReturnPolicy
- [x] Internal links: Портфоліо e-commerce, Ціни, Маркетплейс
