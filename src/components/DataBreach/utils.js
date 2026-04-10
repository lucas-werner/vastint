import { CRITERIA, DPC_VARIANTS, SEVERITY_BANDS } from "./assessmentData";

export function formatNumber(value) {
  return value.toFixed(2);
}

export function formatDate(value) {
  if (!value) return "Not provided";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-GB", { dateStyle: "long" }).format(date);
}

export function getCriterionById(id) {
  return CRITERIA.find((criterion) => criterion.id === id);
}

export function getSelectedOption(criterionId, selections) {
  if (criterionId === "dpc") {
    const variant = DPC_VARIANTS[selections.dpcVariant];
    return variant.scores.find((score) => score.value === selections.dpc);
  }

  const criterion = getCriterionById(criterionId);
  return criterion.options.find((option) => option.value === selections[criterionId]);
}

export function getSeverity(score) {
  return (
    SEVERITY_BANDS.find((band) => score >= band.min && score < band.max) ??
    SEVERITY_BANDS.at(-1)
  );
}

export function buildNextSteps(score) {
  if (score >= 4) {
    return [
      "Escalate to crisis or incident management and immediately inform the board or privacy officer.",
      "Assess notification obligations and communication to the supervisory authority and data subjects with priority.",
      "Immediately scale up technical containment, forensic analysis, and additional monitoring.",
    ];
  }

  if (score >= 3) {
    return [
      "Prioritise the incident file and complete additional fact-gathering.",
      "Explicitly review the rights and freedoms of data subjects and prepare a communication plan.",
      "Expedite corrective measures and logging review.",
    ];
  }

  if (score >= 2) {
    return [
      "Conduct a further impact analysis and document mitigating actions.",
      "Explicitly record the notification decision with justification.",
      "Include aftercare and monitoring of affected systems in the case file.",
    ];
  }

  return [
    "Record the case file with justification for the low severity assessment.",
    "Complete remedial measures and verify that the incident is fully resolved.",
    "Incorporate lessons from the incident into process improvement and awareness.",
  ];
}
