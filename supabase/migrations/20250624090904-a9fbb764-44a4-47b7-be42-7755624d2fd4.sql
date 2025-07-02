
-- Update the check constraint to allow the actual goal values from the onboarding form
ALTER TABLE public.customer_details 
DROP CONSTRAINT customer_details_goals_check;

-- Add the correct check constraint with all the actual goal IDs
ALTER TABLE public.customer_details 
ADD CONSTRAINT customer_details_goals_check 
CHECK (goals <@ ARRAY[
  'get-fit', 'build-muscle', 'get-stronger', 'burn-fat', 'get-toned',
  'eat-healthier', 'weight-loss', 'improve-habits', 'more-energy', 'reduce-cravings',
  'reduce-stress', 'improve-sleep', 'build-mindfulness', 'emotional-balance', 'boost-focus'
]);
