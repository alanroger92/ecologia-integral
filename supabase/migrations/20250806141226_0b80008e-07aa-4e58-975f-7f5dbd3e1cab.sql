-- Add order column to gallery table
ALTER TABLE public.gallery 
ADD COLUMN display_order INTEGER DEFAULT 0;

-- Update existing records with incrementing order based on created_at
UPDATE public.gallery 
SET display_order = sub.row_num - 1
FROM (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at ASC) as row_num
  FROM public.gallery
) sub
WHERE public.gallery.id = sub.id;

-- Create index for better performance
CREATE INDEX idx_gallery_display_order ON public.gallery(display_order);