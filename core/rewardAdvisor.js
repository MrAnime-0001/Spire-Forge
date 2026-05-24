// core/rewardAdvisor.js
// Card scoring for reward picks, skip decisions, and shop advice.
// Returns plain data objects — no DOM, no HTML.
// Depends on: state.js, deckStats.js, constants.js
// Also reads globals from HTML scope: selectedBoss, getAllCardsForPicker(), getRarity()

// ── scoreCard ────────────────────────────────────────────────
// Score a single card against the current run state.
// Returns a result object used by the reward and shop UI layers.
function scoreCard(cardName) {
  if (!currentChar) return null;

  var allCards = getAllCardsForPicker();
  var total    = getDeckSize();
  var axes     = calcSixAxes();
  var targets  = Object.assign({}, AXIS_TARGETS[currentAct] || AXIS_TARGETS[1]);
  // Apply per-character axis overrides
  var charOverride = CHAR_AXIS_OVERRIDES && CHAR_AXIS_OVERRIDES[currentChar];
  if (charOverride) {
    Object.keys(charOverride).forEach(function(axis) {
      targets[axis] = Math.max(0, (targets[axis] || 0) + charOverride[axis]);
    });
  }
  var crisis   = getCrisisStates(axes, targets);

  var name  = cardName;
  var baseName = name.endsWith('+') ? name.slice(0, -1) : name;
  var card  = allCards.find(function(c) { return c.name === name; }) || {name: name, type: 'skl', note: ''};
  var alreadyHave = (deck[name] || 0) + (deck[baseName] || 0);

  var score = 0;
  var reasons = [];

  // ── Identification ───────────────────────────────────────
  var t = card.type || 'skl';
  var isAtk = t === 'atk' || t.includes('atk');
  var isDef = t === 'def' || t.includes('def');
  var isScl = t === 'pow' || t === 'skl' || t.includes('scl');
  var isDrawCard   = DRAW_CARDS[currentChar]   && DRAW_CARDS[currentChar].includes(baseName);
  var isEnergyCard = ENERGY_CARDS[currentChar] && ENERGY_CARDS[currentChar].includes(baseName);
  var isVelCard    = (VELOCITY_CARDS[currentChar] || []).includes(baseName);
  var isUtility    = isDrawCard || isEnergyCard || isVelCard;
  var isStarGenCard = currentChar === 'regent' && typeof VEL_STAR_GEN_BONUS !== 'undefined' && VEL_STAR_GEN_BONUS[baseName] > 0;
  var hasStarCost = currentChar === 'regent' && card.starCost > 0;

  // ── Tier Selection ───────────────────────────────────────
  // Tier 1: Act 1, small deck
  // Tier 2: Act 1 transition / early Act 2, mid deck
  // Tier 3: Late game, large deck
  var tier = 1;
  if (currentAct > 1 || total > 22) tier = 3;
  else if (total > 14) tier = 2;

  // ── Axis Gap Filling ─────────────────────────────────────
  if (axes) {
    // Dynamic Act 1 sub-tiers: Phase A (hunt), Phase B (pivot)
    var isPhaseA = currentAct === 1 && total >= DECK_THRESHOLDS.lean && total <= DECK_THRESHOLDS.act1PhaseAEnd;
    var isPhaseB = currentAct === 1 && total >= DECK_THRESHOLDS.act1PhaseAEnd + 1 && total <= DECK_THRESHOLDS.act1PhaseBEnd;
    var isEarlyGame = currentAct === 1 && total < DECK_THRESHOLDS.act1EarlyDeckMax;

    var gapMult = (isPhaseA) ? 3.0 : (tier === 1) ? 2.0 : (tier === 2) ? 1.0 : 0.5;

    // Attack
    if (isAtk) {
      var gap = Math.max(0, targets.Attack - axes.Attack);
      var bonus = Math.round(gap * 0.5 * gapMult);

      if (crisis.attack && gap > 0) {
        // SURVIVAL_CRISIS: extra multiplier when early game and critically behind
        var crisisMult = isEarlyGame ? 2.5 : 1.5;
        bonus = Math.round(gap * crisisMult);
        score += bonus;
        reasons.push('CRITICAL DAMAGE NEED (+' + bonus + ')');
      } else if (bonus > 0) {
        score += bonus;
        reasons.push('fills attack gap (+' + bonus + ')');
      }

      // Only penalize extreme attack overshoot — strong attack cards still worth picking.
      var atkHeavyThreshold = isPhaseA ? targets.Attack + 50 : targets.Attack + 35;
      if (axes.Attack > atkHeavyThreshold) {
        score -= 4; reasons.push('deck already attack-heavy');
      }
    }

    // Defense
    if (isDef) {
      var gap = Math.max(0, targets.Defense - axes.Defense);
      var bonus = Math.round(gap * 0.5 * gapMult);

      if (crisis.defense && gap > 0) {
        var crisisMult = isEarlyGame ? 2.5 : 1.5;
        bonus = Math.round(gap * crisisMult);
        score += bonus;
        reasons.push('CRITICAL BLOCK NEED (+' + bonus + ')');
      } else if (bonus > 0) {
        score += bonus;
        reasons.push('fills defense gap (+' + bonus + ')');
      }

      var defHeavyThreshold = isPhaseA ? targets.Defense + 50 : targets.Defense + 35;
      if (axes.Defense > defHeavyThreshold) {
        score -= 4; reasons.push('deck already defense-heavy');
      }
    }

    // Phase A survival dominance — 90% of score from survival, drastically suppress other categories
    if (isPhaseA) {
      var nonSurvivalPenalty = 0;
      if (!isAtk && !isDef && !isUtility) {
        nonSurvivalPenalty = 15;
        reasons.push('phase A: prioritize survival (-' + nonSurvivalPenalty + ')');
      } else if (isScl && !isDef) {
        nonSurvivalPenalty = 10;
        reasons.push('phase A: scaling penalized (-' + nonSurvivalPenalty + ')');
      }
      score -= nonSurvivalPenalty;
    }
  }

  // Survival health check — used to suppress scaling when survival gaps exist
  var survivalOk = axes && targets
    ? (axes.Attack || 0) >= (targets.Attack * 0.8) && (axes.Defense || 0) >= (targets.Defense * 0.8)
    : true;

  // ── Scaling ──────────────────────────────────────────────
  if (isScl) {
    var sclGap = Math.max(0, targets.Scaling - axes.Scaling);
    var sclBonus = Math.round(sclGap * 0.4);

    // Boss priority
    if (typeof selectedBoss !== 'undefined' && selectedBoss && SCL_PRIORITY_BOSSES.has(selectedBoss)) {
      sclBonus *= 1.5;
    }

    if (tier === 1) {
      // Strict cap only for very small decks (lean = 10) — scaling valued earlier
      if (currentAct === 1 && total < DECK_THRESHOLDS.lean) {
        sclBonus = Math.min(sclBonus, 4);
        if (!survivalOk) sclBonus = 0;
        if (sclBonus > 0) reasons.push('early scaling (heavily dampened)');
        else if (!survivalOk) reasons.push('scaling suppressed: survival gap remains');
        else reasons.push('early scaling (minimal)');
      } else {
        sclBonus = Math.min(sclBonus, 8);
        if (sclBonus > 0) reasons.push('early scaling (capped)');
      }
    } else if (tier === 2) {
      sclBonus *= 0.8;
      reasons.push('mid-game scaling');
    } else {
      reasons.push('late-game scaling');
    }
    score += Math.round(sclBonus);
  }

  // ── Efficiency / Velocity ────────────────────────────────
  if (isUtility) {
    var effGap = Math.max(0, targets.Efficiency - axes.Efficiency);
    var effBonus = Math.round(effGap * 1.0); // Slightly higher base weight for utilities

    // Velocity matters once deck grows past 20 cards
    if (total < DECK_THRESHOLDS.velocityThreshold) {   // < 20
      score += Math.round(effBonus * 0.2);
      if (effBonus > 0) reasons.push('natural efficiency enough');
    } else if (total < DECK_THRESHOLDS.tooLarge) {     // < 30
      score += Math.round(effBonus * 0.6);
      if (effGap > 0) reasons.push('improves consistency');
    } else {
      score += Math.round(effBonus * 1.2);
      if (effGap > 0) reasons.push('CRITICAL: deck needs velocity');
    }
  }

  // ── Star Economy (Regent) ─────────────────────────────────
  if (currentChar === 'regent' && typeof VEL_STAR_GEN_BONUS !== 'undefined') {
    var starGenCount = 0;
    Object.keys(deck).forEach(function(n) {
      if (VEL_STAR_GEN_BONUS[n]) starGenCount += deck[n];
    });
    var starSpendersInDeck = 0;
    allCards.forEach(function(c) {
      if (c.starCost && deck[c.name]) starSpendersInDeck += deck[c.name];
    });
    if (hasStarCost && starGenCount === 0 && alreadyHave === 0) {
      score -= 15;
      reasons.push('no star generation in deck');
    }
    if (isStarGenCard && starSpendersInDeck === 0 && alreadyHave === 0) {
      score -= 5;
      reasons.push('no star spenders in deck');
    }
    if (isStarGenCard) isUtility = true;
    // Star generation check: if <3 star-gen cards in deck, boost generators
    if (starGenCount < 3 && isStarGenCard && alreadyHave === 0) {
      score += 5; reasons.push('star generation needed (+5)');
    }
  }

  // ── Energy Generation Check ──────────────────────────────
  // Boost energy-generating cards when deck has grown but lacks energy
  // Expanded: accounts for character-specific energy sources (Regent stars, Necrobinder souls)
  if (isEnergyCard || (typeof VEL_ENERGY_BONUS !== 'undefined' && VEL_ENERGY_BONUS[baseName] > 0)) {
    var deckEnergyTotal = 0;
    Object.keys(deck).forEach(function(n) {
      if (VEL_ENERGY_BONUS[n]) deckEnergyTotal += VEL_ENERGY_BONUS[n] * deck[n];
    });
    // Regent: Star generation acts as energy substitute
    if (currentChar === 'regent' && typeof VEL_STAR_GEN_BONUS !== 'undefined') {
      Object.keys(deck).forEach(function(n) { if (VEL_STAR_GEN_BONUS[n]) deckEnergyTotal += VEL_STAR_GEN_BONUS[n] * 0.5; });
    }
    // Necrobinder: Soul generation acts as energy substitute (0-cost draw 2)
    if (currentChar === 'necrobinder') {
      var soulGenCards = 0;
      Object.keys(deck).forEach(function(n) {
        if (n === 'Capture Spirit' || n === 'Dirge' || n === 'Severance' || n === 'Haunt') soulGenCards += deck[n];
      });
      deckEnergyTotal += soulGenCards * 0.5;
    }
    if (total >= 15 && deckEnergyTotal < 3) {
      score += 10;
      reasons.push('deck low on energy generation (+10)');
    }
  }

  // ── Per-Character Scoring Hooks ──────────────────────────
  // Guide-derived bonuses for unique character mechanics

  // Necrobinder: Grave Warden is best common card in the game
  if (currentChar === 'necrobinder' && baseName === 'Grave Warden') {
    score += 10; reasons.push('Grave Warden: best common card (+10)');
  }

  // Necrobinder: Osty + heal awareness — heal effects heal YOU, not Osty
  // So heal cards don't get extra Osty protection bonus
  if (currentChar === 'necrobinder' && baseName === 'Reanimate' && alreadyHave === 0) {
    score -= 3; reasons.push('Reanimate heals you, not Osty (-3)');
  }

  // Defect: Defragment is #1 priority when no Focus sources
  if (currentChar === 'defect' && baseName === 'Defragment') {
    var hasFocus = false;
    Object.keys(deck).forEach(function(n) {
      if (n === 'Defragment' || n === 'Defragment+' || n === 'Biased Cognition' || n === 'Biased Cognition+' || n === 'Loop' || n === 'Loop+') hasFocus = true;
    });
    if (!hasFocus) { score += 12; reasons.push('no Focus source — Defragment is #1 priority (+12)'); }
  }

  // Defect: Claw scaling — if deck has 1+ Claw, boost more Claws and support
  if (currentChar === 'defect' && (baseName === 'Claw' || baseName === 'All for One' || baseName === 'Scrape')) {
    var clawCount = (deck['Claw'] || 0) + (deck['Claw+'] || 0);
    if (clawCount >= 1) {
      if (baseName === 'Claw') { score += 5; reasons.push('Claw scaling (+5)'); }
      else if (baseName === 'All for One') { score += 5; reasons.push('Claw loop support (+5)'); }
      else if (baseName === 'Scrape') { score += 3; reasons.push('Claw cycling (+3)'); }
    }
  }

  // Silent: Nightmare combo — Nightmare in deck boosts Catalyst and Wraith Form
  if (currentChar === 'silent' && (deck['Nightmare'] || deck['Nightmare+'])) {
    if (baseName === 'Catalyst') { score += 10; reasons.push('Nightmare -> Catalyst combo (+10)'); }
    if (baseName === 'Wraith Form') { score += 8; reasons.push('Nightmare -> Wraith Form combo (+8)'); }
  }

  // Silent: Calculated Gamble + discard engine
  if (currentChar === 'silent' && (deck['Calculated Gamble'] || deck['Calculated Gamble+'])) {
    if (baseName === 'Tactician') { score += 8; reasons.push('Calculated Gamble loop (+8)'); }
    if (baseName === 'Reflex') { score += 6; reasons.push('Calculated Gamble cycle (+6)'); }
    if (baseName === 'Acrobatics') { score += 5; reasons.push('Gamble + Acrobatics finder (+5)'); }
  }

  // Regent: Void Form detection — boost 0-2 cost cards
  if (currentChar === 'regent' && (deck['Void Form'] || deck['Void Form+'])) {
    if (card.cost === 0 || card.cost === 1 || card.cost === 2) {
      score += 5; reasons.push('Void Form — low-cost synergy (+5)');
    }
  }

  // Regent: Sword Sage + Forge synergy
  if (currentChar === 'regent' && (deck['Sword Sage'] || deck['Sword Sage+'])) {
    var FORGE_CARDS = {'Seeking Edge':1, 'Conqueror':1, 'The Smith':1, 'Refine Blade':1, 'Sword Stage':1, 'Spoils of Battle':1, 'Solar Strike':1, 'Beat into Shape':1, 'Bulwark':1, 'Big Bang':1, 'Hammer Time':1};
    if (FORGE_CARDS[baseName]) { score += 8; reasons.push('Forge + Sword Sage synergy (+8)'); }
  }

  // Regent: Sovereign Blade forge charge curve — if deck has Blade and many forge cards, it's scaling
  if (currentChar === 'regent' && (deck['Sovereign Blade'] || deck['Sovereign Blade+'])) {
    var forgeCount = 0;
    Object.keys(deck).forEach(function(n) {
      if (n === 'Seeking Edge' || n === 'Seeking Edge+' || n === 'Conqueror' || n === 'Conqueror+') forgeCount += deck[n];
      if (n === 'The Smith' || n === 'The Smith+' || n === 'Refine Blade' || n === 'Refine Blade+') forgeCount += deck[n];
      if (n === 'Sword Stage' || n === 'Sword Stage+' || n === 'Beat into Shape' || n === 'Beat into Shape+') forgeCount += deck[n];
      if (n === 'Solar Strike' || n === 'Solar Strike+' || n === 'Spoils of Battle' || n === 'Spoils of Battle+') forgeCount += deck[n];
      if (n === 'Bulwark' || n === 'Bulwark+' || n === 'Big Bang' || n === 'Big Bang+') forgeCount += deck[n];
      if (n === 'Hammer Time' || n === 'Hammer Time+') forgeCount += deck[n];
    });
    if (forgeCount >= 3) {
      if (baseName === 'Sovereign Blade') { score += 10; reasons.push('Sovereign Blade scales with forge charges (+10)'); }
    }
  }

  // Ironclad: Dead Branch + Corruption infinite detection
  if (currentChar === 'ironclad' && (deck['Corruption'] || deck['Corruption+']) && relics.indexOf('Dead Branch') >= 0) {
    if (baseName === 'Corruption') { score += 15; reasons.push('Dead Branch + Corruption infinite (+15)'); }
  }

  // Ironclad: Mark of Pain + Evolve synergy
  if (currentChar === 'ironclad' && baseName === 'Evolve') {
    var hasStatusGen = Object.keys(deck).some(function(n) {
      return n === 'Mark of Pain' || n === 'Power Through' || n === 'Wild Strike';
    });
    if (hasStatusGen) { score += 8; reasons.push('Evolve draws from status cards (+8)'); }
  }

  // Silent: Poison bypass — Poison cards get bonus in Acts 2-3 (high block enemies)
  if (currentChar === 'silent' && currentAct >= 2) {
    var POISON_CARDS = {'Noxious Fumes':1,'Noxious Fumes+':1,'Deadly Poison':1,'Deadly Poison+':1,'Catalyst':1,'Catalyst+':1,'Burst':1,'Burst+':1,'Bubble Bubble':1,'Bubble Bubble+':1,'Bouncing Flask':1,'Bouncing Flask+':1,'Poisoned Stab':1,'Poisoned Stab+':1,'Corrosive Wave':1,'Corrosive Wave+':1,'Haze':1,'Haze+':1,'Envenom':1,'Envenom+':1};
    if (POISON_CARDS[baseName]) { score += 5; reasons.push('Poison bypasses Block in Act 2-3 (+5)'); }
  }

  // Defect: Echo Form + powers synergy
  if (currentChar === 'defect' && (deck['Echo Form'] || deck['Echo Form+'])) {
    if (isScl && (card.rarity === 'rare' || card.rarity === 'ancient')) {
      score += 3; reasons.push('Echo Form doubles this power (+3)');
    }
  }

  // Defect: Frost automated defense — reduce block card urgency when Frost orbs present
  if (currentChar === 'defect') {
    var frostInDeck = Object.keys(deck).some(function(n) { return n === 'Glacier' || n === 'Glacier+' || n === 'Coolheaded' || n === 'Coolheaded+' || n === 'Chill' || n === 'Chill+'; });
    if (frostInDeck && isDef && alreadyHave === 0) {
      score -= 2; reasons.push('Frost orbs handle block (-2)');
    }
  }

  // Necrobinder: Doom synergy — Countdown/Danse in deck boosts Doom-applying cards
  if (currentChar === 'necrobinder' && (deck['Countdown'] || deck['Countdown+'] || deck['Danse Macabre'] || deck['Danse Macabre+'])) {
    var DOOM_CARDS = {'Capture Spirit':1,'Countdown':1,'Danse Macabre':1,'Grave Warden':1,'Scourge':1,'Scourge+':1,'Deathbringer':1,'Deathbringer+':1,'No Escape':1,'No Escape+':1,'End of Days':1,'End of Days+':1,'Time\'s Up':1,'Time\'s Up+':1,'Blight Strike':1,'Blight Strike+':1,'Oblivion':1,'Oblivion+':1,'Negative Pulse':1,'Negative Pulse+':1};
    if (DOOM_CARDS[baseName]) { score += 6; reasons.push('Doom synergy active (+6)'); }
  }

  // Necrobinder: Eradicate nuke estimate — scales with Doom count and Amplify synergy
  if (currentChar === 'necrobinder' && baseName === 'Eradicate') {
    var doomCount = 0;
    Object.keys(deck).forEach(function(n) {
      if (n === 'Countdown' || n === 'Countdown+' || n === 'Danse Macabre' || n === 'Danse Macabre+' || n === 'Capture Spirit' || n === 'Capture Spirit+') doomCount += deck[n];
    });
    if (doomCount >= 2) { score += 6; reasons.push('Eradicate nuke with Doom setup (+6)'); }
    if (deck['Lethality'] || deck['Lethality+']) { score += 4; reasons.push('Amplify + Lethality synergy (+4)'); }
  }

  // Necrobinder: Soul generation check — boost Soul generators if <2 sources
  if (currentChar === 'necrobinder') {
    var soulGenCount = 0;
    Object.keys(deck).forEach(function(n) {
      if (n === 'Capture Spirit' || n === 'Dirge' || n === 'Severance' || n === 'Reave' || n === 'Glimpse Beyond' || n === 'Haunt') soulGenCount += deck[n];
    });
    if (soulGenCount < 2) {
      var SOUL_GEN_CARDS = {'Capture Spirit':1,'Capture Spirit+':1,'Dirge':1,'Dirge+':1,'Severance':1,'Severance+':1,'Reave':1,'Reave+':1,'Glimpse Beyond':1,'Glimpse Beyond+':1};
      if (SOUL_GEN_CARDS[baseName]) { score += 6; reasons.push('Soul generation needed (+6)'); }
    }
  }

  // Ironclad: Bloodletting HP valuation — don't penalize attack-heavy when HP-spending
  if (currentChar === 'ironclad' && (deck['Bloodletting'] || deck['Bloodletting+'] || deck['Offering'] || deck['Offering+'])) {
    if (baseName === 'Bloodletting' || baseName === 'Offering' || baseName === 'Rupture' || baseName === 'Combust') {
      score += 3; reasons.push('HP as resource — intentional tradeoff (+3)');
    }
  }

  // HOLY TRINITY detection: check deck for frontload block + damage + scaling coverage
  var hasFrontloadBlock = axes && axes.Defense >= (targets.Defense * 0.5);
  var hasFrontloadDmg = axes && axes.Attack >= (targets.Attack * 0.5);
  var hasScaling = axes && axes.Scaling >= (targets.Scaling * 0.5);
  if (axes) {
    if (!hasFrontloadBlock && isDef && alreadyHave === 0) {
      score += 4; reasons.push('Holy Trinity: missing block (+4)');
    }
    if (!hasFrontloadDmg && isAtk && alreadyHave === 0) {
      score += 4; reasons.push('Holy Trinity: missing damage (+4)');
    }
    if (!hasScaling && isScl && alreadyHave === 0) {
      score += 4; reasons.push('Holy Trinity: missing scaling (+4)');
    }
  }

  // Build-dependent value: cards whose score varies heavily by build context
  // Comet: S-tier in Void Form, situational otherwise
  if (baseName === 'Comet') {
    if (currentChar === 'regent' && (deck['Void Form'] || deck['Void Form+'])) { score += 8; reasons.push('Comet + Void Form synergy (+8)'); }
    else { score -= 4; reasons.push('Comet needs Void Form for full value (-4)'); }
  }
  // Body Slam: only valuable with Barricade or high block gen
  if (baseName === 'Body Slam' && !(deck['Barricade'] || deck['Barricade+']) && alreadyHave === 0) {
    score -= 4; reasons.push('Body Slam needs Barricade for full value (-4)');
  }
  // Rupture: only valuable with self-damage
  if (baseName === 'Rupture' && !(deck['Bloodletting'] || deck['Bloodletting+'] || deck['Combust'] || deck['Combust+']) && alreadyHave === 0) {
    score -= 4; reasons.push('Rupture needs self-damage to trigger (-4)');
  }

  // Weak-applying cards get defense credit
  var WEAK_CARDS = {'Neutralize':1,'Neutralize+':1,'Sucker Punch':1,'Sucker Punch+':1,'Piercing Wail':1,'Piercing Wail+':1,'Leg Sweep':1,'Leg Sweep+':1,'Go for the Eyes':1,'Go for the Eyes+':1,'Malaise':1,'Malaise+':1};
  if (WEAK_CARDS[baseName]) {
    score += 5; reasons.push('applies Weak — pseudo-defense (+5)');
  }

  // Vulnerable-applying cards get attack credit
  var VULN_CARDS = {'Bash':1,'Bash+':1,'Tremble':1,'Tremble+':1,'Thunderclap':1,'Thunderclap+':1,'Uppercut':1,'Uppercut+':1,'Beam Cell':1,'Beam Cell+':1,'Expose':1,'Expose+':1,'Fear':1,'Fear+':1,'Know Thy Place':1,'Know Thy Place+':1,'Molten Fist':1,'Molten Fist+':1,'Break':1,'Break+':1,'Assassinate':1,'Assassinate+':1};
  if (VULN_CARDS[baseName]) {
    score += 5; reasons.push('applies Vulnerable — damage amp (+5)');
  }

  // ── Ascension Modifiers ───────────────────────────────────
  // Guide-derived bonuses that scale with ascension level
  if (typeof currentAsc !== 'undefined' && currentAsc > 0) {
    // Global: A8+ Tough Enemies — scaling cards more valuable
    if (currentAsc >= 8 && isScl) { score += 3; reasons.push('A8: scaling needed (+3)'); }
    // Global: A9+ Deadly Enemies — defense cards more valuable
    if (currentAsc >= 9 && (isDef || isUtility)) { score += 3; reasons.push('A9: more block needed (+3)'); }
    // A10+ general difficulty awareness
    if (currentAsc >= 10) { score += 2; reasons.push('A10: high difficulty (+2)'); }

    // Ironclad: A10+ Strength sources boost
    if (currentAsc >= 10 && currentChar === 'ironclad' && (baseName === 'Demon Form' || baseName === 'Inflame' || baseName === 'Spot Weakness' || baseName === 'Rupture')) {
      score += 5; reasons.push('A10+ Strength priority (+5)');
    }
    // Silent: A5+ Wraith Form priority
    if (currentAsc >= 5 && currentChar === 'silent' && (baseName === 'Wraith Form')) { score += 8; reasons.push('A5+ Wraith Form saves runs (+8)'); }
    // Silent: A15+ Catalyst priority
    if (currentAsc >= 15 && currentChar === 'silent' && (baseName === 'Catalyst')) { score += 6; reasons.push('A15+ Catalyst scaling (+6)'); }
    // Defect: A10+ Biased Cog priority
    if (currentAsc >= 10 && currentChar === 'defect' && (baseName === 'Biased Cognition')) { score += 6; reasons.push('A10+ Focus priority (+6)'); }
    // Defect: A18+ Echo Form priority
    if (currentAsc >= 18 && currentChar === 'defect' && (baseName === 'Echo Form')) { score += 8; reasons.push('A18+ Echo Form doubles (+8)'); }
    // Regent: A15+ Child of the Stars priority
    if (currentAsc >= 15 && currentChar === 'regent' && (baseName === 'Child of the Stars')) { score += 6; reasons.push('A15+ Star economy (+6)'); }
    // Necrobinder: A5+ Summon cards priority
    if (currentAsc >= 5 && currentChar === 'necrobinder') {
      var SUMMON_CARDS = {'Dirge':1,'Bodyguard':1,'Pull Aggro':1,'Cleanse':1,'Afterlife':1,'Spur':1,'Reanimate':1,'Legion of Bone':1};
      if (SUMMON_CARDS[baseName]) { score += 5; reasons.push('A5+ Osty safety (+5)'); }
    }
    // Necrobinder: A18+ Soul cards priority
    if (currentAsc >= 18 && currentChar === 'necrobinder') {
      var SOUL_CARDS = {'Haunt':1,'Capture Spirit':1,'Soul Storm':1,'Dirge':1,'Devour Life':1,'Severance':1,'Grave Warden':1,'Reave':1,'Glimpse Beyond':1};
      if (SOUL_CARDS[baseName]) { score += 5; reasons.push('A18+ Soul cycling (+5)'); }
    }
  }

  // ── Combat Mechanics Scoring ─────────────────────────────
  // AoE priority: boost AoE cards in multi-enemy heavy acts
  var AOE_CARDS = {'Whirlwind':1,'Whirlwind+':1,'Thunderclap':1,'Thunderclap+':1,'Immolate':1,'Immolate+':1,'Stomp':1,'Stomp+':1,'Howl from Beyond':1,'Howl from Beyond+':1,'Conflagration':1,'Conflagration+':1,'Dagger Spray':1,'Dagger Spray+':1,'Sweeping Beam':1,'Sweeping Beam+':1,'Hyperbeam':1,'Hyperbeam+':1,'Electrodynamics':1,'Seven Stars':1,'Seven Stars+':1,'Meteor Shower':1,'Meteor Shower+':1,'Crash Landing':1,'Crash Landing+':1,'Astral Pulse':1,'Astral Pulse+':1,'Lunar Blast':1,'Lunar Blast+':1,'Sow':1,'Sow+':1,'Banshee\'s Cry':1,'Banshee\'s Cry+':1,'Grand Finale':1,'Grand Finale+':1,'Echoing Slash':1,'Echoing Slash+':1};
  if (currentAct >= 2 && AOE_CARDS[baseName]) {
    score += 5; reasons.push('AoE valuable in Act 2+ (+5)');
  }

  // Burst vs Sustain: if deck lacks scaling by Act 3, boost scaling cards
  if (currentAct >= 3) {
    var scalingSources = 0;
    Object.keys(deck).forEach(function(n) {
      if (ACT_SCALES_INTO.has(n) || ACT_SCALES_INTO.has(n.slice(0, -1))) scalingSources++;
    });
    if (scalingSources < 3 && isScl) {
      score += 8; reasons.push('Act 3: need more scaling (+8)');
    }
    // No AoE by Act 3 → urgent
    var hasAoe = Object.keys(deck).some(function(n) { return AOE_CARDS[n]; });
    if (!hasAoe && AOE_CARDS[baseName]) {
      score += 10; reasons.push('Act 3: zero AoE in deck, critical (+10)');
    }
  }

  // Multi-hit + Strength synergy
  var multiHitInDeck = Object.keys(deck).some(function(n) { return MULTI_HIT_CARDS[currentChar] && MULTI_HIT_CARDS[currentChar][n]; });
  var strengthInDeck = Object.keys(deck).some(function(n) { return n.indexOf('Strength') >= 0 || n === 'Demon Form' || n === 'Inflame' || n === 'Rupture' || n === 'Spot Weakness' || n === 'Fight Me!' || n === 'Limit Break'; });
  if (multiHitInDeck && strengthInDeck && MULTI_HIT_CARDS[currentChar] && MULTI_HIT_CARDS[currentChar][baseName]) {
    score += 6; reasons.push('Strength + multi-hit synergy (+6)');
  }

  // Elite-specific urgency: Byrdonis (Overgrowth elite) demands 3-turn kill
  // When Byrdonis is selected or if in Overgrowth Act 1
  var inOvergrowth = currentAct === 1; // Overgrowth is Act 1
  if (inOvergrowth && isAtk && total <= 12) {
    score += 4; reasons.push('early Overgrowth: damage urgency (+4)');
  }

  // ── Redundancy & Starters ────────────────────────────────
  if (alreadyHave === 1) {
    score -= 5; reasons.push('already have 1 copy');
  } else if (alreadyHave >= 2) {
    score -= (10 + alreadyHave * 5); reasons.push('already have ' + alreadyHave + ' copies');
  }
  if (baseName === 'Strike' || baseName === 'Defend') { score -= 40; reasons.push('starter card'); }

  // ── Rarity & Act Context ──────────────────────────────────
  var rarity = card.rarity || 'common';
  if (rarity === 'rare' && score > 20) { score += 12; reasons.push('rare find'); }
  if (rarity === 'ancient') { score += 18; reasons.push('ancient card'); }
  // Basic/token cards that would score -100 — but some are actually useful (starter non-Strike/Defend)
  var USEFUL_BASIC_CARDS = {
    'Falling Star':1, 'Venerate':1, 'Sovereign Blade':1,
    'Bodyguard':1, 'Unleash':1,
    'Bash':1, 'Neutralize':1, 'Survivor':1, 'Zap':1, 'Dualcast':1
  };
  if ((rarity === 'basic' || rarity === 'token') && !USEFUL_BASIC_CARDS[baseName]) { score = -100; }

  if (currentAct >= 2 && ACT_SCALES_INTO.has(baseName)) {
    score += 5; reasons.push('scales well');
  }
  if (currentAct === 3 && ACT_CARRY_FALLOFF.has(baseName)) {
    score -= 8; reasons.push('falls off late game');
  }

  // ── Boss adaptation ───────────────────────────────────────
  if (typeof selectedBoss !== 'undefined' && selectedBoss && BOSS_MATRIX[selectedBoss]) {
    var bMatrix  = BOSS_MATRIX[selectedBoss];
    var cardTags = CARD_BOSS_TAGS[baseName] || [];
    if (cardTags.length > 0) {
      var rewardHit = bMatrix.rewards.some(function(r) {
        return cardTags.some(function(t) { return r.toLowerCase().includes(t.toLowerCase()); });
      });
      var punishHit = bMatrix.punishes.some(function(p) {
        return cardTags.some(function(t) { return p.toLowerCase().includes(t.toLowerCase()); });
      });
      if (rewardHit) { score += 10; reasons.push('strong vs ' + selectedBoss + ' (+10)'); }
      if (punishHit) { score -= 10; reasons.push('weak vs ' + selectedBoss + ' (-10)'); }
    }
  }

  // ── Verdict ──────────────────────────────────────────────
  var verdict, vLabel, vBorder, vBg, vColor;
  
  var _isEssential = false;
  var _bossReward = (typeof selectedBoss !== 'undefined') && selectedBoss && BOSS_MATRIX[selectedBoss] && (CARD_BOSS_TAGS[baseName] || []).length > 0 &&
                    BOSS_MATRIX[selectedBoss].rewards.some(function(r) {
                      return (CARD_BOSS_TAGS[baseName] || []).some(function(t) { return r.toLowerCase().includes(t.toLowerCase()); });
                    });
  var _actScale   = currentAct === 3 && ACT_SCALES_INTO.has(baseName);
  // Build detection: check BUILD_DATA for current character
  var priorityBuilds = [];
  var synergyBuilds = [];
  var fitsBuilds = [];
  var tipsBuilds = [];
  if (typeof BUILD_DATA !== 'undefined' && BUILD_DATA[currentChar]) {
    var cb = BUILD_DATA[currentChar].builds;
    if (cb) {
      Object.keys(cb).forEach(function(bk) {
        var b = cb[bk];
        var isE = (b.essential || []).indexOf(baseName) >= 0;
        var isS = (b.synergy || []).indexOf(baseName) >= 0;
        if (isE) { priorityBuilds.push({key:currentChar+'.'+bk, b:b, buildKey:bk}); }
        else if (isS) { synergyBuilds.push({key:currentChar+'.'+bk, b:b, buildKey:bk}); }
        if (isE || isS) { fitsBuilds.push({key:currentChar+'.'+bk, b:b, buildKey:bk}); }
      });
    }
  }
  var _buildCore  = priorityBuilds.length > 0;
  // Build core bonus: essential build cards get +5
  if (_buildCore) {
    score += 5; reasons.push('build core card (+5)');
  }

  // Build context tier display
  if (priorityBuilds.length > 0) {
    var priorityBuildNames = priorityBuilds.map(function(p) { return p.b.name; }).join(', ');
    reasons.push('Must Pick for ' + priorityBuildNames + ' build');
  } else if (synergyBuilds.length > 0) {
    var synergyBuildNames = synergyBuilds.map(function(s) { return s.b.name; }).join(', ');
    reasons.push('Synergizes with ' + synergyBuildNames + ' build');
  }

  // Relic data UI: show if relics enable detected builds
  if (relics && relics.length > 0 && priorityBuilds.length > 0) {
    priorityBuilds.forEach(function(p) {
      if (p.b.relicPriority) {
        var matchedRelics = p.b.relicPriority.filter(function(r) { return relics.indexOf(r) >= 0; });
        if (matchedRelics.length > 0) {
          reasons.push('Your ' + matchedRelics.join(', ') + ' enables ' + p.b.name + ' build');
        }
      }
    });
  }

  // Build-context boss amplification: extra ±5 when card is boss-relevant AND build core
  if (selectedBoss && BOSS_MATRIX[selectedBoss] && _buildCore && CARD_BOSS_TAGS[baseName] && CARD_BOSS_TAGS[baseName].length > 0) {
    var bm = BOSS_MATRIX[selectedBoss];
    var tags = CARD_BOSS_TAGS[baseName];
    var bossRewardHit = bm.rewards.some(function(r) { return tags.some(function(t) { return r.toLowerCase().includes(t.toLowerCase()); }); });
    var bossPunishHit = bm.punishes.some(function(p) { return tags.some(function(t) { return p.toLowerCase().includes(t.toLowerCase()); }); });
    if (bossRewardHit) { score += 5; reasons.push('build-matched boss reward (+5)'); }
    if (bossPunishHit) { score -= 5; reasons.push('build-matched boss punish (-5)'); }
  }

  // New Verdict Hierarchy: Survival > Boss Counter > Essential Build > Synergy
  if (score < 15) {
    verdict = 'skip'; vLabel = 'SKIP';
    vBorder = 'var(--border)'; vBg = 'rgba(100,90,70,.12)'; vColor = 'var(--text-muted)';
  } else if (crisis.attack && isAtk && score >= 25) {
    verdict = 'pick'; vLabel = 'SURVIVAL: DAMAGE';
    vBorder = 'rgba(192,66,26,.6)'; vBg = 'rgba(192,66,26,.15)'; vColor = '#ff6040';
  } else if (crisis.defense && isDef && score >= 25) {
    verdict = 'pick'; vLabel = 'SURVIVAL: BLOCK';
    vBorder = 'rgba(74,154,138,.6)'; vBg = 'rgba(74,154,138,.15)'; vColor = 'var(--teal-bright)';
  } else if (_isEssential) {
    verdict = 'pick'; vLabel = 'ESSENTIAL';
    vBorder = 'rgba(74,154,138,.5)'; vBg = 'rgba(74,154,138,.15)'; vColor = 'var(--teal-bright)';
  } else if (_bossReward && score >= 30) {
    verdict = 'pick'; vLabel = 'BOSS COUNTER';
    vBorder = 'rgba(192,66,26,.5)'; vBg = 'rgba(192,66,26,.12)'; vColor = '#e07050';
  } else if (_buildCore) {
    verdict = 'pick'; vLabel = 'BUILD CORE';
    vBorder = 'rgba(106,172,95,.4)'; vBg = 'rgba(74,124,63,.12)'; vColor = 'var(--green-bright)';
  } else if (_actScale && score >= 20) {
    verdict = 'consider'; vLabel = 'ACT 3 SCALE';
    vBorder = 'rgba(154,106,186,.45)'; vBg = 'rgba(154,106,186,.1)'; vColor = 'var(--purple-bright)';
  } else if (score >= 40) {
    verdict = 'pick'; vLabel = 'PICK THIS';
    vBorder = 'rgba(106,172,95,.4)'; vBg = 'rgba(74,124,63,.2)'; vColor = 'var(--green-bright)';
  } else if (score >= 20) {
    verdict = 'consider'; vLabel = 'CONSIDER';
    vBorder = 'rgba(200,146,42,.35)'; vBg = 'rgba(200,146,42,.15)'; vColor = 'var(--amber-bright)';
  } else {
    verdict = 'skip'; vLabel = 'SKIP';
    vBorder = 'var(--border)'; vBg = 'rgba(100,90,70,.12)'; vColor = 'var(--text-muted)';
  }

  return {
    name, card, score, verdict, vLabel, vBorder, vBg, vColor,
    reasons,
    tipsBuilds: tipsBuilds, priorityBuilds: priorityBuilds, synergyBuilds: synergyBuilds, fitsBuilds: fitsBuilds,
    alreadyHave,
    activePairs: [], engineMatches: [], eradicateEstimate: null
  };
}

