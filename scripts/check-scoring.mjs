// Self-check for the card scorer (core/rewardAdvisor.js) and card text parser (core/deckStats.js).
// Loads the browser scripts into one node:vm context, like <script> tags sharing globals.
// Usage: node scripts/check-scoring.mjs
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const FILES = ['ironclad', 'silent', 'defect', 'regent', 'necrobinder', 'colorless'].map(p => `data/cards-${p}.js`)
  .concat(['data/cards.js', 'data/constants.js', 'data/builds.js', 'data/bossTips.js',
    'core/state.js', 'core/deckStats.js', 'core/rewardAdvisor.js', 'core/storage.js', 'ui/helpers.js', 'ui/pickerView.js']);

// Minimal DOM/storage stubs: storage.js reads the HP inputs and localStorage.
const store = new Map();
const localStorage = { getItem: k => store.get(k) ?? null, setItem: (k, v) => store.set(k, String(v)), removeItem: k => store.delete(k) };
const document = { getElementById: () => ({ value: '70' }), addEventListener() {} };
const ctx = vm.createContext({ console, localStorage, document, window: {} });
for (const f of FILES) vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), ctx, { filename: f });
const run = code => vm.runInContext(code, ctx);
const setState = (char, act, deck, boss = null) =>
  run(`currentChar=${JSON.stringify(char)};currentAct=${act};syncRegionToAct();deck=${JSON.stringify(deck)};var selectedBoss=${JSON.stringify(boss)};`);
const score = name => run(`scoreCard(${JSON.stringify(name)})`);
const cards = pool => run(`ALL_CARDS.${pool}.filter(c => !c.isUpgraded)`);

