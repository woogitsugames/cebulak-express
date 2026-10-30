#!/usr/bin/env python3
"""Zlecenie 56: oryginalne ilustracje SVG -> PNG @3x, bez zaleznosci npm.
Uruchom z dowolnego katalogu: python3 public/assets/countries/es/generate_south.py
Wymagane: pillow, cairosvg (tylko narzedzia deweloperskie).
"""
from __future__ import annotations
import io
import math
import random
from pathlib import Path
from xml.sax.saxutils import escape
import cairosvg
from PIL import Image, ImageDraw
from PIL.PngImagePlugin import PngInfo

ROOT = Path(__file__).resolve().parents[4]
COUNTRIES = ROOT / 'public/assets/countries'
LANDMARKS = ROOT / 'public/assets/landmarks'
PREVIEWS = ROOT / 'docs/art/podglady'
DARK = '#27354C'
LINE = '#3A4A5D'
CLOUDLINE = '#62768A'
WHITE = '#FFFAEB'

PALETTES = {
    'es': dict(sky='#92C5E6', horizon='#FBE6BA', far='#E7C18A', hill='#DBAE7C', near='#87AD79', grass='#648E70', highlight='#FFE1A1', wall='#FFF3D9', roof='#BE6755', foliage='#688F6C', leaf='#91A66F', snow='#F7FAFA'),
    'it': dict(sky='#91C1DC', horizon='#F8E3BE', far='#B9C998', hill='#9DB88B', near='#80B17B', grass='#619970', highlight='#F6CF86', wall='#F8E2C0', roof='#C8755D', foliage='#4E8265', leaf='#7FA678', snow='#F7FBFE'),
    'at': dict(sky='#8FBDE0', horizon='#E3F0E8', far='#A9C7C2', hill='#8CAE9C', near='#87B87E', grass='#62A083', highlight='#F1D7A0', wall='#F3DFBF', roof='#A45F5A', foliage='#4F827B', leaf='#78A49B', snow='#F4FAFE'),
    'cz': dict(sky='#A0C6DD', horizon='#F4E8C4', far='#B9CCB0', hill='#9FB89B', near='#86B186', grass='#5E9774', highlight='#F1D89A', wall='#FBE5CD', roof='#B95F55', foliage='#537B72', leaf='#7B9E83', snow='#F7FBFD'),
}

class Drawing:
    def __init__(self, w, h):
        self.w = w
        self.h = h
        self.s = []
    def add(self, item):
        self.s.append(item)
    def shape(self, element, *, fill, stroke=DARK, sw=2.0, **attrs):
        props = ' '.join(f'{k.replace("_", "-")}="{v}"' for k,v in attrs.items() if v is not None)
        self.s.append(f'<{element} {props} fill="{fill}" stroke="{stroke if stroke else "none"}" stroke-width="{sw}" stroke-linejoin="round" stroke-linecap="round"/>')
    def path(self, d, fill, stroke=DARK, sw=2.1):
        self.shape('path', d=d, fill=fill, stroke=stroke, sw=sw)
    def rect(self, x, y, w, h, fill, stroke=DARK, sw=2, rx=None):
        self.shape('rect', x=round(x,2), y=round(y,2), width=round(w,2), height=round(h,2), rx=rx, fill=fill, stroke=stroke, sw=sw)
    def circle(self, x, y, r, fill, stroke=DARK, sw=2):
        self.shape('circle', cx=round(x,2), cy=round(y,2), r=round(r,2), fill=fill, stroke=stroke, sw=sw)
    def ellipse(self, x, y, rx, ry, fill, stroke=DARK, sw=2):
        self.shape('ellipse', cx=x, cy=y, rx=rx, ry=ry, fill=fill, stroke=stroke, sw=sw)
    def line(self, x1, y1, x2, y2, stroke=DARK, sw=2):
        self.path(f'M {x1} {y1} L {x2} {y2}', 'none', stroke, sw)
    def polygon(self, pts, fill, stroke=DARK, sw=2):
        self.shape('polygon', points=' '.join(f'{x:.2f},{y:.2f}' for x,y in pts), fill=fill, stroke=stroke, sw=sw)
    def xml(self):
        return f'<svg xmlns="http://www.w3.org/2000/svg" width="{self.w * 3}" height="{self.h * 3}" viewBox="0 0 {self.w} {self.h}">'+''.join(self.s)+'</svg>'

def rgba_png(d, path, *, tile=False):
    path.parent.mkdir(parents=True, exist_ok=True)
    src = cairosvg.svg2png(bytestring=d.xml().encode('utf-8'),output_width=d.w * 3,output_height=d.h * 3)
    im = Image.open(io.BytesIO(src)).convert('RGBA')
    if tile:
        # Usun piktogramowy szew antyaliasingu na granicy kafelka.
        im.paste(im.crop((0,0,1,im.height)),(im.width-1,0))
    meta=PngInfo();meta.add(b'sRGB', b'\x00')
    im.save(path, format='PNG', optimize=True, compress_level=9, pnginfo=meta)
    return im

def plain(d, x,y,w,h, color):
    d.rect(x,y,w,h,color,None,0)

def cloudy(d,x,y, scale=1, winter=False):
    def one(xx):
        v = '#EDF5F5' if winter else '#FDF8E6'
        shadow = '#CCDCE8' if winter else '#DCE5DE'
        d.ellipse(xx+7*scale,y+14*scale,37*scale,12*scale,shadow,CLOUDLINE,1.7)
        d.circle(xx-8*scale,y+8*scale,18*scale,v,CLOUDLINE,1.7)
        d.circle(xx+11*scale,y-2*scale,24*scale,v,CLOUDLINE,1.7)
        d.circle(xx+39*scale,y+8*scale,17*scale,v,CLOUDLINE,1.7)
        d.path(f'M {xx-23*scale} {y+14*scale} Q {xx+5*scale} {y+27*scale} {xx+54*scale} {y+18*scale}', 'none', '#DBE7E0' if not winter else '#CADBE3',1.5)
    for off in (-d.w,0,d.w): one(x+off)

