 Контентне SEO (Content SEO)
Опис: Стратегія контенту для органічного росту — pillar pages, topic clusters, блог, E-E-A-T сигнали.
**Статус:** Не розпочато

---

> ⚠️ **Незакреслені пункти ([ ]) — Phase 2:** потребують реального трафіку, акаунтів у SEO-інструментах або реєстрації в зовнішніх сервісах. Технічний SEO (sitemap, hreflang, schema) вже реалізовано у коді.


## Pillar Pages (Стовпні сторінки)
- [ ] Визначити 5-7 pillar topics (EN): "Web Design UK", "SEO Services UK", "E-commerce Development UK", "Website for Small Business UK", "CRM Development"
- [ ] Визначити 5-7 pillar topics (UK): "Розробка сайтів", "SEO просування", "Ecommerce сайт", "Сайт для малого бізнесу", "CRM система"
- [ ] Для кожного pillar — написати розгорнуту сторінку 2000+ слів (EN + UK)
- [ ] Кожна pillar page посилається на supporting cluster content (blog posts)
- [ ] Pillar pages → сторінки послуг (комерційний intent)

### AI / ML Topic Clusters (нові — вищий пріоритет за загальні)

**AI Pillar → Cluster структура:**
```
/services/artificial-intelligence  (pillar)
  → /ai                            (overview hub)
    → /ai/healthcare               (cluster landing) ← £3,500
    → /ai/ecommerce                (cluster landing) ← £1,500
    → /ai/fintech                  (cluster landing) ← £2,500
    → ... (10 ніш)
      → /blog/[ai-niche-post]      (supporting article)
```

**ML Pillar → Cluster структура:**
```
/services/machine-learning         (pillar)
  → /ml                            (overview hub)
    → /ml/banking                  (cluster landing) ← £8,000
    → /ml/retail                   (cluster landing) ← £5,000
    → /ml/agritech                 (cluster landing) ← £6,000 ⭐ унікально
    → ... (10 ніш)
      → /blog/[ml-niche-post]      (supporting article)
```

- [x] ~~Написати blog posts Фази 1 (6 case studies)~~ — ✅ 6/6 реалізовано (2026-05-02)
- [x] ~~Написати `ai-visual-search-ecommerce`~~ — ✅ Реалізовано
- [x] ~~Написати blog posts Фази 2 (4 posts)~~ — ✅ Всі реалізовано: `ml-demand-forecasting-retail`, `ai-resume-screening-guide`, `ml-credit-scoring-alternative-data`, `fca-ml-explainability-guide`
- ✅ Верифікувати та виправити internal links: blog → services воронка — реалізовано 2026-05-03: `CATEGORY_SERVICES` у `blog/[slug]/page.tsx` доповнено 12 пропущеними категоріями, включаючи "AI та Автоматизація" → `artificial-intelligence`, `machine-learning`, `chatbots` (55 постів тепер лінкуються коректно)

## Topic Clusters (Тематичні кластери)
- [ ] Кластер "Web Design": pillar + 8-10 blog posts ("how to design a restaurant website UK", "web design costs UK 2025"...)
- [ ] Кластер "SEO": pillar + 8-10 posts ("local SEO for small business UK", "SEO checklist 2025"...)
- [ ] Кластер "E-commerce": pillar + posts ("best ecommerce platform UK", "Shopify vs custom UK"...)
- [ ] Кластер "Niches": по 3-5 posts на кожну нішу (restaurant, beauty, fitness, law...)
- [ ] Внутрішні посилання: blog post → pillar page → сторінка послуги (воронка)

## Блог — контент-план
- [ ] Скласти контент-план на 3 місяці (EN першочергово, UK паралельно)
- [ ] Мінімум 4 статті на місяць (2 EN + 2 UK або 4 EN з перекладом)
- [ ] Типи контенту: how-to, listicles, comparison, case study, industry stats
- [ ] Орієнтуватись на запити з People Also Ask (PAA) у Google UK
- [ ] Кожна стаття: 1200+ слів, 1 ключове слово + 3-5 LSI, internal links, CTA

## E-E-A-T сигнали (Experience, Expertise, Authoritativeness, Trust)
- [ ] Розширені авторські профілі для кожного автора блогу: фото, посада, LinkedIn, DOU
- [ ] "About the Author" блок в кожній статті (Schema.org Person)
- [ ] Сторінка "Про нас" (About): команда з фото, роки досвіду, кількість проектів, сертифікати
- [ ] Додати сертифікати / партнерства (Google Partner, Meta Business, тощо) на сайт
- [ ] Відгуки клієнтів з ім'ям, компанією, фото (не анонімні)
- [ ] Кейси портфоліо: результати в цифрах (+X% трафіку, +Y% конверсія)
- [ ] Дата публікації та дата оновлення для кожної статті (Schema.org dateModified)

## Контент для Featured Snippets (Position 0)
- [ ] Відформатувати відповіді у форматі "визначення + маркований список" для ключових запитів
- [ ] Додати таблиці порівнянь (наприклад: "Website types comparison", "CMS comparison UK")
- [ ] Q&A блоки в статтях — чіткі питання і короткі (40-60 слів) відповіді
- [ ] Glossary сторінка: основні терміни веб-розробки (EN + UK) для захоплення definitional snippets
- [ ] How-to статті з нумерованими кроками (HowTo Schema.org)

## Оптимізація наявного контенту
- [ ] Content audit: переглянути всі наявні сторінки та визначити gap між наявним контентом і пошуковим попитом
- [ ] Оновити мета-описи де немає ключового слова в перших 120 символах
- [ ] Перевірити що H2/H3 заголовки містять secondary keywords (природно)
- [ ] Довжина сторінок послуг: мінімум 800 слів унікального тексту
- [ ] Додати FAQ секцію до кожної сторінки послуги (вже є Schema — переконатись є контент)

## Контент для голосового пошуку
- [ ] SpeakableSpecification Schema для ключових абзаців
- [ ] Запити у форматі "near me", "best ... in UK/Ukraine" — оптимізувати відповіді
- [ ] Conversational keywords: "What does a website cost in the UK?", "How long to build a website?"

## Відеоконтент
- [ ] YouTube канал CodeNest — відео кейси, огляди ніш, how-to
- [ ] VideoObject Schema.org для сторінок де є відео або YouTube embed
- [ ] Shorts / Reels з кейсами для соціальних сигналів

---

### Примітки
- EN контент — первинний пріоритет. UK контент — вторинний, але важливий для локального ринку.
- Принцип: 1 URL = 1 search intent. Не змішувати комерційні та інформаційні запити на одній сторінці.
- Оновлювати старі статті кожні 6-12 місяців (Google любить актуальний контент).
- Контент без backlinks не ранжується. Content SEO + Off-page SEO = синергія.
