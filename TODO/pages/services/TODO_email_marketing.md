# Email-маркетинг та розсилки — codenest.com.ua
Опис: Сторінка послуги email-маркетингу. SEO-keyword: "email маркетинг для бізнесу Україна".
**Статус:** ✅ Готово (MVP) — реалізовано через shared template `services/[slug]/page.tsx`
**i18n статус:** ✅ Повністю перекладено (EN + UK) — /services/[slug]

---

## Hero
- [x] H1: "Email-маркетинг — найвищий ROI серед digital-каналів"
- [x] Підзаголовок: середній ROI email-маркетингу $42 на $1 вкладений
- [x] CTA: "Розпочати розсилки"

## Послуги email-маркетингу
- [x] Стратегія email-маркетингу — реалізовано через `service.features` ("Email-стратегія") у `services.ts`
- [x] Розробка шаблонів листів (HTML + plain text) — реалізовано через `service.features` ("Дизайн шаблонів: Адаптивні HTML-шаблони") + `service.includes` ("Дизайн 3 шаблонів розсилок") у `services.ts`
- [x] Налаштування автоматизації (welcome серії, тригерні листи) — реалізовано через `service.features` ("Автоматизація: Welcome-серія, тригерні листи, реактивація") + `service.includes` у `services.ts`
- [x] Сегментація бази підписників — реалізовано через `service.features` ("Сегментація") + `service.includes` ("Сегментація бази підписників") у `services.ts`
- [x] A/B тестування теми та контенту
- [x] Ведення та оптимізація розсилок — описано у features/includes/packages/useCases сервісної сторінки
- [x] Аналітика: open rate, click rate, конверсії — реалізовано через `service.features` ("Аналітика: Open Rate, CTR, конверсії — детальна звітність") у `services.ts`

## Сценарії автоматизації
- [x] Welcome серія (5 листів після підписки) — реалізовано через `service.features` ("Автоматизація: Welcome-серія") + `service.packages` ("Starter: Welcome-серія") у `services.ts`
- [x] Кинутий кошик (3 листи) — описано у features/includes/packages/useCases сервісної сторінки
- [x] After-purchase серія (подяка + відгук + cross-sell) — описано у features/includes/packages/useCases сервісної сторінки
- [x] Реактивація холодних підписників — реалізовано через `service.features` ("Автоматизація: реактивація") + `service.packages` ("Full Strategy: Реактивація бази") у `services.ts`
- [x] Нагадування про запис (для краси, медицини) — описано у features/includes/packages/useCases сервісної сторінки

## Платформи
- [x] Mailchimp (англомовна аудиторія) — реалізовано через `service.includes` ("Brevo / Mailchimp / SendGrid") + `service.faq` у `services.ts`
- [x] Brevo / Sendinblue (Україна + ЄС) — реалізовано через `service.includes` + `service.faq` у `services.ts`
- [x] eSputnik (популярна в Україні) — описано у features/includes/packages/useCases сервісної сторінки
- [x] UniSender — реалізовано через `service.faq` ("Brevo (безкоштовно до 300 листів/день), Mailchimp, SendGrid, UniSender") у `services.ts`

## Тарифи
- [x] Starter: шаблон + welcome серія + 1 кампанія/місяць
- [x] Pro: повна автоматизація + сегментація + A/B тести
- [x] Enterprise: + SMS розсилки + аналітика + CRM інтеграція

## SEO
- [x] Title: "Email-маркетинг для бізнесу в Україні — CodeNest"
- [x] Schema.org: Service
- [x] Internal links: Реклама, Чат-боти, Інтеграції
