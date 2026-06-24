import type { Metadata } from "next";
import { buildAlternates } from "@/i18n";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isUk = lang === "uk";
  return {
    title: isUk ? "Політика конфіденційності | Codeworth" : "Privacy Policy | Codeworth",
    description: isUk
      ? "Політика конфіденційності Codeworth — як ми збираємо, зберігаємо та захищаємо ваші персональні дані."
      : "Codeworth Privacy Policy — how we collect, store, and protect your personal data.",
    openGraph: {
      title: isUk ? "Політика конфіденційності — Codeworth" : "Privacy Policy — Codeworth",
      description: isUk
        ? "Умови збору та обробки персональних даних у веб-студії Codeworth."
        : "Terms for collection and processing of personal data at Codeworth web studio.",
      type: "website",
      url: `https://codeworth.uk/${lang}/privacy`,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Codeworth" }],
    },
    twitter: {
      card: "summary_large_image",
      images: ["/opengraph-image"],
    },
    alternates: buildAlternates(lang, 'privacy'),
  };
}

const LAST_UPDATED = "1 березня 2025";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Головна", item: "https://codeworth.uk" },
    { "@type": "ListItem", position: 2, name: "Політика конфіденційності" },
  ],
};

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isUk = lang === "uk";
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main id="main-content" className="flex-1">
        {/* Hero */}
        <section className="pt-32 pb-12 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-100">
          <Container>
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
                {isUk ? "Юридична інформація" : "Legal Information"}
              </p>
              <h1 className="text-4xl font-heading font-extrabold text-neutral-900 dark:text-white mb-3">
                {isUk ? "Політика конфіденційності" : "Privacy Policy"}
              </h1>
              <p className="text-neutral-500">
                {isUk
                  ? `Остання редакція: ${LAST_UPDATED} · Набуває чинності з моменту публікації`
                  : `Last updated: March 1, 2025 · Effective upon publication`}
              </p>
            </div>
          </Container>
        </section>

        {/* Content */}
        <section className="py-16 bg-white dark:bg-neutral-950">
          <Container>
            <div className="max-w-3xl prose prose-neutral prose-headings:font-heading prose-headings:font-bold prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline">

              {isUk ? (
                <>
                  <p className="lead text-neutral-600">
                    Ця Політика конфіденційності описує, як Codeworth (далі — «ми», «нас») збирає,
                    використовує та захищає ваші персональні дані під час використання сайту{" "}
                    <Link href="https://codeworth.uk">codeworth.uk</Link> та пов'язаних сервісів.
                  </p>
                  <h2>1. Хто ми</h2>
                  <p>
                    Codeworth — веб-студія повного циклу, що надає послуги розробки сайтів, SEO,
                    дизайну та продає готові нішеві рішення через маркетплейс.
                  </p>
                  <ul>
                    <li>Сайт: codeworth.uk</li>
                    <li>Email: hello@codeworth.uk</li>
                    <li>Telegram: @codeworth_uk</li>
                    <li>Місцезнаходження: м. Київ, Україна</li>
                  </ul>
                  <h2>2. Які дані ми збираємо</h2>
                  <p>Ми збираємо лише ті дані, які необхідні для надання послуг та покращення вашого досвіду:</p>
                  <h3>2.1 Дані, які ви надаєте самостійно</h3>
                  <ul>
                    <li><strong>Контактна форма</strong> — ім'я, email, телефон, опис проєкту</li>
                    <li><strong>Форма замовлення</strong> — ім'я, email, телефон, обраний продукт/послуга</li>
                    <li><strong>Підписка на блог</strong> — email-адреса</li>
                    <li><strong>Реєстрація в кабінеті</strong> — ім'я, email, пароль (у хешованому вигляді)</li>
                  </ul>
                  <h3>2.2 Технічні дані (збираються автоматично)</h3>
                  <ul>
                    <li>IP-адреса та приблизне місцезнаходження</li>
                    <li>Тип браузера, операційна система, роздільна здатність екрана</li>
                    <li>URL сторінок, час відвідування, джерело переходу</li>
                    <li>Cookie-файли (детально — в Розділі 6)</li>
                  </ul>
                  <h2>3. Для чого ми використовуємо ваші дані</h2>
                  <ul>
                    <li>Обробка та виконання замовлень на послуги або продукти маркетплейсу</li>
                    <li>Зв'язок з вами щодо вашого проєкту або замовлення</li>
                    <li>Відправка розсилки (тільки за вашою згодою)</li>
                    <li>Покращення якості сайту та продуктів</li>
                    <li>Аналіз трафіку та ефективності маркетингових кампаній</li>
                    <li>Дотримання законодавчих вимог</li>
                  </ul>
                  <h2>4. Кому ми передаємо дані</h2>
                  <p>Ми <strong>не продаємо</strong> ваші персональні дані третім особам. Ми можемо передавати дані лише в таких випадках:</p>
                  <ul>
                    <li><strong>Платіжні системи</strong> (LiqPay, Stripe) — для обробки платежів</li>
                    <li><strong>Google Analytics / GA4</strong> — анонімізована статистика поведінки відвідувачів</li>
                    <li><strong>Telegram</strong> — сповіщення про нові заявки (для внутрішнього використання)</li>
                    <li><strong>Провайдер хостингу</strong> (Vercel) — для розміщення та роботи сайту</li>
                    <li><strong>Держоргани</strong> — за наявності законних підстав та судових рішень</li>
                  </ul>
                  <h2>5. Як довго ми зберігаємо дані</h2>
                  <ul>
                    <li><strong>Дані контактних форм</strong> — до 2 років або до виконання замовлення</li>
                    <li><strong>Дані облікових записів</strong> — весь строк існування акаунту + 1 рік після видалення</li>
                    <li><strong>Дані аналітики</strong> — до 26 місяців (стандарт Google Analytics)</li>
                    <li><strong>Email-підписники</strong> — до відписки або запиту на видалення</li>
                  </ul>
                  <h2>6. Cookies</h2>
                  <ul>
                    <li><strong>Необхідні (завжди активні)</strong> — базова робота сайту: сесія, кошик, тема</li>
                    <li><strong>Аналітичні</strong> — Google Analytics для аналізу трафіку (потребують вашої згоди)</li>
                    <li><strong>Маркетингові</strong> — ретаргетинг та реклама (потребують вашої згоди)</li>
                  </ul>
                  <p>Ви можете керувати згодою через cookie-банер або налаштування браузера.</p>
                  <h2>7. Ваші права</h2>
                  <p>Відповідно до GDPR та законодавства України ви маєте право:</p>
                  <ul>
                    <li><strong>Доступ</strong> — запитати які дані ми маємо про вас</li>
                    <li><strong>Виправлення</strong> — попросити виправити неточні дані</li>
                    <li><strong>Видалення</strong> («право бути забутим»)</li>
                    <li><strong>Обмеження</strong> — обмежити обробку ваших даних</li>
                    <li><strong>Перенесення</strong> — отримати дані у машинно-зчитуваному форматі</li>
                    <li><strong>Відкликання згоди</strong> — в будь-який момент</li>
                  </ul>
                  <p>Для реалізації прав надішліть запит на hello@codeworth.uk. Ми відповімо протягом 30 днів.</p>
                  <h2>8. Безпека даних</h2>
                  <ul>
                    <li>HTTPS/TLS шифрування всіх передач даних</li>
                    <li>Хешування паролів (bcrypt)</li>
                    <li>Обмежений доступ за принципом мінімальних привілеїв</li>
                    <li>Регулярне резервне копіювання</li>
                    <li>Захист від SQL-ін'єкцій та XSS через серверну валідацію</li>
                  </ul>
                  <h2>9. Зміни до цієї Політики</h2>
                  <p>
                    Ми можемо оновлювати цю Політику. Про суттєві зміни ми повідомимо через email або
                    оголошення на сайті. Дата останнього оновлення відображається у верхній частині сторінки.
                  </p>
                  <h2>10. Контакти</h2>
                  <ul>
                    <li>Email: hello@codeworth.uk</li>
                    <li>Telegram: @codeworth_uk</li>
                  </ul>
                </>
              ) : (
                <>
                  <p className="lead text-neutral-600">
                    This Privacy Policy describes how Codeworth (hereinafter — "we", "us") collects,
                    uses, and protects your personal data when you use the website{" "}
                    <Link href="https://codeworth.uk">codeworth.uk</Link> and related services.
                  </p>
                  <h2>1. Who we are</h2>
                  <p>
                    Codeworth is a machine learning and AI consultancy delivering production ML systems,
                    data science solutions, and MLOps services to UK businesses.
                  </p>
                  <ul>
                    <li>Website: codeworth.uk</li>
                    <li>Email: hello@codeworth.uk</li>
                    <li>Telegram: @codeworth_uk</li>
                    <li>Location: United Kingdom</li>
                  </ul>
                  <h2>2. What data we collect</h2>
                  <p>We only collect data necessary to provide services and improve your experience:</p>
                  <h3>2.1 Data you provide directly</h3>
                  <ul>
                    <li><strong>Contact form</strong> — name, email, phone, project description</li>
                    <li><strong>Order form</strong> — name, email, phone, selected product/service</li>
                    <li><strong>Blog subscription</strong> — email address</li>
                    <li><strong>Account registration</strong> — name, email, password (hashed)</li>
                  </ul>
                  <h3>2.2 Technical data (collected automatically)</h3>
                  <ul>
                    <li>IP address and approximate location</li>
                    <li>Browser type, operating system, screen resolution</li>
                    <li>Page URLs, visit timestamps, referral source</li>
                    <li>Cookies (detailed in Section 6)</li>
                  </ul>
                  <h2>3. How we use your data</h2>
                  <ul>
                    <li>Processing and fulfilling service or marketplace product orders</li>
                    <li>Communicating with you about your project or order</li>
                    <li>Sending newsletters (only with your consent)</li>
                    <li>Improving site quality and products</li>
                    <li>Traffic analysis and marketing campaign effectiveness</li>
                    <li>Compliance with legal requirements</li>
                  </ul>
                  <h2>4. Who we share data with</h2>
                  <p>We <strong>do not sell</strong> your personal data to third parties. We may share data only in these cases:</p>
                  <ul>
                    <li><strong>Payment systems</strong> (LiqPay, Stripe) — for payment processing</li>
                    <li><strong>Google Analytics / GA4</strong> — anonymised visitor behaviour statistics</li>
                    <li><strong>Telegram</strong> — notifications about new enquiries (internal use)</li>
                    <li><strong>Hosting provider</strong> (Vercel) — for site hosting and operation</li>
                    <li><strong>Government authorities</strong> — when required by law or court order</li>
                  </ul>
                  <h2>5. How long we retain data</h2>
                  <ul>
                    <li><strong>Contact form data</strong> — up to 2 years or until order fulfilment</li>
                    <li><strong>Account data</strong> — for the lifetime of the account + 1 year after deletion</li>
                    <li><strong>Analytics data</strong> — up to 26 months (Google Analytics standard)</li>
                    <li><strong>Email subscribers</strong> — until unsubscription or deletion request</li>
                  </ul>
                  <h2>6. Cookies</h2>
                  <ul>
                    <li><strong>Necessary (always active)</strong> — basic site functionality: session, cart, theme</li>
                    <li><strong>Analytics</strong> — Google Analytics for traffic analysis (require your consent)</li>
                    <li><strong>Marketing</strong> — retargeting and advertising (require your consent)</li>
                  </ul>
                  <p>You can manage consent through the cookie banner or browser settings.</p>
                  <h2>7. Your rights</h2>
                  <p>Under GDPR and Ukrainian law, you have the right to:</p>
                  <ul>
                    <li><strong>Access</strong> — request what data we hold about you</li>
                    <li><strong>Rectification</strong> — ask us to correct inaccurate data</li>
                    <li><strong>Erasure</strong> ("right to be forgotten")</li>
                    <li><strong>Restriction</strong> — limit the processing of your data</li>
                    <li><strong>Portability</strong> — receive your data in a machine-readable format</li>
                    <li><strong>Withdrawal of consent</strong> — at any time</li>
                  </ul>
                  <p>To exercise these rights, send a request to hello@codeworth.uk. We will respond within 30 days.</p>
                  <h2>8. Data security</h2>
                  <ul>
                    <li>HTTPS/TLS encryption for all data transfers</li>
                    <li>Password hashing (bcrypt)</li>
                    <li>Limited access on a least-privilege basis</li>
                    <li>Regular backups</li>
                    <li>Protection against SQL injection and XSS via server-side validation</li>
                  </ul>
                  <h2>9. Changes to this Policy</h2>
                  <p>
                    We may update this Policy. We will notify you of significant changes via email or
                    a site announcement. The date of the last update is shown at the top of this page.
                  </p>
                  <h2>10. Contact</h2>
                  <ul>
                    <li>Email: hello@codeworth.uk</li>
                    <li>Telegram: @codeworth_uk</li>
                  </ul>
                </>
              )}

              <div className="mt-10 p-5 rounded-2xl bg-indigo-50 border border-indigo-100 not-prose">
                <p className="text-sm text-neutral-600">
                  {isUk ? "Також ознайомтесь з нашою" : "Also read our"}{" "}
                  <Link href={`/${lang}/terms-of-service`} className="text-indigo-600 font-semibold hover:underline">
                    {isUk ? "Угодою користувача" : "Terms of Service"}
                  </Link>{" "}
                  {isUk ? "та поверніться на" : "or go back to the"}{" "}
                  <Link href={`/${lang}/`} className="text-indigo-600 font-semibold hover:underline">
                    {isUk ? "Головну сторінку" : "Home page"}
                  </Link>.
                </p>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
