#!/usr/bin/env python3
"""Autorskie, deterministyczne tła IE/FI/LU do Cebulak Express (@3x, CairoSVG/Pillow).

Uruchomienie: python3 public/assets/countries/ie/generate_northwest.py
Wymagania wyłącznie do tworzenia grafik: cairosvg, pillow (bez zależności npm).
"""
from __future__ import annotations
import io
from pathlib import Path
import cairosvg
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[4]
COUNTRIES = ROOT / 'public/assets/countries'
LANDMARKS = ROOT / 'public/assets/landmarks'
PREVIEWS = ROOT / 'docs/art/podglady'
INK = '#274354'
HI = '#fff1cb'
PALETTES = {
    'ie': {'sky':'#bee5df','sky2':'#ccebe1','sky3':'#d7efdf','top':'#99cc87', 'far':'#84c67c', 'mid':'#56a96c', 'near':'#3f956b', 'deep':'#31735e', 'water':'#6eb6ba', 'light':'#dce8ad', 'stone':'#c7bda7', 'road':'#465962'},
    'fi': {'sky':'#b8e6e4','sky2':'#ceede9','sky3':'#e3f2e7','top':'#a4d1bd', 'far':'#8eb9a5', 'mid':'#5c9c89', 'near':'#327c75', 'deep':'#2b656b', 'water':'#69b4ca', 'light':'#c5e4bf', 'stone':'#c6aa91', 'road':'#465962'},
    'lu': {'sky':'#c7e4e6','sky2':'#d6ebea','sky3':'#e8f1df','top':'#abd2a1', 'far':'#94c99d', 'mid':'#6da87b', 'near':'#458871', 'deep':'#34726e', 'water':'#6fb6c2', 'light':'#d4dfa5', 'stone':'#e1bf98', 'road':'#465962'},
}
WINTER = {
    'ie':{'sky':'#b5cedf','sky2':'#cedce8','sky3':'#e0e7ec','top':'#b6d2c7','far':'#a5c3ae','mid':'#8caf99','near':'#648e83','deep':'#547d7a','water':'#8dbfc8','light':'#f0f4ee','stone':'#c1bdb4','road':'#465962'},
    'fi':{'sky':'#243e62','sky2':'#35597b','sky3':'#6887a1','top':'#9bb5bd','far':'#84acb3','mid':'#5c8e95','near':'#3a6c78','deep':'#305866','water':'#9bc6d0','light':'#ecf4e7','stone':'#c9bba7','road':'#465962'},
    'lu':{'sky':'#c1d3e3','sky2':'#d7e1ea','sky3':'#e4ebef','top':'#c9d9ce','far':'#abc5b5','mid':'#8db09b','near':'#6c9386','deep':'#567d7e','water':'#95bbc8','light':'#f1f3e7','stone':'#d3c8b8','road':'#465962'},
}

def svg_start(w:int,h:int, body:str)->str:
    return f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 {w} {h}" width="{w*3}" height="{h*3}"><g stroke-linecap="round" stroke-linejoin="round">{body}</g></svg>'

def P(d,fill='none',stroke=INK,sw=2.1,extra=''):
    return f'<path d="{d}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}" {extra}/>'

def R(x,y,w,h,fill,stroke=INK,sw=2,rx=0,extra=''):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}" {extra}/>'

def C(x,y,r,fill,stroke=INK,sw=2,extra=''):
    return f'<circle cx="{x}" cy="{y}" r="{r}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}" {extra}/>'

def E(x,y,rx,ry,fill,stroke=INK,sw=2,extra=''):
    return f'<ellipse cx="{x}" cy="{y}" rx="{rx}" ry="{ry}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}" {extra}/>'

def line(x1,y1,x2,y2,color=INK,sw=2):
    return P(f'M{x1} {y1} L{x2} {y2}',stroke=color,sw=sw)

def poly(pts,fill,stroke=INK,sw=2):
    return P('M'+' L'.join(f'{x} {y}' for x,y in pts)+' Z', fill,stroke,sw)

def waves(y, width=720, n=11, color='#d5f4dd', stroke_width=2):
    # Krótkie, wydzielone kreski, bez ostrych krawędzi kafelka.
    s=''
    for i in range(n):
        x=26+i*(width-56)/(n-1)
        dy = ((i*7)%5)*3
        s+=line(round(x,1),y+dy,round(x+20,1),y+dy,color,stroke_width)
    return s

def cloud(x,y,scale=1):
    return (f'<g transform="translate({x} {y}) scale({scale})">'
            + E(0,8,44,17,'#fdf5e4',INK,2.1) + C(-27,-1,17,'#fff9e8',INK,2.1)
            + C(-3,-10,25,'#fff9e8',INK,2.1) + C(25,-2,19,'#fff9e8',INK,2.1)
            + P('M-42 9 Q0 13 40 9',stroke='#f2dcb9',sw=1.7) + '</g>')

def pine(x,y,h, winter=False, palette=None):
    p = palette or PALETTES['fi']
    w=h*.37
    s=R(x-3,y-h*.21,6,h*.23,'#927563',INK,1.7)
    s+=poly([(x,y-h),(x-w*.65,y-h*.43),(x+w*.65,y-h*.43)],p['deep'],INK,2)
    s+=poly([(x,y-h*.82),(x-w*.94,y-h*.20),(x+w*.94,y-h*.20)],p['near'],INK,2)
    s+=poly([(x,y-h*.55),(x-w,y-7),(x+w,y-7)],p['near'],INK,2)
    s+=poly([(x-w*.52,y-h*.36),(x,y-h*.5),(x+w*.5,y-h*.36)],p['mid'],'none',0)
    if winter:
        s+=P(f'M{x-w*.38} {y-h*.52} L{x} {y-h*.79} L{x+w*.38} {y-h*.52}',stroke='#eff7f2',sw=3)
        s+=P(f'M{x-w*.7} {y-h*.2} L{x} {y-h*.51} L{x+w*.7} {y-h*.2}',stroke='#e6f1ed',sw=3)
    return s

