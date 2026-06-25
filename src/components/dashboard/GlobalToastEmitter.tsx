"use client";

import { useEffect } from "react";
import { useSettings } from "@/components/SettingsContext";
import { useCyberToast } from "@/components/CyberToast";

const MOCK_MESSAGES = [
  { msg: "Anomaly detected in Node-4A. Adjusting power routing.", type: "warning" as const },
  { msg: "Grid health stabilized at 99.8%.", type: "info" as const },
  { msg: "LIFI MESH connection restored to sector 7.", type: "info" as const },
  { msg: "WARNING: Unexpected thermal spike in sector 2.", type: "error" as const },
  { msg: "Telemetry sync completed successfully.", type: "info" as const },
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
