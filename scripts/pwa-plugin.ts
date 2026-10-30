import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import { deflateSync } from 'node:zlib';
import type { Plugin } from 'vite';

const ICONS = [
  { path: 'assets/brand/icon-192.png', size: 192 },
  { path: 'assets/brand/icon-1024.png', size: 1024 },
  { path: 'assets/brand/icon-maskable-512.png', size: 512 },
] as const;

function crc32(bytes: Buffer): number {
  let crc = -1;
  for (const byte of bytes) {
    crc ^= byte;
    for (let j = 0; j < 8; j++) crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
  }
  return (crc ^ -1) >>> 0;
}

function pngChunk(name: string, data: Buffer): Buffer {
  const body = Buffer.concat([Buffer.from(name, 'ascii'), data]);
  const header = Buffer.alloc(4);
  header.writeUInt32BE(data.length);
  const checksum = Buffer.alloc(4);
  checksum.writeUInt32BE(crc32(body));
  return Buffer.concat([header, body, checksum]);
}

/** Własne ikony tymczasowe (PNG), wyłącznie gdy zlecenie 10 nie dostarczyło plików. */
export function createPlaceholderIcon(size: number): Buffer {
  const stride = size * 4 + 1;
  const pixels = Buffer.alloc(stride * size);
  for (let y = 0; y < size; y++) {
    const py = (y + 0.5) / size;
    for (let x = 0; x < size; x++) {
      const px = (x + 0.5) / size;
      let color = [27, 39, 51]; // --bg
      const sun = (px - 0.27) ** 2 + (py - 0.27) ** 2 < 0.085 ** 2;
      const sign = px > 0.19 && px < 0.81 && py > 0.36 && py < 0.73;
      const inner = px > 0.205 && px < 0.795 && py > 0.375 && py < 0.715;
      const roof = px > 0.38 && px < 0.61 && py > 0.48 && py < 0.55;
      const body = px > 0.32 && px < 0.69 && py > 0.55 && py < 0.64;
      const wheel = ((px - 0.4) ** 2 + (py - 0.65) ** 2 < 0.031 ** 2)
        || ((px - 0.62) ** 2 + (py - 0.65) ** 2 < 0.031 ** 2);
      if (sun) color = [255, 196, 66];
      if (sign) color = [255, 250, 240]; // --panel
      if (inner) color = [46, 157, 76]; // --primary
      if (roof || body) color = [255, 196, 66];
      if (wheel) color = [27, 39, 51];
      if (px > 0.34 && px < 0.66 && py > 0.675 && py < 0.692) color = [220, 20, 60]; // --accent
      const offset = y * stride + 1 + x * 4;
      pixels[offset] = color[0];
      pixels[offset + 1] = color[1];
      pixels[offset + 2] = color[2];
      pixels[offset + 3] = 255;
    }
  }

  const header = Buffer.alloc(13);
  header.writeUInt32BE(size, 0);
  header.writeUInt32BE(size, 4);
  header[8] = 8; // 8 bitów na kanał
  header[9] = 6; // RGBA
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    pngChunk('IHDR', header),
    pngChunk('IDAT', deflateSync(pixels, { level: 9 })),
    pngChunk('IEND', Buffer.alloc(0)),
  ]);
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
    // Bez edycji index.html (plik koordynatora).
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

      // Zmiana statycznego assetu (też pliku z public/) zmienia wersję cache.
      for (const file of listFiles(publicDir)) {
        hash.update(relative(publicDir, file)).update('\0').update(readFileSync(file));
      }

      for (const icon of ICONS) {
        if (existsSync(join(publicDir, icon.path))) continue;
        const placeholder = createPlaceholderIcon(icon.size);
        this.emitFile({ type: 'asset', fileName: icon.path, source: placeholder });
        hash.update(icon.path).update('\0').update(placeholder);
      }

      const version = hash.digest('hex').slice(0, 16);
      const files = [...new Set([
        'index.html', 'manifest.webmanifest', ...buildFiles.map(([name]) => name), ...ICONS.map((icon) => icon.path),
      ])];
      const template = readFileSync(join(projectRoot, 'src/pwa/sw.js'), 'utf8');
      const worker = template
        .replace('__CE_BUILD_VERSION__', version)
        .replace('__CE_PRECACHE_LIST__', JSON.stringify(files));
      this.emitFile({ type: 'asset', fileName: 'sw.js', source: worker });
    },
  };
}
