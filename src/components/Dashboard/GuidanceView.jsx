import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldAlert,
  FileSearch,
  UserCheck,
  Database,
  Globe,
  Clock,
  Lock,
  Layers,
  Plus,
  X,
  CheckCircle2,
  XCircle,
  Mail,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { ONE_PAGERS, ONE_PAGER_COLORS } from "../../data/onePagerData";

const ICON_MAP = {
  ShieldAlert,
  FileSearch,
  UserCheck,
  Database,
  Globe,
  Clock,
  Lock,
  Layers,
};

export default function GuidanceView() {
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState(null);

  const activePager = activeId
    ? ONE_PAGERS.find((p) => p.id === activeId)
    : null;
  const activeColors = activePager
    ? ONE_PAGER_COLORS[activePager.color]
    : null;
  const ActiveIcon = activePager ? ICON_MAP[activePager.icon] : null;

  return (
    <div className="w-full h-full pb-10 p-8">
      {/* HERO */}
      <div className="relative mb-8 rounded-2xl bg-gradient-to-br from-vastintDark to-vastintSurface overflow-hidden shadow-lg border border-white/10">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-rule='evenodd'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
        <div className="relative px-8 py-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">
              Privacy FAQ
            </h1>
            <p className="text-white/60 text-sm max-w-xl">
              Quick-reference sheets on key privacy topics for all Vastint
              employees. Click any card to read the full one-pager.
            </p>
          </div>

          <button
            onClick={() => navigate("/dashboard/dpias/new")}
            className="shrink-0 inline-flex items-center gap-2.5 bg-vastintPrimary hover:bg-vastintPrimary/90 text-white pl-5 pr-6 py-3.5 rounded-xl font-semibold text-sm shadow-lg shadow-vastintPrimary/25 transition-all hover:shadow-xl hover:shadow-vastintPrimary/30 hover:-translate-y-0.5"
          >
            <Plus size={20} strokeWidth={2.5} />
            New DPIA
          </button>
        </div>
      </div>

      {/* GRID */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {ONE_PAGERS.map((pager) => {
          const colors = ONE_PAGER_COLORS[pager.color];
          const Icon = ICON_MAP[pager.icon];
          return (
            <button
              key={pager.id}
              onClick={() => setActiveId(pager.id)}
              className={`group text-left rounded-2xl border ${colors.border} ${colors.bg} p-5 transition-all hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-vastintPrimary/30`}
            >
              <div className="flex items-start gap-3 mb-3">
                <div
                  className={`w-10 h-10 rounded-xl ${colors.light} flex items-center justify-center shrink-0`}
                >
                  {Icon && <Icon size={20} className={colors.icon} />}
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-white leading-tight">
                    {pager.title}
                  </h3>
                  <p className="text-xs text-white/50 mt-0.5 leading-snug">
                    {pager.subtitle}
                  </p>
                </div>
              </div>
              <p className="text-xs text-white/40 line-clamp-2 mb-3">
                {pager.summary}
              </p>
              <div className="flex items-center justify-between">
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${colors.badge}`}
                >
                  {pager.audience}
                </span>
                <ArrowRight
                  size={14}
                  className="text-white/20 group-hover:text-white/50 transition-colors"
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* DETAIL MODAL */}
      {activePager && activeColors && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setActiveId(null)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] bg-vastintSurface rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={`${activeColors.accent} px-6 py-5 shrink-0`}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
                    {ActiveIcon && (
                      <ActiveIcon size={22} className="text-white" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">
                      {activePager.title}
                    </h2>
                    <p className="text-white/70 text-xs mt-0.5">
                      {activePager.subtitle}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveId(null)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Meta badges */}
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-white/20 text-white px-2.5 py-1 rounded-full">
                  <BookOpen size={10} />
                  {activePager.version}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-white/20 text-white px-2.5 py-1 rounded-full">
                  {activePager.audience}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-white/20 text-white px-2.5 py-1 rounded-full">
                  Updated {activePager.lastUpdated}
                </span>
              </div>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Summary */}
              <div
                className={`rounded-xl ${activeColors.bg} border ${activeColors.border} p-4`}
              >
                <p className="text-sm text-white/70 leading-relaxed">
                  {activePager.summary}
                </p>
              </div>

              {/* Sections */}
              {activePager.sections.map((section, i) => (
                <div key={i}>
                  <h3 className="text-sm font-bold text-white mb-2">
                    {section.heading}
                  </h3>
                  {section.body && (
                    <p className="text-sm text-white/60 leading-relaxed">
                      {section.body}
                    </p>
                  )}
                  {section.items && (
                    <ul className="space-y-1.5 mt-1">
                      {section.items.map((item, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2 text-sm text-white/60"
                        >
                          <span
                            className={`mt-1.5 w-1.5 h-1.5 rounded-full ${activeColors.accent} shrink-0`}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              {/* Do's & Don'ts */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-xl border-2 border-green-700/40 bg-green-900/20 p-4">
                  <h4 className="text-xs font-bold text-green-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <CheckCircle2 size={14} />
                    Do
                  </h4>
                  <ul className="space-y-2">
                    {activePager.dos.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-green-300/80"
                      >
                        <CheckCircle2
                          size={14}
                          className="text-green-500 shrink-0 mt-0.5"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border-2 border-red-700/40 bg-red-900/20 p-4">
                  <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <XCircle size={14} />
                    Don't
                  </h4>
                  <ul className="space-y-2">
                    {activePager.donts.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-red-300/80"
                      >
                        <XCircle
                          size={14}
                          className="text-red-400 shrink-0 mt-0.5"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Footer: contact + related policy */}
              <div className="rounded-xl border border-white/10 bg-vastintDark p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-1">
                    Questions? Contact the Privacy Team
                  </p>
                  <a
                    href={`mailto:${activePager.contact}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-vastintPrimary hover:underline"
                  >
                    <Mail size={14} />
                    {activePager.contact}
                  </a>
                </div>
                <div className="text-right">
                  <p className="text-xs text-white/30">Related policy</p>
                  <p className="text-sm font-medium text-white/70">
                    {activePager.relatedPolicy}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer action bar */}
            <div className="px-6 py-4 bg-vastintDark border-t border-white/10 flex items-center justify-between shrink-0">
              <button
                onClick={() => setActiveId(null)}
                className="text-sm text-white/50 hover:text-white/70 font-medium transition-colors"
              >
                Close
              </button>

              <div className="flex items-center gap-3">
                {activePager.id === "dpia" && (
                  <button
                    onClick={() => {
                      setActiveId(null);
                      navigate("/dashboard/dpias/new");
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-vastintPrimary text-white text-sm font-semibold hover:bg-vastintPrimary/90 transition-colors"
                  >
                    <Plus size={16} />
                    Start Pre-DPIA Checklist
                  </button>
                )}
                <a
                  href={`mailto:${activePager.contact}?subject=${encodeURIComponent(`Question about: ${activePager.title}`)}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-sm font-medium text-white/60 hover:bg-white/5 transition-colors"
                >
                  <Mail size={16} />
                  Contact Privacy Team
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
