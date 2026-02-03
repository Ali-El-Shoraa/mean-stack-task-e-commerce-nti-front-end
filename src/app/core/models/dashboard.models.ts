// src/app/models/dashboard.models.ts

export interface MenuItem {
  icon: string;
  text: string;
  route: string;
  badge?: number;
  active?: boolean;
}

export interface StatsCard {
  icon: string;
  iconClass: string;
  value: string;
  title: string;
  changePercent: number;
  changeType: 'positive' | 'negative';
}

export interface Order {
  id: string;
  customer: string;
  date: string;
  amount: string;
  status: 'completed' | 'pending' | 'processing' | 'cancelled';
}

export interface Activity {
  type: 'order' | 'user' | 'product';
  icon: string;
  title: string;
  time: string;
}

export interface QuickAction {
  icon: string;
  title: string;
  description: string;
  route: string;
}
