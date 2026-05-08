# STS2 Build Advisor — Project System Map

This document provides a high-level overview of the application architecture to assist with future implementations and maintenance.

## Directory Structure

```text
/
├── sts2-build-advisor.html  # Main entry point, layout, and event wiring
├── data/
│   ├── constants.js         # Massive lookup: Tiers, Boss Matrix, Thresholds, and Act advice
│   ├── cards.js             # Full library of card definitions (Name, Type, Rarity)
│   └── builds.js            # Build specs, core engines, and specific synergy pairs
├── core/
│   ├── state.js             # Central state (deck, char, act) & Pub/Sub event system
│   ├── deckStats.js         # Deck-wide analysis (Atk/Def/Scl/Vel balance)
│   ├── buildAnalyzer.js     # Scoring logic for builds and Archetype detection
│   ├── engineTracker.js     # Progress monitoring for specific core card engines
│   ├── rewardAdvisor.js     # Card Verdict logic (Scores vs. Bosses/Archetypes)
│   └── storage.js           # Persistence: AutoSave, Restore Toast, and JSON Import/Export
├── ui/
│   ├── resultView.js        # Build advisor display & Priority Panel (what to look for)
│   ├── pickerView.js        # Inline reward picker with "Engine Piece" highlighting
│   ├── deckView.js          # Interactive deck list and Stat Chip visualization
│   ├── headerControls.js    # Run config (Act/Asc/Gold) and Region/Boss Strategy UI
│   ├── helpers.js           # Global UI utilities: Tier badges and rarity labels
│   └── modals.js            # "Browse All" modal for manual card addition
└── scripts/
    └── classify-card-types.js  # Rewrites card types in data/cards.js using keyword mapping,
                                #   orb-channel patterns, and per-card overrides. Run with:
                                #   node scripts/classify-card-types.js
```

## Core Systems

### 1. State Management (`core/state.js`)
The application uses a central state object. All mutations should happen through helper functions (e.g., `addCard`, `setAsc`, `setChar`).
*   **Pub/Sub**: Use `subscribe(callback)` to register UI re-renderers. 
*   **Notification**: Mutation functions call `notifyListeners()` which triggers all subscribed UI updates.
*   **Persistence**: `core/storage.js` hooks into the state to provide non-destructive session restoration and manual saves.

### 2. Logic vs. UI Separation
*   **Logic (`core/`)**: "The Brain." Calculates scores, detects archetypes, and evaluates card value based on boss matchups and deck size.
*   **UI (`ui/`)**: "The Face." Components are reactive; they don't hold state, they simply render the current state provided by `core/` functions.
*   **Data (`data/`)**: "The Knowledge Base." Strictly static data. `constants.js` is the most critical file for game balance and strategy mapping.

### 3. Build Analysis & Scoring
*   **Archetypes**: `detectDeckArchetypes` (in `buildAnalyzer.js`) tags the deck with traits like `poison`, `exhaust`, or `small-deck`.
*   **Verdicts**: `scoreCard` (in `rewardAdvisor.js`) is the primary advisor logic. It combines tier data, boss anti-synergy, and current deck needs into a single recommendation (e.g., "ENGINE PIECE", "BOSS COUNTER").

## Workflow: Adding a Feature
1.  **Define Data**: Update `data/constants.js` for new boss logic or `data/builds.js` for new archetypes.
2.  **Implement Logic**: Add calculations to `core/` (e.g., adding a new stat to `deckStats.js`).
3.  **Update State**: If tracking new data (like Relics), add to the state object in `core/state.js`.
4.  **Wire UI**: Update or create a UI component in `ui/` and ensure its `render` function is in the `subscribe` list in `sts2-build-advisor.html`.

## Global State Variables
*   `deck`: Object mapping card name to quantity.
*   `currentChar`: Current character (Ironclad, Silent, etc.).
*   `currentAsc`: Current Ascension level (0-10).
*   `currentAct`: Current game Act (1-3).
*   `selectedBoss`: Currently tracked boss for specific counter-play advice.
