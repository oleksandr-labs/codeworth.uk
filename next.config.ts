import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

// Build ID — changes on every deploy, forces SW cache invalidation
const BUILD_ID = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 8) ?? Date.now().toString(36);

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net https://googleads.g.doubleclick.net https://www.google.com https://www.gstatic.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https:",
      "connect-src 'self' https://www.google-analytics.com https://vitals.vercel-insights.com https://www.facebook.com https://connect.facebook.net https://googleads.g.doubleclick.net https://www.google.com",
      "frame-src 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self' https://www.liqpay.ua",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  output: "standalone",

  env: {
    NEXT_PUBLIC_BUILD_ID: BUILD_ID,
  },

  turbopack: {
    root: __dirname,
  },

  // Remove console.log in production
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },

  // Compression
  compress: true,

  // Power by header removal
  poweredByHeader: false,

  // Security headers on all routes
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      // Long-term cache for static assets
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Cache for public images
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=3600",
          },
        ],
      },
    ];
  },

  // Rewrites: serve EN content at clean root paths (no /en prefix)
  async rewrites() {
    return [
      // Root → /en
      { source: "/", destination: "/en" },
      // Any path without locale prefix → /en/path
      // Excludes: uk, api, _next, static files, special routes
      {
        source: "/:path((?!en|uk|api|_next|favicon|manifest\\.json|sw\\.js|robots\\.txt|sitemap\\.xml|og|opengraph|apple-icon).*)",
        destination: "/en/:path",
      },
    ];
  },

  // Redirects
  async redirects() {
    return [
      {
        source: "/marketplace/account/orders",
        destination: "/marketplace/account",
        permanent: false,
      },
      {
        source: "/:lang/services/ai-ml",
        destination: "/:lang/services/artificial-intelligence",
        permanent: true,
      },
      // www → non-www
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.codeworth.uk" }],
        destination: "https://codeworth.uk/:path*",
        permanent: true,
      },
      // Remove trailing slash
      {
        source: "/:path+/",
        destination: "/:path+",
        permanent: true,
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
