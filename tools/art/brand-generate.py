#!/usr/bin/env python3
"""Oryginalne grafiki marki Cebulak Express. Uruchom: python generate.py.

Wymagane: pillow, cairosvg, fonttools. Font: Inter Display Black (lub Inter Black).
Generator nie modyfikuje plikow poza katalogiem brand.
"""
from __future__ import annotations
import io, math, os, glob, random, subprocess, textwrap
from pathlib import Path
from html import escape
from PIL import Image, ImageDraw, ImageFont, ImageOps
import cairosvg
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen

DIR=Path(__file__).resolve().parent
GREEN='#14654f'; DEEP='#173c39'; INK='#16323d'; GOLD='#ffbd37'; RED='#cf2e37'; CREAM='#fff9e9'
random.seed(10)

# Font zamieniamy na krzywe SVG (plikow czcionek nie dolaczamy).
FONTPATH=next((p for p in [
 '/usr/share/fonts/opentype/inter/InterDisplay-Black.otf',
 '/usr/share/fonts/opentype/inter/Inter-Black.otf',
 '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'] if os.path.exists(p)), None)
if not FONTPATH:
 FONTPATH=subprocess.check_output(['fc-match','-f','%{file}','Inter Display:style=Black'],text=True).strip()
FONT=TTFont(FONTPATH)
FONTS=FONT.getGlyphSet(); CMAP=FONT.getBestCmap(); HMTX=FONT['hmtx']; UPM=FONT['head'].unitsPerEm

def glyph_path(s: str, x: float, baseline: float, font_size: float, tracking: float=0):
 scale=font_size/UPM; cur=x; segments=[]
 for ch in s:
  gn=CMAP.get(ord(ch),'.notdef'); g=FONTS[gn]; pen=SVGPathPen(FONTS); g.draw(pen)
  d=pen.getCommands()
  if d: segments.append(f'<path d="{d}" transform="translate({cur:.3f} {baseline:.3f}) scale({scale:.7f} {-scale:.7f})"/>')
  cur+=HMTX[gn][0]*scale+tracking
 return ''.join(segments),cur-x

def txt(s,x,baseline,size,fill,stroke=INK,sw=13,tracking=0,shadow=0,attrs=''):
 p,w=glyph_path(s,x,baseline,size,tracking)
 body=f'<g fill="{fill}" stroke="{stroke}" stroke-width="{sw}" stroke-linejoin="round" paint-order="stroke" {attrs}>{p}</g>'
 if shadow:
  return f'<g transform="translate({shadow} {shadow*1.4})" opacity=".5"><g fill="{INK}" stroke="{INK}" stroke-width="{sw+2}" stroke-linejoin="round">{p}</g></g>'+body,w
 return body,w

def svg_root(w,h,body,defs='',viewbox=None):
 vb=viewbox or f'0 0 {w} {h}'
 return f'''<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{w}" height="{h}" viewBox="{vb}" shape-rendering="geometricPrecision"><defs>
 <linearGradient id="sign" x2="0" y2="1"><stop stop-color="#228967"/><stop offset=".63" stop-color="#14674e"/><stop offset="1" stop-color="#0e4a3d"/></linearGradient>
 <linearGradient id="sky" x2="0" y2="1"><stop stop-color="#259cd9"/><stop offset=".55" stop-color="#67c7ed"/><stop offset="1" stop-color="#ffe2a2"/></linearGradient>
 <radialGradient id="sun-glow"><stop stop-color="#fffddd" stop-opacity=".93"/><stop offset=".38" stop-color="#ffe276" stop-opacity=".56"/><stop offset="1" stop-color="#fff6b3" stop-opacity="0"/></radialGradient>
 <linearGradient id="carblue" x2=".18" y2="1"><stop stop-color="#6bd6ef"/><stop offset=".34" stop-color="#2594bd"/><stop offset="1" stop-color="#0a4f7f"/></linearGradient>
 <linearGradient id="glass" x2="0" y2="1"><stop stop-color="#e9ffff"/><stop offset="1" stop-color="#64bada"/></linearGradient>
 <linearGradient id="roofcase" x2="0" y2="1"><stop stop-color="#ffcb62"/><stop offset="1" stop-color="#de7434"/></linearGradient>
 <linearGradient id="road" x2="0" y2="1"><stop stop-color="#6f7376"/><stop offset="1" stop-color="#394b52"/></linearGradient>
 <linearGradient id="gold" x2="0" y2="1"><stop stop-color="#ffe591"/><stop offset=".45" stop-color="#fbbb34"/><stop offset="1" stop-color="#d77b21"/></linearGradient>
 {defs}</defs>{body}</svg>'''

