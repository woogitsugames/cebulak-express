# Google Play — Data safety (projekt formularza, nie deklaracja końcowa)

**BLOKADA PUBLIKACJI: wymaga aktualizacji.** W chwili przygotowania (30.10.2026) w `main` **nie ma `firebase/PRIVACY.md`**, a zlecenia 11 (backend rankingu), 17 (analityka), 27 (polityka prywatności) nie były jeszcze scalone. Nie da się uczciwie zatwierdzić odpowiedzi „nie zbieramy danych” bez finalnego kodu i konfiguracji. Poniżej robocza mapa danych oparta na kontraktach tych zleceń i dokumentacji dostawcy.

## Przepływ danych przewidziany w projekcie

`aplikacja Android (Capacitor/WebView) → Firebase Authentication (anonimowy UID) → Cloud Functions → Firestore`.

- `runs/{runId}`: UID, kraj startu, trasa, seed, czas, klatki dotknięć (`flapTicks`), km; założona retencja rekordów przejazdów **30 dni** (zgodnie z zamówieniem T11; skontrolować wdrożenie funkcji kasującej).
- `players/{uid}`, `leaderboard/{week}/entries/{uid}`, `daily/.../entries/{uid}`: wygenerowany `nickId`, UID, kraj, najlepszy wynik i czas; widoczność publiczna pseudonimu/wyniku, nie danych logowania.
- `league/{week}`: sumy km i liczby przejazdów według krajów.
- Opcjonalna analityka z T17: `app_open`, `run_start`, `run_end`, `share_click`, `portal_click`, `league_open`, `install_prompt`; **założenie** T17 to dzienne agregaty bez surowych rekordów w Firestore, *nie* Firebase Analytics.
- Firebase Authentication i Cloud Functions technicznie przetwarzają adres IP i user-agent po stronie dostawcy, nawet jeśli **nie zapisujemy IP w własnej kolekcji Firestore**. Nie wolno mylić obu stwierdzeń.

## Robocze kategorie w formularzu

| Kategoria Data safety | Wstępny wybór | Dlaczego / czego szukać w buildzie |
|---|---|---|
| Czy aplikacja zbiera dane użytkowników? | **Tak** | UID, wynik, historia przejazdu i interakcje opuszczają urządzenie |
| Personal info → User IDs | **Tak** | Anonimowy identyfikator Firebase Auth nadal jest identyfikatorem użytkownika; cel: funkcjonalność i przeciwdziałanie nadużyciom |
| App activity → Other actions / App interactions | **Tak** | Kilometry, czas gry, przyciski, sekwencja dotknięć weryfikowana po stronie serwera; klasyfikację podtypu potwierdzić z finalnym schematem |
| Device or other IDs | **Sprawdzić, prawdopodobnie tak** | Firebase Installation ID zależy od faktycznie zainstalowanych SDK; szczególnie JS SDK wewnątrz WebView vs natywne |
| Approximate location | **Nie zakładamy** | Kraj startowy wybiera gracz, nie jest automatycznie geolokalizowany. Jeśli IP jest używane do ustalania lokalizacji w jakiejkolwiek usłudze — ponownie rozważyć |
| App info and performance | **Zależne od finalnego SDK** | Brak Crashlytics i Performance Monitoring w briefie; sprawdzić biblioteki/transitive SDK oraz logging |
| Name, email, phone, contacts, payment, photos, audio | **Nie** w projekcie | Nick jest wyłącznie z gotowej listy; nie ma rejestracji e-mail ani płatności; potwierdzić uprawnienia Android |
| Data shared with third parties | **Zależne od rzeczywistej roli odbiorców** | Przetwarzanie przez dostawcę usługi może mieścić się w wyłączeniu dla service providers; sprawdzić politykę Play, umowy, portale oraz inne SDK, nie automatyzować odpowiedzi „nie” |
| Data encrypted in transit | **Tak, po weryfikacji ruchu** | Firebase deklaruje HTTPS; sprawdzić wszystkie endpointy własne i osadzenia |
| Users can request data deletion | **Nieoznaczone — trzeba wdrożyć / potwierdzić** | Udostępnić operacyjny sposób kasowania UID, wyników i danych powiązanych (z wyjątkami jasno opisanymi) |
| Ads / selling data / personalized ads | **Brak w założeniach** | T17 nie ma reklamowych ID; zweryfikować finalny artefakt i ewentualny sponsor / promowanie portali |

