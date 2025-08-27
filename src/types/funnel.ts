export interface Funnel {
  id: string;
  name: string;
  description: string;
  color: string;
  isDefault?: boolean;
  createdAt: Date;
  columns: FunnelColumn[];
}

export interface FunnelColumn {
  id: string;
  title: string;
  color: string;
  order: number;
}

export interface DashboardSettings {
  visibleMetrics: string[];
  showConversions: boolean;
  showActivity: boolean;
}