def onion(cx=0,cy=0,scale=1):
 return f'''<g transform="translate({cx} {cy}) scale({scale})" stroke-linejoin="round" stroke-linecap="round">
  <path d="M-9 -79 Q-16 -113 -39 -135 Q-15 -130 0 -111 Q19 -140 43 -152 Q32 -116 12 -82" fill="#70ad46" stroke="{INK}" stroke-width="9"/>
  <path d="M-30 -88 Q-14 -115 -7 -137 M13 -89 Q9 -120 24 -146" fill="none" stroke="#406e39" stroke-width="7"/>
  <path d="M-14 -80 C-25 -58 -64 -41 -69 3 C-79 77 -41 121 7 125 C65 117 77 73 66 13 C59 -28 32 -54 14 -80 Q6 -96 -14 -80Z" fill="url(#gold)" stroke="{INK}" stroke-width="10"/>
  <path d="M-20 -59 C-55 -7 -55 57 -25 95 M0 -62 C-20 -2 -18 75 3 112 M24 -52 C49 -1 54 70 25 102" fill="none" stroke="#d58127" stroke-opacity=".72" stroke-width="6"/>
  <path d="M-44 -5 Q-42 -39 -22 -55" fill="none" stroke="#fff5b0" stroke-width="9" opacity=".75"/>
  <path d="M-31 120 Q0 141 34 120" fill="none" stroke="#a9561f" stroke-width="9"/>
 </g>'''

def logo_body():
 a=[]
 a.append('''<g transform="rotate(-2.0 801 405)">
  <rect x="150" y="94" width="1300" height="566" rx="68" fill="#0b2e2c" opacity=".32" transform="translate(16 23)"/>
  <rect x="148" y="74" width="1300" height="566" rx="68" fill="url(#sign)" stroke="#123b36" stroke-width="30"/>
  <rect x="168" y="96" width="1260" height="526" rx="54" fill="none" stroke="#e7fff0" stroke-width="16"/>
  <path d="M207 164 Q510 104 975 121" stroke="#a9dec2" stroke-width="15" opacity=".28" fill="none" stroke-linecap="round"/>
  <circle cx="213" cy="144" r="10" fill="#b6d9ce"/><circle cx="1382" cy="562" r="10" fill="#b6d9ce"/>
 </g>''')
 t,_=txt('Cebulak',236,353,191,CREAM,INK,18,shadow=4)
 a.append(f'<g transform="rotate(-2.0 801 405)">{t}</g>')
 t,_=txt('Express',347,574,210,GOLD,INK,20,shadow=6)
 a.append(f'<g transform="rotate(-2.0 801 405)">{t}</g>')
 a.append(onion(1300,265,1.00))
 a.append('''<g transform="rotate(1.5 814 771)">
 <path d="M340 692 L1285 692 Q1310 692 1334 707 L1455 763 L1333 844 Q1310 859 1282 859 L340 859 Q302 859 302 820 L302 730 Q302 692 340 692Z" fill="#fffdf7" stroke="#981c2a" stroke-width="31" stroke-linejoin="round"/>
 <path d="M342 707 L1293 707 Q1317 707 1334 720 L1420 764 L1327 832 Q1314 844 1293 844 L342 844 Q319 844 319 820 L319 730 Q319 707 342 707Z" fill="none" stroke="#ed4548" stroke-width="6" stroke-linejoin="round"/>
 </g>''')
 t,_=txt('Kierunek Polska',407,806,112,RED,CREAM,5,shadow=0)
 a.append(f'<g transform="rotate(1.5 814 771)">{t}</g>')
 return ''.join(a)

