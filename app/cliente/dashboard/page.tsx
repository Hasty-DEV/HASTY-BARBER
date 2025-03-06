"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Scissors, 
  User, 
  Settings 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useAuth } from "@/components/firebase-provider";
import { useRouter } from "next/navigation";
import { UserRole } from "@/domain/entities/user";
import appointmentRepository from "@/data/repository/appointment-repository";
import barberRepository from "@/data/repository/barber-repository";
import { AppointmentStatus, AppointmentWithDetails } from "@/domain/entities/appointment";
import { BarberProfile } from "@/domain/entities/user";
import Link from "next/link";

export default function DashboardCliente() {
  const { user } = useAuth();
  const router = useRouter();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [appointments, setAppointments] = useState<AppointmentWithDetails[]>([]);
  const [history, setHistory] = useState<AppointmentWithDetails[]>([]);
  const [barbers, setBarbers] = useState<BarberProfile[]>([]);

  // Redireciona se não for cliente
  useEffect(() => {
    if (user && user.role !== UserRole.CLIENT) {
      router.push("/barbeiro/dashboard");
    }
  }, [user, router]);

  // Carrega dados do cliente
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      try {
        // Carrega agendamentos pendentes e confirmados
        const appointmentsData = await appointmentRepository.getClientAppointments(
          user.id,
          undefined,
          1,
          10
        );
        
        // Separa agendamentos ativos e histórico
        const active = appointmentsData.filter(a => 
          a.status === AppointmentStatus.PENDING || 
          a.status === AppointmentStatus.CONFIRMED
        );
        
        const completed = appointmentsData.filter(a => 
          a.status === AppointmentStatus.COMPLETED || 
          a.status === AppointmentStatus.CANCELED || 
          a.status === AppointmentStatus.NO_SHOW
        );
        
        setAppointments(active);
        setHistory(completed);
        
        // Carrega barbeiros
        const barbersData = await barberRepository.getBarbers();
        setBarbers(barbersData);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const handleCancelAppointment = async (appointmentId: string) => {
    try {
      await appointmentRepository.cancelAppointment(appointmentId);
      
      // Atualiza a lista de agendamentos
      if (user) {
        const appointmentsData = await appointmentRepository.getClientAppointments(
          user.id,
          undefined,
          1,
          10
        );
        
        const active = appointmentsData.filter(a => 
          a.status === AppointmentStatus.PENDING || 
          a.status === AppointmentStatus.CONFIRMED
        );
        
        const completed = appointmentsData.filter(a => 
          a.status === AppointmentStatus.COMPLETED || 
          a.status === AppointmentStatus.CANCELED || 
          a.status === AppointmentStatus.NO_SHOW
        );
        
        setAppointments(active);
        setHistory(completed);
      }
    } catch (error) {
      console.error("Erro ao cancelar agendamento:", error);
    }
  };

  if (!user) {
    return (
      <div className="container py-10 flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Minha Conta</h1>
          <p className="text-muted-foreground">
            Bem-vindo ao seu painel de cliente, gerencie seus agendamentos.
          </p>
        </div>

        {/* Cards de Resumo */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Próximo Agendamento</CardTitle>
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {appointments.length > 0 ? (
                <>
                  <div className="text-2xl font-bold">
                    {format(new Date(appointments[0].date), "dd/MM/yyyy", { locale: ptBR })}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {appointments[0].service.name} com {appointments[0].barber.name} às {appointments[0].startTime}
                  </p>
                </>
              ) : (
                <>
                  <div className="text-2xl font-bold">Nenhum agendamento</div>
                  <p className="text-xs text-muted-foreground">
                    Você não possui agendamentos marcados
                  </p>
                </>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Visitas</CardTitle>
              <Scissors className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{history.length}</div>
              <p className="text-xs text-muted-foreground">
                Desde o início
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Barbeiros Disponíveis</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{barbers.length}</div>
              <p className="text-xs text-muted-foreground">
                Barbeiros para você agendar
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="agendamentos" className="space-y-4">
          <TabsList>
            <TabsTrigger value="agendamentos">Meus Agendamentos</TabsTrigger>
            <TabsTrigger value="historico">Histórico</TabsTrigger>
            <TabsTrigger value="barbeiros">Barbeiros Disponíveis</TabsTrigger>
            <TabsTrigger value="perfil">Meu Perfil</TabsTrigger>
          </TabsList>
          
          {/* Agendamentos */}
          <TabsContent value="agendamentos" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Meus Agendamentos</CardTitle>
                <CardDescription>
                  Visualize e gerencie seus próximos agendamentos.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between mb-4">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">Todos</Button>
                    <Button variant="outline" size="sm">Confirmados</Button>
                    <Button variant="outline" size="sm">Pendentes</Button>
                  </div>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Barbeiro</TableHead>
                          <TableHead>Serviço</TableHead>
                          <TableHead>Data</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {appointments.map((agendamento) => (
                          <TableRow key={agendamento.id}>
                            <TableCell>{agendamento.barber.name}</TableCell>
                            <TableCell>{agendamento.service.name}</TableCell>
                            <TableCell>
                              {format(new Date(agendamento.date), "dd/MM/yyyy")} às {agendamento.startTime}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  agendamento.status === AppointmentStatus.CONFIRMED
                                    ? "default"
                                    : agendamento.status === AppointmentStatus.PENDING
                                    ? "outline"
                                    : "destructive"
                                }
                              >
                                {agendamento.status === AppointmentStatus.CONFIRMED
                                  ? "Confirmado"
                                  : agendamento.status === AppointmentStatus.PENDING
                                  ? "Pendente"
                                  : "Cancelado"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleCancelAppointment(agendamento.id)}
                              >
                                Cancelar
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                        {appointments.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center">
                              Você não possui agendamentos marcados.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div>
                    <Card>
                      <CardHeader>
                        <CardTitle>Calendário</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          locale={ptBR}
                          className="mx-auto"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Histórico */}
          <TabsContent value="historico" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Serviços</CardTitle>
                <CardDescription>
                  Visualize todos os serviços que você já utilizou.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Barbeiro</TableHead>
                      <TableHead>Serviço</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {history.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.barber.name}</TableCell>
                        <TableCell>{item.service.name}</TableCell>
                        <TableCell>
                          {format(new Date(item.date), "dd/MM/yyyy")} às {item.startTime}
                        </TableCell>
                        <TableCell>R$ {item.price.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              item.status === AppointmentStatus.COMPLETED
                                ? "default"
                                : item.status === AppointmentStatus.CANCELED
                                ? "destructive"
                                : "outline"
                            }
                          >
                            {item.status === AppointmentStatus.COMPLETED
                              ? "Concluído"
                              : item.status === AppointmentStatus.CANCELED
                              ? "Cancelado"
                              : "Não compareceu"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                    {history.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center">
                          Você ainda não possui histórico de serviços.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Barbeiros Favoritos */}
          <TabsContent value="barbeiros" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Barbeiros Disponíveis</CardTitle>
                <CardDescription>
                  Escolha um barbeiro para agendar um horário.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  {barbers.map((barbeiro) => (
                    <Card key={barbeiro.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center space-y-4">
                          <Avatar className="h-20 w-20">
                            <AvatarFallback className="text-xl">{barbeiro.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div className="space-y-2 text-center">
                            <h3 className="font-medium">{barbeiro.name}</h3>
                            <p className="text-sm text-muted-foreground">{barbeiro.specialties?.join(", ")}</p>
                            <div className="flex items-center justify-center">
                              <span className="text-sm font-medium">Avaliação: {barbeiro.rating}</span>
                            </div>
                          </div>
                          <Link href={`/agendamento/${barbeiro.appointmentLink}`}>
                            <Button className="w-full bg-purple-600 hover:bg-purple-700">
                              Agendar
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {barbers.length === 0 && (
                    <div className="col-span-3 text-center py-8">
                      <p>Nenhum barbeiro disponível no momento.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Perfil */}
          <TabsContent value="perfil" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Meu Perfil</CardTitle>
                <CardDescription>
                  Gerencie suas informações pessoais.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                    <div className="flex flex-col items-center space-y-2">
                      <Avatar className="h-24 w-24">
                        <AvatarFallback className="text-2xl">{user.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm">
                        Alterar foto
                      </Button>
                    </div>
                    
                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Nome completo</label>
                          <input
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={user.name}
                            readOnly
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Email</label>
                          <input
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={user.email}
                            readOnly
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Telefone</label>
                          <input
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={user.phone || "Não informado"}
                            readOnly
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Data de cadastro</label>
                          <input
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={format(new Date(user.createdAt), "dd/MM/yyyy")}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}