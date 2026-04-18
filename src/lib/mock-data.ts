
export type SensorReading = {
  timestamp: string;
  temperature: number;
  gas: number;
  motion: boolean;
  sound: number;
  distance: number;
};

export const generateSensorHistory = (points: number = 20): SensorReading[] => {
  const data: SensorReading[] = [];
  const now = new Date();
  for (let i = points; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60000);
    data.push({
      timestamp: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      temperature: 24 + Math.random() * 5,
      gas: 300 + Math.random() * 50,
      motion: Math.random() > 0.8,
      sound: 40 + Math.random() * 20,
      distance: 100 + Math.random() * 200,
    });
  }
  return data;
};

export const MOCK_ENERGY_DATA = {
  batteryLevel: 78,
  pvInput: 450,
  targetAutonomy: 72, // hours
  currentAutonomy: 48,
  status: 'optimizing' as const,
};

export const MOCK_FINANCIAL_DATA = {
  targetCapEx: 6000,
  actualCapEx: 5840,
  reductionPercent: 12.5,
  nodesCount: 142,
};

export const MOCK_NETWORK_STATUS = {
  cellular: 'online' as const,
  lifi: 'online' as const,
  hfEmergency: 'standby' as const,
};
