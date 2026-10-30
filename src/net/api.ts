import { HOME_COUNTRIES, makeRoute, type HomeCountry } from '../core/route';
import { replay } from '../core/game';
import { TICK } from '../core/config';
import { seedFromString } from '../core/rng';
import { isValidNickId, randomNickChoices } from '../content/nicks';
import { warsawDateKey, warsawWeekKey } from './week';

export type RankingMode = 'ranked' | 'daily';
export type RejectionReason = 'replay_mismatch' | 'too_fast' | 'expired' | 'rate_limited' | 'bad_nick' | 'duplicate';

export interface StartRunRequest {
  mode: RankingMode;
  home: HomeCountry;
  from: string;
  to: string;
  daily?: string;
}
export interface StartRunResponse { runId: string; seed: number; issuedAt: number }
export interface SubmitRunRequest { runId: string; flapTicks: number[]; ticks: number; km: number; nickId: string }
export interface SubmitRunResponse {
  accepted: boolean;
  km: number;
  reason?: RejectionReason;
  week: string;
  countryRankKm?: number;
  playerBestKm?: number;
}
export interface CountryStats { km: number; runs: number; players: number }
export interface LeagueData {
  week: string;
  countries: Partial<Record<HomeCountry, CountryStats>>;
  updatedAt?: unknown;
}
export interface PlayerEntry {
  uid: string;
  nickId: string;
  home: HomeCountry;
  bestKm: number;
  at?: unknown;
}
export interface DailyEntry {
  uid: string;
  nickId: string;
  home: HomeCountry;
  km: number;
}
export interface DailyData { date: string; entries: DailyEntry[] }

export interface RankingApi {
  readonly kind: 'firebase' | 'mock';
  startRun(request: StartRunRequest): Promise<StartRunResponse>;
  submitRun(request: SubmitRunRequest): Promise<SubmitRunResponse>;
  getLeague(week: string): Promise<LeagueData>;
  getLeaderboard(week: string, limit: number): Promise<PlayerEntry[]>;
  getDaily(date: string): Promise<DailyData>;
}

// Import typów nie ładuje SDK w runtime. Chunk Firebase pobiera się dopiero po konfiguracji.
type FirebaseSdk = typeof import('./firebase-client')['sdk'];
interface FirebaseConnection {
  sdk: FirebaseSdk;
  app: ReturnType<FirebaseSdk['app']['initializeApp']>;
  functions: ReturnType<FirebaseSdk['functions']['getFunctions']>;
  db: ReturnType<FirebaseSdk['firestore']['getFirestore']>;
}
let sdkPromise: Promise<FirebaseSdk> | undefined;
function loadSdk(): Promise<FirebaseSdk> {
  if (!sdkPromise) {
    sdkPromise = import('./firebase-client').then(({ sdk }) => sdk)
      .catch((error: unknown) => { sdkPromise = undefined; throw error; });
  }
  return sdkPromise;
}

function record(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
    ? value as Record<string, unknown> : null;
}
function positiveNumber(value: unknown): number {
  return typeof value === 'number' && Number.isFinite(value) && value > 0 ? value : 0;
}
function homeCountry(value: unknown): value is HomeCountry {
  return typeof value === 'string' && HOME_COUNTRIES.includes(value as HomeCountry);
}
function nickId(value: unknown): value is string {
  return typeof value === 'string' && isValidNickId(value);
}
function checkedLimit(value: number): number {
  return Number.isFinite(value) ? Math.max(1, Math.min(100, Math.floor(value))) : 30;
}

/** Cache 60 s na odczyt dokumentu Ligi; scala równoczesne zapytania. */
export class LeagueReadCache {
  private readonly entries = new Map<string, { expiresAt: number; data: LeagueData }>();
  private readonly pending = new Map<string, Promise<LeagueData>>();

  constructor(private readonly now: () => number = Date.now, private readonly ttlMs = 60_000) {}

  private clone(data: LeagueData): LeagueData {
    const countries: LeagueData['countries'] = {};
    for (const home of HOME_COUNTRIES) {
      const stats = data.countries[home];
      if (stats) countries[home] = { ...stats };
    }
    return { ...data, countries };
  }

