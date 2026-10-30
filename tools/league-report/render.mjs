import { COUNTRIES, formatKm, previousWeek, rankLeague } from './data.mjs';

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]);
}

export function formatWarsaw(date) {
  return new Intl.DateTimeFormat('pl-PL', {
    timeZone: 'Europe/Warsaw', year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).format(date);
}

const hooks = {
  BE: 'Kombi z Belgii ma bagaż po sam dach. Przed nami jeszcze kilka objazdów!',
  NL: 'Holenderska ekipa mija kolejne remonty i liczy każdy przejechany kilometr.',
  DE: 'Z Niemiec do Polski? Czasem nawet prosta trasa ma swoje niespodzianki.',
  UK: 'Z Wielkiej Brytanii do domu droga długa, a w kombi nie brakuje słoików.',
  FR: 'Francuska ekipa pakuje walizki. Czy na dachu zostało jeszcze miejsce?',
  CH: 'Ze Szwajcarii ruszamy w stronę Polski. Kilometry nie liczą się same!',
  NO: 'Norweska ekipa ma przed sobą kawał drogi i niejeden zakręt.',
  DK: 'Duńska ekipa wie, że każda paczka od mamy waży swoje.',
};

/** Jeden samodzielny post na każdy z ośmiu krajów. Pięć hashtagów, pierwszy krajowy. */
export function buildPostsMarkdown(current, previous, { gameUrl, mock = false, generatedAt = new Date() }) {
  const { rows, biggestChange } = rankLeague(current, previous);
  const byCountry = new Map(rows.map((row) => [row.code, row]));
  const stamp = formatWarsaw(generatedAt);
  const parts = [
    `# Liga Polonii — raport ${current.week}`,
    '',
    `Źródło: Liga Polonii, tygodniowe sumy zweryfikowanych kilometrów. Stan odczytu: ${stamp} (Europe/Warsaw).`,
    `Porównanie: ${previous ? previous.week : 'brak danych za poprzedni tydzień'}.`,
    mock ? '**DANE TESTOWE — NIE PUBLIKOWAĆ. Wyniki pochodzą z generatora mock, nie z Firestore.**' : '',
    '',
  ];
  for (const country of COUNTRIES) {
    const row = byCountry.get(country.code);
    const summary = row.stats
      ? `W tygodniu ${current.week} Polonia z ${country.inCountry} przejechała łącznie ${formatKm(row.stats.km)}. To miejsce ${row.place} w Lidze Polonii.`
      : `W raporcie ${current.week} nie ma jeszcze danych o zweryfikowanych kilometrach z ${country.inCountry}.`;
    const comparison = row.delta === null ? 'Nie podajemy zmiany bez porównywalnych danych z poprzedniego tygodnia.'
      : row.delta > 0 ? `To o ${formatKm(row.delta)} więcej niż tydzień wcześniej.`
        : row.delta < 0 ? `To o ${formatKm(-row.delta)} mniej niż tydzień wcześniej.`
          : 'Wynik jest taki sam jak tydzień wcześniej.';
    const special = biggestChange?.code === country.code
      ? 'To największa różnica w sumie kilometrów względem poprzedniego tygodnia spośród porównywalnych ekip.'
      : '';
    const tags = [country.hashtag, '#CebulakExpress', '#LigaPolonii', '#KierunekPolska', '#DrogaDoDomu'];
    parts.push(`## ${country.code} — ${country.name}`, '',
      ...(mock ? ['DANE TESTOWE — NIE PUBLIKOWAĆ.', ''] : []),
      `${hooks[country.code]} ${summary} ${comparison} ${special}`.trim(), '',
      `Sprawdź swoją trasę i zobacz, ile kilometrów dołożysz do wspólnego wyniku. Z jakiego miasta ruszasz?`, '',
      `Zagraj: ${gameUrl}`, '', tags.join(' '), '', '---', '');
  }
  return parts.join('\n');
}

const commonCss = `
*{box-sizing:border-box}
html,body{margin:0;padding:0;width:100%;height:100%;overflow:hidden}
body{font-family:Arial,'DejaVu Sans',sans-serif;color:#193c35}
.poster{position:relative;isolation:isolate;display:flex;flex-direction:column;overflow:hidden;
  background:radial-gradient(circle at 85% 12%,#ffe08a 0 8%,transparent 23%),
  linear-gradient(157deg,#c6f1ed 0%,#f1fbe8 48%,#ffdfad 100%)}
.poster::before{content:'';position:absolute;z-index:-1;left:-130px;bottom:-130px;width:570px;height:450px;
  border-radius:50%;background:#6bc3a2;opacity:.24;transform:rotate(-18deg)}
.poster::after{content:'';position:absolute;z-index:-1;right:-105px;top:200px;width:300px;height:220px;
  border:25px solid #ffffff80;border-radius:100px;transform:rotate(-21deg)}
.brand{display:flex;align-items:center;justify-content:center;background:#fffdf0;
  border:5px solid #214940;border-radius:24px;box-shadow:7px 8px 0 #24554e2b;padding:6px}
.brand img{max-width:100%;max-height:100%;object-fit:contain}
.brand-fallback{font-size:20px;font-weight:900;text-align:center;line-height:1.07}
.eyebrow{font-size:28px;font-weight:900;letter-spacing:3px;color:#155b50}
.week-pill{display:inline-flex;align-items:center;justify-content:center;color:#fff;
  background:#1c6555;border:4px solid #1d4a42;border-radius:25px;padding:12px 24px;font-weight:900;font-size:29px}
.demo-label{position:absolute;z-index:5;right:0;top:0;color:#fff;background:#ae242b;
  padding:13px 23px;border-bottom-left-radius:14px;font-size:23px;letter-spacing:.5px;font-weight:900}
.cta{background:#125a47;border:6px solid #1a4137;border-radius:28px;color:white;
  display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:10px 27px;box-shadow:0 10px 0 #1a413733}
.cta .cta-heading{font-weight:900;letter-spacing:1px;color:#ffdc7f}
.cta .cta-url{font-weight:800;max-width:100%;overflow-wrap:anywhere;line-height:1.15}
.smallprint{font-size:18px;font-weight:700;color:#33574d;text-align:center}
.flag{object-fit:contain;flex:none;filter:drop-shadow(0 4px 1px #143a3640)}
.flag-fallback{display:inline-flex;align-items:center;justify-content:center;color:#144c3f;background:#d1e9e2;
  border:3px solid #194b40;border-radius:10px;font-weight:900}
`;

const postCss = `
.poster--post{width:1080px;height:1350px;padding:40px 48px 36px;gap:20px}
.post-top{height:112px;display:flex;align-items:center;gap:28px;flex:none}
.post-top .brand{width:185px;height:110px}
.post-title{height:148px;flex:none;display:flex;flex-direction:column;justify-content:center;gap:3px}
.post-title .eyebrow{font-size:27px}
.post-title h1{font-size:83px;line-height:1;margin:0;letter-spacing:-2px;color:#103e39;
  text-shadow:4px 4px 0 #ffffffa8}
.post-title p{font-weight:700;font-size:26px;margin:7px 0 0}
.table-panel{min-height:0;flex:1;background:#fffaf0;border:6px solid #24483c;border-radius:32px;
  box-shadow:10px 12px 0 #153d382d;padding:22px 25px;display:flex;flex-direction:column}
.table-head{display:flex;align-items:center;justify-content:space-between;height:54px;
  border-bottom:3px solid #c5d6c5;font-size:28px;font-weight:900;margin-bottom:9px}
.table-head small{font-size:20px;letter-spacing:1px;color:#527166}
.league-rows{flex:1;display:flex;flex-direction:column;gap:7px;min-height:0}
.league-row{display:flex;flex:1;align-items:center;gap:19px;padding:4px 15px;
  background:#f2f5e9;border:3px solid transparent;border-radius:17px;min-height:0}
.league-row.leader{background:#ffe5a3;border-color:#e5ad36;box-shadow:inset 0 0 0 2px #fff7dd}
.position{font-size:29px;font-weight:900;width:45px;text-align:center;flex:none;color:#2a5449}
.league-row .flag{width:67px;height:47px}
.league-row .flag-fallback{width:65px;height:45px;font-size:24px}
.country-name{font-size:31px;line-height:1.05;font-weight:900;flex:1;letter-spacing:-.4px}
.leader-pill{font-size:15px;color:#75430c;border-radius:9px;background:#fff9e0;padding:6px 7px;letter-spacing:1px}
.country-km{font-size:29px;white-space:nowrap;letter-spacing:-.6px;font-weight:900;color:#105444}
.country-km.missing{font-size:21px;color:#738075}
.post-cta{height:112px;flex:none;gap:4px}
.post-cta .cta-heading{font-size:27px}
.post-cta .cta-url{font-size:27px}
.post-footer{height:25px;flex:none}
`;

const reelCss = `
.poster--reel{width:1080px;height:1920px;padding:67px 55px 65px;gap:26px}
.reel-top{display:flex;align-items:center;justify-content:space-between;flex:none;height:135px}
.reel-top .brand{width:232px;height:134px}
.reel-heading{flex:none;padding:20px 7px 0}
.reel-heading h1{font-size:81px;line-height:1.06;letter-spacing:-1.5px;margin:14px 0;color:#103e39;
  text-shadow:4px 4px 0 #ffffffa8}
.reel-heading .sub{font-size:30px;font-weight:700;margin:0}
.change-card{flex:1;min-height:0;display:flex;flex-direction:column;align-items:center;
  border:8px solid #24483c;border-radius:48px;box-shadow:13px 15px 0 #1a40362e;
  background:linear-gradient(164deg,#fffdf0 0%,#ffefc5 72%,#ffd885 100%);
  position:relative;overflow:hidden;padding:60px 35px 36px;text-align:center}
.change-card:before{content:'';position:absolute;width:450px;height:450px;border:20px dashed #ffc35a5c;
  border-radius:50%;top:80px;right:-280px}
.crest{font-weight:900;letter-spacing:4px;font-size:32px;color:#205747;margin:0 0 35px}
.change-flag{width:246px;height:165px;object-fit:contain;margin-bottom:29px;
  filter:drop-shadow(0 9px 2px #1d4b3b3a)}
.change-flag.flag-fallback{display:flex;width:240px;height:160px;font-size:80px}
.change-country{font-size:79px;line-height:1.03;letter-spacing:-1px;font-weight:900;margin:10px 0 27px;color:#133f36}
.change-value{font-size:123px;line-height:1.06;font-weight:900;letter-spacing:-4px;color:#086b50;
  margin:18px 0 22px;white-space:nowrap}
.change-value.negative{color:#a75629}
.change-value.none{font-size:76px;white-space:normal;letter-spacing:-1px}
.change-explain{max-width:760px;font-size:34px;line-height:1.32;font-weight:800;color:#355d4f;margin:0 0 20px}
.change-spacer{flex:1;min-height:10px}
.comparison{display:flex;width:100%;gap:15px;justify-content:center;margin-top:15px}
.comparison .comp{width:48%;padding:19px 10px;border:3px solid #dfbd83;background:#fffbeb;border-radius:21px}
.comp small{display:block;font-size:23px;font-weight:800;color:#4e6857}
.comp strong{display:block;font-size:40px;font-weight:900;color:#164d3d;margin-top:8px}
.reel-cta{height:174px;flex:none;gap:8px}
.reel-cta .cta-heading{font-size:35px}
.reel-cta .cta-url{font-size:32px}
.reel-footer{height:30px;flex:none}
`;

function assetFlag(assets, code, className) {
  const source = assets.flags?.[code];
  return source ? `<img class="flag ${className}" src="${escapeHtml(source)}" alt="Flaga ${escapeHtml(code)}">`
    : `<span class="flag-fallback ${className}">${escapeHtml(code)}</span>`;
}
function assetLogo(assets) {
  return `<div class="brand">${assets.logo
    ? `<img src="${escapeHtml(assets.logo)}" alt="Cebulak Express — Kierunek Polska">`
    : '<span class="brand-fallback">Cebulak Express<br>Kierunek Polska</span>'}</div>`;
}
function documentHtml(body, css) {
  return `<!doctype html><html lang="pl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><style>${commonCss}${css}</style></head><body>${body}</body></html>`;
}
function demoLabel(mock) {
  return mock ? '<div class="demo-label">DEMO · DANE TESTOWE · NIE PUBLIKOWAĆ</div>' : '';
}

export function postHtml(current, previous, { gameUrl, mock = false, assets = {}, generatedAt = new Date() }) {
  const { rows } = rankLeague(current, previous);
  const items = rows.map((row) => `<div class="league-row${row.place === 1 ? ' leader' : ''}">
      <span class="position">${row.place ? `${row.place}.` : '—'}</span>
      ${assetFlag(assets, row.code, '')}
      <span class="country-name">${escapeHtml(row.name)}${row.place === 1 ? ' <span class="leader-pill">LIDER</span>' : ''}</span>
      <span class="country-km${row.stats ? '' : ' missing'}">${row.stats ? escapeHtml(formatKm(row.stats.km)) : 'brak danych'}</span>
    </div>`).join('');
  return documentHtml(`<section class="poster poster--post">
    ${demoLabel(mock)}
    <header class="post-top">${assetLogo(assets)}<span class="week-pill">TYDZIEŃ ${escapeHtml(current.week)}</span></header>
    <div class="post-title"><div class="eyebrow">POLONIA W DRODZE DO POLSKI</div><h1>LIGA POLONII</h1><p>Wspólnie zbieramy kilometry. Oto kolejność ekip!</p></div>
    <main class="table-panel"><div class="table-head"><span>RANKING KRAJÓW</span><small>SUMA KM</small></div><div class="league-rows">${items}</div></main>
    <div class="cta post-cta"><span class="cta-heading">ZAGRAJ I DOŁÓŻ SWOJE KILOMETRY</span><span class="cta-url">Zagraj: ${escapeHtml(gameUrl)}</span></div>
    <div class="smallprint post-footer">Liga Polonii · Stan: ${escapeHtml(formatWarsaw(generatedAt))} (Warszawa)${mock ? ' · MOCK' : ''}</div>
  </section>`, postCss);
}

export function reelHtml(current, previous, { gameUrl, mock = false, assets = {}, generatedAt = new Date() }) {
  const { biggestChange, leader } = rankLeague(current, previous);
  const row = biggestChange ?? leader;
  const delta = biggestChange?.delta;
  const noComparison = delta === null || delta === undefined;
  const label = noComparison ? 'BRAK DANYCH DO PORÓWNANIA' : delta > 0 ? 'WIĘCEJ NIŻ TYDZIEŃ WCZEŚNIEJ'
    : delta < 0 ? 'MNIEJ NIŻ TYDZIEŃ WCZEŚNIEJ' : 'TAKI SAM WYNIK JAK TYDZIEŃ TEMU';
  const value = noComparison ? 'BRAK PORÓWNANIA' : `${delta > 0 ? '+' : delta < 0 ? '−' : ''}${formatKm(Math.abs(delta))}`;
  const explanation = noComparison
    ? 'Nie mamy dwóch porównywalnych tygodni. Pokazujemy lidera bieżącego zestawienia.'
    : `Różnica sumy zweryfikowanych kilometrów względem tygodnia ${previous.week}.`;
  const oldWeek = previous ? previous.week : 'poprzedni tydzień';
  return documentHtml(`<section class="poster poster--reel">
    ${demoLabel(mock)}
    <header class="reel-top">${assetLogo(assets)}<span class="week-pill">${escapeHtml(current.week)}</span></header>
    <div class="reel-heading"><span class="eyebrow">LIGA POLONII · RAPORT TYGODNIA</span><h1>NAJWIĘKSZA<br>ZMIANA TYGODNIA</h1><p class="sub">Polonijne kombi nie zwalnia tempa.</p></div>
    <main class="change-card">
      <p class="crest">${escapeHtml(label)}</p>
      ${row ? assetFlag(assets, row.code, 'change-flag') : ''}
      <div class="change-country">${row ? escapeHtml(row.name) : 'Brak wyników'}</div>
      <div class="change-value${noComparison ? ' none' : delta < 0 ? ' negative' : ''}">${escapeHtml(value)}</div>
      <p class="change-explain">${escapeHtml(explanation)}</p>
      <div class="change-spacer"></div>
      <div class="comparison"><div class="comp"><small>${escapeHtml(oldWeek)}</small><strong>${biggestChange ? escapeHtml(formatKm(biggestChange.previousKm)) : 'brak danych'}</strong></div>
      <div class="comp"><small>${escapeHtml(current.week)}</small><strong>${row?.stats ? escapeHtml(formatKm(row.stats.km)) : 'brak danych'}</strong></div></div>
    </main>
    <div class="cta reel-cta"><span class="cta-heading">JEDEN DOTYK · KOLEJNE KILOMETRY</span><span class="cta-url">Zagraj: ${escapeHtml(gameUrl)}</span></div>
    <div class="smallprint reel-footer">Odczyt: ${escapeHtml(formatWarsaw(generatedAt))} (Warszawa)${mock ? ' · DANE TESTOWE' : ''}</div>
  </section>`, reelCss);
}
