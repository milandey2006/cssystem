import { getBrand } from "@/lib/cctv/data/brands";
import { recommendDriveConfig } from "./drives";
import { calculateGroup, bytesToTB } from "./storage";

export * from "./bitrate";
export * from "./storage";
export * from "./drives";
export * from "./nvr";

export function calculateAggregate(groups, settings) {
  const calculations = groups.map((group) =>
    calculateGroup(group, getBrand(group.brandId), settings.retentionDays)
  );

  const totalCameras = groups.reduce((sum, g) => sum + g.quantity, 0);

  const totalBitrateMbps = calculations.reduce(
    (sum, calc, i) => sum + (calc.bitrateKbps / 1000) * groups[i].quantity,
    0
  );

  const totalBytesPerDay = calculations.reduce(
    (sum, calc, i) => sum + calc.bytesPerCameraPerDay * groups[i].quantity,
    0
  );

  const rawTotalBytes = calculations.reduce((sum, calc) => sum + calc.totalBytesForGroup, 0);
  const totalBytesWithOverhead = rawTotalBytes * (1 + settings.overheadMarginPercent / 100);

  const pref = Number(settings.preferredDriveSizeTB);
  const preferredSize = Number.isFinite(pref) && pref > 0 ? pref : undefined;
  const driveRecommendation = recommendDriveConfig(
    bytesToTB(totalBytesWithOverhead, "decimal"),
    preferredSize
  );

  return {
    groups: calculations,
    totalCameras,
    totalBitrateMbps,
    totalBytesPerDay,
    rawTotalBytes,
    totalBytesWithOverhead,
    driveRecommendation,
  };
}
