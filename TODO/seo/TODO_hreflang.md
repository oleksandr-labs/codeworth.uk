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
