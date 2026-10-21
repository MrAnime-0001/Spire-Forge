// Save, load, autosave, export, and import helpers for STS2 Build Advisor.

const SAVE_KEY = 'sts2_loadouts';
const MAX_SAVES = 20;
const CHAR_LABEL = {ironclad:'Ironclad',silent:'Silent',defect:'Defect',necrobinder:'Necrobinder',regent:'Regent'};

function getSavedLoadouts() {
  try {
    const list = JSON.parse(localStorage.getItem(SAVE_KEY) || '[]');
    return Array.isArray(list) ? list : [];
  } catch { return []; }
}

// false when storage is blocked or full.
function setSavedLoadouts(list) {
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(list)); return true; } catch { return false; }
}

// The current run as a plain object: what saves, autosave, export and undo store.
function currentRun() {
  return {
    char: currentChar,
    act: currentAct,
    region: startRegion,
    asc: currentAsc,
    hp: document.getElementById('hpCur').value,
    hpMax: document.getElementById('hpMax').value,
    deck: Object.assign({}, deck),
    relics: relics.slice(),
    boss: selectedBoss
  };
}

const _has = (o, k) => Object.prototype.hasOwnProperty.call(o, k);
const _int = (v, lo, hi, dflt) => { const n = Math.floor(Number(v)); return n >= lo && n <= hi ? n : dflt; };

// Validate untrusted run data (import file, localStorage) into a clean run object.
// Unknown cards and relics are dropped, counts clamped; throws on a bad character or deck.
function normalizeRun(d) {
  if (!d || typeof d !== 'object' || !d.deck || typeof d.deck !== 'object') throw new Error('Invalid file format.');
  if (typeof d.char !== 'string' || !_has(CHAR_HP, d.char)) throw new Error('Unknown character "' + String(d.char).slice(0, 20) + '".');
  const cleanDeck = {};
  Object.keys(d.deck).forEach(name => {
    const n = _int(d.deck[name], 1, Infinity, 0);
    if (n && findCard(name)) cleanDeck[name] = Math.min(n, 99);
  });
  if (!Object.keys(cleanDeck).length && Object.keys(d.deck).length) throw new Error('No known cards in file.');
  const hp = CHAR_HP[d.char];
  return {
    char: d.char,
    act: _int(d.act, 1, 3, 1),
    region: typeof d.region === 'string' ? d.region : null,
    asc: _int(d.asc, 0, 10, 0),
    hp: _int(d.hp, 1, 999, hp),
    hpMax: _int(d.hpMax, 1, 999, hp),
    deck: cleanDeck,
    relics: Array.isArray(d.relics) ? d.relics.filter(r => typeof r === 'string' && r.length <= 60) : [],
    boss: typeof d.boss === 'string' && _has(BOSS_TO_REGION, d.boss) ? d.boss : null
  };
}

// Apply a normalized run (load, autosave, import, undo) and redraw everything.
function applyRun(s) {
  currentChar = s.char;
  currentAct = s.act;
  restoreRegion(s.region);
  currentAsc = s.asc;
  deck = Object.assign({}, s.deck);
  syncAscendersBane();
  relics = s.relics.slice();
  selectedBoss = s.boss;
  rewardOffered = [];
  _prevBuildCompletion = {};
  document.querySelectorAll('.char-btn').forEach(b => b.classList.toggle('active', b.id === 'char-' + currentChar));
  document.getElementById('hpCur').value = s.hp;
  document.getElementById('hpMax').value = s.hpMax;
  document.getElementById('mainUI').style.display = 'block';
  document.getElementById('inlinePicker').style.display = 'block';
  if (typeof updateHpBar === 'function') updateHpBar();
  notifyListeners();
  applyRunView();
}

// Toast with an Undo button that puts back the run as it was before `label` happened.
function offerUndo(label, snap) {
  toast(label, {actions: [{label: 'Undo', fn: () => { applyRun(snap); autoSave(); }}]});
}

function openSaveModal() {
  if (!currentChar || getDeckSize() === 0) { toast('Add cards to your deck before saving.', {type: 'error'}); return; }
  const el = document.getElementById('saveNameInput');
  el.value = '';
  el.classList.remove('invalid');
  document.getElementById('saveOverlay').showModal();
  el.focus();
}

function closeSaveModal() { document.getElementById('saveOverlay').close(); }

function confirmSave() {
  const el = document.getElementById('saveNameInput');
  const name = el.value.trim();
  if (!name) { el.classList.add('invalid'); el.focus(); return; }
  const list = getSavedLoadouts();
  list.unshift(Object.assign(currentRun(), {name, saved: new Date().toLocaleDateString()}));
  const dropped = list.length > MAX_SAVES ? list.splice(MAX_SAVES) : [];
  if (!setSavedLoadouts(list)) { toast('Could not save — browser storage is full or blocked.', {type: 'error'}); return; }
  closeSaveModal();
  if (dropped.length) toast('Oldest loadout "' + dropped[0].name + '" removed (limit ' + MAX_SAVES + ').');
  if (window.playRunCard) playRunCard('saved', name);
}

function openLoadModal() {
  renderLoadBody();
  document.getElementById('loadOverlay').showModal();
}

function closeLoadModal() { document.getElementById('loadOverlay').close(); }

function renderLoadBody() {
  const body = document.getElementById('loadBody');
  const list = getSavedLoadouts();
  if (list.length === 0) {
    body.innerHTML = '<p class="empty-note">No saved loadouts yet. Save your current deck using the save button.</p>';
    return;
  }
  body.innerHTML = list.map((s, i) => {
    const total = Object.values(s.deck || {}).reduce((a, b) => a + (Number(b) || 0), 0);
    const name = esc(s.name || 'Untitled');
    return `<div class="loadout-item">
      <div style="flex:1;min-width:0">
        <div class="loadout-name">${name}</div>
        <div class="loadout-meta">${esc(CHAR_LABEL[s.char] || s.char)} &bull; ${regionText(s)} &bull; ${total} cards &bull; ${esc(s.saved || '')}</div>
      </div>
      <button type="button" class="footer-btn primary" onclick="confirmLoad(${i})">load</button>
      <button type="button" class="footer-btn ghost danger" onclick="deleteSave(${i})" aria-label="Delete ${name}">✕</button>
    </div>`;
  }).join('');
}

function confirmLoad(i) {
  const s = getSavedLoadouts()[i];
  if (!s) return;
  let run;
  try { run = normalizeRun(s); } catch (err) { toast('Could not load "' + s.name + '": ' + err.message, {type: 'error'}); return; }
  const snap = currentChar ? currentRun() : null;
  closeLoadModal();
  applyRun(run);
  autoSave();
  if (window.playRunCard) playRunCard('loaded', s.name);
  if (snap) offerUndo('Loaded "' + s.name + '".', snap);
}

// "Act 1 · Underdock" / "Act 2 · Hive"; just "Act 1" when an old save has no start region.
function regionText(s) {
  var act = s.act || 1;
  var rk = act === 1 ? s.region : Object.keys(REGION_DATA).find(function(k) { return REGION_DATA[k].act === act; });
  var rd = rk && _has(REGION_DATA, rk) && REGION_DATA[rk];
  return 'Act ' + act + (rd ? ' &middot; ' + rd.label : '');
}

function deleteSave(i) {
  const list = getSavedLoadouts();
  const [gone] = list.splice(i, 1);
  if (!gone || !setSavedLoadouts(list)) return;
  renderLoadBody();
  toast('Deleted "' + gone.name + '".', {actions: [{label: 'Undo', fn: () => {
    const l = getSavedLoadouts();
    l.splice(i, 0, gone);
    setSavedLoadouts(l);
    if (document.getElementById('loadOverlay').open) renderLoadBody();
  }}]});
}

const AUTO_SAVE_KEY = 'sts2_session';

let _autoSaveTimer = null;

function autoSave() {
  clearTimeout(_autoSaveTimer);
  _autoSaveTimer = setTimeout(function() {
    if (!currentChar) return;
    try { localStorage.setItem(AUTO_SAVE_KEY, JSON.stringify(Object.assign(currentRun(), {ts: Date.now()}))); } catch (e) {}
  }, 600);
}

function autoRestore() {
  let s;
  try {
    s = JSON.parse(localStorage.getItem(AUTO_SAVE_KEY));
    if (!s) return;
    if (s.ts && Date.now() - s.ts > 86400000) { clearAutoSave(); return; }
    s = Object.assign(normalizeRun(s), {ts: s.ts});
  } catch (e) { clearAutoSave(); return; }
  applyRun(s);
  _showRestoreToast(s);
  // Welcome-back card. autoRestore runs during page parse, before the card code exists.
  document.addEventListener('DOMContentLoaded', function() { if (window.playRunCard) playRunCard('continued'); });
}

function _showRestoreToast(s) {
  var total = Object.values(s.deck).reduce(function(a, b) { return a + b; }, 0);
  var when = s.ts ? ' · saved ' + new Date(s.ts).toLocaleTimeString() : '';
  toast(CHAR_LABEL[s.char] + ' · ' + regionText(s).replace('&middot;', '·') + ' · ' + total + ' cards' + when, {
    title: 'Session restored',
    ms: 6000,
    actions: [{label: 'Discard', fn: function() {
      var snap = currentRun();
      clearAutoSave();
      resetRun(true);
      offerUndo('Session discarded.', snap);
    }}]
  });
}

function clearAutoSave() {
  try { localStorage.removeItem(AUTO_SAVE_KEY); } catch (e) {}
}

function exportDeck() {
  if (!currentChar || getDeckSize() === 0) { toast('Add cards to your deck before exporting.', {type: 'error'}); return; }
  if (typeof Blob === 'undefined' || typeof URL === 'undefined') {
    toast('Export not supported in this browser/context. Try opening via localhost.', {type: 'error'});
    return;
  }
  const data = Object.assign({version: 2}, currentRun(), {exported: new Date().toISOString()});
  const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'sts2-' + currentChar + '-act' + currentAct + '-' + new Date().toISOString().slice(0, 10) + '.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toast('Exported ' + a.download);
}

function importDeckClick() {
  document.getElementById('importFileInput').value = '';
  document.getElementById('importFileInput').click();
}

function importDeckFile(event) {
  const file = event.target.files[0];
  if (!file) return;
  if (typeof FileReader === 'undefined') {
    toast('Import not supported in this browser/context. Try opening via localhost.', {type: 'error'});
    return;
  }
  const reader = new FileReader();
  reader.onload = function(e) {
    let run;
    try { run = normalizeRun(JSON.parse(e.target.result)); }
    catch (err) { toast(err.message, {title: 'Could not import file', type: 'error'}); return; }
    const snap = currentChar ? currentRun() : null;
    applyRun(run);
    autoSave();
    if (window.playRunCard) playRunCard('imported', file.name.replace(/\.json$/i, ''));
    if (snap) offerUndo('Imported ' + file.name + '.', snap);
  };
  reader.readAsText(file);
}
