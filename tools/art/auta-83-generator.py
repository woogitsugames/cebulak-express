#!/usr/bin/env python3
"""Zlecenie 83: autorskie, bezmarkowe wektory 2D -> sprite'y PNG RGBA @3x.

Wymaga cairosvg i Pillow. Generator jest samowystarczalny.
"""
from __future__ import annotations
import io
import math
import json
from pathlib import Path
import cairosvg
from PIL import Image, ImageDraw, ImageFont, ImageCms, ImageFilter

ROOT = Path(__file__).resolve().parents[3]
ASSETS = ROOT / 'public/assets/skins'
PREVIEWS = ROOT / 'docs/art/podglady'
NAVY = '#192a43'
STROKE = 3.5
BLUE = '#4d819b'
IVORY = '#ffede0'
ICC = ImageCms.ImageCmsProfile(ImageCms.createProfile('sRGB')).tobytes()

GRADS = '''
<defs>
 <linearGradient id="red" x1="0" x2="0.2" y1="0" y2="1"><stop stop-color="#ff8e77"/><stop offset=".45" stop-color="#ff514c"/><stop offset="1" stop-color="#d52f40"/></linearGradient>
 <linearGradient id="silver" x1="0" x2="0.1" y1="0" y2="1"><stop stop-color="#fff4de"/><stop offset=".48" stop-color="#dce4e2"/><stop offset="1" stop-color="#899ca7"/></linearGradient>
 <linearGradient id="glass" x1="0" x2=".4" y1="0" y2="1"><stop stop-color="#a8e3ec"/><stop offset=".38" stop-color="#82bed8"/><stop offset="1" stop-color="#37728c"/></linearGradient>
 <linearGradient id="suitcase" x1="0" x2=".2" y1="0" y2="1"><stop stop-color="#d99e5d"/><stop offset="1" stop-color="#a96a3f"/></linearGradient>
 <linearGradient id="bluebag" x1="0" x2=".4" y1="0" y2="1"><stop stop-color="#6fd6f1"/><stop offset="1" stop-color="#287cba"/></linearGradient>
</defs>
'''

class V:
    def __init__(self, width=288, height=168):
        self.width, self.height = width, height
        self.a = []
    def raw(self, xml): self.a.append(xml); return self
    def path(self,d,fill='none',stroke=NAVY,sw=STROKE,extra=''):
        self.a.append(f'<path d="{d}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round" {extra}/>'); return self
    def rect(self,x,y,w,h,fill,stroke=NAVY,sw=STROKE,rx=0,extra=''):
        self.a.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}" {extra}/>'); return self
    def ellipse(self,cx,cy,rx,ry,fill,stroke=NAVY,sw=STROKE,extra=''):
        self.a.append(f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}" {extra}/>'); return self
    def line(self,x1,y1,x2,y2,stroke=NAVY,sw=STROKE,extra=''):
        self.a.append(f'<path d="M{x1} {y1} L{x2} {y2}" stroke="{stroke}" stroke-width="{sw}" stroke-linecap="round" {extra}/>'); return self
    def svg(self):
        return f'<svg xmlns="http://www.w3.org/2000/svg" width="{self.width}" height="{self.height}" viewBox="0 0 {self.width} {self.height}">{GRADS}{"".join(self.a)}</svg>'
    def image(self):
        data=cairosvg.svg2png(bytestring=self.svg().encode(), output_width=self.width, output_height=self.height)
        return Image.open(io.BytesIO(data)).convert('RGBA')


def draw_person(v:V, x:int, y:int, skin='red'):
    """Profil sympatycznego kierowcy zwróconego w prawo; prosty wektor, bez rozpoznawalnej twarzy."""
    shirt = '#38788c' if skin == 'red' else '#53688b'
    v.path(f'M{x-15} {y+21} Q{x-16} {y+7} {x-3} {y+5} Q{x+12} {y+3} {x+17} {y+23} Z',shirt,NAVY,2.4)
    v.ellipse(x,y,9.5,11,'#f3ba84',NAVY,2.5)
    v.path(f'M{x-10} {y-3} Q{x-11} {y-13} {x-1} {y-14} Q{x+7} {y-15} {x+12} {y-7} L{x+5} {y-6} L{x+2} {y-8} Q{x-3} {y-6} {x-10} {y-3} Z','#323d52',NAVY,1.6)
    v.ellipse(x+5,y,1.05,1.05,NAVY,'none',0)
    v.path(f'M{x+6} {y+5} Q{x+9} {y+7} {x+11} {y+4}',stroke='#b56d60',sw=1.3)
    v.ellipse(x+13,y+13,2.8,2.4,'#f3ba84',NAVY,1.3)


def arch_bottom(rear,front,left,right):
    """Profil progów z wyrzeźbionymi łukami kół; r=22, oś y=138."""
    # idziemy od przedniego zderzaka do tyłu (prawo->lewo)
    return (f'L{right} 140 L{front+23} 140 '
            f'C{front+23} 126 {front+14} 116 {front} 116 '
            f'C{front-14} 116 {front-23} 126 {front-23} 140 '
            f'L{rear+23} 140 '
            f'C{rear+23} 126 {rear+14} 116 {rear} 116 '
            f'C{rear-14} 116 {rear-23} 126 {rear-23} 140 '
            f'L{left} 140')


