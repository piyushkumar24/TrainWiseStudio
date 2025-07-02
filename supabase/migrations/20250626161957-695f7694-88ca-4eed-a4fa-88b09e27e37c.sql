
-- Create fitness_exercises table
CREATE TABLE public.fitness_exercises (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  intro TEXT,
  target TEXT,
  tags TEXT[] DEFAULT '{}',
  header_image TEXT,
  muscle_group_main TEXT,
  muscle_group_sub TEXT,
  blocks JSONB DEFAULT '[]',
  is_draft BOOLEAN NOT NULL DEFAULT true
);

-- Create recipes table
CREATE TABLE public.recipes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  category TEXT,
  tags TEXT[] DEFAULT '{}',
  allergies TEXT[] DEFAULT '{}',
  header_image TEXT,
  portion_count INTEGER DEFAULT 1,
  metrics JSONB DEFAULT '{"protein": 0, "fat": 0, "carbs": 0, "kcal": 0}',
  blocks JSONB DEFAULT '[]',
  is_draft BOOLEAN NOT NULL DEFAULT true
);

-- Create mental_health_exercises table
CREATE TABLE public.mental_health_exercises (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  exercise_type TEXT,
  tags TEXT[] DEFAULT '{}',
  header_image TEXT,
  blocks JSONB DEFAULT '[]',
  is_draft BOOLEAN NOT NULL DEFAULT true
);

-- Add updated_at triggers for all tables
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_fitness_exercises_updated_at
  BEFORE UPDATE ON public.fitness_exercises
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_recipes_updated_at
  BEFORE UPDATE ON public.recipes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_mental_health_exercises_updated_at
  BEFORE UPDATE ON public.mental_health_exercises
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE public.fitness_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mental_health_exercises ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for fitness_exercises
CREATE POLICY "Users can view their own fitness exercises" 
  ON public.fitness_exercises 
  FOR SELECT 
  USING (auth.uid() = created_by);

CREATE POLICY "Users can create their own fitness exercises" 
  ON public.fitness_exercises 
  FOR INSERT 
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own fitness exercises" 
  ON public.fitness_exercises 
  FOR UPDATE 
  USING (auth.uid() = created_by);

CREATE POLICY "Users can delete their own fitness exercises" 
  ON public.fitness_exercises 
  FOR DELETE 
  USING (auth.uid() = created_by);

-- Create RLS policies for recipes
CREATE POLICY "Users can view their own recipes" 
  ON public.recipes 
  FOR SELECT 
  USING (auth.uid() = created_by);

CREATE POLICY "Users can create their own recipes" 
  ON public.recipes 
  FOR INSERT 
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own recipes" 
  ON public.recipes 
  FOR UPDATE 
  USING (auth.uid() = created_by);

CREATE POLICY "Users can delete their own recipes" 
  ON public.recipes 
  FOR DELETE 
  USING (auth.uid() = created_by);

-- Create RLS policies for mental_health_exercises
CREATE POLICY "Users can view their own mental health exercises" 
  ON public.mental_health_exercises 
  FOR SELECT 
  USING (auth.uid() = created_by);

CREATE POLICY "Users can create their own mental health exercises" 
  ON public.mental_health_exercises 
  FOR INSERT 
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own mental health exercises" 
  ON public.mental_health_exercises 
  FOR UPDATE 
  USING (auth.uid() = created_by);

CREATE POLICY "Users can delete their own mental health exercises" 
  ON public.mental_health_exercises 
  FOR DELETE 
  USING (auth.uid() = created_by);
