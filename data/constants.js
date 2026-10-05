// Shared constants and lookup tables for STS2 Build Advisor.
// Keep this file data-only.

// Phase 8: act-scaling targets for the 6 axes (0–100 scale)
// Derived from real STS2 DPT/BPT research: score = min(100, round(DPT * 2))
// Defense targets ~60% of attack — killing is the primary win condition.
// A0-A4 baseline: Act1 DPT 8-14 (mid 11), Act2 DPT 18-28 (mid 23), Act3 DPT 35-55 (mid 45)
const AXIS_TARGETS = {
  1: { Attack: 22, Defense: 14, Scaling: 15, Consistency: 20, Efficiency: 25, Synergy: 10 },
  2: { Attack: 46, Defense: 28, Scaling: 30, Consistency: 40, Efficiency: 35, Synergy: 35 },
  3: { Attack: 90, Defense: 48, Scaling: 55, Consistency: 55, Efficiency: 45, Synergy: 60 }
};

const DECK_THRESHOLDS = {
  lean: 10,
  healthyMin: 15,
  bloated: 25,
  tooLarge: 30,
  velocityThreshold: 20,
  heavyAtkPct: 45,
  heavyAtkDiff: 15,
  heavyAtkSclDiff: 10,
  heavyDefPct: 40,
  heavyDefDiff: 15,
  heavySclPct: 45,
  heavySclDiff: 15,
  lowVelScore: 25,
  lowVelMinDeck: 8,
  // Per-turn output thresholds. Atk/Def measure estimated single-turn output
  // (3 energy, 5 draws). Starter deck gives Atk~12, Def~10.
  lowBlkScore: 16,
  lowDmgScore: 22,
  heavyAtkBlkReq: 20,
  heavyDefDmgReq: 20,
  heavySclDmgReq: 18,
  // Act 1 sub-tier boundaries for survival/scaling rebalance
  act1PhaseAEnd: 16,
  act1PhaseBEnd: 22,
  act1EarlyDeckMax: 14,
  survivalCrisisThreshold: 0.5
};

const ACT_ADVICE = [
  "Sprint to 100 damage in 3 turns. Fight 3+ Elites. Take almost every card reward.",
  "Find your scaling engine now. Start skipping cards that don't fit your archetype.",
  "Reduce variance. Remove Strikes and Defends. Only take cards that fix disaster hands."
];


// ============================================================
// ASCENSION DATA (StS2 uses 10 levels, not 20)
// ============================================================
const ASCENSION_DATA = [
  {level:0, name:'Base',            modifier:'Normal difficulty',                                                       hpMult:1.00, dmgAdd:0},
  {level:1, name:'Swarming Elites', modifier:'Elites spawn more often',                                                  hpMult:1.00, dmgAdd:0},
  {level:2, name:'Weary Traveler',  modifier:'Ancients heal only 80% of missing HP',                                     hpMult:1.00, dmgAdd:0},
  {level:3, name:'Poverty',         modifier:'Enemies/chests drop 25% less gold',                                        hpMult:1.00, dmgAdd:0},
  {level:4, name:'Tight Belt',      modifier:'-1 potion slot at run start',                                              hpMult:1.00, dmgAdd:0},
  {level:5, name:"Ascender's Bane", modifier:"Start with Ascender's Bane curse",                                         hpMult:1.00, dmgAdd:0},
  {level:6, name:'Inflation',       modifier:'Merchant removal starts at 100g, +50g each use (replaced Gloom in v0.102)',hpMult:1.00, dmgAdd:0},
  {level:7, name:'Scarcity',        modifier:'Rare + Upgraded cards in rewards 50% less often',                          hpMult:1.00, dmgAdd:0},
  {level:8, name:'Tough Enemies',   modifier:'All enemies gain +3-8% HP',                                                hpMult:1.05, dmgAdd:0},
  {level:9, name:'Deadly Enemies',  modifier:'All enemies deal +1-3 more damage per attack',                             hpMult:1.05, dmgAdd:2},
  {level:10,name:'Double Boss',     modifier:'Act 3 ends with two bosses back-to-back, no rest',                         hpMult:1.05, dmgAdd:2}
];

// ============================================================
// NEW SCORING DATA — boss tags, act scaling, anti-synergy
// ============================================================

// Cards that are strong in Act 1 but actively fall off by Act 3
const ACT_CARRY_FALLOFF = new Set([
  'Shrug It Off','Poisoned Stab','Ball Lightning','Solar Strike',
  'Bodyguard','Perfected Strike','Thunderclap','Dagger Spray',
  'Slice','Deflect','Iron Wave','Dodge and Roll','Sucker Punch',
  'Leading Strike','Setup Strike','Tremble','Armaments',
]);

// Anti-synergy: cards that actively hurt a detected archetype
// Key = archetype tag from detectDeckArchetypes
// Value = card names that clash with that archetype
const ARCHETYPE_ANTI_SYNERGY = {
  exhaust:   ['Battle Trance'],
  infinite:  ['Battle Trance'],
  osty:      ['Bone Shards'],
  block:     ['Brimstone'],
  doom:      ['Defy','Defile','Call of the Void'],
  sly:       ['Impervious','Barricade'],
  claw:      ['Genetic Algorithm'],
};

// ============================================================
// SYNERGY PAIRS — context-aware bonuses when partner is in deck
// bond: 'Enable'|'Amplify'|'Finisher'|'Loop'
// bonus: score points added when partner already in deck
// ============================================================

