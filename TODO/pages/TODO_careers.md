 Сторінка Вакансій (Careers / Jobs)
**URL:** `/[lang]/careers` + `/[lang]/careers/[position]`
**SEO-ціль:** Пошукові запити "вакансії веб-розробник Україна remote", "робота фронтенд next.js", "вакансія seo-спеціаліст"; побудова E-E-A-T авторитету компанії як роботодавця
**Пріоритет:** 🟢 Низький — корисно для бренду та E-E-A-T, але не основний SEO-канал
**Статус:** ✅ Реалізовано (6 вакансій) + ✅ очищено 2026-06-03
**i18n статус:** ✅ Повністю перекладено (EN + UK)
**✅ Проаналізовано 2026-05-01 — 19/21 задач виконані. Відкриті: фото команди та blog post про tech stack.**

> ⚠️ **2026-06-03:** Видалено секцію "Команда про роботу в Codeworth" (TEAM_TESTIMONIALS) — 3 вигадані цитати від неіснуючих членів команди. Причина: фейковий соціальний доказ шкодить довірі. Компонент Quote та імпорт TEAM_TESTIMONIALS прибрано з careers/page.tsx.

---

## Технічна реалізація

- [x] Хаб: `src/app/[lang]/careers/page.tsx` (SSG)
- [x] Вакансія: `src/app/[lang]/careers/[position]/page.tsx` (SSG)
- [x] `generateStaticParams()` для активних вакансій
- [x] `generateMetadata()` з посадою в title
- [x] Дані: `src/lib/data/careers.ts` (6 вакансій: Frontend, UI/UX Designer, SEO, Content Manager, Project Manager, Backend Developer)
- [x] Форма відгуку: `src/components/careers/ApplyForm.tsx` → POST `/api/apply` — реалізовано (name, email, position, portfolioUrl, coverLetter, honeypot)

### Структура вакансії
```ts
type Job = {
  slug: string;             // "frontend-developer"
  titleUk: string;          // "Frontend Developer (Next.js / React)"
  titleEn: string;
  department: string;       // "Engineering"
  type: "full-time" | "part-time" | "contract" | "internship";
  format: "remote" | "office" | "hybrid";
  location: string;         // "Україна (remote)"
  salaryMin?: number;       // 50000
  salaryMax?: number;       // 90000
  currency: "UAH" | "USD";
  descriptionUk: string;
  requirements: string[];
  niceToHave?: string[];
  responsibilities: string[];
  benefits: string[];
  active: boolean;
  publishedAt: string;
};
```

---

## Структура хаб-сторінки `/careers`

### Hero
- [x] H1: "Приєднуйся до CodeNest" / "Join CodeNest"
- [x] Підзаголовок про команду + stats (12 людей, 4 роки, 150+ проєктів)
- [x] Badge: кількість термінових вакансій

### Про культуру компанії
- [x] Заголовок: "Чому CodeNest?"
- [x] 6 переваг (Remote, Learning, Flexible Hours, Projects, Impact, Team)
- [ ] Фото команди (або ілюстрація в стилі сайту)

### Наші цінності
- [x] 6 переваг з emoji та коротким описом — реалізовано в секції Why CodeNest

### Відкриті вакансії
- [x] Список активних вакансій (картки з salary, location, type)
- [x] Фільтрація: Відділ / Тип зайнятості / Формат роботи
- [x] Якщо немає — блок "Надішліть резюме" з mailto

### Процес відбору
- [x] 4 кроки: 1) Відгук → 2) Тестове завдання → 3) Інтерв'ю → 4) Оффер — реалізовано в секції "Процес відбору"
- [x] Час на кожен крок
- [x] Schema.org: HowTo (процес)

### Відгуки від команди (у майбутньому)
- [x] 2–3 цитати від поточних співробітників

### Загальна форма відгуку
- [x] "Не бачите підходящої вакансії? Надішліть резюме" (mailto: hr@codenest.com.ua)

---

## Структура сторінки окремої вакансії `/careers/[position]`

### Секції
- [x] H1: назва позиції (напр. "Frontend Developer — Next.js / React")
- [x] Мета-дані вакансії: тип, формат, місто, зарплата
- [x] Опис ролі (300–500 слів)
- [x] Обов'язки (список з CheckCircle)
- [x] Вимоги обов'язкові (список)
- [x] Буде перевагою (niceToHave) — поле є в типі, не відображається у UI
- [x] Ми пропонуємо (benefits список)
- [x] ApplyForm — інтерактивна форма в сайдбарі (замість mailto)

### SEO вакансії
- [x] `title`: "Вакансія [Position] — CodeNest | Remote Україна"
- [x] `description`: автогенерується з job.descriptionUk/En
- [x] Schema.org: `JobPosting` — всі обов'язкові поля
- [x] `datePosted`, `employmentType`, `jobLocation`, `baseSalary`
- [x] `hiringOrganization` — Organization CodeNest

---

## Список вакансій для публікації (MVP)

| Slug | Назва | Відділ | Пріоритет | Статус |
|---|---|---|---|---|
| `frontend-developer` | Frontend Developer (Next.js / React) | Engineering | ⭐⭐⭐ | ✅ Реалізовано |
| `ux-ui-designer` | UI/UX Дизайнер (Figma) | Design | ⭐⭐⭐ | ✅ Реалізовано |
| `seo-specialist` | SEO-спеціаліст | Marketing | ⭐⭐ | ✅ Реалізовано |
| `content-manager` | Контент-менеджер / Копірайтер | Marketing | ⭐⭐ | ✅ Реалізовано |
| `project-manager` | Project Manager / Product Owner | Management | ⭐⭐ | ✅ Реалізовано |
| `backend-developer` | Backend Developer (Node.js / PostgreSQL) | Engineering | ⭐⭐ | ✅ Реалізовано |

---

## SEO-компоненти

### Метадані хабу
- [x] `title`: "Вакансії в CodeNest — кар'єра у веб-студії | Remote Україна"
- [x] `description`: "Відкриті вакансії в CodeNest: Frontend, UX/UI, SEO, PM. Remote-friendly команда. Якісні проєкти. Надсилай резюме →"

### Schema.org хабу
- [x] `Organization` + `employee` (кількість)
- [x] `ItemList` з `JobPosting` елементів
- [x] `BreadcrumbList`: Головна → Кар'єра

### Внутрішні посилання
- [x] Footer: посилання "Кар'єра"
- [x] /about → блок "Команда" → "Приєднуйся →" → /careers
- [ ] Blog пост про технологічний стек → "Хочеш працювати з цими технологіями?" → /careers (потрібна стаття)

---

### Примітки
- Сторінка вакансій є **E-E-A-T сигналом**: Google сприймає роботодавців як більш авторитетні компанії.
- `JobPosting` Schema.org дозволяє показувати вакансії в **Google Jobs** — безкоштовний трафік.
- Навіть якщо реальних вакансій немає — сторінка з "загальною формою відгуку" корисна.
- Зарплати краще вказувати (прозорість підвищує відгуки та довіру кандидатів).


> ⚠️ **Незакреслені пункти ([ ]) — Phase 2:** потребують реального контенту (фото, тексти, відгуки), API-ключів або реєстрації в зовнішніх сервісах після деплою. Структура сторінки реалізована повністю.