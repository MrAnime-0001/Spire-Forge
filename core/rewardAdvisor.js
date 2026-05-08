// core/rewardAdvisor.js
// Card scoring for reward picks, skip decisions, and shop advice.
// Returns plain data objects — no DOM, no HTML.
// Depends on: state.js, buildAnalyzer.js, deckStats.js, builds.js, constants.js
// Also reads globals from HTML scope: selectedBoss, getAllCardsForPicker(), getRarity()

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

// ── scoreCard ────────────────────────────────────────────────
// Score a single card against the current run state.
// Returns a result object used by the reward and shop UI layers.
function scoreCard(cardName) {
  if (!currentChar || !BUILD_DATA[currentChar]) return null;

  var builds   = (BUILD_DATA[currentChar] || {}).builds || {};
  var allCards = getAllCardsForPicker();
  var total    = getDeckSize();
  var axes     = calcSixAxes();
  var targets  = AXIS_TARGETS[currentAct] || AXIS_TARGETS[1];
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

      // In Phase A, starter deck always reads as attack-heavy due to low targets. Only penalize extreme overshoot.
      var atkHeavyThreshold = isPhaseA ? targets.Attack + 50 : targets.Attack + 20;
      if (axes.Attack > atkHeavyThreshold) {
        score -= 10; reasons.push('deck already attack-heavy');
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

      var defHeavyThreshold = isPhaseA ? targets.Defense + 50 : targets.Defense + 20;
      if (axes.Defense > defHeavyThreshold) {
        score -= 10; reasons.push('deck already defense-heavy');
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

  // Survival health check — used to suppress scaling/builds when survival gaps exist
  var survivalOk = axes && targets
    ? (axes.Attack || 0) >= (targets.Attack * 0.8) && (axes.Defense || 0) >= (targets.Defense * 0.8)
    : true;
  var RANK_SCORE = {S:4, A:3, B:2, C:1};
  var priorityBuilds = [];
  var synergyBuilds  = [];
  var fitsBuilds     = [];

  Object.entries(builds).forEach(function(entry) {
    var key = entry[0], b = entry[1];
    var inEssential = (b.essential || []).includes(baseName);
    var inSyn  = (b.synergy || []).includes(baseName);
    var rankMult = RANK_SCORE[b.rank] || 1;
    if (inEssential && alreadyHave === 0)  priorityBuilds.push({key: key, b: b, rankMult: rankMult});
    else if (inEssential)                   fitsBuilds.push({key: key, b: b, rankMult: rankMult});
    else if (inSyn)                         synergyBuilds.push({key: key, b: b, rankMult: rankMult});
  });

  var archClass = classifyArchetypes();
  
  // Calculate build multiplier based on commitment level
  // Hierarchical: Committed (1.5) > Building (0.8) > Exploring (0.4)
  var buildMult = 0.2; // Default baseline for random synergy
  
  var buildBonus = 0;
  var buildReason = '';

  if (priorityBuilds.length > 0) {
    var priBest = priorityBuilds.reduce(function(best, e) { return e.rankMult > best.rankMult ? e : best; }, priorityBuilds[0]);
    
    // Determine multiplier for this specific build
    var bKey = priBest.key;
    var bConf = (archClass.confidence || {})[bKey] || 0;
    var currentBuildMult = 0.4; // exploring
    if (archClass.committed === bKey) currentBuildMult = 1.5;
    else if (archClass.building.includes(bKey)) currentBuildMult = 0.8;

    var basePri = (20 + priBest.rankMult * 10);

    // Tier 1 cap to prevent forcing builds too early
    if (tier === 1) basePri = Math.min(basePri, 15);

    // Phase A (early Act 1): essential builds suppressed further — survival takes priority
    if (isPhaseA && !survivalOk) basePri = Math.min(basePri, 8);

    buildBonus = Math.round(basePri * currentBuildMult);
    buildReason = (currentBuildMult >= 1.5 ? 'core for ' : 'essential for ') + priBest.b.name;
    if (priorityBuilds.length > 1) { buildBonus += 5; buildReason += ' (+multi-build)'; }
  } else if (synergyBuilds.length > 0) {
    var synBest = synergyBuilds.reduce(function(best, e) { return e.rankMult > best.rankMult ? e : best; }, synergyBuilds[0]);
    
    var sKey = synBest.key;
    var currentSynMult = 0.3;
    if (archClass.committed === sKey) currentSynMult = 1.0;
    else if (archClass.building.includes(sKey)) currentSynMult = 0.6;

    buildBonus = Math.round((8 + synBest.rankMult * 4) * currentSynMult);
    buildReason = 'synergy: ' + synergyBuilds.map(function(e) { return e.b.name; }).join(', ');
  }

  if (buildBonus > 0) {
    score += buildBonus;
    reasons.push(buildReason);
  }

  // ── Scaling ──────────────────────────────────────────────
  if (isScl) {
    var sclGap = Math.max(0, targets.Scaling - axes.Scaling);
    var sclBonus = Math.round(sclGap * 0.4);

    // Boss priority
    if (typeof selectedBoss !== 'undefined' && selectedBoss && SCL_PRIORITY_BOSSES.has(selectedBoss)) {
      sclBonus *= 1.5;
    }

    if (tier === 1) {
      // Stricter cap for very early game — survival must come first
      if (currentAct === 1 && total < 14) {
        sclBonus = Math.min(sclBonus, 4); // Down from 8
        if (!survivalOk) sclBonus = 0;     // No scaling if survival gaps exist
        if (sclBonus > 0) reasons.push('early scaling (heavily dampened)');
        else if (!survivalOk) reasons.push('scaling suppressed: survival gap remains');
        else reasons.push('early scaling (minimal)');
      } else {
        sclBonus = Math.min(sclBonus, 8); // Existing cap
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

    // Velocity is a priority only for larger decks
    if (total < 15) {
      // Small deck: Natural cycle is enough
      score += Math.round(effBonus * 0.2);
      if (effBonus > 0) reasons.push('natural efficiency enough');
    } else if (total < 25) {
      // Medium deck: Starting to need draw
      score += Math.round(effBonus * 0.6);
      if (effGap > 0) reasons.push('improves consistency');
    } else {
      // Bloated deck: Velocity is critical
      score += Math.round(effBonus * 1.2);
      if (effGap > 0) reasons.push('CRITICAL: deck needs velocity');
    }
  }

  // ── Redundancy & Starters ────────────────────────────────
  if (alreadyHave === 1 && priorityBuilds.length === 0) {
    score -= 5; reasons.push('already have 1 copy');
  } else if (alreadyHave >= 2) {
    score -= (10 + alreadyHave * 5); reasons.push('already have ' + alreadyHave + ' copies');
  }
  if (baseName === 'Strike' || baseName === 'Defend') { score -= 40; reasons.push('starter card'); }

  // ── Rarity & Act Context ──────────────────────────────────
  var rarity = card.rarity || 'common';
  if (rarity === 'rare' && score > 20) { score += 12; reasons.push('rare find'); }
  if (rarity === 'ancient') { score += 18; reasons.push('ancient card'); }
  if (rarity === 'basic' || rarity === 'token') { score = -100; }

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
      if (rewardHit) { score += 6; reasons.push('strong vs ' + selectedBoss); }
      if (punishHit) { score -= 6; reasons.push('weak vs ' + selectedBoss); }
    }
  }

  // ── Verdict ──────────────────────────────────────────────
  var verdict, vLabel, vBorder, vBg, vColor;
  
  var _isEssential = priorityBuilds.length > 0 || (tier === 3 && buildBonus >= 30);
  var _bossReward = (typeof selectedBoss !== 'undefined') && selectedBoss && BOSS_MATRIX[selectedBoss] && (CARD_BOSS_TAGS[baseName] || []).length > 0 &&
                    BOSS_MATRIX[selectedBoss].rewards.some(function(r) {
                      return (CARD_BOSS_TAGS[baseName] || []).some(function(t) { return r.toLowerCase().includes(t.toLowerCase()); });
                    });
  var _actScale   = currentAct === 3 && ACT_SCALES_INTO.has(baseName);
  var _buildCore  = (fitsBuilds.length > 0 || synergyBuilds.length > 0) && score >= 30;

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
  } else if (synergyBuilds.length > 0 && score >= 25) {
    verdict = 'consider'; vLabel = 'SYNERGY PICK';
    vBorder = 'rgba(200,146,42,.45)'; vBg = 'rgba(200,146,42,.15)'; vColor = 'var(--amber-bright)';
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

  // ── Active Synergy Pairs ──────────────────────────────────
  var activePairs = [];
  SYNERGY_PAIRS.forEach(function(p) {
    var isA = p.a === baseName && deck[p.b] > 0;
    var isB = p.b === baseName && deck[p.a] > 0;
    if (isA || isB) {
      activePairs.push({partner: isA ? p.b : p.a, bond: p.bond, note: p.note, bonus: p.bonus});
    }
  });

  return {
    name, card, score, verdict, vLabel, vBorder, vBg, vColor,
    reasons,
    tipsBuilds: [], priorityBuilds, synergyBuilds, fitsBuilds,
    alreadyHave,
    activePairs, engineMatches: [], eradicateEstimate: null
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

  // Duplicate non-essential cards with 2+ copies
  var builds_rc = (BUILD_DATA[currentChar] || {}).builds || {};
  Object.keys(deck).forEach(function(name) {
    if ((deck[name] || 0) >= 2) {
      var isEssential = Object.values(builds_rc).some(function(b) { return (b.essential || []).includes(name); });
      if (!isEssential) {
        candidates.push({name, reason: deck[name] + ' copies \u2014 consider removing one', priority: 'low'});
      }
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
