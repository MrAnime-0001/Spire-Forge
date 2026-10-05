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

Every card gets one score (0–100) from `scoreCard` in `core/rewardAdvisor.js`. The reward tab, manual add, priority panel and upgrade list all use it:

1. **Power** — how strong the card is on its own. Class cards use the community tier list from [slaythetierlist.com](https://slaythetierlist.com/) (S 95 / A 80 / B 65 / C 45 / D 25). Untiered cards are judged from their numbers (damage/block per energy, draw, energy, scaling). Counts most in Act 1 and shrinks a little each act.
2. **Need** — fixes a weak deck axis (attack, defense, scaling, draw/energy) against the act's targets. Crisis axes count double.
3. **Fight** — matches what this act's boss and elites demand (AoE, multi-hit, burst, big block, scaling, Strength-down, status clearing). Uses the selected boss, or every boss and elite of the act.
4. **Build** — fits a build you already hold key cards for, plus known two-card combos. Grows each act, so the advisor doesn't bet on cards you may never see.
5. **Penalties** — below-average cards in a big deck, and extra copies.

PICK at 70+, CONSIDER at 50+, otherwise SKIP. If nothing on offer reaches 50, the reward tab recommends skipping. Each verdict shows up to 3 "why" chips. Co-op-only cards, curses and statuses always score 0.

Card text comes from the [Slay the Spire wiki](https://slaythespire.wiki.gg/) via `node scripts/sync-wiki-cards.mjs`. Run `node scripts/check-scoring.mjs` after changing the scorer.

## Project Structure

```
data/     — Static game data (10 files): per-character cards, constants, builds (25 archetypes), boss tips
core/     — Logic engine (5 files): state, deck stats, engine tracker, reward advisor, storage
ui/       — View layer (5 files): deck view, picker view, result view, header controls, helpers
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
