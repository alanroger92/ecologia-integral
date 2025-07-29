import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Leaf } from "lucide-react";

export const Navbar = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Leaf className="w-8 h-8 text-primary mr-2" />
            <span className="text-xl font-bold text-primary">Ecologia Integral</span>
          </div>
          
          <NavigationMenu>
            <NavigationMenuList className="flex gap-6">
              <NavigationMenuItem>
                <NavigationMenuLink
                  className="cursor-pointer text-muted-foreground hover:text-primary transition-colors font-medium"
                  onClick={() => scrollToSection("hero-section")}
                >
                  Início
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className="cursor-pointer text-muted-foreground hover:text-primary transition-colors font-medium"
                  onClick={() => scrollToSection("about-section")}
                >
                  Sobre
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className="cursor-pointer text-muted-foreground hover:text-primary transition-colors font-medium"
                  onClick={() => scrollToSection("areas-section")}
                >
                  Áreas
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className="cursor-pointer text-muted-foreground hover:text-primary transition-colors font-medium"
                  onClick={() => scrollToSection("game-section")}
                >
                  Jogo
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className="cursor-pointer text-muted-foreground hover:text-primary transition-colors font-medium"
                  onClick={() => scrollToSection("review-section")}
                >
                  Avaliar
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </nav>
  );
};