// Build detection, archetype scoring, and synergy analysis for STS2 Build Advisor.

function getSynergyPairBonus(cardName) {
  if (!currentChar) return {bonus: 0, reasons: []};
  var bonus = 0;
  var reasons = [];
  var hasEradicate = !!(deck['Eradicate']);

  SYNERGY_PAIRS.forEach(function(pair) {
    var partnerName = null;
    if (pair.a === cardName && deck[pair.b]) partnerName = pair.b;
    else if (pair.b === cardName && deck[pair.a]) partnerName = pair.a;
    if (!partnerName) return;
    bonus += pair.bonus;
    reasons.push(partnerName + ' in deck: ' + pair.note);
  });

  // Energy cluster detection: if Eradicate in deck AND 2+ energy cards,
  // add cluster bonus to additional energy cards
  if (hasEradicate && currentChar === 'necrobinder') {
    var energyCluster = ['Neurosurge','Wisp','Borrowed Time','Friendship','Demesne'];
    var clusterInDeck = energyCluster.filter(function(n){ return deck[n]; }).length;
    if (clusterInDeck >= 2 && energyCluster.includes(cardName)) {
      bonus += 12;
      reasons.push('Energy cluster: each energy card adds ~11 dmg to Eradicate ceiling');
    }
    // Lethality + attack cluster
    if (deck['Lethality'] && (cardName === 'Debilitate' || cardName === 'Putrefy')) {
      bonus += 6;
      reasons.push('Lethality active: Vulnerable multiplier compounds Lethality bonus');
    }
  }

  return {bonus: Math.min(bonus, 30), reasons: reasons};
}

function getScalingDmgNote(cardName) {
  if (!currentChar) return null;
  // Eradicate / Whirlwind — energy multipliers
  if (cardName === 'Eradicate' && currentChar === 'necrobinder') {
    var e = getEradicateNukeEstimate();
    if (e && e.energy > 3) return 'with current energy sources: ~' + e.base + ' dmg nuke turn' + (e.withMultipliers !== e.base ? ', ' + e.withMultipliers + ' with multipliers' : '');
  }
  if (cardName === 'Whirlwind' && currentChar === 'ironclad') {
    var energyCards = ['Pyre','Bloodletting','Offering','Battle Trance'].filter(n => deck[n]);
    var baseE = 3 + energyCards.length;
    var strCards = ['Demon Form','Inflame','Fight Me!','Rupture'].filter(n => deck[n]).length;
    if (strCards >= 1 || baseE > 3) return 'with ' + baseE + 'E avg and ' + strCards + ' Strength sources: ~' + (baseE * (4 + strCards * 3)) + ' total AoE';
  }
  if (cardName === 'Skewer' && currentChar === 'silent') {
    var energySilent = ['Tactician','Adrenaline','Calculated Gamble'].filter(n => deck[n]).length;
    if (energySilent >= 1) return 'Sly energy sources in deck — burst ceiling ~' + ((3 + energySilent) * 7) + ' dmg';
  }
  if (cardName === 'No Escape' && currentChar === 'necrobinder') {
    var doomCards = ['Countdown','Scourge','Deathbringer','Blight Strike','Reaper Form'].filter(n => deck[n]).length;
    if (doomCards >= 1) return doomCards + ' other Doom source(s) in deck — threshold reachable in 2-3 turns with No Escape stacking';
  }
  if (cardName === 'Seven Stars' && currentChar === 'regent') {
    var starSources = ['Genesis','Glow','Hidden Cache','Royal Gamble','Shining Strike','Venerate','Alignment'].filter(n => deck[n]).length;
    if (starSources >= 2) return starSources + ' Star generators in deck — 7★ cost reachable in ~' + Math.max(1, Math.ceil(7 / (starSources * 1.5))) + ' turns';
  }
  if (cardName === 'Radiate' && currentChar === 'regent') {
    var rStarSrc = ['Genesis','Glow','Royal Gamble','Hidden Cache','Shining Strike'].filter(n => deck[n]).length;
    if (rStarSrc >= 1) return rStarSrc + ' Star generator(s) in deck — Radiate fires ~' + (rStarSrc * 4) + ' AoE passively per turn cycle';
  }
  if (cardName === 'Haunt' && currentChar === 'necrobinder') {
    var soulSrc = ['Dirge','Grave Warden','Capture Spirit','Severance','Reave'].filter(n => deck[n]).length;
    if (soulSrc >= 1) return soulSrc + ' Soul generator(s) in deck — Haunt deals ~' + (soulSrc * 6) + ' unblockable per turn cycle';
  }
  return null;
}