def tree(x,y,h,p, winter=False):
    s=R(x-3,y-h*.40,7,h*.4,'#987861',INK,1.8)
    s+=C(x,y-h*.59,h*.31,p['deep'],INK,2.3)
    s+=C(x-h*.14,y-h*.68,h*.28,p['near'],INK,2.3)
    s+=C(x+h*.13,y-h*.78,h*.31,p['mid'],INK,2.3)
    s+=P(f'M{x-h*.08} {y-h*.87} Q{x+h*.10} {y-h*1.05} {x+h*.25} {y-h*.83}',stroke=p['light'],sw=2)
    if winter:
        s+=P(f'M{x-h*.32} {y-h*.72} Q{x} {y-h*.93} {x+h*.41} {y-h*.84}',stroke='#eef4e9',sw=5)
    return s

def house(x,y,w,h,color,roof='#ce7659',door='#437c87',winter=False,windows=True):
    s=R(x,y-h,w,h,color,INK,2.2,1)
    s+=poly([(x-7,y-h),(x+w/2,y-h-h*.43),(x+w+7,y-h)],roof,INK,2.6)
    s+=P(f'M{x+5} {y-h+5} H{x+w-5}',stroke=HI,sw=2.1)
    if winter:
        s+=P(f'M{x-8} {y-h-2} L{x+w/2} {y-h-h*.43-2} L{x+w+7} {y-h-2}',stroke='#f4f5e9',sw=4.8)
    if windows:
        s+=R(x+w*.15,y-h*.74,w*.19,h*.32,'#8ebdc1',INK,1.5,3)
        s+=R(x+w*.68,y-h*.74,w*.17,h*.32,'#8ebdc1',INK,1.5,3)
    s+=R(x+w*.43,y-h*.37,w*.19,h*.37,door,INK,1.6,3)
    s+=C(x+w*.57,y-h*.17,1.2,HI,'none',0)
    return s

def sheep(x,y,sc=1,winter=False):
    s=f'<g transform="translate({x} {y}) scale({sc})">'
    for leg in (-13,9): s+=R(leg,1,4,13,'#665f5c',INK,1.5,0)
    s+=E(-1,-3,20,13,'#f6f5df',INK,2.2)
    s+=C(-14,-10,8,'#fff9e6',INK,1.5)+C(0,-15,9,'#fff9e6',INK,1.5)+C(12,-8,7,'#fff9e6',INK,1.5)
    s+=E(19,-1,8,9,'#667378',INK,1.7)+C(22,-3,1.5,INK,'none',0)
    s+=E(14,-9,4,2.7,'#7a8c8b',INK,1.2)
    return s+'</g>'

def small_boat(x,y,sc=1,color='#de8b6c'):
    return (f'<g transform="translate({x} {y}) scale({sc})">'
        +P('M-34 0 H38 L22 15 H-17 Z',color,INK,2.4)
        +R(-22,-12,41,12,'#ffeccc',INK,2,2)
        +R(-11,-17,12,7,'#a4d9db',INK,1.2,1)
        +line(6,-13,6,-29,INK,2)
        +P('M7 -28 Q29 -22 29 -15 H7 Z','#f4e6c0',INK,1.5)
        +'</g>')

def brick_wall(x,y,w,h,winter=False):
    s=R(x,y,w,h,'#bfb39b',INK,2.2,2)
    colors=['#d6c9b0','#ada68f','#c6b99e','#e3d4b6']
    for row in range(3):
        yy=y+6+row*(h-10)/3
        step=25
        offset=(row%2)*step/2
        for col in range(int((w+30)/step)):
            xx=x+col*step+offset+4
            if xx+step-7>x+w-4: continue
            s+=R(xx,yy,step-7,(h-13)/3,colors[(col+row)%len(colors)],'none',0,1)
        s+=line(x+3,yy+(h-12)/3,x+w-3,yy+(h-12)/3,'#9a9481',.8)
    if winter:s+=R(x-1,y-3,w+2,5,'#f0f4ed','none',0,2)
    return s

def sky(cc,winter=False):
    p=(WINTER if winter else PALETTES)[cc]
    s=R(0,0,360,640,p['sky'],'none',0)
    s+=R(0,250,360,245,p['sky2'],'none',0)+R(0,495,360,145,p['sky3'],'none',0)
    if cc=='fi' and winter:
        # Wektorowa zorza, bez fotograficznego gradientu.
        s+=P('M-35 160 Q 95 55 199 118 T397 60 L397 106 Q273 202 150 156 Q68 111 -35 221 Z','#63b6aa','none',0,extra='opacity="0.66"')
        s+=P('M-28 175 Q100 74 203 137 T397 78 L397 100 Q263 199 151 152 Q69 114 -28 208 Z','#a9dab0','none',0,extra='opacity="0.79"')
        s+=P('M-25 207 Q105 127 199 171 Q296 216 387 133',stroke='#e1e7b0',sw=5,extra='opacity="0.65"')
        for x,y,r in [(18,46,1.4),(78,33,1.6),(136,79,1.1),(202,28,1.1),(262,75,1.6),(322,28,1.1),(345,132,1.2),(49,145,1.0)]:
            s+=C(x,y,r,'#f4ecba','none',0)
        s+=C(290,64,17,'#e6e4bf','none',0)
    else:
        s+=C(80,113,50,'#fff0b2','none',0,extra='opacity="0.50"')
        s+=C(80,113,33,('#fff0c4' if not winter else '#eaf0f0'),INK,2.3)
        s+=P('M57 100 Q70 86 81 88',stroke='#fffbee',sw=3)
        # Delikatne promienie po lewej-górze.
        for x1,y1,x2,y2 in [(79,56,79,42),(42,76,30,66),(31,115,18,115),(118,77,131,66),(80,171,80,186)]:
            s+=line(x1,y1,x2,y2,('#fff7df' if not winter else '#f5f6ef'),3)
    if winter and cc!='fi':
        for i in range(21):
            x=(i*101+47)%345+9;y=(i*93+29)%360+30
            s+=C(x,y,0.9+(i%3)*.3,'#f5f9fa','none',0)
    return svg_start(360,640,s)

