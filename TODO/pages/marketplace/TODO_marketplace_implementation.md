# Маркетплейс — Приклад реалізації MVP (Marketplace Implementation)
Опис: Технічна документація та план реалізації MVP маркетплейсу.
**Статус:** Не розпочато
**✅ Проаналізовано 2026-05-01 — 0/40 задач. Це технічна документація для повноцінного backend маркетплейсу (Phase 2). Поточний MVP — статичний SSG frontend без реального e-commerce backend. Блокер: потрібна БД (Supabase/PlanetScale) + платіжна система.**

---

## Технологічний стек (рекомендований)

### Frontend
- [x] Next.js 14+ (App Router) — ✅ Next.js 16.2.0
- [x] TypeScript — ✅ TS ^5
- [x] Tailwind CSS — ✅ Tailwind ^4
- [ ] ⚠️ shadcn/ui або Radix UI — використовуємо власні компоненти + lucide-react (не потрібно)
- [ ] ⚠️ React Hook Form — використовуємо native HTML forms (не потрібно)
- [x] Zod (валідація) — ✅ Zod ^4.3.6 (`src/lib/schemas.ts`)

### Backend
- [x] Next.js API Routes — ✅ `src/app/api/*` (contact, order, liqpay, newsletter, recaptcha)
- [ ] ⚠️ Phase 2: PostgreSQL (основна БД)
- [ ] ⚠️ Phase 2: Prisma ORM
- [ ] ⚠️ Phase 2: NextAuth.js (авторизація)

### Платежі
- [x] LiqPay SDK — ✅ `/api/liqpay/create` + `/api/liqpay/callback` (2026-05-03)
- [x] Webhook для обробки платежів — ✅ LiqPay callback handler

### Хостинг
- [ ] Vercel (frontend + API routes)
- [ ] Supabase або Railway (PostgreSQL)
- [ ] AWS S3 або Cloudinary (зображення)

### CMS (опціонально)
- [ ] Sanity.io або Strapi для керування продуктами

---

## Структура бази даних

### Таблиці:
- [ ] `users` — користувачі (id, email, password_hash, role, created_at)
- [ ] `products` — продукти (id, name, slug, description, price, category_id, images, demo_url, created_at)
- [ ] `categories` — категорії ніш (id, name, slug, icon)
- [ ] `orders` — замовлення (id, user_id, product_id, package_type, status, total, created_at)
- [ ] `order_details` — деталі замовлення (domain, business_name, notes)
- [ ] `payments` — платежі (id, order_id, amount, status, payment_method, transaction_id)
- [ ] `reviews` — відгуки (id, product_id, user_id, rating, comment, created_at)

### Зв'язки:
- [ ] `products` → `categories` (many-to-one)
- [ ] `orders` → `users` (many-to-one)
- [ ] `orders` → `products` (many-to-one)
- [ ] `reviews` → `products`, `users` (many-to-one)

---

## MVP Features (мінімальний набір)

### Публічна частина:
- [x] Головна маркетплейсу — ✅ `/[lang]/marketplace/page.tsx`
- [x] Каталог з фільтрами — ✅ `/marketplace/catalog/` + фільтри
- [x] Сторінка продукту з Live Demo — ✅ `/marketplace/product/[slug]/` + посилання на `/niches/[slug]` demo
- [x] Кошик — ✅ `/marketplace/cart/` (`CartClient.tsx`, `CartSummary.tsx`)
- [x] Оформлення замовлення — ✅ `/marketplace/checkout/` (`CheckoutForm.tsx`)
- [x] Інтеграція з LiqPay — ✅ `/api/liqpay/create` + `/api/liqpay/callback` (2026-05-03)

### Користувацька частина:
- [x] Реєстрація/вхід — ✅ UI готовий: `/marketplace/login/` (`LoginForm.tsx`); ⚠️ Phase 2: persistence
- [x] Особистий кабінет — ✅ UI готовий: `/marketplace/account/` (`AccountClient.tsx`); ⚠️ Phase 2: persistence
- [x] Перегляд замовлень — ✅ UI у `AccountClient.tsx`; ⚠️ Phase 2: реальні дані з БД

### Адміністративна частина:
- [x] Управління продуктами (CRUD) — ✅ UI: `/admin/marketplace/` (`AdminClient.tsx`); ⚠️ Phase 2: persistence
- [x] Перегляд замовлень — ✅ UI готовий; ⚠️ Phase 2: реальні дані
- [x] Зміна статусів замовлень — ✅ UI готовий; ⚠️ Phase 2: persistence + auth middleware

---

## Етапи розробки MVP

### Етап 1: Підготовка (1 тиждень)
- [ ] Дизайн (Figma) головних сторінок
- [ ] Налаштування проєкту (Next.js, PostgreSQL, Prisma)
- [ ] Налаштування авторизації (NextAuth)

### Етап 2: Публічна частина (2-3 тижні)
- [ ] Головна маркетплейсу
- [ ] Каталог з фільтрами
- [ ] Сторінка продукту
- [ ] Кошик та Checkout

### Етап 3: Платежі (1 тиждень)
- [ ] Інтеграція платіжної системи
- [ ] Webhook для підтвердження оплати
- [ ] Email-сповіщення

### Етап 4: Кабінет користувача (1 тиждень)
- [ ] Dashboard та список замовлень
- [ ] Налаштування профілю

### Етап 5: Адмін-панель (2 тижні)
- [ ] CRUD для продуктів
- [ ] Управління замовленнями
- [ ] Базова аналітика

### Етап 6: Тестування та запуск (1 тиждень)
- [ ] QA тестування
- [ ] Фікс багів
- [ ] Деплой на production

**Загальний термін MVP:** 8-10 тижнів

---

## Post-MVP розширення
- [ ] Система знижок та промокодів
- [ ] Реферальна програма
- [ ] Підписка на підтримку (recurring payments)
- [ ] Блог про кейси маркетплейсу
- [ ] A/B тестування сторінок
- [ ] Розширена аналітика

---

### Примітки
- Почати з 5-10 готових продуктів для тестування концепції.
- Отримати перші 10 продажів для валідації ідеї перед масштабуванням.
- Автоматизувати налаштування сайтів (скрипти для швидкого деплою).
