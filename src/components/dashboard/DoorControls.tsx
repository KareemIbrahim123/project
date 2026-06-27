"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DoorClosed, DoorOpen, Lock, Unlock, ShieldAlert } from "lucide-react";
import { useCyberToast } from "@/components/CyberToast";

const DOORS_BY_FLOOR = {
  1: [
    { id: "D1-A", name: "Main Loading Dock", locked: true, open: false },
    { id: "D1-B", name: "Material Intake Gate", locked: false, open: true },
    { id: "D1-C", name: "Heavy Machinery Airlock", locked: true, open: false },
  ],
  2: [
    { id: "D2-A", name: "Personnel Entrance", locked: false, open: false },
    { id: "D2-B", name: "Cleanroom Airlock", locked: true, open: false },
  ],
  3: [
    { id: "D3-A", name: "Server Vault Alpha", locked: true, open: false },
    { id: "D3-B", name: "Control Room Access", locked: true, open: false },
    { id: "D3-C", name: "Roof Access Stairwell", locked: true, open: false },
  ]
};

export function DoorControls({ floor }: { floor: 1 | 2 | 3 }) {
  const [doors, setDoors] = useState(DOORS_BY_FLOOR[floor]);
  const toast = useCyberToast();

  useEffect(() => {
    setDoors(DOORS_BY_FLOOR[floor]);
  }, [floor]);

  const handleToggleLock = (id: string, currentlyLocked: boolean) => {
    toast(currentlyLocked ? `Unlocking door ${id}...` : `Locking door ${id}...`, "warning");
    setTimeout(() => {
      setDoors(prev => prev.map(d => d.id === id ? { ...d, locked: !currentlyLocked } : d));
      toast(`Door ${id} security state updated.`, "success");
    }, 1000);
  };

  const handleToggleOpen = (id: string, currentlyOpen: boolean, isLocked: boolean) => {
    if (isLocked) {
      toast(`Cannot open door ${id}. Security lock is engaged.`, "error");
      return;
    }
    toast(currentlyOpen ? `Closing door ${id}...` : `Opening door ${id}...`, "info");
    setTimeout(() => {
      setDoors(prev => prev.map(d => d.id === id ? { ...d, open: !currentlyOpen } : d));
      toast(`Door ${id} physical state updated.`, "success");
    }, 1500);
  };

  if (doors.length === 0) return null;

  return (
    <Card className="cyber-panel h-full">
      <CardHeader className="pb-4 border-b border-border/30">
        <CardTitle className="text-sm font-medium font-headline tracking-wider flex items-center gap-2">
          <ShieldAlert className="h-4 w-4 text-warning" />
          ACCESS & SECURITY GATES
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border/30">
          {doors.map((door) => (
            <div key={door.id} className="p-4 sm:p-6 hover:bg-white/5 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-sm">{door.name}</h4>
                  {door.locked && <Lock className="h-3 w-3 text-warning" />}
                </div>
                <p className="text-[10px] text-muted-foreground font-mono">ID: {door.id} | SECTOR: F{floor}</p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex flex-col gap-1 items-end mr-4">
                  <Badge 
                    variant="outline" 
                    className={`text-[8px] uppercase tracking-wider ${door.locked ? "border-warning/50 text-warning" : "border-primary/50 text-primary"}`}
                  >
                    {door.locked ? "LOCKED" : "UNLOCKED"}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className={`text-[8px] uppercase tracking-wider ${door.open ? "border-accent/50 text-accent" : "border-muted-foreground/50 text-muted-foreground"}`}
                  >
                    {door.open ? "OPEN" : "CLOSED"}
                  </Badge>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleToggleLock(door.id, door.locked)}
                    className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded border text-[9px] font-bold tracking-widest transition-colors ${
                      door.locked 
                        ? "border-primary/30 text-primary hover:bg-primary/10" 
                        : "border-warning/30 text-warning hover:bg-warning/10"
                    }`}
                  >
                    {door.locked ? <Unlock className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
                    {door.locked ? "UNLOCK" : "LOCK"}
                  </button>
                  <button
                    onClick={() => handleToggleOpen(door.id, door.open, door.locked)}
                    className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded border text-[9px] font-bold tracking-widest transition-colors ${
                      door.open 
                        ? "border-muted-foreground/30 text-muted-foreground hover:bg-white/5" 
                        : "border-accent/30 text-accent hover:bg-accent/10"
                    }`}
                  >
                    {door.open ? <DoorClosed className="h-3 w-3" /> : <DoorOpen className="h-3 w-3" />}
                    {door.open ? "CLOSE" : "OPEN"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
