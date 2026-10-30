#!/usr/bin/env python3
"""Draw original, seamless vector game backgrounds and landmark PNGs.

Usage: python render.py [output-root]
Dependencies: cairosvg, pillow. Shapes are constructed in the 3x logical viewbox.
"""
from __future__ import annotations
import math
import os
import sys
import hashlib
from PIL import ImageChops
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import cairosvg

OUT = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).parent / 'output'
EDGE = '#293B50'
LIGHT = '#FFF8DC'
UK = {'sky0':'#75BDD5', 'sky1':'#FBE5B8', 'hill1':'#9FBF8A', 'hill2':'#71A46C', 'hill3':'#4D8558', 'grass':'#3D7959', 'accent':'#BC6554'}
FR = {'sky0':'#6DB9E2', 'sky1':'#FFE6AB', 'hill1':'#C7BE8B', 'hill2':'#99AD6D', 'hill3':'#788D50', 'grass':'#6E955A', 'accent':'#E8C457'}


def fmt(v):
    if isinstance(v, float): return str(round(v, 3))
    return str(v)


class Art:
    def __init__(self, w, h, defs=''):
        self.w,self.h=w,h
        self.parts=[]
        self.defs=defs
    def tag(self,t,**attrs):
        a=' '.join(f'{k.replace("_","-")}="{fmt(v)}"' for k,v in attrs.items() if v is not None)
        self.parts.append(f'<{t} {a}/>')
    def path(self,d,fill='none',stroke=EDGE,sw=2.4,opacity=None):
        self.tag('path',d=d,fill=fill,stroke=stroke,stroke_width=sw,stroke_linejoin='round',stroke_linecap='round',opacity=opacity)
    def rect(self,x,y,w,h,fill,stroke='none',sw=2,rx=0,opacity=None):
        self.tag('rect',x=x,y=y,width=w,height=h,fill=fill,stroke=stroke,stroke_width=sw,rx=rx,opacity=opacity)
    def circle(self,x,y,r,fill,stroke='none',sw=2,opacity=None):
        self.tag('circle',cx=x,cy=y,r=r,fill=fill,stroke=stroke,stroke_width=sw,opacity=opacity)
    def ellipse(self,x,y,rx,ry,fill,stroke='none',sw=2,opacity=None):
        self.tag('ellipse',cx=x,cy=y,rx=rx,ry=ry,fill=fill,stroke=stroke,stroke_width=sw,opacity=opacity)
    def poly(self,coords,fill,stroke=EDGE,sw=2,opacity=None):
        self.tag('polygon',points=' '.join(f'{fmt(x)},{fmt(y)}' for x,y in coords),fill=fill,stroke=stroke,stroke_width=sw,stroke_linejoin='round',opacity=opacity)
    def line(self,x1,y1,x2,y2,color=EDGE,sw=2,opacity=None):
        self.tag('line',x1=x1,y1=y1,x2=x2,y2=y2,stroke=color,stroke_width=sw,stroke_linecap='round',opacity=opacity)
    def svg(self):
        return '<svg xmlns="http://www.w3.org/2000/svg" width="%s" height="%s" viewBox="0 0 %s %s">%s%s</svg>' % (self.w,self.h,self.w,self.h,'<defs>'+self.defs+'</defs>', ''.join(self.parts))


def save(a, path):
    path.parent.mkdir(parents=True,exist_ok=True)
    png=cairosvg.svg2png(bytestring=a.svg().encode(),output_width=a.w*3,output_height=a.h*3)
    import io
    im=Image.open(io.BytesIO(png)).convert('RGBA')
    # Match both texture edges with a narrow feather, guaranteeing a seamless repeat.
    if path.name.endswith(('-clouds.png','-far.png','-near.png','-road.png')):
        periodize(im)
    im.save(path,format='PNG',optimize=True,compress_level=9)


