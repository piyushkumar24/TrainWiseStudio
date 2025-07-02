
export interface Client {
  id: string;
  name: string;
  email: string;
  program_type: string;
  last_activity: string;
  status: 'missing-program' | 'on-track' | 'waiting-feedback' | 'off-track' | 'leaver' | 'non-active' | 'new-comer' | 'needs-follow-up' | 'program-expired';
  urgency: 'high' | 'medium' | 'low';
  created_at: string;
  progress_percentage?: number;
  plan_types?: string[];
  goals?: string[];
}

export interface FilterOption {
  key: string;
  label: string;
  icon: any;
  count: number;
  color: string;
}
