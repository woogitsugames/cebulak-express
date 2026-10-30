#!/usr/bin/env python3
"""Pocztówki albumu składane automatycznie z panoram miast.

Dla każdego miasta z katalogu POSTCARDS (src/meta/progress.ts, odczyt przez
tools/art/postcards-list.mjs, więc lista miast nie jest powielana), które ma
panoramę public/assets/landmarks/<id>.png, składa pocztówkę 600×400:

  * niebo kraju (countries/<cc>/<cc>-sky.png, górny środek kadru),
  * zamglone dalekie wzgórza (countries/<cc>/<cc>-far.png),
  * panorama miasta na ~85% szerokości okna, stojąca na dolnej krawędzi,
  * kremowa ramka z zaokrąglonymi narożnikami i granatowym konturem #1d2f3b,
  * mały znaczek kraju (postcards/stamp-<cc>.png z zlecenia 54; dla krajów bez
    znaczka rysowany jest znaczek zastępczy w tym samym stylu).

Wynik: public/assets/postcards/<id>.png (paleta 256 kolorów z alfą),
manifest public/assets/postcards/generated.json (skróty SHA-256 źródeł) oraz
arkusz podglądu docs/art/podglady/postcards-preview.png.

Ponowne uruchomienie przebudowuje tylko miasta, których źródła (panorama,
niebo, wzgórza, znaczek) albo wersja stylu się zmieniły.

Użycie (z katalogu repozytorium, `npm run art:postcards -- [opcje]`):
  --only id1,id2   tylko wybrane miasta
  --dry-run        pokaż plan, nic nie zapisuj
  --force          przebuduj wszystko bez względu na manifest
Zależności: Python 3, Pillow, NumPy, Node (Vite z devDependencies do odczytu katalogu).
"""
from __future__ import annotations

import argparse
import hashlib
import io
import json
import math
import subprocess
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[2]
LANDMARKS = ROOT / 'public/assets/landmarks'
COUNTRIES = ROOT / 'public/assets/countries'
POSTCARDS = ROOT / 'public/assets/postcards'
MANIFEST = POSTCARDS / 'generated.json'
ASSETS_MD = POSTCARDS / 'ASSETS.md'
MARK_START = '<!-- postcards-from-panoramas:start -->'
MARK_END = '<!-- postcards-from-panoramas:end -->'
PREVIEW = ROOT / 'docs/art/podglady/postcards-preview.png'

# Podnieś przy każdej zmianie wyglądu (także znaczka zastępczego), żeby manifest wymusił przebudowę.
STYLE_VERSION = 8

W, H = 600, 400
SS = 2  # nadpróbkowanie ramki i znaczka
NAVY = (0x1d, 0x2f, 0x3b, 255)
CREAM = (0xff, 0xf8, 0xe6, 255)
CREAM_DARK = (0xe9, 0xdc, 0xbc, 255)
FRAME = 16           # szerokość kremowej ramki
OUTER_R = 20         # promień narożników pocztówki
WIN_R = 10           # promień narożników okna z ilustracją
PANO_WIDTH = 0.85    # udział szerokości okna zajęty przez panoramę
HAZE = 0.5           # zamglenie dalekich wzgórz w stronę koloru horyzontu
FAR_HEIGHT = 0.55    # docelowa wysokość pasa wzgórz względem okna (gdy pas jest dość szeroki)
STAMP_SIZE = 70
INSET = 8            # próbka gruntu tyle px w głąb od brzegu panoramy (skala okna)
# Znaczek mieści się w środkowym kadrze 4:3 (album przycina boki object-fit: cover),
# w prawym dolnym rogu, z dala od przypinki ✓ rysowanej przez CSS w prawym górnym.
STAMP_RIGHT = 52
STAMP_BOTTOM = 24
STAMP_TILT = -8

# Kraje bez własnych warstw tła: zastępcze tło sąsiada.
SKY_FALLBACK = {'ee': 'fi', 'lv': 'pl', 'lt': 'pl'}
# Barwy do znaczków zastępczych (krajom bez znaczka z zlecenia 54).
FLAG = {
    'at': ['#d9473f', '#fffaf0', '#d9473f'],
    'cz': ['#fffaf0', '#d9473f', '#2f5e9e'],
    'es': ['#d9473f', '#f4c542', '#d9473f'],
    'fi': ['#fffaf0', '#2f5e9e', '#fffaf0'],
    'ie': ['#3f9a5c', '#fffaf0', '#ee9a3a'],
    'it': ['#3f9a5c', '#fffaf0', '#d9473f'],
    'lu': ['#d9473f', '#fffaf0', '#5fb3e0'],
    'ee': ['#2f7cc4', '#1d2f3b', '#fffaf0'],
    'lv': ['#9e3039', '#fffaf0', '#9e3039'],
    'lt': ['#f4c542', '#3f9a5c', '#d9473f'],
}


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def load_catalog() -> list[dict]:
    out = subprocess.run(['node', str(ROOT / 'tools/art/postcards-list.mjs')], cwd=ROOT,
                         check=True, capture_output=True, text=True).stdout
    return json.loads(out)


def rounded_mask(size: tuple[int, int], radius: int) -> Image.Image:
    w, h = size
    big = Image.new('L', (w * SS, h * SS), 0)
    ImageDraw.Draw(big).rounded_rectangle((0, 0, w * SS - 1, h * SS - 1), radius * SS, fill=255)
    return big.resize(size, Image.LANCZOS)


def country_layer(cc: str, name: str) -> Path:
    for code in (cc, SKY_FALLBACK.get(cc, 'pl')):
        path = COUNTRIES / code / f'{code}-{name}.png'
        if path.exists():
            return path
    raise FileNotFoundError(f'brak warstwy {name} dla {cc}')


def stamp_path(cc: str) -> Path | None:
    path = POSTCARDS / f'stamp-{cc}.png'
    return path if path.exists() else None


def fallback_stamp(cc: str) -> Image.Image:
    """Okrągły stempel w stylu znaczków z zlecenia 54: pierścienie i romb w barwach flagi."""
    s = 128 * SS
    img = Image.new('RGBA', (s, s), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    c = s / 2
    d.ellipse((6 * SS, 6 * SS, s - 6 * SS, s - 6 * SS), fill=CREAM, outline=NAVY, width=4 * SS)
    r = 47 * SS
    for i in range(48):  # kropkowany pierścień
        a = i / 48 * math.tau
        x, y = c + r * math.cos(a), c + r * math.sin(a)
        d.ellipse((x - 1.4 * SS, y - 1.4 * SS, x + 1.4 * SS, y + 1.4 * SS), fill=(0x7d, 0x8c, 0x96, 255))
    d.ellipse((c - 38 * SS, c - 38 * SS, c + 38 * SS, c + 38 * SS), outline=NAVY, width=3 * SS)
    colors = FLAG.get(cc, ['#d9473f', '#fffaf0', '#2f5e9e'])
    # romb w trzech pasach
    rh = 30 * SS
    diamond = Image.new('L', (s, s), 0)
    ImageDraw.Draw(diamond).polygon([(c, c - rh), (c + rh * 0.72, c), (c, c + rh), (c - rh * 0.72, c)], fill=255)
    stripes = Image.new('RGBA', (s, s), (0, 0, 0, 0))
    sd = ImageDraw.Draw(stripes)
    band = 2 * rh / 3
    for i, col in enumerate(colors):
        top = c - rh + i * band
        sd.rectangle((0, top, s, top + band + 1), fill=col)
    img.paste(stripes, (0, 0), diamond)
    d.polygon([(c, c - rh), (c + rh * 0.72, c), (c, c + rh), (c - rh * 0.72, c)], outline=NAVY, width=3 * SS)
    d.ellipse((c - 8 * SS, c - 8 * SS, c + 8 * SS, c + 8 * SS), fill=CREAM, outline=NAVY, width=3 * SS)
    for k in (-1, 1):  # „fale” stempla pocztowego
        for j in range(3):
            y = c + (j - 1) * 12 * SS
            x0 = c + k * 40 * SS
            d.arc((x0 - 18 * SS, y - 6 * SS, x0 + 18 * SS, y + 6 * SS), 180 if k < 0 else 0,
                  360 if k < 0 else 180, fill=(0x6c, 0x84, 0x94, 255), width=2 * SS)
    return img.resize((128, 128), Image.LANCZOS)


def alpha_bbox(img: Image.Image, threshold: int = 24) -> tuple[int, int, int, int]:
    a = img.getchannel('A').point(lambda v: 255 if v > threshold else 0)
    return a.getbbox() or (0, 0, img.width, img.height)


def extend_ground(window: Image.Image, small: Image.Image, px: int, py: int, bbox: tuple[int, int, int, int]) -> None:
    """Przedłuż pas gruntu/wody panoramy do bocznych krawędzi okna.

    Strefa gruntu to dolne wiersze nieprzezroczyste na ≥90% szerokości panoramy
    (najwyżej 14% jej wysokości, żeby nie rozciągać gór czy budynków). W każdym wierszu
    strefy, osobno przy lewym i prawym brzegu, bierzemy pierwszy kryjący piksel za
    pionowym konturem (INSET px w głąb) i powielamy go do krawędzi okna (clamp-to-edge). Dzięki temu
    woda, trawa i górny kontur gruntu ciągną się dalej, a znikają pionowe brzegi pasa
    i zaokrąglone narożniki „wysp”.
    """
    arr = np.asarray(small)
    opaque = arr[..., 3] > 200
    x0, _, x1, bottom = bbox
    frac = opaque[:, x0:x1].mean(axis=1)
    y = bottom - 1
    while y > bottom - 9 and frac[y] < 0.9:
        y -= 1
    if frac[y] < 0.9:
        return
    limit = bottom - round(small.height * 0.14)
    while y - 1 >= max(0, limit) and frac[y - 1] >= 0.9:
        y -= 1
    top = y
    reach = max(12, round((x1 - x0) * 0.1))
    out = np.array(window)
    for yy in range(top, bottom):
        wy = py + yy
        if not 0 <= wy < out.shape[0]:
            continue
        row = opaque[yy]
        for side in (-1, 1):
            xs = range(x0, x0 + reach) if side < 0 else range(x1 - 1, x1 - 1 - reach, -1)
            first = next((x for x in xs if row[x]), None)
            if first is None:
                continue
            x = first - side * INSET  # próbka za konturem i cieniowaniem brzegu
            if not row[x]:
                x = first
            color = arr[yy, x, :4].copy()
            color[3] = 255
            if side < 0:
                out[wy, :max(0, px + x)] = color
            else:
                out[wy, min(out.shape[1], px + x + 1):] = color
    window.paste(Image.fromarray(out, 'RGBA'))


def compose(card: dict) -> Image.Image:
    cc = card['country'].lower()
    win_w, win_h = W - 2 * FRAME, H - 2 * FRAME

    # 1. niebo: górny środek pionowej warstwy, w proporcji okna
    sky = Image.open(country_layer(cc, 'sky')).convert('RGBA')
    crop_w = sky.width
    crop_h = round(crop_w * win_h / win_w)
    if crop_h > sky.height:
        crop_h = sky.height
        crop_w = round(crop_h * win_w / win_h)
    left = (sky.width - crop_w) // 2
    window = sky.crop((left, 0, left + crop_w, crop_h)).resize((win_w, win_h), Image.LANCZOS)
    horizon = window.getpixel((win_w // 2, win_h - 1))

    # 2. zamglone dalekie wzgórza, środkowy fragment pasa, dociśnięte do dołu
    far = Image.open(country_layer(cc, 'far')).convert('RGBA')
    span = min(far.width, round(far.height * win_w / (win_h * FAR_HEIGHT)))
    fl = (far.width - span) // 2
    far = far.crop((fl, 0, fl + span, far.height))
    scale = win_w / far.width
    far = far.resize((win_w, round(far.height * scale)), Image.LANCZOS)
    haze = Image.new('RGBA', far.size, (horizon[0], horizon[1], horizon[2], 255))
    far_rgb = Image.blend(far, haze, HAZE)
    far_rgb.putalpha(far.getchannel('A'))
    far_rgb = far_rgb.filter(ImageFilter.GaussianBlur(0.6))
    window.alpha_composite(far_rgb, (0, win_h - far.height + round(win_h * 0.06)))

    # 3. panorama: 85% szerokości, dolna krawędź gruntu na dole okna
    pano = Image.open(LANDMARKS / f"{card['id']}.png").convert('RGBA')
    bbox = alpha_bbox(pano)
    scale = win_w * PANO_WIDTH / pano.width
    pw, ph = round(pano.width * scale), round(pano.height * scale)
    if ph * (bbox[3] - bbox[1]) / pano.height > win_h * 0.9:  # bardzo wysokie panoramy
        scale = win_h * 0.9 / (bbox[3] - bbox[1])
        pw, ph = round(pano.width * scale), round(pano.height * scale)
    small = pano.resize((pw, ph), Image.LANCZOS)
    px = (win_w - pw) // 2
    py = win_h - round(bbox[3] * scale)
    # pas gruntu przedłużony do boków okna, żeby panorama nie wisiała w powietrzu
    window.alpha_composite(small, (px, py))
    extend_ground(window, small, px, py, alpha_bbox(small))

    # 4. ramka: krem, okno z granatowym konturem, zaokrąglone narożniki
    card_img = Image.new('RGBA', (W, H), CREAM)
    # delikatny cień wewnętrzny ramki (papier)
    ImageDraw.Draw(card_img).rounded_rectangle((FRAME - 5, FRAME - 5, W - FRAME + 4, H - FRAME + 4),
                                               WIN_R + 4, outline=CREAM_DARK, width=2)
    card_img.paste(window, (FRAME, FRAME), rounded_mask((win_w, win_h), WIN_R))
    big = Image.new('RGBA', (W * SS, H * SS), (0, 0, 0, 0))
    bd = ImageDraw.Draw(big)
    bd.rounded_rectangle((FRAME * SS, FRAME * SS, (W - FRAME) * SS - 1, (H - FRAME) * SS - 1),
                         WIN_R * SS, outline=NAVY, width=3 * SS)
    bd.rounded_rectangle((SS, SS, W * SS - SS - 1, H * SS - SS - 1), (OUTER_R - 1) * SS, outline=NAVY, width=3 * SS)
    card_img.alpha_composite(big.resize((W, H), Image.LANCZOS))

    # 5. znaczek kraju, lekko przekrzywiony, z płaskim cieniem
    sp = stamp_path(cc)
    stamp = Image.open(sp).convert('RGBA') if sp else fallback_stamp(cc)
    stamp = stamp.resize((STAMP_SIZE, STAMP_SIZE), Image.LANCZOS).rotate(STAMP_TILT, Image.BICUBIC, expand=True)
    sx = W - STAMP_RIGHT - stamp.width
    sy = H - STAMP_BOTTOM - stamp.height
    shadow = Image.new('RGBA', stamp.size, (0x1d, 0x2f, 0x3b, 0))
    shadow.putalpha(stamp.getchannel('A').point(lambda v: v * 70 // 255))
    card_img.alpha_composite(shadow, (sx + 2, sy + 3))
    card_img.alpha_composite(stamp, (sx, sy))

    card_img.putalpha(ImageChops.multiply(card_img.getchannel('A'), rounded_mask((W, H), OUTER_R)))
    return card_img


def quantized_png(img: Image.Image) -> bytes:
    """PNG z paletą (jak pngquant): 240 kolorów median cut z ditheringiem dla obrazu,
    plus 16 wpisów granatowego konturu z różną alfą na wygładzone narożniki."""
    rgba = img.convert('RGBA')
    alpha = rgba.getchannel('A')
    if alpha.getextrema()[0] == 255:
        q = rgba.convert('RGB').quantize(colors=256, method=Image.Quantize.MEDIANCUT,
                                          dither=Image.Dither.FLOYDSTEINBERG)
        buf = io.BytesIO()
        q.save(buf, 'PNG', optimize=True)
        return buf.getvalue()
    base = Image.new('RGB', rgba.size, CREAM[:3])
    base.paste(rgba.convert('RGB'), (0, 0), alpha.point(lambda v: 255 if v == 255 else 0))
    q = base.quantize(colors=239, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.FLOYDSTEINBERG)
    palette = q.getpalette()[:239 * 3]
    palette += [0, 0, 0] * (239 - len(palette) // 3)
    trns = [255] * 239
    # indeks 239: pełna przezroczystość; 240..255: kontur z alfą 16..255
    palette += [0, 0, 0]
    trns.append(0)
    for level in range(16):
        palette += list(NAVY[:3])
        trns.append(min(255, (level + 1) * 16))
    q.putpalette(palette)
    idx = q.load()
    a = alpha.load()
    for y in range(rgba.height):
        for x in range(rgba.width):
            v = a[x, y]
            if v == 255:
                continue
            idx[x, y] = 239 if v < 8 else 240 + min(15, v // 16)
    buf = io.BytesIO()
    q.save(buf, 'PNG', optimize=True, transparency=bytes(trns))
    return buf.getvalue()


def sources(card: dict) -> dict[str, Path]:
    cc = card['country'].lower()
    src = {
        'panorama': LANDMARKS / f"{card['id']}.png",
        'sky': country_layer(cc, 'sky'),
        'far': country_layer(cc, 'far'),
    }
    sp = stamp_path(cc)
    if sp:
        src['stamp'] = sp
    return src


def build_preview(catalog: list[dict], generated: set[str]) -> bytes:
    cards = [c for c in catalog if (POSTCARDS / f"{c['id']}.png").exists()]
    cols, tw, th, pad, label = 8, 225, 150, 14, 22
    rows = math.ceil(len(cards) / cols)
    head = 56
    sheet = Image.new('RGBA', (pad + cols * (tw + pad), head + rows * (th + label + pad) + pad), (0xf2, 0xea, 0xd6, 255))
    d = ImageDraw.Draw(sheet)
    try:
        font = ImageFont.truetype('DejaVuSans.ttf', 13)
        title = ImageFont.truetype('DejaVuSans-Bold.ttf', 20)
    except OSError:
        font = title = ImageFont.load_default()
    d.text((pad, 16), f'Pocztówki: {len(generated & {c["id"] for c in cards})} z panoram (●), '
           f'{len(cards) - len(generated & {c["id"] for c in cards})} z zlecenia 54, '
           f'katalog: {len(catalog)} miast', font=title, fill=NAVY)
    for i, c in enumerate(cards):
        x = pad + (i % cols) * (tw + pad)
        y = head + (i // cols) * (th + label + pad)
        im = Image.open(POSTCARDS / f"{c['id']}.png").convert('RGBA').resize((tw, th), Image.LANCZOS)
        sheet.alpha_composite(im, (x, y))
        mark = '● ' if c['id'] in generated else ''
        d.text((x + 2, y + th + 4), f"{mark}{c['name']} ({c['country']})", font=font, fill=NAVY)
    return quantized_png(sheet)


def update_assets_md(catalog: list[dict], entries: dict) -> None:
    """Odśwież w ASSETS.md tabelę pocztówek generowanych (między znacznikami) i usuń
    z ręcznej tabeli zlecenia 54 wiersze plików, które zostały zastąpione."""
    by_id = {c['id']: c for c in catalog}
    rows = []
    for cid in sorted(entries, key=lambda i: (by_id.get(i, {}).get('name', i).lower(), i)):
        card = by_id.get(cid, {'name': cid, 'country': entries[cid].get('country', '')})
        cc = card['country'].lower()
        stamp = f'`stamp-{cc}.png`' if stamp_path(cc) else 'znaczek zastępczy rysowany w skrypcie'
        sky = country_layer(cc, 'sky').relative_to(COUNTRIES).as_posix()
        far = country_layer(cc, 'far').relative_to(COUNTRIES).as_posix()
        rows.append(f"| `{cid}.png` | `tools/art/postcards_from_panoramas.py` (styl {entries[cid]['style']}) "
                    f"| Własna grafika projektu (pochodna zasobów projektu) "
                    f"| {card['name']} ({card['country']}); panorama `landmarks/{cid}.png`, "
                    f"tło `countries/{sky}`, `countries/{far}`, {stamp}. |")
    block = '\n'.join([
        MARK_START,
        '## Pocztówki generowane z panoram',
        '',
        'Złożone automatycznie (`npm run art:postcards`) wyłącznie z zasobów projektu: panoramy miasta, '
        'warstw nieba i dalekich wzgórz kraju oraz znaczka kraju. Licencja: własna grafika projektu '
        'Cebulak Express, jak zasoby źródłowe. Tabela jest odświeżana przez skrypt — nie edytuj jej ręcznie. '
        'Skróty źródeł: `generated.json`.',
        '',
        '| plik | źródło/narzędzie | licencja | autor/uwagi |',
        '| --- | --- | --- | --- |',
        *rows,
        MARK_END,
    ])
    text = ASSETS_MD.read_text() if ASSETS_MD.exists() else '# Pocztówki miast\n'
    if MARK_START in text and MARK_END in text:
        head, rest = text.split(MARK_START, 1)
        tail = rest.split(MARK_END, 1)[1]
    else:
        head, tail = text.rstrip('\n') + '\n\n', '\n'
    # wiersze ręcznych pocztówek zastąpionych przez generowane znikają z pozostałych tabel
    replaced = {f'| `{cid}.png` |' for cid in entries}
    def prune(part: str) -> str:
        return '\n'.join(l for l in part.split('\n') if not any(l.startswith(r) for r in replaced))
    ASSETS_MD.write_text(prune(head) + block + prune(tail))


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.split('\n\n')[0])
    ap.add_argument('--only', help='lista identyfikatorów miast oddzielona przecinkami')
    ap.add_argument('--dry-run', action='store_true')
    ap.add_argument('--force', action='store_true')
    args = ap.parse_args()

    catalog = load_catalog()
    by_id = {c['id']: c for c in catalog}
    only = [s.strip() for s in args.only.split(',') if s.strip()] if args.only else None
    if only:
        unknown = [i for i in only if i not in by_id]
        if unknown:
            print('Nieznane miasta: ' + ', '.join(unknown), file=sys.stderr)
            return 2

    manifest = json.loads(MANIFEST.read_text()) if MANIFEST.exists() else {}
    entries: dict = manifest.get('postcards', {})
    built, skipped, missing = [], [], []
    for card in catalog:
        cid = card['id']
        if only and cid not in only:
            continue
        if not (LANDMARKS / f'{cid}.png').exists():
            missing.append(cid)
            continue
        src = sources(card)
        hashes = {k: sha256(p) for k, p in src.items()}
        out = POSTCARDS / f'{cid}.png'
        prev = entries.get(cid)
        fresh = (prev and prev.get('style') == STYLE_VERSION and prev.get('sources') == hashes
                 and out.exists() and sha256(out) == prev.get('output'))
        if fresh and not args.force:
            skipped.append(cid)
            continue
        built.append(cid)
        if args.dry_run:
            print(f'[plan] {cid}: ' + ('nowa' if not prev else 'zmienione źródła/styl' if not args.force else 'wymuszona'))
            continue
        data = quantized_png(compose(card))
        out.write_bytes(data)
        entries[cid] = {
            'country': card['country'],
            'style': STYLE_VERSION,
            'sources': hashes,
            'output': hashlib.sha256(data).hexdigest(),
        }
        print(f'{cid}: {len(data) // 1024} kB')

    print(f'Zbudowane: {len(built)}, aktualne: {len(skipped)}, bez panoramy: {len(missing)}'
          + (' (próba na sucho)' if args.dry_run else ''))
    if args.dry_run:
        return 0
    if built or args.force or not PREVIEW.exists():
        manifest = {
            'comment': 'Generowane przez tools/art/postcards_from_panoramas.py (npm run art:postcards). Nie edytuj ręcznie.',
            'styleVersion': STYLE_VERSION,
            'postcards': dict(sorted(entries.items())),
        }
        MANIFEST.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + '\n')
        PREVIEW.parent.mkdir(parents=True, exist_ok=True)
        PREVIEW.write_bytes(build_preview(catalog, set(entries)))
        update_assets_md(catalog, entries)
        print(f'Podgląd: {PREVIEW.relative_to(ROOT)}')
    return 0


if __name__ == '__main__':
    sys.exit(main())