def body_red(crash=False):
    v=V()
    # tył i mocno bąbelkowy dach - skośna, krótka tylna klapa, brak poziomego kufra
    v.path('M47 119 Q47 103 56 94 L66 78 Q74 59 96 49 Q119 38 147 41 Q170 41 181 53 Q197 67 207 88 L228 94 Q244 98 248 110 L251 129 Q253 139 244 140 '+arch_bottom(90,217,47,251)+' Q38 136 47 119 Z', 'url(#red)',NAVY,4.3)
    # ślady objętości i odbicie słońca
    v.path('M72 74 Q85 54 106 49 Q140 39 165 49',stroke='#ffb0a0',sw=3.2)
    v.path('M49 122 Q59 117 65 120 M116 125 L192 125 M239 124 L248 122',stroke='#ad303d',sw=2.2)
    # okna z mniejszą szybą bagażową i długą szybą przednią - jedna para drzwi
    v.path('M75 86 Q79 62 102 56 Q117 51 129 52 L127 86 Z','url(#glass)',NAVY,3.2)
    v.path('M137 52 Q166 48 178 62 Q189 72 198 86 L136 86 Z','url(#glass)',NAVY,3.4)
    v.path('M83 71 Q98 58 115 57',stroke='#dff9f5',sw=2.3)
    v.path('M143 58 Q163 53 172 62',stroke='#e9fcfc',sw=2.2)
    # kierowca częściowo na szybie przedniej
    draw_person(v,174,71,'red')
    # słupek B przesłania postać i wzmocnienie krawędzi
    v.path('M133 52 L131 88',stroke=NAVY,sw=5)
    v.path('M136 54 L135 84',stroke='#ffe8ce',sw=1.7)
    # duże pojedyncze drzwi i klamka, przednie nadkole
    v.path('M133 92 L132 130 Q133 135 139 137 L189 137',stroke='#a22c40',sw=2.6)
    v.rect(145,95,16,5,'#ffe1bf',NAVY,2.1,2.5)
    v.ellipse(149,98,2,1.5,NAVY,'none',0)
    v.path('M194 90 L202 132',stroke='#be3042',sw=2.1)
    v.path('M201 88 L212 94 L209 103 L200 102 Z','#323f54',NAVY,2.6)
    v.path('M214 93 L230 96',stroke='#ffb09b',sw=2)
    # światła i zderzaki - generyczne, bez charakterystycznych kształtów
    v.path('M240 103 Q250 108 250 117 L239 113 Z','#ffde8a',NAVY,2.4)
    v.path('M47 105 Q53 102 59 106 L59 118 L47 118 Z','#e25e64',NAVY,2.2)
    v.line(51,111,56,113,'#fff0b8',2)
    v.path('M240 131 L252 131 L248 137 L238 138 Z','#314257',NAVY,2)
    v.path('M44 132 L54 132',stroke='#34485c',sw=3)
    # bardzo krótki tył i mała dysza napędu
    v.path('M47 135 L39 135 L37 131',stroke='#415262',sw=3)
    v.ellipse(38,133,3,2,'#4f6578',NAVY,1.6)
    # zagłębienie archów / progi
    v.path('M117 136 L190 136',stroke='#663047',sw=2)
    if crash:
        v.path('M207 97 L222 111 L211 121 L224 133 M229 97 L239 107 L233 122 L253 132',stroke='#862e40',sw=3.4)
        v.path('M181 60 L190 72 L179 75 L190 86',stroke='#e9f8ef',sw=2)
        v.path('M246 101 L252 91 L247 118 L260 115 L254 133',fill='#fd8069',stroke=NAVY,sw=2.5)
        v.path('M248 143 L260 153 L246 150',fill='#f3ad60',stroke=NAVY,sw=2.2)
        v.path('M226 83 L223 70 L232 78 L240 65',stroke='#ffc866',sw=2.4)
        v.path('M257 100 L268 98 M263 93 L266 86',stroke='#ffc966',sw=2.1)
    return v


