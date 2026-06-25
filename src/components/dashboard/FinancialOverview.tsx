
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, ArrowDownRight, TrendingDown } from "lucide-react";
import { useLiveTelemetry } from "@/hooks/useLiveTelemetry";

export function FinancialOverview() {
  const { financialData } = useLiveTelemetry();
  const { targetCapEx, actualCapEx, reductionPercent, nodesCount } = financialData;

  return (
    <Card className="cyber-panel">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase font-headline">CapEx Efficiency</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold font-headline">{actualCapEx.toLocaleString()} EGP</p>
                <span className="text-xs text-muted-foreground">/ NODE</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <Badge variant="outline" className="border-accent/30 text-accent bg-accent/5">
              <TrendingDown className="h-3 w-3 mr-1" />
              {reductionPercent}% REDUCTION
            </Badge>
            <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-tighter">TARGET: {targetCapEx} EGP</p>
          </div>
        </div>
        
        <div className="mt-6 flex items-center gap-2">
          <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
            <div 
              className="h-full bg-primary" 
              style={{ width: `${(actualCapEx / targetCapEx) * 100}%` }} 
            />
          </div>
          <span className="text-[10px] font-mono text-muted-foreground">142 NODES ACTIVE</span>
        </div>
      </CardContent>
    </Card>
  );
}
