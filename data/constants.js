// Shared constants and lookup tables for STS2 Build Advisor.
// Keep this file data-only.

// Phase 8: act-scaling targets for the 6 axes (0–100 scale)
const AXIS_TARGETS = {
  // Per-turn output scale: axis = min(100, round(perTurnOutput * 2))
  // Starter deck: Atk~12, Def~10. One good card each: ~30. Solved: ~50.
  // Act 1: baseline survival — need ~2-3 strong cards to hit target
  1: { Attack: 40, Defense: 40, Scaling: 15, Consistency: 20, Efficiency: 25, Synergy: 10 },
  // Act 2: elite gauntlet — need real damage output and efficient block
  2: { Attack: 60, Defense: 55, Scaling: 30, Consistency: 40, Efficiency: 35, Synergy: 35 },
  // Act 3: boss rush — maximum output per turn wins
  3: { Attack: 75, Defense: 50, Scaling: 55, Consistency: 55, Efficiency: 45, Synergy: 60 }
};

// Bosses with long kill windows where scaling matters most (1.5× scl bonus)
const SCL_PRIORITY_BOSSES = new Set([
  'Knowledge Demon', 'The Queen', 'Doormaker', 'Test Subject #C8'
]);

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
  lowBlkScore: 30,
  lowDmgScore: 35,
  heavyAtkBlkReq: 40,
  heavyDefDmgReq: 40,
  heavySclDmgReq: 35,
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

// Maps card names to the boss-relevant tag keywords that appear
// in BOSS_MATRIX punishes[] and rewards[]. Keywords must be
// substrings of the actual punish/reward strings (case-insensitive match).
const CARD_BOSS_TAGS = {
  // --- Multi-hit / Shiv ---
  'Whirlwind':        ['multi-hit','AoE','burst'],
  'Twin Strike':      ['multi-hit','burst'],
  'Anger':            ['multi-hit'],
  'Pommel Strike':    ['multi-hit','burst'],
  'Sword Boomerang':  ['multi-hit'],
  'Blade Dance':      ['multi-hit','Shiv','fast'],
  'Finisher':         ['multi-hit','Shiv'],
  'Infinite Blades':  ['Shiv','fast'],
  'Accuracy':         ['Shiv'],
  'Leading Strike':   ['Shiv'],
  'Hidden Daggers':   ['Shiv'],
  'Cloak and Dagger': ['Shiv'],
  'Knife Trap':       ['Shiv'],
  'Up My Sleeve':     ['Shiv'],
  // --- Weak application ---
  'Neutralize':       ['Weak'],
  'Leg Sweep':        ['Weak'],
  'Sucker Punch':     ['Weak'],
  'Malaise':          ['Weak','Poison'],
  'Expose':           ['Weak'],
  // --- Poison ---
  'Noxious Fumes':    ['Poison'],
  'Deadly Poison':    ['Poison'],
  'Poisoned Stab':    ['Poison'],
  'Bouncing Flask':   ['Poison'],
  'Bubble Bubble':    ['Poison'],
  'Haze':             ['Poison'],
  'Corrosive Wave':   ['Poison'],
  'Accelerant':       ['Poison','fast'],
  // --- Doom / No Escape ---
  'No Escape':        ['No Escape','Doom','threshold'],
  'Deathbringer':     ['Doom'],
  "Death's Door":     ['Doom'],
  'Scourge':          ['Doom'],
  'End of Days':      ['Doom'],
  // --- Exhaust ---
  'Corruption':       ['Exhaust','Corruption','big turn'],
  'Dark Embrace':     ['Exhaust'],
  'Feel No Pain':     ['Exhaust'],
  'Fiend Fire':       ['Exhaust','big turn','burst'],
  "Pact's End":       ['Exhaust'],
  'Second Wind':      ['Exhaust'],
  'Forgotten Ritual': ['Exhaust'],
  // --- Single big hits ---
  'Bludgeon':         ['single-hit','burst'],
  'Reap':             ['single-hit'],
  'Bury':             ['single-hit','burst'],
  'Devastate':        ['single-hit','burst'],
  'Kingly Kick':      ['single-hit','burst'],
  'Comet':            ['single-hit','burst'],
  'Heavenly Drill':   ['single-hit','burst'],
  'Hyperbeam':        ['single-hit','burst'],
  'Ice Lance':        ['single-hit'],
  // --- Strength / Demon Form ---
  'Demon Form':       ['Strength','Demon Form','scaling'],
  'Inflame':          ['Strength','burst'],
  'Fight Me!':        ['Strength'],
  'Rupture':          ['Strength','self-damage'],
  'Limit Break':      ['Strength','burst'],
  'Conqueror':        ['Sovereign Blade','forge','burst'],
  'Sovereign Blade':  ['Sovereign Blade','forge','burst'],
  'The Smith':        ['forge'],
  'Summon Forth':     ['forge'],
  // --- Barricade / Body Slam ---
  'Barricade':        ['Barricade','block'],
  'Body Slam':        ['Body Slam','block'],
  'Juggernaut':       ['block'],
  'Impervious':       ['block'],
  // --- AoE ---
  'Thunderclap':      ['AoE'],
  'Shockwave':        ['AoE'],
  'Seven Stars':      ['Seven Stars','AoE','burst'],
  'Gamma Blast':      ['AoE','burst'],
  'Radiate':          ['AoE','burst'],
  'Meteor Strike':    ['AoE','burst'],
  // --- Fast / cycle / draw ---
  'Acrobatics':       ['fast','cycle','draw'],
  'Adrenaline':       ['fast','cycle','draw'],
  'Expertise':        ['draw','fast'],
  'Tactician':        ['fast','cycle','Sly-discard'],
  'Reflex':           ['fast','cycle','Sly-discard'],
  'Tools of the Trade':['fast','cycle','Sly-discard'],
  'Master Planner':   ['fast','cycle','Sly-discard'],
  'Prepared':         ['fast','Sly-discard'],
  'Calculated Gamble':['fast','Sly-discard'],
  // --- Compress / burst ---
  'Offering':         ['burst','compressed'],
  'Battle Trance':    ['burst','draw'],
  'Bloodletting':     ['burst','self-damage'],
  // --- Sly discard ---
  'Dagger Throw':     ['Sly-discard','fast'],
  'Memento Mori':     ['Sly-discard'],
  // --- Stars / Regent ---
  'Genesis':          ['stars','scaling'],
  'Alignment':        ['stars','fast','compressed'],
  'Stardust':         ['stars','burst'],
  'Terraforming':     ['stars','burst'],
  // --- Osty / Necrobinder ---
  'Rattle':           ['Osty','multi-hit'],
  "Sic 'Em":          ['Osty','multi-hit'],
  'Necro Mastery':    ['Osty'],
  // --- Soul cycle ---
  'Haunt':            ['soul','cycle','draw'],
  'Devour Life':      ['soul'],
  // --- Sustained damage ---
  'Catalyst':         ['Catalyst','Poison','burst'],
  'Claw':             ['multi-hit','fast'],
  'All for One':      ['multi-hit','fast'],
  'Loop':             ['scaling','orb'],
  'Defragment':       ['scaling','orb'],
  'Echo Form':        ['scaling','burst'],
};

