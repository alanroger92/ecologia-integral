import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

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

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev === galleryItems.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? galleryItems.length - 1 : prev - 1
    );
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

  const currentItem = galleryItems[currentIndex];

  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-primary">
          Galeria do Projeto
        </h2>
        
        <div className="relative max-w-6xl mx-auto">
          {/* Carrossel Principal */}
          <Card className="overflow-hidden">
            <CardContent className="p-0 relative">
              <div className="aspect-video bg-black flex items-center justify-center">
                {currentItem.file_type === 'image' ? (
                  <img
                    src={currentItem.file_url}
                    alt={currentItem.caption || currentItem.file_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="relative w-full h-full">
                    <video
                      src={currentItem.file_url}
                      controls
                      className="w-full h-full object-cover"
                      poster={currentItem.file_url}
                    >
                      Seu navegador não suporta vídeos HTML5.
                    </video>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <Play className="w-16 h-16 text-white opacity-80" />
                    </div>
                  </div>
                )}
              </div>
              
              {/* Controles de Navegação */}
              {galleryItems.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background"
                    onClick={prevSlide}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background"
                    onClick={nextSlide}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </>
              )}
              
              {/* Legenda */}
              {currentItem.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4">
                  <p className="text-center">{currentItem.caption}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Indicadores/Miniaturas */}
          {galleryItems.length > 1 && (
            <div className="flex justify-center mt-6 gap-2 overflow-x-auto pb-2">
              {galleryItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    index === currentIndex 
                      ? 'border-primary shadow-lg' 
                      : 'border-transparent hover:border-muted-foreground'
                  }`}
                >
                  {item.file_type === 'image' ? (
                    <img
                      src={item.file_url}
                      alt={item.caption || item.file_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-black flex items-center justify-center relative">
                      <video src={item.file_url} className="w-full h-full object-cover" />
                      <Play className="absolute w-6 h-6 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Contador */}
          {galleryItems.length > 1 && (
            <div className="text-center mt-4 text-muted-foreground">
              {currentIndex + 1} de {galleryItems.length}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;