def periodize(im, margin=75):
    w,h=im.size
    pix=im.load()
    for step in range(margin):
        factor=(1-(step/margin))**2
        for y in range(h):
            lc=pix[step,y];rc=pix[w-1-step,y]
            shared=tuple((l+r+1)//2 for l,r in zip(lc,rc))
            pix[step,y]=tuple(round((1-factor)*l+factor*c) for l,c in zip(lc,shared))
            pix[w-1-step,y]=tuple(round((1-factor)*r+factor*c) for r,c in zip(rc,shared))


def bird(a,x,y,s=1):
    a.path(f'M {x-9*s} {y} Q {x-4*s} {y-7*s} {x} {y} Q {x+4*s} {y-7*s} {x+9*s} {y}',stroke='#53677C',sw=1.7*s)


def cloud(a,x,y,s=1,col='#F5F9F2'):
    # Layered rounded cumulus with blue undersides and warm sun-facing edges.
    a.ellipse(x,y+10*s,67*s,20*s,'#759BA9',opacity=.47)
    for dx,dy,rx,ry in [(-42,1,29,19),(-16,-10,32,26),(20,-18,35,33),(51,0,31,20)]:
        a.ellipse(x+dx*s,y+dy*s,rx*s,ry*s,col,EDGE,1.9*s)
    a.path(f'M{x-52*s} {y+11*s} Q{x} {y+23*s} {x+66*s} {y+11*s}',stroke='#AAC7D1',sw=2*s,opacity=.65)
    a.path(f'M{x-38*s} {y-8*s} Q{x-24*s} {y-20*s} {x-8*s} {y-16*s}',stroke='#FFFFFF',sw=2*s,opacity=.8)


def hills(a, palette, base, amplitude, phase, fill, bottom=310, second=0):
    coords=[]
    for x in range(0,721,4):
        y=base+amplitude*math.sin((x/720*4*math.pi)+phase)+second*math.sin(x/720*8*math.pi+phase*1.9)
        coords.append((x,round(y,2)))
    a.poly(coords+[(720,bottom),(0,bottom)],fill,stroke='#50765F' if fill!='#EDE0B2' else '#B8A97B',sw=1.6)


def tree(a,x,y,s=1,kind='round'):
    a.rect(x-5*s,y-42*s,10*s,52*s,'#89664B',EDGE,1.7*s,rx=3*s)
    a.line(x,y-38*s,x+16*s,y-60*s,'#89664B',3*s)
    if kind=='plane':
        for ox,oy,r in [(-20,-58,23),(3,-71,28),(22,-53,22),(-3,-43,25)]:
            a.circle(x+ox*s,y+oy*s,r*s,'#6B9F6B',EDGE,2*s)
            a.circle(x+(ox-7)*s,y+(oy-8)*s,9*s,'#A8C77D')
    elif kind=='cypress':
        a.ellipse(x,y-56*s,19*s,58*s,'#336D57',EDGE,2*s)
        a.ellipse(x-5*s,y-64*s,6*s,40*s,'#649E66',opacity=.8)
    else:
        for ox,oy,r in [(-20,-53,23),(2,-72,25),(22,-54,23),(-1,-45,26)]:
            a.circle(x+ox*s,y+oy*s,r*s,'#4C8659',EDGE,2*s)
            a.circle(x+(ox-7)*s,y+(oy-9)*s,8*s,'#A3C876',opacity=.78)


def building(a,x,y,w,h,wall='#BA6C5C',roof='#53657B',windows=True,stories=2,stroke=2):
    a.rect(x,y-h,w,h,wall,EDGE,stroke,rx=1)
    a.poly([(x-5,y-h),(x+w/2,y-h-23),(x+w+5,y-h)],roof,EDGE,stroke)
    a.line(x+3,y-h+7,x+w-3,y-h+7,'#F5B999',1.5,opacity=.72)
    a.rect(x+w*.15,y-h-27,6,13,wall,EDGE,1.5)
    if windows:
        for row in range(stories):
            for col in (0,1):
                wx=x+(0.20+col*.46)*w
                wy=y-h+15+row*(h-21)/max(1,stories)
                if wy+10<y-2:
                    a.rect(wx,wy,max(5,w*.13),10,'#CEE5DC',EDGE,1.3,rx=2)
                    a.line(wx+2,wy+5,wx+max(5,w*.13)-2,wy+5,'#7194A7',1)
    a.rect(x+w*.44,y-16,w*.16,16,'#785849',EDGE,1.2,rx=2)


def waves(a,low=268,left=12,right=527,color='#67AFC9'):
    a.path(f'M{left} {low} Q {left+90} {low-11} {left+180} {low} T {right} {low} L{right} 295 L{left} 295 Z',color,'#36748F',1.8)
    for j in range(3):
        yy=low+8+j*9
        for i in range(5):
            xx=left+25+i*98+j*21
            a.path(f'M{xx} {yy} q14 -5 27 0',stroke='#DEF5EE',sw=1.6,opacity=.75)


def ferry(a,x=118,y=238,s=1):
    a.poly([(x,y-47*s),(x+290*s,y-47*s),(x+273*s,y+3*s),(x+44*s,y+6*s),(x+3*s,y-9*s)],'#E9E9DF',EDGE,3)
    a.poly([(x+3*s,y-11*s),(x+278*s,y-13*s),(x+273*s,y+1*s),(x+40*s,y+4*s)],'#2D6483',EDGE,1.8)
    a.rect(x+45*s,y-80*s,205*s,36*s,'#FEF8E4',EDGE,2,rx=3)
    a.rect(x+60*s,y-107*s,158*s,28*s,'#E5E5DC',EDGE,2,rx=3)
    a.rect(x+78*s,y-132*s,72*s,26*s,'#F4F0DC',EDGE,2,rx=4)
    a.rect(x+174*s,y-145*s,28*s,38*s,'#4A7190',EDGE,2,rx=3)
    for j in range(7):
        a.rect(x+(65+j*24)*s,y-93*s,13*s,11*s,'#6A9BB5',EDGE,1,rx=2)
        a.rect(x+(65+j*24)*s,y-66*s,13*s,10*s,'#6A9BB5',EDGE,1,rx=2)
    a.line(x+174*s,y-146*s,x+174*s,y-164*s,'#38485D',2)
    a.path(f'M{x+20*s} {y+10*s}q30 12 60 1',stroke='#FFF9EA',sw=3)


def sky(cc):
    p=UK if cc=='uk' else FR
    defs=f'''<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="{p['sky0']}"/><stop offset="68%" stop-color="#A8D7DB"/><stop offset="100%" stop-color="{p['sky1']}"/></linearGradient><radialGradient id="glow"><stop offset="0%" stop-color="#FFF4BE" stop-opacity=".90"/><stop offset="100%" stop-color="#FFF4BE" stop-opacity="0"/></radialGradient>'''
    a=Art(360,640,defs)
    a.rect(0,0,360,640,'url(#sky)')
    a.circle(70,106,115,'url(#glow)')
    for ang in range(0,360,30):
        x1=70+47*math.cos(math.radians(ang));y1=106+47*math.sin(math.radians(ang))
        x2=70+62*math.cos(math.radians(ang));y2=106+62*math.sin(math.radians(ang))
        a.line(x1,y1,x2,y2,'#FFF6D6',2.8,opacity=.58)
    a.circle(70,106,36,'#FFF7C5','#FFFDF1',3)
    a.path('M0 534 Q160 496 360 518 L360 640 L0 640Z','#FFF0D6',stroke='none',opacity=.25)
    return a


def clouds(cc):
    a=Art(720,200)
    placements=[(-22,72,.64),(130,124,.83),(295,48,.9),(484,111,.74),(668,57,.63)]
    for x,y,s in placements:
        for offset in (-720,0,720):
            cloud(a,x+offset,y,s,col='#EEF2EE' if cc=='uk' else '#FFF9EB')
    for x,y in [(66,170),(382,178),(592,175)]:
        a.path(f'M{x} {y} q24 -7 55 0',stroke='#F7FFFC',sw=2.3,opacity=.5)
    return a


def far(cc):
    p=UK if cc=='uk' else FR
    a=Art(720,300)
    hills(a,p,188,19,1.1,p['hill1'])
    hills(a,p,216,21,2.5,p['hill2'])
    hills(a,p,258,21,.7,p['hill3'])
    if cc=='uk':
        # English patchwork fields and thick continuous hedgerows.
        for x in range(-90,810,108):
            poly=[(x,245),(x+75,235),(x+90,273),(x+5,281)]
            a.poly(poly,'#9FBE6D',stroke='#507A52',sw=1.2,opacity=.85)
            a.path(f'M{x-10} 245 Q{x+30} 240 {x+95} 236',stroke='#305E45',sw=3,opacity=.66)
        for x in (44,165,286,500,626):
            building(a,x,239,31,23,'#B76355','#68727A',True,1,1.5)
            building(a,x+28,239,29,20,'#C77D5D','#667681',True,1,1.4)
        for x in (12,215,431,652):
            tree(a,x,237,.26)
        # Small recurring chalk-white hill face: white cliffs without obscuring tiling.
        a.path('M460 253 L498 238 L527 243 L560 230 L592 240 L617 246 L617 294 L460 294Z','#F6EAD5','#6F9773',2)
        for x in (478,511,544,580):
            a.path(f'M{x} 247 q-6 22 -2 41',stroke='#CFD0BD',sw=2.3)
        a.path('M459 251 Q525 227 618 247',stroke='#508D64',sw=7)
        for x,y in ((93,278),(169,288),(368,275),(694,286)):
            a.ellipse(x,y,18,6,'#244F40')
    else:
        # French vineyards, lavender strips, stone bridge and blue-shuttered houses.
        for x in range(-110,810,95):
            a.poly([(x+12,249),(x+55,226),(x+88,228),(x+47,287)],'#8E84AB',stroke='#7B679F',sw=1.1,opacity=.78)
            for j in range(3):
                a.line(x+29+j*10,246,x+14+j*10,290,'#B3A1CF',1.8,opacity=.85)
        for x in (65,296,488,654):
            building(a,x,238,39,30,'#E9D5A9','#B87755',True,1,1.4)
            a.rect(x+8,215,5,11,'#4D87A8',EDGE,.6)
        for x in (22,220,408,595):
            tree(a,x,239,.35,kind='cypress')
        a.path('M95 241 Q150 204 205 239 L205 245 L95 245Z','#D3BC8F','#866D6B',2)
        for x in range(105,198,20):
            a.path(f'M{x} 243 L{x} 237 Q{x+6} 219 {x+13} 237 L{x+13} 243',fill='#F5E5C4',sw=1.2)
        # Sparse sunflower heads at the closest field edge.
        for x,y in [(34,277),(128,280),(272,290),(354,278),(454,288),(550,283),(656,282)]:
            a.line(x,y+8,x,y-2,'#3E8058',1.8)
            for j in range(8):
                theta=j*math.pi/4
                a.ellipse(x+4*math.cos(theta),y+4*math.sin(theta),3.5,2.3,'#F5D256')
            a.circle(x,y,3.3,'#644A39')
    return a


def near(cc):
    a=Art(720,240)
    if cc=='uk':
        a.path('M0 171 Q70 153 145 173 T290 171 T435 170 T580 172 T720 169 L720 240 L0 240Z','#6A9C62','#355F4E',2.6)
        for x,y,s in [(16,165,.75),(168,173,.84),(342,171,.72),(584,162,.77),(730,165,.72)]:
            for shift in (-720,0,720): tree(a,x+shift,y,s)
        for x in (70,104,440,478):
            building(a,x,195,39,38,'#B96B5B','#516270',True,2,2)
        # Iconic unbranded red telephone box.
        for shift in (0,-720,720):
            x=247+shift
            a.rect(x,127,23,66,'#C74A45',EDGE,2.5,rx=2)
            a.poly([(x,129),(x+3,118),(x+20,118),(x+23,129)],'#D75B4D',EDGE,2)
            for col in (3,13):
                a.rect(x+col,138,7,42,'#BFE4E7',EDGE,1,rx=1)
                a.line(x+col,154,x+col+7,154,'#627D89',1)
        # Continuous hedges and shoulder barrier.
        for x in range(-14,750,32):
            a.circle(x,190,15,'#367B55',EDGE,1)
            a.circle(x-4,184,6,'#70AF72')
        a.rect(0,208,720,9,'#D7D9D4',EDGE,1.5,rx=2)
        for x in range(15,720,65):
            a.rect(x,210,5,30,'#AEB7B3',EDGE,1)
        a.line(0,222,720,222,'#596D70',2.5)
    else:
        a.path('M0 172 Q98 151 180 165 T380 171 T550 162 T720 175 L720 240 L0 240Z','#96B46C','#658753',2.2)
        for x,y,s in [(-8,166,.78),(164,166,.78),(302,162,.77),(512,159,.82),(722,162,.8)]:
            for shift in (-720,0,720): tree(a,x+shift,y,s,'plane')
        for x in (85,402):
            building(a,x,191,45,38,'#F0D6A6','#B97355',True,2,2.1)
            for dx in (9,29):
                a.rect(x+dx-2,165,3,15,'#3974A4',EDGE,.8)
                a.rect(x+dx+9,165,3,15,'#3974A4',EDGE,.8)
        # Unbranded toll booth and roof, integrated into scenery.
        a.rect(583,176,44,28,'#C6D5CB',EDGE,2.2,rx=2)
        a.rect(591,181,16,12,'#78B4C5',EDGE,1.5,rx=1)
        a.poly([(548,169),(666,169),(652,159),(560,159)],'#6E8FA3',EDGE,2.2)
        for x in (563,645): a.rect(x,169,5,37,'#E1E2D4',EDGE,1.1)
        # Continuous crash barrier and shrubs.
        for x in range(-5,750,28):
            a.ellipse(x,195,19,9,'#648E55',EDGE,1.1)
        a.rect(0,209,720,9,'#D4DCD6',EDGE,1.5,rx=2)
        for x in range(12,720,60): a.rect(x,211,5,29,'#A0A9A2',EDGE,1)
        a.line(0,223,720,223,'#6A7D7C',2.5)
    return a


def road(cc):
    defs='<linearGradient id="asph" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#555D67"/><stop offset="1" stop-color="#333A45"/></linearGradient>'
    a=Art(360,110,defs)
    a.rect(0,14,360,96,'url(#asph)')
    a.rect(0,13,360,4,'#B2B7AC',EDGE,1)
    # Barrier and its equally spaced posts, period 60 divides width 360.
    for x in range(0,360,60):
        a.rect(x+18,2,5,27,'#7A878C',EDGE,1)
    a.rect(0,4,360,8,'#B5C1BD',EDGE,1.3,rx=2)
    a.line(0,6,360,6,'#F4F8E9',1.8,opacity=.8)
    a.rect(0,25,360,2,'#879399')
    a.rect(0,103,360,3,'#D4D4C0')
    for x in range(0,360,90):
        a.rect(x+18,56,46,4,'#F5F1DF',rx=2)
        a.line(x+8,93,x+31,93,'#73808C',1,opacity=.45)
        a.line(x+58,78,x+73,77,'#A9AEB0',1,opacity=.36)
    if cc=='fr':
        a.rect(0,28,360,2,'#F3D8AB',opacity=.8)
    else:
        a.rect(0,28,360,2,'#DFE7E7',opacity=.8)
    return a


def land_base(a,tint='#76A478',water=False):
    a.ellipse(270,282,238,10,'#3A5960',opacity=.16)
    if water: waves(a,260,22,524)
    else:
        a.path('M20 275 Q105 263 180 269 T340 269 T521 274 L523 289 L20 289Z',tint,'#416856',2)
        a.path('M37 279 Q145 268 244 278 T493 281',stroke='#B5CE8A',sw=2,opacity=.65)


def bush(a,x,y,s=1):
    a.ellipse(x,y,19*s,11*s,'#4E865A',EDGE,1.6)
    a.circle(x-9*s,y-7*s,8*s,'#80B273')
    a.circle(x+6*s,y-6*s,7*s,'#83AB6A')


def bridge(a,x,y,w,span_color='#D9C0A5'):
    a.rect(x,y-12,w,10,span_color,EDGE,2,rx=2)
    a.rect(x+7,y-1,w-15,7,span_color,EDGE,1.5)
    for j in range(4):
        xx=x+8+j*(w-22)/4
        a.path(f'M {xx} {y+5} L{xx} {y-3} Q{xx+14} {y-20} {xx+28} {y-3} L{xx+28} {y+5}',fill='#A1C8CB',sw=1.9)


def tower(a,x,base,h=125,stone='#DDBE97',roof='#5B6376',clock=False):
    a.rect(x,base-h,34,h,stone,EDGE,2.8,rx=1)
    a.poly([(x-4,base-h),(x+17,base-h-33),(x+38,base-h)],roof,EDGE,2.3)
    for j in range(3):
        yy=base-h+19+j*27
        a.rect(x+10,yy,14,18,'#728EA0',EDGE,1.3,rx=5)
    if clock:
        a.circle(x+17,base-h+15,12,'#FAECC7',EDGE,2)
        a.line(x+17,base-h+15,x+17,base-h+8,EDGE,1.9)
        a.line(x+17,base-h+15,x+22,base-h+19,EDGE,1.8)
    a.rect(x-5,base-6,44,7,stone,EDGE,1.7)


def crane(a,x,y,s=1):
    a.line(x,y,x,y-114*s,EDGE,3)
    a.line(x-14*s,y-96*s,x+89*s,y-96*s,EDGE,3)
    a.line(x+12*s,y-96*s,x,y-112*s,EDGE,1.5)
    a.line(x+70*s,y-96*s,x,y-112*s,EDGE,1.5)
    a.line(x+64*s,y-96*s,x+64*s,y-50*s,EDGE,1.4)
    a.rect(x+55*s,y-53*s,19*s,6*s,'#DFB66C',EDGE,1.3)
    for j in range(5):
        a.line(x,y-89*s+j*18*s,x+10*s,y-76*s+j*18*s,'#B27B58',1.6)


def cathedral(a,x,y,w=180,h=190,stone='#DDB88B'):
    a.rect(x,y-h+55,w,h-55,stone,EDGE,3)
    for dx in (7,w-48):
        a.rect(x+dx,y-h,41,h-12,stone,EDGE,2.5)
        a.rect(x+dx+11,y-h+19,18,36,'#5C8392',EDGE,1.6,rx=8)
        a.rect(x+dx+9,y-h+65,23,41,'#7298A2',EDGE,1.5,rx=10)
        a.rect(x+dx-3,y-h-5,47,11,'#D7B28E',EDGE,2)
        for xj in range(3):
            a.rect(x+dx+xj*14,y-h-14,8,15,stone,EDGE,1.3)
    a.poly([(x+49,y-h+55),(x+w/2,y-h+1),(x+w-50,y-h+55)],stone,EDGE,2)
    a.circle(x+w/2,y-h+88,23,'#597D92',EDGE,2)
    for j in range(8):
        theta=j*math.pi/4
        a.line(x+w/2,y-h+88,x+w/2+20*math.cos(theta),y-h+88+20*math.sin(theta),'#D4CCB2',1)
    for dx in (56,w-74):
        a.path(f'M{x+dx} {y-17}v-43q8 -19 16 0v43',fill='#648D9A',sw=2)
    a.path(f'M{x+w/2-14} {y}v-54q14 -24 28 0v54',fill='#385665',sw=2.3)


def lattice_tower(a,x,y,w=115,h=235):
    # Stylized open iron tower, no exact architectural tracing.
    a.poly([(x+w*.44,y-h),(x+w*.56,y-h),(x+w*.88,y),(x+w*.67,y),(x+w*.60,y-39),(x+w*.40,y-39),(x+w*.33,y),(x+w*.12,y)],'#99735E',EDGE,2.6)
    for t in (36,69,111,151,191):
        ratio=t/h
        left=x+w*(.44-(.32*ratio))
        right=x+w*(.56+(.32*ratio))
        yy=y-h+t
        a.line(left,yy,right,yy,'#F5D39B',3)
    for j in range(5):
        ya=y-h+35+j*34
        yb=ya+34
        la=x+w*(.44-(.32*((35+j*34)/h)))
        lb=x+w*(.44-(.32*((69+j*34)/h)))
        ra=x+w*(.56+(.32*((35+j*34)/h)))
        rb=x+w*(.56+(.32*((69+j*34)/h)))
        a.line(la,ya,rb,yb,'#EAC28F',2)
        a.line(ra,ya,lb,yb,'#EAC28F',2)
    a.rect(x+30,y-69,w-60,11,'#9D775E',EDGE,1.8)
    a.rect(x+43,y-150,w-86,7,'#9D775E',EDGE,1.6)
    a.line(x+w/2,y-h,x+w/2,y-h-24,EDGE,2)


def make_landmark(id):
    a=Art(540,300)
    if id=='londyn':
        land_base(a,'#729B7B',water=True)
        for x,w,h in [(40,42,76),(96,42,89),(350,38,88),(410,35,95)]:
            building(a,x,260,w,h,'#D2B08D','#657486',True,2)
        tower(a,155,258,157,'#D5B48B',clock=True)
        # Raised-bascule bridge, generic twin towers and angled spans.
        for x in (259,422):
            a.rect(x,190,36,71,'#D0B498',EDGE,2.5)
            a.poly([(x-6,192),(x+18,174),(x+42,192)],'#63788E',EDGE,2)
            a.rect(x+10,205,16,16,'#A3CDCA',EDGE,1.5,rx=6)
        a.poly([(294,249),(348,216),(353,226),(294,258)],'#A3AEB0',EDGE,2.3)
        a.poly([(422,249),(368,216),(363,226),(422,258)],'#A3AEB0',EDGE,2.3)
        # Tiny unbranded red double-decker.
        a.rect(43,237,53,21,'#C44746',EDGE,2,rx=3)
        a.rect(43,218,53,19,'#C44746',EDGE,2,rx=3)
        for yy in (222,241):
            for xx in (49,62,75,88): a.rect(xx,yy,9,9,'#B1D8DD',EDGE,.8)
        a.circle(52,261,5,'#344858');a.circle(87,261,5,'#344858')
    elif id=='dover':
        land_base(a,'#80AD73',water=True)
        a.path('M30 245 Q64 223 95 217 L124 143 L187 165 L227 112 L290 132 L327 102 L385 152 L443 143 L492 217 L503 261 L30 261Z','#F2EDDE','#48677B',3.3)
        for d in ['M99 212 Q127 192 132 164','M215 195 Q232 156 233 130','M330 183 Q328 145 336 126','M429 215 Q422 177 437 153']:
            a.path(d,stroke='#C3C6B8',sw=5)
        a.path('M85 174 L122 136 L183 158 L225 106 L288 124 L326 95 L395 145 L446 137',stroke='#659469',sw=9)
        a.rect(281,91,56,28,'#AA9982',EDGE,2)
        a.rect(292,68,19,29,'#AB9681',EDGE,2)
        a.poly([(287,70),(304,54),(316,70)],'#58687A',EDGE,2)
        a.rect(469,187,11,54,'#F7F3E4',EDGE,1.6)
        a.poly([(465,186),(475,171),(485,186)],'#506E83',EDGE,1.6)
        for x,y in ((70,95),(402,63),(461,94)):bird(a,x,y,.9)
    elif id=='prom-kanal':
        land_base(a,'#5B9BB1',water=True)
        a.path('M23 238 L65 222 L81 240 L108 235 L111 263 L24 263Z','#F0EAD9','#7C9392',2)
        a.path('M22 235 L62 221 L83 233',stroke='#6E9875',sw=7)
        ferry(a,112,240,1.08)
        for x,y in [(91,98),(443,70),(481,115),(63,165)]:bird(a,x,y,1.1)
        for x in range(30,500,72):a.path(f'M{x} 258 q26 -12 51 0',stroke='#EDF9F2',sw=3)
    elif id=='tunel-kanal':
        land_base(a,'#759C6A')
        a.path('M35 261 L54 185 L124 142 L198 106 L309 103 L414 136 L496 191 L519 265Z','#9CBF77',EDGE,3)
        a.path('M144 257 L145 208 Q153 139 235 133 L356 133 Q439 141 444 214 L443 261Z','#E2D0AE',EDGE,3)
        a.path('M176 258 L176 211 Q184 163 247 160 L348 160 Q409 166 409 216 L407 260Z','#394C60',EDGE,3)
        a.path('M203 257 L203 213 Q210 187 249 186 L339 186 Q380 189 382 220 L382 258Z','#172B3C',stroke='none')
        for x in (130,440): a.line(x,257,250+(x-250)*.5,299,'#424B54',3)
        a.line(264,204,231,289,'#F4E2AE',2.5)
        a.line(319,204,350,289,'#F4E2AE',2.5)
        # Shuttle carrier with generic boxy vehicles.
        a.poly([(233,244),(350,244),(369,253),(371,272),(223,272)],'#748A97',EDGE,2)
        for x,col in ((245,'#D1D5C1'),(281,'#CD6655'),(319,'#7A9AAB')):
            a.rect(x,222,29,21,col,EDGE,1.7,rx=3)
            a.rect(x+6,226,15,8,'#B9DADA',EDGE,.8,rx=2)
        a.rect(222,260,155,7,'#D4BD9B',EDGE,1.5)
        for x in (55,98,462,490):bush(a,x,253,.8)
    elif id=='birmingham':
        land_base(a,'#6F9B79',water=True)
        for x,w,h in [(48,102,100),(152,88,138),(255,100,112),(365,77,120)]:
            building(a,x,260,w,h,'#B96458','#5E6878',True,3,2.5)
        tower(a,215,259,147,'#BD8778',clock=True)
        for x,h in ((73,155),(117,175),(324,166),(397,150)):
            a.rect(x,261-h,15,h,'#B65C53',EDGE,2)
            a.rect(x-3,261-h,21,9,'#865953',EDGE,1.4)
        bridge(a,42,265,425)
    elif id=='manchester':
        land_base(a,'#739E70',water=True)
        for x,w,h in ((30,130,104),(164,120,130),(293,104,105),(404,105,84)):
            building(a,x,259,w,h,'#B86153','#4C6476',True,3,2.8)
            for j in range(5):a.line(x+13+j*22,259-h+15,x+13+j*22,250,'#985749',1.3)
        for x,h in ((69,167),(127,183),(306,159),(451,149)):
            a.rect(x,260-h,17,h,'#A95D4F',EDGE,2.3)
            a.rect(x-3,260-h,23,9,'#80574F',EDGE,1.4)
        bridge(a,103,269,325,'#C5B4A1')
    elif id=='edynburg':
        land_base(a,'#78A27B')
        a.path('M42 263 Q82 219 133 206 L156 162 L225 137 L284 147 L335 185 L372 197 L440 226 L498 268Z','#6F746F',EDGE,2.8)
        for x,y in [(74,240),(158,198),(227,166),(329,209),(435,247)]:
            a.path(f'M{x} {y}l10 17 -11 8',stroke='#A4A18D',sw=4)
        a.rect(165,99,171,81,'#BCA38B',EDGE,3)
        a.rect(173,82,35,43,'#A68E7E',EDGE,2)
        a.rect(287,81,38,45,'#A68E7E',EDGE,2)
        a.poly([(168,83),(192,64),(212,83)],'#535D70',EDGE,2)
        a.poly([(282,83),(305,64),(329,83)],'#535D70',EDGE,2)
        for x in range(183,320,29):
            a.rect(x,121,13,20,'#586D7E',EDGE,1.3,rx=2)
            a.rect(x,154,13,18,'#657887',EDGE,1.3,rx=2)
        for x in (67,390,430):building(a,x,258,35,49,'#C9A58C','#5B6881',True,2)
    elif id=='paryz':
        land_base(a,'#88A06D',water=True)
        for x,w,h in [(35,78,86),(120,67,99),(346,76,96),(426,81,83)]:
            building(a,x,263,w,h,'#E9CCAA','#58718A',True,3,2)
        lattice_tower(a,208,261,127,230)
        bridge(a,38,270,468,'#D7C3A8')
        for x in (52,125,424,484):bush(a,x,258,.48)
    elif id=='reims':
        land_base(a,'#A5B876')
        hills(a,None,259,9,.6,'#B5BC88',bottom=298)
        cathedral(a,170,267,210,220,'#E6D5B8')
        for x in (48,101,420,476):
            bush(a,x,266,.9)
            a.path(f'M{x-18} 277 l39 -26',stroke='#8BA263',sw=2)
    elif id=='metz':
        land_base(a,'#8DA67F',water=True)
        bridge(a,46,264,447,'#D9C5A5')
        cathedral(a,164,246,214,188,'#E8C995')
        tower(a,300,243,198,'#E5C18A',roof='#547587')
        for x in (77,117,423,460):bush(a,x,252,.6)
    elif id=='calais':
        land_base(a,'#86A77E',water=True)
        bridge(a,80,257,363,'#D8C8AA')
        tower(a,188,251,168,'#CFB99E',roof='#567486',clock=True)
        a.rect(396,108,30,144,'#FFF3D9',EDGE,2.8,rx=6)
        a.rect(390,105,42,13,'#4D7083',EDGE,2)
        a.poly([(395,106),(411,85),(427,106)],'#D8A56F',EDGE,2)
        a.rect(403,128,16,11,'#A9CED0',EDGE,1.1)
        for x in (57,475):bird(a,x,111,1.1)
        for x in (81,121,278):building(a,x,255,38,44,'#E4CBAD','#6B8190',True,1)
    elif id=='dunkierka':
        land_base(a,'#B5B17C',water=True)
        a.path('M30 254 Q104 211 185 239 T339 238 Q418 215 504 253 L504 277 L30 277Z','#E7D49F',EDGE,2)
        a.path('M37 247 Q116 212 186 236 T345 236 Q414 215 501 248',stroke='#77996D',sw=6)
        for x in (100,157,237,300,387):
            a.line(x,236,x-6,223,'#638A67',2)
            a.line(x,232,x+6,220,'#638A67',2)
        for x in (272,374):crane(a,x,242,.85)
        for x in (74,455):bird(a,x,94)
    elif id=='lille':
        land_base(a,'#84A37B')
        for x,w,h in ((44,67,92),(115,59,109),(182,60,96),(340,68,103),(414,80,87)):
            building(a,x,266,w,h,'#C27760','#637184',True,3)
        tower(a,257,260,183,'#D7B595','#637386',clock=True)
        a.rect(267,52,12,18,'#D9BC93',EDGE,1.5)
        a.poly([(268,51),(273,36),(281,51)],'#657B91',EDGE,1.7)
        for x in (72,449):bush(a,x,266,.7)
    elif id=='lyon':
        land_base(a,'#81A16E',water=True)
        a.path('M30 255 Q112 207 187 220 T346 188 T509 232 L509 259 L30 259Z','#9BB276',EDGE,2)
        for x,w,h in ((60,58,84),(127,51,77),(356,57,91),(423,60,67)):
            building(a,x,256,w,h,'#D2A17E','#B86D52',True,2)
        a.rect(227,122,97,93,'#F0D5B4',EDGE,2.6)
        for x in (218,299):
            a.rect(x,92,25,91,'#F0D5B4',EDGE,2.1)
            a.poly([(x-3,92),(x+12,74),(x+29,92)],'#6A7E89',EDGE,1.9)
        a.poly([(219,123),(275,95),(332,123)],'#D8BBA5',EDGE,2)
        for x in (241,267,293):a.rect(x,142,15,29,'#8AADB0',EDGE,1.3,rx=6)
        bridge(a,62,273,420,'#E6C8A4')
    else:
        raise ValueError(id)
    return a


LANDMARKS=['londyn','dover','prom-kanal','tunel-kanal','birmingham','manchester','edynburg','paryz','reims','metz','calais','dunkierka','lille','lyon']


def checker(w,h,tile=20):
    out=Image.new('RGB',(w,h),'#F4F4F0');d=ImageDraw.Draw(out)
    for y in range(0,h,tile):
        for x in range(0,w,tile):
            if (x//tile+y//tile)%2==0:d.rectangle((x,y,x+tile-1,y+tile-1),fill='#D9DEDC')
    return out


def font(n=21):
    opts=['/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf','/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf']
    for p in opts:
        if os.path.isfile(p):return ImageFont.truetype(p,n)
    return ImageFont.load_default()


def thumbnail(image,width):
    return image.resize((width,int(image.height*width/image.width)),Image.Resampling.LANCZOS)


def composite(cc,land):
    # Physical compositing positions in @3x pixels, not renderer code.
    skyim=Image.open(OUT/f'countries/{cc}/{cc}-sky.png').convert('RGBA')
    canvas=skyim.copy()
    for layer,y,x in [('clouds',180,0),('far',390,0),('landmark',490,-65),('near',1170,0),('road',1590,0)]:
        if layer=='landmark':path=OUT/'landmarks'/f'{land}.png'
        else:path=OUT/f'countries/{cc}'/f'{cc}-{layer}.png'
        obj=Image.open(path).convert('RGBA')
        crop=obj.crop((0,0,1080,obj.height)) if x==0 else obj
        canvas.alpha_composite(crop,(x,y))
    return canvas


def preview_country(cc,land):
    W,H=1860,2700
    out=Image.new('RGB',(W,H),'#F5F4EE');d=ImageDraw.Draw(out)
    d.text((44,18),f'{cc.upper()} | WORLD PREVIEW',font=font(42),fill='#26394D')
    # Large scene with true screen proportions, 0.68x.
    scene=composite(cc,land)
    scene=thumbnail(scene,700)
    bg=checker(scene.width,scene.height,28)
    bg.paste(scene,mask=scene.getchannel('A'))
    out.paste(bg,(48,100))
    d.text((790,107),f'{cc.upper()} / {land}',font=font(35),fill='#26394D')
    d.text((790,173),'360 x 640 logic  |  @3x',font=font(23),fill='#526472')
    specs=[('sky',290,400,0),('clouds',740,155,0),('far',960,220,270),('near',1235,215,95),('road',1510,240,0)]
    for layer,y,maxh,top in specs:
        obj=Image.open(OUT/f'countries/{cc}/{cc}-{layer}.png').convert('RGBA')
        crop=obj.crop((0,top,obj.width,obj.height)) if top else obj
        target_w=400 if layer=='sky' else 840
        th=thumbnail(crop,target_w)
        if th.height>maxh:
            th=th.resize((int(th.width*maxh/th.height),maxh),Image.Resampling.LANCZOS)
        back=checker(th.width,th.height,24);back.paste(th,mask=th.getchannel('A'))
        out.paste(back,(790,y+34))
        d.text((790,y),f'{cc}-{layer}.png ({obj.width} x {obj.height})',font=font(22),fill='#304356')
    d.text((48,1720),'SEAM TEST  |  TWO CONSECUTIVE TILES',font=font(30),fill='#26394D')
    y=1790
    for layer in ('clouds','far','near','road'):
        obj=Image.open(OUT/f'countries/{cc}/{cc}-{layer}.png').convert('RGBA')
        twin=Image.new('RGBA',(obj.width*2,obj.height))
        twin.alpha_composite(obj,(0,0));twin.alpha_composite(obj,(obj.width,0))
        strip=thumbnail(twin,1640)
        strip=strip.crop((0,max(0,strip.height-150) if layer in ('far','near') else 0,1640,strip.height if layer in ('far','near') else min(strip.height,150)))
        back=checker(1640,strip.height,22);back.paste(strip,mask=strip.getchannel('A'))
        d.text((50,y),layer,font=font(20),fill='#33475A')
        out.paste(back,(160,y))
        xsep=160+820
        d.line((xsep,y,xsep,y+strip.height),fill='#E75A58',width=2)
        y+=max(strip.height,64)+42
    d.text((44,2640),'Vector artwork | original | transparent layers | no brands, no embedded game text',font=font(18),fill='#647585')
    file=OUT/f'countries/{cc}/preview.png'
    out.save(file,optimize=True,compress_level=9)


def preview_landmarks():
    w=1850;pad=38;cell_w=560;cell_h=350;rows=math.ceil(len(LANDMARKS)/3)
    out=Image.new('RGB',(w,110+rows*cell_h),'#F5F4EF');d=ImageDraw.Draw(out)
    d.text((40,25),'UK / FR / CHANNEL | LANDMARK CONTACT SHEET',font=font(34),fill='#26394D')
    for i,name in enumerate(LANDMARKS):
        r,c=divmod(i,3);x=pad+c*600;y=100+r*cell_h
        base=checker(cell_w,cell_h-42,22)
        sprite=Image.open(OUT/'landmarks'/f'{name}.png').convert('RGBA')
        tn=thumbnail(sprite,cell_w)
        base.paste(tn,(0,0),mask=tn.getchannel('A'))
        out.paste(base,(x,y))
        d.text((x+14,y+cell_h-38),name,font=font(22),fill='#34485A')
    out.save(OUT/'landmarks/preview.png',optimize=True,compress_level=9)


def docs():
    base='ChatGPT: oryginalne ilustracje SVG (Python, CairoSVG, Pillow); korekta kafelkow'
    for cc,desc in [('uk','Wielka Brytania'),('fr','Francja')]:
        lines=[f'# {desc}: warstwy t\u0142a', '', 'Grafiki oryginalne, wygenerowane w ChatGPT i wykonane programowo; poprawki: reczna korekta kompozycji i laczenia kafelkow. Ka\u017cda warstwa w skali @3x. Poni\u017cej wymiary w pikselach fizycznych.','', '| Plik | \u0179r\u00f3d\u0142o/narz\u0119dzie | Licencja | Autor / uwagi |','|---|---|---|---|']
        for l,dims,scroll in [('sky','1080x1920','0'),('clouds','2160x600','0,15'),('far','2160x900','0,25'),('near','2160x720','0,5'),('road','1080x330','1,0')]:
            lines.append(f'| `{cc}-{l}.png` | {base} | W\u0142asne, do projektu | {dims}; paralaksa: {scroll}; '+ ('nieprzezroczyste niebo' if l=='sky' else 'przezroczysto\u015b\u0107 RGBA; powtarzalny kafelek')+' |')
        lines.append('| `preview.png` | Pillow, kompozycja i test kafelk\u00f3w | W\u0142asne, do projektu | Arkusz kontroli; napisy wy\u0142\u0105cznie na arkuszu |')
        lines += ['', '## Integracja', '', 'Pozycje sugerowane dla obrazu 1080x1920: `sky` y=0, `clouds` y=180, `far` y=390, `near` y=1170, `road` y=1590; punkt orientacyjny y=490. Wsp\u00f3\u0142rz\u0119dne do korekty przez koordynatora. Warstwy s\u0105 PNG RGBA, a `sky` jest celowo nieprzezroczyste. Wszystkie warstwy przewijane (`clouds`, `far`, `near`, `road`) s\u0105 kafelkami poziomymi. W `preview.png` pokazano dwa kafelki obok siebie.','', 'Bez cudzych logotyp\u00f3w, nazw firm i tekstu w grafice. Widoki to stylizowane ilustracje, a nie dokumentacja architektury.','']
        (OUT/f'countries/{cc}/ASSETS.md').write_text('\n'.join(lines),encoding='utf-8')
    lines=['# Panorama punkt\u00f3w trasy (UK / FR / kana\u0142)', '', 'Ilustracje oryginalne wygenerowane w ChatGPT i wykonane programowo, 1620x900 px, PNG RGBA, przezroczyste t\u0142o.','', '| Plik | \u0179r\u00f3d\u0142o/narz\u0119dzie | Licencja | Autor / uwagi |', '|---|---|---|---|']
    onroute=set(['londyn','dover','prom-kanal','paryz','reims','metz','calais','dunkierka'])
    for name in LANDMARKS:
        extras='dodatkowy motyw z briefu; obecnie poza `waypoints.ts`' if name not in onroute else 'id z `waypoints.ts`'
        lines.append(f'| `{name}.png` | {base} | W\u0142asne, do projektu | {extras}; przezroczysto\u015b\u0107 |')
    lines.append('| `preview.png` | Pillow / szachownica | W\u0142asne, do projektu | Arkusz podgl\u0105du bez tekstu w sprite\'ach |')
    lines+=['', '## Zasady', '', 'Sylwetki s\u0105 stylizowane, bez logotyp\u00f3w, nazw, tekstu i symboli religijnych. Dodatkowo wykonano `tunel-kanal.png` jako wariant przeprawy, cho\u0107 nie ma go jeszcze w trasie g\u0142\u00f3wnej. Pliki `birmingham`, `manchester`, `edynburg`, `lille` i `lyon` odpowiadaj\u0105 motywom z briefu, ale nie znajduj\u0105 si\u0119 w `waypoints.ts` na dzie\u0144 przygotowania.','']
    (OUT/'landmarks/ASSETS.md').write_text('\n'.join(lines),encoding='utf-8')


def seam_report():
    lines=[]
    for cc in ('uk','fr'):
        for layer in ('clouds','far','near','road'):
            im=Image.open(OUT/f'countries/{cc}/{cc}-{layer}.png').convert('RGBA')
            w,h=im.size
            diff=ImageChops.difference(im.crop((0,0,1,h)),im.crop((w-1,0,w,h)))
            extrema=diff.getextrema()
            maxdiff=max(v[1] for v in extrema)
            lines.append((cc,layer,maxdiff))
    for row in lines:print('Seam:',*row)
    return lines


def main():
    for cc in ('uk','fr'):
        for layer,fn in [('sky',sky),('clouds',clouds),('far',far),('near',near),('road',road)]:
            path=OUT/f'countries/{cc}/{cc}-{layer}.png'
            save(fn(cc),path)
            print(f'{path.relative_to(OUT)} {path.stat().st_size:,} bytes')
    for id in LANDMARKS:
        path=OUT/'landmarks'/f'{id}.png'
        save(make_landmark(id),path)
        print(f'{path.relative_to(OUT)} {path.stat().st_size:,} bytes')
    for cc,land in [('uk','londyn'),('fr','paryz')]:preview_country(cc,land)
    preview_landmarks()
    docs()
    report=seam_report()
    assert all(err==0 for _,_,err in report),'High tile edge discontinuity'
    print('Output:',OUT,'total files:',len(list(OUT.rglob('*.*'))))

if __name__=='__main__':main()