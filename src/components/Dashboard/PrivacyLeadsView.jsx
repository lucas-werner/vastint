import { MapPin, Building2 } from "lucide-react";
import WorldMap from "../WorldMap/WorldMap";
import { PRIVACY_LEADS } from "../../data/privacyLeadsData";

export default function PrivacyLeadsView() {
  const grouped = {};
  for (const lead of PRIVACY_LEADS) {
    if (!grouped[lead.country]) grouped[lead.country] = [];
    grouped[lead.country].push(lead);
  }
  const countries = Object.keys(grouped).sort();

  return (
    <div className="w-full h-full pb-10 p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-sans font-bold text-white">
          Privacy Champions
        </h1>
        <p className="text-vastintBeige/60 mt-2">
          Interactive map of Vastint privacy champions across all entities. Click a
          highlighted country to see details.
        </p>
      </div>

      {/* World Map */}
      <div className="bg-vastintSurface rounded-xl border border-white/10 p-6 mb-8">
        <WorldMap leads={PRIVACY_LEADS} />
      </div>

      {/* Champions Table */}
      <div className="bg-vastintSurface rounded-xl border border-white/10 overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10">
          <h2 className="font-semibold text-white flex items-center gap-2">
            <MapPin size={18} className="text-vastintPrimary" />
            All Privacy Champions ({PRIVACY_LEADS.length})
          </h2>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 border-b border-white/10">
              <th className="px-6 py-4 text-xs font-semibold text-vastintBeige/50 uppercase tracking-wider">
                Country
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-vastintBeige/50 uppercase tracking-wider">
                Entity
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-vastintBeige/50 uppercase tracking-wider">
                Privacy Champion
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-vastintBeige/50 uppercase tracking-wider">
                Region
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {countries.map((country) =>
              grouped[country].map((lead, i) => (
                <tr
                  key={`${lead.entity}-${i}`}
                  className="hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium text-white">
                    {i === 0 ? country : ""}
                  </td>
                  <td className="px-6 py-4 text-sm text-white/70 flex items-center gap-2">
                    <Building2 size={14} className="text-white/30 shrink-0" />
                    {lead.entity}
                  </td>
                  <td className="px-6 py-4 text-sm text-white/70">
                    {lead.name}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/30 text-green-400">
                      {lead.region}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
