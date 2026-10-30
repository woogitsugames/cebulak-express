# Zlecenie 78 — panoramy A+ (UK i Frankfurt nad Menem)

**Data:** 30.10.2026. **Projekt:** Cebulak Express — Kierunek Polska.

**Status:** pliki graficzne są przygotowane w oddzielnym archiwum ZIP, ponieważ środowisko nie ma dostępu do git push plików binarnych. Ten plik jest dokumentacją gałęzi; po imporcie ZIP zostanie zastąpiony pełną wersją z kompletem promptów odtworzeniowych.

## Zasoby i kadry

| Plik | Miasto / ID | Rozpoznawalne elementy | Perspektywa |
|---|---|---|---|
| `londyn.png` | Londyn / `londyn` | Westminster z Elizabeth Tower, Westminster Bridge, London Eye | Z południowego brzegu Tamizy na wschód od Westminster Bridge, ku zachodowi; parlament po lewej, koło po prawej |
| `birmingham.png` | Birmingham / `birmingham` | Rotunda, St Martin in the Bull Ring, falista fasada Bullring/Selfridges bez szyldów | St Martin's Square, spojrzenie na północ; pominięto kanał i bibliotekę, nieobecne z tego punktu |
| `manchester.png` | Manchester / `manchester` | Beetham Tower, ceglany wiadukt, magazyny i kanał Castlefield | Widok na centrum z kanałów Castlefield |
| `edynburg.png` | Edynburg / `edynburg` | Zamek na Castle Rock, Old Town, Scott Monument | Widok na zachód–południowy zachód z Calton Hill, bez Arthur's Seat |
| `frankfurt-main.png` | Frankfurt nad Menem / `frankfurt-main` | Mainhattan, katedra, stare kamienice, Eiserner Steg | Widok ku północy z nadbrzeża Sachsenhausen, uproszczony artystycznie |

## Generator i prompty

**Narzędzia:** natywny generator obrazów ChatGPT (GPT Image / DALL·E), retusz Pillow/OpenCV. Wszystkie pliki: PNG RGBA, ICC sRGB, **1620×900**, przezroczyste niebo, ciemnogranatowy obrys `#1d2f3b`, płaskie barwy i linia gruntu na dole. Bez napisów, logotypów, reklam, flag i rozpoznawalnych postaci.

- **Londyn — prompt:** Wide flat-vector Thames skyline, Westminster Palace and Elizabeth Tower on the left, Westminster Bridge in the foreground, London Eye on the right, warm sandstone and teal river, dark-navy 9–10px outlines, transparent sky, no text, logos or people.
- **Birmingham — prompt:** Flat-vector skyline of the Bullring from St Martin's Square: cylindrical Rotunda, Gothic St Martin church, organic disc-covered Bullring facade, warm palette, thick navy outlines, transparent background and no company signs.
- **Manchester — prompt:** Flat-vector Castlefield waterfront, tall Beetham Tower, railway viaduct with wide brick arches, red-brick warehouses, blue-green canal, thick navy line art, transparent sky, no people or brand marks.
- **Edynburg — prompt:** Flat-vector Calton Hill panorama, Edinburgh Castle on a rocky ridge, Old Town roofs and Scott Monument, warm sandstone, thick dark-navy outlines, no sky or inscriptions. Wyodrębniono z wygenerowanego przez ChatGPT arkusza miast; ręczne kadrowanie i skalowanie.
- **Frankfurt — prompt:** Flat-vector Sachsenhausen river view, Mainhattan towers, Kaiserdom, old-town gabled facades and Eiserner Steg bridge, blue-grey glass and teal river, dark-navy outlines, transparent background. Wyodrębniono z wygenerowanego przez ChatGPT arkusza miast; ręczne kadrowanie i skalowanie.

## Źródło i prawa

Grafiki wygenerowano na zamówienie właściciela projektu do jego wykorzystania i obróbki zgodnie z warunkami OpenAI i obowiązującym prawem. Materiały nie kopiują fotografii ani logotypów, ale nie deklaruje się wyłącznej ochrony autorskiej surowych wyników AI. UK: [CDPA §62](https://www.legislation.gov.uk/ukpga/1988/48/section/62); Niemcy: [UrhG §59](https://www.gesetze-im-internet.de/urhg/__59.html).

**Podgląd:** `docs/art/podglady/panoramy-78.png` w ZIP. **Weryfikacja:** sprawdzono rozmiar, RGBA, profil sRGB i widok w skali około 1:5; nie wykonano integracyjnego testu w działającej grze ani npm CI.
