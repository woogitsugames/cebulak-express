#!/usr/bin/env python3
"""Autorski generator wektorowych warstw krajow baltyckich do Cebulak Express.

Wymaga Pillow i CairoSVG. Nie zmienia kodu gry. Wywolanie z dowolnego katalogu:
python public/assets/countries/ee/generate_baltic.py
"""
from __future__ import annotations

from io import BytesIO
from math import cos, pi, sin
from pathlib import Path
import random

import cairosvg
from PIL import Image, ImageCms

ROOT = Path(__file__).resolve().parents[4]
DEST = ROOT / 'public' / 'assets' / 'countries'
PREVIEW_DIR = ROOT / 'docs' / 'art' / 'podglady'
W = 2160
INK = '#1d2f3b'
COUNTRIES = {
    'ee': dict(name='Estonia', sky=('#83cee7','#b7e6e3','#ffecc8'), winter=('#a5d1e6','#d8edf4','#fff6e9'), back='#92bdb0', mid='#5eaa88', front='#9fc983', accent='#247d6b', roof='#bb7959', wall='#c9a778', fields='#d5cd7d'),
    'lv': dict(name='Lotwa', sky=('#7fcce5','#b9e8df','#ffedbd'), winter=('#a3d0e7','#d7e9f0','#fef7e9'), back='#a4c4ac', mid='#83b87d', front='#a6cc72', accent='#448967', roof='#d36c50', wall='#f0d69e', fields='#ecca72'),
    'lt': dict(name='Litwa', sky=('#7ec9eb','#bce4df','#ffebb5'), winter=('#a9d1e9','#d6eaf4','#fff7e6'), back='#93bfb1', mid='#70ad82', front='#b8cf76', accent='#438b66', roof='#c96b51', wall='#f4dcb1', fields='#edc86b'),
}

# Wszystkie rysunki powstaja jako SVG i sa renderowane do RGBA PNG (bez zewnetrznych assetow).
class SVG:
    def __init__(self, width, height):
        self.width, self.height = width, height
        self.ops = []
        self.ops.append(f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}">')
        self.ops.append('<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="SKYTOP"/><stop offset="0.61" stop-color="SKYMID"/><stop offset="1" stop-color="SKYBOT"/></linearGradient><radialGradient id="halo"><stop offset="0" stop-color="#fff7bd" stop-opacity=".65"/><stop offset=".45" stop-color="#fff5bd" stop-opacity=".22"/><stop offset="1" stop-color="#fff5bd" stop-opacity="0"/></radialGradient></defs>')
    def add(self, s): self.ops.append(s)
    def rect(self,x,y,w,h,fill,stroke='none',sw=0,rx=0, extra=''):
        self.add(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}" {extra}/>')
    def ellipse(self,x,y,rx,ry,fill,stroke='none',sw=0,extra=''):
        self.add(f'<ellipse cx="{x}" cy="{y}" rx="{rx}" ry="{ry}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}" {extra}/>')
    def circle(self,x,y,r,fill,stroke='none',sw=0,extra=''):
        self.add(f'<circle cx="{x}" cy="{y}" r="{r}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}" {extra}/>')
    def line(self,x1,y1,x2,y2,color=INK,sw=6,extra=''):
        self.add(f'<path d="M{x1} {y1} L{x2} {y2}" fill="none" stroke="{color}" stroke-width="{sw}" stroke-linecap="round" {extra}/>')
    def poly(self,points,fill,stroke=INK,sw=6,extra=''):
        s=' '.join(f'{x},{y}' for x,y in points)
        self.add(f'<polygon points="{s}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round" {extra}/>')
    def path(self,d,fill,stroke=INK,sw=6,extra=''):
        self.add(f'<path d="{d}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}" stroke-linejoin="round" stroke-linecap="round" {extra}/>')
    def begin(self,x=0,y=0,scale=1, extra=''):
        self.add(f'<g transform="translate({x} {y}) scale({scale})" {extra}>')
    def end(self):self.add('</g>')
    def raw(self,replace=None):
        s=''.join(self.ops+['</svg>'])
        if replace:
            for old,new in replace.items():s=s.replace(old,new)
        return s


def hill_y(x,baseline,amplitude,phase=0):
    t=2*pi*x/W
    return baseline + amplitude*(.64*sin(t+phase)+.28*sin(2*t+phase*.7)+.08*sin(4*t+phase*1.5))


