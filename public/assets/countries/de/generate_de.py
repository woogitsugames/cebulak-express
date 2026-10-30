#!/usr/bin/env python3
"""Samodzielny generator wektorowych ilustracji DE do Cebulak Express.
Uruchom z katalogu repo: python3 public/assets/countries/de/generate_de.py
Wymaga: cairosvg, Pillow (tylko w procesie tworzenia grafik; nie w grze).
"""
from __future__ import annotations
import math
import io
import os
from pathlib import Path
import random
import re
from PIL import Image, ImageDraw, ImageFont
import cairosvg

ROOT = Path(__file__).resolve().parents[4]
COUNTRY = ROOT / 'public/assets/countries/de'
LANDMARKS = ROOT / 'public/assets/landmarks'
COUNTRY.mkdir(parents=True, exist_ok=True)
LANDMARKS.mkdir(parents=True, exist_ok=True)

INK = '#284451'
INK2 = '#36535c'
HILIGHT = '#fff0bd'
SAND = '#f7d295'
CREAM = '#f6e8c5'
TERRACOTTA = '#df7253'
RED = '#bc5845'
TEAL = '#408a89'
DEEP_GREEN = '#34805d'
BRIGHT_GREEN = '#78b66d'
LEAF = '#4fa478'
PALE_LEAF = '#acd589'
WATER = '#63b9d6'
WATER_SHADOW = '#3c94be'
STONE = '#e8c995'
DARK_STONE = '#cda77e'
ROAD = '#45535c'
WHITE = '#fdf9ed'


def line(x1,y1,x2,y2,col=INK,sw=2):
    return f'<path d="M{x1},{y1} L{x2},{y2}" fill="none" stroke="{col}" stroke-width="{sw}" stroke-linecap="round"/>'

def poly(pts, fill, stroke=INK, sw=2.5):
    return f'<polygon points="{pts}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}" stroke-linejoin="round"/>'

def rect(x,y,w,h,fill,stroke=INK,sw=2.5,rx=0):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"/>'

def ell(cx,cy,rx,ry,fill,stroke=INK,sw=2.5):
    return f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"/>'

def circle(cx,cy,r,fill,stroke=INK,sw=2.5):
    return f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"/>'

def path(d,fill='none',stroke=INK,sw=2.5):
    return f'<path d="{d}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round"/>'

def g(content, x=0,y=0,s=1):
    return f'<g transform="translate({x} {y}) scale({s})">{content}</g>'

def svg_doc(w,h,contents):
    defs=f'''<defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
     <stop offset="0" stop-color="#4dace8"/><stop offset=".52" stop-color="#91d9ed"/><stop offset="1" stop-color="#f9e5ae"/>
    </linearGradient>
    <linearGradient id="sunray" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#fff2ae" stop-opacity=".39"/><stop offset="1" stop-color="#fff3d2" stop-opacity="0"/></linearGradient>
    <linearGradient id="river" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#81d1db"/><stop offset="1" stop-color="#419bbd"/></linearGradient>
    </defs>'''
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}" stroke-linejoin="round" stroke-linecap="round">{defs}{contents}</svg>'

