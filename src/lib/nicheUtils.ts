import type { AINicheData, MLNicheData, BaseNicheData } from "@/lib/types/niches";
import { AI_NICHES } from "@/lib/data/aiNiches";
import { ML_NICHES } from "@/lib/data/mlNiches";
import { GLOSSARY_TERMS, type GlossaryTerm } from "@/lib/data/glossary";
import { BLOG_POSTS, type BlogPost } from "@/lib/data/blog";

export function getAINicheBySlug(slug: string): AINicheData | undefined {
  return AI_NICHES.find((n) => n.slug === slug);
}

export function getMLNicheBySlug(slug: string): MLNicheData | undefined {
  return ML_NICHES.find((n) => n.slug === slug);
}

export function formatNichePrice(niche: BaseNicheData, lang: string): string {
  if (lang === "en") {
    return `from £${niche.priceFromGBP.toLocaleString()}`;
  }
  return `від ${niche.priceFromUAH.toLocaleString()} ₴`;
}

export function getGlossaryTermsForNichePage(nichePath: string, limit = 5): GlossaryTerm[] {
  return GLOSSARY_TERMS.filter((t) => t.relatedNichePage === nichePath).slice(0, limit);
}

export function getBlogPostsForNichePage(nichePath: string, limit = 3): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.relatedNichePage === nichePath).slice(0, limit);
}

export function getNicheHreflang(type: "ai" | "ml", slug: string) {
  const base = "https://codeworth.uk";
  return {
    en: `${base}/en/${type}/${slug}`,
    uk: `${base}/uk/${type}/${slug}`,
    xDefault: `${base}/en/${type}/${slug}`,
  };
}
