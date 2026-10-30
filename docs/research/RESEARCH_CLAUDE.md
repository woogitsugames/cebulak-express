# „Lecę do Domu” — koncepcja polonijnej gry one‑tap

*Research + projekt gry w stylu Flappy Bird z wątkiem emigracyjnym, jako narzędzie zasięgowe dla portali PoPolsku / TuWiesz / Aktualności. Stan wiedzy: 30.10.2026. Oznaczenia: **[Źr. N]** = źródło z listy na końcu, **[szacunek]** = własna ocena bez twardych danych.*

---

## 0. TL;DR

- **Rekomendowana nazwa:** **„Lecę do Domu!”** (z podtytułem *„Polonijny lot na Wigilię”*); domena/handle typu `lecedodomu`.
- **Rekomendowany bohater:** **Bocian Bogdan** — bocian‑emigrant z walizką na kółkach (i siatką z zakupami w dziobie), który wraca do gniazda na kominie w Polsce. Skórki: „Cebulak w kurtce puchowej”, gołąb z Brukseli, babcia na miotle (event), bus‑Sprinter.
- **Platforma:** PWA w HTML5 Canvas (Phaser 3 albo czysty Canvas), hostowana na domenie własnej; osadzalna (iframe) w każdym portalu; druga faza: Facebook Instant Games (Zero Permissions) i TWA na Google Play.
- **MVP:** ok. 8–12 dni roboczych dla 1 osoby + AI **[szacunek]**.
- **Pętla viralowa:** karta wyniku „Doleciałem z Antwerpii do Rzeszowa w 47 s — Polonia BE prowadzi 🇧🇪” + rankingi „Polonia vs. Polonia” + sezon Wigilijny (start 1.12).
- **Monetyzacja:** przede wszystkim **ruch do portali** i rozpoznawalność marki; dopiero potem rewarded ads i kosmetyka.

---

## 1. Research

### 1.1 Fenomen Flappy Bird — dlaczego działał

| Czynnik | Fakt | Wniosek dla nas |
|---|---|---|
| Ekstremalnie prosta mechanika | Ptak leci w prawo i opada; tap = wzlot; 1 punkt za parę rur; kolizja = koniec [Źr. 1] | Tap‑to‑flap bez tutoriala, wynik w pierwszych 2 sekundach |
| Brutalna, ale „uczciwa” trudność | Autor celowo podniósł trudność po wersji łatwiejszej; media nazywały grę „frustrującą” [Źr. 1] | Frustracja = gadanie i udostępnianie, **ale** my mamy markę „cozy” — patrz §3.3 (tryb łaskawszy) |
| Medale progowe | Brąz 10, srebro 20, złoto 30, platyna 40 [Źr. 1] | Mamy naturalne progi: kraje/granice na trasie |
| Viral przez influencera | Skok popularności po filmie PewDiePie, styczeń 2014, nr 1 w US i Chinach [Źr. 1] | Gameplay jako materiał na rolki — mamy własne strony FB i rolki |
| Zrobiona szybko | 2–3 dni pracy [Źr. 1] | MVP ma być mały |
| Przychód | ok. 50 000 USD dziennie z reklam (wg autora) [Źr. 1][Źr. 2] | Wyjątek, nie benchmark |

**Co się stało z marką.** Nguyen usunął grę 10.02.2014, motywując to uzależnieniem graczy [Źr. 1][Źr. 2]. W 2023–2024 Gametech Holdings podważył jego znak towarowy w USPTO, który uznano za porzucony; prawa do nazwy przejęła potem „Flappy Bird Foundation”, która we wrześniu 2024 zapowiedziała reboot z wątkami krypto/TON — Nguyen odciął się („I did not sell anything”) [Źr. 3][Źr. 4][Źr. 5]. Wniosek: **nazwa „Flappy Bird” jest dziś aktywnie posiadanym znakiem w rękach podmiotu o agresywnym profilu** — trzymamy się od niej z daleka.

**Ryzyka klonów — czego NIE kopiować:**
- Słowa **„Flappy”** w nazwie ani w opisie sklepu. Już w 2014 Apple i Google odrzucały tytuły „żerujące na popularności” (Apple: wytyczna o mylących reprezentacjach; Google: „spam”) [Źr. 6][Źr. 7]. Dziś analogiczne ryzyko daje wytyczna Apple 4.3 (spam/klony) **[szacunek, ogólna wiedza o wytycznych]**.
- **Zielonych rur** w stylu Mario, żółtego ptaka‑Faby, czcionki i layoutu ekranu „Get Ready / Game Over / medal” [Źr. 1].
- Samej mechaniki (tap = wzlot) **nie da się zastrzec** jako takiej — mechaniki gier zasadniczo nie podlegają prawu autorskiemu; chroniona jest ekspresja (grafika, dźwięk, nazwa) **[szacunek prawny, nie porada prawna]**.

### 1.2 Rynek hyper‑casual / one‑tap 2025–2026