// Cards that gain value in Act 2-3 (scale well)
const ACT_SCALES_INTO = new Set([
  'Demon Form','Rupture','Accuracy','Accelerant','Defragment','Haunt',
  'No Escape','Genesis','Echo Form','Loop','Limit Break','Barricade',
  'Body Slam','Juggernaut','Noxious Fumes','Corruption','Dark Embrace',
  'Feel No Pain','Conqueror','Radiate','Alignment','Seven Stars',
  'Infinite Blades','Claw','All for One','Necro Mastery',
]);

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
    rewards: ['AoE (Whirlwind, Shockwave, Seven Stars)','Poison (ticks all 3)','hard burst ignoring Followers'],
    difficulty: 'Medium',
    killWindow: '≤5 turns before Dark Ritual Str spirals'
  },
  'Vantom': {
    punishes:['heavy single-hit decks (Slippery wastes big swings)','slow decks (Strength ramp + Wound pollution)','entering below 40 HP'],
    rewards: ['multi-hit (Shivs, Anger, Twin Strike)','fast cycling decks','Wound-exhaust synergies'],
    difficulty: 'Hardest Act 1 boss',
    killWindow: '≤4 cycles before Str makes Dismember lethal. SKIP ELITES under 40 HP.'
  },
  'Lagavulin Matriarch': {
    punishes:['slow kills (Soul Siphon ruins stats)','raw damage-reliant decks'],
    rewards: ['Poison, Doom, Shivs (bypass Str/Dex debuffs)','multi-hit to strip Plating during sleep'],
    difficulty: 'Hard',
    killWindow: '≤5 turns after wake — each Soul Siphon compounds'
  },
  'Soul Fysh': {
    punishes:['pure burst (wasted in Intangible)','block-only (Beckons bypass block)','heavy decks that can\'t cycle'],
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
    punishes:['draw-starved decks (Bound locks cards)','mono-Necrobinder without draw','no-AoE decks'],
    rewards: ['draw-spam decks','AoE to pressure both','4+ cards per turn decks'],
    difficulty: 'Hard',
    killWindow: 'Torch Head (199 HP) by turn 4-5, Queen (400 HP) by turn 8-10'
  },
  'Test Subject #C8': {
    punishes:['slow Phase 1 (Enrage ramps)','wasteful turns in Phase 3 Intangible','no saved burst'],
    rewards: ['fast Phase 1 kill','burst held for Phase 2','sustain + patience for Phase 3 windows'],
    difficulty: 'Moderate — plan phases and it\'s manageable',
    killWindow: 'Phase 1 fast, Phase 2 burst (200 HP), Phase 3 patience (300 HP, attack Intangible gaps)'
  },
  'Doormaker': {
    punishes:['card-dependent builds (Hunger drains energy)','draw-heavy builds (Scrutiny stops draw)','slow scaling','skill-reliant builds (Grasp blocks skills)'],
    rewards: ['compressed burst winning in each window','Persistent DoT between phases','any damage type that carries through form changes'],
    difficulty: 'Hardest A3 boss',
    killWindow: 'Damage each form window. Full kill 8-12 turns depending on form cycle.'
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

const TIPS_CARDS = {
  ironclad: {
    strength:   ['Demon Form','Feed','Fight Me!','Inflame','Pommel Strike','Whirlwind'],
    block:      ['Barricade','Body Slam','Juggernaut','Taunt'],
    exhaust:    ['Ashen Strike','Corruption','Dark Embrace','Feel No Pain','Forgotten Ritual',"Pact's End",'Second Wind','Stoke','Vicious'],
    selfdamage: ['Crimson Mantle','Feed','Inferno','Rupture','Spite'],
    strike:     ['Colossus','Expect a Fight','Hellraiser','Perfected Strike','Pommel Strike','Pyre','Taunt'],
    infinite:   ['Battle Trance','Bloodletting','Burning Pact','Dark Embrace','Expect a Fight','Fiend Fire','Offering','Second Wind','Spite','True Grit','Vicious']
  },
  silent: {
    shiv:   ['Accuracy','Hidden Daggers','Infinite Blades','Knife Trap'],
    poison: ['Accelerant','Bubble Bubble','Footwork','Malaise','Noxious Fumes','Shadowmeld'],
    sly:    ['Adrenaline','Afterimage','Master Planner','Prepared','Reflex','Tactician','Tools of the Trade','Well-Laid Plans'],
    tank:   ['Accelerant','Footwork','Malaise','Noxious Fumes','Shadowmeld']
  },
  defect: {
    claw:     ['All for One','Claw','Panache','Scrape'],
    orb:      ['Barrage','Defragment','Echo Form','Loop','Multi-Cast'],
    frost:    ['Chill','Glacier','Hailstorm','Loop'],
    toolbox:  ['Double Energy','Echo Form','Hologram','Meteor Strike','Skim','Turbo'],
    darkness: ['Darkness','Defragment','Dual Cast','Multi-Cast','Shadow Shield']
  },
  necrobinder: {
    doom:     ['Borrowed Time',"Death's Door",'End of Days','Neurosurge','Reap',"Time's Up"],
    osty:     ['Flatten','Necro Mastery','Pull Aggro','Rattle',"Sic 'Em"],
    soul:     ['Borrowed Time','Captured Spirit','Devour Life','Durge','Haunt','Neurosurge','Severance','Soul Storm','Undeath'],
    ethereal: ["Banshee's Cry",'Borrowed Time','Eradicate','Grave Blast','Page Storm','Seance']
  },
  regent: {
    blade:    ['Beat into Shape','Conqueror','Falling Star','Gamma Blast','Sword Stage'],
    star:     ['Alignment','Child of the Stars','Cloak of Stars','Genesis','Royal Gamble'],
    starfall: ['Alignment','Powder','Radiate','Royal Gamble','Stardust','Terraforming','Vigor'],
    midrange: ['Child of the Stars','Comet','Convergence','Genesis','Reflect'],
    infinite: ['Alignment','Convergence','Decisions Decisions','Glow','Guards']
  }
};

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
  necrobinder: ['Fetch','Grave Blast','Parse','Dredge','Reave','Wisp','Neurosurge'],
  regent:      ['Prophesize','Glimmer','Photon Cut','Guiding Star','Decisions Decisions']
};

