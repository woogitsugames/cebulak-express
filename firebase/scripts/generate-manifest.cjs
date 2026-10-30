// Node wybiera repo/firebase.json przed repo/firebase/ przy require(<ścieżka do katalogu>).
// Wymagane są oba, dlatego manifest powstaje z jawnego pliku index.js.
const { writeFile } = require('node:fs/promises');
const { resolve, join } = require('node:path');
const { loadStack } = require('../node_modules/firebase-functions/lib/runtime/loader.js');
const { stackToWire } = require('../node_modules/firebase-functions/lib/runtime/manifest.js');

async function generateManifest() {
  const source = resolve(__dirname, '..');
  const stack = await loadStack(join(source, 'index.js'));
  for (const name of ['startRun', 'submitRun', 'cleanupExpiredRuns']) {
    if (!stack.endpoints[name]) {
      throw new Error('Brakuje funkcji Firebase w manifeście: ' + name);
    }
  }
  await writeFile(join(source, 'functions.yaml'), JSON.stringify(stackToWire(stack), null, 2) + '\n');
  console.log('Manifest Firebase: ' + Object.keys(stack.endpoints).join(', '));
}

generateManifest().catch((error) => {
  console.error('Nie udało się wygenerować manifestu Firebase:', error);
  process.exitCode = 1;
});
