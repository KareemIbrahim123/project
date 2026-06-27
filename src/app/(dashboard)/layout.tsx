"use client";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { Search, Bell, Grid, User, Loader2, Menu } from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageContext";
import { GlobalToastEmitter } from "@/components/dashboard/GlobalToastEmitter";
import { useCyberToast } from "@/components/CyberToast";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage();
  const toast = useCyberToast();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      toast(`Executing global system search for: ${(e.target as HTMLInputElement).value}`, 'info');
      (e.target as HTMLInputElement).value = '';
    }
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  if (loading || !user) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-background text-primary">
        <Loader2 className="h-12 w-12 animate-spin mb-4" />
        <p className="font-mono text-sm tracking-widest animate-pulse">{t('verifying')}</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden font-body">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex h-full shrink-0">
        <Sidebar />
      </div>
      
      <main className="flex-1 overflow-y-auto custom-scrollbar flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-14 sm:h-16 border-b border-border flex items-center justify-between px-3 sm:px-4 md:px-8 bg-background/50 backdrop-blur-md sticky top-0 z-50 shrink-0">
          <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
            {/* Mobile Menu Trigger */}
            <div className="md:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <button className="p-2 -ms-2 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted/50">
                    <Menu className="h-5 w-5" />
                  </button>
                </SheetTrigger>
                <SheetContent side={language === 'ar' ? 'right' : 'left'} className="p-0 w-64 border-e-border bg-sidebar" hideClose>
                  <Sidebar />
                </SheetContent>
              </Sheet>
            </div>

            <div className="relative w-full max-w-sm hidden sm:block group">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder={t('executeSearch')} 
                onKeyDown={handleSearch}
                className="w-full bg-muted/30 border border-border/50 rounded-lg py-2 ps-10 pe-4 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-primary/50 focus:bg-muted/50 transition-all truncate"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4 md:gap-6 shrink-0">
            <button 
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="bg-muted/20 border border-border/50 hover:bg-muted/40 transition-colors px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-widest"
            >
              {language === 'en' ? 'عربي' : 'EN'}
            </button>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/50 bg-muted/20">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-bold font-mono hidden sm:inline-block">{t('latency')}</span>
              <span className="text-[10px] font-bold font-mono sm:hidden">14MS</span>
            </div>
            <div className="relative" onClick={() => toast("No critical alerts in queue.", "success")}>
              <Bell className="h-5 w-5 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
              <span className="absolute -top-1 -end-1 h-2 w-2 bg-destructive rounded-full animate-pulse" />
            </div>
            <Grid 
              onClick={() => toast("Module grid reconfiguration locked by Administrator.", "warning")}
              className="h-5 w-5 text-muted-foreground cursor-pointer hover:text-foreground transition-colors hidden sm:block" 
            />
            <Link href="/profile">
              <User className="h-5 w-5 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
            </Link>
          </div>
        </header>

        <div className="flex-1 overflow-x-hidden">
          {children}
        </div>
        <GlobalToastEmitter />
      </main>
    </div>
  );
}
