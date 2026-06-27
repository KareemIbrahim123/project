"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Activity } from "lucide-react";

const data = [
  { day: "Mon", good: 4200, scrap: 150 },
  { day: "Tue", good: 4100, scrap: 200 },
  { day: "Wed", good: 4300, scrap: 120 },
  { day: "Thu", good: 3900, scrap: 250 },
  { day: "Fri", good: 4500, scrap: 100 },
  { day: "Sat", good: 2100, scrap: 50 },
  { day: "Sun", good: 1800, scrap: 40 },
];

export function ProductionYieldChart() {
  return (
    <Card className="cyber-panel">
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-primary/20">
        <CardTitle className="text-sm font-headline tracking-widest text-primary flex items-center gap-2 uppercase">
          <Activity className="h-4 w-4" />
          Production Yield & Scrap Rate
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--primary) / 0.1)" vertical={false} />
            <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                borderColor: "hsl(var(--primary) / 0.3)",
                color: "hsl(var(--foreground))",
              }}
              itemStyle={{ color: "hsl(var(--foreground))" }}
            />
            <Legend wrapperStyle={{ fontSize: "12px" }} />
            <Bar dataKey="good" name="Good Units" stackId="a" fill="hsl(var(--primary))" radius={[0, 0, 4, 4]} />
            <Bar dataKey="scrap" name="Scrap Units" stackId="a" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
