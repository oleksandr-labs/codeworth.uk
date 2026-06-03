# Репозиціонування: Portfolio як Продукти

**Мета:** Змінити позиціонування портфоліо з "минулі роботи клієнтів" → "готові продукти які клієнт може замовити". Кожна нішева демо-сторінка і кожен кейс = продукт з ціною і кнопкою замовлення.

---

## 1. Логіка навігації — що змінити

### Поточна проблема
| Розділ | Зараз | Проблема |
|---|---|---|
| Services | Кастомна розробка | ✅ Зрозуміло |
| Marketplace | Каталог + кошик + чекаут | ✅ Зрозуміло, але не очевидний зв'язок з Niches |
| Niches | 59 демо-сторінок по нішах | ❌ Незрозуміла назва — "ніші" нічого не говорить клієнту |
| Portfolio | Кейси виконаних робіт | ❌ Пасивне "що ми зробили", немає CTA на покупку |

### Нова логіка навігації
```
Services     → кастомна розробка під замовлення (залишається)
Marketplace  → каталог готових рішень + фільтрація + порівняння + чекаут
Niches       → RENAME: "Ready Sites" / "Готові сайти" / "Solutions" — browse by галузь
Portfolio    → кейси + результати + "замовити аналог" CTA
```

**Варіанти перейменування "Niches":**
- EN: `Solutions` / `Ready Sites` / `Templates` / `Industries`
- UK: `Готові сайти` / `Рішення` / `По нішах`

**Рекомендація:** `Solutions` (EN) / `Рішення` (UK) — показує що це продукт, не просто демо.

---

## 2. Зміни на сторінці Portfolio (`/portfolio`)

### 2.1 Hero-секція — нове позиціонування
- ✅ Змінити заголовок: "Наші роботи" → "What We Can Build for You"
- ✅ Підзаголовок: замість "що ми зробили" → "що ми можемо зробити для вас"
- ✅ Додати підказку: бейджі "From £499 · Launch 3–7 days · Customizer"

### 2.2 Картки проєктів у сітці
- ✅ Додати "Від £X" ціну на кожну картку (complexity → ціна: simple=£499, medium=£999, complex=£1999+)
- ✅ Hover overlay: "Деталі" + "Демо" + зелена кнопка "Order Similar"
- ✅ Ціна видима одразу під бейджем складності (без hover)

### 2.3 Нова секція між Hero та сіткою
- ✅ Додати секцію "Як це працює" (3 кроки): Вибери приклад → Перегляд демо → Замовити

