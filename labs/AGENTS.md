# Lab page authoring conventions

Use `lab01.html` as the instructor-approved format and `lab.css` as the shared stylesheet for future lab pages. These conventions preserve the design approved November 24, 2026. Apply them when creating or revising a lab; do not restyle unrelated pages automatically.

## Visual style

- Preserve the course website navigation, typography, white page background, and neutral gray borders and surfaces. Avoid blue or tinted page backgrounds.
- Load the existing course stylesheets first, then `./lab.css`. Use `body.lab-page` to scope the shared lab styles.
- Reuse the shared components rather than duplicating CSS or adding per-page themes. Changes to `lab.css` affect every page that uses it; check those pages when changing shared styles.
- Show a simple `WEEK 01`-style label, the lab number/title, a short purpose statement, and a few skill tags such as Python, pandas, or data inspection.
- Do not use “Practice” as a status tag or add “skill building” to the week label. Skill-building activities can be graded. Use the actual approved grading and submission requirements; do not infer that an activity is ungraded.

## Page structure

1. Introductory header (`lab-intro`, `lab-eyebrow`, `lab-lead`, `lab-skills`, `lab-badge`).
2. On-page navigation (`lab-jump`) to setup, activities, quick reference, troubleshooting, and submission when applicable.
3. Learning objectives and preparation (`lab-panel`), aligned with the current notebook and readings.
4. Setup card with notebook/Colab links and supporting dataset downloads.
5. Relevant course policy guidance, preserving the instructor's current AI policy.
6. Activity cards with concise instructions, optional hints, and observable self-checks.
7. Quick reference: reusable commands, concepts, and documentation for later coursework.
8. Troubleshooting: common symptoms and concrete recovery steps.
9. Submission instructions when applicable, plus links back to all labs and the top.

## Cards and learning guidance

Use native `<details>` and `<summary>` without JavaScript. Setup and activity cards start open; nested hints and troubleshooting start collapsed. Do not hide essential requirements only inside hints.

```html
<details class="lab-card" id="activity-01" open>
  <summary>
    <span class="lab-step">STEP 01</span>
    <span>Action-oriented activity title</span>
    <span class="lab-kind">Skill name</span>
  </summary>
  <div class="lab-card-body">
    <p>Explain the task and where students should do their work.</p>
    <details class="lab-hint">
      <summary>Need a hint?</summary>
      <div>Offer a small conceptual cue or unrelated example.</div>
    </details>
    <p class="lab-check"><strong>Check yourself:</strong> Describe observable evidence of success.</p>
  </div>
</details>
```

- Use student-facing language such as results, outputs, and checks. Avoid agent/report terminology such as “evidence” or “contracts.”
- When a required operation may not have been taught in lecture, add a short worked reference using unrelated toy data, explain its parameters and common mistakes, and link it from the relevant checkpoint.
- Keep submission instructions concise. Do not add generic feedback/resubmission reminders, deadline boilerplate, or repeated point-total arithmetic unless requested.
- Keep detailed exercises in the notebook; the page should orient students and remain useful as a future reference.
- Hints should help students reason, without completing assessed checkpoints or exposing instructor solutions.
- Separate optional reference material from required activities. Clearly label installation examples as reference only when installation is not needed for the lab.
- Use `<code>` for commands, `<kbd>` for shortcuts, and `.lab-table` around reference tables. Use descriptive summaries and links, unique IDs, semantic headings, and keyboard-accessible controls.
- Keep the layout responsive and retain visible keyboard focus styling.

## Notebook and release checks

- Public student notebooks and datasets belong under `labs/week01` through `labs/week10`. Link the actual released filename in both download and Colab URLs.
- Explain saving a Drive copy, connecting a runtime, and uploading data when relevant. A GitHub notebook does not automatically bring its CSV into Colab; uploaded files are temporary.
- Specify Gradescope for lab submissions. Follow the instructor-approved file type, points, and deadline; never invent requirements.
- Keep solutions, rubrics, autograder answers, and instructor notes exclusively in `cssema384-private`. Follow that repository's release rules before copying student files.
- Check notebook JSON, student outputs/metadata for accidental answers, local and section links, disclosure structure, and `git diff --check`. Verify appearance and keyboard/mobile behavior when browser access permits; report any unverified checks accurately.
- Update `labs.html` and the relevant schedule entries when releasing a new lab. Preserve other instructors' changes and the course's publication workflow.
