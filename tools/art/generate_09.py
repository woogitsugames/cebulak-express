#!/usr/bin/env python3
"""Samodzielny generator ilustracyjnych sprite'ow panoram i warstw dla Z09.
Dziala offline. Wymaga Pillow i CairoSVG (tylko do produkcji assetow).
Kazde wyjscie posiada deterministyczne wymiary, sRGB i okresowe kafelki.
"""
from __future__ import annotations
import io, math, random, os, zipfile
from pathlib import Path
from xml.sax.saxutils import escape
from PIL import Image, ImageDraw, ImageFont, ImageCms
import cairosvg

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / 'public' / 'assets'
OUT = ASSETS / 'countries'
LM = ASSETS / 'landmarks'
SRGB_PROFILE = ImageCms.ImageCmsProfile(ImageCms.createProfile('sRGB')).tobytes()
INK = '#253c52'
INK2 = '#3b5263'
LIGHT = '#fff1c9'
WHITE = '#fff7e8'
COUNTRIES = {
 'ch': dict(name='Szwajcaria',sky0='#73bdef',sky1='#ffe2b0',hill='#7ca98b',dark='#346b5d',water='#62b5d0',road='#394752',land='#8fb986'),
 'no': dict(name='Norwegia',sky0='#7caee0',sky1='#f8d2ae',hill='#6f96a0',dark='#29576a',water='#509cbf',road='#35444e',land='#7caa99'),
 'se': dict(name='Szwecja',sky0='#8ad2eb',sky1='#ffe7b6',hill='#86af8d',dark='#316f5d',water='#62bbd1',road='#3b4853',land='#abd081'),
 'dk': dict(name='Dania',sky0='#72c9ef',sky1='#fff0b4',hill='#a4be73',dark='#41705a',water='#69b7c5',road='#3b4954',land='#d5bc73'),
}

def r(x): return str(round(x,2))
def attrs(**kv):
    return ' '.join((k.replace('_','-')+'="'+escape(str(v))+'"') for k,v in kv.items() if v is not None)
def P(d, fill='none', stroke=INK, sw=7, **kv):
    return f'<path {attrs(d=d,fill=fill,stroke=stroke,stroke_width=sw,stroke_linejoin="round",stroke_linecap="round",**kv)}/>'
def R(x,y,w,h, fill, stroke=INK, sw=7, rad=0):
    tag='rect'; return f'<{tag} {attrs(x=r(x),y=r(y),width=r(w),height=r(h),rx=r(rad),fill=fill,stroke=stroke,stroke_width=sw)}/>'
def C(x,y,rr,fill,stroke=INK,sw=7): return f'<circle {attrs(cx=r(x),cy=r(y),r=r(rr),fill=fill,stroke=stroke,stroke_width=sw)}/>'
def E(x,y,rx,ry,fill,stroke=INK,sw=7): return f'<ellipse {attrs(cx=r(x),cy=r(y),rx=r(rx),ry=r(ry),fill=fill,stroke=stroke,stroke_width=sw)}/>'
def L(x1,y1,x2,y2,stroke=INK,sw=7):return P(f'M {r(x1)} {r(y1)} L {r(x2)} {r(y2)}',stroke=stroke,sw=sw)
def poly(points,fill,stroke=INK,sw=7):return P('M '+' L '.join(f'{r(x)} {r(y)}' for x,y in points)+' Z',fill,stroke,sw)
def grp(content, x=0,y=0,scale=1):return f'<g transform="translate({r(x)} {r(y)}) scale({r(scale)})">{content}</g>'
def star4(x,y,s):return P(f'M {r(x-s)} {r(y)} L {r(x)} {r(y-s*.25)} L {r(x+s)} {r(y)} L {r(x)} {r(y+s*.25)} Z','#fffbee','none',0)

def svg(w,h,body):
    defs='''<defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#86c5ee"/><stop offset="1" stop-color="#ffe6ad"/></linearGradient>
    <linearGradient id="water" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#7cd3dd"/><stop offset="1" stop-color="#3e91b2"/></linearGradient>
    <linearGradient id="asphalt" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#59656a"/><stop offset="1" stop-color="#34424e"/></linearGradient>
    <radialGradient id="halo"><stop stop-color="#fffada" stop-opacity=".72"/><stop offset="1" stop-color="#fffada" stop-opacity="0"/></radialGradient>
    <linearGradient id="snow" x1="0" x2="0.2" y1="0" y2="1"><stop stop-color="#ffffff"/><stop offset="1" stop-color="#d9eef4"/></linearGradient>
    </defs>'''
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">{defs}{body}</svg>'

def save_png(path, w,h,body):
    path.parent.mkdir(parents=True,exist_ok=True)
    data=cairosvg.svg2png(bytestring=svg(w,h,body).encode(),output_width=w,output_height=h)
    img=Image.open(io.BytesIO(data)).convert('RGBA')
    img.save(path,format='PNG',optimize=True,compress_level=9,icc_profile=SRGB_PROFILE)
    return img

def samples_periodic(items,width,func):
    # Powtorki z lewej i prawej strony pozwalaja elementom przeciac brzeg
    return ''.join(func(x+shift,*other) for shift in (-width,0,width) for x,*other in items)

def hilly(w,h,base,a,b,phase,fill,stroke=INK,sw=7,steps=130):
    def f(x):return base+a*math.sin(2*math.pi*(x/w*2)+phase)+b*math.sin(2*math.pi*(x/w*5)-phase/2)
    pts=[(-24,f(-24))]+[(i*w/steps, f(i*w/steps)) for i in range(steps+1)]+[(w+24,f(w+24)),(w+24,h+25),(-24,h+25)]
    return poly(pts,fill,stroke,sw)

def grass_blades(x,y,s=1,c='#366e5c'):
    return P(f'M {x-11*s} {y} Q {x-13*s} {y-18*s} {x-20*s} {y-21*s} M {x} {y} Q {x-1*s} {y-30*s} {x+3*s} {y-34*s} M {x+10*s} {y} Q {x+12*s} {y-18*s} {x+24*s} {y-21*s}',stroke=c,sw=4*s)

def fir(x,y,s=1,leaf='#2c7465',sub='#3d9672'):
    # korona z trzech szerokich kondygnacji, przesadzona sympatyczna sylwetka
    parts=[]
    parts.append(R(x-12*s,y-20*s,24*s,73*s,'#9b6d4a',INK,5*s,5*s))
    for j in (0,1,2):
        yy=y-(173-47*j)*s; hw=(55-9*j)*s
        parts.append(poly([(x,yy),(x-hw,yy+91*s),(x+hw,yy+91*s)],leaf,INK,5*s))
        parts.append(P(f'M {r(x-25*s)} {r(yy+65*s)} Q {r(x)} {r(yy+74*s)} {r(x+27*s)} {r(yy+65*s)}',stroke=sub,sw=4*s))
    return ''.join(parts)

def birch(x,y,s=1):
    return R(x-9*s,y-145*s,18*s,170*s,'#fff4da',INK,5*s,7*s)+''.join(L(x-6*s,y-110*s+i*29*s,x+5*s,y-121*s+i*29*s,INK2,4*s) for i in range(3))+E(x,y-166*s,42*s,63*s,'#83be79',INK,6*s)+E(x+29*s,y-153*s,40*s,51*s,'#a0d68a',INK,5*s)

def cloud(x,y,s=1,tint='#fff9e8'):
    # ksztalt jako jeden kontur; drobne smugi po stronie slonca
    q=f'M {r(x-111*s)} {r(y+30*s)} C {r(x-140*s)} {r(y+12*s)} {r(x-124*s)} {r(y-29*s)} {r(x-83*s)} {r(y-28*s)} C {r(x-71*s)} {r(y-74*s)} {r(x-15*s)} {r(y-80*s)} {r(x+14*s)} {r(y-47*s)} C {r(x+55*s)} {r(y-72*s)} {r(x+106*s)} {r(y-27*s)} {r(x+95*s)} {r(y+2*s)} C {r(x+147*s)} {r(y+8*s)} {r(x+134*s)} {r(y+51*s)} {r(x+105*s)} {r(y+51*s)} L {r(x-90*s)} {r(y+51*s)} Q {r(x-107*s)} {r(y+47*s)} {r(x-111*s)} {r(y+30*s)} Z'
    return P(q,tint,'#8eb8c5',5*s)+L(x-58*s,y+5*s,x-27*s,y-5*s,'#ffffff',6*s)