def draw_hill(s, baseline, amp, phase, color, height=900, edge=True):
    pts=[(x,round(hill_y(x,baseline,amp,phase),1)) for x in range(0,W+1,12)]
    d='M'+ ' L'.join(f'{x} {y}' for x,y in pts)
    s.path(d+f' L{W} {height} L0 {height} Z',color,'none',0)
    if edge:s.path(d,'none',INK,6)
    return lambda x: hill_y(x,baseline,amp,phase)


def grass(s,x,y,scale=1,winter=False):
    if winter:
        s.path(f'M{x-11*scale} {y} Q{x} {y-11*scale} {x+11*scale} {y}', 'none','#b1d9e5',3.5*scale)
        return
    c='#4f965b'
    s.path(f'M{x-13*scale} {y} Q{x-8*scale} {y-17*scale} {x-2*scale} {y-20*scale} M{x} {y} L{x+3*scale} {y-29*scale} M{x+3*scale} {y} Q{x+12*scale} {y-12*scale} {x+18*scale} {y-15*scale}', 'none',c,4*scale)


def pine(s,x,y,h,winter=False,deep=False):
    sc=h/290
    s.begin(x,y,sc)
    foliage = '#2d806a' if not deep else '#508879'
    dark = '#1e665d' if not deep else '#3b7770'
    if winter: foliage='#538b92';dark='#367582'
    s.rect(-15,-104,30,116,'#957058',INK,6,4)
    # Three tiers with sculpted / rounded lower corners.
    for top,bot,half,c in [(-296,-174,82,foliage),(-246,-112,112,dark),(-183,-42,135,foliage)]:
        s.path(f'M0 {top} Q{-half*.30} {top+44} {-half} {bot+10} Q{-half-8} {bot+27} {-half+17} {bot+22} Q0 {bot+6} {half-17} {bot+22} Q{half+8} {bot+27} {half} {bot+10} Q{half*.30} {top+44} 0 {top}Z',c,INK,8)
        s.path(f'M{-half*.46} {bot+4} Q{-half*.10} {bot-10} {half*.13} {bot+4}', 'none','#9acc92' if not winter else '#a8d8dd',5)
        if winter:
            s.path(f'M{-half*.83} {bot+8} Q{-half*.40} {bot-1} 0 {bot+8} Q{half*.45} {bot-4} {half*.84} {bot+9} Q{half*.5} {bot-13} 0 {bot-9} Q{-half*.4} {bot-16} {-half*.83} {bot+8}Z','#f3fcfa','#afcfde',3)
    s.end()


def birch(s,x,y,h,winter=False):
    sc=h/300
    s.begin(x,y,sc)
    s.path('M-12 4 Q-17 -140 -8 -292 Q-4 -307 8 -294 Q2 -160 12 4 Z','#f3e8d5',INK,7)
    for yy,ww in [(-64,12),(-126,10),(-192,8),(-250,7)]:
        s.line(-6,yy,ww,yy-8,INK,5)
    s.path('M-3 -210 Q-42 -252 -90 -263 M3 -174 Q45 -218 89 -231 M4 -121 Q38 -142 64 -142', 'none',INK,7)
    if not winter:
        s.path('M-100 -261 C-140 -299 -106 -349 -53 -342 C-31 -388 35 -384 61 -352 C116 -355 137 -314 113 -279 C116 -242 69 -226 41 -244 C-9 -231 -25 -259 -55 -247 C-87 -235 -111 -240 -100 -261 Z','#a9c66d',INK,8)
        for cx,cy,rr in [(-83,-291,26),(-26,-328,31),(63,-310,39)]:s.circle(cx,cy,rr,'#c6d88a','none')
        s.path('M-90 -270 Q-60 -254 -35 -272 M40 -256 Q78 -270 95 -300', 'none','#689e68',5)
    else:
        s.path('M-90 -263 Q-60 -276 -42 -260 M19 -238 Q54 -247 89 -231 M-12 -292 Q7 -300 18 -290','none','#fff',11)
    s.end()


def broadleaf(s,x,y,h,winter=False):
    sc=h/250
    s.begin(x,y,sc)
    s.path('M-16 2 Q-14 -115 -23 -172 L-5 -201 Q-5 -155 4 -141 Q23 -169 35 -181 L40 -160 Q16 -123 14 2 Z', '#926d52', INK,7)
    if winter:
        s.path('M-19 -182 Q-67 -222 -79 -204 M12 -142 Q59 -186 76 -165 M-18 -114 Q-69 -150 -86 -135', 'none',INK,7)
        s.path('M-81 -207 Q-65 -215 -52 -204 M47 -177 Q64 -183 75 -164', 'none','#f1faff',8)
    else:
        s.path('M-112 -176 C-131 -218 -101 -256 -55 -253 C-46 -295 19 -298 50 -272 C87 -285 117 -249 112 -210 C144 -168 93 -131 54 -148 C28 -124 -11 -137 -24 -145 C-72 -119 -113 -143 -112 -176Z','#8fbd69',INK,9)
        for cx,cy,rx,ry in [(-70,-208,40,27),(-6,-257,40,31),(61,-211,45,27)]:s.ellipse(cx,cy,rx,ry,'#b9d484')
        s.path('M-97 -176 Q-66 -162 -45 -178 M34 -157 Q64 -179 90 -168', 'none','#5e9868',5)
    s.end()


