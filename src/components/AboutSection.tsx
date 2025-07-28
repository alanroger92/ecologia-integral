import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Target, Award, Heart } from "lucide-react";

export const AboutSection = () => {
  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-accent text-accent-foreground">
            <Heart className="w-4 h-4 mr-2" />
            Sobre o Projeto
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Ecologia Integral
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Nossa missão é educar e conscientizar sobre a importância da preservação 
            ambiental através de experiências interativas e envolventes. Cada ação conta 
            para construir um futuro mais sustentável.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="text-center hover:shadow-nature transition-all duration-300">
            <CardHeader>
              <div className="mx-auto mb-4 w-16 h-16 bg-gradient-nature rounded-full flex items-center justify-center">
                <Target className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl text-primary">Missão Educativa</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Promover a conscientização ambiental através de jogos interativos 
                que ensinam sobre preservação e sustentabilidade.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-nature transition-all duration-300">
            <CardHeader>
              <div className="mx-auto mb-4 w-16 h-16 bg-gradient-water rounded-full flex items-center justify-center">
                <Leaf className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-xl text-primary">Aprendizado Prático</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Experiências hands-on que conectam teoria e prática, 
                mostrando como pequenas ações geram grandes impactos.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-nature transition-all duration-300">
            <CardHeader>
              <div className="mx-auto mb-4 w-16 h-16 bg-gradient-earth rounded-full flex items-center justify-center">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-xl text-primary">Impacto Real</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Formar cidadãos conscientes que se tornam agentes de mudança 
                em suas comunidades e no mundo.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <Card className="bg-gradient-nature text-white border-0">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                "A educação ambiental é a chave para um futuro sustentável"
              </h3>
              <p className="text-lg opacity-90">
                Cada jogador que completa nossa aventura se torna um guardião da natureza, 
                levando conhecimento e consciência para onde quer que vá.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};