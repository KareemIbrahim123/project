"use client";

import { useState, useEffect } from 'react';
import { MOCK_ENERGY_DATA, MOCK_FINANCIAL_DATA, generateSensorHistory, SensorReading } from '@/lib/mock-data';

export function useLiveTelemetry() {
  const [energyData, setEnergyData] = useState(MOCK_ENERGY_DATA);
  const [financialData, setFinancialData] = useState(MOCK_FINANCIAL_DATA);
  const [sensorHistory, setSensorHistory] = useState<SensorReading[]>([]);

  // Initialize sensor history once on client
  useEffect(() => {
    setSensorHistory(generateSensorHistory(20));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // Fluctuate energy data
      setEnergyData(prev => {
        const batteryChange = (Math.random() - 0.5) * 0.5; // -0.25 to +0.25
        const newBattery = Math.min(100, Math.max(0, prev.batteryLevel + batteryChange));
        
        const pvChange = (Math.random() - 0.5) * 20; // -10 to +10
        const newPv = Math.min(1000, Math.max(0, prev.pvInput + pvChange));

        return {
          ...prev,
          batteryLevel: Number(newBattery.toFixed(1)),
          pvInput: Math.floor(newPv)
        };
      });

      // Fluctuate financial data
      setFinancialData(prev => {
        const capexChange = (Math.random() - 0.5) * 5;
        return {
          ...prev,
          actualCapEx: Math.floor(prev.actualCapEx + capexChange)
        };
      });

      // Append new sensor reading
      setSensorHistory(prev => {
        if (prev.length === 0) return prev;
        const now = new Date();
        const newReading: SensorReading = {
          // Add seconds to timestamp for live feel
          timestamp: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          temperature: Number((24 + Math.random() * 5).toFixed(1)),
          gas: Math.floor(300 + Math.random() * 50),
          motion: Math.random() > 0.8,
          sound: Math.floor(40 + Math.random() * 20),
          distance: Math.floor(100 + Math.random() * 200),
        };
        // Keep the last 20 items
        return [...prev.slice(1), newReading];
      });

    }, 2500); // tick every 2.5 seconds

    return () => clearInterval(interval);
  }, []);

  return { energyData, financialData, sensorHistory };
}
