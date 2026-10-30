# Kategoria, IARC i odbiorcy — propozycja do weryfikacji

**Stan na 30.10.2026.** To **instrukcja do formularza**, a nie wynik ankiety IARC; rating przyznaje właściwa organizacja na podstawie prawdziwych odpowiedzi dla finalnego builda. Zmiana gry po publikacji wymaga aktualizacji odpowiedzi.

## Google Play: klasyfikacja

- **Rodzaj:** gra (Game).
- **Kategoria:** **Arcade / Gry zręcznościowe** — one-tap, refleks, przeszkody, kolejne próby. Lepsze dopasowanie niż Racing, ponieważ nie ma sterowania wyścigowego ani konkurencji na torze, oraz niż Simulation.
- **Język aplikacji:** polski. Angielski, niderlandzki, niemiecki i francuski opis sklepu to wsparcie odkrywania gry, nie gotowe tłumaczenia interfejsu.
- **Grupa docelowa (osobny formularz od IARC):** Polonia i osoby zainteresowane krótką grą zręcznościową. **Wstępna propozycja** zaznaczenia grup 13–15, 16–17, 18+ — *tylko jeśli* realne materiały i grupa docelowa to potwierdzają. Grafika kreskówkowa i łatwe sterowanie mogą przyciągać młodszych; nie dobierać wieku wyłącznie, aby omijać politykę Families. Jeśli gra jest kierowana do dzieci poniżej 13 lat, uwzględnić je i spełnić odpowiednie zasady.

## Proponowane odpowiedzi w IARC — warunkowe

| Obszar / pytanie o treść (sens, nie cytat dosłowny) | Proponowana odpowiedź | Warunek / uwaga |
|---|---|---|
| Czy to gra? | **Tak** | Gatunek Arcade |
| Czy są realistyczne obrażenia osób lub zwierząt, krew, śmierć? | **Nie** | Zderzenie kończy się abstrakcyjnym „Koniec trasy”, bez osób poszkodowanych; obejrzeć finalną animację |
| Czy jest jakakolwiek przemoc fantastyczna/komiczna? | **Do oceny w finalnym buildzie** | Auto uderza w przeszkody. Jeśli formularz kwalifikuje to jako przemoc komiczną, odpowiedzieć **tak**; nie zaniżać kwalifikacji |
| Seksualność, nagość, wulgaryzmy, zastraszanie | **Nie** | Brak takich elementów w zamierzonym projekcie |
| Alkohol, papierosy, narkotyki | **Nie** | Zgodnie z zasadami GDD |
| Hazard, kasyno, kupowanie losów, nagrody losowe | **Nie** | Brak zakładów, płatnych losowań, nagród; jeśli sponsor wprowadzi nagrody, ponownie ocenić |
| Treści budzące grozę / horror | **Nie** | O ile nie powstaną straszące sceny lub dźwięki |
| Wymiana treści między użytkownikami | **Nie dla czatu i swobodnych treści; ranking wymaga osobnej kontroli** | Nick z zamkniętej listy + liczba km są publicznie widoczne. Zależnie od dosłownego brzmienia pytań należy ujawnić funkcję online / widoczne wyniki |
| Bezpośrednia komunikacja graczy / chat | **Nie** | Projekt nie oferuje wiadomości ani swobodnego wpisywania pseudonimów |
| Reklamy zewnętrzne / UGC | **Nie na start** | Zweryfikować finalne integracje; link do portalu to nie to samo co sieć reklamowa |
| Dostęp do nieskrępowanego Internetu | **Do sprawdzenia** | Gra kieruje do portali Polonii przez link; ocenić, czy wewnętrzny WebView pozwala poruszać się po otwartej sieci czy otwiera systemową przeglądarkę |

**Przewidywany charakter:** rodzinny i humorystyczny, bez drastycznych treści. **Nie deklarować PEGI 3 ani innej konkretnej oceny przed wynikiem IARC.** Nawet jeśli samą grę sklasyfikowano łagodnie, należy sprawdzić mechanikę portali zewnętrznych i wszystkie aktualne grafiki.

## Lista końcowa do Play Console

- [ ] Otworzyć **Policy → App content → Content rating**, wybrać Game, wypełnić wszystkie **faktyczne** pytania dla wydawanego AAB/APK.
- [ ] Sprawdzić ekran porażki i dźwięk kolizji: czy nie ma przemocy wymagającej oznaczenia.
- [ ] Zweryfikować, czy ranking oznacza treści widoczne dla innych i czy w pełni blokuje własny tekst użytkownika.
- [ ] Sprawdzić działanie linków do portali (zewnętrzna przeglądarka vs WebView).
- [ ] Uzupełnić **Target audience and content** zgodnie z realną grupą docelową i zasadami Families, jeśli dotyczy.
- [ ] Zaakceptować wyliczony rating i odnotować jego numer / datę dla kolejnych wydań.

**Źródła (dostęp 30.10.2026):** [Google Play — Content Ratings](https://support.google.com/googleplay/android-developer/answer/9898843), [Content rating requirements](https://support.google.com/googleplay/android-developer/answer/9859655), [Target audience](https://support.google.com/googleplay/android-developer/answer/9867159), [Families Policy](https://support.google.com/googleplay/android-developer/answer/9893335).
