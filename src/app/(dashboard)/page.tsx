import { EnergyMonitor } from "@/components/dashboard/EnergyMonitor";
import { SensorDashboard } from "@/components/dashboard/SensorDashboard";
import { NetworkResilience } from "@/components/dashboard/NetworkResilience";
import { AlertValidationSystem } from "@/components/dashboard/AlertValidationSystem";
import { FinancialOverview } from "@/components/dashboard/FinancialOverview";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function Dashboard() {
  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8 max-w-[1600px] mx-auto">
      {/* Welcome/Status Banner */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-accent text-xs font-bold tracking-widest uppercase mb-1">DASHBOARD_OVERVIEW_v2.4</p>
          <h1 className="text-4xl font-bold font-headline tracking-tighter">TERMINAL OVERVIEW</h1>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-muted-foreground uppercase mb-1">System Time (UTC)</p>
          <p className="text-xl font-mono font-bold tracking-widest">{new Date().toLocaleTimeString()}</p>
        </div>
      </div>

      {/* Top Row: Core Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <EnergyMonitor />
        <NetworkResilience />
        <FinancialOverview />
      </div>

      {/* Middle Row: Geospatial & Visuals */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 cyber-panel relative h-[450px] rounded-xl overflow-hidden group">
          <div className="absolute inset-0 z-0">
            <Image 
              src="https://picsum.photos/seed/ayma-city/1200/800" 
              alt="City Masterplan" 
              fill 
              className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
              data-ai-hint="city map"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
          
          <div className="absolute top-6 left-6 z-20 space-y-2">
            <Badge className="bg-primary/80 hover:bg-primary backdrop-blur-sm border-none">GEOSPATIAL MASTERPLAN</Badge>
            <div className="p-3 cyber-panel bg-black/40 text-xs space-y-1">
              <p className="font-mono flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                LAT: 30.0444° N
              </p>
              <p className="font-mono flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                LNG: 31.2357° E
              </p>
            </div>
          </div>
          
          {/* Fake UI Overlays on map */}
          <div className="absolute top-1/4 right-1/4 h-12 w-12 border-2 border-primary rounded-full animate-ping opacity-30 z-20" />
          <div className="absolute bottom-1/3 left-1/3 h-8 w-8 border-2 border-accent rounded-full animate-pulse opacity-50 z-20" />
          
          <div className="absolute bottom-6 left-6 right-6 z-20 flex items-center justify-between">
            <div className="flex gap-4">
              <div className="px-4 py-2 cyber-panel bg-black/60">
                <p className="text-[10px] text-muted-foreground uppercase">Active Nodes</p>
                <p className="text-xl font-bold font-headline">142/150</p>
              </div>
              <div className="px-4 py-2 cyber-panel bg-black/60">
                <p className="text-[10px] text-muted-foreground uppercase">Grid Health</p>
                <p className="text-xl font-bold font-headline text-accent">99.4%</p>
              </div>
            </div>
            <div className="px-4 py-2 cyber-panel bg-primary/20 border-primary/40">
              <p className="text-[10px] text-primary font-bold uppercase">System Status</p>
              <p className="text-xl font-bold font-headline">NOMINAL</p>
            </div>
          </div>
        </div>
        
        <AlertValidationSystem />
      </div>

      {/* Bottom Row: Charts & Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12">
        <SensorDashboard />
        <div className="cyber-panel p-6">
          <h3 className="text-sm font-medium font-headline tracking-wider flex items-center gap-2 mb-6">
            <div className="h-2 w-2 rounded-full bg-accent" />
            SYSTEM AUDIT LOG
          </h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-start justify-between py-2 border-b border-border/50 last:border-0">
                <div className="flex gap-4">
                  <span className="text-[10px] font-mono text-muted-foreground">0{i}:12:44</span>
                  <div>
                    <p className="text-xs font-medium">Node-124 Link Handshake Complete</p>
                    <p className="text-[10px] text-muted-foreground">Sub-protocol: P2P LIFI MESH-B</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-[9px] border-accent/20 text-accent">SUCCESS</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
