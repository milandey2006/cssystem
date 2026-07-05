import { tbToBytes } from "./storage";

export function raidUsableFactor(raidLevel, numDrives) {
  switch (raidLevel) {
    case "none":
      return 1;
    case "raid1":
      return numDrives >= 2 ? 0.5 : 0;
    case "raid5":
      return numDrives >= 3 ? (numDrives - 1) / numDrives : 0;
    case "raid6":
      return numDrives >= 4 ? (numDrives - 2) / numDrives : 0;
    default:
      return 1;
  }
}

export function checkNvrFeasibility(totalCameras, totalBitrateMbps, requiredStorageBytes, nvr) {
  const warnings = [];

  const channelsOk = totalCameras <= nvr.maxChannels;
  if (!channelsOk) {
    warnings.push(`${totalCameras} cameras exceed the NVR's ${nvr.maxChannels}-channel limit.`);
  }

  const bandwidthOk = totalBitrateMbps <= nvr.maxIncomingBandwidthMbps;
  if (!bandwidthOk) {
    warnings.push(
      `Total incoming bitrate ${totalBitrateMbps.toFixed(1)} Mbps exceeds the NVR's ${nvr.maxIncomingBandwidthMbps} Mbps bandwidth limit.`
    );
  }

  const raidFactor = raidUsableFactor(nvr.raidLevel, nvr.hddBays);
  if (raidFactor === 0 && nvr.raidLevel !== "none") {
    warnings.push(`Not enough HDD bays for ${nvr.raidLevel.toUpperCase()}.`);
  }

  const usableCapacityBytes = tbToBytes(nvr.hddBays * nvr.maxHddSizePerBayTB, "decimal") * raidFactor;

  const storageOk = requiredStorageBytes <= usableCapacityBytes;
  if (!storageOk) {
    warnings.push("Required storage exceeds the NVR's usable HDD-bay capacity after RAID overhead.");
  }

  return { channelsOk, bandwidthOk, storageOk, raidFactor, usableCapacityBytes, warnings };
}
