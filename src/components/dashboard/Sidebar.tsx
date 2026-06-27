"use client";

import { LayoutDashboard, Shield, BarChart3, LogOut, Cpu, Database, Factory, HelpCircle, PieChart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useLanguage } from "@/components/LanguageContext";

export function Sidebar() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const NAV_ITEMS = [
    { icon: LayoutDashboard, label: t('mainTerminal'), href: "/" },
    { icon: BarChart3, label: t('analyticsEngine'), href: "/analytics" },
    { icon: Database, label: t('storageVault'), href: "/storage" },
    { icon: Factory, label: t('plantFloor'), href: "/plant-floor" },
    { icon: PieChart, label: t('factoryStatistics'), href: "/statistics" },
    { icon: Shield, label: t('securityAudit'), href: "/security" },
  ];

  return (
    <div className="w-64 border-e border-border bg-sidebar h-screen flex flex-col shrink-0">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center glow-primary">
            <Cpu className="text-primary-foreground h-5 w-5" />
          </div>
          <span className="font-bold text-xl font-headline tracking-tighter">{t('aymaOs')}</span>
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
              <p className="text-[10px] font-bold tracking-tight">{t('plantOperator')}</p>
              <p className="text-[9px] text-accent uppercase">{t('tier1Clearance')}</p>
            </div>
          </div>
          <Link
            href="/qa"
            className="flex items-center justify-center gap-2 p-2 mb-2 text-[10px] font-bold font-mono text-muted-foreground hover:text-primary border border-border/50 rounded-lg hover:bg-white/5 transition-all uppercase tracking-wider"
          >
            <HelpCircle className="h-3 w-3" />
            {t('qaSupport')}
          </Link>
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full justify-start text-[9px] h-8 text-muted-foreground hover:text-destructive"
            onClick={() => signOut(auth)}
          >
            <LogOut className="me-2 h-3 w-3" />
            {t('systemLogout')}
          </Button>
        </div>
        
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[9px] text-muted-foreground font-mono">{t('nodeLinkNominal')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
