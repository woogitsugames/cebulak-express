#!/usr/bin/env python3
"""Zlecenie 31: deterministyczne wektorowe przeszkody -> PNG @3x.

Wymaga tylko CairoSVG i Pillow w srodowisku autora (bez zaleznosci npm).
Uruchamiaj z dowolnego katalogu: python public/assets/obstacles/generate-assets.py
"""
from __future__ import annotations

import io
import json
from pathlib import Path
from xml.sax.saxutils import escape

import cairosvg
from PIL import Image, ImageDraw, ImageFont, ImageCms

ROOT = Path(__file__).resolve().parents[3]
DIR = ROOT / 'public' / 'assets' / 'obstacles'
PREVIEW = ROOT / 'docs' / 'art' / 'podglady' / 'obstacles-preview.png'

NAVY = '#283548'
DARK = '#32445b'
INK = '#344254'
CREAM = '#f7e6c7'
PAPER = '#fff2dc'
SHADOW = '#b8aa94'
CONCRETE = '#d5c8ad'
CONCRETE_HI = '#f4e7ca'
CONCRETE_LO = '#ae9f89'
STEEL = '#7e9aa4'
STEEL_HI = '#bed0ce'
STEEL_LO = '#496a79'
RED = '#e75b50'
RED_DARK = '#bc433f'
WHITE = '#fff6e7'
YELLOW = '#f6b941'
YELLOW_L = '#ffe18a'
YELLOW_D = '#d88c34'
GREEN = '#389878'
GREEN_L = '#67b58c'
BLUE = '#91cada'
ORANGE = '#e9933d'


def rect(x, y, w, h, fill, stroke='none', sw=0, rx=0, attrs=''):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}" {attrs}/>'


def path(d, fill='none', stroke=NAVY, sw=5.5, attrs=''):
    return f'<path d="{d}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}" stroke-linejoin="round" stroke-linecap="round" {attrs}/>'


def poly(points, fill, stroke=NAVY, sw=5.5, attrs=''):
    return f'<polygon points="{points}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}" stroke-linejoin="round" {attrs}/>'


def line(x1, y1, x2, y2, color=NAVY, sw=5.5, attrs=''):
    return f'<path d="M{x1} {y1} L{x2} {y2}" fill="none" stroke="{color}" stroke-width="{sw}" stroke-linecap="round" {attrs}/>'


def ellipse(cx, cy, rx, ry, fill, stroke=NAVY, sw=5.5):
    return f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"/>'


def circle(cx, cy, r, fill, stroke=NAVY, sw=5.5):
    return f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"/>'


def wrap(w, h, s):
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">{s}</svg>'


def base_rect(color, light=None, low=None):
    # Bez przerw w pasie x=[24,216), rowniez na pionowym styku kafelkow.
    s = rect(24, 0, 192, 96, color)
    if light:
        s += rect(31, 0, 15, 96, light)
    if low:
        s += rect(202, 0, 12, 96, low)
    s += rect(22, 0, 6, 96, NAVY) + rect(212, 0, 6, 96, NAVY)
    return s


def tile_viaduct():
    s = base_rect(CONCRETE, CONCRETE_HI, CONCRETE_LO)
    s += rect(48, 0, 7, 96, '#ccb995')
    s += rect(104, 0, 6, 96, CONCRETE_LO)
    s += rect(160, 0, 6, 96, CONCRETE_LO)
    s += rect(34, 3, 7, 90, PAPER, attrs='opacity="0.70"')
    s += rect(55, 23, 160, 5, SHADOW)
    s += rect(55, 72, 160, 4, SHADOW)
    for x in (70, 126, 181):
        s += rect(x-9, 37, 18, 20, '#eee0c2', NAVY, 2.7, 3)
        s += circle(x, 46, 2.4, STEEL_LO, 'none', 0)
    return s


def tile_sign():
    s = base_rect(STEEL_LO, STEEL_HI, DARK)
    s += rect(62, 0, 116, 96, '#648591')
    for x in (54, 184):
        s += rect(x-7, 0, 8, 96, STEEL_HI, NAVY, 3)
    s += line(62, 0, 178, 96, NAVY, 12) + line(178, 0, 62, 96, NAVY, 12)
    s += line(62, 0, 178, 96, STEEL_HI, 5) + line(178, 0, 62, 96, STEEL_HI, 5)
    s += rect(62, 45, 116, 7, NAVY) + rect(62, 46, 116, 3, STEEL_HI)
    for x in (72, 168):
        s += circle(x, 17, 4, YELLOW_L, NAVY, 2)
        s += circle(x, 79, 4, YELLOW_L, NAVY, 2)
    return s


