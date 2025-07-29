import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Review {
  id: string;
  name: string;
  age: number;
  rating: number;
  comment: string;
  created_at: string;
}

export const ReviewsSection = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('approved', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
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
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-primary mb-8">
          Avaliações dos Jogadores
        </h2>
        <div className="text-center text-muted-foreground">
          Carregando avaliações...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-6">
      <h2 className="text-3xl font-bold text-center text-primary mb-8">
        Avaliações dos Jogadores
      </h2>
      
      {reviews.length === 0 ? (
        <div className="text-center text-muted-foreground">
          <p>Nenhuma avaliação aprovada ainda.</p>
          <p className="mt-2">Seja o primeiro a avaliar nosso jogo!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <Card key={review.id} className="h-full">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {review.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {review.age} anos
                    </p>
                  </div>
                  {renderStars(review.rating)}
                </div>
                
                <p className="text-muted-foreground mb-3 line-clamp-4">
                  {review.comment}
                </p>
                
                <p className="text-xs text-muted-foreground">
                  {formatDate(review.created_at)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};