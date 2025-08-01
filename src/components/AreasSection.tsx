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
        "Conquistar uma estrela de guarda florestal"
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
        "Conquistar uma estrela de guarda florestal"
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
        "Conquistar uma estrela de guarda florestal"
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
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-8 rounded-2xl text-white">
            <h3 className="text-2xl font-bold mb-4">🏆 Colete as 3 Estrelas</h3>
            <p className="text-lg mb-4">
              Complete todos os desafios, responda aos quizzes corretamente e ajude a natureza a se recuperar. Só assim você conseguirá partir com a consciência tranquila!
            </p>
            <div className="flex justify-center space-x-8 text-sm">
              <div className="flex items-center">
                <span className="text-yellow-400 mr-2">⭐</span>
                <span>Estrela da Água</span>
              </div>
              <div className="flex items-center">
                <span className="text-yellow-400 mr-2">⭐</span>
                <span>Estrela da Terra</span>
              </div>
              <div className="flex items-center">
                <span className="text-yellow-400 mr-2">⭐</span>
                <span>Estrela do Ar</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};