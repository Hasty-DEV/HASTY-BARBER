"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Scissors, Users, Star, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SobrePage() {
  return (
    <div className="container py-10 md:py-20">
      {/* Hero Section */}
      <div className="grid gap-8 md:grid-cols-2 items-center mb-16">
        <div>
          <h1 className="text-4xl font-bold mb-4">Sobre a Hasty Barber</h1>
          <p className="text-muted-foreground mb-6">
            Somos uma plataforma inovadora que conecta clientes a barbeiros profissionais, 
            facilitando o agendamento de serviços e proporcionando uma experiência única 
            para todos os envolvidos.
          </p>
          <Link href="/cadastro">
            <Button className="bg-purple-600 hover:bg-purple-700">
              Comece Agora
            </Button>
          </Link>
        </div>
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2074&auto=format&fit=crop"
            alt="Barbearia"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4 mb-16">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Barbeiros</CardTitle>
            <Scissors className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">100+</div>
            <p className="text-xs text-muted-foreground">
              Profissionais qualificados
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5000+</div>
            <p className="text-xs text-muted-foreground">
              Clientes satisfeitos
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avaliação</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8</div>
            <p className="text-xs text-muted-foreground">
              Média de satisfação
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Agendamentos</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10k+</div>
            <p className="text-xs text-muted-foreground">
              Serviços realizados
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Mission & Values */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Nossa Missão e Valores</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Missão</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Facilitar a conexão entre clientes e barbeiros profissionais, 
                proporcionando uma experiência de agendamento simples e eficiente.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Visão</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Ser a principal plataforma de agendamento para serviços de barbearia 
                no Brasil, reconhecida pela qualidade e inovação.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Valores</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-muted-foreground">
                <li>Excelência no atendimento</li>
                <li>Transparência nas relações</li>
                <li>Inovação constante</li>
                <li>Compromisso com resultados</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Faça Parte da Nossa História</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Seja você um cliente em busca do melhor serviço ou um barbeiro querendo 
          expandir seus negócios, a Hasty Barber é a plataforma ideal para você.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/cadastro">
            <Button className="bg-purple-600 hover:bg-purple-700">
              Cadastre-se como Cliente
            </Button>
          </Link>
          <Link href="/cadastro">
            <Button variant="outline">
              Seja um Barbeiro Parceiro
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}