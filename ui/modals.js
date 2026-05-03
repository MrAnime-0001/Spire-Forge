// Card browser modal (manually add cards) for STS2 Build Advisor.

function openModal() {
  const search = document.getElementById('modalSearch');
  search.value = '';
  document.getElementById('modalOverlay').classList.remove('hidden');
  renderModalCards();
  setTimeout(() => { search.focus(); }, 50);
}

function closeModal() { document.getElementById('modalOverlay').classList.add('hidden'); }

function renderModalCards() {
  const q = (document.getElementById('modalSearch').value || '').toLowerCase();
  const body = document.getElementById('modalBody');
  if (!currentChar) { body.innerHTML = '<p style="color:var(--text-muted);font-size:13px;padding:.5rem">Select a character first.</p>'; return; }

  const allCards = getAllCardsForPicker();
  const builds = (BUILD_DATA[currentChar] || {}).builds || {};
  const topBuildKey = getTopBuild();
  const topBuild = topBuildKey ? builds[topBuildKey] : null;
  const stats = getDeckStats();

  function categorise(card) {
    const inTop = topBuild && topBuild.cards.includes(card.name);
    const inTopSyn = topBuild && topBuild.synergy && topBuild.synergy.includes(card.name);
    const inAnyBuild = Object.values(builds).some(b => b.cards.includes(card.name) || (b.synergy && b.synergy.includes(card.name)));
    const needsDef = stats.def < 3 && (card.type.includes('def'));
    const needsAtk = stats.atk < 3 && (card.type.includes('atk'));
    const tooMany = deck[card.name] && deck[card.name] >= 2 && (card.type.includes('atk'));
    if (inTop) return {verdict:'take', label:'TAKE', cls:'verdict-take', reason: needsDef?'Priority + fixes low defense': needsAtk?'Priority + fixes low attacks':'Core card for your leading build'};
    if (inTopSyn) return {verdict:'synergy', label:'SYNERGY', cls:'verdict-synergy', reason:'Good synergy with your leading build'};
    if (needsDef && card.type==='def') return {verdict:'take', label:'TAKE', cls:'verdict-take', reason:'Fixes low defense in your deck'};
    if (needsAtk && card.type==='atk' && inAnyBuild) return {verdict:'synergy', label:'SYNERGY', cls:'verdict-synergy', reason:'Fixes low attacks + fits a build'};
    if (inAnyBuild) return {verdict:'shop', label:'CONSIDER', cls:'verdict-shop', reason:'Useful for one of your builds'};
    if (tooMany) return {verdict:'skip', label:'SKIP', cls:'verdict-skip', reason:'You already have 2+ copies'};
    return {verdict:'skip', label:'SKIP', cls:'verdict-skip', reason:'Does not contribute to your current path'};
  }

  function actOverride(card, cat) {
    const isAtkOrDef = card.type && (card.type==='atk'||card.type==='def'||card.type.includes('atk')||card.type.includes('def'));
    if (currentAct === 1 && stats.total < 8 && cat.verdict === 'skip' && isAtkOrDef) {
      return {verdict:'synergy', label:'CONSIDER', cls:'verdict-synergy', reason:'Act 1: almost anything beats a Strike or Defend'};
    }
    return cat;
  }

  let items = allCards
    .filter(c => !q || c.name.toLowerCase().includes(q))
    .map(c => { const cat = actOverride(c, categorise(c)); return {...c, cat}; })
    .sort((a,b) => {
      const order = {take:0, synergy:1, shop:2, skip:3};
      const va = order[a.cat.verdict] + (a.crossChar ? 10 : 0);
      const vb = order[b.cat.verdict] + (b.crossChar ? 10 : 0);
      return va - vb || a.name.localeCompare(b.name);
    });

  if (items.length === 0) { body.innerHTML = '<p style="color:var(--text-muted);font-size:13px;padding:.5rem">No cards match.</p>'; return; }

  const groups = {};
  items.forEach(c => { const g = c.cat.verdict; if (!groups[g]) groups[g]=[]; groups[g].push(c); });

  const groupNames = {take:'Recommended — Take These', synergy:'Synergy — Worth Considering', shop:'Consider', skip:'Skip'};
  let html = '';
  ['take','synergy','shop','skip'].forEach(g => {
    if (!groups[g] || groups[g].length === 0) return;
    if (g === 'skip' && !q) return;
    html += `<div class="group-header">${groupNames[g]}</div>`;
    groups[g].forEach(c => {
      const inDeck = deck[c.name] ? ` <span style="font-size:10px;color:var(--amber);font-family:'Share Tech Mono',monospace">(×${deck[c.name]} in deck)</span>` : '';
      const recommended = (g==='take'||g==='synergy') ? ' recommended' : (g==='skip'?' skip-flag':'');
      const isUpgraded = c.name.endsWith('+');
      const nameStyle = isUpgraded ? 'color:var(--amber-bright); font-weight:600;' : '';
      
      html += `<div class="card-option${recommended}" onclick="addCard('${c.name.replace(/'/g,"\\'")}')">
        <div>
          <div class="card-opt-name" style="${nameStyle}">${c.name}${inDeck}</div>
          <div class="card-opt-reason">${c.cat.reason}. ${c.note||''}</div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:3px">
          <span class="deck-item-tag ${c.type.includes('atk')?'tag-atk':c.type.includes('def')?'tag-def':c.type.includes('vel')?'tag-vel':'tag-skl'}">${(c.type||'skl').replace(/_/g,'\u00B7').toUpperCase()}</span>
          ${rarityBadgeHtml(getRarity(c))}
        </div>
        <span class="card-opt-verdict ${c.cat.cls}">${c.cat.label}</span>
      </div>`;
    });
  });

  body.innerHTML = html || '<p style="color:var(--text-muted);font-size:13px;padding:.5rem">No cards match.</p>';
}
