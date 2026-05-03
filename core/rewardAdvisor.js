// core/rewardAdvisor.js
// Card scoring for reward picks, skip decisions, and shop advice.
// Returns plain data objects — no DOM, no HTML.
// Depends on: state.js, buildAnalyzer.js, deckStats.js, builds.js, constants.js
// Also reads globals from HTML scope: selectedBoss, getAllCardsForPicker(), getRarity()

// ── scoreCard ────────────────────────────────────────────────
// Score a single card against the current run state.
// Returns a result object used by the reward and shop UI layers.
function scoreCard(cardName) {
  if (!currentChar || !BUILD_DATA[currentChar]) return null;

  var builds   = (BUILD_DATA[currentChar] || {}).builds || {};
  var allCards = getAllCardsForPicker();
  var total    = getDeckSize();
  var axes     = calcFourAxes();

  var name  = cardName;
  var baseName = name.endsWith('+') ? name.slice(0, -1) : name;
  var card  = allCards.find(function(c) { return c.name === name; }) || {name: name, type: 'skl', note: ''};
  var alreadyHave = (deck[name] || 0) + (deck[baseName] || 0);
  if (name === baseName) {
      // If we are scoring a base card, alreadyHave should only count other copies if we want to be precise, 
      // but usually we want to know if we have ANY version of this card.
  }

  // ── Build membership ─────────────────────────────────────
  var RANK_SCORE = {S:4, A:3, B:2, C:1};
  var priorityBuilds = [];
  var synergyBuilds  = [];
  var fitsBuilds     = [];
  var tipsBuilds     = [];
  var charTips = (TIPS_CARDS[currentChar] || {});

  Object.entries(builds).forEach(function(entry) {
    var key = entry[0], b = entry[1];
    var inCore = b.cards.includes(baseName);
    var inSyn  = (b.synergy || []).includes(baseName);
    var inRec  = (b.recs || []).includes(baseName);
    var inTips = (charTips[key] || []).includes(baseName);
    var rankMult = RANK_SCORE[b.rank] || 1;
    if (inTips) tipsBuilds.push({key: key, b: b, rankMult: rankMult});
    if (inRec && alreadyHave === 0)        priorityBuilds.push({key: key, b: b, rankMult: rankMult});
    else if (inCore && alreadyHave === 0)  fitsBuilds.push({key: key, b: b, rankMult: rankMult});
    else if (inSyn)                        synergyBuilds.push({key: key, b: b, rankMult: rankMult});
  });

  // ── Base score ───────────────────────────────────────────
  var score = 0;
  var reasons = [];

  // Tips mention
  if (tipsBuilds.length > 0) {
    var tipsBest = tipsBuilds.reduce(function(best, e) { return e.rankMult > best.rankMult ? e : best; }, tipsBuilds[0]);
    score += tipsBest.rankMult * 18;
    var tierLabel = {4:'S-tier', 3:'A-tier', 2:'B-tier', 1:'C-tier'}[tipsBest.rankMult] || '';
    reasons.push('key card in ' + tierLabel + ' ' + tipsBest.b.name + ' how-to-play');
    if (tipsBuilds.length > 1) { score += 10; reasons.push('named in ' + tipsBuilds.length + ' build guides'); }
  }

  // Priority rec
  if (priorityBuilds.length > 0) {
    var priBest = priorityBuilds.reduce(function(best, e) { return e.rankMult > best.rankMult ? e : best; }, priorityBuilds[0]);
    var priBonus = alreadyHave === 0 ? (15 + priBest.rankMult * 8) : 8;
    score += priBonus;
    if (!reasons.some(function(r) { return r.includes('how-to-play'); })) {
      reasons.push('priority for ' + priBest.b.name + (priBest.b.rank ? ' (' + priBest.b.rank + '-tier)' : ''));
    }
    if (priorityBuilds.length > 1) { score += 8; reasons.push('priority across ' + priorityBuilds.length + ' builds'); }
  } else if (fitsBuilds.length > 0) {
    var fitsBest = fitsBuilds.reduce(function(best, e) { return e.rankMult > best.rankMult ? e : best; }, fitsBuilds[0]);
    score += 10 + fitsBest.rankMult * 4;
    if (!reasons.some(function(r) { return r.includes('how-to-play') || r.includes('priority'); })) {
      reasons.push('fits ' + fitsBest.b.name);
    }
  }

  // Synergy
  if (synergyBuilds.length > 0) {
    var synBest = synergyBuilds.reduce(function(best, e) { return e.rankMult > best.rankMult ? e : best; }, synergyBuilds[0]);
    score += 8 + synBest.rankMult * 4;
    reasons.push('synergy: ' + synergyBuilds.map(function(e) { return e.b.name; }).join(', '));
  }

  // ── DMG / BLOCK / SCL scoring ────────────────────────────
  if (total > 5 && axes) {
    var targets = DMG_BLOCK_TARGETS[currentAct] || DMG_BLOCK_TARGETS[1];
    var t       = card.type || 'skl';
    var isAtk   = t === 'atk' || t.includes('atk');
    var isDef   = t === 'def' || t.includes('def');
    var isScl   = t === 'pow' || t === 'skl' || t.includes('scl');

    // Damage axis — reward atk cards that close the gap, penalise excess
    var dmgGap = Math.max(0, targets.dmg - axes.dmg);
    if (isAtk && dmgGap > 0) {
      var dmgBonus = Math.min(25, Math.round(dmgGap * 0.5));
      score += dmgBonus;
      reasons.push('fills low damage (axis ' + Math.round(axes.dmg) + '/' + targets.dmg + ')');
    }
    if (isAtk && axes.dmg > targets.dmg + 20) { score -= 8; reasons.push('deck already attack-heavy'); }

    // Block axis — same pattern
    var blkGap = Math.max(0, targets.blk - axes.blk);
    if (isDef && blkGap > 0) {
      var blkBonus = Math.min(25, Math.round(blkGap * 0.5));
      score += blkBonus;
      reasons.push('fills low block (axis ' + Math.round(axes.blk) + '/' + targets.blk + ')');
    }
    if (isDef && axes.blk > targets.blk + 20) { score -= 8; reasons.push('deck already defense-heavy'); }

    // Scaling axis — act multiplier × boss multiplier
    var sclActMult  = ({1: 0.5, 2: 1.0, 3: 1.5})[currentAct] || 0.5;
    var sclBossMult = (typeof selectedBoss !== 'undefined' && selectedBoss && SCL_PRIORITY_BOSSES.has(selectedBoss)) ? 1.5 : 1.0;
    var sclGap = Math.max(0, 50 - axes.scl);
    if (isScl && sclGap > 0) {
      var sclBonus = Math.min(20, Math.round(sclGap * 0.3 * sclActMult * sclBossMult));
      if (sclBonus > 0) {
        score += sclBonus;
        var sclReason = 'scaling needed (axis ' + Math.round(axes.scl) + '/50)';
        if (sclBossMult > 1) sclReason += ' — critical vs ' + selectedBoss;
        else if (currentAct >= 2) sclReason += ' — Act ' + currentAct;
        reasons.push(sclReason);
      }
    }
  }

  // ── Velocity scoring ─────────────────────────────────────
  var isDrawCard   = DRAW_CARDS[currentChar]   && DRAW_CARDS[currentChar].includes(baseName);
  var isEnergyCard = ENERGY_CARDS[currentChar] && ENERGY_CARDS[currentChar].includes(baseName);
  var isVelCard    = (VELOCITY_CARDS[currentChar] || []).includes(baseName);
  if (axes && total > 6) {
    var velTarget = (DMG_BLOCK_TARGETS[currentAct] || DMG_BLOCK_TARGETS[1]).vel;
    var velGap    = Math.max(0, velTarget - axes.vel);
    if (velGap > 0) {
      var velBonus = Math.min(20, Math.round(velGap * 0.8));
      if (isDrawCard)        { score += velBonus + 4; reasons.push('deck lacks draw — this helps cycle'); }
      else if (isEnergyCard) { score += velBonus + 4; reasons.push('deck lacks energy — this fuels bigger turns'); }
      else if (isVelCard)    { score += velBonus;     reasons.push('fixes low velocity'); }
    } else if (isVelCard && axes.vel < 40) {
      score += 8; reasons.push('adds draw/energy');
    }
  }

  // ── Act context ───────────────────────────────────────────
  if (currentAct === 1 && total < 10 && (card.type === 'atk' || card.type === 'def' || (card.type || '').includes('atk') || (card.type || '').includes('def'))) {
    score += 6;
  }
  if (currentAct === 3 && tipsBuilds.length === 0 && priorityBuilds.length === 0 && fitsBuilds.length === 0 && synergyBuilds.length === 0 && !isVelCard) {
    score -= 20; reasons.push('Act 3: only take core cards');
  }
  if (baseName === 'Strike' || baseName === 'Defend') { score -= 35; reasons.push('starter card — never add more'); }

  // Redundancy penalty
  var _isEngineCard = Object.values(BUILD_ENGINES[currentChar] || {}).some(function(e) { return e.cards.includes(baseName); });
  if (alreadyHave === 1 && !_isEngineCard) { score -= 5;  reasons.push('already have 1 copy'); }
  if (alreadyHave >= 2)                    { score -= 12; reasons.push('already have ' + alreadyHave + ' copies'); }

  // ── Act scaling bonus / penalty ───────────────────────────
  if (currentAct >= 2 && ACT_SCALES_INTO.has(baseName)) {
    score += 4; reasons.push('scales into Act 3');
  }
  if (currentAct === 3 && ACT_CARRY_FALLOFF.has(baseName)) {
    score -= 4; reasons.push('Act 1 carry — loses value here');
  }

  // ── Synergy pair bonus ────────────────────────────────────
  var pairResult = getSynergyPairBonus(baseName);
  if (pairResult.bonus > 0) {
    score += pairResult.bonus;
    pairResult.reasons.forEach(function(r) { reasons.push(r); });
  }

  // ── Scaling damage note ───────────────────────────────────
  var scalingNote = getScalingDmgNote(baseName);
  if (scalingNote) { reasons.push(scalingNote); }

  // ── Archetype commitment bonus ────────────────────────────
  var phaseW     = getPhaseWeight();
  var archClass  = classifyArchetypes();
  var builds_local = (BUILD_DATA[currentChar] || {}).builds || {};
  var archBonus  = 0, archReason = '';

  if (archClass.committed) {
    var cBuild = builds_local[archClass.committed];
    if (cBuild && ((cBuild.recs || []).includes(name) || (cBuild.cards || []).includes(name))) {
      archBonus  = Math.round(30 + (archClass.confidence[archClass.committed] || 0) * 20);
      archReason = 'committed to ' + cBuild.name + ' — core card';
    }
  }
  if (archBonus === 0 && (archClass.building || []).length > 0) {
    archClass.building.forEach(function(bKey) {
      var bBuild = builds_local[bKey];
      if (!bBuild) return;
      if ((bBuild.recs || []).includes(name) || (bBuild.cards || []).includes(name)) {
        var candidate = Math.round(15 + (archClass.confidence[bKey] || 0) * 10);
        if (candidate > archBonus) { archBonus = candidate; archReason = 'building toward ' + bBuild.name; }
      }
    });
  }
  if (archBonus > 0) {
    var wArchBonus = Math.round(archBonus * phaseW);
    score += wArchBonus;
    if (wArchBonus >= 20) reasons.push(archReason);
  }

  // ── Engine commitment bonus ───────────────────────────────
  var engCommit = getEngineCommitment(baseName);
  if (engCommit > 0) {
    var engBonus = Math.round(engCommit * 8);
    score += engBonus;
    if (engCommit >= 0.6) reasons.push('deepens engine you\'re ' + Math.round(engCommit * 100) + '% into');
  }

  // ── Archetype anti-synergy penalty ────────────────────────
  var deckTags = detectDeckArchetypes(deck);
  var antiSynPenalty = 0;
  deckTags.forEach(function(tag) {
    var badCards = ARCHETYPE_ANTI_SYNERGY[tag] || [];
    if (badCards.includes(baseName)) { antiSynPenalty = Math.max(antiSynPenalty, 5); }
  });
  if (antiSynPenalty > 0) {
    var wPenalty = Math.round(antiSynPenalty * phaseW);
    score -= wPenalty;
    reasons.push('trap pick for your archetype' + (currentAct >= 2 ? ' (late-game penalty)' : ''));
  }

  // ── Boss adaptation bonus / penalty ──────────────────────
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
      if (rewardHit) { score += 5; reasons.push('strong vs ' + selectedBoss); }
      if (punishHit) { score -= 5; reasons.push('weak vs ' + selectedBoss + ' — boss punishes this'); }
    }
  }

  // ── Rarity modifier ───────────────────────────────────────
  var cardRarity = card.rarity || 'common';
  var buildFit   = tipsBuilds.length > 0 || priorityBuilds.length > 0 || fitsBuilds.length > 0 || synergyBuilds.length > 0;
  if (buildFit) {
    if (cardRarity === 'rare')    { score += 12; reasons.push('Rare — appears infrequently, strong take when it fits'); }
    if (cardRarity === 'ancient') { score += 16; reasons.push('Ancient — extremely rare, take it'); }
    if (cardRarity === 'event')   { score += 8;  reasons.push('Event-only — limited availability'); }
  } else {
    if (cardRarity === 'rare')    reasons.push('Rare but doesn\'t fit your current build');
    if (cardRarity === 'ancient') reasons.push('Ancient but off-build — still consider it');
  }
  if (cardRarity === 'basic' || cardRarity === 'token') { score -= 40; reasons.push('basic/token — not a valid reward card'); }

  // ── Deck size / composition penalty ──────────────────────
  var szp        = getDeckSizeProfile();
  var isAtkCard  = (card.type || '').includes('atk');
  var isDefCard  = (card.type || '').includes('def');
  var isSclCard  = (card.type === 'pow' || card.type === 'skl' || card.type === 'scl' || (card.type || '').includes('scl'));
  var isVelCardSz = isDrawCard || isEnergyCard || isVelCard;

  if (szp.zone === 'bloated' || szp.zone === 'danger') {
    var sizeBase = szp.zone === 'danger' ? -22 : -12;
    if (isAtkCard && szp.heavyAtk && tipsBuilds.length === 0 && priorityBuilds.length === 0) {
      score += sizeBase - 10; reasons.push('deck is attack-heavy (' + szp.pAtk + '%) and already large — skip');
    } else if (isDefCard && szp.heavyDef && tipsBuilds.length === 0 && priorityBuilds.length === 0) {
      score += sizeBase - 10; reasons.push('deck is defense-heavy (' + szp.pDef + '%) and already large — skip');
    } else if (isSclCard && szp.heavyScl && !isVelCardSz && tipsBuilds.length === 0 && priorityBuilds.length === 0) {
      score += sizeBase - 8; reasons.push('deck is scaling-heavy (' + szp.pScl + '%) and already large — skip');
    } else if (!isVelCardSz && tipsBuilds.length === 0 && priorityBuilds.length === 0) {
      score += sizeBase; reasons.push('deck already large (' + szp.total + ' cards) — only take essentials or draw/energy');
    }
    if (isVelCardSz && szp.zone !== 'danger') { score += 8; reasons.push('draw/energy helps compensate for large deck'); }
  } else if (szp.zone === 'sweet' || szp.zone === 'lean') {
    if (isAtkCard && szp.heavyAtk && !priorityBuilds.length && !tipsBuilds.length) {
      score -= 6; reasons.push('already attack-heavy (' + szp.pAtk + '%) — consider block or scaling instead');
    } else if (isDefCard && szp.heavyDef && !priorityBuilds.length && !tipsBuilds.length) {
      score -= 6; reasons.push('already defense-heavy (' + szp.pDef + '%) — consider attacks or scaling instead');
    } else if (isSclCard && szp.heavyScl && !isVelCardSz && !priorityBuilds.length && !tipsBuilds.length) {
      score -= 4; reasons.push('already scaling-heavy (' + szp.pScl + '%) — make sure you have enough attacks');
    }
  }

  // ── Verdict label assignment ──────────────────────────────
  var verdict, vLabel, vBorder, vBg, vColor;

  var _inEngine   = Object.values(BUILD_ENGINES[currentChar] || {}).some(function(e) { return e.cards.includes(baseName); });
  var _bossReward = (typeof selectedBoss !== 'undefined') && selectedBoss && BOSS_MATRIX[selectedBoss] && (CARD_BOSS_TAGS[baseName] || []).length > 0 &&
                    BOSS_MATRIX[selectedBoss].rewards.some(function(r) {
                      return (CARD_BOSS_TAGS[baseName] || []).some(function(t) { return r.toLowerCase().includes(t.toLowerCase()); });
                    });
  var _buildCore  = tipsBuilds.length > 0 || priorityBuilds.length > 0;
  var _actScale   = currentAct >= 2 && ACT_SCALES_INTO.has(baseName);
  var _archClassV = classifyArchetypes();
  var _isCommittedCard = (function() {
    if (!_archClassV.committed) return false;
    var cb = ((BUILD_DATA[currentChar] || {}).builds || {})[_archClassV.committed];
    return cb && ((cb.recs || []).includes(baseName) || (cb.cards || []).includes(baseName));
  })();
  var _hasPairBonus = pairResult.bonus >= 14;

  if (score < 15 || antiSynPenalty > 0) {
    verdict = 'skip';    vLabel = 'SKIP';
    vBorder = 'var(--border)'; vBg = 'rgba(100,90,70,.12)'; vColor = 'var(--text-muted)';
  } else if ((_inEngine && engCommit >= 0.33) || (_isCommittedCard && score >= 35) || (_hasPairBonus && _inEngine)) {
    verdict = 'pick';    vLabel = 'ENGINE PIECE';
    vBorder = 'rgba(74,154,138,.5)'; vBg = 'rgba(74,154,138,.15)'; vColor = 'var(--teal-bright)';
  } else if (_bossReward && score >= 30) {
    verdict = 'pick';    vLabel = 'BOSS COUNTER';
    vBorder = 'rgba(192,66,26,.5)'; vBg = 'rgba(192,66,26,.12)'; vColor = '#e07050';
  } else if (_buildCore && score >= 30) {
    verdict = 'pick';    vLabel = 'BUILD CORE';
    vBorder = 'rgba(106,172,95,.4)'; vBg = 'rgba(74,124,63,.12)'; vColor = 'var(--green-bright)';
  } else if (_actScale && score >= 20) {
    verdict = 'consider'; vLabel = 'ACT 3 SCALE';
    vBorder = 'rgba(154,106,186,.45)'; vBg = 'rgba(154,106,186,.1)'; vColor = 'var(--purple-bright)';
  } else if (pairResult.bonus >= 10 && score >= 20) {
    verdict = 'consider'; vLabel = 'SYNERGY PICK';
    vBorder = 'rgba(200,146,42,.45)'; vBg = 'rgba(200,146,42,.15)'; vColor = 'var(--amber-bright)';
  } else if (score >= 40) {
    verdict = 'pick';    vLabel = 'PICK THIS';
    vBorder = 'rgba(106,172,95,.4)'; vBg = 'rgba(74,124,63,.2)'; vColor = 'var(--green-bright)';
  } else if (score >= 20) {
    verdict = 'consider'; vLabel = 'CONSIDER';
    vBorder = 'rgba(200,146,42,.35)'; vBg = 'rgba(200,146,42,.15)'; vColor = 'var(--amber-bright)';
  } else {
    verdict = 'skip';    vLabel = 'SKIP';
    vBorder = 'var(--border)'; vBg = 'rgba(100,90,70,.12)'; vColor = 'var(--text-muted)';
  }

  // ── Active synergy pairs ──────────────────────────────────
  var activePairs = [];
  SYNERGY_PAIRS.forEach(function(p) {
    var isA = p.a === baseName && deck[p.b] > 0;
    var isB = p.b === baseName && deck[p.a] > 0;
    if (isA || isB) {
      activePairs.push({partner: isA ? p.b : p.a, bond: p.bond, note: p.note, bonus: p.bonus});
    }
  });

  // ── Engine progress rows ──────────────────────────────────
  var enginesData    = BUILD_ENGINES[currentChar] || {};
  var engineMatches  = [];
  Object.entries(enginesData).forEach(function(pair) {
    var buildKey = pair[0], engData = pair[1];
    if (engData.cards.includes(baseName)) {
      var build     = builds[buildKey];
      var haveCount = engData.cards.filter(function(n) { return deck[n] || deck[n + '+']; }).length;
      engineMatches.push({
        buildName:  build ? build.name  : buildKey,
        buildColor: build ? build.color : 'var(--teal-bright)',
        label:      engData.label,
        have:       haveCount,
        total:      engData.cards.length
      });
    }
  });

  // ── Eradicate nuke estimate (Necrobinder specific) ────────
  var eradicateEstimate = null;
  if (currentChar === 'necrobinder') {
    var eraCards = ['Eradicate','Neurosurge','Wisp','Borrowed Time','Friendship','Lethality','Debilitate'];
    if (eraCards.includes(name)) {
      eradicateEstimate = getEradicateNukeEstimate();
    }
  }

  return {
    name, card, score, verdict, vLabel, vBorder, vBg, vColor,
    reasons,
    tipsBuilds, priorityBuilds, synergyBuilds, fitsBuilds,
    alreadyHave,
    activePairs, engineMatches, eradicateEstimate
  };
}

// ── scoreRewardPool ──────────────────────────────────────────
// Score a pool of card names and return them sorted best-first.
function scoreRewardPool(cardNames) {
  var scored = cardNames.map(scoreCard).filter(Boolean);
  scored.sort(function(a, b) { return b.score - a.score; });
  return scored;
}

// ── getShopAdvice ────────────────────────────────────────────
// Returns structured advice about whether the current gold is shop-ready.
function getShopAdvice(gold) {
  var g = parseInt(gold) || 0;
  if (g < 100) return {text: 'Below 100 — avoid shops', color: '#c06060', icon: '⚠'};
  if (g < 300) return {text: 'Aim for 300 to afford relics', color: 'var(--amber)', icon: ''};
  return {text: 'Good — shop ready', color: 'var(--green-bright)', icon: '✓'};
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

  // Duplicate non-engine cards with 2+ copies
  var enginesData = BUILD_ENGINES[currentChar] || {};
  Object.keys(deck).forEach(function(name) {
    if ((deck[name] || 0) >= 2) {
      var isEngine = Object.values(enginesData).some(function(e) { return e.cards.includes(name); });
      if (!isEngine) {
        candidates.push({name, reason: deck[name] + ' copies — consider removing one', priority: 'low'});
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
