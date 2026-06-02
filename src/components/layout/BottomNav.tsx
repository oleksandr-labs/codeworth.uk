"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { Home, ShoppingBag, BookOpen, Phone, LayoutGrid } from "lucide-react";
import { useCart } from "@/hooks/useCart";

export function BottomNav() {
  const pathname = usePathname();
  const { count: itemCount } = useCart();
  const params = useParams();
  const lang = (params?.lang as string) ?? "en";
  const isUk = lang === "uk";
  const lp = (path: string) => `/${lang}${path}`;

  const NAV_ITEMS = [
    { path: "/",            icon: Home,        label: isUk ? "Головна"      : "Home" },
    { path: "/services",    icon: LayoutGrid,  label: isUk ? "Послуги"      : "Services" },
    { path: "/marketplace", icon: ShoppingBag, label: isUk ? "Маркетплейс"  : "Marketplace" },
    { path: "/blog",        icon: BookOpen,    label: isUk ? "Блог"         : "Blog" },
    { path: "/contact",     icon: Phone,       label: isUk ? "Контакти"     : "Contact" },
  ];

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-(--z-sticky) md:hidden bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 safe-area-inset-bottom"
      aria-label={isUk ? "Мобільна навігація" : "Mobile navigation"}
    >
      <div className="flex items-center justify-around h-16 px-2">
        {NAV_ITEMS.map(({ path, icon: Icon, label }) => {
          const fullHref = lp(path);
          const isActive =
            path === "/" ? pathname === fullHref || pathname === `/${lang}` : pathname.startsWith(fullHref);
          const isMarketplace = path === "/marketplace";

          return (
            <Link
              key={path}
              href={fullHref}
              className={`relative flex flex-col items-center justify-center gap-0.5 flex-1 h-full touch-target transition-colors ${
                isActive
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? "scale-110" : ""}`} />
                {isMarketplace && itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center leading-none">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </div>
              <span className={`text-[10px] font-medium leading-none transition-colors ${isActive ? "text-indigo-600 dark:text-indigo-400" : ""}`}>
                {label}
              </span>
              {isActive && (
                <span className="absolute top-0 inset-x-1/4 h-0.5 rounded-b-full bg-indigo-600 dark:bg-indigo-400" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
