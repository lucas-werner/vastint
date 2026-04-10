import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  BookOpen,
  ClipboardCheck,
  GitBranch,
  ChevronRight,
  Download,
  CheckCircle2,
  ArrowRight,
  Users,
  FileText,
  AlertTriangle,
  Shield,
} from "lucide-react";

const GUIDES = [
  {
    id: "champions",
    title: "Privacy Champions Guide",
    subtitle: "Your role at a glance",
    icon: Users,
    fileName: "[DRAFT] Privacy Champions One Pager Guide Vastint.docx",
    status: "Draft",
    color: "vastintPrimary",
    sections: [
      {
        heading: "What is a Privacy Champion?",
        content:
          "A Privacy Champion is the local point of contact for data protection matters within each Vastint entity. You act as the bridge between the central privacy team and local business operations.",
      },
      {
        heading: "Key Responsibilities",
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
        heading: "Escalation Path",
        flow: [
          "Privacy Champion identifies issue",
          "Notify Privacy Officer (Lucas Noronha)",
          "Privacy Officer assesses with DPO (Johan Martens)",
          "DPO decides on regulatory notification",
        ],
      },
    ],
  },
  {
    id: "pre-dpia",
    title: "Pre-DPIA Checklist",
    subtitle: "Screening before a full assessment",
    icon: ClipboardCheck,
    fileName: "Vastint_Pre_DPIA_Checklist.docx",
    status: "Published",
    color: "green",
    sections: [
      {
        heading: "When to Use This Checklist",
        content:
          "Before starting any new project, tool, system, or processing activity that involves personal data, complete this screening to determine whether a full DPIA is required under Article 35 GDPR.",
      },
      {
        heading: "EDPB 9-Criteria Screening",
        items: [
          "Evaluation or scoring (including profiling)",
          "Automated decision-making with legal or significant effects",
          "Systematic monitoring of public areas",
          "Processing of sensitive or highly personal data",
          "Large-scale data processing",
          "Matching or combining datasets",
          "Data concerning vulnerable data subjects",
          "Innovative use of new technology",
          "Processing that prevents data subjects from exercising a right",
        ],
      },
      {
        heading: "Outcome",
        content:
          "If 2 or more criteria are met, a full DPIA must be carried out. Document your screening result and share it with the DPO for review, regardless of the outcome.",
      },
    ],
  },
  {
    id: "dpia-flow",
    title: "DPIA Procedure",
    subtitle: "Step-by-step assessment flow",
    icon: FileText,
    fileName: "Vastint_DPIA_Procedure_Flowchart.docx",
    status: "Published",
    color: "blue",
    sections: [
      {
        heading: "Overview",
        content:
          "The DPIA procedure ensures that high-risk processing activities are thoroughly assessed before they begin. Follow the steps below from initial screening through to final approval.",
      },
      {
        heading: "Procedure Steps",
        flow: [
          "Complete the Pre-DPIA screening checklist",
          "If DPIA required → gather processing details",
          "Describe the nature, scope, context & purpose",
          "Assess necessity and proportionality",
          "Identify and assess risks to data subjects",
          "Define mitigating measures for each risk",
          "DPO review and sign-off",
          "Implement measures and monitor ongoing compliance",
        ],
      },
      {
        heading: "Important Notes",
        items: [
          "A DPIA must be completed before processing begins",
          "The DPO must be consulted throughout the process",
          "If residual risk remains high, consult the supervisory authority",
          "Review the DPIA when processing changes significantly",
        ],
      },
    ],
  },
  {
    id: "dpa-flow",
    title: "DPA Procedure",
    subtitle: "Engaging third-party processors",
    icon: GitBranch,
    fileName: "Vastint_DPA_Procedure_Flowchart.docx",
    status: "Published",
    color: "amber",
    sections: [
      {
        heading: "When is a DPA Needed?",
        content:
          "A Data Processing Agreement must be in place whenever Vastint engages a third party that processes personal data on our behalf. This includes cloud providers, IT service companies, payroll processors, and any other external processor.",
      },
      {
        heading: "DPA Procedure Steps",
        flow: [
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
        heading: "Key DPA Clauses",
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
  },
];

const COLOR_MAP = {
  vastintPrimary: {
    bg: "bg-vastintPrimary/10",
    border: "border-vastintPrimary/30",
    text: "text-vastintPrimary",
    activeBg: "bg-vastintPrimary",
    dot: "bg-vastintPrimary",
  },
  green: {
    bg: "bg-green-900/20",
    border: "border-green-700/30",
    text: "text-green-400",
    activeBg: "bg-green-600",
    dot: "bg-green-500",
  },
  blue: {
    bg: "bg-blue-900/20",
    border: "border-blue-700/30",
    text: "text-blue-400",
    activeBg: "bg-blue-600",
    dot: "bg-blue-500",
  },
  amber: {
    bg: "bg-amber-900/20",
    border: "border-amber-700/30",
    text: "text-amber-400",
    activeBg: "bg-amber-600",
    dot: "bg-amber-500",
  },
};

export default function GuidanceView() {
  const { searchQuery } = useOutletContext();
  const [activeGuide, setActiveGuide] = useState(GUIDES[0].id);

  const q = searchQuery.toLowerCase();
  const filteredGuides = GUIDES.filter(
    (g) =>
      !q ||
      g.title.toLowerCase().includes(q) ||
      g.subtitle.toLowerCase().includes(q) ||
      g.sections.some(
        (s) =>
          s.heading.toLowerCase().includes(q) ||
          (s.content && s.content.toLowerCase().includes(q)) ||
          (s.items && s.items.some((item) => item.toLowerCase().includes(q))) ||
          (s.flow && s.flow.some((step) => step.toLowerCase().includes(q)))
      )
  );

  const guide =
    filteredGuides.find((g) => g.id === activeGuide) || filteredGuides[0];
  if (!guide) {
    return (
      <div className="w-full h-full pb-10 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-sans font-bold text-white">One-Pager Guidance</h1>
          <p className="text-vastintBeige/60 mt-2">Quick-reference guides for Vastint privacy champions.</p>
        </div>
        <div className="text-center py-12 text-white/30">
          <BookOpen size={40} className="mx-auto mb-3 opacity-50" />
          <p>No guides match your search.</p>
        </div>
      </div>
    );
  }
  const colors = COLOR_MAP[guide.color];

  return (
    <div className="w-full h-full pb-10 p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-sans font-bold text-white">
          One-Pager Guidance
        </h1>
        <p className="text-vastintBeige/60 mt-2">
          Quick-reference guides for Vastint privacy champions — essential
          procedures at a glance.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {filteredGuides.map((g) => {
          const Icon = g.icon;
          const isActive = activeGuide === g.id;
          const c = COLOR_MAP[g.color];
          return (
            <button
              key={g.id}
              onClick={() => setActiveGuide(g.id)}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium transition-all border ${
                isActive
                  ? `${c.bg} ${c.border} ${c.text}`
                  : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white/70"
              }`}
            >
              <Icon size={18} />
              <span className="hidden sm:inline">{g.title}</span>
            </button>
          );
        })}
      </div>

      {/* Guide Header Card */}
      <div
        className={`rounded-xl ${colors.bg} border ${colors.border} p-6 mb-6`}
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-xl ${colors.activeBg} flex items-center justify-center`}
            >
              <guide.icon size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{guide.title}</h2>
              <p className="text-sm text-white/50 mt-0.5">{guide.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                guide.status === "Published"
                  ? "bg-green-900/30 text-green-400"
                  : "bg-amber-900/30 text-amber-400"
              }`}
            >
              {guide.status}
            </span>
            <a
              href={`${import.meta.env.BASE_URL}docs/guidance/${guide.fileName}`}
              download
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-white/60 text-xs font-medium hover:bg-white/5 hover:text-white transition-colors"
            >
              <Download size={12} />
              Download DOCX
            </a>
          </div>
        </div>
      </div>

      {/* Guide Content Sections */}
      <div className="space-y-4">
        {guide.sections.map((section, idx) => (
          <div
            key={idx}
            className="bg-vastintSurface rounded-xl border border-white/10 p-6"
          >
            <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-md ${colors.activeBg} flex items-center justify-center text-white text-xs font-bold`}
              >
                {idx + 1}
              </div>
              {section.heading}
            </h3>

            {/* Text content */}
            {section.content && (
              <p className="text-sm text-white/60 leading-relaxed">
                {section.content}
              </p>
            )}

            {/* Bullet list */}
            {section.items && (
              <ul className="space-y-2.5">
                {section.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2
                      size={16}
                      className={`${colors.text} mt-0.5 shrink-0`}
                    />
                    <span className="text-sm text-white/60 leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {/* Visual Flowchart — snake pattern */}
            {section.flow && (() => {
              const perRow = 4;
              const rows = [];
              for (let r = 0; r < section.flow.length; r += perRow) {
                const items = section.flow.slice(r, r + perRow).map((step, j) => ({
                  step,
                  num: r + j + 1,
                }));
                rows.push(items);
              }
              return (
                <div className="space-y-2">
                  {rows.map((row, rowIdx) => {
                    const isReversed = rowIdx % 2 === 1;
                    const displayRow = isReversed ? [...row].reverse() : row;
                    return (
                      <div key={rowIdx}>
                        {/* Row of boxes with arrows */}
                        <div className="flex flex-col lg:flex-row lg:items-stretch gap-2 lg:gap-0">
                          {displayRow.map((item, colIdx) => (
                            <div key={item.num} className="contents">
                              {/* Horizontal arrow between boxes (desktop) */}
                              {colIdx > 0 && (
                                <div className="hidden lg:flex items-center justify-center w-8 shrink-0">
                                  {isReversed ? (
                                    <ArrowRight size={18} className={`${colors.text} opacity-70 rotate-180`} />
                                  ) : (
                                    <ArrowRight size={18} className={`${colors.text} opacity-70`} />
                                  )}
                                </div>
                              )}
                              {/* Vertical arrow between boxes (mobile) */}
                              {colIdx > 0 && (
                                <div className="lg:hidden flex justify-center py-0.5">
                                  <ArrowRight size={16} className={`${colors.text} opacity-60 rotate-90`} />
                                </div>
                              )}
                              {/* Step box */}
                              <div
                                className={`flex-1 rounded-xl border ${colors.border} bg-vastintDark p-4 flex flex-col items-center text-center min-h-[100px] justify-center`}
                              >
                                <div
                                  className={`w-7 h-7 rounded-full ${colors.activeBg} flex items-center justify-center text-white text-xs font-bold mb-2`}
                                >
                                  {item.num}
                                </div>
                                <p className="text-xs text-white/70 leading-relaxed font-medium">
                                  {item.step}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Down-turn connector between rows */}
                        {rowIdx < rows.length - 1 && (
                          <div className={`flex justify-center py-1 ${
                            isReversed
                              ? "lg:justify-start lg:pl-[calc(12.5%-4px)]"
                              : "lg:justify-end lg:pr-[calc(12.5%-4px)]"
                          }`}>
                            <div className="flex flex-col items-center">
                              <div className={`w-0.5 h-3 ${colors.dot} opacity-40`} />
                              <ArrowRight size={18} className={`${colors.text} opacity-70 rotate-90`} />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>
        ))}
      </div>
    </div>
  );
}
