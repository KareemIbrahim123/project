"use client";

import { EnergyMonitor } from "@/components/dashboard/EnergyMonitor";
import { SensorDashboard } from "@/components/dashboard/SensorDashboard";
import { NetworkResilience } from "@/components/dashboard/NetworkResilience";
import { AlertValidationSystem } from "@/components/dashboard/AlertValidationSystem";
import { FinancialOverview } from "@/components/dashboard/FinancialOverview";
import { EquipmentHealth } from "@/components/dashboard/EquipmentHealth";
import { ProductionLines } from "@/components/dashboard/ProductionLines";
import { OEEGauge } from "@/components/dashboard/OEEGauge";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function Dashboard() {
  return (
    <motion.div 
      variants={container} 
      initial="hidden" 
      animate="show" 
      className="p-4 md:p-8 space-y-6 md:space-y-8 max-w-[1600px] mx-auto"
    >
      {/* Welcome/Status Banner */}
      <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
        <div>
          <p className="text-accent text-xs font-bold tracking-widest uppercase mb-1">DASHBOARD_OVERVIEW_v3.0</p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline tracking-tighter">FACTORY COMMAND</h1>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-muted-foreground uppercase mb-1">System Time (UTC)</p>
          <p className="text-xl font-mono font-bold tracking-widest">{new Date().toLocaleTimeString()}</p>
        </div>
      </motion.div>

      {/* Top Row: Core Metrics */}
      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <EnergyMonitor />
        <NetworkResilience />
        <FinancialOverview />
      </motion.div>

      {/* Middle Row: OEE + Equipment Health */}
      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <OEEGauge />
        <div className="lg:col-span-2">
          <EquipmentHealth />
        </div>
      </motion.div>

      {/* Production + Alerts Row */}
      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <ProductionLines />
        </div>
        <AlertValidationSystem />
      </motion.div>

      {/* Bottom Row: Charts & Data */}
      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12">
        <SensorDashboard />
        <div className="cyber-panel p-6">
          <h3 className="text-sm font-medium font-headline tracking-wider flex items-center gap-2 mb-6">
            <div className="h-2 w-2 rounded-full bg-accent" />
            SYSTEM AUDIT LOG
          </h3>
          <div className="space-y-4">
            {[
              { time: "14:22:01", event: "CNC Mill-01 vibration check passed", protocol: "PREDICTIVE MAINTENANCE" },
              { time: "13:45:33", event: "Conveyor Line A scheduled downtime initiated", protocol: "MAINTENANCE WINDOW" },
              { time: "12:10:18", event: "Packaging Robot firmware update deployed", protocol: "OTA UPDATE v2.2.0" },
              { time: "11:32:44", event: "Air Compressor pressure normalized", protocol: "AUTO-CALIBRATION" },
              { time: "10:05:12", event: "Shift B production handover completed", protocol: "SHIFT PROTOCOL" },
            ].map((entry, i) => (
              <div key={i} className="flex items-start justify-between py-2 border-b border-border/50 last:border-0">
                <div className="flex gap-4">
                  <span className="text-[10px] font-mono text-muted-foreground">{entry.time}</span>
                  <div>
                    <p className="text-xs font-medium">{entry.event}</p>
                    <p className="text-[10px] text-muted-foreground">{entry.protocol}</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-[9px] border-accent/20 text-accent">SUCCESS</Badge>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
