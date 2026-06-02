"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Check, ExternalLink } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useLocale } from "@/components/layout/LocaleProvider";
import { Button } from "@/components/ui/Button";
import { analytics } from "@/lib/analytics";
import type { NicheData } from "@/lib/data/niches";

export default function AddToCartSection({ niche }: { niche: NicheData }) {
  const lang = useLocale();
  const isUk = lang === "uk";
  const { addItem, hasItem } = useCart();
  const itemId = `${niche.slug}-basic`;
  const inCart = hasItem(itemId);

  useEffect(() => {
    analytics.marketplaceViewItem(niche.slug);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddToCart = () => {
    addItem({
      id: itemId,
      slug: niche.slug,
      title: niche.title,
      emoji: niche.emoji,
      package: "Базовий",
      price: niche.priceFrom,
    });
  };

  return (
    <div className="flex flex-wrap gap-3">
      <Button href={`/${lang}/contact`} variant="primary" size="lg">
        {isUk ? "Замовити зараз" : "Order Now"}
      </Button>

      <button
        onClick={handleAddToCart}
        disabled={inCart}
        className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${
          inCart
            ? "border-green-400 bg-green-50 text-green-700 cursor-default"
            : "border-white/30 text-white hover:bg-white/10"
        }`}
      >
        {inCart ? (
          <>
            <Check className="w-4 h-4" />
            {isUk ? "У кошику" : "In Cart"}
          </>
        ) : (
          <>
            <ShoppingCart className="w-4 h-4" />
            {isUk ? "В кошик" : "Add to Cart"}
          </>
        )}
      </button>

      <Link
        href={`/${lang}/niches/${niche.slug}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/20 text-white/80 text-sm hover:text-white hover:border-white/40 hover:bg-white/5 transition-all"
      >
        <ExternalLink className="w-4 h-4" />
        {isUk ? "Демо-сайт" : "Live Demo"}
      </Link>
    </div>
  );
}
