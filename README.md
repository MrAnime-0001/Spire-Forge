# STS2 Build Advisor

High-performance web-based **Build Advisor and Strategy Tool** for *Slay the Spire 2*. Track deck, get real-time card pick advice, and visualize archetype build paths across all 5 playable characters.

---

## Features

- **Real-time Card Scoring** — Context-aware verdict for every card reward based on current deck, act, ascension, and boss.
- **Six Axes Analysis** — Deck balance across Attack, Defense, Scaling, Consistency, Efficiency, and Synergy.
- **Crisis Detection** — Flags critical gaps (e.g. no block by mid-Act 1) with surge scoring toward survival.
- **Build Detection** — Identifies active build archetypes from 25 defined builds across all 5 characters. Labels cards as core/synergy per build.
- **Archetype Classification** — Auto-detects active archetypes (poison, exhaust, shiv, doom, star, etc.).
- **Adaptive Phase Scaling** — Scoring evolves across 4 phases: Ascent, Act 2 Elite Prep, Heart Push, and Beyond.
- **Boss Counter-Play** — Strategy panel with attack patterns, kill order, and deck matchup analysis for every boss and elite.
- **Engine Tracker** — Build status panel showing committed/building archetypes with progress bars.
- **Auto-Save & Persistence** — Session auto-saves to localStorage; export/import JSON; named loadouts (up to 20).
- **Browse All Modal** — Manual card search/add for theorycrafting.
- **Responsive 3-Column Layout** — Deck list, stat chips, and reward advisor panels.

## Supported Characters

Ironclad, Silent, Defect, Necrobinder, Regent — **571 unique cards** (1,106 counting upgrades) across all characters and colorless pool.

### Build Archetypes (25 across 5 characters)

| Character | Builds |
|-----------|--------|
| Ironclad | Strength, Block, Exhaust, Bloodletting, Strike, Self-Wound |
| Silent | Shiv, Poison, Sly, Grand Finale, Envenom, Combo |
| Defect | Claw, Lightning, Frost, Dark Orb, Creative AI |
| Necrobinder | Doom, Osty, Soul, Reaper |
| Regent | Forge, Star Burst, Void Form, Bombardment |

## How It Works

Engine calculates real-time `card_score` using current deck state:

1. **Six Axes Baseline** — Deck stats across 6 dimensions; gaps produce crisis urgency scores.
2. **Build Detection** — 25 build archetypes matched against deck; cards tagged as core/synergy per build.
3. **Phase-Aware Scaling** — Act-phase enforcement with survival dominance in early acts.
4. **Ascension Context** — Guide-derived bonuses per ascension tier (A5–A18) with per-character priority boosts.
5. **Combat Mechanics** — AoE urgency, multi-hit + Strength synergy, Overgrowth elite timing.
6. **Boss Adaptation** — Bonus/suppression weights based on selected boss and region.

## Project Structure

```
data/     — Static game data (10 files): per-character cards, constants, builds (25 archetypes), boss tips
core/     — Logic engine (5 loaded + 1 on-disk): state, deck stats, engine tracker, reward advisor, storage. (buildAnalyzer.js exists but not loaded in HTML)
ui/       — View layer (6 files): deck view, picker view, result view, header controls, modals, helpers
assets/   — 32 PNG icons for status effects and character energy
scripts/  — Tooling (4 files): card type classifier, data generators, balance test scenarios
```

**~16,300 lines across 27 source files (22 loaded in HTML).**

## Browser Support

Tested in modern browsers (Chrome, Firefox, Edge). Requires ES6 support.

## Contributing

Bug reports, feedback, and pull requests welcome. Open an [issue](https://github.com/MrAnime-0001/Spire-Forge/issues) for incorrect interactions or new synergy suggestions.

---
*Built for the StS2 community. Logic based on meta-analysis and community research.*
