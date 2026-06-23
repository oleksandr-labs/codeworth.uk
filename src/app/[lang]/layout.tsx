import type { Metadata } from "next";
import { Inter, Syne, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { isValidLocale, locales } from "@/i18n";
import { LocaleProvider } from "@/components/layout/LocaleProvider";
import { ToastProvider } from "@/components/ui/Toast";
import CookieConsent from "@/components/ui/CookieConsent";
import { AnalyticsScripts } from "@/components/analytics/AnalyticsScripts";
import { RouteTracker } from "@/components/analytics/RouteTracker";
import { BackToTop } from "@/components/ui/BackToTop";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { PageTransition } from "@/components/layout/PageTransition";
import { ServiceWorkerRegister } from "@/components/layout/ServiceWorkerRegister";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { BottomNav } from "@/components/layout/BottomNav";
import { NavProgress } from "@/components/layout/NavProgress";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Codeworth — AI & Machine Learning Solutions | codeworth.uk",
    template: "%s | Codeworth",
  },
  description:
    "Codeworth — AI and Machine Learning consultancy. Custom ML models, fraud detection, churn prediction, NLP, computer vision and MLOps for UK businesses.",
  keywords: [
    "machine learning",
    "artificial intelligence",
    "AI consultancy",
    "ML solutions",
    "fraud detection",
    "NLP",
    "computer vision",
    "MLOps",
    "UK",
    "Codeworth",
  ],
  authors: [{ name: "Codeworth" }],
  creator: "Codeworth",
  metadataBase: new URL("https://codeworth.uk"),
  openGraph: {
    type: "website",
    locale: "en_GB",
    alternateLocale: ["uk_UA"],
    url: "https://codeworth.uk",
    siteName: "Codeworth",
    title: "Codeworth — AI & Machine Learning Solutions",
    description:
      "Custom ML models, fraud detection, churn prediction, NLP and computer vision for UK businesses.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Codeworth — AI & Machine Learning Solutions",
    description: "AI and ML consultancy for UK businesses. Fraud detection, NLP, computer vision, MLOps.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Codeworth",
  },
  formatDetection: {
    telephone: false,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Codeworth",
  url: "https://codeworth.uk",
  logo: "https://codeworth.uk/logo.svg",
  description: "AI and Machine Learning consultancy — custom ML models, fraud detection, churn prediction, NLP, computer vision and MLOps for UK businesses.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Київ",
    addressCountry: "UA",
  },
  email: "hello@codeworth.uk",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Codeworth",
  url: "https://codeworth.uk",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://codeworth.uk/blog?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  return (
    <html lang={lang} className={`${inter.variable} ${syne.variable} ${jetbrainsMono.variable} h-full`} suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://vitals.vercel-insights.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        {/* Anti-FOUC: set dark class before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('codeworth-theme');var d=t==='dark'||(t==='system'||!t)&&window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark')}catch(e){}})()`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased bg-(--color-background) text-neutral-900 dark:text-white pb-16 md:pb-0">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-9999 focus:px-5 focus:py-3 focus:bg-indigo-600 focus:text-white focus:rounded-xl focus:font-semibold focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-white"
        >
          Skip to main content
        </a>
        <ThemeProvider>
          <NavProgress />
          <PageTransition>
            <LocaleProvider lang={lang}>
              <ToastProvider>
                {children}
              </ToastProvider>
            </LocaleProvider>
          </PageTransition>
          <CookieConsent />
          <BackToTop />
          <ServiceWorkerRegister />
          <CustomCursor />
          <BottomNav />
        </ThemeProvider>
        <AnalyticsScripts gaId={GA_ID} fbPixelId={FB_PIXEL_ID} googleAdsId={GOOGLE_ADS_ID} />
        <RouteTracker />
      </body>
    </html>
  );
}
