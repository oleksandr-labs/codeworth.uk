# 🧩 Доробки та Модулі — Архітектура і Каталог

> ✅ Проаналізовано 2026-05-01 — каталог розширено до ~170 позицій та 10 категорій. Додано категорію AI (8 позицій), нові позиції в integrations, ecommerce, marketing, admin.
> ✅ Демо реалізовано 2026-05-01 — 5 нових live демо: `ai-chatbot-rag`, `ai-smart-search`, `admin-blog`, `admin-appointments`, `ecom-bundle-builder`.
> ✅ Додано 2026-05-01 — 7 нових позицій (feat-before-after ✅демо, feat-lead-quiz ✅демо, feat-fomo ✅демо, feat-announcement-bar, feat-fab-cluster, feat-scroll-animations, ai-image-search). Каталог: ~177 позицій, 25 демо.
> ✅ Розширено 2026-05-01 — +10 нових AI-позицій у каталозі (ai-voice-search, ai-auto-translate, ai-price-optimizer, ai-recommendations, ai-content-moderator, ai-copywriter, ai-faq-generator, ai-demand-forecast, ai-chat-summary, ai-form-assistant). Каталог: ~187 позицій, **28 демо** (додано `ai-copywriter` ✅демо, `ai-voice-search` ✅демо, `ai-price-optimizer` ✅демо).

> Центральний файл управління розділом «Доробки та модулі» (`/extras`).
> Каталог мікро-послуг і доробок, що надаються окремо від повноцінної розробки сайту.

---

## Загальний статус

- **Статус MVP:** ✅ Готово (`/extras` сторінка + демо-режим)
- **Поточна кількість позицій у каталозі:** 219 (оновлено 2026-05-02 session 31: +21 нових)
- **Категорій у каталозі:** 10 (pages / features / analytics / integrations / content / security / admin / ecommerce / marketing / **ai**)
- **Демо-сторінок:** 36 (оновлено 2026-05-02 session 31: +feat-multistep-form ✅, +feat-floating-chat ✅, +feat-waitlist ✅, +feat-newsletter-inline ✅, +feat-social-proof-counter ✅, +feat-sticky-cta ✅)
- **Сторінка в коді:** `src/app/[lang]/extras/page.tsx` + `src/lib/data/extras.ts`

---

## Структура файлів

> Файли розподілені по підпапках за категорією доробки.

### 📄 pages/ — Окремі сторінки
| Файл | Категорія | Позицій |
|------|-----------|---------|
| [pages/TODO_extras_pages.md](pages/TODO_extras_pages.md) | 📄 Окремі сторінки | 9 реалізовано + 10 планується |

### ⚡ features/ — Функціональні модулі
| Файл | Категорія | Позицій |
|------|-----------|---------|
| [features/TODO_extras_features.md](features/TODO_extras_features.md) | ⚡ Форми, модулі, UX-елементи | 10 реалізовано + 12 планується |

### 📊 analytics/ — Аналітика та Звітність
| Файл | Категорія | Позицій |
|------|-----------|---------|
| [analytics/TODO_extras_analytics.md](analytics/TODO_extras_analytics.md) | 📊 Аналітика, дашборди, A/B | 6 реалізовано + 7 планується |

### 🛡 admin/ — Адмін-панелі та CMS
| Файл | Категорія | Позицій |
|------|-----------|---------|
| [admin/TODO_extras_admin.md](admin/TODO_extras_admin.md) | 🛡 Адмінки, CMS, налаштування | 0 реалізовано + 14 планується |

### 🔗 integrations/ — Зовнішні Інтеграції
| Файл | Категорія | Позицій |
|------|-----------|---------|
| [integrations/TODO_extras_integrations.md](integrations/TODO_extras_integrations.md) | 🔗 API, платежі, месенджери, CRM | 7 реалізовано + 12 планується |

### 🛒 ecommerce/ — E-commerce Функції
| Файл | Категорія | Позицій |
|------|-----------|---------|
| [ecommerce/TODO_extras_ecommerce.md](ecommerce/TODO_extras_ecommerce.md) | 🛒 Магазин, оплата, каталог, кабінет | 0 реалізовано + 15 планується |

### 🔍 seo/ — SEO та Оптимізація
| Файл | Категорія | Позицій |
|------|-----------|---------|
| [seo/TODO_extras_seo.md](seo/TODO_extras_seo.md) | 🔍 SEO-аудит, Schema.org, швидкість | 6 реалізовано + 11 планується |