def clouds(cc):
    s=''
    for x,y,sc in [(96,65,.84),(330,106,1.14),(559,53,.90),(658,141,.63)]:
        s+=cloud(x,y,sc)
    # Lewa i prawa kolumna całkowicie puste; pętla bezszwowa.
    return svg_start(720,200,s)

def far_ie(winter=False):
    p=(WINTER if winter else PALETTES)['ie']
    s=''
    # Dalekie, otoczone mżawką wzgórza, zatoka i urwisko.
    s+=P('M0 183 Q89 125 164 151 Q244 95 354 160 Q434 134 540 166 Q646 108 720 183 V300 H0 Z',p['top'],INK,2.4)
    s+=P('M0 222 Q103 196 185 203 Q295 154 411 193 Q525 167 611 198 Q681 173 720 222 V300 H0Z',p['far'],INK,2.3)
    s+=P('M0 247 Q101 208 193 225 Q313 207 410 234 Q529 212 630 232 Q691 205 720 247 V300 H0Z',p['mid'],INK,2)
    # Sinuous patchwork fields.
    s+=P('M25 240 Q143 210 226 236 L144 300 H15Z','#b6d783','none',0)
    s+=P('M267 223 L360 208 L458 255 L385 296 Z','#dddc8a','none',0)
    s+=P('M476 239 L580 226 L653 294 L528 299 Z','#91c777','none',0)
    s+=P('M0 276 Q144 244 261 266 Q379 246 509 266 Q620 256 720 276 L720 300 H0Z',p['near'],INK,2.0)
    if not winter:
        for c,shift in [('#eaa993',-12),('#f5d88d',-6),('#b5dfaa',0)]:
            s+=P(f'M{72+shift} 189 Q172 {25+shift} {272+shift} 187',stroke=c,sw=5,extra='opacity="0.8"')
    # Klif po prawej nad turkusową zatoką.
    s+=P('M572 252 L603 207 L646 194 L664 160 L683 153 L694 173 L685 199 L701 235 L677 271 L658 300 H572Z','#8c9c80',INK,2.5)
    s+=P('M603 207 L642 191 L662 160 L683 153 L694 173 L683 184 L663 174 L646 200 L612 219Z',p['light'],INK,1.2)
    s+=P('M618 227 L644 209 L646 262 L633 289',stroke='#c1c8a4',sw=3)
    s+=P('M0 285 Q125 258 262 280 Q376 261 509 274 Q617 259 720 285 V300 H0Z',p['deep'],INK,2)
    s+=house(162,258,44,43,'#f5d8b4','#be7463','#437b81',winter)
    s+=house(218,255,34,37,'#fbe1b7','#d6906d','#487d7c',winter)
    s+=house(454,252,38,42,'#ebd3ab','#b9695c','#428e8f',winter)
    s+=sheep(83,262,.72,winter)+sheep(340,253,.64,winter)+sheep(393,273,.7,winter)
    if winter:
        s+=P('M7 184 Q85 130 163 151 Q253 101 353 161 Q432 139 539 165 Q634 111 715 154',stroke='#eff5e9',sw=6)
        s+=P('M0 252 Q112 209 190 226 Q298 209 411 232 Q509 215 577 236',stroke='#edf3e9',sw=4)
    else:
        # Niepozioma mżawka w oddali.
        for x,y in [(74,164),(101,186),(145,129),(267,169),(295,143),(365,180),(482,161)]:
            s+=line(x,y,x-4,y+9,'#80b5ad',1.2)
    return svg_start(720,300,s)

def moose(x,y,sc=1):
    s=f'<g transform="translate({x} {y}) scale({sc})">'
    for xx in [-29,-8,17,31]:s+=R(xx,7,5,25,'#85685e',INK,1.5,1)
    s+=E(-2,0,39,20,'#aa785c',INK,2)
    s+=P('M25 -6 L37 -35 Q44 -43 53 -40 L62 -28 L48 -17 L44 6Z','#aa785c',INK,2)
    s+=E(57,-34,17,10,'#aa785c',INK,2)
    s+=P('M58 -43 L63 -62 L71 -68 L75 -52 L83 -61 L82 -44 L89 -52 L85 -32',stroke='#8f6b5c',sw=4)
    s+=P('M50 -43 L40 -65 L34 -66 L36 -51 L27 -56 L34 -37',stroke='#8f6b5c',sw=4)
    s+=C(66,-36,1.7,INK,'none',0)
    return s+'</g>'

def sauna(x,y,sc=1,winter=False):
    return f'<g transform="translate({x} {y}) scale({sc})">' + house(0,0,92,60,'#cf9571','#975c56','#755e4e',winter) + R(3,-56,6,49,'#d7a47c','none',0) + R(98,-93,13,38,'#ad7361',INK,2,1) + P('M102 -95 Q93 -112 108 -124',stroke='#d1e2d4',sw=4) + '</g>'

