
-- Create a table to track client requests (clients who need programs assigned)
CREATE TABLE public.client_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  coach_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'assigned', 'declined')),
  subscription_plan TEXT NOT NULL,
  goals TEXT[],
  requested_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  assigned_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(client_id) -- Ensure one request per client
);

-- Enable Row Level Security
ALTER TABLE public.client_requests ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for client_requests
CREATE POLICY "Coaches can view requests assigned to them or pending requests" 
  ON public.client_requests 
  FOR SELECT 
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role = 'coach'
    ) AND (coach_id = auth.uid() OR status = 'pending')
  );

CREATE POLICY "Coaches can update requests" 
  ON public.client_requests 
  FOR UPDATE 
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role = 'coach'
    )
  );

CREATE POLICY "System can insert client requests" 
  ON public.client_requests 
  FOR INSERT 
  TO authenticated
  WITH CHECK (true);

-- Create trigger to automatically update updated_at timestamp
CREATE TRIGGER update_client_requests_updated_at
    BEFORE UPDATE ON public.client_requests
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Create a function to automatically generate client requests when onboarding is completed
CREATE OR REPLACE FUNCTION public.create_client_request_on_onboarding()
RETURNS TRIGGER AS $$
BEGIN
  -- Only create request if onboarding was just completed and user has a paid plan
  IF OLD.onboarding_complete = FALSE AND NEW.onboarding_complete = TRUE 
     AND NEW.subscription_plan IN ('basic', 'standard', 'premium', 'trial') THEN
    
    INSERT INTO public.client_requests (client_id, subscription_plan, goals)
    VALUES (NEW.user_id, NEW.subscription_plan, NEW.goals)
    ON CONFLICT (client_id) DO NOTHING; -- Prevent duplicates
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create client requests
CREATE TRIGGER on_onboarding_complete
  AFTER UPDATE ON public.customer_details
  FOR EACH ROW
  EXECUTE FUNCTION public.create_client_request_on_onboarding();
