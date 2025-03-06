/**
 * Repositório de Barbeiros
 * 
 * Implementa a lógica de negócio para operações relacionadas a barbeiros.
 */

import barberDataSource from '../datasource/barber-datasource';
import { BarberProfile, Service, WorkingHour } from '@/domain/entities/user';

export class BarberRepository {
  /**
   * Obtém lista de barbeiros
   */
  async getBarbers(): Promise<BarberProfile[]> {
    return barberDataSource.getBarbers();
  }

  /**
   * Obtém detalhes de um barbeiro específico
   */
  async getBarberById(id: string): Promise<BarberProfile> {
    return barberDataSource.getBarberById(id);
  }

  /**
   * Obtém barbeiro pelo link de agendamento
   */
  async getBarberByLink(link: string): Promise<BarberProfile> {
    return barberDataSource.getBarberByLink(link);
  }

  /**
   * Atualiza perfil do barbeiro
   */
  async updateBarberProfile(id: string, data: Partial<BarberProfile>): Promise<BarberProfile> {
    return barberDataSource.updateBarberProfile(id, data);
  }

  /**
   * Adiciona um novo serviço ao barbeiro
   */
  async addService(barberId: string, service: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>): Promise<Service> {
    return barberDataSource.addService(barberId, service);
  }

  /**
   * Atualiza um serviço existente
   */
  async updateService(barberId: string, serviceId: string, service: Partial<Service>): Promise<Service> {
    return barberDataSource.updateService(barberId, serviceId, service);
  }

  /**
   * Remove um serviço
   */
  async deleteService(barberId: string, serviceId: string): Promise<void> {
    return barberDataSource.deleteService(barberId, serviceId);
  }

  /**
   * Adiciona horário de trabalho
   */
  async addWorkingHour(barberId: string, workingHour: Omit<WorkingHour, 'id'>): Promise<WorkingHour> {
    return barberDataSource.addWorkingHour(barberId, workingHour);
  }

  /**
   * Atualiza horário de trabalho
   */
  async updateWorkingHour(barberId: string, hourId: string, workingHour: Partial<WorkingHour>): Promise<WorkingHour> {
    return barberDataSource.updateWorkingHour(barberId, hourId, workingHour);
  }

  /**
   * Remove horário de trabalho
   */
  async deleteWorkingHour(barberId: string, hourId: string): Promise<void> {
    return barberDataSource.deleteWorkingHour(barberId, hourId);
  }

  /**
   * Gera um novo link de agendamento
   */
  async generateAppointmentLink(barberId: string): Promise<string> {
    const response = await barberDataSource.generateAppointmentLink(barberId);
    return response.link;
  }

  /**
   * Obtém estatísticas do barbeiro
   */
  async getBarberStats(barberId: string, period: 'day' | 'week' | 'month' | 'year' = 'month'): Promise<any> {
    return barberDataSource.getBarberStats(barberId, period);
  }
}

export default new BarberRepository();