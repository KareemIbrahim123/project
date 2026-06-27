
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BrainCircuit, AlertCircle, CheckCircle2, ShieldCheck, Loader2 } from "lucide-react";
import { aymaAlertValidation, type AlertValidationOutput } from "@/ai/flows/ayma-alert-validation";

type Alert = {
  id: string;
  time: string;
  description: string;
  category?: string;
  validation?: AlertValidationOutput;
  isLoading?: boolean;
  acknowledged?: boolean;
};

const INITIAL_ALERTS: Alert[] = [
  {
    id: "1",
    time: "14:22",
    description: "Abnormal temperature spike detected in CNC Mill-01 spindle motor.",
    category: "Equipment",
  },
  {
    id: "2",
    time: "13:45",
    description: "Sudden pressure drop in hydraulic press main cylinder.",
    category: "Process",
  },
  {
    id: "3",
    time: "12:10",
    description: "Multiple motion triggers detected in restricted maintenance bay.",
    category: "Safety",
  }
];

export function AlertValidationSystem() {
  const [alerts, setAlerts] = useState<Alert[]>(INITIAL_ALERTS);

  useEffect(() => {
    const validateAlerts = async () => {
      const updatedAlerts = await Promise.all(
        alerts.map(async (alert) => {
          if (alert.validation) return alert;
          
          try {
            const result = await aymaAlertValidation({
              alertDescription: alert.description,
              sensorReadings: {
                temperature: 42,
                gasLevel: "low",
                motionDetected: true,
              }
            });
            return { ...alert, validation: result };
          } catch (error) {
            console.error("Failed to validate alert", error);
            return alert;
          }
        })
      );
      setAlerts(updatedAlerts);
    };

    validateAlerts();
  }, []);

  return (
    <Card className="cyber-panel col-span-1 md:col-span-1">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium font-headline tracking-wider flex items-center gap-2">
          <BrainCircuit className="h-4 w-4 text-primary" />
          AI VALIDATED ALERTS
        </CardTitle>
        <div className="flex items-center gap-1">
          <ShieldCheck className="h-3 w-3 text-accent" />
          <span className="text-[10px] text-accent uppercase font-bold tracking-tighter">95% Filtering Active</span>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px]">
          <div className="p-4 space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="group relative p-3 rounded-lg border border-border/50 bg-background/30 hover:bg-background/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-muted-foreground">{alert.time}</span>
                  {!alert.validation ? (
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      ANALYZING...
                    </div>
                  ) : alert.validation.isValidAlert ? (
                    <Badge variant="destructive" className="h-5 px-1.5 text-[9px] animate-pulse">CRITICAL ACTION REQUIRED</Badge>
                  ) : (
                    <Badge variant="outline" className="h-5 px-1.5 text-[9px] text-muted-foreground bg-muted/20">NOISE FILTERED</Badge>
                  )}
                </div>
                <p className="text-xs font-medium leading-relaxed mb-2">{alert.description}</p>
                {alert.category && (
                  <Badge variant="outline" className="text-[8px] border-primary/30 text-primary mb-2">{alert.category.toUpperCase()}</Badge>
                )}
                {alert.validation && (
                  <div className={`mt-2 p-2 rounded text-[10px] ${alert.validation.isValidAlert ? 'bg-destructive/10 text-destructive border border-destructive/20' : 'bg-accent/10 text-accent border border-accent/20'}`}>
                    <p className="font-bold flex items-center gap-1">
                      {alert.validation.isValidAlert ? <AlertCircle className="h-3 w-3" /> : <CheckCircle2 className="h-3 w-3" />}
                      FUSION REASONING:
                    </p>
                    <p className="opacity-90">{alert.validation.validationReason}</p>
                    <div className="mt-1 flex items-center justify-between font-mono">
                      <span>CONFIDENCE</span>
                      <span>{(alert.validation.confidenceScore * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
