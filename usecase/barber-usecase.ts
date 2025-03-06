/**
 * Caso de Uso de Barbeiros
 * 
 * Implementa a lógica de negócio para operações relacionadas a barbeiros.
 */

import barberRepository from '@/data/repository/barber-repository';
import { BarberProfile, Service, WorkingHour } from '@/domain/entities/user';

export class BarberUseCase {
  /**
   * Obtém lista de barbeiros
   */
  async getBarbers(): Promise<BarberProfile[]> {
    return barberRepository.getBarbers();
  }

  /**
   * Obtém detalhes de um barbeiro específico
   */
  async getBarberById(id: string): Promise<BarberProfile> {
    return barberRepository.getBarberById(id);
  }

  /**
   * Obtém barbeiro pelo link de agendamento
   */
  async getBarberByLink(link: string): Promise<BarberProfile> {
    return barberRepository.getBarberByLink(link);
  }

  /**
   * Atualiza perfil do barbeiro
   */
  async updateBarberProfile(id: string, data: Partial<BarberProfile>): Promise<BarberProfile> {
    return barberRepository.updateBarberProfile(id, data);
  }

  /**
   * Adiciona um novo serviço ao barbeiro
   */
  async addService(
    barberId: string, 
    name: string, 
    price: number, 
    duration: number, 
    description?: string
  ): Promise<Service> {
    return barberRepository.addService(barberId, {
      name,
      price,
      duration,
      description
    });
  }

  /**
   * Atualiza um serviço existente
   */
  async updateService(
    barberId: string, 
    serviceId: string, 
    data: Partial<Service>
  ): Promise<Service> {
    return barberRepository.updateService(barberId, serviceId, data);
  }

  /**
   * Remove um serviço
   */
  async deleteService(barberId: string, serviceId: string): Promise<void> {
    return barberRepository.deleteService(barberId, serviceId);
  }

  /**
   * Adiciona horário de trabalho
   */
  async addWorkingHour(
    barberId: string, 
    dayOfWeek: string, 
    startTime: string, 
    endTime: string, 
    isAvailable: boolean = true
  ): Promise<WorkingHour> {
    return barberRepository.addWorkingHour(barberId, {
      dayOfWeek,
      startTime,
      endTime,
      isAvailable
    });
  }

  /**
   * Atualiza horário de trabalho
   */
  async updateWorkingHour(
    barberId: string, 
    hourId: string, 
    data: Partial<WorkingHour>
  ): Promise<WorkingHour> {
    return barberRepository.updateWorkingHour(barberId, hourId, data);
  }

  /**
   * Remove horário de trabalho
   */
  async deleteWorkingHour(barberId: string, hourId: string): Promise<void> {
    return barberRepository.deleteWorkingHour(barberId, hourId);
  }

  /**
   * Gera um novo link de agendamento
   */
  async generateAppointmentLink(barberId: string): Promise<string> {
    return barberRepository.generateAppointmentLink(barberId);
  }

  /**
   * Obtém estatísticas do barbeiro
   */
  async getBarberStats(
    barberId: string, 
    period: 'day' | 'week' | 'month' | 'year' = 'month'
  ): Promise<any> {
    return barberRepository.getBarberStats(barberId, period);
  }
}

export default new BarberUseCase();