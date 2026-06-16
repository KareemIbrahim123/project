"use client";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { Search, Bell, Grid, User, Loader2 } from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-background text-primary">
        <Loader2 className="h-12 w-12 animate-spin mb-4" />
        <p className="font-mono text-sm tracking-widest animate-pulse">VERIFYING CLEARANCE...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden font-body">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto custom-scrollbar">
        {/* Top Header */}
        <header className="h-16 border-b border-border flex items-center justify-between px-8 bg-background/50 backdrop-blur-md sticky top-0 z-50">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-96 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="EXECUTE SYSTEM SEARCH..." 
                className="w-full bg-muted/30 border border-border/50 rounded-lg py-2 pl-10 pr-4 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-primary/50 focus:bg-muted/50 transition-all"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/50 bg-muted/20">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-bold font-mono">LATENCY: 14MS</span>
            </div>
            <div className="relative">
              <Bell className="h-5 w-5 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-destructive rounded-full" />
            </div>
            <Grid className="h-5 w-5 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
            <User className="h-5 w-5 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}
