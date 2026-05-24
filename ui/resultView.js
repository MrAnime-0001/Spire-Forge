// Result panel, priority panel, deck health, and engine tracker rendering for STS2 Build Advisor.

function updatePriorityPanel() {
  const panel = document.getElementById('priorityPanel');
  if (!currentChar) { panel.innerHTML = ''; return; }
  renderDeckHealth();
  const axes = calcSixAxes();

  const typeTagHtml = (card) => {
    if (!card) return '';
    const t = card.type || 'skl';
    const cls = t.includes('atk') ? 'tag-atk' : t.includes('def') ? 'tag-def' : t.includes('vel') ? 'tag-vel' : 'tag-skl';
    return `<span class="deck-item-tag ${cls}" style="font-size:9px;padding:1px 5px">${t.replace(/_/g,'\u00B7').toUpperCase()}</span>`;
  };

  let html = '';

  // ---- Survival / Crisis Section ----
  const targets = AXIS_TARGETS[currentAct] || AXIS_TARGETS[1];
  const crisis  = getCrisisStates(axes, targets);

  if (crisis.attack || crisis.defense || crisis.scaling) {
    html += `<div style="font-family:'Share Tech Mono',monospace;font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:#ff6040;margin-bottom:.6rem">critical needs</div>`;
    
    const suggestNeed = (label, color, typeFilter) => {
      // Only recommend cards from current character's pool — cross-class/colorless
      // cards won't appear in normal card rewards
      const charPool = ALL_CARDS[currentChar] || [];
      const bestCards = charPool
        .filter(c => c.type && c.type.includes(typeFilter) && !c.name.endsWith('+'))
        .map(c => ({ card: c, score: scoreCard(c.name).score }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);

      bestCards.forEach(({card, score}) => {
        const safeN = card.name.replace(/'/g,"\\'");
        html += `<div onclick="quickAddPriority('${safeN}')" style="display:flex;align-items:center;gap:7px;padding:7px 9px;border:1px solid ${color}60;border-radius:3px;background:${color}12;cursor:pointer;margin-bottom:4px;transition:all .12s" onmouseover="this.style.borderColor='${color}';this.style.background='${color}25'" onmouseout="this.style.borderColor='${color}60';this.style.background='${color}12'">
          <div style="flex:1;min-width:0">
            <div style="font-family:'Share Tech Mono',monospace;font-size:8px;color:${color};text-transform:uppercase;margin-bottom:2px">${label}</div>
            <div style="font-size:13px;color:var(--text)">${card.name}</div>
          </div>
          ${typeTagHtml(card)}
          <span style="font-family:'Share Tech Mono',monospace;font-size:9px;color:${color};opacity:.6;flex-shrink:0;min-width:28px;text-align:right">${score}</span>
          <span style="font-family:'Share Tech Mono',monospace;font-size:9px;color:${color};opacity:.8;flex-shrink:0">+ add</span>
        </div>`;
      });
    };

    if (crisis.attack) suggestNeed('needs damage', '#ff6040', 'atk');
    if (crisis.defense) suggestNeed('needs block', 'var(--teal-bright)', 'def');
    if (crisis.scaling) suggestNeed('needs scaling', 'var(--purple-bright)', 'scl');
    
    html += `<div class="divider" style="margin:.6rem 0 .7rem"></div>`;
  }


  // Append play tips panel
  html += renderPlayTips(axes, targets, crisis);
  // Append campfire advice (includes upgrade priority)
  html += renderCampfireAdvice(axes, targets);
  // Append path suggestion
  html += renderPathSuggestion(axes);
  // Append encounter tips
  html += renderEncounterTips();
  // Append remove candidates
  html += renderRemoveCandidates();
  // Append cost curve viz
  html += renderCostCurve();
  // Append Getting Started collapsible (new player onboarding)
  html += renderGettingStarted();
  panel.innerHTML = '<div style="background:rgba(0,0,0,.5);border-radius:4px;padding:8px 10px;margin-bottom:6px">' + html + '</div>';
  renderEngineTracker();
}

function quickAddPriority(name) {
  addCard(name);
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

  // Skip verdict particles when triggered by addCard (handles its own)
  if(!window._particleSkipVerdict){
    if(window.__particle && typeof window.__particle.fireVerdict === 'function'){
      var verdictEls = document.querySelectorAll('.card-check-verdict, .result-verdict');
      if(verdictEls.length > 0){
        verdictEls.forEach(function(el){
          var container = el.parentNode;
          var nameSpan = container ? container.querySelector('span:first-child') : null;
          var target = nameSpan || el;
          var rect = target.getBoundingClientRect();
          if(rect.width > 0 && rect.height > 0){
            var vColor = el.style.color || '#e8b84b';
            window.__particle.fireVerdict(rect.left + rect.width/2, rect.top + rect.height/2, vColor);
          }
        });
      }
    }
  }
  window._particleSkipVerdict = false;

  if (!currentChar || getDeckSize() === 0) {
    box.innerHTML = '<div class="placeholder"><div class="placeholder-icon">⚔</div><p>Add cards to your deck to see your build path.</p></div>';
    renderDeckHealth();
    renderEngineTracker();
    renderBossAlert();
    return;
  }

  renderDeckHealth();
  renderRelicBar();
  renderEngineTracker();
  renderBossAlert();
  box.innerHTML = '<div style="background:rgba(0,0,0,.5);border-radius:4px;padding:8px 10px;margin-bottom:6px">' + renderBuildResults() + '</div>';
}

function renderDeckHealth() {
  const el = document.getElementById('deckHealth');
  if (!el) return;
  if (!currentChar || getDeckSize() === 0) { el.innerHTML = ''; return; }

  const axes = calcSixAxes();
  const stats = getDeckStats();
  if (!axes) { el.innerHTML = ''; return; }

  const targets = AXIS_TARGETS[currentAct] || AXIS_TARGETS[1];
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

  // Volume: geometric mean of all 6 axes
  const volume = Math.round(Math.pow(
    Math.max(1, axes.Attack) * 
    Math.max(1, axes.Defense) * 
    Math.max(1, axes.Scaling) * 
    Math.max(1, axes.Consistency) * 
    Math.max(1, axes.Efficiency) * 
    Math.max(1, axes.Synergy), 1/6));
    
  const volColor = volume >= 60 ? 'var(--green-bright)' : volume >= 35 ? 'var(--amber-bright)' : '#c06060';
  const volLabel = volume >= 70 ? 'Optimal' : volume >= 50 ? 'Strong' : volume >= 35 ? 'Functional' : 'Unstable';

  const atkCls = axes.Attack < targets.Attack ? 'stat-warn' : 'stat-ok';
  const defCls = axes.Defense < targets.Defense ? 'stat-warn' : 'stat-ok';
  const sclCls = axes.Scaling < targets.Scaling ? 'stat-warn' : 'stat-ok';
  const effCls = axes.Efficiency < targets.Efficiency ? 'stat-warn' : 'stat-ok';
  const conCls = axes.Consistency < targets.Consistency ? 'stat-warn' : 'stat-ok';
  const synCls = axes.Synergy < targets.Synergy ? 'stat-warn' : 'stat-ok';

  const tte = calcTurnsToEmpty();
  const tteCls = tte !== null && tte <= 3 ? 'stat-ok' : tte !== null && tte > 5 ? 'stat-warn' : '';

  const starters = (deck['Strike']||0) + (deck['Defend']||0);
  const warnings = [];
  if (axes.Defense < targets.Defense && total > 6)  warnings.push({msg:'Low defense \u2014 elites will punish you.', color:'#6aacda'});
  if (axes.Attack < targets.Attack && total > 6)  warnings.push({msg:'Low attack \u2014 fights will drag.', color:'#c06060'});
  if (axes.Efficiency < targets.Efficiency && total > 6)  warnings.push({msg:'Low efficiency \u2014 deck feels clunky.', color:'var(--amber)'});
  if (axes.Consistency < targets.Consistency && total > 10) warnings.push({msg:'Low consistency \u2014 unreliable draws.', color:'var(--teal-bright)'});
  if (axes.Scaling < targets.Scaling && total > 12)  warnings.push({msg:'Low scaling \u2014 critical for bosses.', color:'#9a6aba'});
  if (axes.Synergy < targets.Synergy && total > 15) warnings.push({msg:'Low synergy \u2014 deck lacks a clear plan.', color:'var(--amber-bright)'});

  if (total > 10 && starters >= 3) warnings.push({msg:`${starters} starter cards diluting draws \u2014 remove at the shop.`, color:'#c8922a'});
  if (playable > 7) {
    if (drawHeavyAtk) warnings.push({msg:`Draw skewed toward attack (${rAtk}%). Add ${Math.ceil(db.atkDraw - db.defDraw)} block cards.`, color:'#6aacda'});
    else if (drawHeavyDef) warnings.push({msg:`Draw skewed toward block (${rDef}%). Add ${Math.ceil(db.defDraw - db.atkDraw)} attack cards.`, color:'#c06060'});
  }
  if (oth >= 3) warnings.push({msg:`${oth} dead cards diluting draws. Remove at shops.`, color:'#7a6a4a'});

  const szp = getDeckSizeProfile();

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
  const drawBalanceLabel = drawRatioBalanced ? '\u2714 balanced' : drawHeavyAtk ? '\u26A0 atk-heavy' : drawHeavyDef ? '\u26A0 def-heavy' : '~ close';

  el.innerHTML = `<div class="axes-wrap" style="margin-bottom:.75rem">
    ${renderDeckOneLiner(axes)}
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:.75rem">
      <span style="font-family:'Share Tech Mono',monospace;font-size:9px;letter-spacing:.15em;text-transform:uppercase;color:var(--text-muted)">deck evaluation</span>
      <span style="font-family:'Cinzel',serif;font-size:15px;font-weight:600;color:${volColor}">${volume} <span style="font-size:9px;letter-spacing:.08em;text-transform:uppercase">${volLabel}</span></span>
    </div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:.75rem">
      <div class="stat-chip"><div class="stat-val ${atkCls}">${axes.Attack}</div><div class="stat-lbl">Attack</div></div>
      <div class="stat-chip"><div class="stat-val ${defCls}">${axes.Defense}</div><div class="stat-lbl">Defense</div></div>
      <div class="stat-chip"><div class="stat-val ${sclCls}">${axes.Scaling}</div><div class="stat-lbl">Scaling</div></div>
      <div class="stat-chip"><div class="stat-val ${effCls}">${axes.Efficiency}</div><div class="stat-lbl">Efficiency</div></div>
      <div class="stat-chip"><div class="stat-val ${conCls}">${axes.Consistency}</div><div class="stat-lbl">Consistency</div></div>
      <div class="stat-chip"><div class="stat-val ${synCls}">${axes.Synergy}</div><div class="stat-lbl">Synergy</div></div>
    </div>

    <div style="padding:.55rem .75rem;background:rgba(0,0,0,.5);border:1px solid ${szp.color}40;border-left:3px solid ${szp.color};border-radius:4px;margin-bottom:.75rem">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:.3rem">
        <span style="font-family:'Share Tech Mono',monospace;font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:var(--text-muted)">${szp.total} cards \xb7 ${szp.label}</span>
        ${tte !== null ? `<span style="font-family:'Share Tech Mono',monospace;font-size:9px;letter-spacing:.08em;color:var(--text-muted)">cycle speed: <span class="${tteCls}" style="font-family:'Cinzel',serif;font-size:13px;font-weight:600">${tte}</span></span>` : ''}
      </div>
      <div style="height:5px;background:var(--surface);border-radius:99px;overflow:hidden;margin:.25rem 0">
        <div style="height:100%;border-radius:99px;width:${Math.min(100,Math.round(szp.total/35*100))}%;background:${szp.color};transition:width .4s"></div>
      </div>
      <div style="font-size:11px;color:var(--text-dim);font-style:italic;line-height:1.4">${szp.advice}</div>
    </div>

    <div style="font-family:'Share Tech Mono',monospace;font-size:9px;color:var(--text-muted);letter-spacing:.08em;text-transform:uppercase;margin-bottom:2px;display:flex;justify-content:space-between;align-items:center">
      <span>draw odds</span>
      <span style="color:${drawBalanceColor};font-size:9px">${db.atkDraw}ATK : ${db.defDraw}DEF  ${drawBalanceLabel}</span>
    </div>
    <div class="balance-bar-track" style="margin:.2rem 0 .3rem;height:8px">
      <div class="balance-seg" style="width:${barDrawAtk}%;background:#c04040" title="Attack draws"></div>
      <div class="balance-seg" style="width:${barDrawDef}%;background:#378add" title="Block draws"></div>
      <div class="balance-seg" style="width:${barDrawScl}%;background:#9a6aba" title="Scale draws"></div>
      <div class="balance-seg" style="width:${barDrawVel}%;background:#4a9a8a" title="Efficiency draws"></div>
      <div class="balance-seg" style="width:${barDrawDead}%;background:rgba(140,110,60,.5)" title="Dead draws"></div>
    </div>

    ${warnings.length > 0
      ? warnings.map(w=>`<div class="balance-warning" style="color:${w.color}">\u26A0 ${w.msg}</div>`).join('')
      : total > 5 ? `<div class="balance-ok">\u2714 Balanced composition for Act ${currentAct}</div>` : ''}
  </div>`;
}

// Track build completion for particle bursts
var _prevBuildCompletion = {};

function renderEngineTracker() {
  var el = document.getElementById('engineTracker');
  if (!el || !currentChar) { if(el) el.innerHTML=''; return; }

  var items = getEngineTrackerItems();

  let html = '<div class="engine-wrap">';
  html += '<div style="font-family:&quot;Share Tech Mono&quot;,monospace;font-size:9px;color:var(--text-muted);letter-spacing:.12em;text-transform:uppercase;margin-bottom:.5rem">build status</div>';

  items.forEach(item => {
    const cards   = item.eng.cards;
    const have    = item.have;
    const total   = cards.length;
    const pct     = item.pct;
    const color   = pct >= 1 ? 'var(--green-bright)' : pct >= 0.5 ? 'var(--amber-bright)' : 'var(--text-muted)';
    const status  = pct >= 1 ? '✔ complete' : pct > 0 ? '⚙ building' : '○ start';
    const missing = cards.filter(n => !deck[n] && !deck[n + '+']);

    html += '<div style="margin-bottom:.5rem;padding:.4rem .5rem;border:1px solid '+color+'30;border-radius:3px;background:'+color+'08">';
    html += '<div style="display:flex;align-items:center;gap:5px;margin-bottom:3px">';
    html += '<span style="font-size:11px;font-family:Cinzel,serif;color:'+item.build.color+'">'+item.build.name+'</span>';
    html += '<span style="font-family:Share Tech Mono,monospace;font-size:8px;color:'+color+';margin-left:auto">'+status+'</span>';
    html += '</div>';
    html += '<div class="axis-row" style="margin-bottom:4px"><div class="axis-bar-bg" style="flex:1"><div class="axis-bar-fill" style="width:'+Math.round(pct*100)+'%;background:'+color+'"></div></div><span class="axis-val">'+have+'/'+total+'</span></div>';
    if (missing.length > 0 && pct < 1) html += '<div style="font-family:Share Tech Mono,monospace;font-size:9px;color:var(--text-muted)">need: <span style="color:'+color+'">'+missing.slice(0,5).join(', ')+'</span></div>';
    html += '</div>';
  });

  // Build completion burst
  if(window.__particle && items.length > 0){
    items.forEach(function(item){
      var engKey = item.eng.name;
      var wasComplete = _prevBuildCompletion[engKey] || false;
      var nowComplete = item.pct >= 1;
      if(nowComplete && !wasComplete){
        var cx = document.getElementById('engineTracker');
        var rect = cx ? cx.getBoundingClientRect() : null;
        if(rect) window.__particle.fireVerdict(rect.left + rect.width/2, rect.top + rect.height/2, item.build.color || '#e8b84b');
      }
      _prevBuildCompletion[engKey] = nowComplete;
    });
  }

  var era = getEradicateNukeEstimate();
  if (era) {
    html += '<div style="padding:4px 7px;border:1px solid rgba(74,154,138,.3);border-radius:3px;background:rgba(74,154,138,.06);margin-top:2px">';
    html += '<div style="font-family:Share Tech Mono,monospace;font-size:8px;color:var(--teal-bright);letter-spacing:.08em;text-transform:uppercase;margin-bottom:2px">eradicate ceiling</div>';
    html += '<div style="font-size:11px;color:var(--text-dim)">'+era.energy+' energy &rarr; '+era.base+' dmg';
    if (era.withMultipliers !== era.base) html += ' &rarr; <span style="color:var(--amber-bright)">'+era.withMultipliers+' with multipliers</span>';
    html += '</div></div>';
  }

  if (currentAct === 2 && items.length > 0 && items[0].pct < 0.5) {
    html += '<div style="margin-top:6px;padding:5px 8px;border:1px solid rgba(192,64,64,.35);border-radius:3px;background:rgba(192,64,64,.08);font-size:11px;color:#c06060">⏰ Act 2 and essential cards not found. Prioritise essential picks above all else.</div>';
  }

  // Relic-enhanced builds: show when a relic enables a build (even without engine items)
  if (relics.length > 0 && typeof BUILD_DATA !== 'undefined' && BUILD_DATA[currentChar]) {
    var buildEnablers = [];
    var cb = BUILD_DATA[currentChar].builds;
    if (cb) {
      Object.keys(cb).forEach(function(bk) {
        var b = cb[bk];
        var relicPriority = b.relicPriority || [];
        relicPriority.forEach(function(r) {
          if (relics.indexOf(r) >= 0) buildEnablers.push({relic:r, build:b.name, color:b.color});
        });
      });
    }
    if (buildEnablers.length > 0) {
      if (items.length === 0) html += '<div style="font-family:Share Tech Mono,monospace;font-size:9px;color:var(--text-muted);letter-spacing:.12em;text-transform:uppercase;margin-bottom:.5rem">build status</div>';
      buildEnablers.forEach(function(be) {
        html += '<div style="margin-bottom:4px;padding:4px 7px;border:1px solid '+be.color+'40;border-radius:3px;background:'+be.color+'10;font-size:10px;color:'+be.color+'">✦ Your <strong>'+be.relic+'</strong> enables <strong>'+be.build+'</strong></div>';
      });
    }
  }

  html += '</div>';
  if (items.length > 0 || html.includes('enables') || html.includes('Priority')) {
    el.innerHTML = '<div style="background:rgba(0,0,0,.5);border-radius:4px;padding:8px 10px;margin-bottom:6px">' + html + '</div>';
  } else {
    el.innerHTML = '';
  }
}

// ── renderPlayTips ──────────────────────────────────────────
// Generates 2-3 prioritized play tips based on deck state, axis gaps, and builds.
function renderPlayTips(axes, targets, crisis) {
  var tips = [];

  // Helper to add a tip with priority (lower = shown first)
  function add(priority, html) { tips.push({p:priority, h:html}); }

  // 1. Crisis tips — highest priority
  if (crisis.attack) add(0, '<span style="color:#ff6040">⚠ Damage</span> — need ' + Math.max(0, Math.round((targets.Attack - axes.Attack) * 0.5)) + ' more per-turn output');
  if (crisis.defense) add(0, '<span style="color:var(--teal-bright)">⚠ Block</span> — need ' + Math.max(0, Math.round((targets.Defense - axes.Defense) * 0.5)) + ' more block per turn');
  if (crisis.scaling) add(1, '<span style="color:var(--purple-bright)">⚠ Scaling</span> — <strong>' + currentChar.charAt(0).toUpperCase() + currentChar.slice(1) + '</strong> needs scaling by Act 3 or dies');
  if (crisis.consistency) add(2, '<span style="color:var(--amber)">⚠ Consistency</span> — deck needs more draw or thinner');

  // 2. Build-specific tips from engine tracker
  var engineItems = typeof getEngineTrackerItems === 'function' ? getEngineTrackerItems() : [];
  if (engineItems.length > 0) {
    var topEngine = engineItems[0];
    var engName = topEngine.eng.name;
    if (topEngine.pct < 0.5 && topEngine.pct > 0) {
      add(1, '<span style="color:var(--amber)">⚙ ' + engName + '</span> — build in progress, prioritize key cards');
    } else if (topEngine.pct >= 0.5 && topEngine.pct < 1) {
      add(2, '<span style="color:var(--green-bright)">✔ ' + engName + '</span> — nearly complete, round out the package');
    }
  }

  // 3. Deck health tips
  var total = getDeckSize();
  if (total > 25) add(3, '<span style="color:var(--amber)">📏 Bloated deck (' + total + ')</span> — consider removing Strikes/Defends');
  if (total < 12 && currentAct >= 2) add(2, '<span style="color:var(--amber)">📏 Thin deck (' + total + ')</span> — don\'t be afraid to take key cards');

  // 4. Act-specific pacing
  if (currentAct === 1) add(3, '<span style="color:var(--text-muted)">⏱ Act 1</span> — prioritize frontload damage, fight 3+ elites');
  if (currentAct === 2) add(3, '<span style="color:var(--text-muted)">⏱ Act 2</span> — find your scaling engine, skip cards that don\'t fit');
  if (currentAct === 3) add(3, '<span style="color:var(--text-muted)">⏱ Act 3</span> — reduce variance, remove starters, only take boss answers');

  // 4b. Elite pacing urgency — AoE needed for multi-enemy fights
  if (currentAct === 1 && total <= 14) {
    var hasAoeForElite = Object.keys(deck).some(function(n) { return n === 'Whirlwind' || n === 'Whirlwind+' || n === 'Thunderclap' || n === 'Thunderclap+' || n === 'Dagger Spray' || n === 'Dagger Spray+' || n === 'Sweeping Beam' || n === 'Sweeping Beam+'; });
    if (!hasAoeForElite) add(2, '<span style="color:var(--amber)">⚔ Act 1 elites</span> — The Kin splits into 3, Phrog Parasite splits into 4 Wrigglers. AoE recommended');
  }

  // 6. Guide-derived common mistakes per class
  if (currentChar === 'ironclad') {
    var atkCount = 0;
    Object.keys(deck).forEach(function(n) {
      var card = (ALL_CARDS[currentChar] || []).find(function(c) { return c.name === n; });
      if (card && card.type && card.type.includes('atk')) atkCount += deck[n];
    });
    if (atkCount > 10) add(2, '<span style="color:#c06060">⚔ ' + atkCount + ' attacks</span> — Ironclad needs block too, over 10 attacks is greedy');
  }
  if (currentChar === 'necrobinder') {
    if (deck['Soul'] > 0 && deck['Osty'] === 0 && currentAct <= 1) {
      add(1, '<span style="color:#c06060">⚠ Soul before Osty</span> — Act 1 Osty is safer, prioritize Summon cards');
    }
  }
  if (currentChar === 'regent') {
    var starCostCards = 0;
    Object.keys(deck).forEach(function(n) {
      var card = (ALL_CARDS[currentChar] || []).find(function(c) { return c.name === n; });
      if (card && card.starCost > 0) starCostCards += deck[n];
    });
    if (starCostCards > 0) {
      var starGenCount = (deck['Venerate']||0) + (deck['Glow']||0) + (deck['Genesis']||0) + (deck['Gather Light']||0);
      if (starGenCount === 0) add(1, '<span style="color:#c06060">⚠ Star-cost cards without generation</span> — need Star generators to play them');
    }
  }

  // Sort by priority and pick top 3
  tips.sort(function(a, b) { return a.p - b.p; });
  var shown = tips.slice(0, 3);
  if (shown.length === 0) return '';

  var tipHtml = '<div class="divider" style="margin:.6rem 0 .7rem"></div>';
  tipHtml += '<div style="font-family:Share Tech Mono,monospace;font-size:9px;color:var(--text-muted);letter-spacing:.12em;text-transform:uppercase;margin-bottom:.5rem">play tips</div>';
  shown.forEach(function(tip) {
    tipHtml += '<div style="font-size:11px;line-height:1.5;padding:4px 7px;border:1px solid rgba(100,90,70,.2);border-radius:3px;background:rgba(100,90,70,.06);margin-bottom:4px">' + tip.h + '</div>';
  });
  return tipHtml;
}

// ── renderGettingStarted ─────────────────────────────────────
// New player onboarding — collapsed by default.
function renderGettingStarted() {
  var key = 'gs_' + currentChar;
  var isOpen = window.__gsOpen && window.__gsOpen[key];
  var display = isOpen ? 'block' : 'none';
  var arrow = isOpen ? '▼' : '▶';

  var html = '<div class="divider" style="margin:.6rem 0 .7rem"></div>';
  html += '<div onclick="toggleGs(\'' + key + '\')" style="cursor:pointer;font-family:Share Tech Mono,monospace;font-size:9px;color:var(--text-muted);letter-spacing:.12em;text-transform:uppercase;margin-bottom:.3rem;user-select:none">';
  html += '<span style="display:inline-block;width:12px">' + arrow + '</span> getting started</div>';
  html += '<div id="gs_' + key + '" style="display:' + display + ';font-size:11px;line-height:1.6;color:var(--text-dim)">';

  // Combat 101
  html += '<div style="margin-bottom:6px"><strong style="color:var(--text)">Combat 101</strong><br>';
  html += 'Each turn: play cards from hand, enemies act. Priority per turn: <strong style="color:var(--teal-bright)">Block</strong> > <strong style="color:#ff6040">Attack</strong> > <strong style="color:var(--purple-bright)">Scaling</strong>.<br>';
  html += '<strong style="color:var(--amber)">Weak</strong> = enemy deals 25% less damage. <strong style="color:var(--amber)">Vulnerable</strong> = they take 50% more damage.<br>';
  html += 'Energy starts at 3, +1 after turn 1. Cards cost 0-3 energy.</div>';

  // Per-class basics
  html += '<div style="margin-bottom:6px"><strong style="color:var(--text)">' + currentChar.charAt(0).toUpperCase() + currentChar.slice(1) + ' Basics</strong><br>';
  var basics = {
    ironclad: 'Wants attacks early, block later. HP is a resource — spending it on effects is fine. Strength makes multi-hit cards hit harder per hit.',
    silent: 'Defense via Weak and evasion, not raw block. Poison bypasses Block. Sly discard = free card plays. Keep deck thin.',
    defect: 'Orbs automate everything. Focus makes orbs better. Defragment is #1 priority in every build. Frost orbs = passive block.',
    regent: 'Stars are a second energy resource. Sovereign Blade is your best friend — Forge it every turn. Void Form makes first 2 cards free.',
    necrobinder: 'Osty is your second HP bar — keep him alive. Grave Warden is the best common card in the game. Souls are 0-cost draw 2 Exhaust.'
  };
  html += basics[currentChar] || '';
  html += '</div>';

  // Deck building rules
  html += '<div style="margin-bottom:6px"><strong style="color:var(--text)">Deck Building</strong><br>';
  html += '<strong>14-18 cards</strong> by Act 2 boss is ideal. <strong>Skip</strong> is often correct — don\'t take cards just because they appear.<br>';
  html += 'One scaling card > three more attacks. Remove starting Strikes first, Defends second.<br>';
  html += 'Defense thresholds: Act 1 ~30 block, Act 2 ~40-50, Act 3 <strong>50+ minimum</strong> for boss.<br>';
  html += 'Without scaling, Act 3 kills you. Scaling = Strength, Focus, Poison, Forge, etc.</div>';

  // Risk vs Reward
  html += '<div><strong style="color:var(--text)">Risk vs Reward</strong><br>';
  html += '<span style="color:#ff6040">Hallway:</span> frontload damage, take little damage. <span style="color:var(--amber)">Elite:</span> scaling matters, save potions. <span style="color:var(--purple-bright)">Boss:</span> know the boss, build around its weakness.</div>';

  html += '</div>';
  return html;
}

// ── renderDeckOneLiner ──────────────────────────────────────
// Auto-generated deck summary: "16-card Ironclad, Strength-leaning..."
function renderDeckOneLiner(axes) {
  if (!currentChar || !axes || getDeckSize() === 0) return '';
  var total = getDeckSize();
  var charLabel = currentChar.charAt(0).toUpperCase() + currentChar.slice(1);
  var avgCost = 0;
  var costCards = 0;
  var charCards = ALL_CARDS[currentChar] || [];
  Object.keys(deck).forEach(function(n) {
    var c = charCards.find(function(x){return x.name===n;});
    if (!c || c.cost === 'X') return;
    var co = Number(c.cost);
    if (!isNaN(co)) { avgCost += co * deck[n]; costCards += deck[n]; }
  });
  avgCost = costCards > 0 ? (avgCost / costCards).toFixed(1) : '?';

  // Determine leaning from axis scores
  var highest = 'Attack', highestVal = axes.Attack;
  var lowest = 'Attack', lowestVal = axes.Attack;
  if (axes.Defense > highestVal) { highest = 'Defense'; highestVal = axes.Defense; }
  if (axes.Scaling > highestVal) { highest = 'Scaling'; highestVal = axes.Scaling; }
  if (axes.Efficiency > highestVal) { highest = 'Efficiency'; highestVal = axes.Efficiency; }
  if (axes.Synergy > highestVal) { highest = 'Synergy'; highestVal = axes.Synergy; }
  if (axes.Defense < lowestVal) { lowest = 'Defense'; lowestVal = axes.Defense; }
  if (axes.Scaling < lowestVal) { lowest = 'Scaling'; lowestVal = axes.Scaling; }
  if (axes.Efficiency < lowestVal) { lowest = 'Efficiency'; lowestVal = axes.Efficiency; }
  if (axes.Synergy < lowestVal) { lowest = 'Synergy'; lowestVal = axes.Synergy; }

  var targets = AXIS_TARGETS[currentAct] || AXIS_TARGETS[1];
  var frontloadOK = axes.Attack >= targets.Attack && axes.Defense >= targets.Defense;
  var scalingOK = axes.Scaling >= targets.Scaling;
  var status = '';
  if (frontloadOK && scalingOK) status = 'balanced';
  else if (!frontloadOK && !scalingOK) status = 'struggling';
  else if (!scalingOK) status = 'needs scaling';
  else status = 'needs frontload';

  return '<div style="font-size:11px;color:var(--text-dim);line-height:1.4;margin-bottom:.5rem;padding:5px 8px;border:1px solid rgba(100,90,70,.12);border-radius:3px;background:rgba(100,90,70,.04)">' +
    '<strong style="color:var(--text)">' + total + '-card ' + charLabel + '</strong> &middot; avg ' + avgCost + ' energy &middot; leans <strong style="color:var(--amber)">' + highest + '</strong> &middot; ' + status +
    '</div>';
}

// ── renderCampfireAdvice ────────────────────────────────────
// Recommend Rest / Upgrade / Smith based on HP + deck state + upcoming fight.
function renderCampfireAdvice(axes, targets) {
  if (!currentChar || getDeckSize() === 0) return '';
  var hpCur = parseInt(document.getElementById('hpCur').value) || 80;
  var hpMax = parseInt(document.getElementById('hpMax').value) || 80;
  var hpPct = hpMax > 0 ? hpCur / hpMax : 1;

  // Count un-upgraded build-essential cards
  var unupgraded = [];
  var totalUnupgraded = 0;
  Object.keys(deck).forEach(function(n) {
    if (n.endsWith('+')) return;
    var upgraded = n + '+';
    if (!deck[upgraded]) {
      totalUnupgraded++;
      // Check if this card is build-essential
      if (typeof BUILD_DATA !== 'undefined' && BUILD_DATA[currentChar]) {
        var builds = BUILD_DATA[currentChar].builds;
        if (builds) {
          Object.keys(builds).forEach(function(bk) {
            if ((builds[bk].essential||[]).indexOf(n) >= 0 || (builds[bk].mustPick||[]).indexOf(n) >= 0) {
              if (unupgraded.indexOf(n) < 0) unupgraded.push(n);
            }
          });
        }
      }
    }
  });

  var recommendations = [];
  var primary = '';
  var reasoning = '';

  if (hpPct < 0.35) {
    primary = 'Rest';
    reasoning = 'HP ' + Math.round(hpPct*100) + '% — below 35%, risk of dying next fight';
    if (unupgraded.length > 0) reasoning += '. ' + unupgraded.length + ' key cards need upgrade but survival first';
  } else if (unupgraded.length > 0 && hpPct >= 0.5) {
    primary = 'Upgrade';
    reasoning = unupgraded.slice(0, 3).join(', ') + ' — HP ' + Math.round(hpPct*100) + '% safe';
  } else if (hpPct >= 0.5 && hpPct < 0.8 && totalUnupgraded > 2) {
    primary = 'Upgrade';
    reasoning = Math.round(hpPct*100) + '% HP, ' + totalUnupgraded + ' un-upgraded cards — upgrade key ones';
  } else if (selectedBoss && currentAct >= 2 && axes && axes.Scaling < (targets?targets.Scaling||30:30)) {
    primary = 'Smith';
    reasoning = 'Need scaling for ' + selectedBoss + ' — Smith to find scaling cards';
  } else if (hpPct < 0.5 && totalUnupgraded > 0) {
    primary = 'Rest';
    reasoning = Math.round(hpPct*100) + '% HP with ' + totalUnupgraded + ' un-upgraded cards — rest first, upgrade later';
  } else if (hpPct < 0.5) {
    primary = 'Rest';
    reasoning = Math.round(hpPct*100) + '% HP — below 50%, rest for safety';
  } else if (hpPct >= 0.8 && totalUnupgraded === 0) {
    primary = 'Smith';
    reasoning = Math.round(hpPct*100) + '% HP, all key cards upgraded — Smith for card rewards';
  } else if (hpPct >= 0.5 && totalUnupgraded === 0) {
    if (axes && axes.Scaling < (targets?targets.Scaling||30:30)) {
      primary = 'Smith';
      reasoning = 'Deck upgraded but weak scaling — Smith for scaling';
    } else {
      primary = 'Rest';
      reasoning = 'HP safe but nothing critical to upgrade — rest for safety';
    }
  } else {
    primary = 'Upgrade';
    reasoning = Math.round(hpPct*100) + '% HP — upgrade key cards';
  }

  var color = primary === 'Rest' ? 'var(--teal)' : primary === 'Upgrade' ? 'var(--amber-bright)' : 'var(--amethyst)';
  var html = '<div class="divider" style="margin:.6rem 0 .7rem"></div>';
  html += '<div style="font-family:\'Share Tech Mono\',monospace;font-size:9px;color:var(--text-muted);letter-spacing:.12em;text-transform:uppercase;margin-bottom:.4rem">campfire</div>';
  html += '<div style="padding:6px 9px;border:1px solid ' + color + '40;border-radius:3px;background:' + color + '0d;font-size:11px;line-height:1.5">';
  html += '<strong style="color:' + color + '">' + primary + '</strong>';
  html += ' <span style="color:var(--text-dim)">— ' + reasoning + '</span>';

  // Merge upgrade candidates into the campfire box
  var upgradeCards = getUpgradeCandidates();
  if (upgradeCards && upgradeCards.length > 0) {
    html += '<div style="margin-top:7px;padding-top:6px;border-top:1px solid ' + color + '20">';
    html += '<div style="font-family:\'Share Tech Mono\',monospace;font-size:8px;color:var(--text-muted);letter-spacing:.08em;margin-bottom:4px">upgrade order</div>';
    upgradeCards.forEach(function(c) {
      var uc = c.score >= 30 ? 'var(--amber-bright)' : c.score >= 20 ? 'var(--teal)' : 'var(--text-dim)';
      var deckCount = deck[c.name] || 0;
      html += '<div onclick="upgradeCard(\'' + c.name.replace(/'/g,"\\'") + '\');updatePriorityPanel();updateResult();autoSave()" style="display:flex;align-items:center;gap:5px;padding:3px 6px;border:1px solid rgba(100,90,70,.12);border-radius:2px;background:rgba(100,90,70,.04);margin-bottom:2px;font-size:10px;cursor:pointer">';
      html += '<span style="color:' + uc + ';flex:1">' + c.name + '</span>';
      html += '<span style="font-family:\'Share Tech Mono\',monospace;font-size:8px;color:var(--text-muted)">' + deckCount + ' in deck</span>';
      html += '<span style="font-family:\'Share Tech Mono\',monospace;font-size:8px;color:' + uc + '">' + c.score + ' ⚒</span>';
      html += '</div>';
    });
    html += '</div>';
  }

  html += '</div>';
  return html;
}

// ── renderPathSuggestion ────────────────────────────────────
// Recommend elite-heavy or ?-room path based on deck strength.
function renderPathSuggestion(axes) {
  if (!currentChar || !axes || getDeckSize() === 0) return '';
  var total = getDeckSize();
  var targets = AXIS_TARGETS[currentAct] || AXIS_TARGETS[1];
  var frontload = axes.Attack + axes.Defense;
  var frontloadOK = axes.Attack >= targets.Attack && axes.Defense >= targets.Defense;
  var scalingOK = axes.Scaling >= targets.Scaling;
  var efficiencyOK = axes.Efficiency >= targets.Efficiency;

  var html = '<div class="divider" style="margin:.6rem 0 .7rem"></div>';
  html += '<div style="font-family:\'Share Tech Mono\',monospace;font-size:9px;color:var(--text-muted);letter-spacing:.12em;text-transform:uppercase;margin-bottom:.4rem">path suggestion</div>';

  var suggestion = '';
  var color = 'var(--verdant-bright)';
  if (currentAct === 1) {
    if (frontloadOK && efficiencyOK) {
      suggestion = 'Deck is strong. Take <strong style="color:var(--gold-bright)">3+ elites</strong> for relic + gold rewards';
      color = 'var(--verdant-bright)';
    } else if (frontloadOK) {
      suggestion = 'Frontload OK but low efficiency. Take <strong style="color:var(--gold-bright)">2 elites</strong>, prioritise energy/draw rewards';
      color = 'var(--amber-bright)';
    } else if (total < 12) {
      suggestion = 'Deck is thin and weak. Take <strong style="color:var(--teal)">more hallway fights</strong> for card rewards, avoid elites';
      color = 'var(--blood-bright)';
    } else {
      suggestion = 'Frontload below threshold. Take <strong style="color:var(--teal)">? rooms</strong> and shops, avoid early elites';
      color = 'var(--blood-bright)';
    }
  } else if (currentAct === 2) {
    if (frontloadOK && scalingOK) {
      suggestion = 'Deck handles both frontload and scaling. Take <strong style="color:var(--gold-bright)">2+ elites</strong> for rare rewards';
      color = 'var(--verdant-bright)';
    } else if (scalingOK) {
      suggestion = 'Scaling looks good but frontload weak. Take <strong style="color:var(--teal)">? rooms</strong> over elites, need more damage';
      color = 'var(--amber-bright)';
    } else {
      suggestion = 'Scaling behind for Act 2. Take <strong style="color:var(--teal)">? rooms and shops</strong> to find scaling cards';
      color = 'var(--blood-bright)';
    }
  } else if (currentAct === 3) {
    if (scalingOK && axes.Consistency > 40) {
      suggestion = 'Consistent scaling deck. Take <strong style="color:var(--gold-bright)">1-2 elites</strong> for final rare pulls';
      color = 'var(--verdant-bright)';
    } else if (scalingOK) {
      suggestion = 'Scaling ready but inconsistent. Take <strong style="color:var(--teal)">shops</strong> for remove + relics';
      color = 'var(--amber-bright)';
    } else {
      suggestion = 'Scaling inadequate for Act 3. Take <strong style="color:var(--teal)">? rooms</strong> — need a scaling solution fast';
      color = 'var(--blood-bright)';
    }
  }

  // Append boss context if selected
  if (selectedBoss) {
    suggestion += '<br><span style="color:var(--text-muted);font-size:10px">vs <strong style="color:var(--amber)">' + selectedBoss + '</strong> — ' +
      (color === 'var(--verdant-bright)' ? 'gearing up for the boss fight' : 'adjust path to prepare for ' + selectedBoss) + '</span>';
  }
  html += '<div style="padding:6px 9px;border:1px solid ' + color + '40;border-radius:3px;background:' + color + '0d;font-size:11px;line-height:1.5">' + suggestion + '</div>';
  return html;
}

// ── renderEncounterTips ─────────────────────────────────────
// Collapsible section with per-act encounter knowledge from REGION_DATA.
var __encounterTipsOpen = {encTips: true}; // auto-open by default
function renderEncounterTips() {
  if (!currentChar || getDeckSize() === 0 || typeof REGION_DATA === 'undefined') return '';
  var key = 'encTips';
  var isOpen = __encounterTipsOpen[key];
  var display = isOpen ? 'block' : 'none';
  var arrow = isOpen ? '▼' : '▶';

  var html = '<div class="divider" style="margin:.6rem 0 .7rem"></div>';
  html += '<div onclick="__encounterTipsOpen.encTips=!__encounterTipsOpen.encTips;updatePriorityPanel()" style="cursor:pointer;font-family:Share Tech Mono,monospace;font-size:9px;color:var(--text-muted);letter-spacing:.12em;text-transform:uppercase;margin-bottom:.3rem;user-select:none">';
  html += '<span style="display:inline-block;width:12px">' + arrow + '</span> encounter tips</div>';

  if (!isOpen) return html + '</div>'; // close outer if not open

  html += '<div style="display:' + display + ';font-size:10px;line-height:1.5;color:var(--text-dim)">';

  // Find regions matching current act
  Object.keys(REGION_DATA).forEach(function(rk) {
    var rd = REGION_DATA[rk];
    if (rd.act !== currentAct) return;

    html += '<div style="font-family:\'Share Tech Mono\',monospace;font-size:8px;color:' + rd.color + ';letter-spacing:.1em;text-transform:uppercase;margin:.5rem 0 .2rem">' + rd.label + '</div>';

    // Elites
    if (rd.elites) {
      Object.keys(rd.elites).forEach(function(ek) {
        var e = rd.elites[ek];
        html += '<div style="padding:3px 6px;border-left:2px solid ' + rd.color + '40;margin-bottom:4px;background:' + rd.color + '06;border-radius:0 2px 2px 0">';
        html += '<strong style="color:' + rd.color + '">' + ek + '</strong>';
        html += ' <span style="color:var(--text-muted)">[' + e.type + ' ' + e.hp + ']</span><br>';
        html += '<span style="color:var(--text-dim)">' + (e.strategy || '') + '</span>';
        html += '</div>';
      });
    }

    // Bosses
    if (rd.bosses) {
      Object.keys(rd.bosses).forEach(function(bk) {
        var b = rd.bosses[bk];
        html += '<div style="padding:3px 6px;border-left:2px solid ' + rd.color + '70;margin-bottom:4px;background:' + rd.color + '0a;border-radius:0 2px 2px 0">';
        html += '<strong style="color:' + rd.color + '">' + bk + '</strong>';
        html += ' <span style="color:var(--text-muted)">[' + b.type + ' ' + b.hp + ']</span><br>';
        html += '<span style="color:var(--text-dim)">' + (b.strategy || '') + '</span>';
        html += '</div>';
      });
    }
  });

  html += '</div>';
  return html;
}

// ── renderUpgradeCandidates ─────────────────────────────────
function renderUpgradeCandidates() {
  if (!currentChar || getDeckSize() === 0) return '';
  var candidates = getUpgradeCandidates();
  if (!candidates || candidates.length === 0) return '';
  var html = '<div class="divider" style="margin:.6rem 0 .7rem"></div>';
  html += '<div style="font-family:\'Share Tech Mono\',monospace;font-size:9px;color:var(--text-muted);letter-spacing:.12em;text-transform:uppercase;margin-bottom:.5rem">upgrade priority</div>';
  candidates.forEach(function(c) {
    var color = c.score >= 30 ? 'var(--amber-bright)' : c.score >= 20 ? 'var(--teal-bright)' : 'var(--text-dim)';
    var deckCount = deck[c.name] || 0;
    html += '<div style="display:flex;align-items:center;gap:6px;padding:4px 7px;border:1px solid rgba(100,90,70,.15);border-radius:3px;background:rgba(100,90,70,.05);margin-bottom:3px;font-size:11px">';
    html += '<span style="color:' + color + ';flex:1">' + c.name + '</span>';
    html += '<span style="font-family:\'Share Tech Mono\',monospace;font-size:9px;color:var(--text-muted)">' + deckCount + ' in deck</span>';
    html += '<span style="font-family:\'Share Tech Mono\',monospace;font-size:9px;color:' + color + '">score ' + c.score + '</span>';
    html += '</div>';
  });
  return html;
}

// ── renderRemoveCandidates ──────────────────────────────────
function renderRemoveCandidates() {
  if (!currentChar || getDeckSize() === 0) return '';
  var candidates = getRemoveCandidates();
  if (!candidates || candidates.length === 0) return '';
  var html = '<div class="divider" style="margin:.6rem 0 .7rem"></div>';
  html += '<div style="font-family:\'Share Tech Mono\',monospace;font-size:9px;color:var(--text-muted);letter-spacing:.12em;text-transform:uppercase;margin-bottom:.5rem">remove at campfire</div>';
  candidates.forEach(function(c) {
    var dotColor = c.tier === 1 ? '#c06060' : c.tier === 2 ? 'var(--amber-bright)' : 'var(--text-muted)';
    html += '<div style="display:flex;align-items:center;gap:6px;padding:4px 7px;border:1px solid rgba(100,90,70,.15);border-radius:3px;background:rgba(100,90,70,.05);margin-bottom:3px;font-size:11px">';
    html += '<span style="color:' + dotColor + ';font-size:14px">●</span>';
    html += '<span style="color:var(--text);flex:1">' + c.name + '</span>';
    html += '<span style="color:var(--text-dim);font-size:10px;font-style:italic">' + c.reason + '</span>';
    html += '</div>';
  });
  return html;
}

// ── renderCostCurve ─────────────────────────────────────────
function renderCostCurve() {
  if (!currentChar || getDeckSize() === 0) return '';
  var dist = getCostDistribution();
  if (!dist || dist.length === 0) return '';
  var total = dist.reduce(function(s, d) { return s + d.count; }, 0);
  if (total === 0) return '';
  var html = '<div class="divider" style="margin:.6rem 0 .7rem"></div>';
  html += '<div style="font-family:\'Share Tech Mono\',monospace;font-size:9px;color:var(--text-muted);letter-spacing:.12em;text-transform:uppercase;margin-bottom:.4rem">energy cost curve</div>';
  html += '<div style="display:flex;gap:3px;min-height:20px;align-items:flex-end;margin-bottom:4px">';
  var barColors = {0:'var(--teal)',1:'var(--verdant-bright)',2:'var(--amber-bright)',3:'var(--blood-bright)',4:'var(--amethyst)'};
  dist.forEach(function(d) {
    var pct = total > 0 ? Math.round(d.count / total * 100) : 0;
    var barH = Math.max(4, pct * 0.6);
    var color = barColors[d.cost] || 'var(--text-muted)';
    var displayLabel = d.count > 0 ? d.count : '';
    html += '<div style="flex:1;display:flex;flex-direction:column;align-items:center">';
    html += '<span style="font-family:\'Share Tech Mono\',monospace;font-size:9px;color:var(--text)">' + d.count + '</span>';
    html += '<div style="width:100%;height:' + barH + 'px;background:' + color + ';border-radius:2px;min-height:4px"></div>';
    html += '<span style="font-family:\'Share Tech Mono\',monospace;font-size:8px;color:var(--text-muted);margin-top:2px">' + d.label + '</span>';
    html += '</div>';
  });
  html += '</div>';
  var heavyCost = dist.filter(function(d) { return d.cost >= 2; }).reduce(function(s, d) { return s + d.count; }, 0);
  var heavyPct = total > 0 ? Math.round(heavyCost / total * 100) : 0;
  var energyTips = '';
  if (heavyPct > 60) energyTips = '<span style="color:var(--blood-bright)">' + heavyPct + '% cost 2+ — need energy relics</span>';
  else if (heavyPct > 40) energyTips = '<span style="color:var(--amber-bright)">' + heavyPct + '% cost 2+ — energy tight</span>';
  else energyTips = '<span style="color:var(--verdant-bright)">' + heavyPct + '% cost 2+ — energy looks fine</span>';
  html += '<div style="font-size:10px;color:var(--text-dim);margin-bottom:.2rem">Budget: ' + energyTips + '</div>';
  if (currentChar === 'regent') {
    var starDist = getStarCostDistribution();
    if (starDist.length > 0) {
      var starTotal = starDist.reduce(function(s, d) { return s + d.count; }, 0);
      html += '<div style="font-family:\'Share Tech Mono\',monospace;font-size:9px;color:var(--text-muted);letter-spacing:.12em;text-transform:uppercase;margin:.5rem 0 .3rem">star cost curve</div>';
      html += '<div style="display:flex;gap:3px;min-height:16px;align-items:flex-end;margin-bottom:2px">';
      starDist.forEach(function(d) {
        var pct = starTotal > 0 ? Math.round(d.count / starTotal * 100) : 0;
        var barH = Math.max(4, pct * 0.5);
        html += '<div style="flex:1;display:flex;flex-direction:column;align-items:center">';
        html += '<span style="font-family:\'Share Tech Mono\',monospace;font-size:8px;color:var(--gold-bright)">' + d.count + '</span>';
        html += '<div style="width:100%;height:' + barH + 'px;background:var(--gold);border-radius:2px;min-height:4px"></div>';
        html += '<span style="font-family:\'Share Tech Mono\',monospace;font-size:8px;color:var(--text-muted);margin-top:1px">' + d.label + '</span>';
        html += '</div>';
      });
      html += '</div>';
    }
  }
  return html;
}

// ── renderBuildResults ───────────────────────────────────────
// Shows all builds for current character with progress, cards, priority.
function renderBuildResults() {
  if (!currentChar || typeof BUILD_DATA === 'undefined' || !BUILD_DATA[currentChar]) return '<div class="placeholder"><div class="placeholder-icon">⚔</div><p>Add cards to your deck to see your build path.</p></div>';
  var charBuilds = BUILD_DATA[currentChar].builds;
  if (!charBuilds) return '<div class="placeholder"><p>No builds defined.</p></div>';

  var totalCards = getDeckSize();
  if (totalCards === 0) return '<div class="placeholder"><div class="placeholder-icon">⚔</div><p>Add cards to your deck to see your build path.</p></div>';

  var html = '<div class="result-scroll">';
  html += '<div style="font-family:\'Share Tech Mono\',monospace;font-size:9px;color:var(--text-muted);letter-spacing:.12em;text-transform:uppercase;margin-bottom:.6rem">all builds</div>';

  Object.keys(charBuilds).forEach(function(bk) {
    var b = charBuilds[bk];
    var essential = b.essential || [];
    var synergy = b.synergy || [];
    var mustPick = b.mustPick || [];
    var highPri = b.highPriority || [];

    // Calculate how many essential cards are in deck
    var haveEssential = essential.filter(function(c) { return deck[c] || deck[c+'+']; }).length;
    var pct = essential.length > 0 ? haveEssential / essential.length : 0;
    var color = pct >= 1 ? 'var(--green-bright)' : pct >= 0.5 ? 'var(--amber-bright)' : 'var(--teal-bright)';
    var status = pct >= 1 ? '✔ complete' : pct > 0 ? '⚙ building' : '○ not started';

    // Build header
    html += '<div style="margin-bottom:.5rem;padding:.5rem;border:1px solid ' + b.color + '30;border-radius:4px;background:' + b.color + '06">';
    html += '<div style="display:flex;align-items:center;gap:5px;margin-bottom:4px">';
    html += '<span style="font-size:12px;font-family:Cinzel,serif;color:' + b.color + '">' + b.name + '</span>';
    if (b.rank) html += '<span style="font-family:\'Share Tech Mono\',monospace;font-size:8px;padding:1px 5px;border-radius:2px;border:1px solid ' + b.color + '50;color:' + b.color + '">' + b.rank + '</span>';
    html += '<span style="font-family:\'Share Tech Mono\',monospace;font-size:8px;color:' + color + ';margin-left:auto">' + status + '</span>';
    html += '</div>';

    // Progress bar
    html += '<div class="axis-row" style="margin-bottom:5px"><div class="axis-bar-bg" style="flex:1"><div class="axis-bar-fill" style="width:' + Math.round(pct*100) + '%;background:' + color + '"></div></div><span class="axis-val">' + haveEssential + '/' + essential.length + '</span></div>';

    // Must Pick cards
    if (mustPick.length > 0) {
      html += '<div style="margin-bottom:3px"><span style="font-family:\'Share Tech Mono\',monospace;font-size:8px;color:#ff6040;letter-spacing:.06em">MUST PICK</span> <span style="font-size:10px;color:var(--text)">';
      mustPick.forEach(function(c) {
        var inDeck = deck[c] || deck[c+'+'] ? true : false;
        html += '<span style="display:inline-block;padding:1px 5px;margin:1px;border-radius:2px;border:1px solid ' + (inDeck ? '#4a9a8a40' : 'rgba(100,90,70,.2)') + ';background:' + (inDeck ? '#4a9a8a15' : 'rgba(100,90,70,.05)') + ';color:' + (inDeck ? 'var(--green-bright)' : 'var(--text-dim)') + '">' + c + '</span>';
      });
      html += '</span></div>';
    }

    // High priority cards
    if (highPri.length > 0) {
      html += '<div style="margin-bottom:3px"><span style="font-family:\'Share Tech Mono\',monospace;font-size:8px;color:var(--amber-bright);letter-spacing:.06em">HIGH PRIORITY</span> <span style="font-size:10px;color:var(--text)">';
      highPri.forEach(function(c) {
        var inDeck = deck[c] || deck[c+'+'] ? true : false;
        html += '<span style="display:inline-block;padding:1px 5px;margin:1px;border-radius:2px;border:1px solid ' + (inDeck ? '#4a9a8a40' : 'rgba(100,90,70,.2)') + ';background:' + (inDeck ? '#4a9a8a15' : 'rgba(100,90,70,.05)') + ';color:' + (inDeck ? 'var(--green-bright)' : 'var(--text-dim)') + '">' + c + '</span>';
      });
      html += '</span></div>';
    }

    // Essential cards (not already shown in mustPick/high)
    var otherEssential = essential.filter(function(c) { return mustPick.indexOf(c) < 0 && highPri.indexOf(c) < 0; });
    if (otherEssential.length > 0) {
      html += '<div style="margin-bottom:3px"><span style="font-family:\'Share Tech Mono\',monospace;font-size:8px;color:var(--teal-bright);letter-spacing:.06em">ESSENTIAL</span> <span style="font-size:10px;color:var(--text)">';
      otherEssential.forEach(function(c) {
        var inDeck = deck[c] || deck[c+'+'] ? true : false;
        html += '<span style="display:inline-block;padding:1px 5px;margin:1px;border-radius:2px;border:1px solid ' + (inDeck ? '#4a9a8a40' : 'rgba(100,90,70,.2)') + ';background:' + (inDeck ? '#4a9a8a15' : 'rgba(100,90,70,.05)') + ';color:' + (inDeck ? 'var(--green-bright)' : 'var(--text-dim)') + '">' + c + '</span>';
      });
      html += '</span></div>';
    }

    // Synergy cards (collapsed)
    if (synergy.length > 0) {
      html += '<details style="margin-top:2px"><summary style="font-family:\'Share Tech Mono\',monospace;font-size:8px;color:var(--text-muted);cursor:pointer;letter-spacing:.06em">SYNERGY (' + synergy.length + ')</summary>';
      html += '<div style="margin-top:3px;font-size:10px;color:var(--text-dim)">';
      synergy.forEach(function(c) {
        var inDeck = deck[c] || deck[c+'+'] ? true : false;
        html += '<span style="display:inline-block;padding:1px 5px;margin:1px;border-radius:2px;border:1px solid rgba(100,90,70,.15);background:rgba(100,90,70,.03);color:' + (inDeck ? 'var(--green-bright)' : 'var(--text-dim)') + '">' + c + '</span>';
      });
      html += '</div></details>';
    }

    // Recommended relics
    if (b.relicPriority && b.relicPriority.length > 0) {
      html += '<details style="margin-top:3px"><summary style="font-family:\'Share Tech Mono\',monospace;font-size:8px;color:var(--amber);cursor:pointer;letter-spacing:.06em">RECOMMENDED RELICS (' + b.relicPriority.length + ')</summary>';
      html += '<div style="margin-top:3px;font-size:10px;color:var(--text-dim)">';
      b.relicPriority.forEach(function(r) {
        var owned = relics.indexOf(r) >= 0;
        html += '<span style="display:inline-block;padding:1px 5px;margin:1px;border-radius:2px;border:1px solid ' + (owned ? '#4a9a8a40' : 'rgba(100,90,70,.15)') + ';background:' + (owned ? '#4a9a8a15' : 'rgba(100,90,70,.03)') + ';color:' + (owned ? 'var(--green-bright)' : 'var(--text-dim)') + '">' + r + '</span>';
      });
      html += '</div></details>';
    }

    // Upgrade priority
    var upgradeList = mustPick.concat(highPri).filter(function(c) { return deck[c] && !deck[c+'+']; });
    if (upgradeList.length > 0) {
      html += '<div style="margin-top:3px;font-family:\'Share Tech Mono\',monospace;font-size:8px;color:var(--amber-bright);letter-spacing:.06em">UPGRADE PRIORITY: <span style="color:var(--text-dim);font-size:9px">' + upgradeList.slice(0, 4).join(' > ') + '</span></div>';
    }

    // Potion priority
    if (b.potionPriority) {
      html += '<div style="margin-top:3px;font-family:\'Share Tech Mono\',monospace;font-size:8px;color:var(--teal-bright);letter-spacing:.06em">POTIONS: <span style="color:var(--text-dim);font-size:9px;font-family:inherit">' + b.potionPriority + '</span></div>';
    }

    // Tips
    if (b.tips && b.tips.length > 0) {
      html += '<details style="margin-top:3px"><summary style="font-family:\'Share Tech Mono\',monospace;font-size:8px;color:var(--text-muted);cursor:pointer;letter-spacing:.06em">tips</summary>';
      html += '<ul style="margin:4px 0 0 1rem;padding:0;font-size:10px;color:var(--text-dim);line-height:1.5">';
      b.tips.forEach(function(tip) { html += '<li>' + tip + '</li>'; });
      html += '</ul></details>';
    }

    html += '</div>';
  });

  html += '</div>';
  return html;
}

// ── renderRelicBar ───────────────────────────────────────────
// Shows current relics with add/remove controls.
var RELIC_LIST = ['Dead Branch','Magic Flower','Mark of Pain','Brimstone','Orange Pellets','Snecko Eye','Runic Pyramid','Incense Burner','Tungsten Rod','Torii','Thread and Needle','Tough Bandages','Enchiridion','Nilry\'s Codex','Shuriken','Kunai','Pen Nib','Preserved Insect','Bag of Preparation','Centennial Puzzle','Smiling Mask','Strange Spoon','Membership Card','Merchant Card','Juzu Bracelet','Omamori','Ancient Tea Set','Gremlin Horn','Horn Cleat','Lantern','Vajra','War Paint','Whetstone','Bottled Lightning','Bottled Flame','Bottled Tornado','Meal Ticket','Regal Pillow','Pear','Strawberry','Mango','Old Coin','Question Card','Happy Flower','Golden Idol','Cultist Mask','Necronomicon','Gremlin Visage','Spirit Poop','Cauldron','Clockwork','Face of Cleric','Face of Miner','Face of Serpent','Wing Boots','Boot','Letter Opener','Blue Candle','Dream Catcher','Bird-Faced Urn','Sling','Anchor','Abacus','Eternal Feather','Ice Cream','Ginger','Turnip','Du-Vu Doll','Scales','The Specimen','Frozen Core','Inserter','Symbiotic Virus','Emotion Chip','Gold-Plated Cables','Graviton','Cracked Core','Data Disk','Nuclear Battery','Star Crystal','Champion Belt','Neows Blessing','Calling Bell','The Bomb','Bloody Idol','Mutagenic Strength','Darkstone Periapt','Leech','Ectoplasm','Cursed Key','Coffee Dripper','Velvet Choker','Fusion Hammer','Crown','Sozu','Runic Dome','Astrolabe','Slavers Collar','Philosopher Stone','Tiny House','Busted Crown','Pandoras Box','Eternal Feather','The Boot','Orrery','Empty Cage','Lizard Tail','Sapphire Key','Ruby Key','Emerald Key','Green Key','Red Key','Blue Key'];
var RELIC_CATEGORIES = {build:'Magic Flower',str:'Dead Branch',energy:'Mark of Pain',draw:'Bag of Preparation',def:'Tough Bandages'};

function renderRelicBar() {
  var el = document.getElementById('relicBar');
  if (!el || !currentChar) { if(el) el.innerHTML=''; return; }
  var html = '<div style="background:rgba(0,0,0,.5);border-radius:4px;padding:6px 8px;margin-bottom:6px">';
  html += '<div style="font-family:Share Tech Mono,monospace;font-size:9px;color:var(--text-muted);letter-spacing:.12em;text-transform:uppercase;margin-bottom:5px">relics</div>';
  html += '<div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:6px">';
  if (relics.length === 0) {
    html += '<span style="font-size:10px;color:var(--text-dim)">none — click to add</span>';
  } else {
    relics.forEach(function(r) {
      html += '<span onclick="removeRelic(\''+r.replace(/'/g,"\\'")+'\')" style="font-size:10px;padding:2px 8px;border:1px solid rgba(200,146,42,.5);border-radius:3px;background:rgba(30,20,5,.6);color:var(--amber-bright);cursor:pointer;display:inline-flex;align-items:center;gap:4px">'+r+' <span style="color:var(--text-muted);font-size:8px">✕</span></span>';
    });
  }
  html += '</div>';
  html += '<div style="font-family:Share Tech Mono,monospace;font-size:8px;color:var(--text-muted);letter-spacing:.08em;margin-bottom:3px">quick add</div>';
  html += '<div style="display:flex;flex-wrap:wrap;gap:3px">';
  var commonRelics = ['Dead Branch','Magic Flower','Mark of Pain','Snecko Eye','Runic Pyramid','Bag of Preparation','Shuriken','Kunai','Pen Nib','Preserved Insect'];
  commonRelics.forEach(function(r) {
    if (relics.indexOf(r) < 0) {
      html += '<span onclick="addRelic(\''+r.replace(/'/g,"\\'")+'\')" style="font-size:8px;padding:2px 6px;border:1px solid rgba(180,140,60,.3);border-radius:2px;background:rgba(20,15,5,.5);color:var(--text-dim);cursor:pointer">'+r+'</span>';
    }
  });
  html += '</div></div>';
  el.innerHTML = html;
}

// Toggle Getting Started section
window.__gsOpen = window.__gsOpen || {};
function toggleGs(key) {
  window.__gsOpen[key] = !window.__gsOpen[key];
  updatePriorityPanel();
}
