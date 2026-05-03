// Build definitions, engine rules, and recommendation inputs.
// Keep this file data-only.

const BUILD_DATA = {
ironclad: {
  builds: {
    smash:{name:"Smash",fullName:"Smash Build",color:"#c04040",cards:["Feed","Whirlwind","Molten Fist","Pommel Strike","Headbutt","Stomp","Evil Eye"],recs:["Feed","Whirlwind","Molten Fist","Pommel Strike","Headbutt","Stomp","Evil Eye"],synergy:["Card draw","Energy gain"],rank:"A",rankNote:"Kill everything before it hurts you. Use Feed to grow Max HP so you can tank chip damage while finishing fights fast."},
    infinite:{name:"Chasing Infinites",fullName:"Chasing Infinites",color:"#4a9a8a",cards:["True Grit","Fiend Fire","Second Wind","Stoke","Dark Embrace","Vicious","Bloodletting","Spite","Burning Pact","Expect a Fight","Forgotten Ritual","Pillage","Brand"],recs:["Dark Embrace","Vicious","Pommel Strike","Bloodletting","Spite","Stoke","True Grit","Fiend Fire","Burning Pact","Expect a Fight","Forgotten Ritual","Pillage","Brand"],synergy:["Feel No Pain","Howl from Beyond","Pact's End"],rank:"S",rankNote:"Strongest Ironclad playstyle. Shrink the deck with exhaust tools, then loop draw and energy cards to play damage cards repeatedly in one turn."},
    tank:{name:"The Tank",fullName:"The Tank",color:"#4a8cba",cards:["Barricade","Body Slam","Impervious","Crimson Mantle","Unmovable"],recs:["Barricade","Body Slam","Impervious","Crimson Mantle","Unmovable"],synergy:["Feel No Pain","Second Wind","Juggernaut"],rank:"B",rankNote:"Gain massive Block and use Barricade to retain it across turns. End fights with a high-damage Body Slam."},
    strengthmax:{name:"Strength Maxing",fullName:"Strength Maxing",color:"#e8b84b",cards:["Inflame","Fight Me!","Brand","Rupture","Sword Boomerang","Whirlwind","Fiend Fire"],recs:["Inflame","Fight Me!","Brand","Rupture","Sword Boomerang","Whirlwind","Fiend Fire"],synergy:["Heavy Blade","Twin Strike","Limit Break"],rank:"A",rankNote:"Stack flat Strength with Inflame and Fight Me, then multiply it with multi-hit attacks like Sword Boomerang across targets."}
  },
  tips:{
    smash:["Focus on killing enemies before they deal significant damage — this is a race.","Use Feed to grow your Max HP so you can absorb chip damage while finishing fights.","Whirlwind is your primary damage tool — it multiplies with Strength on every hit.","Molten Fist and Stomp are your best early pickups to close fights fast.","Evil Eye helps manage enemy intent and keeps you ahead of incoming damage."],
    infinite:["Use True Grit, Fiend Fire, and Second Wind to remove low-value cards from your deck.","The loop runs on energy-generating cards: Bloodletting, Spite, Expect a Fight, Pillage.","Dark Embrace and Burning Pact are your draw engines once the deck is thin enough.","Forgotten Ritual gives Energy for each Exhausted card — your bonus energy source.","Pommel Strike upgraded cycles your deck and deals damage — take it early.","Once online, you loop your entire deck every turn for infinite Energy and damage."],
    tank:["Barricade is the entire build — do not skip it for any other card.","Body Slam deals damage equal to your current Block — your only win condition here.","Impervious gives a large burst of Block in one turn — helps you reach lethal Body Slam numbers.","Crimson Mantle guarantees you lose 1 HP per turn — synergizes with defensive self-damage loops.","Feel No Pain and Second Wind give Block from Exhaust — solid support for the Block engine.","Juggernaut converts Block gain into passive damage every turn."],
    strengthmax:["Stack flat Strength with Inflame and Fight Me — every point multiplies on every hit.","Sword Boomerang hits multiple targets — the best multi-hit card for Strength scaling.","Whirlwind hits an enemy multiple times per Energy spent — scales massively with Strength.","Fiend Fire exhausts your whole hand dealing damage per card — a Strength-scaling finisher.","Brand applies a debuff that multiplies incoming damage — combine with high Strength turns.","Heavy Blade and Limit Break both scale directly with Strength — take either when offered."]
  }
},
silent: {
  builds: {
    sly:{name:"Sly Build",fullName:"Sly Build",color:"#4a8cba",cards:["Haze","Flick-Flack","Ricochet","Acrobatics","Prepared","Tools of the Trade","Calculated Gamble","Hidden Daggers","Well-Laid Plans","Backflip","Tactician","Reflex","Hand Trick"],recs:["Haze","Flick-Flack","Ricochet","Acrobatics","Prepared","Tools of the Trade","Calculated Gamble","Hidden Daggers"],synergy:["Well-Laid Plans","Backflip","Tactician","Reflex","Hand Trick"],rank:"S",rankNote:"Best Silent build. Discard effects automatically play Sly cards for free — draws through the entire deck while generating massive Block and damage without spending energy."},
    shiv:{name:"Shiv Spam",fullName:"Shiv Spam",color:"#9a6aba",cards:["Up My Sleeve","Fan of Knives","Leading Strike","Blade of Ink","Accuracy","Knife Trap","Afterimage","Serpent Form","Strangle","Finisher","Envenom","Phantom Knives"],recs:["Up My Sleeve","Fan of Knives","Leading Strike","Blade of Ink","Accuracy","Knife Trap","Afterimage"],synergy:["Serpent Form","Strangle","Finisher","Envenom","Phantom Knives"],rank:"A",rankNote:"Generate as many 0-cost Shivs as possible. Scale damage with Accuracy, use Afterimage for Block on every Shiv played. Rare-dependent — needs Shuriken or Kunai to peak."},
    poison:{name:"Poison Tank",fullName:"Poison Tank",color:"#6aac5f",cards:["Noxious Fumes","Bouncing Flask","Snake Bite","Footwork","Leg Sweep","Shadowmeld","Abrasive","Well-Laid Plans","Burst","Accelerant","Corrosive Wave","Outbreak"],recs:["Noxious Fumes","Bouncing Flask","Snake Bite","Footwork","Leg Sweep","Shadowmeld","Abrasive","Well-Laid Plans"],synergy:["Burst","Accelerant","Corrosive Wave","Outbreak"],rank:"A",rankNote:"Focus entirely on survival. Poison provides inevitable damage — Block and weaken the enemy until Poison stacks high enough to kill them."}
  },
  tips:{
    sly:["Use discard effects to automatically play Sly cards for free — no Energy spent.","Haze, Flick-Flack, and Ricochet all trigger from discard — they are your free damage and Block.","Acrobatics and Prepared are your discard engines — play them every turn.","Tools of the Trade draws and discards automatically each turn — passive Sly trigger.","Calculated Gamble discards your whole hand and redraws — massive burst Sly turn.","Hidden Daggers discards while adding Shivs — links Sly and Shiv together for free.","Well-Laid Plans, Backflip, Tactician, Reflex, and Hand Trick all support the engine."],
    shiv:["Generate as many 0-cost Shivs as possible — volume is the win condition.","Accuracy adds flat damage to every Shiv — take every copy you find.","Afterimage gives Block every time you play a card — Shiv spam becomes passive defense too.","Up My Sleeve and Fan of Knives generate multiple Shivs in one card — core generators.","Leading Strike and Blade of Ink add Shivs while dealing direct damage.","Knife Trap is your win condition — protect a turn to set it up.","Shuriken and Kunai relics are build-defining power spikes — prioritize them above everything.","Serpent Form, Strangle, Finisher, Envenom, and Phantom Knives all extend Shiv output."],
    poison:["Focus entirely on survival — Poison provides the damage, you just stay alive.","Noxious Fumes stacks Poison every turn with no action — your passive win condition.","Bouncing Flask spreads Poison to multiple enemies — great value in multi-enemy rooms.","Footwork gives permanent Dexterity — your Block scales every single turn.","Leg Sweep and Shadowmeld are your defensive backbone — use them to survive the early game.","Abrasive and Well-Laid Plans help manage enemy Strength while Poison ticks.","Burst, Accelerant, Corrosive Wave, and Outbreak all accelerate the Poison kill."],
  }
},
defect: {
  builds: {
    frost:{name:"Frost Tank",fullName:"Frost Tank",color:"#6aacda",cards:["Glacier","Capacitor","Modded","Loop","Defragment","Biased Cog","Chill","Coolheaded","Cold Snap"],recs:["Glacier","Capacitor","Modded","Loop","Defragment","Biased Cog","Chill","Coolheaded","Cold Snap"],synergy:["Hailstorm","Coolant","Genetic Algorithm"],rank:"S",rankNote:"Fill orb slots with Frost orbs for passive Block. Use Loop to trigger the front orb repeatedly — makes you unkillable while you chip away at enemy health."},
    toolbox:{name:"Toolbox",fullName:"Energy Draw Toolbox",color:"#4a9a8a",cards:["Turbo","Hologram","Skim","Meteor Strike","Super Critical","Hot Fix","Focus Strike","Sunder"],recs:["Turbo","Hologram","Skim","Meteor Strike","Super Critical","Hot Fix","Focus Strike","Sunder"],synergy:["All for One","Tempest","Helix Drill","Reboot"],rank:"S",rankNote:"Generate massive Energy and use Hologram to retrieve the exact card needed from discard every turn. Draw your entire deck multiple times per turn."},
    lightning:{name:"Big Zap",fullName:"Big Zap Lightning",color:"#e8b84b",cards:["Storm","Thunder","Voltaic","Focused Strike","Ball Lightning","Lightning Rod","Tesla Coil"],recs:["Storm","Thunder","Voltaic","Focused Strike","Ball Lightning","Lightning Rod","Tesla Coil"],synergy:["Power spam","Focus scaling"],rank:"A",rankNote:"Purely offensive build. Evoke Lightning orbs for high immediate damage. Storm and Thunder are the core generators."},
    darkness:{name:"Dark Orbs",fullName:"Dark Orbs",color:"#9a6aba",cards:["Darkness","Shadow Shield","Dual Cast","Multi-Cast","Quad Cast","Loop"],recs:["Darkness","Shadow Shield","Dual Cast","Multi-Cast","Quad Cast","Loop"],synergy:["Focus scaling","Extra Orb Slots"],rank:"A",rankNote:"Play few orb cards and wait for Dark orbs to accumulate damage. Once powerful enough, use Dual Cast or Quad Cast to one-shot the boss."}
  },
  tips:{
    frost:["Fill your orb slots with Frost orbs — each slot generates passive Block every turn.","Loop triggers the passive effect of the front orb every turn — it is the engine.","Glacier channels two Frost Orbs for 2 Energy — the best Block value in the game.","Capacitor and Modded add orb slots — more slots means more passive Block per turn.","Biased Cog and Defragment spike your Focus — more Focus means bigger Frost orb Block.","Hailstorm converts all Frost Orbs into damage — your finisher when you need burst.","Coolant and Genetic Algorithm support your defensive scaling over a long fight."],
    toolbox:["Turbo upgraded generates Energy and draws — the core of the loop.","Hologram retrieves any card from your discard — use it to replay Turbo or Meteor Strike every turn.","Skim draws through most of your deck in one card — sets up the loop consistently.","Meteor Strike channels a Plasma Orb — each Evoke gives 2 bonus Energy.","Super Critical and Focus Strike both give Focus — supports your orb output alongside the energy engine.","Sunder deals high damage and gives Energy — your damage card in this build.","This is a pseudo-infinite — you draw and replay your best cards every single turn."],
    lightning:["Storm channels a Lightning Orb at the start of every turn — your passive engine.","Thunder deals damage scaled by your Lightning orb count and Focus — the payoff card.","Voltaic lets Lightning orbs deal damage when channelled instead of only on Evoke.","Focused Strike gives Focus and deals damage — take it every time.","Stack Focus first — every point multiplies Lightning output across all orbs.","Ball Lightning and Lightning Rod generate Lightning orbs quickly mid-fight."],
    darkness:["Darkness grows in damage every turn it is not Evoked — patience is the strategy.","Shadow Shield blocks damage equal to the Dark Orb's current value — passive defense.","Dual Cast and Quad Cast Evoke multiple times in one turn — your boss one-shot move.","Do not Evoke early — let the orb grow for several turns before firing.","Loop and Focus scaling make Darkness grow faster and hit harder per Evoke."]
  }
},
necrobinder: {
  builds: {
    soul:{name:"Soul Engine",fullName:"Soul Engine",color:"#4a9a8a",cards:["Borrowed Time","Durge","Captured Spirit","Severance","Soul Storm","Haunt","Grave Blast","Neurosurge"],recs:["Borrowed Time","Durge","Captured Spirit","Severance","Soul Storm","Haunt","Grave Blast","Neurosurge"],synergy:["Devour Life","Seance","Dredge","Grave Warden"],rank:"S",rankNote:"Generate Soul tokens to bank card draw for future turns. Use Soulstorm or Haunt to turn those deferred draws into scaling damage."},
    osty:{name:"Odi Brawler",fullName:"AI Odi Brawler",color:"#6aac5f",cards:["Squeeze","Rattle","Flatten","Scum","Fetch"],recs:["Squeeze","Rattle","Flatten","Scum","Fetch"],synergy:["Spur","High Five","Reanimate","Bone Shards"],rank:"A",rankNote:"Use Odi as both a shield and a weapon. Scum generates Block while Odi attacks. Squeeze and Rattle provide high-impact damage based on Odi's attack frequency."}
  },
  tips:{
    soul:["Soul tokens bank card draw for future turns — significantly reduces variance over a long run.","Durge, Captured Spirit, and Severance all create Souls — take multiples of each.","Soul Storm damages all enemies based on how many Souls you have played this combat.","Haunt deals passive HP loss to enemies each turn — scales as your Soul count grows.","Grave Blast retrieves any card from your discard — use it to replay Soul creators.","Neurosurge and Borrowed Time fuel your burst turns once the Soul engine is online.","Devour Life and Seance add both offense and draw to your Soul payoff turns."],
    osty:["Scum generates Block whenever Odi attacks — your defensive engine in this build.","Squeeze triggers Odi attacks rapidly — your best 0-cost aggressive card.","Rattle and Flatten are your high-impact damage cards — combo them with Squeeze.","Fetch retrieves a card from your discard — keeps Rattle or Squeeze in play.","Spur, High Five, and Reanimate all extend Odi's effectiveness across fights.","Bone Shards deals damage per card played — pairs well with the high volume of Odi cards."]
  }
},
regent: {
  builds: {
    starfall:{name:"Starfall",fullName:"Starfall Storm",color:"#6aacda",cards:["Radiate","Stardust","Royal Gamble","Decisions Decisions","Hidden Cash","Genesis","Knockout Blow","Glow"],recs:["Radiate","Stardust","Royal Gamble","Decisions Decisions","Hidden Cash","Genesis","Knockout Blow","Glow"],synergy:["Vigor","Powder","Terraforming","Lunar Blast","7 Stars"],rank:"S",rankNote:"Plan A for Regent. Spend turns blocking while stacking Star and Vigor. Use Royal Gamble for massive Star generation then Radiate to hit every enemy for massive damage."},
    midrange:{name:"Star Mid-range",fullName:"Star Mid-range Good Stuff",color:"#4a9a8a",cards:["Child of the Stars","Genesis","Comet","Reflect","Astral Pulse","Void Form","Big Bang"],recs:["Child of the Stars","Genesis","Comet","Reflect","Astral Pulse","Void Form","Big Bang"],synergy:["Convergence","Glow","Hidden Cash"],rank:"S",rankNote:"Use Child of the Stars to gain free passive Block whenever you gain Star. Spend all Energy on powerful attacks and skills while Star generation handles defense."},
    infinite:{name:"Deck Infinite",fullName:"Deck Thin Infinite",color:"#4a8cba",cards:["Guards","Be Gone","Charge","Tyranny","Alignment","Glow"],recs:["Guards","Be Gone","Charge","Tyranny","Alignment","Glow"],synergy:["Radiate","Lunar Blast"],rank:"S",rankNote:"Use Guards and Be Gone to exhaust a large portion of your deck. Once small enough, loop Alignment and Glow for infinite Star and Energy."}
  },
  tips:{
    starfall:["Spend early turns blocking and stacking Star and Vigor — do not spend Stars early.","Royal Gamble generates Stars in bulk on your pop-off turn — it is the trigger card.","Radiate hits every enemy for damage multiplied by Stars generated — your win condition.","Vigor from Powder and Terraforming multiplies every hit of Radiate — stack it before firing.","Decisions Decisions manipulates your hand to set up the perfect burst turn.","Lunar Blast and 7 Stars both pair well as payoffs alongside Radiate."],
    midrange:["Child of the Stars gives free passive Block whenever you gain Star — your defense engine.","With Child of the Stars online, spend all your Energy on attacks and skills.","Genesis is a self-sustaining Star engine — take it every time it appears.","Comet attacks and generates a Star — efficient at every stage of the game.","Reflect redirects damage back at attackers — incredible defensive value.","Void Form and Big Bang are your rare power spikes — take either when offered.","Convergence and Glow support the Star generation that feeds Child of the Stars."],
    infinite:["Guards and Be Gone are your deck thinners — exhaust as many cards as possible early.","Alignment converts Stars to Energy — enables massive combo turns once the deck is thin.","Glow generates Stars passively — loop it with Alignment once the deck is small enough.","The thinner the deck, the faster you hit Alignment and Glow every cycle.","Radiate or Lunar Blast as your payoff once the loop is running — one-shots any boss.","Tyranny and Charge give additional ways to thin and manipulate the deck early."]
  }
}
};

