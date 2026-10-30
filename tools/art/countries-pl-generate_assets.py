#!/usr/bin/env python3
"""Autorskie, powtarzalne ilustracje wektorowe -> PNG @3x (zlecenie 07).

Uruchom: python public/assets/countries/pl/generate_assets.py
Wymaga: Python 3, cairosvg, Pillow. Brak zaleznosci projektu npm.
Projekt ilustracji: ChatGPT; retusz, sylwetki i kafelkowanie: kod SVG/CairoSVG.
"""
from __future__ import annotations
import io, math, random, struct, zlib
from pathlib import Path
from xml.sax.saxutils import escape
from PIL import Image, ImageDraw, ImageFont, PngImagePlugin
import cairosvg

BASE = Path(__file__).resolve().parent
ROOT = BASE.parents[3]
PL = ROOT / 'public/assets/countries/pl'
LM = ROOT / 'public/assets/landmarks'
LM.mkdir(parents=True, exist_ok=True)
OUT = '#3B4353'
SUM = {'grass':'#74AD5D','grass2':'#A1CF72','dark':'#4B8B5D','cream':'#FFEDB0',
       'roof':'#DA6950','water':'#68B8CC','pine':'#3E8665','tree':'#6CAC66'}
WIN = {'grass':'#D9EBEF','grass2':'#F6FCF8','dark':'#ADCEDC','cream':'#FFFFFF',
       'roof':'#A77267','water':'#98C6D4','pine':'#688F93','tree':'#B9D7DA'}

