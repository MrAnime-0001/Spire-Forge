// Engine detection and progress tracking for STS2 Build Advisor.

function getEngineTrackerItems() {
  if (!currentChar || getDeckSize() < 3) return [];
  const engines = ENGINES[currentChar];
  if (!engines) return [];

  const archClass = classifyArchetypes();
  const builds = (BUILD_DATA[currentChar] || {}).builds || {};
  const toShow = [];

  function makeItem(key, commitment, commitColor) {
    const eng = engines.find(function(e) { return e.name === key; });
    const build = builds[key];
    if (!eng || !build) return null;
    const essentialCards = eng.essential || [];
    const have = essentialCards.filter(n => deck[n] || deck[n + '+']).length;
    return { key, eng, build, have, pct: essentialCards.length ? have / essentialCards.length : 0, commitment, commitColor };
  }

  if (archClass.committed) {
    const item = makeItem(archClass.committed, 'COMMITTED', 'var(--teal-bright)');
    if (item) toShow.push(item);
  }

  archClass.building.slice(0, 2).forEach(key => {
    if (toShow.length >= 3) return;
    const item = makeItem(key, 'BUILDING', 'var(--amber-bright)');
    if (item && item.have > 0) toShow.push(item);
  });

  if (toShow.length > 0) return toShow;

  const fallback = [];
  engines.forEach(eng => {
    const have = eng.cards.filter(n => deck[n] || deck[n + '+']).length;
    if (have > 0) {
      fallback.push({
        eng,
        build: { name: eng.name, color: 'var(--amber)' },
        have,
        pct: have / eng.cards.length,
        commitment: '',
        commitColor: 'var(--text-muted)'
      });
    }
  });
  fallback.sort((a, b) => b.pct - a.pct);
  return fallback.slice(0, 1);
}