def shrub(s,x,y,w=125,h=80,winter=False):
    s.begin(x,y,1)
    shade='#9ccf78' if not winter else '#eaf6f4'
    fill='#6ba775' if not winter else '#d5e8eb'
    s.path(f'M{-w/2} 1 Q{-w*.59} {-h*.40} {-w*.28} {-h*.51} Q{-w*.30} {-h*1.12} 0 {-h*.78} Q{w*.27} {-h*1.20} {w*.34} {-h*.57} Q{w*.65} {-h*.40} {w/2} 1Z', fill,INK,6)
    s.path(f'M{-w*.36} {-h*.45} Q{-w*.21} {-h*.87} 0 {-h*.63} Q{w*.25} {-h*.95} {w*.36} {-h*.42}', 'none',shade,7)
    if winter:s.path(f'M{-w*.37} {-h*.48} Q{-w*.20} {-h*.75} 0 {-h*.62} Q{w*.2} {-h*.92} {w*.36} {-h*.49}', 'none','#fff',12)
    s.end()


def house(s,x,y,kind,winter=False,size=1):
    c=COUNTRIES[kind]
    s.begin(x,y,size)
    w=290
    wall=c['wall']
    roof=c['roof']
    s.rect(-140,-177,280,184,wall,INK,8,9)
    # Plank siding on wooden Estonian houses; lime plaster in LV/LT.
    if kind=='ee':
        for yy in (-143,-111,-79,-47,-15):s.line(-127,yy,128,yy,'#a67a5a',4)
    else:
        s.rect(-127,-165,254,12,'#fff4d7','none',0,5)
    # A slightly oversized gable roof with a broad dark navy outline.
    s.poly([(-169,-166),(-18,-303),(16,-303),(167,-167)],roof,INK,10)
    s.poly([(-12,-286),(9,-286),(88,-194),(-95,-194)],'#e0a17d' if kind!='ee' else '#d0a184','none',0)
    s.line(-169,-163,164,-163,INK,9)
    s.rect(82,-284,30,77,wall,INK,6,3)
    if winter:
        s.path('M-158 -176 L-16 -302 Q0 -319 16 -306 L158 -177 Q149 -164 125 -180 L0 -296 L-123 -179 Q-148 -167 -158 -176Z','#f7ffff','#a8cdda',4)
    for wx in [-99,63]:
        s.rect(wx-27,-122,54,58,'#9ed2d2',INK,7,4)
        s.line(wx,-119,wx,-67,INK,4)
        s.line(wx-23,-96,wx+25,-96,INK,4)
        s.path(f'M{wx-21} -108 L{wx-7} -117 L{wx-7} -99 Z','#eff8e9','none',0)
        if winter:s.line(wx-33,-61,wx+33,-61,'#fff',7)
    s.rect(-22,-104,45,113,'#a16c50',INK,7,5)
    s.circle(13,-40,4,'#f5d39c',INK,2)
    s.end()


def fence(s,a,b,y,winter=False):
    # Separated segments; seamless by repeating over boundaries instead of a clipped full-width stroke.
    rail='#aa805e'
    for yy in [y-60,y-36]:
        s.path(f'M{a} {yy} L{b} {yy}', 'none',INK,15)
        s.path(f'M{a} {yy-2} L{b} {yy-2}', 'none',rail,8)
        if winter:s.line(a,yy-12,b,yy-12,'#f4faff',8)
    for x in range(int(a),int(b)+1,120):
        s.rect(x-10,y-79,20,96,'#a87d59',INK,6,4)
        s.path(f'M{x-10} {y-77} L{x} {y-91} L{x+10} {y-77}Z','#e0b78d' if not winter else '#f8ffff',INK,5)


