# Site Improvements — June 2026

**Контекст:** Реальний клієнт поскаржився на фейкові відгуки та невідомі компанії. Після прибирання відгуків — комплексне покращення позиціонування, навігації та конверсії.

---

## 1. Фейкові відгуки та клієнтські претензії ✅ DONE

### 1.1 Відгуки — прибрано ✅
- ✅ `TestimonialsSection` — прибрано з головної (9 фейкових відгуків)
- ✅ `/reviews` сторінка — замінено на CTA "залиш відгук" без фейкових рейтингів
- ✅ `NicheReviews` — прибрано з 30+ нішевих сторінок
- ✅ `TEAM_TESTIMONIALS` — прибрано з careers сторінки
- ✅ `marketplace/product/[slug]` — прибрано 3 фейкові відгуки

### 1.2 Статистика — перепозиціоновано ✅
- ✅ "120+ Projects / 85+ Clients" → "120+ Templates / 60+ Niches"
- ✅ "98% Satisfied" → "Core Web Vitals 90+"
- ✅ "Real client results" (CasesSection) → "What your business can achieve"
- ✅ "Trusted by companies across Ukraine" → "Industries We Cover"
- ✅ About timeline: "First 20 clients / 85+ clients" → "First projects / 120+ templates"
- ✅ Home metadata: "120+ projects" → "120+ ready-made niche templates"

---

## 2. Services pages — прибрати fake client caseStudies ✅ DONE

**Проблема:** Кожна сторінка послуги (`/services/website-dev` тощо) показує секцію
"Реальні кейси клієнтів" з назвами компаній (BudPro, LexPro, FitLife, ModaUA...) та
конкретними метриками. Ці компанії неіснуючі.

**Рішення:**
- ✅ Перейменувати секцію: "Реальні кейси клієнтів" → "Приклади результатів"
- ✅ Не показувати `cs.client` як заголовок картки — замінити на "Нішевий приклад"
- ✅ Метрику і результат залишити (конверсійні, нічого не претендують)

**Файл:** `src/app/[lang]/services/[slug]/page.tsx` — рядок ~631

---

## 3. Навігація — Solutions dropdown ✅ DONE

**Проблема:** "Solutions/Рішення" — просте посилання. Клієнт не розуміє що за ним.

**Рішення:** Додати dropdown з NICHE_CATEGORIES (13 категорій) і посиланням "Всі рішення".

**Файл:** `src/components/layout/Header.tsx`

**Структура dropdown:**
```
🍽 Їжа та гостинність     💄 Краса та здоров'я
🏗 Будівництво            📚 Освіта та консалтинг
🚗 Авто та логістика      🛒 E-commerce та ритейл
🎨 Креатив та розваги     💻 IT та SaaS
🏥 Здоров'я та розвиток   👶 Дитяча та сімейна
🔨 Виробництво            📋 Бізнес-послуги
🌾 Агробізнес             → Всі 60+ рішень
```

---

## 4. Головна — "Founding Client" offer ✅ DONE

**Ідея:** Оскільки немає реальних клієнтів — зробити це перевагою:
"Будьте серед наших перших клієнтів — умови, яких більше не буде."

**Секція:** між `WhyUsSection` і `CasesSection` (або між MarketplaceTeaser і BlogPreview)

**Контент:**
- Заголовок: "Запрошуємо перших клієнтів"
- Підзаголовок: обмежена кількість місць, спеціальна ціна, особиста увага
- Лічильник: "Залишилось X з 10 місць" (статичне число, не динамічне)
- CTA → /contact?ref=founding

**Файл:** `src/components/home/FoundingClientSection.tsx` (новий)

---

## 5. Google Business посилання — оновити ✅ DONE

**Проблема:** Всюди посилання `https://g.page/r/codenest` — це стара назва CodeNest,
Google Business Profile для Codeworth ще не створено.

**Рішення:** Замінити посилання на `mailto:feedback@codeworth.uk` або тимчасово
прибрати зовнішнє посилання, поки профіль не буде створено.

**Файли з посиланнями:**
- `src/app/[lang]/reviews/page.tsx`

---

## 6. Services FAQ — дрібні виправлення ✅ DONE

- ✅ "37+ cases" → "37+ нішевих прикладів"
- ✅ "Most of our clients order" → "Most customers order"
- ✅ "Чи є у вас портфоліо виконаних робіт?" → відповідь оновлена

---

## 7. Подальші пріоритети (наступні сесії)

### 7.1 Контент / довіра
- [ ] Реальні фото команди (зараз placeholder)
- [ ] Реальний Google Business Profile для Codeworth
- [ ] Блог — перевірити чи всі 192 пости реально опубліковані і індексуються
- [ ] About page — team section без реальних фото виглядає порожньо

### 7.2 Конверсія
- [ ] Contact form — спростити до 3 полів (ім'я, email/телефон, тип сайту)
- [ ] Нішеві сторінки — перевірити mobile sticky CTA (чи видно кнопку на телефоні)
- [ ] A/B тест Hero CTA тексту

### 7.3 Технічне
- [ ] Google Business Profile — реєстрація після деплою
- [ ] Google Search Console — верифікація домену
- [ ] Google Analytics 4 — підключити
- [ ] Перевірити всі `g.page/r/codenest` посилання після реєстрації GBP

### 7.4 Структура / позиціонування
- [ ] Portfolio page — перевірити чи hero text правильно каже "шаблони", не "клієнти"
- [ ] Startup section `/startup` — чи є там fake client claims?
- [ ] AI/ML sections — чи є там fake client claims?
- [ ] Marketplace /product — `StarRating` досі показує зірки без відгуків, нормально?
