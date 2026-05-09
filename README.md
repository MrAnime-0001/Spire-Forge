# STS2 Build Advisor

High-performance web-based **Build Advisor and Strategy Tool** for *Slay the Spire 2*. Track deck, get real-time card pick advice, and visualize archetype build paths across all 5 playable characters.

---

## Features

- **Real-time Card Scoring** — Context-aware verdict for every card reward based on current deck, act, ascension, and boss.
- **Six Axes Analysis** — Deck balance across Attack, Defense, Scaling, Consistency, Efficiency, and Synergy.
- **Crisis Detection** — Flags critical gaps (e.g. no block by mid-Act 1) with surge scoring toward survival.
- **Synergy Engine** — 200+ synergy pairs across Ironclad, Silent, Defect, Necrobinder, and Regent.
- **Archetype Classification** — Auto-detects active archetypes (poison, exhaust, shiv, doom, star, etc.).
- **Adaptive Phase Scaling** — Scoring evolves across 4 phases: Ascent, Act 2 Elite Prep, Heart Push, and Beyond.
- **Boss Counter-Play** — Strategy panel with attack patterns, kill order, and deck matchup analysis for every boss and elite.
- **Engine Tracker** — Build status panel showing committed/building archetypes with progress bars.
- **Eradicate Burst Estimator** — For Necrobinder: estimates max Eradicate damage ceiling based on energy generation.
- **Auto-Save & Persistence** — Session auto-saves to localStorage; export/import JSON; named loadouts (up to 20).
- **Shop Removal Advice** — Prioritizes cards to remove: starters > curses > anti-synergy > falloff > duplicates.
- **Browse All Modal** — Manual card search/add for theorycrafting.
- **Responsive 3-Column Layout** — Deck list, stat chips, and reward advisor panels.

## Supported Characters

Ironclad, Silent, Defect, Necrobinder, Regent

### Build Archetypes

| Character | Builds |
|-----------|--------|
| Ironclad | Strength, Block, Exhaust, Bloodletting, Strike |
| Silent | Shiv, Poison, Sly |
| Defect | Claw, Simple Orb |
| Necrobinder | Doom, Osty |
| Regent | Sovereign Blade, Star |

## How It Works

Engine calculates real-time `card_score` using current deck state:

1. **Six Axes Baseline** — Deck stats across 6 dimensions; gaps produce crisis urgency scores.
2. **Archetype & Phase Weighting** — Archetype detection combined with act-phase enforcement.
3. **Synergy Modeling** — 200+ card-to-card pairs scored with bond types: Enable, Amplify, Finisher, Loop.
4. **Boss Adaptation** — Bonus/suppression weights based on selected boss and region.
5. **Survival Dominance** — Early acts prioritize survival; luxury scaling suppressed until baseline met.
6. **Eradicate Estimates** — For Necrobinder: calculates burst ceiling from energy generation.

## Project Structure

```
data/     — Static game data (9 files): per-character cards, builds, constants, synergy pairs
core/     — Logic engine (6 files): state, deck stats, build analysis, reward advisor, engine tracker, storage
ui/       — View layer (6 files): deck view, picker view, result view, header controls, modals, helpers
scripts/  — Tooling (4 files): card type classifier, Regent card generator, balance test runner + scenarios
```

## Browser Support

Tested in modern browsers (Chrome, Firefox, Edge). Requires ES6 support.

## Contributing

Bug reports, feedback, and pull requests welcome. Open an [issue](https://github.com/MrAnime-0001/Spire-Forge/issues) for incorrect interactions or new synergy suggestions.

---
*Built for the StS2 community. Logic based on meta-analysis and community research.*
