
"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Factory,
  MapPin,
  AlertTriangle,
  CheckCircle2,
  Wrench,
  Info,
} from "lucide-react";

type ZoneStatus = "operational" | "maintenance";

interface ZoneEquipment {
  name: string;
  status: "running" | "maintenance" | "fault";
}

interface Zone {
  id: string;
  name: string;
  department: string;
  status: ZoneStatus;
  assetCount: number;
  tempRange: string;
  lastInspection: string;
  equipment: ZoneEquipment[];
  // SVG rect coords
  x: number;
  y: number;
  w: number;
  h: number;
}

const ZONES: Zone[] = [
  {
    id: "A",
    name: "Zone A",
    department: "Assembly",
    status: "operational",
    assetCount: 38,
    tempRange: "20–26°C",
    lastInspection: "2026-06-25",
    equipment: [
      { name: "CNC Mill-01", status: "running" },
      { name: "CNC Mill-02", status: "running" },
      { name: "Robotic Arm A1", status: "running" },
      { name: "Conveyor Belt A", status: "maintenance" },
    ],
    x: 20,
    y: 20,
    w: 260,
    h: 180,
  },
  {
    id: "B",
    name: "Zone B",
    department: "Packaging",
    status: "operational",
    assetCount: 35,
    tempRange: "18–24°C",
    lastInspection: "2026-06-24",
    equipment: [
      { name: "Packaging Robot B1", status: "running" },
      { name: "Shrink Wrapper", status: "running" },
      { name: "Palletizer B1", status: "running" },
    ],
    x: 300,
    y: 20,
    w: 260,
    h: 180,
  },
  {
    id: "C",
    name: "Zone C",
    department: "Quality Lab",
    status: "maintenance",
    assetCount: 12,
    tempRange: "21–23°C",
    lastInspection: "2026-06-20",
    equipment: [
      { name: "Spectrometer C1", status: "maintenance" },
      { name: "Tensile Tester", status: "maintenance" },
      { name: "Vision System C1", status: "running" },
    ],
    x: 20,
    y: 220,
    w: 200,
    h: 160,
  },
  {
    id: "D",
    name: "Zone D",
    department: "Utilities / HVAC",
    status: "operational",
    assetCount: 28,
    tempRange: "16–30°C",
    lastInspection: "2026-06-26",
    equipment: [
      { name: "Chiller Unit D1", status: "running" },
      { name: "Air Handler D2", status: "running" },
      { name: "Boiler D1", status: "running" },
      { name: "Cooling Tower D1", status: "fault" },
    ],
    x: 240,
    y: 220,
    w: 320,
    h: 160,
  },
];

interface EquipmentRow {
  id: string;
  name: string;
  zone: string;
  status: "Running" | "Maintenance" | "Fault";
  lastMaintenance: string;
}

const EQUIPMENT_REGISTRY: EquipmentRow[] = [
  { id: "EQ-001", name: "CNC Mill-01", zone: "A", status: "Running", lastMaintenance: "2026-05-12" },
  { id: "EQ-002", name: "CNC Mill-02", zone: "A", status: "Running", lastMaintenance: "2026-04-28" },
  { id: "EQ-003", name: "Packaging Robot B1", zone: "B", status: "Running", lastMaintenance: "2026-06-01" },
  { id: "EQ-004", name: "Conveyor Belt A", zone: "A", status: "Maintenance", lastMaintenance: "2026-06-22" },
  { id: "EQ-005", name: "Spectrometer C1", zone: "C", status: "Maintenance", lastMaintenance: "2026-06-18" },
  { id: "EQ-006", name: "Cooling Tower D1", zone: "D", status: "Fault", lastMaintenance: "2026-03-15" },
  { id: "EQ-007", name: "Shrink Wrapper", zone: "B", status: "Running", lastMaintenance: "2026-05-30" },
  { id: "EQ-008", name: "Boiler D1", zone: "D", status: "Running", lastMaintenance: "2026-06-10" },
];

