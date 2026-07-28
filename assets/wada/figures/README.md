# Wada figure assets

Place reviewed, web-preview copies of the final scientific figures in this directory. Keep full-resolution originals unchanged and store their public download copies separately when needed.

Suggested preview filenames:

- `01-bipolar-spectra.webp`
- `02-bipolar-results.webp`
- `03-feature-availability.webp`
- `04-csd-topographies.webp`

After adding a figure, update its `image`, intrinsic `width`, intrinsic `height`, `alt`, `caption`, and optional `fullResolutionUrl` fields in `wada/content.js`. The figure component uses `object-fit: contain` and never crops the image.

Do not alter scientific axes, legends, colors, morphology, values, or aspect ratios when preparing previews.

The website reports bipolar results only. CSD assets are limited to topographic
visualization and must be labeled as such; do not add CSD statistics or montage
comparisons. Never publish participant-level clinical figures without documented
scientific and privacy approval.
