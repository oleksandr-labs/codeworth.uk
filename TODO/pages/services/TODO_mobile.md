# Мобільні додатки та PWA — codenest.com.ua
Опис: Сторінка послуги розробки PWA та мобільних додатків.
**Статус:** ✅ Готово (MVP)
**i18n статус:** ✅ Повністю перекладено (EN + UK) — /services/[slug]

---

## Hero
- [x] H1: "Мобільний додаток для вашого бізнесу — PWA або нативний"
- [x] Підзаголовок: без App Store, запускається з браузера
- [x] CTA: "Дізнатися більше"

## PWA vs Нативний додаток
- [x] Таблиця порівняння: вартість, час, підтримка, можливості — покрито у faq сервісної сторінки ("Чим PWA відрізняється від нативного додатку?") + processSteps ("Вибір підходу")
- [x] Рекомендація: PWA для більшості бізнесів — покрито у faq/processSteps сервісної сторінки

## Можливості PWA
- [x] Встановлення на домашній екран (без App Store) — реалізовано через `service.features` ("Встановлення на телефон") + `service.includes` ("Web App Manifest") у `services.ts`
- [x] Офлайн-режим (Service Worker) — реалізовано через `service.features` + `service.includes` ("Service Worker (офлайн-режим)") у `services.ts`
- [x] Push-сповіщення — реалізовано через `service.features` + `service.includes` ("Push-нотифікації (Web Push API)") у `services.ts`
- [x] Синхронізація у фоні — ✅ додано до `service.features` ("Фонова синхронізація: Background Sync") у `services.ts`
- [x] Швидкість нативного додатку — реалізовано через `service.features` ("Швидкість нативного додатку") у `services.ts`

## Кому підходить
- [x] Доставка їжі та товарів — покрито у useCases сервісної сторінки ("Доставка їжі")
- [x] Сервіси бронювання (ресторани, краса) — покрито у useCases сервісної сторінки ("Сервіси бронювання")
- [x] Навчальні платформи — покрито у useCases сервісної сторінки ("Освітні платформи")
- [x] Корпоративні інструменти — покрито у useCases сервісної сторінки ("Корпоративні інструменти")

## Технічний стек
- [x] Next.js PWA (next-pwa або custom Service Worker) — реалізовано через `service.includes` ("Service Worker") у `services.ts`
- [x] Push: Firebase Cloud Messaging — ✅ додано до `service.includes` ("Push-нотифікації (Web Push API / Firebase FCM)") у `services.ts`
- [x] Офлайн: Workbox — ✅ додано до `service.includes` ("Workbox (кешування та Background Sync)") у `services.ts`
- [x] React Native — для нативного додатку (iOS + Android) — ✅ додано до `service.includes` + згадано в features/faq у `services.ts`

## SEO
- [x] Title: "Розробка PWA та мобільних додатків — CodeNest"
- [x] Schema.org: Service
- [x] Internal links: e-commerce, CRM
