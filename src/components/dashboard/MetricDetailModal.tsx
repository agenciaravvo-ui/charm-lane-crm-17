import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Target, 
  MessageSquare,
  BarChart3,
  Clock,
  UserCheck,
  ArrowUpRight,
  ArrowDownRight,
  Calendar
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface MetricDetail {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: any;
  details?: DetailItem[];
  summary?: string;
}

interface DetailItem {
  id: string;
  label: string;
  value: string | number;
  date?: string;
  status?: "success" | "pending" | "warning";
  description?: string;
  change?: string;
  metadata?: Record<string, any>;
}

interface MetricDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  metric: MetricDetail | null;
}

const getMetricDetails = (metricId: string): DetailItem[] => {
  const detailsMap: Record<string, DetailItem[]> = {
    "total-revenue": [
      {
        id: "1",
        label: "Maria Silva - Tech Solutions",
        value: "R$ 15.000",
        date: new Date().toISOString(),
        status: "success",
        description: "Pacote Premium - Marketing Digital",
        change: "+12%",
        metadata: { source: "WhatsApp", funnel: "Vendas Diretas" }
      },
      {
        id: "2",
        label: "João Santos - Inovação Digital",
        value: "R$ 8.500",
        date: new Date(Date.now() - 86400000).toISOString(),
        status: "success",
        description: "Consultoria Estratégica",
        change: "+5%",
        metadata: { source: "Instagram", funnel: "Marketing" }
      },
      {
        id: "3",
        label: "Ana Costa - StartUp XYZ",
        value: "R$ 12.000",
        date: new Date(Date.now() - 172800000).toISOString(),
        status: "pending",
        description: "Proposta em Negociação",
        change: "+8%",
        metadata: { source: "WhatsApp", funnel: "Vendas Diretas" }
      },
      {
        id: "4",
        label: "Carlos Oliveira - Empresa ABC",
        value: "R$ 22.000",
        date: new Date(Date.now() - 259200000).toISOString(),
        status: "success",
        description: "Contrato Anual - Gestão Completa",
        change: "+15%",
        metadata: { source: "WhatsApp", funnel: "Enterprise" }
      },
      {
        id: "5",
        label: "Beatriz Lima - E-commerce Plus",
        value: "R$ 6.900",
        date: new Date(Date.now() - 345600000).toISOString(),
        status: "success",
        description: "Setup + 3 meses de gestão",
        change: "+3%",
        metadata: { source: "Instagram", funnel: "Marketing" }
      },
      {
        id: "6",
        label: "Pedro Souza - Consulting Group",
        value: "R$ 25.000",
        date: new Date(Date.now() - 432000000).toISOString(),
        status: "success",
        description: "Projeto Transformação Digital",
        change: "+20%",
        metadata: { source: "WhatsApp", funnel: "Enterprise" }
      }
    ],
    "total-leads": [
      {
        id: "1",
        label: "WhatsApp - Leads Quentes",
        value: 458,
        status: "success",
        description: "Leads com alta intenção de compra",
        change: "+18%",
        metadata: { temperature: "hot", conversion: "32%" }
      },
      {
        id: "2",
        label: "Instagram - Leads Mornos",
        value: 326,
        status: "warning",
        description: "Leads em processo de qualificação",
        change: "+12%",
        metadata: { temperature: "warm", conversion: "18%" }
      },
      {
        id: "3",
        label: "Website - Formulários",
        value: 245,
        status: "pending",
        description: "Leads de formulário de contato",
        change: "+5%",
        metadata: { temperature: "cold", conversion: "8%" }
      },
      {
        id: "4",
        label: "Facebook Ads",
        value: 189,
        status: "warning",
        description: "Leads de campanhas pagas",
        change: "+22%",
        metadata: { temperature: "warm", conversion: "15%" }
      },
      {
        id: "5",
        label: "Indicações",
        value: 66,
        status: "success",
        description: "Leads por indicação de clientes",
        change: "+35%",
        metadata: { temperature: "hot", conversion: "45%" }
      }
    ],
    "conversion-rate": [
      {
        id: "1",
        label: "Funil de Vendas Diretas",
        value: "32.5%",
        status: "success",
        description: "Taxa de conversão WhatsApp",
        change: "+5.2%",
        metadata: { leads: 458, converted: 149 }
      },
      {
        id: "2",
        label: "Funil de Marketing",
        value: "18.3%",
        status: "warning",
        description: "Taxa de conversão Instagram",
        change: "+2.1%",
        metadata: { leads: 326, converted: 60 }
      },
      {
        id: "3",
        label: "Funil Enterprise",
        value: "45.8%",
        status: "success",
        description: "Taxa de conversão Indicações",
        change: "+8.3%",
        metadata: { leads: 66, converted: 30 }
      },
      {
        id: "4",
        label: "Funil Inbound",
        value: "12.4%",
        status: "pending",
        description: "Taxa de conversão Website",
        change: "-1.2%",
        metadata: { leads: 245, converted: 30 }
      }
    ],
    "closed-sales": [
      {
        id: "1",
        label: "Maria Silva",
        value: "R$ 15.000",
        date: new Date().toISOString(),
        status: "success",
        description: "Fechamento após 5 interações"
      },
      {
        id: "2",
        label: "João Santos",
        value: "R$ 8.500",
        date: new Date(Date.now() - 86400000).toISOString(),
        status: "success",
        description: "Fechamento em 3 dias"
      },
      {
        id: "3",
        label: "Carlos Oliveira",
        value: "R$ 22.000",
        date: new Date(Date.now() - 172800000).toISOString(),
        status: "success",
        description: "Negociação de 2 semanas"
      },
      {
        id: "4",
        label: "Beatriz Lima",
        value: "R$ 6.900",
        date: new Date(Date.now() - 259200000).toISOString(),
        status: "success",
        description: "Venda rápida - 24h"
      }
    ],
    "whatsapp": [
      {
        id: "1",
        label: "Conversas Ativas",
        value: 234,
        status: "success",
        description: "Leads em conversação ativa",
        metadata: { responseTime: "2.3min", satisfaction: "4.8/5" }
      },
      {
        id: "2",
        label: "Mensagens Hoje",
        value: 892,
        status: "success",
        description: "Total de mensagens trocadas",
        change: "+18%"
      },
      {
        id: "3",
        label: "Taxa de Resposta",
        value: "98%",
        status: "success",
        description: "Mensagens respondidas em 24h"
      },
      {
        id: "4",
        label: "Leads Qualificados",
        value: 156,
        status: "warning",
        description: "Prontos para proposta",
        metadata: { conversion: "32%" }
      }
    ],
    "instagram": [
      {
        id: "1",
        label: "DMs Recebidas",
        value: 145,
        status: "success",
        description: "Mensagens diretas hoje",
        change: "+12%"
      },
      {
        id: "2",
        label: "Stories Replies",
        value: 89,
        status: "warning",
        description: "Respostas aos stories",
        change: "+5%"
      },
      {
        id: "3",
        label: "Comentários",
        value: 158,
        status: "success",
        description: "Interações em posts",
        change: "+8%"
      }
    ]
  };

  return detailsMap[metricId] || [];
};