# Niewielkie, wystajace bagaze + kombi widziane z boku pod lekkim katem.
def car_body():
 return f'''<g stroke-linejoin="round" stroke-linecap="round">
 <!-- cień, linia ruchu -->
 <ellipse cx="275" cy="338" rx="236" ry="24" fill="#112e33" opacity=".20"/>
 <path d="M-15 311 L38 311 M-40 339 L15 339" stroke="#fff9d5" stroke-width="10" opacity=".82"/>
 <!-- bagaznik dachowy -->
 <path d="M139 120 L408 120" stroke="{INK}" stroke-width="13"/>
 <path d="M154 115 L154 141 M389 115 L389 141" stroke="#2d383c" stroke-width="9"/>
 <!-- torby, kartony, walizka, rulon -->
 <path d="M145 114 L146 63 Q146 53 158 53 L220 53 Q232 53 232 63 L232 114Z" fill="url(#roofcase)" stroke="{INK}" stroke-width="9"/>
 <path d="M163 53 L163 39 Q163 33 172 33 L202 33 Q209 33 209 39 L209 53" fill="none" stroke="{INK}" stroke-width="8"/>
 <path d="M178 58 L178 109 M200 58 L200 109" stroke="#ffe5a3" stroke-width="8" opacity=".8"/>
 <path d="M238 112 L232 69 Q234 58 248 56 L302 62 Q313 64 316 76 L310 116Z" fill="#e44f47" stroke="{INK}" stroke-width="9"/>
 <path d="M248 76 L296 81 M245 93 L302 100" stroke="#ffb2a1" stroke-width="7" opacity=".65"/>
 <path d="M315 115 L316 72 Q322 55 337 60 L377 62 Q389 65 391 78 L392 118Z" fill="#88b44f" stroke="{INK}" stroke-width="9"/>
 <path d="M343 67 L343 113 M365 70 L365 116" stroke="#cbda77" stroke-width="6"/>
 <path d="M101 117 Q105 84 131 83 Q153 84 157 111 L156 123Z" fill="#8b63b6" stroke="{INK}" stroke-width="8"/>
 <path d="M110 95 Q125 112 148 92" fill="none" stroke="#c4a2d8" stroke-width="6"/>
 <path d="M397 114 Q415 90 439 117 L436 128 L394 128Z" fill="#3f7e9b" stroke="{INK}" stroke-width="8"/>
 <!-- relingi -->
 <path d="M119 127 L408 127" stroke="#e2f1d8" stroke-width="7"/>
 <!-- szklo i dach -->
 <path d="M92 207 L113 148 Q120 134 143 134 L385 135 Q403 137 414 154 L445 208Z" fill="url(#glass)" stroke="{INK}" stroke-width="13"/>
 <path d="M116 197 L133 155 Q137 149 150 149 L222 149 L218 196Z" fill="#86d7ed" stroke="{INK}" stroke-width="8"/>
 <path d="M232 149 L310 149 L331 196 L229 196Z" fill="#b4f2f0" stroke="{INK}" stroke-width="8"/>
 <path d="M324 149 L375 149 Q389 151 397 167 L422 197 L340 197Z" fill="#87cee1" stroke="{INK}" stroke-width="8"/>
 <path d="M146 158 L128 190 M260 155 L247 177 M347 155 L339 175" stroke="#f8ffff" stroke-width="8" opacity=".67"/>
 <!-- karoseria -->
 <path d="M65 216 Q75 207 99 204 L441 204 Q472 207 488 228 L503 263 Q516 274 506 300 L498 312 L76 314 Q50 306 51 280 L53 239 Q53 223 65 216Z" fill="url(#carblue)" stroke="{INK}" stroke-width="13"/>
 <path d="M67 246 L497 248" stroke="#b4ebf1" stroke-width="9" opacity=".48"/>
 <path d="M85 289 L497 288" stroke="#0b4c73" stroke-width="14"/>
 <path d="M226 207 L226 288 M341 207 L341 288" stroke="#1d5a77" stroke-width="7"/>
 <path d="M241 252 L272 252 M353 252 L376 252" stroke="#e8f8eb" stroke-width="9"/>
 <!-- kolka -->
 <g fill="#1a2830" stroke="{INK}" stroke-width="9"><circle cx="162" cy="311" r="49"/><circle cx="428" cy="311" r="49"/></g>
 <circle cx="162" cy="311" r="26" fill="#dae2db" stroke="#7b949b" stroke-width="8"/><circle cx="428" cy="311" r="26" fill="#dae2db" stroke="#7b949b" stroke-width="8"/>
 <circle cx="162" cy="311" r="9" fill="#5c707a"/><circle cx="428" cy="311" r="9" fill="#5c707a"/>
 <!-- nos, zderzak, lampy -->
 <path d="M490 235 L509 251 L509 275 L493 282" fill="#d5eddb" stroke="{INK}" stroke-width="9"/>
 <path d="M480 247 L505 251 L507 271 L482 272Z" fill="#ffe7a0" stroke="#b8834c" stroke-width="4"/>
 <path d="M58 250 L78 248 L78 277 L52 278Z" fill="#ff6861" stroke="{INK}" stroke-width="6"/>
 <path d="M53 293 L81 296 M493 295 L509 293" stroke="#e7f7f5" stroke-width="11"/>
 </g>'''

def car_at(x,y,w):
 return f'<g transform="translate({x:.2f} {y:.2f}) scale({w/535:.5f})">{car_body()}</g>'

def sun(x,y,r):
 rays=''.join(f'<line x1="{x+math.cos(i*math.pi/6)*r*1.35:.1f}" y1="{y+math.sin(i*math.pi/6)*r*1.35:.1f}" x2="{x+math.cos(i*math.pi/6)*r*1.9:.1f}" y2="{y+math.sin(i*math.pi/6)*r*1.9:.1f}" stroke="#ffe7a7" stroke-width="{max(3,r*.065):.1f}" opacity=".7" stroke-linecap="round"/>' for i in range(12))
 return f'<circle cx="{x}" cy="{y}" r="{r*3.5}" fill="url(#sun-glow)"/>'+rays+f'<circle cx="{x}" cy="{y}" r="{r}" fill="#fff4a9" stroke="#fffddd" stroke-width="5"/>'

def clouds(x,y,s=1):
 return f'''<g transform="translate({x} {y}) scale({s})" fill="#fffdf2" stroke="#e7f7f2" stroke-width="4" opacity=".92">
 <path d="M0 40 Q-6 12 26 15 Q36 -10 65 2 Q89 -14 111 14 Q139 10 147 39 Q150 52 126 52 L23 52 Q0 54 0 40Z"/></g>'''

