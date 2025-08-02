-- Criar bucket de storage para a galeria
INSERT INTO storage.buckets (id, name, public) VALUES ('gallery', 'gallery', true);

-- Criar tabela para a galeria
CREATE TABLE public.gallery (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL, -- 'image' ou 'video'
  caption TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;

-- Políticas para visualização pública
CREATE POLICY "Everyone can view gallery items" 
ON public.gallery 
FOR SELECT 
USING (true);

-- Políticas para admin
CREATE POLICY "Admin can manage gallery" 
ON public.gallery 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Trigger para updated_at
CREATE TRIGGER update_gallery_updated_at
BEFORE UPDATE ON public.gallery
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Políticas de storage para a galeria
CREATE POLICY "Public access to gallery files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'gallery');

CREATE POLICY "Admin can upload gallery files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'gallery');

CREATE POLICY "Admin can update gallery files" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'gallery');

CREATE POLICY "Admin can delete gallery files" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'gallery');