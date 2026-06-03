# Заміна емодзі на SVG-іконки (професіоналізація UI)

**Статус:** 🟡 В роботі (розпочато 2026-06-02)
**Пріоритет:** 🔴 Високий — емодзі виглядають непрофесійно, рендеряться по-різному на різних ОС
**Бібліотека іконок:** `lucide-react` (вже в залежностях, використовується по всьому проєкту)

---

## Масштаб (аудит 2026-06-02)

**~10,885 емодзі-символів у 353 файлах.** Топ за кількістю:

| Файл | К-сть | Тип |
|---|---|---|
| `lib/data/niches.ts` | 1337 | дані (іконки ніш, features) |
| `lib/data/portfolio.ts` | 673 | дані (поле `emoji` × 226 проєктів + інлайн) |
| `lib/data/blog.ts` | 418 | проза в контенті блогу |
| `lib/data/glossary.ts` | 281 | проза глосарію |
| `components/extras/demos/GenericDemo.tsx` | 269 | демо-контент |
| `lib/data/extras.ts` | 247 | дані доробок |
| демо портфоліо (ToyLand, TechStore, Hammam…) | 80–187 кожен | контент демо |
| `lib/data/services.ts` | 130 | дані послуг |
| `app/[lang]/marketplace/page.tsx` | 105 | UI маркетплейсу |

---

## Стратегія

**Принцип:** замінювати на **рендер-рівні** через мапінг, а не правити тисячі рядків даних, де можливо.

### Інструмент: `<EmojiIcon emoji="🏭" />` (план)
Компонент-мапер: емодзі-рядок → lucide-іконка. Одна правка рендер-сайту картки покриває сотні записів даних.
- Файл: `src/components/ui/EmojiIcon.tsx`
- Мапа ~80 найчастіших емодзі → lucide (🏭→Warehouse, 🍽️→UtensilsCrossed, 🏗️→HardHat, 🛍️→ShoppingBag, 💼→Briefcase, 📦→Package, 📋→ClipboardList, 🚚→Truck, 🧾→Receipt, 📊→BarChart3, 🛒→ShoppingCart, 📧→Mail, 📞→Phone, 💬→MessageCircle, ⚖️→Scale, 📐→Ruler, 🏆→Trophy, 📄→FileText, ✅→CheckCircle2, 🚀→Rocket, 🎓→GraduationCap, ⚡→Zap, 🔒→Lock, 🌾→Wheat, 🏥→Stethoscope, ✂️→Scissors, 🍽→UtensilsCrossed, …)
- Fallback: якщо емодзі немає в мапі — рендерити як є (поки не доповнимо мапу).

---

## Фази

### ✅ Фаза 0 — нові поверхні одразу на SVG (зроблено)
- ✅ ERP landing `/erp-development` — повністю на lucide (Warehouse, UtensilsCrossed, HardHat, ShoppingBag, Briefcase, Database, Workflow, Rocket…) — `2026-06-02`

### ✅ Фаза 1 — ERP-демо (зроблено 2026-06-02)
- ✅ WholesaleHub: nav-іконки 📦📋🚚🧾📊🛒 → lucide (Package, ClipboardList, Truck, Receipt, BarChart3, ShoppingCart)
- ✅ ChainOps: емодзі відсутні (чисто)
- ✅ BuildTrack: типи документів 📐🏆⚖️📊📄 → lucide (Ruler, Award, Scale, BarChart3, FileText) через `DOC_ICON` мапу
- ✅ RetailCore: емодзі відсутні; AgencyDesk: 📋 → lucide ClipboardCheck
- ✅ Footer/Header: 🚀 «Для стартапів» → lucide Rocket
- ⬜ portfolio.ts: поле `emoji` 5 ERP-кейсів (🏭🍽️🏗️🛍️💼) — лишається на Фазу 2 (через EmojiIcon на рендері картки)

### ⬜ Фаза 2 — структурний chrome (висока видимість, мало правок)
- ⬜ Створити `EmojiIcon.tsx` + мапу
- ⬜ Картка портфоліо (рендер `project.emoji`) → EmojiIcon → покриває всі 226 проєктів (вкл. 5 ERP)
- ⬜ Картка ніші (`niches.ts` icon) → EmojiIcon → покриває всі ніші
- ⬜ Картка послуги/доробки → EmojiIcon
- ⬜ marketplace/page.tsx UI-емодзі (105) → lucide/EmojiIcon

### ⬜ Фаза 3 — демо портфоліо (контент усередині демо клієнтів)
- ⬜ ~140 демо-компонентів містять емодзі як декор контенту. Нижчий пріоритет (це симуляції сайтів клієнтів, де емодзі інколи доречні). Пройти топ-20 за кількістю.

### ⬜ Фаза 4 — проза в даних (блог, глосарій, FAQ)
- ⬜ blog.ts (418), glossary.ts (281) — емодзі в тілі статей. Найнижчий пріоритет — це контент, не UI-chrome. Вирішити чи чистити взагалі (інколи доречно в прозі).

---

## Нотатки / рішення
- ⚠️ НЕ робити сліпий regex-replace емодзі на порожньо — зламає верстку (емодзі часто єдиний вміст `<span>`/іконки-кружечка).
- Кожен емодзі потребує **семантичної** іконки (контекст), тому повний автоматичний прохід неможливий — потрібен мапінг + ручна перевірка рендер-сайтів.
- Світлі/темні теми: lucide успадковує `currentColor`, тому працює в обох темах автоматично.
- Орієнтир якості: ERP landing `/erp-development` — еталон як має виглядати чистий SVG-UI.
