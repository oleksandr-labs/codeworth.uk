# Маркетплейс — Кошик та оформлення (Marketplace Checkout)
Опис: Сторінка кошика та процес оформлення замовлення на готове рішення.
**URL:** `/marketplace/cart`, `/marketplace/checkout`
**Пріоритет:** Критичний — конверсія відбувається тут.
**Статус:** ✅ Готово (MVP)
**i18n статус:** ❌ Потребує i18n — CartClient.tsx та CheckoutClient.tsx (client components) не перекладено

---

## Кошик (/marketplace/cart)
- [x] Список товарів у кошику (emoji, назва, пакет, ціна) — `CartClient.tsx` (підключено до `useCart`)
- [x] Можливість змінити пакет (базовий → розширений → преміум) — `CartClient.tsx` (`updatePackage` + multiplier)
- [x] Можливість видалити товар — `CartClient.tsx` (`removeItem`)
- [x] Поле для промокоду/знижки (CODENEST10 = -10%) — `CartClient.tsx`
- [x] Підсумок: Сума, Знижка, Загальна вартість — `CartSummary.tsx` (live з `useCart`)
- [x] Кнопка "Продовжити покупки" + "Перейти до оплати" — `CartSummary.tsx`

## Міні-кошик (у хедері)
- [x] Іконка кошика з кількістю товарів — `MiniCart.tsx` (підключено до Header)
- [x] Dropdown з списком товарів при наведенні — `MiniCart.tsx`
- [x] Швидкий перехід до повного кошика — `MiniCart.tsx`

## Оформлення замовлення (/marketplace/checkout)
### Крок 1: Особисті дані
- [x] Ім'я, Прізвище — `CheckoutForm.tsx` (autocomplete given-name, family-name)
- [x] Email — `CheckoutForm.tsx` (autocomplete email)
- [x] Телефон — `CheckoutForm.tsx` (autocomplete tel)
- [x] Компанія (опціонально) — `CheckoutForm.tsx`

### Крок 2: Деталі проєкту
- [x] Назва вашого бізнесу, опис, побажання — `CheckoutForm.tsx`

### Крок 3: Оплата
- [x] Вибір методу оплати (картка, LiqPay, Monobank, рахунок) — `CheckoutForm.tsx`
- [x] Показати безпеку оплати (SSL-іконка + trust badges) — `CheckoutForm.tsx`
- [x] Checkbox: "Я погоджуюсь з умовами послуг" — `CheckoutForm.tsx`
- [ ] Реальна інтеграція з платіжною системою (Stripe, LiqPay) — ⚠️ Phase 2: потребує backend + Stripe/LiqPay акаунт

### Крок 4: Підтвердження
- [x] Підсумок замовлення (що замовлено, сума) — `CheckoutForm.tsx`
- [x] Кнопка "Оформити замовлення" — `CheckoutForm.tsx`

## Після оплати
- [x] Сторінка "Дякуємо!" (success state з іконкою) — `CheckoutForm.tsx`
- [ ] Email-підтвердження (потребує email-сервіс) — ⚠️ Phase 2: потребує Resend/SendGrid інтеграцію
- [x] Telegram-повідомлення менеджеру — `src/app/api/order/route.ts` (rate limiting 3/30хв, Telegram Bot API, orderId)

## Прогрес-бар
- [x] Візуальний індикатор кроків — `StepIndicator.tsx` у `CheckoutForm.tsx`

## Безпека
- [x] HTTPS через HSTS headers — `next.config.ts`
- [ ] PCI DSS compliance (при реальній інтеграції платіжних систем) — ⚠️ Phase 2: після реальної платіжної інтеграції

## Порожній кошик
- [x] Стан "Ваш кошик порожній" + кнопка до каталогу — `CartClient.tsx`

---

### Примітки
- Процес оформлення має бути максимально простим (мінімум полів).
- Додати trust badges: "Безпечна оплата", "SSL-захист", "Повернення коштів протягом 14 днів".
- A/B тестування кроків checkout для покращення конверсії.
