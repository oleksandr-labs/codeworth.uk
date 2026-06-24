export interface NicheKeyword {
  primary: string;
  secondary: string[];
  localEn?: string[];
  localUk?: string[];
}

export interface NicheCase {
  slug: string;
  name: string;
  metric: string;
  blogSlug?: string;
}

export interface NicheFAQ {
  question: string;
  questionUk: string;
  answer: string;
  answerUk: string;
}

export interface NichePackage {
  name: string;
  priceGBP: number;
  priceUAH: number;
  deliveryWeeks: number;
  includes: string[];
  highlight?: boolean;
}

export interface BaseNicheData {
  slug: string;
  industry: string;
  h1En: string;
  h1Uk: string;
  subtitleEn: string;
  subtitleUk: string;
  descriptionEn: string;
  descriptionUk: string;
  priceFromGBP: number;
  priceFromUAH: number;
  metaTitleEn: string;
  metaTitleUk: string;
  metaDescriptionEn: string;
  metaDescriptionUk: string;
  keywordsEn: NicheKeyword;
  keywordsUk: NicheKeyword;
  packages: NichePackage[];
  cases: NicheCase[];
  faq: NicheFAQ[];
  relatedServiceSlug: string;
  crossLinkMLNiche?: string;
  crossLinkAINiche?: string;
  /** Blog post slugs to cross-link from this niche page (internal linking / SEO) */
  relatedBlogSlugs?: string[];
  schemaServiceType: string;
  schemaPriceGBP: string;
  iconEmoji: string;
  cardTagline: string;
  cardMetricEn: string;
  gradient: string;
}

export interface AITechnology {
  name: string;
  description: string;
}

export interface AINicheData extends BaseNicheData {
  technologies: AITechnology[];
  implementationWeeks: [number, number];
  integrations: string[];
}

export interface DataRequirement {
  dataType: string;
  minVolume: string;
  format: string;
  purpose: string;
}

export interface ROIMetric {
  metricName: string;
  value: string;
  timeframe: string;
  source: string;
}

export interface MLNicheData extends BaseNicheData {
  algorithms: string[];
  minDatasetSize: string;
  dataRequirements: DataRequirement[];
  roiMetrics: ROIMetric[];
  roiTimeframe: string;
  xaiRequired: boolean;
  regulatoryContext?: string;
  mlopsRequired: boolean;
  audienceType: "SMB" | "Mid-Market" | "Enterprise";
}

export type NicheData = AINicheData | MLNicheData;
