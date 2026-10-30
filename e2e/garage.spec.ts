import { readFileSync } from 'node:fs';
import { build } from 'esbuild';
import { test, expect, screenshot } from './support';

/**
 * Ekran garażu jest samodzielnym modułem, jeszcze niepodłączonym w main.ts.
 * Test ładuje ten sam kod przez esbuild, bez modyfikowania menu ani index.html.
 * Zrzut wykonujemy w emulacji telefonu na prawdziwych plikach public/assets/.
 */
test('garaż na telefonie: skórki, nicki i zrzut ekranu', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'Pixel 7 (Chromium)', 'Zrzut garażu wyłącznie na telefonie Pixel 7');

  const bundle = await build({
    entryPoints: ['src/ui/garage.ts'],
    bundle: true,
    write: false,
    outfile: '/tmp/garage-preview.js',
    format: 'iife',
    globalName: 'GaragePreview',
    platform: 'browser',
    target: 'es2022',
    loader: { '.css': 'empty' },
    define: { 'import.meta.env.BASE_URL': JSON.stringify('/') },
  });
  const script = bundle.outputFiles?.find((file) => file.path.endsWith('.js'))?.text;
  if (!script) throw new Error('Nie udało się zbudować samodzielnego ekranu garażu');

  // Nawigacja do pliku statycznego ustawia origin serwera, bez uruchamiania main.ts.
  await page.goto('/assets/hero/hero.json');
  await page.setContent(
    '<!doctype html><html lang="pl"><head><meta charset="utf-8" />' +
    '<base href="/"/><meta name="viewport" content="width=device-width,initial-scale=1" />' +
    '<style>html,body{margin:0;min-height:100%;background:linear-gradient(155deg,#203e36,#395b48)}' +
    'body{padding:12px;box-sizing:border-box;display:flex;justify-content:center;align-items:flex-start}' +
    '#garage-preview{display:flex;justify-content:center;width:100%}</style></head>' +
    '<body><main id="garage-preview"></main></body></html>',
  );
  await page.addStyleTag({ content: readFileSync('src/ui/garage.css', 'utf8') });
  await page.addScriptTag({ content: script });
  await page.evaluate(() => {
    type GarageModule = { mountGarage: (element: HTMLElement, opts: {
      home: 'BE'; totalKm?: number; onChange: (value: {skin: string;nickId: string}) => void; onClose: () => void;
    }) => () => void };
    const global = window as unknown as { GaragePreview: GarageModule; garageChanges: Array<{skin: string;nickId: string}> };
    global.garageChanges = [];
    global.GaragePreview.mountGarage(document.getElementById('garage-preview')!, {
      home: 'BE',
      totalKm: 1_180,
      onChange: (value) => global.garageChanges.push(value),
      onClose: () => {},
    });
  });

  await expect(page.locator('.ce-garage__pick')).toHaveCount(11);
  await expect(page.locator('.ce-garage__pick:disabled')).toHaveCount(6);
  await expect(page.locator('.ce-garage__nick')).toHaveCount(6);
  await page.getByRole('button', { name: 'Pan Cebulek' }).click();
  await expect(page.locator('.ce-garage__skin-name')).toHaveText('Pan Cebulek');
  await page.waitForFunction(() => {
    const image = document.querySelector<HTMLImageElement>('.ce-garage__image');
    return Boolean(image && !image.hidden && image.complete && image.naturalWidth > 0);
  });
  // Kwadratowy portret nie może zasłaniać nazwy skórki ani przycisków pod podglądem.
  await expect.poll(() => page.locator('.ce-garage__image').evaluate((image) => {
    const rect = image.getBoundingClientRect();
    const frame = image.parentElement!.getBoundingClientRect();
    return rect.left >= frame.left - 1 && rect.right <= frame.right + 1 &&
      rect.top >= frame.top - 1 && rect.bottom <= frame.bottom + 1;
  })).toBe(true);
  await screenshot(page, testInfo, '36-garaz-pixel7-pan-cebulek');

  // Po 1 180 km Mała Japonka jest wybieralna, a kompakt wymaga jeszcze 320 km.
  await page.getByRole('button', { name: 'Mała Japonka' }).click();
  const changeCount = await page.evaluate(() => (window as unknown as {
    garageChanges: Array<{skin:string;nickId:string}>
  }).garageChanges.length);
  await page.locator('.ce-garage__arrow').nth(1).click();
  await expect(page.locator('.ce-garage__skin-name')).toHaveText('Kompakt od szwagra');
  await expect(page.locator('.ce-garage__lock-hint'))
    .toHaveText('Odblokujesz po 1 500 km łącznie (brakuje 320 km)');
  await expect(page.locator('.ce-garage__portrait')).toHaveClass(/ce-garage__portrait--locked/);
  await expect(page.locator('.ce-garage__lock')).toBeVisible();
  await expect(page.getByRole('button', { name: /Kompakt od szwagra/ })).toBeDisabled();
  await expect(page.getByRole('button', { name: 'Mała Japonka' })).toHaveAttribute('aria-pressed', 'true');
  await expect.poll(() => page.evaluate(() => (window as unknown as {
    garageChanges: Array<{skin:string;nickId:string}>
  }).garageChanges.length)).toBe(changeCount);
  await page.waitForFunction(() => {
    const image = document.querySelector<HTMLImageElement>('.ce-garage__image');
    return Boolean(image && !image.hidden && image.complete && image.naturalWidth > 0);
  });
  await screenshot(page, testInfo, '72-garaz-kompakt-z-klodka');

  await page.getByRole('button', { name: 'Kierowczyni' }).click();
  await expect(page.locator('.ce-garage__gender-button').nth(1)).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.ce-garage__nick')).toHaveCount(6);
  const previous = await page.locator('.ce-garage__nick').allTextContents();
  await page.getByRole('button', { name: 'Losuj inne' }).click();
  const after = await page.locator('.ce-garage__nick').allTextContents();
  expect(after).not.toEqual(previous);
  expect(await page.locator('.ce-garage input').count()).toBe(0);
  await screenshot(page, testInfo, '36-garaz-pixel7-kierowczyni');
  const history = await page.evaluate(() => (window as unknown as {
    garageChanges: Array<{skin:string;nickId:string}>
  }).garageChanges);
  expect(history.some((change) => change.skin === 'pan-cebulek')).toBe(true);
  expect(history.at(-1)?.nickId).toContain('-g-f-');
});
