"use client";

import { useEffect, useRef, useState } from "react";
import { Link2, Plus, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { NumberField } from "@/components/cctv/NumberField";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CameraGroupCard } from "@/components/cctv/CameraGroupCard";
import { ResultsPanel } from "@/components/cctv/ResultsPanel";
import { NvrCard } from "@/components/cctv/NvrCard";
import { PrintReport } from "@/components/cctv/PrintReport";
import { Watermark } from "@/components/cctv/Watermark";
import { useCalculatorStore } from "@/lib/cctv/store";
import { readStateFromUrl, writeStateToUrl, buildShareUrl } from "@/lib/cctv/url-state";
import { calculateAggregate, calculateReverseRetention, tbToBytes } from "@/lib/cctv/calc";
import { STANDARD_DRIVE_SIZES_TB } from "@/lib/cctv/data/drives";
import { RETENTION_QUICK_CHIPS } from "@/lib/cctv/labels";
import { cn } from "@/lib/utils";

export function Calculator() {
  const store = useCalculatorStore();
  const {
    groups,
    settings,
    nvr,
    mode,
    reverseAvailableTB,
    hydrated,
    addGroup,
    duplicateGroup,
    removeGroup,
    updateGroup,
    updateSettings,
    updateNvr,
    setMode,
    setReverseAvailableTB,
    loadState,
    markHydrated,
  } = store;

  const [copied, setCopied] = useState(false);
  const debounceRef = useRef(null);

  useEffect(() => {
    const urlState = readStateFromUrl();
    if (urlState) loadState(urlState);
    else markHydrated();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const state = { groups, settings, nvr, mode, reverseAvailableTB };
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => writeStateToUrl(state), 400);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [groups, settings, nvr, mode, reverseAvailableTB, hydrated]);

  if (!hydrated) return null;

  const aggregate = calculateAggregate(groups, settings);

  const bytesPerDayAllCameras = aggregate.groups.reduce(
    (sum, calc, i) => sum + calc.bytesPerCameraPerDay * groups[i].quantity,
    0
  );
  const reverseResult = calculateReverseRetention(
    tbToBytes(reverseAvailableTB, settings.unitSystem),
    bytesPerDayAllCameras
  );

  const handleCopyLink = async () => {
    const url = buildShareUrl({ groups, settings, nvr, mode, reverseAvailableTB });
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="cctv-theme relative bg-white text-foreground">
      <Watermark />

      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 print:p-0">
        <header className="flex items-center justify-between gap-4 print:hidden">
          <div>
            <h1 className="text-xl font-semibold sm:text-2xl">CCTV HDD / Storage Calculator</h1>
            <p className="text-sm text-muted-foreground">
              Estimate storage for your camera setup, or work out retention days from a given HDD size.
            </p>
          </div>
        </header>

        <Tabs value={mode} onValueChange={(v) => setMode(v)} className="print:hidden">
          <TabsList>
            <TabsTrigger value="forward">Cameras &rarr; Storage</TabsTrigger>
            <TabsTrigger value="reverse">HDD size &rarr; Days</TabsTrigger>
          </TabsList>
        </Tabs>

        <Card className="print:hidden">
          <CardHeader>
            <CardTitle>Global settings</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {mode === "forward" ? (
              <div className="flex flex-col gap-1.5 sm:col-span-1">
                <Label htmlFor="retention">Retention (days)</Label>
                <NumberField
                  id="retention"
                  min={1}
                  value={settings.retentionDays}
                  onCommit={(retentionDays) => updateSettings({ retentionDays })}
                />
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {RETENTION_QUICK_CHIPS.map((days) => (
                    <button
                      key={days}
                      type="button"
                      onClick={() => updateSettings({ retentionDays: days })}
                      className={cn(
                        "rounded-full border px-2.5 py-0.5 text-xs transition-colors",
                        settings.retentionDays === days
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:bg-muted"
                      )}
                    >
                      {days}d
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="available">
                  Available HDD storage ({settings.unitSystem === "decimal" ? "TB" : "TiB"})
                </Label>
                <NumberField
                  id="available"
                  min={0}
                  step={0.1}
                  value={reverseAvailableTB}
                  onCommit={setReverseAvailableTB}
                />
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <Label>Unit system</Label>
              <Select value={settings.unitSystem} onValueChange={(v) => updateSettings({ unitSystem: v })}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="decimal">Decimal (1 TB = 1e12 bytes)</SelectItem>
                  <SelectItem value="binary">Binary (1 TiB = 2^40 bytes)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="overhead">Overhead margin (%)</Label>
              <NumberField
                id="overhead"
                min={0}
                max={100}
                value={settings.overheadMarginPercent}
                onCommit={(overheadMarginPercent) => updateSettings({ overheadMarginPercent })}
              />
            </div>

            {mode === "forward" && (
              <div className="flex flex-col gap-1.5">
                <Label>HDD size</Label>
                <Select
                  value={String(settings.preferredDriveSizeTB ?? "auto")}
                  onValueChange={(v) =>
                    updateSettings({ preferredDriveSizeTB: v === "auto" ? "auto" : Number(v) })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Auto (fewest drives)</SelectItem>
                    {STANDARD_DRIVE_SIZES_TB.map((s) => (
                      <SelectItem key={s} value={String(s)}>
                        {s} TB drives
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 print:hidden">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">Camera groups</h2>
              <Button onClick={addGroup} size="sm">
                <Plus className="size-4" /> Add camera group
              </Button>
            </div>
            {groups.map((group) => (
              <CameraGroupCard
                key={group.id}
                group={group}
                retentionDays={settings.retentionDays}
                canRemove={groups.length > 1}
                onUpdate={(patch) => updateGroup(group.id, patch)}
                onDuplicate={() => duplicateGroup(group.id)}
                onRemove={() => removeGroup(group.id)}
              />
            ))}

            <NvrCard
              nvr={nvr}
              totalCameras={aggregate.totalCameras}
              totalBitrateMbps={aggregate.totalBitrateMbps}
              requiredStorageBytes={aggregate.totalBytesWithOverhead}
              onUpdate={updateNvr}
            />
          </div>

          <div className="flex flex-col gap-4">
            {mode === "forward" ? (
              <ResultsPanel groups={groups} aggregate={aggregate} unitSystem={settings.unitSystem} />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Retention from available storage</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-1">
                  <div className="text-3xl font-semibold text-blue-700">
                    {reverseResult.wholeDays} day{reverseResult.wholeDays === 1 ? "" : "s"}{" "}
                    <span className="text-lg font-normal text-muted-foreground">
                      + {reverseResult.remainingHours.toFixed(1)}h
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Based on {aggregate.totalBitrateMbps.toFixed(1)} Mbps across {aggregate.totalCameras} camera
                    {aggregate.totalCameras === 1 ? "" : "s"} from the groups on the left.
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={handleCopyLink}>
                <Link2 className="size-4" /> {copied ? "Link copied!" : "Copy link"}
              </Button>
              <Button variant="outline" onClick={() => window.print()}>
                <Printer className="size-4" /> Print / Save as PDF
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              Estimated bitrates are approximations; real storage depends on scene complexity, lighting,
              motion, and camera firmware. For the most accurate result, enter the actual bitrate from your
              camera or NVR spec sheet using the manual override.{" "}
              {settings.unitSystem === "decimal"
                ? "GB/TB here are decimal (1 GB = 1e9 bytes)."
                : "GiB/TiB here are binary (1 GiB = 2^30 bytes)."}{" "}
              This is a planning estimate, not a guarantee.
            </p>
          </div>
        </div>

        <PrintReport
          groups={groups}
          aggregate={aggregate}
          settings={settings}
          nvr={nvr}
          mode={mode}
          reverseAvailableTB={reverseAvailableTB}
          reverseResult={reverseResult}
        />
      </div>
    </div>
  );
}
