import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Play, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Link } from "react-router-dom";

interface GalleryItem {
  id: string;
  file_name: string;
  file_url: string;
  file_type: string;
  caption: string | null;
  created_at: string;
}

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchGalleryItems();
    window.scrollTo(0, 0);
  }, []);

  const fetchGalleryItems = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setGalleryItems(data || []);
    } catch (error) {
      console.error('Error fetching gallery items:', error);
    } finally {
      setLoading(false);
    }
  };

  // Funções para navegação no modal
  const nextModalItem = () => {
    if (selectedItemIndex !== null && selectedItemIndex < galleryItems.length - 1) {
      setSelectedItemIndex(selectedItemIndex + 1);
    }
  };

  const prevModalItem = () => {
    if (selectedItemIndex !== null && selectedItemIndex > 0) {
      setSelectedItemIndex(selectedItemIndex - 1);
    }
  };

  // Event listener para teclas do teclado
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedItemIndex !== null) {
        if (event.key === 'ArrowRight') {
          event.preventDefault();
          nextModalItem();
        } else if (event.key === 'ArrowLeft') {
          event.preventDefault();
          prevModalItem();
        } else if (event.key === 'Escape') {
          event.preventDefault();
          setSelectedItemIndex(null);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedItemIndex, galleryItems.length]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-20">
          <div className="mb-8">
            <Link to="/">
              <Button variant="outline" className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <h1 className="text-4xl font-bold text-center text-primary">
              Galeria Completa
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-square animate-pulse bg-muted rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (galleryItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-20">
          <div className="mb-8">
            <Link to="/">
              <Button variant="outline" className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <h1 className="text-4xl font-bold text-center text-primary">
              Galeria Completa
            </h1>
          </div>
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">
                Nenhuma foto ou vídeo foi adicionado ainda.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-20">
        <div className="mb-12">
          <Link to="/">
            <Button variant="outline" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-center text-primary mb-4">
            Galeria Completa
          </h1>
          <p className="text-center text-muted-foreground">
            {galleryItems.length} {galleryItems.length === 1 ? 'item' : 'itens'} na galeria
          </p>
        </div>
        
        {/* Grid estilo Instagram */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 max-w-6xl mx-auto">
          {galleryItems.map((item, index) => (
            <Dialog 
              key={item.id} 
              open={selectedItemIndex === index} 
              onOpenChange={(open) => {
                if (open) {
                  setSelectedItemIndex(index);
                } else {
                  setSelectedItemIndex(null);
                }
              }}
            >
              <Card 
                className="aspect-square overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
                onClick={() => setSelectedItemIndex(index)}
              >
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
              
              <DialogContent className="max-w-[95vw] max-h-[95vh] w-auto h-auto p-2">
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Botão Anterior no Modal */}
                  {selectedItemIndex !== null && selectedItemIndex > 0 && (
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute -left-16 top-1/2 -translate-y-1/2 z-20 bg-background/80 backdrop-blur-sm hidden sm:flex"
                      onClick={prevModalItem}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                  )}
                  
                  {/* Botão Próximo no Modal */}
                  {selectedItemIndex !== null && selectedItemIndex < galleryItems.length - 1 && (
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute -right-16 top-1/2 -translate-y-1/2 z-20 bg-background/80 backdrop-blur-sm hidden sm:flex"
                      onClick={nextModalItem}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  )}
                  
                  {selectedItemIndex !== null && galleryItems[selectedItemIndex] && (
                    <>
                      {galleryItems[selectedItemIndex].file_type === 'image' ? (
                        <img
                          src={galleryItems[selectedItemIndex].file_url}
                          alt={galleryItems[selectedItemIndex].caption || galleryItems[selectedItemIndex].file_name}
                          className="max-w-full max-h-full object-contain"
                          style={{ maxHeight: '90vh', maxWidth: '90vw' }}
                        />
                      ) : (
                        <video
                          src={galleryItems[selectedItemIndex].file_url}
                          controls
                          className="max-w-full max-h-full object-contain"
                          style={{ maxHeight: '90vh', maxWidth: '90vw' }}
                          autoPlay
                        >
                          Seu navegador não suporta vídeos HTML5.
                        </video>
                      )}
                      {galleryItems[selectedItemIndex].caption && (
                        <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white p-4">
                          <p className="text-center text-sm">{galleryItems[selectedItemIndex].caption}</p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;