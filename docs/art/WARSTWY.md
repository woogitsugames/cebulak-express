# Warstwy tła — kontrakt geometrii drogi (@3x)

Gra korzysta z logicznej siatki **360 × 640 px** i fizycznych assetów **@3x**.
Wspólna linia kolizji z podłożem to `WORLD.groundY = 580` (piksele logiczne).

## Droga: obowiązkowe wymiary i współrzędne

| Parametr | Wartość |
|---|---:|
| Plik `public/assets/countries/<cc>/<cc>-road*.png` | **1080 × 330 px** |
| Wymiary renderowanej warstwy | 360 × 110 px logicznych |
| Pozycja warstwy drogi w świecie | **y = 530** px logicznych |
| Początek asfaltu w pliku drogi | **wiersz 150 ±3** (fizyczny px) |
| Początek asfaltu we współrzędnych świata | `530 + 150 / 3 = 580` |
| Dolna krawędź PNG | `530 + 330 / 3 = 640` |
| Paralaksa warstwy | 1,0; poziome kafelkowanie bez szwu |

- **Wiersze 0–149**: bariera, pobocze i opcjonalne tło nad nawierzchnią; ich kolory nie mogą udawać długiego, szerokiego pasa asfaltu.
- **Wiersz 150**: górna, ciągła krawędź ciemnej nawierzchni — miejsce styku z hitboxem kombi.
- **Wiersze 150–329**: nieprzezroczysty asfalt, z oznakowaniem poziomym; nie zostawiaj przezroczystych pasków u dołu.
- **Krawędzie X**: pierwsza i ostatnia kolumna kafelka muszą się ze sobą zgadzać, aby podczas przewijania nie powstawał szew.
- **Warianty zimowe** `*-road-zima.png` i inne `*-road-*.png` muszą spełniać identyczną regułę, jeśli istnieją.

## Pomiar i test

```bash
node tools/art/measure-road.mjs
node tools/art/measure-road.mjs --json
npm run typecheck && npm test && npm run build
```

Narzędzie wykrywa górną krawędź długiego, ciemnego pasa na podstawie zdekodowanych pikseli PNG — nie odczytuje deklarowanych współrzędnych z nazwy ani metadanych. Test `tests/road-alignment.test.ts` wykrywa automatycznie wszystkie warianty dróg w każdym folderze kraju, odrzuca niewłaściwe wymiary i odchylenia powyżej trzech pikseli.

## Integracja renderera — zależność do weryfikacji przez koordynatora

**Uwaga:** w kodzie `src/render/background.ts` z `main` (stan w chwili pracy nad zleceniem 41) pozycja warstwy `road` wynosiła `WORLD.groundY - 6`, czyli **574**, a nie **530**. Przy takiej pozycji nawet prawidłowo przygotowana grafika ma asfalt w `574 + 150 / 3 = 624`, czyli **44 px logiczne poniżej** linii kolizji. Samą zmianą PNG tego nie da się skorygować bez naruszenia geometrii obrazu.

Właściciel `src/render/background.ts` powinien w odrębnym kroku umieszczać warstwę na `WORLD.groundY - 50` (**530**). Zlecenie 41 dotyczy przede wszystkim plików PNG, więc **nie zmienia** renderera ani fizyki `src/core/`.

Zmodyfikowane obrazy mają oryginalne kontury i oznakowanie poziome. Pomiędzy pierwotną barierą a nawierzchnią dodano poziomy pas pobocza odpowiednio do kraju. W razie regeneracji assetów z dawnych skryptów artystycznych trzeba ponownie zastosować tę regułę lub dostosować generatory, aby nie przywróciły starej geometrii.