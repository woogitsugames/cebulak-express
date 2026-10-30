# Karta produktu — Google Play (PL), wersja robocza

**Stan:** 30.10.2026. Źródło funkcji: decyzje D1–D4, D7–D8 w `docs/GDD.md` i zlecenia 11, 14, 18. **Nie publikować przed testem funkcji w APK/AAB.** Główna nazwa marki pozostaje „Cebulak Express”; rozwinięcie nazwy sklepowej mieści się w 30 znakach.

## Pola do skopiowania do Play Console

### Nazwa — 26/30 znaków

```text
Cebulak Express: Do Polski
```

### Krótki opis — 66/80 znaków

```text
Lataj kombi do Polski, łap słoiki i zbieraj km dla swojej Polonii!
```

### Pełny opis — 1353/4000 znaków (łącznie ze spacjami i nowymi wierszami)

```text
Cebulak Express: Do Polski to zręcznościowa gra po polsku o podróży, którą zna wielu Polaków mieszkających za granicą. Bagażnik pełny, walizki na dachu, a do domu jeszcze setki kilometrów. Tym razem twoje kombi potrafi latać!

JEDEN DOTYK, JEDNA TRASA
Dotknij ekranu, aby podskoczyć. Omijaj wiadukty, szlabany, znaki i roboty drogowe. Jeden błąd kończy przejazd, ale kolejna próba jest o jeden dotyk stąd.

SŁOIKI I PACZKI OD MAMY
Łap znajdźki po drodze, żeby zdobywać dodatkowe kilometry. Uważaj: pełne kombi przez chwilę robi się cięższe. Ryzyko czy bezpieczny przelot? Ty wybierasz.

Z OŚMIU KRAJÓW W STRONĘ POLSKI
Wyrusz z Belgii, Holandii, Niemiec, Wielkiej Brytanii, Francji, Szwajcarii, Norwegii lub Danii. Wybierz trasę i patrz, jak zmieniają się krajobrazy po drodze.

LIGA POLONII
Każdy poprawnie zaliczony przejazd dokłada kilometry do wyniku wybranego kraju. Sprawdź ranking graczy i kibicuj swojej ekipie.

WYZWANIE DNIA
Zmierz się z codzienną trasą na tych samych zasadach co inni gracze. Porównaj wynik i spróbuj ponownie.

GRAJ I UDOSTĘPNIAJ
Wynik jest podawany w kilometrach. Po zakończeniu lotu możesz pokazać znajomym, jak daleko doleciałeś.

Bez wpisywania danych osobowych i bez reklam personalizowanych. Do rankingu wystarcza anonimowy identyfikator i pseudonim wybrany z gotowej listy.

Kierunek Polska. Ile kilometrów przelecisz?
```

### „Co nowego” — 138/500 znaków (propozycja na 1.0.0)

```text
Premiera Cebulak Express! Ruszaj do Polski z 8 krajów, zbieraj słoiki i paczki od mamy, sprawdź ranking Ligi Polonii i udostępniaj wyniki.
```

## Krótkie wersje dla EN / NL / DE / FR

**Ważne:** to **tłumaczenia metadanych**, a nie obietnica lokalizacji gry. Interfejs i napisy gry pozostają po polsku. We wszystkich lokalizacjach nazwa pozostaje `Cebulak Express: Do Polski` (26/30).

| Wersja | Krótki opis | Liczba znaków / limit |
|---|---|---:|
| EN | A Polish-language one-tap game: fly your overloaded car home to Poland. | 71/80 |
| NL | Poolstalig tikspel: vlieg met je volgeladen auto terug naar Polen. | 66/80 |
| DE | Polnischsprachiges Tipp-Spiel: Flieg im vollgepackten Kombi nach Polen. | 71/80 |
| FR | Jeu en polonais : faites voler un break chargé jusqu'en Pologne ! | 65/80 |

## Bramka publikacyjna

- [ ] Potwierdzić obecność 8 krajów i rzeczywistych teł w wersji wydawanej (D3).
- [ ] Potwierdzić produkcyjny i poprawnie weryfikowany ranking (D4/D8), nicki tylko z listy.
- [ ] Potwierdzić codzienne wyzwanie (zlecenie 18); jeśli nie gotowe, usunąć całą sekcję **WYZWANIE DNIA**.
- [ ] Potwierdzić udostępnianie wyników (zlecenie 14); jeśli nie gotowe, usunąć wzmiankę.
- [ ] Potwierdzić brak reklam personalizowanych i działający link do polityki prywatności.
- [ ] Sprawdzić nazwę w rejestrach znaków i sklepach zgodnie ze zleceniem 27; ten pakiet nie zastępuje kontroli prawnej.
- [ ] Zweryfikować deklarację Data safety i klasyfikację IARC na podstawie finalnego builda.
- [ ] Wersje EN/NL/DE/FR udostępniać jako opisy lokalizowane tylko wtedy, gdy sklep pozwoli wyraźnie zakomunikować polski język gry.

## Reguły i źródła

Nie dopisuj słów kluczowych „po przecinku” na końcu opisu ani odniesień do konkurencyjnych tytułów. Opis ma odzwierciedlać faktycznie dostępną funkcjonalność. Limity: [Google Play — App details](https://support.google.com/googleplay/android-developer/answer/9859152); wymogi spójności: [Best practices](https://support.google.com/googleplay/android-developer/answer/13393723) i [Metadata policy](https://support.google.com/googleplay/android-developer/answer/18258653). Dostęp 30.10.2026.
