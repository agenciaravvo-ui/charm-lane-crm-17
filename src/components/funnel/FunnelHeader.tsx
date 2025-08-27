import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CreateFunnelModal } from "@/components/funnel/CreateFunnelModal";
import { Settings, Plus } from "lucide-react";

interface FunnelHeaderProps {
  selectedFunnel: string;
  onFunnelChange: (value: string) => void;
  onSettingsClick: () => void;
  onAddFunnel: () => void;
  onAddLead: () => void;
  funnels: Array<{ id: string; name: string }>;
}

export function FunnelHeader({ selectedFunnel, onFunnelChange, onSettingsClick, onAddFunnel, onAddLead, funnels }: FunnelHeaderProps) {
  const [isCreateFunnelOpen, setIsCreateFunnelOpen] = useState(false);
  
  const handleCreateFunnel = (funnel: any) => {
    // Passa o callback para o componente pai
    onAddFunnel();
    setIsCreateFunnelOpen(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        {/* Left side - FUNIL title, selector and quick actions */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-foreground">FUNIL</h1>
            
            <Select value={selectedFunnel} onValueChange={onFunnelChange}>
              <SelectTrigger className="w-[280px] h-11 bg-card border-border/50 shadow-sm hover:border-primary/50 transition-all duration-200">
                <SelectValue placeholder="Selecionar funil" />
              </SelectTrigger>
              <SelectContent className="bg-popover/95 backdrop-blur-md border-border/50 shadow-2xl z-50">
                {funnels.map((funnel) => (
                  <SelectItem key={funnel.id} value={funnel.id} className="cursor-pointer hover:bg-accent/50">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      {funnel.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Quick Action Buttons - Moved closer */}
          <div className="flex items-center gap-2">
            <Button 
              variant="default"
              size="sm" 
              onClick={onAddLead}
              className="h-10 px-4 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm hover:shadow-md transition-all duration-200"
            >
              <Plus className="h-4 w-4 mr-2" />
              Novo Lead
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onAddFunnel}
              className="h-10 px-4 border-border/50 hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all duration-200"
            >
              <Plus className="h-4 w-4 mr-2" />
              Novo Funil
            </Button>
          </div>
        </div>

        {/* Right side - Settings button */}
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onSettingsClick}
            className="h-10 w-10 p-0 hover:bg-primary/10 hover:text-primary transition-all duration-200"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}