 Мультимовне SEO / Hreflang
Опис: Правильна реалізація hreflang для EN (Великобританія) та UK (Україна) локалей, щоб Google правильно визначав яку версію показувати якій аудиторії.
**Статус:** Частково виконано
**✅ Проаналізовано 2026-05-03 — canonical URLs, root redirect та hreflang EN-GB підтверджено в коді. Відкриті: GSC налаштування, переклади якості, Bing (після деплою).**

---

> ⚠️ **Незакреслені пункти ([ ]) — Phase 2:** потребують реального трафіку, акаунтів у SEO-інструментах або реєстрації в зовнішніх сервісах. Технічний SEO (sitemap, hreflang, schema) вже реалізовано у коді.


## Hreflang теги

- [x] Структура URL: `/en/*` (EN, первинна) та `/uk/*` (UK, вторинна)
- [x] `hreflang="en-GB"` — виправлено 2026-05-02: `HREFLANG_CODES` константа в `src/i18n.ts`, `buildAlternates()` тепер генерує `en-GB` замість `en`
- [x] `hreflang="uk"` — коректно
- [x] `hreflang="x-default"` вказує на EN версію — реалізовано в `buildAlternates()` (`src/i18n.ts`)
- [x] Hreflang є у `<head>` через Next.js Metadata API (автоматично)
- [x] Двонаправленість: кожна EN сторінка вказує на UK і навпаки — `buildAlternates()` додає обидві мови

## XML Sitemap для мультимовності
- [x] `app/sitemap.ts` генерує alternates для обох локалей через `forAllLocales()` — виправлено 2026-05-02: тепер використовує `HREFLANG_CODES` (`en-GB`, `uk`) замість URL-сегментів (`en`, `uk`)
- [x] Sitemap покриває 115+ URL для обох мовних версій
- [ ] Подати sitemap в Google Search Console з правильними налаштуваннями мови/регіону — після деплою

## Google Search Console — мовне таргетування
- [ ] Налаштувати GSC property для codenest.com.ua (весь сайт)
- [ ] Перевірити International Targeting → Мова: English / Ukrainian
- [ ] Перевірити звіт "International Targeting" на помилки hreflang
- [ ] Переконатись що Google правильно індексує обидві мовні версії

## Canonical та мовні версії
- ✅ Кожна EN сторінка має `canonical: "/en/..."` — перевірено 2026-05-03: `buildAlternates(lang, path)` генерує `canonical: '/${lang}${path}'`
- ✅ Кожна UK сторінка має `canonical: "/uk/..."` — аналогічно через `buildAlternates()`
- ✅ Немає cross-language canonical — `buildAlternates()` завжди використовує поточний `lang`
- ✅ `/` (root) редиректить на `/en/` — перевірено 2026-05-03: `src/proxy.ts` redirect на `/${locale}${pathname}` (default locale = 'en')
- [x] ✅ **ВИПРАВЛЕНО 2026-07-09**: на `/services/[slug]` `<link rel="canonical">` вже коректно локалізовано через `buildAlternates()`, але вбудований JSON-LD (`serviceSchema.url`, `breadcrumbSchema.item[].item`) використовував ту саму URL БЕЗ префіксу локалі для EN і UK — тепер обидва використовують `localePath(lang, path)` з `i18n.ts` (EN канонічний на корені без префіксу, UK з `/uk/`), синхронно з `buildAlternates()`/canonical.
- [x] Перевірити, чи такий самий патерн (JSON-LD URL без локалі) є на інших `[slug]`-сторінках (blog, portfolio) — **перевірено 2026-07-12 (3-й прохід аудиту TODO-дерева), знайдено пов'язаний, але інший за природою баг:**

### JSON-LD мовна локалізація (3-й прохід, 2026-07-12)

Не URL-без-локалі (та проблема з services вже виправлена 2026-07-09), а **текст JSON-LD хардкоджений українською незалежно від `lang`/`isUk`** на кількох `[slug]`-сторінках — реальний hreflang/structured-data mismatch: сторінка декларує `inLanguage: "en"` (де є), але текст у тому ж JSON-LD — українською.

