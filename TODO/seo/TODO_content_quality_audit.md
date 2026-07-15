# Аудит якості контенту на масштабі (пост-Sprint 69)

**Пріоритет:** 🟡 Середній, але блокує рішення про Phase 3 (продовження обсягу)
**Створено:** 2026-07-12 (аудит структури TODO)
**Контекст (числа верифіковано `grep`-підрахунком, 3-й прохід аудиту 2026-07-12 — див. `TODO_ROADMAP.md`):** після Sprint 69 сайт має 286 blog-постів, 449 унікальних глосарій-термінів (463 записи, 14 дублікатів), 71 унікальну compare-сторінку (74 записи, 3 дублікати), 101 портфоліо-кейс, 44 унікальних міста, 53 use-cases, 99 resources — обсяг, що вже перевищує типовий сайт ML/AI-консалтингу такого розміру команди (заявлено ~15 спеціалістів в `about/page.tsx`). Увесь цей контент генерувався паралельними агент-спринтами за 3 тижні (2026-06-23 → 2026-07-10) без централізованого SEO-аудиту на предмет канібалізації чи thin content.

> **✅ 4-й прохід (2026-07-12) — розділ 1 більше не лише план: виконано реальний скан `blog.ts`/`glossary.ts`/`compare.ts` на предмет схожих slug/тем через `grep`, знайдено конкретні пари, додано нижче замість тільки методики.

**Мета цього файлу:** НЕ додати ще контент — виміряти, чи наявний контент реально ранжується/конвертує, і чи є структурні проблеми, перш ніж додавати ще (Phase 3 у [TODO_ROADMAP.md](../TODO_ROADMAP.md)).

---

## 1. Keyword cannibalization — конкретні знайдені пари (виконано, не лише заплановано)

> Перевірено напряму `grep` по `slug:`/`title:` у `blog.ts`, `glossary.ts`, `compare.ts` (2026-07-12). Пари нижче — реальні знахідки з фактичними slug, не гіпотези.

### Blog — той самий інтент, різні slug
- [ ] `what-is-mlops` vs `what-is-mlops-guide` — **найгостріша пара**: обидва явно цілять ту саму "what is MLOps" PAA-query, назви slug практично ідентичні. Перевірити title/meta description обох — якщо теж майже ідентичні, консолідувати в один пост з redirect
- [ ] `ml-for-uk-water-utilities` vs `ml-for-uk-water-utilities-ofwat` (вже відомо з Sprint 69, підтверджено slug існують обидва)
- [ ] `ml-for-uk-logistics-last-mile` vs `ml-for-uk-logistics-last-mile-ev` — та сама тема (last-mile), другий — вужчий EV-варіант; перевірити чи EV-контент дійсно відрізняється чи це рерайт з доданим "EV"
- [ ] `ai-for-uk-warehousing-3pl` vs `ml-for-uk-logistics-last-mile` (та сама логістична тема, різний кут — 3PL warehousing vs last-mile delivery, ймовірно ОК, але варто перевірити перетин ключових слів)
- [ ] `ml-for-uk-motor-insurance-telematics` vs `ml-for-uk-insurance-underwriting` vs `ml-insurance-uk-pricing-claims` vs `ml-insurance-uk-actuarial` vs `ml-for-uk-insurtech` vs `document-intelligence-ml-uk-insurance` — **кластер із 6 insurance-постів**, найбільший ризик-кластер на сайті; кожен претендує на відмінний кут (telematics/underwriting/pricing/actuarial/insurtech-загальний/document-NLP), але без diff-перевірки контенту неможливо підтвердити відсутність overlap
- [ ] Fraud-detection кластер (6 постів): `ml-fraud-anomaly-detection-fca`, `ml-fraud-detection-guide`, `ml-fraud-detection-fintech-uk`, `ml-fraud-detection-uk-ecommerce`, `ml-government-fraud-detection-uk`, `graph-ml-fraud-detection-uk-banking` — теж великий кластер, потенційно ОК (різні сектори: FCA-загальний/generic-guide/fintech/ecommerce/government/banking-graph), але 2 з них (`ml-fraud-detection-guide` — загальний, `ml-fraud-detection-fintech-uk` — секторний) мають найбільший ризик перетину
- [ ] `eu-ai-act-uk-impact-2026` vs `uk-ai-act-risk-classification-guide` (з попереднього раунду, підтверджено обидва slug існують)

### Glossary — та сама концепція, 3 окремі терміни-записи (не exact-dup slug, різна назва одного поняття)
- [ ] `rag-intro` vs `rag` vs `retrieval-augmented-generation` — **найгостріша glossary-знахідка**: три окремі glossary-записи з різними slug, усі про RAG (Retrieval-Augmented Generation). Це не дублікат slug (тому не в `tech/TODO_data_integrity.md` розділ 1), а дублікат ТЕМИ під різними іменами — гірше для SEO ніж chained redirect, бо Google бачить 3 конкуруючі сторінки за "what is RAG"/"RAG explained". **Дія:** прочитати всі три, вирішити чи `rag-intro`/`rag` — legacy-дублікати одне одного (ймовірно `rag-intro` старіший, `rag` новіший), консолідувати в 1-2 (напр. короткий `rag` glossary-запис + окремий `retrieval-augmented-generation` як розширена версія з явним посиланням "see also")
- [ ] Glossary `mixture-of-experts` vs `mixture-of-experts-vocabulary` — перевірити чи це два легітимно різні терміни (LLM-архітектура vs загальний ML-термін) чи випадковий дублікат-колізія неймспейсу з іншого проєкту (згадано як ризик в `TODO_MAIN.md` розділ F) — **не підтверджено в 3-му проході** (`glossary.ts` de-dup скан не знайшов жодного з цих двох у списку реальних дублікатів slug — можливо один з них взагалі не існує в файлі, перевірити окремо)

