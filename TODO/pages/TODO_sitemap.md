 Карта сайту (Sitemap) — codenest.com.ua
Опис: HTML-сторінка карти сайту для відвідувачів. Окремо — XML sitemap для пошукових систем. Обидва статичні.
**Статус:** Виконано
**✅ Проаналізовано 2026-05-01 — 10/12 задач виконані. Відкриті: реєстрація sitemap у GSC та Bing — після деплою.**

---

## HTML Sitemap (для людей — /sitemap)
- [x] Структурована сторінка зі всіма посиланнями сайту (`src/app/sitemap/page.tsx`)
- [x] Групування за розділами: Головна, Послуги, Маркетплейс, Ніші, Блог, Портфоліо
- [x] Іконки для кожного розділу (lucide-react)
- [x] Короткий опис кожної сторінки
- [x] Нішеві сторінки згруповані по 12 категоріях

## XML Sitemap (для пошукових систем — /sitemap.xml)
- [x] Автоматична генерація через Next.js `sitemap.ts`
- [x] Включені всі статичні сторінки (/, /about, /services/*, /portfolio, /blog, /contact тощо)
- [x] Динамічні сторінки: /blog/[slug], /portfolio/[slug], /marketplace/product/[slug]
- [x] Нішеві demo-сторінки: /niches/[slug] (всі 33)
- [x] Пріоритети (priority): Головна 1.0, Послуги/Маркетплейс 0.9, Блог пости 0.7, FAQ 0.6
- [x] Частота оновлення (changefreq): homepage — weekly, blog — daily, services — monthly
- [x] Автоматична дата lastmod через статичну генерацію
- [x] Розміщення посилання на sitemap у robots.txt

## robots.txt
- [x] Дозволити індексування всіх публічних сторінок (`src/app/robots.ts`)
- [x] Заблокувати: /admin/*, /api/*, /_next/*, /account/*
- [x] Вказати: `Sitemap: https://codenest.com.ua/sitemap.xml`

## SEO
- [x] HTML sitemap — Title: "Карта сайту | CodeNest"
- [ ] Реєстрація sitemap у Google Search Console (після деплою)
- [ ] Реєстрація sitemap у Bing Webmaster Tools (після деплою)

---

### Примітки
- XML sitemap генерується автоматично Next.js App Router — достатньо створити `app/sitemap.ts`.
- HTML sitemap корисна для SEO та UX — допомагає краулерам та користувачам знайти сторінки.


> ⚠️ **Незакреслені пункти ([ ]) — Phase 2:** потребують реального контенту (фото, тексти, відгуки), API-ключів або реєстрації в зовнішніх сервісах після деплою. Структура сторінки реалізована повністю.