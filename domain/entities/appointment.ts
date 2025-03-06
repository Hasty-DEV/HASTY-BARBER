/**
 * Entidade de Agendamento
 * 
 * Define a estrutura de dados para agendamentos no sistema.
 */

export enum AppointmentStatus {
  PENDING = 'pendente',
  CONFIRMED = 'confirmado',
  CANCELED = 'cancelado',
  COMPLETED = 'concluido',
  NO_SHOW = 'nao_compareceu'
}

export interface Appointment {
  id: string;
  clientId: string;
  barberId: string;
  serviceId: string;
  date: Date;
  startTime: string; // formato: 'HH:MM'
  endTime: string; // formato: 'HH:MM'
  status: AppointmentStatus;
  price: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AppointmentWithDetails extends Appointment {
  client: {
    id: string;
    name: string;
    email: string;
    phone?: string;
  };
  barber: {
    id: string;
    name: string;
    email: string;
    phone?: string;
  };
  service: {
    id: string;
    name: string;
    price: number;
    duration: number;
  };
}

export interface AvailableTimeSlot {
  date: string; // formato: 'YYYY-MM-DD'
  startTime: string; // formato: 'HH:MM'
  endTime: string; // formato: 'HH:MM'
  isAvailable: boolean;
}