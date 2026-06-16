"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Cpu, ShieldAlert, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/"); // Redirect to dashboard on success
    } catch (err: any) {
      setError("AUTHENTICATION FAILED: Invalid credentials or unauthorized access.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background font-body relative overflow-hidden">
      {/* Background styling elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background z-0" />
      <div className="absolute w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -top-40 -left-40 z-0 animate-pulse duration-[10000ms]" />
      
      <div className="z-10 w-full max-w-md p-8 cyber-panel rounded-xl shadow-2xl border border-primary/20">
        <div className="flex flex-col items-center mb-8">
          <div className="h-16 w-16 bg-primary/10 border border-primary/30 rounded-2xl flex items-center justify-center glow-primary mb-4">
            <Cpu className="text-primary h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold font-headline tracking-tighter">AYMA OS</h1>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Tier 1 Clearance Required</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-destructive/10 border border-destructive/30 rounded flex items-start gap-3">
            <ShieldAlert className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
            <p className="text-xs text-destructive font-mono leading-relaxed">{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-headline tracking-wider text-muted-foreground uppercase">Operator ID (Email)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-background/50 border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-colors font-mono"
              placeholder="admin@ayma.os"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-headline tracking-wider text-muted-foreground uppercase">Access Code</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-background/50 border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-colors font-mono tracking-widest"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground font-headline font-bold uppercase tracking-wider py-3 rounded-md transition-all flex justify-center items-center gap-2 glow-primary disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                VERIFYING...
              </>
            ) : (
              "ESTABLISH UPLINK"
            )}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-border/50 pt-4">
          <p className="text-[9px] text-muted-foreground font-mono">UNAUTHORIZED ACCESS IS STRICTLY PROHIBITED</p>
          <p className="text-[9px] text-muted-foreground font-mono mt-1">AYMA_OS_v2.4.1 // SECURE CONNECTION</p>
        </div>
      </div>
    </div>
  );
}
