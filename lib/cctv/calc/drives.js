import { STANDARD_DRIVE_SIZES_TB } from "@/lib/cctv/data/drives";

const MAX_DRIVES_PER_SIZE = 8;

// Real drives are advertised in decimal TB (1 TB = 1e12 bytes) regardless of the
// display unit system, so drive round-up always uses decimal TB.
export function recommendDriveConfig(requiredTB) {
  if (requiredTB <= 0) {
    const sizeTB = STANDARD_DRIVE_SIZES_TB[0];
    return { count: 1, sizeTB, totalTB: sizeTB };
  }

  let best = null;

  for (const sizeTB of STANDARD_DRIVE_SIZES_TB) {
    const count = Math.max(1, Math.ceil(requiredTB / sizeTB));
    if (count > MAX_DRIVES_PER_SIZE) continue;
    const totalTB = count * sizeTB;
    if (!best || count < best.count || (count === best.count && totalTB < best.totalTB)) {
      best = { count, sizeTB, totalTB };
    }
  }

  if (!best) {
    const sizeTB = STANDARD_DRIVE_SIZES_TB[STANDARD_DRIVE_SIZES_TB.length - 1];
    const count = Math.ceil(requiredTB / sizeTB);
    best = { count, sizeTB, totalTB: count * sizeTB };
  }

  return best;
}
