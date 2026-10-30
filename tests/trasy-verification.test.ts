import { describe, expect, it } from 'vitest';
import { HOME_COUNTRIES, PL_CITIES, START_CITIES, makeRoute, type HomeCountry } from '../src/core/route';

describe('weryfikacja przebiegu trasy (zlecenie 40)', () => {
  it('każda kombinacja: >= 8 km pomiędzy punktami (oprócz granica–stacja)', () => {
    for (const home of HOME_COUNTRIES) {
      for (const from of START_CITIES[home]) {
        for (const to of PL_CITIES) {
          const route = makeRoute(home, from.id, to.id);
          for (let i = 1; i < route.waypoints.length; i++) {
            const previous = route.waypoints[i - 1];
            const current = route.waypoints[i];
            if (previous.kind === 'border' && current.kind === 'rest') continue;
            expect(
              current.km - previous.km,
              `${home} ${from.id} → ${to.id}: ${previous.id} → ${current.id}`,
            ).toBeGreaterThanOrEqual(8);
          }
        }
      }
    }
  });

  it('maksymalnie dwa polskie miasta po drodze, w odstępach >= 60 km', () => {
    for (const home of HOME_COUNTRIES) {
      for (const from of START_CITIES[home]) {
        for (const to of PL_CITIES) {
          const route = makeRoute(home, from.id, to.id);
          const restIndex = route.waypoints.findIndex((point) => point.kind === 'rest');
          const transit = route.waypoints.slice(restIndex + 1, -1);
          const rest = route.waypoints[restIndex];
          expect(restIndex).toBeGreaterThanOrEqual(0);
          expect(transit.length).toBeLessThanOrEqual(2);
          for (let i = 0; i < transit.length; i++) {
            expect(transit[i].country).toBe('PL');
            expect(transit[i].id).not.toBe(to.id);
            expect(
              transit[i].km - (i > 0 ? transit[i - 1].km : rest.km),
              `${home} ${from.id} → ${to.id}: odstęp ${transit[i].id}`,
            ).toBeGreaterThanOrEqual(60);
          }
          const lastKm = transit.length > 0 ? transit[transit.length - 1].km : rest.km;
          if (transit.length) expect(route.totalKm - lastKm).toBeGreaterThanOrEqual(60);
        }
      }
    }
  });

  it('Rzeszów z zachodu: A4 przez Wrocław i Kraków, bez Poznania i Legnicy', () => {
    const route = makeRoute('BE', 'bruksela', 'rzeszow');
    const ids = route.waypoints.map((point) => point.id);
    expect(ids).toContain('wroclaw');
    expect(ids).toContain('krakow');
    expect(ids).not.toContain('poznan');
    expect(ids).not.toContain('legnica');
  });

  it('Podlasie: A2 przez Poznań i Warszawę', () => {
    const route = makeRoute('BE', 'bruksela', 'siemiatycze');
    const transit = route.waypoints.slice(route.waypoints.findIndex((point) => point.kind === 'rest') + 1, -1);
    expect(transit.map((point) => point.id)).toEqual(['poznan', 'warszawa']);
  });

  it('Pomorze od Świnoujścia: wybrzeżem przez Słupsk, nie przez Szczecin', () => {
    const route = makeRoute('NO', 'oslo', 'gdansk');
    const transit = route.waypoints.slice(route.waypoints.findIndex((point) => point.kind === 'rest') + 1, -1);
    expect(transit.map((point) => point.id)).toEqual(['slupsk']);
  });

  /**
   * Dystanse niezależne od implementacji zapisane jako stałe, stan weryfikacji:
   * 30.10.2026. Uwaga: przy promach punkty opisują trasę mieszaną, nie
   * wyłącznie drogowy przejazd przez mosty (szczegóły w docs/trasy-weryfikacja.md).
   */
  const samples: ReadonlyArray<{
    home: HomeCountry;
    from: string;
    to: string;
    referenceKm: number;
    source: string;
  }> = [
    { home: 'BE', from: 'bruksela', to: 'warszawa', referenceKm: 1286.5, source: 'https://www.rome2rio.com/s/Brussels/Warsaw' },
    { home: 'NL', from: 'amsterdam', to: 'warszawa', referenceKm: 1188.9, source: 'https://www.rome2rio.com/s/Amsterdam/Warsaw' },
    { home: 'DE', from: 'kolonia', to: 'warszawa', referenceKm: 1113, source: 'https://maps.adac.de/routenplaner/route-von-koeln-nach-warschau' },
    { home: 'DE', from: 'hamburg', to: 'warszawa', referenceKm: 841.1, source: 'https://www.rome2rio.com/s/Hamburg/Warsaw' },
    { home: 'UK', from: 'londyn', to: 'warszawa', referenceKm: 1636, source: 'https://autotrasa.pl/trasy/warszawa-londyn/' },
    { home: 'FR', from: 'paryz', to: 'rzeszow', referenceKm: 1664.1, source: 'https://www.rome2rio.com/s/Paris/Rzesz%C3%B3w' },
    { home: 'FR', from: 'paryz', to: 'wroclaw', referenceKm: 1280.6, source: 'https://www.rome2rio.com/s/Paris/Wroc%C5%82aw' },
    // Gra prowadzi trasę przez Niemcy (A81/A9/A4/A4 PL), a nie przez Czechy jak Rome2rio (920,7 km):
    // Zurych–Jena ok. 590 km (docs/trasy-weryfikacja.md) + Jena–Drezno ok. 180 + Drezno–Wrocław ok. 265.
    { home: 'CH', from: 'zurych', to: 'wroclaw', referenceKm: 1035, source: 'suma odcinków trasy przez Niemcy, docs/trasy-weryfikacja.md' },
    // Złożona trasa Oslo–Ystad (612,6) + prom (171,2) + Świnoujście–Gdańsk (348).
    { home: 'NO', from: 'oslo', to: 'gdansk', referenceKm: 1131.8, source: 'https://www.rome2rio.com/s/Norway/Ystad' },
    // Kopenhaga–Warszawa przez mosty: inna przeprawa niż wzorzec przez Rødby.
    { home: 'DK', from: 'kopenhaga', to: 'warszawa', referenceKm: 1292, source: 'https://www.rome2rio.com/s/Copenhagen/Warsaw' },
  ];

  for (const sample of samples) {
    it(`${sample.home} ${sample.from} → ${sample.to}: wynik ±10% względem drogowego wzorca`, () => {
      const route = makeRoute(sample.home, sample.from, sample.to);
      const deviation = Math.abs(route.totalKm - sample.referenceKm) / sample.referenceKm;
      expect(deviation, sample.source).toBeLessThanOrEqual(0.1);
    });
  }
});
