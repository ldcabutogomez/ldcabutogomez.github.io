import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, "..");
const contentPath = path.join(projectRoot, "wada", "content.json");
const templatePath = path.join(projectRoot, "wada", "index.template.html");
const outputPath = path.join(projectRoot, "wada", "index.html");

const [contentSource, template] = await Promise.all([
  readFile(contentPath, "utf8"),
  readFile(templatePath, "utf8")
]);
const content = JSON.parse(contentSource);

const escapeHtml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#39;");

const externalHint = " <span aria-hidden=\"true\">↗</span><span class=\"sr-only\"> (opens in a new tab)</span>";

const renderLinkAttributes = (item) => [
  `href="${escapeHtml(item.href)}"`,
  item.download ? "download" : "",
  item.external ? 'target="_blank" rel="noopener"' : ""
].filter(Boolean).join(" ");

const renderAction = (item, { label = item?.label, primary = false } = {}) => {
  const classes = ["button", primary ? "button-primary" : ""].filter(Boolean).join(" ");
  if (!item?.available || !item.href) {
    return `<span class="${classes} button-unavailable" aria-disabled="true">${escapeHtml(label)}<span class="button-status">Coming soon</span></span>`;
  }
  return `<a class="${classes}" ${renderLinkAttributes(item)}>${escapeHtml(label)}${item.external ? externalHint : ""}</a>`;
};

const poster = content.resources.find(({ id }) => id === "poster");
const contactHref = `${content.identity.email}?subject=Wada%20EEG%20project`;
const analytics = content.analytics;

const renderAnalytics = () => {
  if (!analytics?.enabled) return "";
  if (analytics.provider !== "goatcounter" || !analytics.endpoint || !analytics.scriptSrc) {
    throw new Error("Enabled Wada analytics must use GoatCounter with an endpoint and scriptSrc.");
  }
  return `  <script data-goatcounter="${escapeHtml(analytics.endpoint)}" async src="${escapeHtml(analytics.scriptSrc)}"></script>`;
};

