import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { AreasSection } from "@/components/AreasSection";
import { GameSection } from "@/components/GameSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div id="hero-section">
        <HeroSection />
      </div>
      <div id="about-section">
        <AboutSection />
      </div>
      <div id="areas-section">
        <AreasSection />
      </div>
      <div id="game-section">
        <GameSection />
      </div>
      <Footer />
    </div>
  );
};

export default Index;