class V:
    def __init__(self,w,h):
        self.w,self.h=w,h
        self.parts=[f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">',
          '<defs><linearGradient id="sky" x2="0" y2="1"><stop stop-color="#58BEFA"/><stop offset="1" stop-color="#D3F7F6"/></linearGradient>',
          '<linearGradient id="winter" x2="0" y2="1"><stop stop-color="#83B8DD"/><stop offset="1" stop-color="#EBF6F9"/></linearGradient>',
          '<linearGradient id="road" x2="0" y2="1"><stop stop-color="#526579"/><stop offset="1" stop-color="#343D52"/></linearGradient>',
          '<linearGradient id="glass" x2="0" y2="1"><stop stop-color="#D8F7FF"/><stop offset="1" stop-color="#6BB5D0"/></linearGradient>',
          '</defs>']
    def a(self,raw):self.parts.append(raw)
    def rect(self,x,y,w,h,fill,st=None,sw=5,r=0,extra=''):
        self.a(f'<rect x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h:.1f}" rx="{r}" fill="{fill}"'+(f' stroke="{st}" stroke-width="{sw}"' if st else '')+f' {extra}/>')
    def circle(self,x,y,r,fill,st=None,sw=4):
        self.a(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{r:.1f}" fill="{fill}"'+(f' stroke="{st}" stroke-width="{sw}"' if st else '')+'/>')
    def ellipse(self,x,y,rx,ry,fill,st=None,sw=4):
        self.a(f'<ellipse cx="{x:.1f}" cy="{y:.1f}" rx="{rx:.1f}" ry="{ry:.1f}" fill="{fill}"'+(f' stroke="{st}" stroke-width="{sw}"' if st else '')+'/>')
    def poly(self,pts,fill,st=None,sw=6):
        s=' '.join(f'{x:.1f},{y:.1f}' for x,y in pts)
        self.a(f'<polygon points="{s}" fill="{fill}" stroke="{st or "none"}" stroke-width="{sw}" stroke-linejoin="round"/>')
    def path(self,d,fill='none',st=None,sw=5,extra=''):
        self.a(f'<path d="{d}" fill="{fill}" stroke="{st or "none"}" stroke-width="{sw}" stroke-linejoin="round" stroke-linecap="round" {extra}/>')
    def line(self,x1,y1,x2,y2,color=OUT,sw=6,extra=''):
        self.a(f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="{color}" stroke-width="{sw}" stroke-linecap="round" {extra}/>')
    def group(self,transform):self.a(f'<g transform="{transform}">')
    def end(self):self.a('</g>')
    def svg(self):return ''.join(self.parts)+'</svg>'

# Kolorowe, plastyczne, czytelne ksztalty, bez napisow, marek i symboli urzedowych.
def cloud(v,x,y,scale=1):
    v.group(f'translate({x},{y}) scale({scale})')
    v.ellipse(0,24,125,35,'#C9E8F4')
    for dx,dy,rr in [(-91,9,38),(-38,-15,55),(19,-22,65),(86,0,39)]:
        v.circle(dx,dy,rr,'#FFFEF3')
    v.ellipse(13,-43,40,15,'#FFFFFF')
    v.end()

def sun(v,x,y,r=90):
    v.circle(x,y,r*1.38,'#FFF5BF',None)
    v.circle(x,y,r,'#FFE39A','#FFEEC1',10)
    v.circle(x-r*.26,y-r*.25,r*.18,'#FFFAE1')

def window(v,x,y,w=33,h=46,lit=False):
    v.rect(x,y,w,h,'#FFE4A5' if lit else 'url(#glass)',OUT,4,3)
    v.line(x+w/2,y+1,x+w/2,y+h-1,'#EAF4E9' if lit else '#D7FBFF',3)
    v.line(x+1,y+h*.47,x+w-1,y+h*.47,'#EAF4E9' if lit else '#D7FBFF',2)

def house(v,x,y,w=140,h=125,c='#F9D7A5',roof='#CC715B',winter=False):
    # x,y - gorny lewy rog elewacji
    v.rect(x,y,w,h,c,OUT,6,3)
    v.rect(x+w*.7,y-63,18,55,'#C68162',OUT,4)
    v.poly([(x-13,y+5),(x+w*.5,y-64),(x+w+14,y+5)],roof,OUT,8)
    if winter:
        v.path(f'M{x-13} {y+5} L{x+w*.5} {y-64} L{x+w+14} {y+5}',st='#F7FCFE',sw=17)
    for i in range(3):
        v.line(x+30+i*42,y-20+i*3,x+44+i*39,y-32+i*2,'#E9A48A',3)
    window(v,x+15,y+24,32,42,winter)
    window(v,x+w-50,y+24,32,42,winter)
    v.rect(x+w*.47,y+h-60,36,60,'#AB6A4D',OUT,4,4)
    v.circle(x+w*.47+29,y+h-26,3,'#FFE3A1')

def townhouse(v,x,y,w=115,h=210,color='#F1BC83',roof='#B86055',gabled=True):
    v.rect(x,y,w,h,color,OUT,6,2)
    if gabled:
        v.poly([(x-7,y+5),(x+w*.5,y-42),(x+w+7,y+5)],roof,OUT,7)
    else:v.poly([(x-7,y),(x+4,y-25),(x+w-2,y-25),(x+w+7,y)],roof,OUT,6)
    v.rect(x+6,y+16,w-12,8,'#F9E0B0')
    for yy in range(int(y+43),int(y+h-28),65):
        for xx in [x+18,x+w-47]:window(v,xx,yy,29,40)
    v.rect(x+w*.40,y+h-52,32,52,'#815F59',OUT,4)

def tree(v,x,y,scale=1,winter=False,birch=False):
    p=WIN if winter else SUM
    v.group(f'translate({x},{y}) scale({scale})')
    if birch:
        v.rect(-12,-140,24,145,'#F0F1E2',OUT,5,6)
        for yy in [-111,-85,-55,-29]:v.line(-10,yy,1,yy-7,'#454B50',5)
        for sx in [-1,1]:v.line(0,-90,sx*55,-160,OUT,5)
        if winter:
            for cx,cy in [(-42,-165),(10,-189),(52,-155)]:v.ellipse(cx,cy,36,15,'#EDF9FA',None)
        else:
            for cx,cy in [(-46,-161),(13,-188),(54,-159)]:
                v.circle(cx,cy,40,'#70B76E',OUT,4)
                v.circle(cx-11,cy-11,18,'#A2D27A')
    else:
        v.rect(-12,-120,24,130,'#88664B',OUT,5,5)
        for cx,cy,rr in [(-43,-140,59),(35,-155,65),(0,-204,63)]:
            v.circle(cx,cy,rr,p['tree'],OUT,6)
            v.circle(cx-17,cy-22,rr*.38,'#C9DC84' if not winter else '#F9FEFF')
        if winter:
            v.path('M -89 -185 Q -43 -233 11 -196 M -7 -249 Q 27 -266 80 -207',st='#F9FEFF',sw=19)
    v.end()

def pine(v,x,y,scale=1,winter=False):
    p=WIN if winter else SUM
    v.group(f'translate({x},{y}) scale({scale})')
    v.rect(-11,-130,22,137,'#8C694D',OUT,5,3)
    for yy,ww in [(-105,70),(-155,58),(-209,44)]:
        v.poly([(-ww,yy+63),(0,yy-72),(ww,yy+63)],p['pine'],OUT,6)
        if winter:v.path(f'M {-ww*.68} {yy+22} L0 {yy-72} L{ww*.67} {yy+23}',st='#F3FCFC',sw=13)
        else:v.path(f'M {-ww*.4} {yy+14} L0 {yy-31} L{ww*.32} {yy+10}',st='#77BB7A',sw=6)
    v.end()

def stork(v,x,y,scale=1):
    v.group(f'translate({x},{y}) scale({scale})')
    v.line(0,0,0,-120,'#796552',11)
    v.line(-38,-120,42,-120,'#6C5848',7)
    v.ellipse(0,-127,55,17,'#856B4E',OUT,4)
    v.ellipse(6,-163,26,22,'#FAF9EC',OUT,5)
    v.ellipse(28,-153,24,11,OUT)
    v.line(23,-141,37,-116,'#E78F4F',4)
    v.line(7,-141,3,-116,'#E78F4F',4)
    v.poly([(28,-166),(77,-159),(30,-155)],'#E49A50',OUT,3)
    v.end()

def windmill(v,x,y,scale=1):
    v.group(f'translate({x},{y}) scale({scale})')
    v.line(0,-8,0,-183,OUT,7)
    v.line(-36,-181,36,-181,OUT,7)
    v.circle(0,-181,13,'#F6EED4',OUT,5)
    for a in [0,90,180,270]:
        v.group(f'translate(0,-181) rotate({a})')
        v.poly([(-10,-20),(-21,-66),(-3,-75),(8,-20)],'#FFF6E4',OUT,3)
        v.end()
    v.end()

def bush(v,x,y,s=1,winter=False):
    c='#E8F4F4' if winter else '#538D5B'
    v.ellipse(x,y,43*s,23*s,c,OUT,4)
    v.circle(x-12*s,y-10*s,22*s,'#F9FCFC' if winter else '#82C76A',None)

def small_van(v,x,y,s=1,color='#E5DFCE'):
    v.group(f'translate({x},{y}) scale({s})')
    v.rect(3,-55,150,52,color,OUT,7,12)
    v.poly([(130,-55),(155,-46),(182,-13),(182,-3),(130,-3)],color,OUT,6)
    v.rect(128,-48,34,28,'url(#glass)',OUT,4,2)
    v.rect(15,-45,43,22,'url(#glass)',OUT,4,3)
    v.line(2,-13,181,-13,'#B0B5B4',4)
    for wx in [37,144]:
        v.circle(wx,-2,18,OUT)
        v.circle(wx,-2,8,'#C2C9CE')
    v.end()

def station(v,x,y,s=1,winter=False,queue=True):
    v.group(f'translate({x},{y}) scale({s})')
    v.ellipse(235,10,360,24,'#C1AF85' if not winter else '#BED9DC')
    # zadaszenie: czerwony pas, bez wzoru logo
    v.rect(0,-252,504,48,'#FFF8E5',OUT,8,2)
    v.rect(0,-252,504,19,'#D9504D')
    v.poly([(0,-252),(37,-278),(539,-278),(504,-252)],'#EE7B60',OUT,7)
    for xx in [57,413]:
        v.rect(xx,-207,27,191,'#F9EEE0',OUT,6)
        v.rect(xx-9,-35,45,15,'#AAB0AD',OUT,4)
    # dystrybutory
    for xx in [136,324]:
        v.rect(xx,-136,64,108,'#F8E8C6',OUT,7,7)
        v.rect(xx+12,-117,40,38,'#88B7BC',OUT,4,4)
        v.rect(xx+29,-28,10,22,'#8B8F8A',OUT,3)
        v.line(xx+59,-96,xx+76,-70,OUT,6)
        v.line(xx+76,-70,xx+72,-36,OUT,5)
    # budka z zapiekankami i kawa
    v.rect(548,-154,175,145,'#F4D8A5',OUT,8,8)
    v.poly([(535,-155),(734,-155),(709,-194),(561,-194)],'#DB684F',OUT,7)
    for sx in range(555,725,28):v.rect(sx,-183,14,28,'#FFF4DB',None)
    v.rect(562,-133,146,65,'#6F9CA1',OUT,5,4)
    v.rect(577,-119,61,27,'#F4DCB2',OUT,4,4)
    v.circle(670,-108,21,'#F5EBCE',OUT,3)
    v.circle(670,-108,12,'#98775B')
    v.line(664,-127,674,-145,'#FFFFFF',3)
    for cx in [601,640,680]:
        v.ellipse(cx,-46,14,10,'#E2AD62',OUT,2)
    if queue:
        small_van(v,752,-9,.84,'#EAE5DC')
        small_van(v,917,-9,.65,'#93B9B1')
    if winter:
        v.path('M-5 -255 L37 -281 L539 -281',st='#F9FEFE',sw=15)
        v.rect(540,-203,177,14,'#F9FCFF',None)
    v.end()

def border_sign(v,x,y,s=1):
    # puste pole na napis, bez flagi, herbu, gwiazd ani ikon UE
    v.group(f'translate({x},{y}) scale({s})')
    v.line(-76,0,-76,-235,'#858F97',12)
    v.line(76,0,76,-235,'#858F97',12)
    v.rect(-111,-335,222,116,'#2478AE','#F9FCFC',9,10)
    v.rect(-95,-322,190,90,'#2478AE',None,0,3)
    v.end()

def barrier(v,x,y,s=1):
    v.group(f'translate({x},{y}) scale({s})')
    v.rect(0,-53,35,52,'#F2E8D6',OUT,6,5)
    v.rect(29,-65,300,19,'#FFF8E8',OUT,5,4)
    for xx in range(43,315,72):
        v.poly([(xx,-65),(xx+23,-65),(xx+42,-46),(xx+19,-46)],'#D65A50')
    v.end()

def hill(v,w,h,top,base,amp=43,phase=0,period=1,fill='#9AC674',stroke=False):
    coords=[]
    for x in range(0,w+1,36):
        yy=top+amp*math.sin((2*math.pi*period*x/w)+phase)+amp*.28*math.sin((6*math.pi*period*x/w)+phase*2)
        coords.append((x,round(yy,2)))
    pts=[(0,base)]+coords+[(w,base)]
    v.poly(pts,fill,OUT if stroke else None,5)

def ground(v,w,top=770,winter=False,water=False):
    c=WIN if winter else SUM
    if water:
        v.path(f'M0 {top+21} Q{w*.25} {top-4} {w*.5} {top+24} T{w} {top+22} L{w} 900 L0 900 Z',c['water'],OUT,6)
        for xx in range(120,w,170):v.path(f'M{xx} {top+48+(xx%3)*11} q45 -8 96 0',st='#DDF4E9',sw=5)
    else:
        v.path(f'M0 {top+40} Q{w*.25} {top-30} {w*.50} {top+38} T{w} {top+40} L{w} 900 L0 900 Z',c['grass'],OUT,7)
        for xx in range(35,w,135):
            v.path(f'M{xx} {top+84+(xx%3)*7} q15 -11 31 -2',st='#B7D37B' if not winter else '#EDF9F8',sw=5)

def sky(winter=False):
    v=V(1080,1920)
    v.rect(0,0,1080,1920,'url(#winter)' if winter else 'url(#sky)')
    sun(v,185,235,93 if not winter else 76)
    # lagodna poswiata na horyzoncie, bez chmur (osobna warstwa)
    v.ellipse(710,1640,760,215,'#EAF8E2' if not winter else '#F5FDFF',None)
    if winter:
        for x,y,r in [(751,251,3),(909,380,4),(477,683,4),(100,930,5),(865,1100,4)]:v.circle(x,y,r,'#F8FCFF')
    return v

def clouds():
    v=V(2160,600)
    # Chmury powtarzalne w poziomie, obiekty przechodzace przez granice sa duplikowane.
    for x,y,s in [(95,125,1.13),(590,395,1.2),(1050,161,.8),(1590,318,1.08),(2050,96,1.3)]:
        for dx in [-2160,0,2160]:cloud(v,x+dx,y,s)
    return v

def far(winter=False):
    v=V(2160,900)
    c=WIN if winter else SUM
    hill(v,2160,900,432,900,45,0,1,'#B4D9BF' if not winter else '#C9DFE9')
    hill(v,2160,900,520,900,56,math.pi*.25,2,'#83B998' if not winter else '#EAF6F7')
    hill(v,2160,900,620,900,33,0,1,'#D3BF6B' if not winter else '#DBEFF0',True)
    hill(v,2160,900,713,900,32,math.pi*.75,2,'#F0CD68' if not winter else '#F4FBF8')
    # Pola rzepaku, zboza i drozki w rytmie powtarzalnym
    for x in range(-180,2300,285):
        v.path(f'M{x} 900 Q{x+90} 785 {x+152} 670',st='#CDA552' if not winter else '#CADFE1',sw=12)
    for x in range(48,2160,55):
        yy=740+26*math.sin(x*4*math.pi/2160)
        v.line(x,yy,x+11,yy-10,'#F9E7A0' if not winter else '#FFFFFF',3)
    # Budownictwo i krajobraz: osiedle, wiatraki, wiejskie domy, bociany
    for x in [330,1080,1875]:
        for dx in [-2160,0,2160]:
            if not winter:
                house(v,x+dx,560,96,85,'#E9BC90','#C86B50')
                house(v,x+dx+106,582,93,72,'#FFF0BE','#D3805E')
            else:
                house(v,x+dx,560,96,85,'#E0D5CA','#A27F7D',True)
                house(v,x+dx+106,582,93,72,'#F2DFCD','#AB8277',True)
    for x in [700,1460]:
        for dx in [-2160,0,2160]:
            # blok z wielkiej plyty / pastelowe balkony
            v.rect(x+dx,489,170,155,'#DCBDAA' if not winter else '#D5E0E2',OUT,6,4)
            v.rect(x+dx,489,55,155,'#F1C8A3' if not winter else '#D0DCE4')
            v.rect(x+dx+109,489,60,155,'#9BCCA7' if not winter else '#E7F6F7')
            for yy in [520,573,622]:
                for xx in [x+dx+20,x+dx+73,x+dx+127]:window(v,xx,yy,27,29,winter)
            v.rect(x+dx-9,636,189,13,'#9A7D68',OUT,3)
    for x in [260,880,1350,2050]:
        for dx in [-2160,0,2160]:
            pine(v,x+dx,670,.68,winter)
            if not winter:stork(v,x+dx+63,630,.68)
    if not winter:
        for x in [500,1720]:windmill(v,x,593,.6)
    return v

def near(winter=False):
    v=V(2160,720)
    p=WIN if winter else SUM
    # bliskie pobocze na wysokosci dolnej polowy; szachownica dzialek i krzewow
    v.path('M0 620 Q540 603 1080 620 T2160 620 L2160 720 L0 720 Z',p['grass2'],OUT,8)
    for x in [160,790,1230,1880]:
        for dx in [-2160,0,2160]:tree(v,x+dx,624,.96,winter,birch=(x%3==1))
    for x in [400,1060,1625,2120]:
        for dx in [-2160,0,2160]:pine(v,x+dx,610,1.03,winter)
    # maly ogrodek dzialkowy, altanka, stol i szklarniowy domek
    for dx in [-2160,0,2160]:
        house(v,530+dx,510,115,99,'#EFD4A4' if not winter else '#E0E9E7','#B66C50',winter)
        v.rect(665+dx,530,110,79,'#A3CEC4' if not winter else '#D9EBE7',OUT,5,2)
        v.poly([(652+dx,530),(718+dx,482),(787+dx,530)],'#6BA2A1' if not winter else '#F9FBFD',OUT,5)
        v.line(718+dx,490,718+dx,604,OUT,3)
    # dlugi plot - segmenty podzielne przez pelna szerokosc
    for x in range(0,2161,72):
        v.rect(x,615,12,83,'#AE8765' if not winter else '#D3D0C7',OUT,3,3)
    v.line(0,647,2160,647,'#80664E' if not winter else '#B7BFC4',11)
    v.line(0,686,2160,686,'#80664E' if not winter else '#B7BFC4',9)
    for x in range(28,2160,72):bush(v,x,691,.36,winter)
    if not winter:
        # kilkanascie czytelnych ogrodkowych elementow
        for x in [594,905,1365,1740]:
            for yy in [650,680]:
                v.circle(x,yy,8,'#EFAA42')
    else:
        for x in range(50,2160,245):
            v.ellipse(x,714,87,21,'#F6FCFF')
    return v

def road():
    v=V(1080,330)
    v.rect(0,0,1080,330,'url(#road)')
    v.rect(0,4,1080,24,'#98A7B6')
    v.line(0,24,1080,24,OUT,7)
    for x in range(0,1080,54):
        v.rect(x+12,6,11,13,'#DCE8E9')
    v.rect(0,37,1080,11,'#D4D8DA')
    v.line(0,51,1080,51,'#384A58',7)
    v.rect(0,88,1080,8,'#77828E')
    v.rect(0,321,1080,9,'#263341')
    # regularne pasy, 180 px okres -> bez widocznego szwu
    for x in range(0,1080,180):
        v.rect(x+27,237,106,11,'#FFF2CF',None,0,4)
    for x in range(0,1080,60):
        v.line(x+18,153,x+39,153,'#647481',2)
    return v

def border_near():
    v=V(2160,720)
    v.path('M0 645 L2160 645 L2160 720 L0 720 Z','#8FB978',OUT,6)
    v.path('M0 695 L2160 695',st='#6A7975',sw=9)
    station(v,130,634,1.12,False,False)
    border_sign(v,1115,625,.76)
    barrier(v,1340,652,.85)
    station(v,1605,666,.49,False,False)
    for x,y,s in [(1180,678,.83),(1450,692,.65),(1620,686,.54),(1910,687,.54)]:
        small_van(v,x,y,s,'#E6DDD2' if x%2 else '#C7D5CE')
    pine(v,2040,616,.95,False)
    tree(v,38,625,.8,False,True)
    return v

# ---------------------- panoramy punktow trasy ----------------------
def landmark_canvas(winter=False,water=False):
    v=V(1620,900)
    ground(v,1620,766,winter,water)
    return v

def market(v,x=140,y=507,colors=None,wide=130,heights=None):
    colors=colors or ['#EFBC88','#EFDA9B','#B8CFA8','#EFB18A','#D7C6CE']
    heights=heights or [255,287,236,274,245]
    for i,h in enumerate(heights):townhouse(v,x+i*wide,y+280-h,wide-4,h,colors[i%len(colors)],'#AD665D',i%2==0)

def poz(v):
    market(v,95,520,wide=112,heights=[225,263,235,256,220])
    market(v,950,520,wide=116,heights=[221,264,229,243,219])
    x,y=660,255
    v.rect(x,y+125,284,425,'#E5D1B0',OUT,11)
    v.rect(x+18,y+141,248,92,'#F8E4C0',OUT,5)
    for xx in range(x+43,x+265,49):window(v,xx,y+170,30,49)
    for xx in range(x+38,x+268,60):v.path(f'M{xx} {y+382} v-74 q15 -24 31 0 v74',st=OUT,sw=7)
    v.rect(x+98,y-2,88,148,'#E5D6BA',OUT,8)
    v.poly([(x+84,y+10),(x+142,y-78),(x+204,y+10)],'#B86C62',OUT,9)
    v.rect(x+119,y-94,47,43,'#A0C4AD',OUT,7)
    v.rect(x+137,y-133,12,52,'#BDA66C',OUT,6)
    for gx in [x+118,x+162]:
        v.ellipse(gx,y-21,22,17,'#FFFAEC',OUT,4)
        v.line(gx-8,y-13,gx-13,y+2,'#B3A08A',4)
        v.line(gx+8,y-12,gx+14,y+4,'#B3A08A',4)
    v.rect(x+89,y+254,105,163,'#865D55',OUT,8,7)
    v.poly([(x+59,y+135),(x+142,y+105),(x+223,y+135)],'#CB6B59',OUT,6)

def lodz(v):
    # przemysl w tle, czerwone kominy, szedowe dachy, secesja z boku
    for x,h in [(120,330),(365,475),(560,420),(1170,460),(1390,337)]:
        v.rect(x,775-h,48,h,'#B15D4F',OUT,7,4)
        v.rect(x-8,775-h-17,64,23,'#B8695A',OUT,5)
        for yy in range(int(775-h+38),770,58):v.line(x+4,yy,x+44,yy,'#D99272',4)
    v.rect(160,560,1170,225,'#B96C59',OUT,10)
    for i in range(12):
        xx=180+i*92
        v.poly([(xx-4,566),(xx+45,522),(xx+95,566)],'#9F5550',OUT,4)
        for yy in [609,684]:window(v,xx+17,yy,42,53)
    townhouse(v,30,420,127,355,'#E9D1A8','#B77268')
    townhouse(v,1360,405,183,373,'#D7BDAB','#B57A69')
    for x in [70,1430]:v.path(f'M{x} 506 q48 -22 84 0',st='#F5E6C6',sw=10)

def warszawa(v):
    # Most i Wisla, sylwetka Palacu Kultury i wspolczesne bloki
    for x,w,h in [(75,175,276),(306,145,336),(1090,170,305),(1290,170,380)]:
        v.rect(x,764-h,w,h,'#8EADC0',OUT,7,3)
        for yy in range(800-h,741,41):
            for xx in range(x+16,x+w-10,35):v.rect(xx,yy,21,25,'#DCE6DB',None)
    x=681
    v.rect(x,320,275,438,'#D8C7AC',OUT,10)
    for off,h in [(-43,115),(257,108)]:
        v.rect(x+off,568,61,h,'#D2C7B2',OUT,7)
    v.rect(x+51,240,171,110,'#E7D8B7',OUT,8)
    v.rect(x+78,164,119,95,'#E7D8B7',OUT,8)
    v.poly([(x+68,164),(x+137,83),(x+205,164)],'#B8B4A0',OUT,8)
    v.rect(x+132,20,14,78,'#C4B8A0',OUT,7)
    v.circle(x+138,17,10,'#DDA96D',OUT,3)
    for yy in [377,455,538,623]:
        for xx in range(x+33,x+247,51):window(v,xx,yy,29,41)
    v.circle(x+137,283,37,'#F5E4BE',OUT,6)
    v.line(x+137,284,x+137,264,OUT,5)
    v.line(x+137,284,x+156,296,OUT,4)
    # most w dolnej czesci po obu stronach
    v.path('M30 750 Q410 690 780 748 T1590 748',st='#E9CFAC',sw=22)
    for xx in range(55,1600,100):v.line(xx,745,xx,806,'#8E6F64',7)

def wroclaw(v):
    market(v,10,515,wide=124,heights=[220,264,246,209,253])
    market(v,970,515,wide=124,heights=[240,224,278,250,214])
    x=630
    v.rect(x,335,340,413,'#C86B59',OUT,10)
    v.poly([(x-17,348),(x+178,223),(x+361,348)],'#995353',OUT,9)
    for i in range(6):
        xx=x+17+i*51
        v.poly([(xx,350),(xx+25,294),(xx+48,350)],'#D99B79',OUT,4)
    v.rect(x+140,141,80,307,'#C98C70',OUT,8)
    v.poly([(x+125,141),(x+180,48),(x+235,141)],'#6A827C',OUT,8)
    v.rect(x+174,24,13,54,'#B9A975',OUT,5)
    for yy in [380,481,580]:
        for xx in range(x+32,x+306,65):window(v,xx,yy,32,52)
    v.rect(x+154,634,58,114,'#80564C',OUT,7,6)
    # krasnal przy chodniku
    v.poly([(112,746),(155,680),(193,746)],'#D75451',OUT,5)
    v.circle(154,744,26,'#EFC5A2',OUT,4)
    v.line(138,774,127,791,OUT,6)
    v.line(172,774,185,791,OUT,6)
    # luk mostu po lewej
    v.path('M30 789 Q217 702 431 784',st='#D9C7B3',sw=25)

def szczecin(v):
    # Odra, nabrzeze i Wal Chrobrego w centrum
    v.path('M0 796 Q250 771 515 784 T1620 792 L1620 900 L0 900 Z','#6EBCCB',OUT,6)
    v.rect(480,475,678,280,'#ECD8B7',OUT,10)
    v.rect(560,373,540,110,'#F8E9CF',OUT,9)
    for xx in [580,1052]:
        v.rect(xx,270,66,210,'#E8D7BF',OUT,7)
        v.poly([(xx-14,280),(xx+33,193),(xx+80,280)],'#A86A60',OUT,8)
        v.rect(xx+23,162,20,47,'#CCA776',OUT,5)
    for xx in range(528,1110,74):
        window(v,xx,514,36,58)
        v.path(f'M{xx+3} 714 v-83 q16 -23 34 0 v83',st=OUT,sw=6)
    for x in [122,1350]:
        v.line(x,765,x,311,OUT,11)
        v.line(x-101,376,x+115,376,OUT,10)
        v.line(x+20,375,x+64,538,OUT,6)
        v.line(x-92,374,x-29,529,OUT,6)
        v.rect(x-53,687,131,58,'#DDAD75',OUT,5)
    for x in [286,1190]:
        townhouse(v,x,514,133,251,'#EBC599','#D28B71')
    for x in range(70,1550,145):v.path(f'M{x} 857 q28 -10 68 0',st='#DBF6EE',sw=6)

def legnica(v):
    market(v,60,523,wide=127,heights=[256,212,275,240,212])
    market(v,1120,513,wide=112,heights=[244,271,212,257])
    # Zamek piastowski dwie masywne wieze, bez tresci sakralnych
    v.rect(681,447,409,318,'#C9987C',OUT,10)
    v.rect(633,293,127,467,'#B98572',OUT,10)
    v.poly([(620,301),(694,197),(767,301)],'#BD6E5B',OUT,9)
    v.rect(968,333,130,427,'#BA8C72',OUT,10)
    v.poly([(955,341),(1031,229),(1110,341)],'#B76B59',OUT,9)
    for x in [676,1013]:
        for y in [380,470,568]:window(v,x,y,45,66)
    v.path('M814 758 v-142 q77 -112 155 0 v142',st=OUT,sw=11)
    v.rect(854,666,74,95,'#705A55')

def border_land(v,which='swiecko'):
    # Rzeka, most (opcjonalnie), szlaban, pusty znak drogowy
    v.path('M0 790 Q430 759 835 787 T1620 787 L1620 900 L0 900 Z','#8CBAC5',OUT,6)
    v.rect(0,702,1620,45,'#C8C2AE',OUT,8)
    for x in range(70,1620,135):
        v.line(x,704,x,789,'#858986',8)
        v.path(f'M{x-50} 741 Q{x+15} 696 {x+68} 741',st='#B6A990',sw=6)
    border_sign(v,1218,678,1.02)
    barrier(v,527,713,1.2)
    for x in [115,375,1045,1505]:tree(v,x,703,.75,False,birch=(x==115))
    if which=='jedrzychowice':
        # skarpy i most nad Nysa Luzycka
        v.poly([(40,710),(305,616),(480,714)],'#A7C48F',OUT,5)
        v.poly([(890,709),(1060,618),(1160,706)],'#A7C48F',OUT,5)
    else:
        small_van(v,86,719,.65,'#EFE6D6')
        small_van(v,343,719,.55,'#AED2C2')

def stacja_land(v,variant=0):
    station(v,70,738,1.31,False,True)
    border_sign(v,1227,740,.7)
    for x in [1000,1260]:small_van(v,x,750,.77,'#DDD9C7' if x==1000 else '#A8C0BC')
    for x in [20,1540]:pine(v,x,750,.85,False)
    if variant==1:
        # Wariant A4: w dali poziomy wiadukt i dodatkowa kolejka kombi.
        v.path('M1034 671 Q1298 636 1604 663',st='#899B96',sw=19)
        for bx in [1120,1450]:v.line(bx,666,bx,767,'#8E8982',11)
        small_van(v,992,765,.48,'#CFBBA2')
    elif variant==2:
        v.path('M1000 801 Q1290 779 1590 800',st='#77B4C5',sw=26)
    elif variant==3:
        # Specjalna scena granicy: fizyczny szlaban i dwa samochody.
        barrier(v,1053,793,.8)
        small_van(v,1115,762,.45,'#B8C9BD')

def swinoujscie(v):
    ground(v,1620,762,False,True)
    # latarnia w Swinoujsciu, czerwony det, portowy wiatrak-stawa
    v.rect(354,327,124,414,'#F1E1CA',OUT,10)
    for yy in [414,510,624]:v.rect(359,yy,114,28,'#BD7265')
    v.rect(341,300,148,51,'#C56C60',OUT,6)
    v.poly([(344,301),(416,211),(488,301)],'#A86A5D',OUT,9)
    v.rect(380,184,68,37,'url(#glass)',OUT,6)
    v.rect(390,157,48,27,'#B65D59',OUT,5)
    # wiatrak-stawa na falochronie
    v.rect(1035,455,175,260,'#F7EFE2',OUT,8)
    v.poly([(1004,467),(1120,379),(1242,467)],'#A75B54',OUT,7)
    v.circle(1120,538,29,'#BE6D5D',OUT,5)
    for a in [0,90,180,270]:
        v.group(f'translate(1120,538) rotate({a})')
        v.poly([(-13,-30),(-24,-118),(14,-116),(10,-27)],'#FFFAE8',OUT,5)
        v.end()
    v.path('M10 762 L650 762 M860 763 L1590 763',st='#A2A196',sw=24)
    for x in [630,750,1340,1510]:
        v.path(f'M{x} 353 q32 -25 65 0',st=OUT,sw=7)
    # portowy prom bez marki, w dali
    v.rect(1280,680,276,62,'#E7DED0',OUT,8,3)
    v.rect(1305,639,105,43,'#FFF6E6',OUT,6)

def mother(v,x,y,s=1,winter=False):
    v.group(f'translate({x},{y}) scale({s})')
    v.circle(0,-63,20,'#F2C49B',OUT,4)
    v.path('M-21 -72 Q-26 -98 -2 -95 Q22 -97 19 -71 Q3 -87 -21 -72',fill='#825948',st=OUT,sw=3)
    v.poly([(-25,-39),(25,-39),(31,35),(-31,35)],'#C45156' if not winter else '#976D8A',OUT,5)
    v.line(21,-22,58,-64,'#F2C49B',12)
    v.circle(58,-70,10,'#F2C49B',OUT,3)
    v.line(-18,-17,-42,17,'#F2C49B',9)
    v.end()

def dom(v,winter=False):
    p=WIN if winter else SUM
    v=landmark_canvas(winter)
    # sciezka / rabaty ogrodowe
    v.path('M450 900 Q589 804 788 773 L960 773 Q719 844 626 900 Z','#DDBE8C' if not winter else '#DCEBF0',OUT,6)
    for x in [96,170,246,1230,1330,1465]:
        tree(v,x,770,.86,winter,(x%2==0))
    # dom rodzinny z czerwonym dachem, gankiem i dwoma oknami
    v.rect(504,389,612,386,'#FFDEAF' if not winter else '#E8DCD2',OUT,12,5)
    v.poly([(450,402),(804,159),(1163,402)],'#C86A53' if not winter else '#AB796B',OUT,12)
    v.rect(929,236,57,92,'#B76354',OUT,8)
    if winter:v.path('M450 400 L804 158 L1163 400',st='#F8FDFE',sw=28)
    else:
        for x in range(610,1020,54):v.line(x,330+(x-804)*.18,x+38,321+(x-804)*.18,'#DE9171',4)
    # szczyt poddasza
    window(v,744,283,119,91,winter)
    # wielkie okno z mama machajaca
    v.rect(552,492,169,177,'#D8F5F9' if not winter else '#FDE5AD',OUT,10,7)
    mother(v,635,619,.77,winter)
    v.line(638,492,638,675,OUT,6)
    v.rect(537,664,198,17,'#B58862',OUT,5)
    # drzwi oraz ganek
    v.rect(842,557,124,219,'#A66E57',OUT,9,5)
    v.circle(945,672,8,'#F2D08B')
    for x in [825,992]:v.rect(x,544,16,230,'#FAF1D4',OUT,4)
    v.poly([(803,549),(907,490),(1029,549)],'#B76C58' if not winter else '#F9FCFF',OUT,7)
    window(v,997,497,82,133,winter)
    v.rect(0,773,1620,127,'#90C06C' if not winter else '#F1FBFD',None)
    for x in [300,413,1195,1300]:
        bush(v,x,801,.8,winter)
        for dx in [-21,3,25]:
            v.circle(x+dx,784-(dx%13),10,'#EB7989' if not winter else '#FCFBF8',None)
    # stol nakryty w ogrodzie; zimą podswietlone okna i lampki, stol w oknie
    v.poly([(1125,753),(1437,753),(1484,798),(1090,798)],'#FCE6B8',OUT,8)
    for x in [1150,1415]:v.rect(x,792,19,89,'#815F4B',OUT,4)
    for x in [1193,1280,1372]:
        v.ellipse(x,763,28,9,'#FFFFFF',OUT,4)
        v.circle(x,757,8,'#D78A72')
    v.rect(1249,711,32,51,'#CBE4E0',OUT,4,6)
    v.circle(1265,707,15,'#F0D9A1',OUT,3)
    if winter:
        for x in range(510,1110,46):
            v.line(x,397,x,415,'#5C7476',2)
            v.circle(x,416,9,['#E7BA82','#E68C79','#F8F7D9'][x%3])
        for x in [23,415,550,1085,1575]:v.ellipse(x,792,75,28,'#F9FDFD')
        # drobne platki i rozswietlone okno na parterze
        for x,y in [(352,141),(1295,253),(1222,470),(440,625)]:
            v.line(x-8,y,x+8,y,'#FFFFFF',4)
            v.line(x,y-9,x,y+9,'#FFFFFF',4)
    return v

# -- I/O, format png, sRGB, optymalizacja bez widocznej utraty --
def srgb_chunk(b):
    if b'sRGB' in b[:1024] or b'iCCP' in b[:1024]:return b
    # PNG: po 33 bajtach IHDR, z podpisem i checksum
    data=b'\x00'; name=b'sRGB'
    chunk=struct.pack('>I',len(data))+name+data+struct.pack('>I',zlib.crc32(name+data)&0xFFFFFFFF)
    return b[:33]+chunk+b[33:]

def write_svg(v,path,colors=256):
    data=cairosvg.svg2png(bytestring=v.svg().encode(),output_width=v.w,output_height=v.h)
    im=Image.open(io.BytesIO(data)).convert('RGBA')
    # Wszystkie warstwy kafelkowane maja doslownie identyczne piksele na krawedzi.
    if path.name in {'pl-clouds.png','pl-far.png','pl-near.png','pl-road.png',
                     'pl-far-zima.png','pl-near-zima.png'}:
        for yy in range(im.height):
            im.putpixel((im.width-1,yy),im.getpixel((0,yy)))
    # paleta lossless/near-lossless dla grubokonturowej ilustracji: wysoka kompresja
    base=(im if path.name.startswith('pl-sky') else
          im.quantize(colors=colors,method=Image.Quantize.FASTOCTREE,dither=Image.Dither.NONE))
    p=io.BytesIO();base.save(p,format='PNG',optimize=True,compress_level=9)
    final=srgb_chunk(p.getvalue())
    path.write_bytes(final)
    return len(final)

LANDMARKS={
 'poznan':poz,'lodz':lodz,'warszawa':warszawa,'szczecin':szczecin,
 'wroclaw':wroclaw,'legnica':legnica,
}

def generate():
    sizes=[]
    for name,fn in [
       ('pl-sky',lambda:sky(False)),('pl-clouds',clouds),
       ('pl-far',lambda:far(False)),('pl-near',lambda:near(False)),('pl-road',road),
       ('pl-sky-zima',lambda:sky(True)),('pl-far-zima',lambda:far(True)),
       ('pl-near-zima',lambda:near(True)),('pl-border-near',border_near),
    ]:
        f=PL/(name+'.png');sizes.append((f,write_svg(fn(),f)))
    for name,fn in LANDMARKS.items():
        v=landmark_canvas(water=(name=='szczecin'))
        fn(v)
        f=LM/(name+'.png');sizes.append((f,write_svg(v,f)))
    for name,typ in [('granica-swiecko','swiecko'),('granica-jedrzychowice','jedrzychowice')]:
        v=landmark_canvas(water=True);border_land(v,typ)
        f=LM/(name+'.png');sizes.append((f,write_svg(v,f)))
    for name,i in [('stacja-swiecko',0),('stacja-jedrzychowice',1),('stacja-swinoujscie',2),('granica-stacja',3)]:
        v=landmark_canvas();stacja_land(v,i)
        f=LM/(name+'.png');sizes.append((f,write_svg(v,f)))
    v=landmark_canvas(water=True);swinoujscie(v)
    f=LM/'swinoujscie.png';sizes.append((f,write_svg(v,f)))
    for name,winter in [('dom-meta',False),('dom-meta-zima',True)]:
        f=LM/(name+'.png');sizes.append((f,write_svg(dom(None,winter),f)))
    # Previews: pojedynczy obraz zlozony + wszystkie pliki na szachownicy, 2 kafelki obok siebie
    previews()
    for f,n in sizes:print(f'{f.relative_to(ROOT)}: {n/1024:.1f} KiB')
    print(f'Zapisano {len(sizes)} zasobow PNG + podglady')

def checker(size,bg1='#E7EAEC',bg2='#CFD6D9',tile=32):
    im=Image.new('RGBA',size,bg1)
    d=ImageDraw.Draw(im)
    for y in range(0,size[1],tile):
        for x in range(0,size[0],tile):
            if ((x//tile)+(y//tile))%2:d.rectangle((x,y,x+tile-1,y+tile-1),fill=bg2)
    return im

def img(path):return Image.open(path).convert('RGBA')

def composite(winter=False,landmark='poznan'):
    # docelowa kompozycja obrazu 360x640 logical -> @3x
    im=Image.new('RGBA',(1080,1920))
    ims=[('pl-sky-zima' if winter else 'pl-sky',(0,0),None),
         ('pl-clouds',(0,330),(1080,300)),
         ('pl-far-zima' if winter else 'pl-far',(0,765),(1080,880))]
    for name,(x,y),size in ims:
        layer=img(PL/(name+'.png'))
        if size:layer=layer.resize(size,Image.Resampling.LANCZOS)
        else:layer=layer
        im.alpha_composite(layer,(x,y))
    lm='dom-meta-zima' if winter else landmark
    lay=img(LM/(lm+'.png')).resize((990,550),Image.Resampling.LANCZOS)
    im.alpha_composite(lay,(45,1108))
    near_layer=img(PL/('pl-near-zima.png' if winter else 'pl-near.png'))
    near_layer=near_layer.resize((1080,558),Image.Resampling.LANCZOS)
    im.alpha_composite(near_layer,(0,1254))
    im.alpha_composite(img(PL/'pl-road.png'),(0,1590))
    return im

def previews():
    # Czytelne podglady sceny 1080x1920
    for winter in [False,True]:
        im=composite(winter)
        p=PL/('preview-zima.png' if winter else 'preview-scena.png')
        im.convert('RGB').save(p,optimize=True,compress_level=9)
    # Arkusz detali + przyklad dwoch identycznych kafelkow obok siebie
    W=1800; gap=22; titleH=65
    d=Image.new('RGB',(W,4450),'#F7F9FA');dd=ImageDraw.Draw(d)
    font=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',25)
    bold=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',34)
    def label(txt,x,y,boldly=False):dd.text((x,y),txt,fill='#283848',font=bold if boldly else font)
    label('POLSKA  /  PAKIET TLA  /  ZLECENIE 07',35,14,True)
    a=composite().resize((420,746),Image.Resampling.LANCZOS)
    b=composite(True).resize((420,746),Image.Resampling.LANCZOS)
    d.paste(a,(30,95));d.paste(b,(480,95))
    label('DZIEN',32,857);label('ZIMA',482,857)
    label('2x POWTARZALNE KAFELKI: chmury / daleki / bliski / droga',30,910,True)
    y=970
    for layer,hh in [('pl-clouds',140),('pl-far',175),('pl-near',165),('pl-road',160),
                     ('pl-far-zima',175),('pl-near-zima',165),('pl-border-near',175)]:
        x=40;one=img(PL/(layer+'.png'))
        is_single=layer=='pl-border-near'
        tile=one.resize((1690 if is_single else 845,hh),Image.Resampling.LANCZOS)
        dd.rectangle((x,y,x+1690,y+hh),fill='#DEE4E6')
        d.paste(tile,(x,y),tile)
        if not is_single:
            d.paste(tile,(x+845,y),tile)
            dd.line((x+845,y,x+845,y+hh),fill='#C44836',width=2)
        label(layer+(' (scena jednorazowa)' if is_single else ' / 2x kafelek'),x+6,y+hh+4)
        y+=hh+62
    label('PANORAMY PUNKTOW TRASY (szachownica = przezroczystosc)',30,y,True)
    y+=56
    names=['granica-swiecko','stacja-swiecko','granica-jedrzychowice','stacja-jedrzychowice',
           'swinoujscie','stacja-swinoujscie','poznan','lodz','warszawa','wroclaw','szczecin',
           'legnica','granica-stacja','dom-meta','dom-meta-zima']
    for i,name in enumerate(names):
        col=i%3;row=i//3;xx=35+col*590;yy=y+row*248
        tile=checker((560,184),tile=20)
        src=img(LM/(name+'.png'));src.thumbnail((555,184))
        tile.alpha_composite(src,((560-src.width)//2,184-src.height))
        d.paste(tile.convert('RGB'),(xx,yy))
        label(name,xx+8,yy+189)
    p=PL/'preview.png'
    d.crop((0,0,W,max(4350,y+5*248+24))).quantize(colors=256, method=Image.Quantize.FASTOCTREE, dither=Image.Dither.NONE).save(p,optimize=True,compress_level=9)
    # kopia arkusza landmarkow w odpowiednim folderze, zeby kazdy ma swoj podglad
    LM.joinpath('preview.png').write_bytes(p.read_bytes())

if __name__=='__main__':generate()
