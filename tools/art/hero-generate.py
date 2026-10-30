#!/usr/bin/env python3
"""Autorski generator ilustracyjnych sprite'ow bohatera Cebulak Express.

Wymaga poza projektem gry: Python 3, cairosvg, Pillow. Nie jest uruchamiany
podczas budowania aplikacji i nie dodaje zadnych zaleznosci npm.
"""
from __future__ import annotations

import io
import json
import math
import struct
from pathlib import Path
from xml.sax.saxutils import escape

import cairosvg
from PIL import Image, ImageDraw, ImageFont, PngImagePlugin

OUT = Path(__file__).resolve().parent
W, H = 288, 168
ANCHOR = (144, 90)
DARK = '#303039'
LINE = '#382d35'

DEFS = r'''
<defs>
  <linearGradient id="cream" x1="0" y1="0" x2=".24" y2="1"><stop stop-color="#fff9e5"/><stop offset=".53" stop-color="#f7dfad"/><stop offset="1" stop-color="#dba879"/></linearGradient>
  <linearGradient id="berry" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#ed6b4f"/><stop offset=".53" stop-color="#c94e41"/><stop offset="1" stop-color="#9a3135"/></linearGradient>
  <linearGradient id="glass" x1="0" y1="0" x2=".7" y2="1"><stop stop-color="#d8f5f6"/><stop offset=".43" stop-color="#91d1d9"/><stop offset="1" stop-color="#3d7b96"/></linearGradient>
  <linearGradient id="blue" x1="0" y1="0" x2=".8" y2="1"><stop stop-color="#78cfe0"/><stop offset=".5" stop-color="#3082a9"/><stop offset="1" stop-color="#175076"/></linearGradient>
  <linearGradient id="green" x1="0" y1="0" x2=".6" y2="1"><stop stop-color="#9bbc63"/><stop offset="1" stop-color="#446b43"/></linearGradient>
  <linearGradient id="orange" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#ffcc68"/><stop offset="1" stop-color="#d16a2e"/></linearGradient>
  <radialGradient id="tire"><stop stop-color="#6b6973"/><stop offset=".55" stop-color="#2f313d"/><stop offset="1" stop-color="#161923"/></radialGradient>
  <linearGradient id="hub" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#f4eeda"/><stop offset=".5" stop-color="#a0b2b6"/><stop offset="1" stop-color="#64747f"/></linearGradient>
  <clipPath id="driverWindow"><path d="M170 72 L192 73 Q200 75 206 88 L209 102 L171 102 Z"/></clipPath>
  <mask id="wheelCut"><rect width="288" height="168" fill="white"/><circle cx="91" cy="133" r="21" fill="black"/><circle cx="207" cy="133" r="21" fill="black"/></mask>
  <pattern id="check" width="10" height="10" patternUnits="userSpaceOnUse"><rect width="10" height="10" fill="#427da5"/><rect width="5" height="5" fill="#acc9db" opacity=".92"/><rect x="5" y="5" width="5" height="5" fill="#acc9db" opacity=".92"/><path d="M5 0V10M0 5H10" stroke="#284b73" stroke-width="1"/></pattern>
</defs>
'''

def svg(*parts: str) -> str:
    return '<svg xmlns="http://www.w3.org/2000/svg" width="288" height="168" viewBox="0 0 288 168">' + DEFS + ''.join(parts) + '</svg>'

def g(content: str, **kwargs: str) -> str:
    return '<g ' + ' '.join(f'{k.replace("_","-")}="{v}"' for k, v in kwargs.items()) + '>' + content + '</g>'

def path(d: str, fill: str='none', stroke: str=LINE, sw: float=3.5, extra: str='') -> str:
    return f'<path d="{d}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round" {extra}/>'

def rect(x: float, y: float, w: float, h: float, fill: str, r: float=0, stroke: str=LINE, sw: float=2.5) -> str:
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"/>'

