"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertOctagon, AlertTriangle } from "lucide-react";
import { useCyberToast } from "@/components/CyberToast";

export function EmergencyStop() {
  const [isArmed, setIsArmed] = useState(false);
  const [isTriggered, setIsTriggered] = useState(false);
  const toast = useCyberToast();

  const handleArm = () => {
    setIsArmed(!isArmed);
    if (!isArmed) {
      toast("E-STOP Armed. System is ready to halt.", "warning");
    } else {
      toast("E-STOP Disarmed.", "info");
    }
  };

  const handleTrigger = () => {
    if (!isArmed) return;
    setIsTriggered(true);
    toast("CRITICAL: GLOBAL E-STOP INITIATED. ALL MACHINERY HALTED.", "destructive");
  };

  return (
    <Card className={`cyber-panel col-span-1 border-2 transition-all duration-500 ${isTriggered ? 'border-destructive bg-destructive/10 animate-pulse' : isArmed ? 'border-warning/50' : 'border-border/30'}`}>
      <CardHeader className="pb-2">
        <CardTitle className={`text-sm font-medium font-headline tracking-wider flex items-center gap-2 ${isTriggered ? 'text-destructive' : 'text-muted-foreground'}`}>
          <AlertOctagon className="h-5 w-5" />
          GLOBAL EMERGENCY OVERRIDE
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center p-6 sm:p-8">
        {!isTriggered ? (
          <>
            <div className="flex items-center gap-4 mb-8 w-full justify-center">
              <span className={`text-[10px] font-mono font-bold tracking-widest ${isArmed ? 'text-warning' : 'text-muted-foreground'}`}>
                {isArmed ? 'ARMED & READY' : 'SAFETY LOCK ENGAGED'}
              </span>
              <button
                onClick={handleArm}
                className={`w-12 h-6 rounded-full p-1 transition-colors relative ${isArmed ? 'bg-warning' : 'bg-muted'}`}
              >
                <div className={`w-4 h-4 bg-background rounded-full transition-transform ${isArmed ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
            
            <button
              disabled={!isArmed}
              onClick={handleTrigger}
              className={`
                h-48 w-48 sm:h-56 sm:w-56 rounded-full border-8 shadow-2xl flex flex-col items-center justify-center gap-2 transition-all duration-300
                ${isArmed 
                  ? 'border-destructive/80 bg-destructive/20 hover:bg-destructive/40 hover:scale-105 cursor-pointer shadow-[0_0_50px_rgba(255,0,0,0.4)]' 
                  : 'border-muted bg-muted/20 opacity-50 cursor-not-allowed'
                }
              `}
            >
              <AlertOctagon className={`h-16 w-16 ${isArmed ? 'text-destructive animate-pulse' : 'text-muted-foreground'}`} />
              <span className={`text-2xl font-black tracking-tighter ${isArmed ? 'text-destructive' : 'text-muted-foreground'}`}>E-STOP</span>
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center text-center space-y-6 py-8">
            <AlertTriangle className="h-24 w-24 text-destructive animate-bounce" />
            <div>
              <h2 className="text-3xl font-black text-destructive tracking-tighter mb-2">SYSTEM HALTED</h2>
              <p className="text-muted-foreground font-mono text-sm max-w-md mx-auto">
                Global emergency stop has been activated. All physical assets are locked in safe mode. Physical manual reset required.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
