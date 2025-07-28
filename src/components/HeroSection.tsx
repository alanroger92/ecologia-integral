import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Leaf, Gamepad2, Star } from "lucide-react";
import heroImage from "@/assets/nature-hero.jpg";

export const HeroSection = () => {
  const scrollToGame = () => {
    const gameSection = document.getElementById('game-section');
    gameSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <Badge className="mb-6 bg-accent text-accent-foreground border-0 text-lg px-6 py-2">
          <Leaf className="w-5 h-5 mr-2" />
          Ecologia Integral
        </Badge>
        
        <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
          FAÇA A <span className="text-accent">DIFERENÇA</span>
          <br />
          NO MUNDO
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
          Embarque em uma aventura interativa e descubra como suas ações podem 
          transformar o meio ambiente. Ajude o guarda florestal Jorge a preservar 
          nossa reserva natural!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-white/90 px-8 py-4 text-lg font-semibold shadow-lg"
            onClick={scrollToGame}
          >
            <Gamepad2 className="w-6 h-6 mr-2" />
            Jogar Agora
          </Button>
          
          <div className="flex items-center text-white/90">
            <div className="flex items-center mr-6">
              <Star className="w-5 h-5 text-yellow-400 mr-1" />
              <span className="font-semibold">3 Áreas</span>
            </div>
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 mr-1" />
              <span className="font-semibold">3 Estrelas</span>
            </div>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="hidden md:block absolute top-20 left-10 animate-bounce">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
            <Leaf className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <div className="hidden md:block absolute bottom-20 right-10 animate-bounce" style={{ animationDelay: '1s' }}>
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
            <Star className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
      </div>
    </section>
  );
};