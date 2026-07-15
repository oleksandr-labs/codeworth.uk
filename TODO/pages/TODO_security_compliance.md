# Нова сторінка: Security & Compliance / Trust

**URL (пропозиція):** `/[lang]/security` (EN primary) або `/[lang]/trust`
**Пріоритет:** 🟡 Середній (Phase 2 у [TODO_ROADMAP.md](../TODO_ROADMAP.md))
**Статус:** ❌ Не існує — сторінки немає в архітектурі `src/app/[lang]/`
**Створено:** 2026-07-12 (аудит структури TODO)

---

## Чому це потрібно

Основні ніші сайту (banking/`ml-banking`, healthcare/NHS, insurance, government/public sector, pharma — усі топові ML/AI ніші Codeworth) — регульовані галузі, де B2B-покупець (CTO, Head of Data, procurement) під час vendor evaluation **завжди** шукає сторінку про обробку даних, безпеку, і compliance-позицію постачальника, перш ніж дати доступ до даних для PoC. Зараз на сайті є лише `/privacy` і `/terms-of-service` (юридичний мінімум) — немає окремої сторінки, що відповідає на технічні/операційні security-питання, які ставить процес закупівлі в enterprise/public sector.

Це підсилює E-E-A-T без ризику fake trust claims (див. [seo/TODO_trust_authenticity.md](../seo/TODO_trust_authenticity.md)) — на відміну від fake reviews/logos, чесна сторінка про поточний стан безпеки (навіть якщо сертифікацій ще немає) є валідним і чесним довіра-сигналом.

## Принцип: чесність про поточний стан, без вигаданих сертифікацій

**Критично:** НЕ додавати бейджі ISO 27001 / SOC 2 / Cyber Essentials, якщо сертифікації немає. Сайт вже мав інцидент з фейковими trust-claims (реальний клієнт скаржився, `TODO_improvements_june_2026.md`). Ця сторінка має чесно описувати:
- Поточні практики (навіть базові — HTTPS/TLS, GDPR-процес, NDA-за-замовчуванням для PoC)
- Roadmap до формальних сертифікацій, якщо є намір (не обіцяти дат, якщо невідомо)
- Явно не стверджувати наявність сертифікації, якої немає

## Зміст сторінки

### 1. Data handling & privacy
- [ ] Де зберігаються клієнтські дані під час PoC/проєкту (Hetzner EU датацентр — реальний факт, можна вказати)
- [ ] Політика видалення даних після завершення проєкту
- [ ] Посилання на `/privacy` для повної Privacy Policy

### 2. Sub-processors (третьосторонні AI-провайдери)
- [ ] Список LLM/ML API-провайдерів, через які може проходити клієнтський контент, якщо релевантно (OpenAI/Anthropic/Google API — залежно від того що реально використовується в проєктах) — важливо для GDPR data processing agreement обговорень
- [ ] Пояснення: чи можливий on-prem/sovereign deployment для регульованих клієнтів (пов'язати з глосарій-терміном `sovereign-ai`, вже є в `glossary.ts`)

### 3. NDA & confidentiality
- [ ] Стандартна практика NDA перед PoC (якщо це реальна практика агенції)
- [ ] IP ownership — хто володіє моделлю/кодом після завершення проєкту

### 4. Regulatory awareness (не сертифікація, а компетенція)
- [ ] Посилання на релевантний блог-контент, що вже є: `ml-governance-framework-uk-2026`, `eu-ai-act-uk-impact-2026`, `responsible-ai-uk-2026`, `gdpr-machine-learning-uk` — показати що команда розуміє FCA/NHS DSP Toolkit/EU AI Act контекст (вже написано, просто перелінкувати)
- [ ] Секція "Що ми знаємо про [FCA SS1/23 / NHS DSP Toolkit / EU AI Act]" з посиланнями на відповідні блог-guide (не claim про офіційну акредитацію)

### 5. Infrastructure & operational security
- [ ] TLS/HTTPS, CSP/HSTS headers (вже реалізовано в `next.config.ts` — factually correct claim, безпечно вказати)
- [ ] Uptime/monitoring підхід (якщо є щось реальне)

### 6. Roadmap (чесно позначений як план, не факт)
- [ ] "Сертифікації, які ми плануємо" — окрема секція з явним "planned"/"in progress" статусом, не badge-іконки що виглядають як вже отримані

## Технічна реалізація

- [ ] `src/app/[lang]/security/page.tsx` — новий route, SSG, слідувати патерну `privacy/page.tsx` (той самий рівень простоти — статичний контент, без data-файлу)
- [ ] Schema.org: `WebPage` достатньо, НЕ `Organization` з fake `hasCredential`
- [ ] Додати посилання в Footer (поруч з Privacy/Terms) і в `/partners` сторінку
- [ ] Додати в sitemap
- [ ] i18n: EN primary + UK переклад

## Внутрішні посилання (вхідні)

- [ ] `/pricing` FAQ — питання "Is our data safe?" → посилання на `/security`
- [ ] `/contact` — маленьке посилання під формою "How we handle your data →"
- [ ] Нішеві сторінки regulated-секторів (`/ml/banking`, `/ai/healthcare`, `/ml/government-public-sector` тощо) — cross-link на `/security` там де вже є FAQ про compliance

---

**Оцінка обсягу:** 1 нова сторінка, здебільшого текстовий контент + кілька cross-links. Малий технічний scope, головна робота — точний, чесний текст (без юридичних/трастових перебільшень).
