"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Extra } from "@/lib/data/extras";
import { formatExtrasPrice, getExtraTitle, getExtraDesc } from "@/lib/data/extras";
import { useLocale } from "@/components/layout/LocaleProvider";

interface ExtraCardProps {
  extra: Extra;
}

export function ExtraCard({ extra }: ExtraCardProps) {
  const lang = useLocale();
  const isUk = lang === "uk";
  const title = getExtraTitle(extra, isUk);
  const description = getExtraDesc(extra, isUk);
  const subject = encodeURIComponent(isUk ? `Замовлення: ${extra.title}` : `Order: ${title}`);
  const href = `/${lang}/contact?subject=${subject}&extra=${extra.id}`;

  return (
    <div className="group relative flex flex-col rounded-2xl border border-neutral-100 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-6 hover:shadow-xl hover:shadow-neutral-200/60 hover:-translate-y-1 transition-all duration-300">
      {/* Badges */}
      <div className="absolute top-4 right-4 flex gap-1.5">
        {extra.isNew && (
          <span className="px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 text-xs font-semibold">New</span>
        )}
        {extra.isPopular && (
          <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">{isUk ? "Популярне" : "Popular"}</span>
        )}
      </div>

      {/* Emoji */}
      <div className="text-4xl mb-4">{extra.emoji}</div>

      {/* Title & description */}
      <h3 className="font-heading font-bold text-neutral-900 dark:text-white group-hover:text-indigo-700 transition-colors mb-2 pr-16">
        {title}
      </h3>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed flex-1 mb-4">{description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {extra.tags.map((tag) => (
          <span key={tag} className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-600 text-xs font-medium">
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
        <div>
          <p className="text-xs text-neutral-400 mb-0.5">{isUk ? "Від" : "From"}</p>
          <p className="font-bold text-neutral-900">
            {formatExtrasPrice(extra.priceFrom, isUk)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-neutral-400 mb-0.5">{isUk ? "Строк" : "Timeline"}</p>
          <p className="text-sm font-medium text-neutral-700">{extra.deliveryDays} {isUk ? "д." : "d."}</p>
        </div>
      </div>

      <div className={`mt-4 flex gap-2 ${extra.hasDemo ? "flex-col sm:flex-row" : ""}`}>
        {extra.hasDemo && (
          <Link
            href={`/${lang}/extras/demo/${extra.id}`}
            className="flex-1 py-2.5 rounded-xl border border-indigo-200 bg-indigo-50 text-indigo-700 text-sm font-semibold text-center hover:bg-indigo-100 transition-colors"
          >
            {isUk ? "Переглянути демо" : "View demo"}
          </Link>
        )}
        <Link
          href={href}
          className={`py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold text-center hover:bg-indigo-700 transition-colors ${extra.hasDemo ? "flex-1" : "w-full"}`}
        >
          {isUk ? "Замовити" : "Order"}
        </Link>
      </div>
    </div>
  );
}