def stone(s,x,y,sc=1,winter=False):
    s.begin(x,y,sc)
    s.path('M-50 2 Q-56 -17 -31 -35 Q-19 -56 12 -40 Q34 -39 51 -13 L45 6 Z','#a0aba4' if not winter else '#b3d1d6',INK,6)
    s.path('M-26 -28 Q-9 -43 10 -33','none','#d5dcd1' if not winter else '#f8fcfd',5)
    if winter:s.path('M-36 -32 Q-15 -60 22 -38 L35 -24 Q-4 -33 -36 -22Z','#fff','none')
    s.end()


def hay(s,x,y,winter=False):
    s.begin(x,y,1)
    s.ellipse(0,-21,56,37,'#e2b35e',INK,6)
    for xx in (-32,-12,16,34):s.line(xx,-47,xx+12,-4,'#b98a4e',3)
    if winter:s.path('M-44 -41 Q-19 -67 12 -54 Q34 -55 49 -34 Q12 -47 -14 -42Z','#fff','#b1d3de',4)
    s.end()


def stork_nest(s,x,y,winter=False):
    s.begin(x,y)
    # Stylised stork nesting pole; no religious symbolism.
    s.path('M-11 3 L-12 -299 Q-9 -311 3 -306 L13 3Z','#b78a63',INK,8)
    s.line(-86,-300,87,-300,INK,11)
    s.path('M-95 -313 Q-80 -348 -43 -341 Q0 -356 36 -342 Q81 -351 100 -317 Q50 -297 0 -297 Q-53 -298 -95 -313Z','#aa7853',INK,7)
    for dx in [-80,-54,-15,30,62,83]:s.line(dx,-322,dx+23,-346,'#6c614b',5)
    if winter:
        s.path('M-90 -331 Q-52 -362 0 -354 Q55 -365 95 -330 Q51 -338 0 -332 Q-54 -341 -90 -331Z','#fff','#b6d8e3',5)
    else:
        # Legs, white body, dark wing, curved neck and unmistakable red beak.
        s.line(12,-354,9,-402,'#b9614b',5)
        s.line(36,-352,39,-400,'#b9614b',5)
        s.path('M-43 -406 Q-44 -456 0 -468 Q53 -470 65 -425 Q58 -399 29 -396 Q15 -377 -9 -398Z','#fbf9e9',INK,8)
        s.path('M-20 -424 Q-38 -449 -16 -459 Q14 -463 44 -441 L48 -427 Q17 -437 -20 -424Z','#283e49',INK,4)
        s.path('M45 -444 Q70 -469 61 -508 Q55 -524 72 -531 Q89 -535 93 -519 L81 -496 Q91 -464 70 -433Z','#f8f9f1',INK,7)
        s.poly([(88,-521),(150,-512),(89,-507)],'#d36f4c',INK,4)
        s.circle(84,-524,4,INK,'none')
    s.end()


def clouds(kind):
    s=SVG(W,600)
    rng=random.Random(190+ord(kind[0]))
    arr=[(105,116,1.10),(515,225,.82),(865,82,.97),(1260,208,1.25),(1750,100,.84),(2070,254,.73)]
    for x,y,sc in arr:
        for offset in (-W,0,W):
            s.begin(x+offset,y,sc)
            s.path('M14 105 Q-2 90 17 70 Q34 56 59 63 Q55 31 89 26 Q113 24 129 45 Q137 7 172 15 Q214 24 211 58 Q242 45 261 68 Q292 75 284 105 Q275 127 247 127 L49 127 Q20 127 14 105Z','#fafffa',INK,6)
            s.path('M33 104 Q79 89 118 108 Q159 89 187 106 Q232 92 264 108 Q235 122 173 120 L55 121 Z','#b7dbe2','none',0)
            s.path('M69 60 Q90 41 110 55 M150 37 Q173 28 191 44','none','#fff',6)
            s.end()
    return s


def sky(kind,winter=False):
    c=COUNTRIES[kind]
    s=SVG(1080,1920)
    colors=c['winter'] if winter else c['sky']
    s.rect(0,0,1080,1920,'url(#sky)')
    x,y=(216,206)
    s.circle(x,y,240,'url(#halo)','none',0)
    for ang in range(0,360,24):
        rr=110 if not winter else 104
        rr2=153 if not winter else 145
        t=ang*pi/180
        s.line(round(x+rr*cos(t)),round(y+rr*sin(t)),round(x+rr2*cos(t)),round(y+rr2*sin(t)),'#fff0a8' if not winter else '#fefdf3',7,extra='opacity=".50"')
    s.circle(x,y,74 if not winter else 67,'#ffe69c' if not winter else '#fff8d9',INK,7)
    s.path(f'M{x-31} {y-29} Q{x-17} {y-53} {x+11} {y-46}', 'none','#fff7d4',7)
    # Barely visible atmosphere, no additional solid foreground shapes.
    s.path('M0 1200 Q280 1177 510 1205 Q795 1232 1080 1204','none','#fff7d7',20,extra='opacity=".18"')
    return s,{"SKYTOP":colors[0],"SKYMID":colors[1],"SKYBOT":colors[2]}


