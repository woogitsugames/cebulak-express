import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { runInNewContext } from 'node:vm';
import { describe, expect, it } from 'vitest';
import { createPlaceholderIcon, isRuntimeAsset, pruneNonRuntimeAssets, resizePngIcon, splitAssetPrecache } from '../scripts/pwa-plugin';

const scope = 'https://game.example.test/play/';
const source = readFileSync(new URL('../src/pwa/sw.js', import.meta.url), 'utf8');

interface FakeResponse {
  ok: boolean;
  type: string;
  text(): Promise<string>;
  clone(): FakeResponse;
}

function response(body: string): FakeResponse {
  return { ok: true, type: 'basic', text: async () => body, clone: () => response(body) };
}

function workerWithDeferred(deferred: string[], slowNavigation = false) {
  const handlers = new Map<string, (event: never) => void>();
  const buckets = new Map<string, Map<string, FakeResponse>>();
  const requested: string[] = [];
  const times: number[] = [];
  let online = true;
  const normalize = (request: string | { url: string }, ignoreSearch = false) => {
    const url = new URL(typeof request === 'string' ? request : request.url);
    if (ignoreSearch) url.search = '';
    return url.href;
  };
  const fakeFetch = async (request: string | { url: string }): Promise<FakeResponse> => {
    const url = normalize(request);
    requested.push(url);
    if (!online) throw new Error('offline');
    if (slowNavigation && url === scope) return new Promise(() => {});
    return response(url === scope + 'index.html' ? 'shell-index' : 'body:' + url);
  };
  const caches = {
    async keys() { return [...buckets.keys()]; },
    async delete(name: string) { return buckets.delete(name); },
    async open(name: string) {
      if (!buckets.has(name)) buckets.set(name, new Map());
      const bucket = buckets.get(name)!;
      return {
        async addAll(requests: Array<{ url: string }>) {
          // Najpierw pobierz całą grupę: nie dopuszczamy częściowego precache.
          const fetched = await Promise.all(requests.map(async (item) => [normalize(item), await fakeFetch(item)] as const));
          for (const [url, value] of fetched) bucket.set(url, value);
        },
        async match(request: string | { url: string }, options?: { ignoreSearch?: boolean }) {
          const key = normalize(request, options?.ignoreSearch);
          return options?.ignoreSearch
            ? [...bucket.entries()].find(([url]) => normalize(url, true) === key)?.[1]
            : bucket.get(key);
        },
        async put(request: string | { url: string }, value: FakeResponse) { bucket.set(normalize(request), value); },
        async keys() { return [...bucket.keys()].map((url) => ({ url })); },
      };
    },
  };
  const compiled = source
    .replace('__CE_BUILD_VERSION__', 'test-v1')
    .replace('__CE_PRECACHE_LIST__', JSON.stringify(['index.html', 'manifest.webmanifest', 'assets/main-a.js']))
    .replaceAll('__CE_DEFERRED_LIST__', JSON.stringify(deferred));
  runInNewContext(compiled, {
    self: {
      registration: { scope },
      location: { origin: new URL(scope).origin },
      addEventListener: (name: string, handler: (event: never) => void) => handlers.set(name, handler),
      skipWaiting: async () => {},
      clients: { claim: async () => {} },
    },
    caches,
    URL, Request, Response, AbortController, console,
    fetch: fakeFetch,
    setTimeout: (fn: () => void, ms: number) => { times.push(ms); queueMicrotask(fn); return 1; },
    clearTimeout: () => {},
  });
  async function lifecycle(name: string, data?: object): Promise<void> {
    let work: Promise<unknown> | undefined;
    handlers.get(name)!({ data, waitUntil(p: Promise<unknown>) { work = p; } } as never);
    await work;
  }
  async function serve(url: string, mode: string) {
    let work: Promise<FakeResponse> | undefined;
    handlers.get('fetch')!({
      request: { url, mode, method: 'GET' },
      respondWith(p: Promise<FakeResponse>) { work = p; },
    } as never);
    return work;
  }
  return { lifecycle, serve, buckets, requested, times, setOnline(value: boolean) { online = value; } };
}

