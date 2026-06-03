# VinoCave — Преміум Винний Бар

**Slug:** `wine-cave-bar`  
**Component:** `VinoCaveDemo`  
**Niche:** Ресторан / Бар  
**Colors:** `#1A0E0A` (near-black warm), `#7B1F2E` (deep burgundy), `#C9952A` (warm gold), `#F5F0E8` (parchment)  
**Style:** Dark editorial, wine culture, serif typography — warm і розкішний  
**Font:** `font-serif` (Georgia) — editorial тон, відрізняється від sans-serif решти  
**Complexity:** medium  

---

## Концепція

Сайт для преміум винного бару з власним погребом. Темний, теплий, editorial. Не схожий на ресторан (Smachno — яскравий/веселий), не схожий на доставку. Це місце де п'ють повільно, слухають джаз, і розмовляють про терруар. Дизайн відображає це — темні теплі тони, золото, пергамент, serif шрифт, сомельє-картки з нотами дегустації.

---

## Секції

### 1. Hero — Editorial Split
- Ліво: текст — невелике кредо "THE CAVE BELOW THE CITY", headline, підзаголовок про колекцію, CTA
- Право: **Sommelier's Pick Tonight** — картка
  - Назва вина (напр. "Barolo Riserva 2019")
  - Регіон + виноград
  - Профіль: 3 рядки (Body / Tannins / Acidity) з filled/outline кружечками (5 кружечків)
  - Нотатки: "Truffle · Dried roses · Tobacco"
  - Ціна: Glass £14 · Bottle £74
- Фон: темно-теплий градієнт `from-[#1A0E0A] to-[#2E1208]`
- Декоративний елемент: велика SVG wine glass за текстом (opacity 5%)

### 2. Wine Menu
- Tab-навігація: Red | White | Rosé | Sparkling | Orange
- Під кожним табом: 3-4 вини у карточках
- Кожна картка вина:
  - Назва + вінтаж (рік)
  - Регіон + виноград (маленький текст)
  - Тастинг профіль (3 рядки: Body/Tannins/Acidity, 5 кружечків)
  - Нотатки смаку (3-4 слова через крапку): "Dark cherry · Tobacco · Cedar"
  - Ціна: скло / пляшка
  - Бейдж (необов'язково): "Staff Pick" / "Organic" / "New" / "Rare"
- 5 категорій: Red (4 вина), White (3), Rosé (2), Sparkling (2), Orange (2)
- Картки темні `#231610`, gold border/hover

### 3. Wine & Food Pairings
- 3 "пари": вино + страва
  - "Barolo + Truffle Risotto"
  - "Chablis + Oysters Gratin"
  - "Côtes du Rhône + Charcuterie Board"
- Кожна пара: ліво — вино опис, право — страва опис, між ними +
- Фон: темніший `#140B07`

### 4. Upcoming Events
- Горизонтальний scroll (mobile) / Grid 3-col (desktop)
- 4-5 подій: тематичні дегустації
  - "Barolo vs Amarone Night" — Friday, 7 May, 19:00
  - "Georgian Wine Discovery" — Saturday, 8 May, 18:30
  - "Wine & Jazz: The Bordeaux Session" — Thursday, 14 May, 20:00
  - "Natural Wines Masterclass" — Sunday, 10 May, 15:00
- Картка події: дата велика в кутку, назва, кількість місць, ціна, кнопка «Reserve»

### 5. The Cave Story (About)
- 2-колонковий layout
- Ліво: короткий текст про погріб — "17 metres below street level. Temperature never exceeds 14°C. Over 400 labels from 22 countries."
- Право: 3 числових стати у великих цифрах: 400+ labels / 22 countries / Since 2011
- Фон: `#1A0E0A` з декоративним SVG wine bottle в кутку

### 6. Reservation Form
- Простий form: ім'я, дата, час, кількість гостей, спеціальний привід (toggle: birthday / anniversary / business / just wine)
- Кнопка: dark gold bg `#C9952A` text `#1A0E0A`
- After submit: «Table awaits you» success state з іконкою wine glass

### 7. Footer CTA
- Темний із золотим лінійним орнаментом зверху
- "Pour yourself a seat." — слоган
- Адреса, години, телефон, соцмережі

---

## Технічні деталі

### SVG Icons (всі inline)
- `IconWineGlass` — бокал вина
- `IconLeaf` — для organic вин
- `IconCalendar` — для подій
- `IconCheck` — для успіху форми
- `IconChevron` — для табів
- `IconGlobe` — для регіонів
- `IconStar` — для рейтингів

### Tailwind palette
```
bg-[#1A0E0A]   — main bg
bg-[#231610]   — card bg
bg-[#2E1D14]   — card hover
text-[#F5F0E8] — primary text (parchment)
text-[#C9A88A] — secondary text (warm taupe)
text-[#C9952A] — gold accent
bg-[#7B1F2E]   — burgundy button bg
border-[#3D2015] — card border
```

### Tasting Profile Component
- Назвати `TastingDots`: 5 кружечків, filled/outline
- Використовується 3 рази в кожному wine card: Body / Tannins / Acidity

### Data arrays
- `WINES` — об'єкт з ключами `red | white | rose | sparkling | orange`, кожен масив карток
- `PAIRINGS_EN/UK` — 3 пари вино+страва
- `EVENTS_EN/UK` — 4-5 подій з датами
- `SOMMELIER_PICK_EN/UK` — featured вино для hero card

### State
- `activeWineTab: "red" | "white" | "rose" | "sparkling" | "orange"` — активний таб
- `reservationData` — поля форми
- `reservationDone` — boolean
- `activeEvent` — hover стан для event картки

---

## Що робить цей демо унікальним
1. **Serif editorial** — єдиний темний демо з `font-serif`, gives newspaper/magazine feel
2. **Tasting profile dots** — Body / Tannins / Acidity кружечками (5 штук) — унікальний UI елемент
3. **Sommelier's Pick card** в hero — знання + елегантність
4. **Wine by-the-glass pricing** — glass/bottle divide у картках
5. **Warm black** (`#1A0E0A`) vs cold black (EscapeQuest) — навіть темні демо різні між собою
6. **Events calendar** — типовий для wine bars, відсутній в інших демо
