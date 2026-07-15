# Accessibility & Core Web Vitals

**Пріоритет:** 🟡 Середній
**Створено:** 2026-07-12 (4-й прохід аудиту TODO-дерева) — до цього моменту в TODO-дереві НЕ було жодного файлу, присвяченого саме accessibility/a11y як окремій темі (лише розкидані згадки в `design/TODO_responsive.md`, `seo/TODO_technical_seo.md`, `tech/TODO_testing.md`)
**Методологія:** нижче — лише те, що реально видно в репозиторії (config-файли, CI workflow). **Жодних lighthouse-скорів чи accessibility-показників не вигадано** — де даних немає, чесно позначено "невідомо/не виміряно".

---

## 1. Що реально є в репо (перевірено читанням файлів)

- ✅ `.github/workflows/lighthouse.yml` — Lighthouse CI workflow, запускається на `pull_request` до `main`/`develop`, використовує `@lhci/cli@0.14.x autorun`, вивантажує результати як GitHub Actions artifact (`lighthouse-results`, retention 14 днів) на `temporary-public-storage` (не в репо)
- ⚠️ **Знайдено 2 конфлікт-файли конфігурації Lighthouse CI, різного змісту:**
  - `.lighthouserc.json` (з крапкою) — це файл, який `lhci autorun` **використовує за замовчуванням** (workflow не передає `--config=`, тож резолвиться стандартний пошук `.lighthouserc.json`)
  - `lighthouserc.json` (без крапки) — **ймовірно НЕ використовується взагалі** (не збігається зі стандартним ім'ям, яке шукає lhci без явного `--config`)
- 🔴 **`.lighthouserc.json` (реально активний файл) містить URL, які вже НЕ існують:** `http://localhost:3000/marketplace/catalog` — маршрут `/marketplace/*` видалено повністю в Sprint 2026-07-02 (`TODO_REMOVE_LEGACY_ECOMMERCE.md`). Кожен CI-прогін Lighthouse зараз аудитить 404-сторінку замість реальної, що: (а) спотворює агрегований результат, (б) не тестує жодну programmatic-сторінку (blog/portfolio/compare/glossary — 0% покриття Lighthouse), (в) URL-и без локалі (`/services` замість `/en/services`) — може резолвитись через redirect/middleware, не перевірено чи це впливає на скор
- ✅ Неактивний (ймовірно) `lighthouserc.json` (без крапки) має кращий набір URL: `/en`, `/en/services`, `/en/portfolio`, `/en/blog`, `/en/ai`, `/en/ml` — локалізовані, без видалених роутів — але оскільки схоже що не підхоплюється CI, це мертвий конфіг

## 2. Пороги (assertions), задані в активному `.lighthouserc.json`

| Категорія | Поріг | Рівень |
|---|---|---|
| Performance | ≥ 0.80 | warn (не блокує PR) |
| Accessibility | ≥ 0.85 | **error (блокує PR)** |
| Best Practices | ≥ 0.85 | warn |
| SEO | ≥ 0.90 | **error (блокує PR)** |
| FCP | ≤ 2000ms | warn |
| LCP | ≤ 2500ms | warn |
| CLS | ≤ 0.1 | **error** |
| TBT | ≤ 300ms | warn |
| TTI | ≤ 3500ms | warn |

Неактивний `lighthouserc.json` (без крапки) має ТРОХИ вищі пороги (accessibility ≥ 0.90, SEO ≥ 0.95, performance ≥ 0.85) — якщо він колись мався на увазі як "цільовий" конфіг, а `.lighthouserc.json` — старіший чорновик, це варто з'ясувати перед вибором, який файл лишати.

## 3. Чого НЕ відомо (чесно, не вигадано)

- ❓ **Фактичні результати останніх CI-прогонів Lighthouse** — не видно з репозиторію (артефакти йдуть на `temporary-public-storage`, не зберігаються в репо; `gh run list --workflow=lighthouse.yml` з цього середовища не повернув даних — або немає прогонів, або немає доступу до GH API звідси). **Не відомо, чи PR зараз проходять/провалюють accessibility-поріг 0.85.**
- ❓ Чи є в коді свідомі accessibility-практики (ARIA-атрибути, focus management, skip-links, contrast) — **не перевірено в цьому проході**, це окрема задача (grep по `aria-`, `role=`, `tabIndex`, `alt=` покриттю зображень)
- ❓ Чи є ручний accessibility-аудит (screen reader testing, keyboard navigation) — жодних згадок в жодному TODO-файлі
- ❓ Реальні Core Web Vitals з real-user monitoring (RUM) — `tech/TODO_optimization.md` вже позначає це як "потребує live-трафіку/платних сервісів", не виміряно

## 4. Дії

- [ ] **Найкритичніше:** виправити `.lighthouserc.json` (активний файл) — прибрати `/marketplace/catalog` (404), замінити на реальні поточні URL за зразком неактивного `lighthouserc.json` (`/en`, `/en/services`, `/en/portfolio`, `/en/blog`), і додати ще: `/en/glossary/[якийсь-term]`, `/en/compare/[якийсь-slug]`, `/en/location/[якесь-місто]` — жоден programmatic-тип сторінок зараз не покритий Lighthouse CI взагалі
- [ ] Вирішити долю дублюючого `lighthouserc.json` (без крапки) — видалити як мертвий конфіг, або перейменувати на `.lighthouserc.json` якщо це насправді цільова версія (звірити з автором останнього коміту, який його чіпав)
- [ ] Перевірити останні N прогонів `lighthouse.yml` в Actions UI (доступ є лише в GitHub, не тут) — записати фактичні скори в цей файл замість "невідомо"
- [ ] Провести окремий grep-аудит ARIA/alt/contrast (окрема задача, не зроблено в цьому проході — позначити як TODO, не результат)
- [ ] Розглянути `axe-core`/`@axe-core/playwright` як доповнення до Lighthouse accessibility-скору (Lighthouse a11y-аудит неповний — типово покриває ~30-40% WCAG критеріїв)

---

**Примітка:** цей файл навмисно не містить жодних конкретних accessibility-показників сайту (naприклад "72% сторінок мають alt-теги") — така статистика в цьому проході не збиралась і видумувати її означало б порушити принцип "не вигадуй цифри, яких не бачив".
