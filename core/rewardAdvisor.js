// core/rewardAdvisor.js
// Card scoring for reward picks, manual adds, upgrades and shop removals.
// Returns plain data objects — no DOM, no HTML.
// Depends on: deckStats.js (cardRoles, calcSixAxes, getCrisisStates, getArchetypeCommitment),
//             constants.js (AXIS_TARGETS, REGION_DATA, DECK_THRESHOLDS), builds.js, ui/helpers.js (findCard)

// ── Scoring model ────────────────────────────────────────────
// score = power (how strong the card is on its own, shrinks a little each act)
//       + need  (fixes a weak deck axis vs the act's targets; doubled for crisis axes)
//       + fight (matches what this act's boss/elites demand, from REGION_DATA needs)
//       + build (fits a build you're committing to; grows each act)
//       - penalty (bloated deck and below your deck's average, extra copies)
// Early runs lean on raw power: almost any strong card raises your odds. Builds only
// take over once you actually own their key cards.
var TIER_POWER = {S: 95, A: 80, B: 65, C: 45, D: 25};
var ACT_TUNING = {
  1: {power: 1.0,  build: 0.5},
  2: {power: 0.9,  build: 0.8},
  3: {power: 0.8,  build: 1.0}
};
var VERDICT_PICK = 70, VERDICT_CONSIDER = 50;
var VERDICT_STYLE = {
  pick:     {vLabel: 'PICK',     vBorder: 'rgba(106,172,95,.5)',  vBg: 'rgba(74,124,63,.15)',  vColor: 'var(--green-bright)'},
  consider: {vLabel: 'CONSIDER', vBorder: 'rgba(200,146,42,.35)', vBg: 'rgba(200,146,42,.15)', vColor: 'var(--amber-bright)'},
  skip:     {vLabel: 'SKIP',     vBorder: 'var(--border)',        vBg: 'rgba(100,90,70,.12)',  vColor: 'var(--text-muted)'}
};
var NEED_LABELS = {aoe: 'AoE', multihit: 'Multi-hit', frontload: 'Burst damage', burstBlock: 'Big block',
  scaling: 'Scaling', strDown: 'Strength-down', statusClear: 'Status clearing'};

// Raw card strength 0-100: community tier when we have one, otherwise judged from its numbers.
function cardPower(card, roles) {
  if (card.rarity === 'basic') return 20;
  var up = card.isUpgraded ? 5 : 0;
  if (card.tier && TIER_POWER[card.tier]) return TIER_POWER[card.tier] + up;
  var r = roles;
  var v = Math.max(r.dmg, r.blk) * 50 + Math.min(r.dmg, r.blk) * 15 + r.draw * 25 + r.energy * 30 +
          r.scaling * 30 + r.aoe * 10 + r.debuff * 10 + r.strDown * 10 + r.statusClear * 5;
  var rarityBonus = {rare: 5, ancient: 15}[card.rarity] || 0;
  return Math.max(20, Math.min(85, Math.round(20 + v + rarityBonus + up)));
}

// How well a card covers each fight demand, 0-1.
function rolesForNeeds(r) {
  return {
    aoe: r.aoe, multihit: r.multihit, frontload: Math.max(r.dmg, r.debuff * 0.6),
    burstBlock: r.blk, scaling: r.scaling, strDown: Math.max(r.strDown, r.debuff * 0.5),
    statusClear: Math.max(r.statusClear, r.draw * 0.4)
  };
}

// Deck-wide facts every score needs. Cached until the deck/act/boss changes.
var _scoreCtx = null, _scoreCtxKey = '';
function scoreContext() {
  var boss = typeof selectedBoss !== 'undefined' ? selectedBoss : null;
  var key = currentChar + '|' + currentAct + '|' + boss + '|' + JSON.stringify(deck);
  if (key === _scoreCtxKey) return _scoreCtx;
  var axes = calcSixAxes();
  var targets = AXIS_TARGETS[currentAct] || AXIS_TARGETS[1];
  // Fights left in this act: the chosen boss, or every boss of the act averaged with its elites.
  var bosses = [], elites = [];
  Object.keys(REGION_DATA).forEach(function(rk) {
    var reg = REGION_DATA[rk];
    if (reg.act !== currentAct) return;
    Object.keys(reg.bosses).forEach(function(n) { if (!boss || n === boss) bosses.push({name: n, needs: reg.bosses[n].needs || {}}); });
    Object.keys(reg.elites).forEach(function(n) { elites.push({name: n, needs: reg.elites[n].needs || {}}); });
  });
  var powers = [];
  Object.keys(deck).forEach(function(n) {
    var f = findCard(n);
    if (f && !isUnplayable(f.card)) for (var i = 0; i < deck[n]; i++) powers.push(cardPower(f.card, cardRoles(f.card)));
  });
  _scoreCtx = {
    axes: axes, targets: targets, crisis: getCrisisStates(axes, targets),
    bosses: bosses, elites: elites, boss: boss,
    commitment: getArchetypeCommitment(),
    deckSize: getDeckSize(),
    avgPower: powers.length ? powers.reduce(function(a, b) { return a + b; }, 0) / powers.length : 40
  };
  _scoreCtxKey = key;
  return _scoreCtx;
}