def small_bird(d,x,y):
    d.path(f'M {x-10} {y} q 7 -7 13 0 q 8 -7 16 0','none',CLOUDLINE,1.7)

def sun(d,x,y,winter=False):
    color = '#FFF9D7' if winter else '#FFD87A'
    outer = '#FFFCDB' if winter else '#FFEAB1'
    d.circle(x,y,36,outer,'none',0)
    d.circle(x,y,29,color,'#D4A96A' if not winter else '#B7CFD7',2)
    for k in range(8):
        a=2*math.pi*k/8
        d.line(round(x+41*math.cos(a),2),round(y+41*math.sin(a),2),round(x+48*math.cos(a),2),round(y+48*math.sin(a),2), '#D4A96A' if not winter else '#B7CFD7',2.2)

def fir(d,x,y,s=1, winter=False):
    d.rect(x-3*s,y-5*s,6*s,17*s,'#9B7860',DARK,1.5)
    c = '#5D8F7D' if not winter else '#5D8896'
    for off,size in [(0,13),(9,17),(19,21)]:
        d.polygon([(x,y-(25-off)*s),(x-size*s,y+(6+off)*s),(x+size*s,y+(6+off)*s)],c,DARK,1.8)
        if winter:
            d.path(f'M {x-10*s} {y-(7-off)*s} Q {x} {y-(13-off)*s} {x+10*s} {y-(7-off)*s}','none','#F9FCFD',3)

def cypress(d,x,y,s=1):
    d.rect(x-2*s,y-15*s,4*s,25*s,'#896B55',DARK,1.5)
    d.path(f'M {x} {y-73*s} Q {x-12*s} {y-45*s} {x-9*s} {y-12*s} Q {x} {y} {x+9*s} {y-12*s} Q {x+13*s} {y-47*s} {x} {y-73*s} Z','#477B67',DARK,2)
    d.path(f'M {x-3*s} {y-55*s} Q {x-8*s} {y-25*s} {x-2*s} {y-18*s}','none','#76AA83',2)

def olive(d,x,y,s=1,winter=False):
    d.path(f'M {x} {y} l {-3*s} {-23*s} m {3*s} {12*s} l {12*s} {-18*s} m {-10*s} {14*s} l {-12*s} {-11*s}', 'none',DARK,3*s)
    for xx,yy,rr in [(-11,-35,15),(4,-43,20),(18,-30,16),(-6,-25,13)]:
        d.circle(x+xx*s,y+yy*s,rr*s, '#9BAF8A' if not winter else '#B4CBD0',DARK,1.8)
    d.path(f'M {x-21*s} {y-34*s} Q {x-6*s} {y-53*s} {x+12*s} {y-46*s}', 'none','#CFD3A0' if not winter else '#FAFCFE',2.2)

def palm(d,x,y,s=1,winter=False):
    d.path(f'M {x} {y} Q {x+4*s} {y-33*s} {x+9*s} {y-57*s}', 'none', '#8E6E55', 5*s)
    for a in [-154,-116,-70,-28,6,45]:
        rad=math.radians(a)
        ox=math.cos(rad)*37*s; oy=math.sin(rad)*23*s
        d.path(f'M {x+9*s} {y-57*s} Q {x+9*s+ox/2} {y-65*s+oy/2} {x+9*s+ox} {y-57*s+oy} Q {x+10*s+ox/2} {y-52*s+oy/2} {x+9*s} {y-57*s} Z', '#639B78' if not winter else '#96B6B6',DARK,1.6)

def house(d,x,y,scale=1,p=None,winter=False,balkon=False):
    if p is None: p=PALETTES['es']
    width=38*scale;height=32*scale
    d.rect(x,y-height,width,height,p['wall'],DARK,2)
    d.polygon([(x-3,y-height),(x+width/2,y-height-15*scale),(x+width+3,y-height)], '#C86655' if not winter else '#B87873',DARK,2.3)
    if winter:
        d.path(f'M {x-3} {y-height} L {x+width/2} {y-height-15*scale} L {x+width+3} {y-height}','none','#FFFDFC',3.4)
    d.rect(x+7*scale,y-25*scale,9*scale,11*scale,'#9FC1C2',DARK,1.5)
    d.rect(x+24*scale,y-25*scale,8*scale,11*scale,'#9FC1C2',DARK,1.5)
    d.rect(x+16*scale,y-14*scale,9*scale,14*scale,'#A36E63',DARK,1.4)
    if balkon:
        d.line(x+4*scale,y-13*scale,x+width-3*scale,y-13*scale,'#745C52',2.3)
        for i in (6,15,24,33): d.line(x+i*scale,y-13*scale,x+i*scale,y-22*scale,'#745C52',1.6)

def village(d,x,y,p,winter=False):
    for dx,sy,scale in [(-42,-3,.75),(-12,5,.95),(23,-2,.70)]:
        house(d,x+dx,y+sy,scale,p,winter)

def mill(d,x,y,s=1,winter=False):
    d.polygon([(x-11*s,y),(x-7*s,y-53*s),(x+8*s,y-53*s),(x+12*s,y)], '#F8F0D8' if not winter else '#F4F6F6', DARK,2)
    d.polygon([(x-9*s,y-53*s),(x,y-65*s),(x+10*s,y-53*s)],'#AC6956',DARK,2)
    d.circle(x,y-38*s,5*s,'#E2C78E',DARK,1.6)
    for ang in (0,90,180,270):
        a=math.radians(ang)
        x1=x+6*math.cos(a)*s; y1=y-38*s+6*math.sin(a)*s
        x2=x+34*math.cos(a)*s; y2=y-38*s+34*math.sin(a)*s
        d.line(round(x1,2),round(y1,2),round(x2,2),round(y2,2),DARK,2)
        d.polygon([(x2,y2),(x2-5*s*math.sin(a),y2+5*s*math.cos(a)),(x1-5*s*math.sin(a),y1+5*s*math.cos(a)),(x1,y1)], '#E9D9BA',DARK,1.2)