def nature_bg(w,h,kind='general'):
 a=[f'<rect width="{w}" height="{h}" fill="url(#sky)"/>']
 a.append(sun(w*.135,h*.155,h*.085))
 for x,y,s in [(360,92,1.0),(830,115,.7),(1050,66,.55)]: a.append(clouds(x/1200*w,y/630*h,s*(w/1200)))
 # dalekie pasmo, zroznicowane kolory
 if kind in ('ch','no'):
  a.append(f'<path d="M0 {h*.63} L{w*.17} {h*.29} L{w*.31} {h*.54} L{w*.47} {h*.22} L{w*.72} {h*.58} L{w*.84} {h*.32} L{w} {h*.57} V{h} H0Z" fill="#7faaba" stroke="#688e9d" stroke-width="5"/>')
  a.append(f'<path d="M{w*.085} {h*.46} L{w*.17} {h*.29} L{w*.24} {h*.43} L{w*.19} {h*.41} L{w*.167} {h*.375} L{w*.142} {h*.42}Z M{w*.41} {h*.34} L{w*.47} {h*.22} L{w*.555} {h*.37} L{w*.5} {h*.35} L{w*.48} {h*.3}Z M{w*.785} {h*.43} L{w*.84} {h*.32} L{w*.89} {h*.43}Z" fill="#f2fbf8"/>' )
 else:
  a.append(f'<path d="M0 {h*.67} Q{w*.21} {h*.42} {w*.47} {h*.64} Q{w*.72} {h*.42} {w} {h*.61} L{w} {h} L0 {h}Z" fill="#acd5a0"/>')
 a.append(f'<path d="M0 {h*.69} Q{w*.17} {h*.58} {w*.36} {h*.70} Q{w*.63} {h*.53} {w} {h*.7} V{h} H0Z" fill="#71ab70"/>')
 a.append(f'<path d="M0 {h*.82} Q{w*.22} {h*.71} {w*.44} {h*.85} Q{w*.77} {h*.69} {w} {h*.80} L{w} {h} H0Z" fill="#3a835a"/>')
 # droga w ksztalcie litery S, cienka w dali, szeroka na pierwszym planie
 a.append(f'<path d="M{w*.30} {h*1.05} Q{w*.31} {h*.83} {w*.53} {h*.72} Q{w*.66} {h*.65} {w*.56} {h*.59} L{w*.55} {h*.58} Q{w*.74} {h*.63} {w*.56} {h*.80} Q{w*.45} {h*.91} {w*.47} {h*1.05}Z" fill="#d6cba9"/>' )
 a.append(f'<path d="M{w*.32} {h*1.03} Q{w*.33} {h*.83} {w*.535} {h*.73} Q{w*.67} {h*.66} {w*.56} {h*.595} Q{w*.71} {h*.66} {w*.535} {h*.8} Q{w*.465} {h*.9} {w*.475} {h*1.03}Z" fill="url(#road)"/>' )
 a.append(f'<path d="M{w*.407} {h*1.02} Q{w*.395} {h*.86} {w*.548} {h*.76} Q{w*.622} {h*.69} {w*.568} {h*.64}" fill="none" stroke="#f8e5a7" stroke-width="9" stroke-dasharray="28 30" stroke-linecap="round" opacity=".93"/>' )
 return ''.join(a)

