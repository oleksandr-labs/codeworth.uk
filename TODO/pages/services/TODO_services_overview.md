# Огляд послуг (Services Overview) — codeworth.uk
Опис: Головна сторінка розділу "Послуги". Статична (SSG), SEO-оптимізована.
**Статус:** ✅ Готово — **ОНОВЛЕНО 2026-07-09: у коді вже 7 сервісів, а не 2.** `src/lib/data/services.ts` (~1500 рядків) містить повний контент+FAQ+JSON-LD для: artificial-intelligence, machine-learning, nlp, computer-vision, mlops, llm-rag, predictive-analytics. Секція нижче застаріла й описує стан на момент "AI+ML MVP" — залишена для історії, актуальні задачі по кожному сервісу дивись у розділі "SEO-аудит послуг (2026-07-09)" нижче.
**i18n статус:** ✅ Повністю перекладено (EN + UK)

---

## Послуги (застаріло — фактично вже 7 карток)
- [x] Artificial Intelligence (штучний інтелект для бізнесу)
- [x] Machine Learning (кастомні ML-моделі, предиктивна аналітика)
- [x] NLP, Computer Vision, MLOps, LLM/RAG, Predictive Analytics — вже в коді (services.ts), відсутні у списку вище

## Hero-секція
- [x] Заголовок + підзаголовок + CTA "Обговорити проєкт"

## Процес роботи
- [x] 4-крокова схема: Аудит → PoC → Розробка → MLOps

## CTA-блок
- [x] CTASection в кінці сторінки

## FAQ-секція
- [ ] FAQ 10 питань про AI/ML послуги (EN + UK)
- [ ] Schema.org FAQPage JSON-LD

## SEO
- [ ] Title: "AI & Machine Learning Services | Codeworth"
- [ ] Meta Description: оновити під AI/ML
- [ ] Schema.org: ItemList (AI + ML services)
- [ ] Internal links до /services/artificial-intelligence та /services/machine-learning

## TODO (переробка)
- [ ] Прибрати всі згадки старих 19 послуг (web dev, ecommerce, etc.)
- [ ] Оновити заголовки та тексти під AI/ML позиціонування
- [ ] Оновити статистику: не "14 послуг" а "AI + ML спеціалізація"

## SEO-аудит послуг (2026-07-09)
Джерело: повний код-аудит `services.ts`, `[slug]/page.tsx`, `services/page.tsx`, `ServicesSection.tsx` (homepage), `ServiceStickyCta.tsx`, `FAQSection.tsx`. Деталі по schema/hreflang — у TODO/seo/TODO_metadata.md, TODO/seo/TODO_internal_links.md, TODO/pages/TODO_faq.md (перехресні посилання нижче).

### ✅ ВИПРАВЛЕНО 2026-07-09 — розбиті посилання з головної
- [x] `src/components/home/ServicesSection.tsx` переписано: більше не хардкодить 8 карток з вигаданими slug (`ml-models`, `fraud-detection`, `ai-chatbots`, `ai-consulting`), тепер ітерує `SERVICES_DATA`/`getServiceLocalized` (7 реальних сервісів), як і `services/page.tsx`. Дрейф структурно неможливий.
- [x] Додано регресійний тест `internal-links.test.ts` → "homepage ServicesSection only links to real service slugs" (грепає компонент на хардкоджені `/services/:slug` і звіряє з `SERVICES_DATA`).
- [x] Оновлено застарілі тести `HomeHero.test.tsx` / `HomeComponents.test.tsx`, які раніше асертували на СТАРІ биті slug/заголовки (тести кодували баг як "очікувану поведінку").

### ✅ ВИПРАВЛЕНО 2026-07-09 — bundle/CWV: демо-компоненти code-split
- [x] `[slug]/page.tsx`: `AiCopywriterDemo`, `AiEdtechDemo`, `AiHospitalityDemo`, `MLOpsPipelineDiagram`, `DatasetCalculator` тепер через `next/dynamic` — JS не вантажиться на 5 сторінках, які їх не використовують.

### Контент-глибина: інтерактивні інструменти лише на 2/7 сторінок (без змін — не інтерактив, а bundle-фікс вище)
- [ ] `MLOpsPipelineDiagram`, `DatasetCalculator`, ML APIs каталог, 3 live AI-демо — досі рендеряться лише для artificial-intelligence і machine-learning (тепер щонайменше без зайвого JS на інших сторінках). NLP, Computer Vision, MLOps, LLM/RAG, Predictive Analytics все ще не мають еквівалентного інтерактиву → нижчий dwell-time відносно повноти їхнього FAQ/feature-контенту.
- [ ] Розглянути легкий перевикористовуваний інструмент (напр. загальний калькулятор "чи готовий ваш датасет/документи/зображення") для решти 5 сервісів.

