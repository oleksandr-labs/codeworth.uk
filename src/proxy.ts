import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale, isValidLocale } from '@/i18n';

function getPreferredLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language') ?? '';
  // Simple matching: check if 'uk' is preferred
  if (acceptLanguage.startsWith('uk')) return 'uk';
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the pathname already starts with a supported locale
  const pathnameHasLocale = locales.some(
    (locale) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  // Determine the locale to redirect to
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  const locale =
    (cookieLocale && isValidLocale(cookieLocale) ? cookieLocale : null) ??
    getPreferredLocale(request);

  // Redirect: /about → /en/about
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip internal Next.js paths, API routes, static files
    '/((?!api|_next/static|_next/image|favicon.ico|manifest.json|sw.js|offline.html|robots.txt|sitemap.xml|.*\\.png$|.*\\.svg$|.*\\.ico$).*)',
  ],
};
