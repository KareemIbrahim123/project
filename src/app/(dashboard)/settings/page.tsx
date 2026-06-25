"use client";

import { useState } from "react";
import { Settings2, Bell, Monitor, Shield, HardDrive, ToggleLeft, ToggleRight, Loader2, Database, Key, Clock, AlertCircle, FileWarning, Trash2 } from "lucide-react";
import Link from "next/link";
import { useSettings } from "@/components/SettingsContext";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";

type Tab = "preferences" | "security" | "data";

export default function SettingsPage() {
  const { notifications, darkMode, dataSync, updateSetting } = useSettings();
  
  const [activeTab, setActiveTab] = useState<Tab>("preferences");
  
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncLog, setSyncLog] = useState<string[]>([]);
  
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [firewallStrict, setFirewallStrict] = useState(true);

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto w-full space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold font-headline tracking-tighter">SYSTEM SETTINGS</h1>
          <p className="text-muted-foreground text-xs uppercase tracking-widest font-mono mt-1">Configure Environment Parameters</p>
        </div>
        <Link 
          href="/profile"
          className="bg-muted/20 border border-border/50 hover:bg-muted/40 transition-colors px-4 py-2 rounded-md text-xs font-mono font-bold"
        >
          ← RETURN TO PROFILE
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="md:col-span-1 space-y-2">
          <button 
            onClick={() => setActiveTab("preferences")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-xs font-mono text-left font-bold transition-colors border ${activeTab === 'preferences' ? 'bg-primary/10 border-primary/30 text-primary' : 'border-transparent hover:bg-muted/20 hover:border-border/50 text-muted-foreground hover:text-foreground'}`}
          >
            <Monitor className="h-4 w-4" /> PREFERENCES
          </button>
          <button 
            onClick={() => setActiveTab("security")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-xs font-mono text-left font-bold transition-colors border ${activeTab === 'security' ? 'bg-primary/10 border-primary/30 text-primary' : 'border-transparent hover:bg-muted/20 hover:border-border/50 text-muted-foreground hover:text-foreground'}`}
          >
            <Shield className="h-4 w-4" /> SECURITY
          </button>
          <button 
            onClick={() => setActiveTab("data")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-xs font-mono text-left font-bold transition-colors border ${activeTab === 'data' ? 'bg-primary/10 border-primary/30 text-primary' : 'border-transparent hover:bg-muted/20 hover:border-border/50 text-muted-foreground hover:text-foreground'}`}
          >
            <HardDrive className="h-4 w-4" /> DATA MANAGEMENT
          </button>
        </div>

        {/* Settings Content Container */}
        <div className="cyber-panel rounded-xl border border-border/50 md:col-span-3 h-fit overflow-hidden">
          <AnimatePresence mode="wait">
            
            {/* ---------------- PREFERENCES TAB ---------------- */}
            {activeTab === "preferences" && (
              <motion.div 
                key="preferences"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-6"
              >
                <div className="flex items-center gap-3 mb-6 border-b border-border/50 pb-4">
                  <Settings2 className="h-6 w-6 text-primary" />
                  <h2 className="text-xl font-bold font-headline">GLOBAL PREFERENCES</h2>
                </div>

                <div className="space-y-6">
                  {/* Notifications */}
                  <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border/50">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-muted-foreground" />
                        <h3 className="font-headline font-bold text-sm tracking-wider">SYSTEM NOTIFICATIONS</h3>
                      </div>
                      <p className="text-xs text-muted-foreground font-mono">Receive real-time alerts for system anomalies.</p>
                    </div>
                    <button onClick={() => updateSetting("notifications", !notifications)} className="text-primary hover:opacity-80 transition-opacity">
                      {notifications ? <ToggleRight className="h-8 w-8" /> : <ToggleLeft className="h-8 w-8 text-muted-foreground" />}
                    </button>
                  </div>

                  {/* Dark Mode */}
                  <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border/50">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Monitor className="h-4 w-4 text-muted-foreground" />
                        <h3 className="font-headline font-bold text-sm tracking-wider">DARK PROTOCOL</h3>
                      </div>
                      <p className="text-xs text-muted-foreground font-mono">Force dark mode rendering for the interface.</p>
                    </div>
                    <button onClick={() => updateSetting("darkMode", !darkMode)} className="text-primary hover:opacity-80 transition-opacity">
                      {darkMode ? <ToggleRight className="h-8 w-8" /> : <ToggleLeft className="h-8 w-8 text-muted-foreground" />}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}


            {/* ---------------- SECURITY TAB ---------------- */}
            {activeTab === "security" && (
              <motion.div 
                key="security"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-6"
              >
                <div className="flex items-center gap-3 mb-6 border-b border-border/50 pb-4">
                  <Shield className="h-6 w-6 text-primary" />
                  <h2 className="text-xl font-bold font-headline">ACCESS & SECURITY</h2>
                </div>

                <div className="space-y-6">
                  {/* MFA */}
                  <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border/50">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Key className="h-4 w-4 text-muted-foreground" />
                        <h3 className="font-headline font-bold text-sm tracking-wider">MULTI-FACTOR AUTH (MFA)</h3>
                      </div>
                      <p className="text-xs text-muted-foreground font-mono">Require biometric or token confirmation for login.</p>
                    </div>
                    <button onClick={() => setMfaEnabled(!mfaEnabled)} className="text-primary hover:opacity-80 transition-opacity">
                      {mfaEnabled ? <ToggleRight className="h-8 w-8" /> : <ToggleLeft className="h-8 w-8 text-muted-foreground" />}
                    </button>
                  </div>

                  {/* Firewall */}
                  <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border/50">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-muted-foreground" />
                        <h3 className="font-headline font-bold text-sm tracking-wider">STRICT INGRESS FIREWALL</h3>
                      </div>
                      <p className="text-xs text-muted-foreground font-mono">Block all non-whitelisted IP addresses globally.</p>
                    </div>
                    <button onClick={() => setFirewallStrict(!firewallStrict)} className="text-primary hover:opacity-80 transition-opacity">
                      {firewallStrict ? <ToggleRight className="h-8 w-8" /> : <ToggleLeft className="h-8 w-8 text-muted-foreground" />}
                    </button>
                  </div>

                  {/* Access Logs */}
                  <div className="p-4 bg-background/50 rounded-lg border border-border/50">
                    <div className="flex items-center gap-2 mb-4">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <h3 className="font-headline font-bold text-sm tracking-wider">RECENT ACCESS LOGS</h3>
                    </div>
                    <div className="space-y-3 font-mono text-[10px]">
                      <div className="flex justify-between border-b border-border/30 pb-2">
                        <span className="text-muted-foreground">14:02:44 UTC</span>
                        <span>192.168.1.104</span>
                        <span className="text-primary">SUCCESS (ROOT)</span>
                      </div>
                      <div className="flex justify-between border-b border-border/30 pb-2">
                        <span className="text-muted-foreground">11:15:01 UTC</span>
                        <span>45.22.19.10</span>
                        <span className="text-destructive">BLOCKED (GEO)</span>
                      </div>
                      <div className="flex justify-between pb-1">
                        <span className="text-muted-foreground">08:44:12 UTC</span>
                        <span>10.0.0.15</span>
                        <span className="text-primary">SUCCESS (API)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}


            {/* ---------------- DATA MANAGEMENT TAB ---------------- */}
            {activeTab === "data" && (
              <motion.div 
                key="data"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-6"
              >
                <div className="flex items-center gap-3 mb-6 border-b border-border/50 pb-4">
                  <HardDrive className="h-6 w-6 text-primary" />
                  <h2 className="text-xl font-bold font-headline">DATA & CACHE MANAGEMENT</h2>
                </div>

                <div className="space-y-6">
                  {/* Storage Bar */}
                  <div className="p-4 bg-background/50 rounded-lg border border-border/50 space-y-4">
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4 text-muted-foreground" />
                      <h3 className="font-headline font-bold text-sm tracking-wider">LOCAL STORAGE POOL</h3>
                    </div>
                    <Progress value={68} className="h-2" />
                    <div className="flex justify-between text-[10px] font-mono text-muted-foreground uppercase">
                      <span>Telemetry: 14.2 GB</span>
                      <span>Backups: 4.1 GB</span>
                      <span>Free: 8.5 GB</span>
                    </div>
                  </div>

                  {/* Auto Sync */}
                  <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border/50">
                    <div className="space-y-1">
                      <h3 className="font-headline font-bold text-sm tracking-wider">AUTO-SYNC CACHE</h3>
                      <p className="text-xs text-muted-foreground font-mono">Automatically backup factory data to cloud storage.</p>
                    </div>
                    <button onClick={() => updateSetting("dataSync", !dataSync)} className="text-primary hover:opacity-80 transition-opacity">
                      {dataSync ? <ToggleRight className="h-8 w-8" /> : <ToggleLeft className="h-8 w-8 text-muted-foreground" />}
                    </button>
                  </div>

                  {/* Manual Sync Trigger */}
                  <div className="flex flex-col gap-4 p-4 bg-background/50 rounded-lg border border-border/50">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h3 className="font-headline font-bold text-sm tracking-wider">MANUAL CACHE OVERRIDE</h3>
                        <p className="text-xs text-muted-foreground font-mono">Force immediate synchronization with central mainframe.</p>
                      </div>
                      <button 
                        onClick={() => {
                          if (isSyncing) return;
                          setIsSyncing(true);
                          setSyncLog(["[SYS] Initiating manual override..."]);
                          setTimeout(() => setSyncLog(prev => [...prev, "[NET] Establishing handshake with Mainframe..."]), 800);
                          setTimeout(() => setSyncLog(prev => [...prev, "[SEC] Encryption key verified."]), 1500);
                          setTimeout(() => setSyncLog(prev => [...prev, "[DAT] Compressing node telemetry (14.2MB)..."]), 2200);
                          setTimeout(() => setSyncLog(prev => [...prev, "[SYS] Sync complete. Connection terminated."]), 3500);
                          setTimeout(() => { setIsSyncing(false); setSyncLog([]); }, 5000);
                        }}
                        disabled={isSyncing}
                        className="bg-primary/20 hover:bg-primary/40 text-primary border border-primary/50 transition-colors px-4 py-2 rounded-md text-xs font-mono font-bold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSyncing ? <><Loader2 className="h-3 w-3 animate-spin" /> SYNCING</> : "SYNC NOW"}
                      </button>
                    </div>
                    
                    <AnimatePresence>
                      {isSyncing && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="bg-black border border-border/50 rounded p-3 font-mono text-[10px] text-muted-foreground overflow-hidden"
                        >
                          {syncLog.map((log, i) => (
                            <motion.div 
                              key={i} 
                              initial={{ opacity: 0, x: -10 }} 
                              animate={{ opacity: 1, x: 0 }} 
                              className={log.includes("complete") ? "text-primary" : ""}
                            >
                              {log}
                            </motion.div>
                          ))}
                          <motion.div 
                            animate={{ opacity: [1, 0] }} 
                            transition={{ repeat: Infinity, duration: 0.8 }} 
                            className="inline-block w-2 h-3 bg-primary mt-1"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Purge Data */}
                  <div className="flex items-center justify-between p-4 bg-destructive/10 rounded-lg border border-destructive/30">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <FileWarning className="h-4 w-4 text-destructive" />
                        <h3 className="font-headline font-bold text-sm tracking-wider text-destructive">PURGE LOCAL CACHE</h3>
                      </div>
                      <p className="text-xs text-muted-foreground font-mono">Irreversibly delete all un-synced telemetry data.</p>
                    </div>
                    <button 
                      onClick={() => alert("WARNING: Local cache purge protocol requires ROOT clearance.")}
                      className="bg-destructive/20 hover:bg-destructive text-destructive hover:text-white border border-destructive/50 transition-colors px-4 py-2 rounded-md text-xs font-mono font-bold flex items-center gap-2"
                    >
                      <Trash2 className="h-4 w-4" /> PURGE
                    </button>
                  </div>

                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
