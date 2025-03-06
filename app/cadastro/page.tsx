"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
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
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { toast } from "react-toastify";
import { useAuth } from "@/components/firebase-provider";
import { UserRole } from "@/domain/entities/user";
import { useRouter } from "next/navigation";

// Schema de validação
const schema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  phone: yup.string().required("Telefone é obrigatório"),
  password: yup.string()
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .required("Senha é obrigatória"),
  confirmPassword: yup.string()
    .oneOf([yup.ref("password")], "As senhas não coincidem")
    .required("Confirmação de senha é obrigatória"),
  acceptTerms: yup.boolean()
    .oneOf([true], "Você precisa aceitar os termos de uso")
});

type FormData = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
};

export default function CadastroPage() {
  const { signUp } = useAuth();
  const router = useRouter();
  const [userType, setUserType] = useState<"cliente" | "barbeiro">("cliente");
  
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      acceptTerms: false
    }
  });

  const onSubmit = async (data: FormData) => {
    try {
      const role = userType === "cliente" ? UserRole.CLIENT : UserRole.BARBER;
      const user = await signUp(data.email, data.password, data.name, role);
      
      toast.success(`Bem-vindo, ${user.name}!`);

      // Redirecionamento baseado no tipo de usuário
      if (role === UserRole.CLIENT) {
        router.push("/cliente/dashboard");
      } else {
        router.push("/barbeiro/planos");
      }
    } catch (error: any) {
      toast.error(error.message || "Erro ao criar conta");
      reset();
    }
  };

  const renderForm = () => (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nome completo</Label>
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
        <Label htmlFor="phone">Telefone</Label>
        <Input
          id="phone"
          {...register("phone")}
          error={errors.phone?.message}
        />
        {errors.phone && (
          <span className="text-sm text-red-500">{errors.phone.message}</span>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          type="password"
          {...register("password")}
          error={errors.password?.message}
        />
        {errors.password && (
          <span className="text-sm text-red-500">{errors.password.message}</span>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirmar senha</Label>
        <Input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />
        {errors.confirmPassword && (
          <span className="text-sm text-red-500">{errors.confirmPassword.message}</span>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Controller
          name="acceptTerms"
          control={control}
          render={({ field }) => (
            <Checkbox
              id="acceptTerms"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          )}
        />
        <label
          htmlFor="acceptTerms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Concordo com os{" "}
          <Link href="/termos" className="text-purple-600 hover:underline">
            termos de uso
          </Link>
        </label>
      </div>
      {errors.acceptTerms && (
        <span className="text-sm text-red-500 block">{errors.acceptTerms.message}</span>
      )}

      <Button 
        type="submit" 
        className="w-full bg-purple-600 hover:bg-purple-700" 
        disabled={isSubmitting}
      >
        {isSubmitting ? "Cadastrando..." : "Cadastrar"}
      </Button>
    </form>
  );

  return (
    <div className="container flex items-center justify-center py-10 md:py-20">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Cadastro</CardTitle>
          <CardDescription>
            Crie sua conta para acessar o sistema.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="cliente" onValueChange={(value) => setUserType(value as "cliente" | "barbeiro")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="cliente">Cliente</TabsTrigger>
              <TabsTrigger value="barbeiro">Barbeiro</TabsTrigger>
            </TabsList>
            <TabsContent value="cliente">
              {renderForm()}
            </TabsContent>
            <TabsContent value="barbeiro">
              {renderForm()}
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm">
            Já tem uma conta?{" "}
            <Link href="/login" className="text-purple-600 hover:underline">
              Faça login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}