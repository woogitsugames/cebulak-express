# Analityka bez śledzenia — projekt techniczny i prywatność

## Zakres i model danych

Moduł `src/analytics/track.ts` obsługuje zdarzenia: `app_open`, `run_start`, `run_end`, `share_click`, `portal_click`, `league_open`, `install_prompt`. Wysyłane są tylko pola wymienione w typach zdarzeń (enumy kraju, trybu, przyczyny, formatu i miejsca kliknięcia oraz liczby kilometrów i sekund). **Nie wysyłamy identyfikatorów instalacji, dziennych hashy, nicków, lokalizacji GPS, adresów URL, e-maili, ciasteczek ani identyfikatorów reklamowych.** Nie rejestrujemy czasu pojedynczego zdarzenia. Cloud Function zapisuje jedynie **dobowe zagregowane liczniki** do `stats/YYYY-MM-DD` w Firestore (dzień UTC), nie przechowuje surowych zdarzeń.

Struktura dokumentu Firestore:

- `events.{event}` — liczba poszczególnych zdarzeń,
- `runs.starts.byMode.*`, `runs.starts.byHome.*` — rozkład startów,
- `runs.ends.kmSum`, `runs.ends.secondsSum`, `runs.ends.byCause.*`, `runs.ends.byMode.*`, `runs.ends.byHome.*`, `runs.ends.durationBuckets.*` — statystyki ukończonych przejazdów,
- `shares.byFormat.*`, `portals.byPlacement.*`, `portals.byHome.*` — kliknięcia,
- `retention.new`, `retention.d1`, `retention.d7` — oznaczenia powrotu instalacji na dany dzień,
- `updatedAt` — data aktualizacji agregatu (czas serwera).

## KPI i interpretacja

| KPI | Wzór | Ograniczenie |
|---|---|---|
| Przejazdy na sesję | `events.run_start / events.app_open` | `app_open` oznacza uruchomienie UI, nie weryfikowaną sesję użytkownika; zdarzenia mogą przejść przez granicę UTC. |
| Średni dystans przejazdu | `runs.ends.kmSum / events.run_end` | Dotyczy tylko przejazdów zakończonych i raportowanych. |
| Średni czas przejazdu | `runs.ends.secondsSum / events.run_end` | Rozkład czasu jest dodatkowo w koszykach 0–10, (10–25], (25–60], >60 s. |
| Kliknięcia udostępnienia | `events.share_click / events.run_end` | Mierzy kliknięcie przycisku, a nie potwierdzenie udostępnienia przez aplikację zewnętrzną. |
| Przekierowania do portali | `events.portal_click`, w podziale na `home` i `placement` | Nie potwierdza załadowania strony docelowej. |
| D1 / D7 | `retention.d1[day+1] / retention.new[day]`, analogicznie D7 po 7 dniach | Przybliżenie, oparte na pamięci urządzenia; brak stabilnego identyfikatora na serwerze. |

**D1/D7:** Na urządzeniu tworzymy kryptograficznie losowy 128-bitowy identyfikator instalacji, zapisujemy dzień pierwszego otwarcia UTC i **lokalnie** wyliczamy SHA-256 z `identyfikator:dzień_UTC`. Hash pozostaje wyłącznie na urządzeniu i jest znacznikiem, że danego dnia przesłano już jedno zdarzenie kohortowe. Do serwera trafia przy `app_open` tylko jedno z pól `retention: "new" | "d1" | "d7"` albo brak pola. D1 oznacza otwarcie dokładnie następnego dnia kalendarzowego, D7 dokładnie siódmego. `new` jest liczone tylko podczas pierwszego otwarcia na danej instalacji. Brak otwarcia w dniu D1/D7 nie jest później nadganiany.

Próbkowanie od 0 do 1 jest **stałe na instalację**, żeby nie zniekształcać D1/D7 przez losowanie każdego eventu. Raportowane liczniki są licznikami **próby**, bez automatycznej ekstrapolacji. Dla wczesnego MVP zalecane `sampleRate: 1`.

## Integracja — odpowiedzialność koordynatora

Backend Firebase nie istnieje jeszcze na `main`. Plik `firebase/functions/src/analytics.ts` jest niezależnym modułem przeznaczonym do włączenia w przyszły projekt Functions. W istniejącym lub nowym `firebase/functions/src/index.ts` dodać eksport:

```ts
export { collectEvents } from './analytics';
```

Moduł backendu wymaga zależności **`firebase-functions` v2 i `firebase-admin`** w pakiecie Functions, a także wdrożonego i rozliczanego projektu Firebase Blaze z Firestore. Należy ustawić środowiskowe `ANALYTICS_ALLOWED_ORIGINS` jako listę dozwolonych originów rozdzielonych przecinkami (w tym origin Capacitor), a przed publicznym wdrożeniem skonfigurować limity wydatków/monitorowanie nadużyć. Brak ustawienia oznacza otwarty CORS — dopuszczalny tylko przy testach; CORS i kontrola originu **nie uwierzytelniają** wywołań API.

W `src/main.ts` (plik koordynatora, tutaj celowo nietknięty) skonfigurować moduł po uruchomieniu UI:

```ts
import { configureAnalytics, track } from './analytics/track';

configureAnalytics({ endpoint: import.meta.env.VITE_ANALYTICS_ENDPOINT || '', sampleRate: 1 });
track('app_open');
// Pierwszy faktyczny tap rozpoczynający grę:
track('run_start', { mode: settings.mode, home: settings.home });
// Zdarzenia 'over' i 'arrived' wywoływane dokładnie raz:
track('run_end', {
  km: game.km, seconds: game.seconds,
  cause: game.phase === 'arrived' ? 'arrived' : (game.cause ?? 'ground'),
  mode: game.mode, home: game.route.home,
});
// Naciśnięcie przycisku udostępniania (nie automatyczny sukces):
track('share_click', { format: 'native' });
// Faktyczna aktywacja odnośnika do portalu:
track('portal_click', { placement: 'result', home: settings.home });
// Otwarcie ligi i wyświetlenie propozycji instalacji:
track('league_open');
track('install_prompt');
```

