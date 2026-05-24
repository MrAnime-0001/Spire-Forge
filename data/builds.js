// Build definitions and recommendation inputs.
// Keep this file data-only.

const BUILD_DATA = {
ironclad: {
  builds: {
    strength:{name:"Strength",fullName:"Strength Build",color:"#e8b84b",rank:"S",winCondition:"Stack Strength, then use multi-hit attacks to multiply damage across every hit.",essential:["Demon Form","Inflame","Heavy Blade","Offering","Spot Weakness"],mustPick:["Demon Form","Inflame","Heavy Blade"],highPriority:["Offering","Spot Weakness","Limit Break","Whirlwind"],synergy:["Fight Me!","Twin Strike","Whirlwind","Rupture","Limit Break","Pommel Strike","Brand","Thrash"],priorityOrder:{mustPick:["Demon Form","Inflame","Heavy Blade"],high:["Offering","Spot Weakness","Limit Break","Whirlwind"],medium:["Fight Me!","Twin Strike","Rupture","Pommel Strike","Brand","Thrash"]},tips:["Multi-hit cards are your best attacks. Each hit benefits from Strength independently.","Vulnerable doubles your damage on big hits. Pair it with high-Strength swings.","Extra Energy lets you set up Strength and still attack in the same turn."],relicPriority:["Vajra","Shuriken","Pen Nib","Mutagenic Strength","Du-Vu Doll"],potionPriority:"Strength potion > block potion"},
    block:{name:"Block",fullName:"Block Build",color:"#4a8cba",rank:"A",winCondition:"Stack Block with Barricade active, then use Body Slam to deal damage equal to your current Block.",essential:["Barricade","Body Slam","Impervious","Shrug It Off"],mustPick:["Barricade","Body Slam"],highPriority:["Impervious","Shrug It Off","Entrench"],synergy:["Juggernaut","Taunt","Flame Barrier","Crimson Mantle","Stone Armor","True Grit","Entrench","Unmovable"],priorityOrder:{mustPick:["Barricade","Body Slam"],high:["Impervious","Shrug It Off","Entrench"],medium:["Juggernaut","Taunt","Flame Barrier","Crimson Mantle","Stone Armor","True Grit","Unmovable"]},tips:["Passive armor sources help you stack Block without spending cards.","Weak and Strength reduction on enemies preserve your Block by lowering incoming damage."],relicPriority:["Calipers","Tough Bandages","Horn Cleat","Anchor","Ice Cream"],potionPriority:"Block potion > strength potion (feed Body Slam)"},

    exhaust:{name:"Exhaust",fullName:"Exhaust Build",color:"#4a9a8a",rank:"S",winCondition:"Use Corruption to play all Skills for free, Exhaust them, then cycle with Dark Embrace and generate passive Block via Feel No Pain.",essential:["Corruption","Feel No Pain","Dark Embrace"],mustPick:["Corruption","Feel No Pain","Dark Embrace"],highPriority:["Second Wind","Fiend Fire","Burning Pact"],synergy:["Offering","Juggernaut","Ashen Strike","Pact's End","Body Slam","Brand","Thrash","Evil Eye","Burning Pact","Forgotten Ritual","True Grit","Second Wind","Fiend Fire","Stoke","Vicious"],priorityOrder:{mustPick:["Corruption","Feel No Pain","Dark Embrace"],high:["Second Wind","Fiend Fire","Burning Pact"],medium:["Offering","Juggernaut","Ashen Strike","Pact's End","Body Slam","Brand","Thrash","Evil Eye","Forgotten Ritual","True Grit","Stoke","Vicious"]},tips:["Primarily run Skill cards. The more Skills you Exhaust, the more Block and draw you generate.","Finishers are Ashen Strike, Body Slam, and Pact's End. Build toward those as closers.","Vulnerable on enemies increases finisher damage significantly."],relicPriority:["Dead Branch","Charon's Saddle","Strange Spoon"],potionPriority:"Block potion > energy potion (fuel Corruption turns)"},

    bloodletting:{name:"Bloodletting",fullName:"Bloodletting Build",color:"#c04040",rank:"A",winCondition:"Deliberately take HP damage to trigger Rupture and Inferno, scaling Strength and AoE damage simultaneously.",essential:["Bloodletting","Offering","Rupture"],mustPick:["Bloodletting","Rupture"],highPriority:["Offering","Inferno","Hemokinesis"],synergy:["Inferno","Breakthrough","Crimson Mantle","Tear Asunder","Hemokinesis","Brand","Feed","Combust","Spite"],priorityOrder:{mustPick:["Bloodletting","Rupture"],high:["Offering","Inferno","Hemokinesis"],medium:["Breakthrough","Crimson Mantle","Tear Asunder","Brand","Feed","Combust","Spite"]},tips:["The Pain curse actually helps this deck. 1 HP per card played triggers Rupture.","Once Strength is stacked, multi-hit cards multiply damage across every hit."],relicPriority:[],potionPriority:"HP heal > strength potion (offset self-damage)"},
    strike:{name:"Strike",fullName:"Strike Build",color:"#c07840",rank:"B",winCondition:"Use Perfected Strike as a nuke. Every Strike-type card in your deck adds damage to it.",essential:["Perfected Strike","Twin Strike","Pommel Strike"],mustPick:["Perfected Strike"],highPriority:["Twin Strike","Hellraiser"],synergy:["Hellraiser","Pyre","Expect a Fight","Taunt","Colossus","Breakthrough","Cruelty","Tremble"],priorityOrder:{mustPick:["Perfected Strike"],high:["Twin Strike","Hellraiser"],medium:["Pyre","Expect a Fight","Taunt","Colossus","Breakthrough","Cruelty","Tremble"]},tips:["Do not add every Strike-type card just to juice Perfected Strike. The scaling is not worth mediocre filler.","This deck lacks Block. Make sure to pick up defensive options alongside your Strike package.","Extra Energy is very helpful with a 2 Energy finisher. Prioritize Energy relic offers."],relicPriority:[],potionPriority:"Strength potion > energy potion (juice Perfected Strike)"},
    selfwound:{name:"Self-Wound",fullName:"Self-Wound Build",color:"#c06040",rank:"B",winCondition:"Turn HP loss into card draw and Strength. Combust + Fire Breathing = passive AoE.",essential:["Combust","Rupture","Evolve","Fire Breathing"],mustPick:["Combust","Rupture"],highPriority:["Evolve","Fire Breathing"],synergy:["Inferno","Spite","Crimson Mantle","Bloodletting","Tear Asunder","Feed"],priorityOrder:{mustPick:["Combust","Rupture"],high:["Evolve","Fire Breathing"],medium:["Inferno","Spite","Crimson Mantle","Bloodletting","Tear Asunder","Feed"]},tips:["Status cards from self-wound become draw fuel with Evolve.","Stack multiple self-damage sources for consistent triggers."],relicPriority:[]}
  }
,potionPriority:"Block potion > HP heal (survive self-damage)"},
silent: {
  builds: {
    shiv:{name:"Shiv",fullName:"Shiv Build",color:"#9a6aba",rank:"A",winCondition:"Generate as many Shivs as possible, buff them with Accuracy, then unload for massive burst damage.",essential:["Blade Dance","Accuracy","Cloak and Dagger"],mustPick:["Blade Dance","Accuracy"],highPriority:["Cloak and Dagger","Infinite Blades","Knife Trap"],synergy:["Infinite Blades","Knife Trap","Leading Strike","Finisher","Serpent Form","Afterimage","Hidden Daggers","Fan of Knives","Up My Sleeve","Storm of Steel"],priorityOrder:{mustPick:["Blade Dance","Accuracy"],high:["Cloak and Dagger","Infinite Blades","Knife Trap"],medium:["Leading Strike","Finisher","Serpent Form","Afterimage","Hidden Daggers","Fan of Knives","Up My Sleeve","Storm of Steel"]},tips:["Even one or two Shiv generators can enable combat relic effects without a full Shiv commitment."],relicPriority:[],potionPriority:"Dexterity potion > block potion (more Shivs per fight)"},
    poison:{name:"Poison",fullName:"Poison Build",color:"#6aac5f",rank:"S",winCondition:"Stack Poison as fast as possible, then use Catalyst to multiply it. Poison bypasses Block entirely.",essential:["Noxious Fumes","Catalyst","Corpse Explosion","Burst","Deadly Poison"],mustPick:["Noxious Fumes","Catalyst"],highPriority:["Burst","Deadly Poison","Accelerant"],synergy:["Accelerant","Poisoned Stab","Bubble Bubble","Outbreak","Haze","Mirage","Bouncing Flask","Corrosive Wave"],priorityOrder:{mustPick:["Noxious Fumes","Catalyst"],high:["Burst","Deadly Poison","Accelerant"],medium:["Poisoned Stab","Bubble Bubble","Outbreak","Haze","Mirage","Bouncing Flask","Corrosive Wave"]},tips:["Your first few turns are defensive. Surviving long enough for Poison to ramp is the whole game plan.","Artifact on enemies blocks Poison application entirely. Plan around it.","AoE coverage is limited in STS2. Haze, Outbreak, and Accelerant are your main tools."],relicPriority:[],potionPriority:"Block potion > energy potion (survive to stack Poison)"},
    sly:{name:"Sly",fullName:"Sly Build",color:"#4a8cba",rank:"S",winCondition:"Cycle your hand rapidly, trigger Sly cards for free plays, and chain together high-value cards across a single turn.",essential:["Tactician","Tools of the Trade","Acrobatics"],mustPick:["Tactician","Acrobatics"],highPriority:["Tools of the Trade","Master Planner","Reflex"],synergy:["Untouchable","Flick-Flack","Master Planner","Serpent Form","Calculated Gamble","Speedster","Abrasive","Ricochet","Prepared","Haze","Reflex","Dagger Throw","Afterimage","Well-Laid Plans"],priorityOrder:{mustPick:["Tactician","Acrobatics"],high:["Tools of the Trade","Master Planner","Reflex"],medium:["Untouchable","Flick-Flack","Serpent Form","Calculated Gamble","Speedster","Abrasive","Ricochet","Prepared","Haze","Dagger Throw","Afterimage","Well-Laid Plans"]},tips:["Keep the deck thin. Hitting Tactician every cycle is non-negotiable.","The best damage outside of Speedster and Serpent Form comes from adding a small Poison package alongside Haze.","Remove Strikes as fast as possible."],relicPriority:[],potionPriority:"Energy potion > block potion (fuel big draw turns)"},
    grandfinale:{name:"Grand Finale",fullName:"Grand Finale Build",color:"#c04040",rank:"A",winCondition:"Empty draw pile = 50 AoE (60 upgraded). Cycle through deck with Acrobatics and Calculated Gamble.",essential:["Grand Finale","Acrobatics","Calculated Gamble"],mustPick:["Grand Finale"],highPriority:["Acrobatics","Calculated Gamble"],synergy:["Prepared","Expertise","Tactician","Reflex","Well-Laid Plans","Adrenaline","Backflip"],priorityOrder:{mustPick:["Grand Finale"],high:["Acrobatics","Calculated Gamble"],medium:["Prepared","Expertise","Tactician","Reflex","Well-Laid Plans","Adrenaline","Backflip"]},tips:["Keep deck ~15 cards. Every card must cycle or dig.","Grand Finale is dead in hand without setup — only take if you have reliable cycling."],relicPriority:[],potionPriority:"Draw potion > energy potion (cycle to Finale)"},
    envenom:{name:"Envenom",fullName:"Envenom Build",color:"#6aac5f",rank:"B",winCondition:"Shivs apply Poison via Envenom. Every unblocked hit stacks Poison, then Catalyst multiplies.",essential:["Envenom","Blade Dance","Accuracy"],mustPick:["Envenom"],highPriority:["Blade Dance","Accuracy"],synergy:["Caltrops","Catalyst","Deadly Poison","Haze","Finisher","Infinite Blades","Fan of Knives"],priorityOrder:{mustPick:["Envenom"],high:["Blade Dance","Accuracy"],medium:["Caltrops","Catalyst","Deadly Poison","Haze","Finisher","Infinite Blades","Fan of Knives"]},tips:["Hybrid build — need both Attack density and Poison scaling.","Accuracy buffs Shivs; Envenom makes each Shiv apply Poison. Both scale together."],relicPriority:[],potionPriority:"Poison potion > dexterity potion (stack Poison faster)"},
    combo:{name:"Combo",fullName:"Combo Build",color:"#e8b84b",rank:"B",winCondition:"Chain cards in the right order. Expertise fills hand, Setup enables 0-cost next turn, Catalyst finishes.",essential:["Expertise","Setup","Catalyst"],mustPick:["Expertise","Catalyst"],highPriority:["Setup","Burst"],synergy:["Burst","Noxious Fumes","Deadly Poison","Bouncing Flask","Acrobatics","Well-Laid Plans","Adrenaline","Bullet Time"],priorityOrder:{mustPick:["Expertise","Catalyst"],high:["Setup","Burst"],medium:["Noxious Fumes","Deadly Poison","Bouncing Flask","Acrobatics","Well-Laid Plans","Adrenaline","Bullet Time"]},tips:["Turn order matters more than card quality. Sequence carefully.","Bullet Time + full hand = massive free turn."],relicPriority:[]}
  }
,potionPriority:"Energy potion > block potion (setup turns need energy)"},
defect: {
  builds: {
    claw:{name:"Claw",fullName:"Claw Build",color:"#e8b84b",rank:"S",winCondition:"Cycle 0-cost cards repeatedly, especially Claw. Each Claw played this combat increases the damage of all future Claws.",essential:["Claw","All for One","Scrape"],mustPick:["Claw","All for One"],highPriority:["Scrape","Feral","FTL"],synergy:["Feral","FTL","Hologram","Panache","Momentum Strike","Machine Learning","Skim","Flash of Steel","Beam Cell","Go for the Eyes","Secret Weapon"],priorityOrder:{mustPick:["Claw","All for One"],high:["Scrape","Feral","FTL"],medium:["Hologram","Panache","Momentum Strike","Machine Learning","Skim","Flash of Steel","Beam Cell","Go for the Eyes","Secret Weapon"]},tips:["Do not stuff the deck with every 0-cost card you see. You primarily want to draw Claw. A bloated deck dilutes it.","Stacking some Frost passively for Block is worthwhile since you don't rely on Orbs."],relicPriority:[],potionPriority:"Energy potion > block potion (cycle more 0-cost)"},
    lightning:{name:"Lightning",fullName:"Lightning Build",color:"#e8b84b",rank:"S",winCondition:"Channel Lightning orbs, spread with Electrodynamics, then stack Focus to multiply all orb output.",essential:["Defragment","Electrodynamics","Consume","Loop"],mustPick:["Defragment","Electrodynamics"],highPriority:["Loop","Consume","Multi-Cast"],synergy:["Multi-Cast","Voltaic","Tesla Coil","Thunder","Ball Lightning","Tempest","Capacitor","Compile Driver","Barrage","Lightning Rod","Storm"],priorityOrder:{mustPick:["Defragment","Electrodynamics"],high:["Loop","Consume","Multi-Cast"],medium:["Voltaic","Tesla Coil","Thunder","Ball Lightning","Tempest","Capacitor","Compile Driver","Barrage","Lightning Rod","Storm"]},tips:["Electrodynamics makes Lightning hit ALL enemies — critical for AoE.","Focus multiplies ALL orb damage. Defragment is #1 priority always."],relicPriority:[],potionPriority:"Focus potion > energy potion (multiply orb damage)"},
    frost:{name:"Frost",fullName:"Frost Build",color:"#4a8cba",rank:"A",winCondition:"Use Frost orbs for passive block generation. Biased Cog + Focus makes each orb block massive amounts.",essential:["Glacier","Defragment","Biased Cog"],mustPick:["Glacier","Defragment"],highPriority:["Biased Cog","Coolheaded","Loop"],synergy:["Coolheaded","Loop","Hailstorm","Capacitor","Chill","Cold Snap","Echo Form","Modded","Rainbow"],priorityOrder:{mustPick:["Glacier","Defragment"],high:["Biased Cog","Coolheaded","Loop"],medium:["Hailstorm","Capacitor","Chill","Cold Snap","Echo Form","Modded","Rainbow"]},tips:["Frost orbs automate defense — you need fewer block cards than other builds.","Biased Cog spikes Focus by 4 but decays. Find Focus sustain or finish fast."],relicPriority:[],potionPriority:"Focus potion > block potion (orbs automate defense)"},
    dark:{name:"Dark Orb",fullName:"Dark Orb Build",color:"#9a6aba",rank:"A",winCondition:"Channel Dark orbs and let them grow. Each turn they sit, Dark stores more damage. Multi-Cast for huge burst.",essential:["Darkness","Dark Orb","Multi-Cast","Defragment"],mustPick:["Darkness","Multi-Cast"],highPriority:["Defragment","Dark Orb","LoOp"],synergy:["Consuming Shadow","Loop","Capacitor","Dualcast","Shadow Shield","Rainbow","Null","Synchronize"],priorityOrder:{mustPick:["Darkness","Multi-Cast"],high:["Defragment","Dark Orb","LoOp"],medium:["Consuming Shadow","Loop","Capacitor","Dualcast","Shadow Shield","Rainbow","Null","Synchronize"]},tips:["Dark orbs ignore Focus — they scale purely by sitting in slots.","Loop triggers Dark passive each turn, accelerating growth without evoke."],relicPriority:[],potionPriority:"Energy potion > focus potion (fuel Multi-Cast)"},
    creativeai:{name:"Creative AI",fullName:"Creative AI Build",color:"#6aacda",rank:"B",winCondition:"Generate random Powers each turn. Echo Form doubles the value, Storm channels Lightning per Power played.",essential:["Creative AI","Echo Form"],mustPick:["Creative AI","Echo Form"],highPriority:["Storm","Subroutine","Signal Boost"],synergy:["Hologram","White Noise","Storm","Subroutine","Signal Boost","Defragment","Loop","Machine Learning"],priorityOrder:{mustPick:["Creative AI","Echo Form"],high:["Storm","Subroutine","Signal Boost"],medium:["Hologram","White Noise","Defragment","Loop","Machine Learning"]},tips:["Random Powers mean inconsistent value — but the ceiling is very high.","Echo Form + Creative AI = 2 random Powers per turn."],relicPriority:[]}
  }
,potionPriority:"Energy potion > block potion (play more Powers)"},
necrobinder: {
  builds: {
    doom:{name:"Doom",fullName:"Doom Build",color:"#9a6aba",rank:"A",winCondition:"Apply Doom stacks to enemies. When their HP drops to or below their Doom count, they die at end of turn.",essential:["Capture Spirit","Countdown","Danse Macabre","Grave Warden"],mustPick:["Countdown","Grave Warden"],highPriority:["Capture Spirit","Danse Macabre","End of Days"],synergy:["End of Days","Time's Up","No Escape","Deathbringer","Death's Door","Oblivion","Blight Strike","Scourge","Shroud","Negative Pulse"],priorityOrder:{mustPick:["Countdown","Grave Warden"],high:["Capture Spirit","Danse Macabre","End of Days"],medium:["Time's Up","No Escape","Deathbringer","Death's Door","Oblivion","Blight Strike","Scourge","Shroud","Negative Pulse"]},tips:["Doom's delayed kill is its core weakness. Build enough Block to survive until it triggers.","A small Soul package for card draw helps you find your key Doom cards consistently."],relicPriority:[],potionPriority:"Block potion > energy potion (survive to execute)"},
    osty:{name:"Osty",fullName:"Osty Build",color:"#6aac5f",rank:"S",winCondition:"Keep Osty alive and grow its HP through Summon effects. Osty is a permanent front-line tank.",essential:["Dirge","Borrowed Time","Reanimate","Rattle"],mustPick:["Dirge","Reanimate"],highPriority:["Borrowed Time","Rattle","Necro Mastery"],synergy:["Necro Mastery","Flatten","Sic 'Em","Pull Aggro","High Five","Fetch","Spur","Snap","Bone Shards","Sacrifice","Sentry Mode","Calcify"],priorityOrder:{mustPick:["Dirge","Reanimate"],high:["Borrowed Time","Rattle","Necro Mastery"],medium:["Flatten","Sic 'Em","Pull Aggro","High Five","Fetch","Spur","Snap","Bone Shards","Sacrifice","Sentry Mode","Calcify"]},tips:["Osty keeps HP between fights — stack Summon early for a safe Act 1.","Heal effects heal YOU, not Osty. Don't rely on Reanimate for Osty sustain."],relicPriority:[],potionPriority:"Block potion > HP heal (protect Osty, you heal)"},
    soul:{name:"Soul",fullName:"Soul Build",color:"#6aacda",rank:"A",winCondition:"Souls are 0-cost draw 2 Exhaust. Haunt makes each Soul deal 6 unblockable. Cycle Souls for chip damage.",essential:["Haunt","Capture Spirit","Soul Storm"],mustPick:["Haunt","Capture Spirit"],highPriority:["Soul Storm","Dirge","Severance"],synergy:["Dirge","Devour Life","Severance","Glimpse Beyond","Seance","Death March","Reave","Grave Warden","Soul","Sleight of Flesh"],priorityOrder:{mustPick:["Haunt","Capture Spirit"],high:["Soul Storm","Dirge","Severance"],medium:["Devour Life","Glimpse Beyond","Seance","Death March","Reave","Grave Warden","Soul","Sleight of Flesh"]},tips:["Souls cycle through the deck adding draw. Haunt converts each Soul into damage.","Capture Spirit is core — generates 3 Souls at once. Take it early."],relicPriority:[],potionPriority:"Energy potion > block potion (fuel Soul generation)"},
    reaper:{name:"Reaper",fullName:"Reaper Build",color:"#c04040",rank:"A",winCondition:"Attacks apply Doom equal to damage dealt. The Scythe scales permanently. Lethality boosts first attack 50%.",essential:["Reaper Form","The Scythe","Lethality"],mustPick:["Reaper Form","The Scythe"],highPriority:["Lethality","Eradicate","Debilitate"],synergy:["Amplify","Eradicate","Banshee's Cry","Reap","Bury","Time's Up","End of Days","Debilitate","Sleight of Flesh"],priorityOrder:{mustPick:["Reaper Form","The Scythe"],high:["Lethality","Eradicate","Debilitate"],medium:["Amplify","Banshee's Cry","Reap","Bury","Time's Up","End of Days","Sleight of Flesh"]},tips:["Reaper Form makes every attack apply Doom = damage dealt — massive Doom scaling.","The Scythe increases permanently each play — scale into late game."],relicPriority:[]}
  }
,potionPriority:"Strength potion > energy potion (boost Doom application)"},
regent: {
  builds: {
    forge:{name:"Forge",fullName:"Forge Build",color:"#e8b84b",rank:"S",winCondition:"Forge the Sovereign Blade to high damage. Sword Sage doubles all Forge gains. Seeking Edge makes Blade AoE.",essential:["Seeking Edge","Sword Sage","Conqueror","The Smith"],mustPick:["Sword Sage","Seeking Edge"],highPriority:["Conqueror","The Smith","Hammer Time"],synergy:["Summon Forth","Beat into Shape","Refine Blade","Sword Stage","Spoils of Battle","Solar Strike","Bulwark","Big Bang","Hammer Time"],priorityOrder:{mustPick:["Sword Sage","Seeking Edge"],high:["Conqueror","The Smith","Hammer Time"],medium:["Summon Forth","Beat into Shape","Refine Blade","Sword Stage","Spoils of Battle","Solar Strike","Bulwark","Big Bang"]},tips:["Sword Sage is the keystone — doubles every Forge charge.","Seeking Edge makes Blade hit ALL enemies — critical for AoE."],relicPriority:[],potionPriority:"Energy potion > strength potion (more Forge actions)"},
    starburst:{name:"Star Burst",fullName:"Star Burst Build",color:"#6aacda",rank:"A",winCondition:"Stockpile Stars, then unload. Black Hole + Glow = AoE per Star generation. Seven Stars = 7-hit nuke.",essential:["Stardust","Seven Stars","Black Hole","Glow"],mustPick:["Black Hole","Glow"],highPriority:["Stardust","Seven Stars","Genesis"],synergy:["Alignment","Comet","Meteor Shower","Gamma Blast","Radiate","Genesis","Terraforming","Quasar","Royal Gamble","Manifest Authority","Powder","Glimmer"],priorityOrder:{mustPick:["Black Hole","Glow"],high:["Stardust","Seven Stars","Genesis"],medium:["Alignment","Comet","Meteor Shower","Gamma Blast","Radiate","Terraforming","Quasar","Royal Gamble","Manifest Authority","Powder","Glimmer"]},tips:["Star generation is critical — without 3+ sources, Star-cost cards are dead.","Black Hole + Glow gives AoE every time you generate Stars."],relicPriority:[],potionPriority:"Energy potion > block potion (generate Stars faster)"},
    voidform:{name:"Void Form",fullName:"Void Form Build",color:"#9a6aba",rank:"A",winCondition:"First 2 cards per turn are free. Comet (33 dmg, 5-star cost) becomes a zero-cost bomb.",essential:["Void Form","Convergence","Comet"],mustPick:["Void Form","Comet"],highPriority:["Convergence","Big Bang","Seven Stars"],synergy:["Big Bang","Seven Stars","Meteor Shower","Bombardment","Gamma Blast","Stardust","Heavenly Drill","The Sealed Throne","Royalties","Decisions Decisions"],priorityOrder:{mustPick:["Void Form","Comet"],high:["Convergence","Big Bang","Seven Stars"],medium:["Meteor Shower","Bombardment","Gamma Blast","Stardust","Heavenly Drill","The Sealed Throne","Royalties","Decisions Decisions"]},tips:["Prioritize 0-2 cost cards — Void Form makes the first 2 free each turn.","Comet is S-tier here: 33 damage, 5-star cost, played for free."],relicPriority:[],potionPriority:"Draw potion > block potion (find Comet faster)"},
    bombardment:{name:"Bombardment",fullName:"Bombardment Build",color:"#c04040",rank:"B",winCondition:"AoE via Star generation. Bombardment auto-plays from Exhaust pile. Meteor Shower hits all for 14.",essential:["Bombardment","Meteor Shower"],mustPick:["Bombardment"],highPriority:["Meteor Shower","Crash Landing"],synergy:["Gamma Blast","Crash Landing","Lunar Blast","Astral Pulse","Radiate","Starfall","Alignment","Genesis","Terraforming"],priorityOrder:{mustPick:["Bombardment"],high:["Meteor Shower","Crash Landing"],medium:["Gamma Blast","Lunar Blast","Astral Pulse","Radiate","Starfall","Alignment","Genesis","Terraforming"]},tips:["Bombardment auto-plays from Exhaust each turn — consistent AoE.","Generate Stars to fuel Meteor Shower and Gamma Blast."],relicPriority:[]}
  }
}
};


