import { describe, expect, it } from 'vitest';
import { HOME_COUNTRIES, PL_CITIES, START_CITIES, countryAt, haversineKm, makeRoute } from '../src/core/route';

describe('trasy i dystans', () => {
  it('haversine: Warszawa–Kraków ok. 250 km w linii prostej', () => {
    const waw = PL_CITIES.find((c) => c.id === 'warszawa')!;
    const krk = PL_CITIES.find((c) => c.id === 'krakow')!;
    const d = haversineKm(waw, krk);
    expect(d).toBeGreaterThan(240);
    expect(d).toBeLessThan(260);
  });

  it('Antwerpia → Rzeszów: rozsądny dystans drogowy', () => {
    const r = makeRoute('BE', 'antwerpia', 'rzeszow');
    expect(r.totalKm).toBeGreaterThan(1200);
    expect(r.totalKm).toBeLessThan(1600);
    expect(r.totalKm % 10).toBe(0);
  });

  it('każda trasa z każdego miasta do każdego celu jest poprawna', () => {
    for (const home of HOME_COUNTRIES) {
      expect(START_CITIES[home].length).toBeGreaterThanOrEqual(3);
      for (const from of START_CITIES[home]) {
        for (const to of PL_CITIES) {
          const r = makeRoute(home, from.id, to.id);
          const wps = r.waypoints;
          expect(wps[0].km).toBe(0);
          expect(wps.at(-1)!.id).toBe(`dom-${to.id}`);
          expect(wps.at(-1)!.km).toBe(r.totalKm);
          for (let i = 1; i < wps.length; i++) expect(wps[i].km).toBeGreaterThanOrEqual(wps[i - 1].km);
          expect(wps.some((w) => w.kind === 'rest' && w.country === 'PL')).toBe(true);
          expect(r.totalKm).toBeGreaterThan(150);
          expect(r.totalKm).toBeLessThan(3200);
        }
      }
    }
  });

  it('id miast są unikalne', () => {
    const ids = PL_CITIES.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('Bruksela → Siemiatycze: przez Kolonię, Hanower, Berlin, Świecko', () => {
    const r = makeRoute('BE', 'bruksela', 'siemiatycze');
    const ids = r.waypoints.map((w) => w.id);
    for (const id of ['kolonia', 'dusseldorf', 'hanower', 'berlin', 'granica-swiecko', 'stacja-swiecko']) expect(ids).toContain(id);
    expect(ids).toContain('warszawa');
    expect(ids.at(-1)).toBe('dom-siemiatycze');
  });

  it('Monachium dołącza do trasy przez Norymbergę i Drezno', () => {
    const r = makeRoute('DE', 'monachium', 'wroclaw');
    const ids = r.waypoints.map((w) => w.id);
    expect(ids[0]).toBe('monachium');
    expect(ids).toContain('norymberga');
    expect(ids).toContain('granica-jedrzychowice');
  });

  it('countryAt przechodzi przez kraje po kolei', () => {
    const r = makeRoute('BE', 'bruksela', 'warszawa');
    expect(countryAt(r, 0)).toBe('BE');
    expect(countryAt(r, 300)).toBe('DE');
    expect(countryAt(r, r.totalKm - 50)).toBe('PL');
    expect(countryAt(r, r.totalKm + 100)).toBe('PL');
  });

  it('nieznane miasto rzuca błąd', () => {
    expect(() => makeRoute('BE', 'xxx', 'rzeszow')).toThrow();
  });
});


describe('korekta korytarzy i realnych kilometrów [42]', () => {
  // ADAC Maps, odczyt 30.10.2026:
  // Berlin–Szczecin: https://maps.adac.de/routenplaner/route-von-berlin-nach-stettin (150 km)
  // Berlin–Wrocław: https://maps.adac.de/routenplaner/route-von-berlin-nach-breslau (344 km)
  // Berlin–Poznań: https://maps.adac.de/routenplaner/route-von-berlin-nach-posen (274 km)
  // Berlin–Gdańsk: https://maps.adac.de/routenplaner/route-von-berlin-nach-danzig (510 km)
  // Berlin–Kraków: https://maps.adac.de/routenplaner/route-von-berlin-nach-krakau (597 km)
  // Monachium–Kraków: https://maps.adac.de/routenplaner/route-von-muenchen-nach-krakau (912 km, przez Czechy)
  // Monachium–Wrocław: https://autotrasa.pl/trasy/wroclaw-monachium/ (719 km, przez Niemcy)
  // Monachium–Katowice: https://autotrasa.pl/trasy/katowice-monachium/ (836 km, przez Czechy)
  // Monachium–Rzeszów: https://autotrasa.pl/trasy/rzeszow-monachium/ (1079 km, przez Czechy)
  const references = [
    { from: 'berlin', to: 'szczecin', realKm: 150, border: 'granica-kolbaskowo' },
    { from: 'berlin', to: 'wroclaw', realKm: 344, border: 'granica-olszyna' },
    { from: 'berlin', to: 'poznan', realKm: 274, border: 'granica-swiecko' },
    { from: 'berlin', to: 'gdansk', realKm: 510, border: 'granica-kolbaskowo' },
    { from: 'berlin', to: 'krakow', realKm: 597, border: 'granica-olszyna' },
    { from: 'monachium', to: 'wroclaw', realKm: 719, border: 'granica-jedrzychowice' },
    { from: 'monachium', to: 'krakow', realKm: 912, border: 'granica-jedrzychowice' },
    { from: 'monachium', to: 'katowice', realKm: 836, border: 'granica-jedrzychowice' },
    { from: 'monachium', to: 'rzeszow', realKm: 1079, border: 'granica-jedrzychowice' },
  ] as const;

  for (const { from, to, realKm, border } of references) {
    it(`${from} → ${to}: odchylenie najwyżej 10%, właściwa granica i stacja`, () => {
      const route = makeRoute('DE', from, to);
      const ids = route.waypoints.map((w) => w.id);
      expect(Math.abs(route.totalKm - realKm) / realKm).toBeLessThanOrEqual(0.10);
      expect(ids).toContain(border);
      expect(route.waypoints.filter((w) => w.kind === 'rest')).toHaveLength(1);
      expect(route.waypoints.filter((w) => w.kind === 'border' && w.country === 'PL')).toHaveLength(1);
    });
  }

  it('Berlin jest węzłem także dla tras BE, NL, UK, DK i z Hamburga', () => {
    const cases = [
      { home: 'BE', from: 'bruksela', to: 'szczecin', border: 'granica-kolbaskowo' },
      { home: 'NL', from: 'amsterdam', to: 'wroclaw', border: 'granica-olszyna' },
      { home: 'UK', from: 'londyn', to: 'gdansk', border: 'granica-kolbaskowo' },
      { home: 'DK', from: 'kopenhaga', to: 'krakow', border: 'granica-olszyna' },
      { home: 'DE', from: 'hamburg', to: 'poznan', border: 'granica-swiecko' },
    ] as const;
    for (const { home, from, to, border } of cases) {
      const ids = makeRoute(home, from, to).waypoints.map((w) => w.id);
      expect(ids, `${home} ${from} → ${to}`).toContain('berlin');
      expect(ids, `${home} ${from} → ${to}`).toContain(border);
    }
  });

  it('Monachium omija Jenę, a CH ma ok. 180 km Jena–Drezno (A4)', () => {
    const munich = makeRoute('DE', 'monachium', 'wroclaw').waypoints;
    expect(munich.map((w) => w.id)).toContain('chemnitz');
    expect(munich.map((w) => w.id)).not.toContain('jena');
    const swiss = makeRoute('CH', 'zurych', 'wroclaw').waypoints;
    expect(swiss.find((w) => w.id === 'drezno')!.km - swiss.find((w) => w.id === 'jena')!.km).toBe(180);
  });

  it('FR: Mannheim–Frankfurt nad Menem odpowiada 83 km według ADAC', () => {
    // https://maps.adac.de/routenplaner/route-von-mannheim-nach-frankfurt (30.10.2026)
    const waypoints = makeRoute('FR', 'paryz', 'wroclaw').waypoints;
    expect(waypoints.find((w) => w.id === 'frankfurt-main')!.km - waypoints.find((w) => w.id === 'mannheim')!.km).toBe(83);
  });
});