def chalet(x,y,s=1,color='#f5c074'):
    b=R(x-76*s,y-96*s,152*s,104*s,color,INK,7*s,5*s)
    b+=poly([(x-91*s,y-96*s),(x,y-155*s),(x+92*s,y-96*s)],'#bd654a',INK,8*s)
    b+=poly([(x-91*s,y-96*s),(x-80*s,y-115*s),(x,y-170*s),(x+91*s,y-111*s),(x+92*s,y-96*s),(x,y-148*s)],'#6e4a47',INK,6*s)
    b+=R(x-15*s,y-48*s,30*s,54*s,'#68544d',INK,5*s,3*s)
    for dx in (-52,52):
        b+=R(x+(dx-15)*s,y-76*s,30*s,30*s,'#95d3e4',INK,5*s,3*s)
        b+=L(x+dx*s,y-76*s,x+dx*s,y-47*s,INK2,3*s)
    b+=L(x-75*s,y-24*s,x+75*s,y-24*s,'#f9e1a7',5*s)
    return b

def red_cottage(x,y,s=1):
    b=R(x-70*s,y-112*s,140*s,120*s,'#c75041',INK,7*s,3*s)
    b+=poly([(x-81*s,y-108*s),(x,y-158*s),(x+81*s,y-108*s)],'#5c5e60',INK,8*s)
    b+=R(x-28*s,y-76*s,56*s,48*s,'#fff7e7',INK,5*s)
    b+=L(x,y-76*s,x,y-30*s,'#698ca0',4*s)
    b+=R(x-60*s,y-110*s,10*s,105*s,'#f6e9d6',stroke='none',sw=0)
    b+=R(x+50*s,y-110*s,10*s,105*s,'#f6e9d6',stroke='none',sw=0)
    return b

def windmill(x,y,s=1):
    b=poly([(x-27*s,y),(x-14*s,y-232*s),(x+16*s,y-232*s),(x+33*s,y)],'#fff4e7',INK,7*s)
    b+=E(x,y-232*s,24*s,24*s,'#748fa5',INK,6*s)
    for a in range(4):
        theta=a*math.pi/2+.1
        vx,vy=math.cos(theta), math.sin(theta)
        bx,by=x+vx*27*s,y-232*s+vy*27*s
        ex,ey=x+vx*155*s,y-232*s+vy*155*s
        nx,ny=-vy*14*s,vx*14*s
        b+=poly([(bx,by),(ex,ey),(ex+nx,ey+ny),(bx+nx*.4,by+ny*.4)],'#f8f8e5',INK2,5*s)
    return b

def cyclist(x,y,s=1):
    b=C(x-45*s,y-22*s,30*s,'none',INK,6*s)+C(x+52*s,y-22*s,30*s,'none',INK,6*s)
    b+=P(f'M {x-45*s} {y-22*s} L {x-6*s} {y-70*s} L {x+16*s} {y-22*s} Z M {x-6*s} {y-70*s} L {x+52*s} {y-22*s} M {x+52*s} {y-22*s} L {x+48*s} {y-83*s} L {x+66*s} {y-83*s}',stroke=INK,sw=6*s)
    b+=C(x-4*s,y-133*s,15*s,'#f3bc88',INK,5*s)+P(f'M {x} {y-117*s} L {x+17*s} {y-87*s} L {x+45*s} {y-91*s}',stroke='#be7050',sw=12*s)
    b+=P(f'M {x+15*s} {y-88*s} L {x-19*s} {y-62*s} L {x-7*s} {y-36*s}',stroke='#334d67',sw=8*s)
    return b

def cow(x,y,s=1):
    # Zygzak umaszczenia; bez nadmiaru detali pod droga
    b=E(x,y-48*s,78*s,45*s,'#fff3dd',INK,7*s)
    b+=E(x-26*s,y-53*s,30*s,23*s,'#554d4b','none',0)
    b+=E(x+33*s,y-34*s,24*s,18*s,'#6e5d51','none',0)
    b+=R(x-67*s,y-20*s,12*s,43*s,'#fff3dd',INK,5*s,4*s)+R(x+38*s,y-20*s,12*s,43*s,'#fff3dd',INK,5*s,4*s)
    b+=E(x+79*s,y-68*s,34*s,33*s,'#fff1d9',INK,6*s)
    b+=E(x+98*s,y-53*s,23*s,16*s,'#eeb4aa',INK,4*s)
    b+=C(x+70*s,y-76*s,4*s,INK,'none',0)
    b+=L(x+72*s,y-95*s,x+62*s,y-118*s,INK,6*s)+L(x+93*s,y-97*s,x+98*s,y-120*s,INK,6*s)
    b+=C(x+69*s,y-26*s,11*s,'#f4cf57',INK2,3*s)
    b+=P(f'M {x-79*s} {y-61*s} Q {x-116*s} {y-90*s} {x-105*s} {y-122*s}',stroke=INK,sw=5*s)
    return b

def elk(x,y,s=1):
    b=E(x,y-86*s,79*s,42*s,'#86644f',INK,7*s)
    for dx in (-45,-18,41,60):b+=R(x+dx*s-7*s,y-53*s,14*s,80*s,'#85604b',INK,5*s,4*s)
    b+=P(f'M {x+59*s} {y-96*s} Q {x+111*s} {y-140*s} {x+107*s} {y-170*s}',stroke='#86644f',sw=27*s)
    b+=E(x+107*s,y-168*s,31*s,18*s,'#886951',INK,5*s)
    b+=P(f'M {x+92*s} {y-180*s} Q {x+75*s} {y-230*s} {x+60*s} {y-210*s} M {x+94*s} {y-183*s} Q {x+88*s} {y-235*s} {x+113*s} {y-226*s} M {x+112*s} {y-183*s} Q {x+138*s} {y-232*s} {x+149*s} {y-215*s}',stroke='#634c40',sw=9*s)
    b+=C(x+117*s,y-175*s,4*s,INK,'none',0)
    return b

def boat(x,y,s=1,color='#fff3d9'):
    b=poly([(x-100*s,y-37*s),(x+96*s,y-37*s),(x+60*s,y+1*s),(x-62*s,y+1*s)],color,INK,6*s)
    b+=L(x-5*s,y-39*s,x-5*s,y-162*s,INK,6*s)
    b+=poly([(x+3*s,y-145*s),(x+3*s,y-48*s),(x+76*s,y-48*s)],'#f6d28b',INK2,4*s)
    return b

def gull(x,y,s=1):return P(f'M {x-25*s} {y} Q {x-14*s} {y-15*s} {x} {y-1*s} Q {x+12*s} {y-15*s} {x+28*s} {y}',stroke=INK2,sw=4*s)

def local_sky(cc):
    p=COUNTRIES[cc]
    body=f'''<defs><linearGradient id="csky" x1="0" y1="0" x2="0" y2="1"><stop stop-color="{p['sky0']}"/><stop offset=".74" stop-color="{p['sky1']}"/><stop offset="1" stop-color="#ffe8be"/></linearGradient></defs>'''
    body+=R(0,0,1080,1920,'url(#csky)','none',0)
    body+=C(190,295,230,'url(#halo)','none',0)+C(190,295,94,'#fff6b9','#f5cd7a',8)+C(157,265,19,'#fffcea','none',0)
    for i in range(5):body+=P(f'M {25+i*60} {560+i*29} Q 195 {520+i*30} {520+i*62} {565+i*29}',stroke='#fff8e1',sw=2,stroke_opacity='.16')
    return body

