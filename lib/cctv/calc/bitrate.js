import {
  getReferenceBitrateMbps,
  getResolutionInfo,
  interpolateReferenceBitrateMbps,
  mpFromDimensions,
} from "@/lib/cctv/data/resolutions";

export const QUALITY_MULTIPLIERS = {
  low: 0.7,
  medium: 1.0,
  high: 1.3,
  highest: 1.6,
};

export const AUDIO_BITRATE_KBPS = 64;

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function fpsFactor(fps) {
  const clampedFps = clamp(fps, 1, 60);
  return clamp(0.4 + 0.6 * (clampedFps / 25), 0.4, 2.0);
}

export function resolveGroupMp(group) {
  if (group.resolutionKey === "custom") {
    return mpFromDimensions(group.customWidth ?? 0, group.customHeight ?? 0);
  }
  return getResolutionInfo(group.resolutionKey).mp;
}

function baseReferenceBitrateMbps(brand, resolutionKey, mp, codec) {
  if (resolutionKey === "custom") {
    return interpolateReferenceBitrateMbps(mp, codec);
  }
  const override = brand.bitrateOverrides?.[resolutionKey]?.[codec];
  if (override !== undefined) return override;
  return getReferenceBitrateMbps(resolutionKey, codec);
}

export function estimateBitrateKbps(input) {
  const { brand, resolutionKey, mp, codec, fps, quality, audioEnabled } = input;

  let baseMbps;
  if (codec === "MJPEG") {
    const h264Base = baseReferenceBitrateMbps(brand, resolutionKey, mp, "H264");
    baseMbps = h264Base * 3.5;
  } else {
    baseMbps = baseReferenceBitrateMbps(brand, resolutionKey, mp, codec);
  }

  const bitrateMbps = baseMbps * fpsFactor(fps) * QUALITY_MULTIPLIERS[quality];
  let bitrateKbps = bitrateMbps * 1000;
  if (audioEnabled) bitrateKbps += AUDIO_BITRATE_KBPS;
  return bitrateKbps;
}

export function getEffectiveBitrateKbps(group, brand) {
  if (group.manualBitrateKbps !== undefined) return group.manualBitrateKbps;
  const mp = resolveGroupMp(group);
  return estimateBitrateKbps({
    brand,
    resolutionKey: group.resolutionKey,
    mp,
    codec: group.codec,
    fps: group.fps,
    quality: group.quality,
    audioEnabled: group.audioEnabled,
  });
}
