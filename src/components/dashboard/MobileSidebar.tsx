"use client";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { useSidebarToggle } from "@/components/SidebarContext";
import { useLanguage } from "@/components/LanguageContext";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function MobileSidebar() {
  const { isOpen, close } = useSidebarToggle();
  const { language } = useLanguage();
  const pathname = usePathname();

  // Close sidebar on route change
  useEffect(() => {
    close();
  }, [pathname, close]);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && close()}>
      <SheetContent
        side={language === "ar" ? "right" : "left"}
        className="p-0 w-64 border-e-border bg-sidebar"
        hideClose
      >
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
}
