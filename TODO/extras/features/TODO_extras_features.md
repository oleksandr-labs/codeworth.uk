> ✅ Проаналізовано 2026-05-01 — 22 позиції в extras.ts (10 базових + 12 нових). Нові позиції мають hasDemo: false. Додати демо для feat-multistep-form та feat-floating-chat.
> ✅ Додано 2026-05-01 — 7 нових позицій (feat-before-after, feat-lead-quiz, feat-fomo, feat-announcement-bar, feat-fab-cluster, feat-scroll-animations, ai-image-search). Для перших трьох реалізовано live демо.
> ✅ Демо реалізовано 2026-05-03 — feat-announcement-bar, feat-fab-cluster, feat-scroll-animations (AnnouncementBarDemo.tsx, FabClusterDemo.tsx, ScrollAnimationsDemo.tsx)
> ✅ Демо реалізовано 2026-05-04 — feat-countdown, feat-skills-bar, feat-i18n-switcher (CountdownDemo.tsx, SkillsBarDemo.tsx, I18nSwitcherDemo.tsx) + unit + jest-axe тести
> ✅ Демо реалізовано 2026-05-04 (хвиля 2) — feat-compare, feat-sticky-sidebar, feat-a11y-toolbar, feat-print-pdf (CompareDemo.tsx, StickySidebarDemo.tsx, A11yToolbarDemo.tsx, PrintPdfDemo.tsx) + 14 тестів
> ✅ Демо реалізовано 2026-05-04 (хвиля 3) — feat-lightbox (використовує LightboxGallery), feat-slider (auto-play carousel), feat-visual-sitemap (ARIA tree) + 13 тестів
> ✅ Демо реалізовано 2026-05-04 (хвиля 4) — feat-video (3 layouts: hero/embed/case-study), feat-interactive-map (SVG-based 8 markers + filters), feat-web-push (subscribe flow + permission prompt) + 14 тестів
> ✅ Демо реалізовано 2026-05-04 (хвиля 5) — feat-virtual-tour (360° drag-pannable + 3 сцени + hotspots), feat-live-chat (повноцінний chat widget з typing/read receipts) + 11 тестів
> ✅ Демо реалізовано 2026-05-04 (хвиля 6) — analytics-funnel (3 пресети conversion funnel), ecom-mini-shop (mini e-commerce flow з кошиком + checkout) + 11 тестів
> ✅ Демо реалізовано 2026-05-04 (хвиля 7) — int-instagram (grid/carousel + lightbox), mkt-ai-chatbot (GPT-style з classification), content-seo-article (3 views: preview/HTML/audit) + 15 тестів
> ✅ Демо реалізовано 2026-05-04 (хвиля 8) — analytics-looker (KPI cards + sparkline + sources), analytics-hotjar (click/scroll/rage heatmaps), analytics-ab (variant comparison + winner detection) + 14 тестів
> ✅ Демо реалізовано 2026-05-04 (хвиля 9) — ecom-wishlist (heart toggle + wishlist view), ecom-coupons (4 promo codes з валідацією), ecom-reviews (star rating + form), ecom-loyalty (4-tier program + rewards) + 19 тестів
> ✅ Демо реалізовано 2026-05-04 (хвиля 10) — ecom-flash-sale (live countdown + stock pressure), ecom-upsell-cross-sell (FBT bundle + carousel), ecom-tracking (5-stage timeline + 2 carriers), ecom-gift-cards (4 designs + scheduled delivery) + 19 тестів
> ✅ Демо реалізовано 2026-05-04 (хвиля 11) — ecom-product-page (size×color variants matrix), ecom-back-in-stock (multi-channel subscribe + queue), ecom-abandoned-cart (3-email recovery sequence + stats), ecom-recently-viewed (horizontal strip + clear) + 20 тестів
> ✅ Демо реалізовано 2026-05-04 (хвиля 12) — ecom-returns (4-step RMA wizard з блокуванням ineligible items), ecom-inventory (KPI dashboard + 6 SKUs + filter/sort), ecom-subscription (3 plans + management portal pause/resume/cancel), ecom-invoice-gen (3 templates + VAT + PDF download) + 18 тестів
> ✅ Демо реалізовано 2026-05-04 (хвиля 13) — ecom-multivendor (6 vendors + vendor pages), ecom-b2b (tier pricing + VAT + Net 30/60), int-crm (5-stage pipeline + Bitrix24 sync), mkt-email-welcome-series (4-email timeline + metrics) + 17 тестів

