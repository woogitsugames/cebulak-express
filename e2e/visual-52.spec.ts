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
  await page.goto('/assets/ui/pickup-boarding.png');
  await page.setContent(`<!doctype html><html lang="pl"><head><meta charset="UTF-8">
    <style>
      body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #273e52; }
      canvas { width: 360px; height: 640px; max-width: 100vw; max-height: 100vh; object-fit: contain; }
    </style></head><body><canvas id="preview"></canvas></body></html>`);
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
