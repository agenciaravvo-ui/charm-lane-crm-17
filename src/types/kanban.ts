export interface Lead {
  id: string;
  name: string;
  company?: string;
  value: number;
  temperature: "cold" | "warm" | "hot";
  status: string;
  phone?: string;
  instagram?: string;
  interactions: Interaction[];
  nextActions?: string;
  notes?: string;
  contactDate?: string;
}

export interface Interaction {
  date: string;
  description: string;
}

export interface Column {
  id: string;
  title: string;
  color: string;
}