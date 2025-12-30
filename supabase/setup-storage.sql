-- Create storage bucket for ticket attachments
-- Run this in the SQL Editor: https://supabase.com/dashboard/project/dlofdqcyraldukqyeoan/sql/new

-- Create the bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'ticket-attachments',
  'ticket-attachments',
  true,
  10485760, -- 10MB
  ARRAY[
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf',
    'text/plain',
    'text/csv',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/zip'
  ]
)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Authenticated users can upload ticket attachments" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can read ticket attachments" ON storage.objects;
DROP POLICY IF EXISTS "Public can read ticket attachments" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own uploads" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own uploads" ON storage.objects;

-- Create storage policies
CREATE POLICY "Authenticated users can upload ticket attachments"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'ticket-attachments');

CREATE POLICY "Authenticated users can read ticket attachments"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'ticket-attachments');

CREATE POLICY "Public can read ticket attachments"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'ticket-attachments');

CREATE POLICY "Users can update their own uploads"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'ticket-attachments' AND auth.uid() = owner)
WITH CHECK (bucket_id = 'ticket-attachments');

CREATE POLICY "Users can delete their own uploads"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'ticket-attachments' AND auth.uid() = owner);