Перевірено напряму по коду (`grep -n "headline:\|name: post\.\|name: project\.\|name: term\." "src/app/[lang]/*/[slug]/page.tsx"`):

| Файл | `headline` | `BreadcrumbList` | Статус |
|---|---|---|---|
| `blog/[slug]/page.tsx` | `post.title` — **завжди укр.**, не через `getPostTitle(post, lang)` (той helper коректно використовується лише для видимого H1, рядок 231) | `"Головна"`/`"Блог"` labels + `post.title` — **завжди укр.** | 🔴 Баг |
| `portfolio/[slug]/page.tsx` | `isUk ? ... : ...` — ✅ коректно | `"Головна"` label + `project.title` — **завжди укр.** | 🟡 Частковий баг (лише breadcrumb) |
| `glossary/[term]/page.tsx` | — | `term.termUk` — **завжди укр.**, немає `isUk`-розгалуження на `termEn` | 🔴 Баг |
| `compare/[slug]/page.tsx` | — | `isUk ? data.seoTitleUk : data.seoTitleEn` — ✅ коректно | ✅ OK |
| `resources/[slug]/page.tsx` | `isUk ? resource.titleUk : resource.titleEn` — ✅ коректно | `isUk ? resource.titleUk : resource.titleEn` — ✅ коректно | ✅ OK |

**Дія:** у `blog/[slug]/page.tsx` — замінити `post.title` на `getPostTitle(post, lang)` у `headline` (рядок ~148) і в breadcrumb `ListItem` (рядок ~187), замінити хардкоджені `"Головна"`/`"Блог"` labels на `isUk ? "Головна" : "Home"` / `isUk ? "Блог" : "Blog"` (там де вони йдуть у `item.name`, не лише у видимому UI, який уже коректний). У `portfolio/[slug]/page.tsx` — та сама заміна breadcrumb labels + `project.title` → локалізований title. У `glossary/[term]/page.tsx` — замінити `term.termUk` на `isUk ? term.termUk : term.termEn` (перевірити чи `termEn` поле взагалі існує в типі). Повний технічний чекліст — [tech/TODO_data_integrity.md](../tech/TODO_data_integrity.md) розділ 7.

**Масштаб впливу:** 286 blog-постів + 101 portfolio-кейс + 449 унікальних glossary-термінів на EN-версії сайту мають Article/BreadcrumbList JSON-LD з українським текстом усередині — не критичний crawl-блокер, але це сигнал мовної невідповідності, який Google може використати проти релевантності сторінки для EN-запитів.

## OG локалі (вже виконано, перевірка)
- [x] `og:locale: "en_GB"` на EN сторінках
- [x] `og:locale: "uk_UA"` на UK сторінках
- [x] `alternateLocale` вказує на другу локаль
- [ ] Перевірити через Facebook Sharing Debugger після деплою

## Переклади та якість контенту
- [ ] Переконатись що UK-переклади — повноцінні (не machine translation)
- [ ] Title/Description для UK сторінок — унікальні, а не просто переклад EN
- [ ] Ключові слова UK-версії — адаптовані до українського ринку (не буквальний переклад EN)
- [ ] Перевірити що блогові статті перекладені для обох локалей (або окремо написані)

## Bing / Yandex (другорядні пошуковики)
- [ ] Bing Webmaster Tools — підключити сайт, подати sitemap
- [ ] Перевірити що hreflang коректно сприймається Bing (через Bing URL Inspection Tool)

---

### Примітки
- `hreflang="en-GB"` — для Великобританії (первинний ринок).
- `hreflang="uk"` — для України (мовний код, не регіон).
- `hreflang="x-default"` → вказує на `/en/` версію.
- Помилки hreflang (неправильні пари, відсутня зворотна анотація) можуть призвести до канібалізації між мовними версіями.
