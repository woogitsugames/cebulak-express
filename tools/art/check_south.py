#!/usr/bin/env python3
"""Zlecenie 56: kontrola wymiarow, sRGB, alfa, szwow i krawedzi asfaltu."""
from pathlib import Path
from PIL import Image

ROOT=Path(__file__).resolve().parents[4]
COUNTRIES=('es','it','at','cz')
SIZES={'sky':(1080,1920),'clouds':(2160,600),'far':(2160,900),'near':(2160,720),'road':(1080,330)}
LANDMARKS=('madryt','barcelona','walencja','rzym','mediolan','neapol','bolonia','wieden','graz','linz','salzburg','praga','brno','ostrawa')
count=0

def verify(path,size,*,tiled=False,transparent=False,max_bytes=1200*1024):
    global count
    assert path.exists(),f'Brak pliku: {path}'
    assert path.stat().st_size<max_bytes,f'Budzet PNG: {path} = {path.stat().st_size}'
    with Image.open(path) as im:
        assert im.size==size,f'Wymiary {path}: {im.size} != {size}'
        assert im.info.get('srgb')==0,f'Brak sRGB w {path}'
        if transparent:assert im.getextrema()[-1][0]==0,f'Brak przezroczystosci: {path}'
        if tiled:
            a=im.convert('RGBA')
            assert a.crop((0,0,1,a.height)).tobytes()==a.crop((a.width-1,0,a.width,a.height)).tobytes(),f'Szew: {path}'
    count+=1

def road_edge(path):
    # Ta sama procedura wyboru kandydata co tools/art/measure-road.mjs z main 30.10.2026.
    with Image.open(path) as im:
        im=im.convert('RGBA'); w,h=im.size;px=im.load()
        dark=[];med=[]
        for y in range(h):
            vals=[]
            for x in range(0,w,9):
                r,g,b,a=px[x,y]
                if a<220:continue
                lum=r*0.2126+g*0.7152+b*0.0722
                vals.append(lum)
            vals.sort()
            dark.append(sum(v<145 for v in vals)/len(vals) if vals else 0)
            med.append(vals[len(vals)//2] if vals else 255)
        candidates=[]
        for y in range(35,min(h-65,int(h*.56))):
            if dark[y]<.70:continue
            jump=abs(med[y]-med[y-1])
            if jump<13:continue
            if sum(dark[y+k]>.63 for k in range(48))<43:continue
            previous=sum(dark[k]>.70 for k in range(y-60,y-21) if k>=0)
            if previous>34:continue
            later=sum(abs(med[k]-med[k-1])>15 for k in range(y+2,y+47))
            candidates.append((later,previous,-jump,y))
        assert candidates,f'Nie rozpoznano asfaltu: {path}'
        candidates.sort();edge=candidates[0][3]
        assert abs(edge-150)<=3,f'Asfalt {path}: {edge} zamiast 150'
        assert all(px[x,329][3]>=220 for x in range(w)),f'Przezroczysty dol drogi: {path}'
        return edge

if __name__=='__main__':
    for cc in COUNTRIES:
        directory=ROOT/f'public/assets/countries/{cc}'
        for layer,size in SIZES.items():
            verify(directory/f'{cc}-{layer}.png',size,tiled=layer!='sky',transparent=layer in ('clouds','far','near'))
        for layer in ('sky','far','near'):
            verify(directory/f'{cc}-{layer}-zima.png',SIZES[layer],tiled=layer!='sky',transparent=layer in ('far','near'))
        print(f'{cc.upper()} droga: piksel {road_edge(directory/f"{cc}-road.png")}')
        for suffix in ('','-zima'):
            verify(ROOT/f'docs/art/podglady/countries-{cc}-preview{suffix}.png',(1080,1920),max_bytes=1200*1024)
        assert (directory/'ASSETS.md').exists()
    for city in LANDMARKS:
        verify(ROOT/f'public/assets/landmarks/{city}.png',(1620,900),transparent=True,max_bytes=300*1024)
    assert (ROOT/'public/assets/landmarks/ASSETS-56.md').exists()
    print(f'OK: {count} obrazow PNG (32 tla, 14 panoram, 8 podgladow); 4 drogi z krawedzia y=150')
