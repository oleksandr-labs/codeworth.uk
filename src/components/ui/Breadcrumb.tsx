"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { useLocale } from "@/components/layout/LocaleProvider";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  const lang = useLocale();
  const all = [{ label: lang === "uk" ? "Головна" : "Home", href: `/${lang}` }, ...items];

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.label,
      ...(item.href ? { item: `https://codeworth.uk${item.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb" className={`flex items-center gap-1.5 text-sm ${className}`}>
        {all.map((item, idx) => (
          <span key={idx} className="flex items-center gap-1.5">
            {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-gray-400 dark:text-neutral-500 shrink-0" />}
            {idx === 0 && <Home className="w-3.5 h-3.5 text-gray-400 dark:text-neutral-500 shrink-0" />}
            {item.href && idx < all.length - 1 ? (
              <Link
                href={item.href}
                className="text-gray-500 dark:text-neutral-400 hover:text-gray-700 dark:text-neutral-300 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-800 dark:text-neutral-200 font-medium">{item.label}</span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
