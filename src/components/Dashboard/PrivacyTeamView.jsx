import { useOutletContext } from "react-router-dom";
import { Users, Shield, Mail, Building2, MapPin } from "lucide-react";
import { PRIVACY_TEAM } from "../../data/privacyTeamData";
import { PRIVACY_LEADS } from "../../data/privacyLeadsData";
import WorldMap from "../WorldMap/WorldMap";

function CoreTeamCard({ member }) {
  const initials = member.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="bg-vastintSurface rounded-xl border border-white/10 p-5 hover:border-vastintPrimary/30 transition-all">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-vastintPrimary text-white flex items-center justify-center font-bold text-sm shrink-0">
          {initials}
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-white leading-tight">
            {member.name}
          </h3>
          <p className="text-sm text-vastintPrimary font-medium mt-0.5">
            {member.role}
          </p>
          <p className="text-sm text-white/50 mt-1">{member.description}</p>
          <div className="mt-2 space-y-1">
            <div className="flex items-center gap-1.5 text-sm text-white/50">
              <Building2 size={13} className="shrink-0" />
              <span>{member.entity}</span>
            </div>
            {member.email && (
              <div className="flex items-center gap-1.5 text-sm text-white/50">
                <Mail size={13} className="shrink-0" />
                <a
                  href={`mailto:${member.email}`}
                  className="text-vastintPrimary hover:underline"
                >
                  {member.email}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PrivacyTeamView() {
  const { searchQuery } = useOutletContext();
  const q = searchQuery.toLowerCase();

  const filteredCoreTeam = PRIVACY_TEAM.coreTeam.filter(
    (m) =>
      !q ||
      m.name.toLowerCase().includes(q) ||
      m.role.toLowerCase().includes(q) ||
      m.entity.toLowerCase().includes(q) ||
      m.description.toLowerCase().includes(q)
  );

  const filteredLeads = PRIVACY_LEADS.filter(
    (l) =>
      !q ||
      l.name.toLowerCase().includes(q) ||
      l.country.toLowerCase().includes(q) ||
      l.entity.toLowerCase().includes(q) ||
      l.region.toLowerCase().includes(q)
  );

  const grouped = {};
  for (const lead of filteredLeads) {
    if (!grouped[lead.country]) grouped[lead.country] = [];
    grouped[lead.country].push(lead);
  }
  const countries = Object.keys(grouped).sort();

  return (
    <div className="w-full h-full pb-10 p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-sans font-bold text-white">
          Privacy Team
        </h1>
        <p className="text-vastintBeige/60 mt-2">
          Core privacy governance team and privacy champions across all Vastint
          entities.
        </p>
      </div>

      {/* Core Privacy Team */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <Shield size={18} className="text-vastintPrimary" />
          <h2 className="font-semibold text-white">Core Privacy Team</h2>
          <span className="text-xs text-white/50 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
            {filteredCoreTeam.length}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCoreTeam.map((member) => (
            <CoreTeamCard key={member.id} member={member} />
          ))}
        </div>
      </div>

      {/* Privacy Champions */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Users size={18} className="text-vastintPrimary" />
          <h2 className="font-semibold text-white">Privacy Champions</h2>
          <span className="text-xs text-white/50 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
            {PRIVACY_LEADS.length}
          </span>
        </div>

        {/* World Map */}
        <div className="bg-vastintSurface rounded-xl border border-white/10 p-6 mb-6">
          <WorldMap leads={filteredLeads} />
        </div>

        {/* Champions Table */}
        <div className="bg-vastintSurface rounded-xl border border-white/10 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <MapPin size={16} className="text-vastintPrimary" />
              All Privacy Champions ({filteredLeads.length})
            </h3>
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
    </div>
  );
}
