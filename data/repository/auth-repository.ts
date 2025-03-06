/**
 * Repositório de Autenticação
 * 
 * Implementa a lógica de negócio para operações de autenticação.
 */

import authDataSource, { 
  AuthCredentials, 
  RegisterData, 
  AuthResponse 
} from '../datasource/auth-datasource';
import { User } from '@/domain/entities/user';

export class AuthRepository {
  /**
   * Realiza login do usuário
   */
  async login(credentials: AuthCredentials): Promise<AuthResponse> {
    return authDataSource.login(credentials);
  }

  /**
   * Registra um novo usuário
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    return authDataSource.register(data);
  }

  /**
   * Realiza logout do usuário
   */
  async logout(): Promise<void> {
    return authDataSource.logout();
  }

  /**
   * Recupera informações do usuário atual
   */
  async getCurrentUser(): Promise<User> {
    return authDataSource.getCurrentUser();
  }

  /**
   * Verifica se o usuário está autenticado
   */
  isAuthenticated(): boolean {
    // Verifica se existe um token no localStorage
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('auth_token');
    }
    return false;
  }

  /**
   * Solicita redefinição de senha
   */
  async requestPasswordReset(email: string): Promise<void> {
    return authDataSource.requestPasswordReset(email);
  }

  /**
   * Redefine a senha do usuário
   */
  async resetPassword(token: string, newPassword: string): Promise<void> {
    return authDataSource.resetPassword(token, newPassword);
  }
}

export default new AuthRepository();