"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type SettingsState = {
  notifications: boolean;
  darkMode: boolean;
  dataSync: boolean;
};

type SettingsContextType = SettingsState & {
  updateSetting: <K extends keyof SettingsState>(key: K, value: SettingsState[K]) => void;
};

const defaultSettings: SettingsState = {
  notifications: true,
  darkMode: true,
  dataSync: true,
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SettingsState>(defaultSettings);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem("ayma_os_settings");
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse settings", e);
      }
    }
  }, []);

  const updateSetting = <K extends keyof SettingsState>(key: K, value: SettingsState[K]) => {
    setSettings((prev) => {
      const next = { ...prev, [key]: value };
      localStorage.setItem("ayma_os_settings", JSON.stringify(next));
      return next;
    });
  };

  return (
    <SettingsContext.Provider value={{ ...settings, updateSetting }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