def country_clouds(cc):
    w,h=2160,600; b=''
    pal={'ch':['#fffdf2','#fff5de'],'no':['#f1f1e9','#e5edf0'],'se':['#fff9e9','#eaf5f0'],'dk':['#fffdf2','#fff9e1']}[cc]
    items=[(100,415,1.04),(630,285,.83),(1280,103,1.2),(1850,340,.7),(2320,470,1.01)]
    b+=samples_periodic(items,w,lambda x,y,s:cloud(x,y,s,pal[int(s*3)%2]))
    for x,y in [(350,420),(960,95),(1680,450)]:
        b+=gull(x,y,.8)
    return b

# W kazdej warstwie wysokosc i faza sinusa maja pelny okres na szerokosci kafelka.
def country_far(cc):
    w,h=2160,900; p=COUNTRIES[cc];b=''
    if cc=='ch':
        peaks=[(250,175,350),(660,300,285),(1000,130,420),(1450,210,365),(1860,330,310)]
        for shift in (-w,0,w):
         for xx0,top,half in peaks:
            xx=xx0+shift
            b+=poly([(xx-half,660),(xx,top),(xx+half,660)],'#90a6b0',INK2,8)
            b+=poly([(xx,top),(xx+half,660),(xx+half*.27,510),(xx+half*.04,top+170)],'#6f8fa6','none',0)
            b+=poly([(xx-half*.34,top+225),(xx,top),(xx+half*.33,top+220),(xx+half*.08,top+164),(xx-half*.08,top+196)],'#f5faff','#a5bac6',3)
        b+=hilly(w,h,630,33,22,.6,'#8bc09c',INK,9)
        b+=hilly(w,h,714,17,14,1.4,'#7baf86',INK2,7)
        b+=R(0,761,w,139,'url(#water)','none',0)+L(0,761,w,761,'#397d94',7)
        b+=samples_periodic([(210,710,1.05),(680,713,.8),(1340,729,1.1),(1910,722,.75)],w,lambda x,y,s:chalet(x,y,s))
    elif cc=='no':
        for shift in (-w,0,w):
         for xx0,top,half in [(260,205,345),(760,260,380),(1170,115,405),(1720,235,455)]:
            xx=xx0+shift
            b+=poly([(xx-half,720),(xx,top),(xx+half,720)],'#7896a8',INK2,8)
            b+=poly([(xx,top),(xx+half,720),(xx+half*.25,660),(xx-half*.07,top+185)],'#4f7895','none',0)
            b+=poly([(xx-half*.2,top+120),(xx,top),(xx+half*.24,top+155),(xx+half*.08,top+124)],'#edf7f3','none',0)
        b+=hilly(w,h,590,46,26,.9,'#496d72',INK,9)
        b+=R(0,690,w,210,'url(#water)','none',0)+L(0,691,w,691,'#426d80',9)
        b+=samples_periodic([(240,701,.8),(920,712,1),(1560,700,.75),(2070,712,.6)],w,lambda x,y,s:red_cottage(x,y,s))
        b+=P('M 1130 544 Q 1120 620 1106 703 L 1141 703 Q 1151 615 1160 544','#f0fbf6','#b7e2ee',6)
        for x,y in [(1100,753),(1510,788),(470,815)]:b+=P(f'M {x-30} {y} Q {x} {y-4} {x+40} {y}',stroke='#a5e3e8',sw=5)
    elif cc=='se':
        b+=hilly(w,h,500,40,20,.4,'#a6bb8e',INK2,8)
        for shift in (-w,0,w):
         for i in range(18):
            xx=60+i*120+shift; t=i%4
            b+=fir(xx,660,(.5,.62,.72,.57)[t],('#317765','#3d8267','#316d5f','#497e65')[t])
        b+=hilly(w,h,707,19,14,.9,'#8dbd83',INK,8)
        b+=R(0,776,w,124,'url(#water)','none',0)+L(0,775,w,775,'#46869b',6)
        b+=samples_periodic([(225,745,.98),(1060,750,.75),(1880,765,.88)],w,lambda x,y,s:red_cottage(x,y,s))
        for xx in range(85,2250,211):b+=E(xx,773,47,19,'#599b7a',INK2,3)
    else:
        b+=hilly(w,h,536,23,13,.7,'#c2d589',INK2,8)
        b+=hilly(w,h,639,21,9,1.3,'#e4ca7f',INK,7)
        b+=hilly(w,h,733,14,9,.3,'#a2c76d',INK,7)
        for x in range(10,2160,110):
            b+=P(f'M {x} 675 Q {x+17} 662 {x+36} 673',stroke='#c3aa65',sw=5)
        b+=samples_periodic([(255,639,.82),(1010,630,1.15),(1670,647,.92)],w,lambda x,y,s:windmill(x,y,s))
        b+=samples_periodic([(650,744,.8),(1950,762,.68)],w,lambda x,y,s:chalet(x,y,s,'#f2c38e'))
        b+=R(0,824,w,76,'#7ab7aa','none',0)+L(0,824,w,824,'#5b9c85',7)
    return b

def country_near(cc):
    w,h=2160,720;p=COUNTRIES[cc];b=''
    if cc=='ch':
        b+=hilly(w,h,416,34,16,.7,'#71ad77',INK,9)
        for x,s in [(40,1.28),(560,.82),(1080,1.17),(1640,.86),(2060,1.33)]:b+=samples_periodic([(x,518,s)],w,lambda xx,yy,ss:fir(xx,yy,ss))
        # Kamienny tunel w alpejskim zboczu (portal narysowany bez oznakowania)
        def tunnel(x,y,s):
            return (P(f'M {x-113*s} {y+40*s} L {x-113*s} {y-77*s} Q {x-113*s} {y-218*s} {x} {y-218*s} Q {x+113*s} {y-218*s} {x+113*s} {y-77*s} L {x+113*s} {y+40*s} Z','#a6a5a0',INK,8*s)+
                    P(f'M {x-77*s} {y+40*s} L {x-77*s} {y-68*s} Q {x-77*s} {y-169*s} {x} {y-169*s} Q {x+77*s} {y-169*s} {x+77*s} {y-68*s} L {x+77*s} {y+40*s} Z','#354551',INK2,7*s)+
                    L(x-105*s,y-52*s,x-80*s,y-52*s,'#dce0d6',5*s))
        b+=samples_periodic([(1482,579,.67)],w,tunnel)
        b+=samples_periodic([(880,514,.85),(1890,496,.76)],w,lambda x,y,s:cow(x,y,s))
        for shift in (-w,0,w):
            for x0 in range(0,2160,135):b+=R(x0+shift-7,482,14,160,'#a47a4d',INK2,4,3)
        b+=L(0,521,2160,521,'#8a684e',13)+L(0,593,2160,593,'#8a684e',11)
        b+=hilly(w,h,630,14,10,.9,'#4f9976','none',0)
    elif cc=='no':
        b+=hilly(w,h,412,29,20,.5,'#6f9885',INK,9)
        for x,s in [(10,1.28),(350,.82),(890,1.27),(1350,.98),(2030,1.35)]:b+=samples_periodic([(x,522,s)],w,lambda xx,yy,ss:fir(xx,yy,ss,'#275c62','#387d75'))
        b+=samples_periodic([(600,545,.89),(1790,535,.72)],w,lambda x,y,s:elk(x,y,s))
        for x in range(170,2400,360):b+=E(x,595,72,40,'#778b8a',INK2,8)+P(f'M {x-24} 581 L {x-7} 568',stroke='#acbab6',sw=5)
        b+=hilly(w,h,658,14,12,.9,'#417c78','none',0)
    elif cc=='se':
        b+=hilly(w,h,390,28,15,.6,'#77a574',INK,9)
        for x,s in [(70,1.12),(410,.86),(850,1.29),(1220,.98),(1730,1.25),(2100,1.1)]:b+=samples_periodic([(x,523,s)],w,lambda xx,yy,ss:fir(xx,yy,ss,'#296d57','#43986b'))
        b+=samples_periodic([(600,534,.73),(1460,527,.8)],w,lambda x,y,s:birch(x,y,s))
        for x in (-2160,-1080,0,1080,2160,3240):
            # Znak losia: pomaranczowy trojkat, piktogram bez liter
            b+=R(x-8,437,16,191,'#596977',INK,5,4)
            b+=poly([(x-72,422),(x,295),(x+72,422)],'#f5cc5b',INK,8)
            b+=grp(elk(0,0,.29),x-13,401,.45)
        b+=hilly(w,h,645,14,9,.3,'#4c8b66','none',0)
    else:
        b+=hilly(w,h,385,18,12,1.1,'#b6cd7c',INK,8)
        for x,s in [(90,.72),(430,.59),(910,.67),(1450,.72),(2050,.63)]:b+=samples_periodic([(x,519,s)],w,lambda xx,yy,ss:windmill(xx,yy,ss))
        for xx in (230,770,1310,1890):b+=E(xx,530,108,37,'#e9c76e',INK2,6)
        b+=samples_periodic([(540,553,.9),(1650,548,.74)],w,lambda x,y,s:cyclist(x,y,s))
        for x in range(50,2240,140):b+=P(f'M {x} 614 q -8 -35 8 -51',stroke='#4d9869',sw=7)
        b+=hilly(w,h,645,13,10,.8,'#8aaa60','none',0)
    # wspolna krawedz przy drodze; niebo przezroczyste
    b+=R(0,681,w,39,'#628c68','none',0)+L(0,680,w,680,'#325964',7)
    return b

