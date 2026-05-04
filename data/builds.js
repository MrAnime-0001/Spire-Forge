// Build definitions and recommendation inputs.
// Keep this file data-only.

const BUILD_DATA = {
ironclad: {
  builds: {
    strength:{name:"Strength",fullName:"Strength Build",color:"#e8b84b",rank:"A",winCondition:"Stack Strength, then use multi-hit attacks to multiply damage across every hit.",essential:["Fight Me!","Inflame","Twin Strike","Whirlwind","Rupture"],synergy:["Demon Form","Thrash","Brand","Pommel Strike"],tips:["Multi-hit cards are your best attacks. Each hit benefits from Strength independently.","Vulnerable doubles your damage on big hits. Pair it with high-Strength swings.","Extra Energy lets you set up Strength and still attack in the same turn."]},
    block:{name:"Block",fullName:"Block Build",color:"#4a8cba",rank:"B",winCondition:"Stack Block with Barricade active, then use Body Slam to deal damage equal to your current Block.",essential:["Body Slam","Barricade","Juggernaut","Taunt","Shrug It Off"],synergy:["Impervious","Flame Barrier","Crimson Mantle","Stone Armor","True Grit"],tips:["Passive armor sources help you stack Block without spending cards.","Weak and Strength reduction on enemies preserve your Block by lowering incoming damage."]},
    exhaust:{name:"Exhaust",fullName:"Exhaust Build",color:"#4a9a8a",rank:"S",winCondition:"Use Corruption to play all Skills for free, Exhaust them, then cycle with Dark Embrace and generate passive Block via Feel No Pain.",essential:["Corruption","Dark Embrace","Feel No Pain","Juggernaut","Ashen Strike"],synergy:["Offering","Pact's End","Body Slam","Brand","Thrash","Evil Eye","Burning Pact","Forgotten Ritual","True Grit"],tips:["Primarily run Skill cards. The more Skills you Exhaust, the more Block and draw you generate.","Finishers are Ashen Strike, Body Slam, and Pact's End. Build toward those as closers.","Vulnerable on enemies increases finisher damage significantly."]},
    bloodletting:{name:"Bloodletting",fullName:"Bloodletting Build",color:"#c04040",rank:"B",winCondition:"Deliberately take HP damage to trigger Rupture and Inferno, scaling Strength and AoE damage simultaneously.",essential:["Rupture","Inferno","Breakthrough","Crimson Mantle"],synergy:["Tear Asunder","Offering","Hemokinesis","Brand","Feed","Bloodletting"],tips:["The Pain curse actually helps this deck. 1 HP per card played triggers Rupture.","Once Strength is stacked, multi-hit cards multiply damage across every hit."]},
    strike:{name:"Strike",fullName:"Strike Build",color:"#c07840",rank:"B",winCondition:"Use Perfected Strike as a nuke. Every Strike-type card in your deck adds damage to it.",essential:["Perfected Strike","Twin Strike","Expect a Fight","Pommel Strike","Taunt"],synergy:["Hellraiser","Pyre","Colossus","Breakthrough","Cruelty","Tremble"],tips:["Do not add every Strike-type card just to juice Perfected Strike. The scaling is not worth mediocre filler.","This deck lacks Block. Make sure to pick up defensive options alongside your Strike package.","Extra Energy is very helpful with a 2 Energy finisher. Prioritize Energy relic offers."]}
  }
},
silent: {
  builds: {
    shiv:{name:"Shiv",fullName:"Shiv Build",color:"#9a6aba",rank:"A",winCondition:"Generate as many Shivs as possible, buff them with Accuracy, then unload for massive burst damage.",essential:["Accuracy","Infinite Blades","Knife Trap","Leading Strike","Cloak and Dagger","Blade Dance"],synergy:["Finisher","Serpent Form","Afterimage","Hidden Daggers","Fan of Knives"],tips:["Even one or two Shiv generators can enable combat relic effects without a full Shiv commitment."]},
    poison:{name:"Poison",fullName:"Poison Build",color:"#6aac5f",rank:"A",winCondition:"Stack Poison as fast as possible, then use Accelerant to multiply damage as it ticks each turn.",essential:["Accelerant","Noxious Fumes","Deadly Poison","Poisoned Stab","Bubble Bubble"],synergy:["Outbreak","Burst","Haze","Mirage"],tips:["Your first few turns are defensive. Surviving long enough for Poison to ramp is the whole game plan.","Artifact on enemies blocks Poison application entirely. Plan around it.","AoE coverage is limited in STS2. Haze, Outbreak, and Accelerant are your main tools."]},
    sly:{name:"Sly",fullName:"Sly Build",color:"#4a8cba",rank:"S",winCondition:"Cycle your hand rapidly, trigger Sly cards for free plays, and chain together high-value cards across a single turn.",essential:["Tactician","Tools of the Trade","Untouchable","Acrobatics","Flick-Flack"],synergy:["Master Planner","Serpent Form","Calculated Gamble","Speedster","Abrasive","Ricochet","Prepared","Haze","Reflex","Dagger Throw"],tips:["Keep the deck thin. Hitting Tactician every cycle is non-negotiable.","The best damage outside of Speedster and Serpent Form comes from adding a small Poison package alongside Haze.","Remove Strikes as fast as possible."]}
  }
},
defect: {
  builds: {
    claw:{name:"Claw",fullName:"Claw Build",color:"#e8b84b",rank:"A",winCondition:"Cycle 0-cost cards repeatedly, especially Claw. Each Claw played this combat increases the damage of all future Claws.",essential:["Claw","Scrape","All for One","Feral","FTL","Hologram"],synergy:["Panache","Momentum Strike","Machine Learning","Secret Weapon","Skim","Flash of Steel","Beam Cell","Go for the Eyes"],tips:["Do not stuff the deck with every 0-cost card you see. You primarily want to draw Claw. A bloated deck dilutes it.","Stacking some Frost passively for Block is worthwhile since you don't rely on Orbs."]},
    simpleorb:{name:"Simple Orb",fullName:"Simple Orb Build",color:"#6aacda",rank:"S",winCondition:"Channel Orbs consistently to trigger their passive effects and Evoke them for burst. Focus on Lightning for damage and Frost for Block.",essential:["Defragment","Coolheaded","Capacitor","Loop","Compile Driver"],synergy:["Multi-Cast","Voltaic","Tesla Coil","Thunder","Hailstorm","Modded","Chaos","Glacier","Ball Lightning","Cold Snap","Barrage","Lightning Rod"],tips:["Channelling new Orbs pushes old ones out and Evokes them. You do not need huge Orb slot counts in a balanced Orb deck.","High Focus and multiple Channel effects per turn is the primary path to consistent Evoke triggers.","To play more defensively, increase Orb slots and focus on Frost Channels. This also gives Dark Orbs time to grow behind your Frost coverage."]}
  }
},
necrobinder: {
  builds: {
    doom:{name:"Doom",fullName:"Doom Build",color:"#9a6aba",rank:"A",winCondition:"Apply Doom stacks to enemies. When their HP drops to or below their Doom count, they die at the end of their turn.",essential:["No Escape","Deathbringer","Death's Door","Negative Pulse","Shroud","Blight Strike"],synergy:["End of Days","Time's Up","Oblivion","Delay","Defile","Scourge"],tips:["Doom's delayed kill is its core weakness. Build enough Block to survive until it triggers.","A small Soul package for card draw helps you find your key Doom cards consistently."]},
    osty:{name:"Osty",fullName:"Osty Build",color:"#6aac5f",rank:"A",winCondition:"Keep Osty alive and grow its HP through Summon effects. Use Osty as a permanent front-line tank that never loses its HP at end of turn.",essential:["Rattle","Sic 'Em","Pull Aggro","High Five","Fetch"],synergy:["Necro Mastery","Flatten","Reanimate","Spur","Snap"],tips:["There is a sacrifice variant using cards like Bone Shards that plays very differently. Do not mix the two approaches."]}
  }
},
regent: {
  builds: {
    sovereignblade:{name:"Sovereign Blade",fullName:"Sovereign Blade Build",color:"#e8b84b",rank:"A",winCondition:"Forge the Sovereign Blade to high damage, then use Summon Forth and Conqueror to loop it back into play and double its value.",essential:["Summon Forth","Conqueror","Beat into Shape","Wrought in War","Bulwark","Cosmic Indifference"],synergy:["Seeking Edge","Furnace"],tips:["Find lasting Energy generation. Balancing Blade plays with Forging and staying alive is resource-intensive.","A small Star package helps. Falling Star and Gamma Blast both apply Vulnerable on the same turn as a Blade attack."]},
    star:{name:"Star",fullName:"Star Build",color:"#6aacda",rank:"S",winCondition:"Build a reliable Star engine, then use Alignment to convert Stars into Energy for explosive, high-damage turns.",essential:["Shining Strike","Genesis","Alignment","Gamma Blast","Hidden Cache"],synergy:["The Smith","Reflect","Dying Star","Cloak of Stars","Convergence","Gather Light","Solar Strike","Glow"],tips:["Do not over-commit to Stars early. Pick up generic cards that work even if you never fully build the Star engine.","Avoid too many pure Star generators. They do nothing on their own and clog your hand. The same risk applies to Star-cost cards drawn together."]}
  }
}
};