def circle(x: float, y: float, rad: float, fill: str, stroke: str=LINE, sw: float=2.5) -> str:
    return f'<circle cx="{x}" cy="{y}" r="{rad}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"/>'

def driver(face: str='normal') -> str:
    """Czlowiek, bez karykatury. Wyjatek: mimika po znalezieniu bonusu/kolizji."""
    parts = [
      path('M167 109 Q167 101 174 97 L186 94 Q201 95 204 106 L206 111 Z', '#4d9d69', sw=2.5),
      path('M181 96 Q190 101 197 95', stroke='#245c42', sw=2),
      circle(186.4, 86.1, 12.6, '#f3b77d', sw=2.8),
      path('M175 84 Q172 74 180 72 Q184 66 191 71 Q201 70 199 79 L198 80 Q192 76 188 76 Q182 81 176 81 Z', '#543b35', sw=2.6),
      path('M180 74 Q188 68 194 75', stroke='#8c5e45', sw=2),
      path('M173 85 Q170 87 173 91', stroke='#ae7656', sw=2),
    ]
    if face == 'happy':
        parts += [circle(184,85,2.8,'#fffdf7',sw=0),circle(194,85,2.8,'#fffdf7',sw=0),circle(184.5,85.4,1.2,DARK,sw=0),circle(194.5,85.4,1.2,DARK,sw=0),path('M181 92 Q189 102 198 91 Q190 96 181 92 Z','#873e3e',sw=1.5),path('M184 94 Q189 97 194 94',stroke='#fff0d0',sw=2)]
    elif face == 'scared':
        parts += [path('M179 81 L186 78',stroke='#563434',sw=2),path('M191 78 L198 82',stroke='#563434',sw=2),circle(184,85,3.8,'#fffdf7',sw=.9),circle(194,85,3.8,'#fffdf7',sw=.9),circle(184.5,85.8,1.7,DARK,sw=0),circle(194.2,85.8,1.7,DARK,sw=0),path('M188 94 Q190 90 193 94 Q194 100 190 100 Q186 98 188 94 Z','#5d3035',sw=1.5)]
    else:
        parts += [path('M182 85 Q184 83 186 85',stroke='#443333',sw=1.8),path('M192 85 Q194 83 196 85',stroke='#443333',sw=1.8),path('M184 93 Q190 98 196 92',stroke='#7f4841',sw=2)]
    parts.append(path('M177 106 Q178 101 184 100 Q189 100 192 107',stroke='#24634e',sw=2.4))
    return ''.join(parts)

def side_windows(face: str='normal') -> str:
    return ''.join([
        path('M58 97 L65 77 Q68 72 75 71 L96 71 L96 99 Z','url(#glass)',sw=3.6),
        path('M101 71 L135 71 L135 100 L100 100 Z','url(#glass)',sw=3.6),
        path('M139 71 L166 71 L167 101 L139 100 Z','url(#glass)',sw=3.6),
        path('M170 72 L192 73 Q200 75 206 88 L209 102 L171 102 Z','url(#glass)',sw=3.6),
        path('M204 76 Q212 84 219 101 L215 102 Q205 92 199 79 Z', '#b1e2e6',sw=3.6),
        g(driver(face), clip_path='url(#driverWindow)'),
        path('M65 91 L77 75 L82 75 L65 98',fill='#f7ffff',stroke='none',sw=0,extra='opacity="0.55"'),
        path('M104 93 L122 74 L128 74 L108 97',fill='#fffbe5',stroke='none',sw=0,extra='opacity="0.27"'),
        path('M141 94 L160 74 L164 74 L145 98',fill='#fffdec',stroke='none',sw=0,extra='opacity="0.28"'),
        path('M172 95 L190 74 L196 75 L177 101',fill='#fffaf1',stroke='none',sw=0,extra='opacity="0.34"'),
    ])

