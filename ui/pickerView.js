// Inline card picker (reward tab + add tab) for STS2 Build Advisor.

let pickerTab = 'reward';
let rewardOffered = []; // card names in the current reward pool; kept across tab switches

// '⚡⚡', 'X', or '⚡✦✦' for Regent stars. Negative costs in the data mean X (or unplayable).
function costText(c) {
  if (isUnplayable(c)) return '';
  const rep = (ch, n) => n === 'X' || n < 0 ? 'X' : ch.repeat(Number(n) || 0);
  return (c.cost !== undefined ? rep('⚡', c.cost) : '') + (currentChar === 'regent' && c.starCost ? rep('✦', c.starCost) : '');
}

function switchPickerTab(tab) {
  pickerTab = tab;
  ['reward', 'add'].forEach(function(t) {
    var b = document.getElementById('ptab-' + t);
    b.classList.toggle('active', tab === t);
    b.setAttribute('aria-selected', tab === t);
  });
  document.querySelector('.picker-tabs').dataset.tab = tab;
  document.getElementById('pickerSearch').value = '';
  document.getElementById('pickerSearch').placeholder = tab === 'reward' ? 'Search cards being offered...' : 'Search to see build details, or browse below...';
  if (tab === 'reward') {
    renderPickerReward();
  } else {
    renderPickerAdd();
  }
  document.getElementById('pickerSearch').focus();
  
  // Session 3 UI improvement: highlight reward tab if pool is active
  const rTab = document.getElementById('ptab-reward');
  if (rewardOffered.length > 0 && pickerTab !== 'reward') {
    rTab.style.borderBottom = '2px solid var(--amber)';
  } else {
    rTab.style.borderBottom = '';
  }
}

// --- REWARD TAB ---
function renderPickerReward() {
  const list = document.getElementById('pickerList');
  renderRewardUnified(list);
}