def motif(kind):
 # kraju motyw w drugim planie, za samochodem i logotypem (w ukladzie 1200x630)
 dark='#426960'; light='#d3dec0'; a=[]
 if kind=='be':
  for i,(x,y,height) in enumerate([(30,350,145),(125,345,165),(228,368,129),(305,366,140),(399,345,160)]):
   roof=f'<path d="M{x} {y} L{x+23} {y-20} L{x+48} {y} L{x+48} {y+height} H{x}Z"'
   a.append(roof+f' fill="{light}" stroke="{dark}" stroke-width="7"/>')
   a.append(f'<rect x="{x+17}" y="{y+28}" width="16" height="32" rx="4" fill="{dark}" opacity=".6"/>')
 elif kind=='nl':
  a.append('<path d="M0 495 Q270 464 550 499" stroke="#d6f1f0" stroke-width="30" fill="none"/>')
  for x,scale in [(100,1),(400,.66)]:
   a.append(f'<g transform="translate({x} 315) scale({scale})"><path d="M0 175 L22 65 L100 65 L124 175Z" fill="#e6dbc5" stroke="{dark}" stroke-width="8"/><path d="M15 75 L60 15 L108 75Z" fill="#ba6b5a" stroke="{dark}" stroke-width="8"/><circle cx="62" cy="74" r="13" fill="#d2bd8b" stroke="{dark}" stroke-width="7"/><path d="M60 -8 V160 M-20 75 H142 M5 21 L112 130 M109 20 L8 130" stroke="{dark}" stroke-width="11"/></g>')
 elif kind=='de':
  a.append(f'<path d="M0 480 Q100 420 195 481 Q290 420 380 482 Q460 422 540 482 L540 525 H0Z" fill="#8dbaa0" stroke="{dark}" stroke-width="7"/>')
  for x,y,s in [(45,310,1),(125,330,.75),(215,308,1.1),(320,332,.85),(430,302,1.0)]:
   a.append(f'<path d="M{x} {y+185*s} L{x+44*s} {y+60*s} L{x+88*s} {y+185*s}Z" fill="#356c5d"/><path d="M{x+11*s} {y+124*s} L{x+44*s} {y+32*s} L{x+79*s} {y+124*s}Z" fill="#448b70"/>')
 elif kind=='uk':
  a.append(f'<path d="M30 500 V365 H125 V500 M140 500 V327 H228 V500 M250 500 V365 H338 V500" fill="#bd9175" stroke="{dark}" stroke-width="7"/>')
  a.append(f'<rect x="350" y="295" width="78" height="200" fill="#ccb494" stroke="{dark}" stroke-width="7"/><path d="M343 295 L389 246 L435 295Z" fill="#907564" stroke="{dark}" stroke-width="7"/><circle cx="389" cy="342" r="24" fill="#f5efdc" stroke="{dark}" stroke-width="6"/><path d="M389 330 V342 L405 351" stroke="{dark}" stroke-width="4"/>')
 elif kind=='fr':
  a.append(f'<path d="M0 480 Q160 420 390 475 Q500 490 580 450" stroke="#7ca65b" stroke-width="46" fill="none"/>')
  for x,y in [(60,434),(150,426),(235,433),(333,437)]:
   a.append(f'<path d="M{x} {y+50} L{x+15} {y-25} L{x+30} {y+50}" stroke="#5b814c" stroke-width="12" fill="none"/><circle cx="{x+15}" cy="{y-26}" r="21" fill="#64984c"/>')
  a.append(f'<path d="M440 500 V365 M440 365 Q465 310 486 365 V500" stroke="{dark}" stroke-width="11" fill="none"/>')
 elif kind=='ch':
  a.append(f'<path d="M30 490 L80 433 L145 490Z" fill="#fff2df" stroke="{dark}" stroke-width="8"/><rect x="58" y="485" width="78" height="24" fill="#a06c58"/>')
 elif kind=='no':
  a.append(f'<path d="M0 500 Q140 450 275 492 Q390 464 540 490" stroke="#c4f5e8" stroke-width="30" fill="none"/>')
  for x,y in [(30,365),(90,390),(270,372),(400,385)]:
   a.append(f'<path d="M{x} 500 L{x+40} {y} L{x+80} 500Z" fill="#376d60"/><path d="M{x+15} 455 L{x+40} {y-27} L{x+64} 455Z" fill="#478d70"/>')
 elif kind=='dk':
  for x in (100,285):
   a.append(f'<g transform="translate({x} 330)"><path d="M0 160 L0 5" stroke="#e9ead7" stroke-width="12"/><circle cy="7" r="10" fill="#f9f9ee" stroke="{dark}" stroke-width="3"/><path d="M0 7 L-65 -21 M0 7 L62 -28 M0 7 L2 88" stroke="#e9ead7" stroke-width="20" stroke-linecap="round"/></g>')
  a.append(f'<path d="M380 490 V410 L445 365 L518 411 V490Z" fill="#eab9a1" stroke="{dark}" stroke-width="7"/>')
 return ''.join(a)

def slogan(text,x,y,width,red=RED):
 # width: bounding element
 # darker shadow and white rounded rectangle with red accent
 size=60
 while glyph_path(text,0,0,size)[1]>width-70:size-=1
 baseline=y+size+14
 t,_=txt(text,x+33,baseline,size,RED,'#fff4e5',3)
 return f'<rect x="{x+6}" y="{y+8}" width="{width}" height="{size+51}" rx="23" fill="{INK}" opacity=".22"/>' + f'<rect x="{x}" y="{y}" width="{width}" height="{size+51}" rx="23" fill="#fffaf0" stroke="{red}" stroke-width="10"/>'+t

def store_scene(kind='general',w=1200,h=630):
 # viewBox zawsze 1200x630, niezaleznie od rozdzielczosci exportu
 a=[nature_bg(1200,630,kind),motif(kind)]
 a.append('<path d="M0 560 Q130 530 245 550" fill="none" stroke="#d8e3a9" stroke-width="14" opacity=".75"/>')
 a.append(car_at(35,240,555))
 # zaokrąglona odznaka znaku w formie miniatury logo (przezroczyste SVG jako kompozycja)
 a.append('<g transform="translate(604 52) scale(.401)">'+logo_body()+'</g>')
 names={'general':'Z Europy do Polski','be':'Z Belgii do Polski','nl':'Z Holandii do Polski', 'de':'Z Niemiec do Polski','uk':'Z Wielkiej Brytanii do Polski', 'fr':'Z Francji do Polski','ch':'Ze Szwajcarii do Polski','no':'Z Norwegii do Polski','dk':'Z Danii do Polski'}
 a.append(slogan(names[kind],638,451,532))
 return svg_root(w,h,''.join(a),viewbox='0 0 1200 630')

def icon_scene(maskable=False):
 a=[nature_bg(1024,1024),'<path d="M0 960 Q240 880 400 1000 L0 1024Z" fill="#3d8a58"/>',
    car_at(160,346,700) if maskable else car_at(110,320,820)]
 return svg_root(1024,1024,''.join(a))

def adaptive_bg():
 a=[nature_bg(432,432),'<path d="M0 350 Q180 340 432 370 L432 432 H0Z" fill="#31704c" opacity=".7"/>']
 return svg_root(432,432,''.join(a))

