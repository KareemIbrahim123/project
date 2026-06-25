"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Map, MapPin, Layers, Satellite, Radio, Wifi, SignalHigh, Activity, Navigation } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const mapNodes = [
  { id: "N-001", lat: "30.0444°", lng: "31.2357°", sector: "Alpha", status: "online", type: "Primary" },
  { id: "N-012", lat: "30.0455°", lng: "31.2401°", sector: "Alpha", status: "online", type: "Relay" },
  { id: "N-024", lat: "30.0389°", lng: "31.2312°", sector: "Beta", status: "online", type: "Primary" },
  { id: "N-037", lat: "30.0410°", lng: "31.2278°", sector: "Beta", status: "degraded", type: "Sensor" },
  { id: "N-051", lat: "30.0502°", lng: "31.2445°", sector: "Gamma", status: "online", type: "Primary" },
  { id: "N-063", lat: "30.0478°", lng: "31.2390°", sector: "Gamma", status: "online", type: "Relay" },
  { id: "N-089", lat: "30.0340°", lng: "31.2500°", sector: "Delta", status: "offline", type: "Sensor" },
  { id: "N-102", lat: "30.0520°", lng: "31.2290°", sector: "Delta", status: "online", type: "Primary" },
];

const sectors = [
  { name: "ALPHA", nodes: 38, health: 99.8, color: "text-primary" },
  { name: "BETA", nodes: 35, health: 97.2, color: "text-accent" },
  { name: "GAMMA", nodes: 41, health: 99.9, color: "text-primary" },
  { name: "DELTA", nodes: 28, health: 94.1, color: "text-warning" },
];