const SYNERGY_PAIRS = [
  // ── IRONCLAD ──────────────────────────────────────────────
  {a:'Corruption',       b:'Dark Embrace',    bond:'Enable',   bonus:12, note:'Every Skill Exhausted draws 1 — Corruption triggers this constantly'},
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
  {a:'Void Form',        b:'Seven Stars',     bond:'Finisher', bonus:14, note:'Void Form makes first 2 cards free next turn — Seven Stars in opening 2 = free 49 AoE'},
  {a:'Seven Stars',      b:'Genesis',         bond:'Enable',   bonus:10, note:'Genesis gives 2 Stars/turn — after 3-4 turns Seven Stars (7★ cost) becomes playable'},
  {a:'Comet',            b:'Child of the Stars',bond:'Amplify',bonus:8,  note:'Child gives 2 Block per Star spent — Comet spends 5 Stars so gives 10 Block simultaneously'},
  {a:'Bulwark',          b:'Conqueror',       bond:'Finisher', bonus:12, note:'Bulwark Forges Blade (+10) — Conqueror doubles damage this turn. Burst kill setup'},
  {a:'Seeking Edge',     b:'Summon Forth',    bond:'Amplify',  bonus:10, note:'Seeking Edge makes Blade hit all enemies — Summon Forth fetches it. AoE Blade turn'},
  {a:'Convergence',      b:'Void Form',       bond:'Loop',     bonus:10, note:'Convergence Retains hand + refunds energy. Void Form gives free plays next turn. Stacks perfectly'},

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
  {a:'Void Form',       b:'Comet',           bond:'Finisher', bonus:12, note:'Void Form: first 2 cards next turn are free — Comet costs 3E. A free Comet delivers 33 damage + Weak + Vulnerable at no cost'},
  {a:'Big Bang',        b:'Alignment',       bond:'Amplify',  bonus:8,  note:'Big Bang gives 1 Energy + 1 Star + Forge 5, Exhaust — Alignment converts that Star to extra Energy immediately'},
  {a:'Big Bang',        b:'Radiate',         bond:'Amplify',  bonus:8,  note:'Big Bang generates a Star — Radiate fires 3 AoE when Stars are gained. Big Bang becomes draw + energy + forge + 3 AoE'},
];

// ── SYNERGY PAIR SCORING ──────────────────────────────────
// Returns {bonus, reasons[]} for a given card offer given current deck
