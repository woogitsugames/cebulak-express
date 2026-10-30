<?php
/* Prosty test CLI z atrapami funkcji WordPress. Bez uruchamiania serwera. */
declare(strict_types=1);
define('ABSPATH', __DIR__);
$GLOBALS['ce_options'] = ['cebulak_express_game_url' => 'https://gra.example/test/'];
function add_action(...$args): void {}
function add_shortcode(...$args): void {}
function shortcode_atts($defaults, $atts, $name): array { return array_merge($defaults, $atts); }
function get_option(string $name, $default = '') { return $GLOBALS['ce_options'][$name] ?? $default; }
function wp_parse_url(string $url) { return parse_url($url); }
function esc_url_raw(string $url, array $protocols = []): string { return $url; }
function esc_url(string $url): string { return htmlspecialchars($url, ENT_QUOTES, 'UTF-8'); }
function esc_attr(string $value): string { return htmlspecialchars($value, ENT_QUOTES, 'UTF-8'); }
function esc_attr__(string $value, string $domain): string { return esc_attr($value); }
function add_query_arg(array $args, string $url): string { return $url . (str_contains($url, '?') ? '&' : '?') . http_build_query($args); }
function current_user_can(string $permission): bool { return false; }
function add_settings_error(...$args): void {}

require __DIR__ . '/../wordpress/cebulak-express/cebulak-express.php';
function check(bool $condition, string $message): void { if (!$condition) throw new RuntimeException($message); }

$html = cebulak_express_shortcode(['kraj' => 'be', 'z' => 'antwerpia']);
check(str_contains($html, 'kraj=be&amp;z=antwerpia'), 'niepoprawne parametry w iframe');
check(str_contains($html, 'allow="fullscreen; web-share; autoplay"'), 'brak iframe permissions');
check(str_contains($html, 'aspect-ratio:9 / 16'), 'brak responsywnego layoutu');
check(str_contains($html, 'src="https://gra.example/test/'), 'zly adres gry');

$invalid = cebulak_express_shortcode(['kraj' => 'xx', 'z' => '" onload="alert(1)', 'r' => 'be-foo" onload="x']);
check(str_contains($invalid, 'kraj=be'), 'brak fallback dla nieznanego kraju');
check(!str_contains($invalid, 'onload='), 'wstrzykniety atrybut');
check(!str_contains($invalid, '&amp;z='), 'wstrzykniete miasto');

$share = cebulak_express_shortcode(['r' => 'be-antwerpia', 'kraj' => 'de']);
check(str_contains($share, '?r=be-antwerpia'), 'r ma miec pierwszenstwo');
check(!str_contains($share, 'kraj=de'), 'nie lacz argumentow r z kraj');

check(cebulak_express_valid_game_url('javascript:alert(1)') === '', 'przepuszczono niedozwolony schemat');
check(cebulak_express_valid_game_url('https://user:pass@gra.example/') === '', 'przepuszczono dane logowania');
check(cebulak_express_valid_game_url('http://gra.example/') === '', 'przepuszczono HTTP');
check(cebulak_express_valid_game_url('https://gra.example/?x=y') === '', 'przepuszczono parametry gry');
check(cebulak_express_sanitize_game_url('https://gra.example/start') === 'https://gra.example/start', 'bledny dobry URL');

$GLOBALS['ce_options']['cebulak_express_game_url'] = '';
check(cebulak_express_shortcode(['kraj' => 'be']) === '', 'pusty URL ma nie renderowac iframe');

echo "OK: shortcode, walidacja, escaping, konfiguracja\n";