def country_road(cc):
    w,h=1080,330;p=COUNTRIES[cc]
    b=R(0,0,w,h,'url(#asphalt)','none',0)
    b+=R(0,0,w,33,'#75827b','none',0)+L(0,32,w,32,INK2,10)
    # Bariera i slupki co 180 px, okres dzieli 1080; laczenie bez szwu.
    for x in range(45,1080,180):
        b+=R(x,0,21,98,'#c0cbd0',INK2,5,3)
        b+=R(x-4,80,29,7,'#f5e7bd',INK2,2,3)
    b+=R(0,43,w,22,'#e8d5a3',INK2,5,4)+R(0,67,w,13,'#a8b6bb',INK2,3,4)
    b+=R(0,80,w,25,'#374654','none',0)
    b+=L(0,194,w,194,'#8c9998',5)
    for x in range(0,w,180):b+=R(x+18,192,96,16,'#fff5d9','none',0,3)
    b+=R(0,294,w,17,'#f5e0ac','none',0)+L(0,294,w,294,'#c6b68f',4)
    return b

# -------------------- pojedyncze punkty trasy (1620 x 900) --------------------
def hill_back(fill='#91bb9a',top=630,phase=0):
    # nie jest kafelkiem: przezroczyste niebo az do gor
    return hilly(1620,900,top,37,16,phase,fill,INK2,6)

def water_front(y=755,color='#66bad0'):
    b=R(0,y,1620,900-y,color,'none',0)+L(0,y,1620,y,'#4183a2',8)
    for i in range(12):
        x=(i*173+47)%1620; yy=y+24+(i%4)*24
        b+=P(f'M {x} {yy} q 37 -8 78 0',stroke='#b2e1df',sw=4)
    return b

def ground_front(y=797,color='#79b080'):
    b=R(0,y,1620,900-y,color,'none',0)+L(0,y,1620,y,'#3b7664',7)
    for x in range(33,1670,89):b+=grass_blades(x,y+22,.38,'#4a8b68')
    return b

def house(x,y,w,h,color,roof='#785a59',style='city'):
    b=R(x-w/2,y-h,w,h,color,INK,8,3)
    if style=='gabled':
        b+=poly([(x-w*.6,y-h),(x,y-h-h*.34),(x+w*.6,y-h)],roof,INK,8)
    elif style=='half':
        b+=poly([(x-w*.59,y-h),(x,y-h-h*.31),(x+w*.59,y-h)],'#755249',INK,8)
        b+=L(x-w/2,y-h,x+w/2,y-3,'#754b42',8)
        b+=L(x+w/2,y-h,x-w/2,y-3,'#754b42',8)
        b+=L(x,y-h,x,y,'#754b42',7)
    else:
        b+=poly([(x-w*.54,y-h),(x,y-h-22),(x+w*.54,y-h)],roof,INK,7)
    cols=max(1,int(w/52)); rows=max(1,int(h/75))
    for yi in range(rows):
        for xi in range(cols):
            dx=(xi+.5-cols/2)*(w/(cols+0.25)); dy=y-h+(yi+.5)*h/(rows+0.15)
            b+=R(dx+x-14,dy-13,28,39,'#d3ecdd',INK2,4,2)
            b+=L(dx+x,dy-13,dx+x,dy+25,INK2,2)
    b+=R(x-22,y-64,44,64,'#785a4a',INK,4,3)
    return b

def tower(x,y,height,width=78,color='#debd90',roof='#6c777c',spires=True):
    b=R(x-width/2,y-height,width,height,color,INK,8,4)
    if spires:b+=poly([(x-width*.68,y-height),(x,y-height-88),(x+width*.68,y-height)],roof,INK,8)
    else:b+=R(x-width*.67,y-height-25,width*1.34,31,roof,INK,7,2)
    for yy in range(int(y-height+50),int(y-10),64):
        b+=R(x-12,yy,24,37,'#a2d5dc',INK2,4,12)
    return b

def dome(x,y,w=125,h=75,color='#669a81'):
    return P(f'M {x-w} {y} Q {x-w*.88} {y-h*1.35} {x} {y-h*1.42} Q {x+w*.88} {y-h*1.35} {x+w} {y} Z',color,INK,8)

def bridge(x1,x2,y,arch=55,color='#c6adb0',piers=5):
    b=R(x1,y-19,x2-x1,26,color,INK,7,3)
    for i in range(1,piers):
        x=x1+(x2-x1)*i/piers
        b+=P(f'M {x-54} {y+54} Q {x} {y-25} {x+54} {y+54}',stroke=INK2,sw=7)
        b+=R(x-8,y+42,16,95,color,INK2,4,3)
    for x in range(int(x1)+20,int(x2),42):b+=L(x,y-42,x,y-20,'#7b9091',4)
    b+=L(x1,y-42,x2,y-42,'#7b9091',5)
    return b

def suspended_bridge(x1,x2,y,py=255,cable='#536b77',pylons=None):
    if pylons is None:pylons=[x1+(x2-x1)*.28,x1+(x2-x1)*.72]
    b=R(x1,y,x2-x1,25,'#b8bac1',INK,7)
    for px in pylons:
        b+=R(px-17,y-py,34,py,'#ece5d9',INK2,8,3)
        b+=R(px-24,y-py+25,48,18,'#e9e5d9',INK2,4)
    # parabola miedzy i poza pylonami, z podwieszonymi linami
    aa=[x1]+pylons+[x2]
    for j in range(len(aa)-1):
        a,bx=aa[j:j+2]
        if j==1: mid=y-py*.37; end=y-py+12
        else: mid=y-py*.5; end=y-py+12 if j==0 else y-py*.42
        b+=P(f'M {a} {y-py+12 if j>0 else y-30} Q {(a+bx)/2} {mid+95} {bx} {y-py+12 if j+1<len(aa)-1 else y-20}',stroke=cable,sw=6)
    for xx in range(int(x1)+44,int(x2),66):
        # lina pionowa (czytelna sylwetka)
        left=min(abs(xx-q) for q in pylons)
        h=25+(py-22)*max(0,1-(left/((x2-x1)*.36)))**1.4
        b+=L(xx,y,xx,y-h,cable,4)
    return b

def port_crane(x,y,s=1):
    b=R(x-11*s,y-275*s,22*s,275*s,'#6b8a93',INK,6*s)
    b+=poly([(x-80*s,y-258*s),(x+160*s,y-258*s),(x+200*s,y-230*s),(x-80*s,y-230*s)],'#e5ab6c',INK,7*s)
    b+=P(f'M {x-80*s} {y-253*s} L {x+160*s} {y-233*s} M {x-11*s} {y-275*s} L {x+115*s} {y-258*s}',stroke=INK2,sw=4*s)
    b+=L(x+142*s,y-255*s,x+142*s,y-84*s,INK2,6*s)
    b+=R(x+104*s,y-85*s,76*s,44*s,'#9fb8af',INK2,5*s)
    return b

