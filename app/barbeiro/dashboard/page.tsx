"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  BarChart3, 
  Calendar as CalendarIcon, 
  Users, 
  Scissors, 
  Clock, 
  Settings,
  TrendingUp,
  DollarSign,
  Star,
  UserCheck,
  UserX,
  PieChart
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useAuth } from "@/components/firebase-provider";
import { useRouter } from "next/navigation";
import { UserRole } from "@/domain/entities/user";
import barberRepository from "@/data/repository/barber-repository";
import appointmentRepository from "@/data/repository/appointment-repository";
import { AppointmentStatus, AppointmentWithDetails } from "@/domain/entities/appointment";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line
} from "recharts";

// Cores para os gráficos
const CHART_COLORS = {
  purple: "#9333ea",
  blue: "#3b82f6",
  green: "#22c55e",
  red: "#ef4444",
  orange: "#f97316",
  yellow: "#eab308"
};

export default function DashboardBarbeiro() {
  const { user } = useAuth();
  const router = useRouter();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [appointments, setAppointments] = useState<AppointmentWithDetails[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [periodFilter, setPeriodFilter] = useState("month");
  const [statusFilter, setStatusFilter] = useState("all");

  // Redireciona se não for barbeiro
  useEffect(() => {
    if (user && user.role !== UserRole.BARBER) {
      router.push("/cliente/dashboard");
    }
  }, [user, router]);

  // Carrega dados do barbeiro
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      try {
        // Carrega estatísticas
        const statsData = await barberRepository.getBarberStats(user.id, periodFilter as any);
        setStats(statsData);
        
        // Carrega agendamentos
        const appointmentsData = await appointmentRepository.getBarberAppointments(
          user.id,
          undefined,
          format(new Date(), "yyyy-MM-dd")
        );

        // Filtra por status se necessário
        const filteredAppointments = statusFilter === "all" 
          ? appointmentsData
          : appointmentsData.filter(a => a.status === statusFilter);

        setAppointments(filteredAppointments);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user, periodFilter, statusFilter]);

  const handleStatusChange = async (appointmentId: string, status: AppointmentStatus) => {
    try {
      if (status === AppointmentStatus.CANCELED) {
        await appointmentRepository.cancelAppointment(appointmentId);
      } else {
        await appointmentRepository.updateAppointmentStatus(appointmentId, status);
      }
      
      // Atualiza a lista de agendamentos
      if (user) {
        const updatedAppointments = await appointmentRepository.getBarberAppointments(
          user.id,
          undefined,
          format(new Date(), "yyyy-MM-dd")
        );
        setAppointments(updatedAppointments);
      }
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
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
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Bem-vindo ao seu painel de controle, gerencie sua barbearia.
          </p>
        </div>

        {/* Filtros */}
        <div className="flex gap-4">
          <Select value={periodFilter} onValueChange={setPeriodFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Hoje</SelectItem>
              <SelectItem value="week">Esta semana</SelectItem>
              <SelectItem value="month">Este mês</SelectItem>
              <SelectItem value="year">Este ano</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value={AppointmentStatus.PENDING}>Pendentes</SelectItem>
              <SelectItem value={AppointmentStatus.CONFIRMED}>Confirmados</SelectItem>
              <SelectItem value={AppointmentStatus.COMPLETED}>Concluídos</SelectItem>
              <SelectItem value={AppointmentStatus.CANCELED}>Cancelados</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Cards de Resumo */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Faturamento Total</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats ? `R$ ${stats.revenue.total.toFixed(2)}` : "..."}
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span>+20% em relação ao período anterior</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Agendamentos</CardTitle>
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats ? stats.appointments.total : "..."}
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center text-xs">
                  <UserCheck className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-muted-foreground">
                    {stats?.appointments.completed || 0} concluídos
                  </span>
                </div>
                <div className="flex items-center text-xs">
                  <UserX className="h-4 w-4 text-red-500 mr-1" />
                  <span className="text-muted-foreground">
                    {stats?.appointments.canceled || 0} cancelados
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clientes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats ? stats.clients.total : "..."}
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span>{stats?.clients.new || 0} novos clientes</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Conclusão</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats ? `${((stats.appointments.completed / stats.appointments.total) * 100).toFixed(1)}%` : "..."}
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="h-4 w-4 text-purple-500 mr-1" />
                <span>Taxa de agendamentos concluídos</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="agendamentos" className="space-y-4">
          <TabsList>
            <TabsTrigger value="agendamentos">Agendamentos</TabsTrigger>
            <TabsTrigger value="estatisticas">Estatísticas</TabsTrigger>
            <TabsTrigger value="servicos">Serviços</TabsTrigger>
            <TabsTrigger value="horarios">Horários</TabsTrigger>
          </TabsList>
          
          {/* Agendamentos */}
          <TabsContent value="agendamentos" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Agendamentos do Dia</CardTitle>
                <CardDescription>
                  Gerencie os agendamentos de hoje.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Cliente</TableHead>
                          <TableHead>Serviço</TableHead>
                          <TableHead>Horário</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {appointments.map((agendamento) => (
                          <TableRow key={agendamento.id}>
                            <TableCell>{agendamento.client.name}</TableCell>
                            <TableCell>{agendamento.service.name}</TableCell>
                            <TableCell>{agendamento.startTime}</TableCell>
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
                              <div className="flex space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleStatusChange(agendamento.id, AppointmentStatus.CONFIRMED)}
                                  disabled={agendamento.status === AppointmentStatus.CONFIRMED}
                                >
                                  Confirmar
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleStatusChange(agendamento.id, AppointmentStatus.CANCELED)}
                                  disabled={agendamento.status === AppointmentStatus.CANCELED}
                                >
                                  Cancelar
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                        {appointments.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center">
                              Nenhum agendamento para hoje.
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
          
          {/* Estatísticas */}
          <TabsContent value="estatisticas" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Gráfico de Faturamento por Serviço */}
              <Card>
                <CardHeader>
                  <CardTitle>Faturamento por Serviço</CardTitle>
                  <CardDescription>Distribuição do faturamento entre os serviços</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={stats?.services || []}
                          dataKey="count"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label
                        >
                          {stats?.services.map((entry: any, index: number) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={Object.values(CHART_COLORS)[index % Object.values(CHART_COLORS).length]} 
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Gráfico de Horários Mais Populares */}
              <Card>
                <CardHeader>
                  <CardTitle>Horários Mais Populares</CardTitle>
                  <CardDescription>Distribuição de agendamentos por horário</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={stats?.timeDistribution || []}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="hour" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill={CHART_COLORS.purple} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Gráfico de Tendência de Agendamentos */}
              <Card>
                <CardHeader>
                  <CardTitle>Tendência de Agendamentos</CardTitle>
                  <CardDescription>Evolução dos agendamentos ao longo do tempo</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={stats?.appointments.trend || []}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="count" 
                          stroke={CHART_COLORS.blue} 
                          strokeWidth={2} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Status dos Agendamentos */}
              <Card>
                <CardHeader>
                  <CardTitle>Status dos Agendamentos</CardTitle>
                  <CardDescription>Distribuição por status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={[
                            { name: 'Concluídos', value: stats?.appointments.completed || 0 },
                            { name: 'Pendentes', value: stats?.appointments.pending || 0 },
                            { name: 'Cancelados', value: stats?.appointments.canceled || 0 },
                            { name: 'Não Compareceu', value: stats?.appointments.noShow || 0 }
                          ]}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label
                        >
                          <Cell fill={CHART_COLORS.green} />
                          <Cell fill={CHART_COLORS.yellow} />
                          <Cell fill={CHART_COLORS.red} />
                          <Cell fill={CHART_COLORS.orange} />
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Serviços */}
          <TabsContent value="servicos" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Meus Serviços</CardTitle>
                    <CardDescription>
                      Gerencie os serviços oferecidos.
                    </CardDescription>
                  </div>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    Adicionar Serviço
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Serviço</TableHead>
                      <TableHead>Duração</TableHead>
                      <TableHead>Preço</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {user.services?.map((service) => (
                      <TableRow key={service.id}>
                        <TableCell className="font-medium">{service.name}</TableCell>
                        <TableCell>{service.duration} min</TableCell>
                        <TableCell>R$ {service.price.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge variant="outline">Ativo</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              Editar
                            </Button>
                            <Button variant="outline" size="sm">
                              Remover
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Horários */}
          <TabsContent value="horarios" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Horários de Trabalho</CardTitle>
                    <CardDescription>
                      Configure seus horários de atendimento.
                    </CardDescription>
                  </div>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    Adicionar Horário
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Dia</TableHead>
                      <TableHead>Início</TableHead>
                      <TableHead>Término</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {user.workingHours?.map((hour) => (
                      <TableRow key={hour.id}>
                        <TableCell className="font-medium">
                          {hour.dayOfWeek.charAt(0).toUpperCase() + hour.dayOfWeek.slice(1)}
                        </TableCell>
                        <TableCell>{hour.startTime}</TableCell>
                        <TableCell>{hour.endTime}</TableCell>
                        <TableCell>
                          <Badge variant={hour.isAvailable ? "default" : "outline"}>
                            {hour.isAvailable ? "Disponível" : "Indisponível"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              Editar
                            </Button>
                            <Button variant="outline" size="sm">
                              Remover
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}