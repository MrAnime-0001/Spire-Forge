# Spire-Forge

A high-performance, web-based **Build Advisor and Strategy Tool** for *Slay the Spire 2*. Track your deck, get real-time card pick advice, and visualize archetype build paths across all 5 playable characters.

---

## Live Demo

[https://mranime-0001.github.io/Spire-Forge/sts2-build-advisor.html](https://mranime-0001.github.io/Spire-Forge/sts2-build-advisor.html)

---

## Features

- **Real-time Card Scoring** -- Context-aware verdict for every card reward based on current deck, act, and boss.
- **Six Axes Analysis** -- Evaluates deck balance across Attack, Defense, Scaling, Velocity, Control, and Economy.
- **Crisis Detection** -- Flags critical gaps (e.g. no block by mid-Act 1) with surge scoring to steer you toward survival.
- **Synergy Engine** -- 161 synergy pairs across Ironclad, Silent, Defect, Necrobinder, and Regent.
- **Archetype Classification** -- Auto-detects active archetypes (poison, exhaust, shiv, doom, star, etc.).
- **Adaptive Phase Scaling** -- Scoring evolves across 4 phases: Ascent, Act 2 Elite Prep, Heart Push, and Beyond.
- **Boss Counter-Play** -- Advice tailored to the specific boss encounter.
- **Auto-Save & Persistence** -- Session auto-saves to localStorage; export/import JSON for sharing or backup.
- **Browse All Modal** -- Manual card search and add for theorycrafting.
- **Responsive 3-Column Layout** -- High-density dashboard with deck list, stat chips, and reward advisor panels.

## Supported Characters

Ironclad, Silent, Defect, Necrobinder, Regent

## How It Works

The engine calculates a real-time `card_score` using the current deck state:

1. **Six Axes Baseline** -- Deck stats measured across 6 dimensions; gaps produce crisis urgency scores.
2. **Archetype & Phase Weighting** -- Archetype detection combined with act-phase enforcement (tighter in later acts).
3. **Synergy Modeling** -- 161 card-to-card pairs scored with bond types: Enable, Amplify, Finisher, Loop.
4. **Boss Adaptation** -- Bonus/suppression weights based on selected boss encounter.
5. **Survival Dominance** -- Early acts prioritize survival stats; luxury scaling suppressed until baseline met.

## Project Structure

```
data/     -- Static game data: cards (per character), builds, constants, synergy pairs
core/     -- Engine: state management, deck stats, build analysis, reward advisor, storage, engine tracker
ui/       -- View layer: deck view, picker view, result view, header controls, modals, helpers
```

## Contributing

Bug reports, feedback, and pull requests welcome. Open an [issue](https://github.com/MrAnime-0001/Spire-Forge/issues) for incorrect interactions or new synergy suggestions.

---
*Built for the StS2 community. Logic based on meta-analysis and community research.*
