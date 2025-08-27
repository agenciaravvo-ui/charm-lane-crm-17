import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Instagram, Workflow, Settings, ExternalLink } from "lucide-react";

const Integrations = () => {
  const integrations = [
    {
      id: "whatsapp",
      name: "WhatsApp Business",
      description: "Conecte sua conta do WhatsApp Business para receber mensagens",
      icon: MessageSquare,
      connected: true,
      status: "Ativo",
    },
    {
      id: "instagram",
      name: "Instagram Business",
      description: "Gerencie DMs do Instagram diretamente no CRM",
      icon: Instagram,
      connected: true,
      status: "Ativo",
    },
    {
      id: "n8n",
      name: "n8n Automation",
      description: "Conecte com seu servidor n8n para automações avançadas",
      icon: Workflow,
      connected: false,
      status: "Configurar",
    },
  ];

  return (
    <div className="space-y-6 p-6 h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Integrações</h1>
          <p className="text-muted-foreground">Conecte suas plataformas favoritas</p>
        </div>
      </div>

      {/* Integration Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {integrations.map((integration) => (
          <Card key={integration.id} className="card-gradient">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <integration.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{integration.name}</CardTitle>
                    <Badge
                      variant={integration.connected ? "default" : "secondary"}
                      className="mt-1"
                    >
                      {integration.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {integration.description}
              </p>
              <div className="flex gap-2">
                {integration.connected ? (
                  <>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Settings className="h-4 w-4 mr-2" />
                      Configurar
                    </Button>
                    <Button variant="destructive" size="sm">
                      Desconectar
                    </Button>
                  </>
                ) : (
                  <Button className="w-full btn-gradient" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Conectar
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Connected Platforms Stats */}
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle>Estatísticas das Integrações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">892</div>
              <div className="text-sm text-muted-foreground">Mensagens WhatsApp</div>
              <div className="text-xs text-green-600 mt-1">+18% esta semana</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">392</div>
              <div className="text-sm text-muted-foreground">DMs Instagram</div>
              <div className="text-xs text-green-600 mt-1">+5% esta semana</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">24</div>
              <div className="text-sm text-muted-foreground">Automações Ativas</div>
              <div className="text-xs text-muted-foreground mt-1">n8n</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Integrations;