import { getEffectiveBitrateKbps } from "./bitrate";

export const DECIMAL_UNIT = 1000;
export const BINARY_UNIT = 1024;

export function bytesToGB(bytes, unitSystem) {
  const base = unitSystem === "decimal" ? DECIMAL_UNIT : BINARY_UNIT;
  return bytes / base ** 3;
}

export function bytesToTB(bytes, unitSystem) {
  const base = unitSystem === "decimal" ? DECIMAL_UNIT : BINARY_UNIT;
  return bytes / base ** 4;
}

export function gbToBytes(gb, unitSystem) {
  const base = unitSystem === "decimal" ? DECIMAL_UNIT : BINARY_UNIT;
  return gb * base ** 3;
}

export function tbToBytes(tb, unitSystem) {
  const base = unitSystem === "decimal" ? DECIMAL_UNIT : BINARY_UNIT;
  return tb * base ** 4;
}

export function getHoursPerDayAndFactor(group) {
  switch (group.recordingMode) {
    case "continuous":
      return { hoursPerDay: 24, recordingFactor: 1.0 };
    case "motion":
      return { hoursPerDay: 24, recordingFactor: group.motionActivityPercent / 100 };
    case "schedule":
      return { hoursPerDay: group.scheduleHoursPerDay, recordingFactor: 1.0 };
    default:
      return { hoursPerDay: 24, recordingFactor: 1.0 };
  }
}

export function calculateGroup(group, brand, retentionDays) {
  const bitrateKbps = getEffectiveBitrateKbps(group, brand);
  const { hoursPerDay, recordingFactor } = getHoursPerDayAndFactor(group);

  const bytesPerSecond = (bitrateKbps * 1000) / 8;
  const bytesPerHour = bytesPerSecond * 3600;
  const bytesPerCameraPerDay = bytesPerHour * hoursPerDay * recordingFactor;
  const totalBytesForGroup = bytesPerCameraPerDay * retentionDays * group.quantity;

  return {
    groupId: group.id,
    bitrateKbps,
    bytesPerCameraPerDay,
    totalBytesForGroup,
    hoursPerDay,
    recordingFactor,
  };
}

export function calculateReverseRetention(availableBytes, bytesPerDayAllCameras) {
  if (bytesPerDayAllCameras <= 0) {
    return { totalDays: 0, wholeDays: 0, remainingHours: 0 };
  }
  const totalDays = availableBytes / bytesPerDayAllCameras;
  const wholeDays = Math.floor(totalDays);
  const remainingHours = (totalDays - wholeDays) * 24;
  return { totalDays, wholeDays, remainingHours };
}
