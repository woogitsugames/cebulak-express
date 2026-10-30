#!/usr/bin/env python3
"""Walidacja PNG zlecenia 07: wymiary, alfa, kafelki, budzet i identyfikatory."""
from pathlib import Path
import sys
from PIL import Image

HERE = Path(__file__).resolve().parent
LANDMARKS = HERE.parent.parent / 'landmarks'
COUNTRY = {
 'pl-sky.png':(1080,1920),'pl-clouds.png':(2160,600),
 'pl-far.png':(2160,900),'pl-near.png':(2160,720),'pl-road.png':(1080,330),
 'pl-sky-zima.png':(1080,1920),'pl-far-zima.png':(2160,900),
 'pl-near-zima.png':(2160,720),'pl-border-near.png':(2160,720),
}
LANDMARK_NAMES = [
 'poznan','lodz','warszawa','wroclaw','szczecin','legnica',
 'granica-swiecko','stacja-swiecko','granica-jedrzychowice','stacja-jedrzychowice',
 'swinoujscie','stacja-swinoujscie','granica-stacja','dom-meta','dom-meta-zima'
]
TILE_NAMES = {'pl-clouds.png','pl-far.png','pl-near.png','pl-road.png',
              'pl-far-zima.png','pl-near-zima.png'}

def check(path,size,tile=False):
    assert path.is_file(),f'Brak {path}'
    with Image.open(path) as img:
        assert img.size == size,(path,img.size,size)
        assert img.mode in ('RGBA','P'),(path,img.mode)
        assert b'sRGB' in path.read_bytes()[:128],f'{path}: brak deklaracji sRGB'
        assert path.stat().st_size < (1200000 if path.parent == HERE else 300000),f'{path}: przekroczony budzet'
        pixels=img.convert('RGBA')
        if tile:
            assert pixels.crop((0,0,1,img.height)).tobytes() == pixels.crop((img.width-1,0,img.width,img.height)).tobytes(),f'Szew: {path}'
        if path.parent == LANDMARKS or path.name in ('pl-near.png','pl-far.png','pl-clouds.png','pl-near-zima.png','pl-far-zima.png','pl-border-near.png'):
            assert pixels.getpixel((0,0))[3]==0,f'Brak przezroczystosci: {path}'

for name,size in COUNTRY.items():check(HERE/name,size,name in TILE_NAMES)
for name in LANDMARK_NAMES:check(LANDMARKS/(name+'.png'),(1620,900))
for folder in [HERE,LANDMARKS]:
    assert (folder/'ASSETS.md').is_file()
    assert (folder/'preview.png').is_file()
print(f'OK: {len(COUNTRY)} warstw, {len(LANDMARK_NAMES)} panoram, alfa/sRGB/wymiary/budzet/szew')