function renderRewardUnified(el) {
  const q = (document.getElementById('pickerSearch').value || '').toLowerCase();
  const allCards = getAllCardsForPicker();
  const typeCls = t => {
    if (!t) return 'tag-skl';
    if (t.includes('atk')) return 'tag-atk';
    if (t.includes('def')) return 'tag-def';
    if (t.includes('vel')) return 'tag-vel';
    if (t.includes('pow')) return 'tag-pow';
    return 'tag-skl';
  };
  let html = '';

  // Pool chips (always visible at top)
  if (rewardOffered.length > 0) {
    html += '<div style="padding:5px 2px 7px;border-bottom:1px solid var(--border);margin-bottom:6px">';
    html += '<div style="font-family:var(--font-mono);font-size:9px;color:var(--text-muted);letter-spacing:.12em;text-transform:uppercase;margin-bottom:5px">pool \u2014 click to remove</div>';
    html += '<div style="display:flex;flex-wrap:wrap;gap:4px">';
    rewardOffered.forEach(function(n) {
      const c = allCards.find(function(x){return x.name===n;});
      const t = c ? c.type : 'skl';
      const safeNR = n.replace(/'/g,"\\'");
      html += '<span data-card="'+n+'" onclick="rewardRemoveOffered(\''+safeNR+'\')" style="display:inline-flex;align-items:center;gap:4px;padding:3px 8px;border:1px solid var(--border-bright);border-radius:3px;background:var(--surface2);font-size:12px;cursor:pointer;color:var(--text)">';
      html += '<span class="deck-item-tag '+typeCls(t)+'" style="font-size:10px;padding:1px 4px">'+t.replace(/_/g,'·').toUpperCase()+'</span>';
      html += ' '+n+' <span style="color:var(--text-muted);font-size:10px">\u2715</span></span>';
    });
    html += '</div></div>';
  }

  // Search results (only when typing)
  if (q) {
    const allMatches = allCards.filter(function(c){return c.name.toLowerCase().includes(q);});
    const ownMatches  = allMatches.filter(function(c){return !c.crossChar;}).slice(0,10);
    const crossMatches = allMatches.filter(function(c){return c.crossChar;}).slice(0,8);
    const matches = ownMatches.concat(crossMatches);
    if (!matches.length) {
      html += '<div class="picker-empty">No cards match.</div>';
    } else {
      matches.forEach(function(c) {
        const already = rewardOffered.includes(c.name);
        const safeN = c.name.replace(/'/g,"\\'");
        const clickFn = already ? 'rewardRemoveOffered(\''+safeN+'\')' : 'rewardAddOffered(\''+safeN+'\')';
        const borderCol = already ? 'var(--amber)' : (c.crossChar ? 'rgba(100,90,70,.3)' : 'rgba(100,90,70,.2)');
        const bgCol = already ? 'rgba(40,30,10,.4)' : 'rgba(0,0,0,.45)';
        const nameCol = already ? 'var(--amber-bright)' : (c.crossChar ? 'var(--text-dim)' : 'var(--text)');
        const addCol = already ? 'var(--amber)' : 'var(--green-bright)';
        const addLbl = already ? '&#10003; added' : '+ add';
        const crossLabel = c.crossChar ? ' <span style="font-size:10px;color:var(--text-muted);border:1px solid var(--border);border-radius:2px;padding:0 4px">'+c.crossCharName+'</span>' : '';
        const finalCostStr = costText(c);
        const typeLabel = (c.type||'skl').replace(/_/g,'·').toUpperCase();
        const descHtml = formatCardDescription(c.description || '');
        const detailHtml = '<div style="font-size:10px;color:var(--text-dim);line-height:1.35;margin-top:1px">'+typeLabel+(finalCostStr?' · '+finalCostStr:'')+(descHtml?' — '+descHtml:'')+'</div>';
        const noteHtml = c.note ? '<div style="font-size:10px;color:var(--text-muted);font-style:italic;line-height:1.4;margin-top:1px">'+c.note+'</div>' : '';
        const isUpgraded = c.name.endsWith('+');
        const nameStyle = isUpgraded ? 'color:var(--amber-bright); font-weight:600;' : 'color:'+nameCol;
        html += '<div data-card="'+c.name+'" onclick="'+clickFn+'" style="display:grid;grid-template-columns:1fr auto auto auto;align-items:center;gap:7px;padding:6px 8px;border:1px solid '+borderCol+';border-radius:3px;margin-bottom:3px;background:'+bgCol+';cursor:pointer;overflow:hidden">';
        html += '<div style="min-width:0"><div style="font-size:13px;'+nameStyle+';overflow:hidden;text-overflow:ellipsis"><span class="cf-row-orb">'+cardOrbHtml(c, true)+'</span>'+c.name+crossLabel+'</div>'+detailHtml+noteHtml+'</div>';
        html += '<span class="deck-item-tag '+typeCls(c.type)+'" style="font-size:9px;padding:1px 5px">'+(c.type||'skl').replace(/_/g,'·').toUpperCase()+'</span>';
        html += rarityBadgeHtml(getRarity(c));
        html += verdictBadgeHtml(scoreCard(c.name));
        html += '</div>';
      });
    }
    el.innerHTML = html;
    return;
  }

  // Empty state
  if (rewardOffered.length === 0) {
    html += '<div class="picker-empty" style="padding:.75rem 2px">Search for the cards being offered and add them to the pool. Verdicts appear automatically.</div>';
    el.innerHTML = html;
    return;
  }

  // Live verdict
  html += renderRewardVerdictHtml();
  el.innerHTML = html;
}

var _revealKey = '';

// Verdict scores tick up from 0 (400 ms, ease-out) on freshly revealed reward rows.
function countUpScores() {
  var els = document.querySelectorAll('.rcard.reveal .score-num');
  var t0 = performance.now();
  (function tick(now) {
    var k = Math.min(1, (now - t0) / 400), e = 1 - Math.pow(1 - k, 3);
    els.forEach(function(el) { el.textContent = Math.round(el.dataset.score * e); });
    if (k < 1) requestAnimationFrame(tick);
  })(t0);
}

function renderRewardVerdictHtml() {
  if (!currentChar) return '';
  var total = getDeckSize();
  var typeCls = function(t){
    if (!t) return 'tag-skl';
    if (t.includes('atk')) return 'tag-atk';
    if (t.includes('def')) return 'tag-def';
    if (t.includes('vel')) return 'tag-vel';
    if (t.includes('pow')) return 'tag-pow';
    return 'tag-skl';
  };

  var scored = scoreRewardPool(rewardOffered);
  var allSkip = scored.skipAdvice;

  var axes = calcSixAxes();
  var targets = AXIS_TARGETS[currentAct] || AXIS_TARGETS[1];
  var db = getDrawBalance();
  var deckStateChips = [];
  if (axes) {
    if (axes.Defense < targets.Defense && total > 6) deckStateChips.push({t:'low defense', warn:true});
    if (axes.Attack < targets.Attack && total > 6) deckStateChips.push({t:'low attack', warn:true});
    if (axes.Efficiency < targets.Efficiency && total > 6) deckStateChips.push({t:'low efficiency'});
    if (axes.Scaling < targets.Scaling && total > 8) deckStateChips.push({t:'low scaling'});
    if (axes.Consistency < targets.Consistency && total > 10) deckStateChips.push({t:'low consistency'});
    if (axes.Synergy < targets.Synergy && total > 15) deckStateChips.push({t:'low synergy'});
  }
  var atkDefPool = Math.max(1, db.atkDraw + db.defDraw);
  var rAtk = Math.round(db.atkDraw / atkDefPool * 100);
  if (rAtk > 65 && total > 7) deckStateChips.push({t:'atk-heavy draws'});
  if (rAtk < 35 && total > 7) deckStateChips.push({t:'def-heavy draws'});

  var bossCtx = selectedBoss ? ' · vs '+selectedBoss : '';
  var html = '<div style="font-size:9px;color:var(--amber);letter-spacing:.1em;text-transform:uppercase;padding:4px 2px 6px;border-bottom:1px solid var(--border);margin-bottom:6px">card reward — all builds considered'+bossCtx+'</div>';
  var szp = getDeckSizeProfile();
  deckStateChips.unshift({t: szp.total + ' cards · ' + szp.label, warn: szp.zone === 'danger'});
  // Neutral chips; red only for real gaps (low attack/defense, deck size in the danger zone).
  html += '<div class="state-chips">' + deckStateChips.map(function(chip) {
    return '<span class="state-chip' + (chip.warn ? ' warn' : '') + '">' + (chip.warn ? '\u26A0 ' : '') + chip.t + '</span>';
  }).join('') + '</div>';

  if (allSkip) {
    html += '<div style="padding:.75rem;border:1px solid rgba(200,146,42,.25);border-radius:4px;background:rgba(200,146,42,.07);margin-bottom:8px">';
    html += '<div style="font-size:9px;color:var(--amber);letter-spacing:.1em;margin-bottom:4px">SKIP RECOMMENDED</div>';
    html += '<div style="font-size:12px;color:var(--text-dim)">None of these make your deck stronger. Taking a weak card means drawing your good cards less often.</div></div>';
  }

  // Rows stagger in and scores count up only when the offered pool changes, not on every redraw.
  var revealKey = rewardOffered.join('|');
  var reveal = !REDUCED_MOTION && revealKey !== _revealKey;
  _revealKey = revealKey;
  if (reveal) requestAnimationFrame(countUpScores);

  // Offered cards as game-style faces with a verdict ribbon; the best one is lifted and crowned.
  html += '<div class="reward-stage">';
  scored.forEach(function(s, i) {
    var isBest = i===0 && !allSkip;
    var safeN = esc(s.name.replace(/'/g,"\\'"));
    html += '<div class="rcard v-' + s.verdict + (isBest ? ' best' : '') + (reveal ? ' reveal' : '') + '" style="--i:' + i + '" title="' + esc(rarityContext(getRarity(s.card), s.verdict)) + '">';
    html += '<div class="rcard-face">' + (isBest ? '<span class="rcard-crown">best pick</span>' : '') + cardFaceHtml(s.card, true);
    html += '<div class="verdict-ribbon">' + s.vLabel + ' <span class="seal"><span class="score-num" data-score="' + s.score + '">' + s.score + '</span></span></div></div>';
    if (deck[s.name]) html += '<div class="rcard-note">in deck ×' + deck[s.name] + '</div>';
    if (s.card.cost === 'X') {
      var xDmg = extractXCostDamage(s.card);
      if (xDmg > 0) html += '<div class="rcard-note">X dmg: ' + [3,4,5].map(function(e) { return e + '⚡ ' + (xDmg * e); }).join(' · ') + '</div>';
    }
    html += verdictChipsHtml(s);
    html += '<button type="button" class="rcard-take" onclick="rewardConfirm(\'' + safeN + '\')">Take ' + esc(s.name) + '</button>';
    html += '</div>';
  });
  html += '</div>';
  html += '<div class="reward-foot">' +
    '<button type="button" class="footer-btn ghost" onclick="rewardReset()">&#8635; reset</button>' +
    '<button type="button" class="footer-btn" onclick="rewardReset()">take nothing</button></div>';
  return html;
}

function rewardAddOffered(name) {
  if (!rewardOffered.includes(name)) rewardOffered.push(name);
  const si = document.getElementById('pickerSearch');
  si.value = '';
  renderRewardUnified(document.getElementById('pickerList'));
  si.focus();
}
function rewardRemoveOffered(name) {
  rewardOffered = rewardOffered.filter(n=>n!==name);
  renderRewardUnified(document.getElementById('pickerList'));
}
function rewardConfirm(name) { addCard(name); rewardReset(); }
function rewardReset() {
  rewardOffered=[];
  document.getElementById('pickerSearch').value='';
  renderPickerReward();
}

// --- ADD TAB ---
function renderPickerAdd() {
  const el = document.getElementById('pickerList');
  if (!currentChar) { el.innerHTML = '<div class="picker-empty">Select a character first.</div>'; return; }
  const q = (document.getElementById('pickerSearch').value || '').toLowerCase();
  const allCards = getAllCardsForPicker();
  const typeCls = t => {
    if (!t) return 'tag-skl';
    if (t.includes('atk')) return 'tag-atk';
    if (t.includes('def')) return 'tag-def';
    if (t.includes('vel')) return 'tag-vel';
    if (t.includes('pow')) return 'tag-pow';
    return 'tag-skl';
  };

  if (q) {
    const matches = allCards.filter(c => c.name.toLowerCase().includes(q)).slice(0, 8);
    if (!matches.length) { el.innerHTML = '<div class="picker-empty">No cards match.</div>'; return; }

    let html = '';
    matches.forEach(card => {
      const name = card.name;
      const alreadyInDeck = deck[name] || 0;
      const s = scoreCard(name);

      const t = card.type || 'skl';
      const tCls = t.startsWith('atk')?'tag-atk':t.startsWith('def')?'tag-def':t==='pow'?'tag-pow':t==='vel'?'tag-vel':'tag-skl';
      const typeTag = `<span class="deck-item-tag ${tCls}" style="font-size:9px;padding:1px 5px">${t.replace(/_/g,'·').toUpperCase()}</span>`;
      const crossTag = card.crossChar ? `<span style="font-family:var(--font-mono);font-size:10px;color:var(--text-muted);border:1px solid var(--border);border-radius:2px;padding:0 4px">${card.crossCharName}</span>` : '';
      const deckTag = alreadyInDeck > 0 ? `<span style="font-family:var(--font-mono);font-size:9px;color:var(--amber);padding:2px 5px;border:1px solid rgba(200,146,42,.3);border-radius:2px">in deck ×${alreadyInDeck}</span>` : '';
      const isUpgraded = name.endsWith('+');
      const nameStyle = isUpgraded ? 'color:var(--amber-bright); font-weight:600;' : 'color:var(--text)';
      const bg = s.verdict === 'skip' ? 'rgba(0,0,0,.35)' : s.vBg;

      html += `<div style="padding:7px 9px;border:1px solid ${s.vBorder};border-radius:3px;background:${bg};margin-bottom:4px">`;
      html += `<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-bottom:4px">`;
      html += `<span data-card="${name}" style="font-size:13px;${nameStyle}"><span class="cf-row-orb">${cardOrbHtml(card, true)}</span>${name}</span>`;
      html += typeTag + deckTag + crossTag;
      html += card.rarity ? rarityBadgeHtml(card.rarity) : '';
      html += `<span class="card-check-verdict" style="background:${s.vBg};color:${s.vColor};border:1px solid ${s.vBorder}">${s.vLabel} ${s.score}</span>`;
      html += `</div>`;

      // Inline card detail
      const finalCostStr = costText(card);
      const typeLabel = (t||'skl').replace(/_/g,'·').toUpperCase();
      const descHtml = formatCardDescription(card.description || '');
      if (descHtml) {
        html += `<div style="font-size:10px;color:var(--text-dim);line-height:1.35;margin-bottom:5px">${typeLabel}${finalCostStr?' · '+finalCostStr:''} — ${descHtml}</div>`;
      }

      // X-cost calculator in add tab
      if (card.cost === 'X') {
        var xDmg = extractXCostDamage(card);
        if (xDmg > 0) {
          html += '<div style="display:flex;gap:3px;margin-bottom:6px;flex-wrap:wrap;padding:3px 0">';
          html += '<span style="font-family:var(--font-mono);font-size:10px;color:var(--text-muted);letter-spacing:.06em;margin-right:3px">X dmg:</span>';
          [3,4,5,6].forEach(function(e) {
            html += '<span style="font-family:var(--font-mono);font-size:9px;padding:1px 5px;border-radius:2px;border:1px solid rgba(100,90,70,.2);color:' + (e===3?'var(--text-dim)':'var(--amber-bright)') + '">' + e + '⚡=' + (xDmg * e) + '</span>';
          });
          html += '</div>';
        }
      }

      html += verdictChipsHtml(s);

      if (card.note) html += `<div style="font-size:10px;color:var(--text-muted);margin-top:3px;opacity:.65">${card.note}</div>`;

      const safeN = name.replace(/'/g,"\\'");
      html += `<div style="margin-top:5px"><button onclick="pickerAddCard('${safeN}')" style="padding:3px 9px;border:1px solid var(--border-bright);border-radius:3px;background:none;color:var(--text-muted);font-family:var(--font-mono);font-size:9px;letter-spacing:.06em;text-transform:uppercase;cursor:pointer" onmouseover="this.style.borderColor='var(--amber)';this.style.color='var(--amber-bright)'" onmouseout="this.style.borderColor='var(--border-bright)';this.style.color='var(--text-muted)'">${alreadyInDeck > 0 ? '+ add another' : '+ add to deck'}</button></div>`;

      html += `</div>`;
    });

    el.innerHTML = html;
    return;
  }

  // No query: the best cards to add right now, from your own pool
  const top = allCards.filter(c => !c.crossChar && !c.name.endsWith('+'))
    .map(c => ({c: c, s: scoreCard(c.name)}))
    .filter(x => x.s.verdict !== 'skip')
    .sort((a, b) => b.s.raw - a.s.raw)
    .slice(0, 15);

  if (!top.length) { el.innerHTML='<div class="picker-empty">No strong picks right now — try searching.</div>'; return; }

  let html = '<div style="font-size:10px;color:var(--text-muted);font-style:italic;padding:2px 2px 6px">Best cards for your deck right now. Search a card name to check any card.</div>';
  [{key:'pick',label:'pick'},{key:'consider',label:'consider'}].forEach(g=>{
    const rows = top.filter(x => x.s.verdict === g.key);
    if (!rows.length) return;
    html += `<div class="picker-group-label">${g.label}</div>`;
    rows.forEach(x => { html += pickerRowHtmlAdd(x.c, x.s, typeCls); });
  });
  el.innerHTML = html;
}

function renderPickerList() {
  var el = document.getElementById('pickerList');
  var savedScroll = el ? el.scrollTop : 0;
  if (pickerTab === 'reward') { renderRewardUnified(el); }
  else renderPickerAdd();
  // Restore scroll position after re-render
  setTimeout(function() { if (el) el.scrollTop = savedScroll; }, 0);
}

function pickerRowHtmlAdd(c, s, typeCls) {
  const inDeck = deck[c.name] ? ` <span style="font-family:var(--font-mono);font-size:9px;color:var(--amber)">(×${deck[c.name]})</span>` : '';
  const rowCls = s.verdict==='pick'?' rec':' syn';
  const safeN = c.name.replace(/'/g,"\\'");
  const noteText = s.reasons.join(' · ');
  const finalCostStr = costText(c);
  const typeLabel = (c.type||'skl').replace(/_/g,'·').toUpperCase();
  const descHtml = formatCardDescription(c.description || '');
  const cardDetail = descHtml ? `<div style="font-size:10px;color:var(--text-dim);line-height:1.35;margin-top:1px">${typeLabel}${finalCostStr?' · '+finalCostStr:''} — ${descHtml}</div>` : '';
  return `<div class="picker-card-row${rowCls}" data-card="${c.name}" onclick="pickerAddCard('${safeN}')" style="grid-template-columns:1fr auto auto;gap:5px">
    <div style="min-width:0">
      <div class="picker-card-name"><span class="cf-row-orb">${cardOrbHtml(c, true)}</span>${c.name}${inDeck}</div>
      ${cardDetail}
      ${noteText ? `<div class="picker-card-note">${noteText}</div>` : ''}
    </div>
    <span class="deck-item-tag ${typeCls(c.type)}" style="font-size:9px;padding:1px 5px;white-space:nowrap">${(c.type||'skl').replace(/_/g,'·').toUpperCase()}</span>
    ${verdictBadgeHtml(s)}
  </div>`;
}

// Compact "PICK 78" badge for search rows.
function verdictBadgeHtml(s) {
  if (!s) return '';
  return '<span style="font-size:10px;padding:1px 6px;border-radius:2px;border:1px solid '+s.vBorder+';color:'+s.vColor+';background:'+s.vBg+';font-weight:600;white-space:nowrap">'+s.vLabel+' '+s.score+'</span>';
}

// Up to 3 "why" chips under a verdict.
function verdictChipsHtml(s) {
  if (!s || !s.chips.length) return '';
  var tones = {pos: 'var(--green-bright)', neg: '#c06060', neutral: 'var(--text-dim)'};
  var html = '<div style="display:flex;flex-wrap:wrap;gap:3px;margin-bottom:5px">';
  s.chips.forEach(function(c) {
    var col = tones[c.tone] || tones.neutral;
    html += '<span style="font-size:9px;padding:1px 6px;border-radius:2px;border:1px solid rgba(100,90,70,.3);color:'+col+';background:rgba(0,0,0,.25)">'+c.text+'</span>';
  });
  return html + '</div>';
}

function pickerAddCard(name) { addCard(name); }

function extractXCostDamage(card) {
  if (!card) return 0;
  var text = (card.description || '') + ' ' + (card.note || '');
  var dmg = 0;
  var m1 = text.match(/Deal\s+(\d+)\s+damage\s+X\s+times/i);
  if (m1) dmg = parseInt(m1[1], 10);
  var m2 = text.match(/^(\d+)\s+(?:AoE\s+)?dmg/i);
  if (m2 && !dmg) dmg = parseInt(m2[1], 10);
  var m3 = text.match(/(\d+)\s+(?:AoE\s+)?dmg\s+X\s*times/i);
  if (m3 && !dmg) dmg = parseInt(m3[1], 10);
  return dmg;
}