def far_fi(winter=False):
    p=(WINTER if winter else PALETTES)['fi']
    s=P('M0 177 Q103 115 196 158 Q290 133 388 155 Q484 119 585 163 Q671 143 720 177 V300 H0Z',p['top'],INK,2.1)
    s+=P('M0 216 Q79 169 201 186 Q335 157 439 191 Q584 159 720 216 V300 H0Z',p['far'],INK,2.2)
    for x,y,h in [(37,221,76),(85,210,58),(130,218,68),(187,200,65),(236,213,56),(485,197,70),(528,210,84),(569,208,69),(690,211,75)]:
        s+=pine(x,y,h,winter,p)
    lake_color=('#dcecef' if winter else p['water'])
    s+=P('M0 234 Q126 215 262 238 Q392 220 542 231 Q644 222 720 234 V300 H0Z',lake_color,INK,2.5)
    if winter:
        s+=P('M0 242 Q134 231 247 246 Q397 232 552 244 Q650 237 720 246 V300 H0Z','#b8d7db','none',0)
        for x,y in [(65,257),(190,270),(330,253),(456,277),(631,256)]:s+=line(x,y,x+44,y,'#e7f6f2',2.1)
    else:
        s+=waves(253)
        s+=waves(277,n=8,color='#b6e7df',stroke_width=1.4)
    s+=P('M280 239 Q331 229 380 238 L370 250 Q313 247 280 246Z',p['mid'],INK,2)
    s+=sauna(292,236,.8,winter)
    s+=P('M350 240 L423 240 L414 247 L350 245Z','#b98c6f',INK,1.4)
    for x in [372,397,414]:s+=line(x,241,x,252,'#87695f',2)
    if not winter:s+=small_boat(190,270,.7,'#d5836c')
    s+=moose(614,209,.55)
    if winter:s+=P('M6 178 Q94 127 197 157 Q295 137 387 158 Q485 123 584 163',stroke='#f1f5ef',sw=5)
    return svg_start(720,300,s)

def arch_bridge(x,y,w,h,n,stone='#e5bd92',winter=False):
    # Dekoracyjny, pełny pomost z prześwitami łukowymi, ich wnętrze jest przezroczyste.
    s=P(f'M{x} {y-h+6} L{x+w} {y-h+6} L{x+w} {y} H{x}Z',stone,INK,2.4)
    gap=w/(n+1)
    for j in range(n):
        cx=x+gap*(j+1)
        rad=gap*.37
        s+=P(f'M{cx-rad} {y} V{y-h*.40} Q{cx} {y-h*.91} {cx+rad} {y-h*.40} V{y}Z','#618c81',INK,1.8)
        s+=P(f'M{cx-rad*.58} {y-h*.25} V{y-h*.46} Q{cx} {y-h*.74} {cx+rad*.58} {y-h*.46}',stroke='#bad0b1',sw=1.5)
    s+=R(x-3,y-h,w+6,7,'#efd0a4',INK,2)
    if winter:s+=R(x-4,y-h-4,w+8,4,'#f4f7ef','none',0,1)
    for j in range(int(w/25)):
        xx=x+j*25+9
        s+=line(xx,y-h+16,xx+10,y-h+16,'#cfaa81',1.1)
    return s

def fort(x,y,sc=1,winter=False):
    s=f'<g transform="translate({x} {y}) scale({sc})">'
    s+=R(0,-54,94,54,'#d6b48e',INK,2.6)
    for i in range(6):s+=R(i*16-1,-61,12,10,'#d6b48e',INK,2.1)
    s+=R(8,-95,25,41,'#d6b48e',INK,2.3)
    s+=R(60,-85,23,33,'#d6b48e',INK,2.3)
    s+=poly([(6,-94),(20,-110),(35,-94)],'#ac755f',INK,2)
    s+=poly([(58,-85),(71,-99),(85,-85)],'#ac755f',INK,2)
    for xx in [21,47,74]:s+=R(xx,-26,7,15,'#62868a',INK,1.3,3)
    if winter:s+=P('M7 -97 L20 -112 L35 -96 M58 -88 L71 -101 L85 -88',stroke='#f7f8ef',sw=4)
    return s+'</g>'

def far_lu(winter=False):
    p=(WINTER if winter else PALETTES)['lu']
    s=P('M0 191 Q89 113 192 163 Q298 122 404 161 Q541 127 720 191 V300 H0 Z',p['top'],INK,2.2)
    s+=P('M0 215 Q104 166 209 181 Q288 170 386 184 Q504 153 622 196 Q678 186 720 215 V300 H0Z',p['far'],INK,2.1)
    # Dolina z charakterystyczną głębią i zakolem rzeki.
    s+=P('M0 270 Q104 223 195 231 Q301 184 404 214 Q520 205 601 238 Q666 218 720 270 L720 300H0Z',p['mid'],INK,2.1)
    s+=P('M0 286 Q143 262 239 278 Q313 249 411 252 Q526 240 640 270 Q692 263 720 286 V300 H0Z',p['deep'],INK,2)
    s+=P('M197 300 Q301 267 371 286 Q483 291 554 266 Q612 265 650 300Z',p['water'],INK,1.6)
    s+=P('M30 264 Q137 227 214 239 Q303 198 410 220',stroke='#d5dcb0',sw=3)
    s+=arch_bridge(268,255,298,87,7,'#dfbc91',winter)
    s+=fort(64,229,.82,winter)
    s+=house(161,221,37,41,'#f3dfb9','#b96f61','#5b9087',winter)
    s+=house(204,216,29,36,'#e2c4a6','#bf735f','#66938f',winter)
    for x,y,h in [(40,257,52),(602,254,52),(649,263,64)]:s+=tree(x,y,h,p,winter)
    if winter:
        s+=P('M7 191 Q91 118 189 166 Q298 123 401 163 Q541 129 711 186',stroke='#eef5e9',sw=5)
        s+=P('M12 272 Q105 225 190 234 Q292 188 400 217',stroke='#ecf4eb',sw=3)
    return svg_start(720,300,s)