def tower(d,x,y,s=1,roof='#B96055'):
    d.rect(x-12*s,y-70*s,24*s,70*s,'#F6DEC0',DARK,2.2)
    d.polygon([(x-17*s,y-70*s),(x,y-91*s),(x+17*s,y-70*s)],roof,DARK,2)
    for yy in (y-51*s,y-29*s):
        d.rect(x-5*s,yy,10*s,14*s,'#91B3B0',DARK,1.5,rx=2*s)

def castle(d,x,y,s=1,p=None,winter=False):
    p=p or PALETTES['cz']
    d.path(f'M {x-62*s} {y} L {x-62*s} {y-38*s} L {x-43*s} {y-38*s} L {x-43*s} {y-47*s} L {x+42*s} {y-47*s} L {x+42*s} {y-36*s} L {x+62*s} {y-36*s} L {x+62*s} {y} Z',p['wall'],DARK,2)
    for xx in (-47,49): tower(d,x+xx*s,y-22*s,.64, p['roof'])
    d.rect(x-16*s,y-63*s,32*s,63*s,p['wall'],DARK,2)
    d.polygon([(x-22*s,y-63*s),(x,y-87*s),(x+22*s,y-63*s)],p['roof'],DARK,2)
    for xx in (-28,-8,11,29): d.rect(x+xx*s,y-35*s,8*s,13*s,'#98B4AC',DARK,1.1,rx=2*s)
    if winter: d.path(f'M {x-22*s} {y-63*s} L {x} {y-87*s} L {x+22*s} {y-63*s}','none','#FCFEFF',4)

def chalet(d,x,y,s=1,p=None,winter=False):
    p=p or PALETTES['at']
    d.rect(x-24*s,y-33*s,48*s,33*s,p['wall'],DARK,2)
    d.polygon([(x-31*s,y-33*s),(x,y-59*s),(x+31*s,y-33*s)], '#B56F56',DARK,2.5)
    if winter:d.path(f'M {x-31*s} {y-33*s} L {x} {y-59*s} L {x+31*s} {y-33*s}','none','#F9FCFD',4)
    d.line(x-24*s,y-15*s,x+24*s,y-15*s,'#725B56',2)
    for xx in (-13,0,13):
        d.rect(x+(xx-4)*s,y-29*s,9*s,10*s,'#99BFC0',DARK,1.4)
        d.line(x+xx*s,y-15*s,x+xx*s,y-8*s,'#6E5A52',1.3)
    d.rect(x-4*s,y-14*s,8*s,14*s,'#A87961',DARK,1.5)

def hills(d,w,h,y,amp,cycles,fill,outline=True):
    xs=[i*w/128 for i in range(129)]
    ys=[y+amp*math.sin(2*math.pi*cycles*(x/w))+amp*.24*math.sin(4*math.pi*cycles*(x/w)) for x in xs]
    line=' '.join(f'L {x:.2f} {v:.2f}' for x,v in zip(xs,ys))
    d.path(f'M 0 {h} L 0 {ys[0]:.2f} {line} L {w} {h} Z',fill,None,0)
    if outline: d.path(f'M 0 {ys[0]:.2f} {line}', 'none', DARK,2)
    return lambda x: y+amp*math.sin(2*math.pi*cycles*(x/w))+amp*.24*math.sin(4*math.pi*cycles*(x/w))

def mountain_range(d,p,winter=False,base=230, peaks=None, scale=1):
    peaks=peaks or [(20,113),(130,86),(232,125),(345,67),(459,100),(568,76),(685,107)]
    if d.w == 720:
        # Szczyty gorskie w odcinku okresowym, bez przeskoku wysokosci przy kafelkowaniu.
        peaks=[(128,85 if base <= 220 else 130),(248,111),(337,74 if base <= 220 else 129),(458,128),(554,95)]
        xx=[(0,170),(48,170)]+peaks+[(652,169),(720,170)]
    else:
        xx=[(-110,base)]+peaks+[(d.w+110,base)]
    color='#A1BEBF' if not winter else '#AFC7D4'
    d.polygon(xx+[(d.w+110,base+75),(-110,base+75)],color,None,0)
    d.path('M '+ ' L '.join(f'{x} {y}' for x,y in xx),'none',DARK,2.2)
    for x,y in peaks:
        d.polygon([(x-23,y+33),(x,y),(x+24,y+33),(x+9,y+24),(x,y+17),(x-10,y+23)], '#F2F8F4' if not winter else '#FAFDFF',None,0)
        d.line(x-23,y+33,x,y,'#D7E7E5',1)

def make_sky(cc,winter):
    p=PALETTES[cc]; d=Drawing(360,640)
    d.rect(0,0,360,640,'#B4D1E5' if winter else p['sky'],None,0)
    d.path('M 0 335 Q 180 310 360 350 L 360 640 L 0 640 Z', '#E8F0EC' if winter else p['horizon'],None,0)
    d.path('M 0 430 Q 170 407 360 440 L 360 640 L 0 640 Z', '#E2EDEB' if winter else '#F9EBCB',None,0)
    sun(d,76,105,winter)
    d.path('M 238 150 Q 269 139 292 151', 'none', '#BCD8DD' if winter else '#F9E2BF',1.5)
    d.path('M 269 168 Q 295 155 327 163','none','#BCD8DD' if winter else '#F8E2BC',1.5)
    if winter:
        rng=random.Random(61+list(PALETTES).index(cc))
        for _ in range(54):
            x=rng.randrange(12,348);y=rng.randrange(12,530);r=rng.choice([1.0,1.1,1.6]);d.circle(x,y,r,'#EAF6F8',None,0)
    return d

def make_clouds(cc):
    d=Drawing(720,200)
    for x,y,s in [(31,67,.8),(175,46,.72),(342,85,1.05),(528,35,.82),(671,101,.61)]:
        cloudy(d,x,y,s)
    for x,y in [(280,145),(612,153)]:small_bird(d,x,y)
    return d

