/**
 * Repositório de Agendamentos
 * 
 * Implementa a lógica de negócio para operações relacionadas a agendamentos.
 */

import appointmentDataSource, { CreateAppointmentData } from '../datasource/appointment-datasource';
import { 
  Appointment, 
  AppointmentStatus, 
  AppointmentWithDetails,
  AvailableTimeSlot
} from '@/domain/entities/appointment';

export class AppointmentRepository {
  /**
   * Cria um novo agendamento
   */
  async createAppointment(data: CreateAppointmentData): Promise<Appointment> {
    return appointmentDataSource.createAppointment(data);
  }

  /**
   * Obtém detalhes de um agendamento específico
   */
  async getAppointmentById(id: string): Promise<AppointmentWithDetails> {
    return appointmentDataSource.getAppointmentById(id);
  }

  /**
   * Obtém agendamentos de um cliente
   */
  async getClientAppointments(
    clientId: string,
    status?: AppointmentStatus,
    page: number = 1,
    limit: number = 10
  ): Promise<AppointmentWithDetails[]> {
    return appointmentDataSource.getClientAppointments(clientId, status, page, limit);
  }

  /**
   * Obtém agendamentos de um barbeiro
   */
  async getBarberAppointments(
    barberId: string,
    status?: AppointmentStatus,
    date?: string,
    page: number = 1,
    limit: number = 10
  ): Promise<AppointmentWithDetails[]> {
    return appointmentDataSource.getBarberAppointments(barberId, status, date, page, limit);
  }

  /**
   * Atualiza o status de um agendamento
   */
  async updateAppointmentStatus(id: string, status: AppointmentStatus): Promise<Appointment> {
    return appointmentDataSource.updateAppointmentStatus(id, status);
  }

  /**
   * Cancela um agendamento
   */
  async cancelAppointment(id: string, reason?: string): Promise<Appointment> {
    return appointmentDataSource.cancelAppointment(id, reason);
  }

  /**
   * Obtém horários disponíveis para um barbeiro em uma data específica
   */
  async getAvailableTimeSlots(
    barberId: string,
    date: string, // formato: 'YYYY-MM-DD'
    serviceId?: string
  ): Promise<AvailableTimeSlot[]> {
    return appointmentDataSource.getAvailableTimeSlots(barberId, date, serviceId);
  }
}

export default new AppointmentRepository();