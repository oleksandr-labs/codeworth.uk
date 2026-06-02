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

  // /en/... → 301 redirect to /... (canonical: EN has no prefix)
  if (pathname.startsWith('/en/') || pathname === '/en') {
    const cleanPath = pathname === '/en' ? '/' : pathname.slice(3);
    request.nextUrl.pathname = cleanPath;
    return NextResponse.redirect(request.nextUrl, 301);
  }

  // /uk/... or /uk — already has non-default locale prefix, serve as-is
  const pathnameHasLocale = locales
    .filter((l) => l !== defaultLocale)
    .some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);

  if (pathnameHasLocale) return NextResponse.next();

  // No locale prefix — determine which locale to serve
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  const locale =
    (cookieLocale && isValidLocale(cookieLocale) ? cookieLocale : null) ??
    getPreferredLocale(request);

  if (locale !== defaultLocale) {
    // Non-default: redirect to /uk/...
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }

  // Default locale (en): rewrite internally to /en/... but keep URL clean
  const rewritePath = pathname === '/' ? '/en' : `/en${pathname}`;
  return NextResponse.rewrite(new URL(rewritePath, request.url));
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|manifest.json|sw.js|offline.html|robots.txt|sitemap.xml|.*\\.png$|.*\\.svg$|.*\\.ico$).*)',
  ],
};