def make_far(cc,winter):
    p=PALETTES[cc];d=Drawing(720,300)
    if cc in ('at','it'):
        mountain_range(d,p,winter,210 if cc=='at' else 235, [(20,115),(137,76 if cc=='at' else 135),(246,107),(337,57 if cc=='at' else 121),(450,114),(552,89),(676,126)])
    else:
        hills(d,720,300,176 if cc=='es' else 170,31,2,'#F0D4A8' if cc=='es' and not winter else '#C8DCD8' if winter else p['far'])
    h1=hills(d,720,300,210,27,2, '#DBE7E8' if winter else p['hill'])
    h2=hills(d,720,300,260,18,3, '#EFF5F4' if winter else p['far'])
    if cc=='es':
        for x in (80,155,350,450,610):olive(d,x,h1(x)-4,.58,winter)
        for x in (136,400):village(d,x,h1(x)-21,p,winter)
        mill(d,572,h1(572)-10,.70,winter)
        for x in range(35,710,80):
            d.path(f'M {x} 275 q 15 -8 29 -1', 'none', '#CED8BC' if winter else '#F3DBA7',2)
    elif cc=='it':
        for x in [45,118,196,300,389,472,567,653]: cypress(d,x,h1(x)-4,.46)
        for center in [105,255,410,565]:
            for i in range(4):
                y=241+i*11
                d.path(f'M {center-80} {y} q 65 -15 140 -2','none','#B5CCD0' if winter else '#779E75',2)
        village(d,366,h1(366)-20,p,winter)
    elif cc=='at':
        for x in [95,172,291,404,572,651]:fir(d,x,h1(x),.64,winter)
        chalet(d,225,h1(225)+3,.8,p,winter)
        chalet(d,528,h1(528)+1,.75,p,winter)
        # Blada wstega Dunaju, zakrzywiona, nie nachodzi na szczyty.
        d.path('M 0 280 Q 210 259 340 282 T 720 277 L 720 300 L 0 300 Z', '#D8F0F2' if winter else '#8DCDCC', '#518B9D',1.6)
        d.path('M 0 290 Q 250 270 410 291 T 720 287','none','#F6FBF7',2)
    elif cc=='cz':
        for x in [55,125,280,355,545,635]:fir(d,x,h1(x)+3,.55,winter)
        castle(d,216,h1(216)+1,.64,p,winter)
        village(d,500,h1(500)-10,p,winter)
    return d

def make_near(cc,winter):
    p=PALETTES[cc];d=Drawing(720,240)
    h1=hills(d,720,240,139,20,3, '#D8E7E4' if winter else p['near'])
    h2=hills(d,720,240,187,11,4, '#EAF1EC' if winter else p['grass'])
    if cc=='es':
        for x in (44,178,288,433,572,682):olive(d,x,h1(x)+8,.84,winter)
        palm(d,362,h1(362)+5,.84,winter)
        house(d,511,h1(511)+12,.85,p,winter)
        for x in (100,236,610):
            d.path(f'M {x} {h1(x)+30} l 18 -4 l 12 3','none', '#D0DBD1' if winter else '#E5C596',2)
    elif cc=='it':
        for x in (35,121,207,361,441,590,700):cypress(d,x,h1(x)+10,.62)
        for x in (280,505):
            for k in range(3):d.path(f'M {x-65} {185+k*9} q 55 -20 115 -4','none','#C6DDD4' if winter else '#9BC188',1.5)
        house(d,320,h1(320)+8,.83,p,winter)
    elif cc=='at':
        for x in (34,100,231,350,423,563,682):fir(d,x,h1(x)+4,.74,winter)
        chalet(d,180,h1(180)+12,.82,p,winter)
        chalet(d,503,h1(503)+10,.85,p,winter)
        d.path('M 0 213 Q 200 197 350 217 T 720 213','none','#CEE9EB' if winter else '#A2D5BF',3)
    else:
        for x in (44,110,188,320,418,504,611,682):fir(d,x,h1(x)+5,.63,winter)
        for x in (250,550):house(d,x,h1(x)+11,.83,p,winter)
        # Kamienny plocik przy skraju pola.
        for x in range(22,720,45):
            d.rect(x,206,4,19,'#B0AC9E',DARK,1.2)
        d.path('M 0 208 H 720','none','#9DAD9F',2)
    # Wspolne zdzbla i ziarna na pierwszym planie, bez swiatla fotograficznego.
    for x in range(12,720,47):
        y=223+int(4*math.sin(x/31))
        d.path(f'M {x} {y} l -4 -9 m 4 9 l 4 -6','none','#B5C9C7' if winter else '#B5CF9F',1.8)
    if winter:
        for x in (20,120,213,330,430,540,645):
            y=h2(x)+2
            d.path(f'M {x-34} {y} Q {x} {y-12} {x+27} {y-2}', 'none','#FDFEFF',4)
        for x in (81,290,487,662):
            d.circle(x,188,2.1,'#FFFFFF',None,0)
    return d

def make_road(cc):
    p=PALETTES[cc];d=Drawing(360,110)
    # Transparentne niebo/pobocze do wiersza 139; ani piksela asfaltu wyzej.
    plain(d,0,46,360,4,'#C5BBA4' if cc=='es' else '#9DAEA7')
    # Jest to dokladnie wiersz 150 fizycznego PNG @3x.
    plain(d,0,50,360,60,'#5D6671')
    plain(d,0,107,360,3,'#56606D')
    # Pasy sa co 120 px logicznych; rozbicie przy brzegach jest okresowe.
    for x in range(18,380,120):
        d.rect(x,78,64,6,'#FFF0CA',None,0,rx=2)
        d.rect(x+4,79,55,2,'#FFFBEE',None,0,rx=1)
    return d