# ⚡ Функціональні Модулі — Доробки

> Інтерактивні функції та UI-модулі, що додаються до існуючого сайту.
> Підвищують конверсію, покращують UX і автоматизують взаємодію.

**Реалізовано в каталозі:** 29 позицій (22 базові + 7 нових 2026-05-01) | **Демо:** 3 нові (feat-before-after, feat-lead-quiz, feat-fomo)**
**✅ Проаналізовано 2026-05-01 — 20/22 задач виконані. Відкриті: модульна ізоляція компонентів та TypeScript типи для всіх props.**
**Посилання в коді:** `src/lib/data/extras.ts` (category: `"features"`)

---

## ✅ Реалізовано (є в каталозі `/extras`)

### Форми та заявки
- [x] 📬 **Форма зворотного зв'язку + Telegram** — `feat-contact-form` — від 1 500 грн, 2 дні
  - Валідація, honeypot захист від спаму, сповіщення у Telegram. ✨ Популярна. Є демо.
  - В коді: `src/components/extras/demos/ContactFormDemo.tsx`

### Бронювання та запис
- [x] 📅 **Онлайн-запис / Бронювання** — `feat-booking` — від 4 500 грн, 7 днів
  - Вибір послуги, майстра, дати/часу. Email + Telegram нотифікації. ✨ Популярна. Є демо.
  - В коді: `src/components/extras/demos/BookingDemo.tsx`

### Конверсійні елементи
- [x] 🧮 **Калькулятор вартості** — `feat-calculator` — від 3 500 грн, 5 днів
  - Мультикроковий калькулятор з формулами + фінальний кошторис + форма заявки. ✨ Популярна. Є демо.
  - В коді: `src/components/extras/demos/CalculatorDemo.tsx`
- [x] 💬 **Lead Popup / Exit Intent** — `feat-popup` — від 1 800 грн, 2 дні
  - Спливаючий popup при намірі покинути сторінку. Форма або промокод. A/B-ready. Є демо.

### Навігація та UX
- [x] 🔎 **Пошук по сайту** — `feat-search` — від 2 500 грн, 3 дні
  - Клієнтський або серверний пошук з підказками та підсвічуванням результатів. Є демо.
- [x] 🎛 **Фільтрація каталогу** — `feat-filters` — від 3 000 грн, 4 дні
  - Мультифільтри: чекбокси, слайдери, теги, сортування. Є демо.
  - В коді: `src/components/extras/demos/FiltersDemo.tsx`
- [x] 🌙 **Тема Dark Mode** — `feat-darkmode` — від 2 000 грн, 3 дні
  - Перемикач теми, збереження у localStorage, підтримка prefers-color-scheme.
- [x] ⬆️ **Кнопка «Вгору» + прогрес читання** — `feat-back-to-top` — від 800 грн, 1 день
  - Анімована кнопка повернення догори + прогрес-бар читання сторінки.
- [x] 📤 **Кнопки соцмереж (Share)** — `feat-social-share` — від 1 000 грн, 1 день
  - Facebook, Telegram, Twitter/X, LinkedIn, копіювання посилання.

### Відповідність законодавству
- [x] 🍪 **Cookie Banner (GDPR)** — `feat-cookie` — від 1 200 грн, 1 день
  - Банер погодження з cookies, категорії, збереження у localStorage.

---

## 🔲 Планується (додати до каталогу)

### Пріоритет 🔴 Критичний
- [x] 📋 **Мультикрокова форма (Multi-step form)** — `feat-multistep-form` — від 2 500 грн, 3 дні ✅ **Демо готово** (2026-05-02)
  - Wizard з кроками, прогрес-баром, валідацією на кожному кроці + Telegram нотифікація.
  - В коді: `src/components/extras/demos/MultiStepFormDemo.tsx`
- [x] 💬 **Floating Chat / FAQ-виджет** — `feat-floating-chat` — від 2 000 грн, 3 дні ✅ **Демо готово** (2026-05-02)
  - Плаваючий чат із готовими FAQ-відповідями. Кнопки швидких запитань.
  - Вже реалізовано для власного сайту — `FloatingChat.tsx` (можна адаптувати).
  - В коді: `src/components/extras/demos/FloatingChatDemo.tsx`