function getEradicateNukeEstimate() {
  if (!currentChar || currentChar !== 'necrobinder' || !deck['Eradicate']) return null;
  var baseEnergy = 3;
  var sustained = (deck['Friendship'] || 0) * 1;
  var burst = 0;
  if (deck['Neurosurge']) burst += 3;
  if (deck['Borrowed Time']) burst += 4;
  var wispCount = deck['Wisp'] || 0;
  burst += wispCount;
  if (deck['Demesne']) burst += 1;
  var totalEnergy = baseEnergy + sustained + burst;
  var baseDmg = totalEnergy * 11;
  var lethMult = deck['Lethality'] ? 1.5 : 1.0;
  var debMult  = deck['Debilitate'] ? 1.5 : 1.0;
  return {
    energy: totalEnergy,
    base: Math.round(baseDmg),
    withMultipliers: Math.round(baseDmg * lethMult * debMult),
    hasLethality: !!(deck['Lethality']),
    hasDebilitate: !!(deck['Debilitate'])
  };
}

function getArchetypeCommitment() {
  if (!currentChar) return {};
  var builds = (BUILD_DATA[currentChar] || {}).builds || {};
  var engines = BUILD_ENGINES[currentChar] || {};
  var result = {};
  var deckNames = Object.keys(deck);

  Object.keys(builds).forEach(function(key) {
    var build = builds[key];
    var eng = engines[key];
    var engCards = eng ? eng.cards : [];
    var recCards = build.recs || [];

    var engOwned = engCards.filter(function(n){ return deck[n]; }).length;
    var recOwned = recCards.filter(function(n){ return deck[n]; }).length;

    var rawScore = (engOwned * 3) + (recOwned * 1.5);
    var maxScore = (engCards.length * 3) + (recCards.length * 1.5) * 1.5;
    result[key] = maxScore > 0 ? Math.min(1, rawScore / maxScore) : 0;
  });
  return result;
}

function classifyArchetypes() {
  var conf = getArchetypeCommitment();
  var committed = null, building = [], exploring = [];
  var sorted = Object.keys(conf).sort(function(a,b){ return conf[b]-conf[a]; });

  sorted.forEach(function(key) {
    var c = conf[key];
    if (c >= 0.60 && !committed) committed = key;
    else if (c >= 0.33) building.push(key);
    else if (c >= 0.15) exploring.push(key);
  });
  return {committed: committed, building: building, exploring: exploring, confidence: conf};
}

function getPhaseWeight() {
  var total = getDeckSize();
  if (currentAct === 1) return total < 14 ? 0.5 : (total < 20 ? 0.7 : 0.8);
  if (currentAct === 2) return total < 14 ? 0.8 : (total < 20 ? 1.0 : 1.2);
  return total < 14 ? 1.0 : (total < 20 ? 1.4 : 1.6);
}

function getEngineCommitment(cardName) {
  const engines = BUILD_ENGINES[currentChar] || {};
  var best = 0;
  Object.values(engines).forEach(function(eng) {
    if (eng.cards.includes(cardName)) {
      var have = eng.cards.filter(function(n){ return deck[n]; }).length;
      best = Math.max(best, have / eng.cards.length);
    }
  });
  return best;
}

function detectDeckArchetypes(deck) {
  const tags = new Set();
  const has = name => deck[name] > 0;
  const count = names => names.filter(n => deck[n]).length;

  // Generic tags
  if (count(['Noxious Fumes','Accelerant','Deadly Poison','Envenom','Bubble Bubble','Bouncing Flask','Haze','Malaise','Corrosive Wave','Poisoned Stab','Outbreak'])>=2) tags.add('poison');
  if (count(['Accuracy','Infinite Blades','Knife Trap','Blade Dance','Hidden Daggers','Fan of Knives','Cloak and Dagger','Leading Strike','Up My Sleeve','Finisher'])>=2) tags.add('shiv');
  if (count(['Tactician','Tools of the Trade','Master Planner','Reflex','Calculated Gamble','Acrobatics','Prepared','Well-Laid Plans'])>=2) tags.add('sly');
  if (count(['Corruption','Dark Embrace','Feel No Pain',"Pact's End",'Ashen Strike','Burning Pact','Fiend Fire','Forgotten Ritual','Second Wind'])>=2) tags.add('exhaust');
  if (count(['Demon Form','Inflame','Rupture','Brand','Fight Me!','Whirlwind','Bludgeon','Twin Strike'])>=2) tags.add('strength');
  if (count(['Barricade','Juggernaut','Body Slam','Impervious','Stone Armor','Entrench','Unmovable'])>=2) tags.add('block');
  if (count(['Bloodletting','Rupture','Inferno','Hemokinesis','Crimson Mantle','Brand','Feed','Tear Asunder'])>=2) tags.add('self-damage');
  if (count(['Perfected Strike','Pommel Strike','Twin Strike','Hellraiser','Strike','Pyre','Expect a Fight'])>=3) tags.add('strike');
  if (count(['Hellraiser','Bloodletting','Dark Embrace','Burning Pact','Pommel Strike','Battle Trance'])>=3) tags.add('infinite');
  // Defect
  if (count(['Defragment','Capacitor','Modded','Loop','Coolheaded','Hotfix','Hot Fix','Chaos','Multi-Cast'])>=2) tags.add('orb');
  if (count(['Glacier','Coolheaded','Cold Snap','Hailstorm','Chill','Loop','Frost'])>=2) tags.add('frost');
  if (count(['Claw','All for One','Scrape','Feral','Panache','Hologram'])>=2) tags.add('claw');
  if (count(['Darkness','Shadow Shield','Consuming Shadow','Multi-Cast'])>=2) tags.add('darkness');
  // Necrobinder
  if (count(['No Escape','Countdown','Deathbringer',"Death's Door",'Negative Pulse','Scourge','Blight Strike'])>=2) tags.add('doom');
  if (count(['Rattle',"Sic 'Em",'Necro Mastery','Fetch','Poke','Squeeze','Flatten','Calcify'])>=2) tags.add('osty');
  if (count(['Grave Warden','Capture Spirit','Captured Spirit','Severance','Durge','Dirge','Haunt','Devour Life','Soul Storm'])>=2) tags.add('soul');
  if (count(["Banshee's Cry",'Defy','Defile','Call of the Void','Pagestorm','Page Storm','Spirit of Ash','Demesne','Parse','Pull from Below'])>=2) tags.add('ethereal');
  // Regent
  if (count(['Venerate','Glow','Hidden Cache','Genesis','Royal Gamble','Solar Strike','Shining Strike','Gather Light'])>=2) tags.add('stars');
  if (count(['Bulwark','Seeking Edge','Conqueror','Summon Forth','The Smith','Furnace','Beat into Shape','Refine Blade','Wrought in War'])>=2) tags.add('forge');
  if (count(['Radiate','Stardust','Royal Gamble','Terraforming','Big Bang'])>=2) tags.add('starfall');

  // Generic traits
  const deckArray = Object.keys(deck);
  if (deckArray.length <= 15) tags.add('small-deck');
  if (deckArray.length >= 25) tags.add('big-deck');

  return tags;
}

function getTopBuild() {
  if (!currentChar) return null;
  const builds = (BUILD_DATA[currentChar] || {}).builds || {};
  const deckNames = Object.keys(deck);
  if (deckNames.length === 0) return null;
  let best = null, bestScore = -1;
  Object.entries(builds).forEach(([key, build]) => {
    const hits = deckNames.filter(n => build.cards.includes(n)).length;
    const pct = hits / build.cards.length;
    if (pct > bestScore) { bestScore = pct; best = key; }
  });
  return best;
}
