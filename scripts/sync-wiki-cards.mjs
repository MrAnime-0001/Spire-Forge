// Sync data/cards-*.js with the Slay the Spire 2 wiki (slaythespire.wiki.gg Lua data modules).
// Keeps the app's own fields (type role tag, note); refreshes cost, rarity, text, card type, co-op flag.
// Usage: node scripts/sync-wiki-cards.mjs          -> rewrite card files + print report
//        node scripts/sync-wiki-cards.mjs --check  -> run parser self-check only
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const POOLS = ['Ironclad', 'Silent', 'Defect', 'Regent', 'Necrobinder', 'Colorless'];
const SKIP_RARITY = new Set(['Status', 'Curse', 'Event', 'Quest']); // app keeps its own entries for these
const KEEP_APP_ONLY = new Set(['token', 'special', 'event', 'ancient']);
const ENERGY = { IE: 'Ironclad', SE: 'Silent', DE: 'Defect', RE: 'Regent', NE: 'Necrobinder', CE: 'Colorless' };

// Patch changes the wiki hasn't picked up yet. Same syntax as wiki Text. (v0.111.0 beta, 2026-08-14)
const OVERRIDES = {
  'Expect a Fight': { Cost: 3, CostPlus: 3, type: 'def', note: 'Reworked in v0.111: now a Block card that scales with Strength.',
    Text: 'Gain [15|16] $Block.<br>Gains [5|8] additional $Block for each $Strength you have.' },
  'Guiding Star': { StarCost: 1, note: '12 dmg now, draw 2 next turn (v0.111). Cheap Star-cost attack.', Text: 'Deal [12|13] damage.<br>Next turn, draw [2|3] cards.' },
};

export function parseLua(lua) {
  const out = [];
  for (const m of lua.matchAll(/\["([^"]+)"\]\s*=\s*\{([\s\S]*?)\n  \}/g)) {
    const f = { name: m[1].replace(/ \((Ironclad|Silent|Defect|Regent|Necrobinder)\)$/, '') };
    for (const kv of m[2].matchAll(/(\w+)\s*=\s*("(?:[^"\\]|\\.)*"|[^,\n]+)/g)) {
      const v = kv[2].trim();
      f[kv[1]] = v.startsWith('"') ? v.slice(1, -1).replace(/\\"/g, '"') : /^-?\d+$/.test(v) ? Number(v) : v;
    }
    f.noList = /NoList\s*=\s*true/.test(m[2]);
    out.push(f);
  }
  return out;
}

export function renderText(text, upgraded) {
  return text
    .replace(/\[([^\[\]|]*)\|([^\[\]]*)\]/g, (_, a, b) => (upgraded ? b : a))
    .replace(/\{\{\w+\|([^{}|]*)(?:\|([^{}|]*))?[^{}]*\}\}/g, (_, a, b) => b || a) // {{C2|Shiv|Shivs}}, {{KW|Osty|Osty's|2}}
    .replace(/@Gold\b/g, 'StS2 Gold.png')
    .replace(/@(IE|SE|DE|RE|NE|CE)/g, (_, k) => `StS2 Energy${ENERGY[k]}.png`)
    .replace(/@ST/g, 'StS2 StarRegent.png')
    .replace(/\$Block\b/g, 'StS2 Intent Defend.png Block')
    .replace(/\$(\w+)/g, '$1')
    .replace(/<br\s*\/?>/g, ' ')
    .replace(/\s+/g, ' ').trim();
}

const roleTag = (w, text) => w.Type === 'Attack' ? 'atk' : w.Type === 'Power' ? 'pow' : /\$Block/.test(text) ? 'def' : 'skl';
const cost = c => c === -1 ? 'X' : c;

// Upgrade notes were copies of old descriptions, so they're left empty; the popup shows the live text.
function toEntries(w, old) {
  const o = OVERRIDES[w.name] || {};
  const src = { ...w, ...o };
  const base = {
    name: w.name, type: o.type || old?.type || roleTag(src, src.Text), cost: cost(src.Cost),
    rarity: src.Rarity.toLowerCase(), cardType: src.Type, note: o.note ?? old?.note ?? '',
    description: renderText(src.Text, false),
  };
  if (src.StarCost !== undefined) base.starCost = src.StarCost;
  if (src.Multiplayer === 'true') base.multiplayer = true;
  const plus = { ...base, name: w.name + '+', cost: cost(src.CostPlus ?? src.Cost),
    note: '', description: renderText(src.Text, true), isUpgraded: true, baseCard: w.name };
  return [base, plus];
}

function loadApp(pool) {
  const src = fs.readFileSync(path.join(ROOT, `data/cards-${pool.toLowerCase()}.js`), 'utf8');
  return new Function(src.replace(/const\s+\w+_CARDS\s*=/, 'return') )();
}

function writePool(pool, cards) {
  const body = JSON.stringify(cards, null, 2).replace(/^/gm, '  ').trimStart();
  fs.writeFileSync(path.join(ROOT, `data/cards-${pool.toLowerCase()}.js`),
    `// Card definitions for STS2 Build Advisor - ${pool}\n// Keep this file data-only.\n` +
    `// Synced from slaythespire.wiki.gg by scripts/sync-wiki-cards.mjs\n\nconst ${pool.toUpperCase()}_CARDS = ${body};\n`);
}

async function fetchPool(pool) {
  const url = `https://slaythespire.wiki.gg/api.php?action=parse&page=Module:Cards/StS2_data/${pool}&prop=wikitext&format=json`;
  const res = await fetch(url, { headers: { 'User-Agent': 'SpireForge card sync' } });
  if (!res.ok) throw new Error(`${pool}: HTTP ${res.status}`);
  return parseLua((await res.json()).parse.wikitext['*']);
}

function check() {
  const lua = `["Bash"] = {\n    Cost = 2,\n    Color = "Ironclad",\n    Type = "Attack",\n    Rarity = "Basic",\n` +
    `    Text = "Deal [8|10] damage.<br>Apply [2|3] $Vulnerable."\n  },`;
  const [w] = parseLua(lua);
  const [b, p] = toEntries(w);
  const eq = (a, e) => { if (a !== e) throw new Error(`expected ${JSON.stringify(e)}, got ${JSON.stringify(a)}`); };
  eq(b.cost, 2); eq(b.type, 'atk'); eq(b.cardType, 'Attack');
  eq(b.description, 'Deal 8 damage. Apply 2 Vulnerable.');
  eq(p.name, 'Bash+'); eq(p.description, 'Deal 10 damage. Apply 3 Vulnerable.');
  eq(renderText('Gain [@IE|@IE@IE] and 5 $Block. Add {{C2|Shiv|Shivs}}.', true),
    'Gain StS2 EnergyIronclad.pngStS2 EnergyIronclad.png and 5 StS2 Intent Defend.png Block. Add Shivs.');
  eq(renderText("{{KW|Osty|Osty's|2}} gains 9 @Gold.", false), "Osty's gains 9 StS2 Gold.png.");
  console.log('check ok');
}

async function main() {
  const app = Object.fromEntries(POOLS.map(p => [p, loadApp(p)]));
  const find = (pool, name) => app[pool].find(c => c.name === name) ||
    POOLS.map(p => app[p].find(c => c.name === name)).find(Boolean);
  const report = { added: [], removed: [], moved: [], cost: [], rarity: [] };
  const wikiPools = {};
  for (const pool of POOLS) wikiPools[pool] = (await fetchPool(pool)).filter(w => !w.noList);
  const synced = new Set(POOLS.flatMap(p => wikiPools[p].filter(w => !SKIP_RARITY.has(w.Rarity)).map(w => w.name)));
  const skipped = new Set(POOLS.flatMap(p => wikiPools[p].filter(w => SKIP_RARITY.has(w.Rarity)).map(w => w.name)));

  for (const pool of POOLS) {
    const out = [];
    for (const w of wikiPools[pool]) {
      if (SKIP_RARITY.has(w.Rarity)) continue;
      const old = find(pool, w.name);
      const [b, p] = toEntries(w, old);
      if (!old) report.added.push(`${pool}: ${w.name}`);
      else {
        if (!app[pool].includes(old)) report.moved.push(`${w.name} -> ${pool}`);
        if (String(old.cost) !== String(b.cost)) report.cost.push(`${w.name} ${old.cost}->${b.cost}`);
        if (old.rarity !== b.rarity) report.rarity.push(`${w.name} ${old.rarity}->${b.rarity}`);
      }
      out.push(b, p);
    }
    // Entries not synced: keep status/curse/event cards and tokens as-is, drop the rest.
    for (const c of app[pool]) {
      const base = c.baseCard || c.name;
      if (synced.has(base)) continue;
      if (skipped.has(base) || KEEP_APP_ONLY.has(c.rarity)) out.push(c);
      else if (!c.isUpgraded) report.removed.push(`${pool}: ${c.name}`);
    }
    writePool(pool, out);
  }

  // Card names referenced by builds/tips that no longer exist.
  const allNames = new Set(POOLS.flatMap(p => loadApp(p).map(c => c.name)));
  const oldNames = new Set(POOLS.flatMap(p => app[p].map(c => c.name)));
  const refs = ['data/builds.js', 'data/constants.js', 'data/bossTips.js']
    .map(f => fs.readFileSync(path.join(ROOT, f), 'utf8')).join('\n');
  const broken = [...new Set([...refs.matchAll(/["']([^"'\n]{2,40})["']/g)].map(m => m[1]))]
    .filter(n => oldNames.has(n) && !allNames.has(n));

  for (const [k, v] of Object.entries(report)) console.log(`\n${k} (${v.length}):\n  ${v.join('\n  ')}`);
  console.log(`\nbroken references (${broken.length}):\n  ${broken.join('\n  ')}`);
}

if (process.argv.includes('--check')) check(); else await main();
