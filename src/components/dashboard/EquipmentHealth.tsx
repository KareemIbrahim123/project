
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wrench, Thermometer, Activity } from "lucide-react";

type AssetStatus = "running" | "maintenance" | "fault";

interface Asset {
  name: string;
  status: AssetStatus;
  temp: number;
  vibration: number;
  hours: number;
}

const ASSETS: Asset[] = [
  { name: "CNC Mill-01", status: "running", temp: 42, vibration: 2.1, hours: 1247 },
  { name: "Hydraulic Press", status: "running", temp: 38, vibration: 1.8, hours: 892 },
  { name: "Conveyor Line A", status: "maintenance", temp: 31, vibration: 3.4, hours: 2103 },
  { name: "Air Compressor", status: "running", temp: 55, vibration: 1.2, hours: 456 },
  { name: "Packaging Robot", status: "fault", temp: 67, vibration: 5.8, hours: 3210 },
  { name: "Cooling Tower", status: "running", temp: 28, vibration: 0.8, hours: 1580 },
];

const STATUS_CONFIG: Record<AssetStatus, { label: string; badgeClass: string; dotClass: string }> = {
  running: {
    label: "RUNNING",
    badgeClass: "border-accent/30 text-accent bg-accent/10",
    dotClass: "bg-accent",
  },
  maintenance: {
    label: "MAINTENANCE",
    badgeClass: "border-warning/30 text-warning bg-warning/10",
    dotClass: "bg-warning",
  },
  fault: {
    label: "FAULT",
    badgeClass: "border-destructive/30 text-destructive bg-destructive/10",
    dotClass: "bg-destructive",
  },
};

export function EquipmentHealth() {
  return (
    <Card className="cyber-panel h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium font-headline tracking-wider flex items-center gap-2">
          <Wrench className="h-4 w-4 text-accent" />
          EQUIPMENT HEALTH MATRIX
        </CardTitle>
        <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">
          {ASSETS.length} ASSETS
        </span>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {ASSETS.map((asset) => {
            const config = STATUS_CONFIG[asset.status];
            return (
              <div
                key={asset.name}
                className={`rounded-lg border p-3 space-y-3 bg-secondary/5 ${
                  asset.status === "fault"
                    ? "border-destructive/40 animate-pulse"
                    : "border-border"
                }`}
              >
                {/* Header row */}
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-headline tracking-wider truncate">
                    {asset.name.toUpperCase()}
                  </h4>
                  <Badge
                    variant="outline"
                    className={`text-[9px] px-1.5 py-0 ${config.badgeClass}`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full mr-1 inline-block ${config.dotClass}`} />
                    {config.label}
                  </Badge>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center">
                    <Thermometer className="h-3 w-3 mx-auto mb-1 text-primary" />
                    <p className="text-[10px] text-muted-foreground uppercase">Temp</p>
                    <p className="text-sm font-bold font-mono">{asset.temp}°C</p>
                  </div>
                  <div className="text-center">
                    <Activity className="h-3 w-3 mx-auto mb-1 text-accent" />
                    <p className="text-[10px] text-muted-foreground uppercase">Vib</p>
                    <p className="text-sm font-bold font-mono">{asset.vibration}mm/s</p>
                  </div>
                  <div className="text-center">
                    <Wrench className="h-3 w-3 mx-auto mb-1 text-muted-foreground" />
                    <p className="text-[10px] text-muted-foreground uppercase">Hrs</p>
                    <p className="text-sm font-bold font-mono">{asset.hours.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
