import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { StorySection } from "@/components/StorySection";
import { AreasSection } from "@/components/AreasSection";
import { GameSection } from "@/components/GameSection";
import { TeamSection } from "@/components/TeamSection";
import GallerySection from "@/components/GallerySection";
import { ReviewSection } from "@/components/ReviewSection";
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
      <div id="story-section">
        <StorySection />
      </div>
      <div id="areas-section">
        <AreasSection />
      </div>
      <div id="game-section">
        <GameSection />
      </div>
      <div id="review-section">
        <ReviewSection />
      </div>
      <div id="team-section">
        <TeamSection />
      </div>
      <div id="gallery-section">
        <GallerySection />
      </div>
      <Footer />
    </div>
  );
};

export default Index;