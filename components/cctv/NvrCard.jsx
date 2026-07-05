"use client";

import { CheckCircle2, XCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { NumberField } from "@/components/cctv/NumberField";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { checkNvrFeasibility } from "@/lib/cctv/calc";

const RAID_LABELS = {
  none: "None / RAID0",
  raid1: "RAID1 (mirror)",
  raid5: "RAID5",
  raid6: "RAID6",
};

export function NvrCard({ nvr, totalCameras, totalBitrateMbps, requiredStorageBytes, onUpdate }) {
  const feasibility = checkNvrFeasibility(totalCameras, totalBitrateMbps, requiredStorageBytes, nvr);

  return (
    <Accordion type="single" collapsible className="rounded-xl border bg-card px-4">
      <AccordionItem value="nvr" className="border-b-0">
        <AccordionTrigger>
          <div className="flex items-center gap-2">
            NVR feasibility check
            {nvr.enabled &&
              (feasibility.channelsOk && feasibility.bandwidthOk && feasibility.storageOk ? (
                <CheckCircle2 className="size-4 text-emerald-600" />
              ) : (
                <XCircle className="size-4 text-destructive" />
              ))}
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex items-center gap-2.5 pb-3">
            <Switch
              id="nvr-enabled"
              checked={nvr.enabled}
              onCheckedChange={(checked) => onUpdate({ enabled: checked })}
            />
            <Label htmlFor="nvr-enabled">Enable NVR check</Label>
          </div>

          {nvr.enabled && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="nvr-channels">Max channels</Label>
                <NumberField
                  id="nvr-channels"
                  min={1}
                  value={nvr.maxChannels}
                  onCommit={(maxChannels) => onUpdate({ maxChannels })}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="nvr-bw">Max bandwidth (Mbps)</Label>
                <NumberField
                  id="nvr-bw"
                  min={1}
                  value={nvr.maxIncomingBandwidthMbps}
                  onCommit={(maxIncomingBandwidthMbps) => onUpdate({ maxIncomingBandwidthMbps })}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="nvr-bays">HDD bays</Label>
                <NumberField
                  id="nvr-bays"
                  min={1}
                  value={nvr.hddBays}
                  onCommit={(hddBays) => onUpdate({ hddBays })}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="nvr-bay-size">Max size / bay (TB)</Label>
                <NumberField
                  id="nvr-bay-size"
                  min={1}
                  value={nvr.maxHddSizePerBayTB}
                  onCommit={(maxHddSizePerBayTB) => onUpdate({ maxHddSizePerBayTB })}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>RAID level</Label>
                <Select value={nvr.raidLevel} onValueChange={(v) => onUpdate({ raidLevel: v })}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(RAID_LABELS).map((r) => (
                      <SelectItem key={r} value={r}>
                        {RAID_LABELS[r]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-2 flex flex-col gap-1.5 rounded-lg bg-muted/50 p-3 text-sm sm:col-span-3">
                <FeasibilityLine ok={feasibility.channelsOk} label={`Channels: ${totalCameras} / ${nvr.maxChannels}`} />
                <FeasibilityLine
                  ok={feasibility.bandwidthOk}
                  label={`Bandwidth: ${totalBitrateMbps.toFixed(1)} / ${nvr.maxIncomingBandwidthMbps} Mbps`}
                />
                <FeasibilityLine
                  ok={feasibility.storageOk}
                  label={`Usable capacity: ${(feasibility.usableCapacityBytes / 1e12).toFixed(1)} TB (after RAID)`}
                />
                {feasibility.warnings.map((w) => (
                  <div key={w} className="text-destructive">
                    {w}
                  </div>
                ))}
              </div>
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function FeasibilityLine({ ok, label }) {
  return (
    <div className="flex items-center gap-2">
      {ok ? (
        <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
      ) : (
        <XCircle className="size-4 shrink-0 text-destructive" />
      )}
      <span>{label}</span>
    </div>
  );
}
