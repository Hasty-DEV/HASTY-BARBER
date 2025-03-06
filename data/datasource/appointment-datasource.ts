/**
 * Fonte de dados para agendamentos
 * 
 * Implementa a comunicação com a API para operações relacionadas a agendamentos.
 */

import apiClient from '../remote/api';
import { 
  Appointment, 
  AppointmentStatus, 
  AppointmentWithDetails,
  AvailableTimeSlot
} from '@/domain/entities/appointment';
import { 
  mockAppointments, 
  mockAppointmentHistory,
  generateAvailableTimeSlots
} from '../mock/mock-data';

export interface CreateAppointmentData {
  clientId: string;
  barberId: string;
  serviceId: string;
  date: string; // formato: 'YYYY-MM-DD'
  startTime: string; // formato: 'HH:MM'
}

export class AppointmentDataSource {
  /**
   * Cria um novo agendamento
   */
  async createAppointment(data: CreateAppointmentData): Promise<Appointment> {
    // Simulação de chamada à API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Busca informações do cliente, barbeiro e serviço
    const barber = mockAppointments.find(a => a.barberId === data.barberId)?.barber;
    const client = mockAppointments.find(a => a.clientId === data.clientId)?.client;
    const service = mockAppointments.find(a => a.serviceId === data.serviceId)?.service;
    
    if (!barber || !client || !service) {
      throw new Error('Dados inválidos para agendamento');
    }
    
    // Calcula o horário de término baseado na duração do serviço
    const [startHour, startMinute] = data.startTime.split(':').map(Number);
    const endMinutes = startHour * 60 + startMinute + service.duration;
    const endHour = Math.floor(endMinutes / 60);
    const endMinute = endMinutes % 60;
    const endTime = `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;
    
    // Cria o novo agendamento
    const newAppointment: AppointmentWithDetails = {
      id: `appointment-${Date.now()}`,
      clientId: data.clientId,
      barberId: data.barberId,
      serviceId: data.serviceId,
      date: new Date(data.date),
      startTime: data.startTime,
      endTime,
      status: AppointmentStatus.PENDING,
      price: service.price,
      createdAt: new Date(),
      updatedAt: new Date(),
      client,
      barber,
      service
    };
    
    // Adiciona ao mock (apenas para esta sessão)
    mockAppointments.push(newAppointment);
    
    return newAppointment;
  }

  /**
   * Obtém detalhes de um agendamento específico
   */
  async getAppointmentById(id: string): Promise<AppointmentWithDetails> {
    // Simulação de chamada à API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Busca nos agendamentos ativos e no histórico
    const appointment = [...mockAppointments, ...mockAppointmentHistory].find(a => a.id === id);
    
    if (!appointment) {
      throw new Error('Agendamento não encontrado');
    }
    
    return appointment;
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
    // Simulação de chamada à API
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Filtra os agendamentos do cliente
    let appointments = [...mockAppointments, ...mockAppointmentHistory].filter(a => a.clientId === clientId);
    
    // Filtra por status, se especificado
    if (status) {
      appointments = appointments.filter(a => a.status === status);
    }
    
    // Ordena por data (mais recentes primeiro)
    appointments.sort((a, b) => b.date.getTime() - a.date.getTime());
    
    // Aplica paginação
    const start = (page - 1) * limit;
    const end = start + limit;
    
    return appointments.slice(start, end);
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
    // Simulação de chamada à API
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Filtra os agendamentos do barbeiro
    let appointments = [...mockAppointments, ...mockAppointmentHistory].filter(a => a.barberId === barberId);
    
    // Filtra por status, se especificado
    if (status) {
      appointments = appointments.filter(a => a.status === status);
    }
    
    // Filtra por data, se especificada
    if (date) {
      appointments = appointments.filter(a => a.date.toISOString().split('T')[0] === date);
    }
    
    // Ordena por data (mais recentes primeiro)
    appointments.sort((a, b) => b.date.getTime() - a.date.getTime());
    
    // Aplica paginação
    const start = (page - 1) * limit;
    const end = start + limit;
    
    return appointments.slice(start, end);
  }

  /**
   * Atualiza o status de um agendamento
   */
  async updateAppointmentStatus(id: string, status: AppointmentStatus): Promise<Appointment> {
    // Simulação de chamada à API
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Busca o agendamento
    const appointmentIndex = mockAppointments.findIndex(a => a.id === id);
    
    if (appointmentIndex === -1) {
      throw new Error('Agendamento não encontrado');
    }
    
    // Atualiza o status
    mockAppointments[appointmentIndex].status = status;
    mockAppointments[appointmentIndex].updatedAt = new Date();
    
    return mockAppointments[appointmentIndex];
  }

  /**
   * Cancela um agendamento
   */
  async cancelAppointment(id: string, reason?: string): Promise<Appointment> {
    // Simulação de chamada à API
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Busca o agendamento
    const appointmentIndex = mockAppointments.findIndex(a => a.id === id);
    
    if (appointmentIndex === -1) {
      throw new Error('Agendamento não encontrado');
    }
    
    // Atualiza o status para cancelado
    mockAppointments[appointmentIndex].status = AppointmentStatus.CANCELED;
    mockAppointments[appointmentIndex].updatedAt = new Date();
    
    // Adiciona o motivo, se fornecido
    if (reason) {
      mockAppointments[appointmentIndex].notes = reason;
    }
    
    return mockAppointments[appointmentIndex];
  }

  /**
   * Obtém horários disponíveis para um barbeiro em uma data específica
   */
  async getAvailableTimeSlots(
    barberId: string,
    date: string, // formato: 'YYYY-MM-DD'
    serviceId?: string
  ): Promise<AvailableTimeSlot[]> {
    // Simulação de chamada à API
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Gera os horários disponíveis
    return generateAvailableTimeSlots(barberId, date, serviceId);
  }
}

export default new AppointmentDataSource();