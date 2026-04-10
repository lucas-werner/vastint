export const PRIVACY_LEADS = [
  // Vastint Holding & Group-wide
  {
    country: "Netherlands",
    iso: "NLD",
    entity: "Vastint Holding BV",
    name: "Lucas Noronha",
    role: "Privacy Champion",
    region: "Western Europe",
  },
  {
    country: "Belgium",
    iso: "BEL",
    entity: "Vastint Belgium S.A.",
    name: "David Toury",
    role: "Privacy Champion",
    region: "Western Europe",
  },

  // Netherlands
  {
    country: "Netherlands",
    iso: "NLD",
    entity: "Vastint Development BV",
    name: "Lucas Noronha",
    role: "Privacy Champion",
    region: "Western Europe",
  },
  {
    country: "Netherlands",
    iso: "NLD",
    entity: "Vastint Netherlands B.V.",
    name: "Sita Huizinga",
    role: "Privacy Champion",
    region: "Western Europe",
  },
  {
    country: "Netherlands",
    iso: "NLD",
    entity: "Vastint Hospitality B.V.",
    name: "Lucas Noronha",
    role: "Privacy Champion",
    region: "Western Europe",
  },

  // France
  {
    country: "France",
    iso: "FRA",
    entity: "Vastint France SAS",
    name: "Gwendal Le Metour",
    role: "Privacy Champion",
    region: "Western Europe",
  },

  // Germany
  {
    country: "Germany",
    iso: "DEU",
    entity: "Vastint Germany GmbH",
    name: "Shu Loon Teh",
    role: "Privacy Champion",
    region: "Central Europe",
  },

  // Poland
  {
    country: "Poland",
    iso: "POL",
    entity: "Vastint Poland Sp. z o.o.",
    name: "Agnieszka Mikosik",
    role: "Privacy Champion",
    region: "Central Europe",
  },

  // Romania
  {
    country: "Romania",
    iso: "ROU",
    entity: "Vastint Romania SRL",
    name: "Simona Fux",
    role: "Privacy Champion",
    region: "Eastern Europe",
  },

  // Italy
  {
    country: "Italy",
    iso: "ITA",
    entity: "Vastint Italy SrL",
    name: "Stefano Carli",
    role: "Privacy Champion",
    region: "Southern Europe",
  },
  {
    country: "Italy",
    iso: "ITA",
    entity: "Vastint Factory SrL",
    name: "Lucas Noronha",
    role: "Privacy Champion (Temporary)",
    region: "Southern Europe",
  },

  // United Kingdom
  {
    country: "United Kingdom",
    iso: "GBR",
    entity: "Vastint UK B.V.",
    name: "Rosemary Shurlock",
    role: "Privacy Champion",
    region: "Western Europe",
  },

  // Baltics
  {
    country: "Latvia",
    iso: "LVA",
    entity: "Vastint Latvia SIA",
    name: "Romans Astahovs",
    role: "Privacy Champion",
    region: "Baltics",
  },
  {
    country: "Lithuania",
    iso: "LTU",
    entity: "Vastint Lithuania UAB",
    name: "Adomas Gervė",
    role: "Privacy Champion",
    region: "Baltics",
  },

  // Hotel Co 51
  {
    country: "Netherlands",
    iso: "NLD",
    entity: "Hotel Co 51 B.V.",
    name: "Lucas Noronha",
    role: "Privacy Champion",
    region: "Western Europe",
  },
];

// Countries grouped for map highlighting (deduplicated by ISO code)
export const LEAD_COUNTRIES = [...new Set(PRIVACY_LEADS.map((l) => l.iso))];

// Group leads by country name for tooltip display
export function getLeadsByCountry(countryName) {
  return PRIVACY_LEADS.filter((l) => l.country === countryName);
}

// Map from geography name (as used by world-atlas) to ISO code
export const COUNTRY_NAME_TO_ISO = {
  Belgium: "BEL",
  France: "FRA",
  Germany: "DEU",
  Italy: "ITA",
  Latvia: "LVA",
  Lithuania: "LTU",
  Netherlands: "NLD",
  Poland: "POL",
  Romania: "ROU",
  "United Kingdom": "GBR",
};
