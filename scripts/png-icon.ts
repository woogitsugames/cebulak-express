import { deflateSync, inflateSync } from 'node:zlib';

const SIGNATURE = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

function crc32(bytes: Buffer): number {
  let crc = -1;
  for (const byte of bytes) {
    crc ^= byte;
    for (let j = 0; j < 8; j++) crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0);
  }
  return (crc ^ -1) >>> 0;
}

function pngChunk(name: string, data: Buffer): Buffer {
  const body = Buffer.concat([Buffer.from(name, 'ascii'), data]);
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const checksum = Buffer.alloc(4);
  checksum.writeUInt32BE(crc32(body));
  return Buffer.concat([length, body, checksum]);
}

function encodeRgba(width: number, height: number, rgba: Buffer): Buffer {
  const header = Buffer.alloc(13);
  header.writeUInt32BE(width, 0);
  header.writeUInt32BE(height, 4);
  header[8] = 8; // 8 bitów na kanał
  header[9] = 6; // RGBA
  const rows = Buffer.alloc(height * (1 + width * 4));
  for (let y = 0; y < height; y++) {
    rgba.copy(rows, y * (1 + width * 4) + 1, y * width * 4, (y + 1) * width * 4);
  }
  return Buffer.concat([
    SIGNATURE,
    pngChunk('IHDR', header),
    pngChunk('IDAT', deflateSync(rows, { level: 9 })),
    pngChunk('IEND', Buffer.alloc(0)),
  ]);
}

/** Bez zewnętrznych bibliotek: dekoder PNG 8-bit RGB, RGBA i indexed (Pillow). */
function decodeRgba(png: Buffer): { width: number; height: number; rgba: Buffer } {
  if (!png.subarray(0, 8).equals(SIGNATURE)) throw new Error('Ikona źródłowa nie jest PNG');
  let width = 0;
  let height = 0;
  let type = -1;
  let palette: Buffer | null = null;
  let transparency: Buffer | null = null;
  const data: Buffer[] = [];
  for (let pos = 8; pos < png.length;) {
    if (pos + 12 > png.length) throw new Error('Uszkodzony plik PNG');
    const length = png.readUInt32BE(pos);
    if (length > png.length - pos - 12) throw new Error('Niepełny fragment PNG');
    const name = png.toString('ascii', pos + 4, pos + 8);
    const chunk = png.subarray(pos + 8, pos + 8 + length);
    if (name === 'IHDR') {
      if (length !== 13) throw new Error('Nieprawidłowy IHDR');
      width = chunk.readUInt32BE(0);
      height = chunk.readUInt32BE(4);
      type = chunk[9];
      if (chunk[8] !== 8 || ![2, 3, 6].includes(type) || chunk[12] !== 0 || width < 1 || height < 1 || width > 4096 || height > 4096) {
        throw new Error('Nieobsługiwany wariant PNG ikony');
      }
    } else if (name === 'PLTE') palette = chunk;
    else if (name === 'tRNS') transparency = chunk;
    else if (name === 'IDAT') data.push(chunk);
    pos += length + 12;
    if (name === 'IEND') break;
  }
  if (!width || !height || !data.length || (type === 3 && (!palette || !palette.length))) {
    throw new Error('Brak wymaganych danych PNG');
  }
  const bpp = type === 6 ? 4 : type === 2 ? 3 : 1;
  const rowSize = width * bpp;
  const raw = inflateSync(Buffer.concat(data));
  if (raw.length !== (rowSize + 1) * height) throw new Error('Nieprawidłowy rozmiar obrazu PNG');
  const rgba = Buffer.alloc(width * height * 4);
  let prev = Buffer.alloc(rowSize);
  for (let y = 0; y < height; y++) {
    const start = y * (rowSize + 1);
    const filter = raw[start];
    if (filter > 4) throw new Error('Nieznany filtr PNG');
    const row = Buffer.allocUnsafe(rowSize);
    for (let i = 0; i < rowSize; i++) {
      const left = i >= bpp ? row[i - bpp] : 0;
      const above = prev[i];
      const upperLeft = i >= bpp ? prev[i - bpp] : 0;
      let prediction = 0;
      if (filter === 1) prediction = left;
      else if (filter === 2) prediction = above;
      else if (filter === 3) prediction = Math.floor((left + above) / 2);
      else if (filter === 4) {
        const p = left + above - upperLeft;
        const a = Math.abs(p - left);
        const b = Math.abs(p - above);
        const c = Math.abs(p - upperLeft);
        prediction = a <= b && a <= c ? left : b <= c ? above : upperLeft;
      }
      row[i] = (raw[start + 1 + i] + prediction) & 255;
    }
    for (let x = 0; x < width; x++) {
      const target = (y * width + x) * 4;
      if (type === 3) {
        const index = row[x];
        if (!palette || index * 3 + 2 >= palette.length) throw new Error('Nieprawidłowa paleta PNG');
        rgba[target] = palette[index * 3];
        rgba[target + 1] = palette[index * 3 + 1];
        rgba[target + 2] = palette[index * 3 + 2];
        rgba[target + 3] = transparency?.[index] ?? 255;
      } else {
        const source = x * bpp;
        rgba[target] = row[source];
        rgba[target + 1] = row[source + 1];
        rgba[target + 2] = row[source + 2];
        rgba[target + 3] = type === 6 ? row[source + 3] : 255;
      }
    }
    prev = row;
  }
  return { width, height, rgba };
}

