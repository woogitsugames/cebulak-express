import { writeFile } from 'node:fs/promises';
import { test, expect, screenshot } from './support';

declare global {
  interface Window {
    __ceFirstCanvasFrame?: number;
    __ceFirstGameplayFrame?: number;
    __ceStartClick?: number;
  }
}

/** Rzeczywiste wywołanie Canvas 2D zamiast samego DOMContentLoaded lub widoczności HUD. */
test('budżet pierwszej klatki < 2 s przy Slow 4G i CPU 4x', async ({ page, browserName }, testInfo) => {
  test.skip(
    browserName !== 'chromium' || testInfo.project.name !== 'Pixel 7 (Chromium)',
    'CDP i ograniczanie CPU/sieci mierzymy wyłącznie na mobilnym Chromium',
  );

  await page.addInitScript(() => {
    const original = CanvasRenderingContext2D.prototype.fillRect;
    CanvasRenderingContext2D.prototype.fillRect = function (x, y, w, h) {
      if (this.canvas.id === 'game') {
        if (window.__ceFirstCanvasFrame === undefined) {
          window.__ceFirstCanvasFrame = performance.now();
        }
        if (
          window.__ceFirstGameplayFrame === undefined &&
          document.getElementById('menu')?.hidden &&
          document.getElementById('hud')?.hidden === false
        ) {
          window.__ceFirstGameplayFrame = performance.now();
        }
      }
      return original.call(this, x, y, w, h);
    };
    document.addEventListener('click', (event) => {
      if (event.target instanceof Element && event.target.closest('#btn-start')) {
        window.__ceStartClick = performance.now();
      }
    }, true);
  });

  const cdp = await page.context().newCDPSession(page);
  try {
    await cdp.send('Network.enable');
    // Slow 4G: 150 ms RTT, 1,6 Mb/s pobieranie, 750 kb/s wysyłanie.
    await cdp.send('Network.emulateNetworkConditions', {
      offline: false,
      latency: 150,
      downloadThroughput: 200_000,
      uploadThroughput: 93_750,
      connectionType: 'cellular4g',
    });
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });

    await page.goto('/?seed=123&test=1', { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => window.__ceFirstCanvasFrame !== undefined);
    await expect(page.locator('#sel-home option')).toHaveCount(8);

    await page.locator('#btn-start').click();
    await page.waitForFunction(() => window.__ceFirstGameplayFrame !== undefined);

    const measured = await page.evaluate(() => ({
      navigationToFirstCanvasMs: window.__ceFirstCanvasFrame!,
      startClickToFirstGameplayFrameMs: window.__ceFirstGameplayFrame! - window.__ceStartClick!,
    }));
    const report = {
      device: 'Pixel 7 (Chromium)',
      profile: { network: 'Slow 4G', rttMs: 150, downloadBps: 200_000, uploadBps: 93_750, cpuThrottle: 4 },
      budgetMs: 2_000,
      metric: 'performance.now(): start nawigacji → pierwsze fillRect na canvas#game; kliknięcie Lecimy! → pierwsze fillRect nowego przejazdu',
      ...measured,
      passed: measured.navigationToFirstCanvasMs < 2_000 && measured.startClickToFirstGameplayFrameMs < 2_000,
    };
    const json = JSON.stringify(report, null, 2) + '\n';
    await writeFile(testInfo.outputPath('wydajnosc-slow4g-cpu4x.json'), json, 'utf8');
    await testInfo.attach('raport-wydajnosci', { body: Buffer.from(json, 'utf8'), contentType: 'application/json' });
    await screenshot(page, testInfo, 'pierwsza-klatka-po-starcie');

    expect(measured.navigationToFirstCanvasMs, 'Od nawigacji do pierwszego renderu Canvas 2D').toBeLessThan(2_000);
    expect(measured.startClickToFirstGameplayFrameMs, 'Od kliknięcia Lecimy! do klatki nowej rozgrywki').toBeLessThan(2_000);
  } finally {
    // Ograniczenia CDP nie mogą przeciekać do dalszych testów.
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 1 });
    await cdp.send('Network.emulateNetworkConditions', {
      offline: false,
      latency: 0,
      downloadThroughput: -1,
      uploadThroughput: -1,
    });
    await cdp.detach();
  }
});
