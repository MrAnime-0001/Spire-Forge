// Inline card picker (reward tab + add tab) for STS2 Build Advisor.

let pickerTab = 'reward';
let rewardOffered = [];
let rewardStage = 'select'; // 'select' | 'verdict'

function showInlinePicker() {
  document.getElementById('inlinePicker').style.display = 'block';
  renderPickerReward();
}

function switchPickerTab(tab) {
  pickerTab = tab;
  document.getElementById('ptab-reward').classList.toggle('active', tab === 'reward');
  document.getElementById('ptab-add').classList.toggle('active', tab === 'add');
  document.getElementById('pickerSearch').value = '';
  document.getElementById('pickerSearch').placeholder = tab === 'reward' ? 'Search cards being offered...' : 'Search to see build details, or browse below...';
  if (tab === 'reward') {
    rewardOffered = []; rewardStage = 'select';
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
    html += '<div style="font-family:Share Tech Mono,monospace;font-size:9px;color:var(--text-muted);letter-spacing:.12em;text-transform:uppercase;margin-bottom:5px">pool \u2014 click to remove</div>';
    html += '<div style="display:flex;flex-wrap:wrap;gap:4px">';
    rewardOffered.forEach(function(n) {
      const c = allCards.find(function(x){return x.name===n;});
      const t = c ? c.type : 'skl';
      const safeNR = n.replace(/'/g,"\\'");
      html += '<span data-card="'+n+'" onclick="rewardRemoveOffered(\''+safeNR+'\')" style="display:inline-flex;align-items:center;gap:4px;padding:3px 8px;border:1px solid var(--border-bright);border-radius:3px;background:var(--surface2);font-size:12px;cursor:pointer;color:var(--text)">';
      html += '<span class="deck-item-tag '+typeCls(t)+'" style="font-size:8px;padding:1px 4px">'+t.replace(/_/g,'·').toUpperCase()+'</span>';
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
        const crossLabel = c.crossChar ? ' <span style="font-size:8px;color:var(--text-muted);border:1px solid var(--border);border-radius:2px;padding:0 4px">'+c.crossCharName+'</span>' : '';
        const costStr = c.cost !== undefined ? (c.cost === 'X' ? 'X' : '⚡'.repeat(Number(c.cost))) : '';
  const finalCostStr = (currentChar === 'regent' && c.starCost) ? costStr + '✦'.repeat(c.starCost) : costStr;
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
    if (axes.Defense < targets.Defense && total > 6) deckStateChips.push({t:'low defense', c:'#6aacda'});
    if (axes.Attack < targets.Attack && total > 6) deckStateChips.push({t:'low attack', c:'#c06060'});
    if (axes.Efficiency < targets.Efficiency && total > 6) deckStateChips.push({t:'low efficiency', c:'var(--amber)'});
    if (axes.Scaling < targets.Scaling && total > 8) deckStateChips.push({t:'low scaling', c:'#9a6aba'});
    if (axes.Consistency < targets.Consistency && total > 10) deckStateChips.push({t:'low consistency', c:'var(--teal-bright)'});
    if (axes.Synergy < targets.Synergy && total > 15) deckStateChips.push({t:'low synergy', c:'var(--amber-bright)'});
  }
  var atkDefPool = Math.max(1, db.atkDraw + db.defDraw);
  var rAtk = Math.round(db.atkDraw / atkDefPool * 100);
  if (rAtk > 65 && total > 7) deckStateChips.push({t:'atk-heavy draws', c:'#c06060'});
  if (rAtk < 35 && total > 7) deckStateChips.push({t:'def-heavy draws', c:'#6aacda'});

  var bossCtx = selectedBoss ? ' · vs '+selectedBoss : '';
  var html = '<div style="font-size:9px;color:var(--amber);letter-spacing:.1em;text-transform:uppercase;padding:4px 2px 6px;border-bottom:1px solid var(--border);margin-bottom:6px">card reward — all builds considered'+bossCtx+'</div>';
  var szp = getDeckSizeProfile();
  var szChipColor = szp.zone==='sweet' ? 'var(--green-bright)' : szp.zone==='danger' ? '#c06060' : 'var(--amber)';
  var szChipIcon = szp.zone==='sweet' ? '\u2714' : '\u26A0';
  deckStateChips.unshift({t: szChipIcon+' '+szp.total+' cards ('+szp.label+')', c: szChipColor});
  if (deckStateChips.length > 0) {
    html += '<div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:8px">';
    deckStateChips.forEach(function(chip) {
      html += '<span style="font-size:9px;padding:2px 7px;border-radius:3px;border:1px solid '+chip.c+'50;background:'+chip.c+'15;color:'+chip.c+'">\u26A0 '+chip.t+'</span>';
    });
    html += '</div>';
  }

  if (allSkip) {
    html += '<div style="padding:.75rem;border:1px solid rgba(200,146,42,.25);border-radius:4px;background:rgba(200,146,42,.07);margin-bottom:8px">';
    html += '<div style="font-size:9px;color:var(--amber);letter-spacing:.1em;margin-bottom:4px">SKIP RECOMMENDED</div>';
    html += '<div style="font-size:12px;color:var(--text-dim)">None of these make your deck stronger. Taking a weak card means drawing your good cards less often.</div></div>';
  }

  scored.forEach(function(s, i) {
    var isBest = i===0 && !allSkip;
    var outerBorder = isBest ? (s.verdict==='pick'?'rgba(106,172,95,.5)':'rgba(200,146,42,.4)') : 'rgba(100,90,70,.15)';
    var outerBg = isBest ? (s.verdict==='pick'?'rgba(74,124,63,.1)':'rgba(200,146,42,.07)') : 'rgba(0,0,0,.45)';
    var borderW = isBest ? '1.5px' : '1px';
    var typeTag = (s.card.type||'skl').replace(/_/g,'·').toUpperCase();

    var isUpgraded = s.name.endsWith('+');
    var nameStyle = isUpgraded ? 'color:var(--amber-bright); font-weight:600;' : 'color:'+(isBest?'var(--text)':'var(--text-dim)');
    html += '<div style="padding:9px 10px;border:'+borderW+' solid '+outerBorder+';border-radius:4px;background:'+outerBg+';margin-bottom:6px">';

    var sRarity = getRarity(s.card);
    html += '<div style="display:flex;align-items:center;gap:7px;margin-bottom:6px;flex-wrap:wrap">';
    html += '<span data-card="'+s.name+'" style="font-size:14px;'+nameStyle+'"><span class="cf-row-orb">'+cardOrbHtml(s.card, true)+'</span>'+s.name+'</span>';
    html += '<span class="deck-item-tag '+typeCls(s.card.type)+'" style="font-size:9px;padding:1px 5px">'+typeTag+'</span>';
    html += rarityBadgeHtml(sRarity);
    if (deck[s.name]) html += '<span style="font-family:\'Share Tech Mono\',monospace;font-size:9px;color:var(--amber);padding:2px 5px;border:1px solid rgba(200,146,42,.3);border-radius:2px">in deck ×'+deck[s.name]+'</span>';
    html += '<span style="font-size:9px;padding:3px 8px;border-radius:2px;background:'+s.vBg+';color:'+s.vColor+';border:1px solid '+s.vBorder+';margin-left:auto">'+s.vLabel+' '+s.score+'</span>';
    html += '</div>';

    var rCtx = rarityContext(sRarity, s.verdict);
    if (rCtx) html += '<div style="font-size:10px;color:var(--text-muted);margin-bottom:4px;opacity:.8">'+rCtx+'</div>';

    // Inline card detail
    var costStr = '';
    if(currentChar === 'regent') {
      var starCost = s.card.starCost || 0;
      var enCost = s.card.cost !== undefined ? s.card.cost : 0;
      costStr = (enCost === 'X' ? 'X' : (Number(enCost) > 0 ? '⚡'.repeat(Number(enCost)) : '')) +
                (starCost > 0 ? '✦'.repeat(starCost) : '');
      if(costStr === '' && enCost === 0) costStr = '0';
    } else {
      costStr = s.card.cost !== undefined ? (s.card.cost === 'X' ? 'X' : '⚡'.repeat(Number(s.card.cost))) : '';
    }
    var typeLabel = (s.card.type||'skl').replace(/_/g,'·').toUpperCase();
    var descHtml = formatCardDescription(s.card.description || '');
    html += '<div style="font-size:10px;color:var(--text-dim);line-height:1.35;margin-bottom:6px">'+typeLabel+(costStr?' · '+costStr:'')+(descHtml?' — '+descHtml:'')+'</div>';

    // X-cost card calculator
    if (s.card.cost === 'X') {
      var xDmg = extractXCostDamage(s.card);
      if (xDmg > 0) {
        var energies = [3,4,5,6];
        html += '<div style="display:flex;gap:3px;margin-bottom:6px;flex-wrap:wrap;padding:3px 0">';
        html += '<span style="font-family:\'Share Tech Mono\',monospace;font-size:8px;color:var(--text-muted);letter-spacing:.06em;margin-right:3px">X dmg:</span>';
        energies.forEach(function(e) {
          html += '<span style="font-family:\'Share Tech Mono\',monospace;font-size:9px;padding:1px 5px;border-radius:2px;border:1px solid rgba(100,90,70,.2);color:' + (e === 3 ? 'var(--text-dim)' : 'var(--amber-bright)') + '">' + e + '⚡=' + (xDmg * e) + '</span>';
        });
        html += '</div>';
      }
    }

    html += verdictChipsHtml(s);

    if (s.card.note) {
      html += '<div style="font-size:10px;color:var(--text-muted);margin-top:3px;opacity:.65">'+s.card.note+'</div>';
    }


    html += '</div>';
  });

  html += '<div style="display:flex;gap:5px;flex-wrap:wrap;margin-top:8px;padding-top:6px;border-top:1px solid var(--border)">';
  html += '<button onclick="rewardReset()" style="padding:6px 10px;border:1px solid var(--border-bright);border-radius:3px;background:none;color:var(--text-muted);font-size:9px;text-transform:uppercase;cursor:pointer">&#8635; reset</button>';
  scored.filter(function(s){return s.verdict!=='skip';}).forEach(function(s) {
    var safeN = s.name.replace(/'/g,"\\'");
    html += '<button onclick="rewardConfirm(\''+safeN+'\')" style="padding:6px 10px;border:1px solid '+s.vBorder+';border-radius:3px;background:'+s.vBg+';color:'+s.vColor+';font-size:9px;text-transform:uppercase;cursor:pointer">took '+s.name+'</button>';
  });
  html += '<button onclick="rewardReset()" style="padding:6px 10px;border:1px solid var(--border);border-radius:3px;background:none;color:var(--text-muted);font-size:9px;text-transform:uppercase;cursor:pointer">took nothing</button>';
  html += '</div>';
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
function rewardProceed() {
  if (!rewardOffered.length) return;
  rewardStage = 'verdict';
  document.getElementById('pickerSearch').value = '';
  renderPickerReward();
}
function rewardBack() {
  rewardStage = 'select';
  document.getElementById('pickerSearch').value = '';
  renderPickerReward();
}
function rewardConfirm(name) { addCard(name); rewardReset(); }
function rewardReset() {
  rewardOffered=[]; rewardStage='select';
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
      const crossTag = card.crossChar ? `<span style="font-family:'Share Tech Mono',monospace;font-size:8px;color:var(--text-muted);border:1px solid var(--border);border-radius:2px;padding:0 4px">${card.crossCharName}</span>` : '';
      const deckTag = alreadyInDeck > 0 ? `<span style="font-family:'Share Tech Mono',monospace;font-size:9px;color:var(--amber);padding:2px 5px;border:1px solid rgba(200,146,42,.3);border-radius:2px">in deck ×${alreadyInDeck}</span>` : '';
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
      var costStr = '';
      if(currentChar === 'regent') {
        var starCost = card.starCost || 0;
        var enCost = card.cost !== undefined ? card.cost : 0;
        costStr = (enCost === 'X' ? 'X' : (Number(enCost) > 0 ? '⚡'.repeat(Number(enCost)) : '')) +
                  (starCost > 0 ? '✦'.repeat(starCost) : '');
        if(costStr === '' && enCost === 0) costStr = '0';
      } else {
        costStr = card.cost !== undefined ? (card.cost === 'X' ? 'X' : '⚡'.repeat(Number(card.cost))) : '';
      }
      const finalCostStr = (currentChar === 'regent' && card.starCost) ? costStr + '✦'.repeat(card.starCost) : costStr;
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
          html += '<span style="font-family:\'Share Tech Mono\',monospace;font-size:8px;color:var(--text-muted);letter-spacing:.06em;margin-right:3px">X dmg:</span>';
          [3,4,5,6].forEach(function(e) {
            html += '<span style="font-family:\'Share Tech Mono\',monospace;font-size:9px;padding:1px 5px;border-radius:2px;border:1px solid rgba(100,90,70,.2);color:' + (e===3?'var(--text-dim)':'var(--amber-bright)') + '">' + e + '⚡=' + (xDmg * e) + '</span>';
          });
          html += '</div>';
        }
      }

      html += verdictChipsHtml(s);

      if (card.note) html += `<div style="font-size:10px;color:var(--text-muted);margin-top:3px;opacity:.65">${card.note}</div>`;

      const safeN = name.replace(/'/g,"\\'");
      html += `<div style="margin-top:5px"><button onclick="pickerAddCard('${safeN}')" style="padding:3px 9px;border:1px solid var(--border-bright);border-radius:3px;background:none;color:var(--text-muted);font-family:'Share Tech Mono',monospace;font-size:9px;letter-spacing:.06em;text-transform:uppercase;cursor:pointer" onmouseover="this.style.borderColor='var(--amber)';this.style.color='var(--amber-bright)'" onmouseout="this.style.borderColor='var(--border-bright)';this.style.color='var(--text-muted)'">${alreadyInDeck > 0 ? '+ add another' : '+ add to deck'}</button></div>`;

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
  const inDeck = deck[c.name] ? ` <span style="font-family:'Share Tech Mono',monospace;font-size:9px;color:var(--amber)">(×${deck[c.name]})</span>` : '';
  const rowCls = s.verdict==='pick'?' rec':' syn';
  const safeN = c.name.replace(/'/g,"\\'");
  const noteText = s.reasons.join(' · ');
  const costStr = c.cost !== undefined ? (c.cost === 'X' ? 'X' : '⚡'.repeat(Number(c.cost))) : '';
  const finalCostStr = (currentChar === 'regent' && c.starCost) ? costStr + '✦'.repeat(c.starCost) : costStr;
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
  return '<span style="font-size:8px;padding:1px 6px;border-radius:2px;border:1px solid '+s.vBorder+';color:'+s.vColor+';background:'+s.vBg+';font-weight:600;white-space:nowrap">'+s.vLabel+' '+s.score+'</span>';
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

function pickerAddCard(name) { addCard(name); renderPickerAdd(); }

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