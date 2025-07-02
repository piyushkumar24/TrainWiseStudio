
-- Create feedback table for coach-client feedback history
CREATE TABLE public.feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  coach_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  feedback_type TEXT DEFAULT 'general',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create check_ins table for client check-in data
CREATE TABLE public.check_ins (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  check_in_type TEXT NOT NULL, -- 'fitness', 'nutrition', 'mental'
  data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create progression table for tracking client metrics
CREATE TABLE public.progression (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  coach_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  metric_type TEXT NOT NULL, -- 'weight', 'body_fat', 'measurements', etc.
  value NUMERIC NOT NULL,
  unit TEXT NOT NULL,
  notes TEXT,
  recorded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create follow_ups table for coach follow-up scheduling
CREATE TABLE public.follow_ups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  coach_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  notes TEXT,
  due_date TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'completed', 'cancelled'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all new tables
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.check_ins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progression ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.follow_ups ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for feedback table
CREATE POLICY "Coaches can view feedback they sent"
  ON public.feedback FOR SELECT
  USING (auth.uid() = coach_id);

CREATE POLICY "Clients can view feedback they received"
  ON public.feedback FOR SELECT
  USING (auth.uid() = client_id);

CREATE POLICY "Coaches can create feedback"
  ON public.feedback FOR INSERT
  WITH CHECK (auth.uid() = coach_id);

-- Create RLS policies for check_ins table
CREATE POLICY "Clients can manage their own check-ins"
  ON public.check_ins FOR ALL
  USING (auth.uid() = client_id);

CREATE POLICY "Coaches can view client check-ins"
  ON public.check_ins FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.program_assignments pa
      WHERE pa.client_id = check_ins.client_id
      AND pa.assigned_by = auth.uid()
    )
  );

-- Create RLS policies for progression table
CREATE POLICY "Clients can manage their own progression"
  ON public.progression FOR ALL
  USING (auth.uid() = client_id);

CREATE POLICY "Coaches can view and update client progression"
  ON public.progression FOR ALL
  USING (
    auth.uid() = coach_id OR
    EXISTS (
      SELECT 1 FROM public.program_assignments pa
      WHERE pa.client_id = progression.client_id
      AND pa.assigned_by = auth.uid()
    )
  );

-- Create RLS policies for follow_ups table
CREATE POLICY "Coaches can manage their own follow-ups"
  ON public.follow_ups FOR ALL
  USING (auth.uid() = coach_id);

CREATE POLICY "Clients can view follow-ups assigned to them"
  ON public.follow_ups FOR SELECT
  USING (auth.uid() = client_id);

-- Add indexes for performance
CREATE INDEX idx_feedback_coach_id ON public.feedback(coach_id);
CREATE INDEX idx_feedback_client_id ON public.feedback(client_id);
CREATE INDEX idx_check_ins_client_id ON public.check_ins(client_id);
CREATE INDEX idx_progression_client_id ON public.progression(client_id);
CREATE INDEX idx_follow_ups_coach_id ON public.follow_ups(coach_id);
CREATE INDEX idx_follow_ups_client_id ON public.follow_ups(client_id);