// Per-build engine/cycle callouts — cards you need to make the core loop work.
// Shown above "priority to find" in the build panel.
const BUILD_ENGINES = {
  ironclad: {
    smash:        {cards:['Whirlwind','Feed','Molten Fist'],                label:'Smash engine — kill fast with high-damage attacks, grow Max HP with Feed'},
    infinite:     {cards:['Dark Embrace','Bloodletting','Burning Pact'],    label:'Infinite loop — shrink deck with exhaust, loop energy and draw indefinitely'},
    tank:         {cards:['Barricade','Body Slam','Impervious'],            label:'Tank engine — retain Block with Barricade, convert to damage with Body Slam'},
    strengthmax:  {cards:['Inflame','Sword Boomerang','Whirlwind'],         label:'Strength engine — flat Strength into multi-hit multipliers'}
  },
  silent: {
    sly:     {cards:['Haze','Flick-Flack','Tools of the Trade'],          label:'Sly cycle — discard triggers free Sly cards every turn'},
    shiv:    {cards:['Accuracy','Knife Trap','Afterimage'],               label:'Shiv engine — scale Shiv damage with Accuracy, Block with Afterimage'},
    poison:  {cards:['Noxious Fumes','Footwork','Shadowmeld'],            label:'Poison tank — passive Poison kills while defense keeps you alive'}
  },
  defect: {
    frost:      {cards:['Glacier','Loop','Capacitor'],               label:'Frost cycle — passive Block per slot per turn, unkillable when online'},
    toolbox:    {cards:['Turbo','Hologram','Meteor Strike'],          label:'Toolbox loop — Hologram retrieves Turbo or Meteor Strike every turn'},
    lightning:  {cards:['Storm','Thunder','Focused Strike'],          label:'Lightning engine — passive orb generation, Focus multiplies burst damage'},
    darkness:   {cards:['Darkness','Shadow Shield','Dual Cast'],      label:'Darkness engine — accumulate Dark Orb damage, one-shot boss with Dual Cast'}
  },
  necrobinder: {
    soul:  {cards:['Captured Spirit','Severance','Soul Storm'],    label:'Soul engine — bank draw with Soul tokens, convert to damage with Soulstorm'},
    osty:  {cards:['Squeeze','Rattle','Scum'],                     label:'Odi cycle — Squeeze and Rattle burst damage, Scum generates Block'}
  },
  regent: {
    starfall: {cards:['Radiate','Royal Gamble','Glow'],                 label:'Starfall burst — bulk Stars into Radiate for one-shot nuke turn'},
    midrange: {cards:['Child of the Stars','Genesis','Comet'],          label:'Value cycle — Child of the Stars converts Star gain to free Block every turn'},
    infinite: {cards:['Guards','Be Gone','Alignment'],                  label:'Infinite loop — thin deck with Guards and Be Gone, loop Alignment and Glow'}
  }
};

