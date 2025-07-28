import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface GameAreaCardProps {
  title: string;
  description: string;
  objectives: string[];
  image: string;
  className?: string;
}

export const GameAreaCard = ({ title, description, objectives, image, className }: GameAreaCardProps) => {
  return (
    <Card className={`overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-nature ${className}`}>
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="bg-white/90 text-primary">
            <Star className="w-4 h-4 mr-1" />
            1 Estrela
          </Badge>
        </div>
      </div>
      <CardHeader>
        <CardTitle className="text-xl font-bold text-primary">{title}</CardTitle>
        <CardDescription className="text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <h4 className="font-semibold text-foreground">Objetivos:</h4>
          <ul className="space-y-1">
            {objectives.map((objective, index) => (
              <li key={index} className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span className="text-sm text-muted-foreground">{objective}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};