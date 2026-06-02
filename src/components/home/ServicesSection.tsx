import Link from "next/link";
import { ArrowRight, Globe, ShoppingCart, Smartphone, TrendingUp, Palette, Bot, Headphones, LayoutGrid } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

const SERVICES_UK = [
  {
    icon: Globe,
    title: "Розробка сайтів",
    description: "Корпоративні, лендінги, портфоліо — сайти що виглядають і працюють бездоганно.",
    href: "/services/website-dev",
    accent: "from-indigo-500 to-indigo-700",
    bg: "bg-indigo-50",
    iconColor: "text-indigo-600",
  },
  {
    icon: ShoppingCart,
    title: "Інтернет-магазини",
    description: "E-commerce платформи з кошиком, оплатою, CRM-інтеграцією та адмін-панеллю.",
    href: "/services/ecommerce",
    accent: "from-violet-500 to-violet-700",
    bg: "bg-violet-50",
    iconColor: "text-violet-600",
  },
  {
    icon: Smartphone,
    title: "Мобільні додатки (PWA)",
    description: "Прогресивні веб-додатки що встановлюються на телефон та працюють офлайн.",
    href: "/services/mobile",
    accent: "from-blue-500 to-blue-700",
    bg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    icon: TrendingUp,
    title: "SEO-просування",
    description: "Вивід у топ Google: технічне SEO, контент-стратегія, посилальний профіль.",
    href: "/services/seo",
    accent: "from-emerald-500 to-emerald-700",
    bg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    icon: Palette,
    title: "UI/UX Дизайн",
    description: "Інтерфейси рівня Awwwards: дизайн-система, прототипи, мікроанімації.",
    href: "/services/design",
    accent: "from-pink-500 to-rose-600",
    bg: "bg-pink-50",
    iconColor: "text-pink-600",
  },
  {
    icon: LayoutGrid,
    title: "CRM та автоматизація",
    description: "Кастомні CRM-системи, ERP, автоматизація бізнес-процесів та інтеграції.",
    href: "/services/crm",
    accent: "from-amber-500 to-orange-600",
    bg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    icon: Bot,
    title: "Чат-боти",
    description: "Telegram, Viber, Messenger боти для продажів, підтримки та автоматизації.",
    href: "/services/chatbots",
    accent: "from-cyan-500 to-cyan-700",
    bg: "bg-cyan-50",
    iconColor: "text-cyan-600",
  },
  {
    icon: Headphones,
    title: "Технічна підтримка",
    description: "Обслуговування, оновлення, хостинг та цілодобова підтримка вашого сайту.",
    href: "/services/support",
    accent: "from-slate-500 to-slate-700",
    bg: "bg-slate-50",
    iconColor: "text-slate-600",
  },
];

const SERVICES_EN = [
  {
    icon: Globe,
    title: "Website Development",
    description: "Corporate sites, landing pages, portfolios — websites that look and perform flawlessly.",
    href: "/services/website-dev",
    accent: "from-indigo-500 to-indigo-700",
    bg: "bg-indigo-50",
    iconColor: "text-indigo-600",
  },
  {
    icon: ShoppingCart,
    title: "Online Stores",
    description: "E-commerce platforms with cart, payments, CRM integration and admin panel.",
    href: "/services/ecommerce",
    accent: "from-violet-500 to-violet-700",
    bg: "bg-violet-50",
    iconColor: "text-violet-600",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps (PWA)",
    description: "Progressive web apps that install on mobile and work offline.",
    href: "/services/mobile",
    accent: "from-blue-500 to-blue-700",
    bg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    icon: TrendingUp,
    title: "SEO Promotion",
    description: "Rank at the top of Google: technical SEO, content strategy, link profile.",
    href: "/services/seo",
    accent: "from-emerald-500 to-emerald-700",
    bg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Awwwards-level interfaces: design system, prototypes, micro-animations.",
    href: "/services/design",
    accent: "from-pink-500 to-rose-600",
    bg: "bg-pink-50",
    iconColor: "text-pink-600",
  },
  {
    icon: LayoutGrid,
    title: "CRM & Automation",
    description: "Custom CRM systems, ERP, business process automation and integrations.",
    href: "/services/crm",
    accent: "from-amber-500 to-orange-600",
    bg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    icon: Bot,
    title: "Chatbots",
    description: "Telegram, Viber, Messenger bots for sales, support and automation.",
    href: "/services/chatbots",
    accent: "from-cyan-500 to-cyan-700",
    bg: "bg-cyan-50",
    iconColor: "text-cyan-600",
  },
  {
    icon: Headphones,
    title: "Technical Support",
    description: "Maintenance, updates, hosting and around-the-clock support for your site.",
    href: "/services/support",
    accent: "from-slate-500 to-slate-700",
    bg: "bg-slate-50",
    iconColor: "text-slate-600",
  },
];

export function ServicesSection({ lang }: { lang: string }) {
  const isUk = lang === "uk";
  const SERVICES = isUk ? SERVICES_UK : SERVICES_EN;
  const lp = (path: string) => `/${lang}${path}`;

  return (
    <section className="py-24 bg-white">
      <Container>
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
            {isUk ? "Наші послуги" : "Our Services"}
          </p>
          <h2 className="text-4xl lg:text-5xl font-heading font-extrabold text-neutral-900 mb-4">
            {isUk ? (
              <>Все що потрібно для{" "}<span className="gradient-text">цифрового росту</span></>
            ) : (
              <>Everything you need for{" "}<span className="gradient-text">digital growth</span></>
            )}
          </h2>
          <p className="text-lg text-neutral-500">
            {isUk
              ? "Повний цикл розробки — від ідеї та дизайну до запуску та підтримки."
              : "Full development cycle — from idea and design to launch and support."}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.href}
                href={lp(service.href)}
                className="group relative p-6 rounded-2xl border border-neutral-100 bg-white hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                    service.bg
                  )}
                >
                  <Icon className={cn("w-6 h-6", service.iconColor)} />
                </div>
                <h3 className="font-heading font-bold text-neutral-900 mb-2 group-hover:text-indigo-700 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                  {service.description}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  {isUk ? "Детальніше" : "Learn more"}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href={lp("/services")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-indigo-200 text-indigo-700 font-semibold hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-200"
          >
            {isUk ? "Переглянути всі послуги" : "View all services"}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
