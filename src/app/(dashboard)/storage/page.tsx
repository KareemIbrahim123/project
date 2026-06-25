"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Database, HardDrive, Server, Download, Upload, Clock, FolderOpen, FileText, RefreshCw } from "lucide-react";
import { useState } from "react";

const storageNodes = Array.from({ length: 8 }, (_, i) => ({
  id: `VAULT-${String(i + 1).padStart(3, "0")}`,
  type: i < 3 ? "Primary" : i < 6 ? "Replica" : "Archive",
  usedGB: Math.floor(20 + Math.random() * 60),
  totalGB: 100,
  records: Math.floor(10000 + Math.random() * 50000),
  lastSync: `${Math.floor(Math.random() * 59)}m ago`,
  status: Math.random() > 0.15 ? "online" : "syncing",
}));

const recentLogs = [
  { time: "10:42:11", action: "WRITE", target: "sensor_data/node_124", size: "2.4 KB", status: "success" },
  { time: "10:41:58", action: "READ", target: "alerts/validated_q2", size: "18.7 KB", status: "success" },
  { time: "10:41:32", action: "SYNC", target: "replica/vault-004", size: "1.2 MB", status: "success" },
  { time: "10:40:15", action: "WRITE", target: "energy/pv_readings", size: "840 B", status: "success" },
  { time: "10:39:44", action: "DELETE", target: "temp/cache_overflow", size: "4.1 MB", status: "success" },
  { time: "10:38:22", action: "ARCHIVE", target: "logs/may_2026", size: "234 MB", status: "pending" },
  { time: "10:37:01", action: "READ", target: "config/node_mapping", size: "1.1 KB", status: "success" },
  { time: "10:36:48", action: "WRITE", target: "network/mesh_status", size: "512 B", status: "success" },
];

export default function StoragePage() {
  const [syncing, setSyncing] = useState(false);
  const totalUsed = storageNodes.reduce((a, n) => a + n.usedGB, 0);
  const totalCapacity = storageNodes.reduce((a, n) => a + n.totalGB, 0);
  const totalRecords = storageNodes.reduce((a, n) => a + n.records, 0);

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8 max-w-[1600px] mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <div>
          <p className="text-accent text-xs font-bold tracking-widest uppercase mb-1">MODULE_STORAGE_v3.1</p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline tracking-tighter">STORAGE VAULT</h1>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="border-primary/30 hover:border-primary hover:bg-primary/10 text-xs font-headline"
          onClick={() => { setSyncing(true); setTimeout(() => setSyncing(false), 3000); }}
          disabled={syncing}
        >
          <RefreshCw className={`h-3 w-3 mr-2 ${syncing ? "animate-spin" : ""}`} />
          {syncing ? "SYNCING..." : "FORCE SYNC ALL"}
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="cyber-panel">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <HardDrive className="h-5 w-5 text-primary" />
              <span className="text-[9px] text-muted-foreground uppercase">TOTAL STORAGE</span>
            </div>
            <p className="text-2xl font-bold font-headline">{totalUsed} / {totalCapacity} GB</p>
            <Progress value={(totalUsed / totalCapacity) * 100} className="h-1.5 mt-2 bg-muted [&>div]:bg-primary" />
          </CardContent>
        </Card>
        <Card className="cyber-panel">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <FileText className="h-5 w-5 text-accent" />
              <span className="text-[9px] text-muted-foreground uppercase">TOTAL RECORDS</span>
            </div>
            <p className="text-2xl font-bold font-headline">{totalRecords.toLocaleString()}</p>
            <p className="text-[10px] text-accent mt-1">ACROSS {storageNodes.length} VAULTS</p>
          </CardContent>
        </Card>
        <Card className="cyber-panel">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <Upload className="h-5 w-5 text-primary" />
              <span className="text-[9px] text-muted-foreground uppercase">WRITE OPS/MIN</span>
            </div>
            <p className="text-2xl font-bold font-headline">1,247</p>
            <p className="text-[10px] text-primary mt-1">+12% FROM BASELINE</p>
          </CardContent>
        </Card>
        <Card className="cyber-panel">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <Download className="h-5 w-5 text-accent" />
              <span className="text-[9px] text-muted-foreground uppercase">READ OPS/MIN</span>
            </div>
            <p className="text-2xl font-bold font-headline">3,891</p>
            <p className="text-[10px] text-accent mt-1">AVG LATENCY: 3.2ms</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Storage Nodes */}
        <div className="lg:col-span-2">
          <Card className="cyber-panel">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium font-headline tracking-wider flex items-center gap-2">
                  <Server className="h-4 w-4 text-primary" />
                  VAULT NODE MATRIX
                </CardTitle>
                <Badge variant="outline" className="text-[9px] border-accent/20 text-accent">{storageNodes.length} ACTIVE</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {storageNodes.map((node) => (
                  <div key={node.id} className="p-4 rounded-lg border border-border/50 bg-background/30 hover:bg-background/50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Database className="h-4 w-4 text-primary" />
                        <span className="text-xs font-mono font-bold">{node.id}</span>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`text-[8px] ${node.status === "online" ? "border-accent/30 text-accent" : "border-warning/30 text-warning"}`}
                      >
                        {node.status === "online" ? "● ONLINE" : "◌ SYNCING"}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-muted-foreground">Storage</span>
                        <span>{node.usedGB}/{node.totalGB} GB</span>
                      </div>
                      <Progress value={(node.usedGB / node.totalGB) * 100} className="h-1 bg-muted [&>div]:bg-primary" />
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-muted-foreground">Records: {node.records.toLocaleString()}</span>
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {node.lastSync}
                        </span>
                      </div>
                      <Badge variant="outline" className="text-[8px] border-border/30 text-muted-foreground">{node.type}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* I/O Log */}
        <Card className="cyber-panel">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium font-headline tracking-wider flex items-center gap-2">
              <FolderOpen className="h-4 w-4 text-accent" />
              REAL-TIME I/O LOG
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentLogs.map((log, i) => (
                <div key={i} className="py-2 border-b border-border/30 last:border-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono text-muted-foreground">{log.time}</span>
                    <Badge 
                      variant="outline" 
                      className={`text-[8px] ${
                        log.action === "WRITE" ? "border-primary/30 text-primary" :
                        log.action === "READ" ? "border-accent/30 text-accent" :
                        log.action === "DELETE" ? "border-destructive/30 text-destructive" :
                        log.action === "ARCHIVE" ? "border-warning/30 text-warning" :
                        "border-border/30 text-muted-foreground"
                      }`}
                    >
                      {log.action}
                    </Badge>
                  </div>
                  <p className="text-[11px] font-mono truncate">{log.target}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[9px] text-muted-foreground">{log.size}</span>
                    <span className={`text-[9px] ${log.status === "success" ? "text-accent" : "text-warning"}`}>
                      {log.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
