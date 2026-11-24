/* Progressive enhancement: weekly disclosures work without JavaScript. */
(() => {
  const weeks = [...document.querySelectorAll('.schedule-week')];
  const controls = document.querySelector('.schedule-controls');
  controls.hidden = false;
  controls.addEventListener('click', event => {
    const action = event.target.dataset.action;
    if (action) weeks.forEach(week => { week.open = action === 'expand'; });
  });
  const today = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Indiana/Indianapolis', year: 'numeric', month: '2-digit', day: '2-digit'
  }).format(new Date());
  const current = weeks.find(week => week.dataset.start <= today && today <= week.dataset.end);
  if (current) {
    weeks.forEach(week => { week.open = week === current; });
    document.querySelector(`.week-navigation a[href="#${current.id}"]`).setAttribute('aria-current', 'date');
  }
  function revealHash() {
    const target = document.getElementById(location.hash.slice(1));
    const week = target?.closest('.schedule-week');
    if (week) { week.open = true; week.scrollIntoView(); }
  }
  window.addEventListener('hashchange', revealHash);
  revealHash();
  let previous;
  window.addEventListener('beforeprint', () => {
    previous = weeks.map(week => week.open);
    weeks.forEach(week => { week.open = true; });
  });
  window.addEventListener('afterprint', () => {
    if (previous) weeks.forEach((week, index) => { week.open = previous[index]; });
  });
})();
