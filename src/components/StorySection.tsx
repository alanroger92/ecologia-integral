import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car, Trees, Star } from "lucide-react";

export const StorySection = () => {
  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-accent text-accent-foreground">
            <Car className="w-4 h-4 mr-2" />
            História do Jogo
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Sua Aventura Começa Aqui
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Imagine-se dirigindo por uma estrada quando, de repente, seu carro quebra bem próximo a uma reserva natural. 
            Sem opções, você decide procurar ajuda...
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card className="text-center hover:shadow-nature transition-all duration-300">
            <CardHeader>
              <div className="mx-auto mb-4 w-16 h-16 bg-gradient-nature rounded-full flex items-center justify-center">
                <Trees className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl text-primary">Conheça Jorge, o Guarda Florestal</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Jorge é um dedicado protetor da natureza que cuida da reserva há anos. Ele concorda em ajudá-lo com seu carro, 
                mas primeiro precisa da sua ajuda para resolver alguns problemas urgentes que ameaçam o equilíbrio do ecossistema local.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-nature transition-all duration-300">
            <CardHeader>
              <div className="mx-auto mb-4 w-16 h-16 bg-gradient-water rounded-full flex items-center justify-center">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-xl text-primary">Sua Missão</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Ajudar Jorge a restaurar o equilíbrio natural da reserva completando desafios em três áreas distintas 
                e coletando estrelas por seus esforços!
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Card className="bg-gradient-nature text-white border-0">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                "Toda grande aventura começa com um primeiro passo"
              </h3>
              <p className="text-lg opacity-90">
                Junte-se ao Jorge nesta jornada emocionante e descubra como suas escolhas podem 
                fazer a diferença na preservação do meio ambiente.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};