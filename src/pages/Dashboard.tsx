import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DashboardSettings } from "@/components/dashboard/DashboardSettings";
import { MetricDetailModal } from "@/components/dashboard/MetricDetailModal";
import { ActivityHistoryModal } from "@/components/dashboard/ActivityHistoryModal";
import { BarChart3, Users, TrendingUp, Target, DollarSign, MessageSquare, Settings, Clock, UserCheck } from "lucide-react";

const Dashboard = () => {
  const [selectedFunnel, setSelectedFunnel] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("7days");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<any>(null);
  const [isMetricModalOpen, setIsMetricModalOpen] = useState(false);
  const [visibleMetrics, setVisibleMetrics] = useState([
    "total-leads", "conversion-rate", "closed-sales", "total-revenue", "whatsapp", "instagram"
  ]);
  const [showConversions, setShowConversions] = useState(true);
  const [showActivity, setShowActivity] = useState(true);
  const [isActivityHistoryOpen, setIsActivityHistoryOpen] = useState(false);

  const allMetrics = [
    {
      id: "total-leads",
      title: "Total de Leads",
      value: "1,284",
      change: "+12%",
      trend: "up",
      icon: Users,
    },
    {
      id: "conversion-rate",
      title: "Taxa de Conversão",
      value: "24.8%",
      change: "+3.2%",
      trend: "up",
      icon: TrendingUp,
    },
    {
      id: "closed-sales",
      title: "Vendas Fechadas",
      value: "47",
      change: "+8%",
      trend: "up",
      icon: Target,
    },
    {
      id: "total-revenue",
      title: "Receita Total",
      value: "R$ 89.400",
      change: "+15%",
      trend: "up",
      icon: DollarSign,
    },
    {
      id: "whatsapp",
      title: "WhatsApp",
      value: "892",
      change: "+18%",
      trend: "up",
      icon: MessageSquare,
    },
    {
      id: "instagram",
      title: "Instagram",
      value: "392",
      change: "+5%",
      trend: "up",
      icon: BarChart3,
    },
    {
      id: "avg-deal-size",
      title: "Ticket Médio",
      value: "R$ 1.902",
      change: "+7%",
      trend: "up",
      icon: Target,
    },
    {
      id: "response-time",
      title: "Tempo de Resposta",
      value: "2.3min",
      change: "-12%",
      trend: "down",
      icon: Clock,
    },
    {
      id: "follow-ups",
      title: "Follow-ups Pendentes",
      value: "23",
      change: "+3",
      trend: "up",
      icon: UserCheck,
    },
  ];

  const visibleMetricsData = allMetrics.filter(metric => visibleMetrics.includes(metric.id));

  const handleMetricClick = (metric: any) => {
    setSelectedMetric(metric);
    setIsMetricModalOpen(true);
  };

  return (
    <div className="h-full bg-gradient-to-br from-background via-background to-primary/5 p-6">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-3xl p-8 mb-8 border border-primary/10">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-8 bg-gradient-to-b from-primary to-primary-glow rounded-full"></div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Dashboard
                </h1>
              </div>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Acompanhe o desempenho dos seus funis de vendas e otimize suas conversões em tempo real.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Funil</label>
                <Select value={selectedFunnel} onValueChange={setSelectedFunnel}>
                  <SelectTrigger className="w-[240px] h-12 bg-card/50 backdrop-blur-sm border-border/50 shadow-sm hover:border-primary/50 hover:bg-card/80 transition-all duration-300">
                    <SelectValue placeholder="Selecionar funil" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover/95 backdrop-blur-md border-border/50 shadow-2xl">
                    <SelectItem value="all" className="cursor-pointer hover:bg-accent/50">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-muted-foreground"></div>
                        Todos os Funis
                      </div>
                    </SelectItem>
                    <SelectItem value="sales" className="cursor-pointer hover:bg-accent/50">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        Vendas Diretas
                      </div>
                    </SelectItem>
                    <SelectItem value="marketing" className="cursor-pointer hover:bg-accent/50">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        Marketing
                      </div>
                    </SelectItem>
                    <SelectItem value="support" className="cursor-pointer hover:bg-accent/50">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                        Suporte
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Período</label>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-[240px] h-12 bg-card/50 backdrop-blur-sm border-border/50 shadow-sm hover:border-primary/50 hover:bg-card/80 transition-all duration-300">
                    <SelectValue placeholder="Selecionar período" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover/95 backdrop-blur-md border-border/50 shadow-2xl">
                    <SelectItem value="today" className="cursor-pointer hover:bg-accent/50">Hoje</SelectItem>
                    <SelectItem value="7days" className="cursor-pointer hover:bg-accent/50">Últimos 7 dias</SelectItem>
                    <SelectItem value="30days" className="cursor-pointer hover:bg-accent/50">Últimos 30 dias</SelectItem>
                    <SelectItem value="90days" className="cursor-pointer hover:bg-accent/50">Últimos 90 dias</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsSettingsOpen(true)}
                  className="h-12 px-6 bg-card/50 backdrop-blur-sm border-border/50 hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all duration-300 shadow-sm"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Configurar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Grid - Oscar-worthy cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {visibleMetricsData.map((metric, index) => (
          <Card 
            key={metric.id} 
            className="group relative overflow-hidden bg-gradient-to-br from-card via-card to-card/50 border-border/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 cursor-pointer"
            onClick={() => handleMetricClick(metric)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
            
            <CardHeader className="relative z-10 flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-sm font-semibold text-muted-foreground/80 group-hover:text-muted-foreground transition-colors">
                {metric.title}
              </CardTitle>
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                <metric.icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
            </CardHeader>
            
            <CardContent className="relative z-10 pt-0">
              <div className="text-3xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                {metric.value}
              </div>
              <div className="flex items-center gap-2">
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                  metric.trend === 'up' 
                    ? 'bg-green-500/10 text-green-600 border border-green-500/20' 
                    : 'bg-red-500/10 text-red-600 border border-red-500/20'
                }`}>
                  <TrendingUp className={`h-3 w-3 ${metric.trend === 'down' ? 'rotate-180' : ''}`} />
                  {metric.change}
                </div>
                <span className="text-xs text-muted-foreground">vs período anterior</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Advanced Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Conversions Chart */}
        {showConversions && (
          <Card className="group relative overflow-hidden bg-gradient-to-br from-card via-card to-card/50 border-border/50 shadow-lg hover:shadow-xl transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <CardHeader className="relative z-10 pb-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold text-foreground flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
                Conversões por Canal
              </CardTitle>
              <div className="text-sm text-muted-foreground">70% + 30%</div>
            </div>
          </CardHeader>
          
          <CardContent className="relative z-10 space-y-6">
            <div className="space-y-4">
              <div className="group/item">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-foreground">WhatsApp</span>
                  </div>
                  <span className="text-sm font-semibold text-foreground">70%</span>
                </div>
                <div className="w-full h-3 bg-muted/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full group-hover/item:from-green-400 group-hover/item:to-green-300 transition-all duration-500 shadow-sm"
                    style={{ width: '70%' }}
                  ></div>
                </div>
              </div>
              
              <div className="group/item">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="h-4 w-4 text-primary" />
                    <span className="font-medium text-foreground">Instagram</span>
                  </div>
                  <span className="text-sm font-semibold text-foreground">30%</span>
                </div>
                <div className="w-full h-3 bg-muted/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-primary-glow rounded-full group-hover/item:from-primary-glow group-hover/item:to-primary transition-all duration-500 shadow-sm"
                    style={{ width: '30%' }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-border/50">
              <div className="text-sm text-muted-foreground">
                <strong className="text-foreground">Total de conversões:</strong> 1,284 leads este mês
              </div>
            </div>
          </CardContent>
        </Card>
        )}

        {/* Activity Feed */}
        {showActivity && (
          <Card className="group relative overflow-hidden bg-gradient-to-br from-card via-card to-card/50 border-border/50 shadow-lg hover:shadow-xl transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <CardHeader className="relative z-10 pb-6">
            <CardTitle className="text-xl font-bold text-foreground flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              Atividade Recente
            </CardTitle>
          </CardHeader>
          
          <CardContent className="relative z-10">
            <div className="space-y-4">
              <div className="group/activity flex items-start gap-4 p-4 bg-gradient-to-r from-green-500/5 to-transparent rounded-xl border border-green-500/10 hover:from-green-500/10 hover:border-green-500/20 transition-all duration-300">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-hot to-red-400 mt-1.5 shadow-sm"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">Novo lead: Maria Silva</p>
                  <p className="text-xs text-muted-foreground">WhatsApp • Lead quente • R$ 5.000</p>
                </div>
                <span className="text-xs text-muted-foreground font-medium">2min</span>
              </div>
              
              <div className="group/activity flex items-start gap-4 p-4 bg-gradient-to-r from-warm/5 to-transparent rounded-xl border border-warm/10 hover:from-warm/10 hover:border-warm/20 transition-all duration-300">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-warm to-yellow-400 mt-1.5 shadow-sm"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">Follow-up agendado</p>
                  <p className="text-xs text-muted-foreground">João Santos • Reunião técnica</p>
                </div>
                <span className="text-xs text-muted-foreground font-medium">5min</span>
              </div>
              
              <div className="group/activity flex items-start gap-4 p-4 bg-gradient-to-r from-primary/5 to-transparent rounded-xl border border-primary/10 hover:from-primary/10 hover:border-primary/20 transition-all duration-300">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-primary-glow mt-1.5 shadow-sm"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">Venda fechada</p>
                  <p className="text-xs text-muted-foreground">R$ 2.500 • Ana Costa</p>
                </div>
                <span className="text-xs text-muted-foreground font-medium">1h</span>
              </div>
              
              <div className="group/activity flex items-start gap-4 p-4 bg-gradient-to-r from-blue-500/5 to-transparent rounded-xl border border-blue-500/10 hover:from-blue-500/10 hover:border-blue-500/20 transition-all duration-300">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 mt-1.5 shadow-sm"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">Proposta enviada</p>
                  <p className="text-xs text-muted-foreground">Carlos Oliveira • R$ 12.000</p>
                </div>
                <span className="text-xs text-muted-foreground font-medium">2h</span>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-border/50">
              <Button 
                variant="ghost" 
                className="w-full text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all duration-200"
                onClick={() => setIsActivityHistoryOpen(true)}
              >
                Ver todas as atividades
              </Button>
            </div>
          </CardContent>
        </Card>
        )}
      </div>

      {/* Dashboard Settings Modal */}
      <DashboardSettings
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        visibleMetrics={visibleMetrics}
        onMetricsChange={setVisibleMetrics}
        showConversions={showConversions}
        onShowConversionsChange={setShowConversions}
        showActivity={showActivity}
        onShowActivityChange={setShowActivity}
      />
      
      {/* Metric Detail Modal */}
      <MetricDetailModal
        isOpen={isMetricModalOpen}
        onClose={() => {
          setIsMetricModalOpen(false);
          setSelectedMetric(null);
        }}
        metric={selectedMetric}
      />

      {/* Activity History Modal */}
      <ActivityHistoryModal
        isOpen={isActivityHistoryOpen}
        onClose={() => setIsActivityHistoryOpen(false)}
      />
    </div>
  );
};

export default Dashboard;