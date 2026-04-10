/**
 * EDPB 9 criteria for determining whether a DPIA is required.
 * Source: EDPB Guidelines on Data Protection Impact Assessments (WP 248 rev.01)
 *
 * Rule: if 2 or more criteria are answered "Yes", a full DPIA must be carried out.
 */
export const PRE_DPIA_CRITERIA = [
  {
    id: 1,
    title: "Evaluation or scoring",
    description:
      "Does the processing involve evaluation or scoring of individuals, including profiling and predicting? This covers aspects concerning the data subject's performance at work, economic situation, health, personal preferences or interests, reliability or behaviour, location or movements.",
    example:
      "A financial institution that screens its customers against a credit reference database, or against an anti-money laundering and counter-terrorist financing (AML/CTF) database, or a fraud database.",
  },
  {
    id: 2,
    title: "Automated decision-making with legal or similar significant effect",
    description:
      "Does the processing involve automated decision-making that produces legal effects concerning the data subject, or similarly significantly affects the data subject? Processing that is intended to affect the data subject in a significant way.",
    example:
      "Processing that may lead to the exclusion or discrimination of individuals, such as automated rejection of an online credit application or e-recruiting practices without human intervention.",
  },
  {
    id: 3,
    title: "Systematic monitoring",
    description:
      "Does the processing involve systematic monitoring of a publicly accessible area or systematic observation, monitoring, or control of data subjects? This includes data collected through networks or a systematic monitoring of a publicly accessible area (e.g., CCTV).",
    example:
      "Use of CCTV cameras in public spaces, Wi-Fi tracking, or any other systematic monitoring of employee behaviour or public areas.",
  },
  {
    id: 4,
    title: "Sensitive data or data of a highly personal nature",
    description:
      "Does the processing involve special categories of data (Article 9 GDPR), data relating to criminal convictions and offences (Article 10 GDPR), or other data considered to increase risk such as electronic communications data, location data, financial data, etc.?",
    example:
      "A hospital maintaining patients' medical records, or an investigator keeping details on offenders or suspects. Also includes processing genetic data, biometric data, or data concerning a person's sex life or sexual orientation.",
  },
  {
    id: 5,
    title: "Data processed on a large scale",
    description:
      "Is the processing carried out on a large scale? The GDPR does not define what constitutes large-scale, but recital 91 provides guidance. Factors include: the number of data subjects, the volume of data, the range of data items, the duration/permanence, and the geographical extent.",
    example:
      "Processing of patient data by a hospital (not by an individual physician), processing of travel data of individuals using a city's public transport system, processing of real-time geo-location data for statistical purposes by a data processor specialised in providing these services.",
  },
  {
    id: 6,
    title: "Matching or combining datasets",
    description:
      "Does the processing involve matching or combining datasets? For example, datasets originating from two or more data processing operations performed for different purposes and/or by different data controllers in a way that would exceed the reasonable expectations of the data subject.",
    example:
      "Combining HR data with financial data and social media activity to build a comprehensive employee profile, or merging customer data from different service lines for a unified marketing strategy.",
  },
  {
    id: 7,
    title: "Data concerning vulnerable data subjects",
    description:
      "Does the processing concern vulnerable data subjects? The processing of personal data regarding vulnerable data subjects is a criterion because of the increased power imbalance between the data subjects and the data controller. Vulnerable individuals include children, employees, mentally ill persons, asylum seekers, the elderly, patients.",
    example:
      "Processing data of employees for workplace monitoring, processing data of children for an educational platform, or processing health data of elderly care home residents.",
  },
  {
    id: 8,
    title: "Innovative use or applying new technological or organisational solutions",
    description:
      "Does the processing involve innovative use of technology or organisational solutions? The GDPR makes clear (Article 35(1) and recitals 89 and 91) that the use of a new technology, defined in accordance with the achieved state of technological knowledge, can trigger the need to carry out a DPIA.",
    example:
      "Combining use of fingerprint and face recognition for physical access control, deploying an AI-based system for automated document classification, or using Internet of Things applications.",
  },
  {
    id: 9,
    title: "Processing preventing data subjects from exercising a right or using a service or contract",
    description:
      "Does the processing itself prevent data subjects from exercising a right or using a service or a contract? This includes processing operations that aim at allowing, modifying, or refusing data subjects' access to a service or entry into a contract (Article 22 and recital 91).",
    example:
      "A bank that screens its customers against a credit reference database in order to decide whether to offer them a loan, or an employer using a mandatory background check platform before offering a contract.",
  },
];

export const PRE_DPIA_THRESHOLD = 2; // minimum "Yes" answers to require a full DPIA

export const PRE_DPIA_FORM_FIELDS = [
  { key: "projectName", label: "Project / Processing name", type: "text", placeholder: "E.g.: New employee onboarding system" },
  { key: "assessor", label: "Assessor", type: "text", placeholder: "Name of the person conducting the pre-DPIA" },
  { key: "department", label: "Department / Entity", type: "text", placeholder: "E.g.: HR, IT, Vastint Poland" },
  { key: "date", label: "Assessment date", type: "date" },
];
