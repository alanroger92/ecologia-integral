import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Check, X, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Review {
  id: string;
  name: string;
  age: number;
  rating: number;
  comment: string;
  created_at: string;
  approved: boolean;
}

const Admin = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchAllReviews();
  }, []);

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

  const updateReviewStatus = async (reviewId: string, approved: boolean) => {
    setUpdating(reviewId);
    try {
      const { error } = await supabase
        .from('reviews')
        .update({ approved })
        .eq('id', reviewId);

      if (error) throw error;

      setReviews(reviews.map(review => 
        review.id === reviewId ? { ...review, approved } : review
      ));

      toast({
        title: "Sucesso",
        description: `Avaliação ${approved ? 'aprovada' : 'rejeitada'} com sucesso`,
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

  const pendingReviews = reviews.filter(review => !review.approved);
  const approvedReviews = reviews.filter(review => review.approved);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Painel Administrativo
          </h1>
          <p className="text-muted-foreground">
            Gerencie as avaliações dos jogadores
          </p>
        </div>

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
                    <p className="text-sm text-foreground mb-4 line-clamp-3">
                      {review.comment}
                    </p>
                    <p className="text-xs text-muted-foreground mb-4">
                      {formatDate(review.created_at)}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => updateReviewStatus(review.id, true)}
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
                        onClick={() => updateReviewStatus(review.id, false)}
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
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Avaliações Aprovadas */}
        <div>
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
                    <p className="text-sm text-foreground mb-4 line-clamp-3">
                      {review.comment}
                    </p>
                    <p className="text-xs text-muted-foreground mb-4">
                      {formatDate(review.created_at)}
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateReviewStatus(review.id, false)}
                      disabled={updating === review.id}
                      className="w-full"
                    >
                      {updating === review.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <X className="w-4 h-4" />
                      )}
                      Remover Aprovação
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;