import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const teamMembers = [
  "Andriy Shevchenko Lacerda da Silva",
  "Bryan Machado Ribas", 
  "Davi Lourenço",
  "Lorenzo da Silva Vieira da Silva",
  "Luís Fernando Santos da Silva",
  "Rafael Nyland da Cunha"
];

export const TeamSection = () => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2);
  };

  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-accent text-accent-foreground">
            Nosso Grupo
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Integrantes do Projeto
          </h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="text-center">
              <p className="text-lg font-medium text-foreground">9º Ano A</p>
              <img src="/lovable-uploads/d9d60697-46f5-45ab-988a-0e0ee25eac43.png" alt="Escola Fátima Logo" className="mx-auto" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="text-center hover:shadow-nature transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src="/lovable-uploads/a5a359d6-6d15-4136-b95c-c61425f9d28e.png" />
                  <AvatarFallback className="text-lg font-semibold bg-primary/10 text-primary">
                    {getInitials(member)}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-base text-foreground leading-tight">
                  {member.split(' ').slice(0, 2).join(' ')}<br />
                  {member.split(' ').slice(2).join(' ')}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};