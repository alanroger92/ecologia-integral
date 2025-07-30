import { Car, Trees, Star } from "lucide-react";

export const StorySection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center items-center gap-4 mb-6">
            <Car className="w-8 h-8 text-primary" />
            <h2 className="text-4xl font-bold text-foreground">Sua Aventura Começa Aqui</h2>
            <Trees className="w-8 h-8 text-primary" />
          </div>
          
          <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
            Imagine-se dirigindo por uma estrada quando, de repente, seu carro quebra bem próximo a uma reserva natural. 
            Sem opções, você decide procurar ajuda...
          </p>

          <div className="bg-card rounded-xl p-8 shadow-lg border border-border mb-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Trees className="w-10 h-10 text-primary" />
              <h3 className="text-2xl font-semibold text-foreground">Conheça Jorge, o Guarda Florestal</h3>
            </div>
            
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Jorge é um dedicado protetor da natureza que cuida da reserva há anos. Ele concorda em ajudá-lo com seu carro, 
              mas primeiro precisa da sua ajuda para resolver alguns problemas urgentes que ameaçam o equilíbrio do ecossistema local.
            </p>

            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6 border border-primary/20">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Star className="w-6 h-6 text-primary" />
                <h4 className="text-xl font-semibold text-foreground">Sua Missão</h4>
                <Star className="w-6 h-6 text-primary" />
              </div>
              <p className="text-foreground font-medium">
                Ajudar Jorge a restaurar o equilíbrio natural da reserva completando desafios em três áreas distintas 
                e coletando estrelas por seus esforços!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};