def render_backgrounds():
    for cc in PALETTES:
        for winter in (False, True):
            for layer in ('sky','far','near'):
                p=COUNTRIES / cc / f'{cc}-{layer}{"-zima" if winter else ""}.png'
                drawing={'sky':make_sky,'far':make_far,'near':make_near}[layer](cc,winter)
                rgba_png(drawing,p,tile=(layer!='sky'))
                print(p.relative_to(ROOT),round(p.stat().st_size/1024),'KiB',flush=True)
        for layer,d in [('clouds',make_clouds(cc)),('road',make_road(cc))]:
            p=COUNTRIES/cc/f'{cc}-{layer}.png'
            rgba_png(d,p,tile=True)
            print(p.relative_to(ROOT),round(p.stat().st_size/1024),'KiB',flush=True)

# --- Panoramy miast: osobne sylwetki, czytelne w skali 330x183 --
def city_base(d,cc,variant=0):
    p=PALETTES[cc]
    d.path('M 0 257 Q 85 232 170 254 T 330 249 T 540 255 L 540 300 L 0 300 Z', p['far'],DARK,2.1)
    d.path('M 0 278 Q 140 262 295 278 T 540 273 L 540 300 L 0 300 Z',p['grass'],DARK,1.8)
    # Ozdobne odblaski na ziemi, przyklady materialu i perspektywy.
    for x in (28,124,289,470):
        d.path(f'M {x} 286 q 13 -4 27 -1','none',p['highlight'],2)
    for x,y in [(36,195),(463,170)]:cloudy(d,x,y,.35)

def windows(d,x,y,w,h,rows=2,cols=4,fill='#9DBBBC',frame=DARK,arch=False):
    for i in range(rows):
        for j in range(cols):
            xx=x+(j+0.5)*w/cols-3
            yy=y+(i+0.6)*h/(rows+0.6)-5
            if arch:
                d.path(f'M {xx-1} {yy+11} V {yy+4} Q {xx+2} {yy-3} {xx+6} {yy+4} V {yy+11} Z', fill,frame,1.3)
            else:d.rect(xx,yy,6,10,fill,frame,1.1,rx=1)

def palace(d,x,y,p):
    d.rect(x,y-91,249,91,'#F0D5B1',DARK,2.6)
    d.rect(x-12,y-99,273,9,'#C4A282',DARK,2)
    d.rect(x+99,y-133,53,47,'#EFDBBD',DARK,2.2)
    d.path(f'M {x+96} {y-134} Q {x+125} {y-165} {x+155} {y-134} Z','#BD735E',DARK,2.3)
    for xx in (x+12,x+214):
        d.rect(xx,y-117,29,26,'#F0D5B1',DARK,2)
        d.polygon([(xx-5,y-117),(xx+14,y-139),(xx+34,y-117)],'#B96554',DARK,2)
    windows(d,x+14,y-87,220,76,rows=2,cols=10,arch=True)
    d.rect(x+114,y-35,20,35,'#876F6A',DARK,2,rx=8)
    d.line(x+4,y-52,x+244,y-52,'#A77C6C',2)

def gate(d,x,y,p):
    d.rect(x,y-79,117,79,p['wall'],DARK,2.5)
    d.rect(x-8,y-89,133,12,'#EDC69E',DARK,2)
    d.polygon([(x-11,y-89),(x+58,y-108),(x+128,y-89)],'#D99574',DARK,2.2)
    for xx in (x+18,x+54,x+90):
        d.path(f'M {xx-8} {y} L {xx-8} {y-42} Q {xx} {y-57} {xx+8} {y-42} V {y} Z', '#8C9BA2', DARK,1.9)
    for xx in (x+1,x+114):d.rect(xx,y-70,5,67,'#D8AF91',None,0)

def gothic(d,x,y,p,wide=184):
    d.rect(x,y-104,wide,104,'#EAD8BE',DARK,2.7)
    d.polygon([(x-8,y-104),(x+wide*.49,y-147),(x+wide+8,y-104)],'#BE776B',DARK,2.6)
    d.circle(x+wide*.5,y-83,22,'#A6C3BC',DARK,2.5)
    d.circle(x+wide*.5,y-83,10,'#E6C68F',DARK,1.7)
    for xx in (x+7,x+wide-12):
        d.rect(xx,y-183,19,83,'#EAD9BD',DARK,2)
        d.polygon([(xx-5,y-183),(xx+9,y-223),(xx+24,y-183)],'#C39B78',DARK,2.1)
    for xx in range(20,int(wide)-12,24):
        d.polygon([(x+xx-4,y-108),(x+xx+3,y-126),(x+xx+10,y-108)],'#E6D8BD',DARK,1.6)
    windows(d,x+22,y-85,wide-44,65,rows=2,cols=5,fill='#7EA9B0',arch=True)
    d.path(f'M {x+wide/2-13} {y} V {y-40} Q {x+wide/2} {y-59} {x+wide/2+13} {y-40} V {y} Z','#7A8890',DARK,2)

def basilica(d,x,y,p):
    d.rect(x,y-100,205,100,'#E5D5B8',DARK,2.4)
    # Autorska fantazyjna sylwetka; nie kopiujemy konkretnego wygladu budowli.
    heights=[-172,-213,-186,-243,-199,-173]
    for i,hh in enumerate(heights):
        xx=x+11+i*33
        d.path(f'M {xx} {y-100} L {xx+3} {y+hh+15} L {xx+13} {y+hh-8} L {xx+24} {y+hh+15} L {xx+27} {y-100} Z','#E4C99F',DARK,2)
        d.circle(xx+13,y+hh-4,3.4,'#F1CB88',DARK,1)
        d.rect(xx+10,y+hh+26,7,17,'#8FAEB1',DARK,1.3,rx=3)
    d.circle(x+104,y-93,24,'#A9C3BC',DARK,2)
    for xx in (x+27,x+73,x+128,x+171):
        d.path(f'M {xx-9} {y} V {y-53} Q {xx} {y-69} {xx+9} {y-53} V {y} Z','#97B7B2',DARK,2)