const SYNERGY_PAIRS = [
  // ── IRONCLAD ──────────────────────────────────────────────
  {a:'Corruption',       b:'Dark Embrace',    bond:'Enable',   bonus:12, note:'Every Skill Exhausted draws 1 — Corruption triggers this constantly',potionPriority:"Energy potion > block potion (fuel AoE)"},
  {a:'Corruption',       b:'Feel No Pain',    bond:'Amplify',  bonus:10, note:'Every Exhausted Skill gives 3 Block on top of cost-0 play'},
  {a:'Corruption',       b:'Forgotten Ritual',bond:'Enable',   bonus:10, note:'Forgotten Ritual gives Energy if Exhausted this turn — Corruption guarantees it'},
  {a:'Demon Form',       b:'Whirlwind',       bond:'Finisher', bonus:10, note:'Each Strength turn multiplies all Whirlwind hits'},
  {a:'Rupture',          b:'Bloodletting',    bond:'Enable',   bonus:12, note:'Bloodletting loses 3 HP — Rupture gives 1 Strength per HP loss. Stacks fast'},
  {a:'Rupture',          b:'Inferno',         bond:'Amplify',  bonus:8,  note:'Inferno AoE fires whenever you lose HP — Bloodletting+Rupture triggers both'},
  {a:'Barricade',        b:'Body Slam',       bond:'Finisher', bonus:14, note:'Body Slam deals damage equal to Block. Barricade lets Block stack. Complete package'},
  {a:'Barricade',        b:'Juggernaut',      bond:'Amplify',  bonus:8,  note:'Juggernaut deals 5 damage per Block gained — stacking Block hits twice as hard'},
  {a:'Cruelty',          b:'Molten Fist',     bond:'Amplify',  bonus:12, note:'Molten Fist applies Vulnerable — Cruelty makes Vulnerable enemies take 25% more'},
  {a:'Hellraiser',       b:'Pommel Strike',   bond:'Loop',     bonus:14, note:'Pommel Strike draws a card — Hellraiser auto-plays drawn Strikes. Core infinite loop'},
  {a:'Feel No Pain',     b:'Second Wind',     bond:'Loop',     bonus:8,  note:'Second Wind Exhausts non-attacks for Block — Feel No Pain gives 3 Block per Exhaust on top'},
  {a:'Fiend Fire',       b:'Corruption',      bond:'Finisher', bonus:10, note:'Corruption makes Skills free — dump a cheap hand then Fiend Fire for huge burst'},

  // ── SILENT ────────────────────────────────────────────────
  {a:'Accuracy',         b:'Infinite Blades', bond:'Amplify',  bonus:14, note:'Infinite Blades generates a Shiv each turn — Accuracy adds +4 to every Shiv'},
  {a:'Accuracy',         b:'Blade Dance',     bond:'Amplify',  bonus:12, note:'Blade Dance creates 3 Shivs — Accuracy multiplies all three simultaneously'},
  {a:'Accuracy',         b:'Knife Trap',      bond:'Finisher', bonus:12, note:'Knife Trap plays every Shiv in Exhaust pile — Accuracy multiplies each one'},
  {a:'Accuracy',         b:'Fan of Knives',   bond:'Amplify',  bonus:8,  note:'Fan of Knives hits ALL enemies with Shivs — Accuracy makes each hit harder'},
  {a:'Master Planner',   b:'Tactician',       bond:'Enable',   bonus:14, note:'Master Planner gives all Skills Sly — discarding Tactician gives free Energy'},
  {a:'Master Planner',   b:'Reflex',          bond:'Enable',   bonus:12, note:'Master Planner gives all Skills Sly — discarding Reflex draws 2 for free'},
  {a:'Calculated Gamble',b:'Tactician',       bond:'Loop',     bonus:12, note:'Gamble discards hand — each Tactician discarded fires for free Energy'},
  {a:'Noxious Fumes',    b:'Accelerant',      bond:'Finisher', bonus:14, note:'Accelerant stops Poison decreasing — Noxious Fumes stacks grow exponentially'},
  {a:'Accelerant',       b:'Bubble Bubble',   bond:'Amplify',  bonus:10, note:'Bubble Bubble doubles Poison — with Accelerant the pool never decays, so doubling is huge'},
  {a:'Afterimage',       b:'Tools of the Trade',bond:'Amplify',bonus:8,  note:'Tools discards 1 and draws 1 — each event may trigger Afterimage Block'},
  {a:'Serpent Form',     b:'Accelerant',      bond:'Amplify',  bonus:8,  note:'Serpent Form applies Poison per damage — Accelerant keeps that Poison building'},

  // ── DEFECT ────────────────────────────────────────────────
  {a:'Defragment',       b:'Echo Form',       bond:'Amplify',  bonus:14, note:'Echo Form plays the next card twice — Defragment played twice doubles permanent Focus gain'},
  {a:'Defragment',       b:'Biased Cognition', bond:'Loop',    bonus:12, note:'Biased Cognition spikes Focus — Defragment is the stable baseline it needs'},
  {a:'Capacitor',        b:'Loop',            bond:'Enable',   bonus:12, note:'More Orb slots means orbs accumulate longer before evoke — Loop fires smarter'},
  {a:'Darkness',         b:'Multi-Cast',      bond:'Finisher', bonus:14, note:'Dark orbs store damage (ignores Focus) — Multi-Cast evokes 3 times for triple nuke'},
  {a:'Darkness',         b:'Consuming Shadow',bond:'Amplify',  bonus:10, note:'Consuming Shadow channels 2 Dark at end of turn — fastest way to load the queue'},
  {a:'Coolheaded',       b:'Glacier',         bond:'Amplify',  bonus:12, note:'Glacier channels 2 Frost — Coolheaded channels 1 more plus draws. Stack Frost fast'},
  {a:'Coolheaded',       b:'Loop',            bond:'Enable',   bonus:10, note:'Channeling with Coolheaded triggers Loop evoke of older orb — block compounds'},
  {a:'All for One',      b:'Claw',            bond:'Loop',     bonus:14, note:'All for One returns all 0-cost from discard — fetches Claw back after every play'},
  {a:'Feral',            b:'Claw',            bond:'Loop',     bonus:10, note:'Feral returns first 0-cost Attack each turn to hand — Claw almost never leaves'},
  {a:'Compact',          b:'Smokestack',      bond:'Loop',     bonus:12, note:'Compact transforms Status to Fuel — Smokestack deals 5 AoE per Status created'},
  {a:'Compact',          b:'Flak Cannon',     bond:'Finisher', bonus:10, note:'Flak Cannon Exhausts all Status for 8 damage each — Compact feeds the pile'},
  {a:'Echo Form',        b:'Creative AI',     bond:'Amplify',  bonus:10, note:'Echo Form plays next card twice — playing Creative AI gives 2 random Powers'},
  {a:'Meteor Strike',    b:'Hologram',        bond:'Loop',     bonus:10, note:'Meteor Strike channels 3 Plasma (energy). Hologram retrieves it from discard every 2 turns'},

  // ── NECROBINDER — Energy Cluster ─────────────────────────
  {a:'Neurosurge',       b:'Eradicate',       bond:'Enable',   bonus:16, note:'Neurosurge gives 3 free Energy — Eradicate multiplies by 11/energy = +33 burst damage'},
  {a:'Wisp',             b:'Eradicate',       bond:'Enable',   bonus:10, note:'Wisp is 0-cost +1 Energy — adds 11 free damage to Eradicate on the combo turn'},
  {a:'Borrowed Time',    b:'Eradicate',       bond:'Enable',   bonus:14, note:'Borrowed Time gives +4 Energy — Eradicate Retains so it never pays cost inflation'},
  {a:'Friendship',       b:'Eradicate',       bond:'Amplify',  bonus:10, note:'Friendship gives +1 Energy/turn permanently — adds 11 to Eradicate baseline every cycle'},
  {a:'Demesne',          b:'Eradicate',       bond:'Enable',   bonus:8,  note:'Demesne gives +1 Energy + draw — feeds Eradicate and finds it faster'},
  {a:'Neurosurge',       b:'Wisp',            bond:'Loop',     bonus:10, note:'Neurosurge+Wisp+base = 7+ energy — Eradicate hits 77+ damage on the combo turn'},
  {a:'Neurosurge',       b:'Borrowed Time',   bond:'Loop',     bonus:14, note:'Neurosurge burst + Borrowed Time sustained — together enable 10+ energy turns'},
  {a:'Neurosurge',       b:'Friendship',      bond:'Amplify',  bonus:10, note:'Friendship: sustained +1/turn. Neurosurge: burst for kill turn. Both layers stack'},

  // ── NECROBINDER — Damage Multiplier ───────────────────────
  {a:'Lethality',        b:'Eradicate',       bond:'Amplify',  bonus:14, note:'Lethality: first Attack +50%. Eradicate Retains. Play Lethality, fire Eradicate next turn for 1.5× burst'},
  {a:'Lethality',        b:'The Scythe',      bond:'Amplify',  bonus:12, note:'Lethality makes first Attack +50% — The Scythe as first attack hits all enemies harder'},
  {a:'Debilitate',       b:'Lethality',       bond:'Amplify',  bonus:12, note:'Debilitate applies Vulnerable (+50% damage) — stacks with Lethality for massive multiplier'},
  {a:'Debilitate',       b:'Eradicate',       bond:'Amplify',  bonus:10, note:'Vulnerable makes enemy take 50% more — Eradicate amplifies this by energy count'},
  {a:'Putrefy',          b:'Lethality',       bond:'Amplify',  bonus:8,  note:'Putrefy needs Lethality or Debilitate stacks to justify its slot'},

  // ── NECROBINDER — Doom ────────────────────────────────────
  {a:'No Escape',        b:'Countdown',       bond:'Amplify',  bonus:12, note:'No Escape stacks exponentially — Countdown adds 6/turn passively. Threshold in 2-3 turns'},
  {a:'No Escape',        b:'Deathbringer',    bond:'Amplify',  bonus:10, note:'Deathbringer applies Weak — weakened enemies survive longer to accumulate more Doom'},
  {a:"No Escape",        b:"Death's Door",    bond:'Enable',   bonus:10, note:"Death's Door gives 18 Block if any enemy Doomed — No Escape guarantees the trigger"},
  {a:'No Escape',        b:'Borrowed Time',   bond:'Enable',   bonus:12, note:'Borrowed Time gives burst Energy to play No Escape + setup in same turn'},
  {a:'Reaper Form',      b:'No Escape',       bond:'Amplify',  bonus:10, note:'Reaper Form: each Attack applies Doom = damage. No Escape then multiplies that Doom'},
  {a:'No Escape',        b:'Shroud',          bond:'Amplify',  bonus:8,  note:'Shroud gives 2 Block per Doom applied — No Escape applies in large quantities'},

  // ── NECROBINDER — Soul/Haunt ──────────────────────────────
  {a:'Haunt',            b:'Dirge',           bond:'Amplify',  bonus:14, note:'Dirge generates X Souls — each Soul fires Haunt\'s 6 unblockable. Core Soul damage'},
  {a:'Haunt',            b:'Grave Warden',    bond:'Enable',   bonus:10, note:'Grave Warden gives Block + Soul — defensive plays seed Haunt counter simultaneously'},
  {a:'Haunt',            b:'Capture Spirit',  bond:'Amplify',  bonus:10, note:'Capture Spirit generates multiple Souls — each fires Haunt'},
  {a:'Haunt',            b:'Soul Storm',      bond:'Finisher', bonus:12, note:'Soul Storm plays every Soul in hand — each Soul fires Haunt for mass unblockable burst'},
  {a:'Haunt',            b:'Glimpse Beyond',  bond:'Enable',   bonus:10, note:'Glimpse Beyond creates up to 12 Souls per energy — all trigger Haunt'},
  {a:'Dirge',            b:'Devour Life',     bond:'Amplify',  bonus:12, note:'Devour Life summons 1 per Soul — Dirge floods Souls, Devour Life floods Osty HP'},
  {a:'Oblivion',         b:'Haunt',           bond:'Amplify',  bonus:8,  note:'Oblivion stacks Doom using Souls — each Soul fires Haunt AND stacks Doom'},

  // ── NECROBINDER — Osty ────────────────────────────────────
  {a:'Necro Mastery',    b:'Squeeze',         bond:'Finisher', bonus:12, note:'Necro Mastery makes Osty attack at turn start — counts toward Squeeze\'s +5/attack scaling'},
  {a:'Necro Mastery',    b:'Rattle',          bond:'Amplify',  bonus:8,  note:'Rattle is an Osty-attack card — each Rattle adds to Necro Mastery output and Squeeze count'},
  {a:'Fetch',            b:'Flatten',         bond:'Loop',     bonus:12, note:'Fetch triggers Osty attack — enables Flatten\'s 0-cost condition. Core Osty loop'},
  {a:'Rattle',           b:'Flatten',         bond:'Amplify',  bonus:10, note:'Rattle makes Osty attack — enables Flatten to cost 0. Multiple Osty attacks = free Flatten'},

  // ── NECROBINDER — Ethereal ────────────────────────────────
  {a:'Lethality',        b:"Banshee's Cry",   bond:'Enable',   bonus:10, note:'Lethality Exhausts (Ethereal) — reduces Banshee\'s Cry cost by 1 this combat'},
  {a:'Spirit of Ash',    b:'Pagestorm',       bond:'Amplify',  bonus:10, note:'Spirit of Ash: 4 Block per Ethereal played. Pagestorm: draw per Ethereal drawn. Compounds'},
  {a:'Lethality',        b:'Reap',            bond:'Amplify',  bonus:8,  note:'Reap Retains — hold it for the turn Lethality first-Attack bonus applies'},

  // ── REGENT ────────────────────────────────────────────────
  {a:'Alignment',        b:'Glow',            bond:'Loop',     bonus:14, note:'Glow generates Stars — Alignment converts Stars to Energy. Thin deck = Infinite loop'},
  {a:'Alignment',        b:'Genesis',         bond:'Amplify',  bonus:12, note:'Genesis gives 2 Stars/turn — Alignment converts those to free Energy at turn start'},
  {a:'Alignment',        b:'Royal Gamble',    bond:'Amplify',  bonus:10, note:'Royal Gamble generates burst Stars — Alignment converts them all to Energy same turn'},
  {a:'Void Form',        b:'Seven Stars',     bond:'Finisher', bonus:14, note:'Void Form draws cards and exhausts — feeds Seven Stars fast for massive AoE'},
  {a:'Seven Stars',      b:'Genesis',         bond:'Enable',   bonus:10, note:'Genesis gives 2 Stars/turn — after 3-4 turns Seven Stars (7★ cost) becomes playable'},
  {a:'Comet',            b:'Child of the Stars',bond:'Amplify',bonus:8,  note:'Child gives 2 Block per Star spent — Comet costs 5 Stars so gives 10 Block simultaneously'},
  {a:'Bulwark',          b:'Conqueror',       bond:'Finisher', bonus:12, note:'Bulwark Forges Blade (+10) — Conqueror doubles damage this turn. Burst kill setup'},
  {a:'Seeking Edge',     b:'Summon Forth',    bond:'Amplify',  bonus:10, note:'Seeking Edge makes Blade hit all enemies — Summon Forth fetches it. AoE Blade turn'},
  {a:'Convergence',      b:'Void Form',       bond:'Loop',     bonus:10, note:'Convergence Retains hand + generates energy next turn. Void Form draws cards. Both control hand and deck flow'},

  // ── IRONCLAD ADDITIONS ──────────────────────────────────────
  // Vulnerable synergy
  {a:'Cruelty',         b:'Uppercut',        bond:'Amplify',  bonus:10, note:'Uppercut applies Weak+Vulnerable — Cruelty gives +25% damage to Vulnerable enemies on all subsequent hits'},
  {a:'Cruelty',         b:'Taunt',           bond:'Amplify',  bonus:10, note:'Taunt applies Vulnerable (2 upgraded) — Cruelty makes every attack after hit 25% harder'},
  {a:'Cruelty',         b:'Vicious',         bond:'Amplify',  bonus:8,  note:'Vicious draws when you apply Vulnerable — with Cruelty active, Vulnerable is worth even more energy to trigger'},
  {a:'Cruelty',         b:'Tremble',         bond:'Enable',   bonus:8,  note:'Tremble applies 2 Vulnerable for 0 Energy — Cruelty makes that 0-cost setup deal massive dividends'},
  // Block engine
  {a:'Juggernaut',      b:'Impervious',      bond:'Amplify',  bonus:8,  note:'Impervious gives 30 Block in one card — Juggernaut turns that into 30 direct damage'},
  {a:'Barricade',       b:'Entrench',        bond:'Amplify',  bonus:10, note:'Entrench doubles current Block — with Barricade persisting it, the doubled amount sticks permanently until spent'},
  // Exhaust additions
  {a:'Dark Embrace',    b:'Burning Pact',    bond:'Loop',     bonus:10, note:'Burning Pact Exhausts a card and draws 2 — Dark Embrace draws again on the Exhaust. Net: pay 1E, draw 3'},
  {a:'Offering',        b:'Corruption',      bond:'Amplify',  bonus:8,  note:'With Corruption online, Offering (0-cost, Exhaust) also feeds Dark Embrace and Feel No Pain in the same play'},
  // Strength additions
  {a:'Demon Form',      b:'Rupture',         bond:'Amplify',  bonus:10, note:'Rupture gives Strength on HP loss — Demon Form gives Strength passively. Two Strength engines stacking every turn'},
  {a:'Demon Form',      b:'Twin Strike',     bond:'Amplify',  bonus:10, note:'Twin Strike hits twice — every hit multiplied by Demon Form Strength. Double Strength scaling per card'},
  {a:'Demon Form',      b:'Inflame',         bond:'Amplify',  bonus:10, note:'Inflame gives +2 Strength immediately — Demon Form then stacks further every turn on that boosted base'},
  {a:'Rupture',         b:'Brand',           bond:'Loop',     bonus:8,  note:'Brand: lose 1 HP per card played, Exhaust 1, gain 1 Strength — Rupture fires Strength on Brand\'s HP loss'},
  {a:'Not Yet',         b:'Bloodletting',    bond:'Amplify',  bonus:8,  note:'Not Yet heals 10 HP on Exhaust — resets the HP pool so Bloodletting and Rupture can keep triggering safely'},
  {a:'Pyre',            b:'Whirlwind',       bond:'Amplify',  bonus:10, note:'Pyre gives +1 Energy per turn permanently — Whirlwind scales directly with total energy available each turn'},
  {a:'Feed',            b:'Demon Form',      bond:'Amplify',  bonus:8,  note:'Feed raises Max HP on kill — with Demon Form stacking Strength, more HP means you can sustain longer'},

  // ── SILENT ADDITIONS ────────────────────────────────────────
  // Afterimage additions
  {a:'Afterimage',      b:'Calculated Gamble',bond:'Amplify', bonus:10, note:'Calculated Gamble discards whole hand and redraws — each discarded Sly card fires for free, each play triggers Afterimage Block'},
  {a:'Afterimage',      b:'Acrobatics',      bond:'Amplify',  bonus:8,  note:'Acrobatics draws 3 discards 1 — Sly triggers on the discard, Afterimage gives Block on the draws and plays'},
  {a:'Footwork',        b:'Afterimage',      bond:'Amplify',  bonus:8,  note:'Footwork gives permanent Dexterity — Afterimage Block per card play is not affected by Dex directly, but every Block card gives more net Block'},
  // Sly engine additions
  {a:'Well-Laid Plans', b:'Tactician',       bond:'Enable',   bonus:12, note:'Well-Laid Plans Retains Tactician in hand — hold it, discard it next turn for guaranteed free Energy on demand'},
  {a:'Tools of the Trade',b:'Tactician',     bond:'Loop',     bonus:14, note:'Tools discards 1 card per turn — if Tactician is the discard it fires for free Energy every single turn automatically'},
  {a:'Tools of the Trade',b:'Reflex',        bond:'Loop',     bonus:12, note:'Tools discards 1 card per turn — if Reflex is the discard it draws 2 for free every turn automatically'},
  // Poison additions
  {a:'Burst',           b:'Noxious Fumes',   bond:'Amplify',  bonus:12, note:'Burst plays next Skill twice — Noxious Fumes played twice applies 4 Poison to all enemies instead of 2'},
  {a:'Burst',           b:'Deadly Poison',   bond:'Amplify',  bonus:12, note:'Burst plays next Skill twice — Deadly Poison played twice stacks 10 Poison in one action'},
  {a:'Burst',           b:'Accelerant',      bond:'Amplify',  bonus:12, note:'Burst plays Accelerant twice — double-triggering Accelerant means Poison never decreases AND triggers twice per turn'},
  // Shiv additions
  {a:'Knife Trap',      b:'Blade Dance',     bond:'Finisher', bonus:12, note:'Blade Dance adds 3 Shivs to Exhaust pile — Knife Trap plays every Shiv in Exhaust for burst damage'},
  {a:'Infinite Blades', b:'Finisher',        bond:'Amplify',  bonus:10, note:'Infinite Blades generates a Shiv each turn — Finisher deals 6 damage per Attack already played, Shivs count'},
  {a:'Envenom',         b:'Accuracy',        bond:'Amplify',  bonus:8,  note:'Envenom applies Poison per unblocked hit — Accuracy Shivs hit for more, increasing chance to breach block for Poison'},
  {a:'Grand Finale',    b:'Calculated Gamble',bond:'Enable',  bonus:8,  note:'Calculated Gamble empties and redraws hand — helps cycle through deck to empty draw pile for Grand Finale\'s 50 AoE'},

  // ── DEFECT ADDITIONS ────────────────────────────────────────
  // Focus/Orb additions
  {a:'Defragment',      b:'Loop',            bond:'Amplify',  bonus:12, note:'Loop triggers rightmost orb passive each turn — Defragment Focus makes each trigger deal more damage or generate more Block'},
  {a:'Capacitor',       b:'Defragment',      bond:'Amplify',  bonus:10, note:'More Orb slots mean each orb accumulates more passive turns before evoke — Defragment Focus multiplies every one of those ticks'},
  {a:'Loop',            b:'Hailstorm',       bond:'Enable',   bonus:10, note:'Loop triggers Frost passive each turn start — Hailstorm deals 6 AoE per Frost orb present. Loop + Frost + Hailstorm = passive AoE engine'},
  {a:'Glacier',         b:'Hailstorm',       bond:'Amplify',  bonus:10, note:'Glacier channels 2 Frost orbs — Hailstorm deals 6 AoE per Frost orb at end of turn. Each Glacier play adds 12 AoE to Hailstorm'},
  {a:'Echo Form',       b:'Coolheaded',      bond:'Amplify',  bonus:12, note:'Echo Form plays Coolheaded twice — doubles Frost channels and double-draws. 2 Frost orbs and 2 (or 4) draws from one Echo turn'},
  {a:'Biased Cognition',b:'Multi-Cast',      bond:'Finisher', bonus:12, note:'Biased Cognition bursts Focus to 4+ — Multi-Cast evokes with that peak Focus value for a massive single-target nuke'},
  // Dark additions
  {a:'Darkness',        b:'Loop',            bond:'Amplify',  bonus:10, note:'Loop triggers Dark orb passive each turn — Dark stores damage without evoke. Loop makes it grow by triggered-passive every turn'},
  // Claw additions
  {a:'All for One',     b:'FTL',             bond:'Loop',     bonus:8,  note:'All for One retrieves all 0-cost from discard including FTL — FTL is one of the 0-cost attacks returned'},
  {a:'Scrape',          b:'All for One',     bond:'Enable',   bonus:10, note:'Scrape draws 4 and discards non-0-cost — loads discard with 0-cost cards for All for One to retrieve in bulk'},
  // Lightning/Energy additions
  {a:'Voltaic',         b:'Capacitor',       bond:'Amplify',  bonus:8,  note:'Voltaic channels Lightning equal to Lightning already channeled — more Orb slots mean more Lightning accumulates before evoke'},
  {a:'Storm',           b:'Echo Form',       bond:'Amplify',  bonus:8,  note:'Storm channels Lightning per Power played — Echo Form plays the Power twice, triggering Storm twice and doubling Lightning channels'},
  {a:'Fusion',          b:'Meteor Strike',   bond:'Amplify',  bonus:8,  note:'Both generate Plasma orbs (energy) — stacking Plasma orbs gives +1 Energy per orb at turn start, compounding over the fight'},

  // ── NECROBINDER ADDITIONS ───────────────────────────────────
  // Sleight of Flesh combos
  {a:'Sleight of Flesh',b:'No Escape',       bond:'Amplify',  bonus:10, note:'No Escape applies Doom (a debuff) — Sleight of Flesh fires for 9 damage per debuff applied. Every No Escape plays Sleight'},
  {a:'Sleight of Flesh',b:'Deathbringer',    bond:'Amplify',  bonus:10, note:'Deathbringer applies Weak to all enemies — Sleight fires for 9 damage per Weak application. Deathbringer = instant 9 AoE from Sleight'},
  {a:'Sleight of Flesh',b:'Debilitate',      bond:'Amplify',  bonus:10, note:'Debilitate applies both Vulnerable and Weak — each application fires Sleight of Flesh, so Debilitate = 18 free damage from Sleight'},
  // Death March combos
  {a:'Death March',     b:'Dirge',           bond:'Amplify',  bonus:10, note:'Dirge generates X Souls added to draw pile — drawing each Soul triggers Death March\'s +3 damage per card drawn this turn'},
  {a:'Death March',     b:'Haunt',           bond:'Amplify',  bonus:8,  note:'Death March scales per card drawn — Haunt scales per Soul played. Both engines grow in tandem when Souls cycle through hand'},
  // High-value combos
  {a:'Hang',            b:'Hang',            bond:'Loop',     bonus:12, note:'Second Hang card doubles the doubling — with two Hang cards in hand, the second play deals 4x base damage to that target'},
  {a:'Reaper Form',     b:'The Scythe',      bond:'Amplify',  bonus:12, note:'Reaper Form applies Doom equal to damage dealt — The Scythe hits all enemies, applying Doom to every enemy simultaneously'},
  {a:'Reaper Form',     b:'Lethality',       bond:'Amplify',  bonus:10, note:'Lethality first Attack +50% — Reaper Form applies Doom equal to that boosted damage. Higher damage = faster Doom threshold'},
  {a:'Shroud',          b:'Deathbringer',    bond:'Amplify',  bonus:12, note:'Deathbringer applies 21 Doom AoE — Shroud gives 2 Block per Doom applied. Deathbringer alone generates 42 Block via Shroud'},
  {a:'Shroud',          b:'Scourge',         bond:'Amplify',  bonus:10, note:'Scourge applies 13 Doom and draws 1 — Shroud gives 2 Block per Doom applied = 26 Block from one Scourge play'},
  // Osty additions
  {a:'Necro Mastery',   b:'Fetch',           bond:'Amplify',  bonus:8,  note:'Fetch is a 0-cost Osty attack that enables Flatten — Necro Mastery adds +4 damage to every Osty attack including Fetch\'s'},
  {a:"Sic 'Em",         b:'Necro Mastery',   bond:'Amplify',  bonus:10, note:"Sic 'Em makes Osty attack and Summon per hit — Necro Mastery amplifies each Osty hit and the Summons grow Osty HP"},
  // Borrowed Time burst combos
  {a:'Borrowed Time',   b:'Bury',            bond:'Enable',   bonus:12, note:'Bury costs 3E for 52 damage — Borrowed Time gives +4E at cost +1 on cards. Bury Retains so it never pays the inflation cost'},
  {a:'Borrowed Time',   b:"Banshee's Cry",   bond:'Enable',   bonus:10, note:"Borrowed Time gives +4 Energy — Banshee's Cry costs up to 6E. Borrowed Time pays for Banshee's Cry with energy to spare"},
  {a:'Borrowed Time',   b:'End of Days',     bond:'Enable',   bonus:12, note:'End of Days costs 3E and executes all Doomed enemies — Borrowed Time pays for it fully and leaves 1E for setup'},

  // ── REGENT ADDITIONS ────────────────────────────────────────
  // Radiate combos
  {a:'Radiate',         b:'Genesis',         bond:'Amplify',  bonus:12, note:'Genesis gives 2 Stars per turn — Radiate deals 3 AoE per Star gained this turn = 6 free AoE every turn passively'},
  {a:'Radiate',         b:'Glow',            bond:'Amplify',  bonus:10, note:'Glow generates a Star and draws — Radiate fires 3 AoE when Stars are gained. Glow turns into draw + 3 AoE'},
  {a:'Radiate',         b:'Royal Gamble',    bond:'Finisher', bonus:12, note:'Royal Gamble generates 9 Stars at once — Radiate fires 3 AoE per Star gained = 27 AoE from one Royal Gamble play'},
  {a:'Radiate',         b:'Hidden Cache',    bond:'Amplify',  bonus:8,  note:'Hidden Cache gives 1 Star + 3 next turn — Radiate fires on each Star gain. Hidden Cache generates 12 total AoE across two turns'},
  {a:'Radiate',         b:'Shining Strike',  bond:'Amplify',  bonus:8,  note:'Shining Strike generates 2 Stars and recycles itself — Radiate fires 6 AoE each time Shining Strike is played'},
  // Child of the Stars combos
  {a:'Child of the Stars',b:'Genesis',       bond:'Amplify',  bonus:10, note:'Genesis gives 2 Stars per turn — Child of the Stars gives 2 Block per Star spent = 4 passive Block every spend-turn'},
  {a:'Child of the Stars',b:'Alignment',     bond:'Amplify',  bonus:10, note:'Alignment converts Stars to Energy — Child converts Stars to Block. Same Stars pool fuels Energy and Block simultaneously'},
  {a:'Child of the Stars',b:'Royal Gamble',  bond:'Finisher', bonus:12, note:'Royal Gamble generates 9 Stars — Child gives 2 Block per Star spent = 18 Block from one 0-cost Royal Gamble'},
  // Black Hole combos
  {a:'Black Hole',      b:'Genesis',         bond:'Amplify',  bonus:10, note:'Genesis gives 2 Stars per turn — Black Hole deals 3 AoE per Star gained or spent. Genesis alone triggers 6 AoE per turn'},
  {a:'Black Hole',      b:'Alignment',       bond:'Amplify',  bonus:10, note:'Alignment spends Stars for Energy — Black Hole fires 3 AoE per Star spent. Every Alignment activation triggers Black Hole'},
  {a:'Black Hole',      b:'Royal Gamble',    bond:'Finisher', bonus:12, note:'Royal Gamble gains 9 Stars — Black Hole fires 3 AoE per Star gained = 27 AoE in addition to all other Star payoffs'},
  // Seven Stars combos
  {a:'Seven Stars',     b:'Comet',           bond:'Amplify',  bonus:10, note:'Comet applies Weak+Vulnerable — Seven Stars then hits 7 times with Vulnerable active for massive multiplied total'},
  {a:'Seven Stars',     b:'Radiate',         bond:'Amplify',  bonus:8,  note:'Seven Stars spends 7 Stars — Radiate fires 3 AoE per Star spent = 21 extra AoE from the Stars Seven Stars consumes'},
  // Forge combos
  {a:'Seeking Edge',    b:'Conqueror',       bond:'Finisher', bonus:12, note:'Seeking Edge makes Blade hit all enemies — Conqueror doubles Blade damage this turn. AoE double-damage kill turn'},
  {a:'The Smith',       b:'Conqueror',       bond:'Finisher', bonus:10, note:'The Smith Forges +30 — Conqueror then doubles the Blade on that same massive-Forge turn for a one-shot'},
  // Void Form combos
  {a:'Void Form',       b:'Comet',           bond:'Finisher', bonus:12, note:'Void Form draws and exhausts — thinning the deck helps draw Comet consistently'},
  {a:'Big Bang',        b:'Alignment',       bond:'Amplify',  bonus:8,  note:'Big Bang gives 1 Energy + 1 Star + Forge 5, Exhaust — Alignment converts that Star to extra Energy immediately'},
  {a:'Big Bang',        b:'Radiate',         bond:'Amplify',  bonus:8,  note:'Big Bang generates a Star and draws — Radiate fires 3 AoE when Stars are gained. Big Bang becomes draw + energy + forge + 3 AoE'},
];

// ── SYNERGY PAIR SCORING ──────────────────────────────────
// Returns {bonus, reasons[]} for a given card offer given current deck