const BOSS_MATRIX = {
  // Act 1
  'Ceremonial Beast': {
    punishes:['slow scaling','card-heavy combos (Ringing = 1 card/turn)'],
    rewards: ['Plow threshold burst to stun','single big hit each turn','Strength stacking'],
    difficulty: 'Easiest Act 1 boss',
    killWindow: 'Cross 150 HP by turn 3-4 to stun it. Phase 2 is longer.'
  },
  'The Kin': {
    punishes:['single-target only','no AoE'],
    rewards: ['hard single-target burst on the Priest','AoE and Thorns vs three multi-hitters','damage/block that ignores Weak and Frail (Poison, Feel No Pain)'],
    difficulty: 'Medium',
    killWindow: '≤5 turns — all three keep stacking Strength'
  },
  'Vantom': {
    punishes:['heavy single-hit decks (Slippery wastes big swings)','slow decks (Strength ramp + Wound pollution)','entering below 40 HP'],
    rewards: ['multi-hit (Shivs, Anger, Twin Strike)','fast cycling decks','Wound-exhaust synergies'],
    difficulty: 'Hardest Act 1 boss',
    killWindow: '≤4 cycles before Str makes Dismember lethal. SKIP ELITES under 40 HP.'
  },
  'Lagavulin Matriarch': {
    punishes:['slow kills (each Soul Siphon: -2 Str, -2 Dex)','multi-hit and many small blocks'],
    rewards: ['3 free setup turns for powers','big single hits and big single blocks','Poison/Doom (ignore Str loss)'],
    difficulty: 'Hard',
    killWindow: '≤5 turns after wake — each Soul Siphon compounds'
  },
  'Soul Fysh': {
    punishes:['burst wasted into Fade (Intangible)','decks that can\'t get rid of Beckons','low block after Scream (3 Vulnerable)'],
    rewards: ['Silent Sly-discard hands','Exhaust to clear Beckons','Discard/cycle engines'],
    difficulty: 'Medium-Hard',
    killWindow: '≤6 — Beckon flood accelerates'
  },
  'Waterfall Giant': {
    punishes:['kill-and-done decks with no final-turn cushion'],
    rewards: ['30+ block buffer on kill turn','Poison/Doom to finish during invuln'],
    difficulty: 'Medium',
    killWindow: '≤4-5 cycles. Save block for the death explosion.'
  },
  // Act 2
  'Knowledge Demon': {
    punishes:['slow decks','draw-heavy decks (Mind Rot / Sloth)','high-energy-cost decks (Waste Away)'],
    rewards: ['burst that kills in 5-6 turns','consistent damage per turn','draw-independent builds'],
    difficulty: 'Biggest Act 2 wall',
    killWindow: '≤6 turns before curse stack makes the fight unwinnable'
  },
  'Kaiser Crab': {
    punishes:['low single-target damage','no facing control'],
    rewards: ['balanced single-target','targeting cards to face the attacker','Silent/Defect high-tempo'],
    difficulty: 'Medium-Hard',
    killWindow: 'Kill Rocket Claw first (faster scaler). Then the other.'
  },
  'The Insatiable': {
    punishes:['pure Poison (Sandpit resolves before tick)','slow scaling','low energy generation'],
    rewards: ['fast burst','high energy generation','draw + energy to play Frantic Escapes'],
    difficulty: 'Timer-capped (Sandpit = 4-turn death)',
    killWindow: '321 HP in 4-5 turns. Must extend timer every turn.'
  },
  // Act 3
  'The Queen': {
    punishes:['draw-starved decks (3 Bound cards each turn)','Frail-dependent card block (99 Frail from turn 2)','slow decks once she enrages'],
    rewards: ['extra draw','block from powers/Plating/Intangible','burst to kill the Amalgam, then the Queen'],
    difficulty: 'Hard',
    killWindow: 'Torch Head (199 HP) by turn 4-5, Queen (400 HP) by turn 8-10'
  },
  'Test Subject #C8': {
    punishes:['Skill-heavy Phase 1 (Enrage: +Str per Skill)','slow Phase 2 (Multi-Claw +1 hit each turn)','low block (Big Pounce 45)'],
    rewards: ['attack-heavy burst','big single blocks','Burn clearing in Phase 3'],
    difficulty: 'Hard — 600 HP over 3 phases',
    killWindow: 'Phase 1 (100 HP) fast, Phase 2 (200 HP) before the claws stack, Phase 3 (300 HP) block every Big Pounce'
  },
  'Aeonglass': {
    punishes:['decks without scaling (512 HP, Strength grows every cycle)','Wither piling up in the deck','debuff-only plans (3 Artifact)'],
    rewards: ['strong scaling engines','Exhaust to remove Wither (Stoke, GUARDS!!!, Purity)','big damage on non-Ebb turns'],
    difficulty: 'Hardest Act 3 boss',
    killWindow: 'Each Increasing Intensity adds more Strength than the last — aim to win within 4 cycles.'
  }
};

// Deck archetype detection - scan deck for these patterns
// Used to match against BOSS_MATRIX punishes/rewards

const STARTING_DECKS = {
  ironclad:   {Strike:5, Defend:4, Bash:1},
  silent:     {Strike:5, Defend:5, Neutralize:1, Survivor:1},
  defect:     {Strike:4, Defend:4, Zap:1, Dualcast:1},
  necrobinder:{Strike:4, Defend:4, Bodyguard:1, Unleash:1},
  regent:     {Strike:4, Defend:4, "Falling Star":1, Venerate:1}
};

const CHAR_HP = {ironclad:80, silent:70, defect:75, necrobinder:66, regent:75};

// ============================================================
// STATE
// ============================================================

const VELOCITY_CARDS = {
  ironclad: ['Shrug It Off','Pommel Strike','Headbutt','Battle Trance','Burning Pact','Second Wind','Offering','Corruption','Dark Embrace','Feel No Pain','Pyre','Hellraiser'],
  silent: ['Acrobatics','Prepared','Dagger Throw','Reflex','Tactician','Tools of the Trade','Calculated Gamble','Adrenaline','Backstab','Expertise'],
  defect: ['Scrape','Flash of Steel','FTL','Skim','Hologram','Compile Driver','TURBO','Double Energy','Coolheaded'],
  necrobinder: ['Scourge','Graveblast','Fetch','Dredge','Parse','Reave','Grave Warden','Wisp'],
  regent: ['Glow','Prophesize','Glimmer','Photon Cut','Convergence']
};

