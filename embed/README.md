# Osadzanie Cebulak Express w portalach WordPress

## Warunek przed publikacją

**Nie ustalono jeszcze publicznej domeny gry.** Użyj prawdziwego adresu HTTPS jednej instalacji gry, działającej bez logowania. Nie osadzaj portali informacyjnych jako iframe: osadzana jest **gra**, a z gry otwierane są portale odpowiednich krajów.

Wersja HTML to [`iframe.html`](iframe.html), a gotowa wtyczka to [`wordpress/cebulak-express/`](wordpress/cebulak-express/). Obie wersje dają proporcje 9:16 i wysokość zależną od szerokości kontenera, maksymalnie 420 px szerokości. Przy mniejszych ekranach iframe zmniejsza się bez poziomego przewijania.

## Wtyczka WordPress (zalecana)

1. Skopiuj `wordpress/cebulak-express/` do `wp-content/plugins/cebulak-express/` albo spakuj folder do ZIP i wgraj jako wtyczkę.
2. Włącz wtyczkę (PHP 8.1+).
3. W **Ustawienia → Cebulak Express** podaj publiczny adres gry HTTPS, bez parametrów ani fragmentu URL. Wtyczka waliduje i escapuje ten adres; nie pozwala autorom wpisów wstrzykiwać innej domeny.
4. W edytorze blokowym dodaj blok **Shortcode**, a w nim:

   ```text
   [cebulak_express kraj="be" z="antwerpia"]
   ```

5. Zmiana kraju: `be`, `nl`, `de`, `uk`, `fr`, `ch`, `no`, `dk`. Miasto jest opcjonalne; bez niego gra wybierze domyślny start kraju. Karta wyniku może korzystać z `[cebulak_express r="be-antwerpia"]`.

Nie potrzebujesz oddzielnego bloku Gutenberga ani zewnętrznych skryptów. Ustawienia są dostępne wyłącznie administratorowi WordPress; shortcode akceptuje tylko dozwolone kody kraju i bezpieczne identyfikatory miast. Brak konfiguracji nie tworzy niedziałającego iframe (administrator zobaczy wskazówkę, użytkownik nie zobaczy elementu).

## Samodzielny HTML

Skopiuj zawartość `iframe.html` do bloku „Własny HTML” i **zastąp `GRA-DO-UZUPELNIENIA.invalid` prawdziwą domeną gry**. Ustaw parametry:

- `?kraj=be&z=antwerpia` — osadzenie z krajem i miastem.
- `?r=be-antwerpia` — wejście z linku karty wyniku; ma pierwszeństwo przed `kraj` i `z`, jeśli jest poprawne.

Parametry parsuje `parseGameParams(location.search)` z `src/net/params.ts`. Kod obsługi nie jest automatycznie podłączony do `src/main.ts` (plik należy do koordynatora). Po odczycie parametrów ustaw `settings.home` i `settings.from` **przed `safeRoute()` i `fillMenu()`**, zachowując obecne `settings.to` i `settings.mode`. Jeśli funkcja zwróci `null`, pozostaw ustawienia z pamięci lub wartości domyślne. Przykład:

```ts
const selected = parseGameParams(location.search);
if (selected) settings = { ...settings, home: selected.home, from: selected.from };
```

Dla udostępnień buduj URL gry z `?r=${shareRouteCode(route.home, route.from.id)}`; `src/main.ts` jest integrowany osobno. `portalLink(settings.home, 'result')` zwraca adres odpowiedniego serwisu wiadomości z UTM, a w krajach bez Aktualności — serwis poradnikowy. Alternatywnie `portalLink(home, 'menu', 'guides')`; `facebook` tylko po potwierdzeniu kont. Otwieraj link w nowej karcie (`target="_blank" rel="noopener noreferrer"`) wyłącznie po akcji gracza.

## Polityki bezpieczeństwa i ograniczenia przeglądarek

- **Zgoda na iframe:** serwer gry musi dopuścić domeny osadzające przez `Content-Security-Policy: frame-ancestors 'self' https://aktualnosci.be https://popolsku.be ...` (uwzględnij wszystkie zatwierdzone portale). Nie ustawiaj `X-Frame-Options: DENY` ani `SAMEORIGIN` dla obcej domeny portalu. WordPress nie może tego obejść.
- **Web Share API:** iframe otrzymuje `allow="web-share"`, ale `navigator.share` zależy też od obsługi przeglądarki, kontekstu HTTPS, polityk Permissions Policy i gestu użytkownika. Potrzebny fallback kopiowania linku.
- **Dźwięk:** autoodtwarzanie zwykle jest zablokowane; uruchom AudioContext/dźwięk po pierwszym tapnięciu. Sam atrybut `allow="autoplay"` nie gwarantuje odtwarzania bez gestu.
- **Pamięć lokalna:** przeglądarki mogą partycjonować `localStorage` dla ramek według domeny nadrzędnej lub odmawiać dostępu w trybie prywatnym. Rekordy i identyfikatory przeglądarkowe mogą być różne na różnych portalach. Zapis musi być opcjonalny i obsłużony przez `try/catch`. Nie wymagaj cookies third-party.
- **Zabezpieczenia:** tylko HTTPS, brak sekretów w kodzie WordPress, żadnych skryptów third-party. Nagłówki CSP hostingu gry i konfiguracja Web Share są sprawdzane osobno przed wdrożeniem. Linki do portali (`docs/portale.md`) nie wymagają CORS do zwykłej nawigacji.
- **Analityka:** UTM obejmuje jedynie kliknięcie w link prowadzący do portalu; nie dodano trackingu użytkownika ani identyfikatorów w parametrach.

## Testy

```bash
npm ci && npm run typecheck && npm test && npm run build
php -l embed/wordpress/cebulak-express/cebulak-express.php
php embed/tests/wp-smoke.php
```

Wystawienie gry na docelowej domenie, ustawienie CSP, rzeczywisty test w WordPressie (przeglądarki mobilne i Web Share), integracja z `src/main.ts` oraz zatwierdzenie FB pozostają po stronie koordynatora. Wtyczka nie zmienia globalnej konfiguracji WordPress i nie modyfikuje istniejących treści.
