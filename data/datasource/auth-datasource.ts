/**
 * Fonte de dados para autenticação
 * 
 * Implementa a comunicação com a API para operações de autenticação.
 */

import apiClient from '../remote/api';
import { User, UserRole } from '@/domain/entities/user';
import { mockUsers } from '../mock/mock-data';

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends AuthCredentials {
  name: string;
  phone?: string;
  role: UserRole;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export class AuthDataSource {
  /**
   * Realiza login do usuário
   */
  async login(credentials: AuthCredentials): Promise<AuthResponse> {
    // Simulação de chamada à API
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Busca o usuário no mock
    const user = mockUsers.find(u => u.email === credentials.email);
    
    if (!user || credentials.password !== '123456') {
      throw new Error('Email ou senha incorretos');
    }
    
    // Gera um token fake
    const token = `mock-token-${Date.now()}`;
    
    // Simula resposta da API
    const response: AuthResponse = { user, token };
    
    // Configura o token no cliente de API
    apiClient.setToken(token);
    
    return response;
  }

  /**
   * Registra um novo usuário
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    // Simulação de chamada à API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Verifica se o email já está em uso
    if (mockUsers.some(u => u.email === data.email)) {
      throw new Error('Este email já está em uso');
    }
    
    // Cria um novo usuário
    const newUser: User = {
      id: `mock-${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Adiciona ao mock (apenas para esta sessão)
    mockUsers.push(newUser);
    
    // Gera um token fake
    const token = `mock-token-${Date.now()}`;
    
    // Simula resposta da API
    const response: AuthResponse = { user: newUser, token };
    
    // Configura o token no cliente de API
    apiClient.setToken(token);
    
    return response;
  }

  /**
   * Realiza logout do usuário
   */
  async logout(): Promise<void> {
    // Simulação de chamada à API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Limpa o token no cliente de API
    apiClient.clearToken();
  }

  /**
   * Recupera informações do usuário atual
   */
  async getCurrentUser(): Promise<User> {
    // Simulação de chamada à API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Em uma implementação real, usaria o token para buscar o usuário
    // Aqui, vamos apenas retornar um usuário mockado
    const token = apiClient.getToken();
    
    if (!token) {
      throw new Error('Usuário não autenticado');
    }
    
    // Retorna o primeiro usuário do mock (apenas para exemplo)
    return mockUsers[0];
  }

  /**
   * Solicita redefinição de senha
   */
  async requestPasswordReset(email: string): Promise<void> {
    // Simulação de chamada à API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Verifica se o email existe
    const user = mockUsers.find(u => u.email === email);
    
    if (!user) {
      throw new Error('Não encontramos uma conta com este email');
    }
    
    // Em uma implementação real, enviaria um email com o token
    console.log(`[MOCK] Enviando email de recuperação para ${email}`);
  }

  /**
   * Redefine a senha do usuário
   */
  async resetPassword(token: string, newPassword: string): Promise<void> {
    // Simulação de chamada à API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Em uma implementação real, validaria o token e atualizaria a senha
    console.log(`[MOCK] Redefinindo senha com token ${token}`);
    
    if (token.length < 10) {
      throw new Error('Token inválido');
    }
  }
}

export default new AuthDataSource();