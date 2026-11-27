/* Native disclosure cards remain usable without scripting. */
(() => {
  const cards = [...document.querySelectorAll('.syllabus-card')];
  const controls = document.querySelector('.schedule-controls');
  controls.hidden = false;
  controls.addEventListener('click', event => {
    const action = event.target.dataset.action;
    if (action) cards.forEach(card => { card.open = action === 'expand'; });
  });
  function revealHash() {
    const target = document.getElementById(location.hash.slice(1)) ||
      [...document.querySelectorAll('a[name]')].find(link => link.name === location.hash.slice(1));
    const card = target?.closest('.syllabus-card');
    if (card) { card.open = true; target.scrollIntoView(); }
  }
  window.addEventListener('hashchange', revealHash);
  revealHash();
  let previous;
  window.addEventListener('beforeprint', () => {
    previous = cards.map(card => card.open);
    cards.forEach(card => { card.open = true; });
  });
  window.addEventListener('afterprint', () => {
    if (previous) cards.forEach((card, index) => { card.open = previous[index]; });
  });
})();
