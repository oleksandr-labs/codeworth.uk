# Portfolio — ERP Systems: новий фільтр + кейси + інтерактивні демо

**Статус:** ✅ Оновлено 2026-06-03 — **7 кейсів** (+ FleetDesk) + AgencyDesk Finance/Team tabs + ROI calc + POS feed
**Пріоритет:** 🔴 Високий (UK ринок активно купує ERP для SMB)
**Файли:**
- `src/lib/data/portfolio.ts` — **7 проєктів** з `category: "ERP System"` ✅ (erp-logistics/FleetDesk 2026-06-03)
- `src/components/portfolio/PortfolioContent.tsx` — фільтр динамічний ✅
- `src/components/portfolio/demos/*.tsx` — **7 інтерактивних демо** ✅ (FleetDeskDemo 2026-06-03)
- `src/app/[lang]/portfolio/[slug]/demo/page.tsx` — DEMOS map ✅
- `src/components/erp/ERPRoiCalculator.tsx` — ROI-калькулятор ✅ 2026-06-03
- `src/app/[lang]/erp-development/page.tsx` — ROI calc між MODULES і CASES ✅ 2026-06-03

### AgencyDesk — оновлення 2026-06-03
- ✅ **4 вкладки** замість toggle: Board | Finance | Team | Client Portal
- ✅ **Finance tab**: KPI row (виставлено/невиставлено/годин/avg rate) + таблиця проєктів з "Generate Invoice" кнопкою
- ✅ **Team tab**: 5 членів команди з utilization bars + ставками + поточним завданням; JB overloaded (42h/40h) з алертом
- ✅ **Більше даних**: 5 клієнтів / 13 карток на дошці; підзадачі інтерактивні (клікабельні)
- ✅ **Client Portal**: 2 інвойси (Paid + Pay now кнопка), всі deliverables з download

### FleetDesk (erp-logistics) — 2026-06-03
- ✅ Fleet tab: 12 тягачів, статуси, WTD hours bars (червоний при ≥8h)
- ✅ Orders tab: таблиця замовлень з SLA traffic lights (червоний пульсує) + assign truck
- ✅ Warehouse tab: pick queue, Claim/Done дії, пріоритет-badge

---

## ✅ Зроблено (2026-06-02)

### Кейси портфоліо (5)
`erp-wholesale` (WholesaleHub), `erp-restaurant-chain` (ChainOps), `erp-construction` (BuildTrack), `erp-retail-chain` (RetailCore), `erp-agency` (AgencyDesk). Кожен має: EN+UK опис, `caseStudy`+`caseStudyEn` (challenge/solution/results), `priceFrom` (£1999–£5999), `deliveryDays`, `packageIncludes`.

### Фільтр
Категорія **"ERP System"** додана в `CATEGORIES` + з'являється автоматично з даних. EN/UK без проблем.

### 5 інтерактивних демо — навмисно РІЗНІ за структурою
| Демо | Layout-патерн | Ключові блоки | Тема |
|---|---|---|---|
| WholesaleHub | Лівий icon-rail sidebar + щільні mono-таблиці + статусбар | Stock пошук, Orders feed, Invoice PDF | Темний термінал `#0f1117`, sky |
| ChainOps | 3 колонки + **5 вкладок** (Overview/Inventory/Rota/Waste/POS Feed) + Group view | P&L, alerts, stock+transfer, rota, waste log, live POS feed з авто-деплецією | Темний neutral, оранж |
| BuildTrack | Gantt-таймлайн як hero, single-scroll | Програма по місяцях, CIS картки, cost-барі | Stone/amber, hero-банер |
| RetailCore | Аналітична BI, chart-first, СВІТЛА | Bar chart 7д, donut, store heatmap, markdown-стрічка | Світла violet + градієнт |
| AgencyDesk | Повноекранний kanban + floating таймер | 4 колонки (drag-стрілки), живий таймер, бюджет-барі | Світла, teal |

**Принцип:** різні layout (sidebar/3-col/timeline/dashboard/board), різні теми (3 темні відтінки + 2 світлі), різне наповнення — щоб виглядали як окремі продукти, не шаблони.

---

## Що ще можна покращити

