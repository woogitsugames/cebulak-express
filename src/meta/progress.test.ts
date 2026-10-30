import { describe, expect, it } from 'vitest';
import { makeRoute } from '../core/route';
import {
  MEDAL_IDS, POSTCARDS, PROGRESS_STORAGE_KEY, applyRun, emptyProgress,
  loadProgress, normalizeProgress, saveProgress, summarizeRun,
  type ProgressStorage, type RunSummary,
} from './progress';

function run(patch: Partial<RunSummary> = {}): RunSummary {
  return {
    km: 180, arrived: false, jars: 0, parcels: 0,
    countrySequence: ['BE', 'DE'], cityIds: ['antwerpia', 'akwizgran', 'hanower'],
    ...patch,
  };
}

describe('album pocztówek', () => {
  it('ma katalog 50+ unikatowych miast z tras, startów i polskich met', () => {
    expect(POSTCARDS.length).toBeGreaterThanOrEqual(50);
    expect(new Set(POSTCARDS.map((item) => item.id)).size).toBe(POSTCARDS.length);
    expect(POSTCARDS.find((item) => item.id === 'hanower')?.country).toBe('DE');
    expect(POSTCARDS.find((item) => item.id === 'rzeszow')?.country).toBe('PL');
  });

  it('odkrywa tylko nowe, znane miasta i nie modyfikuje wejścia', () => {
    const before = emptyProgress();
    Object.freeze(before.medals);
    Object.freeze(before.postcards);
    Object.freeze(before.stats);
    Object.freeze(before);
    const first = applyRun(before, run({ cityIds: ['hanower', 'hanower', 'nie-istnieje'] }));
    expect(first.newPostcards.map((card) => card.id)).toEqual(['hanower']);
    expect(first.progress.postcards).toEqual(['hanower']);
    expect(first.progress.stats.runs).toBe(1);
    const again = applyRun(first.progress, run({ cityIds: ['hanower'] }));
    expect(again.newPostcards).toEqual([]);
    expect(again.progress.stats.runs).toBe(2);
  });

  it('uwzględnia start, miasta na trasie i metę tylko po dojeździe', () => {
    const route = makeRoute('BE', 'antwerpia', 'rzeszow');
    const game = { route, km: route.totalKm, jars: 2, parcels: 3, phase: 'arrived' as const };
    const summary = summarizeRun(game);
    expect(summary.cityIds).toContain('antwerpia');
    expect(summary.cityIds).toContain('rzeszow');
    expect(summary.cityIds).not.toContain('dom-rzeszow');
    expect(summary.countrySequence).toContain('PL');
    expect(summary.arrived).toBe(true);
    const failed = summarizeRun({ ...game, phase: 'over' });
    expect(failed.cityIds).not.toContain('rzeszow');
  });
});

describe('medale i statystyki', () => {
  it('rozlicza kraje, granice, kilometry, znajdźki oraz medal Europejczyk', () => {
    const first = applyRun(emptyProgress(), run());
    expect(first.newMedals).toContain('first-border');
    expect(first.newMedals).toContain('first-run');
    expect(first.newMedals).not.toContain('european');
    const second = applyRun(first.progress, run({ countrySequence: ['NL', 'DE', 'PL'], km: 1000 }));
    expect(second.progress.stats.totalKm).toBe(1180);
    expect(second.progress.stats.borderCrossings).toBe(3);
    expect(second.progress.countries).toEqual(['BE', 'DE', 'NL', 'PL']);
    expect(second.newMedals).toContain('european');
    expect(second.newMedals).toContain('thousand-km');
    expect(second.newMedals).not.toContain('first-run');
  });

  it('wymaga 10 słoików w jednym przejeździe, nie sumy', () => {
    const first = applyRun(emptyProgress(), run({ jars: 6 }));
    const second = applyRun(first.progress, run({ jars: 6 }));
    expect(second.progress.stats.jars).toBe(12);
    expect(second.progress.stats.bestJarsInRun).toBe(6);
    expect(second.newMedals).not.toContain('ten-jars-run');
    const third = applyRun(second.progress, run({ jars: 10 }));
    expect(third.newMedals).toContain('ten-jars-run');
  });

  it('medal sezonowy nadaje tylko za zimowy dojazd', () => {
    const failed = applyRun(emptyProgress(), run({ winter: true }));
    expect(failed.newMedals).not.toContain('winter-arrival');
    const regular = applyRun(failed.progress, run({ arrived: true }));
    expect(regular.newMedals).toContain('first-arrival');
    expect(regular.newMedals).not.toContain('winter-arrival');
    const seasonal = applyRun(regular.progress, run({ arrived: true, winter: true }));
    expect(seasonal.newMedals).toContain('winter-arrival');
    expect(seasonal.progress.stats.winterArrivals).toBe(1);
  });

  it('przyznaje 15 medali bez zakupów i prawidłowo liczy kolekcję', () => {
    expect(MEDAL_IDS.length).toBe(15);
    const full = applyRun(emptyProgress(), run({
      km: 10_000, arrived: true, jars: 50, parcels: 10, winter: true,
      countrySequence: ['BE', 'NL', 'DE', 'FR', 'PL'],
      cityIds: POSTCARDS.slice(0, 30).map((card) => card.id),
    }));
    expect(full.progress.postcards).toHaveLength(30);
    expect(full.newMedals).toContain('thirty-postcards');
    expect(full.newMedals).toContain('five-countries');
    expect(full.newMedals).not.toContain('five-arrivals');
    let progress = full.progress;
    for (let i = 0; i < 4; i++) progress = applyRun(progress, run({ arrived: true })).progress;
    expect(progress.medals).toHaveLength(15);
  });

  it('nie dopuszcza wartości ujemnych i niefinitywnych', () => {
    const change = applyRun(emptyProgress(), run({ km: Infinity, jars: -2, parcels: NaN }));
    expect(change.progress.stats.totalKm).toBe(0);
    expect(change.progress.stats.jars).toBe(0);
    expect(change.progress.stats.parcels).toBe(0);
  });
});

describe('trwały zapis', () => {
  it('odczytuje i zapisuje przez storage platformy', async () => {
    const data = new Map<string, string>();
    const storage: ProgressStorage = {
      get: async (key) => data.get(key) ?? null,
      set: async (key, value) => { data.set(key, value); },
    };
    const progress = applyRun(emptyProgress(), run()).progress;
    await saveProgress(progress, storage);
    expect(data.has(PROGRESS_STORAGE_KEY)).toBe(true);
    expect(await loadProgress(storage)).toEqual(progress);
  });

  it('odrzuca uszkodzone dane i nieznane identyfikatory', async () => {
    const storage: ProgressStorage = { get: async () => '{oops', set: async () => {} };
    expect(await loadProgress(storage)).toEqual(emptyProgress());
    const sanitized = normalizeProgress({
      medals: ['first-run', 'first-run', 'nie-ma'],
      postcards: ['hanower', 'spoza-katalogu', 'hanower'],
      countries: ['BE', 'XX'],
      stats: { runs: -4, totalKm: '100', arrivals: Infinity },
    });
    expect(sanitized.medals).toEqual(['first-run']);
    expect(sanitized.postcards).toEqual(['hanower']);
    expect(sanitized.countries).toEqual(['BE']);
    expect(sanitized.stats.runs).toBe(0);
    expect(sanitized.stats.totalKm).toBe(0);
  });
});
