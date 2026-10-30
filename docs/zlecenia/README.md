# Zlecenia dla sesji ChatGPT

Każdy plik `NN-*.md` to **jedno, samowystarczalne zlecenie** dla jednej sesji: zawiera zadanie i wklejone wspólne zasady (`WSPOLNE.md`). Wystarczy wysłać sesji jeden plik.

Każda sesja pracuje na gałęzi `zlecenie/NN-…` i otwiera szkic PR do `main`. Koordynator (Claude) przegląda, integruje i scala.

## Kolejność wysyłania
Wszystkie zlecenia można puścić równolegle — zależności są obsłużone zaślepkami. Jeśli chcesz w falach:

| Fala | Zlecenia | Dlaczego |
|---|---|---|
| 1 | 01, 03, 04, 05, 06, 07, 10, 11, 13, 18, 19, 21, 26, 27 | Grafika rdzenia, backend, logika bez zależności |
| 2 | 02, 08, 09, 12, 14, 16, 22, 24, 30 | Korzystają z wyników fali 1 (styl, API, zasoby) |
| 3 | 15, 17, 20, 23, 25, 28, 29 | Dopracowanie, sklep, marketing |

## Lista
| Nr | Zlecenie | Rodzaj |
|---|---|---|
| 01 | Bohater: przeładowane kombi z kierowcą | grafika |
| 02 | Skórki: Pan Cebulek, Pani Cebulka, Bus kurierski | grafika |
| 03 | Przeszkody drogowe (6 rodzajów) | grafika |
| 04 | Znajdźki i elementy interfejsu | grafika |
| 05 | Tła: Belgia i Holandia | grafika |
| 06 | Tła: Niemcy | grafika |
| 07 | Tła: Polska, granica (stacja z hot dogami), dom | grafika |
| 08 | Tła: Wielka Brytania, Francja, przeprawa | grafika |
| 09 | Tła: Szwajcaria, Norwegia, Dania, Szwecja, prom | grafika |
| 10 | Logo, ikona aplikacji, splash, grafiki sklepu i OG | grafika |
| 11 | Backend rankingu w Firebase | kod |
| 12 | Klient rankingu i ekran „Liga Polonii” | kod |
| 13 | Generator nicków | kod + treść |
| 14 | Karta wyniku do udostępniania | kod |
| 15 | PWA | kod |
| 16 | Osadzanie w portalach i linki do portali | kod + research |
| 17 | Analityka bez śledzenia | kod |
| 18 | Wyzwanie dnia | kod |
| 19 | Dźwięki proceduralne i wibracje | kod |
| 20 | Muzyka | kod/zasób |
| 21 | Balans trudności | narzędzie + raport |
| 22 | Testy E2E i budżet wydajności | testy |
| 23 | Nagrywanie rolek 15 s | kod |
| 24 | Adaptery natywne Capacitor | kod |
| 25 | Przygotowanie iOS | kod |
| 26 | Teksty gry | treść |
| 27 | Prawo i prywatność | research + dokumenty |
| 28 | Plan startu: rolki, posty | marketing |
| 29 | Karta w sklepie (ASO) | treść + grafika |
| 30 | Warstwy tła i punkty trasy w rendererze | kod |