// Fixes a weak axis: 0-20 points, plus the axis it helps most.
function needBonus(roles, ctx) {
  if (!ctx.axes) return {pts: 0};
  var axisRoles = [
    ['Attack', 'attack', roles.dmg + roles.aoe * 0.3, 'Fixes low damage'],
    ['Defense', 'defense', roles.blk, 'Fixes low block'],
    ['Scaling', 'scaling', roles.scaling, 'Adds scaling'],
    ['Consistency', 'consistency', Math.max(roles.draw, roles.energy), 'Adds draw/energy']
  ];
  var raw = 0, best = null, bestV = 0;
  axisRoles.forEach(function(a) {
    var gap = Math.max(0, Math.min(1, 1 - ctx.axes[a[0]] / ctx.targets[a[0]]));
    var v = gap * Math.min(1, a[2]) * (ctx.crisis[a[1]] ? 2 : 1);
    raw += v;
    if (v > bestV) { bestV = v; best = a[3]; }
  });
  return {pts: Math.min(20, Math.round(raw * 12)), text: best};
}

// Matches this act's fights: 0-15 points.
function fightBonus(roles, ctx) {
  var nr = rolesForNeeds(roles);
  function match(enc) {
    var total = 0, got = 0, bestK = null, bestV = 0;
    Object.keys(enc.needs).forEach(function(k) {
      total += enc.needs[k];
      var v = enc.needs[k] * (nr[k] || 0);
      got += v;
      if (v > bestV) { bestV = v; bestK = k; }
    });
    return {v: total ? got / total : 0, key: bestK};
  }
  function avg(list) {
    if (!list.length) return {v: 0};
    var ms = list.map(function(e) { var m = match(e); m.name = e.name; return m; });
    var top = ms.slice().sort(function(a, b) { return b.v - a.v; })[0];
    return {v: ms.reduce(function(a, m) { return a + m.v; }, 0) / ms.length, top: top};
  }
  var b = avg(ctx.bosses), e = avg(ctx.elites);
  var v = ctx.boss ? b.v : b.v * 0.6 + e.v * 0.4;
  var top = (ctx.boss || b.v * 0.6 >= e.v * 0.4) ? b.top : e.top;
  var text = top && top.key && top.v >= 0.3 ? NEED_LABELS[top.key] + ' vs ' + top.name : null;
  return {pts: Math.round(Math.min(1, v * 1.5) * 15), text: text};
}

// Fits builds you're committing to: 0-30 points (before act scaling).
function buildBonus(baseName, ctx) {
  var builds = (typeof BUILD_DATA !== 'undefined' && BUILD_DATA[currentChar] && BUILD_DATA[currentChar].builds) || {};
  var raw = 0, best = null, bestV = 0;
  Object.keys(builds).forEach(function(key) {
    var b = builds[key];
    var tier = (b.mustPick || []).indexOf(baseName) >= 0 ? 4
      : ((b.essential || []).indexOf(baseName) >= 0 || (b.highPriority || []).indexOf(baseName) >= 0) ? 3
      : (b.synergy || []).indexOf(baseName) >= 0 ? 2 : 0;
    if (!tier) return;
    var v = tier * Math.max(ctx.commitment[key] || 0, 0.15);
    raw += v;
    if (v > bestV) { bestV = v; best = {build: b.name || key, tier: tier, commit: ctx.commitment[key] || 0}; }
  });
  // Known two-card combos with a card already in the deck
  if (typeof SYNERGY_PAIRS !== 'undefined') {
    var pairPts = 0;
    SYNERGY_PAIRS.forEach(function(p) {
      var other = p.a === baseName ? p.b : p.b === baseName ? p.a : null;
      if (other && (deck[other] || deck[other + '+'])) pairPts += (p.bonus || 10) / 20;
    });
    raw += Math.min(1, pairPts);
  }
  var text = null;
  if (best) text = best.commit >= 0.25 ? (best.tier >= 3 ? 'Core ' : 'Fits ') + best.build + ' build'
                                       : 'Opens ' + best.build + ' build';
  return {pts: Math.min(30, Math.round(raw * 12)), text: text};
}

