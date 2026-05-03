// Deck statistics logic for STS2 Build Advisor.

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
  const axes = calcFourAxes();
  const playable = Math.max(1, total - (stats.other || 0));

  // Percentages of playable deck
  const pAtk = playable > 0 ? Math.round(stats.atk / playable * 100) : 0;
  const pDef = playable > 0 ? Math.round(stats.def / playable * 100) : 0;
  const pScl = playable > 0 ? Math.round(stats.scl / playable * 100) : 0;
  const velScore = axes ? axes.vel : 0;

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
      if (!lowVel && axes && axes.blk < DECK_THRESHOLDS.lowBlkScore) gaps.push('add block cards');
      if (!lowVel && axes && axes.dmg < DECK_THRESHOLDS.lowDmgScore) gaps.push('add attack cards');

      if (gaps.length > 0) return `Deck is large: ${gaps.join(', ')}.`;
      return `Deck is large. Only add cards that directly fix a weakness — every new card dilutes your best draws.`;
    }

    // In healthy range — give a directional tip based on what's missing
    if (heavyAtk && axes && axes.blk < DECK_THRESHOLDS.heavyAtkBlkReq) return `Attack-heavy (${pAtk}%). Next reward: prioritise block or scaling cards over more attacks.`;
    if (heavyDef && axes && axes.dmg < DECK_THRESHOLDS.heavyDefDmgReq) return `Defense-heavy (${pDef}%). Next reward: you can afford to add damage or scaling instead of more block.`;
    if (heavyScl && axes && axes.dmg < DECK_THRESHOLDS.heavySclDmgReq) return `Scaling-heavy (${pScl}%). Make sure you have enough attacks to apply the scaling before Act 2.`;
    if (lowVel) return `Velocity is low (${velScore}/100). Draw and energy cards will make every other card more consistent.`;
    return 'Good composition. Keep adding cards that fit your build path.';
  }

  let zone, color, label;
  if (total < DECK_THRESHOLDS.lean) {
    zone = 'lean'; color = 'var(--amber-bright)'; label = 'Very Lean';
  } else if (total < DECK_THRESHOLDS.healthyMin) {
    zone = 'lean'; color = 'var(--amber)'; label = 'Lean';
  } else if (total <= DECK_THRESHOLDS.bloated) {
    zone = 'sweet'; color = 'var(--green-bright)'; label = 'Healthy';
  } else if (total <= DECK_THRESHOLDS.tooLarge) {
    zone = 'bloated'; color = 'var(--amber)'; label = 'Bloated';
  } else {
    zone = 'danger'; color = '#c06060'; label = 'Too Large';
  }

  return { total, zone, color, label, advice: getNextFocusTip(), pAtk, pDef, pScl, velScore, heavyAtk, heavyDef, heavyScl, lowVel };
}

function calcFourAxes() {
  if (!currentChar || getDeckSize() === 0) return null;
  const stats = getDeckStats();
  const total = getDeckSize();
  const playable = Math.max(1, total - (stats.other||0));

  // Damage score: atk% of playable, scaled 0-100
  const dmgScore = Math.min(100, Math.round((stats.atk / playable) * 200));
  // Block score: def% of playable, scaled 0-100, with bonus for barricade/juggernaut
  let blkScore = Math.min(100, Math.round((stats.def / playable) * 200));
  // Check for block-generating powers
  const blockPowers = ['Barricade','Juggernaut','Afterimage','Stone Armor','Crimson Mantle','Feel No Pain','Shroud'];
  blockPowers.forEach(n => { if (deck[n]) blkScore = Math.min(100, blkScore + 15); });
  // Velocity score: count velocity/cycling cards
  const velCards = VELOCITY_CARDS[currentChar] || [];
  let velCount = 0;
  Object.keys(deck).forEach(n => { if (velCards.includes(n)) velCount += deck[n]; });
  // Also count powers/scaling as partial velocity
  velCount += stats.scl * 0.4;
  const velScore = Math.min(100, Math.round(velCount * 18));
  // Scaling score: scl cards as fraction of playable, scaled 0-100
  // ~2-3 scaling cards in a 15-card deck hits ~50-75
  const sclScore = Math.min(100, Math.round((stats.scl / playable) * 300));

  return { dmg: dmgScore, blk: blkScore, vel: velScore, scl: sclScore };
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