def car(face: str='normal', crash: bool=False) -> str:
    e=[]
    e.append(path('M35 122 L26 122 L23 127 L32 131', '#55515b',sw=2.5))
    e.append(path('M27 123 L27 130 L37 131',stroke='#24262a',sw=3.3))
    e.append(path('M57 61 L191 61',stroke='#4d5254',sw=7))
    e.append(path('M55 58 L191 58',stroke='#cdd4ca',sw=3.5))
    e.append(path('M65 59 L65 67 M185 59 L185 67',stroke='#4e5662',sw=3))
    caroutline='M35 107 Q35 95 43 92 L54 88 L63 70 Q67 61 79 61 L185 62 Q204 65 216 91 L236 96 Q252 99 254 111 L254 125 Q252 136 238 137 L48 137 Q35 134 35 120 Z'
    if crash:
        caroutline='M35 109 Q35 95 44 91 L54 88 L63 71 Q67 61 80 61 L184 62 Q203 67 214 91 L229 94 L238 103 L231 111 L245 116 L231 126 L235 136 L48 138 Q35 135 35 122 Z'
    e.append(f'<path d="{caroutline}" fill="url(#cream)" stroke="{LINE}" stroke-width="5" stroke-linejoin="round" mask="url(#wheelCut)"/>')
    e.append(path('M36 112 Q73 113 100 114 Q163 115 237 114 L253 114 L252 129 Q244 136 236 137 L47 137 Q37 135 35 124 Z','url(#berry)',stroke='none',sw=0,extra='mask="url(#wheelCut)"'))
    e.append(path('M42 113 L252 114',stroke='#fff7d7',sw=3))
    e.append(path('M42 121 L251 122',stroke='#f6a975',sw=2))
    e.append(path('M43 132 L58 133 M119 135 L179 135 M229 135 L243 133',stroke='#6d3341',sw=4))
    e.append(side_windows(face))
    e.append(path('M97 68 L98 103 M136 68 L137 103 M169 69 L170 105',stroke='#473840',sw=4))
    e.append(path('M101 109 L101 129 M169 109 L169 132',stroke='#8f5b58',sw=2))
    e.append(path('M111 111 L126 111 M177 111 L192 111',stroke='#37343b',sw=3))
    e.append(path('M113 111 L123 111 M179 111 L189 111',stroke='#fff5c5',sw=1.3))
    e.append(path('M65 105 L69 104 M142 105 L147 104',stroke='#d3a679',sw=2))
    e.append(rect(199,99,16,6,'#c65a43',3,sw=2.5))
    e.append(path('M214 104 L220 107 L217 110',stroke='#f4ddaf',sw=2))
    e.append(path('M41 105 L46 104 L46 117 L39 117 Z','#ffb277',sw=2))
    e.append(path('M41 107 L44 106 L44 112 L41 112 Z','#ffeb98',sw=1))
    if not crash:
        e.append(path('M234 100 Q248 101 254 111 L254 123 L245 122 L243 109 Z','#efc88f',sw=3))
        e.append(path('M243 107 Q249 105 252 111 Q253 117 247 119 Q242 119 242 113 Z','#ffe69a',sw=2))
        e.append(path('M249 121 L258 121 L260 126 Q257 134 250 134 L241 131','#53535c',sw=3))
        e.append(path('M237 123 L245 125 M237 129 L244 130',stroke='#453d42',sw=2.5))
    else:
        e.append(path('M226 96 L240 98 L234 105 L244 110 L229 115 L242 121 L226 133 L218 120 L226 115 L214 105 Z','#b7886b',sw=3.4))
        e.append(path('M235 110 L246 112 L240 122 L228 124',stroke='#52343c',sw=3))
        e.append(path('M223 128 Q234 125 243 139 L232 145 L219 140','#7e7e7d',sw=3))
        e.append(path('M215 94 L234 86 L245 90',stroke='#5d4545',sw=2.7))
    # Zdobienie boku to abstrakcyjny, nieidentyfikujacy model motyw.
    e.append(path('M130 122 Q145 125 159 122',stroke='#ffdf94',sw=2.5))
    e.append(path('M82 64 L175 64',stroke='#fff8df',sw=2))
    # Nadkola musza pozostac przezroczyste dla osobnych, animowanych kol.
    for wx in (91,207):
        e.append(path(f'M{wx-23} 135 A23 23 0 0 1 {wx+23} 135',stroke='#513e42',sw=5))
        e.append(path(f'M{wx-22} 135 A22 22 0 0 1 {wx+22} 135',stroke='#f3a36f',sw=2))
    return ''.join(e)

