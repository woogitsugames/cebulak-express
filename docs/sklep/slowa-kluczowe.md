# ASO i słowa kluczowe — Cebulak Express

**Data analizy:** 30.10.2026. **Charakter:** jakościowa analiza trafności i intencji; brak dostępu do rzeczywistych wolumenów zapytań, danych konkurencyjnych ASO oraz konsoli sklepu. **Priorytet nie oznacza potwierdzonego wolumenu.**

## Założenia segmentacji

- **Podstawowy odbiorca:** polskojęzyczne osoby mieszkające w BE, NL, DE, UK, FR, CH, NO, DK i ich znajomi; język gry PL.
- **Intencja rozrywkowa:** krótka gra zręcznościowa na telefon, jeden dotyk, bicie rekordu.
- **Intencja emocjonalna:** wyjazd do domu, droga do Polski, walizki i słoiki.
- **Intencja społeczna:** porównanie wyniku w km i wyników Ligi Polonii.
- **Nie targetujemy** zapytań o transport pasażerski, pracę za granicą, poradniki emigracyjne ani informacje administracyjne, bo gra nie realizuje tych potrzeb.

## Frazy i uzasadnienie

| Fraza (propozycja do badania) | Intencja | Trafność | Priorytet | Sposób naturalnego wykorzystania |
|---|---|---|---|---|
| gra po polsku | szukanie gry w języku PL | bardzo wysoka | P1 | pierwszy akapit pełnego opisu |
| gra zręcznościowa | szukanie gatunku | bardzo wysoka | P1 | kategoria Arcade, pełny opis |
| gra na telefon po polsku | urządzenie + język | wysoka | P1 | test alternatywy pierwszego akapitu |
| Cebulak Express | wyszukiwanie marki | najwyższa | P1 | nazwa sklepu, grafika promocyjna |
| gra dla Polonii | społeczność i humor | wysoka | P1 | krótki opis + Liga Polonii |
| powrót do Polski | nostalgia / podróż | wysoka jako motyw | P2 | narracja o trasie, nie deklaracja gry transportowej |
| Kierunek Polska | marka tematyczna | wysoka | P2 | CTA w zakończeniu i grafikach |
| kombi do Polski | humor podróżniczy | średnia | P2 | mechanika i nagłówek zrzutu |
| słoiki od mamy | lokalny żart / znajdźka | wysoka semantycznie, wolumen nieznany | P2 | sekcja o paczkach i słoikach |
| emigracja / emigrant | kontekst odbiorcy | średnia | P2 | opis sytuacji, nie słowo powtarzane dla algorytmu |
| Polonia w Belgii / Polonia w Holandii | geograficzna społeczność | średnia | P3 | przede wszystkim kampanie i portale, nie spam w opisie |
| ranking Polonii | rywalizacja | wysoka tylko po wdrożeniu rankingu | P2 warunkowo | sekcja Liga Polonii |
| gra na jeden palec | prostota sterowania | wysoka | P2 | grafika nr 1 i opis mechaniki |
| gra o podróży | kontekst rozgrywki | średnia | P3 | wariant opisu do testów |
| gra o słoikach | memiczny long-tail | niszowa / niepotwierdzona | P3 | test kreatywny w social media, nie w nazwie |
| gra offline | oczekiwanie działania bez sieci | **nieweryfikowana** | **nie używać** | ranking wymaga połączenia; najpierw test aplikacji |

**Hipoteza:** pierwsze dwa czynniki discovery to „gra po polsku” i unikalna mechanika. Tę hipotezę należy potwierdzić w danych Google Play Console i testach, nie przedstawiać jej jako faktu o trendach wyszukiwania.

## Dobór pól

- **Google Play:** nie ma osobnego pola „keywords”. Frazy umieszczamy naturalnie w tytule, krótkim i pełnym opisie. Najwyższa wartość komunikacyjna: pierwsze 1–2 zdania + zrzuty 1–3. Nie powtarzamy sztucznie „gra, polska, gra, Polonia”.
- **App Store (późniejszy etap):** osobne pole keywords, limit **100 bajtów**; bez nazw konkurencji i zbędnych powtórzeń słów z nazwy/podtytułu. Propozycja PL do testu (87/100 bajtów — tylko ASCII):
  ```text
  polonia,emigracja,powrot,podroz,sloiki,kombi,refleks,kilometry,lot,wyzwanie,rodzina,dom
  ```
  Nie wkładać do sklepu bez sprawdzenia finalnej nazwy, podtytułu, funkcji i lokalizacji. 
- **EN/NL/DE/FR:** krótkie opisy mają od razu wyjaśniać, że gra jest *po polsku*. Frazy „Polish-language game”, „Poolstalig spel”, „polnischsprachiges Spiel”, „jeu en polonais” są semantycznie zgodne, ale ich wolumenu nie badano.
- **Brak keyword stuffing:** bez cudzych marek, tytułów gier, obietnic „nr 1”, „najlepsza gra” itp.

## Plan testów po publikacji

1. Zamrozić bazową kartę na 2 tygodnie; w Play Console zapisać wyświetlenia karty, źródła pozyskania, instalacje, współczynnik konwersji i zapytania wyszukiwania **o ile są udostępnione**.
2. Porównać wariant A („Lataj kombi…”) z B („Gra po polsku o powrocie do domu…”) testem karty w Play Console, bez jednoczesnej zmiany ikon i wszystkich zrzutów.
3. Osobno testować pierwsze trzy zrzuty: sterowanie, pochodzenie z 8 krajów, słoiki; mierzyć konwersję i retencję D1 (retencja poza samym Play Console).
4. Segmentować kraje dystrybucji i języki kart: PL dla Polonii, EN/NL/DE/FR jako pomoc dla znajomych — bez sugerowania, że interfejs gry ma te tłumaczenia.
5. Po 14–28 dniach wyciągnąć wnioski na podstawie liczebności próby; jeśli jej brak, odnotować brak podstaw do wnioskowania.

## Źródła zasad (dostęp 30.10.2026)

- [Google Play — maksymalne długości pól](https://support.google.com/googleplay/android-developer/answer/9859152).
- [Google Play — zalecenia dotyczące opisów i grafik](https://support.google.com/googleplay/android-developer/answer/13393723).
- [Google Play — polityka metadanych](https://support.google.com/googleplay/android-developer/answer/18258653).
- [Apple — Product Page / Keywords](https://developer.apple.com/app-store/product-page/).
- [Apple — App Store Search](https://developer.apple.com/app-store/search/).
- Materiały produktowe: `docs/GDD.md`, `docs/zlecenia/11-firebase-backend.md`, `docs/zlecenia/17-analityka.md`. Dane o popularności zapytań **nie były pozyskiwane**.
