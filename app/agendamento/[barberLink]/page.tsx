"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Scissors, MapPin, Clock, Phone } from "lucide-react";
import { useAuth } from "@/components/firebase-provider";
import { useRouter } from "next/navigation";
import barberRepository from "@/data/repository/barber-repository";
import appointmentRepository from "@/data/repository/appointment-repository";
import { BarberProfile, Service } from "@/domain/entities/user";
import { AvailableTimeSlot } from "@/domain/entities/appointment";

export default function AgendamentoPage({ params }: { params: { barberLink: string } }) {
  const { toast } = useToast();
  const { user } = useAuth();
  const router = useRouter();
  
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  
  const [barbeiro, setBarbeiro] = useState<BarberProfile | null>(null);
  const [servicos, setServicos] = useState<Service[]>([]);
  const [horariosDisponiveis, setHorariosDisponiveis] = useState<AvailableTimeSlot[]>([]);

  // Redireciona para login se não estiver autenticado
  useEffect(() => {
    if (!user && !loadingData) {
      toast({
        title: "Autenticação necessária",
        description: "Você precisa estar logado para agendar um horário.",
        variant: "destructive",
      });
      router.push(`/login?redirect=/agendamento/${params.barberLink}`);
    }
  }, [user, loadingData, router, params.barberLink, toast]);

  // Carrega dados do barbeiro
  useEffect(() => {
    const fetchBarberData = async () => {
      try {
        const barber = await barberRepository.getBarberByLink(params.barberLink);
        setBarbeiro(barber);
        setServicos(barber.services || []);
        setLoadingData(false);
      } catch (error) {
        console.error("Erro ao carregar dados do barbeiro:", error);
        toast({
          title: "Erro ao carregar dados",
          description: "Não foi possível carregar as informações do barbeiro.",
          variant: "destructive",
        });
        router.push("/");
      }
    };

    fetchBarberData();
  }, [params.barberLink, router, toast]);

  // Carrega horários disponíveis quando a data ou serviço mudar
  useEffect(() => {
    const fetchAvailableSlots = async () => {
      if (!date || !barbeiro) return;
      
      try {
        const formattedDate = format(date, "yyyy-MM-dd");
        const slots = await appointmentRepository.getAvailableTimeSlots(
          barbeiro.id,
          formattedDate,
          selectedService || undefined
        );
        
        setHorariosDisponiveis(slots);
        setSelectedTime(""); // Reseta o horário selecionado
      } catch (error) {
        console.error("Erro ao carregar horários disponíveis:", error);
        toast({
          title: "Erro ao carregar horários",
          description: "Não foi possível carregar os horários disponíveis.",
          variant: "destructive",
        });
      }
    };

    fetchAvailableSlots();
  }, [date, selectedService, barbeiro, toast]);

  const handleAgendamento = async () => {
    if (!user || !barbeiro || !date || !selectedService || !selectedTime) {
      toast({
        title: "Erro ao agendar",
        description: "Por favor, selecione data, serviço e horário.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Cria o agendamento
      await appointmentRepository.createAppointment({
        clientId: user.id,
        barberId: barbeiro.id,
        serviceId: selectedService,
        date: format(date, "yyyy-MM-dd"),
        startTime: selectedTime
      });
      
      toast({
        title: "Agendamento realizado com sucesso!",
        description: `Seu agendamento foi confirmado para ${format(date, "dd/MM/yyyy", { locale: ptBR })} às ${selectedTime}.`,
      });

      // Redirecionamento para o dashboard do cliente
      router.push("/cliente/dashboard");
    } catch (error: any) {
      toast({
        title: "Erro ao realizar agendamento",
        description: error.message || "Ocorreu um erro ao processar seu agendamento. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (loadingData) {
    return (
      <div className="container py-10 flex items-center justify-center">
        <p>Carregando informações...</p>
      </div>
    );
  }

  if (!barbeiro) {
    return (
      <div className="container py-10 flex items-center justify-center">
        <p>Barbeiro não encontrado.</p>
      </div>
    );
  }

  return (
    <div className="container py-10 md:py-20">
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Informações do Barbeiro</CardTitle>
              <CardDescription>
                Detalhes sobre o profissional e serviços oferecidos.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="text-xl">{barbeiro.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold">{barbeiro.name}</h3>
                  <p className="text-muted-foreground">{barbeiro.specialties?.join(", ")}</p>
                  <div className="flex items-center mt-1">
                    <span className="text-sm font-medium mr-2">Avaliação: {barbeiro.rating}</span>
                    <Badge>Top Barbeiro</Badge>
                  </div>
                </div>
              </div>

              {barbeiro.address && (
                <div className="space-y-2">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">
                      {`${barbeiro.address.street}, ${barbeiro.address.number} - ${barbeiro.address.neighborhood}, ${barbeiro.address.city} - ${barbeiro.address.state}`}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{barbeiro.phone}</span>
                  </div>
                </div>
              )}

              <div>
                <h4 className="font-medium mb-2">Sobre</h4>
                <p className="text-sm text-muted-foreground">{barbeiro.bio}</p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Serviços Oferecidos</h4>
                <div className="space-y-2">
                  {servicos.map((servico) => (
                    <div key={servico.id} className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center">
                        <Scissors className="h-4 w-4 mr-2 text-purple-600" />
                        <span>{servico.name}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{servico.duration} min</span>
                        </div>
                        <span className="font-medium">R$ {servico.price.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Agendar Horário</CardTitle>
              <CardDescription>
                Selecione data, serviço e horário para seu agendamento.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">Selecione uma data</h4>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  locale={ptBR}
                  className="rounded-md border"
                  disabled={(date) => {
                    // Desabilita datas passadas e domingos
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return date < today || date.getDay() === 0;
                  }}
                />
              </div>

              <div className="space-y-2">
                <h4 className="font-medium mb-2">Selecione um serviço</h4>
                <Select value={selectedService} onValueChange={setSelectedService}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um serviço" />
                  </SelectTrigger>
                  <SelectContent>
                    {servicos.map((servico) => (
                      <SelectItem key={servico.id} value={servico.id}>
                        {servico.name} - R$ {servico.price.toFixed(2)} ({servico.duration} min)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium mb-2">Selecione um horário</h4>
                <div className="grid grid-cols-4 gap-2">
                  {horariosDisponiveis.map((horario) => (
                    <Button
                      key={horario.startTime}
                      variant={selectedTime === horario.startTime ? "default" : "outline"}
                      className={`${selectedTime === horario.startTime ? "bg-purple-600 hover:bg-purple-700" : ""} ${!horario.isAvailable ? "opacity-50 cursor-not-allowed" : ""}`}
                      onClick={() => horario.isAvailable && setSelectedTime(horario.startTime)}
                      disabled={!horario.isAvailable}
                    >
                      {horario.startTime}
                    </Button>
                  ))}
                </div>
                {horariosDisponiveis.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center">
                    Nenhum horário disponível para esta data. Tente outra data ou serviço.
                  </p>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-purple-600 hover:bg-purple-700" 
                onClick={handleAgendamento}
                disabled={!date || !selectedService || !selectedTime || isLoading}
              >
                {isLoading ? "Processando..." : "Confirmar Agendamento"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}