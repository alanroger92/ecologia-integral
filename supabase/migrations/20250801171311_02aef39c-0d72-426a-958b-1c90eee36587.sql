-- Add policy to allow updating review approval status
CREATE POLICY "Allow updating review approval status" 
ON public.reviews 
FOR UPDATE 
USING (true)
WITH CHECK (true);

-- Add policy to allow viewing all reviews (approved and pending)
CREATE POLICY "Allow viewing all reviews for admin" 
ON public.reviews 
FOR SELECT 
USING (true);