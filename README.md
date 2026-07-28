# Luis Cabuto — Academic Portfolio

Personal academic website for Luis Cabuto, a Yale cognitive science student interested in computational neuroscience, EEG, machine learning, and cognitive science.

## Site structure

This is a dependency-free static site with one zero-dependency Node renderer:

- `index.html` contains the homepage content and metadata.
- `projects/veteran-wellness/` contains the first research project detail page.
- `wada/` contains the mobile-first Wada EEG poster companion page; `wada/content.json` is its content source and `wada/index.html` is generated from `wada/index.template.html`.
- `scripts/render-wada.mjs` renders the Wada content into static HTML for crawlers, reader modes, and browsers without JavaScript.
- `style.css` contains the responsive visual system.
- `script.js` provides the accessible mobile navigation and homepage section highlighting.
- `assets/` contains the résumé, a selected public writing sample, images, and favicon.

Raw source material belongs in a local `website-context/` directory, which is intentionally ignored by Git. Only reviewed, publishable artifacts should be copied into `assets/`.

The portfolio pages are otherwise edited directly in HTML. After changing Wada content or its template, run `node scripts/render-wada.mjs`.

Privacy-respecting GoatCounter analytics is configured for the Wada page in `wada/content.json` and defaults to `enabled: false`. To enable it, create the site's GoatCounter endpoint, paste that URL into `analytics.endpoint`, and set `enabled` to `true`; the static renderer then emits the official `count.js` snippet. GoatCounter does not set cookies, and the page makes no analytics requests while the flag is off.

## Updating the Wada EEG page

The permanent GitHub Pages route is `/wada/`. The deployment workflow renders `wada/index.html` before GitHub Pages uploads the repository.

- Update scientific text, affiliations, results, collaborator details, figure metadata, and resource availability in `wada/content.json`.
- The current draft reflects the primary standard-bipolar analysis and aggregate results reviewed on 28 July 2026. Luis is affiliated with Yale University; Janna Helfrich, MD is affiliated with Yale School of Medicine and is the primary mentor. Randolph Helfrich, MD, PhD and the Randolph Helfrich Lab are credited for collaborating and technical support.
- Do not add CSD numerical results or montage comparisons. CSD may appear only in clearly labeled topographic visualizations.
- Page layout lives in `wada/index.template.html`; reusable figure, result, method, and resource renderers live in `scripts/render-wada.mjs`; page-specific styling lives in `wada/wada.css`. Do not hand-edit generated `wada/index.html`.
- Put only scientifically reviewed, privacy-reviewed, and appropriately licensed web-preview figures in `assets/wada/figures/`; follow that directory's README and keep full-resolution scientific originals unmodified.
- The approved final poster is published at `assets/wada/poster/wada-eeg-poster.pdf`; its link and availability are controlled by the `poster` resource in `wada/content.json`.
- Update abstract, supplement, code, and figure-download URLs in the centralized `resources` and `figures` arrays. An unavailable resource should keep `available: false` and `href: null`.
- The current social card is generated from `assets/wada/half-awake-social-card.svg`; keep its PNG export at `assets/wada/half-awake-social-card.png` at exactly 1200×630 pixels.

To preview from the repository root, run the local server below and open `http://localhost:8000/wada/`.

## Local preview

Run a local static server from the repository root:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deployment

The workflow in `.github/workflows/static.yml` deploys the repository root to GitHub Pages after a push to `main`. No package installation or build command is required.