- **Czysty hyper‑casual jest po szczycie.** Wciąż wiedzie w pobraniach, ale ma niski ARPU z reklam i słabą retencję; rynek przesuwa się do **hybrid‑casual** (mechanika prosta + meta‑progresja + IAP) [Źr. 8][Źr. 9].
- **Skala:** segment hyper‑casual to < 0,5 mld USD IAP w 2025 vs ok. 22 mld USD casual; pobrania casual spadły o 18% r/r, m.in. przez konkurencję o czas ekranowy z krótkim wideo [Źr. 10].
- **Retencja:** standardowy hyper‑casual — zwykle < 10% graczy wraca 7. dnia [Źr. 8]; udane tytuły celują w D30 ≥ 5–7,5% i wymagają live‑opsów [Źr. 10].
- **Monetyzacja:** reklamy rewarded pozostają „kręgosłupem”, rośnie model hybrydowy (IAP za usunięcie reklam/kosmetykę) [Źr. 9][Źr. 11]. Zbyt częste reklamy zabijają retencję [Źr. 8].

**Publiczność:** wg GUS ok. 1,37 mln obywateli RP przebywa czasowo w Europie (UK 412 tys., DE 386 tys., NL 130 tys.) [Źr. 35] — plus wielokrotnie liczniejsza Polonia z obywatelstwem kraju zamieszkania. To niszowa, ale zwarta i dobrze zdefiniowana grupa.

**Wniosek strategiczny:** Jako *biznes reklamowy* gra one‑tap w 2026 to słaby zakład. Jako **tani nośnik marki i ruchu** dla 15+ portali z gotową, zdefiniowaną publicznością (Polonia) — sensowny, bo koszt pozyskania gracza jest bliski zeru (własne kanały FB/rolki).

### 1.3 Platformy — co realnie działa dziś

| Platforma | Stan (X 2026) | Ocena dla nas |
|---|---|---|
| **Web / PWA** (własna domena + iframe w portalach) | Działa wszędzie, zero prowizji, zero review | **Faza 1, rdzeń** |
| **Facebook Instant Games** | Żywe, ale od 1.08.2025 nowe gry muszą używać **Zero Permissions**; Web/Canvas Games wygaszone 30.09.2026 [Źr. 12][Źr. 13]. Gry nie siedzą już w Messengerze — od 2019 przeniesione do aplikacji Facebook [Źr. 14] | **Faza 2** — najlepiej pasuje do naszej publiczności z FB; trzeba sprawdzić, co Zero Permissions pozwala w rankingach znajomych |
| **Google Play przez TWA** (Bubblewrap/PWABuilder) | Działa, pakiet .aab bez kodu natywnego; tylko Android [Źr. 15][Źr. 16] | Faza 3, tani dodatek „mamy apkę” |
| **App Store (iOS)** | PWA niedopuszczane jako takie; klon one‑tap ryzykuje 4.3 [Źr. 16] | Odpuścić na start; iOS gra przez przeglądarkę/„Dodaj do ekranu” |
| **Telegram Mini Apps** | Żywe: >500 mln MAU mini‑aplikacji wg Telegrama, płatności Stars [Źr. 17][Źr. 18]; ekosystem mocno krypto (Hamster Kombat, Notcoin) | Niska priorytet — Polonia w UE żyje na FB/WhatsApp, nie Telegramie **[szacunek]** |
| **TikTok Mini Games** | Istnieją (dok. dev aktualizowana 2026), ale dostępność regionalna w Europie niepotwierdzona [Źr. 19][Źr. 20] | Obserwować; do tego czasu TikTok = kanał rolek z linkiem |
| **Portale gier (Poki, CrazyGames)** | Poki: selekcja, często wyłączność web; CrazyGames: ~60% z reklam dla dewelopera wg regulaminu jamu 2026 [Źr. 21][Źr. 22] | Nie — nasza gra jest po polsku i niszowa; wyłączność kłóci się z osadzeniem w portalach |

### 1.4 Istniejące gry i memy z motywem polskim / emigracyjnym

- **Janusz Symulator / Polish Simulator** (Simplicity Games, Steam, zapowiedź na Q4 2025): stereotyp Polaka — skarpety do sandałów, walka o karpia, „rywalizacja alkoholowa” z rodziną [Źr. 23][Źr. 24]. Pokazuje, że **memiczność polskich stereotypów się „klika”**, ale też jaki ton wybiera konkurencja (alkohol, „somsiad”) — my celowo idziemy łagodniej.
- **„Flappy Smoleńsk” (2014)** — polski klon Flappy z brzozami jako przeszkodami, nawiązujący do katastrofy smoleńskiej [Źr. 25]. **Lekcja negatywna:** polityka + tragedia narodowa = skandal, nie zasięg.
- **Flapping Fish (2014)** — polski one‑tap w App Store [Źr. 26]; dowód, że tematyczne reskiny Flappy przeszły bez echa, gdy nie miały „haczyka społecznościowego”.
- **Timberman (Digital Melody, 2014)** — polska gra one‑tap, która realnie odniosła sukces na fali Flappy [Źr. 27]. **Lekcja pozytywna:** wyraźna postać + jeden gest + własny styl, a nie kopia.
- **„Polski hydraulik”** — stereotyp z francuskiej debaty o rozszerzeniu UE; Polska Organizacja Turystyczna odwróciła go autoironicznie w kampanii „zostaję w Polsce, przyjeżdżajcie” [Źr. 28][Źr. 29]. **Najlepszy precedens tonu**: przejąć stereotyp i obrócić go na swoją korzyść.
- Memy‑paliwo (obserwacja ogólna, **[szacunek]**): bagaż podręczny 40×20×25 cm i opłaty 200–250 zł przy bramce [Źr. 30], „słoiki od mamy”, paczki busem, Kinder/Prince Polo z Polski, kolejka do boardingu, święta „u nas”, „Panie, to nie ma tu normalnego chleba?”. Żaden z tych tematów nie ma dziś dedykowanej, rozpoznawalnej gry — **nisza jest pusta**.

