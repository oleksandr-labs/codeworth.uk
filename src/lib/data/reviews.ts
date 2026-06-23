export interface Review {
  id: string;
  authorName: string;
  authorRole: string;
  company?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  textEn: string;
  resultHighlight?: string;
  resultHighlightEn?: string;
  serviceSlug?: string;
  nicheSlug?: string;
  date: string;
  platform: "google" | "clutch" | "dou" | "direct";
  verified: boolean;
}

export const REVIEWS: Review[] = [];

export const REVIEWS_AGGREGATE = {
  totalCount: 0,
  averageRating: 0,
  fiveStars: 0,
  fourStars: 0,
  threeStars: 0,
};
