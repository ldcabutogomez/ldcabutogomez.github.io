(function renderWadaPage() {
  "use strict";

  const content = window.WADA_CONTENT;

  if (!content) {
    return;
  }

  const getValue = (path) => path.split(".").reduce((value, key) => value?.[key], content);

  document.querySelectorAll("[data-content]").forEach((element) => {
    const value = getValue(element.dataset.content);
    if (typeof value === "string") {
      element.textContent = value;
    }
  });

  const element = (tagName, className, text) => {
    const node = document.createElement(tagName);
    if (className) node.className = className;
    if (typeof text === "string") node.textContent = text;
    return node;
  };

  const appendExternalHint = (link) => {
    const arrow = element("span", "", " ↗");
    arrow.setAttribute("aria-hidden", "true");
    const hint = element("span", "sr-only", " (opens in a new tab)");
    link.append(arrow, hint);
  };

  const configureLink = (link, item) => {
    link.href = item.href;
    if (item.download) link.setAttribute("download", "");
    if (item.external) {
      link.target = "_blank";
      link.rel = "noopener";
      appendExternalHint(link);
    }
  };

  const createAction = (item, options = {}) => {
    const label = options.label || item?.label || options.fallbackLabel;

    if (!item?.available || !item.href) {
      const unavailable = element("span", `button ${options.primary ? "button-primary" : ""} button-unavailable`);
      unavailable.setAttribute("aria-disabled", "true");
      unavailable.append(label, element("span", "button-status", "Coming soon"));
      return unavailable;
    }

    const link = element("a", `button ${options.primary ? "button-primary" : ""}`, label);
    configureLink(link, item);
    return link;
  };

  const posterResource = content.resources.find(({ id }) => id === "poster");
  const heroActions = document.querySelector("#hero-actions");
  heroActions.append(
    createAction(posterResource, { primary: true, label: "View Full Poster" }),
    createAction({ label: "Explore the Analysis", href: "#analysis", available: true }, { primary: true }),
    createAction({ label: "Contact Luis", href: `${content.identity.email}?subject=Wada%20EEG%20project`, available: true })
  );

  const identityItems = [
    ["Affiliation", content.identity.affiliation],
    ["Program", content.identity.program],
    ["Primary mentor", content.identity.primaryMentor],
    ["Research group", content.identity.researchGroup],
    ["Supporting lab", content.identity.supportingLab]
  ];
  const identityList = document.querySelector("#identity-list");
  identityItems.forEach(([term, description]) => {
    const wrapper = element("div");
    const dt = element("dt", "", term);
    const dd = element("dd", description.includes("[") ? "placeholder-text" : "", description);
    wrapper.append(dt, dd);
    identityList.append(wrapper);
  });

  const logicFlow = document.querySelector("#logic-flow");
  content.scientificLogic.forEach((step, index) => {
    const item = element("li", "logic-step");
    item.append(
      element("span", "logic-number", String(index + 1).padStart(2, "0")),
      element("h3", "", step.title),
      element("p", "", step.description)
    );
    logicFlow.append(item);
  });

  const questionGrid = document.querySelector("#question-grid");
  content.researchQuestion.points.forEach((point) => {
    const article = element("article", "question-card");
    article.append(element("h3", "", point.title), element("p", "", point.text));
    questionGrid.append(article);
  });

  const methodGrid = document.querySelector("#method-grid");
  content.methods.forEach((method) => {
    const article = element("article", "method-card");
    article.append(
      element("p", "card-kicker", method.label),
      element("h3", "", method.title),
      element("p", method.summary.includes("[") ? "placeholder-aware" : "", method.summary)
    );
    methodGrid.append(article);
  });

  const createFigureCard = (figure, index) => {
    const card = element("article", "figure-card");
    const figureElement = document.createElement("figure");
    const media = element("div", "figure-media");
    media.style.aspectRatio = figure.aspectRatio || "4 / 3";

    if (figure.image) {
      const image = document.createElement("img");
      image.src = figure.image;
      image.alt = figure.alt;
      image.loading = "lazy";
      image.decoding = "async";
      if (figure.width && figure.height) {
        image.width = figure.width;
        image.height = figure.height;
      }
      media.append(image);
    } else {
      const placeholder = element("div", "figure-placeholder");
      placeholder.setAttribute("role", "img");
      placeholder.setAttribute("aria-label", `${figure.title} figure placeholder; ${figure.availability || "final scientific figure not yet available"}.`);
      placeholder.append(
        element("span", "figure-placeholder-index", `FIG ${String(index + 1).padStart(2, "0")}`),
        element("span", "figure-placeholder-title", figure.availability || "Scientific figure forthcoming"),
        element("code", "figure-placeholder-path", figure.suggestedPath)
      );
      media.append(placeholder);
    }

    const caption = document.createElement("figcaption");
    caption.textContent = figure.caption;
    figureElement.append(media, caption);

    const body = element("div", "figure-card-body");
    body.append(
      element("p", "card-kicker", `Figure ${String(index + 1).padStart(2, "0")}`),
      element("h3", "", figure.title),
      element("p", "figure-availability", figure.availability),
      element("p", figure.interpretation.includes("[") ? "figure-interpretation placeholder-aware" : "figure-interpretation", figure.interpretation),
      figureElement
    );

    const notes = element("div", "figure-notes");
    notes.append(
      element("span", "", "Methods note"),
      element("p", figure.methodsNote.includes("[") ? "placeholder-aware" : "", figure.methodsNote)
    );

    if (figure.fullResolutionUrl) {
      const fullLink = element("a", "text-link", "Open full-resolution figure");
      fullLink.href = figure.fullResolutionUrl;
      fullLink.target = "_blank";
      fullLink.rel = "noopener";
      appendExternalHint(fullLink);
      notes.append(fullLink);
    }

    card.append(body, notes);
    return card;
  };

  const figureGrid = document.querySelector("#figures");
  content.figures.forEach((figure, index) => figureGrid.append(createFigureCard(figure, index)));

  const createResultCard = (result) => {
    const article = element("article", "result-card");
    const metric = element("p", "result-metric", result.metric);
    metric.setAttribute("aria-label", `Supporting metrics: ${result.metric}`);
    article.append(
      element("p", "card-kicker", result.label),
      element("h3", "", result.title),
      element("p", "result-statement", result.statement),
      metric,
      element("p", result.analysisPlan.includes("[") ? "result-plan placeholder-aware" : "result-plan", result.analysisPlan),
      element("p", result.interpretation.includes("[") ? "result-interpretation placeholder-aware" : "result-interpretation", result.interpretation)
    );
    const caution = element("p", "result-caution");
    caution.append(element("strong", "", "Caution: "), result.caution);
    article.append(caution);
    return article;
  };

  const resultGrid = document.querySelector("#result-grid");
  content.results.forEach((result) => resultGrid.append(createResultCard(result)));

  const resourceGrid = document.querySelector("#resource-grid");
  content.resources.forEach((resource) => {
    const card = element(resource.available ? "a" : "div", `resource-card ${resource.available ? "is-available" : "is-unavailable"}`);
    if (resource.available) configureLink(card, resource);
    if (!resource.available) card.setAttribute("aria-label", `${resource.label}, coming soon`);
    const heading = element("h3", "", resource.label);
    const description = element("p", "", resource.description);
    const status = element("span", "resource-status", resource.available ? "Available →" : "Coming soon");
    card.append(heading, description, status);
    resourceGrid.append(card);
  });

  const contactLinks = document.querySelector("#contact-links");
  const publicLinks = [
    { label: "Email Luis", href: `${content.identity.email}?subject=Wada%20EEG%20project` },
    { label: "Main portfolio", href: content.identity.portfolio },
    { label: "GitHub", href: content.identity.github, external: true },
    { label: "LinkedIn", href: content.identity.linkedin, external: true }
  ];
  publicLinks.forEach((item) => {
    const link = element("a", "button", item.label);
    configureLink(link, { ...item, available: true });
    contactLinks.append(link);
  });
})();
