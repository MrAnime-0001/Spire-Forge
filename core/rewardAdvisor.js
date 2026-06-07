// core/rewardAdvisor.js
// Card scoring for reward picks, skip decisions, and shop advice.
// Returns plain data objects — no DOM, no HTML.
// Depends on: state.js, buildAnalyzer.js, builds.js
// Globals: currentChar, deck, BUILD_DATA, getArchetypeCommitment(), getAllCardsForPicker()

// ── scoreCard ────────────────────────────────────────────────
// Score a card by how well it fits the detected build direction.
// Early run (no committed build): rewards flexible cards that open many builds.
// Committed run (top build ≥ 25% essential): rewards cards that advance the leading build.
function scoreCard(cardName) {
  if (!currentChar) return null;

  var allCards = getAllCardsForPicker();
  var name     = cardName;
  var baseName = name.endsWith('+') ? name.slice(0, -1) : name;
  var card     = allCards.find(function(c) { return c.name === name; }) || { name: name, type: 'skl', note: '' };
  var alreadyHave = (deck[name] || 0) + (deck[baseName] || 0);

  var commitment = (typeof getArchetypeCommitment === 'function') ? getArchetypeCommitment() : {};
  var builds = (typeof BUILD_DATA !== 'undefined' && BUILD_DATA[currentChar] && BUILD_DATA[currentChar].builds)
    ? BUILD_DATA[currentChar].builds : {};

  var totalScore     = 0;
  var bestBuild      = null;
  var bestBuildScore = 0;
  var bestTier       = null;
  var matchingBuilds = [];

  Object.keys(builds).forEach(function(key) {
    var b    = builds[key];
    var tier = 0, tierLabel = null;

    if      ((b.mustPick     || []).indexOf(baseName) !== -1) { tier = 4; tierLabel = 'mustPick'; }
    else if ((b.essential    || []).indexOf(baseName) !== -1) { tier = 3; tierLabel = 'essential'; }
    else if ((b.highPriority || []).indexOf(baseName) !== -1) { tier = 3; tierLabel = 'highPriority'; }
    else if ((b.synergy      || []).indexOf(baseName) !== -1) { tier = 2; tierLabel = 'synergy'; }

    if (tier > 0) {
      var base       = Math.max(commitment[key] || 0, 0.15);
      var buildScore = base * tier;
      totalScore    += buildScore;
      matchingBuilds.push(b.fullName || b.name || key);
      if (buildScore > bestBuildScore) {
        bestBuildScore = buildScore;
        bestBuild      = b.fullName || b.name || key;
        bestTier       = tierLabel;
      }
    }
  });

  // Detect committed direction: any build ≥ 25% essential cards
  var topCommit = 0;
  Object.keys(commitment).forEach(function(k) {
    if ((commitment[k] || 0) > topCommit) topCommit = commitment[k];
  });
  var isCommitted = topCommit >= 0.25;

  // 1-line reason string
  var reason;
  if (bestBuild) {
    if (isCommitted) {
      if      (bestTier === 'mustPick')                          reason = 'Core ' + bestBuild + ' card';
      else if (bestTier === 'highPriority' || bestTier === 'essential') reason = 'Strong pick for ' + bestBuild;
      else                                                        reason = 'Synergizes with ' + bestBuild;
      var others = matchingBuilds.length - 1;
      if (others > 0) reason += ' (also fits ' + others + ' other build' + (others > 1 ? 's' : '') + ')';
    } else {
      if      (matchingBuilds.length >= 3) reason = 'Opens ' + matchingBuilds.slice(0, 3).join(', ') + ' builds';
      else if (matchingBuilds.length === 2) reason = 'Opens ' + matchingBuilds[0] + ', ' + matchingBuilds[1] + ' builds';
      else                                  reason = 'Opens ' + matchingBuilds[0] + ' build';
    }
  } else {
    reason = 'No clear synergy with current builds';
  }

  // Verdict thresholds
  var verdict, vLabel, vBorder, vBg, vColor;
  if (totalScore >= 0.75) {
    verdict = 'pick';    vLabel = 'PICK';
    vBorder = 'rgba(106,172,95,.5)';  vBg = 'rgba(74,124,63,.15)';  vColor = 'var(--green-bright)';
  } else if (totalScore >= 0.30) {
    verdict = 'consider'; vLabel = 'CONSIDER';
    vBorder = 'rgba(200,146,42,.35)'; vBg = 'rgba(200,146,42,.15)'; vColor = 'var(--amber-bright)';
  } else {
    verdict = 'skip';    vLabel = 'SKIP';
    vBorder = 'var(--border)';        vBg = 'rgba(100,90,70,.12)';  vColor = 'var(--text-muted)';
  }

  return {
    name: name, card: card,
    score: totalScore,
    verdict: verdict, vLabel: vLabel, vBorder: vBorder, vBg: vBg, vColor: vColor,
    reasons: [reason],
    tipsBuilds: [], priorityBuilds: [], synergyBuilds: [], fitsBuilds: [],
    alreadyHave: alreadyHave,
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
    if (deck['Strike'])  addCandidate('Strike',  'starter card — dilutes draws past Act 1', 'high');
    if (deck['Defend'])  addCandidate('Defend',  'starter card — dilutes draws past Act 1', 'high');
  }

  // Remove curses / status cards (type 'other')
  Object.keys(deck).forEach(function(name) {
    var c = allCards.find(function(x) { return x.name === name; });
    if (c && c.type === 'other') {
      candidates.push({name, reason: 'dead draw — never useful in hand', priority: 'high'});
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
        candidates.push({name, reason: 'Act 1 carry — falls off in Act 3', priority: 'medium'});
      }
    });
  }

  // Duplicate cards with 2+ copies
  Object.keys(deck).forEach(function(name) {
    if ((deck[name] || 0) >= 2) {
      candidates.push({name, reason: deck[name] + ' copies — consider removing one', priority: 'low'});
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