  async get(week: string, load: () => Promise<LeagueData>): Promise<LeagueData> {
    const cached = this.entries.get(week);
    if (cached && this.now() < cached.expiresAt) return this.clone(cached.data);
    const ongoing = this.pending.get(week);
    if (ongoing) return this.clone(await ongoing);
    const task = Promise.resolve().then(load);
    this.pending.set(week, task);
    try {
      const data = await task;
      // Przejazd mógł unieważnić cache, gdy żądanie było jeszcze w toku.
      if (this.pending.get(week) === task) {
        this.entries.delete(week);
        if (this.entries.size >= 16) this.entries.delete(this.entries.keys().next().value!);
        this.entries.set(week, { data: this.clone(data), expiresAt: this.now() + this.ttlMs });
      }
      return this.clone(data);
    } finally {
      if (this.pending.get(week) === task) this.pending.delete(week);
    }
  }

  invalidate(week: string): void {
    this.entries.delete(week);
    this.pending.delete(week);
  }
}

export interface FirebaseWebConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  appId: string;
  messagingSenderId?: string;
  storageBucket?: string;
}

export class FirebaseRankingApi implements RankingApi {
  readonly kind = 'firebase' as const;
  private connection?: Promise<FirebaseConnection>;
  private readonly leagueCache = new LeagueReadCache();
  constructor(private readonly config: FirebaseWebConfig, private readonly recaptchaSiteKey = '') {}

  private connected(): Promise<FirebaseConnection> {
    if (!this.connection) {
      this.connection = (async () => {
        const sdk = await loadSdk();
        const app = sdk.app.initializeApp(this.config);
        await sdk.initAppCheck(app, this.recaptchaSiteKey);
        const auth = sdk.auth.getAuth(app);
        await auth.authStateReady();
        if (!auth.currentUser) await sdk.auth.signInAnonymously(auth);
        return {
          sdk, app,
          functions: sdk.functions.getFunctions(app, 'europe-west1'),
          db: sdk.firestore.getFirestore(app),
        };
      })().catch((error: unknown) => { this.connection = undefined; throw error; });
    }
    return this.connection;
  }

  async startRun(request: StartRunRequest): Promise<StartRunResponse> {
    const { sdk, functions } = await this.connected();
    const response = await sdk.functions.httpsCallable<StartRunRequest, StartRunResponse>(functions, 'startRun')(request);
    return response.data;
  }
  async submitRun(request: SubmitRunRequest): Promise<SubmitRunResponse> {
    const { sdk, functions } = await this.connected();
    const response = await sdk.functions.httpsCallable<SubmitRunRequest, SubmitRunResponse>(functions, 'submitRun')(request);
    if (response.data.accepted) this.leagueCache.invalidate(response.data.week);
    return response.data;
  }
  async getLeague(week: string): Promise<LeagueData> {
    return this.leagueCache.get(week, async () => {
      const { sdk, db } = await this.connected();
      const snapshot = await sdk.firestore.getDoc(sdk.firestore.doc(db, 'league', week));
      const data = snapshot.exists() ? record(snapshot.data()) : null;
      const countries = record(data?.countries);
      const result: LeagueData = { week, countries: {}, updatedAt: data?.updatedAt };
      for (const home of HOME_COUNTRIES) {
        const stats = record(countries?.[home]);
        if (stats) result.countries[home] = {
          km: positiveNumber(stats.km), runs: positiveNumber(stats.runs), players: positiveNumber(stats.players),
        };
      }
      return result;
    });
  }
  async getLeaderboard(week: string, limit: number): Promise<PlayerEntry[]> {
    const { sdk, db } = await this.connected();
    const q = sdk.firestore.query(sdk.firestore.collection(db, 'leaderboard', week, 'entries'),
      sdk.firestore.orderBy('bestKm', 'desc'), sdk.firestore.limit(checkedLimit(limit)));
    const entries = await sdk.firestore.getDocs(q);
    return entries.docs.flatMap((snapshot): PlayerEntry[] => {
      const data = record(snapshot.data());
      if (!data || !nickId(data.nickId) || !homeCountry(data.home)) return [];
      return [{ uid: snapshot.id, nickId: data.nickId, home: data.home,
        bestKm: positiveNumber(data.bestKm), at: data.at }];
    });
  }
  async getDaily(date: string): Promise<DailyData> {
    const { sdk, db } = await this.connected();
    const q = sdk.firestore.query(sdk.firestore.collection(db, 'daily', date, 'entries'),
      sdk.firestore.orderBy('km', 'desc'), sdk.firestore.limit(50));
    const entries = await sdk.firestore.getDocs(q);
    return { date, entries: entries.docs.flatMap((snapshot): DailyEntry[] => {
      const data = record(snapshot.data());
      if (!data || !nickId(data.nickId) || !homeCountry(data.home)) return [];
      return [{ uid: snapshot.id, nickId: data.nickId, home: data.home, km: positiveNumber(data.km) }];
    }) };
  }
}

