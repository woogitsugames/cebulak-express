#!/usr/bin/env node
/**
 * Powtarzalny profil Chromium/Pixel 7: CPU 4x/6x, 30 s autopilota na seed=7.
 * Zależność: @playwright/test (już obecna w package.json).
 *
 * npm run build
 * node tools/perf/run.mjs --app=. --out=perf-after.json
 * node tools/perf/run.mjs --app=/tmp/cebulak-main --out=perf-before.json
 */
import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { chromium, devices } from '@playwright/test';

function optionsFromCli(argv) {
  const values = Object.fromEntries(argv.map((entry) => {
    const match = /^--([a-z-]+)=(.*)$/.exec(entry);
    if (!match) throw new Error('Nieznany argument: ' + entry);
    return [match[1], match[2]];
  }));
  const durationSec = Number(values.duration ?? 30);
  const cpuRates = (values.cpu ?? '4,6').split(',').map(Number);
  const port = Number(values.port ?? 4173);
  if (!(durationSec > 0 && durationSec <= 300) ||
      !(port > 0 && port <= 65535) ||
      cpuRates.some((rate) => ![4, 6].includes(rate))) {
    throw new Error('Dozwolone: --duration=1..300 --cpu=4,6 --port=4173');
  }
  return {
    app: resolve(values.app ?? '.'),
    out: resolve(values.out ?? 'perf-result.json'),
    label: values.label ?? '',
    url: values.url || '',
    port,
    durationSec,
    cpuRates,
  };
}

const sleep = (ms) => new Promise((resolveSleep) => setTimeout(resolveSleep, ms));

async function startPreview(opts) {
  if (opts.url) return { url: opts.url, stop: async () => {} };
  const processName = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  const command = ['run', 'preview', '--', '--host', '127.0.0.1', '--port', String(opts.port), '--strictPort'];
  const child = spawn(processName, command, {
    cwd: opts.app, stdio: ['ignore', 'pipe', 'pipe'],
  });
  let log = '';
  for (const stream of [child.stdout, child.stderr]) {
    stream.setEncoding('utf8');
    stream.on('data', (chunk) => { log = (log + chunk).slice(-4000); });
  }
  const url = 'http://127.0.0.1:' + opts.port;
  try {
    let ready = false;
    for (let i = 0; i < 120; i++) {
      if (child.exitCode !== null) break;
      try {
        const response = await fetch(url, { signal: AbortSignal.timeout(1500) });
        if (response.ok) { ready = true; break; }
      } catch { /* serwer jeszcze nie odpowiada */ }
      await sleep(250);
    }
    if (!ready) throw new Error('Vite preview nie wystartował: ' + log);
    return { url, stop: async () => {
      if (child.exitCode === null) child.kill('SIGTERM');
    } };
  } catch (error) {
    if (child.exitCode === null) child.kill('SIGTERM');
    throw error;
  }
}

function installPageProbe() {
  const imageRefs = [];
  const bitmapRefs = [];
  let decodedHtmlTotal = 0;
  let decodedBitmapTotal = 0;
  const OriginalImage = window.Image;
  window.Image = new Proxy(OriginalImage, {
    construct(target, args, newTarget) {
      const img = Reflect.construct(target, args, newTarget);
      imageRefs.push(new WeakRef(img));
      img.addEventListener('load', () => { decodedHtmlTotal++; });
      return img;
    },
  });
  if (typeof window.createImageBitmap === 'function') {
    const originalCreateBitmap = window.createImageBitmap.bind(window);
    window.createImageBitmap = function (...args) {
      return originalCreateBitmap(...args).then((bitmap) => {
        bitmapRefs.push(new WeakRef(bitmap));
        decodedBitmapTotal++;
        return bitmap;
      });
    };
  }

  const state = {
    active: false, startedAt: null, previous: null, lastAt: null,
    frames: 0, longFrames: 0, deltas: [], heapPeak: null, heapStart: null,
    frameWindows: [], windowStart: null, windowFrames: 0,
  };
  const usedHeap = () => {
    const mem = window.performance.memory;
    return mem && Number.isFinite(mem.usedJSHeapSize) ? mem.usedJSHeapSize : null;
  };
  const sampleHeap = () => {
    if (!state.active) return;
    const heap = usedHeap();
    if (heap !== null) state.heapPeak = Math.max(heap, state.heapPeak ?? 0);
  };
  setInterval(sampleHeap, 1000);

  function raf(now) {
    if (state.active) {
      if (state.previous !== null) {
        const delta = now - state.previous;
        if (delta > 0 && delta < 2000) {
          state.deltas.push(delta);
          state.frames++;
          if (delta > 33) state.longFrames++;
        }
      }
      if (state.windowStart === null) state.windowStart = now;
      else {
        state.windowFrames++;
        const elapsed = now - state.windowStart;
        if (elapsed >= 1000) {
          state.frameWindows.push(state.windowFrames * 1000 / elapsed);
          state.windowStart = now;
          state.windowFrames = 0;
        }
      }
      state.previous = now;
      state.lastAt = now;
    }
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  function countDecoded() {
    let html = 0, bitmaps = 0, pixels = 0;
    for (const weak of imageRefs) {
      const img = weak.deref();
      if (img?.complete && img.naturalWidth > 0 && img.naturalHeight > 0) {
        html++;
        pixels += img.naturalWidth * img.naturalHeight;
      }
    }
    for (const weak of bitmapRefs) {
      const bitmap = weak.deref();
      if (bitmap && bitmap.width > 0 && bitmap.height > 0) {
        bitmaps++;
        pixels += bitmap.width * bitmap.height;
      }
    }
    return {
      liveHtmlImages: html, liveImageBitmaps: bitmaps,
      liveDecodedImages: html + bitmaps,
      decodedEver: decodedHtmlTotal + decodedBitmapTotal,
      estimatedRgbaMiB: Number((pixels * 4 / 1048576).toFixed(2)),
    };
  }

  window.__cePerf = {
    start() {
      state.active = true;
      state.startedAt = performance.now();
      state.heapStart = usedHeap();
      sampleHeap();
      window.__ceAutopilot = setInterval(() => {
        const over = document.querySelector('#over');
        if (over && !over.hidden) {
          document.querySelector('#btn-again')?.click();
          return;
        }
        const menu = document.querySelector('#menu');
        const hud = document.querySelector('#hud');
        if (menu?.hidden && hud && !hud.hidden) {
          window.dispatchEvent(new KeyboardEvent('keydown', {
            code: 'Space', key: ' ', bubbles: true,
          }));
        }
      }, 550);
      window.dispatchEvent(new KeyboardEvent('keydown', {
        code: 'Space', key: ' ', bubbles: true,
      }));
    },
    stop() {
      state.active = false;
      clearInterval(window.__ceAutopilot);
      const frames = state.deltas.slice().sort((a, b) => a - b);
      const elapsed = Math.max(1, (state.lastAt ?? performance.now()) - (state.startedAt ?? performance.now()));
      const p95 = frames.length ? frames[Math.ceil(frames.length * 0.95) - 1] : null;
      return {
        durationMeasuredSec: Number((elapsed / 1000).toFixed(2)),
        frames: state.frames,
        averageFps: Number((state.frames * 1000 / elapsed).toFixed(2)),
        minWindowFps: state.frameWindows.length ? Number(Math.min(...state.frameWindows).toFixed(2)) : null,
        frameP95Ms: p95 === null ? null : Number(p95.toFixed(2)),
        longFramesOver33ms: state.longFrames,
        longFrameRatePct: state.frames ? Number((state.longFrames / state.frames * 100).toFixed(2)) : 0,
        jsHeapAtStartMiB: state.heapStart === null ? null : Number((state.heapStart / 1048576).toFixed(2)),
        jsHeapAtEndMiB: usedHeap() === null ? null : Number((usedHeap() / 1048576).toFixed(2)),
        jsHeapPeakMiB: state.heapPeak === null ? null : Number((state.heapPeak / 1048576).toFixed(2)),
        ...countDecoded(),
      };
    },
  };
}

async function measure(opts, cpuRate, url) {
  const browser = await chromium.launch({
    headless: true,
    args: ['--enable-precise-memory-info', '--disable-background-timer-throttling'],
  });
  try {
    const context = await browser.newContext({
      ...devices['Pixel 7'],
      serviceWorkers: 'block',
    });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    await page.addInitScript(installPageProbe);
    const cdp = await context.newCDPSession(page);
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: cpuRate });
    await page.goto(url + '/?test=1&seed=7', { waitUntil: 'domcontentloaded', timeout: 30_000 });
    await page.locator('#menu').waitFor({ state: 'visible', timeout: 30_000 });
    await page.locator('[data-mode="cozy"]').click();
    await page.locator('#btn-start').click();
    await page.waitForFunction(() => {
      const hud = document.querySelector('#hud');
      return hud && !hud.hidden;
    }, { timeout: 30_000 });
    // 30 s to czas rzeczywisty pomiaru, niezależny od throttlingu.
    await page.evaluate(() => window.__cePerf.start());
    await sleep(opts.durationSec * 1000);
    const result = await page.evaluate(() => window.__cePerf.stop());
    await context.close();
    return { cpuRate, ...result, runtimeErrors: errors };
  } finally {
    await browser.close();
  }
}

async function main() {
  const opts = optionsFromCli(process.argv.slice(2));
  const server = await startPreview(opts);
  try {
    const results = [];
    for (const cpuRate of opts.cpuRates) {
      console.log('Pomiar CPU ' + cpuRate + 'x / ' + opts.durationSec + ' s...');
      results.push(await measure(opts, cpuRate, server.url));
      console.log('FPS: ' + results.at(-1).averageFps +
        ', długie klatki: ' + results.at(-1).longFramesOver33ms +
        ', dekodowane: ' + results.at(-1).liveDecodedImages);
    }
    const report = {
      label: opts.label,
      timestamp: new Date().toISOString(),
      target: 'Chromium / Pixel 7 / Canvas 2D',
      urlParams: '?test=1&seed=7',
      scenario: 'Tryb łagodny, tap co 550 ms, restart po kolizji',
      durationSec: opts.durationSec,
      results,
      notes: [
        'FPS i długie klatki mierzone requestAnimationFrame, nie licznikiem pętli gry.',
        'performance.memory mierzy wyłącznie stertę JS, nie całkowitą pamięć GPU/WebView.',
        'Liczba obrazów to dostępne przez WeakRef zdekodowane HTMLImageElement/ImageBitmap; zależy od GC.',
      ],
    };
    await mkdir(dirname(opts.out), { recursive: true });
    await writeFile(opts.out, JSON.stringify(report, null, 2) + '\n', 'utf8');
    console.log('Zapisano: ' + opts.out);
  } finally {
    await server.stop();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
