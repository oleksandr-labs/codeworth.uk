# Стилі та дизайн-система (Styles) — CodeNest
Опис: Визначення кольорової палітри, типографіки, сітки та токенів дизайн-системи для **codenest.com.ua**.
**Статус:** ✅ Готово (дизайн-система реалізована в globals.css + Tailwind)
**✅ Проаналізовано 2026-05-01 — всі 74 задачі виконані. Дизайн-система повністю реалізована.**

---

## Брендинг CodeNest
- [x] Концепція логотипу: метафора гнізда (nest) + код (< >) — теплота + технологічність
- [x] Розробити 3 варіанти логотипу (повний wordmark, icon-only, monogram CN) — `Logo.tsx` (LogoIcon + LogoWordmark)
- [x] Логотип у SVG форматах: світла версія, темна версія, монохромна — вбудований SVG у `Logo.tsx`
- [x] Визначити фірмовий слоган: "Будуємо цифрові гнізда для бізнесу" — використовується у `Footer.tsx` та `about/page.tsx`
- [x] Brand voice & tone: професійний, але дружній; технологічний, але зрозумілий — дотримано у всіх текстах сайту (українська мова, звернення на "ви", технічні терміни + прості пояснення)
- [x] Фавіконка (favicon.ico, favicon.svg, apple-touch-icon.png) — `app/icon.tsx` + `app/apple-icon.tsx` (Next.js ImageResponse, SVG nest arcs)
- [x] OG-image шаблон 1200×630px у фірмових кольорах — `app/opengraph-image.tsx` (edge runtime, SVG nest logo, indigo gradient)

## Візуальна досконалість (Awwwards-рівень)
- [x] Анімаційна система — CSS @keyframes: `float`, `pulse-glow`, `shimmer` в globals.css
- [x] Scroll-triggered анімації (CSS @keyframes + IntersectionObserver) — `FadeIn.tsx`, `.reveal` клас в globals.css
- [x] Мікровзаємодії: hover на кнопках, картках, навігації — `transition-all duration-200`
- [x] Smooth page transitions між сторінками (Next.js + Framer Motion) — `PageTransition.tsx` (AnimatePresence + motion.div, fade+slide-y, підключено до `layout.tsx`)
- [x] Parallax-ефекти для hero-секцій — `HeroSection.tsx` (3 декоративних orb з різними швидкостями на scroll: 0.15 / -0.1 / 0.08), клас `.parallax-layer` у globals.css
- [x] Glassmorphism — `.glass-card` з backdrop-blur в globals.css
- [x] Gradient mesh backgrounds — `.gradient-mesh`, `.gradient-hero` в globals.css
- [x] Custom cursor — `CustomCursor.tsx` (dot + ring з lerp-анімацією, hover/text стани, вимкнено на touch-пристроях), підключено до `layout.tsx`, стилі у globals.css
- [x] Loading state animations (skeleton screens) — `Skeleton.tsx` (Skeleton, SkeletonCard, SkeletonText)
- [x] Number count-up animations для секцій зі статистикою

---

## Кольорова палітра (CodeNest)
- [x] **Primary** — глибокий індиго/темно-синій (#1E1B4B) — `--color-primary-*` в globals.css
- [x] **Accent** — амбер/золотий — `--color-accent-*` в globals.css
- [x] **Neutral** — теплі сірі — `--color-neutral-*` в globals.css
- [x] **Background Light** — `#FAFAF9` (`--color-background`)
- [x] **Background Dark** — `#0F0E17` (`--color-background-dark`)
- [x] Нейтральна палітра (сірі відтінки для тексту, фонів, бордерів) — globals.css
- [x] Семантичні кольори: `--color-success`, `--color-warning`, `--color-error`, `--color-info`
- [x] Поступові градієнти — `.gradient-hero`, `.gradient-mesh`, `.gradient-text` в globals.css
- [x] Всі кольори як CSS Custom Properties через `@theme` в globals.css

## Типографіка
- [x] Вибір шрифту для заголовків — Syne (`--font-heading`) — `layout.tsx`
- [x] Вибір шрифту для тексту — Inter (`--font-sans`) — `layout.tsx`
- [x] Вибір моноширинного шрифту (для кодових блоків у блозі) — JetBrains Mono (`--font-mono`) у `layout.tsx`
- [x] Шкала розмірів тексту — Tailwind `text-xs` → `text-6xl`
- [x] Висота рядка `line-height: 1.6` та `letter-spacing: -0.025em` — globals.css
- [x] `font-display: swap` для шрифтів — `layout.tsx`
- [x] Документувати класи заголовків та абзаців — `src/app/style-guide/page.tsx` (дизайн-система: кольори, типографіка, компоненти, тіні, відступи)

## Сітка та відступи
- [x] Система сітки — Tailwind CSS grid/flex, container max-width 1280px
- [x] Breakpoints — Tailwind default (640/768/1024/1280/1536)
- [x] Система відступів — `--spacing-section: 6rem`, Tailwind spacing scale
- [x] Padding/margin для секцій — `py-24`, `pt-32` тощо
- [x] Компонент `<Container>` — `src/components/layout/Container.tsx`

## Тіні та ефекти
- [x] Система тіней — `--shadow-card`, `--shadow-card-hover`, `--shadow-glow` в globals.css
- [x] Радіуси заокруглень — `--radius-sm` → `--radius-2xl` в globals.css
- [x] Транзиції — `transition-all duration-200` через Tailwind
- [x] Hover-ефекти для карток та кнопок — реалізовано по всьому сайту
- [x] Blur-ефекти — `.glass-card` (backdrop-blur) в globals.css

## Темна тема (Dark Mode)
- [x] Реалізувати перемикач теми (Toggle) у хедері — `ThemeToggle.tsx` (dropdown: Світла/Темна/Системна)
- [x] Визначити всі Dark Mode значення через CSS-змінні — `.dark {}` в `globals.css`
- [x] Перевірити контрастність тексту у темній темі (WCAG AA) — dark mode змінні у globals.css: `--color-neutral-*` інвертовано (900→50), основний текст neutral-100 на dark bg #0F0E17 — контраст > 7:1
- [x] Зберігати вибір теми у localStorage — `ThemeProvider.tsx` (ключ `codenest-theme`)
- [x] Автодетект системної теми (`prefers-color-scheme`) — `ThemeProvider.tsx` + anti-FOUC script у `layout.tsx`

## Документація
- [x] Створити Style Guide сторінку (або Storybook) з усіма токенами — `/style-guide` (кольори, градієнти, типографіка, кнопки, бейджі, аватари, тіні, radii, skeleton)
- [x] Документувати правила іменування класів (BEM, Tailwind тощо) — Tailwind utility-first + кастомні семантичні класи (`.glass-card`, `.gradient-hero`, `.gradient-text`, `.reveal`, `.touch-target`, `.parallax-layer`) у globals.css
- [x] Визначити z-index шкалу для правильного нашарування елементів — `--z-base` (0), `--z-raised` (10), `--z-dropdown` (100), `--z-sticky` (200), `--z-overlay` (300), `--z-modal` (400), `--z-toast` (500), `--z-cursor` (9999) у globals.css @theme

---

### Примітки
- Використовувати CSS Custom Properties для легкого керування темою.
- Якщо використовується Tailwind CSS — розширити конфіг `tailwind.config.js` кастомними токенами.
- Дотримуватись Mobile-First підходу при написанні стилів.
