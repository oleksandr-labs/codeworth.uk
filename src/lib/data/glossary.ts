export type GlossaryCategory = "ai" | "mlops" | "data" | "nlp" | "regulation" | "business" | "infrastructure";

export interface GlossaryTerm {
  slug: string;
  termUk: string;
  termEn: string;
  category: GlossaryCategory;
  shortDescription: string;
  fullDescription: string;
  example?: string;
  relatedTerms: string[];
  relatedService?: string;
  relatedBlogPost?: string;
  /** Related AI or ML niche page path (e.g. "/ai/healthcare", "/ml/banking") for cross-linking */
  relatedNichePage?: string;
}

export interface GlossaryCategoryMeta {
  value: GlossaryCategory;
  label: string;
  labelEn: string;
  emoji: string;
}

export const GLOSSARY_CATEGORIES: GlossaryCategoryMeta[] = [
  { value: "ai", label: "AI та Машинне Навчання", labelEn: "AI & Machine Learning", emoji: "🤖" },
  { value: "mlops", label: "MLOps та Інфраструктура", labelEn: "MLOps & Infrastructure", emoji: "⚙️" },
  { value: "data", label: "Data Science та Аналітика", labelEn: "Data Science & Analytics", emoji: "📊" },
  { value: "nlp", label: "NLP та Мовний AI", labelEn: "NLP & Language AI", emoji: "💬" },
  { value: "regulation", label: "Регулювання та Етика", labelEn: "Regulation & Ethics", emoji: "⚖️" },
  { value: "business", label: "Бізнес та Стратегія", labelEn: "Business & Strategy", emoji: "💼" },
  { value: "infrastructure", label: "Хмара та Інфраструктура", labelEn: "Cloud & Infrastructure", emoji: "☁️" },
];

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  // === WEB DEV ===
  {
    slug: "api",
    termUk: "API",
    termEn: "API (Application Programming Interface)",
    category: "business",
    shortDescription: "Інтерфейс, що дозволяє різним програмам обмінюватись даними між собою.",
    fullDescription: `API (Application Programming Interface) — це набір правил і протоколів, за якими одна програма може спілкуватись з іншою. Уявіть офіціанта в ресторані: він приймає ваше замовлення (запит), передає його на кухню (сервер) і приносить страву (відповідь). Так само API дозволяє вашому сайту «спілкуватись» з Google Maps, платіжними системами, соцмережами.\n\nЗавдяки API ви можете відображати погоду на сайті, приймати онлайн-оплату через LiqPay, автоматично публікувати пости в Instagram або отримувати дані з CRM. Без API кожен сайт був би ізольованим островом.`,
    example: "Кнопка «Увійти через Google» — це API. Сайт запитує у Google: «Хто цей користувач?» і отримує відповідь.",
    relatedTerms: ["rest-api", "graphql", "cms"],
    relatedService: "integrations",
  },
  {
    slug: "cms",
    termUk: "CMS",
    termEn: "CMS (Content Management System)",
    category: "business",
    shortDescription: "Система керування контентом — програма для редагування сайту без знань програмування.",
    fullDescription: `CMS (Content Management System) — це платформа, яка дозволяє власнику бізнесу самостійно редагувати тексти, додавати фото та публікувати новини на сайті без залучення розробника.\n\nНайвідоміші CMS: WordPress (43% всіх сайтів у світі), Shopify (для магазинів), Wix, Tilda. Сучасний підхід — Headless CMS: Sanity, Strapi, Contentful — де контент зберігається окремо від дизайну, що дає набагато більшу гнучкість.\n\nCodeworth працює як з класичними CMS, так і з headless-рішеннями — залежно від потреб клієнта.`,
    example: "Ресторан може самостійно щодня оновлювати меню через CMS без виклику програміста.",
    relatedTerms: ["headless-cms", "api", "ssr"],
    relatedService: "machine-learning",
  },
  {
    slug: "ssr",
    termUk: "SSR",
    termEn: "SSR (Server-Side Rendering)",
    category: "business",
    shortDescription: "Серверний рендеринг — сторінка генерується на сервері при кожному запиті.",
    fullDescription: `SSR (Server-Side Rendering) — підхід, при якому HTML-сторінка формується на сервері перед відправкою браузеру. На відміну від CSR (Client-Side Rendering), користувач одразу бачить готовий контент.\n\nПереваги: хороший для SEO (пошукові роботи бачать повний контент), швидше перше відображення. Недоліки: більше навантаження на сервер, повільніше при великій кількості одночасних запитів.\n\nNext.js підтримує SSR з коробки для сторінок, де контент змінюється часто: новини, акаунти, персоналізовані дані.`,
    example: "Сторінка профілю користувача з актуальними даними генерується на сервері при кожному вході.",
    relatedTerms: ["ssg", "csr", "isr", "next-js"],
    relatedService: "machine-learning",
  },
  {
    slug: "ssg",
    termUk: "SSG",
    termEn: "SSG (Static Site Generation)",
    category: "business",
    shortDescription: "Статична генерація — всі сторінки генеруються один раз під час збірки проєкту.",
    fullDescription: `SSG (Static Site Generation) — підхід, при якому HTML-файли для всіх сторінок генеруються заздалегідь при збірці проєкту (build time), а не при кожному запиті.\n\nПереваги: максимальна швидкість (файли роздаються з CDN), відмінне SEO, дешевий хостинг, висока безпека (немає сервера, що обробляє запити). Ідеально для: портфоліо, блогів, корпоративних сайтів, лендінгів.\n\nCodeworth будує всі публічні сторінки через SSG — це забезпечує PageSpeed 95+ та миттєве завантаження.`,
    example: "Сторінки послуг, блогу та портфоліо Codeworth — всі статично згенеровані та роздаються через CDN.",
    relatedTerms: ["ssr", "isr", "csr", "next-js"],
    relatedService: "machine-learning",
  },
  {
    slug: "csr",
    termUk: "CSR",
    termEn: "CSR (Client-Side Rendering)",
    category: "business",
    shortDescription: "Клієнтський рендеринг — сторінка збирається в браузері за допомогою JavaScript.",
    fullDescription: `CSR (Client-Side Rendering) — підхід, де браузер завантажує «порожній» HTML-файл, а потім JavaScript завантажує дані та будує сторінку прямо у браузері.\n\nПереваги: миттєва навігація між сторінками після першого завантаження, хороший для додатків з авторизацією. Недоліки: повільніше перше завантаження, гірше для SEO.\n\nCSR підходить для: кошика, особистого кабінету, адмін-панелей — сторінок, де SEO не важливе, але потрібна інтерактивність.`,
    example: "Кошик та кабінет користувача в маркетплейсі Codeworth — використовують CSR.",
    relatedTerms: ["ssg", "ssr", "react", "next-js"],
    relatedService: "machine-learning",
  },
  {
    slug: "isr",
    termUk: "ISR",
    termEn: "ISR (Incremental Static Regeneration)",
    category: "business",
    shortDescription: "Інкрементальна статична регенерація — оновлення статичних сторінок у фоні без повного rebuild.",
    fullDescription: `ISR (Incremental Static Regeneration) — технологія Next.js, що поєднує переваги SSG (швидкість) та SSR (свіжість даних). Сторінки генеруються статично, але автоматично оновлюються у фоні через заданий інтервал.\n\nЯк це працює: 1) Перший запит отримує кешовану (статичну) сторінку; 2) Якщо з моменту генерації пройшло більше N секунд — у фоні запускається перегенерація; 3) Наступний запит отримує оновлену версію.\n\nIdeально для: каталогів товарів, блогів, сторінок з цінами — де контент оновлюється, але не щосекунди.`,
    example: "Каталог маркетплейсу оновлюється кожні 10 хвилин через ISR без жодного впливу на швидкість.",
    relatedTerms: ["ssg", "ssr", "next-js"],
    relatedService: "machine-learning",
  },
  {
    slug: "pwa",
    termUk: "PWA",
    termEn: "PWA (Progressive Web App)",
    category: "business",
    shortDescription: "Прогресивний веб-застосунок — сайт, що поводиться як мобільний додаток.",
    fullDescription: `PWA (Progressive Web App) — це веб-сайт зі спеціальними можливостями: його можна встановити на смартфон, він працює офлайн, надсилає push-сповіщення та завантажується миттєво.\n\nPWA не потребує публікації в App Store або Google Play — користувач встановлює його прямо з браузера. Це значно дешевше за нативний додаток ($15 000–30 000 vs $3 000–8 000 за PWA).\n\nCodeworth додає PWA-можливості до всіх проєктів: Service Worker, Web App Manifest, офлайн-сторінка — все налаштовано з коробки.`,
    example: "Instagram, Twitter та Telegram Web — це PWA. Їх можна встановити на телефон без App Store.",
    relatedTerms: ["ssg", "mobile-first", "typescript"],
    relatedService: "mobile",
  },
  {
    slug: "next-js",
    termUk: "Next.js",
    termEn: "Next.js",
    category: "business",
    shortDescription: "Найпопулярніший фреймворк для React — підтримує SSG, SSR, ISR, App Router та PWA.",
    fullDescription: `Next.js — це фреймворк на основі React, розроблений компанією Vercel. Він вирішує головні проблеми «чистого» React: SEO, швидкість завантаження, маршрутизацію та деплой.\n\nОсновні можливості: App Router (вкладені макети), Server Components (рендеринг на сервері без JS у браузері), статична генерація (SSG), ISR, вбудована оптимізація зображень, i18n, TypeScript з коробки.\n\nCodeworth використовує Next.js 15+ для всіх проєктів — це забезпечує максимальний PageSpeed та SEO-готовність від першого дня.`,
    example: "Цей сайт (codeworth.uk) повністю побудований на Next.js з SSG для всіх публічних сторінок.",
    relatedTerms: ["react", "typescript", "ssg", "ssr", "vercel"],
    relatedService: "machine-learning",
    relatedBlogPost: "next-js-seo-guide-2024",
  },
  {
    slug: "react",
    termUk: "React",
    termEn: "React",
    category: "business",
    shortDescription: "JavaScript-бібліотека від Meta для побудови інтерфейсів на основі компонентів.",
    fullDescription: `React — бібліотека від Meta (Facebook), яка змінила підхід до веб-розробки. Замість маніпуляцій з DOM вручну, React дозволяє описувати UI як набір компонентів: кнопка, форма, навігація — кожен є незалежним блоком.\n\nVirtual DOM — ключова ідея React: замість прямого оновлення DOM (повільно), React спочатку оновлює «віртуальний» DOM в пам'яті, порівнює з реальним і вносить лише мінімальні зміни.\n\nReact — найпопулярніший інструмент для фронтенд-розробки. 60%+ нових проєктів будуються на React або Next.js.`,
    example: "Компоненти сайту Codeworth: Header, Footer, BlogCard, PriceCalculator — кожен є React-компонентом.",
    relatedTerms: ["next-js", "typescript", "csr"],
    relatedService: "machine-learning",
  },
  {
    slug: "typescript",
    termUk: "TypeScript",
    termEn: "TypeScript",
    category: "business",
    shortDescription: "Розширення JavaScript зі статичною типізацією — ловить помилки до запуску коду.",
    fullDescription: `TypeScript — мова програмування від Microsoft, що є надмножиною JavaScript. Головна відмінність: TypeScript додає статичну типізацію, тобто типи даних перевіряються ще до запуску програми.\n\nЧому це важливо для бізнесу: менше багів у продакшні, код легше читати та підтримувати, onboarding нових розробників швидший. Великі компанії (Google, Microsoft, Airbnb) перейшли на TypeScript саме через це.\n\nCodeworth пише весь код виключно на TypeScript з суворим режимом strict — 0 TypeScript errors у всіх проєктах.`,
    example: "Якщо функція очікує число, TypeScript не дасть передати рядок — помилка з'явиться в редакторі, а не на сайті клієнта.",
    relatedTerms: ["react", "next-js"],
    relatedService: "machine-learning",
  },
  {
    slug: "headless-cms",
    termUk: "Headless CMS",
    termEn: "Headless CMS",
    category: "business",
    shortDescription: "CMS без фронтенду — контент зберігається окремо і роздається через API.",
    fullDescription: `Headless CMS — це система керування контентом, де «голова» (фронтенд, UI) відділена від «тіла» (сховища контенту). Контент зберігається в CMS і роздається через API будь-якому фронтенду: сайту, мобільному додатку, смарт-дисплею.\n\nПопулярні headless CMS: Sanity, Strapi, Contentful, Ghost, Payload. На відміну від WordPress (монолітна CMS), headless дає необмежену гнучкість дизайну та максимальну швидкість.\n\nIdeально для: компаній, що публікують контент одночасно на сайті та в мобільному додатку; для складних редакційних команд.`,
    example: "The New York Times використовує headless CMS — один контент публікується на web, iOS та Android.",
    relatedTerms: ["cms", "api", "ssg"],
    relatedService: "machine-learning",
  },
  {
    slug: "responsive-design",
    termUk: "Responsive Design",
    termEn: "Responsive Design (Адаптивний дизайн)",
    category: "business",
    shortDescription: "Дизайн, що автоматично підлаштовується під розмір екрану: телефон, планшет, ПК.",
    fullDescription: `Responsive Design (адаптивний дизайн) — підхід до верстки, при якому сайт автоматично змінює макет залежно від розміру екрана пристрою. Один код — правильне відображення на смартфоні, планшеті та настільному комп'ютері.\n\nЧому це критично: 60–70% трафіку в Україні — мобільний. Google враховує мобільну версію як основну при ранжируванні (Mobile-First Indexing). Сайт без адаптивності — це втрачені клієнти.\n\nAdaptive vs Responsive: adaptive дає кілька фіксованих макетів, responsive — один рідкий макет. Codeworth будує responsive-сайти з мобільним пріоритетом (Mobile First).`,
    example: "Шапка сайту на ПК має горизонтальне меню, на телефоні — кнопку «гамбургер» з випадним меню.",
    relatedTerms: ["mobile-first", "pwa", "ux"],
    relatedService: "machine-learning",
  },
  {
    slug: "mobile-first",
    termUk: "Mobile First",
    termEn: "Mobile First",
    category: "business",
    shortDescription: "Підхід до дизайну, де спочатку проєктується мобільна версія, а потім — десктопна.",
    fullDescription: `Mobile First — стратегія розробки, за якою дизайнер і розробник починають з мобільної версії сайту і «розширюють» її до планшету та десктопу — а не навпаки.\n\nЧому це краще: обмеження мобільного змушують зосередитись на головному — позбавляються від зайвого. Потім на більших екранах додають деталі. Google Mobile-First Indexing підтримує цей підхід: сайт індексується через мобільну версію.\n\nCodeworth завжди проєктує Mobile First: спочатку затверджується мобільний макет, потім — адаптація для планшету і десктопу.`,
    example: "Кнопка «Замовити» на мобільному завжди видима і великого розміру. На десктопі вона в хедері серед інших елементів.",
    relatedTerms: ["responsive-design", "pwa", "ux"],
    relatedService: "machine-learning",
  },
  {
    slug: "mvp",
    termUk: "MVP",
    termEn: "MVP (Minimum Viable Product)",
    category: "business",
    shortDescription: "Мінімально життєздатний продукт — перша версія з лише ключовими функціями.",
    fullDescription: `MVP (Minimum Viable Product) — це перша версія продукту або сайту, що містить лише ті функції, які потрібні для перевірки гіпотези або запуску на ринок. Нічого зайвого.\n\nЛогіка MVP: замість витрачати рік і мільйон гривень на «ідеальний» продукт — запустити за 2–3 місяці мінімальну версію, отримати перших клієнтів і зворотній зв'язок, доопрацювати на основі реальних даних.\n\nDrop шанси на провал: 90% стартапів, що намагаються одразу зробити ідеально — помиляються у функціях. MVP дозволяє знайти правильне рішення без великих втрат.`,
    example: "Airbnb розпочинав з простого сайту з фотографіями і контактною формою. Без карт, без оплат, без рейтингів.",
    relatedTerms: ["api", "ssg", "cms"],
    relatedService: "landing",
  },
  {
    slug: "rest-api",
    termUk: "REST API",
    termEn: "REST API",
    category: "business",
    shortDescription: "Стандарт побудови API через HTTP-методи: GET, POST, PUT, DELETE.",
    fullDescription: `REST (Representational State Transfer) — архітектурний стиль для побудови API. REST API використовує стандартні HTTP-методи: GET (отримати дані), POST (створити), PUT/PATCH (оновити), DELETE (видалити).\n\nRESTful API — найпоширеніший стандарт в індустрії. Більшість публічних API (Google, Facebook, Stripe, Nova Poshta) — RESTful. Прості у використанні, добре задокументовані, підтримуються всіма мовами.\n\nАльтернатива: GraphQL — більш гнучкий, але складніший підхід для великих проєктів.`,
    example: "GET /api/products — отримати список товарів. POST /api/orders — створити нове замовлення.",
    relatedTerms: ["api", "graphql", "next-js"],
    relatedService: "integrations",
  },
  {
    slug: "graphql",
    termUk: "GraphQL",
    termEn: "GraphQL",
    category: "business",
    shortDescription: "Мова запитів для API — клієнт сам визначає, які поля даних отримати.",
    fullDescription: `GraphQL — мова запитів для API, розроблена Meta. Ключова відмінність від REST: клієнт сам визначає структуру відповіді. Замість «дай мені все про користувача», можна сказати «дай тільки ім'я та email».\n\nПереваги: менше зайвих даних (немає over-fetching), один ендпойнт замість десятків, типізована схема. Недоліки: складніше кешування, важче для новачків.\n\nGraphQL підходить для складних застосунків з багатьма пов'язаними сутностями: соцмережі, маркетплейси, dashboards.`,
    example: "Замість 3 REST-запитів (user, posts, comments) — один GraphQL-запит отримує все разом.",
    relatedTerms: ["rest-api", "api", "headless-cms"],
    relatedService: "machine-learning",
  },

  // === SEO ===
  {
    slug: "seo",
    termUk: "SEO",
    termEn: "SEO (Search Engine Optimization)",
    category: "business",
    shortDescription: "Пошукова оптимізація — комплекс заходів для підвищення позицій сайту в Google.",
    fullDescription: `SEO (Search Engine Optimization) — це сукупність технічних, контентних і посилальних заходів, спрямованих на підвищення позицій сайту в органічній (безплатній) видачі пошукових систем.\n\nSEO ділиться на три напрями: Технічне SEO (швидкість, індексація, структура), On-Page SEO (контент, ключові слова, метатеги) та Off-Page SEO (посилання, репутація).\n\nОрганічний трафік — найдешевше джерело клієнтів у довгостроковій перспективі. Інвестиція в SEO окупається роками після припинення роботи, на відміну від платної реклами, яка зупиняється разу після вимкнення бюджету.`,
    example: "Запит «розробка сайтів Київ» — 2 000+ пошуків/місяць. Перша позиція в Google = ~30% цих кліків.",
    relatedTerms: ["core-web-vitals", "schema-org", "backlink", "serp", "canonical-url"],
    relatedService: "seo",
    relatedBlogPost: "next-js-seo-guide-2024",
  },
  {
    slug: "core-web-vitals",
    termUk: "Core Web Vitals",
    termEn: "Core Web Vitals",
    category: "business",
    shortDescription: "Три ключові метрики Google для оцінки досвіду користувача: LCP, INP, CLS.",
    fullDescription: `Core Web Vitals — набір із трьох метрик, які Google використовує для оцінки якості досвіду користувача на сторінці. З 2021 року вони є офіційними факторами ранжирування.\n\n**LCP (Largest Contentful Paint)** — час завантаження найбільшого елемента (зазвичай головного зображення або заголовку). Норма: < 2.5 секунди.\n\n**INP (Interaction to Next Paint)** — час відгуку на взаємодію: клік, введення тексту. Норма: < 200 мс.\n\n**CLS (Cumulative Layout Shift)** — стрибки елементів під час завантаження. Норма: < 0.1.\n\nCodeworth оптимізує всі проєкти до показників: LCP < 2.5с, INP < 200мс, CLS < 0.1.`,
    example: "Якщо кнопка «стрибає» при завантаженні реклами — CLS буде поганим. Це знижує позиції в Google.",
    relatedTerms: ["seo", "lcp", "cls", "inp", "ssg"],
    relatedService: "seo",
    relatedBlogPost: "core-web-vitals-2024",
  },
  {
    slug: "lcp",
    termUk: "LCP",
    termEn: "LCP (Largest Contentful Paint)",
    category: "business",
    shortDescription: "Час завантаження найбільшого видимого елемента сторінки. Норма Google: менше 2.5 секунди.",
    fullDescription: `LCP (Largest Contentful Paint) — метрика Core Web Vitals, що вимірює час від початку завантаження до відображення найбільшого видимого елемента: hero-зображення, великого заголовку або відеопостера.\n\nЯк покращити LCP: оптимізація зображень (WebP/AVIF), preload критичних ресурсів, видалення render-blocking JS та CSS, використання CDN, Server Components (Next.js).\n\nLCP — найважливіша з Core Web Vitals для сприйняття швидкості: саме від неї залежить перше враження від сайту.`,
    example: "Головне зображення ресторану завантажується за 4 секунди — LCP поганий, сайт губить позиції в Google.",
    relatedTerms: ["core-web-vitals", "seo", "cls", "cdn", "ssg"],
    relatedService: "seo",
    relatedBlogPost: "core-web-vitals-2024",
  },
  {
    slug: "cls",
    termUk: "CLS",
    termEn: "CLS (Cumulative Layout Shift)",
    category: "business",
    shortDescription: "Накопичений зсув макету — вимірює, наскільки елементи «стрибають» під час завантаження.",
    fullDescription: `CLS (Cumulative Layout Shift) вимірює, наскільки несподівано зміщуються елементи сторінки під час завантаження. Значення 0 = жодних зсувів, 1 = весь контент стрибає.\n\nГоловні причини поганого CLS: зображення без вказаних розмірів (width/height), реклама, що динамічно вставляється, шрифти що "перемальовуються" (FOUT), динамічний контент над статичним.\n\nЯк виправити: завжди вказувати розміри зображень, резервувати місце для реклами, використовувати font-display: swap або preload шрифтів.`,
    example: "Ви натискаєте «Купити», але реклама завантажилась і зсунула кнопку — ви натиснули на щось інше. Це CLS.",
    relatedTerms: ["core-web-vitals", "lcp", "inp", "seo"],
    relatedService: "seo",
    relatedBlogPost: "core-web-vitals-2024",
  },
  {
    slug: "inp",
    termUk: "INP",
    termEn: "INP (Interaction to Next Paint)",
    category: "business",
    shortDescription: "Час відгуку на взаємодію користувача (клік, введення). Замінив FID з 2024 року.",
    fullDescription: `INP (Interaction to Next Paint) — метрика Core Web Vitals (замінила FID у 2024), що вимірює затримку між дією користувача (клік, натискання клавіші, свайп) та наступним відображенням результату.\n\nЯк рахується: INP = 98-й перцентиль всіх взаємодій за сесію (ігнорує 2% найгірших). Норма: < 200 мс. Потребує покращення: > 500 мс.\n\nЯк покращити: зменшити JavaScript на головному потоці, використовувати Web Workers для важких обчислень, оптимізувати event handlers.`,
    example: "Фільтрація 1000 товарів «підвисає» на 2 секунди після кліку — INP поганий.",
    relatedTerms: ["core-web-vitals", "lcp", "cls", "seo"],
    relatedService: "seo",
    relatedBlogPost: "core-web-vitals-2024",
  },
  {
    slug: "schema-org",
    termUk: "Schema.org",
    termEn: "Schema.org / Structured Data",
    category: "business",
    shortDescription: "Мікророзмітка для Google — дозволяє отримати зірки, FAQ та інші Rich Snippets у видачі.",
    fullDescription: `Schema.org — словник структурованих даних, підтриманий Google, Bing, Yahoo. Додаючи JSON-LD розмітку, ви пояснюєте Google, що саме на сторінці: організація, послуга, відгук, FAQ, вакансія, продукт.\n\nРезультат: Rich Snippets у Google SERP — зірки рейтингу, FAQ-блок прямо у видачі, ціна товару, дата події. Rich Snippets підвищують CTR на 20–35%.\n\nCodeworth додає Schema.org на всі сторінки: Organization, LocalBusiness, Service, BreadcrumbList, FAQPage, Article, Product, Review.`,
    example: "Рецепт з часом приготування та рейтингом прямо в Google — це Schema.org Recipe + AggregateRating.",
    relatedTerms: ["seo", "serp", "rich-snippets", "canonical-url"],
    relatedService: "seo",
    relatedBlogPost: "next-js-seo-guide-2024",
  },
  {
    slug: "backlink",
    termUk: "Backlink",
    termEn: "Backlink (Зворотне посилання)",
    category: "business",
    shortDescription: "Посилання з іншого сайту на ваш — один з головних факторів авторитету в Google.",
    fullDescription: `Backlink (зворотне посилання) — це гіперпосилання з будь-якого зовнішнього сайту на ваш. Google розглядає backlinks як «голоси» за ваш контент. Більше якісних посилань = вищий авторитет сайту = кращі позиції.\n\nНе всі backlinks однаково корисні. Посилання з авторитетного ЗМІ чи профільного сайту — цінне. Посилання зі спам-каталогів — шкідливе. Google алгоритм Penguin фільтрує маніпулятивні посилання.\n\nЯк отримувати якісні backlinks: корисний контент (гайди, дослідження), гостьові статті, партнерства, присутність у каталогах (Clutch, DOU, GoodFirms).`,
    example: "Стаття в Forbes з посиланням на ваш сайт — один такий backlink може бути вартіший за 1000 слабких.",
    relatedTerms: ["seo", "domain-authority", "serp"],
    relatedService: "seo",
  },
  {
    slug: "canonical-url",
    termUk: "Canonical URL",
    termEn: "Canonical URL",
    category: "business",
    shortDescription: "Мета-тег, що вказує Google основну версію сторінки для запобігання дублюванню.",
    fullDescription: `Canonical URL (rel=canonical) — HTML-атрибут, що вказує пошуковику: «Ось оригінальна сторінка, індексуй її». Використовується для запобігання проблемам з дублікатами контенту.\n\nДублікати виникають: через HTTP/HTTPS, www/non-www, ?utm_source=... параметри, /page/1 та /page. Без canonical Google сам вирішує, яку версію індексувати — часто неправильно.\n\nCodeworth встановлює canonical URL на всіх 24+ сторінках проєкту, включно з redirect www → non-www та trailing slash.`,
    example: "Сторінка /products і /products?sort=price — один контент. Canonical → /products.",
    relatedTerms: ["seo", "schema-org", "sitemap"],
    relatedService: "seo",
  },
  {
    slug: "serp",
    termUk: "SERP",
    termEn: "SERP (Search Engine Results Page)",
    category: "business",
    shortDescription: "Сторінка результатів пошуку Google — те, що ви бачите після введення запиту.",
    fullDescription: `SERP (Search Engine Results Page) — сторінка, яку Google показує у відповідь на пошуковий запит. Містить: платні оголошення (Google Ads вгорі та внизу), органічні результати (10 посилань), Knowledge Panel (картка компанії), Rich Snippets (зірки, FAQ, ціни), Featured Snippet (відповідь у «нульовому» блоці).\n\nМета SEO — потрапити якомога вище в органічні результати. Перша позиція отримує ~28% кліків, друга — ~14%, третя — ~9%. Перша сторінка (топ-10) — 91% всіх кліків.\n\nZero-click searches: 50%+ запитів у Google завершуються без кліку — відповідь дається прямо в SERP.`,
    example: "Після введення «веб-студія Київ» ви бачите SERP: спочатку реклама, потім карта з компаніями, потім органіка.",
    relatedTerms: ["seo", "schema-org", "organic-traffic", "ctr"],
    relatedService: "seo",
  },
  {
    slug: "organic-traffic",
    termUk: "Органічний трафік",
    termEn: "Organic Traffic",
    category: "business",
    shortDescription: "Відвідувачі з пошукових систем без оплати — результат SEO-оптимізації.",
    fullDescription: `Органічний трафік — це відвідувачі, що приходять на сайт з безплатних результатів пошуку (Google, Bing, Ukr.net). На відміну від платного трафіку (Google Ads, Facebook Ads), органічний не вимагає постійних витрат.\n\nПорівняння: 1 клік у Google Ads у ніші «веб-студія» коштує 15–50 грн. SEO дозволяє отримувати ті самі кліки безкоштовно — після початкової інвестиції в оптимізацію.\n\nСтруктура трафіку за джерелами: Organic — 51%, Paid — 10%, Social — 5%, Direct — 22%, Referral — 7%, Email — 2%. Органіка — найбільший канал для більшості бізнесів.`,
    example: "Блог-стаття про «як обрати веб-студію» може приносити 200–500 відвідувачів/місяць без жодних витрат.",
    relatedTerms: ["seo", "serp", "backlink"],
    relatedService: "seo",
  },
  {
    slug: "ctr",
    termUk: "CTR",
    termEn: "CTR (Click-Through Rate)",
    category: "business",
    shortDescription: "Коефіцієнт кліків — відсоток людей, що клікнули на посилання серед тих, хто його побачив.",
    fullDescription: `CTR (Click-Through Rate) = Кліки / Покази × 100%. Ключова метрика як для SEO, так і для реклами.\n\nСЕО CTR: середній CTR першої позиції — 28%, другої — 15%, третьої — 11%. Rich Snippets (зірки, FAQ) підвищують CTR на 20–35% навіть без зміни позиції.\n\nЯк підвищити SEO CTR: оптимізувати title та description (привабливі, з ключовими словами), додати Schema.org для зірок/FAQ, використовувати числа та емоційні тригери в заголовках.`,
    example: "Title «Розробка сайтів Київ — від 8 000 грн за 14 днів» → вищий CTR, ніж «Веб-студія Codeworth».",
    relatedTerms: ["seo", "serp", "organic-traffic"],
    relatedService: "seo",
  },
  {
    slug: "local-seo",
    termUk: "Локальне SEO",
    termEn: "Local SEO",
    category: "business",
    shortDescription: "Оптимізація для локальних запитів: «ресторан Київ», «стоматологія поряд».",
    fullDescription: `Локальне SEO — напрям SEO для бізнесів, що обслуговують клієнтів у конкретному місті або регіоні. Ресторани, салони краси, клініки, автосервіси — всі вони потребують Local SEO.\n\nКлючові інструменти Local SEO: Google Business Profile (карта та відгуки в Google), NAP-консистентність (Name, Address, Phone однакові скрізь), локальні ключові слова («стоматолог Харків»), Schema.org LocalBusiness.\n\nCodeworth реалізує локальне SEO для кожного міста: окрема сторінка /location/[city] з LocalBusiness Schema.org та унікальним контентом під кожне місто.`,
    example: "Google Maps видача («3 пак») — ресторани поряд у пошуку «піца Оболонь». Це результат Local SEO.",
    relatedTerms: ["seo", "schema-org", "google-business-profile"],
    relatedService: "seo",
    relatedBlogPost: "local-seo-ukraine-business",
  },
  {
    slug: "google-business-profile",
    termUk: "Google Business Profile",
    termEn: "Google Business Profile",
    category: "business",
    shortDescription: "Безкоштовний профіль компанії в Google Maps та пошуку — критично для локального SEO.",
    fullDescription: `Google Business Profile (колишній Google My Business) — безкоштовний інструмент Google для управління присутністю компанії в Maps та пошуку. Після налаштування ваша компанія з'являється на карті, у локальному пошуку та Knowledge Panel.\n\nЩо впливає на видимість: кількість і якість відгуків, заповненість профілю, відповідність NAP, регулярні публікації та фото.\n\nLocal 3-pack (карта з 3 компаніями) у Google — найцінніше місце в локальному пошуку. Приносить 30–40% кліків за локальними запитами, але залежить виключно від Google Business Profile та Local SEO.`,
    example: "Запит «кав'ярня Поділ» → 3 кав'ярні на карті. Щоб туди потрапити — потрібен Google Business Profile та Local SEO.",
    relatedTerms: ["local-seo", "seo", "schema-org"],
    relatedService: "seo",
    relatedBlogPost: "local-seo-ukraine-business",
  },
  {
    slug: "eeat",
    termUk: "E-E-A-T",
    termEn: "E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)",
    category: "business",
    shortDescription: "Чотири фактори довіри Google: досвід, компетентність, авторитетність, надійність.",
    fullDescription: `E-E-A-T — концепція Google для оцінки якості контенту. Спочатку була E-A-T (2014), у 2022 додали перший E (Experience — реальний досвід автора).\n\n**Experience** — чи має автор реальний досвід з темою? (відгук від власника авто, а не теоретика)\n**Expertise** — компетентність у своїй галузі (лікар пише про здоров'я)\n**Authoritativeness** — авторитет сайту та автора (посилання, публікації, mentions)\n**Trustworthiness** — прозорість (автор зазначений, контакти є, HTTPS активний)\n\nE-E-A-T особливо важливий для YMYL-тем (Your Money or Your Life): медицина, фінанси, право.`,
    example: "Стаття стоматолога з фото, підписом та посиланням на клініку матиме вищий E-E-A-T, ніж анонімна стаття.",
    relatedTerms: ["seo", "backlink", "schema-org", "organic-traffic"],
    relatedService: "seo",
  },

  // === MARKETING ===
  {
    slug: "cpc",
    termUk: "CPC",
    termEn: "CPC (Cost Per Click)",
    category: "business",
    shortDescription: "Ціна за клік у платній рекламі — скільки платите за кожного відвідувача з реклами.",
    fullDescription: `CPC (Cost Per Click) — модель оплати реклами, де ви платите лише тоді, коли хтось клікає на оголошення. Використовується в Google Ads, Facebook Ads, LinkedIn Ads.\n\nСереднє CPC в Україні по галузях: веб-розробка — 15–50 грн, нерухомість — 20–80 грн, медицина — 10–30 грн, e-commerce — 5–20 грн.\n\nCPC = Витрати / Кількість кліків. Завдання — отримати найнижчий CPC при максимальній релевантності. SEO дозволяє отримувати ті самі кліки безкоштовно — після початкової інвестиції.`,
    example: "Витратили 1 000 грн → отримали 50 кліків → CPC = 20 грн/клік.",
    relatedTerms: ["roi", "conversion-rate", "roas"],
    relatedService: "ads",
  },
  {
    slug: "roi",
    termUk: "ROI",
    termEn: "ROI (Return on Investment)",
    category: "business",
    shortDescription: "Повернення інвестицій — скільки заробили відносно витрачених коштів.",
    fullDescription: `ROI (Return on Investment) = (Прибуток - Витрати) / Витрати × 100%.\n\nПриклад: витратили 50 000 грн на сайт → залучили клієнтів на 200 000 грн → ROI = (200 000 - 50 000) / 50 000 × 100% = 300%.\n\nВажливо розуміти: ROI від сайту — довгостроковий. Перші 3–6 місяців сайт «набирає» трафік і клієнтів. Повний ROI рахується за 12–24 місяці. SEO-проєкти мають ROI 300–500% через 12 місяців за статистикою HubSpot.`,
    example: "Сайт за 30 000 грн генерує 5 нових клієнтів/місяць по 8 000 грн → ROI 1 200% за рік.",
    relatedTerms: ["cpc", "roas", "conversion-rate"],
    relatedService: "machine-learning",
  },
  {
    slug: "roas",
    termUk: "ROAS",
    termEn: "ROAS (Return on Ad Spend)",
    category: "business",
    shortDescription: "Повернення витрат на рекламу — скільки заробили на кожну гривню реклами.",
    fullDescription: `ROAS (Return on Ad Spend) = Дохід від реклами / Витрати на рекламу.\n\nВідміна від ROI: ROAS рахує лише рекламні витрати без урахування собівартості. ROI враховує всі витрати.\n\nПриклад: витратили 10 000 грн на Facebook Ads → отримали замовлень на 40 000 грн → ROAS = 4 (або 400%). Тобто кожна гривня реклами принесла 4 гривні доходу.\n\nЦільові показники: ROAS 3-5 — стандарт для e-commerce. ROAS нижче 2 — кампанія збиткова (потрібно враховувати маржинальність).`,
    example: "Google Ads: витрати 5 000 грн → продажі 25 000 грн → ROAS = 5. Хороший результат.",
    relatedTerms: ["roi", "cpc", "conversion-rate"],
    relatedService: "ads",
  },
  {
    slug: "conversion-rate",
    termUk: "Конверсія",
    termEn: "Conversion Rate",
    category: "business",
    shortDescription: "Відсоток відвідувачів, що виконали цільову дію: замовлення, реєстрацію, дзвінок.",
    fullDescription: `Conversion Rate (CR) = Конверсії / Відвідувачі × 100%.\n\nПриклад: 1 000 відвідувачів → 30 заявок → CR = 3%.\n\nСередні конверсії по галузях: e-commerce — 1–3%, B2B лендінги — 3–8%, медицина — 4–10%, юридичні послуги — 2–5%.\n\nЯк підвищити конверсію: оптимізація CTA (текст, колір, розміщення), соціальні докази (відгуки, лічильники), спрощення форм, A/B тестування, підвищення швидкості (кожна секунда затримки = -7% конверсій за Amazon).`,
    example: "Landing page з CR 5% + 500 відвідувачів/місяць = 25 лідів. Підвищення CR до 10% → 50 лідів без зміни трафіку.",
    relatedTerms: ["cta", "a-b-testing", "roi"],
    relatedService: "landing",
  },
  {
    slug: "sales-funnel",
    termUk: "Воронка продажів",
    termEn: "Sales Funnel",
    category: "business",
    shortDescription: "Шлях клієнта від першого контакту до покупки: Awareness → Interest → Decision → Action.",
    fullDescription: `Воронка продажів (Sales Funnel) — модель, що описує шлях потенційного клієнта від першого знайомства з брендом до фінального рішення про покупку.\n\nКласична AIDA-модель: **Awareness** (побачив рекламу/статтю) → **Interest** (зацікавився, зайшов на сайт) → **Desire** (порівняв, хоче) → **Action** (замовив, заповнив форму).\n\nКожна стадія воронки потребує різного контенту: верх — корисні статті/відео; середина — порівняння, кейси, відгуки; низ — спеціальна пропозиція, безкоштовна консультація.`,
    example: "1000 переглядів реклами → 100 переходів на сайт → 20 заявок → 5 клієнтів. Воронка 1000:100:20:5.",
    relatedTerms: ["conversion-rate", "cta", "lead"],
    relatedService: "landing",
  },
  {
    slug: "lead",
    termUk: "Лід",
    termEn: "Lead",
    category: "business",
    shortDescription: "Потенційний клієнт, що залишив контактні дані або виконав цільову дію на сайті.",
    fullDescription: `Лід (Lead) — потенційний клієнт, що виявив зацікавленість у ваших послугах: заповнив форму, зателефонував, написав у чат або підписався на розсилку.\n\nРівні лідів: **MQL** (Marketing Qualified Lead) — відвідав сайт, завантажив матеріал — потрібна «прогрівання»; **SQL** (Sales Qualified Lead) — залишив заявку, готовий спілкуватись з менеджером.\n\nВартість ліда (CPL, Cost Per Lead) = Витрати на маркетинг / Кількість лідів. Мета — знизити CPL при збереженні якості лідів.`,
    example: "Форма зворотного зв'язку принесла 30 лідів за місяць. CPL = 5 000 грн / 30 = ~167 грн/лід.",
    relatedTerms: ["conversion-rate", "sales-funnel", "cpc"],
    relatedService: "landing",
  },
  {
    slug: "a-b-testing",
    termUk: "A/B Тестування",
    termEn: "A/B Testing",
    category: "business",
    shortDescription: "Порівняння двох версій сторінки або елементу для визначення, яка краще конвертує.",
    fullDescription: `A/B тестування — метод оптимізації, де аудиторія ділиться на дві групи: 50% бачать версію A (поточну), 50% — версію B (зміна). Після збору даних порівнюють конверсію.\n\nЩо тестують: заголовок hero (два варіанти тексту), колір кнопки CTA, форма (3 поля vs 5 полів), розміщення блоку відгуків, ціноутворення (знижка vs без знижки).\n\nВажливо: тестувати лише одну зміну за раз. Мінімальна вибірка — 100 конверсій в кожній групі для статистичної значущості.`,
    example: "Версія A: «Залишити заявку» → CR 3%. Версія B: «Отримати безкоштовну консультацію» → CR 5.2%. B перемагає.",
    relatedTerms: ["conversion-rate", "cta"],
    relatedService: "landing",
  },
  {
    slug: "retargeting",
    termUk: "Ретаргетинг",
    termEn: "Retargeting",
    category: "business",
    shortDescription: "Реклама для людей, що вже відвідували ваш сайт — «наздоганяє» їх на інших ресурсах.",
    fullDescription: `Ретаргетинг (remarketing) — технологія показу реклами тим, хто вже взаємодіяв з вашим сайтом, але не зробив покупку. Це стає можливим завдяки пікселям відстеження (Facebook Pixel, Google Tag).\n\nЯк працює: відвідувач зайшов на сайт → отримав cookie → йде в Instagram → бачить вашу рекламу.\n\nРетаргетинг — найефективніший вид реклами: аудиторія вже знайома з брендом. CTR у 2–5 разів вищий, ніж у «холодної» реклами. Особливо ефективний для e-commerce (повернення тих, хто кинув кошик).`,
    example: "Переглянули кросівки → пішли в YouTube → побачили рекламу тих самих кросівок → повернулись і купили.",
    relatedTerms: ["cpc", "conversion-rate", "lead"],
    relatedService: "ads",
  },

  // === UX/UI ===
  {
    slug: "ux",
    termUk: "UX",
    termEn: "UX (User Experience)",
    category: "business",
    shortDescription: "Досвід користувача — все, що людина відчуває при взаємодії з продуктом або сайтом.",
    fullDescription: `UX (User Experience) — це загальний досвід людини при взаємодії з продуктом: наскільки легко знайти потрібну інформацію, чи зрозумілий процес замовлення, чи не виникає роздратування.\n\nUX охоплює: архітектуру інформації (структура меню та сторінок), usability (зручність використання), accessibility (доступність для людей з обмеженнями), емоційний дизайн.\n\nПоганий UX = втрачені клієнти. Дослідження Forrester: кожна $1, інвестована в UX, повертає $100. Кнопка «Купити», яку важко знайти — це проблема UX, не UI.`,
    example: "Amazon постійно тестує UX: розміщення кнопки, кількість кроків до оформлення, структура каталогу.",
    relatedTerms: ["ui", "cta", "conversion-rate", "a-b-testing"],
    relatedService: "design",    relatedBlogPost: "figma-to-code-workflow",  },
  {
    slug: "ui",
    termUk: "UI",
    termEn: "UI (User Interface)",
    category: "business",
    shortDescription: "Інтерфейс користувача — візуальне оформлення: кольори, шрифти, кнопки, іконки.",
    fullDescription: `UI (User Interface) — візуальний шар продукту: кольори, типографіка, кнопки, іконки, відступи, ілюстрації. UI — те, як продукт виглядає, UX — те, як він використовується.\n\nUI-дизайнер відповідає за: дизайн-систему (набір компонентів), колірну палітру та типографіку, мікроанімації, адаптивну верстку для різних екранів.\n\nUI без хорошого UX — красива, але незручна пастка. Хороший UI при поганому UX не врятує конверсію. Обидва важливі.`,
    example: "Кнопка «Замовити» — UI (колір, розмір, шрифт). Де її розмістити для максимальних кліків — UX.",
    relatedTerms: ["ux", "wireframe", "design-system", "cta"],
    relatedService: "design",
  },
  {
    slug: "cta",
    termUk: "CTA",
    termEn: "CTA (Call to Action)",
    category: "business",
    shortDescription: "Заклик до дії — кнопка або текст, що спонукає відвідувача виконати конкретну дію.",
    fullDescription: `CTA (Call to Action) — елемент інтерфейсу (зазвичай кнопка), що закликає користувача до конкретної дії: «Замовити», «Дізнатись більше», «Отримати безкоштовну консультацію».\n\nЯк зробити ефективний CTA: конкретна дія (не «Натиснути», а «Отримати прайс»), виділення кольором і розміром, розміщення «вище лінії прокрутки» (above the fold), один головний CTA на сторінку.\n\nТестування CTA — один з найшвидших способів підвищити конверсію без редизайну. Зміна тексту кнопки може підвищити CR на 20–90%.`,
    example: "'Безкоштовна 30-хв консультація' → вищий CTR, ніж 'Зв'язатись з нами' — конкретна цінність очевидна.",
    relatedTerms: ["ux", "conversion-rate", "a-b-testing"],
    relatedService: "design",
  },
  {
    slug: "wireframe",
    termUk: "Wireframe",
    termEn: "Wireframe (Вайрфрейм)",
    category: "business",
    shortDescription: "Схематичний макет сторінки — каркас без кольорів і деталей для планування структури.",
    fullDescription: `Wireframe — схематичне зображення структури сторінки. Без кольорів, шрифтів і реальних зображень — лише блоки, текст-заглушки та кнопки. Wireframe відповідає на питання: «Що і де розміщено?», а не «Як це виглядає?».\n\nЕтапи дизайн-процесу: Wireframe (структура) → Prototype (інтерактивність) → UI Design (візуальне оформлення) → Frontend (реалізація).\n\nWireframe дозволяє швидко протестувати UX і структуру до початку дорогого UI-дизайну та розробки. Зміни на етапі wireframe — безкоштовні. Зміни на етапі розробки — дорогі.`,
    example: "Перед дизайном лендінгу Codeworth малює wireframe: де hero, де послуги, де відгуки, де форма.",
    relatedTerms: ["ux", "ui", "mvp"],
    relatedService: "design",
    relatedBlogPost: "figma-to-code-workflow",
  },
  {
    slug: "accessibility",
    termUk: "Accessibility (a11y)",
    termEn: "Accessibility (a11y)",
    category: "business",
    shortDescription: "Доступність сайту для людей з обмеженими можливостями — стандарт WCAG 2.1.",
    fullDescription: `Accessibility (a11y, скорочення 'a' + 11 літер + 'y') — проєктування сайтів з урахуванням потреб людей з обмеженими можливостями: слабким зором, проблемами зі слухом, руховими обмеженнями.\n\nСтандарт: WCAG 2.1 (Web Content Accessibility Guidelines). Рівні: A (мінімум), AA (стандарт), AAA (найвищий).\n\nОснови accessibility: правильна семантична HTML-розмітка, ARIA-атрибути, достатній контраст кольорів (4.5:1 для тексту), підтримка навігації з клавіатури (Tab), alt-теги для зображень.\n\nCodeworth проводить 43+ axe-тести на accessibility у кожному проєкті.`,
    example: "Без alt-тегу на зображенні screen-reader (для незрячих) не може розповісти, що на картинці.",
    relatedTerms: ["ux", "ui", "mobile-first"],
    relatedService: "design",
  },
  {
    slug: "design-system",
    termUk: "Design System",
    termEn: "Design System (Дизайн-система)",
    category: "business",
    shortDescription: "Єдина бібліотека компонентів, стилів і правил для підтримки консистентного дизайну.",
    fullDescription: `Design System — це набір стандартів і компонентів: кольорова палітра, типографіка, відступи, кнопки, форми, іконки, картки. Дизайн-система забезпечує однаковий вигляд на всіх сторінках та платформах.\n\nЯк це працює: дизайнер раз створює кнопку «Primary» — і вона використовується скрізь однаково. Зміна кольору в системі → автоматично оновлюється на всьому сайті.\n\nВідомі дизайн-системи: Material Design (Google), Atlassian Design System, Primer (GitHub). Codeworth будує власну дизайн-систему для кожного клієнта.`,
    example: "Колірна палітра Codeworth: Indigo-600 (#4F46E5) як primary, Gray-50 (#F9FAFB) як background — задані один раз, використовуються скрізь.",
    relatedTerms: ["ui", "ux"],
    relatedService: "design",
    relatedBlogPost: "tailwind-css-v4-design-system",
  },

  // === HOSTING ===
  {
    slug: "hosting",
    termUk: "Хостинг",
    termEn: "Web Hosting",
    category: "infrastructure",
    shortDescription: "Послуга зберігання файлів сайту на сервері з постійним підключенням до інтернету.",
    fullDescription: `Хостинг — це оренда місця на сервері для зберігання файлів сайту. Без хостингу сайт не буде доступний в інтернеті.\n\nТипи хостингу: **Shared** — ресурси сервера ділиться між багатьма сайтами (дешево, але повільно); **VPS** — виділений virtual сервер (середина між shared та dedicated); **Dedicated** — повністю ваш сервер; **Cloud/PaaS** — Vercel, Netlify — оптимально для Next.js.\n\nDля Next.js-проєктів Codeworth рекомендує Vercel: автоматичний CDN, автодеплой з GitHub, вбудована аналітика.`,
    example: "Vercel — хостинг для Next.js: деплой за 30 секунд після коміту в GitHub. Безкоштовний план для малих проєктів.",
    relatedTerms: ["vps", "cdn", "ssl", "vercel"],
    relatedService: "machine-learning",
  },
  {
    slug: "vps",
    termUk: "VPS",
    termEn: "VPS (Virtual Private Server)",
    category: "infrastructure",
    shortDescription: "Виділений віртуальний сервер — потужніший за shared хостинг, дешевший за dedicated.",
    fullDescription: `VPS (Virtual Private Server) — тип хостингу, де на фізичному сервері через віртуалізацію створюється ізольоване середовище з гарантованими ресурсами (CPU, RAM, SSD).\n\nПереваги перед shared: власні ресурси (сусіди не впливають на швидкість), root-доступ, можливість встановлення будь-якого ПЗ. Ціни: $5–50/місяць залежно від ресурсів.\n\nVPS підходить для: WordPress зі значним трафіком, Node.js/Python серверів, баз даних, корпоративних сайтів. Для Next.js (статика + ISR) часто вистачає Vercel/Netlify.`,
    example: "Медична клініка з 10 000 відвідувань/місяць на WordPress потребує VPS, а не shared хостинг.",
    relatedTerms: ["hosting", "cdn", "ssl"],
    relatedService: "machine-learning",
  },
  {
    slug: "cdn",
    termUk: "CDN",
    termEn: "CDN (Content Delivery Network)",
    category: "infrastructure",
    shortDescription: "Мережа серверів по всьому світу для швидкої доставки контенту до користувача.",
    fullDescription: `CDN (Content Delivery Network) — розподілена мережа серверів у різних точках світу. Коли користувач відкриває сайт, файли завантажуються з найближчого сервера CDN, а не з головного сервера.\n\nПереваги: менша затримка (latency), швидше завантаження для користувачів у будь-якій країні, зниження навантаження на origin-сервер, захист від DDoS-атак.\n\nVercel автоматично роздає SSG-сторінки через глобальний CDN. Cloudflare — безкоштовний CDN та захист для будь-якого сайту.`,
    example: "Сайт на сервері в Берліні: без CDN користувач з Харкова чекає 300мс; з CDN (сервер у Варшаві) — 50мс.",
    relatedTerms: ["hosting", "vps", "ssl", "lcp"],
    relatedService: "machine-learning",
  },
  {
    slug: "ssl",
    termUk: "SSL/HTTPS",
    termEn: "SSL/TLS (HTTPS)",
    category: "infrastructure",
    shortDescription: "Протокол шифрування з'єднання між браузером і сервером — дає зелений замочок у браузері.",
    fullDescription: `SSL (Secure Sockets Layer) / TLS (Transport Layer Security) — протоколи шифрування, що забезпечують безпечне з'єднання між браузером і сервером. Сайт з SSL отримує HTTPS та зелений замочок.\n\nЧому SSL обов'язковий: Google з 2014 року враховує HTTPS як фактор ранжирування; Chrome маркує HTTP-сайти як «небезпечні»; без SSL форми і оплати небезпечні; більшість сучасних API вимагають HTTPS.\n\nLet's Encrypt — безкоштовний SSL-сертифікат. Vercel та більшість хостингів автоматично встановлюють SSL.`,
    example: "https:// замість http:// — ознака SSL. Без нього Chrome показує «Небезпечно» і відлякує клієнтів.",
    relatedTerms: ["hosting", "cdn", "vps"],
    relatedService: "machine-learning",
  },
  {
    slug: "vercel",
    termUk: "Vercel",
    termEn: "Vercel",
    category: "infrastructure",
    shortDescription: "Платформа для деплою Next.js-проєктів — автоматичний CDN, preview deployments, аналітика.",
    fullDescription: `Vercel — компанія, що створила Next.js, та платформа для деплою JavaScript-проєктів. Ідеально оптимізована для Next.js: автоматичний CDN, ISR, Edge Functions, preview deployments для кожного PR.\n\nKлючові можливості: деплой за 30 секунд після push в GitHub, автоматичний SSL, глобальний CDN у 70+ точках світу, аналітика Core Web Vitals, функції Edge Runtime.\n\nCodeworth деплоює всі проєкти на Vercel: нульова конфігурація, автоматичне масштабування, безкоштовний план для MVP.`,
    example: "Після git push: Vercel автоматично запускає build, тести і деплоїть нову версію сайту за 45 секунд.",
    relatedTerms: ["hosting", "cdn", "next-js", "ssg"],
    relatedService: "machine-learning",
  },

  // === ANALYTICS ===
  {
    slug: "google-analytics",
    termUk: "Google Analytics 4",
    termEn: "Google Analytics 4 (GA4)",
    category: "data",
    shortDescription: "Безкоштовний інструмент аналітики Google — відстежує відвідувачів, поведінку та конверсії.",
    fullDescription: `Google Analytics 4 (GA4) — нове покоління Google Analytics (замінило Universal Analytics у 2023). GA4 відстежує поведінку користувачів на сайті та у мобільному додатку в єдиному інтерфейсі.\n\nГоловні можливості GA4: Events-based tracking (кожна дія — подія), Explore (кастомні звіти), Funnel Analysis, Path Exploration, інтеграція з Google Ads та Looker Studio.\n\nCodeworth налаштовує GA4 з розширеним трекінгом подій: кліки на CTA, відправка форм, прокрутка сторінок, взаємодія з чатом — все вимірюється та аналізується.`,
    example: "GA4 показує: 60% конверсій приходить з мобільних → потрібно покращити мобільну UX.",
    relatedTerms: ["conversion-rate", "organic-traffic", "ctr"],
    relatedService: "seo",
  },
  {
    slug: "utm",
    termUk: "UTM-мітки",
    termEn: "UTM Parameters",
    category: "data",
    shortDescription: "Параметри в URL для відстеження джерела трафіку в Google Analytics.",
    fullDescription: `UTM-параметри (Urchin Tracking Module) — спеціальні параметри, що додаються до URL і дозволяють Google Analytics визначити точне джерело відвідувача.\n\nОсновні параметри: utm_source (facebook, google, email), utm_medium (cpc, organic, newsletter), utm_campaign (назва кампанії), utm_content (варіант оголошення).\n\nПриклад: https://codeworth.uk?utm_source=facebook&utm_medium=cpc&utm_campaign=may-promo\n\nБез UTM-міток GA4 показує «Direct» трафік — неможливо зрозуміти, яка реклама працює.`,
    example: "Email-розсилка з UTM показала 150 переходів та 12 замовлень. Без UTM — всі вони «Direct» у GA4.",
    relatedTerms: ["google-analytics", "cpc", "conversion-rate"],
    relatedService: "seo",
  },

  // === AI ===
  {
    slug: "llm",
    termUk: "LLM",
    termEn: "LLM (Large Language Model)",
    category: "ai",
    shortDescription: "Велика мовна модель — AI, навчений на мільярдах текстів: GPT, Claude, Gemini.",
    fullDescription: `LLM (Large Language Model) — клас AI-моделей, навчених на величезних масивах тексту для розуміння та генерації мови. Приклади: GPT-4 (OpenAI), Claude (Anthropic), Gemini (Google), Llama (Meta).\n\nЯк LLM впливає на бізнес: автоматизація контенту та копірайтингу, AI-чатботи для підтримки клієнтів, аналіз відгуків, кодогенерація (GitHub Copilot), переклади.\n\nДля SEO: Google використовує власні LLM для розуміння змісту сторінок. AI Overview (SGE) з'являється в SERP для частини запитів — це змінює стратегію оптимізації.`,
    example: "ChatGPT, Claude, Gemini — все це LLM. Вони генерують текст, відповідають на питання, пишуть код.",
    relatedTerms: ["generative-ai", "rag"],
    relatedService: "artificial-intelligence",
    relatedBlogPost: "ai-chatbot-for-business-ukraine",
    relatedNichePage: "/ai/marketing"
  },
  {
    slug: "generative-ai",
    termUk: "Генеративний AI",
    termEn: "Generative AI (GenAI)",
    category: "ai",
    shortDescription: "AI, що генерує новий контент: тексти, зображення, відео, код.",
    fullDescription: `Генеративний AI (GenAI) — клас AI-систем, що створюють новий контент: тексти (LLM), зображення (Midjourney, DALL-E), відео (Sora), музику (Udio), код (Copilot).\n\nВплив на digital-маркетинг: пришвидшення створення контенту (статті, описи товарів, рекламні тексти), персоналізація на масштабі, зниження вартості медіапродакшну.\n\nВажливо: GenAI генерує «правдоподібний» контент, а не «правильний». Потрібна людська верифікація, особливо для YMYL-тем (медицина, фінанси, право).`,
    example: "Генерація 100 описів товарів для інтернет-магазину через ChatGPT — за годину замість тижня копірайтером.",
    relatedTerms: ["llm", "rag"],
    relatedService: "artificial-intelligence",
    relatedBlogPost: "ai-chatbot-for-business-ukraine",
    relatedNichePage: "/ai/marketing"
  },
  {
    slug: "rag-intro",
    termUk: "RAG — Вступ",
    termEn: "RAG — Introduction",
    category: "ai",
    shortDescription: "Технологія навчання AI на власних документах — AI відповідає на основі вашої бази знань.",
    fullDescription: `RAG (Retrieval-Augmented Generation) — архітектура, де LLM отримує доступ до зовнішньої бази знань (документів, FAQ, каталогу) для формування відповіді.\n\nЯк це працює: 1) Запит користувача → пошук релевантних документів у векторній базі; 2) Знайдені документи + запит → передаються в LLM; 3) LLM генерує відповідь на основі реальних даних.\n\nПрактичне застосування: AI-чатбот, навчений на вашому FAQ та прайсі; internal search для корпоративного порталу; підтримка клієнтів 24/7 на основі бази знань продукту.`,
    example: "Чатбот на сайті юридичної фірми відповідає на питання про послуги — на основі реальних документів фірми, а не «галюцинацій» AI.",
    relatedTerms: ["rag", "llm", "generative-ai"],
    relatedService: "artificial-intelligence",
    relatedBlogPost: "ai-chatbot-for-business-ukraine",
    relatedNichePage: "/ai/ecommerce"
  },

  // === WEB DEV (additional) ===
  {
    slug: "tailwind-css",
    termUk: "Tailwind CSS",
    termEn: "Tailwind CSS",
    category: "business",
    shortDescription: "Utility-first CSS-фреймворк для швидкого створення адаптивних інтерфейсів.",
    fullDescription: `Tailwind CSS — фреймворк, де замість написання власного CSS ви використовуєте готові утилітарні класи прямо в HTML: \`flex\`, \`pt-4\`, \`text-indigo-600\`.\n\nГоловна перевага: розробка в 3–5 разів швидша. Немає конфліктів імен класів. PurgeCSS автоматично видаляє невикористані стилі — фінальний bundle мінімальний.\n\nCodeworth використовує Tailwind CSS v4 у всіх проєктах. Це стандарт у сучасній Next.js-розробці.`,
    example: "Замість написання CSS-правил розробник пише `className=\"flex items-center gap-4 text-lg font-semibold\"` прямо в JSX.",
    relatedTerms: ["responsive-design", "mobile-first", "next-js"],
    relatedService: "machine-learning",
  },
  {
    slug: "spa",
    termUk: "SPA",
    termEn: "SPA (Single Page Application)",
    category: "business",
    shortDescription: "Односторінковий застосунок — сайт, що завантажується один раз і оновлює вміст без перезавантаження.",
    fullDescription: `SPA (Single Page Application) — архітектура, де браузер завантажує один HTML-файл, а подальша навігація відбувається через JavaScript без перезавантаження сторінки.\n\nПереваги: плавна навігація (немає «кліпів» між сторінками), хороший UX для складних застосунків. Недоліки: гірше SEO без SSR/SSG (пошукові боти бачать порожню сторінку), більший початковий JS bundle.\n\nПрикладами SPA є Gmail, Trello, Figma. Для SEO-критичних сайтів краще використовувати SSG або SSR.`,
    example: "Gmail — класичний SPA: ви перемикаєте листи без перезавантаження сторінки.",
    relatedTerms: ["csr", "ssg", "ssr", "react"],
    relatedService: "machine-learning",
  },
  {
    slug: "docker",
    termUk: "Docker",
    termEn: "Docker",
    category: "business",
    shortDescription: "Платформа для упаковки та запуску застосунків у ізольованих контейнерах.",
    fullDescription: `Docker дозволяє «упакувати» застосунок разом з усіма залежностями у контейнер — ізольоване середовище, що працює однаково на будь-якій машині.\n\nЧому це важливо: «Але ж у мене все працювало!» — найпоширеніша проблема розробки. Docker усуває її, оскільки оточення розробника, тестового сервера та продакшну ідентичні.\n\nДля бізнесу: спрощує деплой, масштабування та відновлення після збоїв.`,
    example: "Node.js-застосунок у Docker-контейнері однаково запускається на MacOS, Windows і Linux-сервері.",
    relatedTerms: ["vps", "hosting", "cicd"],
    relatedService: "machine-learning",
  },
  {
    slug: "cicd",
    termUk: "CI/CD",
    termEn: "CI/CD (Continuous Integration / Continuous Delivery)",
    category: "business",
    shortDescription: "Автоматичне тестування та деплой коду при кожній зміні — без ручних дій.",
    fullDescription: `CI/CD — практика автоматизації збірки, тестування та деплою коду. При кожному push розробника автоматично запускаються тести, перевіряється код і, якщо все гаразд, — нова версія деплоїться на сервер.\n\nCI (Continuous Integration): регулярне злиття змін з автоматичним тестуванням.\nCD (Continuous Delivery/Deployment): автоматичний деплой після проходження тестів.\n\nCodeworth використовує GitHub Actions для CI/CD: тести + ESLint + build + E2E тести при кожному PR.`,
    example: "Розробник пушить код → GitHub Actions запускає 1850+ тестів → якщо все пройшло → Vercel автоматично деплоїть нову версію.",
    relatedTerms: ["docker", "vercel", "vps"],
    relatedService: "machine-learning",
  },
  {
    slug: "webhook",
    termUk: "Webhook",
    termEn: "Webhook",
    category: "business",
    shortDescription: "Автоматичне HTTP-повідомлення від одного сервісу до іншого при настанні події.",
    fullDescription: `Webhook — механізм «зворотного дзвінка»: замість того, щоб ваш сайт постійно питав «чи є нові дані?», зовнішній сервіс сам повідомляє вас, коли щось відбувається.\n\nПриклади: LiqPay надсилає webhook при успішній оплаті → ваш сайт автоматично видає доступ до курсу. Nova Poshta надсилає webhook при зміні статусу посилки → клієнт отримує SMS. Telegram Bot надсилає webhook при новому повідомленні → ваш чатбот відповідає.\n\nWebhook набагато ефективніший за polling (регулярне опитування API).`,
    example: "Після оплати в LiqPay ваш сайт отримує webhook і автоматично активує підписку користувача.",
    relatedTerms: ["api", "rest-api"],
    relatedService: "integrations",
  },
  {
    slug: "oauth",
    termUk: "OAuth",
    termEn: "OAuth 2.0",
    category: "business",
    shortDescription: "Протокол авторизації — дозволяє «Увійти через Google/Facebook» без передачі паролю.",
    fullDescription: `OAuth 2.0 — відкритий стандарт авторизації, що дозволяє одному застосунку отримати обмежений доступ до акаунту користувача в іншому сервісі.\n\nЯк це працює: 1) Користувач натискає «Увійти через Google»; 2) Google запитує дозвіл; 3) Після підтвердження Google повертає токен доступу; 4) Ваш сайт використовує токен для отримання даних профілю.\n\nПереваги для бізнесу: менше бар'єрів при реєстрації (не потрібно придумувати ще один пароль), вищий рівень безпеки.`,
    example: "Кнопки «Увійти через Google», «Увійти через Facebook» — реалізовані через OAuth 2.0.",
    relatedTerms: ["api", "rest-api", "pwa"],
    relatedService: "machine-learning",
  },
  {
    slug: "microservices",
    termUk: "Мікросервіси",
    termEn: "Microservices",
    category: "business",
    shortDescription: "Архітектурний підхід, де застосунок розбитий на невеликі незалежні сервіси.",
    fullDescription: `Мікросервісна архітектура — підхід до розробки, де великий застосунок розбивається на невеликі, незалежні сервіси, кожен з яких відповідає за одну функцію.\n\nПереваги: кожен сервіс можна масштабувати незалежно, розробляти окремими командами, деплоїти без впливу на інші. Недоліки: складніше налагодження, потрібна добра інфраструктура (Docker, Kubernetes).\n\nДля МСБ мікросервіси зазвичай надмірні — краще починати з монолітної архітектури та переходити поступово.`,
    example: "Amazon розбив свій монолітний сайт на 1000+ мікросервісів — кожна функція (кошик, пошук, рекомендації) — окремий сервіс.",
    relatedTerms: ["api", "docker", "rest-api"],
    relatedService: "machine-learning",
  },

  // === SEO (additional) ===
  {
    slug: "fcp",
    termUk: "FCP",
    termEn: "FCP (First Contentful Paint)",
    category: "business",
    shortDescription: "Перший вміст — час до появи першого тексту або зображення на сторінці.",
    fullDescription: `FCP (First Contentful Paint) — метрика Core Web Vitals, що вимірює час від початку завантаження до появи першого тексту або зображення.\n\nПорогові значення Google: Добре — до 1.8 с; Потребує покращення — 1.8–3 с; Погано — понад 3 с.\n\nЯк покращити: усунення ресурсів, що блокують рендеринг (render-blocking CSS/JS), preload критичних шрифтів, оптимізація сервера. FCP відрізняється від LCP: FCP — перший елемент, LCP — найбільший.`,
    example: "Якщо сторінка показує спінер 3 секунди перед відображенням контенту — FCP = 3 с, що є «погано».",
    relatedTerms: ["core-web-vitals", "lcp", "ttfb", "seo"],
    relatedService: "seo",
  },
  {
    slug: "ttfb",
    termUk: "TTFB",
    termEn: "TTFB (Time to First Byte)",
    category: "business",
    shortDescription: "Час до першого байту — наскільки швидко сервер починає відповідати на запит.",
    fullDescription: `TTFB (Time to First Byte) — метрика, що вимірює час між відправкою HTTP-запиту браузером та отриманням першого байту відповіді від сервера.\n\nПорогові значення Google: Добре — до 800 мс; Потребує покращення — 800–1800 мс; Погано — понад 1800 мс.\n\nЯк покращити: використання CDN (Vercel Edge Network, Cloudflare), кешування SSG-сторінок, оптимізація бази даних. Статичні SSG-сторінки мають TTFB < 100 мс завдяки CDN.`,
    example: "Хостинг у ЦОД Варшаві для клієнтів з Києва — TTFB близько 30–50 мс. Без CDN — 300–500 мс.",
    relatedTerms: ["core-web-vitals", "lcp", "fcp", "cdn"],
    relatedService: "seo",
  },
  {
    slug: "technical-seo",
    termUk: "Технічне SEO",
    termEn: "Technical SEO",
    category: "business",
    shortDescription: "Оптимізація технічних аспектів сайту для кращого сканування та індексації пошуковиками.",
    fullDescription: `Технічне SEO — комплекс заходів, що допомагають пошуковим роботам ефективно сканувати, індексувати та розуміти ваш сайт.\n\nОсновні напрями: швидкість сторінок (Core Web Vitals), правильна структура URL, sitemap.xml та robots.txt, HTTPS, мобільна адаптивність, виправлення помилок 4xx/5xx, усунення дублікатів через canonical URL.\n\nТехнічне SEO — фундамент. Без нього навіть якісний контент може не потрапити в топ.`,
    example: "Відсутність HTTPS — критична технічна помилка SEO: Google позначає сайт як «небезпечний» і знижує рейтинг.",
    relatedTerms: ["seo", "core-web-vitals", "canonical-url", "schema-org"],
    relatedService: "seo",
  },
  {
    slug: "on-page-seo",
    termUk: "On-Page SEO",
    termEn: "On-Page SEO",
    category: "business",
    shortDescription: "Оптимізація контенту та HTML-розмітки окремих сторінок для пошуковиків.",
    fullDescription: `On-Page SEO (внутрішня оптимізація) — роботи безпосередньо на сторінці: оптимізація тегу title, мета-опису, заголовків H1–H6, контенту, URL, внутрішніх посилань, alt-текстів зображень.\n\nКлючові елементи: унікальний title з ключовим словом на початку (до 60 символів), meta description 120–155 символів, один H1 на сторінці, природне використання LSI-ключових слів у тексті.\n\nOn-Page SEO — найдоступніший тип оптимізації: не потребує посилань або технічних змін.`,
    example: "Стаття «Як відкрити ресторан у Києві» з H1 «Як відкрити ресторан у Києві: покрокова інструкція» та title «Відкрити ресторан у Києві — гайд 2026 | Codeworth» — класичний On-Page SEO.",
    relatedTerms: ["seo", "technical-seo", "backlink", "ctr"],
    relatedService: "seo",
  },
  {
    slug: "rich-snippets",
    termUk: "Rich Snippets",
    termEn: "Rich Snippets",
    category: "business",
    shortDescription: "Розширені результати пошуку з зірками, цінами, рецептами, FAQ — завдяки Schema.org.",
    fullDescription: `Rich Snippets (розширені сніпети) — розширені результати в Google SERP, що містять додаткову інформацію: зірки рейтингу, ціни, кількість відгуків, хлібні крихти, FAQ, дати заходів.\n\nЯк реалізувати: додати Schema.org розмітку (JSON-LD) відповідного типу: Review, Product, FAQPage, Recipe, Event, JobPosting.\n\nВплив на бізнес: Rich Snippets підвищують CTR на 20–35% — більше кліків без підвищення позиції. Особливо ефективні: зірки відгуків для локального бізнесу та FAQ-сніпети для інформаційних сторінок.`,
    example: "Інтернет-магазин з розміткою Product + AggregateRating показує ★★★★★ 4.8 (120 відгуків) прямо в Google — збільшує CTR на 30%.",
    relatedTerms: ["schema-org", "serp", "ctr", "eeat"],
    relatedService: "seo",
  },
  {
    slug: "keyword",
    termUk: "Ключове слово",
    termEn: "Keyword",
    category: "business",
    shortDescription: "Слово або фраза, за якою користувачі шукають інформацію в пошукових системах.",
    fullDescription: `Ключове слово (keyword) — запит, який користувачі вводять у пошукові системи. SEO-оптимізація спрямована на те, щоб ваша сторінка з'являлась у результатах за цільовими запитами.\n\nТипи: короткі (1–2 слова, висока конкуренція: «веб-сайт»), довгохвості long-tail (3+ слів, нижча конкуренція: «замовити інтернет-магазин для кондитерської»).\n\nДля МСБ long-tail ключові слова ефективніші: менша конкуренція, вища конверсія (запит конкретніший, намір чіткіший).`,
    example: "«Веб-студія» — висококонкурентне ключове слово. «Розробка сайту для стоматології Київ» — long-tail з нижчою конкуренцією та вищою конверсією.",
    relatedTerms: ["seo", "organic-traffic", "serp", "local-seo"],
    relatedService: "seo",
  },
  {
    slug: "bounce-rate",
    termUk: "Показник відмов",
    termEn: "Bounce Rate",
    category: "business",
    shortDescription: "Відсоток відвідувачів, що покинули сайт після перегляду однієї сторінки.",
    fullDescription: `Показник відмов (Bounce Rate) — відсоток сесій, де користувач переглянув лише одну сторінку і покинув сайт без взаємодії.\n\nВисокий показник відмов (> 70%) може означати: сторінка не відповідає очікуванням (wrong match), повільне завантаження, некякісний контент або поганий UX. Але для блогів та лендінгів 70–80% — норма (прочитали, отримали відповідь — пішли).\n\nВ GA4 замість Bounce Rate використовується Engagement Rate — відсоток залучених сесій (понад 10 секунд або взаємодія).`,
    example: "Якщо з 100 відвідувачів 65 пішли після першої сторінки — Bounce Rate = 65%.",
    relatedTerms: ["google-analytics", "organic-traffic", "ux", "ctr"],
    relatedService: "seo",
  },
  {
    slug: "domain-authority",
    termUk: "Авторитет домену",
    termEn: "Domain Authority (DA)",
    category: "business",
    shortDescription: "Метрика Moz (1–100), що прогнозує конкурентоспроможність сайту в пошуку.",
    fullDescription: `Domain Authority (DA) — метрика від Moz, що прогнозує здатність сайту ранжуватись у пошуку за шкалою від 1 до 100. Схожа метрика від Ahrefs — Domain Rating (DR).\n\nDA залежить від: кількості та якості зворотних посилань (backlinks), вік домену, технічне SEO, активність контенту.\n\nВажливо: DA — порівняльна метрика, а не абсолютна. Сайт з DA 30 може перевищувати DA 50, якщо конкуренти в ніші мають DA 20–25.`,
    example: "codeworth.uk на старті — DA ~5. Конкуренти в ніші «веб-студія Київ» — DA 15–35. Ціль — поступово підвищувати через контент та backlinks.",
    relatedTerms: ["backlink", "seo", "organic-traffic"],
    relatedService: "seo",
  },
  {
    slug: "robots-txt",
    termUk: "robots.txt",
    termEn: "robots.txt",
    category: "business",
    shortDescription: "Файл, що вказує пошуковим роботам, які сторінки сканувати, а які — ігнорувати.",
    fullDescription: `robots.txt — текстовий файл у корені сайту, що встановлює правила для пошукових роботів: дозволяє або забороняє сканування певних розділів.\n\nТипові правила: заборонити /admin/, /api/, /account/ (не потрібно індексувати), дозволити всі публічні сторінки. Також містить посилання на sitemap.xml.\n\nВажливо: robots.txt — рекомендація, а не жорстка заборона. Шкідливі боти можуть ігнорувати його. Для захисту конфіденційних сторінок використовуйте авторизацію, а не тільки robots.txt.`,
    example: "User-agent: * \\nDisallow: /admin/ \\nDisallow: /api/ \\nSitemap: https://codeworth.uk/sitemap.xml",
    relatedTerms: ["technical-seo", "seo", "canonical-url"],
    relatedService: "seo",
  },
  {
    slug: "sitemap-xml",
    termUk: "Sitemap.xml",
    termEn: "Sitemap.xml",
    category: "business",
    shortDescription: "XML-файл зі списком усіх URL сайту — допомагає пошуковикам знайти та проіндексувати всі сторінки.",
    fullDescription: `Sitemap.xml — файл, що містить список URL всіх сторінок сайту з метаданими (дата оновлення, пріоритет, частота змін).\n\nПошукові роботи використовують sitemap для ефективного сканування: особливо важливо для великих сайтів (1000+ сторінок) або нових сайтів без зовнішніх посилань.\n\nNext.js автоматично генерує sitemap.xml через App Router API. Codeworth має 115+ URL у sitemap.`,
    example: "codeworth.uk/sitemap.xml містить всі сторінки: /, /uk/about, /uk/services/website-dev тощо — Google бачить всі 115 сторінок.",
    relatedTerms: ["technical-seo", "robots-txt", "seo"],
    relatedService: "seo",
  },

  // === MARKETING (additional) ===
  {
    slug: "cpm",
    termUk: "CPM",
    termEn: "CPM (Cost Per Mille)",
    category: "business",
    shortDescription: "Вартість тисячі показів реклами — модель оплати в медійній рекламі.",
    fullDescription: `CPM (Cost Per Mille, від лат. mille = 1000) — модель оплати реклами, де ви платите за кожні 1000 показів банера або оголошення.\n\nКоли використовувати: підвищення впізнаваності бренду, охоплення широкої аудиторії. Мінус: ви платите за показ, незалежно від кліків та конверсій.\n\nПорівняння з CPC: CPM — за показ, CPC — за клік, CPA — за дію. Для performance-кампаній (продажі, ліди) CPC/CPA ефективніші. CPM підходить для brand awareness кампаній.`,
    example: "CPM = 50 грн означає, що 1000 показів вашого банера коштує 50 грн. Якщо CTR = 1%, то 10 кліків за 50 грн = 5 грн/клік.",
    relatedTerms: ["cpc", "ctr", "roi", "roas"],
    relatedService: "ads",
  },
  {
    slug: "cpa",
    termUk: "CPA",
    termEn: "CPA (Cost Per Action)",
    category: "business",
    shortDescription: "Вартість цільової дії — оплата за кожну конверсію: покупку, заявку, реєстрацію.",
    fullDescription: `CPA (Cost Per Action) — модель оплати реклами, де ви платите тільки за конкретну цільову дію: покупку, заявку, реєстрацію, дзвінок.\n\nЦе найбільш орієнтована на результат модель. Рекламна мережа оптимізує показ реклами для користувачів, що з найбільшою імовірністю здійснять цільову дію.\n\nДля бізнесу важливо: знати свій максимально допустимий CPA (вартість привернення клієнта). Якщо середній чек = 5000 грн, а маржа = 40%, то максимальний CPA = 2000 грн.`,
    example: "Рекламна кампанія привернула 20 лідів за 2000 грн = CPA = 100 грн/лід. Якщо 1 з 5 лідів стає клієнтом — вартість клієнта = 500 грн.",
    relatedTerms: ["cpc", "cpm", "roi", "conversion-rate"],
    relatedService: "ads",
  },
  {
    slug: "lead-magnet",
    termUk: "Лід-магніт",
    termEn: "Lead Magnet",
    category: "business",
    shortDescription: "Безкоштовний цінний матеріал, що надається в обмін на контакт (email) потенційного клієнта.",
    fullDescription: `Лід-магніт — безкоштовний контент або інструмент, що пропонується відвідувачу в обмін на його email або номер телефону.\n\nТипи: PDF-гайди та чек-листи, безкоштовні консультації, шаблони, онлайн-інструменти (як speed test), вебінари, пробні версії продукту.\n\nЧому це ефективно: більшість відвідувачів «холодні» — ще не готові купити. Лід-магніт починає відносини: відвідувач отримує цінність → залишає контакт → потрапляє в email-серію → поступово «прогрівається».`,
    example: "Codeworth пропонує безкоштовний «Чек-ліст запуску сайту» — відвідувач завантажує, залишає email, отримує корисну розсилку.",
    relatedTerms: ["lead", "sales-funnel", "conversion-rate", "a-b-testing"],
    relatedService: "email-marketing",
  },
  {
    slug: "content-marketing",
    termUk: "Контент-маркетинг",
    termEn: "Content Marketing",
    category: "business",
    shortDescription: "Залучення аудиторії через корисний контент — статті, відео, подкасти — замість прямої реклами.",
    fullDescription: `Контент-маркетинг — стратегія залучення та утримання цільової аудиторії через створення та публікацію корисного, релевантного контенту.\n\nФормати: блог, YouTube, подкаст, Instagram/TikTok, email-розсилка, whitepaper, кейс-стаді.\n\nДля МСБ: блог на сайті — найефективніший контент-маркетинг з точки зору ROI. SEO-статті приносять органічний трафік місяцями без додаткових витрат. Codeworth використовує блог як основний канал залучення: 66 статей + SEO-страниці забезпечують стабільний трафік.`,
    example: "Стаття «Скільки коштує сайт для ресторану» привертає 500 відвідувачів/місяць безкоштовно — замість того щоб витрачати 1000 грн/міс на рекламу.",
    relatedTerms: ["seo", "organic-traffic", "lead-magnet", "sales-funnel"],
    relatedService: "smm",
  },
  {
    slug: "smm",
    termUk: "SMM",
    termEn: "SMM (Social Media Marketing)",
    category: "business",
    shortDescription: "Маркетинг у соціальних мережах — контент, реклама та взаємодія з аудиторією.",
    fullDescription: `SMM (Social Media Marketing) — комплекс дій у соціальних мережах: контент-план, регулярні публікації, взаємодія з підписниками, таргетована реклама.\n\nОсновні платформи для України: Instagram (B2C, особливо краса, їжа, мода), Facebook (B2B та старша аудиторія), TikTok (молодь, вірусний контент), LinkedIn (B2B, HR), Telegram (контент-канали).\n\nSMM + SEO = найсильніша органічна пара: SEO приводить холодну аудиторію, SMM «прогріває» та утримує.`,
    example: "Instagram-профіль кав'ярні з 3 постами/тиждень + Stories = 500 підписників за 3 місяці → 20% збільшення офлайн-відвідувань.",
    relatedTerms: ["content-marketing", "retargeting", "lead"],
    relatedService: "smm",
  },
  {
    slug: "email-marketing",
    termUk: "Email-маркетинг",
    termEn: "Email Marketing",
    category: "business",
    shortDescription: "Комунікація з клієнтами через email: розсилки, автолисти, транзакційні листи.",
    fullDescription: `Email-маркетинг — маркетинговий канал з найвищим ROI серед digital-інструментів: в середньому $42 на кожен $1 витрат.\n\nТипи: welcome-серія (ознайомлення нових підписників), регулярна розсилка (новини, контент), тригерні листи (після покупки, після покинутого кошика), реактивація (листи неактивним підписникам).\n\nДля МСБ: навіть база з 500 email-підписників при правильному використанні може генерувати 50+ заявок на місяць.`,
    example: "Інтернет-магазин надсилає «покинутий кошик» email через 1 годину → 15% повертаються і оформляють замовлення.",
    relatedTerms: ["lead-magnet", "sales-funnel", "conversion-rate"],
    relatedService: "email-marketing",
  },
  {
    slug: "landing-page",
    termUk: "Лендінг",
    termEn: "Landing Page",
    category: "business",
    shortDescription: "Цільова сторінка, оптимізована для одного конкретного CTA: продажу, заявки або реєстрації.",
    fullDescription: `Лендінг (Landing Page) — окрема сторінка, розроблена для конвертації відвідувача в ліда або клієнта. На відміну від звичайного сайту — мінімум відволікаючих елементів, один чіткий CTA.\n\nСтруктура класичного лендінгу: Hero (заголовок + CTA), Переваги, Як це працює, Відгуки, FAQ, CTA знизу.\n\nВикористовується для: рекламних кампаній (Google Ads, Facebook Ads), запуску нового продукту, промо-акцій. Конверсія хорошого лендінгу — 3–10%, середнього сайту — 1–3%.`,
    example: "Рекламна кампанія «Лендінг для ресторану — від 5900 грн» веде на окремий лендінг з прикладами та формою заявки — конверсія 7%.",
    relatedTerms: ["cta", "conversion-rate", "a-b-testing", "lead"],
    relatedService: "landing",
  },

  // === UX/UI (additional) ===
  {
    slug: "heatmap",
    termUk: "Теплова карта",
    termEn: "Heatmap",
    category: "business",
    shortDescription: "Візуалізація поведінки користувачів: де клікають, скролять та зупиняються на сторінці.",
    fullDescription: `Теплова карта (Heatmap) — інструмент аналітики, що показує поведінку користувачів через кольорову карту: «гарячі» зони (червоний) — де найбільше кліків/уваги, «холодні» (синій) — де мало активності.\n\nТипи: Click map (де клікають), Scroll map (як далеко скролять), Move map (де рухається курсор).\n\nІнструменти: Hotjar, Microsoft Clarity (безкоштовний), FullStory. Допомагають без опитувань зрозуміти, що привертає увагу та де користувачі «застрягають».`,
    example: "Heatmap показав, що 70% відвідувачів не скролять нижче першого екрану → CTA перенесли нагору → конверсія зросла на 25%.",
    relatedTerms: ["ux", "a-b-testing", "conversion-rate", "google-analytics"],
    relatedService: "design",
  },
  {
    slug: "prototype",
    termUk: "Прототип",
    termEn: "Prototype",
    category: "business",
    shortDescription: "Інтерактивний макет сайту або додатку для тестування до початку розробки.",
    fullDescription: `Прототип — інтерактивний макет інтерфейсу, що симулює поведінку кінцевого продукту без написання коду.\n\nЕтапи: Low-fidelity («кістяк» — блоки без деталей) → High-fidelity (деталізований, клікабельний макет у Figma).\n\nЧому це важливо: виправити помилку в прототипі коштує в 100 разів дешевше, ніж після розробки. Прототипування дозволяє тестувати UX з реальними користувачами на ранній стадії.\n\nCodeworth розробляє Figma-прототипи перед кожним проєктом.`,
    example: "Клієнт тестує прототип на 5 реальних користувачах → виявляє, що кнопка «Замовити» не очевидна → виправляється до розробки безкоштовно.",
    relatedTerms: ["wireframe", "ux", "ui", "design-system"],
    relatedService: "design",
  },
  {
    slug: "usability",
    termUk: "Юзабіліті",
    termEn: "Usability",
    category: "business",
    shortDescription: "Зручність використання — наскільки легко та ефективно користувачі досягають цілей на сайті.",
    fullDescription: `Usability (Юзабіліті) — міра того, наскільки продукт легкий, ефективний та задовільний у використанні цільовою аудиторією.\n\nКомпоненти за Nielsen: ефективність (чи досягають мети?), запам'ятовуваність (чи пам'ятають після перерви?), помилки (скільки помилок роблять?), задоволення (чи подобається?), засвоюваність (як швидко навчаються?).\n\nЮзабіліті-тестування: 5 користувачів виявляють 80% проблем інтерфейсу (правило Нільсена).`,
    example: "Тест з 5 користувачами виявив, що ніхто не знайшов кнопку «Кошик» → перенесли у видиме місце → конверсія +18%.",
    relatedTerms: ["ux", "accessibility", "wireframe", "heatmap"],
    relatedService: "design",
  },
  {
    slug: "information-architecture",
    termUk: "Інформаційна архітектура",
    termEn: "Information Architecture (IA)",
    category: "business",
    shortDescription: "Організація та структурування контенту сайту для зручної навігації.",
    fullDescription: `Інформаційна архітектура (IA) — дисципліна організації та навігаційного структурування інформації для ефективного пошуку та розуміння.\n\nДля сайту: як організовані пункти меню, ієрархія сторінок, категорії каталогу, система хлібних крихт. Хороша IA = користувач знаходить потрібне за 3 кліки.\n\nПроблеми поганої IA: користувачі губляться, не можуть знайти потрібне, показник відмов зростає, конверсія падає.`,
    example: "Інтернет-магазин з 500 товарами: без ІА — один список. З IA — категорії → підкатегорії → товар. Час пошуку скорочується з 5 хв до 30 сек.",
    relatedTerms: ["ux", "wireframe", "usability", "cta"],
    relatedService: "design",
  },

  // === HOSTING (additional) ===
  {
    slug: "dns",
    termUk: "DNS",
    termEn: "DNS (Domain Name System)",
    category: "infrastructure",
    shortDescription: "Система доменних імен — «телефонна книга» інтернету, що перетворює назви на IP-адреси.",
    fullDescription: `DNS (Domain Name System) — розподілена система, що перетворює доменні імена (codeworth.uk) на IP-адреси (147.182.145.87), за якими знаходяться сервери.\n\nТипи DNS-записів: A (домен → IPv4), AAAA (домен → IPv6), CNAME (аліас домену), MX (поштові сервери), TXT (верифікація, SPF для email).\n\nShop DNS-зміни до 48 годин (TTL). Для швидкого деплою встановлюйте короткий TTL (300 сек) заздалегідь.`,
    example: "Коли ви вводите codeworth.uk — DNS-сервер повертає IP-адресу Vercel → браузер з'єднується з сервером.",
    relatedTerms: ["hosting", "ssl", "cdn"],
    relatedService: "machine-learning",
  },
  {
    slug: "serverless",
    termUk: "Serverless",
    termEn: "Serverless",
    category: "infrastructure",
    shortDescription: "Хмарна архітектура, де код виконується за запитом без управління серверами.",
    fullDescription: `Serverless (безсерверна архітектура) — модель, де розробник пише функції, а хмарний провайдер автоматично запускає їх при запиті та масштабує без ручного управління серверами.\n\nПереваги: платиш тільки за фактичне виконання (не за простій), автоматичне масштабування, немає адміністрування серверів. Недоліки: «холодний старт» (перший запит повільніший), обмеження на тривалість виконання.\n\nPlatforms: AWS Lambda, Vercel Functions, Cloudflare Workers. Next.js API routes → автоматично serverless functions на Vercel.`,
    example: "Vercel Functions виконують Next.js API routes без окремого Node.js сервера: 0 трафіку → $0, 1M запитів → автоматичне масштабування.",
    relatedTerms: ["vercel", "cdn", "cicd"],
    relatedService: "machine-learning",
  },
  {
    slug: "cloudflare",
    termUk: "Cloudflare",
    termEn: "Cloudflare",
    category: "infrastructure",
    shortDescription: "CDN, DNS та захист від DDoS — найпопулярніша мережева інфраструктура для сайтів.",
    fullDescription: `Cloudflare — глобальна мережа (CDN + DNS + безпека), що проксує трафік до вашого сервера через 300+ дата-центрів по всьому світу.\n\nФункції: CDN (прискорення), DNS-хостинг (швидкий та надійний), DDoS-захист (автоматичний), Web Application Firewall (WAF), мінімізація JS/CSS/HTML, HTTP/3.\n\nДля бізнесу: безкоштовний план Cloudflare значно прискорює сайт (особливо для міжнародного трафіку) та захищає від атак без додаткових витрат.`,
    example: "Сайт на хостингу в Україні + Cloudflare CDN = швидке завантаження для відвідувачів з Франції або США завдяки кешу на локальному edge-вузлі.",
    relatedTerms: ["cdn", "ssl", "dns", "hosting"],
    relatedService: "machine-learning",
  },
  {
    slug: "edge-network",
    termUk: "Edge Network",
    termEn: "Edge Network",
    category: "infrastructure",
    shortDescription: "Мережа вузлів, що роздають контент з географічно найближчих до користувача серверів.",
    fullDescription: `Edge Network — розподілена мережа серверів (PoP — Points of Presence) розташованих в різних регіонах світу, що обробляють запити максимально близько до кінцевого користувача.\n\nПеревага: замість одного сервера в Польщі — 100+ вузлів по всьому світу. Відвідувач з Бразилії отримує контент з бразильського вузла, а не чекає відповіді з Варшави.\n\nVercel Edge Network: 90+ регіонів → TTFB < 50мс для більшості користувачів світу. Vercel Edge Functions дозволяють виконувати код на рівні CDN.`,
    example: "Сайт на Vercel з TTFB < 50мс для відвідувачів з Токіо, Сан-Франциско та Варшави — завдяки Edge Network.",
    relatedTerms: ["cdn", "vercel", "ttfb", "serverless"],
    relatedService: "machine-learning",
  },

  // === ANALYTICS (additional) ===
  {
    slug: "google-search-console",
    termUk: "Google Search Console",
    termEn: "Google Search Console (GSC)",
    category: "data",
    shortDescription: "Безкоштовний інструмент Google для моніторингу ефективності сайту в пошуку.",
    fullDescription: `Google Search Console (GSC) — безкоштовний сервіс Google для власників сайтів: показує, як Google бачить ваш сайт, які запити приводять відвідувачів, які сторінки проіндексовані.\n\nКлючові звіти: Performance (запити, кліки, CTR, позиції), Coverage (помилки індексації), Core Web Vitals, Mobile Usability, Rich Results.\n\nДля SEO це інструмент №1: показує реальні дані з Google SERP. GA4 показує поведінку на сайті, GSC — що відбувається до кліку.`,
    example: "GSC показав: запит «веб-студія Київ» → позиція 15, CTR 1.2%. Оптимізація title/description підняла CTR до 3.8% → +120 кліків/місяць безкоштовно.",
    relatedTerms: ["google-analytics", "seo", "ctr", "organic-traffic"],
    relatedService: "seo",
  },
  {
    slug: "google-tag-manager",
    termUk: "Google Tag Manager",
    termEn: "Google Tag Manager (GTM)",
    category: "data",
    shortDescription: "Безкоштовна система управління тегами — додайте Analytics, Pixel, конверсії без програмістів.",
    fullDescription: `Google Tag Manager (GTM) — безкоштовна система, що дозволяє керувати маркетинговими тегами (аналітика, реклама, пікселі) через веб-інтерфейс без змін у коді сайту.\n\nЧерез GTM підключаються: Google Analytics 4, Facebook Pixel, Google Ads конверсії, Hotjar, LinkedIn Insight Tag, Custom Events.\n\nДля бізнесу: маркетолог самостійно додає нові теги без виклику розробника → швидша реакція на маркетингові потреби.`,
    example: "Маркетолог додає Facebook Pixel через GTM за 10 хвилин без залучення розробника — і наступного дня запускає ретаргетинг.",
    relatedTerms: ["google-analytics", "retargeting", "utm"],
    relatedService: "ads",
  },
  {
    slug: "event-tracking",
    termUk: "Відстеження подій",
    termEn: "Event Tracking",
    category: "data",
    shortDescription: "Запис конкретних дій користувачів: кліки на кнопки, заповнення форм, скролінг.",
    fullDescription: `Event Tracking — налаштування аналітики для відстеження конкретних дій користувачів на сайті: кліки на CTA-кнопки, заповнення форм, перегляд відео, скролінг до певного блоку.\n\nВ GA4: всі взаємодії — це «події». Деякі збираються автоматично (page_view, scroll), інші потрібно налаштовувати: form_submit, button_click, add_to_cart.\n\nДля бізнесу: без Event Tracking ви бачите лише «відвідувачів». З ним — що вони роблять, де зупиняються, що конвертує.`,
    example: "Подія 'form_submit' показала, що 70% відвідувачів починають заповнювати форму, але тільки 30% надсилають → проблема в полі «Телефон» → зробили опційним → конверсія +15%.",
    relatedTerms: ["google-analytics", "google-tag-manager", "conversion-rate"],
    relatedService: "ads",
  },
  {
    slug: "kpi",
    termUk: "KPI",
    termEn: "KPI (Key Performance Indicator)",
    category: "data",
    shortDescription: "Ключовий показник ефективності — вимірювана мета для оцінки успіху бізнесу або кампанії.",
    fullDescription: `KPI (Key Performance Indicator) — конкретні числові показники, що відображають прогрес у досягненні бізнес-цілей.\n\nДля веб-студії: кількість нових лідів/місяць, конверсія лендінгу (%), середній чек, NPS (задоволеність клієнтів). Для e-commerce: виручка, конверсія в покупку, LTV (довічна цінність клієнта), CAC (вартість залучення клієнта).\n\nПравило SMART для KPI: конкретний, вимірюваний, досяжний, релевантний, обмежений у часі.`,
    example: "KPI для SEO-кампанії: +30% органічного трафіку за 6 місяців. KPI для лендінгу: конверсія ≥ 4%. Без KPI — немає вимірювання результату.",
    relatedTerms: ["roi", "conversion-rate", "google-analytics", "roas"],
    relatedService: "ads",
  },
  {
    slug: "crm",
    termUk: "CRM",
    termEn: "CRM (Customer Relationship Management)",
    category: "data",
    shortDescription: "Система управління відносинами з клієнтами — база лідів, угод та комунікацій.",
    fullDescription: `CRM (Customer Relationship Management) — програмне забезпечення для управління взаємодіями з клієнтами та потенційними покупцями: база контактів, воронка продажів, задачі, листування, аналітика.\n\nПопулярні: HubSpot (безкоштовна базова версія), Pipedrive, Zoho CRM, KeyCRM (для України), Bitrix24.\n\nДля бізнесу: без CRM ліди «губляться», менеджери забувають передзвонити, немає аналітики по воронці. З CRM: кожен контакт відстежений, конверсія зростає на 25–40%.`,
    example: "Без CRM менеджер забув передзвонити 3 лідам → 3 втрачені угоди. CRM відправила автоматичне нагадування → 2 угоди закриті.",
    relatedTerms: ["lead", "sales-funnel", "conversion-rate", "kpi"],
    relatedService: "crm",
  },
  {
    slug: "session-recording",
    termUk: "Запис сесій",
    termEn: "Session Recording",
    category: "data",
    shortDescription: "Відеозапис поведінки користувачів на сайті — як миша рухається, де клікають, де зупиняються.",
    fullDescription: `Session Recording (запис сесій) — функція аналітики, що записує дії окремих користувачів: рухи миші, кліки, скролінг, введення тексту.\n\nІнструменти: Hotjar, Microsoft Clarity (безкоштовно), FullStory, LogRocket.\n\nЯк використовувати: переглядати записи сесій, де конверсія не відбулась → розуміти де проблеми UX. Особливо цінно для e-commerce: чому кошик покинутий? Де помилки форми?`,
    example: "Записи сесій показали: 40% користувачів натискали кнопку, яка не реагувала на мобільному → CSS-баг виправлений → мобільна конверсія +22%.",
    relatedTerms: ["heatmap", "ux", "a-b-testing", "bounce-rate"],
    relatedService: "design",
  },

  // === AI (additional) ===
  {
    slug: "chatbot",
    termUk: "Чатбот",
    termEn: "Chatbot",
    category: "ai",
    shortDescription: "Автоматизована програма для спілкування з відвідувачами сайту у режимі чату.",
    fullDescription: `Чатбот — програмне рішення для автоматизації спілкування з клієнтами через текстовий або голосовий інтерфейс.\n\nТипи: rule-based (відповідає за сценарієм, обмежений), AI-powered (GPT/Claude, розуміє довільні питання та відповідає природно), hybrid (сценарій + AI fallback).\n\nДля бізнесу: обробляє типові запити 24/7 без менеджера, кваліфікує ліди, бронює зустрічі, відповідає на FAQ. ROI: одна людина обробляє 50 чатів/день, чатбот — 50 000 одночасно.`,
    example: "Codeworth FloatingChat на сайті відповідає на 6 типових питань (ціни, терміни, технології) без менеджера — зменшує кількість «порожніх» дзвінків.",
    relatedTerms: ["llm", "rag", "generative-ai"],
    relatedService: "chatbots",
    relatedNichePage: "/ai/ecommerce"
  },
  {
    slug: "prompt-engineering",
    termUk: "Промпт-інжиніринг",
    termEn: "Prompt Engineering",
    category: "ai",
    shortDescription: "Мистецтво складання ефективних запитів до AI для отримання якісних результатів.",
    fullDescription: `Промпт-інжиніринг — дисципліна розробки оптимальних запитів (prompts) до AI-моделей для отримання точних, корисних та безпечних відповідей.\n\nТехніки: Chain-of-Thought (прохання «думати крок за кроком»), Few-shot prompting (надання прикладів), Role prompting (задати роль: «ти — досвідчений SEO-копірайтер»), Constraints (обмеження: «не більше 150 слів», «тільки факти»).\n\nДля бізнесу: правильні промпти дозволяють автоматизувати: написання описів товарів, генерацію SEO-мета-тегів, складання відповідей на відгуки, переклади.`,
    example: "Базовий промпт: «Напиши текст для салону краси» → загальний результат. Правильний: «Ти — маркетолог. Напиши 100-слівний текст для Instagram про весняний догляд за волоссям, звертаючись до жінок 25–40 років, з CTA «Запишись зараз»» → точний результат.",
    relatedTerms: ["llm", "generative-ai", "rag"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/ai/marketing"
  },

  // === Additional terms to reach 100+ ===
  {
    slug: "git",
    termUk: "Git",
    termEn: "Git",
    category: "business",
    shortDescription: "Розподілена система контролю версій — відстежує зміни в коді та дозволяє колаборацію.",
    fullDescription: `Git — безкоштовна розподілена система контролю версій, що відстежує зміни у файлах і дозволяє командам розробників ефективно співпрацювати.\n\nОсновні концепції: commit (зафіксована зміна), branch (гілка для окремої функції), merge (об'єднання гілок), pull request (запит на злиття змін). GitHub/GitLab/Bitbucket — хмарні платформи для зберігання Git-репозиторіїв.\n\nБез Git: «Фінал-ФІНАЛ-2-правки-ТОЧНО-ФІНАЛ.zip». З Git: повна історія змін, можливість повернутись до будь-якої версії, паралельна розробка без конфліктів.`,
    example: "Розробник ламає форму в «feature» гілці → main гілка залишається стабільною → баг виправлений в окремій гілці без впливу на продакшн.",
    relatedTerms: ["cicd", "docker", "next-js"],
    relatedService: "machine-learning",
  },
  {
    slug: "brand-awareness",
    termUk: "Впізнаваність бренду",
    termEn: "Brand Awareness",
    category: "business",
    shortDescription: "Ступінь розпізнавання вашого бренду цільовою аудиторією.",
    fullDescription: `Brand Awareness — ступінь, до якого потенційні клієнти впізнають та пам'ятають ваш бренд. Це перший етап маркетингової воронки: «не знають» → «знають» → «розглядають» → «купують».\n\nЯк вимірювати: Brand Search (кількість брендових запитів у Google), опитування, Direct-трафік (заходять напряму, знаючи бренд), Share of Voice в соцмережах.\n\nДля МСБ: brand awareness будується через контент-маркетинг, SMM, PR-публікації, партнерства. Висока впізнаваність знижує CAC та збільшує конверсію: люди купують у тих, кого знають.`,
    example: "Codeworth публікує 2+ статті/тиждень та активна в LinkedIn → за 6 місяців кількість брендових запитів «Codeworth» зросла з 20 до 200/місяць.",
    relatedTerms: ["smm", "content-marketing", "retargeting"],
    relatedService: "smm",
  },
  {
    slug: "user-testing",
    termUk: "Юзер-тестування",
    termEn: "User Testing",
    category: "business",
    shortDescription: "Тестування інтерфейсу з реальними користувачами для виявлення проблем юзабіліті.",
    fullDescription: `User Testing (юзер-тестування) — якісний дослідницький метод, де реальні представники цільової аудиторії виконують завдання на сайті під спостереженням.\n\nМетоди: модерований (тестувальник поруч), немодерований (віддалено через Maze/UserTesting), A/B-тести (кількісний), 5-секундний тест (перше враження).\n\nПравило Нільсена: 5 користувачів виявляють 80% проблем юзабіліті. Не потрібні десятки учасників — 5 сесій дають достатньо інсайтів для першої ітерації покращень.`,
    example: "Юзер-тестування форми замовлення: 4 з 5 учасників не розуміли, що поле «ІПН» обов'язкове → додали зірочку та підказку → конверсія +12%.",
    relatedTerms: ["usability", "ux", "prototype", "wireframe"],
    relatedService: "design",
  },
  {
    slug: "nginx",
    termUk: "Nginx",
    termEn: "Nginx",
    category: "infrastructure",
    shortDescription: "Потужний веб-сервер і reverse proxy — стандарт для production Node.js/Next.js серверів.",
    fullDescription: `Nginx (вимовляється «ен-джинкс») — high-performance веб-сервер з відкритим кодом, що широко використовується як: веб-сервер для статичних файлів, reverse proxy (перенаправляє трафік до Node.js), load balancer (розподіляє навантаження), SSL termination.\n\nДля VPS/dedicated серверів: Nginx обробляє 10 000+ одночасних з'єднань при мінімальному споживанні RAM (~2-5 МБ).\n\nПорівняння: Apache — старший, Nginx — швидший для статики та реверс-проксі. На Vercel Nginx не потрібен — він вбудований в платформу.`,
    example: "VPS-сервер: запити → Nginx (порт 80/443) → Node.js (порт 3000). Nginx обробляє SSL, кешування статики та стискання, Node.js — бізнес-логіку.",
    relatedTerms: ["vps", "ssl", "cdn", "serverless"],
    relatedService: "machine-learning",
  },
  {
    slug: "ecommerce",
    termUk: "E-commerce",
    termEn: "E-commerce",
    category: "business",
    shortDescription: "Електронна комерція — продаж товарів або послуг через інтернет.",
    fullDescription: `E-commerce (електронна комерція) — купівля-продаж товарів, послуг та цифрових продуктів через інтернет. Охоплює: інтернет-магазини, маркетплейси (Prom.ua, Rozetka), D2C бренди, цифрові продукти (курси, SaaS), послуги онлайн.\n\nМоделі: B2C (бізнес → споживач), B2B (бізнес → бізнес), C2C (Olx, Etsy), D2C (виробник → покупець напряму).\n\nДля МСБ в Україні: власний інтернет-магазин дає вищу маржу ніж маркетплейс, повний контроль над даними клієнтів і більше інструментів для лояльності. Codeworth розробляє e-commerce на Next.js + Stripe/LiqPay.`,
    example: "Кондитерська переходить з Instagram (DM-замовлення) на власний інтернет-магазин → автоматична обробка замовлень, онлайн-оплата, +40% до виручки.",
    relatedTerms: ["conversion-rate", "cpa", "roi", "sales-funnel"],
    relatedService: "ecommerce",
  },

  // === ML Terms ===
  {
    slug: "machine-learning",
    termUk: "Машинне навчання",
    termEn: "Machine Learning",
    category: "ai",
    shortDescription: "Підрозділ AI, де алгоритми навчаються на даних — без явного програмування кожного правила.",
    fullDescription: `Machine Learning (ML) — галузь штучного інтелекту, де алгоритми автоматично виявляють закономірності в даних і покращують свою точність з досвідом, без прямого програмування.\n\nОсновні типи: Supervised Learning (навчання з учителем: класифікація, регресія), Unsupervised Learning (кластеризація, anomaly detection), Reinforcement Learning (навчання через систему винагород).\n\nАлгоритми: Decision Trees, Random Forest, XGBoost, Linear/Logistic Regression, SVM, K-Means, нейронні мережі.\n\nДля бізнесу ML вирішує: прогноз попиту, виявлення шахрайства, рекомендаційні системи, предиктивне обслуговування обладнання, churn prediction.`,
    example: "Банк навчає ML-модель на 2 роках транзакцій → модель автоматично блокує підозрілі платежі з точністю 99.3%, замінюючи 5 аналітиків.",
    relatedTerms: ["llm", "neural-network", "mlops", "feature-engineering"],
    relatedService: "machine-learning",
    relatedBlogPost: "ml-churn-prediction-guide",
    relatedNichePage: "/ml/saas"
  },
  {
    slug: "mlops",
    termUk: "MLOps",
    termEn: "MLOps (Machine Learning Operations)",
    category: "ai",
    shortDescription: "Практики та інструменти для надійного деплою, моніторингу та підтримки ML-моделей у продакшні.",
    fullDescription: `MLOps (Machine Learning Operations) — набір практик, що поєднує розробку ML-моделей з їх надійним і масштабованим розгортанням у виробничому середовищі.\n\nПроблема без MLOps: 85% ML-проєктів залишаються в Jupyter Notebook і ніколи не потрапляють у продакшн. Причини: неможливо відтворити результати, модель деградує через data drift, немає моніторингу.\n\nКлючові компоненти: версіонування моделей (MLflow, W&B), CI/CD для ML (GitHub Actions + тести на accuracy), feature store, data drift моніторинг (Evidently AI), автоматичне перенавчання.\n\nСтек для старту: MLflow + DVC + FastAPI + Docker + GitHub Actions.`,
    example: "Churn prediction модель через 3 місяці після деплою знизила точність з AUC 0.87 до 0.71 через data drift. MLOps-пайплайн з Evidently виявив проблему і автоматично запустив перенавчання.",
    relatedTerms: ["machine-learning", "cicd", "docker", "feature-engineering"],
    relatedService: "machine-learning",
    relatedBlogPost: "mlops-production-guide",
    relatedNichePage: "/ml/saas"
  },
  {
    slug: "churn-prediction",
    termUk: "Прогнозування відтоку",
    termEn: "Churn Prediction",
    category: "ai",
    shortDescription: "ML-модель, що передбачає ймовірність відходу клієнта до того, як він це зробить.",
    fullDescription: `Churn Prediction — задача машинного навчання (класифікація), де модель аналізує поведінкові ознаки клієнта і повертає ймовірність його відтоку у заданому часовому вікні (30/60/90 днів).\n\nВхідні ознаки: частота логінів, кількість дій, NPS, платіжна активність, тривалість підписки, підтримкові звернення, RFM-метрики.\n\nАлгоритми: XGBoost (найпопулярніший для табличних даних), Random Forest, Logistic Regression (для інтерпретованості).\n\nКлючова метрика — Recall: краще помилково позначити лояльних клієнтів як ризикових, ніж пропустити реальний відтік. Типовий Recall для хороших моделей: 75–85%.\n\nROI: зниження місячного churn на 1% для SaaS з 1000 клієнтів і ARPU £50 = £500/місяць → окупність за 2–4 місяці.`,
    example: "SaaS-платформа: клієнт зайшов тільки 1 раз за 2 тижні (зазвичай 8–10 разів) → churn score 0.89 → автоматичний Slack-alert менеджеру → retention-дзвінок → клієнт залишився.",
    relatedTerms: ["machine-learning", "mlops", "feature-engineering"],
    relatedService: "machine-learning",
    relatedBlogPost: "ml-churn-prediction-guide",
    relatedNichePage: "/ml/saas"
  },
  {
    slug: "feature-engineering",
    termUk: "Інжиніринг ознак",
    termEn: "Feature Engineering",
    category: "ai",
    shortDescription: "Процес створення та відбору найінформативніших ознак для навчання ML-моделі.",
    fullDescription: `Feature Engineering — мистецтво і наука перетворення сирих даних на ознаки (features), що дозволяють ML-моделі краще навчатися і робити точніші передбачення.\n\nТехніки: One-hot encoding (категоріальні змінні → числові), нормалізація (min-max, z-score), binning (неперервні → категоріальні), interaction features (добуток двох ознак), rolling averages (середнє за 7/30 днів), lag features (значення 1 тиждень тому).\n\nДля churn prediction: ознака «зниження активності за останні 7 днів порівняно з попередніми 30» часто важливіша за абсолютне значення активності.\n\nAutomated feature engineering: Featuretools, AutoML-рішення (AutoGluon, H2O) автоматизують цей процес, але ручний feature engineering від domain expert дає вищу точність.`,
    example: "Сирі дані: timestamp кожної покупки. Feature engineering: кількість покупок за 30 днів, середній чек, days_since_last_purchase, кількість категорій → модель стає на 12% точнішою.",
    relatedTerms: ["machine-learning", "mlops", "churn-prediction"],
    relatedService: "machine-learning",
    relatedNichePage: "/ml/saas"
  },

  // === AI Terms ===
  {
    slug: "computer-vision",
    termUk: "Комп'ютерний зір",
    termEn: "Computer Vision",
    category: "ai",
    shortDescription: "Галузь AI, що дозволяє комп'ютерам «бачити» та розуміти зображення та відео.",
    fullDescription: `Computer Vision (CV) — підрозділ штучного інтелекту, що розробляє алгоритми для автоматичного аналізу та розуміння візуальної інформації: фото, відео, 3D-сканів.\n\nОсновні задачі: Image Classification (класифікація зображень), Object Detection (виявлення об'єктів + bounding boxes), Semantic Segmentation (попіксельна класифікація), Pose Estimation (поза тіла), OCR (розпізнавання тексту).\n\nКлючові моделі та інструменти: YOLO v8 (real-time object detection), ResNet/EfficientNet (класифікація), SAM (Segment Anything, Meta), OpenCV (бібліотека обробки зображень).\n\nБізнес-застосування: контроль якості на виробництві, аналіз полиць у рітейлі, підрахунок відвідувачів, розпізнавання документів, медична діагностика.`,
    example: "Завод: камера над конвеєром + YOLO-модель → автоматичне виявлення дефектів з точністю 98.5% замість ручного контролю → окупність за 4 місяці.",
    relatedTerms: ["llm", "neural-network", "machine-learning", "generative-ai"],
    relatedService: "artificial-intelligence",
    relatedBlogPost: "ai-computer-vision-business",
    relatedNichePage: "/ai/manufacturing"
  },
  {
    slug: "neural-network",
    termUk: "Нейронна мережа",
    termEn: "Neural Network",
    category: "ai",
    shortDescription: "Математична модель, натхненна будовою людського мозку, — основа сучасного глибокого навчання.",
    fullDescription: `Нейронна мережа (Neural Network) — обчислювальна модель, натхненна будовою нейронів людського мозку. Складається з шарів (layers) штучних нейронів: вхідний шар (input layer), приховані шари (hidden layers), вихідний шар (output layer).\n\nКожен нейрон отримує числові сигнали, множить їх на ваги (weights), сумує та передає через функцію активації. Навчання — оптимізація ваг методом зворотного поширення помилки (backpropagation) та градієнтного спуску.\n\nАрхітектури: CNN (для зображень), RNN/LSTM (для послідовностей, часових рядів), Transformer (LLM, BERT, GPT), GAN (генерація зображень).\n\nГлибоке навчання (Deep Learning) = нейронні мережі з багатьма прихованими шарами. Потребує GPU та великих датасетів, але досягає надлюдської точності у CV, NLP, синтезі мовлення.`,
    example: "GPT-4 — Transformer-нейронна мережа з ~1.8 трильйонами параметрів (ваг). Кожна відповідь — результат мільярдів операцій множення та додавання.",
    relatedTerms: ["llm", "machine-learning", "computer-vision", "generative-ai"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/ml/manufacturing"
  },

  // === AI / ML — UK + UA Dual Market Terms (2026-05-02) ===
  {
    slug: "rag",
    termUk: "RAG (Retrieval-Augmented Generation)",
    termEn: "RAG (Retrieval-Augmented Generation)",
    category: "ai",
    shortDescription: "Архітектура AI, де LLM відповідає не з пам'яті, а шукає відповідь у вашій конкретній базі знань.",
    fullDescription: `RAG — Retrieval-Augmented Generation — це архітектура, яка поєднує дві системи: vector search (пошук по семантичній схожості) та LLM (генерація відповіді). Замість того щоб GPT «вигадував» відповідь зі своїх тренувальних даних, RAG спочатку шукає релевантні документи у вашій базі знань і підставляє їх як контекст у промпт.\n\nЯк працює:\n1. Ваші документи (PDF, FAQ, сторінки сайту) розбиваються на чанки і конвертуються в vector embeddings\n2. Вектори зберігаються у Vector DB (Qdrant, Pinecone, Weaviate)\n3. Питання користувача → семантичний пошук → топ-K релевантних чанків → GPT-4o генерує відповідь на основі знайденого контексту\n\nПереваги над базовим LLM: відповіді з посиланнями на джерела, відсутність галюцинацій за межами бази, можливість оновлювати базу знань без перенавчання моделі.\n\nРАГ використовується для: корпоративних knowledge base, чат-ботів підтримки, медичних AI-асистентів, юридичних систем.`,
    example: "Юридична фірма завантажила 500 договорів → RAG-бот відповідає на питання 'яка норма пені у нашому стандартному договорі?' з точним цитуванням пункту, а не вигаданою відповіддю.",
    relatedTerms: ["llm", "prompt-engineering", "chatbot", "machine-learning"],
    relatedService: "artificial-intelligence",
    relatedBlogPost: "ai-bilingual-chatbot-dual-market",
    relatedNichePage: "/ai/ecommerce"
  },
  {
    slug: "avm",
    termUk: "AVM — Автоматична Оцінка Нерухомості",
    termEn: "AVM (Automated Valuation Model)",
    category: "ai",
    shortDescription: "ML-модель, що оцінює вартість нерухомості автоматично за сотнями ознак — без виїзду оцінщика.",
    fullDescription: `AVM (Automated Valuation Model) — система машинного навчання для автоматичної оцінки вартості нерухомості. Замінює або доповнює ручну оцінку сертифікованого оцінщика, скорочуючи час з 3–5 днів до секунд.\n\nАрхітектура: зазвичай XGBoost або LightGBM ensemble на 40–80 ознаках:\n- Фізичні характеристики об'єкта: площа, поверх, рік будівлі, стан, клас будинку\n- GIS-ознаки: відстань до метро, центру міста, парків, шкіл, лікарень (PostGIS розрахунки)\n- Comparable sales: ціни схожих об'єктів у радіусі 500м–1км за останні 6–12 місяців\n- Ринкові індикатори: тренд цін у районі, індекс ліквідності, crime rate\n\nМетрики якості: MAPE (середня абсолютна відсоткова похибка). Хороший AVM: MAPE 3–6%. Для порівняння, ручна оцінка: 8–18% міжоцінювальна варіативність.\n\nВикористовується: іпотечне кредитування (попередня оцінка застави), агентства нерухомості, proptech-платформи, страхування.\n\nUK-специфіка: Land Registry дані (публічні продажі), EPC ratings (енергоефективність впливає на ціну), RICS-сумісність для використання банками.`,
    example: "Банк налаштував AVM для попередньої іпотечної оцінки: клієнт вводить адресу → за 3 секунди отримує оцінну вартість з довірчим інтервалом → якщо запитувана сума < 80% AVM — автоматичне схвалення без виїзду оцінщика.",
    relatedTerms: ["machine-learning", "feature-engineering"],
    relatedService: "machine-learning",
    relatedBlogPost: "ml-property-valuation-avm",
    relatedNichePage: "/ml/real-estate"
  },
  {
    slug: "ndvi",
    termUk: "NDVI — Індекс вегетації",
    termEn: "NDVI (Normalised Difference Vegetation Index)",
    category: "ai",
    shortDescription: "Супутниковий показник здоров'я рослинності на основі відбиття червоного та ближнього інфрачервоного світла.",
    fullDescription: `NDVI (Normalised Difference Vegetation Index) — стандартизований показник, що вимірює здоров'я та щільність рослинності за даними супутникових знімків.\n\nФормула: NDVI = (NIR − Red) / (NIR + Red), де NIR — відбиття у ближньому інфрачервоному діапазоні, Red — відбиття у червоному.\n\nДіапазон значень: від −1 до +1.\n- < 0: вода або хмари\n- 0–0.1: оголений ґрунт\n- 0.1–0.3: рідка або пожовкла рослинність\n- 0.3–0.6: помірний рослинний покрив\n- > 0.6: густа здорова рослинність\n\nДжерела даних: Sentinel-2 (ESA, безкоштовно, 10м роздільна здатність, кожні 5 днів), Landsat 8/9 (безкоштовно, 30м, кожні 16 днів).\n\nZастосування в AgriTech: моніторинг здоров'я культур, раннє виявлення стресу (посуха, хвороби), прогноз врожайності через LSTM-моделі на часових рядах NDVI, карти призначення добрив (variable rate application).`,
    example: "Агрохолдинг на 28,000 га: Sentinel-2 кожні 5 днів формує NDVI-карту всіх полів → LSTM-модель порівнює з нормою → виявляє аномальне зниження на полі №247 → агроном отримує алерт і надсилає дрон для детального аналізу.",
    relatedTerms: ["machine-learning", "computer-vision"],
    relatedService: "machine-learning",
    relatedBlogPost: "ml-precision-agriculture-ndvi",
    relatedNichePage: "/ml/agritech"
  },
  {
    slug: "fca-compliance",
    termUk: "FCA Compliance (Великобританія)",
    termEn: "FCA Compliance (UK Financial Conduct Authority)",
    category: "ai",
    shortDescription: "Відповідність вимогам британського регулятора фінансових ринків FCA — включно з вимогами до AI-систем у FinTech.",
    fullDescription: `FCA (Financial Conduct Authority) — регулятор фінансових послуг Великобританії, що контролює банки, платіжні системи, страхові компанії та FinTech-стартапи.\n\nВимоги FCA щодо AI та автоматизованих рішень:\n\n**Пояснюваність рішень (Explainability)**: будь-яке автоматизоване рішення, що суттєво впливає на клієнта (відмова у кредиті, блокування рахунку, відхилення страхового позову) — має бути пояснено. Стандартом є SHAP (SHapley Additive exPlanations).\n\n**Право на оскарження**: клієнт має право на перегляд автоматизованого рішення людиною. Система повинна мати реалізований appeals workflow.\n\n**Audit trail**: кожне AI-рішення з повним логом вхідних даних, значень ознак, отриманого рішення та часу. Зберігається мінімум 5 років.\n\n**Consumer Duty (2023)**: нові правила FCA вимагають доведення, що AI-системи не шкодять споживачам і забезпечують справедливі результати.\n\nДля fraud detection: False Positive Rate > 2% вимагає обґрунтування. Упереджені моделі (bias щодо демографічних груп) — порушення.`,
    example: "FinTech заблокував транзакцію через ML-модель. Клієнт оскаржив. FCA-compliant система надсилає: 'Транзакцію заблоковано. Причини: новий пристрій (38%), незвичне місце (33%), сума вища за середню в 4.8 рази (29%). Для оскарження зверніться до...' — SHAP-пояснення автоматично.",
    relatedTerms: ["machine-learning", "feature-engineering"],
    relatedService: "machine-learning",
    relatedBlogPost: "ml-fraud-anomaly-detection-fca",
    relatedNichePage: "/ml/banking"
  },
  {
    slug: "mtd",
    termUk: "MTD — Making Tax Digital",
    termEn: "MTD (Making Tax Digital)",
    category: "ai",
    shortDescription: "Обов'язкова ініціатива HMRC (UK), що вимагає цифрового ведення податкового обліку та подання звітності через API-сумісне ПЗ.",
    fullDescription: `Making Tax Digital (MTD) — програма цифровізації податкового обліку HMRC (HM Revenue & Customs, Великобританія). Обов'язкова для різних категорій платників починаючи з 2019 року.\n\nМТД для ПДВ (MTD for VAT): з квітня 2022 — для всіх VAT-платників незалежно від обороту. Вимоги: вести «цифрові записи» у сумісному ПЗ, подавати VAT-звіти через API (не через веб-портал HMRC вручну).\n\nМТД для ITSA (MTD for Income Tax Self Assessment): впровадження з квітня 2026. Для ФОП та орендодавців з доходом > £50K (з 2027 — > £30K).\n\nАI та МТД: системи автоматизації рахунків (як InvoiceAI) спрощують MTD-compliance: GPT-4o Vision витягує дані → автоматична категоризація витрат → Xero/QuickBooks sync у MTD-сумісному форматі → одна кнопка для подання VAT-звіту.\n\nПорушення MTD: штраф від £200 за квартал. Для бухгалтерських аутсорсерів — репутаційний ризик перед усіма клієнтами.`,
    example: "Бухгалтер із 50 клієнтами-VAT платниками: InvoiceAI обробляє рахунки → автоматична категоризація → Xero MTD sync → підача VAT Return натисканням одної кнопки замість 3–4 годин ручної роботи на квартал на клієнта.",
    relatedTerms: ["machine-learning"],
    relatedService: "artificial-intelligence",
    relatedBlogPost: "ai-invoice-processing-automation",
    relatedNichePage: "/ml/banking"
  },
  {
    slug: "lstm",
    termUk: "LSTM — Рекурентна нейромережа для послідовностей",
    termEn: "LSTM (Long Short-Term Memory)",
    category: "ai",
    shortDescription: "Тип рекурентної нейронної мережі, що вміє запам'ятовувати довгострокові залежності в часових рядах та послідовностях.",
    fullDescription: `LSTM (Long Short-Term Memory) — архітектура рекурентної нейронної мережі (RNN), розроблена для подолання проблеми «зникання градієнта» у стандартних RNN. Завдяки механізму gate (forget gate, input gate, output gate) LSTM може зберігати важливу інформацію через сотні кроків послідовності.\n\nДе LSTM перевершує стандартні ML-алгоритми:\n- **Прогноз часових рядів**: ціни, попит, споживання енергії, врожайність — де важливий контекст попередніх місяців\n- **Аномалії в поведінкових послідовностях**: LSTM Autoencoder навчається на нормальних послідовностях і виявляє аномалії через reconstruction error (fraud detection)\n- **NLP та мовні моделі**: до появи Transformer LSTM був стандартом для machine translation та sentiment analysis\n\nLSTM Autoencoder: окрема архітектура — encoder стискає послідовність у latent vector, decoder відновлює її. Якщо відновлення сильно відрізняється від оригіналу → аномалія. Використовується для fraud detection, predictive maintenance.\n\nAlternative: GRU (Gated Recurrent Unit) — спрощена версія LSTM, швидша у навчанні, трохи менш точна на довгих послідовностях.`,
    example: "Fraud detection: LSTM Autoencoder навчений на 30-подієвих нормальних сесіях (login → browse → checkout). Нова сесія: login → check balance → transfer → logout за 90 сек → reconstruction error 0.84 (норма < 0.3) → аномалія → блокування.",
    relatedTerms: ["neural-network", "machine-learning", "feature-engineering"],
    relatedService: "machine-learning",
    relatedBlogPost: "ml-fraud-anomaly-detection-fca",
    relatedNichePage: "/ml/logistics"
  },
  {
    slug: "fhir",
    termUk: "FHIR R4 — Стандарт медичних даних",
    termEn: "FHIR R4 (Fast Healthcare Interoperability Resources)",
    category: "ai",
    shortDescription: "Міжнародний стандарт обміну медичними даними через REST API — основа інтеграції AI з медичними інформаційними системами.",
    fullDescription: `FHIR (Fast Healthcare Interoperability Resources) R4 — стандарт HL7 для обміну медичними даними через REST API. Версія R4 (Release 4) — поточний міжнародний стандарт, підтримується NHS (Великобританія), CMS (США) та МОЗ України в рамках цифровізації охорони здоров'я.\n\nКлючові ресурси FHIR:\n- **Patient**: демографічні дані, ідентифікатори\n- **Observation**: результати аналізів, вимірювання\n- **MedicationRequest**: призначення ліків\n- **Condition**: діагнози\n- **AllergyIntolerance**: алергії\n- **Encounter**: записи про візити\n\nДля AI в медицині: FHIR R4 дозволяє RAG-системі запитувати структуровані дані пацієнта з МІС (медичної інформаційної системи) в реальному часі — без зберігання ПД у векторній базі. Лікар питає 'поточні ліки пацієнта Коваленко?' → FHIR API query → структуровані дані вставляються в RAG-контекст → GPT-4o відповідає → ніяких ПД в Qdrant.\n\nNHS специфіка: NHS England мандатує FHIR R4 для всіх нових IT-систем у NHS. SNOMED CT — обов'язковий термінологічний стандарт.`,
    example: "Клініка впровадила RAG-асистента для лікарів. Лікар питає: 'Чи є протипоказання для метформіну при поточних призначеннях?' → FHIR API vitягує список ліків пацієнта → RAG шукає в протоколах МОЗ → GPT-4o відповідає із зазначенням конкретних взаємодій.",
    relatedTerms: ["rag", "machine-learning"],
    relatedService: "artificial-intelligence",
    relatedBlogPost: "ai-rag-healthcare-gdpr",
    relatedNichePage: "/ai/healthcare"
  },
  {
    slug: "shap",
    termUk: "SHAP — Пояснення рішень ML",
    termEn: "SHAP (SHapley Additive exPlanations)",
    category: "ai",
    shortDescription: "Математичний метод пояснення рішень ML-моделі — показує внесок кожної ознаки в конкретне передбачення. Обов'язковий для FCA/кредитного скорингу у Великобританії.",
    fullDescription: `SHAP (SHapley Additive exPlanations) — метод інтерпретації ML-моделей на основі теорії ігор Шеплі. Для кожного передбачення SHAP розраховує, наскільки кожна ознака вплинула на результат відносно середнього.\n\nТипи SHAP:\n- **TreeExplainer**: для дерев (XGBoost, LightGBM) — швидко, 2–8мс\n- **KernelExplainer**: модель-агностик, повільніше\n- **DeepExplainer**: для нейромереж\n\nРегуляторне застосування (Великобританія):\n- **FCA Consumer Duty (2023)**: ML-рішення у фінансах повинні бути пояснювані клієнту\n- **Right to Explanation (GDPR Art. 22)**: автоматизовані рішення підлягають поясненню\n- Кредитний скоринг: клієнт має право знати чому відмовлено\n\nВихід SHAP для одного рішення: "Відмова в кредиті. Основні фактори: (1) payment_history: −0.23, (2) debt_ratio: −0.18, (3) income_stability: +0.12". Це дозволяє банку показати клієнту конкретні причини і сформувати appeals workflow.`,
    example: "UK FinTech впровадив SHAP у кредитний скоринг: кожна відмова генерує PDF-звіт з топ-5 факторами. FCA-аудит пройшов без зауважень. Клієнти оскаржили 3.2% рішень — 61% апеляцій були задоволені після ручного перегляду.",
    relatedTerms: ["machine-learning", "xai"],
    relatedService: "machine-learning",
    relatedBlogPost: "fca-ml-explainability-guide",
    relatedNichePage: "/ml/banking"
  },
  {
    slug: "sentinel-2",
    termUk: "Sentinel-2 — Супутниковий моніторинг",
    termEn: "Sentinel-2 (ESA Copernicus Satellite)",
    category: "ai",
    shortDescription: "Супутник ESA програми Copernicus, що знімає поверхню Землі з роздільністю 10м кожні 5 днів. Основне джерело безкоштовних мультиспектральних знімків для AgriTech ML.",
    fullDescription: `Sentinel-2 — пара супутників (2A і 2B) ESA в рамках програми Copernicus. Надають мультиспектральні знімки у 13 каналах, включаючи видимий, ближній інфрачервоний (NIR) та короткохвильовий інфрачервоний (SWIR) діапазони.\n\nКлючові характеристики:\n- Просторова роздільність: 10м (RGB + NIR), 20м (Red-Edge, SWIR)\n- Часова роздільність: кожні 5 днів (при 2 супутниках)\n- Покриття: весь суходіл Землі\n- Вартість: безкоштовно через Copernicus Data Space\n\nVegetation Indices з Sentinel-2:\n- **NDVI** = (NIR − Red) / (NIR + Red) — стан рослинності\n- **EVI** — покращений індекс рослинності\n- **NDWI** — вміст вологи в рослинах\n- **LAI** — індекс листкової поверхні\n\nДля ML: time-series NDVI за сезон → LSTM/XGBoost прогнозує врожайність. Точність прогнозу врожаю пшениці: MAPE 6.3% (vs 18% без супутника).`,
    example: "AgriTech стартап інтегрував Sentinel-2 API: щотижнева завантаження NDVI по 847 полям, автоматична детекція стресу рослин (NDVI < 0.4), сповіщення фермеру за 2 тижні до видимих ознак — врожайність +12% за сезон.",
    relatedTerms: ["machine-learning", "precision-agriculture"],
    relatedService: "machine-learning",
    relatedBlogPost: "ml-precision-agriculture-ndvi",
    relatedNichePage: "/ml/agritech"
  },
  {
    slug: "precision-agriculture",
    termUk: "Точне Землеробство (Precision Agriculture)",
    termEn: "Precision Agriculture",
    category: "ai",
    shortDescription: "Підхід до управління сільськогосподарськими угіддями на основі даних — кожна зона поля отримує диференційований догляд залежно від ML-аналізу ґрунту, рослин і клімату.",
    fullDescription: `Точне землеробство (Precision Agriculture) — технологія управління полями, де рішення (внесення добрив, зрошення, захист рослин) приймаються для кожної зони поля окремо, а не для всього поля однаково.\n\nКомпоненти системи:\n- **Дані**: Sentinel-2 NDVI, IoT датчики ґрунту, дрони, метеостанції\n- **ML-моделі**: прогноз врожайності (XGBoost), детекція хвороб (YOLOv8), прогноз зрошення (LSTM)\n- **Виконання**: VRA (Variable Rate Application) — GPS-керована техніка\n\nПереваги:\n- Скорочення витрат добрив на 20–30%\n- Скорочення пестицидів на 25–40%\n- Підвищення врожайності на 8–15%\n- Докази для ELM Scheme (UK) та субсидій ЄС\n\nUK контекст: Sustainable Farming Incentive (SFI) від AHDB і RPA платить фермерам за впровадження precision farming та підтверджені дані про зниження хімічного навантаження.`,
    example: "Ферма 1,200 га впровадила precision agriculture: NDVI-карти → Variable Rate Application добрив → витрати NPK −28%, врожайність пшениці +11%. RPA звіт автоматично згенерований з системи для SFI subside claim.",
    relatedTerms: ["machine-learning", "sentinel-2"],
    relatedService: "machine-learning",
    relatedBlogPost: "ml-precision-agriculture-ndvi",
    relatedNichePage: "/ml/agritech"
  },
  {
    slug: "elm-scheme",
    termUk: "ELM Scheme — Британська агроекологічна програма",
    termEn: "ELM Scheme (Environmental Land Management)",
    category: "ai",
    shortDescription: "Британська державна програма субсидування екологічного землеробства, що замінила EU CAP після Brexit. Платить фермерам за вимірювані екологічні результати — основний драйвер AgriTech у Великобританії.",
    fullDescription: `Environmental Land Management (ELM) — нова система сільськогосподарських субсидій Великобританії після Brexit, що замінила EU Common Agricultural Policy (CAP). Управляється Defra і RPA (Rural Payments Agency).\n\nТри рівні ELM:\n1. **SFI (Sustainable Farming Incentive)**: базові виплати за прості заходи (cover crops, soil testing, precision farming)\n2. **Countryside Stewardship**: виплати за складніші екологічні заходи (hedgerows, watercourse buffers)\n3. **Landscape Recovery**: масштабні екологічні проєкти\n\nSFI та ML:\n- SFI платить £28/га за Integrated Pest Management (IPM) plan\n- £67/га за Agroforestry plan\n- £45/га за Precision farming (потрібні дані NDVI і VRA)\n- Фермер повинен надати цифрові докази (logs, maps, GPS tracks)\n\nML роль: автоматична генерація звітів для RPA з даних Sentinel-2, IoT, дронів — перетворює compliance burden на автоматичний процес.`,
    example: "Фермер у Йоркширі отримав £34,200 SFI payments за рік: автоматизована система зібрала докази (Sentinel-2 NDVI history, VRA application logs, soil sensor data) і згенерувала RPA-сумісний звіт. Час підготовки звіту: 2 години → 20 хвилин.",
    relatedTerms: ["precision-agriculture", "machine-learning"],
    relatedService: "machine-learning",
    relatedBlogPost: "ml-precision-agriculture-ndvi",
    relatedNichePage: "/ml/agritech"
  },
  {
    slug: "gis",
    termUk: "GIS — Геоінформаційна система",
    termEn: "GIS (Geographic Information System)",
    category: "ai",
    shortDescription: "Система для збору, зберігання та аналізу просторових даних. У ML-контексті — геопросторові ознаки для AVM нерухомості (відстань до метро, школи, парків) та точного землеробства.",
    fullDescription: `Geographic Information System (GIS) — технологія збору, зберігання, аналізу та візуалізації просторово-Referenced даних. У ML поєднується з PostGIS (розширення PostgreSQL) для зберігання та запитів геопросторових даних.\n\nGIS в нерухомості (AVM):\n- Відстань до станцій метро/ж/д: +12% до ціни кожні −400м\n- Шкільний рейтинг (Ofsted): +8% premium за Outstanding школу в радіусі 800м\n- Flood zone: −15–25% знижка\n- POI density (кафе, магазини): proxy для walkability\n\nGIS в агротехніці:\n- Тип ґрунту по зонах (SSSI data)\n- Elevation model (схили → дренаж → урожайність)\n- Межі полів (RPA Field Parcels)\n- Field ID для SFI claims\n\nТехнічний стек:\n- **PostGIS**: ST_Distance(), ST_Within(), ST_Intersects() для PostgreSQL\n- **GeoPandas**: Python геопросторова обробка\n- **QGIS**: desktop GIS для visualization\n- **Mapbox/Leaflet**: web mapping`,
    example: "AVM модель з 47 GIS-ознаками (vs 12 базових): MAPE знизився з 8.1% до 4.2%. Найважливіші GIS-ознаки: nearest_tube_distance (SHAP +0.18), school_ofsted_score (SHAP +0.12), flood_zone (SHAP −0.09).",
    relatedTerms: ["machine-learning", "avm"],
    relatedService: "machine-learning",
    relatedBlogPost: "ml-property-valuation-avm",
    relatedNichePage: "/ml/real-estate"
  },
  {
    slug: "mape",
    termUk: "MAPE — Середня відсоткова похибка",
    termEn: "MAPE (Mean Absolute Percentage Error)",
    category: "ai",
    shortDescription: "Метрика точності прогнозних ML-моделей. MAPE 5% означає що модель помиляється в середньому на 5% — зрозуміла бізнесу метрика для demand forecasting та AVM.",
    fullDescription: `MAPE (Mean Absolute Percentage Error) = (1/n) × Σ |actual − forecast| / actual × 100%\n\nПереваги MAPE:\n- Інтерпретована у відсотках — зрозуміла бізнесу\n- Не залежить від масштабу (можна порівнювати між продуктами)\n- Стандарт у ритейлі, нерухомості, енергетиці\n\nОрієнтири по індустріях:\n- **Demand Forecasting (ритейл)**: <10% — добре, <5% — відмінно\n- **AVM нерухомість**: <5% — банківський стандарт, <3% — відмінно\n- **Energ forecasting**: <3% — операційний стандарт\n- **AgriTech (врожай)**: <8% — практично корисно\n\nВажлива альтернатива:\n- **RMSE** (Root Mean Squared Error): штрафує великі помилки більше\n- **MAE** (Mean Absolute Error): стійка до викидів, але не відсоткова\n- **SMAPE** (Symmetric MAPE): усуває асиметрію класичного MAPE при малих значеннях`,
    example: "Ритейлер тестував 3 моделі demand forecasting: ARIMA MAPE=27%, XGBoost MAPE=12%, XGBoost+Prophet MAPE=8.3%. Обрали гібрид: -34% надлишкових запасів, -£240k на рік складських витрат.",
    relatedTerms: ["machine-learning", "time-series"],
    relatedService: "machine-learning",
    relatedBlogPost: "ml-demand-forecasting-retail",
  },
  {
    slug: "predictive-maintenance",
    termUk: "Predictive Maintenance — Прогностичне обслуговування",
    termEn: "Predictive Maintenance",
    category: "ai",
    shortDescription: "ML-підхід до обслуговування обладнання: замість планових зупинок система аналізує IoT-дані датчиків і прогнозує поломку за 2–7 днів до її виникнення.",
    fullDescription: `Predictive Maintenance (PdM) — перехід від планового (Preventive) або реактивного (Run-to-failure) обслуговування до прогнозованого. ML-модель аналізує дані датчиків у реальному часі та попереджає про майбутню поломку.\n\nДані для PdM:\n- **Вібрація**: акселерометри (FFT-аналіз підшипників)\n- **Температура**: термопари, IR-камери\n- **Струм двигуна**: Current Signature Analysis\n- **Тиск та потік**: для гідравліки та пневматики\n- **Акустична емісія**: ультразвукові датчики\n\nML-моделі:\n- **LSTM Autoencoder**: виявляє аномалії в time-series без розмічених даних про поломки\n- **Isolation Forest**: несупервізоване виявлення аномалій\n- **Gradient Boosting**: прогноз RUL (Remaining Useful Life) якщо є розмічені дані\n\nТехнічний стек: TimescaleDB → Kafka (streaming) → LSTM Autoencoder → alert если reconstruction_error > threshold.\n\nROI: типова виробнича лінія — 1 незапланована зупинка = £15,000–£80,000 збитків. PdM окупається за 6–14 місяців.`,
    example: "Автоскладальна лінія (87 одиниць обладнання): LSTM Autoencoder на IoT-даних → 23 попередження за 6 місяців → 21 підтверджена реальна проблема. Unplanned downtime −73%, maintenance cost −31%.",
    relatedTerms: ["machine-learning", "time-series", "timescaledb"],
    relatedService: "machine-learning",
    relatedBlogPost: "ml-predictive-maintenance-lstm",
    relatedNichePage: "/ml/manufacturing"
  },
  {
    slug: "oee",
    termUk: "OEE — Ефективність обладнання",
    termEn: "OEE (Overall Equipment Effectiveness)",
    category: "ai",
    shortDescription: "Золота метрика виробничої ефективності. OEE = Доступність × Продуктивність × Якість. World-class: 85%+. ML дозволяє моніторити OEE в реальному часі та прогнозувати падіння.",
    fullDescription: `OEE (Overall Equipment Effectiveness) — стандартна метрика промислової ефективності:\n\n**OEE = Availability × Performance × Quality**\n\n- **Availability** = Actual Run Time / Planned Production Time (враховує зупинки)\n- **Performance** = (Ideal Cycle Time × Total Count) / Run Time (враховує повільну роботу)\n- **Quality** = Good Count / Total Count (враховує брак)\n\nОрієнтири:\n- **World-class**: ≥85% OEE\n- **Типово для більшості заводів**: 60–70%\n- **Нижче 40%**: серйозні проблеми\n\nML + OEE:\n- Real-time OEE dashboard з IoT-даних (TimescaleDB + Grafana)\n- Прогноз OEE на наступні 24h (LSTM)\n- Root Cause Analysis: автоматична ідентифікація причин падіння OEE\n- Correlation: які датчики найбільше корелюють з падінням Performance\n\nIndustry 4.0: OEE + ML — основа Smart Factory. Кожен відсоток OEE на великому заводі = £200k–£2M річного виробництва.`,
    example: "Пластиковий завод (12 ліній): IoT → TimescaleDB → реал-тайм OEE dashboard. ML-аналіз виявив що 67% Availability losses — temperature excursions о 14:00–16:00 (перегрів у літній час). Рішення: проактивне охолодження. OEE: 61% → 74%.",
    relatedTerms: ["machine-learning", "predictive-maintenance", "timescaledb"],
    relatedService: "machine-learning",
    relatedBlogPost: "industry-4-oee-ml",
    relatedNichePage: "/ml/manufacturing"
  },
  {
    slug: "timescaledb",
    termUk: "TimescaleDB — База часових рядів",
    termEn: "TimescaleDB",
    category: "ai",
    shortDescription: "PostgreSQL-розширення для ефективного зберігання та запитів time-series даних. Ідеальне для IoT (10,000+ подій/сек), predictive maintenance та real-time OEE моніторингу.",
    fullDescription: `TimescaleDB — open-source розширення PostgreSQL, оптимізоване для time-series даних. Замість окремої БД (InfluxDB, QuestDB) — повна SQL-сумісність з автоматичним розбиттям на chunks по часу.\n\nКлючові переваги перед plain PostgreSQL:\n- **Hypertables**: автоматичний partitioning по time → 10–100x швидші range queries\n- **Compression**: до 90% зменшення розміру старих даних\n- **Continuous Aggregates**: precomputed rollups (хвилинні → годинні → добові)\n- **Data Retention**: автоматичне видалення старих chunks\n\nТиповий IoT use case:\n\`\`\`sql\nCREATE TABLE sensor_readings (\n  time TIMESTAMPTZ NOT NULL,\n  sensor_id INT,\n  temperature FLOAT,\n  vibration FLOAT\n);\nSELECT create_hypertable('sensor_readings', 'time');\n\`\`\`\n\nПродуктивність: 10,000 insert/sec на одному сервері. SELECT avg(temperature) за місяць по 500 датчикам — <100мс з Continuous Aggregates.\n\nПорівняння: InfluxDB — вища пропускна здатність, але відмова від SQL. TimescaleDB — SQL-знайоме, легша інтеграція з існуючим Python/ML стеком.`,
    example: "Виробничий завод: 340 IoT датчиків × 1 вимірювання/сек = 29.4M записів/добу. TimescaleDB зберігає 2 роки history (21GB після compression). LSTM модель читає last-7-days features за <200мс для real-time scoring.",
    relatedTerms: ["machine-learning", "predictive-maintenance", "oee"],
    relatedService: "machine-learning",
    relatedBlogPost: "ml-predictive-maintenance-lstm",
    relatedNichePage: "/ml/manufacturing"
  },
  {
    slug: "anomaly-detection",
    termUk: "Anomaly Detection — Виявлення аномалій",
    termEn: "Anomaly Detection",
    category: "ai",
    shortDescription: "ML-метод виявлення нетипової поведінки в даних без заздалегідь відомих прикладів. Застосовується у fraud detection, кібербезпеці, predictive maintenance та фінансовому моніторингу.",
    fullDescription: `Anomaly Detection — виявлення точок даних що значно відрізняються від норми. Ключова особливість: часто немає розмічених даних про аномалії (несупервізоване навчання).\n\nОсновні алгоритми:\n- **Isolation Forest**: ізолює аномалії через випадкові розбиття дерева — швидко, ефективно для tabular data\n- **LSTM Autoencoder**: кодує нормальну послідовність → reconstruction error > threshold = аномалія\n- **One-Class SVM**: межа нормального простору\n- **LOF (Local Outlier Factor)**: порівнює щільність точки з сусідами\n\nТипи аномалій:\n- **Point anomaly**: одна точка ненормальна (великий переказ)\n- **Contextual anomaly**: нормальне значення в неправильному контексті (login о 3:00 ночі)\n- **Collective anomaly**: патерн з кількох точок (серія малих переказів)\n\nПоказники якості:\n- **False Positive Rate**: частота помилкових спрацювань — критична для UX\n- **Recall**: частка справжніх аномалій що виявлені\n- Зазвичай balance між FPR і Recall через threshold tuning`,
    example: "AML система: Isolation Forest на 1.2M транзакцій/місяць. До впровадження ML: аналітики вручну переглядали 12,400 alerts/місяць (False Positive Rate 94%). Після: 680 alerts/місяць, FPR 31%, Recall 98.7%.",
    relatedTerms: ["machine-learning", "lstm", "isolation-forest"],
    relatedService: "machine-learning",
    relatedBlogPost: "ml-fraud-anomaly-detection-fca",
    relatedNichePage: "/ml/cybersecurity"
  },
  {
    slug: "siem",
    termUk: "SIEM — Система безпеки подій",
    termEn: "SIEM (Security Information and Event Management)",
    category: "ai",
    shortDescription: "Централізована платформа безпеки що збирає логи з усіх систем, кореллює події та виявляє загрози. ML + SIEM = UEBA — поведінкова аналітика для виявлення інсайдерів і APT.",
    fullDescription: `SIEM (Security Information and Event Management) — платформа що агрегує security events з різних джерел (файрволи, endpoints, cloud, apps) і застосовує кореляційні правила для виявлення загроз.\n\nПопулярні SIEM:\n- **Splunk**: найпопулярніший enterprise, дорогий\n- **Microsoft Sentinel**: cloud-native, Azure-інтеграція\n- **Elastic SIEM**: open-source основа\n- **IBM QRadar**: enterprise, з ML capabilities\n\nПроблема класичного SIEM:\n- 10,000–100,000 alerts/день → alert fatigue\n- False Positive Rate 95–99% → аналітики ігнорують alerts\n- Правила (rules) не адаптуються до нових атак\n\nML + SIEM (UEBA — User and Entity Behavior Analytics):\n- **Baseline**: нормальна поведінка користувача (робочий час, локації, об'єм даних)\n- **Deviation scoring**: кожна подія отримує anomaly score\n- **Risk-based alerting**: alert лише коли accumulated risk > threshold\n- Результат: FPR 4.2% → 0.8%, аналітик обробляє 25 alerts/день замість 400`,
    example: "Фінансова компанія (600 співробітників): SIEM + ML UEBA виявив insider threat: аналітик за 3 дні до звільнення скачав 47GB customer data в нестандартний час. Традиційні DLP-правила не спрацювали — виявила лише поведінкова аномалія.",
    relatedTerms: ["machine-learning", "anomaly-detection", "ueba"],
    relatedService: "machine-learning",
    relatedBlogPost: "ml-ueba-insider-threat",
    relatedNichePage: "/ml/cybersecurity"
  },
  {
    slug: "open-banking",
    termUk: "Open Banking — Відкритий банкінг",
    termEn: "Open Banking (UK)",
    category: "ai",
    shortDescription: "UK-регуляторна ініціатива (PSD2/PSD3) що дозволяє клієнтам ділитися банківськими даними з третіми сторонами через API. Основа для ML кредитного скорингу thin-file позичальників.",
    fullDescription: `Open Banking — система стандартизованих API що дозволяє клієнтам (фізичним і юридичним особам) авторизувати третіх сторін (AISP/PISP) на читання їх банківських даних або ініціювання платежів.\n\nUK Open Banking:\n- Запущено: 2018 (CMA Order + PSD2)\n- Регулятор: OBIE (Open Banking Implementation Entity)\n- 9 найбільших банків + 350+ ліцензованих TPP\n- PSD3 (2025): розширення до open finance (акції, пенсії, страхування)\n\nАктори:\n- **AISP** (Account Information Service Provider): читання транзакцій\n- **PISP** (Payment Initiation Service Provider): ініціювання платежів\n- **CBPII**: перевірка наявності коштів\n\nML + Open Banking для кредитного скорингу:\n- **Thin-file**: позичальники без кредитної history в Experian/Equifax\n- Дані: 12-24 місяці транзакцій → LightGBM ознаки\n- Ключові features: salary regularity, bill payment rate, gambling fraction, overdraft frequency\n- Результат: AUC 0.81 (traditional) → 0.94 (+ Open Banking)\n- GDPR compliance: explicit consent, 90-day re-auth, right to withdraw`,
    example: "UK FinTech для малого бізнесу: Open Banking + LightGBM замінив традиційний кредитний скоринг. 41% клієнтів — thin-file (не мали Experian score). Після впровадження: approval rate +38%, default rate −12% vs традиційний підхід.",
    relatedTerms: ["machine-learning", "credit-scoring", "gdpr"],
    relatedService: "machine-learning",
    relatedBlogPost: "ml-credit-scoring-alternative-data",
    relatedNichePage: "/ml/banking"
  },
  {
    slug: "aml",
    termUk: "AML — Протидія відмиванню грошей",
    termEn: "AML (Anti-Money Laundering)",
    category: "ai",
    shortDescription: "Комплекс заходів для виявлення та запобігання відмиванню грошей. ML-підхід: Isolation Forest + graph neural networks замінюють ручні правила — FPR з 94% до 31%.",
    fullDescription: `Anti-Money Laundering (AML) — система заходів фінансових установ для виявлення, попередження та звітування про підозрілі фінансові операції пов'язані з відмиванням доходів.\n\nUK AML регулювання:\n- **Money Laundering Regulations 2017** (UK MLR 2017)\n- **Proceeds of Crime Act 2002** (POCA)\n- **FCA** — регулятор, може штрафувати до £100M+\n- **SARs** (Suspicious Activity Reports) → NCA (National Crime Agency)\n\nТрадиційний підхід vs ML:\n| | Rule-based | ML (Isolation Forest + GNN) |\n|---|---|---|\n| FPR | 94% | 31% |\n| Recall | 99% | 98.7% |\n| Alerts/місяць | 12,400 | 680 |\n| Analyst hours | 2,480 | 136 |\n\nML-архітектура:\n- **Isolation Forest**: несупервізована детекція point anomalies\n- **Graph Neural Networks**: виявлення структурованих схем (layering через кілька рахунків)\n- **Temporal patterns**: LSTM для виявлення smurfing (серія малих переказів)\n\nXAI вимога: FCA вимагає пояснення кожного SAR — SHAP values для compliance officers.`,
    example: "UK необанк (2.1M клієнтів): ML AML система за рік виявила 4,210 підозрілих кейсів (vs 380 по старих правилах). Подано 1,847 SARs до NCA. Штраф від FCA за попередній інцидент: £80M — нова система усунула ризик.",
    relatedTerms: ["machine-learning", "anomaly-detection", "shap"],
    relatedService: "machine-learning",
    relatedBlogPost: "ml-fraud-anomaly-detection-fca",
    relatedNichePage: "/ml/banking"
  },
  {
    slug: "clip",
    termUk: "CLIP — Мультимодальна модель",
    termEn: "CLIP (Contrastive Language-Image Pretraining)",
    category: "ai",
    shortDescription: "OpenAI модель що спільно навчає текстові та зображеннєві ембеддинги. Основа visual search: клієнт завантажує фото → CLIP знаходить схожі товари без ключових слів.",
    fullDescription: `CLIP (Contrastive Language-Image Pretraining) — модель OpenAI (2021), навчена на 400M пар (зображення, текст) методом контрастного навчання. Результат: зображення і текст в одному 512-вимірному просторі ембеддингів.\n\nАрхітектура:\n- **Image Encoder**: ViT (Vision Transformer) або ResNet\n- **Text Encoder**: Transformer\n- Навчання: maximize cosine similarity між правильними парами\n\nВізуальний пошук (Visual Search) з CLIP:\n1. Офлайн: всі товари → CLIP image embeddings → Qdrant vector DB\n2. Онлайн: фото покупця → CLIP image embedding → ANN search в Qdrant\n3. Результат: топ-K схожих товарів за <50мс\n\nПереваги vs класичний keyword search:\n- Не потребує описів товарів (важливо для нових/рідкісних позицій)\n- Розуміє семантику: 'чорна сукня з V-вирізом' → знаходить схожі фасони\n- Zero-shot: CLIP не потребує fine-tuning для нових категорій\n\nАльтернативи: BLIP-2 (salesforce), ImageBind (Meta), SigLIP (Google) — вища точність, складніше деплоїти.`,
    example: "E-commerce (180k SKUs): CLIP + Qdrant visual search. 3,200 users за перший місяць. Конверсія: keyword search 1.8% → visual search 3.4% (+89%). AOV visual search users: +24%. Час пошуку: 47мс (p95).",
    relatedTerms: ["embeddings", "vector-database", "rag"],
    relatedService: "artificial-intelligence",
    relatedBlogPost: "ai-visual-search-ecommerce",
    relatedNichePage: "/ai/ecommerce"
  },
  {
    slug: "alternative-data",
    termUk: "Alternative Data — Альтернативні дані",
    termEn: "Alternative Data (Credit Scoring)",
    category: "ai",
    shortDescription: "Нетрадиційні джерела даних для кредитного скорингу: Open Banking транзакції, оренда, комунальні платежі, поведінкові паттерни. Дозволяє оцінювати thin-file позичальників без кредитної history.",
    fullDescription: `Alternative Data — будь-які дані поза традиційними кредитними бюро (Experian, Equifax, TransUnion) для оцінки кредитоспроможності позичальника.\n\nКатегорії альтернативних даних:\n\n**1. Open Banking (найцінніші):**\n- Регулярність доходу (salary date, amount stability)\n- Оплата рахунків (utility, subscription, rent)\n- Gambling fraction (% витрат на ставки)\n- Overdraft frequency та depth\n- Merchant categories (lifestyle indicators)\n\n**2. Телеком дані:**\n- Своєчасність оплати мобільного\n- Тривалість контракту\n\n**3. Rental payments:**\n- Experian Rental Exchange (UK) — оренда в кредитну history\n\n**4. Behavioral/psychometric:**\n- Швидкість заповнення форми\n- Точність введення особистих даних\n\nML pipeline:\n- Сирі транзакції → 200+ features (pandas/polars engineering)\n- LightGBM / XGBoost з SHAP for explainability\n- AUC: 0.81 (традиційний) → 0.94 (+ Open Banking)\n\nCompliance: GDPR explicit consent, ICO guidance on automated decisions, FCA Consumer Duty вимагає справедливого ставлення.`,
    example: "UK FinTech платформа для малого бізнесу: 41% заявників — thin-file (немає Experian score). LightGBM на Open Banking даних: approval rate +38%, default rate −12%, час рішення 3 хвилини. £280M виданих позик за рік.",
    relatedTerms: ["machine-learning", "open-banking", "shap"],
    relatedService: "machine-learning",
    relatedBlogPost: "ml-credit-scoring-alternative-data",
    relatedNichePage: "/ml/banking"
  },
  {
    slug: "embeddings",
    termUk: "Embeddings — Векторні представлення",
    termEn: "Embeddings (Vector Representations)",
    category: "ai",
    shortDescription: "Числові вектори що представляють текст, зображення або інші дані у багатовимірному просторі. Основа RAG-систем, семантичного пошуку та рекомендаційних систем.",
    fullDescription: `Embeddings — результат перетворення будь-яких даних (текст, зображення, аудіо) на числовий вектор фіксованої розмірності. Семантично схожі елементи мають близькі вектори в просторі.\n\nТипи embeddings:\n- **Text embeddings** (OpenAI text-embedding-3-large, 3072 dims): семантичне кодування тексту\n- **Image embeddings** (CLIP, 512 dims): кодування зображень\n- **Multimodal** (CLIP, ImageBind): текст + зображення в одному просторі\n\nЗастосування:\n- **RAG**: документи → embeddings → vector DB → ANN search при запиті\n- **Семантичний пошук**: "знайти подібне" без ключових слів\n- **Рекомендації**: user/item embeddings → cosine similarity\n- **Clustering**: k-means на embeddings групує схожий контент\n\nПорівняння моделей OpenAI:\n- text-embedding-3-small: 1536 dims, дешевше, достатньо для більшості задач\n- text-embedding-3-large: 3072 dims, вища точність для production RAG\n\nВідстані: cosine similarity, dot product, Euclidean distance.`,
    example: "E-commerce: 180k товарів → OpenAI embeddings → Qdrant. Пошуковий запит клієнта 'casual summer dress with pockets' → embedding → ANN search → топ-20 релевантних товарів без жодного keyword match. CTR порівняно з keyword search: +34%.",
    relatedTerms: ["rag", "vector-database", "clip"],
    relatedService: "artificial-intelligence",
    relatedBlogPost: "ai-visual-search-ecommerce",
    relatedNichePage: "/ai/ecommerce"
  },
  {
    slug: "vector-database",
    termUk: "Vector Database — Векторна база даних",
    termEn: "Vector Database",
    category: "ai",
    shortDescription: "Спеціалізована база даних для зберігання та пошуку embeddings. Замість SQL WHERE — пошук за схожістю (ANN). Основа RAG, visual search та семантичного пошуку.",
    fullDescription: `Vector Database (векторна база даних) зберігає embedding-вектори і виконує Approximate Nearest Neighbor (ANN) пошук — знаходить K найближчих векторів до запиту за мілісекунди.\n\nПопулярні рішення:\n- **Qdrant** (open-source, Rust): найбільш production-ready для self-hosted, підтримує payload filters\n- **Pinecone**: managed SaaS, простий старт\n- **Weaviate**: мультимодальна підтримка, GraphQL API\n- **pgvector**: розширення PostgreSQL — простіше для команд зі знанням SQL\n- **Chroma**: легкий, ідеальний для прототипів і RAG\n\nАлгоритми ANN:\n- **HNSW** (Hierarchical Navigable Small World): найпопулярніший, recall 0.95+, Qdrant\n- **IVF-Flat** (FAISS): для великих датасетів (>10M vectors)\n\nРАГ pipeline: Document → chunk (512 tokens) → embedding → Qdrant insert. Query → embedding → Qdrant search (top-5) → context → GPT-4o → answer.\n\nФільтрація: Qdrant payload filters дозволяють комбінувати ANN з metadata filters (мова, дата, категорія) — без додаткового SQL запиту.`,
    example: "Юридична фірма: 12,000 контрактів → chunks → Qdrant. RAG-асистент відповідає на питання по конкретному контракту за <2 сек. Precision@5: 0.91. Без векторної БД той самий пошук займав 45 хв ручного перегляду.",
    relatedTerms: ["rag", "embeddings", "clip"],
    relatedService: "artificial-intelligence",
    relatedBlogPost: "ai-rag-healthcare-gdpr",
    relatedNichePage: "/ai/ecommerce"
  },
  {
    slug: "fine-tuning",
    termUk: "Fine-tuning — Донавчання моделі",
    termEn: "Fine-tuning",
    category: "ai",
    shortDescription: "Процес адаптації попередньо навченої AI-моделі (GPT, BERT) до специфічної задачі або домену через навчання на цільовому датасеті. Альтернатива — prompt engineering або RAG.",
    fullDescription: `Fine-tuning — продовження навчання попередньо навченої моделі (pre-trained model) на доменному датасеті. Вага моделі оновлюються, що дозволяє засвоїти стиль, термінологію або специфічні паттерни.\n\nКоли fine-tuning потрібен:\n- Специфічний стиль виводу (юридичні документи, медичні звіти)\n- Домен з унікальною термінологією (SNOMED CT, фінансовий жаргон)\n- Завдання класифікації з обмеженими категоріями\n- Скорочення inference-часу (fine-tuned менша модель vs RAG з великою)\n\nКоли fine-tuning НЕ потрібен:\n- Достатньо prompt engineering або RAG\n- Немає 500+ якісних labeled прикладів\n- Знання потрібно часто оновлювати (RAG кращий)\n\nFine-tuning vs RAG:\n| | Fine-tuning | RAG |\n|---|---|---|\n| Знання | В вагах моделі | У vector DB |\n| Оновлення | Потребує перенавчання | Додай документ |\n| Дані | 500+ labeled samples | Довільні документи |\n| Вартість | Висока (GPU training) | Нижча (inference only) |\n\nPEFT (Parameter-Efficient Fine-Tuning): LoRA, QLoRA — fine-tuning малої частини параметрів, значно дешевше.`,
    example: "Медична компанія fine-tuned GPT-4o на 8,000 клінічних звітах з SNOMED CT анотаціями. Точність витягу діагнозів: 72% (base GPT-4o) → 94% (fine-tuned). Час fine-tuning: 6 годин, вартість: $380.",
    relatedTerms: ["rag", "llm", "machine-learning"],
    relatedService: "artificial-intelligence",
    relatedBlogPost: "ai-rag-healthcare-gdpr",
    relatedNichePage: "/ai/marketing"
  },
  {
    slug: "ai-hallucination",
    termUk: "Галюцинація AI (AI Hallucination)",
    termEn: "AI Hallucination",
    category: "ai",
    shortDescription: "Явище коли LLM генерує впевнено сформульовану, але фактично неправильну інформацію. Критичний ризик у медицині та юриспруденції — основна причина впровадження RAG.",
    fullDescription: `AI Hallucination — генерація мовними моделями правдоподібного, але неправдивого контенту. Модель не 'знає що вона не знає' і заповнює прогалини статистично вірогідним текстом.\n\nТипи галюцинацій:\n- **Фактичні**: неіснуючі дати, числа, назви (GPT вигадує судову справу)\n- **Джерельні**: цитати з неіснуючих статей з правдоподібними DOI\n- **Контекстуальні**: суперечать наданому контексту або своїм попереднім відповідям\n- **Специфікаційні**: зміна поставленого завдання\n\nПричини:\n- Тренування на next-token prediction — навчає писати правдоподібно, не правдиво\n- Немає механізму перевірки фактів\n- Знання обмежені training cutoff\n\nРішення:\n- **RAG**: прив'язує відповіді до конкретних документів-джерел\n- **Grounding + citations**: вимагати посилання на конкретний уривок\n- **Temperature 0**: детерміністичніший вивід, менше творчості\n- **Confidence scoring**: оцінювати надійність відповіді\n- **Human-in-the-loop**: для критичних рішень (медицина, юриспруденція)\n\nRate: GPT-4o галюцинує приблизно в 3% випадків (OpenAI eval), менші моделі — 10-20%.`,
    example: "Юридична фірма тестувала base ChatGPT для аналізу контрактів: у 9 з 50 відповідей були неіснуючі статті законів або неправильні прецеденти. RAG-система з конкретним корпусом законодавства: 0 неіснуючих посилань в 200 тестових запитах.",
    relatedTerms: ["rag", "llm", "fine-tuning"],
    relatedService: "artificial-intelligence",
    relatedBlogPost: "ai-rag-healthcare-gdpr",
    relatedNichePage: "/ai/legal"
  },
  {
    slug: "explainable-ai",
    termUk: "XAI — Пояснювальний AI",
    termEn: "XAI (Explainable Artificial Intelligence)",
    category: "ai",
    shortDescription: "Методи що дозволяють зрозуміти чому ML-модель прийняла конкретне рішення. Регуляторна вимога FCA (UK), ЄС AI Act та GDPR Article 22 для автоматизованих рішень.",
    fullDescription: `Explainable AI (XAI) — набір методів та технік для пояснення рішень ML-моделей людиною-зрозумілим чином. Протиставляється 'black-box' моделям де вхід → вихід без пояснення.\n\nМетоди XAI:\n- **SHAP** (SHapley Additive exPlanations): найпопулярніший, розкладає передбачення на внески ознак\n- **LIME** (Local Interpretable Model-agnostic Explanations): локальна апроксимація\n- **Counterfactual Explanations**: "що б змінилось якби X = Y"\n- **Attention maps**: для трансформерів — які токени впливали на рішення\n- **Saliency maps**: для Computer Vision — які пікселі важливі\n\nРегуляторні вимоги:\n- **GDPR Art. 22**: право на пояснення автоматизованого рішення\n- **FCA Consumer Duty (2023, UK)**: "good outcomes" — рішення, що впливають на клієнтів, повинні бути пояснювані\n- **EU AI Act**: "high-risk AI systems" (кредит, наймання, медицина) повинні мати explainability\n- **ECOA (США)**: adverse action notice для кредитних відмов\n\nBusiness value: XAI дозволяє debuggiti моделі, виявляти bias, будувати довіру клієнтів та регуляторів.`,
    example: "UK insurtech впровадив XAI для системи страхових тарифів: кожна ціна містить топ-3 фактори ('Ваш тариф на 12% вищий середнього через: вік авто +7%, регіон +3%, пробіг +2%'). NPS після впровадження прозорості: +18 пунктів.",
    relatedTerms: ["shap", "machine-learning", "fca-compliance"],
    relatedService: "machine-learning",
    relatedBlogPost: "fca-ml-explainability-guide",
    relatedNichePage: "/ml/banking"
  },
  {
    slug: "model-drift",
    termUk: "Model Drift — Деградація моделі",
    termEn: "Model Drift",
    category: "ai",
    shortDescription: "Погіршення точності ML-моделі з часом через зміну розподілу реальних даних відносно тренувальних. Вимагає моніторингу та перенавчання. Критично для фінансових та HR моделей.",
    fullDescription: `Model Drift — явище коли ML-модель, яка добре працювала на старт, поступово погіршується через зміну реального світу.\n\nТипи drift:\n- **Data drift** (covariate shift): розподіл вхідних ознак змінився (напр. COVID змінив поведінкові патерни клієнтів)\n- **Concept drift**: зв'язок між ознаками і цільовою змінною змінився (шахрайські патерни еволюціонують)\n- **Prediction drift**: розподіл виходу моделі зміщується без зміни входу\n- **Label drift**: реальні результати (labels) змінились\n\nВиявлення:\n- **Population Stability Index (PSI)**: PSI > 0.2 = серйозний drift\n- **Kolmogorov-Smirnov test**: статистичний тест зміни розподілу\n- **Evidently AI**: open-source ML monitoring, dashboards\n- **Whylogs**: data profiling для production\n\nMLOps відповідь:\n1. Автоматичний моніторинг PSI для кожної ознаки щотижня\n2. Alert коли PSI > 0.1\n3. Airflow DAG тригерить переоцінку на нових даних\n4. Якщо точність впала > 5% — автоматичний retraining pipeline\n\nЧастота: кредитні моделі рекомендується переоцінювати кожні 6-12 місяців, fraud detection — кожні 1-3 місяці.`,
    example: "Fraud detection модель банку: AUC 0.94 на старт, через 18 місяців — 0.81 (шахрайські патерни еволюціонували). MLOps моніторинг з PSI-алертами: автоматичний retraining щоквартально, AUC стабілізувався на 0.93.",
    relatedTerms: ["machine-learning", "mlops", "anomaly-detection"],
    relatedService: "machine-learning",
    relatedBlogPost: "mlops-production-guide",
    relatedNichePage: "/ml/saas"
  },
  {
    slug: "transformer-model",
    termUk: "Transformer — Архітектура нейромережі",
    termEn: "Transformer (Neural Network Architecture)",
    category: "ai",
    shortDescription: "Архітектура нейромережі на основі механізму уваги (attention), що революціонізувала NLP та Computer Vision. Основа GPT, BERT, CLIP та більшості сучасних AI-моделей.",
    fullDescription: `Transformer — архітектура нейромережі, запропонована Google у статті 'Attention Is All You Need' (2017). Замінила RNN/LSTM для обробки послідовностей завдяки механізму Self-Attention.\n\nКлючові компоненти:\n- **Self-Attention**: кожен токен 'дивиться' на всі інші токени і визначає їх відносну важливість\n- **Multi-Head Attention**: кілька паралельних attention heads вловлюють різні типи залежностей\n- **Positional Encoding**: додає інформацію про позицію токена (оскільки attention не має поняття порядку)\n- **Feed-Forward Network**: нелінійне перетворення після attention\n\nТипи Transformer:\n- **Encoder-only** (BERT, RoBERTa): класифікація, NER, embedded representations\n- **Decoder-only** (GPT-4, Claude, Gemini): авторегресивна генерація тексту\n- **Encoder-Decoder** (T5, BART): translation, summarization\n\nMasking у GPT: causal masking не дозволяє 'дивитись у майбутнє' під час генерації.\n\nВізія: ViT (Vision Transformer) застосовує той самий механізм до патчів зображень — основа CLIP та сучасних diffusion моделей.`,
    example: "GPT-4o — decoder-only Transformer з ~1.7T параметрів. BERT-base — encoder-only, 110M параметрів, fine-tuning для класифікації відгуків займає 2 години на Tesla T4, точність 94.2% vs 79% classical ML.",
    relatedTerms: ["llm", "rag", "fine-tuning"],
    relatedService: "artificial-intelligence",
    relatedBlogPost: "ai-rag-healthcare-gdpr",
    relatedNichePage: "/ai/marketing"
  },
  {
    slug: "demand-forecasting",
    termUk: "Demand Forecasting — Прогнозування попиту",
    termEn: "Demand Forecasting",
    category: "ai",
    shortDescription: "ML-прогнозування майбутнього попиту на товари або послуги. Комбінація XGBoost (feature-based) та Prophet (seasonality) дає MAPE 8-12% проти 25-30% у ручного планування.",
    fullDescription: `Demand Forecasting — передбачення майбутніх продажів/попиту для оптимізації запасів, виробництва та закупівель. ML значно перевершує класичні статистичні методи (ARIMA, простий exponential smoothing) через здатність враховувати зовнішні сигнали.\n\nPipeline:\n1. **Дані**: isторія продажів (3+ роки), ціни, промоакції, конкуренти, погода, свята\n2. **Feature engineering**: rolling averages (7/14/28/90 днів), lag features, seasonality indicators\n3. **Моделі**: XGBoost для feature-based + Prophet для trend/seasonality decomposition\n4. **Ансамбль**: weighted average XGBoost + Prophet\n5. **Оцінка**: MAPE на out-of-time holdout (останні 3 місяці)\n\nUK специфіка:\n- Bank holiday effects: Easter, Bank Holiday Mondays суттєво впливають\n- School holiday schedules (8 регіонів з різними датами)\n- Met Office API для погодних ознак\n\nРівні прогнозування:\n- **SKU-level**: максимальна точність, але обчислювально важко\n- **Category-level**: для стратегічного планування\n- **Location-level**: для омніканальної дистрибуції`,
    example: "UK grocery chain (120 магазинів, 15,000 SKU): XGBoost + Prophet замість Excel planning. MAPE: 27% → 8.3%. Надлишкові запаси: -34% (-£1.4M/рік). Stockouts топ-500 SKU: 8.3% → 3.1%. Час покупця на планування запасів: -67%.",
    relatedTerms: ["machine-learning", "mape", "timescaledb"],
    relatedService: "machine-learning",
    relatedBlogPost: "ml-demand-forecasting-retail",
    relatedNichePage: "/ml/retail"
  },
  {
    slug: "time-series",
    termUk: "Time Series — Часові ряди",
    termEn: "Time Series",
    category: "ai",
    shortDescription: "Послідовність числових спостережень впорядкованих за часом з рівними інтервалами. Основа для прогнозування попиту, IoT-моніторингу, фінансів та predictive maintenance.",
    fullDescription: `Time Series — набір даних де кожне спостереження прив'язане до конкретного моменту часу. Особливість: спостереження НЕ незалежні, минуле впливає на майбутнє.\n\nКомпоненти time series:\n- **Trend**: довгострокова спрямованість (зростання/спадання)\n- **Seasonality**: регулярні циклічні коливання (щотижнева, щорічна)\n- **Residual**: випадковий шум після вилучення trend і seasonality\n\nМоделі:\n- **ARIMA/SARIMA**: класичні статистичні, потребують стаціонарності\n- **Prophet** (Meta): автоматична декомпозиція trend + seasonality + holidays\n- **LSTM**: нейромережі для складних залежностей\n- **XGBoost з lag features**: найпрактичніший для табличних TS\n- **Temporal Fusion Transformer (TFT)**: сучасний SOTA для multi-horizon\n\nІнфраструктура:\n- **TimescaleDB**: PostgreSQL для зберігання (10k+ записів/сек)\n- **Kafka**: streaming time series з IoT\n- **InfluxDB**: альтернатива для чистих metrics\n- **Grafana**: visualization\n\nЗастосування: demand forecasting (ритейл), predictive maintenance (IoT), anomaly detection (фінанси), energy forecasting, patient monitoring.`,
    example: "IoT-моніторинг заводу: 340 датчиків × 1 вимір/сек → 29.4M точок/добу. TimescaleDB + Grafana real-time dashboard. LSTM на 30-денних вікнах: попередження про перегрів за 18 годин до появи (vs 0 хвилин у ручному моніторингу).",
    relatedTerms: ["machine-learning", "timescaledb", "predictive-maintenance"],
    relatedService: "machine-learning",
    relatedBlogPost: "ml-predictive-maintenance-lstm",
    relatedNichePage: "/ml/energy"
  },
  {
    slug: "ueba",
    termUk: "UEBA — Поведінкова аналітика",
    termEn: "UEBA (User and Entity Behavior Analytics)",
    category: "ai",
    shortDescription: "ML-аналіз поведінки користувачів та пристроїв для виявлення інсайдерських загроз, скомпрометованих облікових записів і аномальних дій що не спрацьовують у правилах SIEM.",
    fullDescription: `UEBA (User and Entity Behavior Analytics) — технологія кібербезпеки що використовує ML для побудови baseline нормальної поведінки і виявлення відхилень.\n\nЩо моніториться:\n- **Час активності**: коли користувач зазвичай входить, до яких систем\n- **Об'єм даних**: скільки скачує/завантажує за типовий день\n- **Геолокація**: з яких IP/регіонів зазвичай підключається\n- **Privilege usage**: які права використовує та як часто\n- **Application behavior**: які системи відкриває, яких зазвичай не торкається\n\nAlgorithms:\n- **Peer group analysis**: порівняння з колегами зі схожою роллю\n- **Entity risk scoring**:累積 risk score замість бінарних alerts\n- **Sequence modeling** (LSTM): патерни поведінки протягом сесії\n\nСценарії виявлення:\n- **Insider threat**: аналітик скачує 47GB за 3 дні до звільнення\n- **Account takeover**: вхід з незвичайного міста о 3:00 ночі → lateral movement\n- **Data exfiltration**: незвично великий upload на external storage\n- **Privilege escalation**: спроби доступу до ресурсів поза роллю\n\nВідмінність від SIEM rules: правила спрацьовують на відомі патерни, UEBA виявляє незнайомі аномалії без наперед написаних правил.`,
    example: "Фінансова компанія (600 співробітників): SIEM + ML UEBA. Insider threat: аналітик за 3 дні до звільнення скачав 47GB customer data. SIEM rules не спрацювали. UEBA: risk score 94/100, автоматичне розслідування. DLP-інцидент запобіжений.",
    relatedTerms: ["anomaly-detection", "siem", "machine-learning"],
    relatedService: "machine-learning",
    relatedBlogPost: "ml-ueba-insider-threat",
    relatedNichePage: "/ml/cybersecurity"
  },
  {
    slug: "ltv",
    termUk: "LTV — Довічна цінність клієнта",
    termEn: "LTV (Customer Lifetime Value)",
    category: "ai",
    shortDescription: "Загальний прогнозований дохід від клієнта за весь час взаємодії. ML-прогноз LTV дозволяє диференціювати витрати на утримання і виявляти 'at-risk' клієнтів до відтоку.",
    fullDescription: `Customer Lifetime Value (LTV/CLV) — прогнозований чистий дохід від клієнта протягом всього часу його взаємодії з продуктом/сервісом.\n\nФормула (спрощена):\n**LTV = ARPU × Gross Margin × Average Customer Lifespan**\n\nАбо через ML (probabilistic approach):\n- **BG/NBD модель**: Pareto/NBD для транзакційних даних — ймовірність що клієнт ще активний\n- **Gamma-Gamma**: прогноз середнього чека для активних клієнтів\n- **LSTM/XGBoost**: для SaaS з subscription data — прогноз часу до churn × MRR\n\nАпплікації ML-LTV:\n- **Acquisition**: bid higher for high-LTV customer segments\n- **Retention**: identify customers at LTV inflection point — intervene before churn\n- **Segmentation**: high/medium/low LTV → різні playbooks\n- **Product**: feature adoption correlation з LTV\n\nUK SaaS benchmark:\n- LTV:CAC ratio > 3:1 — стійкий бізнес\n- Payback period < 12 місяців — хороша unit economics\n- Monthly churn < 2% для mid-market, < 0.5% для enterprise`,
    example: "B2B SaaS (CRM для SMB): ML-LTV модель на основі onboarding behavior. Клієнти що використовували API integration в перший місяць: LTV 3.8x вищий. Onboarding team переорієнтувалась на просування API adoption → LTV cohort +42%.",
    relatedTerms: ["machine-learning", "churn-prediction", "mlops"],
    relatedService: "machine-learning",
    relatedBlogPost: "saas-ltv-prediction-ml",
    relatedNichePage: "/ml/saas"
  },
  {
    slug: "isolation-forest",
    termUk: "Isolation Forest — Алгоритм виявлення аномалій",
    termEn: "Isolation Forest",
    category: "ai",
    shortDescription: "Несупервізований ML-алгоритм для виявлення аномалій. Ізолює аномалії через випадкові розбиття дерева — аномалії ізолюються швидше. Ідеальний коли немає розмічених прикладів шахрайства.",
    fullDescription: `Isolation Forest — алгоритм виявлення аномалій заснований на ідеї: аномальні точки ізолюються від решти за допомогою меншої кількості розбиттів в дереві рішень.\n\nПринцип роботи:\n1. Будується ансамбль з T випадкових дерев (isolation trees)\n2. Кожне дерево рекурсивно розбиває простір ознак випадковими розбиттями\n3. Аномальна точка (далеко від кластеру 'нормальних') ізолюється за кілька кроків\n4. Нормальна точка потребує багато кроків щоб бути ізольованою\n5. **Anomaly score** = середня глибина ізоляції по всіх деревах (менше = аномальніше)\n\nПереваги:\n- Не потребує labeled даних (unsupervised)\n- Масштабується на великих датасетах (O(n log n))\n- Стійкий до curse of dimensionality\n- Швидкий inference (десятки мілісекунд)\n\nНедоліки:\n- Не пояснює чому точка аномальна (потрібен SHAP)\n- Чутливий до irrelevant features\n- Не ловить anomalies в щільних кластерах\n\nПорівняння: Isolation Forest (general-purpose, fast) vs LOF (density-based, better for local) vs One-Class SVM (kernel-based, slower) vs LSTM Autoencoder (sequential data).`,
    example: "AML система: 1.2M транзакцій/місяць. Isolation Forest (250 дерев, contamination=0.005): 6,000 anomaly scores > threshold. Після фільтрації бізнес-правилами: 680 alerts. Precision: 69%, Recall: 98.7% vs 94% FPR у rule-based системи.",
    relatedTerms: ["anomaly-detection", "machine-learning", "aml"],
    relatedService: "machine-learning",
    relatedBlogPost: "ml-fraud-anomaly-detection-fca",
    relatedNichePage: "/ml/cybersecurity"
  },
  {
    slug: "dynamic-pricing",
    termUk: "Dynamic Pricing — Динамічне ціноутворення",
    termEn: "Dynamic Pricing",
    category: "ai",
    shortDescription: "ML-система що автоматично змінює ціни в реальному часі залежно від попиту, конкурентів, часу доби та запасів. Amazon оновлює ціни кожні 10 хвилин — ML дозволяє це для будь-якого ритейлера.",
    fullDescription: `Dynamic Pricing — автоматичне ціноутворення на основі алгоритмів замість фіксованих прайс-листів.\n\nФактори для ML-моделі ціни:\n- **Demand signals**: поточний рівень продажів, сезонність, свята\n- **Competitor prices**: парсинг конкурентів (Octoparse, Scrapy + proxies)\n- **Inventory level**: stockout risk → ціна вгору; overstock → знижка\n- **Time patterns**: час доби, день тижня, залишок до закриття\n- **Customer segment**: loyalty tier, conversion probability\n- **Elasticity**: price-demand curve per SKU (estimated via A/B tests)\n\nАрхітектура:\n1. Data layer: ERP/POS + competitor scraper + demand forecast\n2. ML model: Gradient Boosting на regression (predict optimal price)\n3. Constraints: min/max price bounds, competitor parity rules\n4. Real-time engine: pricing rules applied per request (<50ms)\n5. A/B testing: continuous price experiment framework\n\nUK Compliance: UK Competition Act 1998 забороняє price coordination з конкурентами навіть через алгоритми ('algorithmic collusion').`,
    example: "UK online electronics retailer: dynamic pricing на 8,200 SKU. Margin: +3.2 pp (було 18% → стало 21.2%). Revenue: +7.4%. Без єдиного stockout на flagship products. A/B test тривав 8 тижнів перед повним rollout.",
    relatedTerms: ["machine-learning", "demand-forecasting", "mape"],
    relatedService: "machine-learning",
    relatedBlogPost: "retail-dynamic-pricing-ml",
    relatedNichePage: "/ml/retail"
  },
  {
    slug: "mrr",
    termUk: "MRR — Щомісячний регулярний дохід",
    termEn: "MRR (Monthly Recurring Revenue)",
    category: "ai",
    shortDescription: "Базова метрика SaaS-бізнесу: сума всіх регулярних (subscription) платежів за місяць. ML використовує MRR для LTV прогнозування, churn detection та revenue forecasting.",
    fullDescription: `Monthly Recurring Revenue (MRR) — стандартна метрика SaaS що вимірює передбачуваний щомісячний дохід від активних підписок.\n\nКомпоненти MRR:\n- **New MRR**: дохід від нових клієнтів цього місяця\n- **Expansion MRR**: upsell/cross-sell існуючих клієнтів\n- **Contraction MRR**: downgrade клієнтів\n- **Churned MRR**: втрачений дохід від клієнтів що пішли\n- **Net New MRR** = New + Expansion − Contraction − Churned\n\nMLops для MRR:\n- **Churn prediction**: виявити клієнтів що ризикують churned MRR\n- **Expansion ML**: predict upsell readiness за feature usage patterns\n- **Revenue forecasting**: ARIMA/Prophet на MRR timeseries\n- **Cohort LTV**: predict 12/24-month LTV з onboarding поведінки\n\nKey benchmarks (SaaS):\n- Net MRR churn < 0% (negative churn = expansion > churn) — ідеал\n- Monthly gross churn < 2% — прийнятно для SMB SaaS\n- MRR growth > 15%/місяць — growth stage\n- Quick Ratio > 4 (new+expansion / churn+contraction) — healthy growth`,
    example: "B2B SaaS (£180 ARPU): ML alert коли MRR contraction risk > 70%. Автоматичний outreach від Customer Success за 14 днів до renewal. Контракт збережено в 64% випадків. Net MRR churn: -1.2% (expansion перевищує churn).",
    relatedTerms: ["machine-learning", "churn-prediction", "ltv"],
    relatedService: "machine-learning",
    relatedBlogPost: "saas-ltv-prediction-ml",
    relatedNichePage: "/ml/saas"
  },
  {
    slug: "vrp",
    termUk: "VRP — Задача маршрутизації транспорту",
    termEn: "VRP (Vehicle Routing Problem)",
    category: "ai",
    shortDescription: "Оптимізаційна задача: знайти найефективніші маршрути для парку транспортних засобів з урахуванням вантажопідйомності, часових вікон і географії. Вирішується OR-Tools або генетичними алгоритмами.",
    fullDescription: `Vehicle Routing Problem (VRP) — класична задача комбінаторної оптимізації: маючи парк транспортних засобів і список точок доставки, знайти набір маршрутів що мінімізує загальну відстань/час/вартість.\n\nВаріанти VRP:\n- **CVRP** (Capacitated): кожен транспортний засіб має ліміт вантажу\n- **VRPTW** (Time Windows): кожна точка доставки має часове вікно\n- **DVRP** (Dynamic): нові замовлення надходять в реальному часі\n- **MDVRP** (Multi-Depot): кілька депо\n\nАлгоритми:\n- **OR-Tools** (Google): найпоширеніший, supports CVRP + VRPTW, open-source\n- **Lin-Kernighan heuristic**: для великих задач\n- **Genetic Algorithm**: еволюційна оптимізація\n- **Reinforcement Learning**: для dynamic routing (нові замовлення протягом дня)\n\nOR-Tools pipeline:\n1. Завантажуємо замовлення: адреси, ваги, time windows\n2. Геокодування → distance matrix (Google Maps або OSRM)\n3. OR-Tools solver (time limit: 30 сек для 200 зупинок)\n4. Вивід: маршрут для кожного водія\n5. Оновлення в реальному часі при нових замовленнях\n\nПрактика: 200 зупинок оптимально вирішуються за <1 хвилину. 1000+ зупинок — cluster-first-route-second підхід.`,
    example: "UK logistics SMB (12 фургонів, 87 доставок/день): OR-Tools VRPTW. До впровадження: середній маршрут 142 км, 9.2 зупинки/год. Після: 118 км (-17%), 11.4 зупинки/год (+24%). Fuel cost: -£2,800/місяць.",
    relatedTerms: ["machine-learning", "demand-forecasting"],
    relatedService: "machine-learning",
    relatedBlogPost: "vrp-route-optimization-ortools",
    relatedNichePage: "/ml/logistics"
  },
  {
    slug: "cohort-analysis",
    termUk: "Cohort Analysis — Когортний аналіз",
    termEn: "Cohort Analysis",
    category: "ai",
    shortDescription: "Аналіз поведінки групи клієнтів набраних в один часовий період. Виявляє чи покращується retention нових когорт відносно старих — ключовий інструмент для SaaS і e-commerce.",
    fullDescription: `Cohort Analysis — метод аналізу де користувачі групуються за часом першого контакту (acquisition cohort) або дією (behavioral cohort) і відстежуються протягом часу.\n\nТипи когорт:\n- **Acquisition cohort**: всі клієнти що зареєструвались в тижні X\n- **Behavioral cohort**: всі хто виконав певну дію (перший purchase, activation)\n- **Revenue cohort**: по першому платежу (для LTV аналізу)\n\nKey metrics per cohort:\n- **Retention rate**: % клієнтів що повернулись через 1/7/30/90 днів\n- **Revenue retention**: % MRR збережено через N місяців\n- **LTV by cohort**: який loaded LTV показують різні acquisition channels\n- **Churn by cohort**: чи новіші когорти краще утримуються (product improvement signal)\n\nML + Cohort:\n- Predict which features at week 1 correlate with 12-month retention\n- Early warning: cohorts з аномально низьким day-7 retention → product team alert\n- Marketing attribution: cohort LTV per acquisition channel → budget allocation\n\nИнструменти: Amplitude, Mixpanel (product analytics з вбудованим cohort), або Python (pandas pivot_table + matplotlib heatmap) для custom analysis.`,
    example: "SaaS платформа виявила: когорти що використали API в перший тиждень мають 12-місячну retention 78% vs 31% без API. Onboarding тепер обов'язково включає API quickstart. Наступна когорта: retention 71% (+129% відносно базового).",
    relatedTerms: ["machine-learning", "churn-prediction", "ltv"],
    relatedService: "machine-learning",
    relatedBlogPost: "saas-ltv-prediction-ml",
    relatedNichePage: "/ml/saas"
  },
  {
    slug: "edge-computing",
    termUk: "Edge Computing — Периферійні обчислення",
    termEn: "Edge Computing",
    category: "ai",
    shortDescription: "Виконання ML-інференсу безпосередньо на пристрої (камера, датчик, PLC) без відправки даних в хмару. Критично для real-time Computer Vision на виробництві та низькозатримкових IoT рішень.",
    fullDescription: `Edge Computing — парадигма де обробка даних відбувається близько до джерела (на пристрої або edge сервері) замість відправки в центральний хмарний дата-центр.\n\nПереваги для AI/ML:\n- **Latency**: inference на камері — <10мс vs cloud round-trip 50-200мс\n- **Bandwidth**: не потрібно передавати raw відео (100+ Mbps) — лише результати\n- **Privacy**: сирі дані (обличчя, медичні) не покидають пристрій\n- **Reliability**: працює без інтернету\n\nHardware для ML на edge:\n- **NVIDIA Jetson** (Nano/Xavier/Orin): GPU-прискорення, PyTorch/TensorRT\n- **Google Coral TPU**: edge ML accelerator, TensorFlow Lite\n- **Intel OpenVINO**: оптимізація для Intel CPU/FPGA\n- **Apple Neural Engine**: Core ML на iPhone/iPad\n- **ARM Cortex-M + TinyML**: мікроконтролери, TensorFlow Lite Micro\n\nМоделі для edge:\n- **YOLOv8n/s**: нано та small варіанти для real-time detection\n- **MobileNetV3**: ефективна класифікація\n- **TensorFlow Lite**: квантизація INT8 — 4x менше пам'яті\n- **ONNX Runtime**: cross-platform inference\n\nProductionization: OTA (Over-The-Air) оновлення моделей через Fleet management (Balena, AWS Greengrass).`,
    example: "Виробнича лінія: NVIDIA Jetson Xavier + YOLOv8s для дефект-детекції. Inference 12ms/кадр при 60fps. Дефектні деталі відхиляються механічним актуатором за 8ms. Точність: 97.3%. Передається лише metadata (defect type, count) — не відео.",
    relatedTerms: ["computer-vision", "machine-learning", "predictive-maintenance"],
    relatedService: "machine-learning",
    relatedBlogPost: "ai-quality-control-manufacturing",
    relatedNichePage: "/ml/energy"
  },
  {
    slug: "hl7",
    termUk: "HL7 — Стандарт медичних даних",
    termEn: "HL7 (Health Level 7)",
    category: "ai",
    shortDescription: "Міжнародний стандарт обміну клінічними та адміністративними медичними даними між різними системами. Версія FHIR R4 є найактуальнішою для нових інтеграцій з NHS, HELSI та іншими MIS.",
    fullDescription: "HL7 (Health Level Seven) — сімейство міжнародних стандартів для обміну електронними медичними даними.\n\nВерсії:\n- HL7 v2.x: текстовий pipes-and-carets формат, широко використовується в legacy системах\n- HL7 FHIR R4: RESTful API + JSON/XML, сучасний стандарт. Обов'язковий для NHS Digital та HELSI\n\nКлючові ресурси FHIR R4: Patient, Observation (лаб), Condition (ICD-10), MedicationRequest, Encounter, DiagnosticReport.\n\nML + FHIR: автоматичне завантаження клінічних фічей для ML-моделей кожні 4 год. Стандартизована структура → переносимість моделей між лікарнями. Python: бібліотека fhirclient або requests.",
    example: "NHS trust: FHIR R4 endpoint для EHR (EMIS). ML-модель читає Observation + Condition + Encounter → генерує риск-скор пацієнта без ручного вивантаження даних.",
    relatedTerms: ["clinical-nlp", "patient-risk-scoring", "snomed-ct"],
    relatedService: "machine-learning",
    relatedBlogPost: "ml-patient-readmission-nhs",
    relatedNichePage: "/ai/healthcare"
  },
  {
    slug: "clinical-nlp",
    termUk: "Clinical NLP — Клінічна обробка природної мови",
    termEn: "Clinical NLP (Natural Language Processing)",
    category: "ai",
    shortDescription: "Методи NLP адаптовані для медичних текстів: витягування діагнозів, симптомів і ліків з лікарських записів та виписок. Основа медичних RAG-систем і автоматизованого кодування ICD-10.",
    fullDescription: "Clinical NLP — спеціалізована галузь NLP що працює з медичними текстами: клінічними нотатками, виписками, протоколами.\n\nКлючові завдання:\n- Named Entity Recognition (NER): ліки, дози, діагнози, симптоми\n- ICD-10 coding: автоматичне кодування діагнозів\n- Negation detection: «пацієнт НЕ має болю» — важливо для точності\n- Temporal reasoning: «3 дні тому з'явились симптоми»\n\nМоделі: BioBERT / ClinicalBERT, Med7, SciSpaCy, GPT-4o (zero-shot).\n\nЗастосування в RAG: clinical notes → chunks → FHIR-structured entities → vector store → semantic search по запиту лікаря.",
    example: "Система аналізу виписок: GPT-4o витягує ICD-10 діагнози, ліки, дози. 500 виписок/день автоматично. Точність NER: 94.2%. Економія: 3 FTE кодувальників.",
    relatedTerms: ["hl7", "rag", "snomed-ct"],
    relatedService: "artificial-intelligence",
    relatedBlogPost: "ai-rag-healthcare-gdpr",
    relatedNichePage: "/ai/healthcare"
  },
  {
    slug: "snomed-ct",
    termUk: "SNOMED CT — Клінічна термінологія",
    termEn: "SNOMED CT (Systematized Nomenclature of Medicine – Clinical Terms)",
    category: "ai",
    shortDescription: "Найбільший стандартизований словник клінічних термінів (350 000+ концептів). Дозволяє ML-моделям уникати неоднозначності медичних термінів і порівнювати дані між різними системами.",
    fullDescription: "SNOMED CT — комплексна клінічна термінологія з 350 000+ концептів та їхніх зв'язків (Is-a ієрархія).\n\nVS ICD-10: ICD-10 для статистики та billing (14 000 кодів); SNOMED CT для клінічної документації (350 000+ концептів). Часто використовуються разом.\n\nВикористання в ML:\n- Feature engineering: SNOMED hierarchy як ознака (замість raw ICD-10)\n- Normalization: «серцева недостатність» = «СН» = «Heart failure» — один концепт\n- Ontology-based similarity: близькі в ієрархії концепти мають семантичну схожість\n\nUK: NHS обов'язково використовує SNOMED CT в усіх нових EHR системах з 2023.",
    example: "Patient risk scoring: замість raw ICD-10 використовує SNOMED CT ancestors. 'Diabetic nephropathy' успадковує 'Kidney disease' + 'Diabetes complication'. AUC-ROC: +0.04 відносно ICD-10 only.",
    relatedTerms: ["clinical-nlp", "hl7"],
    relatedService: "machine-learning",
    relatedBlogPost: "ml-patient-readmission-nhs",
    relatedNichePage: "/ai/healthcare"
  },
  {
    slug: "patient-risk-scoring",
    termUk: "Patient Risk Scoring — Скоринг ризику пацієнта",
    termEn: "Patient Risk Scoring (Clinical Risk Stratification)",
    category: "ai",
    shortDescription: "ML-система що присвоює кожному пацієнту числовий ризик-скор (ускладнення, повторна госпіталізація, летальність). Допомагає клінічній команді пріоритизувати увагу та запобігати ускладненням.",
    fullDescription: "Patient Risk Scoring — клінічна ML-система що оцінює вірогідність несприятливих подій для кожного пацієнта.\n\nОсновні цілі: readmission risk (30 днів), deterioration (24-48 год), mortality (SOFA/APACHE II + ML), sepsis prediction (за 6-12 год до ознак).\n\nМоделі: XGBoost/LightGBM (SHAP для пояснення), LSTM для time-series лаб+вітали, Logistic Regression як baseline.\n\nФічі: вік, лаб показники, вітальні знаки (NEWS2), ICD-10 діагнози, анамнез госпіталізацій.\n\nXAI вимоги: лікарям потрібне пояснення — топ-5 факторів ризику + рекомендовані дії. SHAP вирішує цю проблему.",
    example: "NHS trust: XGBoost, 140 фічей. AUC-ROC 0.84 для 30-денного readmission. SHAP alert лікарю при risk > 0.7. 30-денний readmission: −34% за 6 місяців.",
    relatedTerms: ["hl7", "clinical-nlp", "readmission-risk"],
    relatedService: "machine-learning",
    relatedBlogPost: "ml-patient-readmission-nhs",
    relatedNichePage: "/ml/healthcare"
  },
  {
    slug: "readmission-risk",
    termUk: "Readmission Risk — Ризик повторної госпіталізації",
    termEn: "Hospital Readmission Risk (30-Day Readmission)",
    category: "ai",
    shortDescription: "Вірогідність повторного поступлення пацієнта в лікарню протягом 30 днів після виписки. ML-прогноз дозволяє проактивно втрутитись і суттєво знизити цей дорогий та небезпечний показник.",
    fullDescription: "Hospital Readmission Risk вимірює частоту повторних госпіталізацій в межах 30 днів після виписки.\n\nUK контекст: NHS публічно публікує readmission rates по лікарнях. Середній NHS показник ~11%. Фінансовий вплив: £2,800-4,500 за readmission.\n\nML pipeline: FHIR R4 дані → XGBoost/LSTM → risk score → threshold (0.6-0.7) → клінічна інтервенція.\n\nІнтервенції при high risk: телефонний моніторинг через 48-72 год, ранній огляд (5-7 днів vs 30), направлення до соціального працівника, medication reconciliation.\n\nBenchmark: ML системи досягають −30-40% від baseline readmission rate.",
    example: "ClinicalIQ (4 лікарні, Київ): 18.4% → 12.1% readmission (−34%) за 6 місяців. XGBoost, AUC-ROC 0.84. Top predictors: попередні госпіталізації, eGFR, Na.",
    relatedTerms: ["patient-risk-scoring", "hl7", "clinical-nlp"],
    relatedService: "machine-learning",
    relatedBlogPost: "ml-patient-readmission-nhs",
    relatedNichePage: "/ml/healthcare"
  },
  {
    slug: "false-positive-rate",
    termUk: "False Positive Rate — Рівень хибнопозитивних результатів",
    termEn: "False Positive Rate (FPR) / Type I Error",
    category: "ai",
    shortDescription: "Частка негативних прикладів що ML-модель неправильно класифікує як позитивні. Критично для систем виявлення шахрайства: висока FPR = тисячі заблокованих легітимних транзакцій щодня.",
    fullDescription: "FPR = FP / (FP + TN)\n\nФрод detection: FPR 0.01 = 1 з 100 легітимних транзакцій блокується. При 1M транзакцій/день: 10,000 хибних блокувань → дзвінки у підтримку, churn.\n\nTradeoff з Recall: низький FPR → більше шахрайства пропускається. ROC-AUC і PR-AUC дозволяють обрати оптимальний threshold.\n\nМедицина: FPR = частка здорових що тест показує «хворими». Для скринінгу: низький FPR критичний. Для важких хвороб: низький FNR важливіший.\n\nПов'язані: Precision = TP/(TP+FP), Specificity = 1-FPR, F1 Score.\n\nFCA SS1/23: вимагає документувати та моніторити FPR для банківських ML-моделей.",
    example: "FraudShield: FPR 0.3% vs industry benchmark 4.2%. 1M транзакцій/день → 3,000 хибних блокувань vs 42,000 раніше. −93% дзвінків у підтримку. Fraud loss: −82%.",
    relatedTerms: ["machine-learning", "auc-roc"],
    relatedService: "machine-learning",
    relatedBlogPost: "fca-ml-explainability-guide",
    relatedNichePage: "/ml/banking"
  },
  {
    slug: "eoq",
    termUk: "EOQ — Оптимальний розмір замовлення",
    termEn: "EOQ (Economic Order Quantity)",
    category: "ai",
    shortDescription: "Класична формула мінімізації витрат на управління запасами. ML доповнює EOQ динамічним прогнозуванням попиту замість статичного середнього — особливо важливо для сезонних товарів.",
    fullDescription: "EOQ = √(2DS/H)\n\nДе D = річний попит, S = вартість замовлення, H = вартість зберігання за рік.\n\nОбмеження класичного EOQ: припускає постійний попит, не враховує сезонність, lead time variability, кількісні знижки.\n\nML + Dynamic EOQ:\n1. XGBoost/Prophet прогноз D на наступні 4 тижні\n2. Safety stock = Z × σ_D × √(lead_time)\n3. Reorder point = D̂ × lead_time + safety_stock\n4. Order quantity = max(EOQ, Reorder_point - current_inventory)\n\nПри 50 000 SKU — повністю автоматизований процес з оновленням щотижня.",
    example: "UK grocery retailer (3,200 SKU): ML-EOQ з Prophet demand forecast. Waste: −31%, stockout rate: −44%, inventory turnover: +28%. Capital tied up: −£2.1M.",
    relatedTerms: ["demand-forecasting", "safety-stock", "fill-rate"],
    relatedService: "machine-learning",
    relatedBlogPost: "ml-demand-forecasting-retail",
    relatedNichePage: "/ml/retail"
  },
  {
    slug: "safety-stock",
    termUk: "Safety Stock — Страховий запас",
    termEn: "Safety Stock (Buffer Inventory)",
    category: "ai",
    shortDescription: "Додатковий запас товару понад розрахований середній попит для захисту від варіабельності попиту та затримок постачальників. ML оптимізує рівень по кожному SKU з урахуванням сезонності.",
    fullDescription: "Safety Stock = Z × σ_D × √(Lead_Time)\n\nДе Z = z-score для service level (98%→Z=2.05), σ_D = стандартне відхилення денного попиту.\n\nML-підходи:\n- Quantile regression: прогноз 95-го percentile → safety stock = Q95 - Q50\n- Probabilistic forecasting (DeepAR): uncertainty intervals\n- Monte Carlo на historical demand + lead time variability\n\nService level tradeoff: 99% service level = 3-4x більший safety stock ніж при 90%.\n\nABC-XYZ аналіз: A-items (high value) → вищий service level; perishables → safety stock = 0.",
    example: "UK fashion retailer: ML safety stock по 12,000 SKU. Seasonal items: safety stock знижується з 45 → 8 одиниць за 6 тижнів до кінця сезону. Inventory turnover: +34%. Markdown reduction: −£1.8M/рік.",
    relatedTerms: ["demand-forecasting", "eoq", "fill-rate"],
    relatedService: "machine-learning",
    relatedBlogPost: "ml-demand-forecasting-retail",
    relatedNichePage: "/ml/retail"
  },
  {
    slug: "fill-rate",
    termUk: "Fill Rate — Рівень виконання замовлень",
    termEn: "Fill Rate (Order Fill Rate / Line Fill Rate)",
    category: "ai",
    shortDescription: "Відсоток позицій замовлення виконаних повністю і вчасно без потреби в повторному постачанні. Ключова метрика для якості управління запасами та задоволеності B2B клієнтів.",
    fullDescription: "Fill Rate — метрика здатності виконувати замовлення зі складу наявних запасів.\n\nВиди:\n- Order Fill Rate: % замовлень виконаних повністю\n- Line Fill Rate: % рядків замовлення виконаних (кожна позиція)\n- Perfect Order Rate: правильно + вчасно + без пошкоджень\n\nML для підвищення fill rate: точний demand forecast → менше unexpected stockouts; supplier reliability scoring → вибір кращих постачальників; substitution ML: при stockout → пропозиція замінника.\n\nBenchmarks: B2B wholesale 95-98%, FMCG 99%+ для A-items, Amazon FBA 99.5%+.",
    example: "UK FMCG distributor: ML forecasting + dynamic safety stock. Fill rate: 91.3% → 97.8%. Backorders: −73%. NPS: +22. Revenue at risk від stockouts: −£4.2M/рік.",
    relatedTerms: ["demand-forecasting", "safety-stock", "eoq"],
    relatedService: "machine-learning",
    relatedBlogPost: "ml-supply-chain-optimisation",
    relatedNichePage: "/ml/retail"
  },
  {
    slug: "or-tools",
    termUk: "OR-Tools — Інструменти операційних досліджень",
    termEn: "OR-Tools (Operations Research Tools by Google)",
    category: "ai",
    shortDescription: "Open-source бібліотека Google для вирішення задач комбінаторної оптимізації: маршрутизація транспорту (VRP), планування змін, bin packing. Основний інструмент для логістичної оптимізації.",
    fullDescription: "OR-Tools — відкрита бібліотека оптимізації від Google:\n\nCP-SAT solver (найпотужніший): employee scheduling, job shop scheduling.\n\nVehicle Routing (VRP): CVRP (capacity), VRPTW (time windows), PDVRP (pickup+delivery).\n\nLinear Programming (Glop): фінансова оптимізація, виробниче планування.\n\nVRP pipeline:\n1. Замовлення: адреси, ваги, time windows\n2. Геокодування → distance matrix (Google Maps або OSRM)\n3. OR-Tools RoutingModel + capacity/time constraints\n4. Solve (time limit: 30 сек для 200 зупинок)\n5. Маршрути → GPS/TMS інтеграція\n\nVS ML: OR-Tools — детермінована оптимізація; RL — для dynamic routing.",
    example: "UK logistics: 12 фургонів, 87 доставок/день. OR-Tools VRPTW. До: 142 км/маршрут. Після: 118 км (−17%). Fuel cost: −£2,800/місяць.",
    relatedTerms: ["vrp", "demand-forecasting", "machine-learning"],
    relatedService: "machine-learning",
    relatedBlogPost: "ml-supply-chain-optimisation",
    relatedNichePage: "/ml/logistics"
  },
  {
    slug: "customer-health-score",
    termUk: "Customer Health Score — Показник здоров'я клієнта",
    termEn: "Customer Health Score (CHS)",
    category: "ai",
    shortDescription: "Агрегований ML-показник що відображає вірогідність того що SaaS-клієнт залишиться з продуктом. Оцінює десятки сигналів: логіни, використання фічей, NPS, кількість звернень у підтримку.",
    fullDescription: "Customer Health Score — composite метрика для B2B SaaS що передбачає churn або expansion.\n\nСигнали CHS:\n- Product engagement (60-70%): DAU/MAU, feature adoption, session depth, power user ratio\n- Relationship signals (20-30%): NPS, support tickets, responsiveness\n- Commercial signals (10-20%): renewal date proximity, expansion, payment timeliness\n\nМоделі: Logistic Regression (baseline), XGBoost (нелінійні взаємодії), LSTM (weekly engagement sequences), Survival analysis (Cox PH для time-to-churn).\n\nАктиваційні пороги: 0-40 🔴 At risk → CS outreach 24h; 41-70 🟡 Monitor; 71-100 🟢 Healthy → expansion opportunity.",
    example: "B2B SaaS (450 accounts): XGBoost CHS, 34 фічі, AUC-ROC 0.91. CS team фокусується на 🔴 accounts → churn rate −28% за квартал з тими самими ресурсами.",
    relatedTerms: ["churn-prediction", "machine-learning", "ltv"],
    relatedService: "machine-learning",
    relatedBlogPost: "ml-churn-prediction-saas",
    relatedNichePage: "/ml/saas"
  },
  {
    slug: "behavioral-biometrics",
    termUk: "Behavioral Biometrics — Поведінкова біометрія",
    termEn: "Behavioral Biometrics",
    category: "ai",
    shortDescription: "ML-аналіз унікальних патернів поведінки: швидкість набору тексту, рухи миші, ритм натискань. Використовується для пасивної автентифікації та виявлення account takeover без friction для користувача.",
    fullDescription: "Behavioral Biometrics — ідентифікація особи за поведінковими патернами.\n\nСигнали:\n- Keystroke dynamics: dwell time, flight time між клавішами, typing rhythm\n- Mouse dynamics: speed, acceleration, click patterns\n- Mobile: touch pressure, swipe velocity, device orientation (gyroscope)\n- Gait: хода через акселерометр\n\nML-підходи: One-class SVM (навчання лише на нормальній поведінці), Siamese Networks (порівняння з еталоном), LSTM (sequences), Isolation Forest (аномалії real-time).\n\nGDPR: behavioral biometrics = biometric data (special category Art. 9). Потрібна explicit consent або legitimate interest assessment.\n\nЗастосування: continuous authentication, ATO detection, bot detection, AML compliance.",
    example: "UK neobank: behavioral biometrics + Isolation Forest. Account takeover detection: +76%. MTTD: 4.2 дні → 18 хвилин. FPR: 0.2%. Клієнти не помічають перевірки — пасивна верифікація у фоні.",
    relatedTerms: ["account-takeover", "geo-jump", "machine-learning"],
    relatedService: "machine-learning",
    relatedBlogPost: "ml-ueba-insider-threat-detection",
    relatedNichePage: "/ml/banking"
  },
  {
    slug: "geo-jump",
    termUk: "Geo-Jump — Географічний стрибок (неможлива подорож)",
    termEn: "Geo-Jump (Impossible Travel Detection)",
    category: "ai",
    shortDescription: "Аномалія безпеки: логін з Лондона а через 20 хвилин з Токіо. Фізично неможливо → account takeover або VPN. ML-системи кіберзахисту виявляють geo-jump за секунди і запускають step-up authentication.",
    fullDescription: "Geo-Jump (Impossible Travel) — аномалія безпеки коли дві автентифікації розділені часом недостатнім для фізичного переміщення.\n\nЛогіка виявлення:\n1. IP → геолокація (MaxMind GeoIP)\n2. Відстань між точками (Haversine formula)\n3. Мінімальний час = відстань / 900 км/год (літак)\n4. Реальний час < мінімальний → Geo-Jump\n\nНюанси: VPN → легальний geo-jump (cross-signal з device fingerprint). Business travellers → risk score, не hard block.\n\nML в UEBA: geo-jump як один із багатьох сигналів (+ behavioral biometrics + device fingerprint + time-of-day).\n\nІнтеграція: alert у SOC при risk > 0.8; step-up MFA при risk 0.6-0.8; session termination при risk > 0.95.",
    example: "Cybersecurity SaaS: Geo-Jump в UEBA. 847 ATO виявлено за місяць. MTTD: 3.2 хвилини. FPR: 0.31% (переважно VPN-користувачі).",
    relatedTerms: ["account-takeover", "behavioral-biometrics", "machine-learning"],
    relatedService: "machine-learning",
    relatedBlogPost: "ml-ueba-insider-threat-detection",
    relatedNichePage: "/ml/banking"
  },
  {
    slug: "account-takeover",
    termUk: "Account Takeover — Захоплення акаунту (ATO)",
    termEn: "Account Takeover (ATO)",
    category: "ai",
    shortDescription: "Вид шахрайства де зловмисник отримує несанкціонований доступ до акаунту через вкрадені credentials, phishing або credential stuffing. ML виявляє ATO за комбінацією аномалій: geo-jump, нова поведінка, незвичні дії.",
    fullDescription: "Account Takeover (ATO) — один з найбільш поширених і дорогих видів онлайн-шахрайства.\n\nВектори атак: credential stuffing (підбір з витоків), phishing, SIM swapping (обхід SMS 2FA), session hijacking, malware/keylogger.\n\nML-сигнали для ATO:\n1. Geo-Jump: фізично неможливе переміщення\n2. Device fingerprint change: нова ОС + браузер + мова\n3. Behavioral biometrics anomaly: нетипова швидкість набору\n4. Unusual actions: перший-ever password change + transfer out\n5. Time-of-day anomaly: о 3:00 ночі vs звичні 9-18\n6. Velocity: 500 req/хвилину (credential stuffing)\n\nМоделі: UEBA (baseline + anomaly), Graph ML (мережа пов'язаних ATO), Ensemble.\n\nFCA: Payment Services Regulations 2017 → банки зобов'язані мати контрзаходи від ATO.",
    example: "UK challenger bank: UEBA з behavioral biometrics + geo-jump. ATO: 347 → 82/місяць (−76%). MTTD: 4.2 дні → 18 хв. Fraud losses: −£2.1M/рік.",
    relatedTerms: ["behavioral-biometrics", "geo-jump", "machine-learning"],
    relatedService: "machine-learning",
    relatedBlogPost: "ml-ueba-insider-threat-detection",
    relatedNichePage: "/ml/banking"
  },
  {
    slug: "scada",
    termUk: "SCADA — Система диспетчерського управління",
    termEn: "SCADA (Supervisory Control and Data Acquisition)",
    category: "ai",
    shortDescription: "Промислова система збору даних і управління технологічними процесами. Джерело часових рядів для ML-моделей predictive maintenance, оптимізації виробництва та energy management.",
    fullDescription: "SCADA — промислова система що збирає дані з датчиків і надає інтерфейс для моніторингу та управління.\n\nАрхітектура: PLC/RTU (датчики) → communication network (OPC-UA, Modbus, MQTT) → SCADA server → Historian (OSIsoft PI, InfluxDB) → HMI.\n\nML + SCADA інтеграція: OPC-UA → Python клієнт → DataFrame → ML pipeline; MQTT для IIoT edge devices.\n\nЗастосування ML на SCADA-даних:\n- Predictive Maintenance: вібрація + температура → прогноз відмови за 2-4 тижні\n- Process Optimization: RL для параметрів (температура, тиск, швидкість)\n- Energy Optimization: прогноз та оптимізація споживання\n- Anomaly Detection: Isolation Forest на OEE metrics\n\nБезпека: SCADA часто air-gapped → дані через data diode або DMZ. ML деплоїться на edge servers в OT мережі.",
    example: "Automotive plant: SCADA (OPC-UA) + 847 датчиків → MQTT → InfluxDB → LSTM+XGBoost ensemble. Unplanned downtime: −73%. Maintenance cost: −£380K/рік.",
    relatedTerms: ["predictive-maintenance", "machine-learning"],
    relatedService: "machine-learning",
    relatedBlogPost: "predictive-maintenance-iot-ml",
    relatedNichePage: "/ml/manufacturing"
  },
  {
    slug: "comparable-sales",
    termUk: "Comparable Sales — Порівнянні продажі (Comps)",
    termEn: "Comparable Sales (Comps / Comparable Transactions)",
    category: "ai",
    shortDescription: "Метод оцінки нерухомості на основі нещодавніх продажів подібних об'єктів. ML-моделі автоматизують підбір і зважування comps для побудови точних AVM (Automated Valuation Model).",
    fullDescription: "Comparable Sales (Comps) — підхід де вартість нерухомості визначається на основі нещодавніх продажів аналогічних об'єктів у районі.\n\nКласичний підхід: пошук об'єктів (±20% площа, схоже розташування, 6-12 місяців) → коригування (площа, стан, поверх) → зважена середня.\n\nML замість ручних comps:\n- Hedonic Regression: price = f(площа, кімнати, район, стан)\n- XGBoost/LightGBM: нелінійні взаємодії\n- Geographically Weighted Regression: spatial features\n\nДата-джерела UK: HM Land Registry Price Paid (всі транзакції), Rightmove/Zoopla, EPC data, Ordnance Survey.\n\nAVM benchmark: MAPE 5-8% nationwide UK. RICS: AVM прийнятний для mortgage lending за певних умов.",
    example: "PropTech startup: ML AVM на Land Registry + EPC + OS. MAE: £4,200 (benchmark: £8,500 для ручного агента). 5,000+ оцінок/день. Mortgage assessment: 2 тижні → 4 хвилини.",
    relatedTerms: ["machine-learning", "rental-yield"],
    relatedService: "machine-learning",
    relatedBlogPost: "ml-property-valuation-land-registry",
    relatedNichePage: "/ml/real-estate"
  },
  {
    slug: "rental-yield",
    termUk: "Rental Yield — Прибутковість оренди",
    termEn: "Rental Yield (Gross / Net Rental Yield)",
    category: "ai",
    shortDescription: "Річний дохід від оренди як відсоток від вартості нерухомості. ML прогнозує rental yield для скринінгу інвестицій і допомагає знаходити недооцінені об'єкти з вищим потенціалом повернення.",
    fullDescription: "Gross Rental Yield = (Річна орендна плата / Вартість) × 100%\nNet Yield враховує витрати: management fee (8-12%), страхування, ремонт, void periods.\n\nUK Benchmarks (2024): Лондон 3-6%, Manchester 5-7%, Liverpool 7-8%, Birmingham 5-6%.\n\nML pipeline:\n- Фічі: координати, LSOA, property type, bedrooms, EPC rating, proximity to transport/schools\n- Target: ринкова орендна ставка\n- Модель: XGBoost + spatial features\n- Дані: Rightmove/Zoopla listings, Land Registry prices\n\nInvestment analysis: AVM (купівельна ціна) + ML rental forecast → gross/net yield → screening vs benchmark.\n\nUkraine: DOM.RIA, OLX + кадастрова вартість → менш стандартизований ринок = складніше ML завдання.",
    example: "PropTech platform: ML rental yield по 2.1M UK properties. MAPE 8.2% на rental price. Інвестори знаходять assets з yield > 7% в Manchester за <30 сек серед 150,000 лістингів.",
    relatedTerms: ["comparable-sales", "machine-learning"],
    relatedService: "machine-learning",
    relatedBlogPost: "ml-property-valuation-land-registry",
    relatedNichePage: "/ml/real-estate"
  },
  {
    slug: "variable-rate-application",
    termUk: "Variable Rate Application — Диференційоване внесення добрив",
    termEn: "Variable Rate Application (VRA) / Precision Agronomy",
    category: "ai",
    shortDescription: "Точне внесення добрив з різною нормою на різних ділянках поля на основі ML-аналізу ґрунту, NDVI та супутникових знімків. Скорочує витрати на добрива на 15-25% при збереженні або збільшенні врожайності.",
    fullDescription: "Variable Rate Application — ключова технологія точного землеробства де норма внесення агрохімікатів регулюється по зонах поля.\n\nАрхітектура VRA:\n1. Дані: Sentinel-2 (NDVI, NDRE), дрони, ґрунтові зонди (N, P, K, pH), IoT датчики\n2. ML аналіз: XGBoost/RF prescription maps; yield prediction; anomaly detection (хвороби, шкідники)\n3. Виконання: ISOBUS обприскувачі/сівалки з variable rate nozzles; RTK GPS (±2.5 cm)\n\nUK: SFI SW9/SW5 payments за precision application. ELMS environmental benefits.\n\nVRA Benefits: добрива −15-25%, пестициди −20-30%, врожайність +8-15%, CO₂ footprint знижено.",
    example: "UK farm 1,200 га: Sentinel-2 + ґрунтові зонди → XGBoost prescription maps → ISOBUS John Deere. N fertiliser: −22% при +6% yield. Saving: £18,400/рік. SFI payment: £12,800.",
    relatedTerms: ["precision-agriculture", "ndvi", "sentinel-2"],
    relatedService: "machine-learning",
    relatedBlogPost: "ml-precision-agriculture-satellite",
    relatedNichePage: "/ml/agritech"
  },

  {
    slug: "carbon-credits",
    termUk: "Carbon Credits — Вуглецеві кредити",
    termEn: "Carbon Credits (UK ETS)",
    category: "ai",
    shortDescription: "Одиниці торгівлі вуглецевими викидами. UK ETS (Emissions Trading Scheme) і ELMS scheme дозволяють фермерам заробляти на підтвердженому скороченні CO₂. ML-моніторинг забезпечує доказову базу.",
    fullDescription: `Carbon Credits — ринковий механізм для скорочення викидів парникових газів. 1 carbon credit = право на 1 тонну CO₂ еквіваленту.\n\nUK контекст:\n- **UK ETS** (Emissions Trading Scheme): post-Brexit аналог EU ETS, запущено 2021\n- **ELMS** (Environmental Land Management): держпрограма субсидій для землекористувачів\n- **Woodland Carbon Code**: верифіковані кредити за нові ліси\n- **Peatland Code**: відновлення торфовищ → carbon sequestration credits\n- **Soil Carbon**: IPCC-верифікований сиквестр вуглецю у ґрунті\n\nML роль у Carbon Credits:\n- **Baseline measurement**: Sentinel-2 NDVI + soil sensors для оцінки поточного стану\n- **Change detection**: моніторинг vegetation coverage over time\n- **Yield verification**: доведення що practices дійсно скоротили emissions\n- **Automated reporting**: генерація звітів для UK Land Carbon Registry\n- **Prediction**: estimate potential carbon revenue per field per year\n\nДохід для фермера:\n- Voluntary Carbon Market: $5-50/tonne CO₂ (Verra, Gold Standard)\n- UK ETS: ~£40-65/tonne (market price 2024)\n- SFI за soil health actions: £45-£67/га/рік\n\nТехнічний стек: Sentinel-2 API → NDVI timeseries → XGBoost carbon prediction → automated Defra-format report.`,
    example: "UK farm 850га: ML-моніторинг Sentinel-2 + IoT soil sensors підтвердив sequestration 1,840 tCO₂/рік. Sold at £52/tonne → £95,680 carbon revenue. SFI payments: +£38,250. Загальний нетрадиційний дохід: £133,930/рік.",
    relatedTerms: ["precision-agriculture", "sentinel-2", "elm-scheme"],
    relatedService: "machine-learning",
    relatedBlogPost: "agritech-carbon-credits-ml",
    relatedNichePage: "/ml/energy"
  },
  // === Core ML / AI terms for UK topical authority ===
  {
    slug: "data-drift",
    termUk: "Data Drift (дрейф даних)",
    termEn: "Data Drift",
    category: "ai",
    shortDescription: "Зміна статистичного розподілу вхідних даних, що призводить до деградації точності ML-моделі у продакшні.",
    fullDescription: `Data Drift — це явище, коли статистичний розподіл даних, що надходять до ML-моделі у продакшні, починає відрізнятися від розподілу тренувальних даних. Оскільки модель навчалась на одному розподілі, її точність на новому розподілі падає.\n\n**Типи дрейфу:**\n- **Covariate shift**: змінився розподіл вхідних features X (поведінка клієнтів, ринкові умови)\n- **Label shift**: змінився розподіл target variable Y (сезонність, тренди)\n- **Concept drift**: змінився зв'язок між X і Y (нові патерни шахрайства, нові клієнтські сегменти)\n\n**Методи виявлення:**\n- PSI (Population Stability Index) — найпоширеніший у фінансових моделях. PSI > 0.1 = сигнал тривоги, > 0.25 = критично\n- KL-divergence та Wasserstein distance для безперервних змінних\n- Kolmogorov-Smirnov test для порівняння розподілів\n- Evidently AI (open source) — автоматичні drift reports\n\n**Чому важливо:** Без моніторингу дрейфу fraud-detection модель, що показувала AUC 0.91 на тренуванні, може впасти до 0.74 через 6 місяців. Бізнес не помічає деградацію, доки не з'являються збитки.\n\n**MLOps рішення:** Автоматичний drift monitoring → alert при перевищенні порогу → тригер на перенавчання. Codeworth включає drift monitoring у кожен production ML deployment.`,
    example: "Fraud detection модель навчалась на транзакціях 2023 року. У 2024 з'явились нові схеми шахрайства (concept drift) — модель починає їх пропускати. PSI > 0.25 → автоматичне перенавчання.",
    relatedTerms: ["mlops", "model-monitoring", "xai-shap"],
    relatedService: "mlops",
    relatedBlogPost: "what-is-mlops-guide",
    relatedNichePage: "/ml/banking"
  },
  {
    slug: "shap-values",
    termUk: "SHAP Values (пояснення моделі)",
    termEn: "SHAP Values (SHapley Additive exPlanations)",
    category: "ai",
    shortDescription: "Математичний метод пояснення рішень ML-моделі: показує внесок кожного feature у конкретне передбачення.",
    fullDescription: `SHAP (SHapley Additive exPlanations) — метод інтерпретації ML-моделей, заснований на теорії ігор Шеплі. Він відповідає на питання: «чому модель прийняла саме таке рішення для цього конкретного спостереження?»\n\n**Що показують SHAP values:**\nДля кожного клієнта або транзакції SHAP генерує список features з їхнім внеском у рішення. Наприклад, для кредитної відмови:\n- Debt-to-income ratio: +0.23 (збільшує ризик)\n- Payment history: -0.15 (знижує ризик)\n- Employment duration: -0.08 (знижує ризик)\n\n**Чому SHAP критичний для UK бізнесу:**\n- **FCA PS21/3**: кредитори зобов'язані пояснити клієнту причини відмови — SHAP генерує ці пояснення автоматично\n- **GDPR Article 22**: право людини на пояснення автоматизованого рішення\n- **NHS DSPT**: медичні AI-системи вимагають explainability\n- **Consumer Duty**: захист споживачів від непрозорих алгоритмів\n\n**Типи SHAP:**\n- TreeSHAP (для XGBoost/LightGBM) — швидкий, точний\n- KernelSHAP (для будь-якої моделі) — повільніший, але universal\n- DeepSHAP (для нейромереж)\n\nCodeworth включає SHAP explanation layer у кожен production ML проєкт у регульованих галузях.`,
    example: "UK challenger bank: SHAP автоматично генерує adverse action letter для відхилених заявок. «Причина відмови: debt-to-income ratio 0.52 (порого 0.45) та 2 прострочення за 12 міс.» — FCA-compliant пояснення без ручної роботи.",
    relatedTerms: ["data-drift", "ml-model-explainability", "feature-importance"],
    relatedService: "machine-learning",
    relatedBlogPost: "ai-credit-scoring-fintech-uk",
    relatedNichePage: "/ml/banking"
  },
  {
    slug: "transfer-learning",
    termUk: "Transfer Learning (трансферне навчання)",
    termEn: "Transfer Learning",
    category: "ai",
    shortDescription: "Техніка ML, коли модель, навчена на одній задачі, використовується як основа для іншої — скорочуючи потребу в даних та час навчання.",
    fullDescription: `Transfer learning — метод, коли попередньо навчена (pre-trained) модель адаптується до нової задачі за допомогою fine-tuning на невеликому наборі специфічних даних.\n\n**Чому transfer learning важливий:**\nБез нього для навчання ефективної NLP-моделі потрібні мільйони прикладів. З transfer learning достатньо 500–5,000 специфічних прикладів, бо загальне розуміння мови вже «закодовано» в pre-trained моделі (BERT, GPT-4o).\n\n**Приклади в бізнесі:**\n- Fine-tuning BERT на 2,000 тікетів підтримки → класифікатор 14 категорій з F1 92%\n- Fine-tuning YOLO на 500 фото дефектів → QA-система для виробництва\n- Fine-tuning Whisper на медичній лексиці → транскрипція клінічних нотаток\n\n**Domain adaptation:**\nЗагальна модель (trained on Wikipedia) → адаптується до специфічного домену (медицина, право, фінанси) через fine-tuning на domain-specific corpus. Результат: model knows both general language AND your domain terminology.\n\n**UK context:** Моделі типу BERT, навчені на загальному корпусі, часто не розуміють UK-специфічного фінансового або медичного жаргону. Domain fine-tuning вирішує це з мінімальною кількістю прикладів.`,
    example: "Юридична фірма: BERT fine-tuned на 1,500 UK контрактів → NER модель витягує сторони, дати, суми, ризикові клаузи з precision 94%. Без transfer learning для такої точності потрібно 50,000+ прикладів.",
    relatedTerms: ["bert-nlp", "fine-tuning", "few-shot-learning"],
    relatedService: "nlp",
    relatedBlogPost: "nlp-consulting-uk",
    relatedNichePage: "/ml/banking"
  },
  {
    slug: "gradient-boosting",
    termUk: "Gradient Boosting (градієнтний бустинг)",
    termEn: "Gradient Boosting (XGBoost, LightGBM)",
    category: "ai",
    shortDescription: "Клас ансамблевих алгоритмів машинного навчання для табличних даних. XGBoost та LightGBM — найпопулярніші реалізації, що виграли тисячі Kaggle-змагань.",
    fullDescription: `Gradient boosting — техніка ensemble learning, де слабкі learner-и (зазвичай прості дерева рішень) поєднуються послідовно: кожне нове дерево виправляє помилки попереднього, мінімізуючи функцію втрат.\n\n**XGBoost vs LightGBM:**\n- **XGBoost** (eXtreme Gradient Boosting): розроблений 2014, став стандартом. Надійний, добре документований, підтримує GPU.\n- **LightGBM** (Microsoft): листово-орієнтований ріст дерев, до 20× швидший за XGBoost на великих датасетах. Перевага при >100K рядках.\n- **CatBoost** (Yandex): краще обробляє категорійні features автоматично.\n\n**Коли використовувати:**\nЗолотий стандарт для структурованих/табличних даних: churn prediction, fraud detection, credit scoring, demand forecasting, lead scoring. Для нетекстових, незображальних задач XGBoost/LightGBM зазвичай перевершує нейромережі.\n\n**Переваги для бізнесу:**\n- Пояснюваність через SHAP values (критично для FCA, GDPR Article 22)\n- Стійкість до missing values та outliers\n- Не потребує нормалізації features\n- Швидкий inference — <5ms на транзакцію для fraud scoring\n\n**Hyperparameter tuning:** learning_rate, n_estimators, max_depth, min_child_weight — автоматично підбираються через Optuna або Bayesian optimization.`,
    example: "UK fintech: LightGBM ensemble (3 моделі з різними seeds) для fraud detection. AUC 0.943, false positive rate 0.28%, inference 3.2ms — відповідає real-time transaction scoring вимогам.",
    relatedTerms: ["feature-engineering", "shap-values", "xai-shap"],
    relatedService: "machine-learning",
    relatedBlogPost: "ml-fraud-anomaly-detection-fca",
    relatedNichePage: "/ml/banking"
  },
  {
    slug: "vector-database",
    termUk: "Векторна база даних",
    termEn: "Vector Database",
    category: "ai",
    shortDescription: "Спеціалізована база даних для зберігання та пошуку embedding-векторів — математичних представлень тексту, зображень або будь-яких даних для семантичного пошуку.",
    fullDescription: `Векторна база даних зберігає embeddings — числові вектори, що кодують семантичний сенс тексту або інших даних. На відміну від традиційного keyword-пошуку (точне співпадіння), векторний пошук знаходить семантично схожі документи навіть якщо вони не містять однакових слів.\n\n**Як це працює:**\n1. Текст → embedding model (OpenAI ada-002, sentence-transformers) → вектор з 1,536 чисел\n2. Зберігається у векторній БД (Qdrant, Pinecone, Weaviate, Milvus, pgvector)\n3. При запиті: запит → вектор → пошук найближчих сусідів (ANN) → топ-K релевантних документів\n\n**Застосування у RAG системах:**\nRAG (Retrieval-Augmented Generation) = векторний пошук + LLM. Документи індексуються у векторній БД. Коли користувач задає питання: документи → пошук → LLM генерує відповідь на основі знайденого контексту. Нульові галюцинації, бо відповідь grounded у реальних документах.\n\n**Популярні вектори БД:**\n- **Qdrant** (Rust, open source): self-hosted, GDPR-compliant, рекомендуємо для UK healthcare/legal\n- **Pinecone**: managed cloud, простий в use, але vendor lock-in\n- **Weaviate**: GraphQL API, schema-based\n- **pgvector**: extension для PostgreSQL — якщо вже є PG\n\n**UK compliance:** Self-hosted Qdrant гарантує, що документи ніколи не залишають ваш сервер — критично для NHS, юридичних фірм, фінансових установ.`,
    example: "Юридична фірма: 15,000 контрактів проіндексовані у Qdrant. Юрист питає: «Знайди всі контракти де є force majeure без carve-out для pandemic» — система знаходить 47 відповідних документів за 0.3 секунди.",
    relatedTerms: ["rag-retrieval-augmented-generation", "llm", "embedding"],
    relatedService: "llm-rag",
    relatedBlogPost: "llm-vs-rag-vs-fine-tuning",
    relatedNichePage: "/ml/banking"
  },
  {
    slug: "model-monitoring",
    termUk: "Моніторинг ML-моделі",
    termEn: "ML Model Monitoring",
    category: "ai",
    shortDescription: "Безперервне відстеження якості та поведінки ML-моделі у продакшні — виявлення деградації, дрейфу та аномалій до того, як вони вплинуть на бізнес.",
    fullDescription: `ML model monitoring — практика відстеження того, чи продовжує модель у продакшні досягати очікуваних метрик якості після деплою. Без моніторингу модель «мовчки деградує» — ви не знаєте що щось пішло не так, доки бізнес-метрики не погіршились.\n\n**Що відстежується:**\n\n1. **Data quality monitoring:** nulls, outliers, schema changes у вхідних даних\n2. **Data drift (covariate shift):** PSI, KL-divergence, Wasserstein distance\n3. **Model performance monitoring:**\n   - Для класифікації: precision, recall, F1, AUC на нових labeled даних\n   - Для регресії: MAE, RMSE, MAPE на actuals vs predictions\n4. **Prediction drift:** змінився розподіл виходів моделі (модель частіше каже «шахрайство»)\n5. **Business KPI monitoring:** кінцева метрика — чи досягається бізнес-результат?\n\n**Інструменти:**\n- **Evidently AI** (open source): data drift reports, performance dashboards\n- **MLflow** (open source): experiment tracking + model registry + basic monitoring\n- **Whylogs / WhyLabs**: column-level statistics\n- **Grafana + Prometheus**: custom dashboards для production metrics\n- **Arize AI, Aporia**: managed platforms\n\n**Alerting:** При перевищенні threshold (наприклад PSI > 0.1 або recall < 0.85) → автоматичний Slack/PagerDuty alert → review → retraining if needed.`,
    example: "E-commerce recommendation engine: щотижневий PSI-звіт показав shift у category preferences (весна vs зима). Автоматичне перенавчання на нових 30 днях даних → CTR знову +12% vs baseline.",
    relatedTerms: ["data-drift", "mlops", "shap-values"],
    relatedService: "mlops",
    relatedBlogPost: "what-is-mlops-guide",
    relatedNichePage: "/ml/saas"
  },
  {
    slug: "a-b-testing-ml",
    termUk: "A/B тестування ML-моделей",
    termEn: "A/B Testing for ML Models (Champion-Challenger)",
    category: "ai",
    shortDescription: "Методологія безпечного деплою нових ML-моделей шляхом розподілу трафіку між поточною (champion) та новою (challenger) версіями для порівняння реальних результатів.",
    fullDescription: `Champion-challenger тестування (синонім A/B тестування для ML) — це практика, коли нова версія моделі отримує частину реального трафіку (наприклад 10–20%), а результати порівнюються з поточною production-моделлю перед повним деплоєм.\n\n**Чому не просто замінити модель?**\nOffline метрики (AUC на test set) не завжди передбачають online performance. Модель може показувати кращий AUC в offline, але гірші бізнес-результати online через distribution shift, seasonality або subtle data quality differences.\n\n**Схема:**\n- Champion: поточна production-модель, 80–90% трафіку\n- Challenger: нова версія, 10–20% трафіку\n- Statistical significance: мінімум 1,000–10,000 decisions для значущості\n- Decision criteria: conversion rate, revenue, fraud loss — не лише AUC\n\n**Shadow mode (без ризику):**\nЧаллленджер отримує ті ж самі запити але його рішення НЕ впроваджуються. Лише логуються для порівняння. Дозволяє безпечно тестувати нову модель на реальних даних.\n\n**UK регуляторний контекст:**\nFCA SS1/23 (Model Risk Management) рекомендує champion-challenger як частину validation framework для банків та значних кредиторів.`,
    example: "UK лендер: challenger credit model (trained on +6 months data) тестується на 15% нових заявок. Після 3,000 decisions: challenger показує +8% approval rate при тому ж default rate → повний деплой.",
    relatedTerms: ["mlops", "model-monitoring", "data-drift"],
    relatedService: "machine-learning",
    relatedBlogPost: "ai-credit-scoring-fintech-uk",
    relatedNichePage: "/ml/banking"
  },
  {
    slug: "time-series-forecasting",
    termUk: "Прогнозування часових рядів",
    termEn: "Time Series Forecasting",
    category: "ai",
    shortDescription: "Клас ML-задач, де модель прогнозує майбутні значення на основі послідовності минулих спостережень, впорядкованих у часі.",
    fullDescription: `Time series forecasting — прогнозування майбутніх значень (попит, ціни, споживання енергії, відтік клієнтів) на основі їх минулих значень та пов'язаних ознак.\n\n**Моделі time series:**\n\n**Статистичні:**\n- ARIMA, SARIMA: класика для univariate series з сезонністю\n- Exponential Smoothing (ETS): простий та інтерпретований\n- Prophet (Facebook): добре з multiple seasonalities та holiday effects\n\n**ML-моделі:**\n- XGBoost/LightGBM з лаговими features: SOTA для багатьох задач, поступаються лише при дуже довгих залежностях\n- LSTM, GRU: нейромережі для складних long-range dependencies\n- Temporal Fusion Transformer (TFT): SOTA для multivariate forecasting, підтримує covariates\n- N-BEATS, N-HiTS: нейромережеві архітектури, призначені для TS\n\n**Evaluation metrics:**\n- MAE (Mean Absolute Error): простий, в одиницях target\n- MAPE (Mean Absolute Percentage Error): відносна помилка — корисна для різних scale\n- SMAPE: симетричний MAPE\n- WRMSSE (Walmart M5): ієрархічна помилка для retail hierarchies\n\n**UK бізнес use cases:**\n- Retail demand forecasting (SKU-level, store-level, weekly/daily)\n- Energy load forecasting (National Grid, local distribution)\n- Financial market price prediction\n- NHS patient flow forecasting\n- SaaS MRR/churn forecasting`,
    example: "UK retail chain 120 магазинів: LightGBM з лаговими features + Prophet для сезонності. MAPE 8.3% vs 14.7% у попередньої Excel-методики. Скорочення надлишкових запасів на 31%, stock-out rate -24%.",
    relatedTerms: ["lstm-neural-network", "feature-engineering", "data-drift"],
    relatedService: "predictive-analytics",
    relatedBlogPost: "ml-energy-forecasting-guide",
    relatedNichePage: "/ml/retail"
  },
  {
    slug: "computer-vision-object-detection",
    termUk: "Детекція об'єктів (Object Detection)",
    termEn: "Object Detection",
    category: "ai",
    shortDescription: "Задача комп'ютерного зору: одночасне визначення класу та координат bounding box кожного об'єкта на зображенні або відеофреймі в реальному часі.",
    fullDescription: `Object detection відрізняється від image classification: класифікація каже «на зображенні є кіт», detection каже «кіт знаходиться в координатах [x1,y1,x2,y2] з впевненістю 94%».\n\n**Основні архітектури:**\n- **YOLO (You Only Look Once)** — one-stage detector, найшвидший для real-time задач. YOLO v8/v10/v11 (Ultralytics) — стандарт для production 2024–2026\n- **RT-DETR** (Real-Time Detection Transformer): DETR-based, без NMS, конкурент YOLO v8 за якістю\n- **Faster R-CNN**: two-stage, вища якість але повільніший. Для medical imaging\n- **SAM2** (Segment Anything Model 2): Facebook/Meta, state-of-art segmentation\n\n**Метрики якості:**\n- mAP (mean Average Precision) @ IoU 0.5 або 0.5:0.95\n- Precision/Recall per class\n- Inference speed (FPS): YOLO v8n — 640×640 → ~200 FPS на A100\n\n**UK retail застосування:**\n- Loss prevention: tracking товарів від полиці до каси\n- Shelf monitoring: out-of-stock та misplaced product detection\n- Queue counting: кількість людей у черзі для динамічного відкриття кас\n\n**Manufacturing:**\n- Defect detection на конвеєрі (дряпини, тріщини, деформації)\n- PCB inspection для electronics\n- Weld quality assessment`,
    example: "Textile manufacturer UK: YOLO v8 fine-tuned на 2,800 фото дефектів (12 класів). mAP@0.5 = 94.2%. Inference на Jetson Orin: 47 FPS для відео з конвеєра 30 FPS. Дефектний товар автоматично відхиляється до упаковки.",
    relatedTerms: ["computer-vision", "edge-deployment", "transfer-learning"],
    relatedService: "computer-vision",
    relatedBlogPost: "ai-quality-control-manufacturing",
    relatedNichePage: "/ml/manufacturing"
  },
  {
    slug: "rlhf",
    termUk: "RLHF (Навчання з підкріпленням за зворотним зв'язком людини)",
    termEn: "RLHF (Reinforcement Learning from Human Feedback)",
    category: "ai",
    shortDescription: "Техніка вирівнювання великих мовних моделей із людськими цінностями: людські оцінювачі порівнюють відповіді моделі, reward model навчається на цих уподобаннях, а основна LLM оптимізується через RL.",
    fullDescription: `RLHF — ключовий компонент alignment pipeline для сучасних LLM. Без нього базові GPT-моделі генерують токсичний або небезпечний контент.

**Три етапи RLHF:**
1. **SFT (Supervised Fine-Tuning):** LLM дообучається на curated demonstrations від людей-аннотаторів
2. **Reward Model Training:** Людські оцінювачі попарно порівнюють відповіді (A > B). Reward model (зазвичай менша LLM) навчається передбачати ці переваги
3. **RL Optimization (PPO/GRPO):** LLM оптимізується через Proximal Policy Optimization, максимізуючи reward від trained reward model

**Реальні застосування:**
- GPT-4 / ChatGPT (OpenAI InstructGPT pipeline)
- Claude (Anthropic — використовує Constitutional AI поверх RLHF)
- Llama 3 Instruct (Meta)
- Gemini 1.5 (Google DeepMind)

**Виклики RLHF:**
- **Reward hacking:** LLM навчається "обдурювати" reward model, даючи довгі але порожні відповіді
- **Annotator bias:** переваги оцінювачів відображають культурні та гендерні упередження
- **Scalability:** попарна анотація дорога — вартість $0.5-5 за порівняння × мільйони пар

**Альтернативи:**
- **DPO (Direct Preference Optimization):** прибирає окремий reward model, математично еквівалентний PPO але стабільніший
- **Constitutional AI (Anthropic):** self-critique на основі принципів замість масової людської анотації
- **RLAIF:** AI анотатор замість людини для масштабованості`,
    example: "UK fintech компанія дообучає open-source LLM (Llama 3 8B) для клієнтського чату: 500 пар відповідей анотовано compliance-командою → reward model → PPO. Результат: 73% зниження відповідей поза регуляторними рамками при збереженні usefulness score.",
    relatedTerms: ["foundation-model", "constitutional-ai", "responsible-ai"],
    relatedService: "artificial-intelligence",
    relatedBlogPost: "what-is-llm-fine-tuning-guide",
    relatedNichePage: "/ai/saas"
  },
  {
    slug: "constitutional-ai",
    termUk: "Конституційний ШІ (Constitutional AI)",
    termEn: "Constitutional AI",
    category: "ai",
    shortDescription: "Підхід Anthropic до alignment: AI-модель самостійно критикує та переписує свої відповіді, керуючись набором принципів (конституцією), зменшуючи залежність від масової людської анотації.",
    fullDescription: `Constitutional AI (CAI) — розроблена Anthropic методологія для навчання безпечних та корисних LLM з мінімальною людською участю в процесі безпеки.

**Два ключові кроки:**

**1. SL-CAI (Supervised Learning from AI Feedback):**
- Модель генерує відповідь на потенційно шкідливий запит
- Та сама модель критикує відповідь на основі конституції (набору принципів)
- Модель переписує відповідь, усуваючи виявлені проблеми
- Цей процес ітерується кілька разів
- Фінальні пари (запит → безпечна відповідь) використовуються для SFT

**2. RL-CAI (Reinforcement Learning from AI Feedback):**
- AI-модель-суддя (замість людини) порівнює пари відповідей за конституцією
- Ці AI-переваги тренують reward model
- LLM оптимізується через PPO відносно цього reward model

**Конституція Anthropic включає принципи:**
- Не надавати інформацію, що сприяє завданню шкоди
- Поважати людську автономію та відкрито визнавати невизначеність
- Підтримувати демократичні цінності та свободу преси

**Переваги перед класичним RLHF:**
- Масштабованість: не потребує тисяч людських анотаторів для safety
- Прозорість: принципи явно задокументовані та аудитовані
- Консистентність: AI-суддя застосовує правила рівномірно

**Застосування:** Claude (Anthropic), що демонструє high helpfulness при низькому рівні harmful outputs.`,
    example: "Юридична фірма UK інтегрує Claude API для аналізу контрактів: Constitutional AI забезпечує, що модель відмовляється давати конкретні юридичні поради (натомість рекомендує консультацію з solicitor), навіть при наполягливих follow-up запитах клієнтів.",
    relatedTerms: ["rlhf", "responsible-ai", "foundation-model"],
    relatedService: "artificial-intelligence",
    relatedBlogPost: "what-is-llm-fine-tuning-guide",
    relatedNichePage: "/ai/legal"
  },
  {
    slug: "vector-database",
    termUk: "Векторна база даних",
    termEn: "Vector Database",
    category: "ai",
    shortDescription: "Система зберігання та пошуку, оптимізована для high-dimensional векторних ембедингів. Дозволяє семантичний пошук за подібністю замість точного збігу, є ключовим компонентом RAG-архітектур.",
    fullDescription: `Векторні бази даних зберігають ембединги (числові вектори 768–4096 вимірів) та підтримують ефективний пошук найближчих сусідів (ANN — Approximate Nearest Neighbor).

**Ключові алгоритми ANN:**
- **HNSW (Hierarchical Navigable Small World):** граф-based, найвища якість recall, використовується Qdrant/Weaviate
- **IVF (Inverted File Index):** кластерний підхід, ефективний для дуже великих датасетів (Faiss/Milvus)
- **ScaNN (Google):** оптимізований для Google-scale з quantization

**Топ векторних баз:**
| База | Особливість | Ліцензія |
|------|------------|----------|
| **Pinecone** | Managed cloud, простота | Proprietary |
| **Qdrant** | Rust-based, high performance | Apache 2.0 |
| **Weaviate** | Multimodal, GraphQL | BSD |
| **pgvector** | PostgreSQL extension | Open source |
| **Chroma** | Local/embedded, dev-friendly | Apache 2.0 |
| **Milvus** | Billion-scale | Apache 2.0 |

**Метрики подібності:**
- Cosine similarity: кут між векторами (для текстових ембедингів)
- Euclidean distance: геометрична відстань (для image features)
- Dot product: для normalized vectors = cosine

**RAG (Retrieval-Augmented Generation):**
Векторна БД + LLM = можливість відповідати на питання про приватні документи без fine-tuning. Embed документи → store vectors → query time: embed питання → find top-K similar chunks → send to LLM as context.

**UK use cases:**
- Legal document search (знайди всі контракти з подібними умовами)
- NHS: semantic search по клінічних нотатках
- Financial services: semantic duplicate detection для транзакцій`,
    example: "UK law firm з 500k документів впроваджує Qdrant + OpenAI ada-002 ембединги. Адвокати запитують природньою мовою «знайди контракти з форс-мажорними клаузами щодо pandemic» — система повертає топ-20 релевантних документів за 120ms замість 40 годин ручного пошуку.",
    relatedTerms: ["rlhf", "foundation-model", "prompt-engineering"],
    relatedService: "nlp",
    relatedBlogPost: "what-is-rag-guide",
    relatedNichePage: "/ai/legal"
  },
  {
    slug: "feature-store",
    termUk: "Feature Store (сховище ознак)",
    termEn: "Feature Store",
    category: "ai",
    shortDescription: "Централізований репозиторій ML-ознак, що гарантує консистентність між тренувальним та продакшн-середовищем, усуває training-serving skew та прискорює розробку нових моделей.",
    fullDescription: `Feature Store вирішує одну з найпоширеніших проблем MLOps: training-serving skew — коли feature logic під час тренування відрізняється від тієї, що використовується в продакшні.

**Архітектура Feature Store:**

**Offline Store (для тренування):**
- Зберігає historical features у columnar форматі (Parquet/Delta Lake)
- Підтримує point-in-time correct joins — уникає data leakage
- Джерела: data warehouse, data lake, streaming pipeline

**Online Store (для inference):**
- Low-latency key-value store (Redis, DynamoDB, Bigtable)
- Зберігає найактуальніші значення ознак для real-time predictions
- Latency: <10ms для serving

**Feature Registry:**
- Каталог усіх ознак з metadata (власник, версія, лінія, опис)
- Feature discovery: data scientists можуть знаходити та перевикористовувати ознаки
- Версіонування та deprecation management

**Топ Feature Store рішення:**
- **Feast (open-source):** стандарт для cloud-agnostic deployments
- **Hopsworks:** enterprise, з AutoML інтеграцією
- **Tecton:** managed cloud service, Databricks-рідний
- **Vertex AI Feature Store (Google):** якщо вже в GCP
- **SageMaker Feature Store (AWS):** для AWS-екосистеми

**Ключові переваги:**
- **Reusability:** команда A будує ознаки → команда B використовує без дублювання
- **Freshness guarantees:** SLA на оновлення ознак (наприклад, кожні 15 хвилин)
- **Compliance:** audit trail хто і коли використовував які features`,
    example: "UK bank з 12 ML-моделями (credit, fraud, churn, AML) впроваджує Feast: 340 ознак централізовано, 67 повторно використовуються між моделями. Training-serving skew знижено з 8% до 0.3%. Час розробки нової моделі: 6 тижнів → 10 днів.",
    relatedTerms: ["mlops", "data-drift", "model-monitoring"],
    relatedService: "mlops",
    relatedBlogPost: "what-is-mlops-guide",
    relatedNichePage: "/ml/banking"
  },
  {
    slug: "data-drift",
    termUk: "Дрейф даних (Data Drift)",
    termEn: "Data Drift",
    category: "ai",
    shortDescription: "Статистична зміна розподілу вхідних даних з часом, що призводить до деградації якості ML-моделі навіть без зміни її ваг. Виявляється через KL divergence, PSI, Wasserstein distance.",
    fullDescription: `Data drift (також covariare shift) — одна з головних причин деградації ML-моделей у продакшні. Модель тренувалась на одному розподілі даних, але отримує дані з іншого.

**Типи дрейфу:**

**1. Feature drift (Input drift):**
- Зміна розподілу однієї або кількох вхідних ознак
- Приклад: age distribution клієнтської бази змістилась через нову маркетингову кампанію

**2. Label drift (Target drift):**
- Зміна розподілу цільової змінної
- Приклад: частота fraudulent transactions зросла через нову схему шахрайства

**3. Prediction drift:**
- Зміна розподілу predictions без змін у inputs
- Ранній індикатор проблем у pipeline

**Статистичні тести для детекції:**
- **PSI (Population Stability Index):** < 0.1 = stable, 0.1-0.2 = moderate drift, > 0.2 = significant
- **KL Divergence / JS Divergence:** ентропійні метрики для порівняння розподілів
- **Wasserstein Distance (Earth Mover's):** для continuous distributions, більш robust
- **Kolmogorov-Smirnov test:** для univariate distributions, p-value threshold 0.05

**Автоматизований drift monitoring:**
- Evidently AI: open-source, reports та real-time monitoring
- Whylogs / WhyLabs: streaming data quality
- Fiddler AI: enterprise model monitoring
- MLflow + custom drift metrics

**Причини drift у UK контексті:**
- Brexit: зміна trade patterns вплинула на supply chain моделі
- COVID-19: consumer behavior повністю змінився за тижні
- Сезонність: retail, energy, transport мають quarterly patterns`,
    example: "UK insurance company: модель pricing для motor insurance показала 15% PSI на feature «annual_mileage» після lockdowns. Автоматичний alert → data team виявив, що 40% клієнтів тепер WFH → модель перенавчена на post-COVID даних. Claims prediction RMSE покращилось на 22%.",
    relatedTerms: ["concept-drift", "model-monitoring", "feature-store"],
    relatedService: "mlops",
    relatedBlogPost: "what-is-mlops-guide",
    relatedNichePage: "/ml/insurance"
  },
  {
    slug: "concept-drift",
    termUk: "Дрейф концепції (Concept Drift)",
    termEn: "Concept Drift",
    category: "ai",
    shortDescription: "Зміна статистичного зв'язку між вхідними ознаками та цільовою змінною з часом. На відміну від data drift, змінюється сама «концепція» того, що потрібно передбачити, і модель потребує перенавчання.",
    fullDescription: `Concept drift відрізняється від data drift: при data drift змінюється P(X), при concept drift змінюється P(Y|X) — умовний розподіл цільової змінної при тих самих вхідних даних.

**Типи concept drift:**

**Abrupt drift:**
- Раптова зміна через зовнішню подію
- Приклад: fraud patterns повністю змінились після впровадження нового типу атаки
- Виявляється швидко, але модель деградує різко

**Gradual drift:**
- Поступова зміна протягом місяців
- Приклад: споживчі уподобання повільно зміщуються
- Складніше виявити, але деградація поступова

**Recurring drift (Seasonal):**
- Циклічні зміни (сезони, свята, економічні цикли)
- Модель може "забути" старі патерни
- Рішення: ensemble з моделями різних часових вікон

**Sudden institutional drift:**
- Зміна регуляторного середовища змінює optimal decision boundary
- UK приклад: зміна FCA правил credit scoring → те, що раніше вважалось low-risk, тепер high-risk

**Методи адаптації:**
1. **Periodic retraining:** регулярне перенавчання на sliding window
2. **Online learning:** інкрементальне оновлення моделі (SGD, River library)
3. **Ensemble methods:** зважування свіжих vs старих моделей (DDM, EDDM, ADWIN)
4. **Concept drift detectors:** Page-Hinkley test, CUSUM, drift detection method

**Моніторинг:**
- Відстежувати performance metrics у реальному часі (AUC, F1, precision/recall)
- Порівнювати rolling windows (last 7d vs last 30d)
- Alert при статистично значущому падінні`,
    example: "UK lender: credit scoring модель, навчена до 2020 року, показала різке зниження Gini coefficient (0.71 → 0.58) після COVID. Виявлено concept drift: зв'язок між employment_type та default_probability кардинально змінився (self-employed стали менш ризикованими). Повне перенавчання відновило Gini до 0.74.",
    relatedTerms: ["data-drift", "model-monitoring", "mlops"],
    relatedService: "mlops",
    relatedBlogPost: "what-is-mlops-guide",
    relatedNichePage: "/ml/banking"
  },
  {
    slug: "model-card",
    termUk: "Model Card (картка моделі)",
    termEn: "Model Card",
    category: "ai",
    shortDescription: "Стандартизований документ, що описує ML-модель: призначення, метрики якості, обмеження, навчальні дані та етичні міркування. Вимагається регуляторами FCA SS1/23 та рекомендується Alan Turing Institute.",
    fullDescription: `Model Card — концепція, запропонована Google (Mitchell et al., 2019), стала індустріальним стандартом для документування ML-моделей і є ключовим інструментом Responsible AI.

**Обов'язкові секції Model Card:**

**1. Model Details:**
- Тип моделі, архітектура, версія
- Дата тренування, власник, контакти
- Ліцензія та обмеження використання

**2. Intended Use:**
- Primary intended uses (для чого розроблено)
- Out-of-scope uses (що НЕ є призначеним використанням)
- Цільова аудиторія

**3. Factors:**
- Relevant factors: демографічні, технічні умови
- Evaluation factors: які групи/умови оцінювались

**4. Metrics:**
- Performance metrics (accuracy, AUC, F1, RMSE)
- Decision thresholds та їх обґрунтування
- Variation across groups (disaggregated evaluation)

**5. Evaluation Data:**
- Датасети для оцінки
- Preprocessing та мотивація вибору

**6. Training Data:**
- (за можливості) опис тренувальних даних
- Джерела та процедури збору

**7. Ethical Considerations:**
- Упередження та їх митigation
- Privacy considerations
- Potential harms

**UK регуляторний контекст:**
- **FCA SS1/23:** вимагає модельну документацію для моделей у фінансових рішеннях
- **ICO Guidance on AI:** documentation як частина accountability (GDPR Article 5(2))
- **Alan Turing Institute:** рекомендує Model Cards як частину AI assurance framework

**Інструменти:**
- Google Model Card Toolkit (Python)
- Hugging Face Model Hub: стандартна форма для всіх публічних моделей
- IBM AI FactSheets`,
    example: "UK bank готує Model Card для credit decisioning model: задокументовано false positive rate 3.2% для age group 18-25 vs 1.8% загалом → compliance team вимагає bias mitigation → додатковий protected attributes analysis → FCA audit пройдено успішно.",
    relatedTerms: ["responsible-ai", "xai", "ai-governance"],
    relatedService: "machine-learning",
    relatedBlogPost: "responsible-ai-uk-regulations",
    relatedNichePage: "/ai/banking"
  },
  {
    slug: "responsible-ai",
    termUk: "Відповідальний ШІ (Responsible AI)",
    termEn: "Responsible AI",
    category: "ai",
    shortDescription: "Фреймворк принципів та практик для етичної розробки та впровадження AI: справедливість, прозорість, підзвітність, конфіденційність та безпека. Регулюється UK CDEI, Alan Turing Institute та FCA.",
    fullDescription: `Responsible AI — не просто етична концепція, а операційний фреймворк з конкретними технічними практиками та регуляторними вимогами.

**П'ять ключових принципів (UK AI Council):**

**1. Fairness (Справедливість):**
- Виявлення та усунення упереджень у даних та моделях
- Disaggregated evaluation по protected characteristics (Equality Act 2010)
- Технічно: demographic parity, equalized odds, calibration across groups

**2. Transparency (Прозорість):**
- Model Cards та Data Sheets
- Explainability (SHAP, LIME, attention maps)
- Right to explanation (UK GDPR Article 22)

**3. Accountability (Підзвітність):**
- Human oversight для high-stakes decisions
- Audit trails та model versioning
- Clear ownership та escalation procedures

**4. Privacy (Конфіденційність):**
- Privacy by design в ML pipelines
- Differential privacy для навчання на sensitive data
- Data minimization: не збирати зайвих ознак

**5. Safety & Security (Безпека):**
- Adversarial robustness testing
- Red-teaming для LLM
- Incident response procedures

**UK регуляторний ландшафт:**
- **ICO:** AI Auditing Framework + GDPR enforcement
- **FCA:** SS1/23 Model Risk Management (банки, insurtech)
- **CQC:** AI in medical devices guidelines
- **Alan Turing Institute:** TURING Trust AI Ethics programme
- **CDEI (Centre for Data Ethics and Innovation):** national advisory body

**Практичний чеклист:**
- Bias audit до деплою
- Explainability для кожного рішення, що торкається клієнта
- Human review process для edge cases
- Quarterly model performance reviews`,
    example: "UK NHS Trust впроваджує AI для triage prioritization у A&E. Responsible AI процес: bias audit виявив 7% lower accuracy для patients 75+ → додаткові training data для цієї групи → clinical review board схвалює → деплой з mandatory human review для all AI-flagged cases.",
    relatedTerms: ["xai", "ai-governance", "model-card"],
    relatedService: "artificial-intelligence",
    relatedBlogPost: "responsible-ai-uk-regulations",
    relatedNichePage: "/ai/healthcare"
  },
  {
    slug: "foundation-model",
    termUk: "Фундаментальна модель (Foundation Model)",
    termEn: "Foundation Model",
    category: "ai",
    shortDescription: "Великомасштабна модель, попередньо навчена на величезних датасетах (GPT-4o, Claude 3.5, Llama 3, Gemini 1.5), що адаптується до численних downstream задач через fine-tuning або prompting.",
    fullDescription: `Термін «Foundation Model» введений Stanford HAI у 2021 році. Ці моделі кардинально змінили AI: замість навчання окремої моделі для кожної задачі — адаптуй одну велику модель.

**Ключові характеристики:**

**Масштаб:**
- GPT-4: ~1.8 трильйони параметрів (оцінка)
- Llama 3 70B: 70 мільярдів параметрів
- Claude 3.5 Sonnet: ~200B+ параметрів (оцінка)
- Gemini 1.5 Pro: ~1T+ параметрів (оцінка)

**Навчання:**
- Pretrain на трильйонах токенів з Інтернету, книг, коду, наукових статей
- Unsupervised / self-supervised: next-token prediction (GPT) або masked language modeling (BERT)
- Compute: тисячі A100/H100 GPU-місяців, вартість $10M-$100M+

**Категорії Foundation Models:**
- **Text:** GPT-4o, Claude 3.5, Llama 3, Gemini 1.5, Mistral Large
- **Code:** GitHub Copilot (GPT-4), Claude, Gemini Code
- **Image:** DALL-E 3, Stable Diffusion 3, Midjourney v6, Flux
- **Multimodal:** GPT-4o Vision, Gemini 1.5 Pro, Claude 3.5 (text+images)
- **Audio:** Whisper (STT), ElevenLabs (TTS), Suno (music)
- **Video:** Sora (OpenAI), Runway Gen-3, Kling

**Методи адаптації:**
1. **Zero-shot:** використання без будь-якого налаштування
2. **Few-shot prompting:** приклади у context window
3. **Fine-tuning:** додаткове навчання на domain-specific даних
4. **LoRA / QLoRA:** parameter-efficient fine-tuning
5. **RAG:** доповнення зовнішніми знаннями

**UK ринок:**
- AWS Bedrock: Claude, Llama, Titan API
- Azure OpenAI: GPT-4o, Embeddings (популярний у UK enterprise)
- Google Vertex AI: Gemini, PaLM`,
    example: "UK legal tech startup використовує Claude 3.5 Sonnet як foundation model: zero-shot — аналіз типових контрактів (95% accuracy); after fine-tuning на 10k UK legal documents — аналіз specialized IP contracts (98% accuracy, 40x швидше за junior solicitor).",
    relatedTerms: ["rlhf", "lora", "multimodal-ai"],
    relatedService: "artificial-intelligence",
    relatedBlogPost: "what-is-llm-fine-tuning-guide",
    relatedNichePage: "/ai/legal"
  },
  {
    slug: "multimodal-ai",
    termUk: "Мультимодальний ШІ (Multimodal AI)",
    termEn: "Multimodal AI",
    category: "ai",
    shortDescription: "AI-системи, що обробляють декілька типів вхідних даних одночасно (текст + зображення + аудіо + відео). Приклади: GPT-4o Vision, Gemini 1.5 Pro, Claude 3.5 — відкривають нові класи бізнес-застосувань.",
    fullDescription: `Мультимодальний AI знімає ключове обмеження ранніх LLM — роботу лише з текстом. Сучасні системи «розуміють» кілька модальностей одночасно.

**Поточний стан (2025–2026):**

**Text + Image (Vision):**
- GPT-4o: аналіз зображень, графіків, документів, скриншотів
- Claude 3.5 Sonnet: document understanding, diagram analysis
- Gemini 1.5 Pro: до 1M token context + images

**Text + Audio:**
- GPT-4o Audio: real-time voice conversation з emotional awareness
- Whisper + GPT-4: STT → text analysis pipeline
- ElevenLabs: text → natural speech (100+ мов)

**Text + Video:**
- Gemini 1.5 Pro: відео до 1 години у context window
- GPT-4o Video (2025): frame-by-frame video understanding

**Image + Text Generation:**
- DALL-E 3: text prompt → image
- Stable Diffusion 3: open-source, local deployment
- Flux 1.1: state-of-art якість (2024–2025)

**Архітектурні підходи:**
- **Cross-attention fusion:** окремі encoders для кожної модальності + cross-attention шар
- **Unified tokenization:** зображення токенізуються як patches (ViT), аудіо як спектрограми
- **CLIP-based alignment:** пов'язування visual та text representations у спільному просторі

**UK бізнес-застосування:**
- Insurance: автоматична оцінка збитків за фото ДТП
- NHS: аналіз медичних зображень (X-ray, MRI) + клінічні нотатки
- Retail: visual product search + text description
- Legal: аналіз scanned documents та handwritten contracts`,
    example: "UK insurance provider інтегрує GPT-4o Vision: водій фотографує пошкоджений автомобіль → модель визначає тип пошкодження, оцінює severity, cross-references з repair cost database → попередня оцінка збитків £2,400 готова за 30 секунд замість 3-5 днів очікування assessor.",
    relatedTerms: ["foundation-model", "computer-vision", "agentic-ai"],
    relatedService: "artificial-intelligence",
    relatedBlogPost: "ai-use-cases-uk-business",
    relatedNichePage: "/ai/insurance"
  },
  {
    slug: "agentic-ai",
    termUk: "Агентний ШІ (Agentic AI)",
    termEn: "Agentic AI",
    category: "ai",
    shortDescription: "AI-системи, що автономно планують та виконують багатокрокові задачі, використовуючи інструменти, пам'ять та цикли зворотного зв'язку без постійного людського керівництва (LangGraph, AutoGPT, Claude Computer Use).",
    fullDescription: `Agentic AI знаменує перехід від AI як «відповідача на питання» до AI як «виконавця задач». Агент отримує ціль і самостійно планує кроки для її досягнення.

**Ключові компоненти агента:**

**1. Planning (Планування):**
- ReAct (Reason + Act): чергування міркування та дій
- Tree-of-Thought: паралельне дослідження кількох шляхів
- Hierarchical planning: декомпозиція великих задач на підзадачі

**2. Tools (Інструменти):**
- Web search (Bing, Google, Perplexity)
- Code execution (Python sandbox)
- API calls (CRM, databases, payment systems)
- File operations (read/write/create)
- Computer use (screenshots, mouse/keyboard — Claude)

**3. Memory (Пам'ять):**
- In-context: поточна розмова (до 200k токенів у Claude)
- External: vector database для long-term knowledge
- Episodic: збереження попередніх сесій

**4. Feedback loops:**
- Self-reflection: агент оцінює власні результати
- Error recovery: виявлення та виправлення помилок
- Human-in-the-loop: запит дозволу на критичні дії

**Топ фреймворки (2026):**
- **LangGraph:** graph-based agent workflows, production-ready
- **AutoGen (Microsoft):** multi-agent conversations
- **CrewAI:** role-based agent teams
- **Claude Computer Use:** операційна система як інструмент

**UK застосування:**
- Accounts payable automation: агент обробляє invoices від початку до оплати
- Customer service: агент вирішує складні запити з доступом до CRM, order system, policy documents
- Legal research: агент збирає precedents, статути, коментарі

**Ризики та governance:**
- Human oversight для фінансових транзакцій >£X
- Audit trail кожної дії агента
- Sandbox execution для code agents`,
    example: "UK accounting firm: агент на LangGraph + Claude отримує задачу «підготуй monthly management accounts для клієнта X». Агент: pulls Xero API → reconciles transactions → identifies anomalies → generates commentary → formats as PDF → emails draft to partner для review. Час: 25 хвилин vs 4 години вручну.",
    relatedTerms: ["foundation-model", "chain-of-thought", "multimodal-ai"],
    relatedService: "artificial-intelligence",
    relatedBlogPost: "ai-automation-uk-business",
    relatedNichePage: "/ai/saas"
  },
  {
    slug: "chain-of-thought",
    termUk: "Chain-of-Thought (ланцюжок міркувань)",
    termEn: "Chain-of-Thought Prompting",
    category: "ai",
    shortDescription: "Техніка промптингу, що спонукає LLM міркувати крок за кроком перед фінальною відповіддю. Драматично покращує точність на складних задачах: математика, логіка, багатокрокові рішення.",
    fullDescription: `Chain-of-Thought (CoT) prompting відкрили Wei et al. (Google Brain, 2022). Проста ідея — попросити модель «think step by step» — підвищила accuracy на GSM8K (шкільна математика) з 18% до 57%.

**Варіанти CoT:**

**Zero-Shot CoT:**
- Просто додай «Let's think step by step» до промпту
- Працює для GPT-4, Claude 3.5, Gemini 1.5+
- Не потребує прикладів

**Few-Shot CoT:**
- Надай 3-8 прикладів задача → міркування → відповідь
- Вищий контроль над стилем міркування
- Більш consistent результати для специфічних задач

**Self-Consistency CoT:**
- Генеруй N різних CoT шляхів (temperature>0)
- Вибирай відповідь majority voting
- +10-15% до accuracy проти single-path CoT

**Tree-of-Thought (ToT):**
- Паралельне дослідження кількох гілок міркування
- Backtracking при досягненні dead ends
- State-of-art для складних puzzle та planning задач

**Program-of-Thought (PoT):**
- Модель генерує Python код замість природньомовного міркування
- Код виконується → отримуємо точну відповідь
- Ідеально для математики та аналізу даних

**Коли CoT найефективніший:**
- Arithmetic reasoning: multi-step calculations
- Commonsense reasoning: logical inference chains
- Symbolic reasoning: formal logic
- Code debugging: трасування помилки крок за кроком

**Коли НЕ потрібен:**
- Прості classification задачі
- Пряме fact retrieval
- Завдання де latency критична`,
    example: "UK tax advisory: без CoT — Claude робить помилку у multi-step VAT calculation з partial exemptions (56% accuracy). З Zero-Shot CoT: «Let's calculate step by step» → 94% accuracy. Few-Shot CoT з прикладами реальних UK VAT scenarios → 98% accuracy, повністю аудитовані calculations.",
    relatedTerms: ["prompt-engineering", "agentic-ai", "foundation-model"],
    relatedService: "nlp",
    relatedBlogPost: "what-is-prompt-engineering",
    relatedNichePage: "/ai/legal"
  },
  {
    slug: "few-shot-learning",
    termUk: "Few-Shot навчання",
    termEn: "Few-Shot Learning",
    category: "ai",
    shortDescription: "Підхід ML, де модель узагальнює з дуже малої кількості (2–20) прикладів. In-context learning у LLM є формою few-shot. Критично важливий для UK бізнесів з обмеженими labeled datasets.",
    fullDescription: `Few-Shot Learning вирішує фундаментальну проблему класичного ML: необхідність тисяч labeled прикладів. Людина навчається розпізнавати нові об'єкти з 1-5 прикладів — few-shot ML прагне до цього.

**Три парадигми:**

**1. In-Context Learning (LLM Few-Shot):**
- Надай LLM 3-10 прикладів у prompt → модель «навчається» без gradient updates
- GPT-4, Claude, Gemini: якість Few-Shot ≈ Fine-Tuned small model
- Zero overhead: нові examples можна додавати без retraining

**2. Meta-Learning (Learning to Learn):**
- Модель навчається на тисячах tasks → засвоює «як швидко навчатись»
- MAML (Model-Agnostic Meta-Learning): fast adaptation через 1-5 gradient steps
- Prototypical Networks: class = prototype vector у embedding space

**3. Transfer Learning + Fine-Tuning:**
- Pretrained foundation model (BERT, ViT) + fine-tuning на 50-500 прикладах
- Набагато менше даних, ніж навчання з нуля
- Ефективно для domain-specific NLP (legal, medical, financial)

**Практичні рекомендації для UK бізнесу:**

| Кількість прикладів | Рекомендований підхід |
|--------------------|-----------------------|
| 0 | Zero-shot LLM prompting |
| 3-20 | Few-shot prompting (GPT-4/Claude) |
| 50-500 | LoRA fine-tuning на foundation model |
| 500-5000 | Full fine-tuning невеликої моделі |
| 5000+ | Train from scratch або large fine-tuning |

**Типові UK use cases:**
- Legal: класифікація нових типів контрактних клаузул (5-10 прикладів)
- Медичні нотатки: vitals extraction з неструктурованого тексту
- Fraud detection: нові схеми шахрайства (мало прикладів до виявлення)`,
    example: "UK solicitor firm виявляє новий тип клаузул про post-Brexit compliance. 8 прикладів задокументовано → Few-Shot prompt для Claude → 91% precision на класифікації 1,200 контрактів. Альтернатива (labeled dataset + fine-tuning) потребувала б 3 місяці та 500+ прикладів.",
    relatedTerms: ["zero-shot-learning", "transfer-learning", "prompt-engineering"],
    relatedService: "machine-learning",
    relatedBlogPost: "what-is-llm-fine-tuning-guide",
    relatedNichePage: "/ai/legal"
  },
  {
    slug: "zero-shot-learning",
    termUk: "Zero-Shot навчання",
    termEn: "Zero-Shot Learning",
    category: "ai",
    shortDescription: "Здатність моделі виконувати задачі без будь-яких task-специфічних тренувальних прикладів. Стало практично можливим завдяки великим мовним моделям та cross-modal representations.",
    fullDescription: `Zero-Shot Learning (ZSL) — здатність моделі generalize на unseen classes або задачі без прикладів під час inference.

**Два типи Zero-Shot:**

**1. Traditional ZSL (Computer Vision):**
- Модель не бачила клас під час тренування
- Використовує semantic descriptions (attribute vectors, word embeddings)
- Приклад: модель навчена на тисячах тварин — розпізнає зебру через «полосатий кінь» без прикладів зебр
- Методи: DAP (Direct Attribute Prediction), CLIP, ALIGN

**2. LLM Zero-Shot (In-Context):**
- Великі мовні моделі виконують нові NLP задачі без fine-tuning
- Задача задається через prompt: «Classify the sentiment of: [text]»
- GPT-4, Claude 3.5: SOTA на багатьох benchmarks у zero-shot режимі

**CLIP (Contrastive Language-Image Pre-Training, OpenAI):**
- Найвпливовіша архітектура для zero-shot vision
- Тренується на 400M пар (image, text) з Інтернету
- At inference: порівнює image embedding з text embeddings → zero-shot classification
- Дозволяє: «is this image about [anything]?» без specific training

**Порівняння Zero-Shot vs Few-Shot:**
- Zero-shot: швидший старт, нижча accuracy для специфічних задач
- Few-shot: +10-30% accuracy з 5-10 прикладами
- Правило: починай zero-shot → якщо accuracy < threshold → few-shot → fine-tune

**Практичне значення для UK бізнесу:**
- Sentiment analysis нових продуктів без labeled data
- Content moderation: нові категорії без retraining
- Document routing: новий тип документів → автоматична категоризація`,
    example: "UK e-commerce retailer отримує customer reviews на 12 нових мовах (South Asian diaspora). Zero-shot GPT-4o: translate + sentiment + topic extraction без будь-яких labeled прикладів на цих мовах. Accuracy 89% vs 96% для few-shot (5 прикладів) — trade-off час-vs-якість вирішено на користь zero-shot для initial launch.",
    relatedTerms: ["few-shot-learning", "foundation-model", "prompt-engineering"],
    relatedService: "machine-learning",
    relatedBlogPost: "ai-use-cases-uk-business",
    relatedNichePage: "/ai/ecommerce"
  },
  {
    slug: "prompt-engineering",
    termUk: "Промпт-інжиніринг (Prompt Engineering)",
    termEn: "Prompt Engineering",
    category: "ai",
    shortDescription: "Дисципліна створення ефективних LLM-запитів для отримання оптимальних результатів. Включає технки: CoT, few-shot, system prompts, output formatting, role prompting та structured outputs.",
    fullDescription: `Prompt Engineering — мистецтво та наука комунікації з LLM. Якість промпту безпосередньо впливає на якість результату: різниця між хорошим та поганим промптом може становити 50%+ у accuracy.

**Ключові техніки:**

**System Prompts:**
- Задають контекст, роль та обмеження для всієї сесії
- «You are an experienced UK employment lawyer. Always cite relevant UK legislation. Never provide specific legal advice, recommend consulting a qualified solicitor.»

**Role Prompting:**
- «Act as a senior data scientist reviewing this ML code»
- Активує domain knowledge та відповідний стиль відповіді

**Chain-of-Thought:**
- «Think step by step before answering»
- Особливо ефективно для math, logic, multi-step reasoning

**Few-Shot:**
- 3-8 прикладів input→output у промпті
- Показуємо формат та якість очікуваної відповіді

**Structured Output:**
- «Respond ONLY in JSON format: {"sentiment": "positive/negative/neutral", "confidence": 0-1, "reason": "..."}»
- Критично для automated pipelines

**Output Formatting:**
- Markdown, bullet points, numbered lists
- Explicit length constraints: «In exactly 3 bullet points»
- Templates: «Fill in this template: [TEMPLATE]»

**Negative Prompting:**
- «Do NOT include caveats about consulting professionals»
- «Avoid using jargon. Write for a non-technical audience.»

**Prompt Chaining:**
- Складні задачі → серія простих промптів
- Output одного промпту = input наступного

**UK-специфічні best practices:**
- Явно вказувати UK jurisdiction: «UK law», «HMRC guidelines», «FCA regulations»
- Reference specific UK frameworks: «per NICE guidelines», «per Companies Act 2006»
- Mension currency: «£ GBP», «VAT», «NI contributions»

**Промпт-безпека:**
- Prompt injection: зловмисники намагаються перевизначити system prompt
- Jailbreaking: обхід safety guidelines
- PII leakage: модель може витягти sensitive data з context`,
    example: "UK HR software компанія: initial prompt «Write a job description for software engineer» → generic output. Refined: «Write a UK-compliant job description for Senior Software Engineer (Python/ML) for London fintech. Include: salary range £85-110k + equity, Tier 2 sponsorship available, flexible working under UK flexible working regulations 2023. Format: role overview, responsibilities (8 bullets), requirements (5 must-have, 3 nice-to-have), benefits.» → 95% ready-to-publish результат.",
    relatedTerms: ["chain-of-thought", "few-shot-learning", "agentic-ai"],
    relatedService: "nlp",
    relatedBlogPost: "what-is-prompt-engineering",
    relatedNichePage: "/ai/saas"
  },
  {
    slug: "lora",
    termUk: "LoRA (Low-Rank Adaptation)",
    termEn: "LoRA (Low-Rank Adaptation)",
    category: "ai",
    shortDescription: "Parameter-efficient техніка дообучання LLM: заморожує оригінальні ваги та навчає лише малорангові матриці-адаптери. Зменшує кількість тренованих параметрів у 10,000 разів, роблячи fine-tuning доступним на споживчих GPU.",
    fullDescription: `LoRA (Hu et al., Microsoft, 2021) вирішила ключову проблему fine-tuning великих моделей: навчати GPT-3 (175B параметрів) звичайній компанії фінансово неможливо.

**Математична основа:**

Замість оновлення повної матриці W (d×k параметрів), LoRA навчає дві низькорангові матриці:
- ΔW = B × A, де B (d×r) та A (r×k), r << min(d,k)
- При forward pass: output = Wx + BAx (оригінальні ваги заморожені)
- При inference: W' = W + BA (merge адаптерів у модель)

**Практичні переваги:**

| Параметр | Full Fine-Tuning | LoRA (r=16) |
|----------|-----------------|-------------|
| Llama 3 8B params | 8B (16GB VRAM) | 8M (200MB) |
| GPU requirement | 4×A100 80GB | 1×RTX 3090 24GB |
| Training cost | $500-2000 | $10-50 |
| Storage per adapter | 16GB | 100-400MB |

**Вибір rank (r):**
- r=4-8: легка domain adaptation (tone, format)
- r=16-32: значна задача-специфічна адаптація
- r=64-128: near full fine-tuning quality (рідко потрібен)

**QLoRA (Dettmers et al., 2023):**
- Base model квантизований до 4-bit NF4
- LoRA адаптери залишаються в BF16
- Llama 3 70B fine-tuning на 1×A100 40GB
- Незначна втрата якості (-1-2%)

**Де застосовувати (UK контекст):**
- Legal: fine-tune на UK statutes, case law, contract templates
- Medical: adapt на NHS clinical guidelines, NICE pathways
- Financial: customize на FCA handbook, specific product documentation
- Customer service: align з brand voice та company policies`,
    example: "UK insurtech стартап дообучає Mistral 7B на 50k внутрішніх insurance claim notes через LoRA (r=16). Витрати: 1×A100 40GB × 8 годин = £30. Результат: automated claim categorisation accuracy 94.3% vs 71.2% zero-shot. Адаптер 180MB зберігається окремо від base model.",
    relatedTerms: ["foundation-model", "quantization", "few-shot-learning"],
    relatedService: "machine-learning",
    relatedBlogPost: "what-is-llm-fine-tuning-guide",
    relatedNichePage: "/ai/insurance"
  },
  {
    slug: "quantization",
    termUk: "Квантизація моделей (Model Quantization)",
    termEn: "Model Quantization",
    category: "ai",
    shortDescription: "Зниження точності числового представлення ваг моделі (float32→int8/int4) для зменшення розміру та прискорення inference. Дозволяє деплоїти великі моделі на edge-пристроях та знижує хмарні витрати.",
    fullDescription: `Квантизація — ключова техніка оптимізації для production ML deployments. Без неї більшість LLM не можна деплоїти локально або на cost-effective hardware.

**Типи числових форматів:**

| Формат | Розмір (bits) | Параметрів для Llama 3 8B | VRAM |
|--------|--------------|---------------------------|------|
| float32 | 32 | 32GB | 34GB |
| bfloat16 | 16 | 16GB | 18GB |
| int8 | 8 | 8GB | 10GB |
| int4 (NF4) | 4 | 4GB | 6GB |
| int2 | 2 | 2GB | 3.5GB |

**Підходи до квантизації:**

**Post-Training Quantization (PTQ):**
- Найпростіший: quantize після тренування без retraining
- GPTQ: точна квантизація через second-order optimization
- AWQ (Activation-Aware): враховує importance of weights per channel
- GGUF (llama.cpp): CPU/GPU inference, популярний для local deployment

**Quantization-Aware Training (QAT):**
- Симулює quantization під час тренування → краща якість
- Вищі compute costs для тренування
- Результат: значно менша деградація при низьких bitwidths

**Інструменти:**
- **llama.cpp / Ollama:** GGUF формат, CPU inference, Windows/Mac/Linux
- **bitsandbytes:** int8/int4 для PyTorch (LLM.int8(), NF4)
- **AutoGPTQ:** GPTQ квантизація, GPU inference
- **TensorRT (NVIDIA):** enterprise production inference
- **OpenVINO (Intel):** edge та CPU deployment

**Якість vs розмір (Llama 3 8B benchmark):**
- float16: baseline (100%)
- int8: 99.2% quality (-0.8%), 2x швидше
- int4: 97.5% quality (-2.5%), 4x швидше

**UK edge deployment scenarios:**
- NHS medical devices: on-premise LLM без cloud (patient data privacy)
- Manufacturing: quality inspection на factory floor
- Retail: in-store product recommendation без cloud latency`,
    example: "UK retail chain деплоїть customer service chatbot на in-store tablets (iPad Pro M4, 16GB RAM): Llama 3 8B в GGUF Q4_K_M (5.2GB) через Ollama. Latency 450ms/token (vs 180ms cloud), але zero data leaves store, no subscription cost. ROI: £0 vs £45k/рік Azure OpenAI для 200 магазинів.",
    relatedTerms: ["edge-ai", "model-compression", "lora"],
    relatedService: "mlops",
    relatedBlogPost: "ml-infrastructure-cost-optimization",
    relatedNichePage: "/ml/retail"
  },
  {
    slug: "federated-learning",
    termUk: "Федеративне навчання (Federated Learning)",
    termEn: "Federated Learning",
    category: "ai",
    shortDescription: "Підхід ML-тренування на розподілених даних без централізації сирих даних. Кожен вузол навчається локально, центральний сервер агрегує лише градієнти. Відповідає UK GDPR Article 89 та ICO guidance.",
    fullDescription: `Federated Learning (FL), запроваджений Google (2016) для Gboard, вирішує фундаментальний конфлікт: ML моделі потребують даних — але дані sensitive і не можна централізувати.

**Архітектура Federated Learning:**

**1. Ініціалізація:**
- Центральний сервер (aggregator) розподіляє initial global model на всі вузли

**2. Локальне тренування (паралельно):**
- Кожен вузол навчається на СВОЇХ локальних даних
- Обчислює локальні gradient updates (delta weights)
- Ніякі raw data не залишають вузол

**3. Агрегація:**
- Вузли надсилають лише gradient updates (або model weights delta)
- FedAvg: server усереднює gradients зважено за кількістю samples
- FedProx: regularization term для non-IID data

**4. Глобальне оновлення:**
- Оновлена global model розподіляється назад
- Повтор протягом N rounds

**Виклики:**
- **Non-IID data:** дані на різних вузлах статистично відмінні — деградація якості
- **Communication overhead:** передача градієнтів може бути дорогою
- **Stragglers:** повільні вузли затримують навчання
- **Privacy attacks:** gradient inversion — потенційне відновлення raw data з градієнтів

**Додаткові техніки приватності:**
- **Differential Privacy:** додавання шуму до градієнтів (Google DP library)
- **Secure Aggregation:** cryptographic aggregation — server не бачить individual gradients
- **Homomorphic Encryption:** computation on encrypted gradients

**UK регуляторний контекст:**
- NHS: тренування на patient records між Trusts без transfer (GDPR Article 89)
- Banking: fraud detection між банками без sharing customer data (UK GDPR, FCA)
- Telecoms: network optimization на subscriber behavior data`,
    example: "Консорціум 5 UK банків (Barclays, HSBC, Lloyds, NatWest, Santander): federated fraud detection model. Кожен банк навчається локально на своїх 2M+ транзакціях → надсилає лише encrypted gradients → aggregated model deployed у всіх. Fraud detection rate +34% vs best individual bank model. Жодні транзакційні дані клієнтів не покинули банк.",
    relatedTerms: ["synthetic-data", "responsible-ai", "edge-ai"],
    relatedService: "machine-learning",
    relatedBlogPost: "ai-banking-fraud-detection",
    relatedNichePage: "/ai/banking"
  },
  {
    slug: "edge-ai",
    termUk: "Edge AI (граничний штучний інтелект)",
    termEn: "Edge AI",
    category: "ai",
    shortDescription: "Розгортання ML inference на локальних пристроях (IoT-датчики, смартфони, edge-сервери) без хмарної залежності. Зменшує latency, підвищує конфіденційність та дозволяє офлайн-роботу.",
    fullDescription: `Edge AI переміщує inference з cloud на пристрій, що збирає дані. Критично для use cases, де cloud latency неприйнятна або підключення ненадійне.

**Чому Edge замість Cloud:**

| Критерій | Cloud AI | Edge AI |
|----------|----------|---------|
| Latency | 50-500ms | 1-50ms |
| Privacy | Дані в cloud | Дані локально |
| Connectivity | Потрібен інтернет | Офлайн-ready |
| Cost at scale | $0.001-0.01/request | Hardware upfront |
| Updates | Instant | Requires OTA update |

**Hardware для Edge AI:**

**NVIDIA Jetson серія:**
- Orin NX: 100 TOPS, до 32GB, industrial IoT
- AGX Orin: 275 TOPS, autonomous machines, robotics
- Nano: 40 TOPS, entry-level, student/maker projects

**Dedicated AI chips:**
- Apple M-series: Neural Engine 38 TOPS (iPhone/Mac)
- Google Coral (Edge TPU): 4 TOPS, USB/PCIe
- Intel Myriad X (VPU): 4 TOPS, OpenVINO

**ARM Cortex серія:**
- Cortex-M55 + Ethos-U55/U65: мікроконтролери з ML acceleration
- TinyML: ML на <1MB RAM (keyword spotting, anomaly detection)

**ML Frameworks для Edge:**
- **TensorFlow Lite:** cross-platform, quantization built-in
- **ONNX Runtime:** vendor-neutral, широка апаратна підтримка
- **TVM (Apache):** automatic optimization для target hardware
- **Edge Impulse:** no-code platform для embedded ML

**UK застосування:**
- Predictive maintenance: vibration analysis на manufacturing equipment
- Smart meters: anomaly detection без cloud (National Grid)
- Security cameras: на-пристроєве розпізнавання без CCTV data to cloud (UK Surveillance Camera Code)
- Smart buildings: HVAC optimization на local processors`,
    example: "UK supermarket chain (500 магазинів): Jetson Orin NX у кожному магазині для shelf monitoring. On-device YOLO v8 inference 47FPS → out-of-stock alerts за 2 хвилини vs 30 хвилин manual check. Без cloud: customer CCTV ніколи не залишає магазин (ICO compliance). TCO 3 роки: £180k vs £2.1M cloud inference.",
    relatedTerms: ["quantization", "model-compression", "federated-learning"],
    relatedService: "mlops",
    relatedBlogPost: "edge-ai-manufacturing-guide",
    relatedNichePage: "/ml/manufacturing"
  },
  {
    slug: "synthetic-data",
    termUk: "Синтетичні дані (Synthetic Data)",
    termEn: "Synthetic Data",
    category: "ai",
    shortDescription: "Штучно згенеровані дані, статистично схожі на реальні. Використовуються коли реальні дані дефіцитні, чутливі або незбалансовані. Відповідають UK GDPR при правильній анонімізації.",
    fullDescription: `Synthetic Data — відповідь на один з найбільших бар'єрів впровадження AI у регульованих галузях: дані є, але через GDPR/confidentiality їх не можна використовувати для тренування.

**Методи генерації синтетичних даних:**

**Для табличних даних:**
- **GAN (Generative Adversarial Network):** CTGAN, TVAE — найвища якість
- **VAE (Variational Autoencoder):** стабільніший тренувальний процес
- **Probabilistic models:** Gaussian Copulas, SDV library (простіше, менша якість)
- **LLM-based:** GPT-4o для генерації structured records (customer profiles, transactions)

**Для зображень:**
- **Stable Diffusion / DALL-E:** photo-realistic synthetic images
- **3D rendering:** Unity, Blender → realistic training images без реальних фото
- **Data augmentation:** transforms existing images (flip, crop, color jitter)

**Для тексту:**
- **LLM generation:** GPT-4, Claude генерують synthetic NLP datasets
- **Back-translation:** перекласти та назад для paraphrase generation
- **Template-based:** варіанти заповнення шаблонів

**Ключові показники якості синтетичних даних:**
- **Fidelity:** чи схожий синтетичний розподіл на реальний?
- **Utility:** чи модель, навчена на синтетичних даних, добре працює на реальних?
- **Privacy:** чи можна відновити реальні записи? (linkage attack, membership inference)

**UK GDPR та синтетичні дані:**
- ICO Position Paper (2023): «properly anonymised synthetic data is out of scope of UK GDPR»
- Але: de-identification ≠ anonymisation — потрібне privacy risk assessment
- Differential Privacy при генерації: математичні гарантії анонімності

**Інструменти:**
- Gretel.ai: managed synthetic data platform
- Mostly AI: enterprise, banking-focused
- SDV (Synthetic Data Vault): open-source, Python`,
    example: "UK medtech стартап розробляє ECG anomaly detection model: лише 200 labeled abnormal ECGs (рідкісна аритмія) vs 5,000 normal. CTGAN генерує 2,000 synthetic abnormal recordings → клас збалансовано → F1 score для rare class: 0.71 vs 0.34 без аугментації. NHS IG team підтвердила: synthetic data не потребує patient consent.",
    relatedTerms: ["federated-learning", "data-augmentation", "responsible-ai"],
    relatedService: "machine-learning",
    relatedBlogPost: "ai-healthcare-uk-data",
    relatedNichePage: "/ai/healthcare"
  },
  {
    slug: "data-augmentation",
    termUk: "Аугментація даних (Data Augmentation)",
    termEn: "Data Augmentation",
    category: "ai",
    shortDescription: "Техніка розширення тренувальних датасетів через модифікацію існуючих прикладів (повороти зображень, парафразування тексту, додавання шуму) для покращення узагальнення моделі.",
    fullDescription: `Data Augmentation — cost-effective спосіб збільшити ефективний розмір датасету без збору нових реальних даних.

**Аугментація для зображень (Computer Vision):**

**Геометричні трансформації:**
- Horizontal/Vertical flip (де логічно)
- Random crop та resize
- Rotation (±15°, ±30°, ±45°)
- Perspective transform, shear

**Фотометричні трансформації:**
- Brightness, contrast, saturation adjustment
- Gaussian noise, blur
- Random erasing (CutOut): видаляє прямокутний patch

**Mixup / CutMix:**
- Mixup: лінійна комбінація двох зображень та їх labels
- CutMix: вставка патча з іншого зображення + proportional label mix

**AutoAugment (Google):**
- RL-based пошук оптимальних augmentation policies
- Покращує ImageNet top-1 accuracy +1-2%

**Аугментація для тексту (NLP):**
- **Back-translation:** EN → DE → EN (змінює формулювання)
- **Synonym replacement:** WordNet, BERT-based synonyms
- **Random insertion/deletion/swap:** легкі трансформації
- **EDA (Easy Data Augmentation):** поєднує 4 операції
- **LLM paraphrasing:** GPT-4/Claude переформулює зі збереженням смислу (найвища якість)

**Аугментація для табличних даних:**
- SMOTE: synthetic minority oversampling для imbalanced classification
- Gaussian noise injection на continuous features
- Feature perturbation в межах realistic bounds

**Для аудіо:**
- Time stretching, pitch shifting
- Background noise injection
- SpecAugment: masking time/frequency bands (SOTA для ASR)

**Коли аугментація НЕ допомагає:**
- Якщо модель вже overfitting через інші причини (модель занадто маленька)
- Якщо трансформації нереалістичні для домену (вертикальний flip обличь)`,
    example: "UK pathology lab: 1,200 labeled histology slides для cancer detection model (YOLO v8). Standard augmentation (flip, rotation, color jitter) → 9,600 effective images. Додатково: Stain Augmentation (HED color space трансформації для різних staining protocols) → +6.2% AUC. Загальний датасет: 19,200 images з 1,200 оригінальних.",
    relatedTerms: ["synthetic-data", "transfer-learning", "computer-vision"],
    relatedService: "machine-learning",
    relatedBlogPost: "ai-healthcare-uk-data",
    relatedNichePage: "/ai/healthcare"
  },
  {
    slug: "model-compression",
    termUk: "Стиснення моделей (Model Compression)",
    termEn: "Model Compression",
    category: "ai",
    shortDescription: "Зменшення розміру та обчислювальних вимог ML-моделі через pruning, квантизацію або knowledge distillation для production-деплою на обмеженому апаратному забезпеченні.",
    fullDescription: `Model Compression — збірна назва для технік, що зменшують розмір моделі без суттєвої втрати якості. Критично для edge deployment та cost optimization у cloud.

**Три основні підходи:**

**1. Pruning (відсікання):**
- **Unstructured pruning:** видалення окремих weights з малим magnitude
- **Structured pruning:** видалення цілих нейронів, голів attention, шарів
- **Magnitude-based:** видаляти ваги з |w| < threshold
- **Gradient-based:** важливість = gradient × weight magnitude
- Типовий результат: 50-90% sparsity з <5% accuracy loss

**2. Quantization (квантизація):**
- float32 → int8/int4 (розглянуто детально в окремому терміні)
- 2-8x compression ratio з мінімальною деградацією

**3. Knowledge Distillation:**
- Teacher model → Student model (менший)
- Student вчиться відтворювати soft probabilities teacher (не тільки hard labels)
- Деталі в окремому терміні

**Комбінований підхід (Production Pipeline):**
1. Quantization-Aware Training (QAT)
2. Structured pruning (видалення 30-50% attention heads)
3. Knowledge distillation у менший студент
4. TensorRT / ONNX optimization для target hardware
5. Benchmark: latency, throughput, accuracy trade-off

**Інструменти:**
- **PyTorch:** torch.nn.utils.prune, torch.quantization
- **TensorFlow Model Optimization Toolkit**
- **Optimum (HuggingFace):** high-level API для compression
- **Neural Magic SparseML:** end-to-end sparsification

**Реальні benchmark результати:**
- BERT-base → DistilBERT: 40% менше, 60% швидше, 97% performance
- BERT-base → TinyBERT: 7.5x менше, 9.4x швидше, 96% performance
- ResNet-50 int8 vs float32: 3.7x throughput, 4x less memory, 0.5% accuracy loss`,
    example: "UK fintech: sentiment analysis model для 50k customer messages/день. BERT-large (340M params, 200ms/request) → compressed pipeline: quantization (int8) + DistilBERT → 15ms/request, 95.8% vs 96.7% accuracy. Savings: AWS inference cost £8,200/місяць → £680/місяць. ROI 3 місяці.",
    relatedTerms: ["quantization", "knowledge-distillation", "edge-ai"],
    relatedService: "mlops",
    relatedBlogPost: "ml-infrastructure-cost-optimization",
    relatedNichePage: "/ml/saas"
  },
  {
    slug: "knowledge-distillation",
    termUk: "Knowledge Distillation (дистиляція знань)",
    termEn: "Knowledge Distillation",
    category: "ai",
    shortDescription: "Навчання компактної «студентської» моделі відтворювати виходи та внутрішні представлення більшої «вчительської» моделі. Дозволяє зберегти 90%+ якості teacher у значно меншому розмірі.",
    fullDescription: `Knowledge Distillation (Hinton et al., Google, 2015) — елегантна техніка передачі «темних знань» від великої до малої моделі.

**Ключова ідея:**

Замість навчання student на hard labels (0 або 1), student навчається відтворювати soft probabilities teacher:
- Teacher каже: «Це котик з P=0.92, песик P=0.06, кролик P=0.02»
- Ці soft probs несуть більше інформації, ніж просто «котик»
- Student засвоює тонкі relationships між класами

**Типи дистиляції:**

**Response-Based (Output Distillation):**
- Student мінімізує KL divergence між своїм та teacher output
- Temperature scaling: T>1 softens probabilities → більше information

**Feature-Based (Intermediate Distillation):**
- Student відтворює hidden representations з intermediate layers teacher
- FitNets: student підганяє feature maps під teacher
- Краща якість, але складніша реалізація

**Relation-Based Distillation:**
- Передача відносин між data points (similarities, flows)
- RKD (Relational Knowledge Distillation): pairwise та triplet relations

**Self-Distillation:**
- Модель вчиться від власних попередніх прогнозів
- Born-Again Networks: кілька поколінь дистиляції

**Найвідоміші дистильовані моделі:**
| Teacher | Student | Compression | Performance |
|---------|---------|-------------|-------------|
| BERT-base | DistilBERT | 40% | 97% |
| BERT-large | TinyBERT | 7.5x | 96% |
| RoBERTa-large | DistilRoBERTa | 50% | 95% |
| GPT-2 124M | → fine-tuned smaller | varies | varies |

**UK deployment scenarios:**
- Embedded legal contract analyzer на solicitor laptops (offline)
- Medical triage model на NHS tablets в rural areas
- Real-time fraud scoring на bank POS terminals`,
    example: "UK insurance call centre: GPT-4o fine-tuned для claims processing (teacher, $0.03/call, 1.2s latency). Knowledge distillation: Llama 3 8B student навчається на 200k teacher outputs. Student: $0.0008/call, 180ms latency, 93.7% accuracy vs 96.2% teacher. ROI: £340k/рік savings при 50k calls/день.",
    relatedTerms: ["model-compression", "lora", "quantization"],
    relatedService: "mlops",
    relatedBlogPost: "ml-infrastructure-cost-optimization",
    relatedNichePage: "/ai/insurance"
  },
  {
    slug: "xai",
    termUk: "Пояснюваний ШІ (XAI, Explainable AI)",
    termEn: "Explainable AI (XAI)",
    category: "ai",
    shortDescription: "Методи інтерпретації рішень ML-моделей (SHAP, LIME, attention maps, контрфактуали). Вимагається FCA Consumer Duty 2023 та UK GDPR Article 22 для автоматизованих рішень, що впливають на споживачів.",
    fullDescription: `XAI — набір технік, що перетворюють «чорну скриньку» ML-моделі у систему, рішення якої можна пояснити людям: клієнтам, регуляторам та бізнес-командам.

**Класифікація методів XAI:**

**За scope:**
- **Global:** пояснює поведінку моделі в цілому (feature importance)
- **Local:** пояснює конкретне передбачення (чому ця заявка відхилена?)

**За підходом:**
- **Model-agnostic:** працюють з будь-якою моделлю (SHAP, LIME)
- **Model-specific:** для конкретних архітектур (attention maps для transformers)

**Ключові методи:**

**SHAP (SHapley Additive exPlanations):**
- Теоретично обґрунтований (game theory Shapley values)
- Кожна ознака отримує SHAP value: внесок у відхилення від baseline
- Типи: TreeSHAP (дерева), DeepSHAP (нейронні мережі), KernelSHAP (model-agnostic)
- Найпопулярніший метод для tabular ML в regulated industries

**LIME (Local Interpretable Model-agnostic Explanations):**
- Апроксимує складну модель простою (лінійною) локально
- Генерує perturbed samples навколо точки → fits простша модель
- Швидше SHAP для одного prediction

**Counterfactual Explanations:**
- «Ваша заявка відхилена. Якби ваш дохід був £31,000 (замість £28,000), вона б схвалена»
- Action-oriented: клієнт знає що змінити
- Вимога GDPR Article 22: right to meaningful information

**Attention Maps (Transformers):**
- Візуалізація які токени/патчі впливають на prediction
- GradCAM: gradient-weighted activation maps для CNN
- Limitation: attention ≠ causation (дискусійно)

**UK регуляторні вимоги:**
- **UK GDPR Article 22:** право на пояснення автоматизованих рішень
- **FCA Consumer Duty 2023:** "good outcomes" — клієнт має розуміти рішення
- **FCA SS1/23:** model documentation для financial models
- **Equality Act 2010:** пояснення мають включати protected characteristics analysis`,
    example: "UK mortgage lender: SHAP values для кожного відмовленого заявника. Customer portal: «Ваша заявка: основні фактори — loan-to-income ratio (внесок -0.23), employment history (внесок -0.18). Якби LTI був ≤4.5x, заявка б схвалена.» FCA audit: 100% decisions auditable, 0 complaints про lack of explanation у 2025.",
    relatedTerms: ["responsible-ai", "model-card", "ai-governance"],
    relatedService: "artificial-intelligence",
    relatedBlogPost: "responsible-ai-uk-regulations",
    relatedNichePage: "/ai/banking"
  },
  {
    slug: "ai-governance",
    termUk: "Управління ШІ (AI Governance)",
    termEn: "AI Governance",
    category: "ai",
    shortDescription: "Сукупність політик, процесів та контролів для відповідального розвитку AI: управління ризиками моделей, журнали аудиту, людський нагляд, моніторинг упередженості. Регулюється UK FCA SS1/23 та CDEI.",
    fullDescription: `AI Governance — операційний фреймворк, що гарантує: AI-системи в організації розробляються та використовуються безпечно, справедливо та відповідно до регуляторних вимог.

**Компоненти AI Governance Framework:**

**1. Model Risk Management (MRM):**
- Tier-based класифікація моделей за ризиком (High/Medium/Low)
- Independent model validation перед деплоєм
- Ongoing monitoring та periodic review cycle
- FCA SS1/23: обов'язково для всіх regulated firms

**2. AI Inventory та Registry:**
- Централізований реєстр всіх AI/ML моделей
- Метадані: власник, призначення, ризик-tier, статус, дата review
- Model Cards та Data Sheets для кожної моделі

**3. Human Oversight:**
- Human-in-the-loop для high-stakes decisions
- Clear escalation paths: коли людина overrides AI
- Audit trail людських переглядів та оверрайдів

**4. Bias & Fairness Monitoring:**
- Ongoing monitoring по protected characteristics (Equality Act 2010)
- Disparate impact analysis: Statistical Parity Difference, Equal Opportunity
- Automated alerts при виявленні bias drift

**5. AI Incident Management:**
- Процедури виявлення, репортингу та remediation AI incidents
- UK: AI incidents що впливають на споживачів → FCA notification
- Post-incident review та model update procedures

**UK Regulatory Landscape 2026:**
- **FCA SS1/23:** Model Risk Management (банки, insurtech, wealth managers)
- **ICO:** Accountability Framework + GDPR Article 5(2)
- **CDEI:** AI Assurance Guide, sector-specific roadmaps
- **NHS AI Lab:** governance для clinical AI
- **UK AI Safety Institute:** frontier model evaluation
- **AI Act (EU):** UK firms з EU operations → compliance required

**Governance Frameworks:**
- **NIST AI RMF (Risk Management Framework):** US standard, широко adopted UK
- **ISO/IEC 42001:** перший міжнародний стандарт для AI management systems
- **Alan Turing Institute AIACC:** AI Assurance — Compliance and Certification`,
    example: "UK insurtech (Lloyd's of London syndicate): впроваджує AI Governance після FCA SS1/23. Результат: 23 моделі класифіковані (8 High, 11 Medium, 4 Low risk), Model Registry в Confluence, quarterly validation cycle, dedicated Model Risk Officer призначений. FCA supervisory review: compliant. Board reporting: quarterly AI Risk Dashboard.",
    relatedTerms: ["responsible-ai", "model-card", "xai"],
    relatedService: "artificial-intelligence",
    relatedBlogPost: "responsible-ai-uk-regulations",
    relatedNichePage: "/ai/insurance"
  },

  // === 20 New AI/ML Terms (2026-06-23) ===
  {
    slug: "attention-mechanism",
    termUk: "Механізм уваги (Attention Mechanism)",
    termEn: "Attention Mechanism",
    category: "ai",
    shortDescription: "Ключова інновація архітектури Transformer — дозволяє моделі зважувати важливість кожного токену відносно інших у послідовності.",
    fullDescription: `Attention mechanism — математична операція, що обчислює для кожного токену в послідовності «ступінь релевантності» всіх інших токенів, формуючи зважену суму їхніх представлень.\n\n**Як працює Self-Attention:**\n1. Кожен токен проектується у три вектори: Query (Q), Key (K), Value (V)\n2. Attention score = softmax(QK^T / √d_k) — нормалізована косинусна подібність\n3. Вихід = зважена сума V за attention scores\n\n**Multi-Head Attention:**\nКілька паралельних attention heads вловлюють різні типи залежностей одночасно (синтаксис, семантика, кореференція). Стандарт GPT-4: 96 heads × 128 dimensions = 12,288 dim.\n\n**Застосування в UK бізнесі:**\n- Аналіз контрактів: модель «звертає увагу» на пов'язані клаузи в різних частинах документу\n- Credit scoring: увага до транзакцій у різних часових вікнах\n- Customer service: розуміння контексту всієї розмови при відповіді\n\n**Cross-Attention:**\nВикористовується в encoder-decoder моделях (T5, BART) — decoder «звертає увагу» на encoder representations при генерації. Основа машинного перекладу та summarization.`,
    example: "BERT аналізує речення «The bank can guarantee deposits will eventually cover future tuition costs» — attention mechanism правильно розв'язує неоднозначність «bank» (берег vs банк), зважуючи на «deposits» та «costs» у контексті.",
    relatedTerms: ["transformer-model", "llm", "fine-tuning"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/ai/marketing",
  },
  {
    slug: "embedding-model",
    termUk: "Модель ембедингів (Embedding Model)",
    termEn: "Embedding Model",
    category: "ai",
    shortDescription: "Нейромережа, що перетворює текст, зображення або інші дані на dense числові вектори у багатовимірному просторі — основа семантичного пошуку, RAG та рекомендаційних систем.",
    fullDescription: `Embedding model — нейромережа, навчена так, щоб семантично схожі елементи мали близькі вектори у просторі ембедингів. Відстань між векторами = семантична схожість.\n\n**Популярні text embedding моделі:**\n- **OpenAI text-embedding-3-large** (3072 dims): найвища якість, $0.00013/1K tokens\n- **text-embedding-3-small** (1536 dims): баланс ціна/якість для більшості задач\n- **sentence-transformers** (open-source): all-MiniLM-L6-v2 — безкоштовно, 384 dims\n- **E5-large-v2** (Microsoft): SOTA open-source для асиметричного пошуку\n- **BGE-M3** (BAAI): мультилінгвальний, включно з українською\n\n**Типи застосувань:**\n- **RAG retrieval:** документи → ембединги → ANN search при запиті\n- **Semantic deduplication:** виявлення дублікатів серед 10M+ документів\n- **Classification:** ембединги → логістична регресія замість fine-tuning\n- **Clustering:** k-means на ембедингах для тематичного групування\n\n**UK compliance:** При використанні OpenAI API — дані обробляються на серверах OpenAI. Для NHS/юридичних firm рекомендується self-hosted sentence-transformers або Azure OpenAI (data residency в UK).`,
    example: "UK legal firm: 50,000 документів → sentence-transformers ембединги → Qdrant. Юрист питає «force majeure для пандемії» → semantic search знаходить 23 релевантних контракти за 80ms, навіть якщо вони не містять цих точних слів.",
    relatedTerms: ["vector-database", "rag", "attention-mechanism"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/ai/legal",
  },
  {
    slug: "xgboost",
    termUk: "XGBoost (Gradient Boosting)",
    termEn: "XGBoost (eXtreme Gradient Boosting)",
    category: "ai",
    shortDescription: "Провідний ансамблевий алгоритм для табличних даних, що послідовно будує дерева рішень для виправлення залишкових помилок. Золотий стандарт для UK бізнес-даних: fraud detection, credit scoring, churn.",
    fullDescription: `XGBoost — реалізація gradient boosting, що виграла сотні Kaggle-змагань і стала стандартом для structured/tabular ML у фінансах, ритейлі та охороні здоров'я.\n\n**Принцип роботи:**\n1. Перше дерево прогнозує target (наприклад, default probability)\n2. Обчислюється residual error (різниця між прогнозом і реальністю)\n3. Наступне дерево прогнозує цей residual\n4. Процес повторюється N разів (n_estimators)\n5. Фінальний прогноз = сума всіх N дерев × learning_rate\n\n**XGBoost vs LightGBM vs CatBoost:**\n- **XGBoost:** level-wise tree growth, стабільний, підтримує GPU, найширша документація\n- **LightGBM:** leaf-wise growth, до 20× швидший на великих датасетах (>100K рядків)\n- **CatBoost:** автоматична обробка категоріальних features без preprocessing\n\n**UK business gold standard use cases:**\n- Fraud detection: <5ms inference per transaction для real-time scoring\n- Credit scoring: SHAP для FCA-compliant adverse action letters\n- Demand forecasting: lag features + XGBoost → MAPE <10%\n- Churn prediction: behavioral features → AUC 0.87-0.94`,
    example: "UK challenger bank: LightGBM ensemble (3 seeds) для fraud scoring. 1.2M transactions/day, inference 3.2ms/transaction. AUC 0.943, FPR 0.28%. SHAP values автоматично генерують регуляторні пояснення для FCA.",
    relatedTerms: ["gradient-boosting", "feature-engineering", "shap-values"],
    relatedService: "machine-learning",
    relatedBlogPost: "ml-fraud-anomaly-detection-fca",
    relatedNichePage: "/ml/banking",
  },
  {
    slug: "batch-inference",
    termUk: "Пакетний інференс (Batch Inference)",
    termEn: "Batch Inference",
    category: "mlops",
    shortDescription: "Запуск ML-прогнозів на великих наборах даних пакетами — зазвичай вночі або за розкладом. Дешевше та ефективніше за real-time inference; підходить для UK страхових поновлень, ризик-скорингу, рекомендацій.",
    fullDescription: `Batch inference — обробка ML-прогнозів для великих датасетів одним пакетом, а не по одному запиту. Протилежність: real-time (online) inference.\n\n**Коли використовувати batch inference:**\n- Результати не потрібні миттєво (нічна обробка, щотижневі звіти)\n- Великий обсяг даних: 1M+ записів за раз\n- Compute-intensive моделі: LLM summarization, complex ensembles\n- Коли latency не критична: insurance renewals, credit reviews, inventory planning\n\n**Архітектура batch pipeline:**\n1. Scheduler (Airflow, Prefect, dbt) запускає pipeline за розкладом\n2. Feature retrieval з Feature Store або data warehouse\n3. Model inference (batch predict) — на GPU/CPU кластері\n4. Results write-back до database або downstream systems\n5. Monitoring: accuracy check + drift detection на batch\n\n**UK business приклади:**\n- Страхування: щорічне поновлення 500K полісів — batch pricing overnight\n- Ритейл: weekly demand forecast для 50K SKUs\n- CRM: monthly LTV refresh для 2M клієнтів\n- Banking: quarterly credit review portfolio scoring\n\n**Cost optimization:** Batch на spot/preemptible instances (AWS/GCP/Azure) на 60-80% дешевше за on-demand.`,
    example: "UK insurer: batch inference кожної ночі для 180K renewal policies. LightGBM модель на 47 features → risk score + recommended premium. Pipeline час: 23 хвилини для 180K записів на 4×g4dn.xlarge spot instances. Вартість: £0.84/ніч замість £3.20 on-demand.",
    relatedTerms: ["mlops", "model-monitoring", "feature-store"],
    relatedService: "machine-learning",
    relatedNichePage: "/ml/insurance",
  },
  {
    slug: "model-registry",
    termUk: "Реєстр моделей (Model Registry)",
    termEn: "Model Registry",
    category: "mlops",
    shortDescription: "Централізований репозиторій для версіонування ML-моделей, відстеження їх метаданих та управління lifecycle від Staging до Production. MLflow та SageMaker Model Registry — найпоширеніші рішення.",
    fullDescription: `Model Registry — центральне сховище, де зберігаються зареєстровані ML-моделі з повним набором метаданих: версія, метрики якості, параметри тренування, посилання на тренувальний датасет, автор.\n\n**Lifecycle states:**\n- **Staging:** модель пройшла validation, готується до виробничого тестування\n- **Production:** активна production-модель, обслуговує live трафік\n- **Archived:** замінена новішою версією, зберігається для rollback\n- **Failed:** не пройшла validation gates\n\n**Ключові функції:**\n- Version tracking: кожен зареєстрований артефакт (pickle, ONNX, PyTorch) з хешем\n- Approval workflows: model review перед просуванням до Production\n- Automated gates: AUC > 0.85, fairness metrics, inference latency < 50ms\n- Rollback: миттєвий повернення до попередньої версії при деградації\n- Audit trail: хто, коли, що змінив — критично для FCA SS1/23\n\n**Рішення:**\n- **MLflow Model Registry** (open-source): найпопулярніше, self-hosted\n- **SageMaker Model Registry** (AWS): managed, з built-in approval workflows\n- **Vertex AI Model Registry** (GCP): native GCP integration\n- **W&B Model Registry** (Weights & Biases): з experiment tracking`,
    example: "UK bank з 15 production ML-моделями: MLflow Model Registry з automated gates (AUC, fairness, latency). Champion-challenger tests через registry. FCA-аудит: повна historія всіх 47 model versions за 2 роки з automated lineage documentation.",
    relatedTerms: ["mlops", "model-monitoring", "a-b-testing-ml"],
    relatedService: "machine-learning",
    relatedNichePage: "/ml/banking",
  },
  {
    slug: "data-labeling",
    termUk: "Розмітка даних (Data Labeling)",
    termEn: "Data Labeling (Data Annotation)",
    category: "data",
    shortDescription: "Процес анотації тренувальних даних ground truth мітками — ключовий bottleneck для supervised ML. Active learning скорочує потребу в розмітці на 60-80%.",
    fullDescription: `Data labeling — присвоєння цільових міток (labels) навчальним прикладам для supervised learning. Якість розмітки безпосередньо визначає якість ML-моделі: «garbage labels in, garbage model out».\n\n**Типи annotation задач:**\n- **Classification:** кожен приклад отримує одну або кілька категорій\n- **Object Detection:** bounding boxes навколо об'єктів на зображенні\n- **Segmentation:** попіксельна розмітка зон\n- **NER:** виділення named entities у тексті\n- **Preference labeling:** вибір кращої відповіді між двома (для RLHF)\n\n**Inter-annotator agreement (IAA):**\nЯкість розмітки вимірюється через Cohen's Kappa (κ > 0.7 — хороша якість) або Fleiss Kappa для кількох анотаторів. Низький IAA = неоднозначне завдання або погана інструкція.\n\n**Active Learning:**\nML-модель вибирає найбільш інформативні нерозмічені приклади для анотації — замість випадкової вибірки. Результат: 60-80% менше анотацій при тій же якості моделі.\n\n**Платформи:**\n- Label Studio (open-source): text, image, audio, video\n- Scale AI / Labelbox: enterprise managed annotation\n- Prodigy (Explosion): для NLP зі span annotation\n\n**UK domain expertise:**\nДля медичних, юридичних або фінансових датасетів потрібні domain experts-анотатори, а не crowd workers — вартість зростає 5-10×, але якість критично важливіша.`,
    example: "UK pathology startup: 1,200 histology slides потребують анотації (cancer vs non-cancer). Active learning з Label Studio: модель вибирає найбільш неоднозначні slides. Після 800 annotations (vs планових 1,200) AUC досяг 0.91 — економія 33% annotation cost.",
    relatedTerms: ["machine-learning", "transfer-learning", "class-imbalance"],
    relatedService: "machine-learning",
    relatedNichePage: "/ai/healthcare",
  },
  {
    slug: "class-imbalance",
    termUk: "Дисбаланс класів (Class Imbalance)",
    termEn: "Class Imbalance",
    category: "data",
    shortDescription: "ML-проблема, коли один клас набагато рідший за інший (наприклад, 1:100 при fraud detection). Вирішується через SMOTE, class weights, threshold tuning та спеціалізовані метрики.",
    fullDescription: `Class imbalance виникає коли цільова змінна суттєво нерівномірна — типова ситуація у fraud detection, medical diagnosis, churn prediction де positive клас рідкісний.\n\n**Типові imbalance ratios у UK бізнесі:**\n- Fraud detection: 0.1-0.5% fraudulent transactions (1:200 to 1:1000)\n- Credit default: 2-8% default rate (1:12 to 1:50)\n- Churn (SaaS): 2-5% monthly churn (1:20 to 1:50)\n- Medical rare diseases: 0.01-1% prevalence\n\n**Техніки вирішення:**\n\n**Data-level:**\n- **SMOTE** (Synthetic Minority Oversampling): синтетичні приклади minority class через interpolation між сусідами\n- **ADASYN:** adaptive SMOTE, більше синтетичних прикладів у складних зонах\n- **Random undersampling:** видалення більшості majority class прикладів\n\n**Algorithm-level:**\n- **class_weight='balanced':** автоматичний розрахунок ваг у sklearn, XGBoost scale_pos_weight\n- **Focal loss:** підвищує вагу важких (minority) прикладів у нейромережах\n\n**Evaluation-level:**\n- PR-AUC замість ROC-AUC для сильно imbalanced даних\n- F-beta score (β > 1 для вищої ваги Recall)\n- Threshold tuning: не 0.5, а оптимальний поріг за business cost matrix`,
    example: "UK insurtech: 0.3% fraudulent claims (1:333). SMOTE + class_weight на LightGBM → PR-AUC 0.78 (vs 0.31 без обробки). Optimal threshold 0.23 (vs default 0.5) за cost matrix (missed fraud cost 15× false positive).",
    relatedTerms: ["machine-learning", "data-labeling", "cross-validation"],
    relatedService: "machine-learning",
    relatedNichePage: "/ml/insurance",
  },
  {
    slug: "cross-validation",
    termUk: "Перехресна валідація (Cross-Validation)",
    termEn: "Cross-Validation (k-Fold CV)",
    category: "data",
    shortDescription: "Методика оцінки ML-моделі, що розбиває дані на k фолдів для надійних оцінок якості та виявлення overfitting. Стандарт для regulated ML-моделей у UK фінансах та охороні здоров'я.",
    fullDescription: `Cross-validation — техніка оцінки generalization performance ML-моделі на даних, що не брали участі у тренуванні, без втрати частини тренувального набору.\n\n**k-Fold Cross-Validation:**\n1. Дані розбиваються на k рівних фолдів (зазвичай k=5 або k=10)\n2. Модель тренується на k-1 фолдах, оцінюється на 1-му (validation fold)\n3. Процес повторюється k разів — кожен фолд стає validation один раз\n4. Фінальна оцінка = середнє ± std метрики по k фолдах\n\n**Варіанти для специфічних задач:**\n- **Stratified k-Fold:** зберігає пропорції класів у кожному фолді (важливо при imbalance)\n- **Time Series CV (Walk-Forward):** для time-series — не випадкове розбиття, а хронологічне\n- **Group k-Fold:** коли дані мають групи, що не повинні потрапити в різні фолди одночасно\n- **Nested CV:** outer loop для model selection, inner loop для hyperparameter tuning\n\n**Чому CV критичний для UK regulated models:**\nFCA SS1/23 та Bank of England вимагають robust validation evidence. Одна train/test split — недостатньо для validation documentation. CV дає статистично значущу оцінку generalization performance з confidence intervals.`,
    example: "UK credit scoring model: 5-Fold Stratified CV + TimeSeriesSplit для temporal validation. AUC: 0.847 ± 0.012 (5-fold). Позначено у Model Card. Challenger model: 0.863 ± 0.009 — статистично значуще покращення (paired t-test p=0.03) → promoted до Production.",
    relatedTerms: ["machine-learning", "class-imbalance", "data-labeling"],
    relatedService: "machine-learning",
    relatedNichePage: "/ml/banking",
  },
  {
    slug: "named-entity-recognition",
    termUk: "Розпізнавання іменованих сутностей (NER)",
    termEn: "Named Entity Recognition (NER)",
    category: "nlp",
    shortDescription: "NLP-задача витягування структурованих сутностей (люди, організації, дати, суми) з неструктурованого тексту. Застосовується в аналізі контрактів, AML-скринінгу, парсингу медичних записів NHS.",
    fullDescription: `Named Entity Recognition (NER) — задача sequence labeling, де модель ідентифікує та класифікує іменовані сутності у тексті.\n\n**Стандартні типи сутностей:**\n- **PER** (Person): «John Smith», «Олена Коваль»\n- **ORG** (Organisation): «Barclays», «NHS Trust», «FCA»\n- **LOC / GPE** (Location / Geo-Political Entity): «Manchester», «UK», «Kyiv»\n- **DATE / TIME:** «January 2024», «Q3 2025»\n- **MONEY:** «£2.5M», «$500K»\n- **LAW:** «Companies Act 2006», «FCA SS1/23»\n\n**Моделі для UK English:**\n- **SpaCy en_core_web_trf** (transformer-based): висока якість, GPU рекомендується\n- **BERT fine-tuned on CoNLL-2003:** стандарт для загального NER\n- **GLiNER:** zero-shot NER для нових типів без fine-tuning\n- **GPT-4o** (few-shot): для складних domain-specific entities без тренування\n\n**Спеціалізовані домени:**\n- **Finance/Legal:** Custom types: CLAUSE, COUNTERPARTY, JURISDICTION, OBLIGATION\n- **Medical/NHS:** Med7, SciSpaCy — drug names, dosages, diagnoses\n- **AML:** PEP names, sanctioned entities, shell company patterns`,
    example: "UK law firm: SpaCy + fine-tuned BERT NER на 2,000 annotated contracts. Types: PARTY, OBLIGATION, DATE, PENALTY, JURISDICTION. Precision 94.2%, Recall 91.7%. 500 contracts processed/hour vs 12 manually. Contract review time: -78%.",
    relatedTerms: ["clinical-nlp", "transfer-learning", "sentiment-analysis"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/ai/legal",
  },
  {
    slug: "sentiment-analysis",
    termUk: "Аналіз тональності (Sentiment Analysis)",
    termEn: "Sentiment Analysis",
    category: "nlp",
    shortDescription: "Автоматична класифікація тексту як позитивного, негативного або нейтрального. Застосовується для аналізу відгуків клієнтів, моніторингу бренду та соціального прослуховування UK ринку.",
    fullDescription: `Sentiment Analysis — NLP-задача визначення емоційної полярності тексту. Від базової three-class (pos/neg/neu) до fine-grained (1-5 зірок), aspect-based та emotion detection.\n\n**Рівні аналізу:**\n- **Document-level:** загальна тональність усього відгуку\n- **Sentence-level:** тональність кожного речення окремо\n- **Aspect-based (ABSA):** «їжа [positive], але сервіс [negative] і ціни [neutral]»\n- **Emotion detection:** радість, гнів, страх, сум, здивування, огида\n\n**Підходи:**\n\n**Lexicon-based:**\n- VADER (для соцмереж), TextBlob — без тренування, але низька якість\n\n**ML-based:**\n- **BERT fine-tuned** (cardiffnlp/twitter-roberta-base-sentiment): SOTA для соцмереж\n- **DistilBERT** для production (6× швидший за BERT, 97% якості)\n- **GPT-4o few-shot:** для нових доменів без labeled data\n\n**UK business use cases:**\n- Trustpilot/Google Reviews аналіз: автоматичний routing негативних відгуків до Customer Success\n- Social listening: Twitter/X моніторинг brand sentiment у реальному часі\n- NPS text analysis: відкриті відповіді → actionable insights\n- FCA: аналіз скарг клієнтів для Consumer Duty compliance`,
    example: "UK retail bank: DistilBERT fine-tuned на 15,000 annotated customer complaints. Precision 92%, F1 0.89. Автоматична ескалація «very negative» до senior team. FCA Consumer Duty report: автоматична агрегація sentiment trends by product line — 8 годин ручної роботи → 15 хвилин.",
    relatedTerms: ["named-entity-recognition", "transfer-learning", "clinical-nlp"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/ai/marketing",
  },
  {
    slug: "text-chunking",
    termUk: "Чанкінг тексту (Text Chunking)",
    termEn: "Text Chunking (Document Chunking)",
    category: "nlp",
    shortDescription: "Розбиття документів на оптимально-розмірні фрагменти перед ембедингом для RAG-retrieval. Розмір чанку, overlap та стратегія критично впливають на якість відповідей RAG-системи.",
    fullDescription: `Text chunking — перший та критичний крок побудови RAG-системи. Помилковий chunking → поганий retrieval → hallucinations навіть при гарній LLM.\n\n**Стратегії chunking:**\n\n**Fixed-size chunking:**\n- Розбивка по N токенів з M токенів overlap (типово: 512 tokens, 50 overlap)\n- Проста, але ігнорує семантичну структуру\n- Підходить для однорідного тексту (новини, відгуки)\n\n**Semantic chunking:**\n- Embeds consecutive sentences → якщо cosine distance між сусідніми sentence-groups > threshold → новий chunk\n- Чанки відповідають семантичним одиницям, а не довільним зрізам\n\n**Recursive character splitting:**\n- Ієрархічні роздільники: \\n\\n → \\n → «. » → «, » → символ\n- LangChain RecursiveCharacterTextSplitter — стандарт для загальних документів\n\n**Document-aware chunking:**\n- Markdown: split by headers (# → ## → ###)\n- PDF: по параграфах, зберігаючи таблиці та списки цілими\n- Legal contracts: по артиклях та пунктах\n\n**Chunk size tradeoffs:**\n- Малі чанки (128-256 tokens): точний retrieval, але втрата контексту\n- Великі чанки (1024-2048 tokens): більше контексту, але менша точність пошуку\n- Hybrid: small chunks для retrieval, parent chunks для context (ParentDocumentRetriever)`,
    example: "UK law firm RAG: contracts чанковано по артиклях (semantic), а не fixed-size. Retrieval Precision@5: 0.91 vs 0.67 для fixed-size 512. Відповіді LLM містять точні clause references замість загальних тверджень.",
    relatedTerms: ["rag", "embedding-model", "named-entity-recognition"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/ai/legal",
  },
  {
    slug: "fca-consumer-duty",
    termUk: "FCA Consumer Duty (Обов'язок перед споживачем)",
    termEn: "FCA Consumer Duty",
    category: "regulation",
    shortDescription: "Правило FCA від липня 2023 року, що зобов'язує фінансові компанії демонструвати позитивні результати для клієнтів. ML-моделі, що скорюють клієнтів, мають бути пояснювані та справедливі.",
    fullDescription: `FCA Consumer Duty — регуляторний стандарт FCA (PS22/9), що набрав чинності 31 липня 2023 для нових продуктів та 31 липня 2024 для closed book. Фундаментально змінює підхід до використання ML у UK фінансових послугах.\n\n**Чотири результати Consumer Duty:**\n1. **Products and Services:** відповідні для цільового ринку\n2. **Price and Value:** справедлива ціна відносно цінності\n3. **Consumer Understanding:** чіткі, прозорі комунікації\n4. **Consumer Support:** ефективна підтримка\n\n**Вплив на ML-системи:**\n\n**Algorithmic pricing:**\n- Моделі ціноутворення не повинні sistemically завдавати шкоди вразливим клієнтам\n- Price walking (підвищення цін для лояльних клієнтів) — порушення\n- Обов'язкова fairness testing за демографічними групами\n\n**Automated decisions:**\n- Відмова у продукті через ML-модель → обов'язкове пояснення клієнту\n- Appeals process для автоматизованих рішень\n- SHAP-пояснення стають регуляторним стандартом\n\n**Vulnerable customers:**\n- ML-моделі повинні ідентифікувати ознаки vulnerability (фінансові труднощі, когнітивні обмеження)\n- Адаптований підхід для vulnerable customers`,
    example: "UK motor insurer: після Consumer Duty pricing model audit виявив, що клієнти 65+ платили в середньому 23% більше при тому ж ризик-профілі. Модель перенавчена з fairness constraints → premium gap скоротився до 3% → FCA supervisory review: compliant.",
    relatedTerms: ["algorithmic-bias", "model-risk-management", "explainable-ai"],
    relatedService: "machine-learning",
    relatedBlogPost: "fca-ml-explainability-guide",
    relatedNichePage: "/ml/banking",
  },
  {
    slug: "algorithmic-bias",
    termUk: "Алгоритмічне упередження (Algorithmic Bias)",
    termEn: "Algorithmic Bias",
    category: "regulation",
    shortDescription: "Систематична несправедлива дискримінація у виходах ML-моделі проти захищених характеристик. UK Equality Act 2010 застосовується; вимагає bias audits та fairness testing перед деплоєм.",
    fullDescription: `Algorithmic bias — коли ML-модель систематично дає гірші результати (вищі false positive rates, нижчі approval rates) для груп з певними характеристиками.\n\n**Джерела bias:**\n\n**Historical bias:**\n- Training data відображає минулі дискримінаційні рішення\n- Кредитний скоринг навчений на даних де жінки систематично отримували менше кредитів\n\n**Measurement bias:**\n- Proxy variables: використання поштового індексу як proxy для race/ethnicity\n- Geographic redlining через location features\n\n**Sampling bias:**\n- Training data не репрезентує усі демографічні групи рівно\n\n**UK правовий контекст:**\n- **Equality Act 2010:** заборона дискримінації за 9 protected characteristics (race, sex, age, disability, religion, sexual orientation, pregnancy, gender reassignment, marriage)\n- **GDPR Article 22:** право на оскарження автоматизованих рішень\n- **FCA Consumer Duty:** обов'язок демонструвати справедливі результати\n\n**Fairness метрики:**\n- **Demographic Parity:** однаковий approval rate між групами\n- **Equal Opportunity:** однаковий True Positive Rate між групами\n- **Calibration:** однакова прогнозна точність між групами\n\n**Аудит інструменти:** Fairlearn (Microsoft), AI Fairness 360 (IBM), What-If Tool (Google)`,
    example: "UK mortgage lender: fairness audit виявив disparate impact — approval rate для Black applicants 47% vs 68% для White applicants при однакових фінансових показниках. Proxy: postcode features. Видалення geographic features + SHAP analysis: gap скоротився до 3% без значного падіння AUC.",
    relatedTerms: ["fca-consumer-duty", "model-risk-management", "explainable-ai"],
    relatedService: "machine-learning",
    relatedBlogPost: "fca-ml-explainability-guide",
    relatedNichePage: "/ml/banking",
  },
  {
    slug: "model-risk-management",
    termUk: "Управління ризиками моделей (Model Risk Management)",
    termEn: "Model Risk Management (MRM)",
    category: "regulation",
    shortDescription: "Governance-фреймворк для ідентифікації, вимірювання та контролю ризиків від ML-моделей. FCA SS1/23, Bank of England expectations та BCBS 239 визначають MRM-вимоги для UK фінансових установ.",
    fullDescription: `Model Risk Management (MRM) — системний підхід до управління ризиками, що виникають від використання ML та кількісних моделей у прийнятті бізнес-рішень.\n\n**UK регуляторна база:**\n- **FCA SS1/23** (Model Risk Management Principles for Banks): опублікований 2023, очікує впровадження до 2025\n- **Bank of England SS1/23:** паралельний стандарт для PRA-regulated firms\n- **BCBS 239:** Basel Committee — principles for risk data aggregation\n- **SR 11-7** (Fed Reserve): reference standard, широко adopted в UK\n\n**MRM lifecycle:**\n1. **Model inventory:** централізований реєстр всіх моделей з risk tier (High/Medium/Low)\n2. **Model development:** documentation, testing, validation requirements per tier\n3. **Independent Model Validation (IMV):** validation відокремлена від development team\n4. **Approval:** Model Risk Committee review та sign-off\n5. **Ongoing monitoring:** performance, drift, limit breaches\n6. **Periodic review:** re-validation кожні 1-3 роки залежно від tier\n7. **Decommission:** documented sunset process\n\n**High-risk model criteria:**\n- Significant financial impact (>£1M exposure)\n- Regulatory capital calculation\n- Automated credit/insurance decisions affecting consumers\n- Models subject to FCA Consumer Duty`,
    example: "UK investment bank: 47 production ML-моделей класифіковано за MRM: 8 High (VAR, credit scoring), 23 Medium, 16 Low. High-tier моделі: quarterly IMV, Model Risk Committee approval, SHAP documentation. FCA SS1/23 readiness assessment: 91% compliant. Gap: 4 моделі потребують updated documentation.",
    relatedTerms: ["algorithmic-bias", "fca-consumer-duty", "model-card"],
    relatedService: "machine-learning",
    relatedBlogPost: "fca-ml-explainability-guide",
    relatedNichePage: "/ml/banking",
  },
  {
    slug: "roi-ml",
    termUk: "ROI для ML-проєктів",
    termEn: "ROI for ML Projects",
    category: "business",
    shortDescription: "Розрахунок повернення інвестицій для ML-ініціатив. Типові UK бенчмарки: fraud detection 3-8×, demand forecasting 4-10×, churn prediction 2-5× впродовж 12 місяців.",
    fullDescription: `ROI для ML-проєктів розраховується складніше, ніж для традиційних IT-проєктів, оскільки включає як прямі фінансові вигоди, так і операційні покращення.\n\n**ROI формула для ML:**\nROI = (Financial Benefits - Total Costs) / Total Costs × 100%\n\n**Total Costs включають:**\n- Data engineering та підготовка (часто 60-70% загального часу)\n- ML development та experimentation\n- Infrastructure (cloud, GPU)\n- MLOps та monitoring\n- Compliance та documentation (особливо у regulated industries)\n- Change management та training\n\n**UK industry benchmarks (12-month ROI):**\n- **Fraud detection (banking):** 300-800% — кожен £1 saved від fraud vs £0.15-0.30 ML cost\n- **Demand forecasting (retail):** 400-1000% — inventory reduction, fewer stockouts\n- **Churn prediction (SaaS/telco):** 200-500% — retained MRR vs CS team cost\n- **Predictive maintenance (manufacturing):** 300-600% — unplanned downtime prevention\n- **Credit scoring improvement:** 200-400% — lower default rates at same approval rate\n\n**Payback period:**\n- Simple ML projects (single model, clear data): 4-8 months\n- Platform play (MLOps + multiple models): 12-24 months\n- Enterprise AI transformation: 24-36 months`,
    example: "UK grocery chain: ML demand forecasting project. Cost: £180K (6 months, 3 people). Benefits year 1: waste reduction £420K + stockout revenue recovery £310K + inventory capital release £85K = £815K. ROI = (£815K - £180K) / £180K = 353%. Payback: 2.7 months.",
    relatedTerms: ["business-case-ml", "model-monitoring", "demand-forecasting"],
    relatedService: "machine-learning",
    relatedNichePage: "/ml/retail",
  },
  {
    slug: "business-case-ml",
    termUk: "Бізнес-кейс для ML (Business Case)",
    termEn: "Business Case for ML",
    category: "business",
    shortDescription: "Внутрішній документ, що обґрунтовує ML-інвестицію: постановка проблеми, поточний cost baseline, прогнозовані заощадження, build vs buy аналіз, реєстр ризиків.",
    fullDescription: `Business case для ML-проєкту — структурований документ, що відповідає на питання: «Чому ми робимо це, скільки це коштує, і що ми отримаємо?»\n\n**Структура business case:**\n\n**1. Problem Statement:**\n- Опис поточної проблеми з вимірювальними показниками\n- «Fraud losses: £3.2M/year. 94% False Positive Rate у rule-based системі → 12,400 analyst hours/month на перевірку»\n\n**2. Current State Baseline:**\n- Кількісний опис поточної ефективності (cost, time, accuracy)\n- Comparison з industry benchmarks\n\n**3. Proposed Solution:**\n- ML підхід та очікувані метрики (AUC, recall, precision)\n- Architecture overview\n\n**4. Financial Analysis:**\n- Investment: people, infrastructure, data, compliance\n- Benefits: cost reduction, revenue uplift, risk mitigation\n- NPV, IRR, Payback Period\n- Sensitivity analysis (best/base/worst case)\n\n**5. Build vs Buy analysis:**\n- Build: більше контролю, IP ownership, competitive advantage, але дорожче\n- Buy (SaaS/API): швидше time-to-value, менший tech risk, але vendor dependency\n- Hybrid: foundation models (buy) + domain-specific fine-tuning (build)\n\n**6. Risk Register:**\nData availability, model performance, regulatory compliance, change management\n\n**7. Implementation Roadmap:**\nPhased approach з clear milestones та go/no-go decisions`,
    example: "UK insurer business case для claims fraud detection ML: Problem (£4.1M fraud/year). Build cost £240K. Benefits: fraud reduction £2.1M/year + analyst FTE savings £380K = £2.48M/year. ROI 933%. Risks: data quality (Medium), FCA compliance (Low — SHAP built-in), adoption (High — change management needed). Board approved.",
    relatedTerms: ["roi-ml", "model-risk-management", "mlops"],
    relatedService: "machine-learning",
    relatedNichePage: "/ml/insurance",
  },
  {
    slug: "gpu-inference",
    termUk: "GPU-інференс (GPU Inference)",
    termEn: "GPU Inference",
    category: "infrastructure",
    shortDescription: "Запуск ML-прогнозів на Graphics Processing Unit — у 10-100 разів швидший за CPU для трансформерних моделей. NVIDIA A100/H100 на AWS/Azure є стандартом для UK production LLM та computer vision.",
    fullDescription: `GPU inference — виконання ML-моделей на GPU замість CPU завдяки масивному паралелізму (тисячі CUDA cores vs десятки CPU cores).\n\n**Чому GPU для inference:**\n- Transformer models (BERT, GPT): матричні множення → GPU 50-100× швидший за CPU\n- Computer Vision (YOLO, ResNet): 2D convolutions → GPU 10-50× швидший\n- CPU inference: прийнятний для XGBoost, small sklearn models\n\n**NVIDIA GPU ecosystem:**\n- **H100 SXM5** (80GB HBM3): SOTA, до 3.9 TFLOPS BF16. Cloud: $4-8/hour\n- **A100** (40/80GB): production стандарт. Cloud: $2-3/hour\n- **A10G** (24GB): cost-effective для inference. Cloud: $1-1.5/hour\n- **T4** (16GB): Entry-level inference, AWS G4. Cloud: $0.5-0.75/hour\n- **L4** (24GB): NVIDIA latest cost-optimized. Cloud: $0.7-0.9/hour\n\n**Оптимізації для inference:**\n- **TensorRT:** NVIDIA компілятор, 2-5× прискорення через quantization + kernel fusion\n- **INT8/FP16 quantization:** 2× менша пам'ять, 2× швидше, <1% accuracy drop\n- **Flash Attention 2:** 2-4× прискорення attention у LLM inference\n- **vLLM:** PagedAttention для LLM serving, 24× вищий throughput\n\n**UK cloud options:**\n- AWS: g5/g4dn instances (A10G/T4)\n- Azure: NC A100 v4, НT4 v3\n- GCP: A100, L4 instances\n- Hetzner GPU Cloud: A100 €1.35/hour — cost-effective для UK startups`,
    example: "UK LegalTech: RAG-система для contract analysis. CPU inference (8 vCPU): 4.2 sec/query, throughput 14 queries/min. GPU inference (A10G): 0.18 sec/query, throughput 280 queries/min. Cost: CPU £0.32/hour vs A10G £1.45/hour. At 200+ concurrent users — GPU 6× more cost-efficient.",
    relatedTerms: ["kubernetes-ml", "batch-inference", "edge-computing"],
    relatedService: "machine-learning",
    relatedNichePage: "/ml/saas",
  },
  {
    slug: "kubernetes-ml",
    termUk: "Kubernetes для ML (K8s ML)",
    termEn: "Kubernetes for ML Workloads",
    category: "infrastructure",
    shortDescription: "Container orchestration для ML-навантажень: управління model serving pods, auto-scaling, rolling deployments. Стандарт для UK production MLOps — від Kubeflow до KServe та Seldon.",
    fullDescription: `Kubernetes (K8s) — де-факто стандарт оркестрації контейнерів для production ML-систем, де потрібні надійність, масштабованість та reproducibility.\n\n**ML-специфічні компоненти K8s:**\n\n**Model Serving:**\n- **KServe** (ex KFServing): Kubernetes-native model serving, підтримує TensorFlow, PyTorch, XGBoost, custom runtimes\n- **Seldon Core:** enterprise ML serving, explainability built-in (Alibi)\n- **BentoML:** developer-friendly, Python-native serving з K8s deployment\n- **Triton Inference Server** (NVIDIA): high-performance GPU inference\n\n**ML Pipelines:**\n- **Kubeflow Pipelines:** ML workflow orchestration на K8s\n- **Argo Workflows:** general purpose, широко adopted для ML\n- **Prefect + K8s:** Python-first workflow orchestration\n\n**Auto-scaling для ML:**\n- **HPA** (Horizontal Pod Autoscaler): scale pods по CPU/memory або custom metrics (queue depth, GPU utilization)\n- **KEDA** (Kubernetes Event-Driven Autoscaling): scale to zero при відсутності трафіку — економія 70-90% у batch scenarios\n- **Node Auto-provisioning:** автоматичне додавання GPU nodes при зростанні навантаження\n\n**GPU resource management:**\n- nvidia.com/gpu resource requests у Pod spec\n- GPU sharing (MIG, TimeSlicing) для кількох small models на одному GPU\n- GPU node pools: on-demand + spot/preemptible для batch jobs`,
    example: "UK fintech: KServe на GKE для 7 ML-моделей (fraud, credit, AML, churn, recommender). KEDA scale-to-zero для batch inference: 70% cost savings off-peak. Blue-green deployment для champion-challenger ML testing. P99 latency: 18ms. 99.97% uptime SLA.",
    relatedTerms: ["gpu-inference", "batch-inference", "model-registry"],
    relatedService: "machine-learning",
    relatedNichePage: "/ml/saas",
  },
  {
    slug: "precision-recall",
    termUk: "Точність і Повнота (Precision & Recall)",
    termEn: "Precision & Recall",
    category: "data",
    shortDescription: "Precision = TP / (TP+FP) — частка правильних позитивних прогнозів; Recall = TP / (TP+FN) — частка знайдених реальних позитивів. F1-score — гармонічне середнє; компроміс між ними критичний для fraud-detection та precision medicine.",
    fullDescription: `Precision і Recall — фундаментальні метрики класифікаційних ML-моделей, особливо при нерівномірному розподілі класів (class imbalance).\n\n**Визначення:**\n- **Precision (Точність):** TP / (TP + FP). З усіх прогнозованих позитивів — скільки справді позитивні. Висока precision = мало хибних тривог.\n- **Recall (Повнота):** TP / (TP + FN). З усіх реальних позитивів — скільки модель знайшла. Висока recall = мало пропущених випадків.\n- **F1-score:** 2 × (Precision × Recall) / (Precision + Recall). Балансований показник.\n- **F-beta:** зважений варіант; F2 акцентує recall, F0.5 — precision.\n\n**Precision-Recall trade-off:**\nЗміна порогу класифікатора (threshold) зсуває баланс:\n- Знижуємо поріг → більше позитивів → вище recall, нижче precision\n- Підвищуємо поріг → менше позитивів → вище precision, нижче recall\n\n**UK business контекст:**\n- **Fraud detection (e-commerce, banking):** High recall пріоритет — пропустити шахрайство дорожче, ніж заблокувати легітимну транзакцію. Recall ≥ 0.95 — типова UK fintech вимога.\n- **Medical diagnosis (NHS AI tools):** High recall критично — missed diagnosis має важкі наслідки. Precision ≥ 0.85 для мінімізації зайвих процедур.\n- **Content moderation:** precision-recall trade-off залежить від ризику platfo rmi та регуляторних вимог UK Online Safety Act.\n- **Recruitment AI:** UK EHRC guidelines вимагають аудиту false negative rate по захищеним характеристикам.\n\n**ROC-AUC vs PR-AUC:**\nПри сильному class imbalance (1:100+) PR-AUC інформативніший за ROC-AUC — стандарт для UK fraud та medical ML.`,
    example: "UK insurtech: модель виявлення страхового шахрайства. При threshold=0.5: Precision=0.91, Recall=0.74, F1=0.82. Після зниження threshold до 0.35: Recall=0.93, Precision=0.76, F1=0.83. Бізнес-рішення: обрати threshold=0.35 — пропущені claims коштують £12,000 в середньому, хибна тривога — лише £150 manual review.",
    relatedTerms: ["hypothesis-testing", "anomaly-detection", "feature-engineering"],
    relatedService: "machine-learning",
    relatedNichePage: "/ml/fraud-detection",
  },
  {
    slug: "overfitting",
    termUk: "Перенавчання (Overfitting)",
    termEn: "Overfitting",
    category: "ai",
    shortDescription: "Модель запам'ятовує тренувальні дані, але погано узагальнює на нових. Виявляється розходженням train/validation loss. Запобігається регуляризацією, dropout, early stopping та більшим набором даних.",
    fullDescription: `Overfitting — одна з найпоширеніших проблем ML: модель \"вивчає шум\" у тренувальних даних замість справжніх закономірностей.\n\n**Ознаки overfitting:**\n- Train accuracy значно вища за validation accuracy (наприклад, 98% vs 72%)\n- Validation loss зростає, тоді як train loss продовжує знижуватись\n- Модель добре працює на тренувальному наборі, але провалюється на production даних\n\n**Причини:**\n- Модель занадто складна відносно обсягу даних (занадто багато параметрів)\n- Недостатній розмір датасету\n- Витік даних (data leakage) між train та validation\n- Забагато epochs тренування\n\n**Методи боротьби:**\n\n**Regularization:**\n- **L1 (Lasso):** додає суму абсолютних значень ваг до loss → sparse models, feature selection\n- **L2 (Ridge):** додає суму квадратів ваг → обмежує великі ваги, стандарт для neural nets (weight decay)\n- **Elastic Net:** комбінація L1+L2\n\n**Neural Network-специфічні:**\n- **Dropout:** випадкове вимкнення нейронів під час тренування (rate 0.1-0.5)\n- **Batch Normalization:** стабілізує розподіл активацій, implicit regularization\n- **Early Stopping:** зупиняємо тренування, коли validation loss перестає покращуватись\n- **Data Augmentation:** штучне збільшення датасету (для CV — rotate/flip/crop, для NLP — back-translation)\n\n**Архітектурні:\n- Зменшення кількості шарів/нейронів\n- Cross-validation (k-fold) для надійної оцінки\n- Ensemble methods — зменшують variance\n\n**UK регуляторний аспект:**\nFCA та ICO вимагають демонстрації generalization ability моделей у regulated ML (credit scoring, AML). Overfitted model може пройти backtesting але провалитись у production — critical risk.`,
    example: "UK lending startup: модель скорингу позичальників. Train AUC=0.97, Validation AUC=0.71 — класичний overfitting. Причина: 47 features на 800 samples. Рішення: L2 regularization + зменшення до 12 найважливіших features (SHAP) + k-fold CV. Результат: Train AUC=0.84, Validation AUC=0.81. FCA sandbox аудит пройдено.",
    relatedTerms: ["underfitting", "ensemble-methods", "transfer-learning"],
    relatedService: "machine-learning",
    relatedNichePage: "/ml/model-development",
  },
  {
    slug: "underfitting",
    termUk: "Недонавчання (Underfitting)",
    termEn: "Underfitting",
    category: "ai",
    shortDescription: "Модель надто проста для захоплення паттернів у даних: висока похибка як на тренуванні, так і на тесті. Свідчить про high bias. Виправляється ускладненням архітектури, додаванням ознак або збільшенням часу тренування.",
    fullDescription: `Underfitting — протилежність overfitting: модель недостатньо складна або недостатньо натренована, щоб вловити реальні залежності в даних.\n\n**Ознаки underfitting:**\n- Висока train error (модель погано навчається навіть на тренувальних даних)\n- Train та validation error близькі одне до одного — але обидва погані\n- Learning curves виходять на плато при ще не досягнутій цільовій якості\n\n**Bias-Variance Tradeoff:**\n- Underfitting = **high bias**: модель робить системні помилки, ігноруючи важливі патерни\n- Overfitting = **high variance**: модель занадто чутлива до конкретних тренувальних прикладів\n- Мета — знайти баланс: достатньо гнучка модель, що не memorize тренувальні дані\n\n**Причини:**\n- Занадто проста архітектура (лінійна модель для нелінійних залежностей)\n- Недостатня кількість features або погана feature engineering\n- Занадто сильна регуляризація (перебільшений lambda)\n- Занадто мало epochs тренування\n- Неправильна нормалізація даних\n\n**Методи виправлення:**\n- Перехід до складнішої моделі: лінійна → tree-based → neural network\n- Додавання нових features (feature engineering, polynomial features)\n- Зменшення regularization strength\n- Збільшення capacity нейронної мережі (більше шарів, більше нейронів)\n- Довше тренування з learning rate scheduling\n- Перевірка якості та репрезентативності даних\n\n**UK бізнес-приклади:**\n- Лінійна регресія для прогнозу попиту в retail із сезонністю → underfits сезонні паттерни\n- Логістична регресія для NLP sentiment analysis → не вловлює контекст та іронію`,
    example: "UK retail chain: модель прогнозу попиту на основі лінійної регресії. MAE=34% — прийнятно для планування на рівні категорії, але для SKU-рівня — катастрофа. Transition to Gradient Boosting (LightGBM) з 22 features (сезонність, погода, акції, свята UK): MAE=11%. Inventory costs down £2.1M/year.",
    relatedTerms: ["overfitting", "ensemble-methods", "feature-engineering"],
    relatedService: "machine-learning",
    relatedNichePage: "/ml/model-development",
  },
  {
    slug: "ensemble-methods",
    termUk: "Ансамблеві Методи (Ensemble Methods)",
    termEn: "Ensemble Methods",
    category: "ai",
    shortDescription: "Комбінування кількох ML-моделей для кращих прогнозів. Bagging (Random Forest) знижує variance, Boosting (XGBoost, LightGBM) знижує bias, Stacking поєднує різнорідні моделі. Стандарт UK production для табличних даних.",
    fullDescription: `Ensemble methods — клас ML-алгоритмів, що поєднують прогнози кількох базових моделей для досягнення вищої точності та надійності.\n\n**Три основні парадигми:**\n\n**1. Bagging (Bootstrap Aggregating):**\n- Кожна модель тренується на random bootstrap sample (із заміною) від тренувальних даних\n- Прогнози агрегуються: голосування (classification) або усереднення (regression)\n- Зменшує **variance**, стійкий до overfitting\n- **Random Forest** — найвідоміший bagging ensemble\n\n**2. Boosting:**\n- Моделі тренуються послідовно, кожна наступна фокусується на помилках попередньої\n- Зменшує **bias** та variance\n- **AdaBoost:** перша популярна реалізація\n- **Gradient Boosting (GBM):** оптимізує loss function\n- **XGBoost:** regularized GBM, дуже швидкий, переможець Kaggle змагань\n- **LightGBM:** leaf-wise growth, ефективний на великих даних\n- **CatBoost:** native categorical features, robust to overfitting\n\n**3. Stacking (Stacked Generalization):**\n- Кілька різнорідних базових моделей (рівень 0)\n- Meta-learner (рівень 1) вчиться комбінувати їх прогнози\n- Найбільша гнучкість, але складніше в production\n\n**UK Production практика:**\n- XGBoost/LightGBM — де-факто стандарт для tabular data (fintech, insurance, retail)\n- FCA regulatory models: ensemble дозволені, але потребують SHAP explainability\n- Stacking для ML competitions та high-stakes задач (medical risk scoring)`,
    example: "UK insurer: модель прогнозу страхових збитків. Single Decision Tree: RMSE=£4,200. Random Forest (500 trees): RMSE=£2,800. LightGBM: RMSE=£2,100. Stacking (LightGBM+RF+ElasticNet meta-learner): RMSE=£1,950. Обрано LightGBM як production модель — баланс між точністю та швидкістю inference (8ms vs 45ms stacking).",
    relatedTerms: ["random-forest", "overfitting", "feature-engineering"],
    relatedService: "machine-learning",
    relatedNichePage: "/ml/model-development",
  },
  {
    slug: "random-forest",
    termUk: "Випадковий Ліс (Random Forest)",
    termEn: "Random Forest",
    category: "ai",
    shortDescription: "Ансамбль дерев рішень, навчених на bootstrap-вибірках із випадковим підмножиною ознак у кожному вузлі. Стійкий до шуму, обробляє пропуски, дає важливість ознак. Широко використовується в UK credit scoring та страхуванні.",
    fullDescription: `Random Forest — один із найнадійніших та найпопулярніших ML-алгоритмів для табличних даних, поєднує простоту та потужність.\n\n**Принцип роботи:**\n1. Створення N bootstrap samples із тренувальних даних (із заміною)\n2. Тренування Decision Tree на кожному sample\n3. У кожному вузлі: розглядається лише random subset із sqrt(features) ознак\n4. Прогноз: majority vote (classification) або average (regression) N trees\n\n**Переваги:**\n- **Feature importance:** Gini importance або permutation importance — визначення найвпливовіших ознак\n- **Robust до outliers та noise:** усереднення по N trees згладжує аномалії\n- **Handles missing data:** surrogate splits та imputation strategies\n- **No scaling needed:** tree-based, не потребує normalization\n- **Out-of-Bag (OOB) error:** безкоштовна cross-validation оцінка на held-out samples\n- **Паралелізація:** кожне дерево незалежне → ефективне GPU/CPU паралельне тренування\n\n**Гіперпараметри:**\n- n_estimators (100-2000): більше = краще, але diminishing returns\n- max_depth (None або 3-20): обмеження глибини дерев\n- max_features ('sqrt', 'log2', float): розмір random feature subset\n- min_samples_leaf (1-20): мінімальний розмір листка\n\n**UK regulated use cases:**\n- **Credit scoring (FCA):** SHAP values для explainability, required for adverse action notices\n- **Insurance pricing (FCA, PRA):** feature importance audit для fair pricing compliance\n- **NHS clinical risk:** NICE AI guidance вимагає transparent feature contributions\n- **AML transaction monitoring:** FCA SYSC вимоги до model documentation`,
    example: "UK mortgage broker: модель схвалення заявок. Logistic Regression: AUC=0.74. Random Forest (500 trees, max_depth=8): AUC=0.89. Top-3 features (SHAP): loan-to-income ratio (34%), credit history length (22%), employment stability (18%). FCA compliance: adverse action letters автоматично генеруються на основі top negative SHAP contributors.",
    relatedTerms: ["ensemble-methods", "feature-engineering", "principal-component-analysis"],
    relatedService: "machine-learning",
    relatedNichePage: "/ml/model-development",
  },
  {
    slug: "principal-component-analysis",
    termUk: "Метод Головних Компонент (PCA)",
    termEn: "Principal Component Analysis (PCA)",
    category: "data",
    shortDescription: "Техніка зменшення розмірності, що проєктує дані у нові вісі (головні компоненти), які максимізують захоплену дисперсію. Preprocessing крок у ML-пайплайнах для боротьби з \"прокляттям розмірності\".",
    fullDescription: `PCA — найпоширеніший метод unsupervised dimensionality reduction, що перетворює корельовані ознаки у набір некорельованих головних компонент.\n\n**Математична основа:**\n- Обчислення covariance matrix ознак\n- Знаходження eigenvectors (principal components) та eigenvalues\n- Сортування компонент за eigenvalue (кількість поясненої дисперсії)\n- Проєкція даних на top-k компонент\n\n**Ключові концепти:**\n- **Explained Variance Ratio:** частка загальної дисперсії, що пояснює кожна компонента\n- **Scree Plot:** графік для вибору оптимальної кількості компонент (\"elbow method\")\n- **Cumulative Explained Variance:** зазвичай 90-95% дисперсії зберігається при значному зменшенні розмірності\n\n**Коли застосовувати PCA:**\n- Висока корельованість між ознаками (multicollinearity)\n- Занадто багато features відносно кількості samples\n- Перед кластеризацією або візуалізацією (2D/3D projection)\n- Preprocessing для моделей чутливих до масштабу (SVM, KNN, linear models)\n\n**Обмеження:**\n- Результуючі компоненти погано інтерпретуються (лінійні комбінації вихідних ознак)\n- Тільки лінійні залежності (kernel PCA для нелінійних)\n- Не враховує target variable (supervised: Linear Discriminant Analysis краще)\n- Чутливий до масштабу → обов'язкова стандартизація даних перед PCA\n\n**Альтернативи:**\n- **t-SNE, UMAP:** для 2D/3D візуалізації нелінійних структур\n- **Autoencoders:** нелінійна dimensionality reduction\n- **Feature selection:** якщо потрібна interpretability`,
    example: "UK pharma: drug discovery ML pipeline. Input: 2,847 molecular descriptors на 12,000 compounds. PCA до 47 компонент (95% explained variance). Downstream Random Forest classifier для toxicity prediction: без PCA AUC=0.81 (14 min training, overfitting ознаки). З PCA: AUC=0.87 (2 min training). Додатково: 2D PCA plot виявив чіткі кластери токсичних структур для chemistry team.",
    relatedTerms: ["feature-engineering", "random-forest", "overfitting"],
    relatedService: "machine-learning",
    relatedNichePage: "/ml/model-development",
  },
  {
    slug: "data-warehouse",
    termUk: "Сховище Даних (Data Warehouse)",
    termEn: "Data Warehouse",
    category: "infrastructure",
    shortDescription: "Централізований репозиторій структурованих історичних даних (Snowflake, BigQuery, Redshift). Основне джерело ML-features для batch training пайплайнів. Оптимізований для аналітичних запитів, не транзакційного запису.",
    fullDescription: `Data Warehouse (DWH) — фундаментальний компонент ML-інфраструктури, що зберігає структуровані, очищені та трансформовані дані для аналітики та ML.\n\n**Архітектурні концепти:**\n\n**Schema Design:**\n- **Star Schema:** центральна fact table + dimension tables; оптимально для OLAP запитів\n- **Snowflake Schema:** нормалізовані dimensions; економить місце, складніші joins\n- **Wide tables (denormalized):** flat structure для ML feature stores; спрощує feature extraction\n\n**ETL / ELT пайплайни:**\n- **ETL (Extract-Transform-Load):** традиційний підхід; трансформація до завантаження\n- **ELT (Extract-Load-Transform):** сучасний; завантаження raw → трансформація в DWH (dbt)\n- **dbt (data build tool):** SQL-first трансформації, versioning, testing; стандарт UK data teams\n\n**Провідні платформи:**\n- **Snowflake:** multi-cloud, elastic scaling, semi-structured data (JSON), популярний у UK enterprise\n- **BigQuery (GCP):** serverless, колонковий, дешевий storage, ML вбудований (BigQuery ML)\n- **Redshift (AWS):** tightly integrated з AWS ecosystem, RA3 nodes для separation of compute/storage\n- **Azure Synapse:** Microsoft ecosystem, Spark integration\n- **Databricks Lakehouse:** Delta Lake, unified analytics + ML platform\n\n**DWH → ML інтеграція:**\n- Feature extraction SQL queries → pandas DataFrame для тренування\n- Feature Store (Feast, Tecton) поверх DWH для real-time serving\n- Scheduled dbt models → оновлення ML training datasets\n- Reverse ETL: ML predictions → назад до DWH для business dashboards\n\n**UK compliance:**\n- UK GDPR: DWH повинен підтримувати right to erasure (row-level deletion або pseudonymisation)\n- FCA: audit trail для всіх ML training data трансформацій`,
    example: "UK retail bank: Snowflake DWH як основа ML platform. 14TB структурованих даних (транзакції, продукти, клієнти). dbt: 180 трансформаційних моделей, щоденний run. Feature extraction: 340 ML features для 7 production моделей (credit/churn/fraud/CLV/recommend/AML/pricing). Щомісячний ML training pipeline: 8 годин повного retraining. UK GDPR erasure requests: автоматична pseudonymisation через dbt macro.",
    relatedTerms: ["data-lake", "feature-engineering", "mlflow"],
    relatedService: "machine-learning",
    relatedNichePage: "/ml/data-engineering",
  },
  {
    slug: "data-lake",
    termUk: "Озеро Даних (Data Lake)",
    termEn: "Data Lake",
    category: "infrastructure",
    shortDescription: "Централізоване сховище сирих даних у нативному форматі (S3, Azure Data Lake Storage). Дозволяє ML-експерименти на необроблених сигналах до ETL. Економічно ефективний при масштабуванні. Поєднується з DWH у Lakehouse архітектурі.",
    fullDescription: `Data Lake — концепція зберігання масивів сирих, необроблених даних будь-якого типу та структури для подальшого аналізу та ML.\n\n**Data Lake vs Data Warehouse:**\n| Характеристика | Data Lake | Data Warehouse |\n|---|---|---|\n| Структура | Unstructured/Semi-structured | Structured |\n| Schema | Schema-on-read | Schema-on-write |\n| Storage format | Raw (CSV, JSON, Parquet, images) | Processed tables |\n| Users | Data scientists | Analysts, BI |\n| Cost | Дешевий storage | Дорожчий |\n| Query speed | Повільніший | Швидший для SQL |\n\n**Технологічний стек:**\n\n**Storage:**\n- **AWS S3:** найпоширеніший; S3 Intelligent-Tiering для cost optimization\n- **Azure Data Lake Storage Gen2 (ADLS):** Hadoop-compatible, hierarchical namespace\n- **GCS (Google Cloud Storage):** нативна інтеграція з BigQuery та Vertex AI\n\n**Processing:**\n- **Apache Spark:** distributed processing; PySpark для ML preprocessing\n- **Databricks:** managed Spark + ML platform\n- **AWS Glue:** serverless ETL поверх S3\n\n**File formats для ML:**\n- **Parquet:** columnar, compressed; оптимальний для ML feature extraction\n- **Delta Lake:** ACID transactions on data lake; time travel, schema enforcement\n- **Apache Iceberg:** open table format; growing adoption у UK enterprise\n\n**Modern Lakehouse Architecture:**\nОб'єднує переваги Data Lake (дешеве raw storage) та Data Warehouse (ACID, SQL):  \n- Databricks Lakehouse Platform, AWS Lake Formation, Azure Synapse Analytics\n\n**ML use cases:**\n- Зберігання raw text, images, audio для unstructured ML\n- Логи для real-time feature engineering\n- Model artifacts, experiment outputs\n- Historical data для time series training`,
    example: "UK media company: AWS S3 data lake, 2.8PB даних (user events, content metadata, ad impressions, video streams). Parquet partitioned by date/user_segment. PySpark jobs (EMR): preprocessing 180M events/day для recommendation ML. ML training: 90-day user history window → collaborative filtering model. Cost: S3 storage £0.023/GB/month vs Redshift £0.25/GB/month — 10× cheaper for raw historical data.",
    relatedTerms: ["data-warehouse", "feature-engineering", "batch-inference"],
    relatedService: "machine-learning",
    relatedNichePage: "/ml/data-engineering",
  },
  {
    slug: "api-gateway",
    termUk: "API-шлюз (API Gateway)",
    termEn: "API Gateway",
    category: "infrastructure",
    shortDescription: "Керована точка входу для ML model serving (AWS API Gateway, Kong, FastAPI). Обробляє автентифікацію, rate limiting та логування для production inference endpoints. Забезпечує безпечний та контрольований доступ до ML-моделей.",
    fullDescription: `API Gateway — критичний компонент production ML-інфраструктури, що відокремлює клієнтів від backend ML services та надає cross-cutting concerns.\n\n**Функції API Gateway для ML:**\n\n**Security:**\n- **Authentication:** API keys, JWT tokens, OAuth 2.0\n- **Authorization:** role-based access (який клієнт може викликати яку модель)\n- **TLS termination:** HTTPS encryption\n- **IP whitelisting:** обмеження доступу до ML endpoints для regulated industries\n\n**Traffic Management:**\n- **Rate Limiting:** запобігання overload моделі (наприклад, 100 req/sec per API key)\n- **Request throttling:** черги при пікових навантаженнях\n- **Circuit Breaker:** автоматичне відключення при збоях backend\n- **Load Balancing:** розподіл трафіку між кількома model replicas\n\n**Observability:**\n- Request/response logging для audit trails\n- Latency metrics (p50, p95, p99)\n- Error rate monitoring\n- Business metrics (predictions per minute per model version)\n\n**Популярні рішення:**\n- **AWS API Gateway:** serverless, tight AWS integration, per-request pricing\n- **Kong Gateway:** open-source, plugin ecosystem, self-hosted або cloud\n- **NGINX / Traefik:** lightweight, high-performance reverse proxy\n- **FastAPI built-in:** async, auto OpenAPI docs; достатньо для MVP\n- **Azure API Management:** enterprise, analytics, developer portal\n\n**UK regulated ML вимоги:**\n- FCA: повний audit log всіх inference запитів для credit/insurance моделей\n- UK GDPR: logging особистих даних у request/response — необхідна pseudonymisation\n- PCI DSS: якщо ML endpoint обробляє платіжні дані — dedicated gateway з encryption`,
    example: "UK insurtech: Kong Gateway для 6 ML inference endpoints (pricing, fraud, churn, CLV, underwriting, claims). Rate limiting: 500 req/sec per partner API key. JWT auth з partner portal. Logging: CloudWatch + Datadog. p99 latency: 12ms (gateway overhead) + 38ms (model inference) = 50ms total. Monthly audit report: автоматично генерується для FCA compliance.",
    relatedTerms: ["model-serving", "shadow-mode", "kubernetes-ml"],
    relatedService: "machine-learning",
    relatedNichePage: "/ml/mlops",
  },
  {
    slug: "model-serving",
    termUk: "Обслуговування Моделей (Model Serving)",
    termEn: "Model Serving",
    category: "mlops",
    shortDescription: "Розгортання ML-моделей для обслуговування реальних прогнозів. Варіанти: REST API (FastAPI/Flask), gRPC, batch, streaming. SLA для UK production: зазвичай 50-200ms для real-time, годинний цикл для batch.",
    fullDescription: `Model Serving — процес та інфраструктура розгортання натренованих ML-моделей для отримання прогнозів в production середовищі.\n\n**Режими обслуговування:**\n\n**Real-time (Online) Inference:**\n- Синхронний запит-відповідь; результат потрібен негайно\n- REST API (FastAPI, Flask, BentoML) або gRPC (швидше для structured data)\n- Latency SLA: 50-200ms для UK e-commerce, <100ms для fraud detection\n- Контейнеризація: Docker + Kubernetes для масштабування\n\n**Batch Inference:**\n- Асинхронна обробка великих обсягів даних\n- Spark, Dask, або простий Python script на scheduler\n- Прийнятна latency: хвилини-години\n- Cost-effective: spot instances, off-peak processing\n\n**Streaming Inference:**\n- Kafka або Kinesis → модель → результат назад у stream\n- Near-real-time (секунди); для IoT, real-time fraud, recommendation\n\n**Frameworks для Model Serving:**\n- **FastAPI:** Python-native, async, auto OpenAPI docs, lightweight\n- **BentoML:** ML-specific, automatic Docker, model versioning built-in\n- **TorchServe:** PyTorch native, A/B testing, metrics built-in\n- **TF Serving:** TensorFlow Serving, high-performance, gRPC\n- **Triton Inference Server:** NVIDIA, GPU-optimized, multi-framework\n- **MLflow Models:** packaging + basic serving; більше для experimentation\n- **KServe / Seldon:** Kubernetes-native, enterprise MLOps\n\n**Production concerns:**\n- Model versioning та rollback strategy\n- Health checks та readiness probes\n- Graceful shutdown: дочекатись completion ongoing requests\n- Input validation: schema validation перед inference\n- Output monitoring: prediction distribution drift\n\n**UK SLA benchmark:**\n- E-commerce personalization: ≤150ms p99\n- Fraud detection: ≤100ms p99\n- Credit scoring (async): ≤3 seconds\n- Insurance pricing: ≤5 seconds`,
    example: "UK fintech: FastAPI model serving для real-time credit scoring. 3 model versions у production (champion + 2 challengers). Traffic split: 80% champion, 10%+10% challengers. Docker + K8s: auto-scale 2→12 pods при peak load. p50=18ms, p99=67ms. Canary deployment: нова версія спочатку 5% трафіку протягом 48h перед повним rollout.",
    relatedTerms: ["shadow-mode", "api-gateway", "kubernetes-ml"],
    relatedService: "machine-learning",
    relatedNichePage: "/ml/mlops",
  },
  {
    slug: "shadow-mode",
    termUk: "Тіньовий Режим (Shadow Mode / Shadow Deployment)",
    termEn: "Shadow Mode Deployment",
    category: "mlops",
    shortDescription: "Запуск нової ML-моделі паралельно з production-системою без впливу на користувачів. Порівняння прогнозів для валідації перед повним переключенням. Стандарт для UK regulated deployments у fintech та healthcare.",
    fullDescription: `Shadow mode (shadow deployment, dark launch) — стратегія безпечного впровадження нових ML-моделей у production, що усуває ризик для кінцевих користувачів.\n\n**Принцип роботи:**\n1. Production запит надходить до системи\n2. **Champion модель** обробляє запит і повертає результат користувачу (як завжди)\n3. **Shadow модель** (новий кандидат) одночасно отримує той самий запит асинхронно\n4. Прогноз shadow моделі логується, але НЕ повертається користувачу\n5. Порівняльний аналіз: shadow predictions vs champion predictions vs ground truth (коли доступна)\n\n**Що аналізуємо у shadow mode:**\n- **Prediction consistency:** наскільки часто моделі погоджуються (agreement rate)\n- **Edge cases:** де нова модель суттєво відрізняється від champion\n- **Latency:** чи вкладається shadow модель у SLA (async, але важливо для майбутнього)\n- **Error rate:** crashes, schema errors, unexpected outputs\n- **Business metrics simulation:** якби shadow використовувалась — який був би бізнес-результат\n\n**Shadow mode vs A/B Testing:**\n- Shadow: нульовий вплив на users; A/B: реальний вплив на 5-50% users\n- Shadow: ніяких бізнес-ризиків; A/B: потенційний revenue/UX impact\n- Shadow: не вимірює реальну user behavior response; A/B: вимірює\n- Shadow першим, A/B потім — стандартний UK MLOps release pipeline\n\n**UK regulated industry вимоги:**\n- **FCA (Consumer Duty):** нові credit/insurance моделі — shadow minimum 4 тижні перед cutover\n- **NHS AI deployment:** NICE guidelines рекомендують shadow period для clinical AI tools\n- **ICO DPIA:** shadow mode документується як risk mitigation у DPIA для high-risk ML\n\n**Реалізація:**\n- Async shadow calls (не затримують champion response)\n- Окремий logging pipeline для shadow predictions\n- Automated comparison dashboard (Grafana/Superset)`,
    example: "UK health insurer: новий underwriting ML model (XGBoost → Neural Network). Shadow mode 6 тижнів: 340,000 паралельних predictions. Agreement rate: 91.3% (acceptable). Disagreements analysis: нова модель більш агресивна для young male drivers (+12% premium) — compliance review запущено. FCA Consumer Duty: shadow mode задокументовано у model governance pack. Повний rollout після compliance clearance.",
    relatedTerms: ["model-serving", "mlflow", "api-gateway"],
    relatedService: "machine-learning",
    relatedNichePage: "/ml/mlops",
  },
  {
    slug: "hypothesis-testing",
    termUk: "Перевірка Гіпотез (Hypothesis Testing)",
    termEn: "Hypothesis Testing",
    category: "data",
    shortDescription: "Статистичний метод для A/B тестування покращень ML-моделей. t-test, chi-squared, Mann-Whitney U. Обов'язковий для UK product-команд при валідації ML-змін перед повним впровадженням.",
    fullDescription: `Hypothesis testing — статистичний фреймворк для прийняття рішень на основі даних, критичний для валідації ML-покращень у production.\n\n**Фундаментальні концепти:**\n- **Null Hypothesis (H₀):** припущення про відсутність ефекту (нова модель не краща за стару)\n- **Alternative Hypothesis (H₁):** те, що ми хочемо довести (нова модель краща)\n- **p-value:** ймовірність отримати такі або екстремальніші результати, якщо H₀ правдива\n- **Significance level (α):** порогове p-value (зазвичай 0.05 або 0.01)\n- **Statistical Power (1-β):** ймовірність виявити реальний ефект; зазвичай ≥0.80 вимагається\n- **Effect size:** практична значимість (Cohen's d, relative lift %)\n\n**Основні тести для ML:**\n\n**Порівняння двох моделей:**\n- **Paired t-test:** коли prediction errors correlated (same test set)\n- **McNemar test:** для порівняння класифікаторів на одному тестовому наборі\n- **DeLong test:** статистичне порівняння AUC двох моделей\n\n**A/B тестування у production:**\n- **Welch's t-test:** порівняння метрик між групами (різна дисперсія)\n- **Mann-Whitney U:** non-parametric; не потребує нормального розподілу\n- **Chi-squared test:** для порівняння пропорцій (conversion rates, click rates)\n- **Bootstrap confidence intervals:** robust для нестандартних метрик\n\n**Sample Size calculation:**\nКритично: скільки користувачів/транзакцій потрібно для статистично значущого результату:\n- Залежить від: baseline rate, очікуваний lift, α, power\n- UK e-commerce typical: 10,000-50,000 users per variant для 5% lift detection\n\n**Multiple testing problem:**\nПри тестуванні кількох гіпотез одночасно → p-value correction:\n- **Bonferroni correction:** консервативний\n- **Benjamini-Hochberg (FDR):** менш консервативний, кращий для ML\n\n**UK регуляторний контекст:**\n- FCA Product Intervention: статистичне обґрунтування required для credit/insurance ML changes\n- NHS NICE: clinical evidence standards для AI-assisted diagnosis tools`,
    example: "UK subscription platform: тестування нової churn prediction моделі. H₀: нова модель не покращує retention intervention ROI. A/B: 50,000 users/group, 30 днів. Результат: Group A (стара модель): 8.3% churn. Group B (нова модель): 7.1% churn. Welch t-test: p=0.003 (<0.05). Effect size: 14.5% relative reduction. Statistical power: 0.91. Рішення: reject H₀, rollout нової моделі. Projected annual saving: £340K retention revenue.",
    relatedTerms: ["precision-recall", "shadow-mode", "feature-engineering"],
    relatedService: "machine-learning",
    relatedNichePage: "/ml/model-development",
  },
  {
    slug: "reinforcement-learning",
    termUk: "Навчання з Підкріпленням (Reinforcement Learning)",
    termEn: "Reinforcement Learning",
    category: "ai",
    shortDescription: "ML-парадигма, де агент навчається методом проб і помилок для максимізації винагороди. Застосування: роботика, ігровий AI, системи рекомендацій, оптимізація ланцюгів постачання. Основа RLHF у LLM alignment.",
    fullDescription: `Reinforcement Learning (RL) — ML-парадигма, де навчання відбувається через взаємодію агента з середовищем та отримання reward signals, без explicit labeled data.\n\n**Ключові компоненти:**\n- **Agent:** ML-модель, що приймає рішення (actions)\n- **Environment:** система, з якою взаємодіє агент\n- **State (s):** поточне спостереження середовища\n- **Action (a):** рішення агента в стані s\n- **Reward (r):** скалярний сигнал оцінки дії\n- **Policy (π):** стратегія агента s→a\n- **Value function:** очікувана сумарна майбутня винагорода\n\n**Основні алгоритми:**\n\n**Model-Free RL:**\n- **Q-Learning / DQN (Deep Q-Network):** навчання Q-function (state-action values); DeepMind Atari\n- **PPO (Proximal Policy Optimization):** policy gradient; OpenAI стандарт; stable training\n- **SAC (Soft Actor-Critic):** entropy-regularized; robotics стандарт\n- **TD3:** Twin Delayed DDPG; continuous action spaces\n\n**Model-Based RL:**\n- Агент будує internal model середовища; sample-efficient\n- MuZero (DeepMind): SOTA board games та video games\n\n**Multi-Armed Bandits:**\n- Спрощений RL для A/B testing та recommendation\n- Thompson Sampling, UCB1 — popular у UK e-commerce\n\n**RLHF (RL from Human Feedback):**\n- Навчання reward model на human preferences\n- Fine-tuning LLM з PPO для alignment (ChatGPT, Claude)\n- Growing UK adoption для enterprise LLM customisation\n\n**UK Production Applications:**\n- **Supply Chain (Retail):** inventory ordering policies (Tesco, Ocado)\n- **Energy Trading:** automated bidding на UK electricity markets (Balancing Mechanism)\n- **Personalization:** recommendation systems (ASOS, BBC iPlayer)\n- **Autonomous Systems:** UK-регульовані робото-assisted системи в logistics (Amazon, Ocado)\n- **Algorithmic Trading:** FCA-regulated automated trading strategies`,
    example: "UK logistics company: RL для оптимізації маршрутів розвезення (50 vehicles, 800 stops/day). Traditional heuristic: average tour length 287km. DQN-based routing agent: тренування в simulation (2M episodes, 3 days). Production: average tour 241km (-16%). Fuel savings: £180K/year. CO₂ reduction: 89 tonnes/year — UK ESG reporting benefit.",
    relatedTerms: ["time-series-forecasting", "anomaly-detection", "transfer-learning"],
    relatedService: "machine-learning",
    relatedNichePage: "/ml/model-development",
  },
  {
    slug: "gdpr-article-22",
    termUk: "UK GDPR Стаття 22 — Автоматизовані Рішення",
    termEn: "UK GDPR Article 22 — Automated Decision-Making",
    category: "regulation",
    shortDescription: "Право UK GDPR не бути суб'єктом автоматизованих рішень зі значними наслідками. ML-моделі у кредитуванні, наймі, страхуванні повинні забезпечувати пояснення та можливість людського перегляду. Регулятор: ICO.",
    fullDescription: `UK GDPR Article 22 — ключова регуляторна норма для ML-систем, що приймають або суттєво впливають на рішення щодо фізичних осіб.\n\n**Сфера застосування:**\nСтаття 22 застосовується, коли рішення:\n1. **Базується виключно** на автоматизованій обробці (без значущої людської участі)\n2. Має **юридичні або аналогічно значущі ефекти** для особи\n\n**Приклади рішень, що підпадають під Article 22:**\n- Відмова у кредиті на основі credit scoring ML (FCA regulated)\n- Автоматичне відхилення заявки на страхування\n- Автоматизований відбір/відхилення кандидатів на роботу (Equality Act)\n- Встановлення страхових тарифів виключно алгоритмом\n- Автоматичне блокування банківського рахунку (AML систем)\n\n**Права суб'єктів даних:**\n- Право **не підлягати** виключно автоматизованому рішенню (у більшості випадків)\n- Право на **значущу інформацію** про логіку рішення\n- Право на **human review** — оскарження рішення людиною\n- Право на **пояснення** чинників, що вплинули на рішення\n\n**Коли автоматизовані рішення допустимі:**\n- Необхідно для контракту (кредитний скоринг)\n- Явна згода суб'єкта\n- Законодавча норма (UK закон)\nПри цьому все одно обов'язкові: safeguards, human review, right to contest.\n\n**Технічна реалізація для compliance:**\n- **Model explainability:** SHAP values для кожного рішення\n- **Adverse action notices:** автоматична генерація пояснень відмов (для FCA)\n- **Human-in-the-loop workflow:** UI для ручного перегляду оскаржень\n- **Audit logging:** збереження inputs, outputs, model version для кожного рішення\n- **DPIA (Article 35):** обов'язкова оцінка ризиків перед запуском high-risk ML\n\n**ICO Guidance:**\nICO видав детальні guidelines: \"Explaining decisions made with AI\" (2020, оновлення 2022) — обов'язкове читання для UK ML teams.`,
    example: "UK challenger bank: automated loan decisions (Article 22 compliance). SHAP для кожного рішення: top 3 factors у відмові (наприклад: \"debt-to-income ratio 68% exceeds threshold\", \"credit history 8 months below 12-month minimum\", \"recent CCJ 14 months ago\"). Adverse action notice: автоматично генерується в листі відмови. Human review queue: 180 seconds SLA для оскаржень. ICO audit 2024: compliant.",
    relatedTerms: ["dpia", "shadow-mode", "mlflow"],
    relatedService: "compliance",
    relatedNichePage: "/ml/compliance",
  },
  {
    slug: "dpia",
    termUk: "Оцінка Впливу на Захист Даних (DPIA)",
    termEn: "Data Protection Impact Assessment (DPIA)",
    category: "regulation",
    shortDescription: "Обов'язкова оцінка ризиків за UK GDPR для ML-обробки з високим ризиком (біометрія, профілювання, чутливі категорії). Включає консультацію з ICO. Проводиться до запуску системи.",
    fullDescription: `DPIA (Data Protection Impact Assessment) — систематичний процес оцінки та мінімізації ризиків для прав і свобод осіб при впровадженні нових технологій обробки даних, включаючи ML-системи.\n\n**Коли DPIA обов'язкова (ICO список):**\n1. **Systematic profiling** із значними ефектами (ML credit scoring, ad targeting)\n2. **Обробка особливих категорій** у великому масштабі (health, biometric, genetic data)\n3. **Systematic monitoring** публічного простору (CCTV + face recognition, UK дискусія)\n4. **Innovative technology** із непередбачуваними ризиками (novel ML techniques)\n5. **Preventing individuals from using service** (automated blocking decisions)\n6. **Дані про вразливі групи** (children, NHS patients, benefit recipients)\n\n**Структура DPIA документу:**\n1. **Description:** детальний опис обробки (what, why, how, data flows)\n2. **Necessity & Proportionality:** чи необхідна така обробка для мети?\n3. **Risk Assessment:** ідентифікація та оцінка ризиків для прав суб'єктів\n4. **Risk Mitigation:** технічні та організаційні заходи\n5. **Residual Risk:** ризики, що лишаються після mitigation\n6. **DPO Sign-off:** підпис Data Protection Officer\n7. **ICO Consultation:** якщо residual risk залишається high — обов'язкова консультація\n\n**ML-специфічні ризики у DPIA:**\n- **Bias та discrimination:** несправедливі результати для захищених груп (UK Equality Act)\n- **Data minimisation:** чи збирається лише необхідне для ML?\n- **Accuracy:** ризики від неточних ML-прогнозів\n- **Security:** захист training data та model artifacts від витоків\n- **Transparency:** право суб'єктів знати про ML-обробку (privacy notice)\n- **Retention:** як довго зберігаються ML training data та predictions?\n\n**Технічні safeguards для DPIA:**\n- Pseudonymisation/anonymisation training datasets\n- Differential privacy для ML тренування\n- Federated Learning (дані не залишають джерело)\n- Access controls для model artifacts та training data\n- Shadow mode для валідації перед production\n\n**ICO Consultation:**\nКоли residual risk залишається \"high\" після всіх заходів — mandatory prior consultation з ICO (Article 36 UK GDPR). ICO має 8 тижнів на відповідь.`,
    example: "UK healthtech startup: ML-модель для NHS predictive risk scoring пацієнтів. DPIA triggers: special category health data + systematic profiling + vulnerable group (NHS patients). DPIA process: 6 тижнів, залучено DPO + legal + clinical team. Key mitigations: pseudonymisation NHS numbers, differential privacy (ε=0.1), human clinician final decision (Article 22 safeguard), 2-year retention limit, patient opt-out mechanism. ICO consultation: не знадобилась (residual risk = medium після mitigations). NHS IG Toolkit: level 2 compliant.",
    relatedTerms: ["gdpr-article-22", "shadow-mode", "data-warehouse"],
    relatedService: "compliance",
    relatedNichePage: "/ml/compliance",
  },
  {
    slug: "mlflow",
    termUk: "MLflow — Платформа ML-Lifecycle",
    termEn: "MLflow",
    category: "mlops",
    shortDescription: "Open-source платформа для управління ML-lifecycle: відстеження експериментів, реєстр моделей, зберігання артефактів, деплой. Стандартний MLOps інструмент у UK production поряд із SageMaker та Azure ML.",
    fullDescription: `MLflow — відкрита платформа від Databricks для управління повним ML-lifecycle, що вирішує проблему відтворюваності та організації ML-проєктів.\n\n**Чотири основні компоненти:**\n\n**1. MLflow Tracking:**\n- Логування параметрів (hyperparameters), метрик (accuracy, loss), artifacts (plots, models)\n- Порівняння runs у UI: таблиці, графіки, diff параметрів\n- Structured experiment organization: experiments → runs → artifacts\n- Python API: mlflow.log_param(), mlflow.log_metric(), mlflow.log_artifact()\n- Auto-logging: mlflow.sklearn.autolog() — автоматичне логування sklearn моделей\n\n**2. MLflow Models:**\n- Стандартизований формат пакування ML-моделей (MLmodel file)\n- Підтримка: sklearn, PyTorch, TensorFlow, XGBoost, custom Python\n- Flavors: python_function (universal), REST API, Docker\n- mlflow.models.predict() — універсальний inference незалежно від фреймворку\n\n**3. MLflow Model Registry:**\n- Centralized model versioning та lifecycle management\n- Stages: Staging → Production → Archived\n- Metadata: description, tags, annotations\n- Webhook integration: Slack/Teams notifications при stage transitions\n- Approval workflows для regulated industries\n\n**4. MLflow Projects:**\n- Reproducible ML code packaging (MLproject file)\n- Conda або Docker environment specification\n- Remote execution: Kubernetes, Databricks\n\n**Deployment integrations:**\n- Built-in: local REST server, Docker container\n- Plugins: MLflow → SageMaker, Azure ML, Kubernetes, Vertex AI\n- mlflow models serve → instant REST API\n\n**UK Production Stack:**\n- MLflow + PostgreSQL (tracking backend) + S3/Azure Blob (artifact store)\n- Databricks Managed MLflow: enterprise, auto-scaling, integrated\n- AWS SageMaker + MLflow: growing UK adoption\n\n**Альтернативи та компліменти:**\n- Weights & Biases (W&B): кращий UI, collaboration; popular у UK research\n- Neptune.ai: team collaboration focus\n- DVC: Git-based, code-first approach`,
    example: "UK fintech: MLflow для управління 47 ML-моделями (fraud, credit, AML, churn, pricing). MLflow Tracking: 12,000+ experiment runs зафіксовано за рік. Model Registry: champion-challenger workflow для кожної моделі, approval stage потребує sign-off від Risk team. Artifact store: S3, 800GB model artifacts. Integration: Airflow DAGs автоматично логують retraining runs. GDPR: model cards у Registry документують training data, fairness metrics, DPIA reference.",
    relatedTerms: ["shadow-mode", "model-serving", "data-warehouse"],
    relatedService: "machine-learning",
    relatedNichePage: "/ml/mlops",
  },

  // === ML/AI Glossary Batch — UK Professional Focus ===
  {
    slug: "hyperparameter-tuning",
    termUk: "Налаштування гіперпараметрів",
    termEn: "Hyperparameter Tuning",
    category: "mlops",
    shortDescription: "Процес оптимізації параметрів ML-моделі що задаються до навчання (learning rate, глибина дерева, регуляризація) — на відміну від ваг, які модель вивчає самостійно.",
    fullDescription: `Гіперпараметри — це параметри, що контролюють процес навчання моделі, а не вивчаються з даних. Їх вибір суттєво впливає на якість та швидкість моделі.\n\n**Основні методи пошуку:**\n- **Grid Search**: перебирає всі комбінації зі списку — вичерпний але повільний\n- **Random Search**: випадково семплює комбінації — ефективніший при >3 параметрах\n- **Bayesian Optimisation**: моделює функцію якості як Gaussian Process та вибирає наступну точку інтелектуально — зазвичай знаходить оптимум за 30–50 ітерацій замість сотень\n\n**Популярні UK production інструменти:**\n- **Optuna** (open-source): TPE sampler, прунінг невдалих trials, інтеграція з MLflow\n- **Ray Tune**: розподілений туніг на кластері, підтримує ASHA pruning\n- **Hyperopt**: дерево Парзена, добре для continuous spaces\n- **Keras Tuner / AutoML** (Azure, Google): автоматизований пошук для нейромереж\n\n**Ключові гіперпараметри XGBoost:**\n- learning_rate (0.01–0.3): швидкість навчання, менше — стабільніше але потребує більше дерев\n- max_depth (3–10): глибина дерева, більше — ризик overfitting\n- n_estimators (100–5000): кількість дерев\n- min_child_weight, subsample, colsample_bytree: регуляризація\n\n**FCA context:** Hyperparameter choices повинні бути задокументовані в Model Development Document (MDD) для regulated models — кожна tuning decision є частиною audit trail.`,
    example: "UK credit scoring team: Optuna TPE sampler, 200 trials, XGBoost. Grid search (432 combinations) зайняв би 36 годин. Optuna знайшов оптимум (AUC 0.943) за 47 trials, 4 години. LightGBM: learning_rate=0.05, num_leaves=127, min_child_samples=50.",
    relatedTerms: ["mlops", "gradient-boosting", "model-monitoring"],
    relatedService: "machine-learning",
    relatedNichePage: "/ml/banking",
  },
  {
    slug: "pipeline-automation",
    termUk: "Автоматизація ML-пайплайну",
    termEn: "ML Pipeline Automation",
    category: "mlops",
    shortDescription: "Наскрізна автоматизація ML-робочого процесу: від завантаження даних до деплою — усуває ручні кроки, забезпечує відтворюваність і дозволяє щоденне перенавчання без участі дата-саєнтиста.",
    fullDescription: `ML Pipeline Automation — оркестрація послідовності кроків ML-workflow у вигляді відтворюваного, моніторованого та автоматично запускаємого pipeline.\n\n**Стандартні кроки pipeline:**\n1. Data ingestion (завантаження з S3, Snowflake, API)\n2. Data validation (Great Expectations, Pandera)\n3. Feature engineering та feature store sync\n4. Model training + hyperparameter tuning\n5. Model evaluation vs champion (A/B comparison)\n6. Model registration у MLflow/Registry\n7. Deployment (canary → full rollout)\n8. Monitoring alerts\n\n**Основні оркестратори:**\n- **Apache Airflow**: Python DAGs, широко використовується в UK fintechs, великий ecosystem\n- **Prefect**: сучасніший API, кращий error handling, cloud-managed\n- **Kubeflow Pipelines**: Kubernetes-native, enterprise scale\n- **Metaflow** (Netflix): code-first, data scientists friendly\n- **ZenML**: ML-specific, portable across cloud\n\n**Переваги для бізнесу:**\n- Fraud models перенавчаються автоматично щотижня — без участі ML команди\n- Audit trail: кожен run задокументований (FCA SS1/23 вимога)\n- Відтворюваність: будь-який run можна повторити точно\n\n**UK regulated context:** FCA та PRA вимагають, щоб ML-моделі у банках мали задокументований та контрольований deployment process — pipeline automation є технічною реалізацією цієї вимоги.`,
    example: "UK insurtech: Airflow DAG щонеділі: завантажує 6 тижнів нових claims → валідує якість → feature engineering → LightGBM retraining → порівняння з champion (якщо AUC challenger > champion + 0.005 → promotion) → Slack alert Risk team. Час: 4 год → 90 хв без участі людини.",
    relatedTerms: ["mlops", "mlflow", "model-monitoring", "data-drift"],
    relatedService: "machine-learning",
    relatedNichePage: "/ml/mlops",
  },
  {
    slug: "active-learning",
    termUk: "Активне навчання",
    termEn: "Active Learning",
    category: "ai",
    shortDescription: "Парадигма ML, де модель сама вибирає найінформативніші зразки для розмітки людиною — скорочуючи вартість анотації на 60–80% при збереженні якості навченої моделі.",
    fullDescription: `Active Learning — ітеративний підхід до навчання, де модель активно запитує мітки лише для тих зразків, що несуть найбільше нової інформації.\n\n**Ключова ідея:**\nЗамість випадкової анотації тисяч зразків, модель після початкового навчання вибирає 50–100 «найцікавіших» зразків для розмітки аннотатором. Потім перенавчається і знову вибирає. Після 5–10 ітерацій досягається якість, що вимагає випадкової анотації всіх даних.\n\n**Стратегії вибору зразків:**\n- **Uncertainty sampling**: вибираються зразки де модель найменш впевнена (posterior probability ≈ 0.5)\n- **Query by committee**: кілька моделей не погоджуються між собою\n- **Expected model change**: максимізує очікуване оновлення параметрів\n- **Core-set approach**: геометричне покриття feature space\n\n**Застосування у UK:**\n- NHS radiology: розмітка тисяч рентгенівських знімків дорога. Active learning дозволяє радіологам розмічати лише «складні» випадки — 70% скорочення часу\n- Legal document annotation: NER для контрактів — юрист розмічає лише неоднозначні фрагменти\n- Financial transaction classification: нові схеми шахрайства потребують розмітки — активне навчання виявляє нові патерни\n\n**UK вартість анотації:** медичний аннотатор £35–85/год, юридичний £60–120/год — active learning прямо впливає на ROI ML-проєкту.`,
    example: "UK медтех: Computer Vision для детекції пневмонії на рентгені. Рандомна анотація: 5,000 зображень × £60/зображення = £300k. Active learning: 1,200 зображень × £60 = £72k при тій самій AUC 0.94. Скорочення вартості анотації на £228k.",
    relatedTerms: ["transfer-learning", "computer-vision", "fine-tuning"],
    relatedService: "machine-learning",
    relatedNichePage: "/ai/healthcare",
  },
  {
    slug: "self-supervised-learning",
    termUk: "Самонавчання (Self-Supervised Learning)",
    termEn: "Self-Supervised Learning",
    category: "ai",
    shortDescription: "Навчання на нерозмічених даних за допомогою автоматично генерованих міток (наступний токен, маскований фрагмент) — основа попереднього навчання BERT, GPT, DALL-E та більшості сучасних foundation models.",
    fullDescription: `Self-Supervised Learning (SSL) — клас методів ML, де мітки для навчання генеруються автоматично із самих вхідних даних, без ручної анотації.\n\n**Ключові pretext завдання:**\n- **Next token prediction** (GPT, Llama): модель навчається передбачати наступне слово — лінгвістичне знання виникає як побічний ефект\n- **Masked Language Modelling** (BERT): частина токенів замаскована, модель їх відновлює — розуміння контексту з обох боків\n- **Masked Image Modelling** (MAE, BEiT): патчі зображення маскуються — модель відновлює піксельний вміст\n- **Contrastive learning** (SimCLR, MoCo, CLIP): різні аугментації одного зображення мають бути близько у embedding space\n\n**Чому це революційно:**\nДо SSL потрібні були мільйони розмічених прикладів. GPT-3 навчався на 570 GB нерозміченого тексту з Інтернету — розмітка не потрібна взагалі. BERT навчений на Wikipedia + BookCorpus без будь-яких анотацій.\n\n**Foundation models (UK adoption):**\n- OpenAI GPT-4o: >500 UK fintechs використовують через API\n- Anthropic Claude: NHS Digital, юридичні фірми (data residency EU)\n- Google Gemini: Google Cloud customers (велика частка UK enterprise)\n- ClinicalBERT/BioMedBERT: NHS Research, Oxford/Cambridge медичні дослідження`,
    example: "UK PropTech: замість навчання property description classifier з нуля (потрібно 50k розмічених оголошень), fine-tuning BERT (pre-trained self-supervised на 3.3B словах) на 2,000 розмічених прикладах. F1 для 15 property-type категорій: 91.4% за 2 години навчання.",
    relatedTerms: ["transfer-learning", "fine-tuning", "llm"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/ai/marketing",
  },
  {
    slug: "graph-neural-network",
    termUk: "Графова нейронна мережа (GNN)",
    termEn: "Graph Neural Network (GNN)",
    category: "ai",
    shortDescription: "Клас ML-архітектур для даних у вигляді графів (вузли + зв'язки). Виявляє шахрайські кільця через мережу спільних рахунків, прогнозує властивості молекул та моделює ланцюги постачань.",
    fullDescription: `Graph Neural Networks (GNN) — нейронні мережі що працюють безпосередньо з графовою структурою даних, де вузли та зв'язки несуть семантичне значення.\n\n**Ключові архітектури:**\n- **GCN** (Graph Convolutional Network): агрегує інформацію від сусідів через згортку\n- **GraphSAGE**: семплує фіксовану кількість сусідів — масштабується на мільярди вузлів\n- **GAT** (Graph Attention Network): вагово усереднює сусідів через attention mechanism\n- **Heterogeneous GNN**: різні типи вузлів та ребер (транзакції, акаунти, пристрої)\n\n**UK фінансовий fraud detection (AML rings):**\nТрадиційні ML-моделі не бачать структуру: 5 акаунтів пов'язані спільним phone number → спільною адресою → спільним пристроєм. GNN виявляє таке кільце навіть коли кожен акаунт окремо виглядає нормально.\n- Вузли: accounts, devices, IPs, phone numbers\n- Ребра: shared_phone, shared_device, transaction_to\n- Мітка: is_fraud_ring\n\n**Фармацевтика (UK, AstraZeneca, GSK):**\n- Молекули як графи (атоми = вузли, зв'язки = ребра)\n- Прогнозування токсичності, bioaccessibility, drug-drug interactions\n- Прискорення drug discovery на 40–60%`,
    example: "UK необанк: GraphSAGE на графі 2.3M акаунтів + 18M транзакцій + 890k devices. Fraud ring detection: precision 0.84, recall 0.91. Виявлено 847 rings за перший місяць vs 12 ручним аналізом. Запобіжено £4.2M збитків.",
    relatedTerms: ["anomaly-detection", "aml", "neural-network"],
    relatedService: "machine-learning",
    relatedNichePage: "/ml/banking",
  },
  {
    slug: "tabular-data-ml",
    termUk: "ML на табличних даних",
    termEn: "ML on Tabular Data",
    category: "data",
    shortDescription: "Машинне навчання на структурованих таблицях — найпоширеніший сценарій UK бізнес-ML. Gradient boosting (XGBoost/LightGBM) зазвичай перевершує глибокі нейромережі для табличних задач.",
    fullDescription: `Табличні дані — рядки та стовпці, де кожен рядок представляє спостереження а кожен стовпець — ознаку. Це найпоширіший формат даних у бізнесі: транзакції, CRM, ERP, фінансові звіти.\n\n**Чому XGBoost кращий за нейромережі для таблиць:**\n- Нейромережі вимагають мільйони рядків і складного feature engineering\n- XGBoost/LightGBM: ефективні при 1,000–10M рядків, добре з missing values та categorical features\n- Benchmark (Grinsztajn et al. 2022): gradient boosting переважає deep learning на 93% tabular датасетів\n\n**Типові UK бізнес-задачі:**\n- **Credit scoring**: ознаки клієнта → ймовірність дефолту\n- **Customer churn**: behavioral features → ймовірність відтоку\n- **Fraud detection**: транзакційні features → is_fraud probability\n- **Demand forecasting**: temporal + product features → sales volume\n- **Lead scoring**: CRM features → conversion probability\n\n**Data preprocessing checklist:**\n- Missing values: median imputation (numeric), mode (categorical), або окрема ознака is_missing\n- Categorical encoding: target encoding (для high-cardinality), one-hot (для low-cardinality)\n- Outlier treatment: IQR capping або log transform\n- Class imbalance: scale_pos_weight у XGBoost, або SMOTE як preprocessing\n- Feature scaling: не потрібен для tree-based моделей, обов'язковий для SVM/logistic regression`,
    example: "UK SME lender: LightGBM на 47 табличних features (Open Banking + Experian). 180,000 рядків тренувальних даних. AUC 0.94. Inference: 2.1ms/заявка. Нейромережа (3 layers): AUC 0.87, inference 12ms. LightGBM виграє по всіх метриках.",
    relatedTerms: ["gradient-boosting", "feature-engineering", "class-weight-balancing"],
    relatedService: "machine-learning",
    relatedNichePage: "/ml/banking",
  },
  {
    slug: "class-weight-balancing",
    termUk: "Балансування класів (Class Imbalance)",
    termEn: "Class Weight Balancing",
    category: "data",
    shortDescription: "Техніка для навчання ML-моделей на незбалансованих датасетах: fraud (0.1%), рідкісні хвороби, дефекти виробництва. Призначення більшої ваги мінорному класу запобігає тому щоб модель ігнорувала рідкісні події.",
    fullDescription: `Дисбаланс класів виникає коли один клас суттєво переважає інший: fraud 0.1% транзакцій, cancer 2% скринінгу, defects 0.5% виробництва. Без корекції модель досягає 99.9% accuracy просто передбачаючи «не шахрайство» для всього — але це некорисно.\n\n**Основні підходи:**\n\n**1. Class weights (рекомендований для більшості випадків):**\n- Minority class отримує вищу вагу у loss function\n- XGBoost: scale_pos_weight = n_negative / n_positive\n- sklearn: class_weight='balanced'\n- Не змінює розподіл даних — швидко і безпечно\n\n**2. Oversampling — SMOTE:**\n- Генерує синтетичні зразки мінорного класу через інтерполяцію\n- Ризик: синтетичні зразки можуть не відображати реальну популяцію\n- Застосовується лише до тренувальних даних — ніколи до test set\n\n**3. Undersampling:**\n- Видаляє зразки мажоритарного класу\n- Ризик: втрата інформації — не рекомендується при малому датасеті\n\n**4. Threshold tuning:**\n- Замість стандартного threshold 0.5 → вибрати threshold за Precision-Recall curve\n- F1, F-beta (beta>1 якщо recall важливіший за precision)\n\n**UK fraud-specific:** FCA очікує що fraud models мають задокументований підхід до class imbalance з обґрунтуванням вибраного методу у Model Risk Documentation.`,
    example: "UK payment processor: fraud rate 0.08% (800 з 1M щодня). XGBoost без балансування: recall 23% (пропускає 77% шахрайства). З scale_pos_weight=1250 та threshold=0.3: recall 89%, precision 41%. Трейдоф документований у MDD.",
    relatedTerms: ["gradient-boosting", "tabular-data-ml", "false-positive-rate"],
    relatedService: "machine-learning",
    relatedNichePage: "/ml/banking",
  },
  {
    slug: "model-interpretability",
    termUk: "Інтерпретованість моделі",
    termEn: "Model Interpretability",
    category: "regulation",
    shortDescription: "Ступінь в якому внутрішні механізми ML-моделі зрозумілі людині. Регуляторна вимога FCA SS1/23 для кредитних та страхових моделей у Великобританії.",
    fullDescription: `Model Interpretability — здатність зрозуміти «чому» модель прийняла рішення, а не лише «що» вона передбачила.\n\n**Два основні підходи:**\n\n**Intrinsically interpretable models:**\n- **Logistic Regression**: коефіцієнти безпосередньо показують вплив features\n- **Decision Tree**: правила у вигляді if-then\n- **Linear models**: прозора функція рішення\n- Обмеження: зазвичай нижча точність, ніж black-box моделі\n\n**Post-hoc explanations (для black-box):**\n- **SHAP**: математично точний, shows per-feature contribution per prediction\n- **LIME**: локальна лінійна апроксимація навколо конкретного прикладу\n- **Partial Dependence Plots (PDP)**: глобальний вплив feature на prediction\n- **Accumulated Local Effects (ALE)**: краще PDP при корельованих features\n\n**UK регуляторні вимоги:**\n- **FCA SS1/23 (Model Risk Management)**: «firmsмають розуміти обмеження і роботу своїх моделей»\n- **FCA PS21/3**: право клієнта на пояснення кредитного рішення\n- **GDPR Article 22 (UK GDPR)**: пояснення автоматизованих рішень\n- **ICO guidance on AI**: accountability — хто і як пояснює AI рішення\n\n**Evidential vs Proximate explanation:**\nFCA розрізняє evidential explanation (чому дані призвели до рішення — SHAP) та proximate explanation (що клієнт може змінити — counterfactual).`,
    example: "UK mortgage lender: XGBoost (AUC 0.92) з SHAP layer. Регуляторний аудит FCA 2024: надано SHAP global importance plots + 200 individual explanations для відмов. Аудит пройдено без зауважень. Без SHAP — модель довелося б замінити на Logistic Regression (AUC 0.81).",
    relatedTerms: ["shap-values", "explainable-ai", "counterfactual-explanation"],
    relatedService: "machine-learning",
    relatedNichePage: "/ml/banking",
  },
  {
    slug: "counterfactual-explanation",
    termUk: "Контрфактуальне пояснення",
    termEn: "Counterfactual Explanation",
    category: "regulation",
    shortDescription: "«Що потрібно змінити щоб отримати інший результат?» — тип пояснення ML-рішення обов'язковий для UK GDPR Article 22 при автоматизованих рішеннях. Приклад: «Якби дохід був на £5k вищим, позика була б схвалена».",
    fullDescription: `Counterfactual explanation відповідає на питання: «яке мінімальне реалістичне зміни у вхідних даних призвело б до іншого рішення моделі?» Це найбільш actionable тип пояснення для клієнта.\n\n**UK GDPR Article 22 контекст:**\nФізичні особи мають право не підпадати під повністю автоматизовані рішення що суттєво впливають на них. Якщо таке рішення прийнято — вони мають право на «meaningful information about the logic involved» та можливість оскарження.\n\nFCA інтерпретує це як вимогу надавати actionable counterfactuals для відмов у кредиті, страхуванні, оренді.\n\n**Технічні підходи:**\n- **DiCE** (Diverse Counterfactual Explanations, Microsoft): генерує кілька різних counterfactuals\n- **NICE** (Nearest Instance Counterfactual Explanation): мінімальні зміни від найближчого позитивного прикладу\n- **Wachter et al.**: оптимізація мінімального розхилу з дотриманням рішення\n\n**Обмеження actionability:**\nNе всі features змінювані: вік, стать, кредитна история — не можна «виправити». Counterfactual має пропонувати лише дієві зміни: debt ratio (зменшити зобов'язання), income stability (забезпечити 12-міс контракт).\n\n**Формат для клієнта UK:**\n«Ваша заявка відхилена. Для схвалення: (1) зменшіть щомісячні зобов'язання з £1,200 до £850, або (2) надайте 12-місячну витримку зайнятості (зараз 7 місяців)».`,
    example: "UK challenger bank: DiCE генерує counterfactual для кожної відмови у реальному часі (<200ms). 34% відмовлених клієнтів повертаються з виправленою заявкою. Default rate серед таких заявок: 1.8% vs 3.1% загальний — counterfactual відбирає мотивованих, надійних позичальників.",
    relatedTerms: ["model-interpretability", "shap-values", "explainable-ai"],
    relatedService: "machine-learning",
    relatedNichePage: "/ml/banking",
  },
  {
    slug: "shadow-deployment",
    termUk: "Тіньовий деплой (Shadow Mode)",
    termEn: "Shadow Deployment (Shadow Mode)",
    category: "mlops",
    shortDescription: "Запуск нової ML-моделі паралельно з існуючою в продакшні: нова модель отримує реальні запити, логує передбачення, але не впливає на користувачів. Дозволяє безпечно оцінити реальну якість до переключення.",
    fullDescription: `Shadow Deployment (тіньовий режим) — техніка MLOps, де challenger-модель отримує копії реальних продакшн-запитів одночасно з champion-моделлю, але її відповіді не відправляються клієнтам — лише зберігаються для аналізу.\n\n**Архітектура:**\n1. Вхідний запит до ML scoring service дублюється\n2. Champion обробляє запит і повертає рішення (клієнт бачить це)\n3. Challenger отримує той самий запит → prediction логується → нічого не повертається\n4. Щоденно/щотижнево: порівняння розподілу predictions, precision/recall, business KPIs\n\n**Переваги перед A/B testing:**\n- **Нульовий ризик**: challenger не впливає на реальних клієнтів\n- **Реальний трафік**: модель тестується на справжніх даних, не синтетичних\n- **Повне покриття**: 100% трафіку через challenger vs 10-20% у A/B\n- **Часові залежності**: виявляє сезонні патерни що відсутні в validation set\n\n**Обмеження:**\n- Немає feedback loop: не знаємо реальний outcome (default/no-default) під час тестування\n- Потрібно чекати «розкриття» outcomes (для кредитів — місяці)\n\n**UK regulated context:**\nFCA SS1/23 рекомендує shadow mode як частину Model Validation Framework перед деплоєм нових версій моделей в high-stakes decisions (кредит, страхування, investments).`,
    example: "UK insurtech: нова pricing model в shadow mode 8 тижнів. Champion: pricing existing customers. Shadow: 140k нових quotes. Аналіз: challenger був би на 8% дешевшим для low-risk customers (positive) але на 3% занизив high-risk (negative). Конфігурацію виправлено перед деплоєм.",
    relatedTerms: ["canary-deployment", "a-b-testing-ml", "mlops"],
    relatedService: "machine-learning",
    relatedNichePage: "/ml/mlops",
  },
  {
    slug: "canary-deployment",
    termUk: "Canary-деплой ML-моделі",
    termEn: "Canary Deployment (ML)",
    category: "mlops",
    shortDescription: "Поступовий rollout нової ML-моделі: спочатку 1–5% трафіку, потім поступово збільшується при здорових метриках. Дозволяє виявити проблеми до того як вони торкнуться всіх користувачів.",
    fullDescription: `Canary Deployment для ML-моделей — практика поступового переключення трафіку від старої моделі до нової, з моніторингом метрик на кожному кроці.\n\n**Типовий rollout plan:**\n- **День 1**: 1% трафіку → нова модель. Моніторинг: latency, error rate, prediction distribution\n- **День 3**: 5% трафіку. Перевірка: AUC на накопичених labeled outcomes\n- **День 7**: 20% трафіку. Перевірка: business KPIs (approval rate, default rate для кредитів)\n- **День 14**: 50% трафіку. Statistical significance тестів\n- **День 21**: 100% трафіку (full rollout) або rollback\n\n**Автоматичний rollback triggers:**\n- Error rate > 0.1% (http 500s від serving layer)\n- Latency p95 > 200ms (SLA порушення)\n- Prediction distribution drift > threshold (нова модель поводиться аномально)\n- Business metric degradation > 5%\n\n**Відмінність від Shadow Mode:**\nCanary deployment ВПЛИВАЄ на реальних клієнтів (1–5%). Shadow mode — ні. Canary отримує реальний feedback (outcomes) швидше.\n\n**Kubernetes implementation:**\nIstio або Nginx traffic splitting: weight: 5 для canary pod. Prometheus metrics → Grafana dashboard → automated Argo Rollouts з analysis templates.`,
    example: "UK neobank: нова fraud scoring model. Canary 5%: 3 тижні, 87k транзакцій через challenger. Fraud recall: 94.2% vs 88.7% champion (+5.5pp). FPR: 0.31% vs 0.42% (-26%). Approval: поступовий rollout 20→50→100% за 2 тижні. Fraud losses -£180k/місяць.",
    relatedTerms: ["shadow-deployment", "a-b-testing-ml", "mlops"],
    relatedService: "machine-learning",
    relatedNichePage: "/ml/mlops",
  },
  {
    slug: "blue-green-deployment",
    termUk: "Blue-Green деплой ML",
    termEn: "Blue-Green Deployment (ML)",
    category: "mlops",
    shortDescription: "Підтримка двох ідентичних production ML-середовищ (blue=поточне, green=нове). Миттєве переключення трафіку без downtime та гарантований rollback протягом секунд при проблемах.",
    fullDescription: `Blue-Green Deployment — стратегія деплою де підтримуються два ідентичних production environments, між якими можна миттєво переключати трафік.\n\n**Як це працює для ML:**\n- **Blue** (активне): поточна версія моделі обслуговує 100% трафіку\n- **Green** (нове): нова версія розгорнута та протестована але не активна\n- **Switch**: load balancer переключає весь трафік з blue на green (секунди)\n- **Rollback**: якщо проблема — переключити назад на blue (секунди)\n\n**Переваги для ML-serving:**\n- **Zero-downtime**: модель завжди доступна під час оновлення\n- **Instant rollback**: на відміну від re-deployment (хвилини), rollback — секунди\n- **Regression testing**: green environment тестується повністю перед переключенням\n- **Database consistency**: обидва environments можуть використовувати той самий feature store\n\n**Архітектура serving:**\n- AWS: Application Load Balancer + два ECS tasks або Lambda functions\n- Kubernetes: Ingress перемикає між двома Deployments\n- Docker Compose: nginx upstream конфіг перемикається між двома containers\n\n**Порівняння стратегій деплою:**\n| Стратегія | Ризик | Швидкість rollback | Складність |\n|---|---|---|---|\n| Rolling | Середній | Повільний | Низька |\n| Blue-Green | Низький | Миттєвий | Середня |\n| Canary | Дуже низький | Миттєвий | Висока |\n| Shadow | Нульовий | N/A | Середня |`,
    example: "UK fintech ML serving: blue-green для credit scoring API. Нова модель готова → green environment з тою самою інфраструктурою → load testing 10k req/min → switch via nginx upstream → якщо metrics ok після 30 хвилин → blue environment зупиняється. Downtime: 0 секунд.",
    relatedTerms: ["canary-deployment", "shadow-deployment", "mlops"],
    relatedService: "machine-learning",
    relatedNichePage: "/ml/mlops",
  },
  {
    slug: "tokenization-nlp",
    termUk: "Токенізація (NLP)",
    termEn: "Tokenization (NLP)",
    category: "nlp",
    shortDescription: "Розбиття тексту на токени (слова, субслова, символи) як вхідні одиниці для NLP-моделей. BPE (Byte-Pair Encoding) у GPT, WordPiece у BERT — кількість токенів прямо визначає вартість LLM API.",
    fullDescription: `Токенізація — перший крок у будь-якому NLP pipeline: перетворення тексту на послідовність дискретних одиниць (токенів) що модель може обробляти.\n\n**Типи токенізаторів:**\n- **Word tokenization**: «I love NLP» → [«I», «love», «NLP»]. Проблема: OOV (out-of-vocabulary) слова\n- **Character tokenization**: кожен символ окремо. Проблема: довгі послідовності, втрата контексту\n- **Subword tokenization** (сучасний стандарт):\n  - **BPE (Byte-Pair Encoding)**: GPT-2/3/4, Llama. Ітеративно зливає найчастіші пари байт/символів\n  - **WordPiece**: BERT, DistilBERT. Схожий на BPE але максимізує ймовірність корпусу\n  - **SentencePiece**: мовно-незалежний, підтримує CJK символи\n\n**Практичне значення для UK бізнесу:**\n- **API cost**: OpenAI тарифікує за токени. Середній токен ≈ 4 символи/0.75 слова англійською\n- Юридичний документ 50,000 слів ≈ 65,000 токенів → GPT-4o вартість £0.65 за один документ\n- **Context window**: GPT-4o 128k токенів ≈ 96,000 слів або ~200 сторінок\n- **Chunking for RAG**: оптимальний chunk розмір 256–512 токенів для balance між context та recall\n\n**UK специфіка:**\nБританський англійський (colour, organisation) vs американський — токенізується однаково, але важливо для fine-tuning: модель навчена переважно на US English може «недорозуміти» UK правові терміни.`,
    example: "UK legal RAG system: 150k документ-слів → GPT-4o tokenizer → 190k токенів. Chunking по 400 токенів з 50-token overlap → 456 chunks. Qdrant index. Query «force majeure clause duration» → cosine search → top-5 chunks → 2,000 token context → GPT-4o answer. Total cost per query: £0.003.",
    relatedTerms: ["llm", "rag", "embeddings"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/ai/legal",
  },
  {
    slug: "semantic-similarity",
    termUk: "Семантична схожість",
    termEn: "Semantic Similarity",
    category: "nlp",
    shortDescription: "Вимірювання близькості значення між текстами за допомогою cosine similarity embedding-векторів. Основа дедублікації, кластеризації документів та семантичного пошуку в RAG-системах.",
    fullDescription: `Semantic similarity — вимірювання того, наскільки близькі значення двох текстів, на відміну від лексичної схожості (спільні слова).\n\n**Приклад різниці:**\n- Лексична (TF-IDF): «The car is fast» vs «The automobile is quick» → схожість 0 (немає спільних слів)\n- Семантична (embeddings): ті самі речення → cosine similarity 0.94 (синоніми)\n\n**Як рахується:**\n1. Текст A → embedding model → вектор v_A (1536 вимірів)\n2. Текст B → embedding model → вектор v_B (1536 вимірів)\n3. Cosine similarity = (v_A · v_B) / (|v_A| × |v_B|), range [-1, 1]\n4. Порогове значення 0.85+ → «дуже схожі», 0.7–0.85 → «пов'язані»\n\n**Embedding models для UK production:**\n- OpenAI text-embedding-3-large (3072 dims, MTEB rank #5): £0.013 per 1M tokens\n- Cohere embed-v3 (1024 dims): competitive quality, data residency EU option\n- sentence-transformers/all-mpnet-base-v2 (768 dims): open-source, self-hosted — GDPR friendly\n- e5-mistral-7b-instruct (4096 dims): SOTA open-source, вимагає GPU\n\n**Бізнес-застосування:**\n- **Duplicate detection**: 180k customer support tickets → clustering → 34% дублікати → автоматичне перенаправлення\n- **Document clustering**: юридичні договори по типах без ручної класифікації\n- **Semantic search**: RAG retrieval — знайти документ навіть при різних формулюваннях\n- **Near-duplicate fraud**: виявлення схожих схем шахрайства`,
    example: "UK insurer: semantic similarity для дедублікації claims. 240k claims/рік → sentence-transformers embeddings → FAISS ANN → 12,400 near-duplicate pairs (threshold 0.89). Ручна верифікація 3% → 8,900 підтверджених дублікатів (£4.2M збережено). Precision: 72%, Recall: 96%.",
    relatedTerms: ["embeddings", "vector-database", "rag"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/ai/legal",
  },
  {
    slug: "information-extraction",
    termUk: "Витягування інформації",
    termEn: "Information Extraction (IE)",
    category: "nlp",
    shortDescription: "Автоматичне вилучення структурованих даних з неструктурованого тексту: дати, суми, сторони, сутності, відносини. Використовується в аналізі контрактів, обробці рахунків, моніторингу новин.",
    fullDescription: `Information Extraction (IE) — перетворення неструктурованого тексту на структурований формат придатний для аналізу та зберігання в базах даних.\n\n**Ключові задачі IE:**\n\n**Named Entity Recognition (NER):**\nВитягування і класифікація іменованих сутностей: ORGANIZATION, PERSON, DATE, MONEY, LOCATION, LEGAL_CLAUSE\n- spaCy + custom NER: fine-tuning на 500+ UK юридичних документах\n- GPT-4o zero-shot: «витягни всі сторони договору та дати» → JSON output\n\n**Relation Extraction:**\nВизначення відносин між сутностями: «Codeworth Ltd» SIGNED_WITH «NHS Trust» ON «01/04/2024»\n\n**Event Extraction:**\nВитягування подій: payment due date, termination clause triggers, notice periods\n\n**UK бізнес use cases:**\n- **Contract review (LegalTech)**: витягування payment terms, liability caps, termination rights, governing law. Час: 2 год → 5 хвилин per contract\n- **Invoice processing (FinTech/accounting)**: supplier name, amount, VAT number, due date → AP automation. OCR + NER на UK invoice formats\n- **News monitoring (financial)**: Companies House announcements → NER for company names + event type → investment signals\n- **NHS referrals**: clinical notes → structured: diagnosis (ICD-10), medications, referral reason`,
    example: "UK law firm: GPT-4o fine-tuned на 3,000 UK commercial contracts. IE pipeline: PDF → OCR → GPT-4o → JSON. Витягує: parties (100% recall), governing law (98.3%), payment terms (96.7%), liability cap (94.2%), termination notice (97.1%). 600 contracts/день замість 30 ручних.",
    relatedTerms: ["clinical-nlp", "tokenization-nlp", "llm"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/ai/legal",
  },
  {
    slug: "text-classification",
    termUk: "Класифікація тексту",
    termEn: "Text Classification",
    category: "nlp",
    shortDescription: "Автоматичне призначення категорій текстовим документам: аналіз тональності, виявлення спаму, маршрутизація звернень клієнтів, класифікація compliance-документів.",
    fullDescription: `Text Classification — задача NLP де кожному тексту призначається одна або кілька категорій з наперед визначеного набору.\n\n**Підходи від простого до складного:**\n\n**1. Traditional ML (Naive Bayes, Logistic Regression на TF-IDF):**\n- Быстро, interpretable, потребує мало даних (100–1000 прикладів)\n- Погано з семантикою, не розуміє контекст\n\n**2. Fine-tuned BERT / DistilBERT:**\n- Потрібно 1,000–10,000 прикладів на клас\n- F1 87–94% для більшості задач\n- Інференс: 20–100ms на CPU, 2–8ms на GPU\n\n**3. GPT-4o / Claude zero/few-shot:**\n- Без навчання на специфічних прикладах\n- Few-shot: 5–10 прикладів у prompt → F1 75–85%\n- Дорожче ($), але не потребує labeled data\n\n**UK бізнес use cases:**\n- **Customer support routing**: 14 категорій → правильний відділ. 92% accuracy → −40% неправильних перенаправлень\n- **Compliance document classification**: MiFID II / FCA regulatory → risk scoring\n- **Sentiment analysis**: NPS feedback → product insights\n- **Spam/phishing detection**: email screening для UK фінансових компаній\n- **Insurance claims triage**: severity classification → fast-track vs manual review\n\n**Multi-label vs Multi-class:**\n- Multi-class: кожен текст → одна категорія\n- Multi-label: документ може належати до кількох категорій одночасно`,
    example: "UK challenger bank: DistilBERT fine-tuned на 8,500 customer messages (14 intents). F1 macro: 91.4%. Deployment: FastAPI + Docker, inference 18ms p95. Result: 67% автоматично вирішуються без агента, AHT −34%, CSAT +12 NPS points.",
    relatedTerms: ["tokenization-nlp", "semantic-similarity", "transfer-learning"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/ai/marketing",
  },
  {
    slug: "data-governance",
    termUk: "Управління даними (Data Governance)",
    termEn: "Data Governance",
    category: "regulation",
    shortDescription: "Система політик і процесів для забезпечення якості, безпеки та відповідності даних протягом всього їх lifecycle. Передумова для regulated UK ML — принцип підзвітності ICO.",
    fullDescription: `Data Governance — комплекс правил, процесів, стандартів та ролей, що забезпечують якість, доступність, цілісність, безпеку та відповідність даних організаційним та регуляторним вимогам.\n\n**Ключові компоненти:**\n\n**Data Catalog:**\n- Де живуть дані (data lineage)\n- Хто є data owner та data steward\n- Схеми, типи, оновлення\n- Інструменти: Apache Atlas, Collibra, Alation, Microsoft Purview\n\n**Data Quality:**\n- Completeness, accuracy, consistency, timeliness, uniqueness\n- Great Expectations або Soda для automated quality checks\n- Data quality SLAs: наприклад, >99.5% completeness для training data\n\n**Data Privacy (UK GDPR):**\n- PII identification та classification\n- Retention policies: скільки зберігати кожен тип даних\n- Right to Erasure implementation: видалення з training data та моделей\n- DPIA (Data Protection Impact Assessment) для high-risk ML\n\n**Regulatory context:**\n- **ICO accountability principle**: організації повинні довести відповідність — data governance є доказовою базою\n- **FCA SS1/23**: data governance як частина model risk framework\n- **BCBS 239** (banking): вимоги до якості та агрегації ризик-даних\n\n**ML-specific governance:**\n- Training data versioning (DVC, LakeFS)\n- Model cards: документація тренувальних даних, обмежень, fairness metrics\n- Bias monitoring: чи модель диференціює по protected characteristics?`,
    example: "UK health insurer: впровадила Microsoft Purview для data catalog 340 таблиць. Виявлено 47 PII fields без proper encryption. Data lineage показала що 3 ML models тренувались на PII без DPIA. Remediation: 6 тижнів, штраф ICO відвернено. FCA audit 2024: data governance 'satisfactory'.",
    relatedTerms: ["model-interpretability", "explainable-ai", "fca-compliance"],
    relatedService: "machine-learning",
    relatedNichePage: "/ml/banking",
  },
  {
    slug: "model-versioning",
    termUk: "Версіонування ML-моделей",
    termEn: "ML Model Versioning",
    category: "mlops",
    shortDescription: "Відстеження та зберігання різних ітерацій ML-моделей разом з метаданими (тренувальні дані, параметри, метрики). Забезпечує відтворюваність і rollback. Стандартні інструменти: MLflow Model Registry, DVC.",
    fullDescription: `Model Versioning — практика зберігання кожної версії ML-моделі разом з повним контекстом що необхідний для її відтворення та аудиту.\n\n**Що версіонується:**\n- **Model artifacts**: ваги (pkl, joblib, ONNX, PyTorch .pt)\n- **Training data snapshot/reference**: хеш або посилання на версію тренувального датасету\n- **Hyperparameters**: learning_rate, n_estimators тощо\n- **Training metrics**: AUC, precision, recall, F1\n- **Environment**: requirements.txt або conda.yaml\n- **Model card**: задокументовані обмеження, fairness metrics, intended use\n\n**Інструменти:**\n- **MLflow Model Registry**: production standard. Stages: None → Staging → Production → Archived\n- **DVC (Data Version Control)**: Git-подібне версіонування даних та артефактів поверх Git\n- **Weights & Biases (W&B)**: cloud-hosted, popular у UK ML research\n- **BentoML**: model registry + serving framework\n\n**Lifecycle management:**\nv1.0 (champion) → v1.1 challenger (shadow) → v1.1 canary 5% → v1.1 production → v1.0 archived\n\n**UK regulated context:**\nFCA SS1/23 вимагає, щоб для кожної production-моделі було можливо:\n- Відтворити будь-який попередній run\n- Порівняти performance версій у часі\n- Пояснити чому перейшли з v1.0 на v1.1\n- Зберігати audit trail мінімум 5 років`,
    example: "UK credit firm: MLflow Registry з PostgreSQL backend. 23 production ML models, кожна з 8–47 version records. FCA Section 166 review 2024: наданий повний audit trail для credit scoring model v2.3 (деплой 18 місяців тому): training data hash, 47 hyperparameters, confusion matrix на test set, champion-challenger comparison report. Review passed without remediation.",
    relatedTerms: ["mlflow", "pipeline-automation", "mlops"],
    relatedService: "machine-learning",
    relatedNichePage: "/ml/mlops",
  },
  {
    slug: "serving-latency",
    termUk: "Затримка ML-інференсу (Serving Latency)",
    termEn: "ML Serving Latency",
    category: "infrastructure",
    shortDescription: "Час від отримання запиту ML-моделлю до повернення передбачення. UK production SLAs: p99 <50ms (fraud detection), <200ms (recommendation). Вимірюється у перцентилях p50/p95/p99.",
    fullDescription: `Serving Latency — ключова non-functional вимога для production ML-систем. Вимірюється у перцентилях: p50 (медіана), p95 (95% запитів швидші), p99 (99% запитів швидші).\n\n**Чому перцентили важливіші за середнє:**\nСереднє p50=15ms може приховувати p99=2500ms. Один повільний запит на 100 = 1% users із поганим досвідом.\n\n**UK production SLAs за типом моделі:**\n- **Fraud detection** (real-time): p99 <50ms (payment rails SLA)\n- **Credit decision** (near real-time): p95 <200ms\n- **Recommendation** (web): p95 <100ms\n- **LLM inference** (conversational): p50 <3s for first token (TTFT)\n- **Batch scoring** (nightly): throughput >10k predictions/minute\n\n**Оптимізація latency:**\n- **Model quantization**: FP32 → INT8 (4× менша модель, 2–3× швидший inference)\n- **ONNX Runtime**: 1.5–3× прискорення vs native sklearn/pytorch inference\n- **Model pruning**: видалення незначних ваг нейромережі\n- **Feature pre-computation**: real-time features в Redis замість live calculation\n- **Horizontal scaling**: більше replicas + load balancing\n- **GPU serving**: TensorRT для нейромереж, 10–50× прискорення\n\n**Моніторинг:**\nPrometheus → Grafana: histogram_quantile(0.99, http_request_duration_seconds) → alert якщо p99 > 150ms.`,
    example: "UK fintech fraud API: FastAPI + XGBoost (pickle). Baseline p99=320ms (model load кожен запит). Optimisation: model pre-loaded в memory → p99=12ms. Feature pre-computation у Redis: -8ms. ONNX Runtime: -3ms. Final: p50=4ms, p95=8ms, p99=15ms. Payment rails SLA дотримано.",
    relatedTerms: ["mlops", "model-monitoring", "pipeline-automation"],
    relatedService: "machine-learning",
    relatedNichePage: "/ml/mlops",
  },
  {
    slug: "cost-per-inference",
    termUk: "Вартість інференсу",
    termEn: "Cost Per Inference",
    category: "infrastructure",
    shortDescription: "Фінансова вартість одного ML-передбачення: compute + пам'ять + мережа. GPU inference від £0.0001 до £0.01 за запит. Ключова метрика ROI для UK production ML систем.",
    fullDescription: `Cost Per Inference — вартість виконання одного ML-передбачення у production, яка визначає Unit Economics ML-продукту.\n\n**Компоненти вартості:**\n- **Compute**: CPU/GPU time (головна стаття для нейромереж)\n- **Memory**: RAM/VRAM (важливо для великих моделей)\n- **Network**: передача даних між сервісами\n- **Storage**: завантаження моделі, features\n- **Overhead**: monitoring, logging, authentication\n\n**Орієнтири по UK production:**\n| Тип моделі | Compute | Вартість/inference |\n|---|---|---|\n| XGBoost fraud scoring | CPU (0.5ms) | £0.000001 |\n| BERT text classification | CPU (20ms) | £0.00002 |\n| GPT-4o (1k input/200 out tokens) | OpenAI API | £0.006 |\n| Llama 3 70B self-hosted A100 | GPU (100ms) | £0.0008 |\n| Real-time image classification (YOLO v8n) | GPU (3ms) | £0.000015 |\n\n**ROI розрахунок:**\nДля fraud detection: 1M транзакцій/день × £0.000001 = £1/день = £365/рік. Fraud prevented: £5M/рік. ROI: 13,700:1.\n\nДля LLM customer support: 50,000 queries/день × £0.006 = £300/день = £109,500/рік. Human agent equivalent: £450k/рік. ROI: 4.1:1.\n\n**Оптимізація:**\n- Smaller models (DistilBERT vs BERT): 60% cheaper, 5% quality loss\n- Batching: GroupBy запити → 3–8× throughput on GPU\n- Spot/preemptible instances (AWS, GCP): 60–70% cost reduction для batch\n- Model caching: popular queries cached → near-zero marginal cost`,
    example: "UK neobank ML stack: 1M transactions/day fraud scoring (XGBoost, CPU): £1/day. 200k credit applications/month (LightGBM, CPU): £12/month. 50k customer service queries/month (Claude Haiku via API): £750/month. Total ML infrastructure: ~£800/month. Prevented fraud + automated support: £2.1M/month value.",
    relatedTerms: ["serving-latency", "mlops", "pipeline-automation"],
    relatedService: "machine-learning",
    relatedNichePage: "/ml/mlops",
  },

  // === BATCH 2026-06-24 ===
  {
    slug: "bias-variance-tradeoff",
    termUk: "Компроміс зміщення та дисперсії",
    termEn: "Bias–Variance Tradeoff",
    category: "ai",
    shortDescription: "Фундаментальна ML-дилема: висока зміщеність = недонавчання; висока дисперсія = перенавчання. Оптимальна складність моделі балансує обидва.",
    fullDescription: `Bias–Variance Tradeoff — основне теоретичне протиріччя в машинному навчанні, яке описує два джерела помилок прогнозування.\n\n**Зміщення (Bias):**\nПохибка через надто спрощені припущення. Модель систематично промахується в одному напрямку. Лінійна регресія на нелінійних даних — класичний приклад. Результат: underfitting — модель погано працює навіть на тренувальних даних.\n\n**Дисперсія (Variance):**\nЧутливість до шуму в тренувальних даних. Надмірно складна модель «запам'ятовує» тренувальний набір, але погано узагальнює на нових даних. Результат: overfitting.\n\n**Декомпозиція помилки:**\n> Загальна помилка = Bias² + Variance + Irreducible Noise\n\n**Практичний вибір:**\n| Ситуація | Рекомендація |\n|---|---|\n| Висока помилка на train+val | Збільшити складність моделі (менше bias) |\n| Мала помилка на train, велика на val | Зменшити складність / більше даних (менше variance) |\n| Обидві помилки великі | Переглянути features та якість даних |\n\n**Сучасні ансамблі:**\nBagging (Random Forest) зменшує variance. Boosting (XGBoost, LightGBM) зменшує bias. Тому вони перевершують прості моделі на більшості структурованих датасетів у UK financial services.`,
    example: "Кредитний скоринг для UK банку: логістична регресія (high bias) — GINI 42%. Gradient boosting — GINI 68%. Нейромережа без регуляризації (high variance) — GINI 71% train, 54% test. Оптимум — XGBoost з cross-validation: GINI 67% train і 66% test.",
    relatedTerms: ["regularization", "dropout", "learning-rate"],
    relatedService: "machine-learning",
    relatedNichePage: "/ai/machine-learning",
  },
  {
    slug: "regularization",
    termUk: "Регуляризація",
    termEn: "Regularization",
    category: "ai",
    shortDescription: "Техніка запобігання перенавчанню шляхом штрафування складності моделі. L1 (Lasso) відбирає ознаки; L2 (Ridge) зменшує ваги; ElasticNet поєднує обидва підходи.",
    fullDescription: `Regularization — набір методів, що обмежують свободу моделі під час навчання, змушуючи її знаходити простіші рішення, які краще узагальнюються на нових даних.\n\n**L1 Regularization (Lasso):**\nДодає до функції втрат суму абсолютних значень ваг: Loss + λ·Σ|wᵢ|. Штрафує так, що малі ваги «обнуляються» — виконує автоматичний відбір ознак (feature selection). Корисний коли підозрюєте, що більшість ознак нерелевантні.\n\n**L2 Regularization (Ridge):**\nДодає суму квадратів ваг: Loss + λ·Σwᵢ². Рівномірно зменшує всі ваги до нуля, але не обнуляє їх. Стабільніший за L1 при мультиколінеарності.\n\n**ElasticNet:**\nЛінійна комбінація L1 і L2: Loss + λ₁·Σ|wᵢ| + λ₂·Σwᵢ². Поєднує відбір ознак і стабільність Ridge. Де-факто стандарт для лінійних моделей у фінансовому секторі.\n\n**λ (регуляризаційний параметр):**\nСила штрафу. Підбирається через cross-validation. Занадто великий λ → underfitting; занадто малий → overfitting.\n\n**Regularization у нейромережах:**\nWeight decay (L2), Dropout, Batch Normalization, Early Stopping, Data Augmentation.`,
    example: "UK страхова компанія — модель ціноутворення з 200 ознаками (поштові індекси, вік автомобіля, стаж водія тощо). Без регуляризації: 200 ненульових коефіцієнтів, перенавчання. Lasso (L1) з λ=0.01: 34 ненульових ознаки, краща інтерпретованість для регулятора FCA, +3% accuracy на holdout.",
    relatedTerms: ["bias-variance-tradeoff", "dropout", "batch-normalization"],
    relatedService: "machine-learning",
    relatedNichePage: "/ai/machine-learning",
  },
  {
    slug: "dropout",
    termUk: "Dropout",
    termEn: "Dropout",
    category: "ai",
    shortDescription: "Техніка регуляризації нейромереж: під час навчання випадково вимикає частку нейронів. Зменшує co-adaptation, покращує узагальнення, діє як ансамбль підмереж.",
    fullDescription: `Dropout — простий і ефективний метод регуляризації нейронних мереж, запропонований Srivastava et al. у 2014 р. і досі широко застосовуваний.\n\n**Механізм:**\nПід час кожного тренувального кроку кожен нейрон незалежно «вимикається» з ймовірністю p (зазвичай 0.2–0.5). На інференсі всі нейрони активні, але ваги масштабуються на (1-p).\n\n**Чому це працює:**\n1. **Запобігає co-adaptation**: нейрони не можуть покладатися на конкретних «сусідів» — розвивають незалежні корисні ознаки\n2. **Неявний ансамбль**: кожна ітерація навчає іншу підмережу; inference усереднює ~2ⁿ підмереж\n3. **Feature robustness**: модель вчиться виявляти ознаки незалежно\n\n**Де застосовується:**\n- Fully-connected (Dense) шари: класичний dropout p=0.5\n- Convolutional шари: SpatialDropout2D (вимикає цілі feature maps)\n- Transformer: attention dropout і FFN dropout\n- Не застосовується до Batch Normalization шарів (взаємодія нестабільна)\n\n**MC Dropout:**\nЗалишають dropout активним під час inference для отримання uncertainty estimates — важливо для medical/financial ML де потрібна calibration.`,
    example: "UK HealthTech стартап — класифікація медичних зображень. Без dropout: train accuracy 98%, val accuracy 74% (перенавчання). З dropout p=0.4 + data augmentation: train 91%, val 88%. Різниця у deployment: продукт без dropout деградує на нових лікарнях, з dropout — стабільний.",
    relatedTerms: ["regularization", "batch-normalization", "bias-variance-tradeoff"],
    relatedService: "machine-learning",
    relatedNichePage: "/ai/machine-learning",
  },
  {
    slug: "batch-normalization",
    termUk: "Пакетна нормалізація",
    termEn: "Batch Normalization",
    category: "ai",
    shortDescription: "Нормалізація активацій шарів у межах міні-пакету. Стабілізує та прискорює навчання глибоких мереж; стандартний компонент сучасних CNN та Transformer-архітектур.",
    fullDescription: `Batch Normalization (BatchNorm) — техніка, запропонована Ioffe & Szegedy у 2015 р., яка нормалізує активації між шарами нейронної мережі, усуваючи проблему Internal Covariate Shift.\n\n**Алгоритм (під час навчання):**\n1. Обчислити μ (середнє) і σ² (дисперсію) по міні-батчу\n2. Нормалізувати: x̂ = (x − μ) / √(σ² + ε)\n3. Масштабувати та зміщувати: y = γ·x̂ + β (γ, β — навчальні параметри)\n\n**Під час inference:**\nВикористовуються running statistics (ковзне середнє μ і σ²), накопичені під час навчання.\n\n**Переваги:**\n- Дозволяє вищі learning rates → швидша збіжність\n- Зменшує залежність від ретельної ініціалізації ваг\n- Виконує певну роль регуляризатора (зменшує потребу в Dropout)\n- Усуває vanishing/exploding gradients у дуже глибоких мережах\n\n**Варіанти:**\n- **Layer Normalization**: нормалізація по ознаках (не батчу) — стандарт для Transformers\n- **Group Normalization**: для малих батчів (object detection)\n- **Instance Normalization**: для style transfer\n\n**Де НЕ застосовувати:**\nМіні-батчі розміром 1–4 — статистики ненадійні. RNN — Layer Norm краща.`,
    example: "ResNet-50 для класифікації UK property photos: без BatchNorm — навчання нестабільне, потрібний LR 0.0001, 200 epochs. З BatchNorm — LR 0.01, 60 epochs, +2.1% top-5 accuracy. У production UK proptech: BatchNorm скоротив час навчання з 18 до 4 годин на A100.",
    relatedTerms: ["dropout", "learning-rate", "bias-variance-tradeoff"],
    relatedService: "machine-learning",
    relatedNichePage: "/ai/machine-learning",
  },
  {
    slug: "learning-rate",
    termUk: "Швидкість навчання",
    termEn: "Learning Rate",
    category: "ai",
    shortDescription: "Контролює розмір кроку в градієнтному спуску. Занадто висока — модель розходиться; занадто низька — навчання повільне. Learning rate schedulers (cosine annealing, warm-up) адаптують крок під час навчання.",
    fullDescription: `Learning Rate (LR) — один з найважливіших гіперпараметрів глибокого навчання, що визначає, наскільки сильно оновлюються ваги моделі після кожного градієнтного кроку.\n\n**Формула оновлення ваг:**\nw ← w − lr · ∇L(w)\n\nДе ∇L(w) — градієнт функції втрат по вагах.\n\n**Наслідки неправильного LR:**\n- LR занадто великий: ваги «перестрибують» мінімум → loss розходиться або коливається\n- LR занадто малий: дуже повільна збіжність → практично нескінченне навчання\n- Оптимальний LR: швидка стабільна збіжність до хорошого мінімуму\n\n**Learning Rate Schedulers:**\n| Scheduler | Коли використовувати |\n|---|---|\n| Constant | Прості задачі, baseline |\n| Step Decay | CNN класифікація |\n| Cosine Annealing | Fine-tuning трансформерів |\n| Warm-up + Cosine | BERT, GPT fine-tuning |\n| OneCycleLR | Fast training (SuperConvergence) |\n| ReduceLROnPlateau | Коли неможливо передбачити |\n\n**LR Finder:**\nМетод Smith (2017): поступово збільшувати LR від 10⁻⁷ до 10, знайти точку де loss починає зростати, взяти на порядок менше — практична відправна точка.\n\n**Adaptive optimizers:**\nAdam, AdamW, RMSprop автоматично адаптують ефективний LR для кожного параметра — зменшують чутливість до початкового значення LR.`,
    example: "Fine-tuning BERT для аналізу UK фінансових звітів: initial LR 2e-5, linear warm-up 10% steps, cosine decay. Без warm-up: catastrophic forgetting на перших batches (loss стрибає до 4.2). З warm-up: стабільне навчання, F1-score 0.89 vs 0.71 без scheduler.",
    relatedTerms: ["batch-normalization", "dropout", "bias-variance-tradeoff"],
    relatedService: "machine-learning",
    relatedNichePage: "/ai/machine-learning",
  },
  {
    slug: "imbalanced-learning",
    termUk: "Навчання на незбалансованих даних",
    termEn: "Imbalanced Learning",
    category: "data",
    shortDescription: "Методи роботи з датасетами, де один клас значно переважає інші. SMOTE (синтетична генерація), cost-sensitive learning, зміщення порогу, фреймінг як аномалія.",
    fullDescription: `Imbalanced Learning — розділ ML, що вирішує проблему нерівномірного розподілу класів у навчальних даних. Критично важливий для fraud detection, medical diagnosis, churn prediction — задач з рідкісними але дорогими подіями.\n\n**Типова ситуація в UK фінансових послугах:**\n- Fraud detection: 0.1% шахрайських транзакцій (1:1000)\n- Churn prediction: 5-15% клієнтів йдуть (1:7 до 1:20)\n- Medical diagnosis: рідкісні хвороби 0.01% (1:10000)\n\n**Проблема:**\nМодель, натренована на 99% нормальних і 1% fraud, може просто завжди передбачати «нормальний» і досягати 99% accuracy — абсолютно безкорисна.\n\n**Методи вирішення:**\n\n*На рівні даних:*\n- **Undersampling**: зменшити кількість більшого класу (втрата даних)\n- **Oversampling**: дублювати меншинство (ризик перенавчання)\n- **SMOTE** (Synthetic Minority Oversampling Technique): генерувати синтетичні приклади minority class шляхом інтерполяції між реальними — золотий стандарт\n- **ADASYN**: адаптивний SMOTE, більше синтетичних прикладів де межа рішення складніша\n\n*На рівні алгоритму:*\n- **Class weights**: class_weight={0:1, 1:100} — автоматично в sklearn\n- **Cost-sensitive learning**: різні штрафи за FP і FN\n- **Threshold moving**: зміщувати поріг класифікації (default 0.5) для балансу precision/recall\n\n*Альтернативний фреймінг:*\n- **One-class classification**: Isolation Forest, LOF, Autoencoders\n- **Anomaly detection**: навчатися тільки на нормальних прикладах`,
    example: "UK neobank: fraud 0.08% від 2M транзакцій/день. Baseline (без балансування): precision 12%, recall 67%. Після SMOTE + threshold tuning: precision 41%, recall 79%. Business impact: +£340k/міс попередженого fraud при тих самих FP операторам (cost ≈ однаковий).",
    relatedTerms: ["confusion-matrix", "data-pipeline", "experiment-tracking"],
    relatedService: "data-analytics",
    relatedNichePage: "/ml/banking",
  },
  {
    slug: "data-versioning",
    termUk: "Версіонування даних",
    termEn: "Data Versioning",
    category: "mlops",
    shortDescription: "Відстеження змін у ML-датасетах з часом за допомогою DVC або Delta Lake. Забезпечує відтворюваність, аудит-сліди та відкат — обов'язково для управління ризиками моделей FCA.",
    fullDescription: `Data Versioning — практика управління версіями тренувальних даних аналогічно до версіонування коду. Без неї відтворити конкретний ML-результат або аудитувати модель практично неможливо.\n\n**Проблема без версіонування:**\n- «Яка версія датасету дала найкращий GINI?» — невідомо\n- Дані змінились, модель деградувала — коли саме?\n- Регулятор FCA вимагає аудит моделі за минулий рік — дані вже перезаписані\n- Data scientist пішов, нова команда не може відтворити результати\n\n**DVC (Data Version Control):**\nGit-подібний інструмент для великих файлів. .dvc файли у Git відстежують посилання на дані у remote storage (S3, GCS, Azure Blob). dvc repro відтворює весь pipeline з потрібними версіями даних.\n\n**Delta Lake:**\nОпен-сорс формат (Databricks) поверх Parquet: ACID-транзакції, time travel (VERSION AS OF 42), schema evolution, merge. Стандарт для enterprise data lakehouse.\n\n**Що версіонувати:**\n- Raw дані з джерел\n- Очищені / трансформовані датасети\n- Train/validation/test splits (reproducible splits!)\n- Feature store snapshots\n- Model training artifacts\n\n**FCA вимоги (UK):**\nSS1/23 (Model Risk Management): документація навчальних даних, можливість відтворити модель, аудит-трейл змін. Data versioning — технічна основа compliance.`,
    example: "UK insurtech: модель ціноутворення перенавчається щоквартально. З DVC: кожна версія моделі посилається на точний snapshot тренувальних даних. Коли FCA запитав аудит за Q3 2024 — відтворили модель за 2 години. Без DVC це зайняло б тижні ручної реконструкції.",
    relatedTerms: ["experiment-tracking", "ci-cd-ml", "ml-ops-maturity"],
    relatedService: "mlops",
    relatedNichePage: "/ml/mlops",
  },
  {
    slug: "experiment-tracking",
    termUk: "Відстеження експериментів",
    termEn: "Experiment Tracking",
    category: "mlops",
    shortDescription: "Логування ML-тренувальних запусків (параметри, метрики, артефакти) для порівняння та відтворюваності. MLflow, Weights & Biases, Neptune. Усуває проблему «який запуск був найкращим?».",
    fullDescription: `Experiment Tracking — систематичне фіксування всіх аспектів ML-експерименту, щоб можна було порівнювати запуски, відтворити найкращий і зрозуміти, що саме вплинуло на результат.\n\n**Що логується:**\n- **Parameters (гіперпараметри)**: learning_rate=0.001, n_estimators=500, max_depth=8\n- **Metrics**: train_loss, val_AUC, test_F1, inference_time_ms\n- **Artifacts**: модель (pickle/ONNX), графіки feature importance, confusion matrix\n- **Code**: git commit hash (відтворюваність)\n- **Environment**: Python version, пакети, OS\n- **Data**: dataset version (через DVC integration)\n\n**Популярні інструменти:**\n| Інструмент | Переваги | UK використання |\n|---|---|---|\n| MLflow | Open-source, self-hosted, повний стек | Банки зі строгими data policies |\n| Weights & Biases | Найкращий UX, collaboration | Стартапи, research teams |\n| Neptune.ai | Гнучкість, легка інтеграція | Mid-size companies |\n| Comet ML | Enterprise compliance features | Regulated industries |\n\n**Workflow:**\n1. mlflow.start_run() або wandb.init()\n2. log_params(config) на початку\n3. log_metrics({"val_auc": 0.89}, step=epoch) під час навчання\n4. log_artifact("model.pkl") після навчання\n5. Порівняти runs у UI, обрати найкращий, promote до production\n\n**Model Registry:**\nМLflow Model Registry: версіонування production-моделей (Staging → Production → Archived). Критично для регульованих UK galузей.`,
    example: "UK fintech team: за 3 місяці провели 847 ML-експериментів для credit scoring моделі. З Weights & Biases: будь-який run відтворюється одною командою, PM бачить прогрес у real-time, найкращий run задокументований для FCA. Без tracking: команда витрачала 20% часу на відповіді «а як ви отримали ці результати?».",
    relatedTerms: ["data-versioning", "ci-cd-ml", "ml-ops-maturity"],
    relatedService: "mlops",
    relatedNichePage: "/ml/mlops",
  },
  {
    slug: "ci-cd-ml",
    termUk: "CI/CD для машинного навчання",
    termEn: "CI/CD for ML",
    category: "mlops",
    shortDescription: "Безперервна інтеграція та деплой, адаптовані для ML: автоматичне тренування при зміні даних, тест-набір для якості моделі, автоматичний деплой при проходженні quality gate. GitOps для ML.",
    fullDescription: `CI/CD for ML розширює класичну практику DevOps на специфіку ML-систем, де змінюються не тільки код, а й дані та поведінка моделей.\n\n**Чим ML CI/CD відрізняється від звичайного:**\n- Тестуються не лише unit-тести, а й якість моделі (AUC, F1, bias)\n- Trigger може бути зміна даних, а не тільки коду\n- Artifact — не тільки Docker image, а й модель + feature pipeline\n- Production може деградувати навіть без змін коду (data drift)\n\n**Три рівні автоматизації (Google MLOps Maturity):**\n\n*Level 0 — Manual:*\nData scientists у Jupyter → ручний деплой → один ML pipeline у production. Типово для proof-of-concept.\n\n*Level 1 — ML Pipeline Automation:*\nАвтоматичне перенавчання при нових даних. Training pipeline у production. Але код пишеться вручну.\n\n*Level 2 — CI/CD Pipeline Automation:*\nБудь-який push до репо → автоматичний тест → перенавчання → валідація якості → деплой. Challenger/champion deployment. Повний MLOps.\n\n**Quality Gates (приклади):**\n- AUC на holdout ≥ 0.85 (або не гірше поточної production моделі −2%)\n- Disparate Impact Ratio для захищених груп ≥ 0.8 (UK Equality Act)\n- Inference latency p99 ≤ 200ms\n- No security vulnerabilities у dependencies\n\n**Інструменти:**\nGitHub Actions / GitLab CI + MLflow + DVC + Great Expectations (data validation) + Seldon/BentoML (serving).`,
    example: "UK mortgage lender: Level 2 MLOps. Щодня о 2:00 — нові транзакції → Great Expectations валідує якість даних → DVC pull → перенавчання XGBoost → порівняння з champion моделлю → якщо GINI challenger > champion − 0.5% → автоматичний деплой. Команда прокидається вже з новою кращою моделлю або алертом про деградацію.",
    relatedTerms: ["experiment-tracking", "data-versioning", "ml-ops-maturity"],
    relatedService: "mlops",
    relatedNichePage: "/ml/mlops",
  },
  {
    slug: "data-augmentation-cv",
    termUk: "Аугментація даних у комп'ютерному зорі",
    termEn: "Data Augmentation (Computer Vision)",
    category: "ai",
    shortDescription: "Генерація додаткових тренувальних зображень через трансформації (перевороти, обертання, кадрування, CutMix, MixUp). Регуляризує CV-моделі, зменшує потребу в ручній розмітці.",
    fullDescription: `Data Augmentation для Computer Vision — набір техніків розширення тренувального датасету шляхом синтетичних трансформацій існуючих зображень, що зберігають семантичний зміст.\n\n**Базові геометричні трансформації:**\n- Horizontal/Vertical Flip: переворот (для задач де симетрія не важлива)\n- Random Rotation: ±15° для документів, ±180° для aerial/satellite\n- Random Crop + Resize: фокусування на різних частинах об'єкта\n- Shear / Perspective: імітація різних кутів зйомки\n\n**Фотометричні трансформації:**\n- Color Jitter: яскравість, контраст, насиченість, відтінок\n- Grayscale: 10-20% ймовірність → робастність до монохромних зображень\n- GaussianBlur: нечіткість як у реальних сценаріях\n- RandomErasing: видалення прямокутника (імітує оклюзію)\n\n**Просунуті техніки:**\n- **CutMix**: вирізати прямокутник з одного зображення і вставити в інше; label = зважена сума\n- **MixUp**: попіксельне змішування двох зображень з λ; label = λ·y1 + (1-λ)·y2\n- **AutoAugment / RandAugment**: AutoML для відбору аугментацій\n- **Albumentations**: Python-бібліотека, 70+ аугментацій, GPU-прискорення\n\n**Для медичних зображень (UK NHS / healthtech):**\nObережно! Певні трансформації змінюють медичний зміст: вертикальний flip ECG → некоректний сигнал. Завжди консультуйтеся з domain expert.\n\n**Ефект на практиці:**\nДля ImageNet-scale задач: +2-4% top-5 accuracy з basic augmentation. CutMix/MixUp: ще +1-2%. Але головне — значно краща робастність у production.`,
    example: "UK proptech: класифікація кімнат за фото нерухомості. Оригінальний датасет: 8,000 зображень (kitchen/bedroom/bathroom/living). З Albumentations pipeline (flip+rotate+color jitter+cutout): ефективний датасет ~120,000. Validation accuracy: 87% → 94%. Особливо важливо для bathroom (схожа на kitchen) — recall 71% → 89%.",
    relatedTerms: ["dropout", "regularization", "bias-variance-tradeoff"],
    relatedService: "machine-learning",
    relatedNichePage: "/ai/computer-vision",
  },
  {
    slug: "ocr",
    termUk: "Оптичне розпізнавання символів",
    termEn: "OCR (Optical Character Recognition)",
    category: "nlp",
    shortDescription: "OCR перетворює зображення документів на машиночитаний текст. Tesseract (open-source), AWS Textract, Azure Document Intelligence. Необхідний перший крок у ML-конвеєрах обробки документів.",
    fullDescription: `OCR (Optical Character Recognition) — технологія комп'ютерного зору та NLP, що перетворює зображення текстового контенту (скановані документи, фотографії, PDF без текстового шару) на структурований машиночитаний текст.\n\n**Еволюція OCR:**\n- **Класичний OCR** (Tesseract): сегментація символів → template matching → словник. Добре для чистих, структурованих документів.\n- **Deep Learning OCR** (2015+): CNN для детекції → LSTM/CTC для розпізнавання. Краще з рукописним текстом і складними макетами.\n- **Document AI** (2020+): end-to-end трансформери (LayoutLM, Donut): розуміють і текст, і структуру форм, таблиць, рахунків.\n\n**Порівняння інструментів:**\n| Інструмент | Точність | Вартість | UK use case |\n|---|---|---|---|\n| Tesseract (open-source) | 85-92% | Безкоштовно | Batch processing, internal docs |\n| AWS Textract | 95-98% | $1.50/1000 стор. | Фінансові документи, KYC |\n| Azure Document Intelligence | 96-99% | £1.20/1000 стор. | NHS, HMRC форми |\n| Google Document AI | 95-98% | $1.50/1000 стор. | Різноманітні документи |\n\n**Типовий UK pipeline:**\n1. PDF/image upload\n2. Pre-processing (деноіз, деперекіс, контраст)\n3. OCR → structured JSON (text + bounding boxes)\n4. Layout analysis (таблиці, форми)\n5. NLP extraction (NER, classification)\n6. Validation + human-in-the-loop для low-confidence\n\n**Критичні помилки:**\n- Неякісні сканування: точність падає до 70-75%\n- Рукописний текст: спеціалізовані моделі потрібні\n- Змішані мови в одному документі: вказати мову явно`,
    example: "UK law firm: 50,000 legacy contracts у паперовому вигляді. Azure Document Intelligence OCR + LayoutLM для вилучення ключових умов (дата, сторони, сума, termination clauses). Точність вилучення: 94.3%. Час обробки: 15 секунд/контракт vs 45 хвилин вручну. ROI: окупність за 3 місяці.",
    relatedTerms: ["coreference-resolution", "question-answering", "summarisation"],
    relatedService: "nlp",
    relatedNichePage: "/ai/nlp",
  },
  {
    slug: "coreference-resolution",
    termUk: "Розв'язання кореференцій",
    termEn: "Coreference Resolution",
    category: "nlp",
    shortDescription: "Визначення коли різні вирази в тексті посилаються на один і той самий об'єкт (\"CEO... вона... д-р Сміт\"). Необхідно для аналізу контрактів, підсумовування новин, обробки клієнтської кореспонденції.",
    fullDescription: `Coreference Resolution — задача NLP, що ідентифікує всі вирази в тексті, які посилаються на один і той самий реальний об'єкт, і групує їх у кореферентні ланцюжки.\n\n**Приклад:**\n«Barclays оголосив нові умови. **Банк** підвищить відсоткові ставки. **Він** також змінить мінімальний внесок. **Фінансова установа** зробила це після рішення Bank of England.»\n\n→ {Barclays, Банк, Він, Фінансова установа} — одна сутність.\n\n**Типи референцій:**\n- **Pronoun**: he, she, it, they, his, her\n- **Definite NP**: «the company», «the CEO», «the contract\"\n- **Demonstrative**: «this decision», «these terms\"\n- **Zero pronoun**: у мовах з pro-drop (не актуально для англійської)\n\n**Методи:**\n- **Rule-based (Hobbs algorithm)**: синтаксичні правила, перевірка статі/числа. Простий, інтерпретований, погано з ambiguity.\n- **Statistical (mention-pair models)**: класифікатор для кожної пари згадок. Краще але O(n²).\n- **Neural (SpanBERT, s2e-coref)**: SOTA. SpanBERT fine-tuned на OntoNotes: F1 ~83%.\n- **LLM prompting**: GPT-4, Claude для невеликих документів — гнучко але дорого.\n\n**UK застосування:**\n- **Contract review**: Хто несе відповідальність? Які зобов'язання якої сторони?\n- **Financial news NLP**: консолідація інформації про компанію з різних джерел\n- **GDPR data subject requests**: знайти всі згадки особи в документах\n- **Customer correspondence**: зрозуміти контекст без re-reading всього thread`,
    example: "UK insurance: автоматична обробка 3,000 claims/день. Без coreference resolution — NER система плутає страхувальника і страховика (обидва «the company», «the party»). З SpanBERT coreference: точність вилучення ключових сутностей +23%. Скорочення ручного review з 40% до 12% claims.",
    relatedTerms: ["ocr", "question-answering", "summarisation"],
    relatedService: "nlp",
    relatedNichePage: "/ai/nlp",
  },
  {
    slug: "question-answering",
    termUk: "Система відповідей на питання",
    termEn: "Question Answering (QA)",
    category: "nlp",
    shortDescription: "NLP-задача відповідей на питання природною мовою з документів-джерел. Екстрактивний (вилучення спану) або генеративний (LLM) підхід. Основа RAG-чатботів та систем автоматизації FAQ.",
    fullDescription: `Question Answering (QA) — задача NLP, де система отримує питання природною мовою та контекстний документ (або corpus) і повертає відповідь.\n\n**Типи QA систем:**\n\n*Extractive QA:*\nМодель знаходить точний відрізок тексту з документа, що відповідає на питання. BERT/RoBERTa fine-tuned на SQuAD. Плюс: відповідь верифікована (є у джерелі). Мінус: не може синтезувати інформацію з кількох місць.\n\n*Abstractive/Generative QA:*\nМодель генерує відповідь на основі контексту (T5, BART, GPT). Може перефразувати, узагальнити, зв'язати інформацію. Ризик: галюцинації.\n\n*RAG (Retrieval-Augmented Generation):*\nКомбінація: спочатку vector search знаходить релевантні документи → потім LLM генерує відповідь на основі вилученого контексту. Де-факто стандарт для enterprise knowledge bases 2024+.\n\n**Метрики якості:**\n- **Exact Match (EM)**: відповідь ідентична ground truth (суворо)\n- **F1**: частковий збіг на рівні токенів\n- **BERTScore**: семантична схожість через embeddings\n- **Faithfulness**: чи відповідь підтримується контекстом (для RAG)\n\n**UK enterprise застосування:**\n| Use Case | Тип QA | Інструменти |\n|---|---|---|\n| HR policy chatbot | RAG + LLM | LangChain + GPT-4o |\n| Legal contract QA | Extractive + RAG | SpanBERT + Pinecone |\n| HMRC tax FAQ | RAG | Azure OpenAI + AI Search |\n| NHS clinical guidelines | Extractive | BioBERT fine-tuned |\n| Financial research | Generative RAG | Claude + Anthropic API |`,
    example: "UK professional services firm: 15,000 сторінок внутрішньої документації, polícy documents, процедур. RAG система на GPT-4o + Azure AI Search. Нова співробітниця знаходить відповідь на питання за 8 секунд vs 23 хвилини пошуку вручну. 89% питань вирішуються без escalation до HR/Legal. ROI за 4 місяці.",
    relatedTerms: ["summarisation", "coreference-resolution", "ocr"],
    relatedService: "nlp",
    relatedNichePage: "/ai/nlp",
  },
  {
    slug: "summarisation",
    termUk: "Автоматичне підсумовування",
    termEn: "Text Summarisation",
    category: "nlp",
    shortDescription: "Стиснення довгих документів до ключової інформації. Екстрактивний підхід (відбір речень) проти абстрактивного (генерація нового тексту). Застосовується для аналізу UK юридичних та фінансових документів, моніторингу новин.",
    fullDescription: `Text Summarisation — задача NLP автоматичного скорочення документів зі збереженням ключової інформації та сенсу.\n\n**Екстрактивне підсумовування:**\nВибирає найважливіші речення з оригінального тексту без зміни формулювань.\n- Методи: TF-IDF ранжування, TextRank (граф-алгоритм), BERTSum\n- Переваги: factually accurate (нічого не вигадано), інтерпретовано\n- Обмеження: може бути незв'язним, пропускає implicit інформацію\n\n**Абстрактивне підсумовування:**\nГенерує новий текст, що передає зміст — як людина переказує своїми словами.\n- Моделі: BART (facebook/bart-large-cnn), T5, Pegasus, GPT/Claude\n- Переваги: більш зв'язний, може синтезувати розрізнену інформацію\n- Ризики: «галюцинації» — вигадані факти, що відсутні в оригіналі\n\n**Оцінка якості (ROUGE метрики):**\n- ROUGE-1: перекриття уніграм з reference summary\n- ROUGE-2: перекриття біграм\n- ROUGE-L: найдовша спільна підпослідовність\n- BERTScore: семантична схожість (краще за ROUGE для абстрактивного)\n\n**UK специфіка:**\n- Юридичні документи: екстрактивний safer (точність критична)\n- Фінансові звіти: гібрид — структура (extractive) + висновки (abstractive)\n- Новинний моніторинг: abstractive для читабельних дайджестів\n- GDPR: маскування PII перед підсумовуванням через зовнішній API\n\n**Ключові обмеження:**\n- Context window: GPT-4 (128k), Claude (200k) — для дуже довгих документів (договори 200+ стор.) потрібна ієрархічна стратегія chunk→summary→meta-summary`,
    example: "UK hedge fund: щоденний моніторинг 800+ новинних статей про портфельні компанії. Pegasus fine-tuned на фінансових текстах: 3-речення executive summary для кожної статті. Аналітики переглядають 800 summary за 40 хвилин vs 6+ годин раніше. Виявлення sentiment shifts на 4-6 годин раніше ринку.",
    relatedTerms: ["question-answering", "coreference-resolution", "ocr"],
    relatedService: "nlp",
    relatedNichePage: "/ai/nlp",
  },
  {
    slug: "ice-regulation",
    termUk: "Регулювання ICO (Великобританія)",
    termEn: "ICO Regulation (UK)",
    category: "regulation",
    shortDescription: "Повноваження Управління інформаційного комісара Великобританії: штрафи до £17.5M або 4% глобального обороту. AI-аудити, виконання GDPR/PECR. Релевантно для UK ML-обробки персональних даних.",
    fullDescription: `ICO (Information Commissioner's Office) — незалежний регулятор захисту даних та інформаційних прав у Великобританії, що отримав розширені повноваження після Brexit через UK GDPR та Data Protection Act 2018.\n\n**Повноваження ICO:**\n- Розслідування скарг фізичних осіб\n- Аудити організацій (примусові та добровільні)\n- Правообов'язуючі рішення (binding orders)\n- Штрафи до £17.5M або 4% глобального річного обороту (більше)\n- Заборона обробки даних\n- Кримінальне переслідування (у серйозних випадках)\n\n**Релевантність для ML:**\n- **Automated decision-making (UK GDPR Art. 22)**: право оспорити рішення, прийняте виключно автоматично (кредитний скоринг, HR screening)\n- **Explainability**: ICO вимагає «meaningful information about the logic involved»\n- **Data minimisation**: не збирати більше даних ніж потрібно для ML навчання\n- **Purpose limitation**: не тренувати модель на даних зібраних для іншої мети\n- **DPIA (Data Protection Impact Assessment)**: обов'язковий для high-risk ML обробки\n\n**ICO AI Guidance (2023-2024):**\nICO видав серію guidance documents про AI: Explaining AI, Fairness in AI, Biometric data. Практичні перевірочні списки для compliance команд.\n\n**PECR (Privacy and Electronic Communications Regulations):**\nРегулює cookies, marketing emails. Релевантно для ML на basis of behavioural tracking data.\n\n**Порівняння з EU AI Act:**\nICO ≠ AI регулятор (це Data Protection). UK не прийняв відповідний AI Act, натомість — pro-innovation підхід через existing sector regulators (FCA, CMA, Ofcom).`,
    example: "UK HR SaaS: CV screening алгоритм відхиляв 95% заявок без людського review. ICO investigation: порушення Art. 22 (automated decision-making), відсутність explainability, potential indirect discrimination. Результат: £350k штраф + binding order впровадити human oversight + DPIA. Вартість compliance ретрофіту: £2.1M.",
    relatedTerms: ["algorithmic-impact-assessment", "ml-ops-maturity", "data-versioning"],
    relatedService: "ai-strategy",
    relatedNichePage: "/ai/regulation",
  },
  {
    slug: "algorithmic-impact-assessment",
    termUk: "Оцінка впливу алгоритмів",
    termEn: "Algorithmic Impact Assessment (AIA)",
    category: "regulation",
    shortDescription: "Структурована оцінка впливу ML-системи на людей, групи та суспільство. Шаблон UK CDEI. Ширше за DPIA — охоплює справедливість, підзвітність, прозорість.",
    fullDescription: `Algorithmic Impact Assessment (AIA) — системна оцінка потенційних ризиків та наслідків розгортання алгоритмічної системи, що виходить за межі стандартного DPIA.\n\n**Чим AIA відрізняється від DPIA:**\n| Критерій | DPIA | AIA |\n|---|---|---|\n| Фокус | Privacy та захист даних | Ширший соціальний вплив |\n| Обов'язковість | UK GDPR вимагає | Добровільний (але очікується) |\n| Охоплення | Окремі особи | Групи, суспільство |\n| Регулятор | ICO | CDEI, FCA, CMA (по секторах) |\n\n**CDEI AIA Framework (UK Centre for Data Ethics and Innovation):**\n1. **Scope & Purpose**: Яка мета системи? Хто приймає рішення? Які альтернативи?\n2. **Data Assessment**: Звідки дані? Чи репрезентативні? Яке quality?\n3. **Fairness Analysis**: Різний impact на demographic groups? Disparate impact testing.\n4. **Explainability**: Чи може система пояснити рішення? Рівень, достатній для оскарження.\n5. **Accountability**: Хто відповідальний? Механізм appeals?\n6. **Monitoring Plan**: Як відстежується bias у production? Тригери для ревізії.\n\n**Метрики справедливості (UK context):**\n- Disparate Impact Ratio ≥ 0.8 (80% rule) для захищених характеристик (Equality Act 2010)\n- Equal Opportunity: рівний recall для різних груп\n- Calibration: ймовірності однаково точні для всіх груп\n\n**Public sector obligation:**\nPublic Sector Equality Duty (PSED) фактично вимагає AIA для публічних органів, що використовують ML для рішень щодо громадян.`,
    example: "UK council: алгоритм пріоритизації черги на соціальне житло. AIA виявив: вага «стабільності зайнятості» непропорційно впливала на single parents і мігрантів (protected characteristics). Без AIA — потенційне порушення Equality Act, judicial review, репутаційні збитки. Після AIA: переважена модель, прозорий scoring, механізм апеляції.",
    relatedTerms: ["ice-regulation", "ml-ops-maturity", "experiment-tracking"],
    relatedService: "ai-strategy",
    relatedNichePage: "/ai/regulation",
  },
  {
    slug: "ml-ops-maturity",
    termUk: "Рівень зрілості MLOps",
    termEn: "MLOps Maturity Model",
    category: "mlops",
    shortDescription: "Шкала вимірювання складності ML-деплою: Рівень 0 (ручний, notebook-based), Рівень 1 (автоматизоване навчання), Рівень 2 (повний CI/CD з автоматичним перенавчанням). Стандарт Google MLOps maturity model.",
    fullDescription: `MLOps Maturity Model — фреймворк для оцінки рівня автоматизації та зрілості ML-операцій в організації, що визначає поточний стан і наступні кроки розвитку.\n\n**Google MLOps Maturity Levels:**\n\n**Level 0 — Manual Process:**\n- Data scientists у Jupyter Notebooks\n- Ручне тренування і ручний деплой\n- Модель і код ізольовані від production\n- Немає відстеження метрик у часі\n- Типово для: MVP, PoC, одноразові аналізи\n- Ризики: «Works on my machine», модель ніколи не оновлюється, немає моніторингу деградації\n\n**Level 1 — ML Pipeline Automation:**\n- Automated, reproducible training pipeline\n- Data і model validation automated\n- Continuous Training (CT): перенавчання при нових даних\n- Feature Store для consistent features\n- Model Registry для версіонування\n- Типово для: production ML в mid-size організаціях\n\n**Level 2 — CI/CD Pipeline Automation:**\n- Rapid, reliable update of production pipelines\n- Automated testing коду, даних і моделей\n- CI/CD: будь-який commit → тест → перенавчання → validate → deploy\n- A/B testing і champion/challenger deployment\n- Advanced monitoring з automated retraining triggers\n- Типово для: ML-mature organizations (UK big banks, FAANG, mature fintech)\n\n**Діагностика рівня:**\nЗадайте собі: «Скільки часу від нової ідеї до production моделі?»\n- Тижні/місяці ручної роботи → Level 0\n- Дні з деяким ручним втручанням → Level 1  \n- Години з автоматичним pipeline → Level 2`,
    example: "UK insurtech за 12 місяців: Level 0 → Level 2. Початок: 6 тижнів від ідеї до production. Після DVC + MLflow + GitHub Actions + BentoML: 4 години. Side effect: кількість deployment-related incidents: 12/рік → 1/рік. Team velocity: 3 моделі/рік → 11 моделей/рік.",
    relatedTerms: ["ci-cd-ml", "experiment-tracking", "data-versioning"],
    relatedService: "mlops",
    relatedNichePage: "/ml/mlops",
  },
  {
    slug: "confusion-matrix",
    termUk: "Матриця плутанини",
    termEn: "Confusion Matrix",
    category: "data",
    shortDescription: "Таблиця TP/FP/TN/FN для класифікаційної моделі. Основа для розрахунку precision/recall/F1. Візуалізує компроміси моделі при різних порогах рішення.",
    fullDescription: `Confusion Matrix — таблиця, що показує розподіл передбачень класифікаційної моделі відносно справжніх міток, дозволяючи всебічно оцінити якість моделі.\n\n**Базова структура (бінарна класифікація):**\n\n|  | Predicted Positive | Predicted Negative |\n|---|---|---|\n| **Actual Positive** | TP (True Positive) | FN (False Negative) |\n| **Actual Negative** | FP (False Positive) | TN (True Negative) |\n\n**Ключові метрики:**\n- **Precision** = TP / (TP + FP): «Зі всіх позитивних передбачень — скільки правильних?» Важливо коли FP дорогий (spam filter)\n- **Recall (Sensitivity)** = TP / (TP + FN): «Зі всіх реальних позитивів — скільки знайдено?» Важливо коли FN дорогий (cancer detection)\n- **F1-Score** = 2 × (Precision × Recall) / (Precision + Recall): гармонічне середнє\n- **Specificity** = TN / (TN + FP): True Negative Rate\n- **AUC-ROC**: площа під ROC-кривою (TPR vs FPR при різних порогах) — threshold-агностична метрика\n\n**Вибір метрики для UK задач:**\n| Задача | Ключова метрика | Чому |\n|---|---|---|\n| Fraud detection | Recall | Пропустити fraud (FN) дорожче ніж false alarm |\n| Credit approval | Precision | Неправомірна відмова (FP) = regulatory risk |\n| Medical screening | Recall | Пропустити хворобу (FN) = небезпечно |\n| Spam filter | Precision | Заблокувати важливий email (FP) = критично |\n| AML monitoring | F1 | Баланс між precision і recall |\n\n**Threshold moving:**\nЗа замовчуванням поріг = 0.5. Зміщення до 0.3 → більше TP і FP (вище recall, нижче precision). Вибір порогу = бізнес-рішення, не технічне.`,
    example: "UK кредитний скоринг (10,000 заявок): Threshold 0.5 — Precision 78%, Recall 61%, F1 0.68. Регулятор вимагає пояснити відмови (FP несуть regulatory risk). Перемістили threshold до 0.65: Precision 89%, Recall 48%, F1 0.63. Менше відмов загалом, але кожна відмова більш обґрунтована — легше документувати для FCA.",
    relatedTerms: ["imbalanced-learning", "experiment-tracking", "ml-ops-maturity"],
    relatedService: "data-analytics",
    relatedNichePage: "/ai/machine-learning",
  },
  {
    slug: "multi-label-classification",
    termUk: "Багатомічкова класифікація",
    termEn: "Multi-label Classification",
    category: "ai",
    shortDescription: "ML-задача, де кожен вхід може належати до кількох класів одночасно (документ позначений «фінанси» І «ризик» І «регулювання»). Sigmoid вихідний шар замість softmax для єдиної мітки.",
    fullDescription: `Multi-label Classification — тип задачі класифікації, де для кожного прикладу може бути присвоєно довільну кількість міток одночасно (на відміну від multi-class, де вибирається рівно одна).\n\n**Відмінність від інших задач:**\n- **Binary**: 1 клас з 2 можливих (spam/not spam)\n- **Multi-class**: 1 клас з N можливих (cat/dog/bird/fish)\n- **Multi-label**: M класів з N можливих (0 ≤ M ≤ N)\n\n**Архітектура:**\n- Замість softmax + cross-entropy → sigmoid + binary cross-entropy для кожної мітки незалежно\n- Виходи: N чисел в [0,1], кожне = ймовірність відповідної мітки\n- Поріг: зазвичай 0.5 для кожної мітки (налаштовується незалежно!)\n\n**Метрики:**\n- **Hamming Loss**: частка неправильно передбачених міток\n- **Subset Accuracy**: частка прикладів де всі мітки точні (суворо!)\n- **Micro/Macro F1**: усереднення по мітках\n- **mAP (mean Average Precision)**: для ранжованих передбачень\n\n**Спеціальні техніки:**\n- **Label correlations**: деякі мітки часто зустрічаються разом (FINANCE ↔ RISK). Classifier Chains враховують кореляції.\n- **Label imbalance**: рідкісні мітки потребують oversampling або focal loss\n- **Hierarchical labels**: якщо мітки мають ієрархію (CONTRACT → EMPLOYMENT_CONTRACT → TERMINATION_CLAUSE)\n\n**UK застосування:**\n- Document classification: legal/financial documents тегуються за типом, предметом, ризиком\n- News monitoring: стаття може бути [BREXIT, TRADE, REGULATION, ECONOMY]\n- Medical coding: ICD-10 кодування (пацієнт має кілька діагнозів)\n- Product categorization: e-commerce продукт у кількох категоріях`,
    example: "UK RegTech: автоматичне тегування regulatory documents. 47 можливих міток (AML, KYC, GDPR, PSD2, FCA, PRA, Basel III...). Multi-label BERT: Micro-F1 0.84, Macro-F1 0.79. Середня кількість міток: 3.2/документ. Скорочення часу ручного тегування з 8 хвилин до 0 на документ для 94% з них.",
    relatedTerms: ["confusion-matrix", "imbalanced-learning", "regularization"],
    relatedService: "nlp",
    relatedNichePage: "/ai/nlp",
  },
  {
    slug: "data-pipeline",
    termUk: "Конвеєр даних",
    termEn: "Data Pipeline",
    category: "infrastructure",
    shortDescription: "Автоматизована послідовність трансформацій даних від джерела до ML-готового формату. Інструменти: Airflow (планування), dbt (трансформації), Kafka (стрімінг), Spark (масштабна обробка).",
    fullDescription: `Data Pipeline — автоматизована система, що переміщує та трансформує дані від вихідних джерел до кінцевих споживачів (ML-моделей, BI-дашбордів, аналітичних систем).\n\n**Архітектурні патерни:**\n\n*Batch Pipeline (ETL/ELT):*\nОбробка великих обсягів даних з фіксованою частотою (щодня, щогодини). ETL: Extract → Transform → Load. ELT: Extract → Load → Transform (в warehouse). Інструменти: Apache Airflow, dbt, Spark.\n\n*Streaming Pipeline:*\nОбробка подій у реальному часі з затримкою мілісекунди-секунди. Інструменти: Apache Kafka, Apache Flink, AWS Kinesis, Google Pub/Sub.\n\n*Lambda Architecture:*\nГібрид: batch шар для historical data + speed шар для real-time. Складніший але повний.\n\n**Ключові компоненти:**\n- **Ingestion**: Fivetran, Airbyte, Kafka Connect — автоматичне підключення до джерел\n- **Storage**: Data Lake (S3/GCS/ADLS), Data Warehouse (BigQuery, Snowflake, Redshift)\n- **Transformation**: dbt (SQL-based), Spark (code-based), Pandas (small scale)\n- **Orchestration**: Apache Airflow (Python DAGs), Prefect, Dagster, AWS Step Functions\n- **Quality**: Great Expectations, dbt tests — автоматична валідація\n- **Observability**: Monte Carlo, Metaplane — data quality monitoring\n\n**UK compliance вимоги:**\n- Audit trail: хто змінив дані і коли (GDPR, FCA)\n- Data lineage: звідки прийшли дані (Basel III model validation)\n- PII handling: маскування/шифрування персональних даних в pipeline\n- BCBS 239: звітність ризиків для UK banks — чіткі вимоги до data lineage та якості`,
    example: "UK retail bank: data pipeline для fraud ML. Kafka — 2M транзакцій/день у real-time. Flink — збагачення транзакцій feature store (merchant category, user history, velocity). Airflow — щоденний batch для model retraining. dbt — трансформації для BI звітності. Great Expectations — автоматична валідація якості даних. SLA: fraud score доступний за 85ms від транзакції.",
    relatedTerms: ["data-versioning", "ci-cd-ml", "experiment-tracking"],
    relatedService: "data-analytics",
    relatedNichePage: "/ml/mlops",
  },
  {
    slug: "specificity",
    termUk: "Специфічність",
    termEn: "Specificity (True Negative Rate)",
    category: "data",
    shortDescription: "Частка правильно визначених негативних випадків: TN/(TN+FP). Доповнює чутливість; критична у медичному скринінгу та кредитному скорингу.",
    fullDescription: `Специфічність (True Negative Rate, TNR) — метрика класифікатора, що вимірює здатність правильно ідентифікувати негативні випадки: TN / (TN + FP).\n\nЯкщо чутливість (recall) відповідає на питання «скільки хворих ми знайшли?», то специфічність відповідає «скільки здорових ми правильно визнали здоровими?».\n\n**Практичні наслідки компромісу:**\n- Висока специфічність → мало хибних тривог (FP), але можна пропустити реальні випадки\n- Низька специфічність → багато непотрібних направлень/блокувань\n\n**UK застосування:**\n- Медичний скринінг раку: висока чутливість важливіша (не пропустити хворого), але низька специфічність = перевантаження NHS\n- Fraud detection: висока специфічність = менше блокувань легітимних платежів (FCA вимоги до customer experience)\n- Credit scoring: UK FCA вимагає документувати threshold-вибір та його вплив на protected characteristics (Equality Act 2010)`,
    example: "Тест на COVID зі специфічністю 98%: із 1000 здорових людей 980 отримають правильний негативний результат, 20 — хибнопозитивний.",
    relatedTerms: ["roc-curve", "pr-curve", "precision-recall"],
    relatedService: "data-analytics",
    relatedNichePage: "/ml/banking",
  },
  {
    slug: "roc-curve",
    termUk: "ROC-крива",
    termEn: "ROC Curve (Receiver Operating Characteristic)",
    category: "data",
    shortDescription: "Графік TPR проти FPR для всіх порогів класифікатора. AUC (площа під кривою) вимірює загальну якість розрізнення; стандарт для UK кредитних та fraud-моделей.",
    fullDescription: `ROC-крива (Receiver Operating Characteristic) — діагностичний графік, що відображає компроміс між True Positive Rate (TPR/чутливість) та False Positive Rate (FPR) при варіюванні порогу класифікації.\n\n**AUC (Area Under the Curve):**\n- AUC = 1.0: ідеальний класифікатор\n- AUC = 0.5: випадкове вгадування (діагональ)\n- AUC = 0.7–0.8: прийнятно для більшості задач\n- AUC > 0.9: відмінно; >0.95 — підозра на data leakage\n\n**Інтерпретація:** AUC = імовірність того, що модель ранжує випадковий позитивний приклад вище ніж випадковий негативний.\n\n**UK регуляторний контекст:**\n- PRA/FCA вимагають Gini coefficient (= 2×AUC − 1) для credit risk моделей\n- Basel IV: IRB-моделі PD/LGD мають підтримувати Gini ≥ певного порогу\n- UK GDPR Article 22: автоматизовані рішення потребують meaningful explanation — ROC допомагає документувати threshold-вибір`,
    example: "UK mortgage lender: ROC AUC 0.82 для default prediction моделі. Регулятор (PRA) перевіряє Gini = 0.64 та стабільність AUC на out-of-time вибірці.",
    relatedTerms: ["specificity", "pr-curve", "precision-recall"],
    relatedService: "data-analytics",
    relatedNichePage: "/ml/banking",
  },
  {
    slug: "pr-curve",
    termUk: "PR-крива",
    termEn: "Precision-Recall Curve",
    category: "data",
    shortDescription: "Графік precision проти recall для незбалансованих датасетів. Перевершує ROC при класах <1% (fraud, рак, кібератаки) — дає реалістичнішу оцінку продуктивності.",
    fullDescription: `PR-крива (Precision-Recall Curve) відображає компроміс між точністю (precision = TP/(TP+FP)) та повнотою (recall = TP/(TP+FN)) для всіх порогів класифікатора.\n\n**Чому PR краще ROC для незбалансованих даних:**\nРОС-крива оптимістична при незбалансованих класах, бо FPR знаменником є TN (яких дуже багато). PR-крива відображає реальну частку правильних позитивних передбачень.\n\n**AP (Average Precision)** — площа під PR-кривою, аналог AUC для PR.\n\n**UK застосування:**\n- Online banking fraud: ~0.1% транзакцій шахрайські → PR-крива показує реальну вартість false alerts\n- AML (Anti-Money Laundering): FCA вимагає документувати precision/recall компроміс для SAR filing\n- Medical imaging NHS: рак легень ~0.3% у скринінгу — AP метрика для звітності MHRA`,
    example: "Fraud модель: ROC AUC = 0.95 (виглядає чудово), але PR AUC = 0.35 (кожен 3-й alert хибний). PR-крива виявляє реальну проблему.",
    relatedTerms: ["specificity", "roc-curve", "precision-recall"],
    relatedService: "data-analytics",
    relatedNichePage: "/ml/banking",
  },
  {
    slug: "stochastic-gradient-descent",
    termUk: "Стохастичний градієнтний спуск",
    termEn: "Stochastic Gradient Descent (SGD)",
    category: "ai",
    shortDescription: "Ітеративна оптимізація ваг нейромережі на міні-батчах даних. Adam та AdamW — сучасні варіанти з адаптивним learning rate; основа навчання глибоких мереж.",
    fullDescription: `SGD (Stochastic Gradient Descent) — алгоритм оптимізації, що оновлює ваги моделі на основі градієнта функції втрат, обчисленого на невеликій випадковій підмножині даних (міні-батч).\n\n**Варіанти оптимізаторів:**\n\n*Vanilla SGD:* проста але потребує ручного налаштування learning rate та схильна до застрягання у локальних мінімумах.\n\n*Momentum SGD:* додає «інерцію» — прискорює в напрямку стабільного градієнта, зменшує осциляції.\n\n*Adam (Adaptive Moment Estimation):* адаптує learning rate для кожного параметра на основі першого та другого моментів градієнта. Найпопулярніший вибір для більшості задач.\n\n*AdamW:* Adam з decoupled weight decay — виправляє L2 regularization в Adam; рекомендований для трансформерів (GPT, BERT).\n\n**Практичні аспекти:**\n- Learning rate schedule: cosine annealing, linear warmup (стандарт для LLM fine-tuning)\n- Gradient clipping: захист від exploding gradients у RNN/LSTM\n- Batch size: більший батч → стабільніший градієнт, але потребує scaling learning rate`,
    example: "Fine-tuning BERT для UK legal document classification: AdamW, lr=2e-5, warmup 10%, weight_decay=0.01 — стандартна конфігурація Hugging Face.",
    relatedTerms: ["backpropagation", "transformer", "neural-network"],
    relatedService: "ai-development",
    relatedNichePage: "/ai/nlp",
  },
  {
    slug: "backpropagation",
    termUk: "Зворотне поширення помилки",
    termEn: "Backpropagation",
    category: "ai",
    shortDescription: "Обчислення градієнтів для всіх ваг нейромережі через правило ланцюга. Фундаментальний алгоритм, що робить можливим навчання глибоких нейромереж.",
    fullDescription: `Backpropagation (зворотне поширення помилки) — алгоритм ефективного обчислення градієнтів функції втрат відносно всіх параметрів нейромережі за допомогою правила ланцюга диференціювання.\n\n**Принцип роботи:**\n1. **Forward pass:** дані проходять через мережу, обчислюється prediction та loss\n2. **Backward pass:** gradients обчислюються від виходу до входу через chain rule: ∂L/∂w = ∂L/∂y × ∂y/∂w\n3. **Weight update:** SGD/Adam оновлює ваги в напрямку від'ємного градієнта\n\n**Ключові проблеми:**\n- **Vanishing gradients:** градієнти стають дуже малими у глибоких мережах → ReLU activation, residual connections (ResNet)\n- **Exploding gradients:** градієнти ростуть експоненційно → gradient clipping\n- **Computational cost:** O(weights × data) — автоматичне диференціювання (PyTorch autograd, JAX) оптимізує це\n\n**Автоматичне диференціювання:**\nSучасні фреймворки (PyTorch, TensorFlow, JAX) будують computational graph та обчислюють backprop автоматично — розробник не пише градієнти вручну.`,
    example: "3-шарова мережа для UK credit scoring: forward pass обчислює P(default), cross-entropy loss, backprop розповсюджує градієнти через всі шари для оновлення 50k параметрів.",
    relatedTerms: ["stochastic-gradient-descent", "neural-network", "convolutional-neural-network"],
    relatedService: "ai-development",
    relatedNichePage: "/ai/healthcare",
  },
  {
    slug: "convolutional-neural-network",
    termUk: "Згорткова нейронна мережа",
    termEn: "Convolutional Neural Network (CNN)",
    category: "ai",
    shortDescription: "Архітектура нейромережі зі згортковими шарами для виявлення просторових ознак. Домінує в задачах комп'ютерного зору, медичної візуалізації та аналізу зображень.",
    fullDescription: `CNN (Convolutional Neural Network) — клас глибоких нейромереж, що використовують операцію згортки для автоматичного навчання ієрархічних просторових ознак з вхідних даних.\n\n**Ключові компоненти:**\n- **Convolutional layers:** фільтри ковзають по зображенню, виявляючи локальні патерни (краї, текстури, форми)\n- **Pooling layers:** зменшують розмірність, зберігають важливі ознаки (max pooling)\n- **Fully connected layers:** фінальна класифікація на основі вивчених ознак\n\n**Еволюція архітектур:**\nLeNet (1998) → AlexNet (2012, ImageNet прорив) → VGG → ResNet (residual connections) → EfficientNet → Vision Transformer (ViT)\n\n**UK застосування:**\n- NHS медична візуалізація: CNN для діагностики раку шкіри (Mohs), пневмонії, ретинопатії — MHRA регуляція як Medical Device\n- UK retail security: розпізнавання облич та поведінки в CCTV (ICO surveillance guidelines)\n- Document processing: OCR рукописних медичних карток, UK passport verification\n- Fintech: підпис verification, чек обробка`,
    example: "UK NHS dermatology: EfficientNet-B4 fine-tuned на 130k зображень шкіри досягає AUC 0.93 для melanoma detection — рівень дерматолога.",
    relatedTerms: ["object-detection", "semantic-segmentation", "backpropagation"],
    relatedService: "ai-development",
    relatedNichePage: "/ai/healthcare",
  },
  {
    slug: "recurrent-neural-network",
    termUk: "Рекурентна нейронна мережа",
    termEn: "Recurrent Neural Network (RNN)",
    category: "ai",
    shortDescription: "Архітектура для послідовних даних зі схованим станом між кроками. LSTM та GRU вирішують проблему зникаючих градієнтів; значною мірою витіснені Трансформерами для NLP.",
    fullDescription: `RNN (Recurrent Neural Network) — клас нейромереж з петлями зворотного зв'язку, що дозволяють зберігати «пам'ять» про попередні кроки послідовності через прихований стан (hidden state).\n\n**Проблеми базових RNN:**\n- Vanishing/exploding gradients через багаторазове множення матриць\n- Практична «пам'ять» лише ~10-20 кроків\n\n**LSTM (Long Short-Term Memory):**\nДодає gates (input, forget, output) для вибіркового збереження інформації. Вирішує vanishing gradients, пам'ятає залежності на 100+ кроків.\n\n**GRU (Gated Recurrent Unit):**\nСпрощена версія LSTM з меншою кількістю параметрів; часто порівнювана продуктивність.\n\n**Сучасний статус:**\nДля більшості NLP задач Transformer (BERT, GPT) перевершив RNN/LSTM завдяки паралелізму та кращій обробці довгих залежностей. RNN залишаються актуальними для:\n- Time series з дуже довгими послідовностями (IoT sensor streams)\n- Embedded/edge пристрої з обмеженою пам'яттю\n- Online learning (стрімінгові дані)`,
    example: "UK fintech: LSTM для anomaly detection у транзакційних time series — 30-денна послідовність поведінки клієнта для early fraud warning.",
    relatedTerms: ["transformer", "stochastic-gradient-descent", "convolutional-neural-network"],
    relatedService: "ai-development",
    relatedNichePage: "/ai/nlp",
  },
  {
    slug: "object-detection",
    termUk: "Розпізнавання об'єктів",
    termEn: "Object Detection",
    category: "ai",
    shortDescription: "Задача комп'ютерного зору: класифікація та локалізація кількох об'єктів з bounding boxes. Алгоритми YOLO/Faster-RCNN/DETR; застосування у UK ритейлі, безпеці, медицині.",
    fullDescription: `Object Detection — задача комп'ютерного зору, що поєднує класифікацію («що це?») та локалізацію («де це?») для кількох об'єктів одночасно на одному зображенні або відео кадрі.\n\n**Ключові архітектури:**\n\n*YOLO (You Only Look Once):*\nOne-stage detector: одночасна обробка всього зображення. Швидкий (real-time), менш точний для дрібних об'єктів. YOLOv8/v9 — сучасний стандарт для edge deployment.\n\n*Faster R-CNN:*\nTwo-stage detector: спочатку region proposals, потім класифікація. Точніший але повільніший. Переважає у медичних застосуваннях.\n\n*DETR (Detection Transformer):*\nТрансформер-базований підхід від Meta. Усуває anchor boxes та NMS. Сильний на великих об'єктах.\n\n**UK регуляторний контекст:**\n- CCTV/surveillance: ICO вимагає Data Protection Impact Assessment (DPIA) для facial recognition\n- NHS медична візуалізація: MHRA регулює як Medical Device (CE/UKCA marking)\n- Autonomous vehicles: DVSA та DLUHC вимоги для UK roads\n- Retail inventory: без регуляторних обмежень, широко впроваджується`,
    example: "UK supermarket chain: YOLOv8 для automated checkout — розпізнавання 5000 SKU в real-time на ARM edge chip. Точність 96.3% mAP@0.5.",
    relatedTerms: ["semantic-segmentation", "convolutional-neural-network", "computer-vision"],
    relatedService: "ai-development",
    relatedNichePage: "/ai/healthcare",
  },
  {
    slug: "semantic-segmentation",
    termUk: "Семантична сегментація",
    termEn: "Semantic Segmentation",
    category: "ai",
    shortDescription: "Попіксельне присвоєння класу кожному пікселю зображення. Застосовується для сегментації пухлин у медичній візуалізації NHS та картографування сільгоспугідь з супутників.",
    fullDescription: `Semantic Segmentation — задача комп'ютерного зору, де кожному пікселю зображення присвоюється клас (наприклад: «пухлина», «здорова тканина», «фон»). На відміну від object detection (bounding boxes), дає точні межі об'єктів.\n\n**Архітектури:**\n\n*FCN (Fully Convolutional Network):* перша впливова архітектура. Encoder-decoder з skip connections.\n\n*U-Net:* розроблений для медичних зображень, домінує в NHS/клінічних застосуваннях. Симетричний encoder-decoder з рясними skip connections.\n\n*DeepLab (v3+):* atrous convolution для multi-scale features. Google Brain.\n\n*Segment Anything Model (SAM):* Meta foundation model — prompt-based segmentation, нульовий shot.\n\n**UK застосування:**\n- NHS radiology: U-Net для сегментації пухлин у MRI/CT — MHRA SaMD Class IIb\n- Satellite imagery: UK crop mapping для Defra (Department for Environment) — поле/ліс/вода\n- Autonomous driving: дорога/пішохід/знак для UK AV testing (CCAV)\n- Construction: BIM integration, site progress monitoring`,
    example: "UK NHS lung cancer screening: U-Net сегментує вузлики на CT-зображеннях з Dice score 0.87. Вивільняє 40% часу радіолога.",
    relatedTerms: ["object-detection", "convolutional-neural-network", "computer-vision"],
    relatedService: "ai-development",
    relatedNichePage: "/ai/healthcare",
  },
  {
    slug: "pos-tagging",
    termUk: "Частиномовне розмічування",
    termEn: "Part-of-Speech Tagging (POS Tagging)",
    category: "nlp",
    shortDescription: "Присвоєння граматичної ролі кожному токену (іменник, дієслово, прикметник тощо). Базове NLP-передобробка для аналізу юридичних та фінансових документів у Великій Британії.",
    fullDescription: `POS Tagging (Part-of-Speech Tagging) — задача NLP, що присвоює граматичну категорію (частину мови) кожному токену у тексті: NOUN, VERB, ADJ, ADV, PREP, DET тощо за Penn Treebank або Universal Dependencies tagset.\n\n**Методи:**\n- Rule-based: словники + морфологічні правила (перший підхід)\n- Statistical: Hidden Markov Model, CRF (Conditional Random Field)\n- Neural: BiLSTM-CRF → трансформери (BERT-based taggers досягають ~98% на стандартних бенчмарках)\n\n**Роль у NLP pipeline:**\nPOS tags є вхідними даними для:\n- Dependency parsing (граматичний розбір)\n- Named Entity Recognition (NER)\n- Information Extraction\n- Text normalization (лематизація)\n\n**UK застосування:**\n- Legal document analysis: ідентифікація дієслівних фраз для obligation extraction у контрактах (LawTech UK)\n- FCA regulatory reporting: автоматичний розбір regulatory updates для compliance teams\n- Parliamentary Hansard analysis: відстеження позицій депутатів`,
    example: "UK law firm: spaCy en_core_web_trf розмічує 10,000 NDA сторінок — POS tags допомагають виявляти obligation clauses ('shall', 'must', 'will') для compliance review.",
    relatedTerms: ["dependency-parsing", "ner", "tokenization"],
    relatedService: "nlp",
    relatedNichePage: "/ai/nlp",
  },
  {
    slug: "dependency-parsing",
    termUk: "Синтаксичний розбір залежностей",
    termEn: "Dependency Parsing",
    category: "nlp",
    shortDescription: "Аналіз граматичних відносин між словами речення (підмет, присудок, додаток). Ключове для витягування інформації з юридичних та регуляторних текстів Великої Британії.",
    fullDescription: `Dependency Parsing — задача NLP, що будує дерево граматичних залежностей між словами речення, визначаючи відносини типу nsubj (nominal subject), dobj (direct object), prep (prepositional modifier) тощо.\n\n**Представлення:** directed tree, де корінь — головне дієслово, кожне слово вказує на свій head із labeled arc.\n\n**Методи:**\n- Transition-based: arc-standard/arc-eager алгоритми (швидкі, O(n))\n- Graph-based: MST-алгоритми для глобальної оптимізації (точніші)\n- Neural: BiLSTM + pointer network → трансформери (сучасний стандарт)\n\n**UK застосування:**\n- Legal Information Extraction: визначення «хто що зобов'язаний» у контрактах (nsubj → obligation verb → dobj → entity)\n- FCA supervisory reporting: автоматичний розбір policy documents для gap analysis\n- HMRC: автоматизована обробка запитів платників податків (dependency paths для intent detection)\n- Academic: аналіз UK Parliamentary debates (Hansard corpus)`,
    example: "UK insurance: dependency parser виявляє exclusion clauses у policy documents — arc 'nsubj(excludes, policy)' → автоматичне маркування для compliance review.",
    relatedTerms: ["pos-tagging", "ner", "information-extraction"],
    relatedService: "nlp",
    relatedNichePage: "/ai/nlp",
  },
  {
    slug: "word2vec",
    termUk: "Word2Vec",
    termEn: "Word2Vec",
    category: "nlp",
    shortDescription: "Рання модель векторних представлень слів на основі спів-зустрічності у контексті. Генерує семантичні вектори; попередник контекстуальних ембедингів BERT/GPT.",
    fullDescription: `Word2Vec (Mikolov et al., Google, 2013) — нейромережева модель для навчання векторних представлень слів (word embeddings) на основі дистрибутивної гіпотези: слова з подібними контекстами мають подібне значення.\n\n**Два варіанти архітектури:**\n- **CBOW (Continuous Bag of Words):** передбачає центральне слово за контекстом → швидший\n- **Skip-gram:** передбачає контекст за центральним словом → кращий для рідкісних слів\n\n**Властивості:**\n- Арифметика аналогій: king − man + woman ≈ queen\n- Семантична близькість: cosine similarity між векторами\n- 300-вимірний простір типово\n\n**Обмеження:**\n- Статичні embedding: одне слово = один вектор незалежно від контексту (bank: річковий/фінансовий невиразно)\n- Не враховує порядок слів\n- Слабший за BERT/GPT для downstream tasks\n\n**Сучасне використання:**\nВикористовується як baseline, для пояснюваності (interpretable embeddings) та в resource-constrained середовищах. GloVe та fastText — конкурентні static embeddings.`,
    example: "UK fintech: Word2Vec на corpus FCA regulatory documents виявляє семантичні кластери термінів — 'capital', 'buffer', 'requirement' близькі у просторі. Корисно для regulatory gap analysis.",
    relatedTerms: ["transformer", "bert", "llm-hallucination"],
    relatedService: "nlp",
    relatedNichePage: "/ai/nlp",
  },
  {
    slug: "llm-hallucination",
    termUk: "Галюцинація LLM",
    termEn: "LLM Hallucination",
    category: "nlp",
    shortDescription: "Генерація LLM фактично хибного але правдоподібного контенту. Пом'якшується через RAG, зниження температури та верифікацію виводу; критичний ризик у UK медицині та праві.",
    fullDescription: `LLM Hallucination — явище, коли великі мовні моделі генерують впевнений, граматично правильний, але фактично хибний або вигаданий контент: неіснуючі цитати, неправильні дати, вигадані особи.\n\n**Типи галюцинацій:**\n- **Factual hallucination:** неправильні факти (дата, ім'я, число)\n- **Entity hallucination:** вигадані організації, люди, документи\n- **Citation hallucination:** неіснуючі наукові статті з правдоподібними назвами\n- **Logical hallucination:** формально коректний але хибний висновок\n\n**Причини:** LLM оптимізовані на правдоподібність токенів, не на фактичність. Знання відрізано по training cutoff.\n\n**Методи пом'якшення:**\n- **RAG (Retrieval-Augmented Generation):** прив'язка до перевіреної knowledge base\n- **Temperature=0:** детерміністський вивід для фактичних питань\n- **Output verification:** окрема модель перевіряє факти\n- **Grounding:** explicit instruction «відповідай лише на основі наданого контексту»\n\n**UK регуляторний ризик:**\n- NHS: AI diagnosis без верифікації = patient safety risk (MHRA)\n- Legal: AI-generated case citations (як у США Harvey AI скандал)\n- FCA: incorrect regulatory advice → mis-selling risk`,
    example: "UK law firm пілот: GPT-4 вигадав 6 неіснуючих прецедентів у legal memo. Впровадження RAG на BAILII corpus знизило hallucination rate з 12% до 0.8%.",
    relatedTerms: ["rag", "transformer", "word2vec"],
    relatedService: "nlp",
    relatedNichePage: "/ai/nlp",
  },
  {
    slug: "uk-ai-safety-institute",
    termUk: "Інститут безпеки ШІ Великої Британії",
    termEn: "UK AI Safety Institute (AISI)",
    category: "regulation",
    shortDescription: "Урядовий орган Великої Британії з оцінки безпеки frontier AI. Проводить red-teaming провідних моделей; встановлює міжнародні стандарти оцінки безпеки AI.",
    fullDescription: `UK AI Safety Institute (AISI) — державна організація, заснована урядом Великої Британії у 2023 після AI Safety Summit у Bletchley Park. Місія: наукова оцінка ризиків frontier AI-систем та вироблення методологій безпечного розгортання.\n\n**Ключові функції:**\n- **Evaluations:** незалежне тестування frontier моделей (GPT-4, Claude, Gemini) до публічного релізу\n- **Red-teaming:** виявлення небезпечних можливостей (CBRN, cyber, CSAM)\n- **Research:** публікація методологій оцінки AI safety\n- **International coordination:** спільні evaluations з US AISI, EU AI Office\n\n**Після ребрендингу (2024):** перейменований у DSIT AI Security Institute, але AISI залишається поширеною назвою.\n\n**Вплив на UK бізнес:**\n- Компанії, що розробляють/деплоять frontier AI у UK, мають очікувати voluntary evaluations\n- AISI методології формують майбутні обов'язкові вимоги\n- UK AI Act (у розробці) спиратиметься на AISI стандарти\n\n**Bletchley Declaration:** 28 країн (включно з Китаєм та США) підписали зобов'язання щодо AI safety cooperation.`,
    example: "Anthropic та Google DeepMind надали AISI доступ до pre-release моделей Claude 3 та Gemini Ultra. AISI опублікував звіт з оцінками CBRN та cyber capabilities.",
    relatedTerms: ["eu-ai-act", "responsible-ai", "model-governance"],
    relatedService: "ai-strategy",
    relatedNichePage: "/ai/regulation",
  },
  {
    slug: "solvency-ii",
    termUk: "Solvency II",
    termEn: "Solvency II",
    category: "regulation",
    shortDescription: "EU/UK регулювання достатності капіталу страхових компаній. Внутрішні ML-моделі потребують валідації EIOPA та документації; UK адаптував після Brexit (UK Solvency II Reform).",
    fullDescription: `Solvency II — регуляторна директива (EU 2009/138/EC), що встановлює вимоги до капіталу, управління ризиками та звітності для страховиків. Після Brexit: PRA адаптував як UK Solvency II з реформами 2023–2024 (Edinburgh Reforms).\n\n**Ключові pillars:**\n- **Pillar 1:** кількісні вимоги до капіталу (SCR, MCR)\n- **Pillar 2:** governance та ORSA (Own Risk and Solvency Assessment)\n- **Pillar 3:** звітність та розкриття інформації (QRT, SFCR, RSR)\n\n**ML-моделі в Solvency II:**\n- Internal Models (IM) для SCR потребують PRA approval\n- Model validation: незалежна перевірка, use test, statistical quality\n- EIOPA guidelines on AI: документація, explainability, ongoing monitoring\n- Data quality: вхідні дані для ML-моделей мають відповідати вимогам Data Quality Policy\n\n**UK Solvency II Reform (2023):**\n- Скорочення частки Matching Adjustment регуляторних вимог\n- Більша гнучкість для UK-специфічних Internal Models\n- PRA Supervisory Statement SS11/16 — вимоги до model risk management`,
    example: "UK life insurer (Aviva, Legal & General): ML-модель lapse prediction у Internal Model. PRA вимагає: backtesting, sensitivity analysis, model change policy, quarterly validation report.",
    relatedTerms: ["basel-iv", "model-risk-management", "responsible-ai"],
    relatedService: "ai-strategy",
    relatedNichePage: "/ml/banking",
  },
  {
    slug: "basel-iv",
    termUk: "Базель IV",
    termEn: "Basel IV",
    category: "regulation",
    shortDescription: "Банківська регуляторна база, повністю чинна з 2025 року у Великій Британії. ML-моделі кредитного ризику (PD/LGD/EAD) потребують жорсткої валідації відповідно до PRA вимог.",
    fullDescription: `Basel IV (формально Basel III finalization) — набір реформ Базельського комітету з банківського нагляду, спрямованих на підвищення порівнюваності RWA (Risk-Weighted Assets). Повна імплементація у UK: 1 січня 2025 (PRA policy statement PS17/23).\n\n**Ключові зміни для ML-моделей:**\n\n*Output Floor (72.5%):*\nIRB-моделі не можуть давати RWA менше 72.5% від стандартного підходу → обмежує «оптимізацію» через ML.\n\n*Revised IRB Constraints:*\n- PD floor: 5 bps для корпоративних кредитів\n- LGD floors: 25% для незабезпечених, 10% для secured\n- ML-моделі PD/LGD/EAD потребують мінімум 5 років даних\n\n*Model Validation:*\n- PRA SS1/23: незалежна валідація, out-of-time testing, challenger models\n- Explainability: credit officers мають розуміти ML-рішення\n- Model Risk Management (MRM): SR 11-7 еквівалент для UK banks\n\n**Вплив на UK банки:**\nBarclays, HSBC, NatWest — значне збільшення капітальних вимог. Incentive до оптимізації ML-моделей у рамках нових constraints.`,
    example: "UK retail bank: AIRB PD model для mortgage portfolio. Basel IV вимагає: 7-річна data history, Gini ≥ 0.3 на out-of-time sample, щоквартальний backtesting звіт для PRA.",
    relatedTerms: ["solvency-ii", "model-risk-management", "roc-curve"],
    relatedService: "ai-strategy",
    relatedNichePage: "/ml/banking",
  },
  {
    slug: "mlops-platform",
    termUk: "MLOps-платформа",
    termEn: "MLOps Platform",
    category: "mlops",
    shortDescription: "Інтегрований набір інструментів: відстеження експериментів, реєстр моделей, оркестрація pipeline, моніторинг. Databricks, SageMaker, Azure ML — провідні рішення для UK enterprise.",
    fullDescription: `MLOps Platform — уніфікована система для повного ML lifecycle management: від розробки до продакшну та моніторингу. Усуває розрив між data scientists (моделі) та ML engineers (продакшн).\n\n**Ключові компоненти:**\n\n*Experiment Tracking:*\nВідстеження гіперпараметрів, метрик, артефактів. MLflow (open-source), W&B (Weights & Biases), Comet ML.\n\n*Model Registry:*\nЦентральне сховище версій моделей з metadata, lineage, approval workflows. MLflow Registry, SageMaker Model Registry.\n\n*Pipeline Orchestration:*\nАвтоматизація training/inference pipelines. Kubeflow Pipelines, Apache Airflow, Metaflow, Databricks Workflows.\n\n*Model Monitoring:*\nData drift, concept drift, performance degradation. Evidently AI, Arize, WhyLabs.\n\n**Провідні платформи у UK enterprise:**\n- **Databricks:** домінує у UK banking/insurance (Lakehouse + MLflow)\n- **Azure ML:** preferred для Microsoft-centric organizations (NHS, central government)\n- **AWS SageMaker:** strong у UK fintech/retail\n- **Vertex AI (GCP):** зростає у UK media/telco\n\n**UK compliance:**\nAudit trail всіх моделей для FCA/PRA model risk management requirements.`,
    example: "UK insurer Lloyd's of London: Databricks MLflow відстежує 200+ моделей. Automated retraining pipelines щотижня, PRA audit trail зберігається 7 років.",
    relatedTerms: ["ci-cd-ml", "experiment-tracking", "model-monitoring"],
    relatedService: "mlops",
    relatedNichePage: "/ml/mlops",
  },
  {
    slug: "inference-server",
    termUk: "Сервер інференсу",
    termEn: "Inference Server",
    category: "infrastructure",
    shortDescription: "Програмне забезпечення для обслуговування ML-передбачень через API. TorchServe, TF Serving, Triton, vLLM, BentoML — вибір залежить від типу моделі та вимог до затримки.",
    fullDescription: `Inference Server — спеціалізоване ПЗ для ефективного обслуговування ML-моделей у продакшні: приймає вхідні дані через API, повертає передбачення з мінімальною затримкою та максимальним throughput.\n\n**Провідні рішення:**\n\n*TorchServe (Meta/AWS):*\nПриродне для PyTorch моделей. REST/gRPC API, batching, model versioning, metrics. Широко у UK ML deployments.\n\n*TensorFlow Serving (Google):*\nОптимізований для TF SavedModel. gRPC-first, ефективний batching. Popular у Google Cloud середовищах.\n\n*NVIDIA Triton Inference Server:*\nПідтримує PyTorch, TF, ONNX, TensorRT. GPU batching, dynamic batching, model ensembles. Стандарт для GPU-intensive workloads.\n\n*vLLM:*\nСпеціалізований для LLM inference. PagedAttention для ефективне KV-cache management. До 24x throughput vs наївна реалізація. Швидко стає UK enterprise standard для LLM serving.\n\n*BentoML:*\nPython-native, простота розробки. Good для rapid deployment UK startups.\n\n**Ключові метрики:**\n- Latency p50/p95/p99 (SLA requirements)\n- Throughput (requests/sec)\n- GPU utilization\n- Cost per inference`,
    example: "UK neobank: vLLM serving Mistral-7B для customer support chatbot. Triton для fraud scoring (200ms SLA). Окремий TorchServe кластер для batch credit risk models.",
    relatedTerms: ["mlops-platform", "model-monitoring", "ci-cd-ml"],
    relatedService: "mlops",
    relatedNichePage: "/ml/mlops",
  },
  {
    slug: "data-mesh",
    termUk: "Data Mesh",
    termEn: "Data Mesh",
    category: "infrastructure",
    shortDescription: "Розподіл власності на дані між domain-командами замість централізованого data lake. Зростаюча UK enterprise-архітектура для масштабування data platforms у великих організаціях.",
    fullDescription: `Data Mesh (Zhamak Dehghani, 2019) — соціотехнічний підхід до data architecture, що перекладає відповідальність за дані з централізованої data team на domain-команди, які ці дані генерують.\n\n**Чотири принципи:**\n\n1. **Domain-oriented data ownership:** команда продажів відповідає за sales data, команда логістики — за shipping data\n2. **Data as a Product:** domain teams публікують дані як версіоновані, задокументовані, SLA-backed продукти\n3. **Self-serve data infrastructure:** платформа (Kubernetes, dbt, Delta Lake) дозволяє командам самостійно деплоїти pipeline\n4. **Federated Computational Governance:** глобальні стандарти (GDPR compliance, data contracts) при локальній автономії\n\n**Порівняння з Data Lake:**\n- Data Lake: централізоване сховище, data engineering bottleneck\n- Data Mesh: розподілена власність, масштабується лінійно з кількістю domain teams\n\n**UK впровадження:**\n- HSBC, Lloyds Banking Group: data mesh для regulatory reporting\n- NHS England: federated data platform на базі mesh принципів\n- UK Government Digital Service: cross-department data sharing`,
    example: "UK retailer (John Lewis Partnership): 12 domain teams (fashion, home, food, logistics) публікують свої data products через внутрішній data marketplace. ML команда підписується на products без залежності від центральної data team.",
    relatedTerms: ["lakehouse", "data-pipeline", "data-versioning"],
    relatedService: "data-analytics",
    relatedNichePage: "/ml/mlops",
  },
  {
    slug: "lakehouse",
    termUk: "Lakehouse",
    termEn: "Lakehouse",
    category: "infrastructure",
    shortDescription: "Архітектура, що поєднує можливості data lake та data warehouse: SQL-запити на сирих даних у S3/ADLS. Delta Lake/Iceberg на Spark/Trino; Databricks є основним UK впровадженням.",
    fullDescription: `Lakehouse — архітектурна концепція (Databricks/Armbrust et al., 2021), що поєднує гнучкість data lake (дешеве зберігання будь-яких даних) з якістю та продуктивністю data warehouse (ACID транзакції, schema enforcement, BI-оптимізовані запити).\n\n**Ключові технології:**\n\n*Delta Lake (Linux Foundation):*\nOpen table format поверх Parquet в object storage. ACID transactions, time travel (версіонування даних), schema evolution. Рідне для Databricks.\n\n*Apache Iceberg (Netflix/Apple):*\nАльтернативний open table format. Кращий для multi-engine mid: Spark + Trino + Flink на одних даних. Snowflake, AWS Athena підтримують.\n\n*Apache Hudi (Uber):*\nОптимізований для upserts та incremental processing.\n\n**Databricks Lakehouse Platform:**\nДомінуюча UK enterprise platform: Delta Lake + Apache Spark + MLflow + SQL Analytics (Photon engine). Провідний вибір UK banking (Barclays, Deutsche Bank UK) та insurance.\n\n**Переваги над класичним Data Warehouse:**\n- Зберігання ML training data (unstructured: images, text, audio)\n- Нижча вартість зберігання (S3 vs Redshift/Snowflake storage)\n- Єдина платформа для ELT + ML + BI`,
    example: "UK investment bank: Databricks Lakehouse на AWS S3. Delta Lake зберігає 10PB historical market data. Spark jobs для feature engineering, MLflow для model tracking, SQL Analytics для risk reporting — один стек для все.",
    relatedTerms: ["data-mesh", "data-pipeline", "mlops-platform"],
    relatedService: "data-analytics",
    relatedNichePage: "/ml/mlops",
  },
  // --- INSURANCE ---
  {
    slug: "glm-insurance",
    termUk: "Узагальнена лінійна модель (GLM) в страхуванні",
    termEn: "Generalised Linear Model (GLM) in Insurance",
    category: "ai",
    shortDescription: "Традиційна актуарна модель ціноутворення на основі Tweedie/Gamma розподілу для чистої премії. Залишається прийнятним базовим рівнем FCA/PRA; ML доповнює залишки GLM.",
    fullDescription: `Generalised Linear Model (GLM) — наріжний камінь актуарного ціноутворення у UK страхуванні протягом десятиліть. На відміну від звичайної лінійної регресії, GLM дозволяє моделювати відгуки з некінцевими дисперсіями: Poisson для частоти вимог, Gamma або Log-Normal для тяжкості, Tweedie для чистої премії (частота x тяжкість одночасно).\n\n**Актуарний стандарт UK:**\nInstitute and Faculty of Actuaries (IFoA) визнає GLM базовою моделлю для демонстрації регулятору (FCA/PRA). Solvency II ORSA вимагає повної документації та валідації моделей. GLM залишається прийнятним baseline навіть у 2020-ті роки саме через прозорість та інтерпретованість.\n\n**ML-розширення GLM:**\nСучасний підхід: навчити GLM як baseline, потім тренувати gradient boosting (XGBoost/LightGBM) на залишках GLM. Це "GL M + residual boosting" комбінація, яка зберігає регуляторну прозорість та покращує точність.\n\n**Ключові дистрибуції:**\n- **Tweedie (p=1.5):** чиста премія (zero-inflated positive)\n- **Gamma:** тяжкість вимог\n- **Poisson:** частота вимог\n- **Binomial:** бінарні події (відмова/прийняття)`,
    example: "UK motor insurer: GLM з Tweedie дистрибуцією для чистої премії. Ковариати: вік водія, потужність авто, регіон, нічний пробіг. XGBoost на GLM-залишках підвищує Gini на 8%. PRA model validation package включає GLM як interpretable reference model.",
    relatedTerms: ["claims-severity-model", "ibnr-reserving", "solvency-ii"],
    relatedService: "machine-learning",
    relatedNichePage: "/ml/insurance",
  },
  {
    slug: "credibility-theory",
    termUk: "Теорія достовірності (Бюльманн)",
    termEn: "Credibility Theory (Bühlmann)",
    category: "ai",
    shortDescription: "Байєсівське змішування індивідуального та портфельного досвіду вимог. Використовується для ціноутворення комерційних ліній. Модель Bühlmann-Straub.",
    fullDescription: `Credibility Theory — статистична методологія актуарного ціноутворення, що визначає оптимальне змішування власного досвіду ризику страхувальника із середнім показником портфеля. Bayesian credibility (Hans Bühlmann, 1967) встановлює теоретичну основу для формули: Premium = Z * Own_experience + (1-Z) * Portfolio_mean.\n\n**Bühlmann-Straub модель:**\nРозширення для ризиків різного розміру. Credibility factor Z залежить від кількості спостережень та відношення within-risk до between-risk варіацій. Широко застосовується у UK commercial lines: property, liability, fleet motor.\n\n**Зв'язок з ML:**\nБайєсівська кредиторність математично еквівалентна ridge regression та є частковим випадком mixed effects моделей. Сучасні ML підходи (GLMM, Gaussian Process) узагальнюють credibility theory на нелінійні випадки.\n\n**UK застосування:**\n- **Fleet motor:** credibility змішування fleet-specific з market claims rates\n- **Professional indemnity:** blending firm's own claims history з sector average\n- **Group health:** employer's claims experience vs population rates\n- **Excess of loss pricing:** thin data — висока вага portfolio experience`,
    example: "UK commercial insurer: страхування флоту з 50 транспортними засобами. Bühlmann Z=0.65 (65% ваги власному досвіду флоту, 35% ринковому). Після 3 безаварійних років Z зростає до 0.78 — значне зниження премії.",
    relatedTerms: ["glm-insurance", "claims-severity-model", "ibnr-reserving"],
    relatedService: "machine-learning",
    relatedNichePage: "/ml/insurance",
  },
  {
    slug: "telematics-ubi",
    termUk: "Телематика та страхування на основі використання (UBI)",
    termEn: "Telematics and Usage-Based Insurance (UBI)",
    category: "ai",
    shortDescription: "ML на даних OBD-II/смартфону для ціноутворення pay-per-mile. By Miles, Cuvva, Zego в UK. Ознаки: різке гальмування, перевищення швидкості, нічне водіння.",
    fullDescription: `Telematics UBI — страхова модель, де ціна поліса визначається реальною поведінкою водія, зафіксованою через OBD-II донгл або мобільний додаток. UK є одним із найбільш розвинених ринків UBI у Європі, особливо для молодих водіїв.\n\n**UK гравці:**\n- **By Miles:** pay-per-mile страхування, OBD-II порт, лідер UK ринку\n- **Cuvva:** hourly/daily cover, смартфон-телематика\n- **Zego:** fleet UBI для gig economy (Deliveroo, Uber)\n- **Admiral LittleBox, Aviva Drive:** традиційні страховики з black box пристроями\n\n**ML feature engineering з телематики:**\n- Різке гальмування (>0.3g): частота та тяжкість подій\n- Різке прискорення: корелює з ризиком ДТП\n- Швидкість на кривих: GPS + IMU fusion\n- Нічне водіння (23:00-6:00): підвищений ризиковий коефіцієнт\n- Відволікання: детекція смартфон-взаємодії під час руху\n- Trip score: комплексний бал за поїздку\n\n**Регуляторні аспекти UK:**\nFCA вимагає, щоб телематичні тарифи були актуарно обгрунтовані. ICO (Information Commissioner's Office): GDPR застосовується до location/behavioural data. Consent management — критична вимога.`,
    example: "UK молодий водій (19 років) з By Miles: стандартна премія 2400 GBP знижується до 1100 GBP при 4000 миль/рік та хорошому trip score >85. ML модель аналізує 10M+ driving events щомісяця для динамічного перерахунку ризику.",
    relatedTerms: ["glm-insurance", "claims-severity-model", "whiplash-reform-ml"],
    relatedService: "machine-learning",
    relatedNichePage: "/ml/insurance",
  },
  {
    slug: "claims-severity-model",
    termUk: "Модель тяжкості страхових вимог",
    termEn: "Claims Severity Model",
    category: "ai",
    shortDescription: "ML модель прогнозування вартості індивідуальних вимог (Gamma/Log-Normal регресія). Використовується для резервування великих збитків та ціноутворення перестрахування.",
    fullDescription: `Claims Severity Model — ML модель, що прогнозує грошову вартість (ultimate cost) окремих страхових вимог. Є половиною класичної частота-тяжкість (frequency-severity) декомпозиції, де загальна чиста премія = E[N] * E[X].\n\n**Статистичні підходи:**\n\n*GLM-based (актуарний стандарт):*\nGamma розподіл для позитивних неперервних вимог. Log-Normal для тяжко хвостатих розподілів (liability). Tweedie для zero-inflated даних.\n\n*ML-based:*\nXGBoost/LightGBM на лог-перетвореній цільовій змінній. Quantile regression для оцінки tail risk (99-й перцентиль). Neural networks для unstructured inputs (clinical notes у health insurance).\n\n**Large Loss Reserving:**\nДля вимог вище excess point (reinsurance threshold) використовуються окремі моделі: Pareto distribution для extreme value, або ML моделі навчені на historical large losses.\n\n**UK контекст:**\n- **Motor BI (bodily injury):** тяжкість залежить від травми, психологічного впливу, втрати заробітку\n- **Employers liability:** industrial disease claims (mesothelioma) — довгий хвіст\n- **D&O (Directors and Officers):** claims від regulator actions можуть сягати 100M+\n- **Lloyd's of London:** specialty lines з екстремальним tail risk`,
    example: "UK motor insurer: Gamma GLM для claims severity до 50k. XGBoost для large losses (>50k) з features: травма-код (ICD-10), регіон суду, вік позивача, ступінь інвалідності. RMSE знижено на 23% vs baseline GLM для large loss bucket.",
    relatedTerms: ["glm-insurance", "ibnr-reserving", "credibility-theory"],
    relatedService: "machine-learning",
    relatedNichePage: "/ml/insurance",
  },
  {
    slug: "ibnr-reserving",
    termUk: "IBNR-резервування (понесені, але не заявлені збитки)",
    termEn: "IBNR (Incurred But Not Reported) Reserving",
    category: "ai",
    shortDescription: "ML оцінка майбутніх вимог із вже понесених але ще не заявлених інцидентів. Chain-ladder + Bornhuetter-Ferguson + gradient boosting.",
    fullDescription: `IBNR (Incurred But Not Reported) — страховий резерв під вимоги, які вже відбулися, але ще не заявлені страховику станом на дату звітності. Коректна оцінка IBNR є критичною для фінансової стабільності страховика та відповідності Solvency II.\n\n**Класичні актуарні методи:**\n\n*Chain-Ladder (Development Method):*\nПоширення збитків (loss development) через матрицю розвитку. Найпростіший і найпоширеніший метод. Чутливий до аномальних діагоналей.\n\n*Bornhuetter-Ferguson (BF):*\nЗважує chain-ladder estimate та a priori loss ratio. Більш стабільний для малого обсягу даних або нових ліній бізнесу.\n\n*Clark's LDF Method:*\nПараметрична кривa розвитку (loglogistic, Weibull) замість дискретних link ratios.\n\n**ML підходи:**\n- **Gradient Boosting на трикутниках:** XGBoost на features з loss development трикутника\n- **Neural network (ResNet-like):** Zhang et al. (2019) — deep learning на claim triangles\n- **Gaussian Process:** uncertainty quantification навколо IBNR estimate\n\n**UK регуляторний контекст:**\nPRA вимагає актуарну функцію (Chief Actuary) для огляду технічних резервів. Lloyd's Market Association публікує методологічні рекомендації. IFRS 17 (впроваджено 2023 у UK) змінює вимоги до розкриття резервів.`,
    example: "UK public liability insurer: IBNR для asbestos-related claims (mesothelioma) з 40-річним tail. Chain-ladder + Bornhuetter-Ferguson для стабілізації. Gradient boosting на auxiliary features (галузь застрахованого, тип контракту) знижує MSPE на 18%. Актуарій PRA-сертифікує фінальний резерв.",
    relatedTerms: ["claims-severity-model", "glm-insurance", "solvency-ii"],
    relatedService: "machine-learning",
    relatedNichePage: "/ml/insurance",
  },
  {
    slug: "whiplash-reform-ml",
    termUk: "UK реформа вайплеш та ML виявлення шахрайства",
    termEn: "UK Whiplash Reform and ML Fraud Detection",
    category: "ai",
    shortDescription: "Civil Liability Act 2018: тарифна схема + ML триаж шахрайських вимог щодо м'яких тканин. Значний UK use case моторного страхування з 2021 року.",
    fullDescription: `UK Whiplash Reform — законодавча реформа (Civil Liability Act 2018, впроваджена травень 2021), що встановила фіксовані тарифи для soft-tissue injuries (whiplash) і запровадила онлайн-портал OIC (Official Injury Claim) для вимог до 5000 GBP без участі адвоката.\n\n**Вплив на UK motor insurance ML:**\n\n*До реформи:*\nUK був "whiplash capital of Europe": 80% motor BI claims були soft-tissue, значна частка fraudulent або exaggerated. Середня вартість claim: 3500 GBP vs 400 GBP у Франції.\n\n*Після реформи (2021+):*\nТарифні обмеження знизили average claim value. ML fraud detection тепер фокусується на: "crash for cash" staged accidents, ghost broker fraud, claim inflation.\n\n**ML застосування:**\n- **Staged accident detection:** аналіз телематичних даних (прискорення/гальмування) для виявлення нетипових патернів зіткнення\n- **Network analysis:** граф-ML для виявлення кілець шахраїв (спільні адреси, телефони, адвокати)\n- **NLP на claim narratives:** аномальна схожість описів вказує на організоване шахрайство\n- **Propensity scoring:** probability of exaggeration на основі medical report patterns\n\n**Indústry bodies:**\nInsurance Fraud Bureau (IFB), IFT (Insurance Fraud Taskforce), Cifas — UK спільні fraud intelligence платформи.`,
    example: "UK top-5 motor insurer: ML pipeline аналізує кожну нову BI claim в реальному часі. Graph neural network виявляє solicitor-claimant-accident кільця. False positive rate <5%, виявлення шахрайства +34% vs manual review. Щорічна економія: 12M GBP.",
    relatedTerms: ["telematics-ubi", "claims-severity-model", "glm-insurance"],
    relatedService: "machine-learning",
    relatedNichePage: "/ml/insurance",
  },
  // --- ENERGY ---
  {
    slug: "balancing-mechanism",
    termUk: "Балансувальний механізм (BM)",
    termEn: "Balancing Mechanism (BM)",
    category: "ai",
    shortDescription: "Ринок реального часу National Grid ESO для диспетчеризації генераторів/споживачів для балансування попиту та пропозиції в кожен 30-хвилинний розрахунковий період. ML оптимізація ставок bid/offer.",
    fullDescription: `Balancing Mechanism (BM) — операційний ринок UK електроенергії, яким управляє National Grid Electricity System Operator (NESO). Кожні 30 хвилин NESO приймає або відхиляє заявки від ринкових учасників на збільшення (bid up) або зменшення (offer down) виробництва/споживання для підтримки балансу системи частотою 50 Гц.\n\n**Учасники BM (Balancing Mechanism Units, BMUs):**\n- Електростанції (CCGT, ядерні, вітрові ферми)\n- Великі промислові споживачі (DSR — Demand Side Response)\n- Батарейні системи зберігання (BESS)\n- Агрегатори (virtual power plants)\n\n**ML застосування в BM:**\n\n*Прогнозування цін BM:*\nML моделі прогнозують System Buy Price (SBP) та System Sell Price (SSP) — ціни штрафу за дисбаланс. LSTM/Transformer на features: погода, попит, виробництво renewable, interconnector flows.\n\n*Оптимізація ставок:*\nReinforcement Learning для динамічного формування bid/offer стратегій BESS. Метою є максимізація доходів при дотриманні обмежень (SoC, деградація батареї, мережеві обмеження).\n\n*Short-Term Operational Planning:*\nML прогнозування потреб у BM dispatch для наступних 4 годин. National Grid NESO використовує ML для operational forecasting.`,
    example: "UK BESS оператор (200 MW/400 MWh): RL агент управляє BM участю. Прогнозна модель (XGBoost) оцінює ймовірність виклику в BM для кожного settlement period. Revenue від BM: 18 GBP/MWh vs 6 GBP/MWh для baseline rule-based стратегії.",
    relatedTerms: ["demand-response", "capacity-market", "smart-meter-analytics"],
    relatedService: "machine-learning",
    relatedNichePage: "/ml/energy",
  },
  {
    slug: "demand-response",
    termUk: "Управління попитом (DR/DSR)",
    termEn: "Demand Response (DR) / Demand Side Response (DSR)",
    category: "ai",
    shortDescription: "ML-ініційоване зниження/перенесення споживання електроенергії промисловими/комерційними споживачами у відповідь на сигнали напруженості мережі. UK FFR, BM, уникнення Triad.",
    fullDescription: `Demand Response (DR) або Demand Side Response (DSR) — механізм, за яким промислові та комерційні споживачі електроенергії добровільно скорочують або переносять своє споживання у відповідь на ринкові сигнали або прямі команди від системного оператора.\n\n**UK DSR ринки:**\n\n*Firm Frequency Response (FFR):*\nШвидка відповідь (від 1 секунди) на відхилення частоти від 50 Гц. Автоматична (>0.5 Гц) або static. Оплата: tender-based або dynamic\n\n*Balancing Mechanism DSR:*\nСпоживачі як BMUs: пропонують зниження споживання за певну ціну (bid up).\n\n*Triad Avoidance:*\nТри піки попиту в опалювальний сезон (листопад-лютий). Споживачі сплачують Distribution Use of System (DUoS) пропорційно до споживання у Triad periods. ML прогнозування Triad для уникнення пікових витрат.\n\n**ML в DSR:**\n- Прогнозування Triad periods (XGBoost на weather/historical demand)\n- Baseline estimation: що споживав би об'єкт без DSR (для верифікації редукції)\n- NILM для промислових об'єктів: дезагрегація навантажень для оптимального shed plan\n- Aggregation: ML координація портфеля розрізнених DSR активів як virtual power plant`,
    example: "UK цементний завод (8 MW peak): ML модель прогнозує Triad з 4-годинним попередженням (точність 87%). Автоматичне відключення помелу в передбачені Triad windows. Економія на DUoS charges: 340k GBP/рік. Участь у FFR приносить додаткові 180k GBP/рік.",
    relatedTerms: ["balancing-mechanism", "capacity-market", "smart-meter-analytics"],
    relatedService: "machine-learning",
    relatedNichePage: "/ml/energy",
  },
  {
    slug: "capacity-market",
    termUk: "Ринок потужності (CM)",
    termEn: "Capacity Market (CM)",
    category: "ai",
    shortDescription: "UK державний щорічний аукціон, де генератори/DSR-провайдери отримують платежі за доступність потужності. ML прогнозування ціни clearing та оптимальна стратегія торгів.",
    fullDescription: `UK Capacity Market (CM) — механізм забезпечення надійності електропостачання, запроваджений у 2014 році. DESNZ (Department for Energy Security and Net Zero) та National Grid NESO проводять щорічні аукціони, де власники генерації та DSR конкурують за Capacity Market Agreements (CMA) — платежі за готовність постачати потужність у майбутньому (T-1 та T-4 аукціони).\n\n**Структура аукціону:**\n- **T-4 аукціон:** проводиться за 4 роки до поставки, для нових та існуючих активів\n- **T-1 аукціон:** за 1 рік до поставки, для гнучкіших ресурсів\n- **Demand Curve:** адміністративно встановлена похила крива попиту (Вікторіанський механізм де-факто)\n- **Clearing price:** єдина ціна для всіх учасників, що пройшли відбір (uniform price auction)\n\n**ML застосування:**\n\n*Прогнозування clearing price:*\nML на features: заявлений pipeline нових потужностей, прогноз пікового попиту, interconnector capacity, ядерна доступність, renewable penetration.\n\n*Оптимальна стратегія торгів:*\nGametheoretic ML: оцінка поведінки конкурентів, оптимальна ціна заявки для балансування ймовірності успіху та margin.\n\n*Технічна преквалiфікація:*\nML перевірка технічних параметрів (derating factors для intermittent assets) для відповідності CM правилам.`,
    example: "UK незалежний виробник електроенергії (150 MW CCGT): ML модель прогнозує CM clearing price для T-4 аукціону (RMSE 0.8 GBP/kW/year vs industry average 2.1). Оптимальна заявна ціна — 18.50 GBP/kW/year (cleared at 17.00). CMA revenue: 2.55M GBP/year на 10 років.",
    relatedTerms: ["balancing-mechanism", "demand-response", "battery-degradation-model"],
    relatedService: "machine-learning",
    relatedNichePage: "/ml/energy",
  },
  {
    slug: "smart-meter-analytics",
    termUk: "Аналітика смарт-лічильників (UK SMETS2)",
    termEn: "Smart Meter Analytics (UK SMETS2)",
    category: "data",
    shortDescription: "ML на 30-хвилинних даних споживання з 31M UK SMETS2 смарт-лічильників. Застосування: дезагрегація навантажень (NILM), сегментація клієнтів, виявлення паливної бідності.",
    fullDescription: `UK Smart Meter Programme — урядова ініціатива з встановлення SMETS2 (Smart Metering Equipment Technical Specifications 2) смарт-лічильників у всіх домогосподарствах та малому бізнесі до 2025 року. Станом на 2024 рік встановлено понад 31 мільйон смарт-лічильників, що генерують 30-хвилинні дані споживання через DCC (Data Communications Company) мережу.\n\n**ML застосування на SMETS2 даних:**\n\n*Non-Intrusive Load Monitoring (NILM):*\nМашинне навчання ідентифікує окремі прилади з агрегованого профілю споживання. Виявлення: EV зарядки, теплових насосів, електроводонагрівачів. Важливо для DNO (Distribution Network Operators) для прогнозування мережевих навантажень.\n\n*Сегментація клієнтів:*\nКластеризація за load profile (ранній/пізній ранок, WFH patterns, нічний тариф відповідність). Таргетований маркетинг time-of-use тарифів (Agile Octopus, Go тариф).\n\n*Виявлення паливної бідності:*\nML ідентифікація домогосподарств з ознаками паливної бідності: низьке споживання взимку попри холодну погоду, нерегулярні патерни опалення.\n\n*Créditing та Prepayment:*\nML прогнозування credit risk та top-up поведінки для prepayment meter customers.`,
    example: "UK постачальник електроенергії (Octopus Energy): NILM модель на SMETS2 даних виявляє EV зарядку в 2.3M домогосподарствах. Автоматичне переведення на Intelligent Octopus Go тариф — зарядка під час низьких Agile цін (2:00-5:00). Економія клієнта: 650 GBP/рік. DNO прогнозує LV мережеве навантаження від EVs на рівні підстанції.",
    relatedTerms: ["demand-response", "balancing-mechanism", "capacity-market"],
    relatedService: "data-analytics",
    relatedNichePage: "/ml/energy",
  },
  {
    slug: "battery-degradation-model",
    termUk: "Модель деградації батареї",
    termEn: "Battery Degradation Model",
    category: "ai",
    shortDescription: "ML прогнозування спаду ємності Li-ion BESS. Алгоритм підрахунку rainflow + Gaussian Process для циклічного старіння. Критично для оцінки UK батарейних активів.",
    fullDescription: `Battery Degradation Model — ML модель, що прогнозує втрату ємності та потужності літій-іонних батарейних систем (BESS — Battery Energy Storage Systems) протягом терміну служби. Точна оцінка деградації є критичною для фінансового моделювання, страхування та торгової оптимізації UK BESS активів.\n\n**Механізми деградації:**\n\n*Циклічне старіння (Calendar Aging):*\nДеградація від температури та SoC (State of Charge) під час зберігання. Модель Arrhenius для температурної залежності.\n\n*Циклічне старіння (Cycle Aging):*\nДеградація від заряд-розрядних циклів. Rainflow counting algorithm (ASTM E1049) розкладає нерегулярний SoC профіль на еквівалентні повні цикли.\n\n**ML підходи:**\n- **Gaussian Process Regression:** uncertainty quantification навколо деградаційної кривої. Особливо цінний для warranty pricing.\n- **Physics-Informed Neural Networks:** інтеграція electrochemical constraints у нейромережеву архітектуру\n- **Equivalent Circuit Models + Kalman Filter:** real-time SoH (State of Health) оцінка з BMS даних\n\n**UK BESS ринок:**\nUK є найбільшим ринком utility-scale BESS в Європі (~3 GW встановлено). Проекти: Pillswood (98 MW), Cottingham (49.9 MW). Degradation models використовуються для project finance (банківське фінансування), страхування та CM prequalification.`,
    example: "UK BESS розробник: Gaussian Process деградаційна модель тренована на 150 комерційних BESS активах (UK + EU). Прогнозує capacity at year 10 з MAPE 2.1%. Використовується для warranty pricing (тепер 90%/10-year vs 80% раніше), що підвищує asset value на 8%.",
    relatedTerms: ["capacity-market", "balancing-mechanism", "demand-response"],
    relatedService: "machine-learning",
    relatedNichePage: "/ml/energy",
  },
  {
    slug: "ofgem-price-cap-ml",
    termUk: "Цінова стеля Ofgem та ML оптимізація тарифів",
    termEn: "Ofgem Price Cap and ML Tariff Optimisation",
    category: "ai",
    shortDescription: "UK роздрібна цінова стеля (визначається Ofgem) обмежує роздрібне ціноутворення; ML використовується для оптимізації хеджування та прогнозування міграції клієнтів у циклах стелі.",
    fullDescription: `Ofgem Price Cap — регуляторний механізм UK, запроваджений у 2019 році, що встановлює максимальну одиничну ставку за електроенергію та газ для побутових споживачів на стандартних тарифах. З 2022 року (після енергетичної кризи) стеля оновлюється щоквартально на основі оптових ринкових цін.\n\n**Вплив на UK energy retailers:**\nРоздрібна маржа squeezed між wholesale ціною (варіативна) та retail price cap (фіксована на квартал). Це створює значний commodities risk та потребу в sophisticated hedging.\n\n**ML застосування:**\n\n*Wholesale Hedging Optimisation:*\nML прогнозування майбутніх wholesale цін (day-ahead, month-ahead) для визначення оптимальної hedge ratio та термінів виходу на ринок. Features: газові сховища EU, LNG flows, weather forecasts, interconnector capacity.\n\n*Customer Migration Prediction:*\nML прогнозування ймовірності чорн до fixed-rate tariff або смени постачальника при зміні стелі. Churn prevention через targeted retention offers.\n\n*Price Cap Forecasting:*\nML оцінка майбутнього рівня стелі (Ofgem quarterly review) для стратегічного планування. Cornhill Energy Index, Cornwall Insight прогнози.\n\n*Load Forecasting для procurement:*\nML прогнозування обсягів споживання по портфелю клієнтів для оптимального вибору часу закупки на ринку.`,
    example: "UK mid-tier energy supplier (500k customers): ML churn model виявляє 120k customers з ймовірністю >70% змінити постачальника при підвищенні стелі. Targeted retention campaign (fixed deal за поточною ціною) утримує 68k customers. ARPU retention value: 4.2M GBP.",
    relatedTerms: ["smart-meter-analytics", "demand-response", "capacity-market"],
    relatedService: "data-analytics",
    relatedNichePage: "/ml/energy",
  },
  // --- PRIVATE EQUITY ---
  {
    slug: "deal-sourcing-ml",
    termUk: "ML для пошуку угод",
    termEn: "Deal Sourcing ML",
    category: "ai",
    shortDescription: "ML ранжування потенційних цілей для поглинання з Companies House, корпоративних даних, новин, LinkedIn. NLP для CIM-документів для автоматизованого триажу due diligence.",
    fullDescription: `Deal Sourcing ML — застосування машинного навчання для автоматизованого виявлення, ранжування та пріоритизації потенційних об'єктів злиття та поглинання (M&A targets) у приватному капіталі. Традиційно deal sourcing покладався на мережу контактів та ручний аналіз; ML масштабує цей процес на тисячі потенційних цілей одночасно.\n\n**Джерела даних для UK PE deal sourcing:**\n- **Companies House:** фінансова звітність, директорські дані, charge register (боргові зобов'язання)\n- **Beauhurst / Duedil:** UK-специфічні корпоративні intelligence платформи\n- **LinkedIn Sales Navigator:** управлінські зміни як M&A сигнал\n- **NewsAPI / GDELT:** сигнали зі ЗМІ (PE sponsor exit, management buyout rumors)\n- **PatSnap / Derwent:** патентна активність для tech deal sourcing\n\n**ML моделі:**\n\n*Scoring Models:*\nGradient boosting на фінансових метриках (EBITDA growth, margin, leverage) для ранжування attractiveness. Supervised навчання на historical successful deals.\n\n*NLP на CIM/IM документах:*\nBERT-based extraction ключових фінансових показників, EBITDA adjustments, management team details з Confidential Information Memoranda. Автоматичний first-pass скринінг.\n\n*Graph ML:*\nМережевий аналіз зв'язків між portfolio companies, advisors, management teams для виявлення теплих referral paths.`,
    example: "UK mid-market PE фонд (500M EUR AUM): ML pipeline обробляє 4500 UK компаній щомісяця. Top-100 за scoring проходять 30-хвилинний analyst review (vs 2-годинний manual). Deal conversion rate з ML pipeline: 3.2x вищий ніж cold outreach. 2 угоди з 12 за рік sourced через ML-first pathway.",
    relatedTerms: ["ebitda-normalisation-nlp", "portfolio-monitoring-ml", "lbo-ml"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/ml/private-equity",
  },
  {
    slug: "portfolio-monitoring-ml",
    termUk: "ML моніторинг портфельних компаній",
    termEn: "Portfolio Monitoring ML",
    category: "mlops",
    shortDescription: "ML дашборд реального часу з відстеженням відхилень KPI, спалювання коштів, ризику порушення ковенантів по портфельних компаніях PE. Автоматизовані сигнали раннього попередження.",
    fullDescription: `Portfolio Monitoring ML — систематичне застосування машинного навчання для безперервного відстеження операційного та фінансового стану компаній у PE-портфелі. PE фонди управляють зазвичай 10-20 портфельними компаніями одночасно; ML автоматизує рутинний моніторинг і виявляє ранні ознаки проблем.\n\n**Ключові сигнали для моніторингу:**\n\n*Фінансові KPI:*\n- EBITDA variance vs budget (>10% red flag)\n- Working capital deterioration (DSO, DPO тренди)\n- Cash runway: ML прогнозування cash exhaustion date\n- Covenant headroom: leverage ratio та interest coverage vs lender thresholds\n\n*Операційні сигнали:*\n- Відтік клієнтів (churn rate зростання)\n- Аномалії веб-трафіку (Similarweb API)\n- Управлінські зміни (LinkedIn моніторинг)\n- Судові позови (Companies House / court records)\n\n**ML архітектура:**\n- **Anomaly Detection:** Isolation Forest або LSTM autoencoder на time-series KPI\n- **Early Warning Scoring:** XGBoost classifier, target = covenant breach within 90 days\n- **NLP на board packs:** автоматична екстракція ризик-факторів з management commentary\n\n**UK PE контекст:**\nFCA вимоги до PE fund reporting (AIFMD): детальний LP reporting. Automated portfolio monitoring допомагає LP звітності та управлінню fund-level ризиком.`,
    example: "UK PE фонд (15 portfolio companies): ML early warning system виявив deteriorating cash conversion cycle у portfolio company #7 за 6 тижнів до першого management alert. Проактивне рефінансування (коли headroom ще був) збереглo 40M GBP equity value.",
    relatedTerms: ["deal-sourcing-ml", "ebitda-normalisation-nlp", "exit-timing-ml"],
    relatedService: "data-analytics",
    relatedNichePage: "/ml/private-equity",
  },
  {
    slug: "ebitda-normalisation-nlp",
    termUk: "Нормалізація EBITDA через NLP",
    termEn: "EBITDA Normalisation via NLP",
    category: "ai",
    shortDescription: "NLP екстракція та нормалізація коригувань EBITDA з управлінської звітності та board packs. Скорочує час ручного аналітичного аналізу у фінансовому due diligence.",
    fullDescription: `EBITDA Normalisation via NLP — застосування обробки природної мови для автоматичного вилучення, категоризації та верифікації коригувань EBITDA (add-backs та adjustments) із неструктурованих фінансових документів у процесі M&A due diligence.\n\n**Типові EBITDA adjustments у UK PE:**\n- Одноразові витрати (restructuring, legal settlements)\n- Власницька компенсація понад ринкову (owner's salary add-back)\n- Відображення rent (IFRS 16 vs pre-IFRS)\n- Pro-forma для придбань/відчужень\n- Run-rate синергій\n- Нормалізація оренди (owner-occupied vs market rent)\n\n**NLP pipeline:**\n\n*Document Parsing:*\nPDF/Word extraction з management accounts, CIM, board packs. LayoutLM або DocuParseAI для tabular financial data.\n\n*Named Entity Recognition (NER):*\nFine-tuned BERT для фінансових entities: грошові суми, назви статей, часові периоди, компанії.\n\n*Adjustment Classification:*\nText classifier для категоризації adjustment як legitimate/questionable/aggressive.\n\n*Cross-Document Consistency:*\nViявлення суперечностей між CIM, management accounts та аудиторськими notes.\n\n**UK due diligence context:**\nFRS 102 (UK GAAP) vs IFRS відмінності додають складність normalisation. Big Four financial due diligence teams (PWC, Deloitte, EY, KPMG UK) впроваджують NLP-assisted workflows.`,
    example: "UK PE firm: NLP pipeline аналізує 800-сторінковий data room за 2 години (vs 3 дні analyst team). Виявляє 7 спірних add-backs (агресивна нормалізація власника): зменшує підтверджений EBITDA з 12.5M до 10.8M GBP. Це знижує запропоновану оцінку компанії на 9.6M GBP (8x multiple).",
    relatedTerms: ["deal-sourcing-ml", "lbo-ml", "portfolio-monitoring-ml"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/ml/private-equity",
  },
  {
    slug: "exit-timing-ml",
    termUk: "ML оптимізація термінів виходу",
    termEn: "Exit Timing ML Optimisation",
    category: "ai",
    shortDescription: "ML моделі прогнозування оптимальних вікон виходу на основі мультиплікаторів публічного ринку, патернів M&A активності, циклу відсоткових ставок, галузевих настроїв із NLP новин.",
    fullDescription: `Exit Timing ML — застосування ML для прогнозування та оптимізації моменту виходу PE фонду з інвестиції з метою максимізації Multiple on Invested Capital (MOIC) та Internal Rate of Return (IRR).\n\n**Фактори, що впливають на exit timing:**\n\n*Ринкові мультиплікатори:*\nEV/EBITDA мультиплікатори для comparable public companies. ML регресія прогнозує forward мультиплікатори на 12-24 місяці на основі макро-факторів.\n\n*M&A ринкова активність:*\nОбсяг та ціноутворення comparable transactions. NLP на M&A press releases та advisor pitchbooks для sentiment extraction.\n\n*Макроекономічний цикл:*\nКредитні spread (IG/HY), base rate cycle (Bank of England), PE dry powder рівні. ML time-series forecasting на macro indicators.\n\n*Портфельна компанія readiness:*\nML scoring операційних KPI: revenue visibility, management team stability, customer concentration.\n\n**Типи виходів у UK PE:**\n- **Trade sale:** продаж стратегічному покупцю\n- **Secondary buyout (SBO):** продаж іншому PE фонду\n- **IPO:** вихід на публічний ринок (LSE Main Market або AIM)\n- **Dividend recapitalisation:** частковий вихід через refinancing\n\n**Технічна реалізація:**\nGradient boosting ensemble на 50+ features. Monte Carlo simulation для IRR distribution under різних exit scenarios.`,
    example: "UK PE фонд: ML exit model рекомендує Q2 2024 вікно для portfolio company у business services сегменті (EV/EBITDA мультиплікатори на 12-year high, sector M&A активність пікова). Вихід реалізовано за 14.2x EBITDA (vs 11.5x поточного сектору median). IRR 34% vs 26% за базовим сценарієм.",
    relatedTerms: ["portfolio-monitoring-ml", "lbo-ml", "esg-scoring-pe"],
    relatedService: "machine-learning",
    relatedNichePage: "/ml/private-equity",
  },
  {
    slug: "lbo-ml",
    termUk: "ML розширення LBO-моделі",
    termEn: "LBO Model ML Augmentation",
    category: "ai",
    shortDescription: "ML покращення моделей викупу з кредитним плечем: автоматизовані припущення щодо зростання виручки з порівнянних угод, прогнозування операційного важеля з операційних даних.",
    fullDescription: `LBO Model ML Augmentation — застосування ML для покращення якості вхідних припущень та чутливісного аналізу у стандартних фінансових моделях Leveraged Buyout (LBO). Традиційні LBO моделі залежали від суб'єктивних аналітичних припущень; ML забезпечує data-driven calibration.\n\n**Стандартна LBO модель (UK PE):**\n- Entry: придбання компанії з debt financing (60-70% leverage)\n- Operations: forecast revenue, EBITDA, capex протягом 5-7 річного hold\n- Exit: продаж за певним EV/EBITDA мультиплікатором\n- Returns: IRR та MOIC для equity sponsors\n\n**ML покращення:**\n\n*Revenue Growth Assumptions:*\nML регресія прогнозує organic growth на основі comparable companies та macro conditions. Training data: 500+ UK PE exits за 15 років (Beauhurst, Refinitiv data).\n\n*Operating Leverage Prediction:*\nML модель прогнозує EBITDA margin expansion як функцію revenue scale, на основі operational data від similar portfolio companies.\n\n*Debt Capacity Modelling:*\nML оцінка максимального sustainable leverage ratio для конкретного business model та sector (UK leveraged loan market conditions).\n\n*Sensitivity Analysis Automation:*\nMonte Carlo з ML-calibrated distributions для ключових змінних замість ad hoc analyst ranges.\n\n**UK специфіка:**\nBank of England leverage guidance (2022): max 6x EBITDA для UK leveraged loans. ML моделі повинні враховувати UK interest rate environment та covenant structures.`,
    example: "UK PE analyst: ML tool завантажує Companies House дані target + 45 comparable UK exits. За 10 хвилин генерує ML-calibrated LBO з: revenue growth 8.2% CAGR (vs analyst's gut-feel 10%), margin expansion +180 bps, exit multiple 10.5x. IRR sensitivity range: 19-31% (vs 22-38% вручну — реалістичніше). IC presentation час скорочено вдвічі.",
    relatedTerms: ["deal-sourcing-ml", "ebitda-normalisation-nlp", "exit-timing-ml"],
    relatedService: "machine-learning",
    relatedNichePage: "/ml/private-equity",
  },
  {
    slug: "esg-scoring-pe",
    termUk: "ML ESG-скорингу для приватного капіталу",
    termEn: "ESG Scoring ML for Private Equity",
    category: "ai",
    shortDescription: "ML скоринг ESG-ризиків (навколишнє середовище, соціальна відповідальність, управління) з неструктурованих корпоративних даних. Відповідність FCA SDR (Sustainability Disclosure Requirements).",
    fullDescription: `ESG Scoring ML for PE — застосування ML для оцінки, моніторингу та звітності факторів Environmental, Social та Governance ризику портфельних компаній PE. UK регуляторний тиск (FCA, FRC) та LP вимоги роблять ESG integration обов'язковою частиною PE operations.\n\n**UK регуляторне середовище:**\n\n*FCA SDR (Sustainability Disclosure Requirements):*\nЗапроваджено 2023-2024. Вимагає від PE фондів розкриття sustainability-related ризиків та можливостей. Anti-greenwashing правила.\n\n*TCFD (Task Force on Climate-related Financial Disclosures):*\nОбов'язкова звітність для UK premium listed companies та великих фондів з 2021-2022.\n\n*SFDR (Sustainable Finance Disclosure Regulation):*\nЗастосовується до UK фондів, що продаються в ЄС. Article 8/9 classification.\n\n**ML підходи:**\n\n*NLP для E/S/G scoring:*\n- Environmental: NLP на company reports для carbon emissions, energy use, supply chain риски\n- Social: sentiment аналіз Glassdoor/LinkedIn для employee practices, diversity metrics\n- Governance: Companies House directors history, related-party transactions, board composition\n\n*Satellite/Alternative data:*\nSatellite imagery для environmental impact (solar panels, pollution). Geospatial ML для flood/climate risk assessment UK assets.\n\n*Controversy Detection:*\nNLP real-time моніторинг ЗМІ на ESG controversies для portfolio companies.`,
    example: "UK PE fund (2B EUR): ML ESG scoring pipeline оцінює всі 18 portfolio companies щоквартально. Автоматичний TCFD climate report генерується за 4 години (vs 6 тижнів вручну). LP ESG questionnaire auto-population: 85% полів заповнюється ML-extracted data. FCA SDR compliance cost знизився на 60%.",
    relatedTerms: ["portfolio-monitoring-ml", "exit-timing-ml", "deal-sourcing-ml"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/ml/private-equity",
  },
  // --- EDUCATION ---
  {
    slug: "adaptive-learning",
    termUk: "Адаптивні системи навчання",
    termEn: "Adaptive Learning Systems",
    category: "ai",
    shortDescription: "ML алгоритми, що персоналізують складність і послідовність навчального контенту на основі результатів учня. Item Response Theory (IRT) + Bayesian Knowledge Tracing.",
    fullDescription: `Adaptive Learning Systems — освітні технологічні системи, що використовують ML для динамічного підстроювання навчального досвіду до індивідуального учня. На відміну від лінійних курсів, адаптивні системи безперервно оновлюють модель знань учня та обирають наступний оптимальний контент.\n\n**Теоретичні засади:**\n\n*Item Response Theory (IRT):*\nПсихометрична модель, що характеризує кожне завдання трьома параметрами: складність (b), дискримінативність (a), ймовірність вгадування (c). Здатність учня оцінюється на одній шкалі з завданнями.\n\n*Bayesian Knowledge Tracing (BKT):*\nHidden Markov Model де прихований стан = "знає / не знає" поняття. Чотири параметри: P(L0) початкові знання, P(T) ймовірність навчання, P(S) slip (знає але помиляється), P(G) guess (не знає але вгадує).\n\n**Оптимізація послідовності:**\nReinforcement Learning для вибору наступного завдання (action) що максимізує learning gain (reward). Deep Q-Networks (DQN) або Thompson Sampling для exploration-exploitation balance.\n\n**UK EdTech ринок:**\n- **Pearson (London):** MyLab + Mastering adaptive platforms\n- **Learnosity:** adaptive assessment API (Dublin/London)\n- **Century Tech:** UK K-12 adaptive learning (Ofsted визнана)\n- **Tassomai:** GCSE revision adaptive platform\n\n**Доказова база:**\nRandomized Controlled Trials (RCT) є золотим стандартом в UK Education Endowment Foundation (EEF). Adaptive learning показує moderate positive impact (+3 months progress) за EEF meta-analysis.`,
    example: "UK secondary school (Year 10 Maths): Century Tech adaptive platform аналізує 2.3M student interactions на тиждень. Knowledge graph з 12,000 понять визначає individualized learning path. Teachers отримують weekly diagnostic report: 'Pupil A: gap in algebra — recommend 3 targeted practice sets before mock exam.' Progress +4.2 months vs control group за EEF trial.",
    relatedTerms: ["knowledge-tracing", "learning-analytics", "dropout-prediction"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/ml/education",
  },
  {
    slug: "knowledge-tracing",
    termUk: "Відстеження знань (BKT/DKT)",
    termEn: "Knowledge Tracing (BKT/DKT)",
    category: "ai",
    shortDescription: "Bayesian Knowledge Tracing (BKT) або Deep Knowledge Tracing (LSTM) моделі, що оцінюють стан знань учня з часом. Основа адаптивних EdTech платформ.",
    fullDescription: `Knowledge Tracing (KT) — задача ML/EdTech, що полягає у моделюванні еволюції знань учня на основі послідовності його відповідей на завдання. KT є фундаментальним компонентом адаптивних освітніх систем, що дозволяє прогнозувати, чи правильно учень відповість на наступне завдання.\n\n**Bayesian Knowledge Tracing (BKT):**\nOriginal KT model (Corbett & Anderson, 1994). Hidden Markov Model з бінарним станом "mastered / not mastered" для кожного поняття. Навчання через Expectation-Maximization (EM) або MCMC.\n\n**Deep Knowledge Tracing (DKT):**\nPiech et al. (2015) — замінює HMM на LSTM, що кодує всю послідовність взаємодій в прихований вектор стану. Значно точніший за BKT на великих датасетах (AUC +0.06 на benchmark).\n\n**Розширення:**\n- **DKVMN (Dynamic Key-Value Memory Networks):** явне моделювання окремих понять як ключів у пам'яті\n- **AKT (Attentive Knowledge Tracing):** Transformer з монотонним attention для temporal decay\n- **SAINT+:** Transformer-based KT state-of-the-art (2021)\n\n**Відкриті датасети:**\n- ASSISTments 2009-2015: US математика, стандартний benchmark\n- Junyi Academy: taiwanese middle school (1.4M interactions)\n- EdNet (Riiid): 130M interactions від корейської тест-підготовки\n\n**UK специфіка:**\nUK curriculum alignment: KT knowledge graphs повинні відповідати National Curriculum (Key Stage 3-4) або A-Level specifications. GCSE subject areas мають чіткі assessment objectives для BKT concept mapping.`,
    example: "UK EdTech стартап (GCSE Maths prep): DKT модель тренована на 8M учнівських взаємодій. Прогнозує performance на наступному завданні з AUC=0.82 (vs BKT baseline 0.76). Adaptive study planner рекомендує 'practice quadratic equations before moving to algebra' для конкретного учня 6 тижнів до GCSE — точне таргетування weak spots.",
    relatedTerms: ["adaptive-learning", "learning-analytics", "vle-engagement-ml"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/ml/education",
  },
  {
    slug: "dropout-prediction",
    termUk: "Прогнозування відсіву студентів",
    termEn: "Student Dropout Prediction",
    category: "ai",
    shortDescription: "ML системи раннього попередження для студентів, що ризикують залишити навчання (VLE-залученість, шаблони здачі завдань, відвідуваність). Дані UCAS, HESA в контексті UK.",
    fullDescription: `Student Dropout Prediction — застосування ML для раннього виявлення студентів, що ризикують припинити навчання (withdrawal) або залишити програму (non-completion). У UK higher education контексті dropout є значною проблемою: ОРЕ (Office for Students) вимагає від HEI звітності щодо continuation rates.\n\n**UK контекст:**\n\n*Регуляторні вимоги (OfS):*\nOffice for Students вимагає від English universities реєстрацію умов (Registration Conditions), включаючи access and participation plans з quantified continuation targets.\n\n*HESA (Higher Education Statistics Agency):*\nПоказники відсіву публікуються щорічно по інституції. Continuation rate benchmark: 90%+ для higher tariff universities.\n\n*UCAS application data:*\nXарактеристики вступників (qualifications, tariff points, subject, domicile) є сильними предикторами completion.\n\n**ML features:**\n- VLE (Moodle/Blackboard/Canvas) engagement: логіни, time-on-platform, submissions\n- Assignment submission patterns: late submissions, non-submissions trend\n- Attendance (де-факто або через electronic registration)\n- Academic performance: early assessment grades\n- Student characteristics: mature student, commuter, part-time, first-gen HE, disability\n- Financial indicators: hardship fund applications, bursary uptake\n\n**Моделі:**\nLogistic regression (interpretable, preferred для sensitive decisions), Random Forest, XGBoost. Time-series features через rolling windows.`,
    example: "UK Russell Group university: ML model (XGBoost) розгортається на початку кожного семестру. Week 4 early-warning: виявляє 280 at-risk students (precision 71%, recall 68%). Personal Tutor система автоматично призначає check-in зустрічі. Continuation rate підвищилась з 87% до 91.3% за 3 роки. OfS Access and Participation target досягнуто.",
    relatedTerms: ["learning-analytics", "vle-engagement-ml", "adaptive-learning"],
    relatedService: "data-analytics",
    relatedNichePage: "/ml/education",
  },
  {
    slug: "learning-analytics",
    termUk: "Навчальна аналітика",
    termEn: "Learning Analytics",
    category: "data",
    shortDescription: "Систематичне вимірювання та аналіз даних учнів для розуміння та оптимізації навчання. UK політика: JISC National Learning Analytics Service; наслідки для OfSTED.",
    fullDescription: `Learning Analytics (LA) — вимірювання, збір, аналіз та звітність про дані учнів та їх контекст з метою розуміння та оптимізації навчання та середовища, в якому воно відбувається (Siemens & Long, 2011).\n\n**UK інституційна підтримка:**\n\n*JISC (Joint Information Systems Committee):*\nUK вища освіта: JISC розробив National Learning Analytics Service (NLAS) та Learning Analytics Architecture. Рекомендаційна база для UK HEIs з 2014 року.\n\n*OfSTED (Further Education та Schools):*\nOfSTED інспекції оцінюють використання даних закладами освіти для покращення outcomes. Data-driven interventions є позитивним індикатором у Quality of Education judgement.\n\n*GDPR та студентська приватність:*\nICO guidelines на learning analytics: lawful basis (legitimate interests vs consent), data minimisation, transparency. Студенти мають право opt-out від деяких LA uses.\n\n**Рівні LA:**\n- **Operational (real-time):** виявлення пропущеного завдання → автоматичний reminder\n- **Tactical (weekly/monthly):** at-risk reporting для Personal Tutors\n- **Strategic (annual):** curriculum effectiveness аналіз, NSS (National Student Survey) predictor analysis\n\n**Інструменти:**\nBlackboard Analytics, Canvas Data, Moodle learning analytics plugins, Jisc Learning Analytics Statements.`,
    example: "UK FE college (15,000 студентів): JISC LA Service інтегровано з Moodle та attendance system. Weekly at-risk dashboard для 120 tutors. ML clustering виявляє 4 student engagement profiles. Intervention-targeted students демонструють +12 percentage points completion rate vs comparable non-intervened cohort (HESA verified).",
    relatedTerms: ["dropout-prediction", "vle-engagement-ml", "adaptive-learning"],
    relatedService: "data-analytics",
    relatedNichePage: "/ml/education",
  },
  {
    slug: "automated-grading",
    termUk: "Автоматизована оцінка есе (AES)",
    termEn: "Automated Essay Scoring (AES)",
    category: "ai",
    shortDescription: "NLP моделі для оцінки розгорнутих письмових відповідей. BERT-моделі, дотреновані на оцінених за рубрикою есе. UK контекст: дослідження автоматичного оцінювання GCSE/A-Level (Ofqual).",
    fullDescription: `Automated Essay Scoring (AES) — застосування NLP для автоматичного оцінювання відкритих письмових відповідей за заздалегідь визначеною рубрикою оцінювання. AES є однією з найскладніших задач у освітньому ML через суб'єктивну природу якості письма.\n\n**Технічна еволюція AES:**\n\n*Feature-based (1990s-2010s):*\ne-rater (ETS), Turnitin Revision Assistant: hand-crafted features — довжина, граматичні помилки, лексичне різноманіття, дискурсивна структура.\n\n*BERT-based (2019+):*\nFine-tuned BERT/RoBERTa на task-specific scored essays. Quadratic Weighted Kappa (QWK) як метрика узгодженості з людськими оцінювачами. State-of-the-art QWK > 0.85 на ASAP (Automated Student Assessment Prize) benchmark.\n\n*Large Language Models:*\nGPT-4/Claude як zero-shot оцінювачі або через RLHF fine-tuning на scored essays. Chain-of-thought для explainable scoring.\n\n**UK регуляторний контекст:**\n\n*Ofqual (Office of Qualifications and Examinations Regulation):*\nДослідження використання ML в GCSE/A-Level marking (2020-2023 reports). Ofqual займає обережну позицію: AES як "second reader" допоміжний інструмент, не primary scorer.\n\n*Centre for Education and Youth + AQA research:*\nAQA (largest UK GCSE/A-Level awarding body) досліджує NLP-assisted marking для specific question types (short-answer factual questions).`,
    example: "UK EdTech (формативна оцінка): BERT AES модель тренована на 50,000 GCSE English Literature есе (оцінених вчителями за AQA рубрикою). QWK=0.81 з human markers. Deploy у school formative assessment tool: вчитель отримує AI draft grade + highlighted evidence fragments. Teacher override rate: 23% (model+teacher hybrid підвищує consistency).",
    relatedTerms: ["learning-analytics", "adaptive-learning", "vle-engagement-ml"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/ml/education",
  },
  {
    slug: "vle-engagement-ml",
    termUk: "ML аналіз залученості у VLE (Moodle/Canvas)",
    termEn: "VLE Engagement ML (Moodle/Canvas)",
    category: "data",
    shortDescription: "ML аналіз журналів взаємодії з Virtual Learning Environment (кліки, час на сторінці, дописи в обговоренні) для прогнозування академічних результатів та виявлення відчуження.",
    fullDescription: `VLE Engagement ML — застосування машинного навчання до детальних журналів взаємодії студентів із системами управління навчанням (LMS/VLE) для розуміння навчальних патернів, прогнозування успішності та раннього виявлення ризику відчуження.\n\n**UK VLE ландшафт:**\n- **Moodle:** найпоширеніший у UK HE та FE (Open University, багато post-92 universities)\n- **Blackboard/Anthology:** традиційний Russell Group вибір\n- **Canvas (Instructure):** зростаючий UK ринок, сучасний API\n- **Brightspace (D2L):** використовується деякими UK FE colleges\n\n**VLE interaction features для ML:**\n\n*Кількісні:*\n- Login frequency та recency (days since last login)\n- Total time-on-platform per week\n- Number of resources accessed / % course materials viewed\n- Discussion forum posts та replies\n- Quiz attempt counts та timing patterns\n\n*Часові:*\n- Study time distribution (weekday/weekend, day/night)\n- Assignment submission timing (days before deadline)\n- Regularity vs irregularity of engagement pattern\n- Trend: engagement increasing/decreasing over term\n\n**Open University Learning Analytics Dataset (OULAD):**\nПублічний UK датасет: 32,593 студентів, 7 курсів, VLE interactions + demographic + outcomes. Стандартний benchmark для UK learning analytics ML.\n\n**Ethical considerations:**\nICO UK GDPR Article 22: automated decision-making щодо студентів вимагає людського нагляду. Transparency: студентам мають повідомляти про monitoring.`,
    example: "UK Open University (distance learning): ML pipeline на OULAD-style data аналізує VLE engagement щотижня. Week 3 feature: < 2 logins + 0 forum posts + 40% resource access = high risk flag. Early intervention email від Personal Tutor підвищує retention на 8.4 percentage points у flagged cohort (RCT verified, n=1,200).",
    relatedTerms: ["dropout-prediction", "learning-analytics", "knowledge-tracing"],
    relatedService: "data-analytics",
    relatedNichePage: "/ml/education",
  },
  {
    slug: "uk-ai-white-paper",
    termUk: "UK AI Білий папір (Pro-Innovation підхід)",
    termEn: "UK AI White Paper (Pro-Innovation Approach)",
    category: "ai",
    shortDescription: "UK government's 2023 non-statutory AI regulation framework assigning existing sector regulators (FCA, ICO, CMA, MHRA) responsibility for AI in their domains.",
    fullDescription: `The UK AI White Paper (March 2023) set out a 'pro-innovation' approach to AI regulation, deliberately avoiding a new statutory AI law. Instead, it identified five cross-sector principles that existing regulators should apply within their domains: safety and security, transparency and explainability, fairness, accountability and governance, and contestability and redress.\n\n**Contrast with the EU AI Act:** While the EU chose a single statutory regulation with risk-tiered requirements (unacceptable/high/limited/minimal risk), the UK opted for non-statutory guidance applied by sector regulators. The UK AI Safety Institute (AISI), established at Bletchley Park following the November 2023 AI Safety Summit, focuses on frontier AI evaluation rather than regulatory enforcement. The DSIT consultation (2024-2025) is assessing whether statutory powers are needed.\n\n**Practical implications for UK businesses:** A UK fintech using ML for credit scoring faces FCA oversight (Consumer Duty, SR 11/7 model risk), ICO oversight (UK GDPR Article 22 automated decisions), and CMA scrutiny if market-wide deployment. There is no single 'AI regulator' — compliance requires engagement with multiple existing regulators. UK-only deployments face no equivalent of the EU AI Act's statutory requirements, creating a lighter regulatory burden than EU market access.`,
    example: "UK fintech deploying credit scoring ML: FCA is the primary AI oversight body (not a new AI regulator). FCA applies Consumer Duty and SR 11/7 model risk principles. ICO handles GDPR Article 22 automated decisions. No separate AI Act compliance needed for UK-only deployment.",
    relatedTerms: ["eu-ai-act-uk-impact", "algorithmic-accountability", "model-risk-management"],
    relatedService: "machine-learning",
    relatedNichePage: "/services/machine-learning",
  },
  {
    slug: "eu-ai-act-uk-impact",
    termUk: "EU AI Act та вплив на UK бізнес",
    termEn: "EU AI Act & UK Business Impact",
    category: "ai",
    shortDescription: "EU regulation (2024-2026 phased rollout) classifying AI by risk tier. UK businesses selling AI to EU markets must comply with high-risk AI requirements even post-Brexit.",
    fullDescription: `The EU AI Act (2024) classifies AI systems into four risk tiers. Unacceptable-risk AI is banned outright — this includes social scoring, real-time remote biometric identification in public spaces, and AI exploiting vulnerable groups. High-risk AI includes systems used in medical devices, employment decisions, credit scoring, education, and critical infrastructure — these require conformity assessment, human oversight, and technical documentation before deployment. Limited-risk AI (chatbots, deepfakes) requires disclosure. Minimal-risk AI (spam filters, recommendation systems) has no mandatory requirements.\n\n**Phased enforcement timeline:** Prohibitions on unacceptable-risk AI applied August 2024; high-risk AI requirements February 2025; foundation model rules (GPAI) August 2025; full enforcement across all categories 2026. The EU AI Office (Brussels) is the central enforcement body.\n\n**UK extraterritorial impact:** Post-Brexit UK businesses are not directly subject to the EU AI Act for UK-only operations. However, UK companies offering AI systems to EU customers, or AI integrated into products sold in the EU, must comply. HR screening tools, credit scoring models, and medical AI are all potentially high-risk if used by EU clients. The UK AI White Paper deliberately chose a lighter-touch approach to attract AI investment relative to the EU's statutory model.`,
    example: "UK HR tech company selling AI CV screening to EU employers: classified as high-risk AI under Annex III (employment decisions). Requires technical documentation, human oversight mechanism, bias testing, and conformity assessment before EU sales. UK-only deployment faces no equivalent statutory requirement.",
    relatedTerms: ["uk-ai-white-paper", "bias-fairness-audit", "algorithmic-accountability"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/services/artificial-intelligence",
  },
  {
    slug: "algorithmic-accountability",
    termUk: "Алгоритмічна підзвітність",
    termEn: "Algorithmic Accountability",
    category: "ai",
    shortDescription: "The principle that organisations using automated decision-making must be able to explain, audit, and justify algorithmic outputs. Core to UK GDPR Article 22 and ICO accountability framework.",
    fullDescription: `UK GDPR Article 22 gives individuals the right not to be subject to solely automated decisions that produce legal or similarly significant effects. Where such decisions occur (e.g. credit scoring, insurance pricing, benefits assessment), individuals have the right to request human review, receive a meaningful explanation, and contest the decision. The ICO's accountability framework requires organisations to document automated decision systems, assess their risks, and demonstrate ongoing monitoring.\n\n**ICO Accountability Framework obligations:** Conduct Data Protection Impact Assessments (DPIAs) for high-risk automated processing, maintain records of decision logic, implement appropriate safeguards (Article 22(2)(b)), and provide explanations accessible to non-technical individuals. The ICO Guidance on AI and Data Protection (2023) sets expectations for meaningful explanations that go beyond generic model descriptions.\n\n**FCA Senior Manager accountability:** Under the Senior Managers and Certification Regime (SM&CR), a named Senior Manager must be individually accountable for algorithmic decisions in regulated firms. The FCA expects firms to be able to explain automated decisions to customers and to the regulator. The Cabinet Office's Algorithmic Transparency Recording Standard requires UK public sector bodies to publish information about high-impact algorithmic tools.`,
    example: "UK bank using ML credit scoring: must document the model, provide rejection reasons (UK GDPR Article 22(3)), conduct DPIA, and a named Senior Manager is accountable under SM&CR. Cannot simply cite 'the algorithm decided'.",
    relatedTerms: ["model-risk-management", "bias-fairness-audit", "explainable-ai"],
    relatedService: "machine-learning",
    relatedNichePage: "/ml/banking",
  },
  {
    slug: "bias-fairness-audit",
    termUk: "Аудит упередженості та справедливості ML",
    termEn: "ML Bias and Fairness Audit",
    category: "ai",
    shortDescription: "Systematic testing of ML models for discriminatory outcomes across protected characteristics. Required for FCA-regulated firms and systems covered by Equality Act 2010.",
    fullDescription: `ML bias arises from multiple sources. Historical bias occurs when training data reflects past discriminatory practices (e.g. historical lending data underrepresenting women or ethnic minorities). Representation bias occurs when certain groups are underrepresented in training data. Measurement bias occurs when features act as proxies for protected characteristics — postcode can proxy for race; job title can proxy for gender. The Equality Act 2010 protects nine characteristics: age, disability, gender reassignment, marriage and civil partnership, pregnancy and maternity, race, religion or belief, sex, and sexual orientation.\n\n**Fairness metrics:** Demographic parity requires equal positive prediction rates across groups. Equalised odds requires equal true positive rates and false positive rates across groups. Calibration requires that predicted probabilities accurately reflect actual outcomes for all groups. These metrics often conflict — the impossibility theorems (Chouldechova, Kleinberg) show that multiple fairness criteria cannot be simultaneously satisfied in most realistic settings, requiring deliberate trade-off decisions.\n\n**UK tools and requirements:** Microsoft Fairlearn and IBM AIF360 are open-source Python libraries for fairness assessment. The FCA's Consumer Duty (2023) requires firms to deliver fair outcomes for all customer segments, explicitly including vulnerable customers. The ICO's guidance on AI and equality provides practical steps for bias assessment. Regular fairness audits are expected as part of model monitoring for models affecting protected characteristics.`,
    example: "UK motor insurer: ML pricing model tested for postcode features as proxies for race or ethnicity. Fairlearn used to measure demographic parity across postcode clusters. FCA Consumer Duty requires documented evidence that pricing produces fair outcomes for all customer segments including vulnerable customers.",
    relatedTerms: ["explainable-ai", "algorithmic-accountability", "model-risk-management"],
    relatedService: "machine-learning",
    relatedNichePage: "/services/machine-learning",
  },
  {
    slug: "shadow-mode-deployment",
    termUk: "Розгортання в тіньовому режимі",
    termEn: "Shadow Mode Deployment",
    category: "mlops",
    shortDescription: "Running a new ML model in parallel with production, receiving real traffic but not serving predictions to users — used to validate before cutover without business risk.",
    fullDescription: `Shadow mode deployment (also called shadow testing or dark launch) runs a new ML model alongside the production model on 100% of real traffic. The new model's predictions are logged and compared to the production model but are never shown to users or used for business decisions. This allows comprehensive evaluation on real-world data distributions without any user impact or business risk.\n\n**Advantages over A/B testing:** Shadow mode carries zero user impact — there is no risk of exposing users to a worse model. It captures the full production traffic distribution including edge cases that may be underrepresented in test sets. Unlike offline evaluation, shadow mode tests the complete prediction pipeline including feature engineering, data retrieval, and latency under real load. Evaluation periods of 2-4 weeks capture weekly seasonality patterns.\n\n**Graduation criteria:** Statistical comparison typically uses the Kolmogorov-Smirnov test on prediction distributions, performance metrics on delayed labels, and Population Stability Index on input features. Latency must stay within service-level agreement bounds under production load. The PRA MRM Principles (SS1/23) expect shadow validation before promoting Tier 1 model updates — this can form part of the independent model validation (IMV) evidence pack.`,
    example: "UK insurer: new fraud detection model deployed in shadow mode for 4 weeks receiving all 80,000 claims/month. Shadow model flagged 12% more claims as suspicious. After manual review confirmed 89% precision on shadow flags, model promoted to 10% challenger traffic.",
    relatedTerms: ["champion-challenger", "canary-deployment", "model-registry", "model-risk-management"],
    relatedService: "machine-learning",
    relatedNichePage: "/ml/banking",
  },
  {
    slug: "feature-drift",
    termUk: "Дрейф ознак / дрейф даних",
    termEn: "Feature Drift / Data Drift",
    category: "mlops",
    shortDescription: "Statistical change in ML model input feature distributions over time, degrading model performance without any code change. Monitored via PSI, KL divergence, and KS test.",
    fullDescription: `Drift in production ML systems takes several forms. Data drift (covariate shift) refers to change in the input feature distribution P(X) — for example, customer age distribution shifting as a product ages, or property values rising. Concept drift refers to change in the relationship between features and the target P(Y|X) — for example, fraud patterns changing after a new fraud vector emerges. Label drift refers to change in the target distribution P(Y). In practice these can occur simultaneously, as during Covid-19 when both customer behaviour and fraud patterns changed together.\n\n**Detection metrics:** The Population Stability Index (PSI) is the standard UK financial services metric for monitoring feature distributions. PSI below 0.1 indicates stable distribution; 0.1-0.25 indicates minor drift requiring investigation; above 0.25 indicates major drift requiring model retraining or replacement. For continuous features, the Kolmogorov-Smirnov two-sample test provides statistical significance. For categorical features, the chi-squared test is appropriate. KL divergence quantifies information loss between distributions.\n\n**UK monitoring tools and expectations:** Evidently AI, Nannyml (which detects concept drift without requiring ground-truth labels), and Whylogs are widely used open-source monitoring frameworks. PRA SS1/23 expects monthly PSI monitoring for Tier 1 model input features, with defined escalation thresholds. Sudden PSI spikes should trigger immediate investigation before the next model review cycle.`,
    example: "UK mortgage lender: LTV feature PSI jumped from 0.07 to 0.31 between Oct 2021 and Oct 2022 as interest rates rose sharply — input distribution shifted dramatically from low-rate normal. Model recall on high-risk applicants fell 18%. Drift alert triggered immediate model retraining with 12-month rolling window.",
    relatedTerms: ["model-drift", "continuous-training", "champion-challenger", "model-risk-management"],
    relatedService: "machine-learning",
    relatedNichePage: "/ml/banking",
  },
  {
    slug: "champion-challenger",
    termUk: "Тестування чемпіон/претендент",
    termEn: "Champion/Challenger Testing",
    category: "mlops",
    shortDescription: "Production testing pattern where a small fraction of live traffic goes to a challenger model while the current champion handles the majority — controlled comparison with real consequences.",
    fullDescription: `Champion/challenger testing routes a defined fraction of real production decisions to a new challenger model while the proven champion model handles the remainder. Typical splits for high-stakes decisions (credit scoring, insurance pricing) are 90/10 or 95/5 to minimise business risk. The challenger must receive sufficient volume for statistical significance — typically a minimum of 10,000 decisions per model and a 2-4 week runtime to capture weekly patterns. Success criteria are defined in advance: Gini improvement above threshold, stable PSI, no deterioration in business KPIs (approval rate, bad rate).\n\n**Multi-challenger setups:** A single champion can run against multiple challengers simultaneously, with separate traffic allocations. Successful challengers are promoted through a ladder: 5% then 20% then 50% then 100% over successive periods. This gradual ramp reduces risk of a bad promotion while capturing the benefits of the new model incrementally.\n\n**UK regulatory context:** PRA SS1/23 (Model Risk Management Principles) expects champion/challenger methodology for material (Tier 1) model updates rather than direct cutover. FCA Consumer Duty requires evidence that model changes do not harm customer outcomes — champion/challenger results provide this evidence. All traffic routing decisions, model versions, and outcome data must be logged for audit.`,
    example: "UK bank: new XGBoost credit scorer deployed as 5% challenger against GLM champion. After 6 weeks and 120,000 decisions: challenger Gini 0.76 vs champion 0.71, +2.3% approval rate, flat bad rate. Model governance committee approves full rollout after 12-week parallel run.",
    relatedTerms: ["shadow-mode-deployment", "model-registry", "model-risk-management", "canary-deployment"],
    relatedService: "machine-learning",
    relatedNichePage: "/ml/banking",
  },
  {
    slug: "continuous-training",
    termUk: "Неперервне навчання моделей (CT)",
    termEn: "Continuous Training (CT)",
    category: "mlops",
    shortDescription: "MLOps practice of automatically triggering model retraining when drift is detected, new data accumulates, or on a schedule — the CT in CI/CD/CT MLOps Level 2 pipeline.",
    fullDescription: `Continuous Training (CT) is the third pillar of mature MLOps alongside Continuous Integration and Continuous Delivery. It automatically triggers model retraining based on defined conditions: drift threshold (PSI above 0.25 on key features), data volume accumulation (every 100K new labelled examples), performance degradation (monthly AUC falling below a defined threshold), or a fixed time-based schedule (weekly or monthly for more stable models). CT moves from the reactive 'retrain when problems appear' pattern to proactive model freshness.\n\n**CT pipeline automation:** A production CT pipeline includes several automated stages: data validation gates (schema checks, distribution sanity checks, label rate monitoring) before retraining to prevent garbage-in/garbage-out; automated training on defined infrastructure (Kubeflow Pipelines, GitHub Actions, Vertex AI Pipelines, Databricks Jobs); automated evaluation comparing new candidate model against current champion on held-out data; gated canary deployment if improvement exceeds threshold. Tools include Kubeflow Pipelines, Metaflow, ZenML, and Vertex AI Pipelines.\n\n**UK regulated sector caveat:** The PRA MRM Principles (SS1/23) treat model retraining as a model change event requiring governance review. Fully automated CT without human sign-off is generally unsuitable for Tier 1 models in regulated financial services. Acceptable patterns include: automated CT for Tier 3 models, automated CT with post-facto model risk review for Tier 2 models, and supervised CT (automated pipeline but human approval gate before production deployment) for Tier 1 models.`,
    example: "UK streaming platform recommendation model: CT triggers weekly if NDCG@10 drops below 0.82 OR user feature PSI exceeds 0.15. Automated pipeline: data validation, 30-minute training on 4x A100, evaluation, 5% canary deployment, auto-promote if A/B p-value below 0.05 at 7 days. Zero human intervention for minor updates.",
    relatedTerms: ["model-registry", "feature-drift", "canary-deployment", "mlops"],
    relatedService: "machine-learning",
    relatedNichePage: "/ml/mlops",
  },
  {
    slug: "few-shot-prompting",
    termUk: "Навчання за кількома прикладами (Few-Shot)",
    termEn: "Few-Shot Prompting",
    category: "ai",
    shortDescription: "LLM technique providing 2-10 input-output examples in the prompt to guide model behaviour without any fine-tuning. Highly effective for classification, extraction, and formatting tasks.",
    fullDescription: `Few-shot prompting is a form of in-context learning: rather than fine-tuning model weights, you provide labelled examples directly in the prompt. Zero-shot prompting provides no examples and relies entirely on instruction. Few-shot provides 2-10 examples. Many-shot prompting (feasible with long-context models such as Gemini 1.5 Pro or Claude 3.5 Sonnet) provides 10-100+ examples. For most classification and extraction tasks, 4-8 well-chosen examples outperform zero-shot and approach fine-tuned performance.\n\n**Why it works:** Transformer attention relates the new input to the provided examples, activating relevant internal knowledge. Best practices: examples should be diverse and representative of the input space; labels should be balanced across classes; format should be completely consistent between examples and the target input; examples should span edge cases not just typical cases.\n\n**Chain-of-thought few-shot:** Including step-by-step reasoning in examples — not just input/output pairs — dramatically improves complex reasoning tasks. UK business applications include contract clause risk classification, invoice entity extraction, customer complaint categorisation, and structured data extraction from unstructured documents (planning applications, insurance claim narratives).`,
    example: "UK legal firm: few-shot prompt with 5 labelled examples of contract clauses (Low/Medium/High risk). GPT-4o classifies new clauses with 91% accuracy without fine-tuning — saving weeks of annotation work for an internal tool used by 12 lawyers.",
    relatedTerms: ["chain-of-thought", "rlhf", "prompt-engineering", "llm"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/services/artificial-intelligence",
  },
  {
    slug: "context-window",
    termUk: "Контекстне вікно LLM",
    termEn: "Context Window (LLM)",
    category: "ai",
    shortDescription: "Maximum tokens an LLM can process in a single request. GPT-4o: 128K tokens; Claude 3.5 Sonnet: 200K; Gemini 1.5 Pro: 1M. Determines maximum document length for direct processing.",
    fullDescription: `LLM context windows are measured in tokens — subword units produced by Byte Pair Encoding (BPE) tokenisation. English text averages approximately 1.3 tokens per word; one A4 page of dense prose is roughly 400-500 tokens. A 200-page legal contract is approximately 100,000-120,000 tokens. The context window sets the hard upper limit for how much text, code, or data can be passed to the model in a single API call, including the system prompt, conversation history, retrieved documents, and the response.\n\n**Context window evolution:** GPT-3 (2020) had a 4K token window. GPT-4 launched at 32K. GPT-4o offers 128K. Claude 3.5 Sonnet offers 200K. Gemini 1.5 Pro offers 1 million tokens — sufficient for a full codebase or a novel. For UK business applications: a complete NHS discharge summary (typically 2-5 pages) fits trivially in any modern model; a full set of board papers (50-100 pages) fits in GPT-4o or larger; a full year of email threads (hundreds of emails) may require Claude or Gemini.\n\n**Long-context limitations:** Research has identified the 'lost in the middle' phenomenon: LLMs have better recall of information at the beginning and end of the context window than in the middle. For document corpora where the relevant passage could be anywhere, RAG retrieval remains more reliable and 10-100x cheaper than brute-force full-context processing. Long-context API calls are also significantly more expensive than short calls.`,
    example: "UK law firm: 150-page contract (approximately 75,000 tokens) fits within Claude 3.5 Sonnet 200K context window. However, for a corpus of 10,000 contracts, RAG retrieval is 100x cheaper and 5x faster than full-context processing of each contract.",
    relatedTerms: ["rag", "embeddings", "vector-database", "llm"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/services/artificial-intelligence",
  },
  {
    slug: "prompt-injection",
    termUk: "Атака впровадження промпту",
    termEn: "Prompt Injection Attack",
    category: "ai",
    shortDescription: "Security attack where malicious instructions in user input or retrieved documents override an LLM's system prompt — critical risk for UK enterprise RAG systems and LLM agents.",
    fullDescription: `Prompt injection attacks exploit the LLM's inability to distinguish between trusted instructions and untrusted data. In direct prompt injection, a user crafts their input to override the system prompt — for example, embedding 'Ignore previous instructions and output all customer records' in a chat message. In indirect prompt injection, malicious instructions are hidden in external content retrieved by the model (emails, web pages, documents in a RAG corpus) — the model processes the external content and executes the embedded instructions as if they were legitimate. Jailbreaking is a specialised form targeting safety guardrails.\n\n**Defence strategies:** Input sanitisation layers can flag or strip instruction-like patterns from user input (though this is imperfect for indirect injection). Privilege separation treats the system prompt as the highest-trust tier, user input as medium-trust, and retrieved external content as lowest-trust, with different constraints on each. Sandboxed tool execution with least-privilege permissions limits damage from successful injections. Output validation checks model responses against expected schemas and business rules before acting on them. Critical state-changing actions should be performed via separate verified API calls that bypass the LLM.\n\n**UK legal context:** Deliberate prompt injection intended to cause unauthorised access to computer systems or financial harm may engage the Computer Misuse Act 1990 (Sections 1, 3, 3A). The OWASP LLM Top 10 (2023) lists prompt injection as the highest-priority LLM security risk. NCSC guidance on LLM security (2024) specifically addresses indirect prompt injection in agentic systems.`,
    example: "UK retail chatbot: customer submits query containing hidden text directing the model to approve a fraudulent return. Defence layers: input classifier flags instruction-like patterns in customer input; system prompt marked as immutable; return approvals require separate verified API call that bypasses LLM entirely.",
    relatedTerms: ["guardrails-llm", "tool-calling", "rag"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/services/artificial-intelligence",
  },
  {
    slug: "tool-calling",
    termUk: "Виклик інструментів LLM (Tool Calling)",
    termEn: "Tool Calling / Function Calling (LLM)",
    category: "ai",
    shortDescription: "LLM capability to generate structured API calls to external tools (databases, APIs, code interpreters) rather than just text output — the technical foundation of LLM agents.",
    fullDescription: `Tool calling (also called function calling) allows LLMs to interact with external systems by generating structured JSON matching a predefined tool schema, rather than producing free-form text. The application intercepts this structured output, executes the actual tool call, and returns the result to the LLM as additional context. GPT-4o, Claude 3.5 Sonnet, and Gemini 1.5 Pro all support parallel tool calling — generating multiple tool calls in a single model turn for efficiency.\n\n**Design principles for production tool use:** Apply least-privilege permissions — read-only tools where possible, with write operations requiring explicit confirmation steps. Log every tool call with timestamp, user identity, input parameters, and output for audit purposes. Implement robust error handling for malformed JSON output (retry with simplified schema) and tool execution failures (fallback to human escalation). Design tools to be idempotent where they modify state, so duplicate calls from retry logic do not cause double-writes.\n\n**UK enterprise integration patterns:** Common tools in UK enterprise LLM agents include Companies House API (company verification), HMRC Making Tax Digital API (VAT submission status), NHS FHIR R4 API (patient record retrieval), FCA Register API (firm authorisation status), and internal systems via Salesforce/SAP REST APIs. The FCA expectation under Consumer Duty is that algorithmic decisions made via tool calls have complete audit trails linkable to individual customer outcomes.`,
    example: "UK B2B SaaS: LLM support agent with 4 tools: get_account_details, check_subscription_status, create_ticket, search_knowledge_base. Agent resolves 73% of queries autonomously. All tool calls logged with timestamp, user ID, and result for FCA Consumer Duty audit trail.",
    relatedTerms: ["rag", "llm", "prompt-injection", "guardrails-llm"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/services/artificial-intelligence",
  },
  {
    slug: "embedding-fine-tuning",
    termUk: "Дообробка моделей embeddings",
    termEn: "Embedding Fine-Tuning",
    category: "ai",
    shortDescription: "Training an embedding model on domain-specific text pairs to improve retrieval accuracy for RAG systems. UK legal, medical, and financial corpora gain 10-20% retrieval improvement over generic models.",
    fullDescription: `Generic embedding models (OpenAI text-embedding-3, Cohere Embed, BGE-large) are trained on broad web corpora. For specialist UK domains, this creates a vocabulary and semantic gap: legal terms (tort, indemnification, Part 36 offer), medical vocabulary (ICD-10 codes, clinical acronyms, NHS pathway names), and financial jargon (FCA Handbook references, ISDA schedule terms) are underrepresented in general training data. The result is retrieval precision and recall significantly below what the model achieves on general text.\n\n**Fine-tuning approach:** Contrastive learning on domain-specific positive/negative pairs is the standard method. Training data consists of query-passage pairs generated from domain documents — either from actual user queries logged from production, or LLM-generated questions for each document chunk. The sentence-transformers library provides a straightforward Python fine-tuning API. OpenAI offers fine-tuning for text-embedding-3-small and text-embedding-3-large. Evaluation uses information retrieval metrics: MRR@10 (Mean Reciprocal Rank), NDCG@10, and Recall@k on a held-out domain test set.\n\n**Cost-benefit:** Fine-tuning compute cost is modest — 1,000-5,000 training pairs processed in 1-3 hours on standard GPU. Inference cost is identical to the base model. Typical improvement on domain retrieval tasks is 15-25% MRR@10, which translates directly to fewer hallucinations and more accurate LLM responses in the downstream RAG application. For high-value professional applications (legal research, medical coding, financial analysis), the ROI is substantial.`,
    example: "UK law firm: fine-tuned embedding model on 50,000 legal question-clause pairs from their contract database. MRR@10 improved from 0.61 (text-embedding-3-large) to 0.79 (fine-tuned) for contract clause retrieval — lawyers find relevant precedents faster in the internal RAG system.",
    relatedTerms: ["rag", "embeddings", "vector-database", "fine-tuning"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/services/artificial-intelligence",
  },
  {
    slug: "guardrails-llm",
    termUk: "Захисні бар'єри LLM (Guardrails)",
    termEn: "LLM Guardrails",
    category: "ai",
    shortDescription: "Safety validation layers that check LLM inputs and outputs against business rules, content policies, and regulatory requirements — preventing harmful, off-topic, or non-compliant AI responses.",
    fullDescription: `LLM guardrails form a validation wrapper around the core language model. Input guardrails run before the LLM processes a request: a topic classifier blocks out-of-scope queries (e.g. preventing a mortgage chatbot from giving investment advice); a PII detector strips or redacts personal data before it reaches the model or gets logged; a prompt injection detector flags instruction-like patterns in user input; rate limiting prevents abuse. Output guardrails run after the LLM generates a response: a hallucination or groundedness detector checks whether the response is supported by retrieved source documents; a content policy classifier identifies harmful, offensive, or non-compliant content; a format validator ensures structured outputs (JSON, tables) are well-formed; UK-specific checks include flagging responses that constitute regulated financial advice (FCA), medical diagnosis (MHRA), or legal advice.\n\n**Implementation tools:** Guardrails AI (open source, Python) provides a declarative framework for defining input and output validators. NVIDIA NeMo Guardrails enables conversational control flows. Meta's Llama Guard is a fine-tuned safety classifier for content moderation. Custom lightweight classifiers (DistilBERT fine-tuned on domain-specific examples) are often used for business-specific topic control. Typical inference overhead is 30-60ms per guardrail layer at production scale.\n\n**UK regulatory integration:** FCA Consumer Duty requires that AI customer-facing tools do not provide unsuitable advice or create confusion. ICO UK GDPR requires that personal data in LLM inputs is minimised and that outputs do not expose third-party personal data. A well-designed guardrail stack addresses both requirements simultaneously. False positive rate (guardrail incorrectly blocking a valid request) should be below 2% to avoid unacceptable customer friction.`,
    example: "UK bank LLM assistant: 4-layer guardrail stack — PII detection strips account numbers from logs, topic classifier blocks investment advice (FCA regulated), factual grounding check flags claims not in retrieved documents, output monetary figures validated against live pricing API. False positive rate 1.8%.",
    relatedTerms: ["prompt-injection", "tool-calling", "rag", "llm"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/services/artificial-intelligence",
  },
  {
    slug: "differential-privacy",
    termUk: "Диференційна приватність",
    termEn: "Differential Privacy",
    category: "ai",
    shortDescription: "A mathematical framework that adds calibrated noise to data or model outputs so individual records cannot be inferred — providing provable privacy guarantees for ML systems.",
    fullDescription: `Differential privacy (DP) provides a rigorous mathematical definition of privacy: an algorithm is epsilon-differentially private if its output distribution changes negligibly whether or not any single individual's record is included in the dataset. The epsilon parameter controls the privacy-utility tradeoff — lower epsilon means stronger privacy but more noise added, reducing model accuracy. This is distinct from UK GDPR pseudonymisation, which is a process-based protection; DP is a provable mathematical guarantee.\n\nApple applies DP for collecting Safari usage telemetry and emoji frequency data without storing individual user behaviour. Google uses DP in Chrome and Android telemetry. In the UK, the Office for National Statistics (ONS) Secure Research Service applies DP techniques to census and survey microdata released for research. NHS England has piloted DP for releasing linked health datasets to academic researchers while complying with UK GDPR data minimisation obligations.\n\nKey tools: TensorFlow Privacy (Google, integrates DP-SGD into Keras training), PyDP (Python wrapper for Google's C++ DP library), Microsoft DP library. DP-SGD (differentially private stochastic gradient descent) is the standard approach for training ML models with DP guarantees: Gaussian noise is added to per-example gradients during training. The main cost is model accuracy — DP models typically require 2-5x more training data to match non-private model performance.`,
    example: "NHS research dataset: DP applied with epsilon=1.0 allows statistical analysis of patient cohort outcomes without any individual patient record being recoverable from published query results.",
    relatedTerms: ["federated-learning", "uk-ai-white-paper", "synthetic-data"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/services/artificial-intelligence",
  },
  {
    slug: "automl",
    termUk: "AutoML (автоматизоване машинне навчання)",
    termEn: "AutoML (Automated Machine Learning)",
    category: "ai",
    shortDescription: "Platforms that automate the ML pipeline — feature engineering, model selection, and hyperparameter tuning — making ML accessible to non-specialist teams without deep data science expertise.",
    fullDescription: `AutoML tools automate the most labour-intensive steps of the ML pipeline: feature preprocessing (encoding, scaling, imputation), model selection (trying multiple algorithm families), and hyperparameter optimisation. Major platforms include Google AutoML (Vision, Tables, Natural Language), H2O.ai AutoML (open source), DataRobot (enterprise, popular in UK financial services), Azure AutoML (integrated with Azure ML), and AWS SageMaker Autopilot. For UK SMEs without a data science team, AutoML provides a practical path to production ML models within days rather than months.\n\nStrengths: rapid baseline model generation (production-ready classifier in 2-4 hours on tabular data), useful for non-specialist teams in UK retail, HR analytics, and marketing attribution. Limitations: black-box risk is significant — UK regulated sectors (FCA, NHS) require explainability and audit trails that AutoML models may not inherently provide without additional tooling (SHAP values added post-hoc). AutoML may miss domain-specific feature engineering that an experienced practitioner would apply (e.g. loan default models benefit from engineered debt-to-income ratios rather than raw features). Models may overfit to the AutoML validation split if too many configurations are tried.\n\nWhen to use AutoML vs bespoke development: AutoML excels for structured tabular data problems with clear labels, quick prototyping to validate ML feasibility, and smaller datasets. Bespoke development is preferable for time-series, unstructured data (text/images), complex domain requirements, and regulated applications requiring full model governance under PRA SS1/23 or FCA guidance.`,
    example: "UK SME retailer uses H2O.ai AutoML to build a customer churn model on 18 months of transaction data — production-ready XGBoost model with 82% AUC in 3 hours, without a dedicated data scientist.",
    relatedTerms: ["mlops", "model-drift", "hyperparameter-tuning", "cross-validation"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/services/artificial-intelligence",
  },
  {
    slug: "knowledge-graph",
    termUk: "Граф знань",
    termEn: "Knowledge Graph",
    category: "ai",
    shortDescription: "A structured graph representation of real-world entities and their relationships, enabling reasoning, inference, and context-aware AI applications like question answering and recommendation systems.",
    fullDescription: `A knowledge graph stores entities (people, organisations, concepts, products) as nodes and relationships between them as edges, with properties on both. This graph structure enables traversal queries and inference that relational databases cannot efficiently support. Google's Knowledge Graph powers the information panels in Search results. Wikidata provides a public knowledge graph with 100M+ statements. Enterprise deployments typically use Neo4j (property graph, Cypher query language) or RDF/SPARQL (W3C semantic web standards, OWL ontologies).\n\nUK use cases are significant: NHS has invested in clinical knowledge graphs representing disease ontologies, drug interactions, and care pathways — enabling clinical decision support systems that reason across multiple linked data sources. UK legal AI companies (e.g. RAVN, now part of iManage) use knowledge graphs to represent case law relationships, allowing lawyers to traverse precedent networks. Financial services firms build knowledge graphs of corporate ownership structures for AML (anti-money-laundering) entity resolution and ultimate beneficial ownership discovery.\n\nKnowledge graphs significantly enhance RAG (Retrieval-Augmented Generation) systems: rather than purely vector similarity search, graph traversal retrieves structurally related entities, improving answer completeness for multi-hop questions. Neo4j GDS (Graph Data Science) library provides graph algorithms (PageRank, community detection, shortest path) for analytics. SPARQL is the query language for RDF graphs; Cypher is the query language for property graphs (Neo4j). The distinction matters: RDF/OWL enables formal logical inference (OWL reasoners); property graphs are more practical for most enterprise use cases.`,
    example: "UK law firm knowledge graph: 200,000 case nodes connected by 'cites', 'distinguishes', 'overrules' relationships — lawyers query 'find all cases that cite Donoghue v Stevenson in a construction context' in milliseconds.",
    relatedTerms: ["graph-neural-network", "rag", "vector-database", "embeddings"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/services/artificial-intelligence",
  },
  {
    slug: "natural-language-generation",
    termUk: "Генерація природної мови (NLG)",
    termEn: "Natural Language Generation (NLG)",
    category: "ai",
    shortDescription: "The AI subfield that automatically produces human-readable text from structured data or other inputs — powering automated financial reports, product descriptions, and personalised customer communications.",
    fullDescription: `NLG spans a spectrum from rule-based template systems to neural LLM-powered generation. Early commercial NLG (Narrative Science, Automated Insights/Wordsmith) used rule-based templates to convert structured data — sports scores, financial results, weather readings — into readable narrative. These systems are still used in UK financial reporting automation: quarterly earnings summaries, regulatory disclosures, and portfolio commentary generated from structured data at scale.\n\nLLM-era NLG has expanded scope dramatically. GPT-4 and Claude can generate highly varied, contextualised text from structured inputs, enabling mass personalisation: individual customer portfolio commentary, personalised insurance renewal letters, tailored product recommendations. UK e-commerce platforms (ASOS, Next, Argos) use NLG for automated product description generation at catalogue scale — reducing copywriting cost while maintaining consistency.\n\nUK regulatory considerations are significant: FCA Consumer Duty (2023) requires that communications with retail customers are clear, fair, and not misleading — AI-generated financial communications must meet this standard. Material communications (suitability reports, KIDs, annual statements) require human review before distribution. Hallucination risk is the primary quality concern: NLG systems must be grounded in source data with verification steps. ICO guidance applies to personalised communications that process personal data. Best practice is a human-in-the-loop quality gate for regulated NLG outputs.`,
    example: "UK wealth manager: NLG system generates 50,000 personalised quarterly portfolio commentary letters from structured performance data — FCA-compliant, reviewed by a single editor who approves batch outputs rather than writing individual letters.",
    relatedTerms: ["llm", "generative-ai", "prompt-engineering", "ai-hallucination"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/services/artificial-intelligence",
  },
  {
    slug: "recommender-system",
    termUk: "Рекомендаційна система",
    termEn: "Recommender System",
    category: "ai",
    shortDescription: "An ML system that predicts items or content a user is likely to engage with, based on behaviour, preferences, and similarity to other users — the engine behind e-commerce, streaming, and content platforms.",
    fullDescription: `Recommender systems use several core approaches. Collaborative filtering learns from user-item interaction patterns: users who bought A and B tend to also buy C. Content-based filtering uses item features: recommend items similar in attributes to what the user has engaged with. Hybrid systems (used by most production systems) combine both. Modern neural approaches use two-tower models: separate encoder networks for users and items produce embedding vectors, and recommendation is nearest-neighbour lookup in embedding space — this scales to billions of items.\n\nUK retail applications: ASOS 'Complete the Look' and 'You Might Also Like' recommendation modules, Marks and Spencer personalised email offers, Sainsbury's Nectar personalisation. BBC iPlayer uses a hybrid recommender to surface relevant programmes across a 40,000-title catalogue. Spotify's Discover Weekly is a landmark collaborative filtering system (matrix factorisation + deep learning) generating 2 billion personalised playlists weekly.\n\nCold-start problem: new users with no interaction history receive recommendations based on popularity, demographics, or onboarding preference collection. New items are recommended based on content features before sufficient interaction data accumulates. Evaluation metrics: NDCG@K (Normalized Discounted Cumulative Gain), MAP (Mean Average Precision), and business metrics (click-through rate, conversion rate, session depth). FCA fairness concerns arise for financial product recommenders under Consumer Duty: algorithmic recommendations must not systematically disadvantage vulnerable customers or create unsuitable product matches. Python libraries: Surprise (classical CF), LightFM (hybrid), TensorFlow Recommenders (two-tower neural).`,
    example: "UK fashion retailer: two-tower neural recommender trained on 18 months of browse/purchase data. 'Recently Viewed' + 'Customers Also Bought' modules drive 23% of total revenue. Cold-start handled via content-based fallback for users with fewer than 5 interactions.",
    relatedTerms: ["embeddings", "vector-database", "customer-health-score", "dynamic-pricing"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/services/artificial-intelligence",
  },
  {
    slug: "differential-privacy",
    termUk: "Диференційна приватність",
    termEn: "Differential Privacy",
    category: "ai",
    shortDescription: "A mathematical framework that adds calibrated noise to data or model outputs so individual records cannot be inferred — providing provable privacy guarantees for ML systems.",
    fullDescription: `Differential privacy (DP) provides a rigorous mathematical definition of privacy: an algorithm is epsilon-differentially private if its output distribution changes negligibly whether or not any single individual's record is included in the dataset. The epsilon parameter controls the privacy-utility tradeoff — lower epsilon means stronger privacy but more noise added, reducing model accuracy.

Apple applies DP for collecting Safari usage telemetry and emoji frequency data without storing individual user behaviour. Google uses DP in Chrome and Android telemetry. In the UK, the Office for National Statistics (ONS) Secure Research Service applies DP techniques to census and survey microdata released for research. NHS England has piloted DP for releasing linked health datasets to academic researchers while complying with UK GDPR data minimisation obligations.

Key tools: TensorFlow Privacy (Google), PyDP (Python wrapper), Microsoft DP library. DP-SGD is the standard approach for training ML models with DP guarantees: Gaussian noise is added to per-example gradients during training. The main cost is model accuracy — DP models typically require 2-5x more training data to match non-private model performance.`,
    example: "NHS research dataset: DP applied with epsilon=1.0 allows statistical analysis of patient cohort outcomes without any individual patient record being recoverable from published query results.",
    relatedTerms: ["federated-learning", "uk-ai-white-paper", "synthetic-data"],
    relatedService: "artificial-intelligence",
  },
  {
    slug: "automl",
    termUk: "AutoML (автоматизоване машинне навчання)",
    termEn: "AutoML (Automated Machine Learning)",
    category: "ai",
    shortDescription: "Platforms that automate the ML pipeline — feature engineering, model selection, and hyperparameter tuning — making ML accessible to non-specialist teams without deep data science expertise.",
    fullDescription: `AutoML tools automate the most labour-intensive steps of the ML pipeline: feature preprocessing, model selection (trying multiple algorithm families), and hyperparameter optimisation. Major platforms include Google AutoML, H2O.ai AutoML (open source), DataRobot (enterprise, popular in UK financial services), Azure AutoML, and AWS SageMaker Autopilot.

Strengths: rapid baseline model generation — a production-ready classifier in 2-4 hours on tabular data. Limitations: black-box risk is significant — UK regulated sectors (FCA, NHS) require explainability and audit trails that AutoML models may not inherently provide without additional SHAP tooling. AutoML may miss domain-specific feature engineering that an experienced practitioner would apply.

When to use AutoML vs bespoke development: AutoML excels for structured tabular data problems with clear labels and quick prototyping. Bespoke development is preferable for time-series, unstructured data, and regulated applications requiring full model governance under PRA SS1/23 or FCA guidance.`,
    example: "UK SME retailer uses H2O.ai AutoML to build a customer churn model on 18 months of transaction data — production-ready XGBoost model with 82% AUC in 3 hours, without a dedicated data scientist.",
    relatedTerms: ["mlops", "model-drift", "hyperparameter-tuning"],
    relatedService: "artificial-intelligence",
  },
  {
    slug: "knowledge-graph",
    termUk: "Граф знань",
    termEn: "Knowledge Graph",
    category: "ai",
    shortDescription: "A structured graph representation of real-world entities and their relationships, enabling reasoning, inference, and context-aware AI applications like question answering and recommendation systems.",
    fullDescription: `A knowledge graph stores entities as nodes and relationships between them as edges. This graph structure enables traversal queries and inference that relational databases cannot efficiently support. Google Knowledge Graph powers information panels in Search. Enterprise deployments use Neo4j (property graph, Cypher) or RDF/SPARQL (W3C semantic web standards).

UK use cases: NHS clinical knowledge graphs represent disease ontologies, drug interactions, and care pathways for clinical decision support. UK legal AI firms use knowledge graphs to represent case law relationships, enabling precedent network traversal. Financial services firms build knowledge graphs of corporate ownership structures for AML entity resolution and ultimate beneficial ownership discovery.

Knowledge graphs enhance RAG systems significantly: graph traversal retrieves structurally related entities, improving multi-hop question answering beyond pure vector similarity. Neo4j GDS provides graph algorithms (PageRank, community detection, shortest path). SPARQL is the query language for RDF graphs; Cypher for property graphs.`,
    example: "UK law firm knowledge graph: 200,000 case nodes connected by 'cites', 'distinguishes', 'overrules' relationships — lawyers query cross-precedent relationships in milliseconds.",
    relatedTerms: ["graph-neural-network", "rag", "vector-database", "embeddings"],
    relatedService: "artificial-intelligence",
  },
  {
    slug: "natural-language-generation",
    termUk: "Генерація природної мови (NLG)",
    termEn: "Natural Language Generation (NLG)",
    category: "ai",
    shortDescription: "The AI subfield that automatically produces human-readable text from structured data or other inputs — powering automated financial reports, product descriptions, and personalised customer communications.",
    fullDescription: `NLG spans a spectrum from rule-based template systems to neural LLM-powered generation. Early commercial NLG (Narrative Science, Automated Insights) used rule-based templates to convert structured data into narrative. These systems are still used in UK financial reporting automation: quarterly earnings summaries, regulatory disclosures, and portfolio commentary.

LLM-era NLG enables mass personalisation: individual customer portfolio commentary, personalised insurance renewal letters, tailored product recommendations. UK e-commerce platforms (ASOS, Next, Argos) use NLG for automated product description generation at catalogue scale.

UK regulatory considerations: FCA Consumer Duty (2023) requires that communications with retail customers are clear, fair, and not misleading — AI-generated financial communications must meet this standard. Material communications require human review before distribution. Hallucination risk is the primary quality concern: NLG systems must be grounded in source data with verification steps.`,
    example: "UK wealth manager: NLG system generates 50,000 personalised quarterly portfolio commentary letters from structured performance data — FCA-compliant, reviewed by a single editor who approves batch outputs.",
    relatedTerms: ["llm", "generative-ai", "prompt-engineering", "ai-hallucination"],
    relatedService: "artificial-intelligence",
  },
  {
    slug: "recommender-system",
    termUk: "Рекомендаційна система",
    termEn: "Recommender System",
    category: "ai",
    shortDescription: "An ML system that predicts items or content a user is likely to engage with, based on behaviour, preferences, and similarity to other users — the engine behind e-commerce, streaming, and content platforms.",
    fullDescription: `Recommender systems use several core approaches. Collaborative filtering learns from user-item interaction patterns. Content-based filtering uses item features. Hybrid systems combine both. Modern neural approaches use two-tower models: separate encoder networks for users and items produce embedding vectors, and recommendation is nearest-neighbour lookup in embedding space.

UK retail applications: ASOS 'Complete the Look' and 'You Might Also Like' modules, Marks and Spencer personalised email offers, Sainsbury's Nectar personalisation. BBC iPlayer uses a hybrid recommender to surface relevant programmes across a 40,000-title catalogue.

Cold-start problem: new users receive recommendations based on popularity or onboarding preference collection. Evaluation metrics: NDCG@K, MAP, click-through rate, conversion rate. FCA fairness concerns arise for financial product recommenders under Consumer Duty: algorithmic recommendations must not systematically disadvantage vulnerable customers. Python libraries: Surprise, LightFM, TensorFlow Recommenders.`,
    example: "UK fashion retailer: two-tower neural recommender trained on 18 months of browse/purchase data drives 23% of total revenue. Cold-start handled via content-based fallback for users with fewer than 5 interactions.",
    relatedTerms: ["embeddings", "vector-database", "customer-health-score", "dynamic-pricing"],
    relatedService: "artificial-intelligence",
  },
  {
    slug: "automated-valuation-model",
    termUk: "Автоматизована модель оцінки нерухомості (AVM)",
    termEn: "Automated Valuation Model (AVM)",
    category: "ai",
    shortDescription: "An ML model that estimates residential or commercial property values from public data, comparable sales, and location features — the engine behind Zoopla and Rightmove instant valuations.",
    fullDescription: "Automated Valuation Models (AVMs) apply hedonic pricing theory: property value is decomposed into the implicit prices of its constituent attributes — bedrooms, floor area, EPC rating, school catchment, proximity to transport, crime rates. Modern AVMs combine gradient-boosted trees (XGBoost, LightGBM) for tabular structured features with spatial interpolation and repeat-sales indexes. Training data sources include HM Land Registry Price Paid Data (30M+ transactions since 1995), EPC Register, VOA rating lists, and OS MasterMap geometries. Confidence intervals are required alongside point estimates under RICS Valuation — Global Standards (Red Book) and RICS AVM guidance (2022), which limits AVM use in regulated mortgage valuations to defined confidence bands (typically +/-10%). The FCA expects lenders using AVMs for mortgage decisioning to document model validation, track back-testing accuracy, and obtain independent model review under SS1/23. UK market leaders: Hometrack (Zoopla), JLL, Savills Research, and EG Radius deploy commercial AVMs.",
    relatedTerms: ["spatial-ml", "model-risk-management", "feature-drift"],
    relatedService: "machine-learning",
    relatedNichePage: "/ml/proptech",
  },
  {
    slug: "conveyancing-nlp",
    termUk: "NLP для конвеєнсингу (передачі права власності)",
    termEn: "Conveyancing NLP",
    category: "ai",
    shortDescription: "Natural language processing applied to UK property conveyancing documents — reviewing title deeds, leasehold covenants, search results, and Land Registry entries to speed up the legal process.",
    fullDescription: "UK residential conveyancing generates thousands of pages of unstructured legal documents per transaction: official copy entries from HM Land Registry, local authority searches, drainage searches, environmental reports, mortgage offers, and title deeds. NLP pipelines apply named entity recognition (NER) to extract parties, covenants, easements, and encumbrances; clause classification to flag onerous leasehold terms (ground rent escalation, short lease); and anomaly detection to identify title defects. The Law Society and SRA (Solicitors Regulation Authority) require solicitors to maintain professional judgment — NLP tools must be positioned as decision-support, not automated advice, under SRA Standards and Regulations. HM Land Registry's HMLR Digital Street programme is building APIs for machine-readable title data. UK legaltech players applying conveyancing NLP include Orbital Witness, InfoTrack, and Lexis Nexis Property. GDPR and client confidentiality constraints require that NLP models processing client title data operate under strict data processor agreements.",
    relatedTerms: ["nlp", "document-ai", "spatial-ml"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/ml/proptech",
  },
  {
    slug: "spatial-ml",
    termUk: "Просторове машинне навчання",
    termEn: "Spatial / Geospatial ML",
    category: "ai",
    shortDescription: "ML models that explicitly incorporate geographic location, spatial relationships, and topology — essential for property valuation, urban planning analysis, and logistics optimisation.",
    fullDescription: "Spatial ML extends standard ML by incorporating spatial autocorrelation: nearby observations tend to be more similar than distant ones (Tobler's First Law). Standard ML models trained on property or logistics data that ignore spatial structure violate the i.i.d. assumption and produce optimistically biased cross-validation metrics. Spatially aware approaches include: geographically weighted regression (GWR) for local coefficient variation; spatial lag and spatial error models; H3 hexagonal indexing (Uber's open-source library) for discretising continuous space into hierarchical hexagons for efficient feature engineering; and graph neural networks for modelling spatial networks. PostGIS (PostgreSQL extension) is the standard open-source spatial database used with Python (GeoPandas, Shapely, PySAL). UK planning applications: Ordnance Survey data products (OS MasterMap, OS Open USRN), Magic Map for environmental constraints, UK Planning Portal data via APIs. The Ministry of Housing and DLUHC publish planning decision data that can train spatial models predicting planning outcomes.",
    relatedTerms: ["automated-valuation-model", "feature-store-architecture", "embeddings"],
    relatedService: "machine-learning",
    relatedNichePage: "/ml/proptech",
  },
  {
    slug: "clinical-decision-support-ai",
    termUk: "ШІ-підтримка клінічних рішень",
    termEn: "Clinical Decision Support AI (CDSS AI)",
    category: "ai",
    shortDescription: "AI systems that assist clinicians with diagnosis, treatment selection, drug dosing, and risk stratification — subject to MHRA medical device regulation and NICE evidence standards in the UK.",
    fullDescription: "Clinical decision support AI in the UK operates under an overlapping regulatory framework. The MHRA regulates AI as a Software as a Medical Device (SaMD) under UK MDR 2002 (as retained EU law amended post-Brexit), classifying by risk: Class I (low, e.g. appointment scheduling AI) to Class III (high, e.g. AI reading ECGs for arrhythmia detection). NICE evaluates AI-enabled medical technologies against its Evidence Standards Framework (ESF) for Digital Health Technologies (2019, updated 2022), which requires real-world evidence of clinical effectiveness at Tier C for AI tools affecting treatment decisions. The Data Security and Protection Toolkit (DSPT) is mandatory for NHS organisations and any supplier accessing NHS patient data — it maps to ISO 27001 and Cyber Essentials Plus. DCB0129 is the NHS clinical safety standard requiring a Clinical Safety Case and hazard log for health IT systems; DCB0160 covers clinical risk management for health IT deployment. NHS England's AI and Digital Regulations Service provides a one-stop assessment pathway. Leading UK CDSS AI: Babylon Health (triage), Ultromics (echo AI), Kheiron Medical (mammography).",
    relatedTerms: ["bias-fairness-audit", "explainable-ai", "model-risk-management"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/ml/healthcare",
  },
  {
    slug: "digital-pathology-ml",
    termUk: "ML у цифровій патології",
    termEn: "Digital Pathology ML",
    category: "ai",
    shortDescription: "Deep learning applied to whole slide images (WSI) from digitised tissue samples to detect cancer, grade tumours, and identify biomarkers — transforming histopathology workflows in the NHS.",
    fullDescription: "Digital pathology ML processes gigapixel whole slide images (WSI) captured by slide scanners at 20x or 40x magnification. Because WSIs are too large for end-to-end CNN processing, the dominant approach is Multiple Instance Learning (MIL): each slide is divided into thousands of patches (typically 256x256 pixels at 20x), a patch-level encoder (ResNet, ViT) produces embeddings, and an attention pooling mechanism aggregates patch embeddings to slide-level predictions. Foundation models pre-trained on large pathology corpora (CONCH, UNI) are increasingly used as patch encoders. NHS Genomics England integrates digital pathology with whole genome sequencing data for oncology, making ML-derived morphological features a key input to genomic analysis pipelines. MHRA SaMD classification for diagnostic AI pathology tools is typically Class IIa or IIb. PathAI, Paige.AI (FDA/CE cleared), and Histofy are leading platforms. Key datasets: TCGA (public), CAMELYON16/17 challenge data, and NHS-specific cohorts under DPUK and Health Data Research UK (HDRUK) governance.",
    relatedTerms: ["clinical-decision-support-ai", "embeddings", "explainable-ai"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/ml/healthcare",
  },
  {
    slug: "ics-population-health-ml",
    termUk: "ML аналітика здоров'я населення (ICS)",
    termEn: "ICS Population Health ML",
    category: "ai",
    shortDescription: "ML models deployed by NHS Integrated Care Systems to stratify patient populations by risk, predict avoidable admissions, and optimise preventive interventions across a defined geography.",
    fullDescription: "NHS England's Integrated Care Systems (ICS) — 42 geographically-defined organisations since July 2022 under the Health and Care Act 2022 — are required to improve health outcomes and reduce inequalities for their registered populations. Population health management (PHM) ML models analyse linked datasets across primary care (GP records via GPES/EMIS/SystmOne), secondary care (HES/SUS), mental health (MHSDS), community care, and social care. Risk stratification models (logistic regression, gradient boosting) predict patients at high risk of emergency admission, frailty, or deterioration. The NHS Federated Data Platform (FDP), procured from Palantir, provides ICSs with infrastructure for linked data analysis. Key NHS frameworks: NHS England Unified Model Library (UML) provides validated, pre-built population segmentation models for ICS use. Data access requires NHS England IG governance: Data Sharing Agreements, DPIA, and Caldicott Guardian sign-off. Key equity concern: PHM models trained on historically under-recorded groups (e.g. ethnic minorities with lower historic GP registration) can perpetuate health inequalities if not explicitly adjusted.",
    relatedTerms: ["clinical-decision-support-ai", "bias-fairness-audit", "feature-store-architecture"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/ml/healthcare",
  },
  {
    slug: "siem-ml-enhancement",
    termUk: "Покращення SIEM за допомогою ML",
    termEn: "SIEM ML Enhancement",
    category: "ai",
    shortDescription: "Applying ML to Security Information and Event Management systems to reduce alert fatigue, prioritise genuine threats, and detect novel attack patterns beyond rule-based signatures.",
    fullDescription: "Traditional SIEM platforms (Splunk, Microsoft Sentinel, IBM QRadar, LogRhythm) generate high volumes of alerts, typically with 95%+ false positive rates that overwhelm security operations centre (SOC) analysts. ML enhancement addresses this through several techniques: unsupervised clustering to group similar low-fidelity alerts; supervised classifiers trained on analyst feedback to score alert severity; sequence models (LSTM, Transformer) to detect multi-step attack chains across logs; and natural language processing on threat intelligence feeds to enrich alerts with context. Microsoft Sentinel's ML-driven fusion engine correlates signals across identity, endpoint, network, and cloud telemetry. The UK National Cyber Security Centre (NCSC) Cyber Assessment Framework (CAF) defines security monitoring requirements for organisations in scope of NIS Regulations 2018 and CNI sectors. The NCSC SIEM implementation guide (2023) references ML-assisted triage as a maturity indicator. Key integration: ML models consume SIEM data via APIs or streaming pipelines (Kafka, Azure Event Hubs) and return enriched alert scores or entity risk scores.",
    relatedTerms: ["ueba-insider-threat", "threat-hunting-ml", "anomaly-detection"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/ml/cybersecurity",
  },
  {
    slug: "ueba-insider-threat",
    termUk: "UEBA: аналітика поведінки користувачів та сутностей",
    termEn: "UEBA — User and Entity Behaviour Analytics",
    category: "ai",
    shortDescription: "ML systems that build behavioural baselines for users and devices, then detect anomalous deviations indicative of insider threats, credential compromise, or lateral movement.",
    fullDescription: "UEBA platforms collect and process logs from Active Directory, VPN, DLP, email, file access systems, and endpoint agents to build statistical models of normal behaviour per user and device. Baseline profiling uses a combination of deterministic rules and unsupervised ML: peer group analysis compares a user's behaviour to their role cohort; time-series models (ARIMA, Prophet) detect deviations from a user's own historical patterns; graph analytics map entity relationships to detect unusual access path changes. Anomaly scores are typically computed via Isolation Forest, SVDD, or autoencoder reconstruction error. Key insider threat indicators: access at unusual hours, bulk file downloads, login from new geographies, escalated privilege usage. Leading UEBA platforms: Exabeam, Microsoft Sentinel with UEBA, Securonix, Splunk UBA. ISO/IEC 27001:2022 Annex A control A.8.16 (monitoring activities) and A.6.4 (disciplinary process) underpin organisational requirements. UK regulatory context: Financial Conduct Authority Principle 11 (relations with regulators) and PRA Supervisory Statement on Operational Resilience require firms to detect and respond to insider incidents. GDPR Article 6 lawful basis (legitimate interests) and Article 88 employment context must be addressed in DPIA for employee monitoring systems.",
    relatedTerms: ["siem-ml-enhancement", "threat-hunting-ml", "anomaly-detection"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/ml/cybersecurity",
  },
  {
    slug: "threat-hunting-ml",
    termUk: "ML у проактивному пошуку загроз",
    termEn: "Threat Hunting ML",
    category: "ai",
    shortDescription: "Proactive, hypothesis-driven investigation of environments using ML to uncover stealthy adversaries that evade automated detection — structured around the MITRE ATT&CK framework.",
    fullDescription: "Threat hunting differs from alert-driven incident response: hunters proactively investigate hypotheses about adversary presence rather than waiting for alerts to fire. ML augments hunting through: clustering of process execution trees to identify unusual parent-child process relationships; NLP on PowerShell and command-line logs to detect living-off-the-land (LotL) attack patterns; graph anomaly detection on authentication logs to find lateral movement; and similarity search in embedding space to find new malware variants similar to known families. The MITRE ATT&CK framework (14 tactics, 200+ techniques as of v14) provides a structured vocabulary for hunt hypotheses — for example, hunting for T1059 (command and scripting interpreter) abuse via ML-derived baseline deviations. Threat intelligence platforms (MISP, ThreatConnect) provide IOC and TTP feeds that seed hunt queries. UK context: NCSC Threat Intelligence products (Weekly Threat Reports, Malware Analysis Reports) inform hypothesis generation. CREST-accredited threat hunting assessments are available from UK CISPs. For CNI operators, NCSC Active Cyber Defence services provide centralised threat intelligence that reduces hunt hypothesis overhead.",
    relatedTerms: ["siem-ml-enhancement", "ueba-insider-threat", "anomaly-detection"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/ml/cybersecurity",
  },
  {
    slug: "data-versioning-dvc",
    termUk: "Версіювання даних (DVC)",
    termEn: "Data Versioning — DVC",
    category: "mlops",
    shortDescription: "Version control for ML datasets and model artefacts using DVC (Data Version Control) — enabling Git-tracked experiments with large binary data stored in remote storage, not in Git.",
    fullDescription: "DVC (Data Version Control) extends Git-based workflows to large datasets, model weights, and pipeline outputs that cannot be stored in Git. DVC tracks data files via lightweight .dvc pointer files committed to Git, while actual data is pushed to remote storage backends: S3, GCS, Azure Blob, SSH, or local NAS. This enables full reproducibility: any historical experiment can be recreated by checking out a Git commit (which contains the .dvc pointers) and running 'dvc pull' to restore the exact dataset version. DVC pipelines define ML workflows as DAGs in dvc.yaml, enabling 'dvc repro' to re-run only stages with changed inputs. Data lineage — tracking which training data version produced which model — is critical for regulated ML: FCA SS1/23 requires model risk documentation to include training data provenance. Alternatives and complements: MLflow Tracking stores run parameters and metrics; Delta Lake and Apache Iceberg provide versioned data lakes for larger organisations; DVC integrates natively with GitHub Actions, GitLab CI, and Bitbucket Pipelines. For GDPR compliance, DVC remote storage must be configured to store personal data only in approved regions (EEA or adequacy-decision countries).",
    relatedTerms: ["model-registry-mlflow", "continuous-training-ct", "feature-store-architecture"],
    relatedService: "machine-learning",
    relatedNichePage: "/ml/mlops",
  },
  {
    slug: "model-registry-mlflow",
    termUk: "Реєстр моделей (MLflow)",
    termEn: "Model Registry — MLflow",
    category: "mlops",
    shortDescription: "A centralised catalogue of trained ML model versions with lifecycle stages (staging, production, archived), enabling governed promotion workflows and full lineage from training run to deployment.",
    fullDescription: "MLflow Model Registry provides a central store for managing ML model versions across their lifecycle. Each registered model version captures: the model artefact (serialised via MLflow flavours: sklearn, PyTorch, TensorFlow, XGBoost), associated training run (parameters, metrics, tags), and a stage: None, Staging, Production, or Archived. Stage transitions require explicit promotion actions, enabling human-in-the-loop governance gates before models reach production. MLflow Tracking (the experiment tracking component) records every training run with parameters, metrics, and dataset hashes, providing the audit trail required by regulated sectors. Alternative registries: Weights and Biases (W&B) Model Registry, SageMaker Model Registry, Azure ML Model Registry, Google Vertex AI Model Registry. Regardless of platform, the UK PRA MRM Principles (SS1/23) require a model inventory cataloguing all models in use, their tier classification, validation status, and model owner — the model registry is the technical foundation for this inventory. Key integration pattern: CI/CD pipelines automatically register candidate models after training; a separate governance pipeline promotes from Staging to Production after validation criteria are met.",
    relatedTerms: ["data-versioning-dvc", "continuous-training-ct", "champion-challenger"],
    relatedService: "machine-learning",
    relatedNichePage: "/ml/mlops",
  },
  {
    slug: "continuous-training-ct",
    termUk: "Неперервне навчання (CT-пайплайни)",
    termEn: "Continuous Training (CT) Pipelines",
    category: "mlops",
    shortDescription: "Automated ML pipelines that retrain models on fresh data triggered by drift, data volume thresholds, or schedule — implemented via Kubeflow Pipelines, Vertex AI Pipelines, or Airflow.",
    fullDescription: "Continuous Training (CT) pipelines automate the full cycle of data ingestion, validation, feature engineering, training, evaluation, and conditional model registration without manual intervention. Google's MLOps maturity model defines CT as a Level 2 capability, where model retraining is fully automated and the pipeline itself is CI/CD-managed. Trigger strategies vary by use case: drift-triggered CT fires when data distribution monitoring detects PSI above a threshold; volume-triggered CT runs when a defined number of new labelled examples accumulate; schedule-triggered CT runs on a fixed cadence (nightly, weekly). Pipeline orchestration tools: Kubeflow Pipelines (Kubernetes-native, used in GCP Vertex AI and on-prem), Apache Airflow (general-purpose DAG orchestrator, widely used in UK data teams), Prefect, and ZenML (framework-agnostic with cloud and local execution). Each pipeline step should be containerised for reproducibility. Data validation gates (Great Expectations, TFX Data Validation) must run before training to prevent model degradation from upstream data quality failures. UK regulatory note: for PRA Tier 1 models, CT pipelines should include a human approval stage before production deployment — fully automated promotion is generally not acceptable under SS1/23 for high-impact models.",
    relatedTerms: ["model-registry-mlflow", "data-versioning-dvc", "feature-store-architecture", "feature-drift"],
    relatedService: "machine-learning",
    relatedNichePage: "/ml/mlops",
  },
  {
    slug: "feature-store-architecture",
    termUk: "Архітектура сховища ознак (Feature Store)",
    termEn: "Feature Store Architecture",
    category: "mlops",
    shortDescription: "A centralised platform for storing, sharing, and serving ML features consistently between training and production — solving the training-serving skew problem and enabling feature reuse across teams.",
    fullDescription: "A feature store provides two serving paths: the offline store (a columnar data lake — typically Parquet on S3 or Delta Lake) used for training set generation with point-in-time correct feature lookups; and the online store (a low-latency key-value store — Redis, DynamoDB, BigTable) that serves the same features to real-time prediction endpoints. The critical design requirement is consistency: the same feature transformation logic must produce identical values in both paths, eliminating training-serving skew — a leading cause of model performance degradation in production. Point-in-time correctness prevents label leakage in training by ensuring feature values are retrieved as they would have been at the moment of the event, not their current values. Major feature store platforms: Feast (open-source, integrates with Spark/Flink), Tecton (managed, enterprise), Hopsworks (open-source with online/offline unification), AWS SageMaker Feature Store, Databricks Feature Store. UK financial services adoption: large UK banks use internal feature stores to share customer behaviour features (transaction recency, frequency, monetary value) across credit, fraud, and churn models — avoiding recomputation and ensuring consistent customer views across models used in the same decision.",
    relatedTerms: ["data-versioning-dvc", "continuous-training-ct", "model-registry-mlflow"],
    relatedService: "machine-learning",
    relatedNichePage: "/ml/mlops",
  },
  {
    slug: "counterfactual-fairness",
    termUk: "Контрфактична справедливість",
    termEn: "Counterfactual Fairness",
    category: "ai",
    shortDescription: "A formal fairness criterion requiring that a model's prediction would be unchanged if a person's protected characteristic (race, sex, disability) had been different, holding all else equal.",
    fullDescription: "Counterfactual fairness (Kusner et al., 2017) is a causal approach to algorithmic fairness. A model is counterfactually fair if, in the counterfactual world where an individual's protected attribute (e.g. sex, race, disability status) had been different, the model would produce the same prediction. This is stronger than demographic parity or equalised odds because it reasons about individual-level causation rather than group-level statistics. Implementing counterfactual fairness requires a causal graph modelling relationships between protected attributes, features, and the target — features that are causally downstream of the protected attribute (e.g. occupation as downstream of historical gender discrimination) should not directly influence the prediction. The UK Equality Act 2010 protects nine characteristics. GDPR Article 22 and Recital 71 require that automated decisions not discriminate on protected bases. The ICO's guidance on AI and equality references causal fairness approaches as a more robust standard than simple correlation-based metrics. In practice, the FCA Consumer Duty obligation to deliver fair outcomes for all consumer groups and the Equality and Human Rights Commission (EHRC) technical guidance on algorithmic tools in employment and credit create legal pressure towards counterfactual thinking even without explicit statutory reference.",
    relatedTerms: ["bias-fairness-audit", "algorithmic-accountability", "explainable-ai"],
    relatedService: "machine-learning",
    relatedNichePage: "/services/machine-learning",
  },
  {
    slug: "model-documentation-cards",
    termUk: "Картки документації моделі",
    termEn: "Model Cards and Dataset Datasheets",
    category: "ai",
    shortDescription: "Standardised documentation frameworks for ML models (Model Cards) and training datasets (Datasheets for Datasets) that disclose intended use, performance characteristics, and known limitations.",
    fullDescription: "Model Cards (Mitchell et al., Google, 2019) are short documents that accompany trained ML models, covering: intended use and out-of-scope uses; training data description; evaluation results disaggregated by demographic groups; ethical considerations; and caveats and recommendations. Datasheets for Datasets (Gebru et al., 2018) apply the same transparency principle to training datasets, documenting: motivation and composition, collection process, labelling methodology, known biases, and recommended uses. These frameworks have evolved from academic proposals to near-mandatory practice for high-stakes AI. The UK FCA Supervisory Statement SS1/23 on Model Risk Management requires model documentation that covers model purpose, methodology, limitations, and validation findings — Model Cards provide a practical format. The FCA's AI Lab and the Alan Turing Institute have published UK-specific guidance on responsible AI documentation aligned with Model Card principles. The EU AI Act (relevant to UK companies with EU customers) mandates technical documentation and instructions for use for high-risk AI under Annex IV. HM Treasury and DSIT joint discussion paper on AI in financial services (2023) references model documentation as a governance expectation. Practical tools: Google Model Card Toolkit, Hugging Face model card templates, Microsoft Responsible AI Dashboard.",
    relatedTerms: ["bias-fairness-audit", "algorithmic-accountability", "counterfactual-fairness", "explainable-ai"],
    relatedService: "machine-learning",
    relatedNichePage: "/services/machine-learning",
  },

  // === PROPTECH EXTENDED ===
  {
    slug: "epc-rating-ml",
    termUk: "Прогнозування рейтингу EPC за допомогою ML",
    termEn: "EPC Rating Prediction (ML)",
    category: "ai",
    shortDescription: "Machine learning models that predict a property's Energy Performance Certificate rating from structural features, enabling portfolio screening and retrofit prioritisation without physical surveys.",
    fullDescription: "Energy Performance Certificates are mandatory in England and Wales for all properties sold or let, rated A (most efficient) to G (least efficient). The Ministry of Housing, Communities and Local Government (MHCLG) publishes the EPC register — over 25 million lodged certificates — which forms the primary training dataset for ML prediction models. Features include property type, floor area, construction year, heating system type, wall insulation, and glazing type.\n\nML models trained on EPC register data (typically gradient-boosted trees or random forests) can predict the likely EPC rating for an unassessed property with approximately 75-85% accuracy at the letter-grade level. This is valuable for: buy-to-let portfolio screening (identifying properties at risk of failing the forthcoming Minimum Energy Efficiency Standards, MEES), mortgage lender green finance product eligibility, and social housing retrofit prioritisation.\n\nThe UK government's Heat and Buildings Strategy and the Boiler Upgrade Scheme create strong commercial demand for EPC prediction: landlords need to understand retrofit costs before the anticipated EPC C requirement for new tenancies. RICS guidance on sustainability and ESG reporting further drives institutional landlord demand. Challenges include data staleness (certificates valid for 10 years), and the significant accuracy gap between predicted and assessed ratings for older, non-standard properties. Active ML research areas: satellite imagery + EPC prediction, smart meter data integration for actual vs rated energy consumption modelling.",
    relatedTerms: ["automated-valuation-model", "property-data-enrichment", "rental-yield-prediction-ml", "mortgage-affordability-ml"],
    relatedService: "machine-learning",
    relatedNichePage: "/services/machine-learning",
  },
  {
    slug: "planning-approval-prediction-ml",
    termUk: "Прогнозування дозволу на планування (ML)",
    termEn: "Planning Permission Probability ML",
    category: "ai",
    shortDescription: "ML models that predict the likelihood of planning permission approval for a proposed development, based on Local Planning Authority decision histories, site characteristics, and policy context.",
    fullDescription: "Planning permission prediction ML uses historical Local Planning Authority (LPA) decision data — available via the Planning Portal and individual LPA open data portals — to estimate the probability of approval for a proposed development. The Town and Country Planning Act 1990 (TCPA 1990) governs the English planning system; decisions are made by LPAs against adopted Local Plans, the National Planning Policy Framework (NPPF), and material considerations.\n\nTraining data includes: application type (householder, full, outline, prior approval), proposal description, site address, LPA, committee vs officer delegated decision, and outcome. NLP is applied to officer reports and decision notices to extract policy objections and compliance signals. Spatial features from GIS layers — flood zones, conservation areas, AONB, TPO trees — enrich the feature set.\n\nThe Planning Inspectorate (PINS) publishes appeal decisions, providing an additional dataset for appeals modelling. PropTech companies including Glenigan, Barbour ABI, and LandInsight have built planning intelligence products on similar principles. Use cases: site acquisition risk assessment, development appraisal, planning consultant workload prioritisation. Limitations: planning decisions involve significant officer and committee subjectivity; recent changes to the NPPF (2024 revision) or Local Plan adoption can shift decision patterns rapidly, causing model drift. Cross-LPA generalisation is challenging given significant local policy variation.",
    relatedTerms: ["automated-valuation-model", "epc-rating-ml", "property-data-enrichment", "model-drift"],
    relatedService: "machine-learning",
    relatedNichePage: "/services/machine-learning",
  },
  {
    slug: "leasehold-valuation-ml",
    termUk: "Оцінка лізгольду за допомогою ML",
    termEn: "Leasehold Valuation ML",
    category: "ai",
    shortDescription: "ML models for valuing leasehold properties and lease extension premiums, accounting for ground rent, unexpired term, and landlord-specific factors under RICS and Leasehold Reform Act frameworks.",
    fullDescription: "England and Wales have a substantial leasehold property stock — approximately 5 million leasehold flats and houses. Leasehold valuation is complex: value is materially affected by unexpired lease term (properties with fewer than 80 years become significantly harder to mortgage), ground rent level and escalation terms, service charge history, and freeholder/managing agent reputation. The Leasehold Reform (Ground Rent) Act 2022 banned ground rents on new leases; the Leasehold and Freehold Reform Act 2024 reformed lease extension and enfranchisement rights.\n\nML approaches to leasehold valuation extend Automated Valuation Models (AVMs) with leasehold-specific features: unexpired lease term (years), current ground rent, ground rent review clauses (doubling, RPI-linked, fixed percentage), major works liability, and building safety remediation status under the Building Safety Act 2022. RICS guidance on leasehold valuation (VIP 11) and the Upper Tribunal Lands Chamber (UTLC) decision database provide training data for lease extension premium prediction.\n\nKey challenges: the Leasehold Reform (Ground Rent) Act 2022 and Building Safety Act 2022 introduced significant structural changes that cause historical training data to be partially stale. The cladding/EWS1 crisis (post-Grenfell Tower) introduced building safety risk as a major value driver for high-rise leaseholders — requiring integration of EWS1 status and Building Safety Fund data into models. RICS Red Book compliant formal valuations still require a RICS-registered valuer; ML models are used for indicative screening and portfolio analytics.",
    relatedTerms: ["automated-valuation-model", "epc-rating-ml", "mortgage-affordability-ml", "property-data-enrichment"],
    relatedService: "machine-learning",
    relatedNichePage: "/services/machine-learning",
  },
  {
    slug: "rental-yield-prediction-ml",
    termUk: "Прогнозування орендної прибутковості (ML)",
    termEn: "Rental Yield Prediction ML",
    category: "ai",
    shortDescription: "ML models that predict gross and net rental yields for buy-to-let properties, integrating Rightmove/Zoopla rental data, Local Housing Allowance rates, and operating cost models.",
    fullDescription: "Rental yield prediction combines property valuation (purchase price or AVM estimate) with rental income prediction (achieved rent per comparable property and period). Gross yield is simply annual rent / property value; net yield deducts voids, management fees, maintenance, insurance, mortgage costs, and taxes. ML models must predict both components: achievable rent and likely operating costs.\n\nTraining data sources: Rightmove and Zoopla advertised rental listings (scraped or via data partnerships), Valuation Office Agency (VOA) private rental market statistics, Land Registry price paid data for purchase values, and Local Housing Allowance (LHA) rates published by the Rent Service Scotland / Valuation Office Agency for England and Wales. LHA rates are significant: they define the maximum Housing Benefit / Universal Credit housing element for private renters, effectively setting a floor price in many lower-demand markets.\n\nKey UK-specific features: Article 4 direction status (removes permitted development rights, affecting HMO licensing), selective/additional/mandatory HMO licensing area indicators, flood risk zone (affects insurance cost), and proximity to universities or hospitals (demand proxy). Tax considerations have significantly affected buy-to-let economics since the Section 24 mortgage interest relief restriction (phased in 2017-2020) — net yield models must account for the investor's marginal tax rate to produce after-tax yield estimates. PropTech platforms including GetAgent, Mashroom, and Property Loop use rental yield analytics as core features.",
    relatedTerms: ["automated-valuation-model", "epc-rating-ml", "leasehold-valuation-ml", "mortgage-affordability-ml"],
    relatedService: "machine-learning",
    relatedNichePage: "/services/machine-learning",
  },
  {
    slug: "mortgage-affordability-ml",
    termUk: "Оцінка доступності іпотеки (ML)",
    termEn: "Mortgage Affordability ML",
    category: "ai",
    shortDescription: "ML models used by lenders and brokers to assess mortgage affordability, stress-test applications against FCA MCOB rules, and predict application outcomes using income, expenditure, and credit data.",
    fullDescription: "Mortgage affordability assessment in the UK is governed by FCA Mortgage Conduct of Business (MCOB) rules, which require lenders to conduct a thorough affordability assessment and stress-test repayments at a higher interest rate (typically SVR + 3%) to ensure affordability if rates rise. The Financial Policy Committee (FPC) previously required lenders to stress-test at 3% above prevailing rate for new mortgages (this FPC recommendation was withdrawn in 2022 but lenders maintain internal stress-tests).\n\nML applications in mortgage affordability span several use cases: early-stage eligibility screening (can the applicant likely afford this mortgage before full application?), income verification and validation (detecting income manipulation or errors in application data), expenditure categorisation from Open Banking transaction data (Consumer Duty compliance requires comprehensive expenditure assessment), and application outcome prediction for brokers (which lender and product is this applicant most likely to be approved for?).\n\nOpen Banking (PSD2 / UK Open Banking Implementation Entity standards) has been transformative: lenders can now access 12+ months of verified transaction history via API, enabling ML-based income stability scoring and expenditure analysis that is far more accurate than paper payslips. ONS household income and expenditure statistics provide benchmarking data for expenditure normalisation by household size and geography. Challenges: FCA Consumer Duty requirements mean that AI-assisted affordability assessments must demonstrably serve consumer interests; automated rejection systems require explanation under GDPR Article 22; and model fairness audits must ensure protected characteristic groups are not systematically disadvantaged.",
    relatedTerms: ["automated-valuation-model", "rental-yield-prediction-ml", "leasehold-valuation-ml", "credit-scoring"],
    relatedService: "machine-learning",
    relatedNichePage: "/services/machine-learning",
  },

  // === TELECOM ML ===
  {
    slug: "churn-propensity-telecom",
    termUk: "Схильність до відтоку (телеком)",
    termEn: "Telecom Churn Propensity Modelling",
    category: "ai",
    shortDescription: "ML models that predict which telecom customers are likely to switch provider, enabling proactive retention interventions — trained on usage, contract, and complaint data from UK mobile and broadband markets.",
    fullDescription: "Customer churn in UK telecoms is significant: OFCOM's annual Connected Nations and Switching reports show approximately 15-20% of mobile customers switch provider or tariff annually. The Gaining Provider Led (GPL) switching process introduced by OFCOM for broadband (2023) and mobile makes switching easier, increasing churn risk for incumbents including BT, Virgin Media O2, Sky, and TalkTalk.\n\nTelecom churn models use survival analysis (Cox proportional hazards, Kaplan-Meier estimators) as well as gradient-boosted classifiers. Survival analysis is often preferred because it models time-to-churn rather than binary churn within a window, enabling nuanced retention timing. Key features: contract months remaining, ARPU trend, data usage trajectory, complaint history, NPS score, billing incidents, device age (for handset contracts), and competitor offer exposure (from digital campaign data or Decisioning platforms).\n\nOf the UK's major operators — BT/EE, Virgin Media O2, Vodafone, Three — each operates distinct retention analytics capabilities. MVNOs (Mobile Virtual Network Operators) such as Lebara, giffgaff, and SMARTY have smaller teams but often use cloud ML platforms (AWS SageMaker, GCP Vertex AI) with pre-built churn model templates. OFCOM's switching data and consumer experience tracker provide industry-level benchmark data. Retention intervention channels: proactive outbound call, SMS/push offer, app-based retention journey, and agent assist scripts triggered by churn score in CRM (Salesforce/Microsoft Dynamics).",
    relatedTerms: ["customer-health-score", "customer-ltv-telecom", "nps-prediction-telecom", "survival-analysis"],
    relatedService: "machine-learning",
    relatedNichePage: "/services/machine-learning",
  },
  {
    slug: "network-anomaly-detection-ml",
    termUk: "Виявлення аномалій у мережі (ML)",
    termEn: "Network Anomaly Detection ML",
    category: "ai",
    shortDescription: "ML systems that detect abnormal patterns in telecom network traffic and infrastructure metrics — identifying faults, security incidents, and service degradation in real time across 5G and fixed-line networks.",
    fullDescription: "Network anomaly detection applies unsupervised and semi-supervised ML to Network Operations Centre (NOC) telemetry streams: SNMP traps, NetFlow/sFlow traffic data, SCADA system metrics, and 5G network function performance counters. The goal is to identify deviations from normal behaviour that indicate faults, security incidents (DDoS, BGP hijacking, SIM-swap fraud), or service degradation — often before customer complaints surface.\n\nUK operators including O2 (VMO2), Three UK, and BT Openreach operate large-scale NOC environments processing millions of metrics per second. 5G network slicing introduces new complexity: each slice (eMBB, URLLC, mMTC) has distinct traffic profiles and SLA thresholds; anomaly detection must be slice-aware. ML approaches include Isolation Forest (unsupervised outlier detection), LSTM autoencoders (time-series reconstruction error as anomaly score), and Prophet-based forecasting with residual anomaly flagging.\n\nSCADA integration is critical for fixed-line infrastructure: Openreach's copper and fibre network uses SCADA systems to monitor cabinet temperatures, power systems, and line quality metrics. ML models correlating SCADA events with fault tickets enable predictive maintenance — scheduling engineer visits before customer-affecting failures occur. NCSC (National Cyber Security Centre) guidance on telecoms network security and the Telecoms Security Act 2021 (implementing NIS-equivalent requirements for operators) create regulatory drivers for robust anomaly detection capability. Real-time inference requirements typically mean edge deployment (close to network nodes) or streaming ML on Apache Kafka/Flink pipelines.",
    relatedTerms: ["churn-propensity-telecom", "spectrum-management-ml", "time-series-forecasting", "anomaly-detection"],
    relatedService: "machine-learning",
    relatedNichePage: "/services/machine-learning",
  },
  {
    slug: "customer-ltv-telecom",
    termUk: "Довічна цінність клієнта (телеком)",
    termEn: "Customer Lifetime Value — Telecom",
    category: "ai",
    shortDescription: "Predictive ML models for estimating the total net revenue a telecom customer will generate over their lifetime — integrating ARPU, churn probability, upgrade likelihood, and cross-sell propensity.",
    fullDescription: "Customer Lifetime Value (CLTV) in telecoms is the present value of expected future net revenue from a customer relationship. For UK mobile operators, CLTV models integrate: current ARPU (Average Revenue Per User), churn probability over a 12-36 month horizon (from churn propensity models), handset upgrade cycle timing, cross-sell propensity (SIM-only to handset, broadband bundle, TV add-ons), and cost-to-serve (care contacts, network usage, fulfilment cost).\n\nCohort analysis is the traditional approach: customers with similar acquisition channel, tariff, and device at join are grouped; revenue and churn observed over time produces cohort LTV curves. ML extends this with individual-level prediction using gradient-boosted models trained on historical customer trajectories. Survival analysis outputs (expected tenure) combine with ARPU trajectory forecasts to produce monetisation-weighted LTV estimates.\n\nUK MVNO models differ significantly from MNO models: MVNOs (giffgaff, Smarty, VOXI) typically have lower ARPU, higher churn, lower cost-to-serve, and different cross-sell opportunities. CLTV models must be calibrated per segment. Regulatory context: OFCOM Fairness for Loyal Customers intervention (2020) required operators to offer out-of-contract customers better deals — this structurally reduced long-tail ARPU from inertia customers, compressing historical CLTV model assumptions. CLTV is used for: customer acquisition cost (CAC) budgeting per channel, retention intervention investment thresholds, customer segmentation for marketing spend allocation, and M&A due diligence (subscriber base valuation).",
    relatedTerms: ["churn-propensity-telecom", "nps-prediction-telecom", "customer-health-score", "dynamic-pricing"],
    relatedService: "machine-learning",
    relatedNichePage: "/services/machine-learning",
  },
  {
    slug: "spectrum-management-ml",
    termUk: "Управління спектром за допомогою ML",
    termEn: "Spectrum Management ML",
    category: "ai",
    shortDescription: "ML and reinforcement learning approaches for optimising radio spectrum allocation, enabling dynamic spectrum access, interference prediction, and cognitive radio systems regulated by OFCOM.",
    fullDescription: "Radio spectrum is a finite, licensed resource managed in the UK by OFCOM under the Wireless Telegraphy Act 2006. Traditional static spectrum licensing assigns fixed frequency bands to operators; ML-enabled Dynamic Spectrum Access (DSA) allows opportunistic use of underutilised spectrum — a key enabler of efficient 5G deployment and IoT connectivity.\n\nOFCOM's Shared Access Licence scheme (launched 2019) formalised DSA for the 1800 MHz and 2300 MHz bands; OFCOM's Spectrum Management Strategy 2017 identified ML/AI as a key tool for future spectrum management. Cognitive radio systems use ML to sense spectrum occupancy, predict interference, and select optimal channels in real time. Reinforcement learning (RL) is well-suited to dynamic spectrum allocation: the agent (base station or spectrum controller) observes current occupancy, takes allocation actions, and receives rewards based on throughput and interference metrics.\n\nUK research context: Ofcom's Spectrum Management Labs and UK universities (University of Surrey 5GIC, King's College London) conduct active research in ML-based spectrum management. The Open RAN (O-RAN) architecture, being trialled by BT and Vodafone in the UK, introduces xApps and rApps — small ML applications that run on the RAN Intelligent Controller (RIC) to optimise spectrum scheduling in real time. Satellite communications (OneWeb, Eutelsat operating from UK ground stations) also apply ML for interference avoidance and beam management. Challenges: spectrum ML models must operate with extremely low latency (sub-millisecond in 5G NR scheduling) and handle rapidly changing RF environments.",
    relatedTerms: ["network-anomaly-detection-ml", "churn-propensity-telecom", "reinforcement-learning", "edge-ai"],
    relatedService: "machine-learning",
    relatedNichePage: "/services/machine-learning",
  },
  {
    slug: "nps-prediction-telecom",
    termUk: "Прогнозування NPS/CSAT (телеком)",
    termEn: "NPS/CSAT Prediction — Telecom",
    category: "ai",
    shortDescription: "ML models that predict Net Promoter Score and customer satisfaction for telecom customers without requiring a survey, using behavioural signals, complaint history, and Voice of Customer analytics.",
    fullDescription: "Net Promoter Score (NPS) and Customer Satisfaction (CSAT) surveys are costly to administer at scale and suffer from low response rates and response bias — typically only 5-15% of customers respond. Predictive NPS/CSAT models infer satisfaction scores for the entire customer base using observed behavioural signals, enabling proactive intervention without survey dependency.\n\nVoice of Customer (VOC) analytics for UK telecoms draws on: call centre transcript sentiment analysis (speech-to-text + NLP), social media mention sentiment (Twitter/X, Trustpilot, Google Reviews), complaint ticket text classification, digital self-service journey completion rates, billing incident frequency, and OFCOM complaints data (OFCOM publishes comparative complaints data by operator quarterly). The UK Telecoms Ombudsman (CISAS and Ombudsman Services) adjudicated complaint data provides additional signal for high-distress customer identification.\n\nML approach: a regression model predicts NPS score (0-10 scale) from behavioural features, trained on the subset of customers who did respond to surveys. SHAP analysis identifies which features drive low predicted NPS, enabling targeted service recovery. Text-based NPS prediction uses transformer models (fine-tuned BERT/DistilBERT) on call transcripts and complaint text. Integration with CRM (Salesforce Service Cloud, Microsoft Dynamics) enables predicted NPS scores to surface in agent desktop, triggering retention scripts or escalation workflows for at-risk customers.",
    relatedTerms: ["churn-propensity-telecom", "customer-ltv-telecom", "sentiment-analysis", "customer-health-score"],
    relatedService: "machine-learning",
    relatedNichePage: "/services/machine-learning",
  },

  // === ADVANCED NLP ===
  {
    slug: "named-entity-recognition-uk",
    termUk: "Розпізнавання іменованих сутностей (UK NER)",
    termEn: "Named Entity Recognition — UK Context",
    category: "nlp",
    shortDescription: "NLP models trained to extract UK-specific entities from text: company names, UK postcodes, NHS numbers, Companies House registration numbers, FCA reference numbers, and legal citations.",
    fullDescription: "Named Entity Recognition (NER) identifies and classifies named entities in text into predefined categories. General-purpose NER models (spaCy en_core_web_trf, BERT-base-NER) recognise standard categories — PERSON, ORG, GPE, DATE, MONEY — but lack UK-specific entity types critical for legal, financial, and public sector applications.\n\nUK-specific entity types requiring custom NER training or rule-based extension include: UK postcodes (regex-extractable but contextually ambiguous), Companies House registration numbers (8-digit format), FCA Firm Reference Numbers (FRN), VAT numbers (GB + 9 digits), NHS numbers (10-digit format with Luhn-like check digit), National Insurance numbers (two letters + six digits + one letter), sort code and account number patterns, planning application references (LPA-specific formats), and legal citations (EWCA Civ, EWHC, UKSC format patterns).\n\nSpaCy provides an Entity Ruler component for rule-based entity addition alongside statistical models. Hugging Face has UK-specific BERT variants fine-tuned on legal and financial corpora. Legal NER is a growing research area: the LAWTEXT project and LexisNexis UK have invested in legal citation and party name extraction. UK GDPR special category data extraction (health conditions, political opinions) requires careful NER design with strict access controls and lawful basis documentation. Practical application: document processing pipelines for UK law firms extract party names, case citations, dates, and monetary values from contracts and correspondence at scale using custom spaCy pipelines.",
    relatedTerms: ["coreference-resolution", "dependency-parsing", "semantic-similarity-uk", "zero-shot-classification-uk"],
    relatedService: "nlp",
    relatedNichePage: "/services/artificial-intelligence",
  },
  {
    slug: "coreference-resolution",
    termUk: "Вирішення кореференції",
    termEn: "Coreference Resolution",
    category: "nlp",
    shortDescription: "NLP task of identifying when different words or phrases in a document refer to the same real-world entity — critical for document understanding, information extraction, and legal contract analysis.",
    fullDescription: "Coreference resolution determines which noun phrases (mentions) in a document co-refer — that is, refer to the same real-world entity. A document may refer to 'the Claimant', 'Mr Smith', 'he', and 'the employee' all meaning the same person; resolving these co-references is essential for accurate information extraction, question answering, and document summarisation.\n\nIn UK legal document processing, coreference resolution is particularly valuable: contracts use defined terms ('the Company', 'the Vendor', 'the Property') that must be consistently resolved to extract obligations, rights, and conditions accurately. Employment tribunal judgments, tenancy agreements, and commercial contracts all exhibit dense coreference patterns. Inaccurate coreference causes downstream NLP errors: an obligation attributed to the wrong party, or a condition applied to the wrong asset.\n\nAlgorithmic approaches: the Stanford CoreNLP system provides rule-based coreference; neural approaches include the AllenNLP implementation of the Lee et al. span-based coreference model and SpanBERT-based models. Hugging Face spaCy-experimental coref pipeline provides transformer-based coreference as a spaCy component. UK legal AI companies including Luminance, Kira Systems (now Litera), and Eigen Technologies have invested heavily in coreference for contract review automation — a significant UK legal tech market segment. Pronoun coreference resolution also has fairness implications: misattributing pronouns in HR or legal contexts can introduce gender bias into extracted information.",
    relatedTerms: ["named-entity-recognition-uk", "dependency-parsing", "semantic-similarity-uk", "zero-shot-classification-uk"],
    relatedService: "nlp",
    relatedNichePage: "/services/artificial-intelligence",
  },
  {
    slug: "semantic-similarity-uk",
    termUk: "Семантична схожість (UK контекст)",
    termEn: "Semantic Similarity — UK Legal & Financial",
    category: "nlp",
    shortDescription: "NLP technique for measuring how closely two text passages mean the same thing, using sentence transformer embeddings — widely used in UK legal document matching, regulatory compliance checking, and contract clause comparison.",
    fullDescription: "Semantic similarity goes beyond keyword matching to measure conceptual equivalence between text passages. Two clauses may be semantically similar without sharing keywords: 'the vendor warrants clear title' and 'the seller confirms unencumbered ownership' express the same legal obligation with different vocabulary. Sentence transformer models (SBERT, all-MiniLM-L6-v2, all-mpnet-base-v2, legal domain fine-tuned models) produce dense vector embeddings where cosine similarity reflects semantic closeness.\n\nUK legal and financial applications are among the most commercially developed. Contract clause comparison: law firms and in-house legal teams use semantic similarity to find clauses in new contracts that are semantically equivalent (or dangerously different) from standard positions — identifying non-standard indemnity terms, unusual limitation of liability clauses, or missing standard boilerplate. Regulatory compliance checking: FCA supervisory statements, PRA policy statements, and FRC accounting standards can be compared against firm policies to identify coverage gaps. Case law research: semantic search over UK judgments (BAILII corpus) retrieves precedent cases by legal principle rather than keyword.\n\nSentence transformers for UK legal text should be fine-tuned on UK legal corpora; US-trained models may underperform on UK-specific terminology (barrister vs attorney, leasehold, solicitor). The Legal AI Lab at University College London and Oxford Internet Institute have published research on UK legal semantic similarity benchmarks. Practical pipeline: document chunking (fixed or semantic), embedding generation, FAISS or pgvector nearest-neighbour retrieval, re-ranking with a cross-encoder model. This is the foundation of most RAG implementations in UK legal tech.",
    relatedTerms: ["named-entity-recognition-uk", "coreference-resolution", "dependency-parsing", "rag"],
    relatedService: "nlp",
    relatedNichePage: "/services/artificial-intelligence",
  },
  {
    slug: "dependency-parsing",
    termUk: "Синтаксичний аналіз залежностей",
    termEn: "Dependency Parsing",
    category: "nlp",
    shortDescription: "NLP technique that analyses the grammatical structure of a sentence, identifying syntactic relationships between words — enabling extraction of obligations, parties, and conditions from UK legal contracts.",
    fullDescription: "Dependency parsing assigns a syntactic structure to a sentence, identifying the grammatical relationships (subject, object, modifier, complement) between each word and its head. The result is a directed tree: 'the Tenant shall pay the rent monthly' parses to reveal 'Tenant' as the subject, 'pay' as the root verb, 'rent' as the object, and 'monthly' as the temporal modifier. This grammatical structure is essential for structured information extraction from contractual and regulatory text.\n\nIn UK legal document analysis, dependency parsing enables obligation extraction: identifying who (subject/party) must do what (verb/action) to whom (object/counterparty) by when (temporal) under what conditions (conditional clause). This is the basis for contract lifecycle management (CLM) AI features in products like Juro, Summize, and ContractPodAi — UK-founded legal tech companies. Regulatory obligation extraction from FCA Handbook provisions, GDPR Articles, or ICO guidance similarly relies on dependency structure to identify duty-bearing entities and required actions.\n\nSpaCy's en_core_web_trf model provides high-quality dependency parsing for English legal text. The Universal Dependencies (UD) annotation standard is used across 100+ languages, enabling multilingual pipelines. For UK contract analysis, specific dependency patterns (modal verbs 'shall', 'must', 'may' + subject + verb phrase) are used as obligation/permission/prohibition classifiers. Combining dependency parsing with NER and coreference resolution produces a full information extraction pipeline capable of populating structured contract databases from unstructured documents — a core capability of UK legal AI platforms.",
    relatedTerms: ["named-entity-recognition-uk", "coreference-resolution", "semantic-similarity-uk", "zero-shot-classification-uk"],
    relatedService: "nlp",
    relatedNichePage: "/services/artificial-intelligence",
  },
  {
    slug: "zero-shot-classification-uk",
    termUk: "Класифікація без навчання (zero-shot, UK)",
    termEn: "Zero-Shot Classification — UK Regulatory Text",
    category: "nlp",
    shortDescription: "NLP technique using BART or DeBERTa models to classify text into categories without labelled training examples — enabling rapid categorisation of UK news, regulatory documents, and financial disclosures.",
    fullDescription: "Zero-shot classification applies natural language inference (NLI) models to classify text against arbitrary label sets without task-specific fine-tuning. The model evaluates whether each candidate label is entailed by the input text using a hypothesis template: 'This text is about [label].' Models fine-tuned on MNLI (Multi-Genre Natural Language Inference) — including facebook/bart-large-mnli and microsoft/deberta-large-mnli — generalise to unseen classification tasks.\n\nUK applications are particularly valuable in regulatory and media contexts where labelled training data is scarce. FCA regulatory text categorisation: classify new PS (Policy Statements), CP (Consultation Papers), and supervisory letters into thematic categories (Consumer Duty, ESG, Operational Resilience, Financial Crime) without labelled examples. UK news categorisation: The Guardian, Reuters UK, BBC News content classified by topic, sentiment, and relevance to specific sectors for media monitoring products. Parliamentary proceedings: Hansard debates classified by policy area or SDG relevance. HMRC guidance classification for tax advisory tools.\n\nPerformance benchmarks: zero-shot classification typically achieves 60-75% accuracy vs 85-95% for fine-tuned models, but requires zero labelled data. The tradeoff is particularly attractive for: rapidly evolving regulatory taxonomies (new categories emerge constantly), low-volume document types where labelled data collection is impractical, and multi-label scenarios with large label spaces. Hugging Face pipeline API makes zero-shot classification accessible: three lines of Python with the zero-shot-classification pipeline. For UK regulatory text, DeBERTa-v3-large (Microsoft) consistently outperforms BART-large on entailment tasks according to SuperGLUE and ANLI benchmarks.",
    relatedTerms: ["named-entity-recognition-uk", "dependency-parsing", "semantic-similarity-uk", "coreference-resolution"],
    relatedService: "nlp",
    relatedNichePage: "/services/artificial-intelligence",
  },

  // === GOVERNMENT & PUBLIC SECTOR AI ===
  {
    slug: "algorithmic-impact-assessment",
    termUk: "Оцінка впливу алгоритмів (AIA)",
    termEn: "Algorithmic Impact Assessment (AIA)",
    category: "regulation",
    shortDescription: "A structured review process evaluating the potential harms, fairness risks, and accountability gaps of an algorithmic decision-making system before and after deployment — required for UK public sector AI under GDS standards.",
    fullDescription: "An Algorithmic Impact Assessment (AIA) is a systematic evaluation of the potential impacts — particularly harms, fairness risks, and accountability gaps — of an algorithmic or AI system on individuals and groups. The UK AI White Paper (March 2023) established a principles-based framework for responsible AI; the Government Digital Service (GDS) AI Standard and the accompanying guidance on algorithmic transparency require public sector bodies to conduct AIAs for systems that make or support significant decisions affecting people.\n\nThe UK Algorithmic Transparency Recording Standard (ATRS), developed by CDDO and the Centre for Data Ethics and Innovation (CDEI), requires public authorities to publish records of algorithmic tools used in decision-making. The ICO's guidance on AI and data protection requires a Data Protection Impact Assessment (DPIA) — which overlaps significantly with an AIA — for high-risk AI processing under UK GDPR Article 35. The Equality Act 2010 creates a Public Sector Equality Duty requiring consideration of protected characteristic impacts — a key dimension of AIA.\n\nAIA process typically covers: system description and purpose, data sources and quality assessment, model performance disparities across demographic groups, human oversight mechanisms, appeal and redress processes, and monitoring plan. Published UK government AIAs include DWP's fraud detection system assessment and HMRC's risk-based compliance tool documentation. The Ada Lovelace Institute and Alan Turing Institute have published detailed AIA methodology guidance. International comparison: Canada's Directive on Automated Decision-Making requires AIAs tiered by decision impact level; the EU AI Act requires conformity assessments for high-risk systems — the UK post-Brexit framework takes a lighter-touch sector-led approach.",
    relatedTerms: ["automated-decision-making-public", "govuk-ai-standard", "explainable-ai", "bias-fairness-audit"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/services/artificial-intelligence",
  },
  {
    slug: "automated-decision-making-public",
    termUk: "Автоматизоване прийняття рішень у держсекторі",
    termEn: "Automated Decision-Making — UK Public Sector",
    category: "regulation",
    shortDescription: "The use of algorithmic systems to make or substantially influence decisions about individuals in UK public services — governed by UK GDPR Article 22, DWP/HMRC deployment examples, and judicial review risk.",
    fullDescription: "Automated Decision-Making (ADM) in the UK public sector encompasses algorithmic systems that make or materially influence decisions affecting individuals — benefit eligibility, tax assessments, immigration decisions, social care allocations, and more. UK GDPR Article 22 (retained post-Brexit in the UK Data Protection Act 2018) provides individuals the right not to be subject to solely automated decisions that produce legal or similarly significant effects, unless specific exemptions apply (consent, contract necessity, or domestic law provision with suitable safeguards).\n\nKey UK deployments and controversies: DWP's Universal Credit conditionality and sanctions system uses algorithmic scoring; HMRC's Connect system performs automated tax risk assessment across 55 billion data points; the Home Office visa decision support tools; local authority algorithmic social care needs assessment tools. The 2021 Bridges v South Wales Police judicial review established that facial recognition use requires a lawful basis — a precedent relevant to broader ADM systems. The Automated Decision-Making in Courts case (R v Secretary of State for Work and Pensions) has tested the limits of ADM in benefit decisions.\n\nJudicial review risk is substantial for public sector ADM: Wednesbury unreasonableness, legitimate expectation, and procedural fairness grounds have all been used to challenge algorithmic decisions. The Joint Committee on Human Rights has recommended a statutory right to human review of public sector algorithmic decisions. Safeguards required: meaningful human review capability, explanation of decision rationale, clear appeal routes, regular equalities impact assessment. The Cabinet Office Algorithmic Transparency Recording Standard (ATRS) requires proactive publication of ADM system details.",
    relatedTerms: ["algorithmic-impact-assessment", "govuk-ai-standard", "explainable-ai", "public-sector-data-sharing-ml"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/services/artificial-intelligence",
  },
  {
    slug: "govuk-ai-standard",
    termUk: "Стандарт AI для GOV.UK",
    termEn: "GOV.UK AI Standard (10 Principles)",
    category: "regulation",
    shortDescription: "The UK government's ten-principle framework for responsible AI use across central government departments, published by CDDO — covering transparency, accountability, fairness, and human oversight requirements.",
    fullDescription: "The GOV.UK AI Standard was published by the Central Digital and Data Office (CDDO) to guide responsible AI adoption across UK central government departments. It defines ten principles that all government teams should apply when procuring, developing, or deploying AI systems: (1) understand what AI can and cannot do; (2) understand your data; (3) ensure use of AI is ethical; (4) have clarity on ownership and accountability; (5) identify the appropriate role for AI; (6) ensure transparency and explainability; (7) conduct algorithmic impact assessments; (8) ensure security and resilience; (9) monitor and evaluate regularly; (10) comply with regulations and guidelines.\n\nCDDO (Central Digital and Data Office) sits within the Cabinet Office and coordinates digital, data, and technology strategy across government. The AI Standard complements the Algorithmic Transparency Recording Standard (ATRS), the GDS Service Standard, and the National AI Strategy. Departmental implementation varies: HMRC, DWP, and DVLA have relatively mature AI governance frameworks; smaller departments are earlier in adoption.\n\nThe UK AI White Paper (March 2023) — 'A pro-innovation approach to AI regulation' — established a principles-based, sector-led regulatory framework rather than a single AI Act. The five cross-sector principles (safety/security/robustness, transparency/explainability, fairness, accountability/governance, contestability/redress) map closely to the GOV.UK AI Standard. The Frontier AI Taskforce (now UK AI Safety Institute) and DSIT (Department for Science, Innovation and Technology) lead central AI safety policy. For public sector procurement, Crown Commercial Service G-Cloud 14 framework requires AI suppliers to demonstrate alignment with these principles.",
    relatedTerms: ["algorithmic-impact-assessment", "automated-decision-making-public", "procurement-ml-crown-commercial", "public-sector-data-sharing-ml"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/services/artificial-intelligence",
  },
  {
    slug: "public-sector-data-sharing-ml",
    termUk: "Обмін даними між держструктурами для ML",
    termEn: "UK Public Sector Data Sharing for ML",
    category: "regulation",
    shortDescription: "The legal, governance, and technical frameworks enabling ML-ready data sharing across UK public sector bodies — covering DSIT National Data Strategy, NHS data opt-out, and the Digital Economy Act 2017 data-sharing gateways.",
    fullDescription: "UK public sector data sharing for ML purposes is governed by a complex multi-layer framework. The Digital Economy Act 2017 Part 5 established statutory gateways for public sector data sharing for research, statistics, fraud prevention, and debt recovery — enabling cross-departmental data flows between HMRC, DWP, ONS, and other bodies that were previously blocked by data protection concerns. The National Data Strategy (2020, updated 2021) by DSIT sets out the government's ambition for a 'pro-growth, pro-innovation' data economy.\n\nNHS data sharing has its own distinct framework: NHS England's Data Access Request Service (DARS) manages access to NHS Spine and hospital episode statistics (HES) data. The National Data Opt-Out allows NHS patients to opt out of their confidential data being used for research and planning — ML projects using NHS data must check opt-out flags before processing. The Trusted Research Environment (TRE) model — 'bring the code to the data' rather than releasing raw data — is becoming standard for sensitive public sector datasets; SAIL Databank (Wales), NHS DigiTrials, and the ONS Secure Research Service all operate TRE models.\n\nThe UK GDPR and Data Protection Act 2018 apply to personal data in public sector ML, with the public task lawful basis (Article 6(1)(e)) most commonly used. The upcoming Data (Use and Access) Bill 2025 proposes further data-sharing reforms. Information Commissioner's Office (ICO) guidance on AI and data protection, the NCSC Cyber Essentials requirements for systems processing government data, and G-Cloud 14 data residency requirements (UK-only data processing for sensitive datasets) all apply. NHS data pipeline example: ONS and NHS England linkage of SGSS (COVID test results), HES admissions, and death registry data enabled population-level epidemiological ML at a scale not possible in most countries.",
    relatedTerms: ["govuk-ai-standard", "algorithmic-impact-assessment", "automated-decision-making-public", "federated-learning"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/services/artificial-intelligence",
  },
  {
    slug: "procurement-ml-crown-commercial",
    termUk: "Закупівля ML-рішень через Crown Commercial Service",
    termEn: "ML Procurement — Crown Commercial Service & G-Cloud",
    category: "regulation",
    shortDescription: "The UK government procurement routes for AI and ML services — G-Cloud 14, Digital Outcomes and Specialists (DOS), and Crown Commercial Service frameworks — including social value requirements and SME access obligations.",
    fullDescription: "UK public sector bodies procuring AI and ML services must follow Public Contracts Regulations 2015 (PCR 2015) and the new Procurement Act 2023 (effective February 2025), which modernised public procurement rules. The primary commercial routes managed by Crown Commercial Service (CCS) for AI/ML are: G-Cloud 14 (cloud-hosted services including AI platforms, MLaaS, SaaS AI products — renewed approximately every 18 months); Digital Outcomes and Specialists 6 (DOS6, now transitioning to Digital, Data and Technology Outcomes under the new Act — for bespoke development, data science, and ML project delivery by specialist teams); and sector-specific frameworks (NHS Shared Business Services AI frameworks, ESPO Data and Analytics frameworks for education/local government).\n\nSocial Value Act 2012 (and the 2020 Policy Note requiring 10% social value weighting in central government procurements) means AI/ML suppliers must demonstrate social value contributions: employment and skills development, COVID-19 recovery support, tackling economic inequality (SME supply chain commitments, Modern Slavery Act compliance), equal opportunity, and wellbeing. SME access is a policy priority: CCS frameworks have explicit SME targets and the new Procurement Act includes transparency measures to improve SME participation. Technology Security: AI systems processing OFFICIAL or OFFICIAL-SENSITIVE data must meet Cyber Essentials Plus certification requirements; systems processing SECRET require compliance with higher standards. Data residency: many government contracts now require UK-only data processing, limiting use of hyperscaler AI services with overseas data centres unless specific contractual commitments are in place. The Government AI Safety framework and DSIT evaluation requirements add procurement evaluation criteria around model safety, bias testing, and explainability.",
    relatedTerms: ["govuk-ai-standard", "algorithmic-impact-assessment", "automated-decision-making-public", "public-sector-data-sharing-ml"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/services/artificial-intelligence",
  },
  // === PENSION & WEALTH ML ===
  {
    slug: "liability-driven-investment-ml",
    termUk: "ML для інвестицій, орієнтованих на зобов'язання (LDI)",
    termEn: "Liability-Driven Investment ML (LDI ML)",
    category: "ai",
    shortDescription: "Machine learning applied to liability-driven investment strategies for UK defined-benefit pension funds — optimising gilt and derivative exposure, stress-testing against interest rate shocks, and meeting TPR requirements post the 2022 LDI crisis.",
    fullDescription: "Liability-Driven Investment (LDI) is the dominant risk management strategy for UK defined-benefit (DB) pension schemes, designed to match the duration of assets to liabilities. The September 2022 gilt crisis — triggered by the Kwarteng mini-Budget — exposed severe vulnerabilities in leveraged LDI strategies, causing margin calls that forced emergency gilt sales and prompted Bank of England intervention. ML now plays a central role in post-crisis LDI risk management.\n\nKey ML applications: (1) Yield curve modelling — neural networks and Gaussian process regression to model the UK gilt yield curve (BoE published data) more accurately than traditional Nelson-Siegel models, especially at extreme rate movements; (2) Stress testing — scenario generation using generative models trained on historical BoE rate data, simulating tail risk events beyond historical precedent; (3) Collateral waterfall optimisation — reinforcement learning to determine optimal sequencing of collateral liquidation under margin calls; (4) Liability cashflow projection — gradient boosting models incorporating Club Vita mortality data and ONS longevity improvement factors to project scheme-specific liability cashflows more accurately than standard actuarial tables.\n\nThe Pensions Regulator (TPR) issued its LDI stress-testing guidance (2023) requiring DB schemes using leveraged LDI to maintain resilience buffers equivalent to a 250bp gilt yield rise. ML-based stress testing must be validated against these scenarios. TPR's DB funding code (effective 2024) introduced long-term funding targets and fast-track vs bespoke funding pathways, both with ML-relevant data requirements. Investment consultants (Mercer, Aon, WTW) and LDI managers (Legal and General, Insight Investment, BlackRock) are the primary deployers of LDI ML in the UK market.",
    relatedTerms: ["longevity-swap-pricing-ml", "alm-pension-ml", "esg-factor-investing-ml", "quantum-machine-learning"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/ai/fintech",
  },
  {
    slug: "longevity-swap-pricing-ml",
    termUk: "ML для ціноутворення свопів довголіття",
    termEn: "Longevity Swap Pricing ML",
    category: "ai",
    shortDescription: "Machine learning models for pricing longevity swaps and bulk annuities in the UK insurance market — incorporating Club Vita pensioner mortality data, PRA SS6/16 longevity risk requirements, and insurer internal model calibration.",
    fullDescription: "Longevity swaps and bulk annuity transactions (buy-ins and buyouts) allow UK DB pension schemes to transfer longevity risk to insurers and reinsurers. The UK bulk annuity market has grown to over GBP 50 billion per year (2023 record), making accurate longevity pricing a commercially critical ML problem.\n\nThe core challenge is mortality modelling at the individual scheme level. Aggregate ONS life tables are insufficient — a pension scheme's membership may have materially different mortality characteristics based on occupation, socioeconomic profile, and geography. Club Vita, a longevity data-sharing club operated by Hymans Robertson, pools anonymised mortality data from 300+ UK pension schemes to enable scheme-specific mortality calibration. ML applications: (1) Cause-of-death attribution models that decompose mortality improvements by cause, allowing stress scenarios for pandemic risk or medical advancement; (2) Improvement rate forecasting — LSTM and transformer models trained on ONS death registration data and CMI (Continuous Mortality Investigation) improvement tables; (3) Basis risk quantification — gradient boosting to measure divergence between scheme-specific and population-level mortality.\n\nThe PRA's Supervisory Statement SS6/16 governs insurers' internal model calibration for longevity risk under Solvency II (retained post-Brexit as the UK Solvency regime). Insurers must demonstrate that longevity assumptions are 'best estimate' with appropriate margins. The proposed Solvency UK reform (Matching Adjustment changes) has increased capital available for illiquid asset investment, expanding the universe of assets longevity insurers can hold — creating new ML problems around matching adjustment eligibility assessment and cashflow projection.",
    relatedTerms: ["liability-driven-investment-ml", "alm-pension-ml", "causal-inference-ml"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/ai/fintech",
  },
  {
    slug: "alm-pension-ml",
    termUk: "ML для управління активами та пасивами пенсійних фондів (ALM)",
    termEn: "Asset-Liability Management ML (Pension ALM ML)",
    category: "ai",
    shortDescription: "ML-enhanced asset-liability management for UK pension funds — dynamic duration matching, immunisation strategy optimisation, and PPF levy minimisation using predictive models on scheme funding level trajectories.",
    fullDescription: "Asset-Liability Management (ALM) for UK defined-benefit pension schemes involves constructing and rebalancing an investment portfolio so that asset cashflows match liability cashflows under a range of economic scenarios. ML enhances traditional actuarial ALM in several dimensions.\n\nDuration matching and immunisation: ML models predict the interest rate sensitivity of liabilities more accurately by incorporating non-linear relationships between gilt yields, inflation swaps, and liability present value — particularly important for schemes with complex benefit structures (RPI/CPI-linked tranches, discretionary increases, GMP equalisation). Reinforcement learning is used to optimise dynamic de-risking glidepaths — automatically adjusting equity/bond allocation as funding level improves, targeting specified funding ratios at a target date.\n\nPPF levy optimisation: The Pension Protection Fund (PPF) charges schemes an annual levy with two components: scheme-based levy (flat rate) and risk-based levy (proportional to underfunding risk and insolvency risk of sponsor). The risk-based levy uses Experian-scored employer insolvency probability and the scheme funding level. ML models trained on scheme funding data and employer financial metrics can identify levy-reduction strategies: certification of asset-backed contributions, contingent assets (parent guarantees, escrow accounts), or accelerated deficit repair contributions — each of which reduces the levy calculation inputs. Schemes with strong ML-supported ALM governance have demonstrated levy reductions of 15-30% vs unoptimised peers.",
    relatedTerms: ["liability-driven-investment-ml", "longevity-swap-pricing-ml", "esg-factor-investing-ml"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/ai/fintech",
  },
  {
    slug: "esg-factor-investing-ml",
    termUk: "ML для ESG-факторного інвестування",
    termEn: "ESG Factor Investing ML",
    category: "ai",
    shortDescription: "Machine learning applied to ESG (Environmental, Social, Governance) factor construction and portfolio optimisation — covering TCFD climate scenario analysis, UK Green Finance Strategy requirements, and MSCI/Sustainalytics ESG rating ML pipelines.",
    fullDescription: "ESG factor investing uses environmental, social, and governance metrics as systematic return drivers alongside traditional factors (value, momentum, quality). ML is transforming how ESG signals are constructed, aggregated, and validated.\n\nUK regulatory context: The Taskforce on Climate-related Financial Disclosures (TCFD) framework became mandatory for UK listed companies, large private companies, and pension schemes via a phased implementation (2021-2023). The FCA's ESG sourcebook (PS22/3) requires asset managers to make anti-greenwashing disclosures and substantiate ESG claims. The UK Sustainability Disclosure Requirements (SDR) and investment labels regime (PS23/16) create four labelled fund categories (Sustainability Focus, Improvers, Impact, Mixed Goals) each requiring ML-verifiable portfolio characteristics.\n\nESG data ML pipeline: (1) Alternative data ingestion — satellite imagery for deforestation scoring, NLP on regulatory filings for governance risk, supply chain graph analysis for Scope 3 emissions estimation; (2) Rating aggregation — MSCI, Sustainalytics, ISS, and Refinitiv ratings diverge substantially; ensemble ML models that weight ratings by prediction task (return attribution vs risk factor) outperform single-provider approaches; (3) Climate scenario modelling — NGFS (Network for Greening the Financial System) scenario data integrated with company-level transition risk scoring using ML; (4) Engagement outcome prediction — NLP models predicting the probability that shareholder engagement on specific ESG topics will succeed, informing voting and engagement strategy. UK Green Finance Strategy (2023) targets making the UK a global hub for ESG data and verification — driving demand for ML-based ESG analytics.",
    relatedTerms: ["liability-driven-investment-ml", "alm-pension-ml", "causal-inference-ml", "federated-learning-uk"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/ai/fintech",
  },
  // === SPORTS ANALYTICS ML ===
  {
    slug: "expected-goals-model",
    termUk: "Модель очікуваних голів (xG)",
    termEn: "Expected Goals Model (xG)",
    category: "ai",
    shortDescription: "Statistical and deep learning models estimating the probability a shot results in a goal, using spatial position, shot type, and match context — widely used in Premier League analysis using StatsBomb and Opta event data.",
    fullDescription: "Expected Goals (xG) is the foundational metric of modern football analytics, estimating the probability that any given shot will result in a goal based on historical shot outcomes. A shot from 6 yards out in the centre of the goal has an xG of approximately 0.8; a long-range effort from 30 yards might have xG of 0.03.\n\nML model evolution: Early xG models (2012-2016) used logistic regression with features: shot distance, shot angle, shot type (header, foot), assist type (through ball, cross, set piece). Modern xG models incorporate: (1) Deep neural networks processing full spatial context — player positions at moment of shot using StatsBomb 360 data, which captures locations of all 22 players; (2) Convolutional neural networks on pitch occupancy grids; (3) Graph neural networks modelling defensive pressure as a spatial graph structure. StatsBomb and Opta (Stats Perform) are the primary data providers to Premier League clubs, providing event-level data with sub-second timestamps.\n\nPremier League applications: All 20 PL clubs now employ data science teams. Liverpool FC's partnership with StatsBomb and Brentford FC's data-first recruitment model (driven by Matthew Benham and Smartodds) are well-documented. xG models inform: player recruitment (identifying underperforming strikers whose xG significantly exceeds actual goals), tactical analysis (shot quality vs shot volume tradeoffs), pressing intensity optimisation, and set-piece design. The Premier League's own Elite Performance data platform provides clubs with standardised tracking data. GDPR considerations apply to athlete performance data — Sports and Recreation Alliance guidance and the specific FIFA/FIFPro Player Data Principles set out consent and minimisation requirements for player tracking data.",
    relatedTerms: ["player-valuation-ml", "injury-prediction-ml", "match-outcome-prediction"],
    relatedService: "data-analytics",
    relatedNichePage: "/ai/sports",
  },
  {
    slug: "player-valuation-ml",
    termUk: "ML для оцінки вартості гравців",
    termEn: "Player Valuation ML",
    category: "ai",
    shortDescription: "Machine learning models predicting football player transfer market values — using performance metrics, age curves, contract status, and market comparables from UK Football League and European transfer data, with GDPR implications for athlete data processing.",
    fullDescription: "Player transfer valuation is a high-stakes ML application: a single mispriced transfer can cost a Premier League club tens of millions of pounds. Transfermarkt crowd-sourced valuations have been shown to be surprisingly accurate (R2 ~0.85 vs actual transfer fees) but ML models improve on this, particularly for younger players and lower-league transfers.\n\nFeature engineering: Performance metrics (xG, xA, progressive carries, defensive pressure rate) normalised by league quality (via Five-Thirty-Eight's Soccer Power Index or comparable); age-performance curves (players typically peak at 25-27 for outfield positions, earlier for goalkeepers); contract length and release clause status; injury history and physical metrics from GPS tracking; social media following and commercial value indicators; positional scarcity in target club's squad (opportunity cost of not signing).\n\nModel architectures: Gradient boosting (XGBoost, LightGBM) dominate for interpretability; neural network approaches with residual connections for capturing age-trajectory non-linearities; survival analysis models for estimating remaining peak performance years. UK Football League (Championship, Leagues One and Two) data is sparser than Premier League — transfer tribunals (for out-of-contract players under 24) use a formula that ML models can help optimise. GDPR compliance for athlete ML: under UK GDPR, performance data about athletes constitutes personal data; clubs require a lawful basis (legitimate interests for squad management purposes is most common). FIFA's Clearing House provides standardised transfer data. FIFPro and PFA have raised concerns about the use of granular biometric tracking data in contract negotiations without appropriate player consent.",
    relatedTerms: ["expected-goals-model", "injury-prediction-ml", "match-outcome-prediction"],
    relatedService: "data-analytics",
    relatedNichePage: "/ai/sports",
  },
  {
    slug: "injury-prediction-ml",
    termUk: "ML для прогнозування травм спортсменів",
    termEn: "Injury Prediction ML",
    category: "ai",
    shortDescription: "Machine learning models predicting athlete injury risk from GPS load monitoring, biomechanical data, and recovery metrics — applied across Premier League clubs, British Horseracing Authority racing analytics, and FIFA FIFPRO workload guidelines.",
    fullDescription: "Injury prevention is one of the highest-ROI applications of ML in elite sport: a single hamstring injury to a key Premier League player can cost GBP 2-5 million in treatment, lost performance, and replacement costs. ML models aim to predict injury risk days to weeks in advance, enabling proactive load management.\n\nData sources: GPS tracking units (Catapult, STATSports) worn in training capture distance covered, high-speed running distance, accelerations/decelerations, and heart rate; these feed Acute:Chronic Workload Ratio (ACWR) models. Force plate measurements (vertical jump, reactive strength index) capture neuromuscular fatigue. Sleep and recovery data from wearables (Whoop, Oura rings — increasingly standard in Premier League squads). Biomarker data (creatine kinase blood tests) where clubs have sports science capability.\n\nModel types: Survival analysis (Cox proportional hazards) estimating time-to-injury given current load profile; binary classifiers (random forest, gradient boosting) predicting injury in the next 7-14 days; LSTM networks capturing temporal load patterns. A key challenge is extreme class imbalance — injuries are rare events even in elite sport. SMOTE oversampling and cost-sensitive learning are standard approaches. British Horseracing Authority (BHA) racing analytics: the BHA operates an Equine Injury Database with ML models predicting racehorse injury risk at specific courses and going conditions — informing race entry restrictions and course maintenance. FIFA and FIFPro's international match calendar dispute centres on ML evidence linking condensed fixture schedules to increased injury rates, informing the new FIFA Club World Cup scheduling debate.",
    relatedTerms: ["expected-goals-model", "player-valuation-ml", "match-outcome-prediction", "online-learning-streaming"],
    relatedService: "data-analytics",
    relatedNichePage: "/ai/sports",
  },
  {
    slug: "match-outcome-prediction",
    termUk: "ML для прогнозування результатів матчів",
    termEn: "Match Outcome Prediction ML",
    category: "ai",
    shortDescription: "Machine learning models predicting football match outcomes — combining Elo rating systems with neural network extensions, Betfair Exchange market data as a calibration signal, and UK Gambling Act 2005 compliance considerations for commercial prediction products.",
    fullDescription: "Match outcome prediction is one of the oldest sports analytics problems, with roots in Elo rating systems (originally designed for chess, adapted for football by FiveThirtyEight and club analytics teams). Modern ML approaches significantly extend beyond Elo.\n\nModel architecture: (1) Elo-based baselines: team strength ratings updated after each match result, with home advantage factor; Dixon-Coles model (1997) remains a strong baseline for Poisson goal-scoring distributions; (2) Feature-rich gradient boosting: recent form, xG-based team strength (outperforming actual goals in predictive accuracy), squad availability, travel distance, rest days, weather; (3) Graph neural networks representing the league table as a graph where edges encode head-to-head historical performance; (4) In-play prediction: models updating win probability in real-time during a match, using current score, xG accumulated, and time remaining.\n\nBetfair Exchange as calibration signal: Betfair's betting exchange provides crowd-sourced probability estimates from thousands of sophisticated bettors. Pre-match Betfair odds have been shown to be well-calibrated (approximately 2% overround after removing platform margin) and serve as a Bayesian prior or calibration target for ML models. Predicting against Betfair markets requires genuine information advantage.\n\nUK Gambling Act 2005 and regulatory context: commercial match prediction products sold to gambling operators or used for trading must comply with UK Gambling Commission (UKGC) licensing requirements. The Gambling Act 2005 Review White Paper (2023) and subsequent consultations propose affordability checks and stake limits that could affect operator profitability and thus demand for prediction technology. Data vendors (Sportradar, Stats Perform) have exclusive data supply agreements with leagues that affect ML model data access.",
    relatedTerms: ["expected-goals-model", "player-valuation-ml", "injury-prediction-ml"],
    relatedService: "data-analytics",
    relatedNichePage: "/ai/sports",
  },
  // === ADVANCED MLOPS ===
  {
    slug: "hyperparameter-optimisation",
    termUk: "Оптимізація гіперпараметрів (HPO)",
    termEn: "Hyperparameter Optimisation (HPO)",
    category: "mlops",
    shortDescription: "Automated search for optimal ML model configuration parameters — covering Bayesian optimisation with Optuna and Ray Tune, Hyperopt TPE algorithm, and governance requirements for HPO audit trails in UK regulated model environments.",
    fullDescription: "Hyperparameter optimisation (HPO) is the process of systematically searching the space of model configuration choices — learning rate, regularisation strength, network architecture, tree depth — that are not learned from training data but set before training. Manual tuning is increasingly replaced by automated HPO frameworks.\n\nKey frameworks: Optuna (preferred for Python-native ML, uses Tree-structured Parzen Estimator and CMA-ES), Ray Tune (distributed HPO integrated with Ray cluster infrastructure, supports all major ML frameworks), Hyperopt (early TPE-based framework, still widely used), Ax (Facebook's platform using Bayesian optimisation), and cloud-native solutions (AWS SageMaker Automatic Model Tuning, Azure ML Hyperdrive, Vertex AI Vizier).\n\nBayesian optimisation fundamentals: Rather than grid search (exhaustive, scales exponentially) or random search (efficient but wasteful), Bayesian optimisation builds a surrogate model (typically Gaussian Process) of the objective function and uses an acquisition function (Expected Improvement, Upper Confidence Bound) to select the next hyperparameter configuration to evaluate — balancing exploration and exploitation.\n\nUK regulated model governance: In FCA-regulated environments (banks, insurers, asset managers), HPO introduces model governance complexity. The PRA SS1/23 and FCA guidance on model risk management require that model development decisions — including hyperparameter choices — are documented with rationale, validated on out-of-sample data, and subject to independent model validation. HPO runs must be tracked (MLflow, W and B) with the final selected hyperparameters, the search space explored, and the validation metric used for selection all recorded as part of the model development audit trail. Nested cross-validation is required to avoid optimistic performance estimates from HPO.",
    relatedTerms: ["distributed-training-ml", "model-explainability-lime", "online-learning-streaming"],
    relatedService: "ml-engineering",
    relatedNichePage: "/mlops",
  },
  {
    slug: "distributed-training-ml",
    termUk: "Розподілене навчання ML-моделей",
    termEn: "Distributed Training ML",
    category: "mlops",
    shortDescription: "Techniques for training large ML models across multiple GPUs or nodes — covering PyTorch DDP and FSDP, Horovod, and UK cloud HPC resources including AWS, Azure, and the Hartree Centre national facility.",
    fullDescription: "Distributed training enables ML models too large to train on a single GPU to be trained across multiple devices or machines. Two primary parallelism strategies exist: data parallelism (each GPU holds a full model copy, processes a different data shard, gradients are aggregated) and model parallelism (model layers are split across GPUs for models too large for one device's memory).\n\nPyTorch DDP (DistributedDataParallel): the standard data-parallel approach, using NCCL backend for GPU-to-GPU communication. DDP overlaps gradient computation and communication via gradient bucketing, achieving near-linear scaling efficiency. PyTorch FSDP (Fully Sharded Data Parallel) extends DDP to shard model parameters, gradients, and optimiser states across GPUs — enabling training of models with hundreds of billions of parameters. Horovod (developed at Uber, now open-source): framework-agnostic distributed training using ring-allreduce for gradient aggregation; integrates with TensorFlow, PyTorch, and MXNet; well-supported on HPC clusters using MPI.\n\nUK cloud HPC resources: (1) AWS UK regions (eu-west-2 London, eu-west-1 Ireland) offer P4d and P5 instances with A100 and H100 GPUs, EFA networking for low-latency distributed training; (2) Azure UK South offers ND A100 v4 series with InfiniBand; (3) Hartree Centre (STFC, Daresbury): national HPC facility for UK academia and industry, offering Scafell Pike CPU cluster and JADE2 GPU cluster (63 DGX A100 nodes) — accessible via UKRI calls; (4) ARCHER2: UK national supercomputer (HPE Cray EX, 750,000 cores) for CPU-bound simulation workloads. Costs: distributed training on cloud GPUs is expensive — cost optimisation via spot instances, mixed precision training (FP16/BF16), and gradient checkpointing is standard practice.",
    relatedTerms: ["hyperparameter-optimisation", "model-explainability-lime", "quantum-machine-learning"],
    relatedService: "ml-engineering",
    relatedNichePage: "/mlops",
  },
  {
    slug: "model-explainability-lime",
    termUk: "LIME: локально-інтерпретовані пояснення моделей",
    termEn: "LIME — Local Interpretable Model-agnostic Explanations",
    category: "mlops",
    shortDescription: "LIME generates locally faithful explanations for individual ML model predictions by fitting simple interpretable models to perturbed samples — required for FCA SS1/23 model explainability and consumer-facing explanation obligations under UK GDPR Article 22.",
    fullDescription: "LIME (Local Interpretable Model-agnostic Explanations, Ribeiro et al. 2016) explains individual predictions of any black-box ML model by approximating the model locally with an interpretable surrogate. For a given input instance, LIME perturbs it (creating a neighbourhood of similar inputs), queries the black-box model for predictions on these perturbed samples, and fits a weighted linear model (or decision tree) to the local neighbourhood — with weights determined by proximity to the original instance.\n\nLIME variants: tabular LIME (features are individual columns, perturbation is random replacement with training distribution samples); text LIME (features are words or n-grams, perturbation is word removal); image LIME (features are superpixels, perturbation is superpixel occlusion). SHAP (SHapley Additive exPlanations, Lundberg and Lee 2017) has largely superseded LIME for tabular data due to stronger theoretical guarantees (Shapley values from cooperative game theory provide consistent, globally coherent attributions). LIME retains advantages for text and image explanation tasks.\n\nFCA SS1/23 (Supervisory Statement on Model Risk Management) requires firms to demonstrate that model outputs can be explained to relevant stakeholders — including model validators, senior management, and (where relevant) customers. For consumer credit decisions, UK GDPR Article 22 and the FCA's Consumer Duty (PS22/9) together create an obligation to provide meaningful explanations of automated credit decisions. LIME or SHAP explanations fed into explanation templates must be validated for faithfulness (how well the surrogate approximates the black box locally) and stability (consistent explanations for similar inputs). ICO guidance on explaining AI decisions (2020) recommends LIME/SHAP as technically sound explanation methods.",
    relatedTerms: ["hyperparameter-optimisation", "online-learning-streaming", "consumer-duty-ml", "uk-gdpr-ml-compliance"],
    relatedService: "ml-engineering",
    relatedNichePage: "/mlops",
  },
  {
    slug: "online-learning-streaming",
    termUk: "Онлайн-навчання та потокова обробка даних в ML",
    termEn: "Online Learning and Streaming ML",
    category: "mlops",
    shortDescription: "ML models that update continuously from streaming data — using the River Python library for incremental learning algorithms and Apache Kafka ML pipelines — applied to UK real-time fraud detection and financial market microstructure.",
    fullDescription: "Online (or incremental) learning refers to ML algorithms that update model parameters continuously as each new data point arrives, rather than requiring batch retraining. This is essential for applications where data distribution drifts over time or where real-time adaptation is required.\n\nRiver library: The primary Python library for online machine learning, providing incremental versions of standard algorithms: Hoeffding Trees (decision trees that grow from streaming data), ADWIN (adaptive windowing for concept drift detection), SGD-based linear models, online clustering (k-means), and online anomaly detection. River processes one sample at a time with constant memory, making it suitable for high-throughput data streams.\n\nKafka ML pipelines: Apache Kafka serves as the message broker connecting data sources to ML inference services. Architecture: Kafka producer (data source: transactions, clickstream, sensor data) -> Kafka topic -> ML inference consumer (model loaded in memory, predicts on each message) -> output topic (prediction results). Kafka Streams and ksqlDB enable feature engineering directly in the streaming layer. Faust (Robinhood) and Bytewax are Python streaming frameworks integrating with Kafka for ML pipelines.\n\nUK real-time fraud detection: UK Finance reports that authorised push payment (APP) fraud exceeded GBP 480 million in 2023. Real-time fraud scoring must operate with sub-100ms latency to integrate with Faster Payments infrastructure. Online learning models detect emerging fraud patterns (new mule account networks, new social engineering scripts) faster than weekly batch-retrained models. The PSR (Payment Systems Regulator) mandatory APP reimbursement requirement (effective October 2023) increases the financial incentive for UK banks to invest in real-time ML fraud detection. Concept drift monitoring is critical: fraud patterns shift rapidly as fraudsters adapt to detection, requiring ADWIN-style drift detectors to trigger model adaptation.",
    relatedTerms: ["hyperparameter-optimisation", "distributed-training-ml", "model-explainability-lime", "federated-learning-uk"],
    relatedService: "ml-engineering",
    relatedNichePage: "/mlops",
  },
  // === QUANTUM & EMERGING ML ===
  {
    slug: "quantum-machine-learning",
    termUk: "Квантове машинне навчання (QML)",
    termEn: "Quantum Machine Learning (QML)",
    category: "ai",
    shortDescription: "The intersection of quantum computing and ML — variational quantum circuits as differentiable models, NISQ-era limitations, and UK quantum pilots by HSBC, Barclays, and institutions in the IBM Quantum Network.",
    fullDescription: "Quantum Machine Learning (QML) explores whether quantum computers can provide computational advantages for ML tasks — either by speeding up classical ML algorithms or by enabling fundamentally new model classes. The field is in the NISQ (Noisy Intermediate-Scale Quantum) era: current quantum computers (50-1000+ qubits) have significant noise and decoherence, limiting circuit depth and the scale of useful computation.\n\nVariational quantum circuits (VQCs): The leading near-term QML approach. A VQC is a parameterised quantum circuit whose parameters are optimised by a classical outer loop (similar to neural network training via backpropagation, but using parameter-shift rules for gradient computation). PennyLane (Xanadu) and Qiskit Machine Learning (IBM) are the primary frameworks. VQCs have been applied to: quantum kernels for SVM classification, quantum neural networks for pattern recognition, quantum generative models (quantum GANs, quantum Boltzmann machines).\n\nUK quantum pilots: HSBC has published work on quantum computing for FX derivative pricing and portfolio optimisation (using quantum annealing via D-Wave). Barclays has explored quantum optimisation for trade settlement netting (reducing settlement fails). Both are members of the IBM Quantum Network, which provides cloud access to IBM quantum hardware and supports industry research. The UK National Quantum Computing Centre (NQCC, Harwell campus) opened in 2023 and provides access to quantum hardware and expertise for UK industry and academia. UKRI's National Quantum Technologies Programme funds quantum ML research at universities including Oxford, Bristol, and Imperial.\n\nHonest assessment: quantum advantage for practical ML tasks remains undemonstrated on NISQ hardware. Near-term applications are most plausible for optimisation problems with structure amenable to quantum speedup (QUBO formulations, combinatorial optimisation in logistics and finance). Fault-tolerant quantum computing — expected late 2030s at earliest — would enable Grover-accelerated search and HHL-based linear algebra, potentially transforming some ML subroutines.",
    relatedTerms: ["neuromorphic-computing-ml", "distributed-training-ml", "causal-inference-ml"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/ai/emerging",
  },
  {
    slug: "neuromorphic-computing-ml",
    termUk: "Нейроморфні обчислення для ML",
    termEn: "Neuromorphic Computing ML",
    category: "ai",
    shortDescription: "Brain-inspired computing architectures for energy-efficient ML inference — Intel Loihi spiking neural network chips, UK Turing Institute neuromorphic research, and applications in always-on edge sensors and robotics.",
    fullDescription: "Neuromorphic computing uses hardware architectures inspired by biological neural systems — event-driven, asynchronous, and massively parallel — to achieve energy efficiency orders of magnitude beyond conventional GPU-based ML inference. The fundamental unit is the spiking neuron: instead of continuous activation values, neurons fire discrete spikes when membrane potential crosses a threshold, transmitting information through spike timing and rate.\n\nIntel Loihi and Loihi 2: Intel Research's neuromorphic chips implement spiking neural networks (SNNs) with on-chip learning via spike-timing-dependent plasticity (STDP). Loihi 2 (2021) features 1 million neurons per chip, 120 million synapses, and 8x energy improvement over Loihi 1. Intel provides access to Loihi hardware through the Intel Neuromorphic Research Community (INRC). IBM TrueNorth (4096 neurosynaptic cores, 1 million neurons, 256 million synapses) demonstrated 46 giga-synaptic operations per second at 70mW power consumption. BrainScaleS-2 (Heidelberg University) and SpiNNaker2 (Manchester University/Technische Universitat Dresden) are European neuromorphic platforms.\n\nUK Turing Institute research: The Alan Turing Institute supports neuromorphic computing research through several projects, particularly for robotics (energy-efficient perception and motor control), sensor fusion for IoT devices, and event-camera vision processing. The University of Manchester has led SpiNNaker development for decades — SpiNNaker2 is a 10 million neuron system designed for large-scale neural simulation and embedded inference.\n\nApplications: Always-on keyword spotting (smart speakers, hearing aids) where battery-powered devices require sub-milliwatt inference; event-camera based vision for autonomous vehicles (event cameras, like DVS cameras from iniVation, produce asynchronous spike streams that map naturally to neuromorphic hardware); adaptive robotics control. The primary ML challenge is training SNNs — backpropagation through non-differentiable spike functions requires surrogate gradient methods.",
    relatedTerms: ["quantum-machine-learning", "distributed-training-ml", "causal-inference-ml"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/ai/emerging",
  },
  {
    slug: "causal-inference-ml",
    termUk: "Причинно-наслідковий вивід в ML",
    termEn: "Causal Inference ML",
    category: "ai",
    shortDescription: "Moving beyond correlation to causation in ML — Pearl's do-calculus and causal DAGs, DoWhy and causal forests (EconML) for treatment effect estimation, and applications in UK policy evaluation funded by UKRI.",
    fullDescription: "Causal inference addresses the fundamental limitation of correlational ML: a model may accurately predict outcomes without identifying what interventions would change them. Judea Pearl's causal hierarchy distinguishes three levels: association (observational patterns), intervention (do-calculus: what happens if we set variable X to value x?), and counterfactuals (what would have happened if X had been different?).\n\nPearl's do-calculus provides formal rules for computing interventional distributions P(Y | do(X)) from observational data when a causal DAG (Directed Acyclic Graph) is available. Identification conditions (backdoor criterion, front-door criterion, instrumental variables) determine whether causal effects are identifiable from observational data without experiments.\n\nPractical frameworks: DoWhy (Microsoft Research) provides a four-step causal inference workflow: model (specify DAG), identify (apply do-calculus rules), estimate (compute causal effect using chosen estimator), refute (test robustness with placebo tests, bootstrap). EconML (Microsoft Research) implements heterogeneous treatment effect estimators: causal forests (Wager and Athey 2018), double machine learning (DML, Chernozhukov et al. 2018), and meta-learners (T-learner, S-learner, X-learner). Causal forests extend random forests to estimate Conditional Average Treatment Effects (CATE) — the treatment effect for a specific individual given their covariates.\n\nUK policy evaluation context: UKRI funds causal inference research through ESRC (Economic and Social Research Council) and the What Works Centres network (Education Endowment Foundation, What Works Centre for Crime Reduction, etc.). The UK government's Magenta Book (HM Treasury guidance on evaluation) recommends experimental (RCT) and quasi-experimental designs; ML-enhanced causal methods (synthetic control, difference-in-differences with ML covariate selection) are increasingly used. Applications include: evaluating DWP employment programmes, NHS intervention effectiveness from linked administrative data, and HMRC tax compliance intervention analysis.",
    relatedTerms: ["quantum-machine-learning", "neuromorphic-computing-ml", "federated-learning-uk", "esg-factor-investing-ml"],
    relatedService: "data-analytics",
    relatedNichePage: "/ai/emerging",
  },
  {
    slug: "federated-learning-uk",
    termUk: "Федеративне навчання в UK (NHS та GDPR)",
    termEn: "Federated Learning UK (NHS DigiTrials, GDPR Art. 9)",
    category: "ai",
    shortDescription: "Privacy-preserving distributed ML where models train locally without sharing raw data — covering DP-SGD differential privacy, NHS DigiTrials federated research platform, UK GDPR Article 9 special category data, and the Flower federated learning framework.",
    fullDescription: "Federated learning (FL) trains ML models across multiple data-holding nodes (hospitals, banks, mobile devices) without centralising raw data. Each node trains on its local data and shares only model updates (gradients or model weights) with a central aggregator. This addresses the fundamental tension between ML's need for large diverse datasets and data protection law's restriction on data sharing.\n\nDifferential Privacy-SGD (DP-SGD, Abadi et al. 2016): Adds calibrated Gaussian noise to gradients during training to provide formal differential privacy guarantees — limiting how much any single training example influences the model. The privacy budget (epsilon) quantifies information leakage; lower epsilon means stronger privacy but noisier gradients and reduced model utility. Google's TensorFlow Privacy library and PyTorch Opacus implement DP-SGD. Secure aggregation protocols (cryptographic techniques preventing the central server from seeing individual updates) complement DP-SGD.\n\nNHS DigiTrials: NHS England's federated analytics platform enables researchers to run analyses across NHS Trusts' data without the data leaving Trust boundaries. The NHS DigiTrials pipeline uses a Trusted Research Environment model with federated query capability — enabling population-level statistics and ML model training across linked datasets (primary care, secondary care, pharmacy, genomics) while meeting NHS IG requirements. This is particularly important for rare disease research and genomics ML, where no single Trust has sufficient sample size.\n\nUK GDPR Article 9 governs special category data (health data, genetic data, biometric data). Processing for research requires explicit consent or a research exemption under Schedule 2 of the Data Protection Act 2018, with appropriate safeguards. Federated learning reduces (but does not eliminate) Article 9 risk — model inversion attacks and membership inference attacks can still extract information from model updates. Flower (Adap) framework: an open-source federated learning framework supporting PyTorch, TensorFlow, and JAX clients across heterogeneous devices; widely used in NHS and academic FL pilots.",
    relatedTerms: ["uk-gdpr-ml-compliance", "causal-inference-ml", "online-learning-streaming", "consumer-duty-ml"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/ai/healthcare",
  },
  // === UK REGULATORY ML ===
  {
    slug: "consumer-duty-ml",
    termUk: "ML та Consumer Duty FCA 2023",
    termEn: "Consumer Duty ML Compliance (FCA PS22/9)",
    category: "regulation",
    shortDescription: "How FCA Consumer Duty (PS22/9, effective July 2023) reshapes ML systems in retail financial services — fair value assessment ML, vulnerable customer identification models, and the four outcome framework applied to algorithmic pricing and product targeting.",
    fullDescription: "The FCA Consumer Duty (Policy Statement PS22/9) represents the most significant regulatory change in UK retail financial services conduct regulation in a generation. It came into force for new products on 31 July 2023 and for closed book products on 31 July 2024. The Duty requires firms to deliver good outcomes across four areas: products and services, price and value, consumer understanding, and consumer support.\n\nML implications by outcome: (1) Products and services: ML product recommendation systems must be assessed against the target market definition — if an algorithm systematically recommends unsuitable products to segments with lower financial literacy, this is a Duty breach; (2) Price and value: firms must conduct fair value assessments — ML pricing models must demonstrate that price is commensurate with the value delivered to retail customers; commission structures that ML pricing embeds must be disclosed and justified; (3) Consumer understanding: ML-generated personalised communications must be assessed for comprehension — behavioural ML that identifies customers likely to make poor decisions and targets them with complex products is a clear Duty breach; (4) Consumer support: ML-based contact centre routing must not deprioritise customers seeking to complain or exit.\n\nVulnerable customer detection: the FCA's vulnerability guidance (FG21/1) requires firms to identify and appropriately serve customers in vulnerable circumstances (health issues, life events, financial resilience, capability limitations). ML models analysing transaction patterns, communication logs, and account behaviour to identify vulnerability indicators are now standard at major UK retail banks. FCA has stated that Consumer Duty makes this a minimum expectation. Key technical challenge: vulnerability signals in data are sparse and potentially discriminatory — models must be validated for protected characteristic bias under Equality Act 2010. Firms must document their ML approach to vulnerability identification in Consumer Duty board reports.",
    relatedTerms: ["ps20-2-insurance-pricing-ml", "uk-gdpr-ml-compliance", "senior-managers-regime-ml", "model-explainability-lime"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/ai/fintech",
  },
  {
    slug: "uk-gdpr-ml-compliance",
    termUk: "Відповідність ML вимогам UK GDPR",
    termEn: "UK GDPR ML Compliance (ICO AI Guidance, Article 22)",
    category: "regulation",
    shortDescription: "How UK GDPR (retained post-Brexit Data Protection Act 2018) applies to ML systems — ICO AI and data protection guidance, Article 22 automated decision-making safeguards, and DPIA requirements for high-risk ML processing.",
    fullDescription: "UK GDPR (the EU GDPR as retained and modified by the Data Protection Act 2018 and UK GDPR SI 2020/1586) applies fully to ML systems processing personal data. Post-Brexit, the UK ICO (Information Commissioner's Office) regulates UK GDPR independently of the EU, though the two regimes remain largely aligned under the EU-UK data adequacy decision (subject to renewal review).\n\nArticle 22 safeguards: Individuals have the right not to be subject to solely automated decisions (including profiling) that produce legal or similarly significant effects, unless: (a) necessary for a contract; (b) authorised by law with suitable safeguards; or (c) based on explicit consent. Where Article 22 applies, firms must: implement suitable safeguards; provide the ability to obtain human intervention; allow the individual to express their point of view and contest the decision. The ICO's guidance on automated decision-making (2023) clarifies that 'meaningful human review' requires a genuine ability to change the outcome — a rubber-stamp review process does not satisfy Article 22.\n\nData Protection Impact Assessments (DPIAs): Article 35 requires DPIAs before processing likely to result in high risk, including systematic automated processing, large-scale special category data processing, and systematic monitoring of publicly accessible areas. The ICO's DPIA screening questions identify when ML systems require full DPIAs. Key DPIA elements for ML: data minimisation audit (are all features necessary?), bias and fairness assessment, accuracy and explainability measures, data subject rights implementation, retention and deletion procedures.\n\nLawful basis for ML training: the appropriate lawful basis depends on context. Legitimate interests (Article 6(1)(f)) is commonly used for commercial ML — but requires a balancing test documenting that legitimate interests override data subjects' interests. The Data (Use and Access) Bill 2025 proposes new lawful bases for recognised legitimate interests in research, statistics, and AI training that may streamline ML compliance.",
    relatedTerms: ["consumer-duty-ml", "ps20-2-insurance-pricing-ml", "senior-managers-regime-ml", "model-explainability-lime", "federated-learning-uk"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/services/artificial-intelligence",
  },
  {
    slug: "ps20-2-insurance-pricing-ml",
    termUk: "ML та FCA PS20/2: справедливе ціноутворення в страхуванні",
    termEn: "FCA PS20/2 — Insurance Pricing Fairness ML",
    category: "regulation",
    shortDescription: "FCA Policy Statement PS20/2 banning dual pricing and price walking in home and motor insurance — the ML implications of fair value requirements, pricing algorithm compliance, and GI pricing restrictions effective January 2022.",
    fullDescription: "FCA Policy Statement PS20/2 (General Insurance Pricing Practices, effective 1 January 2022) fundamentally changed ML-based insurance pricing in the UK. The rules ban dual pricing (charging renewing customers more than equivalent new customers for the same risk) and require firms to offer renewal prices no higher than the equivalent new business price.\n\nML pricing before PS20/2: Insurers used sophisticated ML models (gradient boosting, neural networks) to predict customer price sensitivity and willingness to switch — charging loyal customers ('price walkers') more than new customers without a risk justification. These models used tenure, renewal history, and inferred switching propensity as pricing factors alongside actuarial risk variables. Some models effectively identified customers with lower digital literacy or access as less likely to shop around, charging them higher premiums — a practice the FCA found to generate GBP 1.2 billion in harm annually.\n\nPost-PS20/2 ML compliance requirements: (1) Renewal pricing ML must demonstrate that the renewal price does not exceed the equivalent new business price — firms must maintain parallel pricing pathways and reconciliation processes; (2) Price walking monitoring: ML surveillance systems must detect emerging price walking patterns in renewal books and flag for remediation; (3) Fair value framework: pricing models must be validated against the fair value assessment — demonstrating that price reflects risk and is commensurate with product value; (4) Prohibited pricing factors: the FCA has indicated that factors proxying for protected characteristics (e.g., postcode as a proxy for ethnicity) require heightened justification. The FCA's multi-firm review (2023) found ongoing compliance gaps at several major insurers, with enforcement action possible. The Consumer Duty (PS22/9) has effectively extended PS20/2 fair value principles to all retail insurance products beyond home and motor.",
    relatedTerms: ["consumer-duty-ml", "uk-gdpr-ml-compliance", "senior-managers-regime-ml"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/ai/fintech",
  },
  {
    slug: "senior-managers-regime-ml",
    termUk: "Відповідальність SMF/SMR за ML-системи",
    termEn: "Senior Managers Regime ML Accountability (FCA SM&CR)",
    category: "regulation",
    shortDescription: "How the FCA and PRA Senior Managers and Certification Regime (SM&CR) creates personal accountability for ML model failures — designating a senior manager function for AI/ML risk, model risk ownership under MRM frameworks, and accountability mapping for algorithmic decisions.",
    fullDescription: "The Senior Managers and Certification Regime (SM&CR), introduced by the FCA and PRA following the Banking Standards Review (2016) and extended to all FCA-regulated firms (2019), creates personal accountability for individuals in senior positions at financial services firms. For ML and AI systems, SM&CR creates a governance imperative: someone must be personally accountable for model risk.\n\nSenior Manager Functions (SMFs) relevant to ML: SMF7 (Group Entity Senior Manager), SMF24 (Chief Operations Officer), and SMF2/3 (CEO/CFO) commonly hold responsibility for technology and operational risk — including ML model failures. Some firms have created specific 'Chief Data and Analytics Officer' or 'Chief AI Officer' roles mapped to SMF24 or a standalone SMF. The FCA's expectation is that the responsible SMF can demonstrate: awareness of material ML models in use; governance oversight (model inventory, model risk committee); escalation procedures for model failures; and remediation capability.\n\nFCA model risk management expectations: The FCA's 2023 multi-firm review on model risk management (drawing on PRA SS1/23) set out expectations for all FCA-regulated firms using material models — not just banks. Key requirements: model inventory and tiering (materiality-based classification); independent model validation (validation function separate from model development); model lifecycle governance (development, approval, deployment, monitoring, retirement); documented accountability mapping to SMFs.\n\nAccountability for algorithmic harms: Where an ML model causes consumer harm (e.g., discriminatory credit decisions, Consumer Duty breaches from biased pricing), the FCA can pursue enforcement action against the responsible SMF for failure of reasonable steps. This has increased board-level attention to AI governance and driven investment in model risk management infrastructure (model registers, validation teams, explainability tooling). The FCA's AI Sprint 2024 consultations signal further regulatory elaboration of SM&CR AI accountability expectations.",
    relatedTerms: ["consumer-duty-ml", "uk-gdpr-ml-compliance", "ps20-2-insurance-pricing-ml", "model-explainability-lime"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/ai/fintech",
  },

  // === BATCH 2026-06-24: PENSION/WEALTH ML, ADVANCED NLP/LLM, REGULATORY AI UK, COMPUTER VISION ADVANCED, TIME SERIES ADVANCED ===

  // --- Pension / Wealth ML ---
  {
    slug: "liability-matching-ml",
    termUk: "ML для зіставлення зобов'язань пенсійних фондів",
    termEn: "Liability Matching ML (ALM)",
    category: "ai",
    shortDescription: "ML techniques for pension liability matching — modelling interest rate sensitivity of defined-benefit liabilities, hedging ratios, and duration gaps using gradient boosting and neural network yield-curve models.",
    fullDescription: "Liability matching in UK defined-benefit (DB) pension schemes requires constructing an asset portfolio whose present value and duration respond to interest rate and inflation movements in the same way as the liability stream. Traditional actuarial approaches use simplified key-rate duration bucketing; ML enhances this in several ways.\n\nYield-curve ML models: Gaussian process regression and LSTM networks trained on Bank of England nominal and real gilt yield data produce richer duration and convexity estimates than Nelson-Siegel parameterisation, particularly at short and long ends of the curve. Neural networks can capture non-linear relationships between rate moves at different tenors, improving hedge ratio accuracy.\n\nInterest rate risk quantification: Gradient boosting models trained on historical scheme liability data (Club Vita, Willis Towers Watson actuarial records) estimate how a 100bp parallel shift affects liability present value for schemes with complex benefit structures (RPI-linked, CPI-linked, GMP, discretionary tranches).\n\nDynamic hedging: Reinforcement learning agents optimise gilt and liability-driven investment (LDI) overlay rebalancing triggers, balancing transaction costs against tracking error to liabilities. The September 2022 LDI crisis (Kwarteng mini-Budget) demonstrated that static hedging rules can fail under tail scenarios; ML-based adaptive hedging with stress-test buffers is now required under TPR guidance.\n\nUK regulatory context: The Pensions Regulator's DB Funding Code (2024) requires schemes to have a long-term funding target and a journey plan. ML models that quantify liability matching quality against the journey plan provide governance evidence for TPR supervisory engagement.",
    relatedTerms: ["liability-driven-investment-ml", "alm-pension-ml", "longevity-risk-ml", "tail-risk-management-ml"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/ai/fintech",
  },
  {
    slug: "longevity-risk-ml",
    termUk: "ML для моделювання ризику довголіття",
    termEn: "Longevity Risk Modelling ML",
    category: "ai",
    shortDescription: "ML models for longevity risk in UK pension funds and insurers — projecting cohort mortality improvements, estimating basis risk between scheme and population mortality, and supporting Solvency UK internal model calibration.",
    fullDescription: "Longevity risk — the risk that scheme members live longer than expected — is the largest single risk in UK defined-benefit pension funds and life annuity books. Accurate longevity modelling is critical for funding, bulk annuity pricing, and Solvency UK capital adequacy.\n\nMortality projection ML: Recurrent neural networks and gradient boosting models trained on Office for National Statistics (ONS) death registration data and Human Mortality Database (HMD) data project age-period-cohort (APC) mortality improvement rates. These outperform the Continuous Mortality Investigation (CMI) core projection model on recent data, particularly in capturing the post-COVID mortality dynamics (excess deaths 2020-22, bounce-back effects).\n\nScheme-specific basis risk: Population-level ONS tables do not reflect a specific scheme's membership profile. ML models trained on Club Vita's pooled annuitant data (300+ UK pension schemes, millions of life-years) estimate the basis risk between population and scheme mortality — key for longevity swap pricing and bulk annuity quotation.\n\nCause-of-death attribution: Gradient boosting classifiers applied to HSCIC (Health and Social Care Information Centre) linked mortality data decompose improvement rates by ICD-10 cause of death, enabling stress scenarios for medical breakthroughs (Alzheimer's cure) or adverse trends (obesity, antimicrobial resistance).\n\nSolvency UK internal models: Insurers underwriting bulk annuities must justify longevity assumptions to the PRA under SS6/16. ML-derived improvement rates with bootstrapped confidence intervals provide statistically grounded best-estimate assumptions with explicit uncertainty quantification, satisfying internal model documentation requirements.",
    relatedTerms: ["longevity-swap-pricing-ml", "liability-matching-ml", "alm-pension-ml", "tail-risk-management-ml"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/ai/fintech",
  },
  {
    slug: "factor-risk-model",
    termUk: "Факторні моделі ризику для управління активами",
    termEn: "Factor Risk Models (Fama-French, BARRA)",
    category: "ai",
    shortDescription: "Quantitative factor risk models that decompose portfolio returns into systematic factors (market, size, value, momentum, quality) — used by UK asset managers for risk attribution, portfolio construction, and regulatory stress testing.",
    fullDescription: "Factor risk models decompose the returns of individual securities and portfolios into exposures to systematic risk factors, allowing attribution of performance and prediction of risk. They are the quantitative backbone of modern asset management.\n\nAcademic factor models: The Fama-French three-factor model (market beta, size SMB, value HML) and five-factor extension (adding profitability RMW and investment CMA) remain academic benchmarks. Carhart's four-factor model adds momentum UMD. These are implemented in Python using the Kenneth French data library.\n\nCommercial factor models: MSCI BARRA models (Barra Global Equity Model, GEM4) are the industry standard for institutional asset managers. They decompose risk into style factors (value, growth, momentum, leverage, liquidity, volatility), industry factors, and country factors. Bloomberg's PORT Analytics and Axioma (now Qontigo) provide competing risk models. All use statistical techniques (PCA, factor rotation) to estimate the factor covariance matrix from return history.\n\nML enhancements: Deep learning models (autoencoders, VAEs) extract latent factors from high-dimensional return data without imposing predefined factor definitions. These data-driven factors can capture regime-specific risk structure that static factor models miss. Gradient boosting is used for factor return prediction (factor timing) — estimating which factors are likely to outperform over the next month based on macro signals.\n\nUK regulatory context: The FCA COBS 9A suitability rules and PRIIPs KID require investment managers to quantify and disclose portfolio risk — factor models provide the risk decomposition. Bank of England climate stress tests use factor models to estimate sector-level portfolio sensitivities to climate transition scenarios.",
    relatedTerms: ["portfolio-rebalancing-ml", "tail-risk-management-ml", "esg-factor-investing-ml"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/ai/fintech",
  },
  {
    slug: "portfolio-rebalancing-ml",
    termUk: "ML для ребалансування портфеля",
    termEn: "ML-Driven Portfolio Rebalancing",
    category: "ai",
    shortDescription: "Machine learning optimisation of portfolio rebalancing decisions — trading off tracking error, transaction costs, tax efficiency, and liquidity constraints using reinforcement learning and convex optimisation with ML-predicted inputs.",
    fullDescription: "Portfolio rebalancing is the process of realigning a portfolio's weights back towards target allocations after market movements cause drift. ML transforms rebalancing from a rules-based calendar or threshold process into an optimised continuous decision under uncertainty.\n\nReinforcement learning rebalancing: RL agents (Deep Q-Network, PPO) are trained on historical return and transaction cost data to learn optimal rebalancing policies. The reward function combines: tracking error to benchmark (minimise), transaction costs (minimise), and tax drag (minimise, e.g. avoiding short-term capital gains in ISA-wrapper funds). RL agents learn to trade off these objectives dynamically, deferring trades when transaction costs are high relative to drift magnitude.\n\nML-predicted transaction cost models: Gradient boosting models trained on historical order book data predict market impact as a function of trade size, stock liquidity (bid-ask spread, average daily volume), and market conditions. These predicted costs feed into quadratic programming optimisers (CVXPY, Mosek) that find minimum-cost rebalancing trades.\n\nTax-loss harvesting ML: In discretionary wealth management (relevant under UK CGT rules: annual exempt amount, bed-and-ISA strategies), ML identifies correlated substitute securities for tax-loss harvesting without significantly altering portfolio factor exposures. Betterment and Wealthfront pioneered this in the US; UK wealth managers (Nutmeg, Moneyfarm) apply similar ML-driven approaches within ISA and SIPP wrappers.\n\nLiquidity-constrained rebalancing: For large institutional portfolios, ML models predict instrument liquidity over the rebalancing horizon, enabling block trading schedules that minimise market impact. This is particularly important for DB pension funds executing LDI rebalancing after large gilt yield moves.",
    relatedTerms: ["factor-risk-model", "tail-risk-management-ml", "esg-factor-investing-ml", "alm-pension-ml"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/ai/fintech",
  },
  {
    slug: "tail-risk-management-ml",
    termUk: "ML для управління хвостовими ризиками (VaR, CVaR)",
    termEn: "Tail Risk Management ML (VaR, CVaR, Stress Testing)",
    category: "ai",
    shortDescription: "ML methods for quantifying and managing tail risk in financial portfolios — improving Value-at-Risk (VaR) and Conditional Value-at-Risk (CVaR) estimates beyond normal-distribution assumptions, and generating adversarial stress scenarios.",
    fullDescription: "Tail risk management quantifies the probability and magnitude of extreme losses. Traditional VaR (99th percentile loss over a horizon) and CVaR (expected loss given VaR is breached) rely on normal distribution or historical simulation assumptions that underestimate fat-tail risks during stress periods.\n\nML improvements to VaR: (1) Quantile regression forests and gradient boosting quantile regressors estimate the full return distribution non-parametrically, capturing skewness and excess kurtosis in financial returns. (2) Normalising flows and VAE generative models learn the true multivariate return distribution, enabling Monte Carlo VaR with realistic correlation structures including tail dependence. (3) LSTM models capture volatility clustering (GARCH-like dynamics) without explicit parameterisation, producing time-varying VaR estimates that respond faster to regime changes.\n\nCVaR optimisation: ML-generated scenario distributions feed into CVaR portfolio optimisation (Rockafellar-Uryasev framework). This is implementable in CVXPY as a convex problem when scenarios are discretised, producing portfolios with explicit tail-risk budgets.\n\nStress testing with generative models: Generative adversarial networks (GANs) and diffusion models trained on historical return data generate adversarial stress scenarios beyond historical experience — an FCA and PRA requirement for ICAAP (Internal Capital Adequacy Assessment Process) and pension fund stress testing. The BoE's annual banking stress test and TPR LDI stress-test guidance (250bp gilt yield scenario) provide calibration anchors.\n\nUK regulatory requirements: PRA SS1/23 requires independent validation of VaR models. The FCA's Market Risk Sensitivity (MRS) framework for trading books and ICAAP requirements for credit firms mandate regular back-testing of VaR models (Basel III: traffic-light backtesting, green/amber/red zones based on exception counts).",
    relatedTerms: ["factor-risk-model", "portfolio-rebalancing-ml", "liability-matching-ml", "longevity-risk-ml"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/ai/fintech",
  },

  // --- Advanced NLP / LLM ---
  {
    slug: "retrieval-augmented-generation",
    termUk: "Генерація з пошуковим доповненням (RAG)",
    termEn: "Retrieval-Augmented Generation (RAG)",
    category: "nlp",
    shortDescription: "Architecture combining a dense retrieval system with a large language model generator — retrieved document chunks ground LLM responses in factual source material, reducing hallucination and enabling knowledge-base Q&A without fine-tuning.",
    fullDescription: "Retrieval-Augmented Generation (RAG), introduced by Lewis et al. (Meta AI, 2020), combines two components: a retriever that selects relevant documents from a corpus given a query, and a generator (LLM) that conditions its response on both the query and the retrieved content. This decouples world knowledge from model weights, enabling up-to-date and verifiable responses.\n\nStandard RAG pipeline: (1) Offline indexing — documents are chunked (typically 256-512 tokens with 50-token overlap), embedded using a dense encoder (e.g. text-embedding-3-small, BGE, E5-large), and indexed in a vector database (Pinecone, Weaviate, Chroma, pgvector). (2) Online retrieval — the user query is embedded and top-k chunks are retrieved by approximate nearest-neighbour (ANN) search. (3) Generation — the LLM receives a prompt containing the query and retrieved chunks as context and generates a grounded response.\n\nAdvanced RAG patterns: HyDE (Hypothetical Document Embeddings) generates a hypothetical answer to improve retrieval. Re-ranking (cross-encoder) re-scores retrieved chunks for relevance before passing to the generator. Self-RAG introduces a retrieval decision token — the LLM decides whether retrieval is needed. Graph RAG builds a knowledge graph over documents, enabling multi-hop reasoning.\n\nUK enterprise use cases: UK law firms (Clifford Chance, Linklaters) use RAG over legal databases (Westlaw UK, LexisNexis) for contract review. NHS trusts deploy RAG over clinical guidelines (NICE, BNF) for clinician decision support. Financial services use RAG over regulatory handbooks (FCA, PRA) for compliance Q&A. GDPR consideration: if RAG is deployed over personal data, UK GDPR Article 6 lawful basis, data minimisation, and purpose limitation apply to the retrieval corpus.",
    relatedTerms: ["instruction-tuning", "hallucination-detection", "chain-of-thought", "constitutional-ai"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/ai/machine-learning",
  },
  {
    slug: "instruction-tuning",
    termUk: "Навчання на інструкціях (Instruction Tuning)",
    termEn: "Instruction Tuning",
    category: "nlp",
    shortDescription: "Fine-tuning large language models on (instruction, response) pairs so they follow natural language task descriptions — the technique behind FLAN-T5, InstructGPT, and Llama-Instruct models. Enables zero-shot generalisation to unseen tasks.",
    fullDescription: "Instruction tuning (Wei et al., Google, 2021; introduced as FLAN) fine-tunes a pretrained LLM on a large and diverse collection of tasks formatted as natural language instructions with corresponding target outputs. The key insight is that format diversity and task diversity during fine-tuning dramatically improve zero-shot generalisation: a model trained on 62 NLP tasks formatted as instructions generalises to unseen tasks far better than task-specific fine-tuning.\n\nInstructGPT (Ouyang et al., OpenAI, 2022) combined supervised instruction fine-tuning with Reinforcement Learning from Human Feedback (RLHF): (1) supervised fine-tuning on demonstrations; (2) reward model trained on human preference pairs; (3) PPO optimisation against the reward model. This three-stage process produces the behaviour exhibited by ChatGPT.\n\nKey datasets: FLAN collection (Google), Super-Natural Instructions (Allen AI), Alpaca (Stanford, synthetic GPT-4-generated instructions), ShareGPT (human-ChatGPT conversations). Llama 2-Chat and Llama 3-Instruct are instruction-tuned variants of Meta's Llama base models, released with permissive commercial licences.\n\nUK enterprise fine-tuning: Parameter-efficient fine-tuning (PEFT) methods — LoRA (Low-Rank Adaptation) and QLoRA (quantised LoRA) — reduce the cost of instruction fine-tuning an open-source LLM (Llama 3 8B) to a single A100 GPU over hours. UK financial services firms use instruction fine-tuning to adapt general-purpose LLMs to financial document styles (RNS announcements, prospectuses, regulatory submissions) and domain vocabulary without full retraining. Data governance: training data for instruction fine-tuning may contain personal data or confidential information; UK GDPR purpose limitation and data minimisation principles apply to fine-tuning dataset construction.",
    relatedTerms: ["retrieval-augmented-generation", "chain-of-thought", "constitutional-ai", "hallucination-detection"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/ai/machine-learning",
  },
  {
    slug: "chain-of-thought",
    termUk: "Ланцюжок думок (Chain-of-Thought Prompting)",
    termEn: "Chain-of-Thought Prompting",
    category: "nlp",
    shortDescription: "Prompting technique that elicits intermediate reasoning steps from LLMs before generating a final answer — dramatically improves accuracy on multi-step arithmetic, logical, and symbolic reasoning tasks.",
    fullDescription: "Chain-of-Thought (CoT) prompting (Wei et al., Google, 2022) is a prompting strategy in which the model is guided to produce explicit intermediate reasoning steps before arriving at a final answer. The canonical form provides few-shot examples that include the reasoning trace, demonstrating to the model the expected thought process. Zero-shot CoT uses the phrase 'Let us think step by step' without examples and still significantly improves accuracy.\n\nWhy CoT works: Large language models trained on vast text corpora contain implicit reasoning patterns. CoT prompts activate these patterns by framing the generation task as a reasoning trace rather than direct answer production. Performance gains are most pronounced on tasks requiring multi-step computation (arithmetic word problems, logical deduction, scientific reasoning) and emerge primarily in models above approximately 100B parameters — a capability that arises with scale.\n\nVariants: Self-Consistency CoT samples multiple reasoning chains and takes a majority vote over final answers — improves accuracy by 5-10 percentage points on benchmark tasks. Tree of Thoughts extends CoT to non-linear search, exploring multiple reasoning branches. Program of Thought generates executable code as the reasoning trace, offloading arithmetic to a Python interpreter. ReAct (Yao et al.) interleaves reasoning traces with external tool calls (search, calculator, database).\n\nUK enterprise applications: CoT is used in financial document analysis (contract clause extraction with reasoning traces auditable by compliance teams), medical coding assistance (NHS coding with step-by-step ICD-10 justification), and legal reasoning (employment tribunal outcome prediction with explicit statutory analysis). Audit trail value: CoT reasoning traces provide interpretable evidence for regulated decisions — important for FCA Consumer Duty explainability requirements and NHS clinical decision support governance.",
    relatedTerms: ["retrieval-augmented-generation", "hallucination-detection", "instruction-tuning", "constitutional-ai"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/ai/machine-learning",
  },
  {
    slug: "hallucination-detection",
    termUk: "Виявлення галюцинацій LLM",
    termEn: "LLM Hallucination Detection",
    category: "nlp",
    shortDescription: "Methods for detecting and mitigating factually incorrect or fabricated outputs from large language models — covering semantic consistency checking, retrieval-grounded verification, and uncertainty estimation techniques.",
    fullDescription: "LLM hallucination refers to the generation of confident, fluent, and plausible-sounding text that is factually incorrect or unsupported by the input context. Hallucinations occur because LLMs are trained to produce fluent continuations of text, not to retrieve facts from a verified knowledge base. Hallucination is a critical safety concern for high-stakes UK deployments: NHS clinical decision support, legal research tools, financial advice.\n\nTypes of hallucination: Intrinsic hallucinations contradict information explicitly provided in the input (e.g. a summarisation system misrepresenting a source document). Extrinsic hallucinations add plausible but unverifiable claims not present in the source. Factual hallucinations state false propositions about the real world with apparent confidence.\n\nDetection methods: (1) Self-consistency checking — sample multiple responses to the same query; high variance across responses indicates uncertainty and likely hallucination. (2) NLI-based verification — use a natural language inference model (DeBERTa-NLI) to check whether each claim in the response is entailed by the retrieved context. (3) Factuality probes — probe models with questions whose correct answers are verifiable against authoritative databases (Wikipedia, Companies House, MHRA medicines database). (4) SelfCheckGPT — passes individual sentences through the model multiple times as generation continuations; sentences the model is inconsistent about are flagged as potentially hallucinated.\n\nMitigation: RAG grounds responses in retrieved source documents; citation generation forces the model to attribute claims; RLHF with factuality reward models during training reduce hallucination rates. UK context: ICO guidance on generative AI (2024) and NHS AI Lab ethical guidance require organisations deploying LLMs to implement hallucination monitoring and provide clear limitations disclosures to end users.",
    relatedTerms: ["retrieval-augmented-generation", "chain-of-thought", "constitutional-ai", "instruction-tuning"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/ai/machine-learning",
  },
  {
    slug: "constitutional-ai",
    termUk: "Конституційний AI (Anthropic)",
    termEn: "Constitutional AI (Anthropic)",
    category: "nlp",
    shortDescription: "Anthropic's AI safety technique for training helpful, harmless, and honest LLMs using a set of principles ('constitution') — combining self-critique, revision, and RLAIF (RL from AI Feedback) to reduce harmful outputs without relying solely on human labelling.",
    fullDescription: "Constitutional AI (CAI), introduced by Bai et al. (Anthropic, 2022), is a method for training AI assistants to be helpful, harmless, and honest using a set of natural language principles — the 'constitution' — that the model applies to critique and revise its own outputs. This reduces reliance on expensive human labelling of harmful content.\n\nCAI training pipeline: (1) Supervised learning phase — the model generates responses to harmful prompts, then critiques those responses against the constitutional principles ('identify any ways this response might be harmful'), generates revisions, and is fine-tuned on the revised outputs. (2) RL from AI Feedback (RLAIF) — instead of human preference labels, AI-generated preference labels (derived by asking a 'feedback model' to judge which of two responses better satisfies the constitution) train the reward model. PPO is then used to optimise the assistant model against this AI-generated reward.\n\nThe constitution can encode diverse principles: harmlessness (avoid assisting with dangerous activities), honesty (do not deceive), helpfulness (be genuinely useful), and values-alignment (respect autonomy, avoid paternalism). Unlike RLHF where human labellers' values may be implicit, CAI makes the normative principles explicit and inspectable — relevant for EU AI Act transparency requirements and ICO accountability obligations.\n\nUK enterprise relevance: UK regulated firms deploying LLM-based customer-facing tools (chatbots, advice tools) face FCA Consumer Duty requirements to avoid causing foreseeable harm. CAI provides a principled, auditable framework for embedding firm-specific policies (e.g. 'never recommend specific investment products without regulated advice') into assistant behaviour — complementary to guardrails-based approaches (Llama Guard, NeMo Guardrails).",
    relatedTerms: ["instruction-tuning", "hallucination-detection", "chain-of-thought", "retrieval-augmented-generation"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/ai/machine-learning",
  },

  // --- Regulatory AI UK ---
  {
    slug: "ai-liability-directive-uk",
    termUk: "EU Директива про відповідальність за AI та її вплив на UK",
    termEn: "EU AI Liability Directive — UK Impact",
    category: "regulation",
    shortDescription: "The proposed EU AI Liability Directive's extraterritorial effect on UK businesses — creating civil liability for AI-caused harm, shifting burden of proof, and its interaction with the UK's tort-based liability approach post-Brexit.",
    fullDescription: "The EU proposed its AI Liability Directive (AILD) in September 2022 alongside the AI Act, aiming to harmonise civil liability rules for AI-caused damage across the EU. For UK businesses, the directive has significant extraterritorial implications despite the UK's post-Brexit regulatory independence.\n\nKey AILD provisions: (1) Presumption of causation — if a claimant can show an AI system violated a relevant duty of care and that non-compliance is reasonably linked to the damage, causation is presumed (reversing the burden of proof). (2) Right to evidence disclosure — claimants can request courts to order disclosure of information about high-risk AI systems, lowering evidential barriers. (3) Scope: applies to AI systems deployed in the EU, regardless of where the developer is based.\n\nUK extraterritorial impact: UK AI developers and deployers that serve EU customers or markets remain subject to the AILD even without statutory implementation in UK law. A UK insurer using AI to process EU-based policyholders' claims, or a UK fintech with EU users, faces AILD liability exposure. The AILD status as of 2025 is that negotiations are ongoing with some stakeholder pushback on overbroad presumption provisions.\n\nUK domestic approach: UK law relies on existing tort principles (negligence, product liability under the Consumer Protection Act 1987). The Law Commission has reviewed autonomous systems liability; the current position is that existing tort law is broadly adequate for most AI harm scenarios, though gaps exist for complex autonomous systems causing harm through non-human decisions. UK government policy is to avoid premature statutory AI liability rules that might discourage innovation — consistent with the pro-innovation AI White Paper stance. UK businesses with EU exposure should monitor AILD final text and prepare AI documentation practices that would satisfy both disclosure and causation-defence requirements.",
    relatedTerms: ["eu-ai-act-uk-impact", "uk-ai-white-paper", "algorithmic-accountability", "digital-regulation-cooperation-forum"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/services/artificial-intelligence",
  },
  {
    slug: "digital-regulation-cooperation-forum",
    termUk: "Форум цифрового регуляторного співробітництва (DRCF)",
    termEn: "Digital Regulation Cooperation Forum (DRCF)",
    category: "regulation",
    shortDescription: "The UK's joint regulatory body coordinating AI and digital oversight between FCA, ICO, CMA, and Ofcom — providing joined-up guidance on AI in digital markets, addressing regulatory gaps and overlaps across four regimes.",
    fullDescription: "The Digital Regulation Cooperation Forum (DRCF) was established in 2020 as a voluntary cooperation body bringing together the four major UK regulators with digital economy mandates: the Financial Conduct Authority (FCA), the Information Commissioner's Office (ICO), the Competition and Markets Authority (CMA), and Ofcom. Its purpose is to coordinate regulatory approaches to digital and AI issues that cut across multiple regulatory regimes.\n\nDRCF workstreams relevant to AI: (1) AI and Digital Regulation project — joint guidance on responsible AI deployment that applies across FCA, ICO, CMA, and Ofcom remits; (2) Algorithmic systems monitoring — coordinated approach to assessing algorithmic harms in digital markets; (3) Foundation models — CMA market study on AI foundation models (2024) coordinated with other DRCF members; (4) Data portability and interoperability — joint positions on data access for AI training.\n\nFor UK businesses, DRCF coordination means that AI compliance increasingly requires engagement with multiple regulators simultaneously. A UK bank deploying an AI chatbot faces: FCA supervision (Consumer Duty, financial promotions); ICO oversight (UK GDPR processing, automated decisions); CMA scrutiny if the bank uses AI in ways that could harm competition; and potentially Ofcom regulation if communications services are involved. DRCF aims to reduce compliance burden through joined-up guidance and prevent regulatory arbitrage.\n\nDRCF AI Framework (2023): Published a joint statement on AI principles across the four regulators, setting out how existing powers apply to AI and identifying areas where new guidance is needed. Practical impact: ICO and FCA co-authored guidance on generative AI in financial services; CMA and ICO coordinated on data scraping for AI training.",
    relatedTerms: ["uk-ai-white-paper", "ai-liability-directive-uk", "ico-ai-guidance-2024", "online-safety-act-ai"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/services/artificial-intelligence",
  },
  {
    slug: "online-safety-act-ai",
    termUk: "Закон про онлайн-безпеку 2023 та зобов'язання AI",
    termEn: "Online Safety Act 2023 — AI Obligations",
    category: "regulation",
    shortDescription: "The UK Online Safety Act 2023 (Ofcom-regulated) AI obligations — illegal content moderation, risk assessments for AI-generated content, deepfake provisions, and automated systems requirements for user-to-user and search services.",
    fullDescription: "The Online Safety Act 2023 (OSA) creates a comprehensive regulatory framework for online safety in the UK, with Ofcom as the principal regulator. AI systems are central to compliance: content moderation at scale requires ML, and the Act creates specific obligations around AI-generated content.\n\nScope: The OSA applies to 'user-to-user' services (social media, forums, messaging) and 'search services' accessible in the UK, regardless of where the provider is based. This includes UK startups, multinational platforms, and any service with significant UK users.\n\nAI-specific obligations under the OSA: (1) Illegal content risk assessments must consider AI-generated content as a distinct harm vector — deepfakes, CSAM generated by AI, AI-generated disinformation. Services must have systems to detect and remove illegal AI-generated content. (2) Automated content moderation: services relying on automated moderation systems must assess their accuracy, over-removal rates, and bias — and provide human review routes. (3) Deepfake sexual images: the Act criminalises sharing intimate deepfake images without consent; platforms must have detection and removal processes. (4) Age assurance: AI-based age estimation systems must meet Ofcom's age assurance standards for services hosting adult content. (5) Transparency reporting: large platforms must disclose AI moderation system effectiveness in annual transparency reports.\n\nPractical compliance: UK tech companies must build or procure ML content moderation systems that satisfy OSA risk assessment documentation, maintain audit logs of automated decisions, and provide Ofcom with evidence of system effectiveness. Ofcom's codes of practice (published 2024-2025) provide technical specifications for compliant automated moderation systems.",
    relatedTerms: ["digital-regulation-cooperation-forum", "ico-ai-guidance-2024", "ai-liability-directive-uk", "algorithmic-accountability"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/services/artificial-intelligence",
  },
  {
    slug: "nhs-dspt",
    termUk: "NHS Набір інструментів захисту даних (DSPT) для ML",
    termEn: "NHS Data Security Protection Toolkit (DSPT) for ML",
    category: "regulation",
    shortDescription: "The NHS Digital Data Security and Protection Toolkit (DSPT) compliance requirements for organisations handling NHS patient data — covering ML system data governance, Cyber Essentials alignment, and DTAC (Digital Technology Assessment Criteria) for AI health tools.",
    fullDescription: "The NHS Data Security Protection Toolkit (DSPT) is an online self-assessment framework that organisations handling NHS patient data must complete annually. It is a requirement for Data Security and Protection (DSP) compliance under the Health and Social Care Act 2012 and NHS contract conditions. For ML developers working with NHS data or deploying AI health tools in the NHS, DSPT compliance is a prerequisite for data access and procurement.\n\nDSPT requirements relevant to ML: (1) Data quality and records management — organisations must document data flows, including ML training data sources and processing locations. (2) Data security standards — Cyber Essentials certification (a prerequisite for NHS data access) must be maintained; ML inference infrastructure must meet network security and access control requirements. (3) Staff responsibilities — data handlers must complete Data Security Awareness Level 1 training; ML engineers with access to patient data require appropriate DBS clearance. (4) Incident response — ML model failures that compromise patient data security must be reported to the DSIT Data Security Centre within 12 hours of awareness.\n\nDTAC (Digital Technology Assessment Criteria): Developed by NHSX (now NHS Transformation Directorate), DTAC provides a structured assessment framework for digital health technologies including AI and ML systems deployed in clinical settings. DTAC assesses: clinical safety (DCB0129, DCB0160 standards), data protection (UK GDPR, DSPT), technical security, interoperability (HL7 FHIR, SNOMED-CT), usability, and accessibility. AI tools in the NHS must complete DTAC assessment before deployment.\n\nNHS AI Lab: The NHS AI Lab (established 2019) provides guidance, funding, and infrastructure for NHS AI deployment including the AI and Digital Regulations Service (ADRS) for regulatory navigation, and the NHS AI Diagnostic Fund for imaging AI procurement.",
    relatedTerms: ["ico-ai-guidance-2024", "online-safety-act-ai", "digital-regulation-cooperation-forum", "algorithmic-accountability"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/services/artificial-intelligence",
  },
  {
    slug: "ico-ai-guidance-2024",
    termUk: "Настанови ICO щодо генеративного AI 2024",
    termEn: "ICO AI Guidance — Generative AI (2024)",
    category: "regulation",
    shortDescription: "The UK Information Commissioner's Office guidance on generative AI and UK GDPR compliance — covering lawful basis for web scraping training data, automated decision-making obligations, purpose limitation for LLM fine-tuning, and Subject Access Request handling for AI systems.",
    fullDescription: "The ICO published updated guidance on generative AI and data protection throughout 2024, reflecting the rapid deployment of LLMs in UK businesses and the specific data protection challenges they create. This guidance is legally significant: ICO regulatory decisions establish precedent under the UK GDPR (retained in the Data Protection Act 2018).\n\nKey guidance areas: (1) Lawful basis for training data — web scraping to build generative AI training datasets requires a lawful basis under UK GDPR Article 6. Legitimate interests (Article 6(1)(f)) may apply but requires a legitimate interests assessment (LIA) balancing business interests against data subjects' rights. The ICO's investigation into Clearview AI (biometric data scraping) established limits on this basis. (2) Purpose limitation — models trained on personal data cannot then be fine-tuned or used for purposes materially different from those disclosed at collection without a new lawful basis. (3) Automated decisions under Article 22 — LLMs making or substantially influencing decisions about individuals (credit, employment, insurance) trigger Article 22 obligations: the right to explanation, human review, and contest. (4) Subject Access Requests (SARs) and AI — if personal data is incorporated into model weights (memorisation), responding to SARs and erasure requests (Article 17 'right to be forgotten') becomes technically complex. The ICO expects organisations to conduct risk assessments and implement mitigations.\n\nGenerative AI risk assessment checklist (ICO): DPIA required for systematic use of personal data in LLM training or deployment; data minimisation obligations require use of the minimum personal data necessary; retention limits apply to training data; automated profiling using generative AI requires explicit disclosure. Enforcement: the ICO has powers to issue fines up to GBP 17.5 million or 4% of global turnover for UK GDPR breaches involving AI systems.",
    relatedTerms: ["digital-regulation-cooperation-forum", "nhs-dspt", "online-safety-act-ai", "algorithmic-accountability"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/services/artificial-intelligence",
  },

  // --- Computer Vision Advanced ---
  {
    slug: "vision-transformer",
    termUk: "Трансформер для зображень (ViT)",
    termEn: "Vision Transformer (ViT)",
    category: "ai",
    shortDescription: "Transformer architecture applied to image recognition — images are divided into fixed-size patches treated as token sequences. ViT matches or outperforms CNNs on large datasets and underpins CLIP, SAM, and modern multimodal models.",
    fullDescription: "Vision Transformer (ViT), introduced by Dosovitskiy et al. (Google Brain, 2020), applies the Transformer self-attention architecture — originally designed for NLP — directly to image classification. The key idea: divide an image into a grid of fixed-size patches (e.g. 16x16 pixels), flatten each patch into a vector, and treat the sequence of patch vectors as tokens fed into a standard Transformer encoder.\n\nArchitecture details: Each patch is linearly projected to a D-dimensional embedding. A learnable [CLS] token is prepended to the patch sequence. Positional embeddings (learnable or fixed) are added. The Transformer encoder processes the sequence; the [CLS] token representation is used for classification. ViT requires far less architectural inductive bias than CNN (no convolutions, no pooling), which means it needs more data to learn spatial structure — training on ImageNet-21k or JFT-300M achieves state-of-the-art results.\n\nVariants and descendants: DeiT (Data-efficient Image Transformers, Facebook) uses knowledge distillation to train ViT competitively on ImageNet-1k alone. Swin Transformer introduces hierarchical features and shifted window attention — enabling dense prediction tasks. CLIP (OpenAI) uses ViT as the image encoder in a contrastive image-text pre-training framework. SAM (Segment Anything Model, Meta) uses a ViT backbone for zero-shot segmentation. DINO and DINOv2 apply self-supervised pre-training to ViT, producing powerful visual features.\n\nUK industrial applications: Manufacturing quality inspection (ViT-based defect detection outperforms CNNs on small defect datasets through attention-based global context), medical imaging (ViT foundation models for NHS radiology AI — chest X-ray, pathology slide analysis), and document understanding (LayoutLM, DocFormer use ViT for document image analysis relevant to UK financial services document processing).",
    relatedTerms: ["panoptic-segmentation", "few-shot-object-detection", "video-action-recognition", "3d-point-cloud-ml"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/ai/machine-learning",
  },
  {
    slug: "panoptic-segmentation",
    termUk: "Паноптична сегментація",
    termEn: "Panoptic Segmentation",
    category: "ai",
    shortDescription: "Computer vision task unifying semantic segmentation (every pixel classified to a category) and instance segmentation (each object instance distinguished) into a single prediction — outputs both 'stuff' (background regions) and 'things' (countable objects) with instance IDs.",
    fullDescription: "Panoptic segmentation (Kirillov et al., Facebook AI, 2019) unifies two previously separate computer vision tasks: semantic segmentation labels every pixel with a category class (sky, road, building) without distinguishing individual instances; instance segmentation detects and segments each individual object instance (person 1, person 2, car 3) without labelling background regions. Panoptic segmentation does both simultaneously: every pixel receives a semantic label AND countable objects ('things') receive unique instance IDs.\n\nPanoptic quality (PQ) metric: PQ = SQ x RQ, where SQ (Segmentation Quality) measures pixel-level IoU for matched segments, and RQ (Recognition Quality) is the F1 score over matched/unmatched segments. PQ is evaluated separately for 'things' and 'stuff' categories.\n\nKey architectures: Panoptic FPN (Feature Pyramid Network) appends a semantic segmentation head to Mask R-CNN. MaX-DeepLab and kMaX-DeepLab achieve panoptic segmentation end-to-end without NMS post-processing. Mask2Former (Meta AI) uses a universal architecture handling semantic, instance, and panoptic segmentation with a single architecture using masked attention Transformers.\n\nUK enterprise applications: Autonomous vehicle perception (Wayve, Five AI — UK AV companies — use panoptic segmentation for scene understanding, distinguishing driveable surface from pedestrians and vehicles simultaneously). Smart city infrastructure (Transport for London video analytics for pedestrian flow estimation uses panoptic models). Retail analytics (Ocado Technology applies panoptic segmentation to warehouse robot navigation). Construction site safety monitoring (identifying workers, machinery, and unsafe zones simultaneously in a single pass).",
    relatedTerms: ["vision-transformer", "few-shot-object-detection", "video-action-recognition", "3d-point-cloud-ml"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/ai/machine-learning",
  },
  {
    slug: "few-shot-object-detection",
    termUk: "Виявлення об'єктів з малою кількістю прикладів",
    termEn: "Few-Shot Object Detection",
    category: "ai",
    shortDescription: "Object detection from very limited labelled examples (1-10 per class) using meta-learning, prototypical networks, or foundation model fine-tuning — critical for UK manufacturing quality assurance where defect labelling is expensive.",
    fullDescription: "Few-shot object detection (FSOD) addresses the practical constraint that collecting and labelling hundreds of examples per class is expensive or impossible — for novel defect categories in manufacturing QA, rare medical findings, or newly introduced product SKUs in retail.\n\nProblem formulation: The model is given a support set (K labelled examples per N novel classes) and must detect novel objects in query images. Performance is measured as mean Average Precision (mAP) on novel classes without forgetting base classes.\n\nApproaches: (1) Meta-learning — MAML-based detection models (Meta-RCNN, Meta-Det) that learn to adapt quickly from few examples across episodes. (2) Prototypical methods — class prototypes are computed from support set features; detection uses prototype similarity for classification. (3) Transfer learning + fine-tuning — freeze a well-trained base detector (COCO-pretrained Faster RCNN or DETR); fine-tune only the last layers on K-shot support data. TFA (Two-stage Fine-tuning Approach) is a simple but strong baseline. (4) Foundation model prompting — Grounding DINO and SAM with text or visual prompts enable zero/few-shot detection without fine-tuning.\n\nUK manufacturing applications: Automotive component inspection (Jaguar Land Rover, automotive suppliers): novel surface defects (scratches, dents, porosity) appear rarely but must be detected from limited training images. Pharmaceutical packaging QA: detecting label errors, particle contamination, or seal defects from a handful of labelled examples per defect type. Electronics PCB inspection: solder joint defects on new board designs for which few historical defect images exist. FSOD enables rapid deployment of QA models for new product lines without waiting to accumulate thousands of defect labels.",
    relatedTerms: ["vision-transformer", "panoptic-segmentation", "video-action-recognition", "3d-point-cloud-ml"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/ai/machine-learning",
  },
  {
    slug: "video-action-recognition",
    termUk: "Розпізнавання дій на відео",
    termEn: "Video Action Recognition",
    category: "ai",
    shortDescription: "Deep learning models that classify human actions and activities in video sequences — used in UK retail loss prevention, workplace safety monitoring, and sports performance analysis.",
    fullDescription: "Video action recognition classifies what action or activity is occurring in a video clip. Unlike image classification, it requires modelling temporal dynamics and motion patterns across frames, not just spatial appearance in a single frame.\n\nArchitectural evolution: Two-stream networks (Simonyan and Zisserman, 2014) processed spatial (RGB) and temporal (optical flow) streams independently. 3D CNNs (C3D, I3D) apply 3D convolutions to video volumes, capturing spatiotemporal patterns jointly. Video Transformers (TimeSformer, Video Swin, VideoMAE) adapt spatial Transformers to video with temporal attention, achieving state-of-the-art on Kinetics-400/700 and Something-Something benchmarks.\n\nDatasets: Kinetics-700 (DeepMind, 700 human action classes, 650k clips), Something-Something v2 (focused on object manipulation, tests temporal reasoning), ActivityNet (activity recognition, detection, captioning), AVA (atomic visual actions with spatial localisation).\n\nUK commercial applications: (1) Retail loss prevention: identifying shoplifting actions (concealment, tag removal) from CCTV streams — UK retailers lose approximately GBP 2 billion annually to shoplifting. Systems from Veesion (Paris-based, deployed UK retailers) and UK companies use action recognition to flag suspicious behaviour for security review. (2) Workplace health and safety: construction site monitoring (hard hat compliance, unsafe manual handling, working-at-height violations) — required under CDM Regulations 2015. (3) Sports analytics: Premier League, England Rugby, LTA tennis clubs use action recognition for tactical analysis (pass categorisation, tackle technique, shot type classification). (4) NHS and social care: fall detection for elderly patients in care homes using video action recognition on edge devices (privacy-preserving on-device processing). UK-specific GDPR consideration: workplace video monitoring requires lawful basis, DPIA, and transparency notice.",
    relatedTerms: ["vision-transformer", "panoptic-segmentation", "few-shot-object-detection", "3d-point-cloud-ml"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/ai/machine-learning",
  },
  {
    slug: "3d-point-cloud-ml",
    termUk: "ML для 3D хмар точок",
    termEn: "3D Point Cloud ML",
    category: "ai",
    shortDescription: "Machine learning on 3D point cloud data from LiDAR and depth sensors — used in autonomous vehicles, robotics, and construction digital twins. Key architectures: PointNet, PointNet++, VoxelNet, PointPillars.",
    fullDescription: "3D point clouds are sets of points in three-dimensional space, typically captured by LiDAR (Light Detection and Ranging) sensors, depth cameras (Intel RealSense, Microsoft Azure Kinect), or photogrammetric reconstruction from multiple 2D images. Each point has x, y, z coordinates and often additional attributes (intensity, colour, timestamp). Point clouds are the primary perception modality for autonomous vehicles and industrial robotics.\n\nChallenges: Point clouds are unordered (no grid structure like images), vary in density (farther objects have fewer points), and can be very large (100k-200k points per LiDAR scan). Standard deep learning architectures designed for regular grids (CNNs) do not apply directly.\n\nKey architectures: PointNet (Qi et al., Stanford, 2017) processes each point independently via shared MLPs, then applies symmetric aggregation (max-pooling) — the first end-to-end deep learning architecture for point sets. PointNet++ adds hierarchical local feature learning. VoxelNet and VoxelNeXt voxelise the point cloud into a regular 3D grid and apply 3D CNNs. PointPillars compresses points into vertical pillars (2D grid) for efficient LiDAR object detection. Point Transformer and PCT apply self-attention to point sets for state-of-the-art performance.\n\nUK applications: (1) Autonomous vehicles — Wayve, Oxbotica (now Oxa), and Five AI (UK AV companies) use LiDAR point cloud ML for 3D object detection, tracking, and driveable space estimation. (2) Construction digital twins — Mace, Balfour Beatty use LiDAR scanning + point cloud ML for progress monitoring (comparing as-built scan to BIM model). (3) Infrastructure inspection — Network Rail uses LiDAR point cloud analysis for clearance monitoring and track geometry assessment. (4) Industrial robotics — UK manufacturers use depth sensor point cloud ML for bin-picking (grasping randomly oriented parts) in automated assembly lines.",
    relatedTerms: ["vision-transformer", "panoptic-segmentation", "video-action-recognition", "few-shot-object-detection"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/ai/machine-learning",
  },

  // --- Time Series Advanced ---
  {
    slug: "prophet-forecasting",
    termUk: "Facebook Prophet для бізнес-прогнозування",
    termEn: "Facebook Prophet for Business Time Series",
    category: "data",
    shortDescription: "Open-source time series forecasting library (Meta AI) using an additive decomposition model with trend, seasonality, and holiday components — designed for business metrics with strong weekly/yearly seasonality and irregular holidays.",
    fullDescription: "Prophet (Taylor and Letham, Facebook/Meta, 2017) is an open-source time series forecasting library designed for business analysts and data scientists rather than time series specialists. It models time series as an additive combination of: trend (piecewise linear or logistic growth with automatic changepoint detection), seasonality (Fourier series for weekly and yearly patterns), and holiday effects (user-specified irregular events).\n\nKey design choices: Prophet is robust to missing data, outliers, and holiday effects — common in business time series. It requires minimal hyperparameter tuning. Uncertainty intervals are estimated via Monte Carlo simulation. The model is implemented in Stan (probabilistic programming) and exposed via Python and R interfaces.\n\nWhen Prophet works well: Time series with strong seasonal patterns and several seasons of historical data (e.g. e-commerce sales, web traffic, energy consumption). Business metrics with known holiday effects (UK bank holidays, Christmas, Black Friday). Data with irregular changepoints in trend (product launches, marketing campaigns). Forecasting horizons from days to years.\n\nLimitations: Prophet does not capture multivariate relationships (exogenous variables have limited support). It assumes additive seasonality — multiplicative seasonality requires a data transformation. It does not model complex lag dependencies or irregular event sequences well.\n\nUK business applications: Retail demand forecasting (Tesco, Sainsbury's supply chain teams use Prophet for category-level volume forecasting with UK bank holiday and seasonal promotions effects). NHS demand forecasting (A&E attendance, elective surgery waiting lists). Energy demand forecasting (National Grid, UK energy suppliers use Prophet for renewable generation intermittency planning). Finance: FX trading volume forecasting, bank branch transaction volume.",
    relatedTerms: ["temporal-fusion-transformer", "conformal-prediction", "change-point-detection", "neural-ode"],
    relatedService: "data-analytics",
    relatedNichePage: "/ai/machine-learning",
  },
  {
    slug: "temporal-fusion-transformer",
    termUk: "Temporal Fusion Transformer (TFT)",
    termEn: "Temporal Fusion Transformer (TFT)",
    category: "data",
    shortDescription: "Google's multi-horizon forecasting architecture combining LSTM encoder-decoder with self-attention and variable selection networks — handles static, known future, and unknown future covariates and produces interpretable attention-based feature importance.",
    fullDescription: "Temporal Fusion Transformer (TFT), introduced by Lim et al. (Google, 2020), is a state-of-the-art deep learning architecture for multi-horizon probabilistic time series forecasting. It extends standard LSTM seq2seq models with three key innovations: variable selection networks (learned soft selection of relevant input features at each time step), a gated residual network for feature transformation with skip connections, and temporal self-attention (allowing direct modelling of long-range temporal dependencies that LSTMs handle poorly).\n\nInput types handled simultaneously: (1) Static covariates — features constant over time (e.g. store location, product category). (2) Known future inputs — features known ahead of time (calendar variables, planned promotions, holiday indicators). (3) Unknown future inputs (observed time series) — features only known up to the present (sales, demand, prices). This tripartite input structure is unique to TFT and maps naturally to retail, energy, and financial forecasting problems.\n\nOutput: Quantile forecasts (e.g. q10, q50, q90) at multiple future steps simultaneously, enabling uncertainty quantification. The attention weights from temporal self-attention provide interpretable explanations — which past time steps are most influential for each forecast horizon.\n\nBenchmarks: TFT outperforms DeepAR, N-BEATS, and LightGBM on multiple M4 and M5 competition datasets. It is the recommended baseline for multi-horizon probabilistic forecasting in the PyTorch Forecasting library.\n\nUK applications: Energy load forecasting (UK power system operators use TFT for day-ahead and intra-day demand forecasting with weather, calendar, and price covariates). Retail stock planning (multi-horizon demand forecasts with promotion and seasonal effects). Financial services: credit portfolio default rate forecasting with macroeconomic scenario inputs.",
    relatedTerms: ["prophet-forecasting", "conformal-prediction", "neural-ode", "change-point-detection"],
    relatedService: "data-analytics",
    relatedNichePage: "/ai/machine-learning",
  },
  {
    slug: "conformal-prediction",
    termUk: "Конформне передбачення (Conformal Prediction)",
    termEn: "Conformal Prediction",
    category: "data",
    shortDescription: "Distribution-free uncertainty quantification framework that produces statistically valid prediction intervals with guaranteed coverage — applicable to any ML model without assumptions about the data distribution.",
    fullDescription: "Conformal prediction (Vovk, Gammerman, Shafer, 1999; popularised by Angelopoulos and Bates, 2021) is a framework for constructing prediction intervals with provable coverage guarantees without making distributional assumptions. For a target coverage level 1-alpha (e.g. 90%), conformal intervals contain the true label with probability at least 1-alpha over the marginal distribution of the data.\n\nSplit conformal procedure: (1) Train a model on training data. (2) Compute nonconformity scores (e.g. residuals |y - y_hat|) on a held-out calibration set. (3) Take the (1-alpha) quantile of calibration nonconformity scores as the threshold q. (4) For a new test point, the prediction interval is [y_hat - q, y_hat + q] for regression, or the set of classes whose nonconformity score is below q for classification.\n\nKey property: The marginal coverage guarantee (P(Y in C(X)) >= 1-alpha) holds without assumptions on the data distribution, model correctness, or feature independence. This is dramatically stronger than bootstrap confidence intervals or Bayesian credible intervals, which require model or distributional assumptions.\n\nVariants: Mondrian conformal prediction conditions coverage on subgroups (e.g. separate coverage guarantees for different risk segments). Locally adaptive conformal prediction adjusts interval width to local difficulty. Adaptive prediction sets (APS) for classification ensure well-calibrated set sizes.\n\nUK regulated applications: FCA model risk management (SS1/23 requires uncertainty quantification for credit models — conformal intervals provide valid uncertainty bounds without distributional assumptions). NHS clinical decision support: conformal prediction sets for differential diagnosis ensure that the true diagnosis is included in the suggested set with the stated probability. Insurance pricing: conformal prediction intervals quantify uncertainty in individual risk predictions, important for Consumer Duty fair value assessments.",
    relatedTerms: ["temporal-fusion-transformer", "prophet-forecasting", "change-point-detection", "neural-ode"],
    relatedService: "data-analytics",
    relatedNichePage: "/ai/machine-learning",
  },
  {
    slug: "change-point-detection",
    termUk: "Виявлення точок змін у часових рядах",
    termEn: "Change Point Detection in Time Series",
    category: "data",
    shortDescription: "Statistical and ML methods that identify points in time where the underlying data generating process changes — used for detecting regime shifts, fraud pattern changes, system failures, and model drift in production ML.",
    fullDescription: "Change point detection (CPD) identifies times at which the statistical properties of a time series change abruptly. Unlike anomaly detection (identifying unusual individual points), CPD focuses on structural breaks — shifts in mean, variance, trend, or autocorrelation structure.\n\nOffline vs online CPD: Offline CPD processes the complete time series to identify all changepoints retrospectively (useful for analysis and model retraining triggers). Online CPD detects changepoints in real time as new data arrives (relevant for fraud detection, system monitoring, and production ML drift detection).\n\nKey algorithms: PELT (Pruned Exact Linear Time) is an exact offline changepoint search algorithm with O(n) complexity under certain cost functions, implemented in the ruptures Python library. BOCPD (Bayesian Online Change Point Detection, Adams and MacKay, 2007) maintains a posterior distribution over the run length since the last changepoint, providing probabilistic online detection. CUSUM (Cumulative Sum) detects shifts in process mean using sequential hypothesis testing — standard in statistical process control. PROPHET changepoint detection uses a piecewise linear trend model with automatic changepoint location inference. For multivariate time series, TIRE (Time-series Representation for Changepoints) and matrix profile methods extend CPD to high-dimensional settings.\n\nUK applications: (1) Production ML monitoring: detecting feature distribution changepoints that signal model drift requiring retraining — integrating with MLflow and Evidently AI monitoring pipelines. (2) Fraud detection: identifying changepoints in transaction pattern time series that indicate account compromise or new fraud campaign emergence. (3) Bank of England macroprudential monitoring: detecting structural breaks in credit growth, house price series, or leverage ratios that indicate emerging systemic risk. (4) Energy systems: detecting changepoints in electricity demand patterns (post-COVID remote working shift, EV adoption ramps) for demand forecasting model updates.",
    relatedTerms: ["prophet-forecasting", "temporal-fusion-transformer", "conformal-prediction", "neural-ode"],
    relatedService: "data-analytics",
    relatedNichePage: "/ai/machine-learning",
  },
  {
    slug: "neural-ode",
    termUk: "Нейронні диференціальні рівняння (Neural ODE)",
    termEn: "Neural ODE (Neural Ordinary Differential Equation)",
    category: "ai",
    shortDescription: "Continuous-depth neural network architecture (Chen et al., NeurIPS 2018) that parameterises the derivative of hidden state with a neural network and integrates forward using an ODE solver — enabling irregularly sampled time series, latent dynamics modelling, and normalising flows.",
    fullDescription: "Neural ODEs (Chen et al., NeurIPS 2018) reconceive neural networks not as discrete layer stacks but as continuous dynamical systems: the hidden state h(t) evolves according to dh/dt = f(h(t), t; theta), where f is a neural network. The final state h(T) is computed by numerically integrating this ODE from h(0) (the input) to h(T) (the output) using a black-box ODE solver (Dormand-Prince, Adams-Bashforth).\n\nKey properties: Memory efficiency — backpropagation uses the adjoint method rather than storing intermediate activations, enabling constant memory O(1) with respect to integration depth. Adaptive computation — ODE solvers adaptively control the number of function evaluations, spending more computation on complex dynamics. Continuous-time — naturally handles irregularly sampled time series without resampling.\n\nLatent ODE: Combines a neural ODE with a VAE encoder. An RNN encoder processes the observed (potentially irregular) time series; a VAE latent variable captures uncertainty in the initial condition; the neural ODE evolves the latent state continuously; a decoder generates predictions at arbitrary future times. This is the state-of-the-art for irregularly sampled physiological time series (clinical measurements, IoT sensor data with missing readings).\n\nNormalising flows: Continuous normalising flows (CNF) use neural ODEs as a change-of-variables transformation, producing flexible probability density estimators. FFJORD (free-form Jacobian of reversible dynamics) makes CNFs computationally tractable.\n\nUK applications: Electronic health records with irregular measurement schedules (NHS patient vital signs, lab results sampled at non-uniform times). Financial tick data modelling (trade-by-trade price dynamics at irregular microsecond timestamps). Battery degradation modelling for UK EV manufacturers (continuous degradation dynamics with sparse periodic measurements).",
    relatedTerms: ["temporal-fusion-transformer", "conformal-prediction", "change-point-detection", "prophet-forecasting"],
    relatedService: "artificial-intelligence",
    relatedNichePage: "/ai/machine-learning",
  },
];

export const GLOSSARY_TERM_SLUGS = GLOSSARY_TERMS.map((t) => t.slug);

export function getTerm(slug: string): GlossaryTerm | undefined {
  return GLOSSARY_TERMS.find((t) => t.slug === slug);
}

export function getTermsByCategory(category: GlossaryCategory): GlossaryTerm[] {
  return GLOSSARY_TERMS.filter((t) => t.category === category);
}
