import WorldMap from "../WorldMap/WorldMap";
import { PRIVACY_LEADS } from "../../data/privacyLeadsData";

export default function Overview() {
  const metrics = [
    { title: "Active DPIAs", count: 12 },
    { title: "Pending TIAs", count: 5 },
    { title: "Policies Reviewed", count: 24 },
  ];

  return (
    <div className="w-full h-full pb-10 p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-sans font-bold text-heading">Overview</h1>
        <p className="text-gray-400 mt-2">
          Welcome to your Privacy Management Dashboard.
        </p>
      </div>

      {/* World Map Hero */}
      <div className="bg-[#2c3338] rounded-xl shadow-sm border border-[#444] p-6 mb-8">
        <h2 className="text-lg font-semibold text-white mb-4">
          Global Privacy Coverage
        </h2>
        <WorldMap leads={PRIVACY_LEADS} compact />
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((m, i) => (
          <div
            key={i}
            className="bg-[#2c3338] p-6 rounded-xl shadow-sm border border-[#444] flex flex-col items-start"
          >
            <span className="text-sm font-semibold text-gray-400 uppercase">
              {m.title}
            </span>
            <span className="text-4xl font-bold text-vastintPrimary mt-2">
              {m.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
