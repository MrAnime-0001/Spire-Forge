// Act, ascension, and boss/region controls for STS2 Build Advisor.

let selectedBoss = null;

// Intent icons for pattern table display
// Keys match the pattern icon field used in REGION_DATA
const INTENT_ICONS = {
  Attack1:  {icon:'⚔', label:'Small atk', color:'#d06040'},
  Attack2:  {icon:'⚔', label:'Med atk', color:'#d06040'},
  Attack3:  {icon:'⚔', label:'Big atk', color:'#d06040'},
  Attack4:  {icon:'⚔', label:'Heavy atk', color:'#d06040'},
  Buff:     {icon:'↑', label:'Buff', color:'#80a060'},
  Debuff:   {icon:'↓', label:'Debuff', color:'#a060c0'},
  Defend:   {icon:'🛡', label:'Defend', color:'#6090c0'},
  Status:   {icon:'∅', label:'Status', color:'#c08040'},
  Sleep:    {icon:'💤', label:'Asleep', color:'#808080'},
  Stun:     {icon:'★', label:'Stun', color:'c0c060'},
  Heal:     {icon:'♥', label:'Heal', color:'#60c060'},
  ['Att+Buff']:   {icon:'⚔↑', label:'Atk+Buff', color:'#b09040'},
  ['Att+Debuff']: {icon:'⚔↓', label:'Atk+Debuff', color:'#b06080'},
  ['Att+Defend']: {icon:'⚔🛡', label:'Atk+Defend', color:'#a08060'},
  ['Attack2+Status']:{icon:'⚔∅', label:'Atk+Status',color:'#b07050'},
  ['Attack4+Status']:{icon:'⚔∅', label:'Hvy+Status',color:'#b07050'},
  ['Buff+Status']:{icon:'↑∅', label:'Buff+Status',color:'#a08050'},
  power:    {icon:'✦', label:'Passive', color:'#60a0c0'},
  cycle:    {icon:'↻', label:'Repeats', color:'#808080'},
  note:     {icon:'ℹ', label:'Note', color:'#808080'},
  phase:    {icon:'◆', label:'Phase', color:'#c08060'},
  divider:  null,
  spawn:    {icon:'◇', label:'Spawn', color:'#80a060'},
};

// Render icon for intent/power using local asset or badge
function renderIntentBadge(intent, text) {
  const idata = INTENT_ICONS[intent] || {icon:'?', color:'#808080'};
  return `<span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;border-radius:3px;background:${idata.color}22;color:${idata.color};font-size:9px;border:1px solid ${idata.color}44">${idata.icon}</span><span style="color:var(--text-dim)">${text}</span>`;
}

function renderPatternTable(pattern) {
  if (!pattern || pattern.length === 0) return '';
  let html = '<div style="margin:6px 0;font-family:\'Share Tech Mono\',monospace">';
  html += '<div style="font-size:8px;color:var(--text-muted);letter-spacing:.1em;text-transform:uppercase;margin-bottom:4px">attack pattern</div>';
  pattern.forEach(step => {
    const [iconKey, text] = step;
    if (iconKey === 'divider') {
      html += '<div style="border-top:1px dashed var(--border);margin:3px 0"></div>';
      return;
    }
    const intent = INTENT_ICONS[iconKey] || {icon:'?', label:'?', color:'#808080'};
    html += `<div style="display:flex;align-items:center;gap:4px;margin-bottom:2px;font-size:10px;line-height:1.35">`;
    if (iconKey === 'power') {
      // Check if we have a local icon for this power
      const powerImg = text.split(':')[0].toLowerCase().replace(/[^a-z]/g,'');
      const iconFiles = {slippery:'inky',plating:'plating',frail:'frail',weak:'weak',vulnerable:'vulnerable',strength:'strength',intangible:'intangible',block:'block',vigor:'vigor',sandpit:'sandpit',status:'status',plow:'plating',ringing:'frail',slow:'frail',skittish:'shiv',hardenedshell:'block',beckon:'status',infection:'status',wound:'status',burn:'status',frantic:'status',regen:'plating',reattach:'plating',crabrage:'strength',artifact:'block',hex:'soul',dampen:'frail',territorial:'soul',personalhive:'status',vitalspark:'energy-colorless'};
      const imgFile = iconFiles[powerImg];
      if (imgFile) {
        html += `<img src="assets/icons/${imgFile}.png" style="width:16px;height:16px;border-radius:2px;flex-shrink:0">`;
      } else {
        html += `<span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;border-radius:3px;background:${intent.color}22;color:${intent.color};font-size:9px;border:1px solid ${intent.color}44">${intent.icon}</span>`;
      }
      html += `<span style="color:${intent.color}"><strong>${text}</strong></span>`;
    } else {
      html += `<span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;border-radius:3px;background:${intent.color}22;color:${intent.color};font-size:9px;border:1px solid ${intent.color}44">${intent.icon}</span>`;
      if (iconKey === 'cycle' || iconKey === 'note') {
        html += `<span style="color:var(--text-muted);font-style:italic;opacity:.8">${text}</span>`;
      } else if (iconKey === 'phase') {
        html += `<span style="color:${intent.color}">${text}</span>`;
      } else {
        html += `<span style="color:var(--text-dim)">${text}</span>`;
      }
    }
    html += '</div>';
  });
  html += '</div>';
  return html;
}