def body_silver(crash=False):
    v=V()
    # bardzo długie i NISKIE kombi z lat 2000: dach jest prawie poziomy, tył pionowy
    v.path('M16 109 Q16 94 26 88 L39 86 L48 66 Q52 57 66 56 L203 56 Q219 57 228 75 L241 87 L261 94 Q271 98 274 111 L277 132 Q276 140 267 140 '+arch_bottom(77,229,16,277)+' Q14 140 16 109 Z','url(#silver)',NAVY,4.25)
    # relingi z widocznymi podporami, mocowane do długiego dachu
    v.path('M54 56 L54 49 Q55 47 61 47 L207 47 Q211 47 211 51 L211 57',stroke=NAVY,sw=4.2)
    v.path('M62 46 L202 46',stroke='#ffd9a8',sw=2.15)
    v.rect(68,49,5,8,'#6f8791',NAVY,1.5,1)
    v.rect(187,49,5,8,'#6f8791',NAVY,1.5,1)
    # przedział bagażowy - wyraźnie długi i niski, okna za kierowcą
    v.path('M51 69 L98 69 L98 93 L41 93 L45 77 Z','url(#glass)',NAVY,2.8)
    v.path('M106 68 L159 68 L159 93 L106 93 Z','url(#glass)',NAVY,2.8)
    v.path('M167 68 L204 68 Q215 70 224 89 L225 93 L167 93 Z','url(#glass)',NAVY,3)
    v.path('M46 82 L51 72 L61 71 M111 72 L151 72 M172 72 L193 72',stroke='#dff7f1',sw=2.0)
    draw_person(v,206,78,'silver')
    # słupki (trzy widoczne okna -> kombi, nie minivan)
    v.path('M101 68 L101 94 M163 67 L163 95',stroke=NAVY,sw=4.5)
    # Długa linia boczna, dwie pary drzwi, szyba klapy
    v.path('M25 94 L25 124',stroke='#697e8c',sw=2.6)
    v.path('M106 97 L106 134 M166 97 L166 134',stroke='#677a87',sw=2.8)
    v.path('M46 106 L254 106',stroke='#fff8de',sw=2.5)
    v.path('M44 109 L254 109',stroke='#869aa5',sw=1.35)
    v.rect(113,99,14,4,'#e5ebdc',NAVY,1.8,2)
    v.rect(173,99,14,4,'#e5ebdc',NAVY,1.8,2)
    v.path('M215 93 L228 94 L230 101 L217 101 Z','#6f8796',NAVY,2.1)
    v.path('M37 123 Q43 116 49 120 M116 133 L202 133',stroke='#6e808c',sw=1.8)
    # klasyczne uniwersalne lampy, brak wzorca konkretnej marki
    v.rect(18,103,9,16,'#ef7773',NAVY,2.3,2)
    v.path('M265 101 Q272 104 274 112 L262 112 L258 105 Z','#ffe3a1',NAVY,2.6)
    v.path('M269 128 L278 128 L280 135 L267 138',fill='#6b7e8c',stroke=NAVY,sw=2.2)
    v.path('M17 132 L24 132',stroke='#263e50',sw=2.2)
    # hak holowniczy z wystającą kulą na LEWYM końcu
    v.path('M18 139 L10 139 L8 144 L5 144',stroke=NAVY,sw=3.4)
    v.ellipse(5,144,3.5,3.2,'#566a78',NAVY,1.5)
    # patyna: trochę wypłowiały lakier i lekko rdzawy próg, bez wyglądu wraku
    v.path('M118 126 Q129 123 141 127 L147 133 L113 133 Z','#b78c76','none',0,extra='opacity="0.66"')
    v.path('M119 128 L133 130 M141 128 L151 130 M34 119 L38 117',stroke='#bc826e',sw=1.6)
    v.path('M166 118 L184 117',stroke='#f1f5e7',sw=2.1)
    v.path('M232 118 L249 118',stroke='#f3ead9',sw=1.6)
    v.path('M41 60 L201 60',stroke='#fff7df',sw=2.5)
    if crash:
        v.path('M224 99 L235 112 L225 120 L239 135 M247 94 L258 110 L249 124 L268 132',stroke='#75838b',sw=3.4)
        v.path('M214 77 L222 82 L212 85 L218 93',stroke='#f6f8e8',sw=2.1)
        v.path('M260 97 L271 87 L272 108 L283 105 L273 128',fill='#b2bbb4',stroke=NAVY,sw=2.8)
        v.path('M265 143 L284 150 L269 153',fill='#b8aaa1',stroke=NAVY,sw=2.0)
        v.path('M249 88 L244 76 L251 80 L260 73',stroke='#ffe083',sw=2.2)
        v.path('M278 97 L282 93',stroke='#ffc966',sw=2)
    return v


def wheel_svg(v:V,cx=18,cy=18,aging=False):
    v.ellipse(cx,cy,17.6,17.6,'#192b41',NAVY,0)
    v.ellipse(cx,cy,15.3,15.3,'#25364c','#111f32',1.3)
    # rowki w bieżniku
    for ang in range(0,360,45):
        r=15.8; ar=math.radians(ang)
        x1=cx+r*math.cos(ar); y1=cy+r*math.sin(ar)
        x2=cx+(r-2.4)*math.cos(ar); y2=cy+(r-2.4)*math.sin(ar)
        v.line(round(x1,2),round(y1,2),round(x2,2),round(y2,2),'#71828b',1.4)
    v.ellipse(cx,cy,11.6,11.6,'#c6d5d8','#f0f4eb',1.6)
    v.ellipse(cx,cy,9.5,9.5,'#8299a7',NAVY,1.5)
    # pięcioramienne koło, bez logo
    for ang in range(0,360,72):
        a=math.radians(ang)
        b=a+0.4
        p1=(cx+3*math.cos(a),cy+3*math.sin(a))
        p2=(cx+8.3*math.cos(b),cy+8.3*math.sin(b))
        p3=(cx+7.3*math.cos(b+0.35),cy+7.3*math.sin(b+0.35))
        v.path(f'M{p1[0]:.2f} {p1[1]:.2f} L{p2[0]:.2f} {p2[1]:.2f} L{p3[0]:.2f} {p3[1]:.2f} Z','#e7ebe5','#657c89',0.65)
    v.ellipse(cx,cy,3.1,3.1,'#e9dbbb',NAVY,1.3)
    v.ellipse(cx-5,cy-6,2.2,1.2,'#fff8e9','none',0)


def flame(kind,frame):
    v=V()
    xend=45 if kind=='red' else 25
    xbase=xend+1
    tail=4 if frame==2 else 14
    y=129 if kind=='red' else 131
    # płomień wystaje W LEWO, z komicznie poszarpanymi piórami
    ext=7 if frame==2 else 0
    v.path(f'M{xbase} {y-7} Q{xbase-14} {y-15} {xbase-20-ext} {y-8} L{tail} {y-14} L{tail+7} {y-3} L{tail-1} {y+2} L{tail+12} {y+7} Q{xbase-18} {y+16} {xbase} {y+5} Z','#ff713f',NAVY,2.6)
    v.path(f'M{xbase} {y-4} Q{xbase-12} {y-10} {xbase-19} {y-4} L{tail+15} {y-5} L{tail+13} {y+4} L{tail+20} {y+5} Q{xbase-8} {y+10} {xbase} {y+2} Z','#ffcf55','none',0)
    v.path(f'M{xbase-1} {y-1} Q{xbase-8} {y-5} {xbase-16} {y} Q{xbase-9} {y+5} {xbase-1} {y+2} Z','#fff6ac','none',0)
    if frame==2:
        v.path(f'M{tail+1} {y+8} L{tail-3} {y+12} M{tail+4} {y-17} L{tail} {y-20}',stroke='#ffb659',sw=2)
    return v


