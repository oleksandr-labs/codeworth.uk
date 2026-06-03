# Маркетплейс — Особистий кабінет (Marketplace Account)
Опис: Особистий кабінет покупця для перегляду замовлень, статусу проєктів та підтримки.
**URL:** `/marketplace/account`
**Пріоритет:** Середній
**Статус:** ✅ Готово (MVP)
**i18n статус:** ❌ Потребує i18n — AccountClient.tsx та LoginForm.tsx (client components) не перекладено

---

## Авторизація
- [x] Вхід через Email + пароль — `/marketplace/login` (LoginForm + useAuth + /api/auth/login, demo credentials)
- [x] Redirect до login при спробі відкрити account без авторизації — `AccountClient.tsx` (useEffect + router.replace)
- [x] Logout — кнопка "Вийти" в AccountClient, clear localStorage + redirect
- [ ] "Забули пароль?" (відновлення через email) — ⚠️ Phase 2: потребує email-сервіс (Resend/SendGrid)
- [ ] Можливість реєстрації через Google/Facebook (OAuth) — ⚠️ Phase 2: потребує NextAuth.js + DB
- [ ] Двофакторна автентифікація (2FA, опціонально) — ⚠️ Phase 3: опціональна фіча

## Dashboard
- [x] Привітання з іменем — `AccountClient.tsx`
- [x] Загальна статистика: Кількість замовлень, Активних проєктів, Витрачено — `AccountClient.tsx`
- [x] Швидкі посилання: Мої замовлення, Підтримка, Налаштування — `AccountClient.tsx`

## Мої замовлення
- [x] Список усіх замовлень (картки) — `AccountClient.tsx`
- [x] Кожне замовлення: Номер, Дата, Продукт, Статус, Сума — `AccountClient.tsx`
- [x] Статуси: Очікує обробки → В роботі → Завершено → Скасовано — `AccountClient.tsx`
- [x] Прогрес-бар виконання з кроками — `AccountClient.tsx`

## Деталі замовлення
- [x] Інформація про продукт та пакет — `AccountClient.tsx`
- [x] Статус виконання (прогрес-бар з кроками Прийнято/В роботі/Тестування/Готово) — `AccountClient.tsx`
- [x] Посилання на готовий сайт (якщо є) — `AccountClient.tsx`
- [x] Кнопка "Зв'язатися з підтримкою" — `AccountClient.tsx`
- [x] Файли та архів (демо-версія, фінальна версія)
- [x] Історія комунікації з менеджером

## Мої проєкти
- [x] Список запущених проєктів (готові сайти) — `AccountClient.tsx`
- [x] Кожен проєкт: Назва, URL, Дата запуску, Статус хостингу — `AccountClient.tsx`
- [x] Посилання на сайт — `AccountClient.tsx`
- [x] Інформація про термін дії хостингу — `AccountClient.tsx`

## Рахунки та оплата
- [x] Таблиця рахунків з датою, сумою, статусом — `AccountClient.tsx`
- [x] Кнопка завантажити інвойс (іконка) — `AccountClient.tsx`
- [ ] Реальне завантаження PDF-інвойсу (потребує backend) — ⚠️ Phase 2: потребує PDF-генерацію на сервері

## Налаштування профілю
- [x] Редагування особистих даних (ім'я, email, телефон) — `AccountClient.tsx`
- [x] Зміна пароля — `AccountClient.tsx`
- [x] Налаштування сповіщень (email, SMS, Telegram, маркетинг) — `AccountClient.tsx`
- [x] Видалення акаунту — `AccountClient.tsx`

## Підтримка
- [x] Форма звернення в підтримку (тема + повідомлення) — `AccountClient.tsx`
- [x] Швидкі контакти: Telegram, Email, Телефон — `AccountClient.tsx`
- [ ] Історія тикетів (потребує backend) — ⚠️ Phase 2: потребує DB + API

## Сповіщення
- [x] Іконка з індикатором непрочитаних (amber dot) — `AccountClient.tsx`
- [ ] Список сповіщень (потребує backend) — ⚠️ Phase 2: потребує DB + push notifications

---

### Примітки
- Кабінет має бути інтуїтивним та простим.
- Показувати прозорий статус виконання замовлення (як на Amazon/Rozetka).
- Можливість швидко зв'язатися з менеджером (кнопка "Написати в Telegram").