def near_ie(winter=False):
    p=(WINTER if winter else PALETTES)['ie']
    s=P('M0 127 Q88 107 172 133 Q246 98 330 122 Q413 94 508 133 Q610 101 720 127 V240 H0 Z',p['far'],INK,2.1)
    for x,y,h in [(62,158,52),(274,164,49),(496,154,56),(640,161,47)]:s+=tree(x,y,h,p,winter)
    s+=P('M0 189 Q121 163 257 180 Q392 163 516 183 Q624 172 720 190 V240 H0Z',p['near'],INK,2)
    s+=brick_wall(3,189,714,34,winter)
    for x in (78,236,383,560):
        s+=sheep(x,177,.66,winter)
    for x in (135,339,475,690):s+=C(x,190,17,p['deep'],INK,2)+C(x-6,185,12,p['mid'],INK,1.1)
    s+=P('M0 226 H720 V240 H0Z',p['deep'],INK,1.5)
    if winter:s+=P('M0 220 Q161 215 360 221 Q555 214 720 220',stroke='#f0f5ed',sw=4)
    return svg_start(720,240,s)

def near_fi(winter=False):
    p=(WINTER if winter else PALETTES)['fi']
    s=P('M0 146 Q90 121 181 150 Q282 118 371 153 Q473 117 560 146 Q649 125 720 146 V240 H0Z',p['far'],INK,2.1)
    for x,y,h in [(51,187,83),(127,181,63),(226,186,87),(333,178,62),(452,187,89),(552,174,67),(658,183,81)]:
        s+=pine(x,y,h,winter,p)
    s+=P('M0 208 Q121 189 247 209 Q367 186 494 204 Q621 188 720 208 V240 H0Z',p['near'],INK,2.2)
    s+=P('M0 228 L720 228 V240 H0Z',p['deep'],'none',0)
    # Niskie drewniane pale nad jeziorem.
    s+=R(0,211,720,7,'#c69c7b',INK,1.5,0)
    for x in range(0,721,72):s+=R(x+12,203,6,22,'#ac806a',INK,1.6)
    for x in (87,313,515,693):
        s+=P(f'M{x} 227 q-4 -12 -8 -20 M{x} 227 q5 -18 13 -22',stroke='#a8c89a',sw=2)
    if winter:s+=P('M0 201 Q120 184 253 205 Q378 190 500 201 Q620 186 720 205',stroke='#f0f6ed',sw=5)
    return svg_start(720,240,s)

def near_lu(winter=False):
    p=(WINTER if winter else PALETTES)['lu']
    s=P('M0 153 Q85 130 168 148 Q252 123 342 158 Q455 119 556 150 Q655 124 720 153 V240 H0Z',p['far'],INK,2.3)
    for x,y,h in [(76,180,58),(264,183,53),(475,186,66),(627,184,59)]:s+=tree(x,y,h,p,winter)
    s+=P('M0 198 Q106 171 219 196 Q349 171 464 201 Q600 166 720 198 V240 H0Z',p['mid'],INK,2)
    s+=brick_wall(3,200,714,28,winter)
    # Regularne nisze w parapecie, bez kopii prawdziwej budowli.
    for x in (118,326,540):
        s+=P(f'M{x} 225 V211 Q{x+10} 201 {x+20} 211 V225',fill=p['deep'],stroke=INK,sw=1.4)
    s+=P('M0 227H720V240H0Z',p['deep'],INK,1.5)
    return svg_start(720,240,s)

def road(cc):
    p=PALETTES[cc]
    s=R(0,0,360,50,p['near'],'none',0)
    s+=R(0,36,360,14,'#c9cbb4','none',0)
    s+=R(0,43,360,7,'#e6e2c9','none',0)
    for x in (52,175,307):
        s+=P(f'M{x} 32 l2 -7 l2 7 M{x+10} 33 l-3 -5',stroke=p['light'],sw=1.4)
    # Pierwszy nieprzerwany pas ciemnego asfaltu dokładnie od y=50 (w źródle wiersz 150).
    s+=R(0,50,360,60,'#485b63','none',0)
    for x in (29,149,269):s+=R(x,80,56,5,'#fff2d6','none',0,1)
    for x in (49,169,289):s+=R(x,66,17,1.2,'#70848b','none',0,0)
    s+=R(0,102,360,1.5,'#677982','none',0)
    return svg_start(360,110,s)

# -- Panoramy punktów trasy: przezroczyste PNG 540 x 300 logicznych. --
def river(y=264):
    return P(f'M0 {y} Q128 {y-7} 241 {y} Q361 {y-7} 540 {y} V300 H0Z','#72bfd0',INK,2.2) + waves(y+20,540,7,'#d4f0df',2)

def street_house(x,base,w,h,body,door,winter=False):
    s=R(x,base-h,w,h,body,INK,2.5,1)
    s+=R(x-3,base-h-7,w+6,8,'#f5dbb3',INK,2)
    for xx in (x+w*.2,x+w*.65):
        for yy in (base-h*.72,base-h*.43):
            s+=R(xx,yy,w*.17,h*.16,'#a6d8d7',INK,1.4,3)
            s+=P(f'M{xx+w*.084} {yy} V{yy+h*.16}',stroke='#f0efce',sw=1)
    s+=R(x+w*.36,base-h*.3,w*.28,h*.3,door,INK,1.6,4)
    s+=C(x+w*.56,base-h*.14,1.4,HI,'none',0)
    return s

