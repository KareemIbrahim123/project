"use client";

import { useState } from "react";
import { Settings2, Bell, Monitor, Shield, HardDrive, ToggleLeft, ToggleRight } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [dataSync, setDataSync] = useState(true);

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto w-full space-y-6">
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
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-primary/10 border border-primary/30 text-primary rounded-md text-xs font-mono text-left font-bold transition-colors">
            <Monitor className="h-4 w-4" /> PREFERENCES
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/20 border border-transparent hover:border-border/50 text-muted-foreground hover:text-foreground rounded-md text-xs font-mono text-left transition-colors">
            <Shield className="h-4 w-4" /> SECURITY
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/20 border border-transparent hover:border-border/50 text-muted-foreground hover:text-foreground rounded-md text-xs font-mono text-left transition-colors">
            <HardDrive className="h-4 w-4" /> DATA MANAGEMENT
          </button>
        </div>

        {/* Settings Content */}
        <div className="cyber-panel p-6 rounded-xl border border-border/50 md:col-span-3 h-fit">
          <div className="flex items-center gap-3 mb-6 border-b border-border/50 pb-4">
            <Settings2 className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-bold font-headline">GLOBAL PREFERENCES</h2>
          </div>

          <div className="space-y-6">
            {/* Setting Item */}
            <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border/50">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  <h3 className="font-headline font-bold text-sm tracking-wider">SYSTEM NOTIFICATIONS</h3>
                </div>
                <p className="text-xs text-muted-foreground font-mono">Receive real-time alerts for system anomalies.</p>
              </div>
              <button onClick={() => setNotifications(!notifications)} className="text-primary hover:opacity-80 transition-opacity">
                {notifications ? <ToggleRight className="h-8 w-8" /> : <ToggleLeft className="h-8 w-8 text-muted-foreground" />}
              </button>
            </div>

            {/* Setting Item */}
            <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border/50">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Monitor className="h-4 w-4 text-muted-foreground" />
                  <h3 className="font-headline font-bold text-sm tracking-wider">DARK PROTOCOL</h3>
                </div>
                <p className="text-xs text-muted-foreground font-mono">Force dark mode rendering for the interface.</p>
              </div>
              <button onClick={() => setDarkMode(!darkMode)} className="text-primary hover:opacity-80 transition-opacity">
                {darkMode ? <ToggleRight className="h-8 w-8" /> : <ToggleLeft className="h-8 w-8 text-muted-foreground" />}
              </button>
            </div>

            {/* Setting Item */}
            <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border/50">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <HardDrive className="h-4 w-4 text-muted-foreground" />
                  <h3 className="font-headline font-bold text-sm tracking-wider">AUTO-SYNC CACHE</h3>
                </div>
                <p className="text-xs text-muted-foreground font-mono">Automatically backup factory data to cloud storage.</p>
              </div>
              <button onClick={() => setDataSync(!dataSync)} className="text-primary hover:opacity-80 transition-opacity">
                {dataSync ? <ToggleRight className="h-8 w-8" /> : <ToggleLeft className="h-8 w-8 text-muted-foreground" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
