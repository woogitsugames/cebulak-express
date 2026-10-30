# Zlecenie 68 — eksport grafik do repozytorium

**Stan: szkic PR — oczekuje na import PNG.**

Wygenerowano poza repo 6 panoram 1620 × 900 RGBA (Antwerpia i Bruksela, style A/B/C), 2 obrazy porównawcze, `ASSETS.md`, `PR-OPIS.md` oraz `tools/art/probki-panoram.py`.

W tej rozmowie ChatGPT właściciel otrzymał ZIP `68-probki-panoram-be.zip` z zachowaniem ścieżek repozytorium. Nie udało się przesłać obrazów do GitHuba bezpośrednio: kontener nie miał połączenia DNS z `github.com`, a połączenie GitHub nie udostępniało uploadu lokalnych plików binarnych.

**Koordynator:** rozpakuj ZIP w katalogu repo na gałęzi `zlecenie/68-probki-panoram-be`, zatwierdź 11 plików, uruchom `python3 tools/art/probki-panoram.py` w pełnym checkoutcie i wykonaj `npm ci && npm run typecheck && npm test && npm run build`.

Ważne: oba istniejące porównania w ZIP używają `--fallback` (makieta zamiast oryginalnych warstw). Skrypt bez tego przełącznika tworzy podgląd z prawdziwych zasobów BE oraz sprite'ów kombi. Po aktualizacji porównań uzupełnij PR obrazkami.

**Architektura:** z Antwerpii katedra NMP, Het Steen, MAS i dźwigi portowe; z Brukseli ratusz, bazylika Koekelberg i wieżowce dzielnicy północnej. Atomium zostało usunięte na podstawie twardego zakazu we wspólnych zasadach.

**Ocena:** A najbardziej spójny z płaskim stylem gry. Obrazy B i C są próbkami z arkusza porównawczego, a nie finalnymi generacjami najwyższej rozdzielczości.

**Nigdy nie podmieniano** `public/assets/landmarks/`. Przed scaleniem konieczny import PNG, końcowy render i testy.
