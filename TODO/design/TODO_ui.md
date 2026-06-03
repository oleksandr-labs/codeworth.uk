 UI-компоненти (UI)
Опис: Створення повної системи базових інтерфейсних рішень та компонентів для сайту агенції та маркетплейсу.
**Статус:** Частково виконано
**✅ Проаналізовано 2026-05-01 — 31/33 задачі виконані. Відкриті: Hero-ілюстрації та декоративні фони (потребують дизайнера).**

---

> ⚠️ **Незакреслені пункти ([ ]) — Phase 2:** потребують роботи дизайнера, фотографа або реального тестування на пристроях. Основний дизайн-система реалізована повністю.


## Базові елементи
- [x] Дизайн системи кнопок (Primary, Secondary, Ghost, Danger) та всіх станів (Hover, Active, Disabled, Loading) — `Button.tsx` (+ danger variant, isLoading spinner)
- [x] Дизайн полів вводу, textarea, чекбоксів, радіокнопок, select — `FormElements.tsx` (Input, Textarea, Select, Checkbox, RadioGroup)
- [x] Повідомлення про помилки, успіх та попередження (Toast / Alert) — `Toast.tsx` (ToastProvider + useToast hook)
- [x] Індикатори завантаження (Skeleton-loader) — `Skeleton.tsx`
- [x] Бейджі, теги та мітки (Badge, Chip, Label) — `Badge.tsx`
- [x] Аватари (одинарні та групові) — `Avatar.tsx` (Avatar з initials/image/status + AvatarGroup)
- [x] Роздільники (Divider) та відступи — `Divider.tsx` (horizontal/vertical, solid/dashed/dotted, label з align, dark mode)

## Навігація
- [x] Головне меню Desktop з багаторівневими dropdown — `Header.tsx`
- [x] Мобільне меню (гамбургер із анімованим slide-in) — `Header.tsx`
- [x] Sticky-хедер із зміною стану при скролі — `Header.tsx`
- [x] Хлібні крихти (Breadcrumbs) — `Breadcrumb.tsx`
- [x] Пагінація та "Завантажити ще" — `Pagination.tsx` (підключено до `BlogContent.tsx`, 9 постів/сторінка)
- [x] Sidebar-навігація для маркетплейсу та кабінету — `AccountClient.tsx` (desktop sidebar + mobile scroll tabs)
- [x] Табовий інтерфейс (Tabs) для переключення контенту — `Tabs.tsx`

## Картки та списки
- [x] Картка послуги (іконка, заголовок, опис, CTA-кнопка) — `ServicesSection.tsx`
- [x] Картка проєкту/портфоліо (зображення, технології, посилання) — `portfolio/page.tsx`
- [x] Картка статті блогу (обкладинка, дата, категорія, анонс) — `BlogPreviewSection.tsx`, `blog/page.tsx`
- [x] Картка продукту маркетплейсу (фото, назва, ціна, рейтинг, кнопки) — `marketplace/page.tsx`
- [x] Картка відгуку (аватар, ім'я, зірки, текст) — `TestimonialsSection.tsx`
- [x] Картка члена команди (фото, роль, соцмережі) — `TeamCard.tsx` (default + compact variant, Avatar integration, skills, LinkedIn/GitHub/Twitter/Instagram/Telegram icons)
- [x] Список цін (Pricing Table) з виділеним тарифом — `pricing/page.tsx`

## Модальні вікна та оверлеї
- [x] Модальне вікно форми зворотного зв'язку — `ContactForm.tsx` (inline на /contact)
- [x] Попап "Дякуємо за заявку" (Success screen) — вбудований у `ContactForm.tsx`
- [x] Lightbox для перегляду зображень портфоліо — `Lightbox.tsx` (Lightbox + LightboxGallery, клавіатура ESC/←/→, zoom)
- [x] Модальне вікно підтвердження дії (Confirm dialog) — `ConfirmDialog.tsx`
- [x] Cookie-повідомлення (GDPR banner) — `CookieConsent.tsx`

## Маркетплейс-специфічні компоненти
- [x] Фільтри та сортування каталогу (sidebar + chips) — `CatalogClient.tsx` (search, category chips, complexity, price range, sort; URL sync)
- [x] Картка продукту з hover-ефектом та "Швидкий перегляд" — `CatalogClient.tsx` (QuickViewModal з features, ціною, Add to Cart)
- [x] Кошик (міні-кошик у хедері та повна сторінка) — `MiniCart.tsx` (підключено до Header, useCart hook)
- [x] Блок рейтингу та зірок — `StarRating.tsx` (StarRating + RatingBars, half-star, readonly/interactive)
- [x] Порівняння продуктів (Compare) — `useCompare.ts` (hook, localStorage, max 3) + `ComparePanel.tsx` (sticky bottom bar, remove/clear, CTA до /marketplace/compare) + кнопка "Порівняти" у кожній картці `CatalogClient.tsx`
- [x] Wizard-крок оформлення замовлення (Step indicator) — `StepIndicator.tsx` (completed/active/pending, pulse ring)
- [x] Before/After slider — `BeforeAfter.tsx` (drag handle, clipPath reveal, touch+mouse, до/після labels)

## Секції сторінок
- [x] Hero-секція (великий банер з заголовком, підзаголовком та CTA) — `HeroSection.tsx`
- [x] Секція переваг "Чому ми" (іконки + опис) — `WhyUsSection.tsx`
- [x] Секція статистики (лічильники — кількість проєктів, клієнтів, років) — `WhyUsSection.tsx`
- [x] Секція відгуків (Grid) — `TestimonialsSection.tsx`
- [x] Секція FAQ (Accordion) — `faq/page.tsx`, `pricing/page.tsx`, `services/[slug]/page.tsx`
- [x] Секція CTA (заклик до дії з формою або кнопкою) — `CTASection.tsx`
- [x] Секція новин/блогу (3 останні пости) — `BlogPreviewSection.tsx`
- [x] Футер (посилання, соцмережі, копірайт) — `Footer.tsx`

---

### Примітки
- UI має бути сучасним, чистим та зрозумілим. Орієнтир: строгий мінімалізм або скломорфізм.
- Всі компоненти мають бути доступними (WCAG 2.1 AA).
- Реалізовувати як атомарні Storybook-компоненти або відповідні фреймворк-компоненти.
- Забезпечити підтримку темної теми через CSS-змінні.