interface MockRun { request: StartRunRequest; seed: number; issuedAt: number; submitted: boolean }
export interface MockOptions { now?: () => number; seed?: () => number; demo?: boolean }

/** Pamięć jednej sesji. Dane demonstracyjne nie są wysyłane na serwer. */
export class MockRankingApi implements RankingApi {
  readonly kind = 'mock' as const;
  private readonly now: () => number;
  private readonly randomSeed: () => number;
  private seq = 0;
  private readonly runs = new Map<string, MockRun>();
  private readonly leagues = new Map<string, LeagueData>();
  private readonly leaders = new Map<string, Map<string, PlayerEntry>>();
  private readonly dailies = new Map<string, Map<string, DailyEntry>>();
  private bestKm = 0;
  private readonly uid = 'mock-current-player';

  constructor(options: MockOptions = {}) {
    this.now = options.now ?? Date.now;
    this.randomSeed = options.seed ?? (() => Math.floor(Math.random() * 2 ** 32));
    if (options.demo !== false) this.seedDemo();
  }

  private seedDemo(): void {
    const week = warsawWeekKey(new Date(this.now()));
    const countries = {} as Partial<Record<HomeCountry, CountryStats>>;
    const kms = [184_250, 162_480, 145_120, 131_900, 116_500, 98_000, 81_200, 65_900];
    HOME_COUNTRIES.forEach((home, i) => {
      countries[home] = { km: kms[i] ?? 0, runs: Math.max(0, 1200 - i * 120), players: Math.max(0, 310 - i * 27) };
    });
    this.leagues.set(week, { week, countries });
    this.leaders.set(week, new Map<string, PlayerEntry>([
      ['demo-1', { uid: 'demo-1', nickId: randomNickChoices(() => 0.12, 1, 'BE')[0], home: 'BE', bestKm: 1540 }],
      ['demo-2', { uid: 'demo-2', nickId: randomNickChoices(() => 0.12, 1, 'NL')[0], home: 'NL', bestKm: 1380 }],
      ['demo-3', { uid: 'demo-3', nickId: randomNickChoices(() => 0.12, 1, 'DE')[0], home: 'DE', bestKm: 1210 }],
    ]));
    const date = warsawDateKey(new Date(this.now()));
    this.dailies.set(date, new Map<string, DailyEntry>([
      ['demo-1', { uid: 'demo-1', nickId: randomNickChoices(() => 0.12, 1, 'BE')[0], home: 'BE', km: 840 }],
      ['demo-2', { uid: 'demo-2', nickId: randomNickChoices(() => 0.12, 1, 'NL')[0], home: 'NL', km: 710 }],
    ]));
  }

  async startRun(request: StartRunRequest): Promise<StartRunResponse> {
    if (!HOME_COUNTRIES.includes(request.home)) throw new Error('Nieznany kraj');
    makeRoute(request.home, request.from, request.to);
    if (request.mode === 'daily' && !/^\d{4}-\d{2}-\d{2}$/.test(request.daily ?? '')) {
      throw new Error('Brak daty wyzwania dnia');
    }
    const issuedAt = this.now();
    const seed = request.mode === 'daily' ? seedFromString(`daily:${request.daily}`) : this.randomSeed() >>> 0;
    const runId = `mock-${++this.seq}`;
    this.runs.set(runId, { request: { ...request }, seed, issuedAt, submitted: false });
    return { runId, seed, issuedAt };
  }

