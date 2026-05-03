// Shared run state and state-changing entry points for STS2 Build Advisor.

let currentChar = null;

let currentAct = 1;

let currentAsc = 0; // ascension level 0-10

let deck = {}; // card name -> count

let gold = 0;

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
  notifyListeners();
}

function selectChar(key) {
  currentChar = key;
  currentAct = 1;
  loadDefaultDeck(key);
  document.querySelectorAll('.char-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('char-' + key).classList.add('active');
  const hp = CHAR_HP[key] || 80;
  hpCur = hp; hpMax = hp;
  document.getElementById('hpCur').value = hp;
  document.getElementById('hpMax').value = hp;
  document.getElementById('mainUI').style.display = 'block';
  document.getElementById('inlinePicker').style.display = 'block';
  notifyListeners();
}

function loadDefaultDeck(key) {
  deck = {};
  const defaults = STARTING_DECKS[key] || {};
  Object.entries(defaults).forEach(([name, count]) => { deck[name] = count; });
}

function resetRun() {
  if (!currentChar) return;
  currentAct = 1;
  loadDefaultDeck(currentChar);
  const hp = CHAR_HP[currentChar] || 80;
  hpCur = hp; hpMax = hp;
  document.getElementById('hpCur').value = hp;
  document.getElementById('hpMax').value = hp;
  document.getElementById('inlinePicker').style.display = 'block';
  notifyListeners();
}

function setAct(n) {
  currentAct = n;
  notifyListeners();
}

function addCard(name, count = 1) {
  deck[name] = (deck[name] || 0) + count;
  notifyListeners();
}

function adjustQty(name, delta) {
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

function setGold(v) {
  gold = v;
  document.getElementById('goldInput').value = v;
  notifyListeners();
}

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
  if (deck[baseName] && deck[baseName] > 0) {
    const upgradedName = baseName + '+';
    adjustQty(baseName, -1);
    addCard(upgradedName, 1);
  }
}
