 Клієнтська Адмін-Панель (Client Admin Panel)

**Концепція:** Коли клієнт купує готове рішення (нішевий сайт), він отримує доступ до власної адмін-панелі де може управляти контентом свого сайту без технічних знань.

**URL:** `/dashboard` (клієнтський кабінет) — окремо від `/admin/marketplace` (наша адмінка)

**База:** Взяти за основу існуючий `AdminClient.tsx` (`/admin/marketplace`) — адаптувати під клієнтський UX, прибрати зайве (фінанси наші, наші замовлення), додати нішеві модулі.

**Статус:** 🚧 В розробці — MVP реалізовано

---

> ⚠️ **Незакреслені пункти ([ ]) — Phase 2/3:** потребують реального backend (NextAuth, PostgreSQL, Row Level Security). Реалізуються після деплою та налаштування БД.


## Концептуальна різниця

| | Наша адмінка (`/admin/marketplace`) | Клієнтська (`/dashboard`) |
|---|---|---|
| Хто користується | Ми (CodeNest) | Клієнт (покупець сайту) |
| Що управляє | Наші замовлення, продукти, доходи | Контент свого сайту |
| Технічний рівень | Технічний | Нетехнічний — все через UI |
| Доступ | Тільки наша команда | Кожен клієнт свій кабінет |

---

## Чек-ліст завдань

### Фаза 0: Підготовка та виправлення `/admin/marketplace`

- [x] Прочитати і зрозуміти структуру `AdminClient.tsx` (834 рядки)
- [x] ~~Виправити мобільний sidebar~~ (`hidden md:flex` → `flex` + мобільне меню) — ✅ DONE: додано mobile hamburger меню та overlay

### Фаза 1: Файлова структура

- [x] Створити `src/app/[lang]/dashboard/page.tsx` (server component з metadata + auth guard)
- [x] Створити `src/app/[lang]/dashboard/DashboardClient.tsx` (main shell)

### Фаза 2: DashboardClient — Головна оболонка

- [x] Sidebar (темний, `w-60 bg-gray-950`) з іконками та лейблами
  - [x] Вкладки: Home, Content, Customizer, Analytics, Subscription, Support, Settings
  - [x] User info внизу (avatar + email + Log Out)
  - [x] "View my site" посилання в header
- [x] Мобільний hamburger + overlay sidebar (аналог до того, що зробили для `/admin`)
- [x] Top bar: назва поточної вкладки + "View Site" link

### Фаза 3: Вкладка Home (Dashboard Home)

- [x] Привітання: "Welcome back, [Name]" + назва сайту
- [x] Статус сайту: ✅ Active / ⚠️ Needs attention badge
- [x] KPI-картки (mock): Visitors (week), Leads, Bookings, Uptime
- [x] Останні дії (лог змін, mock дані)
- [x] Quick Actions: "Update Content", "Change Colors", "Contact Support"

### Фаза 4: Вкладка Content (управління контентом)

- [x] Секція "General Info": Company name, Tagline, Description (textarea)
- [x] Секція "Contact Info": Phone, Email, Address, Website
- [x] Секція "Working Hours": Mon-Fri / Sat / Sun (time inputs)
- [x] Секція "Social Media": Instagram, Facebook, TikTok, YouTube (URL inputs)
- [x] Секція "Hero Section": Heading, Subheading, CTA Button text
- [x] Кнопка "Save Changes" → toast notification "Changes saved!"

### Фаза 5: Вкладка Customizer (Visual Customizer інтеграція)

- [x] 6 кольорових палет (Professional/Ocean/Forest/Sunset/Rose/Midnight)
  - [x] Кнопки з кольоровими кружками, активна палета підсвічена
  - [x] Live preview: mock iframe або блок що змінює кольори в реальному часі
- [x] 5 шрифтових пар (Modern/Classic/Tech/Friendly/Bold)
  - [x] Кнопки з назвами шрифтів
  - [x] Preview тексту що змінює шрифт
- [x] Кнопка "Save & Publish" → підтвердження

### Фаза 6: Вкладка Analytics (аналітика)

- [x] Графік відвідувань за 7 днів (CSS-bar chart, mock дані)
- [x] Top сторінки (список з % від трафіку)
- [x] Джерела трафіку (Organic / Direct / Social / Referral)
- [x] Конверсії: форм відправлено, дзвінків, email clicks

### Фаза 7: Вкладка Subscription (підписка)

- [x] Поточний план (Basic / Standard / Premium) з зеленим badge
- [x] Що входить в план (список features)
- [x] Дата наступного платежу (mock)
- [x] Кнопка "Upgrade Plan" → `/marketplace/catalog`
- [x] Кнопка "Contact us" для кастомних питань

### Фаза 8: Вкладка Support (підтримка)

- [x] FAQ accordion (5-6 популярних питань)
- [x] Форма "Send us a message": тема + опис + кнопка Send
- [x] Контактна інформація CodeNest (email, Telegram)

### Фаза 9: Вкладка Settings

- [x] Profile: First name, Last name, Email (read-only)
- [x] Password change: Current / New / Confirm (mock)
- [x] Notification preferences: email notifications toggle
- [x] Danger zone: "Delete account" (disabled, контактуйте підтримку)

---

## Фаза 2 (після MVP): Нішеві модулі

### Модуль Content → Niche-specific tabs

- [ ] Ресторан: Меню (категорії + страви + ціни), Акції, Графік роботи
- [ ] Салон краси: Послуги (назва/ціна/тривалість/майстер), Команда, Онлайн-запис
- [ ] Медична клініка: Лікарі, Послуги, Записи
- [ ] Фітнес-клуб: Розклад занять, Абонементи, Тренери
- [ ] Магазин: Каталог товарів, Замовлення, Промокоди

---

## Безпека (для production)

- [ ] NextAuth.js: роль `client` vs `admin`
- [ ] Middleware перевірка `role === 'client'` і `siteId`
- [ ] Row Level Security — кожен клієнт бачить тільки свій контент
- [ ] Rate limiting на API routes
- [ ] Audit log (хто що змінив і коли)

---

## Архітектура

### URL структура
```
/dashboard                    → Home (client dashboard)
/dashboard/content            → Content management
/dashboard/customizer         → Visual Customizer
/dashboard/analytics          → Analytics
/dashboard/subscription       → Plan & billing
/dashboard/support            → Help & support
/dashboard/settings           → Account settings
```

### Технічний стек
- Next.js App Router + TypeScript
- Tailwind CSS v4
- Базується на `AdminClient.tsx` патернах (useState tabs, sidebar, KPI cards)
- `useAuth` hook з `role === 'client'` guard
- `useLocale()` для мовного перемикача

### Файлова структура (реалізована)
```
src/app/[lang]/dashboard/
  ├── page.tsx                → Server component (metadata + render DashboardClient)
  └── DashboardClient.tsx     → Full client shell (sidebar + all tabs)
```