def rack(v:V,kind):
    if kind=='red':
        v.rect(103,39,97,5,'#47647a',NAVY,2.5,2)
        v.line(113,39,113,33,sw=3)
        v.line(190,39,190,33,sw=3)
    else:
        v.rect(81,47,142,5,'#43586b',NAVY,2.4,2)
        v.line(94,47,94,41,sw=3)
        v.line(209,47,209,41,sw=3)


def suitcase(v,x,y,w,h,color='tan',slant=False):
    col={'tan':'url(#suitcase)','blue':'url(#bluebag)','red':'#dc6557','green':'#89a55a','cream':'#efcb89'}[color]
    v.rect(x,y,w,h,col,NAVY,2.7,3)
    v.path(f'M{x+w*.26} {y} L{x+w*.26} {y+h} M{x+w*.77} {y} L{x+w*.77} {y+h}',stroke='#704b43' if color=='tan' else '#516c70',sw=2)
    v.path(f'M{x+w*.28} {y} L{x+w*.28} {y-3} Q{x+w*.5} {y-8} {x+w*.67} {y-3} L{x+w*.67} {y}',stroke=NAVY,sw=2.4)
    v.line(x+4,y+4,x+w-5,y+4,'#fff3ba',1.2)
    v.rect(x+w*.44,y+h*.45,3.5,3.5,'#f2e2b8',NAVY,0.8,1)


def duffel(v,x,y,w,h,color='#4f9eae'):
    v.path(f'M{x+4} {y+h} Q{x} {y+4} {x+10} {y+2} Q{x+w*.5} {y-3} {x+w-9} {y+2} Q{x+w+2} {y+5} {x+w-3} {y+h} Z',color,NAVY,2.6)
    v.path(f'M{x+w*.38} {y+2} Q{x+w*.5} {y-8} {x+w*.61} {y+2}',stroke=NAVY,sw=2.1)
    v.line(x+8,y+4,x+9,y+h-1,'#d4ece0',2)
    v.line(x+w-10,y+4,x+w-12,y+h-1,'#d4ece0',2)


def roll(v,x,y,w=43,h=14):
    v.rect(x,y,w,h,'#86a879',NAVY,2.4,rx=7)
    v.ellipse(x+w-7,y+h/2,7,h/2,'#b4c88a',NAVY,1.6)
    v.ellipse(x+w-7,y+h/2,3.2,h/3,'#6f9875',NAVY,1.4)
    v.line(x+12,y+1,x+12,y+h-1,'#f4c772',2.4)
    v.line(x+22,y+1,x+22,y+h-1,'#f4c772',2.4)


def luggage(kind,level):
    v=V()
    rack(v,kind)
    if kind=='red':
        # wysokie, memiczne stosy na małym aucie, nie zasłaniają szyb
        if level==1:
            suitcase(v,137,21,37,18,'tan')
        elif level==2:
            suitcase(v,124,23,33,16,'tan'); duffel(v,157,25,37,14,'#388db0')
        elif level==3:
            suitcase(v,114,21,37,18,'tan'); suitcase(v,151,18,34,21,'red'); roll(v,130,8,42,12)
        else:
            suitcase(v,109,21,36,18,'blue'); suitcase(v,146,19,39,20,'tan')
            suitcase(v,120,9,31,16,'red'); duffel(v,155,9,39,16,'#4b849d'); roll(v,168,19,30,13)
    else:
        if level==1:
            suitcase(v,138,30,38,17,'tan')
        elif level==2:
            suitcase(v,116,30,40,17,'tan'); duffel(v,157,32,48,15,'#488da8')
        elif level==3:
            suitcase(v,110,28,39,19,'tan'); suitcase(v,153,25,41,22,'blue'); roll(v,123,12,47,14)
        else:
            suitcase(v,89,27,34,20,'tan'); suitcase(v,123,28,43,19,'blue'); suitcase(v,169,25,37,22,'tan')
            suitcase(v,130,11,36,18,'red'); duffel(v,171,11,37,16,'#678f65'); roll(v,89,14,36,13)
    return v


def crash(kind):
    v = body_red(True) if kind=='red' else body_silver(True)
    rear,front=(90,217) if kind=='red' else (77,229)
    # Osadzone koła: warstwa wheel nie jest rysowana w stanie game-over.
    # Kolejność w tym sprite: rysowana wewnątrz crash (na karoserii).
    wheel_svg(v,rear,139)
    wheel_svg(v,front+2,140)
    # błysk uderzenia przed zderzakiem, bez przedstawiania obrażeń
    ex=265 if kind=='red' else 269
    v.path(f'M{ex-10} 82 L{ex-5} 75 L{ex-4} 85 L{ex+4} 81 L{ex} 92 L{ex+8} 94 L{ex-1} 98','#ffe07d',NAVY,1.9)
    v.path(f'M{ex-2} 62 L{ex-5} 56 M{ex+7} 77 L{ex+13} 76',stroke='#ffcd74',sw=2)
    return v


def to_png(v:V,path:Path):
    img=v.image()
    save_png(img,path)


def save_png(im:Image.Image,path:Path):
    path.parent.mkdir(parents=True, exist_ok=True)
    im.convert('RGBA').save(path,icc_profile=ICC,optimize=True,compress_level=9)


