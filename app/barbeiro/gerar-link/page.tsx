"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/firebase-provider";
import { Copy, Share2 } from "lucide-react";
import { UserRole } from "@/domain/entities/user";
import { useRouter } from "next/navigation";
import barberRepository from "@/data/repository/barber-repository";

export default function GerarLinkPage() {
  const { toast } = useToast();
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [link, setLink] = useState("");
  const [linkGerado, setLinkGerado] = useState(false);

  // Redireciona se não for barbeiro
  if (user && user.role !== UserRole.BARBER) {
    router.push("/cliente/dashboard");
  }

  const handleGerarLink = async () => {
    if (!user) return;
    
    setIsLoading(true);
    
    try {
      // Gera um novo link de agendamento
      const response = await barberRepository.generateAppointmentLink(user.id);
      
      // Constrói a URL completa
      const fullLink = `${window.location.origin}/agendamento/${response.link}`;
      setLink(fullLink);
      setLinkGerado(true);
      
      toast({
        title: "Link gerado com sucesso!",
        description: "Compartilhe este link com seus clientes para que eles possam agendar horários.",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao gerar link",
        description: error.message || "Ocorreu um erro ao gerar o link. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopiarLink = () => {
    navigator.clipboard.writeText(link);
    
    toast({
      title: "Link copiado!",
      description: "O link foi copiado para a área de transferência.",
    });
  };

  const handleCompartilharLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Agende um horário comigo",
          text: "Clique no link para agendar um horário na Hasty Barber",
          url: link,
        });
      } catch (error) {
        console.error("Erro ao compartilhar:", error);
      }
    } else {
      handleCopiarLink();
    }
  };

  return (
    <div className="container py-10 md:py-20">
      <div className="mx-auto max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Gerar Link de Agendamento</CardTitle>
            <CardDescription>
              Crie um link personalizado para compartilhar com seus clientes.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!linkGerado ? (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Ao gerar um link de agendamento, seus clientes poderão acessá-lo para marcar horários diretamente em sua agenda.
                </p>
                <Button 
                  onClick={handleGerarLink} 
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  disabled={isLoading}
                >
                  {isLoading ? "Gerando..." : "Gerar Link"}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Seu link de agendamento:</p>
                  <div className="flex items-center gap-2">
                    <Input value={link} readOnly />
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={handleCopiarLink}
                      title="Copiar link"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Button 
                    onClick={handleCompartilharLink}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Compartilhar Link
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={handleGerarLink}
                    disabled={isLoading}
                  >
                    {isLoading ? "Gerando..." : "Gerar Novo Link"}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="ghost" 
              onClick={() => router.push("/barbeiro/dashboard")}
            >
              Voltar ao Dashboard
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}