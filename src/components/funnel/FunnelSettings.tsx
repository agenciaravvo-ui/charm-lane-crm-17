import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Column } from "@/types/kanban";
import { Funnel } from "@/types/funnel";
import { Plus, Trash2, GripVertical, Palette, Settings } from "lucide-react";

interface FunnelSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  currentFunnel: Funnel;
  onSave: (funnel: Funnel) => void;
}

export function FunnelSettings({ isOpen, onClose, currentFunnel, onSave }: FunnelSettingsProps) {
  const [funnelName, setFunnelName] = useState(currentFunnel.name);
  const [description, setDescription] = useState(currentFunnel.description);
  const [stages, setStages] = useState<{ title: string; color: string }[]>(
    currentFunnel.columns.map(col => ({ title: col.title, color: col.color }))
  );

  const handleSave = () => {
    const updatedFunnel: Funnel = {
      ...currentFunnel,
      name: funnelName,
      description,
      columns: stages.map((stage, index) => ({
        id: currentFunnel.columns[index]?.id || `column-${Date.now()}-${index}`,
        title: stage.title,
        color: stage.color,
        order: index
      }))
    };
    
    onSave(updatedFunnel);
    onClose();
  };

  const addStage = () => {
    setStages([...stages, { title: `Etapa ${stages.length + 1}`, color: "#6B7280" }]);
  };

  const removeStage = (index: number) => {
    setStages(stages.filter((_, i) => i !== index));
  };

  const updateStage = (index: number, field: "title" | "color", value: string) => {
    const newStages = [...stages];
    newStages[index] = { ...newStages[index], [field]: value };
    setStages(newStages);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5">
              <Settings className="h-6 w-6 text-primary" />
            </div>
            Configurar Funil
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="funnel-name">Nome do Funil *</Label>
              <Input
                id="funnel-name"
                value={funnelName}
                onChange={(e) => setFunnelName(e.target.value)}
                placeholder="Ex: Vendas Premium, Suporte Técnico..."
                className="h-11"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descreva o objetivo e processo deste funil..."
                rows={3}
              />
            </div>
          </div>

          <Separator />

          {/* Stages Configuration */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GripVertical className="h-4 w-4 text-primary" />
                <Label className="text-base font-semibold">Etapas do Funil</Label>
              </div>
              <Button
                onClick={addStage}
                size="sm"
                variant="outline"
                className="hover:bg-primary/10 hover:text-primary hover:border-primary/50"
              >
                <Plus className="h-4 w-4 mr-1" />
                Adicionar Etapa
              </Button>
            </div>

            <div className="space-y-3">
              {stages.map((stage, index) => (
                <Card key={index} className="border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                      
                      <div className="flex-1 grid grid-cols-2 gap-3">
                        <Input
                          value={stage.title}
                          onChange={(e) => updateStage(index, "title", e.target.value)}
                          placeholder="Nome da etapa"
                        />
                        
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-2 flex-1">
                            <Palette className="h-4 w-4 text-muted-foreground" />
                            <Input
                              type="color"
                              value={stage.color}
                              onChange={(e) => updateStage(index, "color", e.target.value)}
                              className="h-10 w-20 cursor-pointer"
                            />
                            <Badge 
                              variant="outline"
                              style={{ 
                                backgroundColor: `${stage.color}15`,
                                borderColor: `${stage.color}50`,
                                color: stage.color
                              }}
                            >
                              {stage.title || "Etapa"}
                            </Badge>
                          </div>
                          
                          {stages.length > 1 && (
                            <Button
                              onClick={() => removeStage(index)}
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              onClick={handleSave} 
              className="btn-gradient"
              disabled={!funnelName.trim() || stages.length === 0}
            >
              Salvar Configurações
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}