// ── scoreCard ────────────────────────────────────────────────
function scoreCard(cardName) {
  if (!currentChar) return null;
  var found = findCard(cardName);
  var card = found ? found.card : {name: cardName, type: 'skl', note: ''};
  var baseName = card.baseCard || cardName.replace(/\+$/, '');
  var ctx = scoreContext();
  var tune = ACT_TUNING[currentAct] || ACT_TUNING[1];
  var chips = [];

  // raw keeps ordering among strong cards; score is the 0-100 shown to the user.
  var result = function(raw, parts) {
    var score = Math.max(0, Math.min(100, raw));
    var verdict = score >= VERDICT_PICK ? 'pick' : score >= VERDICT_CONSIDER ? 'consider' : 'skip';
    var st = VERDICT_STYLE[verdict];
    chips.sort(function(a, b) { return Math.abs(b.v) - Math.abs(a.v); });
    chips = chips.slice(0, 3);
    return {
      name: cardName, card: card, score: score, raw: raw, verdict: verdict,
      vLabel: st.vLabel, vBorder: st.vBorder, vBg: st.vBg, vColor: st.vColor,
      chips: chips, reasons: chips.map(function(c) { return c.text; }), parts: parts
    };
  };

  if (isUnplayable(card)) { chips.push({text: 'Curse/status — never take', v: -1, tone: 'neg'}); return result(0, {}); }
  if (card.multiplayer) { chips.push({text: 'Co-op only — not offered in solo runs', v: -1, tone: 'neg'}); return result(0, {}); }

  var roles = cardRoles(card);
  var power = cardPower(card, roles);
  var need = needBonus(roles, ctx);
  var fight = fightBonus(roles, ctx);
  var build = buildBonus(baseName, ctx);
  var buildPts = Math.round(build.pts * tune.build);

  // Penalties: a below-average card in a big deck makes your best cards show up less.
  var penalty = 0;
  var copies = (deck[baseName] || 0) + (deck[baseName + '+'] || 0);
  if (ctx.deckSize >= DECK_THRESHOLDS.healthyMin && power < ctx.avgPower) {
    var dil = Math.min(15, Math.round((ctx.avgPower - power) / 2));
    if (ctx.deckSize > DECK_THRESHOLDS.bloated) dil += 5;
    if (dil > 0) { penalty += dil; chips.push({text: 'Weaker than your deck (' + ctx.deckSize + ' cards)', v: -dil, tone: 'neg'}); }
  }
  if (copies >= 1 && roles.scaling < 1) {
    var dup = Math.min(16, copies * 6);
    penalty += dup;
    chips.push({text: 'Already have ' + copies, v: -dup, tone: 'neg'});
  }

  var powerPts = Math.round(power * tune.power);
  chips.push({text: card.tier ? 'Strong card (' + card.tier + ')' : (power >= 65 ? 'Strong stats' : power >= 45 ? 'Decent stats' : 'Weak stats'),
              v: powerPts / 4, tone: power >= 65 ? 'pos' : power >= 45 ? 'neutral' : 'neg'});
  if (need.pts >= 4 && need.text) chips.push({text: need.text, v: need.pts, tone: 'pos'});
  if (fight.pts >= 4 && fight.text) chips.push({text: fight.text, v: fight.pts, tone: 'pos'});
  if (buildPts >= 4 && build.text) chips.push({text: build.text, v: buildPts, tone: 'pos'});

  return result(powerPts + need.pts + fight.pts + buildPts - penalty, {power: powerPts, need: need.pts, fight: fight.pts, build: buildPts, penalty: -penalty});
}

// ── scoreRewardPool ──────────────────────────────────────────
// Score the offered cards, best first. skipAdvice: nothing on offer is worth a deck slot.
function scoreRewardPool(cardNames) {
  var scored = cardNames.map(scoreCard).filter(Boolean);
  scored.sort(function(a, b) { return b.raw - a.raw; });
  scored.skipAdvice = scored.length > 0 && scored[0].score < VERDICT_CONSIDER;
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
    if (c && isUnplayable(c)) {
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
