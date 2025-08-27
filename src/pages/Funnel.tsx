import { useState } from "react";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import { KanbanBoard } from "@/components/kanban/KanbanBoard";
import { LeadModal } from "@/components/lead/LeadModal";
import { LeadDetailsView } from "@/components/lead/LeadDetailsView";
import { FunnelHeader } from "@/components/funnel/FunnelHeader";
import { FunnelSettings } from "@/components/funnel/FunnelSettings";
import { CreateFunnelModal } from "@/components/funnel/CreateFunnelModal";
import { Lead, Column } from "@/types/kanban";
import { Funnel } from "@/types/funnel";

const initialFunnels: Funnel[] = [
  {
    id: "sales",
    name: "Vendas Diretas",
    description: "Funil principal para vendas diretas",
    color: "#3B82F6",
    isDefault: true,
    createdAt: new Date(),
    columns: [
      { id: "new", title: "Novos Leads", color: "#3B82F6", order: 0 },
      { id: "contacted", title: "Contactados", color: "#F59E0B", order: 1 },
      { id: "qualified", title: "Qualificados", color: "#8B5CF6", order: 2 },
      { id: "proposal", title: "Proposta", color: "#EC4899", order: 3 },
      { id: "closed", title: "Fechados", color: "#10B981", order: 4 },
    ]
  }
];

const initialLeads: Lead[] = [
  {
    id: "1",
    name: "Maria Silva",
    company: "Tech Solutions",
    value: 5000,
    temperature: "hot",
    status: "new",
    phone: "+55 11 99999-9999",
    instagram: "@maria.tech",
    interactions: [
      { date: "2025-01-20T10:30:00Z", description: "Primeiro contato via WhatsApp" },
    ],
    nextActions: "Enviar proposta comercial",
  },
  {
    id: "2",
    name: "João Santos",
    company: "Inovação Digital",
    value: 8500,
    temperature: "warm",
    status: "contacted",
    phone: "+55 11 88888-8888",
    instagram: "@joao.digital",
    interactions: [
      { date: "2025-01-19T14:20:00Z", description: "Ligação realizada, interesse confirmado" },
    ],
    nextActions: "Agendar reunião técnica",
  },
  {
    id: "3",
    name: "Ana Costa",
    company: "",
    value: 2500,
    temperature: "cold",
    status: "qualified",
    phone: "+55 11 77777-7777",
    instagram: "@ana.costa",
    interactions: [],
    nextActions: "Follow-up em 3 dias",
  },
];

