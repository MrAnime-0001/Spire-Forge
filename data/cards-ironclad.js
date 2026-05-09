// Card definitions for STS2 Build Advisor — Ironclad
// Keep this file data-only.

const IRONCLAD_CARDS = [
    {
      "name": "Strike",
      "type": "atk",
      "cost": 1,
      "rarity": "basic",
      "note": "Starter. Core card until you find better alternatives.",
      "description": "Deal 6 damage."
    },
    {
      "name": "Bash",
      "type": "atk",
      "cost": 2,
      "rarity": "basic",
      "note": "Starter. 8 dmg + 2 Vulnerable.",
      "description": "Deal 8 damage. Apply 2 Vulnerable."
    },
    {
      "name": "Bash+",
      "type": "atk",
      "cost": 2,
      "rarity": "basic",
      "note": "Upgraded Bash. 10 dmg + 3 Vulnerable.",
      "description": "Deal 10 damage. Apply 3 Vulnerable.",
      "isUpgraded": true,
      "baseCard": "Bash"
    },
    {
      "name": "Defend",
      "type": "def",
      "cost": 1,
      "rarity": "basic",
      "note": "Starter. Remove when possible in Act 3.",
      "description": "Gain 5 StS2 Intent Defend.png Block."
    },
    {
      "name": "Anger",
      "type": "atk",
      "cost": 0,
      "rarity": "common",
      "note": "0-cost. Adds a copy to discard. Good with Exhaust.",
      "description": "Deal 6 damage. Add a copy of this card into your Discard Pile."
    },
    {
      "name": "Armaments",
      "type": "def",
      "cost": 1,
      "rarity": "common",
      "note": "Block + upgrade a card in hand. Good early utility.",
      "description": "Gain 5 StS2 Intent Defend.png Block. Upgrade a card in your Hand."
    },
    {
      "name": "Blood Wall",
      "type": "def",
      "cost": 2,
      "rarity": "common",
      "note": "Lose 2 HP. Gain 16 Block. Efficient panic button.",
      "description": "Lose 2 HP. Gain 16 StS2 Intent Defend.png Block."
    },
    {
      "name": "Bloodletting",
      "type": "vel",
      "cost": 0,
      "rarity": "common",
      "note": "Lose 3 HP, gain 2 Energy. Strong with draw.",
      "description": "Lose 3 HP. Gain StS2 EnergyIronclad.pngStS2 EnergyIronclad.png."
    },
    {
      "name": "Body Slam",
      "type": "skl",
      "cost": 1,
      "rarity": "common",
      "note": "Deals damage equal to your current Block. Core Block build.",
      "description": "Deal damage equal to your StS2 Intent Defend.png Block."
    },
    {
      "name": "Breakthrough",
      "type": "atk",
      "cost": 1,
      "rarity": "common",
      "note": "AoE. Costs only 1 HP. Core Bloodletting card.",
      "description": "Lose 1 HP. Deal 9 damage to ALL enemies."
    },
    {
      "name": "Cinder",
      "type": "atk_vel",
      "cost": 1,
      "rarity": "common",
      "note": "17 dmg. Exhausts top card. Good deck thinner.",
      "description": "Deal 18 damage. Exhaust a random card in your Hand."
    },
    {
      "name": "Havoc",
      "type": "vel",
      "cost": 1,
      "rarity": "common",
      "note": "Play and Exhaust top card. Useful in Exhaust decks.",
      "description": "Play the top card of your Draw Pile and Exhaust it."
    },
    {
      "name": "Headbutt",
      "type": "atk_vel",
      "cost": 1,
      "rarity": "common",
      "note": "9 dmg. Return a card from discard to top of draw.",
      "description": "Deal 9 damage. Put a card from your Discard Pile on top of your Draw Pile."
    },
    {
      "name": "Iron Wave",
      "type": "atk_def",
      "cost": 1,
      "rarity": "common",
      "note": "5 Block + 5 dmg. Balanced dual-use card.",
      "description": "Gain 5 StS2 Intent Defend.png Block. Deal 5 damage."
    },
    {
      "name": "Molten Fist",
      "type": "atk_vel",
      "cost": 1,
      "rarity": "common",
      "note": "10 dmg. Doubles enemy Vulnerable. Exhaust. Great with Vulnerable synergy.",
      "description": "Deal 10 damage. Double the enemy's StS2 Icon Vulnerable.png Vulnerable. Exhaust."
    },
    {
      "name": "Perfected Strike",
      "type": "atk",
      "cost": 2,
      "rarity": "common",
      "note": "Core of Strike build. +2 per Strike card in deck.",
      "description": "Deal 6 damage. Deals 2 additional damage for ALL your cards containing “Strike”."
    },
    {
      "name": "Pommel Strike",
      "type": "atk_vel",
      "cost": 1,
      "rarity": "common",
      "note": "9 dmg. Draw 1. Good in Strike decks.",
      "description": "Deal 9 damage. Draw 1 card."
    },
    {
      "name": "Setup Strike",
      "type": "atk_skl",
      "cost": 1,
      "rarity": "common",
      "note": "7 dmg. Gain 2 Strength this turn. Early Strength enabler.",
      "description": "Deal 7 damage. Gain 2 StS2 Icon Strength.png Strength this turn."
    },
    {
      "name": "Shrug It Off",
      "type": "def_vel",
      "cost": 1,
      "rarity": "common",
      "note": "8 Block + draw. Great all-rounder.",
      "description": "Gain 8 StS2 Intent Defend.png Block. Draw 1 card."
    },
    {
      "name": "Sword Boomerang",
      "type": "atk",
      "cost": 1,
      "rarity": "common",
      "note": "3 dmg x3 random. Decent Strength multiplier.",
      "description": "Deal 3 damage to a random enemy 3 times."
    },
    {
      "name": "Thunderclap",
      "type": "atk",
      "cost": 1,
      "rarity": "common",
      "note": "4 AoE dmg + Vulnerable to all. Good Act 1 pickup.",
      "description": "Deal 4 damage and apply 1 StS2 Icon Vulnerable.png Vulnerable to ALL enemies."
    },
    {
      "name": "Tremble",
      "type": "atk_vel",
      "cost": 0,
      "rarity": "common",
      "note": "0-cost. Apply 2 Vulnerable. Good with big nukes.",
      "description": "Apply 3 StS2 Icon Vulnerable.png Vulnerable. Exhaust"
    },
    {
      "name": "True Grit",
      "type": "def_vel",
      "cost": 1,
      "rarity": "common",
      "note": "7 Block + Exhaust a random card. Good deck thinner.",
      "description": "Gain 7 StS2 Intent Defend.png Block. Exhaust 1 card at random."
    },
    {
      "name": "Twin Strike",
      "type": "atk",
      "cost": 1,
      "rarity": "common",
      "note": "5 dmg twice. Best with Strength.",
      "description": "Deal 5 damage twice."
    },
    {
      "name": "Ashen Strike",
      "type": "atk_vel",
      "cost": 2,
      "rarity": "uncommon",
      "note": "6 dmg + 3 extra per Exhaust pile card. Exhaust finisher.",
      "description": "Deal 6 damage. Deals 3 additional damage for each card in your Exhaust Pile."
    },
    {
      "name": "Battle Trance",
      "type": "vel",
      "cost": 0,
      "rarity": "uncommon",
      "note": "Draw 3. Cannot draw more this turn. Great burst draw.",
      "description": "Draw 3 cards. You cannot draw additional cards this turn."
    },
    {
      "name": "Bludgeon",
      "type": "atk",
      "cost": 3,
      "rarity": "uncommon",
      "note": "32 dmg. Big single hit. Slow but powerful.",
      "description": "Deal 32 damage."
    },
    {
      "name": "Bully",
      "type": "atk",
      "cost": 1,
      "rarity": "uncommon",
      "note": "4 dmg + 2 extra per Vulnerable on enemy. Pairs with Vulnerable setup.",
      "description": "Deal 4 damage. Deals 2 additional damage for each StS2 Icon Vulnerable.png Vulnerable on the enemy."
    },
    {
      "name": "Burning Pact",
      "type": "vel",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Exhaust a card, draw 2. Good in Exhaust decks.",
      "description": "Exhaust 1 card. Draw 2 cards."
    },
    {
      "name": "Dismantle",
      "type": "atk",
      "cost": 1,
      "rarity": "uncommon",
      "note": "8 dmg, hits twice if enemy Vulnerable. Great Vulnerable payoff.",
      "description": "Deal 8 damage. If the enemy is StS2 Icon Vulnerable.png Vulnerable, hits twice."
    },
    {
      "name": "Demonic Shield",
      "type": "def_vel",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Lose 1 HP. Give another player Block equal to your Block. Exhaust. Coop defensive card.",
      "description": "Lose 1 HP. Give another player StS2 Intent Defend.png Block equal to your StS2 Intent Defend.png Block. Exhaust."
    },
    {
      "name": "Dominate",
      "type": "atk_skl_vel",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Reworked in v0.103. Check in-game for current effect.",
      "description": "Apply 1 StS2 Icon Vulnerable.png Vulnerable. Gain 1 StS2 Icon Strength.png Strength for each StS2 Icon Vulnerable.png Vulnerable on the enemy. Exhaust."
    },
    {
      "name": "Drum of Battle",
      "type": "vel",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Draw 2 now. Exhaust top card each turn. Draw engine with tempo cost.",
      "description": "Draw 2 cards. At the start of your turn, Exhaust the top card of your Draw Pile."
    },
    {
      "name": "Evil Eye",
      "type": "def_vel",
      "cost": 2,
      "rarity": "uncommon",
      "note": "8 Block + 8 more if Exhausted this turn. Weak all enemies. Exhaust synergy.",
      "description": "Gain 8 StS2 Intent Defend.png Block. Gain another 8 StS2 Intent Defend.png Block if you have Exhausted a card this turn."
    },
    {
      "name": "Expect a Fight",
      "type": "skl",
      "cost": 0,
      "rarity": "uncommon",
      "note": "Reworked in v0.103. Check in-game for current effect.",
      "description": "Gain StS2 EnergyIronclad.png for each Attack in your Hand. You cannot gain additional StS2 EnergyIronclad.png this turn."
    },
    {
      "name": "Feel No Pain",
      "type": "def_vel",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Gain 3 Block whenever a card Exhausts. Core Exhaust.",
      "description": "Whenever a card is Exhausted, gain 3 StS2 Intent Defend.png Block."
    },
    {
      "name": "Fight Me!",
      "type": "atk_skl",
      "cost": 1,
      "rarity": "uncommon",
      "note": "5 dmg twice + 2 Strength. Enemy gains 1 Strength. Great Strength generator.",
      "description": "Deal 5 damage twice. Gain 3 StS2 Icon Strength.png Strength. The enemy gains 1 StS2 Icon Strength.png Strength."
    },
    {
      "name": "Flame Barrier",
      "type": "def_skl",
      "cost": 2,
      "rarity": "uncommon",
      "note": "12 Block + deal 4 back whenever attacked. Expensive but strong.",
      "description": "Gain 12 StS2 Intent Defend.png Block. Whenever you are attacked this turn, deal 4 damage back."
    },
    {
      "name": "Forgotten Ritual",
      "type": "vel",
      "cost": 0,
      "rarity": "uncommon",
      "note": "Gain 3 Energy if you Exhausted a card this turn. Core Exhaust engine.",
      "description": "If you Exhausted a card this turn, gain StS2 EnergyIronclad.pngStS2 EnergyIronclad.pngStS2 EnergyIronclad.png. Exhaust."
    },
    {
      "name": "Hemokinesis",
      "type": "atk",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Lose 2 HP, deal 14 dmg. Strong single target. Core Bloodletting.",
      "description": "Lose 2 HP. Deal 15 damage."
    },
    {
      "name": "Howl from Beyond",
      "type": "atk_vel",
      "cost": 2,
      "rarity": "uncommon",
      "note": "16 AoE. Plays from Exhaust at turn start. Great Exhaust payoff.",
      "description": "Deal 16 damage to ALL enemies. At the start of your turn, if this is in your Exhaust Pile, play it."
    },
    {
      "name": "Infernal Blade",
      "type": "vel",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Add a random free Attack to hand. Exhaust. Flexible.",
      "description": "Add a random Attack into your Hand. It's free to play this turn. Exhaust."
    },
    {
      "name": "Inferno",
      "type": "skl",
      "cost": 3,
      "rarity": "uncommon",
      "note": "Lose 1 HP per turn. Deal 6 AoE whenever you lose HP. Bloodletting engine.",
      "description": "At the start of your turn, lose 1 HP. Whenever you lose HP on your turn, deal 6 damage to ALL enemies."
    },
    {
      "name": "Inflame",
      "type": "skl",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Gain 2 Strength. Cheap Strength generator.",
      "description": "Gain 2 StS2 Icon Strength.png Strength."
    },
    {
      "name": "Juggling",
      "type": "skl",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Add copy of 3rd Attack played each turn to hand. Combo enabler.",
      "description": "Add a copy of the third Attack you play each turn into your Hand."
    },
    {
      "name": "Pillage",
      "type": "atk_vel",
      "cost": 1,
      "rarity": "uncommon",
      "note": "6 dmg. Draw until you draw a non-Attack. Great with attack-heavy decks.",
      "description": "Deal 6 damage. Draw cards until you draw a non-Attack card."
    },
    {
      "name": "Rage",
      "type": "skl",
      "cost": 0,
      "rarity": "uncommon",
      "note": "Gain 3 Block per Attack played this turn. Hybrid offense/defense.",
      "description": "Whenever you play an Attack this turn, gain 3 StS2 Intent Defend.png Block."
    },
    {
      "name": "Rampage",
      "type": "atk",
      "cost": 1,
      "rarity": "uncommon",
      "note": "9 dmg. Increases this card's damage by 5 each combat. Scaling attack.",
      "description": "Deal 9 damage. Increase this card's damage by 5 this combat."
    },
    {
      "name": "Rupture",
      "type": "skl",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Gain 1 Strength whenever you lose HP. Core Bloodletting.",
      "description": "Whenever you lose HP on your turn, gain 1 StS2 Icon Strength.png Strength."
    },
    {
      "name": "Second Wind",
      "type": "def_vel",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Exhaust all non-Attacks in hand. Gain 5 Block per card Exhausted. Great Exhaust/Block.",
      "description": "Exhaust all non-Attack cards in your Hand. Gain 5 StS2 Intent Defend.png Block for each card Exhausted."
    },
    {
      "name": "Spite",
      "type": "atk",
      "cost": 0,
      "rarity": "uncommon",
      "note": "Reworked in v0.103. Check in-game for current effect.",
      "description": "Deal 5 damage. If you lost HP this turn, hits 2 times."
    },
    {
      "name": "Stampede",
      "type": "skl",
      "cost": 2,
      "rarity": "uncommon",
      "note": "At end of turn, play a random Attack from hand vs random enemy. Wild scaling.",
      "description": "At the end of your turn, 1 random Attack in your Hand is played against a random enemy."
    },
    {
      "name": "Stomp",
      "type": "atk",
      "cost": 1,
      "rarity": "uncommon",
      "note": "12 AoE. Costs 1 less per Attack played this turn. Combo finisher.",
      "description": "Deal 12 damage to ALL enemies. Costs 1 less StS2 EnergyIronclad.png for each Attack played this turn."
    },
    {
      "name": "Stone Armor",
      "type": "atk",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Gain 4 Plating. Passive damage reduction scaling.",
      "description": "Gain 4 StS2 Icon Plating.png Plating."
    },
    {
      "name": "Taunt",
      "type": "atk_def",
      "cost": 0,
      "rarity": "uncommon",
      "note": "7 Block + 1 Vulnerable. Upgraded: 2 Vulnerable. Setup card.",
      "description": "Gain 7 StS2 Intent Defend.png Block. Apply 1 StS2 Icon Vulnerable.png Vulnerable."
    },
    {
      "name": "Unrelenting",
      "type": "atk",
      "cost": 1,
      "rarity": "uncommon",
      "note": "12 dmg. Next Attack costs 0. Combo enabler.",
      "description": "Deal 12 damage. The next Attack you play costs 0 StS2 EnergyIronclad.png."
    },
    {
      "name": "Uppercut",
      "type": "atk_def",
      "cost": 2,
      "rarity": "uncommon",
      "note": "13 dmg + Weak + Vulnerable. High utility debuff attack.",
      "description": "Deal 13 damage. Apply 1 StS2 Icon Weak.png Weak. Apply 1 StS2 Icon Vulnerable.png Vulnerable."
    },
    {
      "name": "Vicious",
      "type": "atk_vel",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Draw 1 whenever you apply Vulnerable. Strong with Vulnerable setup.",
      "description": "Whenever you apply StS2 Icon Vulnerable.png Vulnerable, draw 1 card."
    },
    {
      "name": "Whirlwind",
      "type": "atk",
      "cost": "X",
      "rarity": "uncommon",
      "note": "5 AoE dmg X times. Best multi-hit AoE. Scales hard with Strength.",
      "description": "Deal 5 damage to ALL enemies X times."
    },
    {
      "name": "Aggression",
      "type": "skl",
      "cost": 2,
      "rarity": "rare",
      "note": "At turn start, pull a random Upgraded Attack from discard to hand.",
      "description": "At the start of your turn, put a random Attack from your Discard Pile into your Hand and Upgrade it."
    },
    {
      "name": "Barricade",
      "type": "def",
      "cost": 3,
      "rarity": "rare",
      "note": "Block no longer expires. Core Block build.",
      "description": ""
    },
    {
      "name": "Brand",
      "type": "skl_vel",
      "cost": 1,
      "rarity": "rare",
      "note": "Lose 1 HP. Exhaust 1 card. Gain 1 Strength. Bloodletting + Exhaust.",
      "description": "Lose 1 HP. Exhaust 1 card. Gain 1 StS2 Icon Strength.png Strength."
    },
    {
      "name": "Cascade",
      "type": "vel",
      "cost": 1,
      "rarity": "rare",
      "note": "Play top X cards of draw pile. Explosive combo card.",
      "description": "Play the top X cards of your Draw Pile."
    },
    {
      "name": "Colossus",
      "type": "atk_def",
      "cost": 2,
      "rarity": "uncommon",
      "note": "5 Block + take 50% less damage from Vulnerable enemies this turn.",
      "description": "Gain 5 StS2 Intent Defend.png Block. You receive 50% less damage from StS2 Icon Vulnerable.png Vulnerable enemies this turn."
    },
    {
      "name": "Conflagration",
      "type": "atk",
      "cost": 2,
      "rarity": "rare",
      "note": "8 AoE + 2 more per other Attack played this turn. Combo finisher.",
      "description": "Deal 8 damage to ALL enemies. Deals 2 additional damage for each other Attack you've played this turn."
    },
    {
      "name": "Corruption",
      "type": "vel",
      "cost": 3,
      "rarity": "ancient",
      "note": "Skills cost 0 but Exhaust. Core Exhaust build.",
      "description": "Skills cost 0 StS2 EnergyIronclad.png. Whenever you play a Skill, Exhaust it."
    },
    {
      "name": "Crimson Mantle",
      "type": "def",
      "cost": 1,
      "rarity": "rare",
      "note": "Lose 1 HP per turn, gain 8 Block. Bloodletting + Block hybrid.",
      "description": "At the start of your turn, lose 1 HP and gain 8 StS2 Intent Defend.png Block."
    },
    {
      "name": "Cruelty",
      "type": "atk",
      "cost": 1,
      "rarity": "rare",
      "note": "Vulnerable enemies take 25% extra damage. Pairs with Uppercut, Taunt, Tremble, Molten Fist — any Vulnerable applicator turns this into a 25% damage multiplier for the rest of the fight.",
      "description": ""
    },
    {
      "name": "Dark Embrace",
      "type": "vel",
      "cost": 2,
      "rarity": "rare",
      "note": "Draw 1 whenever a card Exhausts. Core Exhaust.",
      "description": "Whenever a card is Exhausted, draw 1 card."
    },
    {
      "name": "Demon Form",
      "type": "skl",
      "cost": 3,
      "rarity": "rare",
      "note": "Gain 2 Strength at turn start. Best passive Strength scaling.",
      "description": "At the start of your turn, gain 2 StS2 Icon Strength.png Strength."
    },
    {
      "name": "Feed",
      "type": "atk_vel",
      "cost": 1,
      "rarity": "rare",
      "note": "10 dmg. If fatal, raise Max HP by 3. Exhaust. Bloodletting sustain.",
      "description": "Deal 10 damage. If Fatal, raise your Max HP by 3. Exhaust."
    },
    {
      "name": "Fiend Fire",
      "type": "atk_vel",
      "cost": 2,
      "rarity": "rare",
      "note": "Exhaust hand. 7 dmg per card Exhausted. Exhaust. Nuke finisher.",
      "description": "Exhaust your Hand. Deal 7 damage for each card Exhausted. Exhaust."
    },
    {
      "name": "Hellraiser",
      "type": "vel",
      "cost": 2,
      "rarity": "rare",
      "note": "Auto-plays drawn Strikes. Core infinite with Pommel Strike — Pommel draws a Strike, which draws another. Never take Battle Trance in this build — it blocks further draw and breaks the loop.",
      "description": "Whenever you draw a card containing “Strike”, it is played against a random enemy."
    },
    {
      "name": "Impervious",
      "type": "def_vel",
      "cost": 2,
      "rarity": "rare",
      "note": "30 Block. Exhaust. Massive panic button.",
      "description": "Gain 30 StS2 Intent Defend.png Block. Exhaust."
    },
    {
      "name": "Juggernaut",
      "type": "skl",
      "cost": 2,
      "rarity": "rare",
      "note": "Whenever you gain Block, deal 5 to random enemy. Pairs with Impervious (30 Block = 30 damage in one card) and Barricade (persistent Block keeps triggering).",
      "description": "Whenever you gain StS2 Intent Defend.png Block, deal 5 damage to a random enemy."
    },
    {
      "name": "Mangle",
      "type": "atk_skl",
      "cost": 2,
      "rarity": "rare",
      "note": "15 dmg. Enemy loses 10 Strength this turn. Debuff attack.",
      "description": "Deal 15 damage. Enemy loses 10 StS2 Icon Strength.png Strength this turn."
    },
    {
      "name": "Not Yet",
      "type": "vel",
      "cost": 2,
      "rarity": "rare",
      "note": "Heal 10 HP. Exhaust. Rare. Gives Ironclad survivability — strong when low on HP.",
      "description": "Heal 10 HP. Exhaust."
    },
    {
      "name": "Offering",
      "type": "vel",
      "cost": 0,
      "rarity": "rare",
      "note": "Lose 6 HP, gain 2 Energy, draw 3. Exhaust. High-value trade.",
      "description": "Lose 6 HP. Gain StS2 EnergyIronclad.pngStS2 EnergyIronclad.png. Draw 3 cards. Exhaust."
    },
    {
      "name": "One-Two Punch",
      "type": "skl",
      "cost": 1,
      "rarity": "rare",
      "note": "Next Attack is played an extra time this turn. Combo enabler.",
      "description": "This turn, your next Attack is played an extra time."
    },
    {
      "name": "Pact's End",
      "type": "atk_vel",
      "cost": 0,
      "rarity": "rare",
      "note": "17 AoE dmg. Needs 3+ Exhaust pile. 0-cost Exhaust finisher.",
      "description": "Can only be played if you have 3 or more cards in your Exhaust Pile. Deal 17 damage to ALL enemies."
    },
    {
      "name": "Primal Force",
      "type": "skl",
      "cost": 2,
      "rarity": "rare",
      "note": "Transform all Attacks in hand into Giant Rocks. Situational nuke.",
      "description": "Transform all Attacks in your Hand into StS2 CardIcon Colorless Attack Token.png Giant Rock."
    },
    {
      "name": "Pyre",
      "type": "skl",
      "cost": 1,
      "rarity": "rare",
      "note": "Gain 1 Energy at start of each turn. Reliable energy engine.",
      "description": "Gain StS2 EnergyIronclad.png at the start of each turn."
    },
    {
      "name": "Stoke",
      "type": "vel",
      "cost": 2,
      "rarity": "rare",
      "note": "Reworked in v0.103. Check in-game for current effect.",
      "description": "Exhaust your Hand. Add 1 random card into your Hand for each card Exhausted."
    },
    {
      "name": "Tear Asunder",
      "type": "atk",
      "cost": 2,
      "rarity": "rare",
      "note": "5 dmg + 1 more per HP lost this combat. Bloodletting finisher.",
      "description": "Deal 5 damage. Hits an additional time for each time you lost HP this combat."
    },
    {
      "name": "Thrash",
      "type": "atk_vel",
      "cost": 0,
      "rarity": "rare",
      "note": "4 dmg twice. Exhaust a random Attack and add its damage. Exhaust synergy.",
      "description": "Deal 4 damage twice. Exhaust a random Attack in your Hand and add its damage to this card."
    },
    {
      "name": "Unmovable",
      "type": "def",
      "cost": 2,
      "rarity": "rare",
      "note": "First Block gained per turn is doubled. Block scaling.",
      "description": "The first time you gain StS2 Intent Defend.png Block from a card each turn, double the amount gained."
    },
    {
      "name": "Tank",
      "type": "atk",
      "cost": 2,
      "rarity": "rare",
      "note": "Take double damage; allies take half. Coop/solo specific.",
      "description": "Take double damage from enemies. Allies take half damage from enemies."
    },
    {
      "name": "Break",
      "type": "atk",
      "cost": 1,
      "rarity": "ancient",
      "note": "20 dmg + 5 Vulnerable. Ancient card.",
      "description": "Deal 20 damage. Apply 5 StS2 Icon Vulnerable.png Vulnerable."
    },
    {
      "name": "Clash",
      "type": "atk",
      "cost": 0,
      "rarity": "event",
      "note": "14 dmg. Only if all hand cards are Attacks. 0-cost high damage.",
      "description": "Can only be played if every card in your Hand is an Attack. Deal 14 damage."
    },
    {
      "name": "Clash+",
      "type": "atk",
      "cost": 0,
      "rarity": "event",
      "note": "Upgraded Clash. 18 dmg. Only if all hand cards are Attacks.",
      "description": "Can only be played if every card in your Hand is an Attack. Deal 18 damage.",
      "isUpgraded": true,
      "baseCard": "Clash"
    },
    {
      "name": "Dual Wield",
      "type": "skl",
      "cost": 1,
      "rarity": "event",
      "note": "Add a copy of an Attack or Power from hand to hand. Duplication.",
      "description": "Choose an Attack or Power card. Add a copy of that card into your Hand."
    },
    {
      "name": "Dual Wield+",
      "type": "skl",
      "cost": 1,
      "rarity": "event",
      "note": "Upgraded Dual Wield. Add 2 copies of an Attack or Power from hand.",
      "description": "Choose an Attack or Power card. Add 2 copies of that card into your Hand.",
      "isUpgraded": true,
      "baseCard": "Dual Wield"
    },
    {
      "name": "Entrench",
      "type": "def_skl",
      "cost": 2,
      "rarity": "event",
      "note": "Double your current Block. Huge with Barricade.",
      "description": "Double your StS2 Intent Defend.png Block."
    },
    {
      "name": "Entrench+",
      "type": "def_skl",
      "cost": 1,
      "rarity": "event",
      "note": "Upgraded Entrench. 1 cost. Double your current Block.",
      "description": "Double your StS2 Intent Defend.png Block.",
      "isUpgraded": true,
      "baseCard": "Entrench"
    },
    {
      "name": "Defend+",
      "type": "def",
      "cost": 1,
      "rarity": "basic",
      "note": "Upgraded version of Defend. Gain 8 StS2 Intent Defend.png Block.",
      "description": "Gain 8 StS2 Intent Defend.png Block.",
      "isUpgraded": true,
      "baseCard": "Defend"
    },
    {
      "name": "Strike+",
      "type": "atk",
      "cost": 1,
      "rarity": "basic",
      "note": "Upgraded version of Strike. Deal 9 damage.",
      "description": "Deal 9 damage.",
      "isUpgraded": true,
      "baseCard": "Strike"
    },
    {
      "name": "Anger+",
      "type": "atk",
      "cost": 0,
      "rarity": "common",
      "note": "Upgraded version of Anger. Deal 8 damage. Add a copy of this card into your Discard Pile.",
      "description": "Deal 8 damage. Add a copy of this card into your Discard Pile.",
      "isUpgraded": true,
      "baseCard": "Anger"
    },
    {
      "name": "Armaments+",
      "type": "def",
      "cost": 1,
      "rarity": "common",
      "note": "Upgraded version of Armaments. Gain 5 StS2 Intent Defend.png Block. Upgrade ALL cards in your Hand.",
      "description": "Gain 5 StS2 Intent Defend.png Block. Upgrade ALL cards in your Hand.",
      "isUpgraded": true,
      "baseCard": "Armaments"
    },
    {
      "name": "Blood Wall+",
      "type": "def",
      "cost": 2,
      "rarity": "common",
      "note": "Upgraded version of Blood Wall. Lose 2 HP. Gain 20 StS2 Intent Defend.png Block.",
      "description": "Lose 2 HP. Gain 20 StS2 Intent Defend.png Block.",
      "isUpgraded": true,
      "baseCard": "Blood Wall"
    },
    {
      "name": "Bloodletting+",
      "type": "skl",
      "cost": 0,
      "rarity": "common",
      "note": "Upgraded version of Bloodletting. Lose 3 HP. Gain StS2 EnergyIronclad.pngStS2 EnergyIronclad.pngStS2 EnergyIronclad.png.",
      "description": "Lose 3 HP. Gain StS2 EnergyIronclad.pngStS2 EnergyIronclad.pngStS2 EnergyIronclad.png.",
      "isUpgraded": true,
      "baseCard": "Bloodletting"
    },
    {
      "name": "Body Slam+",
      "type": "skl",
      "cost": 1,
      "rarity": "common",
      "note": "Upgraded version of Body Slam. Deal damage equal to your StS2 Intent Defend.png Block.",
      "description": "Deal damage equal to your StS2 Intent Defend.png Block.",
      "isUpgraded": true,
      "baseCard": "Body Slam"
    },
    {
      "name": "Breakthrough+",
      "type": "atk",
      "cost": 1,
      "rarity": "common",
      "note": "Upgraded version of Breakthrough. Lose 1 HP. Deal 13 damage to ALL enemies.",
      "description": "Lose 1 HP. Deal 13 damage to ALL enemies.",
      "isUpgraded": true,
      "baseCard": "Breakthrough"
    },
    {
      "name": "Cinder+",
      "type": "atk_vel",
      "cost": 1,
      "rarity": "common",
      "note": "Upgraded version of Cinder. Deal 24 damage. Exhaust a random card in your Hand.",
      "description": "Deal 24 damage. Exhaust a random card in your Hand.",
      "isUpgraded": true,
      "baseCard": "Cinder"
    },
    {
      "name": "Havoc+",
      "type": "vel",
      "cost": 1,
      "rarity": "common",
      "note": "Upgraded version of Havoc. Play the top card of your Draw Pile and Exhaust it.",
      "description": "Play the top card of your Draw Pile and Exhaust it.",
      "isUpgraded": true,
      "baseCard": "Havoc"
    },
    {
      "name": "Headbutt+",
      "type": "atk_vel",
      "cost": 1,
      "rarity": "common",
      "note": "Upgraded version of Headbutt. Deal 12 damage. Put a card from your Discard Pile on top of your Draw Pile.",
      "description": "Deal 12 damage. Put a card from your Discard Pile on top of your Draw Pile.",
      "isUpgraded": true,
      "baseCard": "Headbutt"
    },
    {
      "name": "Iron Wave+",
      "type": "atk_def",
      "cost": 1,
      "rarity": "common",
      "note": "Upgraded version of Iron Wave. Gain 7 StS2 Intent Defend.png Block. Deal 7 damage.",
      "description": "Gain 7 StS2 Intent Defend.png Block. Deal 7 damage.",
      "isUpgraded": true,
      "baseCard": "Iron Wave"
    },
    {
      "name": "Molten Fist+",
      "type": "atk_vel",
      "cost": 1,
      "rarity": "common",
      "note": "Upgraded version of Molten Fist. Deal 14 damage. Double the enemy's StS2 Icon Vulnerable.png Vulnerable. Exhaust.",
      "description": "Deal 14 damage. Double the enemy's StS2 Icon Vulnerable.png Vulnerable. Exhaust.",
      "isUpgraded": true,
      "baseCard": "Molten Fist"
    },
    {
      "name": "Perfected Strike+",
      "type": "atk",
      "cost": 2,
      "rarity": "common",
      "note": "Upgraded version of Perfected Strike. Deal 6 damage. Deals 3 additional damage for ALL your cards containing “Strike”.",
      "description": "Deal 6 damage. Deals 3 additional damage for ALL your cards containing “Strike”.",
      "isUpgraded": true,
      "baseCard": "Perfected Strike"
    },
    {
      "name": "Pommel Strike+",
      "type": "atk_vel",
      "cost": 1,
      "rarity": "common",
      "note": "Upgraded version of Pommel Strike. Deal 10 damage. Draw 2 cards.",
      "description": "Deal 10 damage. Draw 2 cards.",
      "isUpgraded": true,
      "baseCard": "Pommel Strike"
    },
    {
      "name": "Setup Strike+",
      "type": "atk_skl",
      "cost": 1,
      "rarity": "common",
      "note": "Upgraded version of Setup Strike. Deal 9 damage. Gain 3 StS2 Icon Strength.png Strength this turn.",
      "description": "Deal 9 damage. Gain 3 StS2 Icon Strength.png Strength this turn.",
      "isUpgraded": true,
      "baseCard": "Setup Strike"
    },
    {
      "name": "Shrug It Off+",
      "type": "def_vel",
      "cost": 1,
      "rarity": "common",
      "note": "Upgraded version of Shrug It Off. Gain 11 StS2 Intent Defend.png Block. Draw 1 card.",
      "description": "Gain 11 StS2 Intent Defend.png Block. Draw 1 card.",
      "isUpgraded": true,
      "baseCard": "Shrug It Off"
    },
    {
      "name": "Sword Boomerang+",
      "type": "atk",
      "cost": 1,
      "rarity": "common",
      "note": "Upgraded version of Sword Boomerang. Deal 3 damage to a random enemy 4 times.",
      "description": "Deal 3 damage to a random enemy 4 times.",
      "isUpgraded": true,
      "baseCard": "Sword Boomerang"
    },
    {
      "name": "Thunderclap+",
      "type": "atk",
      "cost": 1,
      "rarity": "common",
      "note": "Upgraded version of Thunderclap. Deal 7 damage and apply 1 StS2 Icon Vulnerable.png Vulnerable to ALL enemies.",
      "description": "Deal 7 damage and apply 1 StS2 Icon Vulnerable.png Vulnerable to ALL enemies.",
      "isUpgraded": true,
      "baseCard": "Thunderclap"
    },
    {
      "name": "Tremble+",
      "type": "atk_vel",
      "cost": 0,
      "rarity": "common",
      "note": "Upgraded version of Tremble. Apply 4 StS2 Icon Vulnerable.png Vulnerable. Exhaust",
      "description": "Apply 4 StS2 Icon Vulnerable.png Vulnerable. Exhaust",
      "isUpgraded": true,
      "baseCard": "Tremble"
    },
    {
      "name": "True Grit+",
      "type": "def_vel",
      "cost": 1,
      "rarity": "common",
      "note": "Upgraded version of True Grit. Gain 9 StS2 Intent Defend.png Block. Exhaust 1 card .",
      "description": "Gain 9 StS2 Intent Defend.png Block. Exhaust 1 card .",
      "isUpgraded": true,
      "baseCard": "True Grit"
    },
    {
      "name": "Twin Strike+",
      "type": "atk",
      "cost": 1,
      "rarity": "common",
      "note": "Upgraded version of Twin Strike. Deal 7 damage twice.",
      "description": "Deal 7 damage twice.",
      "isUpgraded": true,
      "baseCard": "Twin Strike"
    },
    {
      "name": "Ashen Strike+",
      "type": "atk_vel",
      "cost": 2,
      "rarity": "uncommon",
      "note": "Upgraded version of Ashen Strike. Deal 6 damage. Deals 4 additional damage for each card in your Exhaust Pile.",
      "description": "Deal 6 damage. Deals 4 additional damage for each card in your Exhaust Pile.",
      "isUpgraded": true,
      "baseCard": "Ashen Strike"
    },
    {
      "name": "Battle Trance+",
      "type": "vel",
      "cost": 0,
      "rarity": "uncommon",
      "note": "Upgraded version of Battle Trance. Draw 4 cards. You cannot draw additional cards this turn.",
      "description": "Draw 4 cards. You cannot draw additional cards this turn.",
      "isUpgraded": true,
      "baseCard": "Battle Trance"
    },
    {
      "name": "Bludgeon+",
      "type": "atk",
      "cost": 3,
      "rarity": "uncommon",
      "note": "Upgraded version of Bludgeon. Deal 42 damage.",
      "description": "Deal 42 damage.",
      "isUpgraded": true,
      "baseCard": "Bludgeon"
    },
    {
      "name": "Bully+",
      "type": "atk",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Upgraded version of Bully. Deal 4 damage. Deals 3 additional damage for each StS2 Icon Vulnerable.png Vulnerable on the enemy.",
      "description": "Deal 4 damage. Deals 3 additional damage for each StS2 Icon Vulnerable.png Vulnerable on the enemy.",
      "isUpgraded": true,
      "baseCard": "Bully"
    },
    {
      "name": "Burning Pact+",
      "type": "vel",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Upgraded version of Burning Pact. Exhaust 1 card. Draw 3 cards.",
      "description": "Exhaust 1 card. Draw 3 cards.",
      "isUpgraded": true,
      "baseCard": "Burning Pact"
    },
    {
      "name": "Colossus+",
      "type": "atk_def",
      "cost": 2,
      "rarity": "uncommon",
      "note": "Upgraded version of Colossus. Gain 8 StS2 Intent Defend.png Block. You receive 50% less damage from StS2 Icon Vulnerable.png Vulnerable enemies this turn.",
      "description": "Gain 8 StS2 Intent Defend.png Block. You receive 50% less damage from StS2 Icon Vulnerable.png Vulnerable enemies this turn.",
      "isUpgraded": true,
      "baseCard": "Colossus"
    },
    {
      "name": "Demonic Shield+",
      "type": "def",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Upgraded version of Demonic Shield. Lose 1 HP. Give another player StS2 Intent Defend.png Block equal to your StS2 Intent Defend.png Block.",
      "description": "Lose 1 HP. Give another player StS2 Intent Defend.png Block equal to your StS2 Intent Defend.png Block.",
      "isUpgraded": true,
      "baseCard": "Demonic Shield"
    },
    {
      "name": "Dismantle+",
      "type": "atk",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Upgraded version of Dismantle. Deal 10 damage. If the enemy is StS2 Icon Vulnerable.png Vulnerable, hits twice.",
      "description": "Deal 10 damage. If the enemy is StS2 Icon Vulnerable.png Vulnerable, hits twice.",
      "isUpgraded": true,
      "baseCard": "Dismantle"
    },
    {
      "name": "Dominate+",
      "type": "atk_skl_vel",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Upgraded version of Dominate. Apply 2 StS2 Icon Vulnerable.png Vulnerable. Gain 1 StS2 Icon Strength.png Strength for each StS2 Icon Vulnerable.png Vulnerable on the enemy. Exhaust.",
      "description": "Apply 2 StS2 Icon Vulnerable.png Vulnerable. Gain 1 StS2 Icon Strength.png Strength for each StS2 Icon Vulnerable.png Vulnerable on the enemy. Exhaust.",
      "isUpgraded": true,
      "baseCard": "Dominate"
    },
    {
      "name": "Drum of Battle+",
      "type": "vel",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Upgraded version of Drum of Battle. Draw 3 cards. At the start of your turn, Exhaust the top card of your Draw Pile.",
      "description": "Draw 3 cards. At the start of your turn, Exhaust the top card of your Draw Pile.",
      "isUpgraded": true,
      "baseCard": "Drum of Battle"
    },
    {
      "name": "Evil Eye+",
      "type": "def_vel",
      "cost": 2,
      "rarity": "uncommon",
      "note": "Upgraded version of Evil Eye. Gain 11 StS2 Intent Defend.png Block. Gain another 11 StS2 Intent Defend.png Block if you have Exhausted a card this turn.",
      "description": "Gain 11 StS2 Intent Defend.png Block. Gain another 11 StS2 Intent Defend.png Block if you have Exhausted a card this turn.",
      "isUpgraded": true,
      "baseCard": "Evil Eye"
    },
    {
      "name": "Expect a Fight+",
      "type": "skl",
      "cost": 0,
      "rarity": "uncommon",
      "note": "Upgraded version of Expect a Fight. Gain StS2 EnergyIronclad.png for each Attack in your Hand. You cannot gain additional StS2 EnergyIronclad.png this turn.",
      "description": "Gain StS2 EnergyIronclad.png for each Attack in your Hand. You cannot gain additional StS2 EnergyIronclad.png this turn.",
      "isUpgraded": true,
      "baseCard": "Expect a Fight"
    },
    {
      "name": "Feel No Pain+",
      "type": "def_vel",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Upgraded version of Feel No Pain. Whenever a card is Exhausted, gain 4 StS2 Intent Defend.png Block.",
      "description": "Whenever a card is Exhausted, gain 4 StS2 Intent Defend.png Block.",
      "isUpgraded": true,
      "baseCard": "Feel No Pain"
    },
    {
      "name": "Fight Me!+",
      "type": "atk_skl",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Upgraded version of Fight Me!. Deal 6 damage twice. Gain 4 StS2 Icon Strength.png Strength. The enemy gains 1 StS2 Icon Strength.png Strength.",
      "description": "Deal 6 damage twice. Gain 4 StS2 Icon Strength.png Strength. The enemy gains 1 StS2 Icon Strength.png Strength.",
      "isUpgraded": true,
      "baseCard": "Fight Me!"
    },
    {
      "name": "Flame Barrier+",
      "type": "def_skl",
      "cost": 2,
      "rarity": "uncommon",
      "note": "Upgraded version of Flame Barrier. Gain 16 StS2 Intent Defend.png Block. Whenever you are attacked this turn, deal 6 damage back.",
      "description": "Gain 16 StS2 Intent Defend.png Block. Whenever you are attacked this turn, deal 6 damage back.",
      "isUpgraded": true,
      "baseCard": "Flame Barrier"
    },
    {
      "name": "Forgotten Ritual+",
      "type": "vel",
      "cost": 0,
      "rarity": "uncommon",
      "note": "Upgraded version of Forgotten Ritual. If you Exhausted a card this turn, gain 4StS2 EnergyIronclad.png. Exhaust.",
      "description": "If you Exhausted a card this turn, gain 4StS2 EnergyIronclad.png. Exhaust.",
      "isUpgraded": true,
      "baseCard": "Forgotten Ritual"
    },
    {
      "name": "Hemokinesis+",
      "type": "atk",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Upgraded version of Hemokinesis. Lose 2 HP. Deal 20 damage.",
      "description": "Lose 2 HP. Deal 20 damage.",
      "isUpgraded": true,
      "baseCard": "Hemokinesis"
    },
    {
      "name": "Howl from Beyond+",
      "type": "atk_vel",
      "cost": 2,
      "rarity": "uncommon",
      "note": "Upgraded version of Howl from Beyond. Deal 21 damage to ALL enemies. At the start of your turn, if this is in your Exhaust Pile, play it.",
      "description": "Deal 21 damage to ALL enemies. At the start of your turn, if this is in your Exhaust Pile, play it.",
      "isUpgraded": true,
      "baseCard": "Howl from Beyond"
    },
    {
      "name": "Infernal Blade+",
      "type": "vel",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Upgraded version of Infernal Blade. Add a random Attack into your Hand. It's free to play this turn. Exhaust.",
      "description": "Add a random Attack into your Hand. It's free to play this turn. Exhaust.",
      "isUpgraded": true,
      "baseCard": "Infernal Blade"
    },
    {
      "name": "Inferno+",
      "type": "skl",
      "cost": 3,
      "rarity": "uncommon",
      "note": "Upgraded version of Inferno. At the start of your turn, lose 1 HP. Whenever you lose HP on your turn, deal 9 damage to ALL enemies.",
      "description": "At the start of your turn, lose 1 HP. Whenever you lose HP on your turn, deal 9 damage to ALL enemies.",
      "isUpgraded": true,
      "baseCard": "Inferno"
    },
    {
      "name": "Inflame+",
      "type": "skl",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Upgraded version of Inflame. Gain 3 StS2 Icon Strength.png Strength.",
      "description": "Gain 3 StS2 Icon Strength.png Strength.",
      "isUpgraded": true,
      "baseCard": "Inflame"
    },
    {
      "name": "Juggling+",
      "type": "vel",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Upgraded version of Juggling. Innate. Add a copy of the third Attack you play each turn into your Hand.",
      "description": "Innate. Add a copy of the third Attack you play each turn into your Hand.",
      "isUpgraded": true,
      "baseCard": "Juggling"
    },
    {
      "name": "Pillage+",
      "type": "atk_vel",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Upgraded version of Pillage. Deal 9 damage. Draw cards until you draw a non-Attack card.",
      "description": "Deal 9 damage. Draw cards until you draw a non-Attack card.",
      "isUpgraded": true,
      "baseCard": "Pillage"
    },
    {
      "name": "Rage+",
      "type": "skl",
      "cost": 0,
      "rarity": "uncommon",
      "note": "Upgraded version of Rage. Whenever you play an Attack this turn, gain 5 StS2 Intent Defend.png Block.",
      "description": "Whenever you play an Attack this turn, gain 5 StS2 Intent Defend.png Block.",
      "isUpgraded": true,
      "baseCard": "Rage"
    },
    {
      "name": "Rampage+",
      "type": "atk",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Upgraded version of Rampage. Deal 9 damage. Increase this card's damage by 9 this combat.",
      "description": "Deal 9 damage. Increase this card's damage by 9 this combat.",
      "isUpgraded": true,
      "baseCard": "Rampage"
    },
    {
      "name": "Rupture+",
      "type": "skl",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Upgraded version of Rupture. Whenever you lose HP on your turn, gain 2 StS2 Icon Strength.png Strength.",
      "description": "Whenever you lose HP on your turn, gain 2 StS2 Icon Strength.png Strength.",
      "isUpgraded": true,
      "baseCard": "Rupture"
    },
    {
      "name": "Second Wind+",
      "type": "def_vel",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Upgraded version of Second Wind. Exhaust all non-Attack cards in your Hand. Gain 7 StS2 Intent Defend.png Block for each card Exhausted.",
      "description": "Exhaust all non-Attack cards in your Hand. Gain 7 StS2 Intent Defend.png Block for each card Exhausted.",
      "isUpgraded": true,
      "baseCard": "Second Wind"
    },
    {
      "name": "Spite+",
      "type": "atk",
      "cost": 0,
      "rarity": "uncommon",
      "note": "Upgraded version of Spite. Deal 5 damage. If you lost HP this turn, hits 3 times.",
      "description": "Deal 5 damage. If you lost HP this turn, hits 3 times.",
      "isUpgraded": true,
      "baseCard": "Spite"
    },
    {
      "name": "Stampede+",
      "type": "skl",
      "cost": 2,
      "rarity": "uncommon",
      "note": "Upgraded version of Stampede. At the end of your turn, 1 random Attack in your Hand is played against a random enemy.",
      "description": "At the end of your turn, 1 random Attack in your Hand is played against a random enemy.",
      "isUpgraded": true,
      "baseCard": "Stampede"
    },
    {
      "name": "Stomp+",
      "type": "atk",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Upgraded version of Stomp. Deal 15 damage to ALL enemies. Costs 1 less StS2 EnergyIronclad.png for each Attack played this turn.",
      "description": "Deal 15 damage to ALL enemies. Costs 1 less StS2 EnergyIronclad.png for each Attack played this turn.",
      "isUpgraded": true,
      "baseCard": "Stomp"
    },
    {
      "name": "Stone Armor+",
      "type": "skl",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Upgraded version of Stone Armor. Gain 6 StS2 Icon Plating.png Plating.",
      "description": "Gain 6 StS2 Icon Plating.png Plating.",
      "isUpgraded": true,
      "baseCard": "Stone Armor"
    },
    {
      "name": "Taunt+",
      "type": "atk_def",
      "cost": 0,
      "rarity": "uncommon",
      "note": "Upgraded version of Taunt. Gain 8 StS2 Intent Defend.png Block. Apply 2 StS2 Icon Vulnerable.png Vulnerable.",
      "description": "Gain 8 StS2 Intent Defend.png Block. Apply 2 StS2 Icon Vulnerable.png Vulnerable.",
      "isUpgraded": true,
      "baseCard": "Taunt"
    },
    {
      "name": "Unrelenting+",
      "type": "atk",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Upgraded version of Unrelenting. Deal 18 damage. The next Attack you play costs 0 StS2 EnergyIronclad.png.",
      "description": "Deal 18 damage. The next Attack you play costs 0 StS2 EnergyIronclad.png.",
      "isUpgraded": true,
      "baseCard": "Unrelenting"
    },
    {
      "name": "Uppercut+",
      "type": "atk_def",
      "cost": 2,
      "rarity": "uncommon",
      "note": "Upgraded version of Uppercut. Deal 13 damage. Apply 2 StS2 Icon Weak.png Weak. Apply 2 StS2 Icon Vulnerable.png Vulnerable.",
      "description": "Deal 13 damage. Apply 2 StS2 Icon Weak.png Weak. Apply 2 StS2 Icon Vulnerable.png Vulnerable.",
      "isUpgraded": true,
      "baseCard": "Uppercut"
    },
    {
      "name": "Vicious+",
      "type": "atk_vel",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Upgraded version of Vicious. Whenever you apply StS2 Icon Vulnerable.png Vulnerable, draw 2 cards.",
      "description": "Whenever you apply StS2 Icon Vulnerable.png Vulnerable, draw 2 cards.",
      "isUpgraded": true,
      "baseCard": "Vicious"
    },
    {
      "name": "Whirlwind+",
      "type": "atk",
      "cost": "X",
      "rarity": "uncommon",
      "note": "Upgraded version of Whirlwind. Deal 8 damage to ALL enemies X times.",
      "description": "Deal 8 damage to ALL enemies X times.",
      "isUpgraded": true,
      "baseCard": "Whirlwind"
    },
    {
      "name": "Aggression+",
      "type": "vel",
      "cost": 2,
      "rarity": "rare",
      "note": "Upgraded version of Aggression. Innate. At the start of your turn, put a random Attack from your Discard Pile into your Hand and Upgrade it.",
      "description": "Innate. At the start of your turn, put a random Attack from your Discard Pile into your Hand and Upgrade it.",
      "isUpgraded": true,
      "baseCard": "Aggression"
    },
    {
      "name": "Barricade+",
      "type": "skl",
      "cost": 3,
      "rarity": "rare",
      "note": "Upgraded version of Barricade. ",
      "description": "",
      "isUpgraded": true,
      "baseCard": "Barricade"
    },
    {
      "name": "Brand+",
      "type": "skl_vel",
      "cost": 1,
      "rarity": "rare",
      "note": "Upgraded version of Brand. Lose 1 HP. Exhaust 1 card. Gain 2 StS2 Icon Strength.png Strength.",
      "description": "Lose 1 HP. Exhaust 1 card. Gain 2 StS2 Icon Strength.png Strength.",
      "isUpgraded": true,
      "baseCard": "Brand"
    },
    {
      "name": "Cascade+",
      "type": "vel",
      "cost": 1,
      "rarity": "rare",
      "note": "Upgraded version of Cascade. Play the top X+1 cards of your Draw Pile.",
      "description": "Play the top X+1 cards of your Draw Pile.",
      "isUpgraded": true,
      "baseCard": "Cascade"
    },
    {
      "name": "Conflagration+",
      "type": "atk",
      "cost": 2,
      "rarity": "rare",
      "note": "Upgraded version of Conflagration. Deal 9 damage to ALL enemies. Deals 3 additional damage for each other Attack you've played this turn.",
      "description": "Deal 9 damage to ALL enemies. Deals 3 additional damage for each other Attack you've played this turn.",
      "isUpgraded": true,
      "baseCard": "Conflagration"
    },
    {
      "name": "Crimson Mantle+",
      "type": "def",
      "cost": 1,
      "rarity": "rare",
      "note": "Upgraded version of Crimson Mantle. At the start of your turn, lose 1 HP and gain 10 StS2 Intent Defend.png Block.",
      "description": "At the start of your turn, lose 1 HP and gain 10 StS2 Intent Defend.png Block.",
      "isUpgraded": true,
      "baseCard": "Crimson Mantle"
    },
    {
      "name": "Cruelty+",
      "type": "skl",
      "cost": 1,
      "rarity": "rare",
      "note": "Upgraded version of Cruelty. ",
      "description": "",
      "isUpgraded": true,
      "baseCard": "Cruelty"
    },
    {
      "name": "Dark Embrace+",
      "type": "vel",
      "cost": 2,
      "rarity": "rare",
      "note": "Upgraded version of Dark Embrace. Whenever a card is Exhausted, draw 1 card.",
      "description": "Whenever a card is Exhausted, draw 1 card.",
      "isUpgraded": true,
      "baseCard": "Dark Embrace"
    },
    {
      "name": "Demon Form+",
      "type": "skl",
      "cost": 3,
      "rarity": "rare",
      "note": "Upgraded version of Demon Form. At the start of your turn, gain 3 StS2 Icon Strength.png Strength.",
      "description": "At the start of your turn, gain 3 StS2 Icon Strength.png Strength.",
      "isUpgraded": true,
      "baseCard": "Demon Form"
    },
    {
      "name": "Feed+",
      "type": "atk_vel",
      "cost": 1,
      "rarity": "rare",
      "note": "Upgraded version of Feed. Deal 12 damage. If Fatal, raise your Max HP by 4. Exhaust.",
      "description": "Deal 12 damage. If Fatal, raise your Max HP by 4. Exhaust.",
      "isUpgraded": true,
      "baseCard": "Feed"
    },
    {
      "name": "Fiend Fire+",
      "type": "atk_vel",
      "cost": 2,
      "rarity": "rare",
      "note": "Upgraded version of Fiend Fire. Exhaust your Hand. Deal 10 damage for each card Exhausted. Exhaust.",
      "description": "Exhaust your Hand. Deal 10 damage for each card Exhausted. Exhaust.",
      "isUpgraded": true,
      "baseCard": "Fiend Fire"
    },
    {
      "name": "Hellraiser+",
      "type": "vel",
      "cost": 2,
      "rarity": "rare",
      "note": "Upgraded version of Hellraiser. Whenever you draw a card containing “Strike”, it is played against a random enemy.",
      "description": "Whenever you draw a card containing “Strike”, it is played against a random enemy.",
      "isUpgraded": true,
      "baseCard": "Hellraiser"
    },
    {
      "name": "Impervious+",
      "type": "def_vel",
      "cost": 2,
      "rarity": "rare",
      "note": "Upgraded version of Impervious. Gain 40 StS2 Intent Defend.png Block. Exhaust.",
      "description": "Gain 40 StS2 Intent Defend.png Block. Exhaust.",
      "isUpgraded": true,
      "baseCard": "Impervious"
    },
    {
      "name": "Juggernaut+",
      "type": "skl",
      "cost": 2,
      "rarity": "rare",
      "note": "Upgraded version of Juggernaut. Whenever you gain StS2 Intent Defend.png Block, deal 7 damage to a random enemy.",
      "description": "Whenever you gain StS2 Intent Defend.png Block, deal 7 damage to a random enemy.",
      "isUpgraded": true,
      "baseCard": "Juggernaut"
    },
    {
      "name": "Mangle+",
      "type": "atk_skl",
      "cost": 2,
      "rarity": "rare",
      "note": "Upgraded version of Mangle. Deal 20 damage. Enemy loses 15 StS2 Icon Strength.png Strength this turn.",
      "description": "Deal 20 damage. Enemy loses 15 StS2 Icon Strength.png Strength this turn.",
      "isUpgraded": true,
      "baseCard": "Mangle"
    },
    {
      "name": "Not Yet+",
      "type": "vel",
      "cost": 2,
      "rarity": "rare",
      "note": "Upgraded version of Not Yet. Heal 13 HP. Exhaust.",
      "description": "Heal 13 HP. Exhaust.",
      "isUpgraded": true,
      "baseCard": "Not Yet"
    },
    {
      "name": "Offering+",
      "type": "vel",
      "cost": 0,
      "rarity": "rare",
      "note": "Upgraded version of Offering. Lose 6 HP. Gain StS2 EnergyIronclad.pngStS2 EnergyIronclad.png. Draw 5 cards. Exhaust.",
      "description": "Lose 6 HP. Gain StS2 EnergyIronclad.pngStS2 EnergyIronclad.png. Draw 5 cards. Exhaust.",
      "isUpgraded": true,
      "baseCard": "Offering"
    },
    {
      "name": "One-Two Punch+",
      "type": "skl",
      "cost": 1,
      "rarity": "rare",
      "note": "Upgraded version of One-Two Punch. This turn, your next 2 Attacks are played an extra time.",
      "description": "This turn, your next 2 Attacks are played an extra time.",
      "isUpgraded": true,
      "baseCard": "One-Two Punch"
    },
    {
      "name": "Pact's End+",
      "type": "atk_vel",
      "cost": 0,
      "rarity": "rare",
      "note": "Upgraded version of Pact's End. Can only be played if you have 3 or more cards in your Exhaust Pile. Deal 23 damage to ALL enemies.",
      "description": "Can only be played if you have 3 or more cards in your Exhaust Pile. Deal 23 damage to ALL enemies.",
      "isUpgraded": true,
      "baseCard": "Pact's End"
    },
    {
      "name": "Primal Force+",
      "type": "skl",
      "cost": 2,
      "rarity": "rare",
      "note": "Upgraded version of Primal Force. Transform all Attacks in your Hand into StS2 CardIcon Colorless Attack Token.png Giant Rock+.",
      "description": "Transform all Attacks in your Hand into StS2 CardIcon Colorless Attack Token.png Giant Rock+.",
      "isUpgraded": true,
      "baseCard": "Primal Force"
    },
    {
      "name": "Pyre+",
      "type": "skl",
      "cost": 1,
      "rarity": "rare",
      "note": "Upgraded version of Pyre. Gain StS2 EnergyIronclad.pngStS2 EnergyIronclad.png at the start of each turn.",
      "description": "Gain StS2 EnergyIronclad.pngStS2 EnergyIronclad.png at the start of each turn.",
      "isUpgraded": true,
      "baseCard": "Pyre"
    },
    {
      "name": "Stoke+",
      "type": "vel",
      "cost": 2,
      "rarity": "rare",
      "note": "Upgraded version of Stoke. Exhaust your Hand. Add 1 random Upgraded card into your Hand for each card Exhausted.",
      "description": "Exhaust your Hand. Add 1 random Upgraded card into your Hand for each card Exhausted.",
      "isUpgraded": true,
      "baseCard": "Stoke"
    },
    {
      "name": "Tank+",
      "type": "atk",
      "cost": 2,
      "rarity": "rare",
      "note": "Upgraded version of Tank. Take double damage from enemies. Allies take half damage from enemies.",
      "description": "Take double damage from enemies. Allies take half damage from enemies.",
      "isUpgraded": true,
      "baseCard": "Tank"
    },
    {
      "name": "Tear Asunder+",
      "type": "atk",
      "cost": 2,
      "rarity": "rare",
      "note": "Upgraded version of Tear Asunder. Deal 7 damage. Hits an additional time for each time you lost HP this combat.",
      "description": "Deal 7 damage. Hits an additional time for each time you lost HP this combat.",
      "isUpgraded": true,
      "baseCard": "Tear Asunder"
    },
    {
      "name": "Thrash+",
      "type": "atk_vel",
      "cost": 0,
      "rarity": "rare",
      "note": "Upgraded version of Thrash. Deal 6 damage twice. Exhaust a random Attack in your Hand and add its damage to this card.",
      "description": "Deal 6 damage twice. Exhaust a random Attack in your Hand and add its damage to this card.",
      "isUpgraded": true,
      "baseCard": "Thrash"
    },
    {
      "name": "Unmovable+",
      "type": "def",
      "cost": 2,
      "rarity": "rare",
      "note": "Upgraded version of Unmovable. The first time you gain StS2 Intent Defend.png Block from a card each turn, double the amount gained.",
      "description": "The first time you gain StS2 Intent Defend.png Block from a card each turn, double the amount gained.",
      "isUpgraded": true,
      "baseCard": "Unmovable"
    },
    {
      "name": "Break+",
      "type": "atk",
      "cost": 1,
      "rarity": "ancient",
      "note": "Upgraded version of Break. Deal 30 damage. Apply 7 StS2 Icon Vulnerable.png Vulnerable.",
      "description": "Deal 30 damage. Apply 7 StS2 Icon Vulnerable.png Vulnerable.",
      "isUpgraded": true,
      "baseCard": "Break"
    },
    {
      "name": "Corruption+",
      "type": "vel",
      "cost": 3,
      "rarity": "ancient",
      "note": "Upgraded version of Corruption. Skills cost 0 StS2 EnergyIronclad.png. Whenever you play a Skill, Exhaust it.",
      "description": "Skills cost 0 StS2 EnergyIronclad.png. Whenever you play a Skill, Exhaust it.",
      "isUpgraded": true,
      "baseCard": "Corruption"
    },
    {
      "name": "Tank+",
      "type": "atk",
      "cost": 2,
      "rarity": "rare",
      "note": "Upgraded version of Tank. Take double damage from enemies. Allies take half damage from enemies.",
      "description": "Take double damage from enemies. Allies take half damage from enemies.",
      "isUpgraded": true,
      "baseCard": "Tank"
    }
  ];