W każdym rekordzie zadeklarować **właściwy cel** (funkcja, bezpieczeństwo, ewentualna analityka), czy zbieranie jest obowiązkowe lub opcjonalne, ewentualne udostępnianie oraz retencję zgodnie z definicjami formularza. Nie da się określić wszystkich odpowiedzi na poziomie samego planu.

## Krytyczne rozróżnienia

1. **Brak logowania formularzem ≠ brak kont technicznych.** Firebase Anonymous Auth tworzy identyfikator powiązany z sesją. Polityka kont do usuwania ma konkretne warunki; sposób spełnienia zasad trzeba potwierdzić w Play Console i u osoby odpowiedzialnej za prywatność.
2. **Brak IP w bazie gry ≠ brak przetwarzania IP.** Dostawca deklaruje tymczasowe IP w Functions i logowane IP w Authentication przez kilka tygodni. Nie można publicznie obiecać pełnego braku IP na serwerach dostawców.
3. **Brak SDK reklam ≠ brak danych.** UID i replay to dane wysyłane na serwer. Dane z WebView kontrolowanego przez twórcę aplikacji podlegają ujawnieniu.
4. **Brak Firebase Analytics w T17** nie wyklucza obowiązku opisania wysyłanych dziennych zdarzeń ani identyfikatorów z innych SDK.
5. **Link do portalu** wymaga audytu: czy otwiera niezależną przeglądarkę czy kod kontrolowanego WebView, czy ładuje dodatkowe skrypty/trackery.

## Przed wypełnieniem produkcyjnego Data safety

- [ ] Porównać po scaleniu z rzeczywistym `firebase/PRIVACY.md` i `docs/prawo/polityka-prywatnosci.md`; usunąć rozbieżności.
- [ ] Sporządzić listę SDK (web i natywne), endpointów, plików cookie/localStorage, dzienników serwera, danych przesyłanych przy braku interakcji.
- [ ] Sprawdzić na **release buildzie**, co trafia do usług podczas startu, rozgrywki, rankingowania, udostępniania i otwarcia portali.
- [ ] Potwierdzić implementację retencji `runs` 30 dni i zasady usuwania UID / rekordów rankingowych; sprawdzić, czy Firebase Auth pozwala usuwać anonimowych użytkowników.
- [ ] Opublikować **rzeczywisty, ogólnodostępny HTTPS URL** polityki prywatności i mechanizmu żądania usunięcia danych (jeśli wymagany). Nie wpisywać fikcyjnych adresów do Play Console.
- [ ] Uzgodnić odpowiadającą prawdzie deklarację z T27; powtórzyć po każdej istotnej zmianie SDK lub funkcji.

## Źródła (dostęp 30.10.2026)

- [Google Play — deklaracja Data safety i definicje kolekcji, SDK oraz WebView](https://support.google.com/googleplay/android-developer/answer/10787469).
- [Firebase — Android SDK Play data disclosure](https://firebase.google.com/docs/android/play-data-disclosure) (**uwaga:** opis natywnych SDK Android, dla wersji Capacitor/JS dodatkowo zbadać faktyczną ścieżkę).
- [Firebase — Privacy and Security](https://firebase.google.com/support/privacy).
- [Google Play — wymagania dotyczące usunięcia konta](https://support.google.com/googleplay/android-developer/answer/13327111).
- `docs/zlecenia/11-firebase-backend.md` (model danych, retencja), `docs/zlecenia/17-analityka.md` (agregaty i brak Firebase Analytics), `docs/zlecenia/27-prawo-prywatnosc.md` (polityka prawna).
