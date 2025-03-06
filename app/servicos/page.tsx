"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Scissors, Clock, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const services = [
  {
    id: 1,
    name: "Corte de Cabelo",
    description: "Corte tradicional masculino com acabamento perfeito",
    price: 50.00,
    duration: 30,
    icon: Scissors
  },
  {
    id: 2,
    name: "Barba",
    description: "Modelagem e acabamento de barba com produtos especiais",
    price: 35.00,
    duration: 20,
    icon: Scissors
  },
  {
    id: 3,
    name: "Corte + Barba",
    description: "Combo completo de corte e barba com atendimento premium",
    price: 75.00,
    duration: 50,
    icon: Scissors
  }
];

export default function ServicosPage() {
  return (
    <div className="container py-10 md:py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Nossos Serviços</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Oferecemos uma variedade de serviços profissionais para cuidar do seu visual. 
          Todos os nossos barbeiros são especialistas qualificados com anos de experiência.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card key={service.id} className="relative overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{service.name}</CardTitle>
                <service.icon className="h-6 w-6 text-purple-600" />
              </div>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{service.duration} minutos</span>
                  </div>
                  <div className="flex items-center font-semibold">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span>R$ {service.price.toFixed(2)}</span>
                  </div>
                </div>
                <Link href="/login">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Agendar Agora
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Quer se tornar um barbeiro parceiro?</h2>
        <p className="text-muted-foreground mb-6">
          Junte-se à nossa plataforma e expanda seu negócio.
        </p>
        <Link href="/cadastro">
          <Button className="bg-purple-600 hover:bg-purple-700">
            Cadastre-se como Barbeiro
          </Button>
        </Link>
      </div>
    </div>
  );
}