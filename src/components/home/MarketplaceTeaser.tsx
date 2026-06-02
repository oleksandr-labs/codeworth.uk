import Link from "next/link";
import { ArrowRight, Utensils, Scissors, Stethoscope, ShoppingBag } from "lucide-react";
import { Container } from "@/components/layout/Container";

const NICHES_UK = [
  {
    icon: Utensils,
    title: "Ресторан / Кафе",
    description: "Меню, бронювання, доставка",
    tag: "Готово до запуску",
    color: "from-orange-400 to-red-500",
    href: "/marketplace",
  },
  {
    icon: Scissors,
    title: "Салон краси",
    description: "Онлайн-запис, портфоліо, ціни",
    tag: "Популярне",
    color: "from-pink-400 to-rose-500",
    href: "/marketplace",
  },
  {
    icon: Stethoscope,
    title: "Медична клініка",
    description: "Послуги, лікарі, запис на прийом",
    tag: "Нове",
    color: "from-blue-400 to-indigo-500",
    href: "/marketplace",
  },
  {
    icon: ShoppingBag,
    title: "Інтернет-магазин",
    description: "Каталог, кошик, оплата онлайн",
    tag: "Хіт продажів",
    color: "from-emerald-400 to-teal-500",
    href: "/marketplace",
  },
];

const NICHES_EN = [
  {
    icon: Utensils,
    title: "Restaurant / Café",
    description: "Menu, reservations, delivery",
    tag: "Ready to launch",
    color: "from-orange-400 to-red-500",
    href: "/marketplace",
  },
  {
    icon: Scissors,
    title: "Beauty Salon",
    description: "Online booking, portfolio, pricing",
    tag: "Popular",
    color: "from-pink-400 to-rose-500",
    href: "/marketplace",
  },
  {
    icon: Stethoscope,
    title: "Medical Clinic",
    description: "Services, doctors, appointment booking",
    tag: "New",
    color: "from-blue-400 to-indigo-500",
    href: "/marketplace",
  },
  {
    icon: ShoppingBag,
    title: "Online Store",
    description: "Catalog, cart, online payments",
    tag: "Best seller",
    color: "from-emerald-400 to-teal-500",
    href: "/marketplace",
  },
];

export function MarketplaceTeaser({ lang }: { lang: string }) {
  const isUk = lang === "uk";
  const NICHES = isUk ? NICHES_UK : NICHES_EN;
  const lp = (path: string) => `/${lang}${path}`;

  return (
    <section className="py-24 bg-neutral-950 text-white overflow-hidden relative">
      {/* Background glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-200 h-100 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-sm font-medium text-indigo-300">
            ✨ {isUk ? "Маркетплейс готових рішень" : "Marketplace of ready-made solutions"}
          </div>
          <h2 className="text-4xl lg:text-5xl font-heading font-extrabold text-white mb-4">
            {isUk ? (
              <>Готові рішення для{" "}<span className="gradient-text">вашого бізнесу</span></>
            ) : (
              <>Ready solutions for{" "}<span className="gradient-text">your business</span></>
            )}
          </h2>
          <p className="text-lg text-neutral-400">
            {isUk
              ? "Купіть готовий нішевий сайт та запустіть бізнес у рекордні терміни. Кастомізація, хостинг та підтримка — включені."
              : "Buy a ready-made niche website and launch your business in record time. Customization, hosting and support — included."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {NICHES.map((niche) => {
            const Icon = niche.icon;
            return (
              <Link
                key={niche.title}
                href={lp(niche.href)}
                className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${niche.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-white/10 text-white/70 mb-3">
                  {niche.tag}
                </span>
                <h3 className="font-heading font-bold text-white mb-1">{niche.title}</h3>
                <p className="text-sm text-neutral-400">{niche.description}</p>
              </Link>
            );
          })}
        </div>

        <div className="text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={lp("/marketplace")}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-linear-to-r from-indigo-600 to-indigo-500 text-white font-semibold hover:from-indigo-500 hover:to-indigo-400 transition-all duration-200 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5"
          >
            {isUk ? "Дивитися маркетплейс" : "Browse marketplace"}
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href={lp("/extras")}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition-all duration-200 hover:-translate-y-0.5"
          >
            ⚡ {isUk ? "Доробки та модулі" : "Add-ons & modules"}
          </Link>
          <Link
            href={lp("/startup")}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition-all duration-200 hover:-translate-y-0.5"
          >
            🚀 {isUk ? "Для стартапів" : "Startup Solutions"}
          </Link>
        </div>
      </Container>
    </section>
  );
}
