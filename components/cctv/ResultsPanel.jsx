"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { bytesToGB, bytesToTB } from "@/lib/cctv/calc";
import { getBrand } from "@/lib/cctv/data/brands";
import { getResolutionInfo } from "@/lib/cctv/data/resolutions";

const CHART_COLORS = ["#1e3a8a", "#2563eb", "#60a5fa", "#93c5fd", "#94a3b8"];

function groupLabel(group, index) {
  const res = group.resolutionKey === "custom" ? "Custom" : getResolutionInfo(group.resolutionKey).label;
  return `#${index + 1} ${res} x${group.quantity}`;
}

export function ResultsPanel({ groups, aggregate, unitSystem }) {
  const unitLabel = unitSystem === "decimal" ? "TB" : "TiB";
  const gbLabel = unitSystem === "decimal" ? "GB" : "GiB";

  const chartData = aggregate.groups.map((calc, i) => ({
    name: groupLabel(groups[i], i),
    value: calc.totalBytesForGroup,
  }));

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Total storage required</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="text-3xl font-semibold text-blue-700">
            {bytesToTB(aggregate.totalBytesWithOverhead, unitSystem).toFixed(2)} {unitLabel}
          </div>
          <div className="text-sm text-muted-foreground">
            {bytesToGB(aggregate.totalBytesWithOverhead, unitSystem).toFixed(0)} {gbLabel} &middot; includes
            overhead margin
          </div>
          <div className="mt-2 text-sm">
            Recommended drives:{" "}
            <span className="font-medium">
              {aggregate.driveRecommendation.count} &times; {aggregate.driveRecommendation.sizeTB}TB (
              {aggregate.driveRecommendation.totalTB}TB total)
            </span>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Aggregate bitrate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{aggregate.totalBitrateMbps.toFixed(1)} Mbps</div>
            <div className="text-sm text-muted-foreground">
              {aggregate.totalCameras} camera{aggregate.totalCameras === 1 ? "" : "s"} total
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Storage / day</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">
              {bytesToGB(aggregate.totalBytesPerDay, unitSystem).toFixed(1)} {gbLabel}
            </div>
            <div className="text-sm text-muted-foreground">across all cameras, before overhead</div>
          </CardContent>
        </Card>
      </div>

      <Card className="print:hidden">
        <CardHeader>
          <CardTitle>Storage share by group</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={50}
                  outerRadius={90}
                  paddingAngle={2}
                >
                  {chartData.map((entry, i) => (
                    <Cell key={entry.name} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${bytesToTB(Number(value), unitSystem).toFixed(2)} ${unitLabel}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Per-group breakdown</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Group</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Bitrate</TableHead>
                <TableHead>Storage / day</TableHead>
                <TableHead>Total storage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {aggregate.groups.map((calc, i) => (
                <TableRow key={calc.groupId}>
                  <TableCell>{groupLabel(groups[i], i)}</TableCell>
                  <TableCell>{getBrand(groups[i].brandId).name}</TableCell>
                  <TableCell>{(calc.bitrateKbps / 1000).toFixed(2)} Mbps</TableCell>
                  <TableCell>
                    {bytesToGB(calc.bytesPerCameraPerDay * groups[i].quantity, unitSystem).toFixed(1)} {gbLabel}
                  </TableCell>
                  <TableCell>
                    {bytesToTB(calc.totalBytesForGroup, unitSystem).toFixed(2)} {unitLabel}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
