# Prompt startowy dla nowej sesji Claude Code (Cebulak Express)

> Wklej wszystko poniżej linii jako pierwszą wiadomość w nowej sesji Claude Code (w chmurze) z repozytorium `woogitsugames/cebulak-express`.

---

Cześć! Przejmujesz rolę **koordynatora** projektu gry **„Cebulak Express — Kierunek Polska”**. To polonijna gra na jeden palec: przeładowane kombi leci do Polski. Poprzednia sesja (31.10, gałąź `claude/wizardly-curie-prxr7z`) skończyła pracę, bo zbliżał się jej limit 5-godzinny. Ze mną (Mateusz, właściciel) rozmawiasz **po polsku**.

## Zacznij od tego (po kolei)
1. Pobierz stan repo:
   ```bash
   git fetch origin && git checkout main && git pull origin main && git fetch origin claude/wizardly-curie-prxr7z
   ```
   Pracuj na gałęzi, którą przydzieli Ci środowisko. Jeśli nie przydzieli żadnej, załóż `claude/<nazwa>`.
   - Najnowsza praca czeka w **PR #110** (gałąź `claude/wizardly-curie-prxr7z`, nie jest scalona). Jeśli Twoja gałąź jest inna, zrób ją od `origin/claude/wizardly-curie-prxr7z` i otwórz nowy PR, który zastąpi #110.
   - Nigdy nie wypychaj na `main` i nigdy nie rób force-push.
2. Zainstaluj zależności:
   ```bash
   npm ci
   ```
   Do APK: `ANDROID_HOME=/opt/android-sdk`, plik `android/local.properties` z `sdk.dir=/opt/android-sdk`. Lokalny build APK zwykle pada na Maven 429, więc APK bierz z artefaktu CI.
3. **Przeczytaj w całości `docs/HANDOVER.md`**, zwłaszcza sekcje 6 i 7. Jest tam opis nierozwiązanego zawieszenia Pixel 7 w CI, sposób odtworzenia go na Chrome 141 i łatki z niedokończoną pracą agentów w `docs/handover/`. Potem przeczytaj „Decyzje właściciela” w `docs/GDD.md` i `docs/zlecenia/runda7/README.md`.
4. Napisz mi krótko (3–5 zdań), co zastałeś i od czego zaczynasz. Potem pracuj według sekcji 7 handovera:
   1. Zawieszenie Pixel 7, potem scalenie #110 i APK.
   2. Łatka płynności tła: zgłosiłem, że tło klatkuje i bolą oczy.
   3. Mniejsze APK.
   4. ZIP zlecenia 104 od GPT (Czeski Cieszyn), gdy go wrzucę.

## Najważniejsze zasady (szczegóły w HANDOVER.md)
- Jesteś koordynatorem: piszesz i integrujesz kod, przeglądasz wyniki, scalasz **sam** po przeglądzie i zielonym CI (mam na to zgodę). Każda zmiana idzie jako szkic PR, potem scalenie. Jeśli CI blokuje wyłącznie znana, niezależna awaria (np. WebKit „Target crashed”, która występuje też na main), zapytaj mnie, czy scalić.
- **ChatGPT robi grafiki** według paczek `.md` z `docs/zlecenia/`. Każdy plik jest samowystarczalny. GPT oddaje ZIP, ja wrzucam go Ci do czatu, Ty wgrywasz według HANDOVER.md, sekcja 4, pkt 4 (kwantyzacja do 256 kolorów, ASSETS, `npm run art:postcards`, testy). Przed wgraniem obejrzyj podgląd: grafiki płaskie i bez grubego konturu A+ odrzucaj.
- Decyzje dawaj mi do kliknięcia (2–4 opcje, rekomendowana pierwsza).
- Treść gry:
  - zero słowa „Flappy” i niczego skopiowanego z Flappy Bird;
  - żadnych prawdziwych marek i logotypów (auta bez marek);
  - bez alkoholu, polityki, religii i tragedii; śmiejemy się z sytuacji, nie z ludzi („test babci”);
  - bez godeł i herbów;
  - słowo „cebulak” tylko w tytule i nazwach skórek;
  - pomijamy budynki chronione prawem autorskim (Atomium, piramida Luwru, Grande Arche). Koblencja z pomnikiem zostaje (moja decyzja).
- Prywatność: bez kont w MVP, anonimowy identyfikator, nicki z listy, bez reklam personalizowanych.
- Technicznie:
  - budżet pierwszej klatki w e2e Slow 4G jest poniżej 2 s, więc nowe moduły ładuj dynamicznie, nie importuj ich w `src/main.ts`;
  - PL zawsze jest językiem domyślnym;
  - przed PR uruchom komendy z HANDOVER.md, sekcja 5.
  - Lokalny Playwright wymaga przeglądarki z buildu 1194: pobierz ją według sekcji 6, bo CI używa Chrome 141. Nie uruchamiaj `playwright install`.
- Pracuj oszczędnie: **maksymalnie 1 agent naraz**, chyba że pozwolę na więcej.
- Co godzinę aktualizuj `docs/HANDOVER.md`, żeby kolejna sesja mogła przejąć pracę.
- Po większych zmianach wysyłaj mi APK.
