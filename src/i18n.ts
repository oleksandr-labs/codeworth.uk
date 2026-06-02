export const locales = ['en', 'uk'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export function isValidLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

const BASE_URL = 'https://codeworth.uk';

export const HREFLANG_CODES: Record<Locale, string> = {
  en: 'en-GB',
  uk: 'uk',
};

/**
 * Returns the public URL path for a given locale + path.
 * EN (default) has no prefix: /about
 * UK has prefix: /uk/about
 */
export function localePath(lang: string, path = ''): string {
  const cleanPath = path && !path.startsWith('/') ? `/${path}` : path;
  if (lang === defaultLocale) return cleanPath || '/';
  return `/${lang}${cleanPath}`;
}

/**
 * Builds Next.js `alternates` metadata with canonical URL + hreflang links.
 * EN pages are canonical at root (no /en prefix).
 */
export function buildAlternates(lang: string, path = '') {
  const cleanPath = path && !path.startsWith('/') ? `/${path}` : path;
  const enUrl = `${BASE_URL}${cleanPath}`;
  const ukUrl = `${BASE_URL}/uk${cleanPath}`;
  return {
    canonical: lang === defaultLocale ? cleanPath || '/' : `/uk${cleanPath}`,
    languages: {
      'en-GB': enUrl,
      uk: ukUrl,
      'x-default': enUrl,
    },
  };
}