const FunnelComponent = () => {
  const [funnels, setFunnels] = useState<Funnel[]>(initialFunnels);
  const [selectedFunnelId, setSelectedFunnelId] = useState("sales");
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isLeadDetailsOpen, setIsLeadDetailsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCreateFunnelOpen, setIsCreateFunnelOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  const currentFunnel = funnels.find(f => f.id === selectedFunnelId) || funnels[0];
  const columns = currentFunnel.columns.map(col => ({ id: col.id, title: col.title, color: col.color }));

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    const leadId = active.id as string;
    const newStatus = over.id as string;

    setLeads((prevLeads) =>
      prevLeads.map((lead) =>
        lead.id === leadId ? { ...lead, status: newStatus } : lead
      )
    );
    
    setActiveId(null);
  };

  const handleLeadClick = (lead: Lead) => {
    setSelectedLead(lead);
    setIsLeadDetailsOpen(true);
  };

  const handleSaveLead = (updatedLead: Lead) => {
    if (updatedLead.name === "" && updatedLead.id === leads.find(l => l.name === "")?.id) {
      // It's a new lead that wasn't saved (empty name)
      return;
    }
    
    setLeads((prevLeads) => {
      // Check if this is a completely new lead
      const existingLeadIndex = prevLeads.findIndex(lead => lead.id === updatedLead.id);
      
      if (existingLeadIndex >= 0) {
        // Update existing lead
        return prevLeads.map((lead) =>
          lead.id === updatedLead.id ? updatedLead : lead
        );
      } else {
        // Add new lead
        return [...prevLeads, updatedLead];
      }
    });
    setIsLeadModalOpen(false);
    setSelectedLead(null);
  };

  const handleSaveFunnel = (updatedFunnel: Funnel) => {
    setFunnels(funnels.map(f => f.id === updatedFunnel.id ? updatedFunnel : f));
  };

  const handleCreateFunnel = (funnelData: any) => {
    const newFunnel: Funnel = {
      id: `funnel-${Date.now()}`,
      name: funnelData.name,
      description: funnelData.description,
      color: funnelData.stages[0]?.color || "#3B82F6",
      isDefault: false,
      createdAt: new Date(),
      columns: funnelData.stages.map((stage: any, index: number) => ({
        id: `${funnelData.name.toLowerCase().replace(/\s+/g, '-')}-${index}`,
        title: stage.title,
        color: stage.color,
        order: index
      }))
    };
    
    setFunnels([...funnels, newFunnel]);
    setSelectedFunnelId(newFunnel.id);
  };

  const handleAddFunnel = () => {
    setIsCreateFunnelOpen(true);
  };

  const activeLeadData = activeId ? leads.find(lead => lead.id === activeId) : null;

  return (
    <div className="h-full flex flex-col absolute inset-0">
      {/* Header fixo que substitui o header do CRMLayout */}
      <div className="flex-shrink-0 h-20 px-6 py-4 bg-background/95 backdrop-blur-md border-b border-border/50 sticky top-0 z-40">
        <FunnelHeader
          selectedFunnel={selectedFunnelId}
          onFunnelChange={setSelectedFunnelId}
          onSettingsClick={() => setIsSettingsOpen(true)}
          onAddFunnel={handleAddFunnel}
          funnels={funnels.map(f => ({ id: f.id, name: f.name }))}
          onAddLead={() => {
            setSelectedLead({
              id: Date.now().toString(),
              name: "",
              company: "",
              value: 0,
              temperature: "warm",
              status: "new",
              phone: "",
              instagram: "",
              interactions: [],
              nextActions: "",
            });
            setIsLeadModalOpen(true);
          }}
        />
      </div>

      {/* Container do Kanban - scroll horizontal isolado */}
      <div className="flex-1 relative">
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <div 
            className="absolute inset-0 overflow-x-auto overflow-y-hidden kanban-scroll-container"
            style={{ 
              paddingLeft: '1.5rem', 
              paddingRight: '1.5rem',
              paddingTop: '1.5rem',
              paddingBottom: '1.5rem'
            }}
          >
            <KanbanBoard
              columns={columns}
              leads={leads}
              onLeadClick={handleLeadClick}
            />
          </div>
          <DragOverlay>
            {activeLeadData && (
              <div className="card-lead opacity-80 rotate-3 shadow-lg z-[9999] pointer-events-none">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-sm">{activeLeadData.name}</h4>
                  <span className="text-xs font-medium text-primary">
                    R$ {activeLeadData.value.toLocaleString()}
                  </span>
                </div>
                {activeLeadData.company && (
                  <p className="text-xs text-muted-foreground mb-2">
                    {activeLeadData.company}
                  </p>
                )}
              </div>
            )}
          </DragOverlay>
        </DndContext>
      </div>

      {selectedLead && (
        <LeadModal
          lead={selectedLead}
          isOpen={isLeadModalOpen}
          onClose={() => {
            setIsLeadModalOpen(false);
            setSelectedLead(null);
          }}
          onSave={handleSaveLead}
          columns={columns}
        />
      )}

      <FunnelSettings
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        currentFunnel={currentFunnel}
        onSave={handleSaveFunnel}
      />

      <CreateFunnelModal
        isOpen={isCreateFunnelOpen}
        onClose={() => setIsCreateFunnelOpen(false)}
        onSave={handleCreateFunnel}
      />
      
      {selectedLead && (
        <LeadDetailsView
          lead={selectedLead}
          isOpen={isLeadDetailsOpen}
          onClose={() => {
            setIsLeadDetailsOpen(false);
            setSelectedLead(null);
          }}
          onEdit={() => {
            setIsLeadDetailsOpen(false);
            setIsLeadModalOpen(true);
          }}
          columns={columns}
        />
      )}
    </div>
  );
};

export default FunnelComponent;