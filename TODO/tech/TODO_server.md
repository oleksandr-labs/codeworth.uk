 Сервер та хостинг (Server & Hosting)
Опис: Налаштування хостингу, домену та серверної інфраструктури для **codenest.com.ua**.
**Статус:** Частково виконано (CI/CD, SSL, redirects, Telegram alerts)
**✅ Проаналізовано 2026-05-01 — 9/24 задачі виконані. Критичне: домен codenest.com.ua, Vercel деплой, DNS, email налаштування — необхідно до запуску.**

---

> ⚠️ **Незакреслені пункти ([ ]) — Phase 2/3:** потребують реального серверного оточення (Vercel, БД, API-ключі, домен). Реалізуються після деплою та на етапі запуску проєкту.


## Домен
- [ ] Реєстрація домену **codenest.com.ua** (через NIC.UA або Hostpro)
- [ ] Налаштування DNS-записів у Cloudflare (A, AAAA, CNAME, TXT, MX)
- [ ] Підключення домену до Vercel (CNAME → cname.vercel-dns.com)
- [ ] Налаштування поштового сервісу: info@codenest.com.ua, hello@codenest.com.ua
- ✅ Редирект www → non-www (301) — налаштовано в `next.config.ts` redirects

## Хостинг
- [ ] **Frontend — Vercel** (оптимально для Next.js SSG + ISR)
- [ ] **База даних — Supabase** (PostgreSQL, безкоштовний tier для старту) або Railway
- [ ] **Медіа-файли — Cloudinary** або AWS S3 + CloudFront CDN
- [ ] **Headless CMS — Sanity.io** (з безкоштовним планом)
- ✅ Налаштування автоматичного деплою з GitHub (Vercel Git Integration)
- [ ] Підключення Cloudflare для CDN, DDoS-захисту та аналітики
- [ ] Налаштування Preview Deployments для кожного PR (Vercel feature)
- ✅ Налаштування Environment Variables (production, preview, development)

## SSL/TLS
- ✅ Встановлення SSL сертифіката (Let's Encrypt безкоштовно)
- ✅ Автоматичне оновлення SSL — Vercel автоматично оновлює Let's Encrypt сертифікати
- ✅ Форсування HTTPS (301 redirect з HTTP)
- ✅ Налаштування HSTS (HTTP Strict Transport Security)

## Бази даних
- [ ] Вибір БД: PostgreSQL, MongoDB, або Headless CMS (Sanity/Strapi)
- [ ] Налаштування з'єднання з базою даних
- [ ] Налаштування Connection Pooling
- [ ] Встановлення регулярних бекапів БД (щоденні/тижневі)

## Резервне копіювання
- ✅ Backup коду — Git + GitHub (автоматично при кожному push)
- [ ] Резервне копіювання бази даних (щоденно)
- [ ] Резервне копіювання медіа-файлів (S3 або аналог)
- [ ] Тестування відновлення з бекапу

## Моніторинг та логи
- [ ] Налаштування моніторингу uptime (UptimeRobot, Pingdom)
- [ ] Логування помилок (Sentry, LogRocket)
- [ ] Моніторинг продуктивності (New Relic, Datadog)
- ✅ Сповіщення при критичних помилках — `api/alert/critical/route.ts` (Telegram alert, викликається з `global-error.tsx`)

## Безпека сервера
- [ ] Firewall (UFW на Linux або аналог)
- [ ] Закриття непотрібних портів
- [ ] SSH-доступ лише з ключем (без пароля)
- [ ] Регулярне оновлення системи та пакетів
- [ ] Fail2ban для захисту відbruteforce

## CI/CD Pipeline
- ✅ GitHub Actions CI — `.github/workflows/ci.yml` (test + lint + npm audit + build + E2E)
- ✅ Автоматичні тести перед деплоєм — 1320+ unit тестів + Playwright E2E
- ✅ Lighthouse CI на PR — `.github/workflows/lighthouse.yml`
- ✅ CodeQL SAST — `.github/workflows/codeql.yml`
- [ ] Staging-середовище для тестування (Vercel Preview Deployments)
- [ ] Production deploy з тегів або master-гілки
- [ ] Rollback-стратегія при помилках

---

### Примітки
- Домен **codenest.com.ua** — основний, всі інші редиректять на нього.
- Vercel Edge Network автоматично розподіляє статику по CDN — окремий CDN не потрібен для frontend.
- Для маркетплейс-бекенду (API Routes у Next.js) — Vercel Serverless Functions.
- Cloudflare використовується перед Vercel для додаткового кешування та захисту.
- Production: codenest.com.ua, Staging: staging.codenest.com.ua, Dev: localhost:3000.
