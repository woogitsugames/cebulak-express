import { describe, expect, it } from 'vitest';
import { Game } from '../src/core/game';
import { makeRoute } from '../src/core/route';
import { randomNickChoices } from '../src/content/nicks';
import { GHOST_TEXTS } from '../src/content/lang/pl';
import { encodeGhost } from '../src/share/ghost';
import {
  buildChallengeLink, challengeRunOptions, challengeShareText, createGhostRunner, ghostMenuInfo,
  ghostOutcomeText, isGhostVisible, loadGhostChallenge, syncGhost,
} from '../src/share/ghost-session';
import { botStep, playWithBot } from './helpers';

const route = makeRoute('BE', 'bruksela', 'rzeszow');
const BASE = 'https://gra.example.invalid/?r=BE-bruksela';

function shortRun(): Game {
  const game = new Game({ seed: 0xffffffff, mode: 'ranked', route });
  game.flap();
  while (game.phase === 'playing') game.tick();
  return game;
}

function botRun(seed = 3, maxTicks = 120 * 60 * 10): Game {
  const game = new Game({ seed, mode: 'ranked', route });
  playWithBot(game, maxTicks);
  return game;
}

function challengeFrom(game: Game, nickId?: string) {
  const link = buildChallengeLink(BASE, game, nickId);
  expect(link).not.toBeNull();
  const challenge = loadGhostChallenge(new URL(link!).search);
  expect(challenge).not.toBeNull();
  return challenge!;
}

describe('wczytanie wyzwania z linku', () => {
  it('ignoruje po cichu brak, śmieci i stare kody', () => {
    expect(loadGhostChallenge('')).toBeNull();
    expect(loadGhostChallenge('?g=AAAA')).toBeNull();
    expect(loadGhostChallenge('?g=%%%')).toBeNull();
    // Kod z poprawną strukturą, ale wynikiem, którego obecny rdzeń nie odtworzy.
    const code = encodeGhost(shortRun()).code;
    const tampered = code.slice(0, -6) + (code.slice(-6, -5) === 'A' ? 'B' : 'A') + code.slice(-5);
    expect(loadGhostChallenge('?g=' + tampered)).toBeNull();
  });

  it('daje opcje przejazdu z ziarnem, trasą i trybem nadawcy', () => {
    const record = shortRun();
    const challenge = challengeFrom(record);
    expect(challengeRunOptions(challenge)).toEqual({ seed: record.seed, mode: 'ranked', route: challenge.route });
    expect(challenge.route.from.id).toBe('bruksela');
  });
});

describe('synchronizacja ducha w pętli gry', () => {
  it('jedzie równo z graczem i jest widoczny', () => {
    const challenge = challengeFrom(botRun());
    let runner = createGhostRunner(challenge);
    const player = new Game(challengeRunOptions(challenge));
    expect(runner && isGhostVisible(runner, player)).toBe(true);
    player.flap();
    for (let i = 0; i < 300 && player.phase === 'playing'; i++) {
      botStep(player);
      player.tick();
      runner = syncGhost(runner, player);
      expect(runner).not.toBeNull();
      expect(isGhostVisible(runner!, player)).toBe(runner!.game.phase === 'playing');
    }
  });

  it('rozjechanie się z grą wyłącza ducha bez wyjątku', () => {
    const challenge = challengeFrom(shortRun());
    const runner = createGhostRunner(challenge);
    const other = new Game({ seed: 123, mode: 'ranked', route: challenge.route });
    expect(() => syncGhost(runner, other)).not.toThrow();
    expect(syncGhost(runner, other)).toBeNull();
    expect(syncGhost(null, other)).toBeNull();
  });

  it('ukrywa ducha, który się rozbił, gdy gracz jedzie dalej', () => {
    const challenge = challengeFrom(shortRun());
    let runner = createGhostRunner(challenge);
    const player = new Game(challengeRunOptions(challenge));
    player.flap();
    while (player.phase === 'playing') {
      botStep(player);
      player.tick();
      runner = syncGhost(runner, player);
    }
    expect(runner).not.toBeNull();
    expect(runner!.game.phase).toBe('over');
    expect(isGhostVisible(runner!, player)).toBe(false);
  });
});

