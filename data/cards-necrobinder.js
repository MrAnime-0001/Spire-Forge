// Card definitions for STS2 Build Advisor - Necrobinder
// Keep this file data-only.
// Synced from slaythespire.wiki.gg by scripts/sync-wiki-cards.mjs

const NECROBINDER_CARDS = [
    {
      "name": "Strike",
      "type": "atk",
      "cost": 1,
      "rarity": "basic",
      "cardType": "Attack",
      "note": "Starter. Remove in Act 3.",
      "description": "Deal 6 damage."
    },
    {
      "name": "Strike+",
      "type": "atk",
      "cost": 1,
      "rarity": "basic",
      "cardType": "Attack",
      "note": "",
      "description": "Deal 9 damage.",
      "isUpgraded": true,
      "baseCard": "Strike"
    },
    {
      "name": "Defend",
      "type": "def",
      "cost": 1,
      "rarity": "basic",
      "cardType": "Skill",
      "note": "Starter. Remove in Act 3.",
      "description": "Gain 5 StS2 Intent Defend.png Block."
    },
    {
      "name": "Defend+",
      "type": "def",
      "cost": 1,
      "rarity": "basic",
      "cardType": "Skill",
      "note": "",
      "description": "Gain 8 StS2 Intent Defend.png Block.",
      "isUpgraded": true,
      "baseCard": "Defend"
    },
    {
      "name": "Bodyguard",
      "type": "skl",
      "cost": 1,
      "rarity": "basic",
      "cardType": "Skill",
      "note": "Starter. Summon 5 HP to Osty. Core defensive starter — keep it.",
      "description": "Summon 5."
    },
    {
      "name": "Bodyguard+",
      "type": "skl",
      "cost": 1,
      "rarity": "basic",
      "cardType": "Skill",
      "note": "",
      "description": "Summon 7.",
      "isUpgraded": true,
      "baseCard": "Bodyguard"
    },
    {
      "name": "Unleash",
      "type": "atk",
      "cost": 1,
      "rarity": "basic",
      "cardType": "Attack",
      "note": "Starter. Osty deals damage equal to current HP. Powerful Osty finisher.",
      "description": "Osty deals 6 damage. Deals additional damage equal to Osty's current HP."
    },
    {
      "name": "Unleash+",
      "type": "atk",
      "cost": 1,
      "rarity": "basic",
      "cardType": "Attack",
      "note": "",
      "description": "Osty deals 9 damage. Deals additional damage equal to Osty's current HP.",
      "isUpgraded": true,
      "baseCard": "Unleash"
    },
    {
      "name": "Afterlife",
      "type": "vel",
      "cost": 1,
      "rarity": "common",
      "cardType": "Skill",
      "note": "Summon 6 to Osty. Exhaust. Big Osty HP burst.",
      "description": "Summon 6. Exhaust."
    },
    {
      "name": "Afterlife+",
      "type": "vel",
      "cost": 1,
      "rarity": "common",
      "cardType": "Skill",
      "note": "",
      "description": "Summon 9. Exhaust.",
      "isUpgraded": true,
      "baseCard": "Afterlife"
    },
    {
      "name": "Blight Strike",
      "type": "atk",
      "cost": 1,
      "rarity": "common",
      "cardType": "Attack",
      "note": "8 dmg. Apply Doom equal to damage dealt. Doom + damage.",
      "description": "Deal 8 damage. Apply Doom equal to damage dealt."
    },
    {
      "name": "Blight Strike+",
      "type": "atk",
      "cost": 1,
      "rarity": "common",
      "cardType": "Attack",
      "note": "",
      "description": "Deal 10 damage. Apply Doom equal to damage dealt.",
      "isUpgraded": true,
      "baseCard": "Blight Strike"
    },
    {
      "name": "Defile",
      "type": "atk_vel",
      "cost": 1,
      "rarity": "common",
      "cardType": "Attack",
      "note": "Ethereal. 13 dmg. High damage to drop enemies into Doom range.",
      "description": "Ethereal. Deal 13 damage."
    },
    {
      "name": "Defile+",
      "type": "atk_vel",
      "cost": 1,
      "rarity": "common",
      "cardType": "Attack",
      "note": "",
      "description": "Ethereal. Deal 17 damage.",
      "isUpgraded": true,
      "baseCard": "Defile"
    },
    {
      "name": "Defy",
      "type": "def_vel",
      "cost": 1,
      "rarity": "common",
      "cardType": "Skill",
      "note": "Ethereal. 6 Block + 1 Weak. 0-cost defensive debuff.",
      "description": "Ethereal. Gain 6 StS2 Intent Defend.png Block. Apply 1 Weak."
    },
    {
      "name": "Defy+",
      "type": "def_vel",
      "cost": 1,
      "rarity": "common",
      "cardType": "Skill",
      "note": "",
      "description": "Ethereal. Gain 9 StS2 Intent Defend.png Block. Apply 1 Weak.",
      "isUpgraded": true,
      "baseCard": "Defy"
    },
    {
      "name": "Drain Power",
      "type": "atk",
      "cost": 1,
      "rarity": "common",
      "cardType": "Attack",
      "note": "10 dmg + upgrade 2 random discard cards. Useful utility attack.",
      "description": "Deal 10 damage. Upgrade 2 random cards in your Discard Pile."
    },
    {
      "name": "Drain Power+",
      "type": "atk",
      "cost": 1,
      "rarity": "common",
      "cardType": "Attack",
      "note": "",
      "description": "Deal 12 damage. Upgrade 3 random cards in your Discard Pile.",
      "isUpgraded": true,
      "baseCard": "Drain Power"
    },
    {
      "name": "Fear",
      "type": "atk_vel",
      "cost": 1,
      "rarity": "common",
      "cardType": "Attack",
      "note": "Ethereal. 7 dmg + 1 Vulnerable. 0-cost debuff attack.",
      "description": "Ethereal. Deal 7 damage. Apply 1 Vulnerable."
    },
    {
      "name": "Fear+",
      "type": "atk_vel",
      "cost": 1,
      "rarity": "common",
      "cardType": "Attack",
      "note": "",
      "description": "Ethereal. Deal 8 damage. Apply 2 Vulnerable.",
      "isUpgraded": true,
      "baseCard": "Fear"
    },
    {
      "name": "Flatten",
      "type": "atk",
      "cost": 2,
      "rarity": "common",
      "cardType": "Attack",
      "note": "Osty deals 12 dmg. 0-cost if Osty attacked this turn. Core Osty.",
      "description": "Osty deals 12 damage. This card costs 0 StS2 EnergyNecrobinder.png if Osty has attacked this turn."
    },
    {
      "name": "Flatten+",
      "type": "atk",
      "cost": 2,
      "rarity": "common",
      "cardType": "Attack",
      "note": "",
      "description": "Osty deals 16 damage. This card costs 0 StS2 EnergyNecrobinder.png if Osty has attacked this turn.",
      "isUpgraded": true,
      "baseCard": "Flatten"
    },
    {
      "name": "Grave Warden",
      "type": "def_vel",
      "cost": 1,
      "rarity": "common",
      "cardType": "Skill",
      "note": "8 Block + add a Soul to draw pile. Block + draw engine.",
      "description": "Gain 8 StS2 Intent Defend.png Block. Add a Soul into your Draw Pile."
    },
    {
      "name": "Grave Warden+",
      "type": "def_vel",
      "cost": 1,
      "rarity": "common",
      "cardType": "Skill",
      "note": "",
      "description": "Gain 11 StS2 Intent Defend.png Block. Add a Soul into your Draw Pile.",
      "isUpgraded": true,
      "baseCard": "Grave Warden"
    },
    {
      "name": "Graveblast",
      "type": "atk_vel",
      "cost": 1,
      "rarity": "common",
      "cardType": "Attack",
      "note": "4 dmg + retrieve a card from discard. Exhaust. Utility retrieval.",
      "description": "Deal 4 damage. Put a card from your Discard Pile into your Hand. Exhaust."
    },
    {
      "name": "Graveblast+",
      "type": "atk_vel",
      "cost": 1,
      "rarity": "common",
      "cardType": "Attack",
      "note": "",
      "description": "Deal 6 damage. Put a card from your Discard Pile into your Hand.",
      "isUpgraded": true,
      "baseCard": "Graveblast"
    },
    {
      "name": "Invoke",
      "type": "skl",
      "cost": 1,
      "rarity": "common",
      "cardType": "Skill",
      "note": "Next turn: Summon 2 + 2 Energy. Osty + energy setup.",
      "description": "Next turn, Summon 2 and gain StS2 EnergyNecrobinder.pngStS2 EnergyNecrobinder.png."
    },
    {
      "name": "Invoke+",
      "type": "skl",
      "cost": 1,
      "rarity": "common",
      "cardType": "Skill",
      "note": "",
      "description": "Next turn, Summon 3 and gain StS2 EnergyNecrobinder.pngStS2 EnergyNecrobinder.pngStS2 EnergyNecrobinder.png.",
      "isUpgraded": true,
      "baseCard": "Invoke"
    },
    {
      "name": "Negative Pulse",
      "type": "def",
      "cost": 1,
      "rarity": "common",
      "cardType": "Skill",
      "note": "5 Block + 7 AoE Doom. Block + Doom combo.",
      "description": "Gain 5 StS2 Intent Defend.png Block. Apply 7 Doom to ALL enemies."
    },
    {
      "name": "Negative Pulse+",
      "type": "def",
      "cost": 1,
      "rarity": "common",
      "cardType": "Skill",
      "note": "",
      "description": "Gain 6 StS2 Intent Defend.png Block. Apply 11 Doom to ALL enemies.",
      "isUpgraded": true,
      "baseCard": "Negative Pulse"
    },
    {
      "name": "Poke",
      "type": "atk",
      "cost": 0,
      "rarity": "common",
      "cardType": "Attack",
      "note": "0-cost. Osty deals 6 dmg. Free Osty activator.",
      "description": "Osty deals 6 damage."
    },
    {
      "name": "Poke+",
      "type": "atk",
      "cost": 0,
      "rarity": "common",
      "cardType": "Attack",
      "note": "",
      "description": "Osty deals 9 damage.",
      "isUpgraded": true,
      "baseCard": "Poke"
    },
    {
      "name": "Pull Aggro",
      "type": "def",
      "cost": 2,
      "rarity": "common",
      "cardType": "Skill",
      "note": "Summon 4 + 7 Block. Redirect attacks to Osty.",
      "description": "Summon 4. Gain 7 StS2 Intent Defend.png Block."
    },
    {
      "name": "Pull Aggro+",
      "type": "def",
      "cost": 2,
      "rarity": "common",
      "cardType": "Skill",
      "note": "",
      "description": "Summon 5. Gain 9 StS2 Intent Defend.png Block.",
      "isUpgraded": true,
      "baseCard": "Pull Aggro"
    },
    {
      "name": "Reap",
      "type": "atk_vel",
      "cost": 3,
      "rarity": "common",
      "cardType": "Attack",
      "note": "Retain. 27 dmg. High single-target nuke.",
      "description": "Retain. Deal 27 damage."
    },
    {
      "name": "Reap+",
      "type": "atk_vel",
      "cost": 3,
      "rarity": "common",
      "cardType": "Attack",
      "note": "",
      "description": "Retain. Deal 33 damage.",
      "isUpgraded": true,
      "baseCard": "Reap"
    },
    {
      "name": "Reave",
      "type": "atk_vel",
      "cost": 1,
      "rarity": "common",
      "cardType": "Attack",
      "note": "9 dmg + add a Soul to draw pile. Attack + Soul generator.",
      "description": "Deal 10 damage. Add a Soul into your Draw Pile."
    },
    {
      "name": "Reave+",
      "type": "atk_vel",
      "cost": 1,
      "rarity": "common",
      "cardType": "Attack",
      "note": "",
      "description": "Deal 13 damage. Add a Soul+ into your Draw Pile.",
      "isUpgraded": true,
      "baseCard": "Reave"
    },
    {
      "name": "Scourge",
      "type": "vel",
      "cost": 1,
      "rarity": "common",
      "cardType": "Skill",
      "note": "Apply 13 Doom + draw 1. Core Doom card.",
      "description": "Apply 13 Doom. Draw 1 card."
    },
    {
      "name": "Scourge+",
      "type": "vel",
      "cost": 1,
      "rarity": "common",
      "cardType": "Skill",
      "note": "",
      "description": "Apply 16 Doom. Draw 2 cards.",
      "isUpgraded": true,
      "baseCard": "Scourge"
    },
    {
      "name": "Sculpting Strike",
      "type": "atk_vel",
      "cost": 1,
      "rarity": "common",
      "cardType": "Attack",
      "note": "8 dmg + add Ethereal to a hand card. Ethereal enabler.",
      "description": "Deal 9 damage. Add Ethereal to a card in your Hand."
    },
    {
      "name": "Sculpting Strike+",
      "type": "atk_vel",
      "cost": 1,
      "rarity": "common",
      "cardType": "Attack",
      "note": "",
      "description": "Deal 12 damage. Add Ethereal to a card in your Hand.",
      "isUpgraded": true,
      "baseCard": "Sculpting Strike"
    },
    {
      "name": "Snap",
      "type": "atk_vel",
      "cost": 1,
      "rarity": "common",
      "cardType": "Attack",
      "note": "Retain. Osty deals 7 dmg + Retain a hand card. Flexible Osty.",
      "description": "Osty deals 7 damage. Add Retain to a card in your Hand."
    },
    {
      "name": "Snap+",
      "type": "atk_vel",
      "cost": 1,
      "rarity": "common",
      "cardType": "Attack",
      "note": "",
      "description": "Osty deals 10 damage. Add Retain to a card in your Hand.",
      "isUpgraded": true,
      "baseCard": "Snap"
    },
    {
      "name": "Sow",
      "type": "atk_vel",
      "cost": 1,
      "rarity": "common",
      "cardType": "Attack",
      "note": "Retain. 8 AoE dmg. Retained AoE option.",
      "description": "Retain. Deal 8 damage to ALL enemies."
    },
    {
      "name": "Sow+",
      "type": "atk_vel",
      "cost": 1,
      "rarity": "common",
      "cardType": "Attack",
      "note": "",
      "description": "Retain. Deal 11 damage to ALL enemies.",
      "isUpgraded": true,
      "baseCard": "Sow"
    },
    {
      "name": "Wisp",
      "type": "vel",
      "cost": 0,
      "rarity": "common",
      "cardType": "Skill",
      "note": "Gain 1 Energy. Exhaust. Low standalone value — becomes PICK THIS when Eradicate is in deck (adds 11 free damage to Eradicate ceiling per energy).",
      "description": "Gain StS2 EnergyNecrobinder.png. Exhaust."
    },
    {
      "name": "Wisp+",
      "type": "vel",
      "cost": 0,
      "rarity": "common",
      "cardType": "Skill",
      "note": "",
      "description": "Retain. Gain StS2 EnergyNecrobinder.png. Exhaust.",
      "isUpgraded": true,
      "baseCard": "Wisp"
    },
    {
      "name": "Bone Shards",
      "type": "atk_def",
      "cost": 1,
      "rarity": "uncommon",
      "cardType": "Attack",
      "note": "Osty deals 9 AoE + you gain 9 Block. Osty dies. Sacrifice payoff.",
      "description": "If Osty is alive, he deals 9 damage to ALL enemies and you gain 9 StS2 Intent Defend.png Block. Osty dies."
    },
    {
      "name": "Bone Shards+",
      "type": "atk_def",
      "cost": 1,
      "rarity": "uncommon",
      "cardType": "Attack",
      "note": "",
      "description": "If Osty is alive, he deals 12 damage to ALL enemies and you gain 12 StS2 Intent Defend.png Block. Osty dies.",
      "isUpgraded": true,
      "baseCard": "Bone Shards"
    },
    {
      "name": "Borrowed Time",
      "type": "skl",
      "cost": 1,
      "rarity": "uncommon",
      "cardType": "Skill",
      "note": "Gain 4 Energy. Cards cost 1 more this turn. Reworked in v0.103 — pairs well with high-cost cards like Reap and Bury.",
      "description": "Gain 4StS2 EnergyNecrobinder.png. Cards cost an additional StS2 EnergyNecrobinder.png this turn."
    },
    {
      "name": "Borrowed Time+",
      "type": "skl",
      "cost": 1,
      "rarity": "uncommon",
      "cardType": "Skill",
      "note": "",
      "description": "Gain 6StS2 EnergyNecrobinder.png. Cards cost an additional StS2 EnergyNecrobinder.png this turn.",
      "isUpgraded": true,
      "baseCard": "Borrowed Time"
    },
    {
      "name": "Bury",
      "type": "atk",
      "cost": 4,
      "rarity": "uncommon",
      "cardType": "Attack",
      "note": "52 dmg. Massive single-target nuke.",
      "description": "Deal 52 damage."
    },
    {
      "name": "Bury+",
      "type": "atk",
      "cost": 4,
      "rarity": "uncommon",
      "cardType": "Attack",
      "note": "",
      "description": "Deal 63 damage.",
      "isUpgraded": true,
      "baseCard": "Bury"
    },
    {
      "name": "Calcify",
      "type": "atk",
      "cost": 1,
      "rarity": "uncommon",
      "cardType": "Power",
      "note": "Osty attacks deal 4 extra dmg. Passive Osty scaling.",
      "description": "Osty's attacks deal 4 additional damage."
    },
    {
      "name": "Calcify+",
      "type": "atk",
      "cost": 1,
      "rarity": "uncommon",
      "cardType": "Power",
      "note": "",
      "description": "Osty's attacks deal 6 additional damage.",
      "isUpgraded": true,
      "baseCard": "Calcify"
    },
    {
      "name": "Capture Spirit",
      "type": "vel",
      "cost": 1,
      "rarity": "uncommon",
      "cardType": "Skill",
      "note": "Enemy loses 3 HP. Add 3 Souls to draw. Soul generator.",
      "description": "Enemy loses 3 HP. Add 3 Souls into your Draw Pile."
    },
    {
      "name": "Capture Spirit+",
      "type": "vel",
      "cost": 1,
      "rarity": "uncommon",
      "cardType": "Skill",
      "note": "",
      "description": "Enemy loses 4 HP. Add 4 Souls into your Draw Pile.",
      "isUpgraded": true,
      "baseCard": "Capture Spirit"
    },
    {
      "name": "Cleanse",
      "type": "vel",
      "cost": 1,
      "rarity": "uncommon",
      "cardType": "Skill",
      "note": "Summon 3 + Exhaust 1 from draw. Osty + deck thin.",
      "description": "Summon 3. Exhaust 1 card from your Draw Pile."
    },
    {
      "name": "Cleanse+",
      "type": "vel",
      "cost": 1,
      "rarity": "uncommon",
      "cardType": "Skill",
      "note": "",
      "description": "Summon 5. Exhaust 1 card from your Draw Pile.",
      "isUpgraded": true,
      "baseCard": "Cleanse"
    },
    {
      "name": "Countdown",
      "type": "skl",
      "cost": 1,
      "rarity": "uncommon",
      "cardType": "Power",
      "note": "Apply 6 Doom to random enemy each turn start. Passive Doom.",
      "description": "At the start of your turn, apply 6 Doom to a random enemy."
    },
    {
      "name": "Countdown+",
      "type": "skl",
      "cost": 1,
      "rarity": "uncommon",
      "cardType": "Power",
      "note": "",
      "description": "At the start of your turn, apply 9 Doom to a random enemy.",
      "isUpgraded": true,
      "baseCard": "Countdown"
    },
    {
      "name": "Danse Macabre",
      "type": "skl",
      "cost": 1,
      "rarity": "uncommon",
      "cardType": "Power",
      "note": "Gain 3 Block per card costing 2+ played. Block + high-cost synergy.",
      "description": "Whenever you play a card that costs StS2 EnergyNecrobinder.pngStS2 EnergyNecrobinder.png or more, gain 4 StS2 Intent Defend.png Block."
    },
    {
      "name": "Danse Macabre+",
      "type": "skl",
      "cost": 1,
      "rarity": "uncommon",
      "cardType": "Power",
      "note": "",
      "description": "Whenever you play a card that costs StS2 EnergyNecrobinder.pngStS2 EnergyNecrobinder.png or more, gain 6 StS2 Intent Defend.png Block.",
      "isUpgraded": true,
      "baseCard": "Danse Macabre"
    },
    {
      "name": "Death March",
      "type": "atk_vel",
      "cost": 1,
      "rarity": "uncommon",
      "cardType": "Attack",
      "note": "8 dmg + 4 extra per card drawn this turn. Pairs with Dirge (Souls added to draw pile count as drawn cards) and Haunt (both scale off Soul generation — they amplify each other).",
      "description": "Deal 8 damage. Deals 4 additional damage for each card drawn during your turn."
    },
    {
      "name": "Death March+",
      "type": "atk_vel",
      "cost": 1,
      "rarity": "uncommon",
      "cardType": "Attack",
      "note": "",
      "description": "Deal 9 damage. Deals 6 additional damage for each card drawn during your turn.",
      "isUpgraded": true,
      "baseCard": "Death March"
    },
    {
      "name": "Death's Door",
      "type": "def",
      "cost": 1,
      "rarity": "uncommon",
      "cardType": "Skill",
      "note": "6 Block. If applied Doom this turn, Block x3. Core Doom/Block.",
      "description": "Gain 6 StS2 Intent Defend.png Block. If you applied Doom this turn, gain StS2 Intent Defend.png Block 2 additional times."
    },
    {
      "name": "Death's Door+",
      "type": "def",
      "cost": 1,
      "rarity": "uncommon",
      "cardType": "Skill",
      "note": "",
      "description": "Gain 7 StS2 Intent Defend.png Block. If you applied Doom this turn, gain StS2 Intent Defend.png Block 2 additional times.",
      "isUpgraded": true,
      "baseCard": "Death's Door"
    },
    {
      "name": "Deathbringer",
      "type": "def",
      "cost": 2,
      "rarity": "uncommon",
      "cardType": "Skill",
      "note": "Apply 21 Doom + 1 Weak to all enemies. Core Doom AoE.",
      "description": "Apply 21 Doom and 1 Weak to ALL enemies."
    },
    {
      "name": "Deathbringer+",
      "type": "def",
      "cost": 2,
      "rarity": "uncommon",
      "cardType": "Skill",
      "note": "",
      "description": "Apply 26 Doom and 1 Weak to ALL enemies.",
      "isUpgraded": true,
      "baseCard": "Deathbringer"
    },
    {
      "name": "Debilitate",
      "type": "atk",
      "cost": 1,
      "rarity": "uncommon",
      "cardType": "Attack",
      "note": "7 dmg. Vulnerable and Weak 2x effective vs enemy for 2 turns.",
      "description": "Deal 10 damage. Vulnerable and Weak are twice as effective against the enemy for the next 2 turns."
    },
    {
      "name": "Debilitate+",
      "type": "atk",
      "cost": 1,
      "rarity": "uncommon",
      "cardType": "Attack",
      "note": "",
      "description": "Deal 12 damage. Vulnerable and Weak are twice as effective against the enemy for the next 3 turns.",
      "isUpgraded": true,
      "baseCard": "Debilitate"
    },
    {
      "name": "Delay",
      "type": "def",
      "cost": 2,
      "rarity": "uncommon",
      "cardType": "Skill",
      "note": "11 Block + gain 1 Energy next turn. Survival tool.",
      "description": "Gain 11 StS2 Intent Defend.png Block. Next turn, gain StS2 EnergyNecrobinder.png."
    },
    {
      "name": "Delay+",
      "type": "def",
      "cost": 2,
      "rarity": "uncommon",
      "cardType": "Skill",
      "note": "",
      "description": "Gain 13 StS2 Intent Defend.png Block. Next turn, gain StS2 EnergyNecrobinder.pngStS2 EnergyNecrobinder.png.",
      "isUpgraded": true,
      "baseCard": "Delay"
    },
    {
      "name": "Dirge",
      "type": "vel",
      "cost": "X",
      "rarity": "uncommon",
      "cardType": "Skill",
      "note": "Summon 3 X times + X Souls. Scales with Energy.",
      "description": "Summon 3 X times. Add X Souls into your Draw Pile. Exhaust."
    },
    {
      "name": "Dirge+",
      "type": "vel",
      "cost": "X",
      "rarity": "uncommon",
      "cardType": "Skill",
      "note": "",
      "description": "Summon 4 X times. Add X Souls+ into your Draw Pile. Exhaust.",
      "isUpgraded": true,
      "baseCard": "Dirge"
    },
    {
      "name": "Dredge",
      "type": "vel",
      "cost": 1,
      "rarity": "uncommon",
      "cardType": "Skill",
      "note": "Put 3 discard cards in hand. Exhaust. Retrieval burst.",
      "description": "Put 3 cards from your Discard Pile into your Hand. Exhaust."
    },
    {
      "name": "Dredge+",
      "type": "vel",
      "cost": 1,
      "rarity": "uncommon",
      "cardType": "Skill",
      "note": "",
      "description": "Retain. Put 3 cards from your Discard Pile into your Hand. Exhaust.",
      "isUpgraded": true,
      "baseCard": "Dredge"
    },
    {
      "name": "Enfeebling Touch",
      "type": "skl_vel",
      "cost": 1,
      "rarity": "uncommon",
      "cardType": "Skill",
      "note": "Ethereal. Enemy loses 8 Strength this turn. Strong debuff.",
      "description": "Ethereal. Enemy loses 8 Strength this turn."
    },
    {
      "name": "Enfeebling Touch+",
      "type": "skl_vel",
      "cost": 1,
      "rarity": "uncommon",
      "cardType": "Skill",
      "note": "",
      "description": "Ethereal. Enemy loses 11 Strength this turn.",
      "isUpgraded": true,
      "baseCard": "Enfeebling Touch"
    },
    {
      "name": "Fetch",
      "type": "atk_vel",
      "cost": 0,
      "rarity": "uncommon",
      "cardType": "Attack",
      "note": "0-cost. Osty deals 3 dmg. Draw 1 first time played each turn. Cycle.",
      "description": "Osty deals 3 damage. If this is the first time this card has been played this turn, draw 1 card."
    },
    {
      "name": "Fetch+",
      "type": "atk_vel",
      "cost": 0,
      "rarity": "uncommon",
      "cardType": "Attack",
      "note": "",
      "description": "Osty deals 6 damage. If this is the first time this card has been played this turn, draw 1 card.",
      "isUpgraded": true,
      "baseCard": "Fetch"
    },
    {
      "name": "Friendship",
      "type": "skl",
      "cost": 1,
      "rarity": "uncommon",
      "cardType": "Power",
      "note": "Lose 2 Strength. Gain 1 Energy per turn. Energy engine.",
      "description": "Lose 2 Strength. Gain StS2 EnergyNecrobinder.png at the start of each turn."
    },
    {
      "name": "Friendship+",
      "type": "skl",
      "cost": 1,
      "rarity": "uncommon",
      "cardType": "Power",
      "note": "",
      "description": "Lose 1 Strength. Gain StS2 EnergyNecrobinder.png at the start of each turn.",
      "isUpgraded": true,
      "baseCard": "Friendship"
    },
    {
      "name": "Haunt",
      "type": "skl",
      "cost": 1,
      "rarity": "uncommon",
      "cardType": "Power",
      "note": "Each Soul played causes random enemy to lose 6 HP. Soul payoff.",
      "description": "Whenever you play a Soul, a random enemy loses 7 HP."
    },
    {
      "name": "Haunt+",
      "type": "skl",
      "cost": 1,
      "rarity": "uncommon",
      "cardType": "Power",
      "note": "",
      "description": "Whenever you play a Soul, a random enemy loses 9 HP.",
      "isUpgraded": true,
      "baseCard": "Haunt"
    },
    {
      "name": "High Five",
      "type": "atk",
      "cost": 2,
      "rarity": "uncommon",
      "cardType": "Attack",
      "note": "Osty deals 11 AoE + 2 Vulnerable to all. Osty AoE + debuff.",
      "description": "Osty deals 11 damage and applies 2 Vulnerable to ALL enemies."
    },
    {
      "name": "High Five+",
      "type": "atk",
      "cost": 2,
      "rarity": "uncommon",
      "cardType": "Attack",
      "note": "",
      "description": "Osty deals 13 damage and applies 3 Vulnerable to ALL enemies.",
      "isUpgraded": true,
      "baseCard": "High Five"
    },
    {
      "name": "Legion of Bone",
      "type": "vel",
      "cost": 2,
      "rarity": "uncommon",
      "cardType": "Skill",
      "note": "All players Summon 6. Exhaust. Coop Osty burst.",
      "description": "ALL players Summon 6.",
      "multiplayer": true
    },
    {
      "name": "Legion of Bone+",
      "type": "vel",
      "cost": 2,
      "rarity": "uncommon",
      "cardType": "Skill",
      "note": "",
      "description": "ALL players Summon 8.",
      "multiplayer": true,
      "isUpgraded": true,
      "baseCard": "Legion of Bone"
    },
    {
      "name": "Lethality",
      "type": "atk_vel",
      "cost": 1,
      "rarity": "uncommon",
      "cardType": "Power",
      "note": "Ethereal. First Attack each turn deals 50% extra. First-hit scaling.",
      "description": "Ethereal. The first Attack each turn deals 50% additional damage."
    },
    {
      "name": "Lethality+",
      "type": "atk_vel",
      "cost": 1,
      "rarity": "uncommon",
      "cardType": "Power",
      "note": "",
      "description": "Ethereal. The first Attack each turn deals 75% additional damage.",
      "isUpgraded": true,
      "baseCard": "Lethality"
    },
    {
      "name": "Melancholy",
      "type": "def",
      "cost": 3,
      "rarity": "uncommon",
      "cardType": "Skill",
      "note": "13 Block. Cost reduces by 1 per death. Scales over combat.",
      "description": "Gain 13 StS2 Intent Defend.png Block. Reduce this card's cost by StS2 EnergyNecrobinder.png whenever ANYONE dies."
    },
    {
      "name": "Melancholy+",
      "type": "def",
      "cost": 3,
      "rarity": "uncommon",
      "cardType": "Skill",
      "note": "",
      "description": "Gain 17 StS2 Intent Defend.png Block. Reduce this card's cost by StS2 EnergyNecrobinder.png whenever ANYONE dies.",
      "isUpgraded": true,
      "baseCard": "Melancholy"
    },
    {
      "name": "No Escape",
      "type": "skl",
      "cost": 1,
      "rarity": "uncommon",
      "cardType": "Skill",
      "note": "Apply 10+ Doom (scales with existing Doom). Core Doom stacker.",
      "description": "Apply 10 Doom, plus an additional 5 Doom for every 10 Doom already on this enemy."
    },
    {
      "name": "No Escape+",
      "type": "skl",
      "cost": 1,
      "rarity": "uncommon",
      "cardType": "Skill",
      "note": "",
      "description": "Apply 15 Doom, plus an additional 5 Doom for every 10 Doom already on this enemy.",
      "isUpgraded": true,
      "baseCard": "No Escape"
    },
    {
      "name": "Pagestorm",
      "type": "vel",
      "cost": 1,
      "rarity": "uncommon",
      "cardType": "Power",
      "note": "Draw 1 when you draw an Ethereal card. Ethereal draw engine.",
      "description": "Whenever you draw an Ethereal card, draw 1 card."
    },
    {
      "name": "Pagestorm+",
      "type": "vel",
      "cost": 0,
      "rarity": "uncommon",
      "cardType": "Power",
      "note": "",
      "description": "Whenever you draw an Ethereal card, draw 1 card.",
      "isUpgraded": true,
      "baseCard": "Pagestorm"
    },
    {
      "name": "Parse",
      "type": "vel",
      "cost": 1,
      "rarity": "uncommon",
      "cardType": "Skill",
      "note": "Ethereal. Draw 3. Ethereal draw.",
      "description": "Ethereal. Draw 3 cards."
    },
    {
      "name": "Parse+",
      "type": "vel",
      "cost": 1,
      "rarity": "uncommon",
      "cardType": "Skill",
      "note": "",
      "description": "Ethereal. Draw 4 cards.",
      "isUpgraded": true,
      "baseCard": "Parse"
    },
    {
      "name": "Pull from Below",
      "type": "skl_vel",
      "cost": 1,
      "rarity": "uncommon",
      "cardType": "Attack",
      "note": "5 dmg per Ethereal card played this combat. Ethereal payoff.",
      "description": "Deal 5 damage for each Ethereal card played this combat."
    },
    {
      "name": "Pull from Below+",
      "type": "skl_vel",
      "cost": 1,
      "rarity": "uncommon",
      "cardType": "Attack",
      "note": "",
      "description": "Deal 7 damage for each Ethereal card played this combat.",
      "isUpgraded": true,
      "baseCard": "Pull from Below"
    },
    {
      "name": "Putrefy",
      "type": "atk_def_vel",
      "cost": 1,
      "rarity": "uncommon",
      "cardType": "Skill",
      "note": "2 Weak + 2 Vulnerable. Exhaust. Multi-debuff setup.",
      "description": "Apply 2 Weak. Apply 2 Vulnerable. Exhaust."
    },
    {
      "name": "Putrefy+",
      "type": "atk_def_vel",
      "cost": 1,
      "rarity": "uncommon",
      "cardType": "Skill",
      "note": "",
      "description": "Apply 3 Weak. Apply 3 Vulnerable. Exhaust.",
      "isUpgraded": true,
      "baseCard": "Putrefy"
    },
    {
      "name": "Rattle",
      "type": "atk",
      "cost": 1,
      "rarity": "uncommon",
      "cardType": "Attack",
      "note": "Osty deals 7 dmg. Hits extra time per prior attack this turn. Core Osty.",
      "description": "Osty deals 7 damage. Hits an additional time for each other time he has attacked this turn."
    },
    {
      "name": "Rattle+",
      "type": "atk",
      "cost": 1,
      "rarity": "uncommon",
      "cardType": "Attack",
      "note": "",
      "description": "Osty deals 9 damage. Hits an additional time for each other time he has attacked this turn.",
      "isUpgraded": true,
      "baseCard": "Rattle"
    },
    {
      "name": "Right Hand Hand",
      "type": "atk",
      "cost": 0,
      "rarity": "uncommon",
      "cardType": "Attack",
      "note": "Osty deals 4 dmg. Returns from discard when 2+ cost card played.",
      "description": "Osty deals 4 damage. Whenever you play a card that costs StS2 EnergyNecrobinder.pngStS2 EnergyNecrobinder.png or more, return this to your Hand from the Discard Pile."
    },
    {
      "name": "Right Hand Hand+",
      "type": "atk",
      "cost": 0,
      "rarity": "uncommon",
      "cardType": "Attack",
      "note": "",
      "description": "Osty deals 6 damage. Whenever you play a card that costs StS2 EnergyNecrobinder.pngStS2 EnergyNecrobinder.png or more, return this to your Hand from the Discard Pile.",
      "isUpgraded": true,
      "baseCard": "Right Hand Hand"
    },
    {
      "name": "Severance",
      "type": "atk_vel",
      "cost": 2,
      "rarity": "uncommon",
      "cardType": "Attack",
      "note": "13 dmg + add Soul to draw, hand, and discard. Triple Soul generator.",
      "description": "Deal 13 damage. Add a Soul into your Draw Pile, Hand, and Discard Pile."
    },
    {
      "name": "Severance+",
      "type": "atk_vel",
      "cost": 2,
      "rarity": "uncommon",
      "cardType": "Attack",
      "note": "",
      "description": "Deal 18 damage. Add a Soul into your Draw Pile, Hand, and Discard Pile.",
      "isUpgraded": true,
      "baseCard": "Severance"
    },
    {
      "name": "Shroud",
      "type": "skl",
      "cost": 1,
      "rarity": "uncommon",
      "cardType": "Power",
      "note": "Gain 2 Block per Doom applied. Pairs with Deathbringer (21 Doom AoE = 42 Block in one card), Scourge (13 Doom = 26 Block + draw), No Escape (large Doom = large Block spike simultaneously).",
      "description": "Whenever you apply Doom, gain 3 StS2 Intent Defend.png Block."
    },
    {
      "name": "Shroud+",
      "type": "skl",
      "cost": 1,
      "rarity": "uncommon",
      "cardType": "Power",
      "note": "",
      "description": "Whenever you apply Doom, gain 4 StS2 Intent Defend.png Block.",
      "isUpgraded": true,
      "baseCard": "Shroud"
    },
    {
      "name": "Sic 'Em",
      "type": "atk",
      "cost": 1,
      "rarity": "uncommon",
      "cardType": "Attack",
      "note": "Osty deals 5 dmg. Per hit this turn, Summon 3. Core Osty growth.",
      "description": "Osty deals 5 damage. Whenever Osty hits this enemy this turn, Summon 3."
    },
    {
      "name": "Sic 'Em+",
      "type": "atk",
      "cost": 1,
      "rarity": "uncommon",
      "cardType": "Attack",
      "note": "",
      "description": "Osty deals 6 damage. Whenever Osty hits this enemy this turn, Summon 4.",
      "isUpgraded": true,
      "baseCard": "Sic 'Em"
    },
    {
      "name": "Sleight of Flesh",
      "type": "skl",
      "cost": 2,
      "rarity": "uncommon",
      "cardType": "Power",
      "note": "Whenever you apply a debuff, enemy takes 9 damage. Pairs with Deathbringer (Weak AoE = 9 per enemy from Sleight), Debilitate (Vuln+Weak = 18 free damage), No Escape (Doom is a debuff = 9 per No Escape).",
      "description": "Whenever you apply a debuff to an enemy, they take 9 damage."
    },
    {
      "name": "Sleight of Flesh+",
      "type": "skl",
      "cost": 2,
      "rarity": "uncommon",
      "cardType": "Power",
      "note": "",
      "description": "Whenever you apply a debuff to an enemy, they take 13 damage.",
      "isUpgraded": true,
      "baseCard": "Sleight of Flesh"
    },
    {
      "name": "Soulbound",
      "type": "pow",
      "cost": 1,
      "rarity": "uncommon",
      "cardType": "Power",
      "note": "",
      "description": "Choose an ally. Whenever you create a Soul, add a Soul to their Draw Pile.",
      "multiplayer": true
    },
    {
      "name": "Soulbound+",
      "type": "pow",
      "cost": 1,
      "rarity": "uncommon",
      "cardType": "Power",
      "note": "",
      "description": "Innate. Choose an ally. Whenever you create a Soul, add a Soul to their Draw Pile.",
      "multiplayer": true,
      "isUpgraded": true,
      "baseCard": "Soulbound"
    },
    {
      "name": "Spur",
      "type": "vel",
      "cost": 1,
      "rarity": "uncommon",
      "cardType": "Skill",
      "note": "Retain. Summon 3 + Osty heals 5. Core Osty sustain.",
      "description": "Retain. Summon 3. Osty heals 5 HP."
    },
    {
      "name": "Spur+",
      "type": "vel",
      "cost": 1,
      "rarity": "uncommon",
      "cardType": "Skill",
      "note": "",
      "description": "Retain. Summon 5. Osty heals 7 HP.",
      "isUpgraded": true,
      "baseCard": "Spur"
    },
    {
      "name": "Underworld",
      "type": "skl",
      "cost": 2,
      "rarity": "uncommon",
      "cardType": "Skill",
      "note": "",
      "description": "Whenever other players deal attack damage this turn, apply that much Doom. Exhaust.",
      "multiplayer": true
    },
    {
      "name": "Underworld+",
      "type": "skl",
      "cost": 2,
      "rarity": "uncommon",
      "cardType": "Skill",
      "note": "",
      "description": "Whenever other players deal attack damage this turn, apply that much Doom.",
      "multiplayer": true,
      "isUpgraded": true,
      "baseCard": "Underworld"
    },
    {
      "name": "Veilpiercer",
      "type": "atk_vel",
      "cost": 1,
      "rarity": "uncommon",
      "cardType": "Attack",
      "note": "10 dmg. Next Ethereal card costs 0. Ethereal bridge.",
      "description": "Deal 10 damage. The next Ethereal card you play costs 0 StS2 EnergyNecrobinder.png."
    },
    {
      "name": "Veilpiercer+",
      "type": "atk_vel",
      "cost": 1,
      "rarity": "uncommon",
      "cardType": "Attack",
      "note": "",
      "description": "Deal 13 damage. The next Ethereal card you play costs 0 StS2 EnergyNecrobinder.png.",
      "isUpgraded": true,
      "baseCard": "Veilpiercer"
    },
    {
      "name": "Banshee's Cry",
      "type": "atk_vel",
      "cost": 9,
      "rarity": "rare",
      "cardType": "Attack",
      "note": "33 AoE. Costs 2 less per Ethereal card played. Scales over combat.",
      "description": "Deal 33 damage to ALL enemies. Costs StS2 EnergyNecrobinder.pngStS2 EnergyNecrobinder.png less for each Ethereal card played this combat."
    },
    {
      "name": "Banshee's Cry+",
      "type": "atk_vel",
      "cost": 7,
      "rarity": "rare",
      "cardType": "Attack",
      "note": "",
      "description": "Deal 33 damage to ALL enemies. Costs StS2 EnergyNecrobinder.pngStS2 EnergyNecrobinder.png less for each Ethereal card played this combat.",
      "isUpgraded": true,
      "baseCard": "Banshee's Cry"
    },
    {
      "name": "Cacophony",
      "type": "pow",
      "cost": 2,
      "rarity": "rare",
      "cardType": "Power",
      "note": "",
      "description": "Every 33 cards drawn by ALL players, deal 66 damage to a random enemy.",
      "multiplayer": true
    },
    {
      "name": "Cacophony+",
      "type": "pow",
      "cost": 2,
      "rarity": "rare",
      "cardType": "Power",
      "note": "",
      "description": "Every 33 cards drawn by ALL players, deal 99 damage to a random enemy.",
      "multiplayer": true,
      "isUpgraded": true,
      "baseCard": "Cacophony"
    },
    {
      "name": "Call of the Void",
      "type": "vel",
      "cost": 1,
      "rarity": "rare",
      "cardType": "Power",
      "note": "Add 1 random Ethereal card to hand each turn. Card engine.",
      "description": "At the start of your turn, add 1 random card into your Hand. It gains Ethereal."
    },
    {
      "name": "Call of the Void+",
      "type": "vel",
      "cost": 1,
      "rarity": "rare",
      "cardType": "Power",
      "note": "",
      "description": "Innate. At the start of your turn, add 1 random card into your Hand. It gains Ethereal.",
      "isUpgraded": true,
      "baseCard": "Call of the Void"
    },
    {
      "name": "Demesne",
      "type": "vel",
      "cost": 3,
      "rarity": "rare",
      "cardType": "Power",
      "note": "Ethereal. Gain 1 Energy + draw 1 extra each turn. Huge engine.",
      "description": "Ethereal. At the start of your turn, gain StS2 EnergyNecrobinder.png and draw 1 additional card."
    },
    {
      "name": "Demesne+",
      "type": "vel",
      "cost": 2,
      "rarity": "rare",
      "cardType": "Power",
      "note": "",
      "description": "Ethereal. At the start of your turn, gain StS2 EnergyNecrobinder.png and draw 1 additional card.",
      "isUpgraded": true,
      "baseCard": "Demesne"
    },
    {
      "name": "Devour Life",
      "type": "skl",
      "cost": 1,
      "rarity": "rare",
      "cardType": "Power",
      "note": "Summon 1 per Soul played. Soul/Osty crossover engine.",
      "description": "Whenever you play a Soul, Summon 1."
    },
    {
      "name": "Devour Life+",
      "type": "skl",
      "cost": 1,
      "rarity": "rare",
      "cardType": "Power",
      "note": "",
      "description": "Whenever you play a Soul, Summon 2.",
      "isUpgraded": true,
      "baseCard": "Devour Life"
    },
    {
      "name": "Eidolon",
      "type": "def_vel",
      "cost": 2,
      "rarity": "rare",
      "cardType": "Skill",
      "note": "Exhaust hand. If 9+ cards Exhausted, gain Intangible. Niche nuke.",
      "description": "Play ALL Ethereal cards in your Exhaust Pile. Exhaust."
    },
    {
      "name": "Eidolon+",
      "type": "def_vel",
      "cost": 1,
      "rarity": "rare",
      "cardType": "Skill",
      "note": "",
      "description": "Play ALL Ethereal cards in your Exhaust Pile. Exhaust.",
      "isUpgraded": true,
      "baseCard": "Eidolon"
    },
    {
      "name": "End of Days",
      "type": "skl",
      "cost": 3,
      "rarity": "rare",
      "cardType": "Skill",
      "note": "Apply 29 Doom to all enemies. Instantly kill those at/below Doom HP. Win condition.",
      "description": "Apply 29 Doom to ALL enemies. Kill enemies with at least as much Doom as HP."
    },
    {
      "name": "End of Days+",
      "type": "skl",
      "cost": 3,
      "rarity": "rare",
      "cardType": "Skill",
      "note": "",
      "description": "Apply 37 Doom to ALL enemies. Kill enemies with at least as much Doom as HP.",
      "isUpgraded": true,
      "baseCard": "End of Days"
    },
    {
      "name": "Eradicate",
      "type": "atk_vel",
      "cost": "X",
      "rarity": "rare",
      "cardType": "Attack",
      "note": "Retain. 11 dmg X times. Scales with Energy.",
      "description": "Retain. Deal 11 damage X times."
    },
    {
      "name": "Eradicate+",
      "type": "atk_vel",
      "cost": "X",
      "rarity": "rare",
      "cardType": "Attack",
      "note": "",
      "description": "Retain. Deal 14 damage X times.",
      "isUpgraded": true,
      "baseCard": "Eradicate"
    },
    {
      "name": "Glimpse Beyond",
      "type": "vel",
      "cost": 1,
      "rarity": "rare",
      "cardType": "Skill",
      "note": "All players add 3 Souls to draw. Exhaust. Mass Soul generation.",
      "description": "ALL players add 3 Souls into their Draw Pile. Exhaust.",
      "multiplayer": true
    },
    {
      "name": "Glimpse Beyond+",
      "type": "vel",
      "cost": 1,
      "rarity": "rare",
      "cardType": "Skill",
      "note": "",
      "description": "ALL players add 4 Souls into their Draw Pile. Exhaust.",
      "multiplayer": true,
      "isUpgraded": true,
      "baseCard": "Glimpse Beyond"
    },
    {
      "name": "Hang",
      "type": "atk",
      "cost": 1,
      "rarity": "rare",
      "cardType": "Attack",
      "note": "10 dmg. Doubles all Hang card damage to this enemy. Combo finisher.",
      "description": "Deal 10 damage. Double the damage ALL Hang cards deal to this enemy."
    },
    {
      "name": "Hang+",
      "type": "atk",
      "cost": 1,
      "rarity": "rare",
      "cardType": "Attack",
      "note": "",
      "description": "Deal 13 damage. Double the damage ALL Hang cards deal to this enemy.",
      "isUpgraded": true,
      "baseCard": "Hang"
    },
    {
      "name": "Misery",
      "type": "atk",
      "cost": 0,
      "rarity": "rare",
      "cardType": "Attack",
      "note": "7 dmg. Spread enemy debuffs to all other enemies. Debuff spreader.",
      "description": "Deal 7 damage. Apply any debuffs on the enemy to ALL other enemies."
    },
    {
      "name": "Misery+",
      "type": "atk",
      "cost": 0,
      "rarity": "rare",
      "cardType": "Attack",
      "note": "",
      "description": "Retain. Deal 9 damage. Apply any debuffs on the enemy to ALL other enemies.",
      "isUpgraded": true,
      "baseCard": "Misery"
    },
    {
      "name": "Necro Mastery",
      "type": "skl",
      "cost": 2,
      "rarity": "rare",
      "cardType": "Power",
      "note": "Summon 5. When Osty loses HP, all enemies lose that HP. Core Osty.",
      "description": "Summon 5. Whenever Osty loses HP, ALL enemies lose that much HP as well."
    },
    {
      "name": "Necro Mastery+",
      "type": "skl",
      "cost": 2,
      "rarity": "rare",
      "cardType": "Power",
      "note": "",
      "description": "Summon 8. Whenever Osty loses HP, ALL enemies lose that much HP as well.",
      "isUpgraded": true,
      "baseCard": "Necro Mastery"
    },
    {
      "name": "Neurosurge",
      "type": "vel",
      "cost": 0,
      "rarity": "rare",
      "cardType": "Power",
      "note": "Gain 3 Energy + draw 2. Apply 3 Doom to yourself each turn. High risk/reward.",
      "description": "Gain StS2 EnergyNecrobinder.pngStS2 EnergyNecrobinder.pngStS2 EnergyNecrobinder.png. Draw 2 cards. At the start of your turn, apply 3 Doom to yourself."
    },
    {
      "name": "Neurosurge+",
      "type": "vel",
      "cost": 0,
      "rarity": "rare",
      "cardType": "Power",
      "note": "",
      "description": "Gain 4StS2 EnergyNecrobinder.png. Draw 2 cards. At the start of your turn, apply 3 Doom to yourself.",
      "isUpgraded": true,
      "baseCard": "Neurosurge"
    },
    {
      "name": "Oblivion",
      "type": "skl",
      "cost": 0,
      "rarity": "rare",
      "cardType": "Skill",
      "note": "Each card played this turn applies 3 Doom. Doom burst turn.",
      "description": "Whenever you play a card this turn, apply 3 Doom to the enemy."
    },
    {
      "name": "Oblivion+",
      "type": "skl",
      "cost": 0,
      "rarity": "rare",
      "cardType": "Skill",
      "note": "",
      "description": "Whenever you play a card this turn, apply 4 Doom to the enemy.",
      "isUpgraded": true,
      "baseCard": "Oblivion"
    },
    {
      "name": "Reanimate",
      "type": "vel",
      "cost": 3,
      "rarity": "rare",
      "cardType": "Skill",
      "note": "Summon 20 to Osty. Exhaust. Massive Osty HP burst.",
      "description": "Summon 20. Exhaust."
    },
    {
      "name": "Reanimate+",
      "type": "vel",
      "cost": 3,
      "rarity": "rare",
      "cardType": "Skill",
      "note": "",
      "description": "Summon 25. Exhaust.",
      "isUpgraded": true,
      "baseCard": "Reanimate"
    },
    {
      "name": "Reaper Form",
      "type": "atk",
      "cost": 3,
      "rarity": "rare",
      "cardType": "Power",
      "note": "Attacks also apply Doom equal to damage dealt. Passive Doom engine.",
      "description": "Whenever Attacks deal damage, apply that much Doom."
    },
    {
      "name": "Reaper Form+",
      "type": "atk",
      "cost": 3,
      "rarity": "rare",
      "cardType": "Power",
      "note": "",
      "description": "Retain. Whenever Attacks deal damage, apply that much Doom.",
      "isUpgraded": true,
      "baseCard": "Reaper Form"
    },
    {
      "name": "Sacrifice",
      "type": "def_vel",
      "cost": 1,
      "rarity": "rare",
      "cardType": "Skill",
      "note": "Retain. Osty dies. Gain Block = double Osty Max HP. Sacrifice payoff.",
      "description": "Retain. If Osty is alive, he dies and you gain StS2 Intent Defend.png Block equal to triple his Max HP."
    },
    {
      "name": "Sacrifice+",
      "type": "def_vel",
      "cost": 0,
      "rarity": "rare",
      "cardType": "Skill",
      "note": "",
      "description": "Retain. If Osty is alive, he dies and you gain StS2 Intent Defend.png Block equal to triple his Max HP.",
      "isUpgraded": true,
      "baseCard": "Sacrifice"
    },
    {
      "name": "Seance",
      "type": "vel",
      "cost": 1,
      "rarity": "rare",
      "cardType": "Skill",
      "note": "Ethereal. Transform a draw pile card into Soul. Deck conversion.",
      "description": "Ethereal. Transform a card in your Draw Pile into Soul."
    },
    {
      "name": "Seance+",
      "type": "vel",
      "cost": 0,
      "rarity": "rare",
      "cardType": "Skill",
      "note": "",
      "description": "Ethereal. Transform a card in your Draw Pile into Soul.",
      "isUpgraded": true,
      "baseCard": "Seance"
    },
    {
      "name": "Sentry Mode",
      "type": "skl",
      "cost": 2,
      "rarity": "rare",
      "cardType": "Power",
      "note": "Add 1 Sweeping Gaze to hand each turn start. Passive Osty attack.",
      "description": "At the start of your turn, add 1 Sweeping Gaze into your Hand."
    },
    {
      "name": "Sentry Mode+",
      "type": "skl",
      "cost": 1,
      "rarity": "rare",
      "cardType": "Power",
      "note": "",
      "description": "At the start of your turn, add 1 Sweeping Gaze into your Hand.",
      "isUpgraded": true,
      "baseCard": "Sentry Mode"
    },
    {
      "name": "Shared Fate",
      "type": "skl_vel",
      "cost": 0,
      "rarity": "rare",
      "cardType": "Skill",
      "note": "Lose 2 Strength. Enemy loses 2 Strength. Exhaust. Mutual debuff.",
      "description": "Lose 2 Strength. Enemy loses 2 Strength. Exhaust."
    },
    {
      "name": "Shared Fate+",
      "type": "skl_vel",
      "cost": 0,
      "rarity": "rare",
      "cardType": "Skill",
      "note": "",
      "description": "Lose 2 Strength. Enemy loses 3 Strength. Exhaust.",
      "isUpgraded": true,
      "baseCard": "Shared Fate"
    },
    {
      "name": "Soul Storm",
      "type": "atk_vel",
      "cost": 1,
      "rarity": "rare",
      "cardType": "Attack",
      "note": "9 dmg + 2 extra per Soul in Exhaust. Soul payoff.",
      "description": "Deal 9 damage. Deals 4 additional damage for each Soul in your Exhaust Pile."
    },
    {
      "name": "Soul Storm+",
      "type": "atk_vel",
      "cost": 1,
      "rarity": "rare",
      "cardType": "Attack",
      "note": "",
      "description": "Deal 9 damage. Deals 6 additional damage for each Soul in your Exhaust Pile.",
      "isUpgraded": true,
      "baseCard": "Soul Storm"
    },
    {
      "name": "Spirit of Ash",
      "type": "skl_vel",
      "cost": 1,
      "rarity": "rare",
      "cardType": "Power",
      "note": "Gain 4 Block per Ethereal card played. Ethereal Block engine.",
      "description": "Whenever you play an Ethereal card, gain 4 StS2 Intent Defend.png Block."
    },
    {
      "name": "Spirit of Ash+",
      "type": "skl_vel",
      "cost": 1,
      "rarity": "rare",
      "cardType": "Power",
      "note": "",
      "description": "Whenever you play an Ethereal card, gain 5 StS2 Intent Defend.png Block.",
      "isUpgraded": true,
      "baseCard": "Spirit of Ash"
    },
    {
      "name": "Squeeze",
      "type": "atk",
      "cost": 3,
      "rarity": "rare",
      "cardType": "Attack",
      "note": "Osty deals 25 dmg + 5 per other Osty attack in deck. Osty scaling.",
      "description": "Osty deals 25 damage. Deals 5 additional damage for ALL your other Osty Attacks."
    },
    {
      "name": "Squeeze+",
      "type": "atk",
      "cost": 3,
      "rarity": "rare",
      "cardType": "Attack",
      "note": "",
      "description": "Osty deals 30 damage. Deals 6 additional damage for ALL your other Osty Attacks.",
      "isUpgraded": true,
      "baseCard": "Squeeze"
    },
    {
      "name": "The Scythe",
      "type": "atk_vel",
      "cost": 2,
      "rarity": "rare",
      "cardType": "Attack",
      "note": "13 dmg. Permanently increases damage by 4. Exhaust. Scaling finisher.",
      "description": "Deal 13 damage. Permanently increase this card's damage by 5. Exhaust."
    },
    {
      "name": "The Scythe+",
      "type": "atk_vel",
      "cost": 2,
      "rarity": "rare",
      "cardType": "Attack",
      "note": "",
      "description": "Deal 13 damage. Permanently increase this card's damage by 7. Exhaust.",
      "isUpgraded": true,
      "baseCard": "The Scythe"
    },
    {
      "name": "Time's Up",
      "type": "skl_vel",
      "cost": 2,
      "rarity": "rare",
      "cardType": "Attack",
      "note": "Deal damage equal to enemy Doom. Exhaust. Core Doom finisher.",
      "description": "Deal damage equal to the enemy's Doom."
    },
    {
      "name": "Time's Up+",
      "type": "skl_vel",
      "cost": 2,
      "rarity": "rare",
      "cardType": "Attack",
      "note": "",
      "description": "Retain. Deal damage equal to the enemy's Doom.",
      "isUpgraded": true,
      "baseCard": "Time's Up"
    },
    {
      "name": "Transfigure",
      "type": "vel",
      "cost": 1,
      "rarity": "rare",
      "cardType": "Skill",
      "note": "Add Replay to a hand card (extra Energy cost). Exhaust.",
      "description": "Add Replay to a card in your Hand. It costs an extra StS2 EnergyNecrobinder.png. Exhaust."
    },
    {
      "name": "Transfigure+",
      "type": "vel",
      "cost": 1,
      "rarity": "rare",
      "cardType": "Skill",
      "note": "",
      "description": "Add Replay to a card in your Hand. It costs an extra StS2 EnergyNecrobinder.png.",
      "isUpgraded": true,
      "baseCard": "Transfigure"
    },
    {
      "name": "Undeath",
      "type": "def",
      "cost": 0,
      "rarity": "rare",
      "cardType": "Skill",
      "note": "7 Block + add copy to discard. Persistent block card.",
      "description": "Gain 7 StS2 Intent Defend.png Block. Add a copy of this card into your Discard Pile."
    },
    {
      "name": "Undeath+",
      "type": "def",
      "cost": 0,
      "rarity": "rare",
      "cardType": "Skill",
      "note": "",
      "description": "Gain 9 StS2 Intent Defend.png Block. Add a copy of this card into your Discard Pile.",
      "isUpgraded": true,
      "baseCard": "Undeath"
    },
    {
      "name": "Forbidden Grimoire",
      "type": "skl",
      "cost": 2,
      "rarity": "ancient",
      "cardType": "Power",
      "note": "After combat, may remove 1 card. Eternal. Passive deck thinning.",
      "description": "At the end of combat, you may remove a card from your Deck. Eternal."
    },
    {
      "name": "Forbidden Grimoire+",
      "type": "skl",
      "cost": 1,
      "rarity": "ancient",
      "cardType": "Power",
      "note": "",
      "description": "At the end of combat, you may remove a card from your Deck. Eternal.",
      "isUpgraded": true,
      "baseCard": "Forbidden Grimoire"
    },
    {
      "name": "Protector",
      "type": "atk",
      "cost": 1,
      "rarity": "ancient",
      "cardType": "Attack",
      "note": "Ancient. Osty deals dmg + Osty Max HP extra. High Osty finisher.",
      "description": "Osty deals 10 damage. Deals additional damage equal to Osty's Max HP."
    },
    {
      "name": "Protector+",
      "type": "atk",
      "cost": 0,
      "rarity": "ancient",
      "cardType": "Attack",
      "note": "",
      "description": "Osty deals 15 damage. Deals additional damage equal to Osty's Max HP.",
      "isUpgraded": true,
      "baseCard": "Protector"
    }
  ];