const ZONE_STATUS_COLORS: Record<ZoneStatus, { fill: string; stroke: string; label: string; badgeClass: string }> = {
  operational: {
    fill: "rgba(34,197,94,0.12)",
    stroke: "rgba(34,197,94,0.6)",
    label: "OPERATIONAL",
    badgeClass: "border-accent/30 text-accent bg-accent/10",
  },
  maintenance: {
    fill: "rgba(234,179,8,0.12)",
    stroke: "rgba(234,179,8,0.6)",
    label: "MAINTENANCE",
    badgeClass: "border-warning/30 text-warning bg-warning/10",
  },
};

const EQ_STATUS_DOT: Record<string, string> = {
  running: "bg-accent",
  maintenance: "bg-warning",
  fault: "bg-destructive",
  Running: "bg-accent",
  Maintenance: "bg-warning",
  Fault: "bg-destructive",
};

const EQ_STATUS_TEXT: Record<string, string> = {
  Running: "text-accent",
  Maintenance: "text-warning",
  Fault: "text-destructive",
};

export default function PlantFloorPage() {
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-1">
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">
          MODULE_PLANT_FLOOR_v3.0
        </p>
        <h1 className="text-2xl font-headline tracking-wider flex items-center gap-2">
          <Factory className="h-6 w-6 text-primary" />
          PLANT FLOOR MAP
        </h1>
      </div>

      {/* Floor plan + side panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* SVG Floor Plan */}
        <div className="lg:col-span-2 cyber-panel rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-xs font-headline tracking-wider uppercase">
              Floor Layout — Building 1
            </span>
          </div>
          <svg
            viewBox="0 0 580 400"
            className="w-full h-auto"
            style={{ minHeight: 280 }}
          >
            {/* Background grid lines */}
            {Array.from({ length: 12 }).map((_, i) => (
              <line
                key={`vg-${i}`}
                x1={i * 50}
                y1="0"
                x2={i * 50}
                y2="400"
                stroke="hsl(var(--border))"
                strokeWidth="0.5"
                strokeDasharray="4 4"
              />
            ))}
            {Array.from({ length: 9 }).map((_, i) => (
              <line
                key={`hg-${i}`}
                x1="0"
                y1={i * 50}
                x2="580"
                y2={i * 50}
                stroke="hsl(var(--border))"
                strokeWidth="0.5"
                strokeDasharray="4 4"
              />
            ))}

            {/* Zones */}
            {ZONES.map((zone) => {
              const colors = ZONE_STATUS_COLORS[zone.status];
              const isSelected = selectedZone?.id === zone.id;
              return (
                <g
                  key={zone.id}
                  className="cursor-pointer"
                  onClick={() => setSelectedZone(zone)}
                >
                  <rect
                    x={zone.x}
                    y={zone.y}
                    width={zone.w}
                    height={zone.h}
                    rx={6}
                    fill={colors.fill}
                    stroke={isSelected ? "hsl(var(--primary))" : colors.stroke}
                    strokeWidth={isSelected ? 2.5 : 1.5}
                  />
                  <text
                    x={zone.x + 14}
                    y={zone.y + 24}
                    fill="currentColor"
                    className="text-[13px] font-bold"
                    style={{ fontFamily: "var(--font-headline, monospace)" }}
                  >
                    {zone.name.toUpperCase()}
                  </text>
                  <text
                    x={zone.x + 14}
                    y={zone.y + 42}
                    fill="currentColor"
                    className="text-[10px]"
                    opacity={0.6}
                    style={{ fontFamily: "monospace" }}
                  >
                    {zone.department}
                  </text>
                  <text
                    x={zone.x + 14}
                    y={zone.y + zone.h - 14}
                    fill="currentColor"
                    className="text-[10px]"
                    opacity={0.45}
                    style={{ fontFamily: "monospace" }}
                  >
                    {zone.assetCount} assets
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Legend */}
          <div className="flex items-center gap-6 mt-4 pt-3 border-t border-border">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-accent" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
                Operational
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <AlertTriangle className="h-3 w-3 text-warning" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
                Maintenance
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <AlertTriangle className="h-3 w-3 text-destructive" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
                Fault
              </span>
            </div>
          </div>
        </div>

        {/* Side panel */}
        <div className="cyber-panel rounded-lg p-4 space-y-4">
          {selectedZone ? (
            <>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-headline tracking-wider">
                  {selectedZone.name.toUpperCase()}
                </h3>
                <Badge
                  variant="outline"
                  className={`text-[9px] ${ZONE_STATUS_COLORS[selectedZone.status].badgeClass}`}
                >
                  {ZONE_STATUS_COLORS[selectedZone.status].label}
                </Badge>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-muted-foreground uppercase tracking-widest">Department</span>
                  <span className="font-mono">{selectedZone.department}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-muted-foreground uppercase tracking-widest">Active Assets</span>
                  <span className="font-mono">{selectedZone.assetCount}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-muted-foreground uppercase tracking-widest">Temp Range</span>
                  <span className="font-mono">{selectedZone.tempRange}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-muted-foreground uppercase tracking-widest">Last Inspection</span>
                  <span className="font-mono">{selectedZone.lastInspection}</span>
                </div>
              </div>

              {/* Equipment in zone */}
              <div className="pt-2">
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2">
                  Equipment
                </p>
                <div className="space-y-2">
                  {selectedZone.equipment.map((eq) => (
                    <div
                      key={eq.name}
                      className="flex items-center justify-between rounded border border-border px-2.5 py-1.5 bg-secondary/5"
                    >
                      <span className="text-xs font-mono truncate">{eq.name}</span>
                      <span className={`h-2 w-2 rounded-full ${EQ_STATUS_DOT[eq.status]}`} />
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-12 space-y-3">
              <Info className="h-8 w-8 text-muted-foreground/40" />
              <p className="text-xs text-muted-foreground uppercase tracking-widest">
                Select a zone on the floor plan to view details
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Equipment Registry Table */}
      <div className="cyber-panel rounded-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          <Wrench className="h-4 w-4 text-accent" />
          <span className="text-sm font-headline tracking-wider uppercase">
            Plant Equipment Registry
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-3 text-[10px] text-muted-foreground uppercase tracking-widest font-medium">
                  ID
                </th>
                <th className="text-left py-2 px-3 text-[10px] text-muted-foreground uppercase tracking-widest font-medium">
                  Name
                </th>
                <th className="text-left py-2 px-3 text-[10px] text-muted-foreground uppercase tracking-widest font-medium">
                  Zone
                </th>
                <th className="text-left py-2 px-3 text-[10px] text-muted-foreground uppercase tracking-widest font-medium">
                  Status
                </th>
                <th className="text-left py-2 px-3 text-[10px] text-muted-foreground uppercase tracking-widest font-medium">
                  Last Maintenance
                </th>
              </tr>
            </thead>
            <tbody>
              {EQUIPMENT_REGISTRY.map((eq) => (
                <tr key={eq.id} className="border-b border-border/50 hover:bg-secondary/10 transition-colors">
                  <td className="py-2 px-3 font-mono text-primary">{eq.id}</td>
                  <td className="py-2 px-3 font-mono">{eq.name}</td>
                  <td className="py-2 px-3 font-mono">{eq.zone}</td>
                  <td className="py-2 px-3">
                    <span className="flex items-center gap-1.5">
                      <span className={`h-2 w-2 rounded-full ${EQ_STATUS_DOT[eq.status]}`} />
                      <span className={`font-mono uppercase ${EQ_STATUS_TEXT[eq.status]}`}>
                        {eq.status}
                      </span>
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono text-muted-foreground">{eq.lastMaintenance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
