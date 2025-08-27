import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Lead, Column } from "@/types/kanban";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { 
  Phone, 
  Instagram, 
  MessageSquare, 
  Calendar,
  Clock,
  DollarSign,
  Building2,
  User,
  Users,
  Send,
  Edit,
  Trash2,
  Star,
  FileText,
  Mail,
  MapPin,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Plus
} from "lucide-react";

interface LeadDetailsViewProps {
  lead: Lead;
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  columns: Column[];
}

export function LeadDetailsView({ lead, isOpen, onClose, onEdit, columns }: LeadDetailsViewProps) {
  const [newMessage, setNewMessage] = useState("");
  const [newNote, setNewNote] = useState("");
  
  const currentColumn = columns.find(col => col.id === lead.status);
  
  const getTemperatureIcon = (temp: string) => {
    switch (temp) {
      case 'hot': return '🔥';
      case 'warm': return '🟡';
      case 'cold': return '❄️';
      default: return '🟡';
    }
  };
  
  const getTemperatureLabel = (temp: string) => {
    switch (temp) {
      case 'hot': return 'Quente';
      case 'warm': return 'Morno';
      case 'cold': return 'Frio';
      default: return 'Morno';
    }
  };

  // Mock data for demonstration
  const mockConversations = [
    {
      id: 1,
      sender: "lead",
      message: "Olá! Vi o anúncio sobre o serviço de marketing digital. Gostaria de mais informações.",
      timestamp: new Date(Date.now() - 86400000),
      channel: "whatsapp"
    },
    {
      id: 2,
      sender: "agent",
      message: "Olá Maria! Fico feliz pelo seu interesse. Nosso serviço inclui gestão completa de redes sociais, criação de conteúdo e campanhas de tráfego pago. Quando podemos conversar melhor?",
      timestamp: new Date(Date.now() - 82800000),
      channel: "whatsapp"
    },
    {
      id: 3,
      sender: "lead",
      message: "Que ótimo! Podemos marcar para amanhã às 14h?",
      timestamp: new Date(Date.now() - 79200000),
      channel: "whatsapp"
    },
    {
      id: 4,
      sender: "agent",
      message: "Perfeito! Agendado para amanhã às 14h. Vou enviar o link da reunião por aqui.",
      timestamp: new Date(Date.now() - 75600000),
      channel: "whatsapp"
    }
  ];

  const mockActivities = [
    {
      id: 1,
      type: "status_change",
      description: "Lead movido para Qualificados",
      timestamp: new Date(Date.now() - 172800000),
      user: "Sistema"
    },
    {
      id: 2,
      type: "interaction",
      description: "Primeira interação via WhatsApp",
      timestamp: new Date(Date.now() - 86400000),
      user: "João Silva"
    },
    {
      id: 3,
      type: "note",
      description: "Cliente interessado em pacote premium",
      timestamp: new Date(Date.now() - 43200000),
      user: "Maria Santos"
    },
    {
      id: 4,
      type: "task",
      description: "Follow-up agendado",
      timestamp: new Date(),
      user: "Sistema"
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "status_change": return <TrendingUp className="h-4 w-4" />;
      case "interaction": return <MessageSquare className="h-4 w-4" />;
      case "note": return <FileText className="h-4 w-4" />;
      case "task": return <Calendar className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "status_change": return "text-primary";
      case "interaction": return "text-green-600";
      case "note": return "text-blue-600";
      case "task": return "text-warm";
      default: return "text-muted-foreground";
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-4xl p-0">
        <SheetHeader className="px-6 py-6 border-b bg-gradient-to-r from-card via-card to-primary/5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-gradient-to-br from-primary to-primary-glow text-white font-bold">
                  {lead.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <SheetTitle className="text-2xl font-bold">{lead.name}</SheetTitle>
                {lead.company && (
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <Building2 className="h-3 w-3" />
                    {lead.company}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={onEdit}>
                <Edit className="h-4 w-4 mr-1" />
                Editar
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <Badge 
              variant="outline" 
              className="px-3 py-1"
              style={{ 
                backgroundColor: `${currentColumn?.color}10`,
                borderColor: `${currentColumn?.color}50`,
                color: currentColumn?.color
              }}
            >
              {currentColumn?.title}
            </Badge>
            
            <Badge variant="secondary" className="px-3 py-1">
              <DollarSign className="h-3 w-3 mr-1" />
              R$ {lead.value.toLocaleString('pt-BR')}
            </Badge>
            
            <Badge 
              variant="outline" 
              className={`px-3 py-1 ${
                lead.temperature === 'hot' ? 'border-hot text-hot bg-hot/10' :
                lead.temperature === 'warm' ? 'border-warm text-warm bg-warm/10' : 
                'border-cold text-cold bg-cold/10'
              }`}
            >
              {getTemperatureIcon(lead.temperature)} {getTemperatureLabel(lead.temperature)}
            </Badge>
            
            {lead.phone && (
              <Badge variant="outline" className="px-3 py-1">
                <Phone className="h-3 w-3 mr-1" />
                {lead.phone}
              </Badge>
            )}
            
            {lead.instagram && (
              <Badge variant="outline" className="px-3 py-1">
                <Instagram className="h-3 w-3 mr-1" />
                {lead.instagram}
              </Badge>
            )}
          </div>
        </SheetHeader>
        
        <Tabs defaultValue="overview" className="h-[calc(100vh-180px)]">
          <TabsList className="w-full justify-start rounded-none border-b bg-card px-6">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="conversations">Conversas</TabsTrigger>
            <TabsTrigger value="timeline">Linha do Tempo</TabsTrigger>
            <TabsTrigger value="notes">Anotações</TabsTrigger>
            <TabsTrigger value="tasks">Tarefas</TabsTrigger>
          </TabsList>
          
          <ScrollArea className="h-[calc(100vh-240px)]">
            <TabsContent value="overview" className="px-6 py-4 space-y-6">
              {/* Lead Score */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Star className="h-5 w-5 text-warm" />
                    Lead Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Pontuação</span>
                        <span className="text-2xl font-bold text-primary">85/100</span>
                      </div>
                      <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-primary-glow rounded-full"
                          style={{ width: '85%' }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Alto engajamento</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Resposta rápida</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-warm" />
                      <span className="text-sm">Aguardando proposta</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Orçamento aprovado</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Próximas Ações */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Próximas Ações
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-warm/10 border border-warm/20 rounded-lg">
                      <p className="text-sm font-medium">Enviar proposta comercial</p>
                      <p className="text-xs text-muted-foreground mt-1">Prazo: Hoje às 17:00</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm font-medium">Follow-up por telefone</p>
                      <p className="text-xs text-muted-foreground mt-1">Amanhã às 10:00</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm font-medium">Reunião de alinhamento</p>
                      <p className="text-xs text-muted-foreground mt-1">Sexta-feira às 14:00</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Informações Adicionais */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Informações Adicionais
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">maria.silva@techsolutions.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">São Paulo, SP</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Tecnologia / SaaS</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">50-100 funcionários</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="conversations" className="px-6 py-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Histórico de Conversas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mb-4">
                    {mockConversations.map((msg) => (
                      <div 
                        key={msg.id}
                        className={`flex ${msg.sender === 'agent' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[70%] ${
                          msg.sender === 'agent' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted'
                        } rounded-lg p-3`}>
                          <p className="text-sm">{msg.message}</p>
                          <p className={`text-xs mt-1 ${
                            msg.sender === 'agent' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                          }`}>
                            {format(msg.timestamp, "dd/MM 'às' HH:mm", { locale: ptBR })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Digite sua mensagem..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1"
                      rows={3}
                    />
                    <Button className="self-end">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="timeline" className="px-6 py-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Linha do Tempo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockActivities.map((activity, index) => (
                      <div key={activity.id} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className={`p-2 rounded-full ${getActivityColor(activity.type)} bg-current/10`}>
                            <div className={getActivityColor(activity.type)}>
                              {getActivityIcon(activity.type)}
                            </div>
                          </div>
                          {index < mockActivities.length - 1 && (
                            <div className="w-0.5 h-full bg-border mt-2" />
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <p className="text-sm font-medium">{activity.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-muted-foreground">
                              {activity.user}
                            </span>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">
                              {format(activity.timestamp, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notes" className="px-6 py-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Anotações</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mb-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm">Cliente demonstrou interesse específico no pacote premium com foco em gestão de redes sociais.</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Adicionado por João Silva • 2 dias atrás
                      </p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm">Preferência por reuniões virtuais. Disponibilidade nas terças e quintas à tarde.</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Adicionado por Maria Santos • 5 dias atrás
                      </p>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Adicionar nova anotação..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      rows={3}
                    />
                    <Button className="w-full">
                      Adicionar Anotação
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="tasks" className="px-6 py-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tarefas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium line-through text-muted-foreground">
                          Primeiro contato realizado
                        </p>
                        <p className="text-xs text-muted-foreground">Concluído ontem</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-warm/10 border border-warm/20 rounded-lg">
                      <Clock className="h-5 w-5 text-warm" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Enviar proposta comercial</p>
                        <p className="text-xs text-muted-foreground">Vence hoje às 17:00</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Follow-up pós-proposta</p>
                        <p className="text-xs text-muted-foreground">Agendado para amanhã</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-4" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Tarefa
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}