def ferry(x,y,s=1,accent='#d36a52'):
    b=poly([(x-360*s,y-88*s),(x+359*s,y-88*s),(x+280*s,y+55*s),(x-275*s,y+55*s)],'#f7f2e5',INK,10*s)
    b+=P(f'M {x-335*s} {y+13*s} L {x+322*s} {y+13*s}',stroke=accent,sw=17*s)
    b+=R(x-257*s,y-191*s,495*s,113*s,'#f5efe2',INK,7*s,5*s)
    b+=R(x-168*s,y-273*s,358*s,88*s,'#e5e9e4',INK,7*s,4*s)
    b+=R(x+65*s,y-326*s,136*s,52*s,'#e9ebe3',INK,7*s,3*s)
    b+=R(x+105*s,y-378*s,50*s,54*s,accent,INK,6*s,3*s)
    for yrow in (y-251*s,y-163*s):
        for idx in range(8):b+=R(x-205*s+idx*57*s,yrow,34*s,20*s,'#80b3c4',INK2,3*s,3*s)
    b+=R(x-220*s,y-75*s,421*s,36*s,'#c1d8d8',INK2,3*s)
    return b

def water_waves(x,y):return P(f'M {x-87} {y} q 37 -12 79 0 t 72 0',stroke='#effcf0',sw=6)

def beacon(x,y,s=1):
    # Morski wiatrak-stawa: biala smukla wieza z czerwonym kopulastym daszkiem.
    b=poly([(x-30*s,y),(x-18*s,y-187*s),(x+18*s,y-187*s),(x+30*s,y)],'#f6f3e8',INK,7*s)
    b+=poly([(x-43*s,y-187*s),(x,y-223*s),(x+43*s,y-187*s)],'#c65546',INK,8*s)
    for i in range(4):
        t=math.pi/4+i*math.pi/2
        b+=L(x,y-174*s,x+math.cos(t)*75*s,y-174*s+math.sin(t)*75*s,'#c55445',8*s)
    b+=C(x,y-174*s,8*s,'#edd8ac',INK2,3*s)
    return b

def church(x,y,s=1,color='#b66f5e',two_towers=True):
    b=R(x-155*s,y-265*s,310*s,265*s,color,INK,9*s)
    b+=poly([(x-165*s,y-264*s),(x,y-324*s),(x+165*s,y-264*s)],'#546d76',INK,8*s)
    b+=R(x-32*s,y-151*s,64*s,135*s,'#534e55',INK,7*s,26*s)
    b+=C(x,y-204*s,18*s,'#98bac5',INK2,5*s)
    dxs=(-107,107) if two_towers else (0,)
    for dx in dxs:
        b+=R(x+dx*s-43*s,y-421*s,86*s,421*s,color,INK,8*s)
        b+=poly([(x+dx*s-53*s,y-421*s),(x+dx*s,y-522*s),(x+dx*s+53*s,y-421*s)],'#536970',INK,8*s)
        for yy in (y-380*s,y-285*s):b+=R(x+dx*s-15*s,yy,30*s,49*s,'#afd8d4',INK2,5*s,15*s)
    return b

def twisted_tower(x,y,s=1):
    b=''
    # krawedzie wiezowca zmieniaja polozenie co kondygnacje; rozpoznawalna helisa.
    layers=15
    for j in range(layers):
        yy=y-j*33*s; ofs=math.sin(j*.42)*33*s
        topofs=math.sin((j+1)*.42)*33*s
        b+=poly([(x-43*s+ofs,yy),(x+44*s+ofs,yy),(x+50*s+topofs,yy-33*s),(x-50*s+topofs,yy-33*s)],'#ecf6f1' if j%2 else '#bad8d9',INK2,5*s)
        b+=L(x-22*s+ofs,yy,x-22*s+topofs,yy-33*s,'#eff9f4',3*s)
    b+=R(x-33*s,y+1*s,70*s,20*s,'#a2b7ba',INK,5*s)
    return b

def swans(x,y):
    b=E(x,y,34,14,'#fffaf2',INK2,4)
    b+=P(f'M {x+15} {y-5} Q {x+32} {y-25} {x+18} {y-39} Q {x+5} {y-54} {x+28} {y-54}',stroke=INK2,sw=7)
    b+=P(f'M {x+27} {y-54} l 15 4 -16 8 z','#f1c46b',INK2,2)
    return b

EXTRAS = {'genewa','bazylea','bergen','stavanger','odense','aarhus','most-wielki-belt','most-oresund'}
ROUTE_IDS = ['zurych','wodospad-renski','oslo','svinesund','goteborg','helsingborg','malmo','ystad','prom-baltyk','kopenhaga','roskilde','most-falster','prom-fehmarn']
ALL_LANDMARKS=ROUTE_IDS+sorted(EXTRAS)

