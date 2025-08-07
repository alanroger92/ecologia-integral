import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star, Check, X, Loader2, Edit, Trash2, LogOut, Upload, Image, Video, GripVertical } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import {
  CSS,
} from '@dnd-kit/utilities';

interface Review {
  id: string;
  name: string;
  age: number;
  rating: number;
  comment: string;
  created_at: string;
  approved: boolean;
  rejected: boolean;
}

interface GalleryItem {
  id: string;
  file_name: string;
  file_url: string;
  file_type: string;
  caption: string | null;
  created_at: string;
  display_order: number;
}

const Admin = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [editComment, setEditComment] = useState("");
  const [uploadCaption, setUploadCaption] = useState("");
  const [editingCaption, setEditingCaption] = useState<GalleryItem | null>(null);
  const [newCaption, setNewCaption] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Sensores para drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    // Verificar se está logado
    const isLoggedIn = localStorage.getItem("admin_logged_in");
    if (!isLoggedIn) {
      navigate("/admin-login");
      return;
    }
    fetchAllReviews();
    fetchGalleryItems();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("admin_logged_in");
    navigate("/admin-login");
  };

  const fetchAllReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar as avaliações",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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
      toast({
        title: "Erro",
        description: "Não foi possível carregar a galeria",
        variant: "destructive",
      });
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Verificar tipo de arquivo
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'video/mp4', 'video/webm'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Erro",
        description: "Tipo de arquivo não suportado. Use JPG, PNG, WEBP, MP4 ou WEBM.",
        variant: "destructive",
      });
      return;
    }

    // Verificar tamanho (50MB máximo)
    if (file.size > 50 * 1024 * 1024) {
      toast({
        title: "Erro",
        description: "Arquivo muito grande. Máximo 50MB.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = fileName;

      // Upload do arquivo para o storage
      const { error: uploadError } = await supabase.storage
        .from('gallery')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Obter URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('gallery')
        .getPublicUrl(filePath);

      // Obter próximo número de ordem
      const maxOrder = galleryItems.length > 0 ? Math.max(...galleryItems.map(item => item.display_order)) : -1;

      // Salvar na tabela gallery
      const fileType = file.type.startsWith('image/') ? 'image' : 'video';
      const { error: dbError } = await supabase
        .from('gallery')
        .insert({
          file_name: file.name,
          file_url: publicUrl,
          file_type: fileType,
          caption: uploadCaption.trim() || null,
          display_order: maxOrder + 1
        });

      if (dbError) throw dbError;

      toast({
        title: "Sucesso",
        description: `${fileType === 'image' ? 'Imagem' : 'Vídeo'} enviado com sucesso!`,
      });

      setUploadCaption("");
      fetchGalleryItems();
      
      // Limpar input
      event.target.value = "";
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Erro",
        description: "Não foi possível enviar o arquivo",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const deleteGalleryItem = async (item: GalleryItem) => {
    if (!confirm("Tem certeza que deseja apagar este item da galeria?")) return;

    setUpdating(item.id);
    try {
      // Extrair o nome do arquivo da URL
      const fileName = item.file_url.split('/').pop();
      
      // Deletar do storage
      if (fileName) {
        await supabase.storage
          .from('gallery')
          .remove([fileName]);
      }

      // Deletar do banco
      const { error } = await supabase
        .from('gallery')
        .delete()
        .eq('id', item.id);

      if (error) throw error;

      setGalleryItems(galleryItems.filter(galleryItem => galleryItem.id !== item.id));
      toast({
        title: "Sucesso",
        description: "Item removido da galeria com sucesso",
      });
    } catch (error) {
      console.error('Error deleting gallery item:', error);
      toast({
        title: "Erro",
        description: "Não foi possível remover o item da galeria",
        variant: "destructive",
      });
    } finally {
      setUpdating(null);
    }
  };

  // Função para lidar com drag and drop
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = galleryItems.findIndex((item) => item.id === active.id);
    const newIndex = galleryItems.findIndex((item) => item.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      // Reordenar array localmente
      const newItems = arrayMove(galleryItems, oldIndex, newIndex);
      setGalleryItems(newItems);

      // Atualizar ordens no banco de dados
      try {
        const updates = newItems.map((item, index) => ({
          id: item.id,
          display_order: index
        }));

        // Atualizar cada item individualmente (supabase não suporta bulk update direto)
        for (const update of updates) {
          await supabase
            .from('gallery')
            .update({ display_order: update.display_order })
            .eq('id', update.id);
        }

        toast({
          title: "Sucesso",
          description: "Ordem da galeria atualizada",
        });
      } catch (error) {
        console.error('Error updating gallery order:', error);
        toast({
          title: "Erro",
          description: "Erro ao atualizar ordem da galeria",
          variant: "destructive",
        });
        // Reverter em caso de erro
        fetchGalleryItems();
      }
    }
  };

  const updateReviewStatus = async (reviewId: string, approved: boolean, rejected = false) => {
    setUpdating(reviewId);
    try {
      const { error } = await supabase
        .from('reviews')
        .update({ approved, rejected })
        .eq('id', reviewId);

      if (error) throw error;

      setReviews(reviews.map(review => 
        review.id === reviewId ? { ...review, approved, rejected } : review
      ));

      toast({
        title: "Sucesso",
        description: `Avaliação ${approved ? 'aprovada' : rejected ? 'rejeitada' : 'removida da aprovação'} com sucesso`,
      });
    } catch (error) {
      console.error('Error updating review:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a avaliação",
        variant: "destructive",
      });
    } finally {
      setUpdating(null);
    }
  };

  const deleteReview = async (reviewId: string) => {
    if (!confirm("Tem certeza que deseja apagar este comentário?")) return;
    
    setUpdating(reviewId);
    try {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', reviewId);

      if (error) throw error;

      setReviews(reviews.filter(review => review.id !== reviewId));
      toast({
        title: "Sucesso",
        description: "Comentário apagado com sucesso",
      });
    } catch (error) {
      console.error('Error deleting review:', error);
      toast({
        title: "Erro",
        description: "Não foi possível apagar o comentário",
        variant: "destructive",
      });
    } finally {
      setUpdating(null);
    }
  };

  const editReview = async () => {
    if (!editingReview || !editComment.trim()) return;

    setUpdating(editingReview.id);
    try {
      const { error } = await supabase
        .from('reviews')
        .update({ comment: editComment.trim() })
        .eq('id', editingReview.id);

      if (error) throw error;

      setReviews(reviews.map(review => 
        review.id === editingReview.id ? { ...review, comment: editComment.trim() } : review
      ));

      setEditingReview(null);
      setEditComment("");
      toast({
        title: "Sucesso",
        description: "Comentário editado com sucesso",
      });
    } catch (error) {
      console.error('Error editing review:', error);
      toast({
        title: "Erro",
        description: "Não foi possível editar o comentário",
        variant: "destructive",
      });
    } finally {
      setUpdating(null);
    }
  };

  const startEditing = (review: Review) => {
    setEditingReview(review);
    setEditComment(review.comment);
  };

  const updateCaption = async () => {
    if (!editingCaption) return;

    setUpdating(editingCaption.id);
    try {
      const { error } = await supabase
        .from('gallery')
        .update({ caption: newCaption.trim() || null })
        .eq('id', editingCaption.id);

      if (error) throw error;

      setGalleryItems(galleryItems.map(item => 
        item.id === editingCaption.id ? { ...item, caption: newCaption.trim() || null } : item
      ));

      setEditingCaption(null);
      setNewCaption("");
      toast({
        title: "Sucesso",
        description: "Legenda atualizada com sucesso",
      });
    } catch (error) {
      console.error('Error updating caption:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a legenda",
        variant: "destructive",
      });
    } finally {
      setUpdating(null);
    }
  };

  const startEditingCaption = (item: GalleryItem) => {
    setEditingCaption(item);
    setNewCaption(item.caption || "");
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const pendingReviews = reviews.filter(review => !review.approved && !review.rejected);
  const approvedReviews = reviews.filter(review => review.approved && !review.rejected);
  const rejectedReviews = reviews.filter(review => review.rejected);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  // Componente para item arrastável da galeria
  const SortableGalleryItem = ({ item }: { item: GalleryItem }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: item.id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        className={`border rounded-lg p-4 bg-background ${isDragging ? 'shadow-lg' : ''}`}
      >
        <div className="flex items-center gap-4">
          {/* Handle para arrastar */}
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground transition-colors"
          >
            <GripVertical className="w-5 h-5" />
          </div>

          {/* Miniatura */}
          <div className="w-16 h-16 bg-black rounded-md overflow-hidden flex-shrink-0">
            {item.file_type === 'image' ? (
              <img
                src={item.file_url}
                alt={item.caption || item.file_name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full relative flex items-center justify-center">
                <video
                  src={item.file_url}
                  className="w-full h-full object-cover"
                />
                <Video className="absolute w-6 h-6 text-white" />
              </div>
            )}
          </div>

          {/* Informações */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {item.file_type === 'image' ? (
                <Image className="w-4 h-4 text-muted-foreground" />
              ) : (
                <Video className="w-4 h-4 text-muted-foreground" />
              )}
              <span className="text-sm font-medium">
                {item.file_type === 'image' ? 'Imagem' : 'Vídeo'}
              </span>
            </div>
            
            {item.caption && (
              <p className="text-sm text-foreground mb-1 truncate">
                {item.caption}
              </p>
            )}
            
            <p className="text-xs text-muted-foreground">
              {formatDate(item.created_at)}
            </p>
          </div>

          {/* Botões */}
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => startEditingCaption(item)}
              title="Editar legenda"
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => deleteGalleryItem(item)}
              disabled={updating === item.id}
              title="Remover item"
            >
              {updating === item.id ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2">
              Painel Administrativo
            </h1>
            <p className="text-muted-foreground">
              Gerencie as avaliações dos jogadores e a galeria do projeto
            </p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>

        {/* Modal de Edição */}
        {editingReview && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-lg">
              <CardHeader>
                <CardTitle>Editar Comentário</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nome</label>
                  <Input value={editingReview.name} disabled />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Comentário</label>
                  <Textarea
                    value={editComment}
                    onChange={(e) => setEditComment(e.target.value)}
                    rows={4}
                    className="resize-none"
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={editReview} 
                    disabled={updating === editingReview.id}
                    className="flex-1"
                  >
                    {updating === editingReview.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      "Salvar"
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setEditingReview(null);
                      setEditComment("");
                    }}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Modal de Edição de Legenda */}
        {editingCaption && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-lg">
              <CardHeader>
                <CardTitle>Editar Legenda</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {editingCaption.file_type === 'image' ? 'Imagem' : 'Vídeo'}
                  </label>
                  <div className="w-20 h-20 bg-black rounded-md overflow-hidden">
                    {editingCaption.file_type === 'image' ? (
                      <img
                        src={editingCaption.file_url}
                        alt={editingCaption.caption || editingCaption.file_name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full relative flex items-center justify-center">
                        <video
                          src={editingCaption.file_url}
                          className="w-full h-full object-cover"
                        />
                        <Video className="absolute w-6 h-6 text-white" />
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Legenda</label>
                  <Textarea
                    value={newCaption}
                    onChange={(e) => setNewCaption(e.target.value)}
                    placeholder="Digite uma legenda para esta mídia..."
                    rows={3}
                    className="resize-none"
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={updateCaption} 
                    disabled={updating === editingCaption.id}
                    className="flex-1"
                  >
                    {updating === editingCaption.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      "Salvar"
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setEditingCaption(null);
                      setNewCaption("");
                    }}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <Tabs defaultValue="gallery" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="gallery">Galeria</TabsTrigger>
            <TabsTrigger value="reviews">Avaliações</TabsTrigger>
          </TabsList>

          <TabsContent value="gallery" className="mt-6">
            {/* Gerenciamento da Galeria */}
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-foreground">
                Galeria do Projeto ({galleryItems.length})
              </h2>
              
              {/* Upload de Nova Mídia */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    Adicionar Foto ou Vídeo
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Legenda (opcional)
                    </label>
                    <Input
                      value={uploadCaption}
                      onChange={(e) => setUploadCaption(e.target.value)}
                      placeholder="Digite uma legenda para a mídia..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Arquivo
                    </label>
                    <Input
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleFileUpload}
                      disabled={uploading}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Formatos suportados: JPG, PNG, WEBP, MP4, WEBM (máx. 50MB)
                    </p>
                  </div>
                  {uploading && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Enviando arquivo...
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Lista de Itens da Galeria */}
              {galleryItems.length === 0 ? (
                <Card>
                  <CardContent className="p-6 text-center text-muted-foreground">
                    Nenhuma foto ou vídeo na galeria ainda
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Arraste para reordenar a galeria</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      A ordem aqui será a mesma exibida no site
                    </p>
                  </CardHeader>
                  <CardContent>
                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={handleDragEnd}
                    >
                      <SortableContext
                        items={galleryItems.map(item => item.id)}
                        strategy={verticalListSortingStrategy}
                      >
                        <div className="space-y-3">
                          {galleryItems.map((item) => (
                            <SortableGalleryItem key={item.id} item={item} />
                          ))}
                        </div>
                      </SortableContext>
                    </DndContext>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            {/* Avaliações Pendentes */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-6 text-foreground">
                Avaliações Pendentes ({pendingReviews.length})
              </h2>
              
              {pendingReviews.length === 0 ? (
                <Card>
                  <CardContent className="p-6 text-center text-muted-foreground">
                    Nenhuma avaliação pendente
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pendingReviews.map((review) => (
                    <Card key={review.id} className="border-orange-200">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{review.name}</CardTitle>
                            <p className="text-sm text-muted-foreground">
                              {review.age} anos
                            </p>
                          </div>
                          {renderStars(review.rating)}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-foreground mb-4">
                          {review.comment}
                        </p>
                        <p className="text-xs text-muted-foreground mb-4">
                          {formatDate(review.created_at)}
                        </p>
                        <div className="flex gap-2 mb-2">
                          <Button
                            size="sm"
                            onClick={() => updateReviewStatus(review.id, true, false)}
                            disabled={updating === review.id}
                            className="flex-1"
                          >
                            {updating === review.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Check className="w-4 h-4" />
                            )}
                            Aprovar
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => updateReviewStatus(review.id, false, true)}
                            disabled={updating === review.id}
                            className="flex-1"
                          >
                            {updating === review.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <X className="w-4 h-4" />
                            )}
                            Rejeitar
                          </Button>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => startEditing(review)}
                            className="flex-1"
                          >
                            <Edit className="w-4 h-4" />
                            Editar
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteReview(review.id)}
                            disabled={updating === review.id}
                            className="flex-1"
                          >
                            <Trash2 className="w-4 h-4" />
                            Apagar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Avaliações Aprovadas */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-6 text-foreground">
                Avaliações Aprovadas ({approvedReviews.length})
              </h2>
              
              {approvedReviews.length === 0 ? (
                <Card>
                  <CardContent className="p-6 text-center text-muted-foreground">
                    Nenhuma avaliação aprovada ainda
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {approvedReviews.map((review) => (
                    <Card key={review.id} className="border-green-200">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{review.name}</CardTitle>
                            <p className="text-sm text-muted-foreground">
                              {review.age} anos
                            </p>
                          </div>
                          {renderStars(review.rating)}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-foreground mb-4">
                          {review.comment}
                        </p>
                        <p className="text-xs text-muted-foreground mb-4">
                          {formatDate(review.created_at)}
                        </p>
                        <div className="flex gap-2 mb-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateReviewStatus(review.id, false, false)}
                            disabled={updating === review.id}
                            className="flex-1"
                          >
                            {updating === review.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <X className="w-4 h-4" />
                            )}
                            Remover
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => updateReviewStatus(review.id, false, true)}
                            disabled={updating === review.id}
                            className="flex-1"
                          >
                            Rejeitar
                          </Button>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => startEditing(review)}
                            className="flex-1"
                          >
                            <Edit className="w-4 h-4" />
                            Editar
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteReview(review.id)}
                            disabled={updating === review.id}
                            className="flex-1"
                          >
                            <Trash2 className="w-4 h-4" />
                            Apagar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Avaliações Rejeitadas */}
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-foreground">
                Avaliações Rejeitadas ({rejectedReviews.length})
              </h2>
              
              {rejectedReviews.length === 0 ? (
                <Card>
                  <CardContent className="p-6 text-center text-muted-foreground">
                    Nenhuma avaliação rejeitada
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rejectedReviews.map((review) => (
                    <Card key={review.id} className="border-red-200">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{review.name}</CardTitle>
                            <p className="text-sm text-muted-foreground">
                              {review.age} anos
                            </p>
                          </div>
                          {renderStars(review.rating)}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-foreground mb-4">
                          {review.comment}
                        </p>
                        <p className="text-xs text-muted-foreground mb-4">
                          {formatDate(review.created_at)}
                        </p>
                        <div className="flex gap-2 mb-2">
                          <Button
                            size="sm"
                            onClick={() => updateReviewStatus(review.id, true, false)}
                            disabled={updating === review.id}
                            className="flex-1"
                          >
                            {updating === review.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Check className="w-4 h-4" />
                            )}
                            Aprovar
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateReviewStatus(review.id, false, false)}
                            disabled={updating === review.id}
                            className="flex-1"
                          >
                            Remover
                          </Button>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => startEditing(review)}
                            className="flex-1"
                          >
                            <Edit className="w-4 h-4" />
                            Editar
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteReview(review.id)}
                            disabled={updating === review.id}
                            className="flex-1"
                          >
                            <Trash2 className="w-4 h-4" />
                            Apagar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;