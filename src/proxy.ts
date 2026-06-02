import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale, isValidLocale } from '@/i18n';

function getPreferredLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language') ?? '';
  if (acceptLanguage.startsWith('uk')) return 'uk';
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /en/... → 301 redirect to clean path (canonical: EN has no prefix)
  if (pathname.startsWith('/en/') || pathname === '/en') {
    const cleanPath = pathname === '/en' ? '/' : pathname.slice(3);
    return NextResponse.redirect(new URL(cleanPath, request.url), 301);
  }

  // /uk/... — already has non-default locale prefix, serve as-is
  const pathnameHasLocale = locales
    .filter((l) => l !== defaultLocale)
    .some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);

  if (pathnameHasLocale) return NextResponse.next();

  // Paths without locale prefix — check if user prefers UK
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  const locale =
    (cookieLocale && isValidLocale(cookieLocale) ? cookieLocale : null) ??
    getPreferredLocale(request);

  if (locale !== defaultLocale) {
    // UK user: redirect to /uk/...
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }

  // EN user: pass through — next.config.ts rewrites handle /→/en internally
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|manifest.json|sw.js|offline.html|robots.txt|sitemap.xml|.*\\.png$|.*\\.svg$|.*\\.ico$).*)',
  ],
};
