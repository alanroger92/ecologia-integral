import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import escolaLogo from "@/assets/escola-fatima-logo.png";

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
    <section className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Nosso Grupo
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Integrantes do Projeto
          </h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            <img src={escolaLogo} alt="Escola Fátima Logo" className="w-12 h-12" />
            <div className="text-center">
              <p className="text-lg font-medium text-foreground">9º Ano A</p>
              <p className="text-sm text-muted-foreground">Escola Fátima</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src="/placeholder.svg" />
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