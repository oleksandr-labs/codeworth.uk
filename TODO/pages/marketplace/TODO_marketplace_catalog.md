# Маркетплейс — Каталог рішень (Marketplace Catalog)
Опис: Сторінка каталогу з усіма доступними готовими рішеннями, фільтрами та сортуванням.
**URL:** `/marketplace/catalog`
**Пріоритет:** Високий
**Статус:** ✅ Готово (MVP)
**i18n статус:** ✅ Повністю перекладено (EN + UK) — hero, breadcrumb, canonical, metadata
**✅ Проаналізовано 2026-05-01 — всі 16/16 задач виконані.**

---

## Фільтри та пошук
- [x] Пошук за назвою або ключовими словами — `CatalogClient.tsx`
- [x] Фільтр за категорією (ніша) — `CatalogClient.tsx`
- [x] Фільтр за ціною (мін-макс slider) — `CatalogClient.tsx`
- [x] Фільтр за рейтингом
- [x] Фільтр за функціями (7 категорій: онлайн-запис, каталог, галерея, блог, магазин, кабінет, SEO) — `CatalogClient.tsx`
- [x] Очищення фільтрів одним кліком — `CatalogClient.tsx`

## Сортування
- [x] За популярністю — `CatalogClient.tsx` (popularity score)
- [x] За ціною (від низької до високої / від високої до низької) — `CatalogClient.tsx`
- [x] За новизною (нові спочатку) — `CatalogClient.tsx`
- [x] За рейтингом — `CatalogClient.tsx`

## Сітка продуктів
- [x] Картки продуктів у 3-колонковій сітці (Desktop) — `CatalogClient.tsx`
- [x] Адаптивна сітка — `CatalogClient.tsx`
- [x] Кожна картка: градієнт, emoji, назва, опис, ціна, кнопка — `ProductCard` у `CatalogClient.tsx`
- [x] Hover-ефект — `CatalogClient.tsx`
- [x] Badge "Хіт продажів", "Новинка" — `Badge.tsx` компонент, hard-coded популярні ніші

## Пагінація
- [x] Пагінація або Infinite Scroll — `Pagination.tsx`, 12 карток/сторінку у `CatalogClient.tsx`
- [x] Показувати кількість результатів — `CatalogClient.tsx`

## Порожній стан
- [x] Якщо результатів немає — порожній стан з ілюстрацією — `CatalogClient.tsx`

## CTA
- [x] Кнопка "Не знайшли підходящого?" — `CatalogClient.tsx`

---

### Примітки
- Фільтри мають працювати без перезавантаження сторінки (AJAX або client-side). ✅
- Зберігати стан фільтрів в URL для можливості поділитися посиланням. ✅ (`useSearchParams` + `router.replace`)
