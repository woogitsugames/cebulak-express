---
name: "Błąd gry (QA)"
about: "Zgłoś reprodukowalny błąd przed wydaniem Cebulak Express"
title: "[BŁĄD] Krótki opis"
labels: [bug]
assignees: []
---

## Wpływ i priorytet

- Priorytet: `P0 / P1 / P2 / P3`
- Powiązany scenariusz: `ID z docs/qa/plan-testow.md` / nowy przypadek
- Czy blokuje wydanie: `TAK / NIE / DO DECYZJI`

## Urządzenie i środowisko

- Platforma: `Android / iOS / PWA / web / WordPress iframe`
- Model urządzenia i RAM:
- Wersja Android/iOS; przeglądarka i wersja:
- Rozdzielczość/orientacja; rozmiar czcionki i tryb ciemny:
- Sieć: `Wi-Fi / LTE / Slow 3G / offline`; stan backendu: `Firebase produkcja / staging / mock`:
- Wersja aplikacji/build i **SHA commitu**:
- URL strony (jeśli dotyczy; bez tokenów):

## Warunki wstępne

Np. świeża instalacja, wybrany kraj/miasto/cel, tryb gry, skórka, ustawienia systemowe.

## Kroki odtworzenia

1.
2.
3.

## Oczekiwany wynik

Co powinno się wydarzyć? Podaj warunek ze scenariusza QA.

## Rzeczywisty wynik

Co wydarzyło się zamiast tego? Wskaż częstotliwość (`1/1`, `3/5` itd.).

## Zrzuty, wideo, logi

Przeciągnij zdjęcia/wideo lub dodaj bezpieczne linki. W przypadku crasha dodaj wycinek `adb logcat`, Console lub raport TestFlight. **Usuń UID, adresy e-mail, tokeny, klucze i dane osobowe** przed publikacją.

## Próby i regresja

- Czy występuje po ponownym uruchomieniu / czyszczeniu danych?
- Czy występuje na drugim urządzeniu lub w innej przeglądarce?
- Obejście (jeżeli istnieje):
- Po poprawce — wynik retestu, wersja, data, tester:
