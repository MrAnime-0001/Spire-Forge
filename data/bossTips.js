// BOSS_TIPS: Build-specific strategy advice for each StS2 boss
// Format: bossName -> { general/character/buildName -> tip text }
// StS2 boss set: Vantom, The Kin, Ceremonial Beast, Waterfall Giant, Soul Fysh,
//   Lagavulin Matriarch, The Insatiable, Knowledge Demon, Kaiser Crab,
//   The Queen, Aeonglass, Test Subject #C8
//
// Tips reference actual StS2 boss mechanics from REGION_DATA + BOSS_MATRIX (wiki data, v0.111).
// General tip applies to all characters. Per-character tips add class-specific nuance.

const BOSS_TIPS = {
  // ================================================================
  // ACT 1 — Overgrowth
  // ================================================================

  'Vantom': {
    general: '173 HP with 9 Slippery (each hit deals 1 and removes a stack). Cycle: Ink Blot 7 → Inky Lance 6x2 → Dismember 27 + 3 Wounds → Prepare +2 Str. Kill before the 3rd Dismember.',
    ironclad: 'Whirlwind/Conflagration multi-hits strip Slippery. Inferno ticks remove a stack every turn. Stoke and Burning Pact clear the Wounds Dismember adds.',
    silent: 'Shivs strip Slippery 1 stack per Shiv. Even small Poison removes a stack per turn (Accelerant: more). Weak from Neutralize/Leg Sweep softens Dismember. Prepared discards Wounds.',
    defect: 'Lightning orbs strip 1 Slippery per hit. Claw spam strips Slippery fast. Scrape cycles through Wounds.',
    regent: 'Seven Stars strips 7 Slippery stacks in one play. Lunar Blast multi-hits. Forge scaling on Sovereign Blade outpaces Vantom\'s +2 Str/cycle.',
    necrobinder: 'Doom ignores Slippery entirely — execute when Doom >= HP. Osty soaks Dismember. Souls (draw 2, Exhaust) cycle past Wounds.'
  },

  'The Kin': {
    general: 'Priest (190 HP) + 2 Followers (58-59 HP). All three gain Strength; Priest applies Weak and Frail. The fight ends when the Priest dies — Followers flee.',
    ironclad: 'Whirlwind/Conflagration AoE pressures all three while you focus the Priest. Feel No Pain block ignores Frail. Flame Barrier punishes their many small hits.',
    silent: 'Dagger Spray and Haze hit all three. Poison and No Escape ignore Weak. Focus the Priest — no Follower cleanup needed.',
    defect: 'Hyperbeam clears all three at once. Frost orb block ignores Frail. Focus the Priest with single-target orbs.',
    regent: 'Seven Stars and Astral Pulse hit all three. Gamma Blast AoE wave. Sovereign Blade singles out the Priest.',
    necrobinder: 'The Scythe AoE hits all three. Doom on the Priest — once it dies the Followers flee. Rattle multi-hits.'
  },

  'Ceremonial Beast': {
    general: '252 HP. Phase 1: Plow 18 dmg +2 Str every turn. Dropping it to 150 HP stuns it and wipes its Strength. Phase 2: Beast Cry (Ringing: 1 card that turn) → Stomp 15 → Crush 17 +3 Str.',
    ironclad: 'Bludgeon and Strength burst reach the 150 threshold fast. Barricade+Body Slam is perfect for Phase 2 — one card, big damage on Ringing turns.',
    silent: 'Stack Poison (Accelerant doubles ticks) to reach the threshold. On Ringing turns play your single best card.',
    defect: 'Multi-Cast and Hyperbeam burst past 150. Frost passive block covers Ringing turns.',
    regent: 'Seven Stars is one card with massive burst for the threshold. Sovereign Blade makes each Ringing turn count.',
    necrobinder: 'Doom on the Beast works through both phases. Osty banks HP. One big Grave Warden turn crosses 150.'
  },

  // ================================================================
  // ACT 1 — Underdock
  // ================================================================

  'Waterfall Giant': {
    general: '240 HP. Heals 15 with Siphon; Pressure Gun grows +5 each use. Stores Steam Eruption all fight — after the kill it turns invulnerable and Explodes for the stored amount next turn. Keep a big block for that turn.',
    ironclad: 'Demon Form scales through the long fight. Impervious covers the explosion. Second Wind blocks through it.',
    silent: 'Poison keeps ticking for steady damage through the heals. Backflip and Leg Sweep for the explosion turn.',
    defect: 'Frost orbs give passive block that carries through the explosion. Glacier channels 2 Frost. Hyperbeam burst.',
    regent: 'Save a big block via Bulwark/Bodyguard. Sovereign Blade forge scales through the fight. Void Form free plays save energy for block.',
    necrobinder: 'A Doom kill with no Steam Eruption stored skips the explosion. Osty absorbs the blast. Dirge heals you back.'
  },

  'Soul Fysh': {
    general: '211 HP. Cycle: Beckon (2 Beckons) → De-Gas 16 → Gaze 7 + Beckon → Fade (Intangible) → Scream 13 + 3 Vulnerable. Clear Beckons and don\'t waste burst on Fade turns.',
    ironclad: 'True Grit/Burning Pact exhaust Beckons. Fiend Fire dumps a cluttered hand. Feel No Pain turns each exhausted Beckon into block.',
    silent: 'Discard engine (Prepared, Calculated Gamble, Acrobatics) clears Beckons. Afterimage gives block per card played. Hold attacks on Fade turns.',
    defect: 'Coolheaded draws past Beckons while channeling Frost. Scrape cycles through them. Hologram fetches key cards back.',
    regent: 'Void Form free plays offset energy spent on Beckons. Glow draws past them. Convergence holds key cards.',
    necrobinder: 'Souls (draw 2, Exhaust) cycle past Beckons. Osty soaks chip damage. Haunt deals damage through Fade.'
  },

  'Lagavulin Matriarch': {
    general: '222 HP, 12 Plating, asleep for 3 turns (or until it takes unblocked damage). Each Soul Siphon permanently removes 2 Str and 2 Dex from you. Kill before the 2nd Soul Siphon.',
    ironclad: 'Use the 3 free turns for Demon Form/Inflame/Offering. Favour big single hits (Bludgeon) and big single blocks (Impervious) — Soul Siphon hurts multi-hits most.',
    silent: 'Free turns for Noxious Fumes and Footwork setup. Poison ignores the Strength loss. Big Dex-based blocks lose value after each Siphon.',
    defect: 'Free turns for Defragment/Loop/Echo Form. Orb damage and orb block ignore the Str/Dex loss completely.',
    regent: 'Free turns are perfect for Forge setup (Sword Sage, Seeking Edge). Sovereign Blade forge damage ignores the Strength loss.',
    necrobinder: 'Doom ignores the Str/Dex loss. Osty blocks regardless of your Dex. Use the free turns for Capture Spirit/Dirge.'
  },

  // ================================================================
  // ACT 2 — Hive
  // ================================================================

  'The Insatiable': {
    general: '321 HP. Opens with 4 Sandpit and 6 Frantic Escapes. Play Frantic Escapes to push back Sandpit, or you die. Cycle: Thrash 8x2 → Lunging Bite 28 → Salivate +2 Str → Thrash. Draw and energy are survival.',
    ironclad: 'Corruption makes Frantic Escapes free (they are Skills). Offering/Bloodletting give the energy. Demon Form scales between Escapes.',
    silent: 'Adrenaline/Tactician provide the energy. Calculated Gamble cycles to find Escapes.',
    defect: 'TURBO/Double Energy fuel the Escape costs. Echo Form doubles value per turn.',
    regent: 'Void Form makes Escapes free. Convergence retains hand to guarantee an Escape. Alignment generates Stars for burst windows.',
    necrobinder: 'Borrowed Time gives energy for Escapes. Graveblast retrieves key cards. Osty tanks Lunging Bite while you cycle.'
  },

  'Knowledge Demon': {
    general: '379 HP; heals 30 and gains Str every cycle. Cycle: Curse of Knowledge (pick Disintegration 6/7/8 dmg per turn OR Mind Rot / Sloth / Waste Away) → Slap 17 → 8x3 → Ponder. Needs real scaling.',
    ironclad: 'Demon Form and Strength scaling outpace the heals. Corruption+Feel No Pain handles Disintegration chip damage. Fiend Fire for burst.',
    silent: 'Poison keeps ticking through every curse. Waste Away hurts least with 0-cost cards. Malaise cuts its Strength.',
    defect: 'Echo Form compensates for Sloth. Frost orbs block through Disintegration. Defragment scales through resource curses.',
    regent: 'Sovereign Blade is draw-independent — counters Mind Rot. Void Form free plays counter Waste Away.',
    necrobinder: 'Doom executes regardless of curses and heals. Osty tanks Disintegration damage. Souls cycle past Mind Rot.'
  },

  'Kaiser Crab': {
    general: 'Crusher (209 HP) + Rocket (199 HP). Rocket\'s Laser hits 31; Crusher\'s Bug Sting applies Weak and Frail. Surrounded: +50% damage from the claw behind you. Crab Rage: the survivor gains 6 Str + 99 Block — finish both close together.',
    ironclad: 'Whirlwind hits both claws. Bludgeon finishes the second claw before Crab Rage matters. Block hardest before Laser.',
    silent: 'Poison ticks on both claws at once — ideal for balanced damage. Dagger Spray hits both.',
    defect: 'Lightning orbs and Hyperbeam pressure both claws. Loop/Defragment scale all damage sources.',
    regent: 'Seven Stars hits both claws. Stardust damages both consistently. Black Hole AoE.',
    necrobinder: 'The Scythe AoE hits both. Doom on both claws lets them die close together. Rattle multi-hits.'
  },

  // ================================================================
  // ACT 3 — Glory
  // ================================================================

  'The Queen': {
    general: 'Queen (400 HP) + Torch Head Amalgam (199 HP). T1: 3 Chains of Binding (first 3 cards drawn are Bound). T2: 99 Frail/Weak/Vulnerable. Kill the Amalgam, then the Queen enrages: 3x5 → 15 → +2 Str.',
    ironclad: 'Offering and Battle Trance draw past Bound cards. Feel No Pain + Dark Embrace block ignores Frail. Barricade keeps block across turns.',
    silent: 'Adrenaline/Tools of the Trade keep drawing past Bound cards. Poison damage ignores your Weak. Afterimage blocks ignore Frail.',
    defect: 'Frost orbs give block that ignores Frail. Creative AI makes powers. Defragment scales Focus. Echo Form for value.',
    regent: 'Void Form free plays offset Bound cards. Sovereign Blade forge outscales the fight. Star generators work through Chains.',
    necrobinder: 'Souls (draw 2, Exhaust) cycle past Bound cards. Osty blocks regardless of Frail. Doom on the Queen ignores her Block.'
  },

  'Aeonglass': {
    general: '512 HP, 3 Artifact. Cycle: Ebb 22 + 33 Block → Eye Lasers 11x2 → Increasing Intensity (Wither + growing Strength). Every 6 cards you play adds a Wither to your hand. You need real scaling.',
    ironclad: 'Stoke and Burning Pact exhaust Wither. Corruption makes Wither-clearing free. Demon Form scaling keeps up with its Strength.',
    silent: 'Calculated Gamble discards a hand of Wither (they come back on shuffle). Poison ignores its Block on Ebb turns.',
    defect: 'Orbs deal damage without playing cards (fewer Withering Presence triggers). Frost passive block tanks Ebb and Eye Lasers.',
    regent: 'GUARDS!!! exhausts Wither. Void Form free plays offset Wither cost. Star burst on non-Ebb turns.',
    necrobinder: 'Souls (draw 2, Exhaust) clear Wither from hand. Osty tanks chip damage. Doom ticks regardless of Wither.'
  },

  'Test Subject #C8': {
    general: 'Phase 1 (100 HP): Enrage — gains Str whenever you play a Skill; Bite 20 / Skull Bash 14 + Vuln. Phase 2 (200 HP): Multi-Claw 10x3, +1 hit every turn. Phase 3 (300 HP): Lacerate 10x3 → Big Pounce 45 → Burning Growl (Burns + Str).',
    ironclad: 'Attack-heavy turns in Phase 1 (avoid Skills). Kill Phase 2 fast before Multi-Claw stacks. Impervious for Big Pounce. Strength scaling carries all three phases.',
    silent: 'Shivs are Attacks, so they are safe in Phase 1; Poison Skills feed Enrage. Wraith Form blunts Multi-Claw. Block every Big Pounce.',
    defect: 'Orb damage needs no Skills in Phase 1. Frost block holds Phase 2 claws. Echo Form doubles value in Phase 3.',
    regent: 'Sovereign Blade forge scaling carries through all three phases. Seven Stars burst to end Phase 2 quickly.',
    necrobinder: 'Doom executes in every phase. Osty tanks Phase 2 claws and Big Pounce. Souls cycle past Burns.'
  }
};

// Export for use in other modules
if (typeof module !== 'undefined') {
  module.exports = { BOSS_TIPS };
}