def wheel_svg() -> str:
    parts=[circle(18,18,17,'url(#tire)',stroke='#1d1d25',sw=2),circle(18,18,13,'#353640',stroke='#6e7480',sw=2),circle(18,18,10.3,'url(#hub)',stroke='#c5c7c0',sw=1.3)]
    for angle in range(0,360,60):
        a=math.radians(angle)
        x=18+6.5*math.cos(a);y=18+6.5*math.sin(a)
        parts.append(circle(round(x,2),round(y,2),1.9,'#4d616c',sw=.5))
    parts.append(circle(18,18,4.2,'#d9d8c8',stroke='#687e8a',sw=1.3))
    parts.append(path('M7 7 Q4 12 4 18',stroke='#9b9d96',sw=1.4))
    parts.append(path('M24 5 L27 8 M5 25 L8 28 M25 28 L28 25',stroke='#a4a6a5',sw=1.3))
    return '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">'+DEFS+''.join(parts)+'</svg>'

def straps() -> str:
    return ''.join([
        path('M59 58 L199 60',stroke='#3b3334',sw=4),
        path('M59 56 L198 58',stroke='#d6c9aa',sw=2),
        path('M81 40 L76 60 M161 35 L174 61',stroke='#b97837',sw=3.5),
        path('M82 39 L77 59 M162 35 L174 59',stroke='#f7d98a',sw=1.3),
        circle(76,60,3.4,'#e6b95f',sw=1.5),circle(174,60,3.4,'#e6b95f',sw=1.5)
    ])

def base_luggage() -> str:
    return ''.join([
      path('M70 54 Q67 42 76 38 Q89 33 103 38 Q110 41 110 54 L106 61 L71 60 Z','url(#green)',sw=3.5),
      path('M83 38 Q83 33 91 35 Q96 35 98 39',stroke='#304b38',sw=3),
      path('M75 45 Q89 39 104 46',stroke='#b0c878',sw=1.8),
      path('M80 46 L78 59 M101 46 L103 59',stroke='#394f36',sw=2.3),
      path('M111 48 Q110 39 117 39 L146 38 Q153 39 153 48 L153 59 L111 60 Z','url(#check)',sw=3.7),
      path('M122 40 Q120 33 129 33 Q138 34 140 40',stroke='#765235',sw=3.7),
      path('M118 52 L146 52',stroke='#ffe7c2',sw=2),
      rect(154,38,34,24,'url(#orange)',4,sw=3.7),
      path('M161 39 L161 61 M183 40 L183 62',stroke='#9c5839',sw=2),
      rect(164,36,13,4,'#ad6333',r=2,stroke='#714739',sw=1.5),
      path('M70 59 Q132 63 192 59',stroke='#332e33',sw=4),
    ])

def second_luggage() -> str:
    return ''.join([
      rect(99,23,44,22,'#b97946',4,sw=3.2),
      path('M107 24 L107 43 M135 24 L135 43',stroke='#f3b963',sw=3),
      rect(116,20,13,5,'#604c46',3,sw=2),
      rect(148,26,31,25,'#d74741',5,sw=3.3),
      path('M155 29 L155 49 M170 29 L170 49',stroke='#f7a17a',sw=2),
      path('M157 27 Q158 20 163 20 Q169 21 170 27',stroke='#a63935',sw=3),
      path('M98 24 L139 23',stroke='#f8cd78',sw=2),
    ])

