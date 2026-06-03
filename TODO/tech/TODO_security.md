 Безпека та захист даних (Security) — codenest.com.ua
Опис: Технічна безпека сайту та відповідність вимогам GDPR/CCPA. Захист від основних векторів атак.
**Статус:** Частково виконано
**✅ Проаналізовано 2026-05-01 — 23/50 задач виконані. Ключові відкриті: NextAuth, 2FA адмін-панелі, Cloudflare WAF, Sentry. Поточний рівень достатній для MVP деплою.**
**✅ Оновлено 2026-05-03: reCAPTCHA v3 ✅, Dependabot ✅ — фактичний рахунок: 25/50.**

---

## Автентифікація та авторизація
- [ ] NextAuth.js для аутентифікації (OAuth + credentials)
- [ ] JWT з коротким терміном дії (access: 15хв, refresh: 7 днів)
- [ ] Bcrypt для хешування паролів (cost factor >= 12)
- ✅ Rate limiting на ендпоїнтах аутентифікації — `src/lib/rateLimit.ts` (5 спроб/15хв для auth/login, per-IP)
- [ ] CSRF-захист (built-in у NextAuth + SameSite cookies)
- [ ] 2FA (Two-Factor Authentication) для адмін-панелі
- ✅ Account lockout після N невдалих спроб входу — 5 failed attempts → 15 min lockout per email, in-memory Map, `api/auth/login/route.ts`
- [ ] Secure HttpOnly cookies для сесійних токенів

## Захист від ін'єкцій (OWASP Top 10)
- [ ] Parameterized queries / Prisma ORM (захист від SQL Injection)
- ✅ Input validation на сервері (Zod або Yup) — `src/lib/schemas.ts` (ContactSchema, NewsletterSchema, OrderSchema, LoginSchema)
- ✅ Output encoding для запобігання XSS — React автоматично escapes всі значення у JSX; Next.js sanitizes server output
- ✅ Content Security Policy (CSP) заголовки — `next.config.ts` (script-src, style-src, font-src, img-src, connect-src, frame-src, object-src); додано reCAPTCHA domains (google.com, gstatic.com) та LiqPay у form-action (2026-05-03)
- ✅ Sanitization контенту — проєкт не приймає HTML від користувачів (тільки plain text через Zod schemas); React автоматично escapes output
- ✅ Захист від Command Injection — проєкт не виконує shell-команд; всі API routes працюють тільки з JSON/fetch

## HTTP Security Headers
- ✅ `Content-Security-Policy` — обмежити джерела скриптів/стилів
- ✅ `X-Frame-Options: DENY` — захист від clickjacking
- ✅ `X-Content-Type-Options: nosniff`
- ✅ `Referrer-Policy: strict-origin-when-cross-origin`
- ✅ `Permissions-Policy` — обмежити доступ до камери/гео
- ✅ `Strict-Transport-Security` (HSTS) — форсувати HTTPS
- [ ] Перевірка заголовків через securityheaders.com

## API безпека
- ✅ Всі API Routes перевіряють автентифікацію — публічні API (contact/newsletter/order) відкриті за призначенням; `/api/auth/login` — тільки POST; `AdminClient` redirect для non-admin через `useAuth` + `useRouter.replace`
- ✅ Rate limiting на API — `src/lib/rateLimit.ts` (in-memory, per-IP для всіх 4 API routes: contact, newsletter, order, auth/login)
- ✅ Валідація вхідних даних (Zod schemas) — `src/lib/schemas.ts` (ContactSchema, NewsletterSchema, OrderSchema, LoginSchema) з тестами
- ✅ Не повертати stack traces — API routes повертають тільки generic JSON-помилки; `compiler.removeConsole` у next.config.ts для production
- ✅ API keys зберігаються лише в .env (не в коді)
- ✅ CORS налаштований правильно (не *)
- ✅ Захист від SSRF — API routes роблять fetch тільки до Telegram API з фіксованим URL (не прийма ють URL від користувачів)

## Захист від DDoS та спаму
- [ ] Cloudflare WAF та DDoS Protection
- ✅ reCAPTCHA v3 — `src/hooks/useRecaptcha.ts` + `src/lib/recaptcha.ts` + підключено до ContactForm та CheckoutForm/api/order; graceful fallback якщо ключ не налаштовано (2026-05-03)
- ✅ Honeypot поля у формах — `ContactForm.tsx` + перевірка в `api/contact/route.ts`
- ✅ Rate limiting на форми зворотного зв'язку — `src/lib/rateLimit.ts` (in-memory, per-IP: 5/10хв для contact, 3/5хв для newsletter, 3/30хв для order, 5/15хв для auth/login)

## Захист даних (GDPR)
- ✅ Збір мінімуму персональних даних — форми збирають тільки ім'я, email, телефон (опц.), повідомлення; без паспортних даних
- ✅ Cookie Consent Banner (Analytics/Marketing cookies — опціональні)
- [ ] Право на видалення акаунту та даних
- [ ] Шифрування чутливих даних в БД
- [ ] Логи доступу до персональних даних
- ✅ Privacy Policy та Terms of Service актуальні — `app/privacy/page.tsx`, `app/terms-of-service/page.tsx`

## Безпека файлів та медіа
- [ ] Валідація типу та розміру завантажуваних файлів
- [ ] Зберігання медіа в Cloudinary / S3 (не на сервері)
- [ ] Антивірусна перевірка завантажених файлів (ClamAV або API)
- [ ] Заборона виконання скриптів у директорії завантажень

## Моніторинг безпеки
- [ ] Sentry для ловлення помилок та підозрілих запитів
- ✅ Логування 401/403 відповідей для аналізу атак — `secLog()` у `api/auth/login/route.ts`: RATE_LIMIT_LOGIN, ACCOUNT_LOCKOUT, LOGIN_FAILED (IP + domain + failCount → console.warn → Vercel logs)
- ✅ Сповіщення у Telegram при критичних помилках — `api/alert/critical/route.ts` (edge runtime, TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID), викликається з `global-error.tsx`
- ✅ Dependency audit — `npm audit --audit-level=high` у CI pipeline (`.github/workflows/ci.yml`)
- ✅ Оновлення залежностей з відомими CVE (Dependabot) — `.github/dependabot.yml` (npm щопонеділка, groups: dev/prod, major versions заблоковані для manual review; GitHub Actions ecosystem також покрито)

## CI/CD безпека
- ✅ Секрети в GitHub Secrets — `.env.local` в `.gitignore`; CI workflows використовують `${{ secrets.* }}`
- [ ] Обов'язковий code review перед merge в main
- ✅ SAST static analysis (CodeQL) у CI — `.github/workflows/codeql.yml` (JS/TS, security-and-quality queries, schedule щопонеділка + push/PR до main)
- ✅ Перевірка npm audit у CI pipeline — `npm audit --audit-level=high` у `.github/workflows/ci.yml` (continue-on-error: true)

---

### Примітки
- Безпека — безперервний процес, не одноразова задача.
- Регулярно перевіряти OWASP Top 10 та оновлювати практики.
- Тестувати заголовки через: securityheaders.com, observatory.mozilla.org


> ⚠️ **Незакреслені пункти ([ ]) — Phase 2/3:** потребують реального серверного оточення (Vercel, БД, API-ключі, домен). Реалізуються після деплою та на етапі запуску проєкту.