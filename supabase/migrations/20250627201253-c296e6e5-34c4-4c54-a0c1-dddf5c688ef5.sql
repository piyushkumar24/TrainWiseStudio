
-- Update fitness_exercises table to support multiple subcategories
ALTER TABLE public.fitness_exercises 
ALTER COLUMN muscle_group_sub TYPE text[] 
USING CASE 
  WHEN muscle_group_sub IS NULL THEN NULL
  WHEN muscle_group_sub = '' THEN '{}'::text[]
  ELSE ARRAY[muscle_group_sub]
END;

-- Update the default value to be an empty array instead of null
ALTER TABLE public.fitness_exercises 
ALTER COLUMN muscle_group_sub SET DEFAULT '{}';
