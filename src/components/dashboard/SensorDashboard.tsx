
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from "recharts";
import { Thermometer, Wind, Radio, Waves, Ruler, Activity } from "lucide-react";
import { useLiveTelemetry } from "@/hooks/useLiveTelemetry";
import { motion } from "framer-motion";

export function SensorDashboard() {
  const { sensorHistory } = useLiveTelemetry();
  const latest = sensorHistory[sensorHistory.length - 1] || { temperature: 0, gas: 0, sound: 0, distance: 0 };

  const chartConfig = {
    temp: { label: "Temperature", color: "hsl(var(--primary))" },
    gas: { label: "Gas Level", color: "hsl(var(--accent))" },
  };

  return (
    <motion.div whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 400, damping: 10 }} className="col-span-1 md:col-span-2">
      <Card className="cyber-panel h-full">
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
            <AreaChart data={sensorHistory}>
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
            <p className="text-lg font-bold">{latest.temperature.toFixed(1)}°C</p>
          </div>
          <div className="text-center">
            <Wind className="h-4 w-4 mx-auto mb-2 text-accent" />
            <p className="text-xs text-muted-foreground">GAS</p>
            <p className="text-lg font-bold">{latest.gas}ppm</p>
          </div>
          <div className="text-center">
            <Waves className="h-4 w-4 mx-auto mb-2 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">SOUND</p>
            <p className="text-lg font-bold">{latest.sound}dB</p>
          </div>
          <div className="text-center">
            <Ruler className="h-4 w-4 mx-auto mb-2 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">DIST</p>
            <p className="text-lg font-bold">{latest.distance}cm</p>
          </div>
        </div>
      </CardContent>
    </Card>
    </motion.div>
  );
}
