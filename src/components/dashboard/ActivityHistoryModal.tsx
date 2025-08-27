import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Clock, MessageSquare, Target, DollarSign, Phone, Mail, Calendar } from "lucide-react";

interface ActivityHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ActivityHistoryModal({ isOpen, onClose }: ActivityHistoryModalProps) {
  const fullActivityHistory = [
    {
      id: 1,
      time: "14:32",
      type: "lead",
      title: "Novo lead: Maria Silva",
      description: "WhatsApp • Lead quente • R$ 5.000",
      icon: MessageSquare,
      color: "text-hot border-hot/20 bg-hot/5"
    },
    {
      id: 2,
      time: "14:15",
      type: "follow-up",
      title: "Follow-up agendado",
      description: "João Santos • Reunião técnica às 16:00",
      icon: Calendar,
      color: "text-warm border-warm/20 bg-warm/5"
    },
    {
      id: 3,
      time: "13:45",
      type: "sale",
      title: "Venda fechada",
      description: "R$ 2.500 • Ana Costa • Pagamento à vista",
      icon: DollarSign,
      color: "text-primary border-primary/20 bg-primary/5"
    },
    {
      id: 4,
      time: "13:20",
      type: "proposal",
      title: "Proposta enviada",
      description: "Carlos Oliveira • R$ 12.000 • Aguardando resposta",
      icon: Target,
      color: "text-blue-600 border-blue-600/20 bg-blue-600/5"
    },
    {
      id: 5,
      time: "12:55",
      type: "call",
      title: "Ligação realizada",
      description: "Pedro Almeida • 15 min • Interesse confirmado",
      icon: Phone,
      color: "text-green-600 border-green-600/20 bg-green-600/5"
    },
    {
      id: 6,
      time: "12:30",
      type: "email",
      title: "E-mail de follow-up",
      description: "Luiza Santos • Material técnico enviado",
      icon: Mail,
      color: "text-purple-600 border-purple-600/20 bg-purple-600/5"
    },
    {
      id: 7,
      time: "11:45",
      type: "lead",
      title: "Lead qualificado",
      description: "Roberto Silva • Instagram • R$ 8.500",
      icon: MessageSquare,
      color: "text-warm border-warm/20 bg-warm/5"
    },
    {
      id: 8,
      time: "11:20",
      title: "Reunião concluída",
      description: "Fernanda Lima • Apresentação de proposta",
      icon: Calendar,
      color: "text-blue-600 border-blue-600/20 bg-blue-600/5"
    },
    {
      id: 9,
      time: "10:50",
      title: "Follow-up realizado",
      description: "Marcos Costa • Dúvida sobre prazo esclarecida",
      icon: Phone,
      color: "text-green-600 border-green-600/20 bg-green-600/5"
    },
    {
      id: 10,
      time: "10:15",
      title: "Novo lead: Carla Ribeiro",
      description: "WhatsApp • Lead morno • R$ 3.200",
      icon: MessageSquare,
      color: "text-warm border-warm/20 bg-warm/5"
    },
    {
      id: 11,
      time: "09:45",
      title: "Proposta aprovada",
      description: "André Souza • R$ 7.800 • Início na próxima semana",
      icon: Target,
      color: "text-primary border-primary/20 bg-primary/5"
    },
    {
      id: 12,
      time: "09:20",
      title: "E-mail respondido",
      description: "Julia Martins • Solicitou mais informações",
      icon: Mail,
      color: "text-purple-600 border-purple-600/20 bg-purple-600/5"
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-primary" />
            Histórico Completo de Hoje
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-4">
            {fullActivityHistory.map((activity) => (
              <div
                key={activity.id}
                className={`flex items-start gap-4 p-4 rounded-xl border transition-all duration-300 hover:shadow-md ${activity.color}`}
              >
                <div className="flex-shrink-0 mt-0.5">
                  <activity.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium text-foreground text-sm leading-tight">
                        {activity.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                        {activity.description}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs font-medium flex-shrink-0">
                      {activity.time}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}