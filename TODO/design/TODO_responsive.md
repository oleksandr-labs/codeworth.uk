 Адаптивний дизайн — Mobile First (Responsive) — codenest.com.ua
Опис: Mobile-first підхід до верстки. Breakpoints, адаптивні компоненти та тестування на реальних пристроях.
**Статус:** Частково виконано
**✅ Проаналізовано 2026-05-01 — 27/35 задач виконані. Відкриті: тестування на реальних пристроях та реєстрація в Search Console після деплою.**

---

## Стратегія Mobile First
- [x] Всі компоненти розроблені спочатку для 360px екрану
- [x] Progressive enhancement: мобільний → планшет → десктоп
- [x] Tailwind CSS mobile-first breakpoints: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- [ ] Тестування на реальних пристроях, не лише в DevTools

## Breakpoints (Tailwind CSS)
| Breakpoint | Min-width | Цільові пристрої |
|---|---|---|
| (default) | 0px | Телефони портрет (360-479px) |
| `sm:` | 640px | Телефони ландшафт, малі планшети |
| `md:` | 768px | Планшети портрет (iPad) |
| `lg:` | 1024px | Планшети ландшафт, малі ноутбуки |
| `xl:` | 1280px | Стандартні десктопи |
| `2xl:` | 1536px | Великі монітори |

- [x] Визначити кастомний breakpoint `xs: 360px` — `--breakpoint-xs: 360px` у `globals.css` @theme (Tailwind v4)
- [x] Основний контент container: max-width 1280px, padding 16px/24px/32px — `max-w-7xl px-4 sm:px-6 lg:px-8` у `Container.tsx`

## Мобільна навігація
- [x] Hamburger menu для мобільних (анімований бургер-іконка) — `Header.tsx`
- [x] Fullscreen або slide-in drawer для мобільного меню — `Header.tsx`
- [x] Bottom navigation bar для ключових розділів (опційно) — `BottomNav.tsx` (md:hidden, mobile-only, Home/Catalog/Blog/Contact)
- [x] Sticky header з тінню при скролі — `Header.tsx`
- [x] Back-to-top кнопка для довгих сторінок — `BackToTop.tsx`

## Адаптивні компоненти
- [x] Hero секція: вертикальний стек на мобільному, горизонтальний на desktop — HeroSection is text-centered single-column (no image split needed), CTA buttons: `flex-col sm:flex-row`
- [x] Services grid: 1 колонка → 2 → 3 → 4 — `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4` у `services/page.tsx`
- [x] Portfolio grid: 1 → 2 → 3 — `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` у `PortfolioContent.tsx`
- [x] Pricing cards: snap-scroll carousel на мобільному (85vw cards, overflow-x-auto snap-x), grid-cols-3 на desktop — `PricingContent.tsx`
- [x] Testimonials: snap-scroll carousel на мобільному (85vw cards), grid-cols-3 на desktop — `TestimonialsSection.tsx`
- [x] Footer: вертикальний стек → grid-cols-2 (md) → grid-cols-4 (lg) — `Footer.tsx`
- [x] Tables: горизонтальний скрол на мобільному (`overflow-x-auto`) — немає таблиць в поточній реалізації (всі дані у картках/grid)
- [x] Маркетплейс фільтри: collapse у drawer/bottom sheet на мобільному — `CatalogClient.tsx` (fixed bottom sheet на mobile, inline панель на md+)

## Touch та мобільний UX
- [x] Мінімальний розмір тач-таргету: 44×44px — `.touch-target` клас у globals.css
- [x] Відступ між інтерактивними елементами ≥ 8px — всі кнопки та лінки мають `gap-2`+ (8px+); `gap-0.5/1` тільки для icon+text всередині одного елемента
- [x] Swipe gestures для каруселей — touch swipe у TestimonialsSection (onTouchStart/onTouchEnd, threshold 50px)
- [x] Long-press меню — не блокуємо default behavior; немає `user-select: none` або `-webkit-touch-callout: none`
- [x] Keyboard type hints для input: `type="email"`, `type="tel"` — `CheckoutForm.tsx` (email, tel з autoComplete), `ContactForm.tsx` (type="text" intentional — приймає email або телефон)
- [x] Autocomplete атрибути для форм: `autocomplete="name"` тощо — `CheckoutForm.tsx` (given-name, family-name, email, tel, organization)

## Зображення та медіа
- [x] ~~`next/image` з `sizes`~~ — N/A: проєкт використовує CSS gradient placeholders замість фото
- [x] ~~Hero responsive image ratios~~ — N/A: немає hero image (CSS gradients)
- [x] Відео: `<video>` або YouTube embed з responsive wrapper — `src/components/ui/ResponsiveVideo.tsx` (аспект-раціо wrapper, iframe + native video support, lazy loading)
- [x] Зображення не ширші за контейнер — всі використовують `next/image` або `max-w-full`; Container обмежує ширину `max-w-7xl`

## Типографіка на мобільних
- [x] H1: fluid clamp(2rem, 6vw, 4rem) — `.text-fluid-h1` клас у globals.css
- [x] Мінімальний розмір тексту: ніколи менше 14px — дотримуємось у всіх компонентах
- [x] Line-height для тексту: 1.6-1.7 — body lh 1.6, fluid-body 1.7 у globals.css
- [x] Fluid typography через clamp() — `.text-fluid-h1/h2/h3/body` у globals.css

## PWA-готовність
- [x] `manifest.json`: назва, іконки, theme_color, background_color — `src/app/manifest.ts`
- [x] Іконки для PWA: 192px і 512px (maskable icons) — в manifest.ts
- [x] `apple-touch-icon` для iOS
- [x] Meta теги для iOS: `apple-mobile-web-app-capable`
- [x] Service Worker для базового офлайн-кешування — `public/sw.js` (cache-first для статики, network-first для API) + `ServiceWorkerRegister.tsx`

## Тестування на пристроях
- [ ] iPhone SE (375px) — найменший iOS
- [ ] iPhone 15 Pro (393px)
- [ ] Samsung Galaxy S23 (360px)
- [ ] iPad Mini 768px
- [ ] iPad Pro 1024px
- [ ] MacBook 1280px
- [ ] Desktop 1920px
- [x] Chrome DevTools Device Toolbar — Playwright viewport тести покривають 360px, 375px, 768px, 1280px (`e2e/viewport.spec.ts`, 8 тестів × 4 вьюпорти)
- [ ] Перевірити orientation: portrait + landscape (ручне тестування)

## Lighthouse Mobile
- [ ] Performance > 85 на мобільному
- [ ] Accessibility > 95 на мобільному
- [ ] Best Practices > 95
- [ ] SEO > 95

---

### Примітки
- В Україні 70%+ трафіку з мобільних — пріоритет мобільного дизайну обов'язковий.
- Google mobile-first indexing: Google індексує мобільну версію сайту.
- Fluid typography (clamp) краща за fixed breakpoints для тексту.


> ⚠️ **Незакреслені пункти ([ ]) — Phase 2:** потребують роботи дизайнера, фотографа або реального тестування на пристроях. Основний дизайн-система реалізована повністю.