// ── scoreRewardPool ──────────────────────────────────────────
// Score a pool of card names and return them sorted best-first.
function scoreRewardPool(cardNames) {
  var scored = cardNames.map(scoreCard).filter(Boolean);
  scored.sort(function(a, b) { return b.score - a.score; });
  return scored;
}

// ── getRemoveCandidates ──────────────────────────────────────
// Returns a prioritised list of cards to consider removing at a shop.
// Each entry: {name, reason, priority}   priority: 'high' | 'medium' | 'low'
function getRemoveCandidates() {
  if (!currentChar) return [];
  var candidates = [];
  var deckSize   = getDeckSize();
  var allCards   = getAllCardsForPicker();

  function addCandidate(name, reason, priority) {
    if (deck[name] && deck[name] > 0) {
      candidates.push({name, reason, priority});
    }
  }

  // Always remove extra starters once deck has grown
  if (deckSize > 8) {
    if (deck['Strike'])  addCandidate('Strike',  'starter card \u2014 dilutes draws past Act 1', 'high');
    if (deck['Defend'])  addCandidate('Defend',  'starter card \u2014 dilutes draws past Act 1', 'high');
  }

  // Remove curses / status cards (type 'other')
  Object.keys(deck).forEach(function(name) {
    var c = allCards.find(function(x) { return x.name === name; });
    if (c && c.type === 'other') {
      candidates.push({name, reason: 'dead draw \u2014 never useful in hand', priority: 'high'});
    }
  });

  // Anti-synergy: cards that actively hurt the detected archetypes
  var deckTags = detectDeckArchetypes(deck);
  deckTags.forEach(function(tag) {
    var badCards = ARCHETYPE_ANTI_SYNERGY[tag] || [];
    badCards.forEach(function(name) {
      if (deck[name]) {
        candidates.push({name, reason: 'clashes with your ' + tag + ' archetype', priority: 'medium'});
      }
    });
  });

  // Act 3: fall-off cards that have lost their value
  if (currentAct === 3) {
    ACT_CARRY_FALLOFF.forEach(function(name) {
      if (deck[name]) {
        candidates.push({name, reason: 'Act 1 carry \u2014 falls off in Act 3', priority: 'medium'});
      }
    });
  }

  // Duplicate cards with 2+ copies
  Object.keys(deck).forEach(function(name) {
    if ((deck[name] || 0) >= 2) {
      candidates.push({name, reason: deck[name] + ' copies \u2014 consider removing one', priority: 'low'});
    }
  });

  // Deduplicate by card name, keeping highest priority
  var seen = {};
  var PRIORITY_RANK = {high: 0, medium: 1, low: 2};
  candidates = candidates.filter(function(c) {
    if (seen[c.name] === undefined || PRIORITY_RANK[c.priority] < PRIORITY_RANK[seen[c.name]]) {
      seen[c.name] = c.priority;
      return true;
    }
    return false;
  });

  candidates.sort(function(a, b) { return PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority]; });
  return candidates;
}

