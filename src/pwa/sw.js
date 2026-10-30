/* SW tylko dla hostowanej gry. Vite podstawia wersję i listy plików. */
const BUILD_VERSION = '__CE_BUILD_VERSION__';
const PRECACHE_FILES = __CE_PRECACHE_LIST__;
// typeof pozwala uruchomić starsze testy SW, które nie podstawiają drugiej listy.
const DEFERRED_FILES = typeof __CE_DEFERRED_LIST__ === 'undefined' ? [] : __CE_DEFERRED_LIST__;

// Scope w nazwie chroni cache innych gier na tej samej domenie.
const CACHE_PREFIX = 'ce-pwa:' + self.registration.scope + ':';
const SHELL_CACHE = CACHE_PREFIX + 'shell-' + BUILD_VERSION;
const ASSET_CACHE = CACHE_PREFIX + 'assets-' + BUILD_VERSION;
const SHELL_URL = new URL('index.html', self.registration.scope).href;
const MANIFEST_PATH = new URL('manifest.webmanifest', self.registration.scope).pathname;
const ASSETS_PATH = new URL('assets/', self.registration.scope).pathname;
const SCOPE_PATH = new URL(self.registration.scope).pathname;
const NAVIGATION_TIMEOUT_MS = 3000;
const PREFETCH_BATCH_SIZE = 4;

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    // Etap 1: transakcyjny cache kodu, bohatera, przeszkód, UI i ikon.
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
  // Słaby zasięg nie może blokować uruchomienia gry ponad 3 sekundy.
  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  let timer;
  const deadline = new Promise((_resolve, reject) => {
    if (typeof setTimeout !== 'undefined') {
      timer = setTimeout(() => {
        controller?.abort();
        reject(new Error('Timeout nawigacji PWA'));
      }, NAVIGATION_TIMEOUT_MS);
    }
  });
  try {
    // Nie zapisujemy HTML z nowszego deployu w cache starszej wersji SW.
    const response = await Promise.race([
      fetch(request, controller ? { signal: controller.signal } : undefined),
      deadline,
    ]);
    if (!response.ok) throw new Error('Odpowiedź sieciowa niepoprawna');
    return response;
  } catch {
    const shell = await caches.open(SHELL_CACHE);
    return (await shell.match(SHELL_URL)) ?? Response.error();
  } finally {
    if (timer !== undefined && typeof clearTimeout !== 'undefined') clearTimeout(timer);
  }
}

async function cacheFirstAsset(request) {
  const shell = await caches.open(SHELL_CACHE);
  const installed = await shell.match(request, { ignoreSearch: true });
  if (installed) return installed;

  const cache = await caches.open(ASSET_CACHE);
  const cached = await cache.match(request, { ignoreSearch: true });
  if (cached) return cached;

  const response = await fetch(request);
  if (response.ok && response.type === 'basic') {
    try {
      // Bez limitu 120: nowe kraje nie mogą wypychać starych krajów z cache.
      await cache.put(request, response.clone());
    } catch (error) {
      console.warn('[PWA] Nie udało się zapisać grafiki:', error);
    }
  }
  return response;
}

let prefetchPromise = null;

async function prefetchRemainingAssets() {
  const shell = await caches.open(SHELL_CACHE);
  const cache = await caches.open(ASSET_CACHE);
  // Etap 2: po pierwszym przejeździe dociągamy wszystkie kraje, punkty trasy i skórki.
  // Dalsze przejazdy ponawiają nieudane żądania, bez usuwania już pobranych plików.
  for (let i = 0; i < DEFERRED_FILES.length; i += PREFETCH_BATCH_SIZE) {
    const batch = DEFERRED_FILES.slice(i, i + PREFETCH_BATCH_SIZE);
    await Promise.all(batch.map(async (path) => {
      const url = new URL(path, self.registration.scope).href;
      try {
        if (await shell.match(url) || await cache.match(url)) return;
        const request = new Request(url, { cache: 'reload' });
        const response = await fetch(request);
        if (response.ok && response.type === 'basic') {
          await cache.put(url, response.clone());
        }
      } catch (error) {
        // Nie blokujemy pozostałych grafik i pozwalamy ponowić próbę.
        console.warn('[PWA] Nie udało się pobrać zasobu offline:', path, error);
      }
    }));
  }
}

self.addEventListener('message', (event) => {
  if (event.data?.type !== 'CE_OFFLINE_PREFETCH_AFTER_RUN') return;
  if (!prefetchPromise) {
    prefetchPromise = prefetchRemainingAssets().finally(() => { prefetchPromise = null; });
  }
  // waitUntil zapobiega natychmiastowemu uśpieniu SW podczas dociągania grafik.
  event.waitUntil(prefetchPromise);
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith(SCOPE_PATH)) return;
  const relativePath = url.pathname.slice(SCOPE_PATH.length);
  // Firebase oraz API pozostają poza SW i nigdy nie trafiają do cache.
  if (/^(?:api|__|firebase)(?:\/|$)/i.test(relativePath)) return;

  if (request.mode === 'navigate') {
    event.respondWith(networkFirstNavigation(request));
  } else if (url.pathname.startsWith(ASSETS_PATH) || url.pathname === MANIFEST_PATH) {
    event.respondWith(cacheFirstAsset(request));
  }
});
