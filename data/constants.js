// Shared constants and lookup tables for STS2 Build Advisor.
// Keep this file data-only.

const DECK_THRESHOLDS = {
  lean: 10,
  healthyMin: 15,
  bloated: 25,
  tooLarge: 30,
  heavyAtkPct: 45,
  heavyAtkDiff: 15,
  heavyAtkSclDiff: 10,
  heavyDefPct: 40,
  heavyDefDiff: 15,
  heavySclPct: 45,
  heavySclDiff: 15,
  lowVelScore: 25,
  lowVelMinDeck: 8,
  lowBlkScore: 25,
  lowDmgScore: 25,
  heavyAtkBlkReq: 40,
  heavyDefDmgReq: 40,
  heavySclDmgReq: 35
};

const ACT_ADVICE = [
  "Sprint to 100 damage in 3 turns. Fight 3+ Elites. Take almost every card reward.",
  "Find your scaling engine now. Start skipping cards that don't fit your archetype.",
  "Reduce variance. Remove Strikes and Defends. Only take cards that fix disaster hands."
];

// Confirmed starting decks (STS2 Early Access)
// ============================================================
// CARD TIER RATINGS (from v0.103.2 research dossier)
// Tiers: S (must pick), A (strong), B (situational), C (weak), D (trap)
// Format: { cardName: {tier, note} }
// note is optional - shown for context-dependent picks
// ============================================================
const CARD_TIERS = {
  ironclad: {
    // S-tier
    'Offering':{tier:'S', note:'Best Ironclad card - 70% pick rate'},
    'Feed':{tier:'S', note:'Permanent Max HP scaling on kill'},
    'Hellraiser':{tier:'S', note:'Drawn Strikes auto-play - enables infinite'},
    'Corruption':{tier:'S', note:'Skills cost 0 - core Exhaust engine'},
    'Bloodletting':{tier:'S', note:'Best 0-cost energy generator'},
    'Pyre':{tier:'S', note:'Permanent +1 energy/turn - new in v0.103'},
    'Battle Trance':{tier:'S', note:'Elite draw - forbidden in Hellraiser infinite'},
    // A-tier
    'Impervious':{tier:'A', note:'30 Block panic button'},
    'Crimson Mantle':{tier:'A', note:'Reliable self-damage Block trigger'},
    'Taunt':{tier:'A', note:'7 Block + Vuln - top common pick'},
    'Brand':{tier:'A', note:'Permanent Strength + Exhaust + HP loss'},
    'Pommel Strike':{tier:'A', note:'Best common - damage + draw, infinite enabler'},
    'Inflame':{tier:'A', note:'Cheap permanent +2 Strength'},
    'Colossus':{tier:'A', note:'Now Uncommon - 41% pick rate'},
    'Shrug It Off':{tier:'A', note:'8 Block + draw - universal common'},
    'Burning Pact':{tier:'A', note:'Exhaust trigger + draw 2'},
    'Cruelty':{tier:'A', note:'Vuln enemies take +25%/+50% - run-defining'},
    'Thrash':{tier:'A', note:'Scales with Exhausted Attacks'},
    'Cascade':{tier:'A', note:'Plays top X - explosive combo'},
    'Fiend Fire':{tier:'A', note:'Nuke finisher in Exhaust decks'},
    'Demon Form':{tier:'A', note:'S in pure Strength but out-competed by Rupture'},
    'Not Yet':{tier:'A', note:'New v0.103.2 - only Ironclad heal card'},
    'Rupture':{tier:'A', note:'Cheaper than Demon Form, scales faster'},
    // B-tier
    'Stomp':{tier:'B'}, 'Flame Barrier':{tier:'B'}, 'Conflagration':{tier:'B'},
    'Expect a Fight':{tier:'B', note:'Reworked in v0.103'}, 'Dismantle':{tier:'B'},
    'Rage':{tier:'B'}, 'Uppercut':{tier:'B'}, 'One-Two Punch':{tier:'B'},
    'Feel No Pain':{tier:'B', note:'A-tier in Exhaust decks only'},
    'Dark Embrace':{tier:'B', note:'A-tier in Exhaust decks only'},
    'Whirlwind':{tier:'B'}, 'Pillage':{tier:'B'}, 'Spite':{tier:'B', note:'Reworked in v0.103'},
    'Stoke':{tier:'B', note:'Reworked in v0.103'}, 'Barricade':{tier:'B', note:'A only with Body Slam/Entrench'},
    "Pact's End":{tier:'B'}, 'Tear Asunder':{tier:'B'}, 'Second Wind':{tier:'B'},
    'Aggression':{tier:'B'}, 'Unmovable':{tier:'B'}, 'Setup Strike':{tier:'B'},
    'Blood Wall':{tier:'B'}, 'Twin Strike':{tier:'B'}, 'Fight Me!':{tier:'B', note:'Also buffs enemy'},
    'Headbutt':{tier:'B'}, 'Anger':{tier:'B'}, 'Mangle':{tier:'B'},
    'Howl from Beyond':{tier:'B'}, 'Infernal Blade':{tier:'B'},
    'Hemokinesis':{tier:'B'}, 'Inferno':{tier:'B', note:'A-tier in Bloodletting only'},
    'Stone Armor':{tier:'B'}, 'Vicious':{tier:'B'}, 'Evil Eye':{tier:'B'},
    'Armaments':{tier:'B'}, 'Juggernaut':{tier:'B', note:'A-tier with Barricade'},
    'Ashen Strike':{tier:'B', note:'A-tier in Exhaust decks'},
    'Perfected Strike':{tier:'B', note:'Falls off without Inflame support'},
    'Break':{tier:'B'}, 'Dominate':{tier:'B', note:'Reworked in v0.103'},
    'Rampage':{tier:'B'}, 'Thunderclap':{tier:'B'}, 'Breakthrough':{tier:'B'},
    'Drum of Battle':{tier:'B'}, 'Forgotten Ritual':{tier:'B', note:'A in Exhaust'},
    'Bludgeon':{tier:'B'}, 'Tank':{tier:'B', note:'Co-op only'},
    'Primal Force':{tier:'B'}, 'Clash':{tier:'B'}, 'Entrench':{tier:'B'},
    'Dual Wield':{tier:'B'}, 'Demonic Shield':{tier:'B', note:'Co-op'},
    // C/D traps
    'Body Slam':{tier:'C', note:'8% pick rate - trap outside Barricade decks'},
    'Juggling':{tier:'C'}, 'Iron Wave':{tier:'C'}, 'Tremble':{tier:'C'},
    'Cinder':{tier:'C'}, 'Havoc':{tier:'C', note:'4% pick rate - usually wasted'},
    'Sword Boomerang':{tier:'C'}, 'True Grit':{tier:'B', note:'Random Exhaust adds variance'},
    'Bully':{tier:'C'}, 'Stampede':{tier:'C'},
    'Molten Fist':{tier:'B', note:'A with Vuln stacking'}
  },
  silent: {
    // S-tier
    'Adrenaline':{tier:'S', note:'Arguably best card in the game'},
    'Wraith Form':{tier:'S', note:'Game-winning Intangible'},
    'Afterimage':{tier:'S', note:'Best Silent Block - triggers off Sly'},
    'Well-Laid Plans':{tier:'S', note:'Free Retain 1-2'},
    'Speedster':{tier:'S', note:'Innate on upgrade - buffed'},
    'Tools of the Trade':{tier:'S', note:'Core Sly engine'},
    'Acrobatics':{tier:'S', note:'Now Uncommon - elite draw'},
    'Piercing Wail':{tier:'S', note:'6/8 Str drop AoE - Common pricing error'},
    'Calculated Gamble':{tier:'S', note:'Best Sly activator'},
    'Footwork':{tier:'S', note:'+2 Dex - permanent Block scaling'},
    'Burst':{tier:'S', note:'Next Skill played extra time'},
    'Serpent Form':{tier:'S', note:'Buffed to 4/6 damage - Poison core'},
    // A-tier
    'Bullet Time':{tier:'A', note:'Free cards but no draw - burst turn'},
    'Abrasive':{tier:'A', note:'+1 Dex + Thorns on Sly'},
    'Backflip':{tier:'A'}, 'Fan of Knives':{tier:'A', note:'Shivs hit all - Shiv decks'},
    'Malaise':{tier:'A'}, 'The Hunt':{tier:'A', note:'Extra reward on kill'},
    'Pinpoint':{tier:'A', note:'-1 cost per Skill'},
    'Echoing Slash':{tier:'A'}, 'Hidden Daggers':{tier:'A', note:'Silent sleeper pick'},
    'Knife Trap':{tier:'A', note:'Shiv Exhaust nuke'},
    'Blur':{tier:'A'}, 'Expose':{tier:'A'}, 'Noxious Fumes':{tier:'A'},
    'Envenom':{tier:'A', note:'Poison on every Attack'},
    'Accuracy':{tier:'A', note:'+4/6 to all Shivs'}, 'Master Planner':{tier:'A', note:'Makes Skills Sly'},
    'Dagger Throw':{tier:'A', note:'Much better now with Sly'},
    'Hand Trick':{tier:'A'}, 'Accelerant':{tier:'A', note:'Poison no longer decreases'},
    'Bouncing Flask':{tier:'A'}, 'Corrosive Wave':{tier:'A', note:'Draw = Poison AoE'},
    'Deadly Poison':{tier:'A'}, 'Infinite Blades':{tier:'A', note:'Shiv generator'},
    'Bubble Bubble':{tier:'A', note:'Doubles Poison'},
    // B-tier
    'Tactician':{tier:'B', note:'S-tier with Sly, unplayable raw'},
    'Reflex':{tier:'B', note:'S-tier with Sly, unplayable raw'},
    'Prepared':{tier:'B', note:'Reworked'}, 'Flick-Flack':{tier:'B'},
    'Ricochet':{tier:'B'}, 'Untouchable':{tier:'B', note:'Nerfed but still premium'},
    'Blade Dance':{tier:'B', note:'Now Exhausts - nerf from StS1'},
    'Cloak and Dagger':{tier:'B'}, 'Strangle':{tier:'B'},
    'Assassinate':{tier:'B'}, 'Precise Cut':{tier:'B'}, 'Finisher':{tier:'B'},
    'Shadow Step':{tier:'B'}, 'Leg Sweep':{tier:'B'}, 'Tracking':{tier:'B'},
    'Escape Plan':{tier:'B'}, 'Haze':{tier:'B'}, 'Mirage':{tier:'B'},
    'Nightmare':{tier:'B'}, 'Blade of Ink':{tier:'B', note:'Reworked - Inky Shivs'},
    'Follow Through':{tier:'B'}, 'Memento Mori':{tier:'B', note:'Buffed'},
    'Dash':{tier:'B'}, 'Predator':{tier:'B'}, 'Anticipate':{tier:'B'},
    'Up My Sleeve':{tier:'B'}, 'Skewer':{tier:'B', note:'Buffed'},
    'Poisoned Stab':{tier:'B'}, 'Leading Strike':{tier:'B'},
    'Sucker Punch':{tier:'B'}, 'Dodge and Roll':{tier:'B'}, 'Deflect':{tier:'B'},
    'Outbreak':{tier:'B'}, 'Phantom Blades':{tier:'B', note:'A in Shiv decks'},
    'Storm of Steel':{tier:'B'}, 'Flechettes':{tier:'B'},
    'Tools of the Trade':{tier:'S'}, 'Sneaky':{tier:'B', note:'Co-op'},
    'Expertise':{tier:'B'}, 'Flanking':{tier:'B', note:'Co-op'},
    'Shadowmeld':{tier:'B'}, 'Grand Finale':{tier:'B', note:'S in dedicated Finale decks'},
    'Suppress':{tier:'A'}, 'Backstab':{tier:'B'}, 'Slice':{tier:'C'},
    'Murder':{tier:'B'}, 'Caltrops':{tier:'B'}, 'Distraction':{tier:'B'},
    'Outmaneuver':{tier:'B'},
    // C/D
    'Snakebite':{tier:'D', note:'Worst card in the game - Retain clogs hand'}
  },
  defect: {
    // S-tier
    'Defragment':{tier:'S', note:'Permanent Focus - pick every copy'},
    'Echo Form':{tier:'S', note:'Doubles first card - Ethereal cost'},
    'Glacier':{tier:'S', note:'Best Block value in the game'},
    'Capacitor':{tier:'S', note:'+2 Orb Slots'},
    'Hologram':{tier:'S', note:'Upgrade removes Exhaust'},
    'Biased Cognition':{tier:'S', note:'Ancient - fastest Focus spike'},
    'Biased Cog':{tier:'S', note:'Ancient - fastest Focus spike'},
    'Boot Sequence':{tier:'S', note:'Innate 10 Block - free turn 1'},
    'Coolheaded':{tier:'S', note:'Channel Frost + draw'},
    'Buffer':{tier:'S', note:'Prevents next HP loss'},
    'Creative AI':{tier:'S', note:'Random Power/turn'},
    'Synchronize':{tier:'S'}, 'Modded':{tier:'S', note:'+1 Orb Slot + draw'},
    // A-tier
    'All for One':{tier:'A', note:'Core Claw combo'},
    'Supercritical':{tier:'A', note:'+4 Energy + Exhaust'},
    'Hyperbeam':{tier:'A', note:'26 AoE - loses Focus'},
    'Genetic Algorithm':{tier:'A', note:'Permanent Block scaling'},
    'Shatter':{tier:'A', note:'Evokes all Orbs'},
    'Ball Lightning':{tier:'A'}, 'Cold Snap':{tier:'A'}, 'Lightning Rod':{tier:'A'},
    'Compile Driver':{tier:'A', note:'Up to 4 draws with Glass'},
    'Voltaic':{tier:'A', note:'Exhaust unless upgraded'},
    'Thunder':{tier:'A'}, 'Tesla Coil':{tier:'A'}, 'Darkness':{tier:'A'},
    'Hotfix':{tier:'A', note:'Now Exhausts unless upgraded'},
    'Hot Fix':{tier:'A', note:'Now Exhausts unless upgraded'},
    'Focused Strike':{tier:'A'}, 'Quadcast':{tier:'A'}, 'Dualcast':{tier:'A'},
    'Dual Cast':{tier:'A'}, 'Rocket Punch':{tier:'A', note:'Buffed - cost reduction persists'},
    'Signal Boost':{tier:'A', note:'Persists across turns'},
    'Ignition':{tier:'A', note:'Co-op star'},
    // B-tier
    'Chill':{tier:'B'}, 'Charge Battery':{tier:'B'}, 'Claw':{tier:'B', note:'A in Claw deck'},
    'FTL':{tier:'B'}, 'Scrape':{tier:'B'}, 'Skim':{tier:'B'}, 'Feral':{tier:'B'},
    'Machine Learning':{tier:'B'}, 'Consuming Shadow':{tier:'B'},
    'Glasswork':{tier:'B'}, 'Shadow Shield':{tier:'B'}, 'Multi-Cast':{tier:'B', note:'A with Dark'},
    'Energy Surge':{tier:'B'}, 'TURBO':{tier:'B'}, 'Turbo':{tier:'B'},
    'Fusion':{tier:'B'}, 'Iteration':{tier:'B'}, 'Fight Through':{tier:'B'},
    'Gunk Up':{tier:'B'}, 'Overclock':{tier:'B'}, 'Spinner':{tier:'B'},
    'Double Energy':{tier:'B'}, 'Tempest':{tier:'B', note:'Buffed - no longer Exhausts'},
    'Reboot':{tier:'B'}, 'Rip and Tear':{tier:'B'}, 'Leap':{tier:'B'},
    'Null':{tier:'B'}, 'Sweeping Beam':{tier:'B'}, 'Helix Drill':{tier:'B'},
    'Sunder':{tier:'B'}, 'Subroutine':{tier:'B'}, 'Storm':{tier:'B'},
    'Meteor Strike':{tier:'B', note:'Trap in Frost Turtle'},
    'Rainbow':{tier:'B'}, 'Uproar':{tier:'B', note:'S in Uproar decks, C elsewhere'},
    'Flak Cannon':{tier:'B'}, 'Zap':{tier:'B'}, 'Smokestack':{tier:'B'},
    'Loop':{tier:'A', note:'Core Orb engine'}, 'Barrage':{tier:'B'},
    'White Noise':{tier:'B'}, 'Adaptive Strike':{tier:'B'},
    'Coolant':{tier:'A'}, 'Trash to Treasure':{tier:'B'},
    'Ice Lance':{tier:'A'}, 'Hailstorm':{tier:'A'}, 'Chaos':{tier:'B'},
    'Go for the Eyes':{tier:'B'}, 'Beam Cell':{tier:'B'}, 'Momentum Strike':{tier:'B'},
    'Flash of Steel':{tier:'B'}, 'BoostAway':{tier:'C'}, 'Boost Away':{tier:'C'},
    'Bulk Up':{tier:'B'}, 'Compact':{tier:'B'}, 'Synthesis':{tier:'C'},
    'Rebound':{tier:'B'}, 'Stack':{tier:'B'}, 'Hello World':{tier:'B'},
    'Reinforce':{tier:'B'}, 'Rip the Ether':{tier:'B'}
  },
  necrobinder: {
    // S-tier
    'Neurosurge':{tier:'S', note:'Free energy + cards at HP cost'},
    'Friendship':{tier:'S', note:'Universal - +1 energy, Osty unaffected'},
    'Dirge':{tier:'S', note:'Defines Osty AND Soul builds'},
    // A-tier
    'Hang':{tier:'A'}, 'Eradicate':{tier:'A', note:'Retain + X damage'},
    'Borrowed Time':{tier:'A', note:'Reworked - +4/6 energy'},
    'Necro Mastery':{tier:'A', note:'Osty core'},
    'No Escape':{tier:'A', note:'Exponential Doom'},
    'Glimpse Beyond':{tier:'A', note:'Ethereal draw 3'},
    'Squeeze':{tier:'A', note:'Osty nuke'}, 'Undeath':{tier:'A', note:'0-cost Block engine'},
    "Banshee's Cry":{tier:'A', note:'Ethereal AoE'},
    'Fetch':{tier:'A', note:'Osty attack + draw'},
    'Oblivion':{tier:'A'}, 'Spirit of Ash':{tier:'A', note:'Ethereal Block'},
    'Protector':{tier:'A', note:'Ancient'}, 'Transfigure':{tier:'A', note:'Adds Replay'},
    'The Scythe':{tier:'A', note:'Permanent +3 damage'},
    'Capture Spirit':{tier:'A', note:'3 Souls + HP'},
    'Captured Spirit':{tier:'A', note:'3 Souls + HP'},
    'End of Days':{tier:'A', note:'Executes Doomed enemies'},
    // B-tier
    'Demesne':{tier:'B', note:'Ethereal Power'}, 'Deathbringer':{tier:'B'},
    'Lethality':{tier:'B'}, 'Flatten':{tier:'B'}, 'Reanimate':{tier:'B'},
    'High Five':{tier:'B'}, "Death's Door":{tier:'B'}, 'Misery':{tier:'B'},
    'Grave Warden':{tier:'B'}, 'Haunt':{tier:'B', note:'A in Soul decks'},
    'Calcify':{tier:'B'}, 'Debilitate':{tier:'B'}, 'Negative Pulse':{tier:'B'},
    "Time's Up":{tier:'B'}, 'Call of the Void':{tier:'B'},
    'Scourge':{tier:'B'}, 'Rattle':{tier:'B', note:'A in Osty decks'},
    'Sleight of Flesh':{tier:'B'}, 'Bone Shards':{tier:'B', note:'Kills Osty!'},
    'Veilpiercer':{tier:'B'}, 'Melancholy':{tier:'B'}, 'Soul Storm':{tier:'B', note:'A in Soul decks'},
    'Reaper Form':{tier:'B'}, 'Forbidden Grimoire':{tier:'B', note:'Ancient'},
    'Shared Fate':{tier:'B'}, 'Dredge':{tier:'B'}, 'Seance':{tier:'B', note:'Nerfed to 1E'},
    'Pull from Below':{tier:'B'}, 'Cleanse':{tier:'B'}, 'Parse':{tier:'B'},
    'Wisp':{tier:'B'}, 'Bury':{tier:'B'}, 'Afterlife':{tier:'B'},
    'Countdown':{tier:'B'}, 'Danse Macabre':{tier:'B'}, 'Severance':{tier:'B'},
    'Devour Life':{tier:'B', note:'A in Soul decks'}, 'Defile':{tier:'B'},
    'Defy':{tier:'B'}, 'Pull Aggro':{tier:'B'}, 'Putrefy':{tier:'B'},
    'Graveblast':{tier:'B'}, 'Grave Blast':{tier:'B'},
    'Fear':{tier:'B'}, 'Reave':{tier:'B'}, 'Drain Power':{tier:'B'},
    'Invoke':{tier:'B'}, 'Bodyguard':{tier:'B'}, 'Snap':{tier:'B', note:'Free Retain'},
    'Unleash':{tier:'B'}, 'Reap':{tier:'B', note:'Retain + 27 damage'},
    'Sentry Mode':{tier:'B'}, 'Spur':{tier:'B'}, 'Blight Strike':{tier:'B'},
    'Pagestorm':{tier:'B'}, 'Page Storm':{tier:'B'}, "Sic 'Em":{tier:'B'},
    'Right Hand Hand':{tier:'B'}, 'Sculpting Strike':{tier:'B'}, 'Sow':{tier:'B'},
    'Poke':{tier:'B'}, 'Death March':{tier:'B'}, 'Durge':{tier:'S', note:'Defines Osty AND Soul'},
    'Legion of Bone':{tier:'B'}, 'Shroud':{tier:'B'}, 'Delay':{tier:'B'},
    'Enfeebling Touch':{tier:'D', note:'Trap pick'},
    'Sacrifice':{tier:'D', note:'Trap pick'}
  },
  regent: {
    // S-tier
    'Comet':{tier:'S', note:'33 dmg + debuffs - nerf expected'},
    'Reflect':{tier:'S', note:'17 Block + reflects'},
    'The Sealed Throne':{tier:'S', note:'Ancient - Star per play'},
    'Big Bang':{tier:'S', note:'Near-Adrenaline - all-in-one'},
    'Meteor Shower':{tier:'S', note:'Upgraded Falling Star'},
    'Convergence':{tier:'S', note:'Retain + refund energy'},
    // A-tier
    'Void Form':{tier:'A', note:'Act 3 only - never Act 1'},
    'Bulwark':{tier:'A', note:'13 Block + Forge 10'},
    'Astral Pulse':{tier:'A', note:'0E/3 Stars AoE 14'},
    'Child of the Stars':{tier:'A', note:'Stars to Block'},
    'Make It So':{tier:'A'}, 'Make it So':{tier:'A'},
    'The Smith':{tier:'A', note:'Forge 30'},
    'GUARDS!!!':{tier:'A', note:'Minion transformation'},
    'Guards':{tier:'A', note:'Minion transformation'},
    'Decisions Decisions':{tier:'A', note:'Draw 3 + triple skill'},
    'CHARGE!!':{tier:'A'}, 'Particle Wall':{tier:'A', note:'Returns to hand'},
    'Glow':{tier:'A', note:'Nerfed - no longer draws 2 immediately'},
    'BEGONE!':{tier:'A'}, 'Guiding Star':{tier:'A', note:'Buffed - draws 2 immediately'},
    'Venerate':{tier:'A'},
    // B-tier
    'Dying Star':{tier:'B'}, 'Gamma Blast':{tier:'B'}, 'Kingly Punch':{tier:'B'},
    'Royal Gamble':{tier:'B'}, 'Royal Gambit':{tier:'B'}, 'Hidden Cache':{tier:'B'},
    'Alignment':{tier:'B', note:'S in Infinite decks'}, 'Tyranny':{tier:'B'},
    'Orbit':{tier:'B'}, 'Gather Light':{tier:'B'},
    'Genesis':{tier:'A', note:'Star engine - 2 Stars/turn'},
    'Pale Blue Dot':{tier:'B'}, 'Black Hole':{tier:'B'}, 'Royalties':{tier:'B'},
    'Falling Star':{tier:'B'}, 'Cloak of Stars':{tier:'B'}, 'Know Thy Place':{tier:'B'},
    'I Am Invincible':{tier:'B'}, 'Radiate':{tier:'B', note:'S in Starfall'},
    'Photon Cut':{tier:'B'}, 'Heavenly Drill':{tier:'B'}, 'Shining Strike':{tier:'B'},
    'Bombardment':{tier:'B'}, 'Glitterstream':{tier:'B'}, 'Kingly Kick':{tier:'B'},
    'Glimmer':{tier:'B'}, 'Patter':{tier:'B'}, 'Beat into Shape':{tier:'B'},
    'Stardust':{tier:'B'}, 'Crush Under':{tier:'B'}, 'Cosmic Indifference':{tier:'B'},
    'Celestial Might':{tier:'B'}, 'Manifest Authority':{tier:'B'},
    'Spectrum Shift':{tier:'B'}, 'Pillar of Creation':{tier:'B'}, 'Solar Strike':{tier:'B'},
    'Monarch\'s Gaze':{tier:'B'}, "Monarch's Gaze":{tier:'B'},
    'Parry':{tier:'B'}, 'Prophesize':{tier:'A', note:'Draw 6'}, 'Quasar':{tier:'B'},
    'Resonance':{tier:'B'}, 'Hegemony':{tier:'B'}, 'Furnace':{tier:'A', note:'Passive Forge'},
    'Supermassive':{tier:'B'}, 'Terraforming':{tier:'B'}, 'Largesse':{tier:'B', note:'Co-op'},
    'Lunar Blast':{tier:'B'}, 'Monologue':{tier:'B'}, 'Seven Stars':{tier:'A', note:'S with Sealed Throne'},
    'Neutron Aegis':{tier:'B'}, 'Crescent Spear':{tier:'C'},
    'Devastate':{tier:'C', note:'Trap - needs generation'},
    // Traps
    'Wrought in War':{tier:'C'},
    'Hammer Time':{tier:'C'}, 'Conqueror':{tier:'C', note:'D without Retain chain'},
    'Heirloom Hammer':{tier:'C', note:'Needs Colorless pool'},
    'Refine Blade':{tier:'C'}, 'Arsenal':{tier:'B', note:'Reworked - any creation'},
    'Bundle of Joy':{tier:'C'}, 'Summon Forth':{tier:'B', note:'A in Forge decks'},
    'Sword Sage':{tier:'C', note:'Buggy Blade interactions'},
    'Sword Stage':{tier:'C'}, 'Foregone Conclusion':{tier:'B'},
    'Crash Landing':{tier:'B'}
  },
  colorless: {
    // Generally good
    'Discovery':{tier:'A', note:'Choose 1 of 3 free cards'},
    'Master of Strategy':{tier:'A', note:'Draw 3 exhaust'},
    'Apotheosis':{tier:'S', note:'Upgrade ALL cards - Ancient'},
    'Apparition':{tier:'A', note:'1 Intangible - Ancient'},
    'Brightest Flame':{tier:'S', note:'Burst turn'},
    'Wish':{tier:'A', note:'Universal tutor'},
    'Hand of Greed':{tier:'B'}, 'Bandage Up':{tier:'B'},
    'Panic Button':{tier:'B'}, 'Bolas':{tier:'B'}, 'Neow\'s Fury':{tier:'A'},
    "Neow's Fury":{tier:'A'}, 'Secret Technique':{tier:'A'}, 'Secret Weapon':{tier:'A'},
    'Thinking Ahead':{tier:'A'}, 'Finesse':{tier:'B'}, 'Impatience':{tier:'B'},
    'Mind Blast':{tier:'B'}, 'Dramatic Entrance':{tier:'B'},
    'Transmutation':{tier:'B'}, 'Flash of Steel':{tier:'B'}, 'Ritual Dagger':{tier:'B'},
    'Swift Strike':{tier:'B'}, 'Prepared':{tier:'B'}, 'Fame and Fortune':{tier:'B'},
    'Violence':{tier:'B'}, 'The Bomb':{tier:'B'}, 'Mayhem':{tier:'A'},
    'Scrawl':{tier:'A'}, 'Fisticuffs':{tier:'B'}, 'Chrysalis':{tier:'B'},
    'Metamorphosis':{tier:'B'}, 'Maul':{tier:'B', note:'Ancient scaling'},
    'Relax':{tier:'A', note:'Huge tempo'}, 'Whistle':{tier:'A', note:'33 + Stun'},
    'Insight':{tier:'A'}, 'Good Instincts':{tier:'B'}, 'Purity':{tier:'B'},
    'Bite':{tier:'B'}, 'Blind':{tier:'B'}, 'Deep Breath':{tier:'B'},
    'J.A.X.':{tier:'B'}, 'Madness':{tier:'C'}, 'Miracle':{tier:'A'},
    'Ring of Fire':{tier:'B'}, 'Safety':{tier:'A'}, 'Chrysalis':{tier:'B'},
    'The Hoard':{tier:'B'}, 'Trip':{tier:'B'}, 'Omniscience':{tier:'S'},
    'Enlightenment':{tier:'A'}, 'Automation':{tier:'B'}, 'Believe in You':{tier:'B'},
    'Catastrophe':{tier:'A'}, 'Coordinate':{tier:'B'}, 'Dark Shackles':{tier:'B'},
    'Equilibrium':{tier:'B'}, 'Fasten':{tier:'B'}, 'Gang Up':{tier:'B', note:'Co-op'},
    'Huddle Up':{tier:'B', note:'Co-op'}, 'Intercept':{tier:'B', note:'Co-op'},
    'Jack of All Trades':{tier:'B'}, 'Lift':{tier:'B', note:'Co-op'},
    'Panache':{tier:'A', note:'Great in Claw'}, 'Prep Time':{tier:'B'},
    'Production':{tier:'A', note:'+2 Energy exhaust'}, 'Prolong':{tier:'B'},
    'Prowess':{tier:'B'}, 'Restlessness':{tier:'B'}, 'Seeker Strike':{tier:'B'},
    'Shockwave':{tier:'A', note:'3 Weak + Vuln AoE'}, 'Splash':{tier:'B'},
    'Stratagem':{tier:'B'}, 'Tag Team':{tier:'B', note:'Co-op'},
    'Thrumming Hatchet':{tier:'B'}, 'Ultimate Defend':{tier:'B'},
    'Ultimate Strike':{tier:'B'}, 'Volley':{tier:'B'},
    'Alchemize':{tier:'A', note:'Random potion'}, 'Anointed':{tier:'A'},
    'Beacon of Hope':{tier:'B', note:'Co-op'}, 'Beat Down':{tier:'A'},
    'Calamity':{tier:'B'}, 'Entropy':{tier:'B'}, 'Eternal Armor':{tier:'A'},
    'Gold Axe':{tier:'A'}, 'Hidden Gem':{tier:'A', note:'Reworked v0.103'},
    'Jackpot':{tier:'A'}, 'Knockdown':{tier:'B', note:'Co-op'}, 'Mimic':{tier:'B', note:'Co-op'},
    'Nostalgia':{tier:'B'}, 'Rally':{tier:'B', note:'Co-op'}, 'Rend':{tier:'B'},
    'Rolling Boulder':{tier:'B'}, 'Salvo':{tier:'A'}, 'The Gambit':{tier:'C', note:'Die on unblocked'},
    'Byrd Swoop':{tier:'B'}, 'Exterminate':{tier:'B'}, 'Feeding Frenzy':{tier:'B'},
    'Mad Science':{tier:'B'}, 'Peck':{tier:'C'}, 'Squash':{tier:'B'}, 'Toric Toughness':{tier:'B'}
  }
};

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
    punishes:['slow scaling','multi-play combos (Ringing phase 2)'],
    rewards: ['burst windows','Strength stacking','Sovereign Blade retain','Body Slam finishers'],
    difficulty: 'Easiest Act 1 boss',
    killWindow: 'Sub-150 HP by turn 3-4 or Plow spirals'
  },
  'Kin Priest': {
    punishes:['single-target only','no AoE'],
    rewards: ['AoE (Whirlwind, Shockwave, Seven Stars)','Poison (ticks all 3)','hard burst ignoring Followers'],
    difficulty: 'Medium',
    killWindow: '≤5 turns before Dark Ritual spiral'
  },
  'Vantom': {
    punishes:['heavy single-hit decks (Slippery wastes big swings)','slow decks (Strength ramp + Wound pollution)','entering below 40 HP'],
    rewards: ['multi-hit (Shivs, Anger, Twin Strike, Pommel spam)','Weak application','fast decks'],
    difficulty: 'Hardest Act 1',
    killWindow: '≤4 cycles. SKIP ALL ELITES if you\'re below 40 HP'
  },
  'Lagavulin Matriarch': {
    punishes:['Strength-based decks','Dex-based decks','raw damage'],
    rewards: ['Poison, Doom, Shivs (bypass Str/Dex debuffs)','multi-hit to strip Plating'],
    difficulty: 'Hard',
    killWindow: '≤5 turns after wake'
  },
  'Soul Fysh': {
    punishes:['pure burst (wasted in Intangible)','block-only (Calls bypass armor)','heavy decks that can\'t cycle'],
    rewards: ['Silent Sly-discard hands','Exhaust to nuke Calls','Discard/cycle engines'],
    difficulty: 'Medium-Hard',
    killWindow: '≤6 - Call flood accelerates'
  },
  'Waterfall Giant': {
    punishes:['kill-and-done decks with no final-turn cushion'],
    rewards: ['25+ block buffer on kill turn','Poison/Doom to finish during invuln'],
    difficulty: 'Medium',
    killWindow: '≤4-5'
  },
  // Act 2
  'Knowledge Demon': {
    punishes:['slow decks','draw-heavy decks','wide decks','4+ cards-per-turn decks'],
    rewards: ['burst that ignores horizon','Demon Form turn','No Escape execution','pre-forged Sovereign Blade','Seven Stars nuke','Poison (ticks regardless of debuffs)'],
    difficulty: 'Biggest Act 2 wall',
    killWindow: '≤6-8 before debuff floor'
  },
  'Kaiser Crab': {
    punishes:['low single-target damage','Ironclad forced facing changes'],
    rewards: ['balanced AoE','staggered single-target','Silent/Defect high-tempo'],
    difficulty: 'Medium',
    killWindow: 'Rush Crusher first, laser turn telegraphed'
  },
  'The Insatiable': {
    punishes:['pure Poison (Sandpit resolves before tick)','slow scaling','Fairy in a Bottle does NOT save you from Sandpit'],
    rewards: ['fast burst','Frenzy/Catalyst tempo','Shiv spam','Seven Stars','anything pushing 500+ damage in 4-6 turns'],
    difficulty: 'Timer-capped (4-turn instant kill)',
    killWindow: '4-5 turns MAX regardless of HP'
  },
  // Act 3
  'The Queen': {
    punishes:['draw-starved decks','mono-Doom Necrobinder without draw','no-AoE decks'],
    rewards: ['draw-spam decks','AoE to pressure both','4+ cards per turn decks'],
    difficulty: 'Hard',
    killWindow: 'Torch Head by turn 4, Queen by turn 8'
  },
  'Test Subject #C8': {
    punishes:['pure Poison/Doom (Intangible negates)','wasteful skill spam in early phases','no saved burst'],
    rewards: ['sustain + one preserved burst turn','Barricade + Body Slam','save Catalyst/Limit Break/Void Form/Seven Stars/No Escape for phase 3'],
    difficulty: 'Easiest A3 IF you plan for phase 3',
    killWindow: 'Phase 1 in 2 turns, phase 2 in 3, save big turn for phase 3'
  },
  'Doormaker': {
    punishes:['library/card-cycle decks (Hunger permanently exhausts)','Necrobinder Soul cycles (Scrutiny stops draw)','slow scaling','no compressed lethal'],
    rewards: ['compressed burst winning in 2-3 turns','Seven Stars (49 AoE)','pre-forged Sovereign Blade one-shots','Corruption big turns','No Escape at threshold'],
    difficulty: 'Hardest A3 boss',
    killWindow: 'Door in 2-3 per cycle, full kill 8-12 turns'
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
        strategy: 'Has "Slippery" — 9 charges that reduce all incoming damage to 1. Every hit strips one charge. Once all 9 are gone, full damage resumes. Finishes with a heavy tail attack.',
        killOrder: 'Strip charges with rapid hits, then block the final Dismember.'
      },
      'The Kin': {
        type: 'Multi-Enemy',
        hp: 'Priest 190 HP, 2 Followers ~58 HP each',
        strategy: 'The Priest debuffs you while two Followers deal damage. The Followers flee immediately the moment the Priest dies, ending the fight.',
        killOrder: 'Ignore the Followers entirely. All damage goes to the Priest.'
      },
      'Ceremonial Beast': {
        type: 'Phase-Shift',
        hp: '252 HP — phase shift at 150 HP',
        strategy: 'Ramps damage each turn. Drops to 1 card play per turn at 150 HP ("Ringing"). The only way to bypass Ringing is to push through it in a single burst window.',
        killOrder: 'Hold back a full burst hand and dump everything the moment it crosses 150 HP.'
      }
    },
    elites: {
      'Bygone Effigy': {
        type: 'Gimmick',
        hp: '127 HP',
        strategy: 'Does nothing on turn 1 — free setup turn. Wakes turn 2 with Slow, which increases damage you take by 10% per card played that turn. Hits for 25+ every turn after waking.',
        killOrder: 'Play all your block and zero-cost skills first each turn, then finish with your highest-damage attacks to exploit the Slow multiplier against it, not you.'
      },
      'Phrog Parasite': {
        type: 'Multi-Enemy',
        hp: '61-64 HP, then 4 Wrigglers (17-21 HP each)',
        strategy: 'Alternates between clogging your deck with permanent Infection cards (deal damage if held) and multi-hit attacks. When it dies it splits into four Wrigglers that spawn stunned for one free turn, then start stacking Strength.',
        killOrder: 'Kill the Parasite fast to limit Infection spread. Use AoE on the Wrigglers\' stunned turn before they can act.'
      },
      'Byrdonis': {
        type: 'Scaling',
        hp: '91-94 HP',
        strategy: 'Gains 1 Strength at end of every turn. Starts manageable but becomes lethal quickly. No mechanics — just a pure speed check.',
        killOrder: 'No stalling. Front-load all damage from turn 1 and kill it within 3-4 turns.'
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
        hp: '~350-400 HP — explodes on death',
        strategy: 'Stores damage dealt to it as "Steam Eruption" and releases it as a 30-40 damage explosion the moment it dies. Entering at low HP means the explosion can finish you after the kill.',
        killOrder: 'Enter with high HP. Save your heaviest block for the killing turn to absorb the post-death explosion.'
      },
      'Soul Fysh': {
        type: 'Gimmick',
        hp: '211 HP',
        strategy: 'Floods your hand with Beckon cards — each deals 6 damage to you if still held at end of turn. Also phases into Intangibility, making it immune to damage on certain turns.',
        killOrder: 'Clear Beckon cards through discard or exhaust every turn before end of turn. Attack only on turns it is not Intangible.'
      },
      'Lagavulin Matriarch': {
        type: 'Phase-Shift',
        hp: '222 HP — starts with 12 Plating',
        strategy: 'Asleep for 3 turns — completely passive, free setup window. On waking she applies permanent Strength and Dexterity debuffs, making all your attack and block cards weaker.',
        killOrder: 'Use the 3 sleep turns to build powers. After she wakes, rely on damage types that bypass stat debuffs — passive and over-time damage.'
      }
    },
    elites: {
      'Phantasmal Gardeners': {
        type: 'Multi-Enemy',
        hp: '4 Gardeners, 28-32 HP each',
        strategy: 'Four enemies each cycling through Multi-hit, Buff, Weak, then Strong intents at different offsets. Combined damage is 15-20+ per turn from the start and scales with every Buff turn.',
        killOrder: 'Kill one at a time — reducing four attackers to three drops incoming damage immediately. Target whichever is closest to its Buff intent. Priority order: 4, 1, 3, 2.'
      },
      'Terror Eel': {
        type: 'Gimmick',
        hp: '140 HP',
        strategy: 'Alternates between a single hit and a triple hit with Vigor. When HP drops to 70 it stuns for one turn, then applies permanent 99-stack Vulnerable — 50% more damage taken for the rest of the fight.',
        killOrder: 'Control when it crosses 70 HP. Only trigger the stun when you have a full burst hand ready. Use that one free turn to deal maximum damage and end the fight.'
      },
      'Skulking Colony': {
        type: 'Scaling',
        hp: '79 HP',
        strategy: 'Has Hardened Shell — caps HP loss at 20 per turn no matter how much damage you deal. Cycles through a heavy hit, a clogging attack that adds Dazed cards, a Block + Strength gain, and a double hit.',
        killOrder: 'Plan for 4-5 turns minimum. Block on its heavy hit turn. Attack consistently on the turns it has no Block. Do not waste big turns trying to burst above the 20-per-turn cap.'
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
        hp: '~400 HP + instant-death Sandpit timer',
        strategy: 'Casts Sandpit — a 4-turn instant death countdown. Playing Frantic Escape cards extends the timer, but each costs 1 more energy than the last. Without strong energy generation the cost outpaces your ability to pay.',
        killOrder: 'Extend the timer every turn while dealing damage. Energy generation is the core requirement for this fight.'
      },
      'Knowledge Demon': {
        type: 'Strategic Choice',
        hp: '~380 HP',
        strategy: 'Forces a choice each turn between permanent deck debuffs or resource debuffs. Both paths compound over time — the longer the fight, the worse your position.',
        killOrder: 'Pick one approach and fully commit. Either end the fight before the debuffs stack, or go fully defensive and outlast it.'
      },
      'Kaiser Crab': {
        type: 'Multi-Enemy',
        hp: 'Crusher claw 199 HP, Rocket claw 189 HP',
        strategy: 'Two claws that act independently. Each has directional damage reduction — attacks from the wrong side deal reduced damage. Rocket claw escalates pressure faster.',
        killOrder: 'Always face the currently attacking claw to cut incoming damage. Kill the Rocket claw first, then focus the other.'
      }
    },
    elites: {
      'Decimillipede': {
        type: 'Multi-Enemy',
        hp: '3 segments, 42-48 HP each',
        strategy: 'Three segments that each scale Strength every turn and revive if any other segment is still alive when they die. Spreading damage across all three is a trap — partial kills heal back.',
        killOrder: 'Kill one segment completely before touching the others. AoE that cannot one-shot a segment wastes output and triggers revival. Stack all damage on one target at a time.'
      },
      'Entomancer': {
        type: 'Gimmick',
        hp: '145 HP',
        strategy: 'Adds a Dazed card to your draw pile every time you play an Attack card. As Strength stacks, its attacks scale toward 40+ per turn. More attacks played means more dead draws in future hands.',
        killOrder: 'Minimise the number of Attack cards played each turn. One heavy single hit is better than several small ones. Passive and over-time damage avoids the Dazed penalty entirely.'
      },
      'Infested Prism': {
        type: 'Gimmick',
        hp: '200 HP',
        strategy: 'Very high health but grants +1 energy the first time you deal Attack damage each turn. Cycles between a heavy single hit, a block-gaining attack, and a Strength + Block buff. Attacking on its block-gaining turns wastes damage.',
        killOrder: 'Attack at least once per turn to claim the free energy. Concentrate damage on turns when it has no Block. Treat this as a long resource-gain fight — use the extra energy to set up your engine.'
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
        hp: 'Torch Head Amalgam (high HP) + The Queen',
        strategy: 'Hides behind a high-HP summon that she buffs while applying 99-turn Frail, Weak, and Vulnerable to you. The summon must die before she is exposed. Debuffing the summon slows its pressure and buys time.',
        killOrder: 'Treat Phase 1 as free power-building time. Apply Weak to the summon to slow incoming damage while your deck scales. Burst the Queen hard the moment she is exposed.'
      },
      'Doormaker': {
        type: 'Phase-Shift',
        hp: 'Door 155 HP (+20 each cycle), Doormaker 489 HP',
        strategy: 'Cycles through successive Doors — each with more HP than the last. A pure sustained DPS check. Brief windows when the boss is exposed are the only times damage counts. Damage that persists between phases bypasses the HP gates.',
        killOrder: 'Maximise damage output in every exposed window. Persistent over-time damage carries across phase transitions and is the most efficient damage type here.'
      },
      'Test Subject #C8': {
        type: 'Phase-Shift',
        hp: '600 HP total across 3 phases (100 / 200 / 300)',
        strategy: 'Three phases — Enrage, Painful Stabs, and Intangibility. Intangible phases make it fully immune to damage. The fight punishes slow or low-draw decks that cannot capitalise on the limited damage windows.',
        killOrder: 'Save burst output for non-Intangible phases. High draw and energy generation let you play more cards in each window.'
      }
    },
    elites: {
      'Knight Trio': {
        type: 'Multi-Enemy',
        hp: 'Flail Knight 101 HP, Spectral Knight 93 HP, Magi Knight 82 HP',
        strategy: 'Three knights attacking simultaneously. Combined damage is 25-40+ per turn — higher than most Act 3 bosses. Magi Knight applies Dampen (weakens powers) and fires a 35-40 damage Magic Bomb on turn 5 of its cycle. Spectral Knight applies Hex, making your unplayed cards Ethereal and forcing wasted turns.',
        killOrder: 'Kill Magi Knight first (lowest HP, stops Dampen and Magic Bomb). Then Spectral Knight to stop Hex. Flail Knight last. AoE hits all three simultaneously — strong here.'
      },
      'Mecha Knight': {
        type: 'Gimmick',
        hp: '300 HP',
        strategy: 'Hardest elite in the game. Starts with 3 Artifact stacks — your first three debuffs do nothing. Cycles Charge (25 dmg), Flamethrower (adds 4 Burn cards to your hand), Windup (+5 Strength, +15 Block), Heavy Cleave (35 dmg). After one full cycle, Cleave hits 40-45+. Burn cards deal 8 unblockable damage per turn if held.',
        killOrder: 'Burn off 3 Artifact stacks with cheap disposable debuffs before applying real debuffs. Only attack on Charge and Flamethrower turns — never on Windup. Clear Burn cards immediately.'
      },
      'Soul Nexus': {
        type: 'Gimmick',
        hp: '234 HP',
        strategy: 'Always opens with Soul Burn (29 guaranteed damage turn 1 — hardest elite opener in the game). Then randomly rotates Soul Burn (29 dmg), Maelstrom (6-hit AoE), and Drain Life (18 dmg + Weak + Vulnerable), never repeating the same move twice. Drain Life stacks debuffs each cycle, making your attacks weaker and damage taken higher with no time limit.',
        killOrder: 'Block at least 29 on turn 1 — no exceptions. Use Maelstrom turns as your primary damage windows. After any Drain Life, block heavily on the next turn as Soul Burn now effectively hits for 43+.'
      }
    }
  }
};

// Map each boss name to its region key for fast lookup
const BOSS_TO_REGION = {};
Object.entries(REGION_DATA).forEach(([rk, rd]) => {
  Object.keys(rd.bosses).forEach(b => { BOSS_TO_REGION[b] = rk; });
});

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