def make_landmark(name):
    b=''
    # przezroczyste tlo powyzej nieba; podglad kompozytowany na kraj
    if name=='zurych':
        b+=hill_back('#8eae9d',638,1)
        for xx,yy,hw in [(90,390,165),(470,245,248),(895,350,215),(1380,225,290)]:
            b+=poly([(xx-hw,710),(xx,yy),(xx+hw,710)],'#91a7b5',INK2,7)
            b+=poly([(xx-hw*.23,yy+130),(xx,yy),(xx+hw*.31,yy+155)],'#f5fbf4','none',0)
        b+=water_front(758)
        for xx in (150,385,1180,1430):b+=house(xx,755,150,178,'#eed5a2','#7b6460','city')
        b+=church(765,757,.77,'#e5b89a',True)
        b+=tower(1052,759,310,79,'#f1ceac','#567482')
        b+=swans(1195,830)+swans(1330,854)
    elif name=='wodospad-renski':
        b+=hill_back('#4f906f',545,.2)
        for x,s in [(125,1),(350,.9),(1270,1.2),(1540,1)]:b+=fir(x,658,s)
        b+=R(0,565,1620,360,'#8ec8bd','none',0)
        b+=poly([(0,572),(570,580),(540,885),(0,885)],'#728e86',INK,9)
        b+=poly([(1050,578),(1620,542),(1620,900),(1080,885)],'#6c8b81',INK,9)
        for x in range(557,1050,74):
            b+=P(f'M {x} 575 C {x-7} 650 {x+29} 700 {x+9} 865',stroke='#f1fff6',sw=62,stroke_opacity='.94')
            b+=P(f'M {x+8} 575 Q {x+36} 740 {x+30} 850',stroke='#80d9dc',sw=16)
        b+=poly([(730,772),(777,525),(826,488),(878,594),(902,780)],'#7f8981',INK,9)
        b+=P('M 0 872 Q 270 842 410 863 T 900 863 T 1620 854',stroke='#f9fff4',sw=22)
        b+=E(807,511,69,23,'#5a9571',INK,6)
    elif name=='genewa':
        b+=hill_back('#9baea1',634,.7)
        for x,top in [(100,330),(355,280),(1250,265),(1520,305)]:
            b+=poly([(x-190,705),(x,top),(x+190,705)],'#a8b8bb',INK2,5)
            b+=poly([(x-55,top+95),(x,top),(x+54,top+110)],'#edf7f2','none',0)
        b+=water_front(755)
        for x in (230,350,1210,1400):b+=house(x,757,135,181,'#efe0bb','#8b6770')
        b+=P('M 815 760 C 800 680 830 510 805 328 C 780 488 786 675 769 762 Z','#f7fffa','#9bdae3',10)
        b+=P('M 805 760 Q 813 515 805 340',stroke='#d2f8ff',sw=14)
        b+=E(800,778,155,32,'#e4f6ec','none',0)
        b+=boat(1190,792,.48)
    elif name=='bazylea':
        b+=hill_back('#9bbb98',641,1.1)
        b+=water_front(771,'#70b7c7')
        for x,w,hh in [(85,135,211),(240,137,186),(395,154,223),(1265,162,208),(1460,174,238)]:
            b+=house(x,765,w,hh,'#e8c79d','#7f5859')
        b+=church(827,758,.84,'#b64f4b',True)
        b+=bridge(80,1550,805,40,'#d8b997',7)
    elif name=='oslo':
        b+=hill_back('#7799a4',580,.7)
        for x,s in [(160,.8),(410,1.1),(1230,.85),(1540,.8)]:b+=fir(x,665,s,'#426d72')
        b+=water_front(780,'#61b0c5')
        # Scena z biala opera nad fiordem, dach dostepny jako nachylona plaszczyzna
        b+=poly([(190,770),(480,575),(700,633),(913,735),(1070,770)],'#eff4ec',INK,11)
        b+=poly([(480,575),(680,595),(1010,760),(775,730)],'#c7dcd8',INK2,6)
        b+=poly([(260,752),(480,605),(635,657),(845,760)],'#fffaf0','none',0)
        b+=R(101,775,1030,27,'#c8d2d0',INK,7,4)
        b+=P('M 1230 613 Q 1330 514 1380 427 Q 1386 418 1400 427 L 1470 520',stroke='#e8e7d5',sw=12)
        b+=poly([(1330,560),(1467,426),(1488,439),(1361,577)],'#9bb8b4',INK2,6)
        b+=boat(1350,808,.57)
    elif name=='bergen':
        b+=hill_back('#64978d',577,.8)
        for x,s in [(115,1),(410,.89),(1350,1.1)]:b+=fir(x,671,s,'#316b65')
        b+=water_front(780)
        for x,c in [(200,'#ce5d4d'),(405,'#e4b268'),(610,'#db7d55'),(815,'#a8af75'),(1025,'#bd4e45'),(1235,'#e5a95e'),(1450,'#cf745e')]:
            b+=house(x,772,185,238,c,'#655454','gabled')
        b+=boat(1180,819,.47)
    elif name=='stavanger':
        b+=hill_back('#84b19c',626,1.0)
        b+=water_front(776)
        for x,c in [(150,'#eee3c8'),(340,'#f5e3d1'),(550,'#e3d5af'),(1210,'#f8eacf'),(1390,'#e8dfc8')]:
            b+=house(x,775,158,170,c,'#a36359','gabled')
        b+=tower(820,769,290,87,'#e9d7aa','#497780')
        b+=boat(1100,830,.69)
        b+=port_crane(1430,733,.6)
    elif name=='svinesund':
        b+=hill_back('#90b49b',658,.4)
        for x,s in [(85,1),(330,.86),(1310,1),(1510,.82)]:b+=fir(x,730,s)
        b+=water_front(795)
        b+=poly([(0,740),(350,690),(375,900),(0,900)],'#637b6f',INK,9)
        b+=poly([(1245,720),(1620,690),(1620,900),(1270,900)],'#557f6e',INK,9)
        b+=R(275,611,1054,25,'#d5d8cf',INK,9)
        b+=P('M 300 632 Q 801 210 1300 632',stroke='#e7e5df',sw=27)
        for xx in range(376,1265,78):
            y=632-422*math.sqrt(max(0,1-((xx-801)/501)**2))
            b+=L(xx,625,xx,y,'#b8c3b9',5)
        b+=elk(153,775,.47)
    elif name=='goteborg':
        b+=hill_back('#8cb9ab',649,.7)
        b+=water_front(787)
        b+=port_crane(215,762,.94)+port_crane(1180,767,1.08)
        for x,c in [(410,'#e5af83'),(610,'#c2d2b4'),(855,'#e8c095'),(1430,'#d9a48f')]:
            b+=house(x,781,178,222,c,'#758083')
        b+=R(511,755,518,27,'#93aeae',INK,7)
        for x in range(540,1010,89):b+=R(x,738,47,29,'#b6d8d7',INK2,4)
        b+=R(610,777,260,68,'#d2b75a',INK,7,10)
        b+=R(638,787,38,18,'#84b4c0',INK2,3,2)
        b+=C(658,849,17,INK,'none',0)+C(810,849,17,INK,'none',0)
    elif name=='helsingborg':
        b+=hill_back('#9cb79c',676,.9)
        b+=water_front(778)
        for x in (170,365,1130,1340,1510):b+=house(x,776,150,154,'#e8d0ac')
        b+=R(648,778-352,190,352,'#b85b4b',INK,10)
        for yy in range(490,731,82):
            for xx in (700,785):b+=R(xx-11,yy,26,42,'#394955',INK2,5,14)
        b+=R(620,414,247,44,'#ad514a',INK,9)
        b+=poly([(629,415),(750,349),(861,415)],'#754a50',INK,8)
        b+=ferry(1254,809,.47)
    elif name=='malmo':
        b+=hill_back('#b0c8a5',667,.4)
        b+=water_front(779)
        b+=twisted_tower(455,769,.94)
        b+=house(1310,775,170,191,'#c1745e','#586c69','city')
        b+=house(1510,777,160,172,'#e4c4a1','#596972','city')
        b+=suspended_bridge(750,1480,748,170)
    elif name=='most-oresund':
        b+=water_front(771)
        b+=hill_back('#86aaa0',779,.4)
        b+=water_front(795)
        b+=suspended_bridge(70,1590,706,345)
        b+=boat(1330,825,.47)
        b+=gull(340,230,1.4)+gull(1170,275,.9)
    elif name=='ystad':
        b+=hill_back('#9ab7a0',672,.9)
        b+=water_front(783)
        for x,c in [(140,'#e2c49d'),(340,'#eccd94'),(550,'#daaa7e'),(750,'#e2bd9c')]:
            b+=house(x,783,172,207,c,'#795456','half')
        b+=ferry(1245,804,.61)
        b+=gull(1330,343,1.2)
    elif name=='prom-baltyk':
        b+=water_front(734,'#4a99bd')
        b+=ferry(734,745,1.1,'#d35f4c')
        b+=beacon(1490,727,1.03)
        for x,y,s in [(169,257,1),(476,179,1.5),(1336,221,1.2)]:b+=gull(x,y,s)
        b+=water_waves(700,855)+water_waves(250,860)
    elif name=='kopenhaga':
        b+=water_front(777,'#6ab9c4')
        for x,color in [(120,'#e2a469'),(315,'#b75e53'),(505,'#f0cb82'),(700,'#8aab99'),(900,'#d99a78'),(1090,'#bd6559'),(1345,'#edc078'),(1520,'#bf7760')]:
            b+=house(x,776,159,232,color,'#5a676a','gabled')
        b+=tower(907,774,332,71,'#eab78d','#687880')
        b+=bridge(100,1520,812,40,'#d6b6a1',6)
        b+=grp(cyclist(0,0,.69),300,828,.65)
        b+=boat(1100,849,.38)
    elif name=='roskilde':
        b+=hill_back('#b0c790',638,.2)
        b+=water_front(758,'#70bbc1')
        # klasyczna lodz typu drakkar bez symboli religijnych
        b+=poly([(280,734),(310,827),(1100,827),(1152,734),(1170,686),(1100,710),(330,710),(260,690)],'#ad7450',INK,12)
        b+=P('M 320 705 Q 185 620 244 562 Q 315 567 332 699',stroke='#986147',sw=23)
        b+=P('M 1093 699 Q 1210 603 1170 537 Q 1104 564 1094 699',stroke='#986147',sw=24)
        b+=L(705,710,705,377,INK,12)
        b+=poly([(715,398),(1030,646),(715,666)],'#f4dcb0',INK2,7)
        for x in range(360,1060,75):b+=C(x,736,16,'#edc690',INK2,5)
        b+=church(1403,763,.45,'#c76d5c',True)
    elif name=='odense':
        b+=hill_back('#9bb98d',678,.7)
        b+=ground_front(793,'#8fbb82')
        for x,col in [(170,'#e9ba8c'),(380,'#c95d51'),(630,'#e5c697'),(870,'#e5a67b'),(1150,'#e4c089'),(1390,'#ba8e79')]:
            b+=house(x,788,176,197,col,'#785d58','half')
        b+=grp(cyclist(0,0,1.2),1180,832,.7)
        b+=fir(55,750,.6,'#6a9c67')
    elif name=='aarhus':
        b+=water_front(783,'#68b5c2')
        for x,c,h in [(150,'#c9755b',210),(380,'#e4bd90',242),(600,'#de9f79',195),(850,'#ba725e',210),(1090,'#e4c58d',259),(1450,'#abafa0',216)]:
            b+=house(x,774,170,h,c,'#596c74','gabled')
        b+=poly([(830,575),(983,319),(1105,575)],'#e0e6da',INK,10)
        b+=R(895,572,157,196,'#c3d9d6',INK2,7)
        b+=port_crane(1324,760,.64)
        b+=boat(270,823,.45)
    elif name=='most-falster':
        b+=hill_back('#a5c48e',743,.2)
        b+=water_front(774,'#75bac5')
        b+=suspended_bridge(90,1540,738,205)
        b+=gull(392,252,1.2)+gull(1334,294,1)
    elif name=='most-wielki-belt':
        b+=hill_back('#b2c996',780,.3)
        b+=water_front(791)
        b+=suspended_bridge(60,1560,681,355)
        b+=gull(250,260,1.1)+gull(1470,330,.8)
        b+=boat(1250,831,.42)
    elif name=='prom-fehmarn':
        b+=water_front(755)
        b+=ferry(720,743,1.03,'#d18d50')
        for x in (105,1460):b+=windmill(x,745,.7)
        b+=gull(230,253,1.3)+gull(1320,281,.9)
    else:raise ValueError(name)
    return b

