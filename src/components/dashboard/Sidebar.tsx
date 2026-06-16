"use client";

import { LayoutDashboard, Shield, BarChart3, LogOut, Cpu, Database, Map as MapIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "MAIN TERMINAL", href: "/" },
  { icon: BarChart3, label: "ANALYTICS ENGINE", href: "/analytics" },
  { icon: Database, label: "STORAGE VAULT", href: "/storage" },
  { icon: MapIcon, label: "CITY MAPPING", href: "/city-mapping" },
  { icon: Shield, label: "SECURITY AUDIT", href: "/security" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 border-r border-border bg-sidebar h-screen flex flex-col shrink-0">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center glow-primary">
            <Cpu className="text-primary-foreground h-5 w-5" />
          </div>
          <span className="font-bold text-xl font-headline tracking-tighter">AYMA OS</span>
        </div>
        
        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-xs font-headline tracking-wider transition-all duration-200 group",
                  isActive 
                    ? "bg-primary/10 text-primary border border-primary/20" 
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                )}
              >
                <item.icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-6 space-y-4">
        <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="h-8 w-8 border border-accent/30">
              <AvatarImage src="https://picsum.photos/seed/admin-1/100/100" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-[10px] font-bold tracking-tight">CITY ADMIN</p>
              <p className="text-[9px] text-accent uppercase">Tier 1 Clearance</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full justify-start text-[9px] h-8 text-muted-foreground hover:text-destructive"
            onClick={() => signOut(auth)}
          >
            <LogOut className="mr-2 h-3 w-3" />
            SYSTEM LOGOUT
          </Button>
        </div>
        
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[9px] text-muted-foreground font-mono">NODE_LINK: NOMINAL</span>
          </div>
        </div>
      </div>
    </div>
  );
}