def third_luggage() -> str:
    return ''.join([
      path('M66 30 Q60 22 68 18 Q82 15 103 19 L106 30 Z','#5b8668',sw=3.3),
      path('M72 19 L72 29 M87 18 L90 29',stroke='#284f46',sw=2.3),
      path('M111 15 L138 12 L141 32 L112 34 Z','#cf9950',sw=3.4),
      path('M125 14 L126 33 M112 19 L141 18',stroke='#f6cd82',sw=2.8),
      path('M145 22 Q150 13 169 13 Q183 16 185 26 L179 35 L146 35 Z','url(#blue)',sw=3.2),
      path('M153 19 L153 34 M171 17 L171 33',stroke='#1c4e6d',sw=2.8),
      circle(183,13,9.8,'#f6f2df',sw=2.2),
      path('M183 6 L190 10 L187 17 L178 18 L175 11 Z','#3c3e41',sw=0),
      path('M179 5 L175 8 M190 11 L192 17',stroke='#383c41',sw=1.8)
    ])

def fourth_luggage() -> str:
    return ''.join([
        rect(105,1,26,17,'#e0ae59',3,sw=3),
        path('M113 2 L113 16 M125 2 L125 16',stroke='#b17e39',sw=2),
        path('M137 5 Q139 -1 145 1 L158 4 L161 24 L139 25 Z','#cf4c40',sw=3),
        path('M144 5 L144 21 M155 7 L155 21',stroke='#ff9a73',sw=1.8),
        path('M139 4 Q142 -3 152 2',stroke='#513a3d',sw=2.5),
        circle(76,10,10.2,'#f3f1e6',sw=2.6),
        path('M73 3 L81 6 L82 13 L75 18 L69 12 Z','#3c4347',sw=0),
        path('M163 10 Q161 4 171 3 L187 5 Q194 9 190 17 L170 18 Z','#3684a6',sw=3.1),
        path('M172 3 L172 18 M180 4 L181 18',stroke='#1e5271',sw=2),
        path('M62 20 L76 45 M135 3 L170 56',stroke='#d1a35a',sw=2.8),
        path('M61 20 L76 45 M135 3 L170 56',stroke='#f4e1a9',sw=.8)
    ])

def luggage(level:int) -> str:
    pieces=[base_luggage()]
    if level>=2: pieces.append(second_luggage())
    if level>=3: pieces.append(third_luggage())
    if level>=4: pieces.append(fourth_luggage())
    pieces.append(straps())
    # Osobne warstwy maja z definicji IDENTYCZNE polozenie i kotwice.
    return svg(g(''.join(pieces), transform=('rotate(-2 135 61)' if level==4 else 'translate(0 0)')))

def flame(frame:int) -> str:
    if frame==1:
        outer='M36 120 Q25 111 21 116 L14 114 L20 121 L4 122 L16 129 L9 135 L25 132 Q29 137 38 127 Z'
        inner='M36 121 L24 119 L27 124 L17 125 L26 127 L23 131 L37 127 Z'
        sparks=[circle(8,115,1.8,'#ffe69a',sw=0),circle(15,139,1.6,'#ff9544',sw=0)]
    else:
        outer='M37 121 Q26 108 19 115 Q15 109 8 107 L13 117 L0 116 L10 124 L3 131 L21 131 L14 140 Q29 136 38 129 Z'
        inner='M37 122 L19 116 L25 123 L11 122 L20 127 L13 132 L35 128 Z'
        sparks=[circle(4,145,1.8,'#ffab58',sw=0),circle(20,107,2,'#ffda75',sw=0),circle(2,108,1.6,'#ff9544',sw=0)]
    return svg(''.join([
      circle(19,127,8,'#d0b1a5',stroke='none',sw=0),
      circle(13,121,5.5,'#e6cabc',stroke='none',sw=0),
      path(outer,'#f16a35',sw=3),
      path(inner,'#ffdf62',stroke='#ffb949',sw=1.5),
      path('M37 122 L32 127 L37 130',fill='#fff5c1',stroke='none',sw=0),
      *sparks]))

