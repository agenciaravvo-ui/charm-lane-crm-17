import { ReactNode } from "react";
import { CRMSidebar } from "./CRMSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface CRMLayoutProps {
  children: ReactNode;
}

export function CRMLayout({ children }: CRMLayoutProps) {
  return (
    <div className="min-h-screen flex w-full bg-gradient-subtle">
      <CRMSidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Header with global trigger */}
        <header className="h-16 flex items-center justify-between px-6 bg-card/80 backdrop-blur-sm border-b border-border shadow-sm">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
            <div className="text-xl font-semibold bg-gradient-primary bg-clip-text text-transparent">
              Simple CRM
            </div>
          </div>
        </header>

        {/* Main content - padding condicional */}
        <main className="flex-1 relative overflow-auto">
          <div className="h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}