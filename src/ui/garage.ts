import { isValidNickId, randomNickChoices, renderNick, type NickGender, type NickRng } from '../content/nicks';
import { UI } from '../content/pl';
import type { HomeCountry } from '../core/route';
import { UNLOCKABLE_CARS, unlockedSkins, unlockHint } from '../meta/unlocks';
import { HERO_SKINS, normalizeHeroSkin, type HeroSkinId } from '../render/sprites';
import './garage.css';

export interface GarageSelection {
  skin: HeroSkinId;
  nickId: string;
}
export interface GarageOptions extends Partial<GarageSelection> {
  home: HomeCountry;
  /** Suma przejechanych kilometrów, również z trybu łagodnego. */
  totalKm?: number;
  onChange: (selection: GarageSelection) => void;
  onClose?: () => void;
  rng?: NickRng;
}
const SKIN_NAMES: Record<HeroSkinId, string> = {
  default: UI.garageDefaultSkin,
  'pan-cebulek': UI.garagePanCebulek,
  'pani-cebulka': UI.garagePaniCebulka,
  'bus-kurierski': UI.garageBusKurierski,
  ...Object.fromEntries(UNLOCKABLE_CARS.map(({ id, name }) => [id, name])),
} as Record<HeroSkinId, string>;
function element<K extends keyof HTMLElementTagNameMap>(tag: K, className: string, value?: string): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  node.className = className;
  if (value !== undefined) node.textContent = value;
  return node;
}
function button(className: string, value: string): HTMLButtonElement {
  const node = element('button', className, value);
  node.type = 'button';
  return node;
}
function basePath(path: string): string {
  return (import.meta.env?.BASE_URL ?? './').replace(/\/?$/, '/') + path;
}
function portraitPath(skin: HeroSkinId): string {
  return basePath(skin === 'default' ? 'assets/hero/kombi-body.png' : 'assets/skins/' + skin + '/portrait.png');
}

/** Sześć innych poprawnych nicków, również gdy generator RNG jest deterministyczny. */
export function garageNickChoices(
  rng: NickRng, home: HomeCountry, gender: NickGender,
  previous: readonly string[] = [], pinned?: string,
): string[] {
  const blocked = new Set(previous);
  // W każdej próbce 12 niepowtarzalnych propozycji: poprzedni zestaw ma najwyżej 6.
  const candidates = randomNickChoices(rng, 12, home, gender)
    .filter((id) => !blocked.has(id) && id !== pinned);
  if (pinned && isValidNickId(pinned) && pinned.includes('-g-' + gender + '-')) {
    return [pinned, ...candidates.slice(0, 5)];
  }
  return candidates.slice(0, 6);
}

/** Samodzielny ekran DOM; disposer usuwa wyłącznie własne elementy i nasłuchy. */
export function mountGarage(container: HTMLElement, opts: GarageOptions): () => void {
  let disposed = false;
  const rng = opts.rng ?? Math.random;
  const totalKm = opts.totalKm ?? 0;
  const available = new Set(unlockedSkins(totalKm));
  let skin: HeroSkinId = normalizeHeroSkin(opts.skin, totalKm);
  let viewedSkin: HeroSkinId = skin;
  const persistedNick = opts.nickId && isValidNickId(opts.nickId) ? opts.nickId : undefined;
  let gender: NickGender = persistedNick?.includes('-g-f-') ? 'f' : 'm';
  let nickIds = garageNickChoices(rng, opts.home, gender, [], persistedNick);
  let nickId = persistedNick ?? nickIds[0];

  const root = element('section', 'ce-garage');
  root.setAttribute('aria-label', UI.garage);
  const head = element('header', 'ce-garage__header');
  const heading = element('div', 'ce-garage__heading');
  heading.append(element('p', 'ce-garage__eyebrow', UI.garageEyebrow), element('h2', '', UI.garage));
  head.append(heading);
  if (opts.onClose) {
    const close = button('ce-garage__close', '×');
    close.setAttribute('aria-label', UI.garageClose);
    close.addEventListener('click', () => { if (!disposed) opts.onClose?.(); });
    head.append(close);
  }
  root.append(head);

  const stage = element('div', 'ce-garage__stage');
  const sky = element('div', 'ce-garage__sky');
  sky.setAttribute('aria-hidden', 'true');
  const showroom = element('div', 'ce-garage__showroom');
  const back = button('ce-garage__arrow', '‹');
  back.setAttribute('aria-label', UI.garagePrevious);
  const forward = button('ce-garage__arrow', '›');
  forward.setAttribute('aria-label', UI.garageNext);
  const preview = element('div', 'ce-garage__portrait');
  preview.setAttribute('aria-hidden', 'true');
  const fallback = element('span', 'ce-garage__placeholder', '🚙');
  preview.append(fallback);
  const img = element('img', 'ce-garage__image');
  img.alt = '';
  img.decoding = 'async';
  let imageSequence = 0;
  function loadPortrait(): void {
    const sequence = ++imageSequence;
    fallback.hidden = true;
    img.hidden = false;
    img.classList.toggle('ce-garage__image--default', viewedSkin === 'default');
    img.onerror = () => {
      if (disposed || sequence !== imageSequence) return;
      if (img.dataset.fallback !== '1' && viewedSkin !== 'default') {
        img.dataset.fallback = '1';
        img.classList.add('ce-garage__image--default');
        img.src = portraitPath('default');
      } else {
        img.hidden = true;
        fallback.hidden = false;
      }
    };
    delete img.dataset.fallback;
    img.src = portraitPath(viewedSkin);
  }
  preview.append(img);
  const lockIcon = element('span', 'ce-garage__lock', '🔒');
  lockIcon.setAttribute('aria-hidden', 'true');
  lockIcon.hidden = true;
  preview.append(lockIcon);
  showroom.append(back, preview, forward);
  const skinName = element('p', 'ce-garage__skin-name');
  skinName.setAttribute('aria-live', 'polite');
  const lockHintNode = element('p', 'ce-garage__lock-hint');
  lockHintNode.setAttribute('role', 'status');
  lockHintNode.hidden = true;
  const counter = element('p', 'ce-garage__counter');
  const picks = element('div', 'ce-garage__picks');
  picks.setAttribute('role', 'group');
  picks.setAttribute('aria-label', UI.garageSkin);
  const pickButtons = HERO_SKINS.map((id) => {
    const isUnlocked = available.has(id);
    const pick = button('ce-garage__pick', isUnlocked ? SKIN_NAMES[id] : '🔒 ' + SKIN_NAMES[id]);
    pick.disabled = !isUnlocked;
    if (!isUnlocked) {
      const car = UNLOCKABLE_CARS.find((item) => item.id === id);
      if (car) {
        const hint = unlockHint(car.id, totalKm);
        pick.title = hint;
        pick.setAttribute('aria-label', SKIN_NAMES[id] + '. ' + hint);
      }
    }
    pick.addEventListener('click', () => changeSkin(id));
    picks.append(pick);
    return pick;
  });
  stage.append(sky, showroom, skinName, lockHintNode, counter, picks);
  root.append(stage);

  const section = element('div', 'ce-garage__nick-section');
  section.append(element('h3', 'ce-garage__label', UI.garageNick));
  const genderGroup = element('div', 'ce-garage__gender');
  genderGroup.setAttribute('role', 'group');
  genderGroup.setAttribute('aria-label', UI.garageGender);
  const male = button('ce-garage__gender-button', UI.garageMale);
  const female = button('ce-garage__gender-button', UI.garageFemale);
  genderGroup.append(male, female);
  section.append(genderGroup, element('p', 'ce-garage__hint', UI.garageNickHint));
  const nickList = element('div', 'ce-garage__nicks');
  nickList.setAttribute('role', 'group');
  nickList.setAttribute('aria-label', UI.garageNickChoices);
  section.append(nickList);
  const shuffle = button('ce-garage__shuffle', UI.garageShuffle);
  section.append(shuffle);
  root.append(section);
  container.append(root);

  function emit(): void { if (!disposed) opts.onChange({ skin, nickId }); }
  function refreshSkin(): void {
    const locked = !available.has(viewedSkin);
    const car = UNLOCKABLE_CARS.find((item) => item.id === viewedSkin);
    skinName.textContent = SKIN_NAMES[viewedSkin];
    preview.classList.toggle('ce-garage__portrait--locked', locked);
    lockIcon.hidden = !locked;
    lockHintNode.hidden = !locked || !car;
    lockHintNode.textContent = locked && car ? unlockHint(car.id, totalKm) : '';
    counter.textContent = (HERO_SKINS.indexOf(viewedSkin) + 1) + ' / ' + HERO_SKINS.length;
    pickButtons.forEach((pick, index) => {
      const active = HERO_SKINS[index] === skin;
      pick.setAttribute('aria-pressed', String(active));
    });
    loadPortrait();
  }
  function changeSkin(next: HeroSkinId): void {
    if (disposed || next === viewedSkin) return;
    viewedSkin = next;
    const selecting = available.has(next) && skin !== next;
    if (selecting) skin = next;
    refreshSkin();
    // Przeglądanie zamkniętego samochodu nie zmienia zapisanego wyboru.
    if (selecting) emit();
  }
  function moveSkin(offset: number): void {
    const index = (HERO_SKINS.indexOf(viewedSkin) + offset + HERO_SKINS.length) % HERO_SKINS.length;
    changeSkin(HERO_SKINS[index]);
  }
  back.addEventListener('click', () => moveSkin(-1));
  forward.addEventListener('click', () => moveSkin(1));
  showroom.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    moveSkin(event.key === 'ArrowLeft' ? -1 : 1);
  });

  function refreshNicks(): void {
    male.setAttribute('aria-pressed', String(gender === 'm'));
    female.setAttribute('aria-pressed', String(gender === 'f'));
    const nodes = nickIds.map((id) => {
      const candidate = button('ce-garage__nick', renderNick(id));
      candidate.setAttribute('aria-pressed', String(id === nickId));
      candidate.addEventListener('click', () => {
        if (disposed || nickId === id) return;
        nickId = id;
        refreshNicks();
        emit();
      });
      return candidate;
    });
    nickList.replaceChildren(...nodes);
  }
  function roll(nextGender: NickGender): void {
    if (disposed) return;
    const previous = nextGender === gender ? nickIds : [];
    gender = nextGender;
    nickIds = garageNickChoices(rng, opts.home, gender, previous);
    nickId = nickIds[0];
    refreshNicks();
    emit();
  }
  male.addEventListener('click', () => { if (gender !== 'm') roll('m'); });
  female.addEventListener('click', () => { if (gender !== 'f') roll('f'); });
  shuffle.addEventListener('click', () => roll(gender));

  refreshSkin();
  refreshNicks();
  // W starych ustawieniach nickId może nie istnieć: przekazujemy wygenerowaną opcję.
  if (!persistedNick) emit();

  return () => {
    if (disposed) return;
    disposed = true;
    imageSequence++;
    img.onerror = null;
    root.remove();
  };
}
