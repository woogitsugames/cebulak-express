# Prompt do nowej sesji — gra „Lecę do Domu!” (nazwa robocza)

Wklej wszystko poniżej linii jako pierwszą wiadomość. Dołącz dwa pliki: `RESEARCH_CLAUDE.md` (z tej paczki) i research z ChatGPT.

---

Cześć. Komunikuj się ze mną **zawsze po polsku**. Gdy potrzebujesz mojej decyzji, dawaj ją klikalnie: 2–4 opcje, rekomendowana pierwsza, z krótkim uzasadnieniem.

## Kim jestem i po co ta gra
Prowadzę portale dla Polonii: PoPolsku (BE, FR, UK, SE, ES, CH, IT, DK, NO, AT, FI, LU), TuWiesz (DE, NL, PL) i Aktualnosci (.be/.nl/.de/.fr/.uk). Wszystkie mają strony na Facebooku i publikują rolki (Reels/TikTok/Shorts).

Chcę prostą, „odmóżdżającą” grę na jeden palec w duchu Flappy Bird, z wątkiem polonijnym: emigrant (roboczo bocian Bogdan, opcjonalnie skórka „cebulaka”) leci z kraju, w którym mieszka, do domu w Polsce.
- Główny cel gry: **zasięg i ruch do portali** oraz materiał na rolki.
- Przychód z reklam nie jest celem.

## Materiały wejściowe
W załącznikach masz dwa niezależne researche:
1. `RESEARCH_CLAUDE.md`: rynek, platformy, ryzyka prawne, zasady tonu, projekt gry, plan i KPI, z linkami do źródeł.
2. Research z ChatGPT (GPT‑6).

## Zadanie — etap 1: synteza (zanim napiszesz kod)
1. Przeczytaj oba researche w całości.
2. Zrób **jeden spójny dokument projektowy** (`docs/GDD.md` w nowym repo):
   - gdzie się zgadzają;
   - gdzie się różnią: przy każdej różnicy daj rekomendację z uzasadnieniem;
   - co jest tylko w jednym z nich i warto to wziąć.
3. Twierdzenia o faktach, które zmieniają decyzje (platformy, prawo, znaki towarowe, regulaminy Facebook Instant Games / Google Play), **zweryfikuj w sieci** i podaj źródła. Nie ufaj żadnemu z researchy na ślepo; oba mogą się mylić.
4. Na koniec etapu 1 zadaj mi **maksymalnie 5 pytań decyzyjnych** (klikalnie), np.:
   - ostateczna nazwa;
   - bohater główny;
   - zakres krajów w MVP;
   - czy ranking z backendem od razu, czy dopiero w drugiej fazie;
   - styl grafiki.

## Zadanie — etap 2: MVP (po moich decyzjach)
- **Osobne repozytorium**, nie mieszamy z innymi projektami. Jeśli nie masz dostępu do nowego repo, powiedz mi, co mam utworzyć.
- Technologia wyjściowa: HTML5 Canvas (Phaser 3 albo czysty Canvas) + Vite, jako PWA, osadzalna w `<iframe>` w portalach WordPress. Ma ważyć < 1 MB i startować < 2 s na słabym Androidzie. Zmień ją, jeśli synteza wskaże lepszą opcję, ale uzasadnij.
- Zakres MVP według syntezy. Wyjściowo:
  - jeden bohater;
  - trasa z 3 krajów (np. BE, NL, DE) do Polski;
  - tryb rankingowy i tryb łagodny („cozy”);
  - znajdźki z mechaniką wagi bagażu;
  - karta wyniku do udostępnienia, np. „Doleciałem z Antwerpii do Rzeszowa w 47 s”;
  - wybór kraju zamieszkania, który linkuje do właściwego portalu.
- Najpierw **grywalny prototyp rdzenia** (fizyka, przeszkody, restart), który mogę sprawdzić w przeglądarce na telefonie. Dopiero potem reszta.
- Testy automatyczne dla logiki: fizyka, kolizje, punktacja, liczenie dystansu, generator przeszkód z ziarnem.

## Twarde zasady (nie łamać bez mojej zgody)
- **Prawo i marki:**
  - zero słowa „Flappy” w nazwie, opisie i metadanych;
  - nie kopiujemy grafiki, rur, ptaka ani układu ekranów Flappy Bird;
  - żadnych prawdziwych marek i logotypów (linie lotnicze, sklepy, słodycze), także parodii nazw;
  - zasoby (grafika, dźwięk, czcionki) tylko z jasną licencją; prowadź `ASSETS.md` (plik, źródło, licencja).
- **Ton:**
  - śmiejemy się z sytuacji (bagaż, opóźnienia, tęsknota), nie z ludzi;
  - bohater jest sympatyczny i zaradny;
  - bez alkoholu, polityki, religii i tragedii;
  - kraje zamieszkania nie są wrogami, przeszkody to infrastruktura i pogoda;
  - słowo „cebulak” pada tylko jako wybór gracza (skórka), nigdy jako etykieta od gry.
  - Każdy tekst przechodzi „test babci i kolegi z pracy”.
- **Prywatność:** bez kont w MVP, anonimowy identyfikator, bez reklam personalizowanych, nicki z generowanej listy zamiast wolnego tekstu.
- **Git:**
  - każda zmiana to osobny PR jako szkic;
  - merge dopiero po mojej zgodzie;
  - nigdy push na główną gałąź, nigdy force-push, nigdy sekrety w repo.
- Raportuj uczciwie: co działa i jest sprawdzone, a czego nie sprawdziłeś.

## Termin orientacyjny
Publiczny start sezonu „Na Wigilię!” około **1 grudnia 2026**. Jeśli to nierealne przy zakresie MVP, powiedz wprost i zaproponuj, co uciąć.

Zacznij od etapu 1.
