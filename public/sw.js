// Codeworth Service Worker — PWA offline caching
// CACHE_NAME is versioned via ?v= query param from ServiceWorkerRegister.tsx
// so each new deploy automatically invalidates the old cache.
const version = new URL(self.location.href).searchParams.get("v") ?? "1";
const CACHE_NAME = `Codeworth-v${version}`;

// Core pages to precache on install
const PRECACHE_URLS = [
  "/",
  "/about",
  "/services",
  "/portfolio",
  "/pricing",
  "/contact",
  "/blog",
  "/marketplace",
  "/marketplace/catalog",
  "/offline",
];

// Install: precache core pages
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS.filter(Boolean)))
      .catch(() => {
        // Silently fail if some pages don't exist yet
      })
  );
  self.skipWaiting();
});

// Activate: clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
      )
  );
  self.clients.claim();
});

// Fetch: network-first for API, cache-first for static assets
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Only handle GET requests
  if (request.method !== "GET") return;

  // Skip cross-origin requests
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Network-first strategy for API routes (always fresh data)
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Don't cache API responses
          return response;
        })
        .catch(() => {
          // API unavailable — return 503
          return new Response(JSON.stringify({ error: "Немає з'єднання з мережею" }), {
            status: 503,
            headers: { "Content-Type": "application/json" },
          });
        })
    );
    return;
  }

  // Cache-first for Next.js static assets (immutable)
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((response) => {
            if (response.ok) {
              const clone = response.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
            }
            return response;
          })
      )
    );
    return;
  }

  // Network-first with cache fallback for HTML pages
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Cache successful HTML responses
        if (response.ok && response.headers.get("content-type")?.includes("text/html")) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      })
      .catch(() =>
        // Network failed — try cache, then offline page
        caches.match(request).then((cached) => cached || caches.match("/offline"))
      )
  );
});