### ✅ ВИПРАВЛЕНО 2026-07-09 — гео-модифікатор у title
- [x] `SERVICES_EN["artificial-intelligence"].title` → "AI Development Services UK", `SERVICES_EN["machine-learning"].title` → "Machine Learning Development Services UK" (5 інших сервісів вже мали "... Services UK" у назві).

## SEO-аудит послуг, раунд 2 (2026-07-09)
Друга, глибша хвиля коду-аудиту — нові кути, не перетинаються з раундом 1 вище.

### ✅ ВИПРАВЛЕНО 2026-07-09 — мова FAQ перемішана на українських сторінках послуг
- [x] `nlp` (5 питань), `computer-vision` (5 питань), `mlops` (5 питань) — англійські Q&A з базового `SERVICES_DATA` масиву перекладені на українську; оригінальні англійські версії перенесені у відповідні `SERVICES_EN[slug].faq` override. FAQPage JSON-LD і видимий акордеон на `/uk/services/nlp`, `/uk/services/computer-vision`, `/uk/services/mlops` тепер повністю українською.

### ✅ ВИПРАВЛЕНО 2026-07-09 — довіра-сигнали на сторінках окремих послуг (з важливим уточненням)
- [x] `ClientLogosSection` тепер рендериться на кожній `/services/[slug]` одразу після hero, але **лише benchmark trust-бейджі** (F1 Score, GDPR/ISO 27001, latency, MLOps 24/7) — компонент отримав новий prop `showClientLogos` (default `true` на головній, `false` на сервісних сторінках).
- ⚠️ **Важливо, знайдено при цій же роботі**: спочатку я був увімкнув і client-name чипи (вигадані компанії типу "Fintechlabs", "RetailCore") на service pages. Виявилось, що `codeworth/TODO/TODO_improvements_june_2026.md` документує, що **реальний клієнт раніше скаржився саме на фейкові відгуки та невідомі компанії** — після чого `TestimonialsSection` прибрали з головної, статистику переформулювали ("Trusted by companies" → "Industries We Cover"). Client-name чипи в `ClientLogosSection` на homepage вижили той cleanup (вважаються ілюстративними, без явних тверджень "справжній клієнт"), але розширювати їх присутність на 7 нових сторінок — невиправданий ризик повторити ту саму скаргу. За рішенням користувача — прибрано з service pages, залишено тільки на головній.
- [ ] `TestimonialsSection`/`FoundingClientSection` НЕ додавати на `[slug]` без окремого рішення — обидва прямо пов'язані з тим самим fake-reviews інцидентом.

### ✅ ВИПРАВЛЕНО 2026-07-09 — structured data для тарифних пакетів
- [x] Додано `hasOfferCatalog` (`OfferCatalog` з `Offer[]`) у `serviceSchema` на основі `service.packages` — кожен пакет мапиться в `Offer` з `name`/`description`/`priceCurrency`/`price` (числова ціна витягується з рядка типу "від £1,125"; пакети "за узгодженням" віддають Offer без ціни, а не фейковий "0").

### ⚠️ AggregateRating/Review — НЕ реалізовано навмисно (ризик Google policy)
- [ ] Перевірено `src/lib/data/reviews.ts`: усі записи (`REVIEWS`) мають `verified: true`, але автор/компанія — очевидно вигадані маркетингові приклади (той самий патерн, що й анонімізовані кейс-стаді "SupportML"/"BrandPulse"), а не реальні відгуки клієнтів. Google explicit забороняє self-authored/fake review markup для `Review`/`AggregateRating` — рich results можуть бути вручну прибрані за це. **Не підключати ці дані до Service schema, поки не з'являться справжні верифіковані відгуки** (мін. 5, реальні клієнти). Коли з'являться реальні відгуки — підключити саме до `Service` schema на сторінках послуг (не лише Organization).

### Немає жодного зображення в шаблоні послуги
- [ ] Grep по `next/image`/`<img>`/`Image` по всьому `src/` — збіги лише в тестах, `location/[city]/page.tsx`, `proxy.ts`, `utils.ts`; у `services/` — жодного. Весь шаблон (hero, features, tech stack, пакети, кейси) — Tailwind-картки + Lucide-іконки + emoji (`EmojiIcon`), без діаграм/скріншотів/ілюстрацій/фото команди. Єдиний візуальний артефакт — `og:image` (`/og/services/${slug}.png`, існування не перевірено). Підсилює "тонкий контент" з round 1 чисто структурною причиною — немає навіть інвентарю зображень для alt-текстів. (Дублюється в TODO/seo/TODO_technical_seo.md — не виправляти двічі.)

### ✅ ВИПРАВЛЕНО 2026-07-09 — sitemap priority
- [x] `sitemap.ts`: `artificial-intelligence` та `machine-learning` тепер `priority: 0.9` (флагманський статус, окремі `/ai` `/ml` хаби), решта 5 сервісів лишились на `0.8`.
