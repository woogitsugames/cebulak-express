<?php
/**
 * Plugin Name: Cebulak Express — osadzanie gry
 * Description: Responsywny shortcode [cebulak_express kraj="be"] do osadzania gry bez dodatkowych skryptów.
 * Version: 1.0.0
 * Requires PHP: 8.1
 * License: GPL-2.0-or-later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: cebulak-express
 */

defined('ABSPATH') || exit;

/** Zwraca wyłącznie poprawny produkcyjny adres HTTPS gry. */
function cebulak_express_valid_game_url($value): string
{
    if (!is_string($value)) {
        return '';
    }
    $value = trim($value);
    $parts = wp_parse_url($value);
    if (!is_array($parts) || strtolower($parts['scheme'] ?? '') !== 'https'
        || empty($parts['host']) || isset($parts['user']) || isset($parts['pass'])
        || isset($parts['query']) || isset($parts['fragment'])) {
        return '';
    }
    return esc_url_raw($value, ['https']);
}

/** Nie zapisujemy niebezpiecznego URL; zachowujemy poprzednie poprawne ustawienie. */
function cebulak_express_sanitize_game_url($value): string
{
    if (is_string($value) && trim($value) === '') {
        return '';
    }
    $validated = cebulak_express_valid_game_url($value);
    if ($validated !== '') {
        return $validated;
    }
    add_settings_error('cebulak_express_game_url', 'invalid_url', 'Wpisz adres HTTPS gry bez parametrów i fragmentu.', 'error');
    return cebulak_express_valid_game_url(get_option('cebulak_express_game_url', ''));
}

function cebulak_express_register_settings(): void
{
    register_setting('cebulak_express', 'cebulak_express_game_url', [
        'type' => 'string',
        'sanitize_callback' => 'cebulak_express_sanitize_game_url',
        'default' => '',
    ]);
}
add_action('admin_init', 'cebulak_express_register_settings');

function cebulak_express_settings_page(): void
{
    if (!current_user_can('manage_options')) {
        return;
    }
    echo '<div class="wrap"><h1>Osadzanie gry Cebulak Express</h1>';
    echo '<form method="post" action="options.php">';
    settings_fields('cebulak_express');
    echo '<p><label for="cebulak_express_game_url">Publiczny adres gry (HTTPS, bez ? i #)</label></p>';
    echo '<input type="url" id="cebulak_express_game_url" name="cebulak_express_game_url" class="regular-text" required pattern="https://.*" value="'
        . esc_attr(get_option('cebulak_express_game_url', '')) . '">';
    echo '<p>Wstaw w treści wpisu: <code>[cebulak_express kraj="be"]</code>. Opcjonalnie <code>z="antwerpia"</code> lub <code>r="be-antwerpia"</code>.</p>';
    submit_button('Zapisz');
    echo '</form></div>';
}

function cebulak_express_admin_menu(): void
{
    add_options_page('Cebulak Express', 'Cebulak Express', 'manage_options', 'cebulak-express', 'cebulak_express_settings_page');
}
add_action('admin_menu', 'cebulak_express_admin_menu');

/** Generuje bezpieczny iframe. Wszystkie argumenty są walidowane przed zbudowaniem adresu. */
function cebulak_express_shortcode($raw_atts = []): string
{
    $atts = shortcode_atts(['kraj' => 'be', 'z' => '', 'r' => ''], is_array($raw_atts) ? $raw_atts : [], 'cebulak_express');
    $allowed = ['be' => true, 'nl' => true, 'de' => true, 'uk' => true, 'fr' => true, 'ch' => true, 'no' => true, 'dk' => true];
    $country = is_string($atts['kraj']) ? strtolower(trim($atts['kraj'])) : 'be';
    if (!isset($allowed[$country])) {
        $country = 'be';
    }

    $args = ['kraj' => $country];
    $city = is_string($atts['z']) ? strtolower(trim($atts['z'])) : '';
    if (strlen($city) <= 60 && preg_match('/^[a-z0-9]+(?:-[a-z0-9]+)*$/D', $city)) {
        $args['z'] = $city;
    }

    $share = is_string($atts['r']) ? strtolower(trim($atts['r'])) : '';
    if (preg_match('/^([a-z]{2})-([a-z0-9]+(?:-[a-z0-9]+)*)$/D', $share, $matches)
        && strlen($share) <= 64 && isset($allowed[$matches[1]])) {
        $args = ['r' => $share];
    }

    $base_url = cebulak_express_valid_game_url(get_option('cebulak_express_game_url', ''));
    if ($base_url === '') {
        return current_user_can('manage_options')
            ? '<p>Ustaw adres HTTPS gry: Ustawienia → Cebulak Express.</p>'
            : '';
    }
    $url = add_query_arg($args, $base_url);

    return '<div class="cebulak-express-embed" style="position:relative;width:100%;max-width:420px;aspect-ratio:9 / 16;margin:0 auto;overflow:hidden">'
        . '<iframe src="' . esc_url($url) . '" title="' . esc_attr__('Cebulak Express — gra', 'cebulak-express') . '"'
        . ' loading="lazy" allow="fullscreen; web-share; autoplay" allowfullscreen'
        . ' referrerpolicy="strict-origin-when-cross-origin" style="display:block;width:100%;height:100%;border:0" ></iframe>'
        . '</div>';
}
add_shortcode('cebulak_express', 'cebulak_express_shortcode');