def bridge(x,y,w,arches=4):
    s=R(x,y-18,w,18,'#d9bb96',INK,2.4,0)
    for j in range(arches):
        cx=x+(j+.5)*w/arches
        r=w/(arches*2.9)
        s+=P(f'M{cx-r} {y} Q{cx} {y-31} {cx+r} {y}',stroke='#8c8572',sw=4.5)
    s+=line(x,y-18,x+w,y-18,INK,2)
    for xx in range(int(x)+11,int(x+w),28):s+=line(xx,y-19,xx,y-30,'#6a7b76',2)
    s+=line(x,y-29,x+w,y-29,'#6a7b76',2.5)
    return s

def landmarks_svg(name):
    s=''
    if name=='dublin':
        s+=river(252)
        for x,w,h,b,d in [(30,62,133,'#eab89b','#368b82'),(96,60,153,'#f4d2ad','#b65e61'),(160,57,141,'#b2c9a5','#4973a0'),(222,62,166,'#e7b1a1','#7b789e'),(288,57,145,'#e9d3a2','#a66f73'),(349,61,160,'#d2c4aa','#4e8e72'),(414,70,132,'#eabda6','#c5796c')]:
            s+=street_house(x,250,w,h,b,d)
        s+=bridge(10,267,520,7)
        s+=small_boat(424,288,.5,'#d58c74')
        s+=cloud(86,37,.65)
    elif name=='cork':
        s+=river(256)
        for x,w,h,col in [(28,58,106,'#f0cfb2'),(87,56,120,'#d5b99f'),(146,51,142,'#e8c2ab'),(197,65,127,'#c1cfb2'),(268,55,151,'#e8d1ad'),(328,54,116,'#e7b59b'),(390,59,132,'#d0b1a7')]:
            s+=street_house(x,260,w,h,col,'#608a8a')
        s+=R(455,87,33,172,'#d0bb99',INK,2.5)
        s+=poly([(452,88),(470,45),(491,88)],'#a37770',INK,2.5)
        s+=R(460,116,24,29,'#9cbdbe',INK,1.6,5)
        s+=bridge(10,270,525,6)
        s+=small_boat(185,291,.65,'#d97864')
    elif name=='limerick':
        s+=river(252)
        s+=P('M27 253 L27 138 H503 L503 253Z','#7ca58a',INK,2)
        s+=R(98,120,343,135,'#cbb58e',INK,3)
        for i in range(17):s+=R(100+i*20,113,15,13,'#cbb58e',INK,1.9)
        for tx in (69,405):
            s+=R(tx,67,70,190,'#d0b891',INK,2.8)
            for i in range(4):s+=R(tx+4+i*17,56,12,14,'#d0b891',INK,1.6)
            s+=R(tx+24,132,19,28,'#617e7e',INK,2.1,9)
        for i in range(4):s+=R(163+i*63,166,24,34,'#718e89',INK,2,12)
        s+=P('M249 253 V197 Q267 160 285 197 V253','#748b85',INK,2.4)
        s+=bridge(8,279,522,7)
    elif name=='helsinki':
        s+=river(266)
        for i in range(6):s+=R(82-i*8,246+i*4,376+i*16,4,'#dddfd2',INK,1.3)
        s+=R(156,112,230,133,'#f8eed5',INK,2.7)
        s+=R(139,142,265,17,'#f5efdc',INK,2.5)
        s+=poly([(156,112),(269,70),(385,112)],'#f6edd7',INK,2.7)
        s+=R(254,40,39,85,'#f7edda',INK,2.6)
        s+=E(274,42,27,22,'#77a49e',INK,2.7)
        s+=R(263,1,21,19,'#f8edd5',INK,2.2)
        s+=C(273,0,6,HI,INK,1.5)
        for x in (202,338):
            s+=R(x-15,73,30,65,'#f6e8d5',INK,2.2)
            s+=E(x,69,22,18,'#7ea9a1',INK,2.2)
        for xx in (172,208,320,356):
            s+=R(xx,152,15,80,'#f6edd7',INK,1.5)
            s+=R(xx+5,151,4,78,'#fffaf0','none',0)
        s+=P('M95 266 L445 266',stroke='#8f9f9a',sw=3)
        s+=small_boat(465,285,.8,'#d38267')
    elif name=='tampere':
        s+=river(250)
        s+=R(62,139,172,118,'#c97362',INK,2.6)
        s+=poly([(55,139),(148,111),(242,139)],'#965f5a',INK,2.6)
        s+=R(256,107,179,149,'#bb705c',INK,2.6)
        s+=poly([(250,107),(338,74),(440,107)],'#905956',INK,2.6)
        s+=R(166,22,23,118,'#ae665c',INK,2.5)+R(378,12,25,108,'#b97461',INK,2.5)
        for x0,y0,w,h in [(76,161,140,74),(273,139,151,101)]:
            for cx in range(x0,x0+w,24):
                for cy in range(y0,y0+h,32):s+=R(cx,cy,14,23,'#93c7be',INK,1.6,6)
        s+=bridge(0,268,540,8)
        s+=small_boat(418,288,.7,'#d88e6e')
    elif name=='luksemburg':
        p=PALETTES['lu']
        s+=P('M0 235 Q118 165 216 210 Q321 142 428 210 Q507 177 540 201 V300H0Z',p['mid'],INK,2.3)
        s+=P('M0 265 Q125 211 215 248 Q330 192 430 232 Q506 198 540 219 V300H0Z',p['deep'],INK,2.2)
        s+=P('M208 300 Q288 251 363 272 Q467 283 540 250 V300Z',p['water'],INK,1.5)
        s+=arch_bridge(28,248,467,123,7,'#e7c59e')
        s+=fort(336,132,1.04)
        for x,y in [(33,243),(105,239),(499,251)]:s+=tree(x,y,62,p)
        for x,y in [(42,261),(64,250),(91,262),(115,246),(161,242),(205,252)]:s+=P(f'M{x} {y} V{y-21} Q{x+10} {y-37} {x+20} {y-21}V{y}',fill='#608b83',stroke=INK,sw=1.5)
    elif name.startswith('prom-'):
        irish = name=='prom-irlandia'
        water='#6eafc1' if irish else '#68b3c5'
        s+=R(0,218,540,82,water,'none',0)
        s+=P('M0 230 Q125 218 257 229 Q385 220 540 228',stroke='#d7f0d8',sw=3)
        if irish:
            s+=P('M0 218 L0 144 L43 131 L74 155 L90 133 L122 153 L139 220Z','#98b496',INK,2.5)
            s+=P('M0 155 L43 143 L74 165 L90 146 L122 165',stroke='#e8e4c8',sw=4)
            s+=P('M436 218 L444 195 L484 180 L540 194 V218Z','#a8c69e',INK,2)
            for x in (462,493,528):s+=house(x,195,16,18,'#edc5a1','#b76e5a','#518f8b')
        else:
            s+=P('M0 218 V179 Q54 154 106 179 V218Z','#75a895',INK,2)
            for x in (20,54,87,127):s+=pine(x,209,46,False,PALETTES['fi'])
            s+=P('M421 213 H540 V220H421Z','#c3bfa5',INK,2)
            for x in (461,503):
                s+=line(x,215,x,140,INK,2.8)+line(x,143,x+34,143,INK,2.8)+line(x+34,143,x+34,199,INK,2.1)
                s+=line(x+34,143,x+8,160,INK,1.5)
        # Prom duży, charakterystyczna sylwetka bez żadnych inskrypcji/logotypów.
        s+=P('M118 214 H420 L382 254 H165 L127 239Z','#f5f0d9',INK,3.2)
        s+=P('M132 230 H403 L382 251 H166Z','#c96f64',INK,2.1)
        s+=R(163,145,204,72,'#f4e4cd',INK,2.7,3)
        s+=R(203,115,139,32,'#f4e8d8',INK,2.4,3)
        s+=R(251,103,55,14,'#f8f0dc',INK,2.2,2)
        s+=R(269,74,8,30,'#637c85',INK,1.7)
        s+=P('M276 72 Q266 64 276 59',stroke='#e9ebe2',sw=4)
        for x in range(172,354,23):s+=R(x,163,13,12,'#8ec5c8',INK,1.4,3)
        for x in range(215,324,19):s+=R(x,124,10,12,'#98cbca',INK,1.1,2)
        s+=P('M142 211 H365',stroke='#fff9e2',sw=3.2)
        # Drobny generyczny kremowo-czerwony samochód przy pokładzie.
        s+=R(343,197,37,14,'#f4e5c7',INK,1.5,3)
        s+=R(351,192,18,9,'#cd7869',INK,1.2,2)
        for x in (351,374):s+=C(x,210,4,'#3a5961',INK,1.4)
        for x,y in [(116,85),(395,78),(451,112)]:s+=P(f'M{x-9} {y} q9 -8 18 0',stroke=INK,sw=2)
        for x in (170,235,314,392,468):s+=line(x,274,x+22,274,'#d7f2e5',2.2)
    return svg_start(540,300,s)

