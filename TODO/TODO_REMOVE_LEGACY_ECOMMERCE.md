> ✅ **ВИКОНАНО 2026-07-02 (commit 64b38c9).** Усі пункти нижче реалізовано: 324 файли / ~151k рядків видалено, `tsc --noEmit` чисто, `npm test` 1046/1173 (залишок — pre-existing контент-дрейф, не пов'язаний з цим прибиранням), задеплоєно через GitHub Actions. Файл лишено як історичний reference/чекліст.

# codeworth.uk — Видалення залишків веб-студії/e-commerce (HIGH PRIORITY)

**Контекст:** Sprints 1–66 (`TODO_ML_ADAPTATION.md`) переписали ВЕСЬ контент (blog/glossary/portfolio/compare/niches/reviews/careers/resources) під ML/AI. Але аудит 2026-07-02 показав, що **структурні/функціональні залишки старого бізнесу (CodeNest — веб-студія + маркетплейс шаблонів сайтів) досі живі в коді** — сайт технічно досі наполовину e-commerce-маркетплейс. Це блокер: доки не прибрано, позиціонування "чисто ML-консалтинг" неправдиве на рівні коду, не лише контенту.

**Мета цього файлу:** єдиний punch-list, що саме видалити/переробити, щоб на сайті не лишилось жодної згадки/функціоналу "розробка сайтів", "інтернет-магазин", "веб-студія", "маркетплейс готових рішень", "CodeNest".

---

## 🔴 Критично — жива e-commerce інфраструктура

### 1. `/marketplace/*` + `/admin/marketplace` — повністю живий маркетплейс
- [ ] Видалити `src/app/[lang]/marketplace/` (catalog, product/[slug], cart, checkout, login, account, compare)
- [ ] Видалити `src/app/[lang]/admin/marketplace/`
- [ ] Видалити компоненти: `CatalogClient`, `CartClient`, `CartSummary`, `CheckoutForm`, `LoginForm`, `AccountClient`, `AdminClient`, `MiniCart.tsx`, `AddToCartSection.tsx`, `ComparePanel.tsx` (якщо використовується лише маркетплейсом)
- [ ] Прибрати з `src/app/sitemap.ts`: записи `/marketplace`, `/marketplace/catalog`, `/niches`, генерацію `marketplaceProductPages`
- [ ] Прибрати з `src/app/robots.ts`: `allow` для `/marketplace/`, `/marketplace/catalog`, `/niches/`
- [ ] Прибрати cross-links: `DashboardClient.tsx:142` (`router.replace` на `/marketplace/login`), `DashboardClient.tsx:756` (href на `/marketplace/catalog`)

### 2. `/niches` — зламана жива сторінка (дані порожні, роут лишився)
- [ ] `niches.ts`: `NICHES_DATA = []` (дані вже видалені), але `niches/page.tsx` рендерить title/meta з `NICHES_DATA.length` → **публічний title "Готові рішення для 0+ ніш — Codeworth | від £499"** — видалити роут `/niches` + `/niches/[slug]` повністю
- [ ] Видалити `src/lib/data/niches.ts` (типи під нерухомість/авто/техніку/курси — не ML)
- [ ] Видалити компоненти `src/components/niches/*` (NicheStats, BookingSection, NicheCalculator, PropertyFilter, PricingToggle, BMICalculator, MenuFilter, ProductCatalog, CourseFilter, ScheduleFilter) — якщо не використовуються деінде, перевірити перед видаленням
- [ ] Залишити тільки `/ai/[niche]` і `/ml/[niche]` як єдину "niche" систему

### 3. 148 з 155 portfolio-демо — це вебсайти-конструктори, не ML
- [ ] `src/app/[lang]/portfolio/[slug]/demo/page.tsx:165-320` (`DEMOS` map) — залишити лише 7 ERP/ML демо (`erp-wholesale`, `erp-restaurant-chain`, `erp-construction`, `erp-retail-chain`, `erp-agency`, `erp-clinic`, `erp-logistics`)
- [ ] Видалити решту ~148 файлів у `src/components/portfolio/demos/` (TechStoreDemo, CarBuyDemo, restaurant/beauty/law/vet/tattoo/furniture/yacht тощо)
- [ ] Прибрати відповідні записи з `PROJECTS` у `src/lib/data/portfolio.ts` (3926 рядків) — потрібен ручний прохід: звірити кожен non-ERP slug чи це справжній ML-кейс, чи легасі-шаблон
- [ ] `src/components/extras/demos/EcomMultivendorDemo.tsx` + `src/app/[lang]/extras/demo/[id]/[example]/page.tsx` — перевірити й видалити немл-демо

### 4. CodeNest-брендинг у бекенді (order ID, mock-дані)
- [ ] `src/app/api/order/route.ts:12` — `generateOrderId()` генерує **справжні** ID з префіксом `CN-` (CodeNest) — видаляється разом з роутом `/api/order` (див. п.5), якщо щось лишається — перейменувати префікс
- [ ] `src/app/[lang]/admin/marketplace/AdminClient.tsx:62-91` — mock-замовлення `CN-4821..4825`, українські імена клієнтів, старі ніші ("Ресторан/Кафе", "Салон краси") — видаляється разом з admin/marketplace
- [ ] `src/app/[lang]/marketplace/account/AccountClient.tsx:47-191` — те саме, mock `CN-XXXX`
- [ ] У `TODO_improvements_june_2026.md` рядок 117 — незакритий чекбокс "Перевірити всі g.page/r/codenest посилання" — сама згадка codenest вже прибрана з `src/`, закрити пункт як N/A

### 5. LiqPay + `/api/order` — платіжна система для старого чекауту
- [ ] Видалити `src/app/api/liqpay/create/route.ts` + `src/app/api/liqpay/callback/route.ts` (український платіжний шлюз LiqPay/PrivatBank)
- [ ] Видалити `src/app/api/order/route.ts` (Telegram-сповіщення "🛒 Нове замовлення через маркетплейс Codeworth!", ціни в грн)
- [ ] Перевірити: чи `/api/contact` та `/api/apply` — єдині канали лідогенерації для ML-консалтингу (мають існувати й лишитись); переконатись що жоден ML-CTA не постить на `/api/order`
- [ ] `extras-demos.ts` запис `store-liqpay` — видалити разом з LiqPay

---

## 🟡 Середній пріоритет — сироти / потребують верифікації

### 6. `WebsiteCostCalculator.tsx` — не використовується (dead code), але лишає ризик
- [ ] Видалити `src/components/tools/WebsiteCostCalculator.tsx` (0 імпортів, не рендериться на `/tools`, але краще прибрати щоб хтось випадково не підключив)
- [ ] Звірити реєстр інструментів у `src/app/[lang]/tools/page.tsx` — усі мають бути ML-тематичні (Bias Detector, Data Quality Checker, Cost Estimator для ML-проєктів тощо)

### 7. `extras-en.ts` / `extras-demos.ts` — суміш старого й нового
- [ ] `src/lib/data/extras-en.ts` (877 рядків) — легасі EN-рядки для старих веб-блоків (`page-landing`, `page-about`, `page-vacancy` тощо), ключі більше не збігаються з поточними `ai-*`/`ml-*` id — видалити файл (спершу перевірити 0 живих збігів ключів)
- [ ] `src/lib/data/extras-demos.ts` (107 записів) — приблизно 2/3 записів немл (agency-about, law-about, ecommerce-faq, restaurant-contacts, ecommerce-404, beauty-salon-calendar, fashion-store, coffee-mini-shop тощо) — прибрати всі не-ML id, лишити тільки на кшталт `fraud-detection-demo`, `churn-prediction-demo`

### 8. Словники — залишкові рядки старого позиціонування
- [ ] `src/app/[lang]/dictionaries/{en,uk}.json` — `footer.tagline` досі: *"Full-cycle web studio — websites, e-commerce, PWA, SEO, CRM, UI/UX design and a marketplace of ready-made solutions."* / укр. відповідник — видалити/переписати (спершу grep на `dict.nav`, `dictionary.footer`, `.nav.marketplace` по всьому дереву компонентів — не лише Header/Footer, бо словник може передаватись як цілий об'єкт)
- [ ] `nav.marketplace` / `nav.niches` ключі в obou dictionaries — видалити після підтвердження 0 споживачів

---

## ✅ Перевірено й чисто (не чіпати)

- `src/lib/data/services.ts` — лише 7 ML/AI сервісів (`artificial-intelligence`, `machine-learning`, `nlp`, `computer-vision`, `mlops`, `llm-rag`, `predictive-analytics`); CRM/ERP/e-commerce згадуються лише як *цілі інтеграції* ML, не як окремі послуги — ОК
- `Footer.tsx` `SERVICES_UK`/`SERVICES_EN` — тільки ML-сервіси — ОК
- `codenest` / `CodeNest` / `g.page/r/codenest` — 0 збігів у `src/` (окрім бекенд-префіксу `CN-`, див. п.4) — переважно вичищено

---

## 📁 Додатково: застарілий верхньорівневий TODO

`C:\HETZNER\sites\codeworth.uk\TODO\TODO_MAIN.md` (і все дерево `TODO/pages`, `TODO/portfolio`, `TODO/extras` тощо) — це **знімок ДО ML-адаптації** (дата 2026-06-03), досі описує "codenest.com.ua — Веб-студія та Маркетплейс" як актуальний проєкт. Він лежить ПОЗА репо (`sites/codeworth.uk/TODO/`, не `sites/codeworth.uk/codeworth/TODO/`).

- [x] Позначено як deprecated (банер додано у сам файл, 2026-07-02) — не використовувати як джерело істини
- Джерело істини: `codeworth/TODO/TODO_ML_ADAPTATION.md` (лог спринтів) + цей файл

---

**Пріоритет:** робити ПЕРЕД будь-яким подальшим контент-спринтом (blog/glossary розширення тощо) — контент вже ML, але функціонал зраджує позиціонування. SEO-ризик: `/niches` і `/marketplace` індексуються Google як частина ML-консалтингового сайту.
