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
    title: isUk ? "Угода користувача | CodeNest" : "Terms of Service | CodeNest",
    description: isUk
      ? "Угода користувача CodeNest — умови надання послуг веб-розробки, маркетплейсу та підтримки."
      : "CodeNest Terms of Service — conditions for web development, marketplace, and support services.",
    openGraph: {
      title: isUk ? "Угода користувача — CodeNest" : "Terms of Service — CodeNest",
      description: isUk
        ? "Умови надання послуг веб-розробки, маркетплейсу та підтримки від CodeNest."
        : "Conditions for web development, marketplace, and support services from CodeNest.",
      type: "website",
      url: `https://codenest.com.ua/${lang}/terms-of-service`,
      images: [{ url: "/og/home.png", width: 1200, height: 630, alt: "CodeNest" }],
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
    { "@type": "ListItem", position: 1, name: "Головна", item: "https://codenest.com.ua" },
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
        <section className="pt-32 pb-12 bg-neutral-50 border-b border-neutral-100">
          <Container>
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
                {isUk ? "Юридична інформація" : "Legal Information"}
              </p>
              <h1 className="text-4xl font-heading font-extrabold text-neutral-900 mb-3">
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
        <section className="py-16 bg-white">
          <Container>
            <div className="max-w-3xl prose prose-neutral prose-headings:font-heading prose-headings:font-bold prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline">

              {isUk ? (
                <>
                  <p className="lead text-neutral-600">
                    Ця Угода користувача регулює умови надання послуг компанією CodeNest
                    (далі — «Виконавець», «ми») клієнтам (далі — «Замовник», «ви»).
                    Використовуючи сайт або замовляючи послуги, ви погоджуєтесь з умовами цієї Угоди.
                  </p>
                  <h2>1. Предмет Угоди</h2>
                  <p>
                    Виконавець надає такі послуги: розробку веб-сайтів, лендінгів та веб-застосунків;
                    SEO-оптимізацію; UI/UX дизайн; розробку чат-ботів та CRM; підтримку та супровід сайтів;
                    а також продаж готових нішевих рішень через Маркетплейс CodeNest.
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
                    <li>Email: hello@codenest.com.ua</li>
                    <li>Telegram: @codenest_ua</li>
                    <li>Сайт: codenest.com.ua</li>
                  </ul>
                </>
              ) : (
                <>
                  <p className="lead text-neutral-600">
                    This Terms of Service Agreement governs the provision of services by CodeNest
                    (hereinafter — "Service Provider", "we") to clients (hereinafter — "Client", "you").
                    By using the website or ordering services, you agree to the terms of this Agreement.
                  </p>
                  <h2>1. Subject of the Agreement</h2>
                  <p>
                    The Service Provider offers the following services: development of websites, landing pages,
                    and web applications; SEO optimisation; UI/UX design; chatbot and CRM development;
                    website maintenance and support; as well as the sale of ready-made niche solutions
                    through the CodeNest Marketplace.
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
                    <li>Payment methods: bank transfer, LiqPay, Stripe, USDT</li>
                    <li>Marketplace ready-made solutions are paid in full upfront</li>
                  </ul>
                  <h2>4. Timelines</h2>
                  <p>
                    Timelines are specified in the commercial proposal or on the relevant product page.
                    The Service Provider is committed to meeting agreed deadlines. In the event of force
                    majeure (martial law, natural disasters, etc.), deadlines may be rescheduled by
                    mutual agreement.
                  </p>
                  <h2>5. Intellectual Property Rights</h2>
                  <ul>
                    <li>
                      <strong>Custom work</strong> — upon full payment, all rights to the developed
                      code and design transfer to the Client
                    </li>
                    <li>
                      <strong>Marketplace ready-made solutions</strong> — the Client receives a licence
                      to use the product for one business; resale and transfer of the code to third
                      parties are prohibited
                    </li>
                    <li>
                      The Service Provider reserves the right to use the project in their portfolio
                      unless the Client has objected in writing
                    </li>
                  </ul>
                  <h2>6. Warranty & Support</h2>
                  <ul>
                    <li>
                      <strong>Warranty period</strong> — 3 months after project delivery for fixing
                      errors caused by the Service Provider
                    </li>
                    <li>The warranty does not cover issues caused by the Client or third parties</li>
                    <li>Ongoing support is provided under a separate agreement or support plan</li>
                  </ul>
                  <h2>7. Refund Policy</h2>
                  <ul>
                    <li><strong>Before work begins</strong> — the deposit is refunded in full</li>
                    <li>
                      <strong>During execution</strong> — a partial refund is issued minus the cost
                      of work already completed
                    </li>
                    <li>
                      <strong>Marketplace ready-made solutions</strong> — no refund after access and
                      source code have been transferred
                    </li>
                  </ul>
                  <h2>8. Limitation of Liability</h2>
                  <p>The Service Provider is not liable for damages arising from:</p>
                  <ul>
                    <li>Improper use of the developed product by the Client</li>
                    <li>Actions of third parties (hacking, hosting provider issues)</li>
                    <li>Force majeure circumstances (martial law, natural disasters)</li>
                    <li>Loss of revenue or lost profits of the Client</li>
                  </ul>
                  <h2>9. Marketplace Terms</h2>
                  <ul>
                    <li>Ready-made solutions are provided "as is" with all described features</li>
                    <li>Customisation of marketplace products is charged separately</li>
                    <li>Hosting and domain are not included in the price of a ready-made solution</li>
                    <li>The Service Provider provides technical support for 30 days after product delivery</li>
                  </ul>
                  <h2>10. Privacy</h2>
                  <p>
                    Personal data processing is governed by our{" "}
                    <Link href={`/${lang}/privacy`}>Privacy Policy</Link>.
                  </p>
                  <h2>11. Governing Law</h2>
                  <p>
                    This Agreement is governed by the laws of Ukraine. Disputes shall be resolved through
                    negotiation, and if unsuccessful, through the courts at the Service Provider's
                    registered location.
                  </p>
                  <h2>12. Changes to the Agreement</h2>
                  <p>
                    The Service Provider reserves the right to amend the terms of this Agreement.
                    The current version is always available on this page. Continued use of services
                    after changes constitutes acceptance of the new terms.
                  </p>
                  <h2>13. Contact</h2>
                  <ul>
                    <li>Email: hello@codenest.com.ua</li>
                    <li>Telegram: @codenest_ua</li>
                    <li>Website: codenest.com.ua</li>
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
