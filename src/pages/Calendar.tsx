import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Clock, Users } from "lucide-react";

const Calendar = () => {
  const upcomingTasks = [
    {
      id: 1,
      title: "Follow-up com Maria Silva",
      time: "14:30",
      type: "WhatsApp",
      priority: "high",
    },
    {
      id: 2,
      title: "Reunião técnica - João Santos",
      time: "16:00",
      type: "Zoom",
      priority: "medium",
    },
    {
      id: 3,
      title: "Proposta comercial - Ana Costa",
      time: "18:00",
      type: "Email",
      priority: "low",
    },
  ];

  return (
    <div className="space-y-6 p-6 h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Agenda</h1>
          <p className="text-muted-foreground">Gerencie seus compromissos e follow-ups</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Today's Summary */}
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-primary" />
              Hoje
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Tarefas pendentes</span>
                <span className="text-lg font-semibold text-primary">3</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Follow-ups agendados</span>
                <span className="text-lg font-semibold text-warm">2</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Reuniões</span>
                <span className="text-lg font-semibold text-hot">1</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Overview */}
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Esta Semana
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Total de atividades</span>
                <span className="text-lg font-semibold text-primary">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Leads para contatar</span>
                <span className="text-lg font-semibold text-warm">8</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Propostas para enviar</span>
                <span className="text-lg font-semibold text-hot">4</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Activity */}
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Equipe
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Ativo agora</span>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Online</span>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                Última atividade: Follow-up realizado há 5min
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Tasks */}
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle>Próximas Atividades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    task.priority === 'high' ? 'bg-hot' :
                    task.priority === 'medium' ? 'bg-warm' : 'bg-cold'
                  }`} />
                  <div>
                    <h4 className="font-medium text-foreground">{task.title}</h4>
                    <p className="text-sm text-muted-foreground">{task.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-foreground">{task.time}</div>
                  <div className="text-xs text-muted-foreground">Hoje</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Calendar;