LMS=['dublin','cork','limerick','helsinki','tampere','luksemburg','prom-irlandia','prom-finlandia']
SPECS={'sky':(360,640),'clouds':(720,200),'far':(720,300),'near':(720,240),'road':(360,110)}

def render(body,w,h,filename,tile=False):
    filename.parent.mkdir(parents=True,exist_ok=True)
    png=cairosvg.svg2png(bytestring=body.encode(),output_width=w*3,output_height=h*3)
    img=Image.open(io.BytesIO(png)).convert('RGBA')
    if tile:
        # Ostatnia/pierwsza kolumna kafelka zgodne pikselowo (test seam), także dla alfy.
        first=img.crop((0,0,1,h*3))
        img.paste(first,(w*3-1,0))
    # Bez utraty półprzezroczystości na krawędziach: RGBA TrueColor.
    # Pillow zapisuje PNG sRGB (w przestrzeni barw sRGB, bez konieczności ICC).
    img.save(filename,optimize=True,compress_level=9)
    return img

def compose_preview(cc,winter=False):
    folder=COUNTRIES/cc
    def load(suffix):return Image.open(folder / f'{cc}-{suffix}.png').convert('RGBA')
    canvas=load('sky-zima' if winter else 'sky')
    for name,yy in [('clouds',110),('far-zima' if winter else 'far',255),('near-zima' if winter else 'near',418),('road',530)]:
        image=load(name)
        width=image.width
        # Kafelki po jednym; pod spodem niebo @3x.
        temp=Image.new('RGBA',canvas.size)
        for xx in range(0,canvas.width,width):temp.alpha_composite(image,(xx,yy*3))
        canvas=Image.alpha_composite(canvas,temp)
    canvas=canvas.convert('RGB')
    output=PREVIEWS / f'countries-{cc}-preview{"-zima" if winter else ""}.png'
    canvas.save(output,optimize=True)
    canvas.save(folder / f'preview{"-zima" if winter else ""}.png',optimize=True)
    return canvas

