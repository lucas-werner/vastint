import { useState, useMemo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { X, MapPin, Mail, Building2 } from "lucide-react";
import { LEAD_COUNTRIES, COUNTRY_NAME_TO_ISO } from "../../data/privacyLeadsData";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function WorldMap({ leads, compact = false }) {
  const [tooltipContent, setTooltipContent] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  const leadsByCountry = useMemo(() => {
    const map = {};
    for (const lead of leads) {
      if (!map[lead.country]) map[lead.country] = [];
      map[lead.country].push(lead);
    }
    return map;
  }, [leads]);

  const countryIsoSet = useMemo(() => new Set(LEAD_COUNTRIES), []);

  const getIsoFromGeo = (geo) => {
    return (
      geo.properties.ISO_A3 ||
      geo.properties.iso_a3 ||
      COUNTRY_NAME_TO_ISO[geo.properties.name] ||
      null
    );
  };

  const handleCountryClick = (geo) => {
    const name = geo.properties.name;
    if (leadsByCountry[name]) {
      setSelectedCountry(name);
    }
  };

  const closeModal = () => setSelectedCountry(null);

  const countryLeads = selectedCountry ? leadsByCountry[selectedCountry] : [];

  return (
    <div className="relative w-full">
      {/* Tooltip */}
      <div
        className={`absolute top-4 left-4 z-10 bg-vastintSurface/90 backdrop-blur-md text-white px-4 py-2 font-mono text-xs rounded-full border border-white/10 pointer-events-none shadow-sm transition-opacity ${
          tooltipContent ? "opacity-100" : "opacity-60"
        }`}
      >
        {tooltipContent || "Hover over a country to see privacy champions"}
      </div>

      <div
        className={`w-full ${compact ? "aspect-[2.2/1]" : "aspect-video"} rounded-xl overflow-hidden`}
      >
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: compact ? 130 : 140, center: [10, 30] }}
          style={{ width: "100%", height: "100%" }}
        >
          <ZoomableGroup center={[10, 30]} maxZoom={compact ? 3 : 6}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const iso = getIsoFromGeo(geo);
                  const hasLead = iso && countryIsoSet.has(iso);

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => {
                        const name = geo.properties.name;
                        const leads = leadsByCountry[name];
                        if (leads) {
                          setTooltipContent(
                            `${name} — ${leads.map((l) => l.name).join(", ")}`
                          );
                        } else {
                          setTooltipContent(name);
                        }
                      }}
                      onMouseLeave={() => setTooltipContent("")}
                      onClick={() => handleCountryClick(geo)}
                      style={{
                        default: {
                          fill: hasLead ? "#A5625B" : "#3a3f44",
                          stroke: "#2c3338",
                          strokeWidth: 0.5,
                          outline: "none",
                        },
                        hover: {
                          fill: hasLead ? "#874641" : "#4a4f54",
                          stroke: "#2c3338",
                          strokeWidth: 0.5,
                          outline: "none",
                          cursor: hasLead ? "pointer" : "default",
                        },
                        pressed: {
                          fill: hasLead ? "#6e3a36" : "#4a4f54",
                          outline: "none",
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-3 px-1">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-vastintPrimary" />
          <span className="text-xs text-white/50">Privacy Champion assigned</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-[#3a3f44]" />
          <span className="text-xs text-white/50">No champion assigned</span>
        </div>
      </div>

      {/* Lead Detail Modal */}
      {selectedCountry && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-lg bg-vastintSurface rounded-2xl shadow-2xl overflow-hidden border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-vastintDark px-6 py-5 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-3">
                <MapPin size={20} className="text-vastintPrimary" />
                <h3 className="font-sans font-bold text-xl text-white">
                  {selectedCountry}
                </h3>
              </div>
              <button
                onClick={closeModal}
                className="text-white/40 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5 space-y-4">
              <p className="text-xs font-semibold text-vastintBeige/50 uppercase tracking-wider">
                Privacy Champion{countryLeads.length > 1 ? "s" : ""} (
                {countryLeads.length})
              </p>
              {countryLeads.map((lead, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10"
                >
                  <div className="w-10 h-10 rounded-full bg-vastintPrimary text-white flex items-center justify-center font-bold text-sm shrink-0">
                    {lead.name
                      .split(" ")
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-white">{lead.name}</p>
                    <div className="flex items-center gap-1.5 mt-1 text-sm text-white/50">
                      <Building2 size={14} />
                      <span>{lead.entity}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1 text-sm text-white/50">
                      <Mail size={14} />
                      <span>{lead.region}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-vastintDark border-t border-white/10 flex justify-end">
              <button
                onClick={closeModal}
                className="px-5 py-2 bg-vastintPrimary text-white rounded-lg text-sm font-medium hover:bg-vastintSecondary transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
