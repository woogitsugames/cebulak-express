#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Składanie prawdziwego zrzutu gry z zimową ramką sklepową.

Użycie:
    python skladaj.py zrzut.png 3 wynik.png

Wymaga biblioteki Pillow (`python -m pip install Pillow`).

Zrzut jest skalowany PROPORCJONALNIE do 840 px szerokości
(bez rozciągania), wyrównywany do górnej krawędzi okna i, jeśli
jest wyższy niż 1380 px, przycinany WYŁĄCZNIE OD DOŁU.
Zbyt szerokie/proporcjonalnie zbyt niskie zrzuty są odrzucane,
zamiast wprowadzać obcięcie boków albo rozciąganie.

Skrypt nie tworzy, nie symuluje ani nie uzupełnia rozgrywki.
"""
from __future__ import annotations

import argparse
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageOps

CANVAS_SIZE = (1080, 1920)
WINDOW = (120, 470, 960, 1850)  # Współrzędne [x0,y0,x1,y1), w pikselach.
WINDOW_RADIUS = 55
ASSET_DIR = Path(__file__).resolve().parent


def prepare_screenshot(path: Path) -> Image.Image:
    """Dopasuj do szerokości okna bez zmiany proporcji i przytnij dół."""
    x0, y0, x1, y1 = WINDOW
    target_width = x1 - x0
    target_height = y1 - y0
    with Image.open(path) as source:
        image = ImageOps.exif_transpose(source)
        if not image.width or not image.height:
            raise ValueError('Nieprawidłowe wymiary pliku zrzutu.')
        if image.mode in ('RGBA', 'LA') or 'transparency' in image.info:
            # Przezroczysty PNG traktuj jako zrzut na neutralnym tle.
            overlay = image.convert('RGBA')
            base = Image.new('RGBA', image.size, (22, 50, 61, 255))
            base.alpha_composite(overlay)
            image = base.convert('RGB')
        else:
            image = image.convert('RGB')

        scaled_height = round(image.height * target_width / image.width)
        if scaled_height < target_height:
            raise ValueError(
                'Zrzut ma za małą wysokość względem szerokości. '
                f'Po przeskalowaniu do {target_width} px ma tylko '
                f'{scaled_height} px wysokości (wymagane {target_height} px). '
                'Użyj pionowego zrzutu o odpowiednich proporcjach; '
                'skrypt nie rozciąga obrazu ani nie ucina jego boków.'
            )
        scaled = image.resize((target_width, scaled_height), Image.Resampling.LANCZOS)
        return scaled.crop((0, 0, target_width, target_height))


def assemble(screenshot_path: Path, number: int, output_path: Path) -> None:
    if number not in range(1, 9):
        raise ValueError('Numer ramki musi być liczbą całkowitą od 1 do 8.')

    prefix = f'ramka-{number:02d}'
    required = {
        'tło': ASSET_DIR / f'{prefix}-tlo.png',
        'okno': ASSET_DIR / f'{prefix}-okno.png',
        'podpis': ASSET_DIR / f'{prefix}-podpis.png',
    }
    missing = [str(path) for path in required.values() if not path.is_file()]
    if missing:
        raise FileNotFoundError('Brak warstw ramki:\n' + '\n'.join(missing))

    screenshot = prepare_screenshot(screenshot_path)
    with Image.open(required['tło']) as source:
        if source.size != CANVAS_SIZE:
            raise ValueError('Tło ma niewłaściwe wymiary, wymagane 1080×1920 px.')
        canvas = source.convert('RGBA')

    x0, y0, x1, y1 = WINDOW
    # Zaokrąglenia są maską przycinającą JEDYNIE realny zrzut.
    clipping = Image.new('L', (x1-x0, y1-y0), 0)
    ImageDraw.Draw(clipping).rounded_rectangle(
        (0, 0, x1-x0-1, y1-y0-1), radius=WINDOW_RADIUS, fill=255
    )
    canvas.paste(screenshot, (x0, y0), clipping)

    with Image.open(required['okno']) as frame:
        if frame.size != CANVAS_SIZE or frame.mode != 'RGBA':
            raise ValueError('Ramka okna musi mieć format 1080×1920 RGBA.')
        canvas.alpha_composite(frame)

    with Image.open(required['podpis']) as title:
        if title.size != (CANVAS_SIZE[0], 420) or title.mode != 'RGBA':
            raise ValueError('Podpis musi mieć format 1080×420 RGBA.')
        canvas.alpha_composite(title, (0, 0))

    output_path.parent.mkdir(parents=True, exist_ok=True)
    result = canvas.convert('RGB')
    # Utrzymujemy 8-bitowe RGB; jeśli Pillow obsługuje ImageCms,
    # dołączamy profil sRGB, aby kolory były przewidywalne w sklepach.
    try:
        from PIL import ImageCms
        srgb = ImageCms.ImageCmsProfile(ImageCms.createProfile('sRGB')).tobytes()
        result.save(output_path, format='PNG', optimize=True, icc_profile=srgb)
    except ImportError:
        result.save(output_path, format='PNG', optimize=True)


def main() -> int:
    parser = argparse.ArgumentParser(description='Złóż prawdziwy zrzut z zimową ramką Google Play.')
    parser.add_argument('screenshot', type=Path, help='Wejściowy, rzeczywisty zrzut z gry (PNG).')
    parser.add_argument('frame', type=int, help='Numer ramki, od 1 do 8.')
    parser.add_argument('output', type=Path, help='Docelowy plik PNG RGB 1080×1920.')
    args = parser.parse_args()
    try:
        if args.screenshot.resolve() == args.output.resolve():
            raise ValueError('Plik wejściowy i wyjściowy nie mogą być tym samym plikiem.')
        assemble(args.screenshot, args.frame, args.output)
    except (OSError, ValueError) as exc:
        parser.exit(1, f'Błąd składania: {exc}\n')
    print(f'Zapisano: {args.output}')
    return 0


if __name__ == '__main__':
    sys.exit(main())
