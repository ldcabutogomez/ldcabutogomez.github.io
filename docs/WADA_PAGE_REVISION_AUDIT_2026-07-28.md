# Half Awake page revision audit

Date: 28 July 2026

Route: `/wada/`

Branch: `main`

## Scope and scientific lock

This revision treats the Wada page as a concise credibility artifact for PIs, fellowship reviewers, defense-tech and human-factors hiring managers, and peers. It changes page structure, rendering, access to the approved poster, metadata, and presentation. It does not reinterpret the science.

The fixed primary standard-bipolar result remains:

- Mean interaction: 0.245 exponent units
- 95% CI: 0.043–0.447
- Raw two-sided p=.019
- Cohort: N=27

The cohort is described as a sample of 27 participants. The page does not claim that the sample was preregistered. CSD numerical results, comparisons, and interpretations are excluded. The only public CSD assets are the alpha and delta topographies embedded in the owner-approved final poster.

## Stage acceptance

### Stage 1 — Social card

Commit: `6a6a12d` (`feat(wada): add PNG social card`)

- PASS — `assets/wada/half-awake-social-card.png` is a real, non-interlaced RGB PNG at 1200×630.
- PASS — `og:image` and `twitter:image` use the absolute production URL.
- PASS — `og:image:type` is `image/png`; width and height metadata are present.
- PASS — both image-alt fields describe the Half Awake title card and do not call it a placeholder.
- PASS — the portfolio root already used a supported JPEG social image, so it was not edited.

### Stage 2 — Static rendering

Commit: `f6fabe8` (`refactor(wada): render project content statically`)

- PASS — `wada/content.json` is the single content source.
- PASS — the zero-dependency renderer emits `wada/index.html` from `wada/index.template.html`.
- PASS — the Pages workflow runs the renderer before upload.
- PASS — final JavaScript-on and JavaScript-off visible text is identical: 10,212 normalized characters in each mode.
- PASS — no empty template tokens or runtime interpolation slots remain in the built source.
- PASS — `<noscript>` remains only as a safety net.

### Stage 3 — Four-section structure

Commit: `aaea338` (`refactor(wada): consolidate project narrative`)

- PASS — four top-level sections: `question`, `design`, `findings`, and `status`.
- PASS — four navigation anchors map one-to-one to those sections; no anchor is missing.
- PASS — the result and schematic are placed together in the hero snapshot immediately after the introductory material.
- PASS — no two consecutive sections use the same heading construction.
- PASS — numbered section kickers appear on only two sections.
- PASS — the design section is substantially longer than the other sections.

### Stage 4 — Design schematic

Commit: `e5eb98f` (`feat(wada): add accessible design schematic`)

- PASS — the inline SVG shows one carotid injection, injected and contralateral hemispheres, and qualitative baseline, injection, peak, and recovery windows.
- PASS — the SVG contains a screen-reader `<title>` and `<desc>` and has no external image request.
- PASS — the schematic contains no numeric result.
- PASS — it is theme-aware through CSS variables and remains legible at a 320px viewport and at social-card scale.
- PASS — the social-card PNG was regenerated with the schematic and remains exactly 1200×630.

### Stage 5 — Copy and approved poster

Commit: `ed5d8b4` (`feat(wada): publish final poster and focused copy`)

- PASS — all required heading replacements were applied; all specified KEEP headings remain.
- PASS — the hero contains one H1, one plain-English line, and the academic title in smaller type; the printed URL was removed.
- PASS — the required sentence “The exponent effect held. The oscillatory measures did not.” is present.
- PASS — the cohort is identified as a sample of 27 participants, without a preregistration claim.
- PASS — `TODO(luis): role attribution` is directly below the methods heading.
- PASS — `TODO(luis): calibration sentence` is directly after the reported interval text.
- PASS — the standalone-figure embargo is stated once. Later availability copy cross-references it instead of repeating it.
- PASS — availability is concrete: the final poster is available now; standalone figures require aggregate-only scientific, privacy, and licensing clearance.
- PASS — the approved one-page poster is public at `assets/wada/poster/wada-eeg-poster.pdf`.
- PASS — the published poster is byte-identical to the approved source: SHA-256 `8b9b2892ce7d91c134653c9f20a42b387c9c94384205b5fffbbdc20d61e2640b`.
- PASS — local HTTP delivery returns 200, `application/pdf`, and 2,130,539 bytes.

### Stage 6 — Audit and analytics control

Commit: `71cdaf7` (`chore(wada): add privacy controls and audit`)

- PASS — one H1 and no heading-level jumps.
- PASS — 176 visible text elements pass computed WCAG AA contrast in dark mode; minimum measured ratio is 8.05:1.
- PASS — after the correction below, 176 visible text elements also pass in light mode; minimum measured ratio is 4.71:1.
- PASS — JavaScript-on and JavaScript-off visible text is identical.
- PASS — no console errors, page errors, missing anchors, or horizontal overflow at 1440px or 320px.
- PASS — GoatCounter is implemented in the static renderer behind `analytics.enabled`, which defaults to `false`.
- PASS — the built page contains no analytics script and made zero GoatCounter or Plausible requests during desktop and mobile audits.
- PASS — enabling analytics requires only a GoatCounter endpoint plus the config flag; no framework, dependency, or cookie-setting code was added.

