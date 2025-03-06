"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  subject: yup.string().required("Assunto é obrigatório"),
  message: yup.string().required("Mensagem é obrigatória")
});

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContatoPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Simulação de envio
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success("Mensagem enviada com sucesso! Retornaremos em breve.");
      reset();
    } catch (error) {
      toast.error("Erro ao enviar mensagem. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-10 md:py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Entre em Contato</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Estamos aqui para ajudar! Envie sua mensagem e nossa equipe responderá o mais breve possível.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Informações de Contato */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações de Contato</CardTitle>
              <CardDescription>
                Várias formas de entrar em contato conosco
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <MapPin className="h-5 w-5 text-purple-600" />
                <div>
                  <h3 className="font-medium">Endereço</h3>
                  <p className="text-sm text-muted-foreground">
                    Rua Exemplo, 123 - Centro<br />
                    São Paulo, SP - 01001-000
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Phone className="h-5 w-5 text-purple-600" />
                <div>
                  <h3 className="font-medium">Telefone</h3>
                  <p className="text-sm text-muted-foreground">
                    (11) 99999-9999
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Mail className="h-5 w-5 text-purple-600" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-sm text-muted-foreground">
                    contato@hastybarber.com.br
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Clock className="h-5 w-5 text-purple-600" />
                <div>
                  <h3 className="font-medium">Horário de Atendimento</h3>
                  <p className="text-sm text-muted-foreground">
                    Segunda a Sexta: 9h às 18h<br />
                    Sábado: 9h às 13h
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>FAQ</CardTitle>
              <CardDescription>
                Perguntas frequentes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">Como faço para me cadastrar?</h3>
                <p className="text-sm text-muted-foreground">
                  Clique no botão "Cadastrar" no menu superior e siga as instruções.
                </p>
              </div>
              <div>
                <h3 className="font-medium">Como funciona o agendamento?</h3>
                <p className="text-sm text-muted-foreground">
                  Escolha um barbeiro, selecione o serviço desejado e escolha um horário disponível.
                </p>
              </div>
              <div>
                <h3 className="font-medium">Posso cancelar um agendamento?</h3>
                <p className="text-sm text-muted-foreground">
                  Sim, você pode cancelar com até 2 horas de antecedência.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Formulário de Contato */}
        <Card>
          <CardHeader>
            <CardTitle>Envie sua Mensagem</CardTitle>
            <CardDescription>
              Preencha o formulário abaixo e entraremos em contato
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  {...register("name")}
                  error={errors.name?.message}
                />
                {errors.name && (
                  <span className="text-sm text-red-500">{errors.name.message}</span>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  error={errors.email?.message}
                />
                {errors.email && (
                  <span className="text-sm text-red-500">{errors.email.message}</span>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Assunto</Label>
                <Input
                  id="subject"
                  {...register("subject")}
                  error={errors.subject?.message}
                />
                {errors.subject && (
                  <span className="text-sm text-red-500">{errors.subject.message}</span>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Mensagem</Label>
                <Textarea
                  id="message"
                  rows={5}
                  {...register("message")}
                  error={errors.message?.message}
                />
                {errors.message && (
                  <span className="text-sm text-red-500">{errors.message.message}</span>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full bg-purple-600 hover:bg-purple-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}