def adaptive_fg():
 # Car body bounding original 530x360. after scale 0.438 gives width~232, height 158;
 # coordinate in center circle 84..348. SVG car starts x=50 so safe: x~99..331, y~126..283.
 return svg_root(432,432,car_at(76,135,248))

def mono():
 return svg_root(432,432,'''<g transform="translate(87 141) scale(.46)" fill="#ffffff" stroke="none">
 <path d="M75 220 L105 134 Q118 115 144 115 L402 117 Q436 130 449 210 L495 226 Q515 238 515 288 L490 315 L68 315 Q44 304 48 275Z"/>
 <rect x="132" y="43" width="95" height="87" rx="15"/><rect x="234" y="53" width="81" height="74" rx="13"/><rect x="317" y="61" width="75" height="66" rx="12"/>
 <rect x="117" y="104" width="301" height="26" rx="10"/>
 <circle cx="166" cy="315" r="47"/><circle cx="431" cy="315" r="47"/>
 </g>''')

def splash():
 a=['<rect width="2732" height="2732" fill="url(#sign)"/>',
    '<circle cx="385" cy="442" r="790" fill="url(#sun-glow)" opacity=".9"/>',
    '<circle cx="1366" cy="1366" r="950" fill="none" stroke="#6fb991" stroke-width="18" opacity=".28"/>',
    '<circle cx="1366" cy="1366" r="725" fill="none" stroke="#80b798" stroke-width="13" opacity=".22"/>',
    '<path d="M0 2370 Q610 2140 1360 2440 T2732 2290 V2732 H0Z" fill="#165747" opacity=".48"/>',
    '<g transform="translate(662 916) scale(.88)">'+logo_body()+'</g>' ]
 return svg_root(2732,2732,''.join(a))

def card(w,h):
 # Centralny panel bez zawartosci; dolna czesc na samochod.
 r=h/1920
 a=[f'<rect width="{w}" height="{h}" fill="url(#sky)"/>',sun(w*.16,h*.115,h*.052),
    clouds(w*.55,h*.1,w/1100), clouds(w*.77,h*.235,w/1350)]
 a.extend([f'<path d="M0 {h*.69} Q{w*.27} {h*.60} {w*.55} {h*.67} Q{w*.77} {h*.58} {w} {h*.65} V{h} H0Z" fill="#7cb77e"/>',
 f'<path d="M0 {h*.84} Q{w*.24} {h*.73} {w*.52} {h*.82} Q{w*.79} {h*.75} {w} {h*.77} V{h} H0Z" fill="#4a906b"/>',
 f'<path d="M{w*.04} {h*1.03} Q{w*.45} {h*.82} {w*.68} {h*.77} Q{w*.80} {h*.72} {w*.75} {h*.69} L{w*.85} {h*.70} Q{w*.96} {h*.82} {w*.50} {h*1.03}Z" fill="url(#road)" stroke="#e3d8b8" stroke-width="{w*.024}"/>',
 f'<path d="M{w*.43} {h*1.03} Q{w*.66} {h*.88} {w*.765} {h*.775}" fill="none" stroke="#fff1bd" stroke-width="{w*.011}" stroke-dasharray="45 37"/>'])
 # puste miejsce u gory; panel umieszczony wysoko aby auto go nie zaslanialo
 px=w*.10;py=h*.20;pw=w*.8;ph=h*(.54 if h>w else .50)
 a.append(f'<rect x="{px+10}" y="{py+15}" width="{pw}" height="{ph}" rx="{w*.07}" fill="{INK}" opacity=".17"/>')
 a.append(f'<rect x="{px}" y="{py}" width="{pw}" height="{ph}" rx="{w*.07}" fill="#fffdf2" opacity=".90" stroke="#f7ffeb" stroke-width="{w*.012}"/>')
 # auto pod kartą, bez nakladania na panel wynikow
 if h>w:
  a.append(car_at(w*.18,h*.745,w*.65))
 else:
  a.append(car_at(w*.38,h*.615,w*.56))
 return svg_root(w,h,''.join(a))

def render_svg(svg,out,transparent=False,optimize=True):
 im=Image.open(io.BytesIO(cairosvg.svg2png(bytestring=svg.encode('utf-8')))).convert('RGBA')
 if not transparent:
  # Tla powinny byc pelne, bez przezroczystosci (sRGB).
  base=Image.new('RGB',im.size,'#f1f3ed');base.paste(im,mask=im.getchannel('A'));im=base
 # paleta wyłącznie dla pelnych tłem i duzych grafik; pod glownym ograniczeniem 1.2MB.
 if im.mode=='RGB':
  im=im.quantize(colors=240,method=Image.Quantize.MEDIANCUT,dither=Image.Dither.NONE)
 # transparent logo i fg w RGBA -- kontury bez artefaktow palety.
 im.save(out,'PNG',optimize=optimize,compress_level=9)
 return im.size

def raster_to(outname,svg,transparent=False):
 path=DIR/outname
 size=render_svg(svg,path,transparent)
 print('  ',outname,size,round(path.stat().st_size/1024),'KiB')


