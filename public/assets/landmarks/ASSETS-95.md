# ASSETS-95 — Panoramy A+ miast niemieckich

- **Zlecenie:** 95, runda 7, Cebulak Express — Kierunek Polska.
- **Data:** 31.10.2026.
- **Format:** PNG 1620×900, RGBA, sRGB, przezroczyste tło, kontur `#1d2f3b`.
- **Narzędzie:** wbudowany generator obrazów ChatGPT (GPT Image); ręczna/programowa korekta kompozycji, konturów i wycięcie pojedynczych miast (Pillow, CairoSVG).
- **Licencja:** grafika generowana dla właściciela projektu; użycie w grze zgodnie z warunkami OpenAI; brak obcych logotypów i zdjęć wklejonych do ilustracji.

| Plik i ID | Miasto | Budynki/motywy | Kierunek widzenia i uwagi |
|---|---|---|---|
| `norymberga.png` / norymberga | Norymberga | Kaiserburg, Sinwellturm, St. Sebald (dwie wieże), dachy Altstadt | Uproszczony widok z południa ku północy, w stronę zamku na wzgórzu. |
| `bayreuth.png` / bayreuth | Bayreuth | Stadtkirche — dwie wieże z cebulastymi hełmami; barokowa fasada inspirowana Markgräfliches Opernhaus; wieża inspirowana Schlosskirche | Umowna kompozycja historycznego centrum z południowego zachodu. Wieże Stadtkirche dorysowane; pozostałe fasady nie są dokładną rekonstrukcją. |
| `chemnitz.png` / chemnitz | Chemnitz | St. Jakobi, czerwony gmach i wieża Neues Rathaus, Altes Rathaus, zabudowa rynku | Stylizowana perspektywa Marktplatz; układ przybliżony. |
| `saarbrucken.png` / saarbrucken | Saarbrücken | Alte Brücke, Saara, zabudowa nadbrzeżna, Saarbrücker Schloss, Schlosskirche | Syntetyczny widok z St. Johann w kierunku przeciwnego brzegu Saary. |
| `mannheim.png` / mannheim | Mannheim | Wasserturm, fontanny Friedrichsplatz, gmachy historyczne, barka na Renie | **Perspektywa umowna:** barka i wieża ciśnień nie są widoczne razem z jednego rzeczywistego punktu. Do zatwierdzenia przez koordynatora. |

## Prompty / kierunki generacji

Wspólny opis: „Wide 16:9 side-scrolling game skyline; transparent sky; flat warm vector art; thick 9–10 px deep-navy outline; 2–4 large historically recognisable monuments; simple windows; low row of historic buildings; flat shadows, upper-left light; no signs, text, flags, logos, people, or photo textures; RGBA sprite 1620×900.”

- **Norymberga:** „Kaiserburg Nürnberg and Sinwell Tower on a wooded hill behind terracotta Altstadt rooftops, St. Sebald twin pointed towers, view from south.”
- **Bayreuth:** „Stadtkirche with two square sandstone towers and dark onion domes, baroque Opera House and historic Schlosskirche cupola, low roofs and trees.” Wieże Stadtkirche skorygowano wektorowo.
- **Chemnitz:** „St. Jakobi tower, Neues Rathaus red sandstone tower and facade, neighbouring Altes Rathaus and market buildings.”
- **Saarbrücken:** „Old stone arched bridge over the Saar, historic Saarbrücker Schloss, Schlosskirche and low green hills seen from St. Johann.”
- **Mannheim:** „Historic Wasserturm at Friedrichsplatz, formal fountains, old city buildings and barge on river in compressed symbolic panorama.”

## Źródła odniesienia (bez kopiowania fotografii)

- [Nürnberg Tourismus](https://tourismus.nuernberg.de/en/guidedtours/tour-on-your-own-walk-through-the-old-town/)
- [Miasto Bayreuth — zabytki](https://www.bayreuth.de/markgraefliche-sehenswuerdigkeiten/)
- [Bayreuth Tourismus — panorama](https://www.bayreuth-tourismus.de/news/das-panorama-bayreuths/)
- [Chemnitz Travel — centrum](https://www.chemnitz.travel/en/must-c/sehenswuerdigkeiten/highlights-in-city-centre)
- [Saarbrücken Tourismus — top sights](https://tourismus.saarbruecken.de/en/discovering/top_sights)
- [Visit Mannheim — Wasserturm](https://www.visit-mannheim.de/erleben-entdecken/radtouren-mannheim/sightseeing-tour)

## Pliki

- Pięć obrazów: `public/assets/landmarks/{norymberga,bayreuth,chemnitz,saarbrucken,mannheim}.png`.
- Arkusz podglądu: `docs/art/podglady/panoramy-95.png`.
- Szczegółowa dokumentacja: `public/assets/landmarks/ASSETS-95.md`.

**Stan:** Grafiki i arkusz są dostarczone w ZIP zachowującym ścieżki repozytorium, do ręcznego importu. PR ma charakter szkicu do czasu dodania PNG. Lokalnie skontrolowano wymiary, kanał alfa oraz umiejscowienie linii podłoża. **Nie uruchomiono npm ci, typecheck, test ani build** — środowisko nie ma dostępu sieciowego do repozytorium przez Git. Do sprawdzenia przez koordynatora: czytelność w kadrze gry i spójność perspektywy, zwłaszcza Bayreuth i Mannheim.
