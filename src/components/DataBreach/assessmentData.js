export const INCIDENT_FIELDS = [
  {
    key: "dossierTitel",
    label: "Case title",
    type: "text",
    placeholder: "E.g.: Customer portal data breach March 2026",
  },
  {
    key: "organisatie",
    label: "Organisation",
    type: "text",
    placeholder: "Name of the organisation",
  },
  {
    key: "beoordelaar",
    label: "Assessor",
    type: "text",
    placeholder: "Name of the assessor",
  },
  { key: "datumIncident", label: "Incident date", type: "date" },
  { key: "datumBeoordeling", label: "Assessment date", type: "date" },
];

export const LONG_FIELDS = [
  {
    key: "samenvatting",
    label: "Brief summary of the incident",
    placeholder:
      "Describe what happened, which systems were involved, and which data subjects were affected.",
  },
  {
    key: "maatregelen",
    label: "Mitigating measures and follow-up",
    placeholder:
      "Describe containment, recovery, communication, and planned follow-up actions.",
  },
];

export const DPC_VARIANTS = {
  eenvoudig: {
    id: "eenvoudig",
    title: "Simple data",
    base: 1,
    description:
      "For example name, contact details, professional data, or basic administrative records.",
    scores: [
      {
        value: 1,
        label: "1",
        title: "Base score",
        description:
          "Only simple data, without significant aggravating factors.",
      },
      {
        value: 2,
        label: "2",
        title: "Increased by 1",
        description:
          "The data enables additional profiling, such as social or financial status.",
      },
      {
        value: 3,
        label: "3",
        title: "Increased by 2",
        description:
          "Assumptions can be drawn about sensitive characteristics or a vulnerable context.",
      },
      {
        value: 4,
        label: "4",
        title: "Increased by 3",
        description:
          "The combination involves vulnerable groups, minors, or a high-impact context.",
      },
    ],
  },
  gedrag: {
    id: "gedrag",
    title: "Behavioural data",
    base: 2,
    description:
      "For example preferences, habits, location or traffic data.",
    scores: [
      {
        value: 1,
        label: "1",
        title: "Decreased by 1",
        description: "Only limited behavioural insight is possible.",
      },
      {
        value: 2,
        label: "2",
        title: "Base score",
        description:
          "Normal context for behavioural data without further aggravation.",
      },
      {
        value: 3,
        label: "3",
        title: "Increased by 1",
        description:
          "The data allows for a detailed behavioural profile.",
      },
      {
        value: 4,
        label: "4",
        title: "Increased by 2",
        description:
          "The behavioural profile reveals sensitive patterns or vulnerabilities.",
      },
    ],
  },
  financieel: {
    id: "financieel",
    title: "Financial data",
    base: 3,
    description:
      "For example transactions, bank statements, income, investments, or credit card data.",
    scores: [
      {
        value: 1,
        label: "1",
        title: "Decreased by 2",
        description:
          "Very limited financial insight or strongly outdated information.",
      },
      {
        value: 2,
        label: "2",
        title: "Decreased by 1",
        description: "Limited or partial financial information.",
      },
      {
        value: 3,
        label: "3",
        title: "Base score",
        description: "Regular financial information with normal risk.",
      },
      {
        value: 4,
        label: "4",
        title: "Increased by 1",
        description:
          "A complete or directly usable financial profile is visible.",
      },
    ],
  },
  bijzonder: {
    id: "bijzonder",
    title: "Special or sensitive data",
    base: 4,
    description:
      "For example health data, political opinions, religion, sexual orientation, or other special categories.",
    scores: [
      {
        value: 1,
        label: "1",
        title: "Decreased by 3",
        description:
          "The information was already made public by the data subject or is barely relevant anymore.",
      },
      {
        value: 2,
        label: "2",
        title: "Decreased by 2",
        description: "Only general or outdated assumptions are possible.",
      },
      {
        value: 3,
        label: "3",
        title: "Decreased by 1",
        description:
          "There is sensitivity, but the context limits the impact.",
      },
      {
        value: 4,
        label: "4",
        title: "Base score",
        description:
          "Full special category personal data in a sensitive context.",
      },
    ],
  },
};