const blocks = {
  STRUCTURED_DATA: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${content.page.title}: ${content.page.posterTitle}`,
    description: content.page.description,
    url: content.page.canonicalUrl,
    author: {
      "@type": "Person",
      name: content.identity.author,
      affiliation: { "@type": "CollegeOrUniversity", name: content.identity.affiliation }
    },
    contributor: {
      "@type": "Person",
      name: "Janna Helfrich, MD",
      affiliation: { "@type": "CollegeOrUniversity", name: "Yale School of Medicine" }
    }
  }, null, 4).replaceAll("<", "\\u003c"),
  ANALYTICS: renderAnalytics(),
  HERO_ACTIONS: [
    renderAction(poster, { label: "View Full Poster", primary: true }),
    renderAction({ label: "Read the Findings", href: "#findings", available: true }, { primary: true }),
    renderAction({ label: "Contact Luis", href: contactHref, available: true })
  ].map((item) => `          ${item}`).join("\n"),
  IDENTITY: [
    ["Affiliation", content.identity.affiliation],
    ["Program", content.identity.program],
    ["Primary mentor", content.identity.primaryMentor],
    ["Research group", content.identity.researchGroup],
    ["Supporting lab", content.identity.supportingLab]
  ].map(([term, description]) => `          <div>\n            <dt>${escapeHtml(term)}</dt>\n            <dd>${escapeHtml(description)}</dd>\n          </div>`).join("\n"),
  LOGIC: content.scientificLogic.map((step, index) => `        <li class="logic-step">\n          <span class="logic-number">${String(index + 1).padStart(2, "0")}</span>\n          <h3>${escapeHtml(step.title)}</h3>\n          <p>${escapeHtml(step.description)}</p>\n        </li>`).join("\n"),
  QUESTIONS: content.researchQuestion.points.map((point) => `        <article class="question-card">\n          <h3>${escapeHtml(point.title)}</h3>\n          <p>${escapeHtml(point.text)}</p>\n        </article>`).join("\n"),
  METHODS: content.methods.map((method) => `        <article class="method-card">\n          <p class="card-kicker">${escapeHtml(method.label)}</p>\n          <h3>${escapeHtml(method.title)}</h3>\n          <p${method.summary.includes("[") ? ' class="placeholder-aware"' : ""}>${escapeHtml(method.summary)}</p>\n        </article>`).join("\n"),
  FIGURES: content.figures.map((figure) => `            <li class="status-list-title-only">\n              <h4>${escapeHtml(figure.title)}</h4>\n            </li>`).join("\n"),
  RESULTS: content.results.map((result) => `        <article class="result-card">\n          <p class="card-kicker">${escapeHtml(result.label)}</p>\n          <h3>${escapeHtml(result.title)}</h3>\n          <p class="result-statement">${escapeHtml(result.statement)}</p>\n          <p class="result-metric" aria-label="${escapeHtml(`Supporting metrics: ${result.metric}`)}">${escapeHtml(result.metric)}</p>\n          <p class="result-plan${result.analysisPlan.includes("[") ? " placeholder-aware" : ""}">${escapeHtml(result.analysisPlan)}</p>\n          <p class="result-interpretation${result.interpretation.includes("[") ? " placeholder-aware" : ""}">${escapeHtml(result.interpretation)}</p>\n          <p class="result-caution"><strong>Caution: </strong>${escapeHtml(result.caution)}</p>\n        </article>`).join("\n"),
  RESOURCES: content.resources.filter((resource) => resource.available && resource.id !== "contact").map((resource) => {
    const label = resource.available
      ? `<a ${renderLinkAttributes(resource)}>${escapeHtml(resource.label)}${resource.external ? externalHint : ""}</a>`
      : escapeHtml(resource.label);
    return `            <li>\n              <div>\n                <h4>${label}</h4>\n                <p>${escapeHtml(resource.description)}</p>\n              </div>\n              <span>Available now</span>\n            </li>`;
  }).join("\n"),
  CONTACT_LINKS: [
    { label: "Email Luis", href: contactHref },
    { label: "Main portfolio", href: content.identity.portfolio },
    { label: "GitHub", href: content.identity.github, external: true },
    { label: "LinkedIn", href: content.identity.linkedin, external: true }
  ].map((item) => `            <a class="button" ${renderLinkAttributes(item)}>${escapeHtml(item.label)}${item.external ? externalHint : ""}</a>`).join("\n")
};

const tokens = {
  DOCUMENT_TITLE: content.page.documentTitle,
  PAGE_DESCRIPTION: content.page.description,
  AUTHOR: content.identity.author,
  CANONICAL_URL: content.page.canonicalUrl,
  SOCIAL_TITLE: content.page.socialTitle,
  SOCIAL_DESCRIPTION: content.page.socialDescription,
  SOCIAL_IMAGE: content.page.socialImage,
  SOCIAL_IMAGE_ALT: content.page.socialImageAlt,
  PAGE_STATUS: content.page.status,
  PAGE_TITLE: content.page.title,
  POSTER_TITLE: content.page.posterTitle,
  PAGE_SUBTITLE: content.page.subtitle,
  TAKEAWAY_STATEMENT: content.takeaway.statement,
  TAKEAWAY_NOTE: content.takeaway.note,
  WITHIN_BRAIN_DESIGN: content.withinBrainDesign,
  RESEARCH_INTRODUCTION: content.researchQuestion.introduction,
  AFFILIATION: content.identity.affiliation,
  ATTRIBUTION_PRIMARY: content.attribution.primary,
  ATTRIBUTION_SUPPORTING: content.attribution.supporting,
  ATTRIBUTION_CITATION: content.attribution.citation,
  LAST_UPDATED: content.page.lastUpdated
};

let output = template;
for (const [name, value] of Object.entries(tokens)) {
  output = output.replaceAll(`{{${name}}}`, escapeHtml(value));
}
for (const [name, value] of Object.entries(blocks)) {
  const marker = `<!-- WADA:${name} -->`;
  if (!output.includes(marker)) throw new Error(`Missing template marker: ${marker}`);
  output = output.replace(marker, value);
}
if (output.includes("{{") || output.includes("<!-- WADA:")) {
  throw new Error("Unresolved Wada template token or marker");
}
if (!output.endsWith("\n")) output += "\n";

if (process.argv.includes("--check")) {
  const current = await readFile(outputPath, "utf8");
  if (current !== output) {
    console.error("wada/index.html is stale; run node scripts/render-wada.mjs");
    process.exit(1);
  }
} else {
  await writeFile(outputPath, output);
}
