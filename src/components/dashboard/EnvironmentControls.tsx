"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Thermometer, Wind, RefreshCcw } from "lucide-react";
import { useCyberToast } from "@/components/CyberToast";

const INITIAL_ZONES = [
  { id: "Z1", name: "Assembly Line A", temp: 22, humidity: 45 },
  { id: "Z2", name: "Server Vault", temp: 18, humidity: 40 },
  { id: "Z3", name: "Chemical Storage", temp: 15, humidity: 30 },
];

export function EnvironmentControls() {
  const [zones, setZones] = useState(INITIAL_ZONES);
  const [isSyncing, setIsSyncing] = useState(false);
  const toast = useCyberToast();

  const handleTempChange = (id: string, newTemp: number[]) => {
    setZones(prev => prev.map(z => z.id === id ? { ...z, temp: newTemp[0] } : z));
  };

  const handleSync = () => {
    setIsSyncing(true);
    toast("Syncing environmental setpoints to building management system...", "info");
    
    setTimeout(() => {
      setIsSyncing(false);
      toast("Environmental controls successfully synchronized.", "success");
    }, 2000);
  };

  return (
    <Card className="cyber-panel h-full flex flex-col">
      <CardHeader className="pb-4 border-b border-border/30">
        <CardTitle className="text-sm font-medium font-headline tracking-wider flex items-center gap-2">
          <Wind className="h-4 w-4 text-accent" />
          ENVIRONMENTAL SETPOINTS
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-4 sm:p-6 flex flex-col justify-between">
        <div className="space-y-6">
          {zones.map((zone) => (
            <div key={zone.id} className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold">{zone.name}</span>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-mono">
                    <Thermometer className="h-3 w-3" />
                    {zone.temp}°C
                  </div>
                </div>
              </div>
              <Slider 
                defaultValue={[zone.temp]} 
                max={30} 
                min={10} 
                step={1} 
                className="[&>span:first-child]:bg-muted/50 [&_[role=slider]]:bg-accent [&_[role=slider]]:border-accent"
                onValueChange={(val) => handleTempChange(zone.id, val)}
              />
            </div>
          ))}
        </div>
        
        <button
          onClick={handleSync}
          disabled={isSyncing}
          className="mt-8 w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-accent/50 text-accent font-bold tracking-widest hover:bg-accent/10 transition-all disabled:opacity-50"
        >
          <RefreshCcw className={`h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
          {isSyncing ? "SYNCING DATA..." : "SYNC SETPOINTS"}
        </button>
      </CardContent>
    </Card>
  );
}