export const CRITERIA = [
  {
    id: "dpc",
    shortLabel: "DPC",
    title: "Data Processing Context",
    subtitle:
      "Determine the sensitivity of the data and the context in which it was processed.",
    intro:
      "DPC is the core of the ENISA assessment. First choose the data type and then the appropriate context score.",
    helpTitle: "What does DPC assess?",
    helpBody:
      "The data processing context looks not only at the type of personal data, but also at the context. Simple data can carry more weight if, for example, it enables profiling. Sensitive data can score lower if it is outdated or already publicly available.",
    helpHow:
      "First choose the main category that best fits the data breach. Then choose the score that best describes how much additional risk arises from the context.",
    helpExample:
      "Example: a list of names and email addresses is usually simple. If that list also reveals someone's financial position or vulnerability, the score can be increased.",
    type: "dpc",
  },
  {
    id: "ei",
    shortLabel: "EI",
    title: "Ease of Identification",
    subtitle:
      "How easily can a data subject be identified based on the leaked data?",
    intro:
      "The easier a person is to identify directly or indirectly, the higher the score.",
    helpTitle: "What does EI assess?",
    helpBody:
      "Ease of Identification measures how simple it is to link the data to a specific person. This depends on direct identifiers, the amount of context, and whether the organisation itself has additional information available.",
    helpHow:
      "Choose a low score if identification remains difficult without supplementary data. Choose a high score if the data subject can be recognised directly or with minimal effort.",
    helpExample:
      "Example: only an internal customer number without a reference table can score low. Name plus email address or national ID number makes identification directly possible and scores high.",
    options: [
      {
        value: 0.25,
        label: "0.25",
        title: "Very difficult",
        description:
          "Identification is very challenging and requires a lot of additional information.",
      },
      {
        value: 0.5,
        label: "0.50",
        title: "Difficult",
        description:
          "Identification is possible, but requires additional steps or context.",
      },
      {
        value: 0.75,
        label: "0.75",
        title: "Reasonably easy",
        description:
          "Multiple indicators make identification likely.",
      },
      {
        value: 1,
        label: "1.00",
        title: "Directly identifiable",
        description:
          "The data subject is directly or almost directly recognisable.",
      },
    ],
  },
  {
    id: "confidentiality",
    shortLabel: "CONF",
    title: "Loss of Confidentiality",
    subtitle:
      "Assess the extent to which unauthorised parties may have gained knowledge of the data.",
    intro:
      "This component measures the impact of unauthorised disclosure or access.",
    helpTitle: "What does loss of confidentiality assess?",
    helpBody:
      "This factor looks at the degree to which personal data has been exposed to unauthorised parties. The greater or more uncontrollable the spread, the heavier the impact on the data subject.",
    helpHow:
      "Choose zero if there was no actual exposure. Choose higher scores when data ended up with a smaller or larger audience.",
    helpExample:
      "Example: a message sent to one wrong but known recipient is less severe than publication on a public platform.",
    options: [
      {
        value: 0,
        label: "0.00",
        title: "No loss",
        description:
          "There is no established loss of confidentiality.",
      },
      {
        value: 0.25,
        label: "0.25",
        title: "Limited exposure",
        description:
          "The data reached a small and known number of unauthorised parties.",
      },
      {
        value: 0.5,
        label: "0.50",
        title: "Broad exposure",
        description:
          "The data reached multiple unauthorised parties or a larger group.",
      },
    ],
  },
  {
    id: "integrity",
    shortLabel: "INTEG",
    title: "Loss of Integrity",
    subtitle:
      "Assess whether data has been altered, falsified, or otherwise rendered unreliable.",
    intro:
      "This component weighs the damage when data is no longer correct or complete.",
    helpTitle: "What does loss of integrity assess?",
    helpBody:
      "Integrity concerns the accuracy and completeness of the data. If data has been altered without authorisation, this can have direct consequences for decisions, processes, and data subjects.",
    helpHow:
      "Choose zero if the data remained unchanged. Choose a higher score if there are modifications that are difficult or impossible to correct.",
    helpExample:
      "Example: an incorrectly modified account number in a system can lead to erroneous payments and therefore scores higher.",
    options: [
      {
        value: 0,
        label: "0.00",
        title: "No loss",
        description: "The data has not been modified.",
      },
      {
        value: 0.25,
        label: "0.25",
        title: "Limited modification",
        description: "There were modifications, but recovery is relatively straightforward.",
      },
      {
        value: 0.5,
        label: "0.50",
        title: "Serious modification",
        description:
          "The data has become unreliable or is not properly recoverable.",
      },
    ],
  },
  {
    id: "availability",
    shortLabel: "AVAIL",
    title: "Loss of Availability",
    subtitle:
      "Assess whether data was temporarily or permanently unavailable for legitimate use.",
    intro:
      "Loss of availability can independently have a serious effect on data subjects.",
    helpTitle: "What does loss of availability assess?",
    helpBody:
      "Availability measures whether data remained usable and accessible for its intended purpose. Especially in healthcare, services, or financial processes, even temporary loss can be significant.",
    helpHow:
      "Choose zero when data could be quickly restored or remained available via backup. Choose a higher score for prolonged or permanent loss.",
    helpExample:
      "Example: a backup enables quick recovery and limits the score. Complete loss without a recovery path weighs more heavily.",
    options: [
      {
        value: 0,
        label: "0.00",
        title: "No loss",
        description:
          "The data remained available or was immediately recoverable.",
      },
      {
        value: 0.25,
        label: "0.25",
        title: "Temporary loss",
        description:
          "The data was temporarily unavailable, with limited duration or impact.",
      },
      {
        value: 0.5,
        label: "0.50",
        title: "Serious loss",
        description:
          "The data is unavailable for a prolonged period or permanently.",
      },
    ],
  },
  {
    id: "maliciousIntent",
    shortLabel: "INTENT",
    title: "Malicious Intent",
    subtitle:
      "Assess whether there are indications of deliberate or malicious actions.",
    intro:
      "Malicious intent can increase severity because misuse becomes more likely.",
    helpTitle: "What does malicious intent assess?",
    helpBody:
      "This factor considers the circumstances of the incident. An accident without indications of misuse is less severe than a targeted attack or deliberate exfiltration.",
    helpHow:
      "Choose zero if the incident was accidental or without indications of intent. Choose 0.50 if there are clear signals of deliberate or malicious actions.",
    helpExample:
      "Example: ransomware, credential theft, or targeted data exfiltration are strong indicators of malicious intent.",
    options: [
      {
        value: 0,
        label: "0.00",
        title: "No indication",
        description:
          "The incident appears to be accidental or without indication of intent.",
      },
      {
        value: 0.5,
        label: "0.50",
        title: "Indication of intent",
        description:
          "There are clear signals of deliberate or malicious actions.",
      },
    ],
  },
];

