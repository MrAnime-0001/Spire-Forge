// Deck rendering for STS2 Build Advisor.

function renderDeckStats() {
  const el = document.getElementById('deckStats');
  if (!el) return;
  if (getDeckSize() === 0) { el.innerHTML = ''; return; }

  const stats = getDeckStats();
  // Icon + class so low/healthy isn't shown by color alone.
  const cls = (v, lo, ok) => v <= lo ? 'stat-warn' : v >= ok ? 'stat-ok' : '';
  const chip = (v, label, c) => `<div class="stat-chip"><div class="stat-val ${c}">${c === 'stat-warn' ? '<span class="stat-ico" aria-label="low">⚠</span>' : ''}${v}</div><div class="stat-lbl">${label}</div></div>`;

  el.innerHTML =
    chip(getDeckSize(), 'Cards', '') +
    chip(stats.atk, 'Attack', cls(stats.atk, 2, 3)) +
    chip(stats.def, 'Defense', cls(stats.def, 1, 3)) +
    chip(stats.scl, 'Scale', cls(stats.scl, 0, 3)) +
    chip(stats.vel, 'Velocity', cls(stats.vel, 0, 3));
}


const TYPE_COLORS = {atk:'var(--c-atk)', def:'var(--c-def)', skl:'var(--c-skl)', pow:'var(--c-pow)', vel:'var(--c-vel)'};

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

  // Remember which control had focus so keyboard users stay put after the rebuild.
  const active = document.activeElement;
  const focusRow = active && list.contains(active) && active.closest('[data-card]');
  const focusKey = focusRow ? [focusRow.dataset.card, active.dataset.act] : null;

  const typeLabel = t => (t||'skl').replace(/_/g,'·').toUpperCase();
  const typeCls = t => {
    if (t.includes('atk')) return 'tag-atk';
    if (t.includes('def')) return 'tag-def';
    if (t.includes('vel')) return 'tag-vel';
    if (t.includes('pow')) return 'tag-pow';
    return 'tag-skl';
  };

  const sorted = Object.entries(deck).sort((a,b)=>a[0].localeCompare(b[0]));
  list.innerHTML = sorted.map(([name,count]) => {
    const found = findCard(name);
    const c = found && found.card;
    const type = c ? c.type : 'skl';
    const isUpgraded = name.endsWith('+');
    const hasUpgrade = !isUpgraded && findCard(name + '+');
    const isBane = name === "Ascender's Bane";
    const safeN = esc(name.replace(/'/g, "\\'"));
    const n = esc(name);
    const upgradeBtn = (hasUpgrade && !isBane) ? `<button type="button" class="qty-btn qty-up" data-act="up" onclick="upgradeCard('${safeN}')" aria-label="Upgrade ${n}" title="Upgrade">⚒</button>` : '';
    const orb = c ? `<span class="cf-row-orb">${cardOrbHtml(c, true)}</span>` : '';
    const rowCls = 'deck-item' + (isUpgraded ? ' up' : '') + (isBane ? ' bane' : '') + (name === lastTouchedCard ? ' touched' : '');
    // Left-edge stripe in the type color; hybrids (atk_def) get a two-color edge.
    const cols = isBane ? [] : (type || 'skl').split('_').map(p => TYPE_COLORS[p]).filter(Boolean);
    const stripe = cols.length > 1 ? 'linear-gradient(' + cols.join(',') + ')' : cols[0] || 'var(--text-muted)';
    return `<div class="${rowCls}" data-card="${n}" style="--t:${stripe};grid-template-columns:1fr auto auto auto;gap:6px">
      <span style="display:flex;align-items:center;min-width:0">${orb}<span class="deck-item-name">${n}</span></span>
      <div style="display:flex; align-items:center; gap:4px">
        ${upgradeBtn}
        <span class="deck-item-tag ${typeCls(type)}">${typeLabel(type)}</span>
      </div>
      <div class="qty-ctrl">
        ${isBane ? '<span class="qty-lock" title="Cannot be removed">✕</span>' : `<button type="button" class="qty-btn" data-act="minus" onclick="adjustQty('${safeN}',-1)" aria-label="Remove one ${n}">−</button>`}
        <span class="qty-num">${count}</span>
        ${isBane ? '' : `<button type="button" class="qty-btn" data-act="plus" onclick="adjustQty('${safeN}',+1)" aria-label="Add one ${n}">+</button>`}
      </div>
    </div>`;
  }).join('');
  lastTouchedCard = null;

  if (focusKey) {
    const row = Array.from(list.querySelectorAll('[data-card]')).find(r => r.dataset.card === focusKey[0]);
    const btn = row && (row.querySelector('[data-act="' + focusKey[1] + '"]') || row.querySelector('button'));
    if (btn) btn.focus({preventScroll: true});
  }
}