### 1.5 Wrażliwość: autoironia kontra stereotyp

Diaspora w USA ma długą historię protestów przeciw „Polish jokes” (Polish American Congress, sprawy Drew Careya i Jimmy’ego Kimmela) [Źr. 31]; w Polsce autoironia jest popularna, ale opinie są podzielone [Źr. 32][Źr. 33]. Granica jest więc realna. Zasady:

**Zasady tonu (wiążące dla treści gry i rolek):**
1. **Śmiejemy się z sytuacji, nie z ludzi.** Celem żartu jest absurd podróży (bagaż, opóźnienia, bramki), tęsknota i polskie „kombinowanie” — nigdy niski status, praca fizyczna czy wykształcenie emigranta.
2. **Bohater wygrywa.** Cebulak jest sprytny, zaradny i sympatyczny; „cebulowość” = spryt i oszczędność (nagradzana mechanicznie), nie wstyd.
3. **Bez alkoholu jako gagu.** Żadnych wódek‑znajdziek, „pijanego lotu”, „boost po piwie”. To najkrótsza droga do stereotypu, którym Polonię się obraża, i problem z ratingiem w sklepach.
4. **Bez polityki, religii, historii‑tragedii** (zob. Flappy Smoleńsk). Bez partii, polityków, 500+, granic/uchodźców, wojny w Ukrainie.
5. **Kraje‑gospodarze nie są wrogami.** Przeszkody to *infrastruktura i pogoda* (wiatraki, deszcz, mewy, roboty drogowe), nie ludzie danej narodowości. Tło każdego kraju ma być czułe („tu też jest mój dom”), bo Polonia tam mieszka i pracuje.
6. **Brak prawdziwych marek i osób.** Żadnego logo Ryanaira/Wizz Aira, Biedronki, Kindera; parodie nazw („Rajanair”, „Biedrona”) też ryzykowne — Ryanair aktywnie egzekwuje znaki (choć sądy ważą komercyjność użycia) [Źr. 34]. Używamy generyków: „tani przewoźnik”, „żółto‑niebieski samolot” → *nie*, lepiej własne barwy („Linie Bocianie”).
7. **Test babci i test kolegi z pracy.** Czy babcia w Rzeszowie się uśmiechnie? Czy Belg z pracy, któremu pokażę grę, zobaczy sympatycznych Polaków? Jeśli którykolwiek test nie przechodzi — wyrzucamy.
8. **Słowo „cebulak” tylko w ustach samego bohatera / gracza** (autodeklaracja: skin „Cebulak i dumny”), nigdy jako etykieta narzucona przez grę („Przegrałeś, cebulaku”).

---

## 2. Nazwy robocze

| # | Nazwa | Chwytliwość | Wyszukiwalność | Ryzyko prawne | Uwagi |
|---|---|---|---|---|---|
| 1 | **Lecę do Domu!** | ★★★★☆ | ★★★★☆ (fraza naturalna, mało konkurencji w sklepach **[szacunek]**) | Niskie | Emocja tęsknoty + działa w każdym sezonie; świetne do „Leciałem do domu 47 s” |
| 2 | **Cebulot** (cebula + lot) | ★★★★★ | ★★★☆☆ (słowo nowe, ale unikalne) | Niskie | Najbardziej memiczna; ryzyko tonu — „cebula” w tytule ustawia żart na stereotypie |
| 3 | **Na Wigilię!** | ★★★★☆ | ★★☆☆☆ (sezonowa, kolizje z treściami świątecznymi) | Niskie | Idealna jako nazwa *eventu*, nie całej gry |
| 4 | **Bocian Express** | ★★★☆☆ | ★★★☆☆ | Niskie/średnie („Express” w nazwach przewoźników — generyczne) | Czytelna za granicą |
| 5 | **Słoiki od Mamy** | ★★★★☆ | ★★☆☆☆ | Niskie | Śliczna jako tryb/znajdźka |
| 6 | **Polonia Air** | ★★★☆☆ | ★★☆☆☆ | **Średnie** (sugeruje linię lotniczą; nazwy linii bywają zastrzeżone) | Odradzam |
| 7 | **Flappy Pierogi** | ★★★★☆ | ★★★★★ (pasożytuje na „Flappy”) | **Wysokie** (znak Flappy Bird, odrzuty sklepów [Źr. 3][Źr. 6]) | **Nie używać** |

