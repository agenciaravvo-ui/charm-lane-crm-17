import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Settings, Save, RotateCcw } from "lucide-react";

interface DashboardSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  visibleMetrics: string[];
  onMetricsChange: (metrics: string[]) => void;
  showConversions: boolean;
  onShowConversionsChange: (show: boolean) => void;
  showActivity: boolean;
  onShowActivityChange: (show: boolean) => void;
}

const availableMetrics = [
  { id: "total-leads", label: "Total de Leads", default: true },
  { id: "conversion-rate", label: "Taxa de Conversão", default: true },
  { id: "closed-sales", label: "Vendas Fechadas", default: true },
  { id: "total-revenue", label: "Receita Total", default: true },
  { id: "whatsapp", label: "WhatsApp Leads", default: true },
  { id: "instagram", label: "Instagram Leads", default: true },
  { id: "avg-deal-size", label: "Ticket Médio", default: false },
  { id: "response-time", label: "Tempo de Resposta", default: false },
  { id: "follow-ups", label: "Follow-ups Pendentes", default: false },
];

export function DashboardSettings({ 
  isOpen, 
  onClose, 
  visibleMetrics, 
  onMetricsChange,
  showConversions,
  onShowConversionsChange,
  showActivity,
  onShowActivityChange
}: DashboardSettingsProps) {
  const [tempMetrics, setTempMetrics] = useState<string[]>(visibleMetrics);
  const [tempShowConversions, setTempShowConversions] = useState(showConversions);
  const [tempShowActivity, setTempShowActivity] = useState(showActivity);

  const handleMetricToggle = (metricId: string, checked: boolean) => {
    if (checked) {
      setTempMetrics([...tempMetrics, metricId]);
    } else {
      setTempMetrics(tempMetrics.filter(id => id !== metricId));
    }
  };

  const handleSave = () => {
    onMetricsChange(tempMetrics);
    onShowConversionsChange(tempShowConversions);
    onShowActivityChange(tempShowActivity);
    onClose();
  };

  const handleReset = () => {
    const defaultMetrics = availableMetrics
      .filter(metric => metric.default)
      .map(metric => metric.id);
    setTempMetrics(defaultMetrics);
    setTempShowConversions(true);
    setTempShowActivity(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md" aria-describedby="dashboard-settings-description">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Configurar Dashboard
          </DialogTitle>
        </DialogHeader>
        
        <div id="dashboard-settings-description" className="sr-only">
          Configure quais métricas serão exibidas no seu dashboard
        </div>
        
        <div className="space-y-6">
          <div>
            <Label className="text-base font-medium mb-4 block">
              Métricas Visíveis
            </Label>
            <div className="space-y-3">
              {availableMetrics.map((metric) => (
                <div key={metric.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={metric.id}
                    checked={tempMetrics.includes(metric.id)}
                    onCheckedChange={(checked) => 
                      handleMetricToggle(metric.id, checked as boolean)
                    }
                  />
                  <Label 
                    htmlFor={metric.id} 
                    className="text-sm font-normal cursor-pointer"
                  >
                    {metric.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Dashboard Sections */}
          <div>
            <Label className="text-base font-medium mb-4 block">
              Seções do Dashboard
            </Label>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="show-conversions"
                  checked={tempShowConversions}
                  onCheckedChange={(checked) => setTempShowConversions(checked as boolean)}
                />
                <Label htmlFor="show-conversions" className="text-sm font-normal cursor-pointer">
                  Conversões por Canal
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="show-activity"
                  checked={tempShowActivity}
                  onCheckedChange={(checked) => setTempShowActivity(checked as boolean)}
                />
                <Label htmlFor="show-activity" className="text-sm font-normal cursor-pointer">
                  Atividade Recente
                </Label>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleReset}
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Restaurar Padrão
            </Button>
            
            <div className="flex gap-2">
              <Button variant="ghost" onClick={onClose}>
                Cancelar
              </Button>
              <Button onClick={handleSave} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Salvar
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}