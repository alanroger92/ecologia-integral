import { GameAreaCard } from "./GameAreaCard";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import lakeImage from "@/assets/lake-area.jpg";
import earthImage from "@/assets/earth-area.jpg";
import airImage from "@/assets/air-area.jpg";

export const AreasSection = () => {
  const areas = [
    {
      title: "Área do Lago",
      description: "Preserve a pureza das águas e mantenha a vida aquática saudável",
      objectives: [
        "Limpar todo o lixo da superfície do lago",
        "Responder corretamente o quiz sobre água",
        "Conquistar a estrela azul da água"
      ],
      image: lakeImage,
      className: "border-l-4 border-blue-400"
    },
    {
      title: "Área da Terra",
      description: "Proteja o solo e mantenha a floresta livre de poluição",
      objectives: [
        "Recolher todo o lixo espalhado pelo chão",
        "Remover madeiras cortadas ilegalmente",
        "Responder o quiz sobre preservação terrestre",
        "Conquistar a estrela marrom da terra"
      ],
      image: earthImage,
      className: "border-l-4 border-amber-600"
    },
    {
      title: "Área do Ar",
      description: "Mantenha o céu limpo e proteja a vida selvagem",
      objectives: [
        "Apagar completamente o incêndio florestal",
        "Enterrar respeitosamente os pássaros vitimados",
        "Responder o quiz sobre qualidade do ar",
        "Conquistar a estrela branca do ar"
      ],
      image: airImage,
      className: "border-l-4 border-sky-400"
    }
  ];

  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-secondary text-secondary-foreground">
            <MapPin className="w-4 h-4 mr-2" />
            Áreas da Reserva
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Três Desafios, Uma Missão
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore cada área da reserva natural e complete os desafios para ajudar 
            o guarda florestal Jorge a preservar este santuário ecológico.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {areas.map((area, index) => (
            <GameAreaCard
              key={index}
              title={area.title}
              description={area.description}
              objectives={area.objectives}
              image={area.image}
              className={area.className}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary to-accent p-8 rounded-2xl text-white">
            <h3 className="text-2xl font-bold mb-4">🌟 Complete Todos os Desafios</h3>
            <p className="text-lg mb-4">
              Colete as 3 estrelas (água, terra e ar) para completar sua missão 
              e ajudar a natureza a prosperar novamente!
            </p>
            <div className="flex justify-center space-x-8 text-sm">
              <div className="flex items-center">
                <span className="text-blue-300 mr-2">⭐</span>
                <span>Estrela da Água</span>
              </div>
              <div className="flex items-center">
                <span className="text-amber-300 mr-2">⭐</span>
                <span>Estrela da Terra</span>
              </div>
              <div className="flex items-center">
                <span className="text-white mr-2">⭐</span>
                <span>Estrela do Ar</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};