"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { toast } from "react-toastify";
import { useAuth } from "@/components/firebase-provider";
import { UserRole } from "@/domain/entities/user";
import { useRouter } from "next/navigation";

// Schema de validação
const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Digite um email válido")
    .required("Email é obrigatório"),
  password: yup
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .required("Senha é obrigatória"),
});

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { signIn } = useAuth();
  const router = useRouter();
  const [userType, setUserType] = useState<"cliente" | "barbeiro">("cliente");
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const user = await signIn(data.email, data.password);
      
      toast.success(`Bem-vindo, ${user.name}!`);

      // Redirecionamento baseado no tipo de usuário
      if (user.role === UserRole.CLIENT) {
        router.push("/cliente/dashboard");
      } else if (user.role === UserRole.BARBER) {
        router.push("/barbeiro/dashboard");
      }
    } catch (error: any) {
      toast.error(error.message || "Erro ao fazer login");
      reset();
    }
  };

  return (
    <div className="container flex items-center justify-center py-10 md:py-20">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Entrar</CardTitle>
          <CardDescription>
            Faça login para acessar sua conta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="cliente" onValueChange={(value) => setUserType(value as "cliente" | "barbeiro")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="cliente">Cliente</TabsTrigger>
              <TabsTrigger value="barbeiro">Barbeiro</TabsTrigger>
            </TabsList>
            <TabsContent value="cliente">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="email-cliente">Email</Label>
                  <Input 
                    id="email-cliente"
                    type="email"
                    placeholder="seu@email.com"
                    {...register("email")}
                    error={errors.email?.message}
                  />
                  {errors.email && (
                    <span className="text-sm text-red-500">{errors.email.message}</span>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="senha-cliente">Senha</Label>
                    <Link href="/recuperar-senha" className="text-sm text-purple-600 hover:underline">
                      Esqueceu a senha?
                    </Link>
                  </div>
                  <Input 
                    id="senha-cliente"
                    type="password"
                    {...register("password")}
                    error={errors.password?.message}
                  />
                  {errors.password && (
                    <span className="text-sm text-red-500">{errors.password.message}</span>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Para teste, use:</p>
                  <p>Email: cliente@teste.com</p>
                  <p>Senha: 123456</p>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-purple-600 hover:bg-purple-700" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Entrando..." : "Entrar"}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="barbeiro">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="email-barbeiro">Email</Label>
                  <Input 
                    id="email-barbeiro"
                    type="email"
                    placeholder="seu@email.com"
                    {...register("email")}
                    error={errors.email?.message}
                  />
                  {errors.email && (
                    <span className="text-sm text-red-500">{errors.email.message}</span>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="senha-barbeiro">Senha</Label>
                    <Link href="/recuperar-senha" className="text-sm text-purple-600 hover:underline">
                      Esqueceu a senha?
                    </Link>
                  </div>
                  <Input 
                    id="senha-barbeiro"
                    type="password"
                    {...register("password")}
                    error={errors.password?.message}
                  />
                  {errors.password && (
                    <span className="text-sm text-red-500">{errors.password.message}</span>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Para teste, use:</p>
                  <p>Email: barbeiro@teste.com</p>
                  <p>Senha: 123456</p>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-purple-600 hover:bg-purple-700" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Entrando..." : "Entrar"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm">
            Não tem uma conta?{" "}
            <Link href="/cadastro" className="text-purple-600 hover:underline">
              Cadastre-se
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}