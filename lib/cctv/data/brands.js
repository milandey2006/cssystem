// Camera brands offered in the storage calculator. Reputed, non-Chinese brands
// only — the ones we supply and install. Smart codecs differ by brand (Hanwha
// WiseStream, Axis Zipstream), so for exact figures use the manual bitrate
// override with the number from the camera's own spec sheet or web page.
export const BRANDS = [
  {
    id: "generic",
    name: "Generic / Custom",
    defaultCodec: "H265",
    notes: "Uses the plain reference bitrate table with no brand-specific adjustment.",
  },
  {
    id: "hanwha",
    name: "Hanwha Vision (Wisenet)",
    defaultCodec: "H265",
    notes: "Hanwha WiseStream can lower the bitrate further; use the manual bitrate override for exact figures.",
  },
  {
    id: "honeywell",
    name: "Honeywell",
    defaultCodec: "H265",
  },
  {
    id: "matrix",
    name: "Matrix (SATATYA)",
    defaultCodec: "H265",
  },
  {
    id: "axis",
    name: "Axis Communications",
    defaultCodec: "H265",
    notes: "Axis Zipstream typically reduces bitrate further; use manual bitrate override for exact figures.",
  },
  {
    id: "panasonic-ipro",
    name: "i-PRO (Panasonic)",
    defaultCodec: "H265",
  },
  {
    id: "bosch",
    name: "Bosch / IQSIGHT",
    defaultCodec: "H265",
  },
  {
    id: "pelco",
    name: "Pelco",
    defaultCodec: "H265",
  },
];

// Unknown ids (e.g. a brand saved in the browser before this list changed)
// fall back to Generic instead of breaking the calculator.
export function getBrand(id) {
  return BRANDS.find((b) => b.id === id) ?? BRANDS[0];
}
