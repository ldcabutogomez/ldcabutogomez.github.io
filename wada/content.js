/*
 * Scientific and project content for /wada/.
 *
 * Confirmed methods and identity fields were integrated from the privacy-audited
 * Wada handoff extracted on 2026-07-25. Missing, conflicting, or privacy-blocked
 * material remains visibly unresolved. Resource links with available: false render
 * as non-clickable "Coming soon" items.
 */
window.WADA_CONTENT = {
  contentReview: {
    overallStatus: "partial / conflicts unresolved",
    methodsStatus: "confirmed where stated",
    resultsStatus: "pending scientific review",
    figuresStatus: "no public-ready scientific figures",
    privacyAudit: "passed for the integrated handoff"
  },

  page: {
    title: "Wada EEG Project",
    posterTitle: "[INSERT APPROVED PUBLIC POSTER TITLE]",
    subtitle: "A methods-focused overview of within-participant hemispheric EEG contrasts during unilateral anesthesia",
    description: "A methods-focused overview of Luis D. Cabuto-Gomez’s Wada EEG project examining aperiodic spectral structure and oscillatory activity during unilateral hemispheric anesthesia.",
    canonicalUrl: "https://ldcabutogomez.github.io/wada/",
    shortUrl: "ldcabutogomez.github.io/wada/",
    status: "Methods implemented and versioned / public results pending review",
    lastUpdated: "25 July 2026"
  },

  identity: {
    author: "Luis D. Cabuto-Gomez",
    affiliation: "Yale School of Medicine",
    program: "REVU Summer Research Program 2026",
    lab: "Randolph Helfrich Lab",
    collaborators: "Janna Helfrich, MD — poster coauthor; [INSERT COAUTHOR AFFILIATION]",
    posterSession: "[INSERT POSTER SESSION, MEETING, DATE, AND LOCATION]",
    email: "mailto:luis.cabuto@yale.edu",
    github: "https://github.com/ldcabutogomez",
    linkedin: "https://www.linkedin.com/in/luis-cabuto/",
    portfolio: "../"
  },

  takeaway: {
    statement: "[INSERT FINAL PRIMARY RESULT AND INTERPRETATION]",
    note: "No numerical result or conclusion has been approved for public release. Final wording must match the locked poster and reviewed statistical analysis."
  },

  scientificLogic: [
    {
      title: "Intracarotid injection",
      description: "An intracarotid injection targets the ipsilateral hemisphere; final public medication wording is pending approval."
    },
    {
      title: "Targeted hemispheric anesthesia",
      description: "The procedure creates a transient, lateralized perturbation while both hemispheres are recorded."
    },
    {
      title: "Within-hemisphere EEG change",
      description: "Baseline-to-anesthesia change is estimated separately on the injected and contralateral sides."
    },
    {
      title: "Injected versus contralateral",
      description: "The two changes are contrasted within the same participant and recording session."
    },
    {
      title: "Candidate marker evaluation",
      description: "Aperiodic structure and prespecified oscillatory comparison families are evaluated without assuming superiority."
    }
  ],

  withinBrainDesign: "Each participant provides their own simultaneous differential comparison. Baseline-to-anesthesia change is calculated separately in the injected and contralateral hemispheres, followed by an injected-minus-contralateral interaction contrast. The contralateral hemisphere is not an untreated control because unilateral injection may still produce bilateral spectral changes.",

  researchQuestion: {
    introduction: "Can spectral parameterization distinguish a lateralized injected-hemisphere anesthetic response from bilateral broadband movement and arousal effects during post-injection clinical testing, using the opposite hemisphere as a within-participant differential comparison?",
    points: [
      {
        title: "A rare within-participant contrast",
        text: "The injection targets one ipsilateral hemisphere while both hemispheres are recorded simultaneously, reducing dependence on between-person comparisons."
      },
      {
        title: "A difficult clinical signal",
        text: "Movement, muscle activity, shivering, arousal, and behavioral testing can produce bilateral broadband changes after injection."
      },
      {
        title: "Separate background and peaks",
        text: "The analysis separates aperiodic offset and exponent from periodic peaks so broadband spectral shifts are not automatically interpreted as oscillatory changes."
      },
      {
        title: "Spatial specificity matters",
        text: "The injected-minus-contralateral interaction tests whether change is greater over the targeted hemisphere rather than merely bilateral; it does not itself establish significance."
      }
    ]
  },

  methods: [
    {
      label: "Clinical context",
      title: "Wada procedure",
      summary: "An intracarotid injection targets the ipsilateral hemisphere while EEG is recorded from both hemispheres. The opposite hemisphere is a simultaneous differential comparison, not an untreated control. [INSERT APPROVED PUBLIC MEDICATION TERMINOLOGY.]"
    },
    {
      label: "Signal preparation",
      title: "EEG preprocessing",
      summary: "Clinical labels are standardized to a 23-channel set after Fp1/Fp2 and nonstandard channels are removed. Supported 512-Hz recordings are resampled to 256 Hz; continuous data are demeaned, linearly detrended, and high-pass filtered at 0.5 Hz with a fourth-order zero-phase Butterworth filter."
    },
    {
      label: "Quality control",
      title: "Artifact handling",
      summary: "Approved manual curation uses clean segments of at least 2 seconds. Otherwise, nonoverlapping 4-second epochs enter an objective gate requiring both robust-z peak-to-peak amplitude greater than 4 and absolute peak-to-peak amplitude greater than 300 µV; a 500-µV backstop is surfaced for review and defaults to keep."
    },
    {
      label: "Spatial transform",
      title: "Current-source-density signals",
      summary: "A FieldTrip spline surface-Laplacian/CSD transform uses standard_1005.elc electrode positions after reviewed bad channels are excluded. CSD is the primary confirmatory montage; standard bipolar is a separate sensitivity analysis. CSD is a sensor-space spatial transform, not source localization."
    },
    {
      label: "Primary confirmatory ROI",
      title: "Tier 1 MCA-lateral ROI",
      summary: "Left hemisphere: F3, C3, P3. Right hemisphere: F4, C4, P4. This fronto-central-parietal sensor-space approximation of lateral MCA territory is the locked primary ROI; the older temporal-electrode set is legacy-only."
    },
    {
      label: "Epoch definition",
      title: "Analysis windows",
      summary: "Baseline begins up to 180 seconds before injection and ends 10 seconds before injection. Whole accepted segments are accumulated backward to a 100-second target without splitting the crossing segment. Anesthesia: [INSERT RECONCILED START-WINDOW WORDING; EXECUTABLE SOURCE DATA BEGIN AT +15 SECONDS WHILE THE METHODS CONTRACT STATES +10 SECONDS.]"
    },
    {
      label: "Spectral estimator",
      title: "Multitaper spectra",
      summary: "Linear-power DPSS mtmfft spectra use 2-Hz smoothing and a 0.5-Hz frequency grid, calculated per accepted segment and averaged in linear power with duration weighting. Padding: [INSERT RECONCILED WORDING; ACTIVE CODE USES 180 SECONDS WHILE THE METHODS CONTRACT STATES maxperlen.]"
    },
    {
      label: "Spectral model",
      title: "Aperiodic and periodic parameterization",
      summary: "Fixed-mode FOOOF/specparam is fitted to each duration-weighted average PSD, not per epoch or after channel/participant pooling. Settings are 1–6 Hz peak-width limits, at most 6 peaks, minimum peak height 0.1, peak threshold 2, and fit ranges of 2–35 Hz or 2–25 Hz depending on the hardware tier."
    },
    {
      label: "Prespecified frequencies",
      title: "Oscillatory comparison families",
      summary: "Confirmed bands are theta 4–8 Hz, alpha 8–13 Hz, and restricted delta 2–4 Hz. Restricted delta remains broadband/offset-confounded and sensitivity-only. [INSERT APPROVED OSCILLATORY ENDPOINT: SCHEMA-V3 THETA PEAK POWER OR EXPLORATORY SCHEMA-V4 PERIODIC AREA.]"
    },
    {
      label: "Contrast and inference",
      title: "Confirmatory analysis plan",
      summary: "The interaction is [(anesthesia − baseline) injected] − [(anesthesia − baseline) contralateral]. The locked schema-v3 exponent analysis uses a one-sided participant-level Monte Carlo sign-flip test of the studentized mean interaction, α = 0.05, with 100,000 sign flips; numerical results remain withheld pending review."
    }
  ],

  figures: [
    {
      id: "procedure",
      title: "Wada procedure / Circle of Willis schematic",
      availability: "Attribution and license pending",
      interpretation: "[INSERT INTERPRETATION AFTER A LICENSED FINAL SCHEMATIC IS APPROVED]",
      caption: "[INSERT FINAL CAPTION AND ATTRIBUTION]",
      methodsNote: "No finalized standalone export with documented attribution and reuse permission is currently available.",
      image: null,
      width: null,
      height: null,
      aspectRatio: "4 / 3",
      alt: "[INSERT DESCRIPTIVE ALT TEXT FOR THE APPROVED PROCEDURE SCHEMATIC]",
      fullResolutionUrl: null,
      suggestedPath: "../assets/wada/figures/01-wada-procedure.webp"
    },
    {
      id: "spectrogram",
      title: "Representative EEG or spectrogram",
      availability: "Not available for public display",
      interpretation: "[INSERT ONLY AFTER A PRIVACY-APPROVED PUBLIC FIGURE EXISTS]",
      caption: "[INSERT FINAL PRIVACY-APPROVED FIGURE CAPTION]",
      methodsNote: "No representative EEG or spectrogram has been approved for public packaging.",
      image: null,
      width: null,
      height: null,
      aspectRatio: "4 / 3",
      alt: "[INSERT DESCRIPTIVE ALT TEXT FOR A PRIVACY-APPROVED FIGURE]",
      fullResolutionUrl: null,
      suggestedPath: "../assets/wada/figures/02-representative-eeg.webp"
    },
    {
      id: "parameterization",
      title: "PSD and spectral parameterization example",
      availability: "Not available for public display",
      interpretation: "[INSERT ONLY AFTER A PRIVACY-APPROVED PUBLIC FIGURE EXISTS]",
      caption: "[INSERT FINAL PRIVACY-APPROVED FIGURE CAPTION]",
      methodsNote: "No spectral-fit example has been approved for public packaging.",
      image: null,
      width: null,
      height: null,
      aspectRatio: "4 / 3",
      alt: "[INSERT DESCRIPTIVE ALT TEXT FOR A PRIVACY-APPROVED PSD FIGURE]",
      fullResolutionUrl: null,
      suggestedPath: "../assets/wada/figures/03-spectral-parameterization.webp"
    },
    {
      id: "topography",
      title: "Hemispheric topography",
      availability: "Pending scientific review",
      interpretation: "[INSERT LOCKED INTERPRETATION OF THE APPROVED SPATIAL PATTERN]",
      caption: "[INSERT FINAL REVIEWED FIGURE CAPTION]",
      methodsNote: "The aggregate topography remains under scientific review and is not packaged for public release.",
      image: null,
      width: null,
      height: null,
      aspectRatio: "4 / 3",
      alt: "[INSERT DESCRIPTIVE ALT TEXT FOR THE APPROVED TOPOGRAPHY]",
      fullResolutionUrl: null,
      suggestedPath: "../assets/wada/figures/04-hemispheric-topography.webp"
    },
    {
      id: "group-summary",
      title: "Group-level summary",
      availability: "Pending scientific review",
      interpretation: "[INSERT LOCKED GROUP-LEVEL INTERPRETATION]",
      caption: "[INSERT FINAL CAPTION, APPROVED SAMPLE SIZE, AND STATISTICAL ANNOTATION KEY]",
      methodsNote: "Group and statistical figures remain under scientific review and are not packaged for public release.",
      image: null,
      width: null,
      height: null,
      aspectRatio: "16 / 10",
      alt: "[INSERT DESCRIPTIVE ALT TEXT FOR THE APPROVED GROUP SUMMARY]",
      fullResolutionUrl: null,
      suggestedPath: "../assets/wada/figures/05-group-summary.webp"
    }
  ],

  results: [
    {
      label: "Primary candidate measure",
      title: "Aperiodic exponent",
      statement: "[INSERT LOCKED RESULT]",
      metric: "[INSERT EFFECT SIZE] · [INSERT SAMPLE SIZE] · [INSERT TEST STATISTIC AND P-VALUE] · [INSERT 95% INTERVAL]",
      analysisPlan: "Locked plan: one-sided participant-level Monte Carlo sign-flip test of the studentized mean Tier-1 CSD exponent interaction; no numerical inference result is released.",
      interpretation: "[INSERT APPROVED INJECTED-VERSUS-CONTRALATERAL INTERPRETATION]",
      caution: "Do not describe the exponent as superior to oscillatory measures, call it a validated biomarker, or call the contralateral hemisphere untreated."
    },
    {
      label: "Oscillatory comparison",
      title: "Oscillatory activity",
      statement: "[INSERT LOCKED THETA, ALPHA, RESTRICTED-DELTA, OR OTHER APPROVED RESULT]",
      metric: "[INSERT EFFECT SIZE] · [INSERT SAMPLE SIZE] · [INSERT STATISTICAL TEST] · [INSERT UNCERTAINTY]",
      analysisPlan: "[INSERT APPROVED OSCILLATORY ENDPOINT AND CORRECTION PLAN; SCHEMA-V3 AND EXPLORATORY SCHEMA-V4 CURRENTLY CONFLICT]",
      interpretation: "[INSERT INTERPRETATION SUPPORTED BY THE APPROVED COMPARISONS]",
      caution: "Theta peak absence is encoded as zero only in the schema-v3 peak-power endpoint; restricted 2–4 Hz delta is not equivalent to a decomposed oscillation."
    },
    {
      label: "Within-brain contrast",
      title: "Spatial specificity and consistency",
      statement: "[INSERT LOCKED INJECTED-VERSUS-CONTRALATERAL AND GROUP-LEVEL RESULT]",
      metric: "[INSERT EFFECT SIZE] · [INSERT COMPLETE-CASE SAMPLE SIZE] · [INSERT CORRECTED P-VALUE] · [INSERT UNCERTAINTY]",
      analysisPlan: "Locked secondary method: a two-sided dependent-samples cluster max-sum test of homologous-site hemisphere-by-condition interactions at ten injection-aligned scalp locations; the final correction plan remains unresolved.",
      interpretation: "[INSERT APPROVED SPATIAL-SPECIFICITY INTERPRETATION]",
      caution: "Group plots are descriptive unless tied to the approved inferential analysis; apparent spatial patterns do not establish significance."
    }
  ],

  limitations: [
    "Methods are implemented and versioned, but the public poster, numerical results, and conclusions remain pending scientific review.",
    "The contralateral hemisphere is a simultaneous differential comparison, not an untreated control; unilateral injection may still have bilateral spectral effects.",
    "Movement, muscle activity, shivering, arousal, and behavioral testing can contaminate post-injection EEG and create bilateral broadband changes.",
    "Hardware low-pass heterogeneity requires separate 2–35 Hz and 2–25 Hz fit tiers and prevents an absolute excitation/inhibition interpretation.",
    "Spectral parameterization depends on model fit; fit quality and edge cases require explicit diagnostic review.",
    "Clinical conditions and recording contexts may be heterogeneous across participants.",
    "A candidate marker is not a validated biomarker and no formal superiority claim is currently supported.",
    "Replication and an independently reviewed validation sample are required before clinical interpretation."
  ],

  resources: [
    {
      id: "poster",
      label: "Download Full Poster",
      description: "A publication-safe final poster PDF has not yet been approved.",
      href: null,
      available: false,
      download: true,
      external: false
    },
    {
      id: "abstract",
      label: "Read Abstract",
      description: "No final abstract has been approved for public release.",
      href: null,
      available: false,
      download: false,
      external: false
    },
    {
      id: "methods",
      label: "Methods Supplement",
      description: "No separately approved public methods supplement is available.",
      href: null,
      available: false,
      download: false,
      external: false
    },
    {
      id: "figures",
      label: "View Selected Figures",
      description: "No figure has passed final scientific, privacy, and licensing review.",
      href: null,
      available: false,
      download: false,
      external: false
    },
    {
      id: "code",
      label: "View Code",
      description: "No project repository has been approved for public linking.",
      href: null,
      available: false,
      download: false,
      external: true
    },
    {
      id: "contact",
      label: "Contact Luis",
      description: "Ask a question or discuss the methods and project status.",
      href: "mailto:luis.cabuto@yale.edu?subject=Wada%20EEG%20project",
      available: true,
      download: false,
      external: false
    }
  ],

  attribution: {
    collaborators: "Janna Helfrich, MD — poster coauthor; [INSERT COAUTHOR AFFILIATION]",
    lab: "Randolph Helfrich Lab",
    citation: "Luis D. Cabuto-Gomez; Janna Helfrich, MD. [INSERT APPROVED TITLE]. [INSERT MEETING, SESSION, EXACT DATE, CITY, AND VENUE]."
  }
};