// Draw cards — pure card draw with no other primary role
const DRAW_CARDS = {
  ironclad:    ['Battle Trance','Burning Pact','Dark Embrace','Pommel Strike','Headbutt','Scrape'],
  silent:      ['Acrobatics','Backflip','Prepared','Reflex','Dagger Throw','Adrenaline','Expertise'],
  defect:      ['Skim','Scrape','FTL','Compile Driver','Flash of Steel','Machine Learning'],
  necrobinder: ['Fetch','Graveblast','Parse','Dredge','Reave','Wisp','Neurosurge'],
  regent:      ['Prophesize','Glimmer','Photon Cut','Decisions, Decisions','Glow']
};

// Energy cards — generate extra energy or reduce card costs
const ENERGY_CARDS = {
  ironclad:    ['Offering','Bloodletting','Expect a Fight','Spite','Pyre','Hellraiser'],
  silent:      ['Tactician','Adrenaline','Calculated Gamble','Tools of the Trade'],
  defect:      ['TURBO','Double Energy','Rip the Ether','Meteor Strike','Hologram'],
  necrobinder: ['Borrowed Time','Wisp','Friendship','Neurosurge','Demesne','Scourge','Grave Warden'],
  regent:      ['Convergence','Alignment','Bulwark']
};

// Energy generated per turn by specific cards (adds to baseEnergy budget)
const VEL_ENERGY_BONUS = {
  // Ironclad
  'Offering': 2, 'Bloodletting': 2, 'Pyre': 1,
  // Silent
  'Tactician': 1, 'Adrenaline': 1,
  // Defect
  'TURBO': 2, 'Double Energy': 2, 'Meteor Strike': 3,
  // Necrobinder
  'Borrowed Time': 4, 'Wisp': 1, 'Friendship': 1, 'Neurosurge': 3, 'Demesne': 1,
  // Regent
  'Convergence': 1, 'Alignment': 2, 'Bulwark': 2
};

// Extra cards seen when each vel card is played (draw = direct count; energy ≈ extra plays enabled)
const VEL_DRAW_BONUS = {
  // Ironclad
  'Battle Trance':3, 'Burning Pact':2, 'Cascade':2, 'Havoc':1, 'Offering':4,
  'Bloodletting':1, 'Forgotten Ritual':1,
  // Silent
  'Prepared':1, 'Acrobatics':2, 'Calculated Gamble':1, 'Expertise':2,
  'Adrenaline':3, 'Outmaneuver':1,
  // Defect
  'TURBO':1, 'Double Energy':2, 'Energy Surge':1, 'Overclock':2,
  'Scavenge':1, 'Skim':3, 'Reboot':3, 'Supercritical':2,
  // Necrobinder
  'Wisp':1, 'Borrowed Time':2, 'Dredge':2, 'Parse':3,
  // Regent
  'Glow':2, 'Convergence':1, 'Glimmer':2, 'Prophesize':6, 'Big Bang':2, 'Monologue':2
};

// Stars generated per turn by specific Regent cards (adds to baseStar budget)
const VEL_STAR_GEN_BONUS = {
  'Venerate': 2, 'Venerate+': 3,
  'Glow': 1, 'Glow+': 2,
  'Hidden Cache': 1, 'Hidden Cache+': 2,
  'Genesis': 2, 'Genesis+': 3,
  'Shining Strike': 1, 'Shining Strike+': 1,
  'Gather Light': 1, 'Gather Light+': 1,
  'Royal Gamble': 9,
  'Terraforming': 2,
  'Quasar': 3,
  'Big Bang': 1,
  'Manifest Authority': 3, 'Manifest Authority+': 3,
  'Wrought in War': 2, 'Wrought in War+': 1,
  'Falling Star': 2, 'Falling Star+': 1
};

const BASE_STARS_PER_TURN = 0; // Stars don't auto-replenish each turn

// ============================================================
// DECK SIZE ANALYSIS
// ============================================================

