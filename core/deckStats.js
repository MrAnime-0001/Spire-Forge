// Deck statistics logic for STS2 Build Advisor.

// ── estimateCardValue ──────────────────────────────────────────
// Extract estimated damage/block from card description text.
// Returns {dmg, blk, strengthGain, summonHP, poisonApplied, orbsDmg, orbsBlk}
function estimateCardValue(card) {
  if (!card || !card.description) return {dmg:0,blk:0,strengthGain:0,summonHP:0,poisonApplied:0,orbsDmg:0,orbsBlk:0};
  var desc = card.description;
  // Strip inline PNG icon markup (e.g. "StS2 Intent Defend.png") so regexes match correctly
  var cleanDesc = desc.replace(/StS2\s+\S+\.png\s*/gi, '');

  var dmg = 0;
  var blk = 0;
  var strengthGain = 0;
  var summonHP = 0;
  var poisonApplied = 0;
  var orbsDmg = 0;
  var orbsBlk = 0;

  // Multi-hit: "Deal X damage Y times" — captures X×Y total
  var multiHit = cleanDesc.match(/Deal (\d+) damage (\d+) times/i);
  if (multiHit) {
    dmg = parseInt(multiHit[1], 10) * parseInt(multiHit[2], 10);
  } else {
    var dmgMatch = cleanDesc.match(/Deal (\d+) damage/i);
    if (dmgMatch) dmg = parseInt(dmgMatch[1], 10);
  }

  // Block
  var blkMatch = cleanDesc.match(/Gain (\d+)\s*Block/i);
  if (blkMatch) blk = parseInt(blkMatch[1], 10);

  // Poison (Silent) — each stack ≈ 2 dmg equivalent
  var poisonMatch = cleanDesc.match(/Apply (\d+) Poison/i);
  if (poisonMatch) poisonApplied = parseInt(poisonMatch[1], 10);

  // Strength (Ironclad) — tracked separately, not added to dmg
  var strMatch = cleanDesc.match(/Gain (\d+) Strength/i);
  if (strMatch) strengthGain = parseInt(strMatch[1], 10);

  // Osty / Summon (Necrobinder)
  var summonMatch = cleanDesc.match(/Summon (\d+)/i);
  if (summonMatch) summonHP = parseInt(summonMatch[1], 10) * 10; // ~10 HP per summon unit

  // Orbs (Defect): Lightning ≈ 3 passive dmg/turn, Frost ≈ 3 blk/turn
  var lMatch = cleanDesc.match(/Channel (\d+)[^.]*Lightning/i);
  if (lMatch) orbsDmg = parseInt(lMatch[1], 10) * 3;
  else if (/Channel[^.]*Lightning/i.test(cleanDesc)) orbsDmg = 3;
  var fMatch = cleanDesc.match(/Channel (\d+)[^.]*Frost/i);
  if (fMatch) orbsBlk = parseInt(fMatch[1], 10) * 3;
  else if (/Channel[^.]*Frost/i.test(cleanDesc)) orbsBlk = 3;

  // Explicit value overrides for star-scaling Regent cards regex can't parse
  var STAR_VALUE_OVERRIDES = {
    'Radiate': {dmg: 9, blk: 0}, 'Radiate+': {dmg: 12, blk: 0},
    'Stardust': {dmg: 10, blk: 0}, 'Stardust+': {dmg: 14, blk: 0},
    'Black Hole': {dmg: 9, blk: 0}, 'Black Hole+': {dmg: 12, blk: 0},
    'Supermassive': {dmg: 8, blk: 0}, 'Supermassive+': {dmg: 9, blk: 0},
    'Heavenly Drill': {dmg: 12, blk: 6}, 'Heavenly Drill+': {dmg: 16, blk: 8},
    'Orbit': {dmg: 9, blk: 0}, 'Orbit+': {dmg: 12, blk: 0},
    'Glitterstream': {dmg: 16, blk: 0}, 'Glitterstream+': {dmg: 20, blk: 0},
    'Resonance': {dmg: 6, blk: 0}, 'Resonance+': {dmg: 8, blk: 0},
    'Celestial Might': {dmg: 18, blk: 0}, 'Celestial Might+': {dmg: 24, blk: 0},
    'Seven Stars': {dmg: 49, blk: 0}, 'Seven Stars+': {dmg: 49, blk: 0},
    // Necrobinder Unleash/Flatten fixed equivalents
    'Flatten': {dmg: 12, blk: 0}, 'Flatten+': {dmg: 16, blk: 0},
    'Bone Smash': {dmg: 10, blk: 0}, 'Bone Smash+': {dmg: 14, blk: 0},
  };
  if (card.name && STAR_VALUE_OVERRIDES[card.name]) {
    var ov = STAR_VALUE_OVERRIDES[card.name];
    if (ov.dmg > dmg) dmg = ov.dmg;
    if (ov.blk > blk) blk = ov.blk;
  }

  return {dmg, blk, strengthGain, summonHP, poisonApplied, orbsDmg, orbsBlk};
}

