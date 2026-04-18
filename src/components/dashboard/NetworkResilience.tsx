
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Wifi, Radio, SignalHigh, AlertCircle, RefreshCw } from "lucide-react";
import { MOCK_NETWORK_STATUS } from "@/lib/mock-data";
import { useState } from "react";

export function NetworkResilience() {
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSimulateFailover = () => {
    setIsSimulating(true);
    setTimeout(() => setIsSimulating(false), 3000);
  };

  return (
    <Card className="cyber-panel">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium font-headline tracking-wider flex items-center gap-2">
          <Share2 className="h-4 w-4 text-primary" />
          HYBRID NETWORK RESILIENCE
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative mt-4 mb-6 h-32 flex items-center justify-around overflow-hidden rounded-lg bg-background/50 border border-border/50">
          {/* Visual link lines */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          
          <div className="relative z-10 flex flex-col items-center gap-2">
            <div className={`p-3 rounded-full ${MOCK_NETWORK_STATUS.cellular === 'online' ? 'bg-primary/20' : 'bg-destructive/20'}`}>
              <SignalHigh className={`h-6 w-6 ${MOCK_NETWORK_STATUS.cellular === 'online' ? 'text-primary' : 'text-destructive'}`} />
            </div>
            <span className="text-[10px] uppercase font-medium">Cellular</span>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-2">
            <div className={`p-3 rounded-full ${MOCK_NETWORK_STATUS.lifi === 'online' ? 'bg-accent/20' : 'bg-destructive/20'}`}>
              <Wifi className={`h-6 w-6 ${MOCK_NETWORK_STATUS.lifi === 'online' ? 'text-accent' : 'text-destructive'}`} />
            </div>
            <span className="text-[10px] uppercase font-medium">P2P Li-Fi</span>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-2">
            <div className={`p-3 rounded-full ${MOCK_NETWORK_STATUS.hfEmergency === 'standby' ? 'bg-warning/20' : 'bg-muted'}`}>
              <Radio className={`h-6 w-6 ${MOCK_NETWORK_STATUS.hfEmergency === 'standby' ? 'text-warning' : 'text-muted-foreground'}`} />
            </div>
            <span className="text-[10px] uppercase font-medium">HF Link</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs border-b border-border/50 pb-2">
            <span className="text-muted-foreground">Primary Path</span>
            <span className="text-accent font-medium">LIFI-MESH-01</span>
          </div>
          <div className="flex items-center justify-between text-xs border-b border-border/50 pb-2">
            <span className="text-muted-foreground">Signal Quality</span>
            <span className="text-primary font-medium">98% Nominal</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Failover Ready</span>
            <span className="text-warning font-medium italic">ACTIVE STANDBY</span>
          </div>
        </div>

        <Button 
          variant="outline" 
          className="w-full mt-6 border-primary/30 hover:border-primary hover:bg-primary/10 text-xs font-headline group"
          onClick={handleSimulateFailover}
          disabled={isSimulating}
        >
          {isSimulating ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              SIMULATING FAILOVER...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
              TRIGGER FAILOVER SIMULATION
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
