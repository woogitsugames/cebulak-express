// Test rzeczywistej instalacji i odświeżenia gry offline w Chromium, bez bibliotek.
// Użycie: npm run build && npm run preview (drugi terminal), node scripts/pwa-smoke.mjs
import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const targetUrl = process.argv[2] ?? 'http://127.0.0.1:4173/';
const browserBinary = process.env.CHROME_PATH ?? 'chromium';
const profileDir = mkdtempSync(join(tmpdir(), 'ce-pwa-'));
const chrome = spawn(browserBinary, [
  '--headless=new', '--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage',
  '--remote-allow-origins=*', '--no-first-run', '--no-default-browser-check',
  '--remote-debugging-port=0', `--user-data-dir=${profileDir}`, 'about:blank',
], { stdio: 'ignore' });

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let socket;
let nextId = 1;
const pending = new Map();

async function command(method, params = {}) {
  const id = nextId++;
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });
}

async function evaluate(expression) {
  const response = await command('Runtime.evaluate', {
    expression, awaitPromise: true, returnByValue: true,
  });
  if (response.exceptionDetails) throw new Error(`Błąd przeglądarki: ${JSON.stringify(response.exceptionDetails)}`);
  return response.result.value;
}

async function checkPage(expectedQuery) {
  for (let i = 0; i < 60; i++) {
    try {
      const result = await evaluate(`({
        ready: document.readyState,
        query: location.search,
        title: document.title,
        stage: Boolean(document.querySelector('#stage')),
        controlled: Boolean(navigator.serviceWorker.controller),
      })`);
      if (result.ready === 'complete' && result.query.includes(expectedQuery) && result.stage && result.controlled) {
        return result;
      }
    } catch {
      // W trakcie nawigacji kontekst wykonania może zostać zniszczony.
    }
    await sleep(150);
  }
  throw new Error(`Nie udało się otworzyć kontrolowanej przez SW strony (${expectedQuery}).`);
}

try {
  let port;
  for (let i = 0; i < 100; i++) {
    const path = join(profileDir, 'DevToolsActivePort');
    if (existsSync(path)) {
      port = readFileSync(path, 'utf8').split('\n')[0];
      break;
    }
    if (chrome.exitCode !== null) throw new Error('Chromium zakończył się przed startem.');
    await sleep(100);
  }
  if (!port) throw new Error('Brak portu DevTools (Chromium).');

  const pages = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  const page = pages.find((item) => item.type === 'page');
  if (!page) throw new Error('Brak karty Chromium.');
  socket = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true });
    socket.addEventListener('error', reject, { once: true });
  });
  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    if (!message.id) return;
    const task = pending.get(message.id);
    if (!task) return;
    pending.delete(message.id);
    if (message.error) task.reject(new Error(message.error.message));
    else task.resolve(message.result);
  });
  await command('Page.enable');
  await command('Runtime.enable');
  await command('Network.enable');
  await command('Page.navigate', { url: `${targetUrl}?initial=1` });
  let initialReady = false;
  for (let i = 0; i < 60; i++) {
    try {
      const state = await evaluate('({ready:document.readyState,query:location.search})');
      if (state.ready === 'complete' && state.query.includes('initial=1')) { initialReady = true; break; }
    } catch { /* zmiana kontekstu */ }
    await sleep(150);
  }

  if (!initialReady) {
    const diag = await evaluate('({href:location.href,ready:document.readyState,sw:typeof navigator.serviceWorker,body:document.body?.textContent?.slice(0,150)})');
    throw new Error(`Pierwsza strona nie załadowała się: ${JSON.stringify(diag)}`);
  }

  const registration = await evaluate(`(async () => {
    const result = await navigator.serviceWorker.register('./sw.js', { updateViaCache: 'none' });
    await navigator.serviceWorker.ready;
    return { scope: result.scope, active: Boolean(result.active) };
  })()`);
  if (!registration.active) throw new Error('Service worker nie aktywował się.');

  await command('Page.navigate', { url: `${targetUrl}?controlled=1` });
  await checkPage('controlled=1');
  await command('Network.emulateNetworkConditions', {
    offline: true, latency: 0, downloadThroughput: 0, uploadThroughput: 0,
  });
  await command('Page.navigate', { url: `${targetUrl}?offline=1` });
  const result = await checkPage('offline=1');
  const staticAsset = await evaluate(`(async () => {
    const r = await fetch('./assets/brand/icon-192.png');
    return { ok: r.ok, type: r.headers.get('content-type') };
  })()`);
  if (!staticAsset.ok) throw new Error('Ikona nie jest dostępna offline.');
  console.log(`PWA OK: ${result.title}, offline po instalacji, assety w cache, scope ${registration.scope}`);
} catch (error) {
  console.error('PWA FAIL:', error);
  process.exitCode = 1;
} finally {
  socket?.close();
  chrome.kill('SIGTERM');
  for (let i = 0; i < 20 && chrome.exitCode === null; i++) await sleep(100);
  if (chrome.exitCode === null) chrome.kill('SIGKILL');
  rmSync(profileDir, { recursive: true, force: true });
}
