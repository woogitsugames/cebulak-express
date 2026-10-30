import { build } from 'vite';
import { resolve } from 'node:path';
import { test, expect } from './support';

let recorderBundle = '';

test.beforeAll(async () => {
  // Kompilujemy PRAWDZIWY moduł produkcyjny; test nie powiela implementacji MediaRecorder.
  const output = await build({
    configFile: false,
    logLevel: 'error',
    build: {
      write: false,
      minify: false,
      lib: {
        entry: resolve(process.cwd(), 'src/record/recorder.ts'),
        name: 'RecorderSmoke',
        formats: ['es'],
        fileName: 'recorder-smoke',
      },
    },
  });
  const builds = Array.isArray(output) ? output : [output];
  const chunks = builds.flatMap((item) => 'output' in item ? item.output : []);
  const entry = chunks.find((item) => item.type === 'chunk' && item.isEntry);
  if (!entry || entry.type !== 'chunk') throw new Error('Brak buildu silnika nagrywania');
  recorderBundle = entry.code;
});

test('Chromium nagrywa prawdziwe 3 s z canvas.captureStream i prawidłowym MIME', async ({ page }, info) => {
  test.skip(!info.project.name.startsWith('Desktop'), 'Test kodeka wykonywany na desktopowym Chromium');

  await page.route('**/__recorder_smoke__.js', (route) => route.fulfill({
    status: 200,
    contentType: 'text/javascript; charset=utf-8',
    body: recorderBundle,
  }));
  await page.goto('/?test=1&seed=44');

  const result = await page.evaluate(async () => {
    const modulePath: string = '/__recorder_smoke__.js';
    const { VerticalVideoRecorder } = await import(modulePath);
    const canvas = document.createElement('canvas');
    canvas.width = 360;
    canvas.height = 640;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Brak Canvas 2D na stronie testowej');

    let frameId = 0;
    let frameCount = 0;
    const draw = (): void => {
      frameCount++;
      ctx.fillStyle = frameCount % 2 === 0 ? '#14654f' : '#e9ba43';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#19394a';
      ctx.fillRect((frameCount * 5) % 300, 150, 60, 70);
      frameId = requestAnimationFrame(draw);
    };
    draw();

    const recorder = new VerticalVideoRecorder({
      sourceCanvas: canvas,
      routeName: 'Antwerpia → Rzeszów',
      portalName: 'aktualnosci.be',
      playUrl: 'aktualnosci.be',
      outroHeadline: 'Więcej wiadomości:',
      getKm: () => frameCount,
      durationMs: 3_000,
    });

    try {
      const video = await recorder.start();
      const header = Array.from(new Uint8Array(await video.blob.slice(0, 12).arrayBuffer()));
      const isWebm = header[0] === 0x1a && header[1] === 0x45 && header[2] === 0xdf && header[3] === 0xa3;
      const isMp4 = String.fromCharCode(...header.slice(4, 8)) === 'ftyp';
      return {
        bytes: video.blob.size,
        mimeType: video.mimeType,
        blobMime: video.blob.type,
        filename: video.filename,
        durationMs: video.durationMs,
        frameCount,
        signatureValid: isWebm || isMp4,
      };
    } finally {
      recorder.cancel();
      cancelAnimationFrame(frameId);
    }
  });

  expect(result.bytes).toBeGreaterThan(1_024);
  expect(result.bytes).toBeLessThanOrEqual(15_000_000);
  expect(result.mimeType).toMatch(/^video\/(mp4|webm)(;|$)/i);
  expect(result.blobMime).toBe(result.mimeType);
  expect(result.filename).toMatch(/\.(mp4|webm)$/);
  expect(result.durationMs).toBe(3_000);
  expect(result.frameCount).toBeGreaterThan(20);
  expect(result.signatureValid).toBe(true);
  await info.attach('nagranie-chromium-3s', {
    body: Buffer.from(JSON.stringify(result, null, 2), 'utf8'),
    contentType: 'application/json',
  });
});