### Compare — той самий конкурент/продукт, дві окремі сторінки (крім вже задокументованих 3 exact-dup slug)
- [ ] `vs-accenture-ai` vs `vs-accenture-ml` — той самий конкурент (Accenture), дві сторінки з різним "AI"/"ML" в slug
- [ ] `vs-databricks-managed` vs `vs-databricks-ml` — той самий конкурент (Databricks)
- [ ] `vs-palantir` vs `vs-palantir-aip` — той самий конкурент (Palantir), другий — конкретний продукт (Foundry/AIP)
- [ ] `vs-microsoft-azure-ml` vs `vs-azure-ml` — той самий продукт (Azure ML), майже ідентичний slug
- [ ] `vs-google-vertex-ai` vs `vs-vertex-ai-platform` — той самий продукт (Google Vertex AI)
- [ ] `vs-sagemaker-managed` vs `vs-aws-sagemaker` — той самий продукт (AWS SageMaker)
- [ ] `vs-tableau-ai-analytics` vs `vs-tableau-ml` — той самий конкурент (Tableau)
- [ ] `vs-big4-ai-consulting` vs `vs-big4-consulting` — той самий генеральний конкурент-клас (Big4), майже ідентичний slug (плюс `vs-big4-ai-consulting` ОКРЕМО є exact-дублікатом slug сам із собою — див. `tech/TODO_data_integrity.md` розділ 1)
- [ ] `vs-freelance-ml-engineer` vs `vs-freelancer-ml` — той самий концепт (freelance ML), майже ідентичний slug (плюс `vs-freelance-ml-engineer` теж exact-дублікат — той самий файл)
- [ ] **Підсумок:** 9 пар "той самий конкурент/продукт, 2 різні сторінки" знайдено в `compare.ts` — значно ширша проблема, ніж 3 exact-slug-дублікати, задокументовані раніше. Дія на пару: або злити в одну ширшу сторінку, або чітко розділити title/H1/intro щоб позиціювати як різні продукти того самого вендора (напр. AWS SageMaker вокруг платформи vs AWS Bedrock — легітимно різні; але `vs-azure-ml` vs `vs-microsoft-azure-ml` виглядають як буквальний дубль одного порівняння)

- [ ] **Метод для GSC-підтвердження (після індексації):** експорт GSC Performance по URL, знайти пари сторінок що конкурують за той самий query cluster (impressions на схожі запити, обидві < позиція 15) — застосувати саме до пар вище, не до всього масиву контенту

## 2. Thin/generic content risk — Round 3/4 масові пакетні генерації

- [ ] Останні 3 хвилі міст (Sprint 69: Aberdeen–Colchester, 19 нових; плюс заплановані в розділах D/G TODO_MAIN.md) — перевірити чи кожне місто дійсно має унікальний контент (специфічні компанії/кластери/дані), чи це шаблон з підміненою назвою міста. Google легко детектує programmatic thin content на geo-сторінках
- [ ] Compare-сторінки хвилі 2 (`vs-glean-enterprise-search`, `vs-writer-enterprise-ai`, `vs-moveworks-ai` тощо) — перевірити фактичну точність порівнянь (ці платформи існують і мають конкретні фічі — помилки тут шкодять довірі більше ніж відсутність сторінки)
- [ ] Глосарій-терміни хвиля 2 (`shadow-ai`, `llmops`, `ai-trism`, `context-caching-llm` тощо) — перевірити глибину `fullDescription` (не 2 речення що дублюють короткий опис)

## 3. Внутрішнє перелінкування — orphan pages

- [ ] Перевірити чи всі 449 унікальних глосарій-термінів досяжні за ≤3 кліки з `/glossary` хабу чи relatedTerms-мережі (типова проблема: нові терміни додаються в масив, але ніхто на них не лінкує)
- [ ] Те саме для 99 resources — чи є вхідні посилання з blog/niche сторінок, чи resources лежать "мертвим вантажем", видимі лише через `/resources` листинг
- [ ] Скрипт: пройтись по кожному slug у кожному data-файлі, grep на входження цього slug як href в решті кодової бази — знайти 0-inbound-link сторінки

## 4. Freshness / update cadence

- [ ] Значна частина 286 blog-постів датована "2026" в заголовку/контенті без факту оновлення — визначити політику: чи будуть ці пости оновлюватись щорічно (2026→2027 rename+refresh), чи це one-off
- [ ] Порівняти з існуючим `calchub_rate_prose_drift` уроком з інших проєктів компанії (пам'ять: дані можуть бути коректні, а проза — застаріла) — ризик той самий тут для regulatory-контенту (FCA/EU AI Act посилання можуть застаріти)

## 5. Метрика успіху цього аудиту

- [ ] Звіт: скільки % з 286 blog-постів отримали ≥1 impression в GSC за останні 28 днів (проксі для "чи індексується й показується взагалі")
- [ ] Звіт: топ-20 сторінок за impressions, топ-20 за 0 impressions (кандидати на consolidation/redirect/deprioritise)
- [ ] Рішення: якщо >30% контенту має 0 impressions після ≥6 тижнів — **не продовжувати Phase 3 обсягу**, натомість консолідувати/покращити наявне

---

**Залежність:** пункти 1 і 5 потребують реальних GSC-даних (сайт має GSC-інтеграцію в дашборді — див. пам'ять `gsc_integration`), тобто виконати не раніше ніж контент проіндексується (мінімум 2–4 тижні після Sprint 69 деплою, тобто не раніше ~кінця липня 2026).
