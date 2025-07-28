import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { AreasSection } from "@/components/AreasSection";
import { GameSection } from "@/components/GameSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <AreasSection />
      <GameSection />
      <Footer />
    </div>
  );
};

export default Index;