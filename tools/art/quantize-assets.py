#!/usr/bin/env python3
"""Kwantyzacja PNG z public/assets do palety 256 kolorów (mniejsze APK i PWA).

Dla każdego PNG:

  * plik już w trybie P (m.in. panoramy landmarks i pocztówki) → tylko
    bezstratne przepakowanie oxipng (piksele bez zmian),
  * ≤256 unikalnych kolorów RGBA → paleta dokładna (bezstratnie, alfa w tRNS),
  * więcej kolorów → libimagequant (pakiet `imagequant`) z ditheringiem
    Floyda–Steinberga; dithering usuwa pasy w gradientach nieba, wody, poświat
    i portretów. Wynik jest odrzucany, gdy błąd niskich częstotliwości jest
    duży (wtedy plik zostaje w RGB/RGBA, tylko przepakowany bezstratnie).
    Bez pakietu `imagequant` krok stratny jest pomijany — kwantyzacja
    Pillow (median cut/octree, bez ditheringu) robiła widoczne pierścienie
    wokół słońca i pasy na wodzie, więc nie jest używana,
  * na końcu bezstratnie oxipng (pakiet `pyoxipng`, jeśli jest), ze
    sprawdzeniem, że zdekodowane piksele są identyczne,
  * plik jest nadpisywany tylko wtedy, gdy wynik jest mniejszy.

Grafiki marki (public/assets/brand) są pomijane: ikony i materiały sklepowe
mają własny generator (tools/art/brand-generate.py).

Po zmianie źródeł pocztówek (niebo, wzgórza, znaczki) skróty SHA-256 w
public/assets/postcards/generated.json są aktualizowane, żeby
`npm run art:postcards` nie przebudowywał wszystkich pocztówek.

Użycie (z katalogu repozytorium):
  python3 tools/art/quantize-assets.py [--dry-run] [--lossless-only] [ścieżka ...]
Zależności: Python 3, Pillow, NumPy; zalecane: pip install imagequant pyoxipng
(narzędzie deweloperskie, nic z tych pakietów nie trafia do gry).
"""
from __future__ import annotations

import argparse
import hashlib
import io
import json
import os
import sys

import numpy as np
from PIL import Image

try:
    import imagequant
except ImportError:  # zależność opcjonalna
    imagequant = None
try:
    import oxipng
except ImportError:  # zależność opcjonalna
    oxipng = None

ROOT = 'public/assets'
SKIP_DIRS = ('public/assets/brand',)
GENERATED = 'public/assets/postcards/generated.json'
# Próg pasów: 99,5 percentyl i odsetek pikseli z błędem > 6 po rozmyciu 9×9.
BAND_P995 = 6.0
BAND_FRACTION = 0.5


def sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def encode(im: Image.Image) -> bytes:
    out = io.BytesIO()
    im.save(out, 'PNG', optimize=True)
    return out.getvalue()


def visible_pixels(data: bytes) -> np.ndarray:
    """RGBA z wyzerowanym kolorem tam, gdzie alfa = 0 (kolor i tak niewidoczny)."""
    out = np.array(Image.open(io.BytesIO(data)).convert('RGBA'))
    out[out[..., 3] == 0] = 0
    return out


def lossless(data: bytes) -> bytes:
    """oxipng bez strat; wynik tylko wtedy, gdy piksele są identyczne."""
    if oxipng is None:
        return data
    try:
        packed = oxipng.optimize_from_memory(data, level=4, strip=oxipng.StripChunks.safe())
    except oxipng.PngError:
        # Np. zła suma CRC w pliku źródłowym: przepakuj przez Pillow (dekoduje go poprawnie).
        packed = oxipng.optimize_from_memory(encode(Image.open(io.BytesIO(data))),
                                             level=4, strip=oxipng.StripChunks.safe())
    if len(packed) >= len(data):
        return data
    if not np.array_equal(visible_pixels(packed), visible_pixels(data)):
        return data
    return packed


def exact_palette(rgba: np.ndarray) -> Image.Image | None:
    flat = rgba.reshape(-1, 4)
    colors, index = np.unique(flat, axis=0, return_inverse=True)
    if len(colors) > 256:
        return None
    # Kolory przezroczyste na początek palety: krótszy chunk tRNS.
    order = np.argsort(colors[:, 3] == 255, kind='stable')
    remap = np.empty(len(colors), dtype=np.uint8)
    remap[order] = np.arange(len(colors), dtype=np.uint8)
    colors = colors[order]
    im = Image.fromarray(remap[index.reshape(-1)].reshape(rgba.shape[:2]), 'P')
    im.putpalette(colors[:, :3].astype(np.uint8).tobytes())
    alpha = colors[:, 3].astype(np.uint8)
    if (alpha < 255).any():
        last = int(np.nonzero(alpha < 255)[0].max()) + 1
        im.info['transparency'] = alpha[:last].tobytes()
    return im


