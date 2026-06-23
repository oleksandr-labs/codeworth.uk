export interface GeoCity {
  slug: string;
  nameUk: string;
  nameEn: string;
  region: string;
  regionEn: string;
  population: string;
  populationEn: string;
  businesses: number;
  description: string;
  descriptionEn: string;
  seoTitle: string;
  seoTitleEn: string;
  seoDesc: string;
  seoDescEn: string;
  stats: { label: string; labelEn: string; value: string }[];
  faq: { q: string; qEn: string; a: string; aEn: string }[];
}

export const GEO_CITIES: GeoCity[] = [];

export function getCity(slug: string): GeoCity | undefined {
  return GEO_CITIES.find((c) => c.slug === slug);
}

export const GEO_CITY_SLUGS = GEO_CITIES.map((c) => c.slug);