def amphitheatre(d,x,y):
    d.path(f'M {x} {y} V {y-128} Q {x+110} {y-173} {x+252} {y-127} V {y} Z','#D7AF8B',DARK,3)
    d.path(f'M {x+9} {y-118} Q {x+115} {y-158} {x+243} {y-116}','none','#F0D1A8',5)
    for yy,n in ((-108,11),(-66,11),(-28,10)):
        for i in range(n):
            xx=x+16+i*21+(11 if yy==-28 else 0)
            d.path(f'M {xx-6} {y+yy+26} V {y+yy+6} Q {xx} {y+yy-5} {xx+6} {y+yy+6} V {y+yy+26} Z','#8F9290',DARK,1.4)
    d.path(f'M {x+8} {y-129} Q {x+118} {y-180} {x+251} {y-126}','none',DARK,3)

def bell_tower(d,x,y,s=1,roof='#C77360'):
    d.rect(x-18*s,y-140*s,36*s,140*s,'#D1A37B',DARK,2.8)
    d.rect(x-20*s,y-152*s,40*s,13*s,'#E8C49A',DARK,2.5)
    d.polygon([(x-21*s,y-152*s),(x,y-191*s),(x+21*s,y-152*s)],roof,DARK,2.4)
    for k in range(3):
        yy=y-(38+35*k)*s
        d.path(f'M {x-8*s} {yy} V {yy-13*s} Q {x} {yy-22*s} {x+8*s} {yy-13*s} V {yy} Z','#8CACAE',DARK,1.8)

def fortress(d,x,y,p):
    d.path(f'M {x-25} {y} L {x-3} {y-68} L {x+180} {y-68} L {x+202} {y} Z','#D7C4A6',DARK,2.6)
    d.rect(x+14,y-105,175,47,'#EAD7B9',DARK,2.3)
    d.rect(x+50,y-140,64,37,'#EAD7B9',DARK,2)
    d.polygon([(x+43,y-140),(x+82,y-163),(x+121,y-140)],'#AE6C5A',DARK,2)
    for xx in (x+23,x+152):bell_tower(d,xx,y-70,.48, '#AA7063')
    windows(d,x+20,y-104,162,35,rows=1,cols=8)

def clocktower(d,x,y):
    d.rect(x-23,y-111,46,111,'#EAD4BA',DARK,2.4)
    d.polygon([(x-29,y-111),(x,y-154),(x+30,y-111)],'#B8695B',DARK,2.2)
    d.circle(x,y-95,12,'#F7E3B7',DARK,2)
    d.line(x,y-95,x,y-103,DARK,2)
    d.line(x,y-95,x+7,y-91,DARK,2)
    windows(d,x-16,y-75,31,54,rows=2,cols=2)

def river(d,y=260,fill='#91C9D6'):
    d.path(f'M 0 {y} Q 160 {y-12} 290 {y+3} T 540 {y} L 540 300 L 0 300 Z',fill,DARK,1.8)
    for x in (29,140,330,452):d.path(f'M {x} {y+17} q 24 -4 50 -1','none','#DDF6EF',2.5)

def bridge(d,y=222,fromx=35,tox=508,arches=5):
    span=(tox-fromx)/arches
    d.rect(fromx,y-12,tox-fromx,13,'#DDC6A2',DARK,2)
    for i in range(arches):
        xx=fromx+i*span+7
        d.path(f'M {xx} {y+37} V {y+13} Q {xx+span/2-7} {y-6} {xx+span-14} {y+13} V {y+37} Z','#8FC5CE',DARK,2.2)
    d.rect(fromx-4,y-19,tox-fromx+8,7,'#EADDBF',DARK,1.5)
    for i in range(arches+1):
        xx=fromx+i*span
        d.circle(xx,y-24,3.5,'#D4B999',DARK,1)

def mining(d,x,y):
    d.path(f'M {x} {y} L {x+28} {y-174} L {x+88} {y-174} L {x+112} {y} Z','#A4A8A6',DARK,3)
    d.rect(x+10,y-184,99,11,'#D1B89B',DARK,2)
    d.line(x+10,y-166,x+104,y-60,DARK,4)
    d.line(x+105,y-166,x+10,y-60,DARK,4)
    d.line(x+19,y-128,x+96,y-128,DARK,3)
    d.line(x+10,y-82,x+103,y-82,DARK,3)
    d.circle(x+58,y-193,17,'#E9D7B1',DARK,2.8)
    for angle in range(0,360,60):
        a=math.radians(angle); d.line(x+58,y-193,x+58+16*math.cos(a),y-193+16*math.sin(a),DARK,1.8)
    d.rect(x+117,y-115,19,115,'#C89A87',DARK,2)
    d.rect(x+121,y-126,11,15,'#C4B4A9',DARK,1.5)