**Rekomendacja:** **„Lecę do Domu!”** jako marka; „Cebulot” jako nazwa trybu/skórki dla fanów memów; „Na Wigilię!” jako nazwa grudniowego eventu. Przed decyzją: sprawdzić EUIPO/UPRP i sklepy (wyszukiwanie znaków — 30 min **[szacunek]**).

---

## 3. Projekt gry

### 3.1 Bohaterowie (warianty)

| Propozycja | Opis | Plusy | Minusy |
|---|---|---|---|
| **A. Bocian Bogdan** ⭐ | Bocian‑emigrant: czapka z daszkiem, walizka na kółkach zwisa pod brzuchem, w dziobie siatka z zakupami. Cel: gniazdo na kominie domu rodzinnego | Bocian = symbol Polski i powrotu (wraca co wiosnę); naturalnie *leci*; ciepły, nikogo nie obraża; czytelny dla obcokrajowców | Mniej „memiczny” niż cebulak |
| B. Cebulak Czesiu | Uśmiechnięta cebula w kurtce puchowej, z saszetką na pasku, leci na wiatraczku z czapki | Maksymalnie memiczny | Ryzyko, że *cała* gra stoi na stereotypie; trudniej ze sponsorami |
| C. Gołąb Gienek | Miejski gołąb z Brukseli/Londynu z plecaczkiem 40×20×25 | Uniwersalny, śmieszny, „ptasi” jak oryginał | Słaby związek z Polską |
| D. Samolocik „Linie Bocianie” | Mały, przeładowany samolot z bagażami na dachu | Tematyka lotów wprost | Za blisko realnych przewoźników |
| E. Bus‑Sprinter z paczkami (skórka) | Latający bus kurierski „Paczki PL–BE” | Kultowy obraz Polonii | Bus nie lata — tylko jako żart‑skórka |

**Rekomendacja:** **Bocian Bogdan jako bohater główny**, a Cebulak, Gołąb, Bus i (sezonowo) „Mikołaj z Pcimia” jako **skórki do odblokowania** — gracz *sam wybiera*, jak bardzo chce być memiczny (zasada tonu nr 8).

### 3.2 Rdzeń mechaniki

- **Tap = machnięcie skrzydłami** (wzlot), grawitacja ciągnie w dół, przewijanie w prawo. Sterowanie: dotyk, spacja, klik.
- **Wynik = kilometry** (nie „rury”): każda przeszkoda ≈ 10 km. Trasa Bruksela–Rzeszów ≈ 1 300 km **[szacunek trasy]** → ok. 130 przeszkód = cel dla dobrego gracza.
- **Krzywa trudności:** pierwsze 15 s świadomie łagodne (szersze szczeliny) — onboarding bez tekstu; potem typowe zwężanie i przyspieszanie.

### 3.3 Cozy‑twist (spójność z DNA właściciela)

Flappy żyje z frustracji, nasza marka jest „cozy”. Rozwiązanie: **dwa tryby**.
- **„Lot ekonomiczny”** (domyślny, rankingowy): klasyczna śmierć po kolizji.
- **„Lot z przesiadką”** (cozy): kolizja = utrata 1 z 3 słoików od mamy i krótkie opóźnienie, nie koniec gry. Bez rankingu czasu, ale z pocztówkami do kolekcji. Dobre dla dzieci i rodziców (grają razem na święta).

### 3.4 Przeszkody (zamiast rur) — po krajach

| Etap | Przeszkody (pary góra/dół) | Ruchome/„żywe” |
|---|---|---|
| Belgia | Atomium‑kule na tyczkach, stosy gofrów, rusztowania kamienic | Mewy z Ostendy |
| Holandia | Wiatraki (łopaty obracają szczelinę), stojaki rowerów | Tulipanowe balony |
| Niemcy | Słupy autobahnu z wiszącymi znakami „Umleitung”, kominy | Dźwigi budowlane |
| UK / Irlandia | Czerwone budki, parasole, ciągły deszcz (pogoda: wiatr w dół) | Mgła ogranicza widoczność |
| Francja | Bagietki w koszach, latarnie | Kolarze na wiaduktach |
| Norwegia/Skandynawia | Fiordy, łosie na skałach, zorza (efekt) | Śnieżyca |
| Polska (finisz) | Bloki z wielkiej płyty, trzepaki, krzyżówki dróg w remoncie | Bociany‑kuzyni pokazujące drogę |

Uniwersalne: **bramka do pomiaru bagażu** (szczelina, która się zwęża, jeśli niesiesz za dużo — patrz niżej), taśma bagażowa, pas startowy.

### 3.5 Znajdźki