// ── calcDeckProfile ────────────────────────────────────────────
// Aggregates per-cycle concrete stats for the deck profile panel.
function calcDeckProfile() {
  var deckSize = getDeckSize();
  if (deckSize === 0) return null;
  var cycleTime = calcDeckCycleTime() || 1;

  var charCards = (typeof ALL_CARDS !== 'undefined' && ALL_CARDS[currentChar]) ? ALL_CARDS[currentChar] : [];
  var colorlessCards = (typeof ALL_CARDS !== 'undefined' && ALL_CARDS['colorless']) ? ALL_CARDS['colorless'] : [];
  function findCard(name) {
    return charCards.find(function(x){return x.name===name;}) || colorlessCards.find(function(x){return x.name===name;});
  }

  var totalDmg = 0, totalBlk = 0;
  var totalEnergyCost = 0, totalStarCost = 0, starCostCount = 0;
  var energyGen = 0, starGen = 0;
  var strengthPerCycle = 0, poisonPerCycle = 0;
  var summonPerCycle = 0;
  var orbDmgPerCycle = 0, orbBlkPerCycle = 0;
  var powerCardCount = 0;
  var atkCount = 0, atkTotalDmg = 0, atkTotalCost = 0;
  var defCount = 0, defTotalBlk = 0, defTotalCost = 0;

  Object.keys(deck).forEach(function(name) {
    var count = deck[name] || 0;
    var card = findCard(name);
    if (!card) return;
    var v = estimateCardValue(card);

    totalDmg         += v.dmg * count;
    totalBlk         += v.blk * count;
    poisonPerCycle   += v.poisonApplied * count;
    strengthPerCycle += v.strengthGain * count;
    summonPerCycle   += v.summonHP * count;
    orbDmgPerCycle   += v.orbsDmg * count;
    orbBlkPerCycle   += v.orbsBlk * count;

    var cost = card.cost;
    if (cost === 'X') cost = 2;
    cost = Number(cost);
    if (!isNaN(cost) && cost >= 0) totalEnergyCost += cost * count;

    var sc = card.starCost || 0;
    if (sc > 0) { totalStarCost += sc * count; starCostCount += count; }

    energyGen += (typeof VEL_ENERGY_BONUS !== 'undefined' ? (VEL_ENERGY_BONUS[name] || 0) : 0) * count;
    starGen   += (typeof VEL_STAR_GEN_BONUS !== 'undefined' ? (VEL_STAR_GEN_BONUS[name] || 0) : 0) * count;

    if (card.type === 'pow') powerCardCount += count;

    var cardCost = !isNaN(cost) && cost >= 0 ? cost : 1;
    if (v.dmg > 0) { atkCount += count; atkTotalDmg += v.dmg * count; atkTotalCost += cardCost * count; }
    if (v.blk > 0) { defCount += count; defTotalBlk += v.blk * count; defTotalCost += cardCost * count; }
  });

  // Energy-constrained dmg/blk per turn: cap by 3 energy and 5 draw, shared between atk and def
  var baseEnergy = 3, baseDraw = 5;
  Object.keys(deck).forEach(function(name) {
    var c = deck[name] || 0;
    if (typeof VEL_ENERGY_BONUS !== 'undefined' && VEL_ENERGY_BONUS[name]) baseEnergy += VEL_ENERGY_BONUS[name] * c;
    if (typeof VEL_DRAW_BONUS   !== 'undefined' && VEL_DRAW_BONUS[name])   baseDraw   += VEL_DRAW_BONUS[name]   * c;
  });
  var avgAtkCost = atkCount > 0 ? atkTotalCost / atkCount : 1;
  var avgDefCost = defCount > 0 ? defTotalCost / defCount : 1;
  var atkDrawRate = baseDraw * (atkCount / deckSize);
  var defDrawRate = baseDraw * (defCount / deckSize);
  var totalWantCost = atkDrawRate * avgAtkCost + defDrawRate * avgDefCost;
  var atkEnergyBudget = totalWantCost > 0 ? baseEnergy * (atkDrawRate * avgAtkCost / totalWantCost) : baseEnergy;
  var defEnergyBudget = baseEnergy - atkEnergyBudget;
  var effectiveAtkPlays = Math.min(atkDrawRate, avgAtkCost > 0 ? atkEnergyBudget / avgAtkCost : atkDrawRate);
  var effectiveDefPlays = Math.min(defDrawRate, avgDefCost > 0 ? defEnergyBudget / avgDefCost : defDrawRate);
  var dmgPerTurn = Math.round(effectiveAtkPlays * (atkCount > 0 ? atkTotalDmg / atkCount : 0));
  var blkPerTurn = Math.round(effectiveDefPlays * (defCount > 0 ? defTotalBlk / defCount : 0));
  var poisonDmgEquiv = Math.round(poisonPerCycle * 2);

  var cycleWarning = (cycleTime > 5 && powerCardCount >= 2)
    ? 'Key scaling cards appear every ' + cycleTime.toFixed(1) + ' turns — thin your deck'
    : null;

  var dmgTarget = currentAct <= 1 ? '15–20' : currentAct === 2 ? '20–30' : '30+';
  var blkTarget = currentAct <= 1 ? '8–12'  : currentAct === 2 ? '12–18' : '15–20';
  var dmgMin = currentAct <= 1 ? 15 : currentAct === 2 ? 20 : 30;
  var blkMin = currentAct <= 1 ? 8  : currentAct === 2 ? 12 : 15;

  return {
    dmgPerTurn, blkPerTurn,
    poisonDmgEquiv, poisonPerCycle,
    orbDmgPerTurn: orbDmgPerCycle > 0 ? Math.max(1, Math.round(orbDmgPerCycle / cycleTime)) : 0,
    orbBlkPerTurn: orbBlkPerCycle > 0 ? Math.max(1, Math.round(orbBlkPerCycle / cycleTime)) : 0,
    strengthPerCycle, summonPerCycle,
    avgEnergyCost: deckSize > 0 ? (totalEnergyCost / deckSize).toFixed(1) : '0',
    energyGenPerCycle: energyGen,
    avgStarCost: starCostCount > 0 ? (totalStarCost / starCostCount).toFixed(1) : '0',
    starGenPerCycle: starGen,
    cycleTime, cycleWarning,
    dmgTarget, blkTarget, dmgMin, blkMin,
    char: currentChar,
  };
}

