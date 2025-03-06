"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const plans = [
  {
    id: "free",
    name: "Free",
    price: 0,
    period: "15 dias grátis",
    description: "Perfeito para testar nossa plataforma",
    features: [
      "Cadastro de serviços",
      "Gerenciamento de agenda",
      "Perfil personalizado",
      "Suporte básico por email"
    ],
    limitations: [
      "Sem gráficos detalhados",
      "Limite de 30 agendamentos",
      "Sem relatórios avançados"
    ]
  },
  {
    id: "pro",
    name: "Profissional",
    price: 50,
    period: "por mês",
    description: "Ideal para barbeiros em crescimento",
    features: [
      "Todas as features do plano Free",
      "Agendamentos ilimitados",
      "Gerenciamento completo",
      "Suporte prioritário",
      "Relatórios básicos",
      "Personalização avançada"
    ],
    limitations: [
      "Sem gráficos detalhados",
      "Relatórios limitados"
    ]
  },
  {
    id: "premium",
    name: "Premium",
    price: 80,
    period: "por mês",
    description: "Para barbeiros que querem o máximo",
    features: [
      "Todas as features do plano Pro",
      "Gráficos detalhados",
      "Relatórios avançados",
      "Análise de desempenho",
      "Métricas em tempo real",
      "Suporte VIP",
      "Personalização total"
    ],
    limitations: []
  }
];

export default function PlanosPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectPlan = async (planId: string) => {
    setSelectedPlan(planId);
    setIsLoading(true);

    try {
      // Simulação de processamento
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Redireciona para o dashboard após selecionar o plano
      toast.success("Plano selecionado com sucesso!");
      router.push("/barbeiro/dashboard");
    } catch (error) {
      toast.error("Erro ao selecionar o plano. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-10 md:py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Escolha seu Plano</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Selecione o plano ideal para o seu negócio. Comece gratuitamente e 
          atualize quando precisar de mais recursos.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card 
            key={plan.id}
            className={`relative overflow-hidden ${
              plan.id === "premium" ? "border-purple-600 shadow-lg" : ""
            }`}
          >
            {plan.id === "premium" && (
              <div className="absolute top-0 right-0 bg-purple-600 text-white px-4 py-1 rounded-bl-lg">
                Recomendado
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-baseline">
                <span className="text-4xl font-bold">
                  {plan.price === 0 ? "Grátis" : `R$${plan.price}`}
                </span>
                {plan.price > 0 && (
                  <span className="text-muted-foreground ml-2">{plan.period}</span>
                )}
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="font-medium">Recursos inclusos:</p>
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {plan.limitations.length > 0 && (
                  <div className="space-y-2">
                    <p className="font-medium">Limitações:</p>
                    {plan.limitations.map((limitation, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <X className="h-4 w-4 text-red-500 mr-2" />
                        <span>{limitation}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className={`w-full ${
                  plan.id === "premium" 
                    ? "bg-purple-600 hover:bg-purple-700" 
                    : ""
                }`}
                variant={plan.id === "premium" ? "default" : "outline"}
                onClick={() => handleSelectPlan(plan.id)}
                disabled={isLoading && selectedPlan === plan.id}
              >
                {isLoading && selectedPlan === plan.id 
                  ? "Processando..." 
                  : plan.id === "free" 
                    ? "Começar Gratuitamente" 
                    : "Selecionar Plano"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center text-sm text-muted-foreground">
        <p>
          Todos os planos incluem 7 dias de garantia de reembolso. 
          Cancele a qualquer momento.
        </p>
      </div>
    </div>
  );
}