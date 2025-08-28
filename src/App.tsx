import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { CRMLayout } from "@/components/layout/CRMLayout";
import Dashboard from "./pages/Dashboard";
import Funnel from "./pages/Funnel";
import Calendar from "./pages/Calendar";
import Integrations from "./pages/Integrations";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/*" element={
              <ProtectedRoute>
                <SidebarProvider>
                  <CRMLayout>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/funnel" element={<Funnel />} />
                      <Route path="/calendar" element={<Calendar />} />
                      <Route path="/integrations" element={<Integrations />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </CRMLayout>
                </SidebarProvider>
              </ProtectedRoute>
            } />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
