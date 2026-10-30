import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import type { Plugin } from 'vite';
import { createPlaceholderIcon, resizePngIcon } from './png-icon';

export { createPlaceholderIcon, resizePngIcon } from './png-icon';

const ICONS = [
  { path: 'assets/brand/icon-192.png', size: 192 },
  { path: 'assets/brand/icon-1024.png', size: 1024 },
  { path: 'assets/brand/icon-maskable-512.png', size: 512 },
] as const;

const RUNTIME_EXTENSIONS = /\.(?:png|webp|jpe?g|svg|gif|json|ogg|mp3|m4a|wav|webm)$/i;
const EXCLUDED_BRAND = /^assets\/brand\/(?:og-|play-feature|splash-2732\.png$|card-bg-)/;
const CORE_PREFIXES = ['assets/hero/', 'assets/obstacles/', 'assets/ui/'];

/** Tylko zasoby wykonywanej gry; bez dokumentacji, generatorów i grafik marketingowych. */
export function isRuntimeAsset(path: string): boolean {
  return path.startsWith('assets/')
    && RUNTIME_EXTENSIONS.test(path)
    && !/(?:^|\/)preview\.(?:png|webp|jpe?g)$/i.test(path)
    && !EXCLUDED_BRAND.test(path);
}

/** Dwa etapy: mały, transakcyjny start oraz komplet grafik krajów w tle. */
export function splitAssetPrecache(files: string[]): { core: string[]; deferred: string[] } {
  const core: string[] = [];
  const deferred: string[] = [];
  for (const path of files.filter(isRuntimeAsset).sort()) {
    if (CORE_PREFIXES.some((prefix) => path.startsWith(prefix)) || path.startsWith('assets/brand/')) {
      core.push(path);
    } else {
      deferred.push(path);
    }
  }
  return { core, deferred };
}

function listFiles(path: string): string[] {
  if (!existsSync(path)) return [];
  return readdirSync(path, { withFileTypes: true })
    .flatMap((item) => item.isDirectory() ? listFiles(join(path, item.name))
      : item.isFile() ? [join(path, item.name)] : [])
    .sort();
}

export function pwaPlugin(): Plugin {
  let projectRoot = process.cwd();
  let publicDir = join(projectRoot, 'public');

  return {
    name: 'cebulak-pwa',
    apply: 'build',
    configResolved(config) {
      projectRoot = config.root;
      publicDir = config.publicDir;
    },
    // Manifest dodawany bez modyfikowania index.html, który należy do koordynatora.
    transformIndexHtml() {
      return [{ tag: 'link', attrs: { rel: 'manifest', href: './manifest.webmanifest' }, injectTo: 'head' }];
    },
    generateBundle(_options, bundle) {
      const hash = createHash('sha256');
      const buildFiles = Object.entries(bundle).sort(([a], [b]) => a.localeCompare(b));
      for (const [name, output] of buildFiles) {
        hash.update(name).update('\0');
        hash.update(output.type === 'chunk' ? output.code : output.source);
      }

      const assets = listFiles(join(publicDir, 'assets'))
        .map((file) => relative(publicDir, file).split(sep).join('/'));
      const { core, deferred } = splitAssetPrecache(assets);
      const iconPaths = new Set(assets);

      // Priorytet: gotowy plik 192; gdy go nie ma, pomniejszamy prawdziwe logo 1024.
      // Własny dekoder PNG 8-bit (RGB, RGBA, paleta), bez ciężkiego sharp/canvas.
      for (const icon of ICONS) {
        if (iconPaths.has(icon.path)) continue;
        const source = join(publicDir, 'assets/brand/icon-1024.png');
        const result = icon.size === 192 && existsSync(source)
          ? resizePngIcon(readFileSync(source), 192)
          : createPlaceholderIcon(icon.size);
        this.emitFile({ type: 'asset', fileName: icon.path, source: result });
        hash.update(icon.path).update('\0').update(result);
        core.push(icon.path);
      }

      // Nawet zmiana samego kodu SW lub manifestu musi wymusić nową wersję cache.
      for (const file of listFiles(publicDir)) {
        const path = relative(publicDir, file).split(sep).join('/');
        if (isRuntimeAsset(path) || path === 'manifest.webmanifest') {
          hash.update(path).update('\0').update(readFileSync(file));
        }
      }
      const template = readFileSync(join(projectRoot, 'src/pwa/sw.js'), 'utf8');
      hash.update(template);
      const version = hash.digest('hex').slice(0, 16);
      const precache = [...new Set([
        'index.html', 'manifest.webmanifest',
        ...buildFiles.map(([name]) => name),
        ...core,
      ])].sort();
      const remaining = [...new Set(deferred)].sort();
      const worker = template
        .replace('__CE_BUILD_VERSION__', version)
        .replace('__CE_PRECACHE_LIST__', JSON.stringify(precache))
        .replaceAll('__CE_DEFERRED_LIST__', JSON.stringify(remaining));
      this.emitFile({ type: 'asset', fileName: 'sw.js', source: worker });
    },
  };
}