def assemble(kind,mode='body',luggage_level=0,flame_frame=0):
    base=Image.new('RGBA',(288,168),(0,0,0,0))
    if mode=='crash':
        return crash(kind).image()
    if flame_frame:
        base.alpha_composite(flame(kind,flame_frame).image())
    base.alpha_composite((body_red() if kind=='red' else body_silver()).image())
    w=V(288,168)
    for cx in ([90,217] if kind=='red' else [77,229]):wheel_svg(w,cx,138)
    base.alpha_composite(w.image())
    if luggage_level:
        base.alpha_composite(luggage(kind,luggage_level).image())
    return base


def portrait(kind):
    W=384
    S=2
    surf=Image.new('RGBA',(W*S,W*S),(0,0,0,0))
    mask=Image.new('L',(W*S,W*S),0)
    md=ImageDraw.Draw(mask)
    md.rounded_rectangle((8*S,8*S,376*S,376*S),radius=35*S,fill=255)
    # barwne tło malowane z lekkim pionowym gradientem
    p=Image.new('RGBA',(W*S,W*S))
    pix=p.load()
    base0=(254,231,201) if kind=='red' else (219,235,241)
    base1=(253,170,155) if kind=='red' else (153,188,202)
    for yy in range(W*S):
        f=yy/(W*S-1)
        color=tuple(int(base0[i]*(1-f)+base1[i]*f) for i in range(3))
        ImageDraw.Draw(p).line((0,yy,W*S,yy),fill=(*color,255))
    d=ImageDraw.Draw(p)
    d.ellipse((286*S,32*S,354*S,100*S),fill='#fff2bb')
    for x,y,scale in [(45,78,1.0),(250,142,.6)]:
        x,y=int(x*S),int(y*S);r=int(24*scale*S)
        d.ellipse((x,y,x+r*2,y+r*2),fill='#ffffff')
        d.ellipse((x+r,y-r//2,x+r*3,y+r*2),fill='#ffffff')
        d.ellipse((x+2*r,y,x+4*r,y+r*2),fill='#ffffff')
    d.polygon([(0,266*S),(150*S,244*S),(384*S,278*S),(384*S,376*S),(0,376*S)],fill='#8db6ad' if kind=='red' else '#82a3ad')
    d.rectangle((0,308*S,384*S,376*S),fill='#22364b')
    d.rectangle((0,315*S,384*S,324*S),fill='#4e6475')
    for x in range(20,384,108):
        d.rounded_rectangle((x*S,349*S,(x+55)*S,355*S),radius=3*S,fill='#f3d692')
    # naturalny cień pod pojazdem
    shade=Image.new('RGBA',p.size,(0,0,0,0));sd=ImageDraw.Draw(shade)
    sd.ellipse((39*S,278*S,349*S,315*S),fill=(17,32,47,100))
    shade=shade.filter(ImageFilter.GaussianBlur(8*S))
    p.alpha_composite(shade)
    car=assemble(kind,luggage_level=2)
    c=car.resize((int(288*1.29*S),int(168*1.29*S)),Image.Resampling.LANCZOS)
    p.alpha_composite(c,(7*S,89*S))
    p.putalpha(mask)
    return p.resize((W,W),Image.Resampling.LANCZOS)


def manifest(id,name,rear,front):
    common={"anchorX":144,"anchorY":106}
    layers={k:{"file":k+'.png',**({"anchorX":18,"anchorY":18} if k=='wheel' else {"anchorX":192,"anchorY":192} if k=='portrait' else common)} for k in ['body','wheel','flame-1','flame-2','luggage-1','luggage-2','luggage-3','luggage-4','crash','portrait']}
    return {
      "id": id,"displayName":name,"scale":3,"version":1,
      "canvas":{"width":288,"height":168},
      "hitbox":{"width":40,"height":20,"anchorX":144,"anchorY":106},
      "logicalVehicleSize":{"width":72,"height":44},
      "wheelCenters":{"rear":{"x":rear,"y":138},"front":{"x":front,"y":138}},
      "layers":layers,
      "portrait":{"file":"portrait.png","width":384,"height":384,"anchorX":192,"anchorY":192},
      "drawOrder":["flame-1|flame-2","body","wheel:rear","wheel:front","luggage-1|luggage-2|luggage-3|luggage-4"],
      "notes":"Zlecenie 83: sylwetka poprawiona. Nakładki bagażowe 1-4 to kompletne alternatywy. Crash ma własne koła (renderer pomija wheel w stanie over). Anchor (144,106), PNG RGBA sRGB @3x."
    }


def read_font(size,bold=False):
    path='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf' if bold else '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
    return ImageFont.truetype(path,size)


def draw_preview():
    # 5 stanów w dwóch wierszach; każda komórka pokazuje prawdziwe złożenie warstw.
    W,H=1920,1000
    surface=Image.new('RGB',(W,H),'#e5ebed')
    d=ImageDraw.Draw(surface)
    d.rectangle((0,0,W,92),fill='#172b46')
    d.text((36,20),'ZLECENIE 83  /  KOREKTA SYLWETEK',font=read_font(34,True),fill='#fff8e3')
    d.text((1340,29),'SPRITE PNG  •  288×168 @3x',font=read_font(21,True),fill='#afc8d4')
    states=[('JAZDA',0,0,False),('LOT / PŁOMIEŃ',0,2,False),('ROZBITE',0,0,True),('BAGAŻ 1',1,0,False),('BAGAŻ 4',4,0,False)]
    names=[('red','MAŁA JAPONKA','Czerwona, wysoka, 3-drzwiowa bąbelkowa miejska'),('silver','DIESELEK PO DZIADKU','Srebrne, niskie i długie kombi • relingi • hak')]
    for row,(kind,name,note) in enumerate(names):
        ty=104+row*443
        d.rounded_rectangle((17,ty,1903,ty+425),radius=17,fill='#ffffff',outline='#bfcbd1',width=2)
        d.text((32,ty+13),name,font=read_font(29,True),fill='#263955')
        d.text((470,ty+20),note,font=read_font(18),fill='#6b7783')
        for col,(label,bag,fire,broken) in enumerate(states):
            x=28+col*376
            y=ty+65
            # wysycona, ciepła plansza, drogą kończąca stan
            for i in range(274):
                mix=i/274
                c=tuple(int(a+(b-a)*mix) for a,b in zip((204,238,249),(245,237,210)))
                d.line((x,y+i,x+365,y+i),fill=c)
            d.ellipse((x+274,y+26,x+331,y+83),fill='#fff8c0')
            for cx,cy in [(33,39),(133,67),(251,59)]:
                px=x+cx;py=y+cy
                d.ellipse((px,py,px+34,py+21),fill='#fffefa')
                d.ellipse((px+17,py-8,px+53,py+21),fill='#fffefa')
                d.ellipse((px+37,py,px+72,py+19),fill='#fffefa')
            d.polygon([(x,y+217),(x+140,y+201),(x+250,y+208),(x+365,y+193),(x+365,y+260),(x,y+260)],fill='#97b5a1')
            d.rectangle((x,y+260,x+365,y+274),fill='#496276')
            d.rectangle((x,y+245,x+365,y+259),fill='#283d51')
            for z in [30,158,283]: d.rounded_rectangle((x+z,y+257,x+z+57,y+262),radius=2,fill='#f8d67d')
            # auto przesunięte do dołu tak, by opony stały nad drogą
            car=assemble(kind,'crash' if broken else 'body',bag,fire)
            car=car.resize((338,197),Image.Resampling.LANCZOS)
            surface.paste(car,(x+13,y+60),car)
            d.rounded_rectangle((x,y+284,x+365,y+337),radius=10,fill='#243850')
            d.text((x+15,y+292),label,font=read_font(20,True),fill='#fff8e3')
            desc=['body + wheel','body + wheel + flame-2','crash (koła w sprite)','luggage-1','luggage-4'][col]
            d.text((x+15,y+316),desc,font=read_font(15),fill='#b9d0d9')
    save_png(surface.convert('RGBA'), PREVIEWS/'auta-83.png')


def write_docs():
    date='30.10.2026'
    entries=[
      ('mala-japonka','Mała Japonka','czerwona, krótka, zaokrąglona trzydrzwiowa japońska mikromiejska; wysoka bąbelkowa linia dachu, krótka tylna klapa; bez sedana','red'),
      ('dieselek-dziadka','Dieselek po dziadku','srebrne długie, niskie kombi z początku lat 2000; wydłużony bagażnik i dach, relingi, hak, delikatna patyna; bez minivana','silver')]
    for ident,title,notes,kind in entries:
        prompt=f'Autorski bezmarkowy samochód 2D do gry, profil dokładnie boczny, przód w prawo; {notes}. Płaska ilustracja wektorowa, gruby ciemnogranatowy kontur, ciepłe kolory, słońce z lewej góry, neutralny pogodny kierowca, bagaże na dachu. Osobne warstwy z przezroczystością PNG RGBA, @3x, canvas 288x168, koło 36x36, crash z kołami, dwa płomienie, cztery niezależne nakładki bagaży, portret 384x384. Bez marek, modeli, logotypów ani tekstu na obrazkach.'
        content=f'''# {title} — poprawka sylwetki, zlecenie 83

**Data:** {date}  
**Autor / narzędzia:** ChatGPT Images (arkusz koncepcji), własne geometryczne ścieżki SVG zaprojektowane w ChatGPT, Python 3, CairoSVG, Pillow; ręczna korekta wymiarów, położenia kół, warstw i szczegółów po renderingu.  
**Licencja i prawa użytkowania:** własny materiał wygenerowany i przygotowany dla projektu Cebulak Express zgodnie z warunkami usługi OpenAI; brak cudzych grafik, internetowych zdjęć, znaków i materiałów o zależnych licencjach. Nie deklaruje się wyłączności prawnoautorskiej.

## Prompt / brief

> {prompt}

## Wykaz zasobów

| Plik | Źródło / narzędzie | Licencja | Autor / uwagi |
| --- | --- | --- | --- |
| `body.png`, `wheel.png` | ChatGPT + autorskie SVG, CairoSVG/Pillow | Materiał dla projektu, bez materiałów zewnętrznych | Karoseria bez kół, osobne koło; koła w wyznaczonych osiach |
| `crash.png` | Jak wyżej | Jak wyżej | Komiczne uszkodzenia bez przemocy, wrysowane dwa koła |
| `flame-1.png`, `flame-2.png` | Jak wyżej | Jak wyżej | Dwa niezależne stany płomienia |
| `luggage-1.png` … `luggage-4.png` | Jak wyżej | Jak wyżej | Cztery pełne, niezależne nakładki; nie sumować |
| `portrait.png` | Kompozycja oryginalnych warstw w Pillow | Jak wyżej | Karta 384×384, przezroczyste rogi |
| `skin.json` | Dane geometryczne przygotowane w ChatGPT | Dane projektowe | `scale: 3`, `hitbox: 40×20`, anchor (144,106) |

Renderowanie zostało wykonane jako PNG RGBA ze zdefiniowanym profilem sRGB (ICC). Wymiary: 288×168, koło 36×36, portret 384×384. Źródło skryptowe: `docs/art/podglady/auta-83-generator.py`. Arkusz porównawczy: `docs/art/podglady/auta-83.png`.
'''
        (ASSETS/ident/'ASSETS.md').write_text(content,encoding='utf8')
    # Podstawowy public/assets/skins/ASSETS.md na main opisuje 3 stare skórki.
    # ZIP w postaci poprawki jest addytywny: koordynator dopisuje blok do istniejącego pliku.
    # Do paczki zlecenia dołączony jest gotowy cały ASSETS.md na bazie aktualnego main.
    orig='''# Skórki — pochodzenie grafik

Trzy oryginalne skórki wykonane dla gry Cebulak Express w ChatGPT. Ilustracje proceduralne, własne kształty i ręcznie dobrane palety, cieniowanie, światło z lewej góry. Brak obcych logotypów, marek i chronionych postaci.
'''
    table='''
## Zlecenie 83 — poprawione sylwetki (30.10.2026)

| Plik | Źródło / narzędzie | Licencja | Autor / uwagi |
| --- | --- | --- | --- |
| `mala-japonka/body.png`, `wheel.png`, `crash.png`, `flame-1.png`, `flame-2.png`, `luggage-1.png`–`luggage-4.png`, `portrait.png` | Koncepcja ChatGPT Images; własne ścieżki SVG, Python/CairoSVG/Pillow, ręczne poprawki | Utworzone dla projektu na warunkach korzystania z materiałów OpenAI, bez cudzych elementów | Mała, czerwona, bąbelkowa miejska trzydrzwiówka; osie 90/217, y=138 |
| `dieselek-dziadka/body.png`, `wheel.png`, `crash.png`, `flame-1.png`, `flame-2.png`, `luggage-1.png`–`luggage-4.png`, `portrait.png` | Jak wyżej | Jak wyżej | Srebrne, długie niskie kombi, relingi, hak, patyna; osie 77/229, y=138 |
| `mala-japonka/skin.json`, `dieselek-dziadka/skin.json`, `*/ASSETS.md` (oba auta) | ChatGPT, własne geometrie i dokumentacja | Materiał dla projektu | Zachowany format 288×168 @3x, anchor (144,106), hitbox 40×20, portrait 384×384 |
| `docs/art/podglady/auta-83.png` | Kompozycja rzeczywistych warstw w Pillow | Jak wyżej | 2 auta × 5 stanów |
| `docs/art/podglady/auta-83-generator.py` | Autorski skrypt ChatGPT / Python, SVG, CairoSVG, Pillow | Materiał dla projektu | Reprodukowalny generator warstw i podglądu |
| `docs/art/podglady/auta-83-koncepcja.png` | ChatGPT Images, 30.10.2026 | Wygenerowany dla projektu | Referencja stylistyczna; NIE jest sprite'em runtime |

**Prompt:** „Wymyśl dwa bezmarkowe auta dla polonijnej gry 2D: krótką koralową bąbelkową trzydrzwiówkę i długie, niskie, zmęczone srebrne kombi z początku lat 2000 z relingami i hakiem. Jazda w prawo, perspektywa boczna, ciepłe kolory, gruby granatowy kontur, kierowca, walizki na dachu, odrębne warstwy postaci, bez logotypów i tekstu w grafice”. Grafiki końcowe zostały przerysowane w autorskie kształty SVG i skorygowane ręcznie.

**Geometria:** `wheel.png` jest współdzielony między kołami danej skórki; dlatego zachowano indywidualne ślady zużycia na karoserii Dieselka, bez deklarowania innej felgi, której obecny renderer nie obsługuje. Warstwy `luggage-1..4.png` się wykluczają. `crash.png` ma koła, gdyż renderer nie rysuje ich osobno w fazie `over`.
'''
    # Wiersze zapisywane jako łatwa do zastosowania dokumentacja, repo'owy ASSETS.md
    # na pełnej gałęzi 73/74 jest rozbudowany: unikamy nadpisania jego treści.
    # Skoro zlecenie żąda wpisu w public/assets/skins/ASSETS.md, dołączamy pełny plik
    # z main + nasze nowe adnotacje; po scaleniu PR77 koordynator może dopiąć wyłącznie sekcję 83.
    existing_main='''| Plik | Źródło / narzędzie | Licencja | Uwagi |
|---|---|---|---|
| `pan-cebulek/body.png`, `wheel.png` | Własna ilustracja proceduralna ChatGPT | Zasób stworzony dla projektu; brak zależnych licencji | Oddzielne koła |
| `pan-cebulek/flame-1.png`, `flame-2.png` | Własna ilustracja proceduralna ChatGPT | Jak wyżej | Klatki silnika |
| `pan-cebulek/luggage-1.png` … `luggage-4.png` | Własna ilustracja proceduralna ChatGPT | Jak wyżej | Pełne, niezależne nakładki 1–4 |
| `pan-cebulek/crash.png` | Własna ilustracja proceduralna ChatGPT | Jak wyżej | Komiczna stłuczka bez krwi |
| `pan-cebulek/portrait.png` | Własna ilustracja proceduralna ChatGPT | Jak wyżej | 384×384 z kolorowym tłem karty |
| `pan-cebulek/skin.json` | Dane projektowe ChatGPT | Materiał projektowy | Geometria @3x |
| `pani-cebulka/body.png`, `wheel.png` | Własna ilustracja proceduralna ChatGPT | Zasób stworzony dla projektu; brak zależnych licencji | Oddzielne koła |
| `pani-cebulka/flame-1.png`, `flame-2.png` | Własna ilustracja proceduralna ChatGPT | Jak wyżej | Klatki silnika |
| `pani-cebulka/luggage-1.png` … `luggage-4.png` | Własna ilustracja proceduralna ChatGPT | Jak wyżej | Pełne, niezależne nakładki 1–4 |
| `pani-cebulka/crash.png` | Własna ilustracja proceduralna ChatGPT | Jak wyżej | Komiczna stłuczka bez krwi |
| `pani-cebulka/portrait.png` | Własna ilustracja proceduralna ChatGPT | Jak wyżej | 384×384 z kolorowym tłem karty |
| `pani-cebulka/skin.json` | Dane projektowe ChatGPT | Materiał projektowy | Geometria @3x |
| `bus-kurierski/body.png`, `wheel.png` | Własna ilustracja proceduralna ChatGPT | Zasób stworzony dla projektu; brak zależnych licencji | Oddzielne koła |
| `bus-kurierski/flame-1.png`, `flame-2.png` | Własna ilustracja proceduralna ChatGPT | Jak wyżej | Klatki silnika |
| `bus-kurierski/luggage-1.png` … `luggage-4.png` | Własna ilustracja proceduralna ChatGPT | Jak wyżej | Pełne, niezależne nakładki 1–4 |
| `bus-kurierski/crash.png` | Własna ilustracja proceduralna ChatGPT | Jak wyżej | Komiczna stłuczka bez krwi |
| `bus-kurierski/portrait.png` | Własna ilustracja proceduralna ChatGPT | Jak wyżej | 384×384 z kolorowym tłem karty |
| `bus-kurierski/skin.json` | Dane projektowe ChatGPT | Materiał projektowy | Geometria @3x |
| `preview.png` | Kompozycja własnych sprite'ów w ChatGPT | Jak wyżej | Wszystkie pliki na szachownicy |

## Geometria i integracja

- `body.png`, `flame-*.png`, `luggage-1..4.png`, `crash.png`: 288×168 px, anchor (144,106).
- `wheel.png`: 36×36 px, anchor (18,18), środki kół (80,138) i (219,138) we współrzędnych pełnego płótna.
- `portrait.png`: 384×384 px z barwnym tłem i przezroczystymi narożnikami.
- Rysunek `body` w Canvas: `ctx.drawImage(img, -144/3, -106/3, 288/3, 168/3)` po `translate(PLAYER.x, game.y)`; koła i pozostałe warstwy analogicznie w skali 1/3.
- Hitbox z `src/core/config.ts` 40×20 logicznych pozostaje wspólny dla każdej skórki. Nakładki bagażu **zastępują** się nawzajem i nie mogą być dodawane jedna na drugą.
- W PR nie ma zmian w `src/core`, `src/render`, ani innych plikach koordynatora. Bus ma anonimowe biało-czerwone etykiety zamiast napisu na paczkach, by nie osadzać tekstu w grafikach.
'''
    top_doc = ASSETS / 'ASSETS.md'
    old_doc = top_doc.read_text(encoding='utf8') if top_doc.exists() else orig+'\n'+existing_main
    if '## Zlecenie 83' not in old_doc:
        top_doc.write_text(old_doc.rstrip()+'\n\n'+table.strip()+'\n',encoding='utf8')
    (PREVIEWS/'ASSETS.md').write_text('''# Podglądy Ligi Polonii (zlecenie 60)

| Plik | Źródło / narzędzie | Licencja | Autor / uwagi |
| --- | --- | --- | --- |
| `liga-2026-W50-post.png` | Własny HTML/CSS + Chromium (Playwright), dane mock | Oryginalne opracowanie projektu | Demo do weryfikacji układu; grafika wykorzystuje logo i flagi z public/assets/ w repozytorium (wersja PR); lokalny wariant kontrolny używa symboli zastępczych |
| `liga-2026-W50-rolka.png` | Własny HTML/CSS + Chromium (Playwright), dane mock | Oryginalne opracowanie projektu | Okładka DEMO, 1080×1920, bez prawdziwych wyników |
| `liga-2026-W50-teksty.md` | Własny generator, dane mock | Oryginalne opracowanie projektu | Osiem krajowych tekstów próbnych, nie do publikacji |

## Zlecenie 83

| Plik | Źródło / narzędzie | Licencja | Autor / uwagi |
| --- | --- | --- | --- |
| `auta-83.png` | Kompozycja wykonanych PNG w Pillow | Utworzony dla projektu | 2 auta × 5 stanów, PNG RGBA sRGB |
| `auta-83-koncepcja.png` | ChatGPT Images | Wygenerowany dla projektu | Referencyjny arkusz koncepcyjny; nie do runtime |
| `auta-83-generator.py` | ChatGPT / Python + SVG + CairoSVG + Pillow | Materiał projektu | Reprodukowanie sprite'ów i podglądu |
''',encoding='utf8')


def main():
    for ident,kind,name,rear,front in [
      ('mala-japonka','red','Mała Japonka',90,217),
      ('dieselek-dziadka','silver','Dieselek po dziadku',77,229)]:
        folder=ASSETS/ident
        to_png(body_red() if kind=='red' else body_silver(),folder/'body.png')
        w=V(36,36);wheel_svg(w);to_png(w,folder/'wheel.png')
        to_png(crash(kind),folder/'crash.png')
        for frame in (1,2): to_png(flame(kind,frame),folder/f'flame-{frame}.png')
        for level in (1,2,3,4): to_png(luggage(kind,level),folder/f'luggage-{level}.png')
        save_png(portrait(kind),folder/'portrait.png')
        (folder/'skin.json').write_text(json.dumps(manifest(ident,name,rear,front),ensure_ascii=False,indent=2)+'\n',encoding='utf8')
    draw_preview()
    write_docs()
    print('Generated assets:',len(list(ROOT.rglob('*.png'))),'PNG;',len(list(ROOT.rglob('*.json'))),'JSON')

if __name__=='__main__': main()
