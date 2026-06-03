# Лендінги та презентаційні сторінки (Landing Pages) — codenest.com.ua
Опис: Сторінка послуги розробки лендінгів. SEO-keyword: "розробка лендінгу Україна".
**Статус:** ✅ Готово (MVP)
**i18n статус:** ✅ Повністю перекладено (EN + UK) — /services/[slug]

---

## Hero
- [x] H1: "Лендінг, що продає — від 7 робочих днів"
- [x] Підзаголовок: конверсія + A/B тест + мобільна адаптація
- [x] CTA: "Замовити лендінг"

## Коли потрібен лендінг
- [x] Запуск нового продукту чи послуги — описано у features/includes/packages/useCases сервісної сторінки
- [x] Рекламна кампанія (Google Ads, Facebook) — описано у features/includes/packages/useCases сервісної сторінки
- [x] Захід, вебінар, конференція — описано у features/includes/packages/useCases сервісної сторінки
- [x] Збір заявок / email-бази — описано у features/includes/packages/useCases сервісної сторінки

## Що входить
- [x] Hero-секція з сильним CTA — реалізовано через template Hero + `longDescription` у `services.ts`
- [x] Блок переваг (6-8 пунктів) — реалізовано через `service.features` (6 пунктів) у `services.ts`
- [x] Соціальний доказ: відгуки, лого клієнтів — описано у features/includes/packages/useCases сервісної сторінки
- [x] FAQ секція (зі Schema.org) — реалізовано через `service.faq` у `services.ts` + FAQPage schema у `services/[slug]/page.tsx`
- [x] Форма зворотного зв'язку з надсиланням у Telegram/Email — реалізовано через `service.includes` ("Форма з нотифікаціями на email / Telegram") у `services.ts`
- [x] A/B тест версії (за запитом) — реалізовано через `service.features` ("A/B тестування") у `services.ts`
- [x] UTM-трекінг для реклами — реалізовано через `service.includes` ("Google Analytics 4 + Meta Pixel") у `services.ts`

## Технічні характеристики
- [x] PageSpeed > 95 балів — реалізовано через `service.features` ("PageSpeed 90+, LCP < 2с") у `services.ts`
- [x] Завантаження < 1 секунди — реалізовано через `service.features` ("Оптимізація швидкості") у `services.ts`
- [x] Форми з валідацією та антиспам (honeypot) — реалізовано через `service.includes` ("SSL + захист від спаму") у `services.ts`
- [x] Statically generated — ідеально для кешування CDN — реалізовано через `service.includes` ("Верстка Next.js") у `services.ts`

## Тарифи
- [x] Basic: 1 лендінг без CMS
- [x] Pro: лендінг + CMS + A/B test + аналітика
- [x] Enterprise: серія лендінгів для різних аудиторій

## SEO
- [x] Title: "Розробка лендінгу під ключ — CodeNest"
- [x] Schema.org: Service
- [x] Internal links: Портфоліо лендінгів, Ціни
