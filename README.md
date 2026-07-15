# Luis Cabuto — Academic Portfolio

Personal academic website for Luis Cabuto, a Yale cognitive science student interested in computational neuroscience, EEG, machine learning, and cognitive science.

## Site structure

This is a dependency-free static site:

- `index.html` contains all page content and metadata.
- `style.css` contains the responsive visual system.
- `script.js` provides the accessible mobile navigation.
- `assets/` contains the résumé, a selected public writing sample, images, and favicon.

Raw source material belongs in a local `website-context/` directory, which is intentionally ignored by Git. Only reviewed, publishable artifacts should be copied into `assets/`.

Content can be edited directly in the HTML without a build step.

## Local preview

Run a local static server from the repository root:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deployment

The workflow in `.github/workflows/static.yml` deploys the repository root to GitHub Pages after a push to `main`. No package installation or build command is required.