def draw_far(kind,winter=False):
    c=COUNTRIES[kind]
    s=SVG(W,900)
    back= '#b8cfd8' if winter else c['back']
    mid= '#98bac5' if winter else c['mid']
    front='#e2eef0' if winter else c['front']
    ye=draw_hill(s,317 if kind!='lt' else 299,54 if kind!='lt' else 96,1.1,back)
    # Thin far horizon tree belt. No urban silhouettes, signage, logos, or buildings.
    rng=random.Random(2500+{'ee':1,'lv':2,'lt':3}[kind])
    for i in range(29 if kind=='ee' else 22):
        x=rng.randint(0,W)
        y=ye(x)+rng.randint(42,65)
        h=rng.randint(93,174)
        for dx in (-W,0,W):
            if kind=='ee' or (kind=='lt' and i%3==0):pine(s,x+dx,y,h,winter,True)
            else:birch(s,x+dx,y,h*.88,winter)
    middle_y=draw_hill(s,485 if kind!='lt' else 463,63 if kind!='ee' else 39,2.7,mid)
    if winter:
        s.path('M0 595 Q350 548 680 604 T1320 591 T2160 596 L2160 770 L0 770Z','#e8f4f5','none')
        s.path('M0 600 Q360 546 680 604 T1320 591 T2160 600','none','#b5d3e1',5)
    else:
        if kind=='ee':
            s.path('M0 623 Q220 588 410 638 Q570 677 770 619 Q1040 590 1290 634 Q1620 673 1900 601 Q2040 595 2160 623 L2160 845 L0 845Z','#83c9d0',INK,6)
            # Sea ripples and reed-lined shore.
            for xx,yy in [(75,665),(230,722),(480,690),(750,742),(1010,680),(1310,704),(1560,746),(1800,685),(2060,735)]:
                s.path(f'M{xx-45} {yy} q45 -10 90 0', 'none','#c5eff0',6)
            for x in (270,960,1570):s.path(f'M{x-100} 725 Q{x-55} 685 {x+14} 711 Q{x+61} 714 {x+110} 738 L{x+110} 790 L{x-100} 790Z','#9bc17f',INK,5)
        if kind=='lv':
            s.path('M0 650 Q330 572 660 659 Q1070 739 1410 633 Q1750 559 2160 628 L2160 890 L0 890Z','#e8c877',INK,6)
            s.path('M0 749 Q400 692 740 763 Q1210 797 1640 707 Q1920 675 2160 737','none','#bba76b',6)
            for x,y in [(120,720),(465,690),(910,742),(1510,704),(1880,679)]:
                for offs in range(0,170,19):s.line(x+offs,y-6+offs*.08,x+offs+13,y-23+offs*.08,'#f8dfa0',4)
        if kind=='lt':
            s.path('M0 665 Q275 565 680 637 Q1010 708 1260 607 Q1660 540 2160 641 L2160 890 L0 890Z','#eac974',INK,6)
            s.path('M100 746 Q280 682 500 720 Q735 758 965 697 Q1145 670 1260 713 L1280 825 Q700 875 100 815Z','#78c7d0',INK,6)
            s.path('M135 748 Q310 717 480 743 M580 772 Q760 758 910 726','none','#b6e6e3',5)
            for x in range(1280,2070,76):
                s.line(x,716+sin(x/110)*23,x+21,682+sin(x/140)*14,'#d5aa53',4)
    front_y=draw_hill(s,760 if kind=='ee' else 797,48 if kind!='lt' else 72,4.7,front)
    # Gentle contour and field ribbons, one long ribbon per country, repeated at tile edge.
    if winter:
        s.path('M0 845 Q385 800 810 838 Q1240 869 1620 827 Q1930 811 2160 838','none','#aecfd9',9)
        for x,y in [(360,840),(770,816),(1440,853),(1910,835)]:s.ellipse(x,y,45,9,'#fafffc')
    else:
        if kind=='ee':
            for x,y in [(200,810),(650,825),(1210,825),(1750,820)]:
                s.path(f'M{x} {y} q62 -18 122 -3','none','#c4df8b',9)
        else:
            for x,y in [(190,830),(635,810),(1210,818),(1760,825)]:
                s.path(f'M{x-60} {y} q68 -13 138 -8','none','#efdd90',11)
    # Short treeline in front of the distant fields.
    for i in range(12 if kind=='ee' else 15):
        x=rng.randint(0,W)
        y=front_y(x)+rng.randint(-15,16)
        if kind=='ee': pine(s,x,y,rng.randint(117,220),winter)
        elif kind=='lv': birch(s,x,y,rng.randint(130,205),winter)
        elif i%2: broadleaf(s,x,y,rng.randint(118,192),winter)
        else:pine(s,x,y,rng.randint(114,210),winter)
    return s