function getDeckStats() {
  let atk=0,def=0,vel=0,scl=0,other=0;
  const charCards = ALL_CARDS[currentChar] || [];
  const colorlessCards = ALL_CARDS['colorless'] || [];
  const allOtherChars = ['ironclad','silent','defect','necrobinder','regent'].filter(k=>k!==currentChar).flatMap(k=>ALL_CARDS[k]||[]);
  function findCard(name) { return charCards.find(x=>x.name===name) || colorlessCards.find(x=>x.name===name) || allOtherChars.find(x=>x.name===name); }
  Object.entries(deck).forEach(([name,count]) => {
    const c = findCard(name);
    if (!c) return;
    const t = c.type || 'scl';
    if (t==='atk') { atk+=count; }
    else if (t==='def') { def+=count; }
    else if (t==='vel') { vel+=count; }
    else if (t==='scl'||t==='pow'||t==='skl') { scl+=count; }
    else if (t==='other') { other+=count; }
    else if (t==='atk_def') { atk+=count*0.5; def+=count*0.5; }
    else if (t==='atk_scl') { atk+=count*0.5; scl+=count*0.5; }
    else if (t==='def_scl') { def+=count*0.5; scl+=count*0.5; }
    else if (t==='atk_def_scl') { atk+=count/3; def+=count/3; scl+=count/3; }
    else if (t==='atk_vel') { atk+=count*0.5; vel+=count*0.5; }
    else if (t==='def_vel') { def+=count*0.5; vel+=count*0.5; }
    else if (t==='scl_vel') { scl+=count*0.5; vel+=count*0.5; }
    else { scl+=count; }
  });
  const total = getDeckSize();
  return {atk:Math.round(atk*10)/10, def:Math.round(def*10)/10, vel:Math.round(vel*10)/10, scl:Math.round(scl*10)/10, other:Math.round(other*10)/10, total};
}

function getDeckSizeProfile() {
  const total = getDeckSize();
  const stats = getDeckStats();
  const axes = calcSixAxes();
  const playable = Math.max(1, total - (stats.other || 0));

  // Percentages of playable deck
  const pAtk = playable > 0 ? Math.round(stats.atk / playable * 100) : 0;
  const pDef = playable > 0 ? Math.round(stats.def / playable * 100) : 0;
  const pScl = playable > 0 ? Math.round(stats.scl / playable * 100) : 0;
  const velScore = axes ? axes.Efficiency : 0;

  // Determine what the deck is over-represented in
  // "Heavy" = that category is notably above the others and above a threshold
  const heavyAtk = pAtk > DECK_THRESHOLDS.heavyAtkPct && pAtk > pDef + DECK_THRESHOLDS.heavyAtkDiff && pAtk > pScl + DECK_THRESHOLDS.heavyAtkSclDiff;
  const heavyDef = pDef > DECK_THRESHOLDS.heavyDefPct && pDef > pAtk + DECK_THRESHOLDS.heavyDefDiff;
  const heavyScl = pScl > DECK_THRESHOLDS.heavySclPct && pScl > pAtk + DECK_THRESHOLDS.heavySclDiff;
  const lowVel   = velScore < DECK_THRESHOLDS.lowVelScore && total > DECK_THRESHOLDS.lowVelMinDeck;

  // Build a focused "what to add next" recommendation
  function getNextFocusTip() {
    if (total < DECK_THRESHOLDS.lean) return 'Add more playable cards first. Statuses like Dazed can wreck draws in a tiny deck.';
    if (total < DECK_THRESHOLDS.healthyMin) return 'Deck is thin — statuses can clog a high share of your hand. Keep adding until ' + DECK_THRESHOLDS.healthyMin + '.';

    // Composition-specific guidance for when deck is large
    if (total > DECK_THRESHOLDS.bloated) {
      const gaps = [];
      if (heavyAtk)      gaps.push('stop adding attacks');
      if (heavyDef)      gaps.push('stop adding block cards');
      if (heavyScl)      gaps.push('stop adding scaling');
      if (lowVel)        gaps.push('add draw or energy cards');
      if (!lowVel && axes && axes.Defense < DECK_THRESHOLDS.lowBlkScore) gaps.push('add block cards');
      if (!lowVel && axes && axes.Attack < DECK_THRESHOLDS.lowDmgScore) gaps.push('add attack cards');

      if (gaps.length > 0) return `Deck is large: ${gaps.join(', ')}.`;
      return `Deck is large. Only add cards that directly fix a weakness — every new card dilutes your best draws.`;
    }

    // In healthy range — give a directional tip based on what's missing
    if (heavyDef && axes && axes.Attack < DECK_THRESHOLDS.heavyDefDmgReq) return `Defense-heavy (${pDef}%). Next reward: you can afford to add damage or scaling instead of more block.`;
    if (heavyScl && axes && axes.Attack < DECK_THRESHOLDS.heavySclDmgReq) return `Scaling-heavy (${pScl}%). Make sure you have enough attacks to apply the scaling before Act 2.`;
    if (lowVel) return `Velocity is low (${velScore}/100). Draw and energy cards will make every other card more consistent.`;
    return 'Good composition. Keep adding cards that fit your build path.';
  }

  let zone, color, label;
  if (total < DECK_THRESHOLDS.lean) {
    zone = 'lean'; color = 'var(--amber-bright)'; label = 'Very Lean';
  } else if (total < DECK_THRESHOLDS.healthyMin) {
    zone = 'lean'; color = 'var(--amber)'; label = 'Lean';
  } else if (total <= DECK_THRESHOLDS.bloated) {
    zone = 'sweet'; color = 'var(--verdant-bright)'; label = 'Healthy';
  } else if (total <= DECK_THRESHOLDS.tooLarge) {
    zone = 'bloated'; color = 'var(--amber)'; label = 'Bloated';
  } else {
    zone = 'danger'; color = '#c06060'; label = 'Too Large';
  }

  return { total, zone, color, label, advice: getNextFocusTip(), pAtk, pDef, pScl, velScore, heavyAtk, heavyDef, heavyScl, lowVel };
}

// Build commitment: how much the deck commits to each BUILD_DATA build.
// Returns {buildKey: 0-1} where 1 = all essential cards present.
// Used for Synergy axis calculation.
function getArchetypeCommitment() {
  var result = {};
  if (typeof BUILD_DATA === 'undefined' || !BUILD_DATA[currentChar]) return result;
  var builds = BUILD_DATA[currentChar].builds;
  if (!builds) return result;
  Object.keys(builds).forEach(function(bk) {
    var b = builds[bk];
    var essential = b.essential || [];
    if (essential.length === 0) { result[bk] = 0; return; }
    var have = 0;
    essential.forEach(function(c) { if (deck[c] || deck[c+'+']) have++; });
    result[bk] = have / essential.length;
  });
  return result;
}

function calcSixAxes() {
  if (!currentChar || getDeckSize() === 0) return null;
  const stats = getDeckStats();
  const total = getDeckSize();
  const charCards = ALL_CARDS[currentChar] || [];
  const colorlessCards = ALL_CARDS['colorless'] || [];
  const allOtherChars = ['ironclad','silent','defect','necrobinder','regent']
    .filter(k=>k!==currentChar).flatMap(k=>ALL_CARDS[k]||[]);
  function findCard(name) {
    return charCards.find(x=>x.name===name) || colorlessCards.find(x=>x.name===name) || allOtherChars.find(x=>x.name===name);
  }

  // Per-turn output model: estimate how much damage/block the deck can produce
  // in a single turn given energy and draw budget.
  // Energy/draw from VEL_ENERGY_BONUS and VEL_DRAW_BONUS increase budget.
  var atkCards = [], defCards = [];
  Object.entries(deck).forEach(function(e) {
    var name = e[0], count = e[1];
    var card = findCard(name);
    if (!card) return;
    var val = estimateCardValue(card);
    var cost = card.cost !== undefined ? (card.cost === 'X' ? 2 : card.cost) : 1;
    if (val.dmg > 0) atkCards.push({name: name, val: val.dmg, cost: cost, count: count});
    if (val.blk > 0) defCards.push({name: name, val: val.blk, cost: cost, count: count});
  });

  // Bonus: block-generating powers — treat as +8 block per turn each (passive)
  var blockPowers = ['Barricade','Juggernaut','Afterimage','Stone Armor','Crimson Mantle','Feel No Pain','Shroud'];
  var passiveBlk = 0;
  blockPowers.forEach(function(n) { if (deck[n]) passiveBlk += 8; });
  if (passiveBlk > 0) defCards.push({name: '(block powers)', val: passiveBlk, cost: 0, count: 1});

  function calcPerTurnOutput(cards, playableTotal) {
    if (cards.length === 0 || playableTotal <= 0) return 0;
    var totalCount = cards.reduce(function(s, c) { return s + c.count; }, 0);

    // Base budgets: 3 energy, 5 draws per turn
    // Enhanced by energy/draw cards in deck (scaled by type share)
    var baseEnergy = 3;
    var baseDraw = 5;
    var energyCards = ENERGY_CARDS[currentChar] || [];
    var drawCards = DRAW_CARDS[currentChar] || [];
    Object.keys(deck).forEach(function(n) {
      var c = deck[n];
      if (VEL_ENERGY_BONUS[n]) baseEnergy += VEL_ENERGY_BONUS[n] * c;
      if (VEL_DRAW_BONUS[n]) baseDraw += VEL_DRAW_BONUS[n] * c;
    });

    var expectedDraws = (totalCount / playableTotal) * baseDraw;
    var energyBudget = (totalCount / playableTotal) * baseEnergy;

    // Star budget for Regent
    var baseStar = currentChar === 'regent' ? 3 : 0;
    if (currentChar === 'regent' && typeof VEL_STAR_GEN_BONUS !== 'undefined') {
      Object.keys(deck).forEach(function(n) {
        var cnt = deck[n];
        if (VEL_STAR_GEN_BONUS[n]) baseStar += VEL_STAR_GEN_BONUS[n] * cnt;
      });
    }
    var starBudget = (totalCount / playableTotal) * baseStar;

    // Build a flat list of individual card plays (value, cost)
    var plays = [];
    var allCards = [];
    if (typeof ALL_CARDS !== 'undefined' && ALL_CARDS[currentChar]) {
      allCards = ALL_CARDS[currentChar];
    }
    cards.forEach(function(c) {
      for (var i = 0; i < c.count; i++) {
        var sc = 0;
        if (currentChar === 'regent' && allCards.length > 0) {
          var found = allCards.find(function(x) { return x.name === c.name; });
          if (found && found.starCost) sc = found.starCost;
        }
        plays.push({val: c.val, cost: c.cost, starCost: sc});
      }
    });

    // Sort by cost ascending — cheaper cards first (more efficient use of budget)
    // Among same cost, higher value first
    plays.sort(function(a, b) {
      if (a.cost !== b.cost) return a.cost - b.cost;
      return b.val - a.val;
    });

    var output = 0;
    var remainingEnergy = energyBudget;
    var remainingStar = starBudget;
    var remainingDraws = expectedDraws;

    for (var i = 0; i < plays.length; i++) {
      if (remainingDraws <= 0) break;
      var p = plays[i];
      var effCost = typeof p.cost === 'number' ? Math.max(p.cost, 0.5) : 2;
      var effStarCost = p.starCost || 0;
      if (effCost <= remainingEnergy && effStarCost <= remainingStar) {
        output += p.val;
        remainingEnergy -= effCost;
        remainingStar -= effStarCost;
        remainingDraws -= 1;
      }
    }

    return output;
  }

  var playable = Math.max(1, total - (stats.other||0));
  var perTurnDmg = calcPerTurnOutput(atkCards, playable);
  var perTurnBlk = calcPerTurnOutput(defCards, playable);

  // Scale: ~50 per-turn output = Act 1 solved (axis 100)
  var attackScore = Math.min(100, Math.round(perTurnDmg * 2));
  var defenseScore = Math.min(100, Math.round(perTurnBlk * 2));

  // Necrobinder: Summon cards count toward Defense axis (Osty = defense layer)
  if (currentChar === 'necrobinder') {
    var SUMMON_TAG = {'Bodyguard':1,'Pull Aggro':1,'Afterlife':1,'Cleanse':1,'Dirge':1,'Spur':1,'Reanimate':1,'Legion of Bone':1,'Invoke':1};
    var summonCount = 0;
    Object.keys(deck).forEach(function(n) { if (SUMMON_TAG[n]) summonCount += deck[n]; });
    defenseScore = Math.min(100, defenseScore + summonCount * 4);
  }

  // 3. Scaling (old scl)
  var playable2 = Math.max(1, total - (stats.other||0));
  const scalingScore = Math.min(100, Math.round((stats.scl / playable2) * 300));

  // 4. Efficiency (old vel)
  const velCards = VELOCITY_CARDS[currentChar] || [];
  let velCount = 0;
  Object.keys(deck).forEach(n => { if (velCards.includes(n)) velCount += deck[n]; });
  velCount += stats.scl * 0.4;
  const efficiencyScore = Math.min(100, Math.round(velCount * 18));

  // 5. Consistency
  // approach: deck size ÷ draw power ratio
  let drawPower = 5; // base draw
  Object.entries(deck).forEach(([name, count]) => {
    drawPower += (VEL_DRAW_BONUS[name] || 0) * count;
  });
  const consistencyScore = Math.min(100, Math.round((drawPower / total) * 100));

  // 6. Synergy
  // approach: use highest commitment score as Synergy axis value
  const commitment = getArchetypeCommitment();
  const maxCommitment = Math.max(0, ...Object.values(commitment));
  const synergyScore = Math.round(maxCommitment * 100);

  return {
    Attack: attackScore,
    Defense: defenseScore,
    Scaling: scalingScore,
    Consistency: consistencyScore,
    Efficiency: efficiencyScore,
    Synergy: synergyScore,
    rawDPT: Math.round(perTurnDmg),
    rawBPT: Math.round(perTurnBlk)
  };
}

function calcDeckCycleTime() {
  const n = getDeckSize();
  if (n === 0) return null;
  let bonus = 0;
  Object.entries(deck).forEach(([name, count]) => {
    bonus += (VEL_DRAW_BONUS[name] || 0) * count;
  });
  return Math.round(n * n / (5 * (n + bonus)) * 10) / 10;
}

function calcTurnsToEmpty() {
  const n = getDeckSize();
  if (n === 0) return null;
  let bonus = 0;
  Object.entries(deck).forEach(([name, count]) => {
    bonus += (VEL_DRAW_BONUS[name] || 0) * count;
  });
  return Math.ceil(n * n / (5 * (n + bonus)));
}

function getDrawBalance() {
  // Only counts cards that can attack OR block — pure scale, power, skill,
  // and unplayable/other cards are excluded entirely.
  // Hybrids count fully in each pool they belong to.
  const charCards = ALL_CARDS[currentChar] || [];
  const colorlessCards = ALL_CARDS['colorless'] || [];
  const allOtherChars = ['ironclad','silent','defect','necrobinder','regent']
    .filter(k=>k!==currentChar).flatMap(k=>ALL_CARDS[k]||[]);
  function findCard(name) {
    return charCards.find(x=>x.name===name) || colorlessCards.find(x=>x.name===name) || allOtherChars.find(x=>x.name===name);
  }
  let atkDraw = 0, defDraw = 0, sclDraw = 0, deadDraw = 0, velDraw = 0;
  Object.entries(deck).forEach(([name, count]) => {
    const c = findCard(name);
    if (!c) return;
    const t = c.type || 'scl';
    if      (t === 'atk')         { atkDraw += count; }
    else if (t === 'def')         { defDraw += count; }
    else if (t === 'atk_def')     { atkDraw += count; defDraw += count; }
    else if (t === 'atk_scl')     { atkDraw += count; }
    else if (t === 'def_scl')     { defDraw += count; }
    else if (t === 'atk_def_scl') { atkDraw += count; defDraw += count; }
    else if (t === 'scl' || t === 'pow' || t === 'skl') { sclDraw += count; }
    else if (t === 'vel') { velDraw += count; }
    else if (t === 'atk_vel') { atkDraw += count; velDraw += count; }
    else if (t === 'def_vel') { defDraw += count; velDraw += count; }
    else if (t === 'scl_vel') { sclDraw += count; velDraw += count; }
    else if (t === 'other') { deadDraw += count; }
  });
  return { atkDraw, defDraw, sclDraw, deadDraw, velDraw };
}

// ── getCostDistribution ──────────────────────────────────────
// Returns array of {cost, count, pct} for 0, 1, 2, 3, 4+ energy costs.
function getCostDistribution() {
  var buckets = {0:0, 1:0, 2:0, 3:0, 4:0};
  var charCards = ALL_CARDS[currentChar] || [];
  var colorlessCards = ALL_CARDS['colorless'] || [];
  var allOtherChars = ['ironclad','silent','defect','necrobinder','regent']
    .filter(function(k){return k!==currentChar;}).flatMap(function(k){return ALL_CARDS[k]||[];});
  function findCard(n) {
    return charCards.find(function(x){return x.name===n;}) || colorlessCards.find(function(x){return x.name===n;}) || allOtherChars.find(function(x){return x.name===n;});
  }
  var total = 0;
  Object.keys(deck).forEach(function(n) {
    var c = findCard(n);
    if (!c) return;
    var cost = c.cost;
    if (cost === 'X') cost = 2; // treat X-cost as 2 for curve purposes
    cost = Number(cost);
    if (isNaN(cost) || cost < 0) cost = 0;
    if (cost >= 4) cost = 4;
    buckets[cost] += deck[n];
    total += deck[n];
  });
  var result = [];
  var labels = {0:'0',1:'1',2:'2',3:'3',4:'4+'};
  [0,1,2,3,4].forEach(function(k) {
    result.push({cost:k, label:labels[k], count:buckets[k], pct:total>0?Math.round(buckets[k]/total*100):0});
  });
  return result;
}

// ── getStarCostDistribution ─────────────────────────────────
// Regent-only. Fixed buckets 0,1,2,3,4-5,6+ — always shown.
function getStarCostDistribution() {
  if (currentChar !== 'regent') return [];
  var buckets = {0:0, 1:0, 2:0, 3:0, 45:0, 67:0};
  var labels = {0:'0★', 1:'1★', 2:'2★', 3:'3★', 45:'4-5★', 67:'6+★'};
  var charCards = ALL_CARDS['regent'] || [];
  var total = 0;
  Object.keys(deck).forEach(function(n) {
    var c = charCards.find(function(x){return x.name===n;});
    if (!c) return;
    var sc = c.starCost || 0;
    if (sc === 0) buckets[0] += deck[n];
    else if (sc === 1) buckets[1] += deck[n];
    else if (sc === 2) buckets[2] += deck[n];
    else if (sc === 3) buckets[3] += deck[n];
    else if (sc <= 5) buckets[45] += deck[n];
    else buckets[67] += deck[n];
    total += deck[n];
  });
  var result = [];
  [0,1,2,3,45,67].forEach(function(k) {
    result.push({cost:k, label:labels[k], count:buckets[k], pct:total>0?Math.round(buckets[k]/total*100):0});
  });
  return result;
}

