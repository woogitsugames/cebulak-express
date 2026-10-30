# Zlecenie 50 — zrzuty do Google Play i App Store

Generator przechwytuje **rzeczywisty ekran aplikacji** poprzez Playwright Chromium. Na ekran trafiają wyłącznie istniejące elementy gry oraz nakładka: gradient i nagłówek. Nie dopisuje fikcyjnych wyników ani nie podmienia teł, przeszkód i sprite'ów.

## Uruchomienie

```bash
npm ci
npx playwright install chromium
npm run build
npm run store:shots
# Po podłączeniu produkcyjnego rankingu (bez danych pokazowych):
npm run store:shots -- --release
```

Dodatkowe opcje: `STORE_SHOTS_URL=http://127.0.0.1:4173/` do podłączenia działającego serwera; `STORE_SHOTS_SEED=57291` do zmiany ziarna. Bez zmiennej URL skrypt startuje lokalnie `vite preview` na porcie 4173. Wszystkie 16 ekranów generowane jest do folderu tymczasowego; kopiowane do `public/assets/store/` dopiero po wykonaniu wszystkich scenariuszy. Błąd nie powinien pozostawić niekompletnego zestawu.

- **Google Play:** 8 PNG RGB 1080×1920: `public/assets/store/screenshot-01.png` … `screenshot-08.png`.
- **App Store:** 8 niezależnych przechwyceń 1242×2688: `public/assets/store/app-store/screenshot-01.png` … `screenshot-08.png`.
- **Podgląd:** `docs/art/podglady/store-shots.png` (siatka ośmiu zrzutów Google Play).
- **Pochodzenie:** aktualizowany automatycznie `public/assets/store/ASSETS.md`, w tym SHA-256 każdego pliku.

## Storyboard i zachowanie bez backendu

| Nr | Scena | Warunek |
|---|---|---|
| 01 | Lot nad Belgią | HUD pokazuje rzeczywiste km |
| 02 | Ekran wyboru trasy | Jest dokładnie 8 krajów startowych |
| 03 | Kombi z bagażem nad Holandią | Rzeczywisty aktywny przejazd |
| 04 | Zebranie słoika | W prawdziwym UI wystąpiło `+30 km` |
| 05 | Przelot z Niemiec do Polski | Przekroczenie granicy albo km za granicą na trasie Berlin–Szczecin |
| 06 | Liga Polonii | Odczyt obecnej tabeli; tryb demonstracyjny **widoczny** i blokuje `--release` |
| 07 | Wyzwanie dnia | Rzeczywisty ekran uruchomionego trybu dziennego |
| 08 | Koniec trasy | Zapisana liczba km, oryginalny żart i przycisk udostępniania |

**Nie publikować automatycznie PNG ze zwykłego uruchomienia**: bez prawdziwej konfiguracji Firebase Liga Polonii działa w trybie `mock` (widać oznaczenie „Wersja pokazowa”). `--release` przerywa eksport takich materiałów. Ekran garażu ze zlecenia 36 nie jest jeszcze dostępny na `main` — nie został sfabrykowany; scenariusze podlegają dokładnej specyfikacji `docs/sklep/zrzuty.md` (zlecenie 29). Obrazy są zrzutami **webowego buildu w Chromium**, nie dowodem przechwycenia z Androida lub symulatora iOS; przed publikacją wymagane są testy na urządzeniach i kontrola zgodności.

## Opcjonalna, dokładniejsza integracja testowa (`main.ts`, koordynator)

Dodany moduł `src/test-hooks.ts` jest wyłącznie do odczytu; bez importu nie wpływa na grę. Koordynator może po deklaracji `game` i `api` dodać import:

```ts
import { installStoreShotHooks } from './test-hooks';
// Po utworzeniu api, game oraz przed pierwszą pętlą:
installStoreShotHooks(() => game, api);
```

API `window.__ceTest.snapshot()` występuje **wyłącznie** przy `?test=1`, nie zmienia gry i nie udostępnia danych osobowych. Skrypt posiada także pasywną obserwację położenia renderowanego samochodu oraz fallback przy braku haka. Dla jakości produkcyjnej zalecana jest integracja haka i potwierdzenie przejścia wszystkich 16 scenariuszy. Zmiany do `main.ts` pozostają w gestii koordynatora.

## Ograniczenia

Zrzut ekranu selektora kraju pokazuje jego bieżącą wartość (standardowy selektor HTML); wszystkie osiem opcji jest weryfikowanych automatycznie, bez sztucznego rozwijania kontrolki do niezrealizowanego wyglądu UI. Tytuły pochodzą z `docs/sklep/zrzuty.md` i są nakładane oddzielnie. Brak danych osobowych, prawdziwych marek i symboli obcych aplikacji.