def draw_near(kind,winter=False):
    s=SVG(W,720)
    c=COUNTRIES[kind]
    # Land strip at y~535, bottom fills frame; multiple layers form roadside depth.
    fieldcolor='#e0ebeb' if winter else ('#c1d48c' if kind=='ee' else '#d2db88' if kind=='lv' else '#d5d77d')
    back=draw_hill(s,513,22,1.1,fieldcolor,720,True)
    # Fences and scenery are behind the close green verge.
    for x1,x2,yy in [(28,326,558),(865,1150,554),(1460,1690,568),(1910,2070,562)]:
        for dx in (-W,0,W):fence(s,x1+dx,x2+dx,yy,winter)
    placements = {
      'ee':[('pine',100,566,350),('shrub',304,555,126),('house',559,565,1.04),('stone',893,561,1.00),('pine',1094,575,355),('birch',1403,565,290),('house',1650,567,.80),('pine',2010,564,285)],
      'lv':[('birch',154,567,393),('shrub',355,570,122),('house',602,561,1.06),('hay',882,567,1),('birch',1086,570,344),('pine',1312,565,290),('house',1638,567,.77),('birch',1999,571,317)],
      'lt':[('shrub',130,564,143),('stork',390,570,1),('house',690,567,1.04),('tree',1085,566,340),('hay',1294,575,1),('stork',1605,560,.85),('pine',1970,571,312)]
    }
    for t,x,y,m in placements[kind]:
        for dx in (-W,0,W):
            x2=x+dx
            if t=='pine':pine(s,x2,y,m,winter)
            elif t=='birch':birch(s,x2,y,m,winter)
            elif t=='tree':broadleaf(s,x2,y,m,winter)
            elif t=='shrub':shrub(s,x2,y,w=m,h=m*.50,winter=winter)
            elif t=='house':house(s,x2,y,kind,winter,size=m)
            elif t=='stone':stone(s,x2,y,m,winter)
            elif t=='hay':hay(s,x2,y,winter)
            elif t=='stork':
                s.begin(x2,y,m)
                stork_nest(s,0,0,winter)
                s.end()
    # Dense front grass gently masks bases; must be kept below fences & main features.
    ground='#ecf7f7' if winter else '#78b879' if kind=='ee' else '#8fbc71' if kind=='lv' else '#97c37a'
    draw_hill(s,605,18,4.3,ground,720,True)
    r=random.Random(1312+{'ee':10,'lv':20,'lt':30}[kind])
    for j in range(105):
        x=r.randint(8,W-8)
        y=r.randint(612,705)
        if j%11==0:
            stone(s,x,y, r.uniform(.16,.31),winter)
        else:
            grass(s,x,y,r.uniform(.50,.93),winter)
    # Fine meadow stones or white drifts close to bottom, no labels or logos.
    if winter:
        for x,y,rx in [(80,655,68),(350,685,102),(840,666,98),(1310,702,83),(1700,676,100),(2050,680,84)]:
            s.ellipse(x,y,rx,15,'#f7ffff','none')
    else:
        for x,y in [(205,644),(800,651),(1140,669),(1550,651),(1880,654)]:
            s.circle(x,y,7,'#f9e7b0',INK,2)
            s.circle(x+14,y-5,5,'#f6f3ed','none')
    return s


def road(kind):
    s=SVG(1080,330)
    # 0..99 transparent: allow near scenery to reach roadside. 100..149: grass.
    s.path('M0 111 Q180 102 360 114 Q620 100 800 112 Q944 103 1080 111 L1080 150 L0 150 Z','#9bbf7e','none')
    s.rect(0,125,1080,25,'#d0c39a')
    for x in range(42,1080,113):
        grass(s,x,126,scale=.5,winter=False)
    # Row 150 begins solid dark asphalt. 0..149 contains no continuous dark band.
    s.rect(0,150,1080,180,'#465260')
    s.rect(0,150,1080,8,INK)
    s.rect(0,160,1080,3,'#637585')
    s.rect(0,216,1080,3,'#566576')
    s.rect(0,325,1080,5,'#324454')
    # White roadside markings: repetition exactly each full tile.
    for x in range(42,1080,216):
        s.rect(x,258,104,9,'#fff6d9',rx=4)
    # Asphalt horizontal highlights; do not place brand marks.
    for x in range(100,1080,265):s.line(x,300,x+95,300,'#536473',3)
    return s


