import { ReviewForm } from "./ReviewForm";
import { ReviewsSection } from "./ReviewsSection";

export const ReviewSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Sua Opinião é Importante
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Compartilhe sua experiência com o jogo e ajude outros jogadores a descobrir o mundo da ecologia integral.
          </p>
        </div>
        
        <div className="mb-20">
          <ReviewForm />
        </div>
        
        <ReviewsSection />
      </div>
    </section>
  );
};