/**
 * Allowlista zdarzeń analityki i zliczanie (bez Firebase — testowalne jednostkowo).
 */
import { HOME_COUNTRIES } from '../../src/core/route';
import { BOTTOM_KINDS, POWERUP_KINDS, TOP_KINDS } from '../../src/core/obstacles';

// Enumy pochodzą ze wspólnego rdzenia: nowe kraje, przeszkody i bonusy
// trafiają na allowlistę automatycznie, bez drugiej kopii list na serwerze.
export const HOMES = HOME_COUNTRIES;
export const MODES = ['ranked', 'cozy'] as const;
export const CAUSES = ['arrived', 'ground', ...TOP_KINDS, ...BOTTOM_KINDS, 'baggage-gate'] as const;
export const PICKUP_KINDS = ['parcel', 'jar', ...POWERUP_KINDS] as const;
const FORMATS = ['native', 'clipboard', 'image', 'link'] as const;
const PLACEMENTS = ['menu', 'result', 'league', 'footer'] as const;
const NAMES = ['app_open', 'run_start', 'run_end', 'share_click', 'portal_click', 'league_open', 'install_prompt', 'pickup'] as const;
const RETENTION = ['new', 'd1', 'd7'] as const;

export function object(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
    ? value as Record<string, unknown> : null;
}

export function keys(value: unknown, names: readonly string[]): boolean {
  const obj = object(value);
  return obj !== null && Object.keys(obj).length === names.length &&
    Object.keys(obj).every((name) => names.includes(name));
}

function member<const T extends readonly string[]>(values: T, value: unknown): value is T[number] {
  return typeof value === 'string' && values.some((item) => item === value);
}

function metric(value: unknown, max: number): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= max;
}

type Name = typeof NAMES[number];
export interface ValidEvent {
  event: Name;
  props?: Record<string, unknown>;
  retention?: typeof RETENTION[number];
}

/** Pełna allowlista. Dodatkowe pola (w tym e-mail, URL, ID) odrzucają żądanie. */
export function validateEvent(value: unknown): value is ValidEvent {
  const e = object(value);
  if (!e || !member(NAMES, e.event)) return false;
  if (e.event === 'app_open') {
    return keys(e, ['event']) ||
      (keys(e, ['event', 'retention']) && member(RETENTION, e.retention));
  }
  if (e.event === 'league_open' || e.event === 'install_prompt') return keys(e, ['event']);
  if (!keys(e, ['event', 'props'])) return false;
  const p = object(e.props);
  if (!p) return false;
  switch (e.event) {
    case 'run_start':
      return keys(p, ['mode', 'home']) && member(MODES, p.mode) && member(HOMES, p.home);
    case 'run_end':
      return keys(p, ['km', 'seconds', 'cause', 'mode', 'home']) &&
        metric(p.km, 10000) && metric(p.seconds, 3600) &&
        member(CAUSES, p.cause) && member(MODES, p.mode) && member(HOMES, p.home);
    case 'share_click':
      return keys(p, ['format']) && member(FORMATS, p.format);
    case 'portal_click':
      return keys(p, ['placement', 'home']) && member(PLACEMENTS, p.placement) && member(HOMES, p.home);
    case 'pickup':
      return keys(p, ['kind', 'mode']) && member(PICKUP_KINDS, p.kind) && member(MODES, p.mode);
    default:
      return false;
  }
}


/** Dopiero po walidacji zamieniamy zdarzenia na sumy w pamięci funkcji. */
export function countEvents(events: ValidEvent[]): Record<string, number> {
  const counts: Record<string, number> = Object.create(null) as Record<string, number>;
  const add = (key: string, amount = 1): void => { counts[key] = (counts[key] ?? 0) + amount; };
  for (const e of events) {
    add('events.' + e.event);
    if (e.event === 'app_open' && e.retention) add('retention.' + e.retention);
    const p = e.props;
    if (!p) continue;
    switch (e.event) {
      case 'run_start':
        add('runs.starts.byMode.' + String(p.mode));
        add('runs.starts.byHome.' + String(p.home));
        break;
      case 'run_end': {
        add('runs.ends.kmSum', p.km as number);
        add('runs.ends.secondsSum', p.seconds as number);
        add('runs.ends.byMode.' + String(p.mode));
        add('runs.ends.byHome.' + String(p.home));
        add('runs.ends.byCause.' + String(p.cause));
        const seconds = p.seconds as number;
        const bucket = seconds <= 10 ? 'lte10' : seconds <= 25 ? 'lte25' :
          seconds <= 60 ? 'lte60' : 'gt60';
        add('runs.ends.durationBuckets.' + bucket);
        break;
      }
      case 'share_click':
        add('shares.byFormat.' + String(p.format));
        break;
      case 'portal_click':
        add('portals.byPlacement.' + String(p.placement));
        add('portals.byHome.' + String(p.home));
        break;
      case 'pickup':
        add('pickups.byKind.' + String(p.kind));
        add('pickups.byMode.' + String(p.mode));
        break;
    }
  }
  return counts;
}

