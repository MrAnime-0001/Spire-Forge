const COLORLESS_CARDS = [
{
      "name": "Automation",
      "type": "vel",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Every 10 cards drawn, gain 1 Energy. Passive energy scaling.",
      "description": "Every 10 cards you draw, gain StS2 EnergyColorless.png."
    },
{
      "name": "Believe in You",
      "type": "skl",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Another player gains 3 Energy. Coop card.",
      "description": "Another player gains StS2 EnergyColorless.pngStS2 EnergyColorless.png."
    },
{
      "name": "Catastrophe",
      "type": "vel",
      "cost": 2,
      "rarity": "uncommon",
      "note": "Play 2 random draw pile cards. Chaotic but powerful.",
      "description": "Play 2 random cards from your Draw Pile."
    },
{
      "name": "Coordinate",
      "type": "skl",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Give another player 5 Strength this turn. Coop strength.",
      "description": "Give another player 5 StS2 Icon Strength.png Strength this turn."
    },
{
      "name": "Dark Shackles",
      "type": "skl_vel",
      "cost": 0,
      "rarity": "uncommon",
      "note": "Enemy loses 9 Strength this turn. Exhaust. 0-cost strong debuff.",
      "description": "Enemy loses 9 StS2 Icon Strength.png Strength this turn. Exhaust."
    },
{
      "name": "Discovery",
      "type": "vel",
      "cost": 0,
      "rarity": "uncommon",
      "note": "Choose 1 of 3 random cards for hand. 0-cost this turn. Exhaust. Card selection.",
      "description": "Choose 1 of 3 random cards to add into your Hand. It's free to play this turn. Exhaust."
    },
{
      "name": "Dramatic Entrance",
      "type": "atk_vel",
      "cost": 0,
      "rarity": "uncommon",
      "note": "Innate. 11 AoE dmg. Exhaust. Guaranteed opener.",
      "description": "Innate. Deal 11 damage to ALL enemies. Exhaust."
    },
{
      "name": "Equilibrium",
      "type": "def_vel",
      "cost": 2,
      "rarity": "uncommon",
      "note": "13 Block + Retain hand this turn. Block + hand preservation.",
      "description": "Gain 13 StS2 Intent Defend.png Block. Retain your Hand this turn."
    },
{
      "name": "Fasten",
      "type": "def",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Defend cards give 5 extra Block. Passive block scaling.",
      "description": "Gain an additional 5 StS2 Intent Defend.png Block from Defend cards."
    },
{
      "name": "Finesse",
      "type": "def_vel",
      "cost": 0,
      "rarity": "uncommon",
      "note": "4 Block + draw 1. 0-cost block + draw.",
      "description": "Gain 4 StS2 Intent Defend.png Block. Draw 1 card."
    },
{
      "name": "Fisticuffs",
      "type": "atk_def",
      "cost": 1,
      "rarity": "uncommon",
      "note": "7 dmg + gain Block equal to damage dealt. Balanced dual card.",
      "description": "Deal 7 damage. Gain StS2 Intent Defend.png Block equal to damage dealt."
    },
{
      "name": "Flash of Steel",
      "type": "atk_vel",
      "cost": 0,
      "rarity": "uncommon",
      "note": "5 dmg + draw 1. 0-cost attack + cycle.",
      "description": "Deal 5 damage. Draw 1 card."
    },
{
      "name": "Gang Up",
      "type": "atk",
      "cost": 1,
      "rarity": "uncommon",
      "note": "5 dmg + 5 more per other player attack this turn. Coop damage.",
      "description": "Deal 5 damage. Deals 5 additional damage for each time another player has attacked the enemy this turn."
    },
{
      "name": "Huddle Up",
      "type": "vel",
      "cost": 1,
      "rarity": "uncommon",
      "note": "All allies draw 2 cards. Coop draw.",
      "description": "ALL allies draw 2 cards."
    },
{
      "name": "Impatience",
      "type": "vel",
      "cost": 0,
      "rarity": "uncommon",
      "note": "If no Attacks in hand, draw 2. 0-cost conditional draw.",
      "description": "If you have no Attacks in your Hand, draw 2 cards."
    },
{
      "name": "Intercept",
      "type": "def",
      "cost": 1,
      "rarity": "uncommon",
      "note": "9 Block + redirect all enemy attacks to you this turn. Tank card.",
      "description": "Gain 9 StS2 Intent Defend.png Block. Redirect all incoming attacks that would be dealt to another player this turn to you."
    },
{
      "name": "Jack of All Trades",
      "type": "vel",
      "cost": 0,
      "rarity": "uncommon",
      "note": "Add 1 random Colorless to hand. Exhaust.",
      "description": "Add 1 random Colorless card into your Hand. Exhaust."
    },
{
      "name": "Lift",
      "type": "def",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Give another player 11 Block. Coop defense.",
      "description": "Give another player 11 StS2 Intent Defend.png Block."
    },
{
      "name": "Mind Blast",
      "type": "skl_vel",
      "cost": 2,
      "rarity": "uncommon",
      "note": "Innate. Deal dmg equal to draw pile size. Unique scaling.",
      "description": "Innate. Deal damage equal to the number of cards in your Draw Pile."
    },
{
      "name": "Omnislice",
      "type": "atk",
      "cost": 1,
      "rarity": "uncommon",
      "note": "8 dmg + deal same to all other enemies. Multi-target.",
      "description": "Deal 8 damage. Damage ALL other enemies equal to the damage dealt."
    },
{
      "name": "Panache",
      "type": "atk",
      "cost": 0,
      "rarity": "uncommon",
      "note": "Every 5 cards per turn, deal 10 AoE. Spam synergy.",
      "description": "Every time you play 5 cards in a single turn, deal 10 damage to ALL enemies."
    },
{
      "name": "Panic Button",
      "type": "def_vel",
      "cost": 0,
      "rarity": "uncommon",
      "note": "30 Block. Cannot gain Block from cards 2 turns. Exhaust. Emergency block.",
      "description": "Gain 30 StS2 Intent Defend.png Block. You cannot gain StS2 Intent Defend.png Block from cards for 2 turns. Exhaust."
    },
{
      "name": "Prep Time",
      "type": "atk",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Gain 4 Vigor at turn start. Passive damage boost.",
      "description": "At the start of your turn, gain 4 StS2 Icon Vigor.png Vigor."
    },
{
      "name": "Production",
      "type": "vel",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Gain 2 Energy. Exhaust. Energy burst.",
      "description": "Gain StS2 EnergyColorless.pngStS2 EnergyColorless.png. Exhaust."
    },
{
      "name": "Prolong",
      "type": "def_vel",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Next turn gain Block equal to current Block. Exhaust. Block doubler.",
      "description": "Next turn, gain StS2 Intent Defend.png Block equal to your current StS2 Intent Defend.png Block. Exhaust."
    },
{
      "name": "Prowess",
      "type": "def_skl",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Gain 1 Strength + 1 Dexterity. Balanced scaling.",
      "description": "Gain 1 StS2 Icon Strength.png Strength. Gain 1 StS2 Icon Dexterity.png Dexterity."
    },
{
      "name": "Purity",
      "type": "vel",
      "cost": 0,
      "rarity": "uncommon",
      "note": "Retain. Exhaust up to 3 hand cards. Exhaust. Deck thinning tool.",
      "description": "Retain. Exhaust up to 3 cards in your Hand. Exhaust."
    },
{
      "name": "Restlessness",
      "type": "vel",
      "cost": 0,
      "rarity": "uncommon",
      "note": "Retain. If hand empty, draw 2 + gain 2 Energy. 0-cost payoff.",
      "description": "Retain. If your Hand is empty, draw 2 cards and gain StS2 EnergyColorless.pngStS2 EnergyColorless.png."
    },
{
      "name": "Seeker Strike",
      "type": "atk_vel",
      "cost": 1,
      "rarity": "uncommon",
      "note": "6 dmg + choose 1 of 3 draw pile cards to hand. Targeted draw.",
      "description": "Deal 9 damage. Choose 1 of 3 cards in your Draw Pile to add into your Hand."
    },
{
      "name": "Shockwave",
      "type": "atk_def_vel",
      "cost": 2,
      "rarity": "uncommon",
      "note": "3 Weak + 3 Vulnerable to all. Exhaust. AoE debuff.",
      "description": "Apply 3 StS2 Icon Weak.png Weak and StS2 Icon Vulnerable.png Vulnerable to ALL enemies. Exhaust."
    },
{
      "name": "Splash",
      "type": "skl",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Add a random free Attack from another character to hand. Cross-char enabler.",
      "description": "Choose 1 of 3 random Attacks from another character to add into your Hand. It's free to play this turn."
    },
{
      "name": "Stratagem",
      "type": "vel",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Whenever you shuffle, choose a draw pile card to hand. Hand filter.",
      "description": "Whenever you shuffle your Draw Pile, choose a card from it to put into your Hand."
    },
{
      "name": "Tag Team",
      "type": "atk",
      "cost": 2,
      "rarity": "uncommon",
      "note": "11 dmg. Next other player attack plays extra time. Coop.",
      "description": "Deal 11 damage. The next Attack another player plays on the enemy is played an extra time."
    },
{
      "name": "The Bomb",
      "type": "atk",
      "cost": 2,
      "rarity": "uncommon",
      "note": "Deal 40 AoE after 3 turns. Delayed nuke.",
      "description": "At the end of 3 turns, deal 40 damage to ALL enemies."
    },
{
      "name": "Thinking Ahead",
      "type": "vel",
      "cost": 0,
      "rarity": "uncommon",
      "note": "Draw 2 + return 1 to draw top. Exhaust. Filtered cycle.",
      "description": "Draw 2 cards. Put 1 card from your Hand on top of your Draw Pile. Exhaust."
    },
{
      "name": "Thrumming Hatchet",
      "type": "atk",
      "cost": 2,
      "rarity": "uncommon",
      "note": "11 dmg. Returns to hand next turn. Recurring attack.",
      "description": "Deal 11 damage. At the start of your next turn, return this to your Hand."
    },
{
      "name": "Ultimate Defend",
      "type": "def",
      "cost": 2,
      "rarity": "uncommon",
      "note": "11 Block. Clean high block.",
      "description": "Gain 11 StS2 Intent Defend.png Block."
    },
{
      "name": "Ultimate Strike",
      "type": "atk",
      "cost": 2,
      "rarity": "uncommon",
      "note": "14 dmg. Clean high damage.",
      "description": "Deal 14 damage."
    },
{
      "name": "Volley",
      "type": "atk",
      "cost": "X",
      "rarity": "uncommon",
      "note": "10 dmg to random enemy X times. Energy-scaling.",
      "description": "Deal 10 damage to a random enemy X times."
    },
{
      "name": "Alchemize",
      "type": "vel",
      "cost": 1,
      "rarity": "rare",
      "note": "Procure a random potion. Exhaust. Potion generator.",
      "description": "Procure a random potion. Exhaust."
    },
{
      "name": "Anointed",
      "type": "vel",
      "cost": 3,
      "rarity": "rare",
      "note": "Put all Rares from draw to hand. Exhaust. Rare tutor.",
      "description": "Put every Rare card from your Draw Pile into your Hand. Exhaust."
    },
{
      "name": "Beacon of Hope",
      "type": "skl",
      "cost": 2,
      "rarity": "rare",
      "note": "When you gain Block, other players gain half. Coop block engine.",
      "description": "Whenever you gain StS2 Intent Defend.png Block on your turn, other players gain half that much StS2 Intent Defend.png Block."
    },
{
      "name": "Beat Down",
      "type": "skl",
      "cost": 2,
      "rarity": "rare",
      "note": "Play 3 random Attacks from discard. Attack retrieval.",
      "description": "Play 3 random Attacks from your Discard Pile."
    },
{
      "name": "Bolas",
      "type": "atk",
      "cost": 1,
      "rarity": "rare",
      "note": "3 dmg. Returns to hand next turn start. Sticky attack.",
      "description": "Deal 3 damage. At the start of your next turn, return this to your Hand."
    },
{
      "name": "Calamity",
      "type": "skl",
      "cost": 3,
      "rarity": "rare",
      "note": "Whenever you play an Attack, add random Attack to hand. Attack flood.",
      "description": "Whenever you play an Attack, add a random Attack into your Hand."
    },
{
      "name": "Entropy",
      "type": "skl",
      "cost": 1,
      "rarity": "rare",
      "note": "Transform 1 hand card at turn start. Chaotic modifier.",
      "description": "At the start of your turn, Transform 1 card in your Hand."
    },
{
      "name": "Eternal Armor",
      "type": "atk",
      "cost": 2,
      "rarity": "rare",
      "note": "Gain 7 Plating. Passive damage reduction.",
      "description": "Gain 9 StS2 Icon Plating.png Plating."
    },
{
      "name": "Gold Axe",
      "type": "skl",
      "cost": 1,
      "rarity": "rare",
      "note": "Dmg equal to cards played this combat. Scales over long fights.",
      "description": "Deal damage equal to the number of cards played this combat."
    },
{
      "name": "Hand of Greed",
      "type": "atk",
      "cost": 2,
      "rarity": "rare",
      "note": "20 dmg. If fatal, gain 20 Gold. Gold payoff.",
      "description": "Deal 20 damage. If Fatal, gain 20 StS2 Gold.png Gold."
    },
{
      "name": "Hidden Gem",
      "type": "vel",
      "cost": 0,
      "rarity": "rare",
      "note": "A random draw pile card gains Replay 2. Unique modifier.",
      "description": "A random card in your Draw Pile without Replay gains Replay 2."
    },
{
      "name": "Jackpot",
      "type": "atk",
      "cost": 3,
      "rarity": "rare",
      "note": "25 dmg + add 3 random 0-cost cards to hand. Spam enabler.",
      "description": "Deal 25 damage. Add 3 random 0 StS2 EnergyColorless.png cards into your Hand."
    },
{
      "name": "Knockdown",
      "type": "atk",
      "cost": 2,
      "rarity": "rare",
      "note": "10 dmg. Enemy takes double dmg from other players. Coop setup.",
      "description": "Deal 10 damage. The enemy takes double damage from other players this turn."
    },
{
      "name": "Master of Strategy",
      "type": "vel",
      "cost": 0,
      "rarity": "rare",
      "note": "Draw 3. Exhaust. 0-cost draw burst.",
      "description": "Draw 3 cards. Exhaust."
    },
{
      "name": "Mayhem",
      "type": "vel",
      "cost": 5,
      "rarity": "rare",
      "note": "At turn start, play top draw pile card. Unpredictable scaling.",
      "description": "At the start of your turn, play the top card of your Draw Pile."
    },
{
      "name": "Mimic",
      "type": "def_vel",
      "cost": 1,
      "rarity": "rare",
      "note": "Gain Block equal to another player's Block. Exhaust. Coop block.",
      "description": "Gain StS2 Intent Defend.png Block equal to the StS2 Intent Defend.png Block on another player. Exhaust."
    },
{
      "name": "Nostalgia",
      "type": "vel",
      "cost": 1,
      "rarity": "rare",
      "note": "First Attack or Skill each turn goes back on draw top. Recurring.",
      "description": "The first Attack or Skill you play each turn is placed on top of your Draw Pile."
    },
{
      "name": "Rally",
      "type": "def",
      "cost": 1,
      "rarity": "rare",
      "note": "All players gain 12 Block. Coop AoE block.",
      "description": "ALL players gain 12 StS2 Intent Defend.png Block."
    },
{
      "name": "Rend",
      "type": "atk",
      "cost": 2,
      "rarity": "rare",
      "note": "15 dmg + 5 more per unique debuff on enemy. Debuff payoff.",
      "description": "Deal 15 damage. Deals 5 additional damage for each unique debuff on the enemy."
    },
{
      "name": "Rolling Boulder",
      "type": "atk",
      "cost": 2,
      "rarity": "rare",
      "note": "Deal 5 AoE per turn, increasing by 5 each turn. Scaling passive.",
      "description": "At the start of your turn, deal 5 damage to ALL enemies and increase this damage by 5."
    },
{
      "name": "Salvo",
      "type": "atk_vel",
      "cost": 2,
      "rarity": "rare",
      "note": "12 dmg + Retain hand this turn. Attack + hand preservation.",
      "description": "Deal 12 damage. Retain your Hand this turn."
    },
{
      "name": "Scrawl",
      "type": "vel",
      "cost": 0,
      "rarity": "rare",
      "note": "Draw until hand full. Exhaust. Hand fill.",
      "description": "Draw cards until your Hand is full. Exhaust."
    },
{
      "name": "Secret Technique",
      "type": "vel",
      "cost": 0,
      "rarity": "rare",
      "note": "Put a Skill from draw to hand. Exhaust. Skill tutor.",
      "description": "Put a Skill from your Draw Pile into your Hand. Exhaust."
    },
{
      "name": "Secret Weapon",
      "type": "vel",
      "cost": 0,
      "rarity": "rare",
      "note": "Put an Attack from draw to hand. Exhaust. Attack tutor.",
      "description": "Put an Attack from your Draw Pile into your Hand. Exhaust."
    },
{
      "name": "The Gambit",
      "type": "atk_def",
      "cost": 1,
      "rarity": "rare",
      "note": "50 Block. If you take unblocked dmg, die. Extreme all-in block.",
      "description": "Gain 50 StS2 Intent Defend.png Block. If you take unblocked attack damage this combat, die."
    },
{
      "name": "Apotheosis",
      "type": "vel",
      "cost": 2,
      "rarity": "ancient",
      "note": "Innate. Upgrade all cards. Exhaust. Ancient. Massive upgrade burst.",
      "description": "Innate. Upgrade ALL your cards. Exhaust."
    },
{
      "name": "Apparition",
      "type": "def_vel",
      "cost": 1,
      "rarity": "ancient",
      "note": "Ethereal. Gain 1 Intangible. Exhaust. Ancient. Temporary invulnerability.",
      "description": "Ethereal. Gain 1 StS2 Icon Intangible.png Intangible. Exhaust."
    },
{
      "name": "Brightest Flame",
      "type": "vel",
      "cost": 0,
      "rarity": "ancient",
      "note": "Gain 2 Energy + draw 2. Lose 1 Max HP. Ancient. Burst turn.",
      "description": "Gain StS2 EnergyColorless.pngStS2 EnergyColorless.png. Draw 2 cards. Lose 1 Max HP."
    },
{
      "name": "Maul",
      "type": "atk",
      "cost": 2,
      "rarity": "ancient",
      "note": "5 dmg twice. All Maul cards gain +1 dmg each play. Ancient. Scaling.",
      "description": "Deal 5 damage twice. Increase the damage of ALL Maul cards by 1 this combat."
    },
{
      "name": "Neow's Fury",
      "type": "atk_vel",
      "cost": 1,
      "rarity": "ancient",
      "note": "10 dmg + retrieve 2 random discard cards. Exhaust. Ancient.",
      "description": "Deal 10 damage. Put 2 random cards from your Discard Pile into your Hand. Exhaust."
    },
{
      "name": "Relax",
      "type": "def_vel",
      "cost": 0,
      "rarity": "ancient",
      "note": "15 Block. Next turn draw 2 + 2 Energy. Exhaust. Ancient. Huge tempo.",
      "description": "Gain 15 StS2 Intent Defend.png Block. Next turn, draw 2 cards and gain StS2 EnergyColorless.pngStS2 EnergyColorless.png. Exhaust."
    },
{
      "name": "Whistle",
      "type": "atk",
      "cost": 2,
      "rarity": "ancient",
      "note": "33 dmg + Stun enemy. Exhaust. Ancient. Stun finisher.",
      "description": "Deal 33 damage."
    },
{
      "name": "Wish",
      "type": "vel",
      "cost": 0,
      "rarity": "ancient",
      "note": "Put any card from draw to hand. Exhaust. Ancient. Universal tutor.",
      "description": "Put a card from your Draw Pile into your Hand. Exhaust."
    },
{
      "name": "Shiv",
      "type": "atk_vel",
      "cost": 0,
      "rarity": "token",
      "note": "Token. 4 dmg. Exhaust. Generated by Silent Shiv cards.",
      "description": "Deal 4 damage. Exhaust."
    },
{
      "name": "Soul",
      "type": "vel",
      "cost": 0,
      "rarity": "token",
      "note": "Token. Draw 2 cards. Exhaust. Generated by Necrobinder.",
      "description": "Draw 2 cards. Exhaust."
    },
{
      "name": "Sovereign Blade",
      "type": "atk_vel",
      "cost": 1,
      "rarity": "token",
      "note": "Token. Retain. 10 dmg. Core Regent attack.",
      "description": "Retain. Deal 10 damage."
    },
{
      "name": "Sweeping Gaze",
      "type": "atk_vel",
      "cost": 0,
      "rarity": "token",
      "note": "Token. Ethereal. Osty deals 10 dmg. Exhaust. Necrobinder token.",
      "description": "Ethereal. Osty deals 10 damage to a random enemy. Exhaust."
    },
{
      "name": "Giant Rock",
      "type": "atk",
      "cost": 1,
      "rarity": "token",
      "note": "Token. 16 dmg. Exhaust. Produced by Regent Primal Force.",
      "description": "Deal 16 damage."
    },
{
      "name": "Minion Dive Bomb",
      "type": "atk_vel",
      "cost": 1,
      "rarity": "token",
      "note": "Token. 13 dmg. Exhaust. Regent minion card.",
      "description": "Deal 13 damage. Exhaust."
    },
{
      "name": "Minion Strike",
      "type": "atk_vel",
      "cost": 1,
      "rarity": "token",
      "note": "Token. 7 dmg + draw 1. Exhaust. Regent minion card.",
      "description": "Deal 6 damage. Draw 1 card. Exhaust."
    },
{
      "name": "Minion Sacrifice",
      "type": "def_vel",
      "cost": 0,
      "rarity": "token",
      "note": "Token. 9 Block. Exhaust. Regent minion card.",
      "description": "Gain 9 StS2 Intent Defend.png Block. Exhaust."
    },
{
      "name": "Fuel",
      "type": "vel",
      "cost": 0,
      "rarity": "token",
      "note": "Token. Gain 1 Energy + draw 1. Exhaust. Defect status synergy.",
      "description": "Gain StS2 EnergyColorless.png. Draw 1 card. Exhaust."
    },
{
      "name": "Luminesce",
      "type": "vel",
      "cost": 0,
      "rarity": "token",
      "note": "Token. Retain. Gain 2 Energy. Exhaust. Regent token.",
      "description": "Retain. Gain StS2 EnergyColorless.pngStS2 EnergyColorless.png. Exhaust."
    },
{
      "name": "Byrd Swoop",
      "type": "atk",
      "cost": 1,
      "rarity": "common",
      "note": "Event. 14 dmg. From Byrd event encounter.",
      "description": "Deal 14 damage."
    },
{
      "name": "Enlightenment",
      "type": "vel",
      "cost": 0,
      "rarity": "common",
      "note": "Event. Reduce all hand card costs to 1 this turn. Exhaust.",
      "description": "Reduce the cost of ALL cards in your Hand to 1 this turn. Exhaust."
    },
{
      "name": "Exterminate",
      "type": "atk",
      "cost": 1,
      "rarity": "common",
      "note": "Event. 3 dmg x4 to all enemies. AoE event card.",
      "description": "Deal 3 damage 4 times to ALL enemies."
    },
{
      "name": "Feeding Frenzy",
      "type": "skl",
      "cost": 0,
      "rarity": "common",
      "note": "Event. Gain 5 Strength this turn. Burst Strength.",
      "description": "Gain 5 StS2 Icon Strength.png Strength this turn."
    },
{
      "name": "Mad Science",
      "type": "skl",
      "cost": 1,
      "rarity": "common",
      "note": "Event. Customizable card from Tinker Time event.",
      "description": "This card can be created and customized at the event Tinker Time."
    },
{
      "name": "Mad Science+",
      "type": "skl",
      "cost": 1,
      "rarity": "common",
      "note": "Upgraded Mad Science. Innate. Customizable card from Tinker Time event.",
      "description": "Innate. This card can be created and customized at the event Tinker Time.",
      "isUpgraded": true,
      "baseCard": "Mad Science"
    },
{
      "name": "Metamorphosis",
      "type": "vel",
      "cost": 2,
      "rarity": "common",
      "note": "Event. Add 3 random free Attacks to draw pile. Exhaust.",
      "description": "Add 3 random Attacks into your Draw Pile. They're free to play this combat. Exhaust."
    },
{
      "name": "Peck",
      "type": "atk",
      "cost": 0,
      "rarity": "common",
      "note": "Event. 2 dmg 3 times. Byrd event card.",
      "description": "Deal 2 damage 3 times."
    },
{
      "name": "Squash",
      "type": "atk",
      "cost": 1,
      "rarity": "common",
      "note": "Event. 10 dmg + 2 Vulnerable. Event encounter card.",
      "description": "Deal 10 damage. Apply 2 StS2 Icon Vulnerable.png Vulnerable."
    },
{
      "name": "Toric Toughness",
      "type": "def",
      "cost": 1,
      "rarity": "common",
      "note": "Event. 5 Block now + 5 Block next 2 turn starts. Sustained block.",
      "description": "Gain 5 StS2 Intent Defend.png Block. Gain 5 StS2 Intent Defend.png Block at the start of the next 2 turns."
    },
{
      "name": "Beckon",
      "type": "skl",
      "cost": 0,
      "rarity": "common",
      "note": "Status. Lose 6 HP at turn end if in hand. Harmful.",
      "description": "At the end of your turn, if this is in your Hand, lose 6 HP. This card cannot be Upgraded. Beta Art"
    },
{
      "name": "Burn",
      "type": "atk",
      "cost": 0,
      "rarity": "common",
      "note": "Status. Take 2 dmg at turn end if in hand. Unplayable.",
      "description": "Unplayable. At the end of your turn, if this is in your Hand, take 2 damage. This card cannot be Upgraded. Beta Art"
    },
{
      "name": "Dazed",
      "type": "vel",
      "cost": 0,
      "rarity": "common",
      "note": "Status. Unplayable. Ethereal. Clogs your hand.",
      "description": "Unplayable. Ethereal. This card cannot be Upgraded. Beta Art"
    },
{
      "name": "Debris",
      "type": "vel",
      "cost": 0,
      "rarity": "common",
      "note": "Status. Exhaust when played. From Regent Crash Landing.",
      "description": "Exhaust. This card cannot be Upgraded. Beta Art"
    },
{
      "name": "Disintegration",
      "type": "atk",
      "cost": 0,
      "rarity": "common",
      "note": "Status. Take 6 dmg at turn end. Very harmful.",
      "description": "At the end of your turn, take 6 damage. This card cannot be Upgraded. Beta Art"
    },
{
      "name": "Frantic Escape",
      "type": "skl",
      "cost": 0,
      "rarity": "common",
      "note": "Status. Sandpit mechanic. Cost increases each play.",
      "description": "Get farther away. Increase StS2 Icon Sandpit.png Sandpit by 1. Increase the cost of this card by 1. This card cannot be Upgraded. Beta Art"
    },
{
      "name": "Infection",
      "type": "atk",
      "cost": 0,
      "rarity": "common",
      "note": "Status. Take 3 dmg at turn end if in hand. Unplayable.",
      "description": "Unplayable. At the end of your turn, if this is in your Hand, take 3 damage. This card cannot be Upgraded. Beta Art"
    },
{
      "name": "Mind Rot",
      "type": "vel",
      "cost": 0,
      "rarity": "common",
      "note": "Status. Draw 1 fewer card per turn. Persistent debuff.",
      "description": "Draw 1 fewer card each turn. This card cannot be Upgraded. Beta Art"
    },
{
      "name": "Slimed",
      "type": "vel",
      "cost": 0,
      "rarity": "common",
      "note": "Status. Draw 1 + Exhaust. From Defect Gunk Up.",
      "description": "Draw 1 card. Exhaust. This card cannot be Upgraded. Beta Art"
    },
{
      "name": "Sloth",
      "type": "skl",
      "cost": 0,
      "rarity": "common",
      "note": "Status. Play max 3 cards per turn. Crippling.",
      "description": "You cannot play more than 3 cards each turn. This card cannot be Upgraded. Beta Art"
    },
{
      "name": "Soot",
      "type": "vel",
      "cost": 0,
      "rarity": "common",
      "note": "Status. Unplayable. Clogs draw pile.",
      "description": "Unplayable. This card cannot be Upgraded. Beta Art"
    },
{
      "name": "Toxic",
      "type": "atk_vel",
      "cost": 0,
      "rarity": "common",
      "note": "Status. Take 5 dmg at turn end if in hand. Exhaust.",
      "description": "At the end of your turn, if this is in your Hand, take 5 damage. Exhaust. This card cannot be Upgraded. Beta Art"
    },
{
      "name": "Void",
      "type": "vel",
      "cost": 0,
      "rarity": "common",
      "note": "Status. Unplayable. Ethereal. Lose 1 Energy when drawn.",
      "description": "Unplayable. Ethereal. Whenever you draw this card, lose StS2 EnergyColorless.png. This card cannot be Upgraded. Beta Art"
    },
{
      "name": "Waste Away",
      "type": "skl",
      "cost": 0,
      "rarity": "common",
      "note": "Status. Gain 1 less Energy per turn. Devastating.",
      "description": "Gain 1 less StS2 EnergyColorless.png per turn. This card cannot be Upgraded. Beta Art"
    },
{
      "name": "Wound",
      "type": "vel",
      "cost": 0,
      "rarity": "common",
      "note": "Status. Unplayable. Dead draw.",
      "description": "Unplayable. This card cannot be Upgraded. Beta Art"
    },
{
      "name": "Ascender's Bane",
      "type": "vel",
      "cost": 0,
      "rarity": "common",
      "note": "Curse. Unplayable. Ethereal. Eternal. Always in deck.",
      "description": "Unplayable. Ethereal. Eternal. This card cannot be Upgraded. Beta Art"
    },
{
      "name": "Bad Luck",
      "type": "skl",
      "cost": 0,
      "rarity": "common",
      "note": "Curse. Lose 13 HP at turn end if in hand. Eternal. Very harmful.",
      "description": "Unplayable. At the end of your turn, if this is in your Hand, lose 13 HP. Eternal. This card cannot be Upgraded. Beta Art"
    },
{
      "name": "Clumsy",
      "type": "vel",
      "cost": 0,
      "rarity": "common",
      "note": "Curse. Unplayable. Ethereal. Dead draw.",
      "description": "Unplayable. Ethereal. This card cannot be Upgraded. Beta Art"
    },
{
      "name": "Curse of the Bell",
      "type": "skl",
      "cost": 0,
      "rarity": "common",
      "note": "Curse. Unplayable. Eternal. Permanent deck clogger.",
      "description": "Unplayable. Eternal. This card cannot be Upgraded. Beta Art"
    },
{
      "name": "Debt",
      "type": "skl",
      "cost": 0,
      "rarity": "common",
      "note": "Curse. Lose 10 Gold at turn end if in hand.",
      "description": "Unplayable. At the end of your turn, if this is in your Hand, lose 10 StS2 Gold.png Gold. This card cannot be Upgraded. Beta Art"
    },
{
      "name": "Decay",
      "type": "atk",
      "cost": 0,
      "rarity": "common",
      "note": "Curse. Take 2 dmg at turn end if in hand.",
      "description": "Unplayable. At the end of your turn, if this is in your Hand, take 2 damage. This card cannot be Upgraded. Beta Art"
    },
{
      "name": "Doubt",
      "type": "def",
      "cost": 0,
      "rarity": "common",
      "note": "Curse. Gain 1 Weak at turn end if in hand.",
      "description": "Unplayable. At the end of your turn, if this is in your Hand, gain 1 StS2 Icon Weak.png Weak. This card cannot be Upgraded. Beta Art"
    },
{
      "name": "Enthralled",
      "type": "skl",
      "cost": 0,
      "rarity": "common",
      "note": "Curse. Must be played before other cards. Eternal.",
      "description": "If this is in your Hand, it must be played before other cards. Eternal. This card cannot be Upgraded. Beta Art"
    },
{
      "name": "Folly",
      "type": "vel",
      "cost": 0,
      "rarity": "common",
      "note": "Curse. Unplayable. Innate. Eternal. Always in opening hand.",
      "description": "Unplayable. Ethereal. Innate. Eternal. This card cannot be Upgraded. Beta Art"
    },
{
      "name": "Greed",
      "type": "vel",
      "cost": 0,
      "rarity": "common",
      "note": "Curse. Unplayable. Eternal. Dead draw forever.",
      "description": "Unplayable. Eternal. This card cannot be Upgraded. Beta Art"
    },
{
      "name": "Guilty",
      "type": "skl",
      "cost": 0,
      "rarity": "common",
      "note": "Curse. Unplayable. Removes itself after 5 combats.",
      "description": "Unplayable. Removed from your Deck after 5 combats. This card cannot be Upgraded. Beta Art"
    },
{
      "name": "Injury",
      "type": "vel",
      "cost": 0,
      "rarity": "common",
      "note": "Curse. Unplayable. Dead draw.",
      "description": "Unplayable. This card cannot be Upgraded. Beta Art"
    },
{
      "name": "Normality",
      "type": "skl",
      "cost": 0,
      "rarity": "common",
      "note": "Curse. Play max 3 cards this turn. Crippling.",
      "description": "Unplayable. You cannot play more than 3 cards this turn. This card cannot be Upgraded. Beta Art"
    },
{
      "name": "Poor Sleep",
      "type": "vel",
      "cost": 0,
      "rarity": "common",
      "note": "Curse. Unplayable. Retain. Stays in hand.",
      "description": "Unplayable. Retain. This card cannot be Upgraded. Beta Art"
    },
{
      "name": "Regret",
      "type": "skl",
      "cost": 0,
      "rarity": "common",
      "note": "Curse. Lose 1 HP per hand card at turn end if held.",
      "description": "Unplayable. At the end of your turn, if this is in your Hand, lose 1 HP for each card in your Hand. This card cannot be Upgraded. Beta Art"
    },
{
      "name": "Shame",
      "type": "skl",
      "cost": 0,
      "rarity": "common",
      "note": "Curse. Gain 1 Frail at turn end if in hand.",
      "description": "Unplayable. At the end of your turn, if this is in your Hand, gain 1 StS2 Icon Frail.png Frail. This card cannot be Upgraded. Beta Art"
    },
{
      "name": "Spore Mind",
      "type": "vel",
      "cost": 0,
      "rarity": "common",
      "note": "Curse. Exhaust when played.",
      "description": "Exhaust. This card cannot be Upgraded. Beta Art"
    },
{
      "name": "Writhe",
      "type": "vel",
      "cost": 0,
      "rarity": "common",
      "note": "Curse. Unplayable. Innate. Eternal. Always in opening hand.",
      "description": "Unplayable. Innate. This card cannot be Upgraded. Beta Art"
    },
{
      "name": "Byrdonis Egg",
      "type": "skl",
      "cost": 0,
      "rarity": "common",
      "note": "Quest. Unplayable. Hatch at a Rest Site for reward.",
      "description": "Unplayable. Can be hatched at a Rest Site. This card cannot be Upgraded. Beta Art"
    },
{
      "name": "Lantern Key",
      "type": "skl",
      "cost": 0,
      "rarity": "common",
      "note": "Quest. Unplayable. Unlocks a special event next act.",
      "description": "Unplayable. Unlocks a special event in the next Act. This card cannot be Upgraded. Beta Art"
    },
{
      "name": "Spoils Map",
      "type": "skl",
      "cost": 0,
      "rarity": "common",
      "note": "Quest. Unplayable. Marks a site of 600 extra Gold next act.",
      "description": "Unplayable. Marks a site of 600 extra StS2 Gold.png Gold in the next Act. This card cannot be Upgraded. Beta Art"
    },
{
      "name": "Clash+",
      "type": "atk",
      "cost": 1,
      "rarity": "event",
      "note": "Can only be played if every card in your Hand is an Attack. Deal 18 damage.",
      "description": "Can only be played if every card in your Hand is an Attack. Deal 18 damage.",
      "isUpgraded": true,
      "baseCard": "Clash"
    },
{
      "name": "Dual Wield+",
      "type": "skl",
      "cost": 1,
      "rarity": "event",
      "note": "Choose an Attack or Power card. Add 2 copies of that card into your Hand.",
      "description": "Choose an Attack or Power card. Add 2 copies of that card into your Hand.",
      "isUpgraded": true,
      "baseCard": "Dual Wield"
    },
{
      "name": "Entrench+",
      "type": "def",
      "cost": 1,
      "rarity": "event",
      "note": "Double your StS2 Intent Defend.png Block.",
      "description": "Double your StS2 Intent Defend.png Block.",
      "isUpgraded": true,
      "baseCard": "Entrench"
    },
{
      "name": "Caltrops+",
      "type": "atk",
      "cost": 1,
      "rarity": "event",
      "note": "Whenever you are attacked, deal 5 damage back.",
      "description": "Whenever you are attacked, deal 5 damage back.",
      "isUpgraded": true,
      "baseCard": "Caltrops"
    },
{
      "name": "Distraction+",
      "type": "vel",
      "cost": 1,
      "rarity": "event",
      "note": "Add a random Skill into your Hand. It's free to play this turn. Exhaust.",
      "description": "Add a random Skill into your Hand. It's free to play this turn. Exhaust.",
      "isUpgraded": true,
      "baseCard": "Distraction"
    },
{
      "name": "Outmaneuver+",
      "type": "skl",
      "cost": 1,
      "rarity": "event",
      "note": "Next turn, gain StS2 EnergySilent.pngStS2 EnergySilent.pngStS2 EnergySilent.png.",
      "description": "Next turn, gain StS2 EnergySilent.pngStS2 EnergySilent.pngStS2 EnergySilent.png.",
      "isUpgraded": true,
      "baseCard": "Outmaneuver"
    },
{
      "name": "Hello World+",
      "type": "vel",
      "cost": 1,
      "rarity": "event",
      "note": "Innate. At the start of your turn, add a random Common card into your Hand.",
      "description": "Innate. At the start of your turn, add a random Common card into your Hand.",
      "isUpgraded": true,
      "baseCard": "Hello World"
    },
{
      "name": "Rebound+",
      "type": "atk_vel",
      "cost": 1,
      "rarity": "event",
      "note": "Deal 12 damage. Put the next card you play this turn on top of your Draw Pile.",
      "description": "Deal 12 damage. Put the next card you play this turn on top of your Draw Pile.",
      "isUpgraded": true,
      "baseCard": "Rebound"
    },
{
      "name": "Rip and Tear+",
      "type": "atk",
      "cost": 1,
      "rarity": "event",
      "note": "Deal 9 damage to a random enemy twice.",
      "description": "Deal 9 damage to a random enemy twice.",
      "isUpgraded": true,
      "baseCard": "Rip and Tear"
    },
{
      "name": "Stack+",
      "type": "def",
      "cost": 1,
      "rarity": "event",
      "note": "Gain StS2 Intent Defend.png Block equal to the number of cards in your Discard Pile +3.",
      "description": "Gain StS2 Intent Defend.png Block equal to the number of cards in your Discard Pile +3.",
      "isUpgraded": true,
      "baseCard": "Stack"
    },
{
      "name": "Automation+",
      "type": "vel",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Upgraded version of Automation. Every 10 cards you draw, gain StS2 EnergyColorless.png.",
      "description": "Every 10 cards you draw, gain StS2 EnergyColorless.png.",
      "isUpgraded": true,
      "baseCard": "Automation"
    },
{
      "name": "Believe in You+",
      "type": "skl",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Upgraded version of Believe in You. Another player gains StS2 EnergyColorless.pngStS2 EnergyColorless.pngStS2 EnergyColorless.png.",
      "description": "Another player gains StS2 EnergyColorless.pngStS2 EnergyColorless.pngStS2 EnergyColorless.png.",
      "isUpgraded": true,
      "baseCard": "Believe in You"
    },
{
      "name": "Catastrophe+",
      "type": "vel",
      "cost": 2,
      "rarity": "uncommon",
      "note": "Upgraded version of Catastrophe. Play 3 random cards from your Draw Pile.",
      "description": "Play 3 random cards from your Draw Pile.",
      "isUpgraded": true,
      "baseCard": "Catastrophe"
    },
{
      "name": "Coordinate+",
      "type": "skl",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Upgraded version of Coordinate. Give another player 8 StS2 Icon Strength.png Strength this turn.",
      "description": "Give another player 8 StS2 Icon Strength.png Strength this turn.",
      "isUpgraded": true,
      "baseCard": "Coordinate"
    },
{
      "name": "Dark Shackles+",
      "type": "skl_vel",
      "cost": 0,
      "rarity": "uncommon",
      "note": "Upgraded version of Dark Shackles. Enemy loses 15 StS2 Icon Strength.png Strength this turn. Exhaust.",
      "description": "Enemy loses 15 StS2 Icon Strength.png Strength this turn. Exhaust.",
      "isUpgraded": true,
      "baseCard": "Dark Shackles"
    },
{
      "name": "Discovery+",
      "type": "skl",
      "cost": 0,
      "rarity": "uncommon",
      "note": "Upgraded version of Discovery. Choose 1 of 3 random cards to add into your Hand. It's free to play this turn.",
      "description": "Choose 1 of 3 random cards to add into your Hand. It's free to play this turn.",
      "isUpgraded": true,
      "baseCard": "Discovery"
    },
{
      "name": "Dramatic Entrance+",
      "type": "atk_vel",
      "cost": 0,
      "rarity": "uncommon",
      "note": "Upgraded version of Dramatic Entrance. Innate. Deal 15 damage to ALL enemies. Exhaust.",
      "description": "Innate. Deal 15 damage to ALL enemies. Exhaust.",
      "isUpgraded": true,
      "baseCard": "Dramatic Entrance"
    },
{
      "name": "Equilibrium+",
      "type": "def_vel",
      "cost": 2,
      "rarity": "uncommon",
      "note": "Upgraded version of Equilibrium. Gain 16 StS2 Intent Defend.png Block. Retain your Hand this turn.",
      "description": "Gain 16 StS2 Intent Defend.png Block. Retain your Hand this turn.",
      "isUpgraded": true,
      "baseCard": "Equilibrium"
    },
{
      "name": "Fasten+",
      "type": "def",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Upgraded version of Fasten. Gain an additional 7 StS2 Intent Defend.png Block from Defend cards.",
      "description": "Gain an additional 7 StS2 Intent Defend.png Block from Defend cards.",
      "isUpgraded": true,
      "baseCard": "Fasten"
    },
{
      "name": "Finesse+",
      "type": "def_vel",
      "cost": 0,
      "rarity": "uncommon",
      "note": "Upgraded version of Finesse. Gain 7 StS2 Intent Defend.png Block. Draw 1 card.",
      "description": "Gain 7 StS2 Intent Defend.png Block. Draw 1 card.",
      "isUpgraded": true,
      "baseCard": "Finesse"
    },
{
      "name": "Fisticuffs+",
      "type": "atk_def",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Upgraded version of Fisticuffs. Deal 9 damage. Gain StS2 Intent Defend.png Block equal to damage dealt.",
      "description": "Deal 9 damage. Gain StS2 Intent Defend.png Block equal to damage dealt.",
      "isUpgraded": true,
      "baseCard": "Fisticuffs"
    },
{
      "name": "Flash of Steel+",
      "type": "atk_vel",
      "cost": 0,
      "rarity": "uncommon",
      "note": "Upgraded version of Flash of Steel. Deal 8 damage. Draw 1 card.",
      "description": "Deal 8 damage. Draw 1 card.",
      "isUpgraded": true,
      "baseCard": "Flash of Steel"
    },
{
      "name": "Gang Up+",
      "type": "atk",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Upgraded version of Gang Up. Deal 5 damage. Deals 7 additional damage for each time another player has attacked the enemy this turn.",
      "description": "Deal 5 damage. Deals 7 additional damage for each time another player has attacked the enemy this turn.",
      "isUpgraded": true,
      "baseCard": "Gang Up"
    },
{
      "name": "Huddle Up+",
      "type": "vel",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Upgraded version of Huddle Up. ALL allies draw 3 cards.",
      "description": "ALL allies draw 3 cards.",
      "isUpgraded": true,
      "baseCard": "Huddle Up"
    },
{
      "name": "Impatience+",
      "type": "vel",
      "cost": 0,
      "rarity": "uncommon",
      "note": "Upgraded version of Impatience. If you have no Attacks in your Hand, draw 3 cards.",
      "description": "If you have no Attacks in your Hand, draw 3 cards.",
      "isUpgraded": true,
      "baseCard": "Impatience"
    },
{
      "name": "Intercept+",
      "type": "def",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Upgraded version of Intercept. Gain 13 StS2 Intent Defend.png Block. Redirect all incoming attacks that would be dealt to another player this turn to you.",
      "description": "Gain 13 StS2 Intent Defend.png Block. Redirect all incoming attacks that would be dealt to another player this turn to you.",
      "isUpgraded": true,
      "baseCard": "Intercept"
    },
{
      "name": "Jack of All Trades+",
      "type": "vel",
      "cost": 0,
      "rarity": "uncommon",
      "note": "Upgraded version of Jack of All Trades. Add 2 random Colorless cards into your Hand. Exhaust.",
      "description": "Add 2 random Colorless cards into your Hand. Exhaust.",
      "isUpgraded": true,
      "baseCard": "Jack of All Trades"
    },
{
      "name": "Lift+",
      "type": "def",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Upgraded version of Lift. Give another player 16 StS2 Intent Defend.png Block.",
      "description": "Give another player 16 StS2 Intent Defend.png Block.",
      "isUpgraded": true,
      "baseCard": "Lift"
    },
{
      "name": "Mind Blast+",
      "type": "skl_vel",
      "cost": 2,
      "rarity": "uncommon",
      "note": "Upgraded version of Mind Blast. Innate. Deal damage equal to the number of cards in your Draw Pile.",
      "description": "Innate. Deal damage equal to the number of cards in your Draw Pile.",
      "isUpgraded": true,
      "baseCard": "Mind Blast"
    },
{
      "name": "Omnislice+",
      "type": "atk",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Upgraded version of Omnislice. Deal 11 damage. Damage ALL other enemies equal to the damage dealt.",
      "description": "Deal 11 damage. Damage ALL other enemies equal to the damage dealt.",
      "isUpgraded": true,
      "baseCard": "Omnislice"
    },
{
      "name": "Panache+",
      "type": "atk",
      "cost": 0,
      "rarity": "uncommon",
      "note": "Upgraded version of Panache. Every time you play 5 cards in a single turn, deal 14 damage to ALL enemies.",
      "description": "Every time you play 5 cards in a single turn, deal 14 damage to ALL enemies.",
      "isUpgraded": true,
      "baseCard": "Panache"
    },
{
      "name": "Panic Button+",
      "type": "def_vel",
      "cost": 0,
      "rarity": "uncommon",
      "note": "Upgraded version of Panic Button. Gain 40 StS2 Intent Defend.png Block. You cannot gain StS2 Intent Defend.png Block from cards for 2 turns. Exhaust.",
      "description": "Gain 40 StS2 Intent Defend.png Block. You cannot gain StS2 Intent Defend.png Block from cards for 2 turns. Exhaust.",
      "isUpgraded": true,
      "baseCard": "Panic Button"
    },
{
      "name": "Prep Time+",
      "type": "atk",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Upgraded version of Prep Time. At the start of your turn, gain 6 StS2 Icon Vigor.png Vigor.",
      "description": "At the start of your turn, gain 6 StS2 Icon Vigor.png Vigor.",
      "isUpgraded": true,
      "baseCard": "Prep Time"
    },
{
      "name": "Production+",
      "type": "vel",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Upgraded version of Production. Gain StS2 EnergyColorless.pngStS2 EnergyColorless.pngStS2 EnergyColorless.png. Exhaust.",
      "description": "Gain StS2 EnergyColorless.pngStS2 EnergyColorless.pngStS2 EnergyColorless.png. Exhaust.",
      "isUpgraded": true,
      "baseCard": "Production"
    },
{
      "name": "Prolong+",
      "type": "def",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Upgraded version of Prolong. Next turn, gain StS2 Intent Defend.png Block equal to your current StS2 Intent Defend.png Block.",
      "description": "Next turn, gain StS2 Intent Defend.png Block equal to your current StS2 Intent Defend.png Block.",
      "isUpgraded": true,
      "baseCard": "Prolong"
    },
{
      "name": "Prowess+",
      "type": "def_skl",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Upgraded version of Prowess. Gain 2 StS2 Icon Strength.png Strength. Gain 2 StS2 Icon Dexterity.png Dexterity.",
      "description": "Gain 2 StS2 Icon Strength.png Strength. Gain 2 StS2 Icon Dexterity.png Dexterity.",
      "isUpgraded": true,
      "baseCard": "Prowess"
    },
{
      "name": "Purity+",
      "type": "vel",
      "cost": 0,
      "rarity": "uncommon",
      "note": "Upgraded version of Purity. Retain. Exhaust up to 5 cards in your Hand. Exhaust.",
      "description": "Retain. Exhaust up to 5 cards in your Hand. Exhaust.",
      "isUpgraded": true,
      "baseCard": "Purity"
    },
{
      "name": "Restlessness+",
      "type": "vel",
      "cost": 0,
      "rarity": "uncommon",
      "note": "Upgraded version of Restlessness. Retain. If your Hand is empty, draw 3 cards and gain StS2 EnergyColorless.pngStS2 EnergyColorless.pngStS2 EnergyColorless.png.",
      "description": "Retain. If your Hand is empty, draw 3 cards and gain StS2 EnergyColorless.pngStS2 EnergyColorless.pngStS2 EnergyColorless.png.",
      "isUpgraded": true,
      "baseCard": "Restlessness"
    },
{
      "name": "Seeker Strike+",
      "type": "atk_vel",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Upgraded version of Seeker Strike. Deal 12 damage. Choose 1 of 3 cards in your Draw Pile to add into your Hand.",
      "description": "Deal 12 damage. Choose 1 of 3 cards in your Draw Pile to add into your Hand.",
      "isUpgraded": true,
      "baseCard": "Seeker Strike"
    },
{
      "name": "Shockwave+",
      "type": "atk_def_vel",
      "cost": 2,
      "rarity": "uncommon",
      "note": "Upgraded version of Shockwave. Apply 5 StS2 Icon Weak.png Weak and StS2 Icon Vulnerable.png Vulnerable to ALL enemies. Exhaust.",
      "description": "Apply 5 StS2 Icon Weak.png Weak and StS2 Icon Vulnerable.png Vulnerable to ALL enemies. Exhaust.",
      "isUpgraded": true,
      "baseCard": "Shockwave"
    },
{
      "name": "Splash+",
      "type": "skl",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Upgraded version of Splash. Choose 1 of 3 random Upgraded Attacks from another character to add into your Hand. It's free to play this turn.",
      "description": "Choose 1 of 3 random Upgraded Attacks from another character to add into your Hand. It's free to play this turn.",
      "isUpgraded": true,
      "baseCard": "Splash"
    },
{
      "name": "Stratagem+",
      "type": "vel",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Upgraded version of Stratagem. Whenever you shuffle your Draw Pile, choose a card from it to put into your Hand.",
      "description": "Whenever you shuffle your Draw Pile, choose a card from it to put into your Hand.",
      "isUpgraded": true,
      "baseCard": "Stratagem"
    },
{
      "name": "Tag Team+",
      "type": "atk",
      "cost": 2,
      "rarity": "uncommon",
      "note": "Upgraded version of Tag Team. Deal 15 damage. The next Attack another player plays on the enemy is played an extra time.",
      "description": "Deal 15 damage. The next Attack another player plays on the enemy is played an extra time.",
      "isUpgraded": true,
      "baseCard": "Tag Team"
    },
{
      "name": "The Bomb+",
      "type": "atk",
      "cost": 2,
      "rarity": "uncommon",
      "note": "Upgraded version of The Bomb. At the end of 3 turns, deal 50 damage to ALL enemies.",
      "description": "At the end of 3 turns, deal 50 damage to ALL enemies.",
      "isUpgraded": true,
      "baseCard": "The Bomb"
    },
{
      "name": "Thinking Ahead+",
      "type": "vel",
      "cost": 0,
      "rarity": "uncommon",
      "note": "Upgraded version of Thinking Ahead. Draw 2 cards. Put 1 card from your Hand on top of your Draw Pile.",
      "description": "Draw 2 cards. Put 1 card from your Hand on top of your Draw Pile.",
      "isUpgraded": true,
      "baseCard": "Thinking Ahead"
    },
{
      "name": "Thrumming Hatchet+",
      "type": "atk",
      "cost": 2,
      "rarity": "uncommon",
      "note": "Upgraded version of Thrumming Hatchet. Deal 14 damage. At the start of your next turn, return this to your Hand.",
      "description": "Deal 14 damage. At the start of your next turn, return this to your Hand.",
      "isUpgraded": true,
      "baseCard": "Thrumming Hatchet"
    },
{
      "name": "Ultimate Defend+",
      "type": "def",
      "cost": 2,
      "rarity": "uncommon",
      "note": "Upgraded version of Ultimate Defend. Gain 15 StS2 Intent Defend.png Block.",
      "description": "Gain 15 StS2 Intent Defend.png Block.",
      "isUpgraded": true,
      "baseCard": "Ultimate Defend"
    },
{
      "name": "Ultimate Strike+",
      "type": "atk",
      "cost": 2,
      "rarity": "uncommon",
      "note": "Upgraded version of Ultimate Strike. Deal 20 damage.",
      "description": "Deal 20 damage.",
      "isUpgraded": true,
      "baseCard": "Ultimate Strike"
    },
{
      "name": "Volley+",
      "type": "atk",
      "cost": "X",
      "rarity": "uncommon",
      "note": "Upgraded version of Volley. Deal 14 damage to a random enemy X times.",
      "description": "Deal 14 damage to a random enemy X times.",
      "isUpgraded": true,
      "baseCard": "Volley"
    },
{
      "name": "Alchemize+",
      "type": "vel",
      "cost": 1,
      "rarity": "rare",
      "note": "Upgraded version of Alchemize. Procure a random potion. Exhaust.",
      "description": "Procure a random potion. Exhaust.",
      "isUpgraded": true,
      "baseCard": "Alchemize"
    },
{
      "name": "Anointed+",
      "type": "vel",
      "cost": 3,
      "rarity": "rare",
      "note": "Upgraded version of Anointed. Retain. Put every Rare card from your Draw Pile into your Hand. Exhaust.",
      "description": "Retain. Put every Rare card from your Draw Pile into your Hand. Exhaust.",
      "isUpgraded": true,
      "baseCard": "Anointed"
    },
{
      "name": "Beacon of Hope+",
      "type": "skl_vel",
      "cost": 2,
      "rarity": "rare",
      "note": "Upgraded version of Beacon of Hope. Innate. Whenever you gain StS2 Intent Defend.png Block on your turn, other players gain half that much StS2 Intent Defend.png Block.",
      "description": "Innate. Whenever you gain StS2 Intent Defend.png Block on your turn, other players gain half that much StS2 Intent Defend.png Block.",
      "isUpgraded": true,
      "baseCard": "Beacon of Hope"
    },
{
      "name": "Beat Down+",
      "type": "skl",
      "cost": 2,
      "rarity": "rare",
      "note": "Upgraded version of Beat Down. Play 4 random Attacks from your Discard Pile.",
      "description": "Play 4 random Attacks from your Discard Pile.",
      "isUpgraded": true,
      "baseCard": "Beat Down"
    },
{
      "name": "Bolas+",
      "type": "atk",
      "cost": 1,
      "rarity": "rare",
      "note": "Upgraded version of Bolas. Deal 4 damage. At the start of your next turn, return this to your Hand.",
      "description": "Deal 4 damage. At the start of your next turn, return this to your Hand.",
      "isUpgraded": true,
      "baseCard": "Bolas"
    },
{
      "name": "Calamity+",
      "type": "skl",
      "cost": 3,
      "rarity": "rare",
      "note": "Upgraded version of Calamity. Whenever you play an Attack, add a random Attack into your Hand.",
      "description": "Whenever you play an Attack, add a random Attack into your Hand.",
      "isUpgraded": true,
      "baseCard": "Calamity"
    },
{
      "name": "Entropy+",
      "type": "vel",
      "cost": 1,
      "rarity": "rare",
      "note": "Upgraded version of Entropy. Innate. At the start of your turn, Transform 1 card in your Hand.",
      "description": "Innate. At the start of your turn, Transform 1 card in your Hand.",
      "isUpgraded": true,
      "baseCard": "Entropy"
    },
{
      "name": "Eternal Armor+",
      "type": "skl",
      "cost": 2,
      "rarity": "rare",
      "note": "Upgraded version of Eternal Armor. Gain 12 StS2 Icon Plating.png Plating.",
      "description": "Gain 12 StS2 Icon Plating.png Plating.",
      "isUpgraded": true,
      "baseCard": "Eternal Armor"
    },
{
      "name": "Gold Axe+",
      "type": "skl_vel",
      "cost": 1,
      "rarity": "rare",
      "note": "Upgraded version of Gold Axe. Retain. Deal damage equal to the number of cards played this combat.",
      "description": "Retain. Deal damage equal to the number of cards played this combat.",
      "isUpgraded": true,
      "baseCard": "Gold Axe"
    },
{
      "name": "Hand of Greed+",
      "type": "atk",
      "cost": 2,
      "rarity": "rare",
      "note": "Upgraded version of Hand of Greed. Deal 25 damage. If Fatal, gain 25 StS2 Gold.png Gold.",
      "description": "Deal 25 damage. If Fatal, gain 25 StS2 Gold.png Gold.",
      "isUpgraded": true,
      "baseCard": "Hand of Greed"
    },
{
      "name": "Hidden Gem+",
      "type": "vel",
      "cost": 0,
      "rarity": "rare",
      "note": "Upgraded version of Hidden Gem. A random card in your Draw Pile without Replay gains Replay 3.",
      "description": "A random card in your Draw Pile without Replay gains Replay 3.",
      "isUpgraded": true,
      "baseCard": "Hidden Gem"
    },
{
      "name": "Jackpot+",
      "type": "atk",
      "cost": 3,
      "rarity": "rare",
      "note": "Upgraded version of Jackpot. Deal 30 damage. Add 3 random Upgraded 0 StS2 EnergyColorless.png cards into your Hand.",
      "description": "Deal 30 damage. Add 3 random Upgraded 0 StS2 EnergyColorless.png cards into your Hand.",
      "isUpgraded": true,
      "baseCard": "Jackpot"
    },
{
      "name": "Knockdown+",
      "type": "atk",
      "cost": 2,
      "rarity": "rare",
      "note": "Upgraded version of Knockdown. Deal 14 damage. The enemy takes triple damage from other players this turn.",
      "description": "Deal 14 damage. The enemy takes triple damage from other players this turn.",
      "isUpgraded": true,
      "baseCard": "Knockdown"
    },
{
      "name": "Master of Strategy+",
      "type": "vel",
      "cost": 0,
      "rarity": "rare",
      "note": "Upgraded version of Master of Strategy. Draw 4 cards. Exhaust.",
      "description": "Draw 4 cards. Exhaust.",
      "isUpgraded": true,
      "baseCard": "Master of Strategy"
    },
{
      "name": "Mayhem+",
      "type": "vel",
      "cost": 5,
      "rarity": "rare",
      "note": "Upgraded version of Mayhem. At the start of your turn, play the top card of your Draw Pile.",
      "description": "At the start of your turn, play the top card of your Draw Pile.",
      "isUpgraded": true,
      "baseCard": "Mayhem"
    },
{
      "name": "Mimic+",
      "type": "def",
      "cost": 1,
      "rarity": "rare",
      "note": "Upgraded version of Mimic. Gain StS2 Intent Defend.png Block equal to the StS2 Intent Defend.png Block on another player.",
      "description": "Gain StS2 Intent Defend.png Block equal to the StS2 Intent Defend.png Block on another player.",
      "isUpgraded": true,
      "baseCard": "Mimic"
    },
{
      "name": "Nostalgia+",
      "type": "vel",
      "cost": 1,
      "rarity": "rare",
      "note": "Upgraded version of Nostalgia. The first Attack or Skill you play each turn is placed on top of your Draw Pile.",
      "description": "The first Attack or Skill you play each turn is placed on top of your Draw Pile.",
      "isUpgraded": true,
      "baseCard": "Nostalgia"
    },
{
      "name": "Rally+",
      "type": "def",
      "cost": 1,
      "rarity": "rare",
      "note": "Upgraded version of Rally. ALL players gain 17 StS2 Intent Defend.png Block.",
      "description": "ALL players gain 17 StS2 Intent Defend.png Block.",
      "isUpgraded": true,
      "baseCard": "Rally"
    },
{
      "name": "Rend+",
      "type": "atk",
      "cost": 2,
      "rarity": "rare",
      "note": "Upgraded version of Rend. Deal 18 damage. Deals 8 additional damage for each unique debuff on the enemy.",
      "description": "Deal 18 damage. Deals 8 additional damage for each unique debuff on the enemy.",
      "isUpgraded": true,
      "baseCard": "Rend"
    },
{
      "name": "Rolling Boulder+",
      "type": "atk",
      "cost": 2,
      "rarity": "rare",
      "note": "Upgraded version of Rolling Boulder. At the start of your turn, deal 10 damage to ALL enemies and increase this damage by 5.",
      "description": "At the start of your turn, deal 10 damage to ALL enemies and increase this damage by 5.",
      "isUpgraded": true,
      "baseCard": "Rolling Boulder"
    },
{
      "name": "Salvo+",
      "type": "atk_vel",
      "cost": 2,
      "rarity": "rare",
      "note": "Upgraded version of Salvo. Deal 16 damage. Retain your Hand this turn.",
      "description": "Deal 16 damage. Retain your Hand this turn.",
      "isUpgraded": true,
      "baseCard": "Salvo"
    },
{
      "name": "Scrawl+",
      "type": "vel",
      "cost": 0,
      "rarity": "rare",
      "note": "Upgraded version of Scrawl. Retain. Draw cards until your Hand is full. Exhaust.",
      "description": "Retain. Draw cards until your Hand is full. Exhaust.",
      "isUpgraded": true,
      "baseCard": "Scrawl"
    },
{
      "name": "Secret Technique+",
      "type": "vel",
      "cost": 0,
      "rarity": "rare",
      "note": "Upgraded version of Secret Technique. Put a Skill from your Draw Pile into your Hand.",
      "description": "Put a Skill from your Draw Pile into your Hand.",
      "isUpgraded": true,
      "baseCard": "Secret Technique"
    },
{
      "name": "Secret Weapon+",
      "type": "vel",
      "cost": 0,
      "rarity": "rare",
      "note": "Upgraded version of Secret Weapon. Put an Attack from your Draw Pile into your Hand.",
      "description": "Put an Attack from your Draw Pile into your Hand.",
      "isUpgraded": true,
      "baseCard": "Secret Weapon"
    },
{
      "name": "The Gambit+",
      "type": "atk_def",
      "cost": 1,
      "rarity": "rare",
      "note": "Upgraded version of The Gambit. Gain 75 StS2 Intent Defend.png Block. If you take unblocked attack damage this combat, die.",
      "description": "Gain 75 StS2 Intent Defend.png Block. If you take unblocked attack damage this combat, die.",
      "isUpgraded": true,
      "baseCard": "The Gambit"
    },
{
      "name": "Apotheosis+",
      "type": "vel",
      "cost": 2,
      "rarity": "ancient",
      "note": "Upgraded version of Apotheosis. Innate. Upgrade ALL your cards. Exhaust.",
      "description": "Innate. Upgrade ALL your cards. Exhaust.",
      "isUpgraded": true,
      "baseCard": "Apotheosis"
    },
{
      "name": "Apparition+",
      "type": "def_vel",
      "cost": 1,
      "rarity": "ancient",
      "note": "Upgraded version of Apparition. Gain 1 StS2 Icon Intangible.png Intangible. Exhaust.",
      "description": "Gain 1 StS2 Icon Intangible.png Intangible. Exhaust.",
      "isUpgraded": true,
      "baseCard": "Apparition"
    },
{
      "name": "Brightest Flame+",
      "type": "vel",
      "cost": 0,
      "rarity": "ancient",
      "note": "Upgraded version of Brightest Flame. Gain StS2 EnergyColorless.pngStS2 EnergyColorless.pngStS2 EnergyColorless.png. Draw 3 cards. Lose 1 Max HP.",
      "description": "Gain StS2 EnergyColorless.pngStS2 EnergyColorless.pngStS2 EnergyColorless.png. Draw 3 cards. Lose 1 Max HP.",
      "isUpgraded": true,
      "baseCard": "Brightest Flame"
    },
{
      "name": "Maul+",
      "type": "atk",
      "cost": 2,
      "rarity": "ancient",
      "note": "Upgraded version of Maul. Deal 6 damage twice. Increase the damage of ALL Maul cards by 2 this combat.",
      "description": "Deal 6 damage twice. Increase the damage of ALL Maul cards by 2 this combat.",
      "isUpgraded": true,
      "baseCard": "Maul"
    },
{
      "name": "Neow's Fury+",
      "type": "atk_vel",
      "cost": 1,
      "rarity": "ancient",
      "note": "Upgraded version of Neow's Fury. Deal 14 damage. Put 3 random cards from your Discard Pile into your Hand. Exhaust.",
      "description": "Deal 14 damage. Put 3 random cards from your Discard Pile into your Hand. Exhaust.",
      "isUpgraded": true,
      "baseCard": "Neow's Fury"
    },
{
      "name": "Relax+",
      "type": "def_vel",
      "cost": 0,
      "rarity": "ancient",
      "note": "Upgraded version of Relax. Gain 17 StS2 Intent Defend.png Block. Next turn, draw 3 cards and gain StS2 EnergyColorless.pngStS2 EnergyColorless.pngStS2 EnergyColorless.png. Exhaust.",
      "description": "Gain 17 StS2 Intent Defend.png Block. Next turn, draw 3 cards and gain StS2 EnergyColorless.pngStS2 EnergyColorless.pngStS2 EnergyColorless.png. Exhaust.",
      "isUpgraded": true,
      "baseCard": "Relax"
    },
{
      "name": "Whistle+",
      "type": "atk",
      "cost": 2,
      "rarity": "ancient",
      "note": "Upgraded version of Whistle. Deal 44 damage.",
      "description": "Deal 44 damage.",
      "isUpgraded": true,
      "baseCard": "Whistle"
    },
{
      "name": "Wish+",
      "type": "vel",
      "cost": 0,
      "rarity": "ancient",
      "note": "Upgraded version of Wish. Retain. Put a card from your Draw Pile into your Hand. Exhaust.",
      "description": "Retain. Put a card from your Draw Pile into your Hand. Exhaust.",
      "isUpgraded": true,
      "baseCard": "Wish"
    },
{
      "name": "Fuel+",
      "type": "vel",
      "cost": 0,
      "rarity": "token",
      "note": "Upgraded version of Fuel. Gain StS2 EnergyColorless.png. Draw 2 cards. Exhaust.",
      "description": "Gain StS2 EnergyColorless.png. Draw 2 cards. Exhaust.",
      "isUpgraded": true,
      "baseCard": "Fuel"
    },
{
      "name": "Giant Rock+",
      "type": "atk",
      "cost": 1,
      "rarity": "token",
      "note": "Upgraded version of Giant Rock. Deal 20 damage.",
      "description": "Deal 20 damage.",
      "isUpgraded": true,
      "baseCard": "Giant Rock"
    },
{
      "name": "Luminesce+",
      "type": "vel",
      "cost": 0,
      "rarity": "token",
      "note": "Upgraded version of Luminesce. Retain. Gain StS2 EnergyColorless.pngStS2 EnergyColorless.pngStS2 EnergyColorless.png. Exhaust.",
      "description": "Retain. Gain StS2 EnergyColorless.pngStS2 EnergyColorless.pngStS2 EnergyColorless.png. Exhaust.",
      "isUpgraded": true,
      "baseCard": "Luminesce"
    },
{
      "name": "Minion Dive Bomb+",
      "type": "atk_vel",
      "cost": 1,
      "rarity": "token",
      "note": "Upgraded version of Minion Dive Bomb. Deal 16 damage. Exhaust.",
      "description": "Deal 16 damage. Exhaust.",
      "isUpgraded": true,
      "baseCard": "Minion Dive Bomb"
    },
{
      "name": "Minion Sacrifice+",
      "type": "def_vel",
      "cost": 0,
      "rarity": "token",
      "note": "Upgraded version of Minion Sacrifice. Gain 12 StS2 Intent Defend.png Block. Exhaust.",
      "description": "Gain 12 StS2 Intent Defend.png Block. Exhaust.",
      "isUpgraded": true,
      "baseCard": "Minion Sacrifice"
    },
{
      "name": "Minion Strike+",
      "type": "atk_vel",
      "cost": 1,
      "rarity": "token",
      "note": "Upgraded version of Minion Strike. Deal 9 damage. Draw 1 card. Exhaust.",
      "description": "Deal 9 damage. Draw 1 card. Exhaust.",
      "isUpgraded": true,
      "baseCard": "Minion Strike"
    },
{
      "name": "Shiv+",
      "type": "atk_vel",
      "cost": 0,
      "rarity": "token",
      "note": "Upgraded version of Shiv. Deal 6 damage. Exhaust.",
      "description": "Deal 6 damage. Exhaust.",
      "isUpgraded": true,
      "baseCard": "Shiv"
    },
{
      "name": "Soul+",
      "type": "vel",
      "cost": 0,
      "rarity": "token",
      "note": "Upgraded version of Soul. Draw 3 cards. Exhaust.",
      "description": "Draw 3 cards. Exhaust.",
      "isUpgraded": true,
      "baseCard": "Soul"
    },
{
      "name": "Sovereign Blade+",
      "type": "atk_vel",
      "cost": 1,
      "rarity": "token",
      "note": "Upgraded version of Sovereign Blade. Retain. Deal 10 damage.",
      "description": "Retain. Deal 10 damage.",
      "isUpgraded": true,
      "baseCard": "Sovereign Blade"
    },
{
      "name": "Sweeping Gaze+",
      "type": "atk_vel",
      "cost": 0,
      "rarity": "token",
      "note": "Upgraded version of Sweeping Gaze. Ethereal. Osty deals 15 damage to a random enemy. Exhaust.",
      "description": "Ethereal. Osty deals 15 damage to a random enemy. Exhaust.",
      "isUpgraded": true,
      "baseCard": "Sweeping Gaze"
    },
{
      "name": "Byrd Swoop+",
      "type": "atk",
      "cost": 1,
      "rarity": "event",
      "note": "Upgraded version of Byrd Swoop. Deal 18 damage.",
      "description": "Deal 18 damage.",
      "isUpgraded": true,
      "baseCard": "Byrd Swoop"
    },
{
      "name": "Enlightenment+",
      "type": "vel",
      "cost": 0,
      "rarity": "event",
      "note": "Upgraded version of Enlightenment. Reduce the cost of ALL cards in your Hand to 1 this combat. Exhaust.",
      "description": "Reduce the cost of ALL cards in your Hand to 1 this combat. Exhaust.",
      "isUpgraded": true,
      "baseCard": "Enlightenment"
    },
{
      "name": "Exterminate+",
      "type": "atk",
      "cost": 1,
      "rarity": "event",
      "note": "Upgraded version of Exterminate. Deal 4 damage 4 times to ALL enemies.",
      "description": "Deal 4 damage 4 times to ALL enemies.",
      "isUpgraded": true,
      "baseCard": "Exterminate"
    },
{
      "name": "Feeding Frenzy+",
      "type": "skl",
      "cost": 0,
      "rarity": "event",
      "note": "Upgraded version of Feeding Frenzy. Gain 7 StS2 Icon Strength.png Strength this turn.",
      "description": "Gain 7 StS2 Icon Strength.png Strength this turn.",
      "isUpgraded": true,
      "baseCard": "Feeding Frenzy"
    },
{
      "name": "Metamorphosis+",
      "type": "vel",
      "cost": 2,
      "rarity": "event",
      "note": "Upgraded version of Metamorphosis. Add 5 random Attacks into your Draw Pile. They're free to play this combat. Exhaust.",
      "description": "Add 5 random Attacks into your Draw Pile. They're free to play this combat. Exhaust.",
      "isUpgraded": true,
      "baseCard": "Metamorphosis"
    },
{
      "name": "Peck+",
      "type": "atk",
      "cost": 0,
      "rarity": "event",
      "note": "Upgraded version of Peck. Deal 2 damage 4 times.",
      "description": "Deal 2 damage 4 times.",
      "isUpgraded": true,
      "baseCard": "Peck"
    },
{
      "name": "Squash+",
      "type": "atk",
      "cost": 1,
      "rarity": "event",
      "note": "Upgraded version of Squash. Deal 12 damage. Apply 3 StS2 Icon Vulnerable.png Vulnerable.",
      "description": "Deal 12 damage. Apply 3 StS2 Icon Vulnerable.png Vulnerable.",
      "isUpgraded": true,
      "baseCard": "Squash"
    },
{
      "name": "Toric Toughness+",
      "type": "def",
      "cost": 1,
      "rarity": "event",
      "note": "Upgraded version of Toric Toughness. Gain 7 StS2 Intent Defend.png Block. Gain 7 StS2 Intent Defend.png Block at the start of the next 2 turns.",
      "description": "Gain 7 StS2 Intent Defend.png Block. Gain 7 StS2 Intent Defend.png Block at the start of the next 2 turns.",
      "isUpgraded": true,
      "baseCard": "Toric Toughness"
    },
{
      "name": "Believe in You+",
      "type": "skl",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Upgraded version of Believe in You. Another player gains StS2 EnergyColorless.pngStS2 EnergyColorless.pngStS2 EnergyColorless.png.",
      "description": "Another player gains StS2 EnergyColorless.pngStS2 EnergyColorless.pngStS2 EnergyColorless.png.",
      "isUpgraded": true,
      "baseCard": "Believe in You"
    },
{
      "name": "Coordinate+",
      "type": "skl",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Upgraded version of Coordinate. Give another player 8 StS2 Icon Strength.png Strength this turn.",
      "description": "Give another player 8 StS2 Icon Strength.png Strength this turn.",
      "isUpgraded": true,
      "baseCard": "Coordinate"
    },
{
      "name": "Gang Up+",
      "type": "atk",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Upgraded version of Gang Up. Deal 5 damage. Deals 7 additional damage for each time another player has attacked the enemy this turn.",
      "description": "Deal 5 damage. Deals 7 additional damage for each time another player has attacked the enemy this turn.",
      "isUpgraded": true,
      "baseCard": "Gang Up"
    },
{
      "name": "Huddle Up+",
      "type": "vel",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Upgraded version of Huddle Up. ALL allies draw 3 cards.",
      "description": "ALL allies draw 3 cards.",
      "isUpgraded": true,
      "baseCard": "Huddle Up"
    },
{
      "name": "Intercept+",
      "type": "def",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Upgraded version of Intercept. Gain 13 StS2 Intent Defend.png Block. Redirect all incoming attacks that would be dealt to another player this turn to you.",
      "description": "Gain 13 StS2 Intent Defend.png Block. Redirect all incoming attacks that would be dealt to another player this turn to you.",
      "isUpgraded": true,
      "baseCard": "Intercept"
    },
{
      "name": "Lift+",
      "type": "def",
      "cost": 1,
      "rarity": "uncommon",
      "note": "Upgraded version of Lift. Give another player 16 StS2 Intent Defend.png Block.",
      "description": "Give another player 16 StS2 Intent Defend.png Block.",
      "isUpgraded": true,
      "baseCard": "Lift"
    },
{
      "name": "Tag Team+",
      "type": "atk",
      "cost": 2,
      "rarity": "uncommon",
      "note": "Upgraded version of Tag Team. Deal 15 damage. The next Attack another player plays on the enemy is played an extra time.",
      "description": "Deal 15 damage. The next Attack another player plays on the enemy is played an extra time.",
      "isUpgraded": true,
      "baseCard": "Tag Team"
    },
{
      "name": "Beacon of Hope+",
      "type": "skl_vel",
      "cost": 2,
      "rarity": "rare",
      "note": "Upgraded version of Beacon of Hope. Innate. Whenever you gain StS2 Intent Defend.png Block on your turn, other players gain half that much StS2 Intent Defend.png Block.",
      "description": "Innate. Whenever you gain StS2 Intent Defend.png Block on your turn, other players gain half that much StS2 Intent Defend.png Block.",
      "isUpgraded": true,
      "baseCard": "Beacon of Hope"
    },
{
      "name": "Knockdown+",
      "type": "atk",
      "cost": 2,
      "rarity": "rare",
      "note": "Upgraded version of Knockdown. Deal 14 damage. The enemy takes triple damage from other players this turn.",
      "description": "Deal 14 damage. The enemy takes triple damage from other players this turn.",
      "isUpgraded": true,
      "baseCard": "Knockdown"
    },
{
      "name": "Mimic+",
      "type": "def",
      "cost": 1,
      "rarity": "rare",
      "note": "Upgraded version of Mimic. Gain StS2 Intent Defend.png Block equal to the StS2 Intent Defend.png Block on another player.",
      "description": "Gain StS2 Intent Defend.png Block equal to the StS2 Intent Defend.png Block on another player.",
      "isUpgraded": true,
      "baseCard": "Mimic"
    },
{
      "name": "Rally+",
      "type": "def",
      "cost": 1,
      "rarity": "rare",
      "note": "Upgraded version of Rally. ALL players gain 17 StS2 Intent Defend.png Block.",
      "description": "ALL players gain 17 StS2 Intent Defend.png Block.",
      "isUpgraded": true,
      "baseCard": "Rally"
    }
];

