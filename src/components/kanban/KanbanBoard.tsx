import { useDroppable } from "@dnd-kit/core";
import { KanbanColumn } from "./KanbanColumn";
import { Lead, Column } from "@/types/kanban";

interface KanbanBoardProps {
  columns: Column[];
  leads: Lead[];
  onLeadClick: (lead: Lead) => void;
}

export function KanbanBoard({ columns, leads, onLeadClick }: KanbanBoardProps) {
  return (
    <div className="flex gap-6 min-h-full" style={{ width: 'max-content' }}>
      {columns.map((column) => {
        const columnLeads = leads.filter((lead) => lead.status === column.id);
        
        return (
          <KanbanColumn
            key={column.id}
            column={column}
            leads={columnLeads}
            onLeadClick={onLeadClick}
          />
        );
      })}
    </div>
  );
}