/**
 * One-pager topic cards — concise single-page privacy reference sheets for Vastint.
 */

export const ONE_PAGERS = [
  {
    id: "data-breach",
    title: "Data Breach Response",
    subtitle: "What to do when you suspect a data breach",
    color: "red",
    icon: "ShieldAlert",
    audience: "All employees",
    version: "v1.0",
    lastUpdated: "2026-04-01",
    summary:
      "A personal data breach is any security incident that leads to the accidental or unlawful destruction, loss, alteration, unauthorised disclosure of, or access to personal data. Every Vastint employee must know how to recognise and report a breach.",
    sections: [
      {
        heading: "What is a data breach?",
        body: "Any incident where personal data is accidentally or unlawfully accessed, disclosed, altered, lost, or destroyed. This includes sending an email to the wrong recipient, losing a laptop with unencrypted data, or a cyber attack.",
      },
      {
        heading: "What should I do?",
        items: [
          "Stop the breach immediately if you can (e.g. recall an email)",
          "Do NOT try to investigate or fix IT issues yourself",
          "Report to your Privacy Champion or the Privacy Team within 1 hour",
          "Document what happened: what data, how many people affected, when it occurred",
          "Do not communicate externally about the breach",
        ],
      },
      {
        heading: "Timeline",
        body: "Vastint must notify the Data Protection Authority within 72 hours if the breach poses a risk to individuals. This is why immediate internal reporting is critical — every hour counts.",
      },
    ],
    dos: [
      "Report immediately — even if you're not sure",
      "Preserve evidence (screenshots, emails)",
      "Follow instructions from the Privacy Team",
      "Be transparent and accurate in your report",
    ],
    donts: [
      "Don't ignore or hide a breach",
      "Don't try to fix IT security issues yourself",
      "Don't communicate about the breach externally",
      "Don't delete evidence",
    ],
    contact: "privacy@vastint.com",
    relatedPolicy: "Personal Data Breach Response Procedure",
  },
  {
    id: "dpia",
    title: "DPIA — When & Why",
    subtitle: "Data Protection Impact Assessment essentials",
    color: "blue",
    icon: "FileSearch",
    audience: "Project managers, IT, Privacy Champions",
    version: "v1.0",
    lastUpdated: "2026-04-01",
    summary:
      "A DPIA is mandatory under GDPR when processing is likely to result in a high risk to individuals' rights and freedoms. Use the Pre-DPIA checklist to determine if a full DPIA is needed before starting any new project or processing activity.",
    sections: [
      {
        heading: "When is a DPIA required?",
        body: "When your processing meets 2 or more of the EDPB's 9 criteria: evaluation/scoring, automated decision-making, systematic monitoring, sensitive data, large scale processing, combining datasets, vulnerable data subjects, innovative technology, or preventing people from exercising their rights.",
      },
      {
        heading: "How to get started",
        items: [
          "Use the Pre-DPIA Checklist in the Vastint Privacy Platform",
          "Answer the 9 EDPB criteria questions honestly",
          "If 2+ criteria are met → a full DPIA is required",
          "Contact the Privacy Team to initiate a full DPIA",
          "Complete the assessment BEFORE the processing begins",
        ],
      },
      {
        heading: "Key principle",
        body: "A DPIA is not a one-time activity. It should be reviewed whenever there is a significant change to the processing activity, the technology used, or the context in which data is processed.",
      },
    ],
    dos: [
      "Start the Pre-DPIA checklist early in the project",
      "Involve the Privacy Team from the beginning",
      "Document your reasoning for each criterion",
      "Review and update DPIAs when processing changes",
    ],
    donts: [
      "Don't start processing without a DPIA assessment",
      "Don't treat the DPIA as a formality — take it seriously",
      "Don't skip criteria because they seem unlikely",
      "Don't forget to involve the DPO for high-risk processing",
    ],
    contact: "privacy@vastint.com",
    relatedPolicy: "DPIA Procedure",
  },
  {
    id: "data-subject-requests",
    title: "Data Subject Requests",
    subtitle: "How to handle rights requests from individuals",
    color: "purple",
    icon: "UserCheck",
    audience: "All employees, HR, Privacy Champions",
    version: "v1.0",
    lastUpdated: "2026-04-01",
    summary:
      "Under GDPR, individuals have the right to access, rectify, erase, restrict, port, and object to processing of their personal data. Vastint must respond within 1 month. Every employee who receives such a request must forward it immediately.",
    sections: [
      {
        heading: "What rights do data subjects have?",
        items: [
          "Right of access — see what data we hold about them",
          "Right to rectification — correct inaccurate data",
          "Right to erasure ('right to be forgotten')",
          "Right to restrict processing",
          "Right to data portability",
          "Right to object to processing",
          "Right not to be subject to automated decision-making",
        ],
      },
      {
        heading: "What should I do if I receive a request?",
        items: [
          "Acknowledge the request and note the date received",
          "Forward it to the Privacy Team (privacy@vastint.com) immediately",
          "Do NOT respond to the data subject yourself",
          "Do NOT delete any data before consulting the Privacy Team",
          "The Privacy Team will verify identity and handle the response",
        ],
      },
      {
        heading: "Response deadline",
        body: "Vastint must respond within 1 calendar month from the date of receipt. If the request is complex, this can be extended by 2 additional months — but we must inform the data subject of the extension within the first month.",
      },
    ],
    dos: [
      "Forward every request to privacy@vastint.com immediately",
      "Note the exact date and channel of the request",
      "Cooperate with the Privacy Team's instructions",
      "Keep the request confidential",
    ],
    donts: [
      "Don't respond to the individual directly",
      "Don't delete data before checking with the Privacy Team",
      "Don't ignore or delay forwarding the request",
      "Don't share the request with colleagues who don't need to know",
    ],
    contact: "privacy@vastint.com",
    relatedPolicy: "Data Subject Request Procedure",
  },
  {
    id: "data-processing",
    title: "Lawful Data Processing",
    subtitle: "Rules for processing personal data at Vastint",
    color: "green",
    icon: "Database",
    audience: "All employees",
    version: "v1.0",
    lastUpdated: "2026-04-01",
    summary:
      "Every processing of personal data at Vastint must have a legal basis under GDPR. The most common bases are: contract performance, legal obligation, legitimate interest, and consent. Always process the minimum data necessary for your purpose.",
    sections: [
      {
        heading: "The 6 legal bases under GDPR",
        items: [
          "Consent — the individual has given clear consent",
          "Contract — processing is necessary for a contract with the individual",
          "Legal obligation — processing is required by law",
          "Vital interests — protecting someone's life",
          "Public task — processing for an official function or task in the public interest",
          "Legitimate interest — processing is necessary for Vastint's legitimate interests (with balancing test)",
        ],
      },
      {
        heading: "Key principles to follow",
        items: [
          "Purpose limitation — only use data for the purpose it was collected",
          "Data minimisation — only collect what you need",
          "Accuracy — keep data accurate and up to date",
          "Storage limitation — don't keep data longer than necessary",
          "Integrity & confidentiality — protect data against unauthorised access",
        ],
      },
    ],
    dos: [
      "Know the legal basis for your processing activity",
      "Only collect the data you actually need",
      "Keep records of processing activities up to date",
      "Delete data when it's no longer needed",
    ],
    donts: [
      "Don't process personal data 'just because you have it'",
      "Don't use data for a different purpose than it was collected for",
      "Don't store data indefinitely without a retention policy",
      "Don't share personal data without a valid reason",
    ],
    contact: "privacy@vastint.com",
    relatedPolicy: "Personal Data Protection Manual",
  },
  {
    id: "cross-border-transfers",
    title: "Cross-Border Data Transfers",
    subtitle: "Transferring personal data outside the EEA",
    color: "amber",
    icon: "Globe",
    audience: "IT, Legal, Project Managers, Privacy Champions",
    version: "v1.0",
    lastUpdated: "2026-04-01",
    summary:
      "Transferring personal data outside the European Economic Area (EEA) requires additional safeguards under GDPR. This includes using cloud services, sharing data with Vastint entities outside Europe, or engaging suppliers in third countries.",
    sections: [
      {
        heading: "When does this apply?",
        body: "Any time personal data leaves the EEA — this includes storing data on servers outside Europe, using SaaS tools with non-EEA processing, sharing employee or tenant data with entities outside the EEA, and engaging sub-processors in third countries.",
      },
      {
        heading: "What safeguards are needed?",
        items: [
          "Adequacy decision — the European Commission has approved the country's data protection level",
          "Standard Contractual Clauses (SCCs) — approved contract clauses between sender and receiver",
          "Transfer Impact Assessment (TIA) — evaluating risks of the transfer",
          "Binding Corporate Rules — for intra-group transfers",
          "Derogations — limited exceptions (e.g. explicit consent, contract necessity)",
        ],
      },
      {
        heading: "Before you transfer",
        body: "Always consult the Privacy Team before setting up a new international data transfer. A Transfer Impact Assessment may be required to evaluate whether the destination country provides adequate protection.",
      },
    ],
    dos: [
      "Check with the Privacy Team before any new international transfer",
      "Ensure SCCs or other safeguards are in place",
      "Complete a TIA when required",
      "Keep records of all cross-border transfers",
    ],
    donts: [
      "Don't transfer data outside the EEA without authorisation",
      "Don't assume a cloud service is 'EEA-only' — verify it",
      "Don't sign contracts with international suppliers without Privacy Team review",
      "Don't rely on consent as the standard basis for transfers",
    ],
    contact: "privacy@vastint.com",
    relatedPolicy: "Cross Border Data Transfers Policy",
  },
  {
    id: "data-retention",
    title: "Data Retention & Deletion",
    subtitle: "How long we keep data and when to delete it",
    color: "teal",
    icon: "Clock",
    audience: "All employees, HR, IT",
    version: "v1.0",
    lastUpdated: "2026-04-01",
    summary:
      "Personal data must not be kept longer than necessary. Vastint has defined retention periods for each category of data. When the retention period expires, data must be securely deleted or anonymised.",
    sections: [
      {
        heading: "Why retention matters",
        body: "GDPR's storage limitation principle requires that personal data is kept only as long as necessary for its original purpose. Keeping data too long increases risk and exposes Vastint to regulatory fines.",
      },
      {
        heading: "Common retention periods at Vastint",
        items: [
          "Candidate/recruitment data — 4 weeks after rejection, unless consent given for longer",
          "Employee HR files — up to 5 years after end of employment (varies by country)",
          "Financial/payroll records — 7 years (legal obligation)",
          "Tenant data — duration of lease + statutory limitation period",
          "Contract data — duration of contract + statutory limitation period",
          "Marketing/consent records — until consent is withdrawn",
        ],
      },
      {
        heading: "Your responsibility",
        body: "If you manage files, databases, or records containing personal data, ensure you follow the retention schedule. When in doubt about whether to delete data, consult the Privacy Team.",
      },
    ],
    dos: [
      "Follow the Vastint retention schedule for your data category",
      "Delete or anonymise data when the retention period expires",
      "Use secure deletion methods (don't just move to trash)",
      "Consult the Privacy Team if unsure about retention periods",
    ],
    donts: [
      "Don't keep personal data 'just in case'",
      "Don't store data beyond the defined retention period",
      "Don't create personal copies of HR or sensitive data",
      "Don't forget about data in shared drives, backups, and email archives",
    ],
    contact: "privacy@vastint.com",
    relatedPolicy: "Personal Data Retention Procedure",
  },
  {
    id: "dpa-procedure",
    title: "DPA Procedure",
    subtitle: "Engaging third-party data processors",
    color: "indigo",
    icon: "Lock",
    audience: "Legal, IT, Procurement, Privacy Champions",
    version: "v1.0",
    lastUpdated: "2026-04-01",
    summary:
      "A Data Processing Agreement must be in place whenever Vastint engages a third party that processes personal data on our behalf. This includes cloud providers, IT service companies, payroll processors, and any other external processor.",
    sections: [
      {
        heading: "When is a DPA needed?",
        body: "Whenever Vastint engages a third party that processes personal data on our behalf. This includes cloud providers, IT service companies, payroll processors, and any other external processor.",
      },
      {
        heading: "DPA procedure steps",
        items: [
          "Identify the need for a third-party processor",
          "Conduct due diligence on the processor's data protection practices",
          "Determine the roles: controller vs processor",
          "Draft or review the DPA (use Vastint template)",
          "Ensure all Article 28 GDPR requirements are covered",
          "Both parties sign the DPA before processing begins",
          "Record the arrangement in the ROPA",
          "Monitor processor compliance on an ongoing basis",
        ],
      },
      {
        heading: "Key DPA clauses",
        items: [
          "Subject matter and duration of processing",
          "Nature and purpose of processing",
          "Categories of personal data and data subjects",
          "Obligations and rights of the controller",
          "Sub-processor approval and notification requirements",
          "Data breach notification within 24 hours",
          "Deletion or return of data upon contract termination",
        ],
      },
    ],
    dos: [
      "Use the Vastint DPA template as a starting point",
      "Ensure the DPA is signed before any processing begins",
      "Record all DPAs and sub-processors in the ROPA",
      "Review DPAs regularly and when contracts are renewed",
    ],
    donts: [
      "Don't engage a processor without a signed DPA",
      "Don't accept a processor's standard terms without Privacy Team review",
      "Don't allow sub-processing without prior written approval",
      "Don't forget to include data breach notification obligations",
    ],
    contact: "privacy@vastint.com",
    relatedPolicy: "Data Processing Agreement Template",
  },
  {
    id: "privacy-champions",
    title: "Privacy Champions",
    subtitle: "Your role as a local privacy point of contact",
    color: "rose",
    icon: "Layers",
    audience: "Privacy Champions",
    version: "v1.0 — Draft",
    lastUpdated: "2026-04-01",
    summary:
      "A Privacy Champion is the local point of contact for data protection matters within each Vastint entity. You act as the bridge between the central privacy team and local business operations, ensuring privacy practices are followed day-to-day.",
    sections: [
      {
        heading: "What is a Privacy Champion?",
        body: "A Privacy Champion is the local point of contact for data protection matters within each Vastint entity. You act as the bridge between the central privacy team and local business operations.",
      },
      {
        heading: "Key responsibilities",
        items: [
          "Be the first point of contact for privacy questions in your entity",
          "Escalate potential data breaches to the DPO within 24 hours",
          "Support the completion of DPIAs and pre-DPIA screenings",
          "Ensure local processing activities are recorded in the ROPA",
          "Promote privacy awareness among colleagues",
          "Coordinate with the DPO on data subject access requests",
        ],
      },
      {
        heading: "Escalation path",
        body: "Privacy Champion identifies issue → Notify Privacy Officer (Lucas Noronha) → Privacy Officer assesses with DPO (Johan Martens) → DPO decides on regulatory notification.",
      },
    ],
    dos: [
      "Stay up to date with privacy policies and procedures",
      "Proactively raise privacy concerns with the Privacy Team",
      "Attend Privacy Champion training sessions regularly",
      "Keep a local overview of processing activities in your entity",
    ],
    donts: [
      "Don't make data protection decisions without consulting the DPO",
      "Don't delay escalating potential breaches",
      "Don't assume IT handles all privacy matters",
      "Don't ignore privacy questions from colleagues",
    ],
    contact: "privacy@vastint.com",
    relatedPolicy: "Privacy Champions Guide",
  },
];