def premultiplied(im: Image.Image) -> np.ndarray:
    """RGBA z kolorem przemnożonym przez alfę: ukryty kolor pikseli przezroczystych
    nie wpływa na wynik (libimagequant zmienia go dowolnie)."""
    a = np.asarray(im.convert('RGBA')).astype(np.float32)
    a[..., :3] *= a[..., 3:4] / 255.0
    return a


def box_blur(a: np.ndarray, radius: int = 4) -> np.ndarray:
    """Średnia w oknie (2r+1)×(2r+1) przez sumy skumulowane (brzegi powielone)."""
    size = 2 * radius + 1
    p = np.pad(a, ((radius + 1, radius), (radius + 1, radius), (0, 0)), mode='edge')
    c = p.cumsum(axis=0).cumsum(axis=1)
    s = c[size:, size:] - c[:-size, size:] - c[size:, :-size] + c[:-size, :-size]
    return s / (size * size)


def banding(original: Image.Image, quantized: Image.Image) -> tuple[float, float]:
    d = np.abs(box_blur(premultiplied(original)) - box_blur(premultiplied(quantized))).max(axis=2)
    return float(np.percentile(d, 99.5)), float((d > 6).mean() * 100)


def process(path: str, lossless_only: bool = False) -> tuple[str, int, int, bytes | None]:
    src = open(path, 'rb').read()
    im = Image.open(io.BytesIO(src))
    if im.mode == 'P':
        data, how = lossless(src), 'paleta, oxipng'
    else:
        rgba = im.convert('RGBA')
        px = np.asarray(rgba)
        opaque = bool((px[..., 3] == 255).all())
        exact = exact_palette(px)
        plain = encode(rgba.convert('RGB') if opaque else rgba)
        if exact is not None:
            data, how = encode(exact), 'dokładna'
        elif lossless_only or imagequant is None:
            data, how = plain, 'bezstratnie'
        else:
            quantized = imagequant.quantize_pil_image(rgba, dithering_level=1.0, max_colors=256)
            p995, fraction = banding(rgba, quantized)
            if p995 > BAND_P995 or fraction > BAND_FRACTION:
                data, how = plain, f'bezstratnie (pasy p99.5={p995:.1f} {fraction:.2f}%)'
            else:
                data, how = encode(quantized), f'libimagequant+dither (p99.5={p995:.1f})'
        data = lossless(data)
    if len(data) >= len(src):
        return how + ' (nie mniejszy)', len(src), len(src), None
    return how, len(src), len(data), data


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument('paths', nargs='*')
    parser.add_argument('--dry-run', action='store_true')
    parser.add_argument('--lossless-only', action='store_true',
                        help='bez kwantyzacji stratnej (tylko paleta dokładna i oxipng)')
    args = parser.parse_args()
    if imagequant is None:
        print('Uwaga: brak pakietu imagequant — pomijam kwantyzację stratną.', file=sys.stderr)
    if oxipng is None:
        print('Uwaga: brak pakietu pyoxipng — bez bezstratnego przepakowania.', file=sys.stderr)

    paths = args.paths or sorted(
        os.path.join(root, name)
        for root, _dirs, files in os.walk(ROOT)
        if not root.startswith(SKIP_DIRS)
        for name in files if name.endswith('.png'))
    before = after = 0
    renamed: dict[str, str] = {}
    for path in paths:
        how, old, new, data = process(path, args.lossless_only)
        before += old
        after += new
        print(f'{path}: {how} {old // 1024} kB -> {new // 1024} kB')
        if data is not None and not args.dry_run:
            renamed[sha256(open(path, 'rb').read())] = sha256(data)
            with open(path, 'wb') as fh:
                fh.write(data)
    print(f'Razem: {before / 1e6:.2f} MB -> {after / 1e6:.2f} MB')

    if renamed and os.path.exists(GENERATED):
        text = open(GENERATED, encoding='utf-8').read()
        updated = text
        for old_hash, new_hash in renamed.items():
            updated = updated.replace(old_hash, new_hash)
        if updated != text:
            json.loads(updated)
            open(GENERATED, 'w', encoding='utf-8').write(updated)
            print('Zaktualizowano skróty w', GENERATED)
    return 0


if __name__ == '__main__':
    sys.exit(main())
