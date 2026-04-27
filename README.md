1 # Spire-Forge
    2
    3 A high-performance, web-based **Build Advisor and Strategy Tool** for *Slay the Spire 2*. Designed to track your
      deck, provide real-time card pick advice, and visualize complex archetype build paths.
    4
    5 ---
    6
    7 ## 🚀 Live Demo
    8 Access the advisor directly:
      [https://mranime-0001.github.io/Spire-Forge/](https://mranime-0001.github.io/Spire-Forge/)
    9
   10 ---
   11
   12 ## 🛠 Features
   13 Spire-Forge helps you optimize your run with data-driven decision-making:
   14 *   **Real-time Advice:** Context-aware scoring for every card reward based on your current build.
   15 *   **Archetype Tracking:** Automated classification into engine archetypes (Committed, Building, Exploring).
   16 *   **Synergy Engine:** Tracks over 140+ synergy pairs to maximize deck potential.
   17 *   **Adaptive Act Scaling:** Scoring logic that evolves as you progress from the Ascent through the Beyond.
   18 *   **Responsive UI:** A high-density, 3-column dashboard optimized for desktop and mobile screen space.
   19
   20 ## 📖 How it Works
   21 The engine calculates a complex `card_score` based on:
   22 1. **Archetype Commitment:** Weighted card counts.
   23 2. **Phase Weighting:** Stricter archetype enforcement in Act 3.
   24 3. **Synergy Modeling:** Bonus points for card-to-card dependencies.
   25 4. **Boss Adaptation:** Tips tailored to the specific boss encounter.
   26
   27 ## 📁 Project Structure
   28 - `sts2-build-advisor.html`: The main web application.
   29 - `/docs`: Technical research, scoring formulas, and engine definitions.
   30
   31 ## 🤝 Contributing
   32 Feedback, bug reports, and pull requests are welcome! If you notice an incorrect interaction or want to suggest a
      new synergy pair, please [open an issue](https://github.com/MrAnime-0001/Spire-Forge/issues).
   33
   34 ---
   35 *Built for the StS2 community. Logic based on extensive research and current meta-analysis.*
