import { randomInt } from 'node:crypto';
import { isValidNickId } from '../../src/content/nicks';
import { getApps, initializeApp } from 'firebase-admin/app';
import { FieldValue, getFirestore, type DocumentSnapshot } from 'firebase-admin/firestore';
import { logger } from 'firebase-functions';
import { HttpsError, onCall } from 'firebase-functions/v2/https';
import { onSchedule } from 'firebase-functions/v2/scheduler';
import { TICK } from '../../src/core/config';
import { seedFromString } from '../../src/core/rng';
import { HOME_COUNTRIES, makeRoute, type HomeCountry } from '../../src/core/route';
import {
  isCalendarDay, RETENTION_MS, RUN_EXPIRES_MS,
  verifyReplay, warsawDay, warsawWeek,
} from './validation';

// Moduł analityki też może zainicjalizować aplikację — inicjalizujemy tylko raz.
if (!getApps().length) initializeApp();
const db = getFirestore();
const REGION = 'europe-west1';
const REQUIRE_APP_CHECK = process.env.REQUIRE_APP_CHECK === 'true';
const START_GAP_MS = 1_000;
const SUBMIT_GAP_MS = 3_000;
const LIMIT_RETENTION_MS = 2 * 24 * 60 * 60 * 1000;

type GameMode = 'ranked' | 'daily';
type RejectReason = 'replay_mismatch' | 'too_fast' | 'expired' | 'rate_limited' | 'bad_nick' | 'duplicate';

interface RunDoc {
  uid: string;
  seed: number;
  mode: GameMode;
  home: HomeCountry;
  from: string;
  to: string;
  issuedAt: number;
  expiresAt: number;
  status: 'issued' | 'accepted' | 'rejected';
  km: number;
  ticks: number;
  daily?: string;
}

interface SubmitResponse {
  accepted: boolean;
  km: number;
  reason?: RejectReason;
  week: string;
  countryRankKm?: number;
  playerBestKm?: number;
}

function objectData(input: unknown): Record<string, unknown> {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    throw new HttpsError('invalid-argument', 'Oczekiwano obiektu danych.');
  }
  return input as Record<string, unknown>;
}

function currentUtcDay(now: number): string {
  return new Date(now).toISOString().slice(0, 10);
}

/** Ograniczenie zapisane w bazie: działa również przy wielu równoległych instancjach. */
function rateState(
  snapshot: DocumentSnapshot,
  now: number,
  minimumGap: number,
  maxPerDay: number,
): { blocked: boolean; next: { day: string; count: number; lastAt: number; expiresAt: number } } {
  const data = snapshot.data() ?? {};
  const day = currentUtcDay(now);
  const sameDay = data.day === day;
  const count = sameDay && Number.isSafeInteger(data.count) ? data.count as number : 0;
  const lastAt = typeof data.lastAt === 'number' ? data.lastAt : 0;
  return {
    blocked: (sameDay && count >= maxPerDay) || (lastAt > 0 && now - lastAt < minimumGap),
    next: { day, count: count + 1, lastAt: now, expiresAt: now + LIMIT_RETENTION_MS },
  };
}

/** startRun: ziarno jest generowane na serwerze i przypisane do anonimowego UID. */
export const startRun = onCall(
  { region: REGION, enforceAppCheck: REQUIRE_APP_CHECK, memory: '256MiB', timeoutSeconds: 30 },
  async (request) => {
    const uid = request.auth?.uid;
    if (!uid || request.auth?.token.firebase?.sign_in_provider !== 'anonymous') {
      throw new HttpsError('unauthenticated', 'Wymagane logowanie anonimowe.');
    }

    const data = objectData(request.data);
    const mode = data.mode;
    const home = data.home;
    const from = data.from;
    const to = data.to;
    if ((mode !== 'ranked' && mode !== 'daily')
      || !HOME_COUNTRIES.some((c) => c === home)
      || typeof from !== 'string' || typeof to !== 'string') {
      throw new HttpsError('invalid-argument', 'Niepoprawny tryb, kraj lub miasto.');
    }
    const country = home as HomeCountry;
    try {
      makeRoute(country, from, to);
    } catch {
      throw new HttpsError('invalid-argument', 'Nieznana lub niezgodna trasa.');
    }

    const now = Date.now();
    let daily: string | undefined;
    if (mode === 'daily') {
      const supplied = data.daily ?? warsawDay(now);
      if (!isCalendarDay(supplied) || supplied !== warsawDay(now)) {
        throw new HttpsError('invalid-argument', 'Wyzwanie dzienne musi dotyczyć dzisiejszej daty w Polsce.');
      }
      daily = supplied;
    } else if (data.daily !== undefined) {
      throw new HttpsError('invalid-argument', 'Data dotyczy tylko wyzwania dziennego.');
    }

    const seed = mode === 'daily' ? seedFromString('daily:' + daily) : randomInt(0, 0x100000000);
    const ref = db.collection('runs').doc();
    const run: RunDoc = {
      uid, seed, mode, home: country, from, to,
      issuedAt: now, expiresAt: now + RETENTION_MS,
      status: 'issued', km: 0, ticks: 0,
      ...(daily === undefined ? {} : { daily }),
    };
    const startLimitRef = db.collection('_runStarts').doc(uid);
    await db.runTransaction(async (tx) => {
      const limit = rateState(await tx.get(startLimitRef), now, START_GAP_MS, 600);
      if (limit.blocked) throw new HttpsError('resource-exhausted', 'Zbyt częste rozpoczynanie przejazdów.');
      tx.set(startLimitRef, limit.next);
      tx.create(ref, run);
    });
    return { runId: ref.id, seed, issuedAt: now };
  },
);