def tile_crane():
    s = base_rect(YELLOW_D, YELLOW_L, '#bb7e34')
    s += rect(53, 0, 134, 96, YELLOW)
    s += line(61, 0, 178, 96, NAVY, 12) + line(179, 0, 61, 96, NAVY, 12)
    s += line(61, 0, 178, 96, YELLOW_L, 6) + line(179, 0, 61, 96, YELLOW_L, 6)
    s += rect(49, 44, 141, 8, NAVY) + rect(49, 45, 141, 3, YELLOW_L)
    s += rect(48, 0, 8, 96, NAVY) + rect(184, 0, 8, 96, NAVY)
    s += rect(39, 0, 5, 96, PAPER, attrs='opacity="0.6"')
    return s


def tile_roadworks():
    s = base_rect(CONCRETE, CONCRETE_HI, CONCRETE_LO)
    s += rect(24, 44, 192, 7, NAVY)
    s += rect(29, 52, 184, 3, '#f1e4c8')
    for x in (76, 139, 188):
        s += rect(x-3, 2, 6, 41, SHADOW)
    for x in (55, 112, 168):
        s += rect(x-3, 52, 6, 41, SHADOW)
    s += rect(33, 8, 170, 5, PAPER, attrs='opacity="0.44"')
    s += rect(33, 61, 170, 4, PAPER, attrs='opacity="0.35"')
    return s


def tile_barrier():
    s = base_rect('#b9a98f', CONCRETE_HI, '#8b8375')
    s += rect(59, 0, 124, 96, '#d8c7a4')
    s += rect(62, 0, 9, 96, '#f2e6c9')
    s += rect(180, 0, 9, 96, NAVY)
    s += rect(88, 0, 6, 96, '#ab9980')
    s += rect(145, 0, 6, 96, '#ab9980')
    s += rect(74, 36, 94, 24, '#afc7c2', NAVY, 4, 3)
    s += line(83, 43, 157, 43, '#eef5df', 3)
    s += circle(47, 22, 4, YELLOW_L, NAVY, 2)
    s += circle(194, 75, 4, YELLOW_L, NAVY, 2)
    return s


def tile_truck():
    s = base_rect('#bfc8c2', '#eff0d9', '#8b9b9c')
    s += rect(35, 0, 172, 96, '#d8d8c6')
    s += rect(35, 14, 172, 8, WHITE)
    s += rect(39, 29, 168, 4, '#a5b5af')
    s += rect(39, 76, 168, 5, RED_DARK)
    for x in (59, 106, 153, 199):
        s += rect(x, 24, 4, 52, STEEL_LO)
        s += rect(x+5, 37, 2, 25, WHITE)
    s += rect(34, 82, 174, 8, NAVY)
    return s

TILES = {'viaduct':tile_viaduct, 'sign':tile_sign, 'crane':tile_crane, 'roadworks':tile_roadworks, 'barrier':tile_barrier, 'truck':tile_truck}


def arrows():
    # Strzalki geometryczne bez napisow.
    s = line(89, 150, 89, 118, WHITE, 8)
    s += poly('71,127 89,107 107,127', WHITE, WHITE, 1)
    s += path('M145 152 L145 139 Q145 120 166 120 L182 120', 'none', WHITE, 8)
    s += poly('172,108 190,120 172,133', WHITE, WHITE, 1)
    return s


def hazard_stripes(y, x=27, width=186, red=RED):
    s = rect(x, y, width, 20, WHITE)
    for i in range(-1, 8):
        sx = x + i*30
        s += poly(f'{sx},{y+20} {sx+13},{y} {sx+28},{y} {sx+15},{y+20}', red, 'none', 0)
    s += rect(x, y, width, 20, 'none', NAVY, 4, 2)
    return s


