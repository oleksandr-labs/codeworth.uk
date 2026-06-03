# Розробка сайтів (Website Development) — codenest.com.ua
Опис: Сторінка послуги розробки корпоративних сайтів. Статична (SSG), SEO-keyword: "розробка сайтів Україна".
**Статус:** ✅ Готово (MVP)
**i18n статус:** ✅ Повністю перекладено (EN + UK) — /services/[slug]

---

## Hero
- [x] H1 з назвою послуги + підзаголовок + технічний стек
- [x] CTA: "Отримати пропозицію" + "Дивитися портфоліо"
- [x] Хлібні крихти: Головна > Послуги > [Послуга]

## Що включено
- [x] 6 карток переваг (features) із іконками та описами
- [x] Список includes (що входить у вартість)
- [x] CTA-картка з ціною та терміном

## Відповіді на питання (FAQ)
- [x] 3+ питань з відповідями з `service.faq`

## SEO
- [x] Title через `generateMetadata()`
- [x] Meta Description через `service.metaDescription`
- [x] Schema.org Service + FAQPage — `<script>` в компоненті
- [x] Breadcrumbs у JSX
- [x] Internal links: Портфоліо, Контакти, всі інші послуги

> Примітка: Всі 13 сторінок послуг генеруються через єдиний template `services/[slug]/page.tsx` + `generateStaticParams()`.
