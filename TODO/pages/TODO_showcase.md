# Сторінка "Showcase" — Живі Демо Компонентів

**URL:** `/showcase`
**Пріоритет:** 🟢 Низький — wow-фактор для потенційних клієнтів
**Статус:** ✅ Реалізовано — 2026-05-02: `src/app/[lang]/showcase/page.tsx` + `ShowcaseClient.tsx` (SSG, EN+UK, sticky sidebar nav, 8 demo-секцій: Buttons/Badges/Avatars/Forms/Feedback/Progress+Steps/Cards/Skeleton + посилання на 9 extras-демо, sitemap)
**i18n:** EN + UK

---

## Концепція

Інтерактивна галерея всіх реалізованих UI-компонентів та модулів у живому стані.
Клієнт може "пощупати" кожен компонент перед замовленням.

Аналоги: Tailwind UI Showcase, shadcn/ui, Framer Community.

---

## Розділи Showcase

### 🎨 UI Components
- Buttons (primary, secondary, outline, ghost, loading, disabled)
- Inputs (text, search, select, checkbox, toggle, radio)
- Cards (product, portfolio, testimonial, pricing)
- Badges / Tags / Pills
- Modals / Dialogs
- Tooltips / Popovers
- Toasts / Notifications
- Progress bars / Loading states
- Avatars / User profiles

### ⚡ Interactive Features (з каталогу Extras)
- Before/After Slider (`feat-before-after`)
- Lead Quiz (`feat-lead-quiz`)
- FOMO Widget (`feat-fomo`)
- Booking Calendar (`feat-booking`)
- Price Calculator (`feat-calculator`)
- Bundle Builder (`ecom-bundle-builder`)
- AI Chatbot Demo (`ai-chatbot-rag`)
- Search with suggestions (`feat-search`)
- Catalog Filters (`feat-filters`)

### 🎞 Animations
- Fade in / Slide up (на scroll)
- Stagger animations (списки)
- Page transitions
- Hover micro-interactions
- Counting numbers animation
- Typewriter effect

### 🌙 Теми
- Light / Dark mode toggle
- Color scheme switcher (indigo / emerald / rose / amber)

---

## Технічна реалізація

```
src/app/[lang]/showcase/
  page.tsx          — хаб зі списком секцій + навігацією
  ui/page.tsx       — базові UI компоненти
  features/page.tsx — інтерактивні модулі
  animations/page.tsx
```

### Особливості
- Sticky sidebar навігація по секціях
- "Копіювати код" кнопка для кожного компонента
- Посилання на відповідний Extra в каталозі
- Mobile-friendly: компоненти показані в mobile viewport

---

## SEO
- Title: "UI Компоненти та живі демо | CodeNest Showcase"
- Attracts: "next.js components showcase", "tailwind components"
- Внутрішні посилання: кожен компонент → сторінка Extra в каталозі
