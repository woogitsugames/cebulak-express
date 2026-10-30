# Pochodzenie muzyki i akcentów granicznych

Wszystkie nuty i barwy powstają proceduralnie za pomocą Web Audio API. Nie ma plików MP3/WAV, zewnętrznych bibliotek, próbek, sampli ani utworów osób trzecich.

| Plik | Źródło/narzędzie | Licencja | Autor/uwagi |
|---|---|---|---|
| `country-cues.ts` | Autorskie melodie i synteza Web Audio (oscylatory, filtry, obwiednie) | Kod projektu | 16 oryginalnych, krótkich fraz. Nawiązania instrumentacyjne do tradycji krajów, bez cytatów, hymnów i kolęd. |
| `music.ts` | Autorska pętla 32 taktów i aranżacja świąteczna, Web Audio | Kod projektu | Zwolnione tempo, ciepłe barwy i syntetyczne dzwonki; brak zapożyczeń religijnych. |
| `sfx.ts` | Syntetyczne efekty Web Audio | Kod projektu | Bez zewnętrznych próbek dźwiękowych. |

Nie użyto kompozycji z domeny publicznej, dlatego nie ma źródeł partytur do cytowania. Nazwy instrumentów określają jedynie inspirację brzmieniową.

## Integracja (dla koordynatora)

W `src/main.ts`, w funkcji `feedback(e: GameEvent)` wywołaj motyw po przekroczeniu granicy:

```ts
if (e.type === 'border') music?.playCountryCue(e.country);
```

Zalecane miejsce: przed gałęzią `arrived` obsługującą jingiel mety. Pozostaw istniejące `sfxForGameEvent(e)`; krótkie SFX granicy i motyw muzyczny korzystają z tego samego `AudioContext` i miksu. `MusicPlayer` dba o wyciszenie przy `stop`, `pause`, `setEnabled(false)`, ukryciu karty i `dispose`. Nie zmieniono `src/main.ts` (własność koordynatora).

Odsłuch: `npm run dev` → `/tools/music-demo.html`. Za kontrolę poziomu odpowiada wspólny `master` w `createMusic`; w trakcie motywu pętla trasy jest delikatnie ściszana.
