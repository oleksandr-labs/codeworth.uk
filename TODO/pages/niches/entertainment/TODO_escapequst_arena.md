# EscapeQuest Arena — Квест-кімнати

**Slug:** `escape-quest-arena`  
**Component:** `EscapeQuestDemo`  
**Niche:** Розваги / Entertainment  
**Colors:** `#0D0B1A` (deep dark), `#7C3AED` (violet), `#F59E0B` (amber gold), `#1E1B2E` (card)  
**Style:** Dark immersive, game-UI, NO white backgrounds, все на темному фоні  
**Font:** sans-serif (Inter / system-ui) — не serif, максимально сучасний  
**Complexity:** medium  

---

## Концепція

Сайт для квест-кімнат. Атмосферний, темний, як інтерфейс гри. Повна протилежність медичним і ресторанним демо. Жодних пастельних кольорів — тільки темний фон, фіолетові та бурштинові акценти, SVG-іконки замків/ключів/полум'я.

---

## Секції

### 1. Hero — «Choose Your Mission»
- Ліво: велике `CHOOSE YOUR MISSION` (капслок, tracking-wide), підзаголовок, CTA кнопки
- Право: картка **«Today's Slots»** — список часових слотів на сьогодні (14:00, 15:30, 17:00, 18:30, 20:00) з назвою кімнати і кількістю вільних місць (або FULL)
- Картка: темний фон `#1E1B2E`, бурштинова рамка, кнопка «Quick Book»
- Фон секції: темно-фіолетовий градієнт `from-[#0D0B1A] to-[#1a1040]`

### 2. Rooms — «The Missions»
- 4 картки в сітці 2×2 (mobile: 1 col)
- Кожна кімната має унікальний акцент-колір:
  - **Mystery Manor** — amber `#F59E0B`, 60хв, 2-6 осіб, складність 3/5
  - **Sci-Fi Lab** — cyan `#38BDF8`, 75хв, 2-8 осіб, складність 4/5
  - **Horror Asylum** — red `#EF4444`, 60хв, 3-6 осіб, складність 5/5 (18+)
  - **Adventure Cave** — emerald `#10B981`, 60хв, 2-8 осіб, складність 2/5
- Кожна картка: темний фон зі своїм відтінком, жанр-бейдж (Mystery / Sci-Fi / Horror 18+ / Adventure)
- Складність: 5 іконок полум'я (filled/outline) замість зірочок — унікально
- Внизу: ціна за групу + кнопка «Book this room»
- Картки мають hover: border glow своїм акцент-кольором

### 3. How It Works
- 3 великі кроки в ряд
- Кожен: велика цифра (1/2/3) в колі, іконка SVG, заголовок, опис
  1. Book Online — вибираєш місію, час, розмір групи
  2. Arrive & Gear Up — інструктаж 10 хвилин перед кімнатою
  3. Escape! — 60-75 хвилин щоб вибратись
- Фон секції: `#0D0B1A` з тонкими hex-grid декоративними лініями

### 4. Group Packages
- 3 пакети в ряд
- **Birthday Party** — 1 кімната + торт + фото, від 1500 грн
- **Corporate Team** — 2 кімнати одночасно + debriefing, від 3500 грн  
- **Champion League** — 4 кімнати турнір, нагороди, від 6000 грн
- Картки темні з фіолетовим акцентом, центральна — "Popular" бейдж з amber

### 5. Booking Form
- Простий одноекранний form, не wizard
- Поля: вибір кімнати (radio cards з назвами), дата, час, кількість людей, ім'я, телефон
- Кнопка Submit: великий фіолетовий градієнт
- After submit: SUCCESS стан — велика іконка ключа, «Mission Accepted»

### 6. Reviews
- 4 картки відгуків
- Кожна: inials circle (унікальний колір), рейтинг зірочок, цитата, ім'я + кімната
- "Escaped in 48 min! / Didn't escape but had the best time of our lives..."

### 7. Footer CTA
- Темний з фіолетовим градієнтом
- «Ready to accept the challenge?» + CTA кнопка
- Контактна інфо: адреса, телефон, режим роботи

---

## Технічні деталі

### SVG Icons (всі inline, no external lib)
- `IconLock` — замок
- `IconKey` — ключ
- `IconClock` — годинник для тривалості
- `IconUsers` — силуети людей для групи
- `IconFlame` — полум'я для складності (filled/outline)
- `IconCheck` — галочка
- `IconChevron` — стрілка для навігації
- `IconStar` — зірочка для відгуків
- `IconBolt` — блискавка для «Quick Book»
- `IconShield` — щит для безпеки (жахи 18+)

### Tailwind palette
```
bg-[#0D0B1A]   — main bg
bg-[#1E1B2E]   — card bg
bg-[#2D2845]   — card highlight
text-[#A78BFA] — secondary text
text-[#C4B5FD] — muted text  
border-violet-700
bg-violet-600 hover:bg-violet-700  — primary CTA
text-amber-400 bg-amber-500        — accent/slots
```

### Data arrays
- `ROOMS_EN` / `ROOMS_UK` — 4 кімнати з повними описами
- `TODAY_SLOTS_EN` / `TODAY_SLOTS_UK` — часові слоти для hero
- `PACKAGES_EN` / `PACKAGES_UK` — 3 групових пакети
- `REVIEWS_EN` / `REVIEWS_UK` — 4 відгуки
- `HOW_IT_WORKS_EN` / `HOW_IT_WORKS_UK` — 3 кроки

### State
- `selectedRoom` — вибрана кімната (string | null)
- `bookingData` — { room, date, time, size, name, phone }
- `bookingDone` — boolean
- `hoveredRoom` — для hover ефекту

---

## Що робить цей демо унікальним
1. **Темний фон** — єдиний демо в портфоліо з #0D0B1A як основним кольором
2. **Flame difficulty** — замість зірочок — полум'я SVG (filled/outline)
3. **Today's Slots card** в hero — real-time like UI
4. **Room accent colors** — кожна кімната має свій колір (amber/cyan/red/emerald), не одна схема
5. **Атмосферні описи** — "The patients are still here. And so is the doctor." — storytelling у даних
