import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Lead, Column } from "@/types/kanban";
import { Phone, Instagram, Calendar } from "lucide-react";

interface LeadModalProps {
  lead: Lead;
  isOpen: boolean;
  onClose: () => void;
  onSave: (lead: Lead) => void;
  columns: Column[];
}

export function LeadModal({ lead, isOpen, onClose, onSave, columns }: LeadModalProps) {
  const [editedLead, setEditedLead] = useState<Lead>(lead);

  useEffect(() => {
    setEditedLead(lead);
  }, [lead]);

  const handleSave = () => {
    if (!editedLead.name.trim()) {
      return; // Don't save if name is empty
    }
    
    // If it's a new lead (no original ID), generate a proper ID
    const leadToSave = lead.id === editedLead.id && lead.name === "" 
      ? { ...editedLead, id: Date.now().toString() }
      : editedLead;
    
    onSave(leadToSave);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {lead.name ? 'Editar Lead' : 'Novo Lead'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome *</Label>
              <Input
                id="name"
                value={editedLead.name}
                onChange={(e) => setEditedLead({ ...editedLead, name: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company">Empresa</Label>
              <Input
                id="company"
                value={editedLead.company || ""}
                onChange={(e) => setEditedLead({ ...editedLead, company: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="value">Valor (R$)</Label>
              <Input
                id="value"
                type="number"
                value={editedLead.value}
                onChange={(e) => setEditedLead({ ...editedLead, value: Number(e.target.value) })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="temperature">Temperatura</Label>
              <Select
                value={editedLead.temperature}
                onValueChange={(value: "cold" | "warm" | "hot") =>
                  setEditedLead({ ...editedLead, temperature: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cold">❄️ Frio</SelectItem>
                  <SelectItem value="warm">🟡 Morno</SelectItem>
                  <SelectItem value="hot">🔥 Quente</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">WhatsApp</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  className="pl-10"
                  value={editedLead.phone || ""}
                  onChange={(e) => setEditedLead({ ...editedLead, phone: e.target.value })}
                  placeholder="+55 11 99999-9999"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram</Label>
              <div className="relative">
                <Instagram className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="instagram"
                  className="pl-10"
                  value={editedLead.instagram || ""}
                  onChange={(e) => setEditedLead({ ...editedLead, instagram: e.target.value })}
                  placeholder="@username"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Etapa do Funil</Label>
              <Select
                value={editedLead.status}
                onValueChange={(value) => setEditedLead({ ...editedLead, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {columns.map((column) => (
                    <SelectItem key={column.id} value={column.id}>
                      {column.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactDate">Data para Contato</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="contactDate"
                  type="date"
                  className="pl-10"
                  value={editedLead.contactDate || ""}
                  onChange={(e) => setEditedLead({ ...editedLead, contactDate: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Observations */}
          <div className="space-y-2">
            <Label htmlFor="notes">Observações</Label>
            <Textarea
              id="notes"
              placeholder="Adicione observações importantes sobre este lead..."
              value={editedLead.notes || ""}
              onChange={(e) => setEditedLead({ ...editedLead, notes: e.target.value })}
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleSave} className="btn-gradient">
              Salvar Alterações
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}