def save_svg(svg:SVG,path:Path, replacements=None,seam=False,opaque=False):
    markup=svg.raw(replacements)
    png=cairosvg.svg2png(bytestring=markup.encode('utf-8'),output_width=svg.width,output_height=svg.height)
    img=Image.open(BytesIO(png)).convert('RGBA')
    if seam:
        # Explicitly copy the first into the final column for bit-exact X tiling.
        img.paste(img.crop((0,0,1,img.height)),(img.width-1,0))
    if opaque:img=img.convert('RGB')
    path.parent.mkdir(parents=True,exist_ok=True)
    img.save(path,'PNG',compress_level=9,optimize=True,icc_profile=ICC)
    print(f'  {path.relative_to(ROOT)}  {img.size}, {img.mode}  {path.stat().st_size//1024} KiB')


def make_preview(kind,winter=False):
    folder=DEST/kind
    sky_img=Image.open(folder/(kind+('-sky-zima.png' if winter else '-sky.png'))).convert('RGBA')
    # Art coordinates are @3x; logical layer anchors from docs/art/WARSTWY.md.
    composition=[('clouds',330),('far-zima' if winter else 'far',765),('near-zima' if winter else 'near',1254),('road',1590)]
    for key,y in composition:
        tile=Image.open(folder/f'{kind}-{key}.png').convert('RGBA')
        sky_img.alpha_composite(tile.crop((0,0,1080,tile.height)),(0,y))
    p=PREVIEW_DIR/f'countries-{kind}-preview{"-zima" if winter else ""}.png'
    sky_img.convert('RGB').save(p,'PNG',optimize=True,compress_level=9,icc_profile=ICC)
    print('  '+str(p.relative_to(ROOT)))


