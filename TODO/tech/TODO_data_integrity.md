# Відомі дефекти даних — консолідований чекліст

**Пріоритет:** 🔴 Критичний (швидкі фікси, малий scope)
**Створено:** 2026-07-12 (аудит структури TODO)
**Контекст:** Sprint 69 (`TODO_ML_ADAPTATION.md`) виявив кілька дефектів даних "поза скоупом" тодішньої задачі й залишив їх незафіксованими в жодному actionable TODO. Цей файл — єдине місце, де їх тепер треба закрити.

---

## 1. Дублікати slug (ламають/можуть ламати generateStaticParams або SEO canonical)

> **Оновлено 2026-07-12 (другий прохід аудиту) — верифіковано фактичним `grep`/`uniq -c` по всіх `src/lib/data/*.ts`, не переказом логів Sprint 69.**

- [ ] `geo.ts` — **підтверджено**, рівно 1 дублікат: `slug: "nottingham"` (2 входження). Знайти обидва записи, об'єднати в один (звірити який має повніший/новіший ML-контент) або перейменувати один, якщо це навмисно два різні записи (малоймовірно)
- [ ] `compare.ts` — **підтверджено**, рівно 3 дублікати: `vs-freelance-ml-engineer`, `vs-datarobot`, `vs-big4-ai-consulting` (кожен по 2 входження). Перевірити чи `generateStaticParams` де-дуплікує автоматично (Next.js може мовчки використати останній) чи це реальний build-ризик; об'єднати контент двох версій кожного запису в один
- [ ] **НОВЕ — `glossary.ts` має 13 унікальних slug з дублікатами (12 подвійних + 1 потрійний = 14 "зайвих" записів)**, значно більше, ніж підозрювалось у першій версії цього файлу (яка згадувала лише потенційну колізію `mixture-of-experts` — та колізія НЕ підтвердилась; замість неї знайдено ці 13):
  - `vector-database` — **потрійний** дублікат (3 окремі записи одного терміна, не 2)
  - Подвійні дублікати (по 2 записи кожен, 12 термінів): `algorithmic-impact-assessment`, `automl`, `chain-of-thought`, `constitutional-ai`, `coreference-resolution`, `data-drift`, `dependency-parsing`, `differential-privacy`, `knowledge-graph`, `natural-language-generation`, `prompt-engineering`, `recommender-system`
  - **Верифіковано точно (3-й прохід аудиту):** `GLOSSARY_TERMS` має 463 записи всього, **449 унікальних slug** (463 − 449 = 14 зайвих входжень = 12×1 + 1×2, точно збігається). "465 термінів" у старих версіях `TODO_ML_ADAPTATION.md`/`TODO_MAIN.md` було наближенням — фактичний масив має 463 записи (449 унікальних)
  - SEO-наслідок: дві сторінки `/glossary/[term]` з різним `fullDescription` на той самий slug — або Next.js мовчки рендерить лише останній запис (перший стає недосяжним/orphan), або build-колізія
  - **Дія:** для кожного з 12 подвійних + 1 потрійного slug прочитати всі версії, злити (кращий опис перемагає) або перейменувати другий запис, якщо контент справді різний
- [ ] **НОВЕ — `mlNiches.ts`/`aiNiches.ts` мають дублікати іншої природи** — не дублікати самої ніші, а дублікати `slug` у вкладених масивах case-study прикладів всередині різних ніш:
  - `mlNiches.ts`: `ml-fraud-detection-fca` (у нішах banking і cybersecurity, різні `name`/`metric`/`blogSlug` — два різні кейси з однаковим slug), `ml-crop-yield-precision-farming` (двічі в agritech, різний `blogSlug`)
  - `aiNiches.ts`: 7 дублікатів: `ai-bilingual-rag-chatbot`, `ai-chatbot-saas`, `ai-doc-analyzer`, `ai-edtech-adaptive-lms`, `ai-rag-healthcare-system`, `ai-resume-screener`, `ml-property-valuation` (останній — двічі з ІДЕНТИЧНИМ `name`/`metric`/`blogSlug` у двох різних нішах, схоже на копіпаст-помилку, не навмисний дублікат)
  - Нижчий ризик за geo/compare/glossary (ці slug, ймовірно, не є URL-параметрами) — перевірити чи використовуються як React `key` в `.map()` без додаткового namespace (якщо так — React dev-warning про дублюючі keys, не build-помилка)
  - **Дія:** `ml-property-valuation` (ідентичні дані в обох місцях) — найімовірніше просто прибрати з однієї ніші; решта — перевірити навмисність, інакше перейменувати

