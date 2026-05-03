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

  const typeLabel = t => (t||'skl').replace(/_/g,'\u00B7').toUpperCase();
  const typeCls = t => {
    if (t.includes('atk')) return 'tag-atk';
    if (t.includes('def')) return 'tag-def';
    if (t.includes('vel')) return 'tag-vel';
    if (t.includes('pow')) return 'tag-pow';
    return 'tag-skl';
  };
  const charCards = ALL_CARDS[currentChar] || [];
  const colorlessCards = ALL_CARDS['colorless'] || [];
  const allOtherDeckCards = ['ironclad','silent','defect','necrobinder','regent'].filter(k=>k!==currentChar).flatMap(k=>ALL_CARDS[k]||[]);

  const sorted = Object.entries(deck).sort((a,b)=>a[0].localeCompare(b[0]));
  list.innerHTML = sorted.map(([name,count]) => {
    const c = charCards.find(x=>x.name===name) || colorlessCards.find(x=>x.name===name) || allOtherDeckCards.find(x=>x.name===name);
    const type = c ? c.type : 'skl';
    const tl = typeLabel(type);
    const isUpgraded = name.endsWith('+');
    const hasUpgrade = !isUpgraded && (charCards.find(x=>x.name===name+'+') || colorlessCards.find(x=>x.name===name+'+') || allOtherDeckCards.find(x=>x.name===name+'+'));
    const nameStyle = isUpgraded ? 'color:var(--amber-bright); font-weight:600; text-shadow: 0 0 5px rgba(200,146,42,0.3);' : '';
    const safeN = name.replace(/'/g, "\\'");
    const upgradeBtn = hasUpgrade ? `<button class="qty-btn" onclick="upgradeCard('${safeN}')" title="Upgrade this card" style="border-color:var(--amber); color:var(--amber-bright); font-size:11px; margin-right:4px;">\u2692</button>` : '';

    return `<div class="deck-item" style="grid-template-columns:1fr auto auto auto;gap:6px">
      <span class="deck-item-name" style="${nameStyle}">${name}</span>
      <div style="display:flex; align-items:center; gap:4px">
        ${upgradeBtn}
        <span class="deck-item-tag ${typeCls(type)}">${tl}</span>
      </div>
      <div class="qty-ctrl">
        <button class="qty-btn" onclick="adjustQty('${safeN}',-1)">−</button>
        <span class="qty-num">${count}</span>
        <button class="qty-btn" onclick="adjustQty('${safeN}',+1)">+</button>
      </div>
    </div>`;
  }).join('');
}
