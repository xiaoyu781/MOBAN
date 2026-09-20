const CACHE = 'nutrition-planner-v132';
const SHELL = [
  '/', '/index.html', '/styles.css?v=1.3.2', '/app.js?v=1.3.2', '/manifest.webmanifest',
  '/data/starter-foods.json',
  '/assets/icon-192.png', '/assets/icon-512.png',
  '/assets/nav-home.png', '/assets/nav-fridge.png', '/assets/nav-recommend.png', '/assets/nav-profile.png',
  '/assets/icons/ui-analysis.svg', '/assets/icons/ui-banner.svg', '/assets/icons/ui-fridge.svg',
  '/assets/icons/ui-leaf.svg', '/assets/icons/ui-log.svg', '/assets/icons/ui-recommend.svg'
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await Promise.allSettled(SHELL.map(url => cache.add(url)));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

async function networkWithTimeout(request, ms=1600) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try { return await fetch(request, {signal: controller.signal, cache:'no-store'}); }
  finally { clearTimeout(timer); }
}

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const resp = await networkWithTimeout(req, 1600);
        if (resp && resp.ok) {
          const cache = await caches.open(CACHE);
          cache.put('/index.html', resp.clone());
          return resp;
        }
      } catch {}
      return (await caches.match('/index.html')) || (await caches.match('/')) || Response.error();
    })());
    return;
  }

  const isJson = url.pathname.endsWith('.json');
  if (isJson) {
    event.respondWith((async () => {
      const cached = await caches.match(req, {ignoreSearch:true});
      const refresh = fetch(req).then(async resp => {
        if (resp && resp.ok) { const cache = await caches.open(CACHE); cache.put(req, resp.clone()); }
        return resp;
      }).catch(() => null);
      if (cached) { event.waitUntil(refresh); return cached; }
      return (await refresh) || Response.error();
    })());
    return;
  }

  event.respondWith((async () => {
    const cached = await caches.match(req);
    if (cached) return cached;
    try {
      const resp = await fetch(req);
      if (resp && resp.ok) { const cache = await caches.open(CACHE); cache.put(req, resp.clone()); }
      return resp;
    } catch {
      return Response.error();
    }
  })());
});
