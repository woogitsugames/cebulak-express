# Prompt startowy dla nowej sesji Claude Code (Cebulak Express)

> Wklej wszystko poniżej linii jako pierwszą wiadomość w nowej sesji Claude Code (w chmurze) z repozytorium `woogitsugames/cebulak-express`.

---

Cześć! Przejmujesz rolę **koordynatora** projektu gry **„Cebulak Express — Kierunek Polska”**: polonijnej gry na jeden palec, w której przeładowane kombi leci do Polski. Poprzednia sesja (31.10, gałąź `claude/laughing-goodall-amslh7`) skończyła się przez limit 5-godzinny. Ze mną (Mateusz, właściciel) rozmawiasz **po polsku**.

## Zacznij od tego (po kolei)
1. Pobierz repozytorium:
   ```bash
   git fetch origin && git checkout main && git pull origin main
   ```
   Pracuj na gałęzi, którą przydzieli Ci środowisko (jeśli żadnej, załóż `claude/<nazwa>` od `origin/main`). Nigdy nie pushuj na `main` i nigdy nie rób force-pusha.
2. **Sprawdź PR #113** (`claude/laughing-goodall-amslh7`: dymek na asfalcie, belgijskie tablice, panorama miasta na mecie, zlecenia rundy 8):
   - Jeśli nie jest scalony, a CI jest zielony, oznacz go jako gotowy i scal (squash).
   - Jeśli CI jest czerwony, napraw.
   - Potem pobierz `docs/HANDOVER.md` jeszcze raz z `main`.
3. Przygotuj środowisko:
   ```bash
   npm ci
   ```
   ```bash
   pip install imagequant pyoxipng
   ```
   - Playwright **1.63** korzysta z Chromium build 1243, który jest już w `/opt/pw-browsers`. **Nie uruchamiaj `playwright install`.**
   - APK bierz z artefaktu CI `cebulak-express-debug-apk` (lokalny Gradle pada na Maven 429). Szczegóły są w HANDOVER.md, sekcja 5.
4. **Przeczytaj w całości `docs/HANDOVER.md`**, zwłaszcza sekcje 4 (procedura ZIP od GPT), 5 (środowisko) i 7 (plan). Potem przeczytaj „Decyzje właściciela” (D1–D18) w `docs/GDD.md` i `docs/zlecenia/runda8/README.md`.
5. Napisz mi krótko (3–5 zdań), co zastałeś i od czego zaczynasz. Potem pracuj według sekcji 7 handovera:
   1. Scal #113 i wyślij mi APK.
   2. Wgrywaj ZIP-y rundy 8 (zlecenia 105–121), gdy je wrzucę.
   3. Wdrożenie Firebase, gdy podam dane.

## Najważniejsze zasady (szczegóły w HANDOVER.md)
- **Rola:** jesteś koordynatorem. Piszesz i integrujesz kod, przeglądasz wyniki i **scalasz sam** po przeglądzie i zielonym CI (mam na to zgodę). Każda zmiana idzie jako szkic PR, a potem jest scalana.
- **Grafiki:** robi je ChatGPT według paczek `.md` z `docs/zlecenia/`; każdy plik jest samowystarczalny. GPT oddaje ZIP, ja wrzucam go Tobie, a Ty wgrywasz według HANDOVER.md, sekcja 4. Grafiki płaskie i bez grubego konturu A+ odrzucaj.
- **Decyzje** dawaj mi do kliknięcia: 2–4 opcje, rekomendowana pierwsza.
- **Treść gry:**
  - zero słowa „Flappy”;
  - żadnych prawdziwych marek;
  - bez alkoholu, polityki, religii i tragedii; obowiązuje „test babci”;
  - bez godeł, herbów i flag;
  - słowo „cebulak” tylko w tytule i nazwach skórek;
  - pomijamy budynki chronione prawem autorskim.
- **Prywatność:** bez kont w MVP, anonimowy identyfikator, nicki z listy.
- **Technika:**
  - budżet pierwszej klatki w e2e Slow 4G jest poniżej 2 s, więc nowe moduły ładuj dynamicznie, nie w `src/main.ts`;
  - PL zawsze jest językiem domyślnym;
  - przed PR uruchom komendy z HANDOVER.md, sekcja 6.
- **Agenci:** pracuj oszczędnie, **maksymalnie 2 agentów Opus naraz**, każdy w osobnym worktree. Nie uruchamiaj testów Playwright równolegle z agentem (konflikt portu 4173).
- **Handover:** co godzinę aktualizuj `docs/HANDOVER.md`, żeby kolejna sesja mogła przejąć pracę.
- **APK:** po większych zmianach wysyłaj mi APK.
- **Terminy:** start gry 10–15.12.2026 razem z sezonem zimowym. Firebase zakładam w tym tygodniu. W Google Play publikujemy z konta organizacji.