/** submitRun: każda próba weryfikacji zostaje rozliczona atomowo tylko jeden raz. */
export const submitRun = onCall(
  { region: REGION, enforceAppCheck: REQUIRE_APP_CHECK, memory: '512MiB', timeoutSeconds: 60 },
  async (request): Promise<SubmitResponse> => {
    const uid = request.auth?.uid;
    if (!uid || request.auth?.token.firebase?.sign_in_provider !== 'anonymous') {
      throw new HttpsError('unauthenticated', 'Wymagane logowanie anonimowe.');
    }
    const data = objectData(request.data);
    const runId = data.runId;
    if (typeof runId !== 'string' || !/^[A-Za-z0-9]{20}$/.test(runId)) {
      throw new HttpsError('invalid-argument', 'Niepoprawny identyfikator przejazdu.');
    }
    let matchedPending = true;
    const runRef = db.collection('runs').doc(runId);
    const initial = (await runRef.get()).data() as RunDoc | undefined;
    if (!initial) throw new HttpsError('not-found', 'Przejazd nie istnieje.');
    if (initial.uid !== uid) throw new HttpsError('permission-denied', 'Przejazd należy do innego gracza.');

    // Tanie odrzucenia przed drogim odtworzeniem (do 72 000 ticków symulacji),
    // żeby spam zgłoszeń nie kosztował CPU. Transakcja niżej sprawdza je ponownie.
    if (initial.status !== 'issued') {
      return { accepted: false, km: 0, reason: 'duplicate', week: warsawWeek(initial.issuedAt) };
    }
    const nowPre = Date.now();
    const ticksPre = data.ticks;
    if (
      nowPre - initial.issuedAt > RUN_EXPIRES_MS ||
      !Number.isSafeInteger(ticksPre) ||
      (ticksPre as number) <= 0 ||
      nowPre - initial.issuedAt < (ticksPre as number) * TICK * 1_000 * 0.9
    ) {
      matchedPending = false;
    }
    const preLimit = (await db.collection('_submissionLimits').doc(uid).get());
    const preRate = rateState(preLimit, nowPre, SUBMIT_GAP_MS, 500);

    // Drogie odtworzenie wykonujemy raz i tylko gdy tanie warunki przeszły;
    // atomowość rozstrzygamy w transakcji. Nie ufamy wartościom od klienta.
    const matched = matchedPending && !preRate.blocked && verifyReplay(initial, data.flapTicks, data.ticks, data.km);
    const limiterRef = db.collection('_submissionLimits').doc(uid);

    return db.runTransaction(async (tx): Promise<SubmitResponse> => {
      const [runSnap, limitSnap] = await Promise.all([tx.get(runRef), tx.get(limiterRef)]);
      const run = runSnap.data() as RunDoc | undefined;
      if (!run) throw new HttpsError('not-found', 'Przejazd nie istnieje.');
      if (run.uid !== uid) throw new HttpsError('permission-denied', 'Przejazd należy do innego gracza.');
      const week = warsawWeek(run.issuedAt);
      if (run.status !== 'issued') return { accepted: false, km: 0, reason: 'duplicate', week };

      const now = Date.now();
      const limit = rateState(limitSnap, now, SUBMIT_GAP_MS, 500);
      if (limit.blocked) return { accepted: false, km: 0, reason: 'rate_limited', week };
      const reject = (reason: RejectReason): SubmitResponse => {
        tx.update(runRef, { status: 'rejected', reason, submittedAt: now });
        tx.set(limiterRef, limit.next);
        return { accepted: false, km: 0, reason, week };
      };

      if (now - run.issuedAt > RUN_EXPIRES_MS) return reject('expired');
      if (typeof data.nickId !== 'string' || !isValidNickId(data.nickId)) return reject('bad_nick');
      if (!Number.isSafeInteger(data.ticks) || (data.ticks as number) <= 0) return reject('replay_mismatch');
      if (now - run.issuedAt < (data.ticks as number) * TICK * 1_000 * 0.9) return reject('too_fast');
      if (!matched) return reject('replay_mismatch');

      const km = data.km as number;
      const ticks = data.ticks as number;
      const nickId = data.nickId;
      const playerRef = db.collection('players').doc(uid);
      const playerSnap = await tx.get(playerRef);
      const previousBest = playerSnap.exists && typeof playerSnap.get('bestKm') === 'number'
        ? playerSnap.get('bestKm') as number : 0;
      const playerBestKm = Math.max(previousBest, km);

      let countryRankKm: number | undefined;
      if (run.mode === 'ranked') {
        const leagueRef = db.collection('league').doc(week);
        const entryRef = db.collection('leaderboard').doc(week).collection('entries').doc(uid);
        const memberRef = leagueRef.collection('_members').doc(run.home + '_' + uid);
        const [leagueSnap, entrySnap, memberSnap] = await Promise.all([
          tx.get(leagueRef), tx.get(entryRef), tx.get(memberRef),
        ]);
        const previousCountryKm = leagueSnap.get('countries.' + run.home + '.km');
        countryRankKm = (typeof previousCountryKm === 'number' ? previousCountryKm : 0) + km;

        tx.set(leagueRef, {
          countries: { [run.home]: {
            km: FieldValue.increment(km),
            runs: FieldValue.increment(1),
            players: FieldValue.increment(memberSnap.exists ? 0 : 1),
          } },
          updatedAt: now,
        }, { merge: true });
        if (!memberSnap.exists) tx.create(memberRef, { uid, home: run.home, joinedAt: now });

        const oldWeekBest = entrySnap.exists && typeof entrySnap.get('bestKm') === 'number'
          ? entrySnap.get('bestKm') as number : -1;
        if (km > oldWeekBest) tx.set(entryRef, { nickId, home: run.home, bestKm: km, at: now });
      } else {
        // Wyzwanie dnia nie zwiększa sumy kraju ani tygodniowego rankingu.
        const dayRef = db.collection('daily').doc(run.daily!);
        const entryRef = dayRef.collection('entries').doc(uid);
        const entrySnap = await tx.get(entryRef);
        const oldBest = entrySnap.exists && typeof entrySnap.get('km') === 'number'
          ? entrySnap.get('km') as number : -1;
        if (km > oldBest) tx.set(entryRef, { nickId, home: run.home, km });
      }

      tx.set(playerRef, { nickId, home: run.home, bestKm: playerBestKm, updatedAt: now });
      tx.update(runRef, { status: 'accepted', km, ticks, submittedAt: now });
      tx.set(limiterRef, limit.next);
      return { accepted: true, km, week, ...(countryRankKm === undefined ? {} : { countryRankKm }), playerBestKm };
    });
  },
);

async function removeExpired(collection: string, now: number): Promise<number> {
  let removed = 0;
  for (let page = 0; page < 100; page++) {
    const expired = await db.collection(collection).where('expiresAt', '<=', now).limit(400).get();
    if (expired.empty) break;
    const batch = db.batch();
    for (const doc of expired.docs) batch.delete(doc.ref);
    await batch.commit();
    removed += expired.size;
    if (expired.size < 400) break;
  }
  return removed;
}

/** Bez IP, odcisków urządzeń i danych kontaktowych; regularne usuwanie danych technicznych. */
export const cleanupExpiredRuns = onSchedule(
  { schedule: '0 3 * * *', timeZone: 'Europe/Warsaw', region: REGION, timeoutSeconds: 540, memory: '256MiB' },
  async () => {
    const now = Date.now();
    const runs = await removeExpired('runs', now);
    const starts = await removeExpired('_runStarts', now);
    const submissions = await removeExpired('_submissionLimits', now);
    logger.info('Usunięto wygasłe dane', { runs, starts, submissions });
  },
);

export { collectEvents } from './analytics';
