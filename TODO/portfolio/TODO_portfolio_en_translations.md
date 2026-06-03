# Portfolio EN Translations — Додавання англійських перекладів

**Статус:** ✅ Завершено — 226/226 проєктів мають descriptionEn + resultEn (оновлено 2026-05-03)
**Пріоритет:** 🔴 Критичний — EN-аудиторія не бачить перекладених коротких описів
**Файл:** `src/lib/data/portfolio.ts`

---

## Суть проблеми

Кожен portfolio-проєкт має:
- `description` — короткий опис (UK)  
- `result` — результат одним реченням (UK)
- `descriptionEn` / `resultEn` — англійські варіанти (відсутні у 32 проєктах)
- `caseStudyEn` — деталі кейсу EN (опціонально)

EN-аудиторія (`/en/portfolio`) бачила тільки UA-текст у 32 старих проєктах.

---

## ✅ Виправлено (з'явились EN-переклади)

### Нові проєкти (вже мали EN з моменту створення)
Всі проєкти створені після 2026-02 мають `descriptionEn` / `resultEn`.

### Виправлено вручну — 2026-05-01
- [x] `fashion-store` — додано `descriptionEn` + `resultEn`
- [x] `ai-chatbot-saas` — додано `descriptionEn` + `resultEn` + `caseStudyEn`
- [x] `bakery-pastry` — розширено `caseStudy` + повна `caseStudyEn`
- [x] `artisan-bread-bakery` — розширено `caseStudy` + повна `caseStudyEn`

### Виправлено фоновим агентом — 2026-05-01
- [x] Всі 226 проєктів — перевірено 2026-05-03, всі мають `descriptionEn` + `resultEn`

---

## Правила перекладу

- `descriptionEn` — не більше 2 речень, ділова англійська
- `resultEn` — пряме (не дослівне) переведення ключової метрики
- Зберігати числа та метрики точно (`+60%`, `180+`)
- Не перекладати назви брендів та технологій

---

## Перевірка після завершення

```bash
node -e "
const fs = require('fs');
const c = fs.readFileSync('src/lib/data/portfolio.ts', 'utf8');
const slugs = [...c.matchAll(/^\s+slug: \"([^\"]+)\"/gm)].map(m=>m[1]).filter(s=>s!=='slug');
const withEn = new Set([...c.matchAll(/slug: \"([^\"]+)\"[^}]+?descriptionEn/gs)].map(m=>m[1]));
const missing = slugs.filter(s => !withEn.has(s));
console.log('Missing EN:', missing.length, missing.join(', '));
"
```

Очікуваний результат: `Missing EN: 0`
