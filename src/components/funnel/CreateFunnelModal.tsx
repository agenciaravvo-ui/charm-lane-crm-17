import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Target, 
  Plus, 
  Trash2, 
  GripVertical,
  Palette,
  Sparkles,
  TrendingUp,
  Users,
  Zap
} from "lucide-react";

interface CreateFunnelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (funnel: any) => void;
}

const funnelTemplates = [
  {
    id: "sales",
    name: "Vendas B2B",
    description: "Ideal para vendas complexas com múltiplos pontos de contato",
    icon: TrendingUp,
    color: "#3B82F6",
    stages: [
      { title: "Prospecção", color: "#6B7280" },
      { title: "Qualificação", color: "#3B82F6" },
      { title: "Proposta", color: "#8B5CF6" },
      { title: "Negociação", color: "#F59E0B" },
      { title: "Fechamento", color: "#10B981" }
    ]
  },
  {
    id: "marketing",
    name: "Marketing Digital",
    description: "Perfeito para nutrição de leads e conversão online",
    icon: Zap,
    color: "#EC4899",
    stages: [
      { title: "Visitante", color: "#6B7280" },
      { title: "Lead", color: "#3B82F6" },
      { title: "Lead Qualificado", color: "#8B5CF6" },
      { title: "Oportunidade", color: "#EC4899" },
      { title: "Cliente", color: "#10B981" }
    ]
  },
  {
    id: "support",
    name: "Atendimento ao Cliente",
    description: "Gerencie tickets e solicitações de suporte",
    icon: Users,
    color: "#F59E0B",
    stages: [
      { title: "Novo Ticket", color: "#EF4444" },
      { title: "Em Análise", color: "#F59E0B" },
      { title: "Em Progresso", color: "#3B82F6" },
      { title: "Aguardando Cliente", color: "#6B7280" },
      { title: "Resolvido", color: "#10B981" }
    ]
  }
];

export function CreateFunnelModal({ isOpen, onClose, onSave }: CreateFunnelModalProps) {
  const [funnelName, setFunnelName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [stages, setStages] = useState<{ title: string; color: string }[]>([
    { title: "Novo", color: "#3B82F6" },
    { title: "Em Progresso", color: "#F59E0B" },
    { title: "Concluído", color: "#10B981" }
  ]);

  const handleTemplateSelect = (template: typeof funnelTemplates[0]) => {
    setSelectedTemplate(template.id);
    setFunnelName(template.name);
    setDescription(template.description);
    setStages([...template.stages]);
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

  const handleSave = () => {
    if (!funnelName.trim() || stages.length === 0) return;
    
    onSave({
      name: funnelName,
      description,
      stages,
      template: selectedTemplate
    });
    
    // Reset form
    setFunnelName("");
    setDescription("");
    setSelectedTemplate(null);
    setStages([
      { title: "Novo", color: "#3B82F6" },
      { title: "Em Progresso", color: "#F59E0B" },
      { title: "Concluído", color: "#10B981" }
    ]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5">
              <Target className="h-6 w-6 text-primary" />
            </div>
            Criar Novo Funil
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Templates */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <Label className="text-base font-semibold">Escolha um Template</Label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {funnelTemplates.map((template) => {
                const Icon = template.icon;
                return (
                  <Card 
                    key={template.id}
                    className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                      selectedTemplate === template.id 
                        ? 'ring-2 ring-primary bg-primary/5' 
                        : 'hover:border-primary/50'
                    }`}
                    onClick={() => handleTemplateSelect(template)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div 
                          className="p-2 rounded-lg"
                          style={{ backgroundColor: `${template.color}15` }}
                        >
                          <Icon className="h-5 w-5" style={{ color: template.color }} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{template.name}</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {template.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <Separator />

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
              Criar Funil
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}