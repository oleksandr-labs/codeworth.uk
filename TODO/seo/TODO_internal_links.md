 Внутрішня перелінковка (Internal Links)
Опис: Оптимізація зв'язків між сторінками для розподілу ваги та покращення навігації.
**Статус:** Частково виконано
**✅ Проаналізовано 2026-05-01 — 16/17 задач виконані.**
**✅ Оновлено 2026-05-03 — 17/17 задач виконані. Anchor text перевірено (shortTitle = ключове слово). Додатково виправлено: CATEGORY_SERVICES у blog/[slug] тепер включає "AI та Автоматизація" → 55 AI/ML постів коректно лінкуються на сторінки послуг.**
**✅ Автотести 2026-05-02 (session 27): `internal-links.test.ts` 12/12 ✅, `internal_links.test.ts` 12/12 ✅ (виправлено portfolio nicheSlug: "fintech"→"consulting", "healthcare"→"medical").**

---

> ⚠️ **Незакреслені пункти ([ ]) — Phase 2:** потребують реального трафіку, акаунтів у SEO-інструментах або реєстрації в зовнішніх сервісах. Технічний SEO (sitemap, hreflang, schema) вже реалізовано у коді.


## Архітектура навігації
- ✅ Побудова логічної архітектури меню (Послуги → підкатегорії, Маркетплейс, Блог, Про нас)
- ✅ Mega-меню для розділу "Послуги" (15 послуг у 2-колонковому dropdown з іконками та цінами — auto-generated з SERVICES_DATA)
- ✅ Footer з посиланнями на всі ключові сторінки та категорії послуг (9 послуг + Доробки)
- ✅ Sitemap-сторінка (HTML) з повною структурою — `/sitemap/page.tsx` (всі розділи + ніші)

## Хлібні крихти
- ✅ Breadcrumbs на всіх внутрішніх сторінках (blog/[slug], services/[slug], portfolio/[slug])
- ✅ Schema.org BreadcrumbList-розмітка — `Breadcrumb.tsx` компонент
- ✅ Перевірити мобільне відображення Breadcrumbs — використовує стандартний flex/overflow, OK на мобільному

## Перелінковка з блогу
- ✅ Кожна стаття блогу має 2-3 посилання на сторінки послуг — блок "Пов'язані послуги CodeNest" у `blog/[slug]/page.tsx` (маппінг категорія → сервіси)
- ✅ Анкорний текст відповідає ключовому слову — перевірено 2026-05-03: `blog/[slug]/page.tsx` використовує `getServiceLocalized(slug, lang).shortTitle` (напр. "Artificial Intelligence", "Machine Learning") як анкор для Related Services блоку
- ✅ Блок "Схожі статті" в sidebar на сторінці статті (blog/[slug]/page.tsx)
- ✅ Посилання з кейсів на відповідні нішеві сторінки маркетплейсу — `nicheSlug` field + "Переглянути демо" / "Готове рішення для цієї ніші" buttons у `portfolio/[slug]/page.tsx` та `PortfolioContent.tsx`

## Перелінковка між послугами
- ✅ На кожній сторінці послуги є блок "Інші послуги" (chips з іконками)
- ✅ CTA веде на сторінку контактів або форму — є на всіх сторінках послуг
- ✅ Посилання на портфоліо на сторінках послуг ("Дивитися портфоліо")
- ✅ Блок "Читайте також" з пов'язаними статтями блогу на сторінках послуг

## Маркетплейс перелінковка
- ✅ З головної — на маркетплейс та Доробки (MarketplaceTeaser)
- ✅ Cross-sell banner Extras на сторінці маркетплейсу
- ✅ З нішевих сторінок — посилання на схожі ніші (вже є "Інші готові рішення")
- ✅ З блогу про нішу — на відповідну нішеву демо-сторінку (nicheSlug + sidebar widget)

## AI / ML нішеві сторінки — перелінковка

> Нові секції `/en/ai/[niche]` та `/en/ml/[niche]` потребують окремої стратегії перелінковки.