// Energy cards — generate extra energy or reduce card costs
const ENERGY_CARDS = {
  ironclad:    ['Offering','Bloodletting','Expect a Fight','Spite','Pyre','Hellraiser'],
  silent:      ['Tactician','Adrenaline','Calculated Gamble','Tools of the Trade'],
  defect:      ['Turbo','Double Energy','Rip the Ether','Meteor Strike','Hologram'],
  necrobinder: ['Borrowed Time','Wisp','Friendship','Neurosurge','Demesne','Scourge','Grave Warden'],
  regent:      ['Convergence','Alignment','Glow','Void Form']
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
  'Convergence': 1, 'Alignment': 2, 'Void Form': 2
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
  'Glow':2, 'Convergence':1, 'Glimmer':2, 'Prophesize':6, 'Big Bang':2
};

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
        hp: '173 HP',
        pattern: [
          ['Attack2','Ink Blot: 7 dmg'],
          ['Buff','Prepare: +2 Str'],
          ['Attack3','Inky Lance: 6x2'],
          ['Attack4+Status','Dismember: 27 + 3 Wounds'],
          ['cycle','→ repeat cycle'],
          ['power','Slippery: 9 stacks — each hit deals only 1 dmg (multi-hit strips fast)']
        ],
        strategy: 'Starts with 9 Slippery. Str +2 per cycle makes late Dismember lethal. Wounds pollute deck.',
        killOrder: 'Multi-hit strips Slippery fast. Block Dismember (27). Kill before 3rd cycle.'
      },
      'The Kin': {
        type: 'Multi-Enemy',
        hp: 'Priest 190 HP, 2 Followers 47-54 HP each',
        pattern: [
          ['Att+Debuff','Orb of Frailty: 6 + Frail'],
          ['Att+Debuff','Orb of Weakness: 6 + Weak'],
          ['Attack3','Soul Beam: 12 + 3 Regen to Priest'],
          ['Buff','Dark Ritual: +6 Str'],
          ['cycle','→ repeat cycle'],
          ['power','Regen: heals Priest 3 HP/turn (stacks)'],
          ['divider'],
          ['Attack2','Follower Assault: 8 dmg'],
          ['Defend','Follower Guard: Block to Priest']
        ],
        strategy: 'Fight ends when Priest dies — Followers flee. Priest Regen heals. Dark Ritual ramps Str fast.',
        killOrder: 'Pure single-target Priest. Ignore Followers. Kill Priest before 2nd Dark Ritual.'
      },
      'Ceremonial Beast': {
        type: 'Phase-Shift',
        hp: '252 HP — Plow threshold 150 HP',
        pattern: [
          ['Buff','Phase1: Stamp — gains Plow'],
          ['Att+Buff','Phase1: Plow — 2x7 +2 Str per turn'],
          ['phase','↓ Cross 150 HP → stunned, Str reset ↓'],
          ['Debuff','Phase2: Beast Cry — Ringing (1 card/turn)'],
          ['Attack3','Beast Roar: 2x12'],
          ['Att+Buff','Plow: 2x7 +2 Str'],
          ['power','Plow: HP threshold (150). Cross it = stun + resets Str'],
          ['power','Ringing: limits you to 1 card play that turn (Phase 2 debuff)']
        ],
        strategy: 'Phase 1 ramps Str each turn. Crossing threshold stuns + resets Str. Phase 2 limits to 1 card/turn.',
        killOrder: 'Burst past 150 HP to trigger stun + Str reset. In Phase 2, every card must count.'
      }
    },
    elites: {
      'Bygone Effigy': {
        type: 'Gimmick',
        hp: '127 HP',
        pattern: [
          ['Sleep','T1: Sleep — free setup turn'],
          ['Buff','T2: Wake — +10 Str'],
          ['Attack2','→ Slashes: 13 dmg'],
          ['Attack2','→ Slashes: 13 dmg'],
          ['cycle','repeat (always attacks after wake)'],
          ['power','Slow: each card you play = 10% more Attack dmg it takes this turn']
        ],
        strategy: 'Wakes with +10 Str then attacks every turn. Slow makes your attacks hit harder the more cards you play.',
        killOrder: 'Free T1 for powers. After wake, block first then attack — each prior card stacks Slow. Poison bypasses Slow.'
      },
      'Phrog Parasite': {
        type: 'Multi-Enemy',
        hp: '61-64 HP, then 4 Wrigglers (17-21 HP each)',
        pattern: [
          ['Status','Infect: shuffles 3 Infections'],
          ['Attack3','Lash: 4x4 dmg'],
          ['cycle','→ alternating pattern'],
          ['power','Infection: status card that deals dmg if held at turn end'],
          ['divider'],
          ['spawn','↓ On death → 4 Wrigglers ↓'],
          ['Buff','Wrigglers: gain 1 Str/turn'],
          ['note','Poison/Doom kill = Wrigglers stunned on your next turn. Attack/Orb kill = they act immediately.']
        ],
        strategy: 'Alternates Infect/Lash. On death splits into 4 Wrigglers that scale Str each turn.',
        killOrder: 'Let Poison/Doom finish it for free stunned turn. Otherwise AoE Wrigglers fast.'
      },
      'Byrdonis': {
        type: 'Scaling',
        hp: '81-84 HP',
        pattern: [
          ['Attack2','Swoop: 17 dmg'],
          ['Attack2','Peck: 4x3 (triple-dips Str)'],
          ['Buff','+1 Str at end of every turn'],
          ['cycle','→ Swoop → Peck → repeat'],
          ['power','Territorial: unknown effect (likely damage amp)']
        ],
        strategy: 'Just attacks and scales. No mechanics to exploit — raw speed check.',
        killOrder: 'Kill in 3 turns max. Every stall turn = +3 more Peck damage.'
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
        hp: '240 HP (3-phase fight) — explodes on death',
        pattern: [
          ['Buff','T1: Pressurize — +15 Steam Eruption'],
          ['Att+Debuff','Slosh: 9 dmg + Weak + 3 SE'],
          ['Attack3','Slam: 18 dmg + 3 SE'],
          ['Att+Debuff','Stomp: 15 dmg + Weak + 3 SE'],
          ['cycle','→ repeat cycle'],
          ['power','Steam Eruption: accumulates each turn. On death, explodes for accumulated damage (~30-40) next turn']
        ],
        strategy: 'Accumulates Steam Eruption each turn. On death, becomes invulnerable then explodes for accumulated damage. No SE = no explosion.',
        killOrder: 'Save block for kill turn — explosion hits 1 turn later. Poison/Doom bypass death invulnerability.'
      },
      'Soul Fysh': {
        type: 'Gimmick',
        hp: '211 HP',
        pattern: [
          ['Status','Beckon: shuffle 2 Beckons (1 draw, 1 discard)'],
          ['Attack3','De-Gas: 16 dmg'],
          ['Attack2+Status','Gaze: 7 dmg + 1 Beckon'],
          ['Buff','Fade: 1 Intangible (fades on your turn)'],
          ['cycle','→ repeat cycle'],
          ['power','Beckon: status card. 6 dmg if held at turn end'],
          ['power','Fade: grants 1 Intangible that fades instantly on your turn']
        ],
        strategy: 'Beckon cards deal damage if held at end of turn. Fade makes it immune for 1 attack then fades.',
        killOrder: 'Clear Beckons every turn. Attack on non-Fade turns. Skip attacking during Fade.'
      },
      'Lagavulin Matriarch': {
        type: 'Phase-Shift',
        hp: '222 HP — starts with 12 Plating + 3 Asleep',
        pattern: [
          ['Sleep','Turns 1-3: Asleep — does nothing'],
          ['Attack3','Slash: 19 dmg'],
          ['Attack3','Disembowel: 9x2'],
          ['Att+Defend','Slash2: 12 dmg + 12 Block'],
          ['Debuff','Soul Siphon: permanent -1 Str, -1 Dex'],
          ['cycle','→ repeat cycle'],
          ['power','Plating: 12 stacks — absorbs damage. Wake early by dealing unblocked dmg'],
          ['power','Asleep: 3 turns of free setup. Wake early = lose free turns']
        ],
        strategy: '3 free setup turns with 12 Plating. Soul Siphon permanently reduces Str AND Dex each cycle.',
        killOrder: 'Use 3 free turns for powers. Strip Plating with multi-hit. Kill before 2nd Soul Siphon.'
      }
    },
    elites: {
      'Phantasmal Gardeners': {
        type: 'Multi-Enemy',
        hp: '4 Gardeners, 26-31 HP each (7 Skittish)',
        pattern: [
          ['Attack2','Bite: 5 dmg'],
          ['Attack2','Lash: 7 dmg'],
          ['Attack1','Flail: 1x3'],
          ['Buff','Enlarge: +2 Str'],
          ['cycle','→ repeat (all 4 offset-start)'],
          ['power','Skittish: 7 stacks — takes extra damage while active']
        ],
        strategy: 'Four enemies on same cycle offset. Combined damage ramps with each Enlarge.',
        killOrder: 'Focus one to drop incoming damage. Priority: closest to Enlarge. AoE kills all 4.'
      },
      'Terror Eel': {
        type: 'Gimmick',
        hp: '140 HP',
        pattern: [
          ['Attack3','Crash: 16 dmg'],
          ['Att+Buff','Thrash: 3x3 + 6 Vigor'],
          ['cycle','→ Crash → Thrash → repeat'],
          ['Stun','↓ At 70 HP ↓'],
          ['Debuff','99 Vulnerable (permanent)'],
          ['power','Vigor: adds flat +6 dmg to next Attack (Crash hits 22 instead of 16)']
        ],
        strategy: 'Vigor from Thrash boosts next Crash. At 70 HP, stuns itself then applies permanent 99 Vulnerable.',
        killOrder: 'Plan when to cross 70 HP. Set up burst during stun. After Vulnerable, end fast.'
      },
      'Skulking Colony': {
        type: 'Gimmick',
        hp: '70 HP — Hardened Shell 15',
        pattern: [
          ['Attack3','Smash: 13 dmg'],
          ['Buff','Grow: +4 Str + 8 Block'],
          ['cycle','→ Smash → Grow → repeat'],
          ['power','Hardened Shell: 15 — max 15 HP loss per turn. Attacks EVERY turn']
        ],
        strategy: 'Hardened Shell caps damage at 15/turn. Alternates heavy hit and stat gain. Attacks every turn.',
        killOrder: '5-turn minimum. Consistent 15/turn is optimal. Block Smash, attack Grow.'
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
        hp: '321 HP + Sandpit (4-turn instant death)',
        pattern: [
          ['Buff+Status','T1: Sandpit — 4 countdown + 6 Frantic Escapes'],
          ['Attack4','Lunging Bite: 28 dmg'],
          ['Attack3','Thrash: 8x2'],
          ['Buff','Desperate Lunge: +6 Str + more Escapes'],
          ['cycle','→ repeat cycle'],
          ['power','Sandpit: 4-turn death countdown. Extended by playing Frantic Escape'],
          ['power','Frantic Escape: status. Extends Sandpit by 1. Energy cost +1 each use']
        ],
        strategy: 'Timer-capped boss. Frantic Escapes are mandatory each turn. Energy cost scales, making late game brutally expensive.',
        killOrder: 'Must draw and play a Frantic Escape every turn. High energy gen is critical. Damage between surviving.'
      },
      'Knowledge Demon': {
        type: 'Strategic Choice',
        hp: '379 HP',
        pattern: [
          ['Debuff','T1: Curse of Knowledge — choose curse'],
          ['Attack3','Claw: 15 dmg'],
          ['Attack3','Claw: 15 dmg'],
          ['Attack4','Grasping Void: 25 dmg'],
          ['Debuff','Curse of Knowledge — choose again'],
          ['cycle','→ repeat cycle'],
          ['power','Disintegration: 6-8 dmg/turn (increasing each set)'],
          ['power','Mind Rot: draw 1 fewer card per turn'],
          ['power','Sloth: max 3 cards played per turn'],
          ['power','Waste Away: -1 energy per turn']
        ],
        strategy: 'Each Curse offers a binary choice between damage or resource loss. Both paths stack over time.',
        killOrder: 'Fast builds: take resource curses (Mind Rot, Sloth, Waste Away). Slow builds: tank Disintegration.'
      },
      'Kaiser Crab': {
        type: 'Multi-Enemy',
        hp: 'Crusher Claw 209 HP, Rocket Claw 199 HP',
        pattern: [
          ['Attack2','Crusher: Clamp — 12 dmg'],
          ['Att+Buff','Crusher: Adapt — +2 Str + 8 Block'],
          ['Attack3','Crusher: Crush — 18 dmg'],
          ['divider'],
          ['Attack3','Rocket: Slam — 15 dmg'],
          ['Buff','Rocket: Charge Up — +2 Str'],
          ['Attack4','Rocket: Laser — 24 dmg'],
          ['power','Surrounded: take 50% more dmg from behind (use targeting cards to face attacker)'],
          ['power','Crab Rage: when one claw dies, survivor gains +5 Str + 99 Block']
        ],
        strategy: 'Two independent claws. Surrounded makes you take 50% more damage from the wrong direction. Crab Rage punishes killing one too early.',
        killOrder: 'Face the attacking claw. Kill Rocket first (faster scaler). Kill both near-simultaneously.'
      }
    },
    elites: {
      'Decimillipede': {
        type: 'Multi-Enemy',
        hp: '3x 40-46 HP segments',
        pattern: [
          ['Att+Debuff','Bulk: 5 dmg + 3 Str'],
          ['Att+Debuff','Gnaw: 8 dmg + Weak'],
          ['Att+Debuff','Outgas: 6 dmg + Weak'],
          ['Heal','On death: revives 25 HP if other segment alive'],
          ['power','Reattach: when a segment dies, revives with 25 HP if another segment still alive']
        ],
        strategy: 'Three segments with staggered cycles. Killing one triggers revival unless all die same turn.',
        killOrder: 'Focus one dead before touching others. Only AoE that kills all 3 at once. Never spread damage.'
      },
      'Entomancer': {
        type: 'Gimmick',
        hp: '145 HP — Personal Hive',
        pattern: [
          ['Attack3','Entangle: 23 dmg'],
          ['Attack3','Swarm: 10x2'],
          ['Buff','Hive Mind: +6 Str'],
          ['cycle','→ repeat cycle'],
          ['power','Personal Hive: each Attack you play shuffles 1 Dazed into your draw pile']
        ],
        strategy: 'Personal Hive punishes multi-hit decks. Every attack clogs your draw pile with Dazed cards.',
        killOrder: 'One heavy hit per turn > many small. Hit on Swarm, block on Entangle. Poison/Doom bypass Dazed.'
      },
      'Infested Prism': {
        type: 'Gimmick',
        hp: '200 HP — Vital Spark',
        pattern: [
          ['Attack4','Prism Blast: 20 dmg'],
          ['Defend','Crystalize: +15 Block — skip attacking'],
          ['Att+Defend','Shimmer: +5 Str + 15 Block'],
          ['cycle','→ repeat cycle'],
          ['power','Vital Spark: +1 energy first time you deal Attack damage each turn']
        ],
        strategy: 'Gives free energy for attacking. Cycle alternates damage and Block turns — timing matters.',
        killOrder: 'Hit once per turn for +1 energy. Concentrate damage on Prism Blast. Use extra energy to scale.'
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
        hp: 'Queen 400 HP + Torch Head Amalgam 199 HP (Minion)',
        pattern: [
          ['Debuff','Puppet Strings: Chain of Binding (Bound cards)'],
          ['Debuff','You\'re Mine: 99 Frail/Weak/Vuln'],
          ['Att+Defend','Burn Bright: +2 Str + def'],
          ['Attack4','Off With Your Head: 25 dmg'],
          ['Buff','Enrage: gain Str'],
          ['cycle','→ repeat cycle'],
          ['power','Chains of Binding: first X cards drawn each turn are Bound — cannot be played'],
          ['divider'],
          ['Attack3','Torch Head: Tackle — 18 dmg'],
          ['Attack3','Torch Head: Beam — 14 dmg'],
          ['power','Minion: Torch Head has 199 HP. Dies when reduced to 0. Queen exposed after']
        ],
        strategy: 'Queen hides behind Torch Head Amalgam. Applies Chains of Binding (can\'t play drawn cards) and mass debuffs.',
        killOrder: 'Kill Amalgam first to expose Queen. After that, unload everything. Draw power offsets Bound cards.'
      },
      'Doormaker': {
        type: 'Phase-Shift',
        hp: 'Doormaker 489 HP — opens as infinite-HP Door',
        pattern: [
          ['phase','Opens as Door: infinite HP'],
          ['phase','↓ Transforms to Doormaker ↓'],
          ['Debuff','Closed: immune, no target'],
          ['power','Hunger: lose 1 energy per card played'],
          ['power','Scrutiny: cannot draw cards'],
          ['power','Grasp: cannot play Skill cards'],
          ['cycle','→ Closed → Hunger → Scrutiny → Grasp → repeat'],
          ['note','Only vulnerable between form changes. DoT carries through invulnerability.']
        ],
        strategy: 'Cycles through forms that disable different card types. Only damageable in short windows between forms.',
        killOrder: 'Deal damage in brief windows between forms. DoT carries through invulnerability.'
      },
      'Test Subject #C8': {
        type: 'Phase-Shift',
        hp: 'P2 revives 200 HP, P3 revives 300 HP',
        pattern: [
          ['phase','Phase 1: Enrage (dmg reduction + Str/turn)'],
          ['power','Enrage: reduces incoming damage + gains Strength each turn'],
          ['phase','↓ killed → revives with Painful Stabs ↓'],
          ['Attack4','Phase 2: Multi-Claw — 3x9 (+1 hit/use)'],
          ['power','Painful Stabs: Multi-Claw gains +1 hit each use (3→4→5→6 hits)'],
          ['phase','↓ killed → revives with Intangibility ↓'],
          ['Buff','Phase 3: Intangible — immune on alternating turns'],
          ['power','Intangible: reduces damage from all sources to 1 (immune in practice)']
        ],
        strategy: 'Three-phase fight. Phase 1 ramps Enrage. Phase 2 ramps Multi-Claw hits. Phase 3 alternates Intangible.',
        killOrder: 'Burst Phase 1. Kill Phase 2 fast before Claw ramps. Phase 3: attack non-Intangible turns only.'
      }
    },
    elites: {
      'Knight Trio': {
        type: 'Multi-Enemy',
        hp: 'Flail 101 HP, Spectral 93 HP, Magi 82 HP',
        pattern: [
          ['Defend','Magi: Power Shield — +12 Block'],
          ['power','Dampen: weakens your powers (Magi Knight)'],
          ['Attack2','Magi: Ram — 8 dmg'],
          ['Attack4','Magi: Magic Bomb — 25 dmg'],
          ['power','Magic Bomb: 25 dmg attack from Magi Knight'],
          ['divider'],
          ['Attack2','Spectral: Spectral Slash — 13 dmg'],
          ['power','Hex: ALL your cards gain Ethereal while Spectral Knight is alive'],
          ['Attack2','Spectral: Shadow Slash — 2x8'],
          ['divider'],
          ['Attack3','Flail: Flail — 2x9'],
          ['Attack3','Flail: Heavy Swing — 18 dmg']
        ],
        strategy: 'Three enemies with different patterns. Hex is devastating — makes all cards Ethereal. Magic Bomb hits hard.',
        killOrder: 'Kill Magi first (stops Dampen + Bomb). Then Spectral (drops Hex). Flail last. AoE hits all three.'
      },
      'Mecha Knight': {
        type: 'Gimmick',
        hp: '300 HP — starts with 3 Artifact',
        pattern: [
          ['Attack4','Charge: 25 dmg'],
          ['Status','Flamethrower: 4 Burns to hand'],
          ['Att+Defend','Windup: +15 Block +5 Str — skip attacking'],
          ['Attack4','Heavy Cleave: 35 dmg'],
          ['cycle','→ Charge → Flamethrower → Windup → Heavy Cleave → repeat'],
          ['power','Artifact: 3 stacks — blocks first 3 debuffs completely'],
          ['power','Burn: status card. 8 unblockable dmg if held at turn end']
        ],
        strategy: 'Fixed cycle with clear telegraphs. Only attacks on Charge and Heavy Cleave. Burns punish holding cards.',
        killOrder: 'Strip 3 Artifact with cheap debuffs. Attack Charge/Flamethrower. Skip Windup. Block Cleave. Clear Burns.'
      },
      'Soul Nexus': {
        type: 'Gimmick',
        hp: '234 HP',
        pattern: [
          ['Attack4','T1: Soul Burn — 29 dmg (must block)'],
          ['Attack4','Soul Burn: 29 dmg'],
          ['Attack4','Maelstrom: 6x4 (best attack window)'],
          ['Att+Debuff','Drain Life: 18 dmg + 2 Vuln + 2 Weak'],
          ['note','Non-repeating random rotation. Drain Life debuffs stack each cycle.']
        ],
        strategy: 'Hardest elite opener (29 guaranteed). No repeat moves. Drain Life debuffs stack every cycle.',
        killOrder: 'Block 29 on T1. Attack on Maelstrom turns. After Drain Life, block extra next turn.'
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
    {name:'Strength engine',cards:['Demon Form','Inflame','Rupture'],note:'Passive Strength per turn. Go wide with multi-hit.'},
    {name:'Block engine',cards:['Barricade','Juggernaut','Body Slam'],note:'Block never expires. Juggernaut converts block to damage.'}
  ],
  silent: [
    {name:'Sly engine',cards:['Tactician','Tools of the Trade','Master Planner'],note:'Discard = free Energy. Keep deck thin to cycle fast.'},
    {name:'Shiv engine',cards:['Accuracy','Infinite Blades','Knife Trap'],note:'Scale Shiv damage. Accuracy stacks multiplicatively.'},
    {name:'Poison engine',cards:['Noxious Fumes','Accelerant','Bubble Bubble'],note:'Stack Poison then double it. Survive the early turns.'}
  ],
  defect: [
    {name:'Orb/Focus engine',cards:['Defragment','Loop','Multi-Cast'],note:'Stack Focus ASAP. Remove Strikes — passive orbs outscale them by Act 2.'},
    {name:'Claw engine',cards:['Claw','All for One','Scrape'],note:'Every Claw buffs all Claws. Keep deck small. Feral returns 0-cost attacks.'},
    {name:'Hologram/TURBO loop',cards:['Hologram','TURBO','Claw'],note:'TURBO generates energy, Hologram retrieves Claw. Infinite-like turns with enough draw.'}
  ],
  necrobinder: [
    {name:'Borrowed Time engine',cards:['Borrowed Time','Graveblast'],note:'Burst 4 Energy in one turn — cards cost 1 more but Graveblast retrieves key cards from discard. Big turn enabler.'},
    {name:'Doom engine',cards:['Deathbringer','Death\'s Door','Shroud'],note:'Stack Doom, then trigger. Need Block to survive the wait. End of Days solves timing.'},
    {name:'Osty engine',cards:['Rattle','Sic \'Em','Necro Mastery'],note:'Stack Osty HP. Rattle+Sic\'Em each turn. Necro Mastery converts Block to attacks.'},
    {name:'Soul deferral',cards:['Soul','Haunt','Devour Life'],note:'Bank Souls for future draw instead of playing immediately. Use when Energy is tight.'}
  ],
  regent: [
    {name:'Star/Vigor engine',cards:['Genesis','Alignment','Radiate'],note:'Stack Stars, trade for Energy via Alignment. Radiate = 3 AoE per Star gained. Pattern+Celestial Might = one big hit.'},
    {name:'Blade/Forge engine',cards:['Summon Forth','Conqueror','The Smith'],note:'Forge the Blade every turn. Conqueror doubles Forge count. Decisions Decisions + Glow are the grease.'},
    {name:'Starfall mode',cards:['Radiate','Terraforming','Gamma Blast'],note:'25+ Stars in one turn = massive Radiate nuke. Shift to Vigor + Star generation to set up.'}
  ]
};
