
-- Step 1: Migrate data from client_requests to requests table (if tables still exist)
INSERT INTO public.requests (user_id, plan_type, status, created_at, updated_at)
SELECT 
  client_id as user_id,
  CASE 
    WHEN subscription_plan = 'basic' THEN 'otp'
    ELSE subscription_plan
  END as plan_type,
  status,
  requested_at as created_at,
  COALESCE(updated_at, requested_at) as updated_at
FROM public.client_requests
WHERE EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'client_requests' AND table_schema = 'public')
ON CONFLICT DO NOTHING;

-- Step 2: Migrate relevant data from customer_details to profiles (if table still exists)
UPDATE public.profiles 
SET 
  plan_type = CASE 
    WHEN cd.subscription_plan = 'basic' THEN 'otp'
    ELSE cd.subscription_plan
  END,
  onboarding_completed = cd.onboarding_complete
FROM public.customer_details cd
WHERE profiles.id = cd.user_id
AND profiles.plan_type IS NULL
AND EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'customer_details' AND table_schema = 'public');

-- Step 3: Drop all old triggers first (including the one causing the dependency issue)
DROP TRIGGER IF EXISTS on_onboarding_complete ON public.customer_details;
DROP TRIGGER IF EXISTS on_customer_details_update ON public.customer_details;
DROP TRIGGER IF EXISTS on_program_assignment ON public.program_assignments;

-- Step 4: Now drop the old functions
DROP FUNCTION IF EXISTS public.create_client_request_on_onboarding();
DROP FUNCTION IF EXISTS public.update_request_on_program_assignment();

-- Step 5: Create the new trigger function for handling onboarding completion
CREATE OR REPLACE FUNCTION public.handle_onboarding_completion()
RETURNS TRIGGER AS $$
BEGIN
  -- Only proceed if onboarding_completed changed from false to true
  IF OLD.onboarding_completed = false AND NEW.onboarding_completed = true THEN
    
    -- Handle trial plan: only create request if user hasn't used trial before
    IF NEW.plan_type = 'trial' AND (OLD.has_used_trial = false OR OLD.has_used_trial IS NULL) THEN
      -- Insert new request
      INSERT INTO public.requests (user_id, plan_type, status, created_at, updated_at)
      VALUES (NEW.id, NEW.plan_type, 'new', now(), now());
      
      -- Mark trial as used
      NEW.has_used_trial = true;
    END IF;
    
    -- Handle paid plans: always create request
    IF NEW.plan_type IN ('otp', 'standard', 'premium') THEN
      -- Insert new request
      INSERT INTO public.requests (user_id, plan_type, status, created_at, updated_at)
      VALUES (NEW.id, NEW.plan_type, 'new', now(), now());
    END IF;
    
    -- Set welcome flag for first-time users
    IF OLD.has_received_welcome = false OR OLD.has_received_welcome IS NULL THEN
      NEW.has_received_welcome = true;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 6: Create the trigger on profiles table
DROP TRIGGER IF EXISTS on_onboarding_completion ON public.profiles;
CREATE TRIGGER on_onboarding_completion
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_onboarding_completion();

-- Step 7: Update RLS policies for requests table
DROP POLICY IF EXISTS "Coaches can view all requests" ON public.requests;
DROP POLICY IF EXISTS "Coaches can update requests" ON public.requests;

CREATE POLICY "Coaches can view all requests" 
  ON public.requests 
  FOR SELECT 
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role = 'coach'
    )
  );

CREATE POLICY "Coaches can update requests" 
  ON public.requests 
  FOR UPDATE 
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role = 'coach'
    )
  );

-- Step 8: Drop unused tables after data migration and trigger removal
DROP TABLE IF EXISTS public.client_requests;
DROP TABLE IF EXISTS public.customer_details;