def write_manifest(kind):
    c=COUNTRIES[kind]
    folder=DEST/kind
    parts=[('sky','1080×1920','Pełnoekranowy gradient nieba ze słońcem po lewej stronie'),('clouds','2160×600','Chmury na alfie, kafelkowanie poziome'),('far','2160×900','Dalsze krajobrazy bez budynków miejskich, alfa, kafelkowanie X'),('near','2160×720','Zabudowa wiejska / drzewa / pobocza, alfa, kafelkowanie X'),('road','1080×330','Asfalt od wiersza 150, kafelkowanie X'),('sky-zima','1080×1920','Śnieżna kolorystyka nieba'),('far-zima','2160×900','Zimowy daleki krajobraz, alfa, kafelkowanie X'),('near-zima','2160×720','Zimowa przydrożna sceneria, alfa, kafelkowanie X')]
    traits={
        'ee':'Lasy sosnowe, wybrzeże z płytkimi zatoczkami, kamienie i drewniane domy.',
        'lv':'Lasy brzozowe, łany zbóż, pastwiska, płoty, czerwone dachy i bele siana.',
        'lt':'Falujące pagórki, jezioro, pola, czerwone dachy oraz bociany na gniazdach (zimą gniazda puste).',
    }
    rows='\n'.join(f'| `{kind}-{suffix}.png` | {wh} | Rysunek SVG wygenerowany programatycznie przez ChatGPT, CairoSVG → Pillow | Oryginalna grafika projektu | {desc} |' for suffix,wh,desc in parts)
    traits_en={
        'ee': 'Estonian pine forests, Baltic sea shoreline with coves and stones, rural timber cottages.',
        'lv': 'Latvian birch groves, golden fields, hay bales, wooden fences and red-tiled farm roofs.',
        'lt': 'Lithuanian rolling hills, quiet lakes, farmland, red-roof cottages and storks nesting on poles (nests empty in winter).',
    }
    prompt=f'''Create a family-friendly 2D vector mobile-game background for {c["name"]} ({kind.upper()}), warm pastel colors, flat clean illustrations, thick dark navy outlines #1d2f3b, sun from upper left, distinct landscape: {traits_en[kind]} Separate opaque sky and transparent horizontally tileable cloud, far countryside, near roadside and asphalt layers. Create summer and snowy winter variants. No text, brands, logos, flags, coats of arms, urban skyline, religious roadside crosses. Export at @3x and respect exact asphalt top row 150.''' 
    text=f'''# {c["name"]} ({kind.upper()}) — warstwy kraju tranzytowego, zlecenie 102

**Data utworzenia:** 2026-10-31. **Autor:** ChatGPT / OpenAI — autorskie rysunki wektorowe, ręczne zaprojektowanie geometrii i zaprogramowanie generatora. **Narzędzia:** GPT Image (wstępna tablica referencyjna), Python 3, autorskie SVG, CairoSVG, Pillow (finalne PNG). **Licencja:** oryginalne zasoby przekazane do wykorzystania w projekcie Cebulak Express, niepochodzące z cudzych bibliotek ani zdjęć. Wizualna tablica referencyjna GPT Image nie jest dołączona do zasobów uruchomieniowych. Nie zastosowano zewnętrznych fontów, logotypów ani materiałów na odrębnych licencjach.

## Paleta / brief graficzny

{traits[kind]}

**Prompt projektowy (angielski):**

> {prompt}

## Pliki, źródła, licencja

| Plik | Rozmiar PNG | Źródło / narzędzie | Licencja | Autor / uwagi |
|---|---|---|---|---|
{rows}

Podglądy złożonych warstw (również autorskie, ta sama licencja): `docs/art/podglady/countries-{kind}-preview.png` i `docs/art/podglady/countries-{kind}-preview-zima.png` (1080×1920). Skrypt źródłowy we wszystkich krajach: `public/assets/countries/ee/generate_baltic.py` (samodzielny generator wszystkich trzech zestawów, Python 3 + CairoSVG + Pillow).

## Integracja / geometria

| Warstwa | Kotwica Y (logiczne) | Parallax | Format |
|---|---:|---:|---|
| `sky` | 0 | 0 | PNG 1080×1920, RGB, nie kafelkować |
| `clouds` | 110 | 0.15 | PNG 2160×600, RGBA, kafelkowanie X |
| `far` | 255 | 0.25 | PNG 2160×900, RGBA, kafelkowanie X |
| `near` | 418 | 0.5 | PNG 2160×720, RGBA, kafelkowanie X |
| `road` | 530 | 1.0 | PNG 1080×330, RGBA, kafelkowanie X |

Asfalt we wszystkich krajach rozpoczyna się **ściśle w wierszu 150** (y = 530 + 150/3 = **580** pikseli logicznych) i jest nieprzezroczysty do dolnej krawędzi. Wiersze 0–99 w `road` pozostają przezroczyste, 100–149 to pobocze/trawa (bez ciągłego pasa asfaltu). Pierwsza i ostatnia kolumna kafelków mają identyczne piksele. Wersja zimowa podmienia wyłącznie `sky`, `far`, `near`; chmury i droga są współdzielone, zgodnie z kontraktem repozytorium.

**Regeneracja (katalog główny projektu):**

```bash
python3 public/assets/countries/ee/generate_baltic.py
```

## Kontrola jakości

Sprawdzono programowo rozmiary, obecność kanału alfa, pikselową zgodność lewej i prawej kolumny w kafelkach, nieprzezroczystość nieba oraz asfaltu od wiersza 150. Podgląd jest złożony z oryginalnych warstw przy x=0, zgodnie z `docs/art/WARSTWY.md`; bez UI, pojazdu i przeszkód.

**Uwaga dla koordynatora:** dla EE/LV/LT zweryfikować ładowanie wariantów `-zima` w `src/render/assets.ts` oraz pozycję `road` na y=530; zmiany w rendererze nie należą do zlecenia 102.
'''
    (folder/'ASSETS.md').write_text(text,encoding='utf-8')


def run():
    DEST.mkdir(parents=True,exist_ok=True)
    PREVIEW_DIR.mkdir(parents=True,exist_ok=True)
    for kind in COUNTRIES:
        print('\n'+kind.upper())
        folder=DEST/kind
        for winter in (False,True):
            suffix='-zima' if winter else ''
            ss,repl=sky(kind,winter)
            save_svg(ss,folder/f'{kind}-sky{suffix}.png',repl,opaque=True)
            save_svg(draw_far(kind,winter),folder/f'{kind}-far{suffix}.png',seam=True)
            save_svg(draw_near(kind,winter),folder/f'{kind}-near{suffix}.png',seam=True)
        save_svg(clouds(kind),folder/f'{kind}-clouds.png',seam=True)
        save_svg(road(kind),folder/f'{kind}-road.png',seam=True)
        write_manifest(kind)
        for winter in (False,True):make_preview(kind,winter)
    print('\nDone:',DEST)


ICC=ImageCms.ImageCmsProfile(ImageCms.createProfile('sRGB')).tobytes()
if __name__=='__main__':run()
