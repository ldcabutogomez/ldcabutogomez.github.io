# Luis Cabuto — Academic Portfolio

Personal academic website for Luis Cabuto, a Yale cognitive science student interested in computational neuroscience, EEG, machine learning, and cognitive science.

## Site structure

This is a dependency-free static site:

- `index.html` contains the homepage content and metadata.
- `projects/veteran-wellness/` contains the first research project detail page.
- `wada/` contains the mobile-first Wada EEG poster companion page.
- `style.css` contains the responsive visual system.
- `script.js` provides the accessible mobile navigation and homepage section highlighting.
- `assets/` contains the résumé, a selected public writing sample, images, and favicon.

Raw source material belongs in a local `website-context/` directory, which is intentionally ignored by Git. Only reviewed, publishable artifacts should be copied into `assets/`.

Content can be edited directly in the HTML without a build step.

## Updating the Wada EEG page

The permanent GitHub Pages route is `/wada/`, generated directly from `wada/index.html`. The route does not depend on client-side routing or a build step.

- Update scientific text, affiliations, results, collaborator details, figure metadata, and resource availability in `wada/content.js`.
- The current draft reflects the primary standard-bipolar analysis and aggregate results reviewed on 28 July 2026. Luis is affiliated with Yale University; Janna Helfrich, MD is affiliated with Yale School of Medicine and is the primary mentor. Randolph Helfrich, MD, PhD and the Randolph Helfrich Lab are credited for collaborating and technical support.
- Do not add CSD numerical results or montage comparisons. CSD may appear only in clearly labeled topographic visualizations.
- Page layout lives in `wada/index.html`; reusable figure, result, method, and resource renderers live in `wada/wada.js`; page-specific styling lives in `wada/wada.css`.
- Put only scientifically reviewed, privacy-reviewed, and appropriately licensed web-preview figures in `assets/wada/figures/`; follow that directory's README and keep full-resolution scientific originals unmodified.
- Add the final poster PDF at a stable path such as `assets/wada/poster/wada-eeg-poster.pdf`, then set the poster resource's `href` and `available: true` in `wada/content.js`. Until then, the poster control displays “Coming soon” without a link.
- Update abstract, supplement, code, and figure-download URLs in the centralized `resources` and `figures` arrays. An unavailable resource should keep `available: false` and `href: null`.
- Replace `assets/wada/wada-og-placeholder.svg` with a reviewed sharing image and update the Open Graph metadata in `wada/index.html` when final artwork is available.

To preview from the repository root, run the local server below and open `http://localhost:8000/wada/`.

## Local preview

Run a local static server from the repository root:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deployment

The workflow in `.github/workflows/static.yml` deploys the repository root to GitHub Pages after a push to `main`. No package installation or build command is required.
