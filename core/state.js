// Shared run state and state-changing entry points for STS2 Build Advisor.

let currentChar = null;

let currentAct = 1;

let currentAsc = 0; // ascension level 0-10

let deck = {}; // card name -> count

let gold = 0;

let hpCur = 0;

let hpMax = 0;

function setAsc(n) {
  currentAsc = n;
  updateAscUI();
  updateResult();
  renderBossAlert();
  autoSave();
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
  updateActUI();
  renderDeckList();
  updateResult();
  updatePriorityPanel();
  renderPickerList();
  autoSave();
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
  updateActUI();
  renderDeckList();
  updateResult();
  updatePriorityPanel();
  renderPickerList();
  autoSave();
}

function setAct(n) {
  currentAct = n;
  updateActUI();
  updateResult();
  autoSave();
}

function addCard(name, count = 1) {
  deck[name] = (deck[name] || 0) + count;
  renderDeckList();
  updateResult();
  updatePriorityPanel();
  if (document.getElementById('inlinePicker').style.display !== 'none') renderPickerList();
  autoSave();
}

function adjustQty(name, delta) {
  deck[name] = Math.max(0, (deck[name] || 0) + delta);
  if (deck[name] === 0) delete deck[name];
  renderDeckList();
  updateResult();
  updatePriorityPanel();
  if (document.getElementById('inlinePicker').style.display !== 'none') renderPickerList();
  autoSave();
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
  updateGoldAdvice();
}

function setHP(cur, max) {
  hpCur = cur;
  if (max !== undefined) hpMax = max;
  document.getElementById('hpCur').value = hpCur;
  if (max !== undefined) document.getElementById('hpMax').value = hpMax;
}

function removeCard(cardName) {
  adjustQty(cardName, -1);
}