| Znajdźka | Efekt | Uwagi |
|---|---|---|
| **Pieróg** | +1 punkt „smaku” (waluta miękka) | Podstawowa |
| **Kabanos** | Seria 5 = mnożnik ×2 na 10 s | |
| **Słoik od mamy** | Życie w trybie cozy / tarcza 1 kolizji w trybie rankingowym | Rzadki |
| **Paczka z Polski** | Losowa kosmetyka (czapka, szalik) | Bez lootboxów płatnych — tylko za grę |
| **Pocztówka miasta** | Kolekcja 50+ miast Polonii (Antwerpia, Eindhoven, Slough…) | Klucz do lokalnych portali |

Bez prawdziwych marek: zamiast „Kindera z Biedronki” (dwie cudze marki) dajemy generyczne **„czekoladowe jajo”** i **„wafelek od babci”** — żart zostaje czytelny, ryzyko znika.

### 3.6 Mechanika „cebulowa” (nagradzany spryt)

**Waga bagażu:** każda znajdźka‑jedzenie dodaje wagę; im cięższy, tym bocian szybciej opada. Gracz wybiera: zbierać (więcej punktów) czy lecieć lekko. Na **bramce 10 kg** (event co ~300 km) nadwaga = szybsze zwężanie bramki; można „zjeść na miejscu” (tap wielokrotny = zjada pierogi, traci punkty, chudnie). To najlepszy żart z Ryanairowej rzeczywistości **bez nazywania przewoźnika**, a cebulowy spryt jest strategią, nie wstydem.

### 3.7 Power‑upy

- **Priority Boarding** (nazwa generyczna) — 5 s nieśmiertelności.
- **Wiatr w plecy** — przyspieszenie bez kolizji (skrót przez kraj).
- **Bus‑holownik** — na 8 s bocian jedzie na dachu busa z paczkami (auto‑pilot).
- **Telefon do mamy** — spowolnienie czasu („Synku, uważaj!”).

### 3.8 Wydarzenia / „bossowie”

- **Kontrola bagażu** (co etap): miernik‑bramka zwęża się zgodnie z wagą.
- **Opóźniony lot**: ekran tablicy „DELAYED” — 3 s minigry tap‑spam, żeby „przekonać obsługę”.
- **Burza nad Alpami/Ren**: pioruny zapowiadane błyskiem 1 s wcześniej.
- **Korek na granicy (A2/A4)**: dla skina Bus — sekwencja slalomu między ciężarówkami.
- **Finał: dom** — lądowanie na gnieździe; animacja: mama w oknie, stół wigilijny, na stole *puste miejsce* „dla zbłąkanego wędrowca” — subtelny, ciepły akcent tradycji (bez religii wprost).

### 3.9 Struktura i trasy

- **Ekran startu = wybór kraju zamieszkania** (BE, NL, DE, UK, IE, FR, NO, SE, DK, ES, IT, CH, AT, FI, LU) → automatycznie **podpięcie pod właściwy portal** (stopka, link „Co słychać w Polonii BE?” → popolsku.be / aktualnosci.be).
- **Wybór celu w Polsce:** województwo/miasto (lista ~20 miast + „wieś”). Dystans liczony realnie → wynik „Antwerpia → Rzeszów”.
- **Etapy:** tło zmienia się przy przekraczaniu granic (np. BE→DE→PL). Każda granica = checkpoint + medal (Lot krajowy → Europejczyk → Ekspres do Mamy → Wigilijny As).
- **Tryb nieskończony** po dotarciu do domu: „Lot powrotny do pracy” (ironicznie: pętla w drugą stronę, trudniejsza — „wracasz z cięższą walizką”).

### 3.10 Pętla viralowa

1. **Karta wyniku (obraz 1080×1920 + 1080×1080)** generowana w Canvasie: „Doleciałem z Antwerpii do Rzeszowa w 47 s 🪺 Polonia 🇧🇪 #3 w tym tygodniu. A Ty?” + krótki link z parametrem kraju/miasta (`?r=be-antwerpia`). Share przez Web Share API (WhatsApp/Messenger/FB).
2. **Rankingi plemienne:** Polonia BE vs NL vs DE vs UK — **tygodniowa suma kilometrów** (nie tylko top wynik), więc każdy gracz „dokłada” do kraju. Podranking miast (Bruksela vs Antwerpia).
3. **Wyzwanie z linku:** otwarcie linku znajomego pokazuje jego „ducha” na trasie.
4. **Sezony:** Wigilia (1–24.12, główny), Wielkanoc (skórka zająca, pisanki), Majówka (grill — bez piwa), Wakacje (lot nad Bałtyk), Wszystkich Świętych — **pominąć** (żałoba nie jest okazją do gry).
5. **Rolki:** cotygodniowa rolka per kraj: „Polonia NL pobiła Belgię o 12 000 km”; nagranie „najgorszy fail tygodnia”; gracz‑wyzwanie redakcji („Redaktor próbuje dolecieć do Gdańska”). Rolki to darmowy UA dla gry i treść dla stron FB, które i tak trzeba codziennie zasilać.
6. **Wbudowany tryb nagrywania**: przycisk „Nagraj 15 s” (MediaRecorder z canvasu) → gotowy pionowy klip z watermarkiem portalu.

