# Portale polonijne — adresy i weryfikacja

Stan researchu: **30.10.2026**. Adresy WWW pochodzą z rzeczywistych stron i z listy instancji PoPolsku/TuWiesz w bramce CMS wydawcy. **„Dostępny CMS” nie jest równoznaczny z potwierdzonym publicznym dostępem przez przeglądarkę.** Facebook może wymagać logowania i blokuje zewnętrzne pobieranie; nie wywnioskowujemy slugów profili z nazw domen.

## PoPolsku (poradniki)

| Kraj | Adres | WWW | Źródło weryfikacji |
|---|---|---|---|
| BE | https://popolsku.be/ | działa | strona główna i CMS |
| FR | https://popolsku.fr/ | działa | strona główna i CMS |
| UK | https://popolsku.uk/ | działa | strona główna i CMS |
| SE | https://popolsku.se/ | działa | strona główna i CMS |
| ES | https://popolsku.es/ | działa | strona główna i CMS |
| CH | https://popolsku.ch/ | działa | strona główna i CMS |
| IT | https://popolsku.it/ | działa | strona główna i CMS |
| DK | https://popolsku.dk/ | działa | strona główna i CMS |
| NO | https://popolsku.no/ | **do potwierdzenia publicznie** | adres zgłoszony jako „dostępny” przez CMS; pobieranie WWW nieudane |
| AT | https://popolsku.at/ | **do potwierdzenia publicznie** | adres zgłoszony jako „dostępny” przez CMS; pobieranie WWW nieudane |
| FI | https://popolsku.fi/ | **do potwierdzenia publicznie** | adres zgłoszony jako „dostępny” przez CMS; pobieranie WWW nieudane |
| LU | https://popolsku.lu/ | **do potwierdzenia publicznie** | adres zgłoszony jako „dostępny” przez CMS; pobieranie WWW nieudane |

## TuWiesz (poradniki)

| Kraj | Adres | WWW | Źródło weryfikacji |
|---|---|---|---|
| DE | https://tuwiesz.de/ | działa | strona główna i CMS |
| NL | https://tuwiesz.nl/ | działa | strona główna i CMS |
| PL | https://tuwiesz.pl/ | **do potwierdzenia publicznie** | adres zgłoszony jako „dostępny” przez CMS; pobieranie WWW nieudane |

## Aktualności (portale newsowe)

| Kraj | Adres | WWW | Źródło weryfikacji |
|---|---|---|---|
| BE | https://aktualnosci.be/ | działa | strona główna |
| NL | https://aktualnosci.nl/ | działa | strona główna |
| DE | https://aktualnosci.de/ | działa | strona główna |
| FR | https://aktualnosci.fr/ | działa | strona główna |
| UK | https://aktualnosci.uk/ | działa | strona główna |

## Facebook — status kont powiązanych z portalami

| Portal / grupa | Facebook | Status |
|---|---|---|
| Aktualności BE | https://www.facebook.com/aktualnosci.be | **do potwierdzenia bezpośrednio**; niezależny katalog Social Blade podaje identyfikator `@aktualnosci.be`, ale Facebook blokuje weryfikację strony |
| Aktualności NL, DE, FR, UK | **do potwierdzenia** | Nie znaleziono wiarygodnie przypisanych, bezpośrednio potwierdzonych URL profili |
| PoPolsku BE, FR, UK, SE, ES, CH, IT, DK, NO, AT, FI, LU | **do potwierdzenia** | Nie znaleziono wiarygodnie przypisanych, bezpośrednio potwierdzonych URL profili |
| TuWiesz DE, NL, PL | **do potwierdzenia** | Nie znaleziono wiarygodnie przypisanych, bezpośrednio potwierdzonych URL profili |

Źródła pomocnicze: [Social Blade — Aktualnosci.be](https://socialblade.com/facebook/user/aktualnosci.be), [artykuł redakcyjny z odsyłaczem do posta na Facebooku](https://aktualnosci.be/2025/11/04/konkurs-co-kryje-sie-w-torbie-polaka-w-belgii/), [CMS PoPolsku/TuWiesz — list_portals](https://popolsku.be/) (wewnętrzne źródło instancji, bez publicznego endpointu listy).

**Decyzja implementacyjna:** `src/content/portals.ts` nie zawiera niezweryfikowanych linków Facebook. Kod rozróżnia linki news, guides i facebook; dla nieznanego profilu `portalLink(..., 'facebook')` zwraca `undefined`. Po weryfikacji przez właściciela wpisujemy pełny URL w mapie. `HomeCountry` obejmuje 15 krajów (BE, NL, DE, UK, FR, CH, NO, DK, IE, ES, IT, AT, SE, FI, LU); adresy IE/AT/FI/LU pozostają nieaktywne do publicznej weryfikacji.

## Metoda sprawdzenia

- Publiczne strony WWW: otwarcie adresu głównego przez narzędzie przeglądania stron 30.10.2026; wyniki „Internal Error” odnotowano jako **brak potwierdzenia**, nie jako awarię domeny.
- PoPolsku i TuWiesz: niezależne potwierdzenie adresu przez bramkę CMS (`list_portals`, stan `dostępny`) dla wszystkich 15 instancji.
- Facebook: wyszukiwanie nazw kont, próby otwarcia potencjalnych profili i sprawdzenie źródeł wtórnych. Facebook odrzucił pobieranie, więc brak dowodu na dostępność kont. Nie utożsamiać wyszukanego postu ze zweryfikowaną stroną.
- Obecność strony nie sprawdza prawa do wykorzystania jej nazwy/logo ani możliwości osadzania samego serwisu. Osadzana ma być **gra**, nie witryna portalu.
