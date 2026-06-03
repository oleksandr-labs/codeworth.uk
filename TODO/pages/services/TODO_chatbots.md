# Розробка чат-ботів — codenest.com.ua
Опис: Сторінка послуги розробки чат-ботів для Telegram, Viber, Instagram.
**Статус:** ✅ Готово (MVP)
**i18n статус:** ✅ Повністю перекладено (EN + UK) — /services/[slug]

---

## Hero
- [x] H1: "Чат-бот — 24/7 консультант, що не втомлюється"
- [x] Підзаголовок: автоматизуйте підтримку та продажі
- [x] CTA: "Замовити чат-бота"

## Платформи
- [x] Telegram-бот — реалізовано через `service.features` ("Telegram / Viber / FB") у `services.ts`
- [x] Viber-бот — реалізовано через `service.features` ("Telegram / Viber / FB") у `services.ts`
- [x] Instagram Direct бот — ✅ додано до `service.features` ("Telegram / Viber / FB / Instagram / WhatsApp") у `services.ts`
- [x] Facebook Messenger бот — реалізовано через `service.features` ("Telegram / Viber / FB") у `services.ts`
- [x] WhatsApp Business API бот — ✅ додано до `service.features` у `services.ts`
- [x] Веб-чат (бот на сайті) — FAQ chatbot у `FloatingChat.tsx` (6 швидких відповідей, chat UI з повідомленнями)

## Що вміє бот
- [x] Відповідати на FAQ автоматично — реалізовано через `service.packages` ("FAQ + відповіді") у `services.ts`
- [x] Приймати та обробляти заявки — реалізовано через `service.features` ("Прийом замовлень") у `services.ts`
- [x] Записувати клієнтів на послуги — реалізовано через `service.features` ("Запис на послуги: Вибір дати та часу, нагадування") у `services.ts`
- [x] Приймати оплату (Telegram Payments, LiqPay) — реалізовано через `service.packages` ("Telegram Payments") + `service.faq` у `services.ts`
- [x] Підключення до CRM (передача заявок) — реалізовано через `service.includes` ("Інтеграція з CRM / сайтом") у `services.ts`
- [x] Надсилання сповіщень та нагадувань — реалізовано через `service.includes` ("Розсилки та нотифікації") у `services.ts`
- [x] Проводити опитування та NPS — реалізовано через `service.faq` ("Чи може бот проводити опитування?") у `services.ts`
- [x] Вести клієнта по воронці продажів — реалізовано через `service.packages` ("воронка + CRM інтеграція") у `services.ts`

## Кому підходить
- [x] Салони краси, медицина — запис на прийом — покрито у useCases сервісної сторінки ("Салони краси та медицина")
- [x] Ресторани — онлайн-замовлення та бронювання — покрито у useCases сервісної сторінки ("Ресторани")
- [x] Інтернет-магазини — статус замовлення — покрито у useCases сервісної сторінки ("Інтернет-магазини")
- [x] Освітні проєкти — автоматична воронка лідів — покрито у useCases сервісної сторінки ("Освітні проєкти")
- [x] Служби підтримки — зменшення навантаження — покрито у useCases сервісної сторінки ("Служби підтримки")

## Технічний стек
- [x] Node.js + Telegraf.js (Telegram) — реалізовано через `service.includes` ("Розробка бота (Node.js + Telegraf)") у `services.ts`
- [x] n8n або Make (no-code автоматизації) — ✅ додано до `service.includes` ("Автоматизація через n8n або Make") у `services.ts`
- [x] OpenAI GPT-4 інтеграція (AI-бот) — реалізовано через `service.packages` ("AI-бот: GPT-4o / Claude") у `services.ts`
- [x] Підключення до власної БД або Google Sheets — реалізовано через `service.faq` ("дані з бота можна відправляти в Google Таблиці або будь-яку CRM") у `services.ts`

## Тарифи
- [x] Basic: FAQ-бот на 1 платформі
- [x] Pro: воронка + CRM інтеграція + 2 платформи
- [x] Enterprise: AI GPT-бот + всі платформи + аналітика

## SEO
- [x] Title: "Розробка чат-ботів для бізнесу — CodeNest"
- [x] Schema.org: Service
- [x] Internal links: CRM, Email-маркетинг, Інтеграції