def end_viaduct():
    s = rect(16, 103, 208, 62, '#b6a78e', NAVY, 6, 10)
    s += rect(21, 110, 199, 13, CONCRETE_HI, 'none', 0, 5)
    s += rect(29, 128, 182, 23, CONCRETE, NAVY, 4, 4)
    for x in (50, 87, 125, 162, 200):
        s += rect(x-5, 133, 11, 12, '#ecddbd', SHADOW, 2, 2)
    s += path('M16 154 L224 154 L216 177 L24 177 Z', '#a99b86', NAVY, 5)
    s += hazard_stripes(170,25,190)
    s += rect(24, 190, 192, 2, NAVY)
    for x in (47, 120, 193):
        s += circle(x, 140, 3, NAVY, 'none', 0)
    return s


def end_sign():
    s = rect(27, 77, 186, 101, WHITE, NAVY, 6, 13)
    s += rect(35, 85, 170, 84, GREEN, NAVY, 3, 8)
    s += path('M44 96 L195 96', 'none', GREEN_L, 7)
    s += path('M45 161 L193 161', 'none', '#277b68', 5)
    s += arrows()
    for x in (47, 192):
        s += rect(x-7, 62, 14, 14, STEEL_HI, NAVY, 3, 3)
        s += circle(x, 72, 3, YELLOW_L, NAVY, 1.5)
    s += rect(42, 174, 156, 13, STEEL, NAVY, 4, 3)
    s += line(68, 181, 172, 181, STEEL_HI, 3)
    return s


def end_crane():
    s = rect(25, 77, 190, 50, YELLOW_D, NAVY, 6, 5)
    s += rect(29, 83, 182, 12, YELLOW_L)
    for x in range(32, 209, 37):
        s += poly(f'{x},99 {x+32},99 {x+16},121', '#efae39', NAVY, 3)
    s += rect(25, 123, 190, 11, NAVY)
    s += rect(36, 125, 169, 4, YELLOW_L)
    s += line(84, 131, 84, 154, STEEL_LO, 4)
    s += line(168, 131, 168, 154, STEEL_LO, 4)
    s += rect(70, 142, 116, 39, CONCRETE, NAVY, 5, 5)
    s += path('M72 149 L181 149 L174 155 L78 155 Z', CONCRETE_HI, 'none', 0)
    s += line(85, 151, 85, 174, STEEL_LO, 4)
    s += line(169, 151, 169, 174, STEEL_LO, 4)
    s += rect(54, 182, 145, 10, YELLOW_D, NAVY, 4, 3)
    s += rect(83, 183, 83, 3, YELLOW_L)
    return s


def cone(x, y, scale=1):
    # Pylony drogowe o puchatych proporcjach, rysowane w jednostkach oryginalnego SVG.
    s = f'<g transform="translate({x},{y}) scale({scale})">'
    s += poly('-18,44 -2,2 9,2 22,44', ORANGE, NAVY, 5)
    s += poly('-11,23 15,23 20,35 -15,35', WHITE, 'none', 0)
    s += poly('-5,9 7,9 12,19 -10,19', WHITE, 'none', 0)
    s += rect(-25, 42, 54, 9, STEEL_LO, NAVY, 4, 3)
    return s+'</g>'


def roadwork_board(y, variant=False):
    red = RED_DARK if variant else RED
    s = rect(20, y, 200, 47, WHITE, NAVY, 6, 7)
    # Pasy skosne polskie biało-czerwone; wariant PL ma mocniejszy kontrast.
    for i in range(-1,8):
        x=23+i*31
        s += poly(f'{x},{y+47} {x+24},{y} {x+40},{y} {x+16},{y+47}', red, 'none', 0)
    s += rect(20, y, 200, 47, 'none', NAVY, 6, 7)
    s += rect(29, y+5, 177, 4, '#fffbea', attrs='opacity="0.7"')
    return s


def end_roadworks(variant=False):
    s = rect(23, 2, 194, 137, CONCRETE, NAVY, 4, 4)
    s += rect(28, 4, 182, 7, PAPER)
    s += roadwork_board(28, variant)
    for x in (45, 121, 194):
        s += rect(x-4, 9, 8, 23, STEEL_LO, NAVY, 3)
        s += circle(x, 11, 9, ORANGE, NAVY, 4)
        s += circle(x-2, 9, 3.4, YELLOW_L, 'none', 0)
        s += ellipse(x, 26, 11, 2.6, '#fbd58d', 'none', 0)
    s += cone(69, 74, .92) + cone(160, 78, .88)
    s += rect(22, 132, 195, 17, '#b6aa92', NAVY, 4, 3)
    s += rect(33, 146, 170, 14, CONCRETE_HI, NAVY, 4, 3)
    s += rect(48, 166, 142, 15, CONCRETE, NAVY, 4, 3)
    return s


