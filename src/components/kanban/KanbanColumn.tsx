import { useDroppable } from "@dnd-kit/core";
import { LeadCard } from "./LeadCard";
import { Lead, Column } from "@/types/kanban";
import { Plus } from "lucide-react";

interface KanbanColumnProps {
  column: Column;
  leads: Lead[];
  onLeadClick: (lead: Lead) => void;
}

export function KanbanColumn({ column, leads, onLeadClick }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  return (
    <div className="min-w-[320px] flex-shrink-0">
      <div
        ref={setNodeRef}
        className={`kanban-column space-y-4 ${isOver ? 'border-primary/50 bg-primary/5' : ''}`}
      >
        {/* Column Header - Inside the column */}
        <div className="kanban-column-header">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-full shadow-sm"
                style={{ backgroundColor: column.color }}
              />
              <h3 className="font-bold text-base text-foreground">{column.title}</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground bg-muted/80 px-3 py-1 rounded-full">
                {leads.length}
              </span>
            </div>
          </div>
        </div>

        {/* Column Content */}
        <div className="space-y-3">
          {leads.map((lead) => (
            <LeadCard
              key={lead.id}
              lead={lead}
              onClick={() => onLeadClick(lead)}
            />
          ))}
          
          {leads.length === 0 && (
            <div className="text-center py-12 text-muted-foreground text-sm">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center">
                  <Plus className="h-5 w-5" />
                </div>
                <span>Nenhum lead nesta etapa</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}