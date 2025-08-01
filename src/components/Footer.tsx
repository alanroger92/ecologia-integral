import { Badge } from "@/components/ui/badge";
import { Leaf, Users, User } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-6">
            <Leaf className="w-8 h-8 mr-3" />
            <h3 className="text-2xl font-bold">FAÇA A DIFERENÇA NO MUNDO</h3>
          </div>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Um projeto educativo sobre ecologia integral que transforma 
            o aprendizado em uma aventura inesquecível.
          </p>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-0">
                <Users className="w-4 h-4 mr-2" />
                Apoio Institucional
              </Badge>
              <div className="flex items-center gap-4 justify-center md:justify-start">
                <a 
                  href="https://canoas.supergeeks.com.br/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <img 
                    src="/lovable-uploads/10b215c5-fe99-43e6-9056-a4d6dc915a13.png" 
                    alt="SuperGeeks Logo" 
                    className="h-16 w-auto"
                  />
                </a>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Escola SuperGeeks Canoas</h4>
                  <p className="opacity-80">
                    Instituição de ensino comprometida com a educação inovadora 
                    e o desenvolvimento sustentável.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center md:text-right">
              <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-0">
                <User className="w-4 h-4 mr-2" />
                Desenvolvimento
              </Badge>
              <h4 className="text-xl font-semibold mb-2">Instrutor Alan Róger</h4>
              <p className="opacity-80">
                Instrutor da SuperGeeks Canoas e Embaixador da{" "}
                <a 
                  href="https://www.delightex.com/ambassadors" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="underline hover:text-white transition-colors"
                >
                  Delightex
                </a>.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center">
          <p className="text-sm opacity-70">
            © 2025 Escola SuperGeeks Canoas. Projeto desenvolvido com 💚 para um mundo mais sustentável.
          </p>
        </div>
      </div>
    </footer>
  );
};