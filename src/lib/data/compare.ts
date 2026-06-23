export interface CompareRow {
  feature: string;
  featureEn: string;
  Codeworth: string | boolean;
  CodeworthEn?: string | boolean;
  competitor: string | boolean;
  competitorEn?: string | boolean;
  winner: "Codeworth" | "competitor" | "tie";
}

export interface CompareData {
  slug: string;
  competitorUk: string;
  competitorEn: string;
  taglineUk: string;
  taglineEn: string;
  summaryUk: string;
  summaryEn: string;
  seoTitleUk: string;
  seoTitleEn: string;
  seoDescUk: string;
  seoDescEn: string;
  verdictUk: string;
  verdictEn: string;
  competitorColor: string;
  competitorBg: string;
  rows: CompareRow[];
  useCasesCodeworthUk: string[];
  useCasesCodeworthEn: string[];
  useCasesCompetitorUk: string[];
  useCasesCompetitorEn: string[];
}

export const COMPARE_DATA: CompareData[] = [];

export function getCompare(slug: string): CompareData | undefined {
  return COMPARE_DATA.find((c) => c.slug === slug);
}

export const COMPARE_SLUGS = COMPARE_DATA.map((c) => c.slug);
