import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Users, ExternalLink } from "lucide-react";

export const GameSection = () => {
  return (
    <section id="game-section" className="py-20 px-6 bg-gradient-to-b from-background to-muted/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary text-primary-foreground">
            <Play className="w-4 h-4 mr-2" />
            Jogue Agora
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Entre na Aventura
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Está pronto para fazer a diferença? Clique no jogo abaixo e comece sua jornada ecológica!
          </p>
        </div>

        <Card className="overflow-hidden shadow-nature">
          <CardHeader className="bg-gradient-nature text-white text-center">
            <CardTitle className="text-2xl font-bold flex items-center justify-center">
              <Users className="w-6 h-6 mr-2" />
              Aventura Interativa
            </CardTitle>
            <CardDescription className="text-white/90 text-lg">
              Explore as três áreas da reserva e colete todas as estrelas!
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex justify-center">
              <iframe 
                width="100%" 
                height="600" 
                frameBorder="0" 
                src="https://edu.delightex.com/JFQ-RGR"
                className="w-full max-w-4xl"
                title="Faça a Diferença no Mundo - Jogo Interativo"
              />
            </div>
            <div className="p-6 text-center">
              <Button 
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <a 
                  href="https://edu.delightex.com/JFQ-RGR" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Jogar em Tela Cheia
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};