// Node wybiera repo/firebase.json przed repo/firebase/ przy require(<ścieżka do katalogu>).
// Dla odkrywania funkcji generujemy manifest, dla lokalnego wykonania ignorowaną nakładkę ESM.
const { existsSync } = require('node:fs');
const { writeFile } = require('node:fs/promises');
const { resolve, join } = require('node:path');
const { loadStack } = require('../node_modules/firebase-functions/lib/runtime/loader.js');
const { stackToWire } = require('../node_modules/firebase-functions/lib/runtime/manifest.js');

async function generateManifest() {
  const source = resolve(__dirname, '..');
  const stack = await loadStack(join(source, 'index.js'));
  for (const name of ['startRun', 'submitRun', 'cleanupExpiredRuns']) {
    if (!stack.endpoints[name]) throw new Error('Brakuje funkcji Firebase: ' + name);
  }
  await writeFile(join(source, 'functions.yaml'), JSON.stringify(stackToWire(stack), null, 2) + '\n');

  // Root ma "type": "module", dlatego nakładka jest w ESM.
  // W Cloud Build (bez sąsiadującego firebase.json) nie tworzymy plików poza katalogiem funkcji.
  const parent = resolve(source, '..');
  if (existsSync(join(parent, 'firebase.json'))) {
    await writeFile(join(parent, 'firebase.js'),
      "// Generowany plik lokalny: obejście kolizji firebase.json z katalogiem firebase/.\n" +
      "import backend from './firebase/index.js';\n" +
      "export const startRun = backend.startRun;\n" +
      "export const submitRun = backend.submitRun;\n" +
      "export const cleanupExpiredRuns = backend.cleanupExpiredRuns;\n",
    );
    const entry = require(join(parent, 'firebase'));
    for (const name of ['startRun', 'submitRun', 'cleanupExpiredRuns']) {
      if (typeof entry[name] !== 'function' || !entry[name].__endpoint) {
        throw new Error('Niepoprawna lokalna nakładka Firebase: ' + name);
      }
    }
  }
  console.log('Manifest Firebase: ' + Object.keys(stack.endpoints).join(', '));
}

generateManifest().catch((error) => {
  console.error('Nie udało się przygotować funkcji Firebase:', error);
  process.exitCode = 1;
});
