export interface Earning {
    id: string;
    userId: string; // NOTE: Added for flattened structure
    date: string; // NOTE: Consider using Date object later
    total_cut: number;
    gross_revenue: number;
    period: string;
    shift: string;
    role: string;
    models: string; // TODO: string[] for multiple models
    hours_worked: number;
  }