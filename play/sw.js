const CACHE = "mazetrap-native-web-651fa4cff5271cde";
const CORE = [
  "./",
  "./assets/app-L3B4SY6J.js",
  "./assets/audio/block_push.wav",
  "./assets/audio/final_victory.wav",
  "./assets/audio/invalid_move.wav",
  "./assets/audio/level_complete.wav",
  "./assets/audio/level_start.wav",
  "./assets/audio/monster_move.wav",
  "./assets/audio/monster_released.wav",
  "./assets/audio/monster_trapped.wav",
  "./assets/audio/player_caught.wav",
  "./assets/audio/player_move.wav",
  "./assets/audio/record_award.wav",
  "./assets/audio/star_award.wav",
  "./assets/audio/ui_click.wav",
  "./assets/icons/apple-touch-icon.png",
  "./assets/icons/favicon-32.png",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/icons/icon-maskable-512.png",
  "./assets/styles-6UIAZ4UG.css",
  "./assets/trap-guide.png",
  "./index.html",
  "./manifest.webmanifest"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(CORE)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) =>
        key.startsWith("mazetrap-native-web-") && key !== CACHE
      ).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const cached = await cache.match(event.request);
      if (cached) return cached;
      const response = await fetch(event.request);
      if (response.ok) event.waitUntil(cache.put(event.request, response.clone()));
      return response;
    })
  );
});
