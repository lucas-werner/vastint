import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Download, FileText, Filter } from "lucide-react";
import { POLICIES } from "../../data/policiesData";

const CATEGORIES = [
  { label: "All", value: "all" },
  { label: "Policies", value: "policy" },
  { label: "Procedures", value: "procedure" },
  { label: "Agreements", value: "agreement" },
  { label: "Guidance", value: "guidance" },
  { label: "Notices", value: "notice" },
];

export default function PoliciesView() {
  const { searchQuery } = useOutletContext();
  const [category, setCategory] = useState("all");

  const q = searchQuery.toLowerCase();
  const filtered = POLICIES.filter((p) => {
    const matchesCategory = category === "all" || p.category === category;
    const matchesSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full h-full pb-10 p-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-sans font-bold text-white">
            Policy Management
          </h1>
          <p className="text-vastintBeige/60 mt-2">
            Vastint privacy policies and procedures — latest versions.
          </p>
        </div>
      </div>

      {/* Category filter */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        <Filter size={16} className="text-white/40" />
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setCategory(cat.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              category === cat.value
                ? "bg-vastintPrimary text-white"
                : "bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white/80"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="bg-vastintSurface rounded-xl border border-white/10 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 border-b border-white/10">
              <th className="px-6 py-4 text-xs font-semibold text-vastintBeige/50 uppercase tracking-wider">
                Policy Name
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-vastintBeige/50 uppercase tracking-wider">
                Version
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-vastintBeige/50 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-vastintBeige/50 uppercase tracking-wider">
                Last Updated
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-vastintBeige/50 uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map((policy) => (
              <tr
                key={policy.id}
                className="hover:bg-white/5 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-start gap-3">
                    <FileText
                      size={18}
                      className="text-vastintPrimary/60 mt-0.5 shrink-0"
                    />
                    <div>
                      <p className="text-sm font-medium text-white">
                        {policy.title}
                      </p>
                      <p className="text-xs text-white/40 mt-0.5 leading-relaxed">
                        {policy.description}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-white/60">
                  {policy.version}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      policy.status === "Published"
                        ? "bg-green-900/30 text-green-400"
                        : "bg-white/10 text-white/50"
                    }`}
                  >
                    {policy.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-white/50">
                  {policy.lastUpdated}
                </td>
                <td className="px-6 py-4 text-right">
                  <a
                    href={`${import.meta.env.BASE_URL}docs/policies/${policy.fileName}`}
                    download
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-vastintPrimary hover:text-vastintCream transition-colors"
                  >
                    <Download size={14} />
                    Download
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-white/30">
            <p>No policies found for this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