  async submitRun(request: SubmitRunRequest): Promise<SubmitRunResponse> {
    const week = warsawWeekKey(new Date(this.now()));
    const fail = (reason: RejectionReason): SubmitRunResponse => ({ accepted: false, km: request.km, reason, week });
    const run = this.runs.get(request.runId);
    if (!run) return fail('expired');
    if (run.submitted) return fail('duplicate');
    if (this.now() - run.issuedAt > 30 * 60_000) return fail('expired');
    if (!nickId(request.nickId)) return fail('bad_nick');
    if (!Number.isSafeInteger(request.ticks) || request.ticks <= 0 || request.ticks > 120 * 60 * 10 ||
      !Number.isSafeInteger(request.km) || request.km < 0 ||
      !Array.isArray(request.flapTicks) || request.flapTicks.length === 0 ||
      request.flapTicks.length > request.ticks / 6 ||
      request.flapTicks.some((t, i, a) => !Number.isSafeInteger(t) || t < 0 || t >= request.ticks || (i > 0 && t <= a[i - 1]))) {
      return fail('replay_mismatch');
    }
    if (this.now() - run.issuedAt < request.ticks * TICK * 1000 * 0.9) return fail('too_fast');
    const g = replay({
      seed: run.seed, mode: 'ranked', route: makeRoute(run.request.home, run.request.from, run.request.to),
    }, request.flapTicks, request.ticks);
    if (g.ticks !== request.ticks || g.km !== request.km || (g.phase !== 'over' && g.phase !== 'arrived')) {
      return fail('replay_mismatch');
    }
    run.submitted = true;
    this.bestKm = Math.max(this.bestKm, g.km);
    if (run.request.mode === 'daily') {
      const date = run.request.daily!;
      const board = this.dailies.get(date) ?? new Map<string, DailyEntry>();
      const old = board.get(this.uid);
      if (!old || old.km < g.km) board.set(this.uid, { uid: this.uid, nickId: request.nickId, home: run.request.home, km: g.km });
      this.dailies.set(date, board);
      return { accepted: true, km: g.km, week, playerBestKm: this.bestKm };
    }
    const league = this.leagues.get(week) ?? { week, countries: {} };
    const stats = league.countries[run.request.home] ?? { km: 0, runs: 0, players: 0 };
    const leaders = this.leaders.get(week) ?? new Map<string, PlayerEntry>();
    if (!leaders.has(this.uid)) stats.players++;
    stats.km += g.km;
    stats.runs++;
    league.countries[run.request.home] = stats;
    this.leagues.set(week, league);
    const old = leaders.get(this.uid);
    if (!old || old.bestKm < g.km) {
      leaders.set(this.uid, { uid: this.uid, nickId: request.nickId, home: run.request.home, bestKm: g.km });
    }
    this.leaders.set(week, leaders);
    return { accepted: true, km: g.km, week, countryRankKm: stats.km, playerBestKm: this.bestKm };
  }

  async getLeague(week: string): Promise<LeagueData> {
    const league = this.leagues.get(week);
    return { week, countries: Object.fromEntries(Object.entries(league?.countries ?? {}).map(([country, value]) => [country, { ...value }])) };
  }
  async getLeaderboard(week: string, limit: number): Promise<PlayerEntry[]> {
    return [...(this.leaders.get(week)?.values() ?? [])].sort((a, b) => b.bestKm - a.bestKm)
      .slice(0, checkedLimit(limit)).map((entry) => ({ ...entry }));
  }
  async getDaily(date: string): Promise<DailyData> {
    const entries = [...(this.dailies.get(date)?.values() ?? [])].sort((a, b) => b.km - a.km);
    return { date, entries: entries.map((entry) => ({ ...entry })) };
  }
}

export function createRankingApi(env: Record<string, unknown> = import.meta.env): RankingApi {
  const value = (key: string) => typeof env[key] === 'string' ? (env[key] as string).trim() : '';
  const config = {
    apiKey: value('VITE_FIREBASE_API_KEY'),
    authDomain: value('VITE_FIREBASE_AUTH_DOMAIN'),
    projectId: value('VITE_FIREBASE_PROJECT_ID'),
    appId: value('VITE_FIREBASE_APP_ID'),
    messagingSenderId: value('VITE_FIREBASE_MESSAGING_SENDER_ID'),
    storageBucket: value('VITE_FIREBASE_STORAGE_BUCKET'),
  };
  return config.apiKey && config.authDomain && config.projectId && config.appId
    ? new FirebaseRankingApi(config, value('VITE_RECAPTCHA_SITE_KEY')) : new MockRankingApi();
}
