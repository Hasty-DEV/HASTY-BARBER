/**
 * Caso de Uso de Agendamentos
 * 
 * Implementa a lógica de negócio para operações relacionadas a agendamentos.
 */

import appointmentRepository from '@/data/repository/appointment-repository';
import { 
  Appointment, 
  AppointmentStatus, 
  AppointmentWithDetails,
  AvailableTimeSlot
} from '@/domain/entities/appointment';

export class AppointmentUseCase {
  /**
   * Cria um novo agendamento
   */
  async createAppointment(
    clientId: string,
    barberId: string,
    serviceId: string,
    date: string, // formato: 'YYYY-MM-DD'
    startTime: string // formato: 'HH:MM'
  ): Promise<Appointment> {
    return appointmentRepository.createAppointment({
      clientId,
      barberId,
      serviceId,
      date,
      startTime
    });
  }

  /**
   * Obtém detalhes de um agendamento específico
   */
  async getAppointmentById(id: string): Promise<AppointmentWithDetails> {
    return appointmentRepository.getAppointmentById(id);
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
    return appointmentRepository.getClientAppointments(clientId, status, page, limit);
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
    return appointmentRepository.getBarberAppointments(barberId, status, date, page, limit);
  }

  /**
   * Confirma um agendamento
   */
  async confirmAppointment(id: string): Promise<Appointment> {
    return appointmentRepository.updateAppointmentStatus(id, AppointmentStatus.CONFIRMED);
  }

  /**
   * Cancela um agendamento
   */
  async cancelAppointment(id: string, reason?: string): Promise<Appointment> {
    return appointmentRepository.cancelAppointment(id, reason);
  }

  /**
   * Marca um agendamento como concluído
   */
  async completeAppointment(id: string): Promise<Appointment> {
    return appointmentRepository.updateAppointmentStatus(id, AppointmentStatus.COMPLETED);
  }

  /**
   * Marca um agendamento como não comparecido
   */
  async markAsNoShow(id: string): Promise<Appointment> {
    return appointmentRepository.updateAppointmentStatus(id, AppointmentStatus.NO_SHOW);
  }

  /**
   * Obtém horários disponíveis para um barbeiro em uma data específica
   */
  async getAvailableTimeSlots(
    barberId: string,
    date: string, // formato: 'YYYY-MM-DD'
    serviceId?: string
  ): Promise<AvailableTimeSlot[]> {
    return appointmentRepository.getAvailableTimeSlots(barberId, date, serviceId);
  }
}

export default new AppointmentUseCase();