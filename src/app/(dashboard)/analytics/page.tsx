"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, BarChart, Bar, LineChart, Line } from "recharts";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Thermometer, Wind, Waves, Ruler, Activity, TrendingUp, Zap, Clock } from "lucide-react";
import { generateSensorHistory, MOCK_ENERGY_DATA } from "@/lib/mock-data";
import { useMemo } from "react";

const energyHistory = Array.from({ length: 24 }, (_, i) => ({
  hour: `${String(i).padStart(2, "0")}:00`,
  battery: 60 + Math.random() * 30,
  pvInput: i >= 6 && i <= 18 ? 200 + Math.random() * 400 : Math.random() * 50,
  consumption: 150 + Math.random() * 200,
}));

const nodePerformance = Array.from({ length: 12 }, (_, i) => ({
  node: `N-${String(i + 1).padStart(3, "0")}`,
  uptime: 95 + Math.random() * 5,
  latency: 5 + Math.random() * 25,
  packets: 1000 + Math.floor(Math.random() * 5000),
}));

export default function AnalyticsPage() {
  const sensorData = useMemo(() => generateSensorHistory(30), []);

  const tempChartConfig = {
    temperature: { label: "Temperature", color: "hsl(var(--primary))" },
    gas: { label: "Gas Level", color: "hsl(var(--accent))" },
  };

  const energyChartConfig = {
    battery: { label: "Battery %", color: "hsl(var(--primary))" },
    pvInput: { label: "PV Input (W)", color: "hsl(var(--accent))" },
    consumption: { label: "Consumption (W)", color: "hsl(var(--destructive))" },
  };

  const perfChartConfig = {
    uptime: { label: "Uptime %", color: "hsl(var(--accent))" },
    latency: { label: "Latency (ms)", color: "hsl(var(--primary))" },
  };

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8 max-w-[1600px] mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2">
        <div>
          <p className="text-accent text-xs font-bold tracking-widest uppercase mb-1">MODULE_ANALYTICS_v1.2</p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline tracking-tighter">ANALYTICS ENGINE</h1>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="border-accent/30 text-accent">
            <Activity className="h-3 w-3 mr-1" />
            LIVE STREAM
          </Badge>
          <Badge variant="outline" className="border-primary/30 text-primary">
            30 DATA POINTS
          </Badge>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Thermometer, label: "AVG TEMP", value: "26.3°C", change: "+1.2°C", color: "text-primary" },
          { icon: Wind, label: "GAS INDEX", value: "342 PPM", change: "NOMINAL", color: "text-accent" },
          { icon: Zap, label: "ENERGY EFFICIENCY", value: "94.2%", change: "+2.1%", color: "text-primary" },
          { icon: Clock, label: "UPTIME", value: "99.7%", change: "30 DAYS", color: "text-accent" },
        ].map((stat) => (
          <Card key={stat.label} className="cyber-panel">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                <span className="text-[9px] text-muted-foreground uppercase">{stat.label}</span>
              </div>
              <p className="text-2xl font-bold font-headline">{stat.value}</p>
              <p className={`text-[10px] mt-1 ${stat.color}`}>{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Environmental Sensor Charts (Expanded) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="cyber-panel">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium font-headline tracking-wider flex items-center gap-2">
              <Thermometer className="h-4 w-4 text-primary" />
              TEMPERATURE & GAS TRENDS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] md:h-[300px]">
              <ChartContainer config={tempChartConfig}>
                <AreaChart data={sensorData}>
                  <defs>
                    <linearGradient id="colorTempA" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorGasA" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="timestamp" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area type="monotone" dataKey="temperature" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorTempA)" strokeWidth={2} />
                  <Area type="monotone" dataKey="gas" stroke="hsl(var(--accent))" fillOpacity={1} fill="url(#colorGasA)" strokeWidth={2} />
                </AreaChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="cyber-panel">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium font-headline tracking-wider flex items-center gap-2">
              <Zap className="h-4 w-4 text-accent" />
              ENERGY PRODUCTION vs CONSUMPTION
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] md:h-[300px]">
              <ChartContainer config={energyChartConfig}>
                <LineChart data={energyHistory}>
                  <XAxis dataKey="hour" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="pvInput" stroke="hsl(var(--accent))" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="consumption" stroke="hsl(var(--destructive))" strokeWidth={2} dot={false} strokeDasharray="4 4" />
                </LineChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Node Performance Table */}
      <Card className="cyber-panel">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium font-headline tracking-wider flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-primary" />
              NODE PERFORMANCE MATRIX
            </CardTitle>
            <Badge variant="outline" className="text-[9px] border-accent/20 text-accent">12 NODES SAMPLED</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-3 px-4 text-muted-foreground font-headline uppercase tracking-wider">Node ID</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-headline uppercase tracking-wider">Uptime</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-headline uppercase tracking-wider">Latency</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-headline uppercase tracking-wider">Packets</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-headline uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {nodePerformance.map((node) => (
                  <tr key={node.node} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                    <td className="py-3 px-4 font-mono font-medium">{node.node}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                          <div className="h-full bg-accent rounded-full" style={{ width: `${node.uptime}%` }} />
                        </div>
                        <span className="text-accent">{node.uptime.toFixed(1)}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono">
                      <span className={node.latency < 15 ? "text-accent" : node.latency < 25 ? "text-warning" : "text-destructive"}>
                        {node.latency.toFixed(1)}ms
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono">{node.packets.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className={`text-[9px] ${node.uptime > 98 ? "border-accent/30 text-accent" : "border-warning/30 text-warning"}`}>
                        {node.uptime > 98 ? "OPTIMAL" : "DEGRADED"}
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