let failed = 0;
const check = (label, ok, detail = '') => {
  if (!ok) failed++;
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${label}${detail ? '  (' + detail + ')' : ''}`);
};

// Parser
const value = name => run(`estimateCardValue(findCard(${JSON.stringify(name)}).card)`);
setState('ironclad', 1, {});
check('Defend reads 5 Block', value('Defend').blk === 5, `blk ${value('Defend').blk}`);
check('Strike+ reads 9 damage', value('Strike+').dmg === 9, `dmg ${value('Strike+').dmg}`);
check('Thunderclap reads as AoE', value('Thunderclap').aoe === true);

// Act 1, Ironclad starter deck
const starter = run('STARTING_DECKS.ironclad');
setState('ironclad', 1, starter);
const ic = cards('ironclad').filter(c => !c.multiplayer);
const sTier = ic.filter(c => c.tier === 'S').map(c => score(c.name));
check('every S-tier Ironclad card is PICK in act 1', sTier.every(s => s.verdict === 'pick'),
  sTier.filter(s => s.verdict !== 'pick').map(s => s.name + ' ' + s.score).join(', '));
const dTier = ic.filter(c => c.tier === 'D').map(c => score(c.name));
check('no D-tier Ironclad card is PICK in act 1', dTier.every(s => s.verdict !== 'pick'),
  dTier.filter(s => s.verdict === 'pick').map(s => s.name + ' ' + s.score).join(', '));
check('untiered strong Colorless (Flash of Steel) is not SKIP', score('Flash of Steel').verdict !== 'skip',
  `score ${score('Flash of Steel').score}`);
check('basic Strike is SKIP', score('Strike').verdict === 'skip');

// Fight needs: AoE vs a multi-enemy boss
setState('ironclad', 1, starter, 'The Kin');
const aoe = score('Thunderclap'), single = score('Uppercut');
check('vs The Kin: Thunderclap (C, AoE) beats Uppercut (C)', aoe.raw > single.raw, `${aoe.raw} vs ${single.raw}`);

// Deck need: block crisis
setState('ironclad', 1, { Strike: 10 });
const blockCard = score('Shrug It Off'), attackCard = score('Pommel Strike');
check('no-block deck: Shrug It Off need > Pommel Strike need', blockCard.parts.need > attackCard.parts.need,
  `${blockCard.parts.need} vs ${attackCard.parts.need}`);

// Build: committed deck in act 2 prefers its build's cards
const builds = run('BUILD_DATA.ironclad.builds');
const listed = b => [...(b.mustPick || []), ...(b.essential || []), ...(b.highPriority || [])];
const anyBuild = new Set(Object.values(builds).flatMap(b => [...listed(b), ...(b.synergy || [])]));
const [key, build] = Object.entries(builds).find(([, b]) => listed(b).length >= 4);
const owned = listed(build).slice(0, 3);
const tierOf = n => ic.find(c => c.name === n)?.tier;
const onBuild = listed(build).slice(3).find(n => tierOf(n) === 'B');
const offBuild = ic.find(c => c.tier === 'B' && !anyBuild.has(c.name))?.name;
if (onBuild && offBuild) {
  setState('ironclad', 2, { ...starter, ...Object.fromEntries(owned.map(n => [n, 1])) });
  const on = score(onBuild), off = score(offBuild);
  check(`act 2 ${key} build: ${onBuild} (B) beats off-build ${offBuild} (B)`, on.raw > off.raw, `${on.raw} vs ${off.raw}`);
} else check(`act 2 build test found B-tier cards for ${key}`, false, `on ${onBuild}, off ${offBuild}`);

// Never-take cards
setState('ironclad', 1, starter);
const coop = run('ALL_CARDS.colorless.find(c => c.multiplayer)').name;
check(`co-op card (${coop}) is SKIP with score 0`, score(coop).verdict === 'skip' && score(coop).score === 0);
check('curse (Injury) is SKIP with score 0', score('Injury').verdict === 'skip' && score('Injury').score === 0);
check('status (Wound) is SKIP with score 0', score('Wound').score === 0);

// Reward pool: best first, skip advice only when nothing is worth taking
const pool = run(`scoreRewardPool(['Strike', 'Offering', 'Iron Wave'])`);
check('reward pool sorts best first', pool[0].name === 'Offering', pool.map(s => s.name).join(', '));
check('no skip advice when a good card is offered', pool.skipAdvice === false);
check('skip advice when only weak cards are offered', run(`scoreRewardPool(['Strike', 'Injury']).skipAdvice`) === true);

// Region state: Act 1 region is picked at run start and remembered; saves restore it
run(`var _n = notifyListeners; notifyListeners = function(){}; selectedBoss = null;`);
setState('ironclad', 1, starter);
run(`restoreRegion(undefined)`);
check('no start region: both Act 1 regions in play', run(`!startRegion && inCurrentRegion('overgrowth') && inCurrentRegion('underdock')`));
run(`restoreRegion('underdock')`);
check('Underdock start limits Act 1 fights to Underdock', run(`currentRegion === 'underdock' && !inCurrentRegion('overgrowth')`));
run(`setAct(2)`);
check('Act 2 is Hive', run(`currentRegion === 'hive' && inCurrentRegion('hive') && !inCurrentRegion('underdock')`));
run(`setAct(1)`);
check('back in Act 1 the start region is remembered', run(`currentRegion === 'underdock'`));
run(`currentAct = 2; restoreRegion('hive')`);
check('older save storing the Act 2 region: no start region, still Hive', run(`startRegion === null && currentRegion === 'hive'`));
check('unknown region / boss is out of play, not a crash', run(`inCurrentRegion(undefined) === false && inCurrentRegion('nope') === false`));
run(`notifyListeners = _n;`);

// Card cost text: negative costs in the data (X / unplayable) used to throw in String.repeat
const costErrors = run(`(() => { const bad = [];
  ['ironclad','silent','defect','necrobinder','regent'].forEach(ch => { currentChar = ch;
    Object.values(ALL_CARDS).flat().forEach(c => { try { costText(c); cardOrbHtml(c, true); } catch (e) { bad.push(c.name); } }); });
  return bad; })()`);
check('cost text renders for every card as every character', costErrors.length === 0, costErrors.slice(0, 5).join(', '));

// Deck stats: curses are dead draws, hybrid types split across axes
setState('ironclad', 1, { Strike: 5, Injury: 2 });
check('curses count as dead cards', run(`getDeckStats().other`) === 2 && run(`getDrawBalance().deadDraw`) === 2);
const hybrid = run(`ALL_CARDS.ironclad.find(c => c.type === 'atk_skl')`);
if (hybrid) {
  setState('ironclad', 1, { [hybrid.name]: 2 });
  const st = run(`getDeckStats()`);
  check(`hybrid ${hybrid.name} (atk_skl) splits attack/scale`, st.atk === 1 && st.scl === 1, `atk ${st.atk} scl ${st.scl}`);
}

// Upgrade suggestions
setState('ironclad', 1, { Bash: 1, 'Bash+': 1, Injury: 1, "Ascender's Bane": 1 });
const ups = run(`getUpgradeCandidates().map(c => c.name)`);
check('upgrade list keeps Bash with a Bash+ beside it', ups.includes('Bash'), ups.join(', '));
check('upgrade list skips curses', !ups.includes('Injury') && !ups.includes("Ascender's Bane"), ups.join(', '));

// Import / save validation (normalizeRun) — untrusted files and localStorage
const norm = d => run(`normalizeRun(${JSON.stringify(d)})`);
const throws = d => { try { norm(d); return false; } catch { return true; } };
check('import rejects prototype keys as character', throws({ char: '__proto__', deck: { Strike: 1 } }) && throws({ char: 'toString', deck: { Strike: 1 } }));
check('import rejects a file with no deck', throws({ char: 'ironclad' }));
const n1 = norm({ char: 'ironclad', act: '2', asc: 42, deck: { Strike: 1e9, '<img src=x onerror=alert(1)>': 1, Bash: 'abc' },
  relics: ['Kunai', 5, 'x'.repeat(100)], boss: 'Not A Boss' });
check('import drops unknown / script card names and bad counts', JSON.stringify(n1.deck) === '{"Strike":99}', JSON.stringify(n1.deck));
check('import coerces act, clamps asc, filters relics, drops unknown boss',
  n1.act === 2 && n1.asc === 0 && JSON.stringify(n1.relics) === '["Kunai"]' && n1.boss === null);
check('import rejects a deck of only unknown cards', throws({ char: 'ironclad', deck: { '<b>': 3 } }));
const boss = run(`Object.keys(BOSS_TO_REGION)[0]`);
run(`currentChar='ironclad'; currentAct=2; startRegion='underdock'; currentAsc=6; deck={Strike:4,'Bash+':1}; relics=['Kunai']; var selectedBoss=${JSON.stringify(boss)};`);
const rt = norm(JSON.parse(JSON.stringify(run(`currentRun()`))));
check('export -> import round-trips asc, relics, boss, region',
  rt.asc === 6 && rt.act === 2 && rt.region === 'underdock' && rt.relics[0] === 'Kunai' && rt.boss === boss && rt.deck['Bash+'] === 1);
check('esc escapes HTML', run(`esc('<a href="x">\\'&')`) === '&lt;a href=&quot;x&quot;&gt;&#39;&amp;');

console.log(failed ? `\n${failed} check(s) failed` : '\nall checks passed');
process.exit(failed ? 1 : 0);
