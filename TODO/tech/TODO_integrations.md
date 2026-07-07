 Інтеграції зовнішніх сервісів (Integrations)
Опис: Підключення зовнішніх сервісів, аналітики, CRM, платіжних систем та маркетингових інструментів.
**Статус:** Частково виконано
**✅ Оновлено 2026-05-03 — 11/52 задач виконані. LiqPay ✅, Resend transactional ✅, Email-підтвердження форм ✅. Пріоритет після деплою: Google Search Console, GTM, Hotjar/Clarity, WayForPay для фізосіб.**

---

> ⚠️ **Незакреслені пункти ([ ]) — Phase 2/3:** потребують реального серверного оточення (Vercel, БД, API-ключі, домен). Реалізуються після деплою та на етапі запуску проєкту.


## Аналітика та SEO
- ✅ Google Analytics 4 (GA4) — `next/script` в `layout.tsx`, активується через `NEXT_PUBLIC_GA_ID`
- [ ] Google Search Console — реєстрація після деплою
- [ ] Google Tag Manager (GTM) — опційно, якщо потрібно управляти тегами
- [ ] Hotjar або Clarity для heatmaps
- [ ] Yandex.Metrica (не актуально)

## CRM та Lead Management
- ✅ Інтеграція з внутрішньою CRM (2026-07-07) — власна CRM на Hetzner ERP Dashboard (`C:\HETZNER\dashboard\`, репо `hetzner-static-various-sites`, документація `TODO_CRM.md` → розділ 4 «Заявки»), не сторонній SaaS (KeyCRM/Zoho/Pipedrive/HubSpot не використовуються)
- ✅ Автоматичний імпорт лідів з форм — `api/contact/route.ts` та `api/apply/route.ts` шлють POST на CRM ingest-ендпоінт одразу після валідації (до Telegram/Resend-блоків, які лишаються як fallback-канали)
- ✅ Webhooks/API інтеграція — `POST /api/crm/leads/ingest` на боці CRM, авторизація через shared-secret `X-Ingest-Token` (env vars `CRM_INGEST_URL` + `CRM_INGEST_TOKEN`, задані як GH Actions secrets репо codeworth.uk, синкаються в `.env` сервера через `deploy.yml`)
- [ ] Двосторонній зв'язок (CRM → сайт, напр. статус заявки в акаунті клієнта) — не реалізовано, наразі лише сайт → CRM

## Месенджери та чат
- ✅ Telegram Bot API (сповіщення про нові заявки) — `api/contact/route.ts`, `api/newsletter/route.ts`, `api/order/route.ts`
- [ ] Viber Bot (якщо потрібно)
- [ ] Facebook Messenger integration
- [ ] WhatsApp Business API
- [ ] Live chat widget (Intercom, Tawk.to, або custom)
- [ ] Chatbot для автовідповідей

## Email-маркетинг
- [ ] Mailchimp або Brevo (Sendinblue) для розсилок
- ✅ Transactional emails — Resend API у `/api/liqpay/callback` (HTML email підтвердження оплати клієнту; `RESEND_API_KEY` + `RESEND_FROM_EMAIL` env vars)
- ✅ Email-підтвердження для форм — Resend: contact form → підтвердження отримання заявки (HTML email, `payload.name`, service/budget); newsletter → welcome email EN; apply → Application Received email EN з назвою позиції. Всі обгорнуті у try/catch (non-critical).
- [ ] Автоматичні email-нагадування
- ✅ Newsletter subscription API — `src/app/api/newsletter/route.ts` (POST, валідація email, Telegram-сповіщення)

## Платіжні системи (для маркетплейсу)
- ✅ LiqPay (для України) — `/api/liqpay/create` (POST, Zod, rate limit 5/10хв, підпис SHA1) + `/api/liqpay/callback` (верифікація підпису, Telegram alert, Resend email); 24 тести у `app/api/liqpay/__tests__/liqpay.route.test.ts`
- [ ] Monobank API
- [ ] Portmone, WayForPay
- [ ] PayPal (міжнародні платежі)
- [ ] Apple Pay / Google Pay

## Реклама та ретаргетинг
- ✅ Facebook Pixel (Meta Ads) — `layout.tsx`, активується через `NEXT_PUBLIC_FB_PIXEL_ID`
- ✅ Google Ads Tag — `layout.tsx`, активується через `NEXT_PUBLIC_GOOGLE_ADS_ID`
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
