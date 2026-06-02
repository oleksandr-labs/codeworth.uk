export const locales = ['en', 'uk'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export function isValidLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

const BASE_URL = 'https://codeworth.uk';

// Maps URL segment → BCP 47 hreflang code used in <link rel="alternate"> and sitemap.
// 'en' segment targets en-GB (UK primary market); 'uk' segment targets uk (Ukraine).
export const HREFLANG_CODES: Record<Locale, string> = {
  en: 'en-GB',
  uk: 'uk',
};

/**
 * Builds Next.js `alternates` metadata with canonical URL + hreflang links.
 * @param lang  current locale ('en' | 'uk')
 * @param path  path WITHOUT locale prefix, e.g. '/services' or '/blog/my-post'
 */
export function buildAlternates(lang: string, path = '') {
  const cleanPath = path && !path.startsWith('/') ? `/${path}` : path;
  return {
    canonical: `/${lang}${cleanPath}`,
    languages: {
      'en-GB': `${BASE_URL}/en${cleanPath}`,
      uk: `${BASE_URL}/uk${cleanPath}`,
      'x-default': `${BASE_URL}/en${cleanPath}`,
    },
  };
}