def save_svg(svg, dst, logical_size, palette=160):
    png=cairosvg.svg2png(bytestring=svg.encode('utf8'),output_width=logical_size[0]*3,output_height=logical_size[1]*3)
    im=Image.open(io.BytesIO(png)).convert('RGBA')
    # Różnice 1px od antyaliasingu na otwartych końcach ścieżek SVG:
    # wyrównanie ostatniej i pierwszej kolumny przed kompresją.
    # Zabieg dotyczy wyłącznie warstw kafelkowych.
    if dst.name in ('de-clouds.png','de-far.png','de-near.png','de-near-baustelle.png','de-road.png'):
        px=im.load()
        ww,hh=im.size
        for yy in range(hh):
            aa,bb=px[0,yy],px[ww-1,yy]
            if aa!=bb:
                mid=tuple((a+b+1)//2 for a,b in zip(aa,bb))
                px[0,yy]=mid
                px[ww-1,yy]=mid
    # Redukcja liczby barw bez widocznej straty; kontury wektorowe zostają gładkie.
    if palette:
        q=im.quantize(colors=palette,method=Image.Quantize.FASTOCTREE,dither=Image.Dither.NONE)
        q.save(dst,format='PNG',optimize=True,compress_level=9)
    else:
        im.save(dst,format='PNG',optimize=True,compress_level=9)
    return im

def puffs(cx,cy,s=1):
    ss=[(-35,12,32,17),(-20,1,25,21),(3,-4,31,26),(31,8,29,19),(50,15,20,13)]
    out=''
    for x,y,rx,ry in ss:
        out+=ell(cx+x*s,cy+y*s+6*s,rx*s,ry*s,'#bbdfea','#638da3',1.5*s)
    for x,y,rx,ry in ss:
        out+=ell(cx+x*s,cy+y*s,rx*s,ry*s,'#fff9e9','#698b95',1.1*s)
    out+=path(f'M{cx-20*s},{cy-8*s} Q{cx+3*s},{cy-22*s} {cx+22*s},{cy-4*s}', 'none', '#ffffff',2.4*s)
    return out

def small_cloud(cx,cy,s):
    return puffs(cx,cy,s)


def tree(x,base,s=1,typ=0):
    out=rect(x-3*s,base-28*s,6*s,29*s,'#8c6250',INK,1.7*s)
    if typ==1:
        out+=poly(f'{x},{base-92*s} {x-26*s},{base-29*s} {x+26*s},{base-29*s}', '#36775b',INK,2.2*s)
        out+=poly(f'{x},{base-110*s} {x-23*s},{base-49*s} {x+23*s},{base-49*s}', '#599f6d',INK,1.8*s)
        out+=path(f'M{x},{base-92*s} L{x-9*s},{base-61*s}', 'none','#a7ce79',2*s)
    else:
        out+=circle(x-13*s,base-49*s,24*s,'#377d5f',INK,2.2*s)
        out+=circle(x+15*s,base-52*s,26*s,'#419769',INK,2.2*s)
        out+=circle(x-1*s,base-71*s,27*s,'#65b67b',INK,2.2*s)
        out+=path(f'M{x-16*s},{base-83*s} Q{x-1*s},{base-92*s} {x+12*s},{base-77*s}', 'none','#a4d58c',2.5*s)
    return out


def house(x,base,w=56,h=67,roof=None,wall=None,half_timber=False,windows=True):
    roof=roof or TERRACOTTA
    wall=wall or CREAM
    out=rect(x,base-h,w,h,wall,INK,2.5)
    out+=poly(f'{x-5},{base-h} {x+w/2},{base-h-27} {x+w+5},{base-h}',roof,INK,2.5)
    out+=line(x+5,base-h+8,x+w-6,base-h+8,'#f8d6a6',1.6)
    if half_timber:
        for yy in [base-h+13,base-h+36,base-10]:
            out+=line(x+4,yy,x+w-4,yy,'#8b5f4c',3)
        for xx in [x+4,x+w/2,x+w-4]:
            out+=line(xx,base-h+4,xx,base-5,'#8b5f4c',2.7)
        out+=line(x+4,base-h+13,x+w/2,base-h+36,'#8b5f4c',2)
        out+=line(x+w-4,base-h+13,x+w/2,base-h+36,'#8b5f4c',2)
    elif windows:
        for yy in [base-h+16,base-h+40]:
            for xx in [x+12,x+w-22]:
                if xx+10 < x+w:
                    out+=rect(xx,yy,11,17,'#8dced1',INK,1.5,2)
                    out+=line(xx+5.5,yy+3,xx+5.5,yy+17,INK,1)
    out+=rect(x+w/2-8,base-26,16,26,'#9e795d',INK,1.5,2)
    return out


def tower(x,base,h=146,w=35,fill=STONE,roof='#5d7e79',type='spire'):
    y=base-h
    o=rect(x-w/2,y,w,h,fill,INK,2.6)
    o+=rect(x-w/2+2,y+2,w-4,9,'#fff1c9','none',0)
    for yy in range(int(y+25),int(base-15),34):
        o+=rect(x-5.5,yy,11,21,'#719da0',INK,1.5,4)
    if type=='spire':
        o+=poly(f'{x-w/2-4},{y+2} {x},{y-48} {x+w/2+4},{y+2}',roof,INK,2.7)
        o+=line(x,y-48,x,y-59,INK,2)
        o+=circle(x,y-60,2.4,HILIGHT,INK,1.4)
    elif type=='dome':
        o+=dome(x,y+2,w/2+5,29,roof)
    elif type=='castle':
        for xx in [x-w/2+4,x-w/2+w/2-3,x+w/2-9]:
            o+=rect(xx,y-10,8,12,fill,INK,1.5)
    return o


def dome(cx,base,rx,ry,fill='#5e987e'):
    out=path(f'M{cx-rx},{base} Q{cx-rx},{base-ry*.90} {cx},{base-ry} Q{cx+rx},{base-ry*.90} {cx+rx},{base} Z',fill,INK,2.5)
    out+=line(cx,base-ry,cx,base+2,'#c7d9ab',2)
    out+=path(f'M{cx-rx+5},{base-3} Q{cx-rx+8},{base-ry*.7} {cx-8},{base-ry*.75}','none','#a4cca0',1.8)
    out+=circle(cx,base-ry-3,3,HILIGHT,INK,1.1)
    return out


def river(y=258,depth=42):
    o=rect(-10,y,560,depth,'url(#river)',INK,2.4)
    for k in range(17):
        xx=(k*47+11)%550
        yy=y+9+(k*19)%max(13,depth-13)
        o+=line(xx,yy,xx+19,yy,'#d5eee6',2 if k%3 else 3)
    return o


def bridge(x,y,w=280,arches=5):
    o=rect(x,y,w,9,'#d4b987',INK,2.1)
    step=w/arches
    for i in range(arches):
        a=x+i*step
        o+=path(f'M{a+5},{y+28} Q{a+step/2},{y-4} {a+step-5},{y+28}', 'none','#746957',5)
        o+=line(a+1,y+4,a+1,y+28,'#746957',3)
    for i in range(arches*2+1):
        a=x+i*w/(arches*2)
        o+=line(a,y-11,a,y,'#53656d',1.6)
    o+=line(x,y-12,x+w,y-12,'#53656d',2)
    return o


def gothic_cathedral(cx,base=254,ht=211,w=130):
    l=cx-w/2
    o=rect(l+25,base-ht+70,w-50,ht-70,DARK_STONE,INK,3)
    o+=poly(f'{l+18},{base-ht+80} {cx},{base-ht+37} {l+w-18},{base-ht+80}', '#576a69',INK,2.3)
    for dx in [17,w-17]:
        x=l+dx
        o+=tower(x,base,ht-30,30,STONE,'#4e7777','spire')
        # dekompozycja gotyckich okien i przypór
        for yy in [base-ht+72,base-ht+113,base-ht+152]:
            o+=rect(x-5,yy,10,23,'#508ca3',INK,1.4,4)
            o+=line(x,yy,x,yy+21,INK,1)
    for dx in [41,66,91]:
        o+=rect(l+dx-6,base-ht+106,12,50,'#89bbc2',INK,1.5,5)
        o+=line(l+dx,base-ht+113,l+dx,base-ht+148,INK,1)
    o+=circle(cx,base-ht+86,12,'#9dcdc9',INK,2)
    o+=path(f'M{cx-19},{base} L{cx-19},{base-48} Q{cx},{base-79} {cx+19},{base-48} L{cx+19},{base}', '#bdab8c',INK,2.1)
    for k in range(5):
        yy=base-ht+95+k*25
        o+=line(l+20,yy,l+31,yy,'#fff0ce',2)
        o+=line(l+w-31,yy,l+w-20,yy,'#fff0ce',2)
    return o


def tv_tower(x,base,h=230,ball=True):
    y=base-h
    o=poly(f'{x-11},{base} {x-3},{y+42} {x+3},{y+42} {x+11},{base}', '#f0e8d5',INK,2.4)
    o+=line(x,y+43,x,y-4,'#556e72',3)
    if ball:
        o+=circle(x,y+49,21,'#9fd3cd',INK,3)
        o+=path(f'M{x-20},{y+48} Q{x},{y+61} {x+20},{y+48}','none','#698e9d',2)
        o+=ell(x,y+24,31,5,'#c4ded6',INK,2)
        o+=ell(x,y+76,25,5,'#6c9d9b',INK,1.7)
    else:
        o+=ell(x,y+39,25,8,'#aac8b4',INK,2.8)
        o+=rect(x-15,y+43,30,17,'#b6d9d2',INK,2)
    o+=line(x,y-4,x,y-28,INK,2)
    o+=circle(x,y-29,2.8,TERRACOTTA,INK,1)
    return o


def mine_headframe(x,base,s=1):
    o=poly(f'{x-36*s},{base} {x-11*s},{base-106*s} {x+11*s},{base-106*s} {x+36*s},{base}', '#ba6352',INK,3)
    o+=rect(x-38*s,base-111*s,76*s,9*s,'#9f4b46',INK,2)
    o+=rect(x-18*s,base-139*s,36*s,31*s,'#9d4b49',INK,2)
    for dy in [12,48,79]:
        yy=base-dy*s
        o+=line(x-32*s+(dy/5)*s,yy,x+32*s-(dy/5)*s,yy,'#2d4651',2.3*s)
    o+=line(x-24*s,base,x+15*s,base-108*s,'#314d56',2*s)
    o+=line(x+24*s,base,x-15*s,base-108*s,'#314d56',2*s)
    o+=circle(x-8*s,base-123*s,6*s,'#e5b588',INK,2*s)
    o+=circle(x+8*s,base-123*s,6*s,'#e5b588',INK,2*s)
    return o


def gasometer(x,base,w=78,h=130):
    o=rect(x,base-h+12,w,h-12,'#79919a',INK,3)
    o+=ell(x+w/2,base-h+13,w/2,13,'#b1baba',INK,3)
    for dx in [8,w/2,w-8]:
        o+=line(x+dx,base-h+17,x+dx,base,'#526a72',2)
    for dy in range(43,h-6,29):
        o+=line(x,base-h+dy,x+w,base-h+dy,'#586b71',2.1)
    o+=ell(x+w/2,base,w/2,7,'#64797b',INK,2)
    return o


def brick_hall(x,base,w=102,h=95):
    o=rect(x,base-h,w,h,'#c57d61',INK,2.7)
    o+=poly(f'{x-6},{base-h} {x+w/2},{base-h-34} {x+w+6},{base-h}', '#914d4b',INK,2.6)
    for i in range(4):
        xx=x+15+i*24
        o+=rect(xx,base-h+21,13,29,'#a6d6d5',INK,1.5,5)
        o+=rect(xx,base-h+62,13,25,'#98bbc1',INK,1.5,5)
    for yy in range(int(base-h+9),int(base),15):
        o+=line(x+6,yy,x+w-6,yy,'#a26457',1.2)
    return o


def wind_turbine(x,base,h=115):
    y=base-h
    o=poly(f'{x-5},{base} {x-2},{y+8} {x+3},{y+8} {x+6},{base}', '#f0eee0',INK,1.5)
    o+=circle(x,y+7,5,'#f6f4e5',INK,1.3)
    for angle in [-85,35,155]:
        rad=math.radians(angle)
        ex=x+34*math.cos(rad)
        ey=y+7+34*math.sin(rad)
        o+=path(f'M{x},{y+7} Q{x+10*math.cos(rad+.35)},{y+7+10*math.sin(rad+.35)} {ex},{ey}','none','#f5f3df',4)
        o+=line(x,y+7,ex,ey,INK,1.5)
    return o


def port_crane(x,base,h=125):
    top=base-h
    o=poly(f'{x-27},{base} {x-7},{top+12} {x+8},{top+12} {x+30},{base}', '#5b96a6',INK,2.8)
    o+=rect(x-25,top,52,16,'#70b3c1',INK,2.4)
    o+=poly(f'{x-15},{top+12} {x+122},{top-22} {x+122},{top-13} {x+8},{top+24}', '#659da9',INK,2.4)
    o+=line(x+116,top-17,x+116,base-39,'#56696b',1.9)
    o+=rect(x+107,base-45,18,8,'#455d62',INK,1.5)
    o+=line(x-21,base-5,x+21,base-5,INK,2)
    return o


def hill_silhouette():
    return path('M0 264 Q65 235 110 250 T210 242 Q284 220 340 246 T455 245 Q490 234 540 254 L540 300 L0 300 Z','#9ecf83',INK,2)

def shrubs():
    o=''
    for i in range(0,550,37):
        x=i+8
        yy=267+(i*7)%21
        o+=ell(x,yy,23,13,'#70ac73',INK,1.3)
        o+=ell(x-8,yy-5,12,9,'#a8d089','none',0)
    return o


def ground(with_water=False):
    if with_water:
        o=river(268,32)
    else:
        o=path('M0 277 Q108 261 208 279 T417 277 T540 270 L540 300 L0 300 Z','#76b776',INK,2.2)
        for x in range(12,540,43):
            o+=path(f'M{x},287 q4,-8 8,0','none','#d1d98a',1.8)
    return o

def watermark_none():return ''


def landscape_sky():
    o=rect(0,0,360,640,'url(#sky)','none',0)
    for radius,opacity in [(150,.09),(103,.13),(73,.17)]:
        o+=f'<circle cx="69" cy="118" r="{radius}" fill="#fff2a3" opacity="{opacity}"/>'
    for a in range(0,360,30):
        rad=math.radians(a)
        x1=69+43*math.cos(rad);y1=118+43*math.sin(rad)
        x2=69+70*math.cos(rad);y2=118+70*math.sin(rad)
        o+=line(round(x1,2),round(y1,2),round(x2,2),round(y2,2),'#fff1bd',4)
    o+=circle(69,118,37,'#fff1a5','#ffe7a2',2)
    o+=circle(59,110,11,'#fff8d2','none',0)
    o+=path('M0 463 Q140 412 360 459 L360 640 L0 640 Z', '#fff0c1', 'none',0)
    return svg_doc(360,640,o)


def landscape_clouds():
    o=''
    for cx,cy,s in [(72,79,.62),(231,112,.91),(420,51,.62),(605,125,.86),(720+72,79,.62)]:
        o+=small_cloud(cx,cy,s)
    return svg_doc(720,200,o)


def landscape_far():
    o=''
    # Periodic topographic curves meet at exactly the same heights at x=0 and x=720.
    def periodic(y,amp,phase=0,rounds=2):
        return [(x, y+amp*math.sin(2*math.pi*rounds*x/720+phase)) for x in range(0,721,12)]
    def fill_hill(points,fill):
        d='M'+ ' '.join(f'{x:.1f},{y:.1f}' if i==0 else f'L{x:.1f},{y:.1f}' for i,(x,y) in enumerate(points))+' L720,300 L0,300 Z'
        return path(d,fill,'none',0) + path('M'+' '.join(f'{x:.1f},{y:.1f}' if i==0 else f'L{x:.1f},{y:.1f}' for i,(x,y) in enumerate(points)), 'none', INK, 1.9)
    o+=fill_hill(periodic(164,21,0,2),'#b7d68c')
    o+=fill_hill(periodic(184,23,math.pi/3,2),'#7fb48a')
    # Golden rapeseed fields / pastel farm plots. Avoid seam by keeping polygons interior.
    o+=path('M46 231 L190 186 L263 200 L132 254 Z','#f5ca4a','#af8d45',2)
    o+=path('M385 209 L522 190 L581 217 L459 245 Z','#f4c44a','#b39452',2)
    o+=path('M263 205 L354 197 L393 222 L284 253 Z','#e6d989','#a0a673',1.4)
    for i in range(9):
        x=58+i*19
        o+=line(x,246-i*3.1,x+72,208-i*2,'#f9e39c',1.1)
    # Tiny forest band and clay-roofed German villages.
    for i in range(21):
        x=i*36
        yy=220+12*math.sin(2*math.pi*x/720)
        o+=ell(x,yy,17,18,'#4c936e',INK,1.2)
        o+=circle(x-7,yy-4,9,'#86bb77','none',0)
    for i,(x,y,s) in enumerate([(110,212,.6),(153,214,.48),(333,217,.53),(609,212,.48),(655,218,.55)]):
        o+=g(house(0,0,45,47,roof=TERRACOTTA,windows=False),x,y,s)
    # Familiar Ruhr industry, left; wind power on right; river with barges and viaduct.
    o+=g(mine_headframe(0,0,.72),135,238,.72)
    o+=g(gasometer(0,0,64,107),202,238,.72)
    o+=g(rect(0,-122,21,122,'#b9665b',INK,2.2),292,235,.73)
    o+=g(rect(0,-94,12,94,'#6c838a',INK,2),319,235,.70)
    o+=wind_turbine(525,218,100)
    o+=wind_turbine(561,211,69)
    o+=fill_hill(periodic(258,9,0,2),'#7db16f')
    o+=path('M0 272 L720 272 L720 300 L0 300 Z', '#4aa1b9','none',0)
    for i in range(24):
        x=18+i*31
        y=279+(i%2)*8
        o+=line(x,y,x+15,y,'#bae6d6',2)
    # viaduct with pillars; ends deliberately outside repeated edge lines
    o+=path('M346 253 Q370 227 399 253 T452 253 T504 253','none','#526975',5)
    o+=line(350,253,506,253,'#577480',5)
    for x in range(351,507,20):
        o+=line(x,249,x,255,'#8eaa9e',2)
    # Barque on water
    o+=poly('590,287 648,287 636,298 602,298','#5e6c6f',INK,2)
    o+=rect(607,280,20,9,'#e9ddc2',INK,1.8)
    o+=line(610,279,610,269,INK,1.7)
    return svg_doc(720,300,o)


def landscape_near(construction=False):
    o=''
    # Periodic continuous vegetation canopy. At both x edges geometry is identical.
    pts=[(x,116+8*math.sin(2*math.pi*x/720*3)) for x in range(0,721,12)]
    d='M'+' '.join(f'{x:.1f},{y:.1f}' if i==0 else f'L{x:.1f},{y:.1f}' for i,(x,y) in enumerate(pts))+' L720,240 L0,240 Z'
    o+=path(d,'#89b878','none',0)
    o+=path('M'+' '.join(f'{x:.1f},{y:.1f}' if i==0 else f'L{x:.1f},{y:.1f}' for i,(x,y) in enumerate(pts)),'none',INK,2.0)
    for i,x in enumerate(range(42,700,58)):
        o+=tree(x,168,.58+(i%3)*.10,i%3==0)
    pts=[(x,165+6*math.sin(2*math.pi*x/720*2)) for x in range(0,721,12)]
    d='M'+' '.join(f'{x:.1f},{y:.1f}' if i==0 else f'L{x:.1f},{y:.1f}' for i,(x,y) in enumerate(pts))+' L720,240 L0,240 Z'
    o+=path(d,'#5fa66e','none',0)
    # Noise barriers are a classic German Autobahn signature.
    o+=rect(0,163,720,54,'#849d99','none',0)
    o+=rect(0,164,720,9,'#d7dcb7','none',0)
    o+=line(0,163,720,163,INK,2.7)
    for x in range(0,721,30):
        o+=line(x,165,x,217,'#536e73',2.6)
        o+=line(x+6,181,x+25,181,'#aabeb0',1.1)
    o+=line(0,216,720,216,INK,3)
    o+=rect(0,217,720,23,'#44896b','none',0)
    for x in range(8,720,23):
        o+=path(f'M{x},234 q4,-13 8,-4','none','#9dcc77',2)
    if construction:
        # Removable foreground variant: orange-white cones, soil, unsigned barrier.
        o+=path('M125 227 Q173 199 210 222 T285 227 Z','#ad8759',INK,2)
        for x,scale in [(61,.85),(127,.95),(288,1.05),(505,1.0),(637,.9)]:
            out=poly('0,0 -8,34 8,34','#e96f42',INK,2.2)
            out+=poly('-6,13 -4,21 5,21 6,13','#fff2db',INK,1.1)
            out+=rect(-10,32,20,5,'#303f4a',INK,1.5)
            o+=g(out,x,203,scale)
        # striped roadwork barricade no text
        o+=rect(354,184,116,29,'#fff8e8',INK,2.7,3)
        for x in range(358,466,23):
            o+=poly(f'{x},211 {x+13},186 {x+23},186 {x+10},211','#df7048','none',0)
        for x in [369,456]:
            o+=rect(x,214,5,22,'#566568',INK,1.5)
        # excavator, no identifiable brand
        o+=poly('535,228 535,200 566,200 573,225','#f6c44f',INK,2.2)
        o+=rect(533,219,45,12,'#494e50',INK,2.4,5)
        o+=path('M565 205 L590 164 L608 171 L589 197 L618 215', 'none','#e9b248',9)
        o+=path('M565 205 L590 164 L608 171 L589 197 L618 215', 'none',INK,2)
        o+=poly('613,214 630,215 626,234 605,225','#d19b41',INK,2.3)
    else:
        # Roadside metal barrier - its line and posts tile perfectly.
        o+=line(0,226,720,226,'#e5e3c4',5)
        o+=line(0,230,720,230,'#4c6570',2)
        for x in range(0,721,60):
            o+=rect(x,225,5,13,'#50626d',INK,1)
    return svg_doc(720,240,o)


def landscape_road():
    o=rect(0,0,360,110,ROAD,'none',0)
    # roadside crash barrier and shoulder; x=0 and x=360 have identical pixels
    o+=rect(0,0,360,14,'#779d80','none',0)
    o+=rect(0,13,360,6,'#263e4b','none',0)
    o+=rect(0,21,360,8,'#e5e5d9','none',0)
    o+=line(0,25,360,25,'#93adb0',2)
    o+=rect(0,33,360,7,'#5d696d','none',0)
    o+=line(0,59,360,59,'#81918d',1.5)
    for x in range(24,361,120):
        o+=rect(x,67,53,6,'#fff6df','none',0,2)
    # tiny pavement scratches and anti-alias-safe texture, not grain/noise
    for x,y in [(43,90),(93,49),(181,103),(281,48),(330,97),(150,87)]:
        o+=line(x,y,x+17,y,'#637078',1.3)
    o+=rect(0,104,360,6,'#313d48','none',0)
    return svg_doc(360,110,o)

# ---------- Landmarks: every unique country=DE id from waypoints.ts ----------


def build_landmark(slug):
    o=''
    # Default distant woods, subtle foreground; architecture always remains dominant.
    water = slug in {'kolonia','dusseldorf','magdeburg','frankfurt-oder','saarbrucken','mannheim','frankfurt-main','erfurt','drezno','hamburg','hanower'}
    o+=path('M0 278 Q75 245 145 266 Q275 251 352 269 Q435 250 540 267 L540 300 L0 300 Z','#c1d994','none',0)
    # urban silhouettes in the distance, lower contrast to isolate foreground monument
    if slug not in {'zaglebie-ruhry','oberhausen','frankfurt-main','berlin','hamburg'}:
        for i,x in enumerate([20,76,126,392,448,494]):
            hh=(i*9+27)%58+24
            o+=rect(x,278-hh,31+i%3*6,hh,'#bed0a0','none',0)
            o+=poly(f'{x-3},{278-hh} {x+16},{266-hh} {x+37},{278-hh}', '#cb9980','none',0)
    if slug=='akwizgran':
        o+=house(18,269,88,71,roof='#b56b5d',wall='#e6c89d')
        o+=rect(147,244,174,92,'#caa47b',INK,3)
        o+=poly('136,244 235,195 331,244','#567d77',INK,2.8)
        o+=rect(185,172,99,71,'#d9bd94',INK,2.7)
        o+=poly('175,172 235,128 294,172','#547d76',INK,3)
        o+=dome(235,153,63,74,'#548f82')
        for dx in [165,235,305]:
            o+=rect(dx-10,249,19,40,'#8fb8ac',INK,2,9)
        o+=tower(340,283,175,45,STONE,'#537a7b','spire')
        o+=house(401,277,100,73,roof=TERRACOTTA,wall='#edca9e')
        o+=ground(False)
    elif slug=='kolonia':
        o+=house(20,263,81,57)
        o+=gothic_cathedral(247,260,216,156)
        o+=house(395,259,89,66,roof=RED,wall=STONE)
        o+=bridge(15,256,509,8)
        o+=river(281,19)
        o+=poly('390,285 455,285 443,296 402,296','#a56b54',INK,1.8)
    elif slug=='dusseldorf':
        o+=river(268,32)
        for x in [32,78,343,410]:
            o+=house(x,270,61,63,roof='#be6d5a')
        o+=tv_tower(252,269,247,True)
        o+=bridge(23,252,496,6)
        o+=path('M360 260 Q411 221 458 260','none','#567b7a',5)
    elif slug=='zaglebie-ruhry':
        o+=path('M0 259 L120 233 L178 254 L278 223 L360 262 L540 246 L540 300 L0 300 Z','#7ca485',INK,2)
        o+=rect(19,190,36,77,'#b46a58',INK,2)
        o+=rect(71,132,20,138,'#be7d66',INK,2)
        o+=rect(93,163,13,107,'#d3a07f',INK,2)
        o+=mine_headframe(206,274,1)
        o+=mine_headframe(368,280,.72)
        o+=gasometer(402,273,101,145)
        o+=rect(297,199,45,72,'#929ba0',INK,2)
        o+=ground(False)
    elif slug=='dortmund':
        o+=path('M0 269 Q100 239 188 269 T356 265 T540 269 L540 300 L0 300 Z','#76a67a',INK,2)
        o+=tv_tower(133,271,224,False)
        # big anonymous stadium and stands, prominent oval roof
        o+=ell(357,238,154,66,'#c1c9b7',INK,3.5)
        o+=ell(357,225,142,42,'#d4e7d2',INK,3)
        o+=ell(357,233,105,23,'#3a856b',INK,2.7)
        for x in range(224,492,27):o+=line(x,246,x,271,'#8d9893',3)
        o+=ground(False)
    elif slug=='bielefeld':
        o+=path('M0 278 Q97 206 165 231 Q252 159 345 229 Q415 191 540 265 L540 300 L0 300 Z','#6aaa79',INK,2.8)
        o+=rect(217,193,187,52,'#d6b490',INK,3)
        o+=poly('208,195 314,149 412,195','#a75e51',INK,2.4)
        o+=tower(299,243,168,54,STONE,'#62817b','castle')
        o+=tower(391,239,100,33,STONE,'#5a806c','spire')
        for x,y,s in [(38,272,.72),(115,275,.9),(171,270,.66),(468,281,1.0)]:o+=tree(x,y,s)
        o+=ground(False)
    elif slug=='hanower':
        o+=rect(107,255,323,87,'#e6c89f',INK,3)
        o+=poly('104,169 269,128 436,169','#d7b889',INK,2.7)
        for x in [111,158,359,407]:
            o+=tower(x,261,133,31,'#e7c696','#558777','spire')
        o+=rect(211,140,122,117,'#edd3a8',INK,3)
        o+=dome(271,144,77,83,'#559c83')
        o+=tower(271,77,33,18,STONE,'#548a7b','spire')
        for x in range(130,426,28):
            if x<212 or x>335:o+=rect(x,197,15,30,'#86b9ae',INK,1.5,7)
        o+=path('M242 258 L242 211 Q271 174 301 211 L301 258','#977e70',INK,2.6)
        o+=river(273,27)
        for x in [61,480]:o+=tree(x,268,.79)
    elif slug=='magdeburg':
        o+=gothic_cathedral(284,259,225,173)
        o+=house(20,270,92,68)
        o+=house(420,265,85,63)
        o+=bridge(22,252,498,7)
        o+=river(280,20)
    elif slug=='berlin':
        o+=tv_tower(153,270,255,True)
        for x,h,w in [(16,89,42),(61,116,49),(211,85,55),(457,90,52)]:
            o+=rect(x,270-h,w,h,'#b3c1ad',INK,2.4)
            for y in range(270-h+14,263,22):
                o+=rect(x+12,y,10,13,'#8fbac0',INK,1.3,1)
        # generic classical colonnaded gate, proportions evoke Berlin
        o+=rect(289,194,151,19,'#d8b88a',INK,3)
        o+=rect(288,182,153,14,'#e6c99c',INK,2.4)
        o+=rect(307,209,109,56,'#e4d1ae',INK,1.6)
        for x in [306,331,356,381,406]:
            o+=rect(x,211,13,55,'#f0d9ac',INK,2.2)
            o+=rect(x-2,205,17,7,'#f0d9ac',INK,1.1)
        o+=poly('300,185 364,172 432,185','#d4bd91',INK,2.3)
        o+=ground(False)
    elif slug=='frankfurt-oder':
        o+=brick_hall(183,269,173,133)
        o+=tower(266,151,93,32,'#c88764','#aa5b53','spire')
        o+=house(17,271,96,65)
        o+=house(430,270,88,63)
        o+=bridge(0,255,540,9)
        o+=river(278,22)
    elif slug=='oberhausen':
        o+=gasometer(163,273,159,207)
        o+=mine_headframe(388,270,.71)
        o+=rect(39,168,27,100,'#b8796a',INK,2.5)
        o+=rect(76,109,20,159,'#9c6e61',INK,2.5)
        o+=rect(103,191,30,76,'#8c9e9d',INK,2)
        o+=ground(False)
    elif slug=='saarbrucken':
        o+=river(271,29)
        for x,h in [(30,117),(74,90),(335,120),(372,165)]:
            o+=rect(x,274-h,24,h,'#b77963',INK,2.3)
            o+=rect(x,274-h-8,24,11,'#d7a085',INK,1.5)
        o+=house(146,269,66,86)
        o+=house(220,267,79,67)
        o+=bridge(0,255,540,8)
        o+=path('M40 253 Q135 202 260 253 T498 253','none','#6d8f90',6)
    elif slug=='mannheim':
        o+=house(34,268,83,69)
        o+=rect(216,180,112,87,'#d4b793',INK,3)
        o+=tower(272,190,159,83,STONE,'#648779','dome')
        o+=dome(272,102,54,28,'#598b80')
        for x in [221,246,282,312]:o+=rect(x,199,13,27,'#84bbc1',INK,1.4,5)
        o+=ell(270,270,111,12,'#c1e4e3',INK,1.7)
        for k in range(5):
            x=217+k*27
            o+=path(f'M{x},251 Q{x+8},223 {x+10},246','none','#a6e5ee',2)
        o+=river(277,23)
    elif slug=='frankfurt-main':
        o+=river(276,24)
        specs=[(27,95,41),(75,135,47),(137,184,43),(193,224,61),(257,157,42),(310,196,52),(367,131,50),(424,171,44),(475,97,48)]
        for j,(x,h,w) in enumerate(specs):
            o+=rect(x,276-h,w,h,('#7c9faa' if j%2==0 else '#a3bbb0'),INK,2.7)
            if j==3:
                o+=poly(f'{x},{276-h} {x+w/2},{276-h-42} {x+w},{276-h}', '#759aa9',INK,2.3)
            for yy in range(276-h+12,266,17):
                o+=line(x+5,yy,x+w-5,yy,'#c7e1d7',1.5)
            for xx in range(x+9,x+w-2,13):
                o+=line(xx,276-h+8,xx,268,'#5d8999',1.1)
        o+=bridge(1,265,538,8)
    elif slug=='erfurt':
        o+=river(281,19)
        o+=tower(116,267,189,34,STONE,'#647f76','spire')
        o+=tower(163,264,160,33,STONE,'#548178','spire')
        o+=bridge(15,263,510,8)
        for i,x in enumerate(range(190,502,44)):
            o+=house(x,265,42,64+i%3*8,roof=[RED,TERRACOTTA,'#6b8679'][i%3],half_timber=i%2==0)
    elif slug=='drezno':
        o+=river(271,29)
        o+=house(12,264,76,65)
        o+=tower(117,256,159,40,STONE,'#647e78','spire')
        o+=rect(180,256,167,122,'#e0b993',INK,3)
        o+=dome(264,152,87,100,'#b5a58a')
        o+=dome(263,122,44,44,'#728d80')
        o+=tower(264,90,56,22,STONE,'#648b7e','spire')
        o+=tower(397,260,168,45,STONE,'#617e76','spire')
        o+=bridge(9,261,525,9)
        # stylized paddle steamer
        o+=poly('348,286 431,286 416,296 363,296','#ad7254',INK,1.8)
        o+=rect(374,278,39,10,'#f1e4ca',INK,1.4)
        o+=circle(394,285,8,'#d8b484',INK,1.4)
    elif slug=='stuttgart':
        o+=path('M0 261 Q95 214 166 232 Q243 170 329 210 Q424 177 540 247 L540 300 L0 300 Z','#93bd80',INK,2.3)
        o+=tv_tower(279,272,235,False)
        for y0 in [220,237,254,269]:
            o+=path(f'M12,{y0} Q135,{y0-18} 208,{y0-7}','none','#6aa268',3.7)
            o+=path(f'M354,{y0-6} Q442,{y0-19} 531,{y0-10}','none','#c0d783',3)
        for x in [70,110,145,412,464,511]:
            o+=tree(x,276,.50+(x%4)*.06)
        o+=ground(False)
    elif slug=='norymberga':
        o+=path('M0 278 Q151 246 214 260 Q314 206 403 240 L540 271 L540 300 L0 300 Z','#90b377',INK,2.2)
        o+=rect(153,183,253,68,'#d5b18c',INK,3)
        o+=poly('147,182 251,136 409,182','#b46650',INK,2.6)
        o+=tower(319,256,175,56,STONE,'#aa6350','castle')
        o+=tower(177,244,130,40,STONE,'#7e7b73','spire')
        o+=house(19,274,91,69,half_timber=True)
        o+=house(429,273,91,62,half_timber=True)
        o+=ground(False)
    elif slug=='jena':
        o+=path('M0 275 Q92 179 169 250 Q247 162 328 241 Q421 199 540 270 L540 300 L0 300 Z','#87b87d',INK,2.6)
        o+=rect(237,90,79,186,'#b1baba',INK,3.1,10)
        o+=ell(276.5,91,39.5,11,'#7a9f9e',INK,3)
        for yy in range(110,264,15):
            o+=line(246,yy,306,yy,'#6799a0',2)
        o+=house(31,277,82,68,roof=RED)
        o+=house(430,275,80,65)
        o+=ground(False)
    elif slug=='lubeka':
        o+=house(28,277,91,86,roof='#b65b50',wall='#d89473')
        o+=brick_hall(369,275,123,109)
        o+=rect(180,180,168,95,'#bb7762',INK,3)
        o+=rect(180,180,168,13,'#dfb18c',INK,2)
        o+=tower(188,275,177,70,'#c7836c','#567d7b','spire')
        o+=tower(340,275,177,70,'#c7836c','#567d7b','spire')
        o+=path('M235 275 L235 230 Q265 190 294 230 L294 275','#4b5f63',INK,3)
        for xx in [237,277,302]:
            o+=rect(xx,194,13,21,'#6fa0a7',INK,1.4,5)
        o+=ground(False)
    elif slug=='hamburg':
        o+=river(272,28)
        for x in [2,72,146,223,299,376,449]:
            o+=brick_hall(x,274,70,72+(x%4)*14)
        o+=port_crane(100,279,179)
        o+=port_crane(365,280,146)
        o+=g(port_crane(0,0,116),238,275,.61)
        o+=poly('12,287 130,287 110,299 35,299','#6c7171',INK,1.9)
        o+=poly('374,290 493,290 474,300 395,300','#6c7171',INK,1.9)
    else:
        raise ValueError(f'No landmark {slug}')
    return svg_doc(540,300,o)

LANDMARK_IDS=[
 'akwizgran','kolonia','dusseldorf','zaglebie-ruhry','dortmund','bielefeld',
 'hanower','magdeburg','berlin','frankfurt-oder','oberhausen','saarbrucken',
 'mannheim','frankfurt-main','erfurt','drezno','stuttgart','norymberga',
 'jena','lubeka','hamburg'
]

# --------- preview (not part of runtime) ---------

def checker(w,h,tile=18):
    im=Image.new('RGB',(w,h),'#f3f5f4')
    d=ImageDraw.Draw(im)
    for y in range(0,h,tile):
        for x in range(0,w,tile):
            if (x//tile+y//tile)%2:
                d.rectangle((x,y,min(x+tile-1,w-1),min(y+tile-1,h-1)),fill='#d5dce0')
    return im

def typeface(sz):
    for p in ['/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf','/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf']:
        if Path(p).exists():return ImageFont.truetype(p,sz)
    return ImageFont.load_default()

def fit(im,size):
    return im.resize(size,Image.Resampling.LANCZOS)

def copy_to_sheet(dest,src,xy,size):
    im=fit(src,size)
    dest.paste(im,xy,im if im.mode=='RGBA' else None)

def board_preview(imgs):
    # Big verification board; all source PNG files, two copies per seam-checkable tile.
    w,h=3300,2800
    p=Image.new('RGB',(w,h),'#f5f1e8')
    d=ImageDraw.Draw(p)
    f=typeface(31);fsmall=typeface(20)
    d.text((42,21),'CEBULAK EXPRESS  /  DE   |   ARKUSZ WARSTW I 21 PUNKTOW',font=f,fill='#233842')
    # render viewport at 40% natural size
    view=Image.new('RGBA',(1080,1920))
    view.alpha_composite(imgs['de-sky.png'])
    view.alpha_composite(imgs['de-clouds.png'].crop((355,0,1435,600)),(0,170))
    view.alpha_composite(imgs['de-far.png'].crop((315,0,1395,900)),(0,805))
    view.alpha_composite(imgs['kolonia.png'].crop((185,0,1265,900)),(0,670))
    view.alpha_composite(imgs['de-near.png'].crop((330,0,1410,720)),(0,1180))
    view.alpha_composite(imgs['de-road.png'],(0,1590))
    p.paste(fit(view,(620,1102)),(45,104))
    d.text((45,1220),'WIDOK W GRZE 1080 x 1920 / KOLONIA',font=fsmall,fill='#233842')
    blocks=[('de-clouds.png',1000,140),('de-far.png',1000,204),('de-near.png',1000,165),('de-near-baustelle.png',1000,165),('de-road.png',1000,102)]
    yy=100
    for name,bw,bh in blocks:
        d.text((740,yy-8),name+'     [DWA KAFELKI - KRAWEDZ NA SRODKU]',font=fsmall,fill='#283e49')
        bg=checker(2*bw,bh,18)
        tile=fit(imgs[name],(bw,bh))
        bg.paste(tile,(0,0),tile)
        bg.paste(tile,(bw,0),tile)
        p.paste(bg,(740,yy+22))
        d=ImageDraw.Draw(p)
        d.line((740+bw,yy+22,740+bw,yy+22+bh),fill='#e95b42',width=2)
        yy+=bh+71
    p.paste(fit(imgs['de-sky.png'],(158,280)),(2840,102))
    d.text((2770,389),'de-sky.png',font=fsmall,fill='#233842')
    d.text((42,1270),'PUNKTY TRASY  /  21 PNG / ALFA NA SZACHOWNICY',font=f,fill='#233842')
    thumb_w,thumb_h=526,290
    for i,slug in enumerate(LANDMARK_IDS):
        x=42+(i%6)*543
        y=1320+(i//6)*355
        bg=checker(thumb_w,thumb_h,13)
        small=fit(imgs[slug+'.png'],(thumb_w,thumb_h))
        bg.paste(small,(0,0),small)
        p.paste(bg,(x,y))
        d.text((x,y+300),slug+'.png',font=fsmall,fill='#283e49')
    # Extra project metadata in blank lower area
    d.text((43,2752),'PNG @3x  /  LANDMARKI 1620 x 900  /  WARSTWY W KAFELKACH 2160 px',font=fsmall,fill='#536775')
    p.save(COUNTRY/'preview.png',format='PNG',optimize=True,compress_level=9)
    return view

def landmark_preview(imgs):
    w,h=2100,1840
    p=Image.new('RGB',(w,h),'#f6f2ea')
    d=ImageDraw.Draw(p)
    d.text((28,20),'NIEMCY / PUNKTY TRASY / 21 SILWETEK / ALFA',font=typeface(36),fill='#223a47')
    for i,slug in enumerate(LANDMARK_IDS):
        x=26+(i%4)*520
        y=100+(i//4)*279
        bg=checker(495,255,13)
        tile=fit(imgs[slug+'.png'],(495,255))
        bg.paste(tile,(0,0),tile)
        p.paste(bg,(x,y))
        d.text((x,y+259),slug+'.png',font=typeface(18),fill='#263f49')
    p.save(LANDMARKS/'preview.png',format='PNG',optimize=True,compress_level=9)


def main():
    imgs={}
    layers={
      'de-sky.png':(landscape_sky(),(360,640),None),
      'de-clouds.png':(landscape_clouds(),(720,200),120),
      'de-far.png':(landscape_far(),(720,300),160),
      'de-near.png':(landscape_near(),(720,240),160),
      'de-near-baustelle.png':(landscape_near(True),(720,240),160),
      'de-road.png':(landscape_road(),(360,110),112),
    }
    for name,(doc,size,ncolors) in layers.items():
        imgs[name]=save_svg(doc,COUNTRY/name,size,ncolors)
        print('layer',name,(COUNTRY/name).stat().st_size)
    for slug in LANDMARK_IDS:
        name=slug+'.png'
        imgs[name]=save_svg(build_landmark(slug),LANDMARKS/name,(540,300),160)
        print('landmark',name,(LANDMARKS/name).stat().st_size)
    board_preview(imgs)
    landmark_preview(imgs)

if __name__=='__main__':
    main()