describe('PWA: pliki i ikona', () => {
  it('dzieli zasoby na startowe i pełny zestaw krajów bez marketingu', () => {
    const files = [
      'assets/hero/kombi-body.png', 'assets/obstacles/truck-tile.png',
      'assets/ui/btn-green.png', 'assets/countries/be/be-sky.png',
      'assets/countries/fr/fr-road.png', 'assets/landmarks/bruksela.png',
      'assets/skins/pan-cebulek/body.png', 'assets/brand/icon-1024.png',
      'assets/brand/og-be-1200x630.png', 'assets/brand/play-feature-1024x500.png',
      'assets/brand/splash-2732.png', 'assets/brand/card-bg-1080x1080.png',
      'assets/landmarks/preview.png', 'assets/hero/ASSETS.md',
    ];
    const { core, deferred } = splitAssetPrecache(files);
    expect(core).toEqual(expect.arrayContaining([
      'assets/hero/kombi-body.png', 'assets/obstacles/truck-tile.png', 'assets/ui/btn-green.png', 'assets/brand/icon-1024.png',
    ]));
    expect(deferred).toEqual(expect.arrayContaining([
      'assets/countries/be/be-sky.png', 'assets/countries/fr/fr-road.png',
      'assets/landmarks/bruksela.png', 'assets/skins/pan-cebulek/body.png',
    ]));
    expect([...core, ...deferred]).toHaveLength(8);
    expect(isRuntimeAsset('assets/landmarks/preview.png')).toBe(false);
    expect(isRuntimeAsset('assets/brand/og-1200x630.png')).toBe(false);
  });

  it('usuwa z dist dokumentację, generatory i grafiki sklepowe, zostawiając zasoby gry', () => {
    const root = mkdtempSync(join(tmpdir(), 'ce-prune-'));
    try {
      const publicDir = join(root, 'public');
      const outDir = join(root, 'dist');
      const keep = [
        'assets/countries/be/be-sky.png', 'assets/skins/pan-cebulek/skin.json',
        'assets/brand/icon-1024.png', 'assets/brand/logo.png', 'assets/brand/logo-small.png',
        'assets/brand/card-bg-1080x1920.png', 'assets/brand/og-1200x630.png',
      ];
      const drop = [
        'assets/countries/be/ASSETS.md', 'assets/countries/be/winter-builder.js',
        'assets/countries/be/generate_be.py', 'assets/store/README.md',
        'assets/brand/play-feature-1024x500.png',
        'assets/brand/icon-foreground.png', 'assets/postcards/generated.json',
      ];
      for (const path of [...keep, ...drop]) {
        for (const base of [publicDir, outDir]) {
          mkdirSync(dirname(join(base, path)), { recursive: true });
          writeFileSync(join(base, path), 'x');
        }
      }
      // Pliki zbudowane przez Vite w dist/assets nie pochodzą z public/ i zostają.
      writeFileSync(join(outDir, 'assets/index-abc.js'), 'x');
      expect(pruneNonRuntimeAssets(publicDir, outDir).sort()).toEqual([...drop].sort());
      for (const path of keep) expect(existsSync(join(outDir, path))).toBe(true);
      expect(existsSync(join(outDir, 'assets/index-abc.js'))).toBe(true);
      expect(existsSync(join(outDir, 'assets/store'))).toBe(false);
      expect(existsSync(join(publicDir, 'assets/store/README.md'))).toBe(true);
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });

  it('pomniejsza prawdziwą ikonę PNG zamiast zastępować ją grafika tymczasową', () => {
    const input = createPlaceholderIcon(1024);
    const result = resizePngIcon(input);
    expect(result.readUInt32BE(16)).toBe(192);
    expect(result.readUInt32BE(20)).toBe(192);
    expect(result.equals(createPlaceholderIcon(192))).toBe(false);
    // Niewspierany format to błąd, a nie ciche zastąpienie oryginalnego logo.
    expect(() => resizePngIcon(Buffer.from('not-png'))).toThrow();
  });
});

describe('PWA: service worker i offline', () => {
  it('dociąga ponad 120 grafik w tle i zachowuje je dla innych krajów offline', async () => {
    const paths = Array.from({ length: 150 }, (_, i) => 'assets/countries/c' + i + '/bg.png');
    const sw = workerWithDeferred(paths);
    await sw.lifecycle('install');
    await sw.lifecycle('message', { type: 'CE_OFFLINE_PREFETCH_AFTER_RUN' });
    sw.setOnline(false);
    for (const n of [0, 49, 119, 149]) {
      const entry = await sw.serve(scope + paths[n], 'cors');
      expect(await entry?.text()).toContain(paths[n]);
    }
    expect(sw.requested.filter((url) => url.includes('countries/'))).toHaveLength(150);
  });

  it('przy słabym zasięgu używa HTML z cache po 3000 ms', async () => {
    const sw = workerWithDeferred([], true);
    await sw.lifecycle('install');
    const html = await sw.serve(scope, 'navigate');
    expect(await html?.text()).toBe('shell-index');
    expect(sw.times).toContain(3000);
  });

  it('nie przechwytuje Firebase ani zewnętrznych API', async () => {
    const sw = workerWithDeferred([]);
    await sw.lifecycle('install');
    expect(await sw.serve(scope + 'api/ranking', 'cors')).toBeUndefined();
    expect(await sw.serve('https://firestore.googleapis.com/v1/a', 'cors')).toBeUndefined();
  });
});
