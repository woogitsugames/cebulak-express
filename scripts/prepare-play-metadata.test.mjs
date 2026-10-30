import test from 'node:test';
import assert from 'node:assert/strict';
import { extractListingFields, validateScreenshotHeader } from './prepare-play-metadata.mjs';

const fixture = [
  '### Nazwa — 1/30 znaków', '~~~text', 'Próba', '~~~',
  '### Krótki opis — 1/80 znaków', '~~~text', 'Krótki opis testowy', '~~~',
  '### Pełny opis', '~~~text', 'Opis testowy', '~~~',
  '### „Co nowego”', '~~~text', 'Wersja testowa', '~~~',
].join('\n');

test('odczyt pól listingów z nagłówków Markdown', () => {
  const fields = extractListingFields(fixture);
  assert.equal(fields['title.txt'], 'Próba\n');
  assert.equal(fields['short_description.txt'], 'Krótki opis testowy\n');
  assert.equal(fields['full_description.txt'], 'Opis testowy\n');
  assert.equal(fields.changelog, 'Wersja testowa\n');
});

test('nie pozwala pominąć pól ani przekroczyć limitów Play', () => {
  assert.throws(() => extractListingFields(fixture.replace('### Pełny opis', '### Inny opis')));
  assert.throws(() => extractListingFields(fixture.replace('Krótki opis testowy', 'A'.repeat(81))));
});

test('sprawdza wymiary i RGB zrzutów PNG', () => {
  const png = Buffer.alloc(26);
  Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]).copy(png);
  png.write('IHDR', 12, 4, 'ascii');
  png.writeUInt32BE(1080, 16);
  png.writeUInt32BE(1920, 20);
  png[24] = 8;
  png[25] = 2;
  assert.doesNotThrow(() => validateScreenshotHeader(png, 'test.png'));
  png[25] = 6;
  assert.throws(() => validateScreenshotHeader(png, 'test.png'));
});