### Контент і реалізм демо
- ✅ **WholesaleHub:** наповнено Suppliers (таблиця: лід-тайм, рейтинг, open PO, auto-reorder) + Reports (KPI-рядок, bar-chart виручки 12м, топ SKU) — `2026-06-02`
- ✅ **WholesaleHub:** B2B-портал клієнта — окремий nav-пункт 🛒, вигляд замовника (BuildRight Ltd): каталог 24/7, кошик з +/−, VAT-розрахунок, «Розмістити замовлення» → стан «Order placed · ORD-1842» — `2026-06-02`
- ✅ **WholesaleHub:** major upgrade `2026-06-03` — **Dashboard** (Home tab: 4 KPI cards з today revenue/orders/alerts/clients, activity feed, low-stock panel, today's orders quick-nav); **Order Detail** (click order → full line items + fulfilment timeline progress); **Warehouse filter** у Stock (All / W1 / W2 / W3); **Notifications bell** (dropdown: 4 сповіщення LOW/OUT/payment); **Create PO confirm flow** у Suppliers (двокроковий: кнопка → Confirm?/Yes/No → ✓ PO sent); **Reports** доповнено Top Clients таблицею + progress bars для SKU; **Invoice** додано "Send to client" + статус "Awaiting payment"
- ✅ **WholesaleHub:** **Purchases (PO) tab** `2026-06-03` — список 5 purchase orders (Draft/Sent/Confirmed/In Transit/Received), статус-бейджі, auto vs manual маркер, клік → PO detail з timeline прогресом + line items + stock delta при отриманні; кнопка "Mark received" (лише для In Transit) → оновлює статус PO + stockLevels в реальному часі, підтвердження з CheckCircle2
- ✅ **WholesaleHub:** **Transfers tab** `2026-06-03` — форма переміщення (From/To warehouse select, SKU dropdown, qty input), валідація (склади різні, кількість > 0 і ≤ available), live stock preview для обраного SKU, підтвердження з transfer log entry; audit log з ID/SKU/qty/маршрут/timestamp
- ✅ **ChainOps:** інтерактивна рота — сітка персонал×дні, клік перемикає зміну (8 год), live-підрахунок годин на людину + понаднормові (>40h), покриття змін по днях, тижневий тотал. Стару декоративну роту з COL3 прибрано — `2026-06-02`
- ✅ **ChainOps:** масштабний рефактор `2026-06-03` — **5 вкладок**: Overview (P&L + метрики + inline venue alerts), Inventory (stock bars + supplier info + Generate PO + Inter-Venue Transfer modal), Rota (існуючий функціонал), Waste Log (кнопки по категоріях → live журнал → CSS bars + вартість), POS Feed (useEffect 4s: авто-замовлення з меню, live revenue counter, авто-деплеція інвентарю); **Group View** (кнопка "Group ▾" у хедері → таблиця всіх 8 venues з Revenue/Food Cost/Waste/P&L, клік → drill-down на точку)
- ✅ **BuildTrack:** клік по Gantt-бару → modal з прогресом, чеклістом фаз і Document Vault (документи з типами + статус) — `2026-06-02`
- ✅ **BuildTrack:** Document Vault повернуто (всередині modal проєкту) — `2026-06-02`
- ✅ **BuildTrack:** Milestone Billing section — таблиця по всіх проєктах: етап, контракт, утримання, строк, статус; підсумки Outstanding + Retention у хедері — `2026-06-03`
- ✅ **BuildTrack:** Variation Orders (VO) tracker — 6 VO з описом, проєктом, датою, сумою, статусом (approved/pending/rejected); підсумки approved/pending/total — `2026-06-03`
- ✅ **BuildTrack:** Risk Register — 4 ризики з RAG-статусом, impact/likelihood, власником та заходами, легенда RAG — `2026-06-03`
- ✅ **BuildTrack:** Modal модернізовано: 2 таби «Progress» + «Billing», у Billing — повний milestone schedule + статус-підказки (outstanding/upcoming), у Progress — linked VOs для проєкту, іконки CheckCircle2/Clock — `2026-06-03`
- ✅ **BuildTrack:** Лічильник у hero-банері доповнено VOs approved; CIS розширено до 6 субпідрядників — `2026-06-03`
- ✅ **RetailCore:** інтерактивний markdown — слайдер % зі змінною маржею, вивільненим капіталом і втратою маржі в реальному часі + перемикач SKU — `2026-06-02`
- ✅ **RetailCore:** повний рефактор у справжній ERP-додаток — `2026-06-03`: ліва sidebar-навігація (5 модулів), sticky top-bar з live-статусом; **Dashboard** (KPI cards + 7d bar + category donut + store heatmap + CTA-банер переміщень); **Stock** (таблиця 8 SKU × 7 локацій з color-coded badge: out/low/overstock + summary cards); **Transfers** (5 auto-suggested переміщень з approve/skip + session summary + підрахунок £ saved); **Buying** (season plan vs actual table з sell-through progress bars + markdown engine); **Reports** (revenue horizontal bars + below-avg stores + summary cards з cross-tab посиланнями)
- ✅ **AgencyDesk:** клік на картку → drawer з підзадачами (прогрес), командою, коментарями, бюджетом + кнопка «Трекати задачу» — `2026-06-02`
- ✅ **AgencyDesk:** перемикач «Team board / Client view» у хедері. Клієнтський портал (Caledonian Hotels): прогрес 90%, deliverables зі завантаженням, блок «Потрібне затвердження» (Approve / Request changes), рахунки. Таймер ховається у client-вигляді — `2026-06-02`

### UX і навігація
- ✅ Спільний `DemoBanner` (floating, bottom-left): «← До кейсу» + CTA «Замовити подібну систему», згортається. Підключено в `demo/page.tsx` → працює для ВСІХ демо, не лише ERP — `2026-06-02`
- 🟡 Адаптив під мобільні: **ChainOps** зроблено (бічні колонки ховаються, горизонтальний селектор точок, KPI стискаються) `2026-06-02`; WholesaleHub таблиці скролять горизонтально (ОК); ⬜ лишилось — детальний аудит решти демо на телефоні
- ✅ Кнопка «Live Demo» на сторінці ERP-кейсів: 5 slug додано в `DEDICATED_DEMOS` у `portfolio/[slug]/page.tsx` → блок «Open Demo» + превʼю тепер показується — `2026-06-02`
- ✅ **Portfolio ERP pricing fix** `2026-06-03` — для кейсів з `packageIncludes` (всі ERP) замість generic Basic/Standard/Premium £499-£1999 тепер показується реальний список "Що входить до проєкту" + ціна £priceFrom + дедлайн + CTA "Discuss Your Project" та "All ERP Solutions → /erp-development"; виправлено pre-existing CSS-конфлікти dark: в portfolio page

### SEO та маркетинг
- ✅ **Нішева сторінка ERP-розробки** `/erp-development` — зроблено standalone (EN-primary), 5 кейсів-карток з lucide-іконками, pain points, процес, ціни, hreflang, лінки в Footer — `2026-06-02`
- ⬜ ~~(стара нотатка про SERVICES_DATA)~~
  - ⚠️ **i18n-застереження (виявлено 2026-06-02):** `src/lib/data/services.ts` + `services/[slug]/page.tsx` — **UA-first**: контент (title/description/features/faq) однамовний український, перекладається лише chrome (`isUk ? ... : ...`). Додавання ERP у SERVICES_DATA → на EN-домені рендерить **український** контент. Неприйнятно для EN-primary ринку.
  - ✅ **Рішення:** окрема standalone-сторінка з власним двомовним контентом (EN-primary + UK), за патерном чистих сторінок (як `/about`, `/contact`), а не через services-движок.
  - **Структура сторінки:** Hero (EN: "Custom ERP Development for UK Business") → проблема Excel/розрізнені системи → 5 кейсів-карток (лінк на `/portfolio/erp-*` + Live Demo) → процес (discovery → build → deploy) → стек (Next.js/Postgres/Prisma) → ціни (£1999–£5999+) → FAQ → CTA. Hreflang EN/UK.
  - **Лінкування:** додати в Header/Footer (Services dropdown), і з 5 ERP-кейсів зворотній лінк на цю сторінку.
- ✅ Use case: «How a Birmingham wholesaler cut order time 72% with custom ERP» — `useCases.ts` slug `erp-wholesale-order-time`, категорія `erp` (2026-06-03)
- ✅ Blog: «Custom ERP for UK SMB — cost, timeline, what to expect» — `blog.ts` slug `custom-erp-uk-cost-timeline`, 6 секцій EN+UK + FAQ (2026-06-03)
- ✅ Лінки з `/erp-development` → use case + blog post (секція "Further reading", 2026-06-03)
- ⬜ Schema.org `SoftwareApplication` для демо-сторінок (зараз `robots: noindex` — вирішити: індексувати демо чи ні)
- ⬜ OG-зображення для ERP-кейсів (зараз generic)

### WholesaleHub — наступні покращення
- ⬜ **Customer tab** — список B2B-клієнтів з кредитними лімітами, балансом, last order, статусом (Active/Overdue), клік → client card з order history
- ⬜ **Dashboard sparklines** — мініграфіки на KPI-карточках (tiny 7d trend замість плоского числа)
- ⬜ **Stock alerts → navigate** — клік на alert у dashboard → переходить у Stock з вже відфільтрованим конкретним SKU
- ⬜ **Purchases: Create PO form** — повноцінна форма (вибір постачальника → додати рядки SKU/qty → preview total → Submit)
- ⬜ **Mobile audit** — таблиці Stock/Orders/Suppliers горизонтально скролять, але Transfers форма і PO detail потребують перевірки на 375px

### Технічне
- ⬜ Винести спільні дрібні UI-патерни демо (status-badge, progress-bar) у `demos/_shared.tsx` — без шкоди унікальності layout
- ⬜ Перевірити dark/light перемикання на світлих демо (RetailCore, AgencyDesk) — вони мають власні теми, не залежні від глобального toggle; уточнити чи це бажано
- ⬜ Маркетплейс: чи робити ERP-шаблони товаром у `/marketplace` (наразі ні)

### Розширення лінійки
- ✅ 6-й кейс: `erp-clinic` — CareHub ERP для мережі приватних клінік (4 точки, Брістоль): централізований розклад, NHS + private billing, GDPR audit, медичні запаси, rota з кваліфікаціями — `2026-06-03`
  - **Demo layout:** calendar-first (week view), light healthcare theme (sky-600), tabs: Calendar | Patients | Billing | Stock
  - **Ціна:** £5,999 · 90 днів
- ✅ 7-й кейс: `erp-logistics` — FleetDesk TMS/WMS — реалізовано 2026-06-03

## erp-logistics — FleetDesk (повна специфікація, 2026-06-03)

**Статус:** ✅ Кейс + демо реалізовано (2026-06-03)

- **Slug:** `erp-logistics`
- **Назва EN:** FleetDesk — Transport & Warehouse ERP
- **Клієнт:** Регіональний перевізник (38 тягачів, 2 склади), Лестер, UK
- **Категорія:** ERP System | **Ніша:** Logistics | **Рік:** 2026 | **Ціна:** £6 999
- **Стек:** Next.js, TypeScript, PostgreSQL, Prisma, Tailwind CSS
- **Колір:** `from-orange-600 to-amber-900` | **Emoji:** 🚛
- **Складність:** complex | **deliveryDays:** 90

**Challenge:** A Leicester-based haulier with 38 trucks and 2 warehouses planned routes on whiteboards, tracked driver hours in Excel, and had no WMS — lost pallets and missed SLAs were recurring problems.

**Solution:** Custom TMS/WMS: route planning with postcode-optimised dispatching, live fleet status board (moving/loading/stopped), SLA-aware order table with traffic-light alerts, warehouse pick queue with task assignment, driver compliance hours tracker.

**Results:**
- SLA miss rate −74%
- Empty miles −22%
- Driver overtime claims −38%
- Warehouse pick accuracy 99.4%
- Customer portal deflected 60% of inbound status calls

**Демо (FleetDeskDemo.tsx):**
3 вкладки: Fleet (38 trucks grid із статусами + summary KPIs), Orders (dispatch table із SLA traffic lights + клік → деталь), Warehouse (pick queue з assignment + progress bar). Тема: dark amber `#1c1108` + amber-500, відчуття диспетчерського центру.

### Conversion tools
- ✅ **ERP ROI Calculator** (`src/components/erp/ERPRoiCalculator.tsx`) — client component, додати в `/erp-development` між MODULES і CASES. Inputs: staff count, admin hours/week, avg hourly cost, number of locations. Output: annual admin cost, estimated saving (70%), payback period — `2026-06-03`
- ⬜ **"Book a discovery call"** — форма з pre-qualification питаннями (locations, current system, budget, timeline)

### ChainOps demo — доповнення
- ✅ **Live POS orders feed** — вкладка "POS Feed" в Overview: симуляція замовлень що надходять (table number, items, £amount), авто-оновлення кожні 4s, запаси автоматично зменшуються при нових замовленнях — `2026-06-03`

---

## Контекст

Поточні категорії в портфоліо: **Лендінг (80), Корпоративний сайт (67), E-commerce (33), AI/ML (32), Портал (14)**.

**ERP System** — нова категорія для UK ринку. В Британії малий та середній бізнес масово переходить на власні ERP/CRM/WMS замість Excel. Висока LTV клієнта, великі бюджети (£1999–£9999+).

---

## ⬜ Завдання 1 — Додати категорію в фільтри

**Файл:** `src/components/portfolio/PortfolioContent.tsx`

Фільтри вже динамічні — `PROJECT_CATEGORIES` будується з даних:
```ts
const PROJECT_CATEGORIES = Array.from(new Set(PROJECTS.map((p) => p.category)));
```

**Дія:** додати проєкти з `category: "ERP System"` в `portfolio.ts` → фільтр з'явиться автоматично.

Опційно: додати EN-переклад категорії в мепі якщо він є:
- `"ERP System"` → EN: `"ERP System"`, UK: `"ERP-система"`

---

## ⬜ Завдання 2 — Додати 5 ERP кейсів в portfolio.ts

### Кейс 1: `erp-wholesale` — WholesaleHub
- **Назва:** WholesaleHub — ERP для оптовика
- **Назва EN:** WholesaleHub — Wholesale ERP
- **Клієнт:** Оптова компанія (будматеріали), Бірмінгем, UK
- **Категорія:** ERP System
- **Ніша:** Логістика / B2B
- **Рік:** 2025
- **Складність:** complex
- **Теги:** ERP, Warehouse, B2B Orders, Invoicing, Stock Management, UK
- **Стек:** Next.js, TypeScript, PostgreSQL, Prisma, Tailwind CSS
- **Колір:** `from-slate-700 to-slate-900`
- **Emoji:** 🏭
- **Опис UK:** ERP-система для оптовика: управління складом (500+ SKU), автоматичне замовлення постачальникам, B2B-портал для клієнтів, виставлення рахунків (PDF), звіти залишків.
- **Опис EN:** ERP for a UK wholesale distributor: warehouse management (500+ SKUs), automated reordering, B2B client portal, PDF invoicing, stock level reports and low-stock alerts.
- **Результат UK:** Час обробки замовлення скорочено з 25 до 7 хв. Помилки залишків −91%.
- **Результат EN:** Order processing cut from 25 to 7 minutes. Stock discrepancies reduced by 91%.
- **Деталі кейсу:**
  - Challenge EN: A Birmingham wholesale distributor managed 500+ SKUs across 3 warehouses via spreadsheets — overselling, lost orders, and manual invoicing consumed 3 FTE daily
  - Solution EN: Custom ERP with real-time stock sync across warehouses, automated purchase orders when stock hits reorder point, B2B portal for trade customers to place orders 24/7, automatic PDF invoice generation, and live dashboard for sales/stock KPIs
  - Results EN: Order processing time 25 min → 7 min, stock errors −91%, 3 FTE redirected to sales, ROI in 4 months
- **Ціна:** £3999

---

### Кейс 2: `erp-restaurant-chain` — ChainOps
- **Назва:** ChainOps — ERP для мережі ресторанів
- **Назва EN:** ChainOps — Restaurant Chain ERP
- **Клієнт:** Мережа з 8 ресторанів, Манчестер, UK
- **Категорія:** ERP System
- **Ніша:** Ресторани / Hospitality
- **Рік:** 2025
- **Складність:** complex
- **Теги:** ERP, Restaurant, Inventory, Staff Scheduling, Reporting, UK
- **Стек:** Next.js, TypeScript, PostgreSQL, Prisma, Tailwind CSS
- **Колір:** `from-orange-700 to-red-900`
- **Emoji:** 🍽️
- **Опис UK:** ERP для мережі ресторанів: єдина система управління запасами по всіх точках, розклад персоналу, контроль списань, P&L по кожному ресторану в реальному часі.
- **Опис EN:** ERP for an 8-venue restaurant chain: centralised inventory across all sites, staff scheduling with rota builder, waste tracking, and live P&L per venue with consolidated group reporting.
- **Результат UK:** Food waste −34%. Час складання розкладу персоналу з 4 год до 30 хв на тиждень.
- **Результат EN:** Food waste reduced by 34%. Staff rota time cut from 4 hours to 30 minutes per week.
- **Деталі кейсу:**
  - Challenge EN: An 8-venue Manchester restaurant group had no unified visibility — each manager kept their own spreadsheets, inter-site stock transfers were ad hoc, and consolidated P&L took the CFO 2 days monthly
  - Solution EN: Centralised ERP with live stock levels across all venues, automatic depletion from sales data (POS integration), drag-and-drop staff rota with contract hour alerts, waste logging by category, and instant group P&L dashboard
  - Results EN: Food cost reduced 34%, rota building 4h → 30min/week, consolidated P&L available in real time
- **Ціна:** £4999

---

### Кейс 3: `erp-construction` — BuildTrack
- **Назва:** BuildTrack — ERP для будівельної компанії
- **Назва EN:** BuildTrack — Construction ERP
- **Клієнт:** Будівельна компанія (житлове будівництво), Лідс, UK
- **Категорія:** ERP System
- **Ніша:** Будівництво
- **Рік:** 2025
- **Складність:** complex
- **Теги:** ERP, Construction, Project Management, Subcontractors, CIS Tax, UK
- **Стек:** Next.js, TypeScript, PostgreSQL, Prisma, Tailwind CSS
- **Колір:** `from-yellow-700 to-amber-900`
- **Emoji:** 🏗️
- **Опис UK:** ERP для будівельника: управління проєктами та кошторисами, субпідрядники та їх платежі, облік CIS (Construction Industry Scheme), документообіг (кресленики, дозволи, сертифікати).
- **Опис EN:** Construction ERP: project and estimate management, subcontractor payments with CIS tax deductions, document hub (drawings, permits, certificates), and milestone billing with client approval portal.
- **Результат UK:** Прострочень по проєктах −58%. CIS розрахунки — з 2 днів до 15 хв.
- **Результат EN:** Project overruns reduced by 58%. CIS calculations cut from 2 days to 15 minutes.
- **Деталі кейсу:**
  - Challenge EN: A Leeds housebuilder managed 12 simultaneous projects in Excel — CIS tax deductions were calculated manually, subcontractor disputes over payments were common, and document version control was non-existent
  - Solution EN: Custom ERP with project timeline view (Gantt-style), automated CIS deduction calculation per subcontractor, document vault with version control and client-facing approval portal, milestone billing with automated client reminders
  - Results EN: Project overruns −58%, CIS processing 2 days → 15 min, zero payment disputes in 6 months post-launch
- **Ціна:** £5999

---

### Кейс 4: `erp-retail-chain` — RetailCore
- **Назва:** RetailCore — ERP для роздрібної мережі
- **Назва EN:** RetailCore — Retail Chain ERP
- **Клієнт:** Мережа з 12 магазинів (одяг), Лондон, UK
- **Категорія:** ERP System
- **Ніша:** Рітейл / Fashion
- **Рік:** 2025
- **Складність:** complex
- **Теги:** ERP, Retail, Multi-store, Stock Sync, Buying, Markdown, UK
- **Стек:** Next.js, TypeScript, PostgreSQL, Prisma, Tailwind CSS
- **Колір:** `from-purple-700 to-violet-900`
- **Emoji:** 🛍️
- **Опис UK:** ERP для роздрібної мережі: синхронізація залишків по 12 магазинах та онлайн-магазину, управління закупівлями (байєр), знижки та розпродажі, звіти конверсії по кожній точці.
- **Опис EN:** Retail ERP for a 12-store fashion chain: real-time stock sync across stores and webshop, buying module for season planning, markdown engine for clearance, and per-store conversion and sell-through reporting.
- **Результат UK:** Надлишок запасів −28%. Sell-through rate +19% завдяки централізованому markdown.
- **Результат EN:** Overstock reduced by 28%. Sell-through rate up 19% through centralised markdown management.
- **Деталі кейсу:**
  - Challenge EN: A London fashion retailer with 12 stores and a webshop had no single view of stock — popular sizes sold out online while sitting in stores, buyers had no season-end clearance tool, and inter-store transfers took days to action
  - Solution EN: ERP with live stock view across all locations, automated inter-store transfer suggestions, buyer dashboard for season buys vs. sales tracking, markdown engine with margin simulation, and store-by-store conversion funnel
  - Results EN: Overstock −28%, sell-through +19%, inter-store transfer lead time 3 days → same day, buyer season planning time halved
- **Ціна:** £4499

---

### Кейс 5: `erp-agency` — AgencyDesk
- **Назва:** AgencyDesk — ERP для digital-агенції
- **Назва EN:** AgencyDesk — Digital Agency ERP
- **Клієнт:** Digital-агенція (40 співробітників), Единбург, UK
- **Категорія:** ERP System
- **Ніша:** IT / Digital Agency
- **Рік:** 2026
- **Складність:** medium
- **Теги:** ERP, Agency, Project Tracking, Time Billing, Client Portal, UK
- **Стек:** Next.js, TypeScript, PostgreSQL, Prisma, Tailwind CSS
- **Колір:** `from-cyan-700 to-teal-900`
- **Emoji:** 💼
- **Опис UK:** ERP для агенції: трекінг проєктів та тайм-шитів, автоматичне виставлення рахунків (час × ставка), клієнтський портал (статус проєкту, файли, апруви), KPI команди.
- **Опис EN:** Agency ERP: project tracking with time sheets, automatic invoicing (hours × rate), client portal for project status, file sharing and approvals, and team utilisation and profitability KPIs.
- **Результат UK:** Час на адміністрування знижено з 12% до 3% від робочого часу. Дебіторка −67%.
- **Результат EN:** Admin overhead cut from 12% to 3% of working time. Outstanding invoices reduced by 67%.
- **Деталі кейсу:**
  - Challenge EN: A 40-person Edinburgh digital agency tracked time in spreadsheets, invoiced manually, and had no client portal — clients chased project updates by email, and finance spent 2 days per month on billing
  - Solution EN: Custom agency ERP with project kanban + time tracking per task, automatic invoice generation (hours × agreed rate) with Stripe payment link, client portal showing live project progress, file sharing and approval workflows, plus utilisation and profitability dashboard per employee/project
  - Results EN: Admin time 12% → 3%, invoice-to-payment time 21 days → 7 days, outstanding invoices −67%, client satisfaction score +22 NPS
- **Ціна:** £1999

---

## ⬜ Завдання 3 — Переклади категорії (опційно)

В `PortfolioContent.tsx` якщо є мапа категорій для відображення — додати:
```ts
"ERP System": { en: "ERP System", uk: "ERP-система" }
```

---

## ⬜ Завдання 4 — SEO сторінки для ERP

Після додавання кейсів розглянути:
- Нішева сторінка `/niches/erp-system` або `/services/erp-development`
- Blog пост: "ERP system development for UK SMB — what to expect and how much it costs"
- Use case: "How a Birmingham wholesaler reduced order processing time by 72% with a custom ERP"

---

## Нотатки

- **Бюджет кейсів:** £1999–£5999 — відповідає UK SMB ринку
- **Ключові теги для SEO:** ERP development UK, custom ERP system, bespoke ERP Birmingham/Manchester/London
- **Конкуренти на UK ринку:** Sage, Xero (стандартні), але кастом ERP — окрема ніша
- ERP кейси підкреслюють технічну глибину Codeworth і виправдовують ціни £2000+
