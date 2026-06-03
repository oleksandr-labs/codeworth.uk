# Visual Customizer — Інтерактивний Редактор Сайту

**Концепція:** Клієнт під час перегляду демо або в особистому кабінеті може вибирати кольорову схему, шрифти та layout — і бачити зміни в реальному часі. Під час замовлення — обрані налаштування передаються разом з замовленням.

**Де використовується:**
1. `/niches/[slug]` — floating панель "Налаштуй свій сайт" під час перегляду демо
2. `/portfolio/[slug]` — вбудована панель вибору стилю
3. `/dashboard/customizer` — повна версія в клієнтській адмінці після покупки

**Статус:** ✅ Реалізовано — FloatingPanel + ColorPaletteSelector + FontPairSelector + PackageSelector

---

## Функціонал

### 1. Кольорові схеми (Color Palettes)

6 готових палет — змінюють CSS custom properties в реальному часі:

| Палета | Primary | Accent | Background | Назва |
|---|---|---|---|---|
| Indigo (default) | #1E1B4B | #7C3AED | #FAFAF9 | Professional |
| Ocean | #0F3460 | #16213E | #E8F4F8 | Corporate |
| Forest | #1A3C34 | #2D6A4F | #F8FAF5 | Natural |
| Sunset | #7B2D00 | #E85D04 | #FFF8F0 | Warm |
| Rose | #831843 | #DB2777 | #FFF5F7 | Elegant |
| Midnight | #0F0E17 | #6366F1 | #1A1A2E | Dark |

**Технічна реалізація:**
```tsx
// CSS variables approach (найшвидший)
document.documentElement.style.setProperty('--color-primary', palette.primary)
document.documentElement.style.setProperty('--color-accent', palette.accent)
// ...

// або через data-theme attribute + Tailwind
document.documentElement.setAttribute('data-theme', 'ocean')
```

### 2. Шрифтові пари (Font Pairs)

5 пар — завантажуються через Google Fonts:

| Пара | Заголовки | Текст | Характер |
|---|---|---|---|
| Modern (default) | Inter | Inter | Нейтральний |
| Classic | Playfair Display | Lora | Елегантний |
| Tech | Space Grotesk | DM Sans | Технологічний |
| Friendly | Nunito | Open Sans | Доступний |
| Bold | Sora | Sora | Сучасний |

**Технічна реалізація:**
```tsx
// Динамічне підвантаження шрифту
const link = document.createElement('link')
link.href = `https://fonts.googleapis.com/css2?family=${fontPair.heading}&display=swap`
document.head.appendChild(link)
document.documentElement.style.setProperty('--font-heading', fontPair.heading)
```

### 3. Layout Варіанти (для деяких ніш)

Де має сенс (лендінги, ресторани):
- Hero: Centered / Left-aligned / Split (image left)
- Cards: Grid 2 col / Grid 3 col / List
- Header: Transparent / Solid / Minimal

### 4. Пакетна комплектація (Order Package Selector)

Прямо в customizer — вибір пакету перед замовленням:
- **Basic** (£499): 5 сторінок, мобільна адаптація, базовий SEO
- **Standard** (£999): 10 сторінок + нішевий модуль, analytics, CMS
- **Premium** (£1,999+): кастомний дизайн, всі модулі, пріоритетна підтримка

Вибраний пакет + кольорова схема + шрифти → передаються при замовленні.

---

## UI Customizer Panel

### Варіант A: Floating Panel (на demo-сторінках)

```
┌─────────────────────────────┐
│  🎨 Налаштуй свій сайт      │
├─────────────────────────────┤
│  Кольори:                   │
│  ● ○ ○ ○ ○ ○               │
│  Professional               │
├─────────────────────────────┤
│  Шрифти:                    │
│  ● Modern  ○ Classic  ○ Tech│
├─────────────────────────────┤
│  [Замовити з цим дизайном]  │
│  від £499                   │
└─────────────────────────────┘
```

Позиція: fixed right side, collapsible (мобайл — bottom drawer).

### Варіант B: Embedded Panel (на portfolio/[slug])

Секція між Demo Preview і Case Study:
- Заголовок: "Обери свій стиль"
- Горизонтальні кнопки палет + preview thumbnail
- Iframe нижче оновлюється миттєво через postMessage
- CTA "Замовити з вибраним дизайном"

### Варіант C: Full Page (dashboard/customizer)

Для клієнтів після покупки — повна версія:
- Ліво: всі опції (кольори, шрифти, layout)
- Право: живий preview (iframe власного сайту)
- Кнопка "Зберегти та опублікувати" → API call

---

## Технічна реалізація

### Компоненти
```
src/components/customizer/
  ├── CustomizerPanel.tsx         → floating/embedded варіант
  ├── ColorPaletteSelector.tsx    → 6 кольорових кнопок
  ├── FontPairSelector.tsx        → 5 шрифтових пар
  ├── LayoutVariantSelector.tsx   → layout опції
  ├── PackageSelector.tsx         → Basic/Standard/Premium
  ├── LivePreviewFrame.tsx        → iframe + postMessage bridge
  └── useCustomizer.ts            → hook зі станом і localStorage
```

### State Management
```ts
interface CustomizerState {
  palette: 'professional' | 'ocean' | 'forest' | 'sunset' | 'rose' | 'midnight'
  fontPair: 'modern' | 'classic' | 'tech' | 'friendly' | 'bold'
  layoutVariant: 'centered' | 'left' | 'split'
  selectedPackage: 'basic' | 'standard' | 'premium'
  nicheSlug: string
}

// localStorage persist + URL params for sharing
// ?theme=ocean&font=classic&package=standard
```

### PostMessage Bridge (для iframe preview)
```ts
// CustomizerPanel.tsx
iframeRef.current?.contentWindow?.postMessage({
  type: 'THEME_CHANGE',
  payload: { palette: 'ocean', fontPair: 'classic' }
}, '*')

// Niche demo page (всередині iframe)
window.addEventListener('message', (e) => {
  if (e.data.type === 'THEME_CHANGE') {
    applyTheme(e.data.payload)
  }
})
```

### Інтеграція з замовленням
- При кліку "Замовити" → передати `?theme=ocean&font=classic&package=standard&niche=restaurant`
- `/contact` або `/marketplace/checkout` підхоплює params і показує клієнту що він обрав
- Email підтвердження включає обрані параметри

---

## Реалізація на нішевих demo-сторінках

### Поточний стан
Нішеві demo-сторінки (`/niches/[slug]`) мають хардкод кольорів і шрифтів у кожному компоненті.

### Що потрібно змінити
- [ ] Перейти на CSS custom properties у всіх нішевих demo-компонентах -- Phase 3: масштабний рефакторинг 33+ компонентів
- [ ] `var(--color-primary)` замість `text-indigo-700` — Phase 3
- [ ] Tailwind `arbitrary values` з CSS vars: `bg-[var(--color-primary)]` — Phase 3
- [ ] Або `data-theme` attribute + окремі CSS файли по темам — Phase 3

**Альтернатива (швидша):** Customizer panel міняє клас на `<html>` або `<body>` → Tailwind dark mode аналог але для тем. Tailwind v4 має нативну підтримку CSS variables.

---

## Що ще можна додати (розширення)

- **Кастомний логотип** — upload свого логотипу і побачити в demo
- **Текстовий preview** — змінити назву компанії прямо в demo і побачити
- **Мобільний/десктопний preview** — перемикач viewport
- **Share link** — поділитись з налаштованим дизайном з партнером
- **Порівняння двох тем** — side-by-side comparison

---

## Пріоритети реалізації

| Пріоритет | Завдання |
|---|---|
| ✅ HIGH | `ColorPaletteSelector` + CSS variables — реалізовано в `CustomizerPanel.tsx` (всі 33 ніші) |
| ✅ HIGH | Floating Panel на `/niches/[slug]` з 6 палетами — `CustomizerPanel.tsx` |
| ✅ MED | `FontPairSelector` + Google Fonts dynamic load — реалізовано в `useCustomizer.ts` + `CustomizerPanel.tsx` |
| ✅ MED | `PackageSelector` в панелі + передача в замовлення через URL params |
| 🟡 MED | Embedded panel на `/portfolio/[slug]` |
| 🟢 LOW | iframe postMessage bridge для live preview |
| 🟢 LOW | Full page `/dashboard/customizer` для клієнтів |
| 🟢 LOW | Share link + URL params |
