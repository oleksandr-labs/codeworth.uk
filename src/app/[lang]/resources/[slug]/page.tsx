import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildAlternates } from "@/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { RESOURCES, RESOURCE_CATEGORIES, getResource, RESOURCE_SLUGS } from "@/lib/data/resources";
import { ArrowRight, CheckSquare, Clock, ExternalLink, Share2, Zap } from "lucide-react";
import { EmojiIcon } from "@/components/ui/EmojiIcon";
import { SpeedTestTool } from "@/components/resources/SpeedTestTool";

export async function generateStaticParams() {
  const langs = ["uk", "en"];
  return langs.flatMap((lang) => RESOURCE_SLUGS.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const resource = getResource(slug);
  if (!resource) return {};
  const isUk = lang === "uk";
  const title = isUk
    ? `${resource.titleUk} | Безкоштовно від Codeworth`
    : `${resource.titleEn} | Free from Codeworth`;
  const desc = isUk ? resource.descriptionUk : resource.descriptionEn;
  return {
    title,
    description: desc,
    openGraph: {
      title,
      description: desc,
      type: "article",
      url: `https://codeworth.uk/${lang}/resources/${slug}`,
    },
    alternates: buildAlternates(lang, `/resources/${slug}`),
  };
}

// Static content for each resource
const RESOURCE_CONTENT: Record<string, {
  introUk: string;
  introEn: string;
  sectionsUk: { heading: string; items: string[] }[];
  sectionsEn: { heading: string; items: string[] }[];
}> = {
  "ml-roi-checklist": {
    introUk: "Перед тим як інвестувати в ML-проєкт, важливо перевірити: чи є у вас дані, чи визначена бізнес-мета, чи готова інфраструктура. Цей чек-ліст — результат аналізу 40+ ML-впроваджень Codeworth.",
    introEn: "Before investing in an ML project, it is critical to verify: do you have the data, is the business objective defined, is your infrastructure ready. This checklist distils lessons from 40+ ML deployments by Codeworth.",
    sectionsUk: [
      {
        heading: "📊 Дані та якість",
        items: [
          "Є щонайменше 12 місяців релевантних даних",
          "Дані зберігаються в структурованому вигляді (SQL/CSV/data warehouse)",
          "Відсутність даних (null values) < 20% у ключових полях",
          "Визначений та надійний target label (що саме прогнозуємо)",
          "Дані не мають критичного class imbalance (менше 1:100)",
          "Є можливість збирати нові дані після деплою моделі",
        ],
      },
      {
        heading: "🎯 Бізнес-мета та ROI",
        items: [
          "Бізнес-проблема чітко сформульована (не 'впровадити AI', а 'знизити churn на 20%')",
          "Визначена baseline метрика (поточна ефективність без ML)",
          "Розрахований мінімально прийнятний ROI для ухвалення рішення",
          "Stakeholder, відповідальний за ML-проєкт, визначений",
          "Бюджет на Discovery + PoC + Production виділений окремо",
          "Критерії success (go/no-go) після PoC узгоджені",
        ],
      },
      {
        heading: "🏗️ Технічна готовність",
        items: [
          "Є API або можливість інтеграції ML-моделі з existing systems",
          "Cloud платформа або on-premise GPU обрані",
          "Процес Data Engineering (pipeline від сирих даних до features) можливий",
          "Команда або ресурси для MLOps після деплою передбачені",
          "Data governance і privacy (UK GDPR) перевірені",
          "Є внутрішня команда, здатна підтримувати ML-систему після деплою",
        ],
      },
      {
        heading: "⚠️ Ризики та blockers",
        items: [
          "Дані не містять особистої інформації без відповідних захистів (UK GDPR Art.22)",
          "ML-рішення не підпадає під MHRA (не медичний пристрій) або є план сертифікації",
          "Немає ключової залежності від одного data source, який може зникнути",
          "Legal/compliance перевірили використання даних для ML",
          "Є план для 'model degradation' — що робити, коли точність падає",
        ],
      },
    ],
    sectionsEn: [
      {
        heading: "📊 Data and Quality",
        items: [
          "At least 12 months of relevant historical data available",
          "Data stored in structured format (SQL/CSV/data warehouse)",
          "Missing values (nulls) < 20% in key fields",
          "Target label is clearly defined and reliably measured",
          "No critical class imbalance (less than 1:100 ratio)",
          "Mechanism to collect new data after model deployment exists",
        ],
      },
      {
        heading: "🎯 Business Objective and ROI",
        items: [
          "Business problem clearly stated (not 'implement AI', but 'reduce churn by 20%')",
          "Baseline metric defined (current performance without ML)",
          "Minimum acceptable ROI threshold agreed for go/no-go decision",
          "Business stakeholder accountable for the ML project identified",
          "Budget for Discovery + PoC + Production allocated separately",
          "Success criteria (go/no-go) after PoC agreed with stakeholders",
        ],
      },
      {
        heading: "🏗️ Technical Readiness",
        items: [
          "API or integration pathway for ML model with existing systems exists",
          "Cloud platform or on-premise GPU infrastructure selected",
          "Data engineering pipeline (raw data → features) is feasible",
          "Team or budget for MLOps after deployment is planned",
          "Data governance and privacy (UK GDPR) reviewed",
          "Internal team capable of maintaining the ML system post-deployment exists",
        ],
      },
      {
        heading: "⚠️ Risks and Blockers",
        items: [
          "Data does not contain personal information without appropriate safeguards (UK GDPR Art.22)",
          "ML solution does not fall under MHRA regulation (not a medical device) or certification plan exists",
          "No critical dependency on a single data source that could become unavailable",
          "Legal/compliance has reviewed the use of data for ML",
          "Plan for model degradation defined — what happens when accuracy drops",
        ],
      },
    ],
  },
  "mlops-production-checklist": {
    introUk: "Задеплоїти ML-модель — це лише початок. Реальна цінність виникає коли модель стабільно працює в production місяцями. Цей чек-ліст покриває всі критичні компоненти надійного ML production.",
    introEn: "Deploying an ML model is just the beginning. Real value emerges when the model runs reliably in production for months. This checklist covers all critical components of robust ML production.",
    sectionsUk: [
      {
        heading: "📦 Model packaging та versioning",
        items: [
          "Модель збережена у стандартному форматі (MLflow / ONNX / pickle з версією)",
          "Всі dependencies зафіксовані у requirements.txt або conda environment",
          "Reproducible training: той самий код + дані = той самий результат",
          "Model card задокументована (intended use, limitations, bias evaluation)",
          "Git tag або commit sha прив'язані до кожної версії моделі",
        ],
      },
      {
        heading: "🚀 Inference та API",
        items: [
          "REST API задокументований (OpenAPI / Swagger spec)",
          "Latency SLA визначена та перевірена (p95 < X ms)",
          "Health check endpoint /health або /ping реалізований",
          "API versioning (v1, v2) передбачений",
          "Graceful degradation: fallback при недоступності моделі",
          "Rate limiting та authentication на API endpoint",
        ],
      },
      {
        heading: "📊 Monitoring та alerting",
        items: [
          "Data drift monitoring (Jensen-Shannon divergence або PSI) налаштований",
          "Model performance metrics (precision/recall/RMSE) логуються у production",
          "Alerting при деградації metrics > X% за rolling window",
          "Prediction distribution monitoring (чи модель видає 'дивні' відповіді)",
          "Infrastructure metrics (CPU/memory/latency) в Grafana або аналог",
          "Audit log усіх predictions для regulated use cases",
        ],
      },
      {
        heading: "🔄 Retraining pipeline",
        items: [
          "Automatic retraining trigger при data drift або performance degradation",
          "A/B testing framework для порівняння нової та старої версії моделі",
          "Shadow mode deployment: нова модель логує predictions без впливу на production",
          "Rollback механізм: повернення до попередньої версії за < 5 хвилин",
          "Training data versioning (DVC або аналог)",
          "CI/CD pipeline для model training та deployment (GitHub Actions / Kubeflow)",
        ],
      },
    ],
    sectionsEn: [
      {
        heading: "📦 Model Packaging and Versioning",
        items: [
          "Model saved in a standard format (MLflow / ONNX / versioned pickle)",
          "All dependencies pinned in requirements.txt or conda environment",
          "Reproducible training: same code + data = same result",
          "Model card documented (intended use, limitations, bias evaluation)",
          "Git tag or commit SHA linked to each model version",
        ],
      },
      {
        heading: "🚀 Inference and API",
        items: [
          "REST API documented (OpenAPI / Swagger spec)",
          "Latency SLA defined and validated (p95 < X ms)",
          "Health check endpoint /health or /ping implemented",
          "API versioning (v1, v2) planned",
          "Graceful degradation: fallback when model is unavailable",
          "Rate limiting and authentication on API endpoint",
        ],
      },
      {
        heading: "📊 Monitoring and Alerting",
        items: [
          "Data drift monitoring (Jensen-Shannon divergence or PSI) configured",
          "Model performance metrics (precision/recall/RMSE) logged in production",
          "Alerting when metric degradation > X% over rolling window",
          "Prediction distribution monitoring (detecting 'unusual' model outputs)",
          "Infrastructure metrics (CPU/memory/latency) in Grafana or equivalent",
          "Audit log of all predictions for regulated use cases",
        ],
      },
      {
        heading: "🔄 Retraining Pipeline",
        items: [
          "Automatic retraining trigger on data drift or performance degradation",
          "A/B testing framework for comparing new vs old model version",
          "Shadow mode deployment: new model logs predictions without affecting production",
          "Rollback mechanism: return to previous version in < 5 minutes",
          "Training data versioning (DVC or equivalent)",
          "CI/CD pipeline for model training and deployment (GitHub Actions / Kubeflow)",
        ],
      },
    ],
  },
  "website-launch-checklist": {
    introUk: "Запускаєте сайт і хочете бути впевнені, що нічого не забули? Цей чек-ліст — результат перевірки 50+ сайтів командою Codeworth. Кожен пункт критично важливий для SEO, безпеки та першого враження клієнтів.",
    introEn: "Launching a website and want to make sure nothing is missed? This checklist is the result of auditing 50+ websites by the Codeworth team. Every item is critical for SEO, security, and first client impressions.",
    sectionsUk: [
      {
        heading: "🔒 Безпека та HTTPS",
        items: [
          "SSL-сертифікат встановлено та активний (HTTPS)",
          "HTTP → HTTPS redirect налаштований",
          "www → non-www redirect (або навпаки) налаштований",
          "Content Security Policy (CSP) заголовки додані",
          "HSTS заголовок активний",
        ],
      },
      {
        heading: "🔍 Технічне SEO",
        items: [
          "Robots.txt присутній і правильно налаштований",
          "Sitemap.xml згенерований та переданий у Google Search Console",
          "Canonical URL встановлені на всіх сторінках",
          "Всі сторінки мають унікальний Title та Meta Description",
          "Schema.org розмітка (Organization, LocalBusiness) додана",
          "OG-теги (title, description, image) для всіх сторінок",
          "Hreflang теги для мультимовних сайтів",
        ],
      },
      {
        heading: "📱 Мобільна версія та швидкість",
        items: [
          "Сайт перевірений у Google Mobile-Friendly Test",
          "PageSpeed Insights: Mobile score 85+",
          "LCP < 2.5 секунди",
          "CLS < 0.1",
          "Всі зображення оптимізовані (WebP/AVIF)",
          "Кнопки та посилання — мінімум 44px для дотику",
        ],
      },
      {
        heading: "📬 Форми та функціональність",
        items: [
          "Всі форми протестовані та надсилають дані",
          "Telegram/Email нотифікації від форм працюють",
          "Сторінка підтвердження після відправки форми",
          "Захист від спаму (honeypot або reCAPTCHA)",
          "404-сторінка кастомна та веде на головну",
        ],
      },
      {
        heading: "📊 Аналітика та правові вимоги",
        items: [
          "Google Analytics 4 підключений та відстежує події",
          "Google Search Console верифікований",
          "Cookie Banner (якщо використовуєте analytics/ads)",
          "Політика конфіденційності присутня та актуальна",
          "Умови використання (якщо є транзакції)",
        ],
      },
    ],
    sectionsEn: [
      {
        heading: "🔒 Security & HTTPS",
        items: [
          "SSL certificate installed and active (HTTPS)",
          "HTTP → HTTPS redirect configured",
          "www → non-www redirect (or vice versa) configured",
          "Content Security Policy (CSP) headers added",
          "HSTS header active",
        ],
      },
      {
        heading: "🔍 Technical SEO",
        items: [
          "Robots.txt present and correctly configured",
          "Sitemap.xml generated and submitted to Google Search Console",
          "Canonical URLs set on all pages",
          "All pages have unique Title and Meta Description",
          "Schema.org markup (Organization, LocalBusiness) added",
          "OG tags (title, description, image) for all pages",
          "Hreflang tags for multilingual sites",
        ],
      },
      {
        heading: "📱 Mobile & Speed",
        items: [
          "Website tested in Google Mobile-Friendly Test",
          "PageSpeed Insights: Mobile score 85+",
          "LCP < 2.5 seconds",
          "CLS < 0.1",
          "All images optimized (WebP/AVIF)",
          "Buttons and links minimum 44px for touch",
        ],
      },
      {
        heading: "📬 Forms & Functionality",
        items: [
          "All forms tested and sending data",
          "Telegram/Email notifications working",
          "Confirmation page after form submission",
          "Spam protection (honeypot or reCAPTCHA)",
          "Custom 404 page redirects to homepage",
        ],
      },
      {
        heading: "📊 Analytics & Legal",
        items: [
          "Google Analytics 4 connected and tracking events",
          "Google Search Console verified",
          "Cookie Banner (if using analytics/ads)",
          "Privacy Policy present and up to date",
          "Terms of Service (if transactions involved)",
        ],
      },
    ],
  },
  "seo-audit-checklist": {
    introUk: "SEO-аудит не потребує спеціального ПЗ чи технічних знань. Цей чек-ліст допоможе вам самостійно виявити найпоширеніші проблеми, що заважають вашому сайту потрапити в топ Google.",
    introEn: "An SEO audit doesn't require special software or technical knowledge. This checklist will help you independently identify the most common issues preventing your website from reaching Google's top results.",
    sectionsUk: [
      {
        heading: "⚙️ Технічне SEO",
        items: [
          "Сайт доступний через HTTPS (зелений замочок у браузері)",
          "Robots.txt не блокує важливі сторінки",
          "Sitemap.xml присутній та переданий у Search Console",
          "Немає redirect-ланцюжків (301 → 301 → ...)",
          "Немає сторінок з 404-помилкою (перевірити через Search Console)",
          "Швидкість: PageSpeed Mobile 70+",
          "Core Web Vitals LCP < 2.5с, CLS < 0.1",
        ],
      },
      {
        heading: "📝 On-Page SEO",
        items: [
          "Кожна сторінка має унікальний Title (50–60 символів)",
          "Кожна сторінка має унікальний Meta Description (150–160 символів)",
          "На кожній сторінці є тільки один H1",
          "H2–H6 використовуються для структури (не для стилізації)",
          "Всі зображення мають alt-атрибути з описом",
          "URL-адреси: короткі, з ключовими словами, без спецсимволів",
          "Canonical URL встановлені (немає дублікатів)",
        ],
      },
      {
        heading: "🔗 Посилання та контент",
        items: [
          "Немає битих внутрішніх посилань",
          "Зовнішні посилання мають rel=noopener",
          "Внутрішня перелінковка між пов'язаними сторінками",
          "Контент унікальний (не скопійований)",
          "Ключові слова використовуються природньо (не спам)",
          "Текст читабельний: абзаци, заголовки, списки",
        ],
      },
      {
        heading: "📍 Локальне SEO",
        items: [
          "Google Business Profile заповнений",
          "NAP (Name, Address, Phone) однаковий скрізь",
          "Schema.org LocalBusiness додана",
          "Відгуки на Google присутні",
        ],
      },
    ],
    sectionsEn: [
      {
        heading: "⚙️ Technical SEO",
        items: [
          "Website accessible via HTTPS (green lock in browser)",
          "Robots.txt not blocking important pages",
          "Sitemap.xml present and submitted to Search Console",
          "No redirect chains (301 → 301 → ...)",
          "No pages with 404 errors (check via Search Console)",
          "Speed: PageSpeed Mobile 70+",
          "Core Web Vitals LCP < 2.5s, CLS < 0.1",
        ],
      },
      {
        heading: "📝 On-Page SEO",
        items: [
          "Every page has a unique Title (50–60 characters)",
          "Every page has a unique Meta Description (150–160 characters)",
          "Only one H1 per page",
          "H2–H6 used for structure (not styling)",
          "All images have descriptive alt attributes",
          "URLs: short, keyword-rich, no special characters",
          "Canonical URLs set (no duplicates)",
        ],
      },
      {
        heading: "🔗 Links & Content",
        items: [
          "No broken internal links",
          "External links have rel=noopener",
          "Internal linking between related pages",
          "Content is unique (not copied)",
          "Keywords used naturally (not spam)",
          "Text readable: paragraphs, headings, lists",
        ],
      },
      {
        heading: "📍 Local SEO",
        items: [
          "Google Business Profile filled out",
          "NAP (Name, Address, Phone) consistent everywhere",
          "Schema.org LocalBusiness added",
          "Google reviews present",
        ],
      },
    ],
  },
  "ux-conversion-checklist": {
    introUk: "Конверсія — відсоток відвідувачів, що виконують цільову дію. Цей чек-ліст допоможе виявити UX-проблеми, що «крадуть» ваших потенційних клієнтів. Більшість пунктів можна виправити без розробника.",
    introEn: "Conversion rate is the percentage of visitors who take the desired action. This checklist helps identify UX issues that are 'stealing' your potential clients. Most items can be fixed without a developer.",
    sectionsUk: [
      {
        heading: "🎯 CTA та конверсія",
        items: [
          "Головний CTA видимий без прокрутки на десктопі та мобільному",
          "CTA описує вигоду ('Отримати прайс'), а не дію ('Натиснути')",
          "Кнопка CTA виділяється кольором (контраст 4.5:1)",
          "Один головний CTA на сторінку (не 5 різних)",
          "Після відправки форми є підтвердження або redirect",
        ],
      },
      {
        heading: "📝 Форми",
        items: [
          "Форма містить не більше 5 полів",
          "Підписи полів зрозумілі (не 'Name', а 'Ваше ім'я')",
          "Є приклад заповнення для складних полів",
          "Помилки валідації підказують, як виправити",
          "Мобільна клавіатура відповідає типу поля (tel, email)",
        ],
      },
      {
        heading: "🏆 Соціальні докази",
        items: [
          "Відгуки присутні — з ім'ям та компанією",
          "Є конкретні результати ('CTR +35%', а не 'великий досвід')",
          "Логотипи клієнтів або партнерів",
          "Кількість клієнтів або виконаних проєктів",
          "Сертифікати або нагороди (якщо є)",
        ],
      },
      {
        heading: "🧭 Навігація та UX",
        items: [
          "Меню зрозуміле — не більше 7 пунктів",
          "Телефон та email у хедері",
          "Хлібні крихти на внутрішніх сторінках",
          "Сайт завантажується менше ніж за 3 секунди",
          "Немає hover-ефектів, що ховають важливий контент",
        ],
      },
    ],
    sectionsEn: [
      {
        heading: "🎯 CTA & Conversion",
        items: [
          "Main CTA visible without scrolling on desktop and mobile",
          "CTA describes benefit ('Get Quote'), not action ('Click Here')",
          "CTA button stands out with color (contrast 4.5:1)",
          "One main CTA per page (not 5 different ones)",
          "After form submission there's a confirmation or redirect",
        ],
      },
      {
        heading: "📝 Forms",
        items: [
          "Form has no more than 5 fields",
          "Field labels are clear (not 'Name' but 'Your Name')",
          "Input examples for complex fields",
          "Validation errors tell how to fix them",
          "Mobile keyboard matches field type (tel, email)",
        ],
      },
      {
        heading: "🏆 Social Proof",
        items: [
          "Reviews present — with name and company",
          "Specific results ('CTR +35%', not 'vast experience')",
          "Client or partner logos",
          "Number of clients or completed projects",
          "Certificates or awards (if any)",
        ],
      },
      {
        heading: "🧭 Navigation & UX",
        items: [
          "Menu is clear — no more than 7 items",
          "Phone and email visible in header",
          "Breadcrumbs on inner pages",
          "Website loads in under 3 seconds",
          "No hover effects hiding important content",
        ],
      },
    ],
  },
};

const GUIDE_CONTENT: Record<string, {
  introUk: string;
  introEn: string;
  sectionsUk: { heading: string; text: string }[];
  sectionsEn: { heading: string; text: string }[];
}> = {
  "ml-data-audit-guide": {
    introUk: "Якість даних — головний фактор успіху ML-проєкту. 70% проєктів, що провалюються, роблять це через проблеми з даними, а не через вибір алгоритму. Цей гайд допоможе провести систематичний аудит перед початком ML-розробки.",
    introEn: "Data quality is the primary success factor in ML projects. 70% of ML failures are caused by data problems, not algorithm choice. This guide helps you conduct a systematic data audit before starting ML development.",
    sectionsUk: [
      {
        heading: "Крок 1: Інвентаризація даних",
        text: "Зберіть повний перелік усіх доступних data sources: транзакційні бази (CRM, ERP), event logs (clickstream, server logs), external feeds (API, CSV uploads), і будь-які ручно зібрані дані.\n\nДля кожного джерела задокументуйте: обсяг (рядки, GB), частоту оновлення, відповідального власника, формат (SQL таблиця, CSV, JSON), та орієнтовний охоплений часовий діапазон.\n\n**Типова помилка:** команди припускають, що мають більше даних, ніж є насправді. Реальна inventory часто виявляє, що 'CRM' — це 3 різні системи з неузгодженими схемами.",
      },
      {
        heading: "Крок 2: Оцінка якості та completeness",
        text: "Для кожного ключового поля виміряйте: % null values (прийнятно < 5% для критичних полів), % дублікатів (рядки з ідентичними ключами), consistency (одне й те саме значення записано різними способами: 'Ltd', 'Limited', 'LTD'), і range violations (від'ємний вік, майбутні дати в historic records).\n\nІнструменти: Great Expectations (Python, open-source) для automated data validation, Pandas Profiling для quick EDA, AWS Glue Data Quality або dbt tests для warehouse даних.\n\n**UK GDPR note:** Під час аудиту ідентифікуйте всі поля, що є personal data за UK GDPR — ім'я, email, IP, location. Ці поля потребують окремого плану обробки перед ML.",
      },
      {
        heading: "Крок 3: Target label analysis",
        text: "Target label (що ML-модель прогнозуватиме) — найважливіше поле у датасеті. Перевірте:\n\n**Class distribution:** Для classification — скільки позитивних прикладів? Якщо менше 1%, class imbalance потребує спеціального підходу (SMOTE, class weights, threshold tuning).\n\n**Label quality:** Чи target надійно виміряний? Наприклад, для churn prediction: 'клієнт не купував 90+ днів' — операційне визначення, яке може включати seasonal buyers. Для fraud — помилкові мітки від manual review знижують якість.\n\n**Target leakage:** Чи є features, що 'знають майбутнє' (дані, що з'являються після того, як target реалізується)? Це найбільш поширена причина unrealistically high accuracy у PoC.",
      },
      {
        heading: "Крок 4: Feature relevance та available history",
        text: "Зберіть відповіді на:\n\n**Обсяг даних:** Для supervised learning — мінімум 1,000 labeled examples, краще 10,000+. Для time series — мінімум 2 повних сезонних цикли.\n\n**Feature coverage:** Які атрибути доступні для кожного прикладу? Неповні features (відсутні у 50%+ записів) малоцінні.\n\n**Historical consistency:** Чи змінювалась система, що генерує дані (schema changes, продукт-зміни, бізнес-правила)? Дані до major change часто несумісні з даними після.\n\n**Результат аудиту:** Документ з оцінкою 'ML Ready / Needs work / Not ready' для кожного data source, з конкретними action items для Data Engineering фази.",
      },
    ],
    sectionsEn: [
      {
        heading: "Step 1: Data Inventory",
        text: "Compile a complete list of all available data sources: transactional databases (CRM, ERP), event logs (clickstream, server logs), external feeds (API, CSV uploads), and any manually collected data.\n\nFor each source document: volume (rows, GB), update frequency, data owner, format (SQL table, CSV, JSON), and approximate time range covered.\n\n**Common mistake:** teams assume they have more data than they actually do. A real inventory often reveals that the 'CRM' is actually 3 different systems with inconsistent schemas.",
      },
      {
        heading: "Step 2: Quality and Completeness Assessment",
        text: "For each key field measure: % null values (acceptable < 5% for critical fields), % duplicates (rows with identical keys), consistency (the same value recorded in different ways: 'Ltd', 'Limited', 'LTD'), and range violations (negative age, future dates in historical records).\n\nTools: Great Expectations (Python, open-source) for automated data validation, Pandas Profiling for quick EDA, AWS Glue Data Quality or dbt tests for warehouse data.\n\n**UK GDPR note:** During the audit, identify all fields that constitute personal data under UK GDPR — name, email, IP address, location. These fields require a separate processing plan before ML.",
      },
      {
        heading: "Step 3: Target Label Analysis",
        text: "The target label (what the ML model will predict) is the most important field in the dataset. Check:\n\n**Class distribution:** For classification — how many positive examples? If under 1%, class imbalance requires special handling (SMOTE, class weights, threshold tuning).\n\n**Label quality:** Is the target reliably measured? For churn prediction: '90+ days without purchase' is an operational definition that may include seasonal buyers. For fraud — mislabelled examples from manual review degrade model quality.\n\n**Target leakage:** Are there features that 'know the future' (data that appears after the target event occurs)? This is the most common cause of unrealistically high accuracy in PoCs.",
      },
      {
        heading: "Step 4: Feature Relevance and Available History",
        text: "Gather answers to:\n\n**Data volume:** For supervised learning — minimum 1,000 labelled examples, ideally 10,000+. For time series — minimum 2 complete seasonal cycles.\n\n**Feature coverage:** What attributes are available for each record? Features missing in 50%+ of records are of limited value.\n\n**Historical consistency:** Did the system generating the data change (schema changes, product changes, business rule changes)? Data before a major change is often incompatible with data after.\n\n**Audit output:** A document rating each data source as 'ML Ready / Needs Work / Not Ready', with specific action items for the Data Engineering phase.",
      },
    ],
  },
  "fca-ml-compliance-guide": {
    introUk: "Машинне навчання у UK фінансових послугах підпадає під складну регуляторну базу: FCA SS1/23, UK GDPR Article 22, Consumer Duty. Цей гайд допоможе орієнтуватись у вимогах та уникнути типових compliance-пасток.",
    introEn: "Machine learning in UK financial services falls under a complex regulatory framework: FCA SS1/23, UK GDPR Article 22, and Consumer Duty. This guide helps you navigate the requirements and avoid common compliance traps.",
    sectionsUk: [
      {
        heading: "FCA SS1/23: Model Risk Management",
        text: "FCA Supervisory Statement SS1/23 (2023) — перший у Великобританії детальний регуляторний фреймворк для Model Risk Management (MRM). Застосовується до: великих deposit-takers та значних investment firms. Ключові вимоги:\n\n**Model inventory:** Централізований реєстр всіх моделей з класифікацією матеріальності (high/medium/low risk).\n\n**Model validation:** Незалежна валідація всіх high-risk моделей, включно з out-of-sample testing та stress testing.\n\n**Model governance:** Чіткі ролі та відповідальність: Model Developer, Model Owner, Independent Model Validation, Model Risk Committee.\n\n**Documentation:** Для кожної high-risk моделі — Model Development Document з описом методології, даних, обмежень та intended use.\n\n**Smaller firms:** Хоча SS1/23 прямо застосовується до великих фірм, FCA очікує пропорційного підходу від усіх regulated firms.",
      },
      {
        heading: "UK GDPR Article 22: Automated Decision-Making",
        text: "UK GDPR Article 22 надає фізичним особам право не підлягати рішенням, заснованим виключно на автоматизованій обробці, якщо такі рішення мають для них юридичний або суттєво аналогічний ефект.\n\n**Коли застосовується до ML:** Automated credit scoring, automated insurance underwriting, automated fraud investigation that results in account restriction.\n\n**Виключення:** Рішення необхідне для укладання/виконання договору; або людина здійснює meaningful oversight (не просто rubber stamp).\n\n**Right to explanation:** Клієнт може запитати пояснення автоматизованого рішення — ваша ML система повинна генерувати interpretable outputs (SHAP values або аналог).\n\n**Практична рекомендація:** Впровадьте human-in-the-loop для всіх high-impact automated decisions; задокументуйте, що людський перегляд є meaningful (не просто underwriter, який натискає 'approve' на 95% рішень).",
      },
      {
        heading: "Consumer Duty (2023): Good Outcomes Test",
        text: "FCA Consumer Duty (набрало чинності 31 липня 2023) вимагає від FCA-regulated фірм демонструвати, що їхні продукти та послуги надають 'good outcomes' для retail customers.\n\n**4 outcomes, де ML впливає:**\n1. **Products & Services:** Чи ML-driven продукт підходить цільовій аудиторії? (Algorithmic targeting повинен відповідати customer vulnerability assessment)\n2. **Price & Value:** Чи ML-based ціноутворення є справедливим? (Differential pricing може бути scrutinised)\n3. **Consumer Understanding:** Чи клієнти розуміють ML-driven рекомендації?\n4. **Consumer Support:** Чи є ефективний маршрут оскарження ML-рішення?\n\n**Практичні вимоги:** Документовані outcome monitoring metrics для ML-driven processes; регулярні reviews ML model performance з consumer outcomes perspective; Vulnerable Customer identification — ML не повинен систематично гіршати outcomes для vulnerable customers.",
      },
      {
        heading: "Bias Testing та Fairness у UK регуляторному контексті",
        text: "UK Equality Act 2010 забороняє дискримінацію за 9 protected characteristics: age, disability, gender reassignment, marriage/civil partnership, pregnancy/maternity, race, religion/belief, sex, sexual orientation.\n\n**ML Bias risk:** Якщо ML-модель використовує proxy features, що корелюють з protected characteristics (наприклад, postcode як proxy для race або disability), вона може порушувати Equality Act навіть без явного використання protected data.\n\n**FCA та ICO alignment:** ICO's Guidance on AI and Data Protection та FCA's Approach to Consumers вказують, що проактивне тестування на bias є regulatory expectation для regulated firms.\n\n**Практичний підхід:** Fairness audit на pre-deployment та щорічно: тестуйте model performance (accuracy, false positive rate, false negative rate) для кожної protected group. Документуйте результати. Якщо є disparate impact — investigate причини та коригуйте.",
      },
    ],
    sectionsEn: [
      {
        heading: "FCA SS1/23: Model Risk Management",
        text: "FCA Supervisory Statement SS1/23 (2023) is the UK's first detailed regulatory framework for Model Risk Management (MRM). Applies to: major deposit-takers and significant investment firms. Key requirements:\n\n**Model inventory:** A centralised register of all models with materiality classification (high/medium/low risk).\n\n**Model validation:** Independent validation of all high-risk models, including out-of-sample testing and stress testing.\n\n**Model governance:** Clear roles and responsibilities: Model Developer, Model Owner, Independent Model Validation, Model Risk Committee.\n\n**Documentation:** For each high-risk model — a Model Development Document covering methodology, data, limitations, and intended use.\n\n**Smaller firms:** While SS1/23 directly applies to large firms, FCA expects a proportionate approach from all regulated firms.",
      },
      {
        heading: "UK GDPR Article 22: Automated Decision-Making",
        text: "UK GDPR Article 22 gives individuals the right not to be subject to decisions based solely on automated processing if those decisions produce legal or similarly significant effects on them.\n\n**When it applies to ML:** Automated credit scoring, automated insurance underwriting, automated fraud investigation resulting in account restriction.\n\n**Exceptions:** The decision is necessary for entering into or performing a contract; or a human exercises meaningful oversight (not just rubber-stamping).\n\n**Right to explanation:** The individual can request an explanation of the automated decision — your ML system must generate interpretable outputs (SHAP values or equivalent).\n\n**Practical recommendation:** Implement human-in-the-loop for all high-impact automated decisions; document that human review is meaningful (not just an underwriter clicking 'approve' on 95% of decisions).",
      },
      {
        heading: "Consumer Duty (2023): Good Outcomes Test",
        text: "FCA Consumer Duty (effective 31 July 2023) requires FCA-regulated firms to demonstrate their products and services deliver 'good outcomes' for retail customers.\n\n**4 outcomes where ML has impact:**\n1. **Products & Services:** Is the ML-driven product suitable for the target audience? (Algorithmic targeting must align with customer vulnerability assessment)\n2. **Price & Value:** Is ML-based pricing fair? (Differential pricing may be scrutinised)\n3. **Consumer Understanding:** Do customers understand ML-driven recommendations?\n4. **Consumer Support:** Is there an effective route to challenge an ML decision?\n\n**Practical requirements:** Documented outcome monitoring metrics for ML-driven processes; regular ML model performance reviews from a consumer outcomes perspective; Vulnerable Customer identification — ML must not systematically worsen outcomes for vulnerable customers.",
      },
      {
        heading: "Bias Testing and Fairness in UK Regulatory Context",
        text: "The UK Equality Act 2010 prohibits discrimination based on 9 protected characteristics: age, disability, gender reassignment, marriage/civil partnership, pregnancy/maternity, race, religion/belief, sex, and sexual orientation.\n\n**ML Bias risk:** If an ML model uses proxy features correlated with protected characteristics (e.g., postcode as a proxy for race or disability), it may violate the Equality Act even without explicitly using protected data.\n\n**FCA and ICO alignment:** ICO's Guidance on AI and Data Protection and FCA's Approach to Consumers indicate that proactive bias testing is a regulatory expectation for regulated firms.\n\n**Practical approach:** Fairness audit pre-deployment and annually: test model performance (accuracy, false positive rate, false negative rate) for each protected group. Document results. If disparate impact is found — investigate root causes and remediate.",
      },
    ],
  },
  "website-cost-guide": {
    introUk: "Одне з найпоширеніших питань від власників бізнесу: «Скільки коштує сайт?». Відповідь залежить від типу сайту, виконавця та функціональності. Цей гайд розкладає все по поличках.",
    introEn: "One of the most common questions from business owners: 'How much does a website cost?' The answer depends on the type of site, the provider, and functionality. This guide breaks it all down.",
    sectionsUk: [
      {
        heading: "Типи сайтів та орієнтовні ціни (Україна, 2026)",
        text: "**Лендінг (1 сторінка):** 5 000–15 000 грн. Фрілансер — 3 000–7 000 грн, студія — 8 000–20 000 грн. Шаблон/конструктор — 500–2 000 грн + підписка.\n\n**Корпоративний сайт (5–15 сторінок):** 15 000–50 000 грн. Фрілансер — 8 000–20 000 грн, студія — 20 000–60 000 грн.\n\n**Інтернет-магазин:** 25 000–150 000 грн залежно від кількості товарів та функціональності.\n\n**SaaS / Веб-додаток:** 50 000–500 000 грн+.",
      },
      {
        heading: "З чого складається ціна розробки",
        text: "Ціна сайту — це не лише «зверстати дизайн». Вона включає:\n\n**Дизайн** (20–30% вартості): wireframes, UI-дизайн, адаптивні макети.\n**Розробка** (40–50%): фронтенд, бекенд, інтеграції.\n**Контент** (10–15%): тексти, фото, відео.\n**SEO** (10–15%): структура URL, метатеги, Schema.org.\n**Тестування** (5–10%): QA, Cross-browser, Mobile.\n**Хостинг та домен** (окремо): 1 000–5 000 грн/рік.",
      },
      {
        heading: "Фрілансер vs Студія vs Конструктор — що обрати?",
        text: "**Конструктор (Tilda, Wix):** Підходить для простого MVP або якщо бюджет до 5 000 грн. Обмеження: важко SEO-оптимізувати, немає власного коду, залежність від платформи.\n\n**Фрілансер:** Підходить для лендінгу або невеликого корпоративного сайту. Ризики: немає юридичної відповідальності, можлива затримка або зникнення.\n\n**Студія:** Підходить для серйозних проєктів з бюджетом від 15 000 грн. Переваги: команда (дизайнер + розробник + PM), договір, гарантія, підтримка після запуску.",
      },
    ],
    sectionsEn: [
      {
        heading: "Website Types and Approximate Prices (Ukraine, 2026)",
        text: "**Landing Page (1 page):** UAH 5,000–15,000. Freelancer — UAH 3,000–7,000, agency — UAH 8,000–20,000. Template/builder — UAH 500–2,000 + subscription.\n\n**Corporate Website (5–15 pages):** UAH 15,000–50,000. Freelancer — UAH 8,000–20,000, agency — UAH 20,000–60,000.\n\n**E-commerce Store:** UAH 25,000–150,000 depending on product count and features.\n\n**SaaS / Web App:** UAH 50,000–500,000+.",
      },
      {
        heading: "What Makes Up the Development Cost",
        text: "A website price isn't just 'building a design'. It includes:\n\n**Design** (20–30% of cost): wireframes, UI design, responsive layouts.\n**Development** (40–50%): frontend, backend, integrations.\n**Content** (10–15%): texts, photos, videos.\n**SEO** (10–15%): URL structure, meta tags, Schema.org.\n**Testing** (5–10%): QA, cross-browser, mobile.\n**Hosting & domain** (separate): UAH 1,000–5,000/year.",
      },
      {
        heading: "Freelancer vs Agency vs Builder — What to Choose?",
        text: "**Builder (Tilda, Wix):** Good for simple MVP or budgets under UAH 5,000. Limitations: hard to SEO-optimize, no custom code, platform dependency.\n\n**Freelancer:** Good for landing pages or small corporate sites. Risks: no legal accountability, possible delays or abandonment.\n\n**Agency:** Good for serious projects with budgets from UAH 15,000. Benefits: team (designer + developer + PM), contract, warranty, post-launch support.",
      },
    ],
  },
  "seo-starter-guide": {
    introUk: "SEO (пошукова оптимізація) — це довгострокова стратегія залучення клієнтів через Google без оплати за кожен клік. Цей гайд допоможе вам розпочати навіть без технічних знань.",
    introEn: "SEO (search engine optimization) is a long-term strategy for attracting clients through Google without paying for each click. This guide will help you get started even without technical knowledge.",
    sectionsUk: [
      { heading: "Крок 1: Зрозуміти свою аудиторію та ключові слова", text: "Перш ніж оптимізувати — потрібно знати, що шукають ваші клієнти. Інструменти: Google Search Console (безкоштовно), Ubersuggest (безкоштовно), Ahrefs або SEMrush (платно).\n\nПриклад для стоматологічної клініки: «стоматолог Київ» (2 000+ пошуків/місяць), «лікування карієсу ціна» (500+), «стоматологія без болю» (1 000+).\n\nПочніть з 20–30 ключових слів, що відображають послуги та локацію." },
      { heading: "Крок 2: Технічне SEO — основа все", text: "Без технічної основи SEO-контент не допоможе. Переконайтесь:\n\n- HTTPS активний ✓\n- Robots.txt правильний ✓\n- Sitemap.xml в Google Search Console ✓\n- Швидкість сайту: PageSpeed 70+ ✓\n- Сайт адаптивний для мобільних ✓\n\nПеревіряйте стан через Google Search Console — безкоштовно та офіційно." },
      { heading: "Крок 3: Локальне SEO — для офлайн-бізнесу", text: "Якщо ваш бізнес обслуговує клієнтів у конкретному місті — Local SEO критично важливий.\n\n**Google Business Profile:** Заповніть профіль повністю: адреса, телефон, години роботи, фото, категорія. Регулярно публікуйте пости, відповідайте на відгуки.\n\n**Локальні ключові слова:** Включіть місто в Title та H1 кожної сторінки: «Стоматологія Харків — клініка ДентаКлас».\n\n**Schema.org LocalBusiness:** Попросіть розробника додати JSON-LD розмітку — Google зможе показати вашу адресу, години та рейтинг прямо у видачі." },
    ],
    sectionsEn: [
      { heading: "Step 1: Understand Your Audience and Keywords", text: "Before optimizing — you need to know what your clients are searching for. Tools: Google Search Console (free), Ubersuggest (free), Ahrefs or SEMrush (paid).\n\nExample for a dental clinic: 'dentist Kyiv' (2,000+ searches/month), 'cavity treatment price' (500+), 'painless dentistry' (1,000+).\n\nStart with 20–30 keywords that reflect your services and location." },
      { heading: "Step 2: Technical SEO — The Foundation", text: "Without a technical foundation, SEO content won't help. Make sure:\n\n- HTTPS active ✓\n- Robots.txt correct ✓\n- Sitemap.xml in Google Search Console ✓\n- Site speed: PageSpeed 70+ ✓\n- Mobile-responsive ✓\n\nMonitor your status through Google Search Console — free and official." },
      { heading: "Step 3: Local SEO — For Physical Businesses", text: "If your business serves clients in a specific city — Local SEO is critical.\n\n**Google Business Profile:** Fill out your profile completely: address, phone, hours, photos, category. Regularly post updates, respond to reviews.\n\n**Local keywords:** Include the city in Title and H1 of each page: 'Dentistry Kharkiv — DentaClass Clinic'.\n\n**Schema.org LocalBusiness:** Ask your developer to add JSON-LD markup — Google will show your address, hours, and rating directly in search results." },
    ],
  },
  "digital-marketing-guide": {
    introUk: "Цифровий маркетинг — це не лише реклама в Facebook. Це екосистема каналів, кожен з яких працює по-своєму. Цей гайд допоможе обрати правильний мікс залежно від вашого бізнесу та бюджету.",
    introEn: "Digital marketing isn't just Facebook ads. It's an ecosystem of channels, each working differently. This guide helps you choose the right mix based on your business and budget.",
    sectionsUk: [
      { heading: "Огляд каналів і для кого вони підходять", text: "**SEO** — Для будь-якого бізнесу. Термін: 3–6 місяців до першого результату. Ефект: зростає з часом. Бюджет: від 3 000 грн/місяць.\n\n**Google Ads** — Для бізнесів з конкретною послугою та попитом в пошуку. Термін: результат одразу. Ефект: зупиняється при зупинці бюджету. Бюджет: від 5 000 грн/місяць.\n\n**Facebook/Instagram Ads** — Для B2C з візуальним продуктом (краса, їжа, мода). Термін: 2–4 тижні на оптимізацію. Бюджет: від 3 000 грн/місяць.\n\n**Email-маркетинг** — Для утримання клієнтів та повторних продажів. Бюджет: мінімальний при власній базі." },
      { heading: "З чого почати при обмеженому бюджеті", text: "Якщо бюджет до 10 000 грн/місяць — зосередьтеся на двох каналах:\n\n**1. Google Business Profile (безкоштовно):** Заповніть профіль → отримуйте клієнтів з Maps без витрат.\n\n**2. SEO-контент (3 000–5 000 грн/місяць):** 2–4 статті для блогу на місяць. Ефект накопичується і триває роками.\n\nДодавайте платні канали (Google Ads, Facebook Ads) коли SEO починає давати органічний трафік — так ROI значно вищий." },
    ],
    sectionsEn: [
      { heading: "Channel Overview and Who They Suit", text: "**SEO** — For any business. Timeline: 3–6 months to first result. Effect: grows over time. Budget: from UAH 3,000/month.\n\n**Google Ads** — For businesses with specific services and search demand. Timeline: immediate results. Effect: stops when budget stops. Budget: from UAH 5,000/month.\n\n**Facebook/Instagram Ads** — For B2C with visual products (beauty, food, fashion). Timeline: 2–4 weeks to optimize. Budget: from UAH 3,000/month.\n\n**Email Marketing** — For client retention and repeat sales. Budget: minimal with own list." },
      { heading: "Where to Start With a Limited Budget", text: "If budget is under UAH 10,000/month — focus on two channels:\n\n**1. Google Business Profile (free):** Fill out the profile → get clients from Maps at no cost.\n\n**2. SEO Content (UAH 3,000–5,000/month):** 2–4 blog articles per month. Effect accumulates and lasts for years.\n\nAdd paid channels (Google Ads, Facebook Ads) when SEO starts generating organic traffic — the ROI is significantly higher that way." },
    ],
  },
};

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const resource = getResource(slug);
  if (!resource) notFound();

  const isUk = lang === "uk";
  const catMeta = RESOURCE_CATEGORIES.find((c) => c.value === resource.category);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isUk ? "Головна" : "Home", item: `https://codeworth.uk/${lang}` },
      { "@type": "ListItem", position: 2, name: isUk ? "Ресурси" : "Resources", item: `https://codeworth.uk/${lang}/resources` },
      { "@type": "ListItem", position: 3, name: isUk ? resource.titleUk : resource.titleEn },
    ],
  };

  const isChecklist = resource.category === "checklist";
  const checklistContent = RESOURCE_CONTENT[slug];
  const guideContent = GUIDE_CONTENT[slug];

  // Schema.org — HowTo for checklists, Article for guides, WebApplication for tools
  const contentSchema = (() => {
    if (isChecklist && checklistContent) {
      return {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: isUk ? resource.titleUk : resource.titleEn,
        description: isUk ? resource.descriptionUk : resource.descriptionEn,
        step: (isUk ? checklistContent.sectionsUk : checklistContent.sectionsEn).map(
          (section) => ({
            "@type": "HowToSection",
            name: section.heading,
            itemListElement: section.items.map((text, i) => ({
              "@type": "HowToStep",
              position: i + 1,
              text,
            })),
          })
        ),
      };
    }
    if (guideContent) {
      return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: isUk ? resource.titleUk : resource.titleEn,
        description: isUk ? resource.descriptionUk : resource.descriptionEn,
        datePublished: resource.updatedAt,
        dateModified: resource.updatedAt,
        author: { "@type": "Organization", name: "Codeworth", url: "https://codeworth.uk" },
        publisher: { "@type": "Organization", name: "Codeworth", url: "https://codeworth.uk" },
      };
    }
    if (resource.category === "tool") {
      return {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: isUk ? resource.titleUk : resource.titleEn,
        description: isUk ? resource.descriptionUk : resource.descriptionEn,
        applicationCategory: "UtilitiesApplication",
        browserRequirements: "requires JavaScript",
        offers: { "@type": "Offer", price: "0", priceCurrency: "UAH" },
      };
    }
    return null;
  })();

  const pageUrl = `https://codeworth.uk/${lang}/resources/${slug}`;
  const pageTitle = encodeURIComponent(isUk ? resource.titleUk : resource.titleEn);
  const encodedUrl = encodeURIComponent(pageUrl);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {contentSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contentSchema) }} />
      )}
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-linear-to-br from-indigo-900 to-indigo-700 py-14">
          <Container>
            <nav className="mb-6 text-sm text-indigo-300">
              <Link href={`/${lang}`} className="hover:text-white transition-colors">{isUk ? "Головна" : "Home"}</Link>
              <span className="mx-2">›</span>
              <Link href={`/${lang}/resources`} className="hover:text-white transition-colors">{isUk ? "Ресурси" : "Resources"}</Link>
              <span className="mx-2">›</span>
              <span className="text-white">{isUk ? catMeta?.labelUk : catMeta?.labelEn}</span>
            </nav>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-medium text-indigo-300 bg-indigo-900/50 border border-indigo-700 px-3 py-1 rounded-full">
                {catMeta?.emoji && <EmojiIcon emoji={catMeta.emoji} className="w-4 h-4 inline-block align-middle mr-1" />}{isUk ? catMeta?.labelUk : catMeta?.labelEn}
              </span>
              <span className="text-xs text-indigo-300 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {resource.readTime} {isUk ? "хв читання" : "min read"}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold text-white mb-4 max-w-2xl">
              {isUk ? resource.titleUk : resource.titleEn}
            </h1>
            <p className="text-indigo-200 text-lg max-w-2xl">
              {isUk ? resource.descriptionUk : resource.descriptionEn}
            </p>
          </Container>
        </section>

        {/* Content */}
        <section className="py-12 bg-white">
          <Container>
            <div className="max-w-3xl mx-auto">
              {/* Intro */}
              {(checklistContent || guideContent) && (
                <p className="text-gray-700 dark:text-neutral-300 text-lg leading-relaxed mb-10 pb-8 border-b">
                  {isUk
                    ? (checklistContent?.introUk || guideContent?.introUk)
                    : (checklistContent?.introEn || guideContent?.introEn)}
                </p>
              )}

              {/* Checklist sections */}
              {isChecklist && checklistContent && (
                <div className="space-y-10">
                  {(isUk ? checklistContent.sectionsUk : checklistContent.sectionsEn).map((section, si) => (
                    <div key={si}>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{section.heading}</h2>
                      <ul className="space-y-2">
                        {section.items.map((item, ii) => (
                          <li key={ii} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:bg-neutral-900 transition-colors">
                            <CheckSquare className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {/* Guide sections */}
              {!isChecklist && guideContent && (
                <div className="space-y-10">
                  {(isUk ? guideContent.sectionsUk : guideContent.sectionsEn).map((section, si) => (
                    <div key={si}>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{section.heading}</h2>
                      <div className="prose prose-gray max-w-none">
                        {section.text.split("\n\n").map((para, pi) => (
                          <p
                            key={pi}
                            className="text-gray-700 dark:text-neutral-300 leading-relaxed mb-4"
                            dangerouslySetInnerHTML={{
                              __html: para
                                .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                                .replace(/\n/g, "<br/>"),
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Speed test tool */}
              {slug === "website-speed-test" && (
                <div>
                  <p className="text-gray-700 dark:text-neutral-300 text-lg leading-relaxed mb-8 pb-8 border-b">
                    {isUk
                      ? "Введіть URL свого сайту — отримайте миттєвий аналіз Core Web Vitals від Google Lighthouse: LCP, CLS, FCP, TTFB та загальний Performance Score."
                      : "Enter your website URL to get an instant Core Web Vitals analysis from Google Lighthouse: LCP, CLS, FCP, TTFB, and an overall Performance Score."}
                  </p>
                  <SpeedTestTool lang={lang} />
                </div>
              )}

              {/* Fallback for other tools/templates */}
              {!checklistContent && !guideContent && slug !== "website-speed-test" && (
                <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-8 text-center">
                  <Zap className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
                  <h2 className="text-xl font-semibold text-indigo-900 mb-2">
                    {isUk ? "Матеріал готується" : "Content coming soon"}
                  </h2>
                  <p className="text-indigo-700 mb-6">
                    {isUk
                      ? "Детальний контент для цього ресурсу буде доданий найближчим часом."
                      : "Detailed content for this resource will be added soon."}
                  </p>
                  <Link
                    href={`/${lang}/contact`}
                    className="inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors"
                  >
                    {isUk ? "Зв'язатись з нами" : "Contact Us"}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}

              {/* Tags + social sharing */}
              <div className="mt-10 pt-8 border-t">
                {resource.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-5">
                    {resource.tags.map((tag) => (
                      <span key={tag} className="text-sm text-gray-500 dark:text-neutral-400 bg-gray-100 dark:bg-neutral-800 px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="flex items-center gap-1.5 text-sm text-gray-500">
                    <Share2 className="w-4 h-4" />
                    {isUk ? "Поділитись:" : "Share:"}
                  </span>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${pageTitle}&url=${encodedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium px-3 py-1.5 rounded-full bg-black text-white hover:bg-gray-800 transition-colors"
                  >
                    X (Twitter)
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium px-3 py-1.5 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={`https://t.me/share/url?url=${encodedUrl}&text=${pageTitle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium px-3 py-1.5 rounded-full bg-sky-500 text-white hover:bg-sky-600 transition-colors"
                  >
                    Telegram
                  </a>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Back + CTA */}
        <section className="py-12 bg-gray-50 dark:bg-neutral-900 border-t">
          <Container>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <Link
                href={`/${lang}/resources`}
                className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
              >
                ← {isUk ? "Всі ресурси" : "All Resources"}
              </Link>
              <Link
                href={
                  resource.relatedService
                    ? `/${lang}/services/${resource.relatedService}`
                    : `/${lang}/contact`
                }
                className="inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors"
              >
                {resource.relatedService
                  ? isUk
                    ? "Замовити відповідну послугу"
                    : "Order Related Service"
                  : isUk
                  ? "Замовити аудит або консультацію"
                  : "Order Audit or Consultation"}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
