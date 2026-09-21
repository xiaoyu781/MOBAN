const CACHE = 'nutrition-planner-v140';
const SHELL = [
  '/', '/index.html', '/styles.css?v=1.4.0', '/app.js?v=1.4.0', '/manifest.webmanifest',
  '/data/starter-foods.json',
  '/assets/icon-192.png', '/assets/icon-512.png',
  '/assets/nav-home.png', '/assets/nav-fridge.png', '/assets/nav-recommend.png', '/assets/nav-profile.png'
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

async function refreshIntoCache(request, cacheKey) {
  try {
    const resp = await fetch(request, {cache:'no-store'});
    if (resp && resp.ok) {
      const cache = await caches.open(CACHE);
      await cache.put(cacheKey || request, resp.clone());
    }
    return resp;
  } catch {
    return null;
  }
}

function offlineHtml() {
  return new Response(`<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Nutrition Planner</title><style>body{font-family:system-ui,-apple-system,sans-serif;margin:0;background:#f6f8fb;color:#172033;display:grid;min-height:100vh;place-items:center}.box{max-width:320px;padding:28px;text-align:center}.box h2{margin:0 0 10px}.box p{color:#6b7280;line-height:1.6}.box button{margin-top:14px;border:0;border-radius:12px;background:#2f7df6;color:white;padding:12px 18px;font-size:16px}</style><div class="box"><h2>暂时无法连接</h2><p>当前网络无法访问部署地址。请检查网络后重试；如果之前成功打开过，应用会优先使用本地缓存。</p><button onclick="location.reload()">重新加载</button></div></html>`, {headers:{'Content-Type':'text/html; charset=utf-8'}});
}

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  // Never cache Vercel Functions / API responses such as Supabase public config.
  if (url.pathname.startsWith('/api/')) return;

  // Navigation: cache-first, refresh in background. Do not abort after 1.6s.
  // This avoids mobile Safari/Chrome showing “server stopped responding” on slow links.
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      const cached = (await caches.match('/index.html')) || (await caches.match('/'));
      if (cached) {
        event.waitUntil(refreshIntoCache(req, '/index.html'));
        return cached;
      }
      const live = await refreshIntoCache(req, '/index.html');
      return (live && live.ok) ? live : offlineHtml();
    })());
    return;
  }

  const isJson = url.pathname.endsWith('.json');
  if (isJson) {
    event.respondWith((async () => {
      const cached = await caches.match(req, {ignoreSearch:true});
      const refresh = refreshIntoCache(req, req);
      if (cached) { event.waitUntil(refresh); return cached; }
      return (await refresh) || new Response('{}', {headers:{'Content-Type':'application/json'}});
    })());
    return;
  }

  // Static assets: cache-first; fetch only when absent.
  event.respondWith((async () => {
    const cached = await caches.match(req, {ignoreSearch:false});
    if (cached) return cached;
    const live = await refreshIntoCache(req, req);
    return live || Response.error();
  })());
});
