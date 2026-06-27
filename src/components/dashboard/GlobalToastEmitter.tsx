"use client";

import { useEffect } from "react";
import { useSettings } from "@/components/SettingsContext";
import { useCyberToast } from "@/components/CyberToast";

const MOCK_MESSAGES = [
  { msg: "Vibration anomaly detected on CNC Mill-01 spindle bearing.", type: "warning" as const },
  { msg: "OEE stabilized at 84.2% across all production lines.", type: "info" as const },
  { msg: "Conveyor Line A resumed operation after maintenance.", type: "info" as const },
  { msg: "WARNING: Thermal spike on Packaging Robot servo motor.", type: "error" as const },
  { msg: "Shift handover telemetry sync completed.", type: "info" as const },
];

export function GlobalToastEmitter() {
  const { notifications } = useSettings();
  const { addToast } = useCyberToast();

  useEffect(() => {
    if (!notifications) return;

    // Fire a random toast every 15-30 seconds
    const interval = setInterval(() => {
      const randomMsg = MOCK_MESSAGES[Math.floor(Math.random() * MOCK_MESSAGES.length)];
      addToast(randomMsg.msg, randomMsg.type);
    }, Math.random() * 15000 + 15000);

    return () => clearInterval(interval);
  }, [notifications, addToast]);

  return null;
}