## Contrast failures found and fixed

The dark-background audit had zero failures. A second light-theme check caught two labels over the light injected-hemisphere tint:

| Text node | Before | Required | Fix | After |
| --- | ---: | ---: | --- | ---: |
| `Injected` | 3.60:1 | 4.50:1 | Added a light-theme injected-label token, `#056b62` | 4.71:1 |
| `hemisphere` | 3.60:1 | 4.50:1 | Same token | 4.71:1 |

No other text-color failures were measured. The scientific accent used for the hemisphere, injection path, and timeline was not changed; only the light-theme label text received the darker token.

## Before-and-after delivery evidence

Lighthouse 12.8.2 was attempted twice at baseline but could not establish a usable connection to the installed headless Chromium from WSL, so there are no valid Lighthouse scores to report. The equivalent audit below used Playwright 1.58.2 with Chrome 150 and the same locally served route before and after. Timing values are single-run local diagnostics, not field-performance claims.

| Measure | Before | After |
| --- | ---: | ---: |
| Visible-text coverage without page JavaScript | 17.2% | 100% |
| JS-off visible characters | 2,134 | 10,212 |
| JS-on visible characters | 12,426 | 10,212 |
| Runtime DOM nodes | 364 | 317 |
| Top-level sections | 8 | 4 |
| Valid navigation anchors | 4/4 | 4/4 |
| H1 count | 1 | 1 |
| Heading-level jumps | 0 | 0 |
| Console/page errors | 0 | 0 |
| Horizontal overflow at audited desktop width | none | none |
| Local DOMContentLoaded | 41 ms | 23 ms |
| Local load event | 52 ms | 35 ms |
| Main HTML transfer | 11,142 bytes | 28,253 bytes |

The larger HTML response is intentional: content formerly injected at runtime is now present in the initial document. The smaller DOM and full no-JavaScript content coverage are the relevant delivery improvements.

## Follow-up revision — author copy and final-poster panels

After the six staged commits, Luis supplied the two previously deferred sentences and explicitly approved publishing the final poster’s scientific panels after confirming that the poster contains no PHI.

- PASS — the role placeholder was replaced with the owner-supplied attribution: “Luis D. Cabuto-Gomez developed the entire EEG analysis pipeline.”
- PASS — the calibration placeholder was replaced with the owner-supplied interpretation, preserving the fixed raw two-sided p=.019.
- PASS — artifact handling now states that four-second epochs are flagged using robust and absolute peak-to-peak amplitude criteria, then manually reviewed, with at least 50 seconds required for manually curated baseline and anesthesia conditions.
- PASS — panels A–I are exact web copies of the approved final poster’s scientific images; decorative art, logos, QR assets, obsolete exports, and analysis caches were excluded.
- PASS — all 13 embedded scientific images are published without cropping or scientific alteration, with descriptive alt text and full-size links.
- PASS — bipolar remains the primary numerical analysis. CSD appears only in the poster’s alpha and delta topographies, with no CSD numerical result or montage comparison added.
- PASS — the separate “Availability and timeline” block was removed. One scoped embargo statement remains for analysis exports not embedded in the approved poster.
- PASS — the primary-result heading retains its existing H2 markup and visual format and now reads “The sedated hemisphere's exponent steepened, while the contralateral side did not.”
- PASS — final JavaScript-on and JavaScript-off visible text is identical at 11,404 normalized characters, with no empty runtime content slots.
- PASS — the final headless-browser audit found one H1, no heading-level jumps, four valid section anchors, no console or page errors, no analytics requests, and no horizontal overflow at 1440px or 320px.
- PASS — all 188 checked visible text elements pass computed WCAG AA contrast in both themes; the minimum measured ratios are 8.05:1 in dark mode and 4.71:1 in light mode.
- PASS — public copy contains no internal iteration label or non-public source path. The availability explanation accurately describes the same injected-versus-contralateral, baseline-to-anesthesia interaction being applied separately to aperiodic exponent and theta peak strength; it does not claim a direct cross-feature statistical test.

## Author TODOs remaining

None. Both author-controlled placeholders were resolved from text supplied directly by Luis.

## Deliberately not done

- The portfolio root page was not edited because its social image is already a supported JPEG and no consistency change required touching it.
- Analysis exports that are not embedded in the approved final poster were not published. Their embargo remains pending scientific, privacy, and licensing review.
- No CSD numerical output, montage comparison, or CSD interpretation was added. CSD is limited to the alpha and delta topographies embedded in the approved poster.
- No preregistration claim was made.
- No first-person role or calibration sentence was invented; the final attribution and interpretation were supplied directly by Luis.
- No framework, package, or build dependency was added.
- No analytics account or endpoint was invented; analytics remains off until a real GoatCounter endpoint is supplied.
- No portfolio-root content was bundled into these commits.

## Final verification commands

- `node --check scripts/render-wada.mjs`
- JSON parse of `wada/content.json`
- `node scripts/render-wada.mjs --check`
- `git diff --check`
- JavaScript-on/off Playwright text comparison
- Desktop and 320px Playwright structure, overflow, error, and analytics-request checks
- Computed WCAG AA contrast checks in dark and light color schemes
- PNG file-type and dimension validation
- Poster source/published SHA-256 comparison
- Local HTTP response validation for the poster
