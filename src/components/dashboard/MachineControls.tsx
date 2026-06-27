"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Square, RotateCcw, Cpu } from "lucide-react";
import { useCyberToast } from "@/components/CyberToast";

const MACHINES_BY_FLOOR = {
  1: [
    { id: "M01", name: "CNC Mill Alpha", status: "running", uptime: "98.2%" },
    { id: "M04", name: "Hydraulic Press", status: "fault", uptime: "82.4%" },
    { id: "M05", name: "Heavy Lathe Unit", status: "stopped", uptime: "91.0%" },
  ],
  2: [
    { id: "M02", name: "Packaging Robot B", status: "stopped", uptime: "95.5%" },
    { id: "M03", name: "Conveyor Line 1", status: "running", uptime: "99.1%" },
    { id: "M06", name: "Assembly Arm C", status: "running", uptime: "96.4%" },
  ],
  3: [
    { id: "M07", name: "Backup Generator A", status: "stopped", uptime: "100%" },
    { id: "M08", name: "Backup Generator B", status: "stopped", uptime: "100%" },
  ]
};

export function MachineControls({ floor }: { floor: 1 | 2 | 3 }) {
  const [machines, setMachines] = useState(MACHINES_BY_FLOOR[floor]);
  const toast = useCyberToast();

  useEffect(() => {
    setMachines(MACHINES_BY_FLOOR[floor]);
  }, [floor]);

  const handleAction = (id: string, action: "start" | "stop" | "reset") => {
    toast(`Command '${action.toUpperCase()}' sent to Machine ${id}. Awaiting telemetry response...`, "info");
    
    setTimeout(() => {
      setMachines(prev => prev.map(m => {
        if (m.id === id) {
          if (action === "start") return { ...m, status: "running" };
          if (action === "stop") return { ...m, status: "stopped" };
          if (action === "reset") return { ...m, status: "running" };
        }
        return m;
      }));
      toast(`Machine ${id} successfully transitioned to new state.`, "success");
    }, 1500);
  };

  if (machines.length === 0) return null;

  return (
    <Card className="cyber-panel h-full">
      <CardHeader className="pb-4 border-b border-border/30">
        <CardTitle className="text-sm font-medium font-headline tracking-wider flex items-center gap-2">
          <Cpu className="h-4 w-4 text-primary" />
          MACHINE OVERRIDE CONTROLS
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 xl:grid-cols-2 divide-y xl:divide-y-0 xl:divide-x divide-border/30">
          {machines.map((machine) => (
            <div key={machine.id} className="p-4 sm:p-6 hover:bg-white/5 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-bold text-sm">{machine.name}</h4>
                  <p className="text-[10px] text-muted-foreground font-mono mt-1">ID: {machine.id} | UPTIME: {machine.uptime}</p>
                </div>
                <Badge 
                  variant="outline" 
                  className={`text-[9px] uppercase tracking-wider ${
                    machine.status === "running" ? "border-primary/50 text-primary bg-primary/10" :
                    machine.status === "fault" ? "border-destructive/50 text-destructive bg-destructive/10 animate-pulse" :
                    "border-muted-foreground/50 text-muted-foreground bg-muted/10"
                  }`}
                >
                  {machine.status}
                </Badge>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleAction(machine.id, "start")}
                  disabled={machine.status === "running"}
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded border border-primary/30 text-primary text-[10px] font-bold tracking-widest hover:bg-primary/10 transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                >
                  <Play className="h-3 w-3" />
                  START
                </button>
                <button
                  onClick={() => handleAction(machine.id, "stop")}
                  disabled={machine.status === "stopped" || machine.status === "fault"}
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded border border-warning/30 text-warning text-[10px] font-bold tracking-widest hover:bg-warning/10 transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                >
                  <Square className="h-3 w-3" />
                  STOP
                </button>
                <button
                  onClick={() => handleAction(machine.id, "reset")}
                  disabled={machine.status !== "fault"}
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded border border-accent/30 text-accent text-[10px] font-bold tracking-widest hover:bg-accent/10 transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                >
                  <RotateCcw className="h-3 w-3" />
                  RESET
                </button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
