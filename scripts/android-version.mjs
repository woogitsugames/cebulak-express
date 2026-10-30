import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const MAX_PLAY_VERSION_CODE = 2_100_000_000;

// Używamy MM mm pp bbbb: 0..20 major, 0..99 minor/patch, 0..9999 build.
// Zmiana package.json zawsze daje wyższy code niż wcześniejsze buildy wersji.
export function calculateAndroidVersionCode(version, buildNumber) {
  const match = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/.exec(version);
  if (!match) {
    throw new Error('package.json version musi być stabilnym SemVer major.minor.patch (bez sufiksu).');
  }

  const [major, minor, patch] = match.slice(1).map(Number);
  const run = Number(buildNumber);
  if (![major, minor, patch, run].every(Number.isSafeInteger) ||
      minor > 99 || patch > 99 || major > 20 ||
      run < 0 || run > 9999) {
    throw new Error('Zakres: major 0..20, minor/patch 0..99, numer builda 0..9999.');
  }

  const code = major * 100_000_000 + minor * 1_000_000 + patch * 10_000 + run;
  if (code < 1 || code > MAX_PLAY_VERSION_CODE) {
    throw new Error('Nieprawidłowy Android versionCode: ' + code + '.');
  }
  return code;
}

export function assertMatchingReleaseTag(version, refType, refName) {
  if (refType === 'tag' && refName !== 'v' + version) {
    throw new Error('Tag ' + refName + ' nie odpowiada package.json version=' + version);
  }
}

export async function main() {
  const packageJson = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));
  const versionName = packageJson.version;
  const buildNumber = process.argv[2] ?? process.env.GITHUB_RUN_NUMBER ?? '0';
  assertMatchingReleaseTag(versionName, process.env.GITHUB_REF_TYPE, process.env.GITHUB_REF_NAME);
  const versionCode = calculateAndroidVersionCode(versionName, buildNumber);
  await writeFile(
    new URL('../android/version.properties', import.meta.url),
    '# Wygenerowane przez scripts/android-version.mjs - NIE COMMITOWAC\n' +
      'versionCode=' + versionCode + '\nversionName=' + versionName + '\n',
    { mode: 0o600 },
  );
  process.stdout.write('Android: versionName=' + versionName + ', versionCode=' + versionCode + '\n');
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error('::error::' + error.message);
    process.exitCode = 1;
  });
}
