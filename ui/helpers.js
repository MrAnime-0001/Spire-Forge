// Shared display helpers for STS2 Build Advisor.
// Used by deckView, resultView, pickerView, and modals.

function getCardTier(cardName) {
  if (!currentChar) return null;
  const charTiers = CARD_TIERS[currentChar] || {};
  const colorlessTiers = CARD_TIERS.colorless || {};
  const crossChars = ['ironclad','silent','defect','necrobinder','regent'].filter(c => c !== currentChar);
  let tierData = charTiers[cardName] || colorlessTiers[cardName];
  if (!tierData) {
    for (const c of crossChars) {
      if ((CARD_TIERS[c] || {})[cardName]) {
        tierData = CARD_TIERS[c][cardName];
        break;
      }
    }
  }
  return tierData || null;
}

function tierBadgeHtml(cardName, size) {
  const t = getCardTier(cardName);
  if (!t || !t.tier) return '';
  const colors = {
    S: {bg:'rgba(232,184,75,.18)', border:'rgba(232,184,75,.55)', fg:'#e8b84b'},
    A: {bg:'rgba(106,172,95,.18)', border:'rgba(106,172,95,.55)', fg:'#6aac5f'},
    B: {bg:'rgba(74,140,186,.18)', border:'rgba(74,140,186,.55)', fg:'#6aacda'},
    C: {bg:'rgba(122,106,138,.18)', border:'rgba(122,106,138,.55)', fg:'#a090b0'},
    D: {bg:'rgba(192,64,64,.18)', border:'rgba(192,64,64,.55)', fg:'#c06060'}
  };
  const c = colors[t.tier] || colors.C;
  const fs = size === 'sm' ? '8px' : '9px';
  const pad = size === 'sm' ? '1px 4px' : '1px 5px';
  const title = t.note ? ` title="${t.note.replace(/"/g,'&quot;')}"` : '';
  return `<span class="tier-badge" style="font-family:'Share Tech Mono',monospace;font-size:${fs};font-weight:700;padding:${pad};border-radius:2px;background:${c.bg};border:1px solid ${c.border};color:${c.fg};letter-spacing:.04em;white-space:nowrap;flex-shrink:0"${title}>${t.tier}</span>`;
}

function getCardTierNote(cardName) {
  const t = getCardTier(cardName);
  return (t && t.note) ? t.note : '';
}

function getAllCardsForPicker() {
  var own = (ALL_CARDS[currentChar] || []).map(function(c){ return Object.assign({}, c, {crossChar: false}); });
  var others = [];
  var charKeys = ['ironclad','silent','defect','necrobinder','regent'];
  charKeys.forEach(function(k) {
    if (k === currentChar) return;
    (ALL_CARDS[k] || []).forEach(function(c) {
      others.push(Object.assign({}, c, {crossChar: true, crossCharName: k.charAt(0).toUpperCase()+k.slice(1)}));
    });
  });
  var colorless = (ALL_CARDS['colorless'] || []).map(function(c){ return Object.assign({}, c, {crossChar: true, crossCharName: 'Colorless'}); });
  return own.concat(others).concat(colorless);
}

function getRarity(card) {
  return (card && card.rarity) ? card.rarity : 'common';
}

function rarityBadgeHtml(rarity, extraStyle) {
  var r = rarity || 'common';
  var labels = {basic:'Basic',common:'Common',uncommon:'Uncommon',rare:'Rare',ancient:'Ancient',event:'Event',token:'Token'};
  var label = labels[r] || r.charAt(0).toUpperCase()+r.slice(1);
  var s = extraStyle ? ' style="'+extraStyle+'"' : '';
  return '<span class="rar rar-'+r+'"'+s+'>'+label+'</span>';
}

function rarityContext(rarity, verdict) {
  if (rarity === 'basic') return 'Starter card — never add more.';
  if (rarity === 'token') return 'Generated in combat — not a pickable card.';
  if (verdict === 'pick' || verdict === 'take') {
    if (rarity === 'common')   return 'Common — easy to find. Confident take.';
    if (rarity === 'uncommon') return 'Uncommon — appears regularly. Take it when offered.';
    if (rarity === 'rare')     return 'Rare — high value when offered. Don\'t pass on this.';
    if (rarity === 'ancient')  return 'Ancient — very rare. Take it if it fits.';
    if (rarity === 'event')    return 'Event-only card — only available from specific events.';
  }
  if (verdict === 'consider' || verdict === 'synergy') {
    if (rarity === 'common')   return 'Common — worth considering since it\'s easy to get.';
    if (rarity === 'uncommon') return 'Uncommon — consider it, but don\'t force it.';
    if (rarity === 'rare')     return 'Rare — only take if it clearly fits your build.';
    if (rarity === 'ancient')  return 'Ancient — marginal fit, but rares are rare enough to weigh carefully.';
    if (rarity === 'event')    return 'Event card — situationally useful.';
  }
  if (verdict === 'skip') {
    if (rarity === 'common')   return 'Common — skip without hesitation, you\'ll see it again.';
    if (rarity === 'uncommon') return 'Uncommon — doesn\'t fit your build right now.';
    if (rarity === 'rare')     return 'Rare — doesn\'t fit your build. Don\'t take rares just because they\'re rare.';
    if (rarity === 'ancient')  return 'Ancient — powerful but doesn\'t fit here.';
    if (rarity === 'event')    return 'Event card — skip.';
  }
  return '';
}
