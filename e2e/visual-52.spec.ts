import { build } from 'esbuild';
import { resolve } from 'node:path';
import { expect, test } from './support';

/**
 * Zrzut z prawdziwego Renderer + Game, lecz ze stanem deterministycznie
 * ustawionym tuż przed bramką. Nie zmieniamy src/main.ts ani logiki gry.
 */
test('zrzut Canvas: bramka bagażowa i aktywne bonusy', async ({ page }, testInfo) => {
  const bundled = await build({
    entryPoints: [resolve('e2e/visual-52-runtime.ts')],
    write: false,
    bundle: true,
    platform: 'browser',
    target: 'es2022',
    format: 'iife',
    define: { 'import.meta.env': JSON.stringify({ BASE_URL: '/' }) },
    logLevel: 'error',
  });
  const code = bundled.outputFiles?.[0]?.text;
  expect(code).toBeTruthy();
  // Zachowujemy dokument HTML gry i tworzymy osobny Canvas na wierzchu.
  // Podmiana treści dokumentu obrazka PNG przez page.setContent zawieszała
  // Playwright w Chromium i WebKit.
  await page.goto('/');
  await page.evaluate(() => {
    const host = document.createElement('div');
    host.id = 'powerup-visual-host';
    host.style.cssText = [
      'position:fixed', 'inset:0', 'z-index:2147483647',
      'display:grid', 'place-items:center', 'background:#273e52',
    ].join(';');
    const canvas = document.createElement('canvas');
    canvas.id = 'preview';
    canvas.style.cssText = [
      'display:block', 'width:360px', 'height:640px',
      'max-width:100vw', 'max-height:100vh', 'object-fit:contain',
    ].join(';');
    host.appendChild(canvas);
    document.body.appendChild(host);
  });
  await page.addScriptTag({ content: code! });
  await page.waitForFunction(() => typeof (window as Window & { drawPowerupPreview?: unknown }).drawPowerupPreview === 'function');
  // Odczekaj na PNG i tło (ładowanie asynchroniczne), potem przerysuj prawdziwy Canvas.
  await page.waitForTimeout(1200);
  for (const kind of ['boarding', 'tailwind', 'mamcall'] as const) {
    await page.evaluate((powerup) => {
      (window as Window & { drawPowerupPreview: (kind: string) => void }).drawPowerupPreview(powerup);
    }, kind);
    await testInfo.attach('52-bramka-z-bonusem-' + kind, {
      body: await page.locator('#preview').screenshot({ animations: 'disabled' }),
      contentType: 'image/png',
    });
  }
});
