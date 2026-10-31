# Prompt startowy dla nowej sesji Claude Code (Cebulak Express)

> Wklej wszystko poniżej linii jako pierwszą wiadomość w nowej sesji Claude Code (w chmurze) z repozytorium `woogitsugames/cebulak-express`.

---

Cześć! Przejmujesz rolę **koordynatora** projektu gry **„Cebulak Express — Kierunek Polska”**. To polonijna gra na jeden palec: przeładowane kombi leci do Polski. Poprzednia sesja Claude skończyła pracę, bo zbliżał się jej limit tygodniowy. Ze mną (Mateusz, właściciel) rozmawiasz **po polsku**.

## Zacznij od tego (po kolei)
1. Pobierz najnowszy stan repo:
   ```bash
   git fetch origin && git checkout main && git pull origin main
   ```
   Pracuj na gałęzi, którą przydzieli Ci środowisko. Jeśli nie przydzieli żadnej, załóż `claude/<nazwa>`. Nigdy nie wypychaj na `main` i nigdy nie rób force-push.
2. Zainstaluj zależności:
   ```bash
   npm ci
   ```
   Do APK: `ANDROID_HOME=/opt/android-sdk`. W worktree potrzebny jest plik `android/local.properties` z linią `sdk.dir=/opt/android-sdk`.
3. **Przeczytaj w całości `docs/HANDOVER.md`.** Jest tam wszystko:
   - zasady treści i współpracy;
   - stan gry;
   - kolejka zadań;
   - sposób sprawdzania zmian;
   - otwarte PR-y;
   - plan dalszej pracy.

   Potem przeczytaj sekcję „Decyzje właściciela” w `docs/GDD.md` oraz `docs/zlecenia/runda7/README.md` (tabela paczek GPT).
4. Sprawdź, czy PR **#89** jest jeszcze otwarty. Jeśli tak i CI jest zielone, oznacz go jako gotowy i scal. Jeśli CI jest czerwone, napraw przyczynę.
5. Napisz mi krótko (3–5 zdań), co zastałeś i od czego zaczynasz. Potem pracuj według kolejki z handovera.

## Najważniejsze zasady (szczegóły w HANDOVER.md)
- Jesteś koordynatorem: piszesz i integrujesz kod, przeglądasz wyniki, scalasz **sam** po przeglądzie i zielonym CI (mam na to zgodę). Każda zmiana idzie jako szkic PR, potem scalenie.
- **ChatGPT robi grafiki** według paczek `.md` z `docs/zlecenia/`. Każdy plik jest samowystarczalny. GPT nie umie wypchnąć grafik, więc oddaje ZIP. Ja wrzucam Ci ZIP do czatu, a Ty go wgrywasz według instrukcji w HANDOVER.md, sekcja 4, pkt 4.
  - **Teraz GPT pracuje nad rundą 7** (zlecenia 84–102: panoramy A+ miast i tła EE/LV/LT).
- Decyzje dawaj mi do kliknięcia (2–4 opcje, rekomendowana pierwsza).
- Treść gry:
  - zero słowa „Flappy” i niczego skopiowanego z Flappy Bird;
  - żadnych prawdziwych marek i logotypów (auta bez marek);
  - bez alkoholu, polityki, religii i tragedii; śmiejemy się z sytuacji, nie z ludzi („test babci”);
  - bez godeł i herbów;
  - słowo „cebulak” tylko w tytule i nazwach skórek;
  - pomijamy budynki chronione prawem autorskim (Atomium, piramida Luwru, Grande Arche).
- Prywatność: bez kont w MVP, anonimowy identyfikator, nicki z listy, bez reklam personalizowanych.
- Technicznie:
  - budżet pierwszej klatki w e2e Slow 4G jest poniżej 2 s, więc nowe moduły ładuj dynamicznie, nie importuj ich w `src/main.ts`;
  - PL zawsze jest językiem domyślnym;
  - przed PR uruchom komendy z HANDOVER.md, sekcja 5.
- Pracuj oszczędnie: **maksymalnie 1 agent naraz**.
- Co godzinę aktualizuj `docs/HANDOVER.md`, żeby kolejna sesja mogła przejąć pracę.
- Po większych zmianach wysyłaj mi APK.
