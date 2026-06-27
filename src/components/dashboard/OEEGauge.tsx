
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gauge } from "lucide-react";

const SUB_METRICS = [
  { label: "AVAILABILITY", value: 92.1, color: "hsl(var(--accent))" },
  { label: "PERFORMANCE", value: 88.5, color: "hsl(var(--accent))" },
  { label: "QUALITY", value: 97.8, color: "hsl(var(--accent))" },
];

const OEE_VALUE = 84.2;
const RADIUS = 80;
const STROKE = 10;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const ARC_LENGTH = CIRCUMFERENCE * 0.75; // 270-degree arc

export function OEEGauge() {
  const [offset, setOffset] = useState(ARC_LENGTH);

  useEffect(() => {
    const timer = setTimeout(() => {
      const fillLength = ARC_LENGTH * (OEE_VALUE / 100);
      setOffset(ARC_LENGTH - fillLength);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className="cyber-panel h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium font-headline tracking-wider flex items-center gap-2">
          <Gauge className="h-4 w-4 text-primary" />
          OEE PERFORMANCE
        </CardTitle>
        <Badge variant="outline" className="text-[10px] uppercase tracking-widest text-accent border-accent/30">
          Live
        </Badge>
      </CardHeader>
      <CardContent className="pt-4">
        {/* Radial Gauge */}
        <div className="flex items-center justify-center">
          <div className="relative w-[200px] h-[200px]">
            <svg
              width="200"
              height="200"
              viewBox="0 0 200 200"
              className="transform rotate-[135deg]"
            >
              {/* Background track */}
              <circle
                cx="100"
                cy="100"
                r={RADIUS}
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth={STROKE}
                strokeDasharray={`${ARC_LENGTH} ${CIRCUMFERENCE}`}
                strokeLinecap="round"
              />
              {/* Active gauge fill */}
              <circle
                cx="100"
                cy="100"
                r={RADIUS}
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth={STROKE}
                strokeDasharray={`${ARC_LENGTH} ${CIRCUMFERENCE}`}
                strokeDashoffset={offset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            {/* Center label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold font-headline text-primary">
                {OEE_VALUE}%
              </span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">
                Overall OEE
              </span>
            </div>
          </div>
        </div>

        {/* Sub-metrics */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
          {SUB_METRICS.map((metric) => (
            <div key={metric.label} className="space-y-2">
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest text-center">
                {metric.label}
              </p>
              <p className="text-lg font-bold font-headline text-center">
                {metric.value}%
              </p>
              <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${metric.value}%`,
                    backgroundColor: metric.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
