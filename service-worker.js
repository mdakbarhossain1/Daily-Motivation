const CACHE_NAME = "daily-ayah-pwa-v2";

const urlsToCache = [
  "/",
  "/index.html",
  "/style.css",
  "/app.js",
  "/manifest.json",

  // icons (যদি root এ থাকে)
  "/daily-ayah-icon-192.png",
  "/daily-ayah-icon-512.png",
  "/daily-ayah-icon-180.png",
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.map((key) => (key !== CACHE_NAME ? caches.delete(key) : null))
        )
      )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // Only handle GET requests
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      // Return cached first
      if (cached) return cached;

      // Otherwise fetch and cache it
      return fetch(event.request)
        .then((res) => {
          const copy = res.clone();
          caches
            .open(CACHE_NAME)
            .then((cache) => cache.put(event.request, copy));
          return res;
        })
        .catch(() => caches.match("/index.html"));
    })
  );
});