def end_barrier():
    s = rect(24, 12, 192, 145, CONCRETE, NAVY, 5, 3)
    s += rect(30, 20, 132, 21, RED, NAVY, 5, 7)
    s += rect(38, 20, 110, 5, '#ffa78b')
    s += rect(35, 45, 116, 100, '#f3dfba', NAVY, 5, 7)
    s += rect(49, 53, 91, 52, '#91cada', NAVY, 4, 5)
    s += poly('53,59 83,59 62,84', '#b4e4dd', 'none', 0)
    s += rect(93, 52, 5, 95, NAVY)
    s += rect(52, 115, 40, 28, '#c0b197', NAVY, 3, 4)
    s += rect(104, 114, 28, 29, '#c0b197', NAVY, 3, 4)
    s += rect(147, 73, 31, 82, RED_DARK, NAVY, 5, 7)
    s += rect(151, 79, 20, 15, YELLOW_L, NAVY, 2, 3)
    s += rect(57, 27, 164, 19, WHITE, NAVY, 5, 5)
    for x in (62, 106, 150, 193):
        s += poly(f'{x},45 {x+15},27 {x+28},27 {x+13},45', RED, 'none', 0)
    s += rect(57, 27, 164, 19, 'none', NAVY, 4, 5)
    s += circle(164, 92, 5, ORANGE, NAVY, 2)
    s += rect(25, 154, 190, 12, STEEL_LO, NAVY, 4, 4)
    return s


def tiny_car(x,y,color,scale=1):
    s = f'<g transform="translate({x},{y}) scale({scale})">'
    s += path('M3 29 Q8 23 18 22 L28 10 Q32 7 41 7 L73 7 Q81 7 86 14 L98 22 L104 27 L104 40 L2 40 Z', color, NAVY, 4.5)
    s += poly('30,12 47,12 47,25 18,25', '#a3dae0', NAVY, 2.7)
    s += poly('52,12 73,12 84,25 52,25', '#a3dae0', NAVY, 2.7)
    s += path('M21 16 L36 13', 'none', PAPER, 2.3)
    s += rect(8, 30, 6, 7, YELLOW_L, NAVY, 2, 2)
    s += rect(96, 30, 5, 7, RED_DARK, NAVY, 2, 2)
    for wx in (25,80):
        s += circle(wx, 40, 11, NAVY, NAVY, 1.8)
        s += circle(wx, 40, 6.6, STEEL_HI, NAVY, 2)
        s += circle(wx, 40, 2.5, PAPER, 'none', 0)
    s += '</g>'
    return s


def end_truck():
    s = rect(24, 0, 192, 169, '#c4cbc3', NAVY, 6, 4)
    s += rect(32, 4, 175, 26, '#e7ebdf', 'none')
    s += tiny_car(32, 25, RED, .82)
    s += tiny_car(123, 24, '#63a7b2', .79)
    s += rect(28, 64, 183, 13, STEEL_LO, NAVY, 4, 3)
    s += rect(30, 67, 179, 4, STEEL_HI)
    s += rect(43, 80, 12, 74, STEEL_LO, NAVY, 3, 2)
    s += rect(177, 80, 12, 74, STEEL_LO, NAVY, 3, 2)
    s += rect(45, 96, 142, 49, PAPER, NAVY, 4, 5)
    s += rect(50, 103, 132, 7, '#f0e0c4')
    s += rect(50, 130, 132, 6, RED)
    s += path('M47 97 L69 144 L158 144 L181 97', 'none', STEEL_LO, 7)
    s += rect(29, 152, 181, 17, NAVY, NAVY, 3, 5)
    for x in (60,120,182):
        s += circle(x, 160, 9, NAVY, NAVY, 1)
        s += circle(x, 160, 4, STEEL_HI, 'none', 0)
    return s