# -------------------- sklady podgladow i metadane --------------------
def checker(size, cell=22, a='#e1e7ed',b='#f6f8fa'):
    pic=Image.new('RGBA',size,a); d=ImageDraw.Draw(pic)
    for y in range(0,size[1],cell):
        for x in range(0,size[0],cell):
            if ((x//cell)+(y//cell))%2:d.rectangle((x,y,x+cell,y+cell),fill=b)
    return pic

def font(pt=26):
    for p in ('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf','/usr/share/fonts/truetype/liberation2/LiberationSans-Regular.ttf'):
        if os.path.exists(p):return ImageFont.truetype(p,pt)
    return ImageFont.load_default()

def label(draw, x,y,msg,size=25,color=(36,55,74)):
    draw.text((x,y),msg,fill=color,font=font(size))

def paste_thumb(canvas,img,xy,wh,chequer=True):
    x,y=xy;w,h=wh
    if chequer:canvas.paste(checker((w,h),max(10,int(min(w,h)/24))),(x,y))
    im=img.copy();im.thumbnail((w,h),Image.Resampling.LANCZOS)
    x2=x+(w-im.width)//2;y2=y+(h-im.height)//2
    canvas.alpha_composite(im,(x2,y2))
    ImageDraw.Draw(canvas).rounded_rectangle((x-2,y-2,x+w+1,y+h+1),radius=3,outline='#a6b7c0',width=3)

def composite_country(cc,images,landmark_id):
    out=images['sky'].copy()
    out.alpha_composite(images['clouds'].crop((0,0,1080,600)),(0,122))
    out.alpha_composite(images['far'].crop((200,0,1280,900)),(0,638))
    lm=Image.open(LM/f'{landmark_id}.png').convert('RGBA')
    lm.thumbnail((950,660),Image.Resampling.LANCZOS)
    out.alpha_composite(lm,(max(0,(1080-lm.width)//2),760))
    out.alpha_composite(images['near'].crop((430,0,1510,720)),(0,992))
    out.alpha_composite(images['road'],(0,1590))
    return out

def contact_country(cc,images,lm):
    W,H=2320,1280
    board=Image.new('RGBA',(W,H),'#f3f4f2');d=ImageDraw.Draw(board)
    d.rectangle((0,0,W,80),fill='#293e51')
    label(d,32,21,f'{cc.upper()}  /  {COUNTRIES[cc]["name"]}  /  podglad spriteow',32,'#fff9e6')
    comp=composite_country(cc,images,lm)
    paste_thumb(board,comp,(35,110),(576,1024),False)
    label(d,70,1163,f'Kompozycja  /  {lm}',24)
    offx=652; avail=1585
    labels=[('clouds',213),('far',318),('near',256),('road',121)]
    y=113
    for lname,hh in labels:
        label(d,offx,y-2,f'{cc}-{lname}.png    /    dwa identyczne kafelki obok siebie',23)
        y+=39
        img=images[lname]
        # width double tiled as 2x image with same proportions
        strip=Image.new('RGBA',(img.width*2,img.height),'#00000000')
        strip.alpha_composite(img,(0,0));strip.alpha_composite(img,(img.width,0))
        if lname=='road':
            # Celowo osobna skala pionowa w podgladzie: widoczne sa cale dwa powtorzenia.
            drawn=strip.resize((avail,hh),Image.Resampling.LANCZOS)
            board.paste(checker((avail,hh)),(offx,y))
            board.alpha_composite(drawn,(offx,y))
            ImageDraw.Draw(board).rectangle((offx-2,y-2,offx+avail+1,y+hh+1),outline='#a6b7c0',width=3)
        else:paste_thumb(board,strip,(offx,y),(avail,hh))
        # linia szwu sluzy wylacznie w debug-podgladzie, nie w spricie
        d=ImageDraw.Draw(board)
        midx=offx+avail//2
        d.line((midx,y,midx,y+hh),fill=(238,101,65,160),width=2)
        y+=hh+24
    board.convert('RGB').save(OUT/cc/'preview.png',optimize=True)
    return comp

def contact_landmarks():
    cols=4;cw=585;ch=375
    rows=math.ceil(len(ALL_LANDMARKS)/cols)
    W,H=2420,100+rows*ch
    pic=Image.new('RGBA',(W,H),'#f5f6f3');draw=ImageDraw.Draw(pic)
    draw.rectangle((0,0,W,74),fill='#293e51')
    label(draw,32,17,'Punkty trasy i dodatkowe panoramy  /  1620 x 900',29,'#fff9e6')
    for i,name in enumerate(ALL_LANDMARKS):
        col,row=i%cols,i//cols
        x=26+col*600;y=110+row*ch
        img=Image.open(LM/f'{name}.png').convert('RGBA')
        paste_thumb(pic,img,(x,y),(560,311))
        label(draw,x+12,y+317,name+('  [+]' if name in EXTRAS else ''),20)
    pic.convert('RGB').save(LM/'preview.png',optimize=True)
    return pic

def root_contact(grounds,landmarks):
    W,H=2660,1840
    board=Image.new('RGBA',(W,H),'#f1f4f3');d=ImageDraw.Draw(board)
    d.rectangle((0,0,W,75),fill='#293e51')
    label(d,35,20,'Z09 / Tla CH, NO, SE, DK + panorama promu i mostow',30,'#fff9e6')
    for i,cc in enumerate(COUNTRIES):
        x=42+i*655;y=115
        comp=grounds[cc]
        paste_thumb(board,comp,(x,y),(610,765),False)
        label(d,x+15,895,COUNTRIES[cc]['name']+' / '+cc,22)
    # miniatury wszystkich 21 panoram (na szachownicy)
    d.rectangle((25,947,W-25,987),fill='#d9e4e2')
    label(d,39,950,'Wszystkie sylwetki punktow — na szachownicy',23)
    for i,name in enumerate(ALL_LANDMARKS):
        col=i%7;row=i//7;x=29+col*376;y=1024+row*260
        pic=Image.open(LM/f'{name}.png').convert('RGBA')
        paste_thumb(board,pic,(x,y),(358,203))
        label(d,x+8,y+208,name,17)
    board.convert('RGB').save(ROOT/'preview.png',optimize=True)
    return board

def write_markdown():
    for cc in COUNTRIES:
        lines=[f'# Zasoby: {COUNTRIES[cc]["name"]} ({cc.upper()})','',
         '| Plik | Źródło/narzędzie | Licencja | Autor / uwagi |',
         '|---|---|---|---|']
        for layer in ('sky','clouds','far','near','road'):
            note={
             'sky':'1080×1920; statyczny gradient, ciepłe światło z lewej góry; nie kafelkować',
             'clouds':'2160×600; bezszwowy kafelek, alpha; mnożnik 0,15',
             'far':'2160×900; bezszwowy kafelek, alpha; mnożnik 0,25',
             'near':'2160×720; bezszwowy kafelek, alpha; mnożnik 0,5',
             'road':'1080×330; bezszwowy kafelek, mnożnik 1,0'}[layer]
            lines.append(f'| `{cc}-{layer}.png` | Ilustracja wektorowa narysowana proceduralnie: Python / CairoSVG / Pillow | własna — do użytku projektu | {note} |')
        lines+=['| `preview.png` | Kompozycja i test powtarzania kafelków: Pillow | własna — do użytku projektu | Zawiera etykiety informacyjne i czerwoną linię szwu, tylko dla koordynatora, nie do gry. |','',
        '## Integracja','',
        'Pliki zawierają grafikę @3x. Kolejność warstw od spodu: `sky`, `clouds`, `far` + okazjonalny `landmark`, `near`, `road`.','',
        'Każda warstwa jest gotowym, niezależnym PNG w sRGB, bez tekstu i prawdziwych marek.']
        (OUT/cc/'ASSETS.md').write_text('\n'.join(lines)+'\n',encoding='utf-8')
    lines=['# Punkty trasy / landmarks','',
        '| Plik | Źródło/narzędzie | Licencja | Autor / uwagi |',
        '|---|---|---|---|']
    for k in ALL_LANDMARKS:
        line='Dodatkowy motyw z briefu, nie ma `country` CH/NO/SE/DK w aktualnym `waypoints.ts`' if k in EXTRAS else 'Identyfikator z `src/content/waypoints.ts`'
        lines.append(f'| `{k}.png` | Autorska ilustracja wektorowa, Python / CairoSVG / Pillow | własna — do użytku projektu | 1620×900, przezroczyste tło, {line}. |')
    lines+=['| `preview.png` | Arkusz kontaktowy: Pillow | własna — do użytku projektu | Wszystkie panoramy na szachownicy. ` [+] ` oznacza dodatki poza aktualną trasą. |','',
        '## Uwagi','',
        '- Promy: sylwetki generyczne bez oznaczeń linii i bez znaków towarowych.',
        '- Zabytki i ikony miejsc: stylizowane, uproszczone sylwetki, nie oficjalne wizerunki.',
        '- `most-oresund.png` jest dodatkowym plikiem z briefu, niezależnym od motywu w `malmo.png`.',
        '- Daty/odległości w `waypoints.ts` nie były zmieniane. Krajowości punktów wyznaczono wyłącznie na podstawie `country`.','']
    (LM/'ASSETS.md').write_text('\n'.join(lines),encoding='utf-8')

def validate_files():
    wanted={}
    for cc in COUNTRIES:
        for part,dims in [('sky',(1080,1920)),('clouds',(2160,600)),('far',(2160,900)),('near',(2160,720)),('road',(1080,330))]:
            wanted[OUT/cc/f'{cc}-{part}.png']=dims
    for k in ALL_LANDMARKS:wanted[LM/f'{k}.png']=(1620,900)
    issues=[]
    for path,dims in wanted.items():
        im=Image.open(path)
        if im.size != dims:issues.append(f'Wymiar: {path} {im.size} != {dims}')
        if im.mode!='RGBA':issues.append(f'Format: {path}: {im.mode} (oczekiwany RGBA)')
        size=path.stat().st_size
        size_limit=1200*1024 if path.parent!=LM else 300*1024
        if size>=size_limit:issues.append(f'Budzet: {path.name}: {size:,} / {size_limit:,}')
        if path.name.endswith(('-clouds.png','-far.png','-near.png')) and not im.getextrema()[3][0]==0:
            issues.append(f'Brak przezroczystosci: {path.name}')
        if path.parent==LM and im.getpixel((0,0))[3]!=0:
            issues.append(f'Brak alpha landmark: {path.name}')
        if path.name.endswith(('-far.png','-near.png','-clouds.png','-road.png')):
            # Ocena pixeli po obu stronach; nie dodawaj antyaliasowego paska maskujacego.
            left=im.crop((0,0,1,im.height)).convert('RGBA')
            right=im.crop((im.width-1,0,im.width,im.height)).convert('RGBA')
            aa=list(left.getdata());bb=list(right.getdata())
            q=sum(1 for a,b in zip(aa,bb) if max(abs(a[i]-b[i]) for i in range(4))>20)
            if q>im.height*.09:issues.append(f'Szew ({q}/{im.height} pikseli): {path.name}')
    return wanted,issues

def zip_folder():
    path=Path('/mnt/data/cebulak-09-assets.zip')
    with zipfile.ZipFile(path,'w',compression=zipfile.ZIP_DEFLATED,compresslevel=9) as z:
        for item in sorted(ROOT.rglob('*')):
            if item.is_file() and '__pycache__' not in str(item):
                z.write(item,arcname=item.relative_to(ROOT))
    return path

def main():
    grounds={}
    local_default={'ch':'zurych','no':'oslo','se':'malmo','dk':'kopenhaga'}
    print('Renderowanie warstw krajowych ...',flush=True)
    for cc in COUNTRIES:
        images={}
        for lname,func,w,h in [('sky',local_sky,1080,1920),('clouds',country_clouds,2160,600),('far',country_far,2160,900),('near',country_near,2160,720),('road',country_road,1080,330)]:
            dst=OUT/cc/f'{cc}-{lname}.png'
            images[lname]=save_png(dst,w,h,func(cc))
            print(cc,lname,dst.stat().st_size//1024,'KiB',flush=True)
        grounds[cc]=images
    print('Renderowanie panoram ...',flush=True)
    for landmark in ALL_LANDMARKS:
        dst=LM/f'{landmark}.png'
        save_png(dst,1620,900,make_landmark(landmark))
        print(landmark,dst.stat().st_size//1024,'KiB',flush=True)
    write_markdown()
    composites={}
    for cc in COUNTRIES:composites[cc]=contact_country(cc,grounds[cc],local_default[cc])
    contact_landmarks()
    root_contact(composites,None)
    wanted,issues=validate_files()
    print('Sprites:',len(wanted))
    for msg in issues:print('UWAGA:',msg)
    # Plik walidacji do przegladu i opis techniczny archiwum
    (ROOT/'QA-09.md').write_text('# Walidacja Z09\n\n'+
        f'- Sprite PNG: **{len(wanted)}**; tła: 20, panoramy: {len(ALL_LANDMARKS)}.\n'+
        '- Rozdzielczość: @3x; kolory: PNG RGBA / sRGB.\n'+
        '- Test: dokładny rozmiar, tryb RGBA, kanał alpha i porównanie brzegów kafelków.\n'+
        ('- Brak błędów walidacji.\n' if not issues else '- Wykryte uwagi:\n'+''.join('  - '+x+'\n' for x in issues))+
        '- Testy typu TypeScript/Vitest/build wymagają pełnego repozytorium; zlecenie zawiera wyłącznie zasoby graficzne.\n'+
        '- Generator: `tooling/generate_09.py` (środowisko deweloperskie: Python, Pillow i CairoSVG).\n',encoding='utf-8')
    if issues: raise RuntimeError('Nieudany QA; popraw bledy przed pakowaniem')
    z=zip_folder()
    print('ARCHIWUM',z,'MB',round(z.stat().st_size/1024/1024,2),flush=True)
    if issues:print('Problemy:',len(issues))

if __name__=='__main__':main()
