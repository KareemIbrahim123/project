
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Zap, Battery, Sun, Clock } from "lucide-react";
import { MOCK_ENERGY_DATA } from "@/lib/mock-data";

export function EnergyMonitor() {
  const { batteryLevel, pvInput, targetAutonomy, currentAutonomy } = MOCK_ENERGY_DATA;

  return (
    <Card className="cyber-panel overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium font-headline tracking-wider flex items-center gap-2">
          <Zap className="h-4 w-4 text-primary" />
          AUTONOMOUS ENERGY
        </CardTitle>
        <span className="text-[10px] text-accent animate-pulse">LIVE MONITOR</span>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold font-headline">{batteryLevel}%</span>
              <Battery className="h-5 w-5 mb-2 text-primary" />
            </div>
            <Progress value={batteryLevel} className="h-2 bg-muted [&>div]:bg-primary glow-primary" />
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Storage Capacity</p>
          </div>
          <div className="space-y-4">
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold font-headline">{pvInput}</span>
              <span className="text-sm font-medium mb-2">W</span>
              <Sun className="h-5 w-5 mb-2 text-accent" />
            </div>
            <div className="flex items-center gap-1">
              {[...Array(10)].map((_, i) => (
                <div 
                  key={i} 
                  className={`h-2 flex-1 rounded-full ${i < 6 ? 'bg-accent' : 'bg-muted'}`} 
                />
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">PV Input Rate</p>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-secondary/20 rounded-lg">
              <Clock className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-tighter">Autonomy Target</p>
              <p className="text-lg font-bold font-headline">{currentAutonomy} / {targetAutonomy} hrs</p>
            </div>
          </div>
          <div className="text-right">
            <div className="inline-flex items-center rounded-full border border-primary/20 px-2.5 py-0.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/10">
              OPTIMIZED
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