ENDS = {'viaduct':end_viaduct, 'sign':end_sign, 'crane':end_crane, 'roadworks':end_roadworks, 'barrier':end_barrier, 'truck':end_truck}


def make_svg(name, kind='tile', variant=False):
    surface = TILES[name]()
    if kind == 'tile':
        return wrap(240, 96, surface)
    end = ENDS[name](variant) if name=='roadworks' else ENDS[name]()
    # Dwa pelne powtorzenia tego samego wzoru: identyczna faza na stykach.
    content = surface + f'<g transform="translate(0,96)">{surface}</g>' + end
    # Na kazdym obrazie miejsce kolizji pokrywa nieprzezroczysty bazowy wektor.
    return wrap(240, 192, content)


def export_png(svg_text, dest, profile):
    raw = cairosvg.svg2png(bytestring=svg_text.encode('utf-8'), output_width=240,
                            output_height=192 if '-end.' in dest.name else 96)
    im = Image.open(io.BytesIO(raw)).convert('RGBA')
    w,h=im.size
    assert w==240 and h==(192 if '-end.' in dest.name else 96), dest.name
    alpha=im.getchannel('A')
    assert alpha.crop((24,0,216,h)).getextrema()==(255,255), f'Otwarte niebo w {dest.name}'
    im.save(dest, 'PNG', optimize=True, compress_level=9, icc_profile=profile)
    if dest.stat().st_size >= 200_000:
        raise AssertionError(f'Plik >200 kB: {dest.name}')


def font(size, bold=False):
    sources = [
        '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf' if bold else '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',
        '/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf' if bold else '/usr/share/fonts/truetype/liberation2/LiberationSans-Regular.ttf',
    ]
    for p in sources:
        if Path(p).exists():
            return ImageFont.truetype(p,size)
    return ImageFont.load_default()


