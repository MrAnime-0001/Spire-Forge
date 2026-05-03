// Inline card picker (reward tab + add tab) for STS2 Build Advisor.

let pickerTab = 'reward';
let rewardOffered = [];
let rewardBuildKey = null;
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
    rewardOffered = []; rewardBuildKey = null; rewardStage = 'select';
    renderPickerReward();
  } else {
    renderPickerAdd();
  }
  document.getElementById('pickerSearch').focus();
}

// --- REWARD TAB ---
function renderPickerReward() {
  const list = document.getElementById('pickerList');
  renderRewardUnified(list);
}

function renderRewardUnified(el) {
  const q = (document.getElementById('pickerSearch').value || '').toLowerCase();
  const allCards = getAllCardsForPicker();
  const typeCls = t => t&&t.startsWith('atk')?'tag-atk':t&&t.startsWith('def')?'tag-def':t==='pow'?'tag-pow':t==='vel'?'tag-vel':t==='other'?'tag-other':'tag-skl';
  let html = '';

  // Pool chips (always visible at top)
  if (rewardOffered.length > 0) {
    html += '<div style="padding:5px 2px 7px;border-bottom:1px solid var(--border);margin-bottom:6px">';
    html += '<div style="font-family:Share Tech Mono,monospace;font-size:9px;color:var(--text-muted);letter-spacing:.12em;text-transform:uppercase;margin-bottom:5px">pool \u2014 click to remove</div>';
    html += '<div style="display:flex;flex-wrap:wrap;gap:4px">';
    rewardOffered.forEach(function(n) {
      const c = allCards.find(function(x){return x.name===n;});
      const t = c ? c.type : 'skl';
      const safeNR = n.replace(/'/g,"&#39;");
      html += '<span onclick="rewardRemoveOffered(&#39;'+safeNR+'&#39;)" style="display:inline-flex;align-items:center;gap:4px;padding:3px 8px;border:1px solid var(--border-bright);border-radius:3px;background:var(--surface2);font-size:12px;cursor:pointer;color:var(--text)">';
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
        const safeN = c.name.replace(/'/g,"&#39;");
        const clickFn = already ? 'rewardRemoveOffered(&#39;'+safeN+'&#39;)' : 'rewardAddOffered(&#39;'+safeN+'&#39;)';
        const borderCol = already ? 'var(--amber)' : (c.crossChar ? 'rgba(100,90,70,.3)' : 'var(--border)');
        const bgCol = already ? 'var(--amber-dim)' : 'var(--bg2)';
        const nameCol = already ? 'var(--amber-bright)' : (c.crossChar ? 'var(--text-dim)' : 'var(--text)');
        const addCol = already ? 'var(--amber)' : 'var(--green-bright)';
        const addLbl = already ? '&#10003; added' : '+ add';
        const crossLabel = c.crossChar ? ' <span style="font-size:8px;color:var(--text-muted);border:1px solid var(--border);border-radius:2px;padding:0 4px">'+c.crossCharName+'</span>' : '';
        const noteHtml = c.note ? '<div style="font-size:10px;color:var(--text-muted);font-style:italic;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+c.note+'</div>' : '';
        html += '<div onclick="'+clickFn+'" style="display:grid;grid-template-columns:1fr auto auto auto;align-items:center;gap:7px;padding:6px 8px;border:1px solid '+borderCol+';border-radius:3px;margin-bottom:3px;background:'+bgCol+';cursor:pointer">';
        html += '<div><div style="font-size:13px;color:'+nameCol+'">'+c.name+crossLabel+'</div>'+noteHtml+'</div>';
        html += '<span class="deck-item-tag '+typeCls(c.type)+'" style="font-size:9px;padding:1px 5px">'+(c.type||'skl').replace(/_/g,'·').toUpperCase()+'</span>';
        html += rarityBadgeHtml(getRarity(c));
        html += '<span style="font-size:9px;color:'+addCol+';min-width:40px;text-align:right">'+addLbl+'</span>';
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
  if (!currentChar || !BUILD_DATA[currentChar]) return '';
  var builds = (BUILD_DATA[currentChar] || {}).builds || {};
  var total = getDeckSize();
  var typeCls = function(t){return t&&t.startsWith('atk')?'tag-atk':t&&t.startsWith('def')?'tag-def':t==='pow'?'tag-pow':t==='vel'?'tag-vel':t==='other'?'tag-other':'tag-skl';};

  var scored = scoreRewardPool(rewardOffered);

  var allSkip = currentAct===3 && scored.every(function(s){return s.verdict==='skip';});

  var axes = calcFourAxes();
  var db = getDrawBalance();
  var deckStateChips = [];
  if (axes) {
    if (axes.blk < 25 && total > 6) deckStateChips.push({t:'low block', c:'#6aacda'});
    if (axes.dmg < 25 && total > 6) deckStateChips.push({t:'low damage', c:'#c06060'});
    if (axes.vel < 20 && total > 6) deckStateChips.push({t:'low velocity', c:'var(--amber)'});
    if (axes.scl < 20 && total > 8) deckStateChips.push({t:'low scaling', c:'#9a6aba'});
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
    html += '<div style="font-size:9px;color:var(--amber);letter-spacing:.1em;margin-bottom:4px">ACT 3 — SKIP RECOMMENDED</div>';
    html += '<div style="font-size:12px;color:var(--text-dim)">None of these fit your core build. Adding off-build cards now increases bad draw risk.</div></div>';
  }

  scored.forEach(function(s, i) {
    var isBest = i===0 && !allSkip;
    var outerBorder = isBest ? (s.verdict==='pick'?'rgba(106,172,95,.5)':'rgba(200,146,42,.4)') : 'var(--border)';
    var outerBg = isBest ? (s.verdict==='pick'?'rgba(74,124,63,.1)':'rgba(200,146,42,.07)') : 'var(--bg2)';
    var borderW = isBest ? '1.5px' : '1px';
    var typeTag = (s.card.type||'skl').replace(/_/g,'·').toUpperCase();

    html += '<div style="padding:9px 10px;border:'+borderW+' solid '+outerBorder+';border-radius:4px;background:'+outerBg+';margin-bottom:6px">';

    var sRarity = getRarity(s.card);
    html += '<div style="display:flex;align-items:center;gap:7px;margin-bottom:6px;flex-wrap:wrap">';
    html += '<span style="font-size:14px;color:'+(isBest?'var(--text)':'var(--text-dim)')+'">'+s.name+'</span>';
    html += tierBadgeHtml(s.name);
    html += '<span class="deck-item-tag '+typeCls(s.card.type)+'" style="font-size:9px;padding:1px 5px">'+typeTag+'</span>';
    html += rarityBadgeHtml(sRarity);
    if (s.isSafePick) html += '<span style="font-size:8px;padding:1px 6px;border-radius:2px;border:1px solid var(--amber-dim);color:var(--amber);background:rgba(200,146,42,.1)">safe pick</span>';
    if (s.isSafeEarly && total < 12) html += '<span style="font-size:8px;padding:1px 6px;border-radius:2px;border:1px solid rgba(200,120,40,.4);color:#c88040;background:rgba(200,120,40,.1)">early value</span>';
    if (deck[s.name]) html += '<span style="font-family:\'Share Tech Mono\',monospace;font-size:9px;color:var(--amber);padding:2px 5px;border:1px solid rgba(200,146,42,.3);border-radius:2px">in deck ×'+deck[s.name]+'</span>';
    html += '<span style="font-size:9px;padding:3px 8px;border-radius:2px;margin-left:auto;background:'+s.vBg+';color:'+s.vColor+';border:1px solid '+s.vBorder+'">'+s.vLabel+'</span>';
    html += '</div>';

    var rCtx = rarityContext(sRarity, s.verdict);
    if (rCtx) html += '<div style="font-size:10px;color:var(--text-muted);margin-bottom:4px;opacity:.8">'+rCtx+'</div>';

    var tierNote = getCardTierNote(s.name);
    if (tierNote) {
      var tierInfo = getCardTier(s.name);
      var tierColor = {S:'#e8b84b',A:'#6aac5f',B:'#6aacda',C:'#a090b0',D:'#c06060'}[tierInfo.tier] || 'var(--text-muted)';
      html += '<div style="font-size:11px;color:'+tierColor+';margin-bottom:5px;font-style:italic;opacity:.9">'+tierInfo.tier+'-tier: '+tierNote+'</div>';
    }

    var hasIndicators = s.tipsBuilds.length>0 || s.priorityBuilds.length>0 || s.synergyBuilds.length>0 || s.fitsBuilds.length>0;
    if (hasIndicators) {
      html += '<div style="display:flex;flex-wrap:wrap;gap:3px;margin-bottom:5px">';
      var tipsShown = new Set();
      s.tipsBuilds.forEach(function(entry){
        tipsShown.add(entry.key);
        var tier = entry.b.rank ? ' '+entry.b.rank : '';
        html += '<span style="font-size:8px;padding:1px 6px;border-radius:2px;border:1px solid '+entry.b.color+'80;color:'+entry.b.color+';background:'+entry.b.color+'25;font-weight:600">\u2605 '+entry.b.name+tier+'</span>';
      });
      s.priorityBuilds.forEach(function(entry){
        if (tipsShown.has(entry.key)) return;
        html += '<span style="font-size:8px;padding:1px 6px;border-radius:2px;border:1px solid '+entry.b.color+'60;color:'+entry.b.color+';background:'+entry.b.color+'18">\u2B06 '+entry.b.name+'</span>';
      });
      s.fitsBuilds.forEach(function(entry){
        if (tipsShown.has(entry.key)) return;
        html += '<span style="font-size:8px;padding:1px 6px;border-radius:2px;border:1px solid '+entry.b.color+'35;color:'+entry.b.color+'bb;background:'+entry.b.color+'0d">\u25CF '+entry.b.name+'</span>';
      });
      s.synergyBuilds.forEach(function(entry){
        if (tipsShown.has(entry.key)) return;
        html += '<span style="font-size:8px;padding:1px 6px;border-radius:2px;border:1px solid '+entry.b.color+'25;color:'+entry.b.color+'80;background:none">~ '+entry.b.name+'</span>';
      });
      html += '</div>';
    }

    var _activePairs = s.activePairs || [];
    if (_activePairs.length > 0) {
      html += '<div style="margin-bottom:5px">';
      html += '<div style="font-family:\'Share Tech Mono\',monospace;font-size:8px;color:var(--purple-bright);letter-spacing:.1em;text-transform:uppercase;margin-bottom:3px;opacity:.9">synergy pairs</div>';
      _activePairs.slice(0, 3).forEach(function(p) {
        var bondColor = p.bond==='Enable'?'#4a9a8a': p.bond==='Finisher'?'#c04040': p.bond==='Loop'?'#9a6aba':'#6aac5f';
        html += '<div style="font-size:11px;margin-bottom:3px;padding:3px 7px;border-left:2px solid '+bondColor+'40;background:'+bondColor+'08">';
        html += '<span style="color:'+bondColor+';font-family:\'Share Tech Mono\',monospace;font-size:8px">'+p.bond+'</span>';
        html += ' <span style="color:var(--text)">'+p.partner+'</span>';
        html += ' <span style="color:var(--text-muted);font-style:italic;font-size:10px">\u2014 '+p.note.substring(0,80)+(p.note.length>80?'...':'')+'</span>';
        html += '</div>';
      });
      html += '</div>';
    }

    var engineMatches = s.engineMatches || [];
    if (engineMatches.length > 0) {
      html += '<div style="margin-bottom:5px">';
      engineMatches.forEach(function(e) {
        html += '<div style="font-size:11px;margin-bottom:2px">';
        html += '<span style="color:'+e.buildColor+';font-family:\'Cinzel\',serif;font-size:11px">'+e.buildName+'</span>';
        html += ' <span style="color:var(--text-muted)">engine — '+e.label+'</span>';
        html += ' <span style="font-family:\'Share Tech Mono\',monospace;font-size:9px;color:var(--teal-bright)">('+e.have+'/'+e.total+' in deck)</span>';
        html += '</div>';
      });
      html += '</div>';
    }

    if (s.reasons.length > 0) {
      html += '<div style="font-size:11px;color:var(--text-muted);font-style:italic;line-height:1.55">'+s.reasons.join(' · ')+'</div>';
    }

    if (s.card.note) {
      html += '<div style="font-size:10px;color:var(--text-muted);margin-top:3px;opacity:.65">'+s.card.note+'</div>';
    }

    if (s.eradicateEstimate) {
      var era = s.eradicateEstimate;
      if (era) {
        var eraHtml = '<div style="margin-top:5px;padding:5px 8px;border:1px solid rgba(74,154,138,.35);border-radius:3px;background:rgba(74,154,138,.07)">';
        eraHtml += '<div style="font-family:Share Tech Mono,monospace;font-size:9px;color:var(--teal-bright);letter-spacing:.1em;text-transform:uppercase;margin-bottom:3px">eradicate nuke turn</div>';
        eraHtml += '<div style="font-size:11px;color:var(--text-dim)">';
        eraHtml += era.energy + ' energy available &rarr; <strong style="color:var(--text)">' + era.base + ' base damage</strong>';
        if (era.hasLethality || era.hasDebilitate) {
          eraHtml += ' &rarr; <strong style="color:var(--amber-bright)">' + era.withMultipliers + ' with multipliers</strong>';
          if (era.hasLethality) eraHtml += ' (Lethality ×1.5)';
          if (era.hasDebilitate) eraHtml += ' (Debilitate ×1.5)';
        }
        eraHtml += '</div></div>';
        html += eraHtml;
      }
    }

    html += '</div>';
  });

  html += '<div style="display:flex;gap:5px;flex-wrap:wrap;margin-top:8px;padding-top:6px;border-top:1px solid var(--border)">';
  html += '<button onclick="rewardReset()" style="padding:6px 10px;border:1px solid var(--border-bright);border-radius:3px;background:none;color:var(--text-muted);font-size:9px;text-transform:uppercase;cursor:pointer">&#8635; reset</button>';
  scored.filter(function(s){return s.verdict!=='skip';}).forEach(function(s) {
    var safeN = s.name.replace(/'/g,"&#39;");
    html += '<button onclick="rewardConfirm(&#39;'+safeN+'&#39;)" style="padding:6px 10px;border:1px solid '+s.vBorder+';border-radius:3px;background:'+s.vBg+';color:'+s.vColor+';font-size:9px;text-transform:uppercase;cursor:pointer">took '+s.name+'</button>';
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
  rewardBuildKey = getTopBuild();
  rewardStage = 'verdict';
  document.getElementById('pickerSearch').value = '';
  renderPickerReward();
}
function rewardSelectBuild(key) { rewardBuildKey = key; }
function rewardShowVerdict() { if (!rewardBuildKey) return; rewardStage = 'verdict'; renderPickerReward(); }
function rewardBack() {
  rewardStage = 'select';
  document.getElementById('pickerSearch').value = '';
  renderPickerReward();
}
function rewardConfirm(name) { addCard(name); rewardReset(); }
function rewardReset() {
  rewardOffered=[]; rewardBuildKey=null; rewardStage='select';
  document.getElementById('pickerSearch').value='';
  renderPickerReward();
}

// --- ADD TAB ---
function renderPickerAdd() {
  const el = document.getElementById('pickerList');
  if (!currentChar) { el.innerHTML = '<div class="picker-empty">Select a character first.</div>'; return; }
  const q = (document.getElementById('pickerSearch').value || '').toLowerCase();
  const allCards = getAllCardsForPicker();
  const builds = (BUILD_DATA[currentChar] || {}).builds || {};
  const engines = BUILD_ENGINES[currentChar] || {};
  const spData = SAFE_PICKS[currentChar] || { early: [], generic: [] };
  const topBuildKey = getTopBuild();
  const topBuild = topBuildKey ? builds[topBuildKey] : null;
  const stats = getDeckStats();
  const typeCls = t => t&&t.startsWith('atk')?'tag-atk':t&&t.startsWith('def')?'tag-def':t==='pow'?'tag-pow':t==='vel'?'tag-vel':t==='other'?'tag-other':'tag-skl';

  if (q) {
    const matches = allCards.filter(c => c.name.toLowerCase().includes(q)).slice(0, 8);
    if (!matches.length) { el.innerHTML = '<div class="picker-empty">No cards match.</div>'; return; }

    let html = '';
    matches.forEach(card => {
      const name = card.name;
      const alreadyInDeck = deck[name] || 0;

      const engineMatches = [];
      Object.entries(engines).forEach(([buildKey, engData]) => {
        if (engData.cards.includes(name)) {
          const build = builds[buildKey];
          const haveCount = engData.cards.filter(n => deck[n]).length;
          engineMatches.push({ buildName: build ? build.name : buildKey, buildColor: build ? build.color : 'var(--teal-bright)', label: engData.label, have: haveCount, total: engData.cards.length });
        }
      });

      const priorityMatches = [];
      Object.entries(builds).forEach(([buildKey, build]) => {
        if ((build.recs || []).includes(name) || (build.cards || []).includes(name)) {
          if (!engineMatches.find(e => e.buildName === (builds[buildKey] ? builds[buildKey].name : buildKey))) {
            priorityMatches.push({ buildName: build.name, buildColor: build.color, rank: build.rank });
          }
        }
      });

      const isSafeEarly = spData.early.includes(name);
      const isSafeGeneric = spData.generic.includes(name);
      const isSafe = isSafeEarly || isSafeGeneric;

      let borderColor, bgColor, verdictLabel, verdictStyle;
      if (engineMatches.length > 0) {
        borderColor = 'rgba(74,154,138,.5)'; bgColor = 'rgba(74,154,138,.08)';
        verdictLabel = 'ENGINE PIECE';
        verdictStyle = 'background:rgba(74,154,138,.2);color:var(--teal-bright);border:1px solid rgba(74,154,138,.4)';
      } else if (priorityMatches.length > 0) {
        borderColor = 'rgba(106,172,95,.45)'; bgColor = 'rgba(74,124,63,.08)';
        verdictLabel = 'PRIORITY';
        verdictStyle = 'background:rgba(74,124,63,.2);color:var(--green-bright);border:1px solid rgba(106,172,95,.35)';
      } else if (isSafe) {
        borderColor = 'rgba(200,146,42,.35)'; bgColor = 'rgba(200,146,42,.06)';
        verdictLabel = isSafeEarly ? 'SAFE — TAKE EARLY' : 'SAFE PICK';
        verdictStyle = 'background:rgba(200,146,42,.15);color:var(--amber-bright);border:1px solid rgba(200,146,42,.3)';
      } else {
        borderColor = 'var(--border)'; bgColor = 'var(--bg2)';
        verdictLabel = 'NOT A PRIORITY';
        verdictStyle = 'background:rgba(100,90,70,.15);color:var(--text-muted);border:1px solid var(--border)';
      }

      const t = card.type || 'skl';
      const tCls = t.startsWith('atk')?'tag-atk':t.startsWith('def')?'tag-def':t==='pow'?'tag-pow':t==='vel'?'tag-vel':'tag-skl';
      const typeTag = `<span class="deck-item-tag ${tCls}" style="font-size:9px;padding:1px 5px">${t.replace(/_/g,'·').toUpperCase()}</span>`;
      const crossTag = card.crossChar ? `<span style="font-family:'Share Tech Mono',monospace;font-size:8px;color:var(--text-muted);border:1px solid var(--border);border-radius:2px;padding:0 4px">${card.crossCharName}</span>` : '';
      const deckTag = alreadyInDeck > 0 ? `<span style="font-family:'Share Tech Mono',monospace;font-size:9px;color:var(--amber);padding:2px 5px;border:1px solid rgba(200,146,42,.3);border-radius:2px">in deck ×${alreadyInDeck}</span>` : '';

      html += `<div style="padding:7px 9px;border:1px solid ${borderColor};border-radius:3px;background:${bgColor};margin-bottom:4px">`;
      html += `<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-bottom:4px">`;
      html += `<span style="font-size:13px;color:var(--text)">${name}</span>`;
      html += tierBadgeHtml(name);
      html += typeTag + deckTag + crossTag;
      html += card.rarity ? rarityBadgeHtml(card.rarity) : '';
      html += `<span class="card-check-verdict" style="${verdictStyle}">${verdictLabel}</span>`;
      html += `</div>`;

      const tierNote = getCardTierNote(name);
      if (tierNote) {
        const tierInfo = getCardTier(name);
        const tierColor = {S:'#e8b84b',A:'#6aac5f',B:'#6aacda',C:'#a090b0',D:'#c06060'}[tierInfo.tier] || 'var(--text-muted)';
        html += `<div style="font-size:11px;color:${tierColor};margin-bottom:4px;font-style:italic;opacity:.9">${tierInfo.tier}-tier: ${tierNote}</div>`;
      }

      if (engineMatches.length > 0) {
        engineMatches.forEach(e => {
          html += `<div style="font-size:11px;margin-bottom:2px"><span style="color:${e.buildColor};font-family:'Cinzel',serif;font-size:11px">${e.buildName}</span> <span style="color:var(--text-muted)">engine — ${e.label}</span> <span style="font-family:'Share Tech Mono',monospace;font-size:9px;color:var(--teal-bright)">(${e.have}/${e.total} in deck)</span></div>`;
        });
      }

      if (priorityMatches.length > 0) {
        priorityMatches.forEach(p => {
          html += `<div style="font-size:11px;margin-bottom:2px"><span style="color:${p.buildColor};font-family:'Cinzel',serif;font-size:11px">${p.buildName}</span>`;
          if (p.rank) html += ` <span style="font-family:'Share Tech Mono',monospace;font-size:9px;color:var(--text-muted)">[${p.rank}]</span>`;
          html += `</div>`;
        });
      }

      if (isSafe && engineMatches.length === 0 && priorityMatches.length === 0) {
        html += `<div style="font-size:11px;color:var(--text-muted)">Useful across most builds — safe to take regardless of path.</div>`;
      }
      if (!isSafe && engineMatches.length === 0 && priorityMatches.length === 0) {
        html += `<div style="font-size:11px;color:var(--text-muted)">Not a priority for any ${currentChar.charAt(0).toUpperCase()+currentChar.slice(1)} build. Skip unless you have a specific reason.</div>`;
      }

      if (card.note) html += `<div style="font-size:10px;color:var(--text-muted);margin-top:3px;opacity:.65">${card.note}</div>`;

      const safeN = name.replace(/'/g,"\\'");
      html += `<div style="margin-top:5px"><button onclick="pickerAddCard('${safeN}')" style="padding:3px 9px;border:1px solid var(--border-bright);border-radius:3px;background:none;color:var(--text-muted);font-family:'Share Tech Mono',monospace;font-size:9px;letter-spacing:.06em;text-transform:uppercase;cursor:pointer" onmouseover="this.style.borderColor='var(--amber)';this.style.color='var(--amber-bright)'" onmouseout="this.style.borderColor='var(--border-bright)';this.style.color='var(--text-muted)'">${alreadyInDeck > 0 ? '+ add another' : '+ add to deck'}</button></div>`;

      html += `</div>`;
    });

    el.innerHTML = html;
    return;
  }

  // No query: grouped priority list for quick browsing
  function categorise(card) {
    const inTop = topBuild && topBuild.cards.includes(card.name);
    const inTopSyn = topBuild && topBuild.synergy && topBuild.synergy.includes(card.name);
    const inAnyBuild = Object.values(builds).some(b=>b.cards.includes(card.name)||(b.synergy||[]).includes(card.name));
    const needsDef = stats.def < 3 && (card.type==='def'||card.type.includes('def'));
    const needsAtk = stats.atk < 3 && (card.type==='atk'||card.type.includes('atk'));
    if (inTop) return {v:'rec', label:'TAKE', reason:needsDef?'priority + fixes low def':needsAtk?'priority + fixes low atk':'core build card'};
    if (inTopSyn) return {v:'syn', label:'SYNERGY', reason:'synergy with your build'};
    if (needsDef) return {v:'rec', label:'TAKE', reason:'fixes low defense'};
    if (needsAtk && inAnyBuild) return {v:'syn', label:'CONSIDER', reason:'fixes low attacks'};
    if (inAnyBuild) return {v:'other', label:'', reason:'fits a build'};
    return {v:'skip', label:'', reason:''};
  }

  let items = allCards.filter(c => categorise(c).v !== 'skip');
  items = items.map(c => ({...c, cat:categorise(c)}));
  const order = {rec:0,syn:1,other:2,skip:3};
  items.sort((a,b)=>{
    const va = order[a.cat.v]+(a.crossChar?10:0);
    const vb = order[b.cat.v]+(b.crossChar?10:0);
    return va-vb || a.name.localeCompare(b.name);
  });

  if (!items.length) { el.innerHTML='<div class="picker-empty">No priority cards — try searching.</div>'; return; }

  const vs = {rec:'background:rgba(74,124,63,.2);color:var(--green-bright);border:1px solid rgba(106,172,95,.35)',syn:'background:rgba(200,146,42,.15);color:var(--amber-bright);border:1px solid rgba(200,146,42,.3)',other:'',skip:''};
  let html = '<div style="font-size:10px;color:var(--text-muted);font-style:italic;padding:2px 2px 6px">Search a card name for full build details.</div>';
  [{key:'rec',label:'recommended'},{key:'syn',label:'synergy'},{key:'other',label:'other cards'}].forEach(g=>{
    const ownCards = items.filter(c=>c.cat.v===g.key && !c.crossChar);
    const crossCards = items.filter(c=>c.cat.v===g.key && c.crossChar);
    if (!ownCards.length && !crossCards.length) return;
    html += `<div class="picker-group-label">${g.label}</div>`;
    ownCards.forEach(c=>{ html += pickerRowHtmlAdd(c, typeCls, vs); });
    if (crossCards.length > 0) {
      html += `<div style="font-family:'Share Tech Mono',monospace;font-size:8px;letter-spacing:.12em;color:var(--text-muted);opacity:.6;text-transform:uppercase;padding:4px 2px 2px;margin-top:2px">from other characters</div>`;
      crossCards.forEach(c=>{ html += pickerRowHtmlAdd(c, typeCls, vs); });
    }
  });
  el.innerHTML = html || '<div class="picker-empty">No priority cards — try searching.</div>';
}

function renderPickerList() {
  if (pickerTab === 'reward') { renderRewardUnified(document.getElementById('pickerList')); }
  else renderPickerAdd();
}

function pickerRowHtmlAdd(c, typeCls, vs) {
  const inDeck = deck[c.name] ? ` <span style="font-family:'Share Tech Mono',monospace;font-size:9px;color:var(--amber)">(×${deck[c.name]})</span>` : '';
  const crossTag = c.crossChar ? ` <span style="font-family:'Share Tech Mono',monospace;font-size:8px;color:var(--text-muted);opacity:.7;border:1px solid var(--border);border-radius:2px;padding:0 4px">${c.crossCharName}</span>` : '';
  const rowCls = c.cat.v==='rec'?' rec':c.cat.v==='syn'?' syn':'';
  const safeN = c.name.replace(/'/g,"&#39;");
  const noteText = [c.cat.reason, c.note].filter(Boolean).join('. ');
  const tierB = tierBadgeHtml(c.name, 'sm');
  return `<div class="picker-card-row${rowCls}" onclick="pickerAddCard('${safeN}')" style="grid-template-columns:1fr auto auto auto;gap:5px">
    <div style="min-width:0">
      <div class="picker-card-name">${c.name}${inDeck}${crossTag}</div>
      ${noteText ? `<div class="picker-card-note">${noteText}</div>` : ''}
    </div>
    ${tierB}
    <span class="deck-item-tag ${typeCls(c.type)}" style="font-size:9px;padding:1px 5px;white-space:nowrap">${(c.type||'skl').replace(/_/g,'·').toUpperCase()}</span>
    ${c.cat.label ? `<span class="picker-verdict" style="${vs[c.cat.v]||''}">${c.cat.label}</span>` : '<span style="width:20px"></span>'}
  </div>`;
}

function pickerAddCard(name) { addCard(name); renderPickerAdd(); }
