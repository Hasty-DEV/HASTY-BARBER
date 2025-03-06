/**
 * API Client para comunicação com o backend
 * 
 * Este arquivo contém a configuração e métodos para comunicação com a API do backend.
 * Utiliza fetch para realizar as requisições HTTP.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

/**
 * Classe para gerenciar requisições à API
 */
class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
    
    // Se estiver no browser, tenta recuperar o token do localStorage
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
  }

  /**
   * Define o token de autenticação
   */
  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  /**
   * Remove o token de autenticação
   */
  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }

  /**
   * Obtém o token atual
   */
  getToken(): string | null {
    return this.token;
  }

  /**
   * Método genérico para requisições HTTP
   */
  async request<T>(
    endpoint: string,
    method: string = 'GET',
    data?: any,
    customHeaders?: Record<string, string>
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...customHeaders,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const config: RequestInit = {
      method,
      headers,
      credentials: 'include',
    };

    if (data) {
      config.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, config);
      
      // Verifica se a resposta é JSON
      const contentType = response.headers.get('content-type');
      const isJson = contentType && contentType.includes('application/json');
      
      // Processa a resposta
      const responseData = isJson ? await response.json() : await response.text();
      
      if (!response.ok) {
        throw new Error(
          isJson && responseData.message 
            ? responseData.message 
            : `Erro na requisição: ${response.status} ${response.statusText}`
        );
      }
      
      return responseData as T;
    } catch (error) {
      console.error('Erro na requisição API:', error);
      throw error;
    }
  }

  // Métodos de conveniência para diferentes tipos de requisições
  async get<T>(endpoint: string, customHeaders?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, 'GET', undefined, customHeaders);
  }

  async post<T>(endpoint: string, data: any, customHeaders?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, 'POST', data, customHeaders);
  }

  async put<T>(endpoint: string, data: any, customHeaders?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, 'PUT', data, customHeaders);
  }

  async patch<T>(endpoint: string, data: any, customHeaders?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, 'PATCH', data, customHeaders);
  }

  async delete<T>(endpoint: string, customHeaders?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, 'DELETE', undefined, customHeaders);
  }
}

// Exporta uma instância única do ApiClient para ser usada em toda a aplicação
export const apiClient = new ApiClient();

export default apiClient;