export const DEFAULT_FORM = {
  dossierTitel: "Data breach severity assessment",
  organisatie: "",
  beoordelaar: "",
  datumIncident: "",
  datumBeoordeling: new Date().toISOString().slice(0, 10),
  samenvatting: "",
  maatregelen: "",
};

export const DEFAULT_SELECTIONS = {
  dpcVariant: DPC_VARIANTS.eenvoudig.id,
  dpc: 1,
  ei: 0.25,
  confidentiality: 0,
  integrity: 0,
  availability: 0,
  maliciousIntent: 0,
};

export const SEVERITY_BANDS = [
  {
    min: 0,
    max: 2,
    label: "Low",
    tone: "text-dpo-green",
    box: "border-dpo-green/30 bg-dpo-green/10",
    summary:
      "The likely impact on data subjects is limited and generally manageable without serious lasting harm.",
  },
  {
    min: 2,
    max: 3,
    label: "Medium",
    tone: "text-dpo-yellow",
    box: "border-dpo-yellow/40 bg-dpo-yellow/12",
    summary:
      "Data subjects may experience noticeable inconvenience or distress and may need additional effort to limit consequences.",
  },
  {
    min: 3,
    max: 4,
    label: "High",
    tone: "text-dpo-rose",
    box: "border-dpo-rose/40 bg-dpo-rose/12",
    summary:
      "Serious consequences are conceivable, such as financial damage, reputational harm, or infringement of rights and freedoms.",
  },
  {
    min: 4,
    max: Number.POSITIVE_INFINITY,
    label: "Very high",
    tone: "text-dpo-red",
    box: "border-dpo-red/40 bg-dpo-red/10",
    summary:
      "The consequences can be severe, prolonged, or difficult to recover from and require immediate follow-up and escalation.",
  },
];