Powyższe wywołania są przykładami **miejsc integracji**, a nie kompletnym patchem do `main.ts`; format `share_click` należy wybrać w zależności od realnej ścieżki (np. `native`, `clipboard`, `image`, `link`). Nie liczyć startu w `newRun()` — gra pozostaje w fazie `ready` do pierwszego tapa. Trzeba wysłać `run_end` tylko dla zakończonego przejazdu, a nie przy porzuceniu karty. Zmienna `VITE_ANALYTICS_ENDPOINT` jest adresem publicznej funkcji HTTPS, nie tajnym kluczem.

Wysyłka: maks. 20 zdarzeń w paczce (konfigurowalne 1–40), `navigator.sendBeacon` z `text/plain`, zapasowo `fetch` z `credentials: 'omit'`, `keepalive: true`. Co 15 sekund, po zapełnieniu paczki, przy `visibilitychange=hidden` i `pagehide`. Pamięć maks. 100 zdarzeń; brak trwałej kolejki. W razie błędu fetch kolejka jest ponawiana w pamięci; `sendBeacon(true)` potwierdza **tylko przyjęcie do kolejki przeglądarki**, nie zapis do Firestore. Kolejność może różnić się od kolejności obsługi na serwerze.

## RODO, ePrivacy i ograniczenia

- Kod nie używa cookies ani SDK reklamowych; analityka nie pyta o konta, Nick, IP czy odciski przeglądarki. Backend nie zapisuje tych informacji w Firestore.
- **Nie oznacza to, że cała usługa nie przetwarza danych osobowych.** Przesył HTTP wymaga przetworzenia adresu IP przez infrastrukturę Firebase/Google; mogą też działać techniczne logi dostawcy, poza agregatami Firestore. Po stronie urządzenia identyfikator instalacji może być uznany za dane pseudonimowe, mimo że nigdy nie jest wysyłany. Web API `sendBeacon` nie pozwala jawnie ustawić `credentials: 'omit'`; konfiguracja infrastruktury nie może ustawiać ciasteczek dla endpointu. Należy to zweryfikować na realnych domenach.
- Zapis lokalnego identyfikatora w `localStorage` (w tym w iframe, zwykle partycjonowanym przez portal) może podlegać przepisom ePrivacy o dostępie do pamięci terminala nawet bez ciasteczek. Zasadność zwolnienia od zgody, obowiązek informacyjny i podstawa z art. 6 RODO wymagają decyzji administratora oraz weryfikacji według prawa belgijskiego. Nie deklarować automatycznie „braku potrzeby zgody”.
- Dzienny hash nie opuszcza urządzenia. Nie da się wiarygodnie deduplikować danych na serwerze ani wykryć celowego nabijania liczników bez wprowadzenia dodatkowych mechanizmów przeciwnadużyciowych. Zmiana urządzenia, czyszczenie localStorage, tryb prywatny, blokada Web Crypto, przerwanie połączenia, zmiana dnia UTC i brak wysłania beacona zaniżają lub zawyżają metryki. Liczniki retencji są **estymacją** i nie należy opisywać ich jako dokładnej liczby osób.
- Administrator powinien ustalić okres przechowywania agregatów (np. 13 miesięcy) i mechanizm usuwania dokumentów `stats/*`. Odbiorca nie wdraża automatycznego TTL, bo tworzenie polityk Firestore jest poza zakresem tego zlecenia.
- Publiczny endpoint zapisuje dane przy każdym poprawnym zgłoszeniu: nie nadaje się do rozliczeń finansowych ani raportowania reklam bez ochrony przed nadużyciami (np. kontrola ruchu, App Check tam, gdzie wspierane, monitoring budżetu). Każde dodane zabezpieczenie podlega ponownej ocenie prywatności.

## Alternatywa architektoniczna: Plausible / Umami self-hosted

| Rozwiązanie | Koszt i utrzymanie | Prywatność i kontrola |
|---|---|---|
| Firebase Functions + Firestore (ten PR) | Blaze, koszty wywołań/zapisów zależne od ruchu; brak serwera na stałe; hosting Firebase i limity budżetu do ustawienia | Tylko zaprogramowane agregaty w Firestore, ale IP przechodzi przez infrastrukturę Google; brak gotowego panelu; retencja przybliżona. |
| Plausible self-hosted | Własny serwer, baza, backupy, aktualizacje i monitoring; koszt stały hostingu + nakład administracyjny | Dashboard i metryki ruchu stron; trzeba sprawdzić konfigurację IP, retencji i politykę logowania; brak automatycznego odpowiednika zdarzeń D1/D7 instalacji. |
| Umami self-hosted | Własny serwer i baza SQL, backupy i aktualizacje; zwykle więcej kontroli nad schematem danych | Otwarty kod, dashboard; konfiguracja unikalnych odwiedzin i identyfikatorów wymaga audytu pod RODO/ePrivacy, zwłaszcza dla gry osadzanej na wielu portalach. |

**Decyzja do właściciela:** czy ważniejsza jest maksymalna minimalizacja danych (Firebase tylko liczniki, przybliżona retencja) czy wygodny panel i dokładniejsze wskaźniki za cenę administracji własnego serwera i dodatkowego przetwarzania danych? Nie ma wystarczających przesłanek, żeby deklarować którykolwiek wariant jako bezwarunkowo „zgodny z RODO”.