### Вертикальна перелінковка (pillar → cluster → supporting)
- `/services/artificial-intelligence` → `/ai` (overview) → `/ai/[niche]` (10 ніш)
- `/services/machine-learning` → `/ml` (overview) → `/ml/[niche]` (10 ніш)
- `/blog/[ai-post]` → `/ai/[niche]` + `/services/artificial-intelligence`
- `/blog/[ml-post]` → `/ml/[niche]` + `/services/machine-learning`
- `/portfolio/[ai-case]` → відповідна `/ai/[niche]` сторінка
- `/portfolio/[ml-case]` → відповідна `/ml/[niche]` сторінка

### Горизонтальна перелінковка (між нішами)
- `/ai/healthcare` ↔ `/ml/healthcare` (різний кут: RAG vs risk scoring)
- `/ai/fintech` ↔ `/ml/banking` (AI автоматизація vs ML моделі)
- `/ai/manufacturing` ↔ `/ml/manufacturing` (CV quality vs predictive maintenance)
- `/ai/real-estate` ↔ `/ml/real-estate` (чат-бот vs AVM)
- `/ai/[niche]` → `/ml/[niche]` CTA: "Need a custom ML model? →"
- `/ml/[niche]` → `/ai/[niche]` CTA: "Looking for AI chatbots? →"

### Cross-links з існуючих сторінок на нові AI/ML ніші — ✅ РЕАЛІЗОВАНО 2026-05-02
- ✅ `/niches/medical` → `/ai/healthcare` — "Take it further with AI/ML" banner у niches/[slug]/page.tsx
- ✅ `/niches/realestate` → `/ai/real-estate` + `/ml/real-estate`
- ✅ `/niches/fitness` → `/ai/hr`
- ✅ `/niches/saas` → `/ml/saas`
- ✅ `/niches/logistics` → `/ml/logistics`
- ✅ `/niches/construction` → `/ml/manufacturing`
- ✅ `/niches/agriculture` → `/ml/agritech`
- ✅ `/niches/law` → `/ai/legal`
- ✅ `/niches/education` → `/ai/education`
- ✅ `/niches/events` + `/niches/travel` → `/ai/hospitality`

### Header mega-menu (нові секції)
- ✅ Додати до mega-menu: "AI Solutions" → `/ai` — Header.tsx services dropdown (2026-05-02)
- ✅ Додати до mega-menu: "ML Solutions" → `/ml` — Header.tsx services dropdown (2026-05-02)

### Footer (нові колонки)
- ✅ Колонка "AI Solutions": /ai/healthcare, /ai/ecommerce, /ai/fintech, /ai/marketing, /ai/hr — Footer.tsx реструктуровано 5 колонок (xl:grid-cols-5), соцмережі переміщено у Brand-колонку (2026-05-02)
- ✅ Колонка "ML Solutions": /ml/banking, /ml/retail, /ml/saas, /ml/logistics, /ml/agritech — Footer.tsx (2026-05-02)

### Автотести для нових маршрутів — ✅ РЕАЛІЗОВАНО 2026-05-02
- ✅ Додати `/ai` + 10 `/ai/[niche]` slugs до `internal-links.test.ts` — 12/12 тестів ✅
- ✅ Додати `/ml` + 10 `/ml/[niche]` slugs до `internal-links.test.ts` — 12/12 тестів ✅
- ✅ Перевірити глибину: `/ai/healthcare` = 2 кліки від головної ✅

## Технічне
- ✅ Перевірити відсутність битих посилань — `lib/__tests__/internal-links.test.ts` (9 тестів: service/blog/niche/portfolio slugs, nicheSlug references, app directory verification, depth check)
- ✅ Не допускати циклічних посилань — перевірено автотестами
- ✅ Перевірити глибину вкладеності (max 3 кліки від головної) — перевірено у internal-links.test.ts
- ✅ XML Sitemap: автогенерація — `app/sitemap.ts` (всі 115+ URL)
- ✅ Оновити `sitemap.ts` — /ai, /ml + всі нішеві URL вже включені у sitemap.ts через aiNichePages + mlNichePages + staticPaths

---

### Примітки
- Перелінковка має вести користувача від інформаційного контенту (блог) до комерційного (послуги, маркетплейс).
- Регулярно перевіряти посилання інструментом (Screaming Frog, Ahrefs Site Audit).