export function MetricDetailModal({ isOpen, onClose, metric }: MetricDetailModalProps) {
  if (!metric) return null;

  const details = getMetricDetails(metric.id);
  const Icon = metric.icon;

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "success":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "warning":
        return "bg-warm/10 text-warm border-warm/20";
      case "pending":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[85vh]" aria-describedby="metric-detail-description">
        <DialogHeader className="pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold">{metric.title}</DialogTitle>
                <p id="metric-detail-description" className="text-sm text-muted-foreground mt-1">
                  Detalhamento e origem dos valores
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-foreground mb-1">{metric.value}</div>
              <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                metric.trend === 'up' 
                  ? 'bg-green-500/10 text-green-600 border border-green-500/20' 
                  : 'bg-red-500/10 text-red-600 border border-red-500/20'
              }`}>
                {metric.trend === 'up' ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : (
                  <ArrowDownRight className="h-3 w-3" />
                )}
                {metric.change}
              </div>
            </div>
          </div>
        </DialogHeader>

        <Separator />

        <ScrollArea className="h-[calc(85vh-200px)] pr-4">
          <div className="space-y-4 py-4">
            {details.map((item) => (
              <Card key={item.id} className="group hover:shadow-lg transition-all duration-300 border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <h4 className="font-semibold text-foreground">{item.label}</h4>
                        {item.status && (
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getStatusColor(item.status)}`}
                          >
                            {item.status === "success" ? "Concluído" : 
                             item.status === "pending" ? "Pendente" : "Atenção"}
                          </Badge>
                        )}
                      </div>
                      
                      {item.description && (
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      )}
                      
                      {item.metadata && (
                        <div className="flex flex-wrap gap-3 pt-2">
                          {Object.entries(item.metadata).map(([key, value]) => (
                            <div key={key} className="flex items-center gap-1">
                              <span className="text-xs text-muted-foreground capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}:
                              </span>
                              <span className="text-xs font-medium text-foreground">
                                {String(value)}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {item.date && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {format(new Date(item.date), "dd 'de' MMMM 'às' HH:mm", { locale: ptBR })}
                        </div>
                      )}
                    </div>
                    
                    <div className="text-right space-y-1">
                      <div className="text-lg font-bold text-foreground">
                        {typeof item.value === 'number' && !String(item.value).includes('%') 
                          ? item.value.toLocaleString() 
                          : item.value}
                      </div>
                      {item.change && (
                        <div className={`text-xs font-medium ${
                          item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {item.change}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {metric.id === "conversion-rate" && item.metadata && (
                    <div className="mt-4 pt-4 border-t border-border/50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-muted-foreground">Taxa de Conversão</span>
                        <span className="text-xs font-medium">
                          {item.metadata.converted} de {item.metadata.leads} leads
                        </span>
                      </div>
                      <Progress 
                        value={parseFloat(String(item.value))} 
                        className="h-2"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}