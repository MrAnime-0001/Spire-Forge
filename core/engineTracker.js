// Engine detection and progress tracking for STS2 Build Advisor.

function getEngineTrackerItems() {
  if (!currentChar || getDeckSize() < 3) return [];
  const engines = ENGINES[currentChar];
  if (!engines) return [];

  const result = [];
  engines.forEach(eng => {
    const have = eng.cards.filter(n => deck[n] || deck[n + '+']).length;
    if (have > 0) {
      result.push({
        eng,
        build: { name: eng.name, color: 'var(--amber)' },
        have,
        pct: have / eng.cards.length,
        commitment: '',
        commitColor: 'var(--text-muted)'
      });
    }
  });
  result.sort((a, b) => b.pct - a.pct);
  return result;
}
