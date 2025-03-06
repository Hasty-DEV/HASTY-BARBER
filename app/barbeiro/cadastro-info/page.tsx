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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Trash2 } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Servico {
  id: string;
  nome: string;
  preco: string;
  duracao: string;
  descricao: string;
}

interface HorarioAtendimento {
  id: string;
  diaSemana: string;
  horaInicio: string;
  horaFim: string;
}

export default function CadastroInfoBarbeiro() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("informacoes");
  
  // Informações pessoais
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [cep, setCep] = useState("");
  const [telefone, setTelefone] = useState("");
  const [bio, setBio] = useState("");
  
  // Serviços
  const [servicos, setServicos] = useState<Servico[]>([
    { id: "1", nome: "", preco: "", duracao: "", descricao: "" }
  ]);
  
  // Horários
  const [horarios, setHorarios] = useState<HorarioAtendimento[]>([
    { id: "1", diaSemana: "segunda", horaInicio: "09:00", horaFim: "18:00" }
  ]);

  const diasSemana = [
    { value: "segunda", label: "Segunda-feira" },
    { value: "terca", label: "Terça-feira" },
    { value: "quarta", label: "Quarta-feira" },
    { value: "quinta", label: "Quinta-feira" },
    { value: "sexta", label: "Sexta-feira" },
    { value: "sabado", label: "Sábado" },
    { value: "domingo", label: "Domingo" },
  ];

  const adicionarServico = () => {
    setServicos([
      ...servicos,
      { id: Date.now().toString(), nome: "", preco: "", duracao: "", descricao: "" }
    ]);
  };

  const removerServico = (id: string) => {
    if (servicos.length > 1) {
      setServicos(servicos.filter(servico => servico.id !== id));
    }
  };

  const atualizarServico = (id: string, campo: keyof Servico, valor: string) => {
    setServicos(servicos.map(servico => 
      servico.id === id ? { ...servico, [campo]: valor } : servico
    ));
  };

  const adicionarHorario = () => {
    setHorarios([
      ...horarios,
      { id: Date.now().toString(), diaSemana: "segunda", horaInicio: "09:00", horaFim: "18:00" }
    ]);
  };

  const removerHorario = (id: string) => {
    if (horarios.length > 1) {
      setHorarios(horarios.filter(horario => horario.id !== id));
    }
  };

  const atualizarHorario = (id: string, campo: keyof HorarioAtendimento, valor: string) => {
    setHorarios(horarios.map(horario => 
      horario.id === id ? { ...horario, [campo]: valor } : horario
    ));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulação de cadastro - aqui seria a integração com o back-end
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "Cadastro concluído com sucesso!",
        description: "Suas informações foram salvas.",
      });

      // Redirecionamento para o dashboard
      window.location.href = "/barbeiro/dashboard";
    } catch (error) {
      toast({
        title: "Erro ao salvar informações",
        description: "Verifique seus dados e tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const avancarTab = () => {
    if (activeTab === "informacoes") {
      setActiveTab("servicos");
    } else if (activeTab === "servicos") {
      setActiveTab("horarios");
    }
  };

  const voltarTab = () => {
    if (activeTab === "servicos") {
      setActiveTab("informacoes");
    } else if (activeTab === "horarios") {
      setActiveTab("servicos");
    }
  };

  return (
    <div className="container py-10 md:py-20">
      <div className="mx-auto max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Complete seu cadastro</CardTitle>
            <CardDescription>
              Preencha as informações abaixo para configurar seu perfil de barbeiro.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="informacoes">Informações</TabsTrigger>
                <TabsTrigger value="servicos">Serviços</TabsTrigger>
                <TabsTrigger value="horarios">Horários</TabsTrigger>
              </TabsList>
              
              <TabsContent value="informacoes">
                <form className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome da Barbearia</Label>
                    <Input 
                      id="nome" 
                      value={nome} 
                      onChange={(e) => setNome(e.target.value)} 
                      placeholder="Nome da sua barbearia" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="endereco">Endereço</Label>
                    <Input 
                      id="endereco" 
                      value={endereco} 
                      onChange={(e) => setEndereco(e.target.value)} 
                      placeholder="Rua, número" 
                      required 
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cidade">Cidade</Label>
                      <Input 
                        id="cidade" 
                        value={cidade} 
                        onChange={(e) => setCidade(e.target.value)} 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="estado">Estado</Label>
                      <Input 
                        id="estado" 
                        value={estado} 
                        onChange={(e) => setEstado(e.target.value)} 
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cep">CEP</Label>
                      <Input 
                        id="cep" 
                        value={cep} 
                        onChange={(e) => setCep(e.target.value)} 
                        placeholder="00000-000" 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input 
                        id="telefone" 
                        value={telefone} 
                        onChange={(e) => setTelefone(e.target.value)} 
                        placeholder="(00) 00000-0000" 
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Sobre a barbearia</Label>
                    <Textarea 
                      id="bio" 
                      value={bio} 
                      onChange={(e) => setBio(e.target.value)} 
                      placeholder="Descreva sua barbearia, experiência, especialidades..." 
                      rows={4} 
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      type="button" 
                      onClick={avancarTab}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      Próximo
                    </Button>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="servicos">
                <div className="space-y-4 mt-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Serviços Oferecidos</h3>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={adicionarServico}
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Adicionar Serviço
                    </Button>
                  </div>
                  
                  {servicos.map((servico, index) => (
                    <div key={servico.id} className="space-y-4 p-4 border rounded-md">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Serviço {index + 1}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removerServico(servico.id)}
                          disabled={servicos.length === 1}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`nome-${servico.id}`}>Nome do serviço</Label>
                        <Input 
                          id={`nome-${servico.id}`} 
                          value={servico.nome} 
                          onChange={(e) => atualizarServico(servico.id, "nome", e.target.value)} 
                          placeholder="Ex: Corte de cabelo" 
                          required 
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`preco-${servico.id}`}>Preço (R$)</Label>
                          <Input 
                            id={`preco-${servico.id}`} 
                            value={servico.preco} 
                            onChange={(e) => atualizarServico(servico.id, "preco", e.target.value)} 
                            placeholder="50,00" 
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`duracao-${servico.id}`}>Duração (minutos)</Label>
                          <Input 
                            id={`duracao-${servico.id}`} 
                            value={servico.duracao} 
                            onChange={(e) => atualizarServico(servico.id, "duracao", e.target.value)} 
                            placeholder="30" 
                            required 
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`descricao-${servico.id}`}>Descrição</Label>
                        <Textarea 
                          id={`descricao-${servico.id}`} 
                          value={servico.descricao} 
                          onChange={(e) => atualizarServico(servico.id, "descricao", e.target.value)} 
                          placeholder="Descreva o serviço..." 
                          rows={2} 
                        />
                      </div>
                    </div>
                  ))}
                  
                  <div className="flex justify-between">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={voltarTab}
                    >
                      Voltar
                    </Button>
                    <Button 
                      type="button" 
                      onClick={avancarTab}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      Próximo
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="horarios">
                <div className="space-y-4 mt-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Horários de Atendimento</h3>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={adicionarHorario}
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Adicionar Horário
                    </Button>
                  </div>
                  
                  {horarios.map((horario, index) => (
                    <div key={horario.id} className="space-y-4 p-4 border rounded-md">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Horário {index + 1}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removerHorario(horario.id)}
                          disabled={horarios.length === 1}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`dia-${horario.id}`}>Dia da semana</Label>
                        <Select
                          value={horario.diaSemana}
                          onValueChange={(value) => atualizarHorario(horario.id, "diaSemana", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o dia" />
                          </SelectTrigger>
                          <SelectContent>
                            {diasSemana.map((dia) => (
                              <SelectItem key={dia.value} value={dia.value}>
                                {dia.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`inicio-${horario.id}`}>Hora de início</Label>
                          <Input 
                            id={`inicio-${horario.id}`} 
                            type="time"
                            value={horario.horaInicio} 
                            onChange={(e) => atualizarHorario(horario.id, "horaInicio", e.target.value)} 
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`fim-${horario.id}`}>Hora de término</Label>
                          <Input 
                            id={`fim-${horario.id}`} 
                            type="time"
                            value={horario.horaFim} 
                            onChange={(e) => atualizarHorario(horario.id, "horaFim", e.target.value)} 
                            required 
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="flex justify-between">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={voltarTab}
                    >
                      Voltar
                    </Button>
                    <Button 
                      type="submit" 
                      onClick={handleSubmit}
                      className="bg-purple-600 hover:bg-purple-700"
                      disabled={isLoading}
                    >
                      {isLoading ? "Salvando..." : "Concluir Cadastro"}
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}