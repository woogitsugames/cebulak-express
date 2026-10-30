# Domeny internetowe — Cebulak Express

**Stan: 30.10.2026.** Domena gry jest potrzebna dla głównej witryny, linków z kart wyniku, polityki prywatności i komunikacji ze sklepami. **Dostępności domen nie wolno wnioskować z braku wyników wyszukiwarki.**

## Weryfikacja dostępności

| Domena | Potwierdzenie z rejestru (30.10.2026) | Znaczenie | Rekomendacja |
|---|---|---|---|
| cebulakexpress.pl | **Niepotwierdzona** — brak jednoznacznej odpowiedzi WHOIS/RDAP/rejestratora | Łatwa do podania polskiej publiczności | **Pierwszy wybór do rejestracji**, jeżeli wolna |
| cebulakexpress.com | **Niepotwierdzona** | Rozpoznawalna globalnie; kanał międzynarodowy | Zarejestrować ochronnie, jeżeli wolna |
| cebulakexpress.eu | **Niepotwierdzona** | Czytelna dla Polonii europejskiej | Opcja ochronna po .pl/.com |
| cebulakexpress.app | **Niepotwierdzona** | Naturalna dla aplikacji, wymaga prawidłowego HTTPS w praktycznym użyciu | Opcja dodatkowa, nie zamiast .pl |
| cebulak.express | **Niepotwierdzona**; najpierw sprawdzić w rejestratorze istnienie i warunki danej końcówki oraz cenę premium | Krótka, ale mniej intuicyjna w dyktowaniu | Niski priorytet |

**Metoda i ograniczenie:** podjęto próbę sprawdzenia wpisów WHOIS/RDAP, ale nie uzyskano w tej sesji miarodajnego wyniku na żywo. **Żadna domena nie została uznana za wolną lub zajętą.** Brak takiego potwierdzenia trzeba zamknąć bezpośrednio przed płatnością. Nie rejestrowano domen.

## Linki do sprawdzenia u operatorów

- NASK — wyszukiwarka WHOIS dla .pl: https://nask.net/whois ; informacje o RDAP: https://nask.net/RDAP_w_NASK (dostęp: 30.10.2026). Zapytanie przykładowe: https://rdap.dns.pl/domain/cebulakexpress.pl .
- ICANN Registration Data Lookup: https://lookup.icann.org/en (dostęp: 30.10.2026) — domeny globalne, np. .com, .app, .express. Zapytanie RDAP z odpowiedzią 404 nie jest jednoznaczną gwarancją możliwości zakupu; mogą istnieć rezerwacje, blokady lub oferty premium.
- EURid: https://www.eurid.eu/en/ (dostęp: 30.10.2026) — wyszukiwanie i rejestratorzy .eu.
- U wybranego rejestratora: sprawdzić dokładną cenę **pierwszego roku, odnowienia, wykupu po wygaśnięciu**, podatek, DNSSEC, 2FA, autoodnowienie oraz czy oferowana nazwa jest zastrzeżona/premium.

## Alternatywy (bez sprawdzenia dostępności)

1. **gra-cebulakexpress.pl** — jednoznacznie związana z grą, ale dłuższa.
2. **cebulakexpressgame.com** — wariant międzynarodowy, słaby typograficznie.
3. **cebulakgra.pl** — krótki, ale mniej spójny z nazwą produktu.
4. **kierunekpolska.gra.pl** — **nie rekomendować** jako marka bez badania oznaczenia „Kierunek POLSKA” R.315691; zależy od właściciela domeny nadrzędnej i sprawdzenia znaków.
5. Subdomena pod posiadanym portalem, np. **gra.[domena-portalu]** — awaryjnie na start, do konfiguracji przez właściciela portalu; nie tworzyć literalnie nazw ani nie zakładać dostępu do domeny.

Alternatywy mogą kolidować z cudzymi znakami nawet wtedy, gdy technicznie są do rejestracji. **[do weryfikacji przez prawnika]**

## Rekomendowana konfiguracja i bezpieczeństwo

**Główna domena:** cebulakexpress.pl, pod warunkiem dostępności i oceny nazwy. **Druga domena:** cebulakexpress.com jako trwałe przekierowanie 301/308 na stronę kanoniczną (o ile obie wolne). Jeżeli różne portale osadzają PWA w iframe, **nie zakładać**, że zapis localStorage i anonimowy UID będą takie same dla wszystkich stron: przeglądarki mogą partycjonować pamięć osadzonych kontekstów.

Minimalne wymagania operacyjne:
- Rejestrować na właściwy **podmiot właściciela projektu**, nie prywatne konto wykonawcy; skonfigurować 2FA i autoodnowienie.
- DNS i hosting z TLS/HTTPS, HSTS tam, gdzie można bezpiecznie egzekwować.
- Stabilne publiczne adresy polityki prywatności i zasad rankingu; linkować je z web/PWA, ekranu gry i formularzy sklepów.
- Zweryfikować dostępność profili społecznościowych, unikać podszywania się pod inne marki. [do weryfikacji przez prawnika]
- Włączyć monitorowanie terminu przedłużenia oraz zabezpieczyć domeny przed transferem (transfer lock).
- Pojedynczy URL kanoniczny dla udostępnień (Open Graph); przekierowania nie mogą prowadzić do mylącego innego produktu.
- Nie mylić rejestracji domeny z ochroną znaku towarowego.

## Lista warunków do spełnienia przed zakupem

- [ ] Odpytać rejestratorów dla wszystkich pięciu domen, zapisać zrzuty z cenami, datą i godziną.
- [ ] Powtórzyć zapytanie na etapie płatności (status może zmienić się w każdej chwili).
- [ ] Sprawdzić znaki towarowe zgodnie z plikiem znaki.md.
- [ ] Zatwierdzić właściciela domen, adres e-mail techniczny i procedurę odnowienia.
- [ ] Wybrać domenę główną i przygotować adresy polityki prywatności / regulaminu.