### ✍️ content/ — Контент та Копірайтинг
| Файл | Категорія | Позицій |
|------|-----------|---------|
| [content/TODO_extras_content.md](content/TODO_extras_content.md) | ✍️ Статті, тексти, переклади | 5 реалізовано + 9 планується |

### 📣 marketing/ — Маркетинг та Автоматизація
| Файл | Категорія | Позицій |
|------|-----------|---------|
| [marketing/TODO_extras_marketing.md](marketing/TODO_extras_marketing.md) | 📣 Чат-боти, email, реклама, SMM | реалізовано в extras.ts |

### 🤖 ai/ — AI-функції
| Файл | Категорія | Позицій |
|------|-----------|---------|
| [ai/TODO_extras_ai.md](ai/TODO_extras_ai.md) | 🤖 GPT, RAG, персоналізація, NLP | 8 позицій |

---

## Маппінг категорій: каталог → файли

| Категорія у `extras.ts` | Файл у TODO |
|------------------------|-------------|
| `"pages"` | [pages/TODO_extras_pages.md](pages/TODO_extras_pages.md) |
| `"features"` | [features/TODO_extras_features.md](features/TODO_extras_features.md) |
| `"analytics"` | [analytics/TODO_extras_analytics.md](analytics/TODO_extras_analytics.md) |
| `"integrations"` | [integrations/TODO_extras_integrations.md](integrations/TODO_extras_integrations.md) |
| `"content"` | [content/TODO_extras_content.md](content/TODO_extras_content.md) |
| `"security"` | [seo/TODO_extras_seo.md](seo/TODO_extras_seo.md) |
| `"admin"` | [admin/TODO_extras_admin.md](admin/TODO_extras_admin.md) |
| `"ecommerce"` | [ecommerce/TODO_extras_ecommerce.md](ecommerce/TODO_extras_ecommerce.md) |
| `"marketing"` | [marketing/TODO_extras_marketing.md](marketing/TODO_extras_marketing.md) |
| **`"ai"` (нова)** | [ai/TODO_extras_ai.md](ai/TODO_extras_ai.md) |

---

## Технічна реалізація

- **Дані каталогу:** `src/lib/data/extras.ts` → `EXTRAS[]` + `EXTRA_CATEGORIES[]`
- **Сторінка каталогу:** `src/app/[lang]/extras/page.tsx`
- **Демо-компоненти:** `src/components/extras/demos/`
  - `BookingDemo.tsx` — онлайн-запис
  - `CalculatorDemo.tsx` — калькулятор
  - `FiltersDemo.tsx` — фільтрація каталогу
  - `ContactFormDemo.tsx` — форма зворотного зв'язку
  - `VacancyDemo.tsx` — сторінка вакансій
  - `BlogDemo.tsx` — блог-каталог
  - `GenericDemo.tsx` — загальне демо (routing: SaasLanding, AiChatbotDemo, AdminBlogDemo, BundleBuilderDemo, AiSmartSearchDemo, AdminAppointmentsDemo, BeforeAfterDemo, LeadQuizDemo, FomoDemo + FallbackDemo)
- **Демо-сторінки:** `src/app/[lang]/extras/demo/[id]/[example]/page.tsx`

---

## Пріоритети розвитку

### 🔴 Критичний (найближчий спринт)
- ✅ ~~Before/After slider~~ — реалізовано 2026-05-01
- ✅ ~~Lead Quiz~~ — реалізовано 2026-05-01
- ✅ ~~FOMO widget~~ — реалізовано 2026-05-01
- Адмін-панелі для клієнтів (новий найбажаніший блок)
- E-commerce модуль (часті запити від клієнтів)
- Чат-боти (Telegram + AI)

### 🟡 Середній
- Нові сторінки (geo, reviews, glossary)
- Нові інтеграції (Stripe, WayForPay, SMS)
- Email-маркетинг сценарії

### 🟢 Низький
- Додаткові UX-елементи (слайдер, lightbox)
- Контент-пакети (переклади, пресс-релізи)
- BI-аналітика (розширені дашборди)

---

## Посилання на пов'язані розділи

- [/extras](../../codenest/src/app/[lang]/extras) — сторінка каталогу в коді
- [tech/TODO_integrations.md](../tech/TODO_integrations.md) — інтеграції для власного сайту
- [tech/TODO_security.md](../tech/TODO_security.md) — безпека для власного сайту
- [pages/services/](../pages/services/) — окремі сторінки послуг (15 сторінок)
