# Zlecenie 100 — ASSETS panoram A+

Data: 2026-10-31. Projekt: Cebulak Express — Kierunek Polska.

## Status przekazania

Pięć panoram, arkusz podglądu i pełna wersja tego wykazu zostały przygotowane w paczce `zlecenie-100-panoramy-A-plus.zip`, przekazanej w rozmowie właścicielowi projektu. Grafiki PNG są **tylko w ZIP**, nie znajdują się jeszcze w tej gałęzi GitHub. Koordynator powinien rozpakować paczkę do katalogu głównego repozytorium, zachowując ścieżki; ta dokumentacja zostanie wtedy nadpisana rozszerzoną wersją z ZIP. **Nie scalać PR przed dołączeniem obrazów.**

## Zasoby

| Plik w ZIP | Miasto | Rozpoznawalne obiekty / punkt widzenia | Narzędzie i licencja |
|---|---|---|---|
| `public/assets/landmarks/parnu.png` | Pärnu | Neoklasycystyczne historyczne kąpielisko Pärnu Mud Baths; modernistyczny Pärnu Beach House. Uproszczony widok z promenady i plaży. | ChatGPT GPT Image, 2026-10-31; prawa korzystania właściciela projektu |
| `public/assets/landmarks/ryga.png` | Ryga | Katedra Ryska, historyczne wieże św. Piotra / św. Jakuba, nabrzeże Dźwiny; stylizowany widok z zachodniego brzegu. | Jak wyżej |
| `public/assets/landmarks/bauska.png` | Bauska | Zamek Bauska — renesansowa rezydencja i średniowieczny zespół obronny. Umowny widok znad rzeki Mūsa. | Jak wyżej |
| `public/assets/landmarks/panevezys.png` | Poniewież | Niewiaża, most, zabudowa centrum, umowne sylwetki historyczne. Szczegóły architektoniczne **wymagają korekty/oceny lokalnej**. | Jak wyżej |
| `public/assets/landmarks/kowno.png` | Kowno | Zamek Kowieński, kościół św. Jerzego, historyczne wieże Starówki od strony Wilii. | Jak wyżej |
| `docs/art/podglady/panoramy-100.png` | Arkusz | Pięć panoram na błękitnym tle z podpisami. | Pillow, kompozycja z grafik ChatGPT |

## Parametry i prompty

Wynik: pięć plików PNG RGBA, **1620×900 px**, transparentne tło, profil sRGB. Brak podpisów w assetach gry. Finalne rozmiary uzyskano przez kadrowanie, interpolację Lanczos i techniczną obróbkę ilustracji wygenerowanych natywnie w ChatGPT; cztery assety wyodrębniono z wygenerowanego arkusza, a Pärnu powstało jako osobne ujęcie. Materiał referencyjny służył jedynie do identyfikacji zabytków; nie wykorzystano cudzych zdjęć w wynikach.

**Prompt Pärnu (skrócony):** „Wide, horizontal vector cartoon of a seaside promenade on a transparent background, with no sky or people; neoclassical cream pavilion with columns and teal roof, modernist beach house with round deck, boardwalk, sandy dunes; bold navy outlines, flat shading”.

**Prompt arkusza Bauska (skrócony):** „A crisp, poster-style infographic ... five colorful outlined vector panoramas in a grid: Pärnu, Riga, Bauska, Panevėžys, Kaunas; water, greenery, warm flat shading”.

**Prompt arkusza Ryga (skrócony):** „A crisp, colorful flat-vector composition ... five detailed landmark-filled city panoramas with bold outlines and transparent checkerboard backgrounds, plus light-blue preview strip”.

**Prompt arkusza Poniewież i Kowno (skrócony):** „A crisp, colorful vector postcard ... five labeled city panoramas in a three-over-two grid; bold dark outlines, simplified architecture, greenery, bridges and water”.

Pełne prompty oraz opis punktu widzenia przy każdym pliku są w wersji `ASSETS-100.md` z paczki ZIP.

## Źródła krajobrazowe

- Pärnu: https://visitparnu.com/en/objekt/parnu-mud-baths/ oraz https://visitparnu.com/en/objekt/parnu-beach-house/
- Ryga: https://www.celotajs.lv/en/e/vecrigaskati?lang=en
- Bauska: https://www.latvia.travel/en/sight/bauska-castle
- Poniewież: https://pu-pa.eu/eng/projects/panevezio-senvages-parkas/
- Kowno: https://www.nationalgeographic.com/travel/article/paid-content-kaunas-lithuania-guide

## Ograniczenia i prawa

Latvia: art. 25 prawa autorskiego nie zapewnia ogólnej swobody komercyjnego użycia przedstawień chronionej architektury na otwartej przestrzeni: https://likumi.lv/ta/en/en/id/5138-copyright-law. Dlatego w `ryga.png` **nie ma współczesnego mostu Vanšu**, a panorama opiera się na historycznych wieżach. Nie umieszczono też Atomium ani nowoczesnych chronionych ikon.

Grafiki są materiałami AI do komercyjnego wykorzystania przez właściciela projektu na warunkach OpenAI; nie gwarantuje to powstania wyłącznego prawa autorskiego do czysto wygenerowanych elementów.

**Uwaga:** Powiększone fragmenty arkuszy nie zapewniają natywnej szczegółowości renderingu 1620×900. Dokładność konturów 9–10 px i pełna zgodność geometrii miejsc nie zostały zatwierdzone; w szczególności Poniewież i Bauska wymagają przeglądu. Nie porównano 1:1 z binarnymi próbkami A w repozytorium.

## Testy / integracja

- Sprawdzono lokalnie rozdzielczość, kanał alfa, profil sRGB, integralność ZIP i wymaganą strukturę katalogów.
- `npm ci`, `npm run typecheck`, `npm test`, `npm run build` **nie uruchomiono** — w środowisku nie udało się pobrać repozytorium przez git (brak DNS).
- Po wgraniu ZIP do tej gałęzi należy wykonać cztery komendy, obejrzeć obrazy przy skali ok. 324×180 i dopiero wtedy scalić PR.

## Pytania do koordynatora

1. Czy interpolacja fragmentów arkuszy po przeskalowaniu do gry jest dostatecznie ostra?
2. Czy panoramę Poniewieża należy zastąpić wierniejszym widokiem Senvagė i dwuwieżowego kościoła św. Piotra i Pawła?
3. Czy sylwetka zamku w Bausce jest rozpoznawalna lokalnie?
