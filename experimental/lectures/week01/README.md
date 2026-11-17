# Week 1 hybrid lecture prototype

Week 1 prototype: Data Acquisition and Understanding Your Data. Instructor approved publication for a meeting demo on 2026-11-17. Linked from the course home page; the schedule remains unchanged.

## Preview

From the `cssema384` repository directory:

```bash
python3 -m http.server 8765 --bind 127.0.0.1
```

Open http://127.0.0.1:8765/experimental/lectures/week01/ in a browser. Stop the server with Ctrl+C. No installation or build is required. Opening `index.html` directly also works, but use the server to check course links.

## Use

- **Read / Present** is the primary control, always at the top.
- Read shows all teaching cores and supporting explanations. Use the numbered contents list or Previous/Next.
- Present shows one section's teaching core, with the same diagrams, examples, and prompts. Switching preserves the current section, including after scrolling in Read. Returning to Read opens the start of that section; exact paragraph offset is not retained.
- Previous/Next work in either mode. In Present, focus the teaching area (or use Next once), then use Left/Right, Page Up/Down, Home/End. Arrow keys do not intercept focused buttons or links; use Tab and Enter/Space for those controls. Escape returns to Read.
- URL fragments identify sections, for example `#inspect`. Reload opens that section in Read. Mode is deliberately not persisted across visits.
- Reading remains available without JavaScript. Printing includes all reading content.

## Author once

`index.html` is the sole lecture content source. Each `.lecture-section` has a stable `id`, heading, `.core`, and optional `.support`. Present hides `.support` and other sections; the script does not clone or rewrite lecture content. Include essential context and units in the core. Place extended interpretation and references in support.

`lecture.css` controls both modes, scoped to this standalone page. `lecture.js` handles only mode and section navigation. There are no external libraries, remote assets, animation systems, or executable Python cells.

## Maintenance and limits

The prototype is one focused class, not all Week 1 content. Python runs in the linked lab notebook. Discussion prompts have explanations in Read, so none are confidential instructor notes. Synthetic examples cannot support claims about campus behavior. Projected sections require manual editorial restraint: avoid long code blocks or large tables. Small mobile Present layouts scroll vertically; use Read for study. Browser testing does not replace a physical projector or screen-reader review.

For Week 2 onward, after prototype approval:

1. Audit current weekly objectives, assigned readings, and lab evidence.
2. Draft a short sequence with one concept per section; write core and support together.
3. Reuse the reviewed shell; add stable IDs and corresponding contents links.
4. Keep diagrams original or document reuse permission. Keep private notes outside public HTML.
5. Test every section in both modes at mobile and projector sizes, keyboard navigation, section preservation, code readability, and local links.
6. Review exact lecture files before linking or publishing. Extract shared CSS/JS only after another lecture confirms the pattern. No generation skill is needed yet.

## Publication

The instructor authorized publishing this prototype for a meeting demo. The course home page links to it. Keep `noindex` while it remains experimental. Future lecture expansion and schedule integration still require review. Planning documents and browser QA scripts remain outside the public repository.
