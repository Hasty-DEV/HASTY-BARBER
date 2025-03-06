"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import authRepository from '@/data/repository/auth-repository';
import { User, UserRole } from '@/domain/entities/user';

// Interface para o contexto de autenticação
interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<User>;
  signUp: (email: string, password: string, name: string, role: UserRole) => Promise<User>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

// Cria o contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook para usar o contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um FirebaseProvider');
  }
  return context;
};

// Componente Provider
export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Verifica se o usuário está autenticado ao carregar a página
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (authRepository.isAuthenticated()) {
          const currentUser = await authRepository.getCurrentUser();
          setUser(currentUser);
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Função para fazer login
  const signIn = async (email: string, password: string): Promise<User> => {
    try {
      setLoading(true);
      const response = await authRepository.login({ email, password });
      setUser(response.user);
      
      toast.success(`Bem-vindo, ${response.user.name}!`);
      
      return response.user;
    } catch (error: any) {
      toast.error(error.message || "Verifique suas credenciais e tente novamente.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Função para cadastrar
  const signUp = async (email: string, password: string, name: string, role: UserRole): Promise<User> => {
    try {
      setLoading(true);
      const response = await authRepository.register({ email, password, name, role });
      setUser(response.user);
      
      toast.success(`Bem-vindo, ${response.user.name}!`);
      
      return response.user;
    } catch (error: any) {
      toast.error(error.message || "Ocorreu um erro ao criar sua conta. Tente novamente.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Função para fazer logout
  const signOut = async (): Promise<void> => {
    try {
      setLoading(true);
      await authRepository.logout();
      setUser(null);
      
      toast.success("Você foi desconectado da sua conta.");
    } catch (error: any) {
      toast.error(error.message || "Ocorreu um erro ao desconectar. Tente novamente.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Função para redefinir senha
  const resetPassword = async (email: string): Promise<void> => {
    try {
      setLoading(true);
      await authRepository.requestPasswordReset(email);
      
      toast.success("Verifique sua caixa de entrada para redefinir sua senha.");
    } catch (error: any) {
      toast.error(error.message || "Não foi possível enviar o email de redefinição. Tente novamente.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Valor do contexto
  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}