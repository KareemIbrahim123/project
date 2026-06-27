"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { AlertTriangle } from "lucide-react";

const data = [
  { name: "Mechanical", value: 45, color: "hsl(var(--destructive))" },
  { name: "Electrical", value: 25, color: "hsl(var(--warning))" },
  { name: "Operator Error", value: 15, color: "hsl(var(--accent))" },
  { name: "Material Shortage", value: 10, color: "hsl(var(--primary))" },
  { name: "Other", value: 5, color: "hsl(var(--muted-foreground))" },
];

export function DowntimeAnalysis() {
  return (
    <Card className="cyber-panel">
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-primary/20">
        <CardTitle className="text-sm font-headline tracking-widest text-primary flex items-center gap-2 uppercase">
          <AlertTriangle className="h-4 w-4" />
          Downtime Root Cause Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                borderColor: "hsl(var(--primary) / 0.3)",
                color: "hsl(var(--foreground))",
              }}
              itemStyle={{ color: "hsl(var(--foreground))" }}
              formatter={(value: number) => [`${value}%`, "Cause"]}
            />
            <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: "12px" }} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
