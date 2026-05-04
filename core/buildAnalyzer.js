// Build detection, archetype scoring, and synergy analysis for STS2 Build Advisor.

function getArchetypeCommitment() {
  if (!currentChar) return {};
  var builds = (BUILD_DATA[currentChar] || {}).builds || {};
  var result = {};

  Object.keys(builds).forEach(function (key) {
    var essential = builds[key].essential || [];
    var owned = essential.filter(function (n) { return deck[n]; }).length;
    result[key] = essential.length > 0 ? Math.min(1, owned / essential.length) : 0;
  });
  return result;
}

function classifyArchetypes() {
  var conf = getArchetypeCommitment();
  var committed = null, building = [], exploring = [];
  var sorted = Object.keys(conf).sort(function (a, b) { return conf[b] - conf[a]; });

  sorted.forEach(function (key) {
    var c = conf[key];
    if (c >= 0.60 && !committed) committed = key;
    else if (c >= 0.33) building.push(key);
    else if (c >= 0.15) exploring.push(key);
  });
  return { committed: committed, building: building, exploring: exploring, confidence: conf };
}

function detectDeckArchetypes(deck) {
  const tags = new Set();
  const has = name => deck[name] > 0;
  const count = names => names.filter(n => deck[n]).length;

  // Generic tags
  if (count(['Noxious Fumes', 'Accelerant', 'Deadly Poison', 'Envenom', 'Bubble Bubble', 'Bouncing Flask', 'Haze', 'Malaise', 'Corrosive Wave', 'Poisoned Stab', 'Outbreak']) >= 2) tags.add('poison');
  if (count(['Accuracy', 'Infinite Blades', 'Knife Trap', 'Blade Dance', 'Hidden Daggers', 'Fan of Knives', 'Cloak and Dagger', 'Leading Strike', 'Up My Sleeve', 'Finisher']) >= 2) tags.add('shiv');
  if (count(['Tactician', 'Tools of the Trade', 'Master Planner', 'Reflex', 'Calculated Gamble', 'Acrobatics', 'Prepared', 'Well-Laid Plans']) >= 2) tags.add('sly');
  if (count(['Corruption', 'Dark Embrace', 'Feel No Pain', "Pact's End", 'Ashen Strike', 'Burning Pact', 'Fiend Fire', 'Forgotten Ritual', 'Second Wind']) >= 2) tags.add('exhaust');
  if (count(['Demon Form', 'Inflame', 'Rupture', 'Brand', 'Fight Me!', 'Whirlwind', 'Bludgeon', 'Twin Strike']) >= 2) tags.add('strength');
  if (count(['Barricade', 'Juggernaut', 'Body Slam', 'Impervious', 'Stone Armor', 'Entrench', 'Unmovable']) >= 2) tags.add('block');
  if (count(['Bloodletting', 'Rupture', 'Inferno', 'Hemokinesis', 'Crimson Mantle', 'Brand', 'Feed', 'Tear Asunder']) >= 2) tags.add('self-damage');
  if (count(['Perfected Strike', 'Pommel Strike', 'Twin Strike', 'Hellraiser', 'Strike', 'Pyre', 'Expect a Fight']) >= 3) tags.add('strike');
  if (count(['Hellraiser', 'Bloodletting', 'Dark Embrace', 'Burning Pact', 'Pommel Strike', 'Battle Trance']) >= 3) tags.add('infinite');
  // Defect
  if (count(['Defragment', 'Capacitor', 'Modded', 'Loop', 'Coolheaded', 'Hotfix', 'Hot Fix', 'Chaos', 'Multi-Cast']) >= 2) tags.add('orb');
  if (count(['Glacier', 'Coolheaded', 'Cold Snap', 'Hailstorm', 'Chill', 'Loop', 'Frost']) >= 2) tags.add('frost');
  if (count(['Claw', 'All for One', 'Scrape', 'Feral', 'Panache', 'Hologram']) >= 2) tags.add('claw');
  if (count(['Darkness', 'Shadow Shield', 'Consuming Shadow', 'Multi-Cast']) >= 2) tags.add('darkness');
  // Necrobinder
  if (count(['No Escape', 'Countdown', 'Deathbringer', "Death's Door", 'Negative Pulse', 'Scourge', 'Blight Strike']) >= 2) tags.add('doom');
  if (count(['Rattle', "Sic 'Em", 'Necro Mastery', 'Fetch', 'Poke', 'Squeeze', 'Flatten', 'Calcify']) >= 2) tags.add('osty');
  if (count(['Grave Warden', 'Capture Spirit', 'Captured Spirit', 'Severance', 'Durge', 'Dirge', 'Haunt', 'Devour Life', 'Soul Storm']) >= 2) tags.add('soul');
  if (count(["Banshee's Cry", 'Defy', 'Defile', 'Call of the Void', 'Pagestorm', 'Page Storm', 'Spirit of Ash', 'Demesne', 'Parse', 'Pull from Below']) >= 2) tags.add('ethereal');
  // Regent
  if (count(['Venerate', 'Glow', 'Hidden Cache', 'Genesis', 'Royal Gamble', 'Solar Strike', 'Shining Strike', 'Gather Light']) >= 2) tags.add('stars');
  if (count(['Bulwark', 'Seeking Edge', 'Conqueror', 'Summon Forth', 'The Smith', 'Furnace', 'Beat into Shape', 'Refine Blade', 'Wrought in War']) >= 2) tags.add('forge');
  if (count(['Radiate', 'Stardust', 'Royal Gamble', 'Terraforming', 'Big Bang']) >= 2) tags.add('starfall');

  // Generic traits
  const deckArray = Object.keys(deck);
  if (deckArray.length <= 15) tags.add('small-deck');
  if (deckArray.length >= 25) tags.add('big-deck');

  return tags;
}

function getTopBuild() {
  if (!currentChar) return null;
  const { ranked } = getBuildScores();
  if (!ranked || ranked.length === 0) return null;
  return ranked[0][0];
}

function getBuildScores() {
  if (!currentChar) return { scores: {}, ranked: [] };
  const builds = (BUILD_DATA[currentChar] || {}).builds || {};
  const deckNameSet = new Set(Object.keys(deck));

  const scores = {};
  Object.entries(builds).forEach(([key, build]) => {
    const essential = build.essential || [];
    const hits = essential.filter(n => deckNameSet.has(n)).length;
    const pct = essential.length > 0 ? Math.round(hits / essential.length * 100) : 0;
    scores[key] = { hits, total: essential.length, pct };
  });

  const RANK_ORDER_R = { S: 4, A: 3, B: 2, C: 1 };
  const ranked = Object.entries(scores).sort((a, b) => {
    const pctDiff = b[1].pct - a[1].pct;
    if (Math.abs(pctDiff) > 1) return pctDiff;
    return (RANK_ORDER_R[builds[b[0]].rank] || 0) - (RANK_ORDER_R[builds[a[0]].rank] || 0);
  });

  return { scores, ranked };
}
