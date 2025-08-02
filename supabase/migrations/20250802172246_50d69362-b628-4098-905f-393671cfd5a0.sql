-- Adicionar coluna para status de rejeitado dos comentários
ALTER TABLE public.reviews 
ADD COLUMN rejected BOOLEAN NOT NULL DEFAULT false;

-- Atualizar as políticas RLS para incluir comentários rejeitados
DROP POLICY IF EXISTS "Everyone can view approved reviews" ON public.reviews;

-- Nova política para visualizar apenas comentários aprovados (não rejeitados)
CREATE POLICY "Everyone can view approved non-rejected reviews" 
ON public.reviews 
FOR SELECT 
USING (approved = true AND rejected = false);

-- Política para admin visualizar todos os comentários
-- Mantemos a política existente "Allow viewing all reviews for admin"