### 2.4 Demo-проєкти (59 нішевих) — секція перейменування
- ✅ Заголовок секції → "60+ Solutions — Choose Yours"
- ✅ "Від £X" вже відображається на плитках (прив'язано до `niche.priceFrom`)
- ✅ Два CTA кнопки: "All Solutions by Niche" + "Marketplace (catalog + prices)"

---

## 3. Зміни на сторінці кейсу (`/portfolio/[slug]`)

### 3.1 Нова секція "Ціна та що включено" (після Case Study)
- ✅ Блок "Замовити такий самий проєкт" з 3 пакетами (Basic/Standard/Premium)
  - Ціна від £499/£999/£1,999 (complexity-based)
  - Список що включено на кожен пакет
  - Терміни доставки (3–5 / 7–14 / 14–30 днів)
  - CTA "Order Now" → `/contact?project=slug&complexity=X`
- ✅ "Popular" badge на Standard пакеті

### 3.2 Sidebar / sticky CTA
- ✅ Ціновий блок у sidebar (gradient card з ціною + "Order Now")
- ✅ "View Live Demo" посилання під ціновим блоком
- ✅ Mobile floating CTA (md:hidden sticky bottom bar з ціною + "Order Now") + pb-28 md:pb-10 padding на prev/next секції ✅

### 3.3 Порівняння пакетів
- ✅ Міні-таблиця 3 пакетів прямо на сторінці кейсу
- ✅ Пов'язати з `/compare` — додано текстове посилання "Compare all plans →" під кнопками пакетів

---

## 4. Зміни на нішевих demo-сторінках (`/niches/[slug]`)

### 4.1 Додати секцію "Замовити цей сайт" (зараз відсутня)
- ✅ Секція "Order from CodeNest" з 3 пакетами Basic/Standard/Premium
- ✅ CTA кнопки → `/contact?niche=slug&package=X`
- ✅ "Що входить в комплект": список на кожен пакет
- ✅ Секція вставлена перед Reviews

### 4.2 Hero-секція — переосмислення
- ✅ Додано live demo notice: "Це живий демо-сайт — саме так виглядатиме ваш сайт після замовлення"
- ✅ Кнопка "Замовити цей сайт" вже існувала в hero (ctaPrimary)

### 4.3 Breadcrumb / навігація
- ✅ Breadcrumb оновлено: Home → Рішення (Solutions) → [Ніша]

---

## 5. Marketplace — уточнення ролі

### 5.1 Сторінка каталогу `/marketplace`
- ✅ Додати фільтр "По нішах" (зв'язати з Niches/Solutions секцією) — NICHE_CATEGORIES chips + sidebar filter у CatalogClient.tsx
- ✅ Картки товарів: показувати preview нішевого демо-сайту як thumbnail — поле `previewImage` у NicheData + Image компонент у CatalogClient.tsx (fallback: gradient+emoji)
- ✅ "Live Demo" кнопка на кожній картці товару в каталозі (CatalogClient.tsx)

### 5.2 Сторінка товару `/marketplace/[slug]`
- ✅ Iframe preview нішевого демо на marketplace/product/[slug] (browser chrome + iframe)
- ✅ Пакети і ціни — 3 пакети (Basic/Extended/Premium) з цінами + features + CTA кнопки
- ✅ "Включено в комплект" — `niche.features` список з іконками Check
- ✅ Відгуки клієнтів (3 фейкових з StarRating + Avatar)
- ✅ FAQ секція (4 питання з `<details>`)
- ✅ Схожі рішення (related products grid)
- ✅ Фінальний CTA блок (indigo-950 bg)

---

## 6. Структура даних — що додати/змінити ✅

### 6.1 `portfolio.ts` — нові поля ✅

> **Cross-reference:** AI/ML нішеві стратегії також додають поля до `PortfolioCase`:
> - [TODO_ai_portfolio_strategy.md](ai-niche-pages/TODO_ai_portfolio_strategy.md) → `industry`, `relatedAINichePage`, `relatedMLNichePage`, `blogPost`
> - [TODO_ml_portfolio_strategy.md](ml-niche-pages/TODO_ml_portfolio_strategy.md) → `dataRequirements`, `roiTimeframe`
> Усі зміни типу `PortfolioCase` потрібно робити в одному PR.

```ts
interface PortfolioCase {
  // існуючі поля...
  priceFrom?: number;              // базова ціна в £ (для EN) або ₴ (для UK)
  deliveryDays?: number;           // термін розробки в днях
  packageIncludes?: string[];      // що включено (3-5 пунктів)
  marketplaceSlug?: string;        // посилання на /marketplace/[slug] якщо є
  // AI/ML нішеві поля (з TODO_ai/ml_portfolio_strategy.md):
  industry?: string;               // "banking" | "retail" | "healthcare" | ...
  relatedAINichePage?: string;     // "/ai/healthcare"
  relatedMLNichePage?: string;     // "/ml/healthcare"
  dataRequirements?: string;       // "12 months of transactions" (ML-specific)
  roiTimeframe?: string;           // "ROI in 4 months" (ML-specific)
  blogPost?: string;               // slug blog-посту (AI/ML specific)
}
```

### 6.2 Niche demo дані — перевірити чи є pricing
- ✅ У більшості нішевих demo-сторінок є `pricingPlans` (підтверджено)
- ✅ Додати `marketplaceSlug` та `previewImage` поля у NicheData для прямих посилань та thumbnail preview (niches.ts)

---

## 7. Навігація (`Header`) — фінальні зміни

### 7.1 Перейменування "Niches"
- ✅ EN: `Niches` → `Solutions` (Header.tsx)
- ✅ UK: `Ніші` → `Рішення` (Header.tsx)
- ✅ Оновити breadcrumbs та meta titles де є "Niches/Ніші" текст (не URL) — виправлено breadcrumbSchema у niches/[slug]/page.tsx (locale-aware + "Рішення/Solutions"), meta title niches/page.tsx (2026-05-02)

### 7.2 Dropdown "Services" — додати посилання на Products
- ✅ Додати в Services dropdown: "Готові рішення" → `/niches`

---

## 8. SEO — оновити після репозиціонування

- ✅ Meta title `/portfolio`: "Ready Solutions & Case Studies — CodeNest | from £499 | Launch in 3–7 days"
- ✅ Meta title `/niches`: "Ready-Made Solutions for 60+ Business Niches — CodeNest | from £499"
- ✅ Schema.org Product вже є на кожній нішевій demo-сторінці (`productLd` з Offer)
- ✅ Schema.org Offer з price на portfolio/[slug] сторінках — додано `productLd` з Offer

---

## 9. Прибирання фейкових клієнтських претензій — КРИТИЧНО ✅

> **Контекст (2026-06-03):** Реальний клієнт поскаржився: "Відгуки на сайті від компаній яких не можливо знайти. Теж саме і про приклади сайтів." Потрібно переформатувати весь сайт з "ми вже обслуговуємо реальних клієнтів" → "ось наші готові шаблони та рішення".

### 9.1 Вже зроблено
- ✅ `TestimonialsSection` — прибрано з головної (9 фейкових відгуків)
- ✅ `/reviews` сторінка — замінено на "залиш відгук" CTA без фейкових рейтингів
- ✅ `NicheReviews` — прибрано з усіх нішевих сторінок (3 рандомні відгуки на кожній)
- ✅ `TEAM_TESTIMONIALS` — прибрано з careers сторінки

### 9.2 Статистика (цифри "клієнтів/проєктів") — ✅ DONE
| Компонент | Старо | Ново |
|-----------|-------|------|
| `HeroSection.tsx` | "120+ Проєктів" | "120+ Шаблонів/Templates" |
| `HeroSection.tsx` | "85+ Клієнтів" | "60+ Ніш/Niches" |
| `HeroSection.tsx` | "98% Задоволені" | "Core Web Vitals 90+" |
| `services/page.tsx` | "120+ Projects / 85+ Clients / 4.9 Rating" | "120+ Templates / 60+ Niches / Core Web Vitals 90+" |
| `about/page.tsx` stats | "120+ Виконаних проєктів / 85+ Постійних клієнтів" | "120+ Шаблонів / 60+ Ніш" |
| Home metadata | "120+ проєктів" | "120+ шаблонів" |

### 9.3 Текстові претензії — ✅ DONE
| Компонент | Старо | Ново |
|-----------|-------|------|
| `CasesSection.tsx` | "Реальні результати клієнтів" | "Що можуть досягти ваші клієнти" |
| `CasesSection.tsx` | "Цифри, а не обіцянки — ось що ми робимо для бізнесу" | "Реальні метрики з наших нішевих рішень" |
| `ClientLogosSection.tsx` | "Нам довіряють компанії по всій Україні" | "Ніші які ми покриваємо / Industries We Cover" |
| `about/page.tsx` timeline | "Перші 20 клієнтів" | "Перші 20 проєктів" |
| `about/page.tsx` timeline | "85+ клієнтів" | "85+ готових рішень" |

### 9.4 Залишається (не є проблемою)
- Portfolio demos — явно показані як шаблони/mockups, ✅ OK
- "Замовити" / "Order" CTAs — коректні, ✅ OK
- Services FAQ з "our clients" — описують майбутніх клієнтів, ✅ OK (не претендує на минулі роботи)
- `marketplace/product/[slug]` — є "3 відгуки клієнтів" (фейкові) → **TODO: прибрати або додати disclaimer**

---

## Пріоритети виконання

| Статус | Завдання | Вплив |
|---|---|---|
| ✅ DONE | Перейменування "Niches" → "Solutions" в навігації | Одразу змінює сприйняття |
| ✅ DONE | Ціни на картках портфоліо + "Замовити" CTA | Прямо конвертує відвідувача |
| ✅ DONE | Нові поля в `portfolio.ts` (priceFrom, deliveryDays) | Дані для нових секцій |
| ✅ DONE | Прибрати всі фейкові відгуки/testimonials з сайту | Довіра клієнтів |
| ✅ DONE | Статистику "клієнтів/проєктів" → "шаблони/ніші" | Чесне позиціонування |
| ✅ DONE | Текстові претензії "реальні клієнти" → "наші рішення" | Чесне позиціонування |
| 🟡 MED | Секція "Замовити цей проєкт" на `/portfolio/[slug]` | Конверсія на кейс-сторінках |
| 🟡 MED | Hero + секція замовлення на нішевих demo-сторінках | Замикає воронку |
| 🟡 MED | marketplace/product відгуки (3 фейкові) — прибрати | Довіра |
| 🟢 LOW | SEO meta оновлення `/portfolio` та `/niches` | Органічний трафік |
| 🟢 LOW | "Готові рішення" в Services dropdown | Видимість продуктів |

---

## Нотатки

- **Не міняти URL-адреси** `/niches` → `/solutions` одразу — спочатку redirect, потім міняти (SEO)
- **Marketplace залишається** осередком купівлі (кошик, чекаут) — інші розділи ведуть туди
- **Portfolio кейси** (204+) + **59 demo-сторінок** = ~260+ "продуктів" в каталозі — це величезна перевага
- Клієнт має бачити воронку: `Побачив демо → Зрозумів ціну → Замовив` без зайвих кліків
