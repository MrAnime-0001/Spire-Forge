// Shared display helpers for STS2 Build Advisor.
// Used by deckView, resultView, pickerView, and modals.


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

// ── Game-style card visuals ──────────────────────────────────
var CHAR_COLORS = {ironclad:'#b8342c', silent:'#4f8a3c', defect:'#3d7bbd', regent:'#d08a2a', necrobinder:'#b05a9a', colorless:'#8a8a80'};
var _cardIndex = null;

// name -> {card, pool}, preferring the current character's pool (Strike, Defend exist in several).
// ALL_CARDS never changes after load, so the index is built once.
function findCard(name) {
  if (!_cardIndex) {
    _cardIndex = {};
    Object.keys(ALL_CARDS).forEach(function(pool) {
      ALL_CARDS[pool].forEach(function(c) {
        (_cardIndex[c.name] = _cardIndex[c.name] || []).push({card: c, pool: pool});
      });
    });
  }
  var hits = _cardIndex[name];
  if (!hits) return null;
  return hits.find(function(h) { return h.pool === currentChar; }) || hits[0];
}

function isUnplayable(card) {
  return /cur|status/.test(card.type || '') || ['Status', 'Curse'].indexOf(card.cardType) >= 0;
}

// Energy orb (+ Regent star orb). Small variant for list rows.
function cardOrbHtml(card, small) {
  if (!card || card.cost === undefined || isUnplayable(card)) return small ? '<span class="cf-orb sm cf-none"></span>' : '';
  var found = findCard(card.name);
  var col = CHAR_COLORS[found ? found.pool : currentChar] || CHAR_COLORS.colorless;
  var sm = small ? ' sm' : '';
  var html = '<span class="cf-orb' + sm + '" style="--char:' + col + '">' + card.cost + '</span>';
  if (card.starCost !== undefined) html += '<span class="cf-orb cf-star' + sm + '">' + card.starCost + '</span>';
  return html;
}

function cardFaceHtml(card) {
  var found = findCard(card.name);
  var col = CHAR_COLORS[found ? found.pool : currentChar] || CHAR_COLORS.colorless;
  var type = card.cardType || (/atk/.test(card.type) ? 'Attack' : /pow/.test(card.type) ? 'Power' : isUnplayable(card) ? 'Curse' : 'Skill');
  var rar = card.rarity || 'common';
  return '<div class="cf cf-' + type.toLowerCase() + '" style="--char:' + col + '">' +
      '<div class="cf-orbs">' + cardOrbHtml(card) + '</div>' +
      (card.multiplayer ? '<span class="cf-coop">CO-OP</span>' : '') +
      '<div class="cf-banner cf-rar-' + rar + '"><span class="cf-name' + (card.isUpgraded ? ' up' : '') + '">' + card.name + '</span></div>' +
      '<div class="cf-art"></div>' +
      '<div class="cf-type">' + type + '</div>' +
      '<div class="cf-body">' + formatCardDescription(card.description) + '</div>' +
      '<div class="cf-rarity">' + rar + '</div>' +
    '</div>' +
    (card.note ? '<div class="cf-note">' + card.note + '</div>' : '');
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
