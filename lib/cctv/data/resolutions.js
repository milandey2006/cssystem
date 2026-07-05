export const RESOLUTIONS = [
  { key: "1MP", label: "1MP", mp: 1.0, width: 1280, height: 720, commonName: "720p / HD" },
  { key: "2MP", label: "2MP", mp: 2.0, width: 1920, height: 1080, commonName: "1080p / Full HD" },
  { key: "3MP", label: "3MP", mp: 3.0, width: 2048, height: 1536, commonName: "3MP" },
  { key: "4MP", label: "4MP", mp: 4.0, width: 2560, height: 1440, commonName: "4MP / QHD" },
  { key: "5MP", label: "5MP", mp: 5.0, width: 2592, height: 1944, commonName: "5MP" },
  { key: "6MP", label: "6MP", mp: 6.0, width: 3072, height: 2048, commonName: "6MP" },
  { key: "8MP", label: "8MP", mp: 8.0, width: 3840, height: 2160, commonName: "4K / UHD" },
  { key: "12MP", label: "12MP", mp: 12.0, width: 4000, height: 3000, commonName: "12MP" },
];

// Continuous-recording, medium-quality, ~20-25fps reference bitrates in Mbps.
// These are default *estimates* used when no brand override or manual bitrate is given.
export const REFERENCE_BITRATES_MBPS = {
  "1MP": { H264: 2.0, H265: 1.0, H264PLUS: 1.2, H265PLUS: 0.7 },
  "2MP": { H264: 4.0, H265: 2.0, H264PLUS: 2.4, H265PLUS: 1.4 },
  "3MP": { H264: 6.0, H265: 3.0, H264PLUS: 3.6, H265PLUS: 2.0 },
  "4MP": { H264: 8.0, H265: 4.0, H264PLUS: 4.8, H265PLUS: 2.6 },
  "5MP": { H264: 12.0, H265: 6.0, H264PLUS: 7.0, H265PLUS: 4.0 },
  "6MP": { H264: 14.0, H265: 7.0, H264PLUS: 8.0, H265PLUS: 4.6 },
  "8MP": { H264: 16.0, H265: 8.0, H264PLUS: 10.0, H265PLUS: 5.5 },
  "12MP": { H264: 24.0, H265: 12.0, H264PLUS: 15.0, H265PLUS: 8.0 },
};

export const MJPEG_MULTIPLIER = 3.5;

export function getResolutionInfo(key) {
  const info = RESOLUTIONS.find((r) => r.key === key);
  if (!info) throw new Error(`Unknown resolution key: ${key}`);
  return info;
}

export function mpFromDimensions(width, height) {
  return (width * height) / 1_000_000;
}

export function getReferenceBitrateMbps(resolutionKey, codec) {
  return REFERENCE_BITRATES_MBPS[resolutionKey][codec];
}

// Piecewise-linear interpolation over the known MP points, for custom resolutions
// that don't line up with a standard resolution label.
export function interpolateReferenceBitrateMbps(mp, codec) {
  const points = RESOLUTIONS.map((r) => ({
    mp: r.mp,
    bitrate: REFERENCE_BITRATES_MBPS[r.key][codec],
  })).sort((a, b) => a.mp - b.mp);

  if (mp <= points[0].mp) return points[0].bitrate;
  if (mp >= points[points.length - 1].mp) return points[points.length - 1].bitrate;

  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    if (mp >= a.mp && mp <= b.mp) {
      const t = (mp - a.mp) / (b.mp - a.mp);
      return a.bitrate + t * (b.bitrate - a.bitrate);
    }
  }
  return points[points.length - 1].bitrate;
}
