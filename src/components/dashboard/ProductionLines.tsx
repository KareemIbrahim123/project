
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Factory } from "lucide-react";
import { Progress } from "@/components/ui/progress";

type LineStatus = "running" | "changeover";

interface ProductionLine {
  id: string;
  department: string;
  throughput: number;
  target: number;
  batchPercent: number;
  status: LineStatus;
  shiftOutput: number;
}

const LINES: ProductionLine[] = [
  {
    id: "LINE A",
    department: "Assembly",
    throughput: 142,
    target: 180,
    batchPercent: 78,
    status: "running",
    shiftOutput: 1136,
  },
  {
    id: "LINE B",
    department: "Packaging",
    throughput: 95,
    target: 120,
    batchPercent: 45,
    status: "running",
    shiftOutput: 760,
  },
  {
    id: "LINE C",
    department: "Quality Control",
    throughput: 0,
    target: 60,
    batchPercent: 100,
    status: "changeover",
    shiftOutput: 480,
  },
];

const STATUS_STYLE: Record<LineStatus, { label: string; badgeClass: string }> = {
  running: {
    label: "RUNNING",
    badgeClass: "border-accent/30 text-accent bg-accent/10",
  },
  changeover: {
    label: "CHANGEOVER",
    badgeClass: "border-warning/30 text-warning bg-warning/10",
  },
};

export function ProductionLines() {
  return (
    <Card className="cyber-panel h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium font-headline tracking-wider flex items-center gap-2">
          <Factory className="h-4 w-4 text-primary" />
          PRODUCTION LINE STATUS
        </CardTitle>
        <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">
          SHIFT 2 / 3
        </span>
      </CardHeader>
      <CardContent className="pt-4 space-y-4">
        {LINES.map((line) => {
          const style = STATUS_STYLE[line.status];
          const throughputPercent = line.target > 0 ? Math.round((line.throughput / line.target) * 100) : 0;

          return (
            <div
              key={line.id}
              className="rounded-lg border border-border p-4 space-y-3 bg-secondary/5"
            >
              {/* Top row: name + status */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-headline tracking-wider">
                    {line.id}
                    <span className="text-muted-foreground font-mono ml-2 tracking-normal">
                      — {line.department}
                    </span>
                  </h4>
                </div>
                <Badge variant="outline" className={`text-[9px] px-1.5 py-0 ${style.badgeClass}`}>
                  {style.label}
                </Badge>
              </div>

              {/* Throughput vs target */}
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                    Throughput
                  </p>
                  <p className="text-xl font-bold font-headline">
                    {line.throughput}
                    <span className="text-xs font-normal text-muted-foreground ml-1">
                      / {line.target} units/hr
                    </span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                    Shift Output
                  </p>
                  <p className="text-sm font-bold font-mono">
                    {line.shiftOutput.toLocaleString()} units
                  </p>
                </div>
              </div>

              {/* Throughput bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-muted-foreground uppercase tracking-widest">
                  <span>Throughput Rate</span>
                  <span>{throughputPercent}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${throughputPercent}%` }}
                  />
                </div>
              </div>

              {/* Batch progress */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-muted-foreground uppercase tracking-widest">
                  <span>Batch Completion</span>
                  <span>{line.batchPercent}%</span>
                </div>
                <Progress
                  value={line.batchPercent}
                  className="h-1.5 bg-muted [&>div]:bg-accent"
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
