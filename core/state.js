// Shared run state and state-changing entry points for STS2 Build Advisor.

let currentChar = null;

let currentAct = 1;

let currentRegion = 'overgrowth'; // REGION_DATA key for the current act

let startRegion = null; // Act 1 region picked when the run started (Act 1 has two)

let currentAsc = 0; // ascension level 0-10

let deck = {}; // card name -> count

let relics = []; // relic names

let hpCur = 0;

let hpMax = 0;

const stateListeners = [];

function subscribe(callback) {
  stateListeners.push(callback);
}

function notifyListeners() {
  stateListeners.forEach(cb => cb());
}

function setAsc(n) {
  currentAsc = n;
  syncAscendersBane();
  notifyListeners();
  if(window.__particle) window.__particle.fireAscensionParticle(n);
}

// Start a new run (called by the setup panel's Start button).
function selectChar(key, region) {
  currentChar = key;
  currentAct = 1;
  startRegion = region || null;
  syncRegionToAct();
  selectedBoss = null;
  loadDefaultDeck(key);
  document.querySelectorAll('.char-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('char-' + key).classList.add('active');
  const hp = CHAR_HP[key] || 80;
  hpCur = hp; hpMax = hp;
  document.getElementById('hpCur').value = hp;
  document.getElementById('hpMax').value = hp;
  document.getElementById('mainUI').style.display = 'block';
  document.getElementById('inlinePicker').style.display = 'block';
  if(typeof updateHpBar === 'function') updateHpBar();
  var btn = document.getElementById('char-' + key);
  if(btn && window.__particle){
    var r = btn.getBoundingClientRect();
    window.__particle.fireBossSelect(r.left + r.width/2, r.top + r.height/2, '#e8b84b');
  }
  notifyListeners();
}

function loadDefaultDeck(key) {
  deck = {};
  relics = [];
  const defaults = STARTING_DECKS[key] || {};
  Object.entries(defaults).forEach(([name, count]) => { deck[name] = count; });
  syncAscendersBane();
}

function addRelic(name) {
  if (relics.indexOf(name) < 0) { relics.push(name); notifyListeners(); }
}

function removeRelic(name) {
  var idx = relics.indexOf(name);
  if (idx >= 0) { relics.splice(idx, 1); notifyListeners(); }
}

function hasRelic(name) {
  return relics.indexOf(name) >= 0;
}

function syncAscendersBane() {
  var hasBane = "Ascender's Bane" in deck;
  if(currentAsc >= 5 && !hasBane) {
    deck["Ascender's Bane"] = (deck["Ascender's Bane"] || 0) + 1;
  } else if(currentAsc < 5 && hasBane) {
    delete deck["Ascender's Bane"];
  }
}

// Run over: clear it and go back to picking a character and starting region.
function resetRun() {
  if (!currentChar || !confirm('End this run? Your deck is cleared and you pick a character and region again.')) return;
  if (window.playRunCard) playRunCard('died'); // before the run is cleared: the card shows how far it got
  clearAutoSave();
  currentChar = null;
  deck = {};
  relics = [];
  currentAct = 1;
  startRegion = null;
  selectedBoss = null;
  syncRegionToAct();
  enterSetup();
}

function setAct(n) {
  currentAct = n;
  syncRegionToAct();
  notifyListeners();
}

// Act 1 uses the region picked at run start; Acts 2-3 have one region each.
function syncRegionToAct() {
  currentRegion = (currentAct === 1 && startRegion) ||
    Object.keys(REGION_DATA).find(function(rk) { return REGION_DATA[rk].act === currentAct; });
}

// Saved data: older saves may have no region, or the act's region instead of the Act 1 one.
function restoreRegion(rk) {
  startRegion = rk && REGION_DATA[rk] && REGION_DATA[rk].act === 1 ? rk : null;
  syncRegionToAct();
}

// Region filter for bosses/scoring: the current region, or all of Act 1 if no start region is known.
function inCurrentRegion(rk) {
  return currentAct === 1 && !startRegion ? REGION_DATA[rk].act === 1 : rk === currentRegion;
}

function addCard(name, count = 1) {
  deck[name] = (deck[name] || 0) + count;
  window._particleSkipVerdict = true;
  notifyListeners();
  // Particle highlight on added card
  if(window.__particle){
    setTimeout(function(){
      var el = Array.from(document.querySelectorAll('.deck-item-name')).find(function(e){ return e.textContent === name; });
      if(el){
        el.scrollIntoView({block:'center', behavior:'instant'});
        var r = el.getBoundingClientRect();
        window.__particle.fireCardPick(r.left + r.width/2, r.top + r.height/2);
        window.__particle.fireVerdict(r.left + r.width/2, r.top + r.height/2, '#4a9a8a');
      }
    }, 0);
  }
}

function adjustQty(name, delta) {
  if(name === "Ascender's Bane") return;
  deck[name] = Math.max(0, (deck[name] || 0) + delta);
  if (deck[name] === 0) delete deck[name];
  notifyListeners();
}

function deckCards() {
  const out = [];
  Object.entries(deck).forEach(([name, count]) => { for(let i=0;i<count;i++) out.push(name); });
  return out;
}

function getDeckSize() { return Object.values(deck).reduce((a,b)=>a+b,0); }

function setHP(cur, max) {
  hpCur = cur;
  if (max !== undefined) hpMax = max;
  document.getElementById('hpCur').value = hpCur;
  if (max !== undefined) document.getElementById('hpMax').value = hpMax;
  notifyListeners();
}

function removeCard(cardName) {
  adjustQty(cardName, -1);
}

function upgradeCard(baseName) {
  if(baseName === "Ascender's Bane") return;
  if (deck[baseName] && deck[baseName] > 0) {
    const upgradedName = baseName + '+';
    // Verify upgraded card exists in any character's pool, colorless, or cross-class
    const allPools = ['ironclad','silent','defect','necrobinder','regent','colorless']
      .reduce(function(acc, k) { return acc.concat(ALL_CARDS[k] || []); }, []);
    const upgradedExists = allPools.some(function(c) { return c.name === upgradedName; });
    if (!upgradedExists) return;
    adjustQty(baseName, -1);
    addCard(upgradedName, 1);
    if(window.__particle){
      var nameEl = Array.from(document.querySelectorAll('.deck-item-name')).find(function(el){ return el.textContent === upgradedName; });
      if(nameEl) {
        nameEl.scrollIntoView({block:'center', behavior:'instant'});
        var r = nameEl.getBoundingClientRect();
        window.__particle.fireCardPick(r.left + r.width/2, r.top + r.height/2);
        window.__particle.fireVerdict(r.left + r.width/2, r.top + r.height/2, '#4a9a8a');
      }
    }
  }
}
