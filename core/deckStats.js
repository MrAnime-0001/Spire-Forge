// Deck statistics logic for STS2 Build Advisor.

// ── estimateCardValue ──────────────────────────────────────────
// Extract estimated damage/block from card description text.
// Returns {dmg, blk} where each is numeric (0 = unknown/variable).
function estimateCardValue(card) {
  if (!card || !card.description) return {dmg: 0, blk: 0};
  var desc = card.description;

  var dmg = 0;
  var dmgMatch = desc.match(/Deal (\d+) damage/);
  if (dmgMatch) dmg = parseInt(dmgMatch[1], 10);

  var blk = 0;
  var blkMatch = desc.match(/Gain (\d+) StS2 Intent Defend\.png Block/i);
  if (blkMatch) blk = parseInt(blkMatch[1], 10);

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
  };
  if (card.name && STAR_VALUE_OVERRIDES[card.name]) {
    var ov = STAR_VALUE_OVERRIDES[card.name];
    if (ov.dmg > dmg) dmg = ov.dmg;
    if (ov.blk > blk) blk = ov.blk;
  }

  return {dmg: dmg, blk: blk};
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
    if (heavyAtk && axes && axes.Defense < DECK_THRESHOLDS.heavyAtkBlkReq) return `Attack-heavy (${pAtk}%). Next reward: prioritise block or scaling cards over more attacks.`;
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
    Synergy: synergyScore 
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

// ── getCrisisStates ──────────────────────────────────────────
// Helper to identify critical gaps in deck composition.
function getCrisisStates(axes, targets) {
  if (!axes || !targets) return { attack: false, defense: false, scaling: false };
  return {
    attack:  axes.Attack  < (targets.Attack  * 0.5),
    defense: axes.Defense < (targets.Defense * 0.5),
    scaling: axes.Scaling < (targets.Scaling * 0.3) // Scaling crisis is more lenient
  };
}
