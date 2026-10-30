# Mała Japonka — pochodzenie zasobów

**Data:** 30 października 2026 r.  
**Źródło:** oryginalna grafika stworzona w ChatGPT Images (arkusz koncepcyjny `docs/art/podglady/auta-73-koncepcja.png`), następnie samodzielnie odrysowana jako autorskie kształty SVG i dopracowana w ChatGPT (Python + CairoSVG + Pillow).  
**Licencja/użycie:** materiał wygenerowany specjalnie dla projektu Cebulak Express, bez obcych zdjęć, fontów komercyjnych, logo lub elementów na licencjach osób trzecich; użytkowanie na warunkach dotyczących materiałów OpenAI. Nie deklaruje się wyłączności prawnoautorskiej.

## Brief / prompt artystyczny

> Wykonaj płaską, ciepłą ilustrację wektorową do gry 2D: koralowa, zaokrąglona trzydrzwiowa miejska bryła z krótkim tyłem, profil dokładnie z boku, przód skierowany w prawo. Charakterystyczna sylwetka, bez marek i nazw modeli, logo, emblematów, prawdziwych tablic. Ciemnogranatowy gruby kontur, pastelowa paleta, światło z lewej góry, subtelne cienie. Neutralny sympatyczny kierowca widziany przez szybę. Warstwy: karoseria bez kół, osobne koło 36×36, komicznie uszkodzona karoseria z kołami, dwa płomienie z tyłu, cztery pełne poziomy bagaży na dachu i portret. Pliki PNG RGBA, @3x, canvas samochodu 288×168, kotwica (144,106). Wszystkie bagaże to alternatywy, nie nakładki sumujące się.

## Pliki

| Plik | Narzędzie / źródło | Użycie |
|---|---|---|
| `body.png` | ChatGPT + własna ilustracja SVG, CairoSVG, Pillow | Karoseria |
| `wheel.png` | Jak wyżej | Obracane koło 36×36 px |
| `crash.png` | Jak wyżej | Komiczny wypadek, koła wrysowane |
| `flame-1.png`, `flame-2.png` | Jak wyżej | Dwie klatki płomienia podczas podskoku |
| `luggage-1.png` … `luggage-4.png` | Jak wyżej | Pełne, niezależne poziomy bagażu |
| `portrait.png` | Kompozycja sprite'ów na autorskiej karcie | Karta garażowa 384×384 px |
| `skin.json` | ChatGPT, własna definicja JSON | Manifest układu warstw, skala, hitbox |

Wszystkie PNG mają przezroczystość RGBA (w portrecie przezroczyste narożniki). Nie wykorzystano żadnych zewnętrznych zasobów graficznych.