// ── getUpgradeCandidates ─────────────────────────────────────
// Returns top 5 un-upgraded cards that benefit most from upgrade.
function getUpgradeCandidates() {
  var candidates = [];
  var charCards = ALL_CARDS[currentChar] || [];
  var allCards = charCards.concat(ALL_CARDS['colorless']||[]);
  Object.keys(deck).forEach(function(name) {
    if (name.endsWith('+')) return; // already upgraded
    var upgraded = name + '+';
    if ((deck[name] || 0) > (deck[upgraded] || 0)) {
      var card = allCards.find(function(c){return c.name===name;});
      if (!card) return;
      // Score upgrade value based on card description delta
      var baseValue = 0;
      var desc = card.description || '';
      if (desc.match(/Deal (\d+) damage/)) baseValue += parseInt(desc.match(/Deal (\d+) damage/)[1], 10);
      if (desc.match(/Gain (\d+).*Block/i)) baseValue += parseInt(desc.match(/Gain (\d+).*Block/i)[1], 10);
      // Check existing scoring for upgrade value
      var scoreResult = scoreCard(name);
      var upgradeBonus = scoreResult && scoreResult.score ? Math.min(30, Math.max(0, scoreResult.score)) : 10;
      candidates.push({name:name, score:upgradeBonus, hasEssential:false});
    }
  });
  // Check if any are build-essential
  if (typeof BUILD_DATA !== 'undefined' && BUILD_DATA[currentChar]) {
    var builds = BUILD_DATA[currentChar].builds;
    if (builds) {
      Object.keys(builds).forEach(function(bk) {
        var b = builds[bk];
        (b.essential||[]).concat(b.mustPick||[]).concat(b.highPriority||[]).forEach(function(cn) {
          var found = candidates.find(function(c){return c.name===cn;});
          if (found) found.score += 20;
        });
      });
    }
  }
  candidates.sort(function(a,b){return b.score-a.score;});
  return candidates.slice(0, 5);
}

// ── getRemoveCandidates ──────────────────────────────────────
// Returns cards to remove at campfire: starters > low-value > off-build.
function getRemoveCandidates() {
  var result = [];
  var starters = ['Strike','Defend','Strike+','Defend+'];
  var count = {'Strike':0,'Defend':0};
  Object.keys(deck).forEach(function(n) {
    if (n === 'Strike' || n === 'Strike+') count.Strike += deck[n];
    if (n === 'Defend' || n === 'Defend+') count.Defend += deck[n];
  });
  // Tier 1: starters if 3+ remaining
  if (count.Strike >= 3) result.push({name:'Strike', reason:'starter — remove first', tier:1});
  if (count.Defend >= 3) result.push({name:'Defend', reason:'starter — remove second', tier:1});
  // Tier 2: cards not in any build and low axis contribution
  var scored = [];
  Object.keys(deck).forEach(function(name) {
    if (name.endsWith('+')) return;
    if (starters.indexOf(name) >= 0) return;
    var isEssential = false;
    if (typeof BUILD_DATA !== 'undefined' && BUILD_DATA[currentChar]) {
      var builds = BUILD_DATA[currentChar].builds;
      if (builds) {
        Object.keys(builds).forEach(function(bk) {
          if ((builds[bk].essential||[]).indexOf(name) >= 0 || (builds[bk].mustPick||[]).indexOf(name) >= 0) isEssential = true;
        });
      }
    }
    if (isEssential) return;
    var res = scoreCard(name);
    if (res && res.score < 20) {
      scored.push({name:name, score:res.score||0, reason:'low value (score:'+(res.score||0)+')', tier:2});
    }
  });
  scored.sort(function(a,b){return a.score-b.score;});
  result = result.concat(scored.slice(0, 3));
  return result.slice(0, 5);
}

// ── getCrisisStates ──────────────────────────────────────────
// Helper to identify critical gaps in deck composition.
function getCrisisStates(axes, targets) {
  if (!axes || !targets) return { attack: false, defense: false, scaling: false };
  return {
    attack:      axes.Attack      < (targets.Attack      * 0.5),
    defense:     axes.Defense     < (targets.Defense     * 0.5),
    scaling:     axes.Scaling     < (targets.Scaling     * 0.3),
    consistency: axes.Consistency < (targets.Consistency * 0.5)
  };
}
