import { useDraggable } from "@dnd-kit/core";
import { Lead } from "@/types/kanban";
import { Badge } from "@/components/ui/badge";

interface LeadCardProps {
  lead: Lead;
  onClick: () => void;
}

export function LeadCard({ lead, onClick }: LeadCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: lead.id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const temperatureClass = {
    cold: "card-lead-cold",
    warm: "card-lead-warm", 
    hot: "card-lead-hot",
  }[lead.temperature];

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={onClick}
      className={`card-lead ${temperatureClass} ${
        isDragging ? "opacity-50 shadow-lg scale-105" : ""
      } transition-all duration-200`}
    >
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-sm text-foreground truncate flex-1 pr-2">
          {lead.name}
        </h4>
        <Badge variant="secondary" className="text-xs font-medium">
          R$ {lead.value.toLocaleString()}
        </Badge>
      </div>
      
      {lead.company && (
        <p className="text-xs text-muted-foreground mb-2 truncate">
          {lead.company}
        </p>
      )}
      
      <div className="flex items-center justify-between">
        <Badge 
          variant="outline" 
          className={`text-xs ${
            lead.temperature === 'hot' ? 'border-hot text-hot' :
            lead.temperature === 'warm' ? 'border-warm text-warm' : 
            'border-cold text-cold'
          }`}
        >
          {lead.temperature === 'hot' ? '🔥 Quente' :
           lead.temperature === 'warm' ? '🟡 Morno' : '❄️ Frio'}
        </Badge>
        
        {lead.interactions.length > 0 && (
          <span className="text-xs text-muted-foreground">
            {lead.interactions.length} interação{lead.interactions.length !== 1 ? 'ões' : ''}
          </span>
        )}
      </div>
    </div>
  );
}