
-- Create storage bucket for program header images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'program-headers',
  'program-headers',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
);

-- Create RLS policy to allow authenticated users to upload their own program images
CREATE POLICY "Users can upload program header images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'program-headers' AND
    auth.uid() IS NOT NULL
  );

-- Create RLS policy to allow authenticated users to update their own program images
CREATE POLICY "Users can update their program header images" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'program-headers' AND
    auth.uid() IS NOT NULL
  );

-- Create RLS policy to allow authenticated users to delete their own program images
CREATE POLICY "Users can delete their program header images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'program-headers' AND
    auth.uid() IS NOT NULL
  );

-- Create RLS policy to allow public read access to program header images
CREATE POLICY "Anyone can view program header images" ON storage.objects
  FOR SELECT USING (bucket_id = 'program-headers');
