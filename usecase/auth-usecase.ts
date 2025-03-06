/**
 * Caso de Uso de Autenticação
 * 
 * Implementa a lógica de negócio para operações de autenticação.
 */

import authRepository from '@/data/repository/auth-repository';
import { AuthCredentials, RegisterData } from '@/data/datasource/auth-datasource';
import { User, UserRole } from '@/domain/entities/user';

export class AuthUseCase {
  /**
   * Realiza login do usuário
   */
  async login(email: string, password: string) {
    const credentials: AuthCredentials = { email, password };
    const response = await authRepository.login(credentials);
    return response;
  }

  /**
   * Registra um novo usuário
   */
  async register(name: string, email: string, password: string, role: UserRole, phone?: string) {
    const data: RegisterData = { name, email, password, role, phone };
    const response = await authRepository.register(data);
    return response;
  }

  /**
   * Realiza logout do usuário
   */
  async logout() {
    await authRepository.logout();
  }

  /**
   * Recupera informações do usuário atual
   */
  async getCurrentUser(): Promise<User> {
    return authRepository.getCurrentUser();
  }

  /**
   * Verifica se o usuário está autenticado
   */
  isAuthenticated(): boolean {
    return authRepository.isAuthenticated();
  }

  /**
   * Solicita redefinição de senha
   */
  async requestPasswordReset(email: string): Promise<void> {
    return authRepository.requestPasswordReset(email);
  }

  /**
   * Redefine a senha do usuário
   */
  async resetPassword(token: string, newPassword: string): Promise<void> {
    return authRepository.resetPassword(token, newPassword);
  }
}

export default new AuthUseCase();