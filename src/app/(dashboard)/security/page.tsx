"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shield, AlertTriangle, CheckCircle2, XCircle, Lock, Eye, UserCheck, ShieldCheck, Clock, FileWarning } from "lucide-react";
import { useState } from "react";

const securityAlerts = [
  { id: 1, time: "10:44:22", severity: "critical", title: "Unauthorized access attempt - Sector Delta gateway", description: "Multiple failed authentication attempts detected from unknown IP range. Geo-location: external.", status: "active" },
  { id: 2, time: "10:38:15", severity: "warning", title: "Certificate expiry warning - Node N-089", description: "TLS certificate for mesh communication expires in 72 hours. Auto-renewal scheduled.", status: "acknowledged" },
  { id: 3, time: "10:22:01", severity: "info", title: "Routine key rotation completed - Vault cluster", description: "256-bit AES keys successfully rotated across all 8 vault nodes. Zero downtime achieved.", status: "resolved" },
  { id: 4, time: "09:55:44", severity: "critical", title: "Anomalous traffic pattern - Li-Fi mesh segment", description: "348% spike in data transmission on LIFI-MESH-03. Pattern does not match known operational profiles.", status: "investigating" },
  { id: 5, time: "09:41:33", severity: "warning", title: "Firmware version mismatch - 3 sensor nodes", description: "Nodes N-037, N-041, N-078 running firmware v2.1.3 (latest: v2.2.0). Security patches pending.", status: "acknowledged" },
  { id: 6, time: "09:12:18", severity: "info", title: "Admin session started - CITY ADMIN (Tier 1)", description: "Successful authentication via 2FA. Session token issued for 8-hour window.", status: "resolved" },
  { id: 7, time: "08:58:07", severity: "warning", title: "Backup integrity check failed - Archive node", description: "CRC mismatch on 2 of 847 backup blocks in VAULT-007. Re-sync initiated.", status: "investigating" },
  { id: 8, time: "08:30:00", severity: "info", title: "Daily security scan completed", description: "Full infrastructure scan complete. 0 critical, 3 warnings, 142 nodes healthy.", status: "resolved" },
];

const complianceItems = [
  { name: "Encryption at Rest", status: true, detail: "AES-256" },
  { name: "Encryption in Transit", status: true, detail: "TLS 1.3" },
  { name: "2FA Authentication", status: true, detail: "Enforced" },
  { name: "Key Rotation", status: true, detail: "Every 24h" },
  { name: "Audit Logging", status: true, detail: "Real-time" },
  { name: "Intrusion Detection", status: true, detail: "Active" },
  { name: "Firmware Updates", status: false, detail: "3 pending" },
  { name: "Backup Verification", status: false, detail: "1 failed" },
];

const auditLog = [
  { time: "10:44:22", user: "SYSTEM", action: "BLOCK_IP", target: "203.0.113.0/24", result: "ENFORCED" },
  { time: "10:38:15", user: "SYSTEM", action: "CERT_WARN", target: "N-089.mesh.local", result: "ALERTED" },
  { time: "10:22:01", user: "AUTO-ROTATE", action: "KEY_ROTATE", target: "vault-cluster/*", result: "SUCCESS" },
  { time: "09:55:44", user: "IDS", action: "FLAG_ANOMALY", target: "LIFI-MESH-03", result: "INVESTIGATING" },
  { time: "09:41:33", user: "SYSTEM", action: "FW_CHECK", target: "N-037,N-041,N-078", result: "OUTDATED" },
  { time: "09:12:18", user: "CITY ADMIN", action: "LOGIN", target: "dashboard.ayma.os", result: "GRANTED" },
  { time: "08:58:07", user: "SYSTEM", action: "BACKUP_CRC", target: "VAULT-007", result: "MISMATCH" },
  { time: "08:30:00", user: "SCANNER", action: "FULL_SCAN", target: "infrastructure/*", result: "CLEAN" },
];

export default function SecurityPage() {
  const [filter, setFilter] = useState<string>("all");

  const filteredAlerts = filter === "all" 
    ? securityAlerts 
    : securityAlerts.filter(a => a.severity === filter);

  const criticalCount = securityAlerts.filter(a => a.severity === "critical").length;
  const warningCount = securityAlerts.filter(a => a.severity === "warning").length;
  const resolvedCount = securityAlerts.filter(a => a.status === "resolved").length;

  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
      {/* Page Header */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-accent text-xs font-bold tracking-widest uppercase mb-1">MODULE_SECURITY_v4.0</p>
          <h1 className="text-4xl font-bold font-headline tracking-tighter">SECURITY AUDIT</h1>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="border-destructive/30 text-destructive animate-pulse">
            <AlertTriangle className="h-3 w-3 mr-1" />
            {criticalCount} CRITICAL
          </Badge>
          <Badge variant="outline" className="border-warning/30 text-warning">
            <FileWarning className="h-3 w-3 mr-1" />
            {warningCount} WARNINGS
          </Badge>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="cyber-panel">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <Shield className="h-5 w-5 text-accent" />
              <span className="text-[9px] text-muted-foreground uppercase">THREAT LEVEL</span>
            </div>
            <p className="text-2xl font-bold font-headline text-warning">ELEVATED</p>
            <p className="text-[10px] text-warning mt-1">2 ACTIVE THREATS</p>
          </CardContent>
        </Card>
        <Card className="cyber-panel">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <Lock className="h-5 w-5 text-primary" />
              <span className="text-[9px] text-muted-foreground uppercase">ENCRYPTION</span>
            </div>
            <p className="text-2xl font-bold font-headline">AES-256</p>
            <p className="text-[10px] text-accent mt-1">ALL CHANNELS SECURED</p>
          </CardContent>
        </Card>
        <Card className="cyber-panel">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <Eye className="h-5 w-5 text-accent" />
              <span className="text-[9px] text-muted-foreground uppercase">IDS STATUS</span>
            </div>
            <p className="text-2xl font-bold font-headline">ACTIVE</p>
            <p className="text-[10px] text-accent mt-1">142 NODES MONITORED</p>
          </CardContent>
        </Card>
        <Card className="cyber-panel">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <UserCheck className="h-5 w-5 text-primary" />
              <span className="text-[9px] text-muted-foreground uppercase">ACTIVE SESSIONS</span>
            </div>
            <p className="text-2xl font-bold font-headline">1</p>
            <p className="text-[10px] text-primary mt-1">CITY ADMIN (TIER 1)</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Security Alerts */}
        <div className="lg:col-span-2">
          <Card className="cyber-panel">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium font-headline tracking-wider flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                  SECURITY EVENT FEED
                </CardTitle>
                <div className="flex gap-1">
                  {["all", "critical", "warning", "info"].map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`px-2 py-1 text-[9px] font-headline rounded uppercase transition-colors ${
                        filter === f 
                          ? "bg-primary/20 text-primary border border-primary/30" 
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                <div className="space-y-3 pr-4">
                  {filteredAlerts.map((alert) => (
                    <div 
                      key={alert.id} 
                      className={`p-4 rounded-lg border transition-colors ${
                        alert.severity === "critical" ? "border-destructive/30 bg-destructive/5 hover:bg-destructive/10" :
                        alert.severity === "warning" ? "border-warning/30 bg-warning/5 hover:bg-warning/10" :
                        "border-border/30 bg-background/30 hover:bg-background/50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-[10px] font-mono text-muted-foreground">{alert.time}</span>
                          <Badge variant="outline" className={`text-[8px] ${
                            alert.severity === "critical" ? "border-destructive/30 text-destructive" :
                            alert.severity === "warning" ? "border-warning/30 text-warning" :
                            "border-accent/30 text-accent"
                          }`}>
                            {alert.severity.toUpperCase()}
                          </Badge>
                        </div>
                        <Badge variant="outline" className={`text-[8px] ${
                          alert.status === "active" ? "border-destructive/30 text-destructive animate-pulse" :
                          alert.status === "investigating" ? "border-warning/30 text-warning" :
                          alert.status === "acknowledged" ? "border-primary/30 text-primary" :
                          "border-accent/30 text-accent"
                        }`}>
                          {alert.status.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-xs font-bold mb-1">{alert.title}</p>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">{alert.description}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-4">
          {/* Compliance */}
          <Card className="cyber-panel">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium font-headline tracking-wider flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-accent" />
                COMPLIANCE STATUS
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {complianceItems.map((item) => (
                <div key={item.name} className="flex items-center justify-between py-1.5 border-b border-border/20 last:border-0">
                  <div className="flex items-center gap-2">
                    {item.status 
                      ? <CheckCircle2 className="h-3 w-3 text-accent" /> 
                      : <XCircle className="h-3 w-3 text-warning" />
                    }
                    <span className="text-[11px]">{item.name}</span>
                  </div>
                  <span className={`text-[9px] font-mono ${item.status ? "text-accent" : "text-warning"}`}>
                    {item.detail}
                  </span>
                </div>
              ))}
              <div className="pt-2 mt-2 border-t border-border/30">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-headline">OVERALL SCORE</span>
                  <span className="text-sm font-bold text-accent font-headline">75%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Audit Log */}
          <Card className="cyber-panel">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium font-headline tracking-wider flex items-center gap-2">
                <FileWarning className="h-4 w-4 text-primary" />
                AUDIT TRAIL
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[280px]">
                <div className="space-y-2 pr-2">
                  {auditLog.map((entry, i) => (
                    <div key={i} className="py-2 border-b border-border/20 last:border-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[9px] font-mono text-muted-foreground">{entry.time}</span>
                        <Badge variant="outline" className={`text-[7px] ${
                          entry.result === "SUCCESS" || entry.result === "GRANTED" || entry.result === "CLEAN" || entry.result === "ENFORCED" 
                            ? "border-accent/30 text-accent" 
                            : entry.result === "INVESTIGATING" || entry.result === "ALERTED"
                            ? "border-warning/30 text-warning"
                            : "border-destructive/30 text-destructive"
                        }`}>
                          {entry.result}
                        </Badge>
                      </div>
                      <p className="text-[10px] font-mono">
                        <span className="text-primary">{entry.user}</span>
                        <span className="text-muted-foreground"> → </span>
                        <span>{entry.action}</span>
                      </p>
                      <p className="text-[9px] text-muted-foreground truncate">{entry.target}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