// ── getEradicateNukeEstimate ─────────────────────────────────
// Estimate burst damage ceiling for Eradicate (Necrobinder rare).
// Eradicate: "Deal 11 damage X times" (base) / 14 (upgraded).
// Sums base energy + VEL_ENERGY_BONUS cards in deck to estimate X.
// Used by renderEngineTracker() in resultView.js.
function getEradicateNukeEstimate() {
  if (!currentChar || currentChar !== 'necrobinder') return null;

  var hasBase = deck['Eradicate'] > 0;
  var hasUpg  = deck['Eradicate+'] > 0;
  if (!hasBase && !hasUpg) return null;

  var baseEnergy = 3 - (deck['Ascender\'s Bane'] > 0 ? 1 : 0); // Ascender's Bane replaces a card, reducing energy generation potential
  var energyBonus = 0;
  Object.keys(VEL_ENERGY_BONUS).forEach(function(card) {
    var count = deck[card] || 0;
    if (count > 0) energyBonus += VEL_ENERGY_BONUS[card] * count;
  });

  // Energy cards (one-shot): add their count as burst fuel
  var necroEnergy = ENERGY_CARDS.necrobinder || [];
  necroEnergy.forEach(function(card) {
    var count = deck[card] || 0;
    if (count > 0 && !VEL_ENERGY_BONUS[card]) energyBonus += count * 1; // generic energy cards
  });

  var totalEnergy = baseEnergy + energyBonus;
  var baseDmg = hasUpg ? 14 : 11;
  var baseTotal = baseDmg * totalEnergy;
  var withMultipliers = baseTotal;

  // Check for Amplify synergy: Lethality (+50%), Debilitate (Vulnerable +50%)
  if (deck['Lethality'] > 0 || deck['Lethality+'] > 0) withMultipliers = Math.round(withMultipliers * 1.5);
  if (deck['Debilitate'] > 0 || deck['Debilitate+'] > 0) withMultipliers = Math.round(withMultipliers * 1.5);

  return { energy: totalEnergy, base: baseTotal, withMultipliers: withMultipliers };
}