### 3.11 Monetyzacja (realistycznie)

| Źródło | Kiedy | Uwagi |
|---|---|---|
| **Ruch i zasięg portali** (cel nr 1) | Od MVP | Link w karcie wyniku, ekran mety z 1 nagłówkiem z portalu kraju („Co nowego w Polonii BE”), newsletter opt‑in |
| **Sponsor sezonu** | Od 2. sezonu | Polonijne firmy: przewozy busowe, sklepy z polską żywnością, biura księgowe, kantory/przekazy. Skórka „Bus firmy X” — sponsor wchodzi *w świat gry*, nie w reklamę. Najlepsza stawka dla małego zespołu **[szacunek]** |
| **Rewarded ads** | Faza 2 (FB Instant / Android) | Tylko „kontynuuj lot” 1× na run i podwojenie pierogów. Zero interstitiali |
| **IAP kosmetyczne** | Faza 3 | Skórki 0,99–2,99 €; bez pay‑to‑win, bez lootboxów |
| **„Postaw kawę” / wsparcie** | Opcjonalnie | Mało pieniędzy, dużo sympatii |

Uczciwie: przychód z reklam w grze niszowej będzie symboliczny (hyper‑casual ma niski ARPU [Źr. 8][Źr. 10]). Mierzymy grę jak **kampanię marketingową**, nie jak produkt.

### 3.12 Technologia

**Rekomendacja:** **Phaser 3 (lub czysty Canvas 2D) + Vite, PWA** (manifest + service worker, offline), hosting statyczny (ten sam serwer/CDN co portale). Backend rankingów: mały endpoint PHP + MySQL/SQLite (zespół zna PHP z Osadale), z walidacją po stronie serwera (zapis replay seedu + czasu, limit tempa) przeciw oszustwom. Osadzanie: `<iframe>` w WordPressie portali + własna strona.

Dlaczego nie silnik Osadale/WebGL: przerost; one‑tap potrzebuje < 1 MB, startu < 2 s na słabym Androidzie.

Faza 2: **Facebook Instant Games** z Zero Permissions (ta sama baza kodu, SDK FB, kontekst „zagraj z grupą”) [Źr. 12]. Faza 3: **TWA na Google Play** przez Bubblewrap/PWABuilder [Źr. 15].

**Szacunek MVP (1 osoba + AI) [szacunek]:**

| Blok | Dni |
|---|---|
| Rdzeń: fizyka, kolizje, przewijanie, krzywa trudności, restart | 1,5 |
| 3 kraje startowe (BE, NL, DE) + Polska, parallax tła | 2 |
| Znajdźki + waga bagażu + 2 power‑upy | 1,5 |
| UI: start, wybór kraju/miasta, meta, karta wyniku (share) | 1,5 |
| Ranking tygodniowy per kraj (PHP API + anty‑cheat podstawowy) | 1,5 |
| PWA, audio, analityka (zdarzenia), RODO/cookies | 1 |
| Testy na urządzeniach, balans, poprawki | 1,5 |
| **Razem** | **~10,5 dnia** (bufor do 12) |

**MVP:** 1 bohater (Bocian), 3+1 kraje, tryb rankingowy + cozy, karta wyniku, ranking krajów, link do portalu.
**Później:** pozostałe kraje (do 15), skórki, eventy sezonowe, duchy znajomych, nagrywanie klipów, FB Instant, Android, sponsorzy, i18n (NL/FR/DE dla „pokaż koledze z pracy”).

**Grafika — styl i źródła:**
- **Płaski wektor (SVG → sprite atlas)**, gruba kontur‑linia, ciepła paleta — szybciej iterowalny z AI niż pixel art, skaluje się na każdy ekran. Alternatywa: 32‑px pixel art (taniej, ale trudniej o „markowość”).
- Źródła legalne: **Kenney.nl (CC0)** na prymitywy UI/tła **[szacunek: znana licencja CC0]**, OpenGameArt (sprawdzać licencję per plik), własne rysunki/AI‑generowane z ręczną poprawką (ważne: obrazy z AI nie dają pewnej ochrony autorskiej — kluczowe postacie dopracować ręcznie), dźwięki: Freesound (CC0/CC‑BY z atrybucją), muzyka: własny jingiel (zespół i tak robi jingle do rolek).
- Rejestr pochodzenia zasobów (`ASSETS.md`: plik, źródło, licencja) — taka sama higiena jak w Osadale.

---

## 4. Ryzyka i ich ograniczanie