**Перевірка перед фіксом (команда, якою фактично верифіковано цей розділ):**
```
for f in blog geo compare glossary portfolio useCases resources careers reviews mlNiches aiNiches startup tools; do
  echo "=== $f.ts ==="; grep -o "slug: ['\"][a-z0-9-]*['\"]" "src/lib/data/$f.ts" | sort | uniq -c | awk '$1>1'
done
```
**Підтверджено чистими (0 дублікатів slug), фактичні розміри масивів (3-й прохід, точний перерахунок):** `blog.ts` — `BLOG_POSTS` 286 записів (не 287), `portfolio.ts` — `PROJECTS` 101 запис (не 102), `useCases.ts` — `USE_CASES` 53, `resources.ts` — `RESOURCES` 99 (не 101), `careers.ts` — `JOBS` 40 (не 42; `TEAM_TESTIMONIALS` — окремий масив без поля `slug`, не рахується), `reviews.ts` — 49, `startup.ts` — `STARTUP_SOLUTIONS` 12 (не 14), `tools.ts` — `TOOLS` 18 (не 19). Усі числа звірені у `TODO_ROADMAP.md` "Верифіковані фактичні числа".

## 2. `Footer.tsx` — застарілий хардкоджений список ніш

- [ ] `src/components/layout/Footer.tsx` тримає власний куций підсписок ніш (6 AI / 7 ML), захардкоджений окремо від `ML_NICHES`/`AI_NICHES` масивів — не автоматично підхоплює нові ніші
- [ ] 7 ніш Sprint 69 відсутні у Footer: `/ml/telecoms`, `/ml/automotive`, `/ml/pharma-life-sciences`, `/ml/government-public-sector`, `/ai/government`, `/ai/automotive`, `/ai/media-entertainment`
- [ ] Рішення: замінити хардкод на `.slice(0, N)` по `ML_NICHES`/`AI_NICHES` масивах (як вже зроблено на `/ml`/`/ai` хабах), або якщо хардкод навмисний (курована підмножина) — додати найновіші ніші вручну і задокументувати критерій відбору
- [ ] Сторінки все одно доступні через `/ml`, `/ai` хаби й sitemap — це не 404-ризик, а SEO/UX-упущення (менше internal link equity на нові ніші)

## 3. Tools без реальної інтерактивної логіки (5 з 18, перевірено точно)

- [ ] `ai-chatbot-vs-human-cost-calculator`
- [ ] `rag-vs-fine-tuning-decision-tool`
- [ ] `llm-token-cost-comparator`
- [ ] `ai-act-risk-classification-tool`
- [ ] `carbon-esg-ml-impact-calculator`

Наразі — каталожні записи з `badge: "Coming Soon"` в `tools.ts`, без робочого UI. 3 подібні tools вже мають реальну логіку через спільний компонент `src/components/tools/IndustrySavingsCalculator.tsx` (slider-інпути, formula за variant-конфігом) — використати як шаблон де застосовно (`carbon-esg-ml-impact-calculator` підходить під той самий патерн). Для `ai-act-risk-classification-tool` і `rag-vs-fine-tuning-decision-tool` знадобиться quiz/decision-tree UI, не calculator — новий компонент.

**SEO-ризик "Coming Soon" сторінок:** якщо ці 5 сторінок індексуються Google з порожнім/статичним контентом під назвою "Calculator", це тонкий контент — або доробити логіку найближчим часом, або тимчасово `noindex` до готовності (перевірити поточний `robots` metadata на цих 5 slug).

## 4. Пов'язані мертві TODO-документи (виявлено при другому проході)

