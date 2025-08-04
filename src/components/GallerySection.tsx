import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface GalleryItem {
  id: string;
  file_name: string;
  file_url: string;
  file_type: string;
  caption: string | null;
  created_at: string;
}

const GallerySection = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const itemsPerPage = 6;

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGalleryItems(data || []);
    } catch (error) {
      console.error('Error fetching gallery items:', error);
    } finally {
      setLoading(false);
    }
  };

  const maxIndex = Math.max(0, galleryItems.length - itemsPerPage);
  
  const nextPage = () => {
    setCarouselIndex((prev) => Math.min(prev + itemsPerPage, maxIndex));
  };

  const prevPage = () => {
    setCarouselIndex((prev) => Math.max(prev - itemsPerPage, 0));
  };

  if (loading) {
    return (
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-primary">
            Galeria do Projeto
          </h2>
          <div className="flex justify-center">
            <div className="animate-pulse bg-muted h-96 w-full max-w-4xl rounded-lg"></div>
          </div>
        </div>
      </section>
    );
  }

  if (galleryItems.length === 0) {
    return (
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-primary">
            Galeria do Projeto
          </h2>
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">
                Nenhuma foto ou vídeo foi adicionado ainda.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  const visibleItems = galleryItems.slice(carouselIndex, carouselIndex + itemsPerPage);
  const canScrollPrev = carouselIndex > 0;
  const canScrollNext = carouselIndex < maxIndex;

  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-primary">
          Galeria do Projeto
        </h2>
        
        <div className="relative max-w-6xl mx-auto">
          {/* Carrossel Horizontal */}
          <div className="relative">
            {/* Botão Anterior */}
            {canScrollPrev && (
              <Button
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm"
                onClick={prevPage}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            )}
            
            {/* Botão Próximo */}
            {canScrollNext && (
              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm"
                onClick={nextPage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
            
            <div className="flex gap-4 overflow-hidden px-12">
              {visibleItems.map((item) => (
                <Dialog key={item.id}>
                  <DialogTrigger asChild>
                    <Card className="flex-shrink-0 w-32 h-32 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                      <CardContent className="p-0 h-full">
                        <div className="relative w-full h-full bg-black flex items-center justify-center">
                          {item.file_type === 'image' ? (
                            <img
                              src={item.file_url}
                              alt={item.caption || item.file_name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full relative">
                              <video 
                                src={item.file_url} 
                                className="w-full h-full object-cover"
                                muted
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                <Play className="w-8 h-8 text-white" />
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="max-w-[95vw] max-h-[95vh] w-auto h-auto p-2">
                    <div className="relative w-full h-full flex items-center justify-center">
                      {item.file_type === 'image' ? (
                        <img
                          src={item.file_url}
                          alt={item.caption || item.file_name}
                          className="max-w-full max-h-full object-contain"
                          style={{ maxHeight: '90vh', maxWidth: '90vw' }}
                        />
                      ) : (
                        <video
                          src={item.file_url}
                          controls
                          className="max-w-full max-h-full object-contain"
                          style={{ maxHeight: '90vh', maxWidth: '90vw' }}
                          autoPlay
                        >
                          Seu navegador não suporta vídeos HTML5.
                        </video>
                      )}
                      {item.caption && (
                        <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white p-4">
                          <p className="text-center text-sm">{item.caption}</p>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;