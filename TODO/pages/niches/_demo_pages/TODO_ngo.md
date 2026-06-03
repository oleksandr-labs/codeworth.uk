# NGO / Благодійний фонд / Громадська організація — codenest.com.ua / Demo
Опис: Demo-сторінка для ніші "благодійний фонд / волонтерство / NGO". SSG, donation-oriented.
**Складність:** 🟢 Проста (інформаційний сайт + donate)
**Статус:** ✅ Готово (MVP — shared template `niches/[slug]/page.tsx`)
**i18n статус:** ✅ Повністю перекладено (EN + UK)

---

> ⚠️ **Незакреслені пункти ([ ]) — Phase 2:** потребують реального медіа (фото/відео), backend-інтеграцій або зовнішніх API. Demo MVP реалізовано через shared template `niches/[slug]/page.tsx`.

## Hero
- [ ] Емоційне фото або відео (люди, яким допомагають)
- [x] H1: "[Назва фонду] — допомагаємо [місія]"
- [ ] Великий CTA: "Допомогти зараз" (кнопка donate — потребує платіжної інтеграції)
- [x] Лічильники: зібрано коштів, проєктів, волонтерів, років — `trustStats` у `niches.ts`

## Місія та про нас
- [x] Опис місії фонду — `highlights` у `niches.ts`
- [x] Команда: засновник, керівництво, волонтери — `team` у `niches.ts` + секція "Команда" у `niches/[slug]/page.tsx`
- [ ] Звітність: річний звіт, фінансова звітність (PDF — потребує зовнішнього сховища)
- [ ] Реєстраційні документи

## Програми / Проєкти
- [x] Список програм/проєктів — `mockServices` у `niches.ts` + секція послуг у `niches/[slug]/page.tsx`
- [x] Картки активних проєктів: фото, назва, опис, прогрес (X із Y зібрано) — shared template `projectCards` у `niches.ts` + секція у `niches/[slug]/page.tsx`
- [ ] Progress bar для кожного проєкту
- [ ] Архів завершених проєктів з результатами
- [ ] Фото/відеозвіти по завершеним проєктам

## Донати (ключовий функціонал)
- [x] Швидкі кнопки: 100 грн, 250 грн, 500 грн, 1000 грн, довільна сума — реалізовано через `calculatorSteps` у `niches.ts`
- [ ] Одноразовий або щомісячний (recurring) внесок
- [ ] Оплата: LiqPay, Monobank, Fondy, банківський переказ
- [ ] Прогрес збору по кожному проєкту
- [ ] "На що підуть ваші кошти" — візуалізація розподілу

## Як допомогти (крім грошей)
- [x] Стати волонтером (форма) — `BookingSection` у `niches/[slug]/page.tsx`
- [x] Передати речі (що приймаємо) — реалізовано через `nicheFaq` у `niches.ts`
- [x] Поділитися у соцмережах (share buttons) — реалізовано через `nicheFaq` у `niches.ts`
- [x] Партнерство з бізнесом — реалізовано через `highlights` та `promotions` у `niches.ts`

## Новини та медіа
- [x] Пов'язані статті блогу — реалізовано через секцію блогу у `niches/[slug]/page.tsx`
- [x] Блог / Новини: звіти, події, результати — реалізовано через секцію блогу у `niches/[slug]/page.tsx`
- [ ] Медіа про нас: публікації в ЗМІ
- [ ] Підписка на newsletter

## Прозорість
- [ ] Фінансовий звіт (скачати PDF — потребує зовнішнього сховища)
- [ ] Дошка подяк донорам (якщо погодились публічно)
- [x] "Куди пішли кошти" — реалізовано через `nicheFaq` та `trustStats` у `niches.ts`

## SEO
- [x] Title: "[Назва фонду] — Благодійний фонд | Допомога [напрямок]" — `titleSeo` у `niches.ts`, `generateMetadata` у `page.tsx`
- [x] Meta Description — `metaDescription` у `niches.ts`
- [x] Schema.org: NGO + DonateAction — `schemaType` у `niches.ts`, `businessLd` у `page.tsx`
- [x] Ключові слова SEO — `tags` у `niches.ts` + `generateMetadata` у `page.tsx`
- [x] OpenGraph tags — реалізовано через `generateMetadata` у `page.tsx`
- [x] Canonical URL — реалізовано через `generateMetadata` у `page.tsx`
- [x] Internal links — реалізовано через секції пов'язаних ніш, блогу та портфоліо у `niches/[slug]/page.tsx`
- [x] Breadcrumb навігація — реалізовано у `niches/[slug]/page.tsx`
- [ ] OG-image емоційне, що мотивує ділитися (потребує реального медіа)

## Реалізовано (shared template)
- [x] Акції та знижки — `promotions` у `niches.ts` + секція "Акції" у `niches/[slug]/page.tsx`
- [x] Команда (засновники/волонтери) — `team` у `niches.ts` + секція "Команда" у `niches/[slug]/page.tsx`
- [x] Відгуки клієнтів — `NicheReviews` компонент у `niches/[slug]/page.tsx`
- [x] Підкатегорії ніші — `variants` у `niches.ts` + секція "Варіанти" у `niches/[slug]/page.tsx`
- [x] Пов'язані статті блогу — секція блогу у `niches/[slug]/page.tsx`
- [x] Кейс портфоліо — секція портфоліо у `niches/[slug]/page.tsx`
- [x] FAQ — `nicheFaq` у `niches.ts` + загальний FAQ у `niches/[slug]/page.tsx`