- [ ] `admin/TODO_client_admin.md` — описує `/dashboard` (клієнтський кабінет) + `/admin/marketplace` — **обидва роути підтверджено відсутні** в `src/app/[lang]/` (0 збігів на `find src -iname "*dashboard*" -o -iname "*admin*"`), видалені в Sprint 67 разом з рештою marketplace-інфраструктури. Файл описує неіснуючу фічу — додано deprecation-банер (див. нижче)
- [ ] `extras/ecommerce/TODO_extras_ecommerce.md` — посилається на "власний маркетплейс CodeNest" (`CatalogClient.tsx`, `CartClient.tsx`, `CheckoutForm.tsx`, `AccountClient.tsx`, `AdminClient.tsx`) як на реалізовану основу для нових e-commerce extras — вся ця основа видалена. Додано deprecation-банер (див. нижче)
- [ ] **Широкий, але низькоризиковий патерн:** ~15 файлів у `ai-niche-pages/*.md` містять приклади `title:`/`metaTitle` з текстом "— CodeNest" (напр. `TODO_ai_healthcare.md`, `TODO_ai_fintech.md`, `TODO_ai_ml_data_types.md` та ін.) — це приклади мета-тайтлів у старих SEO-специфікаціях, **підтверджено 0 збігів "CodeNest"/"codenest" у фактичному `src/`** (реальний код вже перейменований). Не блокер, але якщо агент копіює приклад title напряму з TODO в код — ризик регресії бренду. Не виправлено індивідуально (низька цінність 15 точкових edits на приклади тексту) — досить цього застереження при читанні тих файлів

## 5. НОВЕ (3-й прохід, 2026-07-12) — `src/app/sitemap.ts` не включає `/tools/[slug]`

- [ ] `sitemap.ts` імпортує й мапить `SERVICES_DATA`, `BLOG_POSTS`, `PROJECTS`, `GEO_CITIES`, `COMPARE_DATA`, `GLOSSARY_TERMS`, `RESOURCES`, `JOBS`, `AI_NICHES`, `ML_NICHES`, `USE_CASES`, `STARTUP_SOLUTIONS` — **але не імпортує `TOOLS`** з `tools.ts`. Лише статичний запис `{ path: "/tools", ... }` (хаб-сторінка) є в sitemap; жодна з 18 `/tools/[slug]` сторінок не має власного sitemap-запису
- [ ] Усі інші programmatic-типи (11 з 12 масивів даних) коректно й повністю покриті sitemap-ом — це єдиний виявлений пропуск
- [ ] **Дія:** додати `import { TOOLS } from "@/lib/data/tools"` + мапу `toolPages` за тим самим патерном, що й `useCasePages`/`startupPages`. Для 5 "Coming Soon" tools (див. розділ 3) — вирішити спершу noindex-питання, потім додавати/не додавати в sitemap

## 6. НОВЕ (3-й прохід, 2026-07-12) — EN-переклад blog-постів неповний (`titleEn` відсутнє у 44 з 286)

> Пов'язано з i18n parity задачею в `TODO_ROADMAP.md` Phase 3.4 — тут конкретні цифри.