def checker(size,w,h):
 check=Image.new('RGB',(w,h),(247,249,246));d=ImageDraw.Draw(check)
 for y in range(0,h,size):
  for x in range(0,w,size):
   if (x//size+y//size)%2: d.rectangle([x,y,x+size-1,y+size-1],fill=(224,231,227))
 return check

def contact():
 names=['logo.png','logo-small.png','logo.svg', 'icon-1024.png','icon-foreground.png','icon-background.png','icon-monochrome.png','icon-maskable-512.png','splash-2732.png','play-feature-1024x500.png','og-1200x630.png'] + [f'og-{x}-1200x630.png' for x in ['be','nl','de','uk','fr','ch','no','dk']] + ['card-bg-1080x1920.png','card-bg-1080x1080.png']
 # 4 kolumny, 6 wierszy: duza miniatura, nazwisko
 cellw=504;cellh=365; cols=4;rows=math.ceil(len(names)/cols); pad=22
 W=cols*cellw+pad*2;H=rows*cellh+pad*2+90
 sheet=Image.new('RGB',(W,H),'#eaf0ea');d=ImageDraw.Draw(sheet)
 fontfile='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
 bold='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
 f=ImageFont.truetype(fontfile,19);fb=ImageFont.truetype(bold,30)
 d.text((pad+8,20),'CEBULAK EXPRESS / BRAND ASSETS',font=fb,fill=INK)
 d.text((pad+8,59),'Przegląd zasobów na szachownicy; test ikony 48 px (prawy górny róg).',font=f,fill='#345d52')
 test=Image.open(DIR/'icon-1024.png').convert('RGB').resize((48,48),Image.Resampling.LANCZOS)
 sheet.paste(test,(W-88,19))
 for i,n in enumerate(names):
  cx=pad+(i%cols)*cellw;cy=pad+84+(i//cols)*cellh
  d.rounded_rectangle((cx,cy,cx+cellw-16,cy+cellh-16),radius=16,fill='white',outline='#c8d7ca',width=2)
  patch=checker(16,cellw-44,cellh-102)
  if n=='icon-monochrome.png':
   ImageDraw.Draw(patch).rounded_rectangle((110,3,patch.width-110,patch.height-3),radius=28,fill='#384b59')
  # n SVG jako raster offline bez potrzeby czytania innej biblioteki
  im=Image.open(io.BytesIO(cairosvg.svg2png(url=str(DIR/n),output_width=650))) if n.endswith('.svg') else Image.open(DIR/n)
  im=im.convert('RGBA');im.thumbnail((cellw-65,cellh-128),Image.Resampling.LANCZOS)
  patch.paste(im,((patch.width-im.width)//2,(patch.height-im.height)//2),im)
  sheet.paste(patch,(cx+14,cy+14))
  d.text((cx+18,cy+cellh-79),n,font=f,fill=INK)
  d.text((cx+18,cy+cellh-54),f'{im.width} x {im.height} (miniatura)',font=f,fill='#52716a')
 sheet.save(DIR/'preview.png', optimize=True,compress_level=9)
 print('  preview.png',sheet.size,round((DIR/'preview.png').stat().st_size/1024),'KiB')
 return names

def main():
 print('Brand assets -',DIR)
 root=svg_root(1600,940,logo_body())
 (DIR/'logo.svg').write_text(root,encoding='utf-8')
 raster_to('logo.png',svg_root(2048,1203,logo_body(),viewbox='0 0 1600 940'),True)
 raster_to('logo-small.png',svg_root(720,423,logo_body(),viewbox='0 0 1600 940'),True)
 raster_to('icon-1024.png',icon_scene())
 raster_to('icon-foreground.png',adaptive_fg(),True)
 raster_to('icon-background.png',adaptive_bg())
 raster_to('icon-monochrome.png',mono(),True)
 raster_to('icon-maskable-512.png',icon_scene(maskable=True).replace('width="1024" height="1024"','width="512" height="512"',1))
 raster_to('splash-2732.png',splash())
 raster_to('play-feature-1024x500.png',store_scene('general',1024,500))
 raster_to('og-1200x630.png',store_scene())
 for cc in ('be','nl','de','uk','fr','ch','no','dk'):
  raster_to(f'og-{cc}-1200x630.png',store_scene(cc))
 raster_to('card-bg-1080x1920.png',card(1080,1920))
 raster_to('card-bg-1080x1080.png',card(1080,1080))
 contact()
 (DIR/'ASSETS.md').write_text('''# Cebulak Express — zasoby marki

Oryginalne, autorskie grafiki wektorowe (kształty, kolory, kompozycja) przygotowane programowo w `generate.py` przy użyciu CairoSVG, Pillow i FontTools. Teksty logo przekształcone na krzywe; do działania gry **nie są wymagane pliki fontów**. Projekt logo, kombi, tła i piktogramu nie wykorzystują cudzych znaków towarowych ani postaci z innych gier. Materiał wygenerowany z wytycznych projektu; poglądowy arkusz koncepcyjny z ChatGPT Image nie jest częścią plików produkcyjnych.

## Pliki, źródła i licencje

| Plik | Źródło/narzędzie | Licencja | Autor/uwagi |
|---|---|---|---|
| `logo.svg` | Własna ilustracja SVG, FontTools | Własne / do użytku w grze | Zielona tablica, złota cebulka, oznaczenie kierunku; liternictwo jako krzywe |
| `logo.png` | SVG → CairoSVG/Pillow | Własne | 2048 × 1203, RGBA |
| `logo-small.png` | SVG → CairoSVG/Pillow | Własne | 720 × 423, RGBA |
| `icon-1024.png` | Własny SVG → PNG | Własne | 1024 × 1024, pełne tło |
| `icon-foreground.png` | Własny SVG → PNG | Własne | 432 × 432, kanał alfa, kombi w bezpiecznym kole 264 px |
| `icon-background.png` | Własny SVG → PNG | Własne | 432 × 432, pełne tło, bez kombi |
| `icon-monochrome.png` | Własny SVG → PNG | Własne | 432 × 432, biała sylwetka RGBA dla Android themed icons |
| `icon-maskable-512.png` | Własny SVG → PNG | Własne | 512 × 512, widoczny główny motyw w obszarze centralnym |
| `splash-2732.png` | Własny SVG → PNG | Własne | 2732 × 2732, logo w obszarze środkowym 1200 × 1200 |
| `play-feature-1024x500.png` | Własny SVG → PNG | Własne | 1024 × 500, Google Play feature graphic |
| `og-1200x630.png` | Własny SVG → PNG | Własne | 1200 × 630, ogólny OG |
| `og-be-1200x630.png` | Własny SVG → PNG | Własne | 1200 × 630, zabudowa ceglana |
| `og-nl-1200x630.png` | Własny SVG → PNG | Własne | 1200 × 630, wiatraki i kanał |
| `og-de-1200x630.png` | Własny SVG → PNG | Własne | 1200 × 630, las i most |
| `og-uk-1200x630.png` | Własny SVG → PNG | Własne | 1200 × 630, miejska architektura i wieża zegarowa |
| `og-fr-1200x630.png` | Własny SVG → PNG | Własne | 1200 × 630, zieleń i pola |
| `og-ch-1200x630.png` | Własny SVG → PNG | Własne | 1200 × 630, góry i drewniana zabudowa |
| `og-no-1200x630.png` | Własny SVG → PNG | Własne | 1200 × 630, fiord i świerki |
| `og-dk-1200x630.png` | Własny SVG → PNG | Własne | 1200 × 630, wiatraki i miasteczko |
| `card-bg-1080x1920.png` | Własny SVG → PNG | Własne | 1080 × 1920, wolne pole na rezultat |
| `card-bg-1080x1080.png` | Własny SVG → PNG | Własne | 1080 × 1080, wolne pole na rezultat |
| `preview.png` | Pillow | Własne | Arkusz kontaktowy obrazów |
| `generate.py` | Python, CairoSVG, Pillow, FontTools | Własne | Deterministyczny generator grafik; można ponowić render |

**Font:** wykorzystane do obrysów liter krzywe z Inter Display Black, licencja **SIL Open Font License 1.1** (projekt Rasmus Andersson). Font nie jest dołączany ani udostępniany. W `logo.svg` krzywe są zapisane jako ścieżki, a nie jako osadzony plik fontu.

## Paleta

- Zieleń drogowa: `#14654F`, grafitowy kontur: `#16323D`.
- Słoneczna żółć: `#FFBD37`, czerwony kierunkowskaz: `#CF2E37`.
- Samochód: niebiesko-turkusowy, bez oznaczeń producenta.
- Ciepłe światło zawsze od góry z lewej.

## Użycie i integracja

1. `logo.png`/`logo-small.png`: UI, marketing, nagłówek strony. Podstawowy wektor `logo.svg`.
2. `icon-1024.png`: główne źródło ikony sklepu. Android adaptive: **oddzielnie** `icon-foreground.png` i `icon-background.png`; `icon-monochrome.png` jako osobny glyph themed icons. Przy integracji Androida koordynator konwertuje te pliki do odpowiednich zasobów mipmap i XML.
3. `icon-maskable-512.png`: `manifest.webmanifest` → `purpose: "maskable"`; do ikony `any` można wykorzystać `icon-1024.png`.
4. `splash-2732.png`: można skalować proporcjonalnie i wycentrować, bez przycinania centralnych 1200 × 1200 px.
5. `og*.png`: statyczne metadane Open Graph dla kraju. Podmiana ogólnej ścieżki zależnie od parametrów adresu i ustawień serwera należy do koordynatora.
6. `card-bg*.png`: rysować wynik i tekst gry dynamicznie na pustym, jasnym panelu; nie zawierają liczb.

## Weryfikacja

`python generate.py` generuje wszystkie PNG od nowa i `preview.png`. Wymaga `pip install pillow cairosvg fonttools`. PNG nie mają przezroczystości tam, gdzie jest wymagana pełna powierzchnia (ikona sklepu, splash, OG, tła), a logo i warstwa foreground mają kanał alfa. Wszystkie PNG zapisane jako lossless sRGB (bez osadzonych profili niezgodnych z sRGB). Grafiki nie zawierają flag UE, godła ani cudzych logotypów.
''',encoding='utf-8')
 print('OK.')
if __name__=='__main__': main()
