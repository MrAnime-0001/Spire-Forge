// Result panel, priority panel, deck health, and engine tracker rendering for STS2 Build Advisor.

function updatePriorityPanel() {
  const panel = document.getElementById('priorityPanel');
  if (!currentChar) { panel.innerHTML = ''; return; }
  renderDeckHealth();
  const builds = (BUILD_DATA[currentChar] || {}).builds || {};
  const topBuildKey = getTopBuild();
  const deckNames = new Set(Object.keys(deck));
  const allCards = getAllCardsForPicker();
  const stats = getDeckStats();

  const typeTagHtml = (card) => {
    if (!card) return '';
    const t = card.type || 'skl';
    const cls = t.includes('atk') ? 'tag-atk' : t.includes('def') ? 'tag-def' : t.includes('vel') ? 'tag-vel' : 'tag-skl';
    return `<span class="deck-item-tag ${cls}" style="font-size:9px;padding:1px 5px">${t.replace(/_/g,'\u00B7').toUpperCase()}</span>`;
  };

  let html = '';

  // ---- Engine-grouped priority section ----
  const RANK_ORDER = {S:4, A:3, B:2, C:1};
  const deckNames_arr = Object.keys(deck);

  const _archCmt = classifyArchetypes();
  const buildGroups = Object.entries(builds).map(([key, build]) => {
    const essential        = build.essential || [];
    const hits             = deckNames_arr.filter(n => essential.includes(n)).length;
    const pct              = essential.length > 0 ? hits / essential.length : 0;
    const missingEssential = essential.filter(n => !deckNames.has(n));
    const missingSynergy   = (build.synergy || []).filter(n => !deckNames.has(n));
    const commitmentConf   = (_archCmt.confidence || {})[key] || 0;
    const isCommitted = _archCmt.committed === key;
    const isBuilding  = (_archCmt.building || []).includes(key);
    return { key, build, hits, pct, missingEssential, missingSynergy, commitmentConf, isCommitted, isBuilding };
  }).sort((a, b) => {
    if (a.isCommitted && !b.isCommitted) return -1;
    if (!a.isCommitted && b.isCommitted) return 1;
    if (a.isBuilding && !b.isBuilding) return -1;
    if (!a.isBuilding && b.isBuilding) return 1;
    if (Math.abs(b.commitmentConf - a.commitmentConf) > 0.05) return b.commitmentConf - a.commitmentConf;
    const rankDiff = (RANK_ORDER[b.build.rank] || 0) - (RANK_ORDER[a.build.rank] || 0);
    if (rankDiff !== 0) return rankDiff;
    return b.pct - a.pct;
  });

  const activeGroups = buildGroups.filter(g => g.missingEssential.length > 0 || g.missingSynergy.length > 0);

  const rankColors = {S:'#e8b84b', A:'#6aac5f', B:'#4a8cba', C:'#7a6a8a'};

  if (activeGroups.length > 0) {
    html += `<div style="font-family:'Share Tech Mono',monospace;font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:var(--amber);opacity:.8;margin-bottom:.6rem">priority</div>`;

    activeGroups.forEach((g, i) => {
      const { key, build, pct, missingEssential, missingSynergy } = g;
      const isTop  = key === topBuildKey;
      const rankC  = rankColors[build.rank] || 'var(--text-muted)';
      const pctStr = Math.round(pct * 100) + '%';
      const _cmtLabel = g.isCommitted ? 'COMMITTED' : g.isBuilding ? 'BUILDING' : '';
      const _cmtColor = g.isCommitted ? 'var(--teal-bright)' : 'var(--amber-bright)';

      html += `<div style="margin-bottom:.6rem">`;
      html += `<div style="display:flex;align-items:center;gap:6px;margin-bottom:.35rem">`;
      html += `<span style="font-size:12px;font-family:'Cinzel',serif;font-weight:600;color:${build.color}">${build.name}</span>`;
      if (build.rank) html += `<span style="font-family:'Share Tech Mono',monospace;font-size:8px;padding:1px 5px;border-radius:2px;border:1px solid ${rankC}50;background:${rankC}18;color:${rankC}">${build.rank}</span>`;
      if (_cmtLabel)  html += `<span style="font-family:'Share Tech Mono',monospace;font-size:8px;padding:1px 5px;border-radius:2px;border:1px solid ${_cmtColor}50;background:${_cmtColor}18;color:${_cmtColor}">${_cmtLabel}</span>`;
      else if (isTop) html += `<span style="font-family:'Share Tech Mono',monospace;font-size:8px;padding:1px 5px;border-radius:2px;background:${build.color}18;color:${build.color};border:1px solid ${build.color}40">best match</span>`;
      html += `<span style="font-family:'Share Tech Mono',monospace;font-size:9px;color:var(--text-muted);margin-left:auto">${pctStr} match</span>`;
      html += `</div>`;

      if (missingEssential.length > 0) {
        html += `<div style="font-family:'Share Tech Mono',monospace;font-size:8px;color:var(--teal-bright);letter-spacing:.08em;text-transform:uppercase;margin-bottom:3px;opacity:.8">essential</div>`;
        missingEssential.slice(0, 5).forEach(name => {
          const card  = allCards.find(c => c.name === name);
          const safeN = name.replace(/'/g,"\\'");
          html += `<div onclick="quickAddPriority('${safeN}')" style="display:flex;align-items:center;gap:7px;padding:7px 9px;border:1px solid var(--teal-bright)40;border-radius:3px;background:rgba(74,154,138,.07);cursor:pointer;margin-bottom:4px;transition:all .12s" onmouseover="this.style.borderColor='var(--teal-bright)';this.style.background='rgba(74,154,138,.14)'" onmouseout="this.style.borderColor='var(--teal-bright)40';this.style.background='rgba(74,154,138,.07)'">
            <div style="flex:1;min-width:0">
              <div style="font-size:13px;color:var(--text)">${name}</div>
              ${card?.note ? `<div style="font-size:10px;color:var(--text-muted);font-style:italic">${card.note}</div>` : ''}
            </div>
            ${typeTagHtml(card)}
            ${card ? rarityBadgeHtml(getRarity(card)) : ''}
            <span style="font-family:'Share Tech Mono',monospace;font-size:9px;color:var(--teal-bright);opacity:.8;flex-shrink:0">+ add</span>
          </div>`;
        });
      }

      if (missingSynergy.length > 0) {
        if (missingEssential.length > 0) {
          html += `<div style="font-family:'Share Tech Mono',monospace;font-size:8px;color:var(--amber-bright);letter-spacing:.08em;text-transform:uppercase;margin:5px 0 3px;opacity:.8">synergy</div>`;
        }
        missingSynergy.slice(0, 4).forEach(name => {
          const card  = allCards.find(c => c.name === name);
          const safeN = name.replace(/'/g,"\\'");
          html += `<div onclick="quickAddPriority('${safeN}')" style="display:flex;align-items:center;gap:7px;padding:7px 9px;border:1px solid ${isTop ? build.color+'55' : 'var(--border)'};border-radius:3px;background:${isTop ? build.color+'0e' : 'var(--bg2)'};cursor:pointer;margin-bottom:4px;transition:all .12s" onmouseover="this.style.borderColor='${build.color}';this.style.background='${build.color}1a'" onmouseout="this.style.borderColor='${isTop ? build.color+'55' : 'var(--border)'}';this.style.background='${isTop ? build.color+'0e' : 'var(--bg2)'}'">
            <div style="flex:1;min-width:0">
              <div style="font-size:13px;color:${isTop ? 'var(--text)' : 'var(--text-dim)'}">${name}</div>
              ${card?.note ? `<div style="font-size:10px;color:var(--text-muted);font-style:italic;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${card.note}</div>` : ''}
            </div>
            ${typeTagHtml(card)}
            ${card ? rarityBadgeHtml(getRarity(card)) : ''}
            <span style="font-family:'Share Tech Mono',monospace;font-size:9px;color:var(--amber-bright);opacity:.7;flex-shrink:0">+ add</span>
          </div>`;
        });
      }

      html += `</div>`;

      if (i < activeGroups.length - 1) {
        html += `<div class="divider" style="margin:.4rem 0 .7rem"></div>`;
      }
    });
  }

  if (activeGroups.length === 0) {
    html += '<p style="font-size:13px;color:var(--text-muted);font-style:italic">Your deck already has all priority cards. Use the right panel to check synergy options.</p>';
  }

  panel.innerHTML = html;
  renderEngineTracker();
}

function quickAddPriority(name) {
  addCard(name);
}

// Returns HTML for a single build's tips section.
function renderBuildTips(tips, buildKey, isTop) {
  if (!tips.length) return '';
  if (isTop) {
    return `<div class="build-tips-content" style="margin-top:.65rem">
          <div style="font-family:'Share Tech Mono',monospace;font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:var(--teal-bright);opacity:.8;margin-bottom:.4rem">how to play</div>
          ${tips.map(t=>`<div class="tip-item">${t}</div>`).join('')}
        </div>`;
  }
  const uid = 'tips_' + buildKey;
  return `<button class="build-tips-toggle" onclick="document.getElementById('${uid}').style.display=document.getElementById('${uid}').style.display==='none'?'block':'none'">show how to play ▾</button>
          <div id="${uid}" style="display:none" class="build-tips-content">
            <div style="font-family:'Share Tech Mono',monospace;font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:var(--teal-bright);opacity:.8;margin-bottom:.4rem">how to play</div>
            ${tips.map(t=>`<div class="tip-item">${t}</div>`).join('')}
          </div>`;
}

// Returns HTML for all build result blocks in the right panel.
function renderBuildResults(ranked, builds, deckNameSet, topKey) {
  let html = `<div class="fade-up">`;

  ranked.forEach(([key, sc], i) => {
    const build = builds[key];
    const isTop = key === topKey;
    const tips = build.tips || [];

    const haveCards  = (build.essential||[]).concat(build.synergy||[]).filter(n => deckNameSet.has(n));
    const missingPri = (build.essential||[]).filter(n => !deckNameSet.has(n)).slice(0, 6);
    const missingSyn = (build.synergy||[]).filter(n => !deckNameSet.has(n)).slice(0, 5);

    html += `<div class="build-block">`;

    const rankColors = {S:'#e8b84b',A:'#6aac5f',B:'#4a8cba',C:'#7a6a8a'};
    const rankColor = rankColors[build.rank] || 'var(--text-muted)';
    html += `<div class="build-block-header">`;
    html += `<span class="build-block-name" style="color:${build.color}">${build.fullName}</span>`;
    if (build.rank) html += `<span style="font-family:'Share Tech Mono',monospace;font-size:9px;font-weight:700;padding:1px 6px;border-radius:3px;border:1px solid ${rankColor}50;background:${rankColor}18;color:${rankColor};letter-spacing:.06em" title="${build.winCondition||''}">${build.rank}-tier</span>`;
    if (isTop) html += `<span class="build-block-badge" style="background:${build.color}18;color:${build.color};border:1px solid ${build.color}40">best match</span>`;
    html += `</div>`;
    if (build.winCondition) html += `<div style="font-size:11px;color:var(--text-muted);font-style:italic;margin-bottom:4px">${build.winCondition}</div>`;

    html += `<div class="build-block-sub">${getDeckSize()} cards \xb7 ${sc.hits}/${sc.total} match</div>`;

    html += `<div class="score-row" style="margin-bottom:.6rem">
      <span class="score-label top">${build.name}</span>
      <div class="bar-bg"><div class="bar-fill" style="width:${sc.pct}%;background:${build.color}"></div></div>
      <span class="bar-num">${sc.hits}/${sc.total}</span>
    </div>`;

    if (haveCards.length > 0) {
      html += `<div style="font-family:'Share Tech Mono',monospace;font-size:9px;color:var(--text-muted);letter-spacing:.1em;text-transform:uppercase;margin-bottom:3px">in your deck</div>`;
      html += `<div class="mini-chips">${haveCards.map(n=>`<span class="mini-chip have">${n}</span>`).join('')}</div>`;
    }

    if (missingPri.length > 0) {
      html += `<div style="font-family:'Share Tech Mono',monospace;font-size:9px;color:var(--green-bright);letter-spacing:.1em;text-transform:uppercase;margin-top:.5rem;margin-bottom:3px">priority to find</div>`;
      const allCardsForPanel = getAllCardsForPicker();
      html += `<div class="mini-chips">${missingPri.map(n => {
        const c = allCardsForPanel.find(x => x.name === n);
        const rar = c ? getRarity(c) : 'common';
        const rarLabels = {basic:'B',common:'C',uncommon:'U',rare:'R',ancient:'A',event:'E',token:'T'};
        const rarColors = {basic:'#5a5248',common:'#7a9a6a',uncommon:'#4a8cba',rare:'#c8922a',ancient:'#9a6aba',event:'#6a9a9a',token:'#4a4438'};
        const rc = rarColors[rar] || '#7a705a';
        return `<span class="mini-chip pri" title="${rar.charAt(0).toUpperCase()+rar.slice(1)}">${n} <span style="font-size:8px;opacity:.8;color:${rc}">${rarLabels[rar]||'?'}</span></span>`;
      }).join('')}</div>`;
    }

    if (missingSyn.length > 0) {
      html += `<div style="font-family:'Share Tech Mono',monospace;font-size:9px;color:var(--amber);letter-spacing:.1em;text-transform:uppercase;margin-top:.5rem;margin-bottom:3px">synergy options</div>`;
      const allCardsForSyn = getAllCardsForPicker();
      html += `<div class="mini-chips">${missingSyn.map(n => {
        const c = allCardsForSyn.find(x => x.name === n);
        const rar = c ? getRarity(c) : 'common';
        const rarLabels = {basic:'B',common:'C',uncommon:'U',rare:'R',ancient:'A',event:'E',token:'T'};
        const rarColors = {basic:'#5a5248',common:'#7a9a6a',uncommon:'#4a8cba',rare:'#c8922a',ancient:'#9a6aba',event:'#6a9a9a',token:'#4a4438'};
        const rc = rarColors[rar] || '#7a705a';
        return `<span class="mini-chip syn" title="${rar.charAt(0).toUpperCase()+rar.slice(1)}">${n} <span style="font-size:8px;opacity:.8;color:${rc}">${rarLabels[rar]||'?'}</span></span>`;
      }).join('')}</div>`;
    }

    html += renderBuildTips(tips, key, isTop);

    html += `</div>`;
  });

  html += `</div>`;
  return html;
}

function updateResult() {
  const box = document.getElementById('resultBox');
  const hpCur = parseInt(document.getElementById('hpCur').value) || 80;
  const hpMax = parseInt(document.getElementById('hpMax').value) || 80;
  const hpPct = hpMax > 0 ? hpCur / hpMax : 1;

  let hpAdvice = '';
  if (hpPct >= 0.5) hpAdvice = 'Above 50% — consider upgrading over resting';
  else if (hpPct < 0.35) hpAdvice = 'Below 35% — rest soon';
  document.getElementById('hpAdvice').textContent = hpAdvice;

  if (!currentChar || getDeckSize() === 0) {
    box.innerHTML = '<div class="placeholder"><div class="placeholder-icon">⚔</div><p>Add cards to your deck to see your build path.</p></div>';
    renderDeckHealth();
    renderEngineTracker();
    renderBossAlert();
    return;
  }

  const builds = (BUILD_DATA[currentChar] || {}).builds || {};
  const deckNames = Object.keys(deck);
  const deckNameSet = new Set(deckNames);

  const { scores, ranked } = getBuildScores();
  if (!ranked || ranked.length === 0) {
    box.innerHTML = '<div class="placeholder"><div class="placeholder-icon">⚔</div><p>Add cards to your deck to see your build path.</p></div>';
    renderDeckHealth();
    renderEngineTracker();
    renderBossAlert();
    return;
  }
  const [topKey] = ranked[0];

  box.innerHTML = renderBuildResults(ranked, builds, deckNameSet, topKey);

  renderDeckHealth();
  renderEngineTracker();
  renderBossAlert();
}

function renderDeckHealth() {
  const el = document.getElementById('deckHealth');
  if (!el) return;
  if (!currentChar || getDeckSize() === 0) { el.innerHTML = ''; return; }

  const axes = calcFourAxes();
  const stats = getDeckStats();
  if (!axes) { el.innerHTML = ''; return; }

  const total = getDeckSize();
  const oth = stats.other || 0;
  const playable = Math.max(1, total - oth);

  const pAtk = Math.round(stats.atk / playable * 100);
  const pDef = Math.round(stats.def / playable * 100);
  const pScl = Math.round(stats.scl / playable * 100);

  const db = getDrawBalance();
  const drawTotal = Math.max(1, db.atkDraw + db.defDraw + db.sclDraw + db.deadDraw + db.velDraw);
  const atkDefPool = Math.max(1, db.atkDraw + db.defDraw);
  const rAtk = Math.round(db.atkDraw / atkDefPool * 100);
  const rDef = Math.round(db.defDraw / atkDefPool * 100);
  const drawRatioBalanced = rAtk >= 40 && rAtk <= 60;
  const drawHeavyAtk = rAtk > 65;
  const drawHeavyDef = rDef > 65;

  const volume = axes.dmg === 0 || axes.blk === 0 || axes.vel === 0
    ? 0
    : axes.scl === 0
      ? Math.round(Math.pow(axes.dmg * axes.blk * axes.vel, 1/3))
      : Math.round(Math.pow(axes.dmg * axes.blk * axes.vel * axes.scl, 1/4));
  const volColor = volume >= 70 ? 'var(--green-bright)' : volume >= 40 ? 'var(--amber-bright)' : '#c06060';
  const volLabel = volume >= 70 ? 'Solid' : volume >= 50 ? 'Developing' : volume >= 30 ? 'Brittle'
    : axes.blk === 0 ? 'No Defense' : axes.dmg === 0 ? 'No Damage' : axes.vel === 0 ? 'Clunky'
    : (total > 8 && axes.scl === 0) ? 'No Scaling' : 'Weak';

  const atkCls = stats.atk <= 2 ? 'stat-warn' : stats.atk >= 3 ? 'stat-ok' : '';
  const defCls = stats.def <= 1 ? 'stat-warn' : stats.def >= 3 ? 'stat-ok' : '';
  const sclCls = stats.scl <= 0 ? 'stat-warn' : stats.scl >= 3 ? 'stat-ok' : '';
  const velCls = stats.vel <= 0 ? 'stat-warn' : stats.vel >= 3 ? 'stat-ok' : '';

  const tte = calcTurnsToEmpty();
  const tteCls = tte !== null && tte <= 3 ? 'stat-ok' : tte !== null && tte > 5 ? 'stat-warn' : '';

  const starters = (deck['Strike']||0) + (deck['Defend']||0);
  const warnings = [];
  if (axes.blk < 25 && total > 6)  warnings.push({msg:'No block — elites will punish you.', color:'#6aacda'});
  if (axes.dmg < 25 && total > 6)  warnings.push({msg:'Low damage output — fights will drag.', color:'#c06060'});
  if (axes.vel < 20 && total > 6)  warnings.push({msg:'Low velocity — deck feels clunky. Add draw or energy.', color:'var(--amber)'});
  if (axes.scl < 20 && total > 8)  warnings.push({msg:'Low scaling — Power cards are needed to maintain damage output in Act 2+ boss fights.', color:'#9a6aba'});
  if (axes.scl < 40 && total > 8 && currentAct >= 2)  warnings.push({msg:'Act '+currentAct+': scaling is critical vs. bosses. Prioritise a Power card this reward.', color:'#9a6aba'});
  if (total > 10 && starters >= 3) warnings.push({msg:`${starters} starter cards diluting draws — remove at the shop.`, color:'#c8922a'});
  if (playable > 7) {
    if (drawHeavyAtk) warnings.push({msg:`Draw skewed toward attack (${rAtk}% of ATK+DEF draws). Add ${Math.ceil(db.atkDraw - db.defDraw)} more block card${db.atkDraw-db.defDraw!==1?'s':''} to reach 50/50.`, color:'#6aacda'});
    else if (drawHeavyDef) warnings.push({msg:`Draw skewed toward block (${rDef}% of ATK+DEF draws). Add ${Math.ceil(db.defDraw - db.atkDraw)} more attack card${db.defDraw-db.atkDraw!==1?'s':''} to reach 50/50.`, color:'#c06060'});
  }
  if (oth >= 3) warnings.push({msg:`${oth} dead cards (curses/statuses) diluting draws. Remove at shops.`, color:'#7a6a4a'});
  else if (oth >= 1) warnings.push({msg:`${oth} dead card${oth>1?'s':''} in deck. Consider removing at a shop.`, color:'#7a6a4a'});

  const velSuggest = axes.vel < 20 && total > 6
    ? `<div style="font-size:11px;color:var(--text-muted);font-style:italic;margin-top:3px">velocity cards to consider: ${(VELOCITY_CARDS[currentChar]||[]).filter(n=>!deck[n]).slice(0,4).join(', ')}</div>`
    : '';

  const szp = getDeckSizeProfile();

  const act2VelNudge = (currentAct === 2 && axes.vel < 30 && total > 6)
    ? `<div style="margin-top:6px;padding:5px 8px;border:1px solid rgba(200,146,42,.4);border-radius:3px;background:rgba(200,146,42,.08);font-size:11px;color:var(--amber-bright)">Ɽ Act 2 note: timer bosses like The Insatiable require consistent draw and energy to extend their countdown. Low velocity decks can run out of turns before the kill.</div>`
    : '';

  const barAtk = Math.round(stats.atk/total*100);
  const barDef = Math.round(stats.def/total*100);
  const barScl = Math.round(stats.scl/total*100);
  const barVel = Math.round(stats.vel/total*100);
  const barOth = Math.max(0, 100-barAtk-barDef-barScl-barVel);

  const barDrawAtk  = Math.round(db.atkDraw  / drawTotal * 100);
  const barDrawDef  = Math.round(db.defDraw  / drawTotal * 100);
  const barDrawScl  = Math.round(db.sclDraw  / drawTotal * 100);
  const barDrawVel  = Math.round(db.velDraw  / drawTotal * 100);
  const barDrawDead = Math.max(0, 100 - barDrawAtk - barDrawDef - barDrawScl - barDrawVel);

  const drawBalanceColor = drawRatioBalanced ? 'var(--green-bright)' : (drawHeavyAtk || drawHeavyDef) ? '#c06060' : 'var(--amber-bright)';
  const drawBalanceLabel = drawRatioBalanced ? '✔ balanced' : drawHeavyAtk ? '⚠ atk-heavy' : drawHeavyDef ? '⚠ def-heavy' : '~ close';

  el.innerHTML = `<div class="axes-wrap" style="margin-bottom:.75rem">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:.75rem">
      <span style="font-family:'Share Tech Mono',monospace;font-size:9px;letter-spacing:.15em;text-transform:uppercase;color:var(--text-muted)">deck overview</span>
      <span style="font-family:'Cinzel',serif;font-size:15px;font-weight:600;color:${volColor}">${volume} <span style="font-size:9px;letter-spacing:.08em;text-transform:uppercase">${volLabel}</span></span>
    </div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:.75rem">
      <div class="stat-chip"><div class="stat-val ${atkCls}">${stats.atk}</div><div class="stat-lbl">Attack</div></div>
      <div class="stat-chip"><div class="stat-val ${defCls}">${stats.def}</div><div class="stat-lbl">Defense</div></div>
      <div class="stat-chip"><div class="stat-val ${sclCls}">${stats.scl}</div><div class="stat-lbl">Scale</div></div>
      <div class="stat-chip"><div class="stat-val ${velCls}">${stats.vel}</div><div class="stat-lbl">Velocity</div></div>
    </div>
    <div style="padding:.55rem .75rem;background:var(--bg2);border:1px solid ${szp.color}40;border-left:3px solid ${szp.color};border-radius:4px;margin-bottom:.75rem">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:.3rem">
        <span style="font-family:'Share Tech Mono',monospace;font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:var(--text-muted)">${szp.total} cards \xb7 ${szp.label}</span>
        ${tte !== null ? `<span style="font-family:'Share Tech Mono',monospace;font-size:9px;letter-spacing:.08em;color:var(--text-muted)">turns to empty: <span class="${tteCls}" style="font-family:'Cinzel',serif;font-size:13px;font-weight:600">${tte}</span></span>` : ''}
      </div>
      <div style="height:5px;background:var(--surface);border-radius:99px;overflow:hidden;margin:.25rem 0">
        <div style="height:100%;border-radius:99px;width:${Math.min(100,Math.round(szp.total/35*100))}%;background:${szp.color};transition:width .4s"></div>
      </div>
      <div style="font-size:11px;color:var(--text-dim);font-style:italic;line-height:1.4">${szp.advice}</div>
      ${(szp.zone==='bloated'||szp.zone==='danger') ? `<div style="margin-top:4px;font-family:'Share Tech Mono',monospace;font-size:9px;color:var(--text-muted);letter-spacing:.05em">atk ${szp.pAtk}% \xb7 def ${szp.pDef}% \xb7 scale ${szp.pScl}%</div>` : ''}
    </div>
    <div class="axis-row">
      <span class="axis-label" title="Attack damage output">damage</span>
      <div class="axis-bar-bg"><div class="axis-bar-fill" style="width:${axes.dmg}%;background:#c04040"></div></div>
      <span class="axis-val" style="color:#c06060">${pAtk}%</span>
    </div>
    <div style="font-size:10px;color:var(--text-muted);font-style:italic;margin:-3px 0 5px 70px">attacks — aim for 15–20 damage output per turn</div>
    <div class="axis-row">
      <span class="axis-label" title="Block/defense output">block</span>
      <div class="axis-bar-bg"><div class="axis-bar-fill" style="width:${axes.blk}%;background:#378add"></div></div>
      <span class="axis-val" style="color:#6aacda">${pDef}%</span>
    </div>
    <div style="font-size:10px;color:var(--text-muted);font-style:italic;margin:-3px 0 5px 70px">defense — how much damage you absorb</div>
    <div class="axis-row">
      <span class="axis-label" title="Draw, energy generation, deck thinning">cycle</span>
      <div class="axis-bar-bg"><div class="axis-bar-fill" style="width:${axes.vel}%;background:#4a9a8a"></div></div>
      <span class="axis-val" style="color:#4abaa0">${axes.vel}</span>
    </div>
    <div style="font-size:10px;color:var(--text-muted);font-style:italic;margin:-3px 0 5px 70px">draw &amp; energy — how fast you cycle through cards</div>
    <div class="axis-row">
      <span class="axis-label" title="Power cards, stat-scaling, passive engines">scaling</span>
      <div class="axis-bar-bg"><div class="axis-bar-fill" style="width:${axes.scl}%;background:#9a6aba"></div></div>
      <span class="axis-val" style="color:#b07ad0">${pScl}%</span>
    </div>
    <div style="font-size:10px;color:var(--text-muted);font-style:italic;margin:-3px 0 10px 70px">powers &amp; scaling — strength over long fights</div>
    <div style="font-family:'Share Tech Mono',monospace;font-size:9px;color:var(--text-muted);letter-spacing:.08em;text-transform:uppercase;margin-bottom:2px;display:flex;justify-content:space-between;align-items:center">
      <span>draw odds</span>
      <span style="color:${drawBalanceColor};font-size:9px">${db.atkDraw}ATK : ${db.defDraw}DEF${db.sclDraw>0?' : '+db.sclDraw+'SCL':''}${db.velDraw>0?' : '+db.velDraw+'VEL':''}${db.deadDraw>0?' : '+db.deadDraw+'DEAD':''}  ${drawBalanceLabel}</span>
    </div>
    <div style="font-size:10px;color:var(--text-muted);font-style:italic;margin-bottom:4px">chance of drawing an attack vs a block card — aim for 50/50</div>
    <div class="balance-bar-track" style="margin:.2rem 0 .3rem;height:8px">
      <div class="balance-seg" style="width:${barDrawAtk}%;background:#c04040" title="Attack draws"></div>
      <div class="balance-seg" style="width:${barDrawDef}%;background:#378add" title="Block draws"></div>
      <div class="balance-seg" style="width:${barDrawScl}%;background:#9a6aba" title="Scale draws"></div>
      <div class="balance-seg" style="width:${barDrawVel}%;background:#4a9a8a" title="Velocity draws"></div>
      <div class="balance-seg" style="width:${barDrawDead}%;background:rgba(140,110,60,.5)" title="Unplayable draws"></div>
    </div>
    <div style="font-family:'Share Tech Mono',monospace;font-size:9px;color:var(--text-muted);letter-spacing:.08em;text-transform:uppercase;margin:.55rem 0 2px">card mix</div>
    <div style="font-size:10px;color:var(--text-muted);font-style:italic;margin-bottom:4px">what your deck is made of (hybrid cards split fractionally)</div>
    <div class="balance-bar-track" style="margin:.2rem 0 .3rem">
      <div class="balance-seg" style="width:${barAtk}%;background:#c04040"></div>
      <div class="balance-seg" style="width:${barDef}%;background:#378add"></div>
      <div class="balance-seg" style="width:${barScl}%;background:#9a6aba"></div>
      <div class="balance-seg" style="width:${barVel}%;background:#4a9a8a"></div>
      <div class="balance-seg" style="width:${barOth}%;background:${oth>0?'rgba(140,110,60,.45)':'rgba(100,90,70,.15)'}"></div>
    </div>
    <div class="balance-legend">
      <span class="balance-legend-item"><span class="balance-dot" style="background:#c04040"></span><span style="color:#c06060">${pAtk}% attack</span></span>
      <span class="balance-legend-item"><span class="balance-dot" style="background:#378add"></span><span style="color:#6aacda">${pDef}% defense</span></span>
      <span class="balance-legend-item"><span class="balance-dot" style="background:#9a6aba"></span><span style="color:#b07ad0">${pScl}% scale</span></span>
      ${stats.vel > 0 ? `<span class="balance-legend-item"><span class="balance-dot" style="background:#4a9a8a"></span><span style="color:#4abaa0">${barVel}% velocity</span></span>` : ''}
      ${oth > 0 ? `<span class="balance-legend-item"><span class="balance-dot" style="background:rgba(140,110,60,.7)"></span><span style="color:#7a6a4a">${Math.round(oth/total*100)}% dead cards</span></span>` : ''}
    </div>
    ${velSuggest}
    ${warnings.length > 0
      ? warnings.map(w=>`<div class="balance-warning" style="color:${w.color}">⚠ ${w.msg}</div>`).join('')
      : total > 5 ? `<div class="balance-ok">✔ ${pAtk}% ATK / ${pDef}% DEF / ${pScl}% SCALE — draw ${db.atkDraw}ATK : ${db.defDraw}DEF</div>` : ''}
    ${act2VelNudge}
  </div>`;
}

function renderEngineTracker() {
  const el = document.getElementById('engineTracker');
  if (!el || !currentChar) { if(el) el.innerHTML=''; return; }

  const builds    = (BUILD_DATA[currentChar] || {}).builds || {};
  const archClass = classifyArchetypes();
  const toShow    = [];

  const addBuild = (key, commitment, commitColor) => {
    const build = builds[key];
    if (!build) return;
    const essential = build.essential || [];
    const have = essential.filter(n => deck[n]).length;
    const pct  = essential.length > 0 ? have / essential.length : 0;
    toShow.push({ build, essential, have, pct, commitment, commitColor });
  };

  if (archClass.committed) addBuild(archClass.committed, 'COMMITTED', 'var(--teal-bright)');
  (archClass.building || []).forEach(k => addBuild(k, 'BUILDING', 'var(--amber-bright)'));

  if (toShow.length === 0) { el.innerHTML=''; return; }

  let html = '<div class="engine-wrap">';
  html += '<div style="font-family:&quot;Share Tech Mono&quot;,monospace;font-size:9px;color:var(--text-muted);letter-spacing:.12em;text-transform:uppercase;margin-bottom:.5rem">build status</div>';

  toShow.forEach(item => {
    const isLive  = item.pct >= 1;
    const color   = isLive ? 'var(--green-bright)' : item.pct >= 0.5 ? item.commitColor : 'var(--text-muted)';
    const status  = isLive ? '✔ complete' : item.pct > 0 ? '⚙ building' : '○ start';
    const missing = item.essential.filter(n => !deck[n]);

    html += '<div style="margin-bottom:.5rem;padding:.4rem .5rem;border:1px solid '+color+'30;border-radius:3px;background:'+color+'08">';
    html += '<div style="display:flex;align-items:center;gap:5px;margin-bottom:3px">';
    html += '<span style="font-size:11px;font-family:Cinzel,serif;color:'+item.build.color+'">'+item.build.name+'</span>';
    html += '<span style="font-family:Share Tech Mono,monospace;font-size:8px;padding:1px 5px;border-radius:2px;border:1px solid '+item.commitColor+'50;background:'+item.commitColor+'18;color:'+item.commitColor+'">'+item.commitment+'</span>';
    html += '<span style="font-family:Share Tech Mono,monospace;font-size:8px;color:'+color+';margin-left:auto">'+status+'</span>';
    html += '</div>';
    html += '<div class="axis-row" style="margin-bottom:4px"><div class="axis-bar-bg" style="flex:1"><div class="axis-bar-fill" style="width:'+Math.round(item.pct*100)+'%;background:'+color+'"></div></div><span class="axis-val">'+item.have+'/'+item.essential.length+'</span></div>';
    if (missing.length > 0 && !isLive) html += '<div style="font-family:Share Tech Mono,monospace;font-size:9px;color:var(--text-muted)">need: <span style="color:'+color+'">'+missing.slice(0,5).join(', ')+'</span></div>';
    html += '</div>';
  });

  var era = getEradicateNukeEstimate();
  if (era) {
    html += '<div style="padding:4px 7px;border:1px solid rgba(74,154,138,.3);border-radius:3px;background:rgba(74,154,138,.06);margin-top:2px">';
    html += '<div style="font-family:Share Tech Mono,monospace;font-size:8px;color:var(--teal-bright);letter-spacing:.08em;text-transform:uppercase;margin-bottom:2px">eradicate ceiling</div>';
    html += '<div style="font-size:11px;color:var(--text-dim)">'+era.energy+' energy &rarr; '+era.base+' dmg';
    if (era.withMultipliers !== era.base) html += ' &rarr; <span style="color:var(--amber-bright)">'+era.withMultipliers+' with multipliers</span>';
    html += '</div></div>';
  }

  if (currentAct === 2 && toShow.length > 0 && toShow[0].pct < 0.5) {
    html += '<div style="margin-top:6px;padding:5px 8px;border:1px solid rgba(192,64,64,.35);border-radius:3px;background:rgba(192,64,64,.08);font-size:11px;color:#c06060">⏰ Act 2 and essential cards not found. Prioritise essential picks above all else.</div>';
  }

  html += '</div>';
  el.innerHTML = html;
}
