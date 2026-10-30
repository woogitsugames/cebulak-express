import { describe, expect, it } from 'vitest';
import { KM_PER_PX, PLAYER, TICK, WORLD } from '../src/core/config';
import { Game, replay } from '../src/core/game';
import { ROUTE, botStep, newGame, playWithBot } from './helpers';

describe('fizyka', () => {
  it('przed pierwszym tapem nic się nie dzieje', () => {
    const g = newGame();
    for (let i = 0; i < 100; i++) g.tick();
    expect(g.phase).toBe('ready');
    expect(g.y).toBe(PLAYER.startY);
    expect(g.distancePx).toBe(0);
  });

  it('tap daje prędkość w górę, potem grawitacja ściąga w dół', () => {
    const g = newGame();
    g.flap();
    g.tick();
    expect(g.vy).toBeLessThan(0);
    expect(g.y).toBeLessThan(PLAYER.startY);
    for (let i = 0; i < 60; i++) g.tick();
    expect(g.vy).toBeGreaterThan(0);
  });

  it('prędkość opadania jest ograniczona', () => {
    const g = newGame();
    g.flap();
    for (let i = 0; i < 300 && g.phase === 'playing'; i++) g.tick();
    expect(g.vy).toBeLessThanOrEqual(PLAYER.maxFallSpeed);
  });

  it('sufit nie zabija, tylko zatrzymuje', () => {
    const g = newGame();
    for (let i = 0; i < 40; i++) {
      g.flap();
      g.tick();
    }
    expect(g.y).toBeGreaterThanOrEqual(PLAYER.hitH / 2);
    expect(g.phase).toBe('playing');
  });

  it('cięższy bagaż = szybsze opadanie', () => {
    const light = newGame();
    const heavy = newGame();
    heavy.weight = 1;
    light.flap();
    heavy.flap();
    for (let i = 0; i < 30; i++) {
      light.tick();
      heavy.tick();
    }
    expect(heavy.vy).toBeGreaterThan(light.vy);
  });

  it('waga zanika z czasem', () => {
    const g = newGame();
    g.weight = 0.5;
    g.flap();
    for (let i = 0; i < 60; i++) {
      g.tick();
      if (i % 20 === 0) g.flap();
    }
    expect(g.weight).toBeLessThan(0.5);
  });
});

describe('kolizje w grze', () => {
  it('bez tapania kombi spada na asfalt i przejazd się kończy', () => {
    const g = newGame();
    g.flap();
    while (g.phase === 'playing') g.tick();
    expect(g.phase).toBe('over');
    expect(g.cause).toBe('ground');
    expect(g.y + PLAYER.hitH / 2).toBeGreaterThanOrEqual(WORLD.groundY - 10);
  });

  it('ciągłe tapanie kończy się na przeszkodzie u góry', () => {
    const g = newGame();
    while (g.phase !== 'over' && g.ticks < 120 * 60) {
      if (g.ticks % 10 === 0) g.flap();
      g.tick();
    }
    expect(g.phase).toBe('over');
    expect(['viaduct', 'sign', 'crane']).toContain(g.cause);
  });

  it('tryb łagodny: 3 życia, po trafieniu chwilowa nietykalność', () => {
    const g = newGame(1, 'cozy');
    expect(g.lives).toBe(3);
    g.flap();
    let hits = 0;
    while (g.phase === 'playing') {
      g.tick();
      for (const e of g.drainEvents()) if (e.type === 'hit') hits++;
    }
    expect(hits).toBeGreaterThanOrEqual(3);
    expect(g.phase).toBe('over');
  });
});

describe('dystans i punktacja', () => {
  it('km rosną z przejechanym dystansem', () => {
    const g = newGame();
    g.flap();
    for (let i = 0; i < 120; i++) {
      g.tick();
      if (i % 25 === 0) g.flap();
    }
    expect(g.km).toBe(Math.floor(g.distancePx * KM_PER_PX));
    expect(g.km).toBeGreaterThan(0);
  });

  it('czas gry liczony w stałych krokach', () => {
    const g = newGame();
    g.flap();
    for (let i = 0; i < 240; i++) {
      if (i % 25 === 0) g.flap();
      g.tick();
    }
    expect(g.phase).toBe('playing');
    expect(g.seconds).toBeCloseTo(240 * TICK, 9);
  });

  it('znajdźka dodaje km i wagę', () => {
    const g = newGame(11);
    g.flap();
    let picked = false;
    while (g.phase === 'playing' && g.ticks < 120 * 120 && !picked) {
      botStep(g);
      g.tick();
      for (const e of g.drainEvents()) {
        if (e.type === 'pickup' && (e.kind === 'parcel' || e.kind === 'jar')) {
          picked = true;
          expect(g.bonusKm).toBeGreaterThan(0);
          expect(g.weight).toBeGreaterThan(0);
        }
      }
    }
    expect(picked).toBe(true);
  });

  it('wynik nie przekracza długości trasy i dojazd kończy przejazd', () => {
    const g = newGame(4, 'cozy');
    g.lives = 999;
    g.flap();
    while (g.phase === 'playing') {
      botStep(g);
      g.tick();
    }
    expect(g.phase).toBe('arrived');
    expect(g.km).toBe(ROUTE.totalKm);
  });

  it('granice krajów generują zdarzenie', () => {
    const g = newGame(4, 'cozy');
    g.lives = 999;
    g.flap();
    const borders: string[] = [];
    while (g.phase === 'playing') {
      botStep(g);
      g.tick();
      for (const e of g.drainEvents()) if (e.type === 'border') borders.push(e.country);
    }
    expect(borders).toEqual(['DE', 'PL']);
  });

  it('mijane punkty trasy generują zdarzenia po kolei', () => {
    const g = newGame(4, 'cozy');
    g.lives = 999;
    g.flap();
    const passed: string[] = [];
    while (g.phase === 'playing') {
      botStep(g);
      g.tick();
      for (const e of g.drainEvents()) if (e.type === 'waypoint') passed.push(e.waypoint.id);
    }
    expect(passed).toContain('kolonia');
    expect(passed).toContain('berlin');
    // Stacja zależy od docelowego miasta: Świecko, Kołbaskowo lub Olszyna.
    const restId = ROUTE.waypoints.find((waypoint) => waypoint.kind === 'rest')!.id;
    expect(passed).toContain(restId);
    expect(passed.indexOf('kolonia')).toBeLessThan(passed.indexOf('berlin'));
    expect(passed.indexOf('berlin')).toBeLessThan(passed.indexOf(restId));
  });
});

