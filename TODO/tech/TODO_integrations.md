 Інтеграції зовнішніх сервісів (Integrations)
Опис: Підключення зовнішніх сервісів, аналітики, CRM, платіжних систем та маркетингових інструментів.
**Статус:** Частково виконано
**⚠️ Оновлено 2026-07-08 — код більшості інтеграцій готовий, але GA4/FB Pixel/Google Ads/reCAPTCHA/Telegram/Resend не мають реальних ключів у GH secrets (перевірено `gh secret list` — лише CRM+Hetzner). Сайт живе на Hetzner (atlas), не Vercel. LiqPay/маркетплейс видалено остаточно (64b38c9). Пріоритет: створити облікові дані для аналітики/безпеки (інструкція дана 2026-07-08), потім Google Search Console, GTM, Hotjar/Clarity.**

---

> ⚠️ **Незакреслені пункти ([ ]) — Phase 2/3:** потребують реального серверного оточення (Hetzner, БД, API-ключі, домен). Реалізуються після деплою та на етапі запуску проєкту.


## Аналітика та SEO
- ⚠️ Google Analytics 4 (GA4) — код готовий (`next/script` в `layout.tsx`, `NEXT_PUBLIC_GA_ID`), **АЛЕ секрет не заданий** (перевірено 2026-07-08 через `gh secret list` — відсутній) → GA4 фактично не збирає дані, сайт "летить наосліп" без видимості трафіку/конверсій. Інструкція створення GA4 property дана користувачу 2026-07-08 в чаті
- [ ] Google Search Console — реєстрація після деплою
- [ ] Google Tag Manager (GTM) — опційно, якщо потрібно управляти тегами
- [ ] Hotjar або Clarity для heatmaps
- [ ] Yandex.Metrica (не актуально)
- ⚠️ reCAPTCHA v3 — код готовий (`useRecaptcha` хук + `verifyRecaptcha` на бекенді, форми пропускають перевірку якщо токена нема), **АЛЕ `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`/`RECAPTCHA_SECRET_KEY` не задані** → форми зараз без захисту від ботів

## CRM та Lead Management
- ✅ Інтеграція з внутрішньою CRM (2026-07-07) — власна CRM на Hetzner ERP Dashboard (`C:\HETZNER\dashboard\`, репо `hetzner-static-various-sites`, документація `TODO_CRM.md` → розділ 4 «Заявки»), не сторонній SaaS (KeyCRM/Zoho/Pipedrive/HubSpot не використовуються)
- ✅ Автоматичний імпорт лідів з форм — `api/contact/route.ts` та `api/apply/route.ts` шлють POST на CRM ingest-ендпоінт одразу після валідації (до Telegram/Resend-блоків, які лишаються як fallback-канали)
- ✅ Webhooks/API інтеграція — `POST /api/crm/leads/ingest` на боці CRM, авторизація через shared-secret `X-Ingest-Token` (env vars `CRM_INGEST_URL` + `CRM_INGEST_TOKEN`, задані як GH Actions secrets репо codeworth.uk, синкаються в `.env` сервера через `deploy.yml`)
- [ ] Двосторонній зв'язок (CRM → сайт, напр. статус заявки в акаунті клієнта) — не реалізовано, наразі лише сайт → CRM

## Месенджери та чат
- ⚠️ Telegram Bot API — код готовий у `api/contact/route.ts`, `api/newsletter/route.ts` (`api/order/route.ts` видалено разом з маркетплейсом, комітом 64b38c9), **АЛЕ `TELEGRAM_BOT_TOKEN`/`TELEGRAM_CHAT_ID` не задані** — миттєвих сповіщень нема; реальний канал лідів зараз — внутрішня CRM (див. розділ вище), Telegram додав би лише миттєві алерти зверху
- [ ] Viber Bot (якщо потрібно)
- [ ] Facebook Messenger integration
- [ ] WhatsApp Business API
- [ ] Live chat widget (Intercom, Tawk.to, або custom)
- [ ] Chatbot для автовідповідей

## Email-маркетинг
- [ ] Mailchimp або Brevo (Sendinblue) для розсилок
- ⚠️ Transactional emails — Resend API інтегровано в `api/contact/route.ts`/`api/apply/route.ts` (HTML email підтвердження, `payload.name`, service/budget), **АЛЕ `RESEND_API_KEY` не задано** → email-підтвердження заявок/кандидатам зараз не надсилаються. (Старе посилання на `/api/liqpay/callback` тут було застарілим — той роут видалено разом з маркетплейсом, комітом 64b38c9)
- [ ] Автоматичні email-нагадування
- ✅ Newsletter subscription API — `src/app/api/newsletter/route.ts` (POST, валідація email, Telegram-сповіщення)

## Платіжні системи
- ❌ LiqPay — видалено разом з маркетплейсом (комітом 64b38c9, `/api/liqpay/create` + `/api/liqpay/callback` більше не існують); Codeworth не приймає прямі онлайн-платежі — оплата за проєкти йде поза сайтом (банківський переказ/Stripe, див. `terms-of-service`)
- [ ] Monobank API
- [ ] Portmone, WayForPay
- [ ] PayPal (міжнародні платежі)
- [ ] Apple Pay / Google Pay

## Реклама та ретаргетинг
- ⚠️ Facebook Pixel (Meta Ads) — код готовий (`layout.tsx`, `NEXT_PUBLIC_FB_PIXEL_ID`), **АЛЕ секрет не заданий** → ретаргетинг не працює
- ⚠️ Google Ads Tag — код готовий (`layout.tsx`, `NEXT_PUBLIC_GOOGLE_ADS_ID`), **АЛЕ секрет не заданий** (можна відкласти до фактичного запуску рекламних кампаній)
- [ ] TikTok Pixel
- [ ] LinkedIn Insight Tag
- [ ] Conversion tracking для рекламних кампаній

## Соціальні мережі
- ✅ Open Graph для красивих превью (Facebook, LinkedIn, Telegram) — `layout.tsx` (openGraph metadata)
- ✅ Twitter Card metadata — `layout.tsx` (twitter metadata: summary_large_image)
- ✅ Social sharing buttons — `ShareButtons.tsx` (Telegram, Facebook, X/Twitter, LinkedIn, Copy link з clipboard API)
- [ ] Instagram Feed API (якщо потрібно)

## Карти
- [ ] Google Maps Embed API
- [ ] Google Maps Directions API
- [ ] Geolocation для визначення регіону користувача

## Headless CMS (за потребою)
- [ ] Sanity.io або Strapi для контенту
- [ ] Contentful або Prismic
- [ ] WordPress Headless (якщо legacy)
- [ ] Ghost (для блогу)

## API для бізнес-логіки
- [ ] ПриватБанк API (курси валют)
- [ ] Нова Пошта API (розрахунок доставки)
- [ ] Booking API (для ніші туризму)
- [ ] SMS-сервіси (Twilio, Turbosms)

## Моніторинг та помилки
- [ ] Sentry (error tracking)
- [ ] LogRocket (session replay)
- [ ] UptimeRobot (server monitoring)
- [ ] StatusPage (для прозорості даунтаймів)

## Хмарні сховища
- [ ] AWS S3 або DigitalOcean Spaces (для медіа)
- [ ] Cloudinary (оптимізація зображень на льоту)
- [ ] Uploadcare (керування завантаженнями)

---

### Примітки
- Ретельно перевірити обробку персональних даних згідно з GDPR/CCPA.
- Використовувати Google Tag Manager для централізованого керування тегами.
- Не навантажувати сайт зайвими скриптами — кожна інтеграція впливає на швидкість.