/** Tworzy 192×192 z prawdziwej ikony 1024; nie używa sztucznego zastępnika. */
export function resizePngIcon(png: Buffer, size = 192): Buffer {
  const { width, height, rgba } = decodeRgba(png);
  if (width !== height) throw new Error('Ikona źródłowa musi być kwadratowa');
  if (!Number.isInteger(size) || size <= 0 || size > 4096) throw new Error('Nieprawidłowy rozmiar ikony');
  const target = Buffer.alloc(size * size * 4);
  for (let y = 0; y < size; y++) {
    const sy = Math.max(0, Math.min(height - 1, (y + 0.5) * height / size - 0.5));
    const y0 = Math.floor(sy), y1 = Math.min(height - 1, y0 + 1), fy = sy - y0;
    for (let x = 0; x < size; x++) {
      const sx = Math.max(0, Math.min(width - 1, (x + 0.5) * width / size - 0.5));
      const x0 = Math.floor(sx), x1 = Math.min(width - 1, x0 + 1), fx = sx - x0;
      const samples = [
        [(y0 * width + x0) * 4, (1 - fx) * (1 - fy)],
        [(y0 * width + x1) * 4, fx * (1 - fy)],
        [(y1 * width + x0) * 4, (1 - fx) * fy],
        [(y1 * width + x1) * 4, fx * fy],
      ];
      let alpha = 0;
      const rgb = [0, 0, 0];
      for (const [offset, weight] of samples) {
        const a = rgba[offset + 3] / 255 * weight;
        alpha += a;
        for (let c = 0; c < 3; c++) rgb[c] += rgba[offset + c] * a;
      }
      const at = (y * size + x) * 4;
      for (let c = 0; c < 3; c++) target[at + c] = alpha ? Math.round(rgb[c] / alpha) : 0;
      target[at + 3] = Math.round(alpha * 255);
    }
  }
  return encodeRgba(size, size, target);
}

/** Zastępcza ikona wyłącznie dla repo bez plików graficznych. */
export function createPlaceholderIcon(size: number): Buffer {
  const pixels = Buffer.alloc(size * size * 4);
  for (let y = 0; y < size; y++) {
    const py = (y + 0.5) / size;
    for (let x = 0; x < size; x++) {
      const px = (x + 0.5) / size;
      let color = [27, 39, 51];
      if ((px - 0.27) ** 2 + (py - 0.27) ** 2 < 0.085 ** 2) color = [255, 196, 66];
      if (px > 0.19 && px < 0.81 && py > 0.36 && py < 0.73) color = [255, 250, 240];
      if (px > 0.205 && px < 0.795 && py > 0.375 && py < 0.715) color = [46, 157, 76];
      if ((px > 0.38 && px < 0.61 && py > 0.48 && py < 0.55)
        || (px > 0.32 && px < 0.69 && py > 0.55 && py < 0.64)) color = [255, 196, 66];
      if (((px - 0.4) ** 2 + (py - 0.65) ** 2 < 0.031 ** 2)
        || ((px - 0.62) ** 2 + (py - 0.65) ** 2 < 0.031 ** 2)) color = [27, 39, 51];
      if (px > 0.34 && px < 0.66 && py > 0.675 && py < 0.692) color = [220, 20, 60];
      const offset = (y * size + x) * 4;
      pixels[offset] = color[0];
      pixels[offset + 1] = color[1];
      pixels[offset + 2] = color[2];
      pixels[offset + 3] = 255;
    }
  }
  return encodeRgba(size, size, pixels);
}