- [ ] `BLOG_POSTS` записи мають базові поля українською (`title`, `content`, `faq[].q/a`) і EN-override поля (`titleEn`, `contentEn`, `faq[].qEn/aEn`) — це успадкована структура з до-ML/до-UK-primary ери (коли UA був первинним ринком)
- [ ] **Точний підрахунок:** `title:` — 286 (усі пости), `titleEn:` — 242. **44 пости (~15%) не мають `titleEn`**, тобто на EN-версії сайту (первинний ринок за `TODO_MAIN.md` i18n-розділом) ці 44 URL, ймовірно, показують український заголовок — перевірити конкретний fallback-механізм у `blog/[slug]/page.tsx` (є хелпер `getPostTitle(post, lang)`, використовується для видимого H1 — перевірити чи він фолбечить на `title`, чи повертає щось інше, коли `titleEn` відсутній)
- [ ] Аналогічно перевірити `contentEn`/`excerptEn`/`faq[].qEn` на тих самих 44 постах — якщо весь контент, а не лише title, відсутній англійською, це означає що ~15% blog-контенту на "первинному" EN-ринку фактично українською
- [ ] **Дія:** список 44 slug без `titleEn` — `grep` пости де є `title:` але нема відповідного `titleEn:` в тому самому об'єкті (потребує JS/TS парсингу, не простого grep, через багаторядкові об'єкти) — визначити пріоритетні для перекладу (найбільш трафіконосні за GSC, коли дані з'являться)

## 7. НОВЕ (3-й прохід, 2026-07-12) — breadcrumb/headline JSON-LD hardcoded українською на кількох `[slug]`-сторінках незалежно від `lang`

> Це відповідь на відкрите питання з `seo/TODO_hreflang.md` рядок 37 ("Перевірити, чи такий самий патерн є на blog/portfolio — не перевірено"). Повні деталі й список файлів — [seo/TODO_hreflang.md](../seo/TODO_hreflang.md) розділ "JSON-LD мовна локалізація (3-й прохід)".

- [ ] `blog/[slug]/page.tsx` — `Article.headline`, `BreadcrumbList` (обидва "Головна"/"Блог" labels і `post.title`) **завжди українською**, незалежно від `isUk`/`lang`, хоча `getPostTitle(post, lang)` helper існує й коректно використовується для видимого H1 (рядки 44, 231)
- [ ] `portfolio/[slug]/page.tsx` — `headline` коректно локалізований (`isUk ? ... : ...`), але `BreadcrumbList` — та сама проблема ("Головна" + `project.title` завжди українською)
- [ ] `glossary/[term]/page.tsx` — `BreadcrumbList` використовує `term.termUk` завжди, без `isUk`-розгалуження
- [ ] **Контрольна група, підтверджено КОРЕКТНО:** `compare/[slug]/page.tsx` (`isUk ? data.seoTitleUk : data.seoTitleEn`), `resources/[slug]/page.tsx` (headline і breadcrumb обидва коректно локалізовані)

## 8. НОВЕ (6-й прохід, 2026-07-12) — careers salary unit bug: 36 з 40 вакансій показують річну зарплату як місячну

> Перевірено напряму по коду (`grep -n "salaryMin:\|salaryMax:" src/lib/data/careers.ts` + читання `careers/[position]/page.tsx`).

- [ ] `JOBS` записи не мають поля-одиниці виміру для `salaryMin`/`salaryMax` — деякі записи зберігають РІЧНУ зарплату (36 з 40, напр. `ml-engineer-uk`: 55000–85000, `ml-solutions-architect`: 80000–120000), деякі — МІСЯЧНУ (4 найстаріші записи без `-uk` суфікса: `ml-engineer` 4000–7000, `data-scientist` 3500–6000, `mlops-engineer` 4000–7000, `ml-tech-lead` 7000–10000)
- [ ] `src/app/[lang]/careers/[position]/page.tsx` рядок 123: `{job.salaryMin.toLocaleString()}–{job.salaryMax.toLocaleString()} {job.currency}/{isUk ? "міс" : "mo"}` — **хардкоджений лейбл "/mo" застосовується до ВСІХ записів однаково**, незалежно від того, чи дані насправді річні
- [ ] `jobPostingSchema.baseSalary.value.unitText: "MONTH"` (рядок 75) — той самий баг у структурованих даних (`JobPosting` Schema.org), яку індексує Google for Jobs
- [ ] **Наслідок:** для 36 з 40 вакансій (90%) на сторінці й у Google Jobs rich results показується щомісячна зарплата в розмірі річної — напр. "ML Solutions Architect: £80,000–£120,000/mo" замість коректних "£80,000–£120,000/year" — очевидно неправдоподібна цифра (>£960k/рік), підриває довіру до всієї careers-секції і потенційно порушує точність Google structured data
- [ ] **Дія:** (1) нормалізувати дані — привести всі 4 legacy-записи до річних цифр (помножити на ~12, або перевірити чи це взагалі актуальні вакансії — вони єдині без `-uk` суфіксу й можуть бути легасі-заглушками з до-ML ери, перевірити разом), (2) прибрати хардкод `/mo`/`"MONTH"`, замінити на `isUk ? "рік" : "year"` / `unitText: "YEAR"` (припускаючи що більшість — річні; або додати explicit `salaryUnit` поле в тип `JobPosting`)

## 9. НОВЕ (6-й прохід, 2026-07-12) — критичний контекст для redirect-бага (P0 у `TODO_ROADMAP.md`)

> Git-історія підтверджує намір і причину бага з `location`/`startup` redirects — деталі й повне обґрунтування в [seo/TODO_technical_seo.md](../seo/TODO_technical_seo.md) і `TODO_ROADMAP.md` P0 1.0. Коротко: коміт `fccdd436` (2026-06-23) додав редіректи одночасно з видаленням старого web-studio брендингу, коли `location`/`startup` роути ще не мали ML-контенту; `geo.ts`/`startup.ts` наповнено реальним контентом ПІЗНІШЕ тими самими Sprint 6–69; редірект ніхто не прибрав. Безумовний, без env-перевірки — діє й у продакшн-білді.

---

**Оцінка обсягу:** розділи 1–4 — точкові правки даних (1 агент-сесія). Розділи 5, 7, 8 — точкові правки коду (малий, 3–5 файлів). Розділ 6 — потребує окремого контент-спринту на переклад (більший обсяг, залежить від пріоритезації за трафіком). Розділ 9 — довідковий, дія трекається в `TODO_ROADMAP.md`.
