/* Copyright (c) 2026 Rose-Hulman Institute of Technology CSSE Department.
 * SPDX-License-Identifier: MIT. See ../../../LICENSE. */
(() => {
  'use strict';
  const sections = [...document.querySelectorAll('.lecture-section')];
  const links = [...document.querySelectorAll('.contents a')];
  const read = document.querySelector('#read');
  const present = document.querySelector('#present');
  const previous = document.querySelector('#previous');
  const next = document.querySelector('#next-section');
  const position = document.querySelector('#position');
  let current = 0;
  let mode = 'read';
  let pendingScroll = false;
  const hashIndex = () => sections.findIndex(section => '#' + section.id === location.hash);
  const headerBottom = () => document.querySelector('.toolbar').getBoundingClientRect().bottom + 30;
  function nearestSection() {
    const anchor = headerBottom();
    // The section intersecting the reading line is the user's current section.
    const containing = sections.findIndex(section => {
      const rect = section.getBoundingClientRect();
      return rect.top <= anchor && rect.bottom > anchor;
    });
    if (containing >= 0) return containing;
    return sections.reduce((best, section, i) =>
      Math.abs(section.getBoundingClientRect().top - anchor) <
      Math.abs(sections[best].getBoundingClientRect().top - anchor) ? i : best, 0);
  }
  function update() {
    sections.forEach((section, i) => { section.hidden = mode === 'present' && i !== current; });
    links.forEach((link, i) => {
      if (i === current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    previous.disabled = current === 0;
    next.disabled = current === sections.length - 1;
    position.textContent = `${current + 1} / ${sections.length}`;
  }
  function navigate(index, focus = true) {
    current = Math.max(0, Math.min(sections.length - 1, index));
    update();
    history.replaceState(null, '', '#' + sections[current].id);
    window.scrollTo({ top: Math.max(0, window.scrollY + sections[current].getBoundingClientRect().top - headerBottom()), behavior: 'instant' });
    if (focus) sections[current].querySelector('h1,h2').focus({ preventScroll: true });
  }
  function setMode(value) {
    if (value === mode) return;
    if (mode === 'read') current = nearestSection();
    mode = value;
    document.body.dataset.mode = mode;
    read.setAttribute('aria-pressed', String(mode === 'read'));
    present.setAttribute('aria-pressed', String(mode === 'present'));
    navigate(current, false);
  }
  read.addEventListener('click', () => setMode('read'));
  present.addEventListener('click', () => setMode('present'));
  previous.addEventListener('click', () => navigate(current - 1));
  next.addEventListener('click', () => navigate(current + 1));
  links.forEach((link, index) => link.addEventListener('click', event => {
    event.preventDefault(); navigate(index);
  }));
  window.addEventListener('hashchange', () => { const i = hashIndex(); if (i >= 0) navigate(i); });
  window.addEventListener('scroll', () => {
    if (mode !== 'read' || pendingScroll) return;
    pendingScroll = true;
    requestAnimationFrame(() => {
      pendingScroll = false;
      if (mode === 'read') { current = nearestSection(); update(); }
    });
  }, { passive: true });
  document.addEventListener('keydown', event => {
    if (mode !== 'present' || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.key === 'Escape') { event.preventDefault(); setMode('read'); read.focus(); return; }
    if (event.target.closest('button,a,input,select,textarea,[contenteditable="true"]')) return;
    const destinations = { ArrowRight: current + 1, PageDown: current + 1,
      ArrowLeft: current - 1, PageUp: current - 1, Home: 0, End: sections.length - 1 };
    if (Object.hasOwn(destinations, event.key)) { event.preventDefault(); navigate(destinations[event.key]); }
  });
  document.querySelector('.mode-controls').hidden = false;
  document.querySelector('.lecture-controls').hidden = false;
  document.body.dataset.mode = mode;
  current = Math.max(0, hashIndex());
  update();
  if (location.hash && hashIndex() >= 0) requestAnimationFrame(() => navigate(current, false));
})();
