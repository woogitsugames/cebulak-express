# ASSETS-104 — panorama A+ Czeskiego Cieszyna

**Projekt:** Cebulak Express — Kierunek Polska  
**Data opracowania:** 31 października 2026 r.  
**Narzędzie:** wbudowany generator obrazów ChatGPT (GPT Image), następnie przygotowanie eksportu za pomocą Pillow.  
**Zakres:** jedna ilustracja wygenerowana przez AI, PNG RGBA 1620 × 900 px, profil sRGB.

| Id / plik | Miasto | Budowle i otoczenie | Punkt widzenia | Źródło / licencja |
|---|---|---|---|---|
| `cesky-tesin` / `cesky-tesin.png` | Czeski Cieszyn, Czechy | Po lewej neogotycki kościół Najświętszego Serca Jezusowego z wysoką wieżą; pośrodku ochrowy ratusz na náměstí ČSA z zegarem w ozdobnym szczycie; po prawej Most Przyjaźni (Most Družby), z filarami i balustradą; poniżej Olza, drzewa i ciągłe nabrzeże | Stylizowany widok z polskiego brzegu Olzy w stronę Czeskiego Cieszyna; kompozycja rozpoznawcza, nie dokładna projekcja fotograficzna z jednego punktu | Wygenerowane w ChatGPT (GPT Image), bez kopiowania fotografii. Zasób przygotowany dla właściciela projektu do wykorzystania komercyjnego zgodnie z warunkami narzędzia i prawem właściwym. |

## Prompt / brief zastosowany do generacji

> Płaska, ciepła, spójna panorama rysunkowa w stylu A+ miasta Český Těšín, szeroki poziomy kadr 1,8:1. Widok zza rzeki Olzy. Lewą stronę zajmuje duży neogotycki kościół z wysoką strzelistą wieżą, środek duży ratusz o ochrowej elewacji i dekoracyjnym szczycie z zegarem, a po prawej Most Przyjaźni / Most Družby ze wspornikami, filarami i balustradą, narysowany identycznym stylem jak budynki; most nie zasłania ratusza. Rzeka i nabrzeże przebiegają jednym ciągłym pasem, bez doklejanych bloków i widocznych łączeń. Duże sylwetki, mało detali, niższe kamienice z tyłu, zielone drzewa. Płaskie ciepłe barwy, mocny kontur w ciemnym granacie zbliżonym do `#1d2f3b`, światło od lewej góry, miękkie cienie w płaskich plamach. Bez gradientów, tekstur fotograficznych, nieba, chmur, napisów, szyldów, reklam, logo, flag, herbów i ludzi na pierwszym planie. Tło przezroczyste, rzeka dochodzi do dolnej krawędzi.

*Opis stanowi brief redakcyjny ze zlecenia, a nie dosłowny zapis wewnętrznego promptu generatora.*

## Postprodukcja i kontrola

- Rozdzielczość wyjściowa: 1683 × 935 px; skalowanie proporcjonalne do **1620 × 900 px** bez przycinania.
- Zachowano kanał przezroczystości alfa; obszary kryjące ustawiono jako nieprzezroczyste, przy zachowaniu antyaliasingu konturów.
- PNG z osadzonym profilem **sRGB**.
- Zweryfikowano wymiary, tryb **RGBA**, przezroczystość tła i obecność rzeki przy dolnej krawędzi.
- Arkusz kontrolny na jasnoniebieskim tle: `docs/art/podglady/panoramy-104.png` (również podgląd 1:5).
- Kompozycja jest **ilustracyjną syntezą**, a nie dokładną panoramą fotograficzną; relacje przestrzenne budynków należy skontrolować pod kątem rozpoznawalności.

## Źródła do sprawdzenia wyglądu obiektów (niekopiowane)

1. Ratusz na náměstí ČSA: https://www.turistika.cz/mista/cesky-tesin-radnice-na-namesti-csa/detail
2. Kościół Najświętszego Serca Jezusowego: https://slovo.proglas.cz/nase-porady/pred-kostelem/jubilejni-kostel-nejsvetejsiho-srdce-jezisova-v-ceskem-tesine/
3. Most Przyjaźni: https://www.slaskcieszynski.travel/culturalheritage/1019465/most-przyjani

**Prawa:** Wygenerowany samodzielnie zasób, bez użycia cudzych obrazów jako elementów montażu. Właściciel projektu może wykorzystywać wynik zgodnie z warunkami dostawcy narzędzia; nie deklaruje się wyłącznych praw do samych budowli ani gwarantowanej ochrony prawnoautorskiej AI w każdym państwie.
