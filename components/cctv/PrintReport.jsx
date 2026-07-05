import { getBrand } from "@/lib/cctv/data/brands";
import { getResolutionInfo } from "@/lib/cctv/data/resolutions";
import { bytesToGB, bytesToTB } from "@/lib/cctv/calc";
import { CODEC_LABELS, QUALITY_LABELS, RECORDING_MODE_LABELS } from "@/lib/cctv/labels";
import { BUSINESS } from "@/lib/seo";

function resolutionLabel(group) {
  if (group.resolutionKey === "custom") {
    return group.customWidth && group.customHeight
      ? `Custom ${group.customWidth}×${group.customHeight}`
      : "Custom";
  }
  return getResolutionInfo(group.resolutionKey).label;
}

function recordingDetail(group) {
  if (group.recordingMode === "motion") return `Motion (${group.motionActivityPercent}% activity)`;
  if (group.recordingMode === "schedule") return `Scheduled (${group.scheduleHoursPerDay}h/day)`;
  return "Continuous (24h/day)";
}

// A dedicated, read-only report layout for printing/PDF export. The interactive
// editor (dropdowns, sliders, buttons) is meaningless on paper, so print gets its
// own clean summary instead of a literal screenshot of the on-screen form.
export function PrintReport({ groups, aggregate, settings, nvr, mode, reverseAvailableTB, reverseResult }) {
  const unitLabel = settings.unitSystem === "decimal" ? "TB" : "TiB";
  const gbLabel = settings.unitSystem === "decimal" ? "GB" : "GiB";
  const generatedAt = new Date().toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="hidden print:block print:text-black">
      <header className="flex items-start justify-between border-b-2 border-blue-900 pb-3">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo/logo.png" alt="Champion Security System" className="h-12 w-12 object-contain" />
          <div>
            <div className="text-lg font-bold text-blue-900">{BUSINESS.name}</div>
            <div className="text-xs text-gray-600">CCTV Storage Estimate Report</div>
          </div>
        </div>
        <div className="text-right text-xs text-gray-600">
          <div>Generated {generatedAt}</div>
          <div>{BUSINESS.telephone}</div>
          <div>{BUSINESS.email}</div>
        </div>
      </header>

      <section className="mt-4 grid grid-cols-3 gap-3 text-xs text-gray-700">
        {mode === "forward" ? (
          <div>
            <span className="font-semibold">Retention:</span> {settings.retentionDays} days
          </div>
        ) : (
          <div>
            <span className="font-semibold">Available storage:</span> {reverseAvailableTB} {unitLabel}
          </div>
        )}
        <div>
          <span className="font-semibold">Units:</span> {settings.unitSystem === "decimal" ? "Decimal (TB)" : "Binary (TiB)"}
        </div>
        <div>
          <span className="font-semibold">Overhead margin:</span> {settings.overheadMarginPercent}%
        </div>
      </section>

      <section className="mt-4 break-inside-avoid">
        <h2 className="mb-2 text-sm font-bold text-blue-900">Camera Configuration</h2>
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr className="border-b border-gray-400 text-left">
              <th className="py-1 pr-2">#</th>
              <th className="py-1 pr-2">Qty</th>
              <th className="py-1 pr-2">Brand</th>
              <th className="py-1 pr-2">Resolution</th>
              <th className="py-1 pr-2">Codec</th>
              <th className="py-1 pr-2">FPS</th>
              <th className="py-1 pr-2">Quality</th>
              <th className="py-1 pr-2">Recording</th>
              <th className="py-1 pr-2">Audio</th>
              <th className="py-1 pr-2 text-right">Bitrate</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((group, i) => {
              const calc = aggregate.groups[i];
              return (
                <tr key={group.id} className="border-b border-gray-200">
                  <td className="py-1 pr-2">{i + 1}</td>
                  <td className="py-1 pr-2">{group.quantity}</td>
                  <td className="py-1 pr-2">{getBrand(group.brandId).name}</td>
                  <td className="py-1 pr-2">{resolutionLabel(group)}</td>
                  <td className="py-1 pr-2">{CODEC_LABELS[group.codec]}</td>
                  <td className="py-1 pr-2">{group.fps}</td>
                  <td className="py-1 pr-2">{QUALITY_LABELS[group.quality]}</td>
                  <td className="py-1 pr-2">{recordingDetail(group)}</td>
                  <td className="py-1 pr-2">{group.audioEnabled ? "Yes" : "No"}</td>
                  <td className="py-1 pr-2 text-right">{(calc.bitrateKbps / 1000).toFixed(2)} Mbps</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <section className="mt-5 break-inside-avoid rounded border border-blue-900/30 bg-blue-50 p-3">
        <h2 className="mb-2 text-sm font-bold text-blue-900">Result</h2>
        {mode === "forward" ? (
          <div className="grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
            <Stat label="Total storage" value={`${bytesToTB(aggregate.totalBytesWithOverhead, settings.unitSystem).toFixed(2)} ${unitLabel}`} />
            <Stat
              label="Recommended drives"
              value={`${aggregate.driveRecommendation.count} × ${aggregate.driveRecommendation.sizeTB}TB`}
            />
            <Stat label="Aggregate bitrate" value={`${aggregate.totalBitrateMbps.toFixed(1)} Mbps`} />
            <Stat label="Storage / day" value={`${bytesToGB(aggregate.totalBytesPerDay, settings.unitSystem).toFixed(1)} ${gbLabel}`} />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
            <Stat label="Retention achieved" value={`${reverseResult.wholeDays}d ${reverseResult.remainingHours.toFixed(1)}h`} />
            <Stat label="Available storage" value={`${reverseAvailableTB} ${unitLabel}`} />
            <Stat label="Aggregate bitrate" value={`${aggregate.totalBitrateMbps.toFixed(1)} Mbps`} />
            <Stat label="Total cameras" value={`${aggregate.totalCameras}`} />
          </div>
        )}
      </section>

      {nvr.enabled && (
        <section className="mt-4 break-inside-avoid">
          <h2 className="mb-2 text-sm font-bold text-blue-900">NVR Feasibility</h2>
          <div className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
            <Stat label="Max channels" value={nvr.maxChannels} />
            <Stat label="Max bandwidth" value={`${nvr.maxIncomingBandwidthMbps} Mbps`} />
            <Stat label="HDD bays" value={`${nvr.hddBays} × ${nvr.maxHddSizePerBayTB}TB`} />
            <Stat label="RAID level" value={nvr.raidLevel.toUpperCase()} />
          </div>
        </section>
      )}

      <footer className="mt-6 border-t border-gray-300 pt-2 text-[10px] text-gray-500">
        <p>
          Estimated bitrates are approximations; actual storage depends on scene complexity, lighting,
          motion, and camera firmware. Add 10-20% headroom, or use a manual bitrate override from the
          camera/NVR spec sheet for an accurate figure.{" "}
          {settings.unitSystem === "decimal"
            ? "GB/TB shown are decimal (1 GB = 1e9 bytes)."
            : "GiB/TiB shown are binary (1 GiB = 2^30 bytes)."}{" "}
          This is a planning estimate, not a guarantee.
        </p>
        <p className="mt-1">
          {BUSINESS.name} &middot; {BUSINESS.streetAddress}, {BUSINESS.addressLocality} {BUSINESS.postalCode}{" "}
          &middot; {BUSINESS.telephone}
        </p>
      </footer>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <div className="text-gray-600">{label}</div>
      <div className="text-sm font-semibold text-blue-900">{value}</div>
    </div>
  );
}
