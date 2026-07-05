export const BRANDS = [
  {
    id: "generic",
    name: "Generic / Custom",
    defaultCodec: "H265",
    notes: "Uses the plain reference bitrate table with no brand-specific adjustment.",
  },
  {
    id: "hikvision",
    name: "Hikvision",
    defaultCodec: "H265PLUS",
    bitrateOverrides: {
      "2MP": { H265PLUS: 1.2 },
      "4MP": { H265PLUS: 2.4 },
      "8MP": { H265PLUS: 5.0 },
    },
    notes: "H.265+ smart codec tends to run leaner than the generic estimate in real deployments.",
  },
  {
    id: "dahua",
    name: "Dahua",
    defaultCodec: "H265PLUS",
    bitrateOverrides: {
      "2MP": { H265PLUS: 1.3 },
      "4MP": { H265PLUS: 2.5 },
      "8MP": { H265PLUS: 5.2 },
    },
  },
  {
    id: "uniview",
    name: "Uniview",
    defaultCodec: "H265",
  },
  {
    id: "cpplus",
    name: "CP Plus",
    defaultCodec: "H265",
  },
  {
    id: "axis",
    name: "Axis",
    defaultCodec: "H265",
    notes: "Axis Zipstream typically reduces bitrate further; use manual bitrate override for exact figures.",
  },
  {
    id: "hanwha",
    name: "Hanwha (Wisenet)",
    defaultCodec: "H265",
  },
  {
    id: "bosch",
    name: "Bosch",
    defaultCodec: "H265",
  },
  {
    id: "reolink",
    name: "Reolink",
    defaultCodec: "H265",
  },
  {
    id: "tplink-vigi",
    name: "TP-Link Vigi",
    defaultCodec: "H265",
  },
];

export function getBrand(id) {
  const brand = BRANDS.find((b) => b.id === id);
  if (!brand) throw new Error(`Unknown brand id: ${id}`);
  return brand;
}
