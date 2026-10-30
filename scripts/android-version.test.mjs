import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateAndroidVersionCode, assertMatchingReleaseTag } from './android-version.mjs';

test('kod builda rośnie w obrębie jednej wersji', () => {
  assert.equal(calculateAndroidVersionCode('0.1.0', 1), 1_000_001);
  assert.equal(calculateAndroidVersionCode('0.1.0', 2), 1_000_002);
  assert.equal(calculateAndroidVersionCode('1.2.3', 42), 102_030_042);
});

test('zmiana patch/minor/major zawsze zwiększa code', () => {
  assert.ok(calculateAndroidVersionCode('0.1.1', 1) > calculateAndroidVersionCode('0.1.0', 9999));
  assert.ok(calculateAndroidVersionCode('0.2.0', 1) > calculateAndroidVersionCode('0.1.99', 9999));
  assert.ok(calculateAndroidVersionCode('1.0.0', 1) > calculateAndroidVersionCode('0.99.99', 9999));
});

test('nieprawidłowa wersja, numer i przekroczenie limitu Play są odrzucane', () => {
  for (const version of ['1.2', 'v1.2.3', '1.2.3-beta', '1.100.0', '21.0.0']) {
    assert.throws(() => calculateAndroidVersionCode(version, 1));
  }
  for (const build of [-1, 10000, 'abc', 1.2]) {
    assert.throws(() => calculateAndroidVersionCode('0.1.0', build));
  }
  assert.throws(() => calculateAndroidVersionCode('0.0.0', 0));
});

test('tag GitHub musi odpowiadać wersji w package.json', () => {
  assert.doesNotThrow(() => assertMatchingReleaseTag('0.1.0', 'tag', 'v0.1.0'));
  assert.doesNotThrow(() => assertMatchingReleaseTag('0.1.0', 'branch', 'main'));
  assert.throws(() => assertMatchingReleaseTag('0.1.0', 'tag', 'v0.2.0'));
});
