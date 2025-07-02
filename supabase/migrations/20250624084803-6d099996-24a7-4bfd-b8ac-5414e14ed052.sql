
-- Create programs table to track coaching programs
CREATE TABLE public.programs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  coach_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT DEFAULT 'fitness', -- fitness, nutrition, wellness
  status TEXT DEFAULT 'draft', -- draft, published, archived
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create program assignments table to track which clients have which programs
CREATE TABLE public.program_assignments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  program_id UUID REFERENCES public.programs(id) ON DELETE CASCADE NOT NULL,
  client_id UUID REFERENCES auth.users NOT NULL,
  assigned_by UUID REFERENCES auth.users NOT NULL,
  assigned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'active', -- active, completed, expired, cancelled
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create client activities table to track engagement
CREATE TABLE public.client_activities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES auth.users NOT NULL,
  activity_type TEXT NOT NULL, -- login, workout_log, check_in, feedback
  activity_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.program_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_activities ENABLE ROW LEVEL SECURITY;

-- RLS policies for programs (coaches can manage their own programs)
CREATE POLICY "Coaches can view their own programs" 
  ON public.programs 
  FOR SELECT 
  USING (coach_id = auth.uid());

CREATE POLICY "Coaches can create programs" 
  ON public.programs 
  FOR INSERT 
  WITH CHECK (coach_id = auth.uid());

CREATE POLICY "Coaches can update their own programs" 
  ON public.programs 
  FOR UPDATE 
  USING (coach_id = auth.uid());

-- RLS policies for program assignments (coaches can manage assignments they created)
CREATE POLICY "Coaches can view assignments they made" 
  ON public.program_assignments 
  FOR SELECT 
  USING (assigned_by = auth.uid());

CREATE POLICY "Coaches can create assignments" 
  ON public.program_assignments 
  FOR INSERT 
  WITH CHECK (assigned_by = auth.uid());

CREATE POLICY "Coaches can update assignments they made" 
  ON public.program_assignments 
  FOR UPDATE 
  USING (assigned_by = auth.uid());

-- RLS policies for client activities (coaches can view activities of their assigned clients)
CREATE POLICY "Coaches can view their clients' activities" 
  ON public.client_activities 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.program_assignments pa 
      WHERE pa.client_id = client_activities.client_id 
      AND pa.assigned_by = auth.uid()
    )
  );

-- Create updated_at trigger for programs
CREATE OR REPLACE TRIGGER update_programs_updated_at
  BEFORE UPDATE ON public.programs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create updated_at trigger for program_assignments
CREATE OR REPLACE TRIGGER update_program_assignments_updated_at
  BEFORE UPDATE ON public.program_assignments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