const REGION_DATA = {
  overgrowth: {
    label: 'Overgrowth',
    act: 1,
    color: '#6aac5f',
    bosses: {
      'Vantom': {
        type: 'Gimmick',
        hp: '173 HP (A9+: 183)',
        needs: {multihit:2, frontload:1, burstBlock:1, statusClear:1},
        pattern: [
          ['Attack2','Ink Blot: 7 (8) dmg'],
          ['Attack3','Inky Lance: 6x2 (7x2)'],
          ['Attack4+Status','Dismember: 27 (30) + 3 Wounds into discard'],
          ['Buff','Prepare: +2 Str'],
          ['cycle','→ fixed 4-move cycle, repeats forever'],
          ['power','Slippery: 9 stacks — each hit deals only 1 dmg and removes a stack']
        ],
        strategy: 'Starts with 9 Slippery. +2 Str every cycle makes later Dismembers lethal. Wounds clog your deck.',
        killOrder: 'Strip Slippery with multi-hits or Poison ticks first. Block Dismember (27+). Kill before the 3rd cycle.'
      },
      'The Kin': {
        type: 'Multi-Enemy',
        hp: 'Priest 190 HP (A9+: 199), 2 Followers 58-59 HP (A9+: 62-63)',
        needs: {frontload:2, aoe:1},
        pattern: [
          ['Att+Debuff','Orb of Frailty: 8 (9) + 1 Frail'],
          ['Att+Debuff','Orb of Weakness: 8 (9) + 1 Weak'],
          ['Attack3','Soul Beam: 3x3'],
          ['Buff','Dark Ritual: +2 (3) Str'],
          ['cycle','→ Priest repeats this cycle'],
          ['divider'],
          ['Attack2','Follower Quick Slash: 5 dmg'],
          ['Attack1','Follower Boomerang: 2x2'],
          ['Buff','Follower Power Dance: +2 (3) Str'],
          ['note','Followers are Minions — the fight ends when the Priest dies.']
        ],
        strategy: 'Three attackers who all ramp Strength, with constant Weak and Frail. Followers are Minions.',
        killOrder: 'Focus the Priest — Followers flee when it dies. AoE helps, Thorns punishes the many small hits.'
      },
      'Ceremonial Beast': {
        type: 'Phase-Shift',
        hp: '252 HP (A9+: 262) — Plow threshold 150 (160)',
        needs: {frontload:2, burstBlock:1, scaling:1},
        pattern: [
          ['Buff','Phase 1, T1: Stamp — gains Plow 150 (160)'],
          ['Att+Buff','Phase 1: Plow — 18 (20) dmg, +2 Str, every turn'],
          ['phase','↓ HP reaches the Plow threshold → Stunned, loses all Str ↓'],
          ['Debuff','Phase 2: Beast Cry — 1 Ringing (you can play only 1 card)'],
          ['Attack3','Stomp: 15 (17) dmg'],
          ['Att+Buff','Crush: 17 (19) dmg, +3 (4) Str'],
          ['cycle','→ Phase 2 repeats Beast Cry → Stomp → Crush']
        ],
        strategy: 'Phase 1 hits harder every turn. Dropping it to the threshold stuns it and wipes its Strength (free turn). Phase 2 Ringing turns allow only 1 card.',
        killOrder: 'Burst 102+ damage early to reach the stun. Save a big single card for Ringing turns.'
      }
    },
    elites: {
      'Bygone Effigy': {
        type: 'Gimmick',
        hp: '127 HP (A9+: 132)',
        needs: {burstBlock:2, frontload:1, strDown:1},
        pattern: [
          ['Sleep','T1: Sleep — free setup turn'],
          ['Buff','T2: Wake — +10 Str'],
          ['Attack3','Slashes: 13 (15) +10 Str = 23 (25) every turn after'],
          ['power','Slow: each card you play this turn adds 10% damage it takes from cards']
        ],
        strategy: 'Free first turn, then 23+ damage every turn. Slow rewards playing many cards before your big hit.',
        killOrder: 'Use T1 for powers. Block 23 each turn; play cheap cards first, biggest attack last. Poison/Doom ignore Slow.'
      },
      'Phrog Parasite': {
        type: 'Multi-Enemy',
        hp: '61-64 HP (A9+: 66-68), then 4 Wrigglers',
        needs: {aoe:2, statusClear:1},
        pattern: [
          ['Status','Infect: shuffles 3 Infections into discard'],
          ['Attack3','Lash: 4x4 (5x4)'],
          ['cycle','→ alternates Infect / Lash'],
          ['divider'],
          ['spawn','↓ On death → 4 Wrigglers (Stunned on their first turn) ↓'],
          ['note','Kill it with an Attack/Orb: Wrigglers are stunned right away. Poison/Doom kill: they are stunned on your next turn.']
        ],
        strategy: 'Pollutes your deck with Infections, then splits into 4 Wrigglers. The fight ends when all Wrigglers die.',
        killOrder: 'Kill the Parasite with Poison/Doom for a free AoE turn on the Wrigglers. AoE is king here.'
      },
      'Byrdonis': {
        type: 'Scaling',
        hp: '81-84 HP (A9+: 90)',
        needs: {frontload:2, strDown:1},
        pattern: [
          ['Attack3','Swoop: 17 (19) dmg'],
          ['Attack2','Peck: 3x3 (4x3)'],
          ['cycle','→ alternates Swoop / Peck'],
          ['power','Territorial 1: +1 Str at the end of every turn']
        ],
        strategy: 'Raw damage race. Peck multiplies every point of Strength by 3.',
        killOrder: 'Kill within 3-4 turns. Strength-down and Weak cut Peck damage hard.'
      }
    }
  },
  underdock: {
    label: 'Underdock',
    act: 1,
    color: '#4a8cba',
    bosses: {
      'Waterfall Giant': {
        type: 'Gimmick',
        hp: '240 HP (A9+: 250) — explodes on death',
        needs: {frontload:1, burstBlock:2, scaling:1},
        pattern: [
          ['Buff','T1: Pressurize — +15 (20) Steam Eruption'],
          ['Att+Debuff','Stomp: 15 (16) dmg + 1 Weak'],
          ['Attack3','Ram: 10 (11) dmg'],
          ['Heal','Siphon: heals 15 HP'],
          ['Attack4','Pressure Gun: 20 (23) dmg, +5 each use'],
          ['Attack3','Pressure Up: 13 (14) dmg'],
          ['cycle','→ Stomp → Ram → Siphon → Pressure Gun → Pressure Up → repeat'],
          ['power','Steam Eruption: +3 almost every move. On death it turns invulnerable, then Explodes next turn for the stored amount']
        ],
        strategy: 'Long fight that heals itself and keeps storing Steam Eruption. Killing it starts a 1-turn countdown to a big explosion.',
        killOrder: 'Keep a big block ready for the turn after the kill. A Doom kill with no Steam Eruption skips the explosion.'
      },
      'Soul Fysh': {
        type: 'Gimmick',
        hp: '211 HP (A9+: 221)',
        needs: {statusClear:2, burstBlock:1},
        pattern: [
          ['Status','Beckon: 2 Beckons (1 into draw pile, 1 into discard)'],
          ['Attack3','De-Gas: 16 (17) dmg'],
          ['Attack2+Status','Gaze: 7 (8) dmg + 1 Beckon'],
          ['Buff','Fade: 2 Intangible (only 1 lasts into your turn)'],
          ['Att+Debuff','Scream: 13 (15) dmg + 3 Vulnerable'],
          ['cycle','→ fixed 5-move cycle'],
          ['power','Beckon: status card, hurts you if still in hand at end of turn']
        ],
        strategy: 'Fills your deck with Beckons and goes Intangible every 5th turn. Scream leaves you Vulnerable for the next De-Gas.',
        killOrder: 'Exhaust or play off Beckons. Do your damage on non-Fade turns; block after Scream.'
      },
      'Lagavulin Matriarch': {
        type: 'Phase-Shift',
        hp: '222 HP (A9+: 233) — 12 Plating, Asleep 3',
        needs: {frontload:1, scaling:1, burstBlock:1},
        pattern: [
          ['Sleep','Turns 1-3: Asleep (wakes early on unblocked damage, loses Plating on waking)'],
          ['Attack3','Slash: 19 (21) dmg'],
          ['Attack3','Disembowel: 9x2 (10x2)'],
          ['Att+Defend','Slash2: 12 (14) dmg + 12 (14) Block'],
          ['Debuff','Soul Siphon: you lose 2 Str and 2 Dex; it gains 2 Str'],
          ['cycle','→ repeats the 4-move cycle after waking']
        ],
        strategy: 'Three free setup turns. Every Soul Siphon permanently drains 2 Strength and 2 Dexterity, so multi-hit and many small blocks get worse over time.',
        killOrder: 'Play expensive powers while it sleeps. Favour big single hits and big single blocks. Kill before the 2nd Soul Siphon.'
      }
    },
    elites: {
      'Phantasmal Gardeners': {
        type: 'Multi-Enemy',
        hp: '4 Gardeners, 26-31 HP each (A9+: 27-32), Skittish 6 (7)',
        needs: {aoe:2, multihit:1},
        pattern: [
          ['Attack2','Bite: 5 dmg'],
          ['Attack2','Lash: 7 dmg'],
          ['Attack1','Flail: 1x3'],
          ['Buff','Enlarge: +2 (3) Str'],
          ['cycle','→ all four share the cycle, each starting on a different move'],
          ['power','Skittish: gains Block after the first attack against it each turn']
        ],
        strategy: 'Four small enemies offset on the same cycle. Skittish blocks after your first attack on each one.',
        killOrder: 'AoE ignores Skittish best. Otherwise kill one at a time, starting with whoever is about to Enlarge.'
      },
      'Terror Eel': {
        type: 'Gimmick',
        hp: '140 HP (A9+: 150) — Shriek at 70 (75)',
        needs: {frontload:2, burstBlock:1},
        pattern: [
          ['Attack3','Crash: 16 (18) dmg'],
          ['Att+Buff','Thrash: 3x3 (4x3) + 6 Vigor'],
          ['cycle','→ alternates Crash / Thrash'],
          ['Stun','↓ HP reaches the Shriek threshold → Stunned for a turn ↓'],
          ['Debuff','Terror: 99 Vulnerable on you for the rest of the fight'],
          ['power','Vigor: next Crash hits for 22+']
        ],
        strategy: 'Thrash gives Vigor so the next Crash hits for 22+. At half HP it stuns itself, then makes you permanently Vulnerable.',
        killOrder: 'Plan to cross 70 HP with burst ready: use the stun turn to deal as much as possible and finish quickly.'
      },
      'Skulking Colony': {
        type: 'Gimmick',
        hp: '75 HP (A9+: 80) — Hardened Shell 20',
        needs: {burstBlock:1, scaling:1},
        pattern: [
          ['Attack3','Zoom: 14 (16) dmg'],
          ['Attack3','Zoom: 14 (16) dmg'],
          ['Att+Buff','Inertia: 9 (11) dmg + 2 (3) Str'],
          ['Attack2','Piercing Stabs: 7x2 (8x2)'],
          ['cycle','→ fixed 4-move cycle'],
          ['power','Hardened Shell: max 20 HP lost per turn (resets on your turn and on its turn)']
        ],
        strategy: 'Attacks every turn and caps your damage at 20 per turn, so it takes at least 4 turns.',
        killOrder: 'Steady 20 damage per turn. Poison and Thorns hit on its turn, letting you push 40 a round.'
      }
    }
  },
  hive: {
    label: 'Hive',
    act: 2,
    color: '#c8922a',
    bosses: {
      'The Insatiable': {
        type: 'Timer',
        hp: '321 HP (A9+: 341) + Sandpit',
        needs: {frontload:2, burstBlock:1, statusClear:1},
        pattern: [
          ['Buff+Status','T1: Liquify Ground — 4 Sandpit + 6 Frantic Escapes (3 draw, 3 discard)'],
          ['Attack3','Thrash: 8x2 (9x2)'],
          ['Attack4','Lunging Bite: 28 (31) dmg'],
          ['Buff','Salivate: +2 (3) Str'],
          ['Attack3','Thrash: 8x2 (9x2)'],
          ['cycle','→ Thrash → Lunging Bite → Salivate → Thrash → repeat'],
          ['power','Sandpit: death countdown. Playing Frantic Escape pushes it back']
        ],
        strategy: 'Timer fight: you must keep playing Frantic Escapes or die to Sandpit. They cost energy that would otherwise go to damage and block.',
        killOrder: 'Draw and energy are survival. Kill fast — every cycle adds Strength to the 28-damage bite.'
      },
      'Knowledge Demon': {
        type: 'Strategic Choice',
        hp: '379 HP (A9+: 399)',
        needs: {scaling:2, burstBlock:1, multihit:0},
        pattern: [
          ['Debuff','Curse of Knowledge: choose 1 of 2 debuffs'],
          ['Attack3','Slap: 17 (18) dmg'],
          ['Attack3','Knowledge Overwhelming: 8x3 (9x3)'],
          ['Att+Buff','Ponder: 11 (13) dmg, heals 30, +2 (3) Str'],
          ['cycle','→ 4-move cycle; after the 3rd Curse it only repeats the 3 attacks'],
          ['note','Curse sets: Disintegration 6 / Mind Rot · Disintegration 7 / Sloth (max 3 cards) · Disintegration 8 / Waste Away (-1 energy)']
        ],
        strategy: 'Long fight: it heals 30 every cycle and gains Strength. Each Curse makes you pick damage-per-turn or a resource loss.',
        killOrder: 'Scaling decks win here. Fast decks take the resource curses; slow decks take Disintegration and outlast.'
      },
      'Kaiser Crab': {
        type: 'Multi-Enemy',
        hp: 'Crusher 209 HP (A9+: 219), Rocket 199 HP (A9+: 209)',
        needs: {aoe:1, burstBlock:2, scaling:1},
        pattern: [
          ['Attack3','Crusher: Thrash 12 (14)'],
          ['Attack2','Crusher: Enlarging Strike 4'],
          ['Att+Debuff','Crusher: Bug Sting 6x2 (7x2) + 2 Weak + 2 Frail'],
          ['Buff','Crusher: Adapt +2 (3) Str'],
          ['Att+Defend','Crusher: Guarded Strike 12 (14) + 18 Block'],
          ['divider'],
          ['Attack1','Rocket: Targeting Reticle 3 (4)'],
          ['Attack3','Rocket: Precision Beam 18 (20)'],
          ['Buff','Rocket: Charge Up +2 (3) Str'],
          ['Attack4','Rocket: Laser 31 (35)'],
          ['Sleep','Rocket: Recharge — does nothing'],
          ['power','Surrounded: you take 50% more from the claw behind you. Targeting a claw turns you to face it'],
          ['power','Crab Rage: when one claw dies, the other gains 6 Str + 99 Block']
        ],
        strategy: 'Two claws on 5-move cycles. Laser (31) and attacks from behind are the big threats. Killing one claw enrages the other.',
        killOrder: 'Face whichever claw is about to hit hardest. Bring both low, then finish them close together. AoE splits damage well.'
      }
    },
    elites: {
      'Decimillipede': {
        type: 'Multi-Enemy',
        hp: '3 segments, 40-46 HP each (A9+: 46-52)',
        needs: {aoe:2, frontload:1},
        pattern: [
          ['Att+Buff','Bulk: 6 (7) dmg + 2 Str'],
          ['Attack2','Writhe: 5x2 (6x2)'],
          ['Att+Debuff','Outgas: 8 (9) dmg + 1 Weak'],
          ['cycle','→ each segment cycles Bulk → Writhe → Outgas from a different start'],
          ['Heal','Reattach: a dead segment revives with 25 HP while another segment lives']
        ],
        strategy: 'Three segments. A killed segment comes back with 25 HP unless all of them die together.',
        killOrder: 'Bring all three low, then finish them in the same turn. AoE is ideal.'
      },
      'Entomancer': {
        type: 'Gimmick',
        hp: '145 HP (A9+: 155) — Personal Hive 1',
        needs: {burstBlock:1, strDown:1, statusClear:1},
        pattern: [
          ['Attack4','Beeeees!: 3x7 (3x8)'],
          ['Attack3','Spear!: 18 (20) dmg'],
          ['Buff','Pheromone Spit: +1 Personal Hive and +1 Str (+2 Str once Hive is 3)'],
          ['cycle','→ fixed 3-move cycle'],
          ['power','Personal Hive: each time it takes Attack damage, adds Dazed to your draw pile']
        ],
        strategy: 'Every hit you land adds Dazed (multi-hits add several). Beeeees! multiplies its Strength 7 times.',
        killOrder: 'Few big hits, or Poison/Doom/Inferno damage that adds no Dazed. Thorns and Strength-down blunt Beeeees!.'
      },
      'Infested Prism': {
        type: 'Gimmick',
        hp: '161 HP (A9+: 171) — Vital Spark 2 (3)',
        needs: {burstBlock:1, frontload:1},
        pattern: [
          ['Attack4','Jab: 15 (17) dmg'],
          ['Att+Defend','Radiate: 11 (13) dmg + 16 (18) Block'],
          ['Attack3','Whirlwind: 5x3 (6x3)'],
          ['Att+Defend','Pulsate: 8 (10) dmg + 20 (22) Block + more Vital Spark'],
          ['cycle','→ fixed 4-move cycle'],
          ['power','Vital Spark: all your Skills are Tainted (playing one costs you HP)']
        ],
        strategy: 'Punishes Skills: each Skill you play hurts you, and Pulsate makes it worse.',
        killOrder: 'Block with Attacks/Powers that give Block. Prefer one expensive Skill over many cheap ones. Hit hard between Block turns.'
      }
    }
  },
  glory: {
    label: 'Glory',
    act: 3,
    color: '#9a6aba',
    bosses: {
      'The Queen': {
        type: 'Multi-Enemy',
        hp: 'Queen 400 HP (A9+: 419) + Torch Head Amalgam 199 HP (A9+: 211, Minion)',
        needs: {frontload:1, burstBlock:2, scaling:1},
        pattern: [
          ['Debuff','T1: Puppet Strings — 3 Chains of Binding'],
          ['Debuff','T2: You\'re Mine — 99 Frail, Weak and Vulnerable'],
          ['Defend','While the Amalgam lives: Burn Bright for Me — Amalgam +1 Str, Queen +20 Block'],
          ['phase','↓ Amalgam dies → Queen enrages ↓'],
          ['Attack4','Off with Your Head: 3x5 (4x5)'],
          ['Attack3','Execution: 15 (18) dmg'],
          ['Buff','Enrage: +2 Str'],
          ['cycle','→ enraged loop: Off with Your Head → Execution → Enrage'],
          ['power','Chains of Binding: the first 3 cards you draw each turn are Bound (only one Bound card per turn)'],
          ['divider'],
          ['Attack4','Amalgam: Strong Tackle 26 (32)'],
          ['Attack3','Amalgam: Tackle 18 (22) · Weak Tackle 14 (16)'],
          ['Attack3','Amalgam: Beam 8x3']
        ],
        strategy: 'After turn 2 you are permanently Weak, Frail and Vulnerable, and Bound cards limit your hand. The Amalgam hits hard while the Queen shields; killing it enrages her.',
        killOrder: 'Kill the Amalgam, then burst the Queen before her Enrage loop stacks. Blocks that ignore Frail (powers, Plating, Intangible) and extra draw both help a lot.'
      },
      'Aeonglass': {
        type: 'Attrition',
        hp: '512 HP (A9+: 535) — 3 Artifact',
        needs: {scaling:2, statusClear:2, burstBlock:1},
        pattern: [
          ['Att+Defend','Ebb: 22 (26) dmg + 33 Block'],
          ['Attack3','Eye Lasers: 11x2 (12x2)'],
          ['Buff+Status','Increasing Intensity: 1 (2) Wither into discard, +2 (3) +X Str, upgrades all Wither'],
          ['cycle','→ fixed 3-move cycle (X = times Increasing Intensity has been used)'],
          ['power','Withering Presence: every 6 cards you play, a Wither goes into your hand']
        ],
        strategy: 'Huge HP pool with 3 Artifact. Strength grows faster every cycle, and Wither cards keep clogging your deck.',
        killOrder: 'You need real scaling. Exhaust Withers (Stoke, GUARDS!!!, Purity). Hit hardest on Eye Laser and Increasing Intensity turns — Ebb gives it 33 Block.'
      },
      'Test Subject #C8': {
        type: 'Phase-Shift',
        hp: '100 HP (A9+: 111) → 200 (212) → 300 (313)',
        needs: {frontload:1, burstBlock:2, scaling:2},
        pattern: [
          ['phase','Phase 1: Adaptable + Enrage 2 (3) — gains Str whenever you play a Skill'],
          ['Attack4','Bite: 20 (22) dmg'],
          ['Att+Debuff','Skull Bash: 14 (16) dmg + 1 Vulnerable'],
          ['phase','↓ Revives with 200 HP, Painful Stabs, loses all buffs ↓'],
          ['Attack4','Phase 2: Multi-Claw 10x3 (11x3) every turn, +1 hit each use'],
          ['phase','↓ Revives with 300 HP, Nemesis ↓'],
          ['Attack3','Phase 3: Lacerate 10x3 (11x3)'],
          ['Attack4','Big Pounce: 45 dmg'],
          ['Buff+Status','Burning Growl: 3 (5) Burns into discard, +2 (3) Str'],
          ['cycle','→ Phase 3 repeats Lacerate → Big Pounce → Burning Growl']
        ],
        strategy: '600 HP over three phases. Phase 1 punishes Skills, Phase 2 gets one more hit every turn, Phase 3 hits for 45.',
        killOrder: 'Phase 1: attack-heavy turns. Phase 2: kill fast before Multi-Claw stacks. Phase 3: big block for Big Pounce, clear Burns.'
      }
    },
    elites: {
      'Knight Trio': {
        type: 'Multi-Enemy',
        hp: 'Flail 101 HP (A9+: 108), Spectral 93 (97), Magi 82 (89)',
        needs: {aoe:2, burstBlock:1, frontload:1},
        pattern: [
          ['Debuff','Magi: Dampen — your cards are Downgraded while it lives'],
          ['Att+Defend','Magi: Power Shield — 6 (7) dmg + 5 (9) Block'],
          ['Attack2','Magi: Ram — 10 (11)'],
          ['Defend','Magi: Prep — +5 (9) Block'],
          ['Attack4','Magi: Magic Bomb — 35 (40)'],
          ['divider'],
          ['Debuff','Spectral: Hex'],
          ['Attack3','Spectral: Soul Slash — 15 (17)'],
          ['Attack2','Spectral: Soul Flame — 3x3 (4x3)'],
          ['divider'],
          ['Attack3','Flail: Ram — 15 (17), always first'],
          ['Attack3','Flail: Flail — 9x2 (10x2)'],
          ['Buff','Flail: Breaker — +3 Str (never twice in a row)']
        ],
        strategy: 'Three knights with different threats. Dampen downgrades your whole deck, and Magic Bomb hits for 35.',
        killOrder: 'Kill Magi first (ends Dampen, no Bomb), then Spectral, then Flail. AoE hits all three.'
      },
      'Mecha Knight': {
        type: 'Gimmick',
        hp: '300 HP (A9+: 320) — 3 Artifact',
        needs: {burstBlock:2, statusClear:1, scaling:1},
        pattern: [
          ['Attack4','T1: Charge — 25 (30) dmg'],
          ['Attack2+Status','Flamethrower: 4 Burns into your hand (+ 8 (12) dmg since v0.111)'],
          ['Defend','Windup: +15 Block, +5 Str'],
          ['Attack4','Heavy Cleave: 35 (40) dmg + Str'],
          ['cycle','→ Flamethrower → Windup → Heavy Cleave → repeat'],
          ['power','Artifact 3: blocks your first 3 debuffs']
        ],
        strategy: 'Telegraphed cycle; Heavy Cleave gets 5 Strength more every cycle. Burns punish holding cards.',
        killOrder: 'Strip Artifact with cheap debuffs. Damage on Flamethrower/Windup turns, full block on Heavy Cleave, play or exhaust Burns.'
      },
      'Soul Nexus': {
        type: 'Gimmick',
        hp: '234 HP (A9+: 254)',
        needs: {burstBlock:2, frontload:1},
        pattern: [
          ['Attack4','T1: Soul Burn — 29 (31) dmg'],
          ['Attack4','Soul Burn: 29 (31)'],
          ['Attack4','Maelstrom: 6x4 (7x4)'],
          ['Att+Debuff','Drain Life: 18 (19) + 2 Vulnerable + 2 Weak'],
          ['note','After T1: random, never the same move twice in a row.']
        ],
        strategy: 'Opens with 29 damage, then random heavy attacks. Drain Life makes the following hit worse.',
        killOrder: 'Block 29 on turn 1. Block extra the turn after Drain Life. Push damage on Maelstrom turns.'
      }
    }
  }
};