def validate_assets():
    errors=[]
    for cc in ('ie','fi','lu'):
        for name, (w,h) in SPECS.items():
            for suffix in (('', '-zima') if name in ('sky','far','near') else ('',)):
                f=COUNTRIES/cc/f'{cc}-{name}{suffix}.png'
                im=Image.open(f)
                if im.size!=(w*3,h*3):errors.append(f'Bad dims: {f} = {im.size}')
                if name in ('clouds','far','near','road'):
                    if im.convert('RGBA').getpixel((0,0)) != im.convert('RGBA').getpixel((w*3-1,0)):
                        errors.append(f'Bad seam: {f}')
                    left=im.convert('RGBA').crop((0,0,1,h*3)).tobytes()
                    right=im.convert('RGBA').crop((w*3-1,0,w*3,h*3)).tobytes()
                    if left!=right:errors.append(f'Bad seam full: {f}')
                if name in ('far','near','clouds'):
                    if im.convert('RGBA').getextrema()[3][0] != 0:errors.append(f'Nontransparent layer: {f}')
                if name=='road':
                    im=im.convert('RGB')
                    if any(im.getpixel((x,149))[0]<65 for x in range(0,1080,18)):
                        errors.append(f'Road dark before 150: {f}')
                    if not all(im.getpixel((x,150))[0]<85 for x in range(0,1080,18)):
                        errors.append(f'Road missing asphalt at 150: {f}')
    for lm in LMS:
        f=LANDMARKS/f'{lm}.png';img=Image.open(f)
        if img.size!=(1620,900):errors.append(f'Bad landmark size: {f}')
        if img.convert('RGBA').getextrema()[3][0]!=0:errors.append(f'Bad landmark alpha: {f}')
    if errors:raise RuntimeError('\n'.join(errors))
    print('OK: 3 x (5 letnich + 3 zimowe) + 8 panoram; wymiary, alfa, szwy, asfalt y=150')



def compose_scene(cc, landmark, winter=False):
    # Kontrola kontraktu kolejności: sky -> clouds -> far -> punkt -> near -> road.
    folder=COUNTRIES/cc
    def img(name): return Image.open(folder/f'{cc}-{name}.png').convert('RGBA')
    canvas=img('sky-zima' if winter else 'sky')
    for layer,offset in [('clouds',110),('far-zima' if winter else 'far',255)]:
        canvas.alpha_composite(img(layer),(0,offset*3))
    png=Image.open(LANDMARKS/f'{landmark}.png').convert('RGBA').resize((990,549),Image.Resampling.LANCZOS)
    canvas.alpha_composite(png,((360*3-990)//2,(555-183)*3))
    canvas.alpha_composite(img('near-zima' if winter else 'near'),(0,418*3))
    canvas.alpha_composite(img('road'),(0,530*3))
    out=PREVIEWS/f'scene-{cc}-{landmark}{"-zima" if winter else ""}.png'
    canvas.convert('RGB').save(out,optimize=True)

def compose_landmarks_preview():
    # Arkusz kontrolny, nie jest ładowany w grze. Podpisy tylko na podglądzie.
    tile_w, tile_h = 570, 370
    sheet=Image.new('RGB',(tile_w*4,tile_h*2),'#e3eee8')
    d=ImageDraw.Draw(sheet)
    try: font=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',25)
    except OSError: font=ImageFont.load_default()
    for i,lm in enumerate(LMS):
        x=(i%4)*tile_w;y=(i//4)*tile_h
        cell=Image.new('RGBA',(tile_w-14,320),'#d4e9e6')
        img=Image.open(LANDMARKS/f'{lm}.png').convert('RGBA')
        img.thumbnail((tile_w-24,315),Image.Resampling.LANCZOS)
        cell.alpha_composite(img,((cell.width-img.width)//2,cell.height-img.height))
        sheet.paste(cell.convert('RGB'),(x+7,y+7))
        d.text((x+15,y+331),lm,font=font,fill=INK)
    sheet.save(PREVIEWS/'landmarks-preview-57.png',optimize=True)

def main():
    PREVIEWS.mkdir(parents=True,exist_ok=True)
    for cc in ('ie','fi','lu'):
        for winter in (False,True):
            suffix='-zima' if winter else ''
            for layer in ('sky','far','near'):
                fun={'sky':sky,'far':globals()['far_'+cc],'near':globals()['near_'+cc]}[layer]
                output=COUNTRIES/cc/f'{cc}-{layer}{suffix}.png'
                w,h=SPECS[layer]
                render(fun(cc,winter) if layer=='sky' else fun(winter),w,h,output,tile=layer!='sky')
        for layer,fun in [('clouds',clouds),('road',road)]:
            w,h=SPECS[layer]
            render(fun(cc),w,h,COUNTRIES/cc/f'{cc}-{layer}.png',tile=True)
        # Przerysuj podgląd po zapisaniu chmur i asfaltu.
        for winter in (False,True):compose_preview(cc,winter)
    for lm in LMS:render(landmarks_svg(lm),540,300,LANDMARKS/f'{lm}.png')
    compose_landmarks_preview()
    for cc,lm in [('ie','dublin'),('fi','helsinki'),('lu','luksemburg')]: compose_scene(cc,lm)
    compose_scene('fi','helsinki',True)
    validate_assets()
    total=sum(f.stat().st_size for f in list(COUNTRIES.glob('??/*.png'))+list(LANDMARKS.glob('*.png')))
    print('Wygenerowano 38 PNG (24 warstwy, 8 panoram i 6 podglądów folderowych) + 6 podglądów w docs; rozmiar',round(total/1024),'KiB')

if __name__=='__main__':main()