def buildingblock(d,x,y,w,h,p,roof=None):
    roof=roof or p['roof']
    d.rect(x,y-h,w,h,p['wall'],DARK,2.2)
    d.polygon([(x-4,y-h),(x+w/2,y-h-23),(x+w+4,y-h)],roof,DARK,2.3)
    windows(d,x+4,y-h+3,w-8,h-6,rows=max(1,int(h//36)),cols=max(2,int(w//19)),fill='#9FBDB9',arch=True)

def wheel(d,x,y,r=77):
    d.circle(x,y,r,'none',DARK,3.4)
    d.circle(x,y,13,'#EBD1A9',DARK,2.8)
    for a in range(0,360,30):
        rad=math.radians(a)
        xx=x+r*math.cos(rad);yy=y+r*math.sin(rad)
        d.line(x,y,round(xx,2),round(yy,2),DARK,1.7)
        d.rect(xx-6,yy-3,12,10,'#E8C78C',DARK,1.4,rx=2)
    d.path(f'M {x-56} {y+r+48} L {x} {y+9} L {x+56} {y+r+48}','none',DARK,4)
    d.line(x-67,y+r+48,x+67,y+r+48,DARK,4)

def make_landmark(cc,city):
    p=PALETTES[cc];d=Drawing(540,300)
    # Starannie zroznicowane panoramy, bez napisow i rozpoznawalnych osob.
    if city=='madryt':
        city_base(d,cc);palace(d,18,246,p);gate(d,326,246,p)
        for x in (276,477):olive(d,x,253,.58)
    elif city=='barcelona':
        river(d,249,'#8DCDCF')
        d.path('M 0 267 Q 100 244 240 258 T 540 254 L 540 300 L 0 300 Z','#EBC88F',DARK,2)
        basilica(d,158,244,p)
        for x in (67,444):palm(d,x,256,1.05)
        for x in (40,480):d.ellipse(x,264,16,6,'#FBEDC5',None,0)
    elif city=='walencja':
        river(d,254,'#8FC9D2')
        # Uogolnione wspolczesne formy nadmorskie zamiast kopiowania budowli.
        d.path('M 79 244 Q 150 88 232 240 Q 165 204 79 244 Z','#F1E9D0',DARK,3)
        d.path('M 103 236 Q 169 130 220 237','none','#9CC4BE',7)
        d.ellipse(358,226,108,25,'#E7DEC7',DARK,3)
        d.path('M 263 227 Q 355 106 463 224','none','#EFE3C9',12)
        d.path('M 278 228 Q 354 146 445 227','none',DARK,2.7)
        for x in (24,501):palm(d,x,268,.84)
    elif city=='rzym':
        city_base(d,cc);amphitheatre(d,88,258)
        for x in (44,422,487):cypress(d,x,263,.73)
    elif city=='mediolan':
        city_base(d,cc);gothic(d,137,258,p,263)
        for x in (53,465):buildingblock(d,x,258,64,55,p)
    elif city=='neapol':
        d.polygon([(10,238),(45,227),(124,198),(183,139),(213,131),(265,144),(309,210),(375,234),(535,244),(540,298),(0,298)],'#AAB5AA',DARK,2.4)
        d.path('M 171 160 Q 216 153 266 164 L 250 177 Q 211 166 185 175 Z','#EADFC8',None,0)
        river(d,248,'#8FC9D2')
        for x,y,w,h in [(56,255,66,53),(146,254,58,68),(284,258,76,68),(399,251,72,52)]:buildingblock(d,x,y,w,h,p)
        d.ellipse(239,266,21,6,'#F7E6CA',DARK,1.5)
    elif city=='bolonia':
        city_base(d,cc)
        for x in (36,114,384,460): buildingblock(d,x,260,75,74,p)
        bell_tower(d,228,260,1.05)
        bell_tower(d,324,259,.77,'#A65A4D')
        d.path('M 5 268 Q 265 258 535 264','none','#E2C7A7',5)
    elif city=='wieden':
        city_base(d,cc);wheel(d,140,147,68);gothic(d,306,257,p,173)
        for x in (18,245):buildingblock(d,x,258,54,57,p)
    elif city=='salzburg':
        mountain_range(d,p,False,252,[(23,163),(95,97),(184,142),(293,82),(392,128),(475,110),(550,160)])
        d.path('M 0 272 Q 220 233 540 272 L 540 300 L 0 300 Z','#89B59B',DARK,2)
        fortress(d,169,258,p)
        for x in (47,456):chalet(d,x,274,.79,p)
    elif city=='graz':
        city_base(d,cc);d.path('M 90 251 Q 176 169 252 209 Q 346 173 436 252 Z','#91B6A4',DARK,2.2)
        clocktower(d,243,237)
        for x in (23,102,373,451):buildingblock(d,x,265,70,65,p)
    elif city=='linz':
        river(d,245,'#8CC5D3');bridge(d,252,48,495,5)
        for x in (49,151,252,409):buildingblock(d,x,224,65,72,p)
        for x in (133,401):bell_tower(d,x,220,.67,p['roof'])
    elif city=='praga':
        river(d,252,'#A5CDD1')
        d.path('M 280 210 Q 340 161 512 212 L 515 260 L 280 260 Z','#95B3A1',DARK,2)
        castle(d,396,211,.78,p)
        bridge(d,253,24,518,6)
        for x in range(68,515,65):
            d.rect(x,215,5,19,'#D8C7AF',DARK,1)
            d.circle(x+2,211,6,'#CFC3AD',DARK,1.2)
        for x in (130,240):tower(d,x,236,.70,p['roof'])
    elif city=='brno':
        city_base(d,cc)
        d.path('M 90 243 Q 188 168 277 206 Q 368 175 450 238 Z','#93AE95',DARK,2)
        castle(d,256,235,.98,p)
        for x in (24,95,417,481):buildingblock(d,x,260,67,67,p)
    elif city=='ostrawa':
        city_base(d,cc)
        mining(d,80,258);mining(d,328,251)
        d.rect(252,184,24,73,'#AD8583',DARK,2.4)
        d.rect(255,174,18,15,'#C6B3AD',DARK,1.8)
        for x in (15,238,471):
            d.path(f'M {x} 270 V 222 H {x+55} V 270 Z','#C6B3A5',DARK,2)
    else: raise ValueError(f'Brak miasta {city}')
    return d

LANDMARK_IDS = {
    'es':['madryt','barcelona','walencja'],
    'it':['rzym','mediolan','neapol','bolonia'],
    'at':['wieden','graz','linz','salzburg'],
    'cz':['praga','brno','ostrawa'],
}

def render_landmarks():
    for cc,ids in LANDMARK_IDS.items():
        for city in ids:
            path=LANDMARKS/f'{city}.png'
            rgba_png(make_landmark(cc,city),path)
            print(path.relative_to(ROOT),round(path.stat().st_size/1024),'KiB',flush=True)

def render_preview(cc, winter=False):
    p=COUNTRIES/cc;size=(1080,1920)
    result=Image.new('RGBA',size)
    def layer(name,x,y):
        path=p/f'{cc}-{name}{"-zima" if winter and name in ("sky","far","near") else ""}.png'
        im=Image.open(path).convert('RGBA')
        result.alpha_composite(im,(x,y))
    layer('sky',0,0)
    # Pokazujemy srodek petli; wycinek testuje obraz 720px.
    for name,y in [('clouds',330),('far',765),('near',1254)]:
        im=Image.open(p/f'{cc}-{name}{"-zima" if winter and name in ("far","near") else ""}.png').convert('RGBA')
        result.alpha_composite(im.crop((520,0,1600,im.height)),(0,y))
    layer('road',0,1590)
    name=f'countries-{cc}-preview{"-zima" if winter else ""}.png'
    path=PREVIEWS/name
    meta=PngInfo();meta.add(b'sRGB', b'\x00')
    result.convert('RGB').save(path,optimize=True,compress_level=9,pnginfo=meta)
    print(path.relative_to(ROOT),round(path.stat().st_size/1024),'KiB',flush=True)

def render_previews():
    for cc in PALETTES:
        for winter in (False,True):render_preview(cc,winter)

def write_docs():
    summaries={
        'es':'Słoneczne wzgórza, gaje oliwne, wiatrak, białe wioski i palma. Madryt, Barcelona, Walencja.',
        'it':'Toskańskie wzgórza, winnice, cyprysy, północne Alpy. Mediolan, Rzym, Neapol i Bolonia.',
        'at':'Alpy, świerki, drewniane domy z balkonami, Dunaj. Wiedeń, Graz, Linz i Salzburg.',
        'cz':'Pagórki, lasy, zamek, wiejskie domy i czerwone dachy. Praga, Brno i Ostrawa.',
    }
    for cc in PALETTES:
        lines=[f'# {cc.upper()} — oryginalne tła 2D (zlecenie 56)','',summaries[cc],'',
            'Autorskie ilustracje wektorowe SVG tworzone proceduralnie w ChatGPT; ręczne poprawki kompozycji, geometrii i bezszwowości, eksport przez CairoSVG/Pillow. Brak obrazów i logotypów osób trzecich.',
            'Światło i słońce z lewej góry, ciemnogranatowy kontur ok. 6 px w @3x, płaskie ciepłe barwy. Bez napisów.','',
            '| Plik | Źródło / narzędzie | Licencja | Autor / uwagi |',
            '|---|---|---|---|']
        for layer in ['sky','clouds','far','near','road']:
            w,h={'sky':(1080,1920),'clouds':(2160,600),'far':(2160,900),'near':(2160,720),'road':(1080,330)}[layer]
            lines.append(f'| `{cc}-{layer}.png` | ChatGPT: SVG → CairoSVG/Pillow | Oryginalna ilustracja projektu | {w}×{h}, @3x{", kafelek powtarzalny" if layer!="sky" else ""} |')
        for layer in ('sky','far','near'):
            w,h={'sky':(1080,1920),'far':(2160,900),'near':(2160,720)}[layer]
            lines.append(f'| `{cc}-{layer}-zima.png` | ChatGPT: odrębne opracowanie zimowe SVG | Oryginalna ilustracja projektu | {w}×{h}; śnieg na budowlach i w krajobrazie |')
        lines.extend(['', '| `generate_south.py` (tylko ES) | ChatGPT: Python 3, SVG → PNG | Kod autorski projektu | Jeden generator dla czterech krajów |' if cc=='es' else '', '| `check_south.py` (tylko ES) | ChatGPT: Python 3, Pillow | Kod autorski projektu | Kontrola 54 obrazów i 4 dróg |' if cc=='es' else '', f'**Podglądy:** `docs/art/podglady/countries-{cc}-preview.png` i `countries-{cc}-preview-zima.png` (po 1080×1920).',
            '', '**Weryfikacja:** 3×, PNG sRGB (bez ICC), kanał alfa w warstwach ruchomych; skrajne kolumny każdego kafelka identyczne. Krawędź asfaltu w fizycznym wierszu 150. Nie ma zimowych dróg ani zimowych chmur.','',
            '**Regeneracja:** `python3 public/assets/countries/es/generate_south.py` (Pillow + CairoSVG). Generator tworzy cztery kraje oraz panoramy i podglądy. Nie dodaje zależności do gry.','',
            '**Uwaga integracyjna:** Na `main` z 30.10.2026 `CountryCode` nie obejmuje jeszcze ES/IT/AT/CZ, a `hasWinterVariant()` w `src/render/assets.ts` obsługuje wyłącznie PL. Grafiki zimowe zaczną działać po integracji zlecenia 55 i rozszerzeniu tej funkcji przez koordynatora.',''])
        (COUNTRIES/cc/'ASSETS.md').write_text('\n'.join(lines),encoding='utf-8')
    lines=['# Zlecenie 56 — panoramy ES, IT, AT, CZ','','Oryginalne autorskie SVG wygenerowane proceduralnie w ChatGPT, z korektą figur, sylwetek i warstw. PNG RGBA 1620×900, przezroczyste tło. Słońce i oświetlenie z lewej góry. Bez logotypów ani napisów.','',
        'Prace obejmują dwie dodatkowe panoramy z motywów zlecenia (Bolonia i Salzburg), poza trzema największymi miastami każdego kraju — ponieważ 30.10.2026 nowe kraje nie występowały jeszcze w `src/content/waypoints.ts` na `main`. Identyfikatory miast trzeba zweryfikować z docelową wersją zlecenia 55.','',
        '| Plik | Źródło / narzędzie | Licencja | Autor / uwagi |','|---|---|---|---|']
    for cc,ids in LANDMARK_IDS.items():
        for city in ids:
            lines.append(f'| `{city}.png` | ChatGPT: autorski SVG → CairoSVG/Pillow | Oryginalna ilustracja projektu | {cc.upper()}; stylizowana sylwetka, 1620×900, RGBA |')
    lines.extend(['','Skrypt: `public/assets/countries/es/generate_south.py`. Ta tabela jest suplementem do **istniejącego** `public/assets/landmarks/ASSETS.md` i nie zastępuje wpisów z poprzednich zleceń.',''])
    (LANDMARKS/'ASSETS-56.md').write_text('\n'.join(lines),encoding='utf-8')

if __name__=='__main__':
    render_backgrounds()
    render_landmarks()
    render_previews()
    write_docs()
