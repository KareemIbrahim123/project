
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from "recharts";
import { Thermometer, Wind, Radio, Waves, Ruler, Activity } from "lucide-react";
import { generateSensorHistory } from "@/lib/mock-data";
import { useMemo } from "react";

export function SensorDashboard() {
  const data = useMemo(() => generateSensorHistory(), []);

  const chartConfig = {
    temp: { label: "Temperature", color: "hsl(var(--primary))" },
    gas: { label: "Gas Level", color: "hsl(var(--accent))" },
  };

  return (
    <Card className="cyber-panel col-span-1 md:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-sm font-medium font-headline tracking-wider flex items-center gap-2">
          <Activity className="h-4 w-4 text-accent" />
          ENVIRONMENTAL SENSORS (NODE-ESP32)
        </CardTitle>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-[10px] text-muted-foreground uppercase">Temp</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-accent" />
            <span className="text-[10px] text-muted-foreground uppercase">Gas</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] w-full">
          <ChartContainer config={chartConfig}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorGas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="timestamp" hide />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area 
                type="monotone" 
                dataKey="temperature" 
                stroke="hsl(var(--primary))" 
                fillOpacity={1} 
                fill="url(#colorTemp)" 
                strokeWidth={2}
              />
              <Area 
                type="monotone" 
                dataKey="gas" 
                stroke="hsl(var(--accent))" 
                fillOpacity={1} 
                fill="url(#colorGas)" 
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 border-t border-border pt-6">
          <div className="text-center">
            <Thermometer className="h-4 w-4 mx-auto mb-2 text-primary" />
            <p className="text-xs text-muted-foreground">TEMP</p>
            <p className="text-lg font-bold">24.5°C</p>
          </div>
          <div className="text-center">
            <Wind className="h-4 w-4 mx-auto mb-2 text-accent" />
            <p className="text-xs text-muted-foreground">GAS</p>
            <p className="text-lg font-bold">342ppm</p>
          </div>
          <div className="text-center">
            <Waves className="h-4 w-4 mx-auto mb-2 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">SOUND</p>
            <p className="text-lg font-bold">52dB</p>
          </div>
          <div className="text-center">
            <Ruler className="h-4 w-4 mx-auto mb-2 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">DIST</p>
            <p className="text-lg font-bold">182cm</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
