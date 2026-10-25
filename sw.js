// Keeps the app itself available offline. The sounds are stored by the app on the device,
// so audio requests pass straight through and are not cached twice.
const CACHE = "soundboard-2026-10-25m";
const SHELL = ["./", "index.html", "manifest.webmanifest", "icons/icon.svg", "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png", "board/board.json", "keyboard/psr-ew425-voices.json", "board/img/airport-chime.svg", "board/img/bees.svg", "board/img/bowling-alley.svg", "board/img/busy-restaurant.svg", "board/img/car-crash.svg", "board/img/car-passing-by.svg", "board/img/cat-meow.svg", "board/img/cat-purr.svg", "board/img/cell-door.svg", "board/img/cicada.svg", "board/img/city-street.svg", "board/img/close-thunder.svg", "board/img/cocking-gun.svg", "board/img/cooking-pasta.svg", "board/img/distant-thunder.svg", "board/img/distant-train.svg", "board/img/dogs-at-night.svg", "board/img/doorbell.svg", "board/img/drill-next-door.svg", "board/img/dripping-water.svg", "board/img/dropped-metal.svg", "board/img/electricity.svg", "board/img/fan.svg", "board/img/farm-ambience.svg", "board/img/fire-crackling.svg", "board/img/fluorescent-light.svg", "board/img/fridge-air-con.svg", "board/img/horror-chill.svg", "board/img/incandescent-light.svg", "board/img/jackhammer.svg", "board/img/kitchen-cooking.svg", "board/img/lawn-mower.svg", "board/img/metal-chill.svg", "board/img/microwave.svg", "board/img/mouse-clicks.svg", "board/img/night-crickets.svg", "board/img/nightclub.svg", "board/img/police-siren.svg", "board/img/printer.svg", "board/img/prison.svg", "board/img/rain.svg", "board/img/river-with-frogs.svg", "board/img/sad-trombone.svg", "board/img/security-alarm.svg", "board/img/shop-bell.svg", "board/img/shower.svg", "board/img/sprinkler.svg", "board/img/subway.svg", "board/img/traffic.svg", "board/img/vacuum-cleaner.svg"];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin === location.origin && url.pathname.includes('/board/audio/')) return;
  const fonts = /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);
  if (url.origin !== location.origin && !fonts) return;
  // The sound list: network first, so a replaced sound arrives on the first launch after a push.
  if (url.origin === location.origin && url.pathname.endsWith('/board/board.json')) {
    e.respondWith(caches.open(CACHE).then(async cache => {
      try { const res = await fetch(req); if (res && res.ok) cache.put(req, res.clone()); return res; }
      catch { return (await cache.match(req, { ignoreSearch: true })) || new Response('Offline', { status: 503 }); }
    }));
    return;
  }
  // Serve from cache straight away, refresh the cache in the background.
  e.respondWith(caches.open(CACHE).then(async cache => {
    const key = req.mode === 'navigate' ? 'index.html' : req;
    const hit = await cache.match(key, { ignoreSearch: req.mode === 'navigate' });
    const net = fetch(req).then(res => {
      if (res && (res.ok || res.type === 'opaque')) cache.put(key, res.clone());
      return res;
    }).catch(() => null);
    if (hit) { e.waitUntil(net); return hit; }
    const res = await net;
    return res || new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain' } });
  }));
});
