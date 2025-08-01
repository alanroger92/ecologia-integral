import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Leaf, Menu } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false); // Close mobile menu after navigation
  };

  const reloadAndScrollToTop = () => {
    window.location.reload();
    window.scrollTo(0, 0);
  };

  const menuItems = [
    { id: "hero-section", label: "Início" },
    { id: "about-section", label: "Sobre" },
    { id: "story-section", label: "História" },
    { id: "areas-section", label: "Áreas" },
    { id: "game-section", label: "Jogo" },
    { id: "review-section", label: "Avaliar" },
    { id: "team-section", label: "Grupo" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - clickable to reload page */}
          <div 
            className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
            onClick={reloadAndScrollToTop}
          >
            <Leaf className="w-8 h-8 text-primary mr-2" />
            <span className="text-xl font-bold text-primary">Ecologia Integral</span>
          </div>
          
          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:block">
            <NavigationMenuList className="flex gap-6">
              {menuItems.map((item) => (
                <NavigationMenuItem key={item.id}>
                  <NavigationMenuLink
                    className="cursor-pointer text-muted-foreground hover:text-primary transition-colors font-medium"
                    onClick={() => scrollToSection(item.id)}
                  >
                    {item.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 mt-8">
                <div 
                  className="flex items-center cursor-pointer hover:opacity-80 transition-opacity mb-4"
                  onClick={reloadAndScrollToTop}
                >
                  <Leaf className="w-6 h-6 text-primary mr-2" />
                  <span className="text-lg font-bold text-primary">Ecologia Integral</span>
                </div>
                
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    className="text-left text-lg font-medium text-muted-foreground hover:text-primary transition-colors py-2"
                    onClick={() => scrollToSection(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};