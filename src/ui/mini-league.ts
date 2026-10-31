import { COUNTRY_NAME } from '../content/i18n';
import { HOME_COUNTRIES, type HomeCountry } from '../core/route';
import type { RankingApi } from '../net/api';
import { warsawWeekKey } from '../net/week';

/**
 * Pierwsza trójka Ligi Polonii na ekranie końca. Ładowana leniwie po przejeździe —
 * nie jest potrzebna do pierwszej klatki. Pusta lista = nie pokazujemy tabelki.
 */
export async function miniLeagueRows(api: Pick<RankingApi, 'getLeague'>, home: HomeCountry): Promise<HTMLLIElement[]> {
  const data = await api.getLeague(warsawWeekKey());
  const top = HOME_COUNTRIES
    .map((country) => ({ country, km: data.countries[country]?.km ?? 0 }))
    .filter((entry) => Number.isFinite(entry.km) && entry.km > 0)
    .sort((a, b) => b.km - a.km)
    .slice(0, 3);
  return top.map(({ country, km }, index) => {
    const li = document.createElement('li');
    if (country === home) li.classList.add('is-home');
    const place = document.createElement('span');
    place.className = 'mini-league__place';
    place.textContent = String(index + 1) + '.';
    const flag = document.createElement('img');
    flag.src = import.meta.env.BASE_URL + 'assets/ui/flag-' + country.toLowerCase() + '.png';
    flag.alt = '';
    const name = document.createElement('span');
    name.textContent = COUNTRY_NAME[country];
    const score = document.createElement('strong');
    score.className = 'mini-league__score';
    score.textContent = new Intl.NumberFormat('pl-PL').format(km) + ' km';
    li.append(place, flag, name, score);
    return li;
  });
}