export default function CityMappingPage() {
  const [selectedSector, setSelectedSector] = useState<string | null>(null);

  const filteredNodes = selectedSector 
    ? mapNodes.filter(n => n.sector === selectedSector) 
    : mapNodes;

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8 max-w-[1600px] mx-auto">
      {/* Page Header */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-accent text-xs font-bold tracking-widest uppercase mb-1">MODULE_GEOSPATIAL_v2.0</p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline tracking-tighter">CITY MAPPING</h1>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="border-accent/30 text-accent">
            <Navigation className="h-3 w-3 mr-1" />
            142 NODES TRACKED
          </Badge>
        </div>
      </div>

      {/* Map + Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Full Map View */}
        <div className="lg:col-span-3 cyber-panel relative h-[300px] md:h-[450px] lg:h-[550px] rounded-xl overflow-hidden group">
          <div className="absolute inset-0 z-0">
            <Image 
              src="https://picsum.photos/seed/ayma-city-map/1400/800" 
              alt="City Masterplan" 
              fill 
              className="object-cover opacity-50 group-hover:scale-[1.02] transition-transform duration-1000"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-10" />
          
          {/* Map overlay markers */}
          <div className="absolute top-[15%] start-[20%] z-20">
            <div className="h-4 w-4 rounded-full bg-primary animate-pulse border-2 border-primary/50" />
            <span className="text-[8px] font-mono text-primary ml-1">ALPHA</span>
          </div>
          <div className="absolute top-[35%] start-[45%] z-20">
            <div className="h-4 w-4 rounded-full bg-accent animate-pulse border-2 border-accent/50" />
            <span className="text-[8px] font-mono text-accent ml-1">BETA</span>
          </div>
          <div className="absolute top-[55%] end-[25%] z-20">
            <div className="h-4 w-4 rounded-full bg-primary animate-pulse border-2 border-primary/50" />
            <span className="text-[8px] font-mono text-primary ml-1">GAMMA</span>
          </div>
          <div className="absolute bottom-[25%] start-[30%] z-20">
            <div className="h-4 w-4 rounded-full bg-warning animate-pulse border-2 border-warning/50" />
            <span className="text-[8px] font-mono text-warning ml-1">DELTA</span>
          </div>
          
          {/* Pinging circles */}
          <div className="absolute top-[20%] start-[60%] h-16 w-16 border-2 border-primary/30 rounded-full animate-ping z-15 opacity-20" />
          <div className="absolute bottom-[40%] end-[40%] h-10 w-10 border-2 border-accent/30 rounded-full animate-ping z-15 opacity-20" />
          
          {/* Bottom overlay */}
          <div className="absolute bottom-6 start-6 end-6 z-20 flex items-center justify-between">
            <div className="flex flex-wrap gap-3">
              {sectors.map((s) => (
                <button
                  key={s.name}
                  onClick={() => setSelectedSector(selectedSector === s.name.charAt(0) + s.name.slice(1).toLowerCase() ? null : s.name.charAt(0) + s.name.slice(1).toLowerCase())}
                  className={`px-3 py-2 cyber-panel bg-black/60 hover:bg-black/80 transition-colors cursor-pointer ${
                    selectedSector === s.name.charAt(0) + s.name.slice(1).toLowerCase() ? "border-primary" : ""
                  }`}
                >
                  <p className="text-[9px] text-muted-foreground uppercase">Sector {s.name}</p>
                  <p className={`text-sm font-bold font-headline ${s.color}`}>{s.nodes} nodes</p>
                </button>
              ))}
            </div>
          </div>

          {/* Top left coordinates */}
          <div className="absolute top-6 start-6 z-20">
            <Badge className="bg-primary/80 hover:bg-primary backdrop-blur-sm border-none mb-2">LIVE SATELLITE VIEW</Badge>
            <div className="p-3 cyber-panel bg-black/50 text-xs space-y-1">
              <p className="font-mono flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                CENTER: 30.0444° N, 31.2357° E
              </p>
              <p className="font-mono flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                COVERAGE: 12.4 km² | ZOOM: 14x
              </p>
            </div>
          </div>
        </div>

        {/* Sector Info Panel */}
        <div className="space-y-4">
          <Card className="cyber-panel">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium font-headline tracking-wider flex items-center gap-2">
                <Layers className="h-4 w-4 text-primary" />
                SECTOR HEALTH
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {sectors.map((sector) => (
                <div key={sector.name} className="p-3 rounded-lg border border-border/30 bg-background/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-headline font-bold">{sector.name}</span>
                    <span className={`text-xs font-mono ${sector.color}`}>{sector.health}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${sector.health > 98 ? "bg-accent" : sector.health > 95 ? "bg-primary" : "bg-warning"}`}
                      style={{ width: `${sector.health}%` }}
                    />
                  </div>
                  <p className="text-[9px] text-muted-foreground mt-1">{sector.nodes} nodes active</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="cyber-panel">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium font-headline tracking-wider flex items-center gap-2">
                <Radio className="h-4 w-4 text-accent" />
                LINK STATUS
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { icon: SignalHigh, name: "CELLULAR", status: "ONLINE", color: "text-accent" },
                { icon: Wifi, name: "LI-FI MESH", status: "ONLINE", color: "text-accent" },
                { icon: Radio, name: "HF BACKUP", status: "STANDBY", color: "text-warning" },
              ].map((link) => (
                <div key={link.name} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                  <div className="flex items-center gap-2">
                    <link.icon className={`h-3 w-3 ${link.color}`} />
                    <span className="text-[10px] font-headline">{link.name}</span>
                  </div>
                  <span className={`text-[9px] font-mono ${link.color}`}>{link.status}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Node Table */}
      <Card className="cyber-panel">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium font-headline tracking-wider flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              NODE LOCATION REGISTRY
            </CardTitle>
            {selectedSector && (
              <Button variant="ghost" size="sm" className="text-[10px] h-6 text-muted-foreground" onClick={() => setSelectedSector(null)}>
                CLEAR FILTER ✕
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-3 px-4 text-muted-foreground font-headline uppercase tracking-wider">Node</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-headline uppercase tracking-wider">Latitude</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-headline uppercase tracking-wider">Longitude</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-headline uppercase tracking-wider">Sector</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-headline uppercase tracking-wider">Type</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-headline uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredNodes.map((node) => (
                  <tr key={node.id} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                    <td className="py-3 px-4 font-mono font-medium">{node.id}</td>
                    <td className="py-3 px-4 font-mono text-muted-foreground">{node.lat}</td>
                    <td className="py-3 px-4 font-mono text-muted-foreground">{node.lng}</td>
                    <td className="py-3 px-4 font-headline">{node.sector}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="text-[8px] border-border/30">{node.type}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className={`text-[8px] ${
                        node.status === "online" ? "border-accent/30 text-accent" :
                        node.status === "degraded" ? "border-warning/30 text-warning" :
                        "border-destructive/30 text-destructive"
                      }`}>
                        {node.status.toUpperCase()}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
