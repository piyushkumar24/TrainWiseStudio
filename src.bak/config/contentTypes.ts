
export type ContentType = 'fitness' | 'nutrition' | 'mental';

export type ContentData = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  tags: string[];
  header_image?: string;
  blocks: any; // Changed from any[] to any to handle Supabase Json type
  is_draft?: boolean;
  // Fitness specific
  intro?: string;
  target?: string;
  muscle_group_main?: string;
  muscle_group_sub?: string[]; // Changed from string to string[]
  // Nutrition specific
  category?: string;
  allergies?: string[];
  portion_count?: number;
  metrics?: any;
  // Mental specific
  exercise_type?: string;
};

export const contentTypeConfigs = {
  fitness: {
    icon: '🏋️‍♂️',
    title: 'Fitness Exercise',
    color: 'orange',
  },
  nutrition: {
    icon: '🥗',
    title: 'Nutrition Recipe',
    color: 'green',
  },
  mental: {
    icon: '🧘‍♀️',
    title: 'Mental Health Exercise',
    color: 'purple',
  },
};
