#!/usr/bin/env node
/**
 * Wypisz katalog pocztówek (POSTCARDS z src/meta/progress.ts) jako JSON na stdout.
 * Lista miast nie jest powielana: moduł gry ładuje Vite (ssrLoadModule), więc
 * narzędzia graficzne zawsze widzą ten sam katalog co album w grze.
 */
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

const root = resolve(fileURLToPath(new URL('.', import.meta.url)), '../..');
const server = await createServer({
  root,
  configFile: false,
  logLevel: 'silent',
  server: { middlewareMode: true, hmr: false, watch: null },
  optimizeDeps: { noDiscovery: true, include: [] },
});
try {
  const { POSTCARDS } = await server.ssrLoadModule('/src/meta/progress.ts');
  const list = POSTCARDS.map(({ id, name, country }) => ({ id, name, country }));
  process.stdout.write(JSON.stringify(list, null, 2) + '\n');
} finally {
  await server.close();
}
