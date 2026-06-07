// BOSS_TIPS: Build-specific strategy advice for each StS2 boss
// Format: bossName -> { general/character/buildName -> tip text }
// StS2 boss set: Vantom, The Kin, Ceremonial Beast, Waterfall Giant, Soul Fysh,
//   Lagavulin Matriarch, The Insatiable, Knowledge Demon, Kaiser Crab,
//   The Queen, Aeonglass, Test Subject #C8
//
// Tips reference actual StS2 boss mechanics from REGION_DATA + BOSS_MATRIX.
// General tip applies to all characters. Per-character tips add class-specific nuance.

const BOSS_TIPS = {
  // ================================================================
  // ACT 1 — Overgrowth
  // ================================================================

  'Vantom': {
    general: 'Starts with 9 Slippery (1 dmg per hit). Multi-hit attacks strip Slippery stacks fast. Str +2/cycle makes Dismember (27 + 3 Wounds) lethal after 3rd cycle. Entering below 40 HP is lethal.',
    ironclad: 'Heavy Blade/Whirlwind multi-hit strips Slippery. Second Wind and Burning Pact clear Wound pollution Dismember adds.',
    silent: 'Shivs strip Slippery 3 stacks per play. Weak from Neutralize/Leg Sweep reduces Dismember damage to ~20. Prepared discards Wounds for free.',
    defect: 'Lightning orbs strip 1 Slippery per hit — each orb bypasses the single-hit penalty. Claw spam strips Slippery fast. Scrape cycles through Wounds.',
    regent: 'Seven Stars strips 7 Slippery stacks in one play. Forge scaling on Sovereign Blade outpaces Vantom\'s +2 Str/cycle. Convergence retains hand through Wound pollution.',
    necrobinder: 'Doom ignores Slippery entirely — execute when Doom >= HP. Osty tanks Dismember easily. Souls draw 2 Exhaust to cycle past Wounds.'
  },

  'The Kin': {
    general: 'Priest (190 HP) with 2 Followers (47-54 HP). Fight ends when Priest dies — Followers flee. Dark Ritual gives +6 Str/turn. AoE hits all three.',
    ironclad: 'Whirlwind/Immolate AoE pressures Followers while damaging Priest. Shockwave applies Vulnerable to all three. Heavy Blade focuses Priest through Followers.',
    silent: 'Corpse Explosion kills Followers when Priest dies — no cleanup needed. Dagger Spray AoE. Poison ticks all three enemies.',
    defect: 'Electrodynamics makes Lightning orbs hit all three every turn. Hyperbeam clears everything at once. Focus Priest with multi-target orbs.',
    regent: 'Seven Stars hits all three. Gamma Blast AoE wave. Sovereign Blade singles out Priest while Star generators keep Followers busy.',
    necrobinder: 'The Scythe AoE hits all three. Doom on Priest — once executed Followers flee regardless of their Doom count. Rattle multi-hit on all.'
  },

  'Ceremonial Beast': {
    general: '252 HP, must cross 150 HP threshold to trigger stun + Str reset. Phase 2 Rasps (Ringing: 1 card/turn). Phase 1 gives +2 Str each Plow turn.',
    ironclad: 'Heavy Blade burst past 150 HP to trigger stun. Barricade+Body Slam is perfect for Phase 2 — one card, massive damage every turn.',
    silent: 'Catalyst multiplies Poison into one huge hit to cross 150 threshold. In Phase 2, Accuracy-boosted Shiv makes each single card count.',
    defect: 'Dark Orb stores damage then Multi-Cast bursts past 150. Hyperbeam single hit crosses threshold. Frost passive block helps in Phase 2 restricted turns.',
    regent: 'Seven Stars is one card with massive burst for the threshold. Sovereign Blade forge turns each Phase 2 turn into scaling value.',
    necrobinder: 'Doom on Beast — it executes regardless of Phase transitions. Osty banks HP through both phases. One big Grave Warden turn crosses 150.'
  },

  // ================================================================
  // ACT 1 — Underdock
  // ================================================================

  'Waterfall Giant': {
    general: '240 HP, accumulates Steam Eruption each turn. On death, becomes invulnerable then explodes for accumulated damage (~30-40). Save 30+ block for kill turn.',
    ironclad: 'Demon Form scales damage past the fight duration. Impervious (30 block) perfectly covers the death explosion. Second Wind blocks through the explosion.',
    silent: 'Poison bypasses the invulnerability during death sequence — Poison ticks kill through it. Catalyst burst before explosion ends it clean. Backflip+Leg Sweep for block.',
    defect: 'Frost orbs provide passive block that carries through the explosion. Dark Orb/Multi-Cast burst bypasses invulnerability. Glacier channels 2 Frost orbs for block.',
    regent: 'Save 30+ block via Bulwark/Bodyguard. Sovereign Blade forge scales through the fight duration. Void Form free plays save energy for block.',
    necrobinder: 'Doom bypasses the death invulnerability — execute as normal. Osty absorbs the explosion entirely. Dirge heals you back after explosion damage.',
    // No boss gives poison
  },

  'Soul Fysh': {
    general: '211 HP. Beckon deals 6 dmg if held at turn end. Fade grants Intangible that fades on your turn — skip attacking during Fade. Clear Beckons every turn.',
    ironclad: 'True Grit/Burning Pact exhausts Beckons from hand. Fiend Fire can dump entire hand. Feel No Pain generates block when exhausting Beckons.',
    silent: 'Discard engine (Prepared, Calculated Gamble, Acrobatics) clears Beckons from hand. Afterimage triggers block on each Beckon played or discarded. Don\'t attack Fade turns.',
    defect: 'Coolheaded clears Beckons while channeling Frost. Scrape cycles through Beckons. Hologram retrieves your key cards from discard.',
    regent: 'Void Form free plays offset the energy waste on clearing Beckons. Glow draws past Beckons. Convergence lets you hold key cards through Beckon clutter.',
    necrobinder: 'Souls are 0-cost draw 2 Exhaust — perfect for cycling past Beckons. Osty ignores Beckon chip damage. Haunt deals unblockable damage through Fade.'
  },

  'Lagavulin Matriarch': {
    general: '222 HP, 12 Plating, 3 free turns (Asleep). Soul Siphon permanently reduces Str AND Dex each cycle. Kill before 2nd Soul Siphon. Multi-hit strips Plating during sleep.',
    ironclad: 'Use 3 free turns for Demon Form/Inflame/Offering setup. Whirlwind multi-hit strips Plating. Heavy Blade benefits from setup Strength before wake.',
    silent: 'Use free turns for Noxious Fumes/Catalyst setup. Shivs strip Plating. Poison bypasses Str/Dex debuffs entirely. Weak is unaffected by Dex loss.',
    defect: 'Use 3 free turns for Defragment/Loop/Echo Form. Orb damage bypasses Str/Dex debuffs — Lightning/Frost deal full damage regardless of Soul Siphon.',
    regent: 'Free turns are perfect for Forge setup (Sword Sage, Seeking Edge). Sovereign Blade forge damage is unaffected by Str debuff. Alignment generates Stars.',
    necrobinder: 'Doom bypasses Soul Siphon debuffs entirely — execute threshold ignores your Str. Osty tanking unaffected by your Dex. Use free turns for Capture Spirit/Dirge.',
    // All
  },

  // ================================================================
  // ACT 2 — Hive
  // ================================================================

  'The Insatiable': {
    general: '321 HP + Sandpit (4-turn death countdown). Frantic Escape extends timer by 1, energy cost +1 each use. Must draw and play one every single turn. Energy generation is survival.',
    ironclad: 'Corruption makes Frantic Escapes free (they are Skills). Offering/Bloodletting provide the energy to afford escalating Escape costs. Demon Form scaling between Escapes.',
    silent: 'Adrenaline/Tactician provide the energy. Master Planner puts Escape on top of draw pile so you always have it. Calculated Gamble cycles to find Escape.',
    defect: 'Turbo/Double Energy fuel the escalating Escape cost. Echo Form gives double value per turn. Hologram retrieves discarded Escapes from the exhaust pile.',
    regent: 'Void Form makes Escapes completely free. Convergence retains hand to guarantee you always have an Escape. Alignment generates Stars for burst windows.',
    necrobinder: 'Borrowed Time gives +4 energy to pay escalating Escape costs. Graveblast retrieves key cards. Osty tanks Lunging Bite and Thrash while you cycle for Escapes.'
  },

  'Knowledge Demon': {
    general: '379 HP. Choose curse per cycle: Disintegration (6-8 dmg/turn ramping), Mind Rot (-1 draw/turn), Sloth (max 3 cards/turn), Waste Away (-1 energy/turn). Burst kill in 5-6 turns.',
    ironclad: 'Burst build kills in 5-6 turns — take Mind Rot/Sloth (least harmful for short fight). Corruption+FNP handles Disintegration chip damage. Fiend Fire for burst.',
    silent: 'Poison bypasses all curse effects — damage keeps ticking. Take Waste Away (least harmful to 0-cost poison cards). Malaise applies Weak through all phases.',
    defect: 'Echo Form compensates for Sloth by doubling value per play. Frost orbs provide passive block through Disintegration. Defragment scales through resource curses.',
    regent: 'Sovereign Blade is draw-independent — counters Mind Rot gracefully. Void Form free plays counter Waste Away. Take Sloth (only limits 3, still enough with active scaling).',
    necrobinder: 'Doom executes regardless of curses — timer keeps ticking. Osty tanks Disintegration damage. Souls cycle past Mind Rot draw reduction.'
  },

  'Kaiser Crab': {
    general: 'Crusher Claw (209 HP) + Rocket Claw (199 HP). Rocket is the faster scaler (+2 Str/turn). Surrounded: 50% more damage from un-faced target. Kill Rocket first, then both near-simultaneously.',
    ironclad: 'Whirlwind hits both claws simultaneously. Heavy Blade focuses Rocket Claw first. Block the faced claw each turn while damaging the other.',
    silent: 'Poison ticks both claws at once — ideal for balanced damage. Corpse Explosion finishes surviving claw when other dies. Dagger Spray hits both.',
    defect: 'Electrodynamics lightning hits both every turn — perfect for this fight. Loop defragment to scale all damage sources. Hyperbeam burst when timing is right.',
    regent: 'Seven Stars hits both claws. Burst alignment for near-simultaneous kill. Stardust damages both consistently. Black Hole AoE.',
    necrobinder: 'The Scythe AoE hits both. Doom on both claws — they execute at their own pace, avoiding Crab Rage by killing both same turn. Rattle multi-taps both.'
  },

  // ================================================================
  // ACT 3 — Glory
  // ================================================================

  'The Queen': {
    general: 'Torch Head Amalgam (199 HP minion) + Queen (400 HP). Chains of Binding: first X cards drawn are Bound (can\'t play). Mass debuffs (99 Frail/Weak/Vuln). Kill Torch Head first to expose Queen.',
    ironclad: 'Evolve draws past Bound cards. Feel No Pain + Dark Embrace generates value from everything. Offering gives burst draw to offset Bound. FNP blocks chip through debuffs.',
    silent: 'Adrenaline/Tools of the Trade provide consistent draw despite Bound cards. Poison bypasses Queen\'s mass debuffs — damage unaffected by Frail/Vuln. Afterimage blocks hits.',
    defect: 'Creative AI generates powers that bypass Bound cards. Frost orbs provide passive block unaffected by debuffs. Defragment scales Focus through Frail. Echo Form for value.',
    regent: 'Void Form free plays offset Bound cards — play what you can. Sovereign Blade forge outscales the fight duration. Star generators work through Chains.',
    necrobinder: 'Souls draw 2 Exhaust — circumvent Bound by Exhausting them. Osty tanks all damage through debuffs. Doom on Queen ignores her massive HP pool\'s defenses.'
  },

  'Aeonglass': {
    general: '~450 HP. Shuffles Wither status cards into your hand — each unplayed Wither deals damage. Withering Presence generates more Wither each turn. Ebb move: Aeonglass gains Block. Increasing Intensity ramps damage.',
    ironclad: 'Corruption makes Wither cards free Skills — clear them instantly. Second Wind exhausts Wither for Block. Fiend Fire dumps a hand full of Wither for burst damage.',
    silent: 'Calculated Gamble discards full hand of Wither in one play. Exhaust effects (True Grit, Burning Pact) clear Wither without paying for them. Poison ticks regardless of Wither clutter.',
    defect: 'Coolheaded/orb channeling lets you skip playing Wither (orbs deal damage passively). Scrape cycles through Wither. Frost passive block tanks Wither chip hits.',
    regent: 'Void Form free plays offset Wither cost. Convergence retains key cards through Wither pollution. Star burst on Increasing Intensity turns.',
    necrobinder: 'Souls (draw 2 Exhaust) clear Wither from hand efficiently. Osty tanks Wither chip damage. Doom ticks regardless of Wither hand pollution.'
  },

  'Test Subject #C8': {
    general: 'Phase 1: Enrage (dmg reduction + Str/turn) — burst fast. Phase 2 revives 200 HP with Multi-Claw (ramps +1 hit/use). Phase 3 revives 300 HP with Intangible (immune alternating turns).',
    ironclad: 'Burst Phase 1 before Enrage piles up. Impervious + Second Wind for Phase 2 ramp. In Phase 3, skip Intangible turns and unload on gaps. Strength scaling wins all three phases.',
    silent: 'Poison bypasses Phase 1 dmg reduction. Wraith Form nullifies Phase 2 Multi-Claw ramp entirely. In Phase 3, Shiv on Intangible-turn (to stack Accuracy) and burst on gaps.',
    defect: 'Dark Orb scaling ignores Phase 1 dmg reduction (stores damage passively). Frost block holds Phase 2 claws. Echo Form doubles all value in Phase 3 playable windows.',
    regent: 'Sovereign Blade forge scaling carries through all three phases. Void Form free plays shine in Phase 3 Intangible — efficient turns. Seven Stars burst in Phase 2 window.',
    necrobinder: 'Doom executes regardless of Phase transitions — same threshold applies. Osty tanks Phase 2 claws. In Phase 3, wait for non-Intangible turns then execute. Souls cycle past Intangible stall.'
  }
};

// Export for use in other modules
if (typeof module !== 'undefined') {
  module.exports = { BOSS_TIPS };
}
