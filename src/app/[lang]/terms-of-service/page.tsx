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
    title: isUk ? "Угода користувача | Codeworth" : "Terms of Service | Codeworth",
    description: isUk
      ? "Угода користувача Codeworth — умови надання ML/AI консалтингових послуг."
      : "Codeworth Terms of Service — conditions for machine learning, AI consulting, and MLOps services.",
    openGraph: {
      title: isUk ? "Угода користувача — Codeworth" : "Terms of Service — Codeworth",
      description: isUk
        ? "Умови надання ML/AI консалтингових послуг від Codeworth."
        : "Conditions for machine learning, AI consulting, and MLOps services from Codeworth.",
      type: "website",
      url: `https://codeworth.uk/${lang}/terms-of-service`,
      images: [{ url: "/og/home.png", width: 1200, height: 630, alt: "Codeworth" }],
    },
    twitter: {
      card: "summary_large_image",
      images: ["/og/home.png"],
    },
    alternates: buildAlternates(lang, 'terms-of-service'),
  };
}

const LAST_UPDATED = "1 березня 2025";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Головна", item: "https://codeworth.uk" },
    { "@type": "ListItem", position: 2, name: "Угода користувача" },
  ],
};

export default async function TermsOfServicePage({ params }: { params: Promise<{ lang: string }> }) {
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
                {isUk ? "Угода користувача" : "Terms of Service"}
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
                    Ця Угода користувача регулює умови надання послуг компанією Codeworth
                    (далі — «Виконавець», «ми») клієнтам (далі — «Замовник», «ви»).
                    Використовуючи сайт або замовляючи послуги, ви погоджуєтесь з умовами цієї Угоди.
                  </p>
                  <h2>1. Предмет Угоди</h2>
                  <p>
                    Виконавець надає такі послуги: розробку веб-сайтів, лендінгів та веб-застосунків;
                    SEO-оптимізацію; UI/UX дизайн; розробку чат-ботів та CRM; підтримку та супровід сайтів;
                    а також продаж готових нішевих рішень через Маркетплейс Codeworth.
                  </p>
                  <h2>2. Порядок замовлення</h2>
                  <ol>
                    <li>Замовник заповнює контактну форму або звертається у месенджер</li>
                    <li>Виконавець проводить безкоштовну консультацію та надає комерційну пропозицію</li>
                    <li>Після погодження умов Замовник підписує договір та сплачує передоплату</li>
                    <li>Виконавець виконує роботи відповідно до затвердженого ТЗ та строків</li>
                    <li>Після прийняття результатів Замовник сплачує залишок</li>
                  </ol>
                  <h2>3. Умови оплати</h2>
                  <ul>
                    <li><strong>Передоплата</strong> — 50% від вартості до початку робіт</li>
                    <li><strong>Залишок</strong> — 50% після завершення та прийняття робіт</li>
                    <li>Методи оплати: банківський переказ, LiqPay, Stripe, USDT</li>
                    <li>Готові рішення маркетплейсу оплачуються повністю наперед</li>
                  </ul>
                  <h2>4. Строки виконання</h2>
                  <p>
                    Строки вказані в комерційній пропозиції або на сторінці відповідного продукту.
                    Виконавець зобов'язується дотримуватись погоджених строків. У разі форс-мажору
                    (воєнний стан, стихійні лиха тощо) строки можуть бути перенесені за взаємною домовленістю.
                  </p>
                  <h2>5. Права інтелектуальної власності</h2>
                  <ul>
                    <li>
                      <strong>Замовні роботи</strong> — після повної оплати всі права на розроблений
                      код та дизайн переходять до Замовника
                    </li>
                    <li>
                      <strong>Готові рішення маркетплейсу</strong> — Замовник отримує ліцензію на
                      використання продукту для одного бізнесу; перепродаж та передача коду третім
                      особам заборонені
                    </li>
                    <li>
                      Виконавець залишає за собою право використовувати проєкт у портфоліо, якщо
                      Замовник не висловив заперечень у письмовій формі
                    </li>
                  </ul>
                  <h2>6. Гарантія та підтримка</h2>
                  <ul>
                    <li>
                      <strong>Гарантійний термін</strong> — 3 місяці після здачі проєкту для виправлення
                      помилок, допущених Виконавцем
                    </li>
                    <li>Гарантія не поширюється на проблеми, спричинені діями Замовника або третіх осіб</li>
                    <li>Подальша підтримка надається за окремим договором або за тарифами підтримки</li>
                  </ul>
                  <h2>7. Повернення коштів</h2>
                  <ul>
                    <li><strong>До початку робіт</strong> — передоплата повертається у повному обсязі</li>
                    <li>
                      <strong>Під час виконання</strong> — повертається частина передоплати за мінусом
                      вартості вже виконаних робіт
                    </li>
                    <li>
                      <strong>Готові рішення маркетплейсу</strong> — після передачі доступів і вихідного
                      коду повернення не здійснюється
                    </li>
                  </ul>
                  <h2>8. Обмеження відповідальності</h2>
                  <p>Виконавець не несе відповідальності за збитки, що виникли внаслідок:</p>
                  <ul>
                    <li>Некоректного використання розробленого продукту Замовником</li>
                    <li>Дій третіх осіб (хакерські атаки, дії провайдерів)</li>
                    <li>Форс-мажорних обставин (воєнний стан, стихійні лиха)</li>
                    <li>Втрати доходу або упущеної вигоди Замовника</li>
                  </ul>
                  <h2>9. Умови маркетплейсу</h2>
                  <ul>
                    <li>Готові рішення надаються «як є» з усіма описаними функціями</li>
                    <li>Кастомізація продуктів маркетплейсу оплачується окремо</li>
                    <li>Хостинг та домен не входять у вартість готового рішення</li>
                    <li>Виконавець надає технічну підтримку протягом 30 днів після передачі продукту</li>
                  </ul>
                  <h2>10. Конфіденційність</h2>
                  <p>
                    Обробка персональних даних здійснюється відповідно до{" "}
                    <Link href={`/${lang}/privacy`}>Політики конфіденційності</Link>.
                  </p>
                  <h2>11. Застосовне право</h2>
                  <p>
                    Ця Угода регулюється законодавством України. Спори вирішуються шляхом переговорів,
                    а за їх безрезультатності — у судовому порядку за місцем реєстрації Виконавця.
                  </p>
                  <h2>12. Зміни до Угоди</h2>
                  <p>
                    Виконавець залишає за собою право змінювати умови Угоди. Актуальна версія завжди
                    доступна на цій сторінці. Продовження використання сервісів після змін означає
                    прийняття нових умов.
                  </p>
                  <h2>13. Контакти</h2>
                  <ul>
                    <li>Email: hello@codeworth.uk</li>
                    <li>Telegram: @codeworth_uk</li>
                    <li>Сайт: codeworth.uk</li>
                  </ul>
                </>
              ) : (
                <>
                  <p className="lead text-neutral-600">
                    This Terms of Service Agreement governs the provision of services by Codeworth
                    (hereinafter — "Service Provider", "we") to clients (hereinafter — "Client", "you").
                    By using the website or ordering services, you agree to the terms of this Agreement.
                  </p>
                  <h2>1. Subject of the Agreement</h2>
                  <p>
                    The Service Provider offers the following services: machine learning model development and
                    deployment; AI consulting and strategy; data science and analytics; MLOps infrastructure;
                    natural language processing; computer vision; and LLM/RAG application development.
                  </p>
                  <h2>2. Ordering Process</h2>
                  <ol>
                    <li>The Client fills in a contact form or reaches out via messenger</li>
                    <li>The Service Provider conducts a free consultation and provides a commercial proposal</li>
                    <li>After agreeing on terms, the Client signs a contract and pays a deposit</li>
                    <li>The Service Provider performs the work in accordance with the approved scope and timeline</li>
                    <li>Upon acceptance of results, the Client pays the remaining balance</li>
                  </ol>
                  <h2>3. Payment Terms</h2>
                  <ul>
                    <li><strong>Deposit</strong> — 50% of the total cost before work begins</li>
                    <li><strong>Balance</strong> — 50% upon completion and acceptance of work</li>
                    <li>Payment methods: bank transfer, Stripe</li>
                    <li>Project phases (Discovery, PoC, Production) are invoiced separately per SOW</li>
                  </ul>
                  <h2>4. Timelines</h2>
                  <p>
                    Timelines are specified in the Statement of Work (SOW) or commercial proposal.
                    The Service Provider is committed to meeting agreed milestones. Changes to scope
                    or data availability may affect timelines and will be communicated in writing.
                  </p>
                  <h2>5. Intellectual Property Rights</h2>
                  <ul>
                    <li>
                      <strong>Custom ML systems</strong> — upon full payment, all rights to the
                      developed code, models, and documentation transfer to the Client
                    </li>
                    <li>
                      The Service Provider retains rights to reusable frameworks, libraries, and
                      know-how not specific to the Client's data or business
                    </li>
                    <li>
                      The Service Provider reserves the right to reference the project in their
                      portfolio unless the Client has objected in writing
                    </li>
                    <li>
                      Training data and proprietary datasets provided by the Client remain the
                      exclusive property of the Client
                    </li>
                  </ul>
                  <h2>6. Data Protection</h2>
                  <ul>
                    <li>
                      The Service Provider processes Client data in accordance with UK GDPR and
                      acts as a Data Processor where applicable
                    </li>
                    <li>A Data Processing Agreement (DPA) is available upon request</li>
                    <li>Client data is not used for training models for other clients</li>
                    <li>Confidentiality of business data is maintained under NDA terms</li>
                  </ul>
                  <h2>7. Warranty & Support</h2>
                  <ul>
                    <li>
                      <strong>Warranty period</strong> — 90 days after production deployment for
                      defects attributable to the Service Provider
                    </li>
                    <li>Model performance degradation due to natural data drift is not a defect</li>
                    <li>Ongoing MLOps support is provided under a separate retainer agreement</li>
                  </ul>
                  <h2>8. Refund Policy</h2>
                  <ul>
                    <li><strong>Before Discovery begins</strong> — full refund</li>
                    <li>
                      <strong>During PoC</strong> — partial refund minus cost of work completed
                      to date, agreed in writing
                    </li>
                    <li>
                      <strong>After Production Deployment</strong> — no refund; ongoing MLOps
                      retainer may be cancelled with 30 days notice
                    </li>
                  </ul>
                  <h2>9. Limitation of Liability</h2>
                  <p>The Service Provider is not liable for damages arising from:</p>
                  <ul>
                    <li>Client decisions made based on ML model outputs</li>
                    <li>Model performance on data outside the validated training distribution</li>
                    <li>Regulatory non-compliance not disclosed during the Discovery phase</li>
                    <li>Force majeure circumstances</li>
                  </ul>
                  <h2>10. Privacy</h2>
                  <p>
                    Personal data processing is governed by our{" "}
                    <Link href={`/${lang}/privacy`}>Privacy Policy</Link>.
                  </p>
                  <h2>11. Governing Law</h2>
                  <p>
                    This Agreement is governed by the laws of England and Wales. Disputes shall be
                    resolved through negotiation, and if unsuccessful, through the courts of England
                    and Wales.
                  </p>
                  <h2>12. Changes to the Agreement</h2>
                  <p>
                    The Service Provider reserves the right to amend the terms of this Agreement.
                    The current version is always available on this page. Continued use of services
                    after changes constitutes acceptance of the new terms.
                  </p>
                  <h2>13. Contact</h2>
                  <ul>
                    <li>Email: hello@codeworth.uk</li>
                    <li>Telegram: @codeworth_uk</li>
                    <li>Website: codeworth.uk</li>
                  </ul>
                </>
              )}

              <div className="mt-10 p-5 rounded-2xl bg-indigo-50 border border-indigo-100 not-prose">
                <p className="text-sm text-neutral-600">
                  {isUk ? "Також ознайомтесь з нашою" : "Also read our"}{" "}
                  <Link href={`/${lang}/privacy`} className="text-indigo-600 font-semibold hover:underline">
                    {isUk ? "Політикою конфіденційності" : "Privacy Policy"}
                  </Link>{" "}
                  {isUk ? "або поверніться на" : "or go back to the"}{" "}
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