export const ONE_PAGER_COLORS = {
  red:    { bg: "bg-red-900/20",    border: "border-red-500/30",    text: "text-red-400",    badge: "bg-red-900/40 text-red-300",    accent: "bg-red-600",    light: "bg-red-900/30",    icon: "text-red-400" },
  blue:   { bg: "bg-blue-900/20",   border: "border-blue-500/30",   text: "text-blue-400",   badge: "bg-blue-900/40 text-blue-300",   accent: "bg-blue-600",   light: "bg-blue-900/30",   icon: "text-blue-400" },
  purple: { bg: "bg-purple-900/20", border: "border-purple-500/30", text: "text-purple-400", badge: "bg-purple-900/40 text-purple-300", accent: "bg-purple-600", light: "bg-purple-900/30", icon: "text-purple-400" },
  green:  { bg: "bg-green-900/20",  border: "border-green-500/30",  text: "text-green-400",  badge: "bg-green-900/40 text-green-300",  accent: "bg-green-600",  light: "bg-green-900/30",  icon: "text-green-400" },
  amber:  { bg: "bg-amber-900/20",  border: "border-amber-500/30",  text: "text-amber-400",  badge: "bg-amber-900/40 text-amber-300",  accent: "bg-amber-600",  light: "bg-amber-900/30",  icon: "text-amber-400" },
  teal:   { bg: "bg-teal-900/20",   border: "border-teal-500/30",   text: "text-teal-400",   badge: "bg-teal-900/40 text-teal-300",   accent: "bg-teal-600",   light: "bg-teal-900/30",   icon: "text-teal-400" },
  indigo: { bg: "bg-indigo-900/20", border: "border-indigo-500/30", text: "text-indigo-400", badge: "bg-indigo-900/40 text-indigo-300", accent: "bg-indigo-600", light: "bg-indigo-900/30", icon: "text-indigo-400" },
  rose:   { bg: "bg-rose-900/20",   border: "border-rose-500/30",   text: "text-rose-400",   badge: "bg-rose-900/40 text-rose-300",   accent: "bg-rose-600",   light: "bg-rose-900/30",   icon: "text-rose-400" },
};