def crash_svg() -> str:
    flying = ''.join([
        g(rect(130,19,30,23,'#e2a04a',3,sw=3),transform='rotate(16 144 29)'),
        g(rect(153,1,32,22,'#5288b9',3,sw=3),transform='rotate(27 165 12)'),
        g(path('M87 28 Q97 14 114 21 L110 40 L91 41 Z','#69a079',sw=3), transform='rotate(-30 100 31)'),
        g(rect(66,7,22,19,'#d44c3f',3,sw=3),transform='rotate(-22 77 17)'),
        path('M113 12 L115 6 M155 38 L159 47 M87 7 L84 3',stroke='#ebc180',sw=2),
        path('M263 67 L268 76 L279 78 L270 85 L271 96 L261 89 L251 94 L253 83 L244 77 L256 76 Z','#ffd057',stroke='#be6f34',sw=2.6),
        path('M238 53 L242 60 L251 62 L244 67 L244 75 L237 70 L231 73 L233 65 L226 61 L235 60 Z','#ffe57a',stroke='#ca7a3e',sw=2),
        path('M258 107 L273 102 M257 116 L274 119 M240 144 L254 152',stroke='#e5c66e',sw=2.2)
    ])
    # Przy kolizji auto jest osobnym, kompletnym sprite'em, z kolami.
    # Narysuj kola w niewielkim skosie, karoserie i ugięty przod.
    return svg(''.join([
        g(wheel_svg().split('</defs>')[-1].split('</svg>')[0],transform='translate(72 113) rotate(-18 18 18)'),
        g(wheel_svg().split('</defs>')[-1].split('</svg>')[0],transform='translate(185 115) rotate(23 18 18)'),
        car('scared',crash=True),
        flying,
        path('M223 94 Q233 82 244 90 L240 99 M215 109 L224 113',stroke='#b0423c',sw=3.2)
    ]))

def reaction(face:str) -> str:
    # Okno: nadruk calego wnetrza, bez zmian w szkieletowych slupkach.
    return svg(''.join([
        g(path('M170 73 L192 73 Q200 75 206 88 L208 101 L171 101 Z','url(#glass)',stroke='none',sw=0) + driver(face) + path('M172 94 L192 74 L197 76 L178 101',fill='#fffce8',stroke='none',sw=0,extra='opacity=".28"'),clip_path='url(#driverWindow)')
    ]))

def save_png(filename: str, xml: str, size: tuple[int,int]=(W,H)) -> None:
    raw = cairosvg.svg2png(bytestring=xml.encode('utf8'),output_width=size[0],output_height=size[1])
    im=Image.open(io.BytesIO(raw)).convert('RGBA')
    # CairoSVG nie obsluguje maski alpha SVG; wycinamy otwory nadkoli z
    # antyaliasingiem w Pillow, bez modyfikacji geometrii pozostalych elementow.
    if filename in ('kombi-body.png','kombi-crash.png'):
        scale=4
        cut=Image.new('L',(W*scale,H*scale),0)
        cd=ImageDraw.Draw(cut)
        for wx in (91,207):
            r=19.3
            cd.ellipse((round((wx-r)*scale),round((133-r)*scale),round((wx+r)*scale),round((133+r)*scale)),fill=255)
        cut=cut.resize((W,H),Image.Resampling.LANCZOS)
        alpha=im.getchannel('A')
        # Niezaklocona kompozycja: bezbarwne przezroczyste nadkola.
        alpha=Image.eval(alpha,lambda v:v)
        from PIL import ImageChops
        alpha=ImageChops.multiply(alpha,ImageChops.invert(cut))
        im.putalpha(alpha)
        if filename == 'kombi-crash.png':
            base=Image.new('RGBA',(W,H),(0,0,0,0))
            wheel=Image.open(OUT/'kombi-wheel.png').convert('RGBA')
            for cx,cy,ang in [(91,133,16),(207,133,-21)]:
                rotated=wheel.rotate(ang,Image.Resampling.BICUBIC,expand=False)
                base.alpha_composite(rotated,(cx-18,cy-18))
            base.alpha_composite(im)
            im=base
    # Profil sRGB + bezstratna optymalizacja. Brak zmian alpha w kanale.
    pnginfo = PngImagePlugin.PngInfo()
    pnginfo.add(b'sRGB', bytes([0]))
    pnginfo.add(b'gAMA', struct.pack('>I',45455))
    # 128 kolorow z zachowana tabela alfa: przy @3x brak widocznej degradacji.
    indexed=im.quantize(colors=128,method=Image.Quantize.FASTOCTREE,dither=Image.Dither.NONE)
    indexed.save(OUT/filename,'PNG',optimize=True,compress_level=9,pnginfo=pnginfo)


