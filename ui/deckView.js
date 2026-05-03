// Deck rendering for STS2 Build Advisor.

function renderDeckStats() {
  const el = document.getElementById('deckStats');
  if (!el) return;
  if (getDeckSize() === 0) { el.innerHTML = ''; return; }

  const stats = getDeckStats();
  const atkCls = stats.atk <= 2 ? 'stat-warn' : stats.atk >= 3 ? 'stat-ok' : '';
  const defCls = stats.def <= 1 ? 'stat-warn' : stats.def >= 3 ? 'stat-ok' : '';
  const sclCls = stats.scl <= 0 ? 'stat-warn' : stats.scl >= 3 ? 'stat-ok' : '';
  const velCls = stats.vel <= 0 ? 'stat-warn' : stats.vel >= 3 ? 'stat-ok' : '';

  el.innerHTML = `
    <div class="stat-chip"><div class="stat-val">${getDeckSize()}</div><div class="stat-lbl">Cards</div></div>
    <div class="stat-chip"><div class="stat-val ${atkCls}">${stats.atk}</div><div class="stat-lbl">Attack</div></div>
    <div class="stat-chip"><div class="stat-val ${defCls}">${stats.def}</div><div class="stat-lbl">Defense</div></div>
    <div class="stat-chip"><div class="stat-val ${sclCls}">${stats.scl}</div><div class="stat-lbl">Scale</div></div>
    <div class="stat-chip"><div class="stat-val ${velCls}">${stats.vel}</div><div class="stat-lbl">Velocity</div></div>
  `;
}

function renderDeckList() {
  const list = document.getElementById('deckList');
  const countEl = document.getElementById('deckCount');
  const total = getDeckSize();
  countEl.textContent = total + ' card' + (total!==1?'s':'');

  renderDeckStats();

  if (Object.keys(deck).length === 0) {
    list.innerHTML = '<div class="deck-empty">No cards yet. Use "add card reward" to start.</div>';
    return;
  }

  const typeLabel = {atk:'ATK',def:'DEF',pow:'POW',skl:'SKL',vel:'VEL',atk_def:'ATK·DEF',atk_scl:'ATK·SCL',def_scl:'DEF·SCL',atk_def_scl:'ALL'};
  const typeCls = t => t.startsWith('atk_def_scl') ? 'tag-skl' : t.startsWith('atk_def') ? 'tag-atk' : t.startsWith('atk_scl') ? 'tag-atk' : t.startsWith('def_scl') ? 'tag-def' : t==='atk' ? 'tag-atk' : t==='def' ? 'tag-def' : t==='pow' ? 'tag-pow' : t==='vel' ? 'tag-vel' : t==='other' ? 'tag-other' : 'tag-skl';
  const charCards = ALL_CARDS[currentChar] || [];
  const colorlessCards = ALL_CARDS['colorless'] || [];
  const allOtherDeckCards = ['ironclad','silent','defect','necrobinder','regent'].filter(k=>k!==currentChar).flatMap(k=>ALL_CARDS[k]||[]);

  const sorted = Object.entries(deck).sort((a,b)=>a[0].localeCompare(b[0]));
  list.innerHTML = sorted.map(([name,count]) => {
    const c = charCards.find(x=>x.name===name) || colorlessCards.find(x=>x.name===name) || allOtherDeckCards.find(x=>x.name===name);
    const type = c ? c.type : 'skl';
    const tl = typeLabel[type] || type.toUpperCase();
    const tierB = tierBadgeHtml(name, 'sm');
    return `<div class="deck-item" style="grid-template-columns:1fr auto auto auto;gap:6px">
      <span class="deck-item-name">${name}</span>
      ${tierB}
      <span class="deck-item-tag ${typeCls(type)}">${tl}</span>
      <div class="qty-ctrl">
        <button class="qty-btn" onclick="adjustQty('${name}',-1)">−</button>
        <span class="qty-num">${count}</span>
        <button class="qty-btn" onclick="adjustQty('${name}',+1)">+</button>
      </div>
    </div>`;
  }).join('');
}
