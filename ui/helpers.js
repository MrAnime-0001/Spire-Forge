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
