=== Cebulak Express — osadzanie gry ===
Contributors: woogitsugames
Requires at least: 6.0
Requires PHP: 8.1
Stable tag: 1.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Responsywne osadzanie gry za pomocą shortcode, bez skryptów zewnętrznych.

== Instalacja ==
1. Skopiuj folder `cebulak-express` do `wp-content/plugins/`.
2. Aktywuj wtyczkę w Kokpicie WordPress.
3. Otwórz Ustawienia > Cebulak Express i podaj działający publiczny adres HTTPS gry.
4. Użyj shortcode: [cebulak_express kraj="be"]
5. Opcjonalnie: [cebulak_express kraj="be" z="antwerpia"] albo [cebulak_express r="be-antwerpia"].

Wtyczka nie wczytuje bibliotek JavaScript, nie wysyła danych do zewnętrznych serwisów poza żądaniem iframe do wskazanego serwera gry i nie modyfikuje nagłówków serwera. Właściciel hostingu gry musi zezwolić na osadzanie przez politykę frame-ancestors.
