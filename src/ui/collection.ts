import { COUNTRY_NAME, fill, localized } from '../content/i18n';
import { localizedCityName } from '../content/lang/cities';
import { MEDAL_IDS, POSTCARDS, type MedalId, type Postcard, type Progress } from '../meta/progress';
import { COLLECTION_TEXT, MEDAL_TEXT } from './collection-text';
import './collection.css';

const number = new Intl.NumberFormat('pl-PL');

/** Teksty albumu w bieżącym języku (polski oryginał w collection-text.ts). */
function texts(): Record<keyof typeof COLLECTION_TEXT, string> {
  return localized('COLLECTION') ?? COLLECTION_TEXT;
}
function medalText(id: MedalId): { name: string; description: string; symbol: string } {
  const translated = localized('MEDALS')?.[id];
  return translated ? { ...translated, symbol: MEDAL_TEXT[id].symbol } : MEDAL_TEXT[id];
}

function element<K extends keyof HTMLElementTagNameMap>(
  tag: K, className: string, value?: string,
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (value !== undefined) node.textContent = value;
  return node;
}

function assetPath(path: string): string {
  return (import.meta.env?.BASE_URL ?? './').replace(/\/?$/, '/') + path;
}

function postcardCard(card: Postcard, owned: boolean): HTMLElement {
  const T = texts();
  const figure = element('figure', 'ce-collection__postcard' + (owned ? ' ce-collection__postcard--owned' : ' ce-collection__postcard--locked'));
  const photo = element('div', 'ce-collection__photo');
  const pin = element('span', 'ce-collection__stamp', owned ? '✓' : '?');
  pin.setAttribute('aria-hidden', 'true');
  photo.append(pin);
  if (owned) {
    const image = element('img', 'ce-collection__image');
    image.alt = '';
    image.loading = 'lazy';
    image.decoding = 'async';
    let fallback = false;
    image.onerror = () => {
      if (!fallback) {
        fallback = true;
        image.src = assetPath(`assets/landmarks/${card.id}.png`);
      } else {
        image.onerror = null;
        image.remove(); // CSS pokazuje ilustrację zastępczą bez uszkodzonej ikony.
      }
    };
    image.src = assetPath(`assets/postcards/${card.id}.png`);
    photo.prepend(image);
  } else {
    const mark = element('span', 'ce-collection__unknown', '?');
    mark.setAttribute('aria-hidden', 'true');
    photo.append(mark);
  }
  const caption = element('figcaption', 'ce-collection__postcard-caption');
  caption.append(
    element('strong', '', localizedCityName(card)),
    element('span', '', COUNTRY_NAME[card.country]),
    element('small', '', owned ? T.unlocked : T.locked),
  );
  figure.append(photo, caption);
  return figure;
}

function medalCard(id: (typeof MEDAL_IDS)[number], owned: boolean): HTMLElement {
  const T = texts();
  const text = medalText(id);
  const card = element('li', 'ce-collection__medal' + (owned ? ' ce-collection__medal--owned' : ' ce-collection__medal--locked'));
  const emblem = element('span', 'ce-collection__emblem', text.symbol);
  emblem.setAttribute('aria-hidden', 'true');
  const info = element('div', 'ce-collection__medal-info');
  info.append(
    element('strong', '', text.name),
    element('span', '', text.description),
    element('small', '', owned ? T.unlocked : T.medalLocked),
  );
  card.append(emblem, info);
  return card;
}

function stat(label: string, value: string): HTMLElement {
  const item = element('div', 'ce-collection__stat');
  item.append(element('span', '', label), element('strong', '', value));
  return item;
}

/** Samodzielny ekran DOM. Zwrócona funkcja usuwa tylko elementy tego modułu. */
export function mountCollection(container: HTMLElement, progress: Progress, onClose: () => void): () => void {
  let disposed = false;
  const T = texts();
  const root = element('section', 'ce-collection');
  root.setAttribute('aria-label', T.title);
  const header = element('header', 'ce-collection__header');
  const heading = element('div', 'ce-collection__heading');
  heading.append(element('p', 'ce-collection__eyebrow', T.eyebrow), element('h2', '', T.title));
  const close = element('button', 'ce-collection__close', '×');
  close.type = 'button';
  close.setAttribute('aria-label', T.close);
  close.addEventListener('click', () => { if (!disposed) onClose(); });
  header.append(heading, close);
  root.append(header, element('p', 'ce-collection__subtitle', T.subtitle));

  const stats = element('div', 'ce-collection__stats');
  stats.append(
    stat(T.totalRuns, number.format(progress.stats.runs)),
    stat(T.totalKm, `${number.format(progress.stats.totalKm)} km`),
    stat(T.totalArrivals, number.format(progress.stats.arrivals)),
  );
  root.append(stats);

  const ownedPostcards = new Set(progress.postcards);
  const postcardsSection = element('section', 'ce-collection__section');
  const postcardHeading = element('div', 'ce-collection__section-heading');
  postcardHeading.append(
    element('h3', '', T.postcards),
    element('span', 'ce-collection__count', `${ownedPostcards.size} / ${POSTCARDS.length}`),
  );
  const postcards = element('div', 'ce-collection__postcards');
  // Odkryte jako pierwsze; w grupie porządek alfabetyczny z katalogu.
  for (const card of [...POSTCARDS].sort((a, b) => Number(ownedPostcards.has(b.id)) - Number(ownedPostcards.has(a.id)))) {
    postcards.append(postcardCard(card, ownedPostcards.has(card.id)));
  }
  postcardsSection.append(postcardHeading, postcards);
  root.append(postcardsSection);

  const ownedMedals = new Set(progress.medals);
  const medalsSection = element('section', 'ce-collection__section ce-collection__section--medals');
  const medalsHeading = element('div', 'ce-collection__section-heading');
  medalsHeading.append(
    element('h3', '', T.medals),
    element('span', 'ce-collection__count', `${ownedMedals.size} / ${MEDAL_IDS.length}`),
  );
  const medals = element('ul', 'ce-collection__medals');
  for (const id of MEDAL_IDS) medals.append(medalCard(id, ownedMedals.has(id)));
  medalsSection.append(medalsHeading, medals);
  root.append(medalsSection);
  container.append(root);

  return () => {
    if (disposed) return;
    disposed = true;
    for (const img of root.querySelectorAll('img')) img.onerror = null;
    root.remove();
  };
}

/** Formatowanie toastów bez HTML; wywołujący korzysta z istniejącego toast() w main.ts. */
export function postcardToast(card: Postcard): string {
  return fill(texts().newPostcard, { city: localizedCityName(card) });
}
export function medalToast(id: (typeof MEDAL_IDS)[number]): string {
  return fill(texts().newMedal, { name: medalText(id).name });
}