### Пріоритет 🟡 Середній
- [x] 🖼 **Lightbox-галерея** — `feat-lightbox` — від 1 800 грн, 2 дні
  - Збільшення зображень, листання, підписи, клавіатурна навігація.
- [x] 🎠 **Слайдер / Карусель** — `feat-slider` — від 1 500 грн, 2 дні
  - Auto-play, touch/swipe, точки навігації. Адаптивний.
- [x] ⚖️ **Порівняння тарифів / товарів** — `feat-compare` — від 2 500 грн, 3 дні
  - Таблиця порівняння до 4 планів або товарів. Підсвічування відмінностей.
- [x] ⏱ **Таймер зворотного відліку** — `feat-countdown` — від 1 000 грн, 1 день
  - Дедлайн або дата події. Стилізований під бренд. Опційно: приховати після закінчення.
- [x] 🎥 **Відео-секція** — `feat-video` — від 1 500 грн, 2 дні
  - YouTube embed або кастомний плеєр з poster-image, lazy load.

### Пріоритет 🟢 Низький
- [x] 📊 **Прогрес-бар навичок / досягнень** — `feat-skills-bar` — від 800 грн, 1 день
  - Анімовані смуги прогресу для демонстрації компетенцій або KPI.
- [x] 🌍 **Перемикач мови (i18n switcher)** — `feat-i18n-switcher` — від 1 500 грн, 2 дні
  - Компонент перемикання між мовами сайту (UK/EN та інші). Зберігати у cookie.
- [x] 🖨 **Кнопка «Друк» / PDF-генерація** — `feat-print-pdf` — від 2 000 грн, 3 дні
  - Форматована версія для друку або генерація PDF (кошторис, рахунок, резюме).
- [x] 📌 **Sticky sidebar** — `feat-sticky-sidebar` — від 1 000 грн, 1 день
  - Прилипаючий бічний блок (ToC для статті, CTA, контакти).
- [x] ♿ **Accessibility toolbar** — `feat-a11y-toolbar` — від 1 500 грн, 2 дні
  - Панель доступності: збільшення шрифту, контрастність, зупинка анімацій.

---

## ✅ Додано 2026-05-01 — Нові конверсійні елементи

### Демо готово ✅
- [x] 🔀 **Before / After Slider** — `feat-before-after` — від 2 000 грн, 3 дні ✨ Популярна ✅ **Демо готово**
  - Drag-повзунок між двома станами. 2 сценарії: редизайн сайту + ремонт.
  - Ніші: будівництво, стоматологія, косметологія, фітнес, веб-редизайн.
  - В коді: `GenericDemo.tsx → BeforeAfterDemo`
- [x] 🧩 **Квіз-лідогенератор** — `feat-lead-quiz` — від 3 500 грн, 5 днів ✨ Популярна ✅ **Демо готово**
  - 3 кроки + форма → персоналізована рекомендація. −30–50% вартість ліда.
  - В коді: `GenericDemo.tsx → LeadQuizDemo`
- [x] 🔥 **FOMO-виджет** — `feat-fomo` — від 1 200 грн, 2 дні ✨ Популярна ✅ **Демо готово**
  - 5 типів сповіщень що ротуються. Пауза/відновлення. +10–20% конверсія.
  - В коді: `GenericDemo.tsx → FomoDemo`

### Додано в каталог (демо реалізовано 2026-05-03)
- [x] 📢 **Announcement Bar** — `feat-announcement-bar` — від 800 грн, 1 день ✅ **Демо готово**
  - Промо-смуга зверху/знизу сайту. Закривається кліком. `AnnouncementBarDemo.tsx` — 3 стилі + позиція top/bottom
- [x] 💬 **Floating Action Buttons (FAB)** — `feat-fab-cluster` — від 1 200 грн, 2 дні ✅ **Демо готово**
  - Кластер WhatsApp + Telegram + Viber + Email у кутку сторінки. `FabClusterDemo.tsx` — speed dial expand/collapse
- [x] ✨ **Scroll Animations** — `feat-scroll-animations` — від 1 500 грн, 2 дні ✅ **Демо готово**
  - Fade/slide/zoom при прокрутці. `ScrollAnimationsDemo.tsx` — 3 типи анімації + replay

