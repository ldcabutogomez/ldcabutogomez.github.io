# Wada figure assets

Place reviewed, web-preview copies of the final scientific figures in this directory. Keep full-resolution originals unchanged and store their public download copies separately when needed.

Suggested preview filenames:

- `01-wada-procedure.webp`
- `02-representative-eeg.webp`
- `03-spectral-parameterization.webp`
- `04-hemispheric-topography.webp`
- `05-group-summary.webp`

After adding a figure, update its `image`, intrinsic `width`, intrinsic `height`, `alt`, `caption`, and optional `fullResolutionUrl` fields in `wada/content.js`. The figure component uses `object-fit: contain` and never crops the image.

Do not alter scientific axes, legends, colors, morphology, values, or aspect ratios when preparing previews.
