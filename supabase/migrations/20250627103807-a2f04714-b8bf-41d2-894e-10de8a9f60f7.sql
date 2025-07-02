
-- Create shop_items table
CREATE TABLE public.shop_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('Fitness', 'Nutrition', 'Mental Health')),
  type TEXT NOT NULL CHECK (type IN ('Program', 'Product')),
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  tags TEXT[] DEFAULT '{}',
  image_urls TEXT[] DEFAULT '{}',
  view_count INTEGER DEFAULT 0,
  purchase_count INTEGER DEFAULT 0,
  created_by UUID REFERENCES auth.users NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on shop_items
ALTER TABLE public.shop_items ENABLE ROW LEVEL SECURITY;

-- Allow everyone to view shop items
CREATE POLICY "Anyone can view shop items" 
  ON public.shop_items 
  FOR SELECT 
  USING (true);

-- Only coaches can create shop items
CREATE POLICY "Coaches can create shop items" 
  ON public.shop_items 
  FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role = 'coach'
    )
  );

-- Only coaches can update their own shop items
CREATE POLICY "Coaches can update their own shop items" 
  ON public.shop_items 
  FOR UPDATE 
  USING (
    created_by = auth.uid() AND
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role = 'coach'
    )
  );

-- Only coaches can delete their own shop items
CREATE POLICY "Coaches can delete their own shop items" 
  ON public.shop_items 
  FOR DELETE 
  USING (
    created_by = auth.uid() AND
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role = 'coach'
    )
  );

-- Create trigger to update updated_at column
CREATE TRIGGER update_shop_items_updated_at
  BEFORE UPDATE ON public.shop_items
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
