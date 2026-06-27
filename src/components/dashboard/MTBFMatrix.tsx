"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settings } from "lucide-react";

const data = [
  { machine: "CNC Mill-01", mtbf: 450, mttr: 2.5, reliability: 98 },
  { machine: "Lathe-02", mtbf: 320, mttr: 3.1, reliability: 94 },
  { machine: "Laser Cutter", mtbf: 280, mttr: 1.5, reliability: 92 },
  { machine: "Assembly Robot", mtbf: 210, mttr: 2.0, reliability: 88 },
  { machine: "Packaging Robot", mtbf: 120, mttr: 4.0, reliability: 85 },
];

export function MTBFMatrix() {
  return (
    <Card className="cyber-panel">
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-primary/20">
        <CardTitle className="text-sm font-headline tracking-widest text-primary flex items-center gap-2 uppercase">
          <Settings className="h-4 w-4" />
          Asset Reliability (MTBF / MTTR)
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-mono">
            <thead>
              <tr className="border-b border-primary/20 text-muted-foreground uppercase tracking-wider">
                <th className="text-left py-3 font-medium">Machine</th>
                <th className="text-right py-3 font-medium">MTBF (hrs)</th>
                <th className="text-right py-3 font-medium">MTTR (hrs)</th>
                <th className="text-right py-3 font-medium">Reliability</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr key={idx} className="border-b border-primary/10 hover:bg-primary/5 transition-colors">
                  <td className="py-3 text-foreground">{row.machine}</td>
                  <td className="py-3 text-right text-primary">{row.mtbf.toFixed(1)}</td>
                  <td className="py-3 text-right text-warning">{row.mttr.toFixed(1)}</td>
                  <td className="py-3 text-right">
                    <Badge
                      variant="outline"
                      className={`${
                        row.reliability >= 95
                          ? "border-primary text-primary"
                          : row.reliability >= 90
                          ? "border-accent text-accent"
                          : row.reliability >= 85
                          ? "border-warning text-warning"
                          : "border-destructive text-destructive"
                      }`}
                    >
                      {row.reliability}%
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
