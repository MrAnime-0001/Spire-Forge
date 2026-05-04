// Save, load, autosave, export, and import helpers for STS2 Build Advisor.

const SAVE_KEY = 'sts2_loadouts';

function getSavedLoadouts() {
  try { return JSON.parse(localStorage.getItem(SAVE_KEY) || '[]'); } catch { return []; }
}

function setSavedLoadouts(list) {
  localStorage.setItem(SAVE_KEY, JSON.stringify(list));
}

function openSaveModal() {
  if (!currentChar || getDeckSize() === 0) { alert('Add cards to your deck before saving.'); return; }
  const el = document.getElementById('saveNameInput');
  el.value = '';
  el.style.borderColor = 'var(--border-bright)';
  document.getElementById('saveOverlay').classList.remove('hidden');
  setTimeout(() => el.focus(), 50);
}

function closeSaveModal() { document.getElementById('saveOverlay').classList.add('hidden'); }

function confirmSave() {
  const name = document.getElementById('saveNameInput').value.trim();
  if (!name) {
    document.getElementById('saveNameInput').style.borderColor = 'var(--ember)';
    return;
  }
  const list = getSavedLoadouts();
  list.unshift({
    name,
    char: currentChar,
    act: currentAct,
    hp: document.getElementById('hpCur').value,
    hpMax: document.getElementById('hpMax').value,
    deck: {...deck},
    saved: new Date().toLocaleDateString()
  });
  // Keep max 20 saves
  if (list.length > 20) list.pop();
  setSavedLoadouts(list);
  closeSaveModal();
}

function openLoadModal() {
  renderLoadBody();
  document.getElementById('loadOverlay').classList.remove('hidden');
}

function closeLoadModal() { document.getElementById('loadOverlay').classList.add('hidden'); }

function renderLoadBody() {
  const body = document.getElementById('loadBody');
  const list = getSavedLoadouts();
  if (list.length === 0) {
    body.innerHTML = '<p style="font-size:13px;color:var(--text-muted);font-style:italic">No saved loadouts yet. Save your current deck using the save button.</p>';
    return;
  }
  const charLabel = {ironclad:'Ironclad',silent:'Silent',defect:'Defect',necrobinder:'Necrobinder',regent:'Regent'};
  body.innerHTML = list.map((s, i) => {
    const total = Object.values(s.deck||{}).reduce((a,b)=>a+b,0);
    return `<div class="loadout-item">
      <div style="flex:1">
        <div class="loadout-name">${s.name}</div>
        <div class="loadout-meta">${charLabel[s.char]||s.char} &bull; Act ${s.act} &bull; ${total} cards &bull; ${s.saved||''}</div>
      </div>
      <button class="footer-btn primary" onclick="confirmLoad(${i})" style="padding:5px 10px;font-size:9px">load</button>
      <button class="footer-btn ghost" onclick="deleteSave(${i})" style="padding:5px 8px;font-size:9px;border-color:rgba(192,64,64,.4);color:#c06060">✕</button>
    </div>`;
  }).join('');
}

function confirmLoad(i) {
  const list = getSavedLoadouts();
  const s = list[i];
  if (!s) return;
  currentChar = s.char;
  currentAct = s.act || 1;
  deck = {...(s.deck||{})};
  document.querySelectorAll('.char-btn').forEach(b => b.classList.remove('active'));
  const cb = document.getElementById('char-' + currentChar);
  if (cb) cb.classList.add('active');
  document.getElementById('hpCur').value = s.hp || CHAR_HP[currentChar] || 80;
  document.getElementById('hpMax').value = s.hpMax || CHAR_HP[currentChar] || 80;
  document.getElementById('mainUI').style.display = 'block';
  document.getElementById('inlinePicker').style.display = 'block';
  updateActUI();
  renderDeckList();
  updateResult();
  updatePriorityPanel();
  renderPickerList();
  closeLoadModal();
  autoSave();
}

function deleteSave(i) {
  const list = getSavedLoadouts();
  list.splice(i, 1);
  setSavedLoadouts(list);
  renderLoadBody();
}

const AUTO_SAVE_KEY = 'sts2_session';

let _autoSaveTimer = null;

function autoSave() {
  clearTimeout(_autoSaveTimer);
  _autoSaveTimer = setTimeout(function() {
    if (!currentChar) return;
    try {
      localStorage.setItem(AUTO_SAVE_KEY, JSON.stringify({
        char: currentChar,
        act: currentAct,
        asc: currentAsc,
        deck: Object.assign({}, deck),
        hp: document.getElementById('hpCur').value,
        hpMax: document.getElementById('hpMax').value,
        boss: selectedBoss,
        ts: Date.now()
      }));
    } catch(e) {}
  }, 600);
}

function autoRestore() {
  try {
    var raw = localStorage.getItem(AUTO_SAVE_KEY);
    if (!raw) return;
    var s = JSON.parse(raw);
    if (!s || !s.char || !s.deck) return;
    if (s.ts && Date.now() - s.ts > 86400000) { localStorage.removeItem(AUTO_SAVE_KEY); return; }
    currentChar = s.char;
    currentAct = s.act || 1;
    currentAsc = s.asc || 0;
    deck = Object.assign({}, s.deck);
    selectedBoss = s.boss || null;
    document.querySelectorAll('.char-btn').forEach(function(b){ b.classList.remove('active'); });
    var charBtn = document.getElementById('char-' + currentChar);
    if (charBtn) charBtn.classList.add('active');
    if (s.hp) document.getElementById('hpCur').value = s.hp;
    if (s.hpMax) document.getElementById('hpMax').value = s.hpMax;
    document.getElementById('mainUI').style.display = 'block';
    document.getElementById('inlinePicker').style.display = 'block';
    updateActUI();
    updateAscUI();
    renderDeckList();
    updateResult();
    updatePriorityPanel();
    renderPickerList();
    renderBossAlert();
    _showRestoreToast(s);
  } catch(e) {}
}

function _showRestoreToast(s) {
  var charLabel = {ironclad:'Ironclad',silent:'Silent',defect:'Defect',necrobinder:'Necrobinder',regent:'Regent'};
  var total = Object.values(s.deck||{}).reduce(function(a,b){return a+b;},0);
  var when = s.ts ? new Date(s.ts).toLocaleTimeString() : '';
  var toast = document.createElement('div');
  toast.id = 'restoreToast';
  toast.innerHTML = '<strong style="color:var(--amber-bright)">Session restored</strong> &mdash; ' +
    (charLabel[s.char]||s.char) + ' &bull; Act ' + (s.act||1) + ' &bull; ' + total + ' cards' +
    (when ? ' &bull; saved ' + when : '') +
    ' <button onclick="clearAutoSave()" style="background:none;border:1px solid rgba(200,146,42,.4);border-radius:2px;color:var(--text-muted);font-family:\'Share Tech Mono\',monospace;font-size:9px;cursor:pointer;padding:2px 7px;margin-left:10px;letter-spacing:.05em">DISMISS</button>';
  toast.style.cssText = 'position:fixed;bottom:1.5rem;right:1.5rem;background:#1f1c15;border:1px solid var(--amber);border-radius:5px;padding:.75rem 1.1rem;font-size:12px;color:var(--text);z-index:200;max-width:420px;line-height:1.5;box-shadow:0 4px 20px rgba(0,0,0,.5);transition:opacity .4s;';
  document.body.appendChild(toast);
  setTimeout(function(){ toast.style.opacity='0'; setTimeout(function(){ if(toast.parentNode) toast.remove(); }, 420); }, 6000);
}

function clearAutoSave() {
  localStorage.removeItem(AUTO_SAVE_KEY);
  var toast = document.getElementById('restoreToast');
  if (toast) { toast.style.opacity='0'; setTimeout(function(){ if(toast.parentNode) toast.remove(); }, 420); }
}

function exportDeck() {
  if (!currentChar || getDeckSize() === 0) {
    alert('Add cards to your deck before exporting.');
    return;
  }
  const data = {
    version: 1,
    char: currentChar,
    act: currentAct,
    hp: document.getElementById('hpCur').value,
    hpMax: document.getElementById('hpMax').value,
    deck: deck,
    exported: new Date().toISOString()
  };
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const charName = currentChar.charAt(0).toUpperCase() + currentChar.slice(1);
  a.href = url;
  a.download = 'sts2-' + currentChar + '-act' + currentAct + '-' + new Date().toISOString().slice(0,10) + '.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function importDeckClick() {
  document.getElementById('importFileInput').value = '';
  document.getElementById('importFileInput').click();
}

function importDeckFile(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);
      if (!data.char || !data.deck) throw new Error('Invalid file format.');
      // Apply the imported state
      currentChar = data.char;
      deck = data.deck;
      currentAct = data.act || 1;
      document.querySelectorAll('.char-btn').forEach(b => b.classList.remove('active'));
      const charBtn = document.getElementById('char-' + currentChar);
      if (charBtn) charBtn.classList.add('active');
      if (data.hp) document.getElementById('hpCur').value = data.hp;
      if (data.hpMax) document.getElementById('hpMax').value = data.hpMax;
      document.getElementById('mainUI').style.display = 'block';
      document.getElementById('inlinePicker').style.display = 'block';
      updateActUI();
      renderDeckList();
      updateResult();
      updatePriorityPanel();
      renderPickerList();
    } catch(err) {
      alert('Could not import file: ' + err.message);
    }
  };
  reader.readAsText(file);
}
