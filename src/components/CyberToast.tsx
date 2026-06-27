"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, AlertTriangle } from "lucide-react";

type ToastType = "info" | "warning" | "error";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  addToast: (message: string, type?: ToastType) => void;
}

const CyberToastContext = createContext<ToastContextType | undefined>(undefined);

export function CyberToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType = "info") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <CyberToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className={`
                pointer-events-auto flex items-start gap-3 p-4 rounded-md border backdrop-blur-md min-w-[300px] max-w-[400px]
                ${toast.type === "info" ? "bg-black/80 border-primary/50 text-primary" : ""}
                ${toast.type === "warning" ? "bg-black/80 border-accent/50 text-accent" : ""}
                ${toast.type === "error" ? "bg-black/80 border-destructive/50 text-destructive" : ""}
              `}
            >
              <div className="mt-0.5 shrink-0">
                {toast.type === "info" ? <Terminal className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
              </div>
              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-widest font-bold opacity-70 mb-1">
                  SYSTEM MESSAGE
                </p>
                <p className="text-xs font-mono font-medium leading-tight">
                  {toast.message}
                </p>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
              >
                <X className="h-3 w-3" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </CyberToastContext.Provider>
  );
}

export function useCyberToast() {
  const context = useContext(CyberToastContext);
  if (context === undefined) {
    throw new Error("useCyberToast must be used within a CyberToastProvider");
  }
  return context.addToast;
}
