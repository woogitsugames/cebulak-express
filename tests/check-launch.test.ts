import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import {
  checkAndroidAppId, checkFirebaseEnv, checkManifest, checkPrivacyPolicy, checkRulesVersion,
  checkShareOrigin, exitCodeFor, formatResult, generatedIcons, parseEnv, readRulesVersion,
} from '../scripts/check-launch.mjs';

const FULL_ENV = {
  VITE_FIREBASE_API_KEY: 'klucz',
  VITE_FIREBASE_AUTH_DOMAIN: 'demo.firebaseapp.com',
  VITE_FIREBASE_PROJECT_ID: 'demo',
  VITE_FIREBASE_APP_ID: '1:1:web:1',
  VITE_FIREBASE_MESSAGING_SENDER_ID: '1',
  VITE_FIREBASE_STORAGE_BUCKET: 'demo.firebasestorage.app',
  VITE_RECAPTCHA_SITE_KEY: 'site',
  VITE_ANALYTICS_ENDPOINT: 'https://europe-west1-demo.cloudfunctions.net/collectEvents',
};

describe('check-launch', () => {
  it('parsuje plik .env jak Vite', () => {
    expect(parseEnv('# komentarz\nA=1\nB="dwa # nie komentarz"\nC= trzy # komentarz\nexport D=4\nZLE\n'))
      .toEqual({ A: '1', B: 'dwa # nie komentarz', C: 'trzy', D: '4' });
  });

  it('wymaga czterech zmiennych Firebase, resztę tylko ostrzega', () => {
    expect(exitCodeFor(checkFirebaseEnv(FULL_ENV))).toBe(0);
    expect(checkFirebaseEnv(FULL_ENV).every((r) => r.ok)).toBe(true);
    const partial = checkFirebaseEnv({ ...FULL_ENV, VITE_FIREBASE_APP_ID: ' ', VITE_RECAPTCHA_SITE_KEY: '' });
    expect(exitCodeFor(partial)).toBe(1);
    expect(partial[0].detail).toContain('VITE_FIREBASE_APP_ID');
    expect(partial.find((r) => r.label === 'VITE_RECAPTCHA_SITE_KEY')?.critical).toBe(false);
    expect(exitCodeFor(checkFirebaseEnv({ ...FULL_ENV, VITE_ANALYTICS_ENDPOINT: 'http://x' }))).toBe(1);
  });

  it('porównuje RULES_VERSION klienta i Functions', () => {
    expect(readRulesVersion('export const RULES_VERSION = 7;')).toBe(7);
    expect(readRulesVersion('const X = 1;')).toBeNull();
    const client = 'export const RULES_VERSION = 2;';
    expect(checkRulesVersion(client, "import { isCurrentRulesVersion, RULES_VERSION } from '../../src/core/rules';").ok)
      .toBe(true);
    expect(checkRulesVersion(client, 'export const RULES_VERSION = 2;').ok).toBe(true);
    expect(checkRulesVersion(client, 'export const RULES_VERSION = 3;').critical).toBe(true);
    expect(checkRulesVersion(client, 'const nic = 0;').ok).toBe(false);
  });

  it('RULES_VERSION w repo jest wspólny dla klienta i Functions', () => {
    const result = checkRulesVersion(readFileSync('src/core/rules.ts', 'utf8'),
      readFileSync('functions/src/index.ts', 'utf8'));
    expect(result.ok).toBe(true);
  });

  it('sprawdza politykę prywatności', () => {
    expect(exitCodeFor(checkPrivacyPolicy(null))).toBe(1);
    const good = 'Gra używa anonimowego identyfikatora Firebase. Nie wyświetlamy reklam personalizowanych.';
    expect(checkPrivacyPolicy(good).every((r) => r.ok)).toBe(true);
    const draft = checkPrivacyPolicy(good + ' Administrator: [UZUPEŁNIJ: nazwa].');
    expect(draft.find((r) => r.label === 'Polityka gotowa do publikacji')?.ok).toBe(false);
    expect(checkPrivacyPolicy('Zbieramy dane.').filter((r) => !r.ok)).toHaveLength(2);
  });

  it('polityka w repo wspomina identyfikator i brak reklam personalizowanych', () => {
    const results = checkPrivacyPolicy(readFileSync('docs/prawo/polityka-prywatnosci.md', 'utf8'));
    expect(results.filter((r) => r.label !== 'Polityka gotowa do publikacji').every((r) => r.ok)).toBe(true);
  });

  it('sprawdza manifest i pliki ikon', () => {
    const manifest = JSON.stringify({
      name: 'Gra', short_name: 'G', start_url: './',
      icons: [{ src: './a.png', sizes: '192x192' }, { src: './b.png', sizes: '512x512', purpose: 'maskable' }],
    });
    expect(checkManifest(manifest, () => true).every((r) => r.ok)).toBe(true);
    expect(exitCodeFor(checkManifest(manifest, (src) => src !== 'b.png'))).toBe(1);
    expect(exitCodeFor(checkManifest('{', () => true))).toBe(1);
    expect(exitCodeFor(checkManifest(null, () => true))).toBe(1);
    const small = JSON.stringify({ name: 'G', short_name: 'G', start_url: '/', icons: [{ src: 'a.png', sizes: '192x192' }] });
    expect(exitCodeFor(checkManifest(small, () => true))).toBe(1);
  });

  it('manifest w repo ma komplet ikon (część generuje wtyczka PWA)', () => {
    const generated = generatedIcons(readFileSync('scripts/pwa-plugin.ts', 'utf8'));
    expect(generated).toContain('assets/brand/icon-192.png');
    const results = checkManifest(readFileSync('public/manifest.webmanifest', 'utf8'),
      (src) => existsSync('public/' + src) || generated.includes(src));
    expect(exitCodeFor(results)).toBe(0);
  });

  it('sprawdza applicationId Androida', () => {
    const gradle = 'defaultConfig {\n  applicationId "com.example.gra"\n}';
    expect(checkAndroidAppId(gradle, "appId: 'com.example.gra',").ok).toBe(true);
    expect(checkAndroidAppId(gradle, "appId: 'com.example.inna',").ok).toBe(false);
    expect(checkAndroidAppId('defaultConfig {}', null).critical).toBe(true);
    expect(checkAndroidAppId(null, null).critical).toBe(true);
  });

  it('ostrzega o przykładowym adresie gry', () => {
    const result = checkShareOrigin("export const GAME_ORIGIN = 'https://gra.example.invalid';");
    expect(result.ok).toBe(false);
    expect(result.critical).toBe(false);
    expect(checkShareOrigin("export const GAME_ORIGIN = 'https://cebulak.pl';").ok).toBe(true);
  });

  it('formatuje wyniki po polsku ze znacznikami', () => {
    expect(formatResult({ ok: true, critical: false, label: 'A' })).toBe('✓ A');
    expect(formatResult({ ok: false, critical: true, label: 'B', detail: 'brak' })).toBe('✗ B — brak');
    expect(formatResult({ ok: false, critical: false, label: 'C' })).toBe('! C');
  });
});
