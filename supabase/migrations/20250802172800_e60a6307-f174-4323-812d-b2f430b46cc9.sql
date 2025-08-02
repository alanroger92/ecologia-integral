-- Criar política para permitir que admin delete comentários
CREATE POLICY "Allow deleting reviews for admin" 
ON public.reviews 
FOR DELETE 
USING (true);