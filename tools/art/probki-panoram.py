#!/usr/bin/env python3
"""Zlecenie 69: podglady trzech wariantow panoram na warstwach gry.

Uruchom z korzenia repo:
    python tools/art/probki-panoram.py
    python tools/art/probki-panoram.py --check --strict

Zaleznosc narzedziowa: Pillow (pip install Pillow). Nie zmienia runtime.
"""
from __future__ import annotations

import argparse
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[2]
DIR = ROOT / "docs" / "art" / "probki-panoram"
ASSETS = ROOT / "public" / "assets"
CITY = {"dusseldorf": "de", "amsterdam": "nl"}
STYLES = (
    ("A-rysunkowa", "A", "RYSUNKOWY"),
    ("B-stylizowana", "B", "STYLIZOWANY"),
    ("C-foto", "C", "FOTOREALISTYCZNY"),
)
PW, PH = 840, 710
GAP = 20
MARGIN = 26
HEADER = 96
FOOTER = 48
CANVAS = (MARGIN * 2 + PW * 3 + GAP * 2, HEADER + PH + FOOTER)
NAVY = (26, 53, 71, 255)


def font(size: int, bold: bool = False):
    names = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/liberation2/LiberationSans-Regular.ttf",
    ]
    for candidate in names:
        if Path(candidate).exists():
            return ImageFont.truetype(candidate, size)
    return ImageFont.load_default()


def rgba(path: Path) -> Image.Image:
    return Image.open(path).convert("RGBA")


def tile_layer(im: Image.Image, size: tuple[int, int], shift: int = 0):
    # Wzorzec kafelka o szerokosci dwukrotnie wiekszej od widoku.
    full = im.resize((size[0] * 2, size[1]), Image.Resampling.LANCZOS)
    x = min(max(shift, 0), size[0])
    return full.crop((x, 0, x + size[0], size[1]))


def draw_fallback(w: int, h: int, city: str) -> Image.Image:
    # Odwzorowanie palety i ukladu gry, gdy eksport jest uruchamiany bez repo.
    c = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    pix = c.load()
    for y in range(h):
        p = y / h
        r = int(104 + 71 * p)
        g = int(199 + 34 * p)
        b = int(246 - 20 * p)
        for x in range(w):
            pix[x, y] = (r, g, b, 255)
    d = ImageDraw.Draw(c)
    d.ellipse((64, 66, 139, 141), fill=(255, 223, 116), outline=(255, 241, 174), width=6)
    for x, y in [(280, 92), (525, 145), (712, 74)]:
        d.ellipse((x, y, x + 90, y + 30), fill=(250, 252, 249))
        d.ellipse((x + 30, y - 16, x + 100, y + 30), fill=(251, 253, 249))
    d.polygon([(0, 435), (140, 402), (340, 455), (490, 379), (680, 414), (w, 370), (w, h), (0, h)], fill=(178, 210, 143), outline=NAVY, width=5)
    d.polygon([(0, 500), (210, 455), (413, 485), (630, 441), (w, 478), (w, h), (0, h)], fill=(128, 176, 135), outline=NAVY, width=5)
    return c


def game_layer_scene(city: str, w: int, h: int, strict: bool) -> tuple[Image.Image, bool]:
    country = CITY[city]
    folder = ASSETS / "countries" / country
    paths = [folder / (country + "-" + s + ".png") for s in ["sky", "clouds", "far"]]
    available = all(path.is_file() for path in paths)
    if strict and not available:
        raise FileNotFoundError("Brak oryginalnych warstw kraju: " + str(folder))
    if not available:
        return draw_fallback(w, h, city), False
    scene = rgba(paths[0]).resize((w, int(1920 * w / 1080)), Image.Resampling.LANCZOS)
    # Wycinamy pionowy fragment nieba, zachowujac poziomy kadr gry.
    sky = scene.crop((0, 80, w, h + 80))
    cloud = tile_layer(rgba(paths[1]), (w, 240), shift=240)
    far = tile_layer(rgba(paths[2]), (w, 350), shift=410)
    sky.alpha_composite(cloud, (0, 38))
    sky.alpha_composite(far, (0, 240))
    return sky, True


def draw_front(scene: Image.Image, city: str, real: bool):
    w, h = scene.size
    country = CITY[city]
    folder = ASSETS / "countries" / country
    near = folder / (country + "-near.png")
    road = folder / (country + "-road.png")
    if real and near.is_file():
        scene.alpha_composite(tile_layer(rgba(near), (w, 300), shift=310), (0, 415))
    else:
        d = ImageDraw.Draw(scene)
        d.polygon([(0, 558), (230, 544), (430, 565), (645, 533), (w, 549), (w, h), (0, h)], fill=(135, 191, 116), outline=NAVY, width=6)
        for tx in range(48, w, 138):
            y = 520 + (tx % 3) * 9
            d.line((tx, y + 38, tx, y + 99), fill=(80, 104, 78), width=9)
            d.ellipse((tx - 37, y - 23, tx + 35, y + 46), fill=(113, 175, 113), outline=NAVY, width=5)
    if real and road.is_file():
        scene.alpha_composite(rgba(road).resize((w, 215), Image.Resampling.LANCZOS), (0, 562))
    else:
        d = ImageDraw.Draw(scene)
        d.rectangle((0, 581, w, h), fill=(77, 86, 91), outline=NAVY, width=6)
        d.line((0, 620, w, 620), fill=(255, 245, 220), width=7)
        for x in range(38, w, 185):
            d.line((x, 663, x + 100, 663), fill=(255, 252, 221), width=7)
        d.line((0, 582, w, 582), fill=(202, 217, 202), width=12)
        d.line((0, 593, w, 593), fill=NAVY, width=5)


def draw_car(scene: Image.Image):
    # Kompozycja jest zgodna z hero.json: wspolny sprite 288x168.
    folder = ASSETS / "hero"
    body = folder / "kombi-body.png"
    wheels = folder / "kombi-wheel.png"
    cargo = folder / "luggage-1.png"
    scale = 0.78
    car_x, car_y = 214, 518
    if body.is_file() and wheels.is_file():
        wheel = rgba(wheels).resize((round(36 * scale), round(36 * scale)), Image.Resampling.LANCZOS)
        for cx in (91, 207):
            scene.alpha_composite(wheel, (round(car_x + (cx - 18) * scale), round(car_y + (133 - 18) * scale)))
        scene.alpha_composite(rgba(body).resize((round(288 * scale), round(168 * scale)), Image.Resampling.LANCZOS), (car_x, car_y))
        if cargo.is_file():
            scene.alpha_composite(rgba(cargo).resize((round(288 * scale), round(168 * scale)), Image.Resampling.LANCZOS), (car_x, car_y))
    else:
        d = ImageDraw.Draw(scene)
        x, y = car_x, car_y + 55
        d.rounded_rectangle((x + 9, y + 8, x + 207, y + 72), radius=17, fill=(229, 82, 61), outline=NAVY, width=5)
        d.rounded_rectangle((x + 28, y - 15, x + 178, y + 30), radius=14, fill=(249, 231, 192), outline=NAVY, width=5)
        d.rectangle((x + 55, y + 35, x + 205, y + 42), fill=(253, 207, 173))
        for xx in (x + 49, x + 169):
            d.ellipse((xx - 16, y + 55, xx + 17, y + 88), fill=(43, 57, 65), outline=(225, 225, 215), width=6)
        for xx, bw in ((x + 45, 44), (x + 100, 38), (x + 148, 30)):
            d.rounded_rectangle((xx, y - 34, xx + bw, y - 15), radius=4, fill=(177, 115, 70), outline=NAVY, width=3)


def insert_landmark(scene: Image.Image, city: str, variant: str):
    im = rgba(DIR / (city + "-" + variant + ".png"))
    # 1620x900: pasuj do szerokiego kadru, nie zmieniaj proporcji.
    cw = 820
    ch = round(cw * im.height / im.width)
    im = im.resize((cw, ch), Image.Resampling.LANCZOS)
    scene.alpha_composite(im, ((PW - cw) // 2, 558 - ch))


def build(city: str, strict: bool):
    title = "D\u00dcSSELDORF" if city == "dusseldorf" else "AMSTERDAM"
    output = Image.new("RGBA", CANVAS, (236, 244, 246, 255))
    d = ImageDraw.Draw(output)
    d.text((MARGIN + 1, 25), title + " | POR\u00d3WNANIE STYL\u00d3W PANORAM", font=font(33, True), fill=NAVY)
    real_used = True
    for i, (variant, letter, label) in enumerate(STYLES):
        x = MARGIN + i * (PW + GAP)
        draw = ImageDraw.Draw(output)
        draw.rounded_rectangle((x - 2, HEADER - 4, x + PW + 2, HEADER + PH + 4), radius=10, fill=(255, 255, 255), outline=NAVY, width=3)
        scene, real = game_layer_scene(city, PW, PH, strict)
        real_used &= real
        insert_landmark(scene, city, variant)
        draw_front(scene, city, real)
        draw_car(scene)
        output.alpha_composite(scene, (x, HEADER))
        draw = ImageDraw.Draw(output)
        draw.rounded_rectangle((x + 12, HEADER + 12, x + PW - 12, HEADER + 72), radius=13, fill=(14, 42, 64, 236))
        draw.text((x + 31, HEADER + 25), f"{letter}  |  {label}", font=font(27, True), fill=(255, 255, 255))
    note = ("Oryginalne warstwy kraj\u00f3w oraz kombi z gry. Wizualizacja pogl\u0105dowa; nie zrzut z gry."
            if real_used else
            "T\u0142o zast\u0119pcze: uruchom skrypt w repo, aby u\u017cy\u0107 oryginalnych warstw gry.")
    ImageDraw.Draw(output).text((MARGIN, HEADER + PH + 18), note, fill=NAVY, font=font(21))
    target = DIR / (city + "-porownanie.png")
    output.convert("RGB").save(target, optimize=True)
    print("OK:", target, output.size, "oryginalne warstwy:", real_used)


def check():
    assert len(list(DIR.glob('*-[ABC]-*.png'))) == 6
    for city in CITY:
        for variant, _, _ in STYLES:
            p = DIR / (city + "-" + variant + ".png")
            with Image.open(p) as im:
                assert im.size == (1620, 900), (p, im.size)
                assert im.mode == "RGBA", (p, im.mode)
                alpha = im.getchannel("A")
                assert alpha.getextrema() == (0, 255), (p, alpha.getextrema())
                assert alpha.crop((0, 0, 1620, 10)).getextrema() == (0, 0), p
                assert alpha.crop((0, 890, 1620, 900)).getextrema()[1] > 0, p
    print("OK: 6 PNG 1620x900 RGBA, transparentne niebo, grunt na dole")


def main():
    parser = argparse.ArgumentParser(description="Porownania panoram DE/NL")
    parser.add_argument("--strict", action="store_true", help="Wymagaj oryginalnych warstw gry")
    parser.add_argument("--check", action="store_true", help="Waliduj PNG przed skladaniem")
    args = parser.parse_args()
    if args.check:
        check()
    for city in CITY:
        build(city, args.strict)


if __name__ == "__main__":
    main()
