
-- Create email_leads table to store email submissions
CREATE TABLE public.email_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS)
ALTER TABLE public.email_leads ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert email leads (public form)
CREATE POLICY "Anyone can submit email leads" 
  ON public.email_leads 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy to prevent reading email leads (admin only functionality)
CREATE POLICY "No public read access to email leads" 
  ON public.email_leads 
  FOR SELECT 
  USING (false);