// Map each boss name to its region key for fast lookup
const BOSS_TO_REGION = {};
Object.entries(REGION_DATA).forEach(([rk, rd]) => {
  Object.keys(rd.bosses).forEach(b => { BOSS_TO_REGION[b] = rk; });
});
// BOSS_MATRIX uses 'The Kin' (matching REGION_DATA) — no extra mapping needed.

const ENGINES = {
  ironclad: [
    {name:'Exhaust engine',cards:['Corruption','Dark Embrace','Feel No Pain'],note:'Core Exhaust trinity. Sculpts deck mid-combat. Priority: remove Strikes first.'},
    {name:'Strength engine',cards:['Demon Form','Inflame','Heavy Blade'],note:'Passive Strength per turn. Go wide with multi-hit.'},
    {name:'Block engine',cards:['Barricade','Juggernaut','Body Slam'],note:'Block never expires. Juggernaut converts block to damage.'},
    {name:'Bloodletting engine',cards:['Bloodletting','Rupture','Offering'],note:'HP as resource. Bloodletting/Offering pay HP -> energy+draw -> Rupture gives Strength per HP loss.'},
    {name:'Strike engine',cards:['Perfected Strike','Twin Strike','Hellraiser'],note:'Pump Strike-family cards. Perfected Strike scales per Strike in deck. Hellraiser auto-plays drawn Strikes.'},
    {name:'Self-Wound engine',cards:['Combust','Rupture','Evolve','Fire Breathing'],note:'Turn HP loss into card draw (Evolve) and Strength (Rupture). Combust + Fire Breathing = passive AoE.'}
  ],
  silent: [
    {name:'Sly engine',cards:['Tactician','Tools of the Trade','Master Planner'],note:'Discard = free Energy. Keep deck thin to cycle fast.'},
    {name:'Shiv engine',cards:['Accuracy','Infinite Blades','Knife Trap'],note:'Scale Shiv damage. Accuracy stacks multiplicatively.'},
    {name:'Poison engine',cards:['Noxious Fumes','Accelerant','Bubble Bubble'],note:'Stack Poison then double it. Survive the early turns.'},
    {name:'Grand Finale engine',cards:['Grand Finale','Acrobatics','Calculated Gamble'],note:'Empty draw pile = 50 AoE. Acrobatics+Gamble cycle through deck. Keep ~15 cards total.'},
    {name:'Envenom engine',cards:['Envenom','Accuracy','Blade Dance'],note:'Shivs apply Poison via Envenom. Accuracy buffs the Shivs. Hybrid attack/poison scaling.'},
    {name:'Combo engine',cards:['Expertise','Setup','Catalyst'],note:'Chain cards in specific order. Expertise fills hand, Setup enables 0-cost next turn.'}
  ],
  defect: [
    {name:'Orb/Focus engine',cards:['Defragment','Loop','Multi-Cast'],note:'Stack Focus ASAP. Remove Strikes — passive orbs outscale them by Act 2.'},
    {name:'Claw engine',cards:['Claw','All for One','Scrape'],note:'Every Claw buffs all Claws. Keep deck small. Feral returns 0-cost attacks.'},
    {name:'Hologram/TURBO loop',cards:['Hologram','TURBO','Claw'],note:'TURBO generates energy, Hologram retrieves Claw. Infinite-like turns with enough draw.'},
    {name:'Frost engine',cards:['Glacier','Biased Cognition','Coolheaded'],note:'Passive block via Frost orbs. Biased Cog spikes Focus making each Frost orb block more. Glacier channels 2 at once.'},
    {name:'Dark Orb engine',cards:['Darkness','Dark Orb','Multi-Cast'],note:'Dark orbs store damage (ignores Focus). Let them grow then Multi-Cast for huge burst.'},
    {name:'Creative AI engine',cards:['Creative AI','Hologram','White Noise'],note:'Random Power each turn. Hologram retrieves key powers from discard. White Noise adds free Power.'}
  ],
  necrobinder: [
    {name:'Borrowed Time engine',cards:['Borrowed Time','Graveblast'],note:'Burst 4 Energy in one turn — cards cost 1 more but Graveblast retrieves key cards from discard. Big turn enabler.'},
    {name:'Doom engine',cards:['Countdown','Danse Macabre','Capture Spirit'],note:'Stack Doom, then execute. Countdown applies passive Doom. Capture Spirit generates Souls AND Doom.'},
    {name:'Osty engine',cards:['Rattle','Sic \'Em','Necro Mastery','Flatten'],note:'Stack Osty HP. Rattle+Sic\'Em each turn. Necro Mastery converts Osty attacks to AoE damage.'},
    {name:'Soul engine',cards:['Haunt','Capture Spirit','Soul Storm'],note:'Souls are 0-cost draw 2 Exhaust. Haunt makes each Soul deal 6 unblockable. Capture Spirit generates 3 Souls.'},
    {name:'Reaper engine',cards:['Reaper Form','The Scythe','Lethality'],note:'Attacks apply Doom equal to damage. The Scythe deals scaling AoE. Lethality boosts first attack 50%.'}
  ],
  regent: [
    {name:'Forge engine',cards:['Sword Sage','Seeking Edge','Conqueror','The Smith'],note:'Forge the Sovereign Blade every turn. Sword Sage doubles all forge gains. Seeking Edge makes Blade AoE.'},
    {name:'Star Burst engine',cards:['Stardust','Seven Stars','Black Hole','Glow'],note:'Stockpile Stars then unload. Black Hole + Glow = AoE per Star generation. Seven Stars = 7-hit nuke.'},
    {name:'Void Form engine',cards:['Void Form','Convergence','Comet'],note:'First 2 cards per turn are free. Comet (33 dmg, 5-star cost) becomes zero-cost bomb. Convergence retains hand.'},
    {name:'Bombardment engine',cards:['Bombardment','Meteor Shower','Gamma Blast'],note:'AoE via Star generation. Bombardment auto-plays from Exhaust pile. Meteor Shower hits all for 14.'}
  ]
};