describe('przelotność (gwarancja generatora)', () => {
  it('autopilot przelatuje całą trasę na 30 ziarnach w trybie rankingowym', () => {
    const failures: number[] = [];
    for (let seed = 1; seed <= 30; seed++) {
      const g = newGame(seed);
      playWithBot(g, 120 * 60 * 5);
      if (g.phase !== 'arrived') failures.push(seed);
    }
    expect(failures).toEqual([]);
  });
});

describe('bramka bagażowa i bonusy', () => {
  it('aktywny bonus wysyła start i koniec w czasie mierzonym tickami', () => {
    const g = newGame(123, 'cozy');
    g.flap();
    g.field.pickups.push({ id: -1, x: PLAYER.x + 2, y: PLAYER.startY, kind: 'boarding', taken: false });
    g.tick();
    expect(g.activePowerup).toBe('boarding');
    expect(g.isInvulnerable).toBe(true);
    expect(g.drainEvents()).toContainEqual({ type: 'powerup-start', kind: 'boarding', durationSeconds: 3 });
    for (let i = 1; i < Math.round(3 / TICK); i++) {
      botStep(g);
      g.tick();
    }
    expect(g.activePowerup).toBeNull();
    expect(g.drainEvents()).toContainEqual({ type: 'powerup-end', kind: 'boarding' });
  });

  it('wiatr przyspiesza przejazd, a telefon spowalnia fizykę', () => {
    const wind = newGame(25, 'cozy');
    wind.flap();
    wind.field.pickups.push({ id: -1, x: PLAYER.x + 2, y: PLAYER.startY, kind: 'tailwind', taken: false });
    wind.tick();
    expect(wind.activePowerup).toBe('tailwind');
    expect(wind.speed).toBeGreaterThan(200);

    const phone = newGame(25, 'cozy');
    phone.flap();
    phone.field.pickups.push({ id: -1, x: PLAYER.x + 2, y: PLAYER.startY, kind: 'mamcall', taken: false });
    phone.tick();
    expect(phone.activePowerup).toBe('mamcall');
    const before = phone.distancePx;
    phone.tick();
    expect(phone.distancePx - before).toBeLessThan(wind.speed * TICK);
  });

  it('replay z bramkami i bonusami daje identyczny wynik dla tych samych tapnięć', () => {
    let checked = false;
    for (let seed = 1; seed <= 20 && !checked; seed++) {
      const g = newGame(seed);
      playWithBot(g, 120 * 105);
      if (!g.drainEvents().some((e) => e.type === 'powerup-start')) continue;
      const r = replay({ seed, mode: 'ranked', route: ROUTE }, g.flapTicks, g.ticks);
      expect({ km: r.km, distance: r.distancePx, y: r.y, weight: r.weight, phase: r.phase })
        .toEqual({ km: g.km, distance: g.distancePx, y: g.y, weight: g.weight, phase: g.phase });
      expect(r.field.obstacles).toEqual(g.field.obstacles);
      checked = true;
    }
    expect(checked).toBe(true);
  });
});

describe('replay (weryfikacja wyniku)', () => {
  it('odtworzenie ziarna i tapnięć daje identyczny wynik', () => {
    const g = newGame(77);
    playWithBot(g, 120 * 40);
    const r = replay({ seed: 77, mode: 'ranked', route: ROUTE }, g.flapTicks, g.ticks);
    expect(r.km).toBe(g.km);
    expect(r.ticks).toBe(g.ticks);
    expect(r.phase).toBe(g.phase);
  });

  it('zmyślone tapnięcia nie dają tego samego wyniku', () => {
    const g = newGame(77);
    playWithBot(g, 120 * 40);
    const fake = g.flapTicks.map((t, i) => (i > 5 ? t + 3 : t));
    const r = replay({ seed: 77, mode: 'ranked', route: ROUTE }, fake, g.ticks);
    expect(r.km === g.km && r.ticks === g.ticks && r.y === g.y).toBe(false);
  });

  it('Game bez wejść zostaje w fazie ready', () => {
    const r = replay({ seed: 1, mode: 'ranked', route: ROUTE }, []);
    expect(r.phase).toBe('ready');
    expect(r).toBeInstanceOf(Game);
  });
});