function updateActUI() {
  [1,2,3].forEach(n => {
    document.getElementById('act'+n+'btn').classList.toggle('active', currentAct === n);
  });
  document.getElementById('actAdvice').textContent = ACT_ADVICE[currentAct - 1];
  if (selectedBoss) {
    const rk = BOSS_TO_REGION[selectedBoss];
    if (!rk || REGION_DATA[rk].act !== currentAct) selectedBoss = null;
  }
  renderBossAlert();
}

function updateAscUI() {
  for (let i = 0; i <= 10; i++) {
    const el = document.getElementById('asc' + i + 'btn');
    if (el) el.classList.toggle('active', currentAsc === i);
  }
  const asc = ASCENSION_DATA[currentAsc];
  const advEl = document.getElementById('ascAdvice');
  if (asc && advEl) {
    const color = currentAsc === 0 ? 'var(--text-dim)' : currentAsc >= 8 ? '#c06060' : 'var(--amber)';
    advEl.innerHTML = `<span style="color:${color}"><strong>${asc.name}</strong> \u2014 ${asc.modifier}</span>`;
  }
}

function renderBossAlert() {
  const el = document.getElementById('bossAlertBar');
  if (!el) return;
  if (!currentChar) { el.innerHTML = ''; return; }

  const actRegions = Object.entries(REGION_DATA).filter(([, rd]) => rd.act === currentAct);

  let html = `<div style="background:var(--surface);border:1px solid var(--border);border-radius:6px;padding:1.1rem">`;
  html += `<div style="font-family:'Share Tech Mono',monospace;font-size:10px;letter-spacing:.15em;text-transform:uppercase;color:var(--amber);opacity:.8;margin-bottom:.75rem">boss &amp; region</div>`;

  if (actRegions.length === 0) {
    html += `<div style="font-size:12px;color:var(--text-muted);font-style:italic">No regions mapped for Act ${currentAct} yet.</div>`;
    html += `</div>`;
    el.innerHTML = html;
    return;
  }

  actRegions.forEach(([rk, rd]) => {
    const isSelectedRegion = selectedBoss && BOSS_TO_REGION[selectedBoss] === rk;
    html += `<div style="margin-bottom:.5rem">`;
    html += `<div style="font-family:'Share Tech Mono',monospace;font-size:9px;color:${rd.color};letter-spacing:.1em;text-transform:uppercase;margin-bottom:.3rem;opacity:.9">${rd.label}</div>`;
    html += `<div style="display:flex;flex-wrap:wrap;gap:5px">`;
    Object.keys(rd.bosses).forEach(bname => {
      const sel = selectedBoss === bname;
      const safeName = bname.replace(/'/g, "\\'");
      html += `<button class="boss-btn${sel?' active':''}" style="${sel ? `border-color:${rd.color};color:${rd.color};background:${rd.color}1a` : ''}" onclick="setBoss('${safeName}')">${bname}</button>`;
    });
    html += `</div></div>`;
  });

  if (selectedBoss && BOSS_TO_REGION[selectedBoss]) {
    const rk = BOSS_TO_REGION[selectedBoss];
    const rd = REGION_DATA[rk];
    if (rd.act === currentAct) {
      const boss = rd.bosses[selectedBoss];
      html += `<div style="border-top:1px solid var(--border);margin-top:.6rem;padding-top:.7rem">`;
      html += `<div class="boss-bar" style="border-color:${rd.color}40;background:${rd.color}0d;margin-top:0">`;
      html += `<div class="boss-bar-title" style="color:${rd.color}">${selectedBoss} <span style="opacity:.6;font-size:8px">${boss.type}</span></div>`;
      if (boss.hp) html += `<div style="font-family:'Share Tech Mono',monospace;font-size:9px;color:var(--text-muted);letter-spacing:.06em;margin-bottom:4px">HP: <span style="color:${rd.color}">${boss.hp}</span></div>`;

      if (boss.pattern) html += renderPatternTable(boss.pattern);

      if (selectedBoss === 'The Insatiable' && currentChar) {
        const axes = calcSixAxes();
        const szp = getDeckSizeProfile();
        const total = getDeckSize();
        let insatWarnings = [];
        if (axes && axes.vel < 30 && total > 4) {
          insatWarnings.push(`\u26A0 Your velocity score is ${axes.vel}/100 \u2014 too low for this fight. You need consistent draw and energy to keep playing Frantic Escape cards before the Sandpit timer kills you.`);
        }
        if (szp.zone === 'bloated' || szp.zone === 'danger') {
          insatWarnings.push(`\u26A0 Your deck has ${szp.total} cards. A large deck reduces your chances of drawing Frantic Escape each turn. Thin it before this fight.`);
        }
        if (axes && axes.vel >= 40 && szp.zone === 'sweet') {
          insatWarnings.push(`\u2714 Velocity looks adequate for this fight. Confirm you have energy generation \u2014 Frantic Escape costs scale up each play.`);
        }
        const drawCards = (DRAW_CARDS[currentChar]||[]).filter(n=>deck[n]);
        const energyCards = (ENERGY_CARDS[currentChar]||[]).filter(n=>deck[n]);
        if (insatWarnings.length > 0) {
          html += `<div style="padding:6px 8px;border:1px solid rgba(192,64,64,.5);border-radius:3px;background:rgba(192,64,64,.1);margin-bottom:6px">`;
          html += `<div style="font-family:'Share Tech Mono',monospace;font-size:9px;color:#c06060;letter-spacing:.1em;text-transform:uppercase;margin-bottom:4px">\u2C64 TIMER BOSS \u2014 VELOCITY CHECK</div>`;
          insatWarnings.forEach(w => { html += `<div style="font-size:12px;color:${w.startsWith('\u2714')?'var(--green-bright)':'#c08060'};line-height:1.55;margin-bottom:3px">${w}</div>`; });
          if (drawCards.length > 0) html += `<div style="font-size:11px;color:var(--text-muted);margin-top:4px">draw in your deck: <span style="color:var(--amber)">${drawCards.join(', ')}</span></div>`;
          if (energyCards.length > 0) html += `<div style="font-size:11px;color:var(--text-muted)">energy in your deck: <span style="color:var(--amber)">${energyCards.join(', ')}</span></div>`;
          if ((DRAW_CARDS[currentChar]||[]).filter(n=>!deck[n]).length > 0) {
            html += `<div style="font-size:11px;color:var(--text-muted);margin-top:2px">missing draw options: <span style="color:var(--green-bright)">${(DRAW_CARDS[currentChar]||[]).filter(n=>!deck[n]).slice(0,4).join(', ')}</span></div>`;
          }
          html += `</div>`;
        }
      }

      html += `<div style="font-family:'Share Tech Mono',monospace;font-size:9px;color:var(--text-muted);letter-spacing:.06em;margin-bottom:2px;text-transform:uppercase">Strategy</div>`;
      html += `<div class="boss-bar-text" style="margin-bottom:6px">${boss.strategy}</div>`;
      if (boss.killOrder) {
        html += `<div style="font-family:'Share Tech Mono',monospace;font-size:9px;color:var(--text-muted);letter-spacing:.06em;margin-bottom:2px;text-transform:uppercase">Kill Order</div>`;
        html += `<div style="font-size:12px;color:${rd.color};line-height:1.5;font-style:italic">${boss.killOrder}</div>`;
      }

      const matrix = BOSS_MATRIX[selectedBoss];
      if (matrix) {
        html += `<div style="margin-top:8px;padding-top:8px;border-top:1px dashed ${rd.color}30">`;
        if (matrix.difficulty) {
          html += `<div style="font-family:'Share Tech Mono',monospace;font-size:9px;color:var(--text-muted);letter-spacing:.06em;margin-bottom:2px;text-transform:uppercase">difficulty</div>`;
          html += `<div style="font-size:11px;color:${rd.color};margin-bottom:6px;font-style:italic">${matrix.difficulty}</div>`;
        }
        if (matrix.killWindow) {
          html += `<div style="font-family:'Share Tech Mono',monospace;font-size:9px;color:var(--text-muted);letter-spacing:.06em;margin-bottom:2px;text-transform:uppercase">kill window</div>`;
          html += `<div style="font-size:11px;color:var(--text-dim);margin-bottom:6px">${matrix.killWindow}</div>`;
        }
        if (matrix.punishes) {
          html += `<div style="font-family:'Share Tech Mono',monospace;font-size:9px;color:#c06060;letter-spacing:.06em;margin-bottom:2px;text-transform:uppercase">punishes</div>`;
          html += `<ul style="margin:0 0 6px 1rem;padding:0;font-size:11px;color:#c88080;line-height:1.45">`;
          matrix.punishes.forEach(p => { html += `<li style="margin-bottom:1px">${p}</li>`; });
          html += `</ul>`;
        }
        if (matrix.rewards) {
          html += `<div style="font-family:'Share Tech Mono',monospace;font-size:9px;color:var(--green-bright);letter-spacing:.06em;margin-bottom:2px;text-transform:uppercase">rewards</div>`;
          html += `<ul style="margin:0 0 6px 1rem;padding:0;font-size:11px;color:#80b080;line-height:1.45">`;
          matrix.rewards.forEach(r => { html += `<li style="margin-bottom:1px">${r}</li>`; });
          html += `</ul>`;
        }

        const deckTags = detectDeckArchetypes(deck);
        if (deckTags.size > 0) {
          const punishedBy = [];
          const rewardedBy = [];
          const tagMap = {
            'heavy single-hit decks (Slippery wastes big swings)':['strength','block','forge'],
            'slow decks':['poison','doom','ethereal'],
            'slow scaling':['poison','doom','ethereal'],
            'slow decks (Strength ramp + Wound pollution)':['poison','doom'],
            'slow kills (Soul Siphon ruins stats)':['poison','doom','ethereal'],
            'raw damage-reliant decks':['strength','forge'],
            'card-heavy combos (Ringing = 1 card/turn)':['sly','shiv','claw'],
            'pure burst (wasted in Intangible)':['strength','forge','starfall'],
            'block-only (Beckons bypass block)':['block'],
            'Strength-based decks':['strength'],
            'Dex-based decks':['sly','shiv'],
            'pure Poison (Sandpit resolves before tick)':['poison'],
            'pure Poison/Doom (Intangible negates)':['poison','doom'],
            'draw-heavy decks (Mind Rot / Sloth)':['sly'],
            'high-energy-cost decks (Waste Away)':['big-deck'],
            'low energy generation':['big-deck','poison'],
            'low single-target damage':['shiv','poison','doom'],
            'draw-starved decks (Bound locks cards)':[],
            'card-dependent builds (Hunger drains energy)':['exhaust','infinite'],
            'draw-heavy builds (Scrutiny stops draw)':['exhaust','infinite'],
            'skill-reliant builds (Grasp blocks skills)':[],
            'no compressed lethal':[],
            'no-AoE decks':[],
            'no facing control':[],
            'single-target only':[],
            'kill-and-done decks with no final-turn cushion':[],
            'entering below 40 HP':[],
            'slow Phase 1 (Enrage ramps)':[],
            'wasteful turns in Phase 3 Intangible':['strength','forge','starfall'],
          };
          const rewardMap = {
            'multi-hit (Shivs, Anger, Twin Strike)':['shiv','strength'],
            'multi-hit to strip Plating':['shiv','sly'],
            'Weak application':['silent','shiv'],
            'fast cycling decks':['infinite','sly'],
            'fast decks':['infinite','sly'],
            'AoE (Whirlwind, Shockwave, Seven Stars)':['stars','strength'],
            'Poison (ticks all 3)':['poison'],
            'Poison, Doom, Shivs (bypass Str/Dex debuffs)':['poison','doom','shiv'],
            'Poison (ticks regardless of debuffs)':['poison'],
            'hard burst ignoring Followers':['strength','forge','starfall'],
            'Silent Sly-discard hands':['sly'],
            'Exhaust to clear Beckons':['exhaust'],
            'Discard/cycle engines':['sly'],
            'Plow threshold burst to stun':['strength','forge','starfall','infinite'],
            'single big hit each turn':['strength','forge'],
            'Strength stacking':['strength'],
            'fast burst':['infinite','sly','claw'],
            'high energy generation':['infinite','sly','orb'],
            'draw-spam decks':['sly'],
            '4+ cards per turn decks':['sly','infinite','claw'],
            'burst that kills in 5-6 turns':['strength','forge','starfall','infinite'],
            'consistent damage per turn':['poison','doom'],
            'draw-independent builds':['block','strength'],
            'balanced single-target':[],
            'targeting cards to face the attacker':[],
            'Silent/Defect high-tempo':['sly','orb'],
            'fast Phase 1 kill':['strength','burst'],
            'burst held for Phase 2':['starfall','forge'],
            'sustain + patience for Phase 3 windows':['block','poison','doom'],
            'compressed burst winning in each window':['infinite','starfall','forge'],
            'Persistent DoT between phases':['poison','doom'],
            'any damage type that carries through form changes':[],
            'Wound-exhaust synergies':['exhaust'],
          };
          matrix.punishes.forEach(p => {
            const tags = tagMap[p] || [];
            const matched = tags.filter(t => deckTags.has(t));
            if (matched.length > 0) punishedBy.push({text:p, tags:matched});
          });
          matrix.rewards.forEach(r => {
            const tags = rewardMap[r] || [];
            const matched = tags.filter(t => deckTags.has(t));
            if (matched.length > 0) rewardedBy.push({text:r, tags:matched});
          });
          if (punishedBy.length > 0 || rewardedBy.length > 0) {
            html += `<div style="margin-top:6px;padding:6px 8px;border:1px solid ${rd.color}30;border-radius:3px;background:${rd.color}08">`;
            html += `<div style="font-family:'Share Tech Mono',monospace;font-size:9px;color:${rd.color};letter-spacing:.06em;margin-bottom:3px;text-transform:uppercase">deck matchup</div>`;
            if (rewardedBy.length > 0) {
              html += `<div style="font-size:11px;color:var(--green-bright);margin-bottom:3px">\u2714 Your deck is favoured: <em>${rewardedBy.map(r=>r.tags.join('/')).join(', ')}</em></div>`;
            }
            if (punishedBy.length > 0) {
              html += `<div style="font-size:11px;color:#c08060">\u26A0 Watch out \u2014 this boss punishes: <em>${punishedBy.map(p=>p.tags.join('/')).join(', ')}</em></div>`;
            }
            html += `</div>`;
          }
        }
        html += `</div>`;
      }
      html += `</div>`;

      const elites = rd.elites;
      if (Object.keys(elites).length > 0) {
        html += `<div style="font-family:'Share Tech Mono',monospace;font-size:9px;color:var(--text-muted);letter-spacing:.1em;text-transform:uppercase;margin:.6rem 0 .3rem">${rd.label} elites</div>`;
        Object.entries(elites).forEach(([ename, elite]) => {
          html += `<div style="padding:.45rem .7rem;border-radius:3px;border:1px solid ${rd.color}25;background:${rd.color}08;margin-bottom:.35rem">`;
          html += `<div style="font-family:'Share Tech Mono',monospace;font-size:9px;color:${rd.color};letter-spacing:.06em;margin-bottom:4px">${ename} <span style="opacity:.5;font-size:8px">${elite.type}</span></div>`;
          if (elite.hp) html += `<div style="font-family:'Share Tech Mono',monospace;font-size:9px;color:var(--text-muted);letter-spacing:.06em;margin-bottom:4px">HP: <span style="color:${rd.color}">${elite.hp}</span></div>`;
          if (elite.pattern) html += renderPatternTable(elite.pattern);
          html += `<div style="font-family:'Share Tech Mono',monospace;font-size:9px;color:var(--text-muted);letter-spacing:.06em;margin-bottom:2px;text-transform:uppercase">Strategy</div>`;
          html += `<div style="font-size:12px;color:var(--text-dim);line-height:1.5;margin-bottom:6px">${elite.strategy}</div>`;
          if (elite.killOrder) {
            html += `<div style="font-family:'Share Tech Mono',monospace;font-size:9px;color:var(--text-muted);letter-spacing:.06em;margin-bottom:2px;text-transform:uppercase">Kill Order</div>`;
            html += `<div style="font-size:12px;color:${rd.color};line-height:1.5;font-style:italic">${elite.killOrder}</div>`;
          }
          html += `</div>`;
        });
      }
      html += `</div>`;
    }
  }

  html += `</div>`;
  el.innerHTML = html;
}

function setBoss(name) {
  if (selectedBoss === name) {
    selectedBoss = null;
  } else {
    selectedBoss = name;
    const rk = BOSS_TO_REGION[name];
    if (rk && REGION_DATA[rk]) {
      const regionAct = REGION_DATA[rk].act;
      if (regionAct !== currentAct) {
        currentAct = regionAct;
        syncAscendersBane();
        updateActUI();
        updateResult();
      }
    }
  }
  renderBossAlert();
  autoSave();
}
