
-- Create customer_details table
CREATE TABLE public.customer_details (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  onboarding_complete BOOLEAN DEFAULT FALSE,
  goals TEXT[],
  height_cm INTEGER,
  weight_kg INTEGER,
  age INTEGER,
  gender TEXT,
  country TEXT,
  subscription_plan TEXT DEFAULT 'trial',
  trial_started_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add check constraint for subscription_plan values
ALTER TABLE public.customer_details 
ADD CONSTRAINT customer_details_subscription_plan_check 
CHECK (subscription_plan IN ('trial', 'basic', 'standard', 'premium'));

-- Add check constraint for goals values
ALTER TABLE public.customer_details 
ADD CONSTRAINT customer_details_goals_check 
CHECK (goals <@ ARRAY['fitness', 'nutrition', 'mental']);

-- Enable Row Level Security
ALTER TABLE public.customer_details ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for users to select their own record
CREATE POLICY "Users can view their own customer details" 
  ON public.customer_details 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Create RLS policy for users to update their own record
CREATE POLICY "Users can update their own customer details" 
  ON public.customer_details 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create RLS policy for users to insert their own record
CREATE POLICY "Users can insert their own customer details" 
  ON public.customer_details 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create an updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at timestamp
CREATE TRIGGER update_customer_details_updated_at
    BEFORE UPDATE ON public.customer_details
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();
