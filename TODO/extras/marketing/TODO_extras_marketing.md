 ✅ Проаналізовано 2026-05-01 — 18 базових + 3 нових позиції (referral program, QR-generator, loyalty points) в extras.ts. Усі нові — isNew: true, hasDemo: false.

> ⚠️ **Незакреслені пункти ([ ]) — Phase 2:** позиції є в каталозі /extras як статичні UI-демо. Повноцінна реалізація (реальні API, платежі, backend) відбувається при замовленні клієнтом.

# 📣 Маркетинг та Автоматизація — Доробки

> Чат-боти, email-маркетинг, налаштування реклами та SMM-інструменти.
> Автоматизує залучення і утримання клієнтів.

**Реалізовано в каталозі:** 0 позицій | **Планується:** 18 позицій
**Нова категорія — відсутня в поточному `extras.ts`**

> ⚠️ Потрібно додати категорію `"marketing"` до `ExtraCategory` в `src/lib/data/extras.ts`.

> Примітка: Частина цих функцій описана у сторінках послуг:
> - Чат-боти → [pages/services/TODO_chatbots.md](../../pages/services/TODO_chatbots.md)
> - Email-маркетинг → [pages/services/TODO_email_marketing.md](../../pages/services/TODO_email_marketing.md)
> - Реклама → [pages/services/TODO_ads.md](../../pages/services/TODO_ads.md)
> - SMM → [pages/services/TODO_smm.md](../../pages/services/TODO_smm.md)

---

## ✅ Реалізовано (для власного сайту CodeNest, але не в каталозі)

- [x] Telegram нотифікації (заявки) — `api/contact/route.ts`, `api/newsletter/route.ts`
- [x] Newsletter API — `src/app/api/newsletter/route.ts`
- [x] FloatingChat з FAQ-відповідями — `FloatingChat.tsx` (6 швидких відповідей)
- [x] Facebook Pixel — `NEXT_PUBLIC_FB_PIXEL_ID` у `layout.tsx`
- [x] Google Ads Tag — `NEXT_PUBLIC_GOOGLE_ADS_ID` у `layout.tsx`

---

## 🔲 Планується (нові позиції для каталогу)

### Чат-боти та автоматизація

#### Пріоритет 🔴 Критичний
- [x] 🤖 **Telegram-бот для бізнесу (прийом замовлень + FAQ)** — `mkt-telegram-bot-full` — від 5 000 грн, 7 днів
  - Меню вибору послуг, прийом контактів, автовідповідь на FAQ, нотифікація адміну.
  - Інтеграція з сайтом через webhook.
- [x] 💬 **AI чат-бот (на базі OpenAI GPT)** — `mkt-ai-chatbot` — від 8 000 грн, 10 днів
  - Навчений на даних бізнесу (FAQ, послуги, ціни). Відповідає на питання клієнтів 24/7.
  - Fallback на живого оператора. Збереження контексту розмови.

#### Пріоритет 🟡 Середній
- [x] 🎤 **Viber-бот для бізнесу** — `mkt-viber-bot` — від 4 000 грн, 6 днів
  - Аналог Telegram-бота для Viber. Актуально для аудиторії 40+.
- [x] 🔔 **Push-нотифікації (Web Push)** — `mkt-push` — від 2 500 грн, 3 дні
  - Браузерні push-сповіщення про акції, оновлення. OneSignal або Firebase FCM.
- [x] 🗓 **Бот прийому записів** — `mkt-booking-bot` — від 4 000 грн, 6 днів
  - Telegram-бот що дозволяє записатись на послугу: вибір дати/часу, підтвердження, нагадування.

### Email-маркетинг

#### Пріоритет 🔴 Критичний
- [x] 📧 **Welcome-серія (3 листи)** — `mkt-email-welcome-series` — від 3 500 грн, 4 дні
  - Автоматична серія після реєстрації: знайомство → корисна інформація → оффер.
  - Налаштування у Mailchimp або Brevo.
- [x] 🛒 **Покинутий кошик (Abandoned Cart email)** — `mkt-email-abandoned-cart` — від 2 500 грн, 3 дні
  - Тригерний лист через 1 годину після покинутого кошику. Нагадування + знижка.

#### Пріоритет 🟡 Середній
- [x] 🎉 **Промо-розсилка (Newsletter)** — `mkt-email-promo` — від 1 500 грн, 2 дні
  - Розробка шаблону + перший промо-лист. Адаптивна верстка email-HTML.
- [x] 🔄 **Реактиваційна серія (Re-engagement)** — `mkt-email-reactivation` — від 2 500 грн, 3 дні
  - 2–3 листи для "сплячих" підписників: нагадування → цінність → фінальний оффер.
- [x] ⚙️ **Підключення Email-платформи (Mailchimp / Brevo)** — `mkt-email-setup` — від 2 000 грн, 2 дні
  - Налаштування акаунту, форми підписки, Double Opt-In, сегментів аудиторії.

### Реклама та пікселі

#### Пріоритет 🔴 Критичний
- [x] 📊 **Facebook/Instagram Pixel + стандартні події** — `mkt-fb-pixel-events` — від 1 500 грн, 2 дні
  - Встановлення Meta Pixel, налаштування подій: PageView, Lead, Purchase, AddToCart.
- [x] 🔢 **Google Ads Conversion Tracking** — `mkt-google-ads-tracking` — від 1 500 грн, 2 дні
  - Відстеження конверсій Google Ads: форм, дзвінків, покупок.

#### Пріоритет 🟡 Середній
- [x] 🎯 **Ретаргетингова кампанія (Facebook)** — `mkt-retargeting-fb` — від 3 500 грн, 5 днів
  - Налаштування аудиторій ретаргетингу, креативи, оптимізація бюджету.
- [x] 📺 **TikTok Pixel + кампанія** — `mkt-tiktok` — від 3 000 грн, 4 дні
  - Встановлення TikTok Pixel, першa рекламна кампанія для молодіжної аудиторії.
- [x] 💼 **LinkedIn Insight Tag + B2B реклама** — `mkt-linkedin` — від 3 500 грн, 5 днів
  - Для B2B-клієнтів: встановлення Insight Tag, Campaign Manager, account-based targeting.

### Локальне та органічне зростання

#### Пріоритет 🟢 Низький
- [x] 🗺 **Google Business Profile — Ads (Local Campaigns)** — `mkt-google-local` — від 3 000 грн, 4 дні
  - Налаштування local search кампанії у Google Ads для локального бізнесу.
- [x] 📱 **SMM Starter: оформлення + перший місяць постів** — `mkt-smm-starter` — від 5 000 грн, 14 днів
  - Instagram + Facebook: оформлення профілю, 12 постів з текстами, налаштування Stories.

