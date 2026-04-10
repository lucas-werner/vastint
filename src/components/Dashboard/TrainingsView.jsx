import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { GraduationCap, Calendar, Globe, BookOpen, Download } from "lucide-react";
import { TRAININGS, TRAINING_TYPES } from "../../data/trainingsData";

const TYPE_COLORS = {
  "GDPR Awareness": "bg-vastintPrimary/15 text-vastintPrimary",
  "Privacy Leads": "bg-purple-900/30 text-purple-400",
  "AI Privacy": "bg-sky-900/30 text-sky-400",
  "IAPP Certification": "bg-amber-900/30 text-amber-400",
};

export default function TrainingsView() {
  const { searchQuery } = useOutletContext();
  const [filter, setFilter] = useState("All");

  const q = searchQuery.toLowerCase();
  const filtered = TRAININGS.filter((t) => {
    const matchesType = filter === "All" || t.type === filter;
    const matchesSearch =
      !q ||
      t.title.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.type.toLowerCase().includes(q);
    return matchesType && matchesSearch;
  });

  return (
    <div className="w-full h-full pb-10 p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-sans font-bold text-white">
          Training History
        </h1>
        <p className="text-vastintBeige/60 mt-2">
          Overview of all privacy and data protection trainings delivered across
          Vastint.
        </p>
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap gap-2 mb-6">
        {TRAINING_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === type
                ? "bg-vastintPrimary text-white"
                : "bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white/80"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Training cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((training) => (
          <div
            key={training.id}
            className="bg-vastintSurface rounded-xl border border-white/10 p-6 flex flex-col hover:border-vastintPrimary/30 transition-all"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  TYPE_COLORS[training.type] || "bg-white/10 text-white/50"
                }`}
              >
                {training.type}
              </span>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  training.status === "Completed"
                    ? "bg-green-900/30 text-green-400"
                    : "bg-blue-900/30 text-blue-400"
                }`}
              >
                {training.status}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-semibold text-white mb-2 leading-snug">
              {training.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-white/50 leading-relaxed mb-4 flex-1">
              {training.description}
            </p>

            {/* Meta */}
            <div className="space-y-2 pt-3 border-t border-white/10">
              <div className="flex items-center gap-2 text-sm text-white/50">
                <Calendar size={14} className="shrink-0" />
                <span>{training.date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/50">
                <BookOpen size={14} className="shrink-0" />
                <span>{training.format}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/50">
                <Globe size={14} className="shrink-0" />
                <span>{training.languages.join(", ")}</span>
              </div>
            </div>

            {training.fileName && (
              <div className="pt-3 mt-3 border-t border-white/10">
                <a
                  href={`${import.meta.env.BASE_URL}docs/trainings/${training.fileName}`}
                  download
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-vastintPrimary text-white text-sm font-medium hover:bg-vastintSecondary transition-colors"
                >
                  <Download size={14} />
                  Download
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-white/30">
          <GraduationCap size={40} className="mx-auto mb-3 opacity-50" />
          <p>No trainings found for this category.</p>
        </div>
      )}
    </div>
  );
}
