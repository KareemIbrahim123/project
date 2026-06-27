"use client";

import { MachineControls } from "@/components/dashboard/MachineControls";
import { EnvironmentControls } from "@/components/dashboard/EnvironmentControls";
import { EmergencyStop } from "@/components/dashboard/EmergencyStop";
import { motion } from "framer-motion";
import { ShieldAlert } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function ControlPanelPage() {
  return (
    <motion.div 
      variants={container} 
      initial="hidden" 
      animate="show" 
      className="p-4 md:p-8 space-y-6 md:space-y-8 max-w-[1600px] mx-auto pb-24"
    >
      <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-destructive text-xs font-bold tracking-widest uppercase mb-1 flex items-center gap-1">
            <ShieldAlert className="h-3 w-3" />
            TIER 2 CLEARANCE ACTIVE
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline tracking-tighter">FACTORY CONTROL PANEL</h1>
        </div>
        <div className="bg-destructive/10 border border-destructive/30 px-3 py-1.5 rounded-md">
          <p className="text-[10px] text-destructive font-bold uppercase tracking-wider">LIVE OVERRIDE MODE</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={item} className="lg:col-span-2">
          <MachineControls />
        </motion.div>
        
        <motion.div variants={item} className="col-span-1">
          <EnvironmentControls />
        </motion.div>
      </div>

      <motion.div variants={item}>
        <EmergencyStop />
      </motion.div>
      
    </motion.div>
  );
}
