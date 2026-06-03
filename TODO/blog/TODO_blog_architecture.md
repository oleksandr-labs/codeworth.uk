# 📰 Архітектура Блогу — CodeNest

> Центральний файл управління блогом. Загальна стратегія, категорії, статистика та зв'язки між файлами.

---

## Загальний статус

- **Статус MVP:** ✅ Готово
- **✅ Проаналізовано 2026-05-01 — архітектура блогу перевірена, всі 28 категорій підтверджені.**
- **✅ Оновлено 2026-05-02 — +56 нових AI/ML постів (Phase 1 + 2 + нішеві). Загалом 122 пости.**
- **✅ SEO Стратегія створена 2026-05-02 — повний пакет SEO-файлів блогу.**
- **✅ Оновлено 2026-05-02 (session 24) — BLOG_CATEGORIES → 23 типізованих категорії (BlogCategory з id/label/icon/color/isNew). +22 пости перерозподілено. +6 нових EN-постів. Загалом 128 постів. Тести 44/44 ✅**
- **✅ Оновлено 2026-05-02 (session 25) — Category SSG-сторінки /blog/category/[id] (22 сторінки, sitemap +44 entries). Sorting dropdown (Newest/Oldest). New/Updated badges на картках. Breadcrumb на blog list page. +4 нові EN-пости (Email, CRO, Security, Legal). Загалом 132 пости.**
- **✅ Оновлено 2026-05-02 (session 26) — "Related Articles" full-width секція під кожною статтею (3 карточки з тієї ж категорії). +5 нових EN-постів (Instagram Reels, Dev Tools, GA4 Events, Web Agency Checklist, Google Ads ROI). Загалом 136 постів.**
- **✅ Оновлено 2026-05-02 (session 30) — EN/UK мовний фільтр в BlogContent (🇬🇧/🇺🇦 toggle + badge на картках). +25 нових EN-постів (email автоматизація, list building, VS Code, API testing, security hardening, SQL/XSS, CRO audit, Zapier examples, content strategy, cloud hosting, digital legal, TikTok, mobile indexing, A/B testing, workflow automation, content ROI, web hosting, GDPR cookies, LinkedIn B2B, GA4 funnels, marketing attribution, PWA). Всі 22 категорії ≥5 постів. 69 EN posts. Загалом 161 пост. Тести 1884/1884 ✅**
- **Загальна кількість категорій у банку статей:** 28 категорій
- **Категорій у коді (BLOG_CATEGORIES):** ✅ **23 реалізовано** (BlogCategory об'єкти)
- **Загальна кількість запланованих статей:** ~1 400+
- **Опублікованих постів (у коді):** **161** (69 EN posts з contentEn; всі 22 категорії ≥5 постів)
- **Topical clusters:** 8 планованих (A: Web Dev, B: SEO, C: AI/ML, D: Ecom, E: Marketing, F: Niches, G: Design, H: Security)
- **Формат контенту:** `content: string[]` (UK) + `contentEn: string[]` (EN для нових постів)
- **i18n:** ✅ EN + UK

## SEO-файли блогу (нові, 2026-05-02)

| Файл | Призначення |
|------|------------|
| [TODO_blog_seo_master_strategy.md](TODO_blog_seo_master_strategy.md) | Головна SEO-стратегія: цілі, кластери, keyword map, E-E-A-T |
| [TODO_blog_content_calendar.md](TODO_blog_content_calendar.md) | 12-місячний контент-план публікацій (80+ постів) |
| [TODO_blog_pillar_clusters.md](TODO_blog_pillar_clusters.md) | Hub & Spoke архітектура: 8 кластерів, 100+ постів |
| [TODO_blog_categories_code.md](TODO_blog_categories_code.md) | ✅ BLOG_CATEGORIES → 23 категорії (BlogCategory об'єкти) — ВИКОНАНО |
| [TODO_blog_featured_snippets.md](TODO_blog_featured_snippets.md) | 50 Featured Snippet targets + FAQPage schema |
| [TODO_blog_internal_linking_map.md](TODO_blog_internal_linking_map.md) | Повна карта internal links: blog → services/portfolio/tools |
| [TODO_blog_en_keywords_per_post.md](TODO_blog_en_keywords_per_post.md) | EN keyword + meta description per кожен запланований пост |

## Мова написання статей

> **Всі статті пишуться спочатку англійською мовою (EN) — це основна мова сайту.**
> Після публікації EN-версії стаття перекладається та адаптується українською (UK).
> Порядок: 🇬🇧 EN → 🇺🇦 UK

- EN версія: оригінальний контент, публікується першою
- UK версія: адаптований переклад (не буквальний), публікується другою
- Обидві версії: унікальні SEO-метатеги (Title, Description) для кожної мови
- Slug: однаковий для обох мов (`/en/blog/[slug]` та `/uk/blog/[slug]`)

---

## Структура файлів блогу

> Файли розподілені по підпапках за тематикою. `TODO_blog_architecture.md` — в корені папки `blog/`.

### 🖥 tech/ — Технології (7 файлів, ~395 статей)
| Файл | Категорія | Статей |
|------|-----------|--------|
| [tech/TODO_blog_webdev.md](tech/TODO_blog_webdev.md) | 🌐 Веб-розробка та Технології | 64 + 20 нових |
| [tech/TODO_blog_performance.md](tech/TODO_blog_performance.md) | ⚙️ Продуктивність та Оптимізація | 35 + 15 нових |
| [tech/TODO_blog_ai.md](tech/TODO_blog_ai.md) | 🤖 AI та Технології майбутнього | 36 + 20 нових |
| [tech/TODO_blog_trends.md](tech/TODO_blog_trends.md) | 🌿 Тренди та Майбутнє Веб-розробки | 40 + 10 нових |
| [tech/TODO_blog_security.md](tech/TODO_blog_security.md) | 🔐 Безпека сайту | 30 + 15 нових |
| [tech/TODO_blog_guides_dev.md](tech/TODO_blog_guides_dev.md) | 📖 Покрокові Гайди для Розробників | 35 нових |
| [tech/TODO_blog_tools.md](tech/TODO_blog_tools.md) | 🛠 Інструменти та Сервіси | 30 нових |

### 🔍 seo/ — SEO та Аналітика (4 файли, ~260 статей)
| Файл | Категорія | Статей |
|------|-----------|--------|
| [seo/TODO_blog_seo.md](seo/TODO_blog_seo.md) | 🔍 SEO та Пошукова Оптимізація | 66 + 20 нових |
| [seo/TODO_blog_local_seo.md](seo/TODO_blog_local_seo.md) | 🗺 Регіональний та Локальний SEO | 38 + 15 нових |
| [seo/TODO_blog_analytics.md](seo/TODO_blog_analytics.md) | 📊 Аналітика та Дані | 29 + 15 нових |
| [seo/TODO_blog_questions.md](seo/TODO_blog_questions.md) | ❓ Питальні запити (Featured Snippets) | 71 + 15 нових |

### 📣 marketing/ — Маркетинг та Контент (5 файлів, ~270 статей)
| Файл | Категорія | Статей |
|------|-----------|--------|
| [marketing/TODO_blog_marketing.md](marketing/TODO_blog_marketing.md) | 📣 Цифровий Маркетинг | 40 + 20 нових |
| [marketing/TODO_blog_content.md](marketing/TODO_blog_content.md) | 🖼 Контент та Копірайтинг | 47 + 15 нових |
| [marketing/TODO_blog_monetization.md](marketing/TODO_blog_monetization.md) | 📈 Монетизація та Бізнес-стратегія | 36 + 10 нових |
| [marketing/TODO_blog_social_media.md](marketing/TODO_blog_social_media.md) | 📱 Соціальні Мережі та SMM | 35 нових |
| [marketing/TODO_blog_email_ads.md](marketing/TODO_blog_email_ads.md) | 📧 Email-маркетинг та Реклама | 30 нових |

### 🎨 design/ — Дизайн та Натхнення (2 файли, ~110 статей)
| Файл | Категорія | Статей |
|------|-----------|--------|
| [design/TODO_blog_design.md](design/TODO_blog_design.md) | 🎨 Дизайн та UX/UI | 49 + 20 нових |
| [design/TODO_blog_inspiration.md](design/TODO_blog_inspiration.md) | 💡 Ідеї та Натхнення | 27 + 15 нових |

### 🛒 ecommerce/ — E-commerce та Ніші (2 файли, ~130 статей)
| Файл | Категорія | Статей |
|------|-----------|--------|
| [ecommerce/TODO_blog_ecommerce.md](ecommerce/TODO_blog_ecommerce.md) | 🛒 E-commerce та Інтернет-магазини | 47 + 20 нових |
| [ecommerce/TODO_blog_niches.md](ecommerce/TODO_blog_niches.md) | 🏗 Сайти для конкретних ніш | 65 + 20 нових |

### 🤝 business/ — Бізнес та Клієнти (6 файлів, ~280 статей)
| Файл | Категорія | Статей |
|------|-----------|--------|
| [business/TODO_blog_business.md](business/TODO_blog_business.md) | 🤝 Бізнес, Фінанси та Вибір Виконавця | 40 + 15 нових |
| [business/TODO_blog_owners.md](business/TODO_blog_owners.md) | 🧑‍💼 Для Власників Бізнесу | 41 + 15 нових |
| [business/TODO_blog_international.md](business/TODO_blog_international.md) | 🌍 Масштабування та Міжнародний Бізнес | 25 + 15 нових |
| [business/TODO_blog_cases.md](business/TODO_blog_cases.md) | 🔄 Кейси та Реальні Результати | 30 + 15 нових |
| [business/TODO_blog_guides_business.md](business/TODO_blog_guides_business.md) | 📋 Покрокові Гайди для Бізнесу | 35 нових |
| [business/TODO_blog_legal.md](business/TODO_blog_legal.md) | ⚖️ Право, Договори та Цифровий Бізнес | 30 нових |

---

## Маппінг категорій: Банк статей → Категорії у коді

Наразі в коді (`BLOG_CATEGORIES`) є 6 категорій + "Всі":
| Категорія у коді | Категорії банку статей, що відповідають |
|------------------|----------------------------------------|
| SEO та просування | SEO, Аналітика, Локальний SEO, Питальні запити (частково) |
| Веб-розробка | Веб-розробка, Продуктивність, AI, Тренди, Гайди для Розробників, Інструменти |
| Дизайн і UX | Дизайн та UX/UI, Натхнення |
| E-commerce | E-commerce, Монетизація |
| Кейси клієнтів | Кейси та Реальні Результати |
| Маркетплейс і нішеві рішення | Сайти для ніш |

### Перелік нових категорій для розширення (рекомендованих):
- **Маркетинг** — Цифровий маркетинг, Контент та копірайтинг, SMM, Email
- **Бізнес** — Для Власників Бізнесу, Бізнес/Фінанси/Вибір Виконавця, Гайди для бізнесу
- **Безпека** — Безпека сайту
- **Право** —契約, GDPR, авторські права у digital
- **Міжнародний бізнес** — Масштабування та міжнародний бізнес

---

## Контент-стратегія

- **Мова написання:** 🇬🇧 EN першою → потім 🇺🇦 UK переклад та адаптація
- **Частота:** 2-3 статті на місяць (мінімум), пріоритет EN-версії
- **Пріоритет публікації:** ⭐⭐⭐ → ⭐⭐ → ⭐
- **Формат:** Schema.org Article розмітка для кожного посту
- **SEO-цілі:** Featured Snippets, AI Overview, Rich Snippets
- **Теги:** 47 тегів (SSG-сторінки для кожного)
- **Гайди:** окремий формат — покрокові інструкції (H2 = крок), мінімум 2000 слів

---

## Технічна реалізація (зв'язок з кодом)

- **Дані постів:** `src/lib/data/blog.ts` → `BLOG_POSTS[]`
- **Категорії:** `src/lib/data/blog.ts` → `BLOG_CATEGORIES[]`
- **Стрічка блогу:** `src/app/[lang]/blog/page.tsx`
- **Пост:** `src/app/[lang]/blog/[slug]/page.tsx`
- **Теги:** `src/app/[lang]/blog/tag/[tag]/page.tsx`
- **Компоненти:** `src/components/blog/BlogContent.tsx`
- **Тести:** `src/lib/__tests__/blog.test.ts`

---

## Примітки

- При додаванні нової статті: 1) створити запис у `BLOG_POSTS[]`, 2) відмітити `[x]` у відповідному файлі категорії, 3) додати теги.
- Позначення пріоритетів: ⭐⭐⭐ першочергові, ⭐⭐ середній, ⭐ довгий хвіст.
- **Мова:** EN публікується першою. Після публікації — перекласти та опублікувати UK-версію.
- Формат назви файлу статті для EN: `slug-here` → `/en/blog/slug-here`
- Формат назви файлу статті для UK: той само slug → `/uk/blog/slug-here`
- Гайди позначаються тегом `guide` та форматом заголовку: "Покроковий гайд:" або "Step-by-Step Guide:"
