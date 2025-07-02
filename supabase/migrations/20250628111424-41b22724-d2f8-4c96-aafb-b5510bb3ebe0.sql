
-- Update existing programs table to support the new state-driven system
ALTER TABLE public.programs 
ADD COLUMN IF NOT EXISTS state TEXT DEFAULT 'draft' CHECK (state IN ('draft', 'saved', 'assigned', 'in_shop')),
ADD COLUMN IF NOT EXISTS header_image TEXT,
ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS client_id UUID REFERENCES auth.users(id),
ADD COLUMN IF NOT EXISTS assigned_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS in_shop_price DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS in_shop_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS personal_message TEXT,
ADD COLUMN IF NOT EXISTS guidance_text TEXT,
ADD COLUMN IF NOT EXISTS pro_tip TEXT,
ADD COLUMN IF NOT EXISTS avoidance_text TEXT,
ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'fitness' CHECK (category IN ('fitness', 'nutrition', 'mental'));

-- Update existing data to use new column names
UPDATE public.programs SET category = type WHERE category IS NULL;
UPDATE public.programs SET state = status WHERE state = 'draft';

-- Create program_weeks table
CREATE TABLE IF NOT EXISTS public.program_weeks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  program_id UUID REFERENCES public.programs(id) ON DELETE CASCADE NOT NULL,
  week_number INTEGER NOT NULL,
  title TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(program_id, week_number)
);

-- Create program_days table
CREATE TABLE IF NOT EXISTS public.program_days (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  week_id UUID REFERENCES public.program_weeks(id) ON DELETE CASCADE NOT NULL,
  day_number INTEGER NOT NULL,
  day_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(week_id, day_number)
);

-- Create program_blocks table
CREATE TABLE IF NOT EXISTS public.program_blocks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  day_id UUID REFERENCES public.program_days(id) ON DELETE CASCADE NOT NULL,
  block_type TEXT NOT NULL CHECK (block_type IN ('exercise', 'recipe', 'mental', 'text', 'image', 'video', 'url', 'pro_tip', 'avoidance')),
  block_order INTEGER NOT NULL,
  content_id UUID, -- References to fitness_exercises, recipes, or mental_health_exercises
  block_data JSONB DEFAULT '{}', -- Store block-specific configuration (sets, reps, portions, etc.)
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on new tables
ALTER TABLE public.program_weeks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.program_days ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.program_blocks ENABLE ROW LEVEL SECURITY;

-- RLS policies for program_weeks
CREATE POLICY "Coaches can manage their program weeks" 
  ON public.program_weeks 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.programs 
      WHERE programs.id = program_weeks.program_id 
      AND programs.coach_id = auth.uid()
    )
  );

-- RLS policies for program_days
CREATE POLICY "Coaches can manage their program days" 
  ON public.program_days 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.program_weeks pw
      JOIN public.programs p ON p.id = pw.program_id
      WHERE pw.id = program_days.week_id 
      AND p.coach_id = auth.uid()
    )
  );

-- RLS policies for program_blocks
CREATE POLICY "Coaches can manage their program blocks" 
  ON public.program_blocks 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.program_days pd
      JOIN public.program_weeks pw ON pw.id = pd.week_id
      JOIN public.programs p ON p.id = pw.program_id
      WHERE pd.id = program_blocks.day_id 
      AND p.coach_id = auth.uid()
    )
  );

-- Update triggers for new tables
CREATE TRIGGER update_program_weeks_updated_at
    BEFORE UPDATE ON public.program_weeks
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_program_days_updated_at
    BEFORE UPDATE ON public.program_days
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_program_blocks_updated_at
    BEFORE UPDATE ON public.program_blocks
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();