def preview():
    # Autorski pogladowy pejzaz DE w stylu SVG parallax (nie jest kopiowana grafika z branch 06).
    W,H=1488,1460
    im=Image.new('RGB',(W,H),'#e8f1f1')
    d=ImageDraw.Draw(im)
    d.text((42,21),'PRZESZKODY  /  PŁASKI WEKTOR',font=font(31,True),fill=NAVY)
    d.text((43,65),'3 pary × 3 wysokości  •  podgląd na tle w stylu DE  •  skala 60%',font=font(17),fill=STEEL_LO)
    pairs=[('viaduct','roadworks','WIADUKT + ROBOTY'),('sign','barrier','ZNAK + BRAMKI'),('crane','truck','DŹWIG + LAWETA')]
    for row in range(3):
        for col,(top,bottom,title) in enumerate(pairs):
            x=36+col*484
            y=105+row*446
            cw,ch=456,427
            d.rounded_rectangle((x,y,x+cw,y+ch),radius=14,fill='#e7f2f1',outline='#8aabb1',width=2)
            sx,sy=x+12,y+43
            scene_w,scene_h=cw-24,358
            d.rectangle((sx,sy,sx+scene_w,sy+scene_h),fill='#b7dfe9')
            d.ellipse((sx+19,sy+15,sx+77,sy+73),fill='#fff1b9')
            d.polygon([(sx,sy+212),(sx+80,sy+170),(sx+190,sy+198),(sx+300,sy+164),(sx+scene_w,sy+203),(sx+scene_w,sy+scene_h),(sx,sy+scene_h)],fill='#8fb684')
            d.rectangle((sx,sy+278,sx+scene_w,sy+scene_h),fill='#87a69f')
            for tx in range(35,scene_w,83):
                trunk=sx+tx
                d.rectangle((trunk-3,sy+192,trunk+3,sy+243),fill='#947f60')
                d.ellipse((trunk-23,sy+161,trunk+22,sy+209),fill='#4d9a6e',outline=NAVY,width=3)
                d.ellipse((trunk-16,sy+166,trunk+3,sy+183),fill='#88c58a')
            d.line((sx,sy+277,sx+scene_w,sy+277),fill=NAVY,width=6)
            d.line((sx,sy+331,sx+scene_w,sy+331),fill=STEEL_LO,width=6)
            # 3 fazy wysokości: najwyższa kolumna pokazuje najwięcej segmentów.
            factor=.60
            anchor_x=sx+scene_w//2-72
            gap_top=sy+158+row*12
            gap_bottom=gap_top+100
            h_end=int(192*factor)
            h_tile=int(96*factor)
            top_end=Image.open(DIR/f'{top}-end.png').convert('RGBA').resize((144,h_end),Image.Resampling.LANCZOS)
            bottom_end=Image.open(DIR/f'{bottom}-end.png').convert('RGBA').resize((144,h_end),Image.Resampling.LANCZOS)
            t_tile=Image.open(DIR/f'{top}-tile.png').convert('RGBA').resize((144,h_tile),Image.Resampling.LANCZOS)
            b_tile=Image.open(DIR/f'{bottom}-tile.png').convert('RGBA').resize((144,h_tile),Image.Resampling.LANCZOS)
            # Rysujemy na warstwie przycietej do kadru, aby kafle nie wychodzily na naglowki.
            overlay=Image.new('RGBA',(scene_w,scene_h),(0,0,0,0))
            def paste_clipped(sprite, px, py):
                px-=sx
                py-=sy
                bounds=(max(0,px),max(0,py),min(scene_w,px+sprite.width),min(scene_h,py+sprite.height))
                if bounds[2]<=bounds[0] or bounds[3]<=bounds[1]:
                    return
                crop=sprite.crop((bounds[0]-px,bounds[1]-py,bounds[2]-px,bounds[3]-py))
                overlay.paste(crop,bounds[:2],crop)
            for i in range(8):
                ty=gap_top-h_end-h_tile*(i+1)
                by=gap_bottom+h_end+h_tile*i
                paste_clipped(t_tile,anchor_x,ty)
                paste_clipped(b_tile,anchor_x,by)
            paste_clipped(top_end,anchor_x,gap_top-h_end)
            paste_clipped(bottom_end,anchor_x,gap_bottom)
            im.paste(overlay,(sx,sy),overlay)
            # Przyblizona miniatura beżowo-czerwonego kombi dla oceny skali.
            hcx=sx+53+row*3
            hcy=gap_top+26
            d=ImageDraw.Draw(im)
            d.rounded_rectangle((hcx,hcy+5,hcx+80,hcy+26),radius=7,fill='#da6753',outline=NAVY,width=3)
            d.polygon([(hcx+12,hcy+7),(hcx+25,hcy-5),(hcx+59,hcy-5),(hcx+72,hcy+9)],fill=CREAM)
            d.polygon([(hcx+28,hcy-1),(hcx+54,hcy-1),(hcx+63,hcy+8),(hcx+22,hcy+8)],fill='#9ad0d9',outline=NAVY)
            for wx in (hcx+19,hcx+65):
                d.ellipse((wx-9,hcy+18,wx+9,hcy+36),fill=NAVY)
                d.ellipse((wx-5,hcy+23,wx+5,hcy+32),fill=STEEL_HI)
            d.rectangle((hcx+24,hcy-13,hcx+59,hcy-7),fill='#d39a59',outline=NAVY,width=2)
            d.text((x+17,y+11),title,font=font(16,True),fill=NAVY)
            d.text((x+340,y+14),f'WYS. {row+1}',font=font(12,True),fill=STEEL_LO)
            d=ImageDraw.Draw(im)
    PREVIEW.parent.mkdir(parents=True,exist_ok=True)
    # Wizualizacja ma znacznie wieksze wymiary od pojedynczego assetu.
    im.quantize(colors=96,method=Image.Quantize.MEDIANCUT).save(PREVIEW,'PNG',optimize=True)


def main():
    DIR.mkdir(parents=True,exist_ok=True)
    profile=ImageCms.ImageCmsProfile(ImageCms.createProfile('sRGB')).tobytes()
    for n in TILES:
        for kind in ('tile','end'):
            out=DIR/f'{n}-{kind}.png'
            export_png(make_svg(n,kind),out,profile)
            print(f'{out.relative_to(ROOT)}: {out.stat().st_size} B')
    out=DIR/'roadworks-pl-end.png'
    export_png(make_svg('roadworks','end',True),out,profile)
    print(f'{out.relative_to(ROOT)}: {out.stat().st_size} B')
    preview()
    print(f'{PREVIEW.relative_to(ROOT)}: {PREVIEW.stat().st_size} B')

if __name__=='__main__':
    main()