def checkerboard(w:int,h:int,tile:int=16) -> Image.Image:
    im=Image.new('RGB',(w,h),'#ffffff');d=ImageDraw.Draw(im)
    for y in range(0,h,tile):
        for x in range(0,w,tile):
            d.rectangle((x,y,x+tile-1,y+tile-1),fill=('#e7eaf0' if (x//tile+y//tile)%2==0 else '#ffffff'))
    return im

def get_font(size:int,bold=False):
    for name in (['/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf','/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf'] if bold else ['/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf','/usr/share/fonts/truetype/liberation2/LiberationSans-Regular.ttf']):
        if Path(name).exists():return ImageFont.truetype(name,size)
    return ImageFont.load_default()

def make_preview() -> None:
    # Podglad na szachownicy z czterema stanami i testem wielkosci w grze.
    colW=340; pad=24
    preview=Image.new('RGB',(1450,1090),'#eaf1f3')
    d=ImageDraw.Draw(preview)
    title=get_font(27,True);label=get_font(19,True);sub=get_font(14)
    d.text((42,18),'BOHATER / KOMBI',font=title,fill='#33394a')
    d.text((42,59),'Sprite sheet  @3x  /  kotwica (144, 90)  /  pliki z przezroczystoscia',font=sub,fill='#566073')
    def panel(x:int,y:int,w:int,h:int,titleText:str,composite:tuple[str,...],scale:float=1.0):
        d.rounded_rectangle((x-4,y-4,x+w+4,y+h+4),radius=13,fill='#fdfdfd',outline='#c6d2d5',width=2)
        bg=checkerboard(w,h)
        layer=Image.new('RGBA',(288,168),(0,0,0,0))
        for name in composite:
            if name.startswith('kombi-wheel@'):
                _, coords = name.split('@'); cx, cy=map(int, coords.split(','))
                wheel=Image.open(OUT/'kombi-wheel.png').convert('RGBA')
                layer.alpha_composite(wheel,(cx-18,cy-18))
            else: layer.alpha_composite(Image.open(OUT/name).convert('RGBA'))
        if scale!=1.0:layer=layer.resize((int(288*scale),int(168*scale)),Image.Resampling.LANCZOS)
        px=(w-layer.width)//2;py=(h-layer.height)//2
        bg.paste(layer,(px,py),layer)
        preview.paste(bg,(x,y))
        d.text((x+8,y+h+12),titleText,font=label,fill='#303946')
    wheels=('kombi-wheel@91,133','kombi-wheel@207,133')
    for i in range(4):
        comp=('kombi-flame-'+str(i%2+1)+'.png',*wheels,'kombi-body.png',f'luggage-{i+1}.png')
        panel(32+i*355,104,324,198,f'BAGAZ {i+1}',comp)
    panel(32,376,324,198,'KAROSERIA',(*wheels,'kombi-body.png'))
    panel(387,376,324,198,'KOLIZJA / CRASH',('kombi-crash.png',))
    panel(742,376,324,198,'REAKCJA 1 / RADOSC',(*wheels,'kombi-body.png','driver-react-1.png'))
    panel(1097,376,324,198,'REAKCJA 2 / STRACH',(*wheels,'kombi-body.png','driver-react-2.png'))
    # Wiersz izolowanych elementow.
    panel(32,645,324,169,'KOLO 36 x 36',('kombi-wheel@91,133',))
    panel(387,645,324,169,'PŁOMIEŃ / 1',('kombi-flame-1.png',))
    panel(742,645,324,169,'PŁOMIEŃ / 2',('kombi-flame-2.png',))
    panel(1097,645,324,169,'KOMPONENTY @3x',('luggage-4.png',))
    # Test rozmiaru: auto finalne ma ~72 logiczne szerokosci, pokazane 1:1 na tle nieba.
    d.rounded_rectangle((28,913,1422,1065),radius=14,fill='#c2e6f5',outline='#7a9fb2',width=2)
    d.ellipse((80,929,190,1001),fill='#fdf5cf')
    d.text((275,926),'TEST MINIATURY / 72x44 px LOGICZNE',font=label,fill='#385266')
    for i in range(4):
        cx=310+i*260
        layer=Image.new('RGBA',(288,168),(0,0,0,0))
        for name in (f'kombi-flame-{i%2+1}.png',):layer.alpha_composite(Image.open(OUT/name).convert('RGBA'))
        wheel=Image.open(OUT/'kombi-wheel.png').convert('RGBA')
        for wx in (91,207):layer.alpha_composite(wheel,(wx-18,133-18))
        for name in ('kombi-body.png',f'luggage-{i+1}.png'):layer.alpha_composite(Image.open(OUT/name).convert('RGBA'))
        resized=layer.resize((96,56),Image.Resampling.LANCZOS)
        preview.paste(resized,(cx,976),resized)
    preview=preview.quantize(colors=96,method=Image.Quantize.FASTOCTREE,dither=Image.Dither.NONE)
    preview.save(OUT/'preview.png',optimize=True)


def make_manifest():
    entries = {
        'kombi-body': {'file':'kombi-body.png','anchorX':144,'anchorY':90,'width':288,'height':168},
        'kombi-wheel': {'file':'kombi-wheel.png','anchorX':18,'anchorY':18,'width':36,'height':36},
    }
    for name in ('kombi-flame-1','kombi-flame-2', 'luggage-1','luggage-2','luggage-3','luggage-4','kombi-crash','driver-react-1','driver-react-2'):
        entries[name]={'file':f'{name}.png','anchorX':144,'anchorY':90,'width':288,'height':168}
    entries['meta']={
      'scale':3,'unit':'physical pixels @3x','worldLogicalWidth':360,'worldLogicalHeight':640,
      'playerHitboxLogical': {'width':40,'height':20},
      'commonAnchor':{'x':144,'y':90},
      'wheelCenters': [{'x':91,'y':133},{'x':207,'y':133}],
      'wheelOffsetFromAnchorPx':[{'x':-53,'y':43},{'x':63,'y':43}],
      'front':'right',
      'drawOrder':['kombi-flame-X','kombi-wheel (2x)','kombi-body','luggage-X','driver-react-X (optional)']
    }
    (OUT/'hero.json').write_text(json.dumps(entries,ensure_ascii=False,indent=2)+'\n',encoding='utf8')


def main():
    save_png('kombi-body.png', svg(car()))
    save_png('kombi-wheel.png',wheel_svg(),size=(36,36))
    for i in (1,2): save_png(f'kombi-flame-{i}.png',flame(i))
    for i in (1,2,3,4): save_png(f'luggage-{i}.png',luggage(i))
    save_png('kombi-crash.png',crash_svg())
    for i,face in ((1,'happy'),(2,'scared')):save_png(f'driver-react-{i}.png',reaction(face))
    make_manifest()
    make_preview()
    print('\n'.join(f'{p.name:22s} {p.stat().st_size:7d} B' for p in sorted(OUT.glob('*.png'))))

if __name__=='__main__': main()