| Ryzyko | Prawdopodob. | Wpływ | Mitigacja |
|---|---|---|---|
| Znak „Flappy Bird” / odrzut za klonowanie | Średnie (jeśli kopiujemy) | Wysoki | Zero „Flappy”, własne przeszkody, własny bohater; w opisie: „one‑tap”, nie „jak Flappy” |
| Marki przewoźników/sklepów | Średnie | Średni | Brak logo i parodii nazw; generyki („tani przewoźnik”, „Linie Bocianie”) [Źr. 34] |
| Wizerunek: „gra szydzi z Polaków” | Średnie | Wysoki (portale!) | Zasady tonu §1.5, przegląd każdego tekstu „testem babci”, beta w 1 grupie FB przed startem |
| Polityka/tragedia w UGC (nicki, nazwy miast) | Wysokie | Średni | Nicki z listy generowanej („Bocian z Gandawy #423”) zamiast wolnego tekstu |
| Oszustwa w rankingu (Polonia vs Polonia napędza cheating) | Wysokie | Średni | Walidacja serwerowa, limit wyników/IP, odrzut nierealnych czasów, ranking „suma km” odporniejszy niż top‑1 |
| RODO / dzieci | Średnie | Średni | Bez kont w MVP, anonimowy ID w localStorage, brak reklam personalizowanych; polityka prywatności portalu |
| „Kolejny klon” — nikt nie gra | Wysokie | Niski (koszt ~2 tyg.) | Haczyk społecznościowy (rywalizacja krajów + Wigilia), dystrybucja własnymi kanałami; decyzja go/no‑go po 4 tyg. KPI |
| Wypalenie (lekcja Nguyena) | Niskie | — | Gra jest projektem kampanijnym, nie produktem 24/7; live‑ops tylko sezonowe |
| Rozproszenie od Osadale | Średnie | Średni | Ścisły timebox MVP 12 dni, osobne repo |

---

## 5. Plan działania

| Tydzień | Cel | Wynik |
|---|---|---|
| **Tydz. 1 (od 2.11)** | Prototyp rdzenia + styl | Grywalny bocian na 1 trasie (BE→PL), testy „czy chce się zagrać jeszcze raz” na 5–10 osobach; weryfikacja nazwy w EUIPO/UPRP; zakup domeny |
| **Tydz. 2** | MVP | 3 kraje + PL, karta wyniku, ranking krajów, PWA; zamknięta beta w jednej grupie FB (np. BE) |
| **Tydz. 3 (do ~20.11)** | Poprawki + content | Balans, rolki zapowiadające (3 kraje), iframe w portalach BE/NL/DE |
| **Tydz. 4 (start 1.12)** | **Start sezonu „Na Wigilię!”** | Publiczny launch, codzienna rolka „ranking Polonii”, sondy na stronach FB |
| Tydz. 5–7 | Skalowanie lub stop | Jeśli KPI ≥ progi → kolejne kraje (UK, IE, NO, FR), skórki, FB Instant; jeśli nie → gra zostaje jako sezonowy widget w portalach |
| Q1 2027 | Wielkanoc / Android TWA | Event wielkanocny, sponsor sezonu |

### KPI (próg „chwyciło” — **[szacunek]** dobrany do skali niszowej)

| Metryka | Próg „działa” | Próg „hit” |
|---|---|---|
| Unikalni gracze w 1. miesiącu | 10 000 | 50 000 |
| Średnia liczba runów na sesję | ≥ 4 | ≥ 8 |
| D1 / D7 retencja (web, anonimowe ID) | 15% / 5% | 25% / 10% |
| **Współczynnik udostępnień** (share / gracz) | ≥ 5% | ≥ 12% |
| Gracze z linku znajomego (K‑faktor proxy) | ≥ 20% ruchu | ≥ 40% |
| Kliknięcia gra → portal (CTR) | ≥ 3% | ≥ 8% |
| Zasięg rolek z gameplayem vs średnia rolek kraju | ≥ 1× | ≥ 2× |
| Nowi obserwujący stron FB w sezonie | +2% | +10% |
| Sentyment komentarzy (ręczny przegląd 100) | < 5% negatywnych „obraźliwe” | < 2% |

Narzędzia: zdarzenia `run_start`, `run_end(km, kraj)`, `share_click`, `portal_click` do istniejącej analityki portali (bez nowego stosu).

---

## 6. Źródła

1. Wikipedia — Flappy Bird: https://en.wikipedia.org/wiki/Flappy_Bird
2. BGR — Here’s the real reason Flappy Bird was removed: https://bgr.com/general/why-flappy-bird-was-removed/
3. Wikipedia — Flappy Bird (2024 video game): https://en.wikipedia.org/wiki/Flappy_Bird_(2024_video_game)
4. Time Extension — Flappy Bird creator claims he never sold the rights: https://timeextension.com/news/2024/09/flappy-bird-creator-claims-he-never-sold-the-rights-to-the-game
5. Decrypt — Flappy Bird returns as Telegram crypto game, creator denies involvement: https://decrypt.co/249593/flappy-bird-returns-first-telegram-crypto-game-creator-denies-involvement
6. MacRumors — Flappy Bird clones rejected (2014): https://macrumors.com/2014/02/17/flappy-bird-clones-rejected
7. The Next Web — Apple, Google now rejecting games with “Flappy” in title: https://thenextweb.com/news/apple-google-now-rejecting-games-flappy-title
8. AppDeveloper Magazine — Mobile Casual Benchmarks Report 2025: https://appdevelopermagazine.com/mobile-casual-benchmarks-report-2025/
9. Unity — 2025 Mobile gaming trends: https://unity.com/blog/2025-mobile-gaming-trends-unity-perspectives
10. PocketGamer.biz — What happened to hypercasual (28.04.2026): https://www.pocketgamer.biz/what-happened-to-hypercasual-the-markets-evolution-over-the-past-year/
11. Verve — Hybrid monetization in casual games: https://verve.com/blog/hybrid-monetization-in-casual-games-how-beresnev-strikes-the-right-balance/
12. Meta for Developers — Important changes to Web Games and Instant Games (31.07.2025, akt. 18.11.2025): https://developers.facebook.com/blog/post/2025/07/31/web-and-instant-games-changes/
13. Meta — Legacy Web Games (Canvas) archive: https://developers.facebook.com/documentation/games/archive/legacy-web-games
14. Engadget — Facebook’s Instant Games are leaving Messenger (2019): https://www.engadget.com/2019-07-26-instant-games-facebook-gaming-tab.html
15. Thinktecture — Bubblewrap: publish your PWA in Google Play: https://www.thinktecture.com/en/pwa/twa-bubblewrap
16. MobiLoud — Publishing a PWA to app stores: https://www.mobiloud.com/blog/publishing-pwa-app-store
17. Telegram — Mini App Bar, Paid Media…: https://telegram.org/blog/mini-app-bar-paid-media-and-more
18. Telegram — Telegram Stars: https://telegram.dog/blog/telegram-stars/ar?setln=en
19. TikTok for Developers — Mini Games overview: https://developers.tiktok.com/docs/en/mini-games-overview
20. PocketGamer.biz — TikTok UK test of in‑app minigames: https://www.pocketgamer.biz/news/80912/tiktok-leans-further-into-games-with-uk-test-of-in-app-minigames/
21. Cinevva — How to get your game on Poki (2026) (źródło wtórne): https://app.cinevva.com/guides/publish-game-poki
22. Cinevva — CrazyGames developer guide (2026) (źródło wtórne): https://app.cinevva.com/guides/publish-game-crazygames
23. Spider’s Web — Janusz Symulator na Steam: https://spidersweb.pl/2025/01/janusz-symulator-steam-gra.html
24. Instalki.pl — Powstaje symulator stereotypowego Polaka: https://www.instalki.pl/news/gry/janusz-symulator-gra-o-stereotypowym-polsku/
25. Chip.pl — Flappy Smoleńsk (2014): https://www.chip.pl/2014/02/flappy-smolensk-lec-i-omijaj-brzozy
26. iMagazine — Flapping Fish, polskie aplikacje w App Store: https://imagazine.pl/2014/11/23/flapping-fish-polskie-aplikacje-w-app-store
27. Antyweb — Flappy Bird i Retry przy polskim Timberman to pikuś: https://antyweb.pl/flappy-bird-i-retry-przy-polskim-timberman-to-pikus-rewelacja
28. Wikipedia — Polish plumber: https://en.wikipedia.org/wiki/Polish_plumber
29. PM Magazine — Polish tourism office beckons French with Polish plumber: https://pmmag.com/articles/87909-polish-tourism-office-beckons-french-with-polish-plumber
30. Bankier.pl — W Ryanairze liczy się każdy centymetr bagażu: https://www.bankier.pl/wiadomosc/W-Ryanairze-liczy-sie-kazdy-centymetr-bagazu-Inaczej-trzeba-slono-doplacic-8929835.html
31. Wikipedia — Polish joke: https://en.wikipedia.org/wiki/Polish_joke
32. Culture.pl — The anatomy of a Polish joke: https://culture.pl/en/article/the-anatomy-of-a-polish-joke
33. TVN24 — Polak z kozą nas obraża? „Moglibyśmy wyluzować”: https://tvn24.pl/ciekawostki/polak-z-koza-nas-obraza-moglibysmy-wyluzowac-ra166051-ls3518552
34. Irish Times — Ryanair injunction over use of images refused: https://www.irishtimes.com/business/sectors/ryanair-injunction-over-use-of-images-refused-1.1067419
35. GUS — Emigracja na pobyt czasowy 2020–2025 (wielkość rynku: ok. 1,37 mln Polaków w Europie; UK 412 tys., DE 386 tys., NL 130 tys.): https://stat.gov.pl/en/topics/population/internationa-migration/information-on-the-size-and-directions-of-emigration-for-temporary-stay-from-poland-in-2020-2025,8,17.html
36. Antyweb — Gdzie są polskie gry o Polakach? (2014): https://antyweb.pl/gdzie-sa-polskie-gry-o-polakach

*Uwaga: dane o portalach gier (21–22) i niektóre statystyki rynkowe (8, 9, 11) pochodzą z materiałów dostawców/agregatorów — traktować orientacyjnie. Kwestie prawne to analiza, nie porada prawna; przed komercjalizacją nazwy zrobić wyszukiwanie znaków w EUIPO/UPRP.*