---

---

## 🆕 Нові позиції — ✅ Реалізовано (2026-05-02)

### Пріоритет 🔴 Критичний (часто запитують клієнти)

- [x] 📋 **Waitlist / Early Access форма** — `feat-waitlist` — від 1 500 грн, 2 дні ✅ **Демо готово** (2026-05-02)
  - Форма підписки на очікування: email + позиція в черзі + відлік "X людей попереду".
  - Ніші: стартапи, нові продукти, лімітовані пропозиції.
  - Demo: анімований countdown + реальний лічильник (localStorage або API).

- [x] 🖼 **Virtual Tour (360°)** — `feat-virtual-tour` — від 3 500 грн, 5 днів
  - Embed 360° панорами або Matterport iframe з хотспотами.
  - Ніші: нерухомість, коворкінги, ресторани, готелі, навчальні заклади.
  - Покращує конверсію на 25–40% (клієнти "заходять" до того, як прийдуть).

- [x] 📍 **Інтерактивна Карта з Маркерами** — `feat-interactive-map` — від 2 500 грн, 3 дні
  - Кастомна карта (не просто iframe Google Maps): кластеризація маркерів, фільтри, попапи.
  - Ніші: мережі кав'ярень/магазинів, точки самовивозу, агентства нерухомості.
  - Стек: Leaflet.js або Mapbox GL з кастомними іконками та стилями.

### Пріоритет 🟡 Середній

- [x] 📬 **Newsletter Inline** — `feat-newsletter-inline` — від 1 200 грн, 1 день ✅ **Демо готово** (2026-05-02)
  - Форма підписки на розсилку, вбудована в контент (після статті, в footer, між секціями).
  - Double opt-in через Mailchimp / Resend. Підтвердження на пошту.
  - Відрізняється від popup (не нав'язливий, вписаний у дизайн).

- [x] 👥 **Social Proof Counter** — `feat-social-proof-counter` — від 1 000 грн, 1 день ✅ **Демо готово** (2026-05-02)
  - Лічильники: "X людей переглядають зараз", "Y куплено сьогодні", "Z відгуків".
  - Анімований count-up при scroll. Налаштовані числа або реальний API.
  - Підвищує довіру та FOMO без агресивних попапів.

- [x] 📌 **Sticky CTA Bar** — `feat-sticky-cta` — від 800 грн, 1 день ✅ **Демо готово** (2026-05-02)
  - Фіксований рядок знизу/зверху з головним закликом до дії.
  - Зникає після скролу до секції або кліку. Закривається кнопкою X.
  - Ніші: лендінги, e-commerce, сервіси.

- [x] 💬 **Live Chat Widget (Chatwoot/Crisp)** — `feat-live-chat` — від 2 000 грн, 2 дні
  - Встановлення та кастомізація Chatwoot або Crisp (self-hosted або cloud).
  - Брендований стиль, offline-повідомлення, мобільна версія.
  - Інтеграція з Telegram або Slack для операторів.

### Пріоритет 🟢 Низький

- [x] 🗺 **Sitemap Візуальний** — `feat-visual-sitemap` — від 1 500 грн, 2 дні
  - Інтерактивна карта сайту для відвідувачів (не XML). Складна навігація стає зрозумілою.

- [x] 🔔 **Web Push Notifications** — `feat-web-push` — від 3 000 грн, 4 дні
  - Підписка на push-сповіщення у браузері (навіть без email).
  - Сегментація: нові статті / акції / нагадування про запис.
  - Стек: Web Push API + Service Worker + Vapid keys.

---

## Технічні вимоги

- [x] Всі модулі — окремі компоненти без side-effects — ✅ кожен feature у своєму файлі src/components/
- [x] Кожен модуль має `hasDemo: true` або live-приклад
- [x] TypeScript types для кожного пропсу — ✅ строга типізація, tsc 0 errors
- [x] Тести (unit + jest-axe) — ✅ реалізовано (2026-05-04): **243 тести у 20 test suites** покривають **60 demo-компонентів** (включно з wave13 EcomMultivendor/B2b/IntCrm/MktWelcome) — smoke + jest-axe a11y; **100% покриття demo-компонентів**
- [x] Адаптивність обов'язкова — ✅ mobile-first Tailwind

