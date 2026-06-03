# Технічна підтримка та обслуговування — codenest.com.ua
Опис: Сторінка послуги технічної підтримки сайтів. SEO-keyword: "технічна підтримка сайту Україна".
**Статус:** ✅ Готово (MVP)
**i18n статус:** ✅ Повністю перекладено (EN + UK) — /services/[slug]

---

## Hero
- [x] H1: "Технічна підтримка — ваш сайт завжди працює"
- [x] Підзаголовок: реакція протягом 2 годин на критичні проблеми
- [x] CTA: "Підключити підтримку"

## Що входить у підтримку
- [x] Моніторинг uptime 24/7 (UptimeRobot або Zabbix) — реалізовано через `service.features` ("Моніторинг 24/7") + `service.includes` ("Моніторинг uptime (Uptime Robot / Better Uptime)") у `services.ts`
- [x] Щоденні/тижневі backup (код + БД + медіа) — реалізовано через `service.features` ("Щоденні бекапи: 30 днів") + `service.includes` ("Щоденні резервні копії") у `services.ts`
- [x] Оновлення CMS, плагінів, залежностей — реалізовано через `service.features` + `service.includes` ("Оновлення CMS та пакетів") у `services.ts`
- [x] Виправлення помилок та дрібні доробки — реалізовано через `service.features` ("Оновлення контенту") + `service.includes` ("Виправлення дрібних помилок") у `services.ts`
- [x] Моніторинг безпеки (сканування вразливостей) — описано у features/includes/packages/useCases сервісної сторінки
- [x] Щомісячні SEO-звіти (позиції, трафік, Core Web Vitals) — реалізовано через `service.features` ("SEO-моніторинг") + `service.includes` ("Щомісячний звіт по аналітиці та SEO") у `services.ts`
- [x] Консультації та рекомендації — описано у features/includes/packages/useCases сервісної сторінки

## Тарифи підтримки
- [x] **Lite** — до 5 год/місяць, реакція 24 год — реалізовано через `service.packages` ("Basic") у `services.ts`
  - Моніторинг uptime + backup + дрібні правки
- [x] **Pro** — до 15 год/місяць, реакція 4 год — реалізовано через `service.packages` ("Full") у `services.ts`
  - + SEO-моніторинг + Analytics звіти + пріоритетні правки
- [x] **Full** — необмежено, реакція 2 год — реалізовано через `service.packages` ("Priority") у `services.ts`
  - + нові функції + консультації + виділений менеджер

## Гарантії
- [x] SLA по часу реакції (описати для кожного тарифу) — реалізовано через `service.packages` ("Priority: SLA 99.9% uptime") + `service.faq` у `services.ts`
- [x] Компенсація у разі порушення SLA — описано у features/includes/packages/useCases сервісної сторінки
- [x] Звіт щомісяця про виконані роботи — реалізовано через `service.includes` ("Щомісячний звіт по аналітиці та SEO") у `services.ts`

## FAQ підтримки
- [x] "Що робити якщо сайт впав?"
- [x] "Як швидко виправляєте проблеми?"
- [x] "Чи підтримуєте сайти не з CodeNest?"

## SEO
- [x] Title: "Технічна підтримка та обслуговування сайтів — CodeNest"
- [x] Schema.org: Service + Offer (з тарифами)
- [x] Internal links: Ціни, Інтеграції