const SAFE_PICKS = {
  ironclad: {
    early: ['Pommel Strike','Headbutt','Feel No Pain','True Grit','Shrug It Off','Second Wind'],
    generic: ['Offering','Brand','True Grit','Spite','Battle Trance','Shrug It Off','Second Wind']
  },
  silent: {
    early: ['Acrobatics','Leg Sweep','Footwork','Well-Laid Plans','Prepared','Dagger Throw','Backflip'],
    generic: ['Acrobatics','Well-Laid Plans','Leg Sweep','Footwork','Afterimage','Prepared','Dagger Throw','Backflip','Adrenaline','Serpent Form']
  },
  defect: {
    early: ['Boot Sequence','Defragment','Skim','Hologram','Coolheaded','FTL'],
    generic: ['Hologram','Skim','Defragment','Loop','Capacitor','Modded','Coolheaded','Double Energy']
  },
  necrobinder: {
    early: ['Reap','Defy','Snap','Fetch','Grave Warden','Friendship'],
    generic: ['Borrowed Time','Defy','Snap','Neurosurge','Fetch','Grave Warden','Friendship','Wisp']
  },
  regent: {
    early: ['Decisions Decisions','Cloak of Stars','Convergence','Solar Strike','Prophesize','Glimmer'],
    generic: ['Cloak of Stars','Convergence','Alignment','Glow','Decisions Decisions','Prophesize','Glimmer','Photon Cut']
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