describe('ekran końca', () => {
  it('pokazuje wynik wyścigu z tekstów pl.ts bez słowa „cebulak”', () => {
    const challenge = challengeFrom(shortRun());
    let runner = createGhostRunner(challenge)!;
    const player = new Game(challengeRunOptions(challenge));
    expect(ghostOutcomeText(runner, player)).toBeNull();
    player.flap();
    while (player.phase === 'playing') {
      botStep(player);
      player.tick();
      runner = syncGhost(runner, player)!;
    }
    const text = ghostOutcomeText(runner, player)!;
    const diff = player.km - challenge.km;
    expect(diff).toBeGreaterThan(0);
    expect(text).toBe(GHOST_TEXTS.win.replace('{km}', String(diff)));
    expect(text.toLowerCase()).not.toContain('cebulak');
  });

  it('remis i dopisek przy uciętym zapisie', () => {
    const record = botRun(17, 120 * 60 * 5);
    const challenge = loadGhostChallenge('?g=' + encodeGhost(record, 64).code)!;
    expect(challenge.truncated).toBe(true);
    let runner = createGhostRunner(challenge)!;
    const player = new Game(challengeRunOptions(challenge));
    player.flap();
    while (player.phase === 'playing') {
      botStep(player);
      player.tick();
      runner = syncGhost(runner, player)!;
    }
    expect(ghostOutcomeText(runner, player)).toBe(
      GHOST_TEXTS.tie + ' ' + GHOST_TEXTS.truncated.replace('{sec}', String(Math.round(challenge.ticks / 120))),
    );
  });

  it('teksty wyzwania są neutralne płciowo i bez słowa „cebulak”', () => {
    for (const text of Object.values(GHOST_TEXTS)) {
      expect(text.toLowerCase()).not.toContain('cebulak');
      // Formy czasu przeszłego z rodzajem („wyprzedziłeś/aś”, „doleciałem”) odpadają.
      expect(text).not.toMatch(/(łeś|łaś|łem|łam)\b/);
    }
  });
});

describe('link „Wyzwij znajomego”', () => {
  it('dokleja g= i tylko nick z zamkniętej listy', () => {
    const record = shortRun();
    const nickId = randomNickChoices(() => 0.3, 1, 'BE')[0];
    const withNick = new URL(buildChallengeLink(BASE, record, nickId)!);
    expect(withNick.searchParams.get('r')).toBe('BE-bruksela');
    expect(withNick.searchParams.get('n')).toBe(nickId);
    expect(ghostMenuInfo(loadGhostChallenge(withNick.search)!)).toContain('Wyzwanie od:');

    const freeText = new URL(buildChallengeLink(BASE, record, 'Jan Kowalski')!);
    expect(freeText.searchParams.has('n')).toBe(false);
    expect(freeText.searchParams.has('g')).toBe(true);
    expect(ghostMenuInfo(loadGhostChallenge(freeText.search)!)).toBe(
      `Wyzwanie znajomego: Bruksela → Rzeszów. Do pobicia: ${record.km} km`,
    );
  });

  it('nie tworzy wyzwania z lotu powrotnego ani z niezakończonego przejazdu', () => {
    const back = new Game({ seed: 5, mode: 'cozy', route, baseWeight: 0.25 });
    back.flap();
    while (back.phase === 'playing') back.tick();
    expect(buildChallengeLink(BASE, back)).toBeNull();
    const running = new Game({ seed: 5, mode: 'ranked', route });
    expect(buildChallengeLink(BASE, running)).toBeNull();
  });

  it('tekst udostępnienia zawiera km i trasę', () => {
    const record = shortRun();
    expect(challengeShareText(record)).toBe(
      `Rzucam wyzwanie: ${record.km} km na trasie Bruksela → Rzeszów. Dogonisz mojego ducha?`,
    );
  });
});
