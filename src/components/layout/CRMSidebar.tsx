import { NavLink, useLocation } from "react-router-dom";
import { 
  BarChart3, 
  Filter, 
  Calendar as CalendarIcon, 
  Zap, 
  Settings 
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Dashboard", url: "/", icon: BarChart3 },
  { title: "Funil", url: "/funnel", icon: Filter },
  { title: "Agenda", url: "/calendar", icon: CalendarIcon },
  { title: "Integrações", url: "/integrations", icon: Zap },
];

export function CRMSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const collapsed = state === "collapsed";

  const getNavClassName = (url: string) => {
    const isActive = location.pathname === url;
    return `${
      isActive 
        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
        : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
    } transition-all duration-200`;
  };

  return (
    <Sidebar className="shadow-sidebar border-r-0" collapsible="icon">
      <SidebarContent className="bg-sidebar">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-12">
                    <NavLink to={item.url} className={getNavClassName(item.url)}>
                      <item.icon className="h-5 w-5 shrink-0" />
                      {!collapsed && (
                        <span className="font-medium">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-sidebar border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="h-12 text-sidebar-foreground hover:bg-sidebar-accent/50">
              <Settings className="h-5 w-5 shrink-0" />
              {!collapsed && <span className="font-medium">Configurações</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}