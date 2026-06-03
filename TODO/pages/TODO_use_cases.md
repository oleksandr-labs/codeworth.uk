# Сторінка "Use Cases" — Рішення по Типах Задач

**URL:** `/use-cases` + `/use-cases/[slug]`
**Пріоритет:** 🟡 Середній — SEO commercial intent + pre-sales
**Статус:** ✅ Реалізовано
**i18n:** EN + UK

---

## Концепція

На відміну від `/services` (що ми робимо) та `/portfolio` (приклади результатів),
`/use-cases` відповідає на питання **"Яку задачу вирішує CodeNest для мого типу бізнесу?"**

Відвідувач шукає не "веб-студія", а "як збільшити кількість записів через сайт" — ці сторінки відповідають саме на такі питання.

---

## Структура сторінки-хабу `/use-cases`

- Hero: "Знайдіть рішення для вашої задачі" + пошук
- Grid карток use-cases з іконками та категоріями
- Фільтр по категоріях: Конверсія / Автоматизація / SEO / E-commerce / AI
- CTA: "Не знайшли свій кейс? Розкажіть нам"

---

## Use Cases для реалізації (15 позицій)

### 🎯 Конверсія та Ліди

#### `increase-online-bookings`
- **Заголовок:** Як збільшити кількість онлайн-записів
- **Хто шукає:** Салони краси, медичні клініки, автосервіси, фітнес
- **Проблема:** Клієнти дзвонять або пишуть в Instagram — запису онлайн немає
- **Рішення CodeNest:** Модуль онлайн-запису `feat-booking` + Telegram-нотифікації
- **Результат:** "Наші клієнти отримують 60–120 онлайн-записів на місяць без дзвінків"
- **Пов'язані послуги:** Корпоративний сайт, feat-booking (extras)
- **Пов'язані кейси:** beauty-salon, auto-service, medical-clinic

#### `reduce-abandoned-orders`
- **Заголовок:** Як зменшити кількість кинутих кошиків
- **Хто шукає:** Інтернет-магазини, e-commerce
- **Проблема:** 70% кошиків кидають до оплати
- **Рішення CodeNest:** ecom-abandoned-cart emails + exit intent popup + social proof
- **Результат:** "Відновлення 12–18% кинутих кошиків через email-ремаркетинг"
- **Пов'язані послуги:** E-commerce, extras ecommerce

#### `increase-landing-conversion`
- **Заголовок:** Як підвищити конверсію лендінгу
- **Хто шукає:** Стартапи, школи, послуги
- **Проблема:** Трафік є, але заявок мало
- **Рішення CodeNest:** A/B тест заголовків, FOMO-widget, Lead Quiz, Exit Intent Popup
- **Пов'язані кейси:** math-school-online, dental-clinic-landing

---

### ⚙️ Автоматизація

#### `automate-support`
- **Заголовок:** Як автоматизувати підтримку клієнтів 24/7
- **Хто шукає:** SaaS, e-commerce, клініки
- **Рішення CodeNest:** RAG-чатбот на GPT-4o, FAQ-виджет
- **Пов'язані кейси:** ai-chatbot-saas
- **Пов'язані extras:** ai-chatbot-rag, feat-floating-chat

#### `automate-order-notifications`
- **Заголовок:** Як автоматизувати сповіщення про замовлення
- **Хто шукає:** Магазини, ресторани, послуги
- **Рішення CodeNest:** Telegram-бот нотифікацій + email автовідповідач
- **Пов'язані extras:** int-telegram-bot, int-mailchimp

#### `automate-content-generation`
- **Заголовок:** Як генерувати описи товарів за допомогою AI
- **Хто шукає:** E-commerce з великим каталогом
- **Рішення CodeNest:** ai-product-descriptions extra (OpenAI GPT)
- **Результат:** "100–1000 SEO-описів за один запуск"

---

### 📈 SEO та Пошук

#### `rank-local-seo`
- **Заголовок:** Як вийти в топ Google по місту
- **Хто шукає:** Клініки, ресторани, послуги
- **Рішення CodeNest:** LocalBusiness Schema.org, геосторінки, Google Business Profile
- **Пов'язані послуги:** SEO-просування

#### `get-rich-snippets`
- **Заголовок:** Як отримати зірки та відповіді у пошуку Google
- **Хто шукає:** Всі бізнеси з FAQ та відгуками
- **Рішення CodeNest:** FAQPage Schema.org, AggregateRating Schema.org, Article Schema.org
- **Пов'язані extras:** analytics-seo-audit (SEO аудит)

---

### 🛒 E-commerce

#### `launch-online-store`
- **Заголовок:** Як запустити інтернет-магазин за 14 днів
- **Хто шукає:** Ритейл, fashion, хенд-мейд
- **Рішення CodeNest:** ecom-mini-shop extra або повноцінний E-commerce сайт
- **Пов'язані кейси:** flower-shop, fashion-store

#### `increase-average-order`
- **Заголовок:** Як збільшити середній чек на 20–40%
- **Хто шукає:** Магазини, кондитерські, послуги
- **Рішення CodeNest:** Bundle Builder, upsell модуль, ecom-loyalty
- **Результат:** "Bundle Builder збільшує AOV на 20–30%"

#### `sell-without-marketplace`
- **Заголовок:** Як продавати без Rozetka та Prom.ua
- **Хто шукає:** Продавці на маркетплейсах
- **Рішення CodeNest:** Власний магазин зі збереженням на комісії 15%
- **Пов'язані кейси:** fashion-store (45K грн/міс збережено)

---

### 🤖 AI та Аналітика

#### `implement-ai-support`
- **Заголовок:** Як впровадити AI-підтримку без великих інвестицій
- **Хто шукає:** SaaS, e-commerce, B2B-сервіси
- **Рішення CodeNest:** ai-chatbot-rag (від 9 000 грн)
- **Результат:** "68% запитань вирішуються автоматично"

#### `monitor-brand-reputation`
- **Заголовок:** Як відстежувати відгуки про бренд в реальному часі
- **Хто шукає:** E-commerce, ресторани, клініки
- **Рішення CodeNest:** BrandPulse NLP (portfolio) або кастомна інтеграція
- **Пов'язані кейси:** nlp-review-monitor

---

### 💼 Портфоліо та Довіра

#### `build-trust-online`
- **Заголовок:** Як підвищити довіру клієнтів до нового бізнесу
- **Хто шукає:** Нові бізнеси, стартапи
- **Рішення CodeNest:** Відгуки + Schema.org AggregateRating + логотипи клієнтів + кейси
- **Пов'язані extras:** ecom-reviews, FOMO widget

#### `showcase-portfolio-online`
- **Заголовок:** Як ефективно презентувати своє портфоліо онлайн
- **Хто шукає:** Фотографи, дизайнери, будівельники, студії
- **Рішення CodeNest:** Сторінка-кейс (page-portfolio-case), lightbox, before/after slider
- **Пов'язані extras:** feat-before-after, feat-lightbox

---

## Технічна реалізація

### Структура файлів
```
src/lib/data/use-cases.ts        — 15 об'єктів з полями id/title/slug/category/...
src/app/[lang]/use-cases/
  page.tsx                        — хаб із фільтром по категоріях
  [slug]/page.tsx                 — деталь: проблема → рішення → кейс → CTA
```

### Схема об'єкта
```ts
interface UseCase {
  slug: string;
  title: string;
  titleEn: string;
  category: "conversion" | "automation" | "seo" | "ecommerce" | "ai" | "trust";
  icon: string; // emoji
  problem: string;
  problemEn: string;
  solution: string;
  solutionEn: string;
  resultQuote: string; // "Наші клієнти отримують..."
  resultQuoteEn: string;
  relatedPortfolio: string[]; // slugs
  relatedExtras: string[]; // extra IDs
  relatedServices: string[]; // service slugs
}
```

### SEO

- **Title:** "Як [задача] — рішення від CodeNest"
- **Description:** Конкретна проблема → конкретний результат
- **Schema.org:** HowTo або FAQPage
- **Ключові слова:** "як збільшити онлайн-записи", "як зменшити кинуті кошики"
- **Internal links:** з portfolio кейсів і extras карток

---

## Залежності

- Потрібно реалізувати перед `/use-cases`:
  - `extras/feat-floating-chat` (згадується у кейсі automate-support)
  - `extras/ecom-abandoned-cart` (новий — ще не в каталозі)
- Посилатись на use-cases з: portfolio/[slug]/page.tsx, extras/[id], services/[slug]
