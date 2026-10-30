import { describe, expect, it } from 'vitest';
import { RecordingState, isEditorialMode } from '../src/ui/record-state';
import { chooseMimeType, clipSection, portalAddress, portraitCrop } from '../src/ui/record-runtime';

describe('przejścia stanów nagrywania', () => {
  it('przechodzi idle → recording → preview → idle', () => {
    const state = new RecordingState();
    expect(state.phase).toBe('idle');
    expect(state.start()).toBe(true);
    expect(state.phase).toBe('recording');
    expect(state.start()).toBe(false); // blokada podwójnego nagrywania
    expect(state.finish()).toBe(true);
    expect(state.phase).toBe('preview');
    expect(state.start()).toBe(false);
    expect(state.reset()).toBe(true);
    expect(state.phase).toBe('idle');
    expect(state.start()).toBe(true);
  });

  it('po ukryciu strony odrzuca nagranie, nie przechodząc do podglądu', () => {
    const state = new RecordingState();
    expect(state.visibilityChange(true)).toBe(false);
    state.start();
    expect(state.visibilityChange(false)).toBe(false);
    expect(state.phase).toBe('recording');
    expect(state.visibilityChange(true)).toBe(true);
    expect(state.phase).toBe('idle');
    expect(state.finish()).toBe(false);
    expect(state.reset()).toBe(false);
  });

  it('anulowanie nie opuszcza podglądu i działa tylko podczas nagrania', () => {
    const state = new RecordingState();
    expect(state.cancel()).toBe(false);
    state.start();
    expect(state.cancel()).toBe(true);
    expect(state.phase).toBe('idle');
    state.start();
    state.finish();
    expect(state.cancel()).toBe(false);
    expect(state.phase).toBe('preview');
  });
});

describe('parametry rolki', () => {
  it('rozpoznaje tylko redakcja=1, również przy innych parametrach', () => {
    expect(isEditorialMode('?redakcja=1&home=BE')).toBe(true);
    expect(isEditorialMode('?redakcja=0')).toBe(false);
    expect(isEditorialMode('?redakcja=true')).toBe(false);
    expect(isEditorialMode('')).toBe(false);
  });

  it('wydziela planszę końcową w ostatnich 1,5 s 15-sekundowej rolki', () => {
    expect(clipSection(0)).toBe('game');
    expect(clipSection(13_499)).toBe('game');
    expect(clipSection(13_500)).toBe('outro');
    expect(clipSection(14_999)).toBe('outro');
    expect(clipSection(15_000)).toBe('end');
  });

  it('dobiera format MP4 lub WebM do obsługi przeglądarki', () => {
    expect(chooseMimeType((mime) => mime === 'video/mp4', true)).toBe('video/mp4');
    expect(chooseMimeType((mime) => mime === 'video/webm', false)).toBe('video/webm');
    expect(chooseMimeType((mime) => mime === 'video/mp4' || mime === 'video/webm', true)).toBe('video/webm');
    expect(chooseMimeType(() => false, true)).toBeUndefined();
  });

  it('przycina do pionu bez rozciągania i nie akceptuje błędnych wymiarów', () => {
    expect(portraitCrop(1920, 1080)).toEqual({ x: 656.25, y: 0, width: 607.5, height: 1080 });
    expect(portraitCrop(1080, 1920)).toEqual({ x: 0, y: 0, width: 1080, height: 1920 });
    expect(() => portraitCrop(0, 1080)).toThrow();
  });

  it('wyświetla wyłącznie zweryfikowany adres HTTP(S) bez UTM', () => {
    expect(portalAddress('https://www.aktualnosci.be/?utm_source=game')).toBe('aktualnosci.be');
    expect(portalAddress('https://tuwiesz.nl/aktualnosci?utm_x=a')).toBe('tuwiesz.nl/aktualnosci');
    expect(portalAddress('javascript:alert(1)')).toBeUndefined();
    expect(portalAddress('not a url')).toBeUndefined();
    expect(portalAddress(undefined)).toBeUndefined();
  });
});
