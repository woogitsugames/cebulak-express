# ASSETS-92: Panoramy A+ miast Francji

**Zlecenie:** 92. **Data:** 31.10.2026. **Wersja:** propozycja do przeglądu w grze. **Format:** PNG RGBA, 1620×900 px, sRGB, przezroczyste niebo, dolna krawędź przy gruncie lub wodzie.

## Pochodzenie i prawa

Wszystkie pięć panoram to oryginalne kompozycje graficzne wytworzone natywnym generatorem obrazu ChatGPT (GPT Image), następnie wyodrębnione z autorskiego arkusza koncepcyjnego i poddane korekcie Pillow/OpenCV: osobne kadry, usunięcie nieba i artefaktów, skalowanie do 1620×900, transparentny kanał alfa, linia gruntu. Arkusz przeglądowy złożono za pomocą Pillow. Nie wklejano cudzych fotografii ani tekstur. Obrazy referencyjne służyły jedynie do sprawdzenia charakterystycznych zabytków.

**Licencja/użycie:** grafiki wygenerowane w ChatGPT i przygotowane do użycia komercyjnego przez właściciela projektu, zgodnie z warunkami usługi. Nie jest to gwarancja wyłączności ani istnienia ochrony autorskoprawnej dla elementów wygenerowanych przez AI. Obiekty to historyczne zabytki lub ogólne elementy pejzażu miejskiego; pominięto nowoczesne budowle obciążone wątpliwościami dotyczącymi komercyjnego wykorzystania wizerunku.

| Plik / ID | Miasto i czytelne motywy | Punkt widzenia / charakter kadru | Narzędzie | Prawa |
|---|---|---|---|---|
| `dunkierka.png` / `dunkierka` | Dunkierka: wieża Beffroi Saint-Éloi, latarnia inspirowana Phare du Risban, dźwigi portowe, piaszczysta plaża i wydmy | Stylizowany widok z nadmorskiej strony portu, z plażą na pierwszym planie i infrastrukturą portową w tle | ChatGPT GPT Image + Pillow/OpenCV | Wygenerowane dla projektu |
| `reims.png` / `reims` | Reims: charakterystyczna dwuwieżowa fasada katedry Notre-Dame, masy zabudowy sakralnej nawiązujące do Saint-Remi, niskie kamienice | Umowny widok na historyczne centrum od zachodu, na wprost fasady katedry | ChatGPT GPT Image + Pillow/OpenCV | Wygenerowane dla projektu |
| `metz.png` / `metz` | Metz: katedra Saint-Étienne z kamienia o ciepłej barwie, zabudowa nad Mozelą, kamienny most nawiązujący do Moyen Pont | Umowny widok w kierunku historycznego centrum z drugiej strony Mozeli | ChatGPT GPT Image + Pillow/OpenCV | Wygenerowane dla projektu |
| `cherbourg.png` / `cherbourg` | Cherbourg: latarnia portowa inspirowana latarnią Fort de l'Ouest, zabudowa forteczna inspirowana fortyfikacjami rade, basen portowy, jachty | Umowny widok z wnętrza basenu portowego w kierunku nadbrzeża i umocnień | ChatGPT GPT Image + Pillow/OpenCV | Wygenerowane dla projektu |
| `caen.png` / `caen` | Caen: wieże historycznych kościołów nawiązujące do opactwa Abbaye aux Hommes i Saint-Pierre, kamienny most, zabudowa Normandii | Umowny widok zza rzeki na historyczne centrum | ChatGPT GPT Image + Pillow/OpenCV | Wygenerowane dla projektu |
| `docs/art/podglady/panoramy-92.png` | Pięć panoram na jasnoniebieskim tle z podpisami | Arkusz kontrolny 3 + 2 | Pillow | Zestawienie prac projektu |

## Specyfikacja promptów (opis kierujący generacją i selekcją)

**Prompt wspólny:** *Autorskie panoramy pięciu miast francuskich jako czytelne ilustracje 2D do gry. Grube ciemnogranatowe kontury #1d2f3b; ciepłe, niemal płaskie kolory; duże historyczne sylwetki; 2–4 główne obiekty, niskie kamienice i krajobraz w tle; światło z lewej góry; bez napisów, logotypów, postaci i flag; oddzielne panoramy z przezroczystym tłem. Części składowe: port i wydmy Dunkierki, gotycka katedra Reims, kamienna katedra i mosty Metz, baseny i latarnie Cherbourga, wieże opactwa i kamienny most Caen.*

- **Dunkierka:** *Port z wysokim beffroi Saint-Éloi, jasną latarnią, niebieskimi dźwigami i wydmami, panorama nabrzeża, ciepły kamień, 2D cutout.*
- **Reims:** *Monumentalna katedra Notre-Dame z dwiema masywnymi, bezspiczastymi wieżami, różą nad trzema portalami, niskie zabudowania; widok fasady od zachodu.*
- **Metz:** *Katedra Saint-Étienne z wysoką gotycką wieżą, brzeg Mozeli i łuki kamiennego mostu; akcent drzew i jasnych elewacji.*
- **Cherbourg:** *Stary port w Normandii, klasyczna latarnia morska, fortyfikacje falochronu, niska zabudowa i jachty; bez nowoczesnego terminalu.*
- **Caen:** *Historyczne opactwo i kościoły o strzelistych wieżach, niskie kamienice, szeroki kamienny most i pas zieleni.*

> **Transparentność techniczna:** generator zwrócił wspólny, pięcioelementowy arkusz, a nie pięć niezależnych widoków. Zostały z niego wykonane osobne pliki z kanałem alfa. Tekst powyżej jest udokumentowaną specyfikacją artystyczną, nie dosłownym logiem ukrytego promptu wewnętrznego generatora.

## Weryfikacja i ograniczenia

- Każdy plik: **1620×900, RGBA**, przezroczystość sprawdzona programowo; górny pas jest przezroczysty. Podgląd zestawiony na jasnoniebieskim tle.
- Ilustracje są uproszczonymi **kompozycjami rozpoznawalnych motywów**, nie rekonstrukcjami panoram wykonanych z jednego geodezyjnie potwierdzonego punktu. Nie należy przedstawiać ich jako fotograficznie wiernych. Wymóg ścisłej kolejności i proporcji rzeczywistych budowli wymaga dalszego przerysowania po zatwierdzeniu punktów widokowych.
- Należy sprawdzić czytelność przy zmniejszeniu 5× i w ruchu, bez nieba. Nie uruchamiano pełnej gry ani CI w tej sesji.

## Źródła do identyfikacji zabytków (nie kopiowano zdjęć)

- Dunkierka: https://www.dunkerque-tourisme.fr/les-incontournables/ ; https://www.dunkerque-tourisme.fr/decouvrir/une-immersion-dans-lhistoire/prendre-de-la-hauteur-avec-nos-beffrois/
- Reims: https://visit.reims.fr/parcours-dans-la-ville/cite-des-sacres
- Metz: https://templeneufmetz.org/edifice/ ; https://commons.wikimedia.org/wiki/File:Metz_-_View_of_Temple_Neuf,_Moselle_river_and_Cath%C3%A9drale_Saint_Etienne_from_Moyen_Pont_(Q22690).jpg
- Cherbourg: https://www.cherbourg.fr/culture-et-loisirs/patrimoine/les-monuments-incontournables/la-digue-et-ses-forts/ ; https://pop.culture.gouv.fr/notice/merimee/IA50000603
- Caen: https://caen.fr/annuaire-equipement/eglise-saint-etienne ; https://en.normandie-tourisme.fr/beautiful-panoramas/
