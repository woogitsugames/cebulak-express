/* Globalny SW tylko dla hostowanej gry. Podczas buildu Vite podstawia wersję i listę plików. */
const BUILD_VERSION = '__CE_BUILD_VERSION__';
const PRECACHE_FILES = __CE_PRECACHE_LIST__;

// Scope w nazwie zapobiega kolizji cache przy kilku grach na jednej domenie.
const CACHE_PREFIX = `ce-pwa:${self.registration.scope}:`;
const SHELL_CACHE = `${CACHE_PREFIX}shell-${BUILD_VERSION}`;
const ASSET_CACHE = `${CACHE_PREFIX}assets-${BUILD_VERSION}`;
const SHELL_URL = new URL('index.html', self.registration.scope).href;
const MANIFEST_PATH = new URL('manifest.webmanifest', self.registration.scope).pathname;
const ASSETS_PATH = new URL('assets/', self.registration.scope).pathname;
const SCOPE_PATH = new URL(self.registration.scope).pathname;
const MAX_RUNTIME_ASSETS = 120;

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    // Transakcyjny precache: worker nie aktywuje się po częściowym pobraniu plików.
    const cache = await caches.open(SHELL_CACHE);
    const urls = PRECACHE_FILES.map((path) => new URL(path, self.registration.scope).href);
    await cache.addAll(urls.map((url) => new Request(url, { cache: 'reload' })));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names
      .filter((name) => name.startsWith(CACHE_PREFIX) && name !== SHELL_CACHE && name !== ASSET_CACHE)
      .map((name) => caches.delete(name)));
    await self.clients.claim();
  })());
});

async function networkFirstNavigation(request) {
  try {
    // Nie zapisujemy HTML z nowszego deployu w cache starszej wersji SW:
    // może odwoływać się do paczek JS, których stary worker nie ma.
    return await fetch(request);
  } catch {
    const shell = await caches.open(SHELL_CACHE);
    return (await shell.match(SHELL_URL)) ?? Response.error();
  }
}

async function trimAssetCache(cache) {
  const keys = await cache.keys();
  if (keys.length > MAX_RUNTIME_ASSETS) {
    await Promise.all(keys.slice(0, keys.length - MAX_RUNTIME_ASSETS).map((key) => cache.delete(key)));
  }
}

async function cacheFirstAsset(request) {
  const shell = await caches.open(SHELL_CACHE);
  const inShell = await shell.match(request, { ignoreSearch: true });
  if (inShell) return inShell;

  const runtime = await caches.open(ASSET_CACHE);
  const cached = await runtime.match(request);
  if (cached) return cached;

  const response = await fetch(request);
  if (response.ok && response.type === 'basic') {
    await runtime.put(request, response.clone());
    await trimAssetCache(runtime);
  }
  return response;
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  // Żadnych żądań cross-origin (w tym Firebase), nawet GET, nie przechwytujemy.
  if (url.origin !== self.location.origin || !url.pathname.startsWith(SCOPE_PATH)) return;

  const relativePath = url.pathname.slice(SCOPE_PATH.length);
  // API, hosting Firebase i inne dynamiczne punkty końcowe są zawsze sieciowe.
  if (/^(?:api|__|firebase)(?:\/|$)/i.test(relativePath)) return;

  if (request.mode === 'navigate') {
    event.respondWith(networkFirstNavigation(request));
  } else if (url.pathname.startsWith(ASSETS_PATH) || url.pathname === MANIFEST_PATH) {
    event.respondWith(cacheFirstAsset(request));
  }
});
