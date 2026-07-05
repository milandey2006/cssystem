"use client";

import { useMemo } from "react";
import { Copy, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardAction } from "@/components/ui/card";
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
import { Slider } from "@/components/ui/slider";
import { getBrand, BRANDS } from "@/lib/cctv/data/brands";
import { getResolutionInfo, RESOLUTIONS } from "@/lib/cctv/data/resolutions";
import { calculateGroup } from "@/lib/cctv/calc";
import { CODEC_LABELS, QUALITY_LABELS, RECORDING_MODE_LABELS } from "@/lib/cctv/labels";

export function CameraGroupCard({ group, retentionDays, canRemove, onUpdate, onDuplicate, onRemove }) {
  const brand = getBrand(group.brandId);

  const calc = useMemo(
    () => calculateGroup(group, brand, retentionDays),
    [group, brand, retentionDays]
  );

  const overrideEnabled = group.manualBitrateKbps !== undefined;
  const estimatedMbps = (group.manualBitrateKbps ?? calc.bitrateKbps) / 1000;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Camera group</CardTitle>
        <CardAction className="flex gap-1.5">
          <Button variant="ghost" size="icon" aria-label="Duplicate group" onClick={onDuplicate}>
            <Copy className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Remove group"
            disabled={!canRemove}
            onClick={onRemove}
          >
            <Trash2 className="size-4" />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`qty-${group.id}`}>Quantity</Label>
          <NumberField
            id={`qty-${group.id}`}
            min={1}
            value={group.quantity}
            onCommit={(quantity) => onUpdate({ quantity })}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label>Brand</Label>
          <Select
            value={group.brandId}
            onValueChange={(value) => {
              const newBrand = getBrand(value);
              onUpdate({ brandId: value, codec: newBrand.defaultCodec });
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {BRANDS.map((b) => (
                <SelectItem key={b.id} value={b.id}>
                  {b.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label>Resolution</Label>
          <Select
            value={group.resolutionKey}
            onValueChange={(value) => onUpdate({ resolutionKey: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {RESOLUTIONS.map((r) => (
                <SelectItem key={r.key} value={r.key}>
                  {r.label} ({r.commonName})
                </SelectItem>
              ))}
              <SelectItem value="custom">Custom&hellip;</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {group.resolutionKey === "custom" && (
          <>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`w-${group.id}`}>Width (px)</Label>
              <NumberField
                id={`w-${group.id}`}
                min={1}
                value={group.customWidth ?? 0}
                onCommit={(customWidth) => onUpdate({ customWidth })}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`h-${group.id}`}>Height (px)</Label>
              <NumberField
                id={`h-${group.id}`}
                min={1}
                value={group.customHeight ?? 0}
                onCommit={(customHeight) => onUpdate({ customHeight })}
              />
            </div>
          </>
        )}

        <div className="flex flex-col gap-1.5">
          <Label>Codec</Label>
          <Select value={group.codec} onValueChange={(value) => onUpdate({ codec: value })}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(CODEC_LABELS).map((c) => (
                <SelectItem key={c} value={c}>
                  {CODEC_LABELS[c]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`fps-${group.id}`}>Frame rate (fps)</Label>
          <NumberField
            id={`fps-${group.id}`}
            min={1}
            max={60}
            value={group.fps}
            onCommit={(fps) => onUpdate({ fps })}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label>Quality</Label>
          <Select value={group.quality} onValueChange={(value) => onUpdate({ quality: value })}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(QUALITY_LABELS).map((q) => (
                <SelectItem key={q} value={q}>
                  {QUALITY_LABELS[q]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label>Recording mode</Label>
          <Select
            value={group.recordingMode}
            onValueChange={(value) => onUpdate({ recordingMode: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(RECORDING_MODE_LABELS).map((m) => (
                <SelectItem key={m} value={m}>
                  {RECORDING_MODE_LABELS[m]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {group.recordingMode === "motion" && (
          <div className="col-span-2 flex flex-col gap-1.5 sm:col-span-1">
            <Label>Activity: {group.motionActivityPercent}%</Label>
            <Slider
              min={10}
              max={100}
              step={5}
              value={[group.motionActivityPercent]}
              onValueChange={(value) => onUpdate({ motionActivityPercent: value[0] })}
            />
          </div>
        )}

        {group.recordingMode === "schedule" && (
          <div className="flex flex-col gap-1.5">
            <Label htmlFor={`hrs-${group.id}`}>Hours / day</Label>
            <NumberField
              id={`hrs-${group.id}`}
              min={1}
              max={24}
              value={group.scheduleHoursPerDay}
              onCommit={(scheduleHoursPerDay) => onUpdate({ scheduleHoursPerDay })}
            />
          </div>
        )}

        <div className="flex items-center gap-2.5 pt-6">
          <Switch
            id={`audio-${group.id}`}
            checked={group.audioEnabled}
            onCheckedChange={(checked) => onUpdate({ audioEnabled: checked })}
          />
          <Label htmlFor={`audio-${group.id}`}>Audio (+64 kbps)</Label>
        </div>

        <div className="col-span-2 flex flex-col gap-1.5 rounded-lg bg-muted/50 p-3 sm:col-span-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="text-sm">
              Bitrate: <span className="font-medium">{estimatedMbps.toFixed(2)} Mbps</span>
              {!overrideEnabled && <span className="text-muted-foreground"> (estimated)</span>}
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor={`override-${group.id}`} className="text-muted-foreground">
                Manual override
              </Label>
              <Switch
                id={`override-${group.id}`}
                checked={overrideEnabled}
                onCheckedChange={(checked) =>
                  onUpdate({
                    manualBitrateKbps: checked ? Math.round(calc.bitrateKbps) : undefined,
                  })
                }
              />
            </div>
          </div>
          {overrideEnabled && (
            <div className="flex items-center gap-2">
              <NumberField
                min={0}
                step={0.1}
                className="max-w-32"
                value={(group.manualBitrateKbps ?? 0) / 1000}
                onCommit={(mbps) => onUpdate({ manualBitrateKbps: mbps * 1000 })}
              />
              <span className="text-sm text-muted-foreground">Mbps per camera</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
