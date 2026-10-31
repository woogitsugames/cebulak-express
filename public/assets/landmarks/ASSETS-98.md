# Zlecenie 98 — panoramy A+ (31.10.2026)

**Status:** grafiki zostały przygotowane w ChatGPT jako osobne pliki PNG i spakowane w ZIP ze ścieżkami repozytorium. **Nie są jeszcze przesłane na gałąź GitHub** — koordynator musi wgrać ZIP na tę gałąź przed połączeniem PR. Kompletna dokumentacja ASSETS-98.md jest również w ZIP i powinna zastąpić tę wersję informacyjną.

| Plik/id | Miasto | Budowle i motywy | Punkt widzenia | Narzędzie | Uprawnienia |
|---|---|---|---|---|---|
| `ostrawa.png` | Ostrawa, Czechy | Dolní Vítkovice: historyczne wielkie piece, wieża wyciągowa, przemysłowy gazometr Gong, kominy | W stronę kompleksu hutniczego z placu przemysłowego | ChatGPT GPT Image + Pillow | Wygenerowano dla właściciela gry; zgodnie z warunkami OpenAI |
| `cesky-tesin.png` | Czeski Cieszyn, Czechy | Most Przyjaźni nad Olzą, ratusz z falistym szczytem i zegarem, neogotycki kościół Serca Jezusowego | Stylizowany widok od polskiego brzegu, odległości między obiektami umowne | GPT Image (koncepcja), autorskie przerysowanie SVG/CairoSVG | Opracowanie własne dla właściciela gry |
| `roskilde.png` | Roskilde, Dania | Dwuwieżowa katedra, rekonstrukcje łodzi wikińskich, fiord i przystań | Od strony portu i fiordu w kierunku centrum | ChatGPT GPT Image + Pillow | Wygenerowano dla właściciela gry; zgodnie z warunkami OpenAI |
| `slupsk.png` | Słupsk, Polska | Motywy średniowiecznych ceglanych baszt i murów, kościół, zieleń skwerów | Stylizowany widok na historyczny obszar nad Słupią | ChatGPT GPT Image + Pillow | Wygenerowano dla właściciela gry; zgodnie z warunkami OpenAI |
| `bydgoszcz.png` | Bydgoszcz, Polska | Trzy szachulcowe spichrze nad Brdą, barki, most, zabudowa centrum | Z przeciwległego nabrzeża, elementy dalszego planu stylizowane | ChatGPT GPT Image + Pillow | Wygenerowano dla właściciela gry; zgodnie z warunkami OpenAI |

**Wymiary i styl:** każdy plik 1620×900 PNG RGBA, przezroczyste niebo, granatowe obrysy, bez napisów, logotypów, flag, postaci; podgląd `docs/art/podglady/panoramy-98.png` (arkusz z podpisami na błękitnym tle).

**Prompt wspólny:** `Original 16:9 flat vector-game panorama, transparent sky, 2–4 large recognizable city landmarks covering 70–80% of canvas height, bold navy #1d2f3b outlines 9–10px, warm flat colors, simple windows and shadows from upper left, bottom ground/water line; no text, logos, signs, flags, people or photo textures.` Słowa kluczowe poszczególnych promptów: `ostrawa: Dolní Vítkovice/Gong/furnaces`; `cesky-tesin: Friendship Bridge/town hall/neo-Gothic church`; `roskilde: cathedral/Viking ships/harbour`; `slupsk: brick towers/Gothic church/park`; `bydgoszcz: three granaries/Brda/barges/bridge`. Są to odtworzone prompty koncepcyjne, a nie dosłowny zapis generatora.

**Źródła weryfikacji motywów:**
- Ostrawa: https://www.visitczechia.com/en-us/things-to-do/places/landmarks/urban-architecture/c-ostrava-vitkovice
- Czeski Cieszyn: https://visitcieszyn.com/index.php/cs/pro-to-stoj-za-to ; https://pamatkovykatalog.cz/kostel-bozskeho-srdce-pane-12778011
- Roskilde: https://www.vikingeskibsmuseet.dk/en/visit-the-museum/exhibitions/the-five-reconstructions
- Słupsk: https://www.slupsk.pl/turysta/trasy-turystyczne/spacer-po-slupsku
- Bydgoszcz: https://www.visitbydgoszcz.pl/odkryj/trasy-zwiedzania/a/poznajemy-stare-miasto

**Prawa:** koncepcje i obrazy wykonane w ChatGPT dla projektu; zdjęcia referencyjne wyłącznie do weryfikacji, bez kopiowania. Możliwość wykorzystywania grafik przez właściciela jest zgodna z warunkami usług OpenAI, natomiast sama generacja AI nie gwarantuje wyłącznej ochrony autorskiej. Stylizacje nie są fotograficznie wiernymi panoramami i wymagają kontroli koordynatora pod kątem rozpoznawalności.

**Do dostarczenia na tę gałąź z ZIP:**
- `public/assets/landmarks/ostrawa.png`
- `public/assets/landmarks/cesky-tesin.png`
- `public/assets/landmarks/roskilde.png`
- `public/assets/landmarks/slupsk.png`
- `public/assets/landmarks/bydgoszcz.png`
- `docs/art/podglady/panoramy-98.png`
- pełna wersja `public/assets/landmarks/ASSETS-98.md`

**Testy:** sprawdzono pliki graficzne (wymiary, RGBA, przezroczystość, podgląd). Nie uruchomiono npm/CI: klonowanie repozytorium z tego